import Ionicons from '@expo/vector-icons/Ionicons';
import { useKeepAwake } from 'expo-keep-awake';
import { router } from 'expo-router';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Alert, BackHandler, Linking, ScrollView, type ScrollViewInstance, View } from 'react-native';

import { Banner, clock, Group, InfoRow, useNow } from '@/components/interview';
import { Screen } from '@/components/ui/layout';
import { AppText, Button, Divider, Loading, ProgressBar, Row, Tap } from '@/components/ui/primitives';
import { Avatar } from '@/components/ui/visuals';
import { PAUSE_MS } from '@/lib/interview/endpointer';
import { INTERVIEWER_NAME } from '@/lib/interview/prompts';
import { startReview } from '@/lib/interview/review';
import { InterviewSession, type RoomState } from '@/lib/interview/session';
import { useAuth } from '@/store/auth';
import { aiSettingsOf, useInterviewPrefs, voiceConfigOf } from '@/store/interviewPrefs';
import { fonts, radius, usePalette } from '@/theme';

export default function InterviewRoom() {
  const hydrated = useInterviewPrefs((s) => s.hydrated);
  const user = useAuth((s) => s.user);
  useEffect(() => {
    useInterviewPrefs.getState().hydrate();
  }, []);
  if (!hydrated || !user) {
    return (
      <Screen>
        <Loading />
      </Screen>
    );
  }
  return <Room userId={user.id} />;
}

const RUNNING: RoomState['phase'][] = ['speaking', 'listening', 'thinking'];

function Room({ userId }: { userId: string }) {
  useKeepAwake('interview-room');
  const p = usePalette();
  const [session] = useState(() => {
    const prefs = useInterviewPrefs.getState();
    return new InterviewSession(
      prefs.setup,
      { ...aiSettingsOf(prefs), voice: voiceConfigOf(prefs), pause: prefs.pause, lang: prefs.lang },
      userId,
    );
  });
  const s = useSyncExternalStore(session.subscribe, session.getState);
  const setup = useInterviewPrefs((st) => st.setup);

  useEffect(() => {
    session.prepare();
    return () => {
      session.dispose();
    };
  }, [session]);

  // When an AI interview ends, start the written feedback straight away.
  const reviewStarted = useRef(false);
  useEffect(() => {
    if (s.phase === 'finished' && s.interviewId && setup.mode === 'ai' && !reviewStarted.current) {
      reviewStarted.current = true;
      const prefs = useInterviewPrefs.getState();
      startReview(s.interviewId, { ai: aiSettingsOf(prefs), accurateRecheck: prefs.accurateRecheck });
    }
  }, [s.phase, s.interviewId, setup.mode]);

  const running = RUNNING.includes(s.phase);
  const confirmEnd = () => {
    Alert.alert('End the interview?', 'Your answers so far are saved and you can review them in the report.', [
      { text: 'Keep going', style: 'cancel' },
      { text: 'End interview', style: 'destructive', onPress: () => session.endInterview() },
    ]);
  };

  // Android back button: never leave a running interview by accident.
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (RUNNING.includes(session.getState().phase)) {
        confirmEnd();
        return true;
      }
      return session.getState().phase === 'closing';
    });
    return () => sub.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  if (s.phase === 'loading') {
    return (
      <Screen>
        <Header s={s} onClose={() => router.back()} />
        <Loading label={s.loadingText} />
      </Screen>
    );
  }
  if (s.phase === 'blocked' && s.blocker) return <Blocked s={s} session={session} />;
  if (s.phase === 'lobby') return <Lobby s={s} session={session} />;
  if (s.phase === 'finished') return <Finished s={s} />;

  return (
    <Screen edges={['top', 'bottom']}>
      <Header s={s} onEnd={running ? confirmEnd : undefined} />
      <View style={{ flex: 1, paddingHorizontal: 20, gap: 16 }}>
        <TimeBar s={s} />
        <Interviewer s={s} audioOnly={setup.audioOnly} />
        <Divider />
        <Candidate s={s} session={session} />
        {!!s.notice && <Banner tone="warning">{s.notice}</Banner>}
      </View>
      <Controls s={s} session={session} />
      <View style={{ height: 8, backgroundColor: p.bg }} />
    </Screen>
  );
}

