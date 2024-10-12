"use client";
import Box from "@mui/material/Box";
import * as React from "react";
import { useRouter } from "next/router";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { Button } from "@/components/ui/button";
import { BookCheck } from "lucide-react";
import { ArrowRight } from "lucide-react";
import Header from "@/components/header";
import { prepareData } from "@/data/prepareData";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ChevronDown } from 'lucide-react';
import { Button as MaterialButton } from "@mui/material";

export default function Learn() {
  const router = useRouter();
  const topic = router.query.slug || "";
  const [topicSelected, setTopicSelected] = React.useState("");
  const [explanation, setExplanation] = React.useState("<></>");
  const [interview, setInterview] = React.useState([]);
  const [nextTopic, setNextTopic] = React.useState("");
  const [theme, setTheme] = React.useState("");

  React.useEffect(() => {
    // if (!topic || !prepareData) return;
    const selected = topic[topic.length-1];
    setTopicSelected(topic[topic.length - 1]);
    let themeColor;
    const matchingTopics = prepareData.flatMap((item) => {
      themeColor = {
        category: item.category,
        themeBgColor: item.themeBgColor,
        textColor: item.textColor,
        topicColor: item.topicColor,
        lightColor: item?.lightColor || item.themeBgColor,
      };
      return item.type.flatMap((typeItem) =>
        typeItem.concepts.filter(
          (conceptItem, index) => {
            if (conceptItem.topic === selected) {
              const next = typeItem.concepts[index + 1];
              setNextTopic(next.topic);
            }
            return conceptItem.topic === selected
          }
        )
      );
    });
    setTheme(themeColor);
    // setInterview(matchingTopics[0]?.questions);
    setExplanation(matchingTopics[0]?.explanation);
  }, [router.query.slug]);

  React.useEffect(() => {
    if (explanation) {
      hljs.highlightAll();
    }
  }, [explanation]);

  return (
    <Box className="w-full md:w-6/12 mx-auto">
      <Header topic={theme.category || ""} />
      <Box sx={{ width: "auto" }} padding={3}>
        <h3
          style={{ color: theme.textColor }}
          className={`scroll-m-20 text-2xl font-semibold tracking-tight`}
        >
          {topic[topic?.length-1]}
        </h3>
        <div
          className="w-full"
          dangerouslySetInnerHTML={{ __html: explanation, }}
        />
        {/* <h4
          style={{ color: theme.textColor }}
          className="mt-6 scroll-m-20 text-xl font-semibold tracking-tight"
        >
          Interview Questions
        </h4>
        {interview?.map((questionItem, index) => ( 
          <Accordion
            key={index}
            style={{ borderColor: theme.topicColor }}
            className="rounded-xl font-medium overflow-hidden mt-4 "
          >
            <AccordionSummary
              expandIcon={
                <ChevronDown style={{ color: theme.topicColor }} />
              }
              aria-controls="panel1-content"
              id="panel1-header"
            >
              {questionItem.question}
            </AccordionSummary>
            <AccordionDetails className="font-normal font-sans ">
              <div
                className="w-full"
                dangerouslySetInnerHTML={{ __html: questionItem?.code }}
              />
              <div
                className="w-full"
                dangerouslySetInnerHTML={{ __html: questionItem.solution }}
              />
            </AccordionDetails>
          </Accordion>
        ))} */}

        <Box className="flex justify-between gap-4 mt-10 mb-6">
          <Button
            onClick={() => router.push(`/test/${topic}`)}
            style={{
              backgroundColor: theme.themeBgColor,
              color: theme.textColor,
            }}
            className="text-md  w-full"
          >
            Interview Questions <BookCheck size={"20px"} className="ml-3" />
          </Button>
          <Button
            style={{
              backgroundColor: theme.themeBgColor,
              color: theme.textColor,
            }}
            className=" text-md  w-full"
            onClick={() => router.push(`/learn/${nextTopic}`)}
          >
            Next Topic
            <ArrowRight size={"20px"} className="ml-3" />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
