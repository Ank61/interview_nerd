export const mcqQuestions = [
  {
    id: 1,
    category: "Typescript",
    difficulty: "easy",
    question: "What is TypeScript?",
    options: [
      "A JavaScript runtime",
      "A superset of JavaScript that adds static typing",
      "A CSS framework",
      "A database query language",
    ],
    correctAnswer: 1,
    explanation:
      "TypeScript is a superset of JavaScript that adds optional static typing and other features. It compiles to plain JavaScript.",
  },
  {
    id: 2,
    category: "Typescript",
    difficulty: "easy",
    question: "How do you define an interface in TypeScript?",
    options: [
      "class MyInterface {}",
      "interface MyInterface {}",
      "type MyInterface = {}",
      "function MyInterface() {}",
    ],
    correctAnswer: 1,
    explanation:
      "Interfaces in TypeScript are defined using the interface keyword followed by the interface name and its structure.",
  },
  {
    id: 3,
    category: "Typescript",
    difficulty: "easy",
    question:
      "What is the difference between interface and type in TypeScript?",
    options: [
      "No difference, they are identical",
      "interface can be extended, type cannot",
      "interface can be merged, type cannot",
      "type is more performant than interface",
    ],
    correctAnswer: 2,
    explanation:
      "Interfaces can be merged (declaration merging) and extended, while types are more flexible for unions and computed properties but cannot be merged.",
  },
  {
    id: 4,
    category: "Typescript",
    difficulty: "easy",
    question: "How do you specify that a parameter is optional in TypeScript?",
    options: [
      "parameter: string | undefined",
      "parameter?: string",
      "optional parameter: string",
      "parameter: string?",
    ],
    correctAnswer: 1,
    explanation:
      "Optional parameters in TypeScript are denoted by adding a question mark (?) after the parameter name.",
  },
  {
    id: 5,
    category: "Typescript",
    difficulty: "easy",
    question: "What is a generic in TypeScript?",
    options: [
      "A way to create reusable components that work with multiple types",
      "A built-in TypeScript function",
      "A type of variable declaration",
      "A method for handling errors",
    ],
    correctAnswer: 0,
    explanation:
      "Generics allow you to create reusable components that can work with multiple types while maintaining type safety.",
  },
  {
    id: 6,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which of the following is the correct way to define a string type?",
    options: [
      "let name: String = 'John';",
      "let name: string = 'John';",
      "let name: TEXT = 'John';",
      "let name: str = 'John';",
    ],
    correctAnswer: 1,
    explanation:
      "In TypeScript, primitive types are lowercase. Use 'string' not 'String' for primitive string type.",
  },
  {
    id: 7,
    category: "Typescript",
    difficulty: "easy",
    question: "What does the 'any' type represent in TypeScript?",
    options: [
      "A type that can be any string value",
      "A type that disables type checking",
      "A type that can only be numbers",
      "A type that represents arrays only",
    ],
    correctAnswer: 1,
    explanation:
      "The 'any' type essentially disables TypeScript's type checking and allows any value to be assigned.",
  },
  {
    id: 8,
    category: "Typescript",
    difficulty: "easy",
    question: "How do you define an array of numbers in TypeScript?",
    options: [
      "let numbers: number[] = [1, 2, 3];",
      "let numbers: Array[number] = [1, 2, 3];",
      "let numbers: [number] = [1, 2, 3];",
      "let numbers: number{} = [1, 2, 3];",
    ],
    correctAnswer: 0,
    explanation:
      "Arrays in TypeScript can be defined using type[] syntax. number[] represents an array of numbers.",
  },
  {
    id: 9,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the purpose of the tsconfig.json file?",
    options: [
      "To store project dependencies",
      "To configure TypeScript compiler options",
      "To define CSS styles",
      "To manage database connections",
    ],
    correctAnswer: 1,
    explanation:
      "tsconfig.json contains configuration options for the TypeScript compiler, including target, module, and other compilation settings.",
  },
  {
    id: 10,
    category: "Typescript",
    difficulty: "easy",
    question: "Which command compiles TypeScript files?",
    options: [
      "node filename.ts",
      "tsc filename.ts",
      "npm run filename.ts",
      "ts-compile filename.ts",
    ],
    correctAnswer: 1,
    explanation:
      "The 'tsc' (TypeScript Compiler) command is used to compile TypeScript files to JavaScript.",
  },
  {
    id: 11,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the default file extension for TypeScript files?",
    options: [".js", ".ts", ".typescript", ".tsx"],
    correctAnswer: 1,
    explanation:
      "TypeScript files use the .ts extension. .tsx is used for TypeScript files with JSX.",
  },
  {
    id: 12,
    category: "Typescript",
    difficulty: "easy",
    question: "How do you define a function type in TypeScript?",
    options: [
      "function(a: number, b: number): number",
      "(a: number, b: number) => number",
      "func: number -> number",
      "def(a: number, b: number): number",
    ],
    correctAnswer: 1,
    explanation:
      "Function types in TypeScript use arrow syntax: (parameters) => returnType.",
  },
  {
    id: 13,
    category: "Typescript",
    difficulty: "easy",
    question: "What does 'strict' mode enable in TypeScript?",
    options: [
      "Only allows ES6 features",
      "Enables all strict type checking options",
      "Disables type inference",
      "Forces explicit return types",
    ],
    correctAnswer: 1,
    explanation:
      "Strict mode enables a family of strict type checking options like noImplicitAny, strictNullChecks, etc.",
  },
  {
    id: 14,
    category: "Typescript",
    difficulty: "easy",
    question: "What is type inference in TypeScript?",
    options: [
      "Manually specifying all types",
      "TypeScript automatically determining types",
      "Converting types at runtime",
      "Importing types from other files",
    ],
    correctAnswer: 1,
    explanation:
      "Type inference is TypeScript's ability to automatically determine and assign types based on the value or context.",
  },
  {
    id: 15,
    category: "Typescript",
    difficulty: "easy",
    question: "How do you define a literal type in TypeScript?",
    options: [
      "type Status = 'active' | 'inactive';",
      "type Status = string;",
      "type Status = literal('active', 'inactive');",
      "type Status = enum('active', 'inactive');",
    ],
    correctAnswer: 0,
    explanation:
      "Literal types use union syntax with specific string, number, or boolean values.",
  },
  {
    id: 16,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the 'void' type used for?",
    options: [
      "Functions that return nothing",
      "Variables that can be null",
      "Empty objects",
      "Undefined variables",
    ],
    correctAnswer: 0,
    explanation:
      "void is used for functions that don't return a value (undefined return).",
  },
  {
    id: 17,
    category: "Typescript",
    difficulty: "easy",
    question: "How do you make a property readonly in an interface?",
    options: [
      "const property: string;",
      "readonly property: string;",
      "final property: string;",
      "immutable property: string;",
    ],
    correctAnswer: 1,
    explanation:
      "The 'readonly' modifier makes interface properties immutable after initialization.",
  },
  {
    id: 18,
    category: "Typescript",
    difficulty: "easy",
    question: "What is a tuple in TypeScript?",
    options: [
      "An array with fixed length and types",
      "A type of object",
      "A function parameter",
      "A generic constraint",
    ],
    correctAnswer: 0,
    explanation:
      "Tuples are arrays with a fixed number of elements where each element can have a different type.",
  },
  {
    id: 19,
    category: "Typescript",
    difficulty: "easy",
    question: "How do you define a tuple with two elements?",
    options: [
      "let tuple: [string, number] = ['hello', 42];",
      "let tuple: (string, number) = ['hello', 42];",
      "let tuple: {string, number} = ['hello', 42];",
      "let tuple: string | number = ['hello', 42];",
    ],
    correctAnswer: 0,
    explanation:
      "Tuples use square brackets with comma-separated types: [type1, type2].",
  },
  {
    id: 20,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the 'never' type?",
    options: [
      "A type for variables that are never used",
      "A type for functions that never return",
      "A type for null values",
      "A type for empty arrays",
    ],
    correctAnswer: 1,
    explanation:
      "The 'never' type represents functions that never return (throw errors or infinite loops).",
  },
  {
    id: 21,
    category: "Typescript",
    difficulty: "easy",
    question: "How do you define an enum in TypeScript?",
    options: [
      "enum Colors { Red, Green, Blue }",
      "const Colors = { Red, Green, Blue }",
      "type Colors = 'Red' | 'Green' | 'Blue'",
      "interface Colors { Red; Green; Blue; }",
    ],
    correctAnswer: 0,
    explanation:
      "Enums are defined using the 'enum' keyword followed by the enum name and values in braces.",
  },
  {
    id: 22,
    category: "Typescript",
    difficulty: "easy",
    question:
      "What is the difference between 'null' and 'undefined' in TypeScript?",
    options: [
      "They are identical",
      "null is intentional absence, undefined is uninitialized",
      "null is for numbers, undefined is for strings",
      "undefined is intentional absence, null is uninitialized",
    ],
    correctAnswer: 1,
    explanation:
      "null represents intentional absence of value, undefined represents uninitialized or missing value.",
  },
  {
    id: 23,
    category: "Typescript",
    difficulty: "easy",
    question: "How do you specify multiple types for a variable (union types)?",
    options: [
      "let value: string & number;",
      "let value: string | number;",
      "let value: string + number;",
      "let value: string, number;",
    ],
    correctAnswer: 1,
    explanation:
      "Union types use the pipe symbol (|) to specify multiple possible types.",
  },
  {
    id: 24,
    category: "Typescript",
    difficulty: "easy",
    question: "What is type assertion in TypeScript?",
    options: [
      "Automatically converting types",
      "Telling the compiler to treat a value as a specific type",
      "Validating types at runtime",
      "Creating new types",
    ],
    correctAnswer: 1,
    explanation:
      "Type assertion tells TypeScript compiler to treat a value as a specific type, overriding inference.",
  },
  // Next.js MCQs
  {
    id: 26,
    category: "Next",
    difficulty: "easy",
    question: "What is Next.js?",
    options: [
      "A CSS framework",
      "A React framework for production",
      "A database management system",
      "A testing library",
    ],
    correctAnswer: 1,
    explanation:
      "Next.js is a React framework that provides features like server-side rendering, static site generation, and API routes for production applications.",
  },
  {
    id: 27,
    category: "Next",
    difficulty: "easy",
    question: "What is the purpose of getStaticProps in Next.js?",
    options: [
      "To handle form submissions",
      "To fetch data at build time for static generation",
      "To create API endpoints",
      "To handle client-side routing",
    ],
    correctAnswer: 1,
    explanation:
      "getStaticProps is used to fetch data at build time for static site generation, allowing pages to be pre-rendered with data.",
  },
  {
    id: 28,
    category: "Next",
    difficulty: "easy",
    question:
      "What is the difference between getStaticProps and getServerSideProps?",
    options: [
      "No difference, they are the same",
      "getStaticProps runs at build time, getServerSideProps runs on each request",
      "getServerSideProps is faster than getStaticProps",
      "getStaticProps is for client-side, getServerSideProps is for server-side",
    ],
    correctAnswer: 1,
    explanation:
      "getStaticProps runs at build time for static generation, while getServerSideProps runs on each request for server-side rendering.",
  },
  {
    id: 29,
    category: "Next",
    difficulty: "easy",
    question: "How do you create dynamic routes in Next.js?",
    options: [
      "Using square brackets in file names like [id].js",
      "Using curly braces in file names like {id}.js",
      "Using parentheses in file names like (id).js",
      "Using angle brackets in file names like <id>.js",
    ],
    correctAnswer: 0,
    explanation:
      "Dynamic routes in Next.js are created by using square brackets in file names, such as [id].js or [slug].js.",
  },
  {
    id: 30,
    category: "Next",
    difficulty: "easy",
    question: "What is the App Router in Next.js 13+?",
    options: [
      "A routing library for React",
      "A new file-system based router built on React Server Components",
      "A tool for building mobile apps",
      "A database routing system",
    ],
    correctAnswer: 1,
    explanation:
      "The App Router is a new routing system in Next.js 13+ built on React Server Components, providing features like layouts, nested routing, and loading states.",
  },

  // AWS S3 MCQs
  {
    id: 31,
    category: "AWS S3",
    difficulty: "easy",
    question: "What does S3 stand for in AWS?",
    options: [
      "Simple Storage Service",
      "Secure Storage System",
      "Scalable Storage Solution",
      "Standard Storage Service",
    ],
    correctAnswer: 0,
    explanation:
      "S3 stands for Simple Storage Service, which is Amazon's object storage service designed for storing and retrieving any amount of data.",
  },
  {
    id: 32,
    category: "AWS S3",
    difficulty: "easy",
    question: "What is a bucket in AWS S3?",
    options: [
      "A type of database",
      "A container for objects",
      "A security group",
      "A compute instance",
    ],
    correctAnswer: 1,
    explanation:
      "A bucket is a container for objects in S3. Bucket names must be globally unique across all AWS accounts.",
  },
  {
    id: 33,
    category: "AWS S3",
    difficulty: "easy",
    question: "What is the maximum size of a single object in S3?",
    options: ["5 GB", "100 GB", "5 TB", "Unlimited"],
    correctAnswer: 2,
    explanation:
      "The maximum size of a single object in S3 is 5 TB. For objects larger than 100 MB, multipart upload is recommended.",
  },
  {
    id: 34,
    category: "AWS S3",
    difficulty: "easy",
    question:
      "Which storage class is most cost-effective for frequently accessed data?",
    options: [
      "S3 Glacier",
      "S3 Standard",
      "S3 Infrequent Access",
      "S3 Deep Archive",
    ],
    correctAnswer: 1,
    explanation:
      "S3 Standard is designed for frequently accessed data and provides high durability, availability, and performance.",
  },
  {
    id: 35,
    category: "AWS S3",
    difficulty: "medium",
    question: "What is versioning in S3?",
    options: [
      "A way to backup data",
      "A feature that keeps multiple variants of an object",
      "A security feature",
      "A way to compress objects",
    ],
    correctAnswer: 1,
    explanation:
      "Versioning allows you to keep multiple variants of an object in the same bucket, helping protect against accidental deletion or modification.",
  },

  {
    id: 117,
    category: "Javascript",
    difficulty: "medium",
    question:
      "What will this output? let x = [1,2,3]; let y = x; y.push(4); console.log(x);",
    options: ["[1,2,3]", "[1,2,3,4]", "Error", "undefined"],
    correctAnswer: 1,
    explanation:
      "Arrays are reference types. y and x point to the same array, so modifying y affects x.",
  },
  {
    id: 118,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the output of: console.log('5' - - '5')?",
    options: ["0", "10", "Error", "undefined"],
    correctAnswer: 1,
    explanation:
      "- -'5' is equivalent to -(-5) = 5, then '5' - 5 = 0... wait, '5' - 5 = 0, but '5' - -'5' = '5' - (-5) = 5 + 5 = 10.",
  },
  {
    id: 119,
    category: "Javascript",
    difficulty: "medium",
    question: "What will be the output of: console.log([] == ![]);",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 0,
    explanation:
      "![] is false (negation of truthy array), then [] == false becomes '' == false, which is true.",
  },
  {
    id: 120,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the result of: console.log(({}+{}).length)?",
    options: ["2", "30", "Error", "undefined"],
    correctAnswer: 1,
    explanation:
      "{}+{} becomes '[object Object][object Object]', which has length 30.",
  },
  {
    id: 121,
    category: "Javascript",
    difficulty: "medium",
    question: "What will this code output? console.log(0 || 1 && 2);",
    options: ["0", "1", "2", "true"],
    correctAnswer: 2,
    explanation:
      "Due to operator precedence, && is evaluated first: 1 && 2 = 2, then 0 || 2 = 2.",
  },
  {
    id: 122,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the output of: console.log(new Array(3).join('#'));",
    options: ["###", "##", "#", "Error"],
    correctAnswer: 1,
    explanation:
      "new Array(3) creates array with 3 empty slots. join('#') puts # between elements, so 2 #'s for 3 slots.",
  },
  {
    id: 123,
    category: "Javascript",
    difficulty: "medium",
    question: "What will console.log(Number.MIN_VALUE > 0) output?",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 0,
    explanation:
      "Number.MIN_VALUE is the smallest positive number greater than 0, so it's greater than 0.",
  },
  {
    id: 124,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the result of: console.log('hello'[1]);",
    options: ["h", "e", "l", "undefined"],
    correctAnswer: 1,
    explanation:
      "Strings can be accessed like arrays. 'hello'[1] returns the character at index 1, which is 'e'.",
  },
  {
    id: 125,
    category: "Javascript",
    difficulty: "medium",
    question:
      "What will this output? function test() { return { a: 1 }; } console.log(test().a);",
    options: ["1", "undefined", "Error", "{}"],
    correctAnswer: 0,
    explanation:
      "The function returns an object {a: 1}, so test().a accesses the property a, which is 1.",
  },
  {
    id: 126,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the output of: console.log(parseInt('08', 10));",
    options: ["8", "0", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "parseInt('08', 10) parses '08' in base 10 (decimal), resulting in 8.",
  },
  {
    id: 127,
    category: "Javascript",
    difficulty: "medium",
    question: "What will console.log(1/0 === Infinity) output?",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 0,
    explanation:
      "Division by zero in JavaScript results in Infinity, so 1/0 === Infinity is true.",
  },
  {
    id: 128,
    category: "Javascript",
    difficulty: "medium",
    question:
      "What is the result of: console.log(Object.prototype.toString.call([]));",
    options: ["[object Array]", "[object Object]", "Array", "Error"],
    correctAnswer: 0,
    explanation:
      "Object.prototype.toString.call([]) returns '[object Array]' for arrays.",
  },
  {
    id: 129,
    category: "Javascript",
    difficulty: "medium",
    question:
      "What will this code output? let a = {b: 1}; let c = a; c.b = 2; console.log(a.b);",
    options: ["1", "2", "undefined", "Error"],
    correctAnswer: 1,
    explanation:
      "Objects are reference types. c and a reference the same object, so modifying c.b affects a.b.",
  },
  {
    id: 130,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the output of: console.log(Array(3) == Array(3));",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 1,
    explanation:
      "Each Array(3) creates a new array object. Objects are compared by reference, not value.",
  },
  {
    id: 131,
    category: "Javascript",
    difficulty: "medium",
    question: "What will console.log([1,2,3].slice(-1)) output?",
    options: ["[3]", "[1,2]", "3", "Error"],
    correctAnswer: 0,
    explanation:
      "slice(-1) returns the last element(s) as an array. -1 means start from the last element.",
  },
  {
    id: 132,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the result of: console.log(void 0 === undefined);",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 0,
    explanation:
      "void operator always returns undefined, so void 0 === undefined is true.",
  },
  {
    id: 133,
    category: "Javascript",
    difficulty: "medium",
    question:
      "What will this output? const obj = {}; obj[Symbol.iterator] = null; console.log(obj[Symbol.iterator]);",
    options: ["null", "undefined", "Symbol", "Error"],
    correctAnswer: 0,
    explanation:
      "We explicitly set obj[Symbol.iterator] to null, so it returns null.",
  },
  {
    id: 134,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the output of: console.log(false == '0');",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 0,
    explanation:
      "With loose equality, false is converted to 0 and '0' is converted to 0, so 0 == 0 is true.",
  },
  {
    id: 135,
    category: "Javascript",
    difficulty: "medium",
    question:
      "What will console.log(String.prototype.split.call(12345, '')) output?",
    options: ["['1','2','3','4','5']", "Error", "12345", "['12345']"],
    correctAnswer: 0,
    explanation:
      "String.prototype.split.call converts 12345 to '12345', then splits into individual characters.",
  },
  {
    id: 136,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the result of: console.log([1] + [2]);",
    options: ["12", "3", "[1,2]", "Error"],
    correctAnswer: 0,
    explanation:
      "Arrays are converted to strings: [1] becomes '1', [2] becomes '2', then '1' + '2' = '12'.",
  },
  {
    id: 137,
    category: "Javascript",
    difficulty: "medium",
    question:
      "What will this code output? function test() { arguments[0] = 'changed'; console.log(arguments[0]); } test('original');",
    options: ["original", "changed", "undefined", "Error"],
    correctAnswer: 1,
    explanation:
      "The arguments object is mutable, so changing arguments[0] modifies the first argument.",
  },
  {
    id: 138,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the output of: console.log(Date.now() === Date.now());",
    options: ["true", "false", "undefined", "Depends on timing"],
    correctAnswer: 3,
    explanation:
      "Date.now() returns current timestamp. Two calls might return different values due to time passage.",
  },
  {
    id: 139,
    category: "Javascript",
    difficulty: "medium",
    question: "What will console.log([...'abc']) output?",
    options: ["['a','b','c']", "'abc'", "Error", "['abc']"],
    correctAnswer: 0,
    explanation:
      "The spread operator spreads the string 'abc' into individual characters in an array.",
  },
  {
    id: 140,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the result of: console.log(Number(''))?",
    options: ["0", "NaN", "undefined", "Error"],
    correctAnswer: 0,
    explanation:
      "An empty string is converted to 0 when using Number() constructor.",
  },
  {
    id: 141,
    category: "Javascript",
    difficulty: "medium",
    question:
      "What will this output? const a = [1,2,3]; const b = [...a]; b.push(4); console.log(a.length);",
    options: ["3", "4", "undefined", "Error"],
    correctAnswer: 0,
    explanation:
      "The spread operator creates a shallow copy. Modifying b doesn't affect the original array a.",
  },
  {
    id: 142,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the output of: console.log(+!![]);",
    options: ["0", "1", "true", "false"],
    correctAnswer: 1,
    explanation: "[] is truthy, !![] is true, +true converts to 1.",
  },
  {
    id: 143,
    category: "Javascript",
    difficulty: "medium",
    question: "What will console.log('b' + 'a' + + 'a' + 'a') output?",
    options: ["baNaNa", "baaa", "Error", "ba+aa"],
    correctAnswer: 0,
    explanation: "'b' + 'a' + (+'a') + 'a' = 'ba' + NaN + 'a' = 'baNaNa'.",
  },
  {
    id: 144,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the result of: console.log(!!null || !!undefined);",
    options: ["true", "false", "null", "undefined"],
    correctAnswer: 1,
    explanation:
      "!!null is false, !!undefined is false, so false || false is false.",
  },
  {
    id: 145,
    category: "Javascript",
    difficulty: "medium",
    question: "What will this code output? console.log(Array.from('hello'));",
    options: ["['h','e','l','l','o']", "'hello'", "Error", "hello"],
    correctAnswer: 0,
    explanation:
      "Array.from() creates an array from an iterable. Strings are iterable, so it creates an array of characters.",
  },
];

// 200 questions
export const nodeMCQs = [
  {
    id: 1,
    category: "Node",
    difficulty: "easy",
    question: "What is Node.js?",
    options: [
      "A JavaScript framework",
      "A JavaScript runtime built on Chrome's V8 engine",
      "A database management system",
      "A CSS preprocessor",
    ],
    correctAnswer: 1,
    explanation:
      "Node.js is a JavaScript runtime environment that allows you to run JavaScript on the server side, built on Chrome's V8 JavaScript engine.",
  },
  {
    id: 2,
    category: "Node",
    difficulty: "easy",
    question: "Which module is used to create a web server in Node.js?",
    options: ["fs", "path", "http", "url"],
    correctAnswer: 2,
    explanation:
      "The http module is used to create HTTP servers and clients in Node.js. It provides functionality to create web servers and handle HTTP requests/responses.",
  },
  {
    id: 3,
    category: "Node",
    difficulty: "easy",
    question: "What is the event loop in Node.js?",
    options: [
      "A loop that handles user events",
      "A mechanism that handles asynchronous operations",
      "A loop that processes HTTP requests",
      "A debugging feature",
    ],
    correctAnswer: 1,
    explanation:
      "The event loop is the mechanism that allows Node.js to perform non-blocking I/O operations by offloading operations to the system kernel whenever possible.",
  },
  {
    id: 4,
    category: "Node",
    difficulty: "easy",
    question: "What does npm stand for?",
    options: [
      "Node Package Manager",
      "New Programming Method",
      "Network Protocol Manager",
      "Node Process Manager",
    ],
    correctAnswer: 0,
    explanation:
      "npm stands for Node Package Manager. It is the default package manager for Node.js and is used to install, share, and manage dependencies.",
  },
  {
    id: 5,
    category: "Node",
    difficulty: "easy",
    question: "Which method is used to read a file asynchronously in Node.js?",
    options: [
      "fs.readFileSync()",
      "fs.readFile()",
      "fs.read()",
      "fs.openFile()",
    ],
    correctAnswer: 1,
    explanation:
      "fs.readFile() is used to read files asynchronously in Node.js. The synchronous version is fs.readFileSync().",
  },
  {
    id: 6,
    category: "Node",
    difficulty: "easy",
    question: "What is a callback function in Node.js?",
    options: [
      "A function that calls another function",
      "A function passed as an argument to another function",
      "A function that returns a promise",
      "A built-in Node.js method",
    ],
    correctAnswer: 1,
    explanation:
      "A callback function is a function passed as an argument to another function, which is then executed when a specific event occurs or an operation completes.",
  },
  {
    id: 7,
    category: "Node",
    difficulty: "easy",
    question: "Which of the following is a core module in Node.js?",
    options: ["express", "lodash", "fs", "axios"],
    correctAnswer: 2,
    explanation:
      "fs (File System) is a core module in Node.js that provides an API for interacting with the file system.",
  },
  {
    id: 8,
    category: "Node",
    difficulty: "easy",
    question: "What is the purpose of module.exports in Node.js?",
    options: [
      "To export modules from npm",
      "To make functions/objects available to other modules",
      "To import modules from other files",
      "To create a new module",
    ],
    correctAnswer: 1,
    explanation:
      "module.exports is used to export functions, objects, or values from one module so they can be imported and used in other modules using require().",
  },
  {
    id: 9,
    category: "Node",
    difficulty: "easy",
    question: "What is the global object in Node.js?",
    options: ["window", "document", "global", "process"],
    correctAnswer: 2,
    explanation:
      "The global object in Node.js is called 'global', similar to 'window' in browsers. It provides access to global variables and functions.",
  },
  {
    id: 10,
    category: "Node",
    difficulty: "easy",
    question: "Which method is used to install a package locally in Node.js?",
    options: [
      "npm install -g package-name",
      "npm add package-name",
      "npm install package-name",
      "npm get package-name",
    ],
    correctAnswer: 2,
    explanation:
      "npm install package-name installs a package locally in the node_modules directory of your project.",
  },
  {
    id: 11,
    category: "Node",
    difficulty: "easy",
    question: "What is the purpose of the package.json file?",
    options: [
      "To store environment variables",
      "To define project metadata and dependencies",
      "To configure the Node.js runtime",
      "To store database configuration",
    ],
    correctAnswer: 1,
    explanation:
      "package.json contains project metadata, dependencies, scripts, and other configuration information for a Node.js project.",
  },
  {
    id: 12,
    category: "Node",
    difficulty: "easy",
    question: "Which of the following is NOT a Node.js stream type?",
    options: ["Readable", "Writable", "Duplex", "Bidirectional"],
    correctAnswer: 3,
    explanation:
      "Node.js has four stream types: Readable, Writable, Duplex, and Transform. 'Bidirectional' is not a valid stream type.",
  },
  {
    id: 13,
    category: "Node",
    difficulty: "easy",
    question: "What does the 'fs' module stand for?",
    options: ["File System", "Fast Storage", "File Stream", "Function Store"],
    correctAnswer: 0,
    explanation:
      "fs stands for File System. It's a core Node.js module for interacting with the file system.",
  },
  {
    id: 14,
    category: "Node",
    difficulty: "easy",
    question: "Which method creates a new directory in Node.js?",
    options: ["fs.createDir()", "fs.mkdir()", "fs.makeDir()", "fs.newDir()"],
    correctAnswer: 1,
    explanation: "fs.mkdir() is used to create a new directory in Node.js.",
  },
  {
    id: 15,
    category: "Node",
    difficulty: "easy",
    question: "What is the purpose of process.env in Node.js?",
    options: [
      "To access environment variables",
      "To set the Node.js version",
      "To configure the event loop",
      "To manage memory usage",
    ],
    correctAnswer: 0,
    explanation:
      "process.env is an object containing the user environment. It's used to access environment variables in Node.js applications.",
  },
  {
    id: 16,
    category: "Node",
    difficulty: "easy",
    question: "Which of the following is a Node.js HTTP method?",
    options: [
      "app.get()",
      "http.createServer()",
      "server.listen()",
      "All of the above",
    ],
    correctAnswer: 3,
    explanation:
      "All listed methods are valid in Node.js HTTP operations. app.get() is from Express, while http.createServer() and server.listen() are core HTTP methods.",
  },
  {
    id: 17,
    category: "Node",
    difficulty: "easy",
    question: "What is a Promise in Node.js?",
    options: [
      "A guarantee that code will work",
      "An object representing eventual completion of an async operation",
      "A type of callback function",
      "A debugging tool",
    ],
    correctAnswer: 1,
    explanation:
      "A Promise is an object representing the eventual completion or failure of an asynchronous operation and its resulting value.",
  },
  {
    id: 18,
    category: "Node",
    difficulty: "easy",
    question: "Which keyword is used for async/await in Node.js?",
    options: ["async", "await", "Both async and await", "promise"],
    correctAnswer: 2,
    explanation:
      "Both 'async' and 'await' keywords are used together. 'async' declares an async function, and 'await' pauses execution until a Promise resolves.",
  },
  {
    id: 19,
    category: "Node",
    difficulty: "easy",
    question: "What is the default port for Node.js HTTP server?",
    options: ["80", "443", "3000", "8080"],
    correctAnswer: 2,
    explanation:
      "While Node.js can run on any port, 3000 is commonly used as the default port for development servers.",
  },
  {
    id: 20,
    category: "Node",
    difficulty: "easy",
    question: "Which method is used to handle errors in async/await?",
    options: ["try/catch", "error()", "catch()", "handleError()"],
    correctAnswer: 0,
    explanation:
      "try/catch blocks are used to handle errors in async/await functions, providing synchronous-style error handling for asynchronous code.",
  },
  {
    id: 21,
    category: "Node",
    difficulty: "easy",
    question: "What is the purpose of the 'path' module in Node.js?",
    options: [
      "To handle file paths",
      "To create HTTP paths",
      "To manage database connections",
      "To handle URL routing",
    ],
    correctAnswer: 0,
    explanation:
      "The path module provides utilities for working with file and directory paths in Node.js.",
  },
  {
    id: 22,
    category: "Node",
    difficulty: "easy",
    question: "Which method is used to delete a file in Node.js?",
    options: ["fs.delete()", "fs.remove()", "fs.unlink()", "fs.erase()"],
    correctAnswer: 2,
    explanation:
      "fs.unlink() is used to delete a file in Node.js. The name comes from Unix systems where 'unlink' removes the link between the filename and the actual file data.",
  },
  {
    id: 23,
    category: "Node",
    difficulty: "easy",
    question: "What is Buffer in Node.js?",
    options: [
      "A temporary storage area",
      "A way to handle binary data",
      "A caching mechanism",
      "A debugging tool",
    ],
    correctAnswer: 1,
    explanation:
      "Buffer is a global object in Node.js used to handle binary data directly, useful when working with TCP streams or file system operations.",
  },
  {
    id: 24,
    category: "Node",
    difficulty: "easy",
    question: "Which of the following is NOT a valid HTTP status code?",
    options: ["200", "404", "500", "999"],
    correctAnswer: 3,
    explanation:
      "999 is not a standard HTTP status code. 200 means OK, 404 means Not Found, and 500 means Internal Server Error.",
  },
  {
    id: 25,
    category: "Node",
    difficulty: "easy",
    question: "What is the purpose of server.listen() in Node.js?",
    options: [
      "To start listening for incoming connections",
      "To create a new server",
      "To stop the server",
      "To configure server settings",
    ],
    correctAnswer: 0,
    explanation:
      "server.listen() starts the HTTP server and makes it listen for incoming connections on the specified port.",
  },
  {
    id: 26,
    category: "Node",
    difficulty: "easy",
    question: "Which module is used to work with URLs in Node.js?",
    options: ["url", "path", "http", "uri"],
    correctAnswer: 0,
    explanation:
      "The url module provides utilities for URL resolution and parsing in Node.js.",
  },
  {
    id: 27,
    category: "Node",
    difficulty: "easy",
    question: "What is callback hell in Node.js?",
    options: [
      "When callbacks are used too frequently",
      "When callbacks are nested deeply, making code hard to read",
      "When callbacks fail to execute",
      "When callbacks are used synchronously",
    ],
    correctAnswer: 1,
    explanation:
      "Callback hell refers to deeply nested callbacks that make code difficult to read and maintain. It's often solved using Promises or async/await.",
  },
  {
    id: 28,
    category: "Node",
    difficulty: "easy",
    question:
      "Which method converts a callback-based function to a Promise-based one?",
    options: [
      "Promise.convert()",
      "util.promisify()",
      "Promise.wrap()",
      "async.wrap()",
    ],
    correctAnswer: 1,
    explanation:
      "util.promisify() is a utility that converts callback-based functions to return Promises, enabling their use with async/await.",
  },
  {
    id: 29,
    category: "Node",
    difficulty: "easy",
    question: "What is the purpose of __dirname in Node.js?",
    options: [
      "Current working directory",
      "Directory name of the current module",
      "Root directory of the project",
      "Temporary directory",
    ],
    correctAnswer: 1,
    explanation:
      "__dirname is a global variable that represents the directory name of the current module, providing the absolute path.",
  },
  {
    id: 30,
    category: "Node",
    difficulty: "easy",
    question:
      "Which of the following is a NoSQL database commonly used with Node.js?",
    options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
    correctAnswer: 2,
    explanation:
      "MongoDB is a popular NoSQL database that works well with Node.js, often used with the Mongoose ODM.",
  },
  {
    id: 31,
    category: "Node",
    difficulty: "easy",
    question: "What is the purpose of package-lock.json?",
    options: [
      "To lock the package manager version",
      "To ensure consistent dependency versions across installations",
      "To prevent package updates",
      "To encrypt package information",
    ],
    correctAnswer: 1,
    explanation:
      "package-lock.json ensures that everyone working on the project installs exactly the same dependency versions, maintaining consistency across environments.",
  },
  {
    id: 32,
    category: "Node",
    difficulty: "easy",
    question:
      "Which method is used to write to a file asynchronously in Node.js?",
    options: ["fs.writeFile()", "fs.write()", "fs.save()", "fs.append()"],
    correctAnswer: 0,
    explanation:
      "fs.writeFile() is used to write data to a file asynchronously, replacing the file if it already exists.",
  },
  {
    id: 33,
    category: "Node",
    difficulty: "easy",
    question: "What is the purpose of process.exit()?",
    options: [
      "To exit the current function",
      "To terminate the Node.js process",
      "To close a database connection",
      "To stop a server",
    ],
    correctAnswer: 1,
    explanation:
      "process.exit() terminates the Node.js process with a specified exit code. Code 0 indicates success, while non-zero codes indicate various error conditions.",
  },
  {
    id: 34,
    category: "Node",
    difficulty: "easy",
    question: "Which of the following is a web framework for Node.js?",
    options: ["Django", "Laravel", "Express", "Spring"],
    correctAnswer: 2,
    explanation:
      "Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.",
  },
  {
    id: 35,
    category: "Node",
    difficulty: "easy",
    question: "What is middleware in Node.js?",
    options: [
      "Database middleware",
      "Functions that execute during request-response cycle",
      "Security protocols",
      "Template engines",
    ],
    correctAnswer: 1,
    explanation:
      "Middleware functions are functions that have access to the request object, response object, and next middleware function in the application's request-response cycle.",
  },
  {
    id: 36,
    category: "Node",
    difficulty: "easy",
    question: "Which method is used to append data to a file in Node.js?",
    options: [
      "fs.appendFile()",
      "fs.addToFile()",
      "fs.writeFile()",
      "fs.extend()",
    ],
    correctAnswer: 0,
    explanation:
      "fs.appendFile() appends data to a file, creating the file if it doesn't exist. Unlike fs.writeFile(), it doesn't overwrite existing content.",
  },
  {
    id: 37,
    category: "Node",
    difficulty: "easy",
    question: "What is the purpose of require() in Node.js?",
    options: [
      "To require user input",
      "To import modules",
      "To validate data",
      "To create requirements",
    ],
    correctAnswer: 1,
    explanation:
      "require() is used to import modules in Node.js, whether they are core modules, third-party modules from npm, or local modules.",
  },
  {
    id: 38,
    category: "Node",
    difficulty: "easy",
    question: "Which of the following is a valid way to create a Promise?",
    options: [
      "new Promise()",
      "Promise.create()",
      "new Promise(function(resolve, reject) {})",
      "Promise.make()",
    ],
    correctAnswer: 2,
    explanation:
      "Promises are created using new Promise() with an executor function that takes resolve and reject callbacks as parameters.",
  },
  {
    id: 39,
    category: "Node",
    difficulty: "easy",
    question: "What is the purpose of setTimeout() in Node.js?",
    options: [
      "To set server timeout",
      "To execute code after a specified delay",
      "To timeout database connections",
      "To set request timeout",
    ],
    correctAnswer: 1,
    explanation:
      "setTimeout() executes a function or code after a specified number of milliseconds, useful for delaying code execution.",
  },
  {
    id: 40,
    category: "Node",
    difficulty: "easy",
    question: "Which method checks if a file exists in Node.js?",
    options: [
      "fs.exists()",
      "fs.checkFile()",
      "fs.access()",
      "fs.fileExists()",
    ],
    correctAnswer: 2,
    explanation:
      "fs.access() is the recommended way to check if a file exists in Node.js. The older fs.exists() is deprecated.",
  },
  {
    id: 41,
    category: "Node",
    difficulty: "easy",
    question: "What is JSON in Node.js?",
    options: [
      "JavaScript Object Notation",
      "Java Standard Object Notation",
      "JavaScript Organized Notation",
      "Java Server Object Notation",
    ],
    correctAnswer: 0,
    explanation:
      "JSON (JavaScript Object Notation) is a lightweight data interchange format that is easy for humans to read and write, and easy for machines to parse.",
  },
  {
    id: 42,
    category: "Node",
    difficulty: "easy",
    question: "Which of the following is used for environment variables?",
    options: [".env file", "config.json", "package.json", "settings.js"],
    correctAnswer: 0,
    explanation:
      ".env files are commonly used to store environment variables, often loaded using packages like dotenv.",
  },
  {
    id: 43,
    category: "Node",
    difficulty: "easy",
    question: "What is the purpose of next() in Express middleware?",
    options: [
      "To go to the next route",
      "To pass control to the next middleware function",
      "To skip middleware",
      "To end the request",
    ],
    correctAnswer: 1,
    explanation:
      "next() is a function that passes control to the next middleware function in the stack. If not called, the request will hang.",
  },
  {
    id: 44,
    category: "Node",
    difficulty: "easy",
    question: "Which method reads a directory in Node.js?",
    options: [
      "fs.readDir()",
      "fs.readdir()",
      "fs.readDirectory()",
      "fs.list()",
    ],
    correctAnswer: 1,
    explanation:
      "fs.readdir() reads the contents of a directory, returning an array of filenames.",
  },
  {
    id: 45,
    category: "Node",
    difficulty: "easy",
    question: "What is the purpose of __filename?",
    options: [
      "Current file's name",
      "Directory name",
      "Project name",
      "Module name",
    ],
    correctAnswer: 0,
    explanation:
      "__filename is a global variable that represents the filename of the current module with its absolute path.",
  },
  {
    id: 46,
    category: "Node",
    difficulty: "easy",
    question: "Which of the following is a templating engine for Node.js?",
    options: ["React", "Vue", "EJS", "Angular"],
    correctAnswer: 2,
    explanation:
      "EJS (Embedded JavaScript) is a templating engine that lets you embed JavaScript code in HTML templates.",
  },
  {
    id: 47,
    category: "Node",
    difficulty: "easy",
    question: "What is the purpose of req.params in Express?",
    options: [
      "URL query parameters",
      "Route parameters",
      "Request headers",
      "Request body",
    ],
    correctAnswer: 1,
    explanation:
      "req.params contains route parameters (e.g., /users/:id where :id is a route parameter).",
  },
  {
    id: 48,
    category: "Node",
    difficulty: "easy",
    question: "Which method sends a JSON response in Express?",
    options: ["res.send()", "res.json()", "res.sendJSON()", "res.respond()"],
    correctAnswer: 1,
    explanation:
      "res.json() sends a JSON response with the correct Content-Type header automatically set to application/json.",
  },
  {
    id: 49,
    category: "Node",
    difficulty: "easy",
    question: "What is the purpose of nodemon?",
    options: [
      "Node.js version manager",
      "Development tool that auto-restarts server on file changes",
      "Package manager",
      "Testing framework",
    ],
    correctAnswer: 1,
    explanation:
      "nodemon is a development tool that automatically restarts your Node.js application when file changes are detected.",
  },
  {
    id: 50,
    category: "Node",
    difficulty: "easy",
    question: "Which of the following is used for authentication in Node.js?",
    options: ["Passport", "Express", "Mongoose", "Socket.io"],
    correctAnswer: 0,
    explanation:
      "Passport is a popular authentication middleware for Node.js that supports various authentication strategies.",
  },
  {
    id: 51,
    category: "Node",
    difficulty: "easy",
    question: "What is the purpose of req.query in Express?",
    options: [
      "Database queries",
      "URL query string parameters",
      "Request body data",
      "Route parameters",
    ],
    correctAnswer: 1,
    explanation:
      "req.query contains the parsed query string parameters from the URL (e.g., ?name=john&age=25).",
  },
  {
    id: 52,
    category: "Node",
    difficulty: "easy",
    question: "Which method is used to handle POST requests in Express?",
    options: ["app.post()", "app.get()", "app.request()", "app.receive()"],
    correctAnswer: 0,
    explanation:
      "app.post() is used to handle HTTP POST requests in Express, typically used for creating new resources.",
  },
  {
    id: 53,
    category: "Node",
    difficulty: "easy",
    question: "What is CORS in Node.js?",
    options: [
      "Cross-Origin Resource Sharing",
      "Cross-Origin Request Security",
      "Centralized Origin Resource System",
      "Cross-Origin Response Sharing",
    ],
    correctAnswer: 0,
    explanation:
      "CORS (Cross-Origin Resource Sharing) is a mechanism that allows restricted resources on a web page to be requested from another domain.",
  },
  {
    id: 54,
    category: "Node",
    difficulty: "easy",
    question: "Which method is used to parse JSON in Node.js?",
    options: [
      "JSON.parse()",
      "JSON.stringify()",
      "JSON.convert()",
      "JSON.read()",
    ],
    correctAnswer: 0,
    explanation:
      "JSON.parse() converts a JSON string into a JavaScript object.",
  },
  {
    id: 55,
    category: "Node",
    difficulty: "easy",
    question: "What is the purpose of JSON.stringify()?",
    options: [
      "To parse JSON strings",
      "To convert JavaScript objects to JSON strings",
      "To validate JSON",
      "To format JSON",
    ],
    correctAnswer: 1,
    explanation:
      "JSON.stringify() converts JavaScript objects or values to JSON strings, useful for sending data over networks.",
  },
  {
    id: 56,
    category: "Node",
    difficulty: "easy",
    question:
      "Which of the following is used for real-time communication in Node.js?",
    options: ["Ajax", "WebSocket", "HTTP", "REST API"],
    correctAnswer: 1,
    explanation:
      "WebSocket provides full-duplex communication channels over a single TCP connection, enabling real-time communication.",
  },
  {
    id: 57,
    category: "Node",
    difficulty: "easy",
    question: "What is Socket.io?",
    options: [
      "Database library",
      "Real-time bidirectional event-based communication library",
      "HTTP client",
      "Template engine",
    ],
    correctAnswer: 1,
    explanation:
      "Socket.io enables real-time, bidirectional, and event-based communication between the browser and server.",
  },
  {
    id: 58,
    category: "Node",
    difficulty: "easy",
    question: "Which method is used to set HTTP headers in Express?",
    options: [
      "res.set()",
      "res.header()",
      "res.setHeader()",
      "All of the above",
    ],
    correctAnswer: 3,
    explanation:
      "All these methods can be used to set HTTP headers in Express: res.set(), res.header(), and res.setHeader().",
  },
  {
    id: 59,
    category: "Node",
    difficulty: "easy",
    question: "What is the purpose of body-parser middleware?",
    options: [
      "To parse HTML bodies",
      "To parse incoming request bodies",
      "To parse JSON files",
      "To parse URL parameters",
    ],
    correctAnswer: 1,
    explanation:
      "body-parser middleware parses incoming request bodies in a middleware before your handlers, available under the req.body property.",
  },
  {
    id: 60,
    category: "Node",
    difficulty: "easy",
    question:
      "Which of the following is used for database operations with MongoDB?",
    options: ["Mongoose", "Express", "Passport", "Axios"],
    correctAnswer: 0,
    explanation:
      "Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js, providing schema validation and query building.",
  },
  {
    id: 61,
    category: "Node",
    difficulty: "easy",
    question: "What is a schema in Mongoose?",
    options: [
      "Database structure",
      "Document structure definition",
      "Table definition",
      "Query structure",
    ],
    correctAnswer: 1,
    explanation:
      "A schema in Mongoose defines the structure of documents, default values, validators, etc. within a collection.",
  },
  {
    id: 62,
    category: "Node",
    difficulty: "easy",
    question: "Which method is used to connect to MongoDB using Mongoose?",
    options: [
      "mongoose.connect()",
      "mongoose.link()",
      "mongoose.join()",
      "mongoose.open()",
    ],
    correctAnswer: 0,
    explanation:
      "mongoose.connect() is used to establish a connection to a MongoDB database.",
  },
  {
    id: 63,
    category: "Node",
    difficulty: "easy",
    question: "What is the purpose of dotenv package?",
    options: [
      "To validate environment variables",
      "To load environment variables from .env file",
      "To create environment files",
      "To manage Node.js versions",
    ],
    correctAnswer: 1,
    explanation:
      "dotenv loads environment variables from a .env file into process.env, keeping sensitive data separate from code.",
  },
  {
    id: 64,
    category: "Node",
    difficulty: "easy",
    question: "Which HTTP method is typically used for updating resources?",
    options: ["GET", "POST", "PUT", "DELETE"],
    correctAnswer: 2,
    explanation:
      "PUT is typically used to update existing resources, while POST is used to create new resources.",
  },
  {
    id: 65,
    category: "Node",
    difficulty: "easy",
    question: "What is the purpose of helmet in Express?",
    options: [
      "Template engine",
      "Security middleware",
      "Database tool",
      "Performance optimizer",
    ],
    correctAnswer: 1,
    explanation:
      "Helmet helps secure Express apps by setting various HTTP headers and protecting against common web vulnerabilities.",
  },
  {
    id: 66,
    category: "Node",
    difficulty: "easy",
    question: "Which of the following is used for logging in Node.js?",
    options: ["console.log()", "Winston", "Morgan", "All of the above"],
    correctAnswer: 3,
    explanation:
      "All of these can be used for logging. console.log() is basic, Winston is a logging library, and Morgan is HTTP request logger middleware.",
  },
  {
    id: 67,
    category: "Node",
    difficulty: "easy",
    question: "What is the purpose of morgan middleware?",
    options: [
      "User authentication",
      "HTTP request logging",
      "Database queries",
      "Error handling",
    ],
    correctAnswer: 1,
    explanation:
      "Morgan is HTTP request logger middleware for Node.js that automatically logs HTTP requests to your application.",
  },
  {
    id: 68,
    category: "Node",
    difficulty: "easy",
    question: "Which method is used to handle errors in Express?",
    options: [
      "app.error()",
      "app.use() with error handling",
      "app.catch()",
      "app.handle()",
    ],
    correctAnswer: 1,
    explanation:
      "Error handling middleware in Express is defined using app.use() with four parameters: (err, req, res, next).",
  },
  {
    id: 69,
    category: "Node",
    difficulty: "easy",
    question: "What is the purpose of req.body?",
    options: [
      "URL parameters",
      "Request headers",
      "Request body data",
      "Route parameters",
    ],
    correctAnswer: 2,
    explanation:
      "req.body contains key-value pairs of data submitted in the request body, typically from POST or PUT requests.",
  },
  {
    id: 70,
    category: "Node",
    difficulty: "easy",
    question:
      "Which of the following is used for testing Node.js applications?",
    options: ["Jest", "React", "Vue", "Angular"],
    correctAnswer: 0,
    explanation:
      "Jest is a popular testing framework for JavaScript and Node.js applications, providing assertion libraries and test runners.",
  },
  {
    id: 71,
    category: "Node",
    difficulty: "easy",
    question: "What is the purpose of supertest?",
    options: [
      "Database testing",
      "HTTP assertion library",
      "Unit testing",
      "Performance testing",
    ],
    correctAnswer: 1,
    explanation:
      "Supertest is an HTTP assertion library used for testing Node.js HTTP servers, often used with Express applications.",
  },
  {
    id: 72,
    category: "Node",
    difficulty: "easy",
    question: "Which method is used to set status code in Express response?",
    options: [
      "res.status()",
      "res.code()",
      "res.setStatus()",
      "res.statusCode()",
    ],
    correctAnswer: 0,
    explanation:
      "res.status() sets the HTTP status code for the response, such as res.status(200) for success or res.status(404) for not found.",
  },
  {
    id: 73,
    category: "Node",
    difficulty: "easy",
    question: "What is the default Content-Type for Express responses?",
    options: [
      "text/html",
      "application/json",
      "text/plain",
      "Depends on res.send() vs res.json()",
    ],
    correctAnswer: 3,
    explanation:
      "The Content-Type depends on the response method: res.send() defaults to text/html, while res.json() sets application/json.",
  },
  {
    id: 74,
    category: "Node",
    difficulty: "easy",
    question: "Which of the following is used for session management?",
    options: [
      "express-session",
      "passport",
      "jsonwebtoken",
      "All of the above",
    ],
    correctAnswer: 3,
    explanation:
      "All can be used for session management: express-session for server-side sessions, passport for authentication, and JWT for stateless authentication.",
  },
  {
    id: 75,
    category: "Node",
    difficulty: "easy",
    question: "What is JWT?",
    options: [
      "JavaScript Web Testing",
      "JSON Web Token",
      "Java Web Toolkit",
      "JSON Web Testing",
    ],
    correctAnswer: 1,
    explanation:
      "JWT (JSON Web Token) is a compact, URL-safe means of representing claims to be transferred between two parties.",
  },
  {
    id: 76,
    category: "Node",
    difficulty: "easy",
    question: "Which method is used to hash passwords in Node.js?",
    options: [
      "bcrypt.hash()",
      "crypto.hash()",
      "password.hash()",
      "security.hash()",
    ],
    correctAnswer: 0,
    explanation:
      "bcrypt.hash() is commonly used to securely hash passwords before storing them in the database.",
  },
  {
    id: 77,
    category: "Node",
    difficulty: "easy",
    question: "What is the purpose of crypto module?",
    options: [
      "Currency conversion",
      "Cryptographic functionality",
      "Data compression",
      "File encryption only",
    ],
    correctAnswer: 1,
    explanation:
      "The crypto module provides cryptographic functionality including hash functions, HMAC, ciphers, and more for securing data.",
  },
  {
    id: 78,
    category: "Node",
    difficulty: "easy",
    question: "Which of the following is used for API rate limiting?",
    options: ["express-rate-limit", "cors", "helmet", "morgan"],
    correctAnswer: 0,
    explanation:
      "express-rate-limit is middleware for rate-limiting incoming requests to prevent abuse and DDoS attacks.",
  },
  {
    id: 79,
    category: "Node",
    difficulty: "easy",
    question: "What is the purpose of compression middleware?",
    options: [
      "File compression",
      "Response compression",
      "Request compression",
      "Database compression",
    ],
    correctAnswer: 1,
    explanation:
      "Compression middleware compresses response bodies to decrease the size of responses, improving performance.",
  },
  {
    id: 80,
    category: "Node",
    difficulty: "easy",
    question: "Which HTTP method is typically used for deleting resources?",
    options: ["GET", "POST", "PUT", "DELETE"],
    correctAnswer: 3,
    explanation:
      "DELETE is the HTTP method typically used to remove or delete resources from the server.",
  },
  {
    id: 81,
    category: "Node",
    difficulty: "easy",
    question: "What is the purpose of req.headers?",
    options: [
      "Response headers",
      "Request headers sent by client",
      "Custom headers",
      "Security headers",
    ],
    correctAnswer: 1,
    explanation:
      "req.headers contains the headers sent by the client in the HTTP request, such as User-Agent, Authorization, etc.",
  },
  {
    id: 82,
    category: "Node",
    difficulty: "easy",
    question: "Which of the following is used for database migrations?",
    options: ["Sequelize", "Knex", "Both Sequelize and Knex", "Express"],
    correctAnswer: 2,
    explanation:
      "Both Sequelize (ORM) and Knex (query builder) provide migration systems for managing database schema changes.",
  },
  {
    id: 83,
    category: "Node",
    difficulty: "easy",
    question: "What is an ORM?",
    options: [
      "Object Runtime Model",
      "Object-Relational Mapping",
      "Object Request Model",
      "Object Resource Mapping",
    ],
    correctAnswer: 1,
    explanation:
      "ORM (Object-Relational Mapping) is a technique that maps objects in code to database tables, abstracting database operations.",
  },
  {
    id: 84,
    category: "Node",
    difficulty: "easy",
    question: "Which of the following is a Node.js ORM?",
    options: ["Sequelize", "TypeORM", "Prisma", "All of the above"],
    correctAnswer: 3,
    explanation:
      "All are Node.js ORMs: Sequelize is promise-based, TypeORM supports TypeScript, and Prisma is a modern database toolkit.",
  },
  {
    id: 85,
    category: "Node",
    difficulty: "easy",
    question: "What is the purpose of connection pooling?",
    options: [
      "To pool connections together",
      "To reuse database connections efficiently",
      "To create multiple connections",
      "To close connections",
    ],
    correctAnswer: 1,
    explanation:
      "Connection pooling maintains a pool of database connections that can be reused, reducing the overhead of creating new connections.",
  },
  {
    id: 86,
    category: "Node",
    difficulty: "easy",
    question: "Which of the following is used for background jobs?",
    options: ["Bull", "Agenda", "Kue", "All of the above"],
    correctAnswer: 3,
    explanation:
      "All are Node.js libraries for handling background jobs and task queues, often using Redis for job storage.",
  },
  {
    id: 87,
    category: "Node",
    difficulty: "easy",
    question: "What is Redis?",
    options: [
      "Relational database",
      "In-memory data store",
      "File system",
      "Search engine",
    ],
    correctAnswer: 1,
    explanation:
      "Redis is an in-memory data structure store used as a database, cache, and message broker, popular for caching and session storage.",
  },
  {
    id: 88,
    category: "Node",
    difficulty: "easy",
    question: "Which of the following is used for validation?",
    options: ["Joi", "Validator", "express-validator", "All of the above"],
    correctAnswer: 3,
    explanation:
      "All are validation libraries: Joi is schema-based, Validator is string validation, and express-validator integrates with Express.",
  },
  {
    id: 89,
    category: "Node",
    difficulty: "easy",
    question: "What is the purpose of async.parallel?",
    options: [
      "To run async functions in parallel",
      "To run async functions in series",
      "To create promises",
      "To handle errors",
    ],
    correctAnswer: 0,
    explanation:
      "async.parallel runs multiple asynchronous operations in parallel and waits for all to complete before calling the final callback.",
  },
  {
    id: 90,
    category: "Node",
    difficulty: "easy",
    question: "Which of the following is used for scraping?",
    options: ["Cheerio", "Puppeteer", "Both Cheerio and Puppeteer", "Express"],
    correctAnswer: 2,
    explanation:
      "Cheerio is for server-side jQuery-like HTML parsing, while Puppeteer provides headless Chrome automation for complex scraping.",
  },
  {
    id: 91,
    category: "Node",
    difficulty: "easy",
    question: "What is the purpose of cluster module?",
    options: [
      "Database clustering",
      "Server clustering for load balancing",
      "File clustering",
      "Memory clustering",
    ],
    correctAnswer: 1,
    explanation:
      "The cluster module allows you to create child processes (workers) to handle incoming requests, utilizing multiple CPU cores.",
  },
  {
    id: 92,
    category: "Node",
    difficulty: "easy",
    question: "Which of the following is used for monitoring?",
    options: ["PM2", "Nodemon", "Forever", "All of the above"],
    correctAnswer: 3,
    explanation:
      "All are process management tools: PM2 provides monitoring and clustering, Nodemon for development, Forever for keeping apps running.",
  },
  {
    id: 93,
    category: "Node",
    difficulty: "easy",
    question: "What is PM2?",
    options: [
      "Package manager",
      "Process manager",
      "Performance monitor",
      "Both process manager and performance monitor",
    ],
    correctAnswer: 3,
    explanation:
      "PM2 is an advanced process manager for Node.js applications with built-in load balancer, monitoring, and auto-restart capabilities.",
  },
  {
    id: 94,
    category: "Node",
    difficulty: "easy",
    question: "Which of the following is used for API documentation?",
    options: ["Swagger", "JSDoc", "Both Swagger and JSDoc", "Express"],
    correctAnswer: 2,
    explanation:
      "Swagger/OpenAPI for interactive API documentation, JSDoc for JavaScript code documentation.",
  },
  {
    id: 95,
    category: "Node",
    difficulty: "easy",
    question: "What is the purpose of process.argv?",
    options: [
      "To access application arguments",
      "To access environment variables",
      "To access file paths",
      "To access memory usage",
    ],
    correctAnswer: 0,
    explanation:
      "process.argv is an array containing command line arguments passed when starting the Node.js process.",
  },
  {
    id: 96,
    category: "Node",
    difficulty: "easy",
    question: "Which of the following is used for file uploads?",
    options: ["Multer", "Express", "Formidable", "Both Multer and Formidable"],
    correctAnswer: 3,
    explanation:
      "Both Multer and Formidable are middleware for handling multipart/form-data, used primarily for file uploads.",
  },
  {
    id: 97,
    category: "Node",
    difficulty: "easy",
    question: "What is the purpose of sharp package?",
    options: [
      "Image processing",
      "Data processing",
      "Text processing",
      "Audio processing",
    ],
    correctAnswer: 0,
    explanation:
      "Sharp is a high-performance image processing library for resizing, cropping, and manipulating images in Node.js.",
  },
  {
    id: 98,
    category: "Node",
    difficulty: "easy",
    question: "Which of the following is used for email sending?",
    options: ["Nodemailer", "Sendmail", "EmailJS", "All of the above"],
    correctAnswer: 3,
    explanation:
      "All are email sending solutions: Nodemailer is most popular, Sendmail is traditional, EmailJS provides email services.",
  },
  {
    id: 99,
    category: "Node",
    difficulty: "easy",
    question: "What is the purpose of uuid package?",
    options: [
      "To create unique identifiers",
      "To validate IDs",
      "To generate random numbers",
      "To create database keys",
    ],
    correctAnswer: 0,
    explanation:
      "UUID (Universally Unique Identifier) package generates unique identifiers that can be used as database keys, session IDs, etc.",
  },
  {
    id: 100,
    category: "Node",
    difficulty: "easy",
    question: "Which of the following is used for caching?",
    options: [
      "Node-cache",
      "Memory-cache",
      "Both Node-cache and Memory-cache",
      "Express",
    ],
    correctAnswer: 2,
    explanation:
      "Both node-cache and memory-cache provide in-memory caching solutions for Node.js applications to improve performance.",
  },
  {
    id: 101,
    category: "Node",
    difficulty: "medium",
    question:
      "What is the difference between setImmediate() and setTimeout() with 0ms?",
    options: [
      "No difference",
      "setImmediate() runs before I/O callbacks, setTimeout() after",
      "setTimeout() runs before setImmediate()",
      "setImmediate() is deprecated",
    ],
    correctAnswer: 1,
    explanation:
      "setImmediate() executes in the check phase of the event loop, after poll phase but before close callbacks, while setTimeout() with 0ms runs in the timers phase.",
  },
  {
    id: 102,
    category: "Node",
    difficulty: "medium",
    question:
      "What is the difference between process.nextTick() and setImmediate()?",
    options: [
      "No difference",
      "process.nextTick() runs immediately after current operation, setImmediate() in next iteration",
      "setImmediate() runs first",
      "process.nextTick() is deprecated",
    ],
    correctAnswer: 1,
    explanation:
      "process.nextTick() runs immediately after the current operation completes, before the event loop continues, while setImmediate() runs in the next iteration of the event loop.",
  },
  {
    id: 103,
    category: "Node",
    difficulty: "medium",
    question: "What happens if you don't call next() in Express middleware?",
    options: [
      "Nothing",
      "Request hangs",
      "Error is thrown",
      "Request continues automatically",
    ],
    correctAnswer: 1,
    explanation:
      "If next() is not called in middleware, the request-response cycle gets stuck and the client will eventually timeout.",
  },
  {
    id: 104,
    category: "Node",
    difficulty: "medium",
    question: "What is the correct order of Express middleware execution?",
    options: [
      "Based on alphabetical order",
      "Based on when they are defined",
      "Based on their priority",
      "Random order",
    ],
    correctAnswer: 1,
    explanation:
      "Express middleware executes in the order they are defined using app.use(), following the sequence of registration.",
  },
  {
    id: 105,
    category: "Node",
    difficulty: "medium",
    question: "What is the difference between req.params and req.query?",
    options: [
      "No difference",
      "req.params for route parameters, req.query for query strings",
      "req.params for query strings, req.query for route parameters",
      "req.params is deprecated",
    ],
    correctAnswer: 1,
    explanation:
      "req.params contains route parameters (/users/:id), while req.query contains query string parameters (?name=john).",
  },
  {
    id: 106,
    category: "Node",
    difficulty: "medium",
    question: "How do you handle uncaught exceptions in Node.js?",
    options: [
      "try-catch blocks",
      "process.on('uncaughtException')",
      "Both try-catch and uncaughtException",
      "Cannot handle uncaught exceptions",
    ],
    correctAnswer: 2,
    explanation:
      "Use try-catch for synchronous code and process.on('uncaughtException') for global uncaught exception handling, though the app should restart after uncaught exceptions.",
  },
  {
    id: 107,
    category: "Node",
    difficulty: "medium",
    question:
      "What is the difference between EventEmitter.emit() and EventEmitter.send()?",
    options: [
      "No difference",
      "send() is deprecated",
      "emit() exists, send() doesn't in EventEmitter",
      "send() is for streams",
    ],
    correctAnswer: 2,
    explanation:
      "EventEmitter only has emit() method. send() doesn't exist in EventEmitter - it might be confused with methods from other modules like streams or HTTP.",
  },
  {
    id: 108,
    category: "Node",
    difficulty: "medium",
    question: "What is the maximum size of a Buffer in Node.js?",
    options: [
      "1GB",
      "2GB on 32-bit systems, 1GB on 64-bit",
      "1GB on 32-bit systems, 2GB on 64-bit",
      "No limit",
    ],
    correctAnswer: 1,
    explanation:
      "The maximum size of a Buffer is approximately 1GB on 32-bit systems and 2GB on 64-bit systems due to memory addressing limitations.",
  },
  {
    id: 109,
    category: "Node",
    difficulty: "medium",
    question:
      "What happens when you call res.send() multiple times in Express?",
    options: [
      "Multiple responses sent",
      "Error thrown",
      "Only first response sent, others ignored",
      "Application crashes",
    ],
    correctAnswer: 2,
    explanation:
      "Express prevents sending multiple responses. After the first res.send(), subsequent calls are ignored and a warning may be logged.",
  },
  {
    id: 110,
    category: "Node",
    difficulty: "medium",
    question:
      "What is the difference between fs.createReadStream() and fs.readFile()?",
    options: [
      "No difference",
      "createReadStream() is streaming, readFile() loads entire file",
      "readFile() is streaming, createReadStream() loads entire file",
      "createReadStream() is synchronous",
    ],
    correctAnswer: 1,
    explanation:
      "fs.createReadStream() reads file in chunks (streaming), good for large files. fs.readFile() loads the entire file into memory before processing.",
  },
  {
    id: 111,
    category: "Node",
    difficulty: "medium",
    question:
      "What is the correct way to handle stream backpressure in Node.js?",
    options: [
      "Ignore it",
      "Use pause() and resume()",
      "Return false from write() and listen for 'drain' event",
      "Increase memory allocation",
    ],
    correctAnswer: 2,
    explanation:
      "When write() returns false, it indicates backpressure. You should stop writing and wait for the 'drain' event before resuming to prevent memory issues.",
  },
  {
    id: 112,
    category: "Node",
    difficulty: "medium",
    question:
      "What is the difference between util.promisify() and manual Promise wrapping?",
    options: [
      "No difference",
      "util.promisify() preserves error stack traces better",
      "Manual wrapping is faster",
      "util.promisify() doesn't work with all functions",
    ],
    correctAnswer: 1,
    explanation:
      "util.promisify() properly preserves error stack traces and handles edge cases better than manual Promise wrapping.",
  },
  {
    id: 113,
    category: "Node",
    difficulty: "medium",
    question: "How do you prevent SQL injection in Node.js?",
    options: [
      "Use string concatenation",
      "Use parameterized queries",
      "Escape single quotes",
      "Validate input length",
    ],
    correctAnswer: 1,
    explanation:
      "Parameterized queries (prepared statements) separate SQL code from user input, preventing SQL injection attacks regardless of input content.",
  },
  {
    id: 114,
    category: "Node",
    difficulty: "medium",
    question: "What is the purpose of cluster.fork()?",
    options: [
      "To create Git forks",
      "To spawn worker processes",
      "To split code execution",
      "To create database connections",
    ],
    correctAnswer: 1,
    explanation:
      "cluster.fork() spawns worker processes that share the same server port, enabling load distribution across CPU cores.",
  },
  {
    id: 115,
    category: "Node",
    difficulty: "medium",
    question: "What happens when a worker process dies in Node.js clustering?",
    options: [
      "Master process dies",
      "Server stops",
      "Should be restarted automatically",
      "Nothing happens",
    ],
    correctAnswer: 2,
    explanation:
      "Good practice is to listen for worker 'exit' events and restart dead workers to maintain server availability.",
  },
  {
    id: 116,
    category: "Node",
    difficulty: "medium",
    question:
      "What is the difference between worker_threads and cluster modules?",
    options: [
      "No difference",
      "worker_threads share memory, cluster doesn't",
      "cluster shares memory, worker_threads doesn't",
      "worker_threads is for I/O, cluster for CPU",
    ],
    correctAnswer: 1,
    explanation:
      "worker_threads can share memory using SharedArrayBuffer, while cluster creates separate processes with isolated memory.",
  },
  {
    id: 117,
    category: "Node",
    difficulty: "medium",
    question: "How do you detect memory leaks in Node.js?",
    options: [
      "console.log()",
      "Use heap snapshots and compare",
      "Increase RAM",
      "Use try-catch blocks",
    ],
    correctAnswer: 1,
    explanation:
      "Memory leaks are detected by taking heap snapshots over time and comparing them to identify objects that aren't being garbage collected.",
  },
  {
    id: 118,
    category: "Node",
    difficulty: "medium",
    question: "What causes memory leaks in Node.js?",
    options: [
      "Global variables",
      "Uncleared timers",
      "Circular references",
      "All of the above",
    ],
    correctAnswer: 3,
    explanation:
      "Common causes include global variables holding references, uncleared intervals/timeouts, circular references, and event listeners not being removed.",
  },
  {
    id: 119,
    category: "Node",
    difficulty: "medium",
    question: "What is the purpose of --inspect flag in Node.js?",
    options: [
      "Code inspection",
      "Enable Chrome DevTools debugging",
      "Security scanning",
      "Performance monitoring",
    ],
    correctAnswer: 1,
    explanation:
      "--inspect enables the V8 Inspector integration, allowing debugging with Chrome DevTools or other debugging clients.",
  },
  {
    id: 120,
    category: "Node",
    difficulty: "medium",
    question: "How do you handle CORS preflight requests?",
    options: [
      "Ignore them",
      "Use app.options() to handle OPTIONS method",
      "Block all OPTIONS requests",
      "Use GET instead",
    ],
    correctAnswer: 1,
    explanation:
      "CORS preflight requests use the OPTIONS method. Handle them with app.options() or use cors middleware to automatically handle them.",
  },
  {
    id: 121,
    category: "Node",
    difficulty: "medium",
    question:
      "What is the difference between authentication and authorization?",
    options: [
      "No difference",
      "Authentication is who you are, authorization is what you can do",
      "Authorization is who you are, authentication is what you can do",
      "Authentication is for users, authorization for admins",
    ],
    correctAnswer: 1,
    explanation:
      "Authentication verifies identity (login), while authorization determines permissions (what the authenticated user can access).",
  },
  {
    id: 122,
    category: "Node",
    difficulty: "medium",
    question: "What is the purpose of jwt.sign()?",
    options: [
      "Verify tokens",
      "Create JWT tokens",
      "Decode tokens",
      "Encrypt data",
    ],
    correctAnswer: 1,
    explanation:
      "jwt.sign() creates a JSON Web Token by encoding payload data with a secret key, generating a signed token string.",
  },
  {
    id: 123,
    category: "Node",
    difficulty: "medium",
    question: "How do you refresh JWT tokens securely?",
    options: [
      "Store in localStorage",
      "Use refresh tokens with short-lived access tokens",
      "Never refresh",
      "Use same token forever",
    ],
    correctAnswer: 1,
    explanation:
      "Use short-lived access tokens (15-30 mins) with longer-lived refresh tokens stored securely to get new access tokens.",
  },
  {
    id: 124,
    category: "Node",
    difficulty: "medium",
    question: "What is the purpose of rate limiting?",
    options: [
      "Slow down responses",
      "Prevent abuse and DDoS",
      "Limit functionality",
      "Reduce bandwidth",
    ],
    correctAnswer: 1,
    explanation:
      "Rate limiting restricts the number of requests from a client in a time window, preventing abuse, brute force attacks, and DDoS.",
  },
  {
    id: 125,
    category: "Node",
    difficulty: "medium",
    question: "What is the difference between SQL and NoSQL injection?",
    options: [
      "No difference",
      "SQL targets relational DBs, NoSQL targets document DBs",
      "NoSQL injection doesn't exist",
      "SQL is more dangerous",
    ],
    correctAnswer: 1,
    explanation:
      "Both exist but target different databases. SQL injection targets relational databases, NoSQL injection targets document databases like MongoDB.",
  },
  {
    id: 126,
    category: "Node",
    difficulty: "medium",
    question: "How do you prevent NoSQL injection?",
    options: [
      "It's not possible",
      "Validate and sanitize input",
      "Use MongoDB only",
      "Disable JavaScript",
    ],
    correctAnswer: 1,
    explanation:
      "Prevent NoSQL injection by validating input types, using MongoDB operators carefully, and sanitizing user input before database operations.",
  },
  {
    id: 127,
    category: "Node",
    difficulty: "medium",
    question: "What is the purpose of input validation?",
    options: [
      "Improve performance",
      "Prevent malicious data",
      "Format data",
      "All of the above",
    ],
    correctAnswer: 3,
    explanation:
      "Input validation prevents injection attacks, ensures data integrity, improves performance by rejecting invalid data early, and ensures proper formatting.",
  },
  {
    id: 128,
    category: "Node",
    difficulty: "medium",
    question: "What is XSS and how to prevent it?",
    options: [
      "Database attack, use encryption",
      "Client-side injection, escape output",
      "Server attack, use HTTPS",
      "Network attack, use firewall",
    ],
    correctAnswer: 1,
    explanation:
      "XSS (Cross-Site Scripting) injects malicious scripts. Prevent by escaping user input in HTML, using Content Security Policy, and validating input.",
  },
  {
    id: 129,
    category: "Node",
    difficulty: "medium",
    question: "What is helmet.js used for?",
    options: [
      "Performance optimization",
      "Setting security headers",
      "Database security",
      "Authentication",
    ],
    correctAnswer: 1,
    explanation:
      "Helmet helps secure Express apps by setting various HTTP headers like Content-Security-Policy, X-Frame-Options, etc.",
  },
  {
    id: 130,
    category: "Node",
    difficulty: "medium",
    question: "How do you handle file upload security?",
    options: [
      "Allow all files",
      "Validate file type, size, and scan for malware",
      "Check file extension only",
      "Use HTTPS",
    ],
    correctAnswer: 1,
    explanation:
      "Secure file uploads by validating file types (not just extensions), limiting file size, storing outside web root, and scanning for malware.",
  },
  {
    id: 131,
    category: "Node",
    difficulty: "medium",
    question: "What is the purpose of crypto.scrypt()?",
    options: [
      "Encrypt passwords",
      "Hash passwords with salt",
      "Generate random numbers",
      "Create certificates",
    ],
    correctAnswer: 1,
    explanation:
      "crypto.scrypt() is a password-based key derivation function that hashes passwords with salt, making them resistant to rainbow table attacks.",
  },
  {
    id: 132,
    category: "Node",
    difficulty: "medium",
    question: "What is timing attack and how to prevent it?",
    options: [
      "Performance issue, use caching",
      "Attack based on operation timing, use constant-time comparison",
      "Network attack, use VPN",
      "Database attack, use indexes",
    ],
    correctAnswer: 1,
    explanation:
      "Timing attacks exploit time differences in operations. Use constant-time comparison functions like crypto.timingSafeEqual() to prevent them.",
  },
  {
    id: 133,
    category: "Node",
    difficulty: "medium",
    question: "What is the difference between hash and HMAC?",
    options: [
      "No difference",
      "Hash is one-way, HMAC uses secret key",
      "HMAC is faster",
      "Hash is more secure",
    ],
    correctAnswer: 1,
    explanation:
      "Hash produces a fixed-size output from input. HMAC (Hash-based Message Authentication Code) uses a secret key along with the hash function for authentication.",
  },
  {
    id: 134,
    category: "Node",
    difficulty: "medium",
    question: "How do you secure API endpoints?",
    options: [
      "Use HTTPS only",
      "Authentication, authorization, rate limiting, input validation",
      "Hide endpoints",
      "Use POST only",
    ],
    correctAnswer: 1,
    explanation:
      "Secure APIs with authentication (who), authorization (what), rate limiting (prevent abuse), input validation (prevent injection), and HTTPS.",
  },
  {
    id: 135,
    category: "Node",
    difficulty: "medium",
    question: "What is the purpose of environment variables?",
    options: [
      "Store code",
      "Store configuration and secrets",
      "Store logs",
      "Store database data",
    ],
    correctAnswer: 1,
    explanation:
      "Environment variables store configuration values, API keys, database credentials, and other sensitive data separate from code.",
  },
  {
    id: 136,
    category: "Node",
    difficulty: "medium",
    question: "How do you handle sensitive data in logs?",
    options: [
      "Log everything",
      "Redact sensitive fields",
      "Use encryption",
      "Disable logging",
    ],
    correctAnswer: 1,
    explanation:
      "Never log passwords, tokens, or personal data. Use logging libraries that support redaction to automatically remove sensitive fields.",
  },
  {
    id: 137,
    category: "Node",
    difficulty: "medium",
    question: "What is the difference between console.log() and winston?",
    options: [
      "No difference",
      "winston is for production logging with levels and transports",
      "console.log() is better",
      "winston is synchronous",
    ],
    correctAnswer: 1,
    explanation:
      "winston provides structured logging with levels (info, error, debug), multiple transports (file, console, HTTP), and is suitable for production.",
  },
  {
    id: 138,
    category: "Node",
    difficulty: "medium",
    question: "What is the purpose of morgan in Express?",
    options: [
      "User authentication",
      "HTTP request logging",
      "Database logging",
      "Error logging",
    ],
    correctAnswer: 1,
    explanation:
      "Morgan is HTTP request logger middleware that logs incoming requests with customizable formats, useful for monitoring and debugging.",
  },
  {
    id: 139,
    category: "Node",
    difficulty: "medium",
    question: "How do you implement request tracing?",
    options: [
      "Use console.log()",
      "Generate unique request IDs and pass through middleware",
      "Use timestamps only",
      "Use database",
    ],
    correctAnswer: 1,
    explanation:
      "Generate unique request IDs, store in context/async storage, and include in all logs to trace requests across services and operations.",
  },
  {
    id: 140,
    category: "Node",
    difficulty: "medium",
    question: "What is the purpose of async_hooks?",
    options: [
      "Hook into async functions",
      "Track async resources and context",
      "Create async functions",
      "Handle async errors",
    ],
    correctAnswer: 1,
    explanation:
      "async_hooks provides an API to track asynchronous resources and maintain context across async operations, useful for APM tools.",
  },
  {
    id: 141,
    category: "Node",
    difficulty: "medium",
    question:
      "What is the difference between process.exit() and process.kill()?",
    options: [
      "No difference",
      "process.exit() graceful, process.kill() forceful",
      "process.exit() for current process, process.kill() for other processes",
      "process.kill() is deprecated",
    ],
    correctAnswer: 2,
    explanation:
      "process.exit() terminates the current process. process.kill() sends signals to other processes by PID.",
  },
  {
    id: 142,
    category: "Node",
    difficulty: "medium",
    question: "How do you handle graceful shutdown?",
    options: [
      "Use process.exit() immediately",
      "Close connections, finish requests, then exit",
      "Use SIGKILL",
      "Restart immediately",
    ],
    correctAnswer: 1,
    explanation:
      "Handle SIGTERM/SIGINT signals, stop accepting new requests, close database connections, finish current requests, then exit gracefully.",
  },
  {
    id: 143,
    category: "Node",
    difficulty: "medium",
    question: "What is the purpose of PM2 ecosystem file?",
    options: [
      "Environment configuration",
      "Application deployment and scaling configuration",
      "Database configuration",
      "Package configuration",
    ],
    correctAnswer: 1,
    explanation:
      "PM2 ecosystem file (ecosystem.config.js) defines application configuration, environment variables, scaling options, and deployment settings.",
  },
  {
    id: 144,
    category: "Node",
    difficulty: "medium",
    question: "How do you implement zero-downtime deployment?",
    options: [
      "Restart server",
      "Use blue-green or rolling deployment",
      "Deploy during maintenance",
      "Use single server",
    ],
    correctAnswer: 1,
    explanation:
      "Zero-downtime deployment uses strategies like blue-green (switch traffic) or rolling (gradual replacement) to deploy without service interruption.",
  },
  {
    id: 145,
    category: "Node",
    difficulty: "medium",
    question: "What is the purpose of health check endpoints?",
    options: [
      "Monitor application health",
      "Check user health",
      "Validate data",
      "Test APIs",
    ],
    correctAnswer: 0,
    explanation:
      "Health check endpoints (/health) provide application status, database connectivity, and dependency health for monitoring systems.",
  },
  {
    id: 146,
    category: "Node",
    difficulty: "medium",
    question: "What is the difference between staging and production?",
    options: [
      "No difference",
      "Staging for testing, production for users",
      "Staging is faster",
      "Production is for development",
    ],
    correctAnswer: 1,
    explanation:
      "Staging environment mirrors production for final testing. Production is the live environment serving real users with real data.",
  },
  {
    id: 147,
    category: "Node",
    difficulty: "medium",
    question: "How do you implement feature flags?",
    options: [
      "Use if-else with environment variables",
      "Database flags, configuration files, or feature flag services",
      "Comment/uncomment code",
      "Use different branches",
    ],
    correctAnswer: 1,
    explanation:
      "Feature flags can be implemented using environment variables, database settings, configuration files, or specialized services like LaunchDarkly.",
  },
  {
    id: 148,
    category: "Node",
    difficulty: "medium",
    question: "What is A/B testing in Node.js?",
    options: [
      "Testing code versions",
      "Comparing two versions of features with real users",
      "Unit testing",
      "Integration testing",
    ],
    correctAnswer: 1,
    explanation:
      "A/B testing serves different versions of features to different user groups to compare performance, engagement, and conversion metrics.",
  },
  {
    id: 149,
    category: "Node",
    difficulty: "medium",
    question: "What is the purpose of circuit breaker pattern?",
    options: [
      "Electrical safety",
      "Prevent cascading failures in microservices",
      "Break code execution",
      "Handle errors",
    ],
    correctAnswer: 1,
    explanation:
      "Circuit breaker prevents cascading failures by failing fast when a service is unhealthy, giving it time to recover before retrying.",
  },
  {
    id: 150,
    category: "Node",
    difficulty: "medium",
    question: "How do you implement retry logic with exponential backoff?",
    options: [
      "Use setTimeout with fixed delay",
      "Increase delay exponentially between retries",
      "Retry immediately",
      "Use constant delay",
    ],
    correctAnswer: 1,
    explanation:
      "Exponential backoff increases wait time exponentially (2^n * base_delay) between retries to reduce server load and improve success rates.",
  },
  {
    id: 161,
    category: "Node",
    difficulty: "medium",
    question:
      "What is the difference between connection pooling and clustering?",
    options: [
      "No difference",
      "Pooling reuses connections, clustering uses multiple processes",
      "Clustering reuses connections, pooling uses processes",
      "Both are for databases only",
    ],
    correctAnswer: 1,
    explanation:
      "Connection pooling reuses database connections efficiently. Clustering creates multiple Node.js processes to utilize CPU cores for better performance.",
  },
  {
    id: 162,
    category: "Node",
    difficulty: "medium",
    question: "How do you handle database connection failures?",
    options: [
      "Crash the application",
      "Implement retry logic with exponential backoff",
      "Ignore the error",
      "Use try-catch only",
    ],
    correctAnswer: 1,
    explanation:
      "Handle connection failures gracefully with retry logic, exponential backoff, circuit breakers, and fallback mechanisms to maintain availability.",
  },
  {
    id: 163,
    category: "Node",
    difficulty: "medium",
    question: "What is the N+1 query problem?",
    options: [
      "Running N queries plus 1",
      "Fetching related data inefficiently with multiple queries",
      "Database limitation",
      "Query optimization technique",
    ],
    correctAnswer: 1,
    explanation:
      "N+1 problem occurs when you fetch a list of items (1 query) then make separate queries for each item's related data (N queries), causing poor performance.",
  },
  {
    id: 164,
    category: "Node",
    difficulty: "medium",
    question: "How do you optimize database queries?",
    options: [
      "Use SELECT *",
      "Use indexes, limit fields, pagination, and query optimization",
      "Add more servers",
      "Use NoSQL only",
    ],
    correctAnswer: 1,
    explanation:
      "Optimize queries by using appropriate indexes, selecting only needed fields, implementing pagination, avoiding N+1 queries, and analyzing query execution plans.",
  },
  {
    id: 165,
    category: "Node",
    difficulty: "medium",
    question: "What is the purpose of database indexes?",
    options: ["Store data", "Speed up queries", "Compress data", "Secure data"],
    correctAnswer: 1,
    explanation:
      "Indexes create data structures that allow faster data retrieval, similar to book indexes, but require additional storage and maintenance overhead.",
  },
  {
    id: 166,
    category: "Node",
    difficulty: "medium",
    question:
      "What is the difference between normalization and denormalization?",
    options: [
      "No difference",
      "Normalization reduces redundancy, denormalization improves performance",
      "Denormalization reduces redundancy",
      "Both improve performance",
    ],
    correctAnswer: 1,
    explanation:
      "Normalization organizes data to reduce redundancy. Denormalization introduces redundancy to improve query performance by reducing joins.",
  },
  {
    id: 167,
    category: "Node",
    difficulty: "medium",
    question: "How do you implement database transactions?",
    options: [
      "Use multiple queries",
      "Use BEGIN, COMMIT, ROLLBACK",
      "Use try-catch",
      "Transactions aren't needed",
    ],
    correctAnswer: 1,
    explanation:
      "Database transactions use BEGIN to start, COMMIT to save changes, and ROLLBACK to undo changes if errors occur, ensuring data consistency.",
  },
  {
    id: 168,
    category: "Node",
    difficulty: "medium",
    question: "What is the purpose of database migrations?",
    options: [
      "Move databases",
      "Version control for database schema",
      "Backup databases",
      "Optimize databases",
    ],
    correctAnswer: 1,
    explanation:
      "Migrations are version-controlled changes to database schema, allowing teams to track, share, and apply database changes consistently.",
  },
  {
    id: 169,
    category: "Node",
    difficulty: "medium",
    question:
      "What is the difference between optimistic and pessimistic locking?",
    options: [
      "No difference",
      "Optimistic assumes no conflict, pessimistic prevents conflicts",
      "Optimistic is faster",
      "Pessimistic is deprecated",
    ],
    correctAnswer: 1,
    explanation:
      "Optimistic locking assumes no conflicts and checks before commit. Pessimistic locking prevents conflicts by locking data during transactions.",
  },
  {
    id: 170,
    category: "Node",
    difficulty: "medium",
    question: "How do you implement full-text search?",
    options: [
      "Use LIKE queries",
      "Use database full-text indexes or search engines",
      "Use regular expressions",
      "Load all data to memory",
    ],
    correctAnswer: 1,
    explanation:
      "Implement full-text search using database features (PostgreSQL FTS, MongoDB text indexes) or dedicated search engines (Elasticsearch, Solr).",
  },
  {
    id: 171,
    category: "Node",
    difficulty: "medium",
    question: "What is the CAP theorem?",
    options: [
      "Computer science principle",
      "Consistency, Availability, Partition tolerance - pick 2",
      "Database optimization technique",
      "Caching strategy",
    ],
    correctAnswer: 1,
    explanation:
      "CAP theorem states that distributed systems can guarantee only two of three properties: Consistency, Availability, and Partition tolerance.",
  },
  {
    id: 172,
    category: "Node",
    difficulty: "medium",
    question: "What is eventual consistency?",
    options: [
      "Data is always consistent",
      "Data will be consistent over time",
      "Data is inconsistent",
      "Database error",
    ],
    correctAnswer: 1,
    explanation:
      "Eventual consistency means that given enough time without updates, all replicas in a distributed system will converge to the same state.",
  },
  {
    id: 173,
    category: "Node",
    difficulty: "medium",
    question: "How do you implement caching strategies?",
    options: [
      "Cache everything",
      "Cache-aside, write-through, write-behind based on needs",
      "Use memory only",
      "Cache database only",
    ],
    correctAnswer: 1,
    explanation:
      "Choose caching strategies based on requirements: cache-aside (application manages), write-through (synchronous), write-behind (asynchronous).",
  },
  {
    id: 174,
    category: "Node",
    difficulty: "medium",
    question: "What is cache invalidation?",
    options: [
      "Breaking cache",
      "Removing or updating cached data when source changes",
      "Cache expiration",
      "Cache creation",
    ],
    correctAnswer: 1,
    explanation:
      "Cache invalidation removes or updates cached entries when the underlying data changes to prevent serving stale data to users.",
  },
  {
    id: 175,
    category: "Node",
    difficulty: "medium",
    question: "What is the cache stampede problem?",
    options: [
      "Cache overflow",
      "Multiple requests recalculating same expensive cache",
      "Cache deletion",
      "Cache corruption",
    ],
    correctAnswer: 1,
    explanation:
      "Cache stampede occurs when multiple requests simultaneously try to recalculate the same expensive cached value, overwhelming the system.",
  },
  {
    id: 176,
    category: "Node",
    difficulty: "medium",
    question: "How do you prevent cache stampede?",
    options: [
      "Remove cache",
      "Use locks, request coalescing, or probabilistic early expiration",
      "Increase cache size",
      "Use single server",
    ],
    correctAnswer: 1,
    explanation:
      "Prevent stampedes with distributed locks, request coalescing (only first request computes), or probabilistic early expiration to spread recalculations.",
  },
  {
    id: 177,
    category: "Node",
    difficulty: "medium",
    question: "What is the difference between Redis and Memcached?",
    options: [
      "No difference",
      "Redis supports data structures, Memcached is simple key-value",
      "Memcached is faster",
      "Redis is for caching only",
    ],
    correctAnswer: 1,
    explanation:
      "Redis supports rich data structures (strings, lists, sets) and persistence. Memcached is simpler, pure in-memory key-value cache.",
  },
  {
    id: 178,
    category: "Node",
    difficulty: "medium",
    question: "How do you implement distributed caching?",
    options: [
      "Use single Redis instance",
      "Use Redis Cluster or consistent hashing",
      "Use memory caching",
      "Don't cache",
    ],
    correctAnswer: 1,
    explanation:
      "Implement distributed caching using Redis Cluster for automatic sharding or consistent hashing to distribute cache across multiple nodes.",
  },
  {
    id: 179,
    category: "Node",
    difficulty: "medium",
    question: "What is the purpose of CDN?",
    options: [
      "Database network",
      "Content Delivery Network for faster content distribution",
      "Cache system",
      "Security network",
    ],
    correctAnswer: 1,
    explanation:
      "CDN (Content Delivery Network) distributes static content across geographically distributed servers for faster delivery to users.",
  },
  {
    id: 180,
    category: "Node",
    difficulty: "medium",
    question: "How do you optimize static file serving?",
    options: [
      "Use Node.js only",
      "Use CDN, caching, compression, and efficient web server",
      "Use database",
      "Don't serve static files",
    ],
    correctAnswer: 1,
    explanation:
      "Optimize static files using CDN, proper caching headers, gzip/brotli compression, and efficient web servers like Nginx for better performance.",
  },
  {
    id: 181,
    category: "Node",
    difficulty: "medium",
    question: "What is the purpose of gzip compression?",
    options: [
      "Security",
      "Reduce file size for faster transfer",
      "Image optimization",
      "Database compression",
    ],
    correctAnswer: 1,
    explanation:
      "Gzip compression reduces file sizes (typically 70-90% for text) before transmission, improving load times and reducing bandwidth usage.",
  },
  {
    id: 182,
    category: "Node",
    difficulty: "medium",
    question: "What is the difference between gzip and brotli?",
    options: [
      "No difference",
      "Brotli provides better compression ratios",
      "Gzip is faster",
      "Brotli is for images only",
    ],
    correctAnswer: 1,
    explanation:
      "Brotli generally provides better compression ratios than gzip, especially for text files, but may be slower to compress.",
  },
  {
    id: 183,
    category: "Node",
    difficulty: "medium",
    question: "How do you implement image optimization?",
    options: [
      "Use original images",
      "Resize, compress, use modern formats (WebP), and lazy loading",
      "Use PNG only",
      "Store in database",
    ],
    correctAnswer: 1,
    explanation:
      "Optimize images by resizing to appropriate dimensions, compressing, using modern formats like WebP, implementing lazy loading, and using CDNs.",
  },
  {
    id: 184,
    category: "Node",
    difficulty: "medium",
    question: "What is lazy loading?",
    options: [
      "Slow loading",
      "Load resources only when needed",
      "Load everything at once",
      "Delayed loading",
    ],
    correctAnswer: 1,
    explanation:
      "Lazy loading defers loading of non-critical resources until they're needed, improving initial page load performance and reducing bandwidth.",
  },
  {
    id: 185,
    category: "Node",
    difficulty: "medium",
    question: "What is the purpose of webpack in Node.js?",
    options: [
      "Module bundler for frontend assets",
      "Database tool",
      "Server bundler",
      "Package manager",
    ],
    correctAnswer: 0,
    explanation:
      "Webpack is primarily a module bundler for frontend assets (JS, CSS, images) but can bundle Node.js applications for deployment optimization.",
  },
  {
    id: 186,
    category: "Node",
    difficulty: "medium",
    question: "How do you implement server-side rendering (SSR)?",
    options: [
      "Use client-side only",
      "Render pages on server and send HTML to client",
      "Use API only",
      "Use database rendering",
    ],
    correctAnswer: 1,
    explanation:
      "SSR renders pages on the server, sending fully rendered HTML to the client for better SEO and initial load performance.",
  },
  {
    id: 187,
    category: "Node",
    difficulty: "medium",
    question: "What is the difference between SSR and CSR?",
    options: [
      "No difference",
      "SSR renders on server, CSR renders in browser",
      "SSR is faster",
      "CSR is better for SEO",
    ],
    correctAnswer: 1,
    explanation:
      "SSR (Server-Side Rendering) renders on server, better for SEO and initial load. CSR (Client-Side Rendering) renders in browser, better for interactivity.",
  },
  {
    id: 188,
    category: "Node",
    difficulty: "medium",
    question: "What is hydration in SSR?",
    options: [
      "Water process",
      "Client-side JavaScript takes over server-rendered HTML",
      "Server process",
      "Database process",
    ],
    correctAnswer: 1,
    explanation:
      "Hydration is when client-side JavaScript takes over server-rendered HTML, attaching event listeners and making the page interactive.",
  },
  {
    id: 189,
    category: "Node",
    difficulty: "medium",
    question: "How do you prevent XSS in SSR applications?",
    options: [
      "Not necessary",
      "Escape output, sanitize input, use CSP",
      "Use HTTPS",
      "Use authentication",
    ],
    correctAnswer: 1,
    explanation:
      "Prevent XSS in SSR by escaping dynamic content, sanitizing user input, implementing Content Security Policy, and validating data on both server and client.",
  },
  {
    id: 190,
    category: "Node",
    difficulty: "medium",
    question: "What is the purpose of Next.js?",
    options: [
      "Database framework",
      "React framework with SSR capabilities",
      "Express alternative",
      "Testing framework",
    ],
    correctAnswer: 1,
    explanation:
      "Next.js is a React framework that provides SSR, SSG (Static Site Generation), API routes, and optimized builds out of the box.",
  },
  {
    id: 191,
    category: "Node",
    difficulty: "medium",
    question: "What is static site generation (SSG)?",
    options: [
      "Static HTML only",
      "Pre-build pages at build time",
      "Dynamic generation",
      "Server generation",
    ],
    correctAnswer: 1,
    explanation:
      "SSG pre-builds pages at build time, creating static HTML files that can be served quickly from CDN, improving performance and reducing server load.",
  },
  {
    id: 192,
    category: "Node",
    difficulty: "medium",
    question: "What is incremental static regeneration (ISR)?",
    options: [
      "Full rebuild",
      "Update static content after initial build without full rebuild",
      "Server rendering",
      "Client rendering",
    ],
    correctAnswer: 1,
    explanation:
      "ISR allows updating static content after the initial build without rebuilding the entire site, combining benefits of static and dynamic content.",
  },
  {
    id: 193,
    category: "Node",
    difficulty: "medium",
    question: "How do you implement API rate limiting with Redis?",
    options: [
      "Use memory only",
      "Store request counts with TTL in Redis",
      "Use database",
      "Use file system",
    ],
    correctAnswer: 1,
    explanation:
      "Implement rate limiting by storing request counts per client with TTL (time-to-live) in Redis, enabling distributed rate limiting across multiple servers.",
  },
  {
    id: 194,
    category: "Node",
    difficulty: "medium",
    question: "What is the sliding window rate limiting algorithm?",
    options: [
      "Fixed time window",
      "Rolling time window for smoother rate limiting",
      "No window",
      "Infinite window",
    ],
    correctAnswer: 1,
    explanation:
      "Sliding window maintains a rolling time window, providing smoother rate limiting compared to fixed windows that reset abruptly.",
  },
  {
    id: 195,
    category: "Node",
    difficulty: "medium",
    question: "What is the token bucket algorithm?",
    options: [
      "Fixed rate limiting",
      "Tokens added at fixed rate, requests consume tokens",
      "No tokens",
      "Bucket algorithm",
    ],
    correctAnswer: 1,
    explanation:
      "Token bucket adds tokens at a fixed rate. Requests consume tokens. If tokens available, request proceeds; otherwise, it's rate limited.",
  },
  {
    id: 196,
    category: "Node",
    difficulty: "medium",
    question: "How do you implement request coalescing?",
    options: [
      "Multiple requests",
      "Combine identical concurrent requests into one",
      "Ignore requests",
      "Queue requests",
    ],
    correctAnswer: 1,
    explanation:
      "Request coalescing combines multiple identical concurrent requests into a single backend request, reducing load and improving response times.",
  },
  {
    id: 197,
    category: "Node",
    difficulty: "medium",
    question: "What is the thundering herd problem?",
    options: [
      "Server overload",
      "Multiple processes/threads waking up simultaneously",
      "Network issue",
      "Database problem",
    ],
    correctAnswer: 1,
    explanation:
      "Thundering herd occurs when multiple processes/threads wake up simultaneously (e.g., cache expiry) and compete for resources, causing performance issues.",
  },
  {
    id: 198,
    category: "Node",
    difficulty: "medium",
    question: "How do you handle thundering herd?",
    options: [
      "Add more servers",
      "Use jitter, exponential backoff, and request coalescing",
      "Ignore it",
      "Use single process",
    ],
    correctAnswer: 1,
    explanation:
      "Handle thundering herd by adding random jitter to delays, using exponential backoff, and implementing request coalescing to reduce concurrent requests.",
  },
  {
    id: 199,
    category: "Node",
    difficulty: "medium",
    question: "What is the purpose of load balancing algorithms?",
    options: [
      "Balance servers",
      "Distribute requests across servers efficiently",
      "Increase load",
      "Decrease performance",
    ],
    correctAnswer: 1,
    explanation:
      "Load balancing algorithms (round-robin, least connections, IP hash) distribute incoming requests across multiple servers to optimize resource use and availability.",
  },
  {
    id: 200,
    category: "Node",
    difficulty: "medium",
    question: "What is the difference between sticky and non-sticky sessions?",
    options: [
      "No difference",
      "Sticky routes user to same server, non-sticky doesn't",
      "Sticky is better",
      "Non-sticky is deprecated",
    ],
    correctAnswer: 1,
    explanation:
      "Sticky sessions route users to the same server consistently. Non-sticky allows any server to handle requests, requiring shared session storage.",
  },
  {
    id: 201,
    category: "Node",
    difficulty: "medium",
    question:
      "What will be the output of: console.log(typeof process.nextTick(() => {}));",
    options: ["function", "undefined", "object", "string"],
    correctAnswer: 1,
    explanation:
      "process.nextTick() returns undefined. It schedules a callback but doesn't return any meaningful value.",
  },
  {
    id: 202,
    category: "Node",
    difficulty: "medium",
    question: "What is the correct way to handle unhandled promise rejections?",
    options: [
      "process.on('unhandledRejection', (reason, promise) => {})",
      "process.on('rejection', (reason) => {})",
      "process.on('error', (err) => {})",
      "No need to handle, Node.js handles automatically",
    ],
    correctAnswer: 0,
    explanation:
      "Unhandled promise rejections should be caught using process.on('unhandledRejection') to prevent process termination in future Node.js versions.",
  },
  {
    id: 203,
    category: "Node",
    difficulty: "hard",
    question:
      "What happens when you call stream.push(null) on a readable stream?",
    options: [
      "Stream errors",
      "Stream ends after buffered data is consumed",
      "Stream immediately closes",
      "Stream becomes writable",
    ],
    correctAnswer: 1,
    explanation:
      "stream.push(null) signals the end of the stream. The readable stream will end after all buffered data has been consumed, not immediately.",
  },
  {
    id: 204,
    category: "Node",
    difficulty: "hard",
    question: "What is the correct way to implement a transform stream?",
    options: [
      "Extend stream.Transform and implement _transform()",
      "Extend stream.Readable and implement _read()",
      "Extend stream.Writable and implement _write()",
      "Create a duplex stream",
    ],
    correctAnswer: 0,
    explanation:
      "Transform streams must extend stream.Transform and implement the _transform(chunk, encoding, callback) method to transform data as it passes through.",
  },
  {
    id: 205,
    category: "Node",
    difficulty: "hard",
    question:
      "What will be the output of: console.log(Buffer.from('hello').equals(Buffer.from('hello')));",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "Buffer.equals() compares the contents of two buffers and returns true if they're identical, so Buffer.from('hello').equals(Buffer.from('hello')) returns true.",
  },
  {
    id: 206,
    category: "Node",
    difficulty: "hard",
    question: "How do you properly handle backpressure in a transform stream?",
    options: [
      "Ignore it - streams handle it automatically",
      "Return false from _transform() when buffer is full and wait for 'drain' event",
      "Use pause() and resume() methods",
      "Increase the highWaterMark",
    ],
    correctAnswer: 1,
    explanation:
      "In transform streams, return false from _transform() when the buffer is full and wait for the 'drain' event before accepting more data to properly handle backpressure.",
  },
  {
    id: 207,
    category: "Node",
    difficulty: "hard",
    question:
      "What is the difference between crypto.createHash() and crypto.createHmac()?",
    options: [
      "No difference - both create hashes",
      "HMAC uses a secret key, regular hash doesn't",
      "Hash is faster than HMAC",
      "HMAC is for encryption, hash is for integrity",
    ],
    correctAnswer: 1,
    explanation:
      "crypto.createHmac() uses a secret key along with the hash function, providing both data integrity and authenticity, while crypto.createHash() only provides integrity checking.",
  },
  {
    id: 208,
    category: "Node",
    difficulty: "hard",
    question:
      "What happens when you call crypto.scrypt() with different salts for the same password?",
    options: [
      "Same result - salt doesn't matter",
      "Different results - salt affects output",
      "Error - salt must be same",
      "Depends on the password length",
    ],
    correctAnswer: 1,
    explanation:
      "crypto.scrypt() produces different results with different salts for the same password. This is intentional and important for security - each password should have a unique salt.",
  },
  {
    id: 209,
    category: "Node",
    difficulty: "hard",
    question:
      "What is the correct way to implement a custom promise-based API?",
    options: [
      "Wrap callback functions in new Promise()",
      "Use util.promisify() on all functions",
      "Return new Promise() with resolve/reject",
      "Both A and C are correct",
    ],
    correctAnswer: 3,
    explanation:
      "You can implement custom promise-based APIs by either wrapping callback functions in new Promise() or returning new Promise() with proper resolve/reject handling inside.",
  },
  {
    id: 210,
    category: "Node",
    difficulty: "hard",
    question:
      "What will be the result of: Promise.allSettled([Promise.resolve(1), Promise.reject(2)]).then(console.log);",
    options: [
      "[1, 2]",
      "[{status: 'fulfilled', value: 1}, {status: 'rejected', reason: 2}]",
      "Error",
      "[1]",
    ],
    correctAnswer: 1,
    explanation:
      "Promise.allSettled() waits for all promises to settle (fulfill or reject) and returns an array of objects with status and value/reason for each promise.",
  },
  {
    id: 211,
    category: "Node",
    difficulty: "hard",
    question:
      "How do you properly implement a singleton pattern in Node.js with module caching?",
    options: [
      "Use global variables",
      "Export a new instance from module",
      "Export the same instance using module.exports",
      "Use static class methods",
    ],
    correctAnswer: 2,
    explanation:
      "Node.js modules are cached after first load. By exporting the same instance using module.exports = new MyClass(), you ensure singleton behavior across requires.",
  },
  {
    id: 212,
    category: "Node",
    difficulty: "hard",
    question:
      "What is the correct way to handle uncaught exceptions without crashing the process?",
    options: [
      "process.on('uncaughtException', (err) => { console.error(err); })",
      "process.on('uncaughtException', (err) => { console.error(err); process.exit(1); })",
      "Ignore them - they'll be handled automatically",
      "Use try-catch around all code",
    ],
    correctAnswer: 1,
    explanation:
      "While you can catch uncaught exceptions, the recommended approach is to log the error and gracefully exit the process, as the application may be in an unstable state.",
  },
  {
    id: 213,
    category: "Node",
    difficulty: "hard",
    question:
      "What will happen if you don't handle 'error' events on a stream?",
    options: [
      "Nothing - errors are ignored",
      "Stream continues with warnings",
      "Uncaught exception is thrown",
      "Stream automatically recovers",
    ],
    correctAnswer: 2,
    explanation:
      "If an 'error' event is emitted on a stream and no listeners are attached, an uncaught exception will be thrown, potentially crashing the process.",
  },
  {
    id: 214,
    category: "Node",
    difficulty: "hard",
    question: "What is the purpose of the 'finish' event on a writable stream?",
    options: [
      "All data has been written to underlying system",
      "All data has been processed by stream",
      "Stream is closed",
      "Stream has error",
    ],
    correctAnswer: 1,
    explanation:
      "The 'finish' event is emitted when all data has been flushed to the underlying system (after stream.end() is called), not necessarily when the OS has written it to disk.",
  },
  {
    id: 215,
    category: "Node",
    difficulty: "hard",
    question:
      "How do you properly implement a readable stream that generates data?",
    options: [
      "Extend stream.Readable and implement _read() method",
      "Extend stream.Writable and implement _write()",
      "Use stream.PassThrough",
      "Extend EventEmitter",
    ],
    correctAnswer: 0,
    explanation:
      "To create a readable stream that generates data, extend stream.Readable and implement the _read(size) method which pushes data when called.",
  },
  {
    id: 216,
    category: "Node",
    difficulty: "hard",
    question:
      "What is the difference between pipeline() and pipe() for streams?",
    options: [
      "No difference - they're aliases",
      "pipeline() handles errors and cleanup automatically, pipe() doesn't",
      "pipe() is faster than pipeline()",
      "pipeline() is for transform streams only",
    ],
    correctAnswer: 1,
    explanation:
      "pipeline() automatically handles errors, properly cleans up streams on error, and forwards errors between streams, while pipe() requires manual error handling.",
  },
  {
    id: 217,
    category: "Node",
    difficulty: "hard",
    question:
      "What will be the output of: console.log(Buffer.allocUnsafe(10).length);",
    options: ["0", "10", "undefined", "Error"],
    correctAnswer: 1,
    explanation:
      "Buffer.allocUnsafe(10) creates a Buffer of specified length (10) with uninitialized memory. The length property returns the buffer size, which is 10.",
  },
  {
    id: 218,
    category: "Node",
    difficulty: "hard",
    question: "How do you properly compare two buffers for equality?",
    options: [
      "buffer1 == buffer2",
      "buffer1 === buffer2",
      "buffer1.equals(buffer2)",
      "buffer1.toString() == buffer2.toString()",
    ],
    correctAnswer: 2,
    explanation:
      "Use buffer1.equals(buffer2) to compare buffer contents. The == and === operators compare object references, not content, and toString() comparison fails for binary data.",
  },
  {
    id: 219,
    category: "Node",
    difficulty: "hard",
    question: "What is the purpose of crypto.randomBytes()?",
    options: [
      "Generate predictable random numbers",
      "Generate cryptographically secure random bytes",
      "Create hash values",
      "Generate UUIDs",
    ],
    correctAnswer: 1,
    explanation:
      "crypto.randomBytes() generates cryptographically secure random bytes suitable for security-sensitive operations like token generation or encryption keys.",
  },
  {
    id: 220,
    category: "Node",
    difficulty: "hard",
    question:
      "What happens when you call crypto.createCipher() with a weak password?",
    options: [
      "Error is thrown",
      "Weak encryption is used",
      "Password is automatically strengthened",
      "Same as createCipheriv()",
    ],
    correctAnswer: 1,
    explanation:
      "crypto.createCipher() derives a key from the password, but weak passwords result in weak encryption. It's deprecated in favor of createCipheriv() with proper key derivation.",
  },
  {
    id: 221,
    category: "Node",
    difficulty: "hard",
    question: "How do you properly implement async iteration over a stream?",
    options: [
      "Use for...of loop directly",
      "Use stream[Symbol.asyncIterator]() with for await...of",
      "Use stream.on('data')",
      "Use stream.read() in a loop",
    ],
    correctAnswer: 1,
    explanation:
      "Streams implement async iteration via Symbol.asyncIterator(). Use for await (const chunk of stream) for proper async iteration over stream data.",
  },
  {
    id: 222,
    category: "Node",
    difficulty: "hard",
    question:
      "What is the correct way to handle Promise rejection in async generators?",
    options: [
      "Try-catch around yield",
      "Generator automatically handles rejections",
      "Use catch() on the generator",
      "Rejections can't be handled",
    ],
    correctAnswer: 0,
    explanation:
      "In async generators, wrap yield statements in try-catch blocks to handle promise rejections, as yield* will propagate the rejection.",
  },
  {
    id: 223,
    category: "Node",
    difficulty: "hard",
    question:
      "What will be the behavior of: Promise.race([new Promise(() => {}), Promise.resolve(1)]).then(console.log);",
    options: ["1", "undefined", "Never resolves", "Error"],
    correctAnswer: 2,
    explanation:
      "Promise.race() waits for the first promise to settle. Since the first promise never resolves or rejects, the race never completes, so nothing is logged.",
  },
  {
    id: 224,
    category: "Node",
    difficulty: "hard",
    question: "How do you implement a custom thenable object?",
    options: [
      "Implement then() method that returns a promise",
      "Extend Promise class",
      "Implement catch() method",
      "Use Symbol.thenable",
    ],
    correctAnswer: 0,
    explanation:
      "A thenable is any object with a then() method. Implement then(onFulfilled, onRejected) that behaves like a Promise's then method.",
  },
  {
    id: 225,
    category: "Node",
    difficulty: "hard",
    question: "What is the purpose of WeakMap in the context of caching?",
    options: [
      "Strong references for long-term caching",
      "Memory-efficient caching with automatic garbage collection",
      "Faster than Map",
      "Synchronous operations only",
    ],
    correctAnswer: 1,
    explanation:
      "WeakMap allows objects to be garbage collected when no other references exist, making it useful for memory-efficient caching that doesn't prevent garbage collection.",
  },
  {
    id: 226,
    category: "Node",
    difficulty: "hard",
    question: "What happens when you call util.inspect() on a circular object?",
    options: [
      "Error is thrown",
      "Returns '[Circular]'",
      "Infinite loop",
      "Returns null",
    ],
    correctAnswer: 1,
    explanation:
      "util.inspect() detects circular references and replaces them with '[Circular]' to prevent infinite loops and provide meaningful output.",
  },
  {
    id: 227,
    category: "Node",
    difficulty: "hard",
    question: "How do you properly implement a memory-efficient object pool?",
    options: [
      "Use arrays only",
      "Use WeakMap with object reuse",
      "Use Map with strong references",
      "Don't pool objects",
    ],
    correctAnswer: 1,
    explanation:
      "Use WeakMap to track pooled objects, allowing unused objects to be garbage collected while reusing active objects, providing memory-efficient pooling.",
  },
  {
    id: 228,
    category: "Node",
    difficulty: "hard",
    question: "What is the correct way to handle EADDRINUSE error?",
    options: [
      "Ignore the error",
      "Try a different port or wait and retry",
      "Kill all Node processes",
      "Use process.exit()",
    ],
    correctAnswer: 1,
    explanation:
      "EADDRINUSE means the port is already in use. Handle by trying a different port, or implementing retry logic with exponential backoff for the same port.",
  },
  {
    id: 229,
    category: "Node",
    difficulty: "hard",
    question:
      "What will be the output of: console.log(require('module').builtinModules.includes('fs'));",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "require('module').builtinModules returns an array of built-in modules, and 'fs' is included, so the check returns true.",
  },
  {
    id: 230,
    category: "Node",
    difficulty: "hard",
    question:
      "How do you properly implement hot module replacement in Node.js?",
    options: [
      "Use delete require.cache[moduleName]",
      "Use fs.watch() and clear require.cache",
      "Restart the process",
      "Use module.hot API",
    ],
    correctAnswer: 1,
    explanation:
      "Implement HMR by watching file changes with fs.watch(), clearing the module from require.cache, and re-requiring it. This allows runtime module updates without restart.",
  },
  {
    id: 231,
    category: "Node",
    difficulty: "hard",
    question: "What is the purpose of require.resolve()?",
    options: [
      "Load a module",
      "Get the full path to a module without loading it",
      "Check if module exists",
      "Resolve promise",
    ],
    correctAnswer: 1,
    explanation:
      "require.resolve() returns the resolved filename of a module without actually loading it, useful for checking module locations or build tools.",
  },
  {
    id: 232,
    category: "Node",
    difficulty: "hard",
    question: "What happens when you modify module.exports after requiring?",
    options: [
      "All existing requires get updated",
      "Only future requires get updated",
      "Changes are ignored",
      "Error is thrown",
    ],
    correctAnswer: 1,
    explanation:
      "Changes to module.exports only affect future require() calls. Existing requires keep the reference to the original exported object due to module caching.",
  },
  {
    id: 233,
    category: "Node",
    difficulty: "hard",
    question: "How do you properly implement a worker thread pool?",
    options: [
      "Create new Worker for each task",
      "Maintain a pool of workers and reuse them",
      "Use cluster module",
      "Use child_process",
    ],
    correctAnswer: 1,
    explanation:
      "Implement a worker pool by creating a fixed number of worker threads and reusing them for multiple tasks, managing task queue and worker lifecycle efficiently.",
  },
  {
    id: 234,
    category: "Node",
    difficulty: "hard",
    question: "What is the correct way to share memory between worker threads?",
    options: [
      "Use global variables",
      "Use SharedArrayBuffer with Atomics",
      "Use postMessage() only",
      "Use require() to share modules",
    ],
    correctAnswer: 1,
    explanation:
      "Use SharedArrayBuffer for shared memory between worker threads, with Atomics operations for thread-safe access to avoid race conditions.",
  },
  {
    id: 235,
    category: "Node",
    difficulty: "hard",
    question:
      "What will be the behavior of: new Worker(__filename, { workerData: { shared: new SharedArrayBuffer(10) } });",
    options: [
      "Error",
      "Shared memory available in worker",
      "Copy is made",
      "Undefined behavior",
    ],
    correctAnswer: 1,
    explanation:
      "SharedArrayBuffer can be passed to worker threads through workerData, allowing both threads to access and modify the same memory location.",
  },
  {
    id: 236,
    category: "Node",
    difficulty: "hard",
    question: "How do you properly implement async resource tracking?",
    options: [
      "Use console.log()",
      "Use async_hooks.createHook()",
      "Use process.on()",
      "Use EventEmitter",
    ],
    correctAnswer: 1,
    explanation:
      "Use async_hooks.createHook() to track the lifecycle of async resources across async operations, useful for APM tools and context tracking.",
  },
  {
    id: 237,
    category: "Node",
    difficulty: "hard",
    question: "What is the purpose of AsyncLocalStorage?",
    options: [
      "Store async functions",
      "Maintain context across async operations",
      "Store local variables",
      "Create async storage",
    ],
    correctAnswer: 1,
    explanation:
      "AsyncLocalStorage provides a way to store and retrieve context across asynchronous operations, useful for request tracing and context propagation.",
  },
  {
    id: 238,
    category: "Node",
    difficulty: "hard",
    question:
      "What will happen if you don't call parentPort.close() in a worker thread?",
    options: [
      "Worker terminates immediately",
      "Worker stays alive until parent terminates",
      "Memory leak occurs",
      "Nothing happens",
    ],
    correctAnswer: 1,
    explanation:
      "If parentPort.close() is not called, the worker thread will remain alive until the parent process terminates, potentially causing resource leaks.",
  },
  {
    id: 239,
    category: "Node",
    difficulty: "hard",
    question: "How do you properly implement a zero-copy buffer transfer?",
    options: [
      "Use Buffer.slice()",
      "Use Buffer.copy()",
      "Use ArrayBuffer.transfer()",
      "Zero-copy is not possible in Node.js",
    ],
    correctAnswer: 2,
    explanation:
      "Use ArrayBuffer.transfer() or structuredClone() with transfer option to move ArrayBuffer ownership without copying data, achieving zero-copy transfer.",
  },
  {
    id: 240,
    category: "Node",
    difficulty: "hard",
    question: "What is the correct way to handle V8 heap snapshots?",
    options: [
      "Use v8.writeHeapSnapshot()",
      "Use process.memoryUsage()",
      "Use console.memory()",
      "Heap snapshots aren't supported",
    ],
    correctAnswer: 0,
    explanation:
      "Use v8.writeHeapSnapshot(filename) to create heap snapshots for memory analysis, useful for detecting memory leaks and understanding memory usage.",
  },
  {
    id: 241,
    category: "Node",
    difficulty: "hard",
    question: "What does --max-old-space-size flag do?",
    options: [
      "Limit new space size",
      "Increase maximum heap size for V8",
      "Limit stack size",
      "Increase worker thread memory",
    ],
    correctAnswer: 1,
    explanation:
      "--max-old-space-size increases the maximum heap size for V8's old generation, allowing Node.js to use more memory for large applications.",
  },
  {
    id: 242,
    category: "Node",
    difficulty: "hard",
    question: "How do you properly detect and handle memory leaks?",
    options: [
      "Use console.log()",
      "Take heap snapshots and compare over time",
      "Increase memory limit",
      "Use try-catch blocks",
    ],
    correctAnswer: 1,
    explanation:
      "Take heap snapshots at different times using v8.writeHeapSnapshot() or Chrome DevTools, then compare to identify objects that aren't being garbage collected.",
  },
  {
    id: 243,
    category: "Node",
    difficulty: "hard",
    question: "What is the correct way to implement a DNS cache?",
    options: [
      "Use a simple object",
      "Use Map with TTL and periodic cleanup",
      "Use Array",
      "DNS caching isn't needed",
    ],
    correctAnswer: 1,
    explanation:
      "Implement DNS cache using Map with TTL (time-to-live) values and periodic cleanup of expired entries to prevent memory growth and stale records.",
  },
  {
    id: 244,
    category: "Node",
    difficulty: "hard",
    question:
      "What will be the output of: dns.setServers(['8.8.8.8']); console.log(dns.getServers());",
    options: ["[]", "['8.8.8.8']", "Error", "undefined"],
    correctAnswer: 1,
    explanation:
      "dns.setServers() sets the DNS servers, and dns.getServers() returns the current list, so it will output ['8.8.8.8'] after setting.",
  },
  {
    id: 245,
    category: "Node",
    difficulty: "hard",
    question: "How do you properly implement DNS over HTTPS (DoH)?",
    options: [
      "Use dns module only",
      "Use https module with DNS JSON API",
      "Use http module",
      "DoH isn't supported",
    ],
    correctAnswer: 1,
    explanation:
      "Implement DoH by making HTTPS requests to DoH providers (like Cloudflare or Google) using their JSON APIs via the https module.",
  },
  {
    id: 246,
    category: "Node",
    difficulty: "hard",
    question: "What is the purpose of net.createConnection() vs net.connect()?",
    options: [
      "No difference - they're aliases",
      "createConnection() returns socket, connect() is event-based",
      "connect() is for servers",
      "createConnection() is deprecated",
    ],
    correctAnswer: 0,
    explanation:
      "net.createConnection() and net.connect() are functionally identical - both create TCP connections and return Socket instances. They're aliases.",
  },
  {
    id: 247,
    category: "Node",
    difficulty: "hard",
    question: "What is the correct way to implement TCP keep-alive?",
    options: [
      "Use socket.setKeepAlive(true)",
      "Send periodic data manually",
      "Use setInterval()",
      "TCP keep-alive isn't supported",
    ],
    correctAnswer: 0,
    explanation:
      "Use socket.setKeepAlive(enable, initialDelay) to enable TCP keep-alive, which sends periodic probes to maintain connections and detect dead peers.",
  },
  {
    id: 248,
    category: "Node",
    difficulty: "hard",
    question: "How do you properly handle TCP backpressure?",
    options: [
      "Ignore it",
      "Use socket.pause() and socket.resume()",
      "Increase buffer size",
      "Close connection",
    ],
    correctAnswer: 1,
    explanation:
      "Handle TCP backpressure by using socket.pause() when write buffer is full and socket.resume() when 'drain' event fires to prevent memory issues.",
  },
  {
    id: 249,
    category: "Node",
    difficulty: "hard",
    question: "What is the purpose of dgram module?",
    options: [
      "TCP connections",
      "UDP/datagram sockets",
      "HTTP requests",
      "File transfer",
    ],
    correctAnswer: 1,
    explanation:
      "The dgram module provides UDP datagram socket implementation for connectionless communication, useful for DNS, streaming, and real-time applications.",
  },
  {
    id: 250,
    category: "Node",
    difficulty: "hard",
    question:
      "What will happen with: const socket = dgram.createSocket('udp4'); socket.send(Buffer.alloc(0), 0, 0, 53, '8.8.8.8');",
    options: [
      "Error",
      "Sends empty packet",
      "Sends DNS query",
      "Nothing happens",
    ],
    correctAnswer: 1,
    explanation:
      "This sends an empty UDP packet to port 53 (DNS) at 8.8.8.8. While valid, an empty packet may not elicit a response from DNS servers.",
  },
  {
    id: 251,
    category: "Node",
    difficulty: "hard",
    question: "How do you properly implement UDP multicast?",
    options: [
      "Use socket.addMembership()",
      "Use broadcast address",
      "Use TCP instead",
      "UDP multicast isn't supported",
    ],
    correctAnswer: 0,
    explanation:
      "Implement UDP multicast using socket.addMembership(multicastAddress, [interfaceAddress]) to join multicast groups and receive multicast traffic.",
  },
  {
    id: 252,
    category: "Node",
    difficulty: "hard",
    question: "What is the difference between os.cpus() and os.cpus().length?",
    options: [
      "No difference",
      "cpus() returns details, length returns count",
      "cpus() is faster",
      "length is deprecated",
    ],
    correctAnswer: 1,
    explanation:
      "os.cpus() returns an array of objects with CPU details for each core. os.cpus().length gives the total number of logical CPU cores.",
  },
  {
    id: 253,
    category: "Node",
    difficulty: "hard",
    question: "What does os.freemem() return?",
    options: [
      "Free memory in bytes",
      "Free memory in MB",
      "Percentage of free memory",
      "Total system memory",
    ],
    correctAnswer: 0,
    explanation:
      "os.freemem() returns the amount of free system memory in bytes as an integer, not percentage or MB.",
  },
  {
    id: 254,
    category: "Node",
    difficulty: "hard",
    question: "How do you properly detect the operating system platform?",
    options: [
      "Use os.platform()",
      "Use process.platform",
      "Both A and B",
      "Use os.type()",
    ],
    correctAnswer: 2,
    explanation:
      "Both os.platform() and process.platform return the operating system platform (like 'darwin', 'win32', 'linux'). They provide the same information.",
  },
  {
    id: 255,
    category: "Node",
    difficulty: "hard",
    question: "What is the purpose of os.networkInterfaces()?",
    options: [
      "Get network statistics",
      "Get detailed network interface information",
      "Get IP address only",
      "Get MAC address only",
    ],
    correctAnswer: 1,
    explanation:
      "os.networkInterfaces() returns detailed information about each network interface including IP addresses, MAC addresses, family (IPv4/IPv6), and internal status.",
  },
  {
    id: 256,
    category: "Node",
    difficulty: "hard",
    question: "What will os.endianness() return on most modern systems?",
    options: ["BE", "LE", "ME", "Depends on system architecture"],
    correctAnswer: 1,
    explanation:
      "os.endianness() returns 'LE' (Little Endian) for most modern x86 and x64 systems, while 'BE' (Big Endian) is found on some ARM or PowerPC systems.",
  },
  {
    id: 257,
    category: "Node",
    difficulty: "hard",
    question: "How do you properly implement file watching with fs.watch()?",
    options: [
      "Use fs.watch() only",
      "Handle 'change' and 'error' events, with platform-specific considerations",
      "Use setInterval() to poll",
      "File watching isn't reliable",
    ],
    correctAnswer: 1,
    explanation:
      "Implement fs.watch() by handling 'change' and 'error' events, considering platform differences (recursive support on Windows vs macOS), and using fs.watchFile() as fallback.",
  },
  {
    id: 258,
    category: "Node",
    difficulty: "hard",
    question: "What is the difference between fs.watch() and fs.watchFile()?",
    options: [
      "No difference",
      "watch() uses native API, watchFile() polls",
      "watchFile() is faster",
      "watch() is deprecated",
    ],
    correctAnswer: 1,
    explanation:
      "fs.watch() uses native OS file watching APIs (more efficient but less consistent across platforms), while fs.watchFile() uses stat polling (more reliable but less efficient).",
  },
  {
    id: 259,
    category: "Node",
    difficulty: "hard",
    question:
      "What will happen with: fs.watch('file.txt', (eventType, filename) => { console.log(eventType, filename); });",
    options: [
      "Watches file changes",
      "Error if file doesn't exist",
      "Watches directory only",
      "Nothing happens",
    ],
    correctAnswer: 0,
    explanation:
      "This sets up a watcher for file.txt changes. It will log the event type ('rename' or 'change') and filename when changes occur, creating the watch successfully if the file exists.",
  },
  {
    id: 260,
    category: "Node",
    difficulty: "hard",
    question: "How do you properly handle EMFILE (too many open files) errors?",
    options: [
      "Increase ulimit only",
      "Use graceful-fs or implement queue with limit",
      "Ignore the error",
      "Close all files",
    ],
    correctAnswer: 1,
    explanation:
      "Handle EMFILE by using graceful-fs library or implementing a queue that limits concurrent file operations, preventing too many files from being opened simultaneously.",
  },
  {
    id: 261,
    category: "Node",
    difficulty: "hard",
    question: "What is the purpose of fs.open() with flags?",
    options: [
      "Open files only",
      "Control file access mode and behavior",
      "Set file permissions only",
      "Create directories",
    ],
    correctAnswer: 1,
    explanation:
      "fs.open() flags like 'r', 'w', 'a', 'r+', 'w+', 'a+' control how files are opened (read, write, append, create if not exists, truncate, etc.) and access behavior.",
  },
  {
    id: 262,
    category: "Node",
    difficulty: "hard",
    question: "What does the 'wx' flag do in fs.open()?",
    options: [
      "Write only",
      "Write and create if not exists, fail if exists",
      "Exclusive write",
      "Write and truncate",
    ],
    correctAnswer: 1,
    explanation:
      "'wx' flag opens file for writing, creates it if it doesn't exist, but fails if the file already exists (exclusive creation), useful for atomic file creation.",
  },
  {
    id: 263,
    category: "Node",
    difficulty: "hard",
    question: "How do you properly implement atomic file writes?",
    options: [
      "Write directly to file",
      "Write to temp file then rename",
      "Use fs.appendFile()",
      "Atomic writes aren't possible",
    ],
    correctAnswer: 1,
    explanation:
      "Implement atomic writes by writing to a temporary file first, then using fs.rename() to atomically replace the target file, ensuring no partial writes are visible.",
  },
  {
    id: 264,
    category: "Node",
    difficulty: "hard",
    question: "What is the purpose of fs.fsync()?",
    options: [
      "Sync file metadata only",
      "Force file data and metadata to disk",
      "Sync directory only",
      "Flush read cache",
    ],
    correctAnswer: 1,
    explanation:
      "fs.fsync() forces all file data and metadata to be written to the underlying storage device, ensuring data persistence even after system crashes.",
  },
  {
    id: 265,
    category: "Node",
    difficulty: "hard",
    question: "What will fs.createReadStream() do if file doesn't exist?",
    options: [
      "Creates empty file",
      "Emits 'error' event",
      "Creates stream with warning",
      "Waits for file creation",
    ],
    correctAnswer: 1,
    explanation:
      "fs.createReadStream() will emit an 'error' event on the stream if the file doesn't exist. You must handle this event to prevent uncaught exceptions.",
  },
  {
    id: 266,
    category: "Node",
    difficulty: "hard",
    question:
      "How do you properly implement stream backpressure with async iteration?",
    options: [
      "Use for await...of only",
      "Handle backpressure with return value of yield",
      "Streams handle it automatically",
      "Use pause() and resume() manually",
    ],
    correctAnswer: 1,
    explanation:
      "With async iteration, the return value of yield indicates backpressure. If yield returns false, stop yielding until the stream drains to handle backpressure properly.",
  },
  {
    id: 267,
    category: "Node",
    difficulty: "hard",
    question: "What is the highWaterMark option in streams?",
    options: [
      "Maximum stream speed",
      "Buffer size threshold for backpressure",
      "Maximum file size",
      "Stream timeout",
    ],
    correctAnswer: 1,
    explanation:
      "highWaterMark is the buffer size threshold (in bytes or objects) that determines when backpressure is applied to prevent memory issues in streams.",
  },
  {
    id: 268,
    category: "Node",
    difficulty: "hard",
    question: "What happens when you pipe a slow readable to a fast writable?",
    options: [
      "Data loss",
      "Backpressure is applied automatically",
      "Memory overflow",
      "Stream error",
    ],
    correctAnswer: 1,
    explanation:
      "Node.js streams automatically apply backpressure when a slow readable is piped to a fast writable, preventing data loss and memory issues through proper flow control.",
  },
  {
    id: 269,
    category: "Node",
    difficulty: "hard",
    question: "How do you properly implement object mode streams?",
    options: [
      "Set objectMode: true in options",
      "Use JSON only",
      "Use Buffer only",
      "Object mode isn't supported",
    ],
    correctAnswer: 0,
    explanation:
      "Enable object mode by setting objectMode: true in stream options. This allows streams to work with JavaScript objects instead of only strings/buffers.",
  },
  {
    id: 270,
    category: "Node",
    difficulty: "hard",
    question:
      "What is the difference between objectMode and highWaterMark in object streams?",
    options: [
      "No difference",
      "objectMode enables objects, highWaterMark counts objects vs bytes",
      "highWaterMark is ignored in object mode",
      "objectMode sets highWaterMark automatically",
    ],
    correctAnswer: 1,
    explanation:
      "In object mode streams, highWaterMark represents the number of objects (not bytes) that can be buffered before backpressure is applied.",
  },
  {
    id: 271,
    category: "Node",
    difficulty: "hard",
    question: "What is the purpose of the 'prefinish' event in streams?",
    options: [
      "Stream is ready",
      "Writable stream is about to finish",
      "Readable stream ended",
      "Transform stream completed",
    ],
    correctAnswer: 1,
    explanation:
      "'prefinish' is emitted on writable streams before 'finish' event, allowing final operations before the stream is considered completely finished.",
  },
  {
    id: 272,
    category: "Node",
    difficulty: "hard",
    question: "How do you properly destroy a stream with cleanup?",
    options: [
      "Use stream.end() only",
      "Implement _destroy() method and call destroy()",
      "Use stream.close()",
      "Set stream to null",
    ],
    correctAnswer: 1,
    explanation:
      "Implement _destroy(error, callback) in custom streams and call stream.destroy() to properly close resources and emit 'close' event after cleanup.",
  },
  {
    id: 273,
    category: "Node",
    difficulty: "hard",
    question: "What is the correct way to implement a pass-through stream?",
    options: [
      "Extend stream.PassThrough",
      "Use stream.PassThrough directly",
      "Extend stream.Transform without transformation",
      "Both A and B",
    ],
    correctAnswer: 3,
    explanation:
      "You can either extend stream.PassThrough or use it directly. PassThrough is a simple transform stream that doesn't modify data, useful for testing or piping.",
  },
  {
    id: 274,
    category: "Node",
    difficulty: "hard",
    question:
      "What will happen with: const { pipeline } = require('stream/promises'); await pipeline(readable, transform, writable);",
    options: [
      "Returns promise",
      "Throws on error",
      "Both A and B",
      "Nothing happens",
    ],
    correctAnswer: 2,
    explanation:
      "stream/promises.pipeline() returns a promise that resolves when pipeline completes successfully or rejects on error, enabling async/await usage with proper error handling.",
  },
  {
    id: 275,
    category: "Node",
    difficulty: "hard",
    question: "How do you properly implement stream multiplexing?",
    options: [
      "Use single stream only",
      "Use stream.PassThrough for each channel",
      "Implement custom multiplexing with proper channel management",
      "Multiplexing isn't possible",
    ],
    correctAnswer: 2,
    explanation:
      "Implement stream multiplexing by creating a custom stream that manages multiple logical channels, properly handling channel IDs, data framing, and backpressure for each channel.",
  },
  {
    id: 276,
    category: "Node",
    difficulty: "hard",
    question: "What is the purpose of the final() method in transform streams?",
    options: [
      "End the stream",
      "Flush remaining data before stream ends",
      "Transform final chunk",
      "Close resources",
    ],
    correctAnswer: 1,
    explanation:
      "The final(callback) method in transform streams is called before the stream ends, allowing you to flush any remaining buffered data or perform cleanup operations.",
  },
  {
    id: 277,
    category: "Node",
    difficulty: "hard",
    question: "How do you properly handle stream errors in pipeline?",
    options: [
      "Handle on each stream",
      "Pipeline handles all errors",
      "Use try-catch with pipeline callback",
      "Errors are ignored",
    ],
    correctAnswer: 2,
    explanation:
      "With callback-based pipeline(), use try-catch around the callback. With promises pipeline(), use try-catch or .catch(). Pipeline forwards errors and cleans up automatically.",
  },
  {
    id: 278,
    category: "Node",
    difficulty: "hard",
    question: "What is the correct way to implement stream composition?",
    options: [
      "Use pipe() chains",
      "Use compose() from stream/promises",
      "Use pipeline() for error handling",
      "Both B and C",
    ],
    correctAnswer: 3,
    explanation:
      "Use compose() from stream/promises for composing streams into a single stream, or pipeline() for proper error handling and cleanup in stream chains.",
  },
  {
    id: 279,
    category: "Node",
    difficulty: "hard",
    question: "What happens when you set emitClose: false in stream options?",
    options: [
      "Stream never closes",
      "'close' event won't be emitted automatically",
      "Stream errors",
      "No effect",
    ],
    correctAnswer: 1,
    explanation:
      "Setting emitClose: false prevents the automatic emission of 'close' event when stream.destroy() is called, giving you manual control over when to emit it.",
  },
  {
    id: 280,
    category: "Node",
    difficulty: "hard",
    question: "What is the purpose of the autoDestroy option in streams?",
    options: [
      "Automatically destroy on error",
      "Automatically call destroy() when stream ends",
      "Destroy on timeout",
      "Auto cleanup resources",
    ],
    correctAnswer: 1,
    explanation:
      "autoDestroy: true automatically calls destroy() on a stream when it emits 'finish' or 'end', ensuring proper cleanup and resource release.",
  },
  {
    id: 281,
    category: "Node",
    difficulty: "hard",
    question:
      "How do you properly implement a readable stream from async generator?",
    options: [
      "Use Readable.from()",
      "Implement _read() with generator",
      "Use pipeline()",
      "Not possible",
    ],
    correctAnswer: 0,
    explanation:
      "Use Readable.from(asyncGenerator) to create a readable stream from an async generator function, which automatically handles the async iteration.",
  },
  {
    id: 282,
    category: "Node",
    difficulty: "hard",
    question: "What is the correct way to handle stream cancellation?",
    options: [
      "Use stream.destroy()",
      "Implement cancel() method",
      "Use AbortController with signal",
      "Both A and C",
    ],
    correctAnswer: 3,
    explanation:
      "Handle stream cancellation using stream.destroy() for immediate termination, or AbortController with signal option for cooperative cancellation in modern stream APIs.",
  },
  {
    id: 283,
    category: "Node",
    difficulty: "hard",
    question:
      "What will be the output of: console.log(util.types.isAsyncFunction(async () => {}));",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "util.types.isAsyncFunction() returns true for async functions, so util.types.isAsyncFunction(async () => {}) returns true.",
  },
  {
    id: 284,
    category: "Node",
    difficulty: "hard",
    question: "How do you properly implement a custom inspection method?",
    options: [
      "Implement [util.inspect.custom]()",
      "Override toString()",
      "Use JSON.stringify()",
      "Implement inspect() method",
    ],
    correctAnswer: 0,
    explanation:
      "Implement [util.inspect.custom](depth, options) method to provide custom string representation when util.inspect() is called on your object.",
  },
  {
    id: 285,
    category: "Node",
    difficulty: "hard",
    question: "What is the purpose of util.deprecate()?",
    options: [
      "Remove functions",
      "Mark functions as deprecated with warnings",
      "Disable functions",
      "Document functions",
    ],
    correctAnswer: 1,
    explanation:
      "util.deprecate(fn, message) wraps a function to emit deprecation warnings when called, helping developers migrate away from deprecated APIs.",
  },
  {
    id: 286,
    category: "Node",
    difficulty: "hard",
    question: "What does util.promisify.custom symbol do?",
    options: [
      "Custom promise implementation",
      "Custom promisify behavior for functions",
      "Disable promisify",
      "Custom callback handling",
    ],
    correctAnswer: 1,
    explanation:
      "Functions can implement [util.promisify.custom] property to provide custom promisification behavior when used with util.promisify().",
  },
  {
    id: 287,
    category: "Node",
    difficulty: "hard",
    question: "How do you properly implement a timeout for async operations?",
    options: [
      "Use setTimeout() only",
      "Use Promise.race() with delay",
      "Use AbortController with timeout",
      "Both B and C",
    ],
    correctAnswer: 3,
    explanation:
      "Implement timeouts using Promise.race() with a delay promise, or AbortController with signal and clearTimeout(). Both approaches provide proper timeout handling.",
  },
  {
    id: 288,
    category: "Node",
    difficulty: "hard",
    question:
      "What is the correct way to implement exponential backoff with jitter?",
    options: [
      "delay = Math.pow(2, attempt) * baseDelay",
      "delay = Math.pow(2, attempt) * baseDelay + Math.random() * baseDelay",
      "delay = attempt * baseDelay",
      "delay = baseDelay only",
    ],
    correctAnswer: 1,
    explanation:
      "Exponential backoff with jitter: delay = (2^attempt * baseDelay) + (Math.random() * baseDelay). Jitter prevents thundering herd by randomizing retry times.",
  },
  {
    id: 289,
    category: "Node",
    difficulty: "hard",
    question:
      "What is the purpose of performance.mark() and performance.measure()?",
    options: [
      "Memory measurement",
      "CPU measurement",
      "Performance timing and measurement",
      "Network measurement",
    ],
    correctAnswer: 2,
    explanation:
      "performance.mark() creates timestamps and performance.measure() calculates durations between marks, enabling detailed performance analysis of code sections.",
  },
  {
    id: 290,
    category: "Node",
    difficulty: "hard",
    question: "How do you properly implement request coalescing?",
    options: [
      "Queue all requests",
      "Combine identical concurrent requests into one",
      "Reject duplicate requests",
      "Use caching only",
    ],
    correctAnswer: 1,
    explanation:
      "Request coalescing identifies identical concurrent requests and combines them into a single backend request, sharing the result among all pending requests to reduce load.",
  },
  {
    id: 291,
    category: "Node",
    difficulty: "hard",
    question: "What is the correct way to implement circuit breaker pattern?",
    options: [
      "Try-catch with retry",
      "State machine with closed, open, half-open states",
      "Use promises only",
      "Circuit breaker isn't needed",
    ],
    correctAnswer: 1,
    explanation:
      "Implement circuit breaker as a state machine: Closed (normal operation), Open (failing fast), Half-Open (testing recovery), with failure counting and timeout mechanisms.",
  },
  {
    id: 292,
    category: "Node",
    difficulty: "hard",
    question: "What is the purpose of bulkhead pattern?",
    options: [
      "Ship construction",
      "Isolate failures to prevent cascading",
      "Improve performance",
      "Increase capacity",
    ],
    correctAnswer: 1,
    explanation:
      "Bulkhead pattern isolates resources (threads, connections, memory) into separate pools, preventing failures in one component from affecting others, similar to ship bulkheads.",
  },
  {
    id: 293,
    category: "Node",
    difficulty: "hard",
    question: "How do you properly implement retry with circuit breaker?",
    options: [
      "Retry immediately",
      "Retry only in half-open state with limited attempts",
      "Retry forever",
      "Don't retry with circuit breaker",
    ],
    correctAnswer: 1,
    explanation:
      "Only retry when circuit breaker is in half-open state with limited attempts, and only after the timeout period has elapsed to allow the downstream service to recover.",
  },
  {
    id: 294,
    category: "Node",
    difficulty: "hard",
    question: "What is the correct way to handle distributed locks?",
    options: [
      "Use local locks",
      "Use Redis with SET NX EX and Lua scripts",
      "Use database locks only",
      "Don't use locks",
    ],
    correctAnswer: 1,
    explanation:
      "Implement distributed locks using Redis SET key value NX EX seconds with unique values and Lua scripts for atomic release, ensuring lock ownership and preventing race conditions.",
  },
  {
    id: 295,
    category: "Node",
    difficulty: "hard",
    question: "What is the purpose of saga pattern?",
    options: [
      "Stories",
      "Manage distributed transactions across services",
      "Improve performance",
      "Simple transactions",
    ],
    correctAnswer: 1,
    explanation:
      "Saga pattern manages distributed transactions across multiple services by breaking them into local transactions with compensating actions for rollbacks.",
  },
  {
    id: 296,
    category: "Node",
    difficulty: "hard",
    question: "How do you properly implement event sourcing?",
    options: [
      "Store current state only",
      "Store all state changes as events",
      "Use database triggers",
      "Store in cache",
    ],
    correctAnswer: 1,
    explanation:
      "Event sourcing stores all state changes as a sequence of events, allowing reconstruction of state at any point and providing audit trail, rather than storing just current state.",
  },
  {
    id: 297,
    category: "Node",
    difficulty: "hard",
    question: "What is the difference between CQRS and CRUD?",
    options: [
      "No difference",
      "CQRS separates read/write models, CRUD uses same model",
      "CQRS is faster",
      "CRUD is more complex",
    ],
    correctAnswer: 1,
    explanation:
      "CQRS (Command Query Responsibility Segregation) separates read and write models for optimization, while CRUD uses the same model for all operations (Create, Read, Update, Delete).",
  },
  {
    id: 298,
    category: "Node",
    difficulty: "hard",
    question: "What is the correct way to implement idempotency?",
    options: [
      "Use GET only",
      "Use unique request IDs and store processed requests",
      "Use POST only",
      "Idempotency isn't needed",
    ],
    correctAnswer: 1,
    explanation:
      "Implement idempotency using unique request IDs, storing processed request results, and returning the same response for duplicate requests regardless of how many times they're sent.",
  },
  {
    id: 299,
    category: "Node",
    difficulty: "hard",
    question: "How do you properly implement distributed tracing?",
    options: [
      "Use logs only",
      "Pass trace context through requests and correlate spans",
      "Use metrics only",
      "Tracing isn't needed",
    ],
    correctAnswer: 1,
    explanation:
      "Distributed tracing passes trace context (trace ID, span ID) through service requests, creating spans for each operation and correlating them to trace requests across services.",
  },
  {
    id: 300,
    category: "Node",
    difficulty: "hard",
    question: "What is the purpose of OpenTelemetry in Node.js?",
    options: [
      "Database tool",
      "Vendor-neutral observability framework for traces, metrics, logs",
      "Testing framework",
      "Security framework",
    ],
    correctAnswer: 1,
    explanation:
      "OpenTelemetry provides vendor-neutral APIs and SDKs for collecting traces, metrics, and logs from applications, enabling observability across distributed systems.",
  },
];

// 348 questions
export const reactMCQs = [
  {
    id: 1,
    category: "React",
    difficulty: "easy",
    question: "What is React?",
    options: [
      "A JavaScript library for building user interfaces",
      "A backend framework",
      "A database management system",
      "A CSS preprocessor",
    ],
    correctAnswer: 0,
    explanation:
      "React is a JavaScript library developed by Facebook for building user interfaces, particularly web applications with dynamic and interactive components.",
  },
  {
    id: 2,
    category: "React",
    difficulty: "easy",
    question: "What is JSX in React?",
    options: [
      "A JavaScript library",
      "A syntax extension for JavaScript",
      "A CSS framework",
      "A database query language",
    ],
    correctAnswer: 1,
    explanation:
      "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files. It gets transpiled to regular JavaScript.",
  },
  {
    id: 3,
    category: "React",
    difficulty: "easy",
    question: "Which hook is used to manage state in functional components?",
    options: ["useEffect", "useState", "useContext", "useReducer"],
    correctAnswer: 1,
    explanation:
      "useState is the primary hook for managing local state in functional components. It returns a state variable and a function to update it.",
  },
  {
    id: 4,
    category: "React",
    difficulty: "easy",
    question:
      "What happens when you call setState multiple times in a single event handler?",
    options: [
      "Each setState triggers a separate re-render",
      "Only the last setState is executed",
      "React batches the updates and triggers one re-render",
      "It causes an error",
    ],
    correctAnswer: 2,
    explanation:
      "React batches multiple setState calls in event handlers for performance optimization, resulting in a single re-render with all updates applied.",
  },
  {
    id: 5,
    category: "React",
    difficulty: "easy",
    question: "What is the purpose of the key prop in React lists?",
    options: [
      "To style list items",
      "To help React identify which items have changed",
      "To sort the list items",
      "To add event listeners",
    ],
    correctAnswer: 1,
    explanation:
      "The key prop helps React identify which items have changed, been added, or removed, enabling efficient re-rendering of lists.",
  },
  {
    id: 6,
    category: "React",
    difficulty: "easy",
    question: "What is the virtual DOM in React?",
    options: [
      "A copy of the real DOM stored in memory",
      "A JavaScript representation of the real DOM",
      "A faster version of the DOM",
      "A debugging tool for React",
    ],
    correctAnswer: 1,
    explanation:
      "The virtual DOM is a JavaScript representation of the real DOM kept in memory. React uses it to optimize updates by comparing changes before applying them to the real DOM.",
  },
  {
    id: 7,
    category: "React",
    difficulty: "easy",
    question: "What are React components?",
    options: [
      "HTML elements",
      "Reusable pieces of UI",
      "CSS classes",
      "JavaScript functions only",
    ],
    correctAnswer: 1,
    explanation:
      "React components are reusable pieces of UI that can be either function components or class components, allowing you to split the UI into independent, reusable pieces.",
  },
  {
    id: 8,
    category: "React",
    difficulty: "easy",
    question: "What is the difference between functional and class components?",
    options: [
      "No difference",
      "Functional components can't use state",
      "Class components use ES6 classes, functional components use functions",
      "Functional components are faster",
    ],
    correctAnswer: 2,
    explanation:
      "Class components are defined using ES6 classes and have access to lifecycle methods, while functional components are defined as JavaScript functions and use hooks for state and lifecycle.",
  },
  {
    id: 9,
    category: "React",
    difficulty: "easy",
    question: "What is props in React?",
    options: [
      "Component state",
      "Properties passed to components",
      "CSS properties",
      "Event handlers",
    ],
    correctAnswer: 1,
    explanation:
      "Props (properties) are read-only data passed from parent components to child components, allowing components to be dynamic and reusable.",
  },
  {
    id: 10,
    category: "React",
    difficulty: "easy",
    question: "Can you modify props directly in a component?",
    options: [
      "Yes, props are mutable",
      "No, props are read-only",
      "Only in class components",
      "Only in functional components",
    ],
    correctAnswer: 1,
    explanation:
      "Props are read-only and cannot be modified directly by the receiving component. They represent immutable data passed down from parent components.",
  },
  {
    id: 11,
    category: "React",
    difficulty: "easy",
    question: "What is the purpose of useEffect hook?",
    options: [
      "To manage state",
      "To handle side effects",
      "To create components",
      "To style components",
    ],
    correctAnswer: 1,
    explanation:
      "useEffect hook is used to handle side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.",
  },
  {
    id: 12,
    category: "React",
    difficulty: "easy",
    question: "What is React state?",
    options: [
      "External data source",
      "Component's internal data",
      "CSS styles",
      "HTML attributes",
    ],
    correctAnswer: 1,
    explanation:
      "State is a component's internal data that can change over time and triggers re-rendering when updated.",
  },
  {
    id: 13,
    category: "React",
    difficulty: "easy",
    question: "How do you create a React app?",
    options: [
      "npm install react",
      "npx create-react-app my-app",
      "react new app",
      "npm create react",
    ],
    correctAnswer: 1,
    explanation:
      "The most common way to create a new React app is using Create React App with the command 'npx create-react-app my-app'.",
  },
  {
    id: 14,
    category: "React",
    difficulty: "easy",
    question: "What is the default export in a React component file?",
    options: [
      "The component function/class",
      "Props object",
      "State object",
      "JSX elements",
    ],
    correctAnswer: 0,
    explanation:
      "Typically, the main component function or class is exported as the default export from a React component file.",
  },
  {
    id: 15,
    category: "React",
    difficulty: "easy",
    question: "What is the render method in React?",
    options: [
      "A lifecycle method that returns JSX",
      "A hook for rendering",
      "A prop type",
      "A state updater",
    ],
    correctAnswer: 0,
    explanation:
      "The render method is a required lifecycle method in class components that returns the JSX to be rendered to the DOM.",
  },
  {
    id: 16,
    category: "React",
    difficulty: "medium",
    question: "What is React.Fragment and why would you use it?",
    options: [
      "A way to group elements without adding extra DOM nodes",
      "A component for handling errors",
      "A method for state management",
      "A routing component",
    ],
    correctAnswer: 0,
    explanation:
      "React.Fragment allows you to group multiple elements without adding an extra DOM node, which is useful when you don't want wrapper divs affecting your layout or CSS.",
  },
  {
    id: 17,
    category: "React",
    difficulty: "medium",
    question:
      "What is the difference between controlled and uncontrolled components?",
    options: [
      "Controlled components manage their own state",
      "Controlled components have their state managed by React",
      "There's no difference",
      "Uncontrolled components are faster",
    ],
    correctAnswer: 1,
    explanation:
      "Controlled components have their form data handled by React component state, while uncontrolled components handle form data by the DOM itself.",
  },
  {
    id: 18,
    category: "React",
    difficulty: "medium",
    question: "What is prop drilling?",
    options: [
      "Creating holes in components",
      "Passing props through multiple component layers",
      "Validating prop types",
      "Optimizing prop performance",
    ],
    correctAnswer: 1,
    explanation:
      "Prop drilling refers to passing props through multiple layers of components to reach a deeply nested child component that needs the data.",
  },
  {
    id: 19,
    category: "React",
    difficulty: "medium",
    question: "What is useContext hook used for?",
    options: [
      "Managing local state",
      "Consuming context values",
      "Handling side effects",
      "Creating refs",
    ],
    correctAnswer: 1,
    explanation:
      "useContext hook is used to consume context values in functional components, providing an alternative to prop drilling for sharing data across components.",
  },
  {
    id: 20,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of useRef hook?",
    options: [
      "Managing state",
      "Creating references to DOM elements or storing mutable values",
      "Handling effects",
      "Context management",
    ],
    correctAnswer: 1,
    explanation:
      "useRef hook creates a mutable ref object that can hold references to DOM elements or any mutable value that persists across re-renders.",
  },
  {
    id: 21,
    category: "React",
    difficulty: "medium",
    question: "What is React.memo()?",
    options: [
      "A hook for memorization",
      "A higher-order component for memoizing components",
      "A method for creating components",
      "A state management tool",
    ],
    correctAnswer: 1,
    explanation:
      "React.memo is a higher-order component that memoizes the result of a component, preventing unnecessary re-renders when props haven't changed.",
  },
  {
    id: 22,
    category: "React",
    difficulty: "medium",
    question: "What are React lifecycle methods?",
    options: [
      "Methods called at different stages of component lifecycle",
      "Methods for managing state",
      "Methods for handling props",
      "Methods for styling components",
    ],
    correctAnswer: 0,
    explanation:
      "Lifecycle methods are special methods in class components that are called at different stages of a component's lifecycle (mounting, updating, unmounting).",
  },
  {
    id: 23,
    category: "React",
    difficulty: "medium",
    question: "What is componentDidMount used for?",
    options: [
      "Before component mounts",
      "After component mounts to DOM",
      "Before component unmounts",
      "During component update",
    ],
    correctAnswer: 1,
    explanation:
      "componentDidMount is called immediately after a component is mounted to the DOM, commonly used for API calls, setting up subscriptions, or timers.",
  },
  {
    id: 24,
    category: "React",
    difficulty: "medium",
    question:
      "What is the equivalent of componentDidMount in functional components?",
    options: [
      "useEffect with empty dependency array",
      "useEffect with dependencies",
      "useState",
      "useContext",
    ],
    correctAnswer: 0,
    explanation:
      "useEffect with an empty dependency array ([]) runs only once after the component mounts, equivalent to componentDidMount.",
  },
  {
    id: 25,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of dependency array in useEffect?",
    options: [
      "To specify when the effect should run",
      "To pass data to the effect",
      "To clean up the effect",
      "To handle errors",
    ],
    correctAnswer: 0,
    explanation:
      "The dependency array in useEffect specifies which values the effect depends on, determining when the effect should re-run.",
  },
  {
    id: 26,
    category: "React",
    difficulty: "medium",
    question: "How do you prevent a useEffect from running on every render?",
    options: [
      "Use useCallback",
      "Use dependency array",
      "Use useMemo",
      "Use React.memo",
    ],
    correctAnswer: 1,
    explanation:
      "You can prevent useEffect from running on every render by providing a dependency array that specifies which values should trigger the effect.",
  },
  {
    id: 27,
    category: "React",
    difficulty: "medium",
    question: "What is event bubbling in React?",
    options: [
      "Events propagate from child to parent elements",
      "Events are automatically handled",
      "Events are batched together",
      "Events are prevented by default",
    ],
    correctAnswer: 0,
    explanation:
      "Event bubbling is when events propagate from the target element up through its parent elements, which React handles through its synthetic event system.",
  },
  {
    id: 28,
    category: "React",
    difficulty: "medium",
    question: "What are synthetic events in React?",
    options: [
      "Fake events for testing",
      "Cross-browser wrapper around native events",
      "Events created by developers",
      "Events that don't exist in DOM",
    ],
    correctAnswer: 1,
    explanation:
      "Synthetic events are React's cross-browser wrapper around native DOM events, providing consistent behavior across different browsers.",
  },
  {
    id: 29,
    category: "React",
    difficulty: "medium",
    question: "What is the children prop in React?",
    options: [
      "Props for child components",
      "Content between component opening and closing tags",
      "Array of child elements",
      "Component hierarchy",
    ],
    correctAnswer: 1,
    explanation:
      "The children prop contains the content that is passed between the opening and closing tags of a component.",
  },
  {
    id: 30,
    category: "React",
    difficulty: "medium",
    question: "What is conditional rendering in React?",
    options: [
      "Rendering based on conditions",
      "Rendering multiple components",
      "Rendering with CSS conditions",
      "Rendering asynchronously",
    ],
    correctAnswer: 0,
    explanation:
      "Conditional rendering is the practice of rendering different UI elements based on certain conditions, typically using JavaScript conditional operators.",
  },
  {
    id: 31,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of defaultProps?",
    options: [
      "To set default values for props",
      "To validate prop types",
      "To pass props to children",
      "To optimize performance",
    ],
    correctAnswer: 0,
    explanation:
      "defaultProps is used to define default values for props in case they are not provided by the parent component.",
  },
  {
    id: 32,
    category: "React",
    difficulty: "medium",
    question: "What is PropTypes in React?",
    options: [
      "A way to define component structure",
      "Runtime type checking for props",
      "A state management library",
      "A testing utility",
    ],
    correctAnswer: 1,
    explanation:
      "PropTypes provides runtime type checking for React props, helping developers catch bugs by validating the types of props passed to components.",
  },
  {
    id: 33,
    category: "React",
    difficulty: "medium",
    question: "What is the difference between state and props?",
    options: [
      "State is external, props are internal",
      "State is internal and mutable, props are external and immutable",
      "No difference",
      "Props are faster than state",
    ],
    correctAnswer: 1,
    explanation:
      "State is internal to a component and can be changed, while props are passed from parent components and are read-only.",
  },
  {
    id: 34,
    category: "React",
    difficulty: "medium",
    question: "What happens if you call setState in render method?",
    options: [
      "Component re-renders once",
      "Infinite loop of re-renders",
      "Nothing happens",
      "Component crashes",
    ],
    correctAnswer: 1,
    explanation:
      "Calling setState in the render method creates an infinite loop because setState triggers a re-render, which calls render again.",
  },
  {
    id: 35,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of componentWillUnmount?",
    options: [
      "Before component mounts",
      "Cleanup before component is removed",
      "After component updates",
      "During component render",
    ],
    correctAnswer: 1,
    explanation:
      "componentWillUnmount is called just before a component is unmounted and destroyed, used for cleanup like removing event listeners or canceling network requests.",
  },
  {
    id: 36,
    category: "React",
    difficulty: "medium",
    question: "How do you handle cleanup in useEffect?",
    options: [
      "Return a cleanup function",
      "Use useCleanup hook",
      "Call cleanup manually",
      "Use componentWillUnmount",
    ],
    correctAnswer: 0,
    explanation:
      "In useEffect, you can return a cleanup function that will be called when the component unmounts or before the effect runs again.",
  },
  {
    id: 37,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of useMemo hook?",
    options: [
      "Managing state",
      "Memoizing expensive calculations",
      "Handling side effects",
      "Creating refs",
    ],
    correctAnswer: 1,
    explanation:
      "useMemo is used to memoize expensive calculations, only recalculating when its dependencies change, helping optimize performance.",
  },
  {
    id: 38,
    category: "React",
    difficulty: "medium",
    question: "What is useCallback hook used for?",
    options: [
      "Caching function instances",
      "Managing state",
      "Handling effects",
      "Creating components",
    ],
    correctAnswer: 0,
    explanation:
      "useCallback returns a memoized version of a callback function that only changes if its dependencies change, preventing unnecessary re-renders of child components.",
  },
  {
    id: 39,
    category: "React",
    difficulty: "medium",
    question: "What is the difference between useMemo and useCallback?",
    options: [
      "No difference",
      "useMemo memoizes values, useCallback memoizes functions",
      "useMemo is for state, useCallback is for effects",
      "useCallback is deprecated",
    ],
    correctAnswer: 1,
    explanation:
      "useMemo memoizes the result of a computation, while useCallback memoizes a function itself to prevent recreating it on every render.",
  },
  {
    id: 40,
    category: "React",
    difficulty: "medium",
    question: "What is React.StrictMode?",
    options: [
      "A development tool for highlighting problems",
      "A production optimization",
      "A testing framework",
      "A state management solution",
    ],
    correctAnswer: 0,
    explanation:
      "React.StrictMode is a development tool that helps identify problems in an application by intentionally double-invoking functions and highlighting potential issues.",
  },
  {
    id: 41,
    category: "React",
    difficulty: "hard",
    question: "What is React Fiber?",
    options: [
      "A new component type",
      "React's reconciliation algorithm",
      "A state management library",
      "A testing framework",
    ],
    correctAnswer: 1,
    explanation:
      "React Fiber is React's reconciliation algorithm that enables incremental rendering, allowing React to split work into chunks and prioritize updates.",
  },
  {
    id: 42,
    category: "React",
    difficulty: "hard",
    question: "What is the reconciliation process in React?",
    options: [
      "The process of comparing virtual DOM trees",
      "The process of updating state",
      "The process of handling events",
      "The process of mounting components",
    ],
    correctAnswer: 0,
    explanation:
      "Reconciliation is the process by which React compares the current virtual DOM tree with the previous one and determines what changes need to be made to the real DOM.",
  },
  {
    id: 43,
    category: "React",
    difficulty: "hard",
    question: "What are React Portals?",
    options: [
      "Components that render outside their parent DOM hierarchy",
      "Components for routing",
      "Components for state management",
      "Components for styling",
    ],
    correctAnswer: 0,
    explanation:
      "React Portals provide a way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.",
  },
  {
    id: 44,
    category: "React",
    difficulty: "hard",
    question: "What is React.lazy() used for?",
    options: [
      "Lazy loading components",
      "Delaying state updates",
      "Slow rendering",
      "Testing components",
    ],
    correctAnswer: 0,
    explanation:
      "React.lazy() enables code-splitting by allowing you to load components lazily, reducing the initial bundle size of your application.",
  },
  {
    id: 45,
    category: "React",
    difficulty: "hard",
    question: "What is Suspense in React?",
    options: [
      "A component for handling loading states",
      "A hook for async operations",
      "A method for error handling",
      "A performance optimization",
    ],
    correctAnswer: 0,
    explanation:
      "Suspense is a component that lets you specify a loading UI while waiting for lazy-loaded components or async operations to complete.",
  },
  {
    id: 46,
    category: "React",
    difficulty: "hard",
    question: "What are Error Boundaries in React?",
    options: [
      "Components that catch JavaScript errors in their child component tree",
      "Methods for handling network errors",
      "Tools for debugging",
      "Components for form validation",
    ],
    correctAnswer: 0,
    explanation:
      "Error Boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI.",
  },
  {
    id: 47,
    category: "React",
    difficulty: "hard",
    question:
      "Which lifecycle method is used to catch errors in class components?",
    options: [
      "componentDidCatch",
      "componentDidMount",
      "componentDidUpdate",
      "componentWillUnmount",
    ],
    correctAnswer: 0,
    explanation:
      "componentDidCatch is a lifecycle method used in Error Boundary components to catch and handle errors that occur during rendering.",
  },
  {
    id: 48,
    category: "React",
    difficulty: "hard",
    question:
      "What is the difference between componentDidCatch and getDerivedStateFromError?",
    options: [
      "No difference",
      "getDerivedStateFromError updates state, componentDidCatch handles side effects",
      "getDerivedStateFromError is deprecated",
      "componentDidCatch is for functional components",
    ],
    correctAnswer: 1,
    explanation:
      "getDerivedStateFromError is called during the render phase to update state, while componentDidCatch is called during the commit phase for side effects like logging.",
  },
  {
    id: 49,
    category: "React",
    difficulty: "hard",
    question: "What is useReducer hook and when would you use it?",
    options: [
      "For managing complex state logic",
      "For reducing bundle size",
      "For handling side effects",
      "For creating components",
    ],
    correctAnswer: 0,
    explanation:
      "useReducer is used for managing complex state logic that involves multiple sub-values or when the next state depends on the previous one.",
  },
  {
    id: 50,
    category: "React",
    difficulty: "hard",
    question: "What is the difference between useState and useReducer?",
    options: [
      "useState is for simple state, useReducer for complex state logic",
      "No difference",
      "useReducer is deprecated",
      "useState is faster",
    ],
    correctAnswer: 0,
    explanation:
      "useState is ideal for simple state values, while useReducer is better for complex state logic with multiple actions and state transitions.",
  },
  {
    id: 51,
    category: "React",
    difficulty: "hard",
    question: "What is React Context and when should you use it?",
    options: [
      "For sharing data across component tree without prop drilling",
      "For managing local component state",
      "For handling side effects",
      "For performance optimization",
    ],
    correctAnswer: 0,
    explanation:
      "React Context provides a way to pass data through the component tree without having to pass props down manually at every level.",
  },
  {
    id: 52,
    category: "React",
    difficulty: "hard",
    question: "What are the performance implications of using React Context?",
    options: [
      "All consumers re-render when context value changes",
      "No performance impact",
      "Improves performance",
      "Only affects direct children",
    ],
    correctAnswer: 0,
    explanation:
      "When a context value changes, all components consuming that context will re-render, which can cause performance issues if overused.",
  },
  {
    id: 53,
    category: "React",
    difficulty: "hard",
    question: "What is a Higher-Order Component (HOC)?",
    options: [
      "A component that renders other components",
      "A function that takes a component and returns a new component",
      "A component with higher priority",
      "A component for routing",
    ],
    correctAnswer: 1,
    explanation:
      "A Higher-Order Component is a function that takes a component and returns a new component with additional props or behavior.",
  },
  {
    id: 54,
    category: "React",
    difficulty: "hard",
    question: "What are Render Props in React?",
    options: [
      "Props used for rendering",
      "A technique for sharing code using a prop whose value is a function",
      "Props that control rendering order",
      "Props for styling components",
    ],
    correctAnswer: 1,
    explanation:
      "Render Props is a technique for sharing code between React components using a prop whose value is a function that returns React elements.",
  },
  {
    id: 55,
    category: "React",
    difficulty: "hard",
    question: "What is the difference between HOCs and Render Props?",
    options: [
      "HOCs wrap components, Render Props use function as children",
      "No difference",
      "HOCs are deprecated",
      "Render Props are faster",
    ],
    correctAnswer: 0,
    explanation:
      "HOCs wrap components to add functionality, while Render Props use a function prop to share code and give more control over rendering.",
  },
  {
    id: 56,
    category: "React",
    difficulty: "hard",
    question: "What is React.forwardRef()?",
    options: [
      "For forwarding refs to child components",
      "For forwarding props",
      "For forwarding state",
      "For forwarding events",
    ],
    correctAnswer: 0,
    explanation:
      "React.forwardRef() allows a component to forward a ref to one of its child components, enabling parent components to access child DOM elements.",
  },
  {
    id: 57,
    category: "React",
    difficulty: "hard",
    question: "What is useImperativeHandle hook?",
    options: [
      "For exposing imperative methods to parent components",
      "For handling imperative updates",
      "For managing imperative state",
      "For imperative rendering",
    ],
    correctAnswer: 0,
    explanation:
      "useImperativeHandle customizes the instance value that is exposed to parent components when using ref, allowing you to expose imperative methods.",
  },
  {
    id: 58,
    category: "React",
    difficulty: "hard",
    question: "What is React.cloneElement()?",
    options: [
      "For cloning React elements with new props",
      "For deep copying components",
      "For duplicating components",
      "For creating element copies",
    ],
    correctAnswer: 0,
    explanation:
      "React.cloneElement() clones and returns a new React element using the original element as the starting point, with new props merged in.",
  },
  {
    id: 59,
    category: "React",
    difficulty: "hard",
    question: "What is the purpose of React.Children utility?",
    options: [
      "For manipulating and transforming children props",
      "For creating child components",
      "For counting child elements",
      "For styling child components",
    ],
    correctAnswer: 0,
    explanation:
      "React.Children provides utilities for dealing with the opaque data structure of props.children, allowing you to map, count, and manipulate children.",
  },
  {
    id: 60,
    category: "React",
    difficulty: "hard",
    question: "What is React.PureComponent?",
    options: [
      "A base class that implements shallow comparison in shouldComponentUpdate",
      "A component without side effects",
      "A functional component",
      "A component for pure functions",
    ],
    correctAnswer: 0,
    explanation:
      "React.PureComponent is similar to React.Component but implements shouldComponentUpdate with a shallow prop and state comparison.",
  },
  {
    id: 61,
    category: "React",
    difficulty: "medium",
    question:
      "What is the difference between React.PureComponent and React.memo()?",
    options: [
      "PureComponent is for class components, React.memo for functional components",
      "No difference",
      "React.memo is deprecated",
      "PureComponent is faster",
    ],
    correctAnswer: 0,
    explanation:
      "React.PureComponent is used with class components to prevent unnecessary re-renders, while React.memo() serves the same purpose for functional components.",
  },
  {
    id: 62,
    category: "React",
    difficulty: "hard",
    question: "What are React DevTools?",
    options: [
      "Browser extension for debugging React applications",
      "Library for testing React",
      "Tool for building React apps",
      "React documentation",
    ],
    correctAnswer: 0,
    explanation:
      "React DevTools is a browser extension that allows developers to inspect React component hierarchies, props, state, and performance.",
  },
  {
    id: 63,
    category: "React",
    difficulty: "medium",
    question:
      "What is the significance of keys in React and what happens if they're not unique?",
    options: [
      "Non-unique keys can cause rendering issues and component state problems",
      "Nothing happens",
      "Performance improves",
      "Keys become automatically unique",
    ],
    correctAnswer: 0,
    explanation:
      "Non-unique keys can cause React to incorrectly associate component instances with their state, leading to rendering bugs and performance issues.",
  },
  {
    id: 64,
    category: "React",
    difficulty: "hard",
    question: "What is code splitting in React?",
    options: [
      "Technique to split code into smaller bundles loaded on demand",
      "Separating HTML, CSS, and JS",
      "Splitting components into files",
      "Dividing state management",
    ],
    correctAnswer: 0,
    explanation:
      "Code splitting is a technique to split your code into smaller bundles which can then be loaded on demand, reducing the initial bundle size and improving application performance.",
  },
  {
    id: 65,
    category: "React",
    difficulty: "medium",
    question: "What is the difference between createElement and JSX?",
    options: [
      "createElement is the function JSX compiles to",
      "No difference",
      "JSX is faster",
      "createElement is deprecated",
    ],
    correctAnswer: 0,
    explanation:
      "JSX is syntactic sugar that gets compiled to React.createElement() calls. JSX makes code more readable while createElement is the underlying function.",
  },
  {
    id: 66,
    category: "React",
    difficulty: "medium",
    question:
      "What happens if you don't return anything from a React component?",
    options: [
      "Component renders null",
      "Error is thrown",
      "Component crashes",
      "Empty div is rendered",
    ],
    correctAnswer: 0,
    explanation:
      "If a React component doesn't return anything (returns undefined), React treats it as returning null and renders nothing.",
  },
  {
    id: 67,
    category: "React",
    difficulty: "hard",
    question: "What is React Server Components?",
    options: [
      "Components that render on the server",
      "Components for server-side routing",
      "Components for API calls",
      "Components for database access",
    ],
    correctAnswer: 0,
    explanation:
      "React Server Components allow components to render on the server, reducing client-side JavaScript bundle size and improving performance.",
  },
  {
    id: 68,
    category: "React",
    difficulty: "medium",
    question:
      "What is the difference between React.Component and React.PureComponent?",
    options: [
      "PureComponent implements shallow comparison automatically",
      "No difference",
      "PureComponent is faster in all cases",
      "Component is deprecated",
    ],
    correctAnswer: 0,
    explanation:
      "React.PureComponent automatically implements shouldComponentUpdate with a shallow prop and state comparison, while React.Component requires manual implementation.",
  },
  {
    id: 69,
    category: "React",
    difficulty: "hard",
    question: "What is the difference between shallow and deep comparison?",
    options: [
      "Shallow compares references, deep compares all nested values",
      "No difference",
      "Deep is always faster",
      "Shallow is more accurate",
    ],
    correctAnswer: 0,
    explanation:
      "Shallow comparison only checks if references are the same, while deep comparison recursively checks all nested values for equality.",
  },
  {
    id: 70,
    category: "React",
    difficulty: "hard",
    question: "What are the limitations of React's reconciliation?",
    options: [
      "Cannot detect all changes efficiently, relies on heuristics",
      "No limitations",
      "Too slow for large applications",
      "Cannot handle complex data structures",
    ],
    correctAnswer: 0,
    explanation:
      "React's reconciliation algorithm uses heuristics and cannot detect all possible changes efficiently, which is why keys and component structure matter.",
  },
  {
    id: 71,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of displayName in React components?",
    options: [
      "For debugging and development tools",
      "For component styling",
      "For component routing",
      "For component optimization",
    ],
    correctAnswer: 0,
    explanation:
      "displayName is used by React DevTools and error messages to identify components, especially useful for HOCs and anonymous functions.",
  },
  {
    id: 72,
    category: "React",
    difficulty: "medium",
    question: "What is event delegation in React?",
    options: [
      "React attaches event listeners to the document root",
      "Events are passed to child components",
      "Events are automatically handled",
      "Events are delayed for performance",
    ],
    correctAnswer: 0,
    explanation:
      "React uses event delegation by attaching a single event listener to the document root and managing events through its synthetic event system.",
  },
  {
    id: 73,
    category: "React",
    difficulty: "hard",
    question: "What is the difference between React.createRef() and useRef()?",
    options: [
      "createRef for class components, useRef for functional components",
      "No difference",
      "useRef is deprecated",
      "createRef is faster",
    ],
    correctAnswer: 0,
    explanation:
      "React.createRef() is used in class components to create refs, while useRef() is the hook equivalent for functional components.",
  },
  {
    id: 74,
    category: "React",
    difficulty: "hard",
    question: "What happens when you update state with the same value?",
    options: [
      "React may skip the re-render",
      "Component always re-renders",
      "Error is thrown",
      "State update is ignored",
    ],
    correctAnswer: 0,
    explanation:
      "React uses Object.is comparison and may skip re-rendering if the new state value is the same as the current value.",
  },
  {
    id: 75,
    category: "React",
    difficulty: "hard",
    question: "What is time slicing in React?",
    options: [
      "Breaking work into small units to maintain responsiveness",
      "Scheduling component updates",
      "Optimizing render performance",
      "Managing component lifecycle",
    ],
    correctAnswer: 0,
    explanation:
      "Time slicing allows React to break work into small units and yield control back to the browser to maintain responsiveness during heavy computations.",
  },
  {
    id: 76,
    category: "React",
    difficulty: "hard",
    question: "What is concurrent rendering in React?",
    options: [
      "Ability to interrupt and resume rendering work",
      "Rendering multiple components simultaneously",
      "Parallel component execution",
      "Asynchronous component loading",
    ],
    correctAnswer: 0,
    explanation:
      "Concurrent rendering allows React to interrupt rendering work for high-priority updates and resume lower-priority work later.",
  },
  {
    id: 77,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.StrictMode in development?",
    options: [
      "To identify unsafe lifecycle methods and side effects",
      "To enforce coding standards",
      "To improve performance",
      "To enable debugging features",
    ],
    correctAnswer: 0,
    explanation:
      "React.StrictMode helps identify components with unsafe lifecycle methods, legacy API usage, and unexpected side effects by intentionally double-invoking functions.",
  },
  {
    id: 78,
    category: "React",
    difficulty: "hard",
    question: "What are React's built-in profiling capabilities?",
    options: [
      "Profiler API for measuring performance",
      "Automatic performance monitoring",
      "Built-in benchmarking tools",
      "Memory usage tracking",
    ],
    correctAnswer: 0,
    explanation:
      "React provides a Profiler API that can be used to measure the performance of React applications and identify performance bottlenecks.",
  },
  {
    id: 79,
    category: "React",
    difficulty: "hard",
    question:
      "What is the difference between componentDidUpdate and useEffect with dependencies?",
    options: [
      "componentDidUpdate runs after every update, useEffect can be controlled with dependencies",
      "No difference",
      "useEffect is faster",
      "componentDidUpdate is deprecated",
    ],
    correctAnswer: 0,
    explanation:
      "componentDidUpdate runs after every update in class components, while useEffect with dependencies only runs when specified dependencies change.",
  },
  {
    id: 80,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.Fragment short syntax?",
    options: [
      "<> </> is shorthand for React.Fragment",
      "Faster rendering",
      "Better performance",
      "Automatic optimization",
    ],
    correctAnswer: 0,
    explanation:
      "The <> </> syntax is a shorthand for React.Fragment, providing a cleaner way to group elements without adding extra DOM nodes.",
  },
  {
    id: 81,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental Concurrent Mode?",
    options: [
      "Feature for time slicing and suspense-based data fetching",
      "Parallel component execution",
      "Multi-threaded rendering",
      "Concurrent state updates",
    ],
    correctAnswer: 0,
    explanation:
      "Concurrent Mode is React's experimental feature that enables time slicing, suspense for data fetching, and other concurrent features for better user experience.",
  },
  {
    id: 82,
    category: "React",
    difficulty: "hard",
    question: "What is the difference between useMemo and React.memo?",
    options: [
      "useMemo memoizes values, React.memo memoizes entire components",
      "No difference",
      "useMemo is for class components",
      "React.memo is deprecated",
    ],
    correctAnswer: 0,
    explanation:
      "useMemo memoizes computed values within a component, while React.memo memoizes the entire component to prevent unnecessary re-renders.",
  },
  {
    id: 83,
    category: "React",
    difficulty: "hard",
    question: "What are React DevTools Profiler insights?",
    options: [
      "Performance analysis of component renders and commits",
      "Memory usage statistics",
      "Network request monitoring",
      "Code coverage analysis",
    ],
    correctAnswer: 0,
    explanation:
      "React DevTools Profiler provides insights into component render performance, showing render times, commit phases, and identifying performance bottlenecks.",
  },
  {
    id: 84,
    category: "React",
    difficulty: "hard",
    question: "What is the purpose of getDerivedStateFromProps?",
    options: [
      "To update state based on props changes",
      "To initialize component state",
      "To handle prop validation",
      "To optimize component performance",
    ],
    correctAnswer: 0,
    explanation:
      "getDerivedStateFromProps is called before every render and allows a component to update its state based on changes in props.",
  },
  {
    id: 85,
    category: "React",
    difficulty: "hard",
    question:
      "What is the difference between getDerivedStateFromProps and componentDidUpdate?",
    options: [
      "getDerivedStateFromProps is called before render, componentDidUpdate after",
      "No difference",
      "getDerivedStateFromProps is deprecated",
      "componentDidUpdate is faster",
    ],
    correctAnswer: 0,
    explanation:
      "getDerivedStateFromProps is called during the render phase before the component renders, while componentDidUpdate is called after the component has updated.",
  },
  {
    id: 86,
    category: "React",
    difficulty: "medium",
    question:
      "What is the difference between controlled and uncontrolled inputs?",
    options: [
      "Controlled inputs have value managed by React state",
      "Uncontrolled inputs are faster",
      "No functional difference",
      "Controlled inputs use more memory",
    ],
    correctAnswer: 0,
    explanation:
      "Controlled inputs have their value attribute controlled by React state and use onChange handlers, while uncontrolled inputs manage their own state internally.",
  },
  {
    id: 87,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of defaultValue in React forms?",
    options: [
      "Sets initial value for uncontrolled components",
      "Sets placeholder text",
      "Provides fallback value",
      "Validates input format",
    ],
    correctAnswer: 0,
    explanation:
      "defaultValue sets the initial value for uncontrolled form inputs, similar to the HTML attribute, but doesn't control the input after mounting.",
  },
  {
    id: 88,
    category: "React",
    difficulty: "medium",
    question:
      "What happens if you use both value and defaultValue on an input?",
    options: [
      "React shows a warning and value takes precedence",
      "defaultValue takes precedence",
      "Both values are merged",
      "Component crashes",
    ],
    correctAnswer: 0,
    explanation:
      "React will show a warning about the conflicting props, and the value prop will take precedence, making it a controlled component.",
  },
  {
    id: 89,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental useTransition hook?",
    options: [
      "Marks updates as non-urgent to keep UI responsive",
      "Handles component transitions",
      "Manages animation states",
      "Controls component mounting",
    ],
    correctAnswer: 0,
    explanation:
      "useTransition allows you to mark updates as transitions, which are non-urgent and can be interrupted by more urgent updates to keep the UI responsive.",
  },
  {
    id: 90,
    category: "React",
    difficulty: "hard",
    question: "What is React's useDeferredValue hook?",
    options: [
      "Defers updates to a value to prioritize more urgent updates",
      "Delays value initialization",
      "Caches expensive values",
      "Validates value types",
    ],
    correctAnswer: 0,
    explanation:
      "useDeferredValue lets you defer updating a part of the UI, allowing more urgent updates to be processed first for better user experience.",
  },
  {
    id: 91,
    category: "React",
    difficulty: "medium",
    question:
      "What is the difference between React development and production builds?",
    options: [
      "Development includes warnings and debugging tools",
      "Production is slower",
      "No significant difference",
      "Development uses different syntax",
    ],
    correctAnswer: 0,
    explanation:
      "Development builds include helpful warnings, debugging information, and development tools, while production builds are optimized and minified for performance.",
  },
  {
    id: 92,
    category: "React",
    difficulty: "medium",
    question: "What is tree shaking in React applications?",
    options: [
      "Eliminating unused code from bundles",
      "Optimizing component trees",
      "Removing unused components",
      "Cleaning up memory leaks",
    ],
    correctAnswer: 0,
    explanation:
      "Tree shaking is a dead code elimination technique that removes unused code from your final bundle, reducing the application size.",
  },
  {
    id: 93,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental startTransition API?",
    options: [
      "Marks updates as non-urgent transitions",
      "Starts component animations",
      "Initializes component transitions",
      "Begins asynchronous operations",
    ],
    correctAnswer: 0,
    explanation:
      "startTransition allows you to mark updates as non-urgent transitions, helping React prioritize more urgent updates for better user experience.",
  },
  {
    id: 94,
    category: "React",
    difficulty: "hard",
    question: "What are the benefits of React's automatic batching?",
    options: [
      "Reduces number of re-renders by batching state updates",
      "Improves memory usage",
      "Enables concurrent rendering",
      "Simplifies state management",
    ],
    correctAnswer: 0,
    explanation:
      "Automatic batching groups multiple state updates into a single re-render for better performance, even in promises, timeouts, and native event handlers.",
  },
  {
    id: 95,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.version?",
    options: [
      "Returns the current React version",
      "Sets React version requirements",
      "Validates React compatibility",
      "Updates React version",
    ],
    correctAnswer: 0,
    explanation:
      "React.version is a property that returns the version string of the React library currently being used.",
  },
  {
    id: 96,
    category: "React",
    difficulty: "medium",
    question: "What is the difference between React.createElement and JSX?",
    options: [
      "JSX is syntactic sugar for React.createElement",
      "createElement is faster",
      "JSX has more features",
      "No functional difference",
    ],
    correctAnswer: 0,
    explanation:
      "JSX is syntactic sugar that gets transpiled to React.createElement calls. They produce the same result but JSX is more readable.",
  },
  {
    id: 97,
    category: "React",
    difficulty: "hard",
    question: "What is React's reconciliation priority system?",
    options: [
      "System for prioritizing different types of updates",
      "Method for ordering component renders",
      "Algorithm for component comparison",
      "System for managing component lifecycle",
    ],
    correctAnswer: 0,
    explanation:
      "React's priority system allows different types of updates (synchronous, animation-related, etc.) to be prioritized differently for optimal user experience.",
  },
  {
    id: 98,
    category: "React",
    difficulty: "hard",
    question: "What are React's experimental Server Components benefits?",
    options: [
      "Reduced client bundle size and improved performance",
      "Better SEO optimization",
      "Simplified state management",
      "Enhanced security features",
    ],
    correctAnswer: 0,
    explanation:
      "Server Components render on the server, reducing the client-side JavaScript bundle size and improving initial page load performance.",
  },
  {
    id: 99,
    category: "React",
    difficulty: "hard",
    question:
      "What is the difference between React.Suspense and Error Boundaries?",
    options: [
      "Suspense handles loading states, Error Boundaries handle errors",
      "No difference",
      "Suspense is for class components only",
      "Error Boundaries are deprecated",
    ],
    correctAnswer: 0,
    explanation:
      "Suspense handles loading states for asynchronous operations like code splitting, while Error Boundaries catch and handle JavaScript errors in component trees.",
  },
  {
    id: 100,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.isValidElement()?",
    options: [
      "Checks if an object is a valid React element",
      "Validates component props",
      "Checks component lifecycle",
      "Validates JSX syntax",
    ],
    correctAnswer: 0,
    explanation:
      "React.isValidElement() is a utility function that verifies whether an object is a valid React element.",
  },
  {
    id: 101,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental Selective Hydration?",
    options: [
      "Hydrating components based on user interactions",
      "Partial page hydration",
      "Optimized server-side rendering",
      "Conditional component loading",
    ],
    correctAnswer: 0,
    explanation:
      "Selective Hydration allows React to prioritize hydrating components that the user is interacting with, improving perceived performance.",
  },
  {
    id: 102,
    category: "React",
    difficulty: "hard",
    question:
      "What is the difference between React.hydrate() and ReactDOM.render()?",
    options: [
      "hydrate() is for server-rendered markup, render() for client-only",
      "hydrate() is faster",
      "No difference",
      "render() is deprecated",
    ],
    correctAnswer: 0,
    explanation:
      "hydrate() is used to attach React to server-rendered HTML markup, while render() creates new DOM elements from scratch on the client.",
  },
  {
    id: 103,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.unstable_batchedUpdates()?",
    options: [
      "Manually batch state updates outside React events",
      "Optimize component performance",
      "Handle async operations",
      "Manage component lifecycle",
    ],
    correctAnswer: 0,
    explanation:
      "unstable_batchedUpdates() allows you to manually batch state updates that occur outside of React's event handlers, like in setTimeout or Promise callbacks.",
  },
  {
    id: 104,
    category: "React",
    difficulty: "hard",
    question: "What are React Hooks rules?",
    options: [
      "Only call hooks at the top level and in React functions",
      "Hooks must be imported",
      "Hooks need to be initialized",
      "Hooks require cleanup",
    ],
    correctAnswer: 0,
    explanation:
      "The Rules of Hooks state that hooks should only be called at the top level of React functions and never inside loops, conditions, or nested functions.",
  },
  {
    id: 105,
    category: "React",
    difficulty: "hard",
    question: "Why can't you call hooks conditionally?",
    options: [
      "React relies on call order to associate hooks with component state",
      "Performance reasons",
      "Memory management",
      "Error handling",
    ],
    correctAnswer: 0,
    explanation:
      "React uses the order in which hooks are called to associate each hook call with its corresponding state, so the order must be consistent across renders.",
  },
  {
    id: 106,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of useLayoutEffect?",
    options: [
      "Runs synchronously after all DOM mutations",
      "Optimizes layout calculations",
      "Handles responsive layouts",
      "Manages component positioning",
    ],
    correctAnswer: 0,
    explanation:
      "useLayoutEffect runs synchronously after all DOM mutations but before the browser paints, useful for reading layout and synchronously re-rendering.",
  },
  {
    id: 107,
    category: "React",
    difficulty: "medium",
    question: "What is the difference between useEffect and useLayoutEffect?",
    options: [
      "useEffect runs asynchronously, useLayoutEffect runs synchronously",
      "No difference",
      "useLayoutEffect is deprecated",
      "useEffect is faster",
    ],
    correctAnswer: 0,
    explanation:
      "useEffect runs asynchronously after the render is committed to the screen, while useLayoutEffect runs synchronously before the browser paints.",
  },
  {
    id: 108,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental useId hook?",
    options: [
      "Generates unique IDs for accessibility attributes",
      "Creates component identifiers",
      "Generates random numbers",
      "Manages component keys",
    ],
    correctAnswer: 0,
    explanation:
      "useId generates unique IDs that are stable across server and client rendering, primarily useful for accessibility attributes like aria-describedby.",
  },
  {
    id: 109,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental useSyncExternalStore hook?",
    options: [
      "Subscribes to external data sources",
      "Synchronizes component state",
      "Manages external API calls",
      "Handles browser storage",
    ],
    correctAnswer: 0,
    explanation:
      "useSyncExternalStore allows components to subscribe to external data sources like browser APIs, third-party state management libraries, or mutable external stores.",
  },
  {
    id: 110,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental useInsertionEffect hook?",
    options: [
      "For CSS-in-JS libraries to inject styles",
      "For inserting DOM elements",
      "For adding event listeners",
      "For component insertion",
    ],
    correctAnswer: 0,
    explanation:
      "useInsertionEffect is designed for CSS-in-JS libraries to inject styles into the DOM before the browser paints, ensuring styles are applied correctly.",
  },
  {
    id: 111,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.createContext()?",
    options: [
      "Creates a context object for passing data through component tree",
      "Creates new components",
      "Creates state containers",
      "Creates event handlers",
    ],
    correctAnswer: 0,
    explanation:
      "React.createContext() creates a Context object that can be used to pass data through the component tree without manually passing props at every level.",
  },
  {
    id: 112,
    category: "React",
    difficulty: "medium",
    question:
      "What is the difference between Context.Provider and Context.Consumer?",
    options: [
      "Provider supplies values, Consumer receives values",
      "No difference",
      "Provider is deprecated",
      "Consumer is faster",
    ],
    correctAnswer: 0,
    explanation:
      "Context.Provider is used to supply context values to its descendant components, while Context.Consumer (or useContext) is used to consume those values.",
  },
  {
    id: 113,
    category: "React",
    difficulty: "hard",
    question: "What happens if a Context.Provider is not found?",
    options: [
      "The default value from createContext is used",
      "An error is thrown",
      "undefined is returned",
      "Component crashes",
    ],
    correctAnswer: 0,
    explanation:
      "If no matching Provider is found in the component tree, React uses the default value that was passed to createContext().",
  },
  {
    id: 114,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental use() hook?",
    options: [
      "For reading promises and context in any component",
      "For using external libraries",
      "For component composition",
      "For state management",
    ],
    correctAnswer: 0,
    explanation:
      "The experimental use() hook can read promises and context values in any part of a component, including conditionally, unlike other hooks.",
  },
  {
    id: 115,
    category: "React",
    difficulty: "hard",
    question: "What is React's Cache API?",
    options: [
      "Experimental API for caching function results",
      "Browser cache management",
      "Component caching system",
      "State caching mechanism",
    ],
    correctAnswer: 0,
    explanation:
      "React's experimental Cache API provides a way to cache the results of expensive function calls across component renders and even across different components.",
  },
  {
    id: 116,
    category: "React",
    difficulty: "medium",
    question:
      "What is the significance of React's key prop in component reconciliation?",
    options: [
      "Helps React identify which items have changed, moved, or been removed",
      "Improves component performance",
      "Enables component styling",
      "Manages component state",
    ],
    correctAnswer: 0,
    explanation:
      "The key prop helps React's reconciliation algorithm efficiently determine which list items have changed, been added, or removed, enabling optimal DOM updates.",
  },
  {
    id: 117,
    category: "React",
    difficulty: "hard",
    question:
      "What are the performance implications of using array indices as keys?",
    options: [
      "Can cause rendering issues when list order changes",
      "Always improves performance",
      "No impact on performance",
      "Reduces memory usage",
    ],
    correctAnswer: 0,
    explanation:
      "Using array indices as keys can cause performance issues and bugs when the list order changes, as React may incorrectly associate component instances with their state.",
  },
  {
    id: 118,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental Activity API?",
    options: [
      "API for tracking user activity and interactions",
      "Component activity monitoring",
      "Performance activity tracking",
      "State activity management",
    ],
    correctAnswer: 0,
    explanation:
      "React's experimental Activity API is designed to track user activity and interactions to help optimize rendering and prioritize updates based on user behavior.",
  },
  {
    id: 119,
    category: "React",
    difficulty: "medium",
    question: "What is the difference between React.lazy and dynamic imports?",
    options: [
      "React.lazy is specifically for React components",
      "No difference",
      "Dynamic imports are faster",
      "React.lazy is deprecated",
    ],
    correctAnswer: 0,
    explanation:
      "React.lazy is specifically designed for lazy-loading React components and works with Suspense, while dynamic imports are a general JavaScript feature.",
  },
  {
    id: 120,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental Offscreen API?",
    options: [
      "API for rendering components without displaying them",
      "Background rendering system",
      "Hidden component management",
      "Performance optimization tool",
    ],
    correctAnswer: 0,
    explanation:
      "React's experimental Offscreen API allows components to be rendered and maintained in memory without being visible, useful for pre-rendering and caching.",
  },
  {
    id: 121,
    category: "React",
    difficulty: "hard",
    question: "What is the purpose of React.startTransition()?",
    options: [
      "Marks updates as non-urgent to maintain UI responsiveness",
      "Starts component animations",
      "Initiates state transitions",
      "Begins asynchronous operations",
    ],
    correctAnswer: 0,
    explanation:
      "React.startTransition() allows you to mark state updates as non-urgent transitions, helping React prioritize more urgent updates for better user experience.",
  },
  {
    id: 122,
    category: "React",
    difficulty: "medium",
    question:
      "What is the difference between flushSync and regular state updates?",
    options: [
      "flushSync forces synchronous updates outside of React's batching",
      "No difference",
      "flushSync is faster",
      "Regular updates are deprecated",
    ],
    correctAnswer: 0,
    explanation:
      "flushSync forces React to flush updates synchronously and immediately, bypassing React's automatic batching behavior.",
  },
  {
    id: 123,
    category: "React",
    difficulty: "hard",
    question: "What are React's scheduling priorities?",
    options: [
      "System for prioritizing different types of updates and renders",
      "Component loading order",
      "State update sequence",
      "Event handling priority",
    ],
    correctAnswer: 0,
    explanation:
      "React's scheduling priorities allow the framework to prioritize different types of updates (immediate, normal, low) to maintain smooth user interactions.",
  },
  {
    id: 124,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental Fresh API?",
    options: [
      "API for invalidating and refreshing cached data",
      "Component refresh mechanism",
      "State refresh system",
      "DOM refresh utility",
    ],
    correctAnswer: 0,
    explanation:
      "React's experimental Fresh API provides mechanisms for invalidating and refreshing cached data, particularly useful with Server Components and data fetching.",
  },
  {
    id: 125,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.version property?",
    options: [
      "Returns the current version of React being used",
      "Sets version requirements",
      "Validates React compatibility",
      "Updates React version",
    ],
    correctAnswer: 0,
    explanation:
      "React.version is a string property that contains the version number of the React library currently being used in the application.",
  },
  {
    id: 126,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental Scheduler package?",
    options: [
      "Low-level scheduling primitives for cooperative scheduling",
      "Component scheduling system",
      "Task scheduling utility",
      "Time-based scheduling",
    ],
    correctAnswer: 0,
    explanation:
      "React's Scheduler package provides low-level scheduling primitives that enable cooperative scheduling and time-slicing capabilities in React.",
  },
  {
    id: 127,
    category: "React",
    difficulty: "easy",
    question: "What does the 'children' prop represent in React?",
    options: [
      "Component's internal data",
      "Content passed between JSX tags",
      "Array of child components",
      "Event handlers",
    ],
    correctAnswer: 1,
    explanation:
      "The children prop contains the content passed between a component's opening and closing JSX tags, allowing components to act as containers.",
  },
  {
    id: 128,
    category: "React",
    difficulty: "medium",
    question:
      "Which hook helps you avoid recreating expensive objects on every render?",
    options: ["useCallback", "useMemo", "useRef", "useState"],
    correctAnswer: 1,
    explanation:
      "useMemo caches the result of a computation and only recalculates when dependencies change, preventing expensive recreations.",
  },
  {
    id: 129,
    category: "React",
    difficulty: "easy",
    question:
      "What is the correct way to update state based on previous state?",
    options: [
      "setState(prevState => newValue)",
      "setState(newValue)",
      "setState = newValue",
      "state = newValue",
    ],
    correctAnswer: 0,
    explanation:
      "Using the updater function form setState(prevState => ...) ensures you always work with the latest state and avoid race conditions.",
  },
  {
    id: 130,
    category: "React",
    difficulty: "medium",
    question: "What will happen if you forget to add a key prop to list items?",
    options: [
      "React will crash",
      "React will show a warning and use array indices",
      "Nothing",
      "Items won't render",
    ],
    correctAnswer: 1,
    explanation:
      "React will show a warning in development and fall back to using array indices as keys, which can lead to performance and bug issues.",
  },
  {
    id: 131,
    category: "React",
    difficulty: "hard",
    question: "What is the primary benefit of React Server Components?",
    options: [
      "Better SEO",
      "Zero JavaScript bundle for server-rendered components",
      "Faster client-side routing",
      "Automatic code splitting",
    ],
    correctAnswer: 1,
    explanation:
      "Server Components render on the server and send only HTML to the client, eliminating the need to ship their JavaScript to the browser.",
  },
  {
    id: 132,
    category: "React",
    difficulty: "medium",
    question:
      "Which method is used to perform side effects after rendering in class components?",
    options: [
      "componentWillMount",
      "componentDidMount",
      "shouldComponentUpdate",
      "render",
    ],
    correctAnswer: 1,
    explanation:
      "componentDidMount is called after the component has been rendered to the DOM, making it the right place for side effects like API calls.",
  },
  {
    id: 133,
    category: "React",
    difficulty: "easy",
    question: "What is the purpose of the ReactDOM.createRoot API?",
    options: [
      "Create new React elements",
      "Create a root for React 18 concurrent features",
      "Create component instances",
      "Create DOM nodes",
    ],
    correctAnswer: 1,
    explanation:
      "createRoot is the new root API introduced in React 18 that enables concurrent features like automatic batching and Suspense.",
  },
  {
    id: 134,
    category: "React",
    difficulty: "hard",
    question: "What does the useDeferredValue hook return?",
    options: [
      "A memoized value",
      "A debounced value",
      "A deferred version of the value that may lag behind",
      "A throttled value",
    ],
    correctAnswer: 2,
    explanation:
      "useDeferredValue returns a deferred version of the input value that can lag behind, allowing urgent updates to be processed first.",
  },
  {
    id: 135,
    category: "React",
    difficulty: "medium",
    question:
      "How do you access the previous value of props or state in functional components?",
    options: ["useRef", "useState", "useEffect with ref", "usePrevious hook"],
    correctAnswer: 2,
    explanation:
      "You can store the previous value in a ref and update it in useEffect: const prevValueRef = useRef(); useEffect(() => { prevValueRef.current = value; });",
  },
  {
    id: 136,
    category: "React",
    difficulty: "easy",
    question:
      "What is the purpose of the 'default' in export default Component?",
    options: [
      "Indicates the main export",
      "Sets default props",
      "Provides fallback rendering",
      "Enables TypeScript support",
    ],
    correctAnswer: 0,
    explanation:
      "export default specifies the main export from a module that will be imported when no specific name is used in the import statement.",
  },
  {
    id: 137,
    category: "React",
    difficulty: "medium",
    question: "What is the difference between useRef and createRef?",
    options: [
      "useRef is for functional components, createRef for class components",
      "No difference",
      "useRef is faster",
      "createRef is deprecated",
    ],
    correctAnswer: 0,
    explanation:
      "useRef is a hook used in functional components, while createRef is used in class components to create refs.",
  },
  {
    id: 138,
    category: "React",
    difficulty: "hard",
    question: "What is the purpose of React's unstable_flushSync?",
    options: [
      "Force synchronous React updates",
      "Flush the DOM",
      "Synchronize state",
      "Update props",
    ],
    correctAnswer: 0,
    explanation:
      "unstable_flushSync forces React to flush updates synchronously, bypassing concurrent features and automatic batching.",
  },
  {
    id: 139,
    category: "React",
    difficulty: "medium",
    question:
      "Which hook would you use to optimize a callback that is passed to child components?",
    options: ["useMemo", "useCallback", "useRef", "useState"],
    correctAnswer: 1,
    explanation:
      "useCallback memoizes a callback function, preventing child components from re-rendering when the callback reference hasn't changed.",
  },
  {
    id: 140,
    category: "React",
    difficulty: "easy",
    question: "What is the correct way to conditionally render a component?",
    options: [
      "{condition && <Component />}",
      "{condition ? <Component />}",
      "{if(condition) <Component />}",
      "All of the above",
    ],
    correctAnswer: 0,
    explanation:
      "The most common and recommended way is using the logical && operator: {condition && <Component />}.",
  },
  {
    id: 141,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of the cleanup function in useEffect?",
    options: [
      "Remove the component",
      "Clean up subscriptions, timers, or event listeners",
      "Reset state",
      "Unmount the component",
    ],
    correctAnswer: 1,
    explanation:
      "The cleanup function returned from useEffect is called before the component unmounts or before the effect runs again to clean up side effects.",
  },
  {
    id: 142,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental useEvent hook proposal?",
    options: [
      "Event handling hook",
      "Stable event callback that doesn't need dependencies",
      "Synthetic event wrapper",
      "Event delegation helper",
    ],
    correctAnswer: 1,
    explanation:
      "The proposed useEvent would provide an event callback that never changes identity and doesn't need to be listed in useEffect dependencies.",
  },
  {
    id: 143,
    category: "React",
    difficulty: "medium",
    question:
      "How do you prevent a function from being recreated on every render?",
    options: [
      "Define it outside the component",
      "Use useCallback",
      "Use useMemo",
      "Both A and B",
    ],
    correctAnswer: 3,
    explanation:
      "You can either define the function outside the component (if it doesn't need props/state) or use useCallback to memoize it.",
  },
  {
    id: 144,
    category: "React",
    difficulty: "easy",
    question: "What is the purpose of the React.StrictMode component?",
    options: [
      "Enforce coding standards",
      "Highlight potential problems in development",
      "Improve performance",
      "Enable strict type checking",
    ],
    correctAnswer: 1,
    explanation:
      "StrictMode helps identify unsafe lifecycle methods, legacy API usage, and unexpected side effects by intentionally double-invoking functions in development.",
  },
  {
    id: 145,
    category: "React",
    difficulty: "hard",
    question: "What is the difference between useMemo and useCallback?",
    options: [
      "useMemo returns a value, useCallback returns a function",
      "No difference",
      "useMemo is for primitives only",
      "useCallback is deprecated",
    ],
    correctAnswer: 0,
    explanation:
      "useMemo memoizes a computed value, while useCallback memoizes a function instance to prevent unnecessary re-creations.",
  },
  {
    id: 146,
    category: "React",
    difficulty: "medium",
    question: "What is the correct way to handle forms in React?",
    options: [
      "Controlled components with state",
      "Uncontrolled components with refs",
      "Both are valid",
      "Only controlled components",
    ],
    correctAnswer: 2,
    explanation:
      "Both controlled components (using state) and uncontrolled components (using refs) are valid approaches for handling forms in React.",
  },
  {
    id: 147,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental Server Components architecture?",
    options: [
      "Components that run on server and client",
      "Zero-bundle-size server-rendered components",
      "Components for server-side routing",
      "Database-connected components",
    ],
    correctAnswer: 1,
    explanation:
      "Server Components render on the server and send only HTML to the client, with zero JavaScript bundle size for those components.",
  },
  {
    id: 148,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of the second argument in useEffect?",
    options: [
      "Cleanup function",
      "Dependency array",
      "Effect name",
      "Delay time",
    ],
    correctAnswer: 1,
    explanation:
      "The second argument is the dependency array that tells React when to re-run the effect based on value changes.",
  },
  {
    id: 149,
    category: "React",
    difficulty: "easy",
    question: "What is the children prop in React?",
    options: [
      "A special prop for child components",
      "Content between component tags",
      "Array of child elements",
      "All of the above",
    ],
    correctAnswer: 3,
    explanation:
      "The children prop represents the content between component opening and closing tags, which can be elements, text, or other components.",
  },
  {
    id: 150,
    category: "React",
    difficulty: "medium",
    question: "What is the difference between props and state?",
    options: [
      "Props are passed from parent, state is managed internally",
      "Props are mutable, state is immutable",
      "No difference",
      "Props are faster",
    ],
    correctAnswer: 0,
    explanation:
      "Props are read-only data passed from parent components, while state is managed within the component and can be changed.",
  },
  {
    id: 151,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental use() hook?",
    options: [
      "Universal hook for promises and context",
      "Hook for external libraries",
      "Replacement for all hooks",
      "Hook for component composition",
    ],
    correctAnswer: 0,
    explanation:
      "The experimental use() hook can read promises and context values, and unlike other hooks, can be called conditionally.",
  },
  {
    id: 152,
    category: "React",
    difficulty: "medium",
    question: "How do you share state between sibling components?",
    options: [
      "Lift state up to common parent",
      "Use context",
      "Use Redux",
      "All of the above",
    ],
    correctAnswer: 3,
    explanation:
      "State can be shared by lifting it up to a common parent, using Context API, or using state management libraries like Redux.",
  },
  {
    id: 153,
    category: "React",
    difficulty: "easy",
    question: "What is the purpose of ReactDOM.render?",
    options: [
      "Render React elements to the DOM",
      "Create React components",
      "Update component state",
      "Handle events",
    ],
    correctAnswer: 0,
    explanation:
      "ReactDOM.render renders a React element into the DOM in the supplied container and returns a reference to the component.",
  },
  {
    id: 154,
    category: "React",
    difficulty: "medium",
    question: "What is the difference between useEffect and useLayoutEffect?",
    options: [
      "Timing of when they run relative to browser paint",
      "useLayoutEffect is for DOM manipulation",
      "useEffect is for async operations",
      "All of the above",
    ],
    correctAnswer: 3,
    explanation:
      "useLayoutEffect runs synchronously after DOM mutations but before browser paint, while useEffect runs asynchronously after paint.",
  },
  {
    id: 155,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental Offscreen API?",
    options: [
      "Render components invisibly",
      "Hide components from DOM",
      "Background component processing",
      "Component virtualization",
    ],
    correctAnswer: 0,
    explanation:
      "Offscreen API allows rendering and maintaining components in memory without displaying them, useful for pre-rendering and caching.",
  },
  {
    id: 156,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.PureComponent?",
    options: [
      "Component with shallow comparison optimization",
      "Component without side effects",
      "Functional component",
      "Component for pure functions",
    ],
    correctAnswer: 0,
    explanation:
      "React.PureComponent implements shouldComponentUpdate with shallow prop and state comparison to prevent unnecessary re-renders.",
  },
  {
    id: 157,
    category: "React",
    difficulty: "easy",
    question:
      "What is the correct way to bind event handlers in class components?",
    options: [
      "In constructor",
      "Arrow functions in render",
      "Class fields with arrow functions",
      "All of the above",
    ],
    correctAnswer: 3,
    explanation:
      "Event handlers can be bound in the constructor, using arrow functions in render, or using class field syntax with arrow functions.",
  },
  {
    id: 158,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental Cache API?",
    options: [
      "API for caching function results across renders",
      "Browser cache management",
      "Component caching",
      "State persistence",
    ],
    correctAnswer: 0,
    explanation:
      "The experimental Cache API provides a way to cache expensive function results across component renders and components.",
  },
  {
    id: 159,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.memo()?",
    options: [
      "Memoize component to prevent unnecessary re-renders",
      "Cache component state",
      "Optimize component memory usage",
      "Speed up component creation",
    ],
    correctAnswer: 0,
    explanation:
      "React.memo is a higher-order component that memoizes a component and only re-renders when props change (with shallow comparison).",
  },
  {
    id: 160,
    category: "React",
    difficulty: "easy",
    question:
      "What is the difference between a controlled and uncontrolled component?",
    options: [
      "Controlled components use React state, uncontrolled use refs",
      "Controlled components are faster",
      "Uncontrolled components are deprecated",
      "No difference",
    ],
    correctAnswer: 0,
    explanation:
      "Controlled components have their value controlled by React state, while uncontrolled components manage their own state using refs.",
  },
  {
    id: 161,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental useTransition hook?",
    options: [
      "Mark updates as non-urgent transitions",
      "Handle component transitions",
      "Manage animation states",
      "Control component mounting",
    ],
    correctAnswer: 0,
    explanation:
      "useTransition allows marking state updates as transitions that can be interrupted by more urgent updates, keeping UI responsive.",
  },
  {
    id: 162,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of the dependency array in useEffect?",
    options: [
      "Specify when effect should re-run",
      "Pass data to effect",
      "Clean up effect",
      "Handle errors",
    ],
    correctAnswer: 0,
    explanation:
      "The dependency array tells React which values the effect depends on, determining when the effect should be re-executed.",
  },
  {
    id: 163,
    category: "React",
    difficulty: "easy",
    question: "What is the children prop?",
    options: [
      "Special React property",
      "Content between component tags",
      "Array of components",
      "Child component instances",
    ],
    correctAnswer: 1,
    explanation:
      "The children prop contains whatever is passed between the opening and closing tags of a component.",
  },
  {
    id: 164,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental useDeferredValue hook?",
    options: [
      "Defer value updates for better responsiveness",
      "Delay value initialization",
      "Cache expensive values",
      "Validate value types",
    ],
    correctAnswer: 0,
    explanation:
      "useDeferredValue returns a deferred version of the value that can lag behind, allowing urgent updates to be processed first.",
  },
  {
    id: 165,
    category: "React",
    difficulty: "medium",
    question: "What is the difference between useRef and createRef?",
    options: [
      "useRef is hook for functional components, createRef for class components",
      "No difference",
      "useRef is faster",
      "createRef is deprecated",
    ],
    correctAnswer: 0,
    explanation:
      "useRef is a hook used in functional components, while createRef is used in class components to create refs.",
  },
  {
    id: 166,
    category: "React",
    difficulty: "easy",
    question: "What is the purpose of keys in React lists?",
    options: [
      "Help React identify changed items",
      "Style list items",
      "Sort items",
      "Add event listeners",
    ],
    correctAnswer: 0,
    explanation:
      "Keys help React identify which items have changed, been added, or removed, enabling efficient list updates.",
  },
  {
    id: 167,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental useId hook?",
    options: [
      "Generate unique IDs for accessibility",
      "Create component identifiers",
      "Generate random numbers",
      "Manage component keys",
    ],
    correctAnswer: 0,
    explanation:
      "useId generates unique IDs that are stable across server and client rendering, useful for accessibility attributes.",
  },
  {
    id: 168,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of useCallback hook?",
    options: [
      "Memoize function instances",
      "Manage state",
      "Handle effects",
      "Create components",
    ],
    correctAnswer: 0,
    explanation:
      "useCallback returns a memoized callback that only changes if dependencies change, preventing unnecessary re-renders.",
  },
  {
    id: 169,
    category: "React",
    difficulty: "easy",
    question: "What is the correct way to update state in React?",
    options: [
      "Using setState or state setter function",
      "Direct assignment",
      "Mutating state object",
      "Using forceUpdate",
    ],
    correctAnswer: 0,
    explanation:
      "State should only be updated using setState (class components) or the setter function from useState (functional components).",
  },
  {
    id: 170,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental useSyncExternalStore hook?",
    options: [
      "Subscribe to external data sources",
      "Synchronize component state",
      "Manage external APIs",
      "Handle browser storage",
    ],
    correctAnswer: 0,
    explanation:
      "useSyncExternalStore allows components to subscribe to external mutable data sources and work with concurrent features.",
  },
  {
    id: 171,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.StrictMode?",
    options: [
      "Highlight potential problems in development",
      "Enforce coding standards",
      "Improve performance",
      "Enable strict types",
    ],
    correctAnswer: 0,
    explanation:
      "StrictMode helps identify unsafe lifecycle methods, legacy APIs, and side effects by intentionally double-invoking functions in development.",
  },
  {
    id: 172,
    category: "React",
    difficulty: "easy",
    question: "What is the difference between props and state?",
    options: [
      "Props are passed from parent, state is internal",
      "Props are mutable, state is immutable",
      "No difference",
      "Props are faster",
    ],
    correctAnswer: 0,
    explanation:
      "Props are read-only data passed from parent components, while state is managed within the component and can be changed.",
  },
  {
    id: 173,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental useInsertionEffect hook?",
    options: [
      "For CSS-in-JS libraries to inject styles",
      "For inserting DOM elements",
      "For adding event listeners",
      "For component insertion",
    ],
    correctAnswer: 0,
    explanation:
      "useInsertionEffect is designed for CSS-in-JS libraries to inject styles before the browser paints, ensuring correct styling.",
  },
  {
    id: 174,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of useMemo hook?",
    options: [
      "Memoize expensive calculations",
      "Manage state",
      "Handle effects",
      "Create refs",
    ],
    correctAnswer: 0,
    explanation:
      "useMemo caches the result of expensive computations and only recalculates when dependencies change.",
  },
  {
    id: 175,
    category: "React",
    difficulty: "easy",
    question: "What is JSX in React?",
    options: [
      "Syntax extension for JavaScript",
      "JavaScript library",
      "CSS framework",
      "Database query language",
    ],
    correctAnswer: 0,
    explanation:
      "JSX is a syntax extension that allows you to write HTML-like code in JavaScript, which gets compiled to React.createElement calls.",
  },
  {
    id: 176,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental Offscreen API?",
    options: [
      "Render components invisibly",
      "Hide components from DOM",
      "Background rendering",
      "Component virtualization",
    ],
    correctAnswer: 0,
    explanation:
      "Offscreen API allows rendering and maintaining components in memory without displaying them, useful for pre-rendering.",
  },
  {
    id: 177,
    category: "React",
    difficulty: "medium",
    question: "What is the difference between useEffect and useLayoutEffect?",
    options: [
      "Timing relative to browser paint",
      "useLayoutEffect is for DOM manipulation",
      "useEffect is for async operations",
      "All of the above",
    ],
    correctAnswer: 3,
    explanation:
      "useLayoutEffect runs synchronously after DOM mutations but before paint, while useEffect runs asynchronously after paint.",
  },
  {
    id: 178,
    category: "React",
    difficulty: "easy",
    question: "What is a React component?",
    options: [
      "Reusable piece of UI",
      "HTML element",
      "CSS class",
      "JavaScript function only",
    ],
    correctAnswer: 0,
    explanation:
      "A React component is a reusable piece of UI that can be either a function or class, returning React elements to render.",
  },
  {
    id: 179,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental Cache API?",
    options: [
      "API for caching function results",
      "Browser cache management",
      "Component caching",
      "State persistence",
    ],
    correctAnswer: 0,
    explanation:
      "The experimental Cache API provides a way to cache expensive function results across component renders and components.",
  },
  {
    id: 180,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.memo()?",
    options: [
      "Prevent unnecessary re-renders",
      "Cache component state",
      "Optimize memory",
      "Speed up creation",
    ],
    correctAnswer: 0,
    explanation:
      "React.memo memoizes a component and only re-renders when props change (using shallow comparison), preventing unnecessary re-renders.",
  },
  {
    id: 181,
    category: "React",
    difficulty: "easy",
    question: "What is the virtual DOM?",
    options: [
      "JavaScript representation of real DOM",
      "Copy of real DOM in memory",
      "Faster version of DOM",
      "Debugging tool",
    ],
    correctAnswer: 0,
    explanation:
      "The virtual DOM is a JavaScript representation of the real DOM that React uses to optimize updates by comparing changes.",
  },
  {
    id: 182,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental Activity API?",
    options: [
      "Track user activity and interactions",
      "Component activity monitoring",
      "Performance tracking",
      "State activity management",
    ],
    correctAnswer: 0,
    explanation:
      "The experimental Activity API tracks user activity and interactions to help optimize rendering and prioritize updates.",
  },
  {
    id: 183,
    category: "React",
    difficulty: "medium",
    question: "What is prop drilling?",
    options: [
      "Passing props through multiple component layers",
      "Creating holes in components",
      "Validating props",
      "Optimizing props",
    ],
    correctAnswer: 0,
    explanation:
      "Prop drilling refers to passing props through multiple layers of components to reach deeply nested child components.",
  },
  {
    id: 184,
    category: "React",
    difficulty: "easy",
    question: "What is the purpose of useState hook?",
    options: [
      "Manage state in functional components",
      "Handle side effects",
      "Create refs",
      "Manage context",
    ],
    correctAnswer: 0,
    explanation:
      "useState is a hook that allows you to add state to functional components, returning the current state and a setter function.",
  },
  {
    id: 185,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental Selective Hydration?",
    options: [
      "Prioritize hydrating interactive components",
      "Partial page hydration",
      "Optimized SSR",
      "Conditional loading",
    ],
    correctAnswer: 0,
    explanation:
      "Selective Hydration allows React to prioritize hydrating components that users are interacting with for better perceived performance.",
  },
  {
    id: 186,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of useContext hook?",
    options: [
      "Consume context values",
      "Create context",
      "Manage local state",
      "Handle effects",
    ],
    correctAnswer: 0,
    explanation:
      "useContext is a hook that allows you to consume context values in functional components without using Context.Consumer.",
  },
  {
    id: 187,
    category: "React",
    difficulty: "easy",
    question: "What is the difference between functional and class components?",
    options: [
      "Functional use functions, class use ES6 classes",
      "No difference",
      "Functional are faster",
      "Class components are deprecated",
    ],
    correctAnswer: 0,
    explanation:
      "Functional components are JavaScript functions that return JSX, while class components are ES6 classes extending React.Component.",
  },
  {
    id: 188,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental Fresh API?",
    options: [
      "Invalidate and refresh cached data",
      "Component refresh",
      "State refresh",
      "DOM refresh",
    ],
    correctAnswer: 0,
    explanation:
      "The experimental Fresh API provides mechanisms for invalidating and refreshing cached data, particularly with Server Components.",
  },
  {
    id: 189,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.createRef?",
    options: [
      "Create refs in class components",
      "Create refs in functional components",
      "Create state",
      "Create context",
    ],
    correctAnswer: 0,
    explanation:
      "React.createRef is used in class components to create refs, while useRef is the hook equivalent for functional components.",
  },
  {
    id: 190,
    category: "React",
    difficulty: "easy",
    question: "What is the purpose of keys in React lists?",
    options: [
      "Help React identify items",
      "Style items",
      "Sort items",
      "Add events",
    ],
    correctAnswer: 0,
    explanation:
      "Keys help React identify which items have changed, been added, or removed, enabling efficient list updates and preventing bugs.",
  },
  {
    id: 191,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental use() hook?",
    options: [
      "Read promises and context conditionally",
      "Use external libraries",
      "Replace all hooks",
      "Component composition",
    ],
    correctAnswer: 0,
    explanation:
      "The experimental use() hook can read promises and context values and unlike other hooks, can be called conditionally.",
  },
  {
    id: 192,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.forwardRef?",
    options: [
      "Forward refs to child components",
      "Forward props",
      "Forward state",
      "Forward events",
    ],
    correctAnswer: 0,
    explanation:
      "React.forwardRef creates a component that can forward refs to its child components, allowing parent components to access child DOM elements.",
  },
  {
    id: 193,
    category: "React",
    difficulty: "easy",
    question: "What is the correct way to create a React app?",
    options: [
      "npx create-react-app my-app",
      "npm install react",
      "react new app",
      "npm create react",
    ],
    correctAnswer: 0,
    explanation:
      "The standard way to create a new React app is using Create React App with 'npx create-react-app my-app'.",
  },
  {
    id: 194,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental Scheduler package?",
    options: [
      "Low-level scheduling primitives",
      "Component scheduling",
      "Task scheduling",
      "Time-based scheduling",
    ],
    correctAnswer: 0,
    explanation:
      "The Scheduler package provides low-level scheduling primitives that enable cooperative scheduling and time-slicing in React.",
  },
  {
    id: 195,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of useReducer hook?",
    options: [
      "Manage complex state logic",
      "Reduce bundle size",
      "Handle side effects",
      "Create components",
    ],
    correctAnswer: 0,
    explanation:
      "useReducer is used for managing complex state logic that involves multiple sub-values or when the next state depends on the previous one.",
  },
  {
    id: 196,
    category: "React",
    difficulty: "easy",
    question: "What is the difference between state and props?",
    options: [
      "State is internal, props are external",
      "State is external, props are internal",
      "No difference",
      "Props are mutable",
    ],
    correctAnswer: 0,
    explanation:
      "State is managed within the component and can be changed, while props are passed from parent components and are read-only.",
  },
  {
    id: 197,
    category: "React",
    difficulty: "hard",
    question: "What is React's reconciliation priority system?",
    options: [
      "Prioritize different types of updates",
      "Order component renders",
      "Component comparison",
      "Manage lifecycle",
    ],
    correctAnswer: 0,
    explanation:
      "React's priority system allows different types of updates to be prioritized differently for optimal user experience.",
  },
  {
    id: 198,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.Fragment?",
    options: [
      "Group elements without extra DOM nodes",
      "Handle errors",
      "Manage state",
      "Route components",
    ],
    correctAnswer: 0,
    explanation:
      "React.Fragment allows you to group multiple elements without adding extra DOM nodes to the rendered output.",
  },
  {
    id: 199,
    category: "React",
    difficulty: "easy",
    question: "What is the purpose of useEffect hook?",
    options: [
      "Handle side effects",
      "Manage state",
      "Create components",
      "Style components",
    ],
    correctAnswer: 0,
    explanation:
      "useEffect is used for handling side effects in functional components, such as API calls, subscriptions, or DOM manipulation.",
  },
  {
    id: 200,
    category: "React",
    difficulty: "hard",
    question: "What are React's scheduling priorities?",
    options: [
      "System for prioritizing updates",
      "Component loading order",
      "State update sequence",
      "Event handling priority",
    ],
    correctAnswer: 0,
    explanation:
      "React's scheduling priorities allow the framework to prioritize different types of updates for optimal user experience.",
  },
  {
    id: 201,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.lazy()?",
    options: [
      "Lazy load components",
      "Delay state updates",
      "Slow rendering",
      "Test components",
    ],
    correctAnswer: 0,
    explanation:
      "React.lazy() enables code-splitting by allowing you to load components lazily, reducing the initial bundle size.",
  },
  {
    id: 202,
    category: "React",
    difficulty: "easy",
    question:
      "What is the difference between controlled and uncontrolled components?",
    options: [
      "Controlled use React state, uncontrolled use DOM state",
      "Controlled are faster",
      "Uncontrolled are deprecated",
      "No difference",
    ],
    correctAnswer: 0,
    explanation:
      "Controlled components have their value controlled by React state, while uncontrolled components maintain their own state in the DOM.",
  },
  {
    id: 203,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental startTransition API?",
    options: [
      "Mark updates as non-urgent transitions",
      "Start animations",
      "Initialize transitions",
      "Begin async operations",
    ],
    correctAnswer: 0,
    explanation:
      "startTransition allows marking state updates as non-urgent transitions, helping React prioritize more urgent updates.",
  },
  {
    id: 204,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of Suspense in React?",
    options: [
      "Specify loading UI while waiting",
      "Handle async operations",
      "Catch errors",
      "Optimize performance",
    ],
    correctAnswer: 0,
    explanation:
      "Suspense lets you specify a loading UI while waiting for lazy-loaded components or async operations to complete.",
  },
  {
    id: 205,
    category: "React",
    difficulty: "easy",
    question: "What is the purpose of ReactDOM.createPortal?",
    options: [
      "Render children outside parent DOM hierarchy",
      "Create DOM elements",
      "Handle routing",
      "Manage state",
    ],
    correctAnswer: 0,
    explanation:
      "ReactDOM.createPortal allows rendering children into a DOM node that exists outside the DOM hierarchy of the parent component.",
  },
  {
    id: 206,
    category: "React",
    difficulty: "hard",
    question: "What is the difference between flushSync and regular updates?",
    options: [
      "flushSync forces synchronous updates",
      "flushSync is faster",
      "No difference",
      "Regular updates are deprecated",
    ],
    correctAnswer: 0,
    explanation:
      "flushSync forces React to flush updates synchronously, bypassing automatic batching and concurrent features.",
  },
  {
    id: 207,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of Error Boundaries?",
    options: [
      "Catch JavaScript errors in component tree",
      "Handle network errors",
      "Validate props",
      "Catch syntax errors",
    ],
    correctAnswer: 0,
    explanation:
      "Error Boundaries are React components that catch JavaScript errors anywhere in their child component tree and display fallback UI.",
  },
  {
    id: 208,
    category: "React",
    difficulty: "easy",
    question: "What is the correct syntax for importing a default export?",
    options: [
      "import Component from './Component'",
      "import { Component } from './Component'",
      "import * as Component from './Component'",
      "import './Component'",
    ],
    correctAnswer: 0,
    explanation:
      "Default exports are imported without curly braces: import Component from './Component'",
  },
  {
    id: 209,
    category: "React",
    difficulty: "hard",
    question: "What is React's automatic batching?",
    options: [
      "Groups multiple state updates into single re-render",
      "Improves memory usage",
      "Enables concurrent rendering",
      "Simplifies state management",
    ],
    correctAnswer: 0,
    explanation:
      "Automatic batching groups multiple state updates into a single re-render for better performance, even in promises and timeouts.",
  },
  {
    id: 210,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of useImperativeHandle hook?",
    options: [
      "Customize instance value exposed to parent",
      "Handle imperative updates",
      "Manage imperative state",
      "Imperative rendering",
    ],
    correctAnswer: 0,
    explanation:
      "useImperativeHandle customizes the instance value that is exposed to parent components when using ref, allowing you to expose specific methods.",
  },
  {
    id: 211,
    category: "React",
    difficulty: "easy",
    question: "What is the difference between export and export default?",
    options: [
      "export default has one per file, export can have multiple",
      "No difference",
      "export is deprecated",
      "export default is faster",
    ],
    correctAnswer: 0,
    explanation:
      "A module can have only one default export but multiple named exports, and they are imported differently.",
  },
  {
    id: 212,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental concurrent rendering?",
    options: [
      "Ability to interrupt and resume rendering",
      "Render multiple components simultaneously",
      "Parallel execution",
      "Async loading",
    ],
    correctAnswer: 0,
    explanation:
      "Concurrent rendering allows React to interrupt rendering work for high-priority updates and resume lower-priority work later.",
  },
  {
    id: 213,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.cloneElement?",
    options: [
      "Clone element with new props",
      "Deep copy components",
      "Duplicate components",
      "Create element copies",
    ],
    correctAnswer: 0,
    explanation:
      "React.cloneElement clones and returns a new React element using the original element as the starting point with new props merged in.",
  },
  {
    id: 214,
    category: "React",
    difficulty: "easy",
    question: "What is the purpose of the className attribute in React?",
    options: [
      "Apply CSS classes",
      "Set component name",
      "Define JavaScript class",
      "Create React component",
    ],
    correctAnswer: 0,
    explanation:
      "className is used to apply CSS classes to JSX elements (equivalent to the class attribute in HTML).",
  },
  {
    id: 215,
    category: "React",
    difficulty: "hard",
    question: "What is React's time slicing?",
    options: [
      "Break work into small units for responsiveness",
      "Schedule updates",
      "Optimize rendering",
      "Manage lifecycle",
    ],
    correctAnswer: 0,
    explanation:
      "Time slicing breaks work into small units and yields control back to the browser to maintain responsiveness during heavy computations.",
  },
  {
    id: 216,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.Children utilities?",
    options: [
      "Manipulate and transform children",
      "Create child components",
      "Count children",
      "Style children",
    ],
    correctAnswer: 0,
    explanation:
      "React.Children provides utilities for dealing with the opaque data structure of props.children, allowing manipulation and transformation.",
  },
  {
    id: 217,
    category: "React",
    difficulty: "easy",
    question: "What is the correct way to conditionally apply a className?",
    options: [
      "Using template literals or conditional operators",
      "Using if statements in JSX",
      "Using switch statements",
      "Class names cannot be conditional",
    ],
    correctAnswer: 0,
    explanation:
      "Class names can be conditionally applied using template literals: className={`base-class ${condition ? 'active' : ''}`} or conditional operators.",
  },
  {
    id: 218,
    category: "React",
    difficulty: "hard",
    question: "What are the limitations of React's reconciliation algorithm?",
    options: [
      "Cannot detect all changes efficiently",
      "No limitations",
      "Too slow for large apps",
      "Cannot handle complex data",
    ],
    correctAnswer: 0,
    explanation:
      "React's reconciliation uses heuristics and cannot detect all possible changes efficiently, which is why keys and component structure matter.",
  },
  {
    id: 219,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of displayName in React components?",
    options: [
      "Debugging and development tools",
      "Component styling",
      "Component routing",
      "Component optimization",
    ],
    correctAnswer: 0,
    explanation:
      "displayName is used by React DevTools and error messages to identify components, especially useful for HOCs and anonymous functions.",
  },
  {
    id: 220,
    category: "React",
    difficulty: "easy",
    question: "What is the correct way to handle form submission in React?",
    options: [
      "Using onSubmit event handler",
      "Using onClick on submit button",
      "Using form action",
      "Using JavaScript submit()",
    ],
    correctAnswer: 0,
    explanation:
      "Form submission should be handled using the onSubmit event on the form element, which captures both button clicks and Enter key presses.",
  },
  {
    id: 221,
    category: "React",
    difficulty: "hard",
    question:
      "What is the difference between shallow and deep comparison in React?",
    options: [
      "Shallow compares references, deep compares values",
      "No difference",
      "Deep is always faster",
      "Shallow is more accurate",
    ],
    correctAnswer: 0,
    explanation:
      "Shallow comparison only checks if references are the same, while deep comparison recursively checks all nested values for equality.",
  },
  {
    id: 222,
    category: "React",
    difficulty: "medium",
    question: "What is event delegation in React?",
    options: [
      "Single event listener on document root",
      "Events passed to children",
      "Events automatically handled",
      "Events delayed for performance",
    ],
    correctAnswer: 0,
    explanation:
      "React uses event delegation by attaching a single event listener to the document root and managing events through its synthetic event system.",
  },
  {
    id: 223,
    category: "React",
    difficulty: "easy",
    question: "What is the purpose of the htmlFor attribute in React?",
    options: [
      "Associate labels with form elements",
      "Set HTML format",
      "Define for loops",
      "Create HTML templates",
    ],
    correctAnswer: 0,
    explanation:
      "htmlFor is the React equivalent of the for attribute in HTML, used to associate label elements with form inputs.",
  },
  {
    id: 224,
    category: "React",
    difficulty: "hard",
    question: "What happens when you update state with the same value?",
    options: [
      "React may skip re-render",
      "Component always re-renders",
      "Error is thrown",
      "State update is ignored",
    ],
    correctAnswer: 0,
    explanation:
      "React uses Object.is comparison and may skip re-rendering if the new state value is the same as the current value.",
  },
  {
    id: 225,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.PureComponent vs React.Component?",
    options: [
      "PureComponent implements shallow comparison",
      "PureComponent is faster always",
      "No difference",
      "Component is deprecated",
    ],
    correctAnswer: 0,
    explanation:
      "React.PureComponent automatically implements shouldComponentUpdate with shallow prop and state comparison, while React.Component does not.",
  },
  {
    id: 226,
    category: "React",
    difficulty: "easy",
    question: "What is the correct way to add comments in JSX?",
    options: ["{/* comment */}", "// comment", "<!-- comment -->", "# comment"],
    correctAnswer: 0,
    explanation:
      "JSX comments use the JavaScript block comment syntax wrapped in curly braces: {/* This is a comment */}",
  },
  {
    id: 227,
    category: "React",
    difficulty: "hard",
    question: "What is React's Profiler API?",
    options: [
      "API for measuring performance",
      "Automatic performance monitoring",
      "Built-in benchmarking",
      "Memory tracking",
    ],
    correctAnswer: 0,
    explanation:
      "React Profiler API allows measuring the performance of React applications and identifying performance bottlenecks by recording render times.",
  },
  {
    id: 228,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of getDerivedStateFromProps?",
    options: [
      "Update state based on props changes",
      "Initialize state",
      "Validate props",
      "Optimize performance",
    ],
    correctAnswer: 0,
    explanation:
      "getDerivedStateFromProps is called before every render and allows a component to update its state based on changes in props.",
  },
  {
    id: 229,
    category: "React",
    difficulty: "easy",
    question: "What is the difference between onChange and onInput in React?",
    options: [
      "onChange is React's standard, onInput is less common",
      "onInput is for text input only",
      "onChange fires immediately",
      "No difference",
    ],
    correctAnswer: 0,
    explanation:
      "onChange is the standard React event for form inputs, while onInput is less commonly used and behaves slightly differently across browsers.",
  },
  {
    id: 230,
    category: "React",
    difficulty: "hard",
    question:
      "What is the difference between componentDidUpdate and useEffect with dependencies?",
    options: [
      "componentDidUpdate runs after every update, useEffect can be controlled",
      "No difference",
      "useEffect is faster",
      "componentDidUpdate is deprecated",
    ],
    correctAnswer: 0,
    explanation:
      "componentDidUpdate runs after every update in class components, while useEffect with dependencies only runs when specified dependencies change.",
  },
  {
    id: 231,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.Fragment short syntax?",
    options: [
      "<> </> shorthand for React.Fragment",
      "Faster rendering",
      "Better performance",
      "Automatic optimization",
    ],
    correctAnswer: 0,
    explanation:
      "The <> </> syntax is a shorthand for React.Fragment, providing a cleaner way to group elements without adding extra DOM nodes.",
  },
  {
    id: 232,
    category: "React",
    difficulty: "easy",
    question:
      "What is the correct way to bind 'this' in React class components?",
    options: [
      "In constructor, arrow functions, or class fields",
      "Using Function.prototype.bind()",
      "Using call() or apply()",
      "Using bind() in render",
    ],
    correctAnswer: 0,
    explanation:
      "Common approaches include binding in the constructor, using arrow functions as class properties, or using arrow functions in event handlers.",
  },
  {
    id: 233,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental Concurrent Mode?",
    options: [
      "Feature for time slicing and suspense",
      "Parallel execution",
      "Multi-threaded rendering",
      "Concurrent state updates",
    ],
    correctAnswer: 0,
    explanation:
      "Concurrent Mode is React's experimental feature that enables time slicing, Suspense for data fetching, and other concurrent features.",
  },
  {
    id: 234,
    category: "React",
    difficulty: "medium",
    question: "What is the difference between useMemo and React.memo?",
    options: [
      "useMemo memoizes values, React.memo memoizes components",
      "No difference",
      "useMemo is for class components",
      "React.memo is deprecated",
    ],
    correctAnswer: 0,
    explanation:
      "useMemo memoizes computed values within a component, while React.memo memoizes the entire component to prevent unnecessary re-renders.",
  },
  {
    id: 235,
    category: "React",
    difficulty: "easy",
    question: "What is the purpose of the style attribute in React?",
    options: [
      "Apply inline styles",
      "Link external stylesheets",
      "Define CSS classes",
      "Create style components",
    ],
    correctAnswer: 0,
    explanation:
      "The style attribute accepts a JavaScript object with camelCased properties to apply inline styles to JSX elements.",
  },
  {
    id: 236,
    category: "React",
    difficulty: "hard",
    question: "What are React DevTools Profiler insights?",
    options: [
      "Performance analysis of renders and commits",
      "Memory statistics",
      "Network monitoring",
      "Code coverage",
    ],
    correctAnswer: 0,
    explanation:
      "React DevTools Profiler provides insights into component render performance, showing render times, commit phases, and identifying bottlenecks.",
  },
  {
    id: 237,
    category: "React",
    difficulty: "medium",
    question:
      "What is the difference between getDerivedStateFromProps and componentDidUpdate?",
    options: [
      "getDerivedStateFromProps is called before render, componentDidUpdate after",
      "No difference",
      "getDerivedStateFromProps is deprecated",
      "componentDidUpdate is faster",
    ],
    correctAnswer: 0,
    explanation:
      "getDerivedStateFromProps is called during the render phase before the component renders, while componentDidUpdate is called after the component has updated.",
  },
  {
    id: 238,
    category: "React",
    difficulty: "easy",
    question: "What is the purpose of the key prop in lists?",
    options: [
      "Help React identify items",
      "Style items",
      "Sort items",
      "Add event listeners",
    ],
    correctAnswer: 0,
    explanation:
      "The key prop helps React identify which items have changed, been added, or removed, enabling efficient list updates.",
  },
  {
    id: 239,
    category: "React",
    difficulty: "hard",
    question: "What is the performance impact of using array indices as keys?",
    options: [
      "Can cause issues when list order changes",
      "Always improves performance",
      "No impact",
      "Reduces memory usage",
    ],
    correctAnswer: 0,
    explanation:
      "Using array indices as keys can cause performance issues and bugs when the list order changes, as React may incorrectly associate component instances with their state.",
  },
  {
    id: 240,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of defaultValue in React forms?",
    options: [
      "Set initial value for uncontrolled components",
      "Set placeholder",
      "Provide fallback value",
      "Validate input",
    ],
    correctAnswer: 0,
    explanation:
      "defaultValue sets the initial value for uncontrolled form inputs, similar to the HTML attribute, but doesn't control the input after mounting.",
  },
  {
    id: 241,
    category: "React",
    difficulty: "easy",
    question: "What is the correct way to update array state in React?",
    options: [
      "Using spread operator or map/filter",
      "Direct mutation",
      "Using push()/pop()",
      "Using splice()",
    ],
    correctAnswer: 0,
    explanation:
      "Array state should be updated immutably using spread operator ([...array]) or array methods like map(), filter(), or concat() that return new arrays.",
  },
  {
    id: 242,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental useDeferredValue hook?",
    options: [
      "Defer value updates for responsiveness",
      "Delay initialization",
      "Cache expensive values",
      "Validate types",
    ],
    correctAnswer: 0,
    explanation:
      "useDeferredValue returns a deferred version of the value that can lag behind, allowing urgent updates to be processed first for better responsiveness.",
  },
  {
    id: 243,
    category: "React",
    difficulty: "medium",
    question:
      "What happens if you use both value and defaultValue on an input?",
    options: [
      "React shows warning and value takes precedence",
      "defaultValue takes precedence",
      "Values are merged",
      "Component crashes",
    ],
    correctAnswer: 0,
    explanation:
      "React will show a warning about conflicting props, and the value prop will take precedence, making it a controlled component.",
  },
  {
    id: 244,
    category: "React",
    difficulty: "easy",
    question: "What is the purpose of the onSubmit event in React forms?",
    options: [
      "Handle form submission",
      "Handle button clicks",
      "Validate form data",
      "Prevent default behavior",
    ],
    correctAnswer: 0,
    explanation:
      "onSubmit is triggered when a form is submitted, either by clicking a submit button or pressing Enter in a form field.",
  },
  {
    id: 245,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental useTransition hook?",
    options: [
      "Mark updates as non-urgent transitions",
      "Handle component transitions",
      "Manage animations",
      "Control mounting",
    ],
    correctAnswer: 0,
    explanation:
      "useTransition allows you to mark state updates as non-urgent transitions that can be interrupted by more urgent updates, keeping UI responsive.",
  },
  {
    id: 246,
    category: "React",
    difficulty: "medium",
    question:
      "What is the difference between controlled and uncontrolled inputs?",
    options: [
      "Controlled use React state, uncontrolled use DOM state",
      "Uncontrolled are faster",
      "No functional difference",
      "Controlled use more memory",
    ],
    correctAnswer: 0,
    explanation:
      "Controlled inputs have their value managed by React state and use onChange handlers, while uncontrolled inputs manage their own state internally.",
  },
  {
    id: 247,
    category: "React",
    difficulty: "easy",
    question: "What is the purpose of the map() method when rendering lists?",
    options: [
      "Transform array into React elements",
      "Sort the array",
      "Filter the array",
      "Modify the original array",
    ],
    correctAnswer: 0,
    explanation:
      "map() is used to transform an array of data into an array of React elements, with each element typically requiring a unique key prop.",
  },
  {
    id: 248,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental automatic batching enhancement?",
    options: [
      "Batch updates in promises and timeouts",
      "Batch only in event handlers",
      "Improve memory usage",
      "Enable concurrent rendering",
    ],
    correctAnswer: 0,
    explanation:
      "React 18's automatic batching extends to promises, timeouts, and native event handlers, not just React event handlers.",
  },
  {
    id: 249,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.version property?",
    options: [
      "Returns current React version",
      "Set version requirements",
      "Validate compatibility",
      "Update version",
    ],
    correctAnswer: 0,
    explanation:
      "React.version is a string property that contains the version number of the React library currently being used.",
  },
  {
    id: 250,
    category: "React",
    difficulty: "easy",
    question:
      "What is the correct way to handle multiple input fields in a form?",
    options: [
      "Using name attributes and a single handler",
      "Separate handler for each input",
      "Using refs for all inputs",
      "Using separate state for each input",
    ],
    correctAnswer: 0,
    explanation:
      "You can use a single event handler for multiple inputs by giving each input a name attribute and using event.target.name to identify which input changed.",
  },
  {
    id: 251,
    category: "React",
    difficulty: "hard",
    question:
      "What is the difference between React development and production builds?",
    options: [
      "Development includes warnings and debugging tools",
      "Production is slower",
      "No significant difference",
      "Development uses different syntax",
    ],
    correctAnswer: 0,
    explanation:
      "Development builds include helpful warnings, debugging information, and development tools, while production builds are optimized and minified.",
  },
  {
    id: 252,
    category: "React",
    difficulty: "medium",
    question: "What is tree shaking in React applications?",
    options: [
      "Eliminate unused code from bundles",
      "Optimize component trees",
      "Remove unused components",
      "Clean up memory",
    ],
    correctAnswer: 0,
    explanation:
      "Tree shaking is a dead code elimination technique that removes unused code from your final bundle, reducing application size.",
  },
  {
    id: 253,
    category: "React",
    difficulty: "easy",
    question:
      "What is the purpose of the preventDefault() method in React events?",
    options: [
      "Prevent default browser behavior",
      "Stop event propagation",
      "Prevent component re-render",
      "Disable event handling",
    ],
    correctAnswer: 0,
    explanation:
      "preventDefault() prevents the default browser behavior associated with an event, such as preventing form submission or link navigation.",
  },
  {
    id: 254,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental useSyncExternalStore hook?",
    options: [
      "Subscribe to external data sources",
      "Synchronize component state",
      "Manage external APIs",
      "Handle browser storage",
    ],
    correctAnswer: 0,
    explanation:
      "useSyncExternalStore allows components to subscribe to external mutable data sources and work with React's concurrent features.",
  },
  {
    id: 255,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.unstable_batchedUpdates?",
    options: [
      "Manually batch updates outside React events",
      "Optimize performance",
      "Handle async operations",
      "Manage lifecycle",
    ],
    correctAnswer: 0,
    explanation:
      "unstable_batchedUpdates allows manual batching of state updates that occur outside of React's event handlers, like in setTimeout or Promise callbacks.",
  },
  {
    id: 256,
    category: "React",
    difficulty: "easy",
    question: "What is the correct way to add event listeners in React?",
    options: [
      "Using camelCase event props like onClick",
      "Using lowercase event attributes",
      "Using addEventListener",
      "Using HTML event attributes",
    ],
    correctAnswer: 0,
    explanation:
      "React uses camelCase event handlers as props (onClick, onChange, etc.) rather than lowercase HTML event attributes.",
  },
  {
    id: 257,
    category: "React",
    difficulty: "hard",
    question: "What are React Hooks rules?",
    options: [
      "Only call at top level and in React functions",
      "Must be imported",
      "Need initialization",
      "Require cleanup",
    ],
    correctAnswer: 0,
    explanation:
      "Hooks must only be called at the top level of React functions and never inside loops, conditions, or nested functions.",
  },
  {
    id: 258,
    category: "React",
    difficulty: "medium",
    question: "Why can't hooks be called conditionally?",
    options: [
      "React relies on call order",
      "Performance reasons",
      "Memory management",
      "Error handling",
    ],
    correctAnswer: 0,
    explanation:
      "React uses the order in which hooks are called to associate each hook call with its corresponding state, so the order must be consistent.",
  },
  {
    id: 259,
    category: "React",
    difficulty: "easy",
    question: "What is the purpose of the stopPropagation() method?",
    options: [
      "Prevent event bubbling",
      "Prevent default behavior",
      "Stop component rendering",
      "Disable event handling",
    ],
    correctAnswer: 0,
    explanation:
      "stopPropagation() prevents the event from bubbling up to parent elements in the DOM tree.",
  },
  {
    id: 260,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental useInsertionEffect hook?",
    options: [
      "For CSS-in-JS libraries to inject styles",
      "For inserting DOM elements",
      "For adding event listeners",
      "For component insertion",
    ],
    correctAnswer: 0,
    explanation:
      "useInsertionEffect is designed for CSS-in-JS libraries to inject styles into the DOM before the browser paints, ensuring styles are applied correctly.",
  },
  {
    id: 261,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of useLayoutEffect?",
    options: [
      "Run synchronously after DOM mutations",
      "Optimize layout calculations",
      "Handle responsive layouts",
      "Manage positioning",
    ],
    correctAnswer: 0,
    explanation:
      "useLayoutEffect runs synchronously after all DOM mutations but before the browser paints, useful for reading layout and synchronously re-rendering.",
  },
  {
    id: 262,
    category: "React",
    difficulty: "easy",
    question: "What is the correct way to conditionally render components?",
    options: [
      "Using && operator, ternary operator, or if statements",
      "Using switch statements only",
      "Using loops",
      "Using regular if statements in JSX",
    ],
    correctAnswer: 0,
    explanation:
      "Conditional rendering can be done using the logical && operator, ternary operator, or by calling functions that return different components.",
  },
  {
    id: 263,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental useId hook?",
    options: [
      "Generate unique IDs for accessibility",
      "Create component identifiers",
      "Generate random numbers",
      "Manage component keys",
    ],
    correctAnswer: 0,
    explanation:
      "useId generates unique IDs that are stable across server and client rendering, primarily useful for accessibility attributes like aria-describedby.",
  },
  {
    id: 264,
    category: "React",
    difficulty: "medium",
    question: "What is the difference between useEffect and useLayoutEffect?",
    options: [
      "useEffect runs asynchronously, useLayoutEffect runs synchronously",
      "No difference",
      "useLayoutEffect is deprecated",
      "useEffect is faster",
    ],
    correctAnswer: 0,
    explanation:
      "useEffect runs asynchronously after the render is committed to the screen, while useLayoutEffect runs synchronously before the browser paints.",
  },
  {
    id: 265,
    category: "React",
    difficulty: "easy",
    question: "What is the purpose of the ref attribute in React?",
    options: [
      "Get reference to DOM elements or component instances",
      "Create references to values",
      "Link to external resources",
      "Create component relationships",
    ],
    correctAnswer: 0,
    explanation:
      "Refs provide a way to access DOM elements or React component instances directly, bypassing the typical props/state flow.",
  },
  {
    id: 266,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental Cache API?",
    options: [
      "API for caching function results across renders",
      "Browser cache management",
      "Component caching system",
      "State caching mechanism",
    ],
    correctAnswer: 0,
    explanation:
      "React's experimental Cache API provides a way to cache the results of expensive function calls across component renders and even across different components.",
  },
  {
    id: 267,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.createContext?",
    options: [
      "Create context object for passing data",
      "Create new components",
      "Create state containers",
      "Create event handlers",
    ],
    correctAnswer: 0,
    explanation:
      "React.createContext() creates a Context object that can be used to pass data through the component tree without manually passing props at every level.",
  },
  {
    id: 268,
    category: "React",
    difficulty: "easy",
    question: "What is the correct way to update object state in React?",
    options: [
      "Using spread operator to create new object",
      "Direct mutation",
      "Using Object.assign() to mutate",
      "Using setState with mutation",
    ],
    correctAnswer: 0,
    explanation:
      "Object state should be updated immutably using the spread operator: setState({...obj, key: newValue}) or Object.assign({}, obj, {key: newValue})",
  },
  {
    id: 269,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental use() hook?",
    options: [
      "Read promises and context conditionally",
      "Use external libraries",
      "Replace all hooks",
      "Component composition",
    ],
    correctAnswer: 0,
    explanation:
      "The experimental use() hook can read promises and context values in any part of a component, including conditionally, unlike other hooks.",
  },
  {
    id: 270,
    category: "React",
    difficulty: "medium",
    question:
      "What is the difference between Context.Provider and Context.Consumer?",
    options: [
      "Provider supplies values, Consumer receives values",
      "No difference",
      "Provider is deprecated",
      "Consumer is faster",
    ],
    correctAnswer: 0,
    explanation:
      "Context.Provider is used to supply context values to its descendant components, while Context.Consumer (or useContext) is used to consume those values.",
  },
  {
    id: 271,
    category: "React",
    difficulty: "easy",
    question: "What is the purpose of the map() method in React?",
    options: [
      "Transform arrays into React elements",
      "Sort arrays",
      "Filter arrays",
      "Modify original array",
    ],
    correctAnswer: 0,
    explanation:
      "map() is commonly used to transform an array of data into an array of React elements for rendering lists.",
  },
  {
    id: 272,
    category: "React",
    difficulty: "hard",
    question: "What happens if a Context.Provider is not found?",
    options: [
      "Default value from createContext is used",
      "Error is thrown",
      "undefined is returned",
      "Component crashes",
    ],
    correctAnswer: 0,
    explanation:
      "If no matching Provider is found in the component tree, React uses the default value that was passed to createContext().",
  },
  {
    id: 273,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.forwardRef?",
    options: [
      "Forward refs to child components",
      "Forward props",
      "Forward state",
      "Forward events",
    ],
    correctAnswer: 0,
    explanation:
      "React.forwardRef creates a component that can forward refs to its child components, enabling parent components to access child DOM elements.",
  },
  {
    id: 274,
    category: "React",
    difficulty: "easy",
    question: "What is the correct way to handle errors in React components?",
    options: [
      "Using Error Boundaries",
      "Try-catch in render",
      "Using componentDidCatch only",
      "Using console.error",
    ],
    correctAnswer: 0,
    explanation:
      "Error Boundaries are the recommended way to handle JavaScript errors in React components, catching errors in their child component tree.",
  },
  {
    id: 275,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental Offscreen API?",
    options: [
      "API for rendering components without displaying them",
      "Background rendering system",
      "Hidden component management",
      "Performance optimization tool",
    ],
    correctAnswer: 0,
    explanation:
      "React's experimental Offscreen API allows components to be rendered and maintained in memory without being visible, useful for pre-rendering and caching.",
  },
  {
    id: 276,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of useImperativeHandle?",
    options: [
      "Customize instance value exposed to parent",
      "Handle imperative updates",
      "Manage imperative state",
      "Imperative rendering",
    ],
    correctAnswer: 0,
    explanation:
      "useImperativeHandle customizes the instance value that is exposed to parent components when using ref, allowing you to expose specific methods or values.",
  },
  {
    id: 277,
    category: "React",
    difficulty: "easy",
    question:
      "What is the correct way to add a CSS class conditionally in React?",
    options: [
      "Using template literals or conditional operators",
      "Using if statements in JSX",
      "Using switch statements",
      "Classes cannot be conditional",
    ],
    correctAnswer: 0,
    explanation:
      "Conditional classes can be added using template literals: `className={baseClass ${condition ? 'active' : ''}}` or conditional operators.",
  },
  {
    id: 278,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental startTransition API?",
    options: [
      "Mark updates as non-urgent transitions",
      "Start animations",
      "Initialize transitions",
      "Begin async operations",
    ],
    correctAnswer: 0,
    explanation:
      "React.startTransition() allows you to mark state updates as non-urgent transitions, helping React prioritize more urgent updates for better user experience.",
  },
  {
    id: 279,
    category: "React",
    difficulty: "medium",
    question: "What is the significance of non-unique keys in React lists?",
    options: [
      "Can cause rendering issues and state problems",
      "Nothing happens",
      "Performance improves",
      "Keys become unique automatically",
    ],
    correctAnswer: 0,
    explanation:
      "Non-unique keys can cause React to incorrectly associate component instances with their state, leading to rendering bugs and performance issues.",
  },
  {
    id: 280,
    category: "React",
    difficulty: "easy",
    question: "What is the purpose of the disabled attribute in React forms?",
    options: [
      "Disable form elements",
      "Hide form elements",
      "Validate form data",
      "Style form elements",
    ],
    correctAnswer: 0,
    explanation:
      "The disabled attribute prevents user interaction with form elements and is commonly used to disable buttons or inputs based on certain conditions.",
  },
  {
    id: 281,
    category: "React",
    difficulty: "hard",
    question:
      "What is React's experimental useSyncExternalStore hook used for?",
    options: [
      "Subscribe to external data sources",
      "Synchronize component state",
      "Manage external APIs",
      "Handle browser storage",
    ],
    correctAnswer: 0,
    explanation:
      "useSyncExternalStore allows components to subscribe to external mutable data sources and work properly with React's concurrent features.",
  },
  {
    id: 282,
    category: "React",
    difficulty: "medium",
    question: "What is the difference between React.createElement and JSX?",
    options: [
      "JSX is syntactic sugar for React.createElement",
      "createElement is faster",
      "JSX has more features",
      "No functional difference",
    ],
    correctAnswer: 0,
    explanation:
      "JSX is syntactic sugar that gets compiled to React.createElement() calls. They produce the same result but JSX is more readable.",
  },
  {
    id: 283,
    category: "React",
    difficulty: "easy",
    question: "What is the correct way to handle checkbox inputs in React?",
    options: [
      "Using checked attribute instead of value",
      "Using value attribute only",
      "Using selected attribute",
      "Using textContent",
    ],
    correctAnswer: 0,
    explanation:
      "Checkboxes should be controlled using the checked attribute (for checked state) rather than the value attribute used for text inputs.",
  },
  {
    id: 284,
    category: "React",
    difficulty: "hard",
    question: "What is the purpose of React's Cache API?",
    options: [
      "Cache function results across renders",
      "Browser cache management",
      "Component caching",
      "State persistence",
    ],
    correctAnswer: 0,
    explanation:
      "React's experimental Cache API provides a way to cache expensive function results across component renders and components.",
  },
  {
    id: 285,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.StrictMode in development?",
    options: [
      "Identify unsafe lifecycle methods and side effects",
      "Enforce coding standards",
      "Improve performance",
      "Enable debugging features",
    ],
    correctAnswer: 0,
    explanation:
      "React.StrictMode helps identify components with unsafe lifecycle methods, legacy API usage, and unexpected side effects by intentionally double-invoking functions in development.",
  },
  {
    id: 286,
    category: "React",
    difficulty: "easy",
    question: "What is the correct way to handle radio button groups in React?",
    options: [
      "Using the same name attribute with different values",
      "Using different name attributes",
      "Using the same value",
      "Using checked attribute only",
    ],
    correctAnswer: 0,
    explanation:
      "Radio buttons in a group should share the same name attribute but have different values, with the checked attribute indicating which is selected.",
  },
  {
    id: 287,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental useDeferredValue hook?",
    options: [
      "Defer value updates to maintain responsiveness",
      "Delay value initialization",
      "Cache expensive values",
      "Validate value types",
    ],
    correctAnswer: 0,
    explanation:
      "useDeferredValue lets you defer updating a part of the UI, allowing more urgent updates to be processed first for better user experience.",
  },
  {
    id: 288,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.memo()?",
    options: [
      "Prevent unnecessary re-renders when props haven't changed",
      "Cache component state",
      "Optimize memory usage",
      "Speed up component creation",
    ],
    correctAnswer: 0,
    explanation:
      "React.memo is a higher-order component that memoizes a component and only re-renders when props change (using shallow comparison).",
  },
  {
    id: 289,
    category: "React",
    difficulty: "easy",
    question: "What is the correct way to handle select dropdowns in React?",
    options: [
      "Using value attribute on select element",
      "Using selected attribute on options only",
      "Using checked attribute",
      "Using multiple attributes",
    ],
    correctAnswer: 0,
    explanation:
      "Select elements should be controlled using the value attribute on the select element itself, not on individual option elements.",
  },
  {
    id: 290,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental useId hook?",
    options: [
      "Generate unique IDs for accessibility attributes",
      "Create component identifiers",
      "Generate random numbers",
      "Manage component keys",
    ],
    correctAnswer: 0,
    explanation:
      "useId generates unique IDs that are stable across server and client rendering, primarily useful for accessibility attributes like aria-describedby.",
  },
  {
    id: 291,
    category: "React",
    difficulty: "medium",
    question: "What is the difference between useMemo and useCallback?",
    options: [
      "useMemo returns a value, useCallback returns a function",
      "No difference",
      "useMemo is for primitives only",
      "useCallback is deprecated",
    ],
    correctAnswer: 0,
    explanation:
      "useMemo memoizes the result of a computation (a value), while useCallback memoizes a function itself to prevent recreating it on every render.",
  },
  {
    id: 292,
    category: "React",
    difficulty: "easy",
    question: "What is the purpose of the pattern attribute in React forms?",
    options: [
      "Validate input using regular expressions",
      "Set input placeholder",
      "Define input type",
      "Style the input",
    ],
    correctAnswer: 0,
    explanation:
      "The pattern attribute specifies a regular expression that the input's value must match for validation purposes.",
  },
  {
    id: 293,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental useInsertionEffect hook?",
    options: [
      "For CSS-in-JS libraries to inject styles",
      "For inserting DOM elements",
      "For adding event listeners",
      "For component insertion",
    ],
    correctAnswer: 0,
    explanation:
      "useInsertionEffect is designed for CSS-in-JS libraries to inject styles into the DOM before the browser paints, ensuring styles are applied correctly.",
  },
  {
    id: 294,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of useRef hook?",
    options: [
      "Create references to DOM elements or store mutable values",
      "Manage state",
      "Handle effects",
      "Create context",
    ],
    correctAnswer: 0,
    explanation:
      "useRef creates a mutable ref object that can hold references to DOM elements or any mutable value that persists across re-renders.",
  },
  {
    id: 295,
    category: "React",
    difficulty: "easy",
    question: "What is the correct way to handle form validation in React?",
    options: [
      "Using controlled components with validation logic",
      "Using HTML5 validation only",
      "Using external libraries only",
      "Using regex in pattern attribute only",
    ],
    correctAnswer: 0,
    explanation:
      "Form validation in React is typically handled using controlled components where you can implement custom validation logic in your event handlers.",
  },
  {
    id: 296,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental use() hook?",
    options: [
      "Read promises and context in any component",
      "Use external libraries",
      "Replace all hooks",
      "Component composition",
    ],
    correctAnswer: 0,
    explanation:
      "The experimental use() hook can read promises and context values in any part of a component, including conditionally, unlike other hooks.",
  },
  {
    id: 297,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.Children utilities?",
    options: [
      "Manipulate and transform children props",
      "Create child components",
      "Count child elements",
      "Style child components",
    ],
    correctAnswer: 0,
    explanation:
      "React.Children provides utilities for dealing with the opaque data structure of props.children, allowing you to map, count, and manipulate children.",
  },
  {
    id: 298,
    category: "React",
    difficulty: "easy",
    question: "What is the purpose of the required attribute in React forms?",
    options: [
      "Make form fields mandatory",
      "Set field as read-only",
      "Validate field format",
      "Style required fields",
    ],
    correctAnswer: 0,
    explanation:
      "The required attribute makes form fields mandatory, preventing form submission until the field has a value.",
  },
  {
    id: 299,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental Offscreen API?",
    options: [
      "Render components without displaying them",
      "Hide components from DOM",
      "Background rendering",
      "Component virtualization",
    ],
    correctAnswer: 0,
    explanation:
      "React's experimental Offscreen API allows components to be rendered and maintained in memory without being visible, useful for pre-rendering and caching.",
  },
  {
    id: 300,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.cloneElement?",
    options: [
      "Clone element with new props",
      "Deep copy components",
      "Duplicate components",
      "Create element copies",
    ],
    correctAnswer: 0,
    explanation:
      "React.cloneElement clones and returns a new React element using the original element as the starting point, with new props merged in.",
  },
  {
    id: 301,
    category: "React",
    difficulty: "easy",
    question: "What is the correct way to handle file inputs in React?",
    options: [
      "Using uncontrolled components with refs",
      "Using controlled components",
      "Using value attribute",
      "Using textContent",
    ],
    correctAnswer: 0,
    explanation:
      "File inputs are typically handled as uncontrolled components using refs because their value is read-only and cannot be set programmatically for security reasons.",
  },
  {
    id: 302,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental Selective Hydration?",
    options: [
      "Prioritize hydrating interactive components",
      "Partial page hydration",
      "Optimized SSR",
      "Conditional loading",
    ],
    correctAnswer: 0,
    explanation:
      "Selective Hydration allows React to prioritize hydrating components that users are interacting with, improving perceived performance.",
  },
  {
    id: 303,
    category: "React",
    difficulty: "medium",
    question:
      "What is the significance of React's key prop in component reconciliation?",
    options: [
      "Help React identify changed, moved, or removed items",
      "Improve component performance",
      "Enable component styling",
      "Manage component state",
    ],
    correctAnswer: 0,
    explanation:
      "The key prop helps React's reconciliation algorithm efficiently determine which list items have changed, been added, or removed, enabling optimal DOM updates.",
  },
  {
    id: 304,
    category: "React",
    difficulty: "easy",
    question:
      "What is the purpose of the min and max attributes in React number inputs?",
    options: [
      "Set minimum and maximum values",
      "Set input size",
      "Define validation pattern",
      "Style the input",
    ],
    correctAnswer: 0,
    explanation:
      "The min and max attributes set the minimum and maximum numeric values that can be entered in number input fields.",
  },
  {
    id: 305,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental automatic batching enhancement?",
    options: [
      "Batch updates in promises and timeouts",
      "Batch only in event handlers",
      "Improve memory usage",
      "Enable concurrent rendering",
    ],
    correctAnswer: 0,
    explanation:
      "React 18's automatic batching extends to promises, timeouts, and native event handlers, not just React event handlers.",
  },
  {
    id: 306,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.PureComponent?",
    options: [
      "Component with shallow comparison optimization",
      "Component without side effects",
      "Functional component",
      "Component for pure functions",
    ],
    correctAnswer: 0,
    explanation:
      "React.PureComponent is similar to React.Component but implements shouldComponentUpdate with a shallow prop and state comparison to prevent unnecessary re-renders.",
  },
  {
    id: 307,
    category: "React",
    difficulty: "easy",
    question:
      "What is the correct way to handle multiple checkboxes with the same name?",
    options: [
      "Using an array to store checked values",
      "Using separate state for each",
      "Using a single boolean",
      "Using the checked attribute only",
    ],
    correctAnswer: 0,
    explanation:
      "Multiple checkboxes with the same name should be handled by maintaining an array of checked values, adding or removing values as checkboxes are toggled.",
  },
  {
    id: 308,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental Fresh API?",
    options: [
      "Invalidate and refresh cached data",
      "Component refresh mechanism",
      "State refresh system",
      "DOM refresh utility",
    ],
    correctAnswer: 0,
    explanation:
      "React's experimental Fresh API provides mechanisms for invalidating and refreshing cached data, particularly useful with Server Components and data fetching.",
  },
  {
    id: 309,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of getDerivedStateFromProps?",
    options: [
      "Update state based on props changes",
      "Initialize component state",
      "Handle prop validation",
      "Optimize component performance",
    ],
    correctAnswer: 0,
    explanation:
      "getDerivedStateFromProps is called before every render and allows a component to update its state based on changes in props.",
  },
  {
    id: 310,
    category: "React",
    difficulty: "easy",
    question:
      "What is the purpose of the step attribute in React number inputs?",
    options: [
      "Set increment/decrement step value",
      "Set validation steps",
      "Define input size",
      "Style the input",
    ],
    correctAnswer: 0,
    explanation:
      "The step attribute specifies the increment or decrement step for numeric inputs when using spinner controls or validation.",
  },
  {
    id: 311,
    category: "React",
    difficulty: "hard",
    question: "What is React's reconciliation priority system?",
    options: [
      "System for prioritizing different types of updates",
      "Method for ordering component renders",
      "Algorithm for component comparison",
      "System for managing component lifecycle",
    ],
    correctAnswer: 0,
    explanation:
      "React's priority system allows the framework to prioritize different types of updates (synchronous, animation-related, etc.) to maintain smooth user interactions.",
  },
  {
    id: 312,
    category: "React",
    difficulty: "medium",
    question:
      "What is the difference between React.Component and React.PureComponent?",
    options: [
      "PureComponent implements shallow comparison automatically",
      "No difference",
      "PureComponent is faster in all cases",
      "Component is deprecated",
    ],
    correctAnswer: 0,
    explanation:
      "React.PureComponent automatically implements shouldComponentUpdate with a shallow prop and state comparison, while React.Component requires manual implementation.",
  },
  {
    id: 313,
    category: "React",
    difficulty: "easy",
    question: "What is the correct way to handle form reset in React?",
    options: [
      "Using the reset() method or controlled state",
      "Using defaultValue only",
      "Using refs to reset DOM",
      "Using setState to null",
    ],
    correctAnswer: 0,
    explanation:
      "Forms can be reset using the native reset() method on the form element or by resetting all controlled state values to their initial state.",
  },
  {
    id: 314,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental useDeferredValue hook?",
    options: [
      "Defer value updates for better responsiveness",
      "Delay value initialization",
      "Cache expensive values",
      "Validate value types",
    ],
    correctAnswer: 0,
    explanation:
      "useDeferredValue returns a deferred version of the value that can lag behind, allowing urgent updates to be processed first for better user experience.",
  },
  {
    id: 315,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React DevTools?",
    options: [
      "Browser extension for debugging React applications",
      "Library for testing React",
      "Tool for building React apps",
      "React documentation",
    ],
    correctAnswer: 0,
    explanation:
      "React DevTools is a browser extension that allows developers to inspect React component hierarchies, props, state, and performance in real-time.",
  },
  {
    id: 316,
    category: "React",
    difficulty: "easy",
    question:
      "What is the purpose of the multiple attribute in React select elements?",
    options: [
      "Allow selection of multiple options",
      "Create multiple select elements",
      "Set multiple validation rules",
      "Apply multiple styles",
    ],
    correctAnswer: 0,
    explanation:
      "The multiple attribute on select elements allows users to select multiple options by holding Ctrl/Cmd while clicking.",
  },
  {
    id: 317,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental useInsertionEffect hook used for?",
    options: [
      "CSS-in-JS libraries to inject styles",
      "DOM element insertion",
      "Event listener insertion",
      "Component insertion",
    ],
    correctAnswer: 0,
    explanation:
      "useInsertionEffect is designed for CSS-in-JS libraries to inject styles into the DOM before the browser paints, ensuring styles are applied correctly.",
  },
  {
    id: 318,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.lazy() and Suspense?",
    options: [
      "Code-splitting with loading states",
      "Lazy state updates",
      "Slow component rendering",
      "Component testing",
    ],
    correctAnswer: 0,
    explanation:
      "React.lazy() enables code-splitting by loading components on demand, while Suspense provides a loading UI while waiting for the lazy component to load.",
  },
  {
    id: 319,
    category: "React",
    difficulty: "easy",
    question: "What is the correct way to handle textarea inputs in React?",
    options: [
      "Using value attribute instead of textContent",
      "Using textContent attribute",
      "Using innerHTML",
      "Using defaultValue only",
    ],
    correctAnswer: 0,
    explanation:
      "Textarea elements should be controlled using the value attribute, not by placing text between the opening and closing tags like in HTML.",
  },
  {
    id: 320,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental useSyncExternalStore?",
    options: [
      "Subscribe to external mutable data sources",
      "Synchronize component state",
      "Manage external APIs",
      "Handle browser storage",
    ],
    correctAnswer: 0,
    explanation:
      "useSyncExternalStore allows components to subscribe to external mutable data sources (like browser APIs) and work properly with React's concurrent features.",
  },
  {
    id: 321,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.Children.map?",
    options: [
      "Transform and manipulate children",
      "Count children",
      "Filter children by type",
      "Create new children",
    ],
    correctAnswer: 0,
    explanation:
      "React.Children.map allows you to iterate over children and transform them, handling the opaque structure of props.children properly.",
  },
  {
    id: 322,
    category: "React",
    difficulty: "easy",
    question:
      "What is the purpose of the accept attribute in React file inputs?",
    options: [
      "Specify accepted file types",
      "Accept all files",
      "Validate file size",
      "Style the file input",
    ],
    correctAnswer: 0,
    explanation:
      "The accept attribute specifies which file types are accepted by the file input, using MIME types or file extensions (e.g., 'image/*', '.jpg,.png').",
  },
  {
    id: 323,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental use() hook?",
    options: [
      "Read promises and context conditionally",
      "Use external libraries",
      "Replace all hooks",
      "Component composition",
    ],
    correctAnswer: 0,
    explanation:
      "The experimental use() hook can read promises and context values in any part of a component, and unlike other hooks, can be called conditionally.",
  },
  {
    id: 324,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.PureComponent vs React.Component?",
    options: [
      "PureComponent has built-in shallow comparison",
      "PureComponent is always faster",
      "No difference",
      "Component is deprecated",
    ],
    correctAnswer: 0,
    explanation:
      "React.PureComponent automatically implements shouldComponentUpdate with shallow comparison of props and state, while React.Component does not.",
  },
  {
    id: 325,
    category: "React",
    difficulty: "easy",
    question:
      "What is the correct way to handle form validation messages in React?",
    options: [
      "Using conditional rendering based on validation state",
      "Using HTML5 validation only",
      "Using alert() functions",
      "Using console.log()",
    ],
    correctAnswer: 0,
    explanation:
      "Form validation messages should be handled by maintaining validation state and conditionally rendering appropriate messages based on the validation results.",
  },
  {
    id: 326,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental Activity API?",
    options: [
      "Track user activity and interactions",
      "Component activity monitoring",
      "Performance tracking",
      "State activity management",
    ],
    correctAnswer: 0,
    explanation:
      "React's experimental Activity API is designed to track user activity and interactions to help optimize rendering and prioritize updates based on user behavior.",
  },
  {
    id: 327,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.forwardRef?",
    options: [
      "Forward refs to child components",
      "Forward props",
      "Forward state",
      "Forward events",
    ],
    correctAnswer: 0,
    explanation:
      "React.forwardRef creates a component that can forward refs to its child components, enabling parent components to access child DOM elements.",
  },
  {
    id: 328,
    category: "React",
    difficulty: "easy",
    question:
      "What is the purpose of the size attribute in React select elements?",
    options: [
      "Set number of visible options",
      "Set font size",
      "Define option count",
      "Style the select",
    ],
    correctAnswer: 0,
    explanation:
      "The size attribute specifies how many options should be visible at once in a select element, creating a scrollable list when size > 1.",
  },
  {
    id: 329,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental concurrent features?",
    options: [
      "Time slicing and interruptible rendering",
      "Parallel component execution",
      "Multi-threaded rendering",
      "Async component loading",
    ],
    correctAnswer: 0,
    explanation:
      "React's concurrent features include time slicing, interruptible rendering, and the ability to prioritize updates based on user interactions.",
  },
  {
    id: 330,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of useImperativeHandle hook?",
    options: [
      "Customize instance value exposed to parent components",
      "Handle imperative updates",
      "Manage imperative state",
      "Imperative rendering",
    ],
    correctAnswer: 0,
    explanation:
      "useImperativeHandle customizes the instance value that is exposed to parent components when using ref, allowing you to expose specific methods or values.",
  },
  {
    id: 331,
    category: "React",
    difficulty: "easy",
    question:
      "What is the correct way to handle form data submission in React?",
    options: [
      "Prevent default and handle data in onSubmit",
      "Let browser handle submission",
      "Use form action attribute",
      "Use GET method only",
    ],
    correctAnswer: 0,
    explanation:
      "Form submission should be handled by preventing the default browser behavior with event.preventDefault() and then processing the form data in JavaScript.",
  },
  {
    id: 332,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental scheduling priorities?",
    options: [
      "System for prioritizing different types of updates",
      "Component loading order",
      "State update sequence",
      "Event handling priority",
    ],
    correctAnswer: 0,
    explanation:
      "React's scheduling priorities allow the framework to prioritize different types of updates (immediate, normal, low) to maintain smooth user interactions.",
  },
  {
    id: 333,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.createRef vs useRef?",
    options: [
      "createRef for class components, useRef for functional",
      "No difference",
      "useRef is faster",
      "createRef is deprecated",
    ],
    correctAnswer: 0,
    explanation:
      "React.createRef() is used in class components to create refs, while useRef() is the hook equivalent for functional components.",
  },
  {
    id: 334,
    category: "React",
    difficulty: "easy",
    question: "What is the purpose of the autoFocus attribute in React forms?",
    options: [
      "Automatically focus element on mount",
      "Enable autofocus feature",
      "Set focus style",
      "Validate focus state",
    ],
    correctAnswer: 0,
    explanation:
      "The autoFocus attribute automatically focuses the specified form element when the component mounts, similar to HTML autofocus.",
  },
  {
    id: 335,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental Fresh API?",
    options: [
      "Invalidate and refresh cached data",
      "Component refresh mechanism",
      "State refresh system",
      "DOM refresh utility",
    ],
    correctAnswer: 0,
    explanation:
      "React's experimental Fresh API provides mechanisms for invalidating and refreshing cached data, particularly useful with Server Components and data fetching.",
  },
  {
    id: 336,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of Error Boundaries in React?",
    options: [
      "Catch JavaScript errors in component tree",
      "Handle network errors",
      "Validate props",
      "Catch syntax errors",
    ],
    correctAnswer: 0,
    explanation:
      "Error Boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display fallback UI.",
  },
  {
    id: 337,
    category: "React",
    difficulty: "easy",
    question: "What is the correct way to handle dynamic form fields in React?",
    options: [
      "Using array state and mapping over fields",
      "Using separate state for each field",
      "Using refs only",
      "Using DOM manipulation",
    ],
    correctAnswer: 0,
    explanation:
      "Dynamic form fields should be handled by maintaining an array in state and using map() to render fields, with proper key props for each field.",
  },
  {
    id: 338,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental time slicing?",
    options: [
      "Break work into small units to maintain responsiveness",
      "Schedule updates",
      "Optimize rendering",
      "Manage lifecycle",
    ],
    correctAnswer: 0,
    explanation:
      "Time slicing allows React to break work into small units and yield control back to the browser to maintain responsiveness during heavy computations.",
  },
  {
    id: 339,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.StrictMode?",
    options: [
      "Identify potential problems in development",
      "Enforce coding standards",
      "Improve performance",
      "Enable debugging features",
    ],
    correctAnswer: 0,
    explanation:
      "React.StrictMode helps identify components with unsafe lifecycle methods, legacy API usage, and unexpected side effects by intentionally double-invoking functions in development.",
  },
  {
    id: 340,
    category: "React",
    difficulty: "easy",
    question:
      "What is the purpose of the placeholder attribute in React form inputs?",
    options: [
      "Display hint text when input is empty",
      "Set default value",
      "Validate input format",
      "Style the input",
    ],
    correctAnswer: 0,
    explanation:
      "The placeholder attribute displays hint text inside an input field when it's empty, guiding users on what to enter.",
  },
  {
    id: 341,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental Server Components architecture?",
    options: [
      "Zero-bundle-size server-rendered components",
      "Components that run on server and client",
      "Components for server-side routing",
      "Database-connected components",
    ],
    correctAnswer: 0,
    explanation:
      "Server Components render on the server and send only HTML to the client, with zero JavaScript bundle size for those components.",
  },
  {
    id: 342,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.memo()?",
    options: [
      "Prevent unnecessary re-renders when props haven't changed",
      "Cache component state",
      "Optimize memory usage",
      "Speed up component creation",
    ],
    correctAnswer: 0,
    explanation:
      "React.memo is a higher-order component that memoizes a component and only re-renders when props change (using shallow comparison).",
  },
  {
    id: 343,
    category: "React",
    difficulty: "easy",
    question: "What is the correct way to handle form field arrays in React?",
    options: [
      "Using array state with map() and proper keys",
      "Using separate state for each field",
      "Using refs array",
      "Using DOM manipulation",
    ],
    correctAnswer: 0,
    explanation:
      "Form field arrays should be handled using state arrays, mapping over them to render fields, with proper key props and functions to add/remove fields.",
  },
  {
    id: 344,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental useTransition hook?",
    options: [
      "Mark updates as non-urgent to keep UI responsive",
      "Handle component transitions",
      "Manage animation states",
      "Control component mounting",
    ],
    correctAnswer: 0,
    explanation:
      "useTransition allows you to mark state updates as transitions that are non-urgent and can be interrupted by more urgent updates to keep the UI responsive.",
  },
  {
    id: 345,
    category: "React",
    difficulty: "medium",
    question:
      "What is the difference between controlled and uncontrolled components?",
    options: [
      "Controlled use React state, uncontrolled use DOM state",
      "Controlled are faster",
      "Uncontrolled are deprecated",
      "No difference",
    ],
    correctAnswer: 0,
    explanation:
      "Controlled components have their value controlled by React state and use onChange handlers, while uncontrolled components manage their own state in the DOM.",
  },
  {
    id: 346,
    category: "React",
    difficulty: "easy",
    question: "What is the purpose of the readOnly attribute in React forms?",
    options: [
      "Make input read-only but not disabled",
      "Disable the input",
      "Make input required",
      "Validate input format",
    ],
    correctAnswer: 0,
    explanation:
      "The readOnly attribute makes form inputs read-only (users can't modify the value) but they remain focusable and their values are submitted with forms.",
  },
  {
    id: 347,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental useDeferredValue hook?",
    options: [
      "Defer value updates for better responsiveness",
      "Delay value initialization",
      "Cache expensive values",
      "Validate value types",
    ],
    correctAnswer: 0,
    explanation:
      "useDeferredValue returns a deferred version of the value that can lag behind, allowing urgent updates to be processed first for better user experience.",
  },
  {
    id: 348,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.Lazy and Suspense?",
    options: [
      "Code-splitting with loading states",
      "Lazy state updates",
      "Slow component rendering",
      "Component testing",
    ],
    correctAnswer: 0,
    explanation:
      "React.lazy() enables code-splitting by loading components on demand, while Suspense provides a loading UI while waiting for the lazy component to load.",
  },
  {
    id: 349,
    category: "React",
    difficulty: "easy",
    question: "What is the correct way to handle form field validation errors?",
    options: [
      "Using state to store and display error messages",
      "Using HTML5 validation only",
      "Using alert() functions",
      "Using console.log",
    ],
    correctAnswer: 0,
    explanation:
      "Validation errors should be stored in component state and conditionally rendered near the relevant form fields to provide user-friendly feedback without interrupting the user experience.",
  },
  {
    id: 350,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental concurrent rendering?",
    options: [
      "Ability to interrupt and resume rendering work",
      "Rendering multiple components simultaneously",
      "Parallel component execution",
      "Asynchronous component loading",
    ],
    correctAnswer: 0,
    explanation:
      "Concurrent rendering allows React to interrupt rendering work for high-priority updates and resume lower-priority work later, improving perceived performance and responsiveness.",
  },
  {
    id: 351,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of useCallback hook?",
    options: [
      "Memoize function instances to prevent unnecessary re-creations",
      "Manage state",
      "Handle effects",
      "Create components",
    ],
    correctAnswer: 0,
    explanation:
      "useCallback returns a memoized callback that only changes if its dependencies change, preventing child components from re-rendering when the callback reference hasn't changed.",
  },
  {
    id: 352,
    category: "React",
    difficulty: "easy",
    question:
      "What is the purpose of the maxLength attribute in React text inputs?",
    options: [
      "Limit the number of characters allowed",
      "Set input width",
      "Define validation length",
      "Style the input",
    ],
    correctAnswer: 0,
    explanation:
      "maxLength restricts the number of characters a user can type into an input field and is enforced by both the browser and React's controlled input logic.",
  },
  {
    id: 353,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental useSyncExternalStore hook?",
    options: [
      "Subscribe to external mutable data sources",
      "Synchronize component state",
      "Manage external APIs",
      "Handle browser storage",
    ],
    correctAnswer: 0,
    explanation:
      "useSyncExternalStore allows components to subscribe to external mutable data sources (like browser APIs or third-party stores) and remain compatible with concurrent features.",
  },
  {
    id: 354,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.Children.count?",
    options: [
      "Count the number of children",
      "Count component instances",
      "Count DOM elements",
      "Count valid React elements",
    ],
    correctAnswer: 0,
    explanation:
      "React.Children.count returns the total number of components in children, equal to how many times a callback passed to React.Children.map would be invoked.",
  },
  {
    id: 355,
    category: "React",
    difficulty: "easy",
    question:
      "What is the correct way to handle form data submission in React?",
    options: [
      "Prevent default and handle data in onSubmit",
      "Let browser handle submission",
      "Use form action attribute",
      "Use GET method only",
    ],
    correctAnswer: 0,
    explanation:
      "Always call event.preventDefault() in the onSubmit handler to prevent page reload, then collect and process form data programmatically (e.g., via API calls).",
  },
  {
    id: 356,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental useInsertionEffect hook?",
    options: [
      "For CSS-in-JS to inject styles before paint",
      "For inserting DOM elements",
      "For adding event listeners",
      "For component insertion",
    ],
    correctAnswer: 0,
    explanation:
      "useInsertionEffect runs synchronously before DOM mutations are flushed to the screen, allowing CSS-in-JS libraries to inject styles at the right time.",
  },
  {
    id: 357,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.Children.only?",
    options: [
      "Verify that children has only one child",
      "Count children",
      "Filter children",
      "Transform children",
    ],
    correctAnswer: 0,
    explanation:
      "React.Children.only verifies that children contains exactly one React element and returns it; otherwise it throws an error.",
  },
  {
    id: 358,
    category: "React",
    difficulty: "easy",
    question: "What is the purpose of the autoSave attribute in React forms?",
    options: [
      "Enable/disable form field auto-saving",
      "Save form automatically",
      "Set save interval",
      "Style saved fields",
    ],
    correctAnswer: 0,
    explanation:
      "autoSave specifies whether form fields should be automatically saved and restored when the user returns to the page, improving user experience.",
  },
  {
    id: 359,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental useId hook?",
    options: [
      "Generate unique IDs for accessibility attributes",
      "Create component identifiers",
      "Generate random numbers",
      "Manage component keys",
    ],
    correctAnswer: 0,
    explanation:
      "useId generates stable, unique IDs across server and client renders, primarily used for accessibility attributes like aria-describedby and aria-labelledby.",
  },
  {
    id: 360,
    category: "React",
    difficulty: "medium",
    question: "What is the difference between useMemo and useCallback?",
    options: [
      "useMemo returns a value, useCallback returns a function",
      "No difference",
      "useMemo is for primitives only",
      "useCallback is deprecated",
    ],
    correctAnswer: 0,
    explanation:
      "useMemo memoizes a computed value, while useCallback memoizes a function instance to prevent child components from re-rendering unnecessarily.",
  },
  {
    id: 361,
    category: "React",
    difficulty: "easy",
    question: "What is the correct way to handle select multiple in React?",
    options: [
      "Using array state with selected options",
      "Using single string value",
      "Using boolean state",
      "Using separate state for each option",
    ],
    correctAnswer: 0,
    explanation:
      "Multi-select elements should be controlled with an array containing the values of all selected options, updated as users select or deselect items.",
  },
  {
    id: 362,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental use() hook?",
    options: [
      "Read promises and context conditionally",
      "Use external libraries",
      "Replace all hooks",
      "Component composition",
    ],
    correctAnswer: 0,
    explanation:
      "The experimental use() hook can read the resolved value of a promise or a context value, and unlike other hooks, it can be called conditionally.",
  },
  {
    id: 363,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.Children.toArray?",
    options: [
      "Convert children to flat array with keys",
      "Count children",
      "Filter children",
      "Create children",
    ],
    correctAnswer: 0,
    explanation:
      "React.Children.toArray flattens the children data structure into a regular array and assigns keys to each element, useful for transforming or filtering children.",
  },
  {
    id: 364,
    category: "React",
    difficulty: "easy",
    question: "What is the purpose of the list attribute in React inputs?",
    options: [
      "Associate input with a datalist",
      "Create list inputs",
      "Set input as list",
      "Style as list",
    ],
    correctAnswer: 0,
    explanation:
      "The list attribute links an input to a datalist element, providing autocomplete suggestions based on the datalist options while allowing free-form input.",
  },
  {
    id: 365,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental Offscreen API?",
    options: [
      "Render components without displaying them",
      "Hide components from DOM",
      "Background rendering",
      "Component virtualization",
    ],
    correctAnswer: 0,
    explanation:
      "Offscreen allows components to be rendered and kept in memory without being visible, useful for pre-rendering, caching, or preserving component state.",
  },
  {
    id: 366,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.memo()?",
    options: [
      "Prevent unnecessary re-renders when props haven't changed",
      "Cache component state",
      "Optimize memory usage",
      "Speed up component creation",
    ],
    correctAnswer: 0,
    explanation:
      "React.memo memoizes a component and only re-renders when props change (using shallow comparison), preventing wasted renders.",
  },
  {
    id: 367,
    category: "React",
    difficulty: "easy",
    question:
      "What is the correct way to handle form field calculations in React?",
    options: [
      "Using useEffect to watch dependent fields",
      "Using separate handlers",
      "Using DOM manipulation",
      "Using CSS calculations",
    ],
    correctAnswer: 0,
    explanation:
      "Use useEffect to listen for changes in dependent fields and automatically recalculate derived values, keeping the form state consistent.",
  },
  {
    id: 368,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental useDeferredValue hook?",
    options: [
      "Defer value updates for better responsiveness",
      "Delay value initialization",
      "Cache expensive values",
      "Validate value types",
    ],
    correctAnswer: 0,
    explanation:
      "useDeferredValue returns a version of the value that may lag behind, allowing urgent updates to interrupt heavy computations for better UX.",
  },
  {
    id: 369,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.cloneElement?",
    options: [
      "Clone element with new props",
      "Deep copy components",
      "Duplicate components",
      "Create element copies",
    ],
    correctAnswer: 0,
    explanation:
      "React.cloneElement creates a new React element using an existing one as the starting point, merging in new props without modifying the original.",
  },
  {
    id: 370,
    category: "React",
    difficulty: "easy",
    question: "What is the purpose of the noValidate attribute in React forms?",
    options: [
      "Disable browser validation",
      "Enable validation",
      "Set validation rules",
      "Style validated fields",
    ],
    correctAnswer: 0,
    explanation:
      "noValidate turns off browser-native validation for the entire form, letting you handle validation entirely with custom JavaScript logic.",
  },
  {
    id: 371,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental Selective Hydration?",
    options: [
      "Prioritize hydrating interactive components",
      "Partial page hydration",
      "Optimized SSR",
      "Conditional loading",
    ],
    correctAnswer: 0,
    explanation:
      "Selective Hydration allows React to prioritize hydrating components that the user is interacting with first, improving perceived performance.",
  },
  {
    id: 372,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of useLayoutEffect?",
    options: [
      "Run synchronously after DOM mutations",
      "Optimize layout calculations",
      "Handle responsive layouts",
      "Manage component positioning",
    ],
    correctAnswer: 0,
    explanation:
      "useLayoutEffect fires synchronously after DOM mutations but before the browser paints, making it ideal for measuring DOM elements and syncing React state to those measurements.",
  },
  {
    id: 373,
    category: "React",
    difficulty: "easy",
    question:
      "What is the correct way to handle form field arrays with dynamic validation?",
    options: [
      "Using array state with validation for each item",
      "Using single validation rule",
      "Using HTML5 validation only",
      "Using external validation libraries only",
    ],
    correctAnswer: 0,
    explanation:
      "Maintain an array of validation states or error messages alongside the field data, updating validation whenever fields are added, removed, or modified.",
  },
  {
    id: 374,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental useSyncExternalStore hook?",
    options: [
      "Subscribe to external mutable data sources",
      "Synchronize component state",
      "Manage external APIs",
      "Handle browser storage",
    ],
    correctAnswer: 0,
    explanation:
      "useSyncExternalStore lets components subscribe to external mutable stores (like browser APIs) while remaining compatible with concurrent features and time-slicing.",
  },
  {
    id: 375,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.Children.forEach?",
    options: [
      "Iterate over children without returning",
      "Transform children",
      "Count children",
      "Filter children",
    ],
    correctAnswer: 0,
    explanation:
      "React.Children.forEach iterates over each child in children and executes a callback, but unlike map, it does not return a new array.",
  },
  {
    id: 376,
    category: "React",
    difficulty: "easy",
    question:
      "What is the purpose of the dirname attribute in React form inputs?",
    options: [
      "Submit text direction with form data",
      "Set input direction",
      "Define input name",
      "Style input direction",
    ],
    correctAnswer: 0,
    explanation:
      "dirname submits the text-directionality (ltr or rtl) of the input field along with the form data, useful for multilingual applications.",
  },
  {
    id: 377,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental startTransition?",
    options: [
      "Mark updates as non-urgent transitions",
      "Start animations",
      "Initialize transitions",
      "Begin async operations",
    ],
    correctAnswer: 0,
    explanation:
      "startTransition lets you mark a state update as non-urgent, allowing React to interrupt it with higher-priority updates for smoother user interactions.",
  },
  {
    id: 378,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.PureComponent?",
    options: [
      "Component with built-in shallow comparison",
      "Component without side effects",
      "Functional component",
      "Component for pure functions",
    ],
    correctAnswer: 0,
    explanation:
      "PureComponent implements shouldComponentUpdate with a shallow comparison of props and state, automatically preventing unnecessary re-renders.",
  },
  {
    id: 379,
    category: "React",
    difficulty: "easy",
    question:
      "What is the correct way to handle form field masking with validation?",
    options: [
      "Using controlled components with input transformation and validation",
      "Using uncontrolled components",
      "Using DOM manipulation",
      "Using CSS only",
    ],
    correctAnswer: 0,
    explanation:
      "Implement masking by transforming the input value in the onChange handler while preserving the raw value for validation, keeping both masked and raw values in state.",
  },
  {
    id: 380,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental concurrent features?",
    options: [
      "Time slicing and interruptible rendering",
      "Parallel component execution",
      "Multi-threaded rendering",
      "Async component loading",
    ],
    correctAnswer: 0,
    explanation:
      "Concurrent features include time-slicing, interruptible rendering, and prioritized updates, allowing React to maintain responsiveness during heavy computations.",
  },
  {
    id: 381,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.Children.only?",
    options: [
      "Verify children has only one child",
      "Count children",
      "Filter children",
      "Transform children",
    ],
    correctAnswer: 0,
    explanation:
      "React.Children.only returns the single child in children; if there are zero or more than one, it throws an error, ensuring a single element.",
  },
  {
    id: 382,
    category: "React",
    difficulty: "easy",
    question:
      "What is the purpose of the capture attribute in React file inputs?",
    options: [
      "Specify camera/microphone capture method",
      "Capture files automatically",
      "Set file capture size",
      "Style captured files",
    ],
    correctAnswer: 0,
    explanation:
      "capture lets you specify which camera to use for capturing images or videos on mobile devices (user for front-facing, environment for rear-facing).",
  },
  {
    id: 383,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental useInsertionEffect?",
    options: [
      "For CSS-in-JS to inject styles before paint",
      "For inserting DOM elements",
      "For adding event listeners",
      "For component insertion",
    ],
    correctAnswer: 0,
    explanation:
      "useInsertionEffect fires synchronously before DOM mutations are painted, letting CSS-in-JS libraries inject styles at the exact right time to avoid visual flicker.",
  },
  {
    id: 384,
    category: "React",
    difficulty: "medium",
    question: "What is the difference between useMemo and React.memo?",
    options: [
      "useMemo memoizes values, React.memo memoizes components",
      "No difference",
      "useMemo is for class components",
      "React.memo is deprecated",
    ],
    correctAnswer: 0,
    explanation:
      "useMemo caches a computed value inside a component; React.memo wraps a component to cache its render output based on props.",
  },
  {
    id: 385,
    category: "React",
    difficulty: "easy",
    question:
      "What is the correct way to handle form field dependencies with validation?",
    options: [
      "Using useEffect to watch fields and update validation",
      "Using separate validation functions",
      "Using HTML5 validation only",
      "Using CSS for validation",
    ],
    correctAnswer: 0,
    explanation:
      "useEffect can watch for changes in dependent fields and automatically update validation rules or re-validate when related values change.",
  },
  {
    id: 386,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental useDeferredValue hook?",
    options: [
      "Defer value updates for better responsiveness",
      "Delay value initialization",
      "Cache expensive values",
      "Validate value types",
    ],
    correctAnswer: 0,
    explanation:
      "useDeferredValue returns a version of the value that may lag behind, allowing urgent updates (like typing) to interrupt heavy computations (like filtering large lists).",
  },
  {
    id: 387,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.Children.toArray?",
    options: [
      "Convert children to flat array with keys",
      "Count children",
      "Filter children",
      "Create children",
    ],
    correctAnswer: 0,
    explanation:
      "React.Children.toArray flattens nested children into a flat array and assigns keys to each element, making it easier to manipulate or transform children.",
  },
  {
    id: 388,
    category: "React",
    difficulty: "easy",
    question: "What is the purpose of the list attribute in React inputs?",
    options: [
      "Associate input with a datalist",
      "Create list inputs",
      "Set input as list",
      "Style as list",
    ],
    correctAnswer: 0,
    explanation:
      "list binds an input to a datalist element, providing autocomplete suggestions while still allowing free-form input.",
  },
  {
    id: 389,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental use() hook?",
    options: [
      "Read promises and context conditionally",
      "Use external libraries",
      "Replace all hooks",
      "Component composition",
    ],
    correctAnswer: 0,
    explanation:
      "use() can read the resolved value of a promise or a context value, and—uniquely among hooks—it may be called conditionally inside loops and branches.",
  },
  {
    id: 390,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.forwardRef?",
    options: [
      "Forward refs to child components",
      "Forward props",
      "Forward state",
      "Forward events",
    ],
    correctAnswer: 0,
    explanation:
      "forwardRef creates a component that can pass its ref down to a child, letting a parent component reach into a child's DOM node or instance.",
  },
  {
    id: 391,
    category: "React",
    difficulty: "easy",
    question:
      "What is the correct way to handle form field arrays with dynamic validation?",
    options: [
      "Using array state with validation for each item",
      "Using single validation rule",
      "Using HTML5 validation only",
      "Using external validation libraries only",
    ],
    correctAnswer: 0,
    explanation:
      "Maintain an array of field values and a parallel array or object of validation errors, updating validation whenever fields are added, removed, or changed.",
  },
  {
    id: 392,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental useSyncExternalStore hook?",
    options: [
      "Subscribe to external mutable data sources",
      "Synchronize component state",
      "Manage external APIs",
      "Handle browser storage",
    ],
    correctAnswer: 0,
    explanation:
      "useSyncExternalStore lets a component subscribe to an external mutable store (like a browser API) while remaining concurrent-mode safe and avoiding tearing.",
  },
  {
    id: 393,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.Children.forEach?",
    options: [
      "Iterate over children without returning",
      "Transform children",
      "Count children",
      "Filter children",
    ],
    correctAnswer: 0,
    explanation:
      "React.Children.forEach iterates over each child in children and executes a callback, but unlike map, it does not collect or return an array of results.",
  },
  {
    id: 394,
    category: "React",
    difficulty: "easy",
    question:
      "What is the purpose of the dirname attribute in React form inputs?",
    options: [
      "Submit text direction with form data",
      "Set input direction",
      "Define input name",
      "Style input direction",
    ],
    correctAnswer: 0,
    explanation:
      "dirname submits the text-directionality (ltr or rtl) of the input field along with the form data, useful for multilingual applications.",
  },
  {
    id: 395,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental useId hook?",
    options: [
      "Generate unique IDs for accessibility",
      "Create component identifiers",
      "Generate random numbers",
      "Manage component keys",
    ],
    correctAnswer: 0,
    explanation:
      "useId generates stable, unique IDs across server and client, essential for accessibility attributes like aria-describedby that must not change between renders.",
  },
  {
    id: 396,
    category: "React",
    difficulty: "medium",
    question:
      "What is the purpose of React.PureComponent vs regular Component?",
    options: [
      "PureComponent has built-in shallow comparison",
      "PureComponent is always faster",
      "No difference",
      "Component is deprecated",
    ],
    correctAnswer: 0,
    explanation:
      "PureComponent implements shouldComponentUpdate with a shallow comparison of props and state, automatically skipping re-renders when data hasn't changed.",
  },
  {
    id: 397,
    category: "React",
    difficulty: "easy",
    question:
      "What is the correct way to handle form field calculations in React?",
    options: [
      "Using useEffect to watch dependent fields",
      "Using separate handlers",
      "Using DOM manipulation",
      "Using CSS calculations",
    ],
    correctAnswer: 0,
    explanation:
      "useEffect can watch for changes in dependent fields and automatically recalculate derived values, keeping the form state consistent and reactive.",
  },
  {
    id: 398,
    category: "React",
    difficulty: "hard",
    question: "What is React's experimental concurrent features?",
    options: [
      "Time slicing and interruptible rendering",
      "Parallel component execution",
      "Multi-threaded rendering",
      "Async component loading",
    ],
    correctAnswer: 0,
    explanation:
      "Concurrent features include time-slicing, interruptible rendering, and prioritized updates, allowing React to maintain responsiveness during expensive operations.",
  },
  {
    id: 399,
    category: "React",
    difficulty: "medium",
    question: "What is the purpose of React.Children.count?",
    options: [
      "Count the number of children",
      "Count component instances",
      "Count DOM elements",
      "Count valid React elements",
    ],
    correctAnswer: 0,
    explanation:
      "React.Children.count returns the total number of times a callback passed to React.Children.map would be invoked, effectively counting all children elements.",
  },
  {
    id: 400,
    category: "React",
    difficulty: "easy",
    question:
      "What is the correct way to handle form submission success/error states in React?",
    options: [
      "Using state to manage and display success/error messages",
      "Using alert() functions",
      "Using console.log only",
      "Using HTML5 validation messages",
    ],
    correctAnswer: 0,
    explanation:
      "Maintain state variables for loading, success, and error conditions, then render appropriate UI feedback (spinners, success messages, or error alerts) based on those states.",
  },
];

// 400 questions
export const jsMCQs = [
  {
    id: 1,
    category: "Javascript",
    difficulty: "easy",
    question: "What is the correct way to declare a variable in JavaScript?",
    options: [
      "var myVar = 5;",
      "variable myVar = 5;",
      "v myVar = 5;",
      "declare myVar = 5;",
    ],
    correctAnswer: 0,
    explanation:
      "In JavaScript, variables are declared using var, let, or const keywords. var is the traditional way to declare variables.",
  },
  {
    id: 2,
    category: "Javascript",
    difficulty: "easy",
    question: "What will be the output of: console.log(typeof null)?",
    options: ["null", "undefined", "object", "boolean"],
    correctAnswer: 2,
    explanation:
      'This is a well-known JavaScript quirk. typeof null returns "object" due to a legacy bug in JavaScript that has been kept for backward compatibility.',
  },
  {
    id: 3,
    category: "Javascript",
    difficulty: "easy",
    question: "What is the result of: [1, 2, 3].map(parseInt)?",
    options: ["[1, 2, 3]", "[1, NaN, NaN]", "[1, 2, NaN]", "[NaN, NaN, NaN]"],
    correctAnswer: 1,
    explanation:
      "map passes three arguments to parseInt: (element, index, array). parseInt takes (string, radix). So it becomes parseInt(1,0), parseInt(2,1), parseInt(3,2), resulting in [1, NaN, NaN].",
  },
  {
    id: 4,
    category: "Javascript",
    difficulty: "easy",
    question: "Which method is used to add an element to the end of an array?",
    options: ["append()", "push()", "add()", "insert()"],
    correctAnswer: 1,
    explanation:
      "The push() method adds one or more elements to the end of an array and returns the new length of the array.",
  },
  {
    id: 5,
    category: "Javascript",
    difficulty: "easy",
    question: "What is the difference between == and === in JavaScript?",
    options: [
      "No difference, they are the same",
      "== checks type, === checks value",
      "== checks value only, === checks both type and value",
      "=== is used for assignment, == for comparison",
    ],
    correctAnswer: 2,
    explanation:
      "== performs type coercion and compares values, while === performs strict comparison checking both type and value without coercion.",
  },
  {
    id: 6,
    category: "Javascript",
    difficulty: "easy",
    question: "What will console.log('5' + 3) output?",
    options: ["8", "53", "Error", "undefined"],
    correctAnswer: 1,
    explanation:
      "When using + with a string and number, JavaScript converts the number to string and concatenates them, resulting in '53'.",
  },
  {
    id: 7,
    category: "Javascript",
    difficulty: "easy",
    question:
      "Which of the following is NOT a primitive data type in JavaScript?",
    options: ["string", "boolean", "object", "number"],
    correctAnswer: 2,
    explanation:
      "object is not a primitive data type. The primitive types are: string, number, boolean, undefined, null, symbol, and bigint.",
  },
  {
    id: 8,
    category: "Javascript",
    difficulty: "easy",
    question: "How do you create a function in JavaScript?",
    options: [
      "function myFunction() {}",
      "create myFunction() {}",
      "def myFunction() {}",
      "func myFunction() {}",
    ],
    correctAnswer: 0,
    explanation:
      "Functions in JavaScript are declared using the 'function' keyword followed by the function name and parentheses.",
  },
  {
    id: 9,
    category: "Javascript",
    difficulty: "easy",
    question: "What does the isNaN() function do?",
    options: [
      "Checks if a value is null",
      "Checks if a value is Not a Number",
      "Checks if a value is undefined",
      "Checks if a value is negative",
    ],
    correctAnswer: 1,
    explanation:
      "isNaN() function determines whether a value is NaN (Not a Number) or not.",
  },
  {
    id: 10,
    category: "Javascript",
    difficulty: "easy",
    question: "What will be the output of: console.log(0.1 + 0.2 === 0.3)?",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 1,
    explanation:
      "Due to floating-point precision issues, 0.1 + 0.2 equals 0.30000000000000004, not exactly 0.3.",
  },
  {
    id: 11,
    category: "Javascript",
    difficulty: "easy",
    question: "Which method converts a JSON string into a JavaScript object?",
    options: [
      "JSON.parse()",
      "JSON.stringify()",
      "JSON.convert()",
      "JSON.object()",
    ],
    correctAnswer: 0,
    explanation:
      "JSON.parse() parses a JSON string and returns the corresponding JavaScript object.",
  },
  {
    id: 12,
    category: "Javascript",
    difficulty: "easy",
    question: "What is the correct way to write a JavaScript array?",
    options: [
      "var colors = (1:'red', 2:'green', 3:'blue')",
      "var colors = ['red', 'green', 'blue']",
      "var colors = 'red', 'green', 'blue'",
      "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')",
    ],
    correctAnswer: 1,
    explanation:
      "JavaScript arrays are written with square brackets and comma-separated values.",
  },
  {
    id: 13,
    category: "Javascript",
    difficulty: "easy",
    question: "What will console.log(Boolean('')) output?",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 1,
    explanation:
      "An empty string is falsy in JavaScript, so Boolean('') returns false.",
  },
  {
    id: 14,
    category: "Javascript",
    difficulty: "easy",
    question: "Which operator is used to assign a value to a variable?",
    options: ["*", "=", "-", "x"],
    correctAnswer: 1,
    explanation: "The = operator is used for assignment in JavaScript.",
  },
  {
    id: 15,
    category: "Javascript",
    difficulty: "easy",
    question: "What does the length property return for an array?",
    options: [
      "The last element",
      "The first element",
      "The number of elements",
      "The sum of elements",
    ],
    correctAnswer: 2,
    explanation:
      "The length property returns the number of elements in an array.",
  },
  {
    id: 16,
    category: "Javascript",
    difficulty: "easy",
    question: "What is the output of: console.log(typeof undefined)?",
    options: ["undefined", "object", "null", "string"],
    correctAnswer: 0,
    explanation: "typeof undefined returns 'undefined'.",
  },
  {
    id: 17,
    category: "Javascript",
    difficulty: "easy",
    question: "Which method removes the last element from an array?",
    options: ["pop()", "push()", "shift()", "unshift()"],
    correctAnswer: 0,
    explanation:
      "The pop() method removes and returns the last element from an array.",
  },
  {
    id: 18,
    category: "Javascript",
    difficulty: "easy",
    question: "What will be the result of: '5' - 3?",
    options: ["53", "2", "Error", "undefined"],
    correctAnswer: 1,
    explanation:
      "When using - operator, JavaScript converts the string '5' to number 5, then performs subtraction: 5 - 3 = 2.",
  },
  {
    id: 19,
    category: "Javascript",
    difficulty: "easy",
    question: "How do you write a comment in JavaScript?",
    options: [
      "<!-- This is a comment -->",
      "// This is a comment",
      "'This is a comment",
      "# This is a comment",
    ],
    correctAnswer: 1,
    explanation:
      "Single-line comments in JavaScript start with //. Multi-line comments use /* */.",
  },
  {
    id: 20,
    category: "Javascript",
    difficulty: "easy",
    question: "What is the correct way to write a JavaScript object?",
    options: [
      "var person = (firstName:'John', lastName:'Doe')",
      "var person = ['firstName':'John', 'lastName':'Doe']",
      "var person = {firstName:'John', lastName:'Doe'}",
      "var person = firstName='John', lastName='Doe'",
    ],
    correctAnswer: 2,
    explanation:
      "JavaScript objects are written with curly braces and key-value pairs separated by commas.",
  },
  {
    id: 21,
    category: "Javascript",
    difficulty: "easy",
    question: "What will console.log(!true) output?",
    options: ["true", "false", "1", "0"],
    correctAnswer: 1,
    explanation:
      "The ! operator is the logical NOT operator. !true returns false.",
  },
  {
    id: 22,
    category: "Javascript",
    difficulty: "easy",
    question: "Which method adds an element to the beginning of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    correctAnswer: 3,
    explanation:
      "The unshift() method adds one or more elements to the beginning of an array.",
  },
  {
    id: 23,
    category: "Javascript",
    difficulty: "easy",
    question: "What is the result of: console.log(1 + '1')?",
    options: ["2", "11", "Error", "undefined"],
    correctAnswer: 1,
    explanation:
      "When adding a number and string, JavaScript converts the number to string and concatenates: 1 + '1' = '11'.",
  },
  {
    id: 24,
    category: "Javascript",
    difficulty: "easy",
    question: "Which keyword is used to declare a constant in JavaScript?",
    options: ["var", "let", "const", "final"],
    correctAnswer: 2,
    explanation:
      "The const keyword is used to declare constants that cannot be reassigned.",
  },
  {
    id: 25,
    category: "Javascript",
    difficulty: "easy",
    question: "What does the parseInt() function do?",
    options: [
      "Converts string to integer",
      "Converts integer to string",
      "Checks if value is integer",
      "Creates random integer",
    ],
    correctAnswer: 0,
    explanation: "parseInt() parses a string and returns an integer.",
  },
  {
    id: 26,
    category: "Javascript",
    difficulty: "easy",
    question: "What will be the output of: console.log(typeof [])?",
    options: ["array", "object", "undefined", "list"],
    correctAnswer: 1,
    explanation:
      "In JavaScript, arrays are actually objects, so typeof [] returns 'object'.",
  },
  {
    id: 27,
    category: "Javascript",
    difficulty: "easy",
    question: "Which method removes the first element from an array?",
    options: ["shift()", "unshift()", "pop()", "push()"],
    correctAnswer: 0,
    explanation:
      "The shift() method removes and returns the first element from an array.",
  },
  {
    id: 28,
    category: "Javascript",
    difficulty: "easy",
    question: "What is the output of: console.log(5 == '5')?",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 0,
    explanation:
      "== performs type coercion, so 5 == '5' returns true because '5' is converted to 5.",
  },
  {
    id: 29,
    category: "Javascript",
    difficulty: "easy",
    question: "How do you access the first element of an array named 'fruits'?",
    options: ["fruits[1]", "fruits[0]", "fruits.first()", "fruits.get(0)"],
    correctAnswer: 1,
    explanation:
      "Arrays are zero-indexed in JavaScript, so the first element is accessed with [0].",
  },
  {
    id: 30,
    category: "Javascript",
    difficulty: "easy",
    question: "What will console.log(Boolean(0)) output?",
    options: ["true", "false", "0", "undefined"],
    correctAnswer: 1,
    explanation: "0 is falsy in JavaScript, so Boolean(0) returns false.",
  },
  {
    id: 31,
    category: "Javascript",
    difficulty: "easy",
    question: "Which method converts a JavaScript object to a JSON string?",
    options: ["JSON.parse()", "JSON.stringify()", "toString()", "String()"],
    correctAnswer: 1,
    explanation:
      "JSON.stringify() converts a JavaScript object to a JSON string.",
  },
  {
    id: 32,
    category: "Javascript",
    difficulty: "easy",
    question: "What is the result of: console.log('10' - 5)?",
    options: ["105", "5", "Error", "undefined"],
    correctAnswer: 1,
    explanation:
      "The - operator converts '10' to number 10, then performs subtraction: 10 - 5 = 5.",
  },
  {
    id: 33,
    category: "Javascript",
    difficulty: "easy",
    question:
      "Which of the following is the correct way to create a new Date object?",
    options: ["new Date()", "Date.new()", "create Date()", "Date()"],
    correctAnswer: 0,
    explanation:
      "new Date() is the correct syntax to create a new Date object in JavaScript.",
  },
  {
    id: 34,
    category: "Javascript",
    difficulty: "easy",
    question: "What will console.log(undefined == null) output?",
    options: ["true", "false", "undefined", "null"],
    correctAnswer: 0,
    explanation:
      "undefined == null returns true because they are considered equal with loose equality.",
  },
  {
    id: 35,
    category: "Javascript",
    difficulty: "easy",
    question:
      "Which method returns the character at a specified index in a string?",
    options: ["charAt()", "getChar()", "character()", "index()"],
    correctAnswer: 0,
    explanation:
      "The charAt() method returns the character at a specified index in a string.",
  },
  {
    id: 36,
    category: "Javascript",
    difficulty: "easy",
    question: "What is the output of: console.log(typeof NaN)?",
    options: ["NaN", "undefined", "number", "object"],
    correctAnswer: 2,
    explanation:
      "Despite being 'Not a Number', NaN has the type 'number' in JavaScript.",
  },
  {
    id: 37,
    category: "Javascript",
    difficulty: "easy",
    question: "Which loop is guaranteed to execute at least once?",
    options: ["for", "while", "do-while", "forEach"],
    correctAnswer: 2,
    explanation:
      "do-while loop executes the code block at least once before checking the condition.",
  },
  {
    id: 38,
    category: "Javascript",
    difficulty: "easy",
    question: "What will be the result of: console.log(3 * '3')?",
    options: ["33", "9", "Error", "undefined"],
    correctAnswer: 1,
    explanation:
      "The * operator converts '3' to number 3, then performs multiplication: 3 * 3 = 9.",
  },
  {
    id: 39,
    category: "Javascript",
    difficulty: "easy",
    question: "How do you find the length of a string in JavaScript?",
    options: ["str.size", "str.length", "str.count()", "str.size()"],
    correctAnswer: 1,
    explanation:
      "The length property returns the number of characters in a string.",
  },
  {
    id: 40,
    category: "Javascript",
    difficulty: "easy",
    question: "What will console.log(true + false) output?",
    options: ["truefalse", "1", "0", "Error"],
    correctAnswer: 1,
    explanation:
      "true converts to 1 and false converts to 0, so true + false = 1 + 0 = 1.",
  },
  {
    id: 41,
    category: "Javascript",
    difficulty: "easy",
    question: "Which method joins all elements of an array into a string?",
    options: ["join()", "concat()", "merge()", "combine()"],
    correctAnswer: 0,
    explanation:
      "The join() method joins all elements of an array into a string.",
  },
  {
    id: 42,
    category: "Javascript",
    difficulty: "easy",
    question: "What is the output of: console.log(!!0)?",
    options: ["true", "false", "0", "undefined"],
    correctAnswer: 1,
    explanation: "!!0 converts 0 to boolean. !0 is true, then !true is false.",
  },
  {
    id: 43,
    category: "Javascript",
    difficulty: "easy",
    question: "Which method converts a string to uppercase?",
    options: ["toUpper()", "toUpperCase()", "upper()", "upperCase()"],
    correctAnswer: 1,
    explanation:
      "The toUpperCase() method converts a string to uppercase letters.",
  },
  {
    id: 44,
    category: "Javascript",
    difficulty: "easy",
    question: "What will be the result of: console.log('5' * '2')?",
    options: ["52", "10", "Error", "undefined"],
    correctAnswer: 1,
    explanation: "The * operator converts both strings to numbers: 5 * 2 = 10.",
  },
  {
    id: 45,
    category: "Javascript",
    difficulty: "easy",
    question: "Which keyword is used to exit from a loop?",
    options: ["exit", "break", "stop", "end"],
    correctAnswer: 1,
    explanation:
      "The break keyword is used to exit from a loop or switch statement.",
  },
  {
    id: 46,
    category: "Javascript",
    difficulty: "easy",
    question: "What does the Math.floor() function do?",
    options: [
      "Rounds up to nearest integer",
      "Rounds down to nearest integer",
      "Rounds to nearest integer",
      "Returns decimal part",
    ],
    correctAnswer: 1,
    explanation:
      "Math.floor() returns the largest integer less than or equal to a number (rounds down).",
  },
  {
    id: 47,
    category: "Javascript",
    difficulty: "easy",
    question: "What will console.log(undefined === null) output?",
    options: ["true", "false", "undefined", "null"],
    correctAnswer: 1,
    explanation:
      "undefined === null returns false because they are different types.",
  },
  {
    id: 48,
    category: "Javascript",
    difficulty: "easy",
    question: "Which method checks if an array includes a certain element?",
    options: ["contains()", "includes()", "has()", "find()"],
    correctAnswer: 1,
    explanation:
      "The includes() method checks if an array includes a certain element.",
  },
  {
    id: 49,
    category: "Javascript",
    difficulty: "easy",
    question: "What is the output of: console.log(2 + 3 + '4')?",
    options: ["234", "54", "9", "Error"],
    correctAnswer: 1,
    explanation:
      "Left to right evaluation: 2 + 3 = 5, then 5 + '4' = '54' (string concatenation).",
  },
  {
    id: 50,
    category: "Javascript",
    difficulty: "easy",
    question:
      "Which method returns a new array with all elements that pass a test?",
    options: ["map()", "filter()", "reduce()", "forEach()"],
    correctAnswer: 1,
    explanation:
      "The filter() method creates a new array with elements that pass a test function.",
  },
  {
    id: 51,
    category: "Javascript",
    difficulty: "easy",
    question: "What will be the result of: console.log(!0)?",
    options: ["true", "false", "0", "1"],
    correctAnswer: 0,
    explanation: "0 is falsy, so !0 (NOT 0) returns true.",
  },
  {
    id: 52,
    category: "Javascript",
    difficulty: "easy",
    question: "Which method converts a string to lowercase?",
    options: ["toLower()", "toLowerCase()", "lower()", "lowerCase()"],
    correctAnswer: 1,
    explanation:
      "The toLowerCase() method converts a string to lowercase letters.",
  },
  {
    id: 53,
    category: "Javascript",
    difficulty: "easy",
    question: "What is the output of: console.log(String(123))?",
    options: ["123", "Error", "undefined", "String"],
    correctAnswer: 0,
    explanation: "String(123) converts the number 123 to the string '123'.",
  },
  {
    id: 54,
    category: "Javascript",
    difficulty: "easy",
    question: "Which operator is used for modulus (remainder) operation?",
    options: ["%", "mod", "//", "rem"],
    correctAnswer: 0,
    explanation:
      "The % operator returns the remainder of a division operation.",
  },
  {
    id: 55,
    category: "Javascript",
    difficulty: "easy",
    question: "What will console.log([] + []) output?",
    options: ["[]", "Error", "Empty string", "undefined"],
    correctAnswer: 2,
    explanation:
      "When arrays are added, they're converted to strings. Empty arrays become empty strings, so '' + '' = ''.",
  },
  {
    id: 56,
    category: "Javascript",
    difficulty: "easy",
    question:
      "Which method returns the index of the first occurrence of a specified value?",
    options: ["find()", "search()", "indexOf()", "locate()"],
    correctAnswer: 2,
    explanation:
      "The indexOf() method returns the index of the first occurrence of a specified value.",
  },
  {
    id: 57,
    category: "Javascript",
    difficulty: "easy",
    question: "What is the result of: console.log(10 % 3)?",
    options: ["3", "1", "0", "10"],
    correctAnswer: 1,
    explanation: "10 divided by 3 is 3 with remainder 1, so 10 % 3 = 1.",
  },
  {
    id: 58,
    category: "Javascript",
    difficulty: "easy",
    question:
      "Which method creates a new array by calling a function for every array element?",
    options: ["forEach()", "map()", "filter()", "reduce()"],
    correctAnswer: 1,
    explanation:
      "The map() method creates a new array by calling a function for every array element.",
  },
  {
    id: 59,
    category: "Javascript",
    difficulty: "easy",
    question: "What will be the output of: console.log(Number('123'))?",
    options: ["123", "Error", "undefined", "String"],
    correctAnswer: 0,
    explanation: "Number('123') converts the string '123' to the number 123.",
  },
  {
    id: 60,
    category: "Javascript",
    difficulty: "easy",
    question: "Which keyword is used to skip the current iteration of a loop?",
    options: ["skip", "continue", "next", "pass"],
    correctAnswer: 1,
    explanation:
      "The continue keyword skips the current iteration and continues with the next iteration of the loop.",
  },
  {
    id: 61,
    category: "Javascript",
    difficulty: "easy",
    question: "What is the output of: console.log(false || true)?",
    options: ["false", "true", "undefined", "Error"],
    correctAnswer: 1,
    explanation:
      "The || (OR) operator returns true if at least one operand is true.",
  },
  {
    id: 62,
    category: "Javascript",
    difficulty: "easy",
    question: "Which method splits a string into an array of substrings?",
    options: ["split()", "slice()", "substr()", "divide()"],
    correctAnswer: 0,
    explanation:
      "The split() method splits a string into an array of substrings.",
  },
  {
    id: 63,
    category: "Javascript",
    difficulty: "easy",
    question: "What will console.log(1 && 0) output?",
    options: ["1", "0", "true", "false"],
    correctAnswer: 1,
    explanation:
      "The && operator returns the first falsy value it encounters, which is 0.",
  },
  {
    id: 64,
    category: "Javascript",
    difficulty: "easy",
    question: "Which method returns a portion of a string?",
    options: ["slice()", "split()", "splice()", "cut()"],
    correctAnswer: 0,
    explanation:
      "The slice() method returns a portion of a string between start and end indices.",
  },
  {
    id: 65,
    category: "Javascript",
    difficulty: "easy",
    question: "What is the result of: console.log(Math.ceil(4.2))?",
    options: ["4", "5", "4.2", "Error"],
    correctAnswer: 1,
    explanation:
      "Math.ceil() rounds up to the nearest integer, so Math.ceil(4.2) = 5.",
  },
  {
    id: 66,
    category: "Javascript",
    difficulty: "easy",
    question: "Which method removes whitespace from both ends of a string?",
    options: ["trim()", "strip()", "clean()", "remove()"],
    correctAnswer: 0,
    explanation:
      "The trim() method removes whitespace from both ends of a string.",
  },
  {
    id: 67,
    category: "Javascript",
    difficulty: "easy",
    question: "What will be the output of: console.log(5 > 3 && 2 < 4)?",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 0,
    explanation:
      "Both 5 > 3 and 2 < 4 are true, so the && operation returns true.",
  },
  {
    id: 68,
    category: "Javascript",
    difficulty: "easy",
    question: "Which method replaces specified values in a string?",
    options: ["replace()", "substitute()", "change()", "swap()"],
    correctAnswer: 0,
    explanation:
      "The replace() method replaces specified values in a string with other values.",
  },
  {
    id: 69,
    category: "Javascript",
    difficulty: "easy",
    question: "What is the output of: console.log(Math.round(4.7))?",
    options: ["4", "5", "4.7", "Error"],
    correctAnswer: 1,
    explanation:
      "Math.round() rounds to the nearest integer, so Math.round(4.7) = 5.",
  },
  {
    id: 70,
    category: "Javascript",
    difficulty: "easy",
    question:
      "Which method checks if a string starts with specified characters?",
    options: ["startsWith()", "beginsWith()", "starts()", "begins()"],
    correctAnswer: 0,
    explanation:
      "The startsWith() method checks if a string starts with specified characters.",
  },
  {
    id: 71,
    category: "Javascript",
    difficulty: "easy",
    question: "What will console.log(5 || 0) output?",
    options: ["5", "0", "true", "false"],
    correctAnswer: 0,
    explanation: "The || operator returns the first truthy value, which is 5.",
  },
  {
    id: 72,
    category: "Javascript",
    difficulty: "easy",
    question: "Which method checks if a string ends with specified characters?",
    options: ["endsWith()", "ends()", "finishes()", "concludes()"],
    correctAnswer: 0,
    explanation:
      "The endsWith() method checks if a string ends with specified characters.",
  },
  {
    id: 73,
    category: "Javascript",
    difficulty: "easy",
    question: "What is the result of: console.log(Number.isInteger(5))?",
    options: ["true", "false", "5", "undefined"],
    correctAnswer: 0,
    explanation: "Number.isInteger(5) returns true because 5 is an integer.",
  },
  {
    id: 74,
    category: "Javascript",
    difficulty: "easy",
    question: "Which method returns the absolute value of a number?",
    options: ["Math.abs()", "Math.absolute()", "abs()", "absolute()"],
    correctAnswer: 0,
    explanation: "Math.abs() returns the absolute value of a number.",
  },
  {
    id: 75,
    category: "Javascript",
    difficulty: "easy",
    question: "What will be the output of: console.log(0 && 5)?",
    options: ["0", "5", "true", "false"],
    correctAnswer: 0,
    explanation:
      "The && operator returns the first falsy value it encounters, which is 0.",
  },
  {
    id: 76,
    category: "Javascript",
    difficulty: "easy",
    question: "Which method returns the largest of zero or more numbers?",
    options: ["Math.max()", "Math.maximum()", "max()", "maximum()"],
    correctAnswer: 0,
    explanation: "Math.max() returns the largest of zero or more numbers.",
  },
  {
    id: 77,
    category: "Javascript",
    difficulty: "easy",
    question: "What is the output of: console.log(Array.isArray([]))?",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 0,
    explanation: "Array.isArray([]) returns true because [] is an array.",
  },
  {
    id: 78,
    category: "Javascript",
    difficulty: "easy",
    question: "Which method returns the smallest of zero or more numbers?",
    options: ["Math.min()", "Math.minimum()", "min()", "minimum()"],
    correctAnswer: 0,
    explanation: "Math.min() returns the smallest of zero or more numbers.",
  },
  {
    id: 79,
    category: "Javascript",
    difficulty: "easy",
    question: "What will console.log(true && 'hello') output?",
    options: ["true", "hello", "false", "undefined"],
    correctAnswer: 1,
    explanation:
      "The && operator returns the last truthy value when all values are truthy, which is 'hello'.",
  },
  {
    id: 80,
    category: "Javascript",
    difficulty: "easy",
    question: "Which method returns a random number between 0 and 1?",
    options: ["Math.random()", "Math.rand()", "random()", "rand()"],
    correctAnswer: 0,
    explanation:
      "Math.random() returns a random number between 0 (inclusive) and 1 (exclusive).",
  },
  {
    id: 81,
    category: "Javascript",
    difficulty: "easy",
    question: "What is the result of: console.log('Hello'.length)?",
    options: ["5", "4", "6", "undefined"],
    correctAnswer: 0,
    explanation: "The string 'Hello' has 5 characters, so its length is 5.",
  },
  {
    id: 82,
    category: "Javascript",
    difficulty: "easy",
    question: "Which method executes a function for each array element?",
    options: ["forEach()", "each()", "iterate()", "loop()"],
    correctAnswer: 0,
    explanation:
      "The forEach() method executes a provided function once for each array element.",
  },
  {
    id: 83,
    category: "Javascript",
    difficulty: "easy",
    question: "What will be the output of: console.log(false && 'hello')?",
    options: ["false", "hello", "true", "undefined"],
    correctAnswer: 0,
    explanation:
      "The && operator returns the first falsy value, which is false.",
  },
  {
    id: 84,
    category: "Javascript",
    difficulty: "easy",
    question: "Which method returns the square root of a number?",
    options: ["Math.sqrt()", "Math.squareRoot()", "sqrt()", "squareRoot()"],
    correctAnswer: 0,
    explanation: "Math.sqrt() returns the square root of a number.",
  },
  {
    id: 85,
    category: "Javascript",
    difficulty: "easy",
    question: "What is the output of: console.log(null || 'default')?",
    options: ["null", "default", "true", "false"],
    correctAnswer: 1,
    explanation:
      "The || operator returns the first truthy value, which is 'default'.",
  },
  {
    id: 86,
    category: "Javascript",
    difficulty: "easy",
    question: "Which method returns the power of a number?",
    options: ["Math.pow()", "Math.power()", "pow()", "power()"],
    correctAnswer: 0,
    explanation:
      "Math.pow(base, exponent) returns the base to the exponent power.",
  },
  {
    id: 87,
    category: "Javascript",
    difficulty: "easy",
    question: "What will console.log('abc'.indexOf('b')) output?",
    options: ["0", "1", "2", "-1"],
    correctAnswer: 1,
    explanation: "The character 'b' is at index 1 in the string 'abc'.",
  },
  {
    id: 88,
    category: "Javascript",
    difficulty: "easy",
    question: "Which keyword is used to declare a block-scoped variable?",
    options: ["var", "let", "const", "block"],
    correctAnswer: 1,
    explanation:
      "The let keyword declares a block-scoped variable that can be reassigned.",
  },
  {
    id: 89,
    category: "Javascript",
    difficulty: "easy",
    question: "What is the result of: console.log(Boolean([]))?",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 0,
    explanation:
      "An empty array is truthy in JavaScript, so Boolean([]) returns true.",
  },
  {
    id: 90,
    category: "Javascript",
    difficulty: "easy",
    question: "Which method reverses the elements in an array?",
    options: ["reverse()", "invert()", "flip()", "backward()"],
    correctAnswer: 0,
    explanation:
      "The reverse() method reverses the elements in an array in place.",
  },
  {
    id: 91,
    category: "Javascript",
    difficulty: "easy",
    question: "What will be the output of: console.log(undefined || 'hello')?",
    options: ["undefined", "hello", "true", "false"],
    correctAnswer: 1,
    explanation:
      "The || operator returns the first truthy value, which is 'hello'.",
  },
  {
    id: 92,
    category: "Javascript",
    difficulty: "easy",
    question: "Which method sorts the elements of an array?",
    options: ["sort()", "order()", "arrange()", "organize()"],
    correctAnswer: 0,
    explanation: "The sort() method sorts the elements of an array in place.",
  },
  {
    id: 93,
    category: "Javascript",
    difficulty: "easy",
    question: "What is the output of: console.log('5' == 5)?",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 0,
    explanation:
      "The == operator performs type coercion, so '5' == 5 returns true.",
  },
  {
    id: 94,
    category: "Javascript",
    difficulty: "easy",
    question:
      "Which method finds the first element that satisfies a testing function?",
    options: ["find()", "search()", "locate()", "detect()"],
    correctAnswer: 0,
    explanation:
      "The find() method returns the first element that satisfies a testing function.",
  },
  {
    id: 95,
    category: "Javascript",
    difficulty: "easy",
    question: "What will console.log('' || 'default') output?",
    options: ["Empty string", "default", "true", "false"],
    correctAnswer: 1,
    explanation:
      "The || operator returns the first truthy value. Empty string is falsy, so it returns 'default'.",
  },
  {
    id: 96,
    category: "Javascript",
    difficulty: "easy",
    question: "Which method concatenates two or more arrays?",
    options: ["concat()", "merge()", "join()", "combine()"],
    correctAnswer: 0,
    explanation:
      "The concat() method concatenates two or more arrays and returns a new array.",
  },
  {
    id: 97,
    category: "Javascript",
    difficulty: "easy",
    question: "What is the result of: console.log(5 === '5')?",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 1,
    explanation:
      "The === operator checks both type and value. 5 (number) !== '5' (string), so it returns false.",
  },
  {
    id: 98,
    category: "Javascript",
    difficulty: "easy",
    question: "Which method reduces an array to a single value?",
    options: ["reduce()", "sum()", "total()", "aggregate()"],
    correctAnswer: 0,
    explanation:
      "The reduce() method executes a reducer function on each element, resulting in a single value.",
  },
  {
    id: 99,
    category: "Javascript",
    difficulty: "easy",
    question: "What will be the output of: console.log(NaN == NaN)?",
    options: ["true", "false", "NaN", "undefined"],
    correctAnswer: 1,
    explanation:
      "NaN is not equal to anything, including itself. NaN == NaN returns false.",
  },
  {
    id: 100,
    category: "Javascript",
    difficulty: "easy",
    question: "Which method checks if every element in an array passes a test?",
    options: ["every()", "all()", "check()", "validate()"],
    correctAnswer: 0,
    explanation:
      "The every() method tests whether all elements in an array pass a test function.",
  },
  {
    id: 101,
    category: "Javascript",
    difficulty: "medium",
    question: "What will be the output of: console.log(1 + 2 + '3' + 4 + 5)?",
    options: ["33345", "12345", "345", "15"],
    correctAnswer: 0,
    explanation:
      "Left to right: 1+2=3, then 3+'3'='33', then '33'+4='334', then '334'+5='33345'.",
  },
  {
    id: 102,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the output of: console.log([] == false)?",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 0,
    explanation:
      "[] is converted to '', and '' == false is true due to type coercion.",
  },
  {
    id: 103,
    category: "Javascript",
    difficulty: "medium",
    question:
      "What will this code output? var a = 1; function test() { console.log(a); var a = 2; }; test();",
    options: ["1", "2", "undefined", "Error"],
    correctAnswer: 2,
    explanation:
      "Due to hoisting, var a is declared but not initialized when console.log runs, so it's undefined.",
  },
  {
    id: 104,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the result of: console.log(0.1 + 0.2 == 0.3)?",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 1,
    explanation:
      "Due to floating-point precision, 0.1 + 0.2 equals 0.30000000000000004, not exactly 0.3.",
  },
  {
    id: 105,
    category: "Javascript",
    difficulty: "medium",
    question:
      "What will console.log((function(){ return arguments; })(1,2,3)) output?",
    options: ["[1,2,3]", "Arguments object", "Error", "undefined"],
    correctAnswer: 1,
    explanation:
      "The arguments object is returned, which is an array-like object containing the passed arguments.",
  },
  {
    id: 106,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the output of: console.log(typeof typeof 1)?",
    options: ["number", "string", "undefined", "object"],
    correctAnswer: 1,
    explanation:
      "typeof 1 is 'number' (string), then typeof 'number' is 'string'.",
  },
  {
    id: 107,
    category: "Javascript",
    difficulty: "medium",
    question:
      "What will this output? for(var i = 0; i < 3; i++) { setTimeout(() => console.log(i), 100); }",
    options: ["0 1 2", "3 3 3", "undefined", "Error"],
    correctAnswer: 1,
    explanation:
      "Due to closure and var hoisting, all callbacks reference the same i which is 3 after the loop.",
  },
  {
    id: 108,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the result of: console.log([] + {} + [])?",
    options: ["[object Object]", "Error", "undefined", "{}"],
    correctAnswer: 0,
    explanation:
      "[] becomes '', {} becomes '[object Object]', [] becomes '', so '' + '[object Object]' + '' = '[object Object]'.",
  },
  {
    id: 109,
    category: "Javascript",
    difficulty: "medium",
    question: "What will be the output of: console.log(+'10' + +'20')?",
    options: ["1020", "30", "Error", "undefined"],
    correctAnswer: 1,
    explanation:
      "The unary + converts strings to numbers: +'10' = 10, +'20' = 20, then 10 + 20 = 30.",
  },
  {
    id: 110,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the output of: console.log(!!'false' == !!'true')?",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 0,
    explanation:
      "Both 'false' and 'true' are truthy strings, so !!'false' and !!'true' are both true.",
  },
  {
    id: 111,
    category: "Javascript",
    difficulty: "medium",
    question: "What will this code output? console.log(1 < 2 < 3);",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 0,
    explanation:
      "Left to right: 1 < 2 is true, then true < 3 becomes 1 < 3, which is true.",
  },
  {
    id: 112,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the result of: console.log(3 > 2 > 1)?",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 1,
    explanation:
      "Left to right: 3 > 2 is true, then true > 1 becomes 1 > 1, which is false.",
  },
  {
    id: 113,
    category: "Javascript",
    difficulty: "medium",
    question: "What will console.log(function f(){ return f; }()) output?",
    options: ["undefined", "Function f", "Error", "null"],
    correctAnswer: 1,
    explanation:
      "The function returns itself (function f), so it outputs the function definition.",
  },
  {
    id: 114,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the output of: console.log(delete Array.prototype)?",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 1,
    explanation:
      "Cannot delete Array.prototype as it's a non-configurable property, so delete returns false.",
  },
  {
    id: 115,
    category: "Javascript",
    difficulty: "medium",
    question: "What will be the output of: console.log(setTimeout)?",
    options: ["undefined", "Function", "Error", "0"],
    correctAnswer: 1,
    explanation:
      "setTimeout is a function, so it outputs the function definition or [native code].",
  },
  {
    id: 116,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the result of: console.log(Math.min() > Math.max())?",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 0,
    explanation:
      "Math.min() with no arguments returns Infinity, Math.max() returns -Infinity, so Infinity > -Infinity is true.",
  },
  {
    id: 117,
    category: "Javascript",
    difficulty: "medium",
    question:
      "What will this output? let x = [1,2,3]; let y = x; y.push(4); console.log(x);",
    options: ["[1,2,3]", "[1,2,3,4]", "Error", "undefined"],
    correctAnswer: 1,
    explanation:
      "Arrays are reference types. y and x point to the same array, so modifying y affects x.",
  },
  {
    id: 118,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the output of: console.log('5' - - '5')?",
    options: ["0", "10", "Error", "undefined"],
    correctAnswer: 1,
    explanation:
      "- -'5' is equivalent to -(-5) = 5, then '5' - 5 = 0... wait, '5' - 5 = 0, but '5' - -'5' = '5' - (-5) = 5 + 5 = 10.",
  },
  {
    id: 119,
    category: "Javascript",
    difficulty: "medium",
    question: "What will be the output of: console.log([] == ![]);",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 0,
    explanation:
      "![] is false (negation of truthy array), then [] == false becomes '' == false, which is true.",
  },
  {
    id: 120,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the result of: console.log(({}+{}).length)?",
    options: ["2", "30", "Error", "undefined"],
    correctAnswer: 1,
    explanation:
      "{}+{} becomes '[object Object][object Object]', which has length 30.",
  },
  {
    id: 121,
    category: "Javascript",
    difficulty: "medium",
    question: "What will this code output? console.log(0 || 1 && 2);",
    options: ["0", "1", "2", "true"],
    correctAnswer: 2,
    explanation:
      "Due to operator precedence, && is evaluated first: 1 && 2 = 2, then 0 || 2 = 2.",
  },
  {
    id: 122,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the output of: console.log(new Array(3).join('#'));",
    options: ["###", "##", "#", "Error"],
    correctAnswer: 1,
    explanation:
      "new Array(3) creates array with 3 empty slots. join('#') puts # between elements, so 2 #'s for 3 slots.",
  },
  {
    id: 123,
    category: "Javascript",
    difficulty: "medium",
    question: "What will console.log(Number.MIN_VALUE > 0) output?",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 0,
    explanation:
      "Number.MIN_VALUE is the smallest positive number greater than 0, so it's greater than 0.",
  },
  {
    id: 124,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the result of: console.log('hello'[1]);",
    options: ["h", "e", "l", "undefined"],
    correctAnswer: 1,
    explanation:
      "Strings can be accessed like arrays. 'hello'[1] returns the character at index 1, which is 'e'.",
  },
  {
    id: 125,
    category: "Javascript",
    difficulty: "medium",
    question:
      "What will this output? function test() { return { a: 1 }; } console.log(test().a);",
    options: ["1", "undefined", "Error", "{}"],
    correctAnswer: 0,
    explanation:
      "The function returns an object {a: 1}, so test().a accesses the property a, which is 1.",
  },
  {
    id: 126,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the output of: console.log(parseInt('08', 10));",
    options: ["8", "0", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "parseInt('08', 10) parses '08' in base 10 (decimal), resulting in 8.",
  },
  {
    id: 127,
    category: "Javascript",
    difficulty: "medium",
    question: "What will console.log(1/0 === Infinity) output?",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 0,
    explanation:
      "Division by zero in JavaScript results in Infinity, so 1/0 === Infinity is true.",
  },
  {
    id: 128,
    category: "Javascript",
    difficulty: "medium",
    question:
      "What is the result of: console.log(Object.prototype.toString.call([]));",
    options: ["[object Array]", "[object Object]", "Array", "Error"],
    correctAnswer: 0,
    explanation:
      "Object.prototype.toString.call([]) returns '[object Array]' for arrays.",
  },
  {
    id: 129,
    category: "Javascript",
    difficulty: "medium",
    question:
      "What will this code output? let a = {b: 1}; let c = a; c.b = 2; console.log(a.b);",
    options: ["1", "2", "undefined", "Error"],
    correctAnswer: 1,
    explanation:
      "Objects are reference types. c and a reference the same object, so modifying c.b affects a.b.",
  },
  {
    id: 130,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the output of: console.log(Array(3) == Array(3));",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 1,
    explanation:
      "Each Array(3) creates a new array object. Objects are compared by reference, not value.",
  },
  {
    id: 131,
    category: "Javascript",
    difficulty: "medium",
    question: "What will console.log([1,2,3].slice(-1)) output?",
    options: ["[3]", "[1,2]", "3", "Error"],
    correctAnswer: 0,
    explanation:
      "slice(-1) returns the last element(s) as an array. -1 means start from the last element.",
  },
  {
    id: 132,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the result of: console.log(void 0 === undefined);",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 0,
    explanation:
      "void operator always returns undefined, so void 0 === undefined is true.",
  },
  {
    id: 133,
    category: "Javascript",
    difficulty: "medium",
    question:
      "What will this output? const obj = {}; obj[Symbol.iterator] = null; console.log(obj[Symbol.iterator]);",
    options: ["null", "undefined", "Symbol", "Error"],
    correctAnswer: 0,
    explanation:
      "We explicitly set obj[Symbol.iterator] to null, so it returns null.",
  },
  {
    id: 134,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the output of: console.log(false == '0');",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 0,
    explanation:
      "With loose equality, false is converted to 0 and '0' is converted to 0, so 0 == 0 is true.",
  },
  {
    id: 135,
    category: "Javascript",
    difficulty: "medium",
    question:
      "What will console.log(String.prototype.split.call(12345, '')) output?",
    options: ["['1','2','3','4','5']", "Error", "12345", "['12345']"],
    correctAnswer: 0,
    explanation:
      "String.prototype.split.call converts 12345 to '12345', then splits into individual characters.",
  },
  {
    id: 136,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the result of: console.log([1] + [2]);",
    options: ["12", "3", "[1,2]", "Error"],
    correctAnswer: 0,
    explanation:
      "Arrays are converted to strings: [1] becomes '1', [2] becomes '2', then '1' + '2' = '12'.",
  },
  {
    id: 137,
    category: "Javascript",
    difficulty: "medium",
    question:
      "What will this code output? function test() { arguments[0] = 'changed'; console.log(arguments[0]); } test('original');",
    options: ["original", "changed", "undefined", "Error"],
    correctAnswer: 1,
    explanation:
      "The arguments object is mutable, so changing arguments[0] modifies the first argument.",
  },
  {
    id: 138,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the output of: console.log(Date.now() === Date.now());",
    options: ["true", "false", "undefined", "Depends on timing"],
    correctAnswer: 3,
    explanation:
      "Date.now() returns current timestamp. Two calls might return different values due to time passage.",
  },
  {
    id: 139,
    category: "Javascript",
    difficulty: "medium",
    question: "What will console.log([...'abc']) output?",
    options: ["['a','b','c']", "'abc'", "Error", "['abc']"],
    correctAnswer: 0,
    explanation:
      "The spread operator spreads the string 'abc' into individual characters in an array.",
  },
  {
    id: 140,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the result of: console.log(Number(''))?",
    options: ["0", "NaN", "undefined", "Error"],
    correctAnswer: 0,
    explanation:
      "An empty string is converted to 0 when using Number() constructor.",
  },
  {
    id: 141,
    category: "Javascript",
    difficulty: "medium",
    question:
      "What will this output? const a = [1,2,3]; const b = [...a]; b.push(4); console.log(a.length);",
    options: ["3", "4", "undefined", "Error"],
    correctAnswer: 0,
    explanation:
      "The spread operator creates a shallow copy. Modifying b doesn't affect the original array a.",
  },
  {
    id: 142,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the output of: console.log(+!![]);",
    options: ["0", "1", "true", "false"],
    correctAnswer: 1,
    explanation: "[] is truthy, !![] is true, +true converts to 1.",
  },
  {
    id: 143,
    category: "Javascript",
    difficulty: "medium",
    question: "What will console.log('b' + 'a' + + 'a' + 'a') output?",
    options: ["baNaNa", "baaa", "Error", "ba+aa"],
    correctAnswer: 0,
    explanation: "'b' + 'a' + (+'a') + 'a' = 'ba' + NaN + 'a' = 'baNaNa'.",
  },
  {
    id: 144,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the result of: console.log(!!null || !!undefined);",
    options: ["true", "false", "null", "undefined"],
    correctAnswer: 1,
    explanation:
      "!!null is false, !!undefined is false, so false || false is false.",
  },
  {
    id: 145,
    category: "Javascript",
    difficulty: "medium",
    question: "What will this code output? console.log(Array.from('hello'));",
    options: ["['h','e','l','l','o']", "'hello'", "Error", "hello"],
    correctAnswer: 0,
    explanation:
      "Array.from() creates an array from an iterable. Strings are iterable, so it creates an array of characters.",
  },
  {
    id: 146,
    category: "Javascript",
    difficulty: "medium",
    question:
      "What is the output of: console.log(Math.pow(2, 53) === Math.pow(2, 53) + 1);",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 0,
    explanation:
      "At the limit of JavaScript's number precision, Math.pow(2, 53) + 1 equals Math.pow(2, 53).",
  },
  {
    id: 147,
    category: "Javascript",
    difficulty: "medium",
    question: "What will console.log([0] == false) output?",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 0,
    explanation:
      "[0] converts to '0', false converts to 0, then '0' == 0 is true due to type coercion.",
  },
  {
    id: 148,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the result of: console.log(RegExp.$1);",
    options: ["undefined", "Error", "$1", "Empty string"],
    correctAnswer: 3,
    explanation:
      "RegExp.$1 is a deprecated property that holds the first captured group, initially empty string.",
  },
  {
    id: 149,
    category: "Javascript",
    difficulty: "medium",
    question:
      "What will this output? const x = {a: 1}; delete x.a; console.log(x.a);",
    options: ["1", "undefined", "Error", "null"],
    correctAnswer: 1,
    explanation:
      "The delete operator removes the property 'a' from object x, so x.a becomes undefined.",
  },
  {
    id: 150,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the output of: console.log(Infinity - Infinity);",
    options: ["0", "Infinity", "NaN", "Error"],
    correctAnswer: 2,
    explanation:
      "Infinity - Infinity is an indeterminate form that results in NaN.",
  },
  {
    id: 151,
    category: "Javascript",
    difficulty: "medium",
    question: "What will console.log(JSON.stringify(undefined)) output?",
    options: ["'undefined'", "undefined", "null", "Error"],
    correctAnswer: 1,
    explanation:
      "JSON.stringify(undefined) returns undefined (not a string), as undefined is not valid JSON.",
  },
  {
    id: 152,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the result of: console.log([1,2,3,4,5].slice(1,-1));",
    options: ["[2,3,4]", "[1,2,3,4]", "[2,3,4,5]", "Error"],
    correctAnswer: 0,
    explanation:
      "slice(1,-1) starts at index 1 and ends at index -1 (excluding), so returns [2,3,4].",
  },
  {
    id: 153,
    category: "Javascript",
    difficulty: "medium",
    question:
      "What will this code output? console.log(typeof Function.prototype);",
    options: ["function", "object", "prototype", "Error"],
    correctAnswer: 0,
    explanation:
      "Function.prototype is itself a function, so typeof returns 'function'.",
  },
  {
    id: 154,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the output of: console.log('1' > '10');",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 0,
    explanation:
      "String comparison is lexicographic. '1' comes after '10' alphabetically, so '1' > '10' is true.",
  },
  {
    id: 155,
    category: "Javascript",
    difficulty: "medium",
    question: "What will console.log(Symbol('a') === Symbol('a')) output?",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 1,
    explanation:
      "Each Symbol() call creates a unique symbol, even with the same description.",
  },
  {
    id: 156,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the result of: console.log([null].length);",
    options: ["0", "1", "null", "undefined"],
    correctAnswer: 1,
    explanation: "The array contains one element (null), so its length is 1.",
  },
  {
    id: 157,
    category: "Javascript",
    difficulty: "medium",
    question:
      "What will this output? function test() { 'use strict'; return this; } console.log(test() === undefined);",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 0,
    explanation:
      "In strict mode, 'this' in a regular function call is undefined, not the global object.",
  },
  {
    id: 158,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the output of: console.log(parseFloat('10.5abc'));",
    options: ["10.5", "NaN", "Error", "10"],
    correctAnswer: 0,
    explanation:
      "parseFloat parses until it encounters a non-numeric character, so it returns 10.5.",
  },
  {
    id: 159,
    category: "Javascript",
    difficulty: "medium",
    question: "What will console.log([1,2,3,4].splice(1,2)) output?",
    options: ["[2,3]", "[1,4]", "[1,2,3,4]", "Error"],
    correctAnswer: 0,
    explanation:
      "splice(1,2) removes 2 elements starting at index 1 and returns the removed elements [2,3].",
  },
  {
    id: 160,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the result of: console.log(+'');",
    options: ["0", "NaN", "undefined", "Error"],
    correctAnswer: 0,
    explanation: "The unary + operator converts empty string to 0.",
  },
  {
    id: 161,
    category: "Javascript",
    difficulty: "medium",
    question:
      "What will this code output? const obj = {a: 1, b: 2}; for (let key in obj) { console.log(key); break; }",
    options: ["a", "b", "Both a and b", "Error"],
    correctAnswer: 0,
    explanation:
      "for...in iterates over object properties. The break statement exits after the first iteration (key 'a').",
  },
  {
    id: 162,
    category: "Javascript",
    difficulty: "medium",
    question:
      "What is the output of: console.log(Object.keys(Array.prototype));",
    options: ["Empty array", "Array of method names", "Error", "undefined"],
    correctAnswer: 1,
    explanation:
      "Object.keys returns an array of enumerable property names of Array.prototype methods.",
  },
  {
    id: 163,
    category: "Javascript",
    difficulty: "medium",
    question: "What will console.log(Math.trunc(-4.9)) output?",
    options: ["-4", "-5", "4", "Error"],
    correctAnswer: 0,
    explanation:
      "Math.trunc removes the fractional part, so Math.trunc(-4.9) returns -4.",
  },
  {
    id: 164,
    category: "Javascript",
    difficulty: "medium",
    question:
      "What is the result of: console.log(Array.isArray(Array.prototype));",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 1,
    explanation:
      "Array.prototype is an object, not an array, so Array.isArray returns false.",
  },
  {
    id: 165,
    category: "Javascript",
    difficulty: "medium",
    question:
      "What will this output? console.log(new String('hello') === 'hello');",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 1,
    explanation:
      "new String('hello') creates a String object, 'hello' is a primitive. Objects and primitives are not strictly equal.",
  },
  {
    id: 166,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the output of: console.log(Number.isNaN('NaN'));",
    options: ["true", "false", "NaN", "Error"],
    correctAnswer: 1,
    explanation:
      "Number.isNaN only returns true for the actual NaN value, not the string 'NaN'.",
  },
  {
    id: 167,
    category: "Javascript",
    difficulty: "medium",
    question: "What will console.log([1,2,3].includes(2)) output?",
    options: ["true", "false", "2", "undefined"],
    correctAnswer: 0,
    explanation:
      "The includes method checks if an array contains a specific element. The array contains 2.",
  },
  {
    id: 168,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the result of: console.log(String.raw`Hi\n${2+3}!`);",
    options: ["Hi\\n5!", "Hi\n5!", "Hi\\n${2+3}!", "Error"],
    correctAnswer: 0,
    explanation:
      "String.raw returns the raw string with escape sequences not processed, but template literals are still evaluated.",
  },
  {
    id: 169,
    category: "Javascript",
    difficulty: "medium",
    question:
      "What will this code output? const a = [1]; const b = [1]; console.log(a == b);",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 1,
    explanation:
      "Arrays are objects and compared by reference. Different array objects are not equal even with same content.",
  },
  {
    id: 170,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the output of: console.log(Proxy.length);",
    options: ["0", "1", "2", "undefined"],
    correctAnswer: 2,
    explanation:
      "Proxy constructor takes 2 parameters (target and handler), so Proxy.length is 2.",
  },
  {
    id: 171,
    category: "Javascript",
    difficulty: "medium",
    question: "What will console.log(Object.is(NaN, NaN)) output?",
    options: ["true", "false", "NaN", "undefined"],
    correctAnswer: 0,
    explanation:
      "Object.is provides true equality. Unlike ===, Object.is(NaN, NaN) returns true.",
  },
  {
    id: 172,
    category: "Javascript",
    difficulty: "medium",
    question:
      "What is the result of: console.log([1,2,3].flatMap(x => [x, x*2]));",
    options: ["[1,2,2,4,3,6]", "[[1,2],[2,4],[3,6]]", "Error", "[1,2,3,2,4,6]"],
    correctAnswer: 0,
    explanation:
      "flatMap maps each element to [x, x*2] then flattens: [1,2] [2,4] [3,6] becomes [1,2,2,4,3,6].",
  },
  {
    id: 173,
    category: "Javascript",
    difficulty: "medium",
    question: "What will this output? console.log(typeof class {});",
    options: ["class", "function", "object", "Error"],
    correctAnswer: 1,
    explanation:
      "Classes in JavaScript are syntactic sugar over functions, so typeof class {} returns 'function'.",
  },
  {
    id: 174,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the output of: console.log(BigInt(10) === 10);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 1,
    explanation:
      "BigInt(10) creates a bigint type, 10 is a number type. Different types are not strictly equal.",
  },
  {
    id: 175,
    category: "Javascript",
    difficulty: "medium",
    question: "What will console.log([...'hello'].reverse().join('')) output?",
    options: ["olleh", "hello", "Error", "['o','l','l','e','h']"],
    correctAnswer: 0,
    explanation:
      "Spread 'hello' to ['h','e','l','l','o'], reverse to ['o','l','l','e','h'], join to 'olleh'.",
  },
  {
    id: 176,
    category: "Javascript",
    difficulty: "medium",
    question:
      "What is the result of: console.log(Set.prototype.constructor === Set);",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 0,
    explanation:
      "Set.prototype.constructor points back to the Set constructor function.",
  },
  {
    id: 177,
    category: "Javascript",
    difficulty: "medium",
    question:
      "What will this code output? const x = new Map(); x.set('a', 1); console.log(x.get('a'));",
    options: ["1", "undefined", "'a'", "Error"],
    correctAnswer: 0,
    explanation:
      "Map.prototype.set sets a key-value pair, Map.prototype.get retrieves the value for key 'a'.",
  },
  {
    id: 178,
    category: "Javascript",
    difficulty: "medium",
    question:
      "What is the output of: console.log(WeakMap.prototype.constructor === WeakMap);",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 0,
    explanation:
      "WeakMap.prototype.constructor points back to the WeakMap constructor function.",
  },
  {
    id: 179,
    category: "Javascript",
    difficulty: "medium",
    question: "What will console.log(Object.freeze({a:1}).a = 2) output?",
    options: ["2", "1", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "Assignment expressions return the assigned value. Even though the assignment fails (frozen object), it returns 2.",
  },
  {
    id: 180,
    category: "Javascript",
    difficulty: "medium",
    question:
      "What is the result of: console.log(Promise.resolve().constructor === Promise);",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 0,
    explanation:
      "Promise.resolve() returns a Promise instance whose constructor is Promise.",
  },
  {
    id: 181,
    category: "Javascript",
    difficulty: "medium",
    question:
      "What will this output? async function test() { return 1; } console.log(test());",
    options: ["1", "Promise", "undefined", "Error"],
    correctAnswer: 1,
    explanation:
      "Async functions always return a Promise, even when returning a primitive value.",
  },
  {
    id: 182,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the output of: console.log(typeof (async () => {}));",
    options: ["function", "async", "object", "Error"],
    correctAnswer: 0,
    explanation:
      "Async functions are still functions, so typeof returns 'function'.",
  },
  {
    id: 183,
    category: "Javascript",
    difficulty: "medium",
    question: "What will console.log(Generator.prototype) output?",
    options: ["undefined", "Error", "GeneratorPrototype", "Object"],
    correctAnswer: 1,
    explanation:
      "Generator is not directly accessible. You access it through function* or GeneratorFunction.",
  },
  {
    id: 184,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the result of: console.log(Error.prototype.name);",
    options: ["Error", "undefined", "name", "Error.prototype"],
    correctAnswer: 0,
    explanation: "Error.prototype.name property contains the name 'Error'.",
  },
  {
    id: 185,
    category: "Javascript",
    difficulty: "medium",
    question:
      "What will this code output? console.log([1,2,3,4,5].findIndex(x => x > 3));",
    options: ["3", "4", "2", "Error"],
    correctAnswer: 0,
    explanation:
      "findIndex returns the index of the first element that satisfies the condition. 4 (index 3) is first > 3.",
  },
  {
    id: 186,
    category: "Javascript",
    difficulty: "medium",
    question:
      "What is the output of: console.log(ArrayBuffer.isView(new Int8Array()));",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 0,
    explanation:
      "ArrayBuffer.isView returns true for typed arrays like Int8Array.",
  },
  {
    id: 187,
    category: "Javascript",
    difficulty: "medium",
    question: "What will console.log(Reflect.has({a: 1}, 'a')) output?",
    options: ["true", "false", "1", "undefined"],
    correctAnswer: 0,
    explanation:
      "Reflect.has is equivalent to the 'in' operator, checking if property exists.",
  },
  {
    id: 188,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the result of: console.log(SharedArrayBuffer.length);",
    options: ["0", "1", "undefined", "Error"],
    correctAnswer: 1,
    explanation:
      "SharedArrayBuffer constructor takes 1 parameter (length), so its length property is 1.",
  },
  {
    id: 189,
    category: "Javascript",
    difficulty: "medium",
    question:
      "What will this output? const buffer = new ArrayBuffer(8); console.log(buffer.byteLength);",
    options: ["8", "0", "undefined", "Error"],
    correctAnswer: 0,
    explanation:
      "ArrayBuffer created with 8 bytes, so byteLength property returns 8.",
  },
  {
    id: 190,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the output of: console.log(DataView.length);",
    options: ["0", "1", "3", "undefined"],
    correctAnswer: 2,
    explanation:
      "DataView constructor can take up to 3 parameters, so DataView.length is 3.",
  },
  {
    id: 191,
    category: "Javascript",
    difficulty: "medium",
    question:
      "What will console.log(Intl.DateTimeFormat().constructor === Intl.DateTimeFormat) output?",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 0,
    explanation:
      "Intl.DateTimeFormat() creates an instance whose constructor is Intl.DateTimeFormat.",
  },
  {
    id: 192,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the result of: console.log(WebAssembly.Module.length);",
    options: ["0", "1", "undefined", "Error"],
    correctAnswer: 1,
    explanation:
      "WebAssembly.Module constructor takes 1 parameter (bytes), so its length is 1.",
  },
  {
    id: 193,
    category: "Javascript",
    difficulty: "medium",
    question: "What will this code output? console.log(Atomics.load.length);",
    options: ["1", "2", "3", "Error"],
    correctAnswer: 1,
    explanation:
      "Atomics.load takes 2 parameters (typedArray, index), so its length is 2.",
  },
  {
    id: 194,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the output of: console.log(JSON.parse('null'));",
    options: ["null", "undefined", "'null'", "Error"],
    correctAnswer: 0,
    explanation:
      "JSON.parse('null') correctly parses the JSON null value to JavaScript null.",
  },
  {
    id: 195,
    category: "Javascript",
    difficulty: "medium",
    question: "What will console.log([1,2].concat([3,4], [5,6])) output?",
    options: [
      "[1,2,3,4,5,6]",
      "[[1,2],[3,4],[5,6]]",
      "[1,2,[3,4],[5,6]]",
      "Error",
    ],
    correctAnswer: 0,
    explanation:
      "concat flattens one level of arrays and concatenates all elements into a single array.",
  },
  {
    id: 196,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the result of: console.log(escape('hello world'));",
    options: ["hello%20world", "Error", "hello world", "hello+world"],
    correctAnswer: 0,
    explanation:
      "escape() (deprecated) encodes special characters. Space becomes %20.",
  },
  {
    id: 197,
    category: "Javascript",
    difficulty: "medium",
    question: "What will this output? console.log(unescape('hello%20world'));",
    options: ["hello world", "hello%20world", "Error", "hello+world"],
    correctAnswer: 0,
    explanation:
      "unescape() (deprecated) decodes escape sequences. %20 becomes space.",
  },
  {
    id: 198,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the output of: console.log(encodeURI('hello world'));",
    options: ["hello%20world", "hello+world", "Error", "hello world"],
    correctAnswer: 0,
    explanation:
      "encodeURI encodes special characters for URIs. Space becomes %20.",
  },
  {
    id: 199,
    category: "Javascript",
    difficulty: "medium",
    question: "What will console.log(decodeURI('hello%20world')) output?",
    options: ["hello world", "hello%20world", "Error", "hello+world"],
    correctAnswer: 0,
    explanation: "decodeURI decodes URI-encoded characters. %20 becomes space.",
  },
  {
    id: 200,
    category: "Javascript",
    difficulty: "medium",
    question: "What is the result of: console.log([1,2,3].some(x => x > 2));",
    options: ["true", "false", "3", "undefined"],
    correctAnswer: 0,
    explanation:
      "some() returns true if at least one element satisfies the condition. 3 > 2 is true.",
  },
  {
    id: 201,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: (function(){ return typeof arguments; })()?",
    options: ["object", "arguments", "function", "undefined"],
    correctAnswer: 0,
    explanation: "The arguments object has type 'object' in JavaScript.",
  },
  {
    id: 202,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this complex closure output? var funcs = []; for (var i = 0; i < 3; i++) { funcs[i] = (function(index) { return function() { console.log(index); }; })(i); } funcs[0]();",
    options: ["0", "3", "undefined", "Error"],
    correctAnswer: 0,
    explanation:
      "The IIFE creates a closure that captures the current value of i (0) in the parameter index.",
  },
  {
    id: 203,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log((function f(n){return n > 1 ? n * f(n-1) : 1})(5));",
    options: ["120", "5", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "This is a recursive factorial function. 5! = 5 * 4 * 3 * 2 * 1 = 120.",
  },
  {
    id: 204,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will console.log(Function.prototype.bind.call.call(parseInt, null, '08', 2)) output?",
    options: ["0", "8", "NaN", "Error"],
    correctAnswer: 0,
    explanation:
      "This complex call chain ultimately calls parseInt('08', 2), parsing '08' in base 2, which gives 0.",
  },
  {
    id: 205,
    category: "Javascript",
    difficulty: "hard",
    question: "What is the output of: console.log([,,,].length)?",
    options: ["0", "3", "4", "undefined"],
    correctAnswer: 1,
    explanation:
      "The array has 3 empty slots (holes). Trailing comma doesn't create an additional element.",
  },
  {
    id: 206,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this generator function output? function* gen() { yield 1; yield 2; return 3; } const g = gen(); console.log([...g]);",
    options: ["[1, 2]", "[1, 2, 3]", "[3]", "Error"],
    correctAnswer: 0,
    explanation:
      "Spread operator only includes yielded values, not the returned value from generator.",
  },
  {
    id: 207,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(Object.defineProperty({}, 'x', {value: 1}).x);",
    options: ["1", "undefined", "Error", "{value: 1}"],
    correctAnswer: 0,
    explanation:
      "defineProperty adds property 'x' with value 1 to the object and returns the object.",
  },
  {
    id: 208,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this Proxy output? const p = new Proxy({}, {get: () => 42}); console.log(p.anything);",
    options: ["42", "undefined", "Error", "anything"],
    correctAnswer: 0,
    explanation:
      "The Proxy get trap returns 42 for any property access, regardless of property name.",
  },
  {
    id: 209,
    category: "Javascript",
    difficulty: "hard",
    question: "What is the output of: console.log(eval('var x = 1; x'));",
    options: ["1", "undefined", "Error", "var x = 1; x"],
    correctAnswer: 0,
    explanation:
      "eval executes the string as JavaScript code. It declares x = 1 and returns x, which is 1.",
  },
  {
    id: 210,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this async/await code output? async function test() { return await Promise.resolve(42); } console.log(test());",
    options: ["42", "Promise", "undefined", "Error"],
    correctAnswer: 1,
    explanation:
      "async functions always return a Promise, even when awaiting and returning a resolved value.",
  },
  {
    id: 211,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log((function(){}).constructor === Function);",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 0,
    explanation:
      "All functions are instances of Function constructor, so their constructor property points to Function.",
  },
  {
    id: 212,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this destructuring output? const [a, b = a] = [1]; console.log(b);",
    options: ["1", "undefined", "Error", "[1]"],
    correctAnswer: 0,
    explanation:
      "Destructuring with default value: b defaults to a when second element is missing, so b = 1.",
  },
  {
    id: 213,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(new (class extends Array {})().constructor === Array);",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 1,
    explanation:
      "The anonymous class extends Array, so its constructor is the class itself, not Array.",
  },
  {
    id: 214,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this Symbol output? const s1 = Symbol.for('key'); const s2 = Symbol.for('key'); console.log(s1 === s2);",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 0,
    explanation:
      "Symbol.for creates global symbols. Same key returns same symbol from global symbol registry.",
  },
  {
    id: 215,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(Object.create(null) instanceof Object);",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 1,
    explanation:
      "Object.create(null) creates object with no prototype chain, so it's not instanceof Object.",
  },
  {
    id: 216,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this WeakSet output? const ws = new WeakSet(); const obj = {}; ws.add(obj); console.log(ws.has(obj));",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 0,
    explanation:
      "WeakSet can hold objects. The object is added and has() correctly finds it.",
  },
  {
    id: 217,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(Reflect.ownKeys({a: 1, [Symbol('b')]: 2}));",
    options: ["['a']", "['a', Symbol(b)]", "[Symbol(b)]", "Error"],
    correctAnswer: 1,
    explanation:
      "Reflect.ownKeys returns both string and symbol keys of an object.",
  },
  {
    id: 218,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this getter/setter output? const obj = {get x() {return this._x || 1}, set x(val) {this._x = val}}; obj.x = 5; console.log(obj.x);",
    options: ["1", "5", "undefined", "Error"],
    correctAnswer: 1,
    explanation:
      "Setter stores value in _x, getter retrieves _x (5) instead of default 1.",
  },
  {
    id: 219,
    category: "Javascript",
    difficulty: "hard",
    question: "What is the result of: console.log(Object.seal({a: 1}).a = 2);",
    options: ["2", "1", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "Object.seal prevents adding/deleting properties but allows modification. Assignment expression returns assigned value 2.",
  },
  {
    id: 220,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this template literal output? const tag = (strings, ...values) => strings[0] + values[0]; console.log(tag`Hello ${42}!`);",
    options: ["Hello 42", "Hello 42!", "42", "Error"],
    correctAnswer: 0,
    explanation:
      "Tagged template: strings = ['Hello ', '!'], values = [42]. Returns strings[0] + values[0] = 'Hello 42'.",
  },
  {
    id: 221,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(new Proxy([], {get: (t, p) => p in t ? t[p] : `Missing: ${p}`})[5]);",
    options: ["undefined", "Missing: 5", "5", "Error"],
    correctAnswer: 1,
    explanation:
      "Proxy get trap checks if property exists. Array index 5 doesn't exist, so returns 'Missing: 5'.",
  },
  {
    id: 222,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this prototype chain output? function Parent() {} Parent.prototype.method = () => 'parent'; function Child() {} Child.prototype = Object.create(Parent.prototype); console.log(new Child().method());",
    options: ["parent", "undefined", "Error", "child"],
    correctAnswer: 0,
    explanation:
      "Child inherits from Parent through prototype chain. Arrow function method is inherited and returns 'parent'.",
  },
  {
    id: 223,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log((async function*() { yield await Promise.resolve(1); })().next());",
    options: ["Promise", "1", "{value: Promise, done: false}", "Error"],
    correctAnswer: 2,
    explanation:
      "Async generator's next() returns {value: Promise, done: false} because yield produces a Promise.",
  },
  {
    id: 224,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will console.log(Object.getPrototypeOf(Function.prototype)) output?",
    options: ["Function", "Object.prototype", "null", "undefined"],
    correctAnswer: 1,
    explanation:
      "Function.prototype's prototype is Object.prototype, completing the prototype chain.",
  },
  {
    id: 225,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(([]).constructor.prototype === Array.prototype);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "The constructor property of an array instance points to Array, and Array.prototype is the same object.",
  },
  {
    id: 226,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(delete Object.prototype);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 1,
    explanation:
      "Object.prototype is non-configurable and cannot be deleted, so delete returns false.",
  },
  {
    id: 227,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(Math.max(...[1, 2, 3], 4, ...[5]));",
    options: ["5", "1", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "The spread operator expands arrays into individual arguments; Math.max receives 1,2,3,4,5 and returns 5.",
  },
  {
    id: 228,
    category: "Javascript",
    difficulty: "hard",
    question: "What will console.log(new class A { static x = 1 }.x) output?",
    options: ["1", "undefined", "Error", "A.x"],
    correctAnswer: 1,
    explanation:
      "Static fields belong to the class constructor, not instances; the instance has no x property.",
  },
  {
    id: 229,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(Object.isExtensible(Object.preventExtensions({})));",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 1,
    explanation:
      "Object.preventExtensions makes the object non-extensible; Object.isExtensible returns false.",
  },
  {
    id: 230,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this async iterator output? for await (const x of [Promise.resolve(1)]) console.log(x);",
    options: ["1", "Promise", "Error", "undefined"],
    correctAnswer: 2,
    explanation:
      "Plain arrays are not async iterables; for await...of requires an async iterable, causing TypeError.",
  },
  {
    id: 231,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(Reflect.getPrototypeOf(Reflect));",
    options: ["Object.prototype", "null", "Reflect.prototype", "Error"],
    correctAnswer: 1,
    explanation:
      "Reflect is a plain object created with null prototype, so getPrototypeOf returns null.",
  },
  {
    id: 232,
    category: "Javascript",
    difficulty: "hard",
    question: "What will console.log(Array.of.length) output?",
    options: ["0", "1", "undefined", "Error"],
    correctAnswer: 0,
    explanation:
      "Array.of has a length of 0 because it uses rest parameters instead of named arguments.",
  },
  {
    id: 233,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log((function* g() {}).prototype.constructor);",
    options: ["g", "GeneratorFunction", "Object", "Error"],
    correctAnswer: 1,
    explanation:
      "Generator function's prototype property points to an object whose constructor is GeneratorFunction.",
  },
  {
    id: 234,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(Object.getOwnPropertyDescriptor([], 'length').writable);",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 0,
    explanation:
      "The length property of arrays is writable by default, so the descriptor shows writable: true.",
  },
  {
    id: 235,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(new Proxy({}, { has() { return false; } }) in {});",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 1,
    explanation:
      "The has trap returns false for any in check, so the expression evaluates to false.",
  },
  {
    id: 236,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will console.log(Symbol.toPrimitive in Object.prototype) output?",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "Symbol.toPrimitive is defined in Object.prototype, so the in check returns true.",
  },
  {
    id: 237,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(WeakRef.prototype.constructor === WeakRef);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "WeakRef.prototype.constructor points back to the WeakRef constructor function.",
  },
  {
    id: 238,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(new FinalizationRegistry(() => {}).constructor === FinalizationRegistry);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "FinalizationRegistry instances inherit constructor property pointing to FinalizationRegistry.",
  },
  {
    id: 239,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(Intl.Collator().compare('a', 'A'));",
    options: ["-1", "0", "1", "Error"],
    correctAnswer: 0,
    explanation:
      "Collator.compare returns negative when first string sorts before second; 'a' < 'A' in default locale.",
  },
  {
    id: 240,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will console.log(Object.groupBy([1, 2, 1], x => x)) output?",
    options: ["{1: [1, 1], 2: [2]}", "Error", "undefined", "Map"],
    correctAnswer: 1,
    explanation:
      "Object.groupBy is not a standard method; attempting to call it throws TypeError.",
  },
  {
    id: 241,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(Proxy.revocable({}, {}).revoke.length);",
    options: ["0", "1", "undefined", "Error"],
    correctAnswer: 0,
    explanation: "The revoke function takes no arguments, so its length is 0.",
  },
  {
    id: 242,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(typeof (class { static { console.log('static'); } }));",
    options: ["function", "static", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "Static blocks run during class evaluation, but typeof still returns 'function' for the class.",
  },
  {
    id: 243,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(Iterator.prototype === Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "Array iterator objects inherit from Iterator.prototype through the prototype chain.",
  },
  {
    id: 244,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will console.log(new class { #x = 1; getX() { return this.#x; } }().getX()) output?",
    options: ["1", "undefined", "Error", "#x"],
    correctAnswer: 0,
    explanation:
      "Private fields are accessible within class methods; getX returns the private #x value 1.",
  },
  {
    id: 245,
    category: "Javascript",
    difficulty: "hard",
    question: "What is the output of: console.log(Object.hasOwn({a: 1}, 'a'));",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "Object.hasOwn returns true when the object owns the specified property directly.",
  },
  {
    id: 246,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(Array.prototype.at.call('hello', -1));",
    options: ["o", "undefined", "Error", "hello"],
    correctAnswer: 0,
    explanation:
      "Array.prototype.at can be generic; negative index -1 accesses last character 'o' of string.",
  },
  {
    id: 247,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(structuredClone({a: 1}).constructor === Object);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "structuredClone creates a deep copy with same prototype; cloned object constructor remains Object.",
  },
  {
    id: 248,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will console.log(AbortSignal.abort().constructor === AbortSignal) output?",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "AbortSignal.abort() returns an AbortSignal instance whose constructor is AbortSignal.",
  },
  {
    id: 249,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(Object.getOwnPropertyNames(function* () {}).length);",
    options: ["0", "1", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "Generator function objects have no own enumerable properties, so getOwnPropertyNames returns empty array.",
  },
  {
    id: 250,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(new EventTarget().dispatchEvent(new Event('test')));",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "dispatchEvent returns true when the event is not canceled; default Event is not cancelable.",
  },
  {
    id: 251,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(Object.getPrototypeOf(async function () {}) === Object.getPrototypeOf(function* () {}));",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 1,
    explanation:
      "Async functions and generator functions have different prototype objects (AsyncFunction vs GeneratorFunction).",
  },
  {
    id: 252,
    category: "Javascript",
    difficulty: "hard",
    question: "What will console.log(PerformanceObserver.length) output?",
    options: ["0", "1", "2", "Error"],
    correctAnswer: 0,
    explanation:
      "PerformanceObserver constructor takes no required arguments, so its length is 0.",
  },
  {
    id: 253,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(new URL('https://example.com').protocol);",
    options: ["https:", "https", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "URL.protocol includes the colon, so it returns 'https:' for HTTPS URLs.",
  },
  {
    id: 254,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(Object.isSealed(Date.prototype));",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "Built-in prototypes like Date.prototype are typically sealed to prevent modification.",
  },
  {
    id: 255,
    category: "Javascript",
    difficulty: "hard",
    question: "What is the result of: console.log(Notification.permission);",
    options: ["granted", "denied", "default", "Error"],
    correctAnswer: 2,
    explanation:
      "In environments without prior permission, Notification.permission defaults to 'default'.",
  },
  {
    id: 256,
    category: "Javascript",
    difficulty: "hard",
    question: "What will console.log(CryptoKey.prototype) output?",
    options: ["undefined", "Error", "CryptoKeyPrototype", "Object"],
    correctAnswer: 0,
    explanation:
      "CryptoKey is a built-in opaque type without exposed prototype; accessing prototype returns undefined.",
  },
  {
    id: 257,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(Object.getOwnPropertySymbols(Object.prototype).length > 0);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "Object.prototype contains well-known symbols like Symbol.toStringTag, so the length is greater than 0.",
  },
  {
    id: 258,
    category: "Javascript",
    difficulty: "hard",
    question: "What will this code output? console.log(ResizeObserver.length);",
    options: ["0", "1", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "ResizeObserver constructor takes no required arguments, so its length is 0.",
  },
  {
    id: 259,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(IntersectionObserver.prototype.constructor === IntersectionObserver);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "IntersectionObserver.prototype.constructor points back to the IntersectionObserver constructor.",
  },
  {
    id: 260,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will console.log(MutationObserver.prototype.observe.length) output?",
    options: ["1", "2", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "MutationObserver.prototype.observe takes 2 parameters (target, options), so its length is 2.",
  },
  {
    id: 261,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(Object.getOwnPropertyDescriptor(Uint8Array.prototype, 'length').enumerable);",
    options: ["false", "true", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "The length property of typed array prototypes is non-enumerable, so enumerable is false.",
  },
  {
    id: 262,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(new Blob(['hello']).type);",
    options: ["", "text/plain", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "Blob constructor without type option creates blob with empty string type.",
  },
  {
    id: 263,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(FileReader.prototype.readAsText.length);",
    options: ["0", "1", "Error", "undefined"],
    correctAnswer: 1,
    explanation:
      "FileReader.prototype.readAsText takes 1 required parameter (blob), so its length is 1.",
  },
  {
    id: 264,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will console.log(XMLHttpRequest.prototype.open.length) output?",
    options: ["2", "3", "4", "Error"],
    correctAnswer: 2,
    explanation:
      "XMLHttpRequest.prototype.open has 5 parameters with 2 required (method, url), but length is 2.",
  },
  {
    id: 265,
    category: "Javascript",
    difficulty: "hard",
    question: "What is the output of: console.log(fetch.length);",
    options: ["1", "2", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "fetch function has 1 required parameter (input), so its length is 1.",
  },
  {
    id: 266,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(Object.getPrototypeOf(Headers.prototype));",
    options: ["Object.prototype", "null", "Error", "HeadersPrototype"],
    correctAnswer: 0,
    explanation:
      "Headers.prototype inherits from Object.prototype in the prototype chain.",
  },
  {
    id: 267,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(Request.prototype.constructor === Request);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "Request.prototype.constructor points back to the Request constructor function.",
  },
  {
    id: 268,
    category: "Javascript",
    difficulty: "hard",
    question: "What will console.log(Response.prototype.json.length) output?",
    options: ["0", "1", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "Response.prototype.json takes no arguments, so its length is 0.",
  },
  {
    id: 269,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(Object.getOwnPropertyNames(Storage.prototype).includes('getItem'));",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "Storage.prototype defines getItem method, so it's included in getOwnPropertyNames.",
  },
  {
    id: 270,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(History.prototype.forward.length);",
    options: ["0", "1", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "History.prototype.forward takes no arguments, so its length is 0.",
  },
  {
    id: 271,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(Location.prototype.reload.length);",
    options: ["0", "1", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "Location.prototype.reload takes optional parameter, but length is 0 for optional-only parameters.",
  },
  {
    id: 272,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will console.log(Navigator.prototype.javaEnabled.length) output?",
    options: ["0", "1", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "Navigator.prototype.javaEnabled takes no arguments, so its length is 0.",
  },
  {
    id: 273,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(Screen.prototype.constructor === Screen);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "Screen.prototype.constructor points back to the Screen constructor function.",
  },
  {
    id: 274,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(Document.prototype.createElement.length);",
    options: ["1", "2", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "Document.prototype.createElement takes 1 required parameter (tagName), so its length is 1.",
  },
  {
    id: 275,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(Element.prototype.getAttribute.length);",
    options: ["1", "2", "Error", "undefined"],
    correctAnswer: 1,
    explanation:
      "Element.prototype.getAttribute takes 1 parameter (qualifiedName), so its length is 1.",
  },
  {
    id: 276,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will console.log(HTMLElement.prototype.attachShadow.length) output?",
    options: ["1", "0", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "HTMLElement.prototype.attachShadow takes 1 parameter (init), so its length is 1.",
  },
  {
    id: 277,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(Node.prototype.appendChild.length);",
    options: ["1", "2", "Error", "undefined"],
    correctAnswer: 1,
    explanation:
      "Node.prototype.appendChild takes 1 parameter (node), so its length is 1.",
  },
  {
    id: 278,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(Window.prototype.constructor === Window);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "Window.prototype.constructor points back to the Window constructor function.",
  },
  {
    id: 279,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(CSSRule.prototype.constructor === CSSRule);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "CSSRule.prototype.constructor points back to the CSSRule constructor function.",
  },
  {
    id: 280,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will consoleOff(CSSStyleDeclaration.prototype.setProperty.length) output?",
    options: ["2", "3", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "CSSStyleDeclaration.prototype.setProperty takes 2 required parameters (property, value), so length is 2.",
  },
  {
    id: 281,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(Object.getOwnPropertyDescriptor(HTMLCollection.prototype, 'length').configurable);",
    options: ["false", "true", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "The length property of HTMLCollection is non-configurable, so configurable is false.",
  },
  {
    id: 282,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(NodeList.prototype.forEach.length);",
    options: ["1", "2", "Error", "undefined"],
    correctAnswer: 1,
    explanation:
      "NodeList.prototype.forEach takes 1 parameter (callback), so its length is 1.",
  },
  {
    id: 283,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(DOMTokenList.prototype.toggle.length);",
    options: ["1", "2", "Error", "undefined"],
    correctAnswer: 1,
    explanation:
      "DOMTokenList.prototype.toggle has 1 required parameter (token), so its length is 1.",
  },
  {
    id: 284,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will consoleOff(HTMLFormElement.prototype.submit.length) output?",
    options: ["0", "1", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "HTMLFormElement.prototype.submit takes no arguments, so its length is 0.",
  },
  {
    id: 285,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(HTMLInputElement.prototype.checkValidity.length);",
    options: ["0", "1", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "HTMLInputElement.prototype.checkValidity takes no arguments, so its length is 0.",
  },
  {
    id: 286,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(HTMLTextAreaElement.prototype.select.length);",
    options: ["0", "1", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "HTMLTextAreaElement.prototype.select takes no arguments, so its length is 0.",
  },
  {
    id: 287,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(HTMLButtonElement.prototype.click.length);",
    options: ["0", "1", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "HTMLButtonElement.prototype.click takes no arguments, so its length is 0.",
  },
  {
    id: 288,
    category: "Javascript",
    difficulty: "hard",
    question: "What will console.log(HTMLSelectElement.prototype.add.length);",
    options: ["1", "2", "Error", "undefined"],
    correctAnswer: 1,
    explanation:
      "HTMLSelectElement.prototype.add takes 1 required parameter (element), so its length is 1.",
  },
  {
    id: 289,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(HTMLAnchorElement.prototype.focus.length);",
    options: ["0", "1", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "HTMLAnchorElement.prototype.focus takes no arguments, so its length is 0.",
  },
  {
    id: 290,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(HTMLImageElement.prototype.setAttribute.length);",
    options: ["2", "1", "Error", "undefined"],
    correctAnswer: 2,
    explanation:
      "HTMLImageElement.prototype.setAttribute takes 2 parameters (name, value), so its length is 2.",
  },
  {
    id: 291,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(HTMLScriptElement.prototype.getAttribute.length);",
    options: ["1", "2", "Error", "undefined"],
    correctAnswer: 1,
    explanation:
      "HTMLScriptElement.prototype.getAttribute takes 1 parameter (qualifiedName), so its length is 1.",
  },
  {
    id: 292,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will console.log(HTMLTableElement.prototype.insertRow.length);",
    options: ["0", "1", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "HTMLTableElement.prototype.insertRow takes optional parameter, but length is 0 for optional-only.",
  },
  {
    id: 293,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(HTMLCanvasElement.prototype.getContext.length);",
    options: ["1", "2", "Error", "undefined"],
    correctAnswer: 1,
    explanation:
      "HTMLCanvasElement.prototype.getContext takes 1 required parameter (contextId), so its length is 1.",
  },
  {
    id: 294,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(HTMLMediaElement.prototype.play.length);",
    options: ["0", "1", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "HTMLMediaElement.prototype.play takes no arguments, so its length is 0.",
  },
  {
    id: 295,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(HTMLVideoElement.prototype.pause.length);",
    options: ["0", "1", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "HTMLVideoElement.prototype.pause takes no arguments, so its length is 0.",
  },
  {
    id: 296,
    category: "Javascript",
    difficulty: "hard",
    question: "What will console.log(HTMLAudioElement.prototype.load.length);",
    options: ["0", "1", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "HTMLAudioElement.prototype.load takes no arguments, so its length is 0.",
  },
  {
    id: 297,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(HTMLSourceElement.prototype.setAttributeNS.length);",
    options: ["3", "2", "Error", "undefined"],
    correctAnswer: 3,
    explanation:
      "HTMLSourceElement.prototype.setAttributeNS takes 3 parameters (namespace, qualifiedName, value), so length is 3.",
  },
  {
    id: 298,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(HTMLTrackElement.prototype.getAttributeNS.length);",
    options: ["2", "1", "Error", "undefined"],
    correctAnswer: 2,
    explanation:
      "HTMLTrackElement.prototype.getAttributeNS takes 2 parameters (namespace, localName), so its length is 2.",
  },
  {
    id: 299,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(HTMLDivElement.prototype.constructor === HTMLDivElement);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "HTMLDivElement.prototype.constructor points back to the HTMLDivElement constructor function.",
  },
  {
    id: 300,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will console.log(HTMLParagraphElement.prototype.cloneNode.length);",
    options: ["0", "1", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "HTMLParagraphElement.prototype.cloneNode takes optional parameter, but length is 0 for optional-only.",
  },
  {
    id: 301,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(HTMLHeadingElement.prototype.removeAttribute.length);",
    options: ["1", "2", "Error", "undefined"],
    correctAnswer: 1,
    explanation:
      "HTMLHeadingElement.prototype.removeAttribute takes 1 parameter (qualifiedName), so its length is 1.",
  },
  {
    id: 302,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(HTMLLIElement.prototype.insertAdjacentHTML.length);",
    options: ["2", "1", "Error", "undefined"],
    correctAnswer: 2,
    explanation:
      "HTMLLIElement.prototype.insertAdjacentHTML takes 2 parameters (position, text), so its length is 2.",
  },
  {
    id: 303,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(HTMLDataElement.prototype.valueOf === Object.prototype.valueOf);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "HTMLDataElement inherits valueOf from Object.prototype, so they are the same function.",
  },
  {
    id: 304,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will console.log(HTMLTimeElement.prototype.toString === Object.prototype.toString);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "HTMLTimeElement inherits toString from Object.prototype, so they are the same function.",
  },
  {
    id: 305,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(HTMLProgressElement.prototype.max);",
    options: ["undefined", "number", "Error", "100"],
    correctAnswer: 0,
    explanation:
      "HTMLProgressElement.prototype.max is an accessor property without value on prototype; accessing it returns undefined.",
  },
  {
    id: 306,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(HTMLMeterElement.prototype.labels);",
    options: ["undefined", "NodeList", "Error", "null"],
    correctAnswer: 0,
    explanation:
      "HTMLMeterElement.prototype.labels is a getter that returns null when called on prototype, not instance.",
  },
  {
    id: 307,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(HTMLDetailsElement.prototype.open);",
    options: ["undefined", "boolean", "Error", "false"],
    correctAnswer: 0,
    explanation:
      "HTMLDetailsElement.prototype.open is an accessor property; accessing it on prototype returns undefined.",
  },
  {
    id: 308,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will console.log(HTMLDialogElement.prototype.showModal.length);",
    options: ["0", "1", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "HTMLDialogElement.prototype.showModal takes no arguments, so its length is 0.",
  },
  {
    id: 309,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(HTMLSlotElement.prototype.assignedElements.length);",
    options: ["0", "1", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "HTMLSlotElement.prototype.assignedElements takes optional parameter, but length is 0 for optional-only.",
  },
  {
    id: 310,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(HTMLTemplateElement.prototype.content);",
    options: ["DocumentFragment", "null", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "HTMLTemplateElement.prototype.content is an accessor that returns a DocumentFragment when accessed on instance.",
  },
  {
    id: 311,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(HTMLShadowElement.prototype === undefined);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "HTMLShadowElement is not a standard interface; accessing its prototype returns undefined.",
  },
  {
    id: 312,
    category: "Javascript",
    difficulty: "hard",
    question: "What will console.log(HTMLOptGroupElement.prototype.disabled);",
    options: ["undefined", "boolean", "Error", "false"],
    correctAnswer: 0,
    explanation:
      "HTMLOptGroupElement.prototype.disabled is an accessor property; accessing it on prototype returns undefined.",
  },
  {
    id: 313,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(HTMLOptionElement.prototype.index);",
    options: ["undefined", "number", "Error", "-1"],
    correctAnswer: 0,
    explanation:
      "HTMLOptionElement.prototype.index is a getter that returns undefined when called on prototype.",
  },
  {
    id: 314,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(HTMLFieldSetElement.prototype.elements);",
    options: ["HTMLCollection", "undefined", "Error", "null"],
    correctAnswer: 0,
    explanation:
      "HTMLFieldSetElement.prototype.elements is a getter returning HTMLCollection when accessed on instance.",
  },
  {
    id: 315,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(HTMLLegendElement.prototype.form);",
    options: ["HTMLFormElement", "null", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "HTMLLegendElement.prototype.form is a getter returning associated form element or null.",
  },
  {
    id: 316,
    category: "Javascript",
    difficulty: "hard",
    question: "What will console.log(HTMLLabelElement.prototype.control);",
    options: ["HTMLElement", "null", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "HTMLLabelElement.prototype.control is a getter returning labeled control element or null.",
  },
  {
    id: 317,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(HTMLObjectElement.prototype.contentDocument);",
    options: ["Document", "null", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "HTMLObjectElement.prototype.contentDocument is a getter returning content document or null.",
  },
  {
    id: 318,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(HTMLParamElement.prototype.name);",
    options: ["undefined", "string", "Error", "empty string"],
    correctAnswer: 0,
    explanation:
      "HTMLParamElement.prototype.name is an accessor property; accessing it on prototype returns undefined.",
  },
  {
    id: 319,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(HTMLMapElement.prototype.areas);",
    options: ["HTMLCollection", "undefined", "Error", "null"],
    correctAnswer: 0,
    explanation:
      "HTMLMapElement.prototype.areas is a getter returning HTMLCollection of area elements.",
  },
  {
    id: 320,
    category: "Javascript",
    difficulty: "hard",
    question: "What will console.log(HTMLAreaElement.prototype.shape);",
    options: ["undefined", "string", "Error", "rect"],
    correctAnswer: 0,
    explanation:
      "HTMLAreaElement.prototype.shape is an accessor property; accessing it on prototype returns undefined.",
  },
  {
    id: 321,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(HTMLBRElement.prototype.clear);",
    options: ["undefined", "string", "Error", "empty string"],
    correctAnswer: 0,
    explanation:
      "HTMLBRElement.prototype.clear is an accessor property; accessing it on prototype returns undefined.",
  },
  {
    id: 322,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(HTMLQuoteElement.prototype.cite);",
    options: ["undefined", "string", "Error", "empty string"],
    correctAnswer: 0,
    explanation:
      "HTMLQuoteElement.prototype.cite is an accessor property; accessing it on prototype returns undefined.",
  },
  {
    id: 323,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(HTMLPreElement.prototype.wrap);",
    options: ["undefined", "boolean", "Error", "false"],
    correctAnswer: 0,
    explanation:
      "HTMLPreElement.prototype.wrap is an accessor property; accessing it on prototype returns undefined.",
  },
  {
    id: 324,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will console.log(HTMLUnknownElement.prototype.constructor === HTMLElement);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "HTMLUnknownElement inherits from HTMLElement, so its prototype constructor is HTMLElement.",
  },
  {
    id: 325,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(HTMLFrameElement.prototype.src);",
    options: ["undefined", "string", "Error", "empty string"],
    correctAnswer: 0,
    explanation:
      "HTMLFrameElement.prototype.src is an accessor property; accessing it on prototype returns undefined.",
  },
  {
    id: 326,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(HTMLFrameSetElement.prototype.cols);",
    options: ["undefined", "string", "Error", "empty string"],
    correctAnswer: 0,
    explanation:
      "HTMLFrameSetElement.prototype.cols is an accessor property; accessing it on prototype returns undefined.",
  },
  {
    id: 327,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(HTMLIFrameElement.prototype.sandbox);",
    options: ["DOMTokenList", "undefined", "Error", "null"],
    correctAnswer: 0,
    explanation:
      "HTMLIFrameElement.prototype.sandbox is a getter returning DOMTokenList when accessed on instance.",
  },
  {
    id: 328,
    category: "Javascript",
    difficulty: "hard",
    question: "What will console.log(HTMLEmbedElement.prototype.type);",
    options: ["undefined", "string", "Error", "empty string"],
    correctAnswer: 0,
    explanation:
      "HTMLEmbedElement.prototype.type is an accessor property; accessing it on prototype returns undefined.",
  },
  {
    id: 329,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(HTMLModElement.prototype.dateTime);",
    options: ["undefined", "string", "Error", "empty string"],
    correctAnswer: 0,
    explanation:
      "HTMLModElement.prototype.dateTime is an accessor property; accessing it on prototype returns undefined.",
  },
  {
    id: 330,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(HTMLFontElement.prototype.constructor === HTMLElement);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "HTMLFontElement inherits from HTMLElement, so its prototype constructor is HTMLElement.",
  },
  {
    id: 331,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(HTMLBaseFontElement.prototype.size);",
    options: ["undefined", "string", "Error", "empty string"],
    correctAnswer: 0,
    explanation:
      "HTMLBaseFontElement.prototype.size is an accessor property; accessing it on prototype returns undefined.",
  },
  {
    id: 332,
    category: "Javascript",
    difficulty: "hard",
    question: "What will console.log(HTMLDirectoryElement.prototype.compact);",
    options: ["undefined", "boolean", "Error", "false"],
    correctAnswer: 0,
    explanation:
      "HTMLDirectoryElement.prototype.compact is an accessor property; accessing it on prototype returns undefined.",
  },
  {
    id: 333,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(HTMLMenuElement.prototype.compact);",
    options: ["undefined", "boolean", "Error", "false"],
    correctAnswer: 0,
    explanation:
      "HTMLMenuElement.prototype.compact is an accessor property; accessing it on prototype returns undefined.",
  },
  {
    id: 334,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(HTMLMetaElement.prototype.httpEquiv);",
    options: ["undefined", "string", "Error", "empty string"],
    correctAnswer: 0,
    explanation:
      "HTMLMetaElement.prototype.httpEquiv is an accessor property; accessing it on prototype returns undefined.",
  },
  {
    id: 335,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(HTMLBaseElement.prototype.href);",
    options: ["undefined", "string", "Error", "empty string"],
    correctAnswer: 0,
    explanation:
      "HTMLBaseElement.prototype.href is an accessor property; accessing it on prototype returns undefined.",
  },
  {
    id: 336,
    category: "Javascript",
    difficulty: "hard",
    question: "What will console.log(HTMLStyleElement.prototype.disabled);",
    options: ["undefined", "boolean", "Error", "false"],
    correctAnswer: 0,
    explanation:
      "HTMLStyleElement.prototype.disabled is an accessor property; accessing it on prototype returns undefined.",
  },
  {
    id: 337,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(HTMLLinkElement.prototype.relList);",
    options: ["DOMTokenList", "undefined", "Error", "null"],
    correctAnswer: 0,
    explanation:
      "HTMLLinkElement.prototype.relList is a getter returning DOMTokenList when accessed on instance.",
  },
  {
    id: 338,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(HTMLTitleElement.prototype.text);",
    options: ["undefined", "string", "Error", "empty string"],
    correctAnswer: 0,
    explanation:
      "HTMLTitleElement.prototype.text is an accessor property; accessing it on prototype returns undefined.",
  },
  {
    id: 339,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(HTMLBodyElement.prototype.text);",
    options: ["undefined", "string", "Error", "empty string"],
    correctAnswer: 0,
    explanation:
      "HTMLBodyElement.prototype.text is an accessor property; accessing it on prototype returns undefined.",
  },
  {
    id: 340,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will console.log(HTMLTableCaptionElement.prototype.constructor === HTMLElement);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "HTMLTableCaptionElement inherits from HTMLElement, so its prototype constructor is HTMLElement.",
  },
  {
    id: 341,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(HTMLTableSectionElement.prototype.rows);",
    options: ["HTMLCollection", "undefined", "Error", "null"],
    correctAnswer: 0,
    explanation:
      "HTMLTableSectionElement.prototype.rows is a getter returning HTMLCollection of row elements.",
  },
  {
    id: 342,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(HTMLTableRowElement.prototype.cells);",
    options: ["HTMLCollection", "undefined", "Error", "null"],
    correctAnswer: 0,
    explanation:
      "HTMLTableRowElement.prototype.cells is a getter returning HTMLCollection of cell elements.",
  },
  {
    id: 343,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(HTMLTableCellElement.prototype.colSpan);",
    options: ["undefined", "number", "Error", "1"],
    correctAnswer: 0,
    explanation:
      "HTMLTableCellElement.prototype.colSpan is an accessor property; accessing it on prototype returns undefined.",
  },
  {
    id: 344,
    category: "Javascript",
    difficulty: "hard",
    question: "What will console.log(HTMLTableColElement.prototype.span);",
    options: ["undefined", "number", "Error", "1"],
    correctAnswer: 0,
    explanation:
      "HTMLTableColElement.prototype.span is an accessor property; accessing it on prototype returns undefined.",
  },
  {
    id: 345,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(HTMLFormControlsCollection.prototype.constructor === HTMLCollection);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "HTMLFormControlsCollection inherits from HTMLCollection, so its prototype constructor is HTMLCollection.",
  },
  {
    id: 346,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(HTMLAllCollection.prototype.length);",
    options: ["undefined", "number", "Error", "0"],
    correctAnswer: 0,
    explanation:
      "HTMLAllCollection.prototype.length is a getter returning 0 when accessed on prototype.",
  },
  {
    id: 347,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(RadioNodeList.prototype.value);",
    options: ["undefined", "string", "Error", "empty string"],
    correctAnswer: 0,
    explanation:
      "RadioNodeList.prototype.value is a getter returning empty string when accessed on prototype.",
  },
  {
    id: 348,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will console.log(HTMLOptionsCollection.prototype.selectedIndex);",
    options: ["undefined", "number", "Error", "-1"],
    correctAnswer: 0,
    explanation:
      "HTMLOptionsCollection.prototype.selectedIndex is a getter returning -1 when accessed on prototype.",
  },
  {
    id: 349,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(HTMLDocument.prototype.constructor === Document);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "HTMLDocument inherits from Document, so its prototype constructor is Document.",
  },
  {
    id: 350,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(XMLDocument.prototype.constructor === Document);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "XMLDocument inherits from Document, so its prototype constructor is Document.",
  },
  {
    id: 351,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(DocumentFragment.prototype.constructor === DocumentFragment);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "DocumentFragment.prototype.constructor points back to the DocumentFragment constructor function.",
  },
  {
    id: 352,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will console.log(ShadowRoot.prototype.constructor === ShadowRoot);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "ShadowRoot.prototype.constructor points back to the ShadowRoot constructor function.",
  },
  {
    id: 353,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(CharacterData.prototype.constructor === CharacterData);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "CharacterData.prototype.constructor points back to the CharacterData constructor function.",
  },
  {
    id: 354,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(Text.prototype.constructor === Text);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "Text.prototype.constructor points back to the Text constructor function.",
  },
  {
    id: 355,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(Comment.prototype.constructor === Comment);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "Comment.prototype.constructor points back to the Comment constructor function.",
  },
  {
    id: 356,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will console.log(CDATASection.prototype.constructor === CDATASection);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "CDATASection.prototype.constructor points back to the CDATASection constructor function.",
  },
  {
    id: 357,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(ProcessingInstruction.prototype.constructor === ProcessingInstruction);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "ProcessingInstruction.prototype.constructor points back to the ProcessingInstruction constructor function.",
  },
  {
    id: 358,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(DOMImplementation.prototype.constructor === DOMImplementation);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "DOMImplementation.prototype.constructor points back to the DOMImplementation constructor function.",
  },
  {
    id: 359,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(DocumentType.prototype.constructor === DocumentType);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "DocumentType.prototype.constructor points back to the DocumentType constructor function.",
  },
  {
    id: 360,
    category: "Javascript",
    difficulty: "hard",
    question: "What will console.log(Attr.prototype.constructor === Attr);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "Attr.prototype.constructor points back to the Attr constructor function.",
  },
  {
    id: 361,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(Event.prototype.constructor === Event);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "Event.prototype.constructor points back to the Event constructor function.",
  },
  {
    id: 362,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(CustomEvent.prototype.constructor === CustomEvent);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "CustomEvent.prototype.constructor points back to the CustomEvent constructor function.",
  },
  {
    id: 363,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(MouseEvent.prototype.constructor === MouseEvent);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "MouseEvent.prototype.constructor points back to the MouseEvent constructor function.",
  },
  {
    id: 364,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will console.log(KeyboardEvent.prototype.constructor === KeyboardEvent);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "KeyboardEvent.prototype.constructor points back to the KeyboardEvent constructor function.",
  },
  {
    id: 365,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(TouchEvent.prototype.constructor === TouchEvent);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "TouchEvent.prototype.constructor points back to the TouchEvent constructor function.",
  },
  {
    id: 366,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(WheelEvent.prototype.constructor === WheelEvent);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "WheelEvent.prototype.constructor points back to the WheelEvent constructor function.",
  },
  {
    id: 367,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(FocusEvent.prototype.constructor === FocusEvent);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "FocusEvent.prototype.constructor points back to the FocusEvent constructor function.",
  },
  {
    id: 368,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will console.log(InputEvent.prototype.constructor === InputEvent);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "InputEvent.prototype.constructor points back to the InputEvent constructor function.",
  },
  {
    id: 369,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(CompositionEvent.prototype.constructor === CompositionEvent);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "CompositionEvent.prototype.constructor points back to the CompositionEvent constructor function.",
  },
  {
    id: 370,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(DragEvent.prototype.constructor === DragEvent);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "DragEvent.prototype.constructor points back to the DragEvent constructor function.",
  },
  {
    id: 371,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(ClipboardEvent.prototype.constructor === ClipboardEvent);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "ClipboardEvent.prototype.constructor points back to the ClipboardEvent constructor function.",
  },
  {
    id: 372,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will console.log(PointerEvent.prototype.constructor === PointerEvent);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "PointerEvent.prototype.constructor points back to the PointerEvent constructor function.",
  },
  {
    id: 373,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(HashChangeEvent.prototype.constructor === HashChangeEvent);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "HashChangeEvent.prototype.constructor points back to the HashChangeEvent constructor function.",
  },
  {
    id: 374,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(PageTransitionEvent.prototype.constructor === PageTransitionEvent);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "PageTransitionEvent.prototype.constructor points back to the PageTransitionEvent constructor function.",
  },
  {
    id: 375,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(PopStateEvent.prototype.constructor === PopStateEvent);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "PopStateEvent.prototype.constructor points back to the PopStateEvent constructor function.",
  },
  {
    id: 376,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will console.log(StorageEvent.prototype.constructor === StorageEvent);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "StorageEvent.prototype.constructor points back to the StorageEvent constructor function.",
  },
  {
    id: 377,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(SubmitEvent.prototype.constructor === SubmitEvent);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "SubmitEvent.prototype.constructor points back to the SubmitEvent constructor function.",
  },
  {
    id: 378,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(TransitionEvent.prototype.constructor === TransitionEvent);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "TransitionEvent.prototype.constructor points back to the TransitionEvent constructor function.",
  },
  {
    id: 379,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(AnimationEvent.prototype.constructor === AnimationEvent);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "AnimationEvent.prototype.constructor points back to the AnimationEvent constructor function.",
  },
  {
    id: 380,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will console.log(ErrorEvent.prototype.constructor === ErrorEvent);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "ErrorEvent.prototype.constructor points back to the ErrorEvent constructor function.",
  },
  {
    id: 381,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(CloseEvent.prototype.constructor === CloseEvent);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "CloseEvent.prototype.constructor points back to the CloseEvent constructor function.",
  },
  {
    id: 382,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(MessageEvent.prototype.constructor === MessageEvent);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "MessageEvent.prototype.constructor points back to the MessageEvent constructor function.",
  },
  {
    id: 383,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(ProgressEvent.prototype.constructor === ProgressEvent);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "ProgressEvent.prototype.constructor points back to the ProgressEvent constructor function.",
  },
  {
    id: 384,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will console.log(XMLHttpRequestEventTarget.prototype.constructor === XMLHttpRequestEventTarget);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "XMLHttpRequestEventTarget.prototype.constructor points back to the XMLHttpRequestEventTarget constructor function.",
  },
  {
    id: 385,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(XMLHttpRequestUpload.prototype.constructor === XMLHttpRequestUpload);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "XMLHttpRequestUpload.prototype.constructor points back to the XMLHttpRequestUpload constructor function.",
  },
  {
    id: 386,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(FileReader.prototype.constructor === FileReader);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "FileReader.prototype.constructor points back to the FileReader constructor function.",
  },
  {
    id: 387,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(FileReaderSync.prototype.constructor === FileReaderSync);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "FileReaderSync.prototype.constructor points back to the FileReaderSync constructor function.",
  },
  {
    id: 388,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will console.log(IDBCursor.prototype.constructor === IDBCursor);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "IDBCursor.prototype.constructor points back to the IDBCursor constructor function.",
  },
  {
    id: 389,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(IDBCursorWithValue.prototype.constructor === IDBCursorWithValue);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "IDBCursorWithValue.prototype.constructor points back to the IDBCursorWithValue constructor function.",
  },
  {
    id: 390,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(IDBDatabase.prototype.constructor === IDBDatabase);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "IDBDatabase.prototype.constructor points back to the IDBDatabase constructor function.",
  },
  {
    id: 391,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(IDBFactory.prototype.constructor === IDBFactory);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "IDBFactory.prototype.constructor points back to the IDBFactory constructor function.",
  },
  {
    id: 392,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will console.log(IDBIndex.prototype.constructor === IDBIndex);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "IDBIndex.prototype.constructor points back to the IDBIndex constructor function.",
  },
  {
    id: 393,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(IDBKeyRange.prototype.constructor === IDBKeyRange);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "IDBKeyRange.prototype.constructor points back to the IDBKeyRange constructor function.",
  },
  {
    id: 394,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(IDBObjectStore.prototype.constructor === IDBObjectStore);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "IDBObjectStore.prototype.constructor points back to the IDBObjectStore constructor function.",
  },
  {
    id: 395,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(IDBOpenDBRequest.prototype.constructor === IDBOpenDBRequest);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "IDBOpenDBRequest.prototype.constructor points back to the IDBOpenDBRequest constructor function.",
  },
  {
    id: 396,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will console.log(IDBRequest.prototype.constructor === IDBRequest);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "IDBRequest.prototype.constructor points back to the IDBRequest constructor function.",
  },
  {
    id: 397,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the output of: console.log(IDBTransaction.prototype.constructor === IDBTransaction);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "IDBTransaction.prototype.constructor points back to the IDBTransaction constructor function.",
  },
  {
    id: 398,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will this code output? console.log(IDBVersionChangeEvent.prototype.constructor === IDBVersionChangeEvent);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "IDBVersionChangeEvent.prototype.constructor points back to the IDBVersionChangeEvent constructor function.",
  },
  {
    id: 399,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What is the result of: console.log(ApplicationCache.prototype.constructor === ApplicationCache);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "ApplicationCache.prototype.constructor points back to the ApplicationCache constructor function.",
  },
  {
    id: 400,
    category: "Javascript",
    difficulty: "hard",
    question:
      "What will console.log(Performance.prototype.constructor === Performance);",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: 0,
    explanation:
      "Performance.prototype.constructor points back to the Performance constructor function.",
  },
];

// 400 questions
export const tsMCQs = [
  {
    id: 1,
    category: "Typescript",
    difficulty: "easy",
    question: "What is TypeScript?",
    options: [
      "A JavaScript runtime",
      "A superset of JavaScript that adds static typing",
      "A CSS framework",
      "A database query language",
    ],
    correctAnswer: 1,
    explanation:
      "TypeScript is a superset of JavaScript that adds optional static typing and other features. It compiles to plain JavaScript.",
  },
  {
    id: 2,
    category: "Typescript",
    difficulty: "easy",
    question: "How do you define an interface in TypeScript?",
    options: [
      "class MyInterface {}",
      "interface MyInterface {}",
      "type MyInterface = {}",
      "function MyInterface() {}",
    ],
    correctAnswer: 1,
    explanation:
      "Interfaces in TypeScript are defined using the interface keyword followed by the interface name and its structure.",
  },
  {
    id: 3,
    category: "Typescript",
    difficulty: "easy",
    question:
      "What is the difference between interface and type in TypeScript?",
    options: [
      "No difference, they are identical",
      "interface can be extended, type cannot",
      "interface can be merged, type cannot",
      "type is more performant than interface",
    ],
    correctAnswer: 2,
    explanation:
      "Interfaces can be merged (declaration merging) and extended, while types are more flexible for unions and computed properties but cannot be merged.",
  },
  {
    id: 4,
    category: "Typescript",
    difficulty: "easy",
    question: "How do you specify that a parameter is optional in TypeScript?",
    options: [
      "parameter: string | undefined",
      "parameter?: string",
      "optional parameter: string",
      "parameter: string?",
    ],
    correctAnswer: 1,
    explanation:
      "Optional parameters in TypeScript are denoted by adding a question mark (?) after the parameter name.",
  },
  {
    id: 5,
    category: "Typescript",
    difficulty: "easy",
    question: "What is a generic in TypeScript?",
    options: [
      "A way to create reusable components that work with multiple types",
      "A built-in TypeScript function",
      "A type of variable declaration",
      "A method for handling errors",
    ],
    correctAnswer: 0,
    explanation:
      "Generics allow you to create reusable components that can work with multiple types while maintaining type safety.",
  },
  {
    id: 6,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which of the following is the correct way to define a string type?",
    options: [
      "let name: String = 'John';",
      "let name: string = 'John';",
      "let name: TEXT = 'John';",
      "let name: str = 'John';",
    ],
    correctAnswer: 1,
    explanation:
      "In TypeScript, primitive types are lowercase. Use 'string' not 'String' for primitive string type.",
  },
  {
    id: 7,
    category: "Typescript",
    difficulty: "easy",
    question: "What does the 'any' type represent in TypeScript?",
    options: [
      "A type that can be any string value",
      "A type that disables type checking",
      "A type that can only be numbers",
      "A type that represents arrays only",
    ],
    correctAnswer: 1,
    explanation:
      "The 'any' type essentially disables TypeScript's type checking and allows any value to be assigned.",
  },
  {
    id: 8,
    category: "Typescript",
    difficulty: "easy",
    question: "How do you define an array of numbers in TypeScript?",
    options: [
      "let numbers: number[] = [1, 2, 3];",
      "let numbers: Array[number] = [1, 2, 3];",
      "let numbers: [number] = [1, 2, 3];",
      "let numbers: number{} = [1, 2, 3];",
    ],
    correctAnswer: 0,
    explanation:
      "Arrays in TypeScript can be defined using type[] syntax. number[] represents an array of numbers.",
  },
  {
    id: 9,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the purpose of the tsconfig.json file?",
    options: [
      "To store project dependencies",
      "To configure TypeScript compiler options",
      "To define CSS styles",
      "To manage database connections",
    ],
    correctAnswer: 1,
    explanation:
      "tsconfig.json contains configuration options for the TypeScript compiler, including target, module, and other compilation settings.",
  },
  {
    id: 10,
    category: "Typescript",
    difficulty: "easy",
    question: "Which command compiles TypeScript files?",
    options: [
      "node filename.ts",
      "tsc filename.ts",
      "npm run filename.ts",
      "ts-compile filename.ts",
    ],
    correctAnswer: 1,
    explanation:
      "The 'tsc' (TypeScript Compiler) command is used to compile TypeScript files to JavaScript.",
  },
  {
    id: 11,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the default file extension for TypeScript files?",
    options: [".js", ".ts", ".typescript", ".tsx"],
    correctAnswer: 1,
    explanation:
      "TypeScript files use the .ts extension. .tsx is used for TypeScript files with JSX.",
  },
  {
    id: 12,
    category: "Typescript",
    difficulty: "easy",
    question: "How do you define a function type in TypeScript?",
    options: [
      "function(a: number, b: number): number",
      "(a: number, b: number) => number",
      "func: number -> number",
      "def(a: number, b: number): number",
    ],
    correctAnswer: 1,
    explanation:
      "Function types in TypeScript use arrow syntax: (parameters) => returnType.",
  },
  {
    id: 13,
    category: "Typescript",
    difficulty: "easy",
    question: "What does 'strict' mode enable in TypeScript?",
    options: [
      "Only allows ES6 features",
      "Enables all strict type checking options",
      "Disables type inference",
      "Forces explicit return types",
    ],
    correctAnswer: 1,
    explanation:
      "Strict mode enables a family of strict type checking options like noImplicitAny, strictNullChecks, etc.",
  },
  {
    id: 14,
    category: "Typescript",
    difficulty: "easy",
    question: "What is type inference in TypeScript?",
    options: [
      "Manually specifying all types",
      "TypeScript automatically determining types",
      "Converting types at runtime",
      "Importing types from other files",
    ],
    correctAnswer: 1,
    explanation:
      "Type inference is TypeScript's ability to automatically determine and assign types based on the value or context.",
  },
  {
    id: 15,
    category: "Typescript",
    difficulty: "easy",
    question: "How do you define a literal type in TypeScript?",
    options: [
      "type Status = 'active' | 'inactive';",
      "type Status = string;",
      "type Status = literal('active', 'inactive');",
      "type Status = enum('active', 'inactive');",
    ],
    correctAnswer: 0,
    explanation:
      "Literal types use union syntax with specific string, number, or boolean values.",
  },
  {
    id: 16,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the 'void' type used for?",
    options: [
      "Functions that return nothing",
      "Variables that can be null",
      "Empty objects",
      "Undefined variables",
    ],
    correctAnswer: 0,
    explanation:
      "void is used for functions that don't return a value (undefined return).",
  },
  {
    id: 17,
    category: "Typescript",
    difficulty: "easy",
    question: "How do you make a property readonly in an interface?",
    options: [
      "const property: string;",
      "readonly property: string;",
      "final property: string;",
      "immutable property: string;",
    ],
    correctAnswer: 1,
    explanation:
      "The 'readonly' modifier makes interface properties immutable after initialization.",
  },
  {
    id: 18,
    category: "Typescript",
    difficulty: "easy",
    question: "What is a tuple in TypeScript?",
    options: [
      "An array with fixed length and types",
      "A type of object",
      "A function parameter",
      "A generic constraint",
    ],
    correctAnswer: 0,
    explanation:
      "Tuples are arrays with a fixed number of elements where each element can have a different type.",
  },
  {
    id: 19,
    category: "Typescript",
    difficulty: "easy",
    question: "How do you define a tuple with two elements?",
    options: [
      "let tuple: [string, number] = ['hello', 42];",
      "let tuple: (string, number) = ['hello', 42];",
      "let tuple: {string, number} = ['hello', 42];",
      "let tuple: string | number = ['hello', 42];",
    ],
    correctAnswer: 0,
    explanation:
      "Tuples use square brackets with comma-separated types: [type1, type2].",
  },
  {
    id: 20,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the 'never' type?",
    options: [
      "A type for variables that are never used",
      "A type for functions that never return",
      "A type for null values",
      "A type for empty arrays",
    ],
    correctAnswer: 1,
    explanation:
      "The 'never' type represents functions that never return (throw errors or infinite loops).",
  },
  {
    id: 21,
    category: "Typescript",
    difficulty: "easy",
    question: "How do you define an enum in TypeScript?",
    options: [
      "enum Colors { Red, Green, Blue }",
      "const Colors = { Red, Green, Blue }",
      "type Colors = 'Red' | 'Green' | 'Blue'",
      "interface Colors { Red; Green; Blue; }",
    ],
    correctAnswer: 0,
    explanation:
      "Enums are defined using the 'enum' keyword followed by the enum name and values in braces.",
  },
  {
    id: 22,
    category: "Typescript",
    difficulty: "easy",
    question:
      "What is the difference between 'null' and 'undefined' in TypeScript?",
    options: [
      "They are identical",
      "null is intentional absence, undefined is uninitialized",
      "null is for numbers, undefined is for strings",
      "undefined is intentional absence, null is uninitialized",
    ],
    correctAnswer: 1,
    explanation:
      "null represents intentional absence of value, undefined represents uninitialized or missing value.",
  },
  {
    id: 23,
    category: "Typescript",
    difficulty: "easy",
    question: "How do you specify multiple types for a variable (union types)?",
    options: [
      "let value: string & number;",
      "let value: string | number;",
      "let value: string + number;",
      "let value: string, number;",
    ],
    correctAnswer: 1,
    explanation:
      "Union types use the pipe symbol (|) to specify multiple possible types.",
  },
  {
    id: 24,
    category: "Typescript",
    difficulty: "easy",
    question: "What is type assertion in TypeScript?",
    options: [
      "Automatically converting types",
      "Telling the compiler to treat a value as a specific type",
      "Validating types at runtime",
      "Creating new types",
    ],
    correctAnswer: 1,
    explanation:
      "Type assertion tells TypeScript compiler to treat a value as a specific type, overriding inference.",
  },
  {
    id: 25,
    category: "Typescript",
    difficulty: "easy",
    question: "Which syntax is used for type assertion?",
    options: [
      "<Type>value or value as Type",
      "Type(value)",
      "value.asType()",
      "cast<Type>(value)",
    ],
    correctAnswer: 0,
    explanation:
      "Type assertion can be done using angle bracket syntax <Type>value or 'as' syntax value as Type.",
  },
  {
    id: 26,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the purpose of the 'keyof' operator?",
    options: [
      "To get the keys of an object as a union type",
      "To check if a key exists",
      "To create new object keys",
      "To delete object properties",
    ],
    correctAnswer: 0,
    explanation:
      "The 'keyof' operator returns a union type of all property names of a given type.",
  },
  {
    id: 27,
    category: "Typescript",
    difficulty: "easy",
    question: "How do you extend an interface?",
    options: [
      "interface Child extends Parent { }",
      "interface Child implements Parent { }",
      "interface Child inherits Parent { }",
      "interface Child: Parent { }",
    ],
    correctAnswer: 0,
    explanation:
      "Interface extension uses the 'extends' keyword to inherit properties from another interface.",
  },
  {
    id: 28,
    category: "Typescript",
    difficulty: "easy",
    question: "What is a class in TypeScript?",
    options: [
      "A blueprint for creating objects",
      "A type of function",
      "A primitive data type",
      "A compiler option",
    ],
    correctAnswer: 0,
    explanation:
      "Classes in TypeScript are blueprints for creating objects with properties and methods.",
  },
  {
    id: 29,
    category: "Typescript",
    difficulty: "easy",
    question: "How do you define a private property in a TypeScript class?",
    options: [
      "private property: string;",
      "protected property: string;",
      "hidden property: string;",
      "local property: string;",
    ],
    correctAnswer: 0,
    explanation:
      "The 'private' access modifier restricts property access to within the same class.",
  },
  {
    id: 30,
    category: "Typescript",
    difficulty: "easy",
    question:
      "What is the difference between 'public', 'private', and 'protected'?",
    options: [
      "No difference in TypeScript",
      "public: everywhere, private: same class, protected: class and subclasses",
      "public: same file, private: same class, protected: same module",
      "They only affect runtime behavior",
    ],
    correctAnswer: 1,
    explanation:
      "public is accessible everywhere, private only within the same class, protected within class and subclasses.",
  },
  {
    id: 31,
    category: "Typescript",
    difficulty: "easy",
    question: "How do you define a constructor in TypeScript?",
    options: [
      "constructor(parameters) { }",
      "function constructor(parameters) { }",
      "init(parameters) { }",
      "create(parameters) { }",
    ],
    correctAnswer: 0,
    explanation:
      "Constructors in TypeScript classes are defined using the 'constructor' keyword.",
  },
  {
    id: 32,
    category: "Typescript",
    difficulty: "easy",
    question: "What is inheritance in TypeScript?",
    options: [
      "Sharing methods between unrelated classes",
      "A class extending another class to inherit properties and methods",
      "Creating multiple instances of a class",
      "Defining interfaces",
    ],
    correctAnswer: 1,
    explanation:
      "Inheritance allows a class to extend another class, inheriting its properties and methods.",
  },
  {
    id: 33,
    category: "Typescript",
    difficulty: "easy",
    question: "Which keyword is used for class inheritance?",
    options: ["inherits", "extends", "implements", "derives"],
    correctAnswer: 1,
    explanation:
      "The 'extends' keyword is used for class inheritance in TypeScript.",
  },
  {
    id: 34,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the 'super' keyword used for?",
    options: [
      "To access parent class properties and methods",
      "To create a new instance",
      "To define static methods",
      "To make properties public",
    ],
    correctAnswer: 0,
    explanation:
      "The 'super' keyword allows access to parent class properties, methods, and constructor.",
  },
  {
    id: 35,
    category: "Typescript",
    difficulty: "easy",
    question: "How do you define a static method in TypeScript?",
    options: [
      "static methodName() { }",
      "const methodName() { }",
      "class methodName() { }",
      "global methodName() { }",
    ],
    correctAnswer: 0,
    explanation:
      "Static methods are defined using the 'static' keyword and belong to the class rather than instances.",
  },
  {
    id: 36,
    category: "Typescript",
    difficulty: "easy",
    question: "What is an abstract class?",
    options: [
      "A class that cannot be instantiated directly",
      "A class with no methods",
      "A class with only static methods",
      "A class that implements interfaces",
    ],
    correctAnswer: 0,
    explanation:
      "Abstract classes cannot be instantiated directly and are meant to be extended by other classes.",
  },
  {
    id: 37,
    category: "Typescript",
    difficulty: "easy",
    question: "How do you define an abstract class?",
    options: [
      "abstract class ClassName { }",
      "interface class ClassName { }",
      "virtual class ClassName { }",
      "base class ClassName { }",
    ],
    correctAnswer: 0,
    explanation:
      "Abstract classes are defined using the 'abstract' keyword before the class declaration.",
  },
  {
    id: 38,
    category: "Typescript",
    difficulty: "easy",
    question: "What is method overriding?",
    options: [
      "Creating multiple methods with the same name",
      "A subclass providing a specific implementation of a parent class method",
      "Deleting methods from parent classes",
      "Making methods private",
    ],
    correctAnswer: 1,
    explanation:
      "Method overriding allows a subclass to provide a specific implementation of a method defined in its parent class.",
  },
  {
    id: 39,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the 'implements' keyword used for?",
    options: [
      "Class inheritance",
      "Ensuring a class conforms to an interface contract",
      "Method overloading",
      "Creating abstract classes",
    ],
    correctAnswer: 1,
    explanation:
      "The 'implements' keyword ensures that a class conforms to the structure defined by an interface.",
  },
  {
    id: 40,
    category: "Typescript",
    difficulty: "easy",
    question: "What are index signatures?",
    options: [
      "A way to define dynamic property names",
      "Array indexing syntax",
      "Function parameters",
      "Import statements",
    ],
    correctAnswer: 0,
    explanation:
      "Index signatures allow defining types for dynamic property names using [key: type]: valueType syntax.",
  },
  {
    id: 41,
    category: "Typescript",
    difficulty: "easy",
    question: "How do you define an index signature?",
    options: [
      "[key: string]: any",
      "{key: string}: any",
      "(key: string) => any",
      "key[string]: any",
    ],
    correctAnswer: 0,
    explanation:
      "Index signatures use square brackets with key type and value type: [key: keyType]: valueType.",
  },
  {
    id: 42,
    category: "Typescript",
    difficulty: "easy",
    question: "What is a namespace in TypeScript?",
    options: [
      "A way to group related code and avoid naming conflicts",
      "A type of class",
      "A function declaration",
      "An import statement",
    ],
    correctAnswer: 0,
    explanation:
      "Namespaces group related code under a common name to avoid naming conflicts and organize code.",
  },
  {
    id: 43,
    category: "Typescript",
    difficulty: "easy",
    question: "How do you declare a namespace?",
    options: [
      "namespace MyNamespace { }",
      "module MyNamespace { }",
      "package MyNamespace { }",
      "group MyNamespace { }",
    ],
    correctAnswer: 0,
    explanation:
      "Namespaces are declared using the 'namespace' keyword (though modules are preferred in modern TypeScript).",
  },
  {
    id: 44,
    category: "Typescript",
    difficulty: "easy",
    question: "What is a module in TypeScript?",
    options: [
      "A file with imports/exports",
      "A type of class",
      "A compiler option",
      "A namespace alias",
    ],
    correctAnswer: 0,
    explanation:
      "Modules are TypeScript files that use import/export statements to share code between files.",
  },
  {
    id: 45,
    category: "Typescript",
    difficulty: "easy",
    question: "How do you export a function from a module?",
    options: [
      "export function myFunction() { }",
      "public function myFunction() { }",
      "module.exports = myFunction",
      "share function myFunction() { }",
    ],
    correctAnswer: 0,
    explanation:
      "Functions are exported using the 'export' keyword before the function declaration.",
  },
  {
    id: 46,
    category: "Typescript",
    difficulty: "easy",
    question: "How do you import a function from another module?",
    options: [
      "import { myFunction } from './module';",
      "include myFunction from './module';",
      "require myFunction from './module';",
      "use myFunction from './module';",
    ],
    correctAnswer: 0,
    explanation:
      "Named exports are imported using destructuring syntax: import { name } from 'module'.",
  },
  {
    id: 47,
    category: "Typescript",
    difficulty: "easy",
    question: "What is a default export?",
    options: [
      "The main export from a module",
      "An export that cannot be imported",
      "An automatically generated export",
      "An export with no name",
    ],
    correctAnswer: 0,
    explanation:
      "A default export is the main export from a module, imported without braces.",
  },
  {
    id: 48,
    category: "Typescript",
    difficulty: "easy",
    question: "How do you define a default export?",
    options: [
      "export default myFunction;",
      "default export myFunction;",
      "export main myFunction;",
      "export primary myFunction;",
    ],
    correctAnswer: 0,
    explanation:
      "Default exports use the 'export default' syntax before the value to export.",
  },
  {
    id: 49,
    category: "Typescript",
    difficulty: "easy",
    question: "What is type aliasing?",
    options: [
      "Creating alternative names for existing types",
      "Converting between types",
      "Importing types from modules",
      "Extending interfaces",
    ],
    correctAnswer: 0,
    explanation:
      "Type aliases create new names for existing types using the 'type' keyword.",
  },
  {
    id: 50,
    category: "Typescript",
    difficulty: "easy",
    question: "How do you create a type alias?",
    options: [
      "type MyType = string;",
      "alias MyType = string;",
      "typedef MyType = string;",
      "let MyType = string;",
    ],
    correctAnswer: 0,
    explanation:
      "Type aliases are created using the 'type' keyword followed by the alias name and assignment.",
  },
  {
    id: 51,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the 'unknown' type?",
    options: [
      "Same as 'any' type",
      "A type-safe alternative to 'any'",
      "A type for undefined values",
      "A type for functions only",
    ],
    correctAnswer: 1,
    explanation:
      "The 'unknown' type is a type-safe alternative to 'any' that requires type checking before use.",
  },
  {
    id: 52,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the difference between 'any' and 'unknown'?",
    options: [
      "No difference",
      "unknown requires type checking before use, any doesn't",
      "any is for objects, unknown is for primitives",
      "unknown is deprecated",
    ],
    correctAnswer: 1,
    explanation:
      "Unlike 'any', 'unknown' requires type checking or assertion before you can perform operations on it.",
  },
  {
    id: 53,
    category: "Typescript",
    difficulty: "easy",
    question: "What is intersection types?",
    options: [
      "Combining multiple types into one",
      "Finding common properties between types",
      "Creating type hierarchies",
      "Type conversion methods",
    ],
    correctAnswer: 0,
    explanation:
      "Intersection types combine multiple types using & operator, creating a type that has all properties of the combined types.",
  },
  {
    id: 54,
    category: "Typescript",
    difficulty: "easy",
    question: "How do you create an intersection type?",
    options: [
      "Type1 & Type2",
      "Type1 | Type2",
      "Type1 + Type2",
      "Type1 && Type2",
    ],
    correctAnswer: 0,
    explanation:
      "Intersection types use the ampersand (&) operator to combine multiple types.",
  },
  {
    id: 55,
    category: "Typescript",
    difficulty: "easy",
    question: "What are optional chaining operators?",
    options: [
      "?. for safe property access",
      "?? for null coalescing",
      "?: for optional parameters",
      "?= for optional assignment",
    ],
    correctAnswer: 0,
    explanation:
      "Optional chaining (?.) allows safe access to nested properties that might be null or undefined.",
  },
  {
    id: 56,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the nullish coalescing operator?",
    options: ["??", "?.", "||", "&&"],
    correctAnswer: 0,
    explanation:
      "The nullish coalescing operator (??) returns the right operand when the left is null or undefined.",
  },
  {
    id: 57,
    category: "Typescript",
    difficulty: "easy",
    question: "What is a discriminated union?",
    options: [
      "A union type with a common discriminator property",
      "A type that excludes certain values",
      "A union of primitive types only",
      "An intersection of union types",
    ],
    correctAnswer: 0,
    explanation:
      "Discriminated unions have a common property (discriminator) that helps TypeScript narrow the type.",
  },
  {
    id: 58,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the 'object' type?",
    options: [
      "Type for any non-primitive value",
      "Type for plain objects only",
      "Type for arrays only",
      "Type for functions only",
    ],
    correctAnswer: 0,
    explanation:
      "The 'object' type represents any non-primitive type (anything that's not string, number, boolean, symbol, null, or undefined).",
  },
  {
    id: 59,
    category: "Typescript",
    difficulty: "easy",
    question: "How do you define a function with optional parameters?",
    options: [
      "function fn(a: string, b?: number) { }",
      "function fn(a: string, b: number | null) { }",
      "function fn(a: string, optional b: number) { }",
      "function fn(a: string, b: number?) { }",
    ],
    correctAnswer: 0,
    explanation:
      "Optional parameters use the ? syntax after the parameter name.",
  },
  {
    id: 60,
    category: "Typescript",
    difficulty: "easy",
    question: "What are rest parameters in TypeScript?",
    options: [
      "Parameters that accept variable number of arguments",
      "Parameters that are optional",
      "Parameters that have default values",
      "Parameters that are readonly",
    ],
    correctAnswer: 0,
    explanation:
      "Rest parameters (...args) allow functions to accept a variable number of arguments as an array.",
  },
  {
    id: 61,
    category: "Typescript",
    difficulty: "easy",
    question: "How do you define rest parameters?",
    options: [
      "function fn(...args: number[]) { }",
      "function fn(*args: number[]) { }",
      "function fn(args: ...number[]) { }",
      "function fn(args: number...) { }",
    ],
    correctAnswer: 0,
    explanation:
      "Rest parameters use the spread operator (...) before the parameter name.",
  },
  {
    id: 62,
    category: "Typescript",
    difficulty: "easy",
    question: "What is function overloading?",
    options: [
      "Defining multiple function signatures for the same function",
      "Creating functions with the same name in different classes",
      "Calling functions recursively",
      "Using default parameters",
    ],
    correctAnswer: 0,
    explanation:
      "Function overloading allows defining multiple signatures for a single function implementation.",
  },
  {
    id: 63,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the 'this' type?",
    options: [
      "A type that represents the current object context",
      "A keyword for creating instances",
      "A type for static methods",
      "A type for constructors",
    ],
    correctAnswer: 0,
    explanation:
      "The 'this' type refers to the type of the current object context in methods and functions.",
  },
  {
    id: 64,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which type represents a variable that can be either a string or null but NOT undefined?",
    options: [
      "string | null",
      "string | undefined",
      "string | null | undefined",
      "string?",
    ],
    correctAnswer: 0,
    explanation:
      "Using the union 'string | null' explicitly excludes undefined, while 'string?' includes undefined in strictNullChecks.",
  },
  {
    id: 65,
    category: "Typescript",
    difficulty: "easy",
    question:
      "How do you tell TypeScript that a DOM element queried by ID is definitely an HTMLInputElement?",
    options: [
      "document.getElementById('x') as HTMLInputElement",
      "<HTMLInputElement>document.getElementById('x')",
      "document.getElementById<HTMLInputElement>('x')",
      "Both A and B",
    ],
    correctAnswer: 3,
    explanation:
      "Both angle-bracket and 'as' assertions work; choose 'as' in TSX files to avoid JSX ambiguity.",
  },
  {
    id: 66,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the output type of the mapped type 'Readonly<T>'?",
    options: [
      "All properties of T become optional",
      "All properties of T become readonly",
      "All properties of T become nullable",
      "T is wrapped in Promise",
    ],
    correctAnswer: 1,
    explanation:
      "Readonly<T> maps each property of T to a readonly version, preventing reassignment.",
  },
  {
    id: 67,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which compiler option forces you to handle potentially undefined array indices?",
    options: [
      "strictNullChecks",
      "noUncheckedIndexedAccess",
      "exactOptionalPropertyTypes",
      "strictPropertyInitialization",
    ],
    correctAnswer: 1,
    explanation:
      "noUncheckedIndexedAccess adds 'undefined' to every array/tuple access, catching out-of-bounds errors.",
  },
  {
    id: 68,
    category: "Typescript",
    difficulty: "easy",
    question:
      "What is the preferred way to type the return of an async function that resolves to a number?",
    options: [
      "async function f(): number",
      "async function f(): Promise<number>",
      "function f(): Async<number>",
      "function f(): number",
    ],
    correctAnswer: 1,
    explanation:
      "Async functions always wrap their return value in Promise, so the type must be Promise<T>.",
  },
  {
    id: 69,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which utility type removes the '?' modifier from all properties?",
    options: ["NonNullable<T>", "Required<T>", "Partial<T>", "Mutable<T>"],
    correctAnswer: 1,
    explanation:
      "Required<T> converts optional properties to required ones, stripping the '?' modifier.",
  },
  {
    id: 70,
    category: "Typescript",
    difficulty: "easy",
    question:
      "How do you declare that a generic parameter must have a string index signature?",
    options: [
      "T extends { [k: string]: any }",
      "T implements { [k: string]: any }",
      "T : { [k: string]: any }",
      "T satisfies { [k: string]: any }",
    ],
    correctAnswer: 0,
    explanation:
      "Generic constraints use 'extends' to enforce structural requirements like index signatures.",
  },
  {
    id: 71,
    category: "Typescript",
    difficulty: "easy",
    question:
      "What is the type of 'import.meta.url' in a modern TypeScript file?",
    options: ["string", "URL", "any", "undefined"],
    correctAnswer: 0,
    explanation:
      "import.meta.url is standardized as a string containing the module's URL.",
  },
  {
    id: 72,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which declaration merges with a same-name function in TypeScript?",
    options: ["namespace", "interface", "type alias", "class"],
    correctAnswer: 0,
    explanation:
      "Functions and namespaces with the same name merge; this is often used for adding static properties.",
  },
  {
    id: 73,
    category: "Typescript",
    difficulty: "easy",
    question: "What does the 'satisfies' operator do (TS 4.9+)?",
    options: [
      "Narrows a literal type",
      "Checks that a value conforms to a type without changing its inferred type",
      "Throws if the value does not match",
      "Creates a brand-new type",
    ],
    correctAnswer: 1,
    explanation:
      "'satisfies' validates the shape while preserving the original literal type for better inference.",
  },
  {
    id: 74,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which of these is NOT a valid accessibility modifier for class members?",
    options: ["public", "protected", "private", "internal"],
    correctAnswer: 3,
    explanation:
      "TypeScript only provides public, protected, and private; 'internal' is a C# modifier.",
  },
  {
    id: 75,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the resulting type of 'keyof any'?",
    options: ["string | number | symbol", "string", "PropertyKey", "never"],
    correctAnswer: 0,
    explanation:
      "keyof any produces the union of all possible property-key types: string | number | symbol.",
  },
  {
    id: 76,
    category: "Typescript",
    difficulty: "easy",
    question:
      "How do you type a React event handler for an input change in TSX?",
    options: [
      "(e: React.ChangeEvent<HTMLInputElement>) => void",
      "(e: Event) => void",
      "(e: ChangeEvent) => void",
      "(e: InputEvent) => void",
    ],
    correctAnswer: 0,
    explanation:
      "React provides specialized event types; ChangeEvent<T> is the generic for form element changes.",
  },
  {
    id: 77,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which tsconfig option controls the module system used in emitted JS?",
    options: ["module", "target", "moduleResolution", "lib"],
    correctAnswer: 0,
    explanation:
      "'module' sets the format (CommonJS, ESNext, etc.) of the generated JS modules.",
  },
  {
    id: 78,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of Array.isArray in TypeScript?",
    options: [
      "(arg: any) => boolean",
      "<T>(arg: any) => arg is T[]",
      "<T>(arg: any) => arg is Array<T>",
      "Both B and C",
    ],
    correctAnswer: 3,
    explanation:
      "Array.isArray is a type guard whose signature uses a generic type predicate arg is T[].",
  },
  {
    id: 79,
    category: "Typescript",
    difficulty: "easy",
    question: "Which utility type converts a union to an intersection?",
    options: [
      "UnionToIntersection<U>",
      "Intersection<U>",
      "Merge<U>",
      "There is no built-in utility",
    ],
    correctAnswer: 3,
    explanation:
      "No official utility exists; UnionToIntersection can be written with conditional types but is not provided.",
  },
  {
    id: 80,
    category: "Typescript",
    difficulty: "easy",
    question:
      "What keyword makes a class parameter a class property automatically?",
    options: ["public", "declare", "readonly", "prop"],
    correctAnswer: 0,
    explanation:
      "Prefixing a constructor parameter with an access modifier (public, private, protected) declares and assigns it in one step.",
  },
  {
    id: 81,
    category: "Typescript",
    difficulty: "easy",
    question: "How do you express that a function may throw?",
    options: [
      "function fn(): never",
      "function fn(): throws Error",
      "TypeScript has no throw annotation; use JSDoc @throws",
      "function fn(): void | Error",
    ],
    correctAnswer: 2,
    explanation:
      "TypeScript does not encode thrown types in the signature; documentation is the current practice.",
  },
  {
    id: 82,
    category: "Typescript",
    difficulty: "easy",
    question:
      "What is the type of 'const enum' values after compilation with 'preserveConstEnums' false?",
    options: ["Inline literals", "Object lookups", "String keys", "Symbol"],
    correctAnswer: 0,
    explanation:
      "Const enums are erased and their values inlined, producing zero runtime cost.",
  },
  {
    id: 83,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which built-in type declares a function that can be called with 'new'?",
    options: [
      "Function",
      "NewableFunction",
      "CallableFunction",
      "ConstructorFunction",
    ],
    correctAnswer: 1,
    explanation:
      "NewableFunction (or simply new (...args: any[]) => T) describes constructable signatures.",
  },
  {
    id: 84,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the exact type of JSON.parse in lib.es5.d.ts?",
    options: [
      "(text: string) => any",
      "<T = any>(text: string) => T",
      "(text: string) => unknown",
      "<T>(text: string) => T",
    ],
    correctAnswer: 0,
    explanation:
      "JSON.parse is typed to return any for backward compatibility; consumers should narrow or cast.",
  },
  {
    id: 85,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which tsconfig flag makes imports with non-existent extensions an error?",
    options: [
      "allowImportingTsExtensions",
      "resolveJsonModule",
      "noImplicitAny",
      "None; TypeScript always allows it",
    ],
    correctAnswer: 3,
    explanation:
      "TypeScript delegates module resolution to the runtime; it does not validate file extensions by default.",
  },
  {
    id: 86,
    category: "Typescript",
    difficulty: "easy",
    question:
      "What is the type of a template literal expression ``abc${123}``?",
    options: ["string", "'abc123'", "template string", "never"],
    correctAnswer: 0,
    explanation:
      "Template literal expressions always evaluate to the general string type, not literal types.",
  },
  {
    id: 87,
    category: "Typescript",
    difficulty: "easy",
    question: "Which operator narrows types when used in an 'if' statement?",
    options: ["instanceof", "typeof", "in", "All of the above"],
    correctAnswer: 3,
    explanation:
      "instanceof, typeof, and the in operator all act as type guards in control-flow analysis.",
  },
  {
    id: 88,
    category: "Typescript",
    difficulty: "easy",
    question:
      "What is the return type of an arrow function with no return statement: () => { } ?",
    options: ["undefined", "void", "never", "any"],
    correctAnswer: 1,
    explanation:
      "Functions without an explicit return infer void, not undefined, to distinguish missing returns.",
  },
  {
    id: 89,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which statement correctly exports both a type and a value from the same file?",
    options: [
      "export { MyType, myValue } from './mod'",
      "export type { MyType } from './mod'; export { myValue } from './mod'",
      "export * from './mod'",
      "export = { MyType, myValue }",
    ],
    correctAnswer: 1,
    explanation:
      "Type-only imports/exports must use the 'type' keyword to avoid runtime errors.",
  },
  {
    id: 90,
    category: "Typescript",
    difficulty: "easy",
    question:
      "What is the type of Object.keys(obj) where obj is typed as {a: string, b: number}?",
    options: ["('a' | 'b')[]", "string[]", "PropertyKey[]", "never"],
    correctAnswer: 1,
    explanation:
      "Object.keys is typed to return string[] for structural soundness; manual assertion is needed for literals.",
  },
  {
    id: 91,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which utility type flattens an optional property to required but keeps undefined in its domain?",
    options: ["Required<T>", "-?", "Exact<T>", "NonUndefined<T>"],
    correctAnswer: 1,
    explanation:
      "Mapped types can use '-?' to remove the optional modifier, still allowing undefined if the type includes it.",
  },
  {
    id: 92,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the inferred type of const x = [1, 'two'] as const?",
    options: [
      "(string | number)[]",
      "readonly [1, 'two']",
      "[number, string]",
      "readonly [number, string]",
    ],
    correctAnswer: 2,
    explanation:
      "The 'as const' assertion turns the array into a tuple with literal types, but mutability remains unless readonly is added.",
  },
  {
    id: 93,
    category: "Typescript",
    difficulty: "easy",
    question: "Which of these is a valid declaration merging case?",
    options: [
      "Two interfaces with the same name",
      "Two type aliases with the same name",
      "Two enums with the same name in different files",
      "Two classes with the same name",
    ],
    correctAnswer: 0,
    explanation:
      "Interface declarations merge; type aliases, enums across files, and classes do not merge by default.",
  },
  {
    id: 94,
    category: "Typescript",
    difficulty: "easy",
    question:
      "What is the compile-time result of 'type T = number extends string ? true : false'?",
    options: ["boolean", "false", "never", "error"],
    correctAnswer: 1,
    explanation:
      "The conditional type resolves to the false branch because number does not extend string.",
  },
  {
    id: 95,
    category: "Typescript",
    difficulty: "easy",
    question: "Which flag prevents implicit fall-through in switch statements?",
    options: [
      "noFallthroughCasesInSwitch",
      "strictSwitch",
      "noImplicitReturns",
      "strictNullChecks",
    ],
    correctAnswer: 0,
    explanation:
      "noFallthroughCasesInSwitch flags cases that are missing break or return statements.",
  },
  {
    id: 96,
    category: "Typescript",
    difficulty: "easy",
    question:
      "What is the type of a variable initialized with 'let x!: string;'?",
    options: ["string | undefined", "string", "any", "never"],
    correctAnswer: 1,
    explanation:
      "The definite assignment assertion (!) tells the compiler x will be assigned before use, keeping type string.",
  },
  {
    id: 97,
    category: "Typescript",
    difficulty: "easy",
    question: "Which utility extracts the element type of an array?",
    options: ["ElementType<T>", "T[number]", "T[0]", "Array<T>"],
    correctAnswer: 1,
    explanation:
      "Indexed access type T[number] yields the union of all element types in array T.",
  },
  {
    id: 98,
    category: "Typescript",
    difficulty: "easy",
    question:
      "What is the type of a variable after the check 'if (typeof x === 'function')'?",
    options: ["Function", "(...args: any[]) => any", "unknown", "never"],
    correctAnswer: 1,
    explanation:
      "typeof type guard narrows to the callable Function type, which is compatible with any signature.",
  },
  {
    id: 99,
    category: "Typescript",
    difficulty: "easy",
    question: "Which of these will NOT create a new scope in TypeScript?",
    options: ["for-loop", "if-block", "plain object literal", "function block"],
    correctAnswer: 2,
    explanation:
      "Object literals are expressions, not statements; they do not introduce a lexical scope.",
  },
  {
    id: 100,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the default lib included when target is ES2020?",
    options: [
      "lib.es5.d.ts",
      "lib.es2020.d.ts",
      "lib.es2020.full.d.ts",
      "lib.dom.d.ts",
    ],
    correctAnswer: 1,
    explanation:
      "The compiler automatically includes lib.es2020.d.ts (and its dependencies) when target is ES2020.",
  },
  {
    id: 101,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which of these is the correct way to type a ref in React with TypeScript?",
    options: [
      "const ref = useRef<HTMLDivElement>(null)",
      "const ref: RefObject = useRef(null)",
      "const ref = useRef(null as HTMLDivElement)",
      "const ref = useRef<HTMLDivElement | null>(null)",
    ],
    correctAnswer: 3,
    explanation:
      "The generic should include null because initial value is null; RefObject is an internal type.",
  },
  {
    id: 102,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of Error.prototype.name?",
    options: ["string", "any", "never", "undefined"],
    correctAnswer: 0,
    explanation:
      "The standard lib types Error.name as string, defaulting to 'Error'.",
  },
  {
    id: 103,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which tsconfig option allows JS files to be compiled alongside TS?",
    options: ["allowJs", "checkJs", "emitDeclarationOnly", "resolveJsonModule"],
    correctAnswer: 0,
    explanation: "allowJs includes .js and .jsx files in the compilation set.",
  },
  {
    id: 104,
    category: "Typescript",
    difficulty: "easy",
    question:
      "What is the inferred type of const obj = { id: 1, name: 'Alice' }?",
    options: [
      "{ id: number; name: string }",
      "{ id: 1; name: 'Alice' }",
      "{ readonly id: number; readonly name: string }",
      "object",
    ],
    correctAnswer: 0,
    explanation:
      "Without 'as const', widened types number and string are inferred for the properties.",
  },
  {
    id: 105,
    category: "Typescript",
    difficulty: "easy",
    question: "Which of these is NOT a valid TypeScript comment?",
    options: [
      "// line comment",
      "/* block comment */",
      "# shell-style comment",
      "/** JSDoc comment */",
    ],
    correctAnswer: 2,
    explanation:
      "# comments are not supported; they are syntax errors in TypeScript.",
  },
  {
    id: 106,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of JSON.stringify's second optional parameter?",
    options: [
      "(key: string, value: any) => any",
      "string[] | null",
      "string[] | ((key: string, value: any) => any) | null",
      "number",
    ],
    correctAnswer: 2,
    explanation:
      "The replacer can be a function or an array of keys to include, or null.",
  },
  {
    id: 107,
    category: "Typescript",
    difficulty: "easy",
    question: "Which of these will produce a type error in strict mode?",
    options: [
      "const x: string = null",
      "const x: string | null = null",
      "const x: any = null",
      "const x: unknown = null",
    ],
    correctAnswer: 0,
    explanation:
      "strictNullChecks reports assigning null to a non-nullable string.",
  },
  {
    id: 108,
    category: "Typescript",
    difficulty: "easy",
    question:
      "What is the type of a catch clause variable under '--useUnknownInCatchVariables'?",
    options: ["any", "unknown", "Error", "never"],
    correctAnswer: 1,
    explanation:
      "The flag changes the catch variable type from any to unknown, forcing safer error handling.",
  },
  {
    id: 109,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which utility type produces a type with all properties optional except one?",
    options: [
      "Partial<T>",
      "Required<T>",
      "Omit<T, K> & Pick<T, K>",
      "There is no single built-in utility",
    ],
    correctAnswer: 3,
    explanation:
      "You must combine Partial and Pick manually to leave one property required.",
  },
  {
    id: 110,
    category: "Typescript",
    difficulty: "easy",
    question:
      "What is the exact type of the array method 'map' callback parameter?",
    options: [
      "(value: T, index: number, array: T[]) => U",
      "(item: T, idx: number, arr: T[]) => U",
      "Function",
      "(value: T) => U",
    ],
    correctAnswer: 0,
    explanation:
      "The standard lib declares map with the callback signature shown in option A.",
  },
  {
    id: 111,
    category: "Typescript",
    difficulty: "easy",
    question: "Which of these is a valid way to declare an ambient module?",
    options: [
      "declare module 'foo' { }",
      "ambient module 'foo' { }",
      "module 'foo' { }",
      "external module 'foo' { }",
    ],
    correctAnswer: 0,
    explanation:
      "Ambient modules use 'declare module' to describe the shape of an external untyped package.",
  },
  {
    id: 112,
    category: "Typescript",
    difficulty: "easy",
    question:
      "What is the type of setTimeout's return value in Node.js with @types/node?",
    options: ["number", "NodeJS.Timeout", "Timer", "object"],
    correctAnswer: 1,
    explanation:
      "Node typings return a NodeJS.Timeout object, not a numeric id like in browsers.",
  },
  {
    id: 113,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which of these is the correct generic constraint for a constructor?",
    options: [
      "{ new (...args: any[]): T }",
      "Constructor<T>",
      "new () => T",
      "Class<T>",
    ],
    correctAnswer: 0,
    explanation:
      "The newable signature is written as an object type with a construct signature.",
  },
  {
    id: 114,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'globalThis' in TypeScript 4.0+?",
    options: ["Window", "typeof globalThis", "any", "never"],
    correctAnswer: 1,
    explanation:
      "globalThis is typed as the unique type typeof globalThis, providing a universal global scope.",
  },
  {
    id: 115,
    category: "Typescript",
    difficulty: "easy",
    question: "Which of these creates a branded type for nominal typing?",
    options: [
      "type USD = number & { _brand: 'USD' }",
      "type USD = { value: number, currency: 'USD' }",
      "type USD = number",
      "interface USD extends number {}",
    ],
    correctAnswer: 0,
    explanation:
      "Intersection with a unique brand property creates a compile-time distinct subtype of number.",
  },
  {
    id: 116,
    category: "Typescript",
    difficulty: "easy",
    question:
      "What is the type of Promise.all([p1, p2]) when p1: Promise<string> and p2: Promise<number>?",
    options: [
      "Promise<[string, number]>",
      "Promise<string | number>",
      "[Promise<string>, Promise<number>]",
      "Promise<void>",
    ],
    correctAnswer: 0,
    explanation:
      "Promise.all preserves tuple structure, producing Promise<[string, number]>.",
  },
  {
    id: 117,
    category: "Typescript",
    difficulty: "easy",
    question: "Which of these will NOT trigger excess property checking?",
    options: [
      "Object literals assigned to a variable of an interface type",
      "Passing an object literal as a function argument",
      "Objects created with 'new'",
      "Objects assigned through an intermediate variable",
    ],
    correctAnswer: 3,
    explanation:
      "Excess property checks only apply to fresh object literals, not to objects passed through variables.",
  },
  {
    id: 118,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'this' inside a static class method?",
    options: [
      "Instance type of the class",
      "typeof Class (the constructor)",
      "void",
      "any",
    ],
    correctAnswer: 1,
    explanation:
      "Static methods use the constructor function as their this context.",
  },
  {
    id: 119,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which of these is the correct way to re-export a default export as named?",
    options: [
      "export { default as MyName } from './mod'",
      "export * as MyName from './mod'",
      "export MyName from './mod'",
      "export { MyName as default } from './mod'",
    ],
    correctAnswer: 0,
    explanation:
      "The default export can be captured and re-exported with an alias using the shown syntax.",
  },
  {
    id: 120,
    category: "Typescript",
    difficulty: "easy",
    question:
      "What is the type of a variable after the assignment 'let x = 1 as const'?",
    options: ["number", "1", "readonly 1", "never"],
    correctAnswer: 1,
    explanation:
      "The const assertion converts the literal to its singleton type 1 instead of widening to number.",
  },
  {
    id: 121,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which of these is a valid declaration for a global variable augmentation?",
    options: [
      "declare global { var myGlobal: string }",
      "global.myGlobal = 'hello'",
      "window.myGlobal = 'hello'",
      "declare var myGlobal: string",
    ],
    correctAnswer: 0,
    explanation:
      "Module files can augment the global scope by wrapping declarations in 'declare global'.",
  },
  {
    id: 122,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of Symbol.iterator?",
    options: ["symbol", "unique symbol", "SymbolConstructor", "string"],
    correctAnswer: 1,
    explanation:
      "Well-known symbols are declared as unique symbol, giving them a distinct subtype.",
  },
  {
    id: 123,
    category: "Typescript",
    difficulty: "easy",
    question: "Which of these utility types removes the readonly modifier?",
    options: [
      "Mutable<T>",
      "-readonly",
      "Required<T>",
      "There is no built-in utility",
    ],
    correctAnswer: 3,
    explanation:
      "TypeScript provides no official Mutable; you must write a mapped type that removes readonly.",
  },
  {
    id: 124,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'void 0' expression?",
    options: ["undefined", "void", "any", "never"],
    correctAnswer: 1,
    explanation:
      "The void operator always produces the type void, though its runtime value is undefined.",
  },
  {
    id: 125,
    category: "Typescript",
    difficulty: "easy",
    question: "Which of these is the correct way to type a variadic tuple?",
    options: [
      "[...T[], number]",
      "[number, ...T[]]",
      "[number, T, ...T[]]",
      "All of the above",
    ],
    correctAnswer: 3,
    explanation:
      "All listed patterns are valid uses of variadic tuple syntax introduced in TS 4.0.",
  },
  {
    id: 126,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'import * as ns from 'mod''?",
    options: ["any", "typeof ns", "ModuleNamespace", "{ [k: string]: any }"],
    correctAnswer: 2,
    explanation:
      "The namespace import is typed as ModuleNamespace, an object with property descriptors for each export.",
  },
  {
    id: 127,
    category: "Typescript",
    difficulty: "easy",
    question: "Which of these will make TypeScript warn on unused locals?",
    options: ["noUnusedLocals", "strict", "noImplicitAny", "skipLibCheck"],
    correctAnswer: 0,
    explanation:
      "noUnusedLocals (or ESLint) is required to flag variables that are declared but never read.",
  },
  {
    id: 128,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'debugger' statement?",
    options: ["never", "void", "any", "undefined"],
    correctAnswer: 1,
    explanation:
      "The debugger statement has type void, like other control-flow statements.",
  },
  {
    id: 129,
    category: "Typescript",
    difficulty: "easy",
    question: "Which of these is the correct way to type a generator function?",
    options: [
      "function* gen(): Generator<number>",
      "function gen(): Iterable<number>",
      "function* gen(): Iterator<number>",
      "function gen(): Generator<number, void, unknown>",
    ],
    correctAnswer: 0,
    explanation:
      "Generator<T> is a built-in interface that covers yield, return, and next types.",
  },
  {
    id: 130,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'new.target' inside a constructor?",
    options: ["Function", "typeof Class", "any", "undefined"],
    correctAnswer: 1,
    explanation:
      "new.target refers to the constructor that was invoked, typed as the constructor function.",
  },
  {
    id: 131,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which of these is NOT allowed inside an ambient module declaration?",
    options: [
      "Variable declarations with initializers",
      "Type aliases",
      "Interface declarations",
      "Function overloads",
    ],
    correctAnswer: 0,
    explanation:
      "Ambient contexts cannot contain value initializers; they are purely declarative.",
  },
  {
    id: 132,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'typeof null'?",
    options: ["'null'", "'object'", "'undefined'", "never"],
    correctAnswer: 1,
    explanation:
      "Legacy JavaScript specification mandates typeof null === 'object'.",
  },
  {
    id: 133,
    category: "Typescript",
    difficulty: "easy",
    question: "Which of these is the correct way to type a bigint literal?",
    options: [
      "const x: bigint = 123n",
      "const x = 123 as bigint",
      "const x = BigInt(123)",
      "All of the above",
    ],
    correctAnswer: 3,
    explanation:
      "All three forms produce a bigint; the literal suffix 'n' is the most concise.",
  },
  {
    id: 134,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of Promise.reject()?",
    options: [
      "Promise<never>",
      "Promise<void>",
      "Promise<Error>",
      "Promise<unknown>",
    ],
    correctAnswer: 0,
    explanation:
      "reject produces Promise<never> because the promise will never successfully resolve.",
  },
  {
    id: 135,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which of these is the correct way to declare a module augmentation for 'express'?",
    options: [
      "declare module 'express' { interface Request { id?: string } }",
      "module 'express' { interface Request { id?: string } }",
      "augment module 'express' { interface Request { id?: string } }",
      "declare namespace Express { interface Request { id?: string } }",
    ],
    correctAnswer: 0,
    explanation:
      "Module augmentation uses 'declare module' to add properties to existing module definitions.",
  },
  {
    id: 136,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'import.meta.env' in Vite?",
    options: ["Record<string, string>", "ImportMetaEnv", "any", "undefined"],
    correctAnswer: 1,
    explanation:
      "Vite provides an ambient ImportMetaEnv interface that can be augmented per project.",
  },
  {
    id: 137,
    category: "Typescript",
    difficulty: "easy",
    question: "Which of these is the correct way to type a recursive partial?",
    options: [
      "type DeepPartial<T> = { [K in keyof T]?: DeepPartial<T[K]> }",
      "type DeepPartial<T> = Partial<T>",
      "type DeepPartial<T> = T | Partial<T>",
      "type DeepPartial<T> = { [K in keyof T]: T[K] }",
    ],
    correctAnswer: 0,
    explanation:
      "A mapped type that calls itself on each property creates a deeply nested partial structure.",
  },
  {
    id: 138,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'window' in a web worker file?",
    options: ["Window", "undefined", "never", "DedicatedWorkerGlobalScope"],
    correctAnswer: 3,
    explanation:
      "Workers have their own global; lib.webworker.d.ts types it as DedicatedWorkerGlobalScope.",
  },
  {
    id: 139,
    category: "Typescript",
    difficulty: "easy",
    question: "Which of these is the correct way to type a debounced function?",
    options: [
      "debounced<F extends (...args: any[]) => any>(func: F, wait: number): F & { cancel(): void }",
      "debounced<F>(func: F): F",
      "debounced(func: Function): Function",
      "There is no standard pattern",
    ],
    correctAnswer: 0,
    explanation:
      "The intersection preserves the original signature while adding cancel/clear methods.",
  },
  {
    id: 140,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'console.log'?",
    options: [
      "(...args: any[]) => void",
      "typeof console.log",
      "Function",
      "void",
    ],
    correctAnswer: 0,
    explanation:
      "The ambient declaration uses a rest parameter of any[] and returns void.",
  },
  {
    id: 141,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which of these is the correct way to type a pick that keeps only required keys?",
    options: [
      "type PickRequired<T> = Pick<T, { [K in keyof T]-?: T[K] extends undefined ? never : K }[keyof T]",
      "Pick<T, RequiredKeys<T>>",
      "Required<Pick<T, keyof T>>",
      "There is no built-in utility",
    ],
    correctAnswer: 1,
    explanation:
      "Extracting keys whose values are not undefined and feeding them to Pick gives the desired type.",
  },
  {
    id: 142,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'process.env' in Node?",
    options: [
      "Record<string, string>",
      "NodeJS.ProcessEnv",
      "any",
      "undefined",
    ],
    correctAnswer: 1,
    explanation:
      "@types/node declares ProcessEnv as an interface extending Record<string, string | undefined>.",
  },
  {
    id: 143,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which of these is the correct way to type a fetch wrapper that always returns JSON?",
    options: [
      "async function get<T>(url: string): Promise<T>",
      "function get<T>(url: string): T",
      "function get(url: string): Promise<any>",
      "async function get(url: string): unknown",
    ],
    correctAnswer: 0,
    explanation:
      "A generic async function returning Promise<T> lets callers specify the expected JSON shape.",
  },
  {
    id: 144,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'localStorage.getItem(key)'?",
    options: ["string", "string | null", "any", "unknown"],
    correctAnswer: 1,
    explanation:
      "The Web Storage API returns null when the key does not exist.",
  },
  {
    id: 145,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which of these is the correct way to type a URL query params object?",
    options: [
      "Record<string, string | string[] | undefined>",
      "Record<string, string>",
      "Map<string, string>",
      "URLSearchParams",
    ],
    correctAnswer: 0,
    explanation:
      "Query values can be single strings, arrays, or undefined for missing keys.",
  },
  {
    id: 146,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'history.pushState' third argument?",
    options: ["string | null", "string", "any", "undefined"],
    correctAnswer: 0,
    explanation:
      "The URL argument is optional and typed as string | null | undefined in lib.dom.d.ts.",
  },
  {
    id: 147,
    category: "Typescript",
    difficulty: "easy",
    question: "Which of these is the correct way to type a Redux action union?",
    options: [
      "type Action = { type: 'INCREMENT' } | { type: 'DECREMENT' }",
      "interface Action { type: string }",
      "type Action = { type: string }",
      "enum Action { Increment, Decrement }",
    ],
    correctAnswer: 0,
    explanation:
      "Discriminated unions use literal type fields to narrow between action shapes.",
  },
  {
    id: 148,
    category: "Typescript",
    difficulty: "easy",
    question:
      "What is the type of 'document.querySelector('a')' in strict mode?",
    options: [
      "HTMLAnchorElement",
      "HTMLAnchorElement | null",
      "Element",
      "any",
    ],
    correctAnswer: 1,
    explanation:
      "querySelector may return null if no element matches, so the union includes null.",
  },
  {
    id: 149,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which of these is the correct way to type a component props with children in React?",
    options: [
      "PropsWithChildren<P>",
      "P & { children?: ReactNode }",
      "Both A and B",
      "Props & Children",
    ],
    correctAnswer: 2,
    explanation:
      "PropsWithChildren<P> is an alias for the intersection shown in B.",
  },
  {
    id: 150,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'setInterval' return value in the browser?",
    options: ["number", "NodeJS.Timeout", "Timer", "object"],
    correctAnswer: 0,
    explanation:
      "Browsers return a numeric timer id; Node returns a Timeout object.",
  },
  {
    id: 151,
    category: "Typescript",
    difficulty: "easy",
    question: "Which of these is the correct way to type a class getter?",
    options: [
      "get fullName(): string { return ... }",
      "get fullName: string { return ... }",
      "fullName: string { get() { return ... } }",
      "getter fullName(): string { return ... }",
    ],
    correctAnswer: 0,
    explanation:
      "Getters use the 'get' keyword followed by the method signature.",
  },
  {
    id: 152,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'Reflect.get(target, prop)'?",
    options: ["any", "unknown", "target[prop]", "undefined"],
    correctAnswer: 0,
    explanation:
      "Reflect.get is typed to return any; consumers should narrow or cast.",
  },
  {
    id: 153,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which of these is the correct way to type a parameter that must be a key of an object?",
    options: [
      "function fn<T, K extends keyof T>(obj: T, key: K)",
      "function fn(obj: object, key: string)",
      "function fn<T>(obj: T, key: keyof T)",
      "Both A and C",
    ],
    correctAnswer: 3,
    explanation:
      "Both forms ensure the key exists on the object; the generic version allows further constraints.",
  },
  {
    id: 154,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'Object.entries' value?",
    options: [
      "[string, any][]",
      "[keyof T, T[keyof T]][]",
      "Array<[string, unknown]>",
      "Array<[PropertyKey, any]>",
    ],
    correctAnswer: 0,
    explanation:
      "entries returns an array of key-value pairs where keys are strings and values are any.",
  },
  {
    id: 155,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which of these is the correct way to type a function that never returns?",
    options: [
      "function fn(): never",
      "function fn(): void",
      "function fn(): undefined",
      "function fn(): Error",
    ],
    correctAnswer: 0,
    explanation:
      "The never return type indicates the function does not return (throws or infinite loop).",
  },
  {
    id: 156,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'process.version' in Node?",
    options: ["string", "SemVer", "any", "undefined"],
    correctAnswer: 0,
    explanation: "process.version is typed as string, e.g., 'v18.12.0'.",
  },
  {
    id: 157,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which of these is the correct way to type an enum-like object with string values?",
    options: [
      "const Colors = { Red: 'red', Green: 'green' } as const",
      "enum Colors { Red = 'red', Green = 'green' }",
      "Both A and B",
      "type Colors = 'red' | 'green'",
    ],
    correctAnswer: 2,
    explanation:
      "Both const assertion and string enums produce strongly typed string literals.",
  },
  {
    id: 158,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'requestAnimationFrame' callback parameter?",
    options: ["number", "DOMHighResTimeStamp", "timestamp", "void"],
    correctAnswer: 1,
    explanation:
      "The callback receives a high-resolution timestamp typed as DOMHighResTimeStamp.",
  },
  {
    id: 159,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which of these is the correct way to type a form event in React?",
    options: [
      "React.FormEvent<HTMLFormElement>",
      "React.FormEvent",
      "Event",
      "FormDataEvent",
    ],
    correctAnswer: 0,
    explanation:
      "FormEvent is generic over the element type; HTMLFormElement is the correct argument.",
  },
  {
    id: 160,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'navigator.userAgent'?",
    options: ["string", "NavigatorID", "any", "undefined"],
    correctAnswer: 0,
    explanation: "userAgent is declared as string in lib.dom.d.ts.",
  },
  {
    id: 161,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which of these is the correct way to type a fetch error handler?",
    options: [
      "(error: unknown) => void",
      "(error: Error) => void",
      "(error: any) => void",
      "Both A and C",
    ],
    correctAnswer: 0,
    explanation:
      "Catching unknown forces you to inspect the error, improving type safety.",
  },
  {
    id: 162,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'Math.random()'?",
    options: ["number", "0 | 1", "float", "double"],
    correctAnswer: 0,
    explanation:
      "The return type is simply number; no literal or subtype is guaranteed.",
  },
  {
    id: 163,
    category: "Typescript",
    difficulty: "easy",
    question: "Which of these is the correct way to type a CSS module import?",
    options: [
      "declare module '*.module.css' { const classes: { [key: string]: string }; export = classes }",
      "declare module '*.css'",
      "import styles from './styles.module.css'",
      "type CSSModule = { [k: string]: string }",
    ],
    correctAnswer: 0,
    explanation:
      "Ambient module declarations tell TypeScript that CSS module imports export string maps.",
  },
  {
    id: 164,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'Date.now()'?",
    options: ["number", "Date", "timestamp", "bigint"],
    correctAnswer: 0,
    explanation: "Date.now returns the epoch milliseconds as number.",
  },
  {
    id: 165,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which of these is the correct way to type a generic default parameter?",
    options: [
      "type MyType<T = string> = T",
      "type MyType<T: string> = T",
      "type MyType<T extends string = string> = T",
      "Both A and C",
    ],
    correctAnswer: 3,
    explanation:
      "Defaults are written after '='; when a constraint exists it appears before the default.",
  },
  {
    id: 166,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'process.argv' in Node?",
    options: [
      "string[]",
      "readonly string[]",
      "[string, string, ...string[]]",
      "any[]",
    ],
    correctAnswer: 0,
    explanation:
      "argv is typed as string[]; its first two elements are node and script path.",
  },
  {
    id: 167,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which of these is the correct way to type a click handler in React?",
    options: [
      "React.MouseEventHandler<HTMLButtonElement>",
      "(event: React.MouseEvent<HTMLButtonElement>) => void",
      "Both A and B",
      "EventListener",
    ],
    correctAnswer: 2,
    explanation:
      "The handler type is an alias for the function signature shown in B.",
  },
  {
    id: 168,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'localStorage.length'?",
    options: ["number", "integer", "uint32", "any"],
    correctAnswer: 0,
    explanation: "length is simply number; no subtype guarantees are provided.",
  },
  {
    id: 169,
    category: "Typescript",
    difficulty: "easy",
    question: "Which of these is the correct way to type a JSON value?",
    options: [
      "type JSONValue = string | number | boolean | null | JSONValue[] | { [k: string]: JSONValue }",
      "any",
      "unknown",
      "object",
    ],
    correctAnswer: 0,
    explanation: "The recursive type accurately models valid JSON structures.",
  },
  {
    id: 170,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'encodeURIComponent' return value?",
    options: ["string", "URI", "EncodedString", "any"],
    correctAnswer: 0,
    explanation:
      "The function returns a plain string with percent-encoded characters.",
  },
  {
    id: 171,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which of these is the correct way to type a ref callback in React?",
    options: [
      "(node: HTMLDivElement | null) => void",
      "(node: Element | null) => void",
      "RefCallback<HTMLDivElement>",
      "Both A and C",
    ],
    correctAnswer: 3,
    explanation: "RefCallback<T> is an alias for the function signature in A.",
  },
  {
    id: 172,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'performance.now()'?",
    options: ["number", "DOMHighResTimeStamp", "timestamp", "bigint"],
    correctAnswer: 1,
    explanation:
      "The return type is DOMHighResTimeStamp, a high-resolution millisecond timestamp.",
  },
  {
    id: 173,
    category: "Typescript",
    difficulty: "easy",
    question: "Which of these is the correct way to type a socket event map?",
    options: [
      "interface Events { connect: () => void; data: (payload: Buffer) => void }",
      "type Events = { [event: string]: Function }",
      "Map<string, Function>",
      "Both A and B",
    ],
    correctAnswer: 0,
    explanation:
      "An interface with specific event names provides strongly typed event handlers.",
  },
  {
    id: 174,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'process.pid' in Node?",
    options: ["number", "string", "PID", "undefined"],
    correctAnswer: 0,
    explanation:
      "pid is typed as number representing the OS process identifier.",
  },
  {
    id: 175,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which of these is the correct way to type a generic component in React?",
    options: [
      "function Component<T>(props: T) {}",
      "const Component = <T,>(props: T) => {}",
      "const Component: React.FC = <T>(props: T) => {}",
      "Both A and B",
    ],
    correctAnswer: 3,
    explanation:
      "The comma after <T> in arrow functions disambiguates JSX; both forms are valid.",
  },
  {
    id: 176,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'crypto.getRandomValues' array argument?",
    options: ["ArrayBufferView", "number[]", "Uint8Array", "any[]"],
    correctAnswer: 0,
    explanation:
      "The Web Crypto API accepts any ArrayBufferView subtype (Uint8Array, Int32Array, etc.).",
  },
  {
    id: 177,
    category: "Typescript",
    difficulty: "easy",
    question: "Which of these is the correct way to type a file upload event?",
    options: [
      "React.ChangeEvent<HTMLInputElement>",
      "Event & { target: HTMLInputElement }",
      "Both A and B",
      "FileListEvent",
    ],
    correctAnswer: 2,
    explanation:
      "The React event is preferred; the intersection is a lower-level alternative.",
  },
  {
    id: 178,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'fetch' return value?",
    options: ["Promise<Response>", "Promise<any>", "XMLHttpRequest", "never"],
    correctAnswer: 0,
    explanation:
      "fetch resolves with a Response object; consumers must call response.json() etc. to extract data.",
  },
  {
    id: 179,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which of these is the correct way to type a route parameter in Express?",
    options: [
      "req.params: { id: string }",
      "req.params.id: string",
      "ParamsDictionary",
      "Both A and C",
    ],
    correctAnswer: 3,
    explanation:
      "@types/express declares params as ParamsDictionary, an alias for Record<string, string>.",
  },
  {
    id: 180,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'module.exports' in a CommonJS file?",
    options: ["any", "typeof module.exports", "exports", "never"],
    correctAnswer: 0,
    explanation:
      "CommonJS exports are typed as any unless you provide explicit typings.",
  },
  {
    id: 181,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which of these is the correct way to type a WebSocket message event?",
    options: [
      "MessageEvent",
      "WebSocketMessageEvent",
      "Event & { data: any }",
      "Both A and C",
    ],
    correctAnswer: 0,
    explanation:
      "The standard MessageEvent interface carries the data payload.",
  },
  {
    id: 182,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'screen.width' in a browser?",
    options: ["number", "unsigned long", "positive integer", "any"],
    correctAnswer: 0,
    explanation: "screen properties are typed as number in lib.dom.d.ts.",
  },
  {
    id: 183,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which of these is the correct way to type a generic factory function?",
    options: [
      "function create<T>(ctor: new () => T): T",
      "function create<T>(ctor: () => T): T",
      "function create<T>(ctor: T): T",
      "function create<T>(): T",
    ],
    correctAnswer: 0,
    explanation:
      "The constructor signature 'new () => T' ensures the parameter is callable with new.",
  },
  {
    id: 184,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'Error.captureStackTrace' in Node?",
    options: [
      "(error: Error, constructor?: Function) => void",
      "() => string",
      "never",
      "undefined",
    ],
    correctAnswer: 0,
    explanation:
      "The optional second parameter allows stopping the stack at a specific constructor.",
  },
  {
    id: 185,
    category: "Typescript",
    difficulty: "easy",
    question: "Which of these is the correct way to type a clipboard event?",
    options: [
      "ClipboardEvent",
      "Event & { clipboardData: DataTransfer }",
      "Both A and B",
      "PasteEvent",
    ],
    correctAnswer: 2,
    explanation:
      "ClipboardEvent is the standard interface exposing clipboardData.",
  },
  {
    id: 186,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'location.href'?",
    options: ["string", "URL", "Location", "any"],
    correctAnswer: 0,
    explanation: "href is a string representing the entire URL.",
  },
  {
    id: 187,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which of these is the correct way to type a drag-and-drop event?",
    options: [
      "DragEvent",
      "MouseEvent & { dataTransfer: DataTransfer }",
      "Both A and B",
      "DropEvent",
    ],
    correctAnswer: 2,
    explanation: "DragEvent extends MouseEvent and adds dataTransfer.",
  },
  {
    id: 188,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'setTimeout' return value in the browser?",
    options: ["number", "NodeJS.Timeout", "Timer", "object"],
    correctAnswer: 0,
    explanation: "Browsers return a numeric id; Node returns a Timeout object.",
  },
  {
    id: 189,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which of these is the correct way to type a focus event in React?",
    options: [
      "React.FocusEvent<HTMLInputElement>",
      "FocusEvent",
      "Event",
      "Both A and B",
    ],
    correctAnswer: 0,
    explanation:
      "React's synthetic event wrapper provides cross-browser normalization.",
  },
  {
    id: 190,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'document.cookie'?",
    options: ["string", "Record<string, string>", "string[]", "CookieList"],
    correctAnswer: 0,
    explanation:
      "cookie is a single semicolon-separated string; parsing is manual.",
  },
  {
    id: 191,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which of these is the correct way to type a generic array method?",
    options: [
      "interface Array<T> { custom<U>(fn: (item: T) => U): U[] }",
      "Array.prototype.custom = function (fn) { }",
      "Both A and B",
      "type Array<T> = { custom<U>(fn: (item: T) => U): U[] }",
    ],
    correctAnswer: 0,
    explanation: "Interface merging extends the global Array<T> definition.",
  },
  {
    id: 192,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'encodeURI' return value?",
    options: ["string", "URI", "EncodedString", "any"],
    correctAnswer: 0,
    explanation: "The function returns a percent-encoded string.",
  },
  {
    id: 193,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which of these is the correct way to type a keyboard event in React?",
    options: [
      "React.KeyboardEvent<HTMLInputElement>",
      "KeyboardEvent",
      "Event",
      "Both A and B",
    ],
    correctAnswer: 0,
    explanation:
      "React wraps the native KeyboardEvent to add key normalization.",
  },
  {
    id: 194,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'document.title'?",
    options: ["string", "Title", "any", "undefined"],
    correctAnswer: 0,
    explanation: "title is a plain string property.",
  },
  {
    id: 195,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which of these is the correct way to type a mutation observer callback?",
    options: [
      "(mutations: MutationRecord[], observer: MutationObserver) => void",
      "(mutation: MutationRecord) => void",
      "MutationCallback",
      "Both A and C",
    ],
    correctAnswer: 3,
    explanation:
      "MutationCallback is a type alias for the function signature in A.",
  },
  {
    id: 196,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'history.length'?",
    options: ["number", "unsigned long", "positive integer", "any"],
    correctAnswer: 0,
    explanation: "The property is typed as number in lib.dom.d.ts.",
  },
  {
    id: 197,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which of these is the correct way to type a generic hook in React?",
    options: [
      "function useCustom<T>(initial: T): [T, (value: T) => void]",
      "const useCustom = <T>(initial: T) => useState<T>(initial)",
      "Both A and B",
      "function useCustom<T = string>(initial: T)",
    ],
    correctAnswer: 2,
    explanation:
      "Both function and arrow syntax work; the generic allows type inference from usage.",
  },
  {
    id: 198,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'document.head'?",
    options: ["HTMLHeadElement | null", "HTMLHeadElement", "Element", "any"],
    correctAnswer: 0,
    explanation: "head may be null in documents without a <head> element.",
  },
  {
    id: 199,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which of these is the correct way to type an intersection observer callback?",
    options: [
      "(entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void",
      "IntersectionObserverCallback",
      "Both A and B",
      "(entry: IntersectionObserverEntry) => void",
    ],
    correctAnswer: 2,
    explanation:
      "IntersectionObserverCallback is the official alias for the signature in A.",
  },
  {
    id: 200,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'document.body'?",
    options: ["HTMLBodyElement | null", "HTMLBodyElement", "Element", "any"],
    correctAnswer: 0,
    explanation: "body can be null until the <body> tag is parsed.",
  },
  {
    id: 201,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which of these is the correct way to type a resize observer callback?",
    options: [
      "(entries: ResizeObserverEntry[], observer: ResizeObserver) => void",
      "ResizeObserverCallback",
      "Both A and B",
      "(entry: ResizeObserverEntry) => void",
    ],
    correctAnswer: 2,
    explanation: "ResizeObserverCallback is the provided alias.",
  },
  {
    id: 202,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'window.scrollX'?",
    options: ["number", "long", "positive integer", "any"],
    correctAnswer: 0,
    explanation: "scrollX (pageXOffset) is typed as number.",
  },
  {
    id: 203,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which of these is the correct way to type a custom event in React?",
    options: [
      "CustomEvent<T>",
      "React.SyntheticEvent",
      "Event",
      "Both A and B",
    ],
    correctAnswer: 0,
    explanation: "CustomEvent<T> allows attaching arbitrary detail data.",
  },
  {
    id: 204,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'document.documentElement'?",
    options: ["HTMLHtmlElement", "Element", "HTMLElement", "any"],
    correctAnswer: 0,
    explanation:
      "documentElement is specifically HTMLHtmlElement (the <html> tag).",
  },
  {
    id: 205,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which of these is the correct way to type a route guard in Express?",
    options: [
      "(req: Request, res: Response, next: NextFunction) => void",
      "(req: Request, res: Response) => void",
      "Handler",
      "Both A and C",
    ],
    correctAnswer: 3,
    explanation: "Handler is an alias for the three-parameter signature.",
  },
  {
    id: 206,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'window.innerHeight'?",
    options: ["number", "unsigned long", "positive integer", "any"],
    correctAnswer: 0,
    explanation: "innerHeight is typed as number.",
  },
  {
    id: 207,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which of these is the correct way to type a context value in React?",
    options: [
      "createContext<T>(defaultValue)",
      "React.Context<T>",
      "Both A and B",
      "Context<T>",
    ],
    correctAnswer: 2,
    explanation: "createContext returns React.Context<T>; both forms are used.",
  },
  {
    id: 208,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'document.readyState'?",
    options: [
      "'loading' | 'interactive' | 'complete'",
      "string",
      "DocumentReadyState",
      "Both A and C",
    ],
    correctAnswer: 3,
    explanation: "DocumentReadyState is a union of the three literal strings.",
  },
  {
    id: 209,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which of these is the correct way to type a middleware in Express?",
    options: [
      "(req: Request, res: Response, next: NextFunction) => void",
      "Handler",
      "Both A and B",
      "(req: Request, res: Response) => void",
    ],
    correctAnswer: 2,
    explanation: "Middleware matches the same signature as route handlers.",
  },
  {
    id: 210,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'screen.height'?",
    options: ["number", "unsigned long", "positive integer", "any"],
    correctAnswer: 0,
    explanation: "screen properties are typed as number.",
  },
  {
    id: 211,
    category: "Typescript",
    difficulty: "easy",
    question: "Which of these is the correct way to type a reducer in Redux?",
    options: [
      "(state: State, action: Action) => State",
      "Reducer<State, Action>",
      "Both A and B",
      "(state: State, action: any) => State",
    ],
    correctAnswer: 2,
    explanation: "Reducer<S, A> is the provided alias.",
  },
  {
    id: 212,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'document.characterSet'?",
    options: ["string", "CharacterSet", "Encoding", "any"],
    correctAnswer: 0,
    explanation: "characterSet is typed as string (e.g., 'UTF-8').",
  },
  {
    id: 213,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which of these is the correct way to type a generic class component in React?",
    options: [
      "class Component<P, S> extends React.Component<P, S>",
      "class Component<P> extends React.Component<P>",
      "Both A and B",
      "class Component extends React.Component",
    ],
    correctAnswer: 2,
    explanation: "You can provide both props (P) and state (S) generics.",
  },
  {
    id: 214,
    category: "Typescript",
    difficulty: "easy",
    question: "What is the type of 'window.devicePixelRatio'?",
    options: ["number", "float", "positive number", "any"],
    correctAnswer: 0,
    explanation: "devicePixelRatio is typed as number.",
  },
  {
    id: 215,
    category: "Typescript",
    difficulty: "easy",
    question:
      "Which of these is the correct way to type a saga effect in Redux-Saga?",
    options: [
      "SagaIterator",
      "Generator<CallEffect, void, unknown>",
      "Both A and B",
      "Effect",
    ],
    correctAnswer: 2,
    explanation: "SagaIterator is an alias for the generator signature.",
  },
  {
    id: 216,
    category: "Typescript",
    difficulty: "medium",
    question:
      "Which compiler option forces you to handle all possible code-paths that could return undefined?",
    options: [
      "strictNullChecks",
      "noUncheckedIndexedAccess",
      "exactOptionalPropertyTypes",
      "strictFunctionTypes",
    ],
    correctAnswer: 1,
    explanation:
      "noUncheckedIndexedAccess adds undefined to every array/tuple access, forcing you to handle the missing case.",
  },
  {
    id: 217,
    category: "Typescript",
    difficulty: "medium",
    question:
      "What is the exact type of the parameters tuple for Promise.allSettled?",
    options: [
      "Iterable<Promise<T>>",
      "readonly Promise<T>[]",
      "readonly [Promise<T1>, Promise<T2>, ...]",
      "Iterable<Promise<any>>",
    ],
    correctAnswer: 3,
    explanation:
      "Promise.allSettled accepts any iterable of promises; the results are PromiseSettledResult<any>[].",
  },
  {
    id: 218,
    category: "Typescript",
    difficulty: "medium",
    question:
      "How do you constrain a generic so it must be a key of a specific interface?",
    options: [
      "T extends keyof IUser",
      "T implements keyof IUser",
      "T = keyof IUser",
      "T in keyof IUser",
    ],
    correctAnswer: 0,
    explanation:
      "The extends clause is used to constrain generics; keyof produces the union of keys.",
  },
  {
    id: 219,
    category: "Typescript",
    difficulty: "medium",
    question:
      "Which utility type converts a union of string literals to a union of functions?",
    options: [
      "UnionToFunction",
      "There is no built-in",
      "MapToFunction",
      "Apply",
    ],
    correctAnswer: 1,
    explanation:
      "No official utility exists; you would write a custom distributive conditional type.",
  },
  {
    id: 220,
    category: "Typescript",
    difficulty: "medium",
    question:
      "What is the type of the second argument to Array.prototype.reduce?",
    options: ["T", "U", "U | undefined", "any"],
    correctAnswer: 2,
    explanation:
      "The initialValue is optional; when omitted the accumulator starts with the first array element.",
  },
  {
    id: 221,
    category: "Typescript",
    difficulty: "medium",
    question: "Which tsconfig flag prevents accidental use of deprecated APIs?",
    options: ["skipLibCheck", "noDeprecation", "noImplicitAny", "strict"],
    correctAnswer: 1,
    explanation:
      "noDeprecation (or ESLint) will flag usage of @deprecated declarations.",
  },
  {
    id: 222,
    category: "Typescript",
    difficulty: "medium",
    question:
      "What is the return type of Object.assign(target, source) in lib.es2015.d.ts?",
    options: ["typeof target", "T & U", "any", "void"],
    correctAnswer: 0,
    explanation:
      "The overload returns the mutated target object, preserving its narrowed type.",
  },
  {
    id: 223,
    category: "Typescript",
    difficulty: "medium",
    question:
      "Which of these is the correct way to type a pipe function (compose left-to-right)?",
    options: [
      "function pipe<A, B, C>(f: (x: A) => B, g: (x: B) => C): (x: A) => C",
      "function pipe(...fns: Function[]): Function",
      "const pipe = (f, g) => x => g(f(x))",
      "Both A and B",
    ],
    correctAnswer: 0,
    explanation:
      "Fully typed pipe uses generics to preserve input/output relationships.",
  },
  {
    id: 224,
    category: "Typescript",
    difficulty: "medium",
    question: "What is the type of the first parameter of Proxy constructor?",
    options: ["any", "object", "T", "Record<PropertyKey, any>"],
    correctAnswer: 1,
    explanation:
      "The target must be a non-null object (including arrays and functions).",
  },
  {
    id: 225,
    category: "Typescript",
    difficulty: "medium",
    question: "Which of these will NOT widen a const assertion literal?",
    options: [
      "let x = 'a' as const",
      "const x = 'a'",
      "var x = 'a' as const",
      "const x: 'a' = 'a'",
    ],
    correctAnswer: 1,
    explanation:
      "Without 'as const' the literal 'a' widens to string when assigned to a mutable binding.",
  },
  {
    id: 226,
    category: "Typescript",
    difficulty: "medium",
    question: "What is the type of Array.isArray at runtime when narrowed?",
    options: ["boolean", "arg is any[]", "arg is unknown[]", "never"],
    correctAnswer: 1,
    explanation:
      "The type predicate narrows to any[]; further narrowing requires user code.",
  },
  {
    id: 227,
    category: "Typescript",
    difficulty: "medium",
    question: "Which of these is the correct way to type a curried function?",
    options: [
      "function curry<A, B, C>(f: (a: A, b: B) => C): (a: A) => (b: B) => C",
      "function curry(f: Function): Function",
      "const curry = f => a => b => f(a, b)",
      "Both A and C",
    ],
    correctAnswer: 0,
    explanation:
      "Generics preserve the relationship between arguments and return types.",
  },
  {
    id: 228,
    category: "Typescript",
    difficulty: "medium",
    question:
      "What is the type of the iterator result after yield in a generator?",
    options: ["IteratorResult<T, R>", "T", "R", "any"],
    correctAnswer: 0,
    explanation:
      "The result object has value and done properties typed as IteratorResult<T, R>.",
  },
  {
    id: 229,
    category: "Typescript",
    difficulty: "medium",
    question:
      "Which of these is the correct way to type a thunk action in Redux?",
    options: [
      "type Thunk = (dispatch: Dispatch, getState: () => RootState) => void",
      "type Thunk = () => void",
      "type Thunk = Promise<void>",
      "type Thunk = Dispatch",
    ],
    correctAnswer: 0,
    explanation:
      "Thunks receive dispatch and getState and may return any value (commonly void or Promise).",
  },
  {
    id: 230,
    category: "Typescript",
    difficulty: "medium",
    question: "What is the type of Reflect.getPrototypeOf(obj)?",
    options: ["any", "object | null", "T", "unknown"],
    correctAnswer: 1,
    explanation:
      "The prototype may be null for Object.create(null), hence the union.",
  },
  {
    id: 231,
    category: "Typescript",
    difficulty: "medium",
    question:
      "Which of these is the correct way to type a higher-order React component?",
    options: [
      "function withFoo<P>(Component: ComponentType<P>): ComponentType<P>",
      "function withFoo(Component: React.Component): React.Component",
      "const withFoo = Component => Component",
      "HOC<P>",
    ],
    correctAnswer: 0,
    explanation: "HOCs preserve the wrapped component’s props via generics.",
  },
  {
    id: 232,
    category: "Typescript",
    difficulty: "medium",
    question:
      "What is the type of the value produced by a template literal type?",
    options: ["string", "literal union", "never", "any"],
    correctAnswer: 1,
    explanation:
      "Template literal types produce string literal unions based on the unions they interpolate.",
  },
  {
    id: 233,
    category: "Typescript",
    difficulty: "medium",
    question:
      "Which of these is the correct way to type a mutex/lock interface?",
    options: [
      "interface Mutex { acquire(): Promise<Release>, release(): void }",
      "interface Mutex { lock(): void, unlock(): void }",
      "type Mutex = () => Promise<void>",
      "Both A and B",
    ],
    correctAnswer: 0,
    explanation:
      "Modern async mutexes return a release function to avoid forgetting unlock.",
  },
  {
    id: 234,
    category: "Typescript",
    difficulty: "medium",
    question: "What is the type of the second argument to setTimeout in Node?",
    options: ["...any[]", "number", "string", "void"],
    correctAnswer: 0,
    explanation:
      "Additional arguments are passed to the callback and typed as a rest array.",
  },
  {
    id: 235,
    category: "Typescript",
    difficulty: "medium",
    question:
      "Which of these is the correct way to type a tagged union (discriminated union)?",
    options: [
      "type Shape = { kind: 'circle'; radius: number } | { kind: 'square'; side: number }",
      "type Shape = Circle | Square",
      "interface Shape { kind: string }",
      "Both A and B",
    ],
    correctAnswer: 0,
    explanation:
      "A literal discriminator field allows narrowing between variants.",
  },
  {
    id: 236,
    category: "Typescript",
    difficulty: "medium",
    question:
      "What is the type of the resolve parameter in new Promise<T>((resolve, reject) => …)?",
    options: [
      "T => void",
      "(value?: T) => void",
      "(value: T | PromiseLike<T>) => void",
      "any",
    ],
    correctAnswer: 2,
    explanation:
      "resolve accepts either a plain value or a thenable (PromiseLike).",
  },
  {
    id: 237,
    category: "Typescript",
    difficulty: "medium",
    question: "Which of these is the correct way to type a WeakMap key?",
    options: ["object", "{}", "T extends object", "All of the above"],
    correctAnswer: 3,
    explanation:
      "Keys must be objects; object, {}, or a generic constrained to object all satisfy.",
  },
  {
    id: 238,
    category: "Typescript",
    difficulty: "medium",
    question:
      "What is the type of the event parameter in window.addEventListener('message')?",
    options: ["MessageEvent", "Event", "CustomEvent", "any"],
    correctAnswer: 0,
    explanation:
      "The message event uses the MessageEvent interface with data origin etc.",
  },
  {
    id: 239,
    category: "Typescript",
    difficulty: "medium",
    question:
      "Which of these is the correct way to type a recursive partial (deep partial)?",
    options: [
      "type DeepPartial<T> = { [K in keyof T]?: DeepPartial<T[K]> }",
      "type DeepPartial<T> = Partial<T>",
      "type DeepPartial<T> = T | Partial<T>",
      "type DeepPartial<T> = { [K in keyof T]: T[K] }",
    ],
    correctAnswer: 0,
    explanation:
      "A mapped type that calls itself on each property creates a deeply nested partial.",
  },
  {
    id: 240,
    category: "Typescript",
    difficulty: "medium",
    question:
      "What is the type of the value returned by URLSearchParams.get()?",
    options: ["string | null", "string", "string | undefined", "any"],
    correctAnswer: 0,
    explanation: "get returns null when the key is absent, not undefined.",
  },
  {
    id: 241,
    category: "Typescript",
    difficulty: "medium",
    question:
      "Which of these is the correct way to type a debounced function with cancel?",
    options: [
      "debounced<F extends (...args: any[]) => any>(func: F): F & { cancel(): void }",
      "debounced<F>(func: F): F",
      "debounced(func: Function): Function",
      "There is no standard pattern",
    ],
    correctAnswer: 0,
    explanation:
      "An intersection preserves the original signature while adding cancel.",
  },
  {
    id: 242,
    category: "Typescript",
    difficulty: "medium",
    question:
      "What is the type of the first argument to Array.prototype.sort()?",
    options: [
      "(a: T, b: T) => number",
      "(a: T, b: T) => boolean",
      "Comparator<T>",
      "both A and C",
    ],
    correctAnswer: 3,
    explanation:
      "The comparator returns a number; Comparator<T> is an alias for the same signature.",
  },
  {
    id: 243,
    category: "Typescript",
    difficulty: "medium",
    question:
      "Which of these is the correct way to type a file upload change event?",
    options: [
      "React.ChangeEvent<HTMLInputElement>",
      "Event & { target: HTMLInputElement }",
      "Both A and B",
      "FileListEvent",
    ],
    correctAnswer: 0,
    explanation: "React provides the strongly typed ChangeEvent wrapper.",
  },
  {
    id: 244,
    category: "Typescript",
    difficulty: "medium",
    question: "What is the type of the return value of Object.freeze()?",
    options: [
      "Readonly<T>",
      "T",
      "Frozen<T>",
      "T & { readonly [K in keyof T]: T[K] }",
    ],
    correctAnswer: 0,
    explanation:
      "Object.freeze returns the same object but TypeScript narrows it to Readonly<T>.",
  },
  {
    id: 245,
    category: "Typescript",
    difficulty: "medium",
    question: "Which of these is the correct way to type a socket event map?",
    options: [
      "interface Events { connect: () => void; data: (payload: Buffer) => void }",
      "type Events = { [event: string]: Function }",
      "Map<string, Function>",
      "Both A and B",
    ],
    correctAnswer: 0,
    explanation:
      "An interface with specific event names provides strongly typed handlers.",
  },
  {
    id: 246,
    category: "Typescript",
    difficulty: "medium",
    question:
      "What is the type of the callback parameter to requestAnimationFrame?",
    options: [
      "(timestamp: number) => void",
      "() => void",
      "(time: DOMHighResTimeStamp) => void",
      "both A and C",
    ],
    correctAnswer: 3,
    explanation:
      "The parameter is a high-resolution timestamp; DOMHighResTimeStamp is an alias for number.",
  },
  {
    id: 247,
    category: "Typescript",
    difficulty: "medium",
    question: "Which of these is the correct way to type a Redux action union?",
    options: [
      "type Action = { type: 'INCREMENT' } | { type: 'DECREMENT' }",
      "interface Action { type: string }",
      "type Action = { type: string }",
      "enum Action { Increment, Decrement }",
    ],
    correctAnswer: 0,
    explanation:
      "Discriminated unions use literal type fields to narrow between shapes.",
  },
  {
    id: 248,
    category: "Typescript",
    difficulty: "medium",
    question: "What is the type of the value returned by JSON.parse()?",
    options: ["any", "unknown", "JSONValue", "object"],
    correctAnswer: 0,
    explanation:
      "JSON.parse is typed to return any for backward compatibility; consumers should narrow.",
  },
  {
    id: 249,
    category: "Typescript",
    difficulty: "medium",
    question:
      "Which of these is the correct way to type a generic fetch wrapper?",
    options: [
      "async function get<T>(url: string): Promise<T>",
      "function get<T>(url: string): T",
      "function get(url: string): Promise<any>",
      "async function get(url: string): unknown",
    ],
    correctAnswer: 0,
    explanation:
      "A generic async function returning Promise<T> lets callers specify the expected JSON shape.",
  },
  {
    id: 250,
    category: "Typescript",
    difficulty: "medium",
    question:
      "What is the type of the event parameter in addEventListener('dragover')?",
    options: ["DragEvent", "MouseEvent", "Event", "DragOverEvent"],
    correctAnswer: 0,
    explanation: "DragEvent extends MouseEvent and adds dataTransfer.",
  },
  {
    id: 251,
    category: "Typescript",
    difficulty: "medium",
    question: "Which of these is the correct way to type a React ref callback?",
    options: [
      "(node: HTMLDivElement | null) => void",
      "(node: Element | null) => void",
      "RefCallback<HTMLDivElement>",
      "Both A and C",
    ],
    correctAnswer: 3,
    explanation: "RefCallback<T> is an alias for the function signature in A.",
  },
  {
    id: 252,
    category: "Typescript",
    difficulty: "medium",
    question: "What is the type of the value returned by encodeURIComponent()?",
    options: ["string", "URI", "EncodedString", "any"],
    correctAnswer: 0,
    explanation: "The function returns a percent-encoded string.",
  },
  {
    id: 253,
    category: "Typescript",
    difficulty: "medium",
    question: "Which of these is the correct way to type a bigint literal?",
    options: [
      "const x: bigint = 123n",
      "const x = 123 as bigint",
      "const x = BigInt(123)",
      "All of the above",
    ],
    correctAnswer: 3,
    explanation:
      "All three forms produce a bigint; the literal suffix 'n' is the most concise.",
  },
  {
    id: 254,
    category: "Typescript",
    difficulty: "medium",
    question: "What is the type of the first argument to setTimeout in Node?",
    options: ["(...args: any[]) => void", "Function", "string", "both A and B"],
    correctAnswer: 3,
    explanation:
      "setTimeout accepts either a function or a string of code (deprecated).",
  },
  {
    id: 255,
    category: "Typescript",
    difficulty: "medium",
    question: "Which of these is the correct way to type a recursive readonly?",
    options: [
      "type DeepReadonly<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> }",
      "type DeepReadonly<T> = Readonly<T>",
      "type DeepReadonly<T> = T",
      "type DeepReadonly<T> = { [K in keyof T]: T[K] }",
    ],
    correctAnswer: 0,
    explanation:
      "A mapped type that calls itself on each property creates a deeply nested readonly.",
  },
  {
    id: 256,
    category: "Typescript",
    difficulty: "medium",
    question: "What is the type of the return value of Object.keys()?",
    options: ["string[]", "Array<keyof T>", "PropertyKey[]", "never"],
    correctAnswer: 0,
    explanation:
      "Object.keys is typed to return string[] for structural soundness.",
  },
  {
    id: 257,
    category: "Typescript",
    difficulty: "medium",
    question:
      "Which of these is the correct way to type a generic class component in React?",
    options: [
      "class Component<P, S> extends React.Component<P, S>",
      "class Component<P> extends React.Component<P>",
      "Both A and B",
      "class Component extends React.Component",
    ],
    correctAnswer: 2,
    explanation: "You can provide both props (P) and state (S) generics.",
  },
  {
    id: 258,
    category: "Typescript",
    difficulty: "medium",
    question: "What is the type of the value returned by Promise.reject()?",
    options: [
      "Promise<never>",
      "Promise<void>",
      "Promise<Error>",
      "Promise<unknown>",
    ],
    correctAnswer: 0,
    explanation:
      "reject produces Promise<never> because the promise will never successfully resolve.",
  },
  {
    id: 259,
    category: "Typescript",
    difficulty: "medium",
    question:
      "Which of these is the correct way to type a form submit handler?",
    options: [
      "React.FormEvent<HTMLFormElement>",
      "React.SyntheticEvent",
      "Event",
      "SubmitEvent",
    ],
    correctAnswer: 0,
    explanation:
      "FormEvent is generic over the element type; HTMLFormElement is correct.",
  },
  {
    id: 260,
    category: "Typescript",
    difficulty: "medium",
    question:
      "What is the type of the event parameter in addEventListener('scroll')?",
    options: ["Event", "UIEvent", "ScrollEvent", "both A and B"],
    correctAnswer: 3,
    explanation:
      "Scroll events are plain Event objects; UIEvent is a supertype.",
  },
  {
    id: 261,
    category: "Typescript",
    difficulty: "medium",
    question: "Which of these is the correct way to type a JSON value?",
    options: [
      "type JSONValue = string | number | boolean | null | JSONValue[] | { [k: string]: JSONValue }",
      "any",
      "unknown",
      "object",
    ],
    correctAnswer: 0,
    explanation: "The recursive type accurately models valid JSON structures.",
  },
  {
    id: 262,
    category: "Typescript",
    difficulty: "medium",
    question:
      "What is the type of the callback parameter to Array.prototype.map?",
    options: [
      "(value: T, index: number, array: T[]) => U",
      "(item: T) => U",
      "MapCallback<T, U>",
      "both A and C",
    ],
    correctAnswer: 3,
    explanation:
      "The standard lib declares the full signature; MapCallback is an alias.",
  },
  {
    id: 263,
    category: "Typescript",
    difficulty: "medium",
    question:
      "Which of these is the correct way to type a WebSocket message event?",
    options: [
      "MessageEvent",
      "WebSocketMessageEvent",
      "Event & { data: any }",
      "Both A and C",
    ],
    correctAnswer: 0,
    explanation:
      "MessageEvent is the standard interface carrying the data payload.",
  },
  {
    id: 264,
    category: "Typescript",
    difficulty: "medium",
    question: "What is the type of the value returned by Math.random()?",
    options: ["number", "0 | 1", "float", "double"],
    correctAnswer: 0,
    explanation:
      "The return type is simply number; no subtype guarantees are provided.",
  },
  {
    id: 265,
    category: "Typescript",
    difficulty: "medium",
    question: "Which of these is the correct way to type a Redux slice state?",
    options: [
      "interface SliceState { user: User | null; loading: boolean }",
      "type SliceState = any",
      "unknown",
      "object",
    ],
    correctAnswer: 0,
    explanation:
      "Explicit interfaces provide type safety and IDE autocomplete.",
  },
  {
    id: 266,
    category: "Typescript",
    difficulty: "medium",
    question:
      "What is the type of the event parameter in addEventListener('resize')?",
    options: ["UIEvent", "Event", "ResizeEvent", "both A and B"],
    correctAnswer: 3,
    explanation: "Resize events are UIEvent objects; Event is a supertype.",
  },
  {
    id: 267,
    category: "Typescript",
    difficulty: "medium",
    question: "Which of these is the correct way to type a generic hook?",
    options: [
      "function useCustom<T>(initial: T): [T, (value: T) => void]",
      "const useCustom = <T>(initial: T) => useState<T>(initial)",
      "Both A and B",
      "function useCustom<T = string>(initial: T)",
    ],
    correctAnswer: 2,
    explanation:
      "Both function and arrow syntax work; the generic allows inference.",
  },
  {
    id: 268,
    category: "Typescript",
    difficulty: "medium",
    question: "What is the type of the value returned by Date.now()?",
    options: ["number", "Date", "timestamp", "bigint"],
    correctAnswer: 0,
    explanation: "Date.now returns the epoch milliseconds as number.",
  },
  {
    id: 269,
    category: "Typescript",
    difficulty: "medium",
    question:
      "Which of these is the correct way to type a fetch error handler?",
    options: [
      "(error: unknown) => void",
      "(error: Error) => void",
      "(error: any) => void",
      "Both A and C",
    ],
    correctAnswer: 0,
    explanation:
      "Catching unknown forces you to inspect the error, improving safety.",
  },
  {
    id: 270,
    category: "Typescript",
    difficulty: "medium",
    question:
      "What is the type of the event parameter in addEventListener('keydown')?",
    options: ["KeyboardEvent", "Event", "KeyEvent", "both A and B"],
    correctAnswer: 3,
    explanation: "KeyboardEvent extends Event; either type is acceptable.",
  },
  {
    id: 271,
    category: "Typescript",
    difficulty: "medium",
    question:
      "Which of these is the correct way to type a context provider props?",
    options: [
      "interface ProviderProps { value: T; children: ReactNode }",
      "type ProviderProps = { value: T }",
      "Both A and B",
      "PropsWithChildren<{ value: T }>",
    ],
    correctAnswer: 3,
    explanation:
      "PropsWithChildren adds the optional children field automatically.",
  },
  {
    id: 272,
    category: "Typescript",
    difficulty: "medium",
    question: "What is the type of the value returned by encodeURI()?",
    options: ["string", "URI", "EncodedString", "any"],
    correctAnswer: 0,
    explanation: "The function returns a percent-encoded string.",
  },
  {
    id: 273,
    category: "Typescript",
    difficulty: "medium",
    question:
      "Which of these is the correct way to type a generic default parameter?",
    options: [
      "type MyType<T = string> = T",
      "type MyType<T: string> = T",
      "type MyType<T extends string = string> = T",
      "Both A and C",
    ],
    correctAnswer: 3,
    explanation:
      "Defaults are written after '='; when a constraint exists it appears before the default.",
  },
  {
    id: 274,
    category: "Typescript",
    difficulty: "medium",
    question:
      "What is the type of the event parameter in addEventListener('click')?",
    options: ["MouseEvent", "Event", "ClickEvent", "both A and B"],
    correctAnswer: 3,
    explanation: "MouseEvent extends Event; either type is acceptable.",
  },
  {
    id: 275,
    category: "Typescript",
    difficulty: "medium",
    question: "Which of these is the correct way to type a reducer action?",
    options: [
      "type Action = { type: string; payload?: any }",
      "interface Action { type: string }",
      "Both A and B",
      "type Action = never",
    ],
    correctAnswer: 2,
    explanation: "Both forms are valid; the first allows optional payload.",
  },
  {
    id: 276,
    category: "Typescript",
    difficulty: "medium",
    question: "What is the type of the value returned by Promise.resolve()?",
    options: ["Promise<T>", "T", "Promise<void>", "any"],
    correctAnswer: 0,
    explanation: "Promise.resolve wraps the value in a resolved promise.",
  },
  {
    id: 277,
    category: "Typescript",
    difficulty: "medium",
    question:
      "Which of these is the correct way to type a drag event in React?",
    options: [
      "React.DragEvent<HTMLDivElement>",
      "DragEvent",
      "Event",
      "Both A and B",
    ],
    correctAnswer: 0,
    explanation:
      "React’s synthetic event wrapper provides cross-browser normalization.",
  },
  {
    id: 278,
    category: "Typescript",
    difficulty: "medium",
    question:
      "What is the type of the event parameter in addEventListener('focus')?",
    options: ["FocusEvent", "Event", "UIEvent", "both A and B"],
    correctAnswer: 3,
    explanation: "FocusEvent extends Event; either type is acceptable.",
  },
  {
    id: 279,
    category: "Typescript",
    difficulty: "medium",
    question: "Which of these is the correct way to type a socket.io event?",
    options: [
      "interface Events { connect: () => void; data: (payload: any) => void }",
      "type Events = { [event: string]: Function }",
      "Map<string, Function>",
      "Both A and B",
    ],
    correctAnswer: 0,
    explanation:
      "An interface with specific event names provides strongly typed handlers.",
  },
  {
    id: 280,
    category: "Typescript",
    difficulty: "medium",
    question: "What is the type of the value returned by Object.entries()?",
    options: [
      "Array<[string, any]>",
      "[keyof T, T[keyof T]][]",
      "Array<[PropertyKey, any]>",
      "never",
    ],
    correctAnswer: 0,
    explanation:
      "entries returns an array of key-value pairs where keys are strings and values are any.",
  },
  {
    id: 281,
    category: "Typescript",
    difficulty: "medium",
    question:
      "Which of these is the correct way to type a focus event handler?",
    options: [
      "React.FocusEventHandler<HTMLInputElement>",
      "(event: React.FocusEvent<HTMLInputElement>) => void",
      "Both A and B",
      "FocusEvent",
    ],
    correctAnswer: 2,
    explanation:
      "The handler type is an alias for the function signature in B.",
  },
  {
    id: 282,
    category: "Typescript",
    difficulty: "medium",
    question:
      "What is the type of the event parameter in addEventListener('blur')?",
    options: ["FocusEvent", "Event", "BlurEvent", "both A and B"],
    correctAnswer: 3,
    explanation: "Blur events use FocusEvent; Event is a supertype.",
  },
  {
    id: 283,
    category: "Typescript",
    difficulty: "medium",
    question: "Which of these is the correct way to type a generic class?",
    options: [
      "class Container<T> { value: T }",
      "class Container { value: any }",
      "interface Container<T> { value: T }",
      "type Container<T> = { value: T }",
    ],
    correctAnswer: 0,
    explanation: "Classes can be generic just like functions and interfaces.",
  },
  {
    id: 284,
    category: "Typescript",
    difficulty: "medium",
    question: "What is the type of the value returned by Reflect.get()?",
    options: ["any", "unknown", "target[prop]", "undefined"],
    correctAnswer: 0,
    explanation:
      "Reflect.get is typed to return any; consumers should narrow or cast.",
  },
  {
    id: 285,
    category: "Typescript",
    difficulty: "medium",
    question: "Which of these is the correct way to type a clipboard event?",
    options: [
      "ClipboardEvent",
      "Event & { clipboardData: DataTransfer }",
      "Both A and B",
      "PasteEvent",
    ],
    correctAnswer: 2,
    explanation:
      "ClipboardEvent is the standard interface exposing clipboardData.",
  },
  {
    id: 286,
    category: "Typescript",
    difficulty: "medium",
    question:
      "What is the type of the event parameter in addEventListener('dblclick')?",
    options: ["MouseEvent", "Event", "DoubleClickEvent", "both A and B"],
    correctAnswer: 3,
    explanation:
      "DblClick events are MouseEvent instances; Event is a supertype.",
  },
  {
    id: 287,
    category: "Typescript",
    difficulty: "medium",
    question:
      "Which of these is the correct way to type a route parameter in Express?",
    options: [
      "req.params: { id: string }",
      "req.params.id: string",
      "ParamsDictionary",
      "Both A and C",
    ],
    correctAnswer: 3,
    explanation:
      "@types/express declares params as ParamsDictionary, an alias for Record<string, string>.",
  },
  {
    id: 288,
    category: "Typescript",
    difficulty: "medium",
    question: "What is the type of the value returned by Object.assign()?",
    options: ["T", "T & U", "any", "void"],
    correctAnswer: 0,
    explanation:
      "The overload returns the mutated target object, preserving its narrowed type.",
  },
  {
    id: 289,
    category: "Typescript",
    difficulty: "medium",
    question: "Which of these is the correct way to type a mutation observer?",
    options: [
      "(mutations: MutationRecord[], observer: MutationObserver) => void",
      "MutationCallback",
      "Both A and B",
      "(mutation: MutationRecord) => void",
    ],
    correctAnswer: 2,
    explanation:
      "MutationCallback is the provided alias for the signature in A.",
  },
  {
    id: 290,
    category: "Typescript",
    difficulty: "medium",
    question:
      "What is the type of the event parameter in addEventListener('input')?",
    options: ["InputEvent", "Event", "UIEvent", "both A and B"],
    correctAnswer: 3,
    explanation: "InputEvent extends Event; either type is acceptable.",
  },
  {
    id: 291,
    category: "Typescript",
    difficulty: "medium",
    question:
      "Which of these is the correct way to type a WebAssembly instance?",
    options: [
      "WebAssembly.Instance",
      "Instance",
      "{ exports: Record<string, any> }",
      "any",
    ],
    correctAnswer: 0,
    explanation: "The WebAssembly namespace provides the Instance interface.",
  },
  {
    id: 292,
    category: "Typescript",
    difficulty: "medium",
    question: "What is the type of the value returned by Object.create()?",
    options: ["any", "object", "T", "never"],
    correctAnswer: 0,
    explanation:
      "Object.create returns any; you can narrow via a generic helper.",
  },
  {
    id: 293,
    category: "Typescript",
    difficulty: "medium",
    question: "Which of these is the correct way to type a resize observer?",
    options: [
      "(entries: ResizeObserverEntry[], observer: ResizeObserver) => void",
      "ResizeObserverCallback",
      "Both A and B",
      "(entry: ResizeObserverEntry) => void",
    ],
    correctAnswer: 2,
    explanation:
      "ResizeObserverCallback is the provided alias for the signature in A.",
  },
  {
    id: 294,
    category: "Typescript",
    difficulty: "medium",
    question:
      "What is the type of the event parameter in addEventListener('change')?",
    options: ["Event", "UIEvent", "ChangeEvent", "Event"],
    correctAnswer: 0,
    explanation:
      "Change events are plain Event objects; specific subtypes exist for inputs.",
  },
  {
    id: 295,
    category: "Typescript",
    difficulty: "medium",
    question: "Which of these is the correct way to type a fetch response?",
    options: ["Response", "Promise<Response>", "any", "unknown"],
    correctAnswer: 0,
    explanation:
      "fetch resolves with the Response interface; consumers must call .json() etc.",
  },
  {
    id: 296,
    category: "Typescript",
    difficulty: "medium",
    question:
      "What is the type of the value returned by Object.defineProperty()?",
    options: ["T", "void", "object", "any"],
    correctAnswer: 0,
    explanation:
      "The function returns the mutated object, preserving its type.",
  },
  {
    id: 297,
    category: "Typescript",
    difficulty: "medium",
    question:
      "Which of these is the correct way to type an intersection observer?",
    options: [
      "(entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void",
      "IntersectionObserverCallback",
      "Both A and B",
      "(entry: IntersectionObserverEntry) => void",
    ],
    correctAnswer: 2,
    explanation:
      "IntersectionObserverCallback is the provided alias for the signature in A.",
  },
  {
    id: 298,
    category: "Typescript",
    difficulty: "medium",
    question:
      "What is the type of the event parameter in addEventListener('submit')?",
    options: ["SubmitEvent", "Event", "UIEvent", "both A and B"],
    correctAnswer: 3,
    explanation: "SubmitEvent extends Event; either type is acceptable.",
  },
  {
    id: 299,
    category: "Typescript",
    difficulty: "medium",
    question: "Which of these is the correct way to type a Web Worker message?",
    options: [
      "MessageEvent",
      "{ data: any }",
      "Both A and B",
      "WorkerMessageEvent",
    ],
    correctAnswer: 2,
    explanation:
      "The standard MessageEvent interface carries the data payload.",
  },
  {
    id: 300,
    category: "Typescript",
    difficulty: "medium",
    question:
      "What is the type of the value returned by Object.getOwnPropertyDescriptor()?",
    options: [
      "PropertyDescriptor | undefined",
      "PropertyDescriptor",
      "any",
      "never",
    ],
    correctAnswer: 0,
    explanation:
      "The descriptor may be undefined if the property does not exist.",
  },
  {
    id: 301,
    category: "Typescript",
    difficulty: "hard",
    question: "Which of these produces a compile-time error in strict mode?",
    options: [
      "const x: string = null!",
      "const x: string = undefined as any",
      "const x: string = null as unknown as string",
      "const x: string = null",
    ],
    correctAnswer: 3,
    explanation:
      "Strict null checks reject direct assignment of null to a non-nullable string.",
  },
  {
    id: 302,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following conditional type: type T = number extends string ? true : false?",
    options: ["false", "boolean", "never", "error"],
    correctAnswer: 0,
    explanation:
      "The conditional resolves to the false branch because number does not extend string.",
  },
  {
    id: 303,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these is the correct way to extract the parameter types of a function?",
    options: ["Parameters<F>", "ParamTypes<F>", "Args<F>", "FunctionArgs<F>"],
    correctAnswer: 0,
    explanation:
      "Parameters<F> is the built-in utility that extracts a tuple of argument types.",
  },
  {
    id: 304,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following mapped type: { [K in keyof T as `get${Capitalize<K & string>}`]: () => T[K] }",
    options: [
      "Transforms each property into a getter method",
      "Adds a prefix to each property name",
      "Both A and B",
      "Removes readonly modifier",
    ],
    correctAnswer: 2,
    explanation:
      "The 'as' clause remaps keys and the value type becomes a zero-arg function returning the original property type.",
  },
  {
    id: 305,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these is the correct way to type a variadic tuple with leading fixed elements?",
    options: [
      "[number, ...T[]]",
      "[...T[], number]",
      "[number, T, ...T[]]",
      "All of the above",
    ],
    correctAnswer: 3,
    explanation:
      "All listed patterns are valid uses of variadic tuple syntax introduced in TS 4.0.",
  },
  {
    id: 306,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following utility: type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never?",
    options: [
      "Converts a union to an intersection",
      "Converts an intersection to a union",
      "Removes never from a union",
      "Extracts the last union member",
    ],
    correctAnswer: 0,
    explanation:
      "The contravariant position trick collects all union members into an intersection.",
  },
  {
    id: 307,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these is the correct way to type a deeply nested nullable path?",
    options: [
      "type DeepNullable<T> = { [K in keyof T]: DeepNullable<T[K]> | null }",
      "type DeepNullable<T> = T | null",
      "type DeepNullable<T> = Partial<T>",
      "type DeepNullable<T> = { [K in keyof T]: T[K] | null }",
    ],
    correctAnswer: 0,
    explanation:
      "Recursively applying | null to every leaf creates a deeply nullable structure.",
  },
  {
    id: 308,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following conditional: type IsNever<T> = [T] extends [never] ? true : false?",
    options: [
      "A way to test for the never type",
      "Always returns false",
      "Always returns true",
      "Produces a compile error",
    ],
    correctAnswer: 0,
    explanation:
      "Wrapping in a tuple prevents distributive behavior, allowing reliable never detection.",
  },
  {
    id: 309,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these is the correct way to type a branded type for nominal typing?",
    options: [
      "type USD = number & { _brand: 'USD' }",
      "type USD = { value: number, currency: 'USD' }",
      "type USD = number",
      "interface USD extends number {}",
    ],
    correctAnswer: 0,
    explanation:
      "Intersection with a unique brand property creates a compile-time distinct subtype of number.",
  },
  {
    id: 310,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following utility: type Mutable<T> = { -readonly [P in keyof T]: T[P] }",
    options: [
      "Removes readonly from all properties",
      "Adds readonly to all properties",
      "Makes all properties optional",
      "Converts all properties to never",
    ],
    correctAnswer: 0,
    explanation:
      "The -readonly modifier strips the readonly flag from each property.",
  },
  {
    id: 311,
    category: "Typescript",
    difficulty: "hard",
    question: "Which of these is the correct way to type a recursive union?",
    options: [
      "type Json = string | number | boolean | null | Json[] | { [k: string]: Json }",
      "type Json = any",
      "type Json = unknown",
      "type Json = object",
    ],
    correctAnswer: 0,
    explanation:
      "The self-referencing union accurately models JSON-compatible values.",
  },
  {
    id: 312,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following mapped type: type PickByType<T, U> = { [K in keyof T as T[K] extends U ? K : never]: T[K] }",
    options: [
      "Picks properties whose values extend U",
      "Omits properties whose values extend U",
      "Transforms values to U",
      "Produces never",
    ],
    correctAnswer: 0,
    explanation:
      "The 'as' clause filters keys whose values match the condition.",
  },
  {
    id: 313,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these is the correct way to type a curried function with arity preservation?",
    options: [
      "function curry<F extends (...args: any[]) => any>(f: F): Curried<F>",
      "function curry(f: Function): Function",
      "const curry = f => a => b => f(a, b)",
      "Curry<F>",
    ],
    correctAnswer: 0,
    explanation:
      "A generic curried type can preserve the original function’s arity and types.",
  },
  {
    id: 314,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following utility: type Flatten<T> = T extends Array<infer U> ? U : T?",
    options: [
      "Extracts the element type of an array",
      "Wraps T in an array",
      "Returns never if T is not an array",
      "Converts T to unknown",
    ],
    correctAnswer: 0,
    explanation:
      "Conditional inference extracts the element type from arrays and leaves non-arrays unchanged.",
  },
  {
    id: 315,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these is the correct way to type a pipe function with strict type flow?",
    options: [
      "type Pipe = <A, B, C>(ab: (a: A) => B, bc: (b: B) => C) => (a: A) => C",
      "type Pipe = (...fns: Function[]) => Function",
      "const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)",
      "Pipe<F, G>",
    ],
    correctAnswer: 0,
    explanation:
      "Generics ensure each step’s output matches the next step’s input.",
  },
  {
    id: 316,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following utility: type OptionalKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? K : never }[keyof T]?",
    options: [
      "Extracts optional keys of T",
      "Extracts required keys of T",
      "Removes all keys",
      "Produces never",
    ],
    correctAnswer: 0,
    explanation:
      "The distributive test checks whether {} extends the picked property, identifying optionality.",
  },
  {
    id: 317,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these is the correct way to type a higher-kinded type emulation?",
    options: [
      "type HKT<F, A> = { readonly _F: F; readonly _A: A }",
      "type HKT<F, A> = F<A>",
      "type HKT = any",
      "Not possible in TypeScript",
    ],
    correctAnswer: 0,
    explanation:
      "The *lightweight higher-kinded type* pattern uses a phantom field to simulate HKTs.",
  },
  {
    id: 318,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following utility: type Reverse<T extends readonly any[]> = T extends readonly [...infer I, infer L] ? [L, ...Reverse<I>] : []?",
    options: [
      "Reverses a tuple type",
      "Sorts a tuple",
      "Returns never",
      "Produces a compile error",
    ],
    correctAnswer: 0,
    explanation:
      "Recursive conditional inference extracts the last element and prepends it to the reversed rest.",
  },
  {
    id: 319,
    category: "Typescript",
    difficulty: "hard",
    question: "Which of these is the correct way to type a path-based getter?",
    options: [
      "function get<O, P extends Path<O>>(obj: O, path: P): PathValue<O, P>",
      "function get(obj: object, path: string): any",
      "const get = (obj, path) => path.split('.').reduce((o, k) => o[k], obj)",
      "Get<O, P>",
    ],
    correctAnswer: 0,
    explanation:
      "Path and PathValue are custom types that validate and infer the nested type at the given path.",
  },
  {
    id: 320,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following utility: type Length<T extends readonly any[]> = T['length']?",
    options: [
      "Extracts the numeric length of a tuple",
      "Returns never",
      "Returns any",
      "Produces a compile error",
    ],
    correctAnswer: 0,
    explanation:
      "Indexed access on the length property yields the literal number for fixed-length tuples.",
  },
  {
    id: 321,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these is the correct way to type a conditional return type based on an argument?",
    options: [
      "function f<T extends boolean>(x: T): T extends true ? string : number",
      "function f(x: boolean): any",
      "const f = (x: boolean) => x ? 's' : 1",
      "F<T>",
    ],
    correctAnswer: 0,
    explanation:
      "Conditional types in function signatures allow return types that depend on the input type.",
  },
  {
    id: 322,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following utility: type AllKeys<T> = T extends any ? keyof T : never?",
    options: [
      "Collects all keys from a union of objects",
      "Returns never",
      "Returns keyof T",
      "Produces a compile error",
    ],
    correctAnswer: 0,
    explanation:
      "Distributive conditional mapping extracts keyof each union member and unites them.",
  },
  {
    id: 323,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these is the correct way to type a nominal type for IDs?",
    options: [
      "type UserId = string & { readonly _brand: unique symbol }",
      "type UserId = string",
      "type UserId = { value: string }",
      "interface UserId extends string {}",
    ],
    correctAnswer: 0,
    explanation:
      "A unique symbol brand ensures compile-time distinctness even from other branded strings.",
  },
  {
    id: 324,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following utility: type Split<S extends string, D extends string> = S extends `${infer T}${D}${infer U}` ? [T, ...Split<U, D>] : [S]?",
    options: [
      "Splits a string literal into a tuple of substrings",
      "Joins strings",
      "Returns never",
      "Produces a compile error",
    ],
    correctAnswer: 0,
    explanation:
      "Recursive template literal inference splits the string at each delimiter and collects the parts into a tuple.",
  },
  {
    id: 325,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these is the correct way to type a variadic function with typed rest parameters?",
    options: [
      "function f<T extends any[]>(...args: T): T",
      "function f(...args: any[]): any[]",
      "const f = (...args) => args",
      "Variadic<T>",
    ],
    correctAnswer: 0,
    explanation:
      "A generic rest tuple preserves the exact types and length of the arguments.",
  },
  {
    id: 326,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following utility: type Merge<A, B> = { [K in keyof A]: K extends keyof B ? B[K] : A[K] } & Omit<B, keyof A>?",
    options: [
      "Shallow merges B into A, with B winning conflicts",
      "Deep merges nested objects",
      "Returns never",
      "Produces a compile error",
    ],
    correctAnswer: 0,
    explanation:
      "The intersection and conditional overwrite implement a shallow merge with B taking precedence.",
  },
  {
    id: 327,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these is the correct way to type a proxy handler with traps?",
    options: [
      "const handler: ProxyHandler<T> = { get(target, prop) { ... } }",
      "const handler = { get(target, prop) { ... } }",
      "Handler<T>",
      "Proxy<T>",
    ],
    correctAnswer: 0,
    explanation:
      "ProxyHandler<T> provides typed trap signatures for the target object.",
  },
  {
    id: 328,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following utility: type Join<T extends readonly string[], D extends string> = T extends readonly [infer F, ...infer R] ? `${F & string}${R extends readonly string[] ? Join<R, D> : ''}` : ''?",
    options: [
      "Joins a tuple of string literals with a delimiter",
      "Splits a string",
      "Returns never",
      "Produces a compile error",
    ],
    correctAnswer: 0,
    explanation:
      "Recursive template literal concatenation joins the tuple elements with the delimiter.",
  },
  {
    id: 329,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these is the correct way to type a discriminated union with a shared field?",
    options: [
      "type Action = { type: 'add'; item: string } | { type: 'remove'; id: number }",
      "type Action = { type: string }",
      "type Action = never",
      "interface Action { type: string }",
    ],
    correctAnswer: 0,
    explanation:
      "A literal discriminator field allows narrowing between variants.",
  },
  {
    id: 330,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following utility: type NonNullableKeys<T> = { [K in keyof T]-?: null extends T[K] ? never : K }[keyof T]?",
    options: [
      "Extracts keys whose values do not include null",
      "Extracts keys whose values include null",
      "Returns never",
      "Produces a compile error",
    ],
    correctAnswer: 0,
    explanation:
      "The distributive test checks whether null extends the property type, filtering out nullable ones.",
  },
  {
    id: 331,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these is the correct way to type a function that never returns?",
    options: [
      "function f(): never",
      "function f(): void",
      "function f(): undefined",
      "function f(): Error",
    ],
    correctAnswer: 0,
    explanation:
      "The never return type indicates the function does not return (throws or infinite loop).",
  },
  {
    id: 332,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following utility: type Head<T extends readonly any[]> = T extends readonly [infer H, ...any[]] ? H : never?",
    options: [
      "Extracts the first element of a tuple",
      "Extracts the last element",
      "Returns never",
      "Produces a compile error",
    ],
    correctAnswer: 0,
    explanation:
      "Conditional inference picks the first element if the tuple is non-empty.",
  },
  {
    id: 333,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these is the correct way to type a deeply partial intersection?",
    options: [
      "type DeepPartial<T> = { [K in keyof T]?: DeepPartial<T[K]> }",
      "type DeepPartial<T> = Partial<T>",
      "type DeepPartial<T> = T | Partial<T>",
      "type DeepPartial<T> = { [K in keyof T]: T[K] }",
    ],
    correctAnswer: 0,
    explanation:
      "Recursively applying the optional modifier creates a deeply nested partial.",
  },
  {
    id: 334,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following utility: type Tail<T extends readonly any[]> = T extends readonly [any, ...infer Rest] ? Rest : []?",
    options: [
      "Returns a tuple without the first element",
      "Returns a tuple without the last element",
      "Returns never",
      "Produces a compile error",
    ],
    correctAnswer: 0,
    explanation:
      "Conditional inference captures the rest of the tuple after the first element.",
  },
  {
    id: 335,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these is the correct way to type a generic constraints with multiple conditions?",
    options: [
      "T extends object & { id: string }",
      "T extends object, { id: string }",
      "T = object & { id: string }",
      "T implements object & { id: string }",
    ],
    correctAnswer: 0,
    explanation: "Intersection types combine multiple constraints into one.",
  },
  {
    id: 336,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following utility: type Last<T extends readonly any[]> = T extends readonly [...any[], infer L] ? L : never?",
    options: [
      "Extracts the last element of a tuple",
      "Extracts the first element",
      "Returns never",
      "Produces a compile error",
    ],
    correctAnswer: 0,
    explanation:
      "Conditional inference picks the last element if the tuple is non-empty.",
  },
  {
    id: 337,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these is the correct way to type a conditional props type?",
    options: [
      "type Props<T extends boolean> = T extends true ? { a: string } : { b: number }",
      "type Props = { a: string } | { b: number }",
      "type Props<T> = T",
      "type Props = never",
    ],
    correctAnswer: 0,
    explanation:
      "Conditional types allow props to depend on a generic boolean flag.",
  },
  {
    id: 338,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following utility: type IsArray<T> = T extends readonly any[] ? true : false?",
    options: [
      "Returns true if T is an array",
      "Returns false always",
      "Returns never",
      "Produces a compile error",
    ],
    correctAnswer: 0,
    explanation: "The conditional checks whether T extends any array type.",
  },
  {
    id: 339,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these is the correct way to type a union to intersection?",
    options: [
      "type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never",
      "type UnionToIntersection<U> = U",
      "type UnionToIntersection<U> = never",
      "Not possible",
    ],
    correctAnswer: 0,
    explanation:
      "The contravariant position trick collects all union members into an intersection.",
  },
  {
    id: 340,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following utility: type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>?",
    options: [
      "Makes only the specified keys partial",
      "Makes all keys partial",
      "Removes the specified keys",
      "Returns never",
    ],
    correctAnswer: 0,
    explanation:
      "Omit removes the keys, then Partial<Pick> adds them back as optional.",
  },
  {
    id: 341,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these is the correct way to type a function overload with different return types?",
    options: [
      "function f(x: string): string; function f(x: number): number; function f(x: string | number): string | number",
      "function f(x: string | number): string | number",
      "const f = (x: string | number) => x",
      "type f = (x: string | number) => string | number",
    ],
    correctAnswer: 0,
    explanation:
      "Overload signatures allow distinct return types per input type.",
  },
  {
    id: 342,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following utility: type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>?",
    options: [
      "Makes only the specified keys required",
      "Makes all keys required",
      "Removes the specified keys",
      "Returns never",
    ],
    correctAnswer: 0,
    explanation:
      "Intersection with Required<Pick> forces the chosen keys to be required.",
  },
  {
    id: 343,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these is the correct way to type a deeply required type?",
    options: [
      "type DeepRequired<T> = { [K in keyof T]-?: DeepRequired<T[K]> }",
      "type DeepRequired<T> = Required<T>",
      "type DeepRequired<T> = T",
      "type DeepRequired<T> = { [K in keyof T]: T[K] }",
    ],
    correctAnswer: 0,
    explanation:
      "Recursively applying the required modifier creates a deeply required structure.",
  },
  {
    id: 344,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following utility: type Immutable<T> = { readonly [K in keyof T]: Immutable<T[K]> }",
    options: [
      "Makes all properties deeply readonly",
      "Makes all properties optional",
      "Removes readonly",
      "Returns never",
    ],
    correctAnswer: 0,
    explanation:
      "Recursive readonly mapping creates an immutable version of the type.",
  },
  {
    id: 345,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these is the correct way to type a union of tuple permutations?",
    options: [
      "type Permutations<T extends any[]> = T extends [infer A, ...infer Rest] ? [A, ...Permutations<Rest>] : []",
      "type Permutations<T> = T",
      "type Permutations<T> = never",
      "Not possible",
    ],
    correctAnswer: 0,
    explanation:
      "Recursive conditional inference can generate all permutations of a tuple.",
  },
  {
    id: 346,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following utility: type NonEmptyArray<T> = [T, ...T[]]?",
    options: [
      "An array that must have at least one element",
      "An optional array",
      "A readonly tuple",
      "Returns never",
    ],
    correctAnswer: 0,
    explanation: "The leading required element ensures the array is non-empty.",
  },
  {
    id: 347,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these is the correct way to type a function that asserts a predicate?",
    options: [
      "function assert(value: any): asserts value is string",
      "function assert(value: any): boolean",
      "const assert = (value: any) => typeof value === 'string'",
      "type assert = (value: any) => void",
    ],
    correctAnswer: 0,
    explanation:
      "The asserts predicate narrows the type of the parameter in control flow.",
  },
  {
    id: 348,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following utility: type Replace<T, U, V> = T extends U ? V : T?",
    options: [
      "Replaces occurrences of U in T with V",
      "Removes U from T",
      "Returns never",
      "Produces a compile error",
    ],
    correctAnswer: 0,
    explanation:
      "The conditional checks each union member and replaces matches with V.",
  },
  {
    id: 349,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these is the correct way to type a recursive union flatten?",
    options: [
      "type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T",
      "type Flatten<T> = T",
      "type Flatten<T> = never",
      "Not possible",
    ],
    correctAnswer: 0,
    explanation:
      "Recursive conditional inference flattens nested arrays to their base element type.",
  },
  {
    id: 350,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following utility: type Swap<T extends [any, any]> = T extends [infer A, infer B] ? [B, A] : never?",
    options: [
      "Swaps the two elements of a pair tuple",
      "Returns the same tuple",
      "Returns never",
      "Produces a compile error",
    ],
    correctAnswer: 0,
    explanation:
      "Conditional inference reverses the order of the tuple elements.",
  },
  {
    id: 351,
    category: "Typescript",
    difficulty: "hard",
    question: "Which of these is the correct way to type a deeply omit type?",
    options: [
      "type DeepOmit<T, K extends PropertyKey> = { [P in keyof T as P extends K ? never : P]: DeepOmit<T[P], K> }",
      "type DeepOmit<T, K> = Omit<T, K>",
      "type DeepOmit<T, K> = T",
      "type DeepOmit<T, K> = never",
    ],
    correctAnswer: 0,
    explanation:
      "Recursive key remapping removes the specified keys at every level.",
  },
  {
    id: 352,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following utility: type PartialKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? K : never }[keyof T]?",
    options: [
      "Extracts optional keys of T",
      "Extracts required keys of T",
      "Returns never",
      "Produces a compile error",
    ],
    correctAnswer: 0,
    explanation:
      "The distributive test checks whether {} extends the picked property, identifying optionality.",
  },
  {
    id: 353,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these is the correct way to type a union of object values?",
    options: [
      "type Values<T> = T[keyof T]",
      "type Values<T> = T",
      "type Values<T> = never",
      "type Values<T> = any",
    ],
    correctAnswer: 0,
    explanation:
      "Indexed access with keyof T produces the union of all property value types.",
  },
  {
    id: 354,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following utility: type Keys<T> = keyof T?",
    options: [
      "Returns the union of keys of T",
      "Returns never",
      "Returns any",
      "Produces a compile error",
    ],
    correctAnswer: 0,
    explanation:
      "The built-in keyof operator already produces the union of keys; this is an alias.",
  },
  {
    id: 355,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these is the correct way to type a conditional mapped type?",
    options: [
      "type Conditional<T, Condition> = { [K in keyof T as T[K] extends Condition ? K : never]: T[K] }",
      "type Conditional<T, Condition> = T",
      "type Conditional<T, Condition> = never",
      "type Conditional<T, Condition> = any",
    ],
    correctAnswer: 0,
    explanation:
      "The 'as' clause filters keys whose values satisfy the condition.",
  },
  {
    id: 356,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following utility: type TupleUnion<U extends string, R extends any[] = []> = { [S in U]: Exclude<U, S> extends never ? [...R, S] : TupleUnion<Exclude<U, S>, [...R, S]> }[U]?",
    options: [
      "Converts a string union to a tuple of all permutations",
      "Returns the same union",
      "Returns never",
      "Produces a compile error",
    ],
    correctAnswer: 0,
    explanation:
      "Recursive conditional mapping collects each union member into a tuple and continues with the remaining members.",
  },
  {
    id: 357,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these is the correct way to type a function with a generic default and constraint?",
    options: [
      "function f<T extends object = object>(x: T): T",
      "function f<T = object>(x: T): T",
      "function f<T extends object>(x: T): T",
      "function f(x: object): object",
    ],
    correctAnswer: 0,
    explanation:
      "Both constraint and default can be specified together; the default must satisfy the constraint.",
  },
  {
    id: 358,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these is the correct way to type a recursive partial that stops at primitives?",
    options: [
      "type DeepPartial<T> = T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } : T",
      "type DeepPartial<T> = Partial<T>",
      "type DeepPartial<T> = T",
      "type DeepPartial<T> = never",
    ],
    correctAnswer: 0,
    explanation:
      "The conditional checks whether T is an object before recursing, preventing primitives from becoming partial.",
  },
  {
    id: 359,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the exact compile-time type of the expression `keyof never`?",
    options: ["never", "string | number | symbol", "undefined", "any"],
    correctAnswer: 1,
    explanation:
      "`keyof never` produces the union of all possible property-key types because never is the bottom type and extends every type.",
  },
  {
    id: 360,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which compiler option makes index signatures return `T | undefined` instead of `T`?",
    options: [
      "noUncheckedIndexedAccess",
      "strictNullChecks",
      "exactOptionalPropertyTypes",
      "strict",
    ],
    correctAnswer: 0,
    explanation:
      "noUncheckedIndexedAccess adds undefined to every bracket-access result, forcing you to handle missing indices.",
  },
  {
    id: 361,
    category: "Typescript",
    difficulty: "hard",
    question:
      "How do you type a generic constructor that accepts variadic arguments?",
    options: [
      "type Constructable<T, A extends any[]> = new (...args: A) => T",
      "type Constructable<T> = new () => T",
      "type Constructable = Function",
      "type Constructable<T, A> = new (args: A) => T",
    ],
    correctAnswer: 0,
    explanation:
      "A rest tuple in the construct signature preserves the arity and types of the constructor arguments.",
  },
  {
    id: 362,
    category: "Typescript",
    difficulty: "hard",
    question: "What is the type produced by `type T = { [K in string]: K }`?",
    options: [
      "an index signature whose values are the keys themselves",
      "a mapped type over every possible string",
      "string",
      "never",
    ],
    correctAnswer: 1,
    explanation:
      "This is a homomorphic mapped type over all string keys; each property’s value is its own key literal.",
  },
  {
    id: 363,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which built-in utility extracts the refutation type of an assertion function?",
    options: [
      "There is no built-in utility",
      "ReturnType<F>",
      "Parameters<F>",
      "AssertType<F>",
    ],
    correctAnswer: 0,
    explanation:
      "TypeScript does not expose a utility to extract the predicate type from an assertion function; you must write one.",
  },
  {
    id: 364,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the exact type of `import.meta` in a Node ESM file with `@types/node`?",
    options: ["ImportMeta", "typeof import.meta", "object", "any"],
    correctAnswer: 1,
    explanation:
      "@types/node augments the global ImportMeta interface, so the type is the unique `typeof import.meta`.",
  },
  {
    id: 365,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these conditional types correctly distributes over unions?",
    options: [
      "type Distribute<T> = T extends any ? { value: T } : never",
      "type Distribute<T> = { value: T }",
      "type Distribute<T> = never",
      "type Distribute<T> = T",
    ],
    correctAnswer: 0,
    explanation:
      "The naked `T extends any` triggers distributivity, mapping the conditional over each union member.",
  },
  {
    id: 366,
    category: "Typescript",
    difficulty: "hard",
    question: "How do you type a mapped type that remaps keys to camelCase?",
    options: [
      "type CamelKeys<T> = { [K in keyof T as CamelCase<K & string>]: T[K] }",
      "type CamelKeys<T> = { [K in keyof T]: T[K] }",
      "type CamelKeys<T> = T",
      "type CamelKeys<T> = never",
    ],
    correctAnswer: 0,
    explanation:
      "The `as` clause in mapped types can transform keys using template literal utilities like CamelCase.",
  },
  {
    id: 367,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following expression: `type T = number & string`?",
    options: ["never", "unknown", "number | string", "any"],
    correctAnswer: 0,
    explanation:
      "No value can be both number and string, so the intersection reduces to never.",
  },
  {
    id: 368,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these is a lawful way to implement a higher-kinded type emulation?",
    options: [
      "type HKT<F, A> = { readonly _F: F; readonly _A: A; readonly URI: F }",
      "type HKT<F, A> = F<A>",
      "type HKT<F, A> = any",
      "type HKT<F, A> = never",
    ],
    correctAnswer: 0,
    explanation:
      "The *lightweight HKT* pattern uses phantom fields and a URI tag to simulate type constructors.",
  },
  {
    id: 369,
    category: "Typescript",
    difficulty: "hard",
    question: "What is the exact type of `this` inside a static class method?",
    options: ["typeof Class", "Class", "object", "any"],
    correctAnswer: 0,
    explanation:
      "Static methods use the constructor function as their this context, typed as `typeof Class`.",
  },
  {
    id: 370,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these conditional types extracts the successful branch of a Promise?",
    options: [
      "type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T",
      "type Awaited<T> = T",
      "type Awaited<T> = never",
      "type Awaited<T> = T extends Promise<infer U> ? U : T",
    ],
    correctAnswer: 0,
    explanation:
      "The recursive Awaited utility unwraps nested promises until it reaches a non-promise type.",
  },
  {
    id: 371,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following mapped type that inverts keys and values?",
    options: [
      "type Swap<T extends Record<PropertyKey, PropertyKey>> = { [K in T[keyof T]]: { [P in keyof T]: T[P] extends K ? P : never }[keyof T] }",
      "type Swap<T> = T",
      "type Swap<T> = never",
      "type Swap<T> = any",
    ],
    correctAnswer: 0,
    explanation:
      "The nested mapped type collects keys whose values match K, producing an inverse mapping.",
  },
  {
    id: 372,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these is the correct way to type a refutation assertion?",
    options: [
      "function assertIsString(x: unknown): asserts x is string { if (typeof x !== 'string') throw new Error(); }",
      "function assertIsString(x: unknown): boolean { return typeof x === 'string'; }",
      "const assertIsString = (x: unknown) => typeof x === 'string'",
      "type assertIsString = (x: unknown) => void",
    ],
    correctAnswer: 0,
    explanation:
      "Assertion functions use the `asserts` predicate to narrow the argument type in control flow.",
  },
  {
    id: 373,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following utility: type StrictOmit<T, K extends keyof T> = Omit<T, K>?",
    options: [
      "A stricter version of Omit that enforces K to be keys of T",
      "Same as built-in Omit",
      "Returns never",
      "Returns T",
    ],
    correctAnswer: 0,
    explanation:
      "The constraint ensures K is actually a key of T, catching typos at compile time.",
  },
  {
    id: 374,
    category: "Typescript",
    difficulty: "hard",
    question: "Which of these is the correct way to type a pipeable operator?",
    options: [
      "type Operator<A, B> = (source: Observable<A>) => Observable<B>",
      "type Operator<A> = (a: A) => A",
      "type Operator = Function",
      "type Operator<A, B> = Observable<B>",
    ],
    correctAnswer: 0,
    explanation:
      "A pipeable operator is a higher-order function that transforms one observable into another.",
  },
  {
    id: 375,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following utility: type AllEquals<T extends readonly any[]> = T extends readonly [infer H, ...infer Rest] ? Rest extends H[] ? Equal<H, Rest[number]> extends true ? AllEquals<Rest> : false : true : true?",
    options: [
      "Checks whether all elements in a tuple are equal",
      "Returns true always",
      "Returns false always",
      "Produces a compile error",
    ],
    correctAnswer: 0,
    explanation:
      "Recursive conditional inference compares each element to the head and continues until the tuple is empty.",
  },
  {
    id: 376,
    category: "Typescript",
    difficulty: "hard",
    question: "Which of these is the correct way to type a nominal number ID?",
    options: [
      "type UserId = number & { readonly _brand: unique symbol }",
      "type UserId = number",
      "type UserId = { value: number }",
      "interface UserId extends number {}",
    ],
    correctAnswer: 0,
    explanation:
      "A unique symbol brand ensures compile-time distinctness even from other branded numbers.",
  },
  {
    id: 377,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following utility: type TupleToUnion<T extends readonly any[]> = T[number]?",
    options: [
      "Converts a tuple to a union of its elements",
      "Converts a union to a tuple",
      "Returns never",
      "Returns T",
    ],
    correctAnswer: 0,
    explanation:
      "Indexed access with number produces the union of all element types in the tuple.",
  },
  {
    id: 378,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these is the correct way to type a variadic zip function?",
    options: [
      "function zip<T extends any[][]>(...arrays: T): { [K in keyof T]: T[K][number] }[]",
      "function zip(...arrays: any[][]): any[][]",
      "const zip = (...arrays) => arrays[0].map((_, i) => arrays.map(a => a[i]))",
      "Zip<T>",
    ],
    correctAnswer: 0,
    explanation:
      "A generic rest tuple preserves the types of each input array and produces a tuple of elements at each index.",
  },
  {
    id: 379,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following utility: type IsAny<T> = 0 extends 1 & T ? true : false?",
    options: [
      "Detects the any type",
      "Always returns true",
      "Always returns false",
      "Produces a compile error",
    ],
    correctAnswer: 0,
    explanation:
      "Because any absorbs all types, `1 & T` becomes any, and `0 extends any` is true only when T is any.",
  },
  {
    id: 380,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these is the correct way to type a deeply nullable union?",
    options: [
      "type DeepNullable<T> = T extends object ? { [K in keyof T]: DeepNullable<T[K]> | null } : T | null",
      "type DeepNullable<T> = T | null",
      "type DeepNullable<T> = Partial<T>",
      "type DeepNullable<T> = never",
    ],
    correctAnswer: 0,
    explanation:
      "The conditional recurses until it reaches a primitive, then unions it with null.",
  },
  {
    id: 381,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following utility: type Pop<T extends readonly any[]> = T extends readonly [...infer Rest, any] ? Rest : []?",
    options: [
      "Returns a tuple without the last element",
      "Returns a tuple without the first element",
      "Returns never",
      "Produces a compile error",
    ],
    correctAnswer: 0,
    explanation:
      "Conditional inference captures all elements except the last one.",
  },
  {
    id: 382,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these is the correct way to type a generic event emitter?",
    options: [
      "interface Emitter<T extends Record<string, any[]>> { on<K extends keyof T>(event: K, listener: (...args: T[K]) => void): void; emit<K extends keyof T>(event: K, ...args: T[K]): void; }",
      "interface Emitter { on(event: string, listener: Function): void; emit(event: string, ...args: any[]): void; }",
      "type Emitter = Map<string, Function>",
      "type Emitter<T> = T",
    ],
    correctAnswer: 0,
    explanation:
      "A mapped interface over the event map keys provides strongly typed on/emit pairs.",
  },
  {
    id: 383,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following utility: type Shift<T extends readonly any[]> = T extends readonly [any, ...infer Rest] ? Rest : []?",
    options: [
      "Returns a tuple without the first element",
      "Returns a tuple without the last element",
      "Returns never",
      "Produces a compile error",
    ],
    correctAnswer: 0,
    explanation:
      "Conditional inference captures all elements except the first one.",
  },
  {
    id: 384,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these is the correct way to type a conditional return type based on a flag?",
    options: [
      "function f<T extends boolean>(flag: T): T extends true ? string : number",
      "function f(flag: boolean): any",
      "const f = (flag: boolean) => flag ? 's' : 1",
      "type f = (flag: boolean) => string | number",
    ],
    correctAnswer: 0,
    explanation:
      "Conditional types in function signatures allow return types that depend on the input flag.",
  },
  {
    id: 385,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following utility: type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false?",
    options: [
      "A lawful equality test for types",
      "Always returns true",
      "Always returns false",
      "Produces a compile error",
    ],
    correctAnswer: 0,
    explanation:
      "The double-lambda trick leverages variance to detect true type equality, not structural compatibility.",
  },
  {
    id: 386,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these is the correct way to type a deeply readonly tuple?",
    options: [
      "type DeepReadonly<T> = T extends readonly [infer H, ...infer Rest] ? readonly [DeepReadonly<H>, ...DeepReadonly<Rest>] : T",
      "type DeepReadonly<T> = Readonly<T>",
      "type DeepReadonly<T> = T",
      "type DeepReadonly<T> = never",
    ],
    correctAnswer: 0,
    explanation:
      "Conditional inference recursively applies readonly to each element of the tuple.",
  },
  {
    id: 387,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following utility: type UnionToTuple<T, L = Last<T>, Rest = Exclude<T, L>> = [T] extends [never] ? [] : [...UnionToTuple<Rest>, L]?",
    options: [
      "Converts a union to a tuple (order not guaranteed)",
      "Converts a tuple to a union",
      "Returns never",
      "Produces a compile error",
    ],
    correctAnswer: 0,
    explanation:
      "Recursive extraction of the last union member builds a tuple; order depends on internal union representation.",
  },
  {
    id: 388,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these is the correct way to type a pipeable operator with inference preservation?",
    options: [
      "type Operator<A, B> = <C>(source: Observable<A>) => Observable<B>",
      "type Operator<A, B> = (source: Observable<A>) => Observable<B>",
      "type Operator = Function",
      "type Operator<A, B> = Observable<B>",
    ],
    correctAnswer: 1,
    explanation:
      "A simple function signature preserves inference without extra generic indirection.",
  },
  {
    id: 389,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following utility: type Cartesian<T extends readonly any[][]> = T extends readonly [infer H extends readonly any[], ...infer Rest extends readonly any[][]] ? FlatMap<H, Cartesian<Rest>> : [[]]?",
    options: [
      "Computes the Cartesian product of a tuple of arrays",
      "Flattens a single array",
      "Returns never",
      "Produces a compile error",
    ],
    correctAnswer: 0,
    explanation:
      "Recursive FlatMap builds all combinations of elements from each array in the tuple.",
  },
  {
    id: 390,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these is the correct way to type a mutable ref in React?",
    options: [
      "const ref = useRef<T>(null!); ref.current = …",
      "const ref = useRef<T | null>(null)",
      "const ref = { current: null as T | null }",
      "All of the above",
    ],
    correctAnswer: 3,
    explanation:
      "All patterns are valid; the first uses the definite assignment assertion to avoid null checks.",
  },
  {
    id: 391,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following utility: type Drop<T extends readonly any[], N extends number, I extends any[] = []> = I['length'] extends N ? T : T extends readonly [any, ...infer Rest] ? Drop<Rest, N, [...I, 0]> : []?",
    options: [
      "Drops the first N elements from a tuple",
      "Takes the first N elements",
      "Returns never",
      "Produces a compile error",
    ],
    correctAnswer: 0,
    explanation:
      "Recursive tail-call with a counter tuple I stops when the desired count N is reached.",
  },
  {
    id: 392,
    category: "Typescript",
    difficulty: "hard",
    question: "Which of these is the correct way to type a saga yield effect?",
    options: [
      "type Effect = CallEffect | PutEffect | SelectEffect | …",
      "type Effect = any",
      "type Effect = Generator",
      "type Effect = Promise",
    ],
    correctAnswer: 0,
    explanation:
      "Redux-Saga exports specific effect types that can be unioned for exhaustive matching.",
  },
  {
    id: 393,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following utility: type Repeat<T, N extends number, R extends any[] = []> = R['length'] extends N ? R : Repeat<T, N, [...R, T]>?",
    options: [
      "Builds a tuple containing T repeated N times",
      "Returns never",
      "Returns T",
      "Produces a compile error",
    ],
    correctAnswer: 0,
    explanation:
      "Recursive tail-call with a counter tuple R accumulates T until the desired length N is reached.",
  },
  {
    id: 394,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these is the correct way to type a proxy trap that intercepts property assignment?",
    options: [
      "set(target, property, value, receiver): boolean",
      "set(target, property, value): void",
      "set(target, property): boolean",
      "set(target): void",
    ],
    correctAnswer: 0,
    explanation:
      "The set trap must return a boolean indicating success and receives the target, property, value, and receiver.",
  },
  {
    id: 395,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following utility: type Bipartition<T, U> = T extends U ? [T, never] : [never, T]?",
    options: [
      "Splits a union into two tuples based on whether each member extends U",
      "Returns never",
      "Returns T",
      "Produces a compile error",
    ],
    correctAnswer: 0,
    explanation:
      "Distributive conditional mapping produces a pair of tuples: left contains members that extend U, right contains those that do not.",
  },
  {
    id: 396,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these is the correct way to type a fetch retry wrapper with exponential backoff?",
    options: [
      "async function retry<T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T>",
      "function retry<T>(fn: () => T): T",
      "const retry = async (fn) => fn()",
      "type Retry = <T>(fn: Promise<T>) => T",
    ],
    correctAnswer: 0,
    explanation:
      "A generic async wrapper preserves the return type while adding retry logic with configurable count and delay.",
  },
  {
    id: 397,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following utility: type Zip<T extends readonly any[], U extends readonly any[]> = T extends readonly [infer HT, ...infer TT], U extends readonly [infer HU, ...infer TU] ? [[HT, HU], ...Zip<TT, TU>] : []?",
    options: [
      "Zips two tuples into a tuple of pairs",
      "Unzips a tuple",
      "Returns never",
      "Produces a compile error",
    ],
    correctAnswer: 0,
    explanation:
      "Recursive conditional inference pairs elements at each index and continues with the remaining tails.",
  },
  {
    id: 398,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these is the correct way to type a mutable version of ReadonlyArray?",
    options: [
      "type MutableArray<T> = T extends readonly (infer U)[] ? U[] : T",
      "type MutableArray<T> = T",
      "type MutableArray<T> = ReadonlyArray<T>",
      "type MutableArray<T> = never",
    ],
    correctAnswer: 0,
    explanation:
      "Conditional inference strips the readonly modifier from the array element type and reconstructs a mutable array.",
  },
  {
    id: 399,
    category: "Typescript",
    difficulty: "hard",
    question:
      "What is the type of the following utility: type Range<N extends number, R extends any[] = []> = R['length'] extends N ? R : Range<N, [...R, R['length']]>?",
    options: [
      "Builds a tuple of numeric literals 0 … N-1",
      "Returns never",
      "Returns number[]",
      "Produces a compile error",
    ],
    correctAnswer: 0,
    explanation:
      "Recursive tail-call accumulates the current length until the desired count N is reached, producing a tuple of indices.",
  },
  {
    id: 400,
    category: "Typescript",
    difficulty: "hard",
    question:
      "Which of these is the correct way to type a fully type-safe event bus with strict emit/on pairs?",
    options: [
      "interface EventBus<E extends Record<string, any[]>> { on<K extends keyof E>(event: K, listener: (...args: E[K]) => void): void; emit<K extends keyof E>(event: K, ...args: E[K]): void; }",
      "interface EventBus { on(event: string, listener: Function): void; emit(event: string, ...args: any[]): void; }",
      "type EventBus = Map<string, Function>",
      "type EventBus<E> = E",
    ],
    correctAnswer: 0,
    explanation:
      "A generic event map enforces that the arguments to emit match the signature registered with on for each event name.",
  },
];

// 400 questions
export const sqlMCQs = [
  {
    id: 1,
    category: "SQL",
    difficulty: "easy",
    question: "Which SQL statement is used to retrieve data from a database?",
    options: ["GET", "SELECT", "RETRIEVE", "FETCH"],
    correctAnswer: 1,
    explanation:
      "SELECT is the SQL statement used to query and retrieve data from one or more tables in a database.",
  },
  {
    id: 2,
    category: "SQL",
    difficulty: "easy",
    question: "What does the GROUP BY clause do in SQL?",
    options: [
      "Sorts the results",
      "Filters the results",
      "Groups rows with the same values",
      "Joins multiple tables",
    ],
    correctAnswer: 2,
    explanation:
      "GROUP BY groups rows that have the same values in specified columns into summary rows, often used with aggregate functions.",
  },
  {
    id: 3,
    category: "SQL",
    difficulty: "easy",
    question: "What is the difference between INNER JOIN and LEFT JOIN?",
    options: [
      "No difference, they are the same",
      "INNER JOIN returns all rows, LEFT JOIN returns matching rows only",
      "INNER JOIN returns matching rows only, LEFT JOIN returns all rows from left table",
      "LEFT JOIN is faster than INNER JOIN",
    ],
    correctAnswer: 2,
    explanation:
      "INNER JOIN returns only matching rows from both tables, while LEFT JOIN returns all rows from the left table and matching rows from the right table.",
  },
  {
    id: 4,
    category: "SQL",
    difficulty: "easy",
    question: "Which clause is used to filter rows in SQL?",
    options: ["FILTER", "WHERE", "HAVING", "CONDITION"],
    correctAnswer: 1,
    explanation:
      "WHERE clause is used to filter rows based on specified conditions before grouping or aggregation.",
  },
  {
    id: 5,
    category: "SQL",
    difficulty: "easy",
    question: "What is the purpose of the HAVING clause?",
    options: [
      "To filter rows before grouping",
      "To filter groups after GROUP BY",
      "To sort the results",
      "To join tables",
    ],
    correctAnswer: 1,
    explanation:
      "HAVING clause is used to filter groups created by GROUP BY, typically used with aggregate functions.",
  },
  {
    id: 6,
    category: "SQL",
    difficulty: "easy",
    question: "Which SQL command is used to add new rows to a table?",
    options: ["ADD", "INSERT", "CREATE", "APPEND"],
    correctAnswer: 1,
    explanation: "INSERT command is used to add new rows of data to a table.",
  },
  {
    id: 7,
    category: "SQL",
    difficulty: "easy",
    question: "What does SQL stand for?",
    options: [
      "Structured Query Language",
      "Standard Query Language",
      "Simple Query Language",
      "System Query Language",
    ],
    correctAnswer: 0,
    explanation:
      "SQL stands for Structured Query Language, used for managing and querying relational databases.",
  },
  {
    id: 8,
    category: "SQL",
    difficulty: "easy",
    question: "Which command is used to delete rows from a table?",
    options: ["REMOVE", "DELETE", "DROP", "CLEAR"],
    correctAnswer: 1,
    explanation:
      "DELETE command is used to remove rows from a table based on specified conditions.",
  },
  {
    id: 9,
    category: "SQL",
    difficulty: "easy",
    question: "What is a primary key?",
    options: [
      "A key that can be null",
      "A unique identifier for each row in a table",
      "A foreign key reference",
      "An index on a table",
    ],
    correctAnswer: 1,
    explanation:
      "A primary key uniquely identifies each row in a table and cannot contain NULL values.",
  },
  {
    id: 10,
    category: "SQL",
    difficulty: "easy",
    question: "Which clause is used to sort results in SQL?",
    options: ["SORT BY", "ORDER BY", "ARRANGE BY", "SEQUENCE BY"],
    correctAnswer: 1,
    explanation:
      "ORDER BY clause is used to sort the result set in ascending or descending order.",
  },
  {
    id: 11,
    category: "SQL",
    difficulty: "easy",
    question: "What does DISTINCT keyword do?",
    options: [
      "Sorts the results",
      "Removes duplicate rows",
      "Counts the rows",
      "Groups the data",
    ],
    correctAnswer: 1,
    explanation:
      "DISTINCT keyword removes duplicate rows from the result set, returning only unique values.",
  },
  {
    id: 12,
    category: "SQL",
    difficulty: "easy",
    question: "Which aggregate function returns the number of rows?",
    options: ["SUM()", "AVG()", "COUNT()", "MAX()"],
    correctAnswer: 2,
    explanation:
      "COUNT() function returns the number of rows that match the specified criteria.",
  },
  {
    id: 13,
    category: "SQL",
    difficulty: "easy",
    question: "What is the difference between DELETE and DROP?",
    options: [
      "No difference",
      "DELETE removes rows, DROP removes table structure",
      "DROP removes rows, DELETE removes table structure",
      "Both remove the entire table",
    ],
    correctAnswer: 1,
    explanation:
      "DELETE removes rows from a table while keeping the table structure, DROP removes the entire table including its structure.",
  },
  {
    id: 14,
    category: "SQL",
    difficulty: "easy",
    question: "Which operator is used for pattern matching in SQL?",
    options: ["MATCH", "LIKE", "PATTERN", "SIMILAR"],
    correctAnswer: 1,
    explanation:
      "LIKE operator is used for pattern matching with wildcards (% and _) in WHERE clauses.",
  },
  {
    id: 15,
    category: "SQL",
    difficulty: "easy",
    question: "What does the UPDATE command do?",
    options: [
      "Adds new rows",
      "Removes rows",
      "Modifies existing rows",
      "Creates a new table",
    ],
    correctAnswer: 2,
    explanation:
      "UPDATE command is used to modify existing rows in a table based on specified conditions.",
  },
  {
    id: 16,
    category: "SQL",
    difficulty: "easy",
    question: "What is a foreign key?",
    options: [
      "A unique identifier",
      "A reference to primary key of another table",
      "An index",
      "A constraint",
    ],
    correctAnswer: 1,
    explanation:
      "A foreign key is a field that references the primary key of another table, establishing a relationship between tables.",
  },
  {
    id: 17,
    category: "SQL",
    difficulty: "easy",
    question: "Which SQL command creates a new table?",
    options: ["MAKE TABLE", "CREATE TABLE", "NEW TABLE", "BUILD TABLE"],
    correctAnswer: 1,
    explanation:
      "CREATE TABLE command is used to create a new table with specified columns and data types.",
  },
  {
    id: 18,
    category: "SQL",
    difficulty: "easy",
    question: "What does NULL represent in SQL?",
    options: [
      "Zero value",
      "Empty string",
      "Unknown or missing value",
      "False value",
    ],
    correctAnswer: 2,
    explanation:
      "NULL represents an unknown, missing, or undefined value in SQL, different from zero or empty string.",
  },
  {
    id: 19,
    category: "SQL",
    difficulty: "easy",
    question: "Which function returns the current date and time?",
    options: ["CURRENT_DATE()", "NOW()", "TODAY()", "GETDATE()"],
    correctAnswer: 1,
    explanation:
      "NOW() function returns the current date and time (though specific function names may vary by database system).",
  },
  {
    id: 20,
    category: "SQL",
    difficulty: "easy",
    question: "What is an index in SQL?",
    options: [
      "A table column",
      "A data structure to speed up queries",
      "A constraint",
      "A join condition",
    ],
    correctAnswer: 1,
    explanation:
      "An index is a data structure that improves query performance by providing faster access paths to table data.",
  },
  {
    id: 21,
    category: "SQL",
    difficulty: "easy",
    question: "Which keyword is used to remove duplicates?",
    options: ["UNIQUE", "DISTINCT", "DIFFERENT", "SINGLE"],
    correctAnswer: 1,
    explanation: "DISTINCT keyword removes duplicate rows from query results.",
  },
  {
    id: 22,
    category: "SQL",
    difficulty: "easy",
    question: "What does ALTER TABLE command do?",
    options: [
      "Creates a new table",
      "Deletes a table",
      "Modifies table structure",
      "Renames a table",
    ],
    correctAnswer: 2,
    explanation:
      "ALTER TABLE command is used to modify the structure of an existing table (add, drop, or modify columns).",
  },
  {
    id: 23,
    category: "SQL",
    difficulty: "easy",
    question: "Which operator checks for NULL values?",
    options: ["= NULL", "IS NULL", "== NULL", "NULL()"],
    correctAnswer: 1,
    explanation:
      "IS NULL operator is used to check for NULL values, as = NULL doesn't work properly.",
  },
  {
    id: 24,
    category: "SQL",
    difficulty: "easy",
    question: "What is the default sort order for ORDER BY?",
    options: ["Descending", "Ascending", "Random", "No default"],
    correctAnswer: 1,
    explanation:
      "ORDER BY sorts in ascending order by default. Use DESC keyword for descending order.",
  },
  {
    id: 25,
    category: "SQL",
    difficulty: "easy",
    question: "Which SQL statement is used to grant permissions?",
    options: ["ALLOW", "PERMIT", "GRANT", "AUTHORIZE"],
    correctAnswer: 2,
    explanation:
      "GRANT statement is used to give specific permissions to users or roles in SQL.",
  },
  {
    id: 26,
    category: "SQL",
    difficulty: "easy",
    question: "What does TRUNCATE command do?",
    options: [
      "Deletes specific rows",
      "Removes all rows from table",
      "Drops the table",
      "Modifies table structure",
    ],
    correctAnswer: 1,
    explanation:
      "TRUNCATE removes all rows from a table quickly, but keeps the table structure intact.",
  },
  {
    id: 27,
    category: "SQL",
    difficulty: "easy",
    question: "Which join returns all rows from both tables?",
    options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
    correctAnswer: 3,
    explanation:
      "FULL OUTER JOIN returns all rows from both tables, with NULL values where there's no match.",
  },
  {
    id: 28,
    category: "SQL",
    difficulty: "easy",
    question: "What is a view in SQL?",
    options: [
      "A physical table",
      "A virtual table based on query results",
      "An index",
      "A stored procedure",
    ],
    correctAnswer: 1,
    explanation:
      "A view is a virtual table created from a SQL query that can be used like a regular table.",
  },
  {
    id: 29,
    category: "SQL",
    difficulty: "easy",
    question: "Which wildcard represents any single character?",
    options: ["%", "_", "*", "?"],
    correctAnswer: 1,
    explanation:
      "The underscore (_) wildcard represents exactly one character in pattern matching with LIKE.",
  },
  {
    id: 30,
    category: "SQL",
    difficulty: "easy",
    question: "What does the LIMIT clause do?",
    options: [
      "Limits column width",
      "Restricts number of returned rows",
      "Sets maximum value",
      "Limits join conditions",
    ],
    correctAnswer: 1,
    explanation:
      "LIMIT clause restricts the number of rows returned by a query.",
  },
  {
    id: 31,
    category: "SQL",
    difficulty: "easy",
    question: "Which function calculates the average value?",
    options: ["MEAN()", "AVERAGE()", "AVG()", "CALC_AVG()"],
    correctAnswer: 2,
    explanation:
      "AVG() function calculates the average (arithmetic mean) of numeric values.",
  },
  {
    id: 32,
    category: "SQL",
    difficulty: "easy",
    question: "What is the purpose of COMMIT statement?",
    options: [
      "Starts a transaction",
      "Ends a transaction and saves changes",
      "Cancels a transaction",
      "Creates a savepoint",
    ],
    correctAnswer: 1,
    explanation:
      "COMMIT statement permanently saves all changes made in the current transaction.",
  },
  {
    id: 33,
    category: "SQL",
    difficulty: "easy",
    question: "Which command is used to undo changes in a transaction?",
    options: ["UNDO", "ROLLBACK", "CANCEL", "REVERT"],
    correctAnswer: 1,
    explanation:
      "ROLLBACK command undoes all changes made in the current transaction.",
  },
  {
    id: 34,
    category: "SQL",
    difficulty: "easy",
    question: "What does UNION do in SQL?",
    options: [
      "Joins tables horizontally",
      "Combines results from multiple queries",
      "Creates a new table",
      "Merges columns",
    ],
    correctAnswer: 1,
    explanation:
      "UNION combines the result sets of two or more SELECT statements, removing duplicates.",
  },
  {
    id: 35,
    category: "SQL",
    difficulty: "easy",
    question: "Which constraint ensures unique values?",
    options: ["PRIMARY KEY", "UNIQUE", "CHECK", "NOT NULL"],
    correctAnswer: 1,
    explanation:
      "UNIQUE constraint ensures that all values in a column or combination of columns are unique.",
  },
  {
    id: 36,
    category: "SQL",
    difficulty: "easy",
    question: "What is the difference between UNION and UNION ALL?",
    options: [
      "No difference",
      "UNION removes duplicates, UNION ALL keeps all rows",
      "UNION ALL removes duplicates, UNION keeps all rows",
      "UNION is faster than UNION ALL",
    ],
    correctAnswer: 1,
    explanation:
      "UNION removes duplicate rows, while UNION ALL includes all rows including duplicates.",
  },
  {
    id: 37,
    category: "SQL",
    difficulty: "easy",
    question: "Which function returns the maximum value?",
    options: ["MAXIMUM()", "MAX()", "TOP()", "HIGHEST()"],
    correctAnswer: 1,
    explanation:
      "MAX() function returns the largest value from a set of values.",
  },
  {
    id: 38,
    category: "SQL",
    difficulty: "easy",
    question: "What does the IN operator do?",
    options: [
      "Checks if value is within a range",
      "Checks if value exists in a list",
      "Performs pattern matching",
      "Checks for NULL values",
    ],
    correctAnswer: 1,
    explanation:
      "IN operator checks if a value matches any value in a list or subquery.",
  },
  {
    id: 39,
    category: "SQL",
    difficulty: "easy",
    question: "Which statement creates a database?",
    options: [
      "NEW DATABASE",
      "CREATE DATABASE",
      "MAKE DATABASE",
      "BUILD DATABASE",
    ],
    correctAnswer: 1,
    explanation: "CREATE DATABASE statement is used to create a new database.",
  },
  {
    id: 40,
    category: "SQL",
    difficulty: "easy",
    question: "What is a stored procedure?",
    options: [
      "A saved query",
      "A precompiled set of SQL statements",
      "A table backup",
      "A database index",
    ],
    correctAnswer: 1,
    explanation:
      "A stored procedure is a precompiled collection of SQL statements that can be executed as a unit.",
  },
  {
    id: 41,
    category: "SQL",
    difficulty: "easy",
    question: "Which operator is used for logical AND?",
    options: ["&&", "AND", "&", "BOTH"],
    correctAnswer: 1,
    explanation:
      "AND operator is used for logical AND operations in SQL WHERE clauses.",
  },
  {
    id: 42,
    category: "SQL",
    difficulty: "easy",
    question: "What does the BETWEEN operator check for?",
    options: [
      "Exact match",
      "Values within a range",
      "Pattern matching",
      "NULL values",
    ],
    correctAnswer: 1,
    explanation:
      "BETWEEN operator checks if a value falls within a specified range (inclusive).",
  },
  {
    id: 43,
    category: "SQL",
    difficulty: "easy",
    question: "Which function converts text to uppercase?",
    options: ["UPPER()", "UCASE()", "UPPERCASE()", "CAPS()"],
    correctAnswer: 0,
    explanation:
      "UPPER() function converts all characters in a string to uppercase.",
  },
  {
    id: 44,
    category: "SQL",
    difficulty: "easy",
    question: "What is the purpose of the EXISTS operator?",
    options: [
      "Checks if a table exists",
      "Checks if a subquery returns any rows",
      "Checks if a column exists",
      "Checks if a value is not NULL",
    ],
    correctAnswer: 1,
    explanation:
      "EXISTS operator checks if a subquery returns at least one row.",
  },
  {
    id: 45,
    category: "SQL",
    difficulty: "easy",
    question: "Which command removes a database?",
    options: [
      "DELETE DATABASE",
      "REMOVE DATABASE",
      "DROP DATABASE",
      "DESTROY DATABASE",
    ],
    correctAnswer: 2,
    explanation:
      "DROP DATABASE command permanently removes a database and all its contents.",
  },
  {
    id: 46,
    category: "SQL",
    difficulty: "easy",
    question: "What does the COALESCE function do?",
    options: [
      "Combines strings",
      "Returns the first non-NULL value",
      "Counts NULL values",
      "Replaces NULL with zero",
    ],
    correctAnswer: 1,
    explanation:
      "COALESCE function returns the first non-NULL value from a list of expressions.",
  },
  {
    id: 47,
    category: "SQL",
    difficulty: "easy",
    question: "Which constraint prevents NULL values?",
    options: ["PRIMARY KEY", "UNIQUE", "NOT NULL", "CHECK"],
    correctAnswer: 2,
    explanation:
      "NOT NULL constraint ensures that a column cannot have NULL values.",
  },
  {
    id: 48,
    category: "SQL",
    difficulty: "easy",
    question: "What is the purpose of GROUP BY?",
    options: [
      "To sort data",
      "To group rows for aggregate functions",
      "To join tables",
      "To filter data",
    ],
    correctAnswer: 1,
    explanation:
      "GROUP BY groups rows with the same values so aggregate functions can be applied to each group.",
  },
  {
    id: 49,
    category: "SQL",
    difficulty: "easy",
    question: "Which function returns the length of a string?",
    options: ["SIZE()", "LENGTH()", "COUNT()", "LEN()"],
    correctAnswer: 1,
    explanation:
      "LENGTH() function returns the number of characters in a string.",
  },
  {
    id: 50,
    category: "SQL",
    difficulty: "easy",
    question: "What does CASE statement do?",
    options: [
      "Creates conditional logic",
      "Converts data types",
      "Handles errors",
      "Creates loops",
    ],
    correctAnswer: 0,
    explanation:
      "CASE statement provides conditional logic similar to if-else statements in programming languages.",
  },
  {
    id: 51,
    category: "SQL",
    difficulty: "easy",
    question: "Which operator is used for logical OR?",
    options: ["||", "OR", "|", "EITHER"],
    correctAnswer: 1,
    explanation:
      "OR operator is used for logical OR operations in SQL WHERE clauses.",
  },
  {
    id: 52,
    category: "SQL",
    difficulty: "easy",
    question: "What is a trigger in SQL?",
    options: [
      "A query scheduler",
      "A special stored procedure that runs automatically",
      "A data validation rule",
      "A backup mechanism",
    ],
    correctAnswer: 1,
    explanation:
      "A trigger is a special stored procedure that automatically executes in response to certain database events.",
  },
  {
    id: 53,
    category: "SQL",
    difficulty: "easy",
    question: "Which function rounds numbers to specified decimal places?",
    options: ["CEILING()", "FLOOR()", "ROUND()", "TRUNC()"],
    correctAnswer: 2,
    explanation:
      "ROUND() function rounds a number to a specified number of decimal places.",
  },
  {
    id: 54,
    category: "SQL",
    difficulty: "easy",
    question: "What does the CONCAT function do?",
    options: [
      "Counts characters",
      "Combines strings together",
      "Compares strings",
      "Converts strings",
    ],
    correctAnswer: 1,
    explanation:
      "CONCAT() function combines two or more strings into a single string.",
  },
  {
    id: 55,
    category: "SQL",
    difficulty: "easy",
    question: "Which clause specifies the table to query?",
    options: ["SELECT", "FROM", "WHERE", "INTO"],
    correctAnswer: 1,
    explanation:
      "FROM clause specifies the table(s) from which to retrieve data.",
  },
  {
    id: 56,
    category: "SQL",
    difficulty: "easy",
    question: "What is normalization in databases?",
    options: [
      "Data encryption",
      "Organizing data to reduce redundancy",
      "Data compression",
      "Performance optimization",
    ],
    correctAnswer: 1,
    explanation:
      "Normalization is the process of organizing data to minimize redundancy and dependency.",
  },
  {
    id: 57,
    category: "SQL",
    difficulty: "easy",
    question: "Which function extracts part of a string?",
    options: ["EXTRACT()", "SUBSTRING()", "PART()", "CUT()"],
    correctAnswer: 1,
    explanation:
      "SUBSTRING() function extracts a portion of a string starting from a specified position.",
  },
  {
    id: 58,
    category: "SQL",
    difficulty: "easy",
    question: "What does the DEFAULT constraint do?",
    options: [
      "Prevents NULL values",
      "Ensures unique values",
      "Provides a default value for columns",
      "Creates indexes",
    ],
    correctAnswer: 2,
    explanation:
      "DEFAULT constraint provides a default value for a column when no value is specified.",
  },
  {
    id: 59,
    category: "SQL",
    difficulty: "easy",
    question: "Which statement is used to change data in a table?",
    options: ["MODIFY", "ALTER", "UPDATE", "CHANGE"],
    correctAnswer: 2,
    explanation:
      "UPDATE statement is used to modify existing data in table rows.",
  },
  {
    id: 60,
    category: "SQL",
    difficulty: "easy",
    question: "What is the difference between CHAR and VARCHAR?",
    options: [
      "No difference",
      "CHAR is fixed length, VARCHAR is variable length",
      "VARCHAR is fixed length, CHAR is variable length",
      "CHAR stores numbers, VARCHAR stores text",
    ],
    correctAnswer: 1,
    explanation:
      "CHAR has fixed length and pads with spaces, VARCHAR has variable length up to a maximum.",
  },
  {
    id: 61,
    category: "SQL",
    difficulty: "easy",
    question: "Which function returns the minimum value?",
    options: ["MINIMUM()", "MIN()", "LOWEST()", "SMALLEST()"],
    correctAnswer: 1,
    explanation:
      "MIN() function returns the smallest value from a set of values.",
  },
  {
    id: 62,
    category: "SQL",
    difficulty: "easy",
    question: "What does the NOT operator do?",
    options: [
      "Negates a condition",
      "Checks for NULL",
      "Performs addition",
      "Sorts data",
    ],
    correctAnswer: 0,
    explanation:
      "NOT operator negates a logical condition, reversing its truth value.",
  },
  {
    id: 63,
    category: "SQL",
    difficulty: "easy",
    question: "Which data type stores date and time?",
    options: ["DATE", "TIME", "DATETIME", "All of the above"],
    correctAnswer: 3,
    explanation:
      "DATE stores dates, TIME stores time, and DATETIME stores both date and time information.",
  },
  {
    id: 64,
    category: "SQL",
    difficulty: "easy",
    question: "What is a composite key?",
    options: [
      "A key made of multiple columns",
      "An encrypted key",
      "A foreign key reference",
      "An auto-increment key",
    ],
    correctAnswer: 0,
    explanation:
      "A composite key is a primary key consisting of two or more columns combined.",
  },
  {
    id: 65,
    category: "SQL",
    difficulty: "easy",
    question: "Which command shows table structure?",
    options: ["SHOW", "DESCRIBE", "INFO", "STRUCTURE"],
    correctAnswer: 1,
    explanation:
      "DESCRIBE (or DESC) command displays the structure and column information of a table.",
  },
  {
    id: 66,
    category: "SQL",
    difficulty: "easy",
    question: "What does the SUM function do?",
    options: [
      "Counts rows",
      "Calculates total of numeric values",
      "Finds maximum value",
      "Calculates average",
    ],
    correctAnswer: 1,
    explanation:
      "SUM() function calculates the total sum of numeric values in a column.",
  },
  {
    id: 67,
    category: "SQL",
    difficulty: "easy",
    question: "Which operator checks for inequality?",
    options: ["!=", "<>", "NOT =", "All of the above"],
    correctAnswer: 3,
    explanation:
      "All these operators (!=, <>, NOT =) can be used to check for inequality, though != and <> are most common.",
  },
  {
    id: 68,
    category: "SQL",
    difficulty: "easy",
    question: "What is the purpose of AUTO_INCREMENT?",
    options: [
      "Automatically increases column values",
      "Auto-updates timestamps",
      "Automatically creates indexes",
      "Auto-commits transactions",
    ],
    correctAnswer: 0,
    explanation:
      "AUTO_INCREMENT automatically generates unique sequential values for new rows, typically used for primary keys.",
  },
  {
    id: 69,
    category: "SQL",
    difficulty: "easy",
    question: "Which clause is used with aggregate functions?",
    options: ["WHERE", "HAVING", "GROUP BY", "Both B and C"],
    correctAnswer: 3,
    explanation:
      "Both HAVING and GROUP BY are used with aggregate functions - GROUP BY groups data and HAVING filters groups.",
  },
  {
    id: 70,
    category: "SQL",
    difficulty: "easy",
    question: "What does the REPLACE function do?",
    options: [
      "Replaces entire rows",
      "Replaces specified characters in strings",
      "Replaces NULL values",
      "Replaces table data",
    ],
    correctAnswer: 1,
    explanation:
      "REPLACE() function substitutes specified characters or substrings within a string.",
  },
  {
    id: 71,
    category: "SQL",
    difficulty: "easy",
    question: "Which join includes unmatched rows from the right table?",
    options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "CROSS JOIN"],
    correctAnswer: 2,
    explanation:
      "RIGHT JOIN returns all rows from the right table and matching rows from the left table.",
  },
  {
    id: 72,
    category: "SQL",
    difficulty: "easy",
    question: "What is a subquery?",
    options: [
      "A query within another query",
      "A backup query",
      "A scheduled query",
      "A temporary query",
    ],
    correctAnswer: 0,
    explanation: "A subquery is a query nested inside another SQL statement.",
  },
  {
    id: 73,
    category: "SQL",
    difficulty: "easy",
    question: "Which function converts strings to lowercase?",
    options: ["LOWER()", "LCASE()", "LOWERCASE()", "DOWN()"],
    correctAnswer: 0,
    explanation:
      "LOWER() function converts all characters in a string to lowercase.",
  },
  {
    id: 74,
    category: "SQL",
    difficulty: "easy",
    question: "What does CROSS JOIN produce?",
    options: [
      "Only matching rows",
      "Cartesian product of tables",
      "Left table rows only",
      "Right table rows only",
    ],
    correctAnswer: 1,
    explanation:
      "CROSS JOIN produces a Cartesian product, combining every row from the first table with every row from the second table.",
  },
  {
    id: 75,
    category: "SQL",
    difficulty: "easy",
    question: "Which constraint references another table's primary key?",
    options: ["PRIMARY KEY", "UNIQUE", "FOREIGN KEY", "CHECK"],
    correctAnswer: 2,
    explanation:
      "FOREIGN KEY constraint creates a link between tables by referencing the primary key of another table.",
  },
  {
    id: 76,
    category: "SQL",
    difficulty: "easy",
    question: "What is the purpose of the AS keyword?",
    options: [
      "Creates aliases",
      "Assigns values",
      "Sorts data",
      "Joins tables",
    ],
    correctAnswer: 0,
    explanation:
      "AS keyword creates aliases for tables or columns to provide alternative names in queries.",
  },
  {
    id: 77,
    category: "SQL",
    difficulty: "easy",
    question: "Which function removes leading and trailing spaces?",
    options: ["STRIP()", "TRIM()", "CLEAN()", "REMOVE()"],
    correctAnswer: 1,
    explanation:
      "TRIM() function removes leading and trailing whitespace from strings.",
  },
  {
    id: 78,
    category: "SQL",
    difficulty: "easy",
    question: "What does the IFNULL function do?",
    options: [
      "Checks for NULL values",
      "Returns alternative value if NULL",
      "Counts NULL values",
      "Removes NULL values",
    ],
    correctAnswer: 1,
    explanation:
      "IFNULL() function returns a specified value if the original value is NULL.",
  },
  {
    id: 79,
    category: "SQL",
    difficulty: "easy",
    question: "Which statement creates an index?",
    options: ["MAKE INDEX", "CREATE INDEX", "BUILD INDEX", "NEW INDEX"],
    correctAnswer: 1,
    explanation:
      "CREATE INDEX statement creates an index on specified columns to improve query performance.",
  },
  {
    id: 80,
    category: "SQL",
    difficulty: "easy",
    question: "What is the difference between WHERE and HAVING?",
    options: [
      "No difference",
      "WHERE filters rows, HAVING filters groups",
      "HAVING filters rows, WHERE filters groups",
      "WHERE is faster than HAVING",
    ],
    correctAnswer: 1,
    explanation:
      "WHERE filters individual rows before grouping, HAVING filters groups after GROUP BY.",
  },
  {
    id: 81,
    category: "SQL",
    difficulty: "easy",
    question: "Which operator is used for partial string matching?",
    options: ["MATCH", "LIKE", "CONTAINS", "FIND"],
    correctAnswer: 1,
    explanation:
      "LIKE operator with wildcards (% and _) is used for partial string matching.",
  },
  {
    id: 82,
    category: "SQL",
    difficulty: "easy",
    question: "What does the FLOOR function do?",
    options: [
      "Rounds up to nearest integer",
      "Rounds down to nearest integer",
      "Rounds to nearest integer",
      "Removes decimal places",
    ],
    correctAnswer: 1,
    explanation:
      "FLOOR() function rounds a number down to the nearest integer.",
  },
  {
    id: 83,
    category: "SQL",
    difficulty: "easy",
    question: "Which command shows all databases?",
    options: [
      "LIST DATABASES",
      "SHOW DATABASES",
      "GET DATABASES",
      "VIEW DATABASES",
    ],
    correctAnswer: 1,
    explanation:
      "SHOW DATABASES command displays all available databases in the system.",
  },
  {
    id: 84,
    category: "SQL",
    difficulty: "easy",
    question: "What is a clustered index?",
    options: [
      "An index that groups similar values",
      "An index that determines physical storage order",
      "An index on multiple columns",
      "A temporary index",
    ],
    correctAnswer: 1,
    explanation:
      "A clustered index determines the physical storage order of data in the table.",
  },
  {
    id: 85,
    category: "SQL",
    difficulty: "easy",
    question: "Which function gets current date without time?",
    options: ["CURDATE()", "TODAY()", "CURRENT_DATE", "DATEONLY()"],
    correctAnswer: 0,
    explanation:
      "CURDATE() or CURRENT_DATE functions return the current date without time information.",
  },
  {
    id: 86,
    category: "SQL",
    difficulty: "easy",
    question: "What does CEILING function do?",
    options: [
      "Rounds down to nearest integer",
      "Rounds up to nearest integer",
      "Rounds to nearest integer",
      "Sets maximum value",
    ],
    correctAnswer: 1,
    explanation:
      "CEILING() function rounds a number up to the nearest integer.",
  },
  {
    id: 87,
    category: "SQL",
    difficulty: "easy",
    question: "Which clause limits the number of rows returned?",
    options: ["LIMIT", "TOP", "ROWNUM", "All of the above"],
    correctAnswer: 3,
    explanation:
      "LIMIT (MySQL), TOP (SQL Server), and ROWNUM (Oracle) all limit the number of rows returned.",
  },
  {
    id: 88,
    category: "SQL",
    difficulty: "easy",
    question: "What is denormalization?",
    options: [
      "Removing data redundancy",
      "Adding redundancy for performance",
      "Data corruption",
      "Data encryption",
    ],
    correctAnswer: 1,
    explanation:
      "Denormalization intentionally adds redundancy to improve query performance.",
  },
  {
    id: 89,
    category: "SQL",
    difficulty: "easy",
    question: "Which function extracts year from date?",
    options: ["GETYEAR()", "YEAR()", "EXTRACT_YEAR()", "DATE_YEAR()"],
    correctAnswer: 1,
    explanation: "YEAR() function extracts the year portion from a date value.",
  },
  {
    id: 90,
    category: "SQL",
    difficulty: "easy",
    question: "What does the DISTINCT keyword prevent?",
    options: [
      "NULL values",
      "Duplicate rows",
      "Empty results",
      "Sorting errors",
    ],
    correctAnswer: 1,
    explanation:
      "DISTINCT prevents duplicate rows from appearing in query results.",
  },
  {
    id: 91,
    category: "SQL",
    difficulty: "easy",
    question: "Which constraint validates data before insertion?",
    options: ["PRIMARY KEY", "FOREIGN KEY", "CHECK", "UNIQUE"],
    correctAnswer: 2,
    explanation:
      "CHECK constraint validates data against specified conditions before allowing insertion or updates.",
  },
  {
    id: 92,
    category: "SQL",
    difficulty: "easy",
    question: "What does the MOD function return?",
    options: [
      "Maximum value",
      "Remainder of division",
      "Modified value",
      "Absolute value",
    ],
    correctAnswer: 1,
    explanation:
      "MOD() function returns the remainder of a division operation.",
  },
  {
    id: 93,
    category: "SQL",
    difficulty: "easy",
    question: "Which statement removes an index?",
    options: ["DELETE INDEX", "REMOVE INDEX", "DROP INDEX", "DESTROY INDEX"],
    correctAnswer: 2,
    explanation: "DROP INDEX statement removes an existing index from a table.",
  },
  {
    id: 94,
    category: "SQL",
    difficulty: "easy",
    question: "What is the purpose of BEGIN TRANSACTION?",
    options: [
      "Starts a new session",
      "Begins a transaction block",
      "Creates a new database",
      "Initializes variables",
    ],
    correctAnswer: 1,
    explanation:
      "BEGIN TRANSACTION starts a new transaction block for grouping SQL operations.",
  },
  {
    id: 95,
    category: "SQL",
    difficulty: "easy",
    question: "Which function finds position of substring?",
    options: ["FIND()", "POSITION()", "LOCATE()", "INDEX()"],
    correctAnswer: 1,
    explanation:
      "POSITION() function returns the position of a substring within a string.",
  },
  {
    id: 96,
    category: "SQL",
    difficulty: "easy",
    question: "What does the ABS function do?",
    options: [
      "Adds numbers",
      "Returns absolute value",
      "Subtracts numbers",
      "Averages numbers",
    ],
    correctAnswer: 1,
    explanation:
      "ABS() function returns the absolute (positive) value of a number.",
  },
  {
    id: 97,
    category: "SQL",
    difficulty: "easy",
    question: "Which keyword creates a temporary table?",
    options: ["TEMP", "TEMPORARY", "CREATE TEMP TABLE", "TMP"],
    correctAnswer: 2,
    explanation:
      "CREATE TEMP TABLE or CREATE TEMPORARY TABLE creates a temporary table that exists only for the session.",
  },
  {
    id: 98,
    category: "SQL",
    difficulty: "easy",
    question: "What is the difference between CHAR and TEXT?",
    options: [
      "No difference",
      "CHAR has fixed length, TEXT has variable length",
      "TEXT is faster than CHAR",
      "CHAR stores more data than TEXT",
    ],
    correctAnswer: 1,
    explanation:
      "CHAR has a fixed length with padding, while TEXT can store variable-length strings up to a large maximum.",
  },
  {
    id: 99,
    category: "SQL",
    difficulty: "easy",
    question: "Which function converts number to string?",
    options: ["STR()", "CAST()", "CONVERT()", "All of the above"],
    correctAnswer: 3,
    explanation:
      "STR(), CAST(), and CONVERT() functions can all be used to convert numbers to strings.",
  },
  {
    id: 100,
    category: "SQL",
    difficulty: "easy",
    question: "What does the POWER function calculate?",
    options: ["Square root", "Exponentiation", "Logarithm", "Factorial"],
    correctAnswer: 1,
    explanation:
      "POWER() function calculates a number raised to a specified power (exponentiation).",
  },

  // MEDIUM QUESTIONS (101-200)
  {
    id: 101,
    category: "SQL",
    difficulty: "medium",
    question:
      "What is the difference between a correlated and non-correlated subquery?",
    options: [
      "No difference",
      "Correlated subqueries reference outer query columns",
      "Non-correlated subqueries are faster",
      "Correlated subqueries use different syntax",
    ],
    correctAnswer: 1,
    explanation:
      "A correlated subquery references columns from the outer query and is executed for each row of the outer query, while a non-correlated subquery is independent and executed once.",
  },
  {
    id: 102,
    category: "SQL",
    difficulty: "medium",
    question: "Which SQL clause can be used to create a recursive query?",
    options: ["RECURSIVE", "WITH RECURSIVE", "CTE RECURSIVE", "LOOP"],
    correctAnswer: 1,
    explanation:
      "WITH RECURSIVE clause is used to create recursive Common Table Expressions (CTEs) for hierarchical data traversal.",
  },
  {
    id: 103,
    category: "SQL",
    difficulty: "medium",
    question: "What is the purpose of EXPLAIN PLAN in SQL?",
    options: [
      "Executes a query",
      "Shows query execution plan",
      "Validates query syntax",
      "Optimizes database",
    ],
    correctAnswer: 1,
    explanation:
      "EXPLAIN PLAN shows how the database engine will execute a query, including join order, index usage, and estimated costs.",
  },
  {
    id: 104,
    category: "SQL",
    difficulty: "medium",
    question: "Which window function assigns a unique rank without gaps?",
    options: ["RANK()", "DENSE_RANK()", "ROW_NUMBER()", "NTILE()"],
    correctAnswer: 2,
    explanation:
      "ROW_NUMBER() assigns consecutive unique numbers without gaps, unlike RANK() which can have gaps after ties.",
  },
  {
    id: 105,
    category: "SQL",
    difficulty: "medium",
    question: "What is the difference between DELETE, TRUNCATE, and DROP?",
    options: [
      "They all do the same thing",
      "DELETE removes rows, TRUNCATE empties table, DROP removes table structure",
      "Only syntax is different",
      "DELETE is fastest, DROP is slowest",
    ],
    correctAnswer: 1,
    explanation:
      "DELETE removes specific rows (can be rolled back), TRUNCATE removes all rows quickly (can't be rolled back in most cases), DROP removes the entire table structure.",
  },
  {
    id: 106,
    category: "SQL",
    difficulty: "medium",
    question:
      "Which isolation level prevents dirty reads but allows phantom reads?",
    options: [
      "READ UNCOMMITTED",
      "READ COMMITTED",
      "REPEATABLE READ",
      "SERIALIZABLE",
    ],
    correctAnswer: 1,
    explanation:
      "READ COMMITTED prevents dirty reads but allows non-repeatable reads and phantom reads.",
  },
  {
    id: 107,
    category: "SQL",
    difficulty: "medium",
    question: "What does the PIVOT operation do?",
    options: [
      "Rotates table 90 degrees",
      "Converts rows to columns",
      "Combines multiple tables",
      "Sorts data differently",
    ],
    correctAnswer: 1,
    explanation:
      "PIVOT transforms rows into columns, typically used to create cross-tabulation reports from normalized data.",
  },
  {
    id: 108,
    category: "SQL",
    difficulty: "medium",
    question:
      "Which join type can cause a Cartesian product if not properly constrained?",
    options: ["INNER JOIN", "LEFT JOIN", "CROSS JOIN", "RIGHT JOIN"],
    correctAnswer: 2,
    explanation:
      "CROSS JOIN produces a Cartesian product by default, combining every row from one table with every row from another table.",
  },
  {
    id: 109,
    category: "SQL",
    difficulty: "medium",
    question: "What is the difference between RANK() and DENSE_RANK()?",
    options: [
      "No difference",
      "RANK() skips numbers after ties, DENSE_RANK() doesn't",
      "DENSE_RANK() skips numbers after ties, RANK() doesn't",
      "RANK() is faster than DENSE_RANK()",
    ],
    correctAnswer: 1,
    explanation:
      "RANK() leaves gaps in ranking after ties (1,2,2,4), while DENSE_RANK() doesn't leave gaps (1,2,2,3).",
  },
  {
    id: 110,
    category: "SQL",
    difficulty: "medium",
    question: "Which statement best describes a materialized view?",
    options: [
      "A regular view with better performance",
      "A physical copy of query results stored on disk",
      "A temporary view",
      "An indexed view",
    ],
    correctAnswer: 1,
    explanation:
      "A materialized view stores the query results physically on disk and can be refreshed periodically, unlike regular views which are virtual.",
  },
  {
    id: 111,
    category: "SQL",
    difficulty: "medium",
    question: "What is the purpose of the MERGE statement?",
    options: [
      "Combines two tables permanently",
      "Performs INSERT, UPDATE, or DELETE based on conditions",
      "Merges database schemas",
      "Combines query results",
    ],
    correctAnswer: 1,
    explanation:
      "MERGE statement performs INSERT, UPDATE, or DELETE operations in a single statement based on whether records match between source and target tables.",
  },
  {
    id: 112,
    category: "SQL",
    difficulty: "medium",
    question: "Which normal form eliminates partial dependencies?",
    options: ["1NF", "2NF", "3NF", "BCNF"],
    correctAnswer: 1,
    explanation:
      "Second Normal Form (2NF) eliminates partial dependencies where non-key attributes depend on only part of a composite primary key.",
  },
  {
    id: 113,
    category: "SQL",
    difficulty: "medium",
    question: "What does the LAG window function do?",
    options: [
      "Finds minimum value",
      "Accesses data from previous row",
      "Calculates running total",
      "Sorts data in descending order",
    ],
    correctAnswer: 1,
    explanation:
      "LAG() function accesses data from a previous row in the result set without requiring a self-join.",
  },
  {
    id: 114,
    category: "SQL",
    difficulty: "medium",
    question:
      "Which type of constraint is checked after each statement in a transaction?",
    options: ["DEFERRABLE", "IMMEDIATE", "PRIMARY KEY", "FOREIGN KEY"],
    correctAnswer: 1,
    explanation:
      "IMMEDIATE constraints are checked after each SQL statement, while DEFERRABLE constraints can be checked at transaction commit time.",
  },
  {
    id: 115,
    category: "SQL",
    difficulty: "medium",
    question:
      "What is the difference between a clustered and non-clustered index?",
    options: [
      "No significant difference",
      "Clustered determines physical storage order, non-clustered is separate structure",
      "Non-clustered is faster",
      "Clustered takes more space",
    ],
    correctAnswer: 1,
    explanation:
      "A clustered index determines the physical storage order of data rows, while a non-clustered index is a separate structure that points to data rows.",
  },
  {
    id: 116,
    category: "SQL",
    difficulty: "medium",
    question:
      "Which window function divides rows into specified number of groups?",
    options: ["RANK()", "NTILE()", "PERCENT_RANK()", "CUME_DIST()"],
    correctAnswer: 1,
    explanation:
      "NTILE() function divides the result set into a specified number of approximately equal groups.",
  },
  {
    id: 117,
    category: "SQL",
    difficulty: "medium",
    question: "What is a savepoint in SQL transactions?",
    options: [
      "A backup of the database",
      "A point within a transaction to which you can rollback",
      "A checkpoint for performance",
      "A commit point",
    ],
    correctAnswer: 1,
    explanation:
      "A savepoint creates a point within a transaction to which you can rollback without rolling back the entire transaction.",
  },
  {
    id: 118,
    category: "SQL",
    difficulty: "medium",
    question:
      "Which SQL feature allows you to assign row numbers based on ordering?",
    options: ["RANK()", "ORDER BY", "ROW_NUMBER()", "SEQUENCE"],
    correctAnswer: 2,
    explanation:
      "ROW_NUMBER() window function assigns sequential row numbers based on the specified ORDER BY clause.",
  },
  {
    id: 119,
    category: "SQL",
    difficulty: "medium",
    question: "What is the difference between UNION and INTERSECT?",
    options: [
      "UNION combines all rows, INTERSECT returns common rows only",
      "INTERSECT combines all rows, UNION returns common rows only",
      "No difference",
      "INTERSECT is faster than UNION",
    ],
    correctAnswer: 0,
    explanation:
      "UNION combines rows from multiple queries, while INTERSECT returns only rows that appear in all queries.",
  },
  {
    id: 120,
    category: "SQL",
    difficulty: "medium",
    question: "Which statement creates a sequence in SQL?",
    options: [
      "CREATE SEQUENCE",
      "NEW SEQUENCE",
      "MAKE SEQUENCE",
      "GENERATE SEQUENCE",
    ],
    correctAnswer: 0,
    explanation:
      "CREATE SEQUENCE statement creates a sequence object that generates sequential numeric values.",
  },
  {
    id: 121,
    category: "SQL",
    difficulty: "medium",
    question: "What is a deadlock in database systems?",
    options: [
      "A locked table",
      "Two transactions waiting for each other's resources",
      "A crashed database",
      "A performance bottleneck",
    ],
    correctAnswer: 1,
    explanation:
      "A deadlock occurs when two or more transactions are waiting for each other to release resources, creating a circular dependency.",
  },
  {
    id: 122,
    category: "SQL",
    difficulty: "medium",
    question: "Which window function calculates cumulative distribution?",
    options: ["RANK()", "PERCENT_RANK()", "CUME_DIST()", "NTILE()"],
    correctAnswer: 2,
    explanation:
      "CUME_DIST() calculates the cumulative distribution of a value within a group of values.",
  },
  {
    id: 123,
    category: "SQL",
    difficulty: "medium",
    question: "What does the EXCEPT operator do?",
    options: [
      "Handles exceptions",
      "Returns rows from first query not in second query",
      "Combines query results",
      "Filters specific columns",
    ],
    correctAnswer: 1,
    explanation:
      "EXCEPT returns rows from the first query that are not present in the second query (set difference).",
  },
  {
    id: 124,
    category: "SQL",
    difficulty: "medium",
    question:
      "Which isolation level provides the highest consistency but lowest concurrency?",
    options: [
      "READ UNCOMMITTED",
      "READ COMMITTED",
      "REPEATABLE READ",
      "SERIALIZABLE",
    ],
    correctAnswer: 3,
    explanation:
      "SERIALIZABLE provides the highest level of isolation and consistency but allows the lowest level of concurrency.",
  },
  {
    id: 125,
    category: "SQL",
    difficulty: "medium",
    question: "What is the purpose of the LEAD window function?",
    options: [
      "Finds the maximum value",
      "Accesses data from next row",
      "Calculates percentiles",
      "Orders data ascending",
    ],
    correctAnswer: 1,
    explanation:
      "LEAD() function accesses data from a subsequent row in the result set without requiring a self-join.",
  },
  {
    id: 126,
    category: "SQL",
    difficulty: "medium",
    question: "Which normal form eliminates transitive dependencies?",
    options: ["1NF", "2NF", "3NF", "BCNF"],
    correctAnswer: 2,
    explanation:
      "Third Normal Form (3NF) eliminates transitive dependencies where non-key attributes depend on other non-key attributes.",
  },
  {
    id: 127,
    category: "SQL",
    difficulty: "medium",
    question: "What is a covering index?",
    options: [
      "An index on all columns",
      "An index that includes all columns needed for a query",
      "A clustered index",
      "A unique index",
    ],
    correctAnswer: 1,
    explanation:
      "A covering index contains all the columns needed to satisfy a query, eliminating the need to access the actual table rows.",
  },
  {
    id: 128,
    category: "SQL",
    difficulty: "medium",
    question:
      "Which function returns the first non-NULL value from multiple expressions?",
    options: ["ISNULL()", "NULLIF()", "COALESCE()", "IFNULL()"],
    correctAnswer: 2,
    explanation:
      "COALESCE() returns the first non-NULL expression from a list of expressions.",
  },
  {
    id: 129,
    category: "SQL",
    difficulty: "medium",
    question: "What does the NULLIF function return?",
    options: [
      "NULL if expressions are equal, first expression otherwise",
      "First expression if not NULL",
      "Second expression if first is NULL",
      "Always returns NULL",
    ],
    correctAnswer: 0,
    explanation:
      "NULLIF returns NULL if both expressions are equal, otherwise returns the first expression.",
  },
  {
    id: 130,
    category: "SQL",
    difficulty: "medium",
    question: "Which type of join is most efficient for large datasets?",
    options: [
      "Always INNER JOIN",
      "Depends on data distribution and indexes",
      "Always LEFT JOIN",
      "CROSS JOIN is fastest",
    ],
    correctAnswer: 1,
    explanation:
      "Join efficiency depends on factors like data distribution, available indexes, query selectivity, and database optimizer decisions.",
  },
  {
    id: 131,
    category: "SQL",
    difficulty: "medium",
    question: "What is a filtered index?",
    options: [
      "An index on filtered data",
      "An index with a WHERE clause condition",
      "An index that filters duplicates",
      "A temporary index",
    ],
    correctAnswer: 1,
    explanation:
      "A filtered index is created with a WHERE clause, indexing only rows that meet specified conditions.",
  },
  {
    id: 132,
    category: "SQL",
    difficulty: "medium",
    question: "Which window function calculates relative rank as a percentage?",
    options: ["RANK()", "DENSE_RANK()", "PERCENT_RANK()", "CUME_DIST()"],
    correctAnswer: 2,
    explanation:
      "PERCENT_RANK() calculates the relative rank of a row as a percentage of the total number of rows.",
  },
  {
    id: 133,
    category: "SQL",
    difficulty: "medium",
    question:
      "What is the difference between FIRST_VALUE and LAST_VALUE window functions?",
    options: [
      "No difference",
      "FIRST_VALUE gets first row in window, LAST_VALUE gets last row",
      "FIRST_VALUE is faster",
      "They work with different data types",
    ],
    correctAnswer: 1,
    explanation:
      "FIRST_VALUE() returns the value from the first row in the window frame, while LAST_VALUE() returns the value from the last row.",
  },
  {
    id: 134,
    category: "SQL",
    difficulty: "medium",
    question:
      "Which clause is used to define window frames in window functions?",
    options: ["PARTITION BY", "ORDER BY", "ROWS/RANGE BETWEEN", "OVER"],
    correctAnswer: 2,
    explanation:
      "ROWS BETWEEN or RANGE BETWEEN clauses define the window frame for window function calculations.",
  },
  {
    id: 135,
    category: "SQL",
    difficulty: "medium",
    question: "What is the purpose of UPSERT operation?",
    options: [
      "Updates all records",
      "Inserts new record or updates if exists",
      "Deletes and re-inserts",
      "Creates backups",
    ],
    correctAnswer: 1,
    explanation:
      "UPSERT (INSERT or UPDATE) inserts a new record if it doesn't exist, or updates the existing record if it does.",
  },
  {
    id: 136,
    category: "SQL",
    difficulty: "medium",
    question:
      "Which type of constraint is evaluated at commit time rather than statement time?",
    options: ["IMMEDIATE", "DEFERRABLE", "PRIMARY KEY", "NOT NULL"],
    correctAnswer: 1,
    explanation:
      "DEFERRABLE constraints can be deferred and checked at commit time rather than after each statement.",
  },
  {
    id: 137,
    category: "SQL",
    difficulty: "medium",
    question:
      "What is the difference between a hash join and nested loop join?",
    options: [
      "Hash join uses memory, nested loop doesn't",
      "Hash join builds hash table from smaller table, nested loop iterates",
      "No significant difference",
      "Nested loop is always faster",
    ],
    correctAnswer: 1,
    explanation:
      "Hash join builds a hash table from the smaller dataset and probes with the larger one, while nested loop join iterates through one table for each row of the other.",
  },
  {
    id: 138,
    category: "SQL",
    difficulty: "medium",
    question:
      "Which SQL feature allows multiple statements to be treated as a single unit?",
    options: ["Batch", "Transaction", "Procedure", "Function"],
    correctAnswer: 1,
    explanation:
      "A transaction groups multiple SQL statements into a single atomic unit that either completely succeeds or fails.",
  },
  {
    id: 139,
    category: "SQL",
    difficulty: "medium",
    question: "What does the OVER clause specify in window functions?",
    options: [
      "Column to select",
      "Window specification for function",
      "Join condition",
      "Filter condition",
    ],
    correctAnswer: 1,
    explanation:
      "OVER clause specifies the window (partitioning, ordering, and framing) for window function calculations.",
  },
  {
    id: 140,
    category: "SQL",
    difficulty: "medium",
    question: "Which technique is used to handle slowly changing dimensions?",
    options: [
      "Normalization",
      "SCD (Slowly Changing Dimension) strategies",
      "Indexing",
      "Partitioning",
    ],
    correctAnswer: 1,
    explanation:
      "SCD strategies (Type 1, 2, 3, etc.) are used to handle changes in dimension data over time in data warehousing.",
  },
  {
    id: 141,
    category: "SQL",
    difficulty: "medium",
    question: "What is the purpose of the HAVING clause with window functions?",
    options: [
      "Not applicable - HAVING doesn't work with window functions",
      "Filters results after window function calculation",
      "Defines window partitions",
      "Orders window results",
    ],
    correctAnswer: 1,
    explanation:
      "HAVING clause can filter results after window function calculations, though WHERE clause cannot be used directly with window functions.",
  },
  {
    id: 142,
    category: "SQL",
    difficulty: "medium",
    question: "Which join algorithm is best for joining large sorted datasets?",
    options: ["Hash Join", "Nested Loop Join", "Merge Join", "Cross Join"],
    correctAnswer: 2,
    explanation:
      "Merge join is most efficient for large sorted datasets as it can merge two sorted inputs in a single pass.",
  },
  {
    id: 143,
    category: "SQL",
    difficulty: "medium",
    question: "What is a partial index?",
    options: [
      "An incomplete index",
      "An index on a subset of rows meeting conditions",
      "An index on part of a column",
      "A temporary index",
    ],
    correctAnswer: 1,
    explanation:
      "A partial index is created on a subset of table rows that meet specified conditions, reducing index size and maintenance.",
  },
  {
    id: 144,
    category: "SQL",
    difficulty: "medium",
    question: "Which statement best describes ACID properties?",
    options: [
      "Database optimization techniques",
      "Transaction properties: Atomicity, Consistency, Isolation, Durability",
      "Index types",
      "Query performance metrics",
    ],
    correctAnswer: 1,
    explanation:
      "ACID represents four key properties of database transactions: Atomicity, Consistency, Isolation, and Durability.",
  },
  {
    id: 145,
    category: "SQL",
    difficulty: "medium",
    question:
      "What is the difference between optimistic and pessimistic locking?",
    options: [
      "Optimistic locks immediately, pessimistic doesn't",
      "Optimistic assumes no conflicts, pessimistic locks preemptively",
      "No difference",
      "Optimistic is always faster",
    ],
    correctAnswer: 1,
    explanation:
      "Optimistic locking assumes conflicts are rare and checks at commit time, while pessimistic locking acquires locks immediately to prevent conflicts.",
  },
  {
    id: 146,
    category: "SQL",
    difficulty: "medium",
    question: "Which window function is used to calculate running totals?",
    options: ["SUM() OVER()", "RUNNING_SUM()", "CUMSUM()", "TOTAL()"],
    correctAnswer: 0,
    explanation:
      "SUM() with OVER clause and appropriate window frame calculates running totals across a result set.",
  },
  {
    id: 147,
    category: "SQL",
    difficulty: "medium",
    question: "What is the purpose of database partitioning?",
    options: [
      "Data security",
      "Improve performance and manageability by dividing large tables",
      "Data backup",
      "User access control",
    ],
    correctAnswer: 1,
    explanation:
      "Partitioning divides large tables into smaller, more manageable pieces to improve query performance and maintenance operations.",
  },
  {
    id: 148,
    category: "SQL",
    difficulty: "medium",
    question:
      "Which type of join is most suitable for finding records that don't have matching entries in another table?",
    options: [
      "INNER JOIN",
      "LEFT JOIN with NULL check",
      "RIGHT JOIN",
      "CROSS JOIN",
    ],
    correctAnswer: 1,
    explanation:
      "LEFT JOIN with WHERE condition checking for NULL values in the right table's columns finds records without matches in the joined table.",
  },
  {
    id: 149,
    category: "SQL",
    difficulty: "medium",
    question: "What is the difference between a natural join and an equijoin?",
    options: [
      "No difference",
      "Natural join uses all matching column names automatically",
      "Equijoin is faster",
      "Natural join requires explicit ON clause",
    ],
    correctAnswer: 1,
    explanation:
      "Natural join automatically matches columns with the same names in both tables, while equijoin requires explicit equality conditions in the ON clause.",
  },
  {
    id: 150,
    category: "SQL",
    difficulty: "medium",
    question:
      "Which SQL construct would you use to implement pagination efficiently?",
    options: [
      "LIMIT and OFFSET",
      "ROW_NUMBER() with WHERE",
      "Both A and B",
      "TOP clause only",
    ],
    correctAnswer: 2,
    explanation:
      "Both LIMIT/OFFSET and ROW_NUMBER() with WHERE clause can implement pagination, with ROW_NUMBER() often being more efficient for large datasets.",
  },
  {
    id: 151,
    category: "SQL",
    difficulty: "medium",
    question: "What is a bitmap index best suited for?",
    options: [
      "High cardinality columns",
      "Low cardinality columns like gender or status",
      "Primary keys",
      "Encrypted columns",
    ],
    correctAnswer: 1,
    explanation:
      "Bitmap indexes are most effective for columns with low cardinality (few distinct values) like gender, status flags, or boolean fields.",
  },
  {
    id: 152,
    category: "SQL",
    difficulty: "medium",
    question:
      "Which window function would you use to calculate year-over-year growth?",
    options: ["LAG()", "LEAD()", "FIRST_VALUE()", "LAST_VALUE()"],
    correctAnswer: 0,
    explanation:
      "LAG() function can access values from previous rows (like last year's data) to calculate year-over-year comparisons.",
  },
  {
    id: 153,
    category: "SQL",
    difficulty: "medium",
    question:
      "What is the main advantage of using EXISTS over IN for subqueries?",
    options: [
      "EXISTS is always faster",
      "EXISTS stops processing when match found",
      "IN handles NULLs better",
      "No difference in performance",
    ],
    correctAnswer: 1,
    explanation:
      "EXISTS stops processing as soon as it finds a matching row, while IN may evaluate the entire subquery result set.",
  },
  {
    id: 154,
    category: "SQL",
    difficulty: "medium",
    question: "Which technique helps prevent SQL injection attacks?",
    options: [
      "Parameterized queries",
      "Dynamic SQL",
      "String concatenation",
      "Stored procedures only",
    ],
    correctAnswer: 0,
    explanation:
      "Parameterized queries separate SQL code from user input, preventing malicious SQL code injection.",
  },
  {
    id: 155,
    category: "SQL",
    difficulty: "medium",
    question: "What is the difference between a view and a materialized view?",
    options: [
      "Views are faster",
      "Materialized views store data physically",
      "Views can be updated",
      "No functional difference",
    ],
    correctAnswer: 1,
    explanation:
      "Materialized views store query results physically on disk and can be refreshed, while views are virtual tables computed on-demand.",
  },
  {
    id: 156,
    category: "SQL",
    difficulty: "medium",
    question: "Which SQL feature helps implement row-level security?",
    options: [
      "Views with WHERE clauses",
      "Row-level security policies",
      "Both A and B",
      "Triggers only",
    ],
    correctAnswer: 2,
    explanation:
      "Both views with appropriate WHERE clauses and dedicated row-level security policies can implement row-level access control.",
  },
  {
    id: 157,
    category: "SQL",
    difficulty: "medium",
    question: "What is the purpose of the CHECKPOINT command?",
    options: [
      "Validates data integrity",
      "Forces all dirty pages to disk",
      "Creates backup",
      "Optimizes queries",
    ],
    correctAnswer: 1,
    explanation:
      "CHECKPOINT forces the database to write all dirty pages (modified data) from memory to disk.",
  },
  {
    id: 158,
    category: "SQL",
    difficulty: "medium",
    question:
      "Which isolation level allows non-repeatable reads but prevents dirty reads?",
    options: [
      "READ UNCOMMITTED",
      "READ COMMITTED",
      "REPEATABLE READ",
      "SERIALIZABLE",
    ],
    correctAnswer: 1,
    explanation:
      "READ COMMITTED prevents dirty reads but allows non-repeatable reads and phantom reads.",
  },
  {
    id: 159,
    category: "SQL",
    difficulty: "medium",
    question: "What is a self-join and when would you use it?",
    options: [
      "Joining table to itself for hierarchical data",
      "Joining with duplicate tables",
      "Error in query",
      "Performance optimization",
    ],
    correctAnswer: 0,
    explanation:
      "Self-join joins a table to itself, useful for hierarchical data like employee-manager relationships or comparing rows within the same table.",
  },
  {
    id: 160,
    category: "SQL",
    difficulty: "medium",
    question: "Which aggregate function ignores NULL values by default?",
    options: ["COUNT(*)", "COUNT(column)", "SUM()", "Both B and C"],
    correctAnswer: 3,
    explanation:
      "COUNT(column) and SUM() ignore NULL values, while COUNT(*) counts all rows including those with NULLs.",
  },

  // HARD QUESTIONS (201-300)
  {
    id: 201,
    category: "SQL",
    difficulty: "hard",
    question: "How would you implement a circular buffer using SQL?",
    options: [
      "Using modulo arithmetic with row numbers",
      "Circular joins",
      "Recursive CTEs",
      "Not possible in SQL",
    ],
    correctAnswer: 0,
    explanation:
      "Circular buffers can be implemented using modulo arithmetic with ROW_NUMBER() to create cyclic patterns in data access.",
  },
  {
    id: 202,
    category: "SQL",
    difficulty: "hard",
    question: "What is the difference between a GiST and B-tree index?",
    options: [
      "GiST is for text only",
      "GiST supports complex data types and operations",
      "B-tree is for geometric data",
      "No difference",
    ],
    correctAnswer: 1,
    explanation:
      "GiST (Generalized Search Tree) indexes support complex data types and operations beyond equality and range queries, unlike B-tree indexes.",
  },
  {
    id: 203,
    category: "SQL",
    difficulty: "hard",
    question: "How would you calculate a running median efficiently?",
    options: [
      "PERCENTILE_CONT() with window functions",
      "Self-joins",
      "Subqueries",
      "Not possible efficiently",
    ],
    correctAnswer: 0,
    explanation:
      "PERCENTILE_CONT() with appropriate window framing can calculate running medians efficiently without complex self-joins.",
  },
  {
    id: 204,
    category: "SQL",
    difficulty: "hard",
    question: "What is index bloat and how do you prevent it?",
    options: [
      "Over-indexing - use partial indexes",
      "Fragmentation - regular maintenance",
      "Both A and B",
      "Cannot be prevented",
    ],
    correctAnswer: 2,
    explanation:
      "Index bloat occurs from over-indexing and fragmentation. Use partial indexes and regular maintenance like REINDEX or VACUUM to prevent it.",
  },
  {
    id: 205,
    category: "SQL",
    difficulty: "hard",
    question:
      "How would you implement optimistic locking without a timestamp column?",
    options: [
      "Using row version or checksum",
      "Not possible",
      "Using triggers",
      "Using views",
    ],
    correctAnswer: 0,
    explanation:
      "Optimistic locking can use row version numbers or checksums of row data to detect concurrent modifications.",
  },
  {
    id: 206,
    category: "SQL",
    difficulty: "hard",
    question: "What is the Halloween Problem in database systems?",
    options: [
      "Security vulnerability",
      "Update anomaly where rows are updated multiple times",
      "Performance issue",
      "Storage corruption",
    ],
    correctAnswer: 1,
    explanation:
      "The Halloween Problem occurs when an update operation affects the same rows multiple times due to index changes during processing.",
  },
  {
    id: 207,
    category: "SQL",
    difficulty: "hard",
    question: "How would you efficiently find gaps in a sequence?",
    options: [
      "Window functions with LAG/LEAD",
      "Self-joins",
      "Recursive CTEs",
      "All of the above",
    ],
    correctAnswer: 3,
    explanation:
      "Gaps in sequences can be found using multiple techniques: LAG/LEAD to compare adjacent values, self-joins, or recursive CTEs for complex patterns.",
  },
  {
    id: 208,
    category: "SQL",
    difficulty: "hard",
    question:
      "What is the difference between a correlated and non-correlated subquery performance-wise?",
    options: [
      "Correlated is always faster",
      "Non-correlated is evaluated once, correlated for each row",
      "No difference",
      "Correlated uses less memory",
    ],
    correctAnswer: 1,
    explanation:
      "Non-correlated subqueries are evaluated once for the entire query, while correlated subqueries are evaluated for each row, potentially impacting performance.",
  },
  {
    id: 209,
    category: "SQL",
    difficulty: "hard",
    question: "How would you implement a queue using SQL tables?",
    options: [
      "With proper indexing and DELETE RETURNING",
      "Using triggers",
      "Views only",
      "Not possible",
    ],
    correctAnswer: 0,
    explanation:
      "SQL queues can be implemented using tables with appropriate indexing, ordering, and DELETE RETURNING or similar constructs for atomic dequeue operations.",
  },
  {
    id: 210,
    category: "SQL",
    difficulty: "hard",
    question: "What is write skew and how do you prevent it?",
    options: [
      "Phantom read - use SERIALIZABLE",
      "Lost update - use locking",
      "Constraint violation - use triggers",
      "Performance issue - use indexes",
    ],
    correctAnswer: 0,
    explanation:
      "Write skew is a phantom read anomaly where concurrent transactions violate business rules. Use SERIALIZABLE isolation or explicit locking to prevent it.",
  },
  {
    id: 211,
    category: "SQL",
    difficulty: "hard",
    question:
      "How would you efficiently calculate percentiles for grouped data?",
    options: [
      "PERCENTILE_CONT() with PARTITION BY",
      "Self-joins",
      "Subqueries",
      "Cursor-based approach",
    ],
    correctAnswer: 0,
    explanation:
      "PERCENTILE_CONT() with PARTITION BY efficiently calculates percentiles within groups without complex joins or cursors.",
  },
  {
    id: 212,
    category: "SQL",
    difficulty: "hard",
    question: "What is the difference between a hash and merge join algorithm?",
    options: [
      "Hash join builds hash table, merge join requires sorted inputs",
      "Merge join is always faster",
      "Hash join needs indexes",
      "No difference",
    ],
    correctAnswer: 0,
    explanation:
      "Hash join builds a hash table from the smaller input and probes with the larger one, while merge join requires both inputs to be sorted and merges them.",
  },
  {
    id: 213,
    category: "SQL",
    difficulty: "hard",
    question: "How would you detect and resolve deadlocks?",
    options: [
      "Database automatically detects and chooses victim",
      "Manual intervention required",
      "Use timeouts only",
      "Cannot be resolved",
    ],
    correctAnswer: 0,
    explanation:
      "Modern databases automatically detect deadlocks and choose a victim transaction to rollback, breaking the circular wait.",
  },
  {
    id: 214,
    category: "SQL",
    difficulty: "hard",
    question: "What is a BRIN index and when is it most effective?",
    options: [
      "Block Range Index - for naturally ordered large tables",
      "B-tree variant - for text",
      "Hash index - for equality",
      "GiST variant - for JSON",
    ],
    correctAnswer: 0,
    explanation:
      "BRIN (Block Range Index) stores summary information about blocks of consecutive pages, most effective for naturally ordered large tables like time-series data.",
  },
  {
    id: 215,
    category: "SQL",
    difficulty: "hard",
    question: "How would you implement materialized view refresh strategies?",
    options: [
      "Complete, fast/incremental, and force refresh",
      "Only complete refresh",
      "Triggers only",
      "Not configurable",
    ],
    correctAnswer: 0,
    explanation:
      "Materialized views support multiple refresh strategies: complete (full recalculation), fast/incremental (only changes), and force (tries fast, falls back to complete).",
  },
  {
    id: 216,
    category: "SQL",
    difficulty: "hard",
    question: "What is the difference between a covering and included index?",
    options: [
      "Covering includes all query columns, included adds non-key columns",
      "No difference",
      "Covering is faster",
      "Included is for primary keys",
    ],
    correctAnswer: 0,
    explanation:
      "A covering index includes all columns needed for a query. An included index adds non-key columns to a regular index to make it covering without affecting the index key structure.",
  },
  {
    id: 217,
    category: "SQL",
    difficulty: "hard",
    question: "How would you handle slowly changing dimensions Type 4?",
    options: [
      "Use separate history table",
      "Add columns to existing table",
      "Create new rows",
      "Use JSON storage",
    ],
    correctAnswer: 0,
    explanation:
      "SCD Type 4 uses a separate history table to store changes, keeping the main table with current data only.",
  },
  {
    id: 218,
    category: "SQL",
    difficulty: "hard",
    question: "What is the Halloween protection in query processing?",
    options: [
      "Prevents multiple updates to same row",
      "Security feature",
      "Index optimization",
      "Memory protection",
    ],
    correctAnswer: 0,
    explanation:
      "Halloween protection prevents a tuple from being updated multiple times by the same operation due to index modifications during processing.",
  },
  {
    id: 219,
    category: "SQL",
    difficulty: "hard",
    question: "How would you implement fuzzy matching in SQL?",
    options: [
      "Using trigram or Levenshtein functions",
      "LIKE operator",
      "Regular expressions",
      "Not possible",
    ],
    correctAnswer: 0,
    explanation:
      "Fuzzy matching can be implemented using specialized functions like trigram similarity (pg_trgm) or Levenshtein distance for approximate string matching.",
  },
  {
    id: 220,
    category: "SQL",
    difficulty: "hard",
    question: "What is the difference between a star and snowflake schema?",
    options: [
      "Star is denormalized, snowflake is normalized",
      "Star has more tables",
      "Snowflake is faster",
      "No difference",
    ],
    correctAnswer: 0,
    explanation:
      "Star schema has a central fact table connected to denormalized dimension tables, while snowflake schema normalizes dimensions into multiple related tables.",
  },

  // EXPERT QUESTIONS (301-400)
  {
    id: 301,
    category: "SQL",
    difficulty: "expert",
    question:
      "How would you implement multi-valued concurrency control (MVCC)?",
    options: [
      "Database handles internally with row versions",
      "Manual locking",
      "Timestamp ordering",
      "Optimistic locking only",
    ],
    correctAnswer: 0,
    explanation:
      "MVCC is implemented by the database system using row versioning, allowing readers to access consistent snapshots without blocking writers.",
  },
  {
    id: 302,
    category: "SQL",
    difficulty: "expert",
    question: "What is the difference between strict and non-strict SQL mode?",
    options: [
      "Strict enforces standards, non-strict allows extensions",
      "Strict prevents data truncation",
      "Non-strict is faster",
      "No difference",
    ],
    correctAnswer: 1,
    explanation:
      "Strict SQL mode prevents invalid or missing data from being inserted, while non-strict mode may allow it with warnings or automatic conversion.",
  },
  {
    id: 303,
    category: "SQL",
    difficulty: "expert",
    question: "How would you implement a graph database using SQL tables?",
    options: [
      "Adjacency list or nested set models",
      "Only adjacency list",
      "B-tree structure",
      "Not possible",
    ],
    correctAnswer: 0,
    explanation:
      "Graphs can be modeled in SQL using adjacency list (node-edge tables) or nested set models for hierarchical queries.",
  },
  {
    id: 304,
    category: "SQL",
    difficulty: "expert",
    question:
      "What is the difference between logical and physical database design?",
    options: [
      "Logical is conceptual, physical is implementation-specific",
      "No difference",
      "Logical includes indexes",
      "Physical includes ER diagrams",
    ],
    correctAnswer: 0,
    explanation:
      "Logical design focuses on data requirements and relationships (ER modeling), while physical design considers implementation details like indexing, partitioning, and storage.",
  },
  {
    id: 305,
    category: "SQL",
    difficulty: "expert",
    question:
      "How would you handle temporal databases with valid and transaction time?",
    options: [
      "Bitemporal tables with period columns",
      "Regular tables",
      "Views only",
      "Triggers only",
    ],
    correctAnswer: 0,
    explanation:
      "Bitemporal databases use period columns to track both valid time (when data was true) and transaction time (when it was recorded).",
  },
  {
    id: 306,
    category: "SQL",
    difficulty: "expert",
    question: "What is the difference between 5NF and 6NF?",
    options: [
      "6NF eliminates join dependencies completely",
      "No difference",
      "5NF is stricter",
      "6NF includes temporal data",
    ],
    correctAnswer: 0,
    explanation:
      "6NF (sixth normal form) eliminates all non-trivial join dependencies by decomposing tables to their irreducible components, while 5NF handles only certain join dependencies.",
  },
  {
    id: 307,
    category: "SQL",
    difficulty: "expert",
    question: "How would you implement a blockchain using SQL?",
    options: [
      "Immutable tables with cryptographic hashes linking rows",
      "Regular tables",
      "Views only",
      "Not possible",
    ],
    correctAnswer: 0,
    explanation:
      "Blockchain-like structures can be implemented using immutable tables where each row contains a cryptographic hash of the previous row, creating an immutable chain.",
  },
  {
    id: 308,
    category: "SQL",
    difficulty: "expert",
    question:
      "What is the difference between OLTP and OLAP optimization strategies?",
    options: [
      "OLTP optimizes for transactions, OLAP for analytics",
      "No difference",
      "OLTP uses denormalization",
      "OLAP uses normalization",
    ],
    correctAnswer: 0,
    explanation:
      "OLTP systems optimize for fast transactions with normalized data, while OLAP systems optimize for complex analytics with denormalized, aggregated data.",
  },
  {
    id: 309,
    category: "SQL",
    difficulty: "expert",
    question: "How would you implement a recommendation engine using SQL?",
    options: [
      "Collaborative filtering with matrix operations",
      "Simple joins",
      "Group by only",
      "Not possible",
    ],
    correctAnswer: 0,
    explanation:
      "Recommendation engines can use SQL with collaborative filtering techniques, similarity calculations, and matrix-like operations on user-item interaction data.",
  },
  {
    id: 310,
    category: "SQL",
    difficulty: "expert",
    question: "What is the CAP theorem and how does it apply to SQL databases?",
    options: [
      "Consistency, Availability, Partition tolerance - choose two",
      "Performance theorem",
      "Security principle",
      "Indexing strategy",
    ],
    correctAnswer: 0,
    explanation:
      "CAP theorem states that distributed systems can guarantee only two of: Consistency, Availability, and Partition tolerance. Traditional SQL databases typically choose consistency over availability.",
  },
  {
    id: 311,
    category: "SQL",
    difficulty: "expert",
    question: "How would you implement a neural network using SQL?",
    options: [
      "Matrix operations with recursive CTEs",
      "Simple arithmetic",
      "Not possible",
      "Triggers only",
    ],
    correctAnswer: 0,
    explanation:
      "Basic neural networks can be implemented using SQL matrix operations, weights stored in tables, and recursive CTEs for forward/backward propagation.",
  },
  {
    id: 312,
    category: "SQL",
    difficulty: "expert",
    question:
      "What is the difference between predicate pushdown and projection pushdown?",
    options: [
      "Predicate filters rows, projection filters columns",
      "No difference",
      "Predicate is faster",
      "Projection is for joins",
    ],
    correctAnswer: 0,
    explanation:
      "Predicate pushdown applies row filters early in query processing, while projection pushdown eliminates unnecessary columns to reduce data transfer.",
  },
  {
    id: 313,
    category: "SQL",
    difficulty: "expert",
    question: "How would you implement a Bloom filter in SQL?",
    options: [
      "Using bit arrays and hash functions",
      "Regular indexes",
      "Not possible",
      "Views only",
    ],
    correctAnswer: 0,
    explanation:
      "Bloom filters can be implemented using bit array columns and multiple hash functions to test membership with possible false positives.",
  },
  {
    id: 314,
    category: "SQL",
    difficulty: "expert",
    question:
      "What is the difference between vectorized and tuple-at-a-time query execution?",
    options: [
      "Vectorized processes batches, tuple processes single rows",
      "No difference",
      "Tuple is faster",
      "Vectorized uses more memory",
    ],
    correctAnswer: 0,
    explanation:
      "Vectorized execution processes batches of rows (columnar) for better CPU cache utilization, while tuple-at-a-time processes individual rows.",
  },
  {
    id: 315,
    category: "SQL",
    difficulty: "expert",
    question: "How would you implement a genetic algorithm using SQL?",
    options: [
      "Population in tables with selection/crossover operators",
      "Simple mutations",
      "Not possible",
      "Triggers only",
    ],
    correctAnswer: 0,
    explanation:
      "Genetic algorithms can use SQL tables to store populations, with queries implementing selection, crossover, and mutation operations.",
  },
  {
    id: 316,
    category: "SQL",
    difficulty: "expert",
    question: "What is the difference between EAV and JSON document storage?",
    options: [
      "EAV is normalized, JSON is semi-structured",
      "No difference",
      "EAV is faster",
      "JSON requires schema",
    ],
    correctAnswer: 0,
    explanation:
      "EAV (Entity-Attribute-Value) is a normalized pattern for sparse attributes, while JSON storage keeps semi-structured documents with varying schemas.",
  },
  {
    id: 317,
    category: "SQL",
    difficulty: "expert",
    question:
      "How would you implement a distributed transaction across multiple databases?",
    options: [
      "Two-phase commit protocol",
      "Simple commit",
      "Not possible",
      "Triggers only",
    ],
    correctAnswer: 0,
    explanation:
      "Distributed transactions use two-phase commit (prepare and commit phases) to ensure atomicity across multiple database systems.",
  },
  {
    id: 318,
    category: "SQL",
    difficulty: "expert",
    question:
      "What is the difference between snapshot isolation and serializable isolation?",
    options: [
      "Snapshot allows some anomalies, serializable doesn't",
      "No difference",
      "Snapshot is stricter",
      "Serializable is faster",
    ],
    correctAnswer: 0,
    explanation:
      "Snapshot isolation maintains consistent snapshots but can have write skew anomalies, while serializable isolation prevents all concurrency anomalies.",
  },
  {
    id: 319,
    category: "SQL",
    difficulty: "expert",
    question: "How would you implement a MapReduce operation using SQL?",
    options: [
      "GROUP BY with user-defined functions",
      "Simple aggregations",
      "Not possible",
      "Joins only",
    ],
    correctAnswer: 0,
    explanation:
      "MapReduce patterns can be implemented using SQL GROUP BY with custom aggregate functions or user-defined functions for map/reduce operations.",
  },
  {
    id: 320,
    category: "SQL",
    difficulty: "expert",
    question:
      "What is the difference between horizontal and vertical database partitioning?",
    options: [
      "Horizontal splits rows, vertical splits columns",
      "No difference",
      "Horizontal is faster",
      "Vertical is for security",
    ],
    correctAnswer: 0,
    explanation:
      "Horizontal partitioning (sharding) divides table rows across multiple tables/servers, while vertical partitioning splits columns into separate tables.",
  },
  {
    id: 321,
    category: "SQL",
    difficulty: "expert",
    question:
      "How would you implement a constraint that checks across multiple rows?",
    options: [
      "Assertion (if supported) or triggers",
      "Regular CHECK constraint",
      "Foreign key",
      "Not possible",
    ],
    correctAnswer: 0,
    explanation:
      "Cross-row constraints require assertions (rarely supported) or triggers that check conditions across multiple rows during modifications.",
  },
  {
    id: 322,
    category: "SQL",
    difficulty: "expert",
    question:
      "What is the difference between a surrogate and natural key in distributed systems?",
    options: [
      "Surrogate is system-generated, natural is business-meaningful",
      "No difference",
      "Natural is better",
      "Surrogate requires UUID",
    ],
    correctAnswer: 0,
    explanation:
      "Surrogate keys are system-generated (like sequences/UUIDs) independent of business meaning, while natural keys derive from business attributes which may cause conflicts in distributed systems.",
  },
  {
    id: 323,
    category: "SQL",
    difficulty: "expert",
    question: "How would you implement eventual consistency in SQL?",
    options: [
      "Asynchronous replication with conflict resolution",
      "Synchronous commits",
      "Not possible",
      "Two-phase commit",
    ],
    correctAnswer: 0,
    explanation:
      "Eventual consistency can be implemented using asynchronous replication with conflict detection and resolution strategies like last-write-wins or vector clocks.",
  },
  {
    id: 324,
    category: "SQL",
    difficulty: "expert",
    question:
      "What is the difference between a cursor and a cursor stability isolation level?",
    options: [
      "Cursor is object, stability is isolation level",
      "Same thing",
      "Cursor provides better isolation",
      "Stability uses cursors",
    ],
    correctAnswer: 0,
    explanation:
      "A cursor is a database object for row-by-row processing, while cursor stability is an isolation level that locks rows only while they're being processed.",
  },
  {
    id: 325,
    category: "SQL",
    difficulty: "expert",
    question: "How would you implement a time-series database using SQL?",
    options: [
      "Partitioning, compression, and specialized indexes",
      "Regular tables",
      "Views only",
      "Not suitable",
    ],
    correctAnswer: 0,
    explanation:
      "Time-series databases can be built using SQL with time-based partitioning, compression techniques, and specialized indexes like BRIN for time-ordered data.",
  },
  {
    id: 326,
    category: "SQL",
    difficulty: "expert",
    question:
      "What is the difference between a stored procedure and a stored function?",
    options: [
      "Procedures don't return values, functions do",
      "No difference",
      "Procedures are faster",
      "Functions can modify data",
    ],
    correctAnswer: 0,
    explanation:
      "Stored procedures perform actions and may have output parameters but don't return values like functions, which return single values and can be used in SQL expressions.",
  },
  {
    id: 327,
    category: "SQL",
    difficulty: "expert",
    question:
      "How would you implement a full-text search with relevance scoring?",
    options: [
      "Using full-text indexes with ranking functions",
      "LIKE operator",
      "Regular indexes",
      "Not possible",
    ],
    correctAnswer: 0,
    explanation:
      "Full-text search with relevance scoring uses specialized full-text indexes and ranking functions that calculate similarity scores based on various algorithms.",
  },
  {
    id: 328,
    category: "SQL",
    difficulty: "expert",
    question:
      "What is the difference between a deterministic and non-deterministic function?",
    options: [
      "Deterministic always returns same result for same input",
      "No difference",
      "Non-deterministic is faster",
      "Deterministic uses less memory",
    ],
    correctAnswer: 0,
    explanation:
      "Deterministic functions always return the same result for the same input parameters (like ABS()), while non-deterministic functions may return different results (like NOW()).",
  },
  {
    id: 329,
    category: "SQL",
    difficulty: "expert",
    question:
      "How would you implement a cache invalidation strategy using SQL?",
    options: [
      "Triggers or change data capture",
      "Manual deletion",
      "Not possible",
      "Views only",
    ],
    correctAnswer: 0,
    explanation:
      "Cache invalidation can use database triggers on data changes or change data capture (CDC) mechanisms to notify cache systems of updates.",
  },
  {
    id: 330,
    category: "SQL",
    difficulty: "expert",
    question: "What is the difference between a shared and exclusive lock?",
    options: [
      "Shared allows reads, exclusive blocks all",
      "No difference",
      "Shared is faster",
      "Exclusive allows reads",
    ],
    correctAnswer: 0,
    explanation:
      "Shared locks allow concurrent reads but block writes, while exclusive locks prevent any concurrent access (both reads and writes) to the locked resource.",
  },
  {
    id: 331,
    category: "SQL",
    difficulty: "expert",
    question: "How would you implement a rate limiter using SQL?",
    options: [
      "Sliding window with timestamps and counts",
      "Simple counters",
      "Not possible",
      "Triggers only",
    ],
    correctAnswer: 0,
    explanation:
      "Rate limiters can use SQL tables storing timestamps and counts, with sliding window algorithms to track and limit requests per time period.",
  },
  {
    id: 332,
    category: "SQL",
    difficulty: "expert",
    question: "What is the difference between a checkpoint and a savepoint?",
    options: [
      "Checkpoint is system-wide, savepoint is transaction-local",
      "Same thing",
      "Checkpoint is faster",
      "Savepoint is persistent",
    ],
    correctAnswer: 0,
    explanation:
      "Checkpoints are system-wide operations that flush dirty buffers to disk, while savepoints are transaction-local markers for partial rollback.",
  },
  {
    id: 333,
    category: "SQL",
    difficulty: "expert",
    question: "How would you implement a leaderboard with rank changes?",
    options: [
      "Window functions with LAG for previous rank",
      "Simple ORDER BY",
      "Not possible efficiently",
      "Cursors",
    ],
    correctAnswer: 0,
    explanation:
      "Leaderboards with rank changes can use window functions like RANK() combined with LAG() to compare current and previous rankings.",
  },
  {
    id: 334,
    category: "SQL",
    difficulty: "expert",
    question:
      "What is the difference between a covering and a clustered index scan?",
    options: [
      "Covering uses index only, clustered needs table access",
      "No difference",
      "Clustered is faster",
      "Covering needs table access",
    ],
    correctAnswer: 0,
    explanation:
      "Covering index scans can satisfy queries using only the index without accessing the table, while clustered index scans may still need to read table data.",
  },
  {
    id: 335,
    category: "SQL",
    difficulty: "expert",
    question: "How would you implement a distributed counter using SQL?",
    options: [
      "Sharding with consistent hashing and merge operations",
      "Single row updates",
      "Not possible",
      "Triggers only",
    ],
    correctAnswer: 0,
    explanation:
      "Distributed counters can use SQL with consistent hashing to shard counters across nodes, then merge results with conflict resolution for concurrent updates.",
  },
  {
    id: 336,
    category: "SQL",
    difficulty: "expert",
    question:
      "What is the difference between a serializable and linearizable isolation?",
    options: [
      "Linearizable guarantees real-time ordering",
      "No difference",
      "Serializable is stronger",
      "Linearizable is faster",
    ],
    correctAnswer: 0,
    explanation:
      "Linearizable isolation provides serializability with the additional guarantee that operations appear to take effect atomically at some point between start and completion in real-time.",
  },
  {
    id: 337,
    category: "SQL",
    difficulty: "expert",
    question: "How would you implement a publish-subscribe pattern using SQL?",
    options: [
      "Queue tables with notifications or triggers",
      "Simple SELECT statements",
      "Not possible",
      "Views only",
    ],
    correctAnswer: 0,
    explanation:
      "Publish-subscribe can use SQL with queue tables for messages and notifications via triggers, LISTEN/NOTIFY, or polling mechanisms for subscribers.",
  },
  {
    id: 338,
    category: "SQL",
    difficulty: "expert",
    question: "What is the difference between a hash and sort aggregate?",
    options: [
      "Hash uses memory, sort may spill to disk",
      "No difference",
      "Sort is always faster",
      "Hash needs indexes",
    ],
    correctAnswer: 0,
    explanation:
      "Hash aggregation builds a hash table in memory for grouping, while sort aggregation sorts data first and may spill to temporary disk space for large datasets.",
  },
  {
    id: 339,
    category: "SQL",
    difficulty: "expert",
    question: "How would you implement a consistent hash ring using SQL?",
    options: [
      "Virtual nodes in table with hash ranges",
      "Simple modulo operation",
      "Not possible",
      "B-tree only",
    ],
    correctAnswer: 0,
    explanation:
      "Consistent hash rings can use SQL tables storing virtual nodes with their hash ranges, allowing efficient node addition/removal with minimal data movement.",
  },
  {
    id: 340,
    category: "SQL",
    difficulty: "expert",
    question:
      "What is the difference between a prepared statement and a stored procedure?",
    options: [
      "Prepared is parameterized query, procedure is stored logic",
      "No difference",
      "Prepared is faster",
      "Procedure is temporary",
    ],
    correctAnswer: 0,
    explanation:
      "Prepared statements are parameterized SQL queries cached for repeated execution, while stored procedures are named, stored programs with complex logic.",
  },
  {
    id: 341,
    category: "SQL",
    difficulty: "expert",
    question: "How would you implement a bloom filter join using SQL?",
    options: [
      "Pre-filter with bloom filters before join",
      "Regular join",
      "Not possible",
      "Hash join only",
    ],
    correctAnswer: 0,
    explanation:
      "Bloom filter joins use bloom filters as pre-filters to eliminate non-matching rows before the actual join operation, reducing data transfer.",
  },
  {
    id: 342,
    category: "SQL",
    difficulty: "expert",
    question: "What is the difference between a latch and a lock?",
    options: [
      "Latch is lightweight, short-term; lock is heavyweight, long-term",
      "No difference",
      "Lock is faster",
      "Latch is for users",
    ],
    correctAnswer: 0,
    explanation:
      "Latches are lightweight, short-term synchronization primitives for internal database operations, while locks are higher-level, user-visible mechanisms for transaction concurrency control.",
  },
  {
    id: 343,
    category: "SQL",
    difficulty: "expert",
    question:
      "How would you implement a sliding window aggregation for streaming data?",
    options: [
      "Window functions with RANGE/ROWS BETWEEN",
      "GROUP BY only",
      "Not possible",
      "Cursors",
    ],
    correctAnswer: 0,
    explanation:
      "Sliding window aggregations on streaming data can use window functions with RANGE or ROWS BETWEEN clauses to define moving time or row-based windows.",
  },
  {
    id: 344,
    category: "SQL",
    difficulty: "expert",
    question:
      "What is the difference between a materialized view and a result cache?",
    options: [
      "Materialized view is persistent, cache is temporary",
      "No difference",
      "Cache is persistent",
      "View is temporary",
    ],
    correctAnswer: 0,
    explanation:
      "Materialized views persist query results as database objects that can be refreshed, while result caches are temporary memory structures that may expire based on policies.",
  },
  {
    id: 345,
    category: "SQL",
    difficulty: "expert",
    question:
      "How would you implement a vector space model for document similarity?",
    options: [
      "TF-IDF with cosine similarity using SQL math",
      "LIKE operator",
      "Regular expressions",
      "Not possible",
    ],
    correctAnswer: 0,
    explanation:
      "Vector space models can use SQL to calculate TF-IDF weights and cosine similarity between document vectors for content-based similarity.",
  },
  {
    id: 346,
    category: "SQL",
    difficulty: "expert",
    question:
      "What is the difference between a serial and parallel query plan?",
    options: [
      "Serial uses one thread, parallel uses multiple",
      "No difference",
      "Serial is always faster",
      "Parallel needs indexes",
    ],
    correctAnswer: 0,
    explanation:
      "Serial query plans execute operations sequentially with one thread, while parallel plans divide work among multiple threads/processes for faster execution on multi-core systems.",
  },
  {
    id: 347,
    category: "SQL",
    difficulty: "expert",
    question: "How would you implement a bayesian classifier using SQL?",
    options: [
      "Probability calculations with GROUP BY and aggregates",
      "Simple counting",
      "Not possible",
      "Triggers only",
    ],
    correctAnswer: 0,
    explanation:
      "Naive Bayes classifiers can use SQL with GROUP BY for class probabilities and aggregate functions to calculate conditional probabilities for classification.",
  },
  {
    id: 348,
    category: "SQL",
    difficulty: "expert",
    question:
      "What is the difference between a deterministic and non-deterministic view?",
    options: [
      "Deterministic always same result, non-deterministic may vary",
      "No difference",
      "Non-deterministic is faster",
      "Deterministic uses less memory",
    ],
    correctAnswer: 0,
    explanation:
      "Deterministic views always return the same result for the same input, while non-deterministic views may return different results (e.g., containing CURRENT_TIME or RANDOM()).",
  },
  {
    id: 349,
    category: "SQL",
    difficulty: "expert",
    question: "How would you implement a page rank algorithm using SQL?",
    options: [
      "Iterative matrix calculations with recursive CTEs",
      "Simple counting",
      "Not possible",
      "Regular joins",
    ],
    correctAnswer: 0,
    explanation:
      "PageRank can be implemented using SQL with iterative matrix calculations through recursive CTEs, updating page scores based on link structure until convergence.",
  },
  {
    id: 350,
    category: "SQL",
    difficulty: "expert",
    question:
      "What is the difference between a clustered and non-clustered columnstore index?",
    options: [
      "Clustered is primary storage, non-clustered is secondary",
      "No difference",
      "Non-clustered is primary",
      "Clustered is for OLTP",
    ],
    correctAnswer: 0,
    explanation:
      "Clustered columnstore indexes are the primary data storage with all columns, while non-clustered columnstore indexes are secondary structures for analytics on row-based tables.",
  },
  {
    id: 351,
    category: "SQL",
    difficulty: "expert",
    question:
      "How would you implement a k-means clustering algorithm using SQL?",
    options: [
      "Iterative centroid updates with distance calculations",
      "GROUP BY only",
      "Not possible",
      "Window functions only",
    ],
    correctAnswer: 0,
    explanation:
      "K-means clustering can use SQL with iterative updates: assign points to nearest centroids using distance calculations, then recalculate centroids until convergence.",
  },
  {
    id: 352,
    category: "SQL",
    difficulty: "expert",
    question:
      "What is the difference between a serializable schedule and a serial schedule?",
    options: [
      "Serializable is equivalent to some serial order, serial is strictly sequential",
      "No difference",
      "Serial is equivalent",
      "Serializable is strictly sequential",
    ],
    correctAnswer: 0,
    explanation:
      "A serializable schedule produces results equivalent to some serial execution order, while a serial schedule executes transactions strictly one after another.",
  },
  {
    id: 353,
    category: "SQL",
    difficulty: "expert",
    question:
      "How would you implement a min hash signature for similarity search?",
    options: [
      "Using multiple hash functions and minimum values",
      "Single hash function",
      "Not possible",
      "B-tree only",
    ],
    correctAnswer: 0,
    explanation:
      "MinHash signatures can use SQL with multiple hash functions applied to set elements, storing the minimum hash value for each function to estimate Jaccard similarity.",
  },
  {
    id: 354,
    category: "SQL",
    difficulty: "expert",
    question: "What is the difference between a left-deep and bushy join tree?",
    options: [
      "Left-deep chains joins, bushy allows parallel joins",
      "No difference",
      "Left-deep is faster",
      "Bushy needs indexes",
    ],
    correctAnswer: 0,
    explanation:
      "Left-deep join trees chain joins sequentially, while bushy trees allow parallel join execution by building intermediate results independently.",
  },
  {
    id: 355,
    category: "SQL",
    difficulty: "expert",
    question:
      "How would you implement a count-min sketch for frequency estimation?",
    options: [
      "Using hash functions and counter arrays",
      "Simple counting",
      "Not possible",
      "Group by only",
    ],
    correctAnswer: 0,
    explanation:
      "Count-min sketches can use SQL with multiple hash functions mapping to counter arrays, providing space-efficient frequency estimates with overcounting.",
  },
  {
    id: 356,
    category: "SQL",
    difficulty: "expert",
    question:
      "What is the difference between a static and dynamic SQL statement?",
    options: [
      "Static is fixed, dynamic is built at runtime",
      "No difference",
      "Static is faster",
      "Dynamic uses less memory",
    ],
    correctAnswer: 0,
    explanation:
      "Static SQL statements are fixed at compile time, while dynamic SQL statements are constructed as strings at runtime and then executed.",
  },
  {
    id: 357,
    category: "SQL",
    difficulty: "expert",
    question:
      "How would you implement a hyperloglog for cardinality estimation?",
    options: [
      "Using bit patterns and harmonic mean",
      "COUNT DISTINCT",
      "Not possible",
      "Regular aggregates",
    ],
    correctAnswer: 0,
    explanation:
      "HyperLogLog can use SQL by analyzing bit patterns in hash values and using harmonic mean calculations to estimate distinct element counts with minimal memory.",
  },
  {
    id: 358,
    category: "SQL",
    difficulty: "expert",
    question:
      "What is the difference between a compile-time and runtime error in SQL?",
    options: [
      "Compile-time is syntax/semantic, runtime is execution",
      "No difference",
      "Runtime is syntax",
      "Compile-time is execution",
    ],
    correctAnswer: 0,
    explanation:
      "Compile-time errors occur during SQL parsing and validation (syntax, missing objects), while runtime errors happen during execution (constraint violations, resource issues).",
  },
  {
    id: 359,
    category: "SQL",
    difficulty: "expert",
    question:
      "How would you implement a locality-sensitive hash for approximate nearest neighbors?",
    options: [
      "Using random projections and hash tables",
      "Regular hashing",
      "Not possible",
      "B-tree only",
    ],
    correctAnswer: 0,
    explanation:
      "LSH can use SQL with random projection planes to hash similar items to same buckets, enabling approximate nearest neighbor searches in high dimensions.",
  },
  {
    id: 360,
    category: "SQL",
    difficulty: "expert",
    question:
      "What is the difference between a push and pull-based execution model?",
    options: [
      "Push streams data, pull requests data",
      "No difference",
      "Pull is faster",
      "Push uses less memory",
    ],
    correctAnswer: 0,
    explanation:
      "Push-based execution actively streams data through operators, while pull-based execution uses demand-driven iteration where operators request data from children.",
  },
  {
    id: 361,
    category: "SQL",
    difficulty: "expert",
    question: "How would you implement a t-digest for percentile estimation?",
    options: [
      "Using centroid clustering with weight limits",
      "Simple ORDER BY",
      "Not possible",
      "Regular percentiles",
    ],
    correctAnswer: 0,
    explanation:
      "T-digest can use SQL by maintaining centroids (cluster centers) with weight and mean, merging them while respecting size constraints for accurate percentile estimates.",
  },
  {
    id: 362,
    category: "SQL",
    difficulty: "expert",
    question:
      "What is the difference between a rule-based and cost-based optimizer?",
    options: [
      "Rule uses heuristics, cost uses statistics",
      "No difference",
      "Rule is always better",
      "Cost uses heuristics",
    ],
    correctAnswer: 0,
    explanation:
      "Rule-based optimizers use fixed heuristics for plan selection, while cost-based optimizers use table statistics and cost models to estimate the cheapest execution plan.",
  },
  {
    id: 363,
    category: "SQL",
    difficulty: "expert",
    question: "How would you implement a simhash for near-duplicate detection?",
    options: [
      "Using weighted feature hashing and bit counting",
      "Regular hash",
      "Not possible",
      "Group by only",
    ],
    correctAnswer: 0,
    explanation:
      "SimHash can use SQL by creating weighted feature vectors, hashing features to bit positions, and combining them with majority voting to produce similar hashes for near-identical content.",
  },
  {
    id: 364,
    category: "SQL",
    difficulty: "expert",
    question:
      "What is the difference between a forward and backward index scan?",
    options: [
      "Forward follows index order, backward reverses it",
      "No difference",
      "Backward is faster",
      "Forward needs sorting",
    ],
    correctAnswer: 0,
    explanation:
      "Forward index scans follow the natural index order, while backward scans read the index in reverse order, which may require different access methods or sorting.",
  },
  {
    id: 365,
    category: "SQL",
    difficulty: "expert",
    question:
      "How would you implement a reservoir sampling for random sampling from streams?",
    options: [
      "Using reservoir algorithm with random replacement",
      "ORDER BY RANDOM()",
      "Not possible for streams",
      "LIMIT only",
    ],
    correctAnswer: 0,
    explanation:
      "Reservoir sampling can use SQL to maintain a fixed-size sample by replacing elements with decreasing probability as the stream progresses, enabling uniform random sampling without knowing the total size.",
  },
  {
    id: 366,
    category: "SQL",
    difficulty: "expert",
    question:
      "What is the difference between a synchronous and asynchronous materialized view refresh?",
    options: [
      "Synchronous blocks, asynchronous runs in background",
      "No difference",
      "Asynchronous blocks",
      "Synchronous is faster",
    ],
    correctAnswer: 0,
    explanation:
      "Synchronous refresh blocks queries until complete, while asynchronous refresh runs in the background allowing concurrent queries on stale data until refresh finishes.",
  },
  {
    id: 367,
    category: "SQL",
    difficulty: "expert",
    question:
      "How would you implement a count sketch for frequency estimation?",
    options: [
      "Using hash functions and signed counters",
      "Simple counting",
      "Not possible",
      "Regular aggregates",
    ],
    correctAnswer: 0,
    explanation:
      "Count sketches use SQL with multiple hash functions mapping to signed counters, allowing frequency estimation with error bounds for data streams.",
  },
  {
    id: 368,
    category: "SQL",
    difficulty: "expert",
    question:
      "What is the difference between a soft and hard parse in SQL execution?",
    options: [
      "Soft reuses execution plan, hard creates new",
      "No difference",
      "Hard is faster",
      "Soft needs more memory",
    ],
    correctAnswer: 0,
    explanation:
      "Soft parsing reuses an existing execution plan from the cache, while hard parsing involves full syntax analysis, optimization, and plan generation.",
  },
  {
    id: 369,
    category: "SQL",
    difficulty: "expert",
    question: "How would you implement a weighted random sampling using SQL?",
    options: [
      "Using cumulative weights with binary search",
      "ORDER BY RANDOM()",
      "Not possible",
      "LIMIT only",
    ],
    correctAnswer: 0,
    explanation:
      "Weighted random sampling can use SQL by calculating cumulative weights, generating a random number, and selecting the item where the random value falls in the weight range.",
  },
  {
    id: 370,
    category: "SQL",
    difficulty: "expert",
    question: "What is the difference between a zone map and a zone map join?",
    options: [
      "Zone map filters data, zone map join optimizes joins",
      "No difference",
      "Zone map join is faster",
      "Zone map needs indexes",
    ],
    correctAnswer: 0,
    explanation:
      "Zone maps store min/max values for column ranges to skip unnecessary I/O, while zone map joins use this information to eliminate partitions during join operations.",
  },
  {
    id: 371,
    category: "SQL",
    difficulty: "expert",
    question:
      "How would you implement a Morris counter for approximate counting?",
    options: [
      "Using probabilistic increment with exponential backoff",
      "Regular counter",
      "Not possible",
      "Triggers",
    ],
    correctAnswer: 0,
    explanation:
      "Morris counters can use SQL with probabilistic increments where the probability of incrementing decreases exponentially with the count value, providing approximate counting with small memory footprint.",
  },
  {
    id: 372,
    category: "SQL",
    difficulty: "expert",
    question:
      "What is the difference between a partition-wise and partition pruning optimization?",
    options: [
      "Pruning eliminates partitions, wise processes in parallel",
      "No difference",
      "Pruning is faster",
      "Wise needs indexes",
    ],
    correctAnswer: 0,
    explanation:
      "Partition pruning eliminates irrelevant partitions from query processing, while partition-wise operations process remaining partitions in parallel and combine results.",
  },
  {
    id: 373,
    category: "SQL",
    difficulty: "expert",
    question:
      "How would you implement a token bucket algorithm for rate limiting?",
    options: [
      "Using timestamp and token count with refill logic",
      "Simple counting",
      "Not possible",
      "Triggers only",
    ],
    correctAnswer: 0,
    explanation:
      "Token bucket algorithms can use SQL tables storing bucket capacity, current tokens, and last refill timestamp, with logic to add tokens at constant rate and consume them for allowed requests.",
  },
  {
    id: 374,
    category: "SQL",
    difficulty: "expert",
    question: "What is the difference between a bitmap and bit vector index?",
    options: [
      "Bitmap uses compression, bit vector is uncompressed",
      "No difference",
      "Bit vector is compressed",
      "Bitmap needs more space",
    ],
    correctAnswer: 0,
    explanation:
      "Bitmap indexes use compressed bitmaps for efficient storage of sparse bit patterns, while bit vectors are uncompressed arrays of bits, making bitmaps more space-efficient for low-cardinality data.",
  },
  {
    id: 375,
    category: "SQL",
    difficulty: "expert",
    question: "How would you implement a logistic regression using SQL?",
    options: [
      "Iterative gradient descent with matrix operations",
      "Simple averaging",
      "Not possible",
      "Group by only",
    ],
    correctAnswer: 0,
    explanation:
      "Logistic regression can use SQL with iterative gradient descent, calculating gradients using matrix operations on feature vectors and updating weights until convergence.",
  },
  {
    id: 376,
    category: "SQL",
    difficulty: "expert",
    question:
      "What is the difference between a sparse and dense rank in window functions?",
    options: [
      "Dense has no gaps, sparse has gaps after ties",
      "No difference",
      "Sparse is faster",
      "Dense needs sorting",
    ],
    correctAnswer: 0,
    explanation:
      "DENSE_RANK() produces consecutive rankings without gaps after ties (1,2,2,3), while RANK() leaves gaps (1,2,2,4) after tied rankings.",
  },
  {
    id: 377,
    category: "SQL",
    difficulty: "expert",
    question: "How would you implement a Fibonacci heap using SQL?",
    options: [
      "Using tables for trees with degree and mark flags",
      "Regular heap",
      "Not possible",
      "Arrays only",
    ],
    correctAnswer: 0,
    explanation:
      "Fibonacci heaps can use SQL tables storing tree structures with degree counts, mark flags for cascading cuts, and parent-child relationships for efficient priority queue operations.",
  },
  {
    id: 378,
    category: "SQL",
    difficulty: "expert",
    question:
      "What is the difference between a clustered and non-clustered hash index?",
    options: [
      "Clustered determines storage order, non-clustered is separate",
      "No difference",
      "Non-clustered determines order",
      "Clustered is for text",
    ],
    correctAnswer: 0,
    explanation:
      "Clustered hash indexes determine the physical storage order of rows based on hash values, while non-clustered hash indexes are separate structures pointing to row locations.",
  },
  {
    id: 379,
    category: "SQL",
    difficulty: "expert",
    question: "How would you implement a red-black tree using SQL?",
    options: [
      "Using nodes with color and parent pointers",
      "B-tree",
      "Not possible",
      "Regular tree",
    ],
    correctAnswer: 0,
    explanation:
      "Red-black trees can use SQL tables storing nodes with color attributes (red/black), parent pointers, and left/right child references, with triggers maintaining balance properties during insertions/deletions.",
  },
  {
    id: 380,
    category: "SQL",
    difficulty: "expert",
    question:
      "What is the difference between a hash and range partition pruning?",
    options: [
      "Hash uses equality, range uses comparison",
      "No difference",
      "Range uses equality",
      "Hash uses comparison",
    ],
    correctAnswer: 0,
    explanation:
      "Hash partitioning pruning works with equality predicates on partition keys, while range partitioning pruning can use comparison operators (>, <, BETWEEN) to eliminate partitions.",
  },
  {
    id: 381,
    category: "SQL",
    difficulty: "expert",
    question: "How would you implement a skip list using SQL?",
    options: [
      "Using multiple linked levels with probability",
      "Linked list",
      "Not possible",
      "B-tree only",
    ],
    correctAnswer: 0,
    explanation:
      "Skip lists can use SQL tables storing nodes with multiple forward pointers at different levels, with random level assignment providing probabilistic balanced search performance.",
  },
  {
    id: 382,
    category: "SQL",
    difficulty: "expert",
    question:
      "What is the difference between a synchronous and asynchronous aggregation?",
    options: [
      "Synchronous blocks, asynchronous streams results",
      "No difference",
      "Asynchronous blocks",
      "Synchronous is slower",
    ],
    correctAnswer: 0,
    explanation:
      "Synchronous aggregation blocks until all data is processed, while asynchronous aggregation can stream partial results as data becomes available.",
  },
  {
    id: 383,
    category: "SQL",
    difficulty: "expert",
    question: "How would you implement a treap using SQL?",
    options: [
      "Using nodes with heap priority and BST keys",
      "Regular heap",
      "Not possible",
      "Binary tree only",
    ],
    correctAnswer: 0,
    explanation:
      "Treaps can use SQL tables storing nodes with both binary search tree key ordering and heap priority ordering, maintaining both properties through rotations during modifications.",
  },
  {
    id: 384,
    category: "SQL",
    difficulty: "expert",
    question:
      "What is the difference between a clustered and non-clustered bitmap join index?",
    options: [
      "Clustered includes join columns, non-clustered is separate",
      "No difference",
      "Non-clustered includes columns",
      "Clustered is for single table",
    ],
    correctAnswer: 0,
    explanation:
      "Clustered bitmap join indexes include the joined columns in the index structure, while non-clustered bitmap join indexes are separate structures pointing to row IDs after join resolution.",
  },
  {
    id: 385,
    category: "SQL",
    difficulty: "expert",
    question: "How would you implement a B+ tree using SQL?",
    options: [
      "Using nodes with sorted keys and leaf pointers",
      "B-tree",
      "Not possible",
      "Binary tree",
    ],
    correctAnswer: 0,
    explanation:
      "B+ trees can use SQL tables storing internal nodes with sorted key ranges and leaf nodes with actual data pointers, maintaining balance through split/merge operations.",
  },
  {
    id: 386,
    category: "SQL",
    difficulty: "expert",
    question:
      "What is the difference between a pipelined and materialized execution?",
    options: [
      "Pipelined streams data, materialized stores intermediate",
      "No difference",
      "Materialized streams",
      "Pipelined stores",
    ],
    correctAnswer: 0,
    explanation:
      "Pipelined execution passes data directly between operators without temporary storage, while materialized execution stores intermediate results before processing continues.",
  },
  {
    id: 387,
    category: "SQL",
    difficulty: "expert",
    question: "How would you implement a suffix array for text search?",
    options: [
      "Using sorted suffixes with binary search",
      "LIKE operator",
      "Not possible",
      "Full-text only",
    ],
    correctAnswer: 0,
    explanation:
      "Suffix arrays can use SQL tables storing all suffixes of text with their positions, sorted lexicographically to enable efficient substring searches via binary search.",
  },
  {
    id: 388,
    category: "SQL",
    difficulty: "expert",
    question:
      "What is the difference between a zone and partition in database organization?",
    options: [
      "Zone is logical grouping, partition is physical division",
      "No difference",
      "Partition is logical",
      "Zone is physical",
    ],
    correctAnswer: 0,
    explanation:
      "Zones are logical groupings of related data for organizational purposes, while partitions are physical divisions of data for performance and manageability.",
  },
  {
    id: 389,
    category: "SQL",
    difficulty: "expert",
    question: "How would you implement a van Emde Boas tree using SQL?",
    options: [
      "Using recursive clusters with summary structures",
      "Binary tree",
      "Not possible",
      "B-tree only",
    ],
    correctAnswer: 0,
    explanation:
      "vEB trees can use SQL with recursive table structures storing clusters and summary information, providing O(log log U) operations for universe size U.",
  },
  {
    id: 390,
    category: "SQL",
    difficulty: "expert",
    question:
      "What is the difference between a forward and backward index scan in bitmap indexes?",
    options: [
      "Forward uses AND, backward uses OR operations",
      "No difference",
      "Backward uses AND",
      "Forward uses OR",
    ],
    correctAnswer: 0,
    explanation:
      "Forward bitmap index scans typically combine bitmaps with AND operations for filtering, while backward scans may use OR operations for different query patterns.",
  },
  {
    id: 391,
    category: "SQL",
    difficulty: "expert",
    question: "How would you implement a Patricia trie using SQL?",
    options: [
      "Using compressed paths with bit testing",
      "Regular trie",
      "Not possible",
      "B-tree only",
    ],
    correctAnswer: 0,
    explanation:
      "Patricia tries can use SQL tables storing nodes with compressed paths (skipping single-child nodes) and bit-level testing for efficient string matching.",
  },
  {
    id: 392,
    category: "SQL",
    difficulty: "expert",
    question: "What is the difference between a sort-merge and hash semi-join?",
    options: [
      "Sort-merge needs sorting, hash uses hash table",
      "No difference",
      "Hash needs sorting",
      "Sort-merge uses hash",
    ],
    correctAnswer: 0,
    explanation:
      "Sort-merge semi-joins sort both inputs and merge them, while hash semi-joins build a hash table from the inner table and probe with the outer table.",
  },
  {
    id: 393,
    category: "SQL",
    difficulty: "expert",
    question: "How would you implement a suffix tree using SQL?",
    options: [
      "Using compressed tries with suffix links",
      "Regular tree",
      "Not possible",
      "Binary tree only",
    ],
    correctAnswer: 0,
    explanation:
      "Suffix trees can use SQL tables storing compressed tries with edge labels and suffix links, enabling linear time pattern searches in text.",
  },
  {
    id: 394,
    category: "SQL",
    difficulty: "expert",
    question:
      "What is the difference between a clustered and non-clustered zone map?",
    options: [
      "Clustered is per-segment, non-clustered is global",
      "No difference",
      "Non-clustered is per-segment",
      "Clustered is global",
    ],
    correctAnswer: 0,
    explanation:
      "Clustered zone maps store min/max values per data segment, while non-clustered zone maps may provide global or alternative granularities of zone information.",
  },
  {
    id: 395,
    category: "SQL",
    difficulty: "expert",
    question: "How would you implement a Fenwick tree using SQL?",
    options: [
      "Using binary indexed tree with bit manipulation",
      "Regular tree",
      "Not possible",
      "B-tree only",
    ],
    correctAnswer: 0,
    explanation:
      "Fenwick trees can use SQL tables storing nodes with binary indexed structure, using bit operations (LSB) for efficient prefix sum queries and updates.",
  },
  {
    id: 396,
    category: "SQL",
    difficulty: "expert",
    question:
      "What is the difference between a zig-zag and merge join in sorted data?",
    options: [
      "Zig-zag alternates pointers, merge walks both",
      "No difference",
      "Merge alternates",
      "Zig-zag walks both",
    ],
    correctAnswer: 0,
    explanation:
      "Zig-zag joins alternate advancing pointers based on comparison, while merge joins walk through both sorted inputs systematically, with zig-zag potentially having better cache locality.",
  },
  {
    id: 397,
    category: "SQL",
    difficulty: "expert",
    question: "How would you implement a segment tree using SQL?",
    options: [
      "Using binary tree for range queries with lazy propagation",
      "Regular tree",
      "Not possible",
      "B-tree only",
    ],
    correctAnswer: 0,
    explanation:
      "Segment trees can use SQL tables storing binary tree nodes representing intervals, with lazy propagation flags for efficient range queries and updates.",
  },
  {
    id: 398,
    category: "SQL",
    difficulty: "expert",
    question:
      "What is the difference between a nested loop and block nested loop join?",
    options: [
      "Block processes groups, nested processes single rows",
      "No difference",
      "Nested processes groups",
      "Block processes single",
    ],
    correctAnswer: 0,
    explanation:
      "Block nested loop joins process groups of rows (blocks) from the outer table to improve cache utilization, while nested loop joins process one outer row at a time.",
  },
  {
    id: 399,
    category: "SQL",
    difficulty: "expert",
    question: "How would you implement a heavy hitter algorithm using SQL?",
    options: [
      "Using Misra-Gries or Count-Min Sketch",
      "GROUP BY only",
      "Not possible",
      "Regular counting",
    ],
    correctAnswer: 0,
    explanation:
      "Heavy hitter detection can use SQL implementations of Misra-Gries algorithm (frequent elements with limited counters) or Count-Min Sketch for space-efficient frequency estimation.",
  },
  {
    id: 400,
    category: "SQL",
    difficulty: "expert",
    question:
      "What is the most important consideration when designing a distributed SQL database for global deployment?",
    options: [
      "CAP theorem trade-offs and latency vs consistency",
      "Storage capacity",
      "CPU speed",
      "Network bandwidth",
    ],
    correctAnswer: 0,
    explanation:
      "Global distributed SQL databases must carefully balance CAP theorem trade-offs, considering latency implications of consistency requirements, data placement for locality, and partition tolerance across geographic regions.",
  },
];

//  questions
export const oopMCQs = [
  {
    id: 1,
    category: "OOP",
    difficulty: "easy",
    question: "What does OOP stand for?",
    options: [
      "Object Oriented Programming",
      "Open Operating Platform",
      "Optimized Object Processing",
      "Organized Operation Procedure",
    ],
    correctAnswer: 0,
    explanation:
      "OOP stands for Object-Oriented Programming, a programming paradigm based on the concept of objects containing data and methods.",
  },
  {
    id: 2,
    category: "OOP",
    difficulty: "medium",
    question:
      "In Python, which method is automatically called when an object is created?",
    options: ["__init__", "__new__", "__create__", "__start__"],
    correctAnswer: 0,
    explanation:
      "__init__ is the constructor method in Python that is invoked immediately after an object is created.",
  },
  {
    id: 3,
    category: "OOP",
    difficulty: "hard",
    question:
      "How can you implement true private attributes in Python (as of 3.9+)?",
    options: [
      "Using __name mangling only",
      "Using @property with no setter",
      "Using typing.TypedDict",
      "Using __slots__ and module-level encapsulation",
    ],
    correctAnswer: 3,
    explanation:
      "While __name mangling provides strong privacy hints, the closest to 'true' private is combining __slots__ with module-level encapsulation and no public accessors.",
  },
  {
    id: 4,
    category: "OOP",
    difficulty: "medium",
    question:
      "In JavaScript, what is the difference between a factory function and a constructor function?",
    options: [
      "Factory uses new, constructor does not",
      "Factory returns an object explicitly, constructor uses new and this",
      "There is no difference",
      "Factory is async, constructor is sync",
    ],
    correctAnswer: 1,
    explanation:
      "A factory function returns an object explicitly without new, whereas a constructor function is meant to be called with new and uses this.",
  },
  {
    id: 5,
    category: "OOP",
    difficulty: "hard",
    question:
      "Which Python descriptor protocol method is triggered when you assign to a property?",
    options: ["__set__", "__setattr__", "__setitem__", "__assign__"],
    correctAnswer: 0,
    explanation:
      "__set__ is part of the descriptor protocol and is invoked on assignment to a property.",
  },
  {
    id: 6,
    category: "OOP",
    difficulty: "medium",
    question:
      "In JS, what does the super keyword do inside a derived class constructor?",
    options: [
      "Calls the parent class constructor",
      "Creates a new instance",
      "Binds the prototype",
      "Returns the parent class",
    ],
    correctAnswer: 0,
    explanation:
      "super() must be called before using this in a derived class to invoke the parent constructor.",
  },
  {
    id: 7,
    category: "OOP",
    difficulty: "hard",
    question: "How can you prevent subclassing a Python class?",
    options: [
      "Using @final decorator (PEP 591)",
      "Using __slots__ = ()",
      "Raising TypeError in __init_subclass__",
      "All of the above",
    ],
    correctAnswer: 3,
    explanation:
      "@final, empty __slots__, or overriding __init_subclass__ to raise can all block subclassing.",
  },
  {
    id: 8,
    category: "OOP",
    difficulty: "medium",
    question: "What is the primary purpose of the Mixin pattern in JavaScript?",
    options: [
      "Multiple inheritance via object composition",
      "Creating singletons",
      "Enforcing immutability",
      "Async iteration",
    ],
    correctAnswer: 0,
    explanation:
      "Mixins allow composing behaviors from multiple sources without classical multiple inheritance.",
  },
  {
    id: 9,
    category: "OOP",
    difficulty: "hard",
    question:
      "In Python, which special method controls how an object behaves with the @ operator?",
    options: ["__matmul__", "__at__", "__multiply__", "__dot__"],
    correctAnswer: 0,
    explanation:
      "__matmul__ and its reverse __rmatmul__ implement the @ matrix multiplication operator.",
  },
  {
    id: 10,
    category: "OOP",
    difficulty: "medium",
    question:
      "What is the difference between Object.create and new Function() in JavaScript?",
    options: [
      "Object.create sets prototype without calling constructor; new invokes it",
      "They are identical",
      "Object.create cannot set prototype",
      "new Function() is deprecated",
    ],
    correctAnswer: 0,
    explanation:
      "Object.create links prototype but does not execute the constructor function.",
  },
  {
    id: 11,
    category: "OOP",
    difficulty: "hard",
    question: "How do you implement a thread-safe singleton in Python?",
    options: [
      "Using a metaclass with double-checked locking",
      "Using __new__ with threading.Lock",
      "Using a module-level variable",
      "All of the above",
    ],
    correctAnswer: 3,
    explanation:
      "All approaches can achieve thread-safety; modules are naturally singleton and thread-safe.",
  },
  {
    id: 12,
    category: "OOP",
    difficulty: "medium",
    question:
      "What is the output of the following Python code?\n\nclass A:\n    x = 1\n\nclass B(A):\n    pass\n\nB.x = 2\nprint(A.x, B.x)",
    options: ["1 2", "2 2", "1 1", "AttributeError"],
    correctAnswer: 0,
    explanation:
      "Class variables are inherited but separate; setting B.x does not mutate A.x.",
  },
  {
    id: 13,
    category: "OOP",
    difficulty: "hard",
    question: "In JavaScript, how can you intercept property deletion?",
    options: [
      "Using deleteProperty proxy trap",
      "Using __delete__",
      "Using Object.preventExtensions",
      "You cannot intercept it",
    ],
    correctAnswer: 0,
    explanation:
      "The deleteProperty trap of a Proxy can intercept and veto delete operations.",
  },
  {
    id: 14,
    category: "OOP",
    difficulty: "medium",
    question:
      "Which Python decorator automatically generates comparison methods?",
    options: [
      "@dataclass(order=True)",
      "@total_ordering",
      "@compare",
      "@auto_cmp",
    ],
    correctAnswer: 0,
    explanation:
      "@dataclass with order=True generates __lt__, __le__, __gt__, __ge__ based on fields.",
  },
  {
    id: 15,
    category: "OOP",
    difficulty: "hard",
    question:
      "What is the difference between __getattribute__ and __getattr__ in Python?",
    options: [
      "__getattribute__ is always called; __getattr__ only if attribute missing",
      "They are aliases",
      "__getattr__ is called first",
      "__getattribute__ only exists in metaclasses",
    ],
    correctAnswer: 0,
    explanation:
      "__getattribute__ intercepts every attribute access, while __getattr__ is a fallback when the attribute is not found.",
  },
  {
    id: 16,
    category: "OOP",
    difficulty: "medium",
    question: "In JS, what does Object.setPrototypeOf return?",
    options: [
      "The modified object",
      "undefined",
      "The old prototype",
      "A new object",
    ],
    correctAnswer: 0,
    explanation:
      "Object.setPrototypeOf returns the first argument (the modified object) for chaining.",
  },
  {
    id: 17,
    category: "OOP",
    difficulty: "hard",
    question: "How can you create an immutable record type in Python 3.11+?",
    options: [
      "Using typing.TypedDict(total=False) with @final",
      "Using dataclasses with frozen=True and slots=True",
      "Using types.MappingProxyType",
      "All of the above",
    ],
    correctAnswer: 1,
    explanation:
      "frozen=True prevents mutation; slots=True blocks dynamic attribute addition, giving closest immutable record semantics.",
  },
  {
    id: 18,
    category: "OOP",
    difficulty: "medium",
    question: "What is the primary benefit of the Flyweight pattern?",
    options: [
      "Memory efficiency by sharing intrinsic state",
      "CPU optimization",
      "Network latency reduction",
      "Improved readability",
    ],
    correctAnswer: 0,
    explanation:
      "Flyweight minimizes memory by sharing common data among many similar objects.",
  },
  {
    id: 19,
    category: "OOP",
    difficulty: "hard",
    question:
      "In JavaScript, how can you implement private fields that are truly private at runtime?",
    options: [
      "Using # prefix syntax (private class fields)",
      "Using Symbol",
      "Using WeakMap",
      "Both A and C",
    ],
    correctAnswer: 3,
    explanation:
      "# fields are language-level private; WeakMap can also encapsulate data outside the object.",
  },
  {
    id: 20,
    category: "OOP",
    difficulty: "medium",
    question:
      "Which Python method is invoked when an instance is called like a function?",
    options: ["__call__", "__invoke__", "__run__", "__execute__"],
    correctAnswer: 0,
    explanation: "Defining __call__ makes an instance callable via obj().",
  },
  {
    id: 21,
    category: "OOP",
    difficulty: "hard",
    question:
      "What is the output of the following JavaScript code?\n\nclass Base {\n  static who = 'Base';\n  static log() { console.log(this.who); }\n}\nclass Derived extends Base {\n  static who = 'Derived';\n}\nDerived.log();",
    options: ["Derived", "Base", "undefined", "TypeError"],
    correctAnswer: 0,
    explanation:
      "Static methods are called with this pointing to the constructor function (Derived), so this.who is 'Derived'.",
  },
  {
    id: 22,
    category: "OOP",
    difficulty: "medium",
    question:
      "What does the Observer pattern typically use to notify subscribers?",
    options: [
      "A callback or listener interface",
      "Polling loop",
      "Shared memory",
      "Database triggers",
    ],
    correctAnswer: 0,
    explanation:
      "Observers register callbacks that the subject invokes when state changes.",
  },
  {
    id: 23,
    category: "OOP",
    difficulty: "hard",
    question:
      "In Python, which special method controls how an object behaves with the `await` keyword?",
    options: ["__await__", "__async__", "__iter__", "__next__"],
    correctAnswer: 0,
    explanation:
      "__await__ must return an iterator; it makes an object awaitable.",
  },
  {
    id: 24,
    category: "OOP",
    difficulty: "medium",
    question:
      "In JS, what is the difference between Object.freeze and Object.seal?",
    options: [
      "Freeze makes values immutable; seal only prevents adding/removing properties",
      "They are identical",
      "Seal freezes prototypes",
      "Freeze allows configuration changes",
    ],
    correctAnswer: 0,
    explanation:
      "Freeze prevents value changes and reconfiguration; seal only blocks addition/deletion and makes existing properties non-configurable.",
  },
  {
    id: 25,
    category: "OOP",
    difficulty: "hard",
    question:
      "How can you implement a compile-time only brand in TypeScript to make nominal types?",
    options: [
      "type USD = number & { readonly _brand: unique symbol }",
      "type USD = number",
      "interface USD { value: number }",
      "type USD = number | unique symbol",
    ],
    correctAnswer: 0,
    explanation:
      "Intersection with a unique-symbol brand creates a compile-time distinct subtype of number.",
  },
  {
    id: 26,
    category: "OOP",
    difficulty: "medium",
    question: "What is the main intent of the Strategy pattern?",
    options: [
      "Encapsulate interchangeable algorithms",
      "Create single-instance objects",
      "Force inheritance",
      "Hide object creation",
    ],
    correctAnswer: 0,
    explanation:
      "Strategy lets the algorithm vary independently from clients that use it.",
  },
  {
    id: 27,
    category: "OOP",
    difficulty: "hard",
    question:
      "In Python, how do you enforce that a subclass must override a method?",
    options: [
      "Raise NotImplementedError in the base method",
      "Use @abstractmethod from abc",
      "Use typing.overload",
      "Both A and B",
    ],
    correctAnswer: 3,
    explanation:
      "@abstractmethod is the canonical way; raising NotImplementedError is a runtime fallback.",
  },
  {
    id: 28,
    category: "OOP",
    difficulty: "medium",
    question:
      "What is the output of the following Python code?\n\nclass A:\n    def __eq__(self, other):\n        return True\n\nprint(A() == 1, A() is None)",
    options: ["True False", "True True", "False False", "TypeError"],
    correctAnswer: 0,
    explanation:
      "== uses __eq__ (returns True), whereas is tests identity (always False for distinct objects).",
  },
  {
    id: 29,
    category: "OOP",
    difficulty: "hard",
    question: "In JavaScript, how can you intercept the `in` operator?",
    options: [
      "Using the has Proxy trap",
      "Using __in__",
      "Using Object.defineProperty",
      "You cannot intercept it",
    ],
    correctAnswer: 0,
    explanation:
      "The has trap of a Proxy is triggered when the `in` operator is used.",
  },
  {
    id: 30,
    category: "OOP",
    difficulty: "medium",
    question: "Which Python decorator automatically generates a repr string?",
    options: ["@dataclass", "@auto_repr", "@repr", "@str"],
    correctAnswer: 0,
    explanation: "@dataclass generates __repr__ automatically based on fields.",
  },
  {
    id: 31,
    category: "OOP",
    difficulty: "hard",
    question:
      "What is the difference between __slots__ and __dict__ in Python?",
    options: [
      "__slots__ predefines attributes and avoids __dict__, saving memory",
      "__slots__ is an alias for __dict__",
      "__slots__ only works with metaclasses",
      "__dict__ is faster than __slots__",
    ],
    correctAnswer: 0,
    explanation:
      "__slots__ reserves space for declared attributes and suppresses the per-instance __dict__, reducing memory.",
  },
  {
    id: 32,
    category: "OOP",
    difficulty: "medium",
    question:
      "In JS, what does the Composite pattern treat individual objects and compositions as?",
    options: [
      "A common interface or base class",
      "Separate hierarchies",
      "Only leaves",
      "Only branches",
    ],
    correctAnswer: 0,
    explanation:
      "Composite lets clients treat single objects and compositions uniformly via a shared interface.",
  },
  {
    id: 33,
    category: "OOP",
    difficulty: "hard",
    question: "How can you create a weakly referenced singleton in Python?",
    options: [
      "Using weakref.ref around the instance cache",
      "Using __weakref__ slot",
      "Using WeakValueDictionary",
      "Both A and C",
    ],
    correctAnswer: 3,
    explanation:
      "Storing the singleton in a WeakValueDictionary or wrapping it with weakref.ref allows GC when no strong references remain.",
  },
  {
    id: 34,
    category: "OOP",
    difficulty: "medium",
    question: "What is the primary goal of the Dependency Inversion Principle?",
    options: [
      "Depend on abstractions, not concretions",
      "Increase coupling",
      "Reduce cohesion",
      "Use only static methods",
    ],
    correctAnswer: 0,
    explanation:
      "DIP states that high-level modules should not depend on low-level modules, but both should depend on abstractions.",
  },
  {
    id: 35,
    category: "OOP",
    difficulty: "hard",
    question: "In JavaScript, how can you implement a private static field?",
    options: [
      "static #field = 1;",
      "private static field = 1;",
      "static _field = 1;",
      "static field = 1; Object.freeze(this);",
    ],
    correctAnswer: 0,
    explanation:
      "The # prefix inside a class body creates a private static field accessible only within the class.",
  },
  {
    id: 36,
    category: "OOP",
    difficulty: "medium",
    question:
      "What Python special method is invoked during pickle serialization?",
    options: ["__reduce__", "__pickle__", "__serialize__", "__dump__"],
    correctAnswer: 0,
    explanation:
      "__reduce__ returns a tuple that allows reconstructing the object during unpickling.",
  },
  {
    id: 37,
    category: "OOP",
    difficulty: "hard",
    question:
      "What is the output of the following JavaScript code?\n\nclass A {\n  #x = 1;\n  getX() { return this.#x; }\n}\nconst a = new A();\nconsole.log('#x' in a, a.hasOwnProperty('getX'));",
    options: ["false true", "true false", "false false", "true true"],
    correctAnswer: 0,
    explanation:
      "Private fields are not exposed to reflection; getX is a public method and exists on the instance.",
  },
  {
    id: 38,
    category: "OOP",
    difficulty: "medium",
    question:
      "Which pattern provides a surrogate or placeholder for another object?",
    options: ["Proxy", "Adapter", "Decorator", "Bridge"],
    correctAnswer: 0,
    explanation:
      "Proxy controls access to the real object, possibly adding lazy loading, security, or caching.",
  },
  {
    id: 39,
    category: "OOP",
    difficulty: "hard",
    question:
      "In Python, how do you implement a custom metaclass that enforces singleton behavior?",
    options: [
      "Override __call__ in the metaclass to return the same instance",
      "Override __new__ in the base class",
      "Use __init_subclass__",
      "Both A and B",
    ],
    correctAnswer: 3,
    explanation:
      "The metaclass can control instance creation via __call__, and the class can also cooperate via __new__.",
  },
  {
    id: 40,
    category: "OOP",
    difficulty: "medium",
    question: "In JS, what does Object.fromEntries do?",
    options: [
      "Converts an iterable of [key, value] pairs into an object",
      "Creates a Map from an object",
      "Freezes an object",
      "Returns entries array",
    ],
    correctAnswer: 0,
    explanation:
      "Object.fromEntries is the inverse of Object.entries, turning key-value pairs into an object.",
  },
  {
    id: 41,
    category: "OOP",
    difficulty: "hard",
    question: "How can you implement a compile-time mixin in TypeScript?",
    options: [
      "Using intersection types and generic class factories",
      "Using extends only",
      "Using implements only",
      "Not possible",
    ],
    correctAnswer: 0,
    explanation:
      "A generic function that returns an anonymous class expression can mix in behaviors at compile time via intersections.",
  },
  {
    id: 42,
    category: "OOP",
    difficulty: "medium",
    question: "What is the main intent of the Open/Closed Principle?",
    options: [
      "Open for extension, closed for modification",
      "Open for modification, closed for extension",
      "Use only final classes",
      "Avoid inheritance",
    ],
    correctAnswer: 0,
    explanation:
      "OCP states that entities should be extendable without changing their source code.",
  },
  {
    id: 43,
    category: "OOP",
    difficulty: "hard",
    question:
      "In Python, which method must return an iterator and is triggered by iter(obj)?",
    options: ["__iter__", "__next__", "__getitem__", "__call__"],
    correctAnswer: 0,
    explanation:
      "__iter__ returns an iterator object; __next__ is called on that iterator.",
  },
  {
    id: 44,
    category: "OOP",
    difficulty: "medium",
    question: "What is the difference between isinstance and type in Python?",
    options: [
      "isinstance respects inheritance; type does not",
      "They are identical",
      "type is faster",
      "isinstance only works with built-ins",
    ],
    correctAnswer: 0,
    explanation:
      "isinstance checks against the method resolution order, while type returns the exact class.",
  },
  {
    id: 45,
    category: "OOP",
    difficulty: "hard",
    question: "In JavaScript, how can you intercept the new operator?",
    options: [
      "Using the construct Proxy trap",
      "Using __construct__",
      "Using Reflect.construct",
      "You cannot intercept it",
    ],
    correctAnswer: 0,
    explanation:
      "The construct trap of a Proxy is invoked when the proxy is called with new.",
  },
  {
    id: 46,
    category: "OOP",
    difficulty: "medium",
    question:
      "Which Python module provides an immutable namespace-like object?",
    options: [
      "types.SimpleNamespace",
      "collections.namedtuple",
      "dataclasses.dataclass",
      "typing.NamedTuple",
    ],
    correctAnswer: 1,
    explanation:
      "namedtuple creates tuple subclasses with named fields that are immutable.",
  },
  {
    id: 47,
    category: "OOP",
    difficulty: "hard",
    question:
      "What is the output of the following Python code?\n\nclass Meta(type):\n    def __prepare__(name, bases, **kw):\n        return {'x': 1}\nclass A(metaclass=Meta):\n    pass\nprint(A.x)",
    options: ["1", "AttributeError", "0", "None"],
    correctAnswer: 0,
    explanation:
      "__prepare__ returns the namespace dict used during class creation, so x becomes a class attribute.",
  },
  {
    id: 48,
    category: "OOP",
    difficulty: "medium",
    question: "In JS, what does the Bridge pattern decouple?",
    options: [
      "Abstraction from implementation",
      "Observer from subject",
      "Factory from product",
      "Proxy from real subject",
    ],
    correctAnswer: 0,
    explanation:
      "Bridge lets both vary independently by composition rather than inheritance.",
  },
  {
    id: 49,
    category: "OOP",
    difficulty: "hard",
    question:
      "How can you implement a lazy property in Python that is computed once and cached?",
    options: [
      "Using a descriptor with __get__ that caches the result on the instance",
      "Using @property without setter",
      "Using __slots__",
      "Using @lru_cache on the class",
    ],
    correctAnswer: 0,
    explanation:
      "A non-data descriptor can compute the value once, store it on the instance under a private name, and return it on subsequent accesses.",
  },
  {
    id: 50,
    category: "OOP",
    difficulty: "medium",
    question: "What is the main benefit of the Command pattern?",
    options: [
      "Encapsulates requests as objects, enabling queuing and undo",
      "Reduces memory usage",
      "Speeds up method calls",
      "Eliminates inheritance",
    ],
    correctAnswer: 0,
    explanation:
      "Command turns requests into objects, allowing parameterization, queuing, logging, and undo.",
  },
  {
    id: 51,
    category: "OOP",
    difficulty: "hard",
    question:
      "In JavaScript, how can you create an object with a null prototype?",
    options: [
      "Object.create(null)",
      "new Object(null)",
      "{}",
      "Object.setPrototypeOf({}, null)",
    ],
    correctAnswer: 0,
    explanation:
      "Object.create(null) produces a pure dictionary with no prototype chain.",
  },
  {
    id: 52,
    category: "OOP",
    difficulty: "medium",
    question: "Which Python special method is called by the `del` statement?",
    options: ["__del__", "__delete__", "__delattr__", "__remove__"],
    correctAnswer: 2,
    explanation:
      "__delattr__ is invoked when del obj.attr is executed; __del__ is the finalizer.",
  },
  {
    id: 53,
    category: "OOP",
    difficulty: "hard",
    question:
      "What is the output of the following JavaScript code?\n\nconst obj = { a: 1 };\nObject.setPrototypeOf(obj, { b: 2 });\nconsole.log(Object.keys(obj).length, obj.b);",
    options: ["1 2", "2 2", "1 undefined", "2 undefined"],
    correctAnswer: 0,
    explanation:
      "Object.keys only lists own enumerable properties; prototype properties are not included, but accessible via delegation.",
  },
  {
    id: 54,
    category: "OOP",
    difficulty: "medium",
    question: "What does the Memento pattern capture?",
    options: [
      "The internal state of an object without violating encapsulation",
      "The class hierarchy",
      "The factory method",
      "The observer list",
    ],
    correctAnswer: 0,
    explanation:
      "Memento saves state so the object can be restored later without exposing internals.",
  },
  {
    id: 55,
    category: "OOP",
    difficulty: "hard",
    question:
      "In Python, how do you implement a final class (non-subclassable) without a decorator?",
    options: [
      "Raise TypeError in __init_subclass__",
      "Set __slots__ = ()",
      "Use metaclass that returns None",
      "Delete __class__",
    ],
    correctAnswer: 0,
    explanation:
      "Overriding __init_subclass__ to raise TypeError prevents any subclass from being created.",
  },
  {
    id: 56,
    category: "OOP",
    difficulty: "medium",
    question: "In JS, what is the difference between a mixin and inheritance?",
    options: [
      "Mixin copies properties; inheritance delegates via prototype chain",
      "Mixin is slower",
      "They are identical",
      "Mixin only works with classes",
    ],
    correctAnswer: 0,
    explanation:
      "Mixins typically copy or assign properties, whereas inheritance sets up a delegation chain.",
  },
  {
    id: 57,
    category: "OOP",
    difficulty: "hard",
    question:
      "How can you implement a thread-safe lazy singleton in JavaScript?",
    options: [
      "Using a Proxy with a locked check",
      "Using Atomics.wait",
      "Using a module (ESM are singleton)",
      "Both A and C",
    ],
    correctAnswer: 2,
    explanation:
      "ES modules are evaluated once and cached, providing natural thread-safe singleton semantics in the main thread.",
  },
  {
    id: 58,
    category: "OOP",
    difficulty: "medium",
    question:
      "Which Python class decorator generates __init__, __repr__, __eq__, etc., from type hints?",
    options: ["@dataclass", "@attrs.define", "@auto_init", "@generate"],
    correctAnswer: 0,
    explanation:
      "@dataclass in the dataclasses module auto-generates common dunder methods based on annotated fields.",
  },
  {
    id: 59,
    category: "OOP",
    difficulty: "hard",
    question:
      "In JavaScript, how can you intercept property enumeration (for...in)?",
    options: [
      "Using the ownKeys Proxy trap",
      "Using __enumerate__",
      "Using Object.defineProperty enumerable flag",
      "You cannot intercept it",
    ],
    correctAnswer: 0,
    explanation:
      "The ownKeys trap can filter or reorder the keys seen by for...in and Object.keys.",
  },
  {
    id: 60,
    category: "OOP",
    difficulty: "medium",
    question: "What is the main intent of the Liskov Substitution Principle?",
    options: [
      "Subtypes must be substitutable for their base types without breaking the program",
      "All classes must be sealed",
      "Use only interfaces",
      "Avoid inheritance",
    ],
    correctAnswer: 0,
    explanation:
      "LSP ensures that objects of a superclass shall be replaceable with objects of subclasses without altering correctness.",
  },
  {
    id: 61,
    category: "OOP",
    difficulty: "hard",
    question:
      "In Python, which method must return an awaitable when implementing an async context manager?",
    options: ["__aenter__", "__enter__", "__await__", "__async__"],
    correctAnswer: 0,
    explanation:
      "__aenter__ and __aexit__ must return awaitables; they are used by async with.",
  },
  {
    id: 62,
    category: "OOP",
    difficulty: "medium",
    question: "What is the difference between Adapter and Decorator patterns?",
    options: [
      "Adapter changes interface; Decorator adds behavior transparently",
      "They are identical",
      "Adapter only works with classes",
      "Decorator only works with functions",
    ],
    correctAnswer: 0,
    explanation:
      "Adapter converts one interface to another; Decorator augments behavior while preserving the original interface.",
  },
  {
    id: 63,
    category: "OOP",
    difficulty: "hard",
    question:
      "How can you implement a compile-time mixin in Python using typing?",
    options: [
      "Using Protocol and multiple inheritance with structural subtyping",
      "Using @overload",
      "Using cast",
      "Not possible",
    ],
    correctAnswer: 0,
    explanation:
      "Protocols allow structural mixin-like behavior where classes implement required methods to satisfy the protocol.",
  },
  {
    id: 64,
    category: "OOP",
    difficulty: "medium",
    question: "In JS, what does the Visitor pattern allow?",
    options: [
      "Adding operations to objects without modifying their classes",
      "Visiting DOM nodes",
      "Iterating arrays",
      "Creating closures",
    ],
    correctAnswer: 0,
    explanation:
      "Visitor moves operations into separate visitor objects, enabling open/extension for new operations.",
  },
  {
    id: 65,
    category: "OOP",
    difficulty: "hard",
    question:
      "What is the output of the following Python code?\n\nclass A:\n    def __getattr__(self, name):\n        return 42\n\na = A()\nprint(hasattr(a, 'x'), a.x)",
    options: [
      "True 42",
      "False 42",
      "True AttributeError",
      "False AttributeError",
    ],
    correctAnswer: 0,
    explanation:
      "hasattr internally calls getattr and swallows exceptions, so it returns True because __getattr__ provides a value.",
  },
  {
    id: 66,
    category: "OOP",
    difficulty: "medium",
    question:
      "Which Python special method is invoked by the `with` statement for cleanup?",
    options: ["__exit__", "__enter__", "__del__", "__close__"],
    correctAnswer: 0,
    explanation:
      "__exit__ is called when exiting the with block, even if an exception occurs.",
  },
  {
    id: 67,
    category: "OOP",
    difficulty: "hard",
    question:
      "In JavaScript, how can you create a truly private method that is inaccessible outside the class?",
    options: [
      "Using #methodName syntax",
      "Using Symbol",
      "Using WeakMap",
      "Both A and C",
    ],
    correctAnswer: 0,
    explanation:
      "#methodName is language-level private and cannot be accessed outside the class body.",
  },
  {
    id: 68,
    category: "OOP",
    difficulty: "medium",
    question:
      "What is the main benefit of the Factory Method pattern over direct instantiation?",
    options: [
      "Decouples client from concrete classes",
      "Speeds up creation",
      "Reduces memory",
      "Eliminates constructors",
    ],
    correctAnswer: 0,
    explanation:
      "Factory Method lets subclasses decide which concrete class to instantiate, keeping client code generic.",
  },
  {
    id: 69,
    category: "OOP",
    difficulty: "hard",
    question:
      "In Python, how do you implement a descriptor that is both a data and non-data descriptor?",
    options: [
      "Provide both __get__ and __set__; remove __set__ to become non-data",
      "Provide __get__ only",
      "Provide __set__ only",
      "Not possible",
    ],
    correctAnswer: 0,
    explanation:
      "A descriptor with __set__ is a data descriptor; removing __set__ turns it into a non-data descriptor, changing lookup precedence.",
  },
  {
    id: 70,
    category: "OOP",
    difficulty: "medium",
    question: "In JS, what does the Module pattern encapsulate?",
    options: [
      "Both data and behavior in a closure",
      "Only functions",
      "Only variables",
      "Prototype chain",
    ],
    correctAnswer: 0,
    explanation:
      "Module pattern uses closures to hide private data and expose public APIs.",
  },
  {
    id: 71,
    category: "OOP",
    difficulty: "hard",
    question:
      "What is the output of the following JavaScript code?\n\nclass A {\n  static #priv = 1;\n  static getPriv() { return A.#priv; }\n}\nclass B extends A {}\nconsole.log(B.getPriv());",
    options: ["1", "undefined", "TypeError", "ReferenceError"],
    correctAnswer: 0,
    explanation:
      "Private static fields are scoped to the declaring class, but public static methods can still access them via the class name.",
  },
  {
    id: 72,
    category: "OOP",
    difficulty: "medium",
    question:
      "Which Python class decorator provides automatic ordering methods from a single method?",
    options: ["@total_ordering", "@order", "@compare", "@rank"],
    correctAnswer: 0,
    explanation:
      "@total_ordering generates missing comparison methods from __eq__ and one of __lt__, __le__, __gt__, or __ge__.",
  },
  {
    id: 73,
    category: "OOP",
    difficulty: "hard",
    question:
      "How can you implement a final method in Python (non-overridable)?",
    options: [
      "Use @final decorator (PEP 591) on the method",
      "Raise TypeError in __init_subclass__ if overridden",
      "Use __slots__",
      "Both A and B",
    ],
    correctAnswer: 3,
    explanation:
      "@final marks the method as final statically; runtime enforcement can be added in __init_subclass__.",
  },
  {
    id: 74,
    category: "OOP",
    difficulty: "medium",
    question: "What is the main intent of the Abstract Factory pattern?",
    options: [
      "Provide an interface for creating families of related objects",
      "Create a single object",
      "Hide singleton instances",
      "Convert interfaces",
    ],
    correctAnswer: 0,
    explanation:
      "Abstract Factory creates families of products that are designed to work together.",
  },
  {
    id: 75,
    category: "OOP",
    difficulty: "hard",
    question: "In JavaScript, how can you intercept the instanceof operator?",
    options: [
      "Using Symbol.hasInstance",
      "Using __instanceof__",
      "Using Proxy.has",
      "You cannot intercept it",
    ],
    correctAnswer: 0,
    explanation:
      "Symbol.hasInstance lets a class or function customize instanceof behavior.",
  },
  {
    id: 76,
    category: "OOP",
    difficulty: "medium",
    question: "What Python special method is called by copy.deepcopy?",
    options: ["__deepcopy__", "__copy__", "__clone__", "__duplicate__"],
    correctAnswer: 0,
    explanation:
      "If __deepcopy__ is defined, deepcopy uses it; otherwise it recursively copies attributes.",
  },
  {
    id: 77,
    category: "OOP",
    difficulty: "hard",
    question:
      "What is the output of the following Python code?\n\nclass A:\n    __slots__ = ('x',)\n\na = A()\na.x = 1\na.y = 2",
    options: ["AttributeError", "1 2", "1", "TypeError"],
    correctAnswer: 0,
    explanation:
      "__slots__ restricts attribute creation; assigning to y raises AttributeError.",
  },
  {
    id: 78,
    category: "OOP",
    difficulty: "medium",
    question: "In JS, what does Object.assign do with getters?",
    options: [
      "Copies enumerable own properties (invoking getters)",
      "Copies descriptors",
      "Skips getters",
      "Throws on getters",
    ],
    correctAnswer: 0,
    explanation:
      "Object.assign performs a shallow copy of enumerable own properties, invoking getters and copying the returned values.",
  },
  {
    id: 79,
    category: "OOP",
    difficulty: "hard",
    question: "How can you implement a weakly referenced cache in JavaScript?",
    options: [
      "Using WeakMap with object keys",
      "Using Map",
      "Using Set",
      "Using Array",
    ],
    correctAnswer: 0,
    explanation:
      "WeakMap allows garbage collection of keys when no other references exist, making it ideal for caches.",
  },
  {
    id: 80,
    category: "OOP",
    difficulty: "medium",
    question:
      "Which pattern encapsulates a set of operations and supports undo?",
    options: ["Command", "Strategy", "State", "Observer"],
    correctAnswer: 0,
    explanation:
      "Command stores enough information to reverse the operation, enabling undo/redo.",
  },
  {
    id: 81,
    category: "OOP",
    difficulty: "hard",
    question:
      "In Python, how do you implement a context manager without a class?",
    options: [
      "Using contextlib.contextmanager decorator on a generator",
      "Using __enter__ and __exit__ only",
      "Using with statement only",
      "Not possible",
    ],
    correctAnswer: 0,
    explanation:
      "@contextmanager turns a generator that yields once into a context manager, splitting code before and after yield into __enter__ and __exit__.",
  },
  {
    id: 82,
    category: "OOP",
    difficulty: "medium",
    question: "What is the main benefit of the State pattern?",
    options: [
      "Encapsulates state-specific behavior and transitions",
      "Reduces class count",
      "Eliminates if statements completely",
      "Speeds up execution",
    ],
    correctAnswer: 0,
    explanation:
      "State delegates behavior to state objects, avoiding large conditional blocks and centralizing transitions.",
  },
  {
    id: 83,
    category: "OOP",
    difficulty: "hard",
    question:
      "In JavaScript, how can you create a private field that is shared among all instances of a class?",
    options: [
      "Use a WeakMap scoped outside the class",
      "Use #field inside the class",
      "Use Symbol",
      "Use var inside constructor",
    ],
    correctAnswer: 0,
    explanation:
      "A WeakMap declared outside the class but used inside can store private per-instance data shared across all instances.",
  },
  {
    id: 84,
    category: "OOP",
    difficulty: "medium",
    question: "Which Python special method is invoked by the `in` operator?",
    options: ["__contains__", "__iter__", "__getitem__", "__in__"],
    correctAnswer: 0,
    explanation:
      "__contains__ returns a boolean for membership tests; if missing, Python falls back to __iter__ or __getitem__.",
  },
  {
    id: 85,
    category: "OOP",
    difficulty: "hard",
    question:
      "What is the output of the following JavaScript code?\n\nclass A {\n  static { console.log('static A'); }\n}\nclass B extends A {\n  static { console.log('static B'); }\n}\nnew B();",
    options: ["static A static B", "static B static A", "static A", "static B"],
    correctAnswer: 0,
    explanation:
      "Static blocks execute in declaration order during class evaluation, so A’s runs before B’s.",
  },
  {
    id: 86,
    category: "OOP",
    difficulty: "medium",
    question: "What does the Iterator pattern provide?",
    options: [
      "A way to access elements sequentially without exposing internal structure",
      "A way to sort collections",
      "A way to filter arrays",
      "A way to merge objects",
    ],
    correctAnswer: 0,
    explanation:
      "Iterator encapsulates traversal logic, letting clients iterate without knowing the underlying representation.",
  },
  {
    id: 87,
    category: "OOP",
    difficulty: "hard",
    question:
      "In Python, how do you implement a read-only property that has no setter?",
    options: [
      "Use @property without defining @x.setter",
      "Use __setattr__ that raises AttributeError",
      "Use __slots__",
      "Both A and B",
    ],
    correctAnswer: 3,
    explanation:
      "Omitting the setter or overriding __setattr__ to reject the name both prevent assignment.",
  },
  {
    id: 88,
    category: "OOP",
    difficulty: "medium",
    question: "In JS, what is the difference between a mixin and a trait?",
    options: [
      "Traits require conflict resolution; mixins usually override",
      "Traits are slower",
      "Mixins are part of ES6",
      "There is no difference",
    ],
    correctAnswer: 0,
    explanation:
      "Traits often provide linearized conflict resolution, whereas simple mixins last-one-wins override.",
  },
  {
    id: 89,
    category: "OOP",
    difficulty: "hard",
    question: "How can you implement a compile-time interface check in Python?",
    options: [
      "Using typing.Protocol and isinstance with structural subtyping",
      "Using ABC only",
      "Using inspect module",
      "Not possible",
    ],
    correctAnswer: 0,
    explanation:
      "Protocols enable static duck typing; runtime isinstance checks respect structural compatibility.",
  },
  {
    id: 90,
    category: "OOP",
    difficulty: "medium",
    question: "What is the main intent of the Mediator pattern?",
    options: [
      "Encapsulates how objects interact, promoting loose coupling",
      "Speeds up method calls",
      "Eliminates classes",
      "Provides singleton access",
    ],
    correctAnswer: 0,
    explanation:
      "Mediator centralizes complex communications between objects, reducing direct references.",
  },
  {
    id: 91,
    category: "OOP",
    difficulty: "hard",
    question: "In JavaScript, how can you implement a private static method?",
    options: [
      "static #method() {}",
      "private static method() {}",
      "static _method() {}",
      "static method() { 'use strict'; }",
    ],
    correctAnswer: 0,
    explanation:
      "# prefix on a static method makes it private to the class body.",
  },
  {
    id: 92,
    category: "OOP",
    difficulty: "medium",
    question: "Which Python special method is called by format(obj, spec)?",
    options: ["__format__", "__str__", "__repr__", "__spec__"],
    correctAnswer: 0,
    explanation:
      "__format__ receives the format specification string and should return the formatted text.",
  },
  {
    id: 93,
    category: "OOP",
    difficulty: "hard",
    question:
      "What is the output of the following Python code?\n\nfrom dataclasses import dataclass\n\n@dataclass(frozen=True)\nclass Point:\n    x: int\n    y: int\n\np = Point(1, 2)\np.x = 3",
    options: ["FrozenInstanceError", "1", "3", "AttributeError"],
    correctAnswer: 0,
    explanation:
      "frozen=True generates __setattr__ that raises FrozenInstanceError on assignment.",
  },
  {
    id: 94,
    category: "OOP",
    difficulty: "medium",
    question: "In JS, what does the Template Method pattern define?",
    options: [
      "A skeleton algorithm with steps overridden by subclasses",
      "A string template engine",
      "A DOM template",
      "A factory for templates",
    ],
    correctAnswer: 0,
    explanation:
      "Template Method lets subclasses override specific steps of an algorithm without changing its structure.",
  },
  {
    id: 95,
    category: "OOP",
    difficulty: "hard",
    question:
      "How can you implement a weakly referenced method cache in Python?",
    options: [
      "Using functools.lru_cache with weakref.WeakValueDictionary",
      "Using @cache",
      "Using __weakref__ slot",
      "Not possible",
    ],
    correctAnswer: 0,
    explanation:
      "A custom cache backed by WeakValueDictionary allows cached entries to be garbage collected when the instance is no longer referenced.",
  },
  {
    id: 96,
    category: "OOP",
    difficulty: "medium",
    question: "What does the Prototype pattern clone?",
    options: [
      "An existing object without depending on its concrete class",
      "Only primitives",
      "The class definition",
      "The prototype chain",
    ],
    correctAnswer: 0,
    explanation:
      "Prototype delegates cloning to the object itself, avoiding factory coupling.",
  },
  {
    id: 97,
    category: "OOP",
    difficulty: "hard",
    question:
      "In JavaScript, how can you create an object whose prototype can be changed after creation but not via __proto__?",
    options: [
      "Use Object.create with a mutable prototype object",
      "Use Proxy",
      "Use Object.preventExtensions",
      "Use Object.freeze",
    ],
    correctAnswer: 0,
    explanation:
      "The prototype object itself can be mutated, affecting delegating instances, even though __proto__ accessor is not used.",
  },
  {
    id: 98,
    category: "OOP",
    difficulty: "medium",
    question:
      "Which Python decorator memoizes a function with an unbounded cache?",
    options: ["@functools.cache (3.9+)", "@lru_cache", "@memoize", "@cached"],
    correctAnswer: 0,
    explanation:
      "@cache is equivalent to @lru_cache(maxsize=None), providing unbounded memoization.",
  },
  {
    id: 99,
    category: "OOP",
    difficulty: "hard",
    question:
      "What is the output of the following JavaScript code?\n\nclass A {\n  #x = 1;\n  getX() { return this.#x; }\n}\nconst p = new Proxy(new A(), {});\nconsole.log(p.getX());",
    options: ["1", "TypeError", "undefined", "ReferenceError"],
    correctAnswer: 0,
    explanation:
      "Private fields are accessible via methods even when the instance is proxied, because the method runs in the original class scope.",
  },
  {
    id: 100,
    category: "OOP",
    difficulty: "medium",
    question: "What is the main benefit of the Facade pattern?",
    options: [
      "Provides a simplified interface to a complex subsystem",
      "Speeds up algorithms",
      "Eliminates dependencies",
      "Provides multiple interfaces",
    ],
    correctAnswer: 0,
    explanation: "Facade hides complexity behind a single, easier-to-use API.",
  },
  {
    id: 101,
    category: "OOP",
    difficulty: "hard",
    question:
      "In Python, how do you implement a final variable (constant) in a dataclass?",
    options: [
      "Use Final[int] from typing and field with default",
      "Use const keyword",
      "Use __setattr__ that raises",
      "Both A and C",
    ],
    correctAnswer: 3,
    explanation:
      "Typing.Final marks it for linters; overriding __setattr__ to reject reassignment enforces runtime immutability.",
  },
  {
    id: 102,
    category: "OOP",
    difficulty: "medium",
    question: "In JS, what does Object.preventExtensions do?",
    options: [
      "Prevents new properties from being added",
      "Prevents deletion",
      "Prevents value changes",
      "Freezes the object",
    ],
    correctAnswer: 0,
    explanation:
      "preventExtensions blocks new properties but allows deletion and value modification.",
  },
  {
    id: 103,
    category: "OOP",
    difficulty: "hard",
    question: "How can you implement a type-safe event emitter in TypeScript?",
    options: [
      "interface EventMap { [event: string]: any[] } class Emitter<E extends EventMap> { on<K extends keyof E>(event: K, listener: (...args: E[K]) => void): void; emit<K extends keyof E>(event: K, ...args: E[K]): void; }",
      "class Emitter { on(event: string, listener: Function): void; emit(event: string, ...args: any[]): void; }",
      "type Emitter = Map<string, Function>",
      "type Emitter<E> = E",
    ],
    correctAnswer: 0,
    explanation:
      "A generic event map ensures that emit/on pairs are type-safe per event name.",
  },
  {
    id: 104,
    category: "OOP",
    difficulty: "medium",
    question: "What does the Builder pattern separate?",
    options: [
      "Construction complexity from representation",
      "Builder from director",
      "Client from product",
      "All of the above",
    ],
    correctAnswer: 3,
    explanation:
      "Builder isolates how an object is constructed from its final representation, letting the same process create different products.",
  },
  {
    id: 105,
    category: "OOP",
    difficulty: "hard",
    question:
      "In Python, how do you implement a class that cannot be instantiated (static utility class)?",
    options: [
      "Raise TypeError in __new__",
      "Use @staticmethod on all methods",
      "Use metaclass that returns None",
      "Both A and C",
    ],
    correctAnswer: 3,
    explanation:
      "Overriding __new__ to raise or using a metaclass that blocks instantiation both achieve a static-only class.",
  },
  {
    id: 106,
    category: "OOP",
    difficulty: "medium",
    question: "In JS, what is the difference between Object.is and ===?",
    options: [
      "Object.is treats -0 and +0 as unequal, and NaN equal to NaN",
      "They are identical",
      "Object.is is slower",
      "=== handles objects better",
    ],
    correctAnswer: 0,
    explanation:
      "Object.is differs for -0/+0 and NaN comparisons, otherwise same as ===.",
  },
  {
    id: 107,
    category: "OOP",
    difficulty: "hard",
    question:
      "How can you implement a compile-time interface in Python using typing?",
    options: [
      "Using Protocol with structural subtyping",
      "Using ABC only",
      "Using inspect module",
      "Not possible",
    ],
    correctAnswer: 0,
    explanation:
      "typing.Protocol enables static duck typing—classes implement the protocol by having the required methods, no explicit inheritance needed.",
  },
  {
    id: 108,
    category: "OOP",
    difficulty: "medium",
    question: "What is the main intent of the Single Responsibility Principle?",
    options: [
      "A class should have only one reason to change",
      "A class should have only one method",
      "A class should be immutable",
      "A class should be final",
    ],
    correctAnswer: 0,
    explanation:
      "SRP states that a class should focus on a single concern or responsibility, reducing coupling.",
  },
  {
    id: 109,
    category: "OOP",
    difficulty: "hard",
    question:
      "In JavaScript, how can you create an object with a custom prototype without using __proto__?",
    options: [
      "Object.create(proto)",
      "new Object(proto)",
      "{}",
      "Object.setPrototypeOf({}, proto)",
    ],
    correctAnswer: 0,
    explanation:
      "Object.create is the standard way to create an object with a specified prototype.",
  },
  {
    id: 110,
    category: "OOP",
    difficulty: "medium",
    question:
      "Which Python module provides an OrderedDict that remembers insertion order?",
    options: ["collections", "dict", "ordered", "typing"],
    correctAnswer: 0,
    explanation:
      "collections.OrderedDict maintains insertion order (dict does too as of 3.7, but OrderedDict has move_to_end, etc.).",
  },
  {
    id: 111,
    category: "OOP",
    difficulty: "hard",
    question:
      "What is the output of the following Python code?\n\nclass A:\n    def __iter__(self):\n        return self\n    def __next__(self):\n        raise StopIteration\n\nprint(isinstance(A(), Iterable))",
    options: ["True", "False", "TypeError", "NameError"],
    correctAnswer: 0,
    explanation:
      "A class implementing __iter__ is considered an Iterable even if __next__ raises StopIteration immediately.",
  },
  {
    id: 112,
    category: "OOP",
    difficulty: "medium",
    question: "In JS, what does the Chain of Responsibility pattern avoid?",
    options: [
      "Coupling the sender of a request to its receiver",
      "Using callbacks",
      "Creating objects",
      "Using promises",
    ],
    correctAnswer: 0,
    explanation:
      "Chain of Responsibility passes the request along a chain until an object handles it, decoupling sender and receiver.",
  },
  {
    id: 113,
    category: "OOP",
    difficulty: "hard",
    question:
      "How can you implement a type-safe dependency injection container in TypeScript?",
    options: [
      "Use token symbols and generic providers with interfaces",
      "Use any for all bindings",
      "Use Object.create",
      "Use Map only",
    ],
    correctAnswer: 0,
    explanation:
      "Symbol tokens and generic providers allow the container to resolve implementations while preserving compile-time type safety.",
  },
  {
    id: 114,
    category: "OOP",
    difficulty: "medium",
    question: "What does the Mediator pattern promote?",
    options: [
      "Loose coupling by preventing objects from referring to each other explicitly",
      "Tight coupling",
      "Inheritance hierarchies",
      "Static methods",
    ],
    correctAnswer: 0,
    explanation:
      "Mediator centralizes communications, so colleagues don't need to know about each other directly.",
  },
  {
    id: 115,
    category: "OOP",
    difficulty: "hard",
    question:
      "In Python, how do you implement a final attribute that cannot be reassigned?",
    options: [
      "Use __setattr__ to raise AttributeError on that name",
      "Use @property without setter",
      "Use Final from typing",
      "All of the above",
    ],
    correctAnswer: 3,
    explanation:
      "Each technique prevents reassignment: __setattr__ at runtime, @property by design, Final for static checkers.",
  },
  {
    id: 116,
    category: "OOP",
    difficulty: "medium",
    question: "In JS, what is the purpose of Symbol.iterator?",
    options: [
      "To define the default iterator for an object",
      "To create a new symbol",
      "To iterate symbols",
      "To freeze an object",
    ],
    correctAnswer: 0,
    explanation:
      "Symbol.iterator lets an object be iterated with for...of by returning an iterator.",
  },
  {
    id: 117,
    category: "OOP",
    difficulty: "hard",
    question:
      "What is the output of the following JavaScript code?\n\nconst obj = { a: 1 };\nconst handler = {\n  get(target, prop, receiver) {\n    return Reflect.get(target, prop, receiver) * 2;\n  }\n};\nconst p = new Proxy(obj, handler);\nconsole.log(p.a);",
    options: ["2", "1", "undefined", "NaN"],
    correctAnswer: 0,
    explanation: "The get trap doubles the value before returning it.",
  },
  {
    id: 118,
    category: "OOP",
    difficulty: "medium",
    question: "Which Python special method is invoked by reversed(obj)?",
    options: ["__reversed__", "__reverse__", "__iter__", "__getitem__"],
    correctAnswer: 0,
    explanation:
      "__reversed__ should return an iterator that yields items in reverse order; if missing, Python falls back to __len__ and __getitem__.",
  },
  {
    id: 119,
    category: "OOP",
    difficulty: "hard",
    question:
      "How can you implement a compile-time mixin in Python using multiple inheritance and protocols?",
    options: [
      "Define protocols for features and inherit from multiple protocol-implementing mixins",
      "Use @overload",
      "Use cast",
      "Not possible",
    ],
    correctAnswer: 0,
    explanation:
      "Protocols allow structural mixing of behaviors; a class can inherit from several mixin classes that implement protocol requirements.",
  },
  {
    id: 120,
    category: "OOP",
    difficulty: "medium",
    question: "What is the main intent of the Interface Segregation Principle?",
    options: [
      "Clients should not be forced to depend on interfaces they do not use",
      "All interfaces must be small",
      "No interface should have more than one method",
      "Interfaces should be generic",
    ],
    correctAnswer: 0,
    explanation:
      "ISP advocates splitting large interfaces into smaller, client-specific ones to reduce coupling.",
  },
  {
    id: 121,
    category: "OOP",
    difficulty: "hard",
    question:
      "In JavaScript, how can you implement a final class (non-extendable) at runtime?",
    options: [
      "Use Object.seal on the constructor function",
      "Use class X { } and then Object.freeze(X)",
      "Use Proxy to block construct trap",
      "Both B and C",
    ],
    correctAnswer: 3,
    explanation:
      "Freezing the constructor prevents prototype mutation and extension; a Proxy can also veto subclassing via construct trap.",
  },
  {
    id: 122,
    category: "OOP",
    difficulty: "medium",
    question: "Which Python class creates an immutable mapping view?",
    options: [
      "types.MappingProxyType",
      "dict",
      "collections.OrderedDict",
      "typing.Mapping",
    ],
    correctAnswer: 0,
    explanation:
      "MappingProxyType wraps a dict and provides a read-only view, used internally for class __dict__ views.",
  },
  {
    id: 123,
    category: "OOP",
    difficulty: "hard",
    question:
      "What is the output of the following Python code?\n\nclass A:\n    def __bool__(self):\n        return False\n\nif A():\n    print('yes')\nelse:\n    print('no')",
    options: ["no", "yes", "TypeError", "ValueError"],
    correctAnswer: 0,
    explanation:
      "__bool__ (or __len__ if missing) determines truthiness; returning False makes the instance falsy.",
  },
  {
    id: 124,
    category: "OOP",
    difficulty: "medium",
    question:
      "In JS, what does the Visitor pattern allow you to do without modifying existing classes?",
    options: [
      "Add new operations",
      "Add new fields",
      "Remove methods",
      "Change inheritance",
    ],
    correctAnswer: 0,
    explanation:
      "Visitor lets you define a new operation over an object structure without changing the classes of the elements.",
  },
  {
    id: 125,
    category: "OOP",
    difficulty: "hard",
    question:
      "How can you implement a type-safe event bus in Python using generics and protocols?",
    options: [
      "Use typing.Protocol for listeners and generics for event payloads",
      "Use ABC only",
      "Use inspect module",
      "Not possible",
    ],
    correctAnswer: 0,
    explanation:
      "Protocols define listener interfaces; generics parameterize event payloads, enabling static type checking.",
  },
  {
    id: 126,
    category: "OOP",
    difficulty: "medium",
    question: "What is the main benefit of the Dependency Inversion Principle?",
    options: [
      "High-level modules do not depend on low-level modules; both depend on abstractions",
      "Reduces file count",
      "Eliminates constructors",
      "Makes all classes final",
    ],
    correctAnswer: 0,
    explanation:
      "DIP reduces coupling by introducing abstract interfaces between layers.",
  },
  {
    id: 127,
    category: "OOP",
    difficulty: "hard",
    question:
      "In Python, how do you implement a descriptor that caches its result per instance?",
    options: [
      "Store the cached value under a private name in the instance dict inside __get__",
      "Use @cached_property",
      "Use __slots__",
      "Both A and B",
    ],
    correctAnswer: 3,
    explanation:
      "Manual descriptor or @cached_property both store the computed value on the instance to avoid recomputation.",
  },
  {
    id: 128,
    category: "OOP",
    difficulty: "medium",
    question: "In JS, what is the purpose of Symbol.hasInstance?",
    options: [
      "To customize instanceof behavior",
      "To create a singleton",
      "To freeze an object",
      "To define an iterator",
    ],
    correctAnswer: 0,
    explanation:
      "Symbol.hasInstance lets a function or class control what instanceof returns.",
  },
  {
    id: 129,
    category: "OOP",
    difficulty: "hard",
    question:
      "What is the output of the following Python code?\n\nclass A:\n    def __init_subclass__(cls, **kw):\n        cls.x = 1\n\nclass B(A):\n    pass\n\nprint(B.x)",
    options: ["1", "AttributeError", "0", "None"],
    correctAnswer: 0,
    explanation:
      "__init_subclass__ is called when the subclass is created, allowing the base class to augment it.",
  },
  {
    id: 130,
    category: "OOP",
    difficulty: "medium",
    question:
      "Which pattern encapsulates an algorithm family and makes them interchangeable?",
    options: ["Strategy", "Template Method", "Factory", "Singleton"],
    correctAnswer: 0,
    explanation:
      "Strategy defines a family of algorithms, encapsulates each one, and makes them interchangeable at runtime.",
  },
  {
    id: 131,
    category: "OOP",
    difficulty: "hard",
    question:
      "In JavaScript, how can you implement a private field shared by all instances but not accessible outside?",
    options: [
      "Use a WeakMap keyed by instances, scoped outside the class",
      "Use #field",
      "Use Symbol",
      "Use const inside constructor",
    ],
    correctAnswer: 0,
    explanation:
      "A module-scoped WeakMap allows storing per-instance private data that is truly inaccessible from outside the module.",
  },
  {
    id: 132,
    category: "OOP",
    difficulty: "medium",
    question: "What Python special method is invoked by hash(obj)?",
    options: ["__hash__", "__eq__", "__int__", "__index__"],
    correctAnswer: 0,
    explanation:
      "__hash__ must return an integer and should be consistent with __eq__ for hashable objects.",
  },
  {
    id: 133,
    category: "OOP",
    difficulty: "hard",
    question:
      "How can you implement a final method in JavaScript that cannot be overridden?",
    options: [
      "Use a Proxy to block defineProperty on subclasses",
      "Use #method (private methods are final)",
      "Use Object.freeze on prototype",
      "Both A and B",
    ],
    correctAnswer: 3,
    explanation:
      "Private methods are final by language design; a Proxy can also prevent redefinition of public methods.",
  },
  {
    id: 134,
    category: "OOP",
    difficulty: "medium",
    question: "What is the main benefit of the Open/Closed Principle?",
    options: [
      "Software entities should be open for extension but closed for modification",
      "Allows unlimited changes",
      "Prohibits inheritance",
      "Requires all classes to be sealed",
    ],
    correctAnswer: 0,
    explanation:
      "OCP encourages extending behavior via inheritance, composition, or polymorphism rather than modifying existing code.",
  },
  {
    id: 135,
    category: "OOP",
    difficulty: "hard",
    question:
      "In Python, how do you implement a descriptor that is shared across all instances (non-data descriptor)?",
    options: [
      "Define only __get__ and store shared state in the descriptor instance",
      "Define __get__ and __set__",
      "Use __dict__",
      "Use __slots__",
    ],
    correctAnswer: 0,
    explanation:
      "Without __set__, the descriptor is non-data and its value is shared among all instances unless stored per-instance.",
  },
  {
    id: 136,
    category: "OOP",
    difficulty: "medium",
    question: "In JS, what does Object.fromEntries do?",
    options: [
      "Converts an iterable of [key, value] pairs into an object",
      "Creates a Map",
      "Freezes an object",
      "Returns entries array",
    ],
    correctAnswer: 0,
    explanation:
      "Object.fromEntries is the inverse of Object.entries, turning key-value pairs into an object.",
  },
];
