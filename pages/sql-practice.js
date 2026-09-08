import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Database,
  GraduationCap,
  Target,
  ArrowRight,
  BookOpen,
  User,
  Settings,
  Sparkles,
  TrendingUp,
  CheckCircle,
  Zap,
} from "lucide-react";

export default function SQLPracticeMode() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col bg-[#FAFAFA] text-gray-900 font-sans overflow-hidden selection:bg-indigo-100">
      <Head>
        <title>SQL Practice - Choose Your Mode | Interview Nerd</title>
        <meta name="description" content="Choose between Path Learning and Testing modes for SQL practice" />
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
            <BookOpen size={14} className="text-indigo-600" />
            <h1 className="text-sm font-semibold truncate">SQL Practice</h1>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Practice Mode</h2>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            Select how you want to practice SQL. Path Learning offers structured progression, while Testing Mode lets you practice freely.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {/* 1. Path Learning Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -2 }}
            className="group cursor-pointer flex flex-col h-full bg-white border border-gray-200/80 rounded-xl hover:border-indigo-300 hover:shadow-[0_4px_20px_-4px_rgba(99,102,241,0.1)] transition-all overflow-hidden"
            onClick={() => router.push("/sql-practice/path-learning")}
          >
            <div className="p-6 flex-1 flex flex-col">
              <div className="w-10 h-10 rounded bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-4 text-indigo-600 group-hover:scale-105 transition-transform">
                <GraduationCap size={20} />
              </div>
              <h3 className="text-lg font-bold mb-2">Learn Concepts</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-6">
                Master SQL step-by-step through carefully designed levels. Complete each level to unlock the next and track your progress.
              </p>

              <div className="space-y-3 mt-auto">
                <div className="flex items-start gap-3">
                  <CheckCircle size={14} className="text-indigo-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-gray-900">Beginner Level</p>
                    <p className="text-[11px] text-gray-500">Learn basic SELECT, WHERE, and ORDER BY</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp size={14} className="text-indigo-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-gray-900">Intermediate Level</p>
                    <p className="text-[11px] text-gray-500">Master JOINs and GROUP BY operations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles size={14} className="text-indigo-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-gray-900">Advanced Level</p>
                    <p className="text-[11px] text-gray-500">Complex queries and subqueries</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-12 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between px-6 group-hover:bg-indigo-50/50 transition-colors">
              <span className="text-xs font-semibold text-indigo-700">Start Concepts</span>
              <ArrowRight size={14} className="text-indigo-600 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* 2. Testing Mode Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -2 }}
            className="group cursor-pointer flex flex-col h-full bg-white border border-gray-200/80 rounded-xl hover:border-pink-300 hover:shadow-[0_4px_20px_-4px_rgba(236,72,153,0.1)] transition-all overflow-hidden"
            onClick={() => router.push("/sql-practice/testing")}
          >
            <div className="p-6 flex-1 flex flex-col">
              <div className="w-10 h-10 rounded bg-pink-50 border border-pink-100 flex items-center justify-center mb-4 text-pink-600 group-hover:scale-105 transition-transform">
                <Target size={20} />
              </div>
              <h3 className="text-lg font-bold mb-2">Practice Questions</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-6">
                Practice any question at any time. Perfect for testing your skills and preparing for interviews without restrictions.
              </p>

              <div className="space-y-3 mt-auto">
                <div className="flex items-start gap-3">
                  <Database size={14} className="text-pink-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-gray-900">Full Access</p>
                    <p className="text-[11px] text-gray-500">All questions from beginner to advanced</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap size={14} className="text-pink-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-gray-900">No Restrictions</p>
                    <p className="text-[11px] text-gray-500">No level requirements or prerequisites</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp size={14} className="text-pink-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-gray-900">Your Pace</p>
                    <p className="text-[11px] text-gray-500">Practice at your own speed and style</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-12 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between px-6 group-hover:bg-pink-50/50 transition-colors">
              <span className="text-xs font-semibold text-pink-700">Start Questions</span>
              <ArrowRight size={14} className="text-pink-600 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}