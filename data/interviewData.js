export const interviewData = [
  {
    id: 1,
    topic: "javascript",
    categories: "junior",
    tags: [
      {
        name: "comparison operators",
        link: "",
      },
      {
        name: "event delegation",
        link: "",
      },
      {
        name: "closures",
        link: "",
      },
      {
        name: "hoisting",
        link: "",
      },
      {
        name: "type coercion",
        link: "",
      },
      {
        name: "event bubbling",
        link: "",
      },
      {
        name: "ternary operator",
        link: "",
      },
      {
        name: "let vs var vs const",
        link: "",
      },
      {
        name: "arrow functions",
        link: "",
      },
    ],
    prepareLink: "", // Our own links :Preparation
    externallinks: [],
    questions: [
      {
        question: "Explain the differences between == and ===.",
        solution: `The difference between == (loose equality) and === (strict equality) in JavaScript is essential for understanding how comparisons work in the language.
      == (Loose Equality)
Type Coercion: The == operator performs type coercion meaning it converts the operands to the same type before making the comparison.
Examples:
5 == '5' returns true because the string '5' is converted to the number 5.
0 == false returns true because false is coerced to 0.
null == undefined returns true because both represent "no value" in different contexts.
=== (Strict Equality)
No Type Coercion: The === operator does not perform type coercion. it checks both the rate and the case of the operands
examples:
5 === '5' returns specious because they are of disparate types (number vs. string).
0 === false returns false because they are also of different types (number vs. boolean)
null === vague returns specious because they are disparate types. It is generally recommended to use === for comparisons in JavaScript to avoid unexpected results due to type coercion.`,
      },
      {
        question: "What is event delegation, and how does it function in JavaScript?",
        solution: "",
      },
      {
        question: "Differentiate between a variable that is null, undefined, or undeclared.",
        solution: "",
      },
      {
        question: "Define what a closure is and describe its uses and advantages.",
        solution: "",
      },
      {
        question: "Clarify the distinctions among 'function User(){}', 'var user = User()', and 'var user = new User()'.",
        solution: "",
      },
      {
        question: "Define the concept of 'hoisting'.",
        solution: "",
      },
      {
        question: "What is type coercion, and what are some common pitfalls associated with relying on it in JavaScript code?",
        solution: "",
      },
      {
        question: "Describe event bubbling and event capturing.",
        solution: "",
      },
      {
        question: "What distinguishes an 'attribute' from a 'property'?",
        solution: "",
      },
      {
        question: "Why is it referred to as a 'Ternary operator,' and what does the term 'Ternary' signify?",
        solution: "",
      },
      {
        question: "Explain the disparities between variables created using let, var, or const.",
        solution: "",
      },
      {
        question: "Compare ES6 classes and ES5 function constructors, and furnish a use case for the arrow (=>) function syntax.",
        solution: "",
      },
    ],
  },
  {
    id: 2,
    topic: "javascript",
    categories: "mid",
    tags: [
      {
        name: "this in ES6",
        link: "",
      },
      {
        name: "prototypal inheritance",
        link: "",
      },
      {
        name: "array methods",
        link: "",
      },
      {
        name: "host vs native objects",
        link: "",
      },
      {
        name: "Function.call",
        link: "",
      },
      {
        name: "Function.prototype.bind",
        link: "",
      },
      {
        name: "feature detection vs inference",
        link: "",
      },
      {
        name: "strict mode",
        link: "",
      },
      {
        name: "debugging tools",
        link: "",
      },
      {
        name: "synchronous vs asynchronous",
        link: "",
      },
    ],
    prepareLink: "", // Our own links :Preparation
    externallinks: [],
    questions: [
      {
        question: "Can you provide an illustration of how ES6 has altered the approach to working with 'this' in JavaScript?",
        solution: "",
      },
      {
        question: "Explain the concept of prototypal inheritance.",
        solution: "",
      },
      {
        question: "Explain the primary distinction between the Array.forEach() loop and Array.map() method, as well as when to choose one over the other.",
        solution: "",
      },
      {
        question: "Distinguish between host objects and native objects.",
        solution: "",
      },
      {
        question: "Can you elucidate the purposes of Function.call and Function.apply, along with their notable differences?",
        solution: "",
      },
      {
        question: "Describe the Function.prototype.bind method.",
        solution: "",
      },
      {
        question: "Explain the differences between feature detection, feature inference, and utilizing the User Agent (UA) string.",
        solution: "",
      },
      {
        question: "List the advantages and disadvantages of extending built-in JavaScript objects.",
        solution: "",
      },
      {
        question: "Discuss the same-origin policy's implications for JavaScript.",
        solution: "",
      },
      {
        question: "Define strict mode and outline some of its advantages and disadvantages.",
        solution: "",
      },
      {
        question: "Analyze the pros and cons of writing JavaScript code in a language that compiles to JavaScript.",
        solution: "",
      },
      {
        question: "What tools and techniques do you employ for debugging JavaScript code?",
        solution: "",
      },
      {
        question: "Differentiate between synchronous and asynchronous functions and elucidate the event loop.",
        solution: "",
      },
      {
        question: "Describe the advantages of using the arrow syntax for methods in constructors.",
        solution: "",
      },
      {
        question: "Define a higher-order function and provide an example of object or array destructuring.",
        solution: "",
      },
    ],
  },
  {
    id: 3,
    topic: "javascript",
    categories: "senior",
    tags: [
      {
        name: "immutability",
        link: "",
      },
      {
        name: "same-origin policy",
        link: "",
      },
      {
        name: "compiling to JavaScript",
        link: "",
      },
    ],
    prepareLink: "", // Our own links :Preparation
    externallinks: [],
    questions: [
      {
        question: "Enumerate the benefits and drawbacks of immutability and explain how you can achieve it in your code.",
        solution: "",
      },
      {
        question: "Discuss the same-origin policy's implications for JavaScript.",
        solution: "",
      },
      {
        question: "Analyze the pros and cons of writing JavaScript code in a language that compiles to JavaScript.",
        solution: "",
      },
    ],
  },
];
