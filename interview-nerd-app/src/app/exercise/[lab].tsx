import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, KeyboardAvoidingView, ScrollView, type ScrollViewInstance, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CodeEditor } from '@/components/CodeEditor';
import { Bullets, CodeView, InlineText } from '@/components/content';
import { Screen, TopBar } from '@/components/ui/layout';
import { AppText, Button, DifficultyPill, EmptyState, IconButton, Loading, Pill, Row, SectionHeader, Tap } from '@/components/ui/primitives';
import { exerciseKey, getLab, type Exercise, type LabContent } from '@/data/catalog';
import { useContent } from '@/lib/content';
import { haptic } from '@/lib/haptics';
import { detectFunctionName, runJs, type JsRunResult } from '@/lib/runners/js';
import { createMongoRunner, type MongoResult } from '@/lib/runners/mongo';
import { checkSql, runSql, tableSummary, type Dataset, type SqlResult } from '@/lib/runners/sql';
import { useProgress } from '@/store/progress';
import { fonts, radius, usePalette } from '@/theme';

type Output =
  | { kind: 'js'; result: JsRunResult }
  | { kind: 'sql'; result?: SqlResult; error?: string; check?: { pass: boolean; expected: SqlResult } }
  | { kind: 'mongo'; result: MongoResult; check?: { pass: boolean; expected: MongoResult } };

export default function ExerciseScreen() {
  const { lab: labId, m, e } = useLocalSearchParams<{ lab: string; m: string; e: string }>();
  const meta = getLab(labId);
  const { data, loading } = useContent<LabContent>(meta?.a);
  const modIdx = Number(m) || 0;
  const exIdx = Number(e) || 0;
  const mod = data?.modules[modIdx];
  const ex = mod?.exercises[exIdx];

  if (!meta) return <Screen><TopBar /><EmptyState icon="alert-circle" title="Lab not found" /></Screen>;
  if (loading || !data || !mod || !ex) return <Screen><TopBar title={meta.title} /><Loading label="Loading exercise" /></Screen>;
  return <ExerciseView key={ex.id} lab={data} labId={meta.id} runner={meta.runner} ex={ex} modIdx={modIdx} exIdx={exIdx} total={mod.exercises.length} moduleTitle={mod.title} />;
}

