import { getHighlighter } from 'shiki';

export async function renderMarkdown(code, lang = 'js') {
  const highlighter = await getHighlighter({ theme: 'github-light' });
  return highlighter.codeToHtml(code, { lang });
}