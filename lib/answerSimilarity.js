/**
 * Answer Similarity Utility
 * Compares user answers with reference answers using multiple similarity algorithms
 */

// Simple text preprocessing
function preprocessText(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ') // Remove punctuation
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

// Extract keywords from text
function extractKeywords(text) {
  const commonWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
    'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
    'will', 'would', 'could', 'should', 'may', 'might', 'can', 'this', 'that', 'these', 'those',
    'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them'
  ]);
  
  return preprocessText(text)
    .split(' ')
    .filter(word => word.length > 2 && !commonWords.has(word));
}

// Jaccard similarity for keyword overlap
function jaccardSimilarity(set1, set2) {
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  
  if (union.size === 0) return 0;
  return intersection.size / union.size;
}

// Cosine similarity using word frequency vectors
function cosineSimilarity(text1, text2) {
  const words1 = extractKeywords(text1);
  const words2 = extractKeywords(text2);
  
  // Create vocabulary
  const vocabulary = [...new Set([...words1, ...words2])];
  
  if (vocabulary.length === 0) return 0;
  
  // Create frequency vectors
  const vector1 = vocabulary.map(word => words1.filter(w => w === word).length);
  const vector2 = vocabulary.map(word => words2.filter(w => w === word).length);
  
  // Calculate dot product
  const dotProduct = vector1.reduce((sum, val, i) => sum + (val * vector2[i]), 0);
  
  // Calculate magnitudes
  const magnitude1 = Math.sqrt(vector1.reduce((sum, val) => sum + (val * val), 0));
  const magnitude2 = Math.sqrt(vector2.reduce((sum, val) => sum + (val * val), 0));
  
  if (magnitude1 === 0 || magnitude2 === 0) return 0;
  
  return dotProduct / (magnitude1 * magnitude2);
}

// Levenshtein distance for string similarity
function levenshteinDistance(str1, str2) {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

// Normalized Levenshtein similarity (0-1 scale)
function levenshteinSimilarity(str1, str2) {
  const processed1 = preprocessText(str1);
  const processed2 = preprocessText(str2);
  
  if (processed1.length === 0 && processed2.length === 0) return 1;
  if (processed1.length === 0 || processed2.length === 0) return 0;
  
  const distance = levenshteinDistance(processed1, processed2);
  const maxLength = Math.max(processed1.length, processed2.length);
  
  return 1 - (distance / maxLength);
}

// Check for key technical terms presence
function technicalTermsScore(userAnswer, referenceAnswer, topic) {
  const topicKeywords = {
    'Javascript': ['function', 'variable', 'object', 'array', 'callback', 'promise', 'async', 'await', 'closure', 'prototype', 'hoisting', 'scope'],
    'React': ['component', 'jsx', 'props', 'state', 'hook', 'usestate', 'useeffect', 'render', 'virtual dom', 'lifecycle'],
    'Node': ['server', 'express', 'middleware', 'route', 'npm', 'module', 'require', 'callback', 'stream', 'buffer'],
    'Typescript': ['type', 'interface', 'generic', 'union', 'intersection', 'enum', 'class', 'decorator', 'module'],
    'SQL': ['select', 'insert', 'update', 'delete', 'join', 'where', 'group by', 'order by', 'index', 'primary key'],
    'Next': ['ssr', 'ssg', 'api routes', 'pages', 'getstaticprops', 'getserversideprops', 'router', 'link'],
    'RabbitMQ': ['queue', 'exchange', 'routing', 'message', 'producer', 'consumer', 'binding', 'channel'],
    'OOP': ['class', 'object', 'inheritance', 'polymorphism', 'encapsulation', 'abstraction', 'method', 'property'],
    'AWS S3': ['bucket', 'object', 'key', 'acl', 'policy', 'cors', 'lifecycle', 'versioning', 'encryption']
  };
  
  const keywords = topicKeywords[topic] || [];
  const userText = preprocessText(userAnswer);
  const refText = preprocessText(referenceAnswer);
  
  let foundInUser = 0;
  let foundInRef = 0;
  
  keywords.forEach(keyword => {
    if (userText.includes(keyword)) foundInUser++;
    if (refText.includes(keyword)) foundInRef++;
  });
  
  if (foundInRef === 0) return 0.5; // No technical terms in reference
  return foundInUser / foundInRef;
}

// Main similarity calculation function
export function calculateAnswerSimilarity(userAnswer, referenceAnswer, topic = 'Javascript') {
  if (!userAnswer || !referenceAnswer) {
    return { score: 0, breakdown: {} };
  }
  
  // Calculate different similarity metrics
  const keywords1 = new Set(extractKeywords(userAnswer));
  const keywords2 = new Set(extractKeywords(referenceAnswer));
  
  const jaccard = jaccardSimilarity(keywords1, keywords2);
  const cosine = cosineSimilarity(userAnswer, referenceAnswer);
  const levenshtein = levenshteinSimilarity(userAnswer, referenceAnswer);
  const technicalTerms = technicalTermsScore(userAnswer, referenceAnswer, topic);
  
  // Weighted average (you can adjust these weights)
  const weights = {
    jaccard: 0.25,      // Keyword overlap
    cosine: 0.30,       // Semantic similarity
    levenshtein: 0.20,  // String similarity
    technical: 0.25     // Technical terms presence
  };
  
  const finalScore = (
    jaccard * weights.jaccard +
    cosine * weights.cosine +
    levenshtein * weights.levenshtein +
    technicalTerms * weights.technical
  );
  
  return {
    score: Math.min(Math.max(finalScore, 0), 1), // Clamp between 0 and 1
    breakdown: {
      keywordOverlap: jaccard,
      semanticSimilarity: cosine,
      stringSimilarity: levenshtein,
      technicalTerms: technicalTerms,
      finalScore: finalScore
    }
  };
}

// Grade answer based on similarity score
export function gradeAnswer(similarity) {
  if (similarity >= 0.8) return { grade: 'A', points: 100, feedback: 'Excellent answer! Comprehensive and accurate.' };
  if (similarity >= 0.65) return { grade: 'B', points: 85, feedback: 'Good answer with most key points covered.' };
  if (similarity >= 0.5) return { grade: 'C', points: 70, feedback: 'Adequate answer but missing some important details.' };
  if (similarity >= 0.35) return { grade: 'D', points: 55, feedback: 'Basic understanding shown but needs improvement.' };
  return { grade: 'F', points: 25, feedback: 'Answer needs significant improvement. Consider reviewing the topic.' };
}
