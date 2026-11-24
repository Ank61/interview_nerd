import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInRight } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { InlineText } from '@/components/content';
import { Screen, TopBar } from '@/components/ui/layout';
import { AppText, Button, Chip, DifficultyPill, EmptyState, Loading, Row, Tap } from '@/components/ui/primitives';
import { ProgressRing, TopicIcon } from '@/components/ui/visuals';
import { catalog, getMcq, type McqItem } from '@/data/catalog';
import { useContents } from '@/lib/content';
import { dayKey, seeded, shuffle } from '@/lib/gamification';
import { haptic } from '@/lib/haptics';
import { useProgress, type QuizRecord } from '@/store/progress';
import { useSettings } from '@/store/settings';
import { fonts, radius, usePalette } from '@/theme';

type Q = McqItem & { cat: string };
type Answer = { picked: number | null; correct: boolean };
type Phase = 'setup' | 'play' | 'result';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export default function QuizScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const isDaily = id === 'daily';
  const isMistakes = id === 'mistakes';
  const cat = getMcq(id);
  // Snapshot of missed questions when the screen opens; answering them
  // correctly removes them from the store, but this quiz keeps its list.
  const [mistakeCats] = useState(() => useProgress.getState().mistakes);
  const mistakeIds = useMemo(() => Object.keys(mistakeCats), [mistakeCats]);

  // Which payloads are needed for this quiz
  const assetKeys = useMemo(() => {
    if (isDaily) return catalog.mcq.filter((m) => m.count >= 50).map((m) => m.a);
    if (isMistakes) {
      const cats = new Set(mistakeIds.map((k) => mistakeCats[k]?.c));
      return catalog.mcq.filter((m) => cats.has(m.id)).map((m) => m.a);
    }
    return cat ? [cat.a] : [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const { data, loading } = useContents<McqItem[]>(assetKeys);

  const pool = useMemo<Q[]>(() => {
    if (!data) return [];
    const byKey = new Map(catalog.mcq.map((m) => [m.a, m.id]));
    return data.flatMap((list, n) => list.map((q) => ({ ...q, cat: byKey.get(assetKeys[n]) || '' })));
  }, [data, assetKeys]);

  // Daily and mistakes quizzes skip setup: their questions derive from the pool.
  const autoQuestions = useMemo<Q[] | null>(() => {
    if (!pool.length) return null;
    if (isDaily) return shuffle(pool, seeded(`daily-${dayKey()}`)).slice(0, 5);
    if (isMistakes) {
      const ids = new Set(mistakeIds);
      return shuffle(pool.filter((q) => ids.has(q.id))).slice(0, 15);
    }
    return null;
  }, [pool, isDaily, isMistakes, mistakeIds]);

  const auto = isDaily || isMistakes;
  const [phase, setPhase] = useState<Phase>(auto ? 'play' : 'setup');
  const [mode, setMode] = useState<QuizRecord['mode']>(isDaily ? 'daily' : isMistakes ? 'mistakes' : 'practice');
  const [difficulty, setDifficulty] = useState('all');
  const [count, setCount] = useState(10);
  const [custom, setCustom] = useState<Q[] | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [summary, setSummary] = useState({ xp: 0, seconds: 0 });
  const [round, setRound] = useState(0);
  const questions = custom ?? autoQuestions ?? [];

  const title = isDaily ? 'Daily Challenge' : isMistakes ? 'Review Mistakes' : `${cat?.title ?? ''} Quiz`;

  const begin = () => {
    const filtered = difficulty === 'all' ? pool : pool.filter((q) => q.d === difficulty);
    setCustom(shuffle(filtered).slice(0, count));
    setAnswers([]);
    setRound((r) => r + 1);
    setPhase('play');
  };

  const confirmLeave = () => {
    if (phase !== 'play' || answers.length === 0) return router.back();
    Alert.alert('Leave quiz?', 'Your progress in this quiz will be lost.', [
      { text: 'Keep going', style: 'cancel' },
      { text: 'Leave', style: 'destructive', onPress: () => router.back() },
    ]);
  };

  if (!isDaily && !isMistakes && !cat) return <Screen><TopBar /><EmptyState icon="alert-circle" title="Quiz not found" /></Screen>;
  if (isMistakes && mistakeIds.length === 0)
    return (
      <Screen>
        <TopBar title={title} />
        <EmptyState icon="happy" title="No mistakes to review" body="Questions you get wrong in quizzes show up here so you can retry them." action="Back to practice" onAction={() => router.back()} />
      </Screen>
    );

  return (
    <Screen>
      <TopBar title={title} onBack={confirmLeave} subtitle={phase === 'play' ? `${mode === 'timed' ? 'Timed' : 'Practice'} mode` : undefined} />
      {loading || (phase === 'play' && !questions.length && !data) ? (
        <Loading label="Preparing questions" />
      ) : phase === 'setup' && cat ? (
        <Setup
          catId={cat.id}
          difficulties={cat.difficulties}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          count={count}
          setCount={setCount}
          mode={mode}
          setMode={setMode}
          available={difficulty === 'all' ? pool.length : pool.filter((q) => q.d === difficulty).length}
          onStart={begin}
        />
      ) : phase === 'play' ? (
        <Play
          key={round}
          questions={questions}
          mode={mode}
          onAnswer={(a) => setAnswers((prev) => [...prev, a])}
          answers={answers}
          onFinish={(final, seconds) => {
            const score = final.filter((a) => a.correct).length;
            const rec = { cat: isDaily ? 'daily' : isMistakes ? 'mistakes' : cat!.id, title, score, total: final.length, mode };
            const { xp } = useProgress.getState().finishQuiz(rec);
            const perAnswerXp = mode === 'timed' ? 0 : score * 10;
            setSummary({ xp: xp + perAnswerXp, seconds });
            setAnswers(final);
            setPhase('result');
            haptic.success();
          }}
        />
      ) : (
        <Result
          questions={questions}
          answers={answers}
          seconds={summary.seconds}
          xp={summary.xp}
          onRetry={isDaily || isMistakes ? undefined : () => setPhase('setup')}
        />
      )}
    </Screen>
  );
}

// ---------------------------------------------------------------------------
function Setup(props: {
  catId: string;
  difficulties: { d: string; n: number }[];
  difficulty: string;
  setDifficulty: (d: string) => void;
  count: number;
  setCount: (n: number) => void;
  mode: QuizRecord['mode'];
  setMode: (m: QuizRecord['mode']) => void;
  available: number;
  onStart: () => void;
}) {
  const p = usePalette();
  const insets = useSafeAreaInsets();
  const cat = getMcq(props.catId)!;
  const stats = useProgress((s) => s.mcq[props.catId]);
  const timer = useSettings((s) => s.quizTimer);
  const counts = [5, 10, 20, 30].filter((n) => n <= Math.max(5, props.available));
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 20, gap: 26 }}>
        <Row gap={16}>
          <TopicIcon item={cat} size={60} />
          <View style={{ flex: 1 }}>
            <AppText variant="title">{cat.title}</AppText>
            <AppText variant="small" color="mute">
              {cat.count} questions{stats ? ` · best ${stats.best}% · ${Math.round((stats.correct / Math.max(1, stats.answered)) * 100)}% accuracy` : ''}
            </AppText>
          </View>
        </Row>

        <View style={{ gap: 12 }}>
          <AppText variant="heading">Mode</AppText>
          {(
            [
              { v: 'practice', icon: 'school', t: 'Practice', b: 'Instant feedback with explanations after each answer' },
              { v: 'timed', icon: 'timer', t: 'Timed exam', b: `${timer}s per question, results at the end` },
            ] as const
          ).map((m) => {
            const active = props.mode === m.v;
            return (
              <Tap
                key={m.v}
                onPress={() => props.setMode(m.v)}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16, borderRadius: radius.lg, backgroundColor: active ? p.accentSoft : p.surface, borderWidth: 1.5, borderColor: active ? p.accentFg : p.border }}>
                <Ionicons name={m.icon} size={22} color={active ? p.accentFg : p.textDim} />
                <View style={{ flex: 1 }}>
                  <AppText variant="label" style={{ fontSize: 15 }}>
                    {m.t}
                  </AppText>
                  <AppText variant="caption" color="mute">
                    {m.b}
                  </AppText>
                </View>
                <Ionicons name={active ? 'radio-button-on' : 'radio-button-off'} size={20} color={active ? p.accentFg : p.textMute} />
              </Tap>
            );
          })}
        </View>

        <View style={{ gap: 12 }}>
          <AppText variant="heading">Difficulty</AppText>
          <Row gap={8} style={{ flexWrap: 'wrap' }}>
            <Chip label="All" count={cat.count} selected={props.difficulty === 'all'} onPress={() => props.setDifficulty('all')} />
            {props.difficulties.map((d) => (
              <Chip key={d.d} label={d.d[0].toUpperCase() + d.d.slice(1)} count={d.n} selected={props.difficulty === d.d} onPress={() => props.setDifficulty(d.d)} />
            ))}
          </Row>
        </View>

        <View style={{ gap: 12 }}>
          <AppText variant="heading">Questions</AppText>
          <Row gap={8}>
            {counts.map((n) => (
              <Chip key={n} label={String(n)} selected={props.count === n} onPress={() => props.setCount(n)} />
            ))}
          </Row>
        </View>
      </ScrollView>
      <View style={{ padding: 20, paddingBottom: insets.bottom + 14, borderTopWidth: 1, borderTopColor: p.border }}>
        <Button label={`Start ${Math.min(props.count, props.available)} questions`} size="lg" iconRight="play" onPress={props.onStart} disabled={!props.available} full />
      </View>
    </View>
  );
}

