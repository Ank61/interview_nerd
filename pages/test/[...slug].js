import Box from "@mui/material/Box";
import * as React from "react";
import { useRouter } from "next/router";
import hljs from "highlight.js";
import "highlight.js/styles/default.css";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Home,
  User,
  Settings,
  BookCheck,
} from "lucide-react";
import { prepareData } from "@/data/prepareData";

export default function Component() {
  const router = useRouter();
  const topic = router.query.slug || "";
  const [themeColor, setThemeColor] = React.useState();
  const [topicSelected, setTopicSelected] = React.useState("");
  const [practiceQuestions, setPracticeQuestions] = React.useState([
    {
      question: "",
      solution: "",
    },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const currentQuestion =
    practiceQuestions?.length > 0 && practiceQuestions[currentIndex];

  React.useEffect(() => {
    const selected = topic[topic.length - 1];
    setTopicSelected(topic[topic.length - 1]);
    let themeColor;
    const matchingTopics = prepareData.flatMap((item) => {
      return item.type.flatMap((typeItem) =>
        typeItem.concepts.filter((conceptItem, index) => {
          if (conceptItem.topic === selected) {
            themeColor = {
              category: item.category,
              themeBgColor: item.themeBgColor,
              textColor: item.textColor,
              topicColor: item.topicColor,
              lightColor: item?.lightColor || item.themeBgColor,
              lightTail: item?.lightTail || "",
            };
          }
          return conceptItem.topic === selected;
        })
      );
    });
    setThemeColor(themeColor);
    setPracticeQuestions(matchingTopics[0]?.questions);
  }, [router.query.slug]);

  React.useEffect(() => {
    hljs.highlightAll();
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    setShowExplanation(false);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < practiceQuestions?.length - 1 ? prevIndex + 1 : prevIndex
    );
    setShowExplanation(false);
  };

  const toggleExplanation = () => {
    setShowExplanation((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Custom Header matching learn page */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and Navigation */}
            <div className="flex items-center space-x-4 sm:space-x-8">
              <div className="flex items-center space-x-3">
                <div
                  className="p-2 rounded-lg"
                  style={{
                    backgroundColor: themeColor?.lightColor || "#f3f4f6",
                  }}
                >
                  <BookOpen
                    size={24}
                    style={{ color: themeColor?.textColor || "#374151" }}
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    Interview Nerd
                  </h1>
                  <p className="text-sm text-gray-500">
                    {topicSelected} Practice
                  </p>
                </div>
              </div>

              {/* Breadcrumb */}
              <nav className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                <button
                  onClick={() => router.push("/")}
                  className="hover:text-gray-700 transition-colors"
                >
                  {/* <Home size={16} className="inline mr-1" /> */}
                  Home
                </button>
                <span>/</span>
                <button
                  onClick={() =>
                    router.push(`/learn/${topicSelected}/introduction`)
                  }
                  className="hover:text-gray-700 transition-colors"
                >
                  Learn
                </button>
                <span>/</span>
                <span className="text-gray-900 font-medium">Practice</span>
              </nav>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center space-x-4">
              <Button
                onClick={() =>
                  router.push(`/learn/${topicSelected}/introduction`)
                }
                style={{
                  backgroundColor: themeColor?.themeBgColor,
                  color: themeColor?.textColor,
                }}
                className="hidden sm:flex items-center space-x-2 px-4 py-2 text-sm hover:shadow-md transition-all duration-200"
              >
                <BookOpen size={16} />
                <span>Learn</span>
              </Button>

              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <User size={20} className="text-gray-600" />
              </button>

              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Settings size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col justify-center min-h-[calc(100vh-64px)]">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Question Counter */}
          <div className="text-sm text-gray-500 font-medium text-right mb-4">
            Question {currentIndex + 1} of {practiceQuestions?.length}
          </div>

          {/* Centered Content Area */}
          <div className="flex flex-col items-center justify-center">
            {/* Question Content with Original Animation */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: showExplanation ? -120 : 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                type: "spring",
                stiffness: 60,
                delay: 0.01,
              }}
              className="w-full max-w-3xl"
            >
              <h3 className="flex justify-center items-center scroll-m-20 text-gray-600 text-lg sm:text-xl font-semibold tracking-tight mt-8 mb-10 text-center px-4">
                <span className="mr-3">{currentIndex + 1}.</span>
                {currentQuestion.question}
              </h3>
            </motion.div>

            {/* Show/Hide Solution Button with Original Animation */}
            <motion.div
              className="w-full max-w-md flex items-center cursor-pointer justify-center border rounded-lg mx-auto"
              initial={false}
              onClick={toggleExplanation}
              animate={{
                opacity: 1,
                y: showExplanation ? -120 : 0,
                backgroundColor: showExplanation
                  ? themeColor?.lightColor || "#f3f4f6"
                  : "#ffffff",
              }}
              transition={{
                type: "spring",
                stiffness: 60,
                delay: 0.01,
              }}
              style={{
                borderColor: themeColor?.themeBgColor || "#e5e7eb",
              }}
            >
              <motion.div className="w-full flex items-center justify-center mx-auto p-3 sm:p-4">
                <span
                  className="text-sm sm:text-base font-medium"
                  style={{ color: themeColor?.textColor || "#374151" }}
                >
                  {showExplanation ? "Hide Solution" : "Show Solution"}
                </span>
                <motion.div
                  initial={false}
                  transition={{ duration: 0.3 }}
                  className="ml-2"
                >
                  {showExplanation ? (
                    <ChevronUp
                      className="h-4 w-4"
                      style={{ color: themeColor?.textColor || "#374151" }}
                    />
                  ) : (
                    <ChevronDown
                      className="h-4 w-4"
                      style={{ color: themeColor?.textColor || "#374151" }}
                    />
                  )}
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Solution Content with Original Animation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ y: -45, opacity: 1 }}
                transition={{
                  stiffness: 60,
                  delay: 0.2,
                }}
                className="mt-1 p-4 sm:p-6 bg-muted rounded-md overflow-hidden cursor-pointer w-full max-w-4xl"
                style={{ backgroundColor: themeColor?.lightColor || "#f3f4f6" }}
              >
                <div
                  className="w-full prose prose-sm sm:prose max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: currentQuestion.solution,
                  }}
                />
              </motion.div>
            )}
          </div>

          {/* Navigation Buttons - Fixed at bottom */}
          <div className="flex justify-between items-center mt-8 px-4 sm:px-6 lg:px-8 pb-6 sticky bottom-3 sm:bottom-6">
            <Button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              variant="outline"
              className="flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md transition-all duration-200"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Prev</span>
            </Button>

            {/* Mobile Question Counter */}
            <div className="sm:hidden text-xs text-gray-500 font-medium">
              {currentIndex + 1} / {practiceQuestions?.length}
            </div>

            <Button
              onClick={handleNext}
              disabled={currentIndex === practiceQuestions?.length - 1}
              variant="outline"
              className="flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md transition-all duration-200"
            >
              <span className="hidden sm:inline">Next</span>
              <span className="sm:hidden">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
