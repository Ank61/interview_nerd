// import { useEffect } from "react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import Head from "next/head";
// import {
//     Card,
//     CardContent,
//     CardHeader,
//     CardTitle,
//     CardDescription,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//     Database,
//     GraduationCap,
//     Target,
//     ArrowRight,
//     BookOpen,
//     User,
//     Settings,
//     Sparkles,
//     TrendingUp,
//     Lock,
//     CheckCircle,
//     Trophy,
//     Zap
// } from "lucide-react";
// import { motion } from "framer-motion";

// export default function SQLPracticeMode() {
//     const { data: session, status } = useSession();
//     const router = useRouter();

//     useEffect(() => {
//         if (status === "unauthenticated") {
//             router.push("/auth/login");
//         }
//     }, [status, router]);

//     if (status === "loading") {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
//                     <p className="text-white font-medium">Loading...</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50">
//             <Head>
//                 <title>SQL Practice - Choose Your Mode | Interview Nerd</title>
//                 <meta name="description" content="Choose between Path Learning and Testing modes for SQL practice" />
//             </Head>

//             {/* Header */}
//             <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
//                 <div className="w-full px-4 sm:px-6 lg:px-8">
//                     <div className="flex items-center justify-between h-16">
//                         {/* Left side - Logo and Navigation */}
//                         <div className="flex items-center space-x-8">
//                             <div
//                                 className="flex items-center space-x-3 cursor-pointer"
//                                 onClick={() => router.push("/")}
//                             >
//                                 <div className="p-2 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
//                                     <BookOpen size={24} className="text-blue-600" />
//                                 </div>
//                                 <div>
//                                     <h1 className="hidden lg:block text-xl font-bold text-gray-900">
//                                         Interview Nerd
//                                     </h1>
//                                 </div>
//                             </div>

//                             {/* Breadcrumb */}
//                             <nav className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
//                                 <button
//                                     onClick={() => router.push("/")}
//                                     className="hover:text-gray-700 transition-colors"
//                                 >
//                                     Home
//                                 </button>
//                                 <span>/</span>
//                                 <span className="text-gray-900 font-medium">SQL Practice</span>
//                             </nav>
//                         </div>

//                         {/* Right side - Actions */}
//                         <div className="flex items-center space-x-4">
//                             <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
//                                 <User size={20} className="text-gray-600" />
//                             </button>

//                             <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
//                                 <Settings size={20} className="text-gray-600" />
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </header>

//             {/* Main Content - Matching MCQ Page Theme */}
//             <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 py-16">
//                 <div className="container mx-auto px-4">
//                     <div className="max-w-6xl mx-auto">
//                         {/* Title Section */}
//                         <motion.div
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.6 }}
//                             className="text-center mb-12"
//                         >
//                             <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
//                                 <Trophy className="w-4 h-4" />
//                                 SQL Practice Modes
//                             </div>
//                             <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//                                 Choose Your Practice Mode
//                             </h2>
//                             <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
//                                 Select how you want to practice SQL. Path Learning offers structured progression,
//                                 while Testing Mode lets you practice freely.
//                             </p>
//                         </motion.div>

//                         {/* Mode Cards */}
//                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
//                             {/* Path Learning Card */}
//                             <motion.div
//                                 initial={{ opacity: 0, y: 30 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.6, delay: 0.1 }}
//                                 whileHover={{ scale: 1.02, y: -5 }}
//                                 className="group"
//                             >
//                                 <Card
//                                     className="h-full hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 border-white/20 bg-white overflow-hidden relative"
//                                     onClick={() => router.push("/sql-practice/path-learning")}
//                                 >
//                                     {/* Decorative gradient overlay */}
//                                     <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

//                                     <CardHeader className="pb-6 relative z-10">
//                                         <div className="flex items-center justify-center mb-6">
//                                             <motion.div
//                                                 className="p-6 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-xl"
//                                                 whileHover={{ scale: 1.1, rotate: 5 }}
//                                                 transition={{ type: "spring", stiffness: 300 }}
//                                             >
//                                                 <GraduationCap size={48} className="text-white" />
//                                             </motion.div>
//                                         </div>
//                                         <CardTitle className="text-2xl sm:text-3xl text-center font-bold text-gray-900 mb-2">
//                                             Path Learning
//                                         </CardTitle>
//                                         <CardDescription className="text-center text-base text-gray-600">
//                                             Structured learning with progressive levels
//                                         </CardDescription>
//                                     </CardHeader>
//                                     <CardContent className="space-y-6 relative z-10">
//                                         <p className="text-gray-700 text-center leading-relaxed">
//                                             Master SQL step-by-step through carefully designed levels. Complete each level to unlock the next and track your progress.
//                                         </p>

