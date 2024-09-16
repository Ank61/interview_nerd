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

export default function Test() {
  const router = useRouter();
  const [questionType, setQuestionType] = React.useState();
  const topic = router.query.slug;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header />
      <Box sx={{ flexGrow: 1 }} padding={3}>
        <h3 className="scroll-m-20 text-gray-600 text-xl font-semibold tracking-tight mt-5">
          <span className="text-violet-800 text-xl font-bold">Ques.</span> How does the Redux store subscribe to changes in the state?
        </h3>
        <Box marginTop={3 }>
          <RadioGroup defaultValue="comfortable">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="default" id="r1" className="text-violet-800"/>
              <Label htmlFor="r1" className="text-lg">
                Default
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="comfortable" id="r2" className="text-violet-800"/>
              <Label htmlFor="r2" className="text-lg">
                Comfortable
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="compact" id="r3" className="text-violet-800"/>
              <Label htmlFor="r3" className="text-lg">
                Compact
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Test" id="r4" className="text-violet-800"/>
              <Label htmlFor="r4" className="text-lg">
                Test
              </Label>
            </div>
          </RadioGroup>
        </Box>
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}
        className="mb-10"
      >
        <Button className="bg-violet-50 text-md text-violet-800 w-full mr-2">
          <ArrowLeft size={"20px"} className="mr-3" /> Previous
        </Button>
        <Button className="bg-violet-50 text-md text-violet-800 w-full">
          Next <ArrowRight size={"20px"} className="ml-3" />
        </Button>
      </Box>
    </Box>
  );
}
