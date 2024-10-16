import Box from "@mui/material/Box";
import * as React from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { Button } from "@/components/ui/button";
import { BookCheck, ArrowRight } from "lucide-react";
import Header from "@/components/header";
import { useRouter } from 'next/router';
import { prepareData } from "@/data/prepareData";

export default function Learn({ topic, explanation, nextTopic, theme }) {
  const router = useRouter();
  
  React.useEffect(() => {
    try {
      hljs.highlightAll();
    } catch (error) {
      console.error("Highlight.js error:", error);
    }
  }, []);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Box className="w-full md:w-6/12 mx-auto">
      <Header topic={topic} />
      <Box sx={{ width: "auto" }} padding={3}>
        <h3
          style={{ color: theme.textColor }}
          className="scroll-m-20 text-2xl font-semibold tracking-tight"
        >
          {topic}
        </h3>
        {explanation ? (
          <div
            className="w-full"
            dangerouslySetInnerHTML={{ __html: explanation }}
          />
        ) : (
          <p>No content available.</p>
        )}
        <Box className="flex justify-between gap-4 mt-10 mb-6">
          <Button
            onClick={()=>router.push(`/test/${topic}`)}
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

export async function getStaticPaths() {
  const paths = prepareData.reduce((acc, item) => {
    return [
      ...acc,
      ...item.type.flatMap(typeItem =>
        typeItem.concepts.map(conceptItem => ({
          params: { slug: [item.category, conceptItem.topic] },
        }))
      ),
    ];
  }, []);

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const selected = slug[slug.length - 1];
  let themeColor = {};
  let nextTopic = null;
  let explanation = "";

  prepareData.forEach((item) => {
    if (item.type) {
      item.type.forEach(typeItem => {
        typeItem.concepts.forEach((conceptItem, index) => {
          if (conceptItem.topic === selected) {
            themeColor = {
              category: item.category,
              themeBgColor: item.themeBgColor,
              textColor: item.textColor,
              topicColor: item.topicColor,
              lightColor: item.lightColor || item.themeBgColor,
            };
            explanation = conceptItem.explanation || "";
            const next = typeItem.concepts[index + 1];
            if (next) nextTopic = next.topic;
          }
        });
      });
    }
  });
  return {
    props: {
      topic: selected,
      explanation: explanation || "<p>No explanation available.</p>",
      nextTopic: nextTopic || "",
      theme: themeColor,
    },
  };
}
