import Box from "@mui/material/Box";
import * as React from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { Button } from "@/components/ui/button";
import { BookCheck, ArrowRight } from "lucide-react";
import Header from "@/components/header";
import { useRouter } from "next/router";
import { prepareData } from "@/data/prepareData";
import TopicSidebar from "@/components/learn/TopicSidebar";
import { motion } from "framer-motion";

export default function Learn({
  topic,
  explanation,
  nextTopic,
  theme,
  category,
}) {
  const router = useRouter();
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (hydrated) {
      try {
        hljs.highlightAll();
      } catch (error) {
        console.error("Highlight.js error:", error);
      }
    }
  }, [hydrated, explanation]);

  if (router.isFallback) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header topic={category || topic} />
      <div className="flex">
        <TopicSidebar currentTopic={topic} category={category} theme={theme} />
        <div className="flex-1">
          <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200/50 overflow-hidden"
            >
              <div className="p-6 sm:p-8">
                <h1
                  className="text-2xl md:text-3xl font-bold tracking-tight mb-6"
                  style={{ color: theme.textColor }}
                >
                  {topic}
                </h1>

                {hydrated && explanation ? (
                  <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: explanation }}
                  />
                ) : (
                  <div className="flex items-center justify-center py-16">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
                    <p className="ml-3 text-gray-600">Loading content...</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="px-6 pb-6 sm:px-8">
                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
                  <Button
                    onClick={() => router.push(`/test/${topic}`)}
                    style={{
                      backgroundColor: theme?.themeBgColor,
                      color: theme?.textColor,
                    }}
                    className="text-md w-full  py-3 px-6 hover:shadow-md transition-all duration-200"
                  >
                    Practice Questions <BookCheck size={20} className="ml-2" />
                  </Button>

                  {nextTopic && (
                    <Button
                      onClick={() =>
                        router.push(`/learn/${category}/${nextTopic}`)
                      }
                      variant="outline"
                      className="text-md w-full  py-3 px-6 border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                    >
                      Next Topic
                      <ArrowRight size={20} className="ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </motion.article>

            {/* Breadcrumb Navigation */}
            {/* <div className="mt-8 text-sm text-gray-600">
              <button
                onClick={() =>
                  router.push(`/category/${category.toLowerCase()}`)
                }
                className="hover:text-gray-900 transition-colors duration-200"
              >
                ← Back to {category} Topics
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const dbPaths = prepareData.reduce((acc, item) => {
    return [
      ...acc,
      ...item.type.flatMap((typeItem) =>
        typeItem.concepts.map((conceptItem) => ({
          params: { slug: [item.category, conceptItem.topic] },
        }))
      ),
    ];
  }, []);

  const allPaths = [...dbPaths];
  const uniquePaths = allPaths.filter(
    (path, index, self) =>
      index ===
      self.findIndex(
        (p) =>
          p.params.slug[0] === path.params.slug[0] &&
          p.params.slug[1] === path.params.slug[1]
      )
  );

  return {
    paths: uniquePaths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const selected = slug[slug.length - 1];
  let themeColor = {};
  let nextTopic = null;
  let explanation = "";
  let category = "";

  prepareData.forEach((item) => {
    if (item.type) {
      item.type.forEach((typeItem) => {
        typeItem.concepts.forEach((conceptItem, index) => {
          if (conceptItem.topic === selected) {
            console.log("catogory 2", item?.category, selected);
            category = item?.category || selected;
            themeColor = {
              category: item.category,
              themeBgColor: item.themeBgColor,
              textColor: item.textColor,
              topicColor: item.topicColor,
              lightColor: item.lightColor || item.themeBgColor,
            };
            explanation = conceptItem.explanation || "";
            const next = typeItem.concepts[index + 1];
            if (next) {
              nextTopic = next.topic;
            }
          }
        });
      });
    }
  });
  console.log("catogory 3", category);
  return {
    props: {
      topic: selected,
      explanation: explanation || "<p>No explanation available.</p>",
      nextTopic: nextTopic || "",
      theme: themeColor,
      category: category,
    },
  };
}
