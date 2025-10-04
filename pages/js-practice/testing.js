import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BookOpen, User, Settings, Search, Filter, CheckCircle, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import { playgroundQuestions } from "@/data/playgroundQuestions";
import { useJSProgress } from "@/hooks/useJSProgress";

export default function JSPracticeTesting() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { isQuestionCompleted, loading: progressLoading } = useJSProgress();

    const [searchQuery, setSearchQuery] = useState("");
    const [difficultyFilter, setDifficultyFilter] = useState("all");
    const [topicFilter, setTopicFilter] = useState("all");

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/login");
        }
    }, [status, router]);

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case "easy":
                return "text-green-600 bg-green-50 border-green-200";
            case "medium":
                return "text-yellow-600 bg-yellow-50 border-yellow-200";
            case "hard":
                return "text-red-600 bg-red-50 border-red-200";
            default:
                return "text-gray-600 bg-gray-50 border-gray-200";
        }
    };

    // Combine all questions
    const allQuestions = [
        ...(playgroundQuestions.beginner || []),
        ...(playgroundQuestions.advanced || [])
    ];

    // Get unique topics from tags
    const topics = ["all", ...new Set(allQuestions.flatMap(q => q.tags || []))];

    // Filter questions
    const filteredQuestions = allQuestions.filter(question => {
        const matchesSearch = question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            question.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDifficulty = difficultyFilter === "all" || question.difficulty === difficultyFilter;
        const matchesTopic = topicFilter === "all" || (question.tags && question.tags.includes(topicFilter));
        return matchesSearch && matchesDifficulty && matchesTopic;
    });

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p className="text-white font-medium">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>JavaScript Practice - Questions | Interview Nerd</title>
                <meta name="description" content="Practice JavaScript coding challenges" />
            </Head>

            {/* Header */}
            <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-8">
                            <div
                                className="flex items-center space-x-3 cursor-pointer"
                                onClick={() => router.push("/")}
                            >
                                <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-100">
                                    <Code2 size={24} className="text-yellow-600" />
                                </div>
                                <div>
                                    <h1 className="hidden lg:block text-xl font-bold text-gray-900">
                                        Interview Nerd
                                    </h1>
                                </div>
                            </div>

                            <nav className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                                <button onClick={() => router.push("/")} className="hover:text-gray-700 transition-colors">
                                    Home
                                </button>
                                <span>/</span>
                                <button onClick={() => router.push("/playground")} className="hover:text-gray-700 transition-colors">
                                    JavaScript Practice
                                </button>
                                <span>/</span>
                                <span className="text-gray-900 font-medium">Questions</span>
                            </nav>
                        </div>

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

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                >
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">JavaScript Questions</h1>

                    {/* Search and Filters */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                type="text"
                                placeholder="Search questions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 w-full"
                            />
                        </div>

                        {/* Difficulty Filter */}
                        <div className="flex items-center gap-2">
                            <Filter className="text-gray-400 w-5 h-5" />
                            <select
                                value={difficultyFilter}
                                onChange={(e) => setDifficultyFilter(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white"
                            >
                                <option value="all">All Difficulties</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>

                        {/* Topic Filter */}
                        <select
                            value={topicFilter}
                            onChange={(e) => setTopicFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white"
                        >
                            {topics.map(topic => (
                                <option key={topic} value={topic}>
                                    {topic === "all" ? "All Topics" : topic}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Results count */}
                    <p className="text-sm text-gray-600">
                        Showing {filteredQuestions.length} of {allQuestions.length} questions
                    </p>
                </motion.div>

                {/* Questions Table */}
                <Card className="border-2 border-gray-200">
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-16">
                                            ID
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Title
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-32">
                                            Difficulty
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-48">
                                            Topics
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-32">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredQuestions.length > 0 ? (
                                        filteredQuestions.map((question, index) => (
                                            <motion.tr
                                                key={question.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: index * 0.02 }}
                                                className="hover:bg-gray-50 cursor-pointer transition-colors"
                                                onClick={() => router.push(`/js-practice/question/${question.id}`)}
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {question.id}
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    <span className="font-medium text-gray-900 hover:text-yellow-600">
                                                        {question.title}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <Badge className={`text-xs font-medium border ${getDifficultyColor(question.difficulty)}`}>
                                                        {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    <div className="flex flex-wrap gap-1">
                                                        {question.tags && question.tags.slice(0, 2).map((tag, idx) => (
                                                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                        {/* {question.tags && question.tags.length > 2 && (
                                                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                                                +{question.tags.length - 2}
                                                            </span>
                                                        )} */}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    {isQuestionCompleted(question.id) ? (
                                                        <span className="flex items-center gap-1 text-green-600">
                                                            <CheckCircle className="w-4 h-4" />
                                                            Completed
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-400">Not Started</span>
                                                    )}
                                                </td>
                                            </motion.tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                                No questions found matching your filters
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}