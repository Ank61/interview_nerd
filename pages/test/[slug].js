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

export default function Test() {
  const router = useRouter();
  const topic = router.query.slug;

  return (
    <Box>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ArrowLeft size={28} />
        </Box>
        {/* <Box sx={{ display: "flex", alignItems: "center" }}>
            <span
              className={`scroll-m-20 text-[22px] font-semibold tracking-tight text-Javascript-topic`}
            >
              {topic}
            </span>
        </Box> */}
      </Box>
      <Box sx={{ width: "auto" }} padding={3}>
        <h3 className="scroll-m-20 text-violet-800 text-2xl font-semibold tracking-tight">
          {topic}
        </h3>
        <Box>
          <RadioGroup defaultValue="comfortable">
            <div className="flex items-center space-x-2 ">
              <RadioGroupItem value="default" id="r1" />
              <Label htmlFor="r1" className="text-xl">Default</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="comfortable" id="r2" />
              <Label htmlFor="r2" className="text-xl">Comfortable</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="compact" id="r3"/>
              <Label htmlFor="r3" className="text-xl">Compact</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Test" id="r4" />
              <Label htmlFor="r4" className="text-xl">Test</Label>
            </div>
          </RadioGroup>
        </Box>
        <Box className="flex justify-between gap-4">
          <Button className="bg-violet-50 text-md text-violet-800 w-full">
            Previous <ArrowLeft size={"20px"} className="ml-3" />
          </Button>
          <Button className="bg-violet-50 text-md text-violet-800 w-full">
            Next <ArrowRight size={"20px"} className="ml-3" />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
