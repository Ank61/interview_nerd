import Box from "@mui/material/Box";
import * as React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";
import hljs from "highlight.js";
import "highlight.js/styles/default.css"; // Import the desired highlight.js theme

const CodeBlock = ({ language, code }) => {
  // After the component mounts, apply syntax highlighting
  React.useEffect(() => {
    hljs.highlightAll(); // Automatically highlight all <pre><code> blocks
  }, []);

  return (
    <div className="bg-Javascript-lightTheme">
      <pre >
        <code className={`${language}`}>{code}</code>
      </pre>
    </div>
  );
};
const codeSnippet = `
function addThreeNumbers(a, b, c) {
  return a + b + c;
}

console.log(addThreeNumbers(1, 2, 3)); // Output: 6
`;

export default function Learn() {
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

      <Box sx={{ width: "auto" }} padding={2}>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {topic}
        </h3>

        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Currying is a functional programming technique where a function does
          not take all its arguments at once. Instead, it takes the first
          argument and returns a new function that takes the second argument,
          and so on, until all arguments are provided. In essence, currying
          transforms a function that takes multiple arguments into a sequence of
          functions that each take a single argument.
        </p>

        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
          Benefits of Currying
        </h4>

        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>
            Reusability: Currying allows you to create reusable functions by
            pre-filling some arguments and generating a new function that only
            needs the remaining arguments.
          </li>
          <li>
            Function Composition: It allows easier function composition in a
            functional programming style.
          </li>
          <li>
            Partial Application: Currying makes it easier to partially apply
            functions, which means providing fewer arguments than a function
            expects, creating a new function waiting for the remaining
            arguments.
          </li>
        </ul>
        <div>
          <CodeBlock language="javascript" code={codeSnippet} />
        </div>
      </Box>
    </Box>
  );
}
