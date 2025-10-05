import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, User, Settings, CheckCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { playgroundQuestions } from "@/data/playgroundQuestions";
import { useJSProgress } from "@/hooks/useJSProgress";

export default function JSTopicQuestions() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { topic } = router.query;
    const { isQuestionCompleted } = useJSProgress();
    const [questions, setQuestions] = useState([]);

    // useEffect(() => {
    //     if (status === "unauthenticated") {
    //         router.push("/auth/login");
    //     }
    // }, [status, router]);

    useEffect(() => {
        if (topic) {
            const allQuestions = [
                ...(playgroundQuestions.beginner || []),
                ...(playgroundQuestions.advanced || [])
            ];

            // Filter questions by topic
            const filteredQuestions = allQuestions.filter(q =>
                q.tags && q.tags.includes(decodeURIComponent(topic))
            );

            setQuestions(filteredQuestions);
        }
    }, [topic]);

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
                <title>{topic ? decodeURIComponent(topic) : 'Topic'} - JavaScript Practice | Interview Nerd</title>
                <meta name="description" content="Practice JavaScript questions by topic" />
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
                                <button onClick={() => router.push("/js-practice/path-learning")} className="hover:text-gray-700 transition-colors">
                                    Path Learning
                                </button>
                                <span>/</span>
                                <span className="text-gray-900 font-medium capitalize">{topic ? decodeURIComponent(topic) : ''}</span>
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
                    <button
                        onClick={() => router.push("/js-practice/path-learning")}
                        className="flex items-center gap-2 text-yellow-600 hover:text-yellow-700 mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Topics
                    </button>

                    <h1 className="text-3xl font-bold text-gray-900 mb-2 capitalize">
                        {topic ? decodeURIComponent(topic) : ''} Questions
                    </h1>
                    <p className="text-gray-600">
                        {questions.length} question{questions.length !== 1 ? 's' : ''} available
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
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-32">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {questions.length > 0 ? (
                                        questions.map((question, index) => (
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
                                            <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                                                No questions found for this topic
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