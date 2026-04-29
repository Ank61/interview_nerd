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
  HardDrive,
  Globe,
  Lock,
} from "lucide-react";
import { motion } from "framer-motion";

export default function LinuxPracticeMode() {
  const { data: session } = useSession();
  const router = useRouter();

  const highlights = [
    { icon: Terminal, label: "9 Concept Modules", desc: "From navigation to disk management" },
    { icon: Globe, label: "Networking & SSH", desc: "Real-world sysadmin scenarios" },
    { icon: HardDrive, label: "32+ Exercises", desc: "Beginner to advanced" },
    { icon: Lock, label: "Security Focus", desc: "Permissions, keys & hardening" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Linux Practice - Choose Your Mode | Interview Nerd</title>
        <meta
          name="description"
          content="Master Linux command line with interactive exercises and concept guides. Perfect for DevOps and SysAdmin interview prep."
        />
      </Head>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and Navigation */}
            <div className="flex items-center space-x-8">
              <div
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => router.push("/")}
              >
                <div className="p-2 rounded-lg bg-gradient-to-br from-green-50 to-lime-50 border border-green-100">
                  <BookOpen size={24} className="text-green-600" />
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
                  Linux Practice
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
              <div className="flex justify-center mb-6">
                <motion.div
                  className="p-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-2xl"
                  initial={{ scale: 0.8, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                >
                  <Terminal size={48} className="text-white" />
                </motion.div>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
                Linux Practice
              </h2>
              <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
                Master the Linux command line — from basic navigation to system administration, shell scripting, networking, and beyond.
              </p>
            </motion.div>

            {/* Highlight Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
            >
              {highlights.map((h, i) => (
                <div
                  key={i}
                  className="bg-green-50/60 border border-green-100 rounded-xl p-4 flex items-start gap-3"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center mt-0.5">
                    <h.icon size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{h.label}</p>
                    <p className="text-xs text-gray-500">{h.desc}</p>
                  </div>
                </div>
              ))}
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
                  className="h-full rounded-2xl hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 border-green-100 bg-white overflow-hidden relative"
                  onClick={() => router.push("/linux-practice/concepts")}
                >
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <CardHeader className="pb-6 relative z-10">
                    <div className="flex items-center justify-center mb-6">
                      <motion.div
                        className="p-6 rounded-2xl bg-green-600 shadow-xl"
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
                      Structured Linux learning with progressive modules
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6 relative z-10">
                    <p className="text-gray-700 text-center leading-relaxed">
                      Study Linux systematically — from file navigation and permissions
                      to shell scripting, networking, SSH, and disk management.
                    </p>

                    <div className="space-y-3 bg-green-50/50 rounded-xl p-4 border border-green-100">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 flex items-center justify-center mt-0.5">
                          <CheckCircle size={14} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            Foundation Topics
                          </p>
                          <p className="text-xs text-gray-600">
                            Navigation, permissions, text processing, processes
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 flex items-center justify-center mt-0.5">
                          <TrendingUp size={14} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            Intermediate Topics
                          </p>
                          <p className="text-xs text-gray-600">
                            Shell scripting, networking, package management
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 flex items-center justify-center mt-0.5">
                          <Sparkles size={14} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            Advanced Topics
                          </p>
                          <p className="text-xs text-gray-600">
                            SSH tunnels, disk management, system hardening
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-5 text-base shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push("/linux-practice/concepts");
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
                  onClick={() => router.push("/linux-practice/exercises")}
                >
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

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
                      Command Exercises
                    </CardTitle>
                    <CardDescription className="text-center text-base text-gray-600">
                      Hands-on terminal challenges with instant feedback
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6 relative z-10">
                    <p className="text-gray-700 text-center leading-relaxed">
                      Write real Linux commands in an interactive terminal emulator.
                      Perfect for interview prep and building command-line muscle memory.
                    </p>

                    <div className="space-y-3 bg-emerald-50/50 rounded-xl p-4 border border-emerald-100">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center mt-0.5">
                          <Terminal size={14} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            32+ Exercises
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
                            Instant Feedback
                          </p>
                          <p className="text-xs text-gray-600">
                            Know immediately if your command is correct
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center mt-0.5">
                          <Target size={14} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            Interview Questions
                          </p>
                          <p className="text-xs text-gray-600">
                            Each exercise includes related interview Q&amp;As
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-5 text-base shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push("/linux-practice/exercises");
                      }}
                    >
                      Exercises
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Topics Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="bg-gradient-to-br from-gray-50 to-green-50/30 rounded-2xl border border-gray-200 p-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                What You&apos;ll Learn
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: "Navigation & Files", icon: "📁", desc: "ls, cd, cp, mv, rm, mkdir" },
                  { title: "Text Processing", icon: "📝", desc: "grep, sed, awk, cut, sort" },
                  { title: "Processes & Monitoring", icon: "📊", desc: "ps, top, kill, free, htop" },
                  { title: "Permissions", icon: "🔐", desc: "chmod, chown, chgrp, sudo" },
                  { title: "Shell Scripting", icon: "⚡", desc: "Variables, loops, functions, args" },
                  { title: "Networking", icon: "🌐", desc: "ss, nc, ip, traceroute, curl" },
                  { title: "SSH & Remote", icon: "🔑", desc: "ssh, scp, rsync, tunneling" },
                  { title: "Package Management", icon: "📦", desc: "apt, dpkg, snap, yum, dnf" },
                  { title: "Disk & Storage", icon: "💿", desc: "df, du, lsblk, fdisk, mount" },
                ].map((topic, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
                    <span className="text-2xl">{topic.icon}</span>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{topic.title}</p>
                      <p className="text-xs text-gray-500">{topic.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
