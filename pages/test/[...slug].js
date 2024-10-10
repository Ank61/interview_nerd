"use client";
import Box from "@mui/material/Box";
import * as React from "react";
import { useRouter } from "next/router";
import hljs from "highlight.js";
import "highlight.js/styles/default.css";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
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
      themeColor = {
        category: item.category,
        themeBgColor: item.themeBgColor,
        textColor: item.textColor,
        topicColor: item.topicColor,
        lightColor: item?.lightColor || item.themeBgColor,
      };
      return item.type.flatMap((typeItem) =>
        typeItem.concepts.filter((conceptItem, index) => {
          return conceptItem.topic === selected;
        })
      );
    });
    setThemeColor(themeColor);
    setPracticeQuestions(matchingTopics[0]?.questions);
    console.log("questions", matchingTopics[0]?.questions);
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
    // <div className="container mx-auto p-4 max-w-2xl">
    <Box
      sx={{ display: "flex", flexDirection: "column", height: "100vh" }}
      className="w-full mx-auto md:w-7/12 lg:w-6/12 relative "
    >
      <Header topic={topicSelected} />
      <Box
        sx={{ flexGrow: 1 }}
        padding={3}
        className="w-full mt-[50%] md:mt-[25%] "
      >
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: showExplanation ? -120 : 0 }}
          exit={{ opacity: 0, y: -20 }}
          // transition={{ duration: 0.3 }}
          transition={{
            type: "spring",
            stiffness: 60,
            delay: 0.01,
          }}
        >
          <h3
            className="flex justify-center items  -center scroll-m-20 text-gray-600 text-lg 
          font-semibold tracking-tight mt-8 mb-10"
          >
            <span className="mr-3">{currentIndex + 1}.</span>
            {currentQuestion.question}
          </h3>
        </motion.div>
        {/* <Card className="w-full border-0 shadow-none">
          <CardContent> */}
        <motion.div
          className="w-4/6 flex items-center cursor-pointer justify-center border rounded-lg mx-auto "
          initial={false}
          onClick={toggleExplanation}
          animate={{
            opacity: 1,
            y: showExplanation ? -120 : 0,
            backgroundColor: showExplanation ? "#f3f4f6" : "#ffffff",
          }}
          transition={{
            type: "spring",
            stiffness: 60,
            delay: 0.01,
          }}
        >
          <motion.div
            // animate={{ opacity: 1, y: showExplanation ? -30 : 0 }}
            className="w-6/6 flex items-center justify-center mx-auto p-2 md:p-1"
          >
            {showExplanation ? "Hide Solution" : "Show Solution"}
            <motion.div
              initial={false}
              transition={{ duration: 0.3 }}
              className="ml-2"
            >
              {showExplanation ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </motion.div>
          </motion.div>
        </motion.div>
        {/* <AnimatePresence> */}
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ y: -45, opacity: 1 }}
            transition={{
              stiffness: 60,
              delay: 0.2,
            }}
            className="mt-1 p-4 bg-muted rounded-md overflow-hidden cursor-pointer"
          >
            <div
              className="w-full"
              dangerouslySetInnerHTML={{
                __html: currentQuestion.solution,
              }}
            />
          </motion.div>
        )}
        {/* </AnimatePresence> */}
        {/* </CardContent>
        </Card> */}
      </Box>
      <Box
        className="flex justify-between mt-10 w-full absolute bottom-3 md:bottom-2"
        sx={{ flexGrow: 1 }}
        padding={3}
      >
        <Button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          variant="outline"
          className="w-28"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <div className="text-sm text-gray-500 mt-2">
          Question {currentIndex + 1} of {practiceQuestions?.length}
        </div>
        <Button
          onClick={handleNext}
          disabled={currentIndex === practiceQuestions?.length - 1}
          variant="outline"
          className="w-28"
        >
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </Box>
    </Box>
  );
}
