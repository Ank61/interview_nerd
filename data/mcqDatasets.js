// MCQ Questions Dataset for Daily Challenges
// Each question has 4 options with one correct answer

export const mcqQuestions = [
  // JavaScript MCQs
  {
    id: 1,
    category: 'Javascript',
    difficulty: 'easy',
    question: 'What is the correct way to declare a variable in JavaScript?',
    options: [
      'var myVar = 5;',
      'variable myVar = 5;',
      'v myVar = 5;',
      'declare myVar = 5;'
    ],
    correctAnswer: 0,
    explanation: 'In JavaScript, variables are declared using var, let, or const keywords. var is the traditional way to declare variables.'
  },
  {
    id: 2,
    category: 'Javascript',
    difficulty: 'medium',
    question: 'What will be the output of: console.log(typeof null)?',
    options: [
      'null',
      'undefined',
      'object',
      'boolean'
    ],
    correctAnswer: 2,
    explanation: 'This is a well-known JavaScript quirk. typeof null returns "object" due to a legacy bug in JavaScript that has been kept for backward compatibility.'
  },
  {
    id: 3,
    category: 'Javascript',
    difficulty: 'hard',
    question: 'What is the result of: [1, 2, 3].map(parseInt)?',
    options: [
      '[1, 2, 3]',
      '[1, NaN, NaN]',
      '[1, 2, NaN]',
      '[NaN, NaN, NaN]'
    ],
    correctAnswer: 1,
    explanation: 'map passes three arguments to parseInt: (element, index, array). parseInt takes (string, radix). So it becomes parseInt(1,0), parseInt(2,1), parseInt(3,2), resulting in [1, NaN, NaN].'
  },
  {
    id: 4,
    category: 'Javascript',
    difficulty: 'easy',
    question: 'Which method is used to add an element to the end of an array?',
    options: [
      'append()',
      'push()',
      'add()',
      'insert()'
    ],
    correctAnswer: 1,
    explanation: 'The push() method adds one or more elements to the end of an array and returns the new length of the array.'
  },
  {
    id: 5,
    category: 'Javascript',
    difficulty: 'medium',
    question: 'What is the difference between == and === in JavaScript?',
    options: [
      'No difference, they are the same',
      '== checks type, === checks value',
      '== checks value only, === checks both type and value',
      '=== is used for assignment, == for comparison'
    ],
    correctAnswer: 2,
    explanation: '== performs type coercion and compares values, while === performs strict comparison checking both type and value without coercion.'
  },

  // React MCQs
  {
    id: 6,
    category: 'React',
    difficulty: 'easy',
    question: 'What is JSX in React?',
    options: [
      'A JavaScript library',
      'A syntax extension for JavaScript',
      'A CSS framework',
      'A database query language'
    ],
    correctAnswer: 1,
    explanation: 'JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files. It gets transpiled to regular JavaScript.'
  },
  {
    id: 7,
    category: 'React',
    difficulty: 'medium',
    question: 'Which hook is used to manage state in functional components?',
    options: [
      'useEffect',
      'useState',
      'useContext',
      'useReducer'
    ],
    correctAnswer: 1,
    explanation: 'useState is the primary hook for managing local state in functional components. It returns a state variable and a function to update it.'
  },
  {
    id: 8,
    category: 'React',
    difficulty: 'hard',
    question: 'What happens when you call setState multiple times in a single event handler?',
    options: [
      'Each setState triggers a separate re-render',
      'Only the last setState is executed',
      'React batches the updates and triggers one re-render',
      'It causes an error'
    ],
    correctAnswer: 2,
    explanation: 'React batches multiple setState calls in event handlers for performance optimization, resulting in a single re-render with all updates applied.'
  },
  {
    id: 9,
    category: 'React',
    difficulty: 'easy',
    question: 'What is the purpose of the key prop in React lists?',
    options: [
      'To style list items',
      'To help React identify which items have changed',
      'To sort the list items',
      'To add event listeners'
    ],
    correctAnswer: 1,
    explanation: 'The key prop helps React identify which items have changed, been added, or removed, enabling efficient re-rendering of lists.'
  },
  {
    id: 10,
    category: 'React',
    difficulty: 'medium',
    question: 'What is the virtual DOM in React?',
    options: [
      'A copy of the real DOM stored in memory',
      'A JavaScript representation of the real DOM',
      'A faster version of the DOM',
      'A debugging tool for React'
    ],
    correctAnswer: 1,
    explanation: 'The virtual DOM is a JavaScript representation of the real DOM kept in memory. React uses it to optimize updates by comparing changes before applying them to the real DOM.'
  },

  // Node.js MCQs
  {
    id: 11,
    category: 'Node',
    difficulty: 'easy',
    question: 'What is Node.js?',
    options: [
      'A JavaScript framework',
      'A JavaScript runtime built on Chrome\'s V8 engine',
      'A database management system',
      'A CSS preprocessor'
    ],
    correctAnswer: 1,
    explanation: 'Node.js is a JavaScript runtime environment that allows you to run JavaScript on the server side, built on Chrome\'s V8 JavaScript engine.'
  },
  {
    id: 12,
    category: 'Node',
    difficulty: 'medium',
    question: 'Which module is used to create a web server in Node.js?',
    options: [
      'fs',
      'path',
      'http',
      'url'
    ],
    correctAnswer: 2,
    explanation: 'The http module is used to create HTTP servers and clients in Node.js. It provides functionality to create web servers and handle HTTP requests/responses.'
  },
  {
    id: 13,
    category: 'Node',
    difficulty: 'hard',
    question: 'What is the event loop in Node.js?',
    options: [
      'A loop that handles user events',
      'A mechanism that handles asynchronous operations',
      'A loop that processes HTTP requests',
      'A debugging feature'
    ],
    correctAnswer: 1,
    explanation: 'The event loop is the mechanism that allows Node.js to perform non-blocking I/O operations by offloading operations to the system kernel whenever possible.'
  },
  {
    id: 14,
    category: 'Node',
    difficulty: 'easy',
    question: 'What does npm stand for?',
    options: [
      'Node Package Manager',
      'New Programming Method',
      'Network Protocol Manager',
      'Node Process Manager'
    ],
    correctAnswer: 0,
    explanation: 'npm stands for Node Package Manager. It is the default package manager for Node.js and is used to install, share, and manage dependencies.'
  },
  {
    id: 15,
    category: 'Node',
    difficulty: 'medium',
    question: 'Which method is used to read a file asynchronously in Node.js?',
    options: [
      'fs.readFileSync()',
      'fs.readFile()',
      'fs.read()',
      'fs.openFile()'
    ],
    correctAnswer: 1,
    explanation: 'fs.readFile() is used to read files asynchronously in Node.js. The synchronous version is fs.readFileSync().'
  },

  // TypeScript MCQs
  {
    id: 16,
    category: 'Typescript',
    difficulty: 'easy',
    question: 'What is TypeScript?',
    options: [
      'A JavaScript runtime',
      'A superset of JavaScript that adds static typing',
      'A CSS framework',
      'A database query language'
    ],
    correctAnswer: 1,
    explanation: 'TypeScript is a superset of JavaScript that adds optional static typing and other features. It compiles to plain JavaScript.'
  },
  {
    id: 17,
    category: 'Typescript',
    difficulty: 'medium',
    question: 'How do you define an interface in TypeScript?',
    options: [
      'class MyInterface {}',
      'interface MyInterface {}',
      'type MyInterface = {}',
      'function MyInterface() {}'
    ],
    correctAnswer: 1,
    explanation: 'Interfaces in TypeScript are defined using the interface keyword followed by the interface name and its structure.'
  },
  {
    id: 18,
    category: 'Typescript',
    difficulty: 'hard',
    question: 'What is the difference between interface and type in TypeScript?',
    options: [
      'No difference, they are identical',
      'interface can be extended, type cannot',
      'interface can be merged, type cannot',
      'type is more performant than interface'
    ],
    correctAnswer: 2,
    explanation: 'Interfaces can be merged (declaration merging) and extended, while types are more flexible for unions and computed properties but cannot be merged.'
  },
  {
    id: 19,
    category: 'Typescript',
    difficulty: 'easy',
    question: 'How do you specify that a parameter is optional in TypeScript?',
    options: [
      'parameter: string | undefined',
      'parameter?: string',
      'optional parameter: string',
      'parameter: string?'
    ],
    correctAnswer: 1,
    explanation: 'Optional parameters in TypeScript are denoted by adding a question mark (?) after the parameter name.'
  },
  {
    id: 20,
    category: 'Typescript',
    difficulty: 'medium',
    question: 'What is a generic in TypeScript?',
    options: [
      'A way to create reusable components that work with multiple types',
      'A built-in TypeScript function',
      'A type of variable declaration',
      'A method for handling errors'
    ],
    correctAnswer: 0,
    explanation: 'Generics allow you to create reusable components that can work with multiple types while maintaining type safety.'
  },

  // SQL MCQs
  {
    id: 21,
    category: 'SQL',
    difficulty: 'easy',
    question: 'Which SQL statement is used to retrieve data from a database?',
    options: [
      'GET',
      'SELECT',
      'RETRIEVE',
      'FETCH'
    ],
    correctAnswer: 1,
    explanation: 'SELECT is the SQL statement used to query and retrieve data from one or more tables in a database.'
  },
  {
    id: 22,
    category: 'SQL',
    difficulty: 'medium',
    question: 'What does the GROUP BY clause do in SQL?',
    options: [
      'Sorts the results',
      'Filters the results',
      'Groups rows with the same values',
      'Joins multiple tables'
    ],
    correctAnswer: 2,
    explanation: 'GROUP BY groups rows that have the same values in specified columns into summary rows, often used with aggregate functions.'
  },
  {
    id: 23,
    category: 'SQL',
    difficulty: 'hard',
    question: 'What is the difference between INNER JOIN and LEFT JOIN?',
    options: [
      'No difference, they are the same',
      'INNER JOIN returns all rows, LEFT JOIN returns matching rows only',
      'INNER JOIN returns matching rows only, LEFT JOIN returns all rows from left table',
      'LEFT JOIN is faster than INNER JOIN'
    ],
    correctAnswer: 2,
    explanation: 'INNER JOIN returns only matching rows from both tables, while LEFT JOIN returns all rows from the left table and matching rows from the right table.'
  },
  {
    id: 24,
    category: 'SQL',
    difficulty: 'easy',
    question: 'Which clause is used to filter rows in SQL?',
    options: [
      'FILTER',
      'WHERE',
      'HAVING',
      'CONDITION'
    ],
    correctAnswer: 1,
    explanation: 'WHERE clause is used to filter rows based on specified conditions before grouping or aggregation.'
  },
  {
    id: 25,
    category: 'SQL',
    difficulty: 'medium',
    question: 'What is the purpose of the HAVING clause?',
    options: [
      'To filter rows before grouping',
      'To filter groups after GROUP BY',
      'To sort the results',
      'To join tables'
    ],
    correctAnswer: 1,
    explanation: 'HAVING clause is used to filter groups created by GROUP BY, typically used with aggregate functions.'
  },

  // Next.js MCQs
  {
    id: 26,
    category: 'Next',
    difficulty: 'easy',
    question: 'What is Next.js?',
    options: [
      'A CSS framework',
      'A React framework for production',
      'A database management system',
      'A testing library'
    ],
    correctAnswer: 1,
    explanation: 'Next.js is a React framework that provides features like server-side rendering, static site generation, and API routes for production applications.'
  },
  {
    id: 27,
    category: 'Next',
    difficulty: 'medium',
    question: 'What is the purpose of getStaticProps in Next.js?',
    options: [
      'To handle form submissions',
      'To fetch data at build time for static generation',
      'To create API endpoints',
      'To handle client-side routing'
    ],
    correctAnswer: 1,
    explanation: 'getStaticProps is used to fetch data at build time for static site generation, allowing pages to be pre-rendered with data.'
  },
  {
    id: 28,
    category: 'Next',
    difficulty: 'hard',
    question: 'What is the difference between getStaticProps and getServerSideProps?',
    options: [
      'No difference, they are the same',
      'getStaticProps runs at build time, getServerSideProps runs on each request',
      'getServerSideProps is faster than getStaticProps',
      'getStaticProps is for client-side, getServerSideProps is for server-side'
    ],
    correctAnswer: 1,
    explanation: 'getStaticProps runs at build time for static generation, while getServerSideProps runs on each request for server-side rendering.'
  },
  {
    id: 29,
    category: 'Next',
    difficulty: 'easy',
    question: 'How do you create dynamic routes in Next.js?',
    options: [
      'Using square brackets in file names like [id].js',
      'Using curly braces in file names like {id}.js',
      'Using parentheses in file names like (id).js',
      'Using angle brackets in file names like <id>.js'
    ],
    correctAnswer: 0,
    explanation: 'Dynamic routes in Next.js are created by using square brackets in file names, such as [id].js or [slug].js.'
  },
  {
    id: 30,
    category: 'Next',
    difficulty: 'medium',
    question: 'What is the App Router in Next.js 13+?',
    options: [
      'A routing library for React',
      'A new file-system based router built on React Server Components',
      'A tool for building mobile apps',
      'A database routing system'
    ],
    correctAnswer: 1,
    explanation: 'The App Router is a new routing system in Next.js 13+ built on React Server Components, providing features like layouts, nested routing, and loading states.'
  },

  // AWS S3 MCQs
  {
    id: 31,
    category: 'AWS S3',
    difficulty: 'easy',
    question: 'What does S3 stand for in AWS?',
    options: [
      'Simple Storage Service',
      'Secure Storage System',
      'Scalable Storage Solution',
      'Standard Storage Service'
    ],
    correctAnswer: 0,
    explanation: 'S3 stands for Simple Storage Service, which is Amazon\'s object storage service designed for storing and retrieving any amount of data.'
  },
  {
    id: 32,
    category: 'AWS S3',
    difficulty: 'medium',
    question: 'What is a bucket in AWS S3?',
    options: [
      'A type of database',
      'A container for objects',
      'A security group',
      'A compute instance'
    ],
    correctAnswer: 1,
    explanation: 'A bucket is a container for objects in S3. Bucket names must be globally unique across all AWS accounts.'
  },
  {
    id: 33,
    category: 'AWS S3',
    difficulty: 'hard',
    question: 'What is the maximum size of a single object in S3?',
    options: [
      '5 GB',
      '100 GB',
      '5 TB',
      'Unlimited'
    ],
    correctAnswer: 2,
    explanation: 'The maximum size of a single object in S3 is 5 TB. For objects larger than 100 MB, multipart upload is recommended.'
  },
  {
    id: 34,
    category: 'AWS S3',
    difficulty: 'easy',
    question: 'Which storage class is most cost-effective for frequently accessed data?',
    options: [
      'S3 Glacier',
      'S3 Standard',
      'S3 Infrequent Access',
      'S3 Deep Archive'
    ],
    correctAnswer: 1,
    explanation: 'S3 Standard is designed for frequently accessed data and provides high durability, availability, and performance.'
  },
  {
    id: 35,
    category: 'AWS S3',
    difficulty: 'medium',
    question: 'What is versioning in S3?',
    options: [
      'A way to backup data',
      'A feature that keeps multiple variants of an object',
      'A security feature',
      'A way to compress objects'
    ],
    correctAnswer: 1,
    explanation: 'Versioning allows you to keep multiple variants of an object in the same bucket, helping protect against accidental deletion or modification.'
  },

  // OOP MCQs
  {
    id: 36,
    category: 'OOP',
    difficulty: 'easy',
    question: 'What does OOP stand for?',
    options: [
      'Object Oriented Programming',
      'Open Operating Platform',
      'Optimized Object Processing',
      'Organized Operation Procedure'
    ],
    correctAnswer: 0,
    explanation: 'OOP stands for Object-Oriented Programming, a programming paradigm based on the concept of objects containing data and methods.'
  },
  {
    id: 37,
    category: 'OOP',
    difficulty: 'medium',
    question: 'What is encapsulation in OOP?',
    options: [
      'Creating multiple objects',
      'Hiding internal implementation details',
      'Inheriting from parent classes',
      'Overriding methods'
    ],
    correctAnswer: 1,
    explanation: 'Encapsulation is the bundling of data and methods that operate on that data within a single unit, hiding internal implementation details from the outside.'
  },
  {
    id: 38,
    category: 'OOP',
    difficulty: 'hard',
    question: 'What is polymorphism in OOP?',
    options: [
      'Having multiple constructors',
      'The ability of objects to take multiple forms',
      'Creating abstract classes',
      'Using multiple inheritance'
    ],
    correctAnswer: 1,
    explanation: 'Polymorphism allows objects of different types to be treated as objects of a common base type, enabling a single interface to represent different underlying forms.'
  },
  {
    id: 39,
    category: 'OOP',
    difficulty: 'easy',
    question: 'What is inheritance in OOP?',
    options: [
      'Creating new objects',
      'A mechanism where a class acquires properties of another class',
      'Hiding data from other classes',
      'Overloading methods'
    ],
    correctAnswer: 1,
    explanation: 'Inheritance is a mechanism that allows a class to inherit properties and methods from another class, promoting code reusability.'
  },
  {
    id: 40,
    category: 'OOP',
    difficulty: 'medium',
    question: 'What is abstraction in OOP?',
    options: [
      'Creating concrete classes',
      'Hiding complex implementation details and showing only essential features',
      'Using multiple inheritance',
      'Overriding parent methods'
    ],
    correctAnswer: 1,
    explanation: 'Abstraction is the process of hiding complex implementation details while showing only the essential features of an object to the user.'
  }
];

// Function to get daily MCQ questions (5 questions)
export function getDailyMCQQuestions(date = new Date()) {
  // Create a seed based on the date to ensure same questions for the same day
  const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD format
  const seed = dateString.split('-').reduce((acc, val) => acc + parseInt(val), 0);
  
  // Shuffle questions based on date seed
  const shuffled = [...mcqQuestions].sort(() => {
    const random = Math.sin(seed) * 10000;
    return random - Math.floor(random);
  });
  
  // Return first 5 questions
  return shuffled.slice(0, 5);
}

// Function to get MCQ questions by category
export function getMCQQuestionsByCategory(category, count = 5) {
  const categoryQuestions = mcqQuestions.filter(q => q.category === category);
  return categoryQuestions.slice(0, count);
}

// Function to get random MCQ questions
export function getRandomMCQQuestions(count = 5) {
  const shuffled = [...mcqQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default mcqQuestions;
