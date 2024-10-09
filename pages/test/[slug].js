"use client";
import Box from "@mui/material/Box";
import * as React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";
import hljs from "highlight.js";
import "highlight.js/styles/default.css";
import { Button } from "@/components/ui/button";
import { BookCheck } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Header from "@/components/header";

const checkTopic = [
  {
    topic: "Javascript",
    themeBgColor: "#fefbe8",
    textColor: "#745b10",
    topicColor: "#e4bc40",
  },
];

export default function Test() {
  const router = useRouter();
  const [indexSelected, setIndexValue] = React.useState(0);
  const [topicSelected, setTopicSelected] = React.useState("");
  const [questionType, setQuestionType] = React.useState();
  const topic = router.query.slug;

  // React.useEffect(() => {
  //   const topic = router.query.slug;
  //   setTopicSelected(topic);
  //   const topicIndex = checkTopic.findIndex((t) => t.topic === topic);
  //   setIndexValue(topicIndex);
  // }, [router.query.slug]);


  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }} className="w-full mx-auto md:w-7/12 lg:w-6/12">
      <Header topic={topic} />
      <Box sx={{ flexGrow: 1 }} padding={3}>
        <h3 className="scroll-m-20 text-gray-600 text-xl font-semibold tracking-tight mt-5 ">
          {/* <span className="text-slate-800 text-xl font-bold">Ques.</span> */}
           How does the Redux store subscribe to changes in the state?
        </h3>
        <Box marginTop={3} className="ml-3">
          <RadioGroup defaultValue="comfortable">
            <div className="flex items-center space-x-2 ">
              <RadioGroupItem value="default" id="r1" className="text-gray-600 "/>
              <Label htmlFor="r1" className="text-lg cursor-pointer">
                Default
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="comfortable" id="r2" className="text-gray-600"/>
              <Label htmlFor="r2" className="text-lg cursor-pointer">
                Comfortable
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="compact" id="r3" className="text-gray-600"/>
              <Label htmlFor="r3" className="text-lg cursor-pointer">
                Compact
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Test" id="r4" className="text-gray-600"/>
              <Label htmlFor="r4" className="text-lg cursor-pointer">
                Test
              </Label>
            </div>
          </RadioGroup>
        </Box>
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}
        className="mb-7"
      >
        <Button className="bg-gray-100 text-md text-gray-600 w-full mr-2 hover:bg-gray-200">
          <ArrowLeft size={"20px"} className="mr-3" /> Previous
        </Button>
        <Button className="bg-gray-100 text-md text-gray-600 w-full hover:bg-gray-200 ">
          Next <ArrowRight size={"20px"} className="ml-3" />
        </Button>
      </Box>
    </Box>
  );
}
