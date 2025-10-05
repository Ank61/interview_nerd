import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, User, Settings, ChevronRight, Target, Award, Database } from "lucide-react";
import { motion } from "framer-motion";
import { mongoQuestions } from "@/data/mongoDatasets";
import { useMongoProgress } from "@/hooks/useMongoProgress";

export default function MongoDBPathLearning() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { progress, getCategoryProgress } = useMongoProgress();

    // useEffect(() => {
    //     if (status === "unauthenticated") {
    //         router.push("/auth/login");
    //     }
    // }, [status, router]);

    // Get unique categories with question counts
    const allQuestions = [...mongoQuestions.beginner, ...mongoQuestions.advanced];
    const categories = {};

    allQuestions.forEach(question => {
        const category = question.collection || 'General';
        if (!categories[category]) {
            categories[category] = {
                name: category,
                questions: [],
                Easy: 0,
                Medium: 0,
                Hard: 0
            };
        }
        categories[category].questions.push(question);
        categories[category][question.difficulty]++;
    });

    const categoryList = Object.values(categories).sort((a, b) =>
        b.questions.length - a.questions.length
    );

    const getCategoryIcon = (category) => {
        const icons = {
            'products': '🛍️',
            'users': '👥',
            'orders': '📦',
            'reviews': '⭐',
            'posts': '📝',
            'comments': '💬',
            'sessions': '🔐',
            'events': '📊',
        };
        return icons[category] || '📚';
    };

    const getCategoryColor = (category) => {
        const colors = {
            'products': 'from-blue-50 to-blue-100',
            'users': 'from-purple-50 to-purple-100',
            'orders': 'from-green-50 to-green-100',
            'reviews': 'from-yellow-50 to-yellow-100',
            'posts': 'from-pink-50 to-pink-100',
            'comments': 'from-indigo-50 to-indigo-100',
            'sessions': 'from-red-50 to-red-100',
            'events': 'from-teal-50 to-teal-100',
        };
        return colors[category] || 'from-gray-50 to-gray-100';
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
                <title>MongoDB Path Learning - Interview Nerd</title>
                <meta name="description" content="Learn MongoDB step by step with structured categories" />
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
                                <span className="text-gray-900 font-medium">Path Learning</span>
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
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">MongoDB Learning Path</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Master MongoDB concepts step by step. Choose a category to start your learning journey.
                    </p>
                </motion.div>
                {/* Categories Grid */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Learning Path</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categoryList.map((category, index) => {
                            const categoryProgress = getCategoryProgress(category.name);
                            const completedCount = categoryProgress.total || 0;
                            const progressPercent = category.questions.length > 0
                                ? (completedCount / category.questions.length) * 100
                                : 0;

                            return (
                                <motion.div
                                    key={category.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Card
                                        className="border-2 border-gray-200 hover:border-green-400 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                                        onClick={() => router.push(`/mongodb-practice/path-learning/${encodeURIComponent(category.name)}`)}
                                    >
                                        <CardContent className="p-6">
                                            {/* Category Header */}
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getCategoryColor(category.name)} flex items-center justify-center text-2xl`}>
                                                        {getCategoryIcon(category.name)}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors capitalize">
                                                            {category.name}
                                                        </h3>
                                                        <p className="text-sm text-gray-500">
                                                            {category.questions.length} question{category.questions.length !== 1 ? 's' : ''}
                                                        </p>
                                                    </div>
                                                </div>
                                                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                                            </div>

                                            {/* Difficulty Breakdown */}
                                            <div className="space-y-2">
                                                <div className="flex gap-2">
                                                    {category.Easy > 0 && (
                                                        <Badge className="text-xs font-medium border text-green-600 bg-green-50 border-green-200">
                                                            {category.Easy} Easy
                                                        </Badge>
                                                    )}
                                                    {category.Medium > 0 && (
                                                        <Badge className="text-xs font-medium border text-yellow-600 bg-yellow-50 border-yellow-200">
                                                            {category.Medium} Medium
                                                        </Badge>
                                                    )}
                                                    {category.Hard > 0 && (
                                                        <Badge className="text-xs font-medium border text-red-600 bg-red-50 border-red-200">
                                                            {category.Hard} Hard
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="mt-4">
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full bg-gradient-to-r ${getCategoryColor(category.name)}`}
                                                        style={{ width: `${progressPercent}%` }}
                                                    ></div>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {completedCount} / {category.questions.length} completed
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}