// ---------------------------------------------------------------------------
type PlayProps = { questions: Q[]; mode: QuizRecord['mode']; answers: Answer[]; onAnswer: (a: Answer) => void; onFinish: (a: Answer[], seconds: number) => void };

/** Runs a quiz; each question gets a fresh step (keyed) so its state resets. */
function Play(props: PlayProps) {
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);
  const idx = props.answers.length;
  return <QuestionStep key={idx} {...props} idx={idx} elapsed={() => Math.round((Date.now() - startedAt.current) / 1000)} />;
}

function QuestionStep({ questions, mode, answers, onAnswer, onFinish, idx, elapsed }: PlayProps & { idx: number; elapsed: () => number }) {
  const p = usePalette();
  const insets = useSafeAreaInsets();
  const recordAnswer = useProgress((s) => s.recordAnswer);
  const timerSecs = useSettings((s) => s.quizTimer);
  const q = questions[Math.min(idx, questions.length - 1)];
  const [picked, setPicked] = useState<number | null>(null);
  const [left, setLeft] = useState(timerSecs);
  const timed = mode === 'timed';
  const locked = picked !== null;

  const commit = (choice: number | null) => {
    const correct = choice === q.a;
    recordAnswer({ id: q.id, cat: q.cat, correct, mode });
    const next = [...answers, { picked: choice, correct }];
    if (next.length >= questions.length) onFinish(next, elapsed());
    else onAnswer({ picked: choice, correct });
  };

  // Countdown for timed mode
  useEffect(() => {
    if (!timed || locked) return;
    const t = setTimeout(() => {
      if (left <= 1) {
        haptic.warn();
        commit(null);
      } else setLeft(left - 1);
    }, 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left, timed, locked]);

  if (!q) return <EmptyState icon="help-circle" title="No questions available" />;

  const choose = (i: number) => {
    if (locked) return;
    setPicked(i);
    if (timed) {
      haptic.tap();
      setTimeout(() => commit(i), 220);
    } else if (i === q.a) haptic.success();
    else haptic.error();
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 20, gap: 10, paddingBottom: 8 }}>
        <Row style={{ justifyContent: 'space-between' }}>
          <AppText variant="label" color="dim">
            Question {idx + 1} <AppText variant="label" color="mute">/ {questions.length}</AppText>
          </AppText>
          {timed ? (
            <Row gap={6}>
              <Ionicons name="timer-outline" size={15} color={left <= 10 ? p.danger : p.textDim} />
              <AppText style={{ fontFamily: fonts.mono, fontSize: 13, color: left <= 10 ? p.danger : p.textDim }}>{left}s</AppText>
            </Row>
          ) : (
            <AppText variant="label" color="success">
              {answers.filter((a) => a.correct).length} correct
            </AppText>
          )}
        </Row>
        <Row gap={4}>
          {questions.map((_, n) => (
            <View
              key={n}
              style={{
                flex: 1,
                height: 4,
                borderRadius: 2,
                backgroundColor: n < idx ? (timed ? p.accent : answers[n]?.correct ? p.success : p.danger) : n === idx ? p.text : p.surface3,
              }}
            />
          ))}
        </Row>
        {timed && (
          <View style={{ height: 3, borderRadius: 2, backgroundColor: p.surface3, overflow: 'hidden' }}>
            <View style={{ width: `${(left / timerSecs) * 100}%`, height: '100%', backgroundColor: left <= 10 ? p.danger : p.accent }} />
          </View>
        )}
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 12, gap: 18, paddingBottom: 30 }}>
        <Animated.View key={q.id + idx} entering={FadeInRight.duration(260)} style={{ gap: 18 }}>
          <Row gap={8}>
            <DifficultyPill value={q.d} />
            {mode !== 'practice' && mode !== 'timed' && getMcq(q.cat) && (
              <AppText variant="caption" color="mute">
                {getMcq(q.cat)?.title}
              </AppText>
            )}
          </Row>
          <InlineText text={q.q} style={{ fontFamily: fonts.semibold, fontSize: 19, lineHeight: 27 }} />

          <View style={{ gap: 10 }}>
            {q.o.map((opt, i) => {
              const isPicked = picked === i;
              const isCorrect = i === q.a;
              const reveal = locked && !timed;
              const border = reveal ? (isCorrect ? p.success : isPicked ? p.danger : p.border) : isPicked ? p.accentFg : p.border;
              const bg = reveal ? (isCorrect ? p.successSoft : isPicked ? p.dangerSoft : p.surface) : isPicked ? p.accentSoft : p.surface;
              return (
                <Tap
                  key={i}
                  onPress={() => choose(i)}
                  disabled={locked && !isPicked && !(reveal && isCorrect)}
                  haptics={false}
                  scale={0.985}
                  accessibilityLabel={`Option ${LETTERS[i]}: ${opt}`}
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: radius.lg, backgroundColor: bg, borderWidth: 1.5, borderColor: border }}>
                  <View style={{ width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: reveal && isCorrect ? p.success : reveal && isPicked ? p.danger : p.surface2 }}>
                    {reveal && (isCorrect || isPicked) ? (
                      <Ionicons name={isCorrect ? 'checkmark' : 'close'} size={17} color="#FFFFFF" />
                    ) : (
                      <AppText style={{ fontFamily: fonts.bold, fontSize: 12.5, color: p.textDim }}>{LETTERS[i]}</AppText>
                    )}
                  </View>
                  <InlineText text={opt} style={{ flex: 1 }} variant="bodyMedium" />
                </Tap>
              );
            })}
          </View>

          {locked && !timed && (
            <Animated.View entering={FadeInDown.duration(280)} style={{ padding: 16, borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border, gap: 8 }}>
              <Row gap={8}>
                <Ionicons name={picked === q.a ? 'checkmark-circle' : 'information-circle'} size={18} color={picked === q.a ? p.success : p.warning} />
                <AppText variant="label" style={{ color: picked === q.a ? p.success : p.warning }}>
                  {picked === q.a ? 'Correct! +10 XP' : `Not quite — the answer is ${LETTERS[q.a]}`}
                </AppText>
              </Row>
              {!!q.e && <InlineText text={q.e} color={p.textDim} />}
            </Animated.View>
          )}
        </Animated.View>
      </ScrollView>

      {locked && !timed && (
        <Animated.View entering={FadeIn} style={{ padding: 20, paddingBottom: insets.bottom + 14, borderTopWidth: 1, borderTopColor: p.border }}>
          <Button label={idx + 1 >= questions.length ? 'See results' : 'Next question'} size="lg" iconRight="arrow-forward" onPress={() => commit(picked)} full />
        </Animated.View>
      )}
    </View>
  );
}

