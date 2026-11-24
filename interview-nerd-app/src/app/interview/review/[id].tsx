import Ionicons from '@expo/vector-icons/Ionicons';
import { setAudioModeAsync, useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { Alert, ScrollView, TextInput, View } from 'react-native';

import { Banner, clock, Group, InfoRow } from '@/components/interview';
import { Screen, TopBar } from '@/components/ui/layout';
import { AppText, Button, Card, EmptyState, type IconName, Loading, Pill, ProgressBar, Row, Tap } from '@/components/ui/primitives';
import { getTopic } from '@/data/catalog';
import { deleteInterviewRow, getInterview, getTurns, saveTurn, setTurnReview, updateInterview } from '@/lib/interview/db';
import { deleteInterviewFiles, interviewStorageBytes, recordingUri } from '@/lib/interview/files';
import { providerInfo } from '@/lib/interview/providers';
import { parseSourceKey } from '@/lib/interview/questions';
import { getReviewJob, groupThreads, HIRE_LABEL, startReview, subscribeReviews, type TurnThread } from '@/lib/interview/review';
import { wordCount } from '@/lib/interview/text';
import type { AnswerReview, Interview, TranscriptSource, Turn } from '@/lib/interview/types';
import { aiSettingsOf, useInterviewPrefs } from '@/store/interviewPrefs';
import { fonts, radius, usePalette } from '@/theme';

const SOURCE_LABEL: Record<TranscriptSource, string> = {
  phone: 'Transcribed on the phone',
  live: 'Quick transcript (laptop)',
  cloud: 'Transcribed by your AI provider',
  accurate: 'Accurate transcript (laptop)',
  edited: 'Edited by you',
};

type Playing = { turnId: string; uris: string[]; index: number };

export default function InterviewReport() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const p = usePalette();
  const [interview, setInterview] = useState<Interview | null | undefined>(undefined);
  const [turns, setTurns] = useState<Turn[]>([]);
  const job = useSyncExternalStore(subscribeReviews, () => getReviewJob(id));
  const prefs = useInterviewPrefs();

  const load = useCallback(() => {
    if (!id) return;
    Promise.all([getInterview(id), getTurns(id)])
      .then(([i, t]) => {
        setInterview(i);
        setTurns(t);
      })
      .catch(() => setInterview(null));
  }, [id]);

  useFocusEffect(load);
  useEffect(() => {
    prefs.hydrate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Reload whenever the feedback job makes progress (each answer's feedback is saved as it lands).
  const jobDone = job?.done;
  const jobStatus = job?.status;
  useEffect(() => {
    if (jobStatus) load();
  }, [jobDone, jobStatus, load]);

  // Keep the phone awake while the laptop writes feedback.
  const reviewing = jobStatus === 'running';
  useEffect(() => {
    if (!reviewing) return;
    activateKeepAwakeAsync('interview-review').catch(() => {});
    return () => {
      deactivateKeepAwake('interview-review').catch(() => {});
    };
  }, [reviewing]);

  // ----- audio playback: one shared player for the whole report -----
  const player = useAudioPlayer(null);
  const status = useAudioPlayerStatus(player);
  const [playing, setPlaying] = useState<Playing | null>(null);
  const playingRef = useRef<Playing | null>(null);
  const setNowPlaying = useCallback((v: Playing | null) => {
    playingRef.current = v;
    setPlaying(v);
  }, []);
  useEffect(() => {
    setAudioModeAsync({ playsInSilentMode: true, allowsRecording: false }).catch(() => {});
  }, []);
  // When a segment ends, continue with the answer's next segment (if it has several).
  useEffect(() => {
    const sub = player.addListener('playbackStatusUpdate', (st) => {
      const cur = playingRef.current;
      if (!st.didJustFinish || !cur) return;
      const next = cur.index + 1;
      if (next < cur.uris.length) {
        player.replace({ uri: cur.uris[next] });
        player.play();
        setNowPlaying({ ...cur, index: next });
      } else {
        setNowPlaying(null);
        player.pause();
      }
    });
    return () => sub.remove();
  }, [player, setNowPlaying]);

  const toggle = (turn: Turn) => {
    if (!id) return;
    if (playing?.turnId === turn.id) {
      if (status.playing) player.pause();
      else player.play();
      return;
    }
    const uris = turn.audio.map((n) => recordingUri(id, n)).filter((u): u is string => !!u);
    if (!uris.length) {
      Alert.alert('Recording not found', 'The audio file for this answer is missing.');
      return;
    }
    player.replace({ uri: uris[0] });
    player.play();
    setNowPlaying({ turnId: turn.id, uris, index: 0 });
  };

  const threads = useMemo(() => groupThreads(turns), [turns]);
  // Question numbers, not counting the introduction.
  const numbers = useMemo(() => {
    let n = 0;
    return threads.map((th) => (th.main.kind === 'intro' ? 0 : ++n));
  }, [threads]);
  const storage = useMemo(() => (id && interview ? interviewStorageBytes(id) : 0), [id, interview]);

  if (interview === undefined)
    return (
      <Screen>
        <TopBar title="Interview report" />
        <Loading />
      </Screen>
    );
  if (!interview)
    return (
      <Screen>
        <TopBar title="Interview report" />
        <EmptyState icon="alert-circle-outline" title="Interview not found" />
      </Screen>
    );

  const date = new Date(interview.createdAt);
  const remove = () => {
    Alert.alert('Delete this interview?', 'Its recordings, transcripts and feedback will be removed from this phone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          player.pause();
          setNowPlaying(null);
          await deleteInterviewRow(interview.id).catch(() => {});
          deleteInterviewFiles(interview.id);
          router.back();
        },
      },
    ]);
  };
  const cloud = prefs.cloud;
  const feedbackEngine =
    cloud.provider && cloud.forFeedback && cloud.model
      ? `${cloud.model} (${providerInfo(cloud.provider).name})`
      : `${prefs.reviewModel} on your laptop, about 30 seconds per answer`;
  const runReview = () => startReview(interview.id, { ai: aiSettingsOf(useInterviewPrefs.getState()), accurateRecheck: prefs.accurateRecheck });

  /** Save a corrected transcript. The affected feedback is cleared so the next run uses your words. */
  const saveAnswer = async (turn: Turn, text: string) => {
    await saveTurn({ ...turn, answer: text.trim(), transcriptSource: 'edited', needsTranscript: false });
    const thread = threads.find((th) => th.main.id === turn.id || th.followUps.some((t) => t.id === turn.id));
    if (thread?.main.review) await setTurnReview(thread.main.id, null);
    if (interview.review || interview.reviewStatus !== 'none') await updateInterview(interview.id, { reviewStatus: 'none', review: null, reviewError: null });
    load();
  };

  return (
    <Screen>
      <TopBar title="Interview report" subtitle={`${date.toLocaleDateString()} · ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: playing ? 120 : 48, gap: 20 }}>
        <Group>
          <InfoRow first label="Topics" value={interview.config.topics.map((t) => getTopic(t)?.title ?? t).join(', ')} />
          <InfoRow label="Level" value={`${interview.level} · ${interview.config.difficulty}`} />
          <InfoRow label="Duration" value={`${Math.max(1, Math.round(interview.elapsedSec / 60))} of ${interview.config.minutes} min`} />
          <InfoRow label="Interviewer" value={interview.config.mode === 'ai' ? 'AI' : 'Scripted (no AI)'} />
          {interview.status !== 'completed' && <InfoRow label="Status" value="Interrupted" />}
        </Group>

        <Feedback interview={interview} job={job} onRun={runReview} engine={feedbackEngine} />

        {threads.length === 0 && <EmptyState icon="mic-off-outline" title="No questions were asked" body="This interview ended before the first question." />}
        {threads.map((th, i) => (
          <ThreadCard
            key={th.main.id}
            thread={th}
            number={numbers[i]}
            playing={playing}
            isPlaying={status.playing}
            onToggle={toggle}
            position={status.currentTime}
            onSave={saveAnswer}
            editable={job?.status !== 'running'}
          />
        ))}

        <View style={{ gap: 10, marginTop: 8 }}>
          <AppText variant="caption" color="mute" center>
            {`Recordings use ${(storage / (1024 * 1024)).toFixed(1)} MB on this phone.`}
          </AppText>
          <Button label="Delete interview" icon="trash-outline" variant="danger" onPress={remove} full />
        </View>
      </ScrollView>
      {playing && (
        <View style={{ position: 'absolute', left: 20, right: 20, bottom: 20, padding: 12, borderRadius: radius.lg, backgroundColor: p.surface2, borderWidth: 1, borderColor: p.borderStrong }}>
          <Row gap={12}>
            <Ionicons name="volume-high-outline" size={18} color={p.accentFg} />
            <AppText variant="small" style={{ flex: 1 }}>
              {`Playing your answer${playing.uris.length > 1 ? ` (part ${playing.index + 1} of ${playing.uris.length})` : ''} · ${clock(status.currentTime * 1000)}`}
            </AppText>
            <Button label={status.playing ? 'Pause' : 'Play'} size="sm" variant="secondary" onPress={() => (status.playing ? player.pause() : player.play())} />
            <Button
              label="Stop"
              size="sm"
              variant="ghost"
              onPress={() => {
                player.pause();
                setNowPlaying(null);
              }}
            />
          </Row>
        </View>
      )}
    </Screen>
  );
}

function Feedback({ interview, job, onRun, engine }: { interview: Interview; job: ReturnType<typeof getReviewJob>; onRun: () => void; engine: string }) {
  const p = usePalette();
  if (job?.status === 'running') {
    return (
      <Card style={{ gap: 12 }}>
        <AppText variant="heading">Writing feedback…</AppText>
        <AppText variant="small" color="dim">
          {job.step}
        </AppText>
        <ProgressBar value={job.total ? job.done / job.total : 0} />
        <AppText variant="caption" color="mute">
          {`Using ${engine}. You can leave this screen; it keeps going while the app is open.`}
        </AppText>
      </Card>
    );
  }
  const r = interview.review;
  if (interview.reviewStatus === 'done' && r) {
    const tone = r.score >= 65 ? p.success : r.score >= 45 ? p.warning : p.danger;
    return (
      <Card style={{ gap: 14 }}>
        <Row gap={14}>
          <View style={{ width: 64, height: 64, borderRadius: 32, borderWidth: 3, borderColor: tone, alignItems: 'center', justifyContent: 'center' }}>
            <AppText style={{ fontFamily: fonts.extrabold, fontSize: 20, color: tone }}>{r.score}</AppText>
          </View>
          <View style={{ flex: 1, gap: 4 }}>
            <AppText variant="heading">Overall score</AppText>
            <Pill label={HIRE_LABEL[r.hire]} color={tone} bg={p.surface2} />
          </View>
        </Row>
        <AppText variant="body">{r.summary}</AppText>
        <BulletList title="What went well" items={r.strengths} icon="checkmark-circle-outline" color={p.success} />
        <BulletList title="Work on" items={r.improve} icon="arrow-up-circle-outline" color={p.warning} />
        <Row style={{ justifyContent: 'space-between' }}>
          <AppText variant="caption" color="mute">{`Feedback by ${r.model}. AI feedback can be wrong; check it against the model answers.`}</AppText>
        </Row>
      </Card>
    );
  }
  const interrupted = interview.reviewStatus === 'running' || (interview.reviewStatus === 'error' && !job);
  return (
    <Card style={{ gap: 12 }}>
      <AppText variant="heading">AI feedback</AppText>
      {interview.reviewStatus === 'error' && <Banner tone="danger">{job?.error ?? interview.reviewError ?? 'Feedback failed.'}</Banner>}
      <AppText variant="small" color="dim">
        {interrupted && interview.reviewStatus === 'running'
          ? 'Feedback was interrupted. Resume it; answers already reviewed are kept.'
          : `Get a score, strengths, gaps and a tip for every answer. Answers are re-checked for transcription accuracy first. Uses ${engine}.`}
      </AppText>
      <Button
        label={interview.reviewStatus === 'none' ? 'Get AI feedback' : interview.reviewStatus === 'error' ? 'Try again' : 'Resume feedback'}
        icon="sparkles-outline"
        onPress={onRun}
        full
      />
    </Card>
  );
}

function BulletList({ title, items, icon, color }: { title: string; items: string[]; icon: IconName; color: string }) {
  if (!items.length) return null;
  return (
    <View style={{ gap: 6 }}>
      <AppText variant="label">{title}</AppText>
      {items.map((t) => (
        <Row key={t} gap={8} align="flex-start">
          <Ionicons name={icon} size={16} color={color} style={{ marginTop: 2 }} />
          <AppText variant="small" color="dim" style={{ flex: 1 }}>
            {t}
          </AppText>
        </Row>
      ))}
    </View>
  );
}

function ThreadCard({
  thread,
  number,
  playing,
  isPlaying,
  position,
  onToggle,
  onSave,
  editable,
}: {
  thread: TurnThread;
  number: number;
  playing: Playing | null;
  isPlaying: boolean;
  position: number;
  onToggle: (t: Turn) => void;
  onSave: (t: Turn, text: string) => Promise<void>;
  editable: boolean;
}) {
  const p = usePalette();
  const main = thread.main;
  const review = main.review;
  const topic = getTopic(main.topicId ?? '');
  const src = parseSourceKey(main.sourceKey);
  return (
    <Card style={{ gap: 14 }}>
      <Row style={{ justifyContent: 'space-between' }}>
        <AppText variant="eyebrow" color="mute">
          {main.kind === 'intro' ? 'INTRODUCTION' : `QUESTION ${number}${topic ? ` · ${topic.title.toUpperCase()}` : ''}`}
        </AppText>
        {review && <ScorePill score={review.score} />}
      </Row>
      {[main, ...thread.followUps].map((t) => (
        <TurnBlock key={t.id} turn={t} active={playing?.turnId === t.id} isPlaying={isPlaying} position={position} onToggle={onToggle} onSave={onSave} editable={editable} />
      ))}
      {review && <ReviewBlock review={review} />}
      {src && (
        <Tap onPress={() => router.push(`/question/${src.topicId}?s=${src.setIndex}&i=${src.index}`)} style={{ flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start' }}>
          <Ionicons name="book-outline" size={15} color={p.accentFg} />
          <AppText variant="label" color="accent">
            See the model answer
          </AppText>
        </Tap>
      )}
    </Card>
  );
}

function TurnBlock({
  turn,
  active,
  isPlaying,
  position,
  onToggle,
  onSave,
  editable,
}: {
  turn: Turn;
  active: boolean;
  isPlaying: boolean;
  position: number;
  onToggle: (t: Turn) => void;
  onSave: (t: Turn, text: string) => Promise<void>;
  editable: boolean;
}) {
  const p = usePalette();
  const words = wordCount(turn.answer);
  const [draft, setDraft] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const save = async () => {
    if (draft === null) return;
    setSaving(true);
    try {
      await onSave(turn, draft);
      setDraft(null);
    } finally {
      setSaving(false);
    }
  };
  const isFollowUp = turn.kind === 'follow_up';
  return (
    <View style={{ gap: 8, paddingLeft: isFollowUp ? 12 : 0, borderLeftWidth: isFollowUp ? 2 : 0, borderLeftColor: p.border }}>
      {isFollowUp && (
        <AppText variant="caption" color="mute">
          FOLLOW-UP
        </AppText>
      )}
      <AppText variant={isFollowUp ? 'bodyMedium' : 'heading'}>{turn.question}</AppText>
      <View style={{ padding: 12, borderRadius: radius.md, backgroundColor: p.surface2, gap: 8 }}>
        <Row style={{ justifyContent: 'space-between' }}>
          <AppText variant="caption" color="mute">
            {turn.skipped ? 'YOU SKIPPED' : 'YOUR ANSWER'}
          </AppText>
          <AppText variant="caption" color="mute">
            {`${clock(turn.answerMs)} · ${words} words`}
          </AppText>
        </Row>
        {draft !== null ? (
          <View style={{ gap: 8 }}>
            <TextInput
              value={draft}
              onChangeText={setDraft}
              multiline
              autoFocus
              placeholder="Type what you said"
              placeholderTextColor={p.textMute}
              selectionColor={p.accentFg}
              style={{
                minHeight: 100,
                padding: 10,
                borderRadius: radius.sm,
                borderWidth: 1,
                borderColor: p.accentFg,
                backgroundColor: p.surface,
                color: p.text,
                fontFamily: fonts.regular,
                fontSize: 15,
                lineHeight: 22,
                textAlignVertical: 'top',
              }}
            />
            <AppText variant="caption" color="mute">
              Fix any misheard words so the feedback judges exactly what you said. Saving clears this question&apos;s old feedback.
            </AppText>
            <Row gap={8}>
              <Button label="Save" size="sm" onPress={save} loading={saving} />
              <Button label="Cancel" size="sm" variant="ghost" onPress={() => setDraft(null)} disabled={saving} />
            </Row>
          </View>
        ) : (
          <AppText variant="body" color={turn.answer ? 'text' : 'mute'}>
            {turn.answer ||
              (turn.needsTranscript
                ? 'Recorded, not transcribed yet. It is transcribed when you get AI feedback.'
                : turn.audio.length
                  ? 'No words were recognised. Listen to the recording.'
                  : 'No answer recorded.')}
          </AppText>
        )}
        {draft === null && (turn.answer || turn.audio.length > 0) && (
          <Row style={{ justifyContent: 'space-between' }}>
            <AppText variant="caption" color="mute">
              {turn.needsTranscript ? 'Not transcribed yet' : SOURCE_LABEL[turn.transcriptSource]}
            </AppText>
            {editable && (
              <Tap onPress={() => setDraft(turn.answer)} hitSlop={8} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Ionicons name="create-outline" size={14} color={p.accentFg} />
                <AppText variant="label" color="accent">
                  Edit
                </AppText>
              </Tap>
            )}
          </Row>
        )}
        {turn.audio.length > 0 && (
          <Tap
            onPress={() => onToggle(turn)}
            accessibilityLabel={active && isPlaying ? 'Pause recording' : 'Play recording'}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 12, borderRadius: radius.pill, backgroundColor: p.surface3 }}>
            <Ionicons name={active && isPlaying ? 'pause' : 'play'} size={14} color={p.text} />
            <AppText variant="label">{active ? `${clock(position * 1000)} / ${clock(turn.answerMs)}` : 'Play my answer'}</AppText>
          </Tap>
        )}
      </View>
      {turn.liveVerdict && (
        <AppText variant="caption" color="mute">
          {`Interviewer's quick read during the call: ${turn.liveVerdict.replace('_', ' ')}`}
        </AppText>
      )}
    </View>
  );
}

