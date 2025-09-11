// MCQ Questions Dataset for Daily Challenges
// Each question has 4 options with one correct answer

export const mcqQuestions = [
  // TypeScript MCQs
  {
    id: 16,
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
    id: 17,
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
    id: 18,
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
    id: 19,
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
    id: 20,
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

  // SQL MCQs
  {
    id: 21,
    category: "SQL",
    difficulty: "easy",
    question: "Which SQL statement is used to retrieve data from a database?",
    options: ["GET", "SELECT", "RETRIEVE", "FETCH"],
    correctAnswer: 1,
    explanation:
      "SELECT is the SQL statement used to query and retrieve data from one or more tables in a database.",
  },
  {
    id: 22,
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
    id: 23,
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
    id: 24,
    category: "SQL",
    difficulty: "easy",
    question: "Which clause is used to filter rows in SQL?",
    options: ["FILTER", "WHERE", "HAVING", "CONDITION"],
    correctAnswer: 1,
    explanation:
      "WHERE clause is used to filter rows based on specified conditions before grouping or aggregation.",
  },
  {
    id: 25,
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

  // OOP MCQs
  {
    id: 36,
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
    id: 37,
    category: "OOP",
    difficulty: "medium",
    question: "What is encapsulation in OOP?",
    options: [
      "Creating multiple objects",
      "Hiding internal implementation details",
      "Inheriting from parent classes",
      "Overriding methods",
    ],
    correctAnswer: 1,
    explanation:
      "Encapsulation is the bundling of data and methods that operate on that data within a single unit, hiding internal implementation details from the outside.",
  },
  {
    id: 38,
    category: "OOP",
    difficulty: "easy",
    question: "What is polymorphism in OOP?",
    options: [
      "Having multiple constructors",
      "The ability of objects to take multiple forms",
      "Creating abstract classes",
      "Using multiple inheritance",
    ],
    correctAnswer: 1,
    explanation:
      "Polymorphism allows objects of different types to be treated as objects of a common base type, enabling a single interface to represent different underlying forms.",
  },
  {
    id: 39,
    category: "OOP",
    difficulty: "easy",
    question: "What is inheritance in OOP?",
    options: [
      "Creating new objects",
      "A mechanism where a class acquires properties of another class",
      "Hiding data from other classes",
      "Overloading methods",
    ],
    correctAnswer: 1,
    explanation:
      "Inheritance is a mechanism that allows a class to inherit properties and methods from another class, promoting code reusability.",
  },
  {
    id: 40,
    category: "OOP",
    difficulty: "medium",
    question: "What is abstraction in OOP?",
    options: [
      "Creating concrete classes",
      "Hiding complex implementation details and showing only essential features",
      "Using multiple inheritance",
      "Overriding parent methods",
    ],
    correctAnswer: 1,
    explanation:
      "Abstraction is the process of hiding complex implementation details while showing only the essential features of an object to the user.",
  },
];

export const nodeJsMCQs = [
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
];

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
];

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

  // MEDIUM QUESTIONS (101-200)
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

  // HARD QUESTIONS (201-300)
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
];

// 216 questions
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
