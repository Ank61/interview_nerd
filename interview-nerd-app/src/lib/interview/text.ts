/** Small, dependency-free text helpers used by the interview engine and prompts. */

const ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  rarr: '->',
  larr: '<-',
  mdash: '-',
  ndash: '-',
  hellip: '...',
};

/** Convert the bank's answer HTML into compact plain text for prompts. */
export function htmlToText(html: string): string {
  return html
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<\s*br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|li|h[1-6]|tr|pre|blockquote)>/gi, '\n')
    .replace(/<li[^>]*>/gi, '- ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(#\d+|#x[0-9a-f]+|[a-z]+);/gi, (m, e: string) => {
      if (e[0] === '#') {
        const code = e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
        return Number.isFinite(code) ? String.fromCharCode(code) : ' ';
      }
      return ENTITIES[e.toLowerCase()] ?? m;
    })
    .replace(/[ \t\f\v]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/\n{2,}/g, '\n')
    .trim();
}

/** Trim to roughly `max` characters, preferring to cut at a sentence or line end. */
export function clip(text: string, max: number): string {
  const t = text.trim();
  if (t.length <= max) return t;
  const slice = t.slice(0, max);
  const cut = Math.max(slice.lastIndexOf('. '), slice.lastIndexOf('\n'), slice.lastIndexOf('? '));
  return (cut > max * 0.5 ? slice.slice(0, cut + 1) : slice).trim() + ' ...';
}

/** Remove markdown/code punctuation that text-to-speech would read out loud. */
export function speakable(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, ' (see the code on screen) ')
    .replace(/[`*_#>]/g, '')
    .replace(/\be\.g\.\s*/gi, 'for example, ')
    .replace(/\bi\.e\.\s*/gi, 'that is, ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function wordCount(text: string): number {
  const t = text.trim();
  return t ? t.split(/\s+/).length : 0;
}

/** Join transcript fragments without doubled spaces. */
export function joinText(parts: string[]): string {
  return parts
    .map((s) => s.trim())
    .filter(Boolean)
    .join(' ');
}

export function oneLine(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}