// ---------------------------------------------------------------------------
function Header({ s, onClose, onEnd }: { s: RoomState; onClose?: () => void; onEnd?: () => void }) {
  const p = usePalette();
  const now = useNow(500);
  const left = s.endsAt ? s.endsAt - now : null;
  const color = left == null ? p.textDim : left <= 30_000 ? p.danger : left <= 60_000 ? p.warning : p.text;
  return (
    <Row gap={10} style={{ height: 56, paddingHorizontal: 16 }}>
      <View style={{ flex: 1 }}>
        <AppText variant="label" numberOfLines={1}>
          {s.topicTitles.join(' · ')}
        </AppText>
        <AppText variant="caption" color="mute">
          {`${s.level} level · ${s.mode === 'ai' ? 'AI interviewer' : 'Scripted interviewer'}`}
        </AppText>
      </View>
      {left != null && (
        <View style={{ paddingHorizontal: 12, height: 34, borderRadius: radius.pill, backgroundColor: p.surface2, justifyContent: 'center' }}>
          <AppText style={{ fontFamily: fonts.monoMedium, fontSize: 15, color }}>{s.timeUp ? "Time's up" : clock(left)}</AppText>
        </View>
      )}
      {onEnd && <Button label="End" size="sm" variant="danger" onPress={onEnd} />}
      {onClose && (
        <Tap onPress={onClose} accessibilityLabel="Close" hitSlop={8} style={{ width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: p.surface2 }}>
          <Ionicons name="close" size={20} color={p.text} />
        </Tap>
      )}
    </Row>
  );
}

function TimeBar({ s }: { s: RoomState }) {
  const p = usePalette();
  const now = useNow(1000);
  if (!s.startedAt || !s.endsAt) return null;
  const frac = (now - s.startedAt) / (s.endsAt - s.startedAt);
  return <ProgressBar value={frac} height={3} color={frac > 0.9 ? p.danger : p.textMute} />;
}

function Interviewer({ s, audioOnly }: { s: RoomState; audioOnly: boolean }) {
  const p = usePalette();
  const [shownFor, setShownFor] = useState<string | null>(null);
  const cur = s.current;
  const status = s.phase === 'speaking' ? 'Speaking…' : s.phase === 'thinking' ? 'Thinking…' : s.phase === 'closing' ? 'Wrapping up…' : 'Listening to you';
  const label = !cur
    ? ''
    : cur.kind === 'intro'
      ? 'INTRODUCTION'
      : cur.kind === 'follow_up'
        ? `FOLLOW-UP · ${cur.topicTitle.toUpperCase()}`
        : `QUESTION ${cur.number} · ${cur.topicTitle.toUpperCase()}`;
  const hidden = audioOnly && !!cur && shownFor !== cur.text;
  return (
    <View style={{ gap: 12 }}>
      <Row gap={12}>
        <Avatar name={INTERVIEWER_NAME} size={44} />
        <View style={{ flex: 1 }}>
          <AppText variant="heading">{INTERVIEWER_NAME}</AppText>
          <AppText variant="caption" color={s.phase === 'speaking' ? 'accent' : 'mute'}>
            {`Senior engineer · ${status}`}
          </AppText>
        </View>
      </Row>
      {!!cur && (
        <View style={{ gap: 6 }}>
          <AppText variant="eyebrow" color="mute">
            {label}
          </AppText>
          {hidden ? (
            <Tap onPress={() => setShownFor(cur.text)} style={{ paddingVertical: 10 }}>
              <AppText variant="body" color="dim">
                Question hidden (audio only). Tap to show it.
              </AppText>
            </Tap>
          ) : (
            <AppText style={{ fontFamily: fonts.semibold, fontSize: 20, lineHeight: 28, color: p.text }}>{cur.text}</AppText>
          )}
        </View>
      )}
      {s.phase === 'closing' && (
        <AppText variant="body" color="dim">
          The interviewer is wrapping up. Your answers are saved.
        </AppText>
      )}
    </View>
  );
}

