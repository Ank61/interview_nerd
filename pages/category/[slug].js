/**
 * Category Page - Optimized for Performance
 *
 * This page uses:
 * 1. Static Generation (getStaticPaths + getStaticProps) for pre-built pages
 * 2. Local data instead of API calls for instant loading
 * 3. ISR (Incremental Static Regeneration) with 1-hour revalidation
 * 4. Client-side search filtering for real-time UX
 *
 * Performance Benefits:
 * - Pages are pre-built at build time
 * - No server-side data fetching on each request
 * - Instant page loads with local data
 * - Reduced server load and faster TTFB
 */

import * as React from "react";
import PropTypes from "prop-types";
import { Tabs as MuiTabs } from "@mui/material";
import Tab from "@mui/material/Tab";
import { motion, AnimatePresence } from "framer-motion";
import Box from "@mui/material/Box";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import { Hash, X, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { BookOpenCheck } from "lucide-react";
import { Code } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { interviewData } from "@/data/interviewData";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { SearchIcon } from "lucide-react";
import { prepareData } from "@/data/prepareData";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/header";
import { getThemeColors, getThemeCSSProperties } from "@/lib/themeUtils";
import GamificationDashboard from "@/components/gamification/GamificationDashboard";
import XPNotification from "@/components/gamification/XPNotification";
import ActiveChallenge from "@/components/gamification/ActiveChallenge";
import QuestionFeedback from "@/components/questions/QuestionFeedback";
import { useGamification } from "@/hooks/useGamification";

export async function getStaticPaths() {
  const topics = [
    "Javascript",
    "React",
    "Node",
    "Typescript",
    "AWS S3",
    "Next",
    "SQL",
    "RabbitMQ",
    "OOP",
  ];
  const paths = topics.map((topic) => ({
    params: { slug: topic },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const topicPrepareData = prepareData.find((item) => item.category === slug);
  const topicInterviewData = interviewData.filter(
    (item) => item.topic === slug
  );

  return {
    props: {
      topicPrepareData: topicPrepareData || null,
      topicInterviewData: topicInterviewData || [],
      topic: slug,
    },
    revalidate: 216000,
  };
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function PaginationComponent({
  currentPage,
  totalPages,
  onPageChange,
  themeColors,
}) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center px-3 py-2 text-sm font-medium rounded-md border transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          color: themeColors.text,
          borderColor: themeColors.border,
          backgroundColor: "white",
        }}
        onMouseEnter={(e) => {
          if (currentPage !== 1) {
            e.target.style.backgroundColor = themeColors.light;
          }
        }}
        onMouseLeave={(e) => {
          if (currentPage !== 1) {
            e.target.style.backgroundColor = "white";
          }
        }}
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Previous
      </button>

      <div className="flex space-x-1">
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="px-3 py-2 text-sm text-gray-500"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
                currentPage === page ? "font-bold" : ""
              }`}
              style={{
                color:
                  currentPage === page ? themeColors.text : themeColors.text,
                borderColor: themeColors.border,
                backgroundColor:
                  currentPage === page ? themeColors.bg : "white",
              }}
              onMouseEnter={(e) => {
                if (currentPage !== page) {
                  e.target.style.backgroundColor = themeColors.light;
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== page) {
                  e.target.style.backgroundColor = "white";
                }
              }}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center px-3 py-2 text-sm font-medium rounded-md border transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          color: themeColors.text,
          borderColor: themeColors.border,
          backgroundColor: "white",
        }}
        onMouseEnter={(e) => {
          if (currentPage !== totalPages) {
            e.target.style.backgroundColor = themeColors.light;
          }
        }}
        onMouseLeave={(e) => {
          if (currentPage !== totalPages) {
            e.target.style.backgroundColor = "white";
          }
        }}
      >
        Next
        <ChevronRight className="w-4 h-4 ml-1" />
      </button>
    </div>
  );
}

function AccordionQuestion({ question, topic, index }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isAnswered, setIsAnswered] = React.useState(false);
  const themeColors = getThemeColors(topic);
  const { processQuestionAnswer } = useGamification();

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleAnswer = async (e) => {
    e.stopPropagation(); // Prevent accordion from toggling
    if (isAnswered) return;
    
    const result = await processQuestionAnswer({
      questionId: question.id || question._id,
      topic,
      difficulty: question.difficulty || 'medium',
      isCorrect: true,
      attempts: 1
    });
    
    if (result) {
      setIsAnswered(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className={`rounded-lg border bg-white shadow-sm overflow-hidden border-gray-200
      }`}
    >
      {/* Header */}
      <div
        onClick={toggleAccordion}
        className={`flex items-center justify-between p-4 cursor-pointer transition-colors hover:bg-gray-50`}
      >
        <div className="flex-1">
          <h3
            className="font-medium text-sm leading-relaxed text-gray-900"
            style={{ color: themeColors.text }}
          >
            {question.question}
          </h3>

          {/* Tags */}
          {question.tags && question.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {question.tags.slice(0, 3).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                  style={{
                    backgroundColor: themeColors.light,
                    color: themeColors.text,
                  }}
                >
                  <Hash className="w-3 h-3 mr-1" />
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="ml-4 flex items-center">
          {isOpen ? (
            <ChevronUp
              className="w-5 h-5 transition-transform text-gray-500"
              style={{ color: themeColors.text }}
            />
          ) : (
            <ChevronDown
              className="w-5 h-5 transition-transform text-gray-500"
              style={{ color: themeColors.text }}
            />
          )}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 ">
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Answer:
                </h4>
                <div
                  className="p-3 rounded-md bg-white border border-gray-200"
                  style={{
                    backgroundColor: themeColors.light,
                    borderColor: themeColors.border,
                  }}
                >
                  {question.solution ? (
                    <div className="space-y-4">
                      <div
                        className="prose prose-sm max-w-none text-sm"
                        dangerouslySetInnerHTML={{ __html: question.solution }}
                      />
                      <div className="pt-2 space-y-3">
                        <button
                          onClick={handleAnswer}
                          disabled={isAnswered}
                          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${isAnswered ? 'bg-green-100 text-green-700 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
                          style={{
                            backgroundColor: isAnswered ? themeColors.light : themeColors.bg,
                            color: isAnswered ? themeColors.text : 'white',
                          }}
                        >
                          {isAnswered ? '✓ Answered' : 'I\'ve Answered This'}
                        </button>
                        
                        {/* Question Feedback Component */}
                        <QuestionFeedback 
                          questionId={question.id || question._id} 
                          className="pt-2 border-t border-gray-100" 
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 italic text-sm">
                      Answer not available yet. This question is under
                      development.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function QuestionModal({ isOpen, onClose, question, topic }) {
  const themeColors = getThemeColors(topic);
  const { processQuestionAnswer } = useGamification();
  const [isAnswered, setIsAnswered] = useState(false);
  
  if (!isOpen || !question) return null;
  
  const handleAnswer = async () => {
    if (isAnswered) return;
    
    const result = await processQuestionAnswer({
      questionId: question.id,
      topic,
      difficulty: question.difficulty || 'medium'
    });
    
    if (result) {
      setIsAnswered(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                {/* Question */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800 flex justify-between items-center">
                    Question:
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-black hover:bg-opacity-10 rounded-full transition-colors"
                    >
                      <X
                        className="w-6 h-6 text-gray-600"
                        style={{ color: themeColors.text }}
                      />
                    </button>
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {question.question}
                  </p>
                </div>

                {/* Answer */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    Answer:
                  </h3>
                  <div
                    className="p-4 rounded-lg bg-gray-50 border border-gray-200"
                    style={{
                      backgroundColor: themeColors.light,
                      borderColor: themeColors.border,
                    }}
                  >
                    {question.solution ? (
                      <div
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: question.solution }}
                      />
                    ) : (
                      <p className="text-gray-500 italic">
                        Answer not available yet. This question is under
                        development.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center p-6 border-t bg-gray-50">
                <button
                  onClick={handleAnswer}
                  disabled={isAnswered}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${isAnswered ? 'bg-green-100 text-green-700 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
                >
                  {isAnswered ? '✓ Answered' : 'I\'ve Answered This'}
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2 rounded-lg font-medium transition-colors bg-gray-600 text-white hover:bg-gray-700"
                  style={{
                    backgroundColor: themeColors.bg,
                    color: themeColors.text,
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function BasicTabs({
  topicPrepareData,
  topicInterviewData,
  topic,
}) {
  const router = useRouter();
  const [interviewQues, setInterviewQues] = React.useState([]);
  const [selectedQuestion, setSelectedQuestion] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  // Pagination states
  const [beginnerPage, setBeginnerPage] = React.useState(1);
  const [advancePage, setAdvancePage] = React.useState(1);
  const [interviewPage, setInterviewPage] = React.useState(1);
  const itemsPerPage = 15;

  // Get theme colors for current topic
  const themeColors = getThemeColors(topic);
  const themeCSSProps = getThemeCSSProperties(topic);

  const [value, setValue] = React.useState(0);
  const [interviewSelection, setInterviewSelection] = React.useState("Junior");
  const [level, setLevel] = React.useState("Beginner");
  const [indexSelected, setIndexValue] = React.useState(0);
  const [topicSelected, setTopicSelected] = React.useState("");

  const selectedTopicData = React.useMemo(() => {
    return topicPrepareData?.type || [];
  }, [topicPrepareData]);

  const [learnedConcepts, setLearnedConcepts] = React.useState({});
  const { data: session } = useSession();

  // Gamification integration
  const { processQuestionAnswer, notifications, clearNotification } =
    useGamification();

  React.useEffect(() => {
    const stored = localStorage.getItem("learnedConcepts");
    if (stored) {
      setLearnedConcepts(JSON.parse(stored));
    }
  }, []);

  const getConceptKey = (topic, concept) => `${topic}__${concept}`;

  const handleLearnedToggle = async (concept) => {
    const key = getConceptKey(topic, concept.topic);
    const wasChecked = !!learnedConcepts[key];

    setLearnedConcepts((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      localStorage.setItem("learnedConcepts", JSON.stringify(updated));
      return updated;
    });

    // If user is logged in, sync with database
    if (session?.user?.id) {
      try {
        if (!wasChecked) {
          // Adding - call POST API
          await fetch("/api/auth/learned-topic", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: session.user.id,
              topic,
              concept: concept.topic,
            }),
          });

          // Award XP for learning a concept
          await processQuestionAnswer({
            questionId: `concept_${concept.topic}`,
            category: topic,
            difficulty: "easy",
            isCorrect: true,
            timeSpent: 30,
            actionType: "concept_learned",
          });
        } else {
          // Removing - call DELETE API
          await fetch("/api/auth/learned-topic", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: session.user.id,
              topic,
              concept: concept.topic,
            }),
          });
        }
      } catch (err) {
        console.error("Failed to update learned topic in DB", err);
      }
    }
  };

  React.useEffect(() => {
    setTopicSelected(topic);
    const topicIndex = prepareData.findIndex((t) => t.category === topic);
    setIndexValue(topicIndex);
  }, [topic]);

  React.useEffect(() => {
    const filteredTopic = topicInterviewData.filter(
      (item) => item.categories === interviewSelection
    );
    setInterviewQues(filteredTopic[0] || {});
    setInterviewPage(1); // Reset to first page when changing interview level
  }, [interviewSelection, topicInterviewData]);

  // Reset pagination when switching between Beginner/Advance levels
  React.useEffect(() => {
    setBeginnerPage(1);
    setAdvancePage(1);
  }, [level]);

  // Reset pagination when search query changes
  React.useEffect(() => {
    setBeginnerPage(1);
    setAdvancePage(1);
  }, [searchQuery]);

  React.useEffect(() => {
    if (session?.user?.id) {
      console.log("User.id", session);
      fetch(`/api/auth/learned-topic?userId=${session.user.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data.learnedPrepareTopics)) {
            // Map to { [key]: true }
            const dbLearned = {};
            data.learnedPrepareTopics.forEach((item) => {
              dbLearned[getConceptKey(item.topic, item.concept)] = true;
            });
            setLearnedConcepts(dbLearned);
          }
        });
    }
  }, [session?.user?.id, topic]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleQuestionClick = async (question) => {
    setSelectedQuestion(question);
    setIsModalOpen(true);

    // Award XP for viewing a question
    if (session?.user?.id) {
      await processQuestionAnswer({
        questionId: question._id || question.id || `q_${Date.now()}`,
        category: topic,
        difficulty: question.difficulty || "medium",
        isCorrect: true,
        timeSpent: 5,
        actionType: "question_viewed",
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuestion(null);
  };

  const filteredPrepareData = React.useMemo(() => {
    if (!selectedTopicData || selectedTopicData.length === 0) return [];

    if (!searchQuery.trim()) return selectedTopicData;

    return selectedTopicData
      .map((level) => ({
        ...level,
        concepts:
          level.concepts?.filter((concept) => {
            const query = searchQuery.toLowerCase();
            return concept.topic.toLowerCase().includes(query);
          }) || [],
      }))
      .filter((level) => level.concepts.length > 0);
  }, [selectedTopicData, searchQuery]);

  // Pagination helpers
  const getPaginatedData = (data, page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const getTotalPages = (dataLength) => {
    return Math.ceil(dataLength / itemsPerPage);
  };

  // Paginated data
  const paginatedBeginnerData = React.useMemo(() => {
    const beginnerConcepts = filteredPrepareData[0]?.concepts || [];
    return getPaginatedData(beginnerConcepts, beginnerPage);
  }, [filteredPrepareData, beginnerPage]);

  const paginatedAdvanceData = React.useMemo(() => {
    const advanceConcepts = filteredPrepareData[1]?.concepts || [];
    return getPaginatedData(advanceConcepts, advancePage);
  }, [filteredPrepareData, advancePage]);

  const paginatedInterviewData = React.useMemo(() => {
    const questions = interviewQues?.questions || [];
    return getPaginatedData(questions, interviewPage);
  }, [interviewQues, interviewPage]);
  return (
    <>
      {/* XP Notifications */}
      {notifications?.map((notification) => (
        <XPNotification
          key={notification.id}
          notification={notification}
          onClose={() => clearNotification(notification.id)}
        />
      ))}

      <Box className="w-full max-w-6xl mx-auto px-4">
        <Header topic={topic} indexSelected={indexSelected} />

        {/* Gamification Components */}
        {session?.user?.id && (
          <div className="mb-4 space-y-4">
            <GamificationDashboard userId={session.user.id} compact={true} />
            <ActiveChallenge topic={topic} />
          </div>
        )}
        {/* Main Content Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <Box sx={{ width: "auto" }}>
            <Box>
              <MuiTabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                centered
                sx={{
                  marginTop: 0,
                  "& .MuiTabs-indicator": {
                    backgroundColor: themeColors.bg,
                  },
                  "& .MuiTab-root": {
                    color: themeColors.text,
                    padding: "16px 24px",
                    fontSize: "16px",
                    fontWeight: 600,
                  },
                  "& .MuiTab-root.Mui-selected": {
                    color: themeColors.topic,
                  },
                }}
              >
                <Tab
                  sx={{ textTransform: "none" }}
                  label="📚 Prepare"
                  {...a11yProps(0)}
                />
                <Tab
                  sx={{ textTransform: "none" }}
                  label="💼 Interview Questions"
                  {...a11yProps(1)}
                />
              </MuiTabs>
            </Box>
          <CustomTabPanel value={value} index={0}>
            <div className="p-6">
              <div
                className="relative rounded-lg border bg-gray-50 w-full mb-6"
                style={{
                  textTransform: "none",
                  outline: "none",
                  borderColor: themeColors.border,
                }}
              >
              <Input
                type="text"
                placeholder="Search topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ textTransform: "none", outline: "none" }}
                className="rounded-lg appearance-none text-[14px] w-full pl-10"
              />
              <SearchIcon
                className="absolute left-2.5 top-2.5 w-5 h-5 text-gray-400"
                style={{ color: themeColors.bg }}
              />
            </div>
            <Tabs defaultValue="Beginner" value={level} className="w-auto">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" style={{ color: themeColors.topic }} />
                  Learning Path
                </h3>
              </div>
              <TabsList className="grid w-full grid-cols-2 bg-white border">
                <TabsTrigger
                  value="Beginner"
                  onClick={() => setLevel("Beginner")}
                  className={`bg-white ${
                    topic === "Javascript"
                      ? "data-[state=active]:bg-Javascript-bg data-[state=active]:text-Javascript-text"
                      : topic === "React"
                      ? "data-[state=active]:text-React-text data-[state=active]:bg-React-bg"
                      : topic === "Node"
                      ? "data-[state=active]:text-Node-text data-[state=active]:bg-Node-bg"
                      : topic === "Typescript"
                      ? "data-[state=active]:text-Typescript-text data-[state=active]:bg-Typescript-bg"
                      : topic === "AWS S3"
                      ? "data-[state=active]:text-AWS-text data-[state=active]:bg-AWS-bg"
                      : ""
                  }`}
                >
                  Beginner
                </TabsTrigger>
                <TabsTrigger
                  value="Advance"
                  onClick={() => setLevel("Advance")}
                  className={`bg-white ${
                    topic === "Javascript"
                      ? "data-[state=active]:bg-Javascript-bg data-[state=active]:text-Javascript-text"
                      : topic === "React"
                      ? "data-[state=active]:text-React-text data-[state=active]:bg-React-bg"
                      : topic === "Node"
                      ? "data-[state=active]:text-Node-text data-[state=active]:bg-Node-bg"
                      : topic === "Typescript"
                      ? "data-[state=active]:text-Typescript-text data-[state=active]:bg-Typescript-bg"
                      : topic === "AWS S3"
                      ? "data-[state=active]:text-AWS-text data-[state=active]:bg-AWS-bg"
                      : ""
                  }`}
                >
                  Advance
                </TabsTrigger>
              </TabsList>
              <TabsContent value="Beginner" className="mt-5">
                <Table>
                  {/* <TableHeader>
                  <TableRow>
                    <TableHead
                      className={`px-0 ${
                        topic === "Javascript"
                          ? "text-Javascript-text "
                          : topic === "React"
                          ? "text-React-text "
                          : topic === "Node"
                          ? "text-Node-text "
                          : topic === "Typescript"
                          ? "text-Typescript-text "
                          : topic === "AWS S3"
                          ? "text-AWS-text "
                          : ""
                      } text-left md:text-center`}
                    >
                      Topic
                    </TableHead>
                    <TableHead
                      className={`text-center ${
                        topic === "Javascript"
                          ? "text-Javascript-text "
                          : topic === "React"
                          ? "text-React-text "
                          : topic === "Node"
                          ? "text-Node-text "
                          : topic === "Typescript"
                          ? "text-Typescript-text "
                          : topic === "AWS S3"
                          ? "text-AWS-text "
                          : ""
                      }`}
                    >
                      Action
                    </TableHead>
                    {session?.user?.id && (
                      <TableHead
                        className={`text-center ${
                          topic === "Javascript"
                            ? "text-Javascript-text "
                            : topic === "React"
                            ? "text-React-text "
                            : topic === "Node"
                            ? "text-Node-text "
                            : topic === "Typescript"
                            ? "text-Typescript-text "
                            : topic === "AWS S3"
                            ? "text-AWS-text "
                            : ""
                        }`}
                      >
                        Status
                      </TableHead>
                    )}
                  </TableRow>
                </TableHeader> */}
                  <TableBody>
                    {paginatedBeginnerData.length > 0 ? (
                      paginatedBeginnerData.map((concept, index) => (
                        <TableRow key={concept.topic}>
                          {session?.user?.id && (
                            <TableCell className="text-center">
                              <Checkbox
                                className="data-[state=checked]:text-white"
                                style={{
                                  borderColor: themeColors.topic,
                                  "--radix-checkbox-indicator-color": "white",
                                }}
                                data-theme-bg={themeColors.topic}
                                checked={
                                  !!learnedConcepts[
                                    getConceptKey(topic, concept.topic)
                                  ]
                                }
                                onCheckedChange={() =>
                                  handleLearnedToggle(concept)
                                }
                                aria-label="Mark as learned"
                              />
                            </TableCell>
                          )}
                          <TableCell
                            className="text-left font-medium text-[15px] p-[0px] text-gray-900 md:pl-4"
                            style={{ color: themeColors.text }}
                          >
                            {index <= 8 ? (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  duration: 0.8,
                                  delay: 0.2 * index,
                                  ease: [0, 0.71, 0.2, 1.01],
                                }}
                              >
                                {concept.topic}
                              </motion.div>
                            ) : (
                              <div>{concept.topic}</div>
                            )}
                          </TableCell>
                          <TableCell className="text-right md:flex">
                            {index <= 8 ? (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  duration: 0.8,
                                  delay: 0.2 * index,
                                  ease: [0, 0.71, 0.2, 1.01],
                                }}
                                onClick={() =>
                                  router.push(
                                    `/learn/${topic}/${concept.topic}`
                                  )
                                }
                                className="flex mb-1 font-medium cursor-pointer border border-gray-200 pt-1.5 pb-1.5 pl-2.5 pr-2.5 rounded-md md:mb-0 md:mr-[3%] md:ml-auto"
                                style={{
                                  backgroundColor: themeColors.light,
                                  color: themeColors.text,
                                }}
                                onMouseEnter={(e) =>
                                  (e.target.style.backgroundColor =
                                    themeColors.bg)
                                }
                                onMouseLeave={(e) =>
                                  (e.target.style.backgroundColor =
                                    themeColors.light)
                                }
                              >
                                <BookOpenCheck
                                  className="mr-2 w-[19px] md:w-[15px]"
                                  style={{ color: themeColors.topic }}
                                />
                                Learn
                              </motion.div>
                            ) : (
                              <div
                                onClick={() =>
                                  router.push(
                                    `/learn/${topic}/${concept.topic}`
                                  )
                                }
                                className="flex mb-1 font-medium cursor-pointer border border-gray-200 pt-1.5 pb-1.5 pl-2.5 pr-2.5 rounded-md md:mb-0 md:mr-[3%] md:ml-auto"
                                style={{
                                  backgroundColor: themeColors.light,
                                  color: themeColors.text,
                                }}
                                onMouseEnter={(e) =>
                                  (e.target.style.backgroundColor =
                                    themeColors.bg)
                                }
                                onMouseLeave={(e) =>
                                  (e.target.style.backgroundColor =
                                    themeColors.light)
                                }
                              >
                                <BookOpenCheck
                                  className="mr-2 w-[19px] md:w-[15px]"
                                  style={{ color: themeColors.topic }}
                                />
                                Learn
                              </div>
                            )}
                            {index <= 8 ? (
                              <motion.div
                                onClick={() =>
                                  router.push(`/test/${topic}/${concept.topic}`)
                                }
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  duration: 0.8,
                                  delay: 0.2 * index,
                                  ease: [0, 0.71, 0.2, 1.01],
                                }}
                                className="flex font-medium cursor-pointer border border-gray-200 pt-1.5 pb-1.5 pl-2.5 pr-2.5 rounded-md"
                                style={{
                                  backgroundColor: themeColors.light,
                                  color: themeColors.text,
                                }}
                                onMouseEnter={(e) =>
                                  (e.target.style.backgroundColor =
                                    themeColors.bg)
                                }
                                onMouseLeave={(e) =>
                                  (e.target.style.backgroundColor =
                                    themeColors.light)
                                }
                              >
                                <Code
                                  className="mr-2 w-[19px] md:w-[15px]"
                                  style={{ color: themeColors.topic }}
                                />
                                Practice
                              </motion.div>
                            ) : (
                              <div
                                onClick={() =>
                                  router.push(`/test/${topic}/${concept.topic}`)
                                }
                                className="flex font-medium cursor-pointer border border-gray-200 pt-1.5 pb-1.5 pl-2.5 pr-2.5 rounded-md"
                                style={{
                                  backgroundColor: themeColors.light,
                                  color: themeColors.text,
                                }}
                                onMouseEnter={(e) =>
                                  (e.target.style.backgroundColor =
                                    themeColors.bg)
                                }
                                onMouseLeave={(e) =>
                                  (e.target.style.backgroundColor =
                                    themeColors.light)
                                }
                              >
                                <Code
                                  className="mr-2 w-[19px] md:w-[15px]"
                                  style={{ color: themeColors.topic }}
                                />
                                Practice
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : searchQuery.trim() ? (
                      <TableRow>
                        <TableCell
                          colSpan={3}
                          className="text-center py-8 text-gray-500"
                        >
                          <SearchIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                          <p className="text-sm font-medium">No topics found</p>
                          <p className="text-xs">
                            Try adjusting your search terms
                          </p>
                        </TableCell>
                      </TableRow>
                    ) : null}
                  </TableBody>
                </Table>
                {filteredPrepareData[0]?.concepts?.length > 0 && (
                  <PaginationComponent
                    currentPage={beginnerPage}
                    totalPages={getTotalPages(
                      filteredPrepareData[0]?.concepts?.length || 0
                    )}
                    onPageChange={setBeginnerPage}
                    themeColors={themeColors}
                  />
                )}
              </TabsContent>
              <TabsContent value="Advance" className="mt-4">
                <Table>
                  {/* <TableHeader>
                  <TableRow>
                    <TableHead
                      className={`px-0  ${
                        topic === "Javascript"
                          ? "text-Javascript-text "
                          : topic === "React"
                          ? "text-React-text"
                          : topic === "Typescript"
                          ? "text-Typescript-text"
                          : topic === "AWS S3"
                          ? "text-AWS-text"
                          : ""
                      } text-left md:text-center`}
                    >
                      Topic
                    </TableHead>
                    <TableHead
                      className={`text-center ${
                        topic === "Javascript"
                          ? "text-Javascript-text "
                          : topic === "React"
                          ? "text-React-text"
                          : topic === "Typescript"
                          ? "text-Typescript-text"
                          : topic === "AWS S3"
                          ? "text-AWS-text"
                          : ""
                      }`}
                    >
                      Action
                    </TableHead>
                    {/* <TableHead
                      className={`text-center ${
                        topic === "Javascript" ? "text-Javascript-text " : ""
                      }`}
                    >
                      Status
                    </TableHead> */}
                  {/* </TableRow>
                </TableHeader>  */}
                  <TableBody>
                    {paginatedAdvanceData.length > 0 ? (
                      paginatedAdvanceData.map((concept, index) => (
                        <TableRow key={concept.topic} className="w-full">
                          {session?.user?.id && (
                            <TableCell className="text-center">
                              <Checkbox
                                className="data-[state=checked]:text-white"
                                style={{
                                  borderColor: themeColors.topic,
                                  "--radix-checkbox-indicator-color": "white",
                                }}
                                data-theme-bg={themeColors.topic}
                                checked={
                                  !!learnedConcepts[
                                    getConceptKey(topic, concept.topic)
                                  ]
                                }
                                onCheckedChange={() =>
                                  handleLearnedToggle(concept)
                                }
                                aria-label="Mark as learned"
                              />
                            </TableCell>
                          )}
                          <TableCell
                            className="text-left font-medium text-[15px] p-[0px] text-gray-900 md:pl-4"
                            style={{ color: themeColors.text }}
                          >
                            {index <= 8 ? (
                              <motion.div
                                className="w-full"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  duration: 0.8,
                                  delay: 0.2 * index,
                                  ease: [0, 0.71, 0.2, 1.01],
                                }}
                              >
                                {concept.topic}
                              </motion.div>
                            ) : (
                              <div className="w-full">{concept.topic}</div>
                            )}
                          </TableCell>
                          <TableCell className="text-right md:flex">
                            {index <= 8 ? (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  duration: 0.8,
                                  delay: 0.2 * index,
                                  ease: [0, 0.71, 0.2, 1.01],
                                }}
                                onClick={() =>
                                  router.push(
                                    `/learn/${topic}/${concept.topic}`
                                  )
                                }
                                className="flex mb-1 font-medium cursor-pointer border border-gray-200 pt-1.5 pb-1.5 pl-2.5 pr-2.5 rounded-md md:mb-0 md:mr-[3%] md:ml-auto"
                                style={{
                                  backgroundColor: themeColors.light,
                                  color: themeColors.text,
                                }}
                                onMouseEnter={(e) =>
                                  (e.target.style.backgroundColor =
                                    themeColors.bg)
                                }
                                onMouseLeave={(e) =>
                                  (e.target.style.backgroundColor =
                                    themeColors.light)
                                }
                              >
                                <BookOpenCheck
                                  className="mr-2 w-[19px] md:w-[15px]"
                                  style={{ color: themeColors.topic }}
                                />
                                Learn
                              </motion.div>
                            ) : (
                              <div
                                onClick={() =>
                                  router.push(
                                    `/learn/${topic}/${concept.topic}`
                                  )
                                }
                                className={`flex mb-1 font-medium cursor-pointer border pt-1.5 pb-1.5 pl-2.5 pr-2.5 rounded-md 
                              ${
                                topic === "Javascript"
                                  ? " text-Javascript-text bg-white hover:bg-Javascript-bg"
                                  : topic === "React"
                                  ? "text-React-text bg-white hover:bg-React-bg "
                                  : topic === "Node"
                                  ? "text-Node-text bg-white hover:bg-Node-bg "
                                  : topic === "Typescript"
                                  ? "text-Typescript-text bg-white hover:bg-Typescript-bg "
                                  : topic === "AWS S3"
                                  ? "text-AWS-text bg-white hover:bg-AWS-bg "
                                  : ""
                              } 
                            md:mb-0 md:mr-[3%] md:ml-auto `}
                              >
                                {" "}
                                <BookOpenCheck
                                  className="mr-2 w-[19px] md:w-[15px]"
                                  style={{ color: themeColors.topic }}
                                />
                                Learn
                              </div>
                            )}
                            {index <= 8 ? (
                              <motion.div
                                onClick={() =>
                                  router.push(`/test/${topic}/${concept.topic}`)
                                }
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  duration: 0.8,
                                  delay: 0.2 * index,
                                  ease: [0, 0.71, 0.2, 1.01],
                                }}
                                className="flex font-medium cursor-pointer border border-gray-200 pt-1.5 pb-1.5 pl-2.5 pr-2.5 rounded-md"
                                style={{
                                  backgroundColor: themeColors.light,
                                  color: themeColors.text,
                                }}
                                onMouseEnter={(e) =>
                                  (e.target.style.backgroundColor =
                                    themeColors.bg)
                                }
                                onMouseLeave={(e) =>
                                  (e.target.style.backgroundColor =
                                    themeColors.light)
                                }
                              >
                                <Code
                                  className="mr-2 w-[19px] md:w-[15px]"
                                  style={{ color: themeColors.topic }}
                                />
                                Practice
                              </motion.div>
                            ) : (
                              <div
                                onClick={() =>
                                  router.push(`/test/${topic}/${concept.topic}`)
                                }
                                className="flex font-medium cursor-pointer border border-gray-200 pt-1.5 pb-1.5 pl-2.5 pr-2.5 rounded-md"
                                style={{
                                  backgroundColor: themeColors.light,
                                  color: themeColors.text,
                                }}
                                onMouseEnter={(e) =>
                                  (e.target.style.backgroundColor =
                                    themeColors.bg)
                                }
                                onMouseLeave={(e) =>
                                  (e.target.style.backgroundColor =
                                    themeColors.light)
                                }
                              >
                                <Code
                                  className="mr-2 w-[19px] md:w-[15px]"
                                  style={{ color: themeColors.topic }}
                                />
                                Practice
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : searchQuery.trim() ? (
                      <TableRow>
                        <TableCell
                          colSpan={session?.user?.id ? 3 : 2}
                          className="text-center py-8 text-gray-500"
                        >
                          <SearchIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                          <p className="text-sm font-medium">No topics found</p>
                          <p className="text-xs">
                            Try adjusting your search terms
                          </p>
                        </TableCell>
                      </TableRow>
                    ) : null}
                  </TableBody>
                </Table>
                {filteredPrepareData[1]?.concepts?.length > 0 && (
                  <PaginationComponent
                    currentPage={advancePage}
                    totalPages={getTotalPages(
                      filteredPrepareData[1]?.concepts?.length || 0
                    )}
                    onPageChange={setAdvancePage}
                    themeColors={themeColors}
                  />
                )}
              </TabsContent>
            </Tabs>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Tabs
              defaultValue="Junior"
              value={interviewSelection}
              className="w-auto mt-2"
            >
              <TabsList className="grid w-full grid-cols-3 bg-white border">
                <TabsTrigger
                  value="Junior"
                  onClick={() => setInterviewSelection("Junior")}
                  className={`bg-white ${
                    topic === "Javascript"
                      ? "data-[state=active]:bg-Javascript-bg data-[state=active]:text-Javascript-text"
                      : topic === "React"
                      ? "data-[state=active]:text-React-text data-[state=active]:bg-React-bg"
                      : topic === "Node"
                      ? "data-[state=active]:text-Node-text data-[state=active]:bg-Node-bg"
                      : topic === "Typescript"
                      ? "data-[state=active]:text-Typescript-text data-[state=active]:bg-Typescript-bg"
                      : topic === "AWS S3"
                      ? "data-[state=active]:text-AWS-text data-[state=active]:bg-AWS-bg"
                      : ""
                  }`}
                >
                  Junior
                </TabsTrigger>
                <TabsTrigger
                  value="Mid"
                  onClick={() => setInterviewSelection("Mid")}
                  className={`bg-white ${
                    topic === "Javascript"
                      ? "data-[state=active]:bg-Javascript-bg data-[state=active]:text-Javascript-text"
                      : topic === "React"
                      ? "data-[state=active]:text-React-text data-[state=active]:bg-React-bg"
                      : topic === "Node"
                      ? "data-[state=active]:text-Node-text data-[state=active]:bg-Node-bg"
                      : topic === "Typescript"
                      ? "data-[state=active]:text-Typescript-text data-[state=active]:bg-Typescript-bg"
                      : topic === "AWS S3"
                      ? "data-[state=active]:text-AWS-text data-[state=active]:bg-AWS-bg"
                      : ""
                  }`}
                >
                  Mid
                </TabsTrigger>
                <TabsTrigger
                  value="Senior"
                  onClick={() => setInterviewSelection("Senior")}
                  className={`bg-white ${
                    topic === "Javascript"
                      ? "data-[state=active]:bg-Javascript-bg data-[state=active]:text-Javascript-text"
                      : topic === "React"
                      ? "data-[state=active]:text-React-text data-[state=active]:bg-React-bg"
                      : topic === "Node"
                      ? "data-[state=active]:text-Node-text data-[state=active]:bg-Node-bg"
                      : topic === "Typescript"
                      ? "data-[state=active]:text-TypeScript-text data-[state=active]:bg-TypeScript-bg"
                      : topic === "AWS S3"
                      ? "data-[state=active]:text-AWS-text data-[state=active]:bg-AWS-bg"
                      : ""
                  }`}
                >
                  Senior
                </TabsTrigger>
              </TabsList>
              <TabsContent value="Junior" className="mt-4">
                <div className="flex flex-col gap-3">
                  {paginatedInterviewData.length > 0
                    ? paginatedInterviewData.map((item, index) => (
                        <AccordionQuestion
                          key={index}
                          question={item}
                          topic={topic}
                          index={index}
                        />
                      ))
                    : null}
                </div>
                {interviewQues?.questions?.length > 0 && (
                  <PaginationComponent
                    currentPage={interviewPage}
                    totalPages={getTotalPages(
                      interviewQues?.questions?.length || 0
                    )}
                    onPageChange={setInterviewPage}
                    themeColors={themeColors}
                  />
                )}
              </TabsContent>
              <TabsContent value="Mid" className="mt-4">
                <div className="flex flex-col gap-3">
                  {paginatedInterviewData.length > 0
                    ? paginatedInterviewData.map((item, index) => (
                        <AccordionQuestion
                          key={index}
                          question={item}
                          topic={topic}
                          index={index}
                        />
                      ))
                    : null}
                </div>
                {interviewQues?.questions?.length > 0 && (
                  <PaginationComponent
                    currentPage={interviewPage}
                    totalPages={getTotalPages(
                      interviewQues?.questions?.length || 0
                    )}
                    onPageChange={setInterviewPage}
                    themeColors={themeColors}
                  />
                )}
              </TabsContent>
              <TabsContent value="Senior" className="mt-4">
                <div className="flex flex-col gap-3">
                  {paginatedInterviewData.length > 0
                    ? paginatedInterviewData.map((item, index) => (
                        <AccordionQuestion
                          key={index}
                          question={item}
                          topic={topic}
                          index={index}
                        />
                      ))
                    : null}
                </div>
                {interviewQues?.questions?.length > 0 && (
                  <PaginationComponent
                    currentPage={interviewPage}
                    totalPages={getTotalPages(
                      interviewQues?.questions?.length || 0
                    )}
                    onPageChange={setInterviewPage}
                    themeColors={themeColors}
                  />
                )}
              </TabsContent>
            </Tabs>
          </CustomTabPanel>

        </Box>

        {/* Question Modal */}
        <QuestionModal
          isOpen={isModalOpen}
          onClose={closeModal}
          question={selectedQuestion}
          topic={topic}
        />
        </div>
      </Box>
    </>
  );
}
