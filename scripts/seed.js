import connectDB from "../lib/mongodb.js";
import InterviewQuestion from "../models/InterviewQuestion.js";
import PrepareData from "../models/PrepareData.js";
import { interviewData } from "../data/interviewData.js";
import { prepareData } from "../data/prepareData.js";

async function seedDatabase() {
  try {
    console.log("Connecting to MongoDB...");
    await connectDB();
    console.log("Connected to MongoDB successfully!");

    // Clear existing data
    console.log("Clearing existing data...");
    await InterviewQuestion.deleteMany({});
    await PrepareData.deleteMany({});
    console.log("Existing data cleared!");

    // Seed Interview Questions
    console.log("Seeding interview questions...");
    const interviewQuestions = interviewData.map((item) => ({
      topic: item.topic,
      categories: item.categories,
      tags: item.tags,
      prepareLink: item.prepareLink,
      externallinks: item.externallinks,
      questions: item.questions,
      stats: {
        totalAttempts: 0,
        correctAnswers: 0,
        averageScore: 0,
        difficulty:
          item.categories === "Junior"
            ? "Easy"
            : item.categories === "Mid"
            ? "Medium"
            : "Hard",
      },
    }));

    const insertedQuestions = await InterviewQuestion.insertMany(
      interviewQuestions
    );
    console.log(`Inserted ${insertedQuestions.length} interview questions`);

    // Seed Prepare Data
    console.log("Seeding prepare data...");
    const prepareDataToInsert = prepareData.map((item) => {
      // Clean and validate the type data
      const cleanedType = item.type.map((typeItem) => ({
        id: typeItem.id,
        label: typeItem.label,
        concepts: typeItem.concepts.map((concept) => ({
          topic: concept.topic,
          tags: concept.tags || [],
          explanation: concept.explanation,
          examples: Array.isArray(concept.examples)
            ? concept.examples.filter((example) => typeof example === "string")
            : [],
          questions: Array.isArray(concept.questions)
            ? concept.questions
                .filter((q) => q && q.question)
                .map((q) => ({
                  question: q.question,
                  solution: q.solution || "",
                  code: q.code || "",
                }))
            : [],
          links: concept.links || [],
        })),
      }));

      return {
        category: item.category,
        themeBgColor: item.themeBgColor,
        textColor: item.textColor,
        topicColor: item.topicColor,
        lightColor: item.lightColor,
        type: cleanedType,
        stats: {
          totalViews: 0,
          totalTimeSpent: 0,
          averageRating: 0,
          totalRatings: 0,
        },
      };
    });

    const insertedPrepareData = await PrepareData.insertMany(
      prepareDataToInsert
    );
    console.log(`Inserted ${insertedPrepareData.length} prepare data entries`);

    console.log("Database seeding completed successfully!");

    // Print summary
    console.log("\n=== SEEDING SUMMARY ===");
    console.log(`Interview Questions: ${insertedQuestions.length}`);
    console.log(`Prepare Data: ${insertedPrepareData.length}`);

    // Count questions by topic
    const topicCounts = {};
    insertedQuestions.forEach((q) => {
      topicCounts[q.topic] = (topicCounts[q.topic] || 0) + q.questions.length;
    });

    console.log("\nQuestions by Topic:");
    Object.entries(topicCounts).forEach(([topic, count]) => {
      console.log(`  ${topic}: ${count} questions`);
    });

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
