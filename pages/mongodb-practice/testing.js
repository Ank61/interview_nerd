import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BookOpen, User, Settings, Search, Filter, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { mongoQuestions } from "@/data/mongoDatasets";
import { useMongoProgress } from "@/hooks/useMongoProgress";

export default function MongoDBPracticeTesting() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { isQuestionCompleted, loading: progressLoading } = useMongoProgress();

    const [searchQuery, setSearchQuery] = useState("");
    const [difficultyFilter, setDifficultyFilter] = useState("all");
    const [collectionFilter, setCollectionFilter] = useState("all");

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/login");
        }
    }, [status, router]);

    // Combine all questions
    const allQuestions = [...mongoQuestions.beginner, ...mongoQuestions.advanced];

    // Get unique collections
    const collections = [...new Set(allQuestions.map(q => q.collection))];

    // Filter questions
    const filteredQuestions = allQuestions.filter(question => {
        const matchesSearch = question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            question.question.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDifficulty = difficultyFilter === "all" || question.difficulty === difficultyFilter;
        const matchesCollection = collectionFilter === "all" || question.collection === collectionFilter;

        return matchesSearch && matchesDifficulty && matchesCollection;
    });

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case "Easy":
                return "text-green-600 bg-green-50 border-green-200";
            case "Medium":
                return "text-yellow-600 bg-yellow-50 border-yellow-200";
            case "Hard":
                return "text-red-600 bg-red-50 border-red-200";
            default:
                return "text-gray-600 bg-gray-50 border-gray-200";
        }
    };

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 flex items-center justify-center">
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
                <title>MongoDB Testing - Interview Nerd</title>
                <meta name="description" content="Practice MongoDB questions in testing mode" />
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
                                <div className="p-2 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
                                    <BookOpen size={24} className="text-green-600" />
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
                                <button onClick={() => router.push("/mongodb-practice")} className="hover:text-gray-700 transition-colors">
                                    MongoDB Practice
                                </button>
                                <span>/</span>
                                <span className="text-gray-900 font-medium">Testing</span>
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
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">MongoDB Testing Mode</h1>
                    <p className="text-gray-600">Practice any question without restrictions</p>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6 flex flex-col sm:flex-row gap-4"
                >
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                            type="text"
                            placeholder="Search questions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <div className="flex gap-4">
                        <select
                            value={difficultyFilter}
                            onChange={(e) => setDifficultyFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="all">All Difficulties</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                        <select
                            value={collectionFilter}
                            onChange={(e) => setCollectionFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="all">All Collections</option>
                            {collections.map(collection => (
                                <option key={collection} value={collection} className="capitalize">
                                    {collection}
                                </option>
                            ))}
                        </select>
                    </div>
                </motion.div>

                {/* Questions Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card className="border-2 border-gray-200">
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-16">
                                                #
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Title
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-32">
                                                Difficulty
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-48">
                                                Collection
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
                                                    transition={{ delay: index * 0.01 }}
                                                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                                                    onClick={() => router.push(`/mongodb-practice/question/${question.id}`)}
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {question.id}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm">
                                                        <span className="font-medium text-gray-900 hover:text-green-600">
                                                            {question.title}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <Badge className={`text-xs font-medium border ${getDifficultyColor(question.difficulty)}`}>
                                                            {question.difficulty}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">
                                                        {question.collection}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        {isQuestionCompleted(question.id.toString()) ? (
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
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 text-center text-sm text-gray-600"
                >
                    Showing {filteredQuestions.length} of {allQuestions.length} questions
                </motion.div>
            </div>
        </div>
    );
}