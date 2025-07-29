
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
import Tabs from "@mui/material/Tabs";
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
// Using local data for better performance - no API calls needed
import { interviewData } from "@/data/interviewData";
import {
  Tabs as TAB,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { SearchIcon } from "lucide-react";
import { prepareData } from "@/data/prepareData";
import { Typography } from "@mui/material";
import Header from "@/components/header";

// Static generation functions
export async function getStaticPaths() {
  // Define all possible topics
  const topics = ['Javascript', 'React', 'Node', 'Typescript'];
  
  const paths = topics.map((topic) => ({
    params: { slug: topic },
  }));

  return {
    paths,
    fallback: false, // Return 404 for any paths not returned by getStaticPaths
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  
  // Filter data for the specific topic
  const topicPrepareData = prepareData.find(item => item.category === slug);
  const topicInterviewData = interviewData.filter(item => item.topic === slug);
  
  return {
    props: {
      topicPrepareData: topicPrepareData || null,
      topicInterviewData: topicInterviewData || [],
      topic: slug,
    },
    // Revalidate every hour (3600 seconds)
    revalidate: 3600,
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

// Accordion Question Component
function AccordionQuestion({ question, topic, index }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
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
            className={`font-medium text-sm leading-relaxed ${
              topic === "Javascript"
                ? "text-Javascript-text"
                : topic === "React"
                ? "text-React-text"
                : topic === "Node"
                ? "text-Node-text"
                : topic === "Typescript"
                ? "text-Typescript-text"
                : "text-gray-900"
            }`}
          >
            {question.question}
          </h3>
          
          {/* Tags */}
          {question.tags && question.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {question.tags.slice(0, 3).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                    topic === "Javascript"
                      ? "bg-Javascript-lightTheme text-Javascript-text"
                      : topic === "React"
                      ? "bg-React-lightTheme text-React-text"
                      : topic === "Node"
                      ? "bg-Node-lightTheme text-Node-text"
                      : topic === "Typescript"
                      ? "bg-Typescript-lightTheme text-Typescript-text"
                      : "bg-gray-100 text-gray-700"
                  }`}
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
              className={`w-5 h-5 transition-transform ${
                topic === "Javascript"
                  ? "text-Javascript-text"
                  : topic === "React"
                  ? "text-React-text"
                  : topic === "Node"
                  ? "text-Node-text"
                  : topic === "Typescript"
                  ? "text-Typescript-text"
                  : "text-gray-500"
              }`}
            />
          ) : (
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                topic === "Javascript"
                  ? "text-Javascript-text"
                  : topic === "React"
                  ? "text-React-text"
                  : topic === "Node"
                  ? "text-Node-text"
                  : topic === "Typescript"
                  ? "text-Typescript-text"
                  : "text-gray-500"
              }`}
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
                <h4 className="text-sm font-medium text-gray-700 mb-2">Answer:</h4>
                <div className={`p-3 rounded-md ${
                  topic === "Javascript"
                    ? "bg-Javascript-lightTheme border border-Javascript-border"
                    : topic === "React"
                    ? "bg-React-lightTheme border border-React-border"
                    : topic === "Node"
                    ? "bg-Node-lightTheme border border-Node-border"
                    : topic === "Typescript"
                    ? "bg-Typescript-lightTheme border border-Typescript-border"
                    : "bg-white border border-gray-200"
                }`}>
                  {question.solution ? (
                    <div 
                      className="prose prose-sm max-w-none text-sm"
                      dangerouslySetInnerHTML={{ __html: question.solution }}
                    />
                  ) : (
                    <p className="text-gray-500 italic text-sm">
                      Answer not available yet. This question is under development.
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

// Question Modal Component
function QuestionModal({ isOpen, onClose, question, topic }) {
  if (!isOpen || !question) return null;

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
                      <X className={`w-6 h-6 ${
                        topic === "Javascript"
                          ? "text-Javascript-text"
                          : topic === "React"
                          ? "text-React-text"
                          : topic === "Node"
                          ? "text-Node-text"
                          : topic === "Typescript"
                          ? "text-Typescript-text"
                          : "text-gray-600"
                      }`} />
                    </button>
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {question.question}
                  </p>
                </div>

                {/* Answer */}
                <div >
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    Answer:
                  </h3>
                  <div className={`p-4 rounded-lg ${
                    topic === "Javascript"
                      ? "bg-Javascript-lightTheme border border-Javascript-border"
                      : topic === "React"
                      ? "bg-React-lightTheme border border-React-border"
                      : topic === "Node"
                      ? "bg-Node-lightTheme border border-Node-border"
                      : topic === "Typescript"
                      ? "bg-Typescript-lightTheme border border-Typescript-border"
                      : "bg-gray-50 border border-gray-200"
                  }`}>
                    {question.solution ? (
                      <div 
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: question.solution }}
                      />
                    ) : (
                      <p className="text-gray-500 italic">
                        Answer not available yet. This question is under development.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end p-6 border-t bg-gray-50">
                <button
                  onClick={onClose}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    topic === "Javascript"
                      ? "bg-Javascript-bg text-Javascript-text hover:bg-Javascript-border"
                      : topic === "React"
                      ? "bg-React-bg text-React-text hover:bg-React-border"
                      : topic === "Node"
                      ? "bg-Node-bg text-Node-text hover:bg-Node-border"
                      : topic === "Typescript"
                      ? "bg-Typescript-bg text-Typescript-text hover:bg-Typescript-border"
                      : "bg-gray-600 text-white hover:bg-gray-700"
                  }`}
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

export default function BasicTabs({ topicPrepareData, topicInterviewData, topic }) {
  const router = useRouter();
  const [interviewQues, setInterviewQues] = React.useState([]);
  const [selectedQuestion, setSelectedQuestion] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const [value, setValue] = React.useState(0);
  const [interviewSelection, setInterviewSelection] = React.useState("Junior");
  const [level, setLevel] = React.useState("Beginner");
  const [indexSelected, setIndexValue] = React.useState(0);
  const [topicSelected, setTopicSelected] = React.useState("");
  
  // Use static data instead of filtering on client
  let selectedTopicData = topicPrepareData?.type || [];

  // Add state for learned concepts
  const [learnedConcepts, setLearnedConcepts] = React.useState({});
  const { data: session } = useSession();

  // Load learned concepts from localStorage on mount
  React.useEffect(() => {
    const stored = localStorage.getItem("learnedConcepts");
    if (stored) {
      setLearnedConcepts(JSON.parse(stored));
    }
  }, []);

  // Helper to get unique key for a concept
  const getConceptKey = (topic, concept) => `${topic}__${concept}`;

  // Handler for checkbox toggle
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
    const filteredTopic = topicInterviewData
      .filter((item) => item.categories === interviewSelection);
    setInterviewQues(filteredTopic[0] || {});
  }, [interviewSelection, topicInterviewData]);

  React.useEffect(() => {
    if (session?.user?.id) {
      console.log("User.id", session)
      fetch(`/api/auth/learned-topic?userId=${session.user.id}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data.learnedPrepareTopics)) {
            // Map to { [key]: true }
            const dbLearned = {};
            data.learnedPrepareTopics.forEach(item => {
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

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuestion(null);
  };

  // Filter prepare data based on search query
  const filteredPrepareData = React.useMemo(() => {
    if (!selectedTopicData || selectedTopicData.length === 0) return [];
    
    if (!searchQuery.trim()) return selectedTopicData;
    
    return selectedTopicData.map(level => ({
      ...level,
      concepts: level.concepts?.filter(concept => {
        const query = searchQuery.toLowerCase();
        return concept.topic.toLowerCase().includes(query);
      }) || []
    })).filter(level => level.concepts.length > 0);
  }, [selectedTopicData, searchQuery]);

  return (
    <Box className="w-full md:w-7/12 lg:w-6/12 mx-auto">
      <Header topic={topic} indexSelected={indexSelected} />
      <Box sx={{ width: "auto" }}>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
            sx={
              topic === "Javascript"
                ? {
                    marginTop: 2,
                    "& .MuiTabs-indicator": {
                      backgroundColor: "var(--javascript-bg)",
                    },
                    "& .MuiTab-root": {
                      color: "var(--javascript-text)",
                    },
                    "& .MuiTab-root.Mui-selected": {
                      color: "var(--javascript-topic)",
                    },
                  }
                : topic === "React"
                ? {
                    marginTop: 2,
                    "& .MuiTabs-indicator": {
                      backgroundColor: "var(--react-bg)",
                    },
                    "& .MuiTab-root": {
                      color: "var(--react-text)",
                    },
                    "& .MuiTab-root.Mui-selected": {
                      color: "var(--react-topic)",
                    },
                  }
                : topic === "Node"
                ? {
                    marginTop: 2,
                    "& .MuiTabs-indicator": {
                      backgroundColor: "var(--node-bg)",
                    },
                    "& .MuiTab-root": {
                      color: "var(--node-text)",
                    },
                    "& .MuiTab-root.Mui-selected": {
                      color: "var(--node-topic)",
                    },
                  }
                : topic === "Typescript"
                ? {
                    marginTop: 2,
                    "& .MuiTabs-indicator": {
                      backgroundColor: "var(--ts-bg)",
                    },
                    "& .MuiTab-root": {
                      color: "var(--ts-text)",
                    },
                    "& .MuiTab-root.Mui-selected": {
                      color: "var(--ts-topic)",
                    },
                  }
                : {}
            }
          >
            <Tab
              sx={{ fontWeight: 600, textTransform: "none", fontSize: 17 }}
              label="Prepare"
              {...a11yProps(0)}
            />
            <Tab
              sx={{ fontWeight: 600, textTransform: "none", fontSize: 17 }}
              label="Interview Questions"
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div
            className={`relative rounded-lg border-1 ${
              topic === "Javascript"
                ? "border-Javascript-border"
                : topic === "React"
                ? "border-React-border "
                : topic === "Node"
                ? "border-Node-border "
                : topic === "Typescript"
                ? "border-Typescript-border "
                : ""
            } bg-gray-100 dark:bg-gray-800 w-full`}
            style={{ textTransform: "none", outline: "none" }}
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
              className={`absolute left-2.5 top-2.5 w-5 h-5 ${
                topic === "Javascript"
                  ? "text-Javascript-bg"
                  : topic === "React"
                  ? "text-React-bg "
                  : topic === "Node"
                  ? "text-Node-bg "
                  : topic === "Typescript"
                  ? "text-Typescript-text "
                  : "text-gray-400"
              }`}
            />
          </div>
          <TAB defaultValue="Beginner" value={level} className="w-auto mt-8">
            <TabsList className="grid w-full grid-cols-2 bg-white border">
              <TabsTrigger
                value="Beginner"
                onClick={() => setLevel("Beginner")}
                className={`bg-white ${
                  topic === "Javascript"
                    ? "data-[state=active]:bg-Javascript-bg data-[state=active]:text-Javascript-text"
                    : topic === "React"
                    ? "data-[state=active]:bg-React-bg data-[state=active]:text-React-text "
                    : topic === "Node"
                    ? "data-[state=active]:bg-Node-bg data-[state=active]:text-Node-text"
                    : topic === "Typescript" ? "data-[state=active]:bg-Typescript-bg data-[state=active]:text-Typescript-text"
                    : ""
                }`}
              >
                Beginner Topics
              </TabsTrigger>
              <TabsTrigger
                value="Advance"
                onClick={() => setLevel("Advance")}
                className={`bg-white ${
                  topic === "Javascript"
                    ? "data-[state=active]:bg-Javascript-bg data-[state=active]:text-Javascript-text"
                    : topic === "React"
                    ? "data-[state=active]:bg-React-bg data-[state=active]:text-React-text "
                    : topic === "Node"
                    ? "data-[state=active]:bg-Node-bg data-[state=active]:text-Node-text "
                    : topic === "Typescript" ? 
                    "data-[state=active]:bg-Typescript-bg data-[state=active]:text-Typescript-text "
                    : ""
                }`}
              >
                Advance Topics
              </TabsTrigger>
            </TabsList>
            <TabsContent value="Beginner" className="mt-5">
              <Table>
                <TableHeader>
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
                            : ""
                        }`}
                      >
                        Status
                      </TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPrepareData.length > 0 && filteredPrepareData[0]?.concepts?.length > 0 ? (
                    filteredPrepareData[0]?.concepts?.map((concept, index) => (
                      <TableRow key={concept.topic}>
                        <TableCell
                          className={`text-left font-medium text-[15px] p-[0px] ${
                            topic === "Javascript"
                              ? "text-Javascript-text "
                              : topic === "React"
                              ? "text-React-text "
                              : topic === "Node"
                              ? "text-Node-text "
                              : topic === "Typescript"
                              ? "text-Typescript-text "
                              : ""
                          } md:pl-4`}
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
                                router.push(`/learn/${topic}/${concept.topic}`)
                              }
                              className={`flex mb-1 font-medium cursor-pointer border pt-1.5 pb-1.5 pl-2.5 pr-2.5 rounded-md 
                                ${
                                  topic === "Javascript"
                                    ? " text-Javascript-text bg-white hover:bg-Javascript-bg"
                                    : topic === "React"
                                    ? "text-React-text bg-white hover:bg-React-bg"
                                    : topic === "Node"
                                    ? "text-Node-text bg-white hover:bg-Node-bg"
                                    : topic === "Typescript"
                                    ? "text-Typescript-text bg-white hover:bg-Typescript-bg"
                                    : ""
                                } 
                              md:mb-0 md:mr-[3%] md:ml-auto `}
                            >
                              <BookOpenCheck
                                className={`mr-2 w-[19px] ${
                                  topic === "Javascript"
                                    ? " text-Javascript-topic hover:bg-Javascript-bg hover:text-Javascript-text"
                                    : topic === "React"
                                    ? "text-React-text hover:text-React-text hover:bg-React-bg"
                                    : topic === "Node"
                                    ? "text-Node-text hover:text-Node-text hover:bg-Node-bg"
                                    : topic === "Typescript"
                                    ? "text-Typescript-text hover:text-Typescript-text hover:bg-Typescript-bg"
                                    : ""
                                } md: w-[15px]`}
                              />
                              Learn
                            </motion.div>
                          ) : (
                            <div
                              onClick={() =>
                                router.push(`/learn/${topic}/${concept.topic}`)
                              }
                              className={`flex mb-1 font-medium cursor-pointer border pt-1.5 pb-1.5 pl-2.5 pr-2.5 rounded-md 
                                ${
                                  topic === "Javascript"
                                    ? " text-Javascript-text bg-white hover:bg-Javascript-bg"
                                    : topic === "React"
                                    ? "text-React-text bg-white hover:bg-React-bg"
                                    : topic === "Node"
                                    ? "text-Node-text bg-white hover:bg-Node-bg"
                                    : topic === "Typescript"
                                    ? "text-Typescript-text bg-white hover:bg-Typescript-bg"
                                    : ""
                                } 
                              md:mb-0 md:mr-[3%] md:ml-auto `}
                            >
                              <BookOpenCheck
                                className={`mr-2 w-[19px]  ${
                                  topic === "Javascript"
                                    ? " text-Javascript-topic hover:bg-Javascript-bg hover:text-Javascript-text"
                                    : topic === "React"
                                    ? "text-React-text hover:text-React-text hover:bg-React-bg"
                                    : topic === "Node"
                                    ? "text-Node-text hover:text-Node-text hover:bg-Node-bg"
                                    : topic === "Typescript"
                                    ? "text-Typescript-text hover:text-Typescript-text hover:bg-Typescript-bg"
                                    : ""
                                } md: w-[15px]`}
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
                              className={`flex font-medium cursor-pointer bg-white border pt-1.5 pb-1.5 pl-2.5 pr-2.5 rounded-md ${
                                topic === "Javascript"
                                  ? "text-Javascript-text bg-white hover:bg-Javascript-bg"
                                  : topic === "React"
                                  ? "text-React-text bg-white hover:bg-React-bg"
                                  : topic === "Node"
                                  ? "text-Node-text bg-white hover:bg-Node-bg"
                                  : topic === "Typescript"
                                  ? "text-Typescript-text bg-white hover:bg-Typescript-bg"
                                  : ""
                              }`}
                            >
                              <Code
                                className={`mr-2 w-[19px] ${
                                  topic === "Javascript"
                                    ? "text-Javascript-topic hover:bg-Javascript-bg hover:text-Javascript-text"
                                    : topic === "React"
                                    ? "text-React-text hover:text-React-text hover:bg-React-bg"
                                    : topic === "Node"
                                    ? "text-Node-text hover:text-Node-text hover:bg-Node-bg"
                                    : topic === "Typescript"
                                    ? "text-Typescript-text hover:text-Typescript-text hover:bg-Typescript-bg"
                                    : ""
                                } md: w-[15px]`}
                              />
                              Practice
                            </motion.div>
                          ) : (
                            <div
                              onClick={() =>
                                router.push(`/test/${topic}/${concept.topic}`)
                              }
                              className={`flex font-medium cursor-pointer bg-white border pt-1.5 pb-1.5 pl-2.5 pr-2.5 rounded-md ${
                                topic === "Javascript"
                                  ? "text-Javascript-text bg-white hover:bg-Javascript-bg"
                                  : topic === "React"
                                  ? "text-React-text bg-white hover:bg-React-bg"
                                  : topic === "Node"
                                  ? "text-Node-text bg-white hover:bg-Node-bg"
                                  : topic === "Typescript"
                                  ? "text-Typescript-text bg-white hover:bg-Typescript-bg"
                                  : ""
                              }`}
                            >
                              <Code
                                className={`mr-2 w-[19px] ${
                                  topic === "Javascript"
                                    ? "text-Javascript-topic hover:bg-Javascript-bg hover:text-Javascript-text"
                                    : topic === "React"
                                    ? "text-React-text hover:text-React-text hover:bg-React-bg"
                                    : topic === "Node"
                                    ? "text-Node-text hover:text-Node-text hover:bg-Node-bg"
                                    : topic === "Typescript"
                                    ? "text-Typescript-text hover:text-Typescript-text hover:bg-Typescript-bg"
                                    : ""
                                } md: w-[15px]`}
                              />
                              Practice
                            </div>
                          )}
                        </TableCell>
                        {session?.user?.id && (
                          <TableCell className="text-center">
                            <Checkbox
                              checked={!!learnedConcepts[getConceptKey(topic, concept.topic)]}
                              onCheckedChange={() => handleLearnedToggle(concept)}
                              aria-label="Mark as learned"
                            />
                          </TableCell>
                        )}
                      </TableRow>
                    ))
                  ) : searchQuery.trim() ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                        <SearchIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                        <p className="text-sm font-medium">No topics found</p>
                        <p className="text-xs">Try adjusting your search terms</p>
                      </TableCell>
                    </TableRow>
                  ) : null}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="Advance" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      className={`px-0  ${
                        topic === "Javascript"
                          ? "text-Javascript-text "
                          : topic === "React"
                          ? "text-React-text"
                          : topic === "Typescript"
                          ? "text-Typescript-text"
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
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPrepareData.length > 1 && filteredPrepareData[1]?.concepts?.length > 0 ? (
                    filteredPrepareData[1]?.concepts?.map((concept, index) => (
                    <TableRow key={concept.topic} className="w-full">
                      <TableCell
                        className={`text-left font-medium text-[15px] p-[0px] ${
                          topic === "Javascript"
                            ? "text-Javascript-text "
                            : topic === "React"
                            ? "text-React-text"
                            : topic === "Node"
                            ? "text-Node-text"
                            : topic === "Typescript"
                            ? "text-Typescript-text"
                            : ""
                        } md:pl-4`}
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
                              router.push(`/learn/${topic}/${concept.topic}`)
                            }
                            className={`flex mb-1 font-medium cursor-pointer border pt-1.5 pb-1.5 pl-2.5 pr-2.5 rounded-md 
                              ${
                                topic === "Javascript"
                                  ? " text-Javascript-text bg-white hover:bg-Javascript-bg"
                                  : topic === "React"
                                  ? "text-React-text bg-white hover:bg-React-bg"
                                  : topic === "Node"
                                  ? "text-Node-text bg-white hover:bg-Node-bg"
                                  : topic === "Typescript"
                                  ? "text-Typescript-text bg-white hover:bg-Typescript-bg"
                                  : ""
                              } 
                            md:mb-0 md:mr-[3%] md:ml-auto `}
                          >
                            <BookOpenCheck
                              className={`mr-2 w-[19px] ${
                                topic === "Javascript"
                                  ? " text-Javascript-topic hover:bg-Javascript-bg hover:text-Javascript-text"
                                  : topic === "React"
                                  ? "text-React-text hover:bg-React-bg hover:text-React-text"
                                  : topic === "Node"
                                  ? "text-Node-text hover:bg-Node-bg hover:text-Node-text"
                                  : topic === "Typescript"
                                  ? "text-Typescript-text hover:bg-Typescript-bg hover:text-Typescript-text"
                                  : ""
                              } md: w-[15px]`}
                            />
                            Learn
                          </motion.div>
                        ) : (
                          <div
                            onClick={() =>
                              router.push(`/learn/${topic}/${concept.topic}`)
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
                                  : ""
                              } 
                            md:mb-0 md:mr-[3%] md:ml-auto `}
                          >
                            {" "}
                            <BookOpenCheck
                              className={`mr-2 w-[19px] ${
                                topic === "Javascript"
                                  ? " text-Javascript-topic hover:bg-Javascript-bg hover:text-Javascript-text"
                                  : topic === "React"
                                  ? "text-React-text hover:bg-React-bg hover:text-React-text"
                                  : topic === "Node"
                                  ? "text-Node-text hover:bg-Node-bg hover:text-Node-text"
                                  : topic === "Typescript"
                                  ? "text-Typescript-text hover:bg-Typescript-bg hover:text-Typescript-text"
                                  : ""
                              } md: w-[15px]`}
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
                            className={`flex font-medium cursor-pointer bg-white border pt-1.5 pb-1.5 pl-2.5 pr-2.5 rounded-md ${
                              topic === "Javascript"
                                ? "text-Javascript-text bg-white hover:bg-Javascript-bg"
                                : topic === "React"
                                ? "text-React-text bg-white hover:bg-React-bg "
                                : topic === "Node"
                                ? "text-Node-text bg-white hover:bg-Node-bg "
                                : topic === "Typescript"
                                ? "text-Typescript-text bg-white hover:bg-Typescript-bg "
                                  : ""
                            }`}
                          >
                            <Code
                              className={`mr-2 w-[19px] ${
                                topic === "Javascript"
                                  ? "text-Javascript-topic hover:bg-Javascript-bg hover:text-Javascript-text"
                                  : topic === "React"
                                  ? "text-React-text hover:bg-React-bg hover:text-React-text"
                                  : topic === "Node"
                                  ? "text-Node-text hover:bg-Node-bg hover:text-Node-text"
                                  : topic === "Typescript"
                                  ? "text-Typescript-text hover:bg-Typescript-bg hover:text-Typescript-text"
                                  : ""
                              } md: w-[15px]`}
                            />
                            Practice
                          </motion.div>
                        ) : (
                          <div
                            onClick={() =>
                              router.push(`/test/${topic}/${concept.topic}`)
                            }
                            className={`flex font-medium cursor-pointer bg-white border pt-1.5 pb-1.5 pl-2.5 pr-2.5 rounded-md ${
                              topic === "Javascript"
                                ? "text-Javascript-text bg-white hover:bg-Javascript-bg"
                                : topic === "React"
                                ? "text-React-text bg-white hover:bg-React-bg "
                                : topic === "Typescript"
                                ? "text-Typescript-text bg-white hover:bg-Typescript-bg "
                                : ""
                            }`}
                          >
                            <Code
                              // style={{width: 12px}}
                              className={`mr-2 w-[19px] ${
                                topic === "Javascript"
                                  ? "text-Javascript-topic hover:bg-Javascript-bg hover:text-Javascript-text"
                                  : topic === "React"
                                  ? "text-React-text hover:bg-React-bg hover:text-React-text"
                                  : topic === "Typescript"
                                  ? "text-Typescript-text hover:bg-Typescript-bg hover:text-Typescript-text"
                                  : ""
                              } md: w-[15px]`}
                              // size={"19px"}
                            />
                            Practice
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : searchQuery.trim() ? (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center py-8 text-gray-500">
                      <SearchIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm font-medium">No topics found</p>
                      <p className="text-xs">Try adjusting your search terms</p>
                    </TableCell>
                  </TableRow>
                ) : null}
                </TableBody>
              </Table>
            </TabsContent>
          </TAB>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <TAB
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
                    : ""
                }`}
              >
                Senior
              </TabsTrigger>
            </TabsList>
            <TabsContent value="Junior" className="mt-4">
              <div className="flex flex-col gap-3">
                {interviewQues?.questions
                  ? interviewQues?.questions?.map((item, index) => (
                      <AccordionQuestion 
                        key={index} 
                        question={item} 
                        topic={topic} 
                        index={index}
                      />
                    ))
                  : null}
              </div>
            </TabsContent>
            <TabsContent value="Mid" className="mt-4">
              <div className="flex flex-col gap-3">
                {interviewQues?.questions
                  ? interviewQues?.questions?.map((item, index) => (
                      <AccordionQuestion 
                        key={index} 
                        question={item} 
                        topic={topic} 
                        index={index}
                      />
                    ))
                  : null}
              </div>
            </TabsContent>
            <TabsContent value="Senior" className="mt-4">
              <div className="flex flex-col gap-3">
                {interviewQues?.questions
                  ? interviewQues?.questions?.map((item, index) => (
                      <AccordionQuestion 
                        key={index} 
                        question={item} 
                        topic={topic} 
                        index={index}
                      />
                    ))
                  : null}
              </div>
            </TabsContent>
          </TAB>
        </CustomTabPanel>
      </Box>

      {/* Question Modal */}
      <QuestionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        question={selectedQuestion}
        topic={topic}
      />
    </Box>
  );
}
