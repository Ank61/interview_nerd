import * as React from "react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import {
  Code2,
  GraduationCap,
  Zap,
  ArrowRight,
  CheckCircle,
  Sparkles,
  TrendingUp,
  ArrowLeft,
  ArrowUpRight,
  Target,
} from "lucide-react";
import {
  PageShell,
  SiteNav,
  SplitTitle,
  trackSpotlight,
  usePageMotion,
} from "@/components/landing/shared";

export default function PythonPractice() {
  const { status } = useSession();
  const rootRef = React.useRef(null);
  const isLoading = status === "loading";

  usePageMotion(rootRef, [isLoading]);

  return (
    <PageShell ref={rootRef}>
      <Head>
        <title>Python Practice - Interview Nerd</title>
        <meta
          name="description"
          content="Practice Python programming with interactive exercises"
        />
      </Head>

      <SiteNav
        crumbs={[
          { label: "Topics", href: "/#categories" },
          { label: "Python Practice" },
        ]}
      />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pb-10 pt-24 md:pb-14 md:pt-28">
          <div
            className="grid-bg pointer-events-none absolute inset-0"
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
            <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-neutral-50">
              <span className="block">
                <SplitTitle text="Python" />
              </span>
              <span className="block">
                <SplitTitle text="Practice" accent />
              </span>
            </h1>

            <p className="hero-fade mt-6 max-w-xl text-lg leading-relaxed text-neutral-400">
              Master Python programming with our interactive exercises and
              challenges.
            </p>
          </div>
        </section>

        {/* Mode Cards */}
        <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Path Learning Card */}
            <Link
              href="/python-practice/path-learning"
              onMouseMove={trackSpotlight}
              className="spotlight group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 transition-all duration-300 hover:border-white/20 hover:shadow-2xl"
            >
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4FF4F]">
                    <GraduationCap className="h-7 w-7 text-neutral-950" />
                  </div>
                  <ArrowUpRight className="h-6 w-6 text-neutral-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-100" />
                </div>

                <h2 className="text-2xl font-semibold tracking-tight text-neutral-50 mb-2">
                  Learn Concepts
                </h2>
                <p className="text-sm leading-relaxed text-neutral-400 mb-6">
                  Structured learning with progressive topics
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4FF4F] flex items-center justify-center mt-0.5">
                      <CheckCircle size={14} className="text-neutral-950" />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-50 text-sm">
                        Fundamentals
                      </p>
                      <p className="text-xs text-neutral-400">
                        Syntax, variables, control flow, functions
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4FF4F] flex items-center justify-center mt-0.5">
                      <TrendingUp size={14} className="text-neutral-950" />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-50 text-sm">
                        Data Structures
                      </p>
                      <p className="text-xs text-neutral-400">
                        Lists, dicts, sets, tuples, comprehensions
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4FF4F] flex items-center justify-center mt-0.5">
                      <Sparkles size={14} className="text-neutral-950" />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-50 text-sm">
                        Advanced Concepts
                      </p>
                      <p className="text-xs text-neutral-400">
                        OOP, modules, error handling, file I/O
                      </p>
                    </div>
                  </div>
                </div>

                <button className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#D4FF4F] px-6 py-3 text-sm font-semibold text-neutral-950 transition-shadow hover:shadow-[0_0_30px_-6px_rgba(212,255,79,0.6)]">
                  Concepts
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </Link>

            {/* Testing Card */}
            <Link
              href="/python-practice/testing"
              onMouseMove={trackSpotlight}
              className="spotlight group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 transition-all duration-300 hover:border-white/20 hover:shadow-2xl"
            >
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4FF4F]">
                    <Zap className="h-7 w-7 text-neutral-950" />
                  </div>
                  <ArrowUpRight className="h-6 w-6 text-neutral-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-100" />
                </div>

                <h2 className="text-2xl font-semibold tracking-tight text-neutral-50 mb-2">
                  Practice Questions
                </h2>
                <p className="text-sm leading-relaxed text-neutral-400 mb-6">
                  Practice any question without restrictions
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4FF4F] flex items-center justify-center mt-0.5">
                      <Target size={14} className="text-neutral-950" />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-50 text-sm">
                        Full Access
                      </p>
                      <p className="text-xs text-neutral-400">
                        All questions from beginner to advanced
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4FF4F] flex items-center justify-center mt-0.5">
                      <Zap size={14} className="text-neutral-950" />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-50 text-sm">
                        No Restrictions
                      </p>
                      <p className="text-xs text-neutral-400">
                        No category requirements or prerequisites
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4FF4F] flex items-center justify-center mt-0.5">
                      <TrendingUp size={14} className="text-neutral-950" />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-50 text-sm">
                        Your Pace
                      </p>
                      <p className="text-xs text-neutral-400">
                        Focus on areas you want to strengthen
                      </p>
                    </div>
                  </div>
                </div>

                <button className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#D4FF4F] px-6 py-3 text-sm font-semibold text-neutral-950 transition-shadow hover:shadow-[0_0_30px_-6px_rgba(212,255,79,0.6)]">
                  Questions
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </Link>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
// import { motion } from "framer-motion";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Code2, GraduationCap, Zap, User, Settings, BookOpen, Target, ArrowRight } from "lucide-react";

// export default function PythonPractice() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/auth/login");
//     }
//   }, [status, router]);

