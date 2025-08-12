import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import react from "../images/react.png";
import next from "../images/next.png";
import node from "../images/node_logo.png";
import js from "../images/js_logo.png";
import ts from "../images/ts.png";
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
  Workflow,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <nav className="w-full bg-white z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-50">
                <svg
                  width="24"
                  height="24"
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
              </div>
              <span className="font-bold text-xl text-gray-900">
                Interview Nerd
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 text-sm font-medium">
              <a
                href="#features"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Features
              </a>
              <a
                href="#categories"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Categories
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Testimonials
              </a>
              {session ? (
                <>
                  <Button
                    size="sm"
                    className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="font-bold text-blue-600">
                    Login
                  </Link>
                  {/* <Link
                    href="/auth/signup"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
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
                className="text-gray-600 hover:text-blue-600 transition-colors p-2"
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
                  className="block text-gray-600 hover:text-blue-600 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a
                  href="#categories"
                  className="block text-gray-600 hover:text-blue-600 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Categories
                </a>
                <a
                  href="#testimonials"
                  className="block text-gray-600 hover:text-blue-600 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Testimonials
                </a>
                <div className="border-t border-gray-200 pt-4">
                  {session ? (
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
                  ) : (
                    <div className="space-y-2">
                      <Link
                        href="/auth/login"
                        className="block text-gray-600 hover:text-blue-600 transition-colors py-2 text-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        href="/auth/signup"
                        className="block text-gray-600 hover:text-blue-600 transition-colors py-2 text-center"
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
              <span className="text-blue-600"> Confidence</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Your professional companion for mastering tech interviews. Curated
              questions, real scenarios, and expert guidance for modern web
              technologies.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="bg-blue-600 text-white font-medium px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              Start Preparing <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-gray-300 text-gray-700 font-medium px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              View Categories
            </Button>
          </motion.div>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={() => router.push("/category/Javascript")}
              className="cursor-pointer group"
            >
              <Card className="h-full bg-white border border-gray-200 rounded-xl group-hover:shadow-lg transition-all duration-300 hover:border-yellow-200">
                <CardHeader className="pb-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-4 mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Image src={js} width={48} height={48} alt="Javascript" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                      JavaScript
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 text-center">
                  <div className="text-2xl font-bold text-yellow-600 mb-2">
                    +52
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    From ES6 to async/await, closures, and more
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={() => router.push("/category/Next")}
              className="cursor-pointer group"
            >
              <Card className="h-full bg-white border border-gray-200 rounded-xl group-hover:shadow-lg transition-all duration-300 hover:border-gray-200">
                <CardHeader className="pb-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 mb-4 group-hover:scale-110 transition-transform duration-300 h-20">
                      <Image src={next} width={48} height={48} alt="Next.js" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                      Next.js
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 text-center">
                  <div className="text-2xl font-bold text-gray-600 mb-2">
                    +64
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Routing, SSR, API routes, and more
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={() => router.push("/category/React")}
              className="cursor-pointer group"
            >
              <Card className="h-full bg-white border border-gray-200 rounded-xl group-hover:shadow-lg transition-all duration-300 hover:border-blue-200">
                <CardHeader className="pb-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Image src={react} width={48} height={48} alt="React" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                      React.js
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    +40
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Hooks, state, context, and more
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={() => router.push("/category/Node")}
              className="cursor-pointer group"
            >
              <Card className="h-full bg-white border border-gray-200 rounded-xl group-hover:shadow-lg transition-all duration-300 hover:border-green-200">
                <CardHeader className="pb-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Image src={node} width={48} height={48} alt="Node.js" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                      Node.js
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    +52
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Express, async, event loop, and more
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={() => router.push("/category/Typescript")}
              className="cursor-pointer group"
            >
              <Card className="h-full bg-white border border-gray-200 rounded-xl group-hover:shadow-lg transition-all duration-300 hover:border-blue-200">
                <CardHeader className="pb-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Image src={ts} width={48} height={48} alt="TypeScript" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                      TypeScript
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    +30
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Types, interfaces, generics, and more
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
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
                      {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#7C3AED"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="w-10 h-10"
                        class="lucide lucide-monitor-cog-icon lucide-monitor-cog"
                      >
                        <path d="M12 17v4" />
                        <path d="m14.305 7.53.923-.382" />
                        <path d="m15.228 4.852-.923-.383" />
                        <path d="m16.852 3.228-.383-.924" />
                        <path d="m16.852 8.772-.383.923" />
                        <path d="m19.148 3.228.383-.924" />
                        <path d="m19.53 9.696-.382-.924" />
                        <path d="m20.772 4.852.924-.383" />
                        <path d="m20.772 7.148.924.383" />
                        <path d="M22 13v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                        <path d="M8 21h8" />
                        <circle cx="18" cy="6" r="3" />
                      </svg> */}
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
              transition={{ duration: 0.6, delay: 0.2 }}
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
              transition={{ duration: 0.6, delay: 0.3 }}
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-3 bg-orange-50 rounded-lg mb-4">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900">
                Community Insights
              </h3>
              <p className="text-gray-600 text-center text-sm leading-relaxed">
                Get tips and experiences from successful candidates and experts.
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
      <footer className="bg-white border-t border-gray-200">
        <div className=" border-gray-200 mt-6 pt-6 text-center">
          <p className="text-gray-500">
            &copy; 2025 Interview Nerd. All rights reserved.
          </p>
        </div>
        {/* <div className="container mx-auto px-4 py-8"> */}
        {/* <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="p-2 rounded-lg bg-blue-50">
                <svg width="20" height="20" fill="none" viewBox="0 0 48 48" className="text-blue-600">
                  <circle cx="24" cy="24" r="24" fill="#2563eb" fillOpacity="0.08"/>
                  <path d="M24 14v12l8 4" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-bold text-lg text-gray-900">Interview Nerd</span>
            </div>
            <nav className="flex items-center space-x-6">
              <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">About</Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</Link>
            </nav>
          </div> */}
        {/* <div className=" border-gray-200 mt-6 pt-6 text-center">
            <p className="text-gray-500">&copy; 2025 Interview Nerd. All rights reserved.</p>
          </div> */}
        {/* </div> */}
      </footer>
    </div>
  );
}
