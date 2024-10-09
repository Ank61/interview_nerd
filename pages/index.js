import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import react from "../images/react.png";
import next from "../images/next.png";
import node from "../images/node_logo.png";
import js from "../images/js_logo.png";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="flex-grow container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">TechPrep</h1>
          <Button variant="outline">Sign In</Button>
        </nav>
      </header>

      <main className=" flex-grow container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Ace Your Tech Interviews
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Comprehensive preparation for JavaScript, React, Node.js, and
            Next.js interviews
          </p>
          {/* <Button
            size="lg"
            className="bg-gray-900 text-white hover:bg-gray-800"
          >
            Start Preparing <ArrowRight className="ml-2" />
          </Button> */}
        </section>

        <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-4 justify-items-center content-center mx-auto mt-10">
          <motion.div
            whileHover={{ boxShadow: "0px 10px 30px rgba(236, 238, 200, 0.8)" }}
            whileTap={{ boxShadow: "0px 10px 30px rgba(236, 238, 200, 0.8)" }}
            transition={{ duration: 0.3 }}
            onClick={() => router.push("/category/Javascript")}
            className="rounded-xl sm:mb-0 sm:flex-none sm:w-auto mb-4 rounded-2xl w-4/6 flex justify-center items-center"
          >
            <Card className="w-[350px] bg-yellow-50 border-yellow-50 cursor-pointer rounded-xl">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-white rounded-xl p-2">
                  <Image src={js} width={40} height={40} alt="Javascript" />
                </div>
                <CardTitle className="pt-3">Javascript</CardTitle>
              </CardHeader>
              <CardContent className="font-medium text-yellow-600 text-md flex justify-center items-center">
                {" "}
                + 52 questions
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            whileHover={{ boxShadow: "0px 10px 30px rgba(233, 233, 233, 0.8)" }}
            whileTap={{ boxShadow: "0px 10px 30px rgba(233, 233, 233, 0.8)" }}
            transition={{ duration: 0.3 }}
            className="rounded-xl sm:mb-0 sm:flex-none sm:w-auto mb-4 rounded-2xl w-4/6 flex justify-center items-center"
          >
            <Card className="w-[350px] bg-gray-50 border-gray-50 cursor-pointer rounded-xl">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-white rounded-xl p-2">
                  <Image src={next} width={65} height={65} alt="Next"></Image>
                </div>
                <CardTitle className="pt-3">Next.js</CardTitle>
              </CardHeader>
              <CardContent className="font-medium text-slate-500 text-md flex justify-center items-center">
                + 64 questions
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            whileHover={{ boxShadow: "0px 10px 30px rgba(206, 241, 248, 0.8)" }}
            transition={{ duration: 0.3 }}
            whileTap={{ boxShadow: "0px 10px 30px rgba(206, 241, 248, 0.8)" }}
            className="rounded-xl sm:mb-0 sm:flex-none sm:w-auto mb-4 rounded-2xl w-4/6 flex justify-center items-center"
          >
            <Card className="w-[350px] bg-cyan-50 border-cyan-50 cursor-pointer rounded-xl">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-white rounded-xl p-2">
                  <Image src={react} width={40} height={40} alt="React" />
                </div>
                <CardTitle className="pt-3">React.js</CardTitle>
              </CardHeader>
              <CardContent className="text-cyan-600 font-medium text-md flex justify-center items-center">
                {" "}
                + 40 questions
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            whileHover={{ boxShadow: "0px 10px 30px rgba(207, 242, 218, 0.8)" }}
            transition={{ duration: 0.3 }}
            whileTap={{ boxShadow: "0px 10px 30px rgba(207, 242, 218, 0.8)" }}
            className="rounded-xl sm:mb-0 sm:flex-none sm:w-auto mb-4 rounded-2xl w-4/6 flex justify-center items-center"
          >
            <Card className="w-[350px] bg-emerald-50 border-emerald-50 cursor-pointer rounded-xl">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-white rounded-xl p-2">
                  <Image src={node} width={60} height={60} alt="Node"></Image>
                </div>
                <CardTitle className="pt-3">Node.js</CardTitle>
              </CardHeader>
              <CardContent className="text-emerald-600 font-medium text-md flex justify-center items-center">
                {" "}
                + 52 questions
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      <footer className="container mx-auto px-4 py-8 mt-12 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 mb-4 md:mb-0">
            &copy; 2024 TechPrep. All rights reserved.
          </p>
          <nav className="space-x-4">
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Contact
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
