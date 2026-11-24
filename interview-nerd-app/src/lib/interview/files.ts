/**
 * Recording files. Each answer's audio is saved under
 * <documents>/interviews/<interviewId>/<turnId>-<n>.wav. The database stores only
 * the file names, because the absolute documents path can change between app updates (iOS).
 */
import { Directory, File, Paths } from 'expo-file-system';

const ROOT = 'interviews';

export function interviewDir(interviewId: string) {
  return new Directory(Paths.document, ROOT, interviewId);
}

export function ensureInterviewFolder(interviewId: string) {
  const dir = interviewDir(interviewId);
  if (!dir.exists) dir.create({ intermediates: true, idempotent: true });
  return dir;
}

/** Playable URI for a stored recording, or null if the file is gone. */
export function recordingUri(interviewId: string, name: string): string | null {
  const f = new File(Paths.document, ROOT, interviewId, name);
  return f.exists ? f.uri : null;
}

/** Move a just-finished recording (in the cache) into the interview folder. Returns the stored name. */
export async function adoptRecording(sourceUri: string, interviewId: string, name: string): Promise<string | null> {
  const src = new File(sourceUri);
  if (!src.exists) return null;
  const dest = new File(ensureInterviewFolder(interviewId), name);
  if (dest.exists) dest.delete();
  await src.move(dest);
  return name;
}

export function deleteRecording(interviewId: string, name: string) {
  try {
    const f = new File(Paths.document, ROOT, interviewId, name);
    if (f.exists) f.delete();
  } catch {}
}

export function deleteInterviewFiles(interviewId: string) {
  try {
    const dir = interviewDir(interviewId);
    if (dir.exists) dir.delete();
  } catch {}
}

/** Bytes used by an interview's recordings. */
export function interviewStorageBytes(interviewId: string): number {
  try {
    const dir = interviewDir(interviewId);
    if (!dir.exists) return 0;
    return dir.list().reduce((sum, item) => sum + (item instanceof File ? (item.size ?? 0) : 0), 0);
  } catch {
    return 0;
  }
}