//                                         <div className="space-y-3 bg-green-50/50 rounded-xl p-4 border border-green-100">
//                                             <div className="flex items-start gap-3">
//                                                 <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
//                                                     <CheckCircle size={14} className="text-white" />
//                                                 </div>
//                                                 <div>
//                                                     <p className="font-semibold text-gray-900 text-sm">Beginner Level</p>
//                                                     <p className="text-xs text-gray-600">Learn basic SELECT, WHERE, and ORDER BY</p>
//                                                 </div>
//                                             </div>
//                                             <div className="flex items-start gap-3">
//                                                 <div className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center mt-0.5">
//                                                     <TrendingUp size={14} className="text-white" />
//                                                 </div>
//                                                 <div>
//                                                     <p className="font-semibold text-gray-900 text-sm">Intermediate Level</p>
//                                                     <p className="text-xs text-gray-600">Master JOINs and GROUP BY operations</p>
//                                                 </div>
//                                             </div>
//                                             <div className="flex items-start gap-3">
//                                                 <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mt-0.5">
//                                                     <Sparkles size={14} className="text-white" />
//                                                 </div>
//                                                 <div>
//                                                     <p className="font-semibold text-gray-900 text-sm">Advanced Level</p>
//                                                     <p className="text-xs text-gray-600">Complex queries and subqueries</p>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <Button
//                                             className="w-full mt-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-5 text-base shadow-lg hover:shadow-xl transition-all duration-300"
//                                             onClick={(e) => {
//                                                 e.stopPropagation();
//                                                 router.push("/sql-practice/path-learning");
//                                             }}
//                                         >
//                                             Start Path Learning
//                                             <ArrowRight className="ml-2 w-5 h-5" />
//                                         </Button>
//                                     </CardContent>
//                                 </Card>
//                             </motion.div>

//                             {/* Testing Mode Card */}
//                             <motion.div
//                                 initial={{ opacity: 0, y: 30 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.6, delay: 0.2 }}
//                                 whileHover={{ scale: 1.02, y: -5 }}
//                                 className="group"
//                             >
//                                 <Card
//                                     className="h-full hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 border-white/20 bg-white overflow-hidden relative"
//                                     onClick={() => router.push("/sql-practice/testing")}
//                                 >
//                                     {/* Decorative gradient overlay */}
//                                     <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-amber-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

//                                     <CardHeader className="pb-6 relative z-10">
//                                         <div className="flex items-center justify-center mb-6">
//                                             <motion.div
//                                                 className="p-6 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 shadow-xl"
//                                                 whileHover={{ scale: 1.1, rotate: -5 }}
//                                                 transition={{ type: "spring", stiffness: 300 }}
//                                             >
//                                                 <Target size={48} className="text-white" />
//                                             </motion.div>
//                                         </div>
//                                         <CardTitle className="text-2xl sm:text-3xl text-center font-bold text-gray-900 mb-2">
//                                             Testing Mode
//                                         </CardTitle>
//                                         <CardDescription className="text-center text-base text-gray-600">
//                                             Free practice with all questions available
//                                         </CardDescription>
//                                     </CardHeader>
//                                     <CardContent className="space-y-6 relative z-10">
//                                         <p className="text-gray-700 text-center leading-relaxed">
//                                             Practice any question at any time. Perfect for testing your skills and preparing for interviews without restrictions.
//                                         </p>

//                                         <div className="space-y-3 bg-orange-50/50 rounded-xl p-4 border border-orange-100">
//                                             <div className="flex items-start gap-3">
//                                                 <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mt-0.5">
//                                                     <Database size={14} className="text-white" />
//                                                 </div>
//                                                 <div>
//                                                     <p className="font-semibold text-gray-900 text-sm">Full Access</p>
//                                                     <p className="text-xs text-gray-600">All questions from beginner to advanced</p>
//                                                 </div>
//                                             </div>
//                                             <div className="flex items-start gap-3">
//                                                 <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center mt-0.5">
//                                                     <Zap size={14} className="text-white" />
//                                                 </div>
//                                                 <div>
//                                                     <p className="font-semibold text-gray-900 text-sm">No Restrictions</p>
//                                                     <p className="text-xs text-gray-600">No level requirements or prerequisites</p>
//                                                 </div>
//                                             </div>
//                                             <div className="flex items-start gap-3">
//                                                 <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
//                                                     <TrendingUp size={14} className="text-white" />
//                                                 </div>
//                                                 <div>
//                                                     <p className="font-semibold text-gray-900 text-sm">Your Pace</p>
//                                                     <p className="text-xs text-gray-600">Practice at your own speed and style</p>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <Button
//                                             className="w-full mt-6 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold py-5 text-base shadow-lg hover:shadow-xl transition-all duration-300"
//                                             onClick={(e) => {
//                                                 e.stopPropagation();
//                                                 router.push("/sql-practice/testing");
//                                             }}
//                                         >
//                                             Start Testing
//                                             <ArrowRight className="ml-2 w-5 h-5" />
//                                         </Button>
//                                     </CardContent>
//                                 </Card>
//                             </motion.div>
//                         </div>

