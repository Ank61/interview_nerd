import { prepareData } from '../data/prepareData.js';

const problems = [];

prepareData.forEach((item, itemIdx) => {
  if (!item.category) {
    problems.push(`Item[${itemIdx}] has no category`);
  }
  if (!item.type || !Array.isArray(item.type)) {
    problems.push(`Item[${itemIdx}] (${item.category}) has no type array`);
    return;
  }
  item.type.forEach((typeItem, typeIdx) => {
    if (!typeItem.concepts || !Array.isArray(typeItem.concepts)) {
      problems.push(`Item[${itemIdx}] (${item.category}) type[${typeIdx}] has no concepts`);
      return;
    }
    typeItem.concepts.forEach((concept, conceptIdx) => {
      if (concept === undefined || concept === null) {
        problems.push(`Item[${itemIdx}] (${item.category}) type[${typeIdx}] concept[${conceptIdx}] is ${concept}`);
      } else if (typeof concept.topic !== 'string' || concept.topic === '') {
        problems.push(`Item[${itemIdx}] (${item.category}) type[${typeIdx}] concept[${conceptIdx}] has bad topic: ${JSON.stringify(concept.topic)} (type: ${typeof concept.topic}). concept keys: ${Object.keys(concept||{}).join(', ')}`);
      }
    });
  });
});

if (problems.length === 0) {
  console.log('No problems found in prepareData!');
} else {
  console.log(`Found ${problems.length} problem(s):`);
  problems.forEach(p => console.log(' -', p));
}
