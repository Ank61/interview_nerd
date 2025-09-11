import { mcqQuestions } from "@/data/mcqDatasets";

// Function to get daily MCQ questions (5 questions) - DEPRECATED
export function getDailyMCQQuestions(date = new Date()) {
  // Create a seed based on the date to ensure same questions for the same day
  const dateString = date.toISOString().split("T")[0]; // YYYY-MM-DD format
  const seed = dateString
    .split("-")
    .reduce((acc, val) => acc + parseInt(val), 0);

  // Shuffle questions based on date seed
  const shuffled = [...mcqQuestions].sort(() => {
    const random = Math.sin(seed) * 10000;
    return random - Math.floor(random);
  });

  // Return first 5 questions
  return shuffled.slice(0, 5);
}

// Function to get unique daily MCQ questions for a specific user
export function getUniqueDailyMCQQuestions(
  answeredQuestionIds = [],
  count = 5
) {
  // Filter out already answered questions
  const availableQuestions = mcqQuestions.filter(
    (q) => !answeredQuestionIds.includes(q.id)
  );

  // If no questions available, return empty array
  if (availableQuestions.length === 0) {
    return [];
  }

  // If fewer questions available than requested, return all available
  if (availableQuestions.length <= count) {
    return shuffleArray([...availableQuestions]);
  }

  // Get random topics for variety
  const topics = [...new Set(availableQuestions.map((q) => q.category))];
  const selectedQuestions = [];

  // Try to get questions from different topics for variety
  const questionsPerTopic = Math.ceil(count / topics.length);

  for (const topic of topics) {
    const topicQuestions = availableQuestions.filter(
      (q) => q.category === topic
    );
    const shuffledTopicQuestions = shuffleArray([...topicQuestions]);

    // Add questions from this topic (up to questionsPerTopic)
    const questionsToAdd = shuffledTopicQuestions.slice(
      0,
      Math.min(questionsPerTopic, count - selectedQuestions.length)
    );
    selectedQuestions.push(...questionsToAdd);

    // Stop if we have enough questions
    if (selectedQuestions.length >= count) {
      break;
    }
  }

  // If we still need more questions, fill from remaining available questions
  if (selectedQuestions.length < count) {
    const remainingQuestions = availableQuestions.filter(
      (q) => !selectedQuestions.includes(q)
    );
    const shuffledRemaining = shuffleArray([...remainingQuestions]);
    const additionalQuestions = shuffledRemaining.slice(
      0,
      count - selectedQuestions.length
    );
    selectedQuestions.push(...additionalQuestions);
  }

  // Final shuffle and return exactly the requested count
  return shuffleArray(selectedQuestions).slice(0, count);
}

// Helper function to shuffle array
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Function to get MCQ questions by category
export function getMCQQuestionsByCategory(category, count = 5) {
  const categoryQuestions = mcqQuestions.filter((q) => q.category === category);
  return categoryQuestions.slice(0, count);
}

// Function to get random MCQ questions
export function getRandomMCQQuestions(count = 5) {
  const shuffled = [...mcqQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
