export const prepareData = [
  {
    id: 1,
    category: "Javascript",
    type: [
      {
        id: 1,
        label: "Beginner",
        themeBgColor: "#fefbe8",
        textColor: "#745b10",
        topicColor: "#e4bc40",
        concepts: [
          {
            topic: "Closures",
            tags: [""],
            explanation: `<div>
   <p style="line-height: 1.75; margin-top: 1.5rem;">
     A closure is a combination of a function and its lexical scope, which allows the function to access variables from its outer scope even after the outer function has completed execution.
     It is mostly used when we have to preserve data between function calls or we have to cache the result of an expensive function calls ( recalculate the same result multiple times ).
   </p>
 
   <h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">
     Benefits of Closures
   </h4>
 
   <ol style="margin-top: 1.5rem; margin-left: 1.5rem; list-style-type: number;">
     <li style="margin-top: 0.5rem;">
      <span style="font-weight: 600; font-size: 1.1rem;">Data Privacy (Encapsulation) :</span> Closures allow you to create private variables and functions that can't be accessed directly from outside. This is useful for encapsulating state within a function and ensuring that it isn't exposed.
    <div class="overflow-y-auto p-4" dir="ltr"><code class="!whitespace-pre hljs language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">createCounter</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">let</span> count = <span class="hljs-number">0</span>;  <span class="hljs-comment">// Private variable</span>
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) {
    count++;  <span class="hljs-comment">// Accessing outer scope variable</span>
    <span class="hljs-keyword">return</span> count;
  };
}

<span class="hljs-keyword">const</span> counter = <span class="hljs-title function_">createCounter</span>();
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title function_">counter</span>()); <span class="hljs-comment">// 1</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title function_">counter</span>()); <span class="hljs-comment">// 2</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title function_">counter</span>()); <span class="hljs-comment">// 3</span>
</code></div>
In this example, count is private to the createCounter function, and the inner function has access to it even after the outer function has finished executing.
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
   </ol>
 </div>`,
            examples: [""],
            questions: [
              {
                type: "explanation",
              },
              {
                type: "options",
              },
            ],
            links: [""],
          },
          {
            topic: "Promises and Asynchronous JavaScript",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Event Loop, Microtasks, and Macrotasks",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Higher-Order Functions",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Prototypal Inheritance",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Modules (ES6 Modules)",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Currying",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Memoization",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Generators and Iterators",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Context and This Keyword",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Function Composition",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Destructuring and Rest/Spread Operators",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Proxy and Reflect",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Falsy and Truthy",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Map",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Set",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
        ],
      },
      {
        id: 2,
        label: "Advance",
        concepts: [
          {
            topic: "Shallow copy and Deep Copy",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Debouncing ",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Throttling",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Polyfill",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Call Apply Bind",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Method Chaining",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Callback Hell",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "EventLoop",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "IIFE",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Binding",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Async and Defer",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
        ],
      },
    ],
  },
];
