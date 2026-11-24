# Interview Nerd: mobile app

The offline React Native (Expo SDK 58) version of Interview Nerd. It covers the web app's whole curriculum: concepts, interview Q&A, MCQ quizzes, coding labs and cheat sheets. Everything is stored on the device, including accounts and progress.

## Run it in Expo Go

```bash
cd interview-nerd-app
npm install
npx expo start
```

Scan the QR code with **Expo Go** (Android) or the Camera app (iOS). Your phone and computer must be on the same network. If they aren't, use `npx expo start --tunnel`.

## What's inside

| Area | Details |
| --- | --- |
| **Accounts** | Local sign up / log in, plus onboarding (target level and focus topics), profile editing, password change and account deletion. Passwords are salted and hashed with SHA-256 via `expo-crypto`. |
| **Learn** | 39 topics with 1,142 concepts, split into Beginner/Advanced levels. Each concept has a lesson, examples and flash-card practice. You can mark concepts as learned, bookmark them and change the text size. |
| **Interview Q&A** | 4,056 model answers grouped into Junior, Mid and Senior sets, with "mark reviewed" and an optional active-recall mode. |
| **AWS** | A hub with 21 AWS topics grouped by category. |
| **Quizzes** | 2,176 MCQs in practice mode (instant feedback) or timed exam mode. Also a daily challenge, a mistakes review and an answer review after each quiz. |
| **Coding labs** | 611 exercises. JavaScript runs on device with test cases, SQL runs on real SQLite (`expo-sqlite`) and MongoDB queries run on an on-device query engine. Python, Go, Docker and Linux use write-and-compare with progressive hints. |
| **Progress** | XP, 10 levels, 21 badges, streaks, an activity heatmap, per-topic progress, bookmarks, history and saved code drafts. |
| **Search** | Searches topics, concepts, questions and exercises at once. |

## Content pipeline

The app's content is generated from the web app's `../data` folder:

```bash
npm run build:content
```

`scripts/build-content.mjs` does the following:

- converts markdown answers to HTML
- syntax-highlights every code block ahead of time
- strips inline colours so content follows the light/dark theme
- escapes stray tags such as a literal `<script>` mentioned in prose
- writes the results to:
  - `assets/content/**.txt`: one small JSON payload per concept, interview set, quiz category and lab
  - `src/data/generated/catalog.json`: the small index the list screens render
  - `src/data/generated/assets.ts`: the static `require()` map for the payloads

Payloads are loaded lazily through `expo-asset` and cached in memory. This keeps the JS bundle small, and each screen reads only the content it shows.

Re-run the script whenever the web data changes.

## Project layout

```
src/app/            routes (expo-router): (auth), (tabs), topic, concept, question, quiz, lab, module, exercise…
src/components/     UI kit (primitives, inputs, layout, visuals), HtmlView, CodeEditor, Toaster
src/store/          zustand stores: auth, progress (debounced AsyncStorage persistence), settings, toast
src/lib/            content loader, gamification rules, HTML template, runners (js / sql / mongo)
src/theme/          design tokens (dark + light palettes, type scale)
scripts/            build-content.mjs
```

## Checks

```bash
npm run typecheck
npm run lint
npx expo-doctor
```