//                         {/* Info Section */}
//                         <motion.div
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.6, delay: 0.3 }}
//                             className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20"
//                         >
//                             <div className="flex items-start gap-4">
//                                 <div className="flex-shrink-0">
//                                     <div className="p-3 bg-white/20 rounded-xl">
//                                         <Sparkles className="w-6 h-6 text-white" />
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <h3 className="text-lg font-semibold text-white mb-2">
//                                         Not sure which mode to choose?
//                                     </h3>
//                                     <p className="text-white/90 leading-relaxed text-sm sm:text-base">
//                                         Start with <strong className="text-green-200">Path Learning</strong> if you're new to SQL and want guided progression.
//                                         Choose <strong className="text-orange-200">Testing Mode</strong> if you want to practice specific topics or prepare for interviews.
//                                     </p>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    mcqQuestions,
    nodeMCQs,
    reactMCQs,
    jsMCQs,
    tsMCQs,
    sqlMCQs,
    oopMCQs,
    mongodbMCQs
} from '@/data/mcqDatasets';
import { Lock, Trophy, CheckCircle, XCircle, ArrowLeft, ArrowRight, Home, RotateCcw, Filter, BookOpen, User, Settings } from 'lucide-react';

const BATCH_SIZE = 20;
const PASS_THRESHOLD = 16;