function Candidate({ s, session }: { s: RoomState; session: InterviewSession }) {
  const p = usePalette();
  const now = useNow(500);
  const scrollRef = useRef<ScrollViewInstance>(null);
  const listening = s.phase === 'listening';

  let status: { text: string; color: string };
  if (s.phase === 'listening' && s.mic === 'listening')
    status = { text: `● Listening ${s.answerStartedAt ? clock(now - s.answerStartedAt) : ''}`, color: p.danger };
  else if (s.phase === 'listening' && s.mic === 'stalled') status = { text: 'Microphone stopped', color: p.warning };
  else if (s.phase === 'listening') status = { text: 'Starting microphone…', color: p.textMute };
  else if (s.phase === 'speaking') status = { text: 'Wait for the question to finish', color: p.textMute };
  else if (s.phase === 'thinking' && s.transcribing) status = { text: 'Transcribing…', color: p.textMute };
  else if (s.phase === 'thinking') status = { text: 'Answer saved', color: p.success };
  else status = { text: '', color: p.textMute };

  const grace = s.graceEndsAt && listening ? s.graceEndsAt - now : null;

  return (
    <View style={{ flex: 1, gap: 10 }}>
      <Row style={{ justifyContent: 'space-between' }}>
        <AppText variant="heading">You</AppText>
        <AppText variant="label" style={{ color: status.color, fontFamily: fonts.monoMedium }}>
          {status.text}
        </AppText>
      </Row>
      {grace != null && grace > 0 && <Banner tone="danger" icon="hourglass-outline">{`Time's up. Finish your answer (${clock(grace)})`}</Banner>}
      {s.phase === 'listening' && s.mic === 'stalled' && (
        <Banner tone="warning" action={<Button label="Resume mic" size="sm" variant="secondary" onPress={session.resumeMic} />}>
          The phone stopped listening.
        </Banner>
      )}
      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 12 }}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}>
        {s.transcript ? (
          <AppText variant="body" style={{ fontSize: 16, lineHeight: 24 }}>
            {s.transcript}
          </AppText>
        ) : (
          <AppText variant="body" color="mute">
            {s.transcribing
              ? 'Transcribing your answer…'
              : listening
                ? s.stt === 'phone'
                  ? 'Answer out loud. Your words appear here as you speak.'
                  : s.transcribeLater
                    ? 'Answer out loud. Your voice is recorded and transcribed later.'
                    : 'Answer out loud. Your words appear here when you finish.'
                : ''}
          </AppText>
        )}
      </ScrollView>
    </View>
  );
}

/** No "Done" step: the answer ends on a natural pause. These are only for when you need them. */
function Controls({ s, session }: { s: RoomState; session: InterviewSession }) {
  const p = usePalette();
  const pause = useInterviewPrefs((st) => st.pause);
  const listening = s.phase === 'listening';
  return (
    <View style={{ paddingHorizontal: 20, paddingTop: 10, gap: 8, borderTopWidth: 1, borderTopColor: p.border }}>
      <AppText variant="caption" color="mute" center>
        {`When you finish, just stop talking. ${INTERVIEWER_NAME} continues after about ${PAUSE_MS[pause] / 1000} seconds of silence.`}
      </AppText>
      <Row gap={10}>
        <Button label="Repeat" icon="repeat" variant="secondary" size="sm" onPress={session.repeat} disabled={!listening} style={{ flex: 1 }} />
        <Button label="Skip" icon="play-skip-forward" variant="secondary" size="sm" onPress={session.skip} disabled={!listening} style={{ flex: 1 }} />
        <Button label="I'm done" icon="checkmark" variant="secondary" size="sm" onPress={session.done} disabled={!listening} style={{ flex: 1 }} />
      </Row>
    </View>
  );
}

// ---------------------------------------------------------------------------
function Blocked({ s, session }: { s: RoomState; session: InterviewSession }) {
  const p = usePalette();
  const b = s.blocker!;
  return (
    <Screen>
      <Header s={s} onClose={() => router.back()} />
      <ScrollView contentContainerStyle={{ padding: 24, gap: 16 }}>
        <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: p.warningSoft, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="alert-circle-outline" size={28} color={p.warning} />
        </View>
        <AppText variant="title">{b.title}</AppText>
        <AppText variant="body" color="dim">
          {b.body}
        </AppText>
        <View style={{ gap: 10, marginTop: 8 }}>
          {b.canRetry && <Button label="Try again" icon="refresh" onPress={session.retry} full />}
          {b.canContinueOffline && <Button label="Continue without AI" variant="secondary" onPress={session.continueOffline} full />}
          {b.openSettings && <Button label="Open phone settings" variant="outline" onPress={() => Linking.openSettings()} full />}
          {b.canRecordOnly && <Button label="Record voice only, transcribe later" variant="secondary" onPress={session.continueRecordOnly} full />}
          <Button label="AI and voice settings" variant="ghost" onPress={() => router.push('/interview/server')} full />
        </View>
      </ScrollView>
    </Screen>
  );
}

