import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { motion, AnimatePresence } from "framer-motion";
import Box from "@mui/material/Box";
import { ArrowLeft, Hash, BookOpen, ChevronDown, ChevronUp, SearchIcon, Star, Clock, Target, Zap, BookOpenCheck, CheckCircle } from "lucide-react";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
    >
      <button
        onClick={toggleAccordion}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200"
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {index + 1}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-left leading-relaxed">
              {question.question}
            </h3>
            <div className="flex items-center gap-3 mt-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                <Target className="w-3 h-3 mr-1" />
                {topic}
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Clock className="w-3 h-3 mr-1" />
                Interview Q
              </Badge>
            </div>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-blue-900">Answer</h4>
                </div>
                <p className="text-blue-800 leading-relaxed">{question.solution}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}



function TopicCard({ concept, isLearned, onToggleLearned, topicName }) {
  const router = useRouter();
  
  const handleViewDetails = () => {
    // Navigate to the learn page with the format /learn/[category]/[topic]
    router.push(`/learn/${topicName}/${concept.topic}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">{concept.topic}</h3>
            <p className="text-sm text-gray-600">{topicName}</p>
          </div>
        </div>
        {isLearned && (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Learned
          </Badge>
        )}
      </div>
      
      <div className="flex items-center justify-between">
        <Button
          onClick={handleViewDetails}
          variant="outline"
          className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
        >
          <BookOpenCheck className="w-4 h-4 mr-2" />
          View Details
        </Button>
        
        {onToggleLearned && (
          <div className="flex items-center gap-2">
            <Checkbox
              checked={isLearned}
              onCheckedChange={onToggleLearned}
              className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
            />
            <span className="text-sm text-gray-600">Mark as learned</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function S3Page() {
  const router = useRouter();
  const [interviewQues, setInterviewQues] = React.useState([]);
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

  // Calculate progress
  const calculateProgress = (level) => {
    const levelData = filteredPrepareData.find(item => item.label === level);
    if (!levelData?.concepts?.length) return 0;
    
    const learnedCount = levelData.concepts.filter(concept => 
      learnedConcepts[getConceptKey("AWS S3", concept.topic)]
    ).length;
    
    return (learnedCount / levelData.concepts.length) * 100;
  };

  const handleBackClick = () => {
    router.push('/components/AWS');
  };

  return (
    <Box className="w-full md:w-7/12 lg:w-6/12 mx-auto">
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBackClick}
              className="text-gray-900 flex items-center gap-2 p-2 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-gray-900" />
              Back
            </button>
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AWS S3 (Simple Storage Service)</h1>
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
                height: 3,
                borderRadius: 2,
              },
              "& .MuiTab-root": {
                color: "#6B7280",
                fontWeight: 600,
                textTransform: "none",
                fontSize: 16,
                minHeight: 60,
              },
              "& .MuiTab-root.Mui-selected": {
                color: "#3B82F6",
              },
            }}
          >
            <Tab
              label={
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Prepare
                </div>
              }
              {...a11yProps(0)}
            />
            <Tab
              label={
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Interview Questions
                </div>
              }
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
        
        <CustomTabPanel value={value} index={0}>
          <div className="space-y-6">
            {/* Search Section */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Search topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 text-base border-2 border-gray-200 focus:border-blue-500 rounded-xl shadow-sm"
              />
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* Progress Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="w-5 h-5 text-blue-600" />
                    Beginner Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={calculateProgress("Beginner")} className="h-3" />
                  <p className="text-sm text-gray-600 mt-2">
                    {Math.round(calculateProgress("Beginner"))}% completed
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Star className="w-5 h-5 text-purple-600" />
                    Advanced Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={calculateProgress("Advanced")} className="h-3" />
                  <p className="text-sm text-gray-600 mt-2">
                    {Math.round(calculateProgress("Advanced"))}% completed
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Topics Tabs */}
            <TAB defaultValue="Beginner" value={level} className="w-auto">
              <TabsList className="grid w-full grid-cols-2 bg-white border-2 border-gray-200 rounded-xl p-1">
                <TabsTrigger
                  value="Beginner"
                  onClick={() => setLevel("Beginner")}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-lg transition-all duration-200"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Beginner Topics
                </TabsTrigger>
                <TabsTrigger
                  value="Advance"
                  onClick={() => setLevel("Advance")}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white rounded-lg transition-all duration-200"
                >
                  <Star className="w-4 h-4 mr-2" />
                  Advanced Topics
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="Beginner" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPrepareData
                    .filter((item) => item.label === "Beginner")
                    .flatMap((item) =>
                      item.concepts?.map((concept, index) => (
                        <TopicCard
                          key={index}
                          concept={concept}
                          isLearned={!!learnedConcepts[getConceptKey("AWS S3", concept.topic)]}
                          onToggleLearned={() => handleLearnedToggle(concept)}
                          topicName="AWS S3"
                        />
                      ))
                    )}
                </div>
              </TabsContent>
              
              <TabsContent value="Advance" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPrepareData
                    .filter((item) => item.label === "Advanced")
                    .flatMap((item) =>
                      item.concepts?.map((concept, index) => (
                        <TopicCard
                          key={index}
                          concept={concept}
                          isLearned={!!learnedConcepts[getConceptKey("AWS S3", concept.topic)]}
                          onToggleLearned={() => handleLearnedToggle(concept)}
                          topicName="AWS S3"
                        />
                      ))
                    )}
                </div>
              </TabsContent>
            </TAB>
          </div>
        </CustomTabPanel>
        
        <CustomTabPanel value={value} index={1}>
          <div className="space-y-6">
            {/* Interview Questions Header */}
            <Card className="border-2 border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-3">
                  <Target className="w-6 h-6 text-blue-600" />
                  Interview Questions
                </CardTitle>
                <CardDescription>
                  Practice with real-world interview questions for AWS S3
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setInterviewSelection("Junior")}
                    variant={interviewSelection === "Junior" ? "default" : "outline"}
                    className={interviewSelection === "Junior" 
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700" 
                      : ""
                    }
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Junior Level
                  </Button>
                  <Button
                    onClick={() => setInterviewSelection("Senior")}
                    variant={interviewSelection === "Senior" ? "default" : "outline"}
                    className={interviewSelection === "Senior" 
                      ? "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700" 
                      : ""
                    }
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Senior Level
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Questions List */}
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
              <Card className="text-center py-12">
                <CardContent>
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-4 bg-gray-100 rounded-full">
                      <Target className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Questions Available</h3>
                      <p className="text-gray-500">Questions for this level will be added soon.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CustomTabPanel>
      </Box>
      
    </Box>
  );
} 