"use client";
import Box from "@mui/material/Box";
import * as React from "react";
import { useRouter } from "next/router";
import hljs from "highlight.js";
import "highlight.js/styles/default.css";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"
// import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react"
import { prepareData } from "@/data/prepareData";

// React.useEffect(() => {
//   const topic = router.query.slug;
//   setTopicSelected(topic);
//   const topicIndex = checkTopic.findIndex((t) => t.topic === topic);
//   setIndexValue(topicIndex);
// }, [router.query.slug]);


// Mock data for interview questions
const questions = [
  {
    question: "What is the difference between 'let' and 'const' in JavaScript?",
    explanation: "'let' allows you to declare variables that can be reassigned, while 'const' is used for variables whose values will not change after initialization. Both provide block scope, unlike 'var' which is function-scoped."
  },
  {
    question: "Explain the concept of closures in JavaScript.",
    explanation: "A closure is a function that has access to variables in its outer (enclosing) lexical scope, even after the outer function has returned. This allows for data privacy and the creation of function factories."
  },
  {
    question: "What is the purpose of the 'useEffect' hook in React?",
    explanation: "The 'useEffect' hook in React is used for side effects in function components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in class components, allowing you to perform operations like data fetching, subscriptions, or manually changing the DOM."
  }
]

export default function Component() {

  const router = useRouter();
  const [indexSelected, setIndexValue] = React.useState(0);
  const [topicSelected, setTopicSelected] = React.useState("");
  const [questionType, setQuestionType] = React.useState();
  const topic = router.query.slug;

  const [currentIndex, setCurrentIndex] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)
  const currentQuestion = questions[currentIndex]

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex))
    setShowExplanation(false)
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < questions.length - 1 ? prevIndex + 1 : prevIndex))
    setShowExplanation(false)
  }

  const toggleExplanation = () => {
    setShowExplanation((prev) => !prev)
  }

  return (
    // <div className="container mx-auto p-4 max-w-2xl">
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }} className="w-full mx-auto md:w-7/12 lg:w-6/12 relative ">
      <Header topic={topic[topic.length - 1]} />
      <Box sx={{ flexGrow: 1 }} padding={3} className="w-full">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="scroll-m-20 text-gray-600 text-lg font-semibold tracking-tight mt-8 mb-10">{currentIndex + 1}. {"  "} {currentQuestion.question}</h3>
        </motion.div>
        <Card className="w-full border-0 shadow-none">
          <CardContent>
            <motion.div
              initial={false}
              animate={{ backgroundColor: showExplanation ? "#f3f4f6" : "#ffffff" }}
              transition={{
                type: "spring",
                stiffness: 130,
                delay: 0.01
              }}>
              <Button
                onClick={toggleExplanation}
                variant="outline"
                className="w-full flex items-center justify-center"
              >
                {showExplanation ? "Hide Explanation" : "Show Explanation"}
                <motion.div
                  initial={false}
                  transition={{ duration: 0.3 }}
                  className="ml-2"
                >
                  {showExplanation ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </motion.div>
              </Button>
            </motion.div>
            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  animate={{ y: 10 }}
                  transition={{
                    type: "spring",
                    stiffness: 130,
                  }}
                  className="mt-4 p-4 bg-muted rounded-md overflow-hidden"
                >
                  {currentQuestion.explanation}
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </Box>
      <Box className="flex justify-between mt-10 w-full absolute bottom-0" sx={{ flexGrow: 1 }} padding={3} >
        <Button onClick={handlePrevious} disabled={currentIndex === 0} variant="outline" className="w-28">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <div className="text-sm text-gray-500 mt-2">
          Question {currentIndex + 1} of {questions.length}
        </div>
        <Button onClick={handleNext} disabled={currentIndex === questions.length - 1} variant="outline" className="w-28">
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </Box>
    </Box >
  )
}