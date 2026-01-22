import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import react from "../images/react.png";
import next from "../images/next.png";
import node from "../images/node_logo.png";
import mongodb from "../images/mongodb.png";
import python from "../images/python1.png";
import redis from "../images/redis.png";
import nest from "../images/nest.png";
import js from "../images/js_logo.png";
import ts from "../images/ts.png";
import rabbitmq from "../images/rabitt.png";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  Star,
  Users,
  BookOpen,
  TrendingUp,
  Menu,
  X,
  MonitorCog,
  DatabaseZap,
  Database,
  Workflow,
  FileCode2,
  FileCode,
  CheckCircle,
  Target,
  Award,
  Zap,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Code,
  Play,
  Brain,
  ChevronDown,
  Settings,
  FileText,
  Trophy,
} from "lucide-react";
// import snippetsData from "../data/snippets.json";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Auto-scroll for MCQ carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % 2); // 2 pages total (7 items, 4 per page)
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <nav className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                <BookOpen size={24} className="text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 md:hidden lg:block">
                  Interview Nerd
                </h1>
                {/* <p className="text-sm text-gray-500 hidden sm:block">
                  Master Tech Interviews
                </p> */}
              </div>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/resources"
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Resources
              </Link>
              <a
                href="#features"
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                Features
              </a>
              <a
                href="#snippets"
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                Snippets
              </a>
              <a
                href="#categories"
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                Categories
              </a>

              {/* Tools Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsToolsDropdownOpen(true)}
                onMouseLeave={() => setIsToolsDropdownOpen(false)}
              >
                <button className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-blue-50">
                  <Settings className="w-4 h-4" />
                  <span>Tools</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isToolsDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isToolsDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                    <div className="py-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push("/sql-practice")}
                        className="w-full justify-start text-gray-600 hover:text-indigo-700 hover:bg-indigo-50 font-medium flex items-center gap-3 px-4 py-3 rounded-none hover:rounded-lg mx-2"
                      >
                        <DatabaseZap className="w-5 h-5 text-indigo-700" />
                        <div className="text-left">
                          <div className="font-medium">SQL Query Practice</div>
                        </div>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push("/mongodb-practice")}
                        className="w-full justify-start text-gray-600 hover:text-green-700 hover:bg-green-50 font-medium flex items-center gap-3 px-4 py-3 rounded-none hover:rounded-lg mx-2"
                      >
                        <Database className="w-5 h-5 text-green-700" />
                        <div className="text-left">
                          <div className="font-medium">
                            MongoDB Query Practice
                          </div>
                        </div>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push("/python-practice")}
                        className="w-full justify-start text-gray-600 hover:text-yellow-700 hover:bg-yellow-50 font-medium flex items-center gap-3 px-4 py-3 rounded-none hover:rounded-lg mx-2"
                      >
                        <FileCode2 className="w-5 h-5 text-yellow-700" />
                        <div className="text-left">
                          <div className="font-medium">Python Practice</div>
                        </div>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push("/playground")}
                        className="w-full justify-start text-gray-600 hover:text-purple-700 hover:bg-purple-50 font-medium flex items-center gap-3 px-4 py-3 rounded-none hover:rounded-lg mx-2"
                      >
                        <Code className="w-5 h-5 text-purple-700" />
                        <div className="text-left">
                          <div className="font-medium">
                            JavaScript Playground
                          </div>
                        </div>
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <a
                href="#testimonials"
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                Testimonials
              </a>
              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                  <Button
                    size="sm"
                    className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors hover:shadow-md"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Login
                  </Link>
                  <Button
                    size="sm"
                    onClick={() => router.push("/auth/signup")}
                    className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors hover:shadow-md"
                  >
                    Get Started
                  </Button>
                  {/* <Link
                    href="/auth/signup"
                    className="text-gray-600 hover:text-blue-600 transition-all duration-200 hover:scale-105"
                  >
                    Signup
                  </Link> */}
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-600 hover:text-blue-600 transition-all duration-200 p-2"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
              <div className="container mx-auto px-4 py-4 space-y-4">
                <a
                  href="#features"
                  className="block text-gray-600 hover:text-blue-600 transition-all duration-200 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a
                  href="#snippets"
                  className="block text-gray-600 hover:text-blue-600 transition-all duration-200 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Snippets
                </a>
                <a
                  href="#categories"
                  className="block text-gray-600 hover:text-blue-600 transition-all duration-200 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Categories
                </a>
                <div className="border-t border-gray-200 pt-4">
                  <button
                    onClick={() => setIsMobileToolsOpen(!isMobileToolsOpen)}
                    className="w-full text-left text-gray-600 hover:text-blue-600 transition-all duration-200 py-2 font-medium flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Tools
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isMobileToolsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isMobileToolsOpen && (
                    <div className="pl-6 space-y-2 mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          // session
                          // ?
                          router.push("/sql-practice");
                          // : router.push("/auth/login");
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full justify-start text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2 py-2"
                      >
                        <DatabaseZap className="w-4 h-4" />
                        SQL Practice
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          // session
                          // ? router.push("/mongodb-practice")
                          router.push("/mongodb-practice");
                          // : router.push("/auth/login");
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full justify-start text-green-600 hover:text-green-700 font-medium flex items-center gap-2 py-2"
                      >
                        <Database className="w-4 h-4" />
                        MongoDB Practice
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          // session
                          // ?
                          router.push("/python-practice");
                          // : router.push("/auth/login");
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full justify-start text-yellow-600 hover:text-yellow-700 font-medium flex items-center gap-2 py-2"
                      >
                        <FileCode2 className="w-4 h-4" />
                        Python Practice
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          // session
                          // ? router.push("/playground")
                          router.push("/playground");
                          // : router.push("/auth/login");
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full justify-start text-purple-600 hover:text-purple-700 font-medium flex items-center gap-2 py-2"
                      >
                        <Code className="w-4 h-4" />
                        JavaScript Playground
                      </Button>
                    </div>
                  )}
                </div>
                <Link
                  href="/resources"
                  className="block text-gray-600 hover:text-blue-600 transition-all duration-200 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Resources
                </Link>
                <a
                  href="#testimonials"
                  className="block text-gray-600 hover:text-blue-600 transition-all duration-200 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Testimonials
                </a>
                <div className="border-t border-gray-200 pt-4">
                  {session ? (
                    <div className="space-y-2">
                      <Link
                        href="/dashboard"
                        className="block text-gray-600 hover:text-blue-600 transition-all duration-200 py-2 text-center font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Button
                        size="sm"
                        className="w-full bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        onClick={() => {
                          signOut({ callbackUrl: "/" });
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        href="/auth/login"
                        className="block text-gray-600 hover:text-blue-600 transition-all duration-200 py-2 text-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        href="/auth/signup"
                        className="block text-gray-600 hover:text-blue-600 transition-all duration-200 py-2 text-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Signup
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <svg
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 48 48"
                className="text-blue-600"
              >
                <circle
                  cx="24"
                  cy="24"
                  r="24"
                  fill="#2563eb"
                  fillOpacity="0.08"
                />
                <path
                  d="M24 14v12l8 4"
                  stroke="#2563eb"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Ace Your Next Interview
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Master Tech Interviews with
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Confidence
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
              Your comprehensive platform for acing technical interviews.
              Practice with
              <span className="font-semibold text-gray-800">
                {" "}
                500+ curated questions
              </span>
              , real-world scenarios, and expert solutions across all major tech
              stacks.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>500+ Interview Questions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Real Company Scenarios</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Progress Tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Expert Solutions</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              onClick={() => router.push("/category/Javascript")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                const categoriesSection = document.getElementById("categories");
                categoriesSection?.scrollIntoView({ behavior: "smooth" });
              }}
              className="border-2 border-gray-300 text-gray-700 font-semibold px-8 py-4 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
            >
              Explore Topics
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Code Playground Feature Section */}
      <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                New Feature: AI-Powered Learning
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Interactive Learning Platform
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Practice coding with our interactive playground and SQL practice
                module featuring adaptive difficulty, real-time feedback, and
                comprehensive datasets across multiple programming languages.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center"
              >
                <div className="bg-white/10 rounded-2xl p-6 mb-4 backdrop-blur-sm">
                  <Code className="w-12 h-12 text-white mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    JavaScript Playground
                  </h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Practice JavaScript with real-time code execution,
                    interactive challenges, and AI-powered recommendations
                  </p>
                  <Button
                    size="sm"
                    onClick={() => router.push("/playground")}
                    className="bg-white text-purple-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
                  >
                    <Play className="mr-2 w-4 h-4" />
                    Practice Javascript
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <div className="bg-white/10 rounded-2xl p-6 mb-4 backdrop-blur-sm">
                  <DatabaseZap className="w-12 h-12 text-white mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    SQL Practice
                  </h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Master SQL with interactive queries, real datasets,
                    realistic datasets and comprehensive practice questions
                  </p>
                  <Button
                    size="sm"
                    onClick={
                      () =>
                        // session
                        //   ?
                        router.push("/sql-practice")
                      // : router.push("/auth/login")
                    }
                    className="bg-white text-indigo-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
                  >
                    <DatabaseZap className="mr-2 w-4 h-4" />
                    Practice SQL
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center"
              >
                <div className="bg-white/10 rounded-2xl p-6 mb-4 backdrop-blur-sm">
                  <Database className="w-12 h-12 text-white mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    MongoDB Practice
                  </h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Learn MongoDB queries and aggregation pipelines with
                    hands-on practice using realistic datasets and complex
                    operations
                  </p>
                  <Button
                    size="sm"
                    onClick={() => router.push("/mongodb-practice")}
                    className="bg-white text-green-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
                  >
                    <Database className="mr-2 w-4 h-4" />
                    Practice MongoDB
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center"
              >
                <div className="bg-white/10 rounded-2xl p-6 mb-4 backdrop-blur-sm">
                  <FileCode2 className="w-12 h-12 text-white mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    Python Practice
                  </h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Master Python programming with interactive code execution,
                    beginner to advanced questions, and instant feedback
                  </p>
                  <Button
                    size="sm"
                    onClick={() => router.push("/python-practice")}
                    className="bg-white text-yellow-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
                  >
                    <FileCode2 className="mr-2 w-4 h-4" />
                    Practice Python
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stacks Section */}
      <section id="categories" className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Tech Stack
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select from our comprehensive collection of programming languages
              and frameworks
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/category/Javascript")}
              className="cursor-pointer group"
            >
              <Card className="h-full bg-white border border-gray-200 rounded-xl shadow-md group-hover:shadow-2xl transition-all duration-500 hover:border-yellow-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="pb-4 relative z-10">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-4 mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <Image src={js} width={48} height={48} alt="Javascript" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-700 transition-colors">
                      JavaScript
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 text-center relative z-10">
                  <div className="text-3xl font-bold text-yellow-600 mb-3 group-hover:scale-110 transition-transform">
                    52
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700">
                    ES6+, Async/Await, Closures, Prototypes
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/category/Next")}
              className="cursor-pointer group"
            >
              <Card className="h-full bg-white border border-gray-200 rounded-xl shadow-md group-hover:shadow-2xl transition-all duration-500 hover:border-gray-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="pb-4 relative z-10">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gradient-to-br from-gray-100 to-slate-100 rounded-2xl p-4 mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <Image src={next} width={48} height={48} alt="Next.js" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                      Next.js
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 text-center relative z-10">
                  <div className="text-3xl font-bold text-gray-600 mb-3 group-hover:scale-110 transition-transform">
                    64
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700">
                    Routing, SSR, API routes, and more
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/category/React")}
              className="cursor-pointer group"
            >
              <Card className="h-full bg-white border border-gray-200 rounded-xl shadow-md group-hover:shadow-2xl transition-all duration-500 hover:border-blue-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="pb-4 relative z-10">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-4 mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <Image src={react} width={48} height={48} alt="React" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                      React.js
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 text-center relative z-10">
                  <div className="text-3xl font-bold text-blue-600 mb-3 group-hover:scale-110 transition-transform">
                    40
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700">
                    Hooks, State Management, Context, JSX
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/category/Node")}
              className="cursor-pointer group"
            >
              <Card className="h-full bg-white border border-gray-200 rounded-xl shadow-md group-hover:shadow-2xl transition-all duration-500 hover:border-green-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="pb-4 relative z-10">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-4 mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <Image src={node} width={48} height={48} alt="Node.js" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                      Node.js
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 text-center relative z-10">
                  <div className="text-3xl font-bold text-green-600 mb-3 group-hover:scale-110 transition-transform">
                    52
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700">
                    Express, async, event loop, and more
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/category/Typescript")}
              className="cursor-pointer group"
            >
              <Card className="h-full bg-white border border-gray-200 rounded-xl shadow-md group-hover:shadow-2xl transition-all duration-500 hover:border-blue-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="pb-4 relative z-10">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-4 mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <Image src={ts} width={48} height={48} alt="TypeScript" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                      TypeScript
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 text-center relative z-10">
                  <div className="text-3xl font-bold text-blue-600 mb-3 group-hover:scale-110 transition-transform">
                    30
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700">
                    Types, interfaces, generics, and more
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/category/SQL")}
              className="cursor-pointer group"
            >
              <Card className="h-full bg-white border border-gray-200 rounded-xl shadow-md group-hover:shadow-2xl transition-all duration-500 hover:border-indigo-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="pb-4 relative z-10">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-4 mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#4f46e5"
                        className="w-12 h-12"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                        />
                      </svg>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-700 transition-colors">
                      SQL
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 text-center relative z-10">
                  <div className="text-3xl font-bold text-indigo-600 mb-3 group-hover:scale-110 transition-transform">
                    45
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700">
                    Queries, joins, indexing, and optimization
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/category/RabbitMQ")}
              className="cursor-pointer group"
            >
              <Card className="h-full bg-white border border-gray-200 rounded-xl shadow-md group-hover:shadow-2xl transition-all duration-500 hover:border-orange-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-red-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="pb-4 relative z-10">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl pr-2 pl-2 pt-4 pb-4 mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <Image
                        src={rabbitmq}
                        width={60}
                        height={60}
                        alt="rabbitmq"
                      />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-700 transition-colors">
                      RabbitMQ
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 text-center relative z-10">
                  <div className="text-3xl font-bold text-orange-600 mb-3 group-hover:scale-110 transition-transform">
                    28
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700">
                    Message queues, exchanges, and routing
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/category/OOP")}
              className="cursor-pointer group"
            >
              <Card className="h-full bg-white border border-gray-200 rounded-xl shadow-md group-hover:shadow-2xl transition-all duration-500 hover:border-purple-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="pb-4 relative z-10">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-4 mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#9333ea"
                        className="w-12 h-12"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
                        />
                      </svg>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
                      OOP
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 text-center relative z-10">
                  <div className="text-3xl font-bold text-purple-600 mb-3 group-hover:scale-110 transition-transform">
                    35
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700">
                    Classes, inheritance, polymorphism, and design patterns
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/category/python")}
              className="cursor-pointer group"
            >
              <Card className="h-full bg-white border border-gray-200 rounded-xl shadow-md group-hover:shadow-2xl transition-all duration-500 hover:border-yellow-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-30/50 to-yellow-30/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="pb-4 relative z-10">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-50 rounded-2xl pr-1 pl-1 pt-4 pb-4 mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <Image src={python} width={80} height={80} alt="python" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-700 transition-colors">
                      Python
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 text-center relative z-10">
                  <div className="text-3xl font-bold text-yellow-600 mb-3 group-hover:scale-110 transition-transform">
                    15
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700">
                    Data structures, algorithms, and problem-solving
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/category/redis")}
              className="cursor-pointer group"
            >
              <Card className="h-full bg-white border border-gray-200 rounded-xl shadow-md group-hover:shadow-2xl transition-all duration-500 hover:border-red-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-30/50 to-red-30/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="pb-4 relative z-10">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gradient-to-br from-red-50 to-red-50 rounded-2xl pr-1 pl-1 pt-4 pb-4 mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <Image src={redis} width={80} height={80} alt="python" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-700 transition-colors">
                      Redis
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 text-center relative z-10">
                  <div className="text-3xl font-bold text-red-600 mb-3 group-hover:scale-110 transition-transform">
                    25
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700">
                    Data structures, algorithms, and problem-solving
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/category/nest")}
              className="cursor-pointer group"
            >
              <Card className="h-full bg-white border border-gray-200 rounded-xl shadow-md group-hover:shadow-2xl transition-all duration-500 hover:border-red-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-30/50 to-red-30/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="pb-4 relative z-10">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gradient-to-br from-red-50 to-red-50 rounded-2xl pr-1 pl-1 pt-4 pb-4 mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <Image src={nest} width={60} height={60} alt="nest" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-700 transition-colors">
                      Nest
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 text-center relative z-10">
                  <div className="text-3xl font-bold text-[#f40057] mb-3 group-hover:scale-110 transition-transform">
                    45
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700">
                    Data structures, algorithms, and problem-solving
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MCQ Practice Section with Carousel */}
      <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Trophy className="w-4 h-4" />
              Test Your Knowledge
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              MCQ Practice Tests
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Challenge yourself with multiple-choice questions across various
              technologies. Track your progress and master every topic!
            </p>
          </motion.div>

          <div className="relative px-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[
                {
                  name: "JavaScript",
                  category: "Javascript",
                  color: "from-yellow-100 to-orange-100",
                  icon: js,
                  questions: 400,
                  topics: "ES6+, Async, Closures",
                },
                {
                  name: "TypeScript",
                  category: "Typescript",
                  color: "from-blue-100 to-indigo-100",
                  icon: ts,
                  questions: 400,
                  topics: "Types, Interfaces, Generics",
                },
                {
                  name: "React",
                  category: "React",
                  color: "from-cyan-100 to-blue-100",
                  icon: react,
                  questions: 348,
                  topics: "Hooks, State, Components",
                },
                {
                  name: "Node.js",
                  category: "Node",
                  color: "from-green-100 to-emerald-100",
                  icon: node,
                  questions: 200,
                  topics: "Express, APIs, Middleware",
                },
                {
                  name: "SQL",
                  category: "SQL",
                  color: "from-orange-100 to-red-100",
                  icon: "🗄️",
                  questions: 400,
                  topics: "Queries, Joins, Optimization",
                },
                {
                  name: "MongoDB",
                  category: "MongoDB",
                  color: "from-green-100 to-teal-100",
                  icon: mongodb,
                  questions: 400,
                  topics: "Aggregation, Queries, Schema",
                },
                {
                  name: "OOP",
                  category: "OOP",
                  color: "from-purple-100 to-pink-100",
                  icon: "🎯",
                  questions: 400,
                  topics: "Classes, Inheritance, Polymorphism",
                },
              ]
                .slice(currentPage * 4, currentPage * 4 + 4)
                .map((tech, index) => (
                  <motion.div
                    key={tech.category}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      router.push(`/practice-mcq/${tech.category}`)
                    }
                    className="cursor-pointer group"
                  >
                    <Card className="h-full bg-white border border-gray-200 rounded-xl shadow-md group-hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                      />
                      <CardHeader className="pb-4 relative z-10">
                        <div className="flex flex-col items-center text-center">
                          <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                            {tech.name === "SQL" ? (
                              <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-4 mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="#4f46e5"
                                  className="w-12 h-12"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                                  />
                                </svg>
                              </div>
                            ) : tech.name === "SQL" ? (
                              <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-4 mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="#4f46e5"
                                  className="w-12 h-12"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                                  />
                                </svg>
                              </div>
                            ) : tech.name === "OOP" ? (
                              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-4 mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="#9333ea"
                                  className="w-12 h-12"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
                                  />
                                </svg>
                              </div>
                            ) : (
                              <div
                                className={`bg-gradient-to-br ${tech.color} rounded-2xl p-4 mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}
                              >
                                <Image
                                  src={tech.icon}
                                  width={48}
                                  height={48}
                                  alt={tech.name}
                                />
                              </div>
                            )}
                          </div>
                          <CardTitle className="text-xl font-bold text-gray-900 mb-0">
                            {tech.name}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0 text-center relative z-10">
                        <div className="flex items-center justify-center gap-4 mb-0">
                          <div className="flex items-center gap-1 text-gray-600">
                            <FileText className="w-4 h-4" />
                            <span className="text-sm font-semibold">
                              {tech.questions} MCQs
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700">
                          {tech.topics}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>

            {/* Page Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {[0, 1].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentPage === page
                      ? "bg-white w-8"
                      : "bg-white/30 hover:bg-white/60"
                  }`}
                  aria-label={`Go to page ${page + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        {/* </section> */}
        {/* Bottom CTA */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/practice-mcq/Javascript"
            className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            <Trophy className="w-5 h-5" />
            Explore All MCQ Tests
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div> */}
        {/* </div> */}
      </section>

      {/* Major Components Section */}
      <section className="container mx-auto px-4 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Advanced Topics
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Master specialized areas and advanced concepts for comprehensive
              interview preparation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
            {/* AWS Questions */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={() => router.push("/components/AWS")}
              className="cursor-pointer group"
            >
              <Card className="h-full bg-white border border-gray-200 rounded-xl group-hover:shadow-lg transition-all duration-300 hover:border-orange-200">
                <CardHeader className="pb-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-4 mb-4 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 transition-transform duration-300 group-hover:scale-110">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#df924aff"
                        className="w-12 h-12"
                        role="img"
                        aria-label="Cloud icon"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 15a4 4 0 014-4h.167a6.002 6.002 0 0111.73-1.003A5.5 5.5 0 1118.5 20H7a4 4 0 01-4-4z"
                        />
                      </svg>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                      AWS Questions
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-2">
                    +45
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    EC2, S3, Lambda, CloudFormation, and more cloud services
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* System Design */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={() => router.push("/components/SystemDesign")}
              className="cursor-pointer group"
            >
              <Card className="h-full bg-white border border-gray-200 rounded-xl group-hover:shadow-lg transition-all duration-300 hover:border-purple-200">
                <CardHeader className="pb-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-6 mb-4 shadow-md transform transition-transform duration-300 hover:scale-105 flex items-center justify-center">
                      <MonitorCog className="w-9 h-9 text-purple-800" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                      System Design
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-2">
                    +38
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Scalability, architecture patterns, and distributed systems
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Database Design */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={() => router.push("/components/Database")}
              className="cursor-pointer group"
            >
              <Card className="h-full bg-white border border-gray-200 rounded-xl group-hover:shadow-lg transition-all duration-300 hover:border-green-200">
                <CardHeader className="pb-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 mb-4 group-hover:scale-110 transition-transform duration-300">
                      <DatabaseZap className="w-9 h-9 text-green-600" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                      Database Design
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    +42
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    SQL, NoSQL, indexing, and optimization strategies
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* DevOps & CI/CD */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={() => router.push("/components/DevOps")}
              className="cursor-pointer group"
            >
              <Card className="h-full bg-white border border-gray-200 rounded-xl group-hover:shadow-lg transition-all duration-300 hover:border-blue-200">
                <CardHeader className="pb-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Workflow className="w-9 h-9 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                      DevOps & CI/CD
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    +35
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Docker, Kubernetes, Jenkins, and deployment strategies
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Interview Nerd?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive features designed to help you succeed in your tech
              interviews
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6 flex flex-col items-center shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={
                () =>
                  // session
                  // ?
                  router.push("/playground")
                // : router.push("/auth/login")
              }
            >
              <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg mb-4">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900">
                JavaScript Playground
              </h3>
              <p className="text-gray-600 text-center text-sm leading-relaxed">
                Interactive JavaScript coding environment with AI-powered
                adaptive difficulty and real-time feedback.
              </p>
              <Badge className="mt-2 bg-purple-100 text-purple-800 text-xs">
                🆕 New Feature
              </Badge>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-3 bg-blue-50 rounded-lg mb-4">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900">
                Curated Questions
              </h3>
              <p className="text-gray-600 text-center text-sm leading-relaxed">
                Handpicked questions for all major tech stacks and interview
                rounds.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-3 bg-green-50 rounded-lg mb-4">
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900">
                Real-World Scenarios
              </h3>
              <p className="text-gray-600 text-center text-sm leading-relaxed">
                Practice with scenarios and problems from top companies.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-3 bg-purple-50 rounded-lg mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900">
                Track Progress
              </h3>
              <p className="text-gray-600 text-center text-sm leading-relaxed">
                Monitor your improvement and focus on your weak spots.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="container mx-auto px-4 py-16 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of developers who have successfully landed their
              dream jobs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-semibold text-sm">
                    PS
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Priya S.</p>
                  <p className="text-sm text-gray-500">Frontend Engineer</p>
                </div>
              </div>
              <p className="text-gray-700 italic leading-relaxed">
                The questions are spot on and the explanations are super clear.
                Helped me land my dream job!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600 font-semibold text-sm">
                    AT
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Alex T.</p>
                  <p className="text-sm text-gray-500">Full Stack Developer</p>
                </div>
              </div>
              <p className="text-gray-700 italic leading-relaxed">
                I love the real-world scenarios. Its like practicing for the
                real thing!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-purple-600 font-semibold text-sm">
                    SK
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Samir K.</p>
                  <p className="text-sm text-gray-500">Software Engineer</p>
                </div>
              </div>
              <p className="text-gray-700 italic leading-relaxed">
                The progress tracking kept me motivated. Highly recommend!
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Ace Your Interview?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of developers preparing for their dream job with
              Interview Nerd.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-blue-600 text-white font-medium px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-300 text-gray-700 font-medium px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Browse Categories
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-blue-600">
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 48 48"
                    className="text-white"
                  >
                    <circle
                      cx="24"
                      cy="24"
                      r="24"
                      fill="#ffffff"
                      fillOpacity="0.1"
                    />
                    <path
                      d="M24 14v12l8 4"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="font-bold text-xl">Interview Nerd</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Your comprehensive platform for mastering technical interviews.
                Practice with curated questions and land your dream job.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#features"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#snippets"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Snippets
                  </a>
                </li>
                <li>
                  <a
                    href="#categories"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Categories
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <Link
                    href="/auth/login"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Popular Topics</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/category/Javascript"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    JavaScript
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/React"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    React.js
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/Node"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Node.js
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/SQL"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    SQL
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2025 Interview Nerd. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
