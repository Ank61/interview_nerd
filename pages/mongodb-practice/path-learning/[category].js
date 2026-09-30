import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, User, Settings, ChevronLeft, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { mongoQuestions } from "@/data/mongoDatasets";
import { useMongoProgress } from "@/hooks/useMongoProgress";

export default function CategoryTopicsPage() {
    const router = useRouter();
    const { category } = router.query;
    const { data: session, status } = useSession();
    const { isQuestionCompleted } = useMongoProgress();

    // useEffect(() => {
    //     if (status === "unauthenticated") {
    //         router.push("/auth/login");
    //     }
    // }, [status, router]);

    // MongoDB operation categories with keywords (same as main page)
    const operationCategories = {
        "Query Operations": {
            keywords: ["find", "findOne", "count", "distinct"],
        },
        "Aggregation Pipeline": {
            keywords: ["aggregate", "$group", "$match", "$project", "$sort", "$limit"],
        },
        "Write Operations": {
            keywords: ["insert", "update", "delete", "replace", "$addToSet", "$pull", "$inc", "$mul"],
        },
        "Arithmetic Operations": {
            keywords: ["$add", "$subtract", "$multiply", "$divide"],
        },
        "String Operations": {
            keywords: ["$concat", "$split", "$toUpper", "$toLower", "$size"],
        },
        "Date Operations": {
            keywords: ["$year", "$month", "$dayOfWeek", "Date"],
        },
        "Conditional Operations": {
            keywords: ["$cond", "$ifNull", "$switch"],
        },
        "Array Operations": {
            keywords: ["$map", "$filter", "$reduce", "$unwind"],
        },
        "System Variables": {
            keywords: ["$$NOW", "$$ROOT", "$$CURRENT"],
        },
        "Geospatial": {
            keywords: ["$geoNear", "$geoWithin", "$centerSphere", "coordinates"],
        },
        "Administrative": {
            keywords: ["stats", "explain", "createIndex", "getIndexes"],
        },
    };

    // Filter questions by operation category
    const allQuestions = [
        ...mongoQuestions.beginner,
        ...mongoQuestions.advanced,
        ...(mongoQuestions.expert || []),
    ];

    const decodedCategory = category ? decodeURIComponent(category) : "";
    const categoryInfo = operationCategories[decodedCategory];

    const categoryQuestions = category && categoryInfo
        ? allQuestions.filter((question) => {
            const solution = question.solution.toLowerCase();
            const title = question.title.toLowerCase();
            const hint = (question.hint || "").toLowerCase();

            return categoryInfo.keywords.some(
                (keyword) =>
                    solution.includes(keyword.toLowerCase()) ||
                    title.includes(keyword.toLowerCase()) ||
                    hint.includes(keyword.toLowerCase())
            );
        })
        : [];

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case "Easy":
                return "text-green-600 bg-green-50 border-green-200";
            case "Medium":
                return "text-yellow-600 bg-yellow-50 border-yellow-200";
            case "Hard":
                return "text-red-600 bg-red-50 border-red-200";
            case "Expert":
                return "text-purple-600 bg-purple-50 border-purple-200";
            default:
                return "text-gray-600 bg-gray-50 border-gray-200";
        }
    };

    if (status === "loading" || !category) {
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
                <title>{decodeURIComponent(category)} - MongoDB Path Learning | Interview Nerd</title>
                <meta name="description" content={`Learn ${category} in MongoDB`} />
            </Head>

            {/* Header */}
            <header className="bg-surface border-b border-gray-200 shadow-sm sticky top-0 z-50">
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
                                <button onClick={() => router.push("/mongodb-practice/path-learning")} className="hover:text-gray-700 transition-colors">
                                    Path Learning
                                </button>
                                <span>/</span>
                                <span className="text-gray-900 font-medium capitalize">{decodeURIComponent(category)}</span>
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
                    <div className="mb-6">
                        <button
                            onClick={() => router.push("/mongodb-practice/path-learning")}
                            className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-4 transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Back to Categories
                        </button>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{decodedCategory} Questions</h1>
                        <p className="text-gray-600">
                            Master {decodedCategory} concepts with {categoryQuestions.length} practice questions
                        </p>
                    </div>
                </motion.div>

                {/* Questions Table */}
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
                                            Dataset
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-32">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-surface divide-y divide-gray-200">
                                    {categoryQuestions.length > 0 ? (
                                        categoryQuestions.map((question, index) => (
                                            <motion.tr
                                                key={question.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: index * 0.02 }}
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
                                                    {question.dataset}
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
                                                No questions found for this category
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