function Lobby({ s, session }: { s: RoomState; session: InterviewSession }) {
  const setup = useInterviewPrefs((st) => st.setup);
  const pause = useInterviewPrefs((st) => st.pause);
  const tips = [
    'Find a quiet place and keep the phone 20 to 30 cm from your mouth.',
    `${INTERVIEWER_NAME} speaks first. Then just answer out loud, like on a real call.`,
    `There is no button to press: when you stop talking for about ${PAUSE_MS[pause] / 1000} seconds, ${INTERVIEWER_NAME} continues. Expect follow-up questions.`,
    'When time runs out you get 30 seconds to wrap up your answer.',
  ];
  return (
    <Screen edges={['top', 'bottom']}>
      <Header s={s} onClose={() => router.back()} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24, gap: 20 }}>
        <View style={{ gap: 6, paddingTop: 8 }}>
          <AppText variant="title">{"You're all set"}</AppText>
          <AppText variant="body" color="dim">
            {`${INTERVIEWER_NAME} will interview you for ${setup.minutes} minutes. The timer starts when you tap Start.`}
          </AppText>
        </View>
        <Group>
          <InfoRow first label="Topics" value={s.topicTitles.join(', ')} />
          <InfoRow label="Level" value={`${s.level} · ${setup.difficulty[0].toUpperCase()}${setup.difficulty.slice(1)}`} />
          <InfoRow label="Experience" value={setup.years === 0 ? 'Fresher' : `${setup.years} years`} />
          <InfoRow label="Interviewer" value={s.mode === 'ai' ? s.aiLabel : 'Scripted, no AI'} />
          <InfoRow label="Voice" value={s.voiceEngine === 'laptop' ? 'Natural voice (laptop)' : "Phone's voice"} />
          <InfoRow label="Recording" value={s.canRecordAudio ? 'Voice and text' : 'Text only'} />
          <InfoRow label="Speech to text" value={s.stt === 'phone' ? 'On the phone, live' : s.transcribeLater ? 'Later, during feedback' : 'Whisper on your laptop'} />
          <InfoRow label="Starts with" value={setup.intro ? 'Tell me about yourself' : 'Technical questions'} />
        </Group>
        {!!s.notice && <Banner tone="warning">{s.notice}</Banner>}
        <View style={{ gap: 10 }}>
          {tips.map((t) => (
            <Row key={t} gap={10} align="flex-start">
              <AppText variant="body" color="accent">
                •
              </AppText>
              <AppText variant="body" color="dim" style={{ flex: 1 }}>
                {t}
              </AppText>
            </Row>
          ))}
        </View>
      </ScrollView>
      <View style={{ paddingHorizontal: 20, paddingBottom: 12 }}>
        <Button label="Start interview" icon="mic" size="lg" onPress={session.start} full />
      </View>
    </Screen>
  );
}

function Finished({ s }: { s: RoomState }) {
  const p = usePalette();
  const setupMode = useInterviewPrefs((st) => st.setup.mode);
  const minutes = s.startedAt && s.endedAt ? Math.max(1, Math.round((s.endedAt - s.startedAt) / 60000)) : 0;
  return (
    <Screen edges={['top', 'bottom']}>
      <View style={{ flex: 1, padding: 24, justifyContent: 'center', gap: 16 }}>
        <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: p.successSoft, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="checkmark" size={32} color={p.success} />
        </View>
        <AppText variant="title">{s.endedEarly ? 'Interview ended' : 'Interview complete'}</AppText>
        <AppText variant="body" color="dim">
          {`You answered ${s.answered} ${s.answered === 1 ? 'question' : 'questions'} in about ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}. Every answer is saved as ${s.canRecordAudio ? 'voice and text' : 'text'}.`}
        </AppText>
        <AppText variant="body" color="dim">
          {setupMode === 'ai'
            ? 'Your laptop is now writing detailed feedback on each answer. It takes about 30 seconds per question.'
            : 'Open the report to listen to your answers and get AI feedback whenever your laptop is available.'}
        </AppText>
      </View>
      <View style={{ paddingHorizontal: 20, paddingBottom: 12, gap: 10 }}>
        {s.interviewId && <Button label="View report" icon="document-text-outline" size="lg" onPress={() => router.replace(`/interview/review/${s.interviewId}`)} full />}
        <Button label="Back to practice" variant="ghost" onPress={() => (router.canDismiss() ? router.dismissAll() : router.replace('/practice'))} full />
      </View>
    </Screen>
  );
}
