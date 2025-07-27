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
import { ArrowRight, Star, Users, BookOpen, TrendingUp } from "lucide-react";
import { useSession, signOut } from "next-auth/react";


export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  return (
    <div className="min-h-screen bg-white flex flex-col text-gray-900">
      <header className="relative w-full bg-gradient-to-b from-blue-50 to-white border-b border-blue-100">
        <nav className="absolute top-0 left-0 w-full bg-transparent z-50">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg width="32" height="32" fill="none" viewBox="0 0 48 48" className="text-blue-600"><circle cx="24" cy="24" r="24" fill="#2563eb" fillOpacity="0.08"/><path d="M24 14v12l8 4" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span className="font-bold text-lg text-gray-900">Interview Nerd</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              <a href="#features" className="text-gray-700 hover:text-blue-700 transition">Features</a>
              <a href="#categories" className="text-gray-700 hover:text-blue-700 transition">Categories</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-700 transition">Testimonials</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-700 transition">Contact</a>
              {session ? (
                <>
                  {/* <div className="flex items-center gap-2">
                    {session.user?.image && (
                      <img src={session.user.image} alt={session.user.name || "User"} className="w-7 h-7 rounded-full border" />
                    )}
                    <span className="text-gray-700 font-semibold">{session.user?.name || session.user?.email}</span>
                  </div> */}
                  <Button size="sm" className="bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 transition shadow-md" onClick={() => signOut({ callbackUrl: "/" })}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="text-gray-700 hover:text-blue-700 transition">Login</Link>
                  <Link href="/auth/signup" className="text-gray-700 hover:text-blue-700 transition">Signup</Link>
                </>
              )}
            </div>
          </div>
        </nav>
        <div className="container mx-auto px-4 pt-32 pb-20 flex flex-col items-center text-center relative z-10">
          <span className="uppercase tracking-widest text-xs text-blue-700 font-semibold mb-4">Ace Your Next Interview</span>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
            <svg width="48" height="48" fill="none" viewBox="0 0 48 48" className="hidden md:block text-blue-600"><circle cx="24" cy="24" r="24" fill="#2563eb" fillOpacity="0.08"/><path d="M24 14v12l8 4" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">Interview Nerd</h1>
          </div>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">Your professional companion for mastering tech interviews. Curated questions, real scenarios, and expert guidance for JavaScript, React, Node.js, and Next.js.</p>
          <Button size="lg" className="bg-blue-600 text-white font-semibold px-8 py-3 rounded hover:bg-blue-700 transition shadow-md">
            Start Preparing <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
        <div className="absolute inset-0 pointer-events-none z-0">
          <svg width="100%" height="100" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-24 md:h-32">
            <path fill="#eff6ff" d="M0,32L48,53.3C96,75,192,117,288,117.3C384,117,480,75,576,74.7C672,75,768,117,864,117.3C960,117,1056,75,1152,69.3C1248,64,1344,96,1392,112L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
          </svg>
        </div>
      </header>

      {/* Tech Stacks (Category Cards) - Centered Section */}
      <main id="categories" className="container mx-auto px-4 py-24 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-8 text-center">Choose Your Tech Stack</h2>
        <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-8 justify-items-center content-center mx-auto">
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
      </main>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col items-center shadow-sm">
          <Star className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="font-semibold text-base mb-2">Curated Questions</h3>
          <p className="text-gray-500 text-center text-sm">Handpicked questions for all major tech stacks and interview rounds.</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col items-center shadow-sm">
          <BookOpen className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="font-semibold text-base mb-2">Real-World Scenarios</h3>
          <p className="text-gray-500 text-center text-sm">Practice with scenarios and problems from top companies.</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col items-center shadow-sm">
          <TrendingUp className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="font-semibold text-base mb-2">Track Progress</h3>
          <p className="text-gray-500 text-center text-sm">Monitor your improvement and focus on your weak spots.</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col items-center shadow-sm">
          <Users className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="font-semibold text-base mb-2">Community Insights</h3>
          <p className="text-gray-500 text-center text-sm">Get tips and experiences from successful candidates and experts.</p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="container mx-auto px-4 py-16">
        <h3 className="text-xl font-bold text-center mb-8">What Our Users Say</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col items-center">
            <p className="text-gray-700 italic mb-4">“The questions are spot on and the explanations are super clear. Helped me land my dream job!”</p>
            <span className="font-semibold text-blue-700">Priya S.<span className="block text-xs text-gray-500 font-normal">Frontend Engineer</span></span>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col items-center">
            <p className="text-gray-700 italic mb-4">“I love the real-world scenarios. It’s like practicing for the real thing!”</p>
            <span className="font-semibold text-blue-700">Alex T.<span className="block text-xs text-gray-500 font-normal">Full Stack Developer</span></span>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col items-center">
            <p className="text-gray-700 italic mb-4">“The progress tracking kept me motivated. Highly recommend!”</p>
            <span className="font-semibold text-blue-700">Samir K.<span className="block text-xs text-gray-500 font-normal">Software Engineer</span></span>
          </div>
        </div>
      </section>

      {/* Strong CTA Section */}
      <section className="container mx-auto px-4 py-12 flex flex-col items-center text-center">
        <h3 className="text-2xl font-bold mb-4">Ready to Ace Your Interview?</h3>
        <p className="text-base text-gray-600 mb-6">Join thousands of users preparing for their dream job with Interview Nerd.</p>
        <Button size="lg" className="bg-blue-600 text-white font-semibold px-8 py-3 rounded hover:bg-blue-700 transition">
          Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-12 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 mb-4 md:mb-0">&copy; 2024 Interview Nerd. All rights reserved.</p>
          <nav className="space-x-4 flex items-center">
            <Link href="#" className="text-gray-500 hover:text-blue-700">About</Link>
            <Link href="#" className="text-gray-500 hover:text-blue-700">Contact</Link>
            <Link href="#" className="text-gray-500 hover:text-blue-700">Privacy Policy</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