// ---------------------------------------------------------------------------
function Result({ questions, answers, seconds, xp, onRetry }: { questions: Q[]; answers: Answer[]; seconds: number; xp: number; onRetry?: () => void }) {
  const p = usePalette();
  const insets = useSafeAreaInsets();
  const [review, setReview] = useState(false);
  const score = answers.filter((a) => a.correct).length;
  const pct = Math.round((score / Math.max(1, answers.length)) * 100);
  const verdict = pct === 100 ? 'Flawless! 🎉' : pct >= 80 ? 'Excellent work' : pct >= 60 ? 'Good job' : pct >= 40 ? 'Getting there' : 'Keep practicing';
  const color = pct >= 70 ? p.success : pct >= 40 ? p.warning : p.danger;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 20, gap: 22, paddingBottom: 30 }}>
        <Animated.View entering={FadeInDown.duration(400)} style={{ alignItems: 'center', gap: 14, paddingVertical: 10 }}>
          <ProgressRing value={pct / 100} size={150} stroke={12} color={color}>
            <AppText style={{ fontFamily: fonts.extrabold, fontSize: 38, color: p.text, letterSpacing: -1 }}>{pct}%</AppText>
            <AppText variant="caption" color="mute">
              {score} of {answers.length}
            </AppText>
          </ProgressRing>
          <AppText variant="title">{verdict}</AppText>
        </Animated.View>

        <Row gap={10}>
          {[
            { icon: 'flash' as const, v: `+${xp}`, l: 'XP earned', c: p.accentFg },
            { icon: 'checkmark-circle' as const, v: score, l: 'Correct', c: p.success },
            { icon: 'time' as const, v: `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`, l: 'Time', c: p.info },
          ].map((s) => (
            <View key={s.l} style={{ flex: 1, alignItems: 'center', gap: 4, padding: 14, borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border }}>
              <Ionicons name={s.icon} size={18} color={s.c} />
              <AppText style={{ fontFamily: fonts.bold, fontSize: 18, color: p.text }}>{s.v}</AppText>
              <AppText variant="caption" color="mute">
                {s.l}
              </AppText>
            </View>
          ))}
        </Row>

        <Tap onPress={() => setReview((r) => !r)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border }}>
          <AppText variant="label" style={{ fontSize: 15 }}>
            Review answers
          </AppText>
          <Ionicons name={review ? 'chevron-up' : 'chevron-down'} size={18} color={p.textDim} />
        </Tap>
        {review &&
          questions.slice(0, answers.length).map((q, n) => {
            const a = answers[n];
            return (
              <View key={q.id + n} style={{ padding: 16, borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: a.correct ? p.successSoft : p.dangerSoft, gap: 10 }}>
                <Row gap={8} align="flex-start">
                  <Ionicons name={a.correct ? 'checkmark-circle' : 'close-circle'} size={18} color={a.correct ? p.success : p.danger} style={{ marginTop: 2 }} />
                  <InlineText text={q.q} style={{ flex: 1, fontFamily: fonts.semibold }} />
                </Row>
                {!a.correct && (
                  <AppText variant="small" color="danger">
                    Your answer: {a.picked === null ? 'No answer (time ran out)' : q.o[a.picked]}
                  </AppText>
                )}
                <AppText variant="small" color="success">
                  Correct: {q.o[q.a]}
                </AppText>
                {!!q.e && <InlineText text={q.e} variant="small" color={p.textDim} />}
              </View>
            );
          })}
      </ScrollView>
      <View style={{ flexDirection: 'row', gap: 10, padding: 20, paddingBottom: insets.bottom + 14, borderTopWidth: 1, borderTopColor: p.border }}>
        {onRetry && <Button label="Try again" variant="secondary" size="lg" icon="refresh" onPress={onRetry} style={{ flex: 1 }} />}
        <Button label="Done" size="lg" onPress={() => router.back()} style={{ flex: 1 }} />
      </View>
    </View>
  );
}