export default function PracticeMCQ() {
    const router = useRouter();
    const { category } = router.query;

    const [allQuestions, setAllQuestions] = useState([]);
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [currentBatch, setCurrentBatch] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [batchAnswers, setBatchAnswers] = useState({});
    const [progress, setProgress] = useState({});
    const [showBatchComplete, setShowBatchComplete] = useState(false);
    const [view, setView] = useState('batches'); // 'batches' or 'quiz'
    const [difficultyFilter, setDifficultyFilter] = useState('all'); // 'all', 'easy', 'medium', 'hard'
    const [batchPage, setBatchPage] = useState(0); // Add this line
    // Load progress from localStorage
    useEffect(() => {
        if (!category) return;

        const savedProgress = localStorage.getItem(`mcq-progress-${category}-${difficultyFilter}`);
        if (savedProgress) {
            setProgress(JSON.parse(savedProgress));
        }
    }, [category, difficultyFilter]);

    // Load questions
    useEffect(() => {
        if (!category) return;

        const combined = [
            ...mcqQuestions,
            ...nodeMCQs,
            ...reactMCQs,
            ...jsMCQs,
            ...tsMCQs,
            ...sqlMCQs,
            ...oopMCQs,
            ...mongodbMCQs
        ];

        const filtered = combined.filter(
            q => q.category && q.category.toLowerCase() === category.toLowerCase()
        );

        setAllQuestions(filtered);
    }, [category]);

    // Apply difficulty filter
    useEffect(() => {
        if (difficultyFilter === 'all') {
            setFilteredQuestions(allQuestions);
        } else {
            const filtered = allQuestions.filter(q => q.difficulty === difficultyFilter);
            setFilteredQuestions(filtered);
        }
        // Reset progress when filter changes
        setCurrentBatch(0);
        setProgress({});
    }, [difficultyFilter, allQuestions]);

    // Save progress to localStorage
    useEffect(() => {
        if (!category || Object.keys(progress).length === 0) return;
        localStorage.setItem(`mcq-progress-${category}-${difficultyFilter}`, JSON.stringify(progress));
    }, [progress, category, difficultyFilter]);

    const batches = [];
    for (let i = 0; i < filteredQuestions.length; i += BATCH_SIZE) {
        batches.push(filteredQuestions.slice(i, i + BATCH_SIZE));
    }

    const currentBatchQuestions = batches[currentBatch] || [];
    const currentQuestion = currentBatchQuestions[currentQuestionIndex];
    const totalBatches = batches.length;

    const isBatchUnlocked = (batchIndex) => {
        if (batchIndex === 0) return true;
        const prevBatchProgress = progress[batchIndex - 1];
        return prevBatchProgress && prevBatchProgress.score >= PASS_THRESHOLD;
    };

    const getBatchScore = (batchIndex) => {
        return progress[batchIndex]?.score || 0;
    };

    const getBatchStatus = (batchIndex) => {
        const batchProg = progress[batchIndex];
        if (!batchProg) return 'not-started';
        if (batchProg.completed) {
            return batchProg.score >= PASS_THRESHOLD ? 'passed' : 'failed';
        }
        return 'in-progress';
    };

    const startBatch = (batchIndex) => {
        if (!isBatchUnlocked(batchIndex)) return;
        setCurrentBatch(batchIndex);
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setShowAnswer(false);
        setBatchAnswers({});
        setShowBatchComplete(false);
        setView('quiz');
    };

    const handleOptionSelect = (optionIndex) => {
        if (showAnswer) return;
        setSelectedOption(optionIndex);
        setShowAnswer(true);

        const isCorrect = optionIndex === currentQuestion.correctAnswer;
        setBatchAnswers(prev => ({
            ...prev,
            [currentQuestionIndex]: {
                selected: optionIndex,
                correct: isCorrect
            }
        }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < currentBatchQuestions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedOption(null);
            setShowAnswer(false);
        } else {
            completeBatch();
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
            const prevAnswer = batchAnswers[currentQuestionIndex - 1];
            if (prevAnswer) {
                setSelectedOption(prevAnswer.selected);
                setShowAnswer(true);
            } else {
                setSelectedOption(null);
                setShowAnswer(false);
            }
        }
    };

    const completeBatch = () => {
        const score = Object.values(batchAnswers).filter(a => a.correct).length;
        const newProgress = {
            ...progress,
            [currentBatch]: {
                score,
                total: currentBatchQuestions.length,
                completed: true,
                timestamp: new Date().toISOString()
            }
        };
        setProgress(newProgress);
        setShowBatchComplete(true);
    };

    const retryBatch = () => {
        setBatchAnswers({});
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setShowAnswer(false);
        setShowBatchComplete(false);
    };

    const goToBatches = () => {
        setView('batches');
        setShowBatchComplete(false);
    };

    const batchScore = Object.values(batchAnswers).filter(a => a.correct).length;
    const questionProgress = ((currentQuestionIndex + 1) / currentBatchQuestions.length) * 100;

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'easy': return 'text-green-600 bg-green-100 border-green-300';
            case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-300';
            case 'hard': return 'text-red-600 bg-red-100 border-red-300';
            default: return 'text-gray-600 bg-gray-100 border-gray-300';
        }
    };

    const getDifficultyStats = () => {
        const easy = allQuestions.filter(q => q.difficulty === 'easy').length;
        const medium = allQuestions.filter(q => q.difficulty === 'medium').length;
        const hard = allQuestions.filter(q => q.difficulty === 'hard').length;
        return { easy, medium, hard, total: allQuestions.length };
    };

    const stats = getDifficultyStats();

    // Batch Selection View
    if (view === 'batches') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">

                <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
                    <div className="w-full px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            {/* Left side - Logo and Navigation */}
                            <div className="flex items-center space-x-8">
                                <div
                                    className="flex items-center space-x-3 cursor-pointer"
                                    onClick={() => router.push("/")}
                                >
                                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                                        <BookOpen size={24} className="text-blue-600" />
                                    </div>
                                    <div>
                                        <h1 className="hidden lg:block text-xl font-bold text-gray-900">
                                            Interview Nerd
                                        </h1>
                                    </div>
                                </div>

                                {/* Breadcrumb */}
                                <nav className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                                    <button
                                        onClick={() => router.push("/")}
                                        className="hover:text-gray-700 transition-colors"
                                    >
                                        Home
                                    </button>
                                    <span>/</span>
                                    <span className="text-gray-900 font-medium">
                                        {category?.charAt(0).toUpperCase() + category?.slice(1)} MCQ Practice
                                    </span>
                                </nav>
                            </div>

                            {/* Right side - Actions */}
                            <div className="flex items-center space-x-4">
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
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 sm:mb-8"
                    >
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                            {category?.charAt(0).toUpperCase() + category?.slice(1)} <span className="text-blue-600">MCQ Practice</span>
                        </h1>
                        <p className="text-sm sm:text-base text-gray-600 mb-4">
                            Complete batches of 20 questions. Score 16+ to unlock the next batch!
                        </p>

                        {/* Difficulty Filter */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-wrap gap-2"
                        >
                            <button
                                onClick={() => setDifficultyFilter('all')}
                                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm font-medium transition-all duration-200 ${difficultyFilter === 'all'
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                                    : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300'
                                    }`}
                            >
                                <Filter className="w-3.5 h-3.5 inline mr-1.5" />
                                All ({stats.total})
                            </button>
                            <button
                                onClick={() => setDifficultyFilter('easy')}
                                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm font-medium transition-all duration-200 ${difficultyFilter === 'easy'
                                    ? 'bg-green-100 text-green-800 shadow-md'
                                    : 'bg-white text-green-600 border border-green-200 hover:border-green-400'
                                    }`}
                            >
                                Easy ({stats.easy})
                            </button>
                            <button
                                onClick={() => setDifficultyFilter('medium')}
                                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm font-medium transition-all duration-200 ${difficultyFilter === 'medium'
                                    ? 'bg-yellow-100 text-yellow-800 shadow-md'
                                    : 'bg-white text-yellow-600 border border-yellow-200 hover:border-yellow-400'
                                    }`}
                            >
                                Medium ({stats.medium})
                            </button>
                            <button
                                onClick={() => setDifficultyFilter('hard')}
                                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm font-medium transition-all duration-200 ${difficultyFilter === 'hard'
                                    ? 'bg-red-100 text-red-800 shadow-md'
                                    : 'bg-white text-red-600 border border-red-200 hover:border-red-400'
                                    }`}
                            >
                                Hard ({stats.hard})
                            </button>
                        </motion.div>
                    </motion.div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={difficultyFilter}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {batches.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 text-lg">No questions available for this difficulty level.</p>
                                </div>
                            ) : (
                                <>
                                    {/* Batches Grid with Pagination */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
                                        {batches
                                            .slice(batchPage * 6, batchPage * 6 + 6)
                                            .map((batch, displayIndex) => {
                                                const index = batchPage * 6 + displayIndex;
                                                const unlocked = isBatchUnlocked(index);
                                                const status = getBatchStatus(index);
                                                const score = getBatchScore(index);

                                                return (
                                                    <motion.div
                                                        key={index}
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: displayIndex * 0.05 }}
                                                        className="relative"
                                                    >
                                                        <div
                                                            className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${unlocked
                                                                ? 'border-gray-200 bg-white hover:shadow-xl hover:border-blue-300 cursor-pointer'
                                                                : 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                                                                }`}
                                                            onClick={() => unlocked && startBatch(index)}
                                                        >
                                                            {/* Status Badge */}
                                                            <div className="absolute top-4 right-4 z-10">
                                                                {status === 'passed' && (
                                                                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                                                        <CheckCircle className="w-3 h-3" />
                                                                        Passed
                                                                    </div>
                                                                )}
                                                                {status === 'failed' && (
                                                                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                                                        <XCircle className="w-3 h-3" />
                                                                        Failed
                                                                    </div>
                                                                )}
                                                                {!unlocked && (
                                                                    <div className="bg-gray-400 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                                                        <Lock className="w-3 h-3" />
                                                                        Locked
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <div className="p-4 sm:p-8">
                                                                {/* Batch Number */}
                                                                <div className="flex items-center justify-between mb-4">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className={`w-6 h-6 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-lg sm:text-2xl font-semibold ${unlocked ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' : 'bg-gray-300 text-gray-500'
                                                                            }`}>
                                                                            {index + 1}
                                                                        </div>
                                                                        <div>
                                                                            <h3 className="sm:text-xl font-semibold text-gray-900">
                                                                                Batch {index + 1}
                                                                            </h3>
                                                                            <p className="text-sm text-gray-500">
                                                                                {batch.length} Questions
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/* Score Display */}
                                                                {status !== 'not-started' && (
                                                                    <div className="mb-4">
                                                                        <div className="flex items-center justify-between mb-2">
                                                                            <span className="text-sm font-medium text-gray-600">Score</span>
                                                                            <span className={`text-lg font-bold ${score >= PASS_THRESHOLD ? 'text-green-600' : 'text-red-600'
                                                                                }`}>
                                                                                {score}/{batch.length}
                                                                            </span>
                                                                        </div>
                                                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                                                            <div
                                                                                className={`h-2 rounded-full transition-all duration-500 ${score >= PASS_THRESHOLD ? 'bg-green-500' : 'bg-red-500'
                                                                                    }`}
                                                                                style={{ width: `${(score / batch.length) * 100}%` }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {/* Action Button */}
                                                                <button
                                                                    className={`w-1/2 py-2 mx-auto block rounded-xl text-sm font-semibold transition-all duration-200 ${unlocked
                                                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                                                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                                        }`}
                                                                    disabled={!unlocked}
                                                                >
                                                                    {status === 'not-started' ? 'Start' : status === 'passed' ? 'Retry' : 'Try Again'}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
                                    </div>

                                    {/* Pagination Controls */}
                                    {batches.length > 6 && (
                                        <div className="flex items-center justify-center gap-2 mb-8">
                                            <button
                                                onClick={() => setBatchPage(prev => Math.max(0, prev - 1))}
                                                disabled={batchPage === 0}
                                                className={`p-2 rounded-lg transition-all ${batchPage === 0
                                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                                    }`}
                                            >
                                                <ArrowLeft className="w-5 h-5" />
                                            </button>

                                            {Array.from({ length: Math.ceil(batches.length / 6) }).map((_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setBatchPage(i)}
                                                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${batchPage === i
                                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                                                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {i + 1}
                                                </button>
                                            ))}

                                            <button
                                                onClick={() => setBatchPage(prev => Math.min(Math.ceil(batches.length / 6) - 1, prev + 1))}
                                                disabled={batchPage === Math.ceil(batches.length / 6) - 1}
                                                className={`p-2 rounded-lg transition-all ${batchPage === Math.ceil(batches.length / 6) - 1
                                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                                    }`}
                                            >
                                                <ArrowRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Overall Progress Bar at Bottom */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 bg-white rounded-2xl border-2 border-gray-200 p-6 sm:p-8"
                    >
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Overall Progress</h2>

                        {/* Stats Grid */}
                        {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-6">
                            <div className="text-center">
                                <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">
                                    {Object.keys(progress).filter(k => progress[k].completed).length}
                                </div>
                                <div className="text-sm text-gray-600">Completed</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">
                                    {Object.keys(progress).filter(k => progress[k].score >= PASS_THRESHOLD).length}
                                </div>
                                <div className="text-sm text-gray-600">Passed</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">
                                    {Object.values(progress).reduce((sum, p) => sum + p.score, 0)}
                                </div>
                                <div className="text-sm text-gray-600">Total Score</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl sm:text-4xl font-bold text-orange-600 mb-2">
                                    {totalBatches}
                                </div>
                                <div className="text-sm text-gray-600">Total Batches</div>
                            </div>
                        </div> */}

                        {/* Full Height Progress Bar */}
                        <div className="relative">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-medium text-gray-700">Completion Progress</span>
                                <span className="text-sm font-bold text-blue-600">
                                    {totalBatches > 0 ? Math.round((Object.keys(progress).filter(k => progress[k].completed).length / totalBatches) * 100) : 0}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden shadow-inner">
                                <div
                                    className="h-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-3"
                                    style={{
                                        width: `${totalBatches > 0 ? (Object.keys(progress).filter(k => progress[k].completed).length / totalBatches) * 100 : 0}%`
                                    }}
                                >
                                    {Object.keys(progress).filter(k => progress[k].completed).length > 0 && (
                                        <span className="text-white text-xs font-bold">
                                            {Object.keys(progress).filter(k => progress[k].completed).length}/{totalBatches}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>


                    {/* <AnimatePresence mode="wait">
                        <motion.div
                            key={difficultyFilter}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                        >
                            {batches.length === 0 ? (
                                <div className="col-span-full text-center py-12">
                                    <p className="text-gray-500 text-lg">No questions available for this difficulty level.</p>
                                </div>
                            ) : (
                                batches.map((batch, index) => {
                                    const unlocked = isBatchUnlocked(index);
                                    const status = getBatchStatus(index);
                                    const score = getBatchScore(index);

                                    return (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="relative"
                                        >
                                            <div
                                                className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${unlocked
                                                    ? 'border-gray-200 bg-white hover:shadow-xl hover:border-blue-300 cursor-pointer'
                                                    : 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                                                    }`}
                                                onClick={() => unlocked && startBatch(index)}
                                            >
                                                <div className="absolute top-4 right-4 z-10">
                                                    {status === 'passed' && (
                                                        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                                            <CheckCircle className="w-3 h-3" />
                                                            Passed
                                                        </div>
                                                    )}
                                                    {status === 'failed' && (
                                                        <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                                            <XCircle className="w-3 h-3" />
                                                            Failed
                                                        </div>
                                                    )}
                                                    {!unlocked && (
                                                        <div className="bg-gray-400 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                                            <Lock className="w-3 h-3" />
                                                            Locked
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="p-4 sm:p-8">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-6 h-6 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-lg sm:text-2xl font-semibold ${unlocked ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' : 'bg-gray-300 text-gray-500'
                                                                }`}>
                                                                {index + 1}
                                                            </div>
                                                            <div>
                                                                <h3 className="sm:text-xl font-semibold text-gray-900">
                                                                    Batch {index + 1}
                                                                </h3>
                                                                <p className="text-sm text-gray-500">
                                                                    {batch.length} Questions
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {status !== 'not-started' && (
                                                        <div className="mb-4">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <span className="text-sm font-medium text-gray-600">Score</span>
                                                                <span className={`text-lg font-bold ${score >= PASS_THRESHOLD ? 'text-green-600' : 'text-red-600'
                                                                    }`}>
                                                                    {score}/{batch.length}
                                                                </span>
                                                            </div>
                                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                                <div
                                                                    className={`h-2 rounded-full transition-all duration-500 ${score >= PASS_THRESHOLD ? 'bg-green-500' : 'bg-red-500'
                                                                        }`}
                                                                    style={{ width: `${(score / batch.length) * 100}%` }}
                                                                />
                                                            </div>
                                                        </div>
                                                    )}

                                                    <button
                                                        className={`w-1/2 py-2 mx-auto block rounded-xl font-semibold transition-all duration-200 ${unlocked
                                                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                            }`}
                                                        disabled={!unlocked}
                                                    >
                                                        {status === 'not-started' ? 'Start Batch' : status === 'passed' ? 'Retry' : 'Try Again'}
                                                    </button>

                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })
                            )}
                        </motion.div>
                    </AnimatePresence> */}

                    {/* <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 sm:mt-12 bg-white rounded-2xl border-2 border-gray-200 p-6 sm:p-8"
                    >
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Your Progress</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                            <div className="text-center">
                                <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">
                                    {Object.keys(progress).filter(k => progress[k].completed).length}
                                </div>
                                <div className="text-sm text-gray-600">Completed</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">
                                    {Object.keys(progress).filter(k => progress[k].score >= PASS_THRESHOLD).length}
                                </div>
                                <div className="text-sm text-gray-600">Passed</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">
                                    {Object.values(progress).reduce((sum, p) => sum + p.score, 0)}
                                </div>
                                <div className="text-sm text-gray-600">Total Score</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl sm:text-4xl font-bold text-orange-600 mb-2">
                                    {totalBatches}
                                </div>
                                <div className="text-sm text-gray-600">Total Batches</div>
                            </div>
                        </div>
                    </motion.div> */}
                </div >
            </div >
        );
    }

    if (!currentQuestion) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                    </div>
                    <p className="text-gray-600">Loading questions...</p>
                </div>
            </div>
        );
    }

    // Batch Complete Modal
    if (showBatchComplete) {
        const finalScore = Object.values(batchAnswers).filter(a => a.correct).length;
        const passed = finalScore >= PASS_THRESHOLD;

        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="max-w-md w-full"
                >
                    <div className="bg-white rounded-3xl shadow-2xl p-8 text-center border-2 border-gray-100">
                        {/* Icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${passed ? 'bg-green-100' : 'bg-red-100'
                                }`}
                        >
                            {passed ? (
                                <Trophy className="w-12 h-12 text-green-600" />
                            ) : (
                                <XCircle className="w-12 h-12 text-red-600" />
                            )}
                        </motion.div>

                        {/* Title */}
                        <h2 className={`text-3xl font-bold mb-3 ${passed ? 'text-green-600' : 'text-red-600'}`}>
                            {passed ? 'Congratulations!' : 'Keep Trying!'}
                        </h2>
                        <p className="text-gray-600 mb-6">
                            {passed
                                ? 'You passed this batch! The next batch is now unlocked.'
                                : 'You need 16+ correct answers to unlock the next batch.'}
                        </p>

                        {/* Score */}
                        <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                            <div className="text-5xl font-bold text-gray-900 mb-2">
                                {finalScore}/{currentBatchQuestions.length}
                            </div>
                            <div className="text-sm text-gray-600">Your Score</div>
                            <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
                                <div
                                    className={`h-3 rounded-full transition-all duration-1000 ${passed ? 'bg-green-500' : 'bg-red-500'
                                        }`}
                                    style={{ width: `${(finalScore / currentBatchQuestions.length) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3">
                            <button
                                onClick={goToBatches}
                                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                View All Batches
                            </button>
                            <button
                                onClick={retryBatch}
                                className="w-full py-4 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200"
                            >
                                <RotateCcw className="w-4 h-4 inline mr-2" />
                                Retry This Batch
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    // Question View
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
            {/* Header with Progress */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-between mb-3">
                        <button
                            onClick={goToBatches}
                            className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            <span className="hidden sm:inline">Batches</span>
                        </button>
                        <div className="text-center">
                            <div className="text-xs sm:text-sm font-medium text-gray-600">
                                Batch {currentBatch + 1} • Question {currentQuestionIndex + 1}/{currentBatchQuestions.length}
                            </div>
                            <div className="flex items-center justify-center gap-2 mt-1">
                                <span className="text-xs text-gray-500">
                                    Score: {batchScore}/{Object.keys(batchAnswers).length}
                                </span>
                                {currentQuestion.difficulty && (
                                    <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${getDifficultyColor(currentQuestion.difficulty)}`}>
                                        {currentQuestion.difficulty}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="w-16 sm:w-20" /> {/* Spacer */}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${questionProgress}%` }}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                        />
                    </div>
                </div>
            </div>

            {/* Question Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestionIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border-2 border-gray-100 overflow-hidden"
                    >
                        <div className="p-6 sm:p-8 lg:p-10">
                            {/* Question */}
                            <div className="mb-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                                        Question {currentQuestionIndex + 1}
                                    </div>
                                    {currentQuestion.difficulty && (
                                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(currentQuestion.difficulty)}`}>
                                            {currentQuestion.difficulty.toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-relaxed">
                                    {currentQuestion.question}
                                </h2>
                            </div>

                            {/* Options */}
                            <div className="space-y-3 sm:space-y-4 mb-8">
                                {currentQuestion.options.map((option, index) => {
                                    const isCorrect = index === currentQuestion.correctAnswer;
                                    const isSelected = index === selectedOption;

                                    let optionClass = "w-full text-left p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border-2 transition-all duration-200 font-medium text-sm sm:text-base";

                                    if (showAnswer) {
                                        if (isCorrect) {
                                            optionClass += " bg-green-50 border-green-500 text-green-900 shadow-lg";
                                        } else if (isSelected && !isCorrect) {
                                            optionClass += " bg-red-50 border-red-500 text-red-900 shadow-lg";
                                        } else {
                                            optionClass += " bg-gray-50 border-gray-200 text-gray-600";
                                        }
                                    } else {
                                        optionClass += " bg-white border-gray-300 text-gray-800 hover:border-blue-400 hover:bg-blue-50 hover:shadow-md active:scale-[0.98] cursor-pointer";
                                    }

                                    return (
                                        <motion.button
                                            key={index}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className={optionClass}
                                            onClick={() => handleOptionSelect(index)}
                                            disabled={showAnswer}
                                            whileHover={!showAnswer ? { scale: 1.02 } : {}}
                                            whileTap={!showAnswer ? { scale: 0.98 } : {}}
                                        >
                                            <div className="flex items-center gap-3 sm:gap-4">
                                                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 font-bold text-sm sm:text-base ${showAnswer && isCorrect ? 'border-green-600 bg-green-100' :
                                                    showAnswer && isSelected && !isCorrect ? 'border-red-600 bg-red-100' :
                                                        'border-current'
                                                    }`}>
                                                    {String.fromCharCode(65 + index)}
                                                </div>
                                                <span className="flex-1 text-left">{option}</span>
                                                {showAnswer && isCorrect && (
                                                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0" />
                                                )}
                                                {showAnswer && isSelected && !isCorrect && (
                                                    <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 flex-shrink-0" />
                                                )}
                                            </div>
                                        </motion.button>
                                    );
                                })}
                            </div>

                            {/* Explanation */}
                            <AnimatePresence>
                                {showAnswer && currentQuestion.explanation && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mb-8 overflow-hidden"
                                    >
                                        <div className="p-5 sm:p-6 bg-blue-50 rounded-xl sm:rounded-2xl border-2 border-blue-100">
                                            <div className="flex items-start gap-3 sm:gap-4">
                                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-blue-900 mb-2 text-sm sm:text-base">Explanation</h3>
                                                    <p className="text-blue-800 leading-relaxed text-sm sm:text-base">
                                                        {currentQuestion.explanation}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Navigation */}
                            <div className="flex items-center justify-between gap-4">
                                <button
                                    onClick={handlePrevious}
                                    disabled={currentQuestionIndex === 0}
                                    className="flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 text-sm sm:text-base"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    <span className="hidden sm:inline">Previous</span>
                                </button>

                                <div className="text-center px-2">
                                    <div className="text-xs text-gray-500 mb-1">Current Score</div>
                                    <div className="text-xl sm:text-2xl font-bold text-gray-900">
                                        {batchScore}<span className="text-gray-400">/{Object.keys(batchAnswers).length}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleNext}
                                    disabled={!showAnswer}
                                    className="flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
                                >
                                    <span className="hidden sm:inline">
                                        {currentQuestionIndex < currentBatchQuestions.length - 1 ? 'Next' : 'Finish'}
                                    </span>
                                    <span className="sm:hidden">
                                        {currentQuestionIndex < currentBatchQuestions.length - 1 ? 'Next' : 'Finish'}
                                    </span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}