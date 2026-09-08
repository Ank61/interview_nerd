import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Terminal,
  CheckCircle,
  TrendingUp,
  Sparkles,
  Zap,
  Target,
  ArrowRight,
  User,
  Settings,
  Layers,
} from "lucide-react";

export default function GoPracticeMode() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col bg-[#FAFAFA] text-gray-900 font-sans overflow-hidden selection:bg-teal-100">
      <Head>
        <title>Go Practice - Choose Your Mode | Interview Nerd</title>
      </Head>

      {/* ── Top Navigation Bar (Slim) ── */}
      <header className="h-12 flex items-center justify-between px-4 border-b border-gray-200/60 bg-white shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/")}
            className="group flex items-center text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={14} className="mr-1.5 group-hover:-translate-x-1 transition-transform" />
            Home
          </button>
          <div className="h-4 w-px bg-gray-200"></div>
          <div className="flex items-center gap-2">
            <BookOpen size={14} className="text-teal-600" />
            <h1 className="text-sm font-semibold truncate">Go Practice</h1>
          </div>
        </div>
        <div className="flex items-center space-x-3 text-gray-400">
          <button className="hover:text-gray-900 transition-colors">
            <User size={14} />
          </button>
          <button className="hover:text-gray-900 transition-colors">
            <Settings size={14} />
          </button>
        </div>
      </header>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Practice Mode</h2>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            Choose your learning path. Study core Go concepts systematically or jump straight into hands-on coding challenges.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {/* 1. Concepts Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -2 }}
            className="group cursor-pointer flex flex-col h-full bg-white border border-gray-200/80 rounded-xl hover:border-teal-300 hover:shadow-[0_4px_20px_-4px_rgba(20,184,166,0.1)] transition-all overflow-hidden"
            onClick={() => router.push("/go-practice/concepts")}
          >
            <div className="p-6 flex-1 flex flex-col">
              <div className="w-10 h-10 rounded bg-teal-50 border border-teal-100 flex items-center justify-center mb-4 text-teal-600 group-hover:scale-105 transition-transform">
                <Layers size={20} />
              </div>
              <h3 className="text-lg font-bold mb-2">Learn Concepts</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-6">
                Master Go step-by-step through carefully designed levels. From syntax basics and data structures to concurrency and interfaces.
              </p>

              <div className="space-y-3 mt-auto">
                <div className="flex items-start gap-3">
                  <CheckCircle size={14} className="text-teal-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-gray-900">Beginner Level</p>
                    <p className="text-[11px] text-gray-500">Syntax, functions, structs, error handling</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp size={14} className="text-teal-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-gray-900">Intermediate Level</p>
                    <p className="text-[11px] text-gray-500">Goroutines, channels, interfaces, packages</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles size={14} className="text-teal-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-gray-900">Advanced Level</p>
                    <p className="text-[11px] text-gray-500">Generics, testing, profiling, patterns</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-12 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between px-6 group-hover:bg-teal-50/50 transition-colors">
              <span className="text-xs font-semibold text-teal-700">Start Concepts</span>
              <ArrowRight size={14} className="text-teal-600 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* 2. Exercises Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -2 }}
            className="group cursor-pointer flex flex-col h-full bg-[#0D0D0D] border border-gray-800 rounded-xl hover:border-emerald-500/50 hover:shadow-[0_4px_20px_-4px_rgba(16,185,129,0.1)] transition-all overflow-hidden"
            onClick={() => router.push("/go-practice/exercises")}
          >
            <div className="p-6 flex-1 flex flex-col">
              <div className="w-10 h-10 rounded bg-[#1A1A1A] border border-gray-700 flex items-center justify-center mb-4 text-emerald-400 group-hover:scale-105 transition-transform">
                <Terminal size={20} />
              </div>
              <h3 className="text-lg font-bold text-gray-100 mb-2">Code Exercises</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                Write and validate Go code for real-world scenarios. Perfect for interview prep and sharpening your Golang skills.
              </p>

              <div className="space-y-3 mt-auto">
                <div className="flex items-start gap-3">
                  <Terminal size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-gray-200">Full Access</p>
                    <p className="text-[11px] text-gray-500">All exercises from beginner to advanced</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-gray-200">Smart Checker</p>
                    <p className="text-[11px] text-gray-500">Static analysis checks your Go code structure</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Target size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-gray-200">Your Pace</p>
                    <p className="text-[11px] text-gray-500">Write Go code at your own speed and style</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-12 border-t border-gray-800 bg-[#161616] flex items-center justify-between px-6 group-hover:bg-emerald-950/20 transition-colors">
              <span className="text-xs font-semibold text-emerald-400">Start Exercises</span>
              <ArrowRight size={14} className="text-emerald-500 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}