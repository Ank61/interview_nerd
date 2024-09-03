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

export default function Home() {
  return (
    <div>
      <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-4 justify-items-center content-center mx-auto sm:mx:10">
        <motion.div
          whileHover={{ boxShadow: "0px 10px 30px rgba(236, 238, 200, 0.8)" }}
          whileTap={{ boxShadow: "0px 10px 30px rgba(236, 238, 200, 0.8)" }}
          transition={{ duration: 0.3 }}
          className="rounded-xl sm: mb-4 rounded-2xl w-4/6 flex justify-center items-center"
        >
          <Card className="w-[350px] bg-yellow-50 border-yellow-50 cursor-pointer rounded-xl">
            <CardHeader className="flex justify-center items-center">
              <div className="bg-white rounded-xl p-2">
                <Image src={js} width={40} height={40} alt="Javascript" />
              </div>
              <CardTitle className="pt-3">ES6 Javascript</CardTitle>
            </CardHeader>
            <CardContent className="font-medium text-yellow-500 text-md flex justify-center items-center">
              {" "}
              + 52 questions
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          whileHover={{ boxShadow: "0px 10px 30px rgba(233, 233, 233, 0.8)" }}
          whileTap={{ boxShadow: "0px 10px 30px rgba(233, 233, 233, 0.8)" }}
          transition={{ duration: 0.3 }}
          className="rounded-xl sm: mb-4 rounded-2xl w-4/6 flex justify-center items-center"
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
          className="rounded-xl sm: mb-4 rounded-2xl w-4/6 flex justify-center items-center"
        >
          <Card className="w-[350px] bg-cyan-50 border-cyan-50 cursor-pointer rounded-xl">
            <CardHeader className="flex justify-center items-center">
              <div className="bg-white rounded-xl p-2">
                <Image src={react} width={40} height={40} alt="React" />
              </div>
              <CardTitle className="pt-3">React.js</CardTitle>
            </CardHeader>
            <CardContent className="font-medium text-md flex justify-center items-center">
              {" "}
              + 40 questions
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          whileHover={{ boxShadow: "0px 10px 30px rgba(207, 242, 218, 0.8)" }}
          transition={{ duration: 0.3 }}
          whileTap={{ boxShadow: "0px 10px 30px rgba(207, 242, 218, 0.8)" }}
          className="rounded-xl sm: mb-4 rounded-2xl w-4/6 flex justify-center items-center"
        >
          <Card className="w-[350px] bg-emerald-50 border-emerald-50 cursor-pointer rounded-xl">
            <CardHeader className="flex justify-center items-center">
              <div className="bg-white rounded-xl p-2">
                <Image src={node} width={60} height={60} alt="Node"></Image>
              </div>
              <CardTitle className="pt-3">Node.js</CardTitle>
            </CardHeader>
            <CardContent className="font-medium text-md flex justify-center items-center">
              {" "}
              + 52 questions
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
