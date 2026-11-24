/**
 * Which speech-to-text path this phone can use.
 *
 * - "phone": expo-speech-recognition's native module is in this build (Android APK / custom dev build).
 *   Live transcript while speaking, audio saved by the same recognizer.
 * - "laptop": the native module is missing (Expo Go). Answers are recorded with expo-audio and
 *   transcribed by Whisper on the laptop when the candidate taps Done.
 *
 * expo-speech-recognition calls requireNativeModule() at import time, which throws in Expo Go,
 * so it is only required after checking that the native module exists.
 */
import { requireOptionalNativeModule } from 'expo';
import type * as SpeechRecognition from 'expo-speech-recognition';

let cached: typeof SpeechRecognition | null | undefined;

export function nativeSpeech(): typeof SpeechRecognition | null {
  if (cached !== undefined) return cached;
  try {
    cached = requireOptionalNativeModule('ExpoSpeechRecognition')
      ? // eslint-disable-next-line @typescript-eslint/no-require-imports
        (require('expo-speech-recognition') as typeof SpeechRecognition)
      : null;
  } catch {
    cached = null;
  }
  return cached;
}

export type SttMode = 'phone' | 'laptop';

export function sttMode(): SttMode {
  return nativeSpeech() ? 'phone' : 'laptop';
}

/** Whether answers can be saved as audio on this phone. */
export function canRecordVoice(): boolean {
  const sr = nativeSpeech();
  if (!sr) return true; // expo-audio records the answer itself.
  try {
    return sr.ExpoSpeechRecognitionModule.supportsRecording();
  } catch {
    return false;
  }
}