function ExerciseView({ lab, labId, runner, ex, modIdx, exIdx, total, moduleTitle }: { lab: LabContent; labId: string; runner: LabContent['runner']; ex: Exercise; modIdx: number; exIdx: number; total: number; moduleTitle: string }) {
  const p = usePalette();
  const insets = useSafeAreaInsets();
  const key = exerciseKey(labId, ex.id);
  const draft = useProgress((s) => s.drafts[key]);
  const solved = useProgress((s) => !!s.solved[key]);
  const saved = useProgress((s) => !!s.bookmarks[key]);
  const saveDraft = useProgress((s) => s.saveDraft);
  const setSolved = useProgress((s) => s.setSolved);
  const toggleBookmark = useProgress((s) => s.toggleBookmark);
  const pushRecent = useProgress((s) => s.pushRecent);
  const [code, setCode] = useState(draft ?? ex.starter ?? '');
  const [hints, setHints] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState<Output | null>(null);
  const scrollRef = useRef<ScrollViewInstance>(null);
  const href = `/exercise/${labId}?m=${modIdx}&e=${exIdx}`;

  const mongo = useMemo(() => (runner === 'mongo' && lab.datasets ? createMongoRunner(lab.datasets) : null), [runner, lab.datasets]);
  const dataset = runner === 'sql' && ex.dataset ? (lab.datasets?.[ex.dataset] as Dataset | undefined) : undefined;
  const fnName = runner === 'js' ? detectFunctionName(ex.starter) : undefined;

  useEffect(() => {
    pushRecent({ key, kind: 'exercise', title: ex.title, sub: `${lab.title} · ${moduleTitle}`, href });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const onChange = (v: string) => {
    setCode(v);
    saveDraft(key, v);
  };

  const markSolved = () => {
    if (!solved) {
      setSolved(labId, ex.id, ex.difficulty);
      haptic.success();
    }
  };

  const scrollToOutput = () => setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 120);

  const run = async (check: boolean) => {
    if (!code.trim()) return;
    setRunning(true);
    try {
      if (runner === 'js') {
        const result = runJs(code, { testCases: check ? ex.testCases : undefined, fnName });
        setOutput({ kind: 'js', result });
        if (check && result.tests?.length && result.tests.every((t) => t.pass)) markSolved();
        else if (check) haptic.error();
      } else if (runner === 'sql' && dataset) {
        try {
          if (check) {
            const r = await checkSql(dataset, code, ex.solution);
            setOutput({ kind: 'sql', result: r.user, check: { pass: r.pass, expected: r.expected } });
            if (r.pass) markSolved();
            else haptic.error();
          } else setOutput({ kind: 'sql', result: await runSql(dataset, code) });
        } catch (err) {
          setOutput({ kind: 'sql', error: (err as Error).message });
          haptic.error();
        }
      } else if (runner === 'mongo' && mongo && ex.dataset) {
        if (check) {
          const r = mongo.check(ex.dataset, code, ex.solution);
          setOutput({ kind: 'mongo', result: r.user, check: { pass: r.pass, expected: r.expected } });
          if (r.pass) markSolved();
          else haptic.error();
        } else setOutput({ kind: 'mongo', result: mongo.run(ex.dataset, code) });
      }
    } finally {
      setRunning(false);
      scrollToOutput();
    }
  };

  const go = (n: number) => router.replace(`/exercise/${labId}?m=${modIdx}&e=${n}`);
  const canCheck = (runner === 'js' && !!ex.testCases?.length) || runner === 'sql' || runner === 'mongo';
  const lang = runner === 'mongo' ? 'mongo' : ex.lang;

  return (
    <Screen>
      <TopBar
        title={ex.title}
        subtitle={`${moduleTitle} · ${exIdx + 1} of ${total}`}
        right={
          <IconButton
            icon={saved ? 'bookmark' : 'bookmark-outline'}
            active={saved}
            label="Bookmark"
            onPress={() => toggleBookmark({ key, kind: 'exercise', title: ex.title, sub: `${lab.title} · ${moduleTitle}`, href })}
          />
        }
      />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={insets.top + 52}>
        <ScrollView ref={scrollRef} keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30, gap: 22 }}>
          <View style={{ gap: 12 }}>
            <Row gap={8} style={{ flexWrap: 'wrap' }}>
              <DifficultyPill value={ex.difficulty} />
              {solved && <Pill icon="checkmark-circle" label="Solved" color={p.success} bg={p.successSoft} />}
              {ex.fileType && <Pill label={ex.fileType} mono />}
              {ex.tags.slice(0, 4).map((t) => (
                <Pill key={t} label={t} mono />
              ))}
            </Row>
            <AppText variant="title" style={{ fontSize: 22 }}>
              {ex.title}
            </AppText>
            {ex.description.split(/\n{2,}/).map((para, i) => (
              <InlineText key={i} text={para} color={p.textDim} />
            ))}
          </View>

          {!!ex.examples?.length && (
            <View style={{ gap: 8 }}>
              {ex.examples.map((x, i) => (
                <View key={i} style={{ padding: 14, borderRadius: radius.md, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border, gap: 4 }}>
                  <AppText variant="eyebrow" color="mute">
                    EXAMPLE {i + 1}
                  </AppText>
                  <AppText variant="mono" style={{ color: p.text }}>
                    Input: {x.input}
                  </AppText>
                  <AppText variant="mono" style={{ color: p.text }}>
                    Output: {x.output}
                  </AppText>
                  {!!x.explanation && (
                    <AppText variant="small" color="mute">
                      {x.explanation}
                    </AppText>
                  )}
                </View>
              ))}
              {ex.complexity && (
                <AppText variant="caption" color="mute">
                  Target: {ex.complexity.time} time · {ex.complexity.space} space
                </AppText>
              )}
            </View>
          )}

          {!!ex.expectedOutput && runner !== 'mongo' && <CodeView code={ex.expectedOutput} label="Expected output" />}

          {dataset && <SchemaCard dataset={dataset} name={ex.dataset!} onInsert={(t) => onChange(code.trim() ? `${code}${/s$/.test(code) ? '' : ' '}${t}` : `SELECT * FROM ${t};`)} />}
          {mongo && ex.dataset && (
            <Row gap={6} style={{ flexWrap: 'wrap' }}>
              <AppText variant="caption" color="mute">
                Collections:
              </AppText>
              {mongo.collections(ex.dataset).map((c) => (
                <Pill key={c.name} label={`${c.name} (${c.count})`} mono />
              ))}
            </Row>
          )}

          <View style={{ gap: 10 }}>
            <Row style={{ justifyContent: 'space-between' }}>
              <AppText variant="eyebrow" color="accent">
                YOUR {runner ? 'CODE' : 'ANSWER'}
              </AppText>
              <Tap
                onPress={() =>
                  Alert.alert('Reset code?', 'Your draft will be replaced with the starter code.', [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Reset', style: 'destructive', onPress: () => onChange(ex.starter || '') },
                  ])
                }
                hitSlop={8}>
                <Row gap={4}>
                  <Ionicons name="refresh" size={13} color={p.textMute} />
                  <AppText variant="caption" color="mute">
                    Reset
                  </AppText>
                </Row>
              </Tap>
            </Row>
            <CodeEditor
              value={code}
              onChange={onChange}
              lang={lang}
              placeholder={runner === 'sql' ? 'SELECT ... FROM ...;' : runner === 'mongo' ? 'db.collection.find({ ... })' : `Write your ${ex.fileType || ex.lang} here`}
            />
          </View>

          {runner ? (
            <Row gap={10}>
              <Button label="Run" icon="play" variant="secondary" onPress={() => run(false)} loading={running} style={{ flex: 1 }} />
              {canCheck && <Button label={runner === 'js' ? 'Run tests' : 'Submit'} icon="checkmark-done" onPress={() => run(true)} loading={running} style={{ flex: 1 }} />}
            </Row>
          ) : (
            <Row gap={10}>
              <Button label={showSolution ? 'Hide solution' : 'Compare with solution'} icon="git-compare" variant="secondary" onPress={() => setShowSolution((s) => !s)} style={{ flex: 1 }} />
              <Button label={solved ? 'Solved' : 'Mark solved'} icon={solved ? 'checkmark-circle' : 'checkmark'} onPress={() => (solved ? setSolved(labId, ex.id, ex.difficulty, false) : markSolved())} style={{ flex: 1 }} variant={solved ? 'outline' : 'primary'} />
            </Row>
          )}

          {output && <OutputPanel output={output} />}

          {ex.hints.length > 0 && (
            <View style={{ gap: 10 }}>
              <SectionHeader title="Hints" eyebrow={`${hints}/${ex.hints.length} revealed`} style={{ marginBottom: 0 }} />
              {ex.hints.slice(0, hints).map((h, i) => (
                <Animated.View key={i} entering={FadeInDown.duration(220)} style={{ flexDirection: 'row', gap: 10, padding: 14, borderRadius: radius.md, backgroundColor: p.warningSoft }}>
                  <Ionicons name="bulb" size={16} color={p.warning} style={{ marginTop: 2 }} />
                  <InlineText text={h} style={{ flex: 1 }} />
                </Animated.View>
              ))}
              {hints < ex.hints.length && <Button label={hints ? 'Show next hint' : 'Show a hint'} icon="bulb-outline" variant="outline" size="sm" onPress={() => setHints((h) => h + 1)} style={{ alignSelf: 'flex-start' }} />}
            </View>
          )}

          {(runner ? true : showSolution) && !!ex.solution && (
            <View style={{ gap: 10 }}>
              <SectionHeader title="Solution" style={{ marginBottom: 0 }} />
              {showSolution ? (
                <>
                  <CodeView code={ex.solution} label={ex.fileType || ex.lang} />
                  {runner && !solved && (
                    <View style={{ gap: 8 }}>
                      <AppText variant="caption" color="mute">
                        {runner === 'sql'
                          ? 'Some questions use MySQL/Postgres-only features that SQLite can’t run. If yours matches the solution, mark it solved.'
                          : runner === 'mongo'
                            ? 'A few advanced operators ($geoNear, $let…) aren’t supported offline. If your query matches the solution, mark it solved.'
                            : 'Confident your approach is right? You can mark it solved yourself.'}
                      </AppText>
                      <Button label="Mark as solved" icon="checkmark" variant="outline" size="sm" onPress={markSolved} style={{ alignSelf: 'flex-start' }} />
                    </View>
                  )}
                </>
              ) : (
                <Tap
                  onPress={() => setShowSolution(true)}
                  style={{ alignItems: 'center', gap: 8, paddingVertical: 22, borderRadius: radius.lg, borderWidth: 1, borderStyle: 'dashed', borderColor: p.borderStrong }}>
                  <Ionicons name="eye-off-outline" size={22} color={p.textDim} />
                  <AppText variant="label">Reveal solution</AppText>
                  <AppText variant="caption" color="mute">
                    Give it a real try first
                  </AppText>
                </Tap>
              )}
            </View>
          )}

          {ex.commands.length > 0 && (
            <View>
              <SectionHeader title="Commands to practice" />
              <CodeView code={ex.commands.join('\n')} label="shell" />
            </View>
          )}

          {ex.questions.length > 0 && (
            <View>
              <SectionHeader title="Interview follow-ups" />
              <View style={{ padding: 16, borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border }}>
                <Bullets items={ex.questions} />
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={{ flexDirection: 'row', gap: 10, paddingHorizontal: 16, paddingTop: 10, paddingBottom: Math.max(insets.bottom, 12), borderTopWidth: 1, borderTopColor: p.border, backgroundColor: p.bg }}>
        <Button label="Previous" icon="chevron-back" variant="secondary" disabled={exIdx === 0} onPress={() => go(exIdx - 1)} style={{ flex: 1 }} />
        <Button label="Next" iconRight="chevron-forward" variant="secondary" disabled={exIdx >= total - 1} onPress={() => go(exIdx + 1)} style={{ flex: 1 }} />
      </View>
    </Screen>
  );
}

function SchemaCard({ dataset, name, onInsert }: { dataset: Dataset; name: string; onInsert: (table: string) => void }) {
  const p = usePalette();
  const [open, setOpen] = useState(false);
  const tables = tableSummary(dataset);
  return (
    <View style={{ borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border, overflow: 'hidden' }}>
      <Tap onPress={() => setOpen((o) => !o)} scale={0.99} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14 }}>
        <Ionicons name="server-outline" size={18} color={p.accentFg} />
        <View style={{ flex: 1 }}>
          <AppText variant="label">Dataset: {name}</AppText>
          <AppText variant="caption" color="mute">
            {tables.map((t) => t.name).join(', ')}
          </AppText>
        </View>
        <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={18} color={p.textMute} />
      </Tap>
      {open && (
        <View style={{ paddingHorizontal: 14, paddingBottom: 14, gap: 10 }}>
          {tables.map((t) => (
            <Tap key={t.name} onPress={() => onInsert(t.name)} style={{ padding: 12, borderRadius: radius.md, backgroundColor: p.surface2, gap: 4 }}>
              <Row style={{ justifyContent: 'space-between' }}>
                <AppText style={{ fontFamily: fonts.monoMedium, fontSize: 13, color: p.text }}>{t.name}</AppText>
                <AppText variant="caption" color="mute">
                  {t.rows} rows
                </AppText>
              </Row>
              <AppText variant="mono" style={{ fontSize: 11.5, color: p.textDim }}>
                {t.columns.join(', ')}
              </AppText>
            </Tap>
          ))}
        </View>
      )}
    </View>
  );
}