//   if (status === "loading") {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
//           <p className="text-white font-medium">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Head>
//         <title>Python Practice - Interview Nerd</title>
//         <meta name="description" content="Practice Python programming with interactive exercises" />
//       </Head>

//       {/* Header */}
//       <header className="bg-surface border-b border-gray-200 shadow-sm sticky top-0 z-50">
//       <header className="bg-surface border-b border-gray-200 shadow-sm sticky top-0 z-50">
//         <div className="w-full px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center space-x-8">
//               <div
//                 className="flex items-center space-x-3 cursor-pointer"
//                 onClick={() => router.push("/")}
//               >
//                 <div className="p-2 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
//                   <Code2 size={24} className="text-brand" />
//                   <Code2 size={24} className="text-brand" />
//                 </div>
//                 <div>
//                   <h1 className="hidden lg:block text-xl font-bold text-gray-900">
//                     Interview Nerd
//                   </h1>
//                 </div>
//               </div>

//               <nav className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
//                 <button onClick={() => router.push("/")} className="hover:text-gray-700 transition-colors">
//                   Home
//                 </button>
//                 <span>/</span>
//                 <span className="text-gray-900 font-medium">Python Practice</span>
//               </nav>
//             </div>

//             <div className="flex items-center space-x-4">
//               <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
//                 <User size={20} className="text-gray-600" />
//               </button>
//               <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
//                 <Settings size={20} className="text-gray-600" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="container mx-auto px-4 py-8 max-w-7xl">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-12 text-center"
//         >
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">Python Practice</h1>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Master Python programming with our interactive exercises and challenges.
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
//           {/* Path Learning Card */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//             whileHover={{ scale: 1.02, y: -5 }}
//             className="group"
//           >
//             <Card
//               className="h-full rounded-2xl hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 border-blue-100 bg-surface overflow-hidden relative"
//               className="h-full rounded-2xl hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 border-blue-100 bg-surface overflow-hidden relative"
//               onClick={() => router.push("/python-practice/path-learning")}
//             >
//               <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               <CardHeader className="pb-6 relative z-10">
//                 <div className="flex items-center justify-center mb-6">
//                   <motion.div
//                     className="p-6 rounded-2xl bg-blue-500 shadow-xl"
//                     whileHover={{ scale: 1.1, rotate: 5 }}
//                     transition={{ type: "spring", stiffness: 300 }}
//                   >
//                     <GraduationCap size={48} className="text-white" />
//                   </motion.div>
//                 </div>
//                 <CardTitle className="text-2xl sm:text-3xl text-center font-bold text-gray-900 mb-2">
//                   Learn Concepts
//                 </CardTitle>
//                 <CardDescription className="text-center text-base text-gray-600">
//                   Structured learning with progressive topics
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6 relative z-10">
//                 <p className="text-gray-700 text-center leading-relaxed">
//                   Learn Python step by step through carefully organized topics. Track your progress and build expertise systematically.
//                 </p>
//                 <Button
//                   className="w-full mt-6 bg-brand hover:bg-brand/90 text-neutral-950 font-semibold py-5 text-base shadow-lg hover:shadow-xl transition-all duration-300"
//                   className="w-full mt-6 bg-brand hover:bg-brand/90 text-neutral-950 font-semibold py-5 text-base shadow-lg hover:shadow-xl transition-all duration-300"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     router.push("/python-practice/path-learning");
//                   }}
//                 >
//                   Concepts
//                   <ArrowRight className="ml-2 w-5 h-5" />
//                 </Button>
//               </CardContent>
//             </Card>
//           </motion.div>

//           {/* Testing Card */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             whileHover={{ scale: 1.02, y: -5 }}
//             className="group"
//           >
//             <Card
//               className="h-full rounded-2xl hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 border-purple-100 bg-surface overflow-hidden relative"
//               className="h-full rounded-2xl hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 border-purple-100 bg-surface overflow-hidden relative"
//               onClick={() => router.push("/python-practice/testing")}
//             >
//               <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               <CardHeader className="pb-6 relative z-10">
//                 <div className="flex items-center justify-center mb-6">
//                   <motion.div
//                     className="p-6 rounded-2xl bg-purple-500 shadow-xl"
//                     whileHover={{ scale: 1.1, rotate: 5 }}
//                     transition={{ type: "spring", stiffness: 300 }}
//                   >
//                     <Zap size={48} className="text-white" />
//                   </motion.div>
//                 </div>
//                 <CardTitle className="text-2xl sm:text-3xl text-center font-bold text-gray-900 mb-2">
//                   Practice Questions
//                 </CardTitle>
//                 <CardDescription className="text-center text-base text-gray-600">
//                   Practice any question without restrictions
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6 relative z-10">
//                 <p className="text-gray-700 text-center leading-relaxed">
//                   Challenge yourself with practice tests that simulate real-world scenarios and interview questions.
//                 </p>
//                 <Button
//                   className="w-full mt-6 bg-brand hover:bg-brand/90 text-neutral-950 font-semibold py-5 text-base shadow-lg hover:shadow-xl transition-all duration-300"
//                   className="w-full mt-6 bg-brand hover:bg-brand/90 text-neutral-950 font-semibold py-5 text-base shadow-lg hover:shadow-xl transition-all duration-300"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     router.push("/python-practice/testing");
//                   }}
//                 >
//                   Questions
//                   <ArrowRight className="ml-2 w-5 h-5" />
//                 </Button>
//               </CardContent>
//             </Card>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }
