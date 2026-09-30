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
  Container,
} from "lucide-react";
import { motion } from "framer-motion";

export default function DockerPracticeMode() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Docker Practice - Choose Your Mode | Interview Nerd</title>
        <meta
          name="description"
          content="Choose between Concepts and Exercises modes for Docker practice"
        />
      </Head>

      {/* Header */}
      <header className="bg-surface border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and Navigation */}
            <div className="flex items-center space-x-8">
              <div
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => router.push("/")}
              >
                <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-100">
                  <BookOpen size={24} className="text-cyan-600" />
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
                  Docker Practice
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

      {/* Main Content */}
      <div className="bg-surface py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Title Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              {/* Docker whale / container icon badge */}
              {/* <div className="flex justify-center mb-6">
                <motion.div
                  className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-2xl"
                  initial={{ scale: 0.8, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                >
                  <Container size={52} className="text-white" />
                </motion.div>
              </div> */}

              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                Docker Practice
              </h2>
              {/* <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Master Docker from the ground up. Learn core concepts with
                structured guidance or jump straight into hands-on Dockerfile
                exercises.
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
                  className="h-full rounded-2xl hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 border-cyan-100 bg-surface overflow-hidden relative"
                  onClick={() => router.push("/docker-practice/concepts")}
                >
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <CardHeader className="pb-6 relative z-10">
                    <div className="flex items-center justify-center mb-6">
                      <motion.div
                        className="p-6 rounded-2xl bg-cyan-500 shadow-xl"
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
                      Structured Docker learning with progressive levels
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6 relative z-10">
                    <p className="text-gray-700 text-center leading-relaxed">
                      Master Docker step-by-step through carefully designed
                      levels. From images and containers to networking and
                      orchestration.
                    </p>

                    <div className="space-y-3 bg-cyan-50/50 rounded-xl p-4 border border-cyan-100">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-600 flex items-center justify-center mt-0.5">
                          <CheckCircle size={14} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            Beginner Level
                          </p>
                          <p className="text-xs text-gray-600">
                            Images, containers, basic commands
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-600 flex items-center justify-center mt-0.5">
                          <TrendingUp size={14} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            Intermediate Level
                          </p>
                          <p className="text-xs text-gray-600">
                            Volumes, networking, Docker Compose
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-600 flex items-center justify-center mt-0.5">
                          <Sparkles size={14} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            Advanced Level
                          </p>
                          <p className="text-xs text-gray-600">
                            Multi-stage builds, optimisation, orchestration
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full mt-6 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-5 text-base shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push("/docker-practice/concepts");
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
                  className="h-full rounded-2xl hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 border-blue-100 bg-surface overflow-hidden relative"
                  onClick={() => router.push("/docker-practice/exercises")}
                >
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <CardHeader className="pb-6 relative z-10">
                    <div className="flex items-center justify-center mb-6">
                      <motion.div
                        className="p-6 rounded-2xl bg-blue-600 shadow-xl"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Terminal size={48} className="text-white" />
                      </motion.div>
                    </div>
                    <CardTitle className="text-2xl sm:text-3xl text-center font-bold text-gray-900 mb-2">
                      Dockerfile Exercises
                    </CardTitle>
                    <CardDescription className="text-center text-base text-gray-600">
                      Hands-on Dockerfile writing challenges
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6 relative z-10">
                    <p className="text-gray-700 text-center leading-relaxed">
                      Write and validate Dockerfiles for real-world scenarios.
                      Perfect for interview prep and sharpening your container
                      skills.
                    </p>

                    <div className="space-y-3 bg-blue-50/50 rounded-xl p-4 border border-blue-100">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mt-0.5">
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
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mt-0.5">
                          <Zap size={14} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            No Restrictions
                          </p>
                          <p className="text-xs text-gray-600">
                            Practice any exercise without prerequisites
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mt-0.5">
                          <Target size={14} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            Your Pace
                          </p>
                          <p className="text-xs text-gray-600">
                            Write Dockerfiles at your own speed and style
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full mt-6 bg-brand hover:bg-brand/90 text-neutral-950 font-semibold py-5 text-base shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push("/docker-practice/exercises");
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