function ResultTable({ result }: { result: SqlResult }) {
  const p = usePalette();
  if (!result.columns.length) return <AppText variant="small" color="dim">{result.changes != null ? `${result.changes} row(s) affected` : 'Query returned no rows.'}</AppText>;
  const rows = result.rows.slice(0, 50);
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View>
        <View style={{ flexDirection: 'row', backgroundColor: p.surface2 }}>
          {result.columns.map((c) => (
            <AppText key={c} style={{ width: 120, padding: 8, fontFamily: fonts.semibold, fontSize: 12, color: p.text }} numberOfLines={1}>
              {c}
            </AppText>
          ))}
        </View>
        {rows.map((r, i) => (
          <View key={i} style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: p.border }}>
            {r.map((v, j) => (
              <AppText key={j} style={{ width: 120, padding: 8, fontFamily: fonts.mono, fontSize: 11.5, color: v === null ? p.textMute : p.textDim }} numberOfLines={2}>
                {v === null ? 'NULL' : String(v)}
              </AppText>
            ))}
          </View>
        ))}
        {result.rows.length > rows.length && (
          <AppText variant="caption" color="mute" style={{ padding: 8 }}>
            …and {result.rows.length - rows.length} more rows
          </AppText>
        )}
      </View>
    </ScrollView>
  );
}

