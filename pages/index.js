import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import react from "../images/react.png";
import next from "../images/next.png";
import node from "../images/node_logo.png";
import js from "../images/js_logo.png";
import ts from "../images/ts.png";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Star, Users, BookOpen, TrendingUp, Menu, X } from "lucide-react";
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
                <svg width="24" height="24" fill="none" viewBox="0 0 48 48" className="text-blue-600">
                  <circle cx="24" cy="24" r="24" fill="#2563eb" fillOpacity="0.08"/>
                  <path d="M24 14v12l8 4" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-bold text-xl text-gray-900">Interview Nerd</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 text-sm font-medium">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#categories" className="text-gray-600 hover:text-blue-600 transition-colors">Categories</a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">Testimonials</a>
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
                  <Link href="/auth/login" className="text-gray-600 hover:text-blue-600 transition-colors">Login</Link>
                  <Link href="/auth/signup" className="text-gray-600 hover:text-blue-600 transition-colors">Signup</Link>
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
              <svg width="16" height="16" fill="none" viewBox="0 0 48 48" className="text-blue-600">
                <circle cx="24" cy="24" r="24" fill="#2563eb" fillOpacity="0.08"/>
                <path d="M24 14v12l8 4" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Ace Your Next Interview
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Master Tech Interviews with
              <span className="text-blue-600"> Confidence</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Your professional companion for mastering tech interviews. Curated questions, real scenarios, and expert guidance for modern web technologies.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button size="lg" className="bg-blue-600 text-white font-medium px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
              Start Preparing <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 font-medium px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors">
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Tech Stack</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select from our comprehensive collection of programming languages and frameworks
            </p>
          </motion.div>
          
          <div className="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={() => router.push("/category/Javascript")}
              className="w-full max-w-xs flex flex-col items-center cursor-pointer group"
            >
              <Card className="w-full bg-white border border-gray-200 rounded-lg group-hover:shadow-md transition-all">
                <CardHeader className="flex flex-col items-center">
                  <div className="bg-gray-100 rounded-lg p-2 mb-2">
                    <Image src={js} width={40} height={40} alt="Javascript" />
                  </div>
                  <CardTitle className="pt-2 text-gray-900">Javascript</CardTitle>
                </CardHeader>
                <CardContent className="font-medium text-blue-700 text-md flex flex-col items-center">
                  + 52 questions
                  <span className="text-xs text-gray-500 mt-1">From ES6 to async/await, closures, and more.</span>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-xs flex flex-col items-center cursor-pointer group"
            >
              <Card className="w-full bg-white border border-gray-200 rounded-lg group-hover:shadow-md transition-all">
                <CardHeader className="flex flex-col items-center">
                  <div className="bg-gray-100 rounded-lg p-2 mb-2">
                    <Image src={next} width={65} height={65} alt="Next" />
                  </div>
                  <CardTitle className="pt-2 text-gray-900">Next.js</CardTitle>
                </CardHeader>
                <CardContent className="font-medium text-blue-700 text-md flex flex-col items-center">
                  + 64 questions
                  <span className="text-xs text-gray-500 mt-1">Routing, SSR, API routes, and more.</span>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-xs flex flex-col items-center cursor-pointer group"
              onClick={() => router.push("/category/React")}
            >
              <Card className="w-full bg-white border border-gray-200 rounded-lg group-hover:shadow-md transition-all">
                <CardHeader className="flex flex-col items-center">
                  <div className="bg-gray-100 rounded-lg p-2 mb-2">
                    <Image src={react} width={40} height={40} alt="React" />
                  </div>
                  <CardTitle className="pt-2 text-gray-900">React.js</CardTitle>
                </CardHeader>
                <CardContent className="text-blue-700 font-medium text-md flex flex-col items-center">
                  + 40 questions
                  <span className="text-xs text-gray-500 mt-1">Hooks, state, context, and more.</span>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-xs flex flex-col items-center cursor-pointer group"
              onClick={() => router.push("/category/Node")}
            >
              <Card className="w-full bg-white border border-gray-200 rounded-lg group-hover:shadow-md transition-all">
                <CardHeader className="flex flex-col items-center">
                  <div className="bg-gray-100 rounded-lg p-2 mb-2">
                    <Image src={node} width={60} height={60} alt="Node" />
                  </div>
                  <CardTitle className="pt-2 text-gray-900">Node.js</CardTitle>
                </CardHeader>
                <CardContent className="text-blue-700 font-medium text-md flex flex-col items-center">
                  + 52 questions
                  <span className="text-xs text-gray-500 mt-1">Express, async, event loop, and more.</span>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-xs flex flex-col items-center cursor-pointer group"
              onClick={() => router.push("/category/Typescript")}
            >
              <Card className="w-full bg-white border border-gray-200 rounded-lg group-hover:shadow-md transition-all">
                <CardHeader className="flex flex-col items-center">
                  <div className="bg-gray-100 rounded-lg p-2 mb-2">
                    <Image src={ts} width={40} height={40} alt="Typescript" />
                  </div>
                  <CardTitle className="pt-2 text-gray-900">TypeScript</CardTitle>
                </CardHeader>
                <CardContent className="text-blue-700 font-medium text-md flex flex-col items-center">
                  + 30 questions
                  <span className="text-xs text-gray-500 mt-1">Types, interfaces, generics, and more.</span>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Major Components</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore advanced topics and specialized areas for comprehensive interview preparation
            </p>
          </motion.div>
          
          <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-6">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={() => router.push("/components/AWS")}
            className="w-full max-w-sm flex flex-col items-center cursor-pointer group"
          >
            <Card className="w-full bg-white border border-gray-200 rounded-lg group-hover:shadow-md transition-all">
              <CardHeader className="flex flex-col items-center">
                <div className="bg-orange-100 rounded-lg p-3 mb-3">
                  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-4.34l-2.75-2.75-1.41 1.41L11.34 7H15v2h-2zM20 10.5v-2h-3v2h3zm-2-5.5l1.79-1.79-1.41-1.41L16.24 4.84l1.41 1.41zM13 0.55l-2 2-2-2L8.55 1.55 10.55-0.45 12 1l1.45-1.45L15.45 1.55 13 0.55zM20.45 16.24l-1.41-1.41L15.76 18.2l1.41 1.41 3.28-3.37zM17.24 18.2l-1.79-1.79-1.41 1.41 1.79 1.79 1.41-1.41zM20 13.5v2h-3v-2h3zM12 22.45l2-2 2 2 1.45-1.45L17 20l-1.45 1.45L12 22.45zM8.55 20.45L10.55 22.45 12 21l1.45 1.45L15.45 20.45 13 19.45l-2 2-2-2-1.45 1.45zM3.55 18.2l1.41 1.41 3.28-3.37-1.41-1.41-3.28 3.37zM7.76 4.84l1.79-1.79 1.41 1.41-1.79 1.79-1.41-1.41z" fill="#FF9900"/>
                  </svg>
                </div>
                <CardTitle className="pt-2 text-gray-900">AWS Questions</CardTitle>
              </CardHeader>
              <CardContent className="font-medium text-blue-700 text-md flex flex-col items-center">
                + 45 questions
                <span className="text-xs text-gray-500 mt-1">EC2, S3, Lambda, CloudFormation, and more.</span>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={() => router.push("/components/SystemDesign")}
            className="w-full max-w-sm flex flex-col items-center cursor-pointer group"
          >
            <Card className="w-full bg-white border border-gray-200 rounded-lg group-hover:shadow-md transition-all">
              <CardHeader className="flex flex-col items-center">
                <div className="bg-purple-100 rounded-lg p-3 mb-3">
                  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5zM12 22c-4.18-1.18-7-4.96-7-9.22V8.27l7-3.11 7 3.11v4.51c0 4.26-2.82 8.04-7 9.22z" fill="#8B5CF6"/>
                    <path d="M12 6l-6 2.67v3.33c0 3.33 2.2 6.13 5.25 7.33.38.12.75.22 1.12.3.37-.08.74-.18 1.12-.3C15.8 18.13 18 15.33 18 12V8.67L12 6z" fill="#8B5CF6"/>
                    <path d="M12 8l-4 1.78v2.22c0 2.22 1.47 4.08 3.5 4.89.25.1.5.18.75.25.25-.07.5-.15.75-.25C13.53 16.08 15 14.22 15 12V9.78L12 8z" fill="#8B5CF6"/>
                  </svg>
                </div>
                <CardTitle className="pt-2 text-gray-900">System Design</CardTitle>
              </CardHeader>
              <CardContent className="font-medium text-blue-700 text-md flex flex-col items-center">
                + 38 questions
                <span className="text-xs text-gray-500 mt-1">Scalability, architecture patterns, and distributed systems.</span>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={() => router.push("/components/Database")}
            className="w-full max-w-sm flex flex-col items-center cursor-pointer group"
          >
            <Card className="w-full bg-white border border-gray-200 rounded-lg group-hover:shadow-md transition-all">
              <CardHeader className="flex flex-col items-center">
                <div className="bg-green-100 rounded-lg p-3 mb-3">
                  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" fill="#10B981"/>
                    <path d="M2 4h20v16H2V4zm2 2v12h16V6H4z" fill="#10B981"/>
                  </svg>
                </div>
                <CardTitle className="pt-2 text-gray-900">Database Design</CardTitle>
              </CardHeader>
              <CardContent className="font-medium text-blue-700 text-md flex flex-col items-center">
                + 42 questions
                <span className="text-xs text-gray-500 mt-1">SQL, NoSQL, indexing, and optimization strategies.</span>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={() => router.push("/components/DevOps")}
            className="w-full max-w-sm flex flex-col items-center cursor-pointer group"
          >
            <Card className="w-full bg-white border border-gray-200 rounded-lg group-hover:shadow-md transition-all">
              <CardHeader className="flex flex-col items-center">
                <div className="bg-blue-100 rounded-lg p-3 mb-3">
                  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" fill="#3B82F6"/>
                    <path d="M12 9l-3 1.5v3L12 15l3-1.5v-3L12 9z" fill="#3B82F6"/>
                    <path d="M12 12l-2 1v2l2 1 2-1v-2l-2-1z" fill="#3B82F6"/>
                  </svg>
                </div>
                <CardTitle className="pt-2 text-gray-900">DevOps & CI/CD</CardTitle>
              </CardHeader>
              <CardContent className="font-medium text-blue-700 text-md flex flex-col items-center">
                + 35 questions
                <span className="text-xs text-gray-500 mt-1">Docker, Kubernetes, Jenkins, and deployment strategies.</span>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Interview Nerd?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive features designed to help you succeed in your tech interviews
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
              <h3 className="font-semibold text-lg mb-2 text-gray-900">Curated Questions</h3>
              <p className="text-gray-600 text-center text-sm leading-relaxed">Handpicked questions for all major tech stacks and interview rounds.</p>
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
              <h3 className="font-semibold text-lg mb-2 text-gray-900">Real-World Scenarios</h3>
              <p className="text-gray-600 text-center text-sm leading-relaxed">Practice with scenarios and problems from top companies.</p>
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
              <h3 className="font-semibold text-lg mb-2 text-gray-900">Track Progress</h3>
              <p className="text-gray-600 text-center text-sm leading-relaxed">Monitor your improvement and focus on your weak spots.</p>
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
              <h3 className="font-semibold text-lg mb-2 text-gray-900">Community Insights</h3>
              <p className="text-gray-600 text-center text-sm leading-relaxed">Get tips and experiences from successful candidates and experts.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="container mx-auto px-4 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of developers who have successfully landed their dream jobs
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
                  <span className="text-blue-600 font-semibold text-sm">PS</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Priya S.</p>
                  <p className="text-sm text-gray-500">Frontend Engineer</p>
                </div>
              </div>
              <p className="text-gray-700 italic leading-relaxed">"The questions are spot on and the explanations are super clear. Helped me land my dream job!"</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600 font-semibold text-sm">AT</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Alex T.</p>
                  <p className="text-sm text-gray-500">Full Stack Developer</p>
                </div>
              </div>
              <p className="text-gray-700 italic leading-relaxed">"I love the real-world scenarios. It's like practicing for the real thing!"</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-purple-600 font-semibold text-sm">SK</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Samir K.</p>
                  <p className="text-sm text-gray-500">Software Engineer</p>
                </div>
              </div>
              <p className="text-gray-700 italic leading-relaxed">"The progress tracking kept me motivated. Highly recommend!"</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Ace Your Interview?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of developers preparing for their dream job with Interview Nerd.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-blue-600 text-white font-medium px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 font-medium px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                Browse Categories
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
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
          </div>
          <div className="border-t border-gray-200 mt-6 pt-6 text-center">
            <p className="text-gray-500">&copy; 2024 Interview Nerd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
