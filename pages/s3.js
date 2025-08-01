import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { motion, AnimatePresence } from "framer-motion";
import Box from "@mui/material/Box";
import { ArrowLeft, Hash, X, BookOpen, ChevronDown, ChevronUp, SearchIcon } from "lucide-react";
import { useRouter } from "next/router";
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
import { interviewData } from "@/data/interviewData";
import {
  Tabs as TAB,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { prepareData } from "@/data/prepareData";
import { Typography } from "@mui/material";
import Header from "@/components/header";

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

function AccordionQuestion({ question, topic, index }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-gray-200 rounded-lg mb-4">
      <button
        onClick={toggleAccordion}
        className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-gray-900">
          {index + 1}. {question.question}
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="px-4 pb-4">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <h6 className="font-semibold text-blue-900 mb-2">Answer:</h6>
            <p className="text-blue-800">{question.solution}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function QuestionModal({ isOpen, onClose, question, topic }) {
  if (!isOpen || !question) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Question Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Question:</h3>
            <p className="text-gray-700">{question.question}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Answer:</h3>
            <p className="text-gray-700">{question.solution}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function S3Page() {
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
  
  // Get S3 data
  const topicPrepareData = prepareData.find(item => item.category === "AWS S3");
  const topicInterviewData = interviewData.filter(item => item.topic === "AWS S3");
  
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
    const key = getConceptKey("AWS S3", concept.topic);
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
              topic: "AWS S3",
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
              topic: "AWS S3",
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
    setTopicSelected("AWS S3");
    const topicIndex = prepareData.findIndex((t) => t.category === "AWS S3");
    setIndexValue(topicIndex);
  }, []);

  React.useEffect(() => {
    const filteredTopic = topicInterviewData
      .filter((item) => item.categories === interviewSelection);
    setInterviewQues(filteredTopic[0] || {});
  }, [interviewSelection, topicInterviewData]);

  React.useEffect(() => {
    if (session?.user?.id) {
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
  }, [session?.user?.id]);

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

  const handleBackClick = () => {
    router.push('/components/AWS');
  };

  return (
    <Box className="w-full md:w-7/12 lg:w-6/12 mx-auto">
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBackClick}
              className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to AWS
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-50">
                <Code className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AWS S3</h1>
                <p className="text-sm text-gray-600">Learning Materials & Interview Questions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Box sx={{ width: "auto" }}>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
            sx={{
              marginTop: 2,
              "& .MuiTabs-indicator": {
                backgroundColor: "#3B82F6",
              },
              "& .MuiTab-root": {
                color: "#6B7280",
              },
              "& .MuiTab-root.Mui-selected": {
                color: "#3B82F6",
              },
            }}
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
          <div className="relative rounded-lg border-1 border-blue-200 bg-gray-100 dark:bg-gray-800 w-full">
            <Input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ textTransform: "none", outline: "none" }}
              className="rounded-lg appearance-none text-[14px] w-full pl-10"
            />
            <SearchIcon className="absolute left-2.5 top-2.5 w-5 h-5 text-blue-600" />
          </div>
          <TAB defaultValue="Beginner" value={level} className="w-auto mt-8">
            <TabsList className="grid w-full grid-cols-2 bg-white border">
              <TabsTrigger
                value="Beginner"
                onClick={() => setLevel("Beginner")}
                className="bg-white data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800"
              >
                Beginner Topics
              </TabsTrigger>
              <TabsTrigger
                value="Advance"
                onClick={() => setLevel("Advance")}
                className="bg-white data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800"
              >
                Advance Topics
              </TabsTrigger>
            </TabsList>
            <TabsContent value="Beginner" className="mt-5">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="px-0 text-blue-800 text-left md:text-center">
                      Topic
                    </TableHead>
                    <TableHead className="text-center text-blue-800">
                      Action
                    </TableHead>
                    {session?.user?.id && (
                      <TableHead className="text-center text-blue-800">
                        Learned
                      </TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPrepareData
                    .filter((item) => item.label === "Beginner")
                    .flatMap((item) =>
                      item.concepts?.map((concept, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <Hash className="w-4 h-4 text-blue-600" />
                              {concept.topic}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <button
                              onClick={() => handleQuestionClick(concept)}
                              className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded-md text-sm font-medium transition-colors"
                            >
                              View
                            </button>
                          </TableCell>
                          {session?.user?.id && (
                            <TableCell className="text-center">
                              <Checkbox
                                checked={!!learnedConcepts[getConceptKey("AWS S3", concept.topic)]}
                                onCheckedChange={() => handleLearnedToggle(concept)}
                                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                              />
                            </TableCell>
                          )}
                        </TableRow>
                      ))
                    )}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="Advance" className="mt-5">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="px-0 text-blue-800 text-left md:text-center">
                      Topic
                    </TableHead>
                    <TableHead className="text-center text-blue-800">
                      Action
                    </TableHead>
                    {session?.user?.id && (
                      <TableHead className="text-center text-blue-800">
                        Learned
                      </TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPrepareData
                    .filter((item) => item.label === "Advanced")
                    .flatMap((item) =>
                      item.concepts?.map((concept, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <Hash className="w-4 h-4 text-blue-600" />
                              {concept.topic}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <button
                              onClick={() => handleQuestionClick(concept)}
                              className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded-md text-sm font-medium transition-colors"
                            >
                              View
                            </button>
                          </TableCell>
                          {session?.user?.id && (
                            <TableCell className="text-center">
                              <Checkbox
                                checked={!!learnedConcepts[getConceptKey("AWS S3", concept.topic)]}
                                onCheckedChange={() => handleLearnedToggle(concept)}
                                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                              />
                            </TableCell>
                          )}
                        </TableRow>
                      ))
                    )}
                </TableBody>
              </Table>
            </TabsContent>
          </TAB>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Interview Questions</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setInterviewSelection("Junior")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    interviewSelection === "Junior"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Junior
                </button>
                <button
                  onClick={() => setInterviewSelection("Senior")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    interviewSelection === "Senior"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Senior
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {interviewQues.questions?.map((question, index) => (
                <AccordionQuestion
                  key={index}
                  question={question}
                  topic="AWS S3"
                  index={index}
                />
              ))}
            </div>
            
            {(!interviewQues.questions || interviewQues.questions.length === 0) && (
              <div className="text-center py-8">
                <p className="text-gray-500">No questions available for this level.</p>
              </div>
            )}
          </div>
        </CustomTabPanel>
      </Box>
      
      <QuestionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        question={selectedQuestion}
        topic="AWS S3"
      />
    </Box>
  );
} 