function Verdict({ pass, label }: { pass: boolean; label?: string }) {
  const p = usePalette();
  return (
    <Row gap={8} style={{ padding: 12, borderRadius: radius.md, backgroundColor: pass ? p.successSoft : p.dangerSoft }}>
      <Ionicons name={pass ? 'checkmark-circle' : 'close-circle'} size={20} color={pass ? p.success : p.danger} />
      <AppText variant="label" style={{ color: pass ? p.success : p.danger, flex: 1 }}>
        {pass ? 'Correct! Exercise solved.' : label || 'Not quite yet — compare your output with the expected result.'}
      </AppText>
    </Row>
  );
}

function OutputPanel({ output }: { output: Output }) {
  const p = usePalette();
  return (
    <Animated.View entering={FadeInDown.duration(220)} style={{ gap: 10 }}>
      <AppText variant="eyebrow" color="mute">
        OUTPUT
      </AppText>
      {output.kind === 'js' && (
        <>
          {output.result.tests && <Verdict pass={output.result.tests.every((t) => t.pass)} label={`${output.result.tests.filter((t) => t.pass).length}/${output.result.tests.length} tests passed`} />}
          {output.result.tests?.map((t, i) => (
            <View key={i} style={{ padding: 12, borderRadius: radius.md, backgroundColor: p.surface, borderWidth: 1, borderColor: t.pass ? p.successSoft : p.dangerSoft, gap: 3 }}>
              <Row gap={6}>
                <Ionicons name={t.pass ? 'checkmark' : 'close'} size={14} color={t.pass ? p.success : p.danger} />
                <AppText variant="label">Test {i + 1}</AppText>
              </Row>
              {!!t.input && <AppText variant="mono" style={{ fontSize: 12, color: p.textDim }}>input: {t.input}</AppText>}
              {!!t.expected && <AppText variant="mono" style={{ fontSize: 12, color: p.textDim }}>expected: {t.expected}</AppText>}
              {!!t.actual && <AppText variant="mono" style={{ fontSize: 12, color: t.pass ? p.success : p.danger }}>got: {t.actual}</AppText>}
              {!!t.error && <AppText variant="mono" style={{ fontSize: 12, color: p.danger }}>{t.error}</AppText>}
            </View>
          ))}
          <View style={{ padding: 14, borderRadius: radius.md, backgroundColor: p.codeBg, gap: 4 }}>
            {output.result.logs.length === 0 && !output.result.error && <AppText variant="mono" style={{ color: '#6E7681' }}>(no console output)</AppText>}
            {output.result.logs.map((l, i) => (
              <AppText key={i} variant="mono" style={{ fontSize: 12, color: l.level === 'error' ? '#FF7B72' : l.level === 'warn' ? '#E3B341' : '#E6EDF3' }} selectable>
                {l.text}
              </AppText>
            ))}
            {!!output.result.error && (
              <AppText variant="mono" style={{ fontSize: 12, color: '#FF7B72' }} selectable>
                ✖ {output.result.error}
              </AppText>
            )}
            <AppText variant="caption" style={{ color: '#6E7681', marginTop: 4 }}>
              finished in {output.result.ms}ms
            </AppText>
          </View>
        </>
      )}
      {output.kind === 'sql' && (
        <>
          {output.check && <Verdict pass={output.check.pass} />}
          {output.error ? (
            <View style={{ padding: 14, borderRadius: radius.md, backgroundColor: p.dangerSoft }}>
              <AppText variant="mono" style={{ fontSize: 12, color: p.danger }}>
                {output.error}
              </AppText>
            </View>
          ) : (
            output.result && (
              <View style={{ borderRadius: radius.md, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border, overflow: 'hidden' }}>
                <ResultTable result={output.result} />
                <AppText variant="caption" color="mute" style={{ padding: 8 }}>
                  {output.result.rows.length} row(s) · {output.result.ms}ms
                </AppText>
              </View>
            )
          )}
          {output.check && !output.check.pass && (
            <View style={{ gap: 6 }}>
              <AppText variant="label" color="dim">
                Expected result
              </AppText>
              <View style={{ borderRadius: radius.md, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border, overflow: 'hidden' }}>
                <ResultTable result={output.check.expected} />
              </View>
            </View>
          )}
        </>
      )}
      {output.kind === 'mongo' && (
        <>
          {output.check && <Verdict pass={output.check.pass} />}
          {output.result.success ? (
            <CodeView code={JSON.stringify(output.result.result, null, 2)?.slice(0, 6000) ?? 'null'} label="result" maxHeight={320} />
          ) : (
            <View style={{ padding: 14, borderRadius: radius.md, backgroundColor: p.dangerSoft }}>
              <AppText variant="mono" style={{ fontSize: 12, color: p.danger }}>
                {output.result.error}
              </AppText>
            </View>
          )}
          {output.check && !output.check.pass && output.check.expected.success && (
            <CodeView code={JSON.stringify(output.check.expected.result, null, 2)?.slice(0, 6000) ?? 'null'} label="expected" maxHeight={320} />
          )}
        </>
      )}
    </Animated.View>
  );
}
