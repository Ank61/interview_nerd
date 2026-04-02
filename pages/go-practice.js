import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  User,
  Settings,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Sparkles,
  Zap,
  Target,
  Terminal,
  Layers,
  Code2,
} from "lucide-react";
import { motion } from "framer-motion";

export default function GoPracticeMode() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Go Practice - Choose Your Mode | Interview Nerd</title>
        <meta
          name="description"
          content="Choose between Concepts and Exercises modes for Go practice"
        />
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
                <div className="p-2 rounded-lg bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-100">
                  <BookOpen size={24} className="text-teal-600" />
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
                <span className="text-gray-900 font-medium">Go Practice</span>
              </nav>
            </div>

            {/* Right side */}
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
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Title Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              {/* Go gopher / code icon badge */}
              {/* <div className="flex justify-center mb-3">
                <motion.div
                  className="p-4 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 shadow-2xl"
                  initial={{ scale: 0.8, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                >
                  <Code2 size={52} className="text-white" />
                </motion.div>
              </div> */}

              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-6">
                Go Practice
              </h2>
              {/* <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Master Golang from the ground up. Learn core concepts with
                structured guidance or jump straight into hands-on coding
                exercises — from beginner to advanced.
              </p> */}
            </motion.div>

            {/* Mode Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Concepts Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group"
              >
                <Card
                  className="h-full rounded-2xl hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 border-teal-100 bg-white overflow-hidden relative"
                  onClick={() => router.push("/go-practice/concepts")}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <CardHeader className="pb-6 relative z-10">
                    <div className="flex items-center justify-center mb-6">
                      <motion.div
                        className="p-6 rounded-2xl bg-teal-500 shadow-xl"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Layers size={48} className="text-white" />
                      </motion.div>
                    </div>
                    <CardTitle className="text-2xl sm:text-3xl text-center font-bold text-gray-900 mb-2">
                      Learn Concepts
                    </CardTitle>
                    <CardDescription className="text-center text-base text-gray-600">
                      Structured Go learning with progressive levels
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6 relative z-10">
                    <p className="text-gray-700 text-center leading-relaxed">
                      Master Go step-by-step through carefully designed levels.
                      From syntax basics and data structures to concurrency,
                      interfaces, and advanced generics.
                    </p>

                    <div className="space-y-3 bg-teal-50/50 rounded-xl p-4 border border-teal-100">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center mt-0.5">
                          <CheckCircle size={14} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            Beginner Level
                          </p>
                          <p className="text-xs text-gray-600">
                            Syntax, functions, structs, error handling
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center mt-0.5">
                          <TrendingUp size={14} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            Intermediate Level
                          </p>
                          <p className="text-xs text-gray-600">
                            Goroutines, channels, interfaces, packages
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center mt-0.5">
                          <Sparkles size={14} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            Advanced Level
                          </p>
                          <p className="text-xs text-gray-600">
                            Generics, testing, profiling, patterns
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-5 text-base shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push("/go-practice/concepts");
                      }}
                    >
                      Concepts
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Exercises Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group"
              >
                <Card
                  className="h-full rounded-2xl hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 border-emerald-100 bg-white overflow-hidden relative"
                  onClick={() => router.push("/go-practice/exercises")}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-cyan-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <CardHeader className="pb-6 relative z-10">
                    <div className="flex items-center justify-center mb-6">
                      <motion.div
                        className="p-6 rounded-2xl bg-emerald-600 shadow-xl"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Terminal size={48} className="text-white" />
                      </motion.div>
                    </div>
                    <CardTitle className="text-2xl sm:text-3xl text-center font-bold text-gray-900 mb-2">
                      Code Exercises
                    </CardTitle>
                    <CardDescription className="text-center text-base text-gray-600">
                      Hands-on Go coding challenges
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6 relative z-10">
                    <p className="text-gray-700 text-center leading-relaxed">
                      Write and validate Go code for real-world scenarios.
                      Perfect for interview prep and sharpening your Golang
                      skills across all difficulty levels.
                    </p>

                    <div className="space-y-3 bg-emerald-50/50 rounded-xl p-4 border border-emerald-100">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center mt-0.5">
                          <Terminal size={14} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            Full Access
                          </p>
                          <p className="text-xs text-gray-600">
                            All exercises from beginner to advanced
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center mt-0.5">
                          <Zap size={14} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            Smart Checker
                          </p>
                          <p className="text-xs text-gray-600">
                            Static analysis checks your Go code structure
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center mt-0.5">
                          <Target size={14} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            Your Pace
                          </p>
                          <p className="text-xs text-gray-600">
                            Write Go code at your own speed and style
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-5 text-base shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push("/go-practice/exercises");
                      }}
                    >
                      Exercises
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
