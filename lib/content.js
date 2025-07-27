// lib/content.ts – runs only once at build time
import { prepareData } from '@/data/prepareData';
import { renderMarkdown } from './markdown';
const lessonMap = new Map();

prepareData.forEach((item) =>
  item.type.forEach((typeItem) =>
    typeItem.concepts.forEach((c, idx) => {
      const slug = `${item.category}/${c.topic}`;
      lessonMap.set(slug, {
        topic: c.topic,
        category: item.category,
        explanation: '', // filled below
        nextTopic: typeItem.concepts[idx + 1]?.topic || null,
        theme: {
          category: item.category,
          themeBgColor: item.themeBgColor,
          textColor: item.textColor,
        },
      });
    })
  )
);

export const allPaths = Array.from(lessonMap.keys()).map((p) => ({
  params: { slug: p.split('/') },
}));

export async function getLesson(slug) {
  const key = slug.join('/');
  const meta = lessonMap.get(key);
  const mdFile = path.join(process.d(), 'content', key + '.md');
  meta.explanation = await renderMarkdown(mdFile);
  return meta;
}