function ScorePill({ score }: { score: number }) {
  const p = usePalette();
  const [c, bg] = score >= 4 ? [p.success, p.successSoft] : score === 3 ? [p.warning, p.warningSoft] : [p.danger, p.dangerSoft];
  return <Pill label={`${score}/5`} color={c} bg={bg} mono />;
}

function ReviewBlock({ review }: { review: AnswerReview }) {
  const p = usePalette();
  return (
    <View style={{ gap: 10, paddingTop: 12, borderTopWidth: 1, borderTopColor: p.border }}>
      <AppText variant="label">Feedback</AppText>
      <AppText variant="small" color="dim">
        {review.summary}
      </AppText>
      <BulletList title="Good" items={review.strengths} icon="checkmark-circle-outline" color={p.success} />
      <BulletList title="Missing or wrong" items={review.gaps} icon="alert-circle-outline" color={p.danger} />
      {!!review.tip && (
        <Row gap={8} align="flex-start" style={{ padding: 10, borderRadius: radius.md, backgroundColor: p.accentSoft }}>
          <Ionicons name="bulb-outline" size={16} color={p.accentFg} style={{ marginTop: 2 }} />
          <AppText variant="small" style={{ flex: 1 }}>
            {review.tip}
          </AppText>
        </Row>
      )}
    </View>
  );
}
