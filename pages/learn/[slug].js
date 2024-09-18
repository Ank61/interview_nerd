"use client";
import Box from "@mui/material/Box";
import * as React from "react";
import { useRouter } from "next/router";
import hljs from "highlight.js";
import "highlight.js/styles/default.css";
import { Button } from "@/components/ui/button";
import { BookCheck } from "lucide-react";
import { ArrowRight } from "lucide-react";
import Header from "@/components/header";
import { prepareData } from "@/data/prepareData";

export default function Learn() {
  const [explanation , setExplanation] = React.useState('<></>');
  const router = useRouter();
  const topic = router.query.slug;

  React.useEffect(() => {
    hljs.highlightAll();
    if (!topic || !prepareData) return;
    const selected = router.query.slug;
    console.log("starting" , selected);
    const matchingTopics = prepareData.flatMap(item =>
      item.type.flatMap(typeItem =>
        typeItem.concepts.filter(conceptItem => conceptItem.topic === selected)
      )
    );
    setExplanation(matchingTopics[0]?.explanation)
    console.log(matchingTopics);
  }, [router.query.slug]);

  return (
    <Box width={'full'}>
      <Header topic={""}/>
      <Box sx={{ width: "auto" }} padding={3}>
        <h3 className="scroll-m-20 text-violet-800 text-2xl font-semibold tracking-tight">
          {topic}
        </h3>
        <div className="w-full" dangerouslySetInnerHTML={{ __html: explanation }} />
        <Box className="flex justify-between gap-4">
          <Button
            onClick={() => router.push(`/test/${topic}`)}
            className="bg-violet-50 text-md text-violet-800 w-full"
          >
            Take a Quiz <BookCheck size={"20px"} className="ml-3" />
          </Button>
          <Button className="bg-violet-50 text-md text-violet-800 w-full">
            Next Topic
            <ArrowRight size={"20px"} className="ml-3" />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
