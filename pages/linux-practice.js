import Head from "next/head";
import Link from "next/link";
import { Terminal, Lightbulb, MonitorPlay, ChevronRight, Lock } from "lucide-react";

export default function LinuxPractice() {
  return (
    <>
      <Head>
        <title>Linux Command Practice | Interview Nerd</title>
        <meta
          name="description"
          content="Master Linux command line with our interactive terminal exercises, tailored for SysAdmins and DevOps engineers."
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center justify-center p-3 bg-orange-100 rounded-2xl mb-6">
              <Terminal size={40} className="text-orange-600" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
              Linux Command Practice
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Master the Linux command line. From basic file navigation to advanced text processing and process management.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Concepts Path */}
            <Link href="/linux-practice/concepts" className="group">
              <div className="bg-white border border-gray-200 rounded-3xl p-8 hover:border-orange-300 hover:shadow-xl transition-all h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
                  <Lightbulb size={120} className="text-orange-600" />
                </div>
                <div className="inline-flex items-center justify-center p-4 bg-orange-50 rounded-2xl mb-6">
                  <Lightbulb size={32} className="text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Learn Concepts
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Study the core principles of Linux administration, file permissions, and process management with our detailed Study Guides.
                </p>
                <div className="flex items-center font-bold text-orange-600 group-hover:text-orange-700 mt-auto">
                  Start Learning <ChevronRight size={20} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Exercises Path */}
            <Link href="/linux-practice/exercises" className="group">
              <div className="bg-white border border-gray-200 rounded-3xl p-8 hover:border-orange-300 hover:shadow-xl transition-all h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
                  <MonitorPlay size={120} className="text-orange-600" />
                </div>
                <div className="inline-flex items-center justify-center p-4 bg-orange-50 rounded-2xl mb-6">
                  <MonitorPlay size={32} className="text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Interactive Exercises
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Test your skills directly inside our browser-based terminal emulator. Crack commands from beginner to advanced difficulty.
                </p>
                <div className="flex items-center font-bold text-orange-600 group-hover:text-orange-700 mt-auto">
                  Start Practicing <ChevronRight size={20} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>

          {/* Practice Interview Mode Teaser */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-3xl p-8 relative overflow-hidden shadow-sm">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <Lock size={24} className="text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Coming Soon: Mock Terminal Interview</h3>
                    <p className="text-gray-500 text-sm">Face a timed, stressful scenario to fix a broken server.</p>
                  </div>
                </div>
                <button
                  disabled
                  className="px-6 py-3 bg-gray-50 text-gray-400 font-bold rounded-xl cursor-not-allowed whitespace-nowrap border border-gray-200"
                >
                  Locked
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
