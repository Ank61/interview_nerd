import Box from "@mui/material/Box";
import * as React from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { Button } from "@/components/ui/button";
import { BookCheck } from "lucide-react";
import { ArrowRight } from "lucide-react";
import Header from "@/components/header";
import { prepareData } from "@/data/prepareData";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { ChevronDown } from "lucide-react";

export default function Learn({ topic, explanation, nextTopic, theme }) {
  React.useEffect(() => {
    hljs.highlightAll();
  }, [explanation]);

  return (
    <Box className="w-full md:w-6/12 mx-auto">
      <Header topic={topic} />
      <Box sx={{ width: "auto" }} padding={3}>
        <h3
          style={{ color: theme.textColor }}
          className={`scroll-m-20 text-2xl font-semibold tracking-tight`}
        >
          {topic}
        </h3>
        <div
          className="w-full"
          dangerouslySetInnerHTML={{ __html: explanation }}
        />
        <Box className="flex justify-between gap-4 mt-10 mb-6">
          <Button
            href={`/test/${topic}`}
            style={{
              backgroundColor: theme?.themeBgColor,
              color: theme?.textColor,
            }}
            className="text-md w-full"
          >
            Interview Questions <BookCheck size={"20px"} className="ml-3" />
          </Button>
          <Button
            href={`/learn/${nextTopic}`}
            style={{
              backgroundColor: theme?.themeBgColor,
              color: theme?.textColor,
            }}
            className=" text-md w-full"
          >
            Next Topic
            <ArrowRight size={"20px"} className="ml-3" />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

// Fetch all possible paths at build time
export async function getStaticPaths() {
  // Prepare the paths based on available topics in prepareData
  const paths = prepareData.flatMap(item =>
    item.type.flatMap(typeItem =>
      typeItem.concepts.map(conceptItem => ({
        params: { slug: [item.category, conceptItem.topic] },
      }))
    )
  );

  return {
    paths,
    fallback: false, // `false` means other routes will 404
  };
}

// Fetch data for each individual page at build time
export async function getStaticProps({ params }) {
  const slug = params.slug;
  const selected = slug[slug.length - 1];

  // Find the matching topic from prepareData
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
      typeItem.concepts.filter((conceptItem, index) => {
        if (conceptItem.topic === selected) {
          const next = typeItem.concepts[index + 1];
          return { nextTopic: next ? next.topic : null };
        }
        return conceptItem.topic === selected;
      })
    );
  });

  const explanation = matchingTopics[0]?.explanation || "";
  const nextTopic = matchingTopics[0]?.nextTopic || "";

  return {
    props: {
      topic: selected,
      explanation,
      nextTopic,
      theme: themeColor,
    },
  };
}
