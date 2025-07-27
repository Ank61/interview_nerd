import Box from '@mui/material/Box';
import { Button } from '@/components/ui/button';
import { BookCheck, ArrowRight } from 'lucide-react';
import Header from '@/components/header';
import { useRouter } from 'next/router';
import { allPaths, getLesson } from '@/lib/content';
import { renderMarkdown } from '@/lib/markdown';
import { readFileSync } from 'fs';
import path from 'path';

export default function Learn(props) {
  const router = useRouter();
  if (router.isFallback) return <div>Loading…</div>;

  return (
    <Box className="w-full md:w-6/12 mx-auto">
      <Header topic={props.category} />
      <Box padding={3}>
        <h3
          style={{ color: props.theme.textColor }}
          className="scroll-m-20 text-2xl font-semibold tracking-tight"
        >
          {props.topic}
        </h3>
        <article
          className="w-full"
          dangerouslySetInnerHTML={{ __html: props.explanation }}
        />
      </Box>

      <Box className="flex justify-between gap-4 mt-10 mb-6 mx-3">
        <Button
          onClick={() => router.push(`/test/${props.topic}`)}
          style={{ backgroundColor: props.theme.themeBgColor, color: props.theme.textColor }}
          className="text-md w-full"
        >
          Questions <BookCheck size={20} className="ml-3" />
        </Button>

        {props.nextTopic && (
          <Button
            onClick={() => router.push(`/learn/${props.category}/${props.nextTopic}`)}
            style={{ backgroundColor: props.theme.themeBgColor, color: props.theme.textColor }}
            className="text-md w-full"
          >
            Next Topic <ArrowRight size={20} className="ml-3" />
          </Button>
        )}
      </Box>
    </Box>
  );
}

export const getStaticPaths = async () => ({
  paths: allPaths,
  fallback: false,
});

export const getStaticProps = async ({ params }) => {
  const slugPath = params.slug.join('/');
  const mdFile = path.join(process.cwd(), 'content', `${slugPath}.md`);

  try {
    const raw = readFileSync(mdFile, 'utf8');
    const explanation = await renderMarkdown(raw);
    const lesson = lookupLesson(slugPath);
    if (!lesson) throw new Error(`No lesson data for ${slugPath}`);

    return {
      props: {
        topic: lesson.topic,
        explanation,
        nextTopic: lesson.nextTopic,
        theme: lesson.theme,
        category: lesson.category,
      },
    };
  } catch (err) {
    console.error('Prerender error:', slugPath, err);
    return { notFound: true 
  }
};
}

//InitIal 
// import Box from "@mui/material/Box";
// import * as React from "react";
// import hljs from "highlight.js";
// import "highlight.js/styles/github.css";
// import { Button } from "@/components/ui/button";
// import { BookCheck, ArrowRight } from "lucide-react";
// import Header from "@/components/header";
// import { useRouter } from "next/router";
// import { prepareData } from "@/data/prepareData";

// export default function Learn({
//   topic,
//   explanation,
//   nextTopic,
//   theme,
//   category,
// }) {
//   const router = useRouter();
//   console.log("NextTopic", nextTopic, `/learn/${topic}/${nextTopic}`, category);
//   React.useEffect(() => {
//     try {
//       hljs.highlightAll();
//     } catch (error) {
//       console.error("Highlight.js error:", error);
//     }
//   }, []);

//   if (router.isFallback) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Box className="w-full md:w-6/12 mx-auto">
//       <Header topic={category || topic} />
//       <Box sx={{ width: "auto" }} padding={3}>
//         <h3
//           style={{ color: theme.textColor }}
//           className="scroll-m-20 text-2xl font-semibold tracking-tight"
//         >
//           {topic}
//         </h3>
//         {explanation ? (
//           <div
//             className="w-full"
//             dangerouslySetInnerHTML={{ __html: explanation }}
//           />
//         ) : (
//           <p>No content available.</p>
//         )}
//       </Box>
//       <Box 
//         // className="flex justify-between gap-4 mt-10 mb-6"
//         className="flex justify-between gap-4 mt-10 mb-6 ml-3 mr-3"
//         >
//           <Button
//             onClick={() => router.push(`/test/${topic}`)}
//             style={{
//               backgroundColor: theme?.themeBgColor,
//               color: theme?.textColor,
//             }}
//             className="text-md w-full"
//           >
//             Questions <BookCheck size={"20px"} className="ml-3" />
//           </Button>
//           <Button
//             onClick={() => router.push(`/learn/${category}/${nextTopic}`)}
//             style={{
//               backgroundColor: theme?.themeBgColor,
//               color: theme?.textColor,
//             }}
//             className=" text-md w-full"
//           >
//             Next Topic
//             <ArrowRight size={"20px"} className="ml-3" />
//           </Button>
//         </Box>
//     </Box>
//   );
// }

// export async function getStaticPaths() {
//   const paths = prepareData.reduce((acc, item) => {
//     return [
//       ...acc,
//       ...item.type.flatMap((typeItem) =>
//         typeItem.concepts.map((conceptItem) => ({
//           params: { slug: [item.category, conceptItem.topic] },
//         }))
//       ),
//     ];
//   }, []);

//   return {
//     paths,
//     fallback: "blocking",
//   };
// }

// export async function getStaticProps({ params }) {
//   const slug = params.slug;
//   const selected = slug[slug.length - 1];
//   let themeColor = {};
//   let nextTopic = null;
//   let explanation = "";
//   let category = "";

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
