import Box from "@mui/material/Box";
import * as React from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { Button } from "@/components/ui/button";
import { BookCheck, ArrowRight } from "lucide-react";
import Header from "@/components/header";
import { useRouter } from "next/router";
import { prepareData } from "@/data/prepareData";

export default function Learn({
  topic,
  explanation,
  nextTopic,
  theme,
  category,
}) {
  const router = useRouter();
  const [hydrated, setHydrated] = React.useState(false);
  console.log("topppicsna'oc", topic, category);
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
  }, [hydrated]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Box className="w-full md:w-6/12 mx-auto">
      <Header topic={category || topic} />
      <Box sx={{ width: "auto" }} padding={3}>
        <h3
          style={{ color: theme.textColor }}
          className="scroll-m-20 text-2xl font-semibold tracking-tight"
        >
          {topic}
        </h3>

        {hydrated && explanation ? (
          <div
            className="w-full"
            dangerouslySetInnerHTML={{ __html: explanation }}
          />
        ) : (
          <p>Loading content...</p>
        )}
      </Box>

      <Box className="flex justify-between gap-4 mt-10 mb-6 ml-3 mr-3">
        <Button
          onClick={() => router.push(`/test/${topic}`)}
          style={{
            backgroundColor: theme?.themeBgColor,
            color: theme?.textColor,
          }}
          className="text-md w-full"
        >
          Questions <BookCheck size={"20px"} className="ml-3" />
        </Button>
        <Button
          onClick={() => router.push(`/learn/${category}/${nextTopic}`)}
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

// export async function getStaticPaths() {
//   // await connectDB();
//   // const allData = await PrepareData.find({}).lean();

//   // Get paths from database
//   const dbPaths = prepareData.reduce((acc, item) => {
//     return [
//       ...acc,
//       ...item.type.flatMap((typeItem) =>
//         typeItem.concepts.map((conceptItem) => ({
//           params: { slug: [item.category, conceptItem.topic] },
//         }))
//       ),
//     ];
//   }, []);

//   // Get paths from static data (for topics not in database like AWS S3)
//   const staticPaths = prepareData.reduce((acc, item) => {
//     return [
//       ...acc,
//       ...item.type.flatMap((typeItem) =>
//         typeItem.concepts.map((conceptItem) => ({
//           params: { slug: [item.category, conceptItem.topic] },
//         }))
//       ),
//     ];
//   }, []);

//   // Combine and deduplicate paths
//   const allPaths = [...dbPaths, ...staticPaths];
//   const uniquePaths = allPaths.filter(
//     (path, index, self) =>
//       index ===
//       self.findIndex(
//         (p) =>
//           p.params.slug[0] === path.params.slug[0] &&
//           p.params.slug[1] === path.params.slug[1]
//       )
//   );

//   return {
//     paths: uniquePaths,
//     fallback: "blocking",
//   };
// }

// export async function getStaticProps({ params }) {
//   // await connectDB();
//   const slug = params.slug;
//   const selected = slug[slug.length - 1];
//   console.log("selected");
//   let themeColor = {};
//   let nextTopic = null;
//   let explanation = "";
//   let category = "";

//   // First try to find data in database
//   // const allData = await PrepareData.find({}).lean();
//   // let foundInDb = false;

//   // allData.forEach((item) => {
//   //   if (item.type) {
//   //     item.type.forEach((typeItem) => {
//   //       typeItem.concepts.forEach((conceptItem, index) => {
//   //         if (conceptItem.topic === selected) {
//   //           foundInDb = true;
//   //           category = item?.category || selected;
//   //           themeColor = {
//   //             category: item.category,
//   //             themeBgColor: item.themeBgColor,
//   //             textColor: item.textColor,
//   //             topicColor: item.topicColor,
//   //             lightColor: item.lightColor || item.themeBgColor,
//   //           };
//   //           explanation = conceptItem.explanation || "";
//   //           const next = typeItem.concepts[index + 1];
//   //           if (next) {
//   //             nextTopic = next.topic;
//   //           }
//   //         }
//   //       });
//   //     });
//   //   }
//   // });

//   // If not found in database, try static data
//   // if (!foundInDb) {
//   prepareData.forEach((item) => {
//     if (item.type) {
//       item.type.forEach((typeItem) => {
//         typeItem.concepts.forEach((conceptItem, index) => {
//           if (conceptItem.topic === selected) {
//             category = item?.category || selected;
//             themeColor = {
//               category: item.category,
//               themeBgColor: item.themeBgColor,
//               textColor: item.textColor,
//               topicColor: item.topicColor,
//               lightColor: item.lightColor || item.themeBgColor,
//             };
//             explanation = conceptItem.explanation || "";
//             const next = typeItem.concepts[index + 1];
//             if (next) {
//               nextTopic = next.topic;
//             }
//           }
//         });
//       });
//     }
//   });
//   // }

//   return {
//     props: {
//       topic: selected,
//       explanation: explanation || "<p>No explanation available.</p>",
//       nextTopic: nextTopic || "",
//       theme: themeColor,
//       category: category,
//     },
//   };
// }
