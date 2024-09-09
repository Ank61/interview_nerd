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

const codeSnippet = `
function addThreeNumbers(a, b, c) {
  return a + b + c;
}

console.log(addThreeNumbers(1, 2, 3)); // Output: 6
`;
export default function Learn() {
  const router = useRouter();
  const topic = router.query.slug;
  const code = `
  <div>
   <p style="line-height: 1.75; margin-top: 1.5rem;">
     Currying is a functional programming technique where a function does not
     take all its arguments at once. Instead, it takes the first argument and
     returns a new function that takes the second argument, and so on, until
     all arguments are provided. In essence, currying transforms a function
     that takes multiple arguments into a sequence of functions that each take
     a single argument.
   </p>
 
   <h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">
     Benefits of Currying
   </h4>
 
   <ul style="margin-top: 1.5rem; margin-left: 1.5rem; list-style-type: disc;">
     <li style="margin-top: 0.5rem;">
       Reusability: Currying allows you to create reusable functions by
       pre-filling some arguments and generating a new function that only needs
       the remaining arguments.
     </li>
     <li style="margin-top: 0.5rem;">
       Function Composition: It allows easier function composition in a
       functional programming style.
     </li>
     <li style="margin-top: 0.5rem;">
       Partial Application: Currying makes it easier to partially apply
       functions, which means providing fewer arguments than a function
       expects, creating a new function waiting for the remaining arguments.
     </li>
   </ul>
 
   <div>
     <pre>
       <code class="javascript">${codeSnippet}</code>
     </pre>
   </div>
 </div>`;

  React.useEffect(() => {
    hljs.highlightAll();
  }, []);

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
        <div dangerouslySetInnerHTML={{ __html: code }} />
        <Box className="flex justify-between gap-4">
          <Button onClick={()=> router.push(`/test/${topic}`)} className="bg-violet-50 text-md text-violet-800 w-full">
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
