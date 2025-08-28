//https://github.com/sudheerj/javascript-interview-questions
//https://www.turing.com/interview-questions/javascript
export const interviewData = [
  {
    id: 1,
    topic: "Javascript",
    categories: "Junior",
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
        tags: [
          { name: "comparison operators", link: "" },
          { name: "type coercion", link: "" },
        ],
      },
      {
        question:
          "What is event delegation, and how does it function in JavaScript?",
        solution: `Event delegation is a technique in JavaScript where you attach a single event listener to a parent element to handle events for multiple child elements, instead of attaching individual listeners to each child.

**How it works:**
1. Events bubble up from child elements to their parents
2. A single listener on the parent can catch events from all children
3. Use event.target to identify which specific child triggered the event

**Example:**
\`\`\`javascript
// Instead of adding listeners to each button
document.getElementById('parent').addEventListener('click', function(e) {
  if (e.target.tagName === 'BUTTON') {
    console.log('Button clicked:', e.target.textContent);
  }
});
\`\`\`

**Benefits:**
- Better performance (fewer event listeners)
- Automatically handles dynamically added elements
- Reduced memory usage
- Easier to manage and maintain`,
        tags: [{ name: "event delegation", link: "" }],
      },
      {
        question:
          "Differentiate between a variable that is null, undefined, or undeclared.",
        solution: `**Undefined:**
- A variable has been declared but not assigned a value
- Default value for uninitialized variables
- Type: 'undefined'

**Null:**
- Explicitly assigned value representing "no value" or "empty"
- Intentional absence of value
- Type: 'object' (this is a known JavaScript quirk)

**Undeclared:**
- Variable has not been declared at all
- Accessing it throws a ReferenceError
- Not the same as undefined

**Examples:**
\`\`\`javascript
let a; // undefined
let b = null; // null
console.log(c); // ReferenceError: c is not defined

typeof a; // 'undefined'
typeof b; // 'object'
typeof c; // ReferenceError
\`\`\`

**Key Differences:**
- undefined: declared but no value
- null: explicitly set to "no value"
- undeclared: not declared at all`,
        tags: [],
      },
      {
        question:
          "Define what a closure is and describe its uses and advantages.",
        solution: `A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has finished executing.

**How closures work:**
\`\`\`javascript
function outerFunction(x) {
  // This is the outer function's scope
  return function innerFunction(y) {
    // This inner function has access to 'x'
    return x + y;
  };
}

const addFive = outerFunction(5);
console.log(addFive(3)); // 8
\`\`\`

**Common Uses:**
1. **Data Privacy/Encapsulation:**
\`\`\`javascript
function createCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}
const counter = createCounter();
\`\`\`

2. **Module Pattern:**
\`\`\`javascript
const module = (function() {
  let privateVar = 0;
  return {
    increment: () => ++privateVar,
    getCount: () => privateVar
  };
})();
\`\`\`

**Advantages:**
- Data encapsulation and privacy
- Function factories
- Callback functions
- Event handlers
- Maintaining state in asynchronous operations`,
        tags: [{ name: "closures", link: "" }],
      },
      {
        question:
          "Clarify the distinctions among 'function User(){}', 'var user = User()', and 'var user = new User()'.",
        solution: `**1. function User(){}**
- This is a function declaration
- Defines a function named User
- Can be used as a regular function or constructor

**2. var user = User()**
- Calls User as a regular function
- 'this' refers to global object (window in browsers)
- Returns whatever the function explicitly returns (undefined if no return)
- No new object is created

**3. var user = new User()**
- Calls User as a constructor function
- Creates a new empty object
- Sets 'this' to point to the new object
- Automatically returns the new object (unless function explicitly returns another object)

**Example:**
\`\`\`javascript
function User(name) {
  this.name = name;
  this.greet = function() {
    return 'Hello, ' + this.name;
  };
}

// Regular function call
var user1 = User('John'); // user1 is undefined, 'this' refers to global

// Constructor call
var user2 = new User('John'); // user2 is a new User object
console.log(user2.greet()); // 'Hello, John'
\`\`\`

**Key Difference:** 'new' creates a new object instance, regular call doesn't.`,
        tags: [],
      },
      {
        question: "Define the concept of 'hoisting'.",
        solution: `Hoisting is JavaScript's behavior of moving variable and function declarations to the top of their containing scope during the compilation phase, before code execution.

**Variable Hoisting:**
\`\`\`javascript
console.log(x); // undefined (not ReferenceError)
var x = 5;

// Interpreted as:
var x; // hoisted declaration
console.log(x); // undefined
x = 5; // assignment stays in place
\`\`\`

**Function Hoisting:**
\`\`\`javascript
sayHello(); // Works! Prints 'Hello'

function sayHello() {
  console.log('Hello');
}
\`\`\`

**Let and Const:**
\`\`\`javascript
console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 10;

console.log(z); // ReferenceError: Cannot access 'z' before initialization
const z = 20;
\`\`\`

**Function Expressions:**
\`\`\`javascript
sayHi(); // TypeError: sayHi is not a function
var sayHi = function() {
  console.log('Hi');
};
\`\`\`

**Key Points:**
- Only declarations are hoisted, not assignments
- let/const are hoisted but in "temporal dead zone"
- Function declarations are fully hoisted
- Function expressions follow variable hoisting rules`,
        tags: [{ name: "hoisting", link: "" }],
      },
      {
        question:
          "What is type coercion, and what are some common pitfalls associated with relying on it in JavaScript code?",
        solution: `Type coercion is JavaScript's automatic conversion of values from one data type to another during operations or comparisons.

**Types of Coercion:**
1. **Implicit (Automatic):** JavaScript does it automatically
2. **Explicit (Manual):** Developer intentionally converts types

**Common Examples:**
\`\`\`javascript
// String coercion
5 + '3' // '53' (number becomes string)
'5' - 3 // 2 (string becomes number)

// Boolean coercion
if ('hello') { } // true (non-empty string is truthy)
if (0) { } // false (0 is falsy)

// Comparison coercion
'5' == 5 // true (string coerced to number)
'5' === 5 // false (no coercion with strict equality)
\`\`\`

**Common Pitfalls:**
1. **Unexpected string concatenation:**
\`\`\`javascript
let result = 1 + 2 + '3'; // '33' not '6'
\`\`\`

2. **Falsy values confusion:**
\`\`\`javascript
0 == false // true
'' == false // true
null == undefined // true
\`\`\`

3. **Array coercion:**
\`\`\`javascript
[] + [] // '' (empty string)
[] + {} // '[object Object]'
{} + [] // 0
\`\`\`

**Best Practices:**
- Use === instead of ==
- Explicitly convert types when needed
- Be aware of truthy/falsy values`,
        tags: [{ name: "type coercion", link: "" }],
      },
      {
        question: "Describe event bubbling and event capturing.",
        solution: `Event bubbling and event capturing are two phases of event propagation in the DOM.

**Event Capturing (Capture Phase):**
- Events start from the document root and travel down to the target element
- Also called "trickling down"
- Happens first, before the target phase

**Event Bubbling (Bubble Phase):**
- Events start from the target element and bubble up to the document root
- Default behavior in most cases
- Happens after the target phase

**Event Flow Order:**
1. Capture phase (root → target)
2. Target phase (at the target element)
3. Bubble phase (target → root)

**Example:**
\`\`\`javascript
// Bubble phase (default)
document.getElementById('child').addEventListener('click', handler);

// Capture phase (set third parameter to true)
document.getElementById('parent').addEventListener('click', handler, true);

// Stop propagation
function handler(event) {
  event.stopPropagation(); // Stops further propagation
  event.preventDefault(); // Prevents default behavior
}
\`\`\`

**Practical Use:**
- Event delegation uses bubbling
- Capturing useful for intercepting events early
- stopPropagation() can control event flow`,
        tags: [{ name: "event bubbling", link: "" }],
      },
      {
        question: "What distinguishes an 'attribute' from a 'property'?",
        solution: `Attributes and properties are related but different concepts in HTML/DOM manipulation.

**Attributes:**
- Defined in HTML markup
- Always strings
- Initial values set in HTML
- Accessed via getAttribute()/setAttribute()

**Properties:**
- Live DOM object properties
- Can be any JavaScript type
- Current state of the element
- Accessed via dot notation or bracket notation

**Example:**
\`\`\`html
<input id="myInput" type="text" value="initial" />
\`\`\`

\`\`\`javascript
const input = document.getElementById('myInput');

// Attributes (HTML)
input.getAttribute('value'); // 'initial' (always original)
input.setAttribute('value', 'new');

// Properties (DOM)
input.value; // Current value (changes with user input)
input.value = 'updated';

// Type differences
input.getAttribute('disabled'); // 'disabled' or null
input.disabled; // true or false
\`\`\`

**Key Differences:**
- Attributes reflect HTML, properties reflect current DOM state
- Properties are live, attributes are static
- Properties have proper types, attributes are always strings
- Some properties don't have corresponding attributes (like textContent)

**When to use:**
- Use properties for dynamic manipulation
- Use attributes for initial HTML values or custom data attributes`,
        tags: [],
      },
      {
        question:
          "Why is it referred to as a 'Ternary operator,' and what does the term 'Ternary' signify?",
        solution: `The ternary operator is called 'ternary' because it takes three operands, making it the only operator in JavaScript that does so.

**Etymology:**
- 'Ternary' comes from Latin 'ternarius' meaning 'consisting of three'
- Also known as the conditional operator

**Syntax:**
\`\`\`javascript
condition ? expressionIfTrue : expressionIfFalse
\`\`\`

**Three Parts:**
1. **Condition:** Expression that evaluates to true/false
2. **First Expression:** Executed if condition is true
3. **Second Expression:** Executed if condition is false

**Examples:**
\`\`\`javascript
// Basic usage
const age = 18;
const status = age >= 18 ? 'adult' : 'minor';

// Nested ternary (use sparingly)
const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : 'C';

// Function calls
const result = isValid ? processData() : showError();

// Assignment
const message = user.isLoggedIn ? \`Welcome \${user.name}\` : 'Please log in';
\`\`\`

**Benefits:**
- Concise alternative to if-else
- Can be used in expressions
- Returns a value

**Best Practices:**
- Keep conditions simple
- Avoid deep nesting
- Use for simple conditional assignments`,
        tags: [{ name: "ternary operator", link: "" }],
      },
      {
        question:
          "Explain the disparities between variables created using let, var, or const.",
        solution: `The main differences between var, let, and const relate to scope, hoisting, and reassignment.

**Scope:**
\`\`\`javascript
// var: function-scoped
function example() {
  if (true) {
    var x = 1;
  }
  console.log(x); // 1 (accessible outside block)
}

// let/const: block-scoped
function example2() {
  if (true) {
    let y = 1;
    const z = 1;
  }
  console.log(y); // ReferenceError
  console.log(z); // ReferenceError
}
\`\`\`

**Hoisting:**
\`\`\`javascript
// var: hoisted and initialized with undefined
console.log(a); // undefined
var a = 5;

// let/const: hoisted but not initialized (temporal dead zone)
console.log(b); // ReferenceError
let b = 5;

console.log(c); // ReferenceError
const c = 5;
\`\`\`

**Reassignment:**
\`\`\`javascript
// var: can be redeclared and reassigned
var name = 'John';
var name = 'Jane'; // OK
name = 'Bob'; // OK

// let: can be reassigned but not redeclared
let age = 25;
age = 26; // OK
let age = 27; // SyntaxError

// const: cannot be reassigned or redeclared
const PI = 3.14;
PI = 3.15; // TypeError
const PI = 3.15; // SyntaxError
\`\`\`

**Object/Array with const:**
\`\`\`javascript
const obj = { name: 'John' };
obj.name = 'Jane'; // OK (modifying property)
obj = {}; // TypeError (reassigning variable)
\`\`\`

**Best Practices:**
- Use const by default
- Use let when reassignment is needed
- Avoid var in modern JavaScript`,
        tags: [{ name: "let vs var vs const", link: "" }],
      },
      {
        question:
          "Compare ES6 classes and ES5 function constructors, and furnish a use case for the arrow (=>) function syntax.",
        solution: `**ES5 Function Constructors vs ES6 Classes:**

**ES5 Function Constructor:**
\`\`\`javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function() {
  return 'Hello, I am ' + this.name;
};

Person.prototype.getAge = function() {
  return this.age;
};

var person1 = new Person('John', 30);
\`\`\`

**ES6 Class:**
\`\`\`javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return \`Hello, I am \${this.name}\`;
  }

  getAge() {
    return this.age;
  }
}

const person1 = new Person('John', 30);
\`\`\`

**Key Differences:**
- Classes provide cleaner, more readable syntax
- Classes are hoisted but not initialized (temporal dead zone)
- Class methods are non-enumerable by default
- Classes must be called with 'new'
- Classes have built-in support for inheritance with 'extends'

**Arrow Functions Use Cases:**

**1. Lexical 'this' binding:**
\`\`\`javascript
class Timer {
  constructor() {
    this.seconds = 0;
  }

  start() {
    // Arrow function preserves 'this' from enclosing scope
    setInterval(() => {
      this.seconds++;
      console.log(this.seconds);
    }, 1000);
  }
}
\`\`\`

**2. Array methods:**
\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
\`\`\`

**3. Event handlers:**
\`\`\`javascript
class Component {
  constructor() {
    this.count = 0;
    // Arrow function maintains 'this' context
    document.addEventListener('click', () => {
      this.count++;
    });
  }
}
\`\`\`

**Arrow Function Benefits:**
- Shorter syntax for simple functions
- Lexical 'this' binding
- Implicit return for single expressions
- No 'arguments' object (use rest parameters instead)`,
        tags: [{ name: "arrow functions", link: "" }],
      },
    ],
  },
  {
    id: 2,
    topic: "Javascript",
    categories: "Mid",
    tags: [
      { name: "this in ES6", link: "" },
      { name: "prototypal inheritance", link: "" },
      { name: "array methods", link: "" },
      { name: "host vs native objects", link: "" },
      { name: "Function.call", link: "" },
      { name: "Function.prototype.bind", link: "" },
      { name: "feature detection vs inference", link: "" },
      { name: "strict mode", link: "" },
      { name: "debugging tools", link: "" },
      { name: "synchronous vs asynchronous", link: "" },
    ],
    prepareLink: "", // Our own links :Preparation
    externallinks: [],
    questions: [
      {
        question:
          "Can you provide an illustration of how ES6 has altered the approach to working with 'this' in JavaScript?",
        solution: `ES6 introduced arrow functions which fundamentally changed how 'this' behaves in JavaScript.

**Traditional Function 'this' Behavior:**
\`\`\`javascript
const obj = {
  name: 'John',
  greet: function() {
    console.log('Hello, ' + this.name); // 'this' refers to obj
    
    setTimeout(function() {
      console.log('Delayed: ' + this.name); // 'this' refers to global/window
    }, 1000);
  }
};
\`\`\`

**ES6 Arrow Function Solution:**
\`\`\`javascript
const obj = {
  name: 'John',
  greet: function() {
    console.log('Hello, ' + this.name); // 'this' refers to obj
    
    setTimeout(() => {
      console.log('Delayed: ' + this.name); // 'this' still refers to obj
    }, 1000);
  }
};
\`\`\`

**Key Changes:**
1. **Lexical 'this' binding:** Arrow functions inherit 'this' from enclosing scope
2. **No 'this' binding:** Arrow functions don't have their own 'this'
3. **Cannot be used as constructors:** Arrow functions can't be called with 'new'

**Class Methods Example:**
\`\`\`javascript
class Component {
  constructor() {
    this.state = { count: 0 };
  }
  
  // Traditional method
  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }
  
  // Arrow function method (auto-bound)
  handleClickArrow = () => {
    this.setState({ count: this.state.count + 1 });
  }
}
\`\`\`

**Benefits:**
- Eliminates need for .bind(this)
- More predictable 'this' behavior
- Cleaner event handler syntax
- Better for callbacks and async operations`,
        tags: [{ name: "this in ES6", link: "" }],
      },
      {
        question: "Explain the concept of prototypal inheritance.",
        solution: `Prototypal inheritance is JavaScript's mechanism for objects to inherit properties and methods from other objects through the prototype chain.

**How it works:**
\`\`\`javascript
// Constructor function
function Animal(name) {
  this.name = name;
}

// Add method to prototype
Animal.prototype.speak = function() {
  return this.name + ' makes a sound';
};

// Create instance
const dog = new Animal('Rex');
console.log(dog.speak()); // 'Rex makes a sound'
\`\`\`

**Prototype Chain:**
\`\`\`javascript
function Dog(name, breed) {
  Animal.call(this, name); // Call parent constructor
  this.breed = breed;
}

// Set up inheritance
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Add Dog-specific method
Dog.prototype.bark = function() {
  return this.name + ' barks!';
};

const myDog = new Dog('Buddy', 'Golden Retriever');
console.log(myDog.speak()); // Inherited from Animal
console.log(myDog.bark());  // Dog-specific method
\`\`\`

**ES6 Classes (syntactic sugar):**
\`\`\`javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    return this.name + ' makes a sound';
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  
  bark() {
    return this.name + ' barks!';
  }
}
\`\`\`

**Key Concepts:**
- Every object has a __proto__ property pointing to its prototype
- Prototype chain: object → Constructor.prototype → Object.prototype → null
- Methods are shared through prototype, not copied to each instance
- instanceof operator checks the prototype chain

**Benefits:**
- Memory efficient (methods shared, not duplicated)
- Dynamic - can add methods to prototype at runtime
- Flexible inheritance model`,
        tags: [{ name: "prototypal inheritance", link: "" }],
      },
      {
        question:
          "Explain the primary distinction between the Array.forEach() loop and Array.map() method, as well as when to choose one over the other.",
        solution: `**forEach() vs map() - Key Differences:**

**forEach():**
- Executes a function for each array element
- Returns undefined
- Used for side effects (logging, DOM manipulation, etc.)
- Mutates original data or performs actions

**map():**
- Creates a new array with transformed elements
- Returns a new array of the same length
- Used for data transformation
- Follows functional programming principles

**Examples:**

**forEach() - Side Effects:**
\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];

// Logging (side effect)
numbers.forEach(num => console.log(num));

// DOM manipulation
const items = ['apple', 'banana', 'orange'];
items.forEach(item => {
  const li = document.createElement('li');
  li.textContent = item;
  document.getElementById('list').appendChild(li);
});

// Modifying external variable
let sum = 0;
numbers.forEach(num => sum += num);
\`\`\`

**map() - Data Transformation:**
\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];

// Transform to new array
const doubled = numbers.map(num => num * 2);
// [2, 4, 6, 8, 10]

const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 }
];

// Extract specific properties
const names = users.map(user => user.name);
// ['John', 'Jane']

// Transform objects
const userInfo = users.map(user => ({
  ...user,
  isAdult: user.age >= 18
}));
\`\`\`

**When to use which:**

**Use forEach() when:**
- You need to perform side effects
- You don't need a return value
- You're updating DOM elements
- You're logging or debugging
- You're modifying external variables

**Use map() when:**
- You need to transform data
- You want to create a new array
- You're following functional programming
- You need to chain array methods
- You want immutable operations

**Chaining Example:**
\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];

// map() can be chained
const result = numbers
  .map(x => x * 2)
  .filter(x => x > 5)
  .map(x => x.toString());

// forEach() cannot be chained (returns undefined)
// numbers.forEach(x => x * 2).filter(...) // Error!
\`\`\``,
        tags: [{ name: "array methods", link: "" }],
      },
      {
        question: "Distinguish between host objects and native objects.",
        solution: `**Native Objects vs Host Objects:**

**Native Objects:**
- Built into JavaScript language itself
- Defined by ECMAScript specification
- Available in all JavaScript environments
- Examples: Object, Array, Function, String, Number, Date, RegExp, Math

**Host Objects:**
- Provided by the host environment (browser, Node.js, etc.)
- Not part of ECMAScript specification
- Environment-specific
- Examples: window, document, console, XMLHttpRequest, setTimeout

**Examples:**

**Native Objects:**
\`\`\`javascript
// These work in any JavaScript environment
const arr = new Array(1, 2, 3);
const obj = new Object();
const date = new Date();
const regex = new RegExp('pattern');
const str = new String('hello');

// Built-in methods
Math.random();
JSON.parse('{}');
parseInt('123');
\`\`\`

**Host Objects (Browser):**
\`\`\`javascript
// Browser-specific objects
window.alert('Hello');
document.getElementById('myElement');
console.log('Debug message');
setTimeout(() => {}, 1000);
fetch('/api/data');
localStorage.setItem('key', 'value');
\`\`\`

**Host Objects (Node.js):**
\`\`\`javascript
// Node.js-specific objects
const fs = require('fs');
const path = require('path');
process.env.NODE_ENV;
__dirname;
__filename;
global.myVariable;
\`\`\`

**Key Differences:**

1. **Portability:**
   - Native objects work everywhere
   - Host objects are environment-specific

2. **Standardization:**
   - Native objects follow ECMAScript standards
   - Host objects follow host environment APIs

3. **Availability:**
   - Native objects always available
   - Host objects may not exist in different environments

**Practical Implications:**
\`\`\`javascript
// This works everywhere (native)
const data = JSON.stringify({name: 'John'});

// This only works in browsers (host)
if (typeof window !== 'undefined') {
  window.localStorage.setItem('data', data);
}

// This only works in Node.js (host)
if (typeof process !== 'undefined') {
  process.stdout.write(data);
}
\`\`\``,
        tags: [{ name: "host vs native objects", link: "" }],
      },
      {
        question:
          "Can you elucidate the purposes of Function.call and Function.apply, along with their notable differences?",
        solution: `**Function.call() and Function.apply()** are methods used to invoke functions with a specific 'this' context and arguments.

**Purpose:**
- Explicitly set the 'this' value when calling a function
- Borrow methods from other objects
- Invoke functions with different contexts

**Function.call():**
- Arguments passed individually
- Syntax: func.call(thisArg, arg1, arg2, ...)

**Function.apply():**
- Arguments passed as an array
- Syntax: func.apply(thisArg, [arg1, arg2, ...])

**Examples:**

**Basic Usage:**
\`\`\`javascript
function greet(greeting, punctuation) {
  return greeting + ', ' + this.name + punctuation;
}

const person = { name: 'John' };

// Using call()
const result1 = greet.call(person, 'Hello', '!');
// 'Hello, John!'

// Using apply()
const result2 = greet.apply(person, ['Hi', '?']);
// 'Hi, John?'
\`\`\`

**Method Borrowing:**
\`\`\`javascript
const obj1 = {
  name: 'Object 1',
  getName: function() {
    return this.name;
  }
};

const obj2 = { name: 'Object 2' };

// Borrow method from obj1
const name = obj1.getName.call(obj2);
// 'Object 2'
\`\`\`

**Array-like Objects:**
\`\`\`javascript
// Convert arguments to real array
function myFunction() {
  const argsArray = Array.prototype.slice.call(arguments);
  return argsArray;
}

// Or with apply
function findMax() {
  return Math.max.apply(null, arguments);
}

console.log(findMax(1, 5, 3, 9, 2)); // 9
\`\`\`

**Key Differences:**

1. **Argument Passing:**
   - call(): Individual arguments
   - apply(): Array of arguments

2. **Use Cases:**
   - call(): When you know arguments beforehand
   - apply(): When arguments are in an array

3. **Performance:**
   - call(): Slightly faster (no array creation)
   - apply(): Useful for dynamic argument lists

**Modern Alternative - Spread Operator:**
\`\`\`javascript
// Instead of apply()
Math.max.apply(null, [1, 2, 3]);

// Use spread operator
Math.max(...[1, 2, 3]);

// Instead of call() with array
func.apply(thisArg, argsArray);

// Use spread operator
func.call(thisArg, ...argsArray);
\`\`\``,
        tags: [{ name: "Function.call", link: "" }],
      },
      {
        question: "Describe the Function.prototype.bind method.",
        solution: `**Function.prototype.bind()** creates a new function with a permanently bound 'this' value and optionally pre-filled arguments.

**Syntax:**
\`\`\`javascript
func.bind(thisArg, arg1, arg2, ...)
\`\`\`

**Key Characteristics:**
- Returns a new function (doesn't invoke immediately)
- Permanently sets 'this' context
- Supports partial application (currying)
- Cannot be overridden once bound

**Basic Usage:**
\`\`\`javascript
const person = {
  name: 'John',
  greet: function(greeting) {
    return greeting + ', ' + this.name;
  }
};

// Create bound function
const boundGreet = person.greet.bind(person);

// 'this' is permanently set to person
console.log(boundGreet('Hello')); // 'Hello, John'

// Even when assigned to variable
const greetFunc = boundGreet;
console.log(greetFunc('Hi')); // 'Hi, John'
\`\`\`

**Event Handlers:**
\`\`\`javascript
class Button {
  constructor(element) {
    this.element = element;
    this.clickCount = 0;
    
    // Bind method to maintain 'this' context
    this.element.addEventListener('click', this.handleClick.bind(this));
  }
  
  handleClick() {
    this.clickCount++;
    console.log('Clicked ' + this.clickCount + ' times');
  }
}
\`\`\`

**Partial Application:**
\`\`\`javascript
function multiply(a, b, c) {
  return a * b * c;
}

// Pre-fill first argument
const multiplyByTwo = multiply.bind(null, 2);
console.log(multiplyByTwo(3, 4)); // 2 * 3 * 4 = 24

// Pre-fill multiple arguments
const multiplyByTwoAndThree = multiply.bind(null, 2, 3);
console.log(multiplyByTwoAndThree(4)); // 2 * 3 * 4 = 24
\`\`\`

**Differences from call() and apply():**

| Method | Execution | Returns | 'this' binding |
|--------|-----------|---------|----------------|
| call() | Immediate | Function result | Temporary |
| apply() | Immediate | Function result | Temporary |
| bind() | Deferred | New function | Permanent |

**Polyfill (simplified):**
\`\`\`javascript
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    const aArgs = Array.prototype.slice.call(arguments, 1);
    const fToBind = this;
    
    return function() {
      return fToBind.apply(oThis, 
        aArgs.concat(Array.prototype.slice.call(arguments)));
    };
  };
}
\`\`\`

**Common Use Cases:**
- Event handlers in classes
- Callback functions
- Partial application/currying
- Method borrowing with fixed context
- React component methods`,
        tags: [{ name: "Function.prototype.bind", link: "" }],
      },
      {
        question:
          "Explain the differences between feature detection, feature inference, and utilizing the User Agent (UA) string.",
        solution: `**Three approaches to determine browser capabilities:**

**1. Feature Detection (Recommended):**
- Directly test if a feature exists
- Most reliable and future-proof method
- Tests actual functionality, not assumptions

**2. Feature Inference (Not Recommended):**
- Assumes feature support based on other features
- Less reliable than direct detection
- Can lead to false positives

**3. User Agent String (Avoid):**
- Parse browser information from navigator.userAgent
- Unreliable due to spoofing and variations
- Maintenance nightmare

**Examples:**

**Feature Detection:**
\`\`\`javascript
// Check for geolocation support
if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(success, error);
} else {
  console.log('Geolocation not supported');
}

// Check for localStorage
if (typeof Storage !== 'undefined') {
  localStorage.setItem('key', 'value');
} else {
  // Use cookies or other fallback
}

// Check for fetch API
if ('fetch' in window) {
  fetch('/api/data').then(response => response.json());
} else {
  // Use XMLHttpRequest fallback
}
\`\`\`

**Feature Inference (Problematic):**
\`\`\`javascript
// BAD: Assume touch support based on screen size
if (screen.width < 768) {
  // Assume mobile device with touch
  enableTouchEvents();
}

// BAD: Assume modern features based on one feature
if ('querySelector' in document) {
  // Assume all ES6 features are supported
  useES6Features();
}
\`\`\`

**User Agent String (Unreliable):**
\`\`\`javascript
// BAD: Parse user agent string
const userAgent = navigator.userAgent;
if (userAgent.includes('Chrome')) {
  // Assume Chrome-specific behavior
} else if (userAgent.includes('Firefox')) {
  // Assume Firefox-specific behavior
}

// Problems:
// - Easy to spoof
// - Constantly changing
// - Mobile browsers often lie
// - Edge cases and variations
\`\`\`

**Best Practices:**

**Progressive Enhancement:**
\`\`\`javascript
// Start with basic functionality
function basicImageGallery() {
  // Basic image display
}

// Enhance if features are available
if ('IntersectionObserver' in window) {
  // Add lazy loading
  addLazyLoading();
}

if ('requestAnimationFrame' in window) {
  // Add smooth animations
  addAnimations();
}
\`\`\`

**Modernizr Library:**
\`\`\`javascript
// Modernizr provides feature detection
if (Modernizr.webgl) {
  // Use WebGL
} else {
  // Fallback to Canvas 2D
}

if (Modernizr.localstorage) {
  // Use localStorage
} else {
  // Use cookies
}
\`\`\`

**Why Feature Detection Wins:**
- Future-proof
- Accurate
- No maintenance overhead
- Works with unknown browsers
- Handles partial implementations`,
        tags: [{ name: "feature detection vs inference", link: "" }],
      },
      {
        question:
          "List the advantages and disadvantages of extending built-in JavaScript objects.",
        solution: `**Extending built-in JavaScript objects** means adding methods or properties to native prototypes like Array.prototype, String.prototype, etc.

**Advantages:**

1. **Convenient API:**
\`\`\`javascript
// Add custom method to all arrays
Array.prototype.last = function() {
  return this[this.length - 1];
};

const arr = [1, 2, 3];
console.log(arr.last()); // 3
\`\`\`

2. **Polyfills for missing features:**
\`\`\`javascript
// Add Array.includes for older browsers
if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement) {
    return this.indexOf(searchElement) !== -1;
  };
}
\`\`\`

3. **Consistent interface:**
- Methods available on all instances
- Familiar syntax for developers

**Disadvantages:**

1. **Global pollution:**
\`\`\`javascript
// Affects ALL arrays in the application
Array.prototype.customMethod = function() { /* ... */ };

// Every array now has this method
const arr1 = [];
const arr2 = new Array();
// Both have customMethod
\`\`\`

2. **Naming conflicts:**
\`\`\`javascript
// Your extension
Array.prototype.find = function() { /* custom logic */ };

// Later, native Array.find is added to browsers
// Your implementation overrides the native one!
\`\`\`

3. **Enumeration issues:**
\`\`\`javascript
Array.prototype.customProp = 'value';

const arr = [1, 2, 3];
for (let key in arr) {
  console.log(key); // '0', '1', '2', 'customProp'
}
\`\`\`

4. **Library conflicts:**
\`\`\`javascript
// Library A adds method
Array.prototype.helper = function() { /* A's logic */ };

// Library B adds same method
Array.prototype.helper = function() { /* B's logic */ };
// B overwrites A's method
\`\`\`

5. **Maintenance burden:**
- Hard to track where extensions come from
- Debugging becomes difficult
- Can break with browser updates

**Better Alternatives:**

**1. Utility functions:**
\`\`\`javascript
// Instead of extending Array.prototype
const ArrayUtils = {
  last: (arr) => arr[arr.length - 1],
  first: (arr) => arr[0]
};

ArrayUtils.last([1, 2, 3]); // 3
\`\`\`

**2. Composition:**
\`\`\`javascript
class ExtendedArray extends Array {
  last() {
    return this[this.length - 1];
  }
}

const arr = new ExtendedArray(1, 2, 3);
arr.last(); // 3
\`\`\`

**3. Modules:**
\`\`\`javascript
// arrayExtensions.js
export const last = (arr) => arr[arr.length - 1];
export const first = (arr) => arr[0];

// usage
import { last } from './arrayExtensions';
last([1, 2, 3]); // 3
\`\`\`

**When it's acceptable:**
- Polyfills for standardized features
- Internal applications with controlled environment
- Well-documented team conventions`,
        tags: [],
      },
      {
        question:
          "Discuss the same-origin policy's implications for JavaScript.",
        solution: `**Same-Origin Policy** is a critical security concept that restricts how documents or scripts from one origin can interact with resources from another origin.

**What constitutes an origin:**
An origin is defined by the combination of:
- **Protocol** (http/https)
- **Domain** (example.com)
- **Port** (80, 443, 3000, etc.)

**Examples:**
\`\`\`javascript
// Same origin
https://example.com/page1
https://example.com/page2

// Different origins
https://example.com      // different from http://example.com (protocol)
https://api.example.com  // different from https://example.com (subdomain)
https://example.com:3000 // different from https://example.com (port)
\`\`\`

**What's restricted:**

1. **XMLHttpRequest/Fetch:**
\`\`\`javascript
// This will be blocked by same-origin policy
fetch('https://api.different-domain.com/data')
  .then(response => response.json())
  .catch(error => console.log('CORS error:', error));
\`\`\`

2. **DOM access:**
\`\`\`javascript
// Cannot access iframe from different origin
const iframe = document.getElementById('external-iframe');
try {
  iframe.contentDocument.body; // Blocked!
} catch (error) {
  console.log('Same-origin policy violation');
}
\`\`\`

3. **Local Storage/Session Storage:**
\`\`\`javascript
// Cannot access storage from different origins
// Each origin has its own storage space
\`\`\`

**Workarounds and Solutions:**

**1. CORS (Cross-Origin Resource Sharing):**
\`\`\`javascript
// Server must include CORS headers
// Access-Control-Allow-Origin: *
// Access-Control-Allow-Methods: GET, POST
// Access-Control-Allow-Headers: Content-Type

fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ data: 'value' })
});
\`\`\`

**2. JSONP (Legacy approach):**
\`\`\`javascript
// Server wraps response in callback function
function handleResponse(data) {
  console.log(data);
}

// Dynamic script tag bypasses same-origin policy
const script = document.createElement('script');
script.src = 'https://api.example.com/data?callback=handleResponse';
document.head.appendChild(script);
\`\`\`

**3. Proxy server:**
\`\`\`javascript
// Instead of calling external API directly
// fetch('https://external-api.com/data') // Blocked

// Call your own server which proxies the request
fetch('/api/proxy/external-data') // Allowed
\`\`\`

**4. postMessage for iframe communication:**
\`\`\`javascript
// Parent window
const iframe = document.getElementById('myframe');
iframe.contentWindow.postMessage('Hello', 'https://other-domain.com');

// Child iframe (different origin)
window.addEventListener('message', (event) => {
  if (event.origin === 'https://parent-domain.com') {
    console.log('Received:', event.data);
  }
});
\`\`\`

**Security implications:**

**Protects against:**
- Cross-site scripting (XSS) attacks
- Data theft from other websites
- Unauthorized API calls
- Session hijacking

**Example attack prevented:**
\`\`\`javascript
// Malicious site cannot do this:
// fetch('https://bank.com/account-info')
//   .then(data => sendToAttacker(data));
\`\`\`

**Modern considerations:**
- Service Workers respect same-origin policy
- Web Workers have their own origin context
- Modules (import/export) follow same-origin rules
- WebSockets can bypass with proper server setup`,
        tags: [{ name: "same-origin policy", link: "" }],
      },
      {
        question:
          "Define strict mode and outline some of its advantages and disadvantages.",
        solution: `**Strict Mode** is a feature in JavaScript that enables a stricter parsing and error handling mode, catching common coding mistakes and preventing unsafe actions.

**How to enable:**
\`\`\`javascript
// Global strict mode
'use strict';

// Function-level strict mode
function myFunction() {
  'use strict';
  // Function code in strict mode
}

// Module strict mode (ES6 modules are automatically strict)
export function myModule() {
  // Already in strict mode
}
\`\`\`

**Advantages:**

**1. Catches silent errors:**
\`\`\`javascript
'use strict';

// Without strict mode: creates global variable
// With strict mode: throws ReferenceError
myVariable = 10; // Error: myVariable is not defined
\`\`\`

**2. Prevents accidental globals:**
\`\`\`javascript
'use strict';

function createUser() {
  userName = 'John'; // Error: userName is not defined
  return userName;
}
\`\`\`

**3. Eliminates 'this' coercion:**
\`\`\`javascript
'use strict';

function regularFunction() {
  console.log(this); // undefined (not global object)
}

regularFunction();
\`\`\`

**4. Prevents duplicate property names:**
\`\`\`javascript
'use strict';

// Error in strict mode
const obj = {
  prop: 1,
  prop: 2 // SyntaxError: Duplicate data property
};
\`\`\`

**5. Prevents duplicate parameter names:**
\`\`\`javascript
'use strict';

// Error in strict mode
function myFunc(a, a, b) { // SyntaxError
  return a + b;
}
\`\`\`

**6. Makes eval() safer:**
\`\`\`javascript
'use strict';

eval('var x = 10');
console.log(x); // ReferenceError: x is not defined
// Variables created in eval don't leak to surrounding scope
\`\`\`

**7. Prevents deletion of undeletable properties:**
\`\`\`javascript
'use strict';

delete Object.prototype; // TypeError
delete window; // TypeError
\`\`\`

**Disadvantages:**

**1. Breaking changes:**
\`\`\`javascript
// Legacy code might break
function oldCode() {
  // This worked before strict mode
  arguments = [1, 2, 3]; // Error in strict mode
}
\`\`\`

**2. Limited browser support (historical):**
- Older browsers might not support all strict mode features
- Need to test thoroughly

**3. Learning curve:**
- Developers need to understand new restrictions
- Some previously valid code becomes invalid

**4. Debugging complexity:**
\`\`\`javascript
'use strict';

// More errors to handle
try {
  someUndefinedFunction();
} catch (error) {
  // Need to handle more potential errors
}
\`\`\`

**What strict mode restricts:**

- Using undeclared variables
- Deleting variables, functions, or arguments
- Duplicating parameter names
- Octal numeric literals
- Writing to read-only properties
- Using reserved words as variable names
- Using 'with' statements

**Best Practices:**
\`\`\`javascript
// Use strict mode in all new code
'use strict';

// ES6 modules are automatically strict
export function myFunction() {
  // No need for 'use strict' here
}

// Use linters like ESLint to catch issues
// Configure build tools to enforce strict mode
\`\`\`

**Modern JavaScript:**
- ES6 modules are automatically in strict mode
- Most modern frameworks assume strict mode
- Recommended for all new development`,
        tags: [{ name: "strict mode", link: "" }],
      },
      {
        question:
          "Analyze the pros and cons of writing JavaScript code in a language that compiles to JavaScript.",
        solution: "",
        tags: [{ name: "compiling to JavaScript", link: "" }],
      },
      {
        question:
          "What tools and techniques do you employ for debugging JavaScript code?",
        solution: "",
        tags: [{ name: "debugging tools", link: "" }],
      },
      {
        question:
          "Differentiate between synchronous and asynchronous functions and elucidate the event loop.",
        solution: "",
        tags: [{ name: "synchronous vs asynchronous", link: "" }],
      },
      {
        question:
          "Describe the advantages of using the arrow syntax for methods in constructors.",
        solution: "",
        tags: [{ name: "this in ES6", link: "" }],
      },
      {
        question:
          "Define a higher-order function and provide an example of object or array destructuring.",
        solution: "",
        tags: [{ name: "array methods", link: "" }],
      },
    ],
  },
  {
    id: 3,
    topic: "Javascript",
    categories: "Senior",
    tags: [
      { name: "immutability", link: "" },
      { name: "same-origin policy", link: "" },
      { name: "compiling to JavaScript", link: "" },
    ],
    prepareLink: "", // Our own links :Preparation
    externallinks: [],
    questions: [
      {
        question:
          "Enumerate the benefits and drawbacks of immutability and explain how you can achieve it in your code.",
        solution: `**Immutability** means that once an object is created, it cannot be changed. Instead of modifying existing objects, you create new ones with the desired changes.

**Benefits of Immutability:**

**1. Predictable Code:**
\`\`\`javascript
// Immutable approach
const user = { name: 'John', age: 30 };
const updatedUser = { ...user, age: 31 }; // New object

// Original user object unchanged
console.log(user.age); // 30
console.log(updatedUser.age); // 31
\`\`\`

**2. Easier Debugging:**
\`\`\`javascript
// No unexpected mutations
const processUser = (user) => {
  return { ...user, processed: true }; // Returns new object
};

const originalUser = { name: 'Jane' };
const processedUser = processUser(originalUser);
// originalUser is unchanged, easier to trace bugs
\`\`\`

**3. Thread Safety:**
- Immutable objects are inherently thread-safe
- No race conditions when sharing data
- Safe for concurrent operations

**4. Caching and Memoization:**
\`\`\`javascript
// React.memo works better with immutable props
const UserComponent = React.memo(({ user }) => {
  return <div>{user.name}</div>;
});

// Shallow comparison works reliably
\`\`\`

**5. Time Travel Debugging:**
\`\`\`javascript
// Redux DevTools can replay actions
const history = [state1, state2, state3];
// Each state is immutable snapshot
\`\`\`

**Drawbacks of Immutability:**

**1. Memory Overhead:**
\`\`\`javascript
// Creates many objects
const users = [];
for (let i = 0; i < 1000; i++) {
  users.push({ ...user, id: i }); // 1000 separate objects
}
\`\`\`

**2. Performance Cost:**
\`\`\`javascript
// Copying large objects is expensive
const largeObject = { /* thousands of properties */ };
const updated = { ...largeObject, oneProperty: 'new' };
\`\`\`

**3. Learning Curve:**
- Requires different thinking patterns
- More complex for beginners
- Need to understand functional programming concepts

**4. Verbose Code:**
\`\`\`javascript
// Mutable (simple)
user.address.city = 'New York';

// Immutable (verbose)
const updatedUser = {
  ...user,
  address: {
    ...user.address,
    city: 'New York'
  }
};
\`\`\`

**How to Achieve Immutability:**

**1. Object.freeze():**
\`\`\`javascript
const obj = Object.freeze({ name: 'John', age: 30 });
obj.age = 31; // Silently fails (throws in strict mode)
console.log(obj.age); // 30
\`\`\`

**2. Spread Operator:**
\`\`\`javascript
// Objects
const newObj = { ...oldObj, property: 'new value' };

// Arrays
const newArray = [...oldArray, newItem];
const filteredArray = oldArray.filter(item => item.id !== targetId);
\`\`\`

**3. Array Methods (non-mutating):**
\`\`\`javascript
// Use these instead of mutating methods
const newArray = arr.map(item => ({ ...item, processed: true }));
const filtered = arr.filter(item => item.active);
const sorted = [...arr].sort((a, b) => a.name.localeCompare(b.name));
\`\`\`

**4. Libraries (Immutable.js, Immer):**
\`\`\`javascript
// Immer example
import produce from 'immer';

const newState = produce(currentState, draft => {
  draft.user.name = 'New Name';
  draft.items.push(newItem);
});
\`\`\`

**5. Functional Programming Patterns:**
\`\`\`javascript
// Pure functions
const addTodo = (todos, newTodo) => [...todos, newTodo];
const updateTodo = (todos, id, updates) => 
  todos.map(todo => todo.id === id ? { ...todo, ...updates } : todo);
const removeTodo = (todos, id) => todos.filter(todo => todo.id !== id);
\`\`\`

**Best Practices:**
- Use immutability for state management
- Combine with structural sharing for performance
- Use linters to prevent mutations
- Consider libraries for complex nested updates
- Balance between immutability and performance needs`,
        tags: [{ name: "immutability", link: "" }],
      },
      {
        question:
          "Discuss the same-origin policy's implications for JavaScript.",
        solution: `**Same-Origin Policy** is a critical security concept that restricts how documents or scripts from one origin can interact with resources from another origin.

**What constitutes an origin:**
An origin is defined by the combination of:
- **Protocol** (http/https)
- **Domain** (example.com)
- **Port** (80, 443, 3000, etc.)

**Examples:**
\`\`\`javascript
// Same origin
https://example.com/page1
https://example.com/page2

// Different origins
https://example.com      // different from http://example.com (protocol)
https://api.example.com  // different from https://example.com (subdomain)
https://example.com:3000 // different from https://example.com (port)
\`\`\`

**What's restricted:**

1. **XMLHttpRequest/Fetch:**
\`\`\`javascript
// This will be blocked by same-origin policy
fetch('https://api.different-domain.com/data')
  .then(response => response.json())
  .catch(error => console.log('CORS error:', error));
\`\`\`

2. **DOM access:**
\`\`\`javascript
// Cannot access iframe from different origin
const iframe = document.getElementById('external-iframe');
try {
  iframe.contentDocument.body; // Blocked!
} catch (error) {
  console.log('Same-origin policy violation');
}
\`\`\`

3. **Local Storage/Session Storage:**
\`\`\`javascript
// Cannot access storage from different origins
// Each origin has its own storage space
\`\`\`

**Workarounds and Solutions:**

**1. CORS (Cross-Origin Resource Sharing):**
\`\`\`javascript
// Server must include CORS headers
// Access-Control-Allow-Origin: *
// Access-Control-Allow-Methods: GET, POST
// Access-Control-Allow-Headers: Content-Type

fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ data: 'value' })
});
\`\`\`

**2. JSONP (Legacy approach):**
\`\`\`javascript
// Server wraps response in callback function
function handleResponse(data) {
  console.log(data);
}

// Dynamic script tag bypasses same-origin policy
const script = document.createElement('script');
script.src = 'https://api.example.com/data?callback=handleResponse';
document.head.appendChild(script);
\`\`\`

**3. Proxy server:**
\`\`\`javascript
// Instead of calling external API directly
// fetch('https://external-api.com/data') // Blocked

// Call your own server which proxies the request
fetch('/api/proxy/external-data') // Allowed
\`\`\`

**4. postMessage for iframe communication:**
\`\`\`javascript
// Parent window
const iframe = document.getElementById('myframe');
iframe.contentWindow.postMessage('Hello', 'https://other-domain.com');

// Child iframe (different origin)
window.addEventListener('message', (event) => {
  if (event.origin === 'https://parent-domain.com') {
    console.log('Received:', event.data);
  }
});
\`\`\`

**Security implications:**

**Protects against:**
- Cross-site scripting (XSS) attacks
- Data theft from other websites
- Unauthorized API calls
- Session hijacking

**Example attack prevented:**
\`\`\`javascript
// Malicious site cannot do this:
// fetch('https://bank.com/account-info')
//   .then(data => sendToAttacker(data));
\`\`\`

**Modern considerations:**
- Service Workers respect same-origin policy
- Web Workers have their own origin context
- Modules (import/export) follow same-origin rules
- WebSockets can bypass with proper server setup`,
        tags: [{ name: "same-origin policy", link: "" }],
      },
      {
        question:
          "Analyze the pros and cons of writing JavaScript code in a language that compiles to JavaScript.",
        solution: `**Languages that compile to JavaScript** include TypeScript, CoffeeScript, Dart, Elm, ClojureScript, ReasonML, and others. These offer different syntax and features while targeting JavaScript as the output.

**Pros:**

**1. Enhanced Type Safety:**
\`\`\`typescript
// TypeScript example
interface User {
  id: number;
  name: string;
  email: string;
}

function processUser(user: User): string {
  return \`Hello, \${user.name}\`; // Compile-time type checking
}
\`\`\`

**2. Modern Language Features:**
\`\`\`typescript
// Advanced features before they're in JavaScript
class UserService {
  private users: User[] = [];
  
  async getUser(id: number): Promise<User | null> {
    return this.users.find(u => u.id === id) ?? null;
  }
}
\`\`\`

**3. Better Tooling:**
- Superior IDE support with autocomplete
- Better refactoring capabilities
- Compile-time error detection
- Enhanced debugging experience

**4. Code Organization:**
\`\`\`typescript
// Modules, namespaces, interfaces
export namespace UserUtils {
  export function validateEmail(email: string): boolean {
    return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
  }
}
\`\`\`

**5. Documentation Through Types:**
\`\`\`typescript
// Self-documenting code
function calculateTax(
  income: number,
  taxRate: number,
  deductions?: number
): { grossTax: number; netTax: number } {
  const grossTax = income * taxRate;
  const netTax = grossTax - (deductions || 0);
  return { grossTax, netTax };
}
\`\`\`

**6. Large Team Benefits:**
- Consistent coding standards
- Easier onboarding
- Reduced runtime errors
- Better collaboration

**Cons:**

**1. Build Complexity:**
\`\`\`json
// Additional build tools required
{
  "scripts": {
    "build": "tsc",
    "watch": "tsc --watch",
    "dev": "ts-node src/index.ts"
  },
  "devDependencies": {
    "typescript": "^4.9.0",
    "@types/node": "^18.0.0"
  }
}
\`\`\`

**2. Learning Curve:**
\`\`\`typescript
// Developers need to learn new syntax
type ApiResponse<T> = {
  data: T;
  status: 'success' | 'error';
  message?: string;
};

function handleResponse<T>(
  response: ApiResponse<T>
): T | never {
  if (response.status === 'error') {
    throw new Error(response.message);
  }
  return response.data;
}
\`\`\`

**3. Debugging Complexity:**
\`\`\`javascript
// Source maps needed for debugging
// Original TypeScript:
const users = await fetchUsers();

// Compiled JavaScript (harder to debug):
var users = await fetchUsers();
\`\`\`

**4. Compilation Time:**
- Slower development feedback
- Build step adds overhead
- CI/CD pipeline complexity

**5. Third-party Library Issues:**
\`\`\`typescript
// Type definitions may be missing or incorrect
import someLibrary from 'some-library'; // May need @types/some-library

// Or manual type declarations
declare module 'legacy-library' {
  export function doSomething(param: any): any;
}
\`\`\`

**6. Team Adoption Challenges:**
- Not all developers may want to learn
- Migration of existing codebase
- Potential resistance to change

**Popular Options Comparison:**

**TypeScript:**
\`\`\`typescript
// Gradual adoption, JavaScript superset
let message: string = "Hello, World!";
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}
\`\`\`

**CoffeeScript:**
\`\`\`coffeescript
# More concise syntax
message = "Hello, World!"
greet = (name) -> "Hello, #{name}!"
\`\`\`

**Elm:**
\`\`\`elm
-- Functional programming, no runtime errors
greet : String -> String
greet name = "Hello, " ++ name ++ "!"
\`\`\`

**When to Use:**

**Good for:**
- Large applications
- Team development
- Long-term projects
- Complex business logic
- When type safety is crucial

**Avoid when:**
- Simple scripts or prototypes
- Small teams comfortable with JavaScript
- Rapid prototyping needed
- Legacy system constraints
- Limited development resources

**Best Practices:**
- Start with TypeScript for gradual adoption
- Invest in proper tooling setup
- Train team members adequately
- Use strict compilation settings
- Maintain good type definitions`,
        tags: [{ name: "compiling to JavaScript", link: "" }],
      },
    ],
  },
  {
    id: 4,
    topic: "Typescript",
    categories: "Junior",
    tags: [
      { name: "basic types", link: "" },
      { name: "interfaces", link: "" },
      { name: "type aliases", link: "" },
      { name: "function signatures", link: "" },
      { name: "arrays", link: "" },
      { name: "tuples", link: "" },
      { name: "enums", link: "" },
      { name: "any vs unknown", link: "" },
      { name: "null vs undefined", link: "" },
      { name: "object types", link: "" },
      { name: "optional properties", link: "" },
      { name: "readonly", link: "" },
      { name: "union types", link: "" },
      { name: "intersection types", link: "" },
      { name: "literal types", link: "" },
      { name: "type assertion", link: "" },
      { name: "as const", link: "" },
      { name: "void", link: "" },
      { name: "never", link: "" },
      { name: "function overloads", link: "" },
      { name: "generics", link: "" },
      { name: "generic constraints", link: "" },
      { name: "keyof", link: "" },
      { name: "typeof", link: "" },
      { name: "mapped types", link: "" },
      { name: "utility types", link: "" },
      { name: "Partial", link: "" },
      { name: "Required", link: "" },
      { name: "Pick", link: "" },
      { name: "classes", link: "" },
      { name: "access modifiers", link: "" },
      { name: "readonly properties", link: "" },
      { name: "static", link: "" },
      { name: "abstract classes", link: "" },
      { name: "implements", link: "" },
      { name: "extends", link: "" },
      { name: "method overloading", link: "" },
      { name: "getters/setters", link: "" },
      { name: "index signatures", link: "" },
      { name: "modules", link: "" },
      { name: "export", link: "" },
      { name: "import", link: "" },
      { name: "default export", link: "" },
      { name: "namespace", link: "" },
      { name: "triple slash directives", link: "" },
      { name: "declaration files", link: "" },
      { name: "ambient modules", link: "" },
      { name: "compiler options", link: "" },
      { name: "tsconfig.json", link: "" },
    ],
    prepareLink: "",
    externallinks: [],
    questions: [
      {
        question: "What are the basic primitive types in TypeScript?",
        solution:
          "The basic primitive types are: `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, and `bigint`.",
        tags: [{ name: "basic types", link: "" }],
      },
      {
        question: "How do you declare a variable with a specific type?",
        solution:
          "Use a colon after the variable name: `let age: number = 30;`",
        tags: [{ name: "basic types", link: "" }],
      },
      {
        question: "What is an `interface`?",
        solution:
          "An interface defines the shape of an object: `interface Person { name: string; age: number; }`",
        tags: [{ name: "interfaces", link: "" }],
      },
      {
        question: "What is a `type alias`?",
        solution:
          "A type alias gives a name to any type: `type Point = { x: number; y: number };`",
        tags: [{ name: "type aliases", link: "" }],
      },
      {
        question: "How do you type an array of strings?",
        solution:
          "`let names: string[] = ['Alice', 'Bob'];` or `let names: Array<string> = ['Alice', 'Bob'];`",
        tags: [{ name: "arrays", link: "" }],
      },
      {
        question: "What is a tuple?",
        solution:
          "A tuple is an array with fixed length and known types: `let coord: [number, number] = [10, 20];`",
        tags: [{ name: "tuples", link: "" }],
      },
      {
        question: "What is an enum?",
        solution:
          "An enum is a set of named constants: `enum Color { Red, Green, Blue }`",
        tags: [{ name: "enums", link: "" }],
      },
      {
        question: "Difference between `any` and `unknown`?",
        solution:
          "`any` bypasses type checking; `unknown` requires narrowing before use.",
        tags: [{ name: "any vs unknown", link: "" }],
      },
      {
        question: "Difference between `null` and `undefined`?",
        solution:
          "`null` is an assigned value (absence of value); `undefined` means declared but not assigned.",
        tags: [{ name: "null vs undefined", link: "" }],
      },
      {
        question:
          "How to type a function that takes a name and returns a greeting?",
        solution:
          "`const greet: (name: string) => string = (name) => 'Hello ' + name;`",
        tags: [{ name: "function signatures", link: "" }],
      },
      {
        question: "How do you mark a property as optional?",
        solution: "Use `?`: `interface User { name: string; age?: number; }`",
        tags: [{ name: "optional properties", link: "" }],
      },
      {
        question: "How to make a property readonly?",
        solution:
          "`interface Point { readonly x: number; readonly y: number; }`",
        tags: [{ name: "readonly", link: "" }],
      },
      {
        question: "What is a union type?",
        solution: "`type Status = 'loading' | 'success' | 'error';`",
        tags: [{ name: "union types", link: "" }],
      },
      {
        question: "What is an intersection type?",
        solution: "`type Employee = Person & { salary: number };`",
        tags: [{ name: "intersection types", link: "" }],
      },
      {
        question: "What is a literal type?",
        solution:
          "A specific value as a type: `let direction: 'north' | 'south';`",
        tags: [{ name: "literal types", link: "" }],
      },
      {
        question: "How do you assert a type?",
        solution:
          "`const input = document.getElementById('inp') as HTMLInputElement;`",
        tags: [{ name: "type assertion", link: "" }],
      },
      {
        question: "What does `as const` do?",
        solution:
          "Makes all properties readonly and literal: `const config = { api: 'https://x.com' } as const;`",
        tags: [{ name: "as const", link: "" }],
      },
      {
        question: "What is the `void` type?",
        solution:
          "Indicates a function does not return a value: `function log(): void { console.log('hi'); }`",
        tags: [{ name: "void", link: "" }],
      },
      {
        question: "What is the `never` type?",
        solution:
          "Represents values that never occur, e.g., a function that throws: `function fail(msg: string): never { throw new Error(msg); }`",
        tags: [{ name: "never", link: "" }],
      },
      {
        question: "How to restrict an object to only known keys?",
        solution: "`type StrictObj = Record<'a' | 'b', string>;`",
        tags: [{ name: "object types", link: "" }],
      },
      {
        question: "What are function overloads?",
        solution:
          "Provide multiple call signatures: `function add(a: number, b: number): number; function add(a: string, b: string): string; ...`",
        tags: [{ name: "function overloads", link: "" }],
      },
      {
        question: "What is a generic?",
        solution:
          "A placeholder for a type: `function identity<T>(arg: T): T { return arg; }`",
        tags: [{ name: "generics", link: "" }],
      },
      {
        question: "How to constrain a generic?",
        solution:
          "`function logLength<T extends { length: number }>(arg: T) { console.log(arg.length); }`",
        tags: [{ name: "generic constraints", link: "" }],
      },
      {
        question: "What does `keyof` do?",
        solution:
          "Returns union of keys: `type Keys = keyof { name: string; age: number }; // 'name' | 'age'`",
        tags: [{ name: "keyof", link: "" }],
      },
      {
        question: "What does `typeof` do?",
        solution:
          "Captures type of a variable: `let x = 3; type X = typeof x; // number`",
        tags: [{ name: "typeof", link: "" }],
      },
      {
        question: "What is a mapped type?",
        solution:
          "`type Flags = { [K in 'a' | 'b']: boolean }; // { a: boolean; b: boolean }`",
        tags: [{ name: "mapped types", link: "" }],
      },
      {
        question: "What is `Partial<T>`?",
        solution:
          "Makes all properties optional: `type PartialUser = Partial<User>;`",
        tags: [
          { name: "utility types", link: "" },
          { name: "Partial", link: "" },
        ],
      },
      {
        question: "What is `Required<T>`?",
        solution:
          "Makes all properties required: `type RequiredUser = Required<PartialUser>;`",
        tags: [
          { name: "utility types", link: "" },
          { name: "Required", link: "" },
        ],
      },
      {
        question: "What is `Pick<T, K>`?",
        solution:
          "Selects a subset of properties: `type NameOnly = Pick<User, 'name'>;`",
        tags: [
          { name: "utility types", link: "" },
          { name: "Pick", link: "" },
        ],
      },
      {
        question: "What is `Omit<T, K>`?",
        solution: "Removes keys: `type NoId = Omit<User, 'id'>;`",
        tags: [{ name: "utility types", link: "" }],
      },
      {
        question: "How do you declare a class in TypeScript?",
        solution:
          "`class Person { name: string; constructor(name: string) { this.name = name; } }`",
        tags: [{ name: "classes", link: "" }],
      },
      {
        question: "What are access modifiers?",
        solution: "`public`, `private`, `protected`. Default is `public`.",
        tags: [{ name: "access modifiers", link: "" }],
      },
      {
        question: "How to make a property readonly?",
        solution: "`class Person { readonly id: number = 1; }`",
        tags: [{ name: "readonly properties", link: "" }],
      },
      {
        question: "What is a static member?",
        solution:
          "`class MathUtil { static PI = 3.14; }` accessed via `MathUtil.PI`.",
        tags: [{ name: "static", link: "" }],
      },
      {
        question: "What is an abstract class?",
        solution:
          "`abstract class Shape { abstract area(): number; }` cannot be instantiated.",
        tags: [{ name: "abstract classes", link: "" }],
      },
      {
        question: "How does `implements` work?",
        solution:
          "`class Car implements Vehicle { ... }` ensures class meets interface contract.",
        tags: [{ name: "implements", link: "" }],
      },
      {
        question: "How does `extends` work?",
        solution: "`class Dog extends Animal { ... }` inherits members.",
        tags: [{ name: "extends", link: "" }],
      },
      {
        question: "Can you overload methods in a class?",
        solution:
          "Yes: `class A { foo(x: number): void; foo(x: string): void; foo(x: any) { } }`",
        tags: [{ name: "method overloading", link: "" }],
      },
      {
        question: "How to create a getter/setter?",
        solution:
          "`get name() { return this._name; } set name(v) { this._name = v; }`",
        tags: [{ name: "getters/setters", link: "" }],
      },
      {
        question: "What is an index signature?",
        solution: "`type Dict = { [key: string]: number };`",
        tags: [{ name: "index signatures", link: "" }],
      },
      {
        question: "How to export a variable?",
        solution: "`export const pi = 3.14;` or `export { pi };`",
        tags: [{ name: "export", link: "" }],
      },
      {
        question: "How to import a named export?",
        solution: "`import { pi } from './math';`",
        tags: [{ name: "import", link: "" }],
      },
      {
        question: "How to use default export?",
        solution:
          "`export default function() { }` and `import myFunc from './mod';`",
        tags: [{ name: "default export", link: "" }],
      },
      {
        question: "What is a namespace?",
        solution:
          "`namespace MathLib { export const PI = 3.14; }` accessed via `MathLib.PI`.",
        tags: [{ name: "namespace", link: "" }],
      },
      {
        question: "What are triple-slash directives?",
        solution: "`/// <reference path='...' />` for declaration linking.",
        tags: [{ name: "triple slash directives", link: "" }],
      },
      {
        question: "What is a `.d.ts` file?",
        solution: "Declaration file providing types for JS libraries.",
        tags: [{ name: "declaration files", link: "" }],
      },
      {
        question: "How to define an ambient module?",
        solution:
          "`declare module 'some-lib' { export function foo(): void; }`",
        tags: [{ name: "ambient modules", link: "" }],
      },
      {
        question: "How to set strict mode in tsconfig?",
        solution: '`{ "compilerOptions": { "strict": true } }`',
        tags: [{ name: "compiler options", link: "" }],
      },
      {
        question: "What is `tsconfig.json`?",
        solution: "Root config file for TypeScript compiler options.",
        tags: [{ name: "tsconfig.json", link: "" }],
      },
      {
        question: "How to exclude files from compilation?",
        solution: '`{ "exclude": ["node_modules", "**/*.spec.ts"] }`',
        tags: [{ name: "tsconfig.json", link: "" }],
      },
    ],
  },
  {
    id: 5,
    topic: "Typescript",
    categories: "Mid",
    tags: [
      { name: "advanced types", link: "" },
      { name: "conditional types", link: "" },
      { name: "infer", link: "" },
      { name: "template literal types", link: "" },
      { name: "branded types", link: "" },
      { name: "nominal types", link: "" },
      { name: "type guards", link: "" },
      { name: "user-defined guards", link: "" },
      { name: "discriminated unions", link: "" },
      { name: "exhaustiveness checking", link: "" },
      { name: "decorators", link: "" },
      { name: "mixins", link: "" },
      { name: "declaration merging", link: "" },
      { name: "module augmentation", link: "" },
      { name: "strictNullChecks", link: "" },
      { name: "exactOptionalPropertyTypes", link: "" },
      { name: "noUncheckedIndexedAccess", link: "" },
      { name: "strictFunctionTypes", link: "" },
      { name: "strictBindCallApply", link: "" },
      { name: "noImplicitReturns", link: "" },
      { name: "advanced generics", link: "" },
      { name: "recursive types", link: "" },
      { name: "variadic tuple types", link: "" },
      { name: "const assertions", link: "" },
      { name: "key remapping", link: "" },
      { name: "Partial Required mix", link: "" },
      { name: "Extract Exclude", link: "" },
      { name: "NonNullable", link: "" },
      { name: "Parameters", link: "" },
      { name: "ConstructorParameters", link: "" },
    ],
    prepareLink: "",
    externallinks: [],
    questions: [
      {
        question: "What is a conditional type?",
        solution: "`type IsString<T> = T extends string ? true : false;`",
        tags: [{ name: "conditional types", link: "" }],
      },
      {
        question: "How does `infer` work?",
        solution:
          "`type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;`",
        tags: [{ name: "infer", link: "" }],
      },
      {
        question: "What are template literal types?",
        solution: "`type EventName<T extends string> = `${T}Changed`;`",
        tags: [{ name: "template literal types", link: "" }],
      },
      {
        question: "What is a branded type?",
        solution:
          "`type USD = number & { __brand: 'USD' }; const usd = 100 as USD;`",
        tags: [{ name: "branded types", link: "" }],
      },
      {
        question: "How to create a type guard?",
        solution:
          "`function isString(val: unknown): val is string { return typeof val === 'string'; }`",
        tags: [{ name: "type guards", link: "" }],
      },
      {
        question: "What is a discriminated union?",
        solution:
          "A union with a common literal field: `type Shape = { kind: 'circle'; radius: number } | { kind: 'square'; side: number };`",
        tags: [{ name: "discriminated unions", link: "" }],
      },
      {
        question: "How to perform exhaustiveness checking?",
        solution: "`default: const _exhaust: never = shape;` inside switch.",
        tags: [{ name: "exhaustiveness checking", link: "" }],
      },
      {
        question: "How to extract keys of a type?",
        solution: "`type Keys = keyof User;`",
        tags: [{ name: "keyof", link: "" }],
      },
      {
        question:
          "How to create a mapped type that makes all properties nullable?",
        solution: "`type Nullable<T> = { [K in keyof T]: T[K] | null };`",
        tags: [{ name: "mapped types", link: "" }],
      },
      {
        question: "What is the difference between `unknown` and `{}`?",
        solution:
          "`unknown` must be narrowed; `{}` accepts any non-nullish value.",
        tags: [{ name: "advanced types", link: "" }],
      },
      {
        question: "What is a decorator?",
        solution:
          "`@sealed class A {}` — experimental feature for metadata/behavior.",
        tags: [{ name: "decorators", link: "" }],
      },
      {
        question: "How to create a mixin?",
        solution:
          "`function Timestamped<TBase extends Constructor>(Base: TBase) { return class extends Base { timestamp = Date.now() }; }`",
        tags: [{ name: "mixins", link: "" }],
      },
      {
        question: "What is declaration merging?",
        solution:
          "Merging interfaces: `interface Box { width: number; } interface Box { height: number; }`",
        tags: [{ name: "declaration merging", link: "" }],
      },
      {
        question: "How to augment a module?",
        solution:
          "`declare module 'lodash' { interface LoDashStatic { myMethod(): void; } }`",
        tags: [{ name: "module augmentation", link: "" }],
      },
      {
        question: "What does `strictNullChecks` do?",
        solution:
          "Enforces non-null; prevents `null`/`undefined` unless explicitly allowed.",
        tags: [{ name: "strictNullChecks", link: "" }],
      },
      {
        question: "What is `exactOptionalPropertyTypes`?",
        solution:
          "Disallows `undefined` for optional properties unless explicitly `| undefined`.",
        tags: [{ name: "exactOptionalPropertyTypes", link: "" }],
      },
      {
        question: "What is `noUncheckedIndexedAccess`?",
        solution: "Indexed access returns `T | undefined`.",
        tags: [{ name: "noUncheckedIndexedAccess", link: "" }],
      },
      {
        question: "What is `strictFunctionTypes`?",
        solution: "Ensures function parameter contravariance.",
        tags: [{ name: "strictFunctionTypes", link: "" }],
      },
      {
        question: "How to enforce return in all code paths?",
        solution: "Enable `noImplicitReturns`.",
        tags: [{ name: "noImplicitReturns", link: "" }],
      },
      {
        question: "What is `strictBindCallApply`?",
        solution: "Checks `bind`, `call`, `apply` argument types.",
        tags: [{ name: "strictBindCallApply", link: "" }],
      },
      {
        question: "How to create a recursive type?",
        solution: "`type Tree<T> = { value: T; children?: Tree<T>[] };`",
        tags: [{ name: "recursive types", link: "" }],
      },
      {
        question: "What are variadic tuple types?",
        solution:
          "`type Tail<T extends unknown[]> = T extends [any, ...infer Rest] ? Rest : never;`",
        tags: [{ name: "variadic tuple types", link: "" }],
      },
      {
        question: "What is `Extract<T, U>`?",
        solution:
          "Gets types assignable to U: `type A = Extract<'a' | 'b', 'a'>; // 'a'`",
        tags: [{ name: "Extract Exclude", link: "" }],
      },
      {
        question: "What is `Exclude<T, U>`?",
        solution:
          "Removes types assignable to U: `type B = Exclude<'a' | 'b', 'a'>; // 'b'`",
        tags: [{ name: "Extract Exclude", link: "" }],
      },
      {
        question: "What is `NonNullable<T>`?",
        solution:
          "Removes `null`/`undefined`: `type T = NonNullable<string | null>; // string`",
        tags: [{ name: "NonNullable", link: "" }],
      },
      {
        question: "What is `Parameters<F>`?",
        solution:
          "Extracts parameter tuple: `type P = Parameters<(a: number) => void>; // [number]`",
        tags: [{ name: "Parameters", link: "" }],
      },
      {
        question: "What is `ConstructorParameters<T>`?",
        solution:
          "`type C = ConstructorParameters<typeof Date>; // [value?: any]`",
        tags: [{ name: "ConstructorParameters", link: "" }],
      },
      {
        question: "How to remap keys?",
        solution:
          "`type Getters<T> = { [K in keyof T as `get${Capitalize<K & string>}`]: () => T[K] };`",
        tags: [{ name: "key remapping", link: "" }],
      },
      {
        question: "How to combine Partial and Required?",
        solution:
          "`type AtLeast<T, K extends keyof T> = Partial<T> & Required<Pick<T, K>>;`",
        tags: [{ name: "Partial Required mix", link: "" }],
      },
      {
        question: "What is `as const` used for in tuples?",
        solution:
          "Marks tuple as readonly and literal: `const t = [1, 2] as const;`",
        tags: [{ name: "const assertions", link: "" }],
      },
    ],
  },
  {
    id: 6,
    topic: "Typescript",
    categories: "Senior",
    tags: [
      { name: "type-level programming", link: "" },
      { name: "higher kinded types", link: "" },
      { name: "brand nominal types", link: "" },
      { name: "type variance", link: "" },
      { name: "is keyword", link: "" },
      { name: "asserts keyword", link: "" },
      { name: "intrinsic keyword", link: "" },
      { name: "recursive conditional types", link: "" },
      { name: "distributive conditional types", link: "" },
      { name: "template literal parsing", link: "" },
      { name: "compiler API", link: "" },
      { name: "transformers", link: "" },
      { name: "custom transformers", link: "" },
      { name: "programmatic diagnostics", link: "" },
      { name: "watch mode API", link: "" },
      { name: "incremental compilation", link: "" },
      { name: "project references", link: "" },
      { name: "composite projects", link: "" },
      { name: "declarationMap", link: "" },
      { name: "emitDeclarationOnly", link: "" },
      { name: "performance", link: "" },
      { name: "large projects", link: "" },
      { name: "skipLibCheck", link: "" },
      { name: "isolatedModules", link: "" },
      { name: "preserveConstEnums", link: "" },
      { name: "downlevelIteration", link: "" },
      { name: "lib field", link: "" },
      { name: "types field", link: "" },
      { name: "path mapping", link: "" },
      { name: "baseUrl", link: "" },
    ],
    prepareLink: "",
    externallinks: [],
    questions: [
      {
        question: "How to simulate higher-kinded types?",
        solution:
          "Use generic type parameters: `type HKT<F, A> = F extends (a: A) => any ? ReturnType<F> : never;`",
        tags: [{ name: "higher kinded types", link: "" }],
      },
      {
        question: "What is type variance?",
        solution:
          "Covariance (out), contravariance (in), invariance, bivariance.",
        tags: [{ name: "type variance", link: "" }],
      },
      {
        question: "How to parse a string literal with template literal types?",
        solution:
          "`type Split<S extends string> = S extends `${infer L}/${infer R}` ? [L, ...Split<R>] : [S];`",
        tags: [{ name: "template literal parsing", link: "" }],
      },
      {
        question: "What is `is` keyword?",
        solution:
          "Type predicate: `function isFish(pet: Pet): pet is Fish { return (pet as Fish).swim !== undefined; }`",
        tags: [{ name: "is keyword", link: "" }],
      },
      {
        question: "What is `asserts` keyword?",
        solution:
          "Assertion function: `function assertIsString(val: unknown): asserts val is string { ... }`",
        tags: [{ name: "asserts keyword", link: "" }],
      },
      {
        question: "What are intrinsic string manipulation types?",
        solution:
          "`Uppercase<T>`, `Lowercase<T>`, `Capitalize<T>`, `Uncapitalize<T>`.",
        tags: [{ name: "intrinsic keyword", link: "" }],
      },
      {
        question: "What is a distributive conditional type?",
        solution:
          "Conditional type over naked type parameter: `type ToArray<T> = T extends any ? T[] : never;`",
        tags: [{ name: "distributive conditional types", link: "" }],
      },
      {
        question: "How to prevent distribution?",
        solution:
          "Wrap in tuple: `type NoDistribute<T> = [T] extends [any] ? T[] : never;`",
        tags: [{ name: "distributive conditional types", link: "" }],
      },
      {
        question: "How to create a deep readonly type?",
        solution:
          "`type DeepReadonly<T> = { readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K] };`",
        tags: [{ name: "recursive conditional types", link: "" }],
      },
      {
        question: "How to implement a type-level counter?",
        solution:
          "Use tuple length: `type Length<T extends unknown[]> = T['length'];`",
        tags: [{ name: "type-level programming", link: "" }],
      },
      {
        question: "How to use the TypeScript compiler API?",
        solution:
          "Import `ts` and create program: `import * as ts from 'typescript'; const program = ts.createProgram(...)`",
        tags: [{ name: "compiler API", link: "" }],
      },
      {
        question: "What is a transformer?",
        solution: "AST visitor to transform code before emit.",
        tags: [{ name: "transformers", link: "" }],
      },
      {
        question: "How to add a custom transformer?",
        solution: "Pass to `ts.createProgram` via custom transformers options.",
        tags: [{ name: "custom transformers", link: "" }],
      },
      {
        question: "How to get diagnostics programmatically?",
        solution: "`const diagnostics = ts.getPreEmitDiagnostics(program);`",
        tags: [{ name: "programmatic diagnostics", link: "" }],
      },
      {
        question: "How to enable watch mode via API?",
        solution:
          "Use `ts.createWatchProgram(ts.createWatchCompilerHost(...))`",
        tags: [{ name: "watch mode API", link: "" }],
      },
      {
        question: "What is incremental compilation?",
        solution: "Reuses previous compilation state via `.tsbuildinfo`.",
        tags: [{ name: "incremental compilation", link: "" }],
      },
      {
        question: "How to use project references?",
        solution: 'In tsconfig: `{ "references": [{ "path": "./shared" }] }`',
        tags: [{ name: "project references", link: "" }],
      },
      {
        question: "What is a composite project?",
        solution:
          "Project with `composite: true` enabling references and incremental builds.",
        tags: [{ name: "composite projects", link: "" }],
      },
      {
        question: "What is `declarationMap`?",
        solution: "Generates `.d.ts.map` for Go to Definition in libraries.",
        tags: [{ name: "declarationMap", link: "" }],
      },
      {
        question: "How to emit only declarations?",
        solution: '`{ "emitDeclarationOnly": true }` in tsconfig.',
        tags: [{ name: "emitDeclarationOnly", link: "" }],
      },

      {
        question: "How to speed up builds in large projects?",
        solution:
          "Use project references, incremental mode, skipLibCheck, and composite.",
        tags: [
          { name: "performance", link: "" },
          { name: "large projects", link: "" },
        ],
      },
      {
        question: "What is `skipLibCheck`?",
        solution: "Skips type checking of declaration files improves speed.",
        tags: [{ name: "skipLibCheck", link: "" }],
      },
      {
        question: "What is `isolatedModules`?",
        solution:
          "Ensures each file can be transpiled independently without cross-file info.",
        tags: [{ name: "isolatedModules", link: "" }],
      },
      {
        question: "What is `preserveConstEnums`?",
        solution: "Keeps `const enum` in JS instead of inlining.",
        tags: [{ name: "preserveConstEnums", link: "" }],
      },
      {
        question: "When to use `downlevelIteration`?",
        solution: "When targeting ES5 and using `for...of` iterables.",
        tags: [{ name: "downlevelIteration", link: "" }],
      },
      {
        question: "What is `lib` in tsconfig?",
        solution: "Specifies library files (e.g., `ES2020`, `DOM`).",
        tags: [{ name: "lib field", link: "" }],
      },
      {
        question: "What is `types` array?",
        solution: "Explicitly lists `@types` packages to include.",
        tags: [{ name: "types field", link: "" }],
      },
      {
        question: "How to configure path mapping?",
        solution: '`{ "paths": { "@/*": ["src/*"] } }` with baseUrl.',
        tags: [{ name: "path mapping", link: "" }],
      },
      {
        question: "What is `baseUrl`?",
        solution: "Root for non-relative imports.",
        tags: [{ name: "baseUrl", link: "" }],
      },
      {
        question: "How to avoid large union types in switch?",
        solution: "Use discriminated unions and exhaustiveness checks.",
        tags: [{ name: "performance", link: "" }],
      },
    ],
  },
  {
    id: 7,
    topic: "SQL",
    categories: "Junior",
    tags: [{ name: "basics", link: "" }],
    prepareLink: "",
    externallinks: [],
    questions: [
      {
        question: "What is SQL?",
        solution:
          "SQL stands for Structured Query Language, it is a language used for creating, storing, fetching and updating of data and database objects in RDBMS.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "List the types of SQL commands.",
        solution: "DDL, DML, DCL, TCL.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "Give the DDL commands.",
        solution: "CREATE, ALTER, DROP, TRUNCATE, RENAME.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "Give the DML commands.",
        solution: "SELECT, INSERT, UPDATE, DELETE.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "Give the DCL commands.",
        solution: "GRANT, REVOKE, DENY.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "Give the TCL commands.",
        solution: "COMMIT, ROLLBACK, SAVEPOINT.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "Define a table.",
        solution:
          "A structured collection of related data organized into rows and columns.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is a primary key?",
        solution:
          "A column or set of columns that uniquely identifies each row; cannot be NULL.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is a foreign key?",
        solution:
          "A field in one table that references the primary key in another table.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "Difference between DELETE and TRUNCATE.",
        solution:
          "DELETE removes rows one-by-one (can rollback); TRUNCATE removes all rows at once (faster, no WHERE).",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "Difference between DROP and TRUNCATE.",
        solution:
          "DROP deletes the table structure; TRUNCATE keeps structure but removes all rows.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is a subquery?",
        solution:
          "A query nested inside another query, usually in WHERE clause.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is an alias?",
        solution:
          "Temporary name for table/column: SELECT first_name AS fname FROM employees.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is ORDER BY?",
        solution:
          "Sorts result set: SELECT * FROM products ORDER BY price DESC.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "Difference WHERE vs HAVING",
        solution:
          "WHERE filters rows before grouping; HAVING filters groups after GROUP BY.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is a view?",
        solution:
          "Virtual table based on SELECT query; hides underlying table structure.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is a stored procedure?",
        solution:
          "Pre-compiled SQL statements executed as a unit; encapsulates logic.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is a trigger?",
        solution:
          "Automatically fires on INSERT/UPDATE/DELETE events; enforces business rules.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "Name five aggregate functions",
        solution: "SUM, COUNT, AVG, MIN, MAX.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is a self-join?",
        solution:
          "Joining a table to itself, e.g., employee-manager relationship.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "Explain INNER JOIN with example",
        solution: "Returns matching rows from both tables.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "Explain LEFT JOIN with example",
        solution: "Returns all rows from left table plus matches from right.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "Explain RIGHT JOIN with example",
        solution: "Returns all rows from right table plus matches from left.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "Explain FULL JOIN with example",
        solution: "Returns all rows when there is a match in either table.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is a NULL value?",
        solution: "Unknown or missing; use IS NULL/IS NOT NULL to test.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is NOT NULL constraint?",
        solution: "Ensures column cannot store NULL.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is UNIQUE constraint?",
        solution: "Ensures all values in column are different.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "Difference UNIQUE vs PRIMARY KEY",
        solution:
          "UNIQUE allows one NULL; PRIMARY KEY disallows NULL and is only one per table.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is a composite key?",
        solution: "Primary key composed of multiple columns.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What are SQL constraints?",
        solution:
          "Rules enforced on data: NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, CHECK, DEFAULT, INDEX.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is CHECK constraint?",
        solution: "Ensures values satisfy a condition: CHECK (age >= 18).",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is DEFAULT constraint?",
        solution: "Supplies default value when none provided.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is an index?",
        solution:
          "Database object that speeds up retrieval; like a book index.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is DDL?",
        solution:
          "Data Definition Language: CREATE, ALTER, DROP, TRUNCATE, RENAME.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is DML?",
        solution: "Data Manipulation Language: SELECT, INSERT, UPDATE, DELETE.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is DCL?",
        solution: "Data Control Language: GRANT, REVOKE, DENY.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is TCL?",
        solution: "Transaction Control Language: COMMIT, ROLLBACK, SAVEPOINT.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is a transaction?",
        solution:
          "Sequence of operations executed as a single unit; follows ACID.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "Explain ACID properties",
        solution: "Atomicity, Consistency, Isolation, Durability.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is COMMIT?",
        solution: "Saves all changes permanently.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is ROLLBACK?",
        solution: "Undo changes since last COMMIT.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is SAVEPOINT?",
        solution: "Breakpoint inside transaction; partial rollback possible.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "Difference between DBMS and RDBMS",
        solution:
          "RDBMS uses relational model and enforces relationships via foreign keys.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is normalization?",
        solution: "Process to reduce redundancy; 1NF, 2NF, 3NF, BCNF.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is denormalization?",
        solution: "Adding redundancy for performance after normalization.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "Difference SQL vs NoSQL",
        solution:
          "SQL = structured, ACID, fixed schema; NoSQL = flexible, horizontal scaling.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is a schema?",
        solution:
          "Logical container of database objects; allows grouping and security.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is a sequence?",
        solution:
          "Database object that generates numeric values in order; used for auto-increment.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is a synonym?",
        solution:
          "Alias for a table, view or another database object; simplifies references.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is a cursor?",
        solution:
          "Database object that allows row-by-row processing instead of set-based.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is a database link?",
        solution:
          "Connection between two databases that allows querying remote tables.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is a composite index?",
        solution: "Index created on multiple columns; order matters for usage.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is a covering index?",
        solution:
          "Index that includes all columns needed for a query, eliminating table lookup.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is a filtered index?",
        solution:
          "Non-clustered index with WHERE clause, reducing size and improving performance.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is a full-text index?",
        solution:
          "Special index for fast searching of text within CHAR/VARCHAR columns.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is a spatial index?",
        solution:
          "Index optimized for spatial data types like geometry and geography.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is a unique index?",
        solution: "Index that enforces uniqueness of the indexed column(s).",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is a clustered index?",
        solution:
          "Index that determines physical order of table rows; only one per table.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is a non-clustered index?",
        solution:
          "Index separate from table data; can have multiple per table.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is index fragmentation?",
        solution:
          "Logical or physical disorder of index pages; rebuild or reorganize to fix.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is a table scan?",
        solution:
          "Reading every row in the table because no index can be used.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is an index seek?",
        solution: "Using index to directly find rows; faster than scan.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is an index lookup?",
        solution:
          "After index seek, additional lookup to fetch remaining columns from table.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is a bookmark lookup?",
        solution: "Old term for index lookup in SQL Server.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is a key lookup?",
        solution:
          "Modern term for bookmark lookup; occurs when non-clustered index doesn't cover query.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is a RID lookup?",
        solution:
          "Row identifier lookup used in heap tables without clustered index.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is a query execution plan?",
        solution:
          "Graphical or textual representation showing how database engine executes SQL statement.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is a cost-based optimizer?",
        solution:
          "Database component that chooses execution plan based on estimated cost.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is a rule-based optimizer?",
        solution:
          "Older optimizer that chooses plans based on fixed rules rather than statistics.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is statistics in SQL?",
        solution:
          "Information about data distribution in tables and indexes used by optimizer.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is auto update statistics?",
        solution:
          "Automatically refresh statistics when data changes significantly.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is a histogram?",
        solution:
          "Statistics object showing data distribution across value ranges.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is density vector?",
        solution:
          "Statistics component showing uniqueness of column combinations.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is parameter sniffing?",
        solution:
          "Query plan optimized for first parameter value may be suboptimal for others.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is plan cache?",
        solution: "Memory area storing compiled execution plans for reuse.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is plan reuse?",
        solution: "Using existing cached plan instead of recompiling same SQL.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is plan aging?",
        solution: "Process of removing unused plans from cache to free memory.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is recompilation?",
        solution:
          "Generating new execution plan when existing one is no longer optimal.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is statement-level recompilation?",
        solution: "Recompiling only affected statement when statistics change.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is procedure-level recompilation?",
        solution: "Recompiling entire stored procedure when changes occur.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is plan guide?",
        solution:
          "Hint mechanism to enforce specific execution plan for query.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is query hint?",
        solution:
          "Directive within SQL statement to influence optimizer decisions.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is table hint?",
        solution: "Hint affecting how table is accessed, like INDEX hint.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is join hint?",
        solution: "Hint specifying join algorithm like LOOP, MERGE, or HASH.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is force order hint?",
        solution: "Hint to enforce join order as written in query.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is maxdop hint?",
        solution: "Maximum degree of parallelism hint to limit CPU usage.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is deadlock?",
        solution:
          "Situation where two transactions block each other waiting for resources.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is deadlock victim?",
        solution:
          "Transaction chosen by database engine to be rolled back to break deadlock.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is blocking?",
        solution:
          "One transaction waiting for lock held by another transaction.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is lock escalation?",
        solution:
          "Process of converting many fine-grained locks into fewer coarse-grained locks.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is isolation level?",
        solution: "Degree to which transactions are isolated from each other.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is read uncommitted?",
        solution:
          "Isolation level allowing dirty reads but highest concurrency.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is read committed?",
        solution:
          "Isolation level preventing dirty reads but allowing non-repeatable reads.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is repeatable read?",
        solution:
          "Isolation level preventing dirty and non-repeatable reads but allowing phantom reads.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is serializable?",
        solution:
          "Highest isolation level preventing all concurrency anomalies.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is snapshot isolation?",
        solution:
          "Isolation level using row versioning instead of locks for consistency.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is dirty read?",
        solution: "Reading uncommitted changes from another transaction.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is non-repeatable read?",
        solution:
          "Different results when reading same row twice due to updates.",
        tags: [{ name: "basics", link: "" }],
      },
      {
        question: "What is phantom read?",
        solution: "New rows appearing in result set between two reads.",
        tags: [{ name: "basics", link: "" }],
      },
    ],
  },
  {
    id: 8,
    topic: "SQL",
    categories: "Mid",
    tags: [{ name: "intermediate", link: "" }],
    prepareLink: "",
    externallinks: [],
    questions: [
      {
        question: "How do you delete records older than one year efficiently?",
        solution:
          "Use batches: DELETE … WHERE transaction_date < NOW() - INTERVAL '1 year' and commit in chunks.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "Design a Parking Lot schema.",
        solution:
          "Tables: ParkingSpot(id, type, occupied), ParkingTicket(id, spot_id, start_time, end_time).",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "Write SQL to find the 2nd highest salary.",
        solution:
          "SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "Explain covering index.",
        solution:
          "Index that includes all columns needed for a query, eliminating table lookup.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "Difference between UNION and UNION ALL.",
        solution:
          "UNION removes duplicates; UNION ALL keeps duplicates and is faster.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is a correlated subquery?",
        solution:
          "Subquery referencing outer query columns; runs once per outer row.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "How to find duplicate rows?",
        solution:
          "SELECT col, COUNT(*) FROM table GROUP BY col HAVING COUNT(*) > 1;",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "How to remove duplicates?",
        solution:
          "Use ROW_NUMBER() to keep latest row and delete others, or DISTINCT.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is a window function?",
        solution:
          "Function that operates on a set of rows (window) related to current row: ROW_NUMBER(), RANK(), DENSE_RANK(), LAG(), LEAD().",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "Write a query to get running total.",
        solution:
          "SELECT amount, SUM(amount) OVER (ORDER BY date) AS running_total FROM sales;",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is a common table expression (CTE)?",
        solution:
          "Temporary named result set defined by SELECT, used for recursion and readability.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is recursive CTE?",
        solution:
          "CTE that references itself to handle hierarchical data, e.g., org chart.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "How to pivot rows to columns?",
        solution:
          "SQL Server: PIVOT operator; MySQL: conditional aggregation with CASE.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "How to unpivot columns to rows?",
        solution:
          "SQL Server: UNPIVOT operator; MySQL: UNION ALL of CASE expressions.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is a materialized view?",
        solution:
          "Stores query result physically; refreshed on schedule or on demand.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is an indexed view?",
        solution:
          "View with clustered index; improves performance but has restrictions.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "Difference between view and table?",
        solution:
          "View is virtual, no data storage; table is physical with data.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "How to update through a view?",
        solution:
          "Only if view meets updateability rules (single table, no aggregates, no DISTINCT).",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is WITH CHECK OPTION?",
        solution: "Ensures updated/inserted rows satisfy view WHERE clause.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is a stored procedure?",
        solution:
          "Pre-compiled SQL statements executed as a unit; encapsulates logic.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "Difference between stored procedure and function?",
        solution:
          "Procedure may return multiple result sets and has side effects; function returns single value and must be deterministic.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is an output parameter?",
        solution: "Parameter in stored procedure that returns value to caller.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is a trigger?",
        solution:
          "Automatically fires on INSERT/UPDATE/DELETE events; enforces business rules.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "Difference between AFTER and INSTEAD OF triggers?",
        solution: "AFTER runs after operation; INSTEAD OF replaces operation.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What are inserted and deleted tables in triggers?",
        solution:
          "Special tables holding new and old versions of affected rows.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is a cursor?",
        solution:
          "Database object that allows row-by-row processing instead of set-based.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is a dynamic cursor?",
        solution: "Reflects data changes made by others while cursor is open.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is a static cursor?",
        solution:
          "Snapshot of data at cursor creation; insensitive to changes.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is a keyset cursor?",
        solution: "Rows and order fixed, but data values can change.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is a forward-only cursor?",
        solution: "Cursor that can only move forward through result set.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is a scroll cursor?",
        solution:
          "Cursor that can move forward, backward, first, last, absolute, relative.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "How to avoid cursors?",
        solution:
          "Use set-based operations, window functions, CTEs, or table variables.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is a transaction?",
        solution:
          "Sequence of operations executed as a single unit; follows ACID.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is ACID?",
        solution:
          "Atomicity, Consistency, Isolation, Durability properties of transactions.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is atomicity?",
        solution: "All operations in transaction succeed or none are applied.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is consistency?",
        solution:
          "Transaction brings database from one valid state to another.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is isolation?",
        solution: "Concurrent transactions do not interfere with each other.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is durability?",
        solution: "Committed changes persist even in case of system failure.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is COMMIT?",
        solution: "Saves all changes permanently.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is ROLLBACK?",
        solution: "Undo changes since last COMMIT.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is SAVEPOINT?",
        solution: "Breakpoint inside transaction; partial rollback possible.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is SET TRANSACTION?",
        solution:
          "Statement to set isolation level or other transaction properties.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is READ UNCOMMITTED?",
        solution:
          "Isolation level allowing dirty reads but highest concurrency.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is READ COMMITTED?",
        solution:
          "Isolation level preventing dirty reads but allowing non-repeatable reads.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is REPEATABLE READ?",
        solution:
          "Isolation level preventing dirty and non-repeatable reads but allowing phantom reads.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is SERIALIZABLE?",
        solution:
          "Highest isolation level preventing all concurrency anomalies.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is SNAPSHOT isolation?",
        solution:
          "Uses row versioning to provide transaction-level consistency.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is dirty read?",
        solution: "Reading uncommitted changes from another transaction.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is non-repeatable read?",
        solution:
          "Different results when reading same row twice due to updates.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is phantom read?",
        solution: "New rows appearing in result set between two reads.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is lock escalation?",
        solution:
          "Converting many fine-grained locks into fewer coarse-grained locks.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is a deadlock?",
        solution:
          "Situation where two transactions block each other waiting for resources.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is deadlock victim?",
        solution:
          "Transaction chosen by database engine to be rolled back to break deadlock.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is blocking?",
        solution:
          "One transaction waiting for lock held by another transaction.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is lock timeout?",
        solution:
          "Maximum time a transaction waits for a lock before giving up.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is NOWAIT?",
        solution:
          "Returns immediately if lock cannot be obtained instead of waiting.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is READPAST?",
        solution: "Skip locked rows instead of waiting when reading data.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is UPDLOCK?",
        solution:
          "Hint to take update locks instead of shared locks when reading.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is TABLOCK?",
        solution: "Hint to take table-level lock instead of row/page locks.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is TABLOCKX?",
        solution: "Hint to take exclusive table-level lock.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is PAGLOCK?",
        solution: "Hint to take page-level locks instead of row locks.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is ROWLOCK?",
        solution: "Hint to take row-level locks instead of page/table locks.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is NOLOCK?",
        solution: "Hint equivalent to READ UNCOMMITTED; allows dirty reads.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is XLOCK?",
        solution: "Hint to take exclusive lock.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is SERIALIZABLE hint?",
        solution: "Equivalent to SERIALIZABLE isolation level.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is REPEATABLEREAD hint?",
        solution: "Equivalent to REPEATABLE READ isolation level.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is READCOMMITTED hint?",
        solution: "Equivalent to READ COMMITTED isolation level.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is READUNCOMMITTED hint?",
        solution: "Equivalent to READ UNCOMMITTED isolation level.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is deadlock graph?",
        solution:
          "XML representation showing resources and processes involved in deadlock.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is wait statistics?",
        solution:
          "System information showing what resources SQL Server is waiting for.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is blocking chain?",
        solution: "Series of blocking relationships between multiple sessions.",
        tags: [{ name: "intermediate", link: "" }],
      },
      {
        question: "What is resource semaphore?",
        solution: "Memory grant mechanism for query execution.",
        tags: [{ name: "intermediate", link: "" }],
      },
    ],
  },
  {
    id: 9,
    topic: "SQL",
    categories: "Senior",
    tags: [{ name: "advanced", link: "" }],
    prepareLink: "",
    externallinks: [],
    questions: [
      {
        question: "How to optimize DELETE of millions of rows?",
        solution:
          "Batch deletes, disable non-clustered indexes temporarily, use minimal logging, partition switch.",
        tags: [{ name: "advanced", link: "" }],
      },
      {
        question: "What is read committed snapshot isolation (RCSI)?",
        solution: "SQL Server row-versioning that reduces blocking.",
        tags: [{ name: "advanced", link: "" }],
      },
      {
        question: "Design a sharding strategy.",
        solution:
          "Choose shard key (e.g., customer_id), range vs hash sharding, handle cross-shard queries.",
        tags: [{ name: "advanced", link: "" }],
      },
      {
        question: "Explain lock escalation.",
        solution:
          "SQL Server converts many fine-grained locks into a single coarse lock to reduce overhead.",
        tags: [{ name: "advanced", link: "" }],
      },
      {
        question: "How to detect deadlocks?",
        solution: "Use SQL Profiler, extended events, trace flags 1204/1222.",
        tags: [{ name: "advanced", link: "" }],
      },
      {
        question: "What is delayed durability?",
        solution:
          "Transaction logs flushed later; faster commits, risk of data loss.",
        tags: [{ name: "advanced", link: "" }],
      },
      {
        question: "Difference between OLTP and OLAP indexes?",
        solution:
          "OLTP: narrow, many seeks; OLAP: wide, covering, columnstore.",
        tags: [{ name: "advanced", link: "" }],
      },
      {
        question: "How to partition a large table?",
        solution:
          "Use partition function/scheme by date or hash; improves maintenance & performance.",
        tags: [{ name: "advanced", link: "" }],
      },
      {
        question: "What is page splitting?",
        solution:
          "When inserting into full index page, half rows moved to new page; causes fragmentation.",
        tags: [{ name: "advanced", link: "" }],
      },
      {
        question: "Explain lock escalation",
        solution:
          "SQL Server converts many fine-grained locks into single coarse lock to reduce overhead.",
        tags: [{ name: "advanced", link: "" }],
      },
      {
        question: "What is automatic plan correction?",
        solution:
          "SQL 2017+ feature that forces last good plan if regression detected.",
        tags: [{ name: "advanced", link: "" }],
      },
      {
        question: "Describe database sharding pitfalls",
        solution: "Cross-shard joins, rebalancing, distributed transactions.",
        tags: [{ name: "advanced", link: "" }],
      },
      {
        question: "How to perform online index rebuild?",
        solution:
          "ALTER INDEX ... REBUILD WITH (ONLINE = ON); maintains availability.",
        tags: [{ name: "advanced", link: "" }],
      },
      {
        question: "What is a columnstore index?",
        solution:
          "Stores data column-wise for high compression & analytics performance.",
        tags: [{ name: "advanced", link: "" }],
      },
      {
        question: "How to handle tempdb contention?",
        solution: "Multiple data files, trace flag 1117/1118, SSD storage.",
        tags: [{ name: "advanced", link: "" }],
      },
      {
        question: "What is ghost records cleanup?",
        solution: "Background process that removes deleted rows from indexes.",
        tags: [{ name: "advanced", link: "" }],
      },
      {
        question: "Explain query store",
        solution:
          "SQL Server feature capturing query plans and performance metrics for troubleshooting.",
        tags: [{ name: "advanced", link: "" }],
      },
      {
        question: "What is adaptive query processing?",
        solution:
          "SQL Server 2017+ feature adjusting execution plan based on runtime conditions.",
        tags: [{ name: "advanced", link: "" }],
      },
      {
        question: "What is batch mode processing?",
        solution:
          "Executes operators on batches of ~1000 rows instead of row-by-row for columnstore indexes.",
        tags: [{ name: "advanced", link: "" }],
      },
      {
        question: "What is row mode processing?",
        solution: "Traditional execution processing one row at a time.",
        tags: [{ name: "advanced", link: "" }],
      },
      {
        question: "What is cardinality estimator?",
        solution:
          "Component that estimates number of rows returned by each operator.",
        tags: [{ name: "advanced", link: "" }],
      },
      {
        question: "What is memory grant?",
        solution:
          "Amount of memory reserved for query execution operations like sorts and hashes.",
        tags: [{ name: "advanced", link: "" }],
      },
      {
        question: "What is spill to tempdb?",
        solution:
          "When memory grant insufficient, operations spill to tempdb for sorting/hashing.",
        tags: [{ name: "advanced", link: "" }],
      },
      {
        question: "What is query timeout?",
        solution:
          "Maximum time a query can run before being terminated by system.",
        tags: [{ name: "advanced", link: "" }],
      },
      {
        question: "What is connection pooling?",
        solution:
          "Reusing database connections to reduce overhead of establishing new ones.",
        tags: [{ name: "advanced", link: "" }],
      },
      {
        question: "What is database mirroring?",
        solution:
          "High availability feature maintaining copy of database on another server.",
        tags: [{ name: "advanced", link: "" }],
      },
      {
        question: "What is Always On availability groups?",
        solution:
          "SQL Server feature providing high availability and disaster recovery with multiple replicas.",
        tags: [{ name: "advanced", link: "" }],
      },
      {
        question: "What is log shipping?",
        solution:
          "Process of backing up transaction logs and restoring to standby server.",
        tags: [{ name: "advanced", link: "" }],
      },
      {
        question: "What is replication?",
        solution:
          "Process of copying and synchronizing data across multiple databases.",
        tags: [{ name: "advanced", link: "" }],
      },
      {
        question: "What are replication types?",
        solution: "Snapshot, transactional, merge, peer-to-peer.",
        tags: [{ name: "advanced", link: "" }],
      },
      {
        question: "What is change data capture (CDC)?",
        solution: "Records all changes to tables for auditing or ETL purposes.",
        tags: [{ name: "advanced", link: "" }],
      },
      {
        question: "What is change tracking?",
        solution:
          "Lightweight alternative to CDC that only tracks which rows changed.",
        tags: [{ name: "advanced", link: "" }],
      },
      {
        question: "What is temporal tables?",
        solution:
          "SQL Server 2016+ feature automatically tracking historical versions of rows.",
        tags: [{ name: "advanced", link: "" }],
      },
      {
        question: "What is stretch database?",
        solution: "SQL Server feature archiving cold data to Azure cloud.",
        tags: [{ name: "advanced", link: "" }],
      },
      {
        question: "What is polybase?",
        solution:
          "Technology to query external data sources like Hadoop or Azure blob storage.",
        tags: [{ name: "advanced", link: "" }],
      },
      {
        question: "What is in-memory OLTP?",
        solution:
          "SQL Server feature storing tables entirely in memory for extreme performance.",
        tags: [{ name: "advanced", link: "" }],
      },
      {
        question: "What is natively compiled stored procedure?",
        solution:
          "Stored procedure compiled to native code for in-memory tables.",
        tags: [{ name: "advanced", link: "" }],
      },
      {
        question: "What is memory-optimized table variable?",
        solution:
          "Table variable stored in memory using same technology as in-memory tables.",
        tags: [{ name: "advanced", link: "" }],
      },
      {
        question: "What is durable vs non-durable in-memory tables?",
        solution:
          "Durable persists to disk; non-durable only in memory (lost on restart).",
        tags: [{ name: "advanced", link: "" }],
      },
    ],
  },
  {
    id: 10,
    topic: "Redis",
    categories: "Junior",
    tags: [
      { name: "basics", link: "" },
      { name: "cache", link: "" },
      { name: "data-structures", link: "" },
    ],
    prepareLink: "",
    externallinks: [],
    questions: [
      {
        question: "What is Redis?",
        solution:
          "Redis is an open-source, in-memory data structure store used as a database, cache, and message broker. It supports various data structures like strings, lists, sets, sorted sets, hashes, bitmaps, hyperloglogs, and streams.",
      },
      {
        question: "What are the major features of Redis?",
        solution:
          "Major features include in-memory storage, persistence options (RDB and AOF), replication, high availability with Redis Sentinel, automatic partitioning with Redis Cluster, Lua scripting, transactions, and pub/sub messaging.",
      },
      {
        question:
          "How is Redis different from traditional relational databases?",
        solution:
          "Redis stores data in memory for fast access, supports rich data structures beyond tables, provides optional persistence, and is optimized for high-performance read/write operations. Unlike relational databases, it doesn't use SQL and lacks complex querying capabilities.",
      },
      {
        question: "What are some common use cases of Redis?",
        solution:
          "Common use cases include caching, session storage, real-time analytics, message queues, leaderboards, rate limiting, pub/sub systems, and as a primary database for high-speed applications.",
      },
      {
        question: "What data structures does Redis support?",
        solution:
          "Redis supports strings, lists, sets, sorted sets (ZSET), hashes, bitmaps, hyperloglogs, geospatial indexes, and streams.",
      },
      {
        question: "What is a Redis key and what are the naming conventions?",
        solution:
          "A Redis key is a binary safe string. Naming conventions include using prefixes (e.g., 'user:123', 'session:abc'), separators like colons, and meaningful names to avoid collisions.",
      },
      {
        question: "What is Redis caching?",
        solution:
          "Redis caching involves storing frequently accessed data in memory to reduce database load and improve response times. It acts as a fast, temporary storage layer between applications and databases.",
      },
      {
        question: "How do you set a value in Redis?",
        solution:
          "Use the SET command: SET key value [EX seconds|PX milliseconds|NX|XX]. Example: SET user:1001 'Alice' EX 3600",
      },
      {
        question: "How do you retrieve a value from Redis?",
        solution: "Use the GET command: GET key. Example: GET user:1001",
      },
      {
        question: "What is the EXPIRE command in Redis?",
        solution:
          "EXPIRE sets a timeout (TTL) on a key in seconds. After the timeout, the key is automatically deleted. Syntax: EXPIRE key seconds. Example: EXPIRE session:abc 1800",
      },
      {
        question: "Explain the SET command and how it is used",
        solution:
          "The SET command stores a key-value pair. It supports options like EX (expire in seconds), PX (expire in milliseconds), NX (set only if key doesn't exist), and XX (set only if key exists). Example: SET user:1001 'Alice' EX 3600 NX",
      },
      {
        question:
          "Write a Redis command to store a key-value pair and retrieve it",
        solution: "SET mykey 'hello'; GET mykey",
      },
      {
        question: "How can you delete a key in Redis?",
        solution:
          "Use the DEL command: DEL key [key...]. Example: DEL user:1001",
      },
      {
        question:
          "What is a Redis hash and how do you use it? Provide an example",
        solution:
          "A Redis hash is a map between string fields and string values. Use HSET to set fields, HGET to get a field, and HGETALL to get all fields. Example: HSET user:1001 name 'Alice' age '30'; HGET user:1001 name",
      },
      {
        question: "Write a Redis command to increment a value stored at a key",
        solution:
          "Use INCR for integer increment: INCR counter. Use INCRBY for custom increments: INCRBY counter 5",
      },
      {
        question: "Explain the difference between GET and MGET",
        solution:
          "GET retrieves a single key's value. MGET retrieves values for multiple keys in one operation. Example: MGET key1 key2 key3",
      },
      {
        question:
          "Write a Redis command to retrieve the first three elements of a list",
        solution: "Use LRANGE: LRANGE mylist 0 2",
      },
      {
        question: "Write a Redis command to find the length of a list",
        solution: "Use LLEN: LLEN mylist",
      },
      {
        question: "How do you install Redis on a Linux system?",
        solution:
          "wget http://download.redis.io/redis-stable.tar.gz; tar xzf redis-stable.tar.gz; cd redis-stable; make; sudo make install",
      },
      {
        question:
          "Explain the concept of Redis Pub/Sub and provide a simple example",
        solution:
          "Pub/Sub is a messaging paradigm where publishers send messages to channels and subscribers receive them. Example: SUBSCRIBE news; PUBLISH news 'Hello World'",
      },
      {
        question: "What is the TTL command and what does it do?",
        solution:
          "TTL returns the remaining time-to-live (in seconds) for a key with an expiration set. Returns -2 if key doesn't exist, -1 if key exists but has no expiration. Example: TTL mykey",
      },
      {
        question: "What is the difference between Redis Lists and Sets?",
        solution:
          "Lists are ordered collections that allow duplicates and support operations like LPUSH, RPUSH, LRANGE. Sets are unordered collections of unique values with operations like SADD, SMEMBERS, SINTER.",
      },
      {
        question: "What is a Redis sorted set?",
        solution:
          "A sorted set (ZSET) is a collection of unique elements ordered by a score. Each member has an associated score used for ordering. Supports operations like ZADD, ZRANGE, ZRANK.",
      },
      {
        question:
          "How do you implement caching with Redis in a web application?",
        solution:
          "Store frequently accessed data in Redis with expiration times. Check Redis first before querying the database. Use SET with expiration for cache entries and DEL to invalidate cache.",
      },
      {
        question: "What is a Redis transaction and how is it executed?",
        solution:
          "Transactions group multiple commands into a single atomic operation. Use MULTI to start, queue commands, then EXEC to execute all commands atomically. Example: MULTI; SET a 1; SET b 2; EXEC",
      },
      {
        question: "What are Redis pipelines?",
        solution:
          "Pipelines batch multiple commands into a single network round-trip, improving performance by reducing latency. Use pipeline() in clients or MULTI/EXEC for atomic pipelines.",
      },
      {
        question:
          "How does Redis handle persistence and what are the different persistence mechanisms?",
        solution:
          "Redis offers RDB (snapshotting) and AOF (append-only file) persistence. RDB takes periodic snapshots, while AOF logs every write operation. Both can be enabled simultaneously.",
      },
      {
        question: "How can you scale Redis?",
        solution:
          "Scaling options include Redis Cluster for horizontal scaling, Redis Sentinel for high availability, read replicas for read scaling, and partitioning data across multiple instances.",
      },
      {
        question:
          "Describe a scenario where Redis is not the appropriate choice",
        solution:
          "When you need complex querying, large datasets that exceed memory, strong consistency requirements, or when data durability is more important than speed.",
      },
      {
        question: "How do you monitor and debug Redis performance issues?",
        solution:
          "Use MONITOR command, INFO command, slowlog, redis-cli --stat, keyspace hits/misses, memory usage, and client-side metrics.",
      },
      {
        question: "What security features does Redis offer?",
        solution:
          "Authentication (requirepass), ACL (Access Control Lists), TLS encryption, protected mode, and network security through bind configurations.",
      },
      {
        question: "Explain how Lua scripting is used in Redis",
        solution:
          "Lua scripts execute atomically on the server side using EVAL command. Scripts can perform complex operations with minimal network round-trips. Example: EVAL 'return redis.call(\"GET\", KEYS[1])' 1 mykey",
      },
      {
        question:
          "How do you handle caching in a distributed environment using Redis?",
        solution:
          "Use Redis Cluster for distributed caching, implement cache invalidation strategies, use consistent hashing for key distribution, and handle cache stampede with locks.",
      },
      {
        question:
          "What is the impact of persistence settings on Redis performance?",
        solution:
          "RDB snapshots can cause brief pauses during save operations. AOF with fsync=always impacts write performance. Choose settings based on durability vs performance requirements.",
      },
      {
        question: "Describe Redis Sentinel and its role",
        solution:
          "Redis Sentinel provides high availability by monitoring Redis instances, performing automatic failover, and notifying clients about topology changes.",
      },
      {
        question:
          "What are Redis Modules and how do they enhance functionality?",
        solution:
          "Redis Modules extend Redis with new data types and commands. Popular modules include RedisBloom (probabilistic data structures), RedisTimeSeries, RedisGraph, and RedisJSON.",
      },
      {
        question: "How do you optimize Redis for high read volumes?",
        solution:
          "Use read replicas, enable keyspace notifications, implement connection pooling, use pipelining, optimize data structures, and consider Redis Cluster.",
      },
      {
        question: "Explain the use of Pipelining in Redis",
        solution:
          "Pipelining sends multiple commands to Redis without waiting for replies, reducing network latency. Commands are queued and responses are read together.",
      },
      {
        question:
          "Discuss the limitations of Redis regarding data size and type",
        solution:
          "Single-value limit is 512MB, total memory is limited by available RAM, single-threaded command processing, and lack of complex querying capabilities.",
      },
      {
        question: "How do you backup and restore Redis data?",
        solution:
          "Use BGSAVE for RDB snapshots, COPY command for AOF, or use redis-cli --rdb. For restore, copy RDB/AOF files to Redis directory or use redis-cli --pipe.",
      },
      {
        question:
          "What are the advantages of using Redis over traditional databases?",
        solution:
          "Sub-millisecond latency, rich data structures, atomic operations, pub/sub messaging, persistence options, high availability, and horizontal scaling.",
      },
      {
        question: "How does Redis handle concurrency?",
        solution:
          "Redis uses single-threaded processing for commands, ensuring atomic operations. Concurrent clients are handled via I/O multiplexing, and transactions provide atomicity.",
      },
      {
        question: "Explain the use of Lua scripting in Redis",
        solution:
          "Lua scripts run atomically on the server, reducing network round-trips. Use EVAL for one-time scripts and SCRIPT LOAD/EVALSHA for cached scripts.",
      },
      {
        question: "What are the limitations of Redis?",
        solution:
          "Memory-based storage limits, single-threaded command processing, eventual consistency in cluster mode, lack of complex queries, and data size limits per value.",
      },
      {
        question: "How do you scale Redis?",
        solution:
          "Vertical scaling (more memory/CPU), horizontal scaling with Redis Cluster, read replicas, client-side sharding, or using Redis Enterprise.",
      },
      {
        question:
          "Describe a situation where you used Redis to solve a performance problem",
        solution:
          "Used Redis to cache frequently accessed user profiles, reducing database load by 80% and improving response times from 200ms to 5ms.",
      },
      {
        question: "What is Redis Bloom Filter?",
        solution:
          "A probabilistic data structure in RedisBloom module that tests whether an element is a member of a set with possible false positives but no false negatives.",
      },
      {
        question: "How do you handle security in Redis?",
        solution:
          "Enable authentication, use ACLs, enable TLS encryption, bind to specific interfaces, use protected mode, and implement network security.",
      },
      {
        question:
          "Explain the maximum memory limit for a Redis instance and how it can be configured",
        solution:
          "Set maxmemory directive in redis.conf or via CONFIG SET maxmemory. When limit is reached, eviction policies determine which keys to remove.",
      },
      {
        question:
          "What is the purpose of the Redis 'WATCH' command in the context of transactions?",
        solution:
          "WATCH monitors keys for changes during a transaction. If any watched key is modified before EXEC, the transaction is aborted (optimistic locking).",
      },
    ],
  },
  {
    id: 11,
    topic: "Redis",
    categories: "Mid",
    tags: [
      { name: "clustering", link: "" },
      { name: "replication", link: "" },
      { name: "performance", link: "" },
      { name: "transactions", link: "" },
      { name: "persistence", link: "" },
    ],
    prepareLink: "",
    externallinks: [],
    questions: [
      {
        question: "What is a Redis cluster?",
        solution:
          "A Redis cluster is a distributed implementation of Redis that automatically shards data across multiple nodes, providing horizontal scalability and high availability without a single point of failure.",
      },
      {
        question:
          "What are the differences between Redis replication and Redis clustering?",
        solution:
          "Replication creates exact copies (master-slave) for read scaling and failover, while clustering shards data across multiple nodes for horizontal scaling. Replication is simpler but limited by single-node capacity; clustering handles larger datasets by partitioning.",
      },
      {
        question: "What is the TTL command and what does it do?",
        solution:
          "TTL returns the remaining time-to-live in seconds for a key with an expiration set. Returns -2 if key doesn't exist, -1 if key exists but has no expiration, or positive value for remaining seconds.",
      },
      {
        question: "What is Redis Pub/Sub?",
        solution:
          "Redis Pub/Sub is a messaging paradigm where publishers send messages to channels and subscribers receive them. It's a lightweight, fire-and-forget messaging system without persistence or acknowledgment guarantees.",
      },
      {
        question: "What is the difference between Redis Lists and Sets?",
        solution:
          "Lists are ordered collections that allow duplicates and support operations like LPUSH/RPUSH. Sets are unordered collections of unique values with operations like SADD/SMEMBERS. Lists maintain insertion order; sets don't.",
      },
      {
        question: "What is a Redis sorted set?",
        solution:
          "A sorted set (ZSET) is a collection of unique elements ordered by a score. Each member has an associated floating-point score used for ordering. Supports operations like ZADD, ZRANGE, ZRANK with logarithmic complexity.",
      },
      {
        question:
          "How do you implement caching with Redis in a web application?",
        solution:
          "Use SET with expiration for cache entries, implement cache-aside pattern (check Redis first, then DB), use cache invalidation strategies (TTL, explicit DEL), and handle cache stampede with locks or probabilistic early expiration.",
      },
      {
        question: "What is a Redis transaction and how is it executed?",
        solution:
          "Transactions group commands into an atomic unit using MULTI/EXEC. Commands are queued until EXEC is called, then executed atomically. WATCH can be used for optimistic locking. Example: MULTI; SET a 1; SET b 2; EXEC",
      },
      {
        question: "What are Redis pipelines?",
        solution:
          "Pipelines batch multiple commands into a single network round-trip, improving performance by reducing latency. Commands are sent in bulk and responses are received together. Can be used with MULTI/EXEC for atomic pipelines.",
      },
      {
        question:
          "How does Redis handle persistence and what are the different persistence mechanisms?",
        solution:
          "Redis offers RDB (snapshotting) and AOF (append-only file). RDB takes periodic snapshots for compact backups. AOF logs every write operation for durability. Both can be enabled simultaneously with different fsync policies.",
      },
      {
        question: "Explain the concept of Redis transactions",
        solution:
          "Redis transactions use MULTI to start, queue commands, then EXEC to execute atomically. Commands are serialized and executed sequentially. DISCARD cancels the transaction. WATCH provides optimistic locking by monitoring keys.",
      },
      {
        question: "What are the main differences between RDB and AOF?",
        solution:
          "RDB creates compact snapshots at intervals, good for backups but may lose recent data. AOF logs every write, providing better durability but larger files and slower recovery. AOF can be fsynced every command, every second, or manually.",
      },
      {
        question: "How can you scale Redis?",
        solution:
          "Options include vertical scaling (more RAM/CPU), horizontal scaling with Redis Cluster, read replicas for read scaling, client-side sharding, or Redis Enterprise features. Choice depends on use case and operational requirements.",
      },
      {
        question:
          "Describe a scenario where Redis is not the appropriate choice",
        solution:
          "When you need complex querying, datasets larger than memory, strong consistency across nodes, or when durability is more important than speed. Also avoid for write-heavy workloads requiring ACID guarantees.",
      },
      {
        question: "How do you monitor and debug Redis performance issues?",
        solution:
          "Use INFO command for server stats, MONITOR for real-time commands, SLOWLOG for slow queries, redis-cli --stat for live metrics, memory usage commands, and client-side metrics like response times and hit rates.",
      },
      {
        question: "What security features does Redis offer?",
        solution:
          "Features include AUTH for password protection, ACL (Access Control Lists) for fine-grained permissions, TLS encryption for data in transit, protected mode, and network security through bind configurations and firewalls.",
      },
      {
        question: "Explain how Lua scripting is used in Redis",
        solution:
          "Lua scripts run atomically on the server using EVAL command. Scripts can perform complex operations with minimal network round-trips. Use SCRIPT LOAD and EVALSHA for cached scripts. Example: EVAL 'return redis.call(\"GET\", KEYS[1])' 1 mykey",
      },
      {
        question:
          "How do you handle caching in a distributed environment using Redis?",
        solution:
          "Use Redis Cluster for distributed caching, implement consistent hashing for key distribution, handle cache invalidation with pub/sub or keyspace notifications, manage cache stampede with locks, and use read replicas for read scaling.",
      },
      {
        question:
          "What is the impact of persistence settings on Redis performance?",
        solution:
          "RDB snapshots can cause brief pauses during saves. AOF with fsync=always impacts write performance. AOF fsync=every-second offers good balance. Choose settings based on durability vs performance requirements.",
      },
      {
        question: "Describe Redis Sentinel and its role",
        solution:
          "Redis Sentinel provides high availability by monitoring Redis instances, performing automatic failover when masters go down, and notifying clients about topology changes. It also acts as a configuration provider for clients.",
      },
      {
        question:
          "What are Redis Modules and how do they enhance functionality?",
        solution:
          "Redis Modules extend core functionality with new data types and commands. Popular modules include RedisBloom (probabilistic structures), RedisTimeSeries (time-series data), RedisGraph (graph database), and RedisJSON (JSON support).",
      },
      {
        question: "How do you optimize Redis for high read volumes?",
        solution:
          "Strategies include using read replicas, enabling keyspace notifications, implementing connection pooling, using pipelining, optimizing data structures, considering Redis Cluster, and using efficient serialization formats.",
      },
      {
        question: "Explain the use of Pipelining in Redis",
        solution:
          "Pipelining sends multiple commands to Redis without waiting for replies, reducing network latency. Commands are queued and responses are read together, significantly improving throughput for bulk operations.",
      },
      {
        question:
          "Discuss the limitations of Redis regarding data size and type",
        solution:
          "Single value limit is 512MB, total memory limited by available RAM, single-threaded command processing, lack of complex querying, eventual consistency in cluster mode, and data size limits per value.",
      },
      {
        question: "How do you backup and restore Redis data?",
        solution:
          "Use BGSAVE for RDB snapshots, COPY for AOF files, or redis-cli --rdb for backups. For restore, copy RDB/AOF files to Redis directory or use redis-cli --pipe for bulk loading.",
      },
      {
        question:
          "What are the advantages of using Redis over traditional databases?",
        solution:
          "Sub-millisecond latency, rich data structures, atomic operations, pub/sub messaging, optional persistence, high availability options, horizontal scaling with clustering, and extensive client library support.",
      },
      {
        question: "How does Redis handle concurrency?",
        solution:
          "Uses single-threaded processing for commands ensuring atomicity. Concurrent clients handled via I/O multiplexing. Transactions provide atomicity, and Lua scripts run atomically on the server.",
      },
      {
        question: "Explain the use of Lua scripting in Redis",
        solution:
          "Lua scripts execute atomically on the server, reducing network round-trips. Use EVAL for one-time scripts, SCRIPT LOAD and EVALSHA for cached scripts. Scripts can access Redis commands via redis.call() or redis.pcall().",
      },
      {
        question: "What are the limitations of Redis?",
        solution:
          "Memory-based storage limits, single-threaded command processing, eventual consistency in cluster mode, lack of complex SQL-like queries, data size limits per value (512MB), and no multi-document transactions.",
      },
      {
        question: "How do you scale Redis?",
        solution:
          "Options include vertical scaling (more RAM/CPU), horizontal scaling with Redis Cluster, read replicas for read scaling, client-side sharding, or managed services like Redis Enterprise. Choice depends on use case and constraints.",
      },
      {
        question:
          "Describe a situation where you used Redis to solve a performance problem",
        solution:
          "Implemented Redis caching for user session storage, reducing database queries by 80% and improving response times from 200ms to 5ms. Used TTL for automatic cleanup and pub/sub for cache invalidation.",
      },
      {
        question: "What is Redis Bloom Filter?",
        solution:
          "A probabilistic data structure from RedisBloom module that tests element membership with possible false positives but no false negatives. Useful for cache filtering and duplicate detection.",
      },
      {
        question: "How do you handle security in Redis?",
        solution:
          "Enable AUTH with strong passwords, use ACL for fine-grained permissions, enable TLS for encryption, bind to specific interfaces, use protected mode, implement network security, and regularly update Redis.",
      },
      {
        question:
          "Explain the maximum memory limit for a Redis instance and how it can be configured",
        solution:
          "Set maxmemory directive in redis.conf or via CONFIG SET maxmemory. When reached, eviction policies (maxmemory-policy) determine which keys to remove. Example: CONFIG SET maxmemory 2gb",
      },
      {
        question:
          "What is the purpose of the Redis 'WATCH' command in the context of transactions?",
        solution:
          "WATCH monitors keys for changes during a transaction. If any watched key is modified before EXEC, the transaction is aborted. It provides optimistic locking for concurrent operations.",
      },
      {
        question: "How do you implement rate limiting using Redis?",
        solution:
          "Use token bucket algorithm with INCR and EXPIRE commands, or use sliding window with sorted sets. Example: INCR rate_limit:user:123; EXPIRE rate_limit:user:123 60",
      },
      {
        question: "Explain Redis Streams and their use cases",
        solution:
          "Redis Streams are log-like data structures for storing append-only sequences of elements. Use cases include message queues, event sourcing, activity feeds, and audit logs. Support consumer groups and blocking reads.",
      },
      {
        question:
          "How do you handle cache stampede (thundering herd) in Redis?",
        solution:
          "Solutions include: adding random jitter to TTLs, using locks (SETNX), implementing cache warming, using Redis Streams for queue-based updates, or using probabilistic early expiration.",
      },
      {
        question: "What is Redis Cluster and how does it distribute data?",
        solution:
          "Redis Cluster automatically shards data across multiple nodes using 16384 hash slots. Keys are distributed based on CRC16 hash of key name. Provides automatic failover and supports up to 1000 nodes.",
      },
      {
        question: "Explain Redis eviction policies",
        solution:
          "Eviction policies determine which keys to remove when maxmemory is reached. Options include noeviction, allkeys-lru, volatile-lru, allkeys-lfu, volatile-lfu, allkeys-random, volatile-random, volatile-ttl.",
      },
      {
        question: "Describe how you would use Redis for session management",
        solution:
          "Store session data as hashes with session ID as key, set appropriate TTL, use Redis Cluster for scalability, implement session invalidation, and handle session migration during scaling events.",
      },
      {
        question: "How can you monitor Redis performance?",
        solution:
          "Use INFO command for server stats, MONITOR for real-time commands, SLOWLOG for slow queries, redis-cli --stat for live metrics, keyspace hits/misses, memory usage, client metrics, and APM tools.",
      },
      {
        question: "Explain the difference between RDB and AOF persistence",
        solution:
          "RDB creates compact snapshots at intervals, good for backups but may lose recent data. AOF logs every write operation for durability but larger files and slower recovery. Both can be enabled for hybrid approach.",
      },
      {
        question: "How do you backup and restore Redis data?",
        solution:
          "Use BGSAVE for RDB snapshots, CONFIG GET dir to find data directory, copy dump.rdb and appendonly.aof files. For restore, copy files to Redis directory or use redis-cli --pipe for bulk loading.",
      },
      {
        question:
          "What are the advantages of using Redis over traditional databases?",
        solution:
          "Sub-millisecond latency, rich data structures, atomic operations, pub/sub messaging, persistence options, high availability, horizontal scaling, extensive client library support, and simple deployment.",
      },
      {
        question: "How does Redis handle concurrency?",
        solution:
          "Single-threaded command processing ensures atomic operations. Concurrent clients handled via I/O multiplexing. Transactions provide atomicity, Lua scripts run atomically, and optimistic locking with WATCH.",
      },
      {
        question: "What are Redis Streams and their use cases?",
        solution:
          "Redis Streams are log-like data structures for append-only sequences. Use cases include message queues, event sourcing, activity feeds, and audit logs. Support consumer groups, blocking reads, and range queries.",
      },
      {
        question:
          "How do you handle cache stampede (thundering herd) in Redis?",
        solution:
          "Implement locking with SETNX, add random jitter to TTLs, use cache warming, implement probabilistic early expiration, or use Redis Streams for queue-based cache updates.",
      },
      {
        question: "Explain Redis Cluster and how it distributes data",
        solution:
          "Redis Cluster uses 16384 hash slots distributed across nodes. Keys are mapped to slots using CRC16 hash. Provides automatic failover, supports up to 1000 nodes, and handles rebalancing during scaling.",
      },
      {
        question: "Explain Redis eviction policies",
        solution:
          "Policies include noeviction (return error), allkeys-lru (least recently used), volatile-lru (LRU among keys with TTL), allkeys-lfu (least frequently used), volatile-lfu, allkeys-random, volatile-random, volatile-ttl.",
      },
      {
        question: "Describe how you would use Redis for session management",
        solution:
          "Store sessions as hashes with TTL, use session ID as key, implement session invalidation, handle session migration during scaling, and use Redis Cluster for distributed sessions.",
      },
      {
        question: "How can you monitor Redis performance?",
        solution:
          "Use INFO command for server stats, MONITOR for real-time commands, SLOWLOG for slow queries, redis-cli --stat for live metrics, keyspace hits/misses, memory usage, and client metrics.",
      },
      {
        question: "Explain the difference between RDB and AOF persistence",
        solution:
          "RDB creates compact snapshots at intervals, good for backups but may lose recent data. AOF logs every write for durability but larger files. Both can be enabled for hybrid persistence.",
      },
      {
        question: "How do you backup and restore Redis data?",
        solution:
          "Use BGSAVE for RDB snapshots, copy dump.rdb and appendonly.aof files. For restore, copy files to Redis directory or use redis-cli --pipe. Also use CONFIG GET dir to locate data directory.",
      },
      {
        question:
          "What are the advantages of using Redis over traditional databases?",
        solution:
          "Sub-millisecond latency, rich data structures, atomic operations, pub/sub messaging, persistence options, high availability, horizontal scaling, extensive client libraries, and simple deployment.",
      },
      {
        question: "How does Redis handle concurrency?",
        solution:
          "Single-threaded command processing ensures atomicity. Concurrent clients handled via I/O multiplexing. Transactions provide atomicity, Lua scripts run atomically, and optimistic locking with WATCH.",
      },
      {
        question: "What are Redis Streams and their use cases?",
        solution:
          "Redis Streams are log-like data structures for append-only sequences. Use cases include message queues, event sourcing, activity feeds, audit logs. Support consumer groups, blocking reads, and range queries.",
      },
      {
        question:
          "How do you handle cache stampede (thundering herd) in Redis?",
        solution:
          "Implement locking with SETNX, add random jitter to TTLs, use cache warming, probabilistic early expiration, or Redis Streams for queue-based cache updates.",
      },
      {
        question: "Explain Redis Cluster and how it distributes data",
        solution:
          "Uses 16384 hash slots distributed across nodes. Keys mapped to slots via CRC16 hash. Provides automatic failover, supports 1000 nodes, handles rebalancing during scaling.",
      },
      {
        question: "Explain Redis eviction policies",
        solution:
          "Policies include noeviction (error), allkeys-lru (least recently used), volatile-lru (LRU among keys with TTL), allkeys-lfu (least frequently used), volatile-lfu, allkeys-random, volatile-random, volatile-ttl.",
      },
      {
        question: "Describe how you would use Redis for session management",
        solution:
          "Store sessions as hashes with TTL, use session ID as key, implement session invalidation, handle session migration during scaling, and use Redis Cluster for distributed sessions.",
      },
      {
        question: "How can you monitor Redis performance?",
        solution:
          "Use INFO command for server stats, MONITOR for real-time commands, SLOWLOG for slow queries, redis-cli --stat for live metrics, keyspace hits/misses, memory usage, and client metrics.",
      },
      {
        question: "Explain the difference between RDB and AOF persistence",
        solution:
          "RDB creates compact snapshots at intervals, good for backups but may lose recent data. AOF logs every write for durability but larger files. Both can be enabled for hybrid persistence.",
      },
      {
        question: "How do you backup and restore Redis data?",
        solution:
          "Use BGSAVE for RDB snapshots, copy dump.rdb and appendonly.aof files. For restore, copy files to Redis directory or use redis-cli --pipe. Also use CONFIG GET dir to locate data directory.",
      },
      {
        question:
          "What are the advantages of using Redis over traditional databases?",
        solution:
          "Sub-millisecond latency, rich data structures, atomic operations, pub/sub messaging, persistence options, high availability, horizontal scaling, extensive client libraries, and simple deployment.",
      },
      {
        question: "How does Redis handle concurrency?",
        solution:
          "Single-threaded command processing ensures atomicity. Concurrent clients handled via I/O multiplexing. Transactions provide atomicity, Lua scripts run atomically, and optimistic locking with WATCH.",
      },
      {
        question: "What are Redis Streams and their use cases?",
        solution:
          "Redis Streams are log-like data structures for append-only sequences. Use cases include message queues, event sourcing, activity feeds, audit logs. Support consumer groups, blocking reads, and range queries.",
      },
      {
        question:
          "How do you handle cache stampede (thundering herd) in Redis?",
        solution:
          "Implement locking with SETNX, add random jitter to TTLs, use cache warming, probabilistic early expiration, or Redis Streams for queue-based cache updates.",
      },
      {
        question: "Explain Redis Cluster and how it distributes data",
        solution:
          "Uses 16384 hash slots distributed across nodes. Keys mapped to slots via CRC16 hash. Provides automatic failover, supports 1000 nodes, handles rebalancing during scaling.",
      },
      {
        question: "Explain Redis eviction policies",
        solution:
          "Policies include noeviction (error), allkeys-lru (least recently used), volatile-lru (LRU among keys with TTL), allkeys-lfu (least frequently used), volatile-lfu, allkeys-random, volatile-random, volatile-ttl.",
      },
      {
        question: "Describe how you would use Redis for session management",
        solution:
          "Store sessions as hashes with TTL, use session ID as key, implement session invalidation, handle session migration during scaling, and use Redis Cluster for distributed sessions.",
      },
      {
        question: "How can you monitor Redis performance?",
        solution:
          "Use INFO command for server stats, MONITOR for real-time commands, SLOWLOG for slow queries, redis-cli --stat for live metrics, keyspace hits/misses, memory usage, and client metrics.",
      },
      {
        question: "Explain the difference between RDB and AOF persistence",
        solution:
          "RDB creates compact snapshots at intervals, good for backups but may lose recent data. AOF logs every write for durability but larger files. Both can be enabled for hybrid persistence.",
      },
      {
        question: "How do you backup and restore Redis data?",
        solution:
          "Use BGSAVE for RDB snapshots, copy dump.rdb and appendonly.aof files. For restore, copy files to Redis directory or use redis-cli --pipe. Also use CONFIG GET dir to locate data directory.",
      },
      {
        question:
          "What are the advantages of using Redis over traditional databases?",
        solution:
          "Sub-millisecond latency, rich data structures, atomic operations, pub/sub messaging, persistence options, high availability, horizontal scaling, extensive client libraries, and simple deployment.",
      },
      {
        question: "How does Redis handle concurrency?",
        solution:
          "Single-threaded command processing ensures atomicity. Concurrent clients handled via I/O multiplexing. Transactions provide atomicity, Lua scripts run atomically, and optimistic locking with WATCH.",
      },
      {
        question: "What are Redis Streams and their use cases?",
        solution:
          "Redis Streams are log-like data structures for append-only sequences. Use cases include message queues, event sourcing, activity feeds, audit logs. Support consumer groups, blocking reads, and range queries.",
      },
      {
        question:
          "How do you handle cache stampede (thundering herd) in Redis?",
        solution:
          "Implement locking with SETNX, add random jitter to TTLs, use cache warming, probabilistic early expiration, or Redis Streams for queue-based cache updates.",
      },
      {
        question: "Explain Redis Cluster and how it distributes data",
        solution:
          "Uses 16384 hash slots distributed across nodes. Keys mapped to slots via CRC16 hash. Provides automatic failover, supports 1000 nodes, handles rebalancing during scaling.",
      },
      {
        question: "Explain Redis eviction policies",
        solution:
          "Policies include noeviction (error), allkeys-lru (least recently used), volatile-lru (LRU among keys with TTL), allkeys-lfu (least frequently used), volatile-lfu, allkeys-random, volatile-random, volatile-ttl.",
      },
      {
        question: "Describe how you would use Redis for session management",
        solution:
          "Store sessions as hashes with TTL, use session ID as key, implement session invalidation, handle session migration during scaling, and use Redis Cluster for distributed sessions.",
      },
      {
        question: "How can you monitor Redis performance?",
        solution:
          "Use INFO command for server stats, MONITOR for real-time commands, SLOWLOG for slow queries, redis-cli --stat for live metrics, keyspace hits/misses, memory usage, and client metrics.",
      },
      {
        question: "Explain the difference between RDB and AOF persistence",
        solution:
          "RDB creates compact snapshots at intervals, good for backups but may lose recent data. AOF logs every write for durability but larger files. Both can be enabled for hybrid persistence.",
      },
      {
        question: "How do you backup and restore Redis data?",
        solution:
          "Use BGSAVE for RDB snapshots, copy dump.rdb and appendonly.aof files. For restore, copy files to Redis directory or use redis-cli --pipe. Also use CONFIG GET dir to locate data directory.",
      },
      {
        question:
          "What are the advantages of using Redis over traditional databases?",
        solution:
          "Sub-millisecond latency, rich data structures, atomic operations, pub/sub messaging, persistence options, high availability, horizontal scaling, extensive client libraries, and simple deployment.",
      },
      {
        question: "How does Redis handle concurrency?",
        solution:
          "Single-threaded command processing ensures atomicity. Concurrent clients handled via I/O multiplexing. Transactions provide atomicity, Lua scripts run atomically, and optimistic locking with WATCH.",
      },
      {
        question: "What are Redis Streams and their use cases?",
        solution:
          "Redis Streams are log-like data structures for append-only sequences. Use cases include message queues, event sourcing, activity feeds, audit logs. Support consumer groups, blocking reads, and range queries.",
      },
      {
        question:
          "How do you handle cache stampede (thundering herd) in Redis?",
        solution:
          "Implement locking with SETNX, add random jitter to TTLs, use cache warming, probabilistic early expiration, or Redis Streams for queue-based cache updates.",
      },
      {
        question: "Explain Redis Cluster and how it distributes data",
        solution:
          "Uses 16384 hash slots distributed across nodes. Keys mapped to slots via CRC16 hash. Provides automatic failover, supports 1000 nodes, handles rebalancing during scaling.",
      },
      {
        question: "Explain Redis eviction policies",
        solution:
          "Policies include noeviction (error), allkeys-lru (least recently used), volatile-lru (LRU among keys with TTL), allkeys-lfu (least frequently used), volatile-lfu, allkeys-random, volatile-random, volatile-ttl.",
      },
      {
        question: "Describe how you would use Redis for session management",
        solution:
          "Store sessions as hashes with TTL, use session ID as key, implement session invalidation, handle session migration during scaling, and use Redis Cluster for distributed sessions.",
      },
      {
        question: "How can you monitor Redis performance?",
        solution:
          "Use INFO command for server stats, MONITOR for real-time commands, SLOWLOG for slow queries, redis-cli --stat for live metrics, keyspace hits/misses, memory usage, and client metrics.",
      },
      {
        question: "Explain the difference between RDB and AOF persistence",
        solution:
          "RDB creates compact snapshots at intervals, good for backups but may lose recent data. AOF logs every write for durability but larger files. Both can be enabled for hybrid persistence.",
      },
      {
        question: "How do you backup and restore Redis data?",
        solution:
          "Use BGSAVE for RDB snapshots, copy dump.rdb and appendonly.aof files. For restore, copy files to Redis directory or use redis-cli --pipe. Also use CONFIG GET dir to locate data directory.",
      },
      {
        question:
          "What are the advantages of using Redis over traditional databases?",
        solution:
          "Sub-millisecond latency, rich data structures, atomic operations, pub/sub messaging, persistence options, high availability, horizontal scaling, extensive client libraries, and simple deployment.",
      },
      {
        question: "How does Redis handle concurrency?",
        solution:
          "Single-threaded command processing ensures atomicity. Concurrent clients handled via I/O multiplexing. Transactions provide atomicity, Lua scripts run atomically, and optimistic locking with WATCH.",
      },
      {
        question: "What are Redis Streams and their use cases?",
        solution:
          "Redis Streams are log-like data structures for append-only sequences. Use cases include message queues, event sourcing, activity feeds, audit logs. Support consumer groups, blocking reads, and range queries.",
      },
      {
        question:
          "How do you handle cache stampede (thundering herd) in Redis?",
        solution:
          "Implement locking with SETNX, add random jitter to TTLs, use cache warming, probabilistic early expiration, or Redis Streams for queue-based cache updates.",
      },
      {
        question: "Explain Redis Cluster and how it distributes data",
        solution:
          "Uses 16384 hash slots distributed across nodes. Keys mapped to slots via CRC16 hash. Provides automatic failover, supports 1000 nodes, handles rebalancing during scaling.",
      },
      {
        question: "Explain Redis eviction policies",
        solution:
          "Policies include noeviction (error), allkeys-lru (least recently used), volatile-lru (LRU among keys with TTL), allkeys-lfu (least frequently used), volatile-lfu (LFU among keys with TTL), allkeys-random, volatile-random, and volatile-ttl (expires soonest).",
      },
    ],
  },
  {
    id: 12,
    topic: "AWS Lambda",
    categories: "Junior",
    tags: [
      { name: "basics", link: "" },
      { name: "triggers", link: "" },
      { name: "runtime", link: "" },
    ],
    prepareLink: "",
    externallinks: [],
    questions: [
      {
        question: "What is AWS Lambda?",
        solution:
          "AWS Lambda is a serverless compute service that lets you run code without provisioning or managing servers. It automatically scales and you pay only for the compute time consumed.",
      },
      {
        question: "How does Lambda billing work?",
        solution:
          "Lambda charges per request and per duration (GB-seconds). Duration is calculated from the time your code starts executing until it returns or terminates, rounded up to the nearest 1ms.",
      },
      {
        question: "What are the supported runtimes?",
        solution:
          "Lambda natively supports Node.js, Python, Ruby, Java, Go, .NET Core. You can also use custom runtimes via Lambda Layers or container images.",
      },
      {
        question: "Explain cold start vs warm start in Lambda",
        solution:
          "Cold start occurs when Lambda creates a new execution environment. Warm start reuses an existing environment, resulting in faster invocation. Cold starts happen after code updates, scaling events, or idle periods.",
      },
      {
        question: "How do you handle VPC networking in Lambda?",
        solution:
          "Configure VPC access by assigning Lambda to subnets and security groups. This enables access to private resources like RDS, but adds cold-start latency due to ENI creation.",
      },
      {
        question: "What is the maximum execution time for a Lambda function?",
        solution:
          "The default maximum is 15 minutes (900 seconds). You can configure this between 1 second and 15 minutes per function.",
      },
      {
        question: "How do you configure environment variables securely?",
        solution:
          "Use the Lambda console or CLI to set key-value pairs. For sensitive data, use AWS Systems Manager Parameter Store or AWS Secrets Manager, and grant the Lambda IAM role appropriate permissions.",
      },
      {
        question: "Describe Lambda Layers",
        solution:
          "Lambda Layers are ZIP archives containing libraries, custom runtimes, or other dependencies. They help manage code shared across multiple functions and reduce deployment package size.",
      },
      {
        question: "How do you troubleshoot Lambda timeouts?",
        solution:
          "Check CloudWatch Logs for error messages, increase timeout settings, verify network connectivity, optimize code performance, and use AWS X-Ray for detailed tracing.",
      },
      {
        question: "What triggers can invoke a Lambda function?",
        solution:
          "Lambda can be triggered by API Gateway, S3 events, DynamoDB streams, SNS, SQS, CloudWatch Events, EventBridge, Cognito, and many other AWS services through event sources.",
      },
      {
        question: "How do you set a value in Redis?",
        solution:
          "Use the SET command: SET key value [EX seconds|PX milliseconds|NX|XX]. Example: SET user:1001 'Alice' EX 3600",
      },
      {
        question: "How do you retrieve a value from Redis?",
        solution: "Use the GET command: GET key. Example: GET user:1001",
      },
      {
        question: "What is the EXPIRE command in Redis?",
        solution:
          "EXPIRE sets a timeout (TTL) on a key in seconds. After the timeout, the key is automatically deleted. Syntax: EXPIRE key seconds. Example: EXPIRE session:abc 1800",
      },
      {
        question: "Explain the SET command and how it is used",
        solution:
          "The SET command stores a key-value pair. It supports options like EX (expire in seconds), PX (expire in milliseconds), NX (set only if key doesn't exist), and XX (set only if key exists). Example: SET user:1001 'Alice' EX 3600 NX",
      },
      {
        question:
          "Write a Redis command to store a key-value pair and retrieve it",
        solution: "SET mykey 'hello'; GET mykey",
      },
      {
        question: "How can you delete a key in Redis?",
        solution:
          "Use the DEL command: DEL key [key...]. Example: DEL user:1001",
      },
      {
        question:
          "What is a Redis hash and how do you use it? Provide an example",
        solution:
          "A Redis hash is a map between string fields and string values. Use HSET to set fields, HGET to get a field, and HGETALL to get all fields. Example: HSET user:1001 name 'Alice' age '30'; HGET user:1001 name",
      },
      {
        question: "Write a Redis command to increment a value stored at a key",
        solution:
          "Use INCR for integer increment: INCR counter. Use INCRBY for custom increments: INCRBY counter 5",
      },
      {
        question: "Explain the difference between GET and MGET",
        solution:
          "GET retrieves a single key's value. MGET retrieves values for multiple keys in one operation. Example: MGET key1 key2 key3",
      },
      {
        question:
          "Write a Redis command to retrieve the first three elements of a list",
        solution: "Use LRANGE: LRANGE mylist 0 2",
      },
      {
        question: "Write a Redis command to find the length of a list",
        solution: "Use LLEN: LLEN mylist",
      },
      {
        question: "How do you install Redis on a Linux system?",
        solution:
          "wget http://download.redis.io/redis-stable.tar.gz; tar xzf redis-stable.tar.gz; cd redis-stable; make; sudo make install",
      },
      {
        question:
          "Explain the concept of Redis Pub/Sub and provide a simple example",
        solution:
          "Pub/Sub is a messaging paradigm where publishers send messages to channels and subscribers receive them. Example: SUBSCRIBE news; PUBLISH news 'Hello World'",
      },
      {
        question: "What is the TTL command and what does it do?",
        solution:
          "TTL returns the remaining time-to-live (in seconds) for a key with an expiration set. Returns -2 if key doesn't exist, -1 if key exists but has no expiration, or positive value for remaining seconds.",
      },
      {
        question: "What is the difference between Redis Lists and Sets?",
        solution:
          "Lists are ordered collections that allow duplicates and support operations like LPUSH/RPUSH. Sets are unordered collections of unique values with operations like SADD/SMEMBERS. Lists maintain insertion order; sets don't.",
      },
      {
        question: "What is a Redis sorted set?",
        solution:
          "A sorted set (ZSET) is a collection of unique elements ordered by a score. Each member has an associated floating-point score used for ordering. Supports operations like ZADD, ZRANGE, ZRANK with logarithmic complexity.",
      },
      {
        question:
          "How do you implement caching with Redis in a web application?",
        solution:
          "Store frequently accessed data in Redis with expiration times. Check Redis first before querying the database. Use SET with expiration for cache entries and DEL to invalidate cache.",
      },
      {
        question: "What is a Redis transaction and how is it executed?",
        solution:
          "Transactions group commands into an atomic unit using MULTI/EXEC. Commands are queued until EXEC is called, then executed atomically. WATCH can be used for optimistic locking. Example: MULTI; SET a 1; SET b 2; EXEC",
      },
      {
        question: "What are Redis pipelines?",
        solution:
          "Pipelines batch multiple commands into a single network round-trip, improving performance by reducing latency. Commands are queued and responses are received together. Can be used with MULTI/EXEC for atomic pipelines.",
      },
      {
        question:
          "How does Redis handle persistence and what are the different persistence mechanisms?",
        solution:
          "Redis offers RDB (snapshotting) and AOF (append-only file) persistence. RDB takes periodic snapshots for compact backups. AOF logs every write operation for durability. Both can be enabled simultaneously.",
      },
      {
        question: "Explain the concept of Redis transactions",
        solution:
          "Redis transactions use MULTI to start, queue commands, then EXEC to execute atomically. Commands are serialized and executed sequentially. DISCARD cancels the transaction. WATCH provides optimistic locking by monitoring keys.",
      },
      {
        question: "What are the main differences between RDB and AOF?",
        solution:
          "RDB creates compact snapshots at intervals, good for backups but may lose recent data. AOF logs every write, providing better durability but larger files and slower recovery. AOF can be fsynced every command, every second, or manually.",
      },
      {
        question: "How can you scale Redis?",
        solution:
          "Options include vertical scaling (more RAM/CPU), horizontal scaling with Redis Cluster, read replicas for read scaling, client-side sharding, or Redis Enterprise features. Choice depends on use case and operational requirements.",
      },
      {
        question:
          "Describe a scenario where Redis is not the appropriate choice",
        solution:
          "When you need complex querying, datasets larger than memory, strong consistency across nodes, or when durability is more important than speed. Also avoid for write-heavy workloads requiring ACID guarantees.",
      },
      {
        question: "How do you monitor and debug Redis performance issues?",
        solution:
          "Use INFO command for server stats, MONITOR for real-time commands, SLOWLOG for slow queries, redis-cli --stat for live metrics, memory usage commands, and client-side metrics like response times and hit rates.",
      },
      {
        question: "What security features does Redis offer?",
        solution:
          "Features include AUTH for password protection, ACL (Access Control Lists) for fine-grained permissions, TLS encryption for data in transit, protected mode, and network security through bind configurations.",
      },
      {
        question: "Explain how Lua scripting is used in Redis",
        solution:
          "Lua scripts run atomically on the server side using EVAL command. Scripts can perform complex operations with minimal network round-trips. Use EVAL for one-time scripts and SCRIPT LOAD/EVALSHA for cached scripts.",
      },
      {
        question:
          "How do you handle caching in a distributed environment using Redis?",
        solution:
          "Use Redis Cluster for distributed caching, implement cache invalidation strategies, use consistent hashing for key distribution, handle cache stampede with locks, and use read replicas for read scaling.",
      },
      {
        question:
          "What is the impact of persistence settings on Redis performance?",
        solution:
          "RDB snapshots can cause brief pauses during save operations. AOF with fsync=always impacts write performance. AOF fsync=every-second offers good balance. Choose settings based on durability vs performance requirements.",
      },
      {
        question: "Describe Redis Sentinel and its role",
        solution:
          "Redis Sentinel provides high availability by monitoring Redis instances, performing automatic failover, and notifying clients about topology changes. It also acts as a configuration provider for clients.",
      },
      {
        question:
          "What are Redis Modules and how do they enhance functionality?",
        solution:
          "Redis Modules extend core functionality with new data types and commands. Popular modules include RedisBloom (probabilistic structures), RedisTimeSeries, RedisGraph, and RedisJSON.",
      },
      {
        question: "How do you optimize Redis for high read volumes?",
        solution:
          "Use read replicas, enable keyspace notifications, implement connection pooling, use pipelining, optimize data structures, consider Redis Cluster, and use efficient serialization formats.",
      },
      {
        question: "Explain the use of Pipelining in Redis",
        solution:
          "Pipelining sends multiple commands to Redis without waiting for replies, reducing network latency. Commands are queued and responses are read together, significantly improving throughput for bulk operations.",
      },
      {
        question:
          "Discuss the limitations of Redis regarding data size and type",
        solution:
          "Single value limit is 512MB, total memory limited by available RAM, single-threaded command processing, lack of complex querying, eventual consistency in cluster mode, and data size limits per value.",
      },
      {
        question: "How do you backup and restore Redis data?",
        solution:
          "Use BGSAVE for RDB snapshots, COPY command for AOF, or use redis-cli --rdb. For restore, copy RDB/AOF files to Redis directory or use redis-cli --pipe for bulk loading.",
      },
      {
        question:
          "What are the advantages of using Redis over traditional databases?",
        solution:
          "Sub-millisecond latency, rich data structures, atomic operations, pub/sub messaging, persistence options, high availability, horizontal scaling, extensive client library support, and simple deployment.",
      },
      {
        question: "How does Redis handle concurrency?",
        solution:
          "Uses single-threaded processing for commands, ensuring atomic operations. Concurrent clients are handled via I/O multiplexing, and transactions provide atomicity via MULTI/EXEC.",
      },
      {
        question: "What is normalization in SQL?",
        solution:
          "Normalization is the process of organizing data to reduce redundancy and improve data integrity by dividing large tables into smaller, related tables and defining relationships between them.",
      },
      {
        question: "What is denormalization in SQL?",
        solution:
          "Denormalization is the deliberate introduction of redundancy into a database by combining tables or adding redundant data to improve query performance at the cost of data integrity.",
      },
      {
        question: "Difference between SQL vs NoSQL",
        solution:
          "SQL databases are relational with structured schemas and ACID compliance. NoSQL databases are non-relational with flexible schemas, designed for horizontal scaling and handling unstructured data.",
      },
      {
        question: "What is a schema in SQL?",
        solution:
          "A schema is a logical container that groups database objects like tables, views, and procedures. It helps organize and secure related objects.",
      },
      {
        question: "What is a sequence in SQL?",
        solution:
          "A sequence is a database object that generates numeric values in ascending order automatically, often used for auto-incrementing primary keys.",
      },
      {
        question: "What is a synonym in SQL?",
        solution:
          "A synonym is an alias for a database object that provides an alternative name, making it easier to reference objects without using the full qualified name.",
      },
      {
        question: "What is a cursor in SQL?",
        solution:
          "A cursor is a database object that allows row-by-row processing of query results, enabling procedural operations on individual rows rather than set-based operations.",
      },
      {
        question: "What is a database link in SQL?",
        solution:
          "A database link is a connection between two databases that allows querying remote tables as if they were local, enabling distributed database access.",
      },
      {
        question: "What is a composite index in SQL?",
        solution:
          "An index created on multiple columns that can improve query performance when those columns are used together in WHERE clauses or JOIN conditions.",
      },
      {
        question: "What is a covering index in SQL?",
        solution:
          "An index that includes all columns needed by a query, eliminating the need to access the actual table data and improving query performance.",
      },
      {
        question: "What is a filtered index in SQL?",
        solution:
          "A non-clustered index with a WHERE clause that indexes only a subset of rows, reducing index size and improving performance for specific queries.",
      },
      {
        question: "What is a full-text index in SQL?",
        solution:
          "A special index designed for fast searching of text within character-based columns, supporting complex search operations like word proximity and stemming.",
      },
      {
        question: "What is a spatial index in SQL?",
        solution:
          "An index optimized for spatial data types like geometry and geography, enabling fast queries on spatial relationships and proximity searches.",
      },
      {
        question: "What is a unique index in SQL?",
        solution:
          "An index that enforces uniqueness of the indexed column(s), preventing duplicate values and improving query performance for equality searches.",
      },
      {
        question: "What is a clustered index in SQL?",
        solution:
          "An index that determines the physical order of table rows, with only one allowed per table. The data pages are stored in the same order as the index.",
      },
      {
        question: "What is a non-clustered index in SQL?",
        solution:
          "An index that creates a separate structure pointing to table data, allowing multiple non-clustered indexes per table without affecting physical row order.",
      },
      {
        question: "What is index fragmentation in SQL?",
        solution:
          "The logical or physical disorder of index pages that can degrade query performance, requiring periodic maintenance like rebuilding or reorganizing indexes.",
      },
      {
        question: "What is a table scan in SQL?",
        solution:
          "When the database reads every row in a table because no suitable index exists, resulting in poor performance for large tables.",
      },
      {
        question: "What is an index seek in SQL?",
        solution:
          "When the database uses an index to directly find matching rows, providing efficient access compared to table scans.",
      },
      {
        question: "What is an index lookup in SQL?",
        solution:
          "The process of using an index to locate table rows, which may involve additional lookups to the table for non-indexed columns.",
      },
      {
        question: "What is a bookmark lookup in SQL?",
        solution:
          "An additional lookup operation to fetch non-indexed columns from the table after finding matching rows in a non-clustered index.",
      },
      {
        question: "What is a key lookup in SQL?",
        solution:
          "A lookup operation performed after finding rows in a non-clustered index to fetch additional columns from the clustered index or table.",
      },
      {
        question: "What is a RID lookup in SQL?",
        solution:
          "A lookup operation used in heap tables (tables without clustered indexes) to fetch actual row data after finding matching index entries.",
      },
      {
        question: "What is a query execution plan in SQL?",
        solution:
          "A detailed plan generated by the query optimizer showing how the database will execute a query, including access methods, join strategies, and estimated costs.",
      },
      {
        question: "What is a cost-based optimizer in SQL?",
        solution:
          "A database component that chooses the most efficient execution plan based on statistics and estimated costs, aiming to minimize resource usage.",
      },
    ],
  },
  {
    id: 13,
    topic: "AWS Lambda",
    categories: "Mid",
    tags: [
      { name: "concurrency", link: "" },
      { name: "scaling", link: "" },
      { name: "vpc", link: "" },
      { name: "layers", link: "" },
      { name: "monitoring", link: "" },
    ],
    prepareLink: "",
    externallinks: [],
    questions: [
      {
        question: "How do you handle concurrent Lambda executions?",
        solution:
          "Set reserved concurrency limits to prevent throttling, use provisioned concurrency for predictable performance, and monitor CloudWatch metrics like ConcurrentExecutions and Throttles.",
      },
      {
        question: "Explain Lambda reserved vs provisioned concurrency",
        solution:
          "Reserved concurrency guarantees a maximum number of concurrent executions. Provisioned concurrency keeps functions initialized and ready to avoid cold starts, billed even when not invoked.",
      },
      {
        question: "How do you configure Lambda in a VPC?",
        solution:
          "Attach the function to private subnets with NAT gateways/ VPC endpoints. Grant the Lambda IAM role permissions to create ENIs. Be aware of cold-start latency due to ENI creation.",
      },
      {
        question: "What are Lambda Layers and best practices?",
        solution:
          "Layers package libraries or custom runtimes separately from function code. Best practices: keep layers small, version them, avoid duplicating dependencies, and use for shared code across functions.",
      },
      {
        question: "How do you monitor Lambda performance?",
        solution:
          "Use CloudWatch Logs for logs, CloudWatch Metrics for invocations/errors/duration, AWS X-Ray for distributed tracing, and CloudWatch Insights for log analytics.",
      },
      {
        question: "Explain Lambda memory and CPU allocation",
        solution:
          "Memory is configurable from 128 MB to 10,240 MB. CPU is proportional to memory (1 vCPU per 1,769 MB). More memory = more CPU = faster execution but higher cost.",
      },
      {
        question: "How do you implement blue-green deployments with Lambda?",
        solution:
          "Use Lambda aliases with weighted routing, CodeDeploy for gradual traffic shifting, or API Gateway canary deployments to safely test new versions.",
      },
      {
        question: "What is Lambda @Edge?",
        solution:
          "Lambda functions that run at CloudFront edge locations for low-latency processing. Use cases include request/response transformation, A/B testing, and authentication.",
      },
      {
        question: "How do you handle Lambda timeouts?",
        solution:
          "Increase timeout configuration, optimize code logic, use Step Functions for long-running tasks, implement retry logic, and monitor CloudWatch Logs for timeout errors.",
      },
      {
        question: "Explain Lambda extensions",
        solution:
          "Extensions allow you to integrate Lambda with monitoring, security, and governance tools. They run in parallel with function invocations and can process logs, metrics, or telemetry.",
      },
      {
        question: "How do you implement Lambda error handling?",
        solution:
          "Use try-catch blocks in code, configure DLQ (Dead Letter Queue) or On-Failure destinations, set retry attempts, and monitor CloudWatch Error metrics.",
      },
      {
        question: "What are Lambda destinations?",
        solution:
          "Destinations send invocation records to SQS, SNS, EventBridge, or Lambda for asynchronous invocations. They provide success/failure notifications and are configured per function.",
      },
      {
        question: "How do you optimize Lambda cold starts?",
        solution:
          "Use provisioned concurrency, keep functions warm, minimize package size, use lightweight runtimes, avoid large dependencies, and use Lambda Layers for shared libraries.",
      },
      {
        question: "Explain Lambda container image support",
        solution:
          "Package Lambda functions as container images up to 10 GB. Use AWS-provided base images or custom images. Enables complex dependencies and consistent environments.",
      },
      {
        question: "How do you handle secrets in Lambda?",
        solution:
          "Use AWS Secrets Manager, Systems Manager Parameter Store, or AWS IAM roles. Avoid hardcoding secrets. Grant Lambda IAM permissions to access secrets at runtime.",
      },
      {
        question: "What is Lambda Power Tuning?",
        solution:
          "An open-source tool that automatically finds the optimal memory configuration for Lambda functions by analyzing cost and performance across different memory settings.",
      },
      {
        question: "How do you implement Lambda circuit breakers?",
        solution:
          "Use AWS Step Functions with error handling, implement custom retry logic with exponential backoff, or use Lambda destinations to route failed invocations to recovery workflows.",
      },
      {
        question: "Explain Lambda environment variables best practices",
        solution:
          "Store non-sensitive configuration in environment variables. Use Parameter Store for sensitive data. Keep variables under 4 KB. Version changes with function updates.",
      },
      {
        question: "How do you handle Lambda throttling?",
        solution:
          "Use reserved concurrency, implement retry logic with exponential backoff, monitor CloudWatch metrics, and consider using SQS as a buffer for high-throughput scenarios.",
      },
      {
        question: "What are Lambda EFS use cases?",
        solution:
          "Use EFS for shared file storage across Lambda functions, large file processing, machine learning models, or when you need persistent storage beyond function lifetime.",
      },
      {
        question: "How do you implement Lambda canary deployments?",
        solution:
          "Use Lambda aliases with weighted traffic routing, AWS CodeDeploy for automated canary deployments, or API Gateway canary settings for gradual traffic shifting.",
      },
      {
        question: "Explain Lambda runtime API",
        solution:
          "Allows building custom runtimes for languages not natively supported. Your runtime receives invocation events and returns responses through HTTP endpoints provided by Lambda.",
      },
      {
        question: "How do you handle Lambda DLQ (Dead Letter Queue)?",
        solution:
          "Configure SQS or SNS as DLQ in Lambda settings. Failed async invocations are sent to DLQ after retries are exhausted. Monitor DLQ for failed events and implement reprocessing logic.",
      },
      {
        question: "What is Lambda event filtering?",
        solution:
          "Filter events from sources like SQS, DynamoDB, or Kinesis before invoking the function. Reduces cost by avoiding unnecessary invocations. Uses JSON-based filter patterns.",
      },
      {
        question: "How do you implement Lambda cost optimization?",
        solution:
          "Right-size memory allocation, use provisioned concurrency only when needed, optimize code execution time, leverage caching, and use appropriate concurrency settings.",
      },
      {
        question: "Explain Lambda function URLs",
        solution:
          "Built-in HTTPS endpoints for Lambda functions without needing API Gateway. Support CORS, authorization via IAM or Lambda authorizers, and are useful for simple webhooks or microservices.",
      },
      {
        question: "How do you handle Lambda VPC cold starts?",
        solution:
          "Use provisioned concurrency, keep functions warm, use larger memory settings, optimize VPC configuration, and consider using VPC endpoints instead of NAT gateways.",
      },
      {
        question: "What are Lambda SnapStart for Java?",
        solution:
          "Feature for Java functions that initializes the execution environment at publish time, reducing cold start latency by up to 10x by creating and caching initialized snapshots.",
      },
      {
        question: "How do you implement Lambda function chaining?",
        solution:
          "Use Step Functions for orchestration, invoke Lambda functions from other Lambdas, use SNS/SQS for decoupled communication, or use EventBridge for event-driven architectures.",
      },
      {
        question: "Explain Lambda container image best practices",
        solution:
          "Use multi-stage builds, minimize image size, use AWS base images, implement health checks, optimize for cold starts, and follow security best practices like scanning images.",
      },
      {
        question: "How do you handle Lambda cross-account access?",
        solution:
          "Use resource-based policies, configure IAM roles with cross-account permissions, use AWS Resource Access Manager, or implement token-based authentication for cross-account invocations.",
      },
      {
        question: "What is Lambda function versioning?",
        solution:
          "Publish immutable versions of your function code and configuration. Use aliases to point to specific versions for blue-green deployments or A/B testing. Each version has a unique ARN.",
      },
      {
        question: "How do you implement Lambda circuit breakers?",
        solution:
          "Use AWS Step Functions with error handling, implement custom retry logic with exponential backoff, or use Lambda destinations to route failed invocations to recovery workflows.",
      },
      {
        question: "Explain Lambda runtime management",
        solution:
          "AWS manages runtime updates automatically. You can pin to specific versions or use latest. Monitor for deprecation notices and test function behavior with new runtime versions.",
      },
      {
        question: "How do you handle Lambda timeout gracefully?",
        solution:
          "Set appropriate timeout values, implement graceful shutdown signals, use Step Functions for long-running tasks, monitor CloudWatch metrics, and implement retry logic with exponential backoff.",
      },
    ],
  },
  {
    id: 14,
    topic: "AWS Lambda",
    categories: "Senior",
    tags: [
      { name: "architecture", link: "" },
      { name: "performance", link: "" },
      { name: "security", link: "" },
      { name: "cost-optimization", link: "" },
      { name: "advanced-patterns", link: "" },
    ],
    prepareLink: "",
    externallinks: [],
    questions: [
      {
        question:
          "How would you design a serverless architecture with Lambda for 1M requests/second?",
        solution:
          "Use API Gateway with Lambda + DynamoDB, implement request throttling, leverage Lambda concurrency limits, use Step Functions for orchestration, implement caching with ElastiCache, and use CloudFront for edge caching.",
      },
      {
        question: "Explain Lambda performance tuning at scale",
        solution:
          "Optimize memory allocation vs cost, use provisioned concurrency for critical paths, implement connection pooling, use Lambda extensions for monitoring, analyze CloudWatch metrics, and implement caching strategies.",
      },
      {
        question: "How do you implement Lambda security best practices?",
        solution:
          "Use IAM least privilege, implement API Gateway authorizers, encrypt environment variables, use VPC endpoints, implement WAF, scan code for vulnerabilities, and use AWS Secrets Manager for secrets.",
      },
      {
        question: "Design a Lambda-based ETL pipeline",
        solution:
          "Use S3 triggers for ingestion, Lambda for transformation, SQS for decoupling, Step Functions for orchestration, and CloudWatch for monitoring. Implement retry logic and dead letter queues.",
      },
      {
        question:
          "How do you handle Lambda cost optimization at enterprise scale?",
        solution:
          "Use AWS Cost Explorer, implement right-sizing with Lambda Power Tuning, leverage Savings Plans, use Spot Instances for batch jobs, implement caching, and monitor with CloudWatch Anomaly Detection.",
      },
      {
        question: "Explain Lambda and Step Functions integration patterns",
        solution:
          "Use Step Functions for complex workflows, implement error handling with retries, use Map state for parallel processing, and leverage Callback patterns for long-running tasks.",
      },
      {
        question: "How do you implement Lambda disaster recovery?",
        solution:
          "Use multi-region deployment, implement backup and restore strategies, use Route 53 for failover, implement health checks, and use AWS Backup for disaster recovery.",
      },
      {
        question: "Design a Lambda-based real-time data processing system",
        solution:
          "Use Kinesis Data Streams for ingestion, Lambda for processing, DynamoDB for state, CloudWatch for monitoring, and implement auto-scaling based on stream metrics.",
      },
      {
        question: "Explain Lambda and EventBridge integration",
        solution:
          "Use EventBridge for event-driven architectures, implement rule-based routing, use schema registry, and leverage event replay capabilities for debugging.",
      },
      {
        question: "How do you implement Lambda governance at scale?",
        solution:
          "Use AWS Control Tower, implement tagging strategies, use AWS Config for compliance, implement approval workflows, and use Service Catalog for standardized deployments.",
      },
      {
        question: "Design a Lambda-based API with caching and rate limiting",
        solution:
          "Use API Gateway with caching, implement Lambda authorizers for rate limiting, use DynamoDB for persistent storage, and implement caching with ElastiCache.",
      },
      {
        question: "Explain Lambda and Kubernetes integration",
        solution:
          "Use AWS Lambda for serverless workloads and Kubernetes for containerized workloads. Implement hybrid architectures with AWS Fargate and Lambda.",
      },
      {
        question: "How do you implement Lambda observability at scale?",
        solution:
          "Use CloudWatch Logs Insights, implement distributed tracing with AWS X-Ray, use custom metrics, implement alerting, and use third-party APM tools.",
      },
      {
        question: "Design a Lambda-based CI/CD pipeline",
        solution:
          "Use CodePipeline with Lambda stages, implement automated testing, use SAM or CDK for infrastructure, implement blue-green deployments, and use CodeDeploy for canary releases.",
      },
      {
        question: "Explain Lambda and GraphQL integration",
        solution:
          "Use AWS AppSync with Lambda resolvers, implement caching with ElastiCache, use DynamoDB for data storage, and implement real-time subscriptions.",
      },
      {
        question: "How do you implement Lambda multi-region failover?",
        solution:
          "Use Route 53 health checks, implement active-active deployment, use DynamoDB global tables, implement cross-region replication, and use CloudWatch for monitoring.",
      },
      {
        question:
          "Design a Lambda-based event-driven microservices architecture",
        solution:
          "Use EventBridge for event routing, Lambda for business logic, DynamoDB for state, API Gateway for APIs, and implement saga patterns with Step Functions.",
      },
      {
        question: "Explain Lambda and GraphQL integration",
        solution:
          "Use AWS AppSync with Lambda resolvers, implement caching with ElastiCache, use DynamoDB for data storage, and implement real-time subscriptions.",
      },
      {
        question: "How do you implement Lambda governance at scale?",
        solution:
          "Use AWS Control Tower, implement tagging strategies, use AWS Config for compliance, implement approval workflows, and use Service Catalog for standardized deployments.",
      },
      {
        question: "Design a Lambda-based real-time analytics system",
        solution:
          "Use Kinesis Data Streams for ingestion, Lambda for processing, DynamoDB for state, CloudWatch for monitoring, and implement auto-scaling based on stream metrics.",
      },
      {
        question: "Explain Lambda and EventBridge integration",
        solution:
          "Use EventBridge for event-driven architectures, implement rule-based routing, use schema registry, and leverage event replay capabilities for debugging.",
      },
      {
        question: "How do you implement Lambda disaster recovery?",
        solution:
          "Use multi-region deployment, implement backup and restore strategies, use Route 53 for failover, implement health checks, and use AWS Backup for disaster recovery.",
      },
      {
        question: "Design a Lambda-based ETL pipeline",
        solution:
          "Use S3 triggers for ingestion, Lambda for transformation, SQS for decoupling, Step Functions for orchestration, and CloudWatch for monitoring. Implement retry logic and dead letter queues.",
      },
      {
        question: "Explain Lambda performance tuning at scale",
        solution:
          "Optimize memory allocation vs cost, use provisioned concurrency for critical paths, implement connection pooling, use Lambda extensions for monitoring, analyze CloudWatch metrics, and implement caching strategies.",
      },
      {
        question:
          "How would you design a serverless architecture with Lambda for 1M requests/second?",
        solution:
          "Use API Gateway with Lambda + DynamoDB, implement request throttling, leverage Lambda concurrency limits, use Step Functions for orchestration, implement caching with ElastiCache, and use CloudFront for edge caching.",
      },
      {
        question: "Explain Lambda security best practices",
        solution:
          "Use IAM least privilege, implement API Gateway authorizers, encrypt environment variables, use VPC endpoints, implement WAF, scan code for vulnerabilities, and use AWS Secrets Manager for secrets.",
      },
      {
        question: "Design a Lambda-based API with caching and rate limiting",
        solution:
          "Use API Gateway with caching, implement Lambda authorizers for rate limiting, use DynamoDB for persistent storage, and implement caching with ElastiCache.",
      },
      {
        question: "Explain Lambda and Kubernetes integration",
        solution:
          "Use AWS Lambda for serverless workloads and Kubernetes for containerized workloads. Implement hybrid architectures with AWS Fargate and Lambda.",
      },
      {
        question: "How do you implement Lambda observability at scale?",
        solution:
          "Use CloudWatch Logs Insights, implement distributed tracing with AWS X-Ray, use custom metrics, implement alerting, and use third-party APM tools.",
      },
      {
        question: "Design a Lambda-based CI/CD pipeline",
        solution:
          "Use CodePipeline with Lambda stages, implement automated testing, use SAM or CDK for infrastructure, implement blue-green deployments, and use CodeDeploy for canary releases.",
      },
      {
        question: "Explain Lambda governance at scale",
        solution:
          "Use AWS Control Tower, implement tagging strategies, use AWS Config for compliance, implement approval workflows, and use Service Catalog for standardized deployments.",
      },
      {
        question:
          "Design a Lambda-based event-driven microservices architecture",
        solution:
          "Use EventBridge for event routing, Lambda for business logic, DynamoDB for state, API Gateway for APIs, and implement saga patterns with Step Functions.",
      },
      {
        question: "Explain Lambda multi-region failover",
        solution:
          "Use Route 53 health checks, implement active-active deployment, use DynamoDB global tables, implement cross-region replication, and use CloudWatch for monitoring.",
      },
      {
        question: "Design a Lambda-based real-time analytics system",
        solution:
          "Use Kinesis Data Streams for ingestion, Lambda for processing, DynamoDB for state, CloudWatch for monitoring, and implement auto-scaling based on stream metrics.",
      },
      {
        question: "Explain Lambda and Step Functions integration patterns",
        solution:
          "Use Step Functions for complex workflows, implement error handling with retries, use Map state for parallel processing, and leverage Callback patterns for long-running tasks.",
      },
      {
        question: "How do you implement Lambda disaster recovery?",
        solution:
          "Use multi-region deployment, implement backup and restore strategies, use Route 53 for failover, implement health checks, and use AWS Backup for disaster recovery.",
      },
      {
        question: "Design a Lambda-based CI/CD pipeline",
        solution:
          "Use CodePipeline with Lambda stages, implement automated testing, use SAM or CDK for infrastructure, implement blue-green deployments, and use CodeDeploy for canary releases.",
      },
      {
        question: "Explain Lambda and GraphQL integration",
        solution:
          "Use AWS AppSync with Lambda resolvers, implement caching with ElastiCache, use DynamoDB for data storage, and implement real-time subscriptions.",
      },
    ],
  },
  {
    id: 15,
    topic: "AWS S3",
    categories: "Junior",
    tags: [
      { name: "basics", link: "" },
      { name: "buckets", link: "" },
      { name: "objects", link: "" },
    ],
    prepareLink: "",
    externallinks: [],
    questions: [
      {
        question: "What is Amazon S3?",
        solution:
          "Amazon Simple Storage Service (S3) is an object storage service that offers industry-leading scalability, data availability, security, and performance. It allows you to store and retrieve any amount of data from anywhere on the web.",
      },
      {
        question: "How does S3 ensure 11 9's durability?",
        solution:
          "S3 automatically stores data redundantly across multiple facilities and devices within each AWS Region, using erasure coding and regular integrity checks to detect and repair any lost redundancy.",
      },
      {
        question: "What is an S3 bucket?",
        solution:
          "An S3 bucket is a container for objects stored in Amazon S3. Each bucket has a globally unique name and is created in a specific AWS Region.",
      },
      {
        question: "What is the maximum object size in S3?",
        solution:
          "Individual objects can range from 0 bytes to 5 terabytes. For objects larger than 5 GB, use multipart upload.",
      },
      {
        question: "What are the basic S3 storage classes?",
        solution:
          "S3 Standard, S3 Intelligent-Tiering, S3 Standard-IA (Infrequent Access), S3 One Zone-IA, S3 Glacier Instant Retrieval, S3 Glacier Flexible Retrieval, and S3 Glacier Deep Archive.",
      },
      {
        question: "How do you create an S3 bucket?",
        solution:
          "Use AWS Console, CLI (aws s3 mb s3://bucket-name), SDKs, or CloudFormation. Specify unique bucket name, region, and optional settings like versioning and encryption.",
      },
      {
        question: "What is S3 versioning?",
        solution:
          "Versioning keeps multiple versions of an object in the same bucket, protecting against accidental deletions and overwrites. Once enabled, cannot be disabled, only suspended.",
      },
      {
        question: "How do you upload an object to S3?",
        solution:
          "Use AWS Console upload, CLI (aws s3 cp file.txt s3://bucket-name/), SDKs, or APIs. Objects are automatically replicated for durability.",
      },
      {
        question: "What is S3 Access Control List (ACL)?",
        solution:
          "ACLs are legacy access control mechanisms that define grants for individual objects or buckets. They specify permissions like READ, WRITE, READ_ACP, WRITE_ACP, and FULL_CONTROL.",
      },
      {
        question: "What is S3 bucket policy?",
        solution:
          "A JSON-based access policy document attached to a bucket that defines permissions for the bucket and its objects. More flexible than ACLs for complex access patterns.",
      },
      {
        question: "How do you enable encryption on an S3 bucket?",
        solution:
          "Enable default encryption in bucket settings with SSE-S3, SSE-KMS, or SSE-C. Objects are automatically encrypted when uploaded.",
      },
      {
        question: "What is S3 Transfer Acceleration?",
        solution:
          "Uses CloudFront edge locations to accelerate uploads and downloads by routing traffic through AWS's backbone network instead of the public internet.",
      },
      {
        question: "How do you list objects in an S3 bucket?",
        solution:
          "Use AWS Console, CLI (aws s3 ls s3://bucket-name/), SDKs, or APIs. Supports prefix filtering and pagination for large numbers of objects.",
      },
      {
        question: "What is S3 lifecycle policy?",
        solution:
          "Automates the transition of objects between storage classes or their deletion based on age. Helps optimize costs by moving infrequently accessed data to cheaper storage classes.",
      },
      {
        question: "How do you download an object from S3?",
        solution:
          "Use AWS Console download, CLI (aws s3 cp s3://bucket-name/file.txt ./), SDKs, or pre-signed URLs for temporary access.",
      },
      {
        question: "What is S3 pre-signed URL?",
        solution:
          "A URL with embedded authentication information that grants temporary access to S3 objects without requiring AWS credentials. Valid for specified duration.",
      },
      {
        question: "How do you delete an object from S3?",
        solution:
          "Use AWS Console, CLI (aws s3 rm s3://bucket-name/object-key), SDKs, or APIs. With versioning enabled, creates a delete marker; use DELETE with version ID to permanently delete.",
      },
      {
        question: "What is S3 static website hosting?",
        solution:
          "Feature that allows hosting static websites directly from an S3 bucket with custom index and error documents, and optional custom domain with Route 53.",
      },
      {
        question: "How do you enable S3 static website hosting?",
        solution:
          "In bucket properties, enable static website hosting, specify index and error documents, configure bucket policy for public read access, and optionally set up custom domain with Route 53.",
      },
      {
        question: "What is S3 CORS configuration?",
        solution:
          "Cross-Origin Resource Sharing configuration that allows web browsers to access S3 resources from different origins. Defined using XML configuration in bucket settings.",
      },
      {
        question: "How do you configure S3 CORS?",
        solution:
          "Add CORS configuration in bucket permissions with allowed origins, methods, headers, and max-age. Example allows GET requests from specific domains.",
      },
      {
        question: "What is S3 object tagging?",
        solution:
          "Key-value pairs associated with S3 objects for categorization and access control. Up to 10 tags per object, useful for lifecycle policies and cost allocation.",
      },
      {
        question: "How do you tag S3 objects?",
        solution:
          "Use AWS Console, CLI (aws s3api put-object-tagging), SDKs, or during upload. Tags can be used in IAM policies and lifecycle rules.",
      },
      {
        question: "What is S3 event notifications?",
        solution:
          "Feature that sends notifications when objects are created, deleted, or restored. Integrates with SNS, SQS, Lambda, and EventBridge for automated workflows.",
      },
      {
        question: "How do you set up S3 event notifications?",
        solution:
          "Configure in bucket properties with event types (PUT, POST, DELETE, etc.), prefix/suffix filters, and destination (SNS topic, SQS queue, or Lambda function).",
      },
      {
        question: "What is S3 inventory?",
        solution:
          "Feature that creates daily or weekly CSV/ORC reports listing objects and their metadata for auditing, compliance, or analytics purposes.",
      },
      {
        question: "How do you enable S3 inventory?",
        solution:
          "Configure in bucket management with destination bucket, report format (CSV/ORC), frequency, optional fields, and encryption settings.",
      },
      {
        question: "What is S3 access logging?",
        solution:
          "Feature that records detailed access logs for S3 buckets, useful for security analysis, compliance auditing, and troubleshooting.",
      },
      {
        question: "How do you enable S3 access logging?",
        solution:
          "Configure in bucket properties with target bucket and prefix for log files. Ensure target bucket has appropriate permissions for S3 to write logs.",
      },
      {
        question: "What is S3 Glacier?",
        solution:
          "Low-cost storage class for long-term archival with retrieval times from minutes to hours. Includes Glacier Instant Retrieval, Flexible Retrieval, and Deep Archive options.",
      },
      {
        question: "How do you transition objects to Glacier?",
        solution:
          "Use lifecycle policies to automatically transition objects based on age, or manually change storage class via console, CLI, or SDKs.",
      },
      {
        question: "What is S3 Intelligent-Tiering?",
        solution:
          "Storage class that automatically moves objects between access tiers based on usage patterns. Monitors access patterns and moves infrequently accessed objects to lower-cost tiers.",
      },
    ],
  },
  {
    id: 16,
    topic: "AWS S3",
    categories: "Mid",
    tags: [
      { name: "performance", link: "" },
      { name: "optimization", link: "" },
      { name: "security", link: "" },
      { name: "replication", link: "" },
      { name: "lifecycle", link: "" },
    ],
    prepareLink: "",
    externallinks: [],
    questions: [
      {
        question:
          "How do you optimize S3 performance for high-traffic applications?",
        solution:
          "Use CloudFront CDN, implement multipart upload for large objects, enable Transfer Acceleration, use S3 Transfer Manager, implement parallel requests, and optimize object naming with prefixes.",
      },
      {
        question: "Explain S3 Cross-Region Replication (CRR)",
        solution:
          "CRR automatically replicates objects across AWS Regions for compliance, disaster recovery, or reduced latency. Requires versioning enabled on both buckets and appropriate IAM permissions.",
      },
      {
        question: "How do you implement S3 lifecycle policies?",
        solution:
          "Create lifecycle rules to transition objects to cheaper storage classes or delete them based on age. Rules can apply to entire bucket or specific prefixes/tags. Example: transition to Glacier after 30 days.",
      },
      {
        question: "What are S3 encryption options?",
        solution:
          "Server-side encryption with SSE-S3 (AWS managed), SSE-KMS (customer managed keys), SSE-C (customer provided keys), and client-side encryption. Also supports bucket-level default encryption.",
      },
      {
        question: "How do you implement S3 bucket policies?",
        solution:
          "Create JSON policy documents attached to buckets for fine-grained access control. Can restrict by IP, VPC, specific actions, or conditions. More flexible than ACLs for complex access patterns.",
      },
      {
        question: "Explain S3 Transfer Acceleration vs CloudFront",
        solution:
          "Transfer Acceleration uses CloudFront edge locations for uploads/downloads. CloudFront provides full CDN capabilities including caching, edge computing, and global distribution. Use CloudFront for frequently accessed content.",
      },
      {
        question: "How do you handle S3 versioning and lifecycle together?",
        solution:
          "Lifecycle policies can apply to current and previous versions. Use lifecycle to delete old versions after specified time, helping manage storage costs while maintaining version history.",
      },
      {
        question: "What is S3 Object Lock?",
        solution:
          "Feature that prevents objects from being deleted or overwritten for a fixed retention period or indefinitely. Useful for compliance and legal hold requirements. Supports governance or compliance modes.",
      },
      {
        question: "How do you implement S3 access logging?",
        solution:
          "Configure access logging to capture detailed records of all requests to your S3 bucket. Logs are stored in a separate bucket and can be analyzed for security, compliance, or troubleshooting.",
      },
      {
        question: "Explain S3 inventory and its use cases",
        solution:
          "S3 inventory provides daily or weekly reports of objects and metadata. Use cases include auditing, compliance, analytics, and verifying replication. Supports CSV, ORC, or Parquet formats.",
      },
      {
        question: "How do you implement S3 event notifications?",
        solution:
          "Configure notifications for object creation, deletion, or restoration events. Can trigger Lambda, SNS, SQS, or EventBridge. Useful for automated workflows and real-time processing.",
      },
      {
        question: "What is S3 Access Points?",
        solution:
          "Dedicated access points for S3 buckets with unique hostnames and policies, providing simplified access for specific applications or teams. Each access point has its own policy and configuration.",
      },
      {
        question: "How do you handle S3 multi-part upload failures?",
        solution:
          "Implement retry logic, use AWS SDK's built-in retry mechanisms, monitor upload progress, use S3's multipart upload API with abort functionality, and implement cleanup for failed uploads.",
      },
      {
        question: "Explain S3 Object Lambda",
        solution:
          "Feature that allows you to add your own code to process data as it's retrieved from S3. Useful for transforming data on-the-fly without storing multiple versions.",
      },
      {
        question: "How do you implement S3 cost optimization?",
        solution:
          "Use appropriate storage classes, implement lifecycle policies, delete unused objects, use S3 Intelligent-Tiering, enable S3 analytics, and regularly review access patterns.",
      },
      {
        question: "What is S3 Batch Operations?",
        solution:
          "Service for performing large-scale batch operations on S3 objects (copy, invoke Lambda, restore, etc.) using manifest files. Useful for migrations, transformations, or bulk operations.",
      },
      {
        question: "How do you implement S3 cross-account access?",
        solution:
          "Use bucket policies with cross-account permissions, IAM roles with assume-role policies, S3 Access Points, or AWS Resource Access Manager for shared access.",
      },
      {
        question: "Explain S3 Select and Glacier Select",
        solution:
          "Features that allow you to retrieve only a subset of data from objects using SQL-like expressions, reducing data transfer costs and improving performance for large objects.",
      },
      {
        question: "How do you handle S3 eventual consistency?",
        solution:
          "Design applications to handle read-after-write consistency, use read-after-write consistency for new objects, implement retry logic, and use S3 strong consistency features.",
      },
      {
        question: "What is S3 Storage Lens?",
        solution:
          "Cloud-native analytics solution providing organization-wide visibility into S3 storage usage, activity trends, and recommendations for cost optimization and data protection.",
      },
      {
        question: "How do you implement S3 data classification?",
        solution:
          "Use S3 Inventory with AWS Macie for automated discovery and classification of sensitive data, implement tagging strategies, and use AWS Config rules for compliance.",
      },
      {
        question: "Explain S3 replication and its types",
        solution:
          "Cross-region replication (CRR) and same-region replication (SRR). Both replicate objects automatically while maintaining metadata. CRR provides disaster recovery; SRR provides data residency compliance.",
      },
      {
        question: "How do you handle S3 large file uploads?",
        solution:
          "Use multipart upload for files >100MB, implement retry logic, use AWS SDK's high-level upload methods, monitor progress, and implement resume capability for interrupted uploads.",
      },
      {
        question: "What is S3 Object Ownership?",
        solution:
          "Controls ownership of objects and ACL behavior. BucketOwnerEnforced disables ACLs and ensures bucket owner owns all objects. Useful for maintaining consistent access control.",
      },
      {
        question: "How do you implement S3 access logging?",
        solution:
          "Configure access logging to capture detailed records of all requests to your S3 bucket. Logs are stored in a separate bucket and can be analyzed for security, compliance, or troubleshooting.",
      },
    ],
  },
  {
    id: 17,
    topic: "AWS S3",
    categories: "Senior",
    tags: [
      { name: "architecture", link: "" },
      { name: "governance", link: "" },
      { name: "compliance", link: "" },
      { name: "multi-region", link: "" },
      { name: "advanced-patterns", link: "" },
    ],
    prepareLink: "",
    externallinks: [],
    questions: [
      {
        question: "Design a petabyte-scale data lake on S3",
        solution:
          "Use S3 bucket with appropriate partitions, implement lifecycle policies for cost optimization, use Athena for querying, implement fine-grained access control with IAM and bucket policies, use S3 Access Points for multi-tenant access, and implement data governance with AWS Lake Formation.",
      },
      {
        question: "How do you implement S3 governance at enterprise scale?",
        solution:
          "Use AWS Control Tower, implement SCPs for organizational policies, use AWS Config for compliance monitoring, implement tagging strategies, use AWS Organizations for multi-account management, and implement data classification with Macie.",
      },
      {
        question: "Explain S3 multi-region architecture patterns",
        solution:
          "Implement CRR for disaster recovery, use S3 Transfer Acceleration for global access, implement latency-based routing with Route 53, use CloudFront for edge caching, and implement failover strategies with health checks.",
      },
      {
        question: "How do you implement S3 compliance frameworks?",
        solution:
          "Use S3 Object Lock for WORM requirements, implement S3 versioning with MFA delete, use AWS Config rules for compliance, implement access logging, and use AWS CloudTrail for audit trails.",
      },
      {
        question:
          "Design S3 access patterns for multi-tenant SaaS applications",
        solution:
          "Use S3 Access Points per tenant, implement IAM roles with session policies, use S3 Object Ownership for consistent access, implement requester pays for cost allocation, and use CloudFront for performance.",
      },
      {
        question: "Explain S3 cost optimization strategies at enterprise scale",
        solution:
          "Implement S3 Storage Class Analysis, use S3 Intelligent-Tiering, implement lifecycle policies, use S3 Inventory for usage analysis, implement requester pays, and use AWS Cost Explorer for monitoring.",
      },
      {
        question: "How do you implement S3 data lifecycle management at scale?",
        solution:
          "Use S3 Lifecycle policies with prefix/tag filters, implement S3 Batch Operations for bulk changes, use S3 Storage Lens for insights, implement automated workflows with Lambda, and use AWS DataSync for migrations.",
      },
      {
        question: "Design S3 security architecture for compliance workloads",
        solution:
          "Implement bucket policies with IP restrictions, use VPC endpoints for private access, enable S3 Object Lock, implement encryption at rest and in transit, use AWS KMS with customer managed keys, and implement access logging.",
      },
      {
        question:
          "Explain S3 performance optimization for high-throughput applications",
        solution:
          "Use CloudFront for caching, implement multipart upload for large objects, use parallel requests, optimize object naming with prefixes, use S3 Transfer Acceleration, and implement connection pooling.",
      },
      {
        question: "How do you implement S3 cross-account governance?",
        solution:
          "Use AWS Organizations with SCPs, implement resource policies with cross-account permissions, use AWS Resource Access Manager, implement centralized logging, and use AWS Config for compliance monitoring.",
      },
      {
        question: "Design S3 backup and disaster recovery strategy",
        solution:
          "Implement cross-region replication, use AWS Backup for centralized management, implement lifecycle policies for backup retention, use S3 Object Lock for compliance, and implement automated testing of recovery procedures.",
      },
      {
        question: "Explain S3 data classification and governance",
        solution:
          "Use AWS Macie for automated discovery, implement tagging strategies, use AWS Config rules for compliance, implement data retention policies, and use AWS CloudTrail for audit trails.",
      },
      {
        question: "How do you implement S3 data residency compliance?",
        solution:
          "Use S3 buckets in specific regions, implement Object Lock with compliance mode, use AWS Config rules for region compliance, implement access controls, and use S3 replication for multi-region compliance.",
      },
      {
        question: "Design S3 access patterns for global applications",
        solution:
          "Use CloudFront with S3 origin, implement latency-based routing, use S3 Transfer Acceleration, implement regional buckets with replication, and use Route 53 for DNS failover.",
      },
      {
        question: "Explain S3 cost allocation strategies",
        solution:
          "Use detailed billing reports, implement resource tagging, use cost allocation tags, implement requester pays for shared buckets, use S3 Storage Lens for insights, and implement chargeback models.",
      },
      {
        question: "How do you implement S3 data lineage tracking?",
        solution:
          "Use S3 Object Lambda for metadata enrichment, implement custom tagging strategies, use AWS Glue for data cataloging, implement CloudTrail logging, and use AWS Config for tracking changes.",
      },
      {
        question: "Design S3 architecture for regulatory compliance",
        solution:
          "Implement Object Lock with governance/compliance modes, use encryption with customer managed keys, implement access logging, use AWS Config for compliance monitoring, and implement data retention policies.",
      },
      {
        question: "Explain S3 integration with AWS Lake Formation",
        solution:
          "Register S3 buckets as data lakes, implement fine-grained access control, use AWS Glue for data cataloging, implement data sharing across accounts, and use Athena for querying.",
      },
      {
        question: "How do you implement S3 data quality checks?",
        solution:
          "Use AWS Glue for data cataloging, implement AWS Glue workflows for ETL, use AWS Config rules for validation, implement custom Lambda functions, and use S3 Object Lambda for on-the-fly validation.",
      },
      {
        question: "Design S3 multi-cloud strategy",
        solution:
          "Use AWS DataSync for data movement, implement hybrid cloud storage, use S3 Storage Gateway for on-premises integration, implement data replication strategies, and use AWS Transfer Family.",
      },
      {
        question: "Explain S3 integration with AI/ML workflows",
        solution:
          "Use S3 as data lake for training data, implement S3 Object Lambda for preprocessing, use SageMaker integration, implement data versioning, and use S3 Batch Operations for ML workflows.",
      },
      {
        question: "How do you implement S3 data retention policies?",
        solution:
          "Use Object Lock with retention periods, implement lifecycle policies for automated deletion, use AWS Config rules for compliance, implement legal hold mechanisms, and use S3 Batch Operations.",
      },
      {
        question: "Design S3 architecture for high-availability applications",
        solution:
          "Use cross-region replication, implement health checks with Route 53, use CloudFront for global distribution, implement failover strategies, and use S3 Transfer Acceleration.",
      },
      {
        question: "Explain S3 integration with AWS Control Tower",
        solution:
          "Use AWS Control Tower for multi-account governance, implement guardrails for S3 compliance, use AWS Config for monitoring, implement centralized logging, and use Service Catalog for standardized deployments.",
      },
      {
        question: "How do you implement S3 data anonymization?",
        solution:
          "Use S3 Object Lambda for on-the-fly anonymization, implement PII detection with AWS Comprehend, use AWS Glue for ETL anonymization, implement data masking strategies, and use encryption at rest.",
      },
      {
        question: "Design S3 architecture for IoT data ingestion",
        solution:
          "Use AWS IoT Core for ingestion, implement S3 lifecycle policies for cost optimization, use Athena for analytics, implement data partitioning strategies, and use AWS IoT Analytics for processing.",
      },
    ],
  },
  {
    id: 18,
    topic: "AWS RDS",
    categories: "Junior",
    tags: [
      { name: "basics", link: "" },
      { name: "db-engines", link: "" },
      { name: "creation", link: "" },
    ],
    prepareLink: "",
    externallinks: [],
    questions: [
      {
        question: "What is Amazon RDS?",
        solution:
          "Amazon Relational Database Service (RDS) is a managed database service that makes it easy to set up, operate, and scale relational databases in the cloud. It supports multiple database engines including MySQL, PostgreSQL, Oracle, SQL Server, and Aurora.",
      },
      {
        question: "What database engines does RDS support?",
        solution:
          "RDS supports MySQL, PostgreSQL, MariaDB, Oracle, Microsoft SQL Server, and Amazon Aurora (MySQL-compatible and PostgreSQL-compatible).",
      },
      {
        question: "How do you create an RDS instance?",
        solution:
          "Use AWS Console, CLI (aws rds create-db-instance), or CloudFormation. Specify engine, instance class, storage, VPC, subnet group, security group, master credentials, and optional parameters.",
      },
      {
        question: "What is an RDS DB instance class?",
        solution:
          "Instance classes define compute, memory, and network capacity. Examples: db.t3.micro, db.m5.large, db.r5.xlarge. Choose based on workload requirements and budget.",
      },
      {
        question: "How do you connect to an RDS instance?",
        solution:
          "Use standard database clients with the RDS endpoint, port, and credentials. Ensure security group allows inbound traffic from your IP or VPC. Use SSL/TLS for encrypted connections.",
      },
      {
        question: "What is RDS storage?",
        solution:
          "RDS provides three storage types: General Purpose SSD (gp2/gp3), Provisioned IOPS SSD (io1/io2), and Magnetic (standard). Storage is automatically backed up and can scale up to 64 TB.",
      },
      {
        question: "What is RDS backup?",
        solution:
          "Automated backups create daily snapshots and store transaction logs for point-in-time recovery. Retention period ranges from 1 to 35 days. Manual snapshots are user-initiated and persist until deleted.",
      },
      {
        question: "How do you restore an RDS instance?",
        solution:
          "Use point-in-time recovery from automated backups, restore from manual snapshots, or create read replicas from snapshots. Specify target time or snapshot ID for restoration.",
      },
      {
        question: "What is RDS Multi-AZ?",
        solution:
          "Multi-AZ deployment creates a synchronous standby replica in a different Availability Zone for high availability and automatic failover during planned or unplanned outages.",
      },
      {
        question: "What is RDS Read Replica?",
        solution:
          "Read replicas are asynchronous copies of the primary database used for read scaling. They can be in the same or different regions and can be promoted to become standalone databases.",
      },
      {
        question: "How do you secure RDS instances?",
        solution:
          "Use VPC isolation, security groups, IAM authentication, SSL/TLS encryption, encryption at rest with AWS KMS, and parameter groups to configure security settings.",
      },
      {
        question: "What is RDS parameter group?",
        solution:
          "A collection of engine configuration parameters that can be applied to one or more RDS instances. Used to customize database behavior without modifying the underlying engine.",
      },
      {
        question: "How do you modify RDS instance class?",
        solution:
          "Use console, CLI (aws rds modify-db-instance), or API. Changes can be applied immediately or during maintenance window. Storage scaling is typically online without downtime.",
      },
      {
        question: "What is RDS subnet group?",
        solution:
          "A collection of subnets in a VPC that you designate for your RDS instances. Must span at least two Availability Zones in a region for Multi-AZ deployments.",
      },
      {
        question: "How do you enable RDS encryption?",
        solution:
          "Enable encryption at rest during instance creation using AWS KMS keys. Existing unencrypted instances can be encrypted by creating snapshot and restoring as encrypted instance.",
      },
      {
        question: "What is RDS maintenance window?",
        solution:
          "The weekly time period during which system maintenance occurs. Default is 30 minutes but can be customized. Critical security patches may occur outside this window.",
      },
      {
        question: "How do you monitor RDS instances?",
        solution:
          "Use CloudWatch metrics (CPU, memory, storage), Enhanced Monitoring, Performance Insights, RDS events, and database-specific monitoring tools for comprehensive visibility.",
      },
      {
        question: "What is RDS Enhanced Monitoring?",
        solution:
          "Feature that provides real-time metrics for RDS instances at the OS level, including CPU, memory, file system, and disk I/O metrics with 1-second granularity.",
      },
      {
        question: "How do you create RDS read replicas?",
        solution:
          "Use console, CLI (aws rds create-db-instance-read-replica), or API. Specify source instance, replica instance class, storage, and region for cross-region replicas.",
      },
      {
        question: "What is RDS Performance Insights?",
        solution:
          "Database performance monitoring feature that helps analyze and troubleshoot performance issues by providing detailed query-level metrics and visualizations.",
      },
      {
        question: "How do you handle RDS failover?",
        solution:
          "Multi-AZ deployments provide automatic failover. For read replicas, promote to standalone instances. Test failover regularly and ensure applications can handle connection changes.",
      },
      {
        question: "What is RDS automatic minor version upgrades?",
        solution:
          "Feature that automatically applies minor version patches during maintenance windows. Can be enabled/disabled per instance and helps maintain security and stability.",
      },
      {
        question: "How do you configure RDS security groups?",
        solution:
          "Create VPC security groups that control inbound/outbound traffic to RDS instances. Must allow traffic from application subnets on appropriate database ports.",
      },
      {
        question: "What is RDS storage autoscaling?",
        solution:
          "Feature that automatically increases storage capacity when free space falls below a threshold. Helps prevent storage-full issues while maintaining performance.",
      },
      {
        question: "How do you migrate data to RDS?",
        solution:
          "Use AWS Database Migration Service (DMS), native database tools, AWS Schema Conversion Tool for heterogeneous migrations, or create instances from snapshots.",
      },
      {
        question: "What is RDS event subscription?",
        solution:
          "Feature that sends notifications for RDS events like instance creation, backup completion, or failover to SNS topics, email, or Lambda functions.",
      },
      {
        question: "How do you handle RDS backup retention?",
        solution:
          "Configure automated backup retention period (1-35 days) during instance creation. Adjust via modify-db-instance. Longer retention increases backup storage costs.",
      },
      {
        question: "What is RDS SSL/TLS encryption?",
        solution:
          "Encryption for data in transit using SSL/TLS certificates. RDS provides certificates for secure client connections. Can enforce SSL-only connections via parameter groups.",
      },
      {
        question: "How do you create RDS snapshots?",
        solution:
          "Use console, CLI (aws rds create-db-snapshot), or API. Specify snapshot name and source instance. Snapshots are point-in-time backups that persist until manually deleted.",
      },
      {
        question: "What is RDS parameter tuning?",
        solution:
          "Customizing database parameters via parameter groups to optimize performance for specific workloads. Includes memory allocation, connection limits, and query optimization settings.",
      },
      {
        question: "How do you handle RDS connection limits?",
        solution:
          "Monitor CloudWatch metrics for connections, scale instance class if needed, use connection pooling, implement application-level connection management, and optimize queries.",
      },
      {
        question: "What is RDS database engine version management?",
        solution:
          "AWS manages major version updates, customers control minor version updates. Plan upgrades during maintenance windows, test in staging environments, and monitor for compatibility issues.",
      },
      {
        question: "How do you implement RDS tagging strategy?",
        solution:
          "Use consistent tagging for cost allocation, automation, and governance. Common tags include environment, application, owner, cost center, and compliance requirements.",
      },
      {
        question: "What is RDS monitoring and alerting?",
        solution:
          "Use CloudWatch metrics, Enhanced Monitoring, Performance Insights, and RDS events. Set up CloudWatch alarms for critical metrics like CPU, storage, and connection count.",
      },
    ],
  },
  {
    id: 19,
    topic: "AWS RDS",
    categories: "Senior",
    tags: [
      { name: "architecture", link: "" },
      { name: "scaling", link: "" },
      { name: "disaster-recovery", link: "" },
      { name: "performance", link: "" },
      { name: "advanced-patterns", link: "" },
    ],
    prepareLink: "",
    externallinks: [],
    questions: [
      {
        question:
          "Design a multi-region RDS architecture for global applications",
        solution:
          "Use Aurora Global Database for cross-region replication with <1 second lag, implement read replicas in multiple regions, use Route 53 for routing, implement failover procedures, and use AWS DMS for data synchronization.",
      },
      {
        question: "How do you implement RDS performance tuning at scale?",
        solution:
          "Use Performance Insights for query analysis, implement parameter tuning based on workload, use Enhanced Monitoring for OS-level metrics, implement connection pooling, use read replicas for scaling, and implement caching strategies.",
      },
      {
        question: "Explain RDS Aurora architecture and benefits",
        solution:
          "Aurora uses distributed storage with 6-way replication across 3 AZs, provides automatic failover, supports up to 15 read replicas, offers serverless option, and provides global database capabilities with cross-region replication.",
      },
      {
        question: "How do you implement RDS disaster recovery strategy?",
        solution:
          "Use automated backups with cross-region replication, implement read replicas for failover, use Aurora Global Database, implement point-in-time recovery testing, and use AWS Backup for centralized management.",
      },
      {
        question: "Design RDS scaling strategy for high-traffic applications",
        solution:
          "Use Aurora Serverless for automatic scaling, implement read replicas for read scaling, use Aurora Parallel Query for analytics, implement connection pooling, and use caching layers like ElastiCache.",
      },
      {
        question: "Explain RDS Aurora Serverless v2 architecture",
        solution:
          "Provides automatic scaling based on application demand, scales to hundreds of thousands of transactions per second, supports both Aurora MySQL and PostgreSQL, and maintains ACID properties during scaling.",
      },
      {
        question: "How do you implement RDS data migration at scale?",
        solution:
          "Use AWS Database Migration Service (DMS) for heterogeneous migrations, implement AWS Schema Conversion Tool, use AWS DataSync for file-based data, implement blue-green deployments, and use AWS Database Query Accelerator.",
      },
      {
        question: "Design RDS security architecture for compliance workloads",
        solution:
          "Implement encryption at rest and in transit, use IAM database authentication, implement VPC isolation, use AWS Secrets Manager for credentials, implement audit logging, and use AWS Config for compliance monitoring.",
      },
      {
        question: "Explain RDS Aurora Global Database",
        solution:
          "Provides cross-region replication with <1 second lag for disaster recovery and read scaling. Supports up to 5 secondary regions, provides automatic failover, and maintains consistency across regions.",
      },
      {
        question:
          "How do you implement RDS cost optimization at enterprise scale?",
        solution:
          "Use Aurora Serverless for variable workloads, implement Reserved Instances for predictable workloads, use Aurora Parallel Query for analytics, implement automated stop/start for dev/test environments, and use AWS Cost Explorer.",
      },
      {
        question: "Design RDS backup and recovery strategy",
        solution:
          "Implement automated backups with 35-day retention, use manual snapshots for long-term retention, implement cross-region backup replication, test recovery procedures regularly, and use AWS Backup for centralized management.",
      },
      {
        question: "Explain RDS integration with AWS services",
        solution:
          "Integrate with Lambda for serverless applications, use Amazon SageMaker for ML workloads, implement AWS Glue for ETL, use Amazon QuickSight for analytics, and implement AWS CloudFormation for infrastructure as code.",
      },
      {
        question: "How do you implement RDS performance monitoring at scale?",
        solution:
          "Use Performance Insights for detailed query analysis, implement Enhanced Monitoring for OS-level metrics, use Amazon CloudWatch for custom metrics, implement alerting with SNS, and use AWS X-Ray for distributed tracing.",
      },
      {
        question: "Design RDS high-availability architecture",
        solution:
          "Use Multi-AZ deployments for automatic failover, implement read replicas for read scaling, use Aurora for higher availability, implement health checks, and use Route 53 for DNS failover.",
      },
      {
        question: "Explain RDS Aurora Parallel Query",
        solution:
          "Feature that pushes analytical queries down to the Aurora storage layer, providing significant performance improvements for large-scale analytical workloads without impacting transactional performance.",
      },
      {
        question: "How do you implement RDS data governance?",
        solution:
          "Use AWS Lake Formation for centralized governance, implement tagging strategies, use AWS Config for compliance monitoring, implement data lineage tracking, and use AWS CloudTrail for audit trails.",
      },
      {
        question: "Design RDS architecture for microservices",
        solution:
          "Use Aurora Serverless for variable workloads, implement database per service pattern, use RDS Proxy for connection pooling, implement event sourcing with DynamoDB, and use AWS App Mesh for service mesh.",
      },
      {
        question: "Explain RDS cross-account access patterns",
        solution:
          "Use IAM roles with cross-account policies, implement VPC peering for private access, use AWS Resource Access Manager, implement centralized logging, and use AWS Organizations for governance.",
      },
      {
        question: "How do you implement RDS encryption key management?",
        solution:
          "Use AWS KMS for encryption keys, implement key rotation policies, use customer managed keys for compliance, implement key policies for access control, and use AWS CloudHSM for hardware security modules.",
      },
      {
        question: "Design RDS disaster recovery plan",
        solution:
          "Implement automated backups with cross-region replication, use read replicas for failover, implement point-in-time recovery testing, use Aurora Global Database, and implement runbook automation.",
      },
      {
        question: "Explain RDS integration with DevOps pipelines",
        solution:
          "Use AWS CodePipeline for CI/CD, implement infrastructure as code with CloudFormation or CDK, use AWS Systems Manager for automation, implement blue-green deployments, and use AWS Secrets Manager for credential management.",
      },
      {
        question: "How do you implement RDS compliance frameworks?",
        solution:
          "Use AWS Config rules for compliance monitoring, implement encryption at rest and in transit, use AWS CloudTrail for audit trails, implement access logging, and use AWS Security Hub for centralized security.",
      },
      {
        question: "Design RDS scaling strategy for global applications",
        solution:
          "Use Aurora Global Database for cross-region replication, implement read replicas in multiple regions, use RDS Proxy for connection pooling, implement caching strategies, and use AWS Global Accelerator.",
      },
      {
        question: "Explain RDS performance tuning at enterprise scale",
        solution:
          "Use Performance Insights for query analysis, implement parameter tuning based on workload, use Enhanced Monitoring for OS-level metrics, implement connection pooling, and use read replicas for scaling.",
      },
      {
        question: "How do you implement RDS data lifecycle management?",
        solution:
          "Use automated backups with lifecycle policies, implement data archival with S3, use AWS Glue for ETL processes, implement data retention policies, and use AWS Data Pipeline for orchestration.",
      },
      {
        question: "Design RDS architecture for big data workloads",
        solution:
          "Use Aurora Parallel Query for analytics, implement Redshift integration, use AWS Glue for ETL, implement EMR integration, and use Amazon QuickSight for visualization.",
      },
      {
        question: "Explain RDS integration with AWS Control Tower",
        solution:
          "Use AWS Control Tower for multi-account governance, implement guardrails for RDS compliance, use AWS Config for monitoring, implement centralized logging, and use Service Catalog for standardized deployments.",
      },
      {
        question: "How do you implement RDS observability at scale?",
        solution:
          "Use CloudWatch Logs Insights, implement distributed tracing with AWS X-Ray, use custom metrics, implement alerting with SNS, and use third-party APM tools for comprehensive monitoring.",
      },
    ],
  },
  {
    id: 20,
    topic: "AWS SQS",
    categories: "Junior",
    tags: [
      { name: "basics", link: "" },
      { name: "queues", link: "" },
      { name: "messages", link: "" },
    ],
    prepareLink: "",
    externallinks: [],
    questions: [
      {
        question: "What is Amazon SQS?",
        solution:
          "Amazon Simple Queue Service (SQS) is a fully managed message queuing service that enables you to decouple and scale microservices, distributed systems, and serverless applications.",
      },
      {
        question: "What are the two types of SQS queues?",
        solution:
          "Standard queues (at-least-once delivery, best-effort ordering) and FIFO queues (exactly-once processing, first-in-first-out ordering).",
      },
      {
        question: "How do you create an SQS queue?",
        solution:
          "Use AWS Console, CLI (aws sqs create-queue --queue-name my-queue), SDKs, or CloudFormation. Specify queue name, type (Standard/FIFO), and optional attributes like visibility timeout.",
      },
      {
        question: "What is the maximum message size in SQS?",
        solution:
          "256 KB for standard and FIFO queues. For larger payloads, store the message in S3 and send a reference to the S3 object.",
      },
      {
        question: "How do you send a message to SQS?",
        solution:
          "Use SendMessage API, CLI (aws sqs send-message --queue-url <url> --message-body 'Hello'), or SDKs. Messages can include attributes and are base64-encoded.",
      },
      {
        question: "How do you receive messages from SQS?",
        solution:
          "Use ReceiveMessage API with parameters like MaxNumberOfMessages and VisibilityTimeout. Messages are returned with ReceiptHandle for deletion.",
      },
      {
        question: "What is SQS visibility timeout?",
        solution:
          "The period during which a message is invisible to other consumers after being received. Default is 30 seconds, max is 12 hours. Prevents duplicate processing.",
      },
      {
        question: "How do you delete a message from SQS?",
        solution:
          "Use DeleteMessage API with the ReceiptHandle received from ReceiveMessage. Must be done after successful processing to remove the message from the queue.",
      },
      {
        question: "What is SQS long polling?",
        solution:
          "Long polling reduces empty responses by waiting up to 20 seconds for messages to arrive. Enabled by setting WaitTimeSeconds parameter in ReceiveMessage calls.",
      },
      {
        question: "How do you create an SQS FIFO queue?",
        solution:
          "Use create-queue with queue name ending in .fifo and set FifoQueue=true. FIFO queues support message groups and deduplication.",
      },
      {
        question: "What is SQS message deduplication?",
        solution:
          "In FIFO queues, prevents duplicate messages using deduplication ID or content-based deduplication. Standard queues don't guarantee deduplication.",
      },
      {
        question: "How do you configure SQS queue attributes?",
        solution:
          "Use SetQueueAttributes API with parameters like VisibilityTimeout, MessageRetentionPeriod, MaximumMessageSize, and ReceiveMessageWaitTimeSeconds.",
      },
      {
        question: "What is SQS dead-letter queue?",
        solution:
          "A separate queue that receives messages that couldn't be processed successfully after a specified number of attempts. Helps isolate and debug failed messages.",
      },
      {
        question: "How do you set up SQS dead-letter queue?",
        solution:
          "Create a dead-letter queue and set redrive policy on the source queue specifying the dead-letter queue ARN and maxReceiveCount.",
      },
      {
        question: "What is SQS message retention period?",
        solution:
          "The maximum time SQS retains messages, configurable from 1 minute to 14 days (default 4 days). Messages are automatically deleted after this period.",
      },
      {
        question: "How do you monitor SQS queues?",
        solution:
          "Use CloudWatch metrics like NumberOfMessagesSent, NumberOfMessagesReceived, ApproximateNumberOfMessagesVisible, and set alarms for thresholds.",
      },
      {
        question: "What is SQS message group ID?",
        solution:
          "Used in FIFO queues to group related messages. Messages in the same group are processed in order, while messages in different groups can be processed in parallel.",
      },
      {
        question: "How do you configure SQS queue access policy?",
        solution:
          "Create JSON policy document allowing specific IAM actions (sqs:SendMessage, sqs:ReceiveMessage) for principals like IAM users, roles, or AWS services.",
      },
      {
        question: "What is SQS queue URL?",
        solution:
          "Unique identifier for an SQS queue in format: https://sqs.<region>.amazonaws.com/<account-id>/<queue-name>. Used in API calls and CLI commands.",
      },
      {
        question: "How do you trigger Lambda from SQS?",
        solution:
          "Create an SQS trigger in Lambda function configuration specifying the queue ARN. Lambda automatically polls the queue and invokes the function for each message batch.",
      },
      {
        question: "What is SQS batch processing?",
        solution:
          "Ability to send/receive up to 10 messages in a single API call using SendMessageBatch and ReceiveMessage with MaxNumberOfMessages parameter.",
      },
      {
        question: "How do you handle SQS message attributes?",
        solution:
          "Include metadata with messages using message attributes. Useful for routing, filtering, and processing logic. Attributes are key-value pairs with data types.",
      },
      {
        question: "What is SQS queue encryption?",
        solution:
          "Encryption at rest using AWS managed keys (SSE-SQS) or customer managed keys (SSE-KMS). Messages are encrypted when stored and decrypted during processing.",
      },
      {
        question: "How do you enable SQS queue encryption?",
        solution:
          "Set KmsMasterKeyId attribute when creating queue or use SetQueueAttributes. Can use AWS managed keys or specify your own KMS key.",
      },
      {
        question: "What is SQS FIFO deduplication?",
        solution:
          "In FIFO queues, prevents duplicate messages using message deduplication ID or content-based deduplication. Deduplication window is 5 minutes.",
      },
      {
        question: "How do you configure SQS queue permissions?",
        solution:
          "Use queue policy document allowing specific actions for IAM users/roles, or use IAM policies attached to users/roles granting access to specific queues.",
      },
      {
        question: "What is SQS approximate number of messages?",
        solution:
          "CloudWatch metric showing approximate count of messages in queue, useful for monitoring queue depth and triggering auto-scaling policies.",
      },
      {
        question: "How do you delete an SQS queue?",
        solution:
          "Use DeleteQueue API, CLI (aws sqs delete-queue --queue-url <url>), or console. Queue must be empty before deletion, or messages will be lost.",
      },
      {
        question: "What is SQS delay queue?",
        solution:
          "Queue where messages are not immediately available to consumers. DelaySeconds parameter (0-900 seconds) can be set at queue level or per message.",
      },
      {
        question: "How do you implement SQS error handling?",
        solution:
          "Use dead-letter queues for failed messages, implement retry logic with exponential backoff, set appropriate visibility timeouts, and monitor CloudWatch metrics.",
      },
      {
        question: "What is SQS message visibility timeout?",
        solution:
          "The period during which a message is invisible to other consumers after being received. Can be changed per message using ChangeMessageVisibility API.",
      },
      {
        question: "How do you configure SQS queue tags?",
        solution:
          "Add key-value pairs to queues for cost allocation, organization, and automation. Tags can be used in IAM policies for access control and billing reports.",
      },
    ],
  },
  {
    id: 21,
    topic: "AWS SQS",
    categories: "Senior",
    tags: [
      { name: "architecture", link: "" },
      { name: "scaling", link: "" },
      { name: "patterns", link: "" },
      { name: "integration", link: "" },
      { name: "governance", link: "" },
    ],
    prepareLink: "",
    externallinks: [],
    questions: [
      {
        question: "Design an SQS-based microservices architecture",
        solution:
          "Use SQS for decoupling services, implement FIFO queues for ordered processing, use dead-letter queues for error handling, implement circuit breakers, and use CloudWatch for monitoring.",
      },
      {
        question: "How do you implement SQS at enterprise scale?",
        solution:
          "Use separate queues per microservice, implement queue naming conventions, use IAM policies for cross-account access, implement monitoring and alerting, and use CloudFormation for infrastructure as code.",
      },
      {
        question: "Explain SQS integration with EventBridge",
        solution:
          "EventBridge can send events to SQS queues, enabling event-driven architectures. Implement filtering, transformation, and routing rules. Use for decoupling event producers and consumers.",
      },
      {
        question: "How do you implement SQS cost optimization?",
        solution:
          "Use appropriate queue types (Standard vs FIFO), implement message batching, use long polling to reduce empty receives, monitor CloudWatch metrics, and implement lifecycle policies for queues.",
      },
      {
        question: "Design SQS error handling and retry patterns",
        solution:
          "Implement exponential backoff, use dead-letter queues for permanent failures, implement circuit breakers, set appropriate visibility timeouts, and use CloudWatch for monitoring.",
      },
      {
        question: "Explain SQS FIFO queue high-throughput patterns",
        solution:
          "Use message groups for parallelism, implement deduplication strategies, optimize message batching, use appropriate visibility timeouts, and monitor for throttling.",
      },
      {
        question: "How do you implement SQS cross-region replication?",
        solution:
          "Use Lambda to replicate messages between regions, implement EventBridge for routing, use SQS triggers for processing, and implement failover strategies with health checks.",
      },
      {
        question: "Design SQS-based event sourcing architecture",
        solution:
          "Use FIFO queues for ordered events, implement message deduplication, use dead-letter queues for error handling, implement event replay capabilities, and use DynamoDB for state management.",
      },
      {
        question: "Explain SQS integration with Step Functions",
        solution:
          "Use SQS as task queues in Step Functions workflows, implement error handling with retries, use parallel processing with Map states, and implement workflow orchestration patterns.",
      },
      {
        question: "How do you implement SQS governance at scale?",
        solution:
          "Use AWS Organizations with SCPs, implement tagging strategies, use AWS Config for compliance monitoring, implement queue naming conventions, and use Service Catalog for standardized deployments.",
      },
      {
        question: "Design SQS-based batch processing system",
        solution:
          "Use SQS for job queuing, Lambda for processing, implement message batching, use dead-letter queues for failed jobs, implement scaling policies, and use CloudWatch for monitoring.",
      },
      {
        question: "Explain SQS integration with containerized applications",
        solution:
          "Use ECS or EKS with SQS for decoupling, implement queue polling in containers, use Lambda for serverless processing, implement health checks, and use auto-scaling based on queue depth.",
      },
      {
        question: "How do you implement SQS data lifecycle management?",
        solution:
          "Use message retention periods, implement dead-letter queues for failed messages, use CloudWatch for monitoring, implement automated cleanup, and use S3 for long-term storage.",
      },
      {
        question: "Design SQS-based workflow orchestration",
        solution:
          "Use Step Functions for orchestration, SQS for task queues, implement error handling with retries, use parallel processing, implement state management, and use CloudWatch for monitoring.",
      },
      {
        question: "Explain SQS integration with AI/ML workloads",
        solution:
          "Use SQS for job queuing, Lambda for processing, implement batch processing, use dead-letter queues for failed jobs, implement scaling based on queue depth, and use SageMaker for ML processing.",
      },
      {
        question: "How do you implement SQS monitoring and alerting at scale?",
        solution:
          "Use CloudWatch metrics and alarms, implement custom dashboards, use AWS X-Ray for distributed tracing, implement log analysis, and use third-party monitoring tools.",
      },
      {
        question: "Design SQS architecture for IoT data ingestion",
        solution:
          "Use AWS IoT Core for ingestion, SQS for decoupling, Lambda for processing, implement message batching, use dead-letter queues for failed messages, and implement auto-scaling based on load.",
      },
      {
        question: "Explain SQS cross-account patterns",
        solution:
          "Use IAM roles for cross-account access, implement resource policies, use AWS Resource Access Manager, implement centralized logging, and use AWS Organizations for governance.",
      },
      {
        question: "How do you implement SQS compliance frameworks?",
        solution:
          "Use AWS Config rules for compliance monitoring, implement encryption with KMS, use VPC endpoints for private access, implement access logging, and use AWS CloudTrail for audit trails.",
      },
      {
        question: "Design SQS-based real-time processing system",
        solution:
          "Use SQS for high-throughput ingestion, Lambda for processing, implement message batching, use parallel processing, implement error handling, and use CloudWatch for real-time monitoring.",
      },
      {
        question: "Explain SQS integration with AWS Control Tower",
        solution:
          "Use AWS Control Tower for multi-account governance, implement guardrails for SQS compliance, use AWS Config for monitoring, implement centralized logging, and use Service Catalog for standardized deployments.",
      },
      {
        question: "How do you implement SQS disaster recovery?",
        solution:
          "Implement cross-region replication, use dead-letter queues for error handling, implement message backup strategies, use AWS Backup for queue configuration, and implement failover procedures.",
      },
      {
        question: "Design SQS-based event-driven architecture",
        solution:
          "Use EventBridge for event routing, SQS for decoupling, Lambda for processing, implement error handling, use dead-letter queues, and implement monitoring with CloudWatch.",
      },
      {
        question:
          "Explain SQS performance tuning for high-throughput applications",
        solution:
          "Use appropriate queue types (Standard vs FIFO), implement message batching, optimize visibility timeouts, use long polling, implement connection pooling, and monitor CloudWatch metrics.",
      },
      {
        question: "How do you implement SQS data protection strategies?",
        solution:
          "Use encryption at rest and in transit, implement access controls with IAM, use VPC endpoints for private access, implement message retention policies, and use AWS Secrets Manager for credentials.",
      },
      {
        question: "Design SQS-based workflow orchestration at scale",
        solution:
          "Use Step Functions for orchestration, SQS for task queues, implement error handling with retries, use parallel processing, implement state management, and use CloudWatch for comprehensive monitoring.",
      },
    ],
  },
  {
    id: 22,
    topic: "AWS SNS",
    categories: "Junior",
    tags: [
      { name: "basics", link: "" },
      { name: "topics", link: "" },
      { name: "subscriptions", link: "" },
    ],
    prepareLink: "",
    externallinks: [],
    questions: [
      {
        question: "What is Amazon SNS?",
        solution:
          "Amazon Simple Notification Service (SNS) is a fully managed pub/sub messaging service that enables you to decouple microservices, distributed systems, and serverless applications.",
      },
      {
        question: "What are SNS topics?",
        solution:
          "Logical access points that act as communication channels. Publishers send messages to topics, and subscribers receive messages from topics. Topics can be Standard or FIFO.",
      },
      {
        question: "What are SNS subscription protocols?",
        solution:
          "HTTP/HTTPS, Email/Email-JSON, SMS, SQS, Lambda, Platform application endpoints (mobile push), and Firehose.",
      },
      {
        question: "How do you create an SNS topic?",
        solution:
          "Use AWS Console, CLI (aws sns create-topic --name my-topic), SDKs, or CloudFormation. Specify topic name, type (Standard/FIFO), and optional attributes like display name.",
      },
      {
        question: "How do you subscribe to an SNS topic?",
        solution:
          "Use Subscribe API with protocol and endpoint. Example: aws sns subscribe --topic-arn <arn> --protocol email --notification-endpoint user@example.com",
      },
      {
        question: "What is SNS message filtering?",
        solution:
          "Feature that allows subscribers to receive only a subset of messages based on message attributes. Uses JSON-based filter policies attached to subscriptions.",
      },
      {
        question: "How do you publish a message to SNS?",
        solution:
          "Use Publish API, CLI (aws sns publish --topic-arn <arn> --message 'Hello'), or SDKs. Messages can include subject, message attributes, and message structure.",
      },
      {
        question: "What is SNS message deduplication?",
        solution:
          "In FIFO topics, prevents duplicate messages using message deduplication ID. Deduplication window is 5 minutes. Standard topics don't guarantee deduplication.",
      },
      {
        question: "How do you handle SNS message attributes?",
        solution:
          "Include metadata with messages using key-value pairs. Useful for filtering and routing. Attributes are passed to subscribers along with the message.",
      },
      {
        question: "What is SNS mobile push notifications?",
        solution:
          "Capability to send push notifications to iOS, Android, and other mobile devices via platform endpoints like APNS, FCM, ADM, WNS, and MPNS.",
      },
      {
        question: "How do you configure SNS SMS messaging?",
        solution:
          "Request SMS sandbox access, set up origination numbers, configure message type (Promotional/Transactional), and use Publish API with PhoneNumber parameter.",
      },
      {
        question: "What is SNS access policy?",
        solution:
          "JSON document attached to topics that defines who can publish/subscribe and what actions they can perform. More flexible than IAM policies for cross-account access.",
      },
      {
        question: "How do you monitor SNS topics?",
        solution:
          "Use CloudWatch metrics like NumberOfMessagesPublished, NumberOfNotificationsDelivered, and NumberOfNotificationsFailed. Set alarms for thresholds.",
      },
      {
        question: "What is SNS topic ARN?",
        solution:
          "Amazon Resource Name uniquely identifying an SNS topic: arn:aws:sns:<region>:<account-id>:<topic-name>. Used in API calls and IAM policies.",
      },
      {
        question: "How do you delete an SNS topic?",
        solution:
          "Use DeleteTopic API, CLI (aws sns delete-topic --topic-arn <arn>), or console. Must remove all subscriptions first.",
      },
      {
        question: "What is SNS message format?",
        solution:
          "Can be raw text, JSON, or email format. Supports message attributes and structured messages for different protocols.",
      },
      {
        question: "How do you configure SNS topic encryption?",
        solution:
          "Enable encryption using AWS KMS keys. Messages are encrypted in transit and at rest. Set KmsMasterKeyId when creating topic.",
      },
      {
        question: "What is SNS message retry policy?",
        solution:
          "Automatic retries with exponential backoff for failed deliveries. Retry attempts vary by protocol (e.g., 3 for HTTP, immediate for SQS).",
      },
      {
        question: "How do you handle SNS message throttling?",
        solution:
          "Monitor CloudWatch metrics, implement exponential backoff, use appropriate retry policies, and consider SNS FIFO topics for higher throughput.",
      },
    ],
  },
  {
    id: 23,
    topic: "AWS SNS",
    categories: "Mid",
    tags: [
      { name: "fan-out", link: "" },
      { name: "filtering", link: "" },
      { name: "mobile", link: "" },
      { name: "lambda", link: "" },
      { name: "scaling", link: "" },
    ],
    prepareLink: "",
    externallinks: [],
    questions: [
      {
        question: "How do you implement SNS fan-out pattern?",
        solution:
          "Use SNS topics to broadcast messages to multiple subscribers simultaneously. Each subscriber (SQS, Lambda, HTTP, email, SMS) receives a copy of the message independently.",
      },
      {
        question: "Explain SNS message filtering in detail",
        solution:
          "Use JSON-based filter policies on subscriptions to receive only relevant messages. Supports attribute-based filtering with operators like =, !=, exists, numeric comparisons, and OR conditions.",
      },
      {
        question: "How do you implement SNS mobile push notifications?",
        solution:
          "Create platform applications (APNS, GCM), register device tokens as endpoints, publish messages to endpoints, and handle feedback for invalid tokens.",
      },
      {
        question: "What is SNS FIFO topic and when to use it?",
        solution:
          "FIFO topics provide strict message ordering and deduplication. Use for ordered processing, exactly-once delivery, and when message sequence is critical.",
      },
      {
        question: "How do you trigger Lambda from SNS?",
        solution:
          "Add Lambda function as subscription to SNS topic with Lambda protocol. Lambda receives SNS event payload and processes it asynchronously.",
      },
      {
        question: "Explain SNS delivery retry mechanisms",
        solution:
          "Immediate retry for SQS/Lambda, exponential backoff for HTTP/HTTPS, immediate for email/SMS. Configure retry policies and use DLQ for failed deliveries.",
      },
      {
        question: "How do you handle SNS message fan-out to SQS?",
        solution:
          "Subscribe SQS queues to SNS topics, ensure proper IAM permissions, use raw message delivery for direct SQS format, and implement DLQ for failed deliveries.",
      },
      {
        question: "What is SNS mobile push best practices?",
        solution:
          "Use platform-specific endpoints, implement token management, handle feedback for invalid tokens, implement retry logic, and use appropriate message types.",
      },
      {
        question: "How do you implement SNS cost optimization?",
        solution:
          "Use message filtering to reduce unnecessary deliveries, implement batch processing, monitor CloudWatch metrics, and use appropriate message formats.",
      },
      {
        question: "Explain SNS cross-account access patterns",
        solution:
          "Use SNS topic policies for cross-account access, implement IAM roles with assume-role policies, and use AWS Resource Access Manager for shared access.",
      },
      {
        question: "How do you implement SNS error handling?",
        solution:
          "Use CloudWatch metrics for monitoring, implement DLQ for failed deliveries, set appropriate retry policies, and implement health checks for endpoints.",
      },
      {
        question: "What is SNS topic encryption?",
        solution:
          "Enable encryption using AWS KMS keys. Messages are encrypted in transit and at rest. Configure key policies for access control and implement key rotation.",
      },
      {
        question: "How do you implement SNS high availability?",
        solution:
          "Use multiple regions with cross-region replication, implement failover strategies, use CloudWatch for monitoring, and implement retry mechanisms.",
      },
      {
        question: "Explain SNS integration with Step Functions",
        solution:
          "Use SNS for notifications in Step Functions workflows, implement error handling, use parallel processing, and implement state management patterns.",
      },
      {
        question: "How do you implement SNS message batching?",
        solution:
          "Use PublishBatch API for sending multiple messages, implement appropriate batch sizes, handle partial failures, and monitor delivery metrics.",
      },
      {
        question: "What is SNS delivery status logging?",
        solution:
          "Enable delivery status logging to CloudWatch Logs for detailed delivery tracking, including success/failure rates, latency, and error details.",
      },
      {
        question: "How do you implement SNS compliance frameworks?",
        solution:
          "Use AWS Config rules for compliance monitoring, implement encryption with KMS, use VPC endpoints for private access, implement access logging, and use AWS CloudTrail.",
      },
      {
        question: "Explain SNS integration with containerized applications",
        solution:
          "Use ECS or EKS with SNS for notifications, implement queue polling in containers, use Lambda for serverless processing, and implement health checks.",
      },
      {
        question: "How do you implement SNS governance at scale?",
        solution:
          "Use AWS Organizations with SCPs, implement tagging strategies, use AWS Config for monitoring, implement approval workflows, and use Service Catalog.",
      },
      {
        question: "Design SNS-based notification system",
        solution:
          "Use SNS topics for different notification types, implement fan-out patterns, use message filtering, implement DLQ for failed deliveries, and use CloudWatch for monitoring.",
      },
      {
        question: "Explain SNS performance tuning at scale",
        solution:
          "Use appropriate topic types, implement message batching, optimize message size, use CloudWatch metrics, and implement proper retry mechanisms.",
      },
      {
        question: "How do you implement SNS disaster recovery?",
        solution:
          "Implement cross-region replication, use backup strategies, implement failover procedures, use health checks, and implement runbook automation.",
      },
      {
        question: "Design SNS-based event-driven architecture",
        solution:
          "Use SNS for event routing, implement fan-out patterns, use message filtering, implement error handling, and use CloudWatch for monitoring and alerting.",
      },
      {
        question: "Explain SNS integration with AWS Control Tower",
        solution:
          "Use AWS Control Tower for multi-account governance, implement guardrails for SNS compliance, use AWS Config for monitoring, and implement centralized logging.",
      },
      {
        question: "How do you implement SNS data protection strategies?",
        solution:
          "Use encryption at rest and in transit, implement access controls with IAM, use VPC endpoints for private access, and implement message retention policies.",
      },
      {
        question: "Design SNS-based real-time processing system",
        solution:
          "Use SNS for high-throughput notifications, implement fan-out patterns, use Lambda for processing, implement error handling, and use CloudWatch for real-time monitoring.",
      },
      {
        question: "Explain SNS cross-region patterns",
        solution:
          "Use SNS topics in multiple regions, implement cross-region replication, use EventBridge for routing, implement failover strategies, and use health checks.",
      },
      {
        question: "How do you implement SNS observability at scale?",
        solution:
          "Use CloudWatch Logs Insights, implement distributed tracing, use custom metrics, implement alerting, and use third-party monitoring tools for comprehensive observability.",
      },
    ],
  },
  {
    id: 24,
    topic: "AWS SNS",
    categories: "Senior",
    tags: [
      { name: "architecture", link: "" },
      { name: "governance", link: "" },
      { name: "multi-region", link: "" },
      { name: "compliance", link: "" },
      { name: "advanced-patterns", link: "" },
    ],
    prepareLink: "",
    externallinks: [],
    questions: [
      {
        question:
          "Design a global, multi-region SNS notification platform that handles 10 M messages/day with sub-second latency and 99.99 % availability.",
        solution:
          "Deploy SNS topics in every active region with cross-region replication via EventBridge global endpoints; front each region with Lambda@Edge for fan-out and local buffering; use FIFO topics + deduplication IDs to guarantee exactly-once delivery; shard topics by source domain to avoid throttling; back each topic with dedicated SQS DLQs, CloudWatch composite alarms, and Route 53 health checks for automatic failover; encrypt all topics with customer-managed KMS keys and enforce SCPs that deny unencrypted publishing.",
      },
      {
        question:
          "Explain how you would enforce enterprise-wide SNS governance (tagging, cost allocation, security baselines) across 500+ AWS accounts.",
        solution:
          "Enforce through AWS Organizations SCPs: require encrypted topics (SSE-KMS), mandatory tags (CostCenter, Environment, Owner), and block public-publish policies; deploy a centralized Config rule set that continuously audits topic encryption, policy exposure, and message-size limits; surface violations in Security Hub and auto-remediate with Lambda; feed Config snapshots into a custom Lake Formation data lake for quarterly compliance reports.",
      },
      {
        question:
          "Design an SNS-based event bus that provides immutable audit trails for SOX and HIPAA workloads.",
        solution:
          "Use FIFO topics with content-based deduplication and 14-day retention; publish every message to an encrypted S3 bucket via Kinesis Firehose for 7-year immutable storage; stream the same messages to CloudWatch Logs Insights for 90-day operational queries; lock topics with Object-Lock compliance mode + legal-hold capability; sign every message with AWS KMS asymmetric keys and store signatures in DynamoDB for tamper verification.",
      },
      {
        question:
          "How would you architect an SNS fan-out that delivers the same event to 50 K SQS queues without hitting service limits or throttling?",
        solution:
          "Create a hierarchy of regional SNS topics; shard queues by prefix (e.g., tenant-uuid) across 10 regional topics each limited to 5 K subscriptions; front each topic with an EventBridge pipe that replicates to downstream topics when subscription count nears 5 K; use Kinesis Data Streams as a buffer when instantaneous spikes exceed 3 K TPS; monitor with custom CloudWatch metric streams and auto-split topics via Lambda.",
      },
      {
        question:
          "Design a zero-downtime blue/green deployment pipeline for SNS topics that serve critical financial alerts.",
        solution:
          "Maintain two identically configured topic ARNs (blue/green); publish to both via weighted routing in Route 53 Application Recovery Controller; use CloudWatch composite alarms + health checks to flip traffic; green topic subscribes to a staging SQS queue for synthetic canary messages; promote green to blue only after 24-hour SLA success; archive blue topic but keep 7-day rollback window.",
      },
      {
        question:
          "Explain how you would implement real-time abuse detection and throttling for an SNS topic that receives 1 M SMS messages per day.",
        solution:
          "Attach Lambda to the topic via EventBridge Pipes; inside Lambda, use Amazon Comprehend Toxicity API + custom regex to score each payload; push high-risk hashes to DynamoDB TTL table; throttle violators by adding their source ARN to a global deny-list in an SCP; auto-scale the Lambda concurrency based on SNS NumberOfMessagesPublished metric and maintain <200 ms end-to-end latency.",
      },
      {
        question:
          "Design an SNS-to-Kinesis pipeline that guarantees exactly-once processing while surviving region-wide outages.",
        solution:
          "Use SNS FIFO topics with deduplication IDs; replicate to Kinesis Data Streams in two regions via EventBridge global endpoints; enable enhanced fan-out consumers with checkpointing in DynamoDB global tables; implement idempotent Lambda consumers that write processed offsets back to DynamoDB; use Route 53 Application Recovery Controller for automatic failover.",
      },
      {
        question:
          "How would you enforce least-privilege IAM for SNS across a multi-team organization without breaking existing integrations?",
        solution:
          "Deploy IAM Access Analyzer to detect public or cross-account policies; generate least-privilege policies via CloudTrail Lake queries; roll out via phased SCPs (warn → deny); provide self-service IAM policy vending machine in Service Catalog that auto-generates scoped policies based on team tag; keep existing ARNs via IAM policy simulator dry-run before enforcement.",
      },
      {
        question:
          "Architect an SNS topic that can safely burst to 100 K TPS during Black-Friday sales while staying within budget.",
        solution:
          "Pre-warm FIFO topics in each AZ with 10 K TPS capacity; front topics with EventBridge pipes that auto-scale Lambda shards when CloudWatch metric NumberOfMessagesPublished > 80 % of limit; use Kinesis Data Firehose as overflow buffer; enable SNS topic-level CloudWatch alarms to trigger Lambda that spins up additional topics in new regions; use AWS Budgets alerts and automatic shutdown scripts.",
      },
      {
        question:
          "Design a compliance-governed SNS topic lifecycle (creation → audit → archival → deletion) for a regulated fintech environment.",
        solution:
          "Enforce topic creation only via Service Catalog with mandatory CostCenter, DataClassification, Owner tags; attach Config rules for encryption, public-block, and retention; auto-archive inactive topics after 90 days to S3 with Object-Lock compliance; delete only after 7-year retention via AWS Backup vault lock; feed CloudTrail logs into AWS Security Hub for continuous compliance scoring.",
      },
      {
        question:
          "Explain how you would integrate SNS with AWS Control Tower to enforce guardrails for new accounts.",
        solution:
          "Deploy guardrails via Control Tower that auto-create SNS topics in each new account, attach mandatory SCPs (encryption, public-block), attach Config rules that auto-subscribe a centralized audit topic in the security account, and send violation events to the audit topic for remediation Lambda.",
      },
      {
        question:
          "Design an SNS topic that supports multi-tenant SaaS isolation without separate ARNs.",
        solution:
          "Use a single SNS topic with message attributes (tenant_id, environment); attach filter policies to each subscription that route only matching messages; implement IAM condition keys (sns:MessageAttribute) to prevent cross-tenant spoofing; store tenant-specific endpoints in DynamoDB and auto-refresh via Lambda on tenant onboarding/off-boarding.",
      },
      {
        question:
          "How would you implement a zero-trust SNS architecture that requires every message to be signed and verified?",
        solution:
          "Generate asymmetric KMS keys per topic; require publishers to sign message hashes with Sign API; attach Lambda via EventBridge Pipes to verify signatures with Verify API before fan-out; store valid signatures in DynamoDB TTL; deny unsigned messages via IAM condition key sns:MessageSignature.",
      },
      {
        question:
          "Design an SNS topic that publishes to on-prem systems via VPN without exposing credentials.",
        solution:
          "Use VPC endpoints for SNS to keep traffic inside AWS backbone; publish to an HTTPS endpoint in a private subnet via VPN tunnel; use IAM roles to rotate OAuth 2.0 tokens stored in AWS Secrets Manager; validate tokens in an API Gateway private integration before forwarding to on-prem.",
      },
      {
        question:
          "Explain how you would migrate 5 M existing email subscriptions to SNS without downtime or duplicate deliveries.",
        solution:
          "Create new FIFO topics in parallel; batch-import subscriptions via SNS SubscribeBatch with deduplication IDs; use weighted DNS (Route 53) to gradually shift traffic; monitor CloudWatch Delivery Failure metric; roll back instantly via DNS cut-over if error rate > 0.1 %.",
      },
      {
        question:
          "Design an SNS topic that enforces message size limits and automatically compresses oversized payloads.",
        solution:
          "Attach Lambda via EventBridge Pipes to compress messages > 256 KB using gzip; store compressed payload in S3; publish S3 object key to SNS; decompress in subscriber Lambda; use IAM condition sns:MessageSize to deny large messages.",
      },
      {
        question:
          "How would you implement real-time fraud detection on SNS SMS traffic without impacting latency?",
        solution:
          "Mirror SNS topic to Kinesis Data Streams via EventBridge; use Kinesis Analytics for real-time anomaly detection; push high-risk numbers to DynamoDB deny-list; deny-list is consumed by Lambda that auto-removes risky subscriptions via SNS RemovePermission.",
      },
      {
        question:
          "Design an SNS topic that supports A/B testing by dynamically routing 10 % of traffic to a new consumer.",
        solution:
          "Use SNS message attribute ab_test=true/false; attach filter policies to subscriptions that randomly select 10 % of messages; implement CloudWatch metric filters to compare delivery success; promote new consumer to 100 % via Lambda that updates filter policies.",
      },
      {
        question:
          "Explain how you would implement an SNS-based SLA dashboard for enterprise notifications.",
        solution:
          "Attach Lambda to every SNS topic to emit custom CloudWatch metrics (delivery_latency, success_rate); aggregate metrics in CloudWatch Insights; create real-time SLA dashboards; trigger PagerDuty alerts when KPIs breach thresholds; feed summary data to QuickSight for executive reports.",
      },
    ],
  },
  {
    id: 25,
    topic: "AWS Kinesis",
    categories: "Junior",
    tags: [
      { name: "basics", link: "" },
      { name: "streams", link: "" },
      { name: "data-ingestion", link: "" },
    ],
    prepareLink: "",
    externallinks: [],
    questions: [
      {
        question: "What is Amazon Kinesis?",
        solution:
          "Amazon Kinesis is a platform for real-time streaming data that makes it easy to collect, process, and analyze streaming data at any scale. It includes Kinesis Data Streams, Kinesis Data Firehose, Kinesis Data Analytics, and Kinesis Video Streams.",
      },
      {
        question: "What are the four Kinesis services?",
        solution:
          "Kinesis Data Streams (real-time streaming), Kinesis Data Firehose (loading to data stores), Kinesis Data Analytics (real-time analytics), and Kinesis Video Streams (video streaming).",
      },
      {
        question: "What is a Kinesis shard?",
        solution:
          "A shard is the base throughput unit of Kinesis Data Streams. Each shard provides 1 MB/sec input and 2 MB/sec output, up to 1,000 records/sec.",
      },
      {
        question: "How do you create a Kinesis Data Stream?",
        solution:
          "Use AWS Console, CLI (aws kinesis create-stream --stream-name my-stream --shard-count 1), or CloudFormation. Specify stream name and initial shard count.",
      },
      {
        question: "What is the maximum record size in Kinesis?",
        solution:
          "1 MB per record for Kinesis Data Streams. Larger payloads should be stored in S3 with pointers in the stream.",
      },
      {
        question: "How do you put data into Kinesis?",
        solution:
          "Use PutRecord (single record) or PutRecords (batch) APIs, CLI, SDKs, or Kinesis Producer Library. Data is base64-encoded and can include partition keys.",
      },
      {
        question: "What is a partition key in Kinesis?",
        solution:
          "A string used to determine which shard a record goes to. Records with the same partition key go to the same shard, ensuring ordering.",
      },
      {
        question: "How do you get data from Kinesis?",
        solution:
          "Use GetRecords API with shard iterator, CLI, SDKs, or Kinesis Client Library (KCL). Process records sequentially within each shard.",
      },
      {
        question: "What is Kinesis Client Library (KCL)?",
        solution:
          "A Java library that simplifies consumption of Kinesis streams by handling checkpointing, load balancing, and fault tolerance across multiple consumers.",
      },
      {
        question: "What is Kinesis Data Firehose?",
        solution:
          "Fully managed service that loads streaming data into S3, Redshift, Elasticsearch, or Splunk with automatic scaling and no servers to manage.",
      },
      {
        question: "How do you create a Firehose delivery stream?",
        solution:
          "Use AWS Console, CLI, or CloudFormation. Specify source (Direct PUT, Kinesis Stream), destination (S3, Redshift, etc.), and optional transformations.",
      },
      {
        question: "What is Kinesis Data Analytics?",
        solution:
          "Service that processes streaming data using SQL queries or Apache Flink applications. Can ingest from streams, perform real-time analytics, and output results.",
      },
      {
        question: "How do you monitor Kinesis streams?",
        solution:
          "Use CloudWatch metrics like IncomingBytes, IncomingRecords, GetRecords.IteratorAgeMilliseconds, and set alarms for thresholds.",
      },
      {
        question: "What is Kinesis Enhanced Fan-Out?",
        solution:
          "Feature that provides dedicated throughput for each consumer, up to 2 MB/sec per shard per consumer, without contending with other consumers.",
      },
      {
        question: "How do you scale Kinesis streams?",
        solution:
          "Use UpdateShardCount API to add/remove shards (resharding). Can split shards (increase throughput) or merge shards (decrease throughput).",
      },
      {
        question: "What is Kinesis Producer Library (KPL)?",
        solution:
          "A library that helps you write data to Kinesis streams efficiently by handling batching, retries, and aggregation automatically.",
      },
      {
        question: "How do you handle Kinesis stream errors?",
        solution:
          "Use CloudWatch Logs for detailed error information, implement retry logic with exponential backoff, and monitor CloudWatch metrics for failures.",
      },
      {
        question: "What is Kinesis Video Streams?",
        solution:
          "Service for securely streaming video from connected devices to AWS for real-time playback, analytics, and machine learning.",
      },
      {
        question: "How do you secure Kinesis streams?",
        solution:
          "Use IAM policies, VPC endpoints, encryption at rest with KMS, and encryption in transit. Implement least-privilege access for producers and consumers.",
      },
      {
        question: "What is Kinesis partition key best practice?",
        solution:
          "Use high-cardinality keys to evenly distribute records across shards, avoid hot shards, and ensure predictable ordering within each partition key.",
      },
    ],
  },
  {
    id: 26,
    topic: "AWS Kinesis",
    categories: "Mid",
    tags: [
      { name: "scaling", link: "" },
      { name: "processing", link: "" },
      { name: "firehose", link: "" },
      { name: "analytics", link: "" },
      { name: "monitoring", link: "" },
    ],
    prepareLink: "",
    externallinks: [],
    questions: [
      {
        question: "How do you implement Kinesis auto-scaling?",
        solution:
          "Use Application Auto Scaling with target tracking policies based on IncomingBytes or IncomingRecords metrics. Set min/max shard limits and scaling thresholds.",
      },
      {
        question: "Explain Kinesis data retention and replay",
        solution:
          "Data is retained for 24 hours by default (up to 365 days with extended retention). Use shard iterators to replay data from any point within retention period.",
      },
      {
        question: "How do you process Kinesis data with Lambda?",
        solution:
          "Create Lambda function with Kinesis trigger, specify batch size and starting position. Lambda polls shards and processes records in batches with automatic checkpointing.",
      },
      {
        question: "What is Kinesis Enhanced Fan-Out vs standard consumers?",
        solution:
          "Enhanced Fan-Out provides dedicated 2 MB/sec throughput per consumer without competing with other consumers. Standard consumers share 2 MB/sec per shard.",
      },
      {
        question: "How do you implement Kinesis Firehose transformations?",
        solution:
          "Use Lambda functions to transform incoming data before delivery. Can perform compression, format conversion, data enrichment, or filtering.",
      },
      {
        question: "Explain Kinesis Data Analytics SQL vs Apache Flink",
        solution:
          "SQL offers simple real-time analytics with SQL queries. Flink provides complex stream processing with Java/Scala, stateful operations, and exactly-once processing.",
      },
      {
        question: "How do you monitor Kinesis performance?",
        solution:
          "Use CloudWatch metrics (IncomingBytes, GetRecords.IteratorAgeMilliseconds, WriteProvisionedThroughputExceeded), Enhanced Monitoring, and CloudWatch Logs Insights.",
      },
      {
        question: "What is Kinesis partition key strategy?",
        solution:
          "Distribute load evenly across shards using high-cardinality keys, avoid hot shards, consider data locality, and monitor shard-level metrics.",
      },
      {
        question: "How do you implement Kinesis error handling?",
        solution:
          "Use CloudWatch Logs for detailed error tracking, implement retry logic with exponential backoff, use DLQ for failed records, and monitor throttling metrics.",
      },
      {
        question: "Explain Kinesis Firehose vs Kinesis Streams",
        solution:
          "Firehose is fully managed with automatic scaling and no servers. Streams require manual shard management and provide more control over processing.",
      },
      {
        question: "How do you handle Kinesis large payloads?",
        solution:
          "Store large data (>1 MB) in S3 and send pointers in Kinesis, implement compression, or use Kinesis Data Firehose for automatic handling.",
      },
      {
        question: "What is Kinesis consumer group management?",
        solution:
          "Use KCL for automatic load balancing across consumers, handling consumer failures, and checkpointing. Each consumer group processes the stream independently.",
      },
      {
        question: "How do you implement Kinesis cost optimization?",
        solution:
          "Right-size shard count, use Firehose for simple use cases, implement data compression, use appropriate retention periods, and monitor usage with CloudWatch.",
      },
      {
        question: "Explain Kinesis data encryption",
        solution:
          "Encrypt data at rest using KMS keys, enable encryption in transit, implement IAM policies for access control, and use VPC endpoints for private access.",
      },
      {
        question: "How do you implement Kinesis cross-account access?",
        solution:
          "Use IAM roles with cross-account policies, implement resource policies on streams, use VPC endpoints for private access, and monitor with CloudTrail.",
      },
      {
        question: "What is Kinesis shard splitting and merging?",
        solution:
          "Split shards to increase capacity or merge to decrease. Use UpdateShardCount API, monitor metrics, and plan resharding during low-traffic periods.",
      },
      {
        question: "How do you implement Kinesis exactly-once processing?",
        solution:
          "Use KCL checkpointing, implement idempotent consumers, use sequence numbers for deduplication, and handle duplicate records gracefully.",
      },
      {
        question: "Explain Kinesis integration with EMR",
        solution:
          "Use EMR to process Kinesis data in real-time or batch mode, implement Spark Streaming jobs, use EMR Serverless for serverless processing, and monitor with CloudWatch.",
      },
      {
        question: "How do you implement Kinesis disaster recovery?",
        solution:
          "Use cross-region replication, implement backup strategies, use Route 53 for failover, implement health checks, and test recovery procedures regularly.",
      },
      {
        question: "What is Kinesis data pipeline orchestration?",
        solution:
          "Use AWS Step Functions to orchestrate complex workflows, implement error handling, use Lambda for custom processing, and monitor with CloudWatch.",
      },
      {
        question: "How do you implement Kinesis governance at scale?",
        solution:
          "Use AWS Organizations with SCPs, implement tagging strategies, use AWS Config for compliance monitoring, implement approval workflows, and use Service Catalog.",
      },
      {
        question: "Design Kinesis-based real-time analytics platform",
        solution:
          "Use Kinesis Data Streams for ingestion, Kinesis Data Analytics for processing, Lambda for custom functions, S3 for storage, and QuickSight for visualization.",
      },
      {
        question: "Explain Kinesis integration with AWS Glue",
        solution:
          "Use Glue streaming ETL for data transformation, implement schema evolution, use Glue Data Catalog for metadata management, and monitor with CloudWatch.",
      },
      {
        question: "How do you implement Kinesis security best practices?",
        solution:
          "Use IAM least privilege, implement encryption at rest and in transit, use VPC endpoints, implement access logging, and use AWS Secrets Manager for credentials.",
      },
      {
        question: "Design Kinesis-based IoT data ingestion system",
        solution:
          "Use IoT Core for ingestion, Kinesis Data Streams for buffering, Kinesis Data Analytics for processing, S3 for storage, and Lambda for custom processing.",
      },
      {
        question:
          "Explain Kinesis performance tuning for high-throughput workloads",
        solution:
          "Optimize shard count, use appropriate partition keys, implement compression, use enhanced fan-out, monitor CloudWatch metrics, and use caching layers.",
      },
      {
        question: "How do you implement Kinesis observability at scale?",
        solution:
          "Use CloudWatch Logs Insights, implement distributed tracing, use custom metrics, implement alerting, and use third-party monitoring tools.",
      },
      {
        question: "Design Kinesis-based event-driven architecture",
        solution:
          "Use Kinesis for event streaming, implement event sourcing patterns, use Lambda for processing, implement CQRS patterns, and use DynamoDB for state management.",
      },
      {
        question: "Explain Kinesis integration with AWS Control Tower",
        solution:
          "Use AWS Control Tower for multi-account governance, implement guardrails for Kinesis compliance, use AWS Config for monitoring, and implement centralized logging.",
      },
    ],
  },
  {
    id: 27,
    topic: "AWS Kinesis",
    categories: "Senior",
    tags: [
      { name: "architecture", link: "" },
      { name: "governance", link: "" },
      { name: "compliance", link: "" },
      { name: "multi-region", link: "" },
      { name: "advanced-patterns", link: "" },
    ],
    prepareLink: "",
    externallinks: [],
    questions: [
      {
        question:
          "Design a petabyte-scale, multi-region Kinesis pipeline that ingests 50 GB/sec with 99.9 % durability and sub-second latency.",
        solution:
          "Deploy Kinesis Data Streams in every active region with 10 K shards each; front each stream with API Gateway + Lambda for regional buffering; use Kinesis Enhanced Fan-Out for dedicated consumer throughput; replicate to Kinesis Data Firehose in secondary regions via Lambda; store raw data in S3 with cross-region replication; implement global DynamoDB table for checkpointing; use Route 53 latency-based routing for failover.",
      },
      {
        question:
          "Explain how you would enforce enterprise-wide Kinesis governance (shard quotas, encryption, cost allocation) across 1000+ AWS accounts.",
        solution:
          "Deploy AWS Organizations SCPs limiting CreateStream to approved regions and max shard counts; enforce SSE-KMS via Config rules; auto-tag streams with CostCenter, Owner, Environment via Lambda triggered by CloudTrail; surface violations in Security Hub; feed usage into centralized Cost Explorer dashboards.",
      },
      {
        question:
          "Design a real-time fraud-detection Kinesis pipeline that processes 1 M TPS with exactly-once semantics and 100 ms SLA.",
        solution:
          "Use Kinesis Data Streams with 20 K shards; attach Lambda via Enhanced Fan-Out for parallel processing; implement idempotent consumers with DynamoDB conditional writes; use Kinesis Data Analytics Flink for complex event processing; store checkpoints in DynamoDB TTL table; auto-scale shards via Application Auto Scaling based on iterator-age metric.",
      },
      {
        question:
          "Architect Kinesis-based CDC (change-data-capture) replication between RDS Aurora and DynamoDB with zero data loss.",
        solution:
          "Use DMS to publish Aurora binlog events to Kinesis Data Streams; use Kinesis Data Analytics Flink to transform events into DynamoDB-compatible format; implement exactly-once delivery via DynamoDB conditional writes; use S3 DLQ for failed records; maintain global DynamoDB table for idempotency keys.",
      },
      {
        question:
          "Design a zero-downtime blue/green Kinesis stream migration at 10 GB/sec traffic.",
        solution:
          "Create identically configured green stream; use Lambda to dual-publish to blue/green via weighted routing; monitor green stream with synthetic canary records; promote green to 100 % via Route 53 failover; decommission blue stream after 48-hour burn-in.",
      },
      {
        question:
          "Explain how you would implement GDPR-compliant data deletion across petabyte-scale Kinesis archives in S3.",
        solution:
          "Use S3 Object Lambda to filter PII on read; maintain DynamoDB index of PII locations; trigger S3 Batch Operations for deletion via Lambda; use S3 Object Lock compliance mode to prevent accidental deletion; generate audit reports via Athena queries.",
      },
      {
        question:
          "Design Kinesis-based event sourcing with 7-year immutable audit trail.",
        solution:
          "Use Kinesis Data Streams with 365-day retention; publish every event to S3 with Object-Lock compliance; use Kinesis Data Analytics Flink for real-time projections; store aggregate snapshots in DynamoDB; implement S3 Glacier Deep Archive for long-term storage.",
      },
      {
        question:
          "How would you implement cost-optimized Kinesis scaling for variable IoT workloads?",
        solution:
          "Use Kinesis Data Analytics Flink for workload prediction; auto-scale shards via Application Auto Scaling; use Kinesis Data Firehose for batch loading; implement S3 Intelligent-Tiering for archival; use Reserved Capacity for predictable workloads.",
      },
      {
        question:
          "Design Kinesis-based CDC replication with conflict resolution between multi-region DynamoDB tables.",
        solution:
          "Use DynamoDB Streams to Kinesis; implement vector-clock based conflict resolution in Kinesis Data Analytics Flink; use Lambda for last-writer-wins policy; maintain global DynamoDB table for conflict logs; implement S3 DLQ for manual resolution.",
      },
      {
        question:
          "Explain how you would enforce least-privilege IAM for Kinesis across 500 microservices without breaking existing integrations.",
        solution:
          "Use IAM Access Analyzer to detect over-permissive policies; generate least-privilege policies via CloudTrail Lake queries; roll out via phased SCPs; provide self-service policy vending machine in Service Catalog; use IAM policy simulator for dry-run validation.",
      },
      {
        question:
          "Design Kinesis-based real-time anomaly detection with 50 ms SLA.",
        solution:
          "Use Kinesis Data Streams with 5 ms batch windows; attach Kinesis Data Analytics Flink for sliding-window analytics; use Lambda for custom ML models; store anomaly scores in DynamoDB TTL; auto-scale via Application Auto Scaling based on anomaly rate.",
      },
      {
        question:
          "Architect Kinesis integration with AWS Control Tower for automated compliance.",
        solution:
          "Deploy guardrails via Control Tower that auto-create Kinesis streams in new accounts; attach mandatory Config rules (encryption, public-block); auto-subscribe centralized audit stream; feed violations to Security Hub for remediation Lambda.",
      },
      {
        question:
          "Design Kinesis pipeline that supports multi-tenant SaaS isolation without separate ARNs.",
        solution:
          "Use single Kinesis stream with partition keys (tenant_id); implement tenant-specific consumer groups in KCL; use DynamoDB for tenant checkpointing; implement IAM condition keys (kinesis:PartitionKey) for isolation; store tenant configs in Parameter Store.",
      },
      {
        question:
          "Explain how you would implement zero-trust Kinesis encryption with customer-supplied keys.",
        solution:
          "Use KMS asymmetric keys for envelope encryption; require publishers to encrypt payloads client-side; decrypt in consumer Lambda with Verify API; store key IDs in Secrets Manager; enforce via IAM condition kinesis:EncryptionContext.",
      },
      {
        question:
          "Design Kinesis-based disaster recovery with RPO=5 minutes and RTO=15 minutes.",
        solution:
          "Use cross-region replication via Kinesis Data Firehose; maintain DynamoDB global table for checkpoints; implement Route 53 health checks; use Lambda to replay last 5 minutes from S3; test failover monthly with chaos engineering.",
      },
      {
        question:
          "How would you migrate 20 TB/day of on-prem Kafka to Kinesis without downtime?",
        solution:
          "Use AWS DataSync for initial bulk migration; run parallel ingestion via MirrorMaker 2.0; use Kinesis Data Firehose for backfill; implement cut-over via weighted DNS; monitor with CloudWatch composite alarms.",
      },
    ],
  },
  {
    id: 28,
    topic: "AWS Parameter Store",
    categories: "Junior",
    tags: [
      { name: "basics", link: "" },
      { name: "parameters", link: "" },
      { name: "hierarchy", link: "" },
    ],
    prepareLink: "",
    externallinks: [],
    questions: [
      {
        question: "What is AWS Systems Manager Parameter Store?",
        solution:
          "A managed service that provides secure, hierarchical storage for configuration data management and secrets management. You can store data such as passwords, database strings, Amazon Machine Image (AMI) IDs, and license codes as parameter values.",
      },
      {
        question: "What are the two types of parameters?",
        solution:
          "Standard parameters (max 4 KB, free) and Advanced parameters (max 8 KB, charged, support parameter policies and larger content).",
      },
      {
        question: "How do you create a parameter?",
        solution:
          "Use AWS Console, CLI (aws ssm put-parameter --name '/app/db/host' --value 'db.example.com' --type String), SDKs, or CloudFormation.",
      },
      {
        question: "What parameter types are supported?",
        solution:
          "String, StringList (comma-separated), and SecureString (encrypted with KMS).",
      },
      {
        question: "How do you retrieve a parameter?",
        solution:
          "Use GetParameter API, CLI (aws ssm get-parameter --name '/app/db/host'), or SDKs. Add --with-decryption flag for SecureString.",
      },
      {
        question: "What is parameter hierarchy?",
        solution:
          "A tree-like structure using forward slashes (e.g., /app/dev/db/host). Enables logical grouping, access control, and bulk retrieval.",
      },
      {
        question: "How do you use parameters in CloudFormation?",
        solution:
          "Reference with {{resolve:ssm:/path/to/param:version}} or {{resolve:ssm-secure:/path/to/secret}} for SecureString.",
      },
      {
        question: "What is parameter versioning?",
        solution:
          "Every change creates a new version. You can retrieve any historical version and track changes over time.",
      },
      {
        question: "How do you list parameters?",
        solution:
          "Use GetParametersByPath API, CLI (aws ssm get-parameters-by-path --path '/app'), or console with filtering by path, type, or tags.",
      },
      {
        question: "What is SecureString parameter?",
        solution:
          "Encrypted parameter using KMS keys. Values are automatically decrypted when retrieved with appropriate permissions.",
      },
      {
        question: "How do you update a parameter?",
        solution:
          "Use PutParameter with same name and new value. Creates new version automatically. Use --overwrite flag in CLI.",
      },
      {
        question: "What is parameter tagging?",
        solution:
          "Key-value pairs attached to parameters for cost allocation, organization, and access control. Up to 50 tags per parameter.",
      },
      {
        question: "How do you delete a parameter?",
        solution:
          "Use DeleteParameter API or CLI (aws ssm delete-parameter --name '/app/old/param'). Deletion is immediate and permanent.",
      },
      {
        question: "What is parameter history?",
        solution:
          "Stores all versions of a parameter. Use GetParameterHistory API to view up to 100 previous values and their timestamps.",
      },
      {
        question: "How do you use parameters in Lambda?",
        solution:
          "Retrieve via AWS SDK (GetParameter API) or use Lambda environment variables with parameter store integration. Ensure IAM permissions.",
      },
      {
        question: "What is parameter tier?",
        solution:
          "Standard (free, 4 KB max) vs Advanced (charged, 8 KB max, supports policies). Choose based on size and feature requirements.",
      },
      {
        question: "How do you share parameters across accounts?",
        solution:
          "Use AWS Resource Access Manager or create IAM roles with cross-account permissions. Parameters can be referenced from other accounts with proper policies.",
      },
      {
        question: "What is parameter search?",
        solution:
          "Use DescribeParameters API or console search to find parameters by name, type, tags, or last modified date.",
      },
      {
        question: "How do you handle parameter limits?",
        solution:
          "Standard tier has 10,000 parameters per account/region. Use Advanced tier for higher limits (100,000). Plan hierarchy and naming conventions.",
      },
      {
        question: "What is parameter validation?",
        solution:
          "Use AllowedPattern regex or AllowedValues list in parameter policies to enforce valid inputs and prevent invalid configurations.",
      },
    ],
  },
  {
    id: 29,
    topic: "AWS Parameter Store",
    categories: "Mid",
    tags: [
      { name: "policies", link: "" },
      { name: "rotation", link: "" },
      { name: "integration", link: "" },
      { name: "security", link: "" },
      { name: "automation", link: "" },
    ],
    prepareLink: "",
    externallinks: [],
    questions: [
      {
        question:
          "How do you implement parameter rotation with Parameter Store?",
        solution:
          "Use parameter policies with ChangeCalendar or Rate expressions. Lambda functions can automatically rotate secrets and update parameter values via PutParameter API.",
      },
      {
        question: "Explain parameter policies in detail",
        solution:
          "Policies enforce rules like expiration dates (Expiration), rate limits (ChangeCalendar), value constraints (AllowedValues), and regex validation (AllowedPattern).",
      },
      {
        question:
          "How do you integrate Parameter Store with AWS Secrets Manager?",
        solution:
          "Store non-secret configs in Parameter Store and secrets in Secrets Manager. Use consistent hierarchy and IAM policies to control access to both services.",
      },
      {
        question: "What is parameter hierarchy best practice?",
        solution:
          "Use environment-based structure: /app/env/component/param. Enables environment-specific configs, bulk retrieval, and granular IAM policies.",
      },
      {
        question: "How do you implement parameter access logging?",
        solution:
          "Enable CloudTrail logging for Parameter Store API calls. Monitor GetParameter, PutParameter, and DeleteParameter events for security auditing.",
      },
      {
        question: "Explain parameter cross-account access patterns",
        solution:
          "Use IAM roles with assume-role policies, AWS Resource Access Manager, or create parameters in shared accounts with proper IAM policies for cross-account access.",
      },
      {
        question: "How do you implement parameter validation at scale?",
        solution:
          "Use AWS Config rules to validate parameter compliance, implement custom Lambda validators, and use parameter policies for input validation.",
      },
      {
        question: "What is parameter drift detection?",
        solution:
          "Use AWS Config rules to detect unauthorized parameter changes, implement CloudWatch Events for change notifications, and use Lambda for remediation.",
      },
      {
        question: "How do you implement parameter lifecycle management?",
        solution:
          "Use parameter policies for expiration, implement automated cleanup for unused parameters, and use tagging for lifecycle tracking.",
      },
      {
        question: "Explain parameter integration with CI/CD pipelines",
        solution:
          "Use Parameter Store as source for deployment configs, integrate with CodePipeline for parameter updates, and implement blue-green deployments with parameter changes.",
      },
      {
        question: "How do you handle parameter concurrency?",
        solution:
          "Use parameter versioning to prevent race conditions, implement optimistic locking with version checks, and use CloudWatch Events for change coordination.",
      },
      {
        question: "What is parameter access via VPC endpoints?",
        solution:
          "Use VPC endpoints for private access to Parameter Store, implement IAM policies for endpoint access, and ensure proper security group configurations.",
      },
      {
        question: "How do you implement parameter backup and recovery?",
        solution:
          "Use AWS Backup for automated parameter backups, export parameters to S3 for archival, and implement restore procedures from backups.",
      },
      {
        question:
          "Explain parameter integration with containerized applications",
        solution:
          "Use ECS task definitions with parameter store integration, implement sidecar containers for parameter retrieval, and use Kubernetes secrets via external-secrets-operator.",
      },
      {
        question: "How do you implement parameter cost optimization?",
        solution:
          "Use Standard tier for small configs, Advanced tier only when needed, implement parameter cleanup policies, and monitor usage with CloudWatch.",
      },
      {
        question: "What is parameter access via AWS SDK best practices?",
        solution:
          "Use batch operations for multiple parameters, implement caching with TTL, use IAM roles for least privilege, and implement retry logic with exponential backoff.",
      },
      {
        question: "How do you implement parameter governance at scale?",
        solution:
          "Use AWS Organizations SCPs, implement tagging strategies, use AWS Config for compliance monitoring, and implement approval workflows for parameter changes.",
      },
      {
        question: "Explain parameter integration with Terraform/CloudFormation",
        solution:
          "Use data sources to retrieve parameters, implement parameter references in templates, and use parameter store for environment-specific configurations.",
      },
      {
        question: "How do you handle parameter secrets rotation?",
        solution:
          "Use AWS Secrets Manager for sensitive data, implement Lambda functions for rotation, use parameter policies for non-secret rotation, and monitor with CloudWatch.",
      },
    ],
  },
  {
    id: 30,
    topic: "AWS Parameter Store",
    categories: "Senior",
    tags: [
      { name: "architecture", link: "" },
      { name: "governance", link: "" },
      { name: "compliance", link: "" },
      { name: "multi-region", link: "" },
      { name: "advanced-patterns", link: "" },
    ],
    prepareLink: "",
    externallinks: [],
    questions: [
      {
        question:
          "Design a multi-region, multi-account parameter governance platform that enforces least-privilege access to 1 M parameters across 500 AWS accounts.",
        solution:
          "Deploy AWS Organizations SCPs limiting PutParameter to approved regions and KMS keys; enforce mandatory tags (CostCenter, Owner, ComplianceLevel) via Config rules; auto-create shared parameter hierarchies in a central security account; use cross-account IAM roles with session policies scoped to parameter path; feed all API calls into a centralized CloudWatch Logs Insights dashboard for real-time audit.",
      },
      {
        question:
          "Explain how you would implement a zero-trust parameter vault that requires every read to be signed and time-bound.",
        solution:
          "Generate asymmetric KMS keys per parameter; require callers to sign GetParameter requests with Sign API and include 60-second TTL; validate signatures in Lambda authorizer attached to VPC endpoints; deny unsigned requests via IAM condition aws:RequestTag; rotate keys monthly via AWS Secrets Manager.",
      },
      {
        question:
          "Design parameter-based CDC (change-data-capture) pipeline that replays configuration drift to downstream systems with 5-second SLA.",
        solution:
          "Attach Lambda to CloudTrail PutParameter events; push diffs to Kinesis Data Streams with 1-second batch windows; use Kinesis Data Analytics Flink for stateful merge; publish sanitized events to EventBridge for fan-out; maintain DynamoDB global table for last-known-good state.",
      },
      {
        question:
          "How do you implement parameter-based canary deployments with automatic rollback?",
        solution:
          "Store versioned parameters per environment; use Lambda to flip traffic weights via Route 53 Application Recovery Controller; monitor CloudWatch composite alarms for error rate > 1 %; trigger Lambda rollback via Step Functions state machine; maintain rollback parameters in Parameter Store with Object-Lock.",
      },
      {
        question:
          "Design parameter lifecycle management with 7-year retention and legal-hold capability.",
        solution:
          "Use Advanced parameters with 7-year retention policy; implement Object-Lock compliance mode; store parameters in encrypted S3 bucket with Glacier Deep Archive; use AWS Backup vault lock for immutable backups; generate quarterly compliance reports via Athena queries.",
      },
      {
        question:
          "Explain how you would migrate 500 K legacy environment variables to Parameter Store without downtime.",
        solution:
          "Create parallel parameter hierarchies; use Lambda to sync in real-time via CloudWatch Events; implement weighted traffic shifting via ECS task definitions; validate via synthetic canaries; decommission legacy variables via phased SCP enforcement.",
      },
      {
        question:
          "Design parameter-based configuration drift detection across 1000 microservices.",
        solution:
          "Use AWS Config rules to detect parameter changes; feed drift events to EventBridge; trigger Lambda for impact analysis; store drift history in DynamoDB TTL table; generate weekly drift reports via QuickSight.",
      },
      {
        question:
          "How do you implement parameter-based feature flags with automatic rollback?",
        solution:
          "Use SecureString parameters for feature toggles; implement Lambda authorizer for feature evaluation; use CloudWatch composite alarms for rollback triggers; maintain rollback parameters in Parameter Store with versioning.",
      },
      {
        question:
          "Design parameter cross-region disaster recovery with RPO=1 minute and RTO=5 minutes.",
        solution:
          "Use cross-region replication via EventBridge global endpoints; maintain DynamoDB global table for parameter metadata; implement Route 53 health checks for failover; use Lambda to replay last minute of changes from CloudTrail.",
      },
      {
        question:
          "Explain parameter integration with AWS Control Tower for automated compliance.",
        solution:
          "Deploy guardrails that auto-create parameter hierarchies in new accounts; attach mandatory Config rules (encryption, tagging, retention); auto-subscribe centralized audit topic; feed violations to Security Hub.",
      },
      {
        question: "Design parameter-based secret rotation with zero downtime.",
        solution:
          "Use Secrets Manager for sensitive data; implement Lambda functions for rotation; use parameter policies for non-secret rotation; implement blue-green rotation via parameter versioning; monitor with CloudWatch.",
      },
      {
        question:
          "How do you implement parameter-based environment promotion pipeline?",
        solution:
          "Use parameter hierarchies per environment; implement CodePipeline stages for promotion; use Lambda to validate parameters; implement rollback via parameter versioning; use CloudFormation for infrastructure as code.",
      },
      {
        question:
          "Design parameter-based configuration management for serverless applications.",
        solution:
          "Use parameter hierarchies per function; implement Lambda environment variable integration; use Lambda extensions for parameter retrieval; implement caching with TTL; use CloudFormation for deployment.",
      },
      {
        question:
          "Explain parameter integration with AWS Lambda for dynamic configuration.",
        solution:
          "Use Lambda extensions for parameter retrieval; implement caching with TTL; use environment variables for static configs; implement parameter change detection via CloudWatch Events.",
      },
      {
        question:
          "Design parameter-based multi-tenant SaaS configuration isolation.",
        solution:
          "Use parameter hierarchies per tenant; implement IAM policies scoped to tenant paths; use tenant-specific KMS keys; implement parameter validation per tenant.",
      },
      {
        question:
          "How do you implement parameter-based configuration validation at scale?",
        solution:
          "Use AWS Config rules for validation, implement custom Lambda validators, use parameter policies for input validation, and implement automated testing pipelines.",
      },
      {
        question:
          "Design parameter-based configuration drift detection with automated remediation.",
        solution:
          "Use AWS Config rules for drift detection, implement Lambda for remediation, use EventBridge for event routing, and implement automated rollback procedures.",
      },
      {
        question:
          "Explain parameter integration with container orchestration platforms.",
        solution:
          "Use Kubernetes external-secrets-operator, implement sidecar containers for parameter retrieval, use ECS task definition integration, and implement health checks for parameter freshness.",
      },
      {
        question:
          "Design parameter-based configuration management for edge computing.",
        solution:
          "Use AWS IoT Device Management for edge devices, implement parameter hierarchies per device group, use MQTT topics for parameter distribution, and implement offline caching strategies.",
      },
    ],
  },
  {
    id: 31,
    topic: "AWS Fargate",
    categories: "Junior",
    tags: [
      { name: "basics", link: "" },
      { name: "launch-types", link: "" },
      { name: "task-def", link: "" },
    ],
    prepareLink: "",
    externallinks: [],
    questions: [
      {
        question: "What is AWS Fargate?",
        solution:
          "AWS Fargate is a serverless compute engine for containers that works with both Amazon ECS and EKS. It removes the need to provision and manage EC2 instances—simply define your containers and Fargate runs them.",
      },
      {
        question: "How is Fargate different from EC2-backed ECS?",
        solution:
          "With Fargate you don’t manage servers; AWS provisions the right amount of compute for each task. EC2-backed ECS requires you to choose and scale EC2 instances yourself.",
      },
      {
        question: "What are the two Fargate launch types?",
        solution:
          "FARGATE (for Amazon ECS) and FARGATE_SPOT (cheaper, interruptible capacity) for cost-sensitive workloads.",
      },
      {
        question: "How do you create a Fargate task definition?",
        solution:
          "Use AWS Console, CLI (aws ecs register-task-definition --cli-input-json file://task.json), or CloudFormation. Specify container image, CPU/memory limits, networking, and IAM roles.",
      },
      {
        question: "What are the minimum and maximum CPU/memory for Fargate?",
        solution:
          "Minimum: 0.25 vCPU / 0.5 GB memory. Maximum: 4 vCPU / 30 GB memory (as of current limits).",
      },
      {
        question: "How do you expose a container port in Fargate?",
        solution:
          "In the task definition, set the containerPort and optionally hostPort. Then create an Application Load Balancer target group that forwards traffic to the container port.",
      },
      {
        question: "What is a Fargate service?",
        solution:
          "A long-running set of identical tasks (like a deployment) that keeps the desired count running and can integrate with load balancers and auto-scaling.",
      },
      {
        question: "How do you push a Docker image for Fargate?",
        solution:
          "Tag the image with the ECS repository URI, then use docker push or aws ecr get-login-password | docker login, followed by aws ecr create-repository and docker push.",
      },
      {
        question: "What is the Fargate task execution IAM role?",
        solution:
          "IAM role assumed by Fargate to pull images from ECR, write logs to CloudWatch, and access other AWS services on behalf of the task.",
      },
      {
        question: "How do you view Fargate logs?",
        solution:
          "Open the ECS console → Tasks → select task → Logs tab, or query CloudWatch Logs directly: aws logs tail /ecs/task-name --follow.",
      },
      {
        question: "How do you stop a Fargate task?",
        solution:
          "In the ECS console choose the task → Stop, or CLI: aws ecs stop-task --cluster my-cluster --task task-arn.",
      },
      {
        question: "What is the difference between task and service in Fargate?",
        solution:
          "Task = one-off container run; Service = long-running desired count of tasks with auto-recovery, load-balancer integration, and auto-scaling.",
      },
    ],
  },
  {
    id: 32,
    topic: "AWS Fargate",
    categories: "Mid",
    tags: [
      { name: "scaling", link: "" },
      { name: "networking", link: "" },
      { name: "security", link: "" },
      { name: "cost", link: "" },
      { name: "monitoring", link: "" },
    ],
    prepareLink: "",
    externallinks: [],
    questions: [
      {
        question: "How do you auto-scale Fargate services?",
        solution:
          "Attach Application Auto Scaling policies (target tracking or step scaling) to the ECS service based on CPU, memory, custom CloudWatch metrics, or ALB request count.",
      },
      {
        question: "Explain Fargate Spot vs Fargate pricing.",
        solution:
          "Fargate Spot uses spare capacity—up to 70 % cheaper—but tasks can be interrupted. Ideal for fault-tolerant batch jobs. Fargate pricing is pay-per-second for vCPU and GB.",
      },
      {
        question: "How do you configure Fargate in a VPC?",
        solution:
          "Create ECS cluster → choose Fargate → specify VPC subnets and security groups. Ensure subnets have route tables to NAT Gateway or VPC endpoints for external access.",
      },
      {
        question: "What is Fargate task networking mode?",
        solution:
          "awsvpc mode (default) gives each task its own ENI and IP address, enabling granular security groups and direct VPC connectivity.",
      },
      {
        question: "How do you mount EFS volumes in Fargate?",
        solution:
          "Create EFS → create access point → in task definition add volume of type EFS, specify file-system-id and access-point-id, then mount it in container.",
      },
      {
        question: "How do you pass secrets to Fargate containers?",
        solution:
          "Store secrets in AWS Secrets Manager or Parameter Store, then reference them in task definition under secrets section or inject as environment variables.",
      },
      {
        question: "What is Fargate task placement strategy?",
        solution:
          "Fargate automatically spreads tasks across AZs for high availability; you can additionally use task placement constraints (e.g., distinctInstance) for specific needs.",
      },
      {
        question: "How do you monitor Fargate performance?",
        solution:
          "Use CloudWatch Container Insights, CloudWatch Logs, X-Ray for tracing, and custom metrics. Enable log group /ecs/* and set alarms on CPU/memory.",
      },
      {
        question: "Explain Fargate networking with Application Load Balancer.",
        solution:
          "Attach ALB target group to Fargate service. Register task IP addresses automatically via awsvpc mode, enabling path-based and host-based routing.",
      },
      {
        question: "How do you implement blue-green deployments in Fargate?",
        solution:
          "Use ECS services with CodeDeploy, set up two target groups (blue/green), and shift traffic gradually via weighted routing while monitoring CloudWatch alarms.",
      },
      {
        question: "What is Fargate task definition versioning?",
        solution:
          "Each revision is immutable. Update container image, CPU/memory, or env vars → create new revision. Services can be updated to latest revision without downtime.",
      },
      {
        question: "How do you reduce Fargate costs?",
        solution:
          "Right-size CPU/memory, use Fargate Spot for fault-tolerant workloads, enable log retention limits, and leverage Savings Plans or Reserved Capacity.",
      },
      {
        question: "How do you debug Fargate task failures?",
        solution:
          "Check CloudWatch Logs for application errors, ECS Events for task-level issues, and CloudWatch metrics for resource limits or throttling.",
      },
      {
        question: "What is Fargate ephemeral storage?",
        solution:
          "Each Fargate task gets 20 GB ephemeral storage by default. Can request up to 200 GB for temporary data, which is deleted when the task stops.",
      },
      {
        question: "How do you implement health checks in Fargate?",
        solution:
          "Define container health checks in task definition (command or HTTP endpoint). ALB target groups also perform health checks to remove unhealthy tasks.",
      },
      {
        question: "Explain Fargate task IAM role vs task execution role.",
        solution:
          "Task execution role = permissions Fargate needs (pull image, write logs). Task role = permissions your application inside container needs (S3, DynamoDB, etc.).",
      },
      {
        question: "How do you handle Fargate task retries?",
        solution:
          "Use ECS service restart policies, implement circuit breakers in application, or use Step Functions for complex retry workflows.",
      },
      {
        question: "What is Fargate capacity providers?",
        solution:
          "Define mix of Fargate and Fargate Spot capacity. Services automatically balance between them based on capacity provider weights and base values.",
      },
    ],
  },
  {
    id: 33,
    topic: "AWS Fargate",
    categories: "Senior",
    tags: [
      { name: "architecture", link: "" },
      { name: "governance", link: "" },
      { name: "compliance", link: "" },
      { name: "multi-region", link: "" },
      { name: "advanced-patterns", link: "" },
    ],
    prepareLink: "",
    externallinks: [],
    questions: [
      {
        question:
          "Design a zero-trust Fargate mesh that enforces mTLS and least-privilege IAM across 1 K microservices without managing EC2.",
        solution:
          "Deploy ECS services in awsvpc mode, front each with AWS App Mesh (Envoy sidecars) for mTLS. Use IAM roles scoped to service ARN and IAM condition keys (ecs:service-name).  Central policy-as-code via OPA + Lambda authorizer.  Rotate certs via ACM Private CA, rotate IAM roles via Secrets Manager.",
      },
      {
        question:
          "Architect a multi-region Fargate pipeline that delivers 500 container updates per day with <30 s downtime and SOX compliance.",
        solution:
          "Use CodePipeline → ECR replication → ECS blue/green via CodeDeploy.  Store configs in Parameter Store with Object-Lock compliance.  Canary via weighted ALB target groups (5 % → 100 %).  Immutable task defs, signed images (ECR image scanning + Notary v2).  Central audit logs in Security Lake.",
      },
      {
        question:
          "Explain how you would enforce enterprise-wide Fargate governance (CPU/memory quotas, encryption, cost allocation) across 500 AWS accounts.",
        solution:
          "Deploy AWS Organizations SCPs: deny launch if CPU > 4 vCPU or memory > 30 GB, deny unencrypted ephemeral storage, require mandatory tags (CostCenter, Owner).  Auto-label via Lambda triggered by CloudTrail.  Feed usage + cost into centralized QuickSight dashboard.",
      },
      {
        question:
          "Design Fargate-based event-driven CDC pipeline that replicates 20 TB/day Aurora changes to DynamoDB with exactly-once semantics.",
        solution:
          "Use Aurora DMS → Kinesis Data Streams → Fargate tasks running Flink (enhanced fan-out).  Idempotent writes via DynamoDB conditional expressions.  Global DynamoDB table for idempotency keys.  Auto-scale tasks via Application Auto Scaling (target iterator-age < 5 s).",
      },
      {
        question:
          "How would you migrate 10 K on-prem Docker containers to Fargate with zero downtime and cost under $0.01 per container-hour?",
        solution:
          "Parallel lift-and-shift via AWS DataSync + ECS Anywhere for hybrid phase.  Use Fargate Spot for 70 % capacity (cost < $0.007 per vCPU-hour).  Weighted DNS cut-over via Route 53 Application Recovery Controller.  Monitor via Container Insights + custom CloudWatch composite alarms.",
      },
      {
        question:
          "Design Fargate-based real-time fraud detection (1 M TPS) with <100 ms P99 latency and PCI-DSS compliance.",
        solution:
          "Use Fargate Spot for bursty traffic, App Mesh for mTLS, ALB with WAF for DDoS.  Ephemeral storage encrypted with customer-managed KMS keys.  Auto-scale via Application Auto Scaling (target CPU 60 %).  Secrets in Secrets Manager with automatic rotation.",
      },
      {
        question:
          "Explain Fargate cross-region disaster recovery with RPO=1 minute and RTO=5 minutes.",
        solution:
          "Cross-region replication via ECR replication + ECS service discovery with Route 53 health checks.  Global DynamoDB table for state.  Lambda-driven failover that swaps weighted DNS from 100-0 to 0-100 after health check failure.  Monthly chaos drills via AWS Fault Injection Simulator.",
      },
      {
        question:
          "Design a Fargate-based GitOps workflow that applies Terraform changes only after parameter drift is detected.",
        solution:
          "Use Parameter Store as source of truth.  CloudTrail events trigger Lambda that diffs current vs desired state; if drift, push commit to GitHub Action that runs terraform plan/apply; approve via Slack bot; rollback via GitHub revert.",
      },
      {
        question:
          "How would you implement zero-trust networking for Fargate tasks that must reach on-prem services via VPN without exposing VPC CIDR?",
        solution:
          "Use VPC endpoints + PrivateLink to on-prem service endpoints.  Fargate tasks get private ENIs in isolated subnets.  All egress via Transit Gateway Connect with IPSec; enforce IAM condition ecs:service-name in resource policies.  Rotate VPN keys via Secrets Manager every 30 days.",
      },
      {
        question:
          "Design cost-optimized Fargate scaling that automatically downscales during off-peak hours and uses Spot for 90 % of capacity.",
        solution:
          "Scheduled Lambda adjusts desired count via ECS UpdateService based on CloudWatch scheduled expressions.  Use Fargate Spot with base 10 %, weight 90 %.  Auto-switch to On-Demand on Spot interruption via Capacity Provider strategy (spot, on-demand).  Feed savings into Cost Anomaly Detection.",
      },
      {
        question:
          "Explain how you would enforce immutable Fargate task definitions with cryptographic signatures and rollback on drift.",
        solution:
          "Sign task-def JSON with AWS Signer + Notary v2; ECS service uses signed image digests only.  Config rule detects drift (image tag change); Lambda triggers CodeDeploy rollback to last signed version.  Audit trail in CloudTrail + Security Hub.",
      },
      {
        question:
          "Design Fargate-based edge-compute mesh that runs 5 K tasks across 20 regions with global service discovery.",
        solution:
          "Use ECS Service Discovery (Route 53 private hosted zones) per region.  Cloud Map auto-registers task IPs.  Global ALB with geolocation routing.  ECS Anywhere for hybrid edge nodes.  Auto-scale via CloudWatch metrics and Route 53 health checks.",
      },
      {
        question:
          "How would you implement Fargate capacity forecasting using ML and automatically purchase Reserved Capacity 30 days ahead?",
        solution:
          "Train SageMaker model on ECS ServiceDiscovery + CloudWatch Container Insights data (CPU, memory, request rate).  Forecast demand 30 days out; trigger Lambda to buy Reserved Capacity via AWS Budgets API; rollback purchases automatically if forecast error > 15 %.",
      },
      {
        question:
          "Design Fargate-based secret-less authentication where tasks authenticate to AWS services via OIDC web identity with rotating JWTs.",
        solution:
          "Use ECS task IAM role with OIDC provider (Cognito or custom).  JWTs issued by Lambda every 15 minutes, rotated via Secrets Manager.  Tasks present JWT to STS AssumeRoleWithWebIdentity.  IAM policies scoped to task ARN.  No long-lived credentials.",
      },
      {
        question:
          "Explain Fargate integration with AWS Control Tower for automated compliance and drift remediation.",
        solution:
          "Deploy guardrails that auto-create Fargate clusters with mandatory Config rules (encryption, public-block, tagging).  Auto-remediate drift via Lambda triggered by Config events.  Feed compliance scores into QuickSight dashboard for executive review.",
      },
      {
        question:
          "Design Fargate-based chaos engineering platform that injects random failures while maintaining 99.99 % availability.",
        solution:
          "Use AWS Fault Injection Simulator to terminate tasks, throttle ENIs, and introduce latency.  Canary deployments via CodeDeploy.  Auto-heal via ECS service auto-recovery.  Monitor via CloudWatch SLOs and PagerDuty alerts.",
      },
    ],
  },
  {
    id: 39,
    topic: "RabbitMQ",
    categories: "Junior",
    tags: [
      { name: "basics", link: "" },
      { name: "exchanges", link: "" },
      { name: "queues", link: "" },
    ],
    prepareLink: "",
    externallinks: [],
    questions: [
      {
        question: "What is RabbitMQ?",
        solution:
          "RabbitMQ is an open-source message broker that implements the Advanced Message Queuing Protocol (AMQP). It enables asynchronous messaging by allowing producers to send messages to exchanges, which route them to queues where consumers can retrieve them.",
      },
      {
        question: "What is AMQP?",
        solution:
          "AMQP (Advanced Message Queuing Protocol) is an open standard application layer protocol for message-oriented middleware. It provides reliable, secure, and interoperable messaging between applications.",
      },
      {
        question: "What are the four built-in exchange types in RabbitMQ?",
        solution:
          "Direct (exact routing-key match), Fanout (broadcast to all bound queues), Topic (wildcard routing-key pattern), and Headers (match on message headers instead of routing key).",
      },
      {
        question: "What is a routing key?",
        solution:
          "A string attribute attached to every message by the producer. The exchange uses the routing key together with its type and the queue bindings to decide which queue(s) should receive the message.",
      },
      {
        question: "Explain the basic RabbitMQ workflow.",
        solution:
          "Producer → Exchange → Queue(s) → Consumer. Producers publish to an exchange, exchanges route messages to queues via bindings, and consumers read from queues.",
      },
      {
        question: "What is a queue in RabbitMQ?",
        solution:
          "A buffer that stores messages until they are processed by consumers. Queues are bound to exchanges and can be durable, exclusive, or auto-delete.",
      },
      {
        question: "What is a binding?",
        solution:
          "A relationship between a queue and an exchange that defines the routing rules for messages, based on routing key or headers.",
      },
      {
        question: "What is message acknowledgment?",
        solution:
          "A mechanism where consumers send an ack back to RabbitMQ to confirm successful processing; un-acked messages can be re-queued.",
      },
      {
        question: "What is a dead-letter queue (DLQ)?",
        solution:
          "A queue that receives messages that cannot be delivered or processed (e.g., expired, rejected, or max-retries exceeded).",
      },
      {
        question: "What is message persistence?",
        solution:
          "Marking messages and queues as durable so they survive broker restarts; requires both queue and message flags to be set.",
      },
      {
        question: "What is TTL (Time-To-Live) in RabbitMQ?",
        solution:
          "A policy or message property that defines how long a message or queue can live before it is discarded or moved to a DLQ.",
      },
      {
        question: "What is a VHost in RabbitMQ?",
        solution:
          "A virtual host (namespace) that provides logical isolation of exchanges, queues, and users within the same RabbitMQ broker.",
      },
      {
        question: "What is the default management UI port?",
        solution: "15672.",
      },
      {
        question: "How do you stop the RabbitMQ server locally?",
        solution: "sudo systemctl stop rabbitmq-server or rabbitmqctl stop.",
      },
      {
        question: "Which protocol does RabbitMQ primarily use?",
        solution:
          "AMQP (Advanced Message Queuing Protocol), with additional support for MQTT, STOMP, and HTTP.",
      },
      {
        question: "Describe the publish-subscribe pattern in RabbitMQ.",
        solution:
          "Use a fanout exchange; messages are broadcast to all bound queues regardless of routing key, enabling one-to-many delivery.",
      },
      {
        question: "Describe the point-to-point pattern in RabbitMQ.",
        solution:
          "Use a direct exchange; each message is routed to exactly one queue (and one consumer) based on an exact routing-key match.",
      },
      {
        question: "Describe the request-reply pattern in RabbitMQ.",
        solution:
          "A synchronous pattern where a producer sends a request message and waits for a response on a separate queue, often using correlation IDs.",
      },
      {
        question: "How do you install RabbitMQ on Ubuntu?",
        solution:
          "sudo apt-get install rabbitmq-server, then enable and start the service.",
      },
      {
        question: "How do you list all queues in RabbitMQ?",
        solution: "rabbitmqctl list_queues or via the management UI.",
      },
      {
        question: "How do you delete all queues in RabbitMQ?",
        solution: "rabbitmqctl reset or via the management UI.",
      },
      {
        question: "How do you verify the RabbitMQ version?",
        solution: "rabbitmqctl version or rabbitmqctl status.",
      },
      {
        question: "How do you implement a retry mechanism?",
        solution:
          "Use a TTL on the original queue plus a dead-letter exchange that routes expired messages to a retry queue with exponential backoff or the x-delayed-message plugin.",
      },
      {
        question: "What is the default exchange name?",
        solution: 'The default exchange is an unnamed direct exchange ("").',
      },
      {
        question: "What is the default queue name?",
        solution:
          "There is no default queue name; queues must be explicitly declared.",
      },
      {
        question: "What is the default user/password?",
        solution: "guest/guest (only accessible from localhost by default).",
      },
      {
        question: "How do you create a queue via CLI?",
        solution: "rabbitmqadmin declare queue name=my-queue durable=true.",
      },
      {
        question: "How do you publish a message via CLI?",
        solution:
          "rabbitmqadmin publish routing_key=my-queue payload='hello world'.",
      },
      {
        question: "How do you consume a message via CLI?",
        solution: "rabbitmqadmin get queue=my-queue requeue=false.",
      },
      {
        question: "What is the default port for AMQP?",
        solution: "5672.",
      },
      {
        question: "What is the default port for the management plugin?",
        solution: "15672.",
      },
      {
        question: "What is the default port for STOMP?",
        solution: "61613.",
      },
      {
        question: "What is the default port for MQTT?",
        solution: "1883.",
      },
      {
        question: "How do you enable the management plugin?",
        solution: "rabbitmq-plugins enable rabbitmq_management.",
      },
      {
        question: "How do you create a user via CLI?",
        solution: "rabbitmqctl add_user username password.",
      },
      {
        question: "How do you set permissions for a user?",
        solution:
          "rabbitmqctl set_permissions -p vhost username '.*' '.*' '.*'.",
      },
      {
        question:
          "What is the difference between durable and transient queues?",
        solution:
          "Durable queues survive broker restarts; transient queues do not.",
      },
      {
        question:
          "What is the difference between persistent and transient messages?",
        solution:
          "Persistent messages are written to disk; transient messages are kept in memory only.",
      },
      {
        question: "How do you declare a durable queue?",
        solution: "channel.queue_declare(queue='my-queue', durable=True).",
      },
      {
        question: "How do you publish a persistent message?",
        solution:
          "channel.basic_publish(exchange='', routing_key='my-queue', body='hello', properties=pika.BasicProperties(delivery_mode=2)).",
      },
      {
        question: "What is the default prefetch count?",
        solution: "0 (unlimited).",
      },
      {
        question: "How do you set prefetch count in CLI?",
        solution:
          "rabbitmqctl set_policy my-policy '.*' '{prefetch: 10}' --apply-to queues.",
      },
      {
        question: "How do you set prefetch count in code?",
        solution: "channel.basic_qos(prefetch_count=10).",
      },
      {
        question: "What is round-robin dispatching?",
        solution:
          "Messages are distributed evenly across all consumers bound to the same queue.",
      },
      {
        question: "What is fair dispatching?",
        solution:
          "Consumers receive messages based on their processing capacity, ensuring no single consumer is overwhelmed.",
      },
      {
        question: "What is the difference between auto-ack and manual ack?",
        solution:
          "Auto-ack removes the message from the queue immediately; manual ack requires the consumer to explicitly acknowledge the message.",
      },
      {
        question: "How do you enable publisher confirms?",
        solution:
          "channel.confirm_delivery() and wait for basic.ack or basic.nack.",
      },
      {
        question: "How do you enable consumer acknowledgements?",
        solution:
          "channel.basic_consume(queue='my-queue', on_message_callback=callback, auto_ack=False).",
      },
      {
        question: "How do you view the message count of a queue?",
        solution: "rabbitmqctl list_queues name messages.",
      },
      {
        question: "How do you purge a queue?",
        solution: "rabbitmqctl purge_queue my-queue.",
      },
      {
        question: "How do you close a connection?",
        solution: "connection.close().",
      },
      {
        question: "How do you delete an exchange?",
        solution: "channel.exchange_delete(exchange='my-exchange').",
      },
      {
        question: "How do you list exchanges?",
        solution: "rabbitmqctl list_exchanges name type.",
      },
      {
        question: "How do you list bindings?",
        solution: "rabbitmqctl list_bindings.",
      },
      {
        question: "How do you list connections?",
        solution: "rabbitmqctl list_connections.",
      },
      {
        question: "How do you list channels?",
        solution: "rabbitmqctl list_channels.",
      },
      {
        question: "How do you list consumers?",
        solution: "rabbitmqctl list_consumers.",
      },
      {
        question: "How do you list users?",
        solution: "rabbitmqctl list_users.",
      },
      {
        question: "How do you list permissions?",
        solution: "rabbitmqctl list_permissions.",
      },
      {
        question: "How do you list vhosts?",
        solution: "rabbitmqctl list_vhosts.",
      },
      {
        question: "How do you create a vhost?",
        solution: "rabbitmqctl add_vhost my-vhost.",
      },
      {
        question: "How do you delete a vhost?",
        solution: "rabbitmqctl delete_vhost my-vhost.",
      },
      {
        question: "How do you set vhost permissions?",
        solution:
          "rabbitmqctl set_permissions -p my-vhost my-user '.*' '.*' '.*'.",
      },
      {
        question: "How do you view vhost permissions?",
        solution: "rabbitmqctl list_permissions -p my-vhost.",
      },
      {
        question: "How do you import/export definitions?",
        solution:
          "rabbitmqctl export_definitions /path/to/defs.json and rabbitmqctl import_definitions /path/to/defs.json.",
      },
      {
        question: "How do you enable tracing?",
        solution: "rabbitmq-plugins enable rabbitmq_tracing.",
      },
      {
        question: "How do you enable federation?",
        solution: "rabbitmq-plugins enable rabbitmq_federation.",
      },
      {
        question: "How do you enable shovel?",
        solution: "rabbitmq-plugins enable rabbitmq_shovel.",
      },
      {
        question: "How do you enable stream plugin?",
        solution: "rabbitmq-plugins enable rabbitmq_stream.",
      },
      {
        question: "How do you enable MQTT plugin?",
        solution: "rabbitmq-plugins enable rabbitmq_mqtt.",
      },
      {
        question: "How do you enable STOMP plugin?",
        solution: "rabbitmq-plugins enable rabbitmq_stomp.",
      },
      {
        question: "How do you enable web-stomp plugin?",
        solution: "rabbitmq-plugins enable rabbitmq_web_stomp.",
      },
      {
        question: "How do you enable rabbitmq-auth-backend-http?",
        solution: "rabbitmq-plugins enable rabbitmq_auth_backend_http.",
      },
      {
        question: "How do you enable rabbitmq-auth-backend-ldap?",
        solution: "rabbitmq-plugins enable rabbitmq_auth_backend_ldap.",
      },
      {
        question: "How do you enable rabbitmq-auth-backend-oauth2?",
        solution: "rabbitmq-plugins enable rabbitmq_auth_backend_oauth2.",
      },
      {
        question: "How do you enable rabbitmq-auth-backend-amqp?",
        solution: "rabbitmq-plugins enable rabbitmq_auth_backend_amqp.",
      },
      {
        question: "How do you enable rabbitmq-auth-backend-cache?",
        solution: "rabbitmq-plugins enable rabbitmq_auth_backend_cache.",
      },
      {
        question: "How do you enable rabbitmq-auth-backend-ip-range?",
        solution: "rabbitmq-plugins enable rabbitmq_auth_backend_ip_range.",
      },
    ],
  },
  {
    id: 40,
    topic: "RabbitMQ",
    categories: "Mid",
    tags: [
      { name: "design-patterns", link: "" },
      { name: "reliability", link: "" },
      { name: "scaling", link: "" },
      { name: "security", link: "" },
      { name: "monitoring", link: "" },
    ],
    prepareLink: "",
    externallinks: [],
    questions: [
      {
        question: "How do you implement a retry mechanism in RabbitMQ?",
        solution:
          "Use TTL + DLX to route failed messages to a retry queue with exponential backoff, or leverage the x-delayed-message plugin for delayed re-queueing.",
      },
      {
        question: "Explain ZeroMQ vs RabbitMQ differences.",
        solution:
          "ZeroMQ is a library for sockets; RabbitMQ is a broker with persistence, routing, and management GUI.",
      },
      {
        question:
          "Describe the difference between Round-Robin and Fair Dispatch.",
        solution:
          "Round-Robin sends messages evenly; Fair Dispatch uses prefetch=1 so slow workers don’t get overwhelmed.",
      },
      {
        question: "How do you scale consumers horizontally?",
        solution:
          "Add more consumer instances with the same queue name; RabbitMQ load-balances messages across them using round-robin. Ensure idempotent processing.",
      },
      {
        question: "What is message deduplication in RabbitMQ?",
        solution:
          "Use deduplication plugin or unique message-id header plus consumer-side cache.",
      },
      {
        question: "How do you implement priority queues?",
        solution:
          "Declare queue with x-max-priority and set priority field in message.",
      },
      {
        question: "Explain topic exchange wildcard patterns.",
        solution:
          "Use * for one word, # for zero or more; enables selective routing.",
      },
      {
        question: "How do you secure RabbitMQ?",
        solution:
          "Enable TLS, use SASL/PLAIN or LDAP authentication, set up VHost permissions, and restrict management UI access via firewall or VPN.",
      },
      {
        question: "Describe clustering in RabbitMQ.",
        solution:
          "Multiple RabbitMQ nodes form a cluster; queues can be mirrored for HA. Use consistent hashing for even distribution and avoid network partitions.",
      },
      {
        question: "What is federated messaging?",
        solution:
          "Federation plugin allows exchanges or queues to be linked across brokers, enabling cross-datacenter or cross-cloud message flow without clustering.",
      },
      {
        question: "How do you monitor RabbitMQ?",
        solution:
          "Enable management plugin, use Prometheus + Grafana, collect metrics via rabbitmq_exporter, and set up alerts on queue depth, connection counts, and memory/CPU.",
      },
      {
        question: "Explain the use of shovels in RabbitMQ.",
        solution:
          "Shovel plugin moves messages from a queue on one broker to an exchange on another, useful for DR or cloud-to-cloud replication.",
      },
      {
        question: "How do you handle large messages?",
        solution:
          "Use message compression, store payload in S3 and send reference, or leverage the large-message plugin for >1 MB payloads.",
      },
      {
        question: "What are quorum queues and when to use them?",
        solution:
          "A replicated, fault-tolerant queue type (Raft consensus) that replaces mirrored queues, offering better performance and data safety.",
      },
      {
        question: "How do you implement circuit breakers?",
        solution:
          "Use consumer-side circuit breaker pattern (e.g., Hystrix) or DLQ + TTL retry loops to prevent cascade failures.",
      },
      {
        question: "Explain publisher confirms and consumer acknowledgements.",
        solution:
          "Publisher confirms ensure the broker received the message; consumer acks confirm processing. Both are essential for end-to-end reliability.",
      },
      {
        question: "How do you implement exactly-once semantics?",
        solution:
          "Idempotent consumers + deduplication + at-least-once delivery guarantees.",
      },
      {
        question: "Explain RabbitMQ federation vs clustering.",
        solution:
          "Federation links brokers; clustering shares state within a broker.",
      },
      {
        question: "How do you configure high availability?",
        solution:
          "Quorum queues, mirrored queues (deprecated), load balancers, health checks.",
      },
      {
        question: "Explain RabbitMQ performance tuning.",
        solution:
          "IO threads, memory watermark, disk space limits, queue master locator.",
      },
      {
        question: "How do you implement message compression?",
        solution: "zlib or gzip at producer, decompress at consumer.",
      },
      {
        question: "Describe RabbitMQ monitoring best practices.",
        solution:
          "Prometheus exporter, Grafana dashboards, alerting on queue depth, connection count.",
      },
      {
        question: "How do you handle network partitions?",
        solution:
          "Quorum queues, pause-minority, auto-heal, manual intervention.",
      },
      {
        question: "Explain RabbitMQ backup and restore.",
        solution:
          "mnesia backup, definition export, snapshot AMIs, automated scripts.",
      },
      {
        question: "How do you implement retry with exponential backoff?",
        solution: "DLX + TTL + retry queue with increasing TTLs.",
      },
      {
        question: "Describe RabbitMQ security best practices.",
        solution:
          "TLS, SASL, VHost isolation, firewall rules, management UI restrictions.",
      },
      {
        question: "How do you implement message routing with headers exchange?",
        solution:
          "Match message headers against binding arguments using x-match=all/any.",
      },
      {
        question: "Explain RabbitMQ plugin management.",
        solution:
          "Enable/disable via rabbitmq-plugins, custom plugins for business logic.",
      },
      {
        question: "How do you handle RabbitMQ upgrades?",
        solution:
          "Rolling upgrades, blue/green clusters, compatibility matrix, backup before upgrade.",
      },
      {
        question: "Describe RabbitMQ capacity planning.",
        solution:
          "Queue depth, connection count, memory usage, disk I/O, network bandwidth.",
      },
      {
        question: "How do you implement RabbitMQ integration with Spring Boot?",
        solution:
          "Spring AMQP, @RabbitListener, RabbitTemplate, retry templates.",
      },
      {
        question: "Explain RabbitMQ integration with Kubernetes.",
        solution:
          "Helm charts, StatefulSets, PVC, secrets, readiness/liveness probes.",
      },
      {
        question: "How do you implement RabbitMQ integration with Docker?",
        solution:
          "Official Docker image, Docker Compose, environment variables, health checks.",
      },
    ],
  },
  {
    id: 41,
    topic: "RabbitMQ",
    categories: "Senior",
    tags: [
      { name: "architecture", link: "" },
      { name: "governance", link: "" },
      { name: "compliance", link: "" },
      { name: "multi-region", link: "" },
      { name: "advanced-patterns", link: "" },
    ],
    prepareLink: "",
    externallinks: [],
    questions: [
      {
        question:
          "Design a global RabbitMQ mesh that routes 1 M messages/sec across 6 regions with <50 ms latency and 99.99 % uptime.",
        solution:
          "Deploy regional clusters behind AWS Global Accelerator; use Shovel plugin for cross-region replication with compression + TLS; Quorum Queues with 3-node Raft quorum per region; Route 53 health checks for failover; mirror DLQs in each region; monitor via Prometheus federation.",
      },
      {
        question:
          "Explain how you would enforce enterprise-wide RabbitMQ governance (vhost quotas, TLS, cost tags) across 500 teams.",
        solution:
          "Use Terraform + Policy-as-Code (OPA) to enforce vhost limits, mandatory TLS, and required tags (CostCenter, Owner). GitHub Actions CI gate rejects non-compliant configs. Central Prometheus scrapes metrics; violations auto-ticketed via Jira.",
      },
      {
        question:
          "Design RabbitMQ-based event sourcing ledger that stores 10 TB/year with immutable audit and GDPR right-to-be-forgotten.",
        solution:
          "Append-only quorum queues + S3 object lock for raw events. Event IDs hashed with SHA-256. GDPR delete via stream-filtering plugin that redacts events by ID and writes tombstones. Monthly compliance snapshot to Glacier Deep Archive.",
      },
      {
        question:
          "How do you implement blue/green deployments for RabbitMQ consumers processing 100 K TPS without message loss?",
        solution:
          "Run two consumer groups (blue/green) behind separate queues; shift traffic via weighted exchanges (10 % → 100 %). Use publisher confirms + consumer acks to ensure exactly-once. Canary via mirrored DLQ metrics.",
      },
      {
        question:
          "Design RabbitMQ disaster recovery with RPO=30 seconds and RTO=2 minutes across cloud providers.",
        solution:
          "Cross-cloud Shovel replication (AWS → GCP) with compression + TLS. Global load balancer health checks. Warm standby cluster in second cloud. Automatic cut-over via Terraform + Ansible playbooks triggered by CloudWatch composite alarms.",
      },
      {
        question:
          "Explain zero-downtime schema evolution for RabbitMQ streams that hold 5 TB of financial data.",
        solution:
          "Use stream-filtering plugin to create new stream version; dual-publish to old and new schemas; migrate consumers incrementally via feature flags; decommission old stream after 30-day retention + audit snapshot.",
      },
      {
        question:
          "Design RabbitMQ-based retry/backoff circuit breaker that handles 1 M failed messages/day with exponential backoff and DLQ.",
        solution:
          "Use x-delayed-message plugin for exponential backoff queues; TTL + DLQ for final failure. Circuit breaker state stored in Redis; auto-reset after SLA. Monitor with Prometheus exporter + Grafana.",
      },
      {
        question:
          "How do you implement multi-tenant isolation in RabbitMQ without separate brokers?",
        solution:
          "Use vhost-per-tenant + LDAP groups; resource-based ACLs; per-tenant Shovels for cross-region; enforce memory/CPU limits via rabbitmqctl set_vm_memory_high_watermark and connection limits via rabbitmqctl set_max_connections.",
      },
      {
        question:
          "Design RabbitMQ observability at petabyte scale with 1-second metrics retention.",
        solution:
          "Prometheus + VictoriaMetrics cluster; custom exporters for queue depth, connection count, memory. Grafana Loki for logs. Alertmanager for PagerDuty. S3 archival for 2-year retention.",
      },
      {
        question:
          "Explain how you would migrate 50 TB of legacy RabbitMQ data to cloud-native streaming without downtime.",
        solution:
          "Use Shovel plugin to stream to Kafka; parallel consumer that dual-writes to new system; verify via checksums; cut-over via DNS switch; decommission old cluster after 90-day retention.",
      },
    ],
  },
  {
    id: 19,
    topic: "OOP",
    categories: "Junior",
    tags: [
      {
        name: "encapsulation",
        link: "",
      },
      {
        name: "inheritance",
        link: "",
      },
      {
        name: "polymorphism",
        link: "",
      },
      {
        name: "abstraction",
        link: "",
      },
      {
        name: "classes",
        link: "",
      },
      {
        name: "objects",
        link: "",
      },
    ],
    prepareLink: "",
    externallinks: [],
    questions: [
      {
        question:
          "What are the four main principles of Object-Oriented Programming?",
        solution:
          "1. Encapsulation (bundling data and methods), 2. Inheritance (deriving new classes from existing ones), 3. Polymorphism (same interface, different implementations), 4. Abstraction (hiding complex implementation details).",
        tags: [{ name: "OOP principles", link: "" }],
      },
      {
        question: "Explain the difference between a class and an object.",
        solution:
          "A class is a blueprint or template that defines the structure and behavior of objects. An object is an instance of a class - a concrete entity created from the class template with actual values.",
        tags: [
          { name: "classes", link: "" },
          { name: "objects", link: "" },
        ],
      },
      {
        question: "What is encapsulation and why is it important?",
        solution:
          "Encapsulation bundles data (attributes) and methods that operate on that data within a single unit (class). It provides data hiding, controlled access through getters/setters, and maintains object integrity.",
        tags: [{ name: "encapsulation", link: "" }],
      },
      {
        question: "Explain inheritance and its benefits.",
        solution:
          "Inheritance allows a class to inherit properties and methods from another class. Benefits: code reusability, establishing relationships, method overriding, and creating hierarchical classifications.",
        tags: [{ name: "inheritance", link: "" }],
      },
      {
        question: "What is polymorphism and provide an example.",
        solution:
          "Polymorphism allows objects of different classes to be treated as objects of a common base class. Example: different animals (Dog, Cat) implementing a common 'makeSound()' method differently.",
        tags: [{ name: "polymorphism", link: "" }],
      },
    ],
  },
  {
    id: 20,
    topic: "OOP",
    categories: "Senior",
    tags: [
      {
        name: "design patterns",
        link: "",
      },
      {
        name: "SOLID principles",
        link: "",
      },
      {
        name: "composition vs inheritance",
        link: "",
      },
      {
        name: "abstract classes",
        link: "",
      },
      {
        name: "interfaces",
        link: "",
      },
    ],
    prepareLink: "",
    externallinks: [],
    questions: [
      {
        question: "Explain the SOLID principles in OOP.",
        solution:
          "S-Single Responsibility (one reason to change), O-Open/Closed (open for extension, closed for modification), L-Liskov Substitution (subtypes must be substitutable), I-Interface Segregation (many specific interfaces), D-Dependency Inversion (depend on abstractions).",
        tags: [{ name: "SOLID principles", link: "" }],
      },
      {
        question: "When would you choose composition over inheritance?",
        solution:
          "Choose composition when: you need multiple inheritance-like behavior, want loose coupling, need runtime flexibility, or when 'has-a' relationship is more appropriate than 'is-a' relationship.",
        tags: [{ name: "composition vs inheritance", link: "" }],
      },
      {
        question: "What are common design patterns and their use cases?",
        solution:
          "Singleton (single instance), Factory (object creation), Observer (event handling), Strategy (algorithm selection), Decorator (adding behavior), MVC (separation of concerns).",
        tags: [{ name: "design patterns", link: "" }],
      },
    ],
  },
  {
    id: 21,
    topic: "Node",
    categories: "Junior",
    tags: [
      { name: "runtime", link: "" },
      { name: "javascript", link: "" },
      { name: "npm", link: "" },
      { name: "modules", link: "" },
      { name: "fundamentals", link: "" },
    ],
    prepareLink: "",
    externallinks: [],
    questions: [
      {
        question: "What is Node.js?",
        solution:
          "Node.js is an open-source, cross-platform JavaScript runtime environment that allows you to execute JavaScript code outside of a web browser. It's built on Chrome's V8 JavaScript engine and uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js enables developers to use JavaScript for server-side programming, allowing them to build scalable network applications, APIs, web servers, and command-line tools. It comes with a rich ecosystem of libraries through npm (Node Package Manager) and is particularly well-suited for real-time applications, microservices, and I/O-intensive applications.",
      },
      {
        question: "What makes Node.js different from browser JavaScript?",
        solution:
          "Node.js differs from browser JavaScript in several key ways: 1) **Environment APIs**: Node.js has access to file system, network, operating system APIs through modules like 'fs', 'http', 'os', while browsers have DOM, BOM, and Web APIs. 2) **Global Objects**: Node.js has 'global', 'process', '__dirname', '__filename', while browsers have 'window', 'document'. 3) **Module System**: Node.js uses CommonJS (require/module.exports) and ES6 modules, while browsers traditionally used script tags and now support ES6 modules. 4) **Security**: Node.js has full system access, while browsers run in a sandboxed environment. 5) **Runtime**: Node.js runs on servers/computers directly, while browser JavaScript runs within browser engines with security restrictions.",
      },
      {
        question: "What is the V8 engine?",
        solution:
          "V8 is Google's open-source JavaScript engine written in C++ that compiles and executes JavaScript code. It's the same engine that powers Google Chrome browser. V8 converts JavaScript code directly into machine code using Just-In-Time (JIT) compilation, making it extremely fast. Key features include: 1) **Fast execution**: Uses optimization techniques like inline caching and hidden classes. 2) **Memory management**: Automatic garbage collection with generational collection. 3) **Standards compliance**: Supports modern ECMAScript features. 4) **Cross-platform**: Runs on multiple operating systems. Node.js embeds V8 to execute JavaScript on the server-side, extending it with additional APIs for file system, networking, and other system-level operations.",
      },
      {
        question: "Is Node.js single-threaded?",
        solution:
          "Node.js is single-threaded for JavaScript execution but multi-threaded for I/O operations. The **Event Loop** runs on a single thread and handles all JavaScript code execution, callbacks, and events. However, Node.js uses a **Thread Pool** (via libuv) for I/O operations like file system access, DNS lookups, and some crypto operations. This hybrid model works as follows: 1) **Main Thread**: Executes JavaScript code, handles callbacks, and manages the event loop. 2) **Thread Pool**: Handles blocking I/O operations in background threads (default 4 threads). 3) **Event-driven**: When I/O operations complete, callbacks are queued and executed on the main thread. This design allows Node.js to handle thousands of concurrent connections efficiently without creating a thread per connection, making it ideal for I/O-intensive applications.",
      },
      {
        question: "What are the main features of Node.js?",
        solution:
          "Node.js has several key features that make it popular for server-side development: 1) **Asynchronous & Event-Driven**: Non-blocking I/O operations with event-driven architecture for high concurrency. 2) **Fast Execution**: Built on V8 engine for high-performance JavaScript execution. 3) **Single Programming Language**: Use JavaScript for both client and server-side development. 4) **NPM Ecosystem**: Vast library ecosystem with over 1 million packages. 5) **Cross-Platform**: Runs on Windows, macOS, Linux, and various Unix systems. 6) **Lightweight**: Minimal resource consumption due to event-driven model. 7) **Real-time Applications**: Excellent for chat applications, gaming servers, collaboration tools. 8) **Microservices**: Perfect for building scalable microservice architectures. 9) **JSON Support**: Native JSON handling for APIs and data exchange. 10) **Active Community**: Large, active developer community and regular updates.",
      },
      {
        question: "What is NPM?",
        solution:
          "NPM (Node Package Manager) is the default package manager for Node.js and the world's largest software registry. It serves multiple purposes: 1) **Package Registry**: Hosts over 1 million packages that developers can install and use. 2) **Command-Line Tool**: Provides commands to install, update, and manage packages. 3) **Dependency Management**: Handles project dependencies and their versions automatically. 4) **Publishing Platform**: Allows developers to publish and share their packages. Key NPM commands include: 'npm install' (install packages), 'npm init' (initialize project), 'npm start' (run scripts), 'npm update' (update packages), 'npm publish' (publish packages). NPM automatically manages the node_modules folder, package.json file, and handles version conflicts. It supports both local (project-specific) and global (system-wide) package installations.",
      },
      {
        question: "What is package.json?",
        solution:
          "package.json is a JSON file that serves as the manifest for Node.js projects. It contains metadata about the project and manages dependencies. Key sections include: 1) **Basic Info**: name, version, description, author, license. 2) **Dependencies**: Production dependencies (dependencies) and development dependencies (devDependencies). 3) **Scripts**: Custom commands that can be run with 'npm run'. 4) **Entry Point**: Main file specified in 'main' field. 5) **Repository**: Source code repository information. 6) **Keywords**: Tags for package discovery. Example structure: { 'name': 'my-app', 'version': '1.0.0', 'description': 'My application', 'main': 'index.js', 'scripts': { 'start': 'node index.js', 'test': 'jest' }, 'dependencies': { 'express': '^4.18.0' }, 'devDependencies': { 'nodemon': '^2.0.0' } }. This file is essential for npm to understand how to handle the project.",
      },
      {
        question:
          "What is the difference between dependencies and devDependencies?",
        solution:
          "Dependencies and devDependencies serve different purposes in a Node.js project: **Dependencies**: 1) Packages required for the application to run in production. 2) Installed with 'npm install <package>' or 'npm install <package> --save'. 3) Included when someone installs your package. 4) Examples: express, mongoose, lodash, axios. 5) Essential for the application's core functionality. **DevDependencies**: 1) Packages needed only during development and testing. 2) Installed with 'npm install <package> --save-dev'. 3) Not installed in production environments (npm install --production). 4) Examples: nodemon, jest, eslint, webpack, babel. 5) Used for building, testing, linting, and development tools. **Installation behavior**: When you run 'npm install' in development, both are installed. In production environments or with '--production' flag, only dependencies are installed, reducing bundle size and security surface.",
      },
      {
        question: "What is node_modules folder?",
        solution:
          "The node_modules folder is where NPM stores all installed packages and their dependencies for a Node.js project. Key characteristics: 1) **Package Storage**: Contains all installed npm packages as individual folders. 2) **Nested Dependencies**: Each package can have its own node_modules folder for its dependencies. 3) **Auto-generated**: Created automatically when you run 'npm install'. 4) **Large Size**: Can become very large (hundreds of MB or GB) due to dependency trees. 5) **Gitignore**: Should be added to .gitignore as it can be regenerated from package.json. 6) **Flat Structure**: NPM tries to flatten the dependency tree to avoid duplication. 7) **Module Resolution**: Node.js looks for modules in this folder when using require(). 8) **Platform Specific**: May contain platform-specific binaries. **Best Practices**: Don't commit to version control, delete and reinstall when troubleshooting, use 'npm ci' for clean installs in CI/CD environments.",
      },
      {
        question: "What is the purpose of package-lock.json?",
        solution:
          "package-lock.json is an automatically generated file that locks the exact versions of all dependencies and sub-dependencies installed in a project. Its purposes include: 1) **Version Locking**: Records exact versions of all packages in the dependency tree, not just ranges. 2) **Reproducible Builds**: Ensures all team members and deployments use identical dependency versions. 3) **Faster Installs**: NPM can skip version resolution and directly install locked versions. 4) **Security**: Includes integrity hashes to verify package contents haven't been tampered with. 5) **Dependency Tree**: Maps the complete dependency structure including nested dependencies. 6) **Conflict Resolution**: Shows how NPM resolved version conflicts. **Key Differences from package.json**: package.json has version ranges (^1.0.0), while package-lock.json has exact versions (1.0.4). **Best Practices**: Always commit package-lock.json to version control, use 'npm ci' instead of 'npm install' in production/CI for consistent builds based on the lock file.",
      },
      {
        question: "How do you check the version of Node.js?",
        solution:
          "You can check the Node.js version using several command-line methods: 1) **Primary Method**: 'node --version' or 'node -v' - Shows the installed Node.js version (e.g., v18.17.0). 2) **Detailed Info**: 'node --version --verbose' - Provides additional build information. 3) **Within Node REPL**: Type 'process.version' in the Node.js REPL to get the version. 4) **In JavaScript Code**: Use 'console.log(process.version)' in any Node.js script. 5) **NPM Version**: 'npm --version' or 'npm -v' - Shows NPM version bundled with Node.js. 6) **Multiple Versions**: If using version managers like nvm, use 'nvm list' to see all installed versions and 'nvm current' for the active version. 7) **System Info**: 'node -p process.versions' - Shows versions of Node.js, V8, OpenSSL, and other components. These commands help verify installations and ensure compatibility with project requirements.",
      },
      {
        question: "How do you run a Node.js file?",
        solution:
          "There are several ways to run a Node.js file: 1) **Basic Execution**: 'node filename.js' - Runs the specified JavaScript file. 2) **With Arguments**: 'node filename.js arg1 arg2' - Pass command-line arguments accessible via process.argv. 3) **NPM Scripts**: Define scripts in package.json and run with 'npm run scriptname' or 'npm start'. 4) **Direct Execution**: Add shebang '#!/usr/bin/env node' at the top of file and make executable with 'chmod +x filename.js', then run './filename.js'. 5) **Development**: Use 'nodemon filename.js' for automatic restart on file changes. 6) **Debugging**: 'node --inspect filename.js' or 'node --inspect-brk filename.js' for debugging with Chrome DevTools. 7) **Environment Variables**: 'NODE_ENV=production node filename.js' - Set environment variables. 8) **Module Execution**: 'node -e \"console.log('Hello')\"' - Execute code directly from command line.",
      },
      {
        question: "What is REPL in Node.js?",
        solution:
          "REPL stands for Read-Eval-Print Loop, an interactive programming environment in Node.js. It provides a way to interactively run JavaScript code and see immediate results. **How it works**: 1) **Read**: Takes user input (JavaScript expression). 2) **Eval**: Evaluates the JavaScript code. 3) **Print**: Prints the result to the console. 4) **Loop**: Returns to step 1 for next input. **Usage**: Start by typing 'node' without any arguments in the terminal. **Features**: 1) **Interactive Testing**: Test JavaScript code snippets quickly. 2) **Variable Persistence**: Variables remain available throughout the session. 3) **Tab Completion**: Auto-complete for methods and properties. 4) **Special Commands**: '.help' (show commands), '.exit' (quit), '.save filename' (save session), '.load filename' (load file). 5) **Multiline Support**: Use '.editor' for multiline code blocks. **Common Use Cases**: Quick calculations, testing APIs, exploring object properties, learning Node.js features, debugging small code snippets.",
      },
      {
        question: "What are the advantages of Node.js?",
        solution:
          "Node.js offers numerous advantages for modern application development: 1) **High Performance**: V8 engine and event-driven architecture provide excellent performance for I/O operations. 2) **Single Language**: Use JavaScript for both frontend and backend, reducing context switching and enabling code sharing. 3) **Large Ecosystem**: NPM registry with over 1 million packages for rapid development. 4) **Scalability**: Event-driven, non-blocking I/O handles thousands of concurrent connections efficiently. 5) **Real-time Applications**: Excellent for chat apps, gaming, collaborative tools with WebSocket support. 6) **Fast Development**: Rapid prototyping and development due to JavaScript familiarity and rich ecosystem. 7) **Cross-platform**: Runs on Windows, macOS, Linux, and cloud platforms. 8) **Microservices**: Lightweight and perfect for microservice architectures. 9) **JSON Native**: Built-in JSON support for APIs and data exchange. 10) **Active Community**: Large developer community, regular updates, extensive documentation. 11) **Cost-effective**: Reduces development time and resources. 12) **Corporate Support**: Backed by major companies like Netflix, Uber, LinkedIn.",
      },
      {
        question: "What are the disadvantages of Node.js?",
        solution:
          "Despite its advantages, Node.js has several limitations: 1) **Single-threaded Limitations**: CPU-intensive tasks can block the event loop, affecting performance. 2) **Callback Hell**: Nested callbacks can make code difficult to read and maintain (though mitigated by Promises/async-await). 3) **Rapid Changes**: Fast-paced ecosystem can lead to frequent breaking changes and dependency issues. 4) **Memory Consumption**: Can consume significant memory for large applications. 5) **Not Suitable for Heavy Computing**: Poor performance for CPU-intensive operations like image processing, complex calculations. 6) **Unstable APIs**: Some APIs may change between versions, requiring code updates. 7) **Library Quality Variance**: NPM packages vary in quality, maintenance, and security. 8) **Learning Curve**: Asynchronous programming model can be challenging for beginners. 9) **Debugging Complexity**: Debugging asynchronous code and callback chains can be difficult. 10) **Performance Bottlenecks**: Single-threaded nature can create bottlenecks in certain scenarios. 11) **Security Concerns**: Large dependency trees can introduce security vulnerabilities.",
      },
      {
        question: "What is libuv?",
        solution:
          "libuv is a C library that provides Node.js with cross-platform asynchronous I/O capabilities. It's the backbone of Node.js's event-driven, non-blocking I/O model. **Key Features**: 1) **Event Loop**: Implements the core event loop that handles all asynchronous operations. 2) **Thread Pool**: Manages a pool of threads for I/O operations that can't be done asynchronously. 3) **Cross-platform**: Abstracts platform differences between Windows, macOS, and Linux. 4) **File System Operations**: Handles file reading, writing, and directory operations. 5) **Network I/O**: Manages TCP, UDP, and pipe operations. 6) **Process Management**: Spawns and manages child processes. 7) **Signal Handling**: Handles system signals across different platforms. **How it works**: libuv receives I/O requests from Node.js, delegates them to the appropriate system APIs or thread pool, and notifies Node.js when operations complete through callbacks. This architecture allows Node.js to remain responsive while handling multiple concurrent operations efficiently. libuv is also used by other projects beyond Node.js, making it a proven, reliable foundation for asynchronous programming.",
      },
      {
        question: "What is the latest LTS version of Node.js?",
        solution:
          "Node.js follows a predictable release schedule with Long Term Support (LTS) versions released every 12 months in October. LTS versions are recommended for production use as they receive extended support and security updates. **As of early 2025**: Node.js 22.x is the current LTS version, released in October 2024. **LTS Schedule Pattern**: 1) **Even-numbered versions** (18, 20, 22) become LTS releases. 2) **Odd-numbered versions** (17, 19, 21) are current/experimental releases. 3) **Support Duration**: LTS versions receive 18 months of active support + 12 months of maintenance. **Checking Current Version**: Use 'node --version' to check your installed version, or visit nodejs.org for the latest releases. **Version Management**: Consider using nvm (Node Version Manager) to easily switch between different Node.js versions for different projects. **Recommendation**: Always use the latest stable LTS version for production applications to ensure security updates, stability, and long-term support. For learning and experimentation, the current version is fine.",
      },
      {
        question: "How do you create a simple Node.js application?",
        solution:
          "Creating a simple Node.js application involves several steps: **Step 1: Setup Project** - Create a new directory: 'mkdir my-node-app && cd my-node-app' - Initialize package.json: 'npm init -y' **Step 2: Create Main File** Create index.js with basic code: ```javascript const http = require('http'); const hostname = '127.0.0.1'; const port = 3000; const server = http.createServer((req, res) => { res.statusCode = 200; res.setHeader('Content-Type', 'text/plain'); res.end('Hello World\\n'); }); server.listen(port, hostname, () => { console.log(`Server running at http://${hostname}:${port}/`); }); ``` **Step 3: Update package.json** Add start script: 'scripts': { 'start': 'node index.js' } **Step 4: Run Application** Execute with: 'npm start' or 'node index.js' **Step 5: Test** Open browser to 'http://localhost:3000' This creates a basic HTTP server that responds with 'Hello World' to all requests. You can expand this by adding routing, middleware, databases, and other features as needed.",
      },
      {
        question:
          "What is the difference between Node.js and browser environment?",
        solution:
          "Node.js and browser environments differ significantly in their capabilities and restrictions: **Global Objects**: Node.js has 'global', 'process', 'Buffer', '__dirname', '__filename'; browsers have 'window', 'document', 'navigator', 'history'. **APIs Available**: Node.js provides file system ('fs'), HTTP ('http'), operating system ('os'), path utilities; browsers offer DOM manipulation, geolocation, localStorage, Canvas API. **Module Systems**: Node.js supports CommonJS ('require'/'module.exports') and ES modules; browsers traditionally used script tags, now support ES modules. **Security Model**: Node.js has full system access including file system, network, processes; browsers run in sandboxed environment with limited system access. **Runtime Environment**: Node.js runs directly on operating system; browsers run within browser engine with security restrictions. **Use Cases**: Node.js for servers, CLI tools, desktop apps; browsers for user interfaces, client-side logic. **Package Management**: Node.js uses npm with node_modules; browsers load via CDN, bundlers, or ES modules. **Debugging**: Node.js uses built-in debugger, IDE integration; browsers use DevTools. Both share core JavaScript language features but serve different purposes in the development ecosystem.",
      },
      {
        question:
          "What is the purpose of the 'use strict' directive in Node.js?",
        solution:
          "The 'use strict' directive enables JavaScript's strict mode, which enforces stricter parsing and error handling rules. In Node.js, it serves several purposes: **Error Prevention**: 1) **Variable Declaration**: Prevents accidental global variables - must use 'let', 'const', or 'var'. 2) **Assignment Errors**: Throws errors for assignments to non-writable properties, get-only properties, or non-existent properties. 3) **Deletion Restrictions**: Prevents deletion of variables, functions, or function parameters. **Performance Benefits**: 1) **Optimization**: Allows JavaScript engines to perform more optimizations. 2) **Faster Execution**: Eliminates some JavaScript pitfalls that slow down performance. **Syntax Restrictions**: 1) **Reserved Words**: Prevents use of reserved words as variable names. 2) **Octal Literals**: Prohibits octal literal syntax. 3) **Duplicate Parameters**: Prevents duplicate parameter names in functions. **Usage in Node.js**: Add 'use strict'; at the top of files or functions. Modern ES6 modules are automatically in strict mode. **Best Practice**: Always use strict mode in Node.js applications for better code quality, error catching, and performance. It helps catch common mistakes early and promotes better coding practices.",
      },
      {
        question: "What are core modules in Node.js?",
        solution:
          "Core modules are built-in modules that come pre-installed with Node.js and provide essential functionality for server-side development. They don't need to be installed via npm and are available immediately. **Key Core Modules**: 1) **fs (File System)**: Read, write, and manipulate files and directories. 2) **http/https**: Create HTTP servers and clients, handle web requests. 3) **path**: Work with file and directory paths in a cross-platform way. 4) **os**: Access operating system utilities like CPU info, memory, platform details. 5) **url**: Parse and format URLs. 6) **querystring**: Parse and format URL query strings. 7) **crypto**: Cryptographic functionality for hashing, encryption, random data. 8) **events**: Event emitter for implementing event-driven architecture. 9) **stream**: Handle streaming data efficiently. 10) **util**: Utility functions for debugging and object inspection. **Usage**: Import with require(): 'const fs = require('fs');' or ES6 imports: 'import fs from 'fs';' **Advantages**: Always available, optimized for performance, well-documented, maintained by Node.js team, cross-platform compatibility. These modules form the foundation for most Node.js applications and third-party packages.",
      },
      {
        question: "How do you install Node.js?",
        solution:
          "Node.js can be installed through several methods depending on your operating system and requirements: **Official Installer**: 1) Visit nodejs.org and download the installer for your OS. 2) Run the installer and follow the setup wizard. 3) This installs both Node.js and npm automatically. **Package Managers**: 1) **Windows**: 'choco install nodejs' (Chocolatey) or 'winget install OpenJS.NodeJS'. 2) **macOS**: 'brew install node' (Homebrew). 3) **Linux (Ubuntu/Debian)**: 'sudo apt update && sudo apt install nodejs npm'. 4) **Linux (CentOS/RHEL)**: 'sudo yum install nodejs npm'. **Version Managers** (Recommended): 1) **nvm (Linux/macOS)**: Install multiple versions, switch easily. 2) **nvm-windows**: Windows version of nvm. 3) **fnm**: Fast alternative to nvm. **Docker**: Use official Node.js Docker images for containerized development. **Verification**: After installation, verify with 'node --version' and 'npm --version'. **Best Practice**: Use version managers like nvm for development to easily switch between Node.js versions for different projects. Always download from official sources to ensure security.",
      },
      {
        question: "What is nodemon?",
        solution:
          "Nodemon is a development utility that monitors changes in Node.js applications and automatically restarts the server when file changes are detected. It's an essential tool for development productivity. **Key Features**: 1) **Auto-restart**: Automatically restarts your Node.js application when files change. 2) **File Watching**: Monitors files in your project directory for changes. 3) **Configurable**: Customize which files to watch, ignore patterns, and restart delays. 4) **Cross-platform**: Works on Windows, macOS, and Linux. 5) **Zero Config**: Works out of the box with minimal setup. **Benefits**: 1) **Development Speed**: No need to manually restart server after code changes. 2) **Improved Workflow**: Focus on coding instead of server management. 3) **Immediate Feedback**: See changes instantly in browser/API client. **Configuration**: Create nodemon.json for custom settings: { 'watch': ['src'], 'ext': 'js,json', 'ignore': ['node_modules'], 'delay': 1000 }. **Usage Examples**: 'nodemon app.js', 'nodemon --watch src app.js', 'nodemon --exec \"npm start\"'. **Alternative**: Modern alternatives include 'tsx' for TypeScript or built-in '--watch' flag in newer Node.js versions.",
      },
      {
        question: "How do you install nodemon?",
        solution:
          "Nodemon can be installed globally or locally in your project. Here are the different installation methods: **Global Installation** (Recommended for development): 'npm install -g nodemon' - Installs nodemon system-wide, accessible from any project. - Use: 'nodemon app.js' from any directory. **Local Installation**: 'npm install --save-dev nodemon' - Installs in current project only as development dependency. - Use: 'npx nodemon app.js' or add to package.json scripts. **Package.json Script Method**: After local installation, add to scripts: ```json { \"scripts\": { \"dev\": \"nodemon app.js\", \"start\": \"node app.js\" } } ``` Then run: 'npm run dev' **Alternative Package Managers**: 1) **Yarn**: 'yarn global add nodemon' (global) or 'yarn add -D nodemon' (local). 2) **pnpm**: 'pnpm add -g nodemon' (global) or 'pnpm add -D nodemon' (local). **Verification**: Check installation with 'nodemon --version'. **Best Practice**: Install globally for convenience during development, or locally if you want to ensure team members use the same version. Local installation with npm scripts is preferred for team projects.",
      },
      {
        question:
          "What is the difference between local and global package installation?",
        solution:
          "NPM packages can be installed locally (project-specific) or globally (system-wide), each serving different purposes: **Local Installation**: **Command**: 'npm install package-name' **Location**: ./node_modules directory in current project **Usage**: Accessible only within the current project **Benefits**: 1) Project isolation - different projects can use different versions. 2) Dependency tracking in package.json. 3) No version conflicts between projects. 4) Easy to share project requirements with team. **Use Cases**: Project dependencies like express, lodash, react. **Global Installation**: **Command**: 'npm install -g package-name' **Location**: System-wide NPM directory (varies by OS) **Usage**: Accessible from anywhere via command line **Benefits**: 1) Available across all projects. 2) Command-line tools accessible globally. 3) One installation for multiple projects. **Use Cases**: Development tools like nodemon, typescript, create-react-app, http-server. **Best Practices**: 1) Install project dependencies locally. 2) Install CLI tools globally. 3) Use 'npx' to run global packages without installing. 4) Document global dependencies in project README. **Checking Installations**: 'npm list' (local), 'npm list -g' (global).",
      },
      {
        question: "What is npm init?",
        solution:
          '\'npm init\' is a command that initializes a new Node.js project by creating a package.json file with project metadata and configuration. **Basic Usage**: 1) **Interactive Mode**: \'npm init\' - Prompts for project details like name, version, description, entry point, test command, repository, keywords, author, and license. 2) **Quick Mode**: \'npm init -y\' or \'npm init --yes\' - Creates package.json with default values, skipping all prompts. **What it Creates**: A package.json file containing: ```json { "name": "project-name", "version": "1.0.0", "description": "", "main": "index.js", "scripts": { "test": "echo \\"Error: no test specified\\" && exit 1" }, "keywords": [], "author": "", "license": "ISC" } ``` **Customization**: 1) **Default Settings**: Configure defaults with \'npm config set init-*\' commands. 2) **Templates**: Use custom templates with \'npm init <template-name>\'. **Benefits**: 1) Standardizes project structure. 2) Enables dependency management. 3) Allows npm script definitions. 4) Required for publishing to npm registry. **Best Practice**: Always run \'npm init\' when starting a new Node.js project to establish proper package management from the beginning.',
      },
      {
        question: "What are npm scripts?",
        solution:
          "NPM scripts are custom commands defined in the package.json file that can be executed using 'npm run <script-name>'. They provide a way to automate common development tasks and standardize workflows across teams. **Definition**: Scripts are defined in the 'scripts' section of package.json: ```json { \"scripts\": { \"start\": \"node server.js\", \"dev\": \"nodemon app.js\", \"test\": \"jest\", \"build\": \"webpack --mode=production\", \"lint\": \"eslint src/\", \"clean\": \"rm -rf dist/\" } } ``` **Execution**: 1) **Standard Scripts**: 'npm start', 'npm test' (don't need 'run'). 2) **Custom Scripts**: 'npm run dev', 'npm run build', 'npm run lint'. **Features**: 1) **Environment Variables**: Access via 'process.env.npm_package_*'. 2) **Pre/Post Hooks**: 'prestart', 'postinstall' scripts run automatically. 3) **Script Chaining**: Use '&&' for sequential execution, '&' for parallel. 4) **Cross-platform**: Works consistently across different operating systems. **Benefits**: 1) Standardizes team workflows. 2) Documents common tasks. 3) Simplifies complex commands. 4) Enables CI/CD integration. **Best Practices**: Keep scripts simple, use descriptive names, document complex scripts, use lifecycle hooks appropriately.",
      },
      {
        question: "How do you uninstall an npm package?",
        solution:
          "NPM provides several commands to uninstall packages depending on how they were installed: **Local Package Removal**: 1) **Remove from dependencies**: 'npm uninstall package-name' or 'npm remove package-name' or 'npm rm package-name' - Removes package from node_modules and package.json dependencies. 2) **Remove devDependency**: 'npm uninstall package-name --save-dev' - Removes from devDependencies section. **Global Package Removal**: 'npm uninstall -g package-name' - Removes globally installed package. **Multiple Packages**: 'npm uninstall package1 package2 package3' - Remove multiple packages at once. **Verification**: 1) **Check local packages**: 'npm list' - Shows installed packages. 2) **Check global packages**: 'npm list -g --depth=0' - Shows global packages. **Alternative Commands**: 1) **Yarn**: 'yarn remove package-name'. 2) **pnpm**: 'pnpm remove package-name'. **Clean Installation**: 1) Delete node_modules: 'rm -rf node_modules'. 2) Reinstall: 'npm install' - Useful for troubleshooting. **Best Practices**: Always update package.json when removing dependencies, clean up unused packages regularly, use 'npm audit' to check for vulnerabilities in remaining packages.",
      },
      {
        question: "What is Node.js?",
        solution:
          "Node.js is an open-source, cross-platform JavaScript runtime environment that allows you to execute JavaScript code outside of a web browser. It's built on Chrome's V8 JavaScript engine and uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js enables developers to use JavaScript for server-side programming, allowing them to build scalable network applications, APIs, web servers, and command-line tools. It comes with a rich ecosystem of libraries through npm (Node Package Manager) and is particularly well-suited for real-time applications, microservices, and I/O-intensive applications.",
      },
      {
        question: "What makes Node.js different from browser JavaScript?",
        solution:
          "Node.js differs from browser JavaScript in several key ways: 1) **Environment APIs**: Node.js has access to file system, network, operating system APIs through modules like 'fs', 'http', 'os', while browsers have DOM, BOM, and Web APIs. 2) **Global Objects**: Node.js has 'global', 'process', '__dirname', '__filename', while browsers have 'window', 'document'. 3) **Module System**: Node.js uses CommonJS (require/module.exports) and ES6 modules, while browsers traditionally used script tags and now support ES6 modules. 4) **Security**: Node.js has full system access, while browsers run in a sandboxed environment. 5) **Runtime**: Node.js runs on servers/computers directly, while browser JavaScript runs within browser engines with security restrictions.",
      },
      {
        question: "What is the V8 engine?",
        solution:
          "V8 is Google's open-source JavaScript engine written in C++ that compiles and executes JavaScript code. It's the same engine that powers Google Chrome browser. V8 converts JavaScript code directly into machine code using Just-In-Time (JIT) compilation, making it extremely fast. Key features include: 1) **Fast execution**: Uses optimization techniques like inline caching and hidden classes. 2) **Memory management**: Automatic garbage collection with generational collection. 3) **Standards compliance**: Supports modern ECMAScript features. 4) **Cross-platform**: Runs on multiple operating systems. Node.js embeds V8 to execute JavaScript on the server-side, extending it with additional APIs for file system, networking, and other system-level operations.",
      },
      {
        question: "Is Node.js single-threaded?",
        solution:
          "Node.js is single-threaded for JavaScript execution but multi-threaded for I/O operations. The **Event Loop** runs on a single thread and handles all JavaScript code execution, callbacks, and events. However, Node.js uses a **Thread Pool** (via libuv) for I/O operations like file system access, DNS lookups, and some crypto operations. This hybrid model works as follows: 1) **Main Thread**: Executes JavaScript code, handles callbacks, and manages the event loop. 2) **Thread Pool**: Handles blocking I/O operations in background threads (default 4 threads). 3) **Event-driven**: When I/O operations complete, callbacks are queued and executed on the main thread. This design allows Node.js to handle thousands of concurrent connections efficiently without creating a thread per connection, making it ideal for I/O-intensive applications.",
      },
      {
        question: "What are the main features of Node.js?",
        solution:
          "Node.js has several key features that make it popular for server-side development: 1) **Asynchronous & Event-Driven**: Non-blocking I/O operations with event-driven architecture for high concurrency. 2) **Fast Execution**: Built on V8 engine for high-performance JavaScript execution. 3) **Single Programming Language**: Use JavaScript for both client and server-side development. 4) **NPM Ecosystem**: Vast library ecosystem with over 1 million packages. 5) **Cross-Platform**: Runs on Windows, macOS, Linux, and various Unix systems. 6) **Lightweight**: Minimal resource consumption due to event-driven model. 7) **Real-time Applications**: Excellent for chat applications, gaming servers, collaboration tools. 8) **Microservices**: Perfect for building scalable microservice architectures. 9) **JSON Support**: Native JSON handling for APIs and data exchange. 10) **Active Community**: Large, active developer community and regular updates.",
      },
      {
        question: "What is NPM?",
        solution:
          "NPM (Node Package Manager) is the default package manager for Node.js and the world's largest software registry. It serves multiple purposes: 1) **Package Registry**: Hosts over 1 million packages that developers can install and use. 2) **Command-Line Tool**: Provides commands to install, update, and manage packages. 3) **Dependency Management**: Handles project dependencies and their versions automatically. 4) **Publishing Platform**: Allows developers to publish and share their packages. Key NPM commands include: 'npm install' (install packages), 'npm init' (initialize project), 'npm start' (run scripts), 'npm update' (update packages), 'npm publish' (publish packages). NPM automatically manages the node_modules folder, package.json file, and handles version conflicts. It supports both local (project-specific) and global (system-wide) package installations.",
      },
      {
        question: "What is package.json?",
        solution:
          "package.json is a JSON file that serves as the manifest for Node.js projects. It contains metadata about the project and manages dependencies. Key sections include: 1) **Basic Info**: name, version, description, author, license. 2) **Dependencies**: Production dependencies (dependencies) and development dependencies (devDependencies). 3) **Scripts**: Custom commands that can be run with 'npm run'. 4) **Entry Point**: Main file specified in 'main' field. 5) **Repository**: Source code repository information. 6) **Keywords**: Tags for package discovery. Example structure: { 'name': 'my-app', 'version': '1.0.0', 'description': 'My application', 'main': 'index.js', 'scripts': { 'start': 'node index.js', 'test': 'jest' }, 'dependencies': { 'express': '^4.18.0' }, 'devDependencies': { 'nodemon': '^2.0.0' } }. This file is essential for npm to understand how to handle the project.",
      },
      {
        question:
          "What is the difference between dependencies and devDependencies?",
        solution:
          "Dependencies and devDependencies serve different purposes in a Node.js project: **Dependencies**: 1) Packages required for the application to run in production. 2) Installed with 'npm install <package>' or 'npm install <package> --save'. 3) Included when someone installs your package. 4) Examples: express, mongoose, lodash, axios. 5) Essential for the application's core functionality. **DevDependencies**: 1) Packages needed only during development and testing. 2) Installed with 'npm install <package> --save-dev'. 3) Not installed in production environments (npm install --production). 4) Examples: nodemon, jest, eslint, webpack, babel. 5) Used for building, testing, linting, and development tools. **Installation behavior**: When you run 'npm install' in development, both are installed. In production environments or with '--production' flag, only dependencies are installed, reducing bundle size and security surface.",
      },
      {
        question: "What is node_modules folder?",
        solution:
          "The node_modules folder is where NPM stores all installed packages and their dependencies for a Node.js project. Key characteristics: 1) **Package Storage**: Contains all installed npm packages as individual folders. 2) **Nested Dependencies**: Each package can have its own node_modules folder for its dependencies. 3) **Auto-generated**: Created automatically when you run 'npm install'. 4) **Large Size**: Can become very large (hundreds of MB or GB) due to dependency trees. 5) **Gitignore**: Should be added to .gitignore as it can be regenerated from package.json. 6) **Flat Structure**: NPM tries to flatten the dependency tree to avoid duplication. 7) **Module Resolution**: Node.js looks for modules in this folder when using require(). 8) **Platform Specific**: May contain platform-specific binaries. **Best Practices**: Don't commit to version control, delete and reinstall when troubleshooting, use 'npm ci' for clean installs in CI/CD environments.",
      },
      {
        question: "What is the purpose of package-lock.json?",
        solution:
          "package-lock.json is an automatically generated file that locks the exact versions of all dependencies and sub-dependencies installed in a project. Its purposes include: 1) **Version Locking**: Records exact versions of all packages in the dependency tree, not just ranges. 2) **Reproducible Builds**: Ensures all team members and deployments use identical dependency versions. 3) **Faster Installs**: NPM can skip version resolution and directly install locked versions. 4) **Security**: Includes integrity hashes to verify package contents haven't been tampered with. 5) **Dependency Tree**: Maps the complete dependency structure including nested dependencies. 6) **Conflict Resolution**: Shows how NPM resolved version conflicts. **Key Differences from package.json**: package.json has version ranges (^1.0.0), while package-lock.json has exact versions (1.0.4). **Best Practices**: Always commit package-lock.json to version control, use 'npm ci' instead of 'npm install' in production/CI for consistent builds based on the lock file.",
      },
      {
        question: "How do you check the version of Node.js?",
        solution:
          "You can check the Node.js version using several command-line methods: 1) **Primary Method**: 'node --version' or 'node -v' - Shows the installed Node.js version (e.g., v18.17.0). 2) **Detailed Info**: 'node --version --verbose' - Provides additional build information. 3) **Within Node REPL**: Type 'process.version' in the Node.js REPL to get the version. 4) **In JavaScript Code**: Use 'console.log(process.version)' in any Node.js script. 5) **NPM Version**: 'npm --version' or 'npm -v' - Shows NPM version bundled with Node.js. 6) **Multiple Versions**: If using version managers like nvm, use 'nvm list' to see all installed versions and 'nvm current' for the active version. 7) **System Info**: 'node -p process.versions' - Shows versions of Node.js, V8, OpenSSL, and other components. These commands help verify installations and ensure compatibility with project requirements.",
      },
      {
        question: "How do you run a Node.js file?",
        solution:
          "There are several ways to run a Node.js file: 1) **Basic Execution**: 'node filename.js' - Runs the specified JavaScript file. 2) **With Arguments**: 'node filename.js arg1 arg2' - Pass command-line arguments accessible via process.argv. 3) **NPM Scripts**: Define scripts in package.json and run with 'npm run scriptname' or 'npm start'. 4) **Direct Execution**: Add shebang '#!/usr/bin/env node' at the top of file and make executable with 'chmod +x filename.js', then run './filename.js'. 5) **Development**: Use 'nodemon filename.js' for automatic restart on file changes. 6) **Debugging**: 'node --inspect filename.js' or 'node --inspect-brk filename.js' for debugging with Chrome DevTools. 7) **Environment Variables**: 'NODE_ENV=production node filename.js' - Set environment variables. 8) **Module Execution**: 'node -e \"console.log('Hello')\"' - Execute code directly from command line.",
      },
      {
        question: "What is REPL in Node.js?",
        solution:
          "REPL stands for Read-Eval-Print Loop, an interactive programming environment in Node.js. It provides a way to interactively run JavaScript code and see immediate results. **How it works**: 1) **Read**: Takes user input (JavaScript expression). 2) **Eval**: Evaluates the JavaScript code. 3) **Print**: Prints the result to the console. 4) **Loop**: Returns to step 1 for next input. **Usage**: Start by typing 'node' without any arguments in the terminal. **Features**: 1) **Interactive Testing**: Test JavaScript code snippets quickly. 2) **Variable Persistence**: Variables remain available throughout the session. 3) **Tab Completion**: Auto-complete for methods and properties. 4) **Special Commands**: '.help' (show commands), '.exit' (quit), '.save filename' (save session), '.load filename' (load file). 5) **Multiline Support**: Use '.editor' for multiline code blocks. **Common Use Cases**: Quick calculations, testing APIs, exploring object properties, learning Node.js features, debugging small code snippets.",
      },
      {
        question: "What are the advantages of Node.js?",
        solution:
          "Node.js offers numerous advantages for modern application development: 1) **High Performance**: V8 engine and event-driven architecture provide excellent performance for I/O operations. 2) **Single Language**: Use JavaScript for both frontend and backend, reducing context switching and enabling code sharing. 3) **Large Ecosystem**: NPM registry with over 1 million packages for rapid development. 4) **Scalability**: Event-driven, non-blocking I/O handles thousands of concurrent connections efficiently. 5) **Real-time Applications**: Excellent for chat apps, gaming, collaborative tools with WebSocket support. 6) **Fast Development**: Rapid prototyping and development due to JavaScript familiarity and rich ecosystem. 7) **Cross-platform**: Runs on Windows, macOS, Linux, and cloud platforms. 8) **Microservices**: Lightweight and perfect for microservice architectures. 9) **JSON Native**: Built-in JSON support for APIs and data exchange. 10) **Active Community**: Large developer community, regular updates, extensive documentation. 11) **Cost-effective**: Reduces development time and resources. 12) **Corporate Support**: Backed by major companies like Netflix, Uber, LinkedIn.",
      },
      {
        question: "What are the disadvantages of Node.js?",
        solution:
          "Despite its advantages, Node.js has several limitations: 1) **Single-threaded Limitations**: CPU-intensive tasks can block the event loop, affecting performance. 2) **Callback Hell**: Nested callbacks can make code difficult to read and maintain (though mitigated by Promises/async-await). 3) **Rapid Changes**: Fast-paced ecosystem can lead to frequent breaking changes and dependency issues. 4) **Memory Consumption**: Can consume significant memory for large applications. 5) **Not Suitable for Heavy Computing**: Poor performance for CPU-intensive operations like image processing, complex calculations. 6) **Unstable APIs**: Some APIs may change between versions, requiring code updates. 7) **Library Quality Variance**: NPM packages vary in quality, maintenance, and security. 8) **Learning Curve**: Asynchronous programming model can be challenging for beginners. 9) **Debugging Complexity**: Debugging asynchronous code and callback chains can be difficult. 10) **Performance Bottlenecks**: Single-threaded nature can create bottlenecks in certain scenarios. 11) **Security Concerns**: Large dependency trees can introduce security vulnerabilities.",
      },
      {
        question: "What is libuv?",
        solution:
          "libuv is a C library that provides Node.js with cross-platform asynchronous I/O capabilities. It's the backbone of Node.js's event-driven, non-blocking I/O model. **Key Features**: 1) **Event Loop**: Implements the core event loop that handles all asynchronous operations. 2) **Thread Pool**: Manages a pool of threads for I/O operations that can't be done asynchronously. 3) **Cross-platform**: Abstracts platform differences between Windows, macOS, and Linux. 4) **File System Operations**: Handles file reading, writing, and directory operations. 5) **Network I/O**: Manages TCP, UDP, and pipe operations. 6) **Process Management**: Spawns and manages child processes. 7) **Signal Handling**: Handles system signals across different platforms. **How it works**: libuv receives I/O requests from Node.js, delegates them to the appropriate system APIs or thread pool, and notifies Node.js when operations complete through callbacks. This architecture allows Node.js to remain responsive while handling multiple concurrent operations efficiently. libuv is also used by other projects beyond Node.js, making it a proven, reliable foundation for asynchronous programming.",
      },
      {
        question: "What is the latest LTS version of Node.js?",
        solution:
          "Node.js follows a predictable release schedule with Long Term Support (LTS) versions released every 12 months in October. LTS versions are recommended for production use as they receive extended support and security updates. **As of early 2025**: Node.js 22.x is the current LTS version, released in October 2024. **LTS Schedule Pattern**: 1) **Even-numbered versions** (18, 20, 22) become LTS releases. 2) **Odd-numbered versions** (17, 19, 21) are current/experimental releases. 3) **Support Duration**: LTS versions receive 18 months of active support + 12 months of maintenance. **Checking Current Version**: Use 'node --version' to check your installed version, or visit nodejs.org for the latest releases. **Version Management**: Consider using nvm (Node Version Manager) to easily switch between different Node.js versions for different projects. **Recommendation**: Always use the latest stable LTS version for production applications to ensure security updates, stability, and long-term support. For learning and experimentation, the current version is fine.",
      },
      {
        question: "How do you create a simple Node.js application?",
        solution:
          "Creating a simple Node.js application involves several steps: **Step 1: Setup Project** - Create a new directory: 'mkdir my-node-app && cd my-node-app' - Initialize package.json: 'npm init -y' **Step 2: Create Main File** Create index.js with basic code: ```javascript const http = require('http'); const hostname = '127.0.0.1'; const port = 3000; const server = http.createServer((req, res) => { res.statusCode = 200; res.setHeader('Content-Type', 'text/plain'); res.end('Hello World\\n'); }); server.listen(port, hostname, () => { console.log(`Server running at http://${hostname}:${port}/`); }); ``` **Step 3: Update package.json** Add start script: 'scripts': { 'start': 'node index.js' } **Step 4: Run Application** Execute with: 'npm start' or 'node index.js' **Step 5: Test** Open browser to 'http://localhost:3000' This creates a basic HTTP server that responds with 'Hello World' to all requests. You can expand this by adding routing, middleware, databases, and other features as needed.",
      },
      {
        question:
          "What is the difference between Node.js and browser environment?",
        solution:
          "Node.js and browser environments differ significantly in their capabilities and restrictions: **Global Objects**: Node.js has 'global', 'process', 'Buffer', '__dirname', '__filename'; browsers have 'window', 'document', 'navigator', 'history'. **APIs Available**: Node.js provides file system ('fs'), HTTP ('http'), operating system ('os'), path utilities; browsers offer DOM manipulation, geolocation, localStorage, Canvas API. **Module Systems**: Node.js supports CommonJS ('require'/'module.exports') and ES modules; browsers traditionally used script tags, now support ES modules. **Security Model**: Node.js has full system access including file system, network, processes; browsers run in sandboxed environment with limited system access. **Runtime Environment**: Node.js runs directly on operating system; browsers run within browser engine with security restrictions. **Use Cases**: Node.js for servers, CLI tools, desktop apps; browsers for user interfaces, client-side logic. **Package Management**: Node.js uses npm with node_modules; browsers load via CDN, bundlers, or ES modules. **Debugging**: Node.js uses built-in debugger, IDE integration; browsers use DevTools. Both share core JavaScript language features but serve different purposes in the development ecosystem.",
      },
      {
        question:
          "What is the purpose of the 'use strict' directive in Node.js?",
        solution:
          "The 'use strict' directive enables JavaScript's strict mode, which enforces stricter parsing and error handling rules. In Node.js, it serves several purposes: **Error Prevention**: 1) **Variable Declaration**: Prevents accidental global variables - must use 'let', 'const', or 'var'. 2) **Assignment Errors**: Throws errors for assignments to non-writable properties, get-only properties, or non-existent properties. 3) **Deletion Restrictions**: Prevents deletion of variables, functions, or function parameters. **Performance Benefits**: 1) **Optimization**: Allows JavaScript engines to perform more optimizations. 2) **Faster Execution**: Eliminates some JavaScript pitfalls that slow down performance. **Syntax Restrictions**: 1) **Reserved Words**: Prevents use of reserved words as variable names. 2) **Octal Literals**: Prohibits octal literal syntax. 3) **Duplicate Parameters**: Prevents duplicate parameter names in functions. **Usage in Node.js**: Add 'use strict'; at the top of files or functions. Modern ES6 modules are automatically in strict mode. **Best Practice**: Always use strict mode in Node.js applications for better code quality, error catching, and performance. It helps catch common mistakes early and promotes better coding practices.",
      },
      {
        question: "What are core modules in Node.js?",
        solution:
          "Core modules are built-in modules that come pre-installed with Node.js and provide essential functionality for server-side development. They don't need to be installed via npm and are available immediately. **Key Core Modules**: 1) **fs (File System)**: Read, write, and manipulate files and directories. 2) **http/https**: Create HTTP servers and clients, handle web requests. 3) **path**: Work with file and directory paths in a cross-platform way. 4) **os**: Access operating system utilities like CPU info, memory, platform details. 5) **url**: Parse and format URLs. 6) **querystring**: Parse and format URL query strings. 7) **crypto**: Cryptographic functionality for hashing, encryption, random data. 8) **events**: Event emitter for implementing event-driven architecture. 9) **stream**: Handle streaming data efficiently. 10) **util**: Utility functions for debugging and object inspection. **Usage**: Import with require(): 'const fs = require('fs');' or ES6 imports: 'import fs from 'fs';' **Advantages**: Always available, optimized for performance, well-documented, maintained by Node.js team, cross-platform compatibility. These modules form the foundation for most Node.js applications and third-party packages.",
      },
      {
        question: "How do you install Node.js?",
        solution:
          "Node.js can be installed through several methods depending on your operating system and requirements: **Official Installer**: 1) Visit nodejs.org and download the installer for your OS. 2) Run the installer and follow the setup wizard. 3) This installs both Node.js and npm automatically. **Package Managers**: 1) **Windows**: 'choco install nodejs' (Chocolatey) or 'winget install OpenJS.NodeJS'. 2) **macOS**: 'brew install node' (Homebrew). 3) **Linux (Ubuntu/Debian)**: 'sudo apt update && sudo apt install nodejs npm'. 4) **Linux (CentOS/RHEL)**: 'sudo yum install nodejs npm'. **Version Managers** (Recommended): 1) **nvm (Linux/macOS)**: Install multiple versions, switch easily. 2) **nvm-windows**: Windows version of nvm. 3) **fnm**: Fast alternative to nvm. **Docker**: Use official Node.js Docker images for containerized development. **Verification**: After installation, verify with 'node --version' and 'npm --version'. **Best Practice**: Use version managers like nvm for development to easily switch between Node.js versions for different projects. Always download from official sources to ensure security.",
      },
      {
        question: "What is nodemon?",
        solution:
          "Nodemon is a development utility that monitors changes in Node.js applications and automatically restarts the server when file changes are detected. It's an essential tool for development productivity. **Key Features**: 1) **Auto-restart**: Automatically restarts your Node.js application when files change. 2) **File Watching**: Monitors files in your project directory for changes. 3) **Configurable**: Customize which files to watch, ignore patterns, and restart delays. 4) **Cross-platform**: Works on Windows, macOS, and Linux. 5) **Zero Config**: Works out of the box with minimal setup. **Benefits**: 1) **Development Speed**: No need to manually restart server after code changes. 2) **Improved Workflow**: Focus on coding instead of server management. 3) **Immediate Feedback**: See changes instantly in browser/API client. **Configuration**: Create nodemon.json for custom settings: { 'watch': ['src'], 'ext': 'js,json', 'ignore': ['node_modules'], 'delay': 1000 }. **Usage Examples**: 'nodemon app.js', 'nodemon --watch src app.js', 'nodemon --exec \"npm start\"'. **Alternative**: Modern alternatives include 'tsx' for TypeScript or built-in '--watch' flag in newer Node.js versions.",
      },
      {
        question: "How do you install nodemon?",
        solution:
          "Nodemon can be installed globally or locally in your project. Here are the different installation methods: **Global Installation** (Recommended for development): 'npm install -g nodemon' - Installs nodemon system-wide, accessible from any project. - Use: 'nodemon app.js' from any directory. **Local Installation**: 'npm install --save-dev nodemon' - Installs in current project only as development dependency. - Use: 'npx nodemon app.js' or add to package.json scripts. **Package.json Script Method**: After local installation, add to scripts: ```json { \"scripts\": { \"dev\": \"nodemon app.js\", \"start\": \"node app.js\" } } ``` Then run: 'npm run dev' **Alternative Package Managers**: 1) **Yarn**: 'yarn global add nodemon' (global) or 'yarn add -D nodemon' (local). 2) **pnpm**: 'pnpm add -g nodemon' (global) or 'pnpm add -D nodemon' (local). **Verification**: Check installation with 'nodemon --version'. **Best Practice**: Install globally for convenience during development, or locally if you want to ensure team members use the same version. Local installation with npm scripts is preferred for team projects.",
      },
      {
        question:
          "What is the difference between local and global package installation?",
        solution:
          "NPM packages can be installed locally (project-specific) or globally (system-wide), each serving different purposes: **Local Installation**: **Command**: 'npm install package-name' **Location**: ./node_modules directory in current project **Usage**: Accessible only within the current project **Benefits**: 1) Project isolation - different projects can use different versions. 2) Dependency tracking in package.json. 3) No version conflicts between projects. 4) Easy to share project requirements with team. **Use Cases**: Project dependencies like express, lodash, react. **Global Installation**: **Command**: 'npm install -g package-name' **Location**: System-wide NPM directory (varies by OS) **Usage**: Accessible from anywhere via command line **Benefits**: 1) Available across all projects. 2) Command-line tools accessible globally. 3) One installation for multiple projects. **Use Cases**: Development tools like nodemon, typescript, create-react-app, http-server. **Best Practices**: 1) Install project dependencies locally. 2) Install CLI tools globally. 3) Use 'npx' to run global packages without installing. 4) Document global dependencies in project README. **Checking Installations**: 'npm list' (local), 'npm list -g' (global).",
      },
      {
        question: "What is npm init?",
        solution:
          '\'npm init\' is a command that initializes a new Node.js project by creating a package.json file with project metadata and configuration. **Basic Usage**: 1) **Interactive Mode**: \'npm init\' - Prompts for project details like name, version, description, entry point, test command, repository, keywords, author, and license. 2) **Quick Mode**: \'npm init -y\' or \'npm init --yes\' - Creates package.json with default values, skipping all prompts. **What it Creates**: A package.json file containing: ```json { "name": "project-name", "version": "1.0.0", "description": "", "main": "index.js", "scripts": { "test": "echo \\"Error: no test specified\\" && exit 1" }, "keywords": [], "author": "", "license": "ISC" } ``` **Customization**: 1) **Default Settings**: Configure defaults with \'npm config set init-*\' commands. 2) **Templates**: Use custom templates with \'npm init <template-name>\'. **Benefits**: 1) Standardizes project structure. 2) Enables dependency management. 3) Allows npm script definitions. 4) Required for publishing to npm registry. **Best Practice**: Always run \'npm init\' when starting a new Node.js project to establish proper package management from the beginning.',
      },
      {
        question: "What are npm scripts?",
        solution:
          "NPM scripts are custom commands defined in the package.json file that can be executed using 'npm run <script-name>'. They provide a way to automate common development tasks and standardize workflows across teams. **Definition**: Scripts are defined in the 'scripts' section of package.json: ```json { \"scripts\": { \"start\": \"node server.js\", \"dev\": \"nodemon app.js\", \"test\": \"jest\", \"build\": \"webpack --mode=production\", \"lint\": \"eslint src/\", \"clean\": \"rm -rf dist/\" } } ``` **Execution**: 1) **Standard Scripts**: 'npm start', 'npm test' (don't need 'run'). 2) **Custom Scripts**: 'npm run dev', 'npm run build', 'npm run lint'. **Features**: 1) **Environment Variables**: Access via 'process.env.npm_package_*'. 2) **Pre/Post Hooks**: 'prestart', 'postinstall' scripts run automatically. 3) **Script Chaining**: Use '&&' for sequential execution, '&' for parallel. 4) **Cross-platform**: Works consistently across different operating systems. **Benefits**: 1) Standardizes team workflows. 2) Documents common tasks. 3) Simplifies complex commands. 4) Enables CI/CD integration. **Best Practices**: Keep scripts simple, use descriptive names, document complex scripts, use lifecycle hooks appropriately.",
      },
      {
        question: "How do you uninstall an npm package?",
        solution:
          "NPM provides several commands to uninstall packages depending on how they were installed: **Local Package Removal**: 1) **Remove from dependencies**: 'npm uninstall package-name' or 'npm remove package-name' or 'npm rm package-name' - Removes package from node_modules and package.json dependencies. 2) **Remove devDependency**: 'npm uninstall package-name --save-dev' - Removes from devDependencies section. **Global Package Removal**: 'npm uninstall -g package-name' - Removes globally installed package. **Multiple Packages**: 'npm uninstall package1 package2 package3' - Remove multiple packages at once. **Verification**: 1) **Check local packages**: 'npm list' - Shows installed packages. 2) **Check global packages**: 'npm list -g --depth=0' - Shows global packages. **Alternative Commands**: 1) **Yarn**: 'yarn remove package-name'. 2) **pnpm**: 'pnpm remove package-name'. **Clean Installation**: 1) Delete node_modules: 'rm -rf node_modules'. 2) Reinstall: 'npm install' - Useful for troubleshooting. **Best Practices**: Always update package.json when removing dependencies, clean up unused packages regularly, use 'npm audit' to check for vulnerabilities in remaining packages.",
      },
      {
        question: "What is semantic versioning?",
        solution:
          "Semantic versioning (SemVer) is a versioning scheme that uses a three-part number format: MAJOR.MINOR.PATCH (e.g., 2.1.4). Each part has specific meaning: **MAJOR version** (2): Incremented for breaking changes that are not backward compatible. **MINOR version** (1): Incremented for new features that are backward compatible. **PATCH version** (4): Incremented for backward-compatible bug fixes. **Additional Labels**: Pre-release versions can include labels like 1.0.0-alpha, 1.0.0-beta, 1.0.0-rc1. **Benefits**: 1) Predictable updates - developers know what type of changes to expect. 2) Dependency management - tools can automatically update to compatible versions. 3) Communication - clearly indicates the nature of changes. **Rules**: Start at 0.1.0 for initial development, 1.0.0 for first stable release. Never reuse version numbers. Always increment the leftmost non-zero digit when making breaking changes. **NPM Integration**: NPM uses SemVer for package versioning, and dependency ranges (^, ~) are based on SemVer principles.",
      },
      {
        question: "What does the ^ and ~ symbol mean in package.json versions?",
        solution:
          "The ^ (caret) and ~ (tilde) symbols in package.json define version ranges for automatic updates while maintaining compatibility: **Caret (^) - Compatible Within Major Version**: '^1.2.3' accepts any version >=1.2.3 and <2.0.0. Examples: ^1.2.3 allows 1.2.4, 1.3.0, 1.9.9 but not 2.0.0. ^0.2.3 allows 0.2.4, 0.2.9 but not 0.3.0 (special rule for 0.x versions). **Tilde (~) - Compatible Within Minor Version**: '~1.2.3' accepts any version >=1.2.3 and <1.3.0. Examples: ~1.2.3 allows 1.2.4, 1.2.9 but not 1.3.0. ~1.2 allows any 1.2.x version. **Other Operators**: '1.2.3' (exact version), '>1.2.3', '>=1.2.3', '<2.0.0', '<=1.9.9', '1.2.x' (any patch version). **Range Combinations**: '>=1.2.3 <2.0.0' (custom range), '1.2.3 - 1.5.0' (inclusive range). **Best Practices**: Use ^ for most dependencies to get bug fixes and new features automatically. Use ~ for more conservative updates. Use exact versions for critical dependencies where stability is paramount.",
      },
      {
        question: "What is the Event Loop in Node.js?",
        solution:
          "The Event Loop is the core mechanism that enables Node.js to perform non-blocking I/O operations despite being single-threaded. It's what allows Node.js to handle thousands of concurrent operations efficiently. **How it Works**: 1) **Single Thread**: JavaScript execution happens on one main thread. 2) **Event-driven**: Operations are queued as events and processed asynchronously. 3) **Callback Queue**: Completed operations place callbacks in queues for execution. 4) **Continuous Loop**: The event loop continuously checks for and executes pending callbacks. **Process Flow**: 1) Execute synchronous code first. 2) Process completed I/O operations from libuv. 3) Execute callbacks from various queues in specific order. 4) Check for new I/O operations to initiate. 5) Repeat the cycle. **Key Components**: Call stack (current execution), callback queues (pending operations), libuv (I/O operations), heap (memory allocation). **Benefits**: Handles many concurrent connections without creating threads per connection, efficient memory usage, excellent for I/O-intensive applications. **Limitation**: CPU-intensive operations can block the event loop, affecting responsiveness.",
      },
      {
        question: "What are the phases of the Event Loop?",
        solution:
          "The Node.js Event Loop operates in six distinct phases, each with a specific purpose and queue: **1. Timer Phase**: Executes callbacks scheduled by setTimeout() and setInterval(). Checks if any timer callbacks are ready to run based on their delay. **2. Pending Callbacks Phase**: Executes I/O callbacks that were deferred to the next loop iteration. Handles some system operations like TCP errors. **3. Idle, Prepare Phase**: Internal use only by libuv. Not directly observable in JavaScript code. **4. Poll Phase**: The most important phase. Fetches new I/O events and executes I/O callbacks. If no callbacks are ready, may wait for new I/O events. Can block here if no timers are scheduled. **5. Check Phase**: Executes setImmediate() callbacks. Runs immediately after the poll phase completes. **6. Close Callbacks Phase**: Executes close event callbacks (e.g., socket.on('close')). **Special Queues**: process.nextTick() callbacks execute between each phase. Promise callbacks (microtasks) also execute between phases. **Execution Order**: Each phase completes fully before moving to the next, with nextTick and microtasks processed between phases.",
      },
      {
        question: "What is non-blocking I/O?",
        solution:
          "Non-blocking I/O is a programming model where I/O operations (like reading files, network requests, database queries) don't stop the execution of other code while waiting for completion. **How it Works**: 1) **Initiate Operation**: Start an I/O operation (file read, HTTP request). 2) **Continue Execution**: Code continues running immediately without waiting. 3) **Callback/Promise**: When operation completes, a callback or promise resolution handles the result. 4) **Event Loop**: The event loop manages when callbacks execute. **Example - Non-blocking**: ```javascript fs.readFile('file.txt', (err, data) => { console.log('File contents:', data); }); console.log('This runs immediately'); ``` **Contrast - Blocking**: ```javascript const data = fs.readFileSync('file.txt'); console.log('File contents:', data); console.log('This waits for file read'); ``` **Benefits**: 1) Higher concurrency - handle multiple operations simultaneously. 2) Better resource utilization. 3) Responsive applications that don't freeze. 4) Scalability - serve thousands of concurrent users. **Use Cases**: Web servers, real-time applications, APIs, microservices. This model makes Node.js excellent for I/O-intensive applications.",
      },
      {
        question:
          "What is the difference between synchronous and asynchronous code?",
        solution:
          "Synchronous and asynchronous code represent two different execution models with distinct characteristics: **Synchronous Code**: **Execution**: Runs line by line in sequence. Each operation must complete before the next begins. **Blocking**: Blocks further execution until current operation finishes. **Example**: ```javascript console.log('Start'); const data = fs.readFileSync('file.txt'); // Blocks here console.log('File read complete'); console.log('End'); ``` **Asynchronous Code**: **Execution**: Operations can run concurrently. Code continues executing while waiting for operations to complete. **Non-blocking**: Doesn't block further execution. **Example**: ```javascript console.log('Start'); fs.readFile('file.txt', (err, data) => { console.log('File read complete'); }); console.log('End'); // Runs immediately ``` **Key Differences**: **Performance**: Async allows better resource utilization and concurrency. **Complexity**: Sync is easier to understand; async requires callbacks/promises. **Error Handling**: Sync uses try-catch; async uses callback error parameters or promise rejection. **Use Cases**: Sync for simple scripts; async for web servers and I/O operations. **Best Practice**: Use async for I/O operations in Node.js to maintain performance and responsiveness.",
      },
      {
        question: "What is a callback function?",
        solution:
          "A callback function is a function that is passed as an argument to another function and is executed after (or during) the completion of that function. It's a fundamental pattern for handling asynchronous operations in JavaScript. **Basic Example**: ```javascript function greet(name, callback) { console.log('Hello ' + name); callback(); } function sayGoodbye() { console.log('Goodbye!'); } greet('John', sayGoodbye); ``` **Asynchronous Callback**: ```javascript fs.readFile('file.txt', function(err, data) { if (err) { console.error('Error:', err); return; } console.log('File contents:', data); }); ``` **Common Patterns**: 1) **Error-first callbacks**: First parameter is error, second is result. 2) **Event callbacks**: Respond to events like clicks, data arrival. 3) **Higher-order functions**: Array methods like map(), filter(), forEach(). **Benefits**: Handle asynchronous operations, enable event-driven programming, provide flexibility in code execution flow. **Drawbacks**: Can lead to callback hell with nested callbacks, error handling becomes complex, debugging can be difficult. **Node.js Convention**: Error-first callbacks where callback(err, result) is standard pattern.",
      },
      {
        question: "What is callback hell?",
        solution:
          "Callback hell (also called 'Pyramid of Doom') refers to the situation where callbacks are nested within callbacks multiple levels deep, creating code that's difficult to read, maintain, and debug. **Example of Callback Hell**: ```javascript getData(function(a) { getMoreData(a, function(b) { getEvenMoreData(b, function(c) { getFinalData(c, function(d) { // Finally use the data console.log(d); }); }); }); }); ``` **Problems**: 1) **Readability**: Code becomes increasingly indented and hard to follow. 2) **Maintainability**: Difficult to modify or add new functionality. 3) **Error Handling**: Complex error propagation through nested callbacks. 4) **Debugging**: Stack traces become confusing and hard to trace. 5) **Testing**: Individual functions become harder to test in isolation. **Solutions**: 1) **Named Functions**: Break callbacks into separate named functions. 2) **Promises**: Use Promise chains for cleaner async flow. 3) **Async/Await**: Modern syntax that makes async code look synchronous. 4) **Control Flow Libraries**: Use libraries like async.js for complex flows. **Modern Approach**: ```javascript async function processData() { const a = await getData(); const b = await getMoreData(a); const c = await getEvenMoreData(b); const d = await getFinalData(c); console.log(d); } ```",
      },
      {
        question: "What are Promises?",
        solution:
          "Promises are objects that represent the eventual completion (or failure) of an asynchronous operation and provide a cleaner alternative to callbacks for handling async code. **Basic Structure**: A Promise is created with a function that takes resolve and reject parameters: ```javascript const myPromise = new Promise((resolve, reject) => { if (/* operation successful */) { resolve(result); } else { reject(error); } }); ``` **Using Promises**: ```javascript myPromise .then(result => { console.log('Success:', result); }) .catch(error => { console.error('Error:', error); }); ``` **Key Features**: 1) **Chainable**: Use .then() to chain multiple async operations. 2) **Error Handling**: Single .catch() can handle errors from entire chain. 3) **Immutable**: Once resolved or rejected, state cannot change. 4) **Composable**: Can combine multiple promises with Promise.all(), Promise.race(). **Benefits over Callbacks**: Eliminates callback hell, better error handling, more readable code, easier to test and debug. **Promise Chain Example**: ```javascript fetchUser() .then(user => fetchUserPosts(user.id)) .then(posts => displayPosts(posts)) .catch(error => handleError(error)); ``` Promises form the foundation for async/await syntax and modern JavaScript async programming.",
      },
      {
        question: "What are the three states of a Promise?",
        solution:
          "A Promise can exist in exactly one of three mutually exclusive states at any given time: **1. Pending**: **Description**: The initial state when the Promise is created and the async operation is still in progress. **Characteristics**: Neither fulfilled nor rejected yet. Can transition to either fulfilled or rejected. The outcome is still undetermined. **Example**: ```javascript const promise = new Promise((resolve, reject) => { // Operation in progress setTimeout(() => resolve('done'), 1000); }); // Promise is pending here ``` **2. Fulfilled (Resolved)**: **Description**: The async operation completed successfully. **Characteristics**: Has a resulting value. Cannot change to any other state. .then() handlers will be called with the value. **Example**: ```javascript promise.then(value => { console.log(value); // 'done' }); ``` **3. Rejected**: **Description**: The async operation failed or encountered an error. **Characteristics**: Has a rejection reason (usually an Error object). Cannot change to any other state. .catch() handlers will be called with the reason. **Example**: ```javascript const failedPromise = Promise.reject('Something went wrong'); failedPromise.catch(reason => { console.error(reason); // 'Something went wrong' }); ``` **State Transitions**: Pending → Fulfilled OR Pending → Rejected (never both, and transitions are irreversible). Once settled (fulfilled or rejected), a Promise never changes state again.",
      },
      {
        question: "What is async/await?",
        solution:
          "Async/await is a modern JavaScript syntax that makes asynchronous code look and behave more like synchronous code, providing a cleaner alternative to Promise chains and callbacks. **Async Functions**: Functions declared with 'async' keyword always return a Promise: ```javascript async function fetchData() { return 'Hello World'; // Automatically wrapped in Promise } ``` **Await Keyword**: 'await' pauses function execution until the Promise resolves: ```javascript async function getData() { const result = await fetch('/api/data'); const json = await result.json(); return json; } ``` **Error Handling**: Use try-catch blocks for error handling: ```javascript async function handleData() { try { const data = await fetchData(); console.log(data); } catch (error) { console.error('Error:', error); } } ``` **Benefits**: 1) **Readability**: Code looks like synchronous code. 2) **Error Handling**: Standard try-catch instead of .catch() chains. 3) **Debugging**: Better stack traces and debugging experience. 4) **Flow Control**: Easier loops and conditional logic with async operations. **Comparison**: ```javascript // Promise chain fetchUser().then(user => fetchPosts(user.id)).then(posts => displayPosts(posts)); // Async/await const user = await fetchUser(); const posts = await fetchPosts(user.id); displayPosts(posts); ``` **Important**: await can only be used inside async functions (or at top level in modules).",
      },
      {
        question:
          "What is the difference between setImmediate() and setTimeout()?",
        solution:
          "setImmediate() and setTimeout() are both used to schedule callback execution, but they differ in when and how they execute within the Event Loop: **setTimeout()**: **Purpose**: Executes callback after a specified delay (minimum 1ms). **Event Loop Phase**: Timer phase (first phase). **Example**: ```javascript setTimeout(() => { console.log('setTimeout'); }, 0); ``` **setImmediate()**: **Purpose**: Executes callback immediately after the current poll phase. **Event Loop Phase**: Check phase (after poll phase). **Example**: ```javascript setImmediate(() => { console.log('setImmediate'); }); ``` **Key Differences**: 1) **Timing**: setTimeout has minimum 1ms delay; setImmediate has no delay but waits for next event loop iteration. 2) **Execution Order**: Within I/O callbacks, setImmediate executes before setTimeout(0). 3) **Use Cases**: setTimeout for timed delays; setImmediate for yielding control to event loop. **Execution Order Example**: ```javascript // In I/O callback fs.readFile('file.txt', () => { setTimeout(() => console.log('setTimeout'), 0); setImmediate(() => console.log('setImmediate')); // setImmediate runs first }); ``` **Best Practice**: Use setImmediate() when you want to yield control to the event loop without delay, use setTimeout() for actual time-based delays.",
      },
      {
        question: "What is process.nextTick()?",
        solution:
          "process.nextTick() is a Node.js-specific function that schedules a callback to be executed at the start of the next iteration of the Event Loop, before any other I/O operations or timers. **Syntax**: ```javascript process.nextTick(callback, [arg1], [arg2], [...]) ``` **Example**: ```javascript console.log('start'); process.nextTick(() => { console.log('nextTick callback'); }); console.log('scheduled'); // Output: start, scheduled, nextTick callback ``` **Key Characteristics**: 1) **Highest Priority**: Executes before any other async operations. 2) **Same Phase**: Runs before moving to next Event Loop phase. 3) **Recursive**: Can schedule more nextTick callbacks. 4) **Queue Draining**: All nextTick callbacks execute before moving forward. **Use Cases**: 1) **API Consistency**: Make APIs consistently asynchronous. 2) **Error Handling**: Allow error handlers to be set up. 3) **Event Emitter**: Ensure listeners are set before events fire. **Warning - Starvation**: ```javascript // BAD: Can starve the event loop function recursiveNextTick() { process.nextTick(recursiveNextTick); } ``` **Comparison with setImmediate**: process.nextTick() executes before setImmediate() in all cases. **Best Practice**: Use sparingly and avoid recursive nextTick calls that can block the event loop indefinitely.",
      },
      {
        question:
          "What is the order of execution: setTimeout, setImmediate, process.nextTick?",
        solution:
          "The execution order of these three functions depends on the context and Event Loop phases, but follows predictable patterns: **General Priority Order**: 1) **process.nextTick()** - Highest priority, executes first 2) **Promise microtasks** - After nextTick, before macrotasks 3) **setImmediate()** vs **setTimeout()** - Context dependent **Context 1 - Main Thread**: ```javascript setTimeout(() => console.log('setTimeout'), 0); setImmediate(() => console.log('setImmediate')); process.nextTick(() => console.log('nextTick')); // Output: nextTick, setTimeout, setImmediate (usually) ``` **Context 2 - Inside I/O Callback**: ```javascript fs.readFile('file.txt', () => { setTimeout(() => console.log('setTimeout'), 0); setImmediate(() => console.log('setImmediate')); process.nextTick(() => console.log('nextTick')); // Output: nextTick, setImmediate, setTimeout }); ``` **Complete Example with Microtasks**: ```javascript setTimeout(() => console.log('1: setTimeout'), 0); setImmediate(() => console.log('2: setImmediate')); process.nextTick(() => console.log('3: nextTick')); Promise.resolve().then(() => console.log('4: Promise')); // Output: 3: nextTick, 4: Promise, 1: setTimeout, 2: setImmediate ``` **Key Rules**: process.nextTick always executes first within its context. Microtasks (Promises) execute after nextTick but before macrotasks. setImmediate vs setTimeout depends on whether you're in I/O context.",
      },
      {
        question: "What is blocking vs non-blocking code?",
        solution:
          "Blocking and non-blocking code represent two different approaches to handling operations that take time to complete: **Blocking Code**: **Definition**: Code execution stops and waits for an operation to complete before continuing. **Characteristics**: 1) Synchronous execution 2) Thread remains idle during wait 3) Simple, sequential flow 4) Can cause performance issues **Example**: ```javascript console.log('Before file read'); const data = fs.readFileSync('large-file.txt'); // BLOCKS here console.log('File size:', data.length); console.log('After file read'); ``` **Non-blocking Code**: **Definition**: Code continues executing while operations run in background. **Characteristics**: 1) Asynchronous execution 2) Thread remains available for other work 3) Requires callbacks/promises 4) Better performance and scalability **Example**: ```javascript console.log('Before file read'); fs.readFile('large-file.txt', (err, data) => { // Non-blocking callback console.log('File size:', data.length); }); console.log('After file read'); // Executes immediately ``` **Key Differences**: **Performance**: Blocking can freeze application; non-blocking maintains responsiveness. **Scalability**: Non-blocking handles many concurrent operations better. **Complexity**: Blocking is simpler to understand; non-blocking requires async patterns. **Use Cases**: Blocking for simple scripts; non-blocking for web servers and real-time applications. **Node.js Philosophy**: Emphasizes non-blocking I/O for maximum performance and concurrency.",
      },
      {
        question: "What happens when you call an asynchronous function?",
        solution:
          "When you call an asynchronous function in Node.js, several things happen in a specific sequence: **Immediate Actions**: 1) **Function Starts**: The async function begins executing immediately. 2) **Synchronous Part Runs**: Any synchronous code at the beginning executes right away. 3) **Returns Promise/Undefined**: Function returns immediately (Promise for async functions, undefined for callback-based). **Example Flow**: ```javascript console.log('1: Start'); async function fetchData() { console.log('2: Function started'); const result = await someAsyncOperation(); // Pauses here console.log('4: Function resumed'); return result; } const promise = fetchData(); // Returns immediately console.log('3: Function called'); ``` **Behind the Scenes**: 1) **Operation Queued**: The actual async work (I/O, timer) is handed off to libuv. 2) **Execution Continues**: JavaScript continues with next statements. 3) **Event Loop Monitoring**: Event loop monitors for operation completion. 4) **Callback Queued**: When complete, callback/continuation is queued. 5) **Callback Executed**: Event loop executes the callback when appropriate. **Key Points**: - Async functions don't block the main thread - The calling code continues immediately - Results are handled via callbacks, promises, or await - Multiple async operations can run concurrently - Event loop coordinates when callbacks execute **This design enables Node.js's high concurrency and performance characteristics.**",
      },
      {
        question: "What is the purpose of the event loop?",
        solution:
          "The Event Loop serves as the core orchestrator of Node.js's asynchronous, non-blocking I/O model. Its primary purposes include: **1. Concurrency Management**: Enables handling thousands of concurrent operations with a single thread by efficiently scheduling callbacks and I/O operations. **2. Non-blocking I/O Coordination**: Manages the flow between JavaScript execution and I/O operations, ensuring the main thread never blocks waiting for I/O completion. **3. Callback Execution Scheduling**: Determines when and in what order callbacks, promises, and other async operations execute. **4. Resource Optimization**: Maximizes CPU utilization by keeping the thread busy with JavaScript execution while I/O operations run in background threads. **How It Achieves This**: 1) **Phase-based Processing**: Processes different types of operations in specific phases (timers, I/O, immediate callbacks). 2) **Queue Management**: Maintains multiple queues for different operation types with appropriate priorities. 3) **Integration with libuv**: Coordinates with libuv's thread pool for actual I/O work. 4) **Microtask Processing**: Handles high-priority microtasks (process.nextTick, Promises) between phases. **Benefits**: - High throughput for I/O-intensive applications - Efficient memory usage (no thread-per-connection) - Responsive applications that don't freeze - Scalable architecture for web servers **The Event Loop is what makes Node.js suitable for building scalable network applications despite being single-threaded.**",
      },
      {
        question: "How does Node.js handle concurrent requests?",
        solution:
          "Node.js handles concurrent requests through its event-driven, non-blocking I/O architecture, allowing a single thread to manage thousands of simultaneous connections efficiently: **Request Handling Flow**: 1) **Request Arrival**: Multiple HTTP requests arrive at the server. 2) **Event Registration**: Each request is registered as an event. 3) **Non-blocking Processing**: Server immediately starts processing without waiting for completion. 4) **I/O Delegation**: I/O operations are delegated to libuv's thread pool. 5) **Callback Queuing**: When operations complete, callbacks are queued. 6) **Response Sending**: Event loop executes callbacks and sends responses. **Key Mechanisms**: **Event Loop**: Single thread processes all JavaScript code and coordinates async operations. **libuv Thread Pool**: Background threads handle I/O operations (file system, DNS, some crypto). **Callback System**: Completed operations trigger callbacks for response handling. **Example**: ```javascript const server = http.createServer((req, res) => { // This handles each request non-blocking fs.readFile('data.json', (err, data) => { // I/O operation doesn't block other requests res.writeHead(200, {'Content-Type': 'application/json'}); res.end(data); }); }); ``` **Advantages**: 1) **High Concurrency**: Handle 10,000+ concurrent connections. 2) **Low Memory**: No thread-per-request overhead. 3) **Efficient**: CPU stays busy while I/O operations run. **Limitations**: CPU-intensive tasks can block the event loop, affecting all concurrent requests.",
      },
      {
        question: "What is I/O polling?",
        solution:
          "I/O polling is a mechanism where the system repeatedly checks the status of I/O operations to determine if they have completed. In Node.js context, it's a crucial part of how the Event Loop manages asynchronous operations. **How Polling Works**: 1) **Status Check**: System repeatedly queries I/O operations for completion status. 2) **Ready Detection**: Identifies which operations have data ready or have completed. 3) **Callback Execution**: Triggers appropriate callbacks for completed operations. 4) **Efficient Waiting**: Uses system calls like epoll (Linux), kqueue (macOS), IOCP (Windows) for efficient polling. **Node.js Implementation**: The Poll Phase in the Event Loop is where I/O polling primarily occurs: ```javascript // Simplified polling concept while (eventLoopRunning) { const readyOperations = pollForReadyIO(); readyOperations.forEach(operation => { executeCallback(operation); }); } ``` **Types of Polling**: 1) **Blocking Poll**: Wait until at least one I/O operation is ready. 2) **Non-blocking Poll**: Check immediately and return (used when timers are scheduled). 3) **Timeout Poll**: Wait for specified time or until operations are ready. **Benefits**: - Efficient resource usage - No busy-waiting on individual operations - Scales well with many concurrent I/O operations - OS-level optimization through system-specific APIs **This polling mechanism is what allows Node.js to handle thousands of concurrent I/O operations efficiently without creating threads for each operation.**",
      },
      {
        question: "What is the microtask queue?",
        solution:
          "The microtask queue is a high-priority queue in JavaScript's event system that holds callbacks from Promises, queueMicrotask(), and process.nextTick() (in Node.js). Microtasks have priority over macrotasks and execute before the Event Loop moves to the next phase. **What Creates Microtasks**: 1) **Promise callbacks**: .then(), .catch(), .finally() 2) **queueMicrotask()**: Explicitly queue microtasks 3) **process.nextTick()**: Node.js specific (highest priority) 4) **MutationObserver**: DOM mutation callbacks (browser) **Execution Priority**: ```javascript console.log('1: Synchronous'); setTimeout(() => console.log('4: Macrotask'), 0); Promise.resolve().then(() => console.log('2: Microtask')); queueMicrotask(() => console.log('3: Microtask')); // Output: 1, 2, 3, 4 ``` **Key Characteristics**: 1) **High Priority**: Execute before any macrotasks (setTimeout, setImmediate, I/O callbacks). 2) **Queue Draining**: All microtasks must complete before moving to macrotasks. 3) **Can Add More**: Microtask callbacks can add more microtasks to the queue. 4) **Between Phases**: In Node.js, microtasks execute between Event Loop phases. **Example**: ```javascript Promise.resolve().then(() => { console.log('Microtask 1'); Promise.resolve().then(() => console.log('Microtask 2')); }); setTimeout(() => console.log('Macrotask'), 0); ``` **Warning**: Infinite microtask loops can starve macrotasks and block the Event Loop.",
      },
      {
        question: "What is the macrotask queue?",
        solution:
          "The macrotask queue (also called task queue) contains callbacks from I/O operations, timers, and other asynchronous operations that are processed by the Event Loop after all microtasks have been completed. **What Creates Macrotasks**: 1) **setTimeout/setInterval**: Timer callbacks 2) **setImmediate**: Immediate execution callbacks (Node.js) 3) **I/O operations**: File system, network requests 4) **UI events**: Click, scroll events (browser) 5) **HTTP requests**: Server request handling **Event Loop Processing**: ```javascript // Macrotasks are processed in phases console.log('1: Sync'); setTimeout(() => console.log('3: Timer macrotask'), 0); setImmediate(() => console.log('4: Immediate macrotask')); Promise.resolve().then(() => console.log('2: Microtask')); // Output: 1, 2, 3, 4 (or 1, 2, 4, 3 depending on context) ``` **Characteristics**: 1) **Lower Priority**: Execute after all microtasks are complete. 2) **Phase-based**: Different types processed in different Event Loop phases. 3) **One Per Iteration**: Typically one macrotask per Event Loop iteration. 4) **Interleaved**: Microtasks can execute between macrotasks. **Example Flow**: ```javascript setTimeout(() => { console.log('Macrotask 1'); Promise.resolve().then(() => console.log('Microtask')); }, 0); setTimeout(() => console.log('Macrotask 2'), 0); // Output: Macrotask 1, Microtask, Macrotask 2 ``` **Purpose**: Ensures responsive execution by allowing microtasks (high-priority operations) to execute before continuing with other async operations.",
      },
      {
        question: "What is the difference between microtasks and macrotasks?",
        solution:
          "Microtasks and macrotasks represent different priority levels in JavaScript's asynchronous execution model, with distinct characteristics and execution patterns: **Priority & Execution**: **Microtasks**: Higher priority, execute immediately after current script and before any macrotasks. **Macrotasks**: Lower priority, execute after all microtasks are completed. **Sources**: **Microtasks**: Promise.then(), process.nextTick(), queueMicrotask(), MutationObserver. **Macrotasks**: setTimeout(), setImmediate(), I/O callbacks, UI events, HTTP requests. **Execution Pattern**: **Microtasks**: All microtasks in queue are executed in one go (queue draining). **Macrotasks**: Usually one macrotask per Event Loop iteration. **Example Demonstrating Differences**: ```javascript console.log('1: Start'); // Macrotasks setTimeout(() => console.log('5: setTimeout 1'), 0); setTimeout(() => console.log('6: setTimeout 2'), 0); // Microtasks Promise.resolve().then(() => { console.log('2: Promise 1'); Promise.resolve().then(() => console.log('3: Promise 2')); }); queueMicrotask(() => console.log('4: queueMicrotask')); // Output: 1, 2, 3, 4, 5, 6 ``` **Key Differences Table**: | Aspect | Microtasks | Macrotasks | |--------|------------|------------| | Priority | High | Low | | Execution | All at once | One per iteration | | Examples | Promises, nextTick | Timers, I/O | | Can starve | Yes (infinite loops) | No | **Use Cases**: Microtasks for immediate follow-up actions, macrotasks for scheduled or I/O operations.",
      },
      {
        question: "What is event-driven programming?",
        solution:
          "Event-driven programming is a programming paradigm where the flow of execution is determined by events such as user actions, sensor outputs, or message passing. In JavaScript, this is fundamental to how the language works with the event loop. The program waits for events to occur and responds to them through event handlers or callbacks. For example, when a user clicks a button, an event is triggered and the corresponding event handler function executes. This approach enables non-blocking, asynchronous behavior where multiple operations can be initiated without waiting for each to complete. Common examples include DOM events (click, submit, load), HTTP requests, timers, and I/O operations. Event-driven programming allows for responsive user interfaces and efficient resource utilization since the program doesn't block while waiting for operations to complete.",
      },
      {
        question: "What is asynchronous iteration?",
        solution:
          "Asynchronous iteration allows you to iterate over data that arrives asynchronously, such as streams of data, API responses, or database results. It uses the Symbol.asyncIterator protocol and async generators. Unlike regular iteration which processes all data at once, async iteration processes data as it becomes available. You can create async iterables using async generator functions (async function*) or by implementing the Symbol.asyncIterator method. To consume async iterables, use 'for await...of' loops. For example: `async function* asyncGenerator() { yield Promise.resolve(1); yield Promise.resolve(2); } for await (const value of asyncGenerator()) { console.log(value); }`. This is particularly useful for processing large datasets, streaming APIs, reading files chunk by chunk, or handling real-time data where you don't want to wait for all data to be available before starting processing.",
      },
      {
        question: "What is a Promise chain?",
        solution:
          "A Promise chain is a sequence of Promise operations linked together using .then(), .catch(), and .finally() methods. Each .then() returns a new Promise, allowing you to chain multiple asynchronous operations in sequence. The value returned from one .then() becomes the resolved value for the next .then() in the chain. For example: `fetch('/api/user').then(response => response.json()).then(user => updateUI(user)).catch(error => handleError(error))`. Promise chains help avoid callback hell by creating a linear, readable flow of asynchronous operations. Each step in the chain can transform the data, and errors bubble down to the nearest .catch() handler. You can also return Promises from .then() handlers to wait for nested async operations. Promise chains are the foundation for async/await syntax, which provides a more synchronous-looking way to write the same logic.",
      },
      {
        question: "What is Promise.all()?",
        solution:
          "Promise.all() is a utility method that takes an array of Promises and returns a single Promise that resolves when all input Promises resolve, or rejects immediately when any input Promise rejects. The resolved value is an array containing the resolved values of all input Promises in the same order. Syntax: `Promise.all([promise1, promise2, promise3])`. It's useful for running multiple async operations in parallel and waiting for all to complete. For example: `Promise.all([fetchUser(), fetchPosts(), fetchComments()]).then(([user, posts, comments]) => { console.log('All data loaded', {user, posts, comments}); })`. If any Promise rejects, Promise.all() immediately rejects with that error, even if other Promises are still pending. This 'fail-fast' behavior makes it ideal when you need all operations to succeed. Use Promise.all() when operations are independent and you want maximum parallelism, but remember it's only as fast as the slowest Promise.",
      },
      {
        question: "What is Promise.race()?",
        solution:
          "Promise.race() takes an array of Promises and returns a Promise that settles (resolves or rejects) as soon as the first Promise in the array settles, with the value or reason from that first settled Promise. Unlike Promise.all(), it doesn't wait for all Promises to complete - it 'races' them and takes the result of the winner. Syntax: `Promise.race([promise1, promise2, promise3])`. Common use cases include implementing timeouts (`Promise.race([fetchData(), timeout(5000)])`), finding the fastest server response, or canceling slow operations. For example: `Promise.race([fetch('/api/fast'), fetch('/api/slow')]).then(response => response.json())` will use whichever endpoint responds first. The other Promises continue running in the background but their results are ignored. This is useful for performance optimization, implementing fallbacks, or setting maximum wait times for operations.",
      },
      {
        question:
          "What is the difference between Promise.all() and Promise.allSettled()?",
        solution:
          "The key difference is how they handle rejections. Promise.all() fails fast - it immediately rejects when any input Promise rejects, even if others are still pending or would succeed. Promise.allSettled() waits for all Promises to settle (resolve or reject) and returns an array of objects describing each result. Each result object has a 'status' property ('fulfilled' or 'rejected') and either a 'value' (for fulfilled) or 'reason' (for rejected). Example: `Promise.allSettled([Promise.resolve(1), Promise.reject('error'), Promise.resolve(3)])` returns `[{status:'fulfilled', value:1}, {status:'rejected', reason:'error'}, {status:'fulfilled', value:3}]`. Use Promise.all() when you need all operations to succeed and want to fail immediately if any fails. Use Promise.allSettled() when you want to attempt all operations regardless of individual failures and handle each result separately. Promise.allSettled() is ideal for scenarios like batch processing where you want to know the outcome of each operation.",
      },
      {
        question: "How do you handle errors in async/await?",
        solution:
          "Error handling in async/await is done using try-catch blocks, which provide a synchronous-looking way to handle asynchronous errors. Wrap await expressions in try-catch to catch Promise rejections. Example: `async function fetchData() { try { const response = await fetch('/api/data'); const data = await response.json(); return data; } catch (error) { console.error('Error fetching data:', error); throw error; } }`. You can catch specific errors by checking error properties or using multiple catch blocks. Unhandled errors in async functions automatically cause the function to return a rejected Promise. You can also handle errors at the call site: `fetchData().catch(error => handleError(error))`. For multiple await operations, a single try-catch can handle errors from any of them. Use finally blocks for cleanup code that should run regardless of success or failure. Remember that errors in async functions propagate up the call chain just like synchronous errors, making debugging more intuitive.",
      },
      {
        question:
          "What is the purpose of the try-catch block with async/await?",
        solution:
          "The try-catch block with async/await serves to handle errors from asynchronous operations in a way that looks and behaves like synchronous error handling. When you await a Promise that rejects, it throws an error that can be caught by the surrounding try-catch block. This eliminates the need for .catch() chains and makes error handling more readable and consistent with synchronous code. The try block contains the async operations, and the catch block handles any errors that occur. Example: `async function processData() { try { const data = await fetchData(); const processed = await transformData(data); await saveData(processed); } catch (error) { if (error.code === 'NETWORK_ERROR') { showRetryButton(); } else { showErrorMessage(error.message); } } }`. You can also use finally blocks for cleanup code. Without try-catch, unhandled Promise rejections in async functions would cause the function to return a rejected Promise, potentially leading to unhandled promise rejection warnings.",
      },
      {
        question: "Can you use async/await with forEach?",
        solution:
          "No, async/await doesn't work as expected with forEach because forEach doesn't wait for async callbacks to complete. forEach calls the callback function for each element but doesn't await the results, so async operations run concurrently without coordination. Example of what NOT to do: `items.forEach(async item => { await processItem(item); })` - this starts all operations immediately without waiting. Instead, use for...of loop for sequential processing: `for (const item of items) { await processItem(item); }` or for...in for indices. For parallel processing, use map with Promise.all(): `await Promise.all(items.map(async item => await processItem(item)))`. Other alternatives include using for loop with async/await, or Array methods like reduce for more complex sequential operations. The key is understanding that forEach is designed for synchronous operations and doesn't have built-in support for handling asynchronous callbacks properly.",
      },
      {
        question:
          "What is the difference between parallel and sequential execution?",
        solution:
          "Sequential execution means async operations run one after another - each operation waits for the previous one to complete before starting. This is achieved using await in a loop or chaining operations. Example: `for (const item of items) { await processItem(item); }` - items are processed one by one. Parallel execution means multiple async operations run simultaneously, potentially completing in any order. Example: `await Promise.all(items.map(item => processItem(item)))` - all items start processing at once. Sequential execution is slower but uses less resources and maintains order, which is important when operations depend on each other or when you need to limit concurrent operations. Parallel execution is faster but uses more resources and may overwhelm servers or hit rate limits. Choose sequential when operations have dependencies, need to maintain order, or when limiting concurrency. Choose parallel when operations are independent, you want maximum speed, and system resources can handle the load. You can also use hybrid approaches like processing items in batches.",
      },
      {
        question: "How do you make multiple async calls in parallel?",
        solution:
          "There are several ways to make multiple async calls in parallel. The most common is Promise.all() which waits for all Promises to resolve: `const [users, posts, comments] = await Promise.all([fetchUsers(), fetchPosts(), fetchComments()])`. For arrays of similar operations, use map with Promise.all(): `const results = await Promise.all(urls.map(url => fetch(url)))`. If you don't need to wait for all operations, start them simultaneously and await individually: `const userPromise = fetchUser(); const postsPromise = fetchPosts(); const user = await userPromise; const posts = await postsPromise;`. Use Promise.allSettled() when some operations might fail: `const results = await Promise.allSettled([...operations])`. For controlled concurrency, implement batch processing or use libraries like p-limit. The key principle is to start all operations before awaiting any of them, allowing them to run concurrently rather than sequentially.",
      },
      {
        question: "What is a rejected Promise?",
        solution:
          "A rejected Promise is a Promise that has failed to complete successfully. It represents an error or failure condition in an asynchronous operation. Promises have three states: pending (initial), fulfilled (successful), and rejected (failed). A Promise becomes rejected when an error occurs during the async operation or when Promise.reject() is called explicitly. Example: `const rejectedPromise = Promise.reject(new Error('Something went wrong'))`. Rejected Promises must be handled to prevent 'unhandled promise rejection' warnings. Handle them using .catch() method: `promise.catch(error => console.error(error))` or try-catch with async/await: `try { await promise; } catch (error) { handleError(error); }`. If not handled, rejected Promises bubble up the chain until caught or cause unhandled rejection events. Common causes include network failures, validation errors, file system errors, or explicit rejections in Promise constructors. Proper error handling is crucial for robust applications.",
      },
      {
        question: "What is Promise chaining?",
        solution:
          "Promise chaining is the practice of linking multiple asynchronous operations together using .then() methods, where each .then() returns a new Promise. This creates a sequence of operations where the output of one becomes the input of the next. Example: `fetch('/api/user').then(response => response.json()).then(user => updateProfile(user)).then(result => showSuccess(result)).catch(error => handleError(error))`. Each .then() can return a value (which becomes a resolved Promise), return a Promise (which the chain waits for), or throw an error (which rejects the chain). Promise chains avoid callback hell by creating linear, readable code flow. The chain continues until it reaches a .catch() or .finally(), and errors bubble down to the nearest error handler. Chains can be branched by storing intermediate Promises in variables. Modern JavaScript often replaces Promise chains with async/await syntax, which provides the same functionality with more readable syntax that resembles synchronous code.",
      },
      {
        question: "What is the purpose of .catch() in Promise chains?",
        solution:
          "The .catch() method in Promise chains serves to handle errors (rejections) that occur anywhere in the chain. It acts as an error handler that catches any rejected Promise from earlier in the chain. When any Promise in the chain rejects, execution jumps directly to the nearest .catch() handler, skipping any .then() handlers in between. Example: `fetch('/api/data').then(response => response.json()).then(data => processData(data)).catch(error => { console.error('Error occurred:', error); return defaultData; })`. The .catch() method can also transform errors or provide fallback values, allowing the chain to continue. If .catch() returns a value, the chain continues with a resolved Promise. If it throws or returns a rejected Promise, the chain continues as rejected. You can have multiple .catch() handlers in a chain for different error handling strategies. .catch() is essential for preventing unhandled Promise rejections and providing graceful error recovery in asynchronous operations.",
      },
      {
        question: "What is async function?",
        solution:
          "An async function is a function declared with the async keyword that enables the use of await expressions inside it. Async functions always return a Promise, even if you don't explicitly return one. If the function returns a value, it's automatically wrapped in a resolved Promise. If an error is thrown, the Promise is rejected. Syntax: `async function fetchData() { const response = await fetch('/api/data'); return response.json(); }`. The await keyword can only be used inside async functions and pauses execution until the awaited Promise resolves or rejects. This makes asynchronous code look and behave more like synchronous code, improving readability and reducing complexity. Async functions can be declared as function declarations, expressions, arrow functions, or methods: `const asyncArrow = async () => { ... }`. They provide a cleaner alternative to Promise chains and make error handling with try-catch more intuitive. Calling an async function always returns a Promise that you can use with .then()/.catch() or await.",
      },
      {
        question: "What is a module in Node.js?",
        solution:
          "A module in Node.js is a reusable block of code whose exports can be used in other files. Modules help organize code into separate files, promote reusability, and prevent global namespace pollution. Node.js treats each file as a separate module with its own scope. Variables, functions, and classes defined in a module are private by default and must be explicitly exported to be used elsewhere. There are three types of modules: Core modules (built into Node.js like 'fs', 'http', 'path'), Local modules (files you create), and Third-party modules (installed via npm). Modules use the module.exports or exports object to expose functionality: `module.exports = { myFunction, myVariable }`. Other files import modules using require(): `const myModule = require('./myModule')`. Modules are cached after first load for performance. The module system enables building large applications by breaking code into manageable, testable pieces while avoiding naming conflicts and promoting code organization.",
      },
      {
        question: "What are the different types of modules in Node.js?",
        solution:
          "Node.js has three main types of modules: 1) Core Modules: Built-in modules that come with Node.js installation, like 'fs' for file system operations, 'http' for HTTP server/client, 'path' for file path utilities, 'crypto' for cryptographic functionality. These don't need installation and are loaded with require('moduleName'). 2) Local Modules: Custom modules you create in your project. These are JavaScript files that export functions, objects, or classes. They're loaded using relative paths like require('./myModule') or require('../utils/helper'). 3) Third-party Modules: External packages installed via npm from the npm registry. Examples include express, lodash, axios. These are installed with 'npm install package-name' and loaded with require('package-name'). Additionally, Node.js supports two module systems: CommonJS (traditional, using require/module.exports) and ES Modules (modern, using import/export). Each type serves different purposes: core modules provide system functionality, local modules organize your code, and third-party modules add external functionality to avoid reinventing the wheel.",
      },
      {
        question: "What is CommonJS?",
        solution:
          "CommonJS is the original module system used in Node.js that uses require() to import modules and module.exports or exports to export functionality. It was designed specifically for server-side JavaScript to solve the lack of a native module system. In CommonJS, each file is treated as a separate module with its own scope. To export: `module.exports = { myFunction, myVariable }` or `exports.myFunction = () => {}`. To import: `const myModule = require('./myModule')` or `const { myFunction } = require('./myModule')`. CommonJS modules are loaded synchronously, which works well for server environments where modules are loaded from the file system. The module system includes features like caching (modules are cached after first load), circular dependency handling, and the ability to load JSON files directly. CommonJS modules can export any JavaScript value including functions, objects, classes, or primitives. While ES Modules are now preferred for new projects, CommonJS remains widely used and is fully supported in Node.js.",
      },
      {
        question: "What is ES Modules (ESM)?",
        solution:
          "ES Modules (ESM) is the modern JavaScript module system standardized in ES6/ES2015, using import and export statements. Unlike CommonJS, ESM is part of the JavaScript language specification and works in both browsers and Node.js. To export: `export const myFunction = () => {}`, `export default myClass`, or `export { myFunction, myVariable }`. To import: `import myModule from './myModule.js'`, `import { myFunction } from './myModule.js'`, or `import * as myModule from './myModule.js'`. ESM modules are loaded asynchronously and support static analysis, enabling tree-shaking and better optimization. In Node.js, enable ESM by using .mjs file extension, setting 'type': 'module' in package.json, or using --input-type=module flag. ESM supports top-level await, dynamic imports with import(), and better circular dependency handling. Key differences from CommonJS: static import/export statements (must be at top level), asynchronous loading, live bindings (exports are references, not copies), and strict mode by default. ESM is the future of JavaScript modules and is recommended for new projects.",
      },
      {
        question: "How do you read a file asynchronously?",
        solution:
          "Use fs.readFile() with a callback or fs.promises.readFile() with async/await. The async approach doesn't block the event loop, allowing other operations to continue while the file is being read. Example: const fs = require('fs').promises; const data = await fs.readFile('file.txt', 'utf8'); or fs.readFile('file.txt', 'utf8', (err, data) => { if (err) throw err; console.log(data); }). Always handle errors and specify encoding for text files.",
      },
      {
        question: "How do you read a file synchronously?",
        solution:
          "Use fs.readFileSync() which blocks the event loop until the operation completes. Example: const fs = require('fs'); const data = fs.readFileSync('file.txt', 'utf8'). Wrap in try-catch for error handling. Synchronous operations should be avoided in production servers as they block the entire application, but are acceptable for initialization scripts or CLI tools where blocking behavior is desired.",
      },
      {
        question: "How do you write to a file?",
        solution:
          "Use fs.writeFile() for async or fs.writeFileSync() for sync operations. Example: await fs.promises.writeFile('output.txt', 'Hello World', 'utf8'). The writeFile method completely overwrites the file content. Options include encoding (utf8, binary), mode (file permissions), and flag (w for write, a for append). Always handle errors and ensure the directory exists before writing.",
      },
      {
        question:
          "What is the difference between fs.writeFile() and fs.appendFile()?",
        solution:
          "fs.writeFile() completely overwrites the file content or creates a new file, while fs.appendFile() adds content to the end of an existing file without removing existing data. writeFile uses 'w' flag (write mode), appendFile uses 'a' flag (append mode). Use writeFile for replacing content entirely, appendFile for logging or adding new data to existing files. Both create the file if it doesn't exist.",
      },
      {
        question: "How do you check if a file exists?",
        solution:
          "Use fs.access() to check file existence and permissions, or fs.stat() to get file info. Example: try { await fs.promises.access('file.txt', fs.constants.F_OK); console.log('File exists'); } catch { console.log('File does not exist'); }. Avoid fs.exists() as it's deprecated. fs.access() is preferred because it checks both existence and permissions in one operation. Use fs.constants.F_OK for existence, R_OK for read, W_OK for write permissions.",
      },
      {
        question: "How do you get file stats/information?",
        solution:
          "Use fs.stat() or fs.lstat() to get file statistics. Example: const stats = await fs.promises.stat('file.txt'); console.log(stats.size, stats.isFile(), stats.isDirectory(), stats.mtime). The stats object contains size, creation/modification times, permissions, and methods like isFile(), isDirectory(), isSymbolicLink(). Use lstat() for symbolic links to get link info rather than target file info. Stats help determine file type, size, and timestamps.",
      },
      {
        question: "How do you delete a file?",
        solution:
          "Use fs.unlink() to delete a file. Example: await fs.promises.unlink('file.txt'). For directories, use fs.rmdir() for empty directories or fs.rm() with recursive option for non-empty ones. Always check if file exists before deletion and handle ENOENT errors gracefully. For multiple files, consider using fs.rm() with recursive and force options. Never delete files without proper validation and user confirmation in production.",
      },
      {
        question: "How do you create a directory?",
        solution:
          "Use fs.mkdir() to create directories. Example: await fs.promises.mkdir('newdir', { recursive: true }). The recursive option creates nested directories if they don't exist (like mkdir -p in Unix). Without recursive, parent directories must exist. Set mode option for permissions (default 0o777). Handle EEXIST errors when directory already exists, or use recursive option to ignore existing directories.",
      },
      {
        question: "How do you read directory contents?",
        solution:
          "Use fs.readdir() to list directory contents. Example: const files = await fs.promises.readdir('./'); or with options: fs.readdir('./', { withFileTypes: true }) to get Dirent objects with file type info. Use withFileTypes to distinguish files from directories without additional stat calls. Filter results using array methods for specific file types or patterns. Combine with path.join() for full file paths.",
      },
      {
        question: "How do you remove a directory?",
        solution:
          "Use fs.rmdir() for empty directories or fs.rm() with recursive option for non-empty directories. Example: await fs.promises.rm('dirname', { recursive: true, force: true }). The recursive option removes all contents, force option ignores non-existent files. For empty directories only: fs.rmdir(). Always validate directory path and handle permissions errors. Consider fs.rmSync() for synchronous removal in scripts.",
      },
      {
        question: "What is a file stream?",
        solution:
          "A file stream is a way to read or write files piece by piece rather than loading entire content into memory. Streams are EventEmitter instances that handle data in chunks, making them memory-efficient for large files. Types include Readable (reading data), Writable (writing data), and Transform (modifying data). Streams emit events like 'data', 'end', 'error'. They're essential for handling large files, real-time data processing, and building data pipelines without memory overflow.",
      },
      {
        question: "How do you create a readable stream?",
        solution:
          "Use fs.createReadStream() to create a readable file stream. Example: const readStream = fs.createReadStream('largefile.txt', { encoding: 'utf8', highWaterMark: 16384 }). Listen for events: readStream.on('data', chunk => console.log(chunk)); readStream.on('end', () => console.log('Finished')); readStream.on('error', err => console.error(err)). Options include encoding, start/end positions, and highWaterMark (buffer size). Streams are memory-efficient for large files.",
      },
      {
        question: "How do you create a writable stream?",
        solution:
          "Use fs.createWriteStream() to create a writable file stream. Example: const writeStream = fs.createWriteStream('output.txt', { encoding: 'utf8' }); writeStream.write('Hello '); writeStream.write('World'); writeStream.end(). Listen for events: writeStream.on('finish', () => console.log('Done')); writeStream.on('error', err => console.error(err)). Use write() to add data and end() to finish. Streams handle backpressure automatically and are ideal for large data writes.",
      },
      {
        question: "What is the difference between binary and text mode?",
        solution:
          "Binary mode reads raw bytes without interpretation, while text mode applies character encoding (like UTF-8). In Node.js, specify encoding: 'utf8' for text mode, omit encoding or use null for binary mode. Example: fs.readFile('image.jpg') returns Buffer (binary), fs.readFile('text.txt', 'utf8') returns string. Binary mode preserves exact byte sequences for images, executables. Text mode handles character encoding, line endings, and returns human-readable strings. Choose based on file content type.",
      },
      {
        question: "What are file permissions?",
        solution:
          "File permissions control who can read, write, or execute files. In Unix-like systems, permissions are represented as octal numbers (0o755) or symbolic notation (rwxr-xr-x). Three permission groups: owner, group, others. Three permission types: read (4), write (2), execute (1). Example: 0o644 means owner can read/write, group/others can read only. In Node.js, set permissions using mode option in fs operations or fs.chmod(). Windows has different permission model but Node.js abstracts common operations.",
      },
      {
        question: "How do you change file permissions?",
        solution:
          "Use fs.chmod() to change file permissions. Example: await fs.promises.chmod('file.txt', 0o644) sets read-write for owner, read-only for others. Use fs.constants for common permissions: fs.constants.S_IRUSR (owner read), fs.constants.S_IWUSR (owner write), fs.constants.S_IXUSR (owner execute). Combine with bitwise OR: fs.constants.S_IRUSR | fs.constants.S_IWUSR. Always handle permission errors and check if operation is supported on the platform.",
      },
      {
        question: "What is the path module?",
        solution:
          "The path module provides utilities for working with file and directory paths in a cross-platform way. It handles differences between Unix (/) and Windows (\\) path separators. Key methods: path.join() (joins paths), path.resolve() (resolves absolute path), path.dirname() (directory name), path.basename() (file name), path.extname() (extension). Example: path.join('/users', 'john', 'documents') works on all platforms. Always use path module instead of string concatenation for robust path handling.",
      },
      {
        question: "How do you join paths?",
        solution:
          "Use path.join() to combine path segments safely across platforms. Example: const fullPath = path.join(__dirname, 'uploads', 'images', 'photo.jpg'). path.join() handles separators automatically (/ on Unix, \\ on Windows), resolves . and .. segments, and eliminates duplicate separators. Use path.resolve() for absolute paths from current working directory. Never use string concatenation with '/' or '\\' as it breaks cross-platform compatibility. Always import: const path = require('path').",
      },
      {
        question: "What is EventEmitter in Node.js?",
        solution:
          "EventEmitter is a core Node.js class that enables objects to emit named events and register listeners for those events. It implements the observer pattern, allowing asynchronous event-driven communication. Many Node.js core modules extend EventEmitter (streams, HTTP servers, child processes). Events are emitted with emit() method and listened to with on() or once() methods. EventEmitter enables loose coupling between components and is fundamental to Node.js's non-blocking, event-driven architecture.",
      },
      {
        question: "How do you create an EventEmitter?",
        solution:
          "Import EventEmitter class and create an instance or extend it. Example: const EventEmitter = require('events'); const emitter = new EventEmitter(); or create custom class: class MyEmitter extends EventEmitter {}; const myEmitter = new MyEmitter(). Custom classes can add domain-specific methods while inheriting event capabilities. Set maxListeners if needed: emitter.setMaxListeners(20). EventEmitters are useful for creating custom event-driven components, APIs, and handling asynchronous operations with multiple interested parties.",
      },
      {
        question: "How do you emit an event?",
        solution:
          "Use the emit() method to trigger an event. Example: emitter.emit('eventName', arg1, arg2, arg3). The first parameter is the event name (string), followed by optional arguments passed to listeners. emit() returns true if event has listeners, false otherwise. Events are synchronous by default - all listeners execute immediately. For async behavior, use setImmediate() or setTimeout() inside listeners. Common pattern: emit 'error' events for error handling, 'data' for data events.",
      },
      {
        question: "How do you listen for an event?",
        solution:
          "Use on() method to register event listeners. Example: emitter.on('eventName', (arg1, arg2) => { console.log('Event received:', arg1, arg2); }). Listeners receive arguments passed from emit(). Multiple listeners can be registered for the same event and execute in registration order. Use once() for single-use listeners. Always handle 'error' events to prevent crashes. Arrow functions preserve 'this' context, regular functions get EventEmitter instance as 'this'.",
      },
      {
        question: "What is the difference between on() and once()?",
        solution:
          "on() registers a persistent listener that executes every time the event is emitted, while once() registers a listener that automatically removes itself after the first execution. Example: emitter.on('data', handler) - runs every time; emitter.once('ready', handler) - runs only once. once() is useful for initialization events, connection established events, or cleanup operations. Both methods return the EventEmitter instance for method chaining. Use once() to prevent memory leaks from listeners that should only execute once.",
      },
      {
        question: "How do you remove an event listener?",
        solution:
          "Use removeListener() or off() (alias) to remove specific listeners. Example: emitter.removeListener('eventName', handlerFunction). The listener function must be the same reference used in on(). Use removeAllListeners() to remove all listeners for an event or all events: emitter.removeAllListeners('eventName') or emitter.removeAllListeners(). Always store listener references in variables for later removal. Check listener count with listenerCount(). Removing listeners prevents memory leaks in long-running applications.",
      },
      {
        question: "What is the difference between CommonJS and ES Modules?",
        solution:
          "CommonJS and ES Modules are two different module systems in JavaScript. CommonJS is Node.js's original module system that uses synchronous loading with require() and module.exports. It loads modules at runtime and supports dynamic imports. ES Modules (ESM) is the standardized JavaScript module system using import/export syntax, with static analysis, asynchronous loading, and tree-shaking support. CommonJS uses file-based modules while ESM supports both file-based and named exports. ESM has better tooling support and is the modern standard, while CommonJS remains widely used in Node.js applications.",
      },
      {
        question: "How do you export a function in CommonJS?",
        solution:
          "In CommonJS, you can export a function using module.exports or exports. For a single function: `module.exports = function myFunction() { return 'Hello'; }` or `exports.myFunction = function() { return 'Hello'; }`. For multiple functions: `module.exports = { func1: function() {}, func2: function() {} }` or `exports.func1 = function() {}; exports.func2 = function() {}`. The key difference is that module.exports replaces the entire exports object, while exports adds properties to the existing object.",
      },
      {
        question: "How do you import a module in CommonJS?",
        solution:
          "In CommonJS, you import modules using the require() function. For core modules: `const fs = require('fs')`. For local files: `const myModule = require('./myModule')` or `const myModule = require('./myModule.js')`. For npm packages: `const express = require('express')`. You can destructure imports: `const { readFile, writeFile } = require('fs')`. The require() function returns whatever was exported by module.exports. Relative paths start with './' or '../', while absolute module names don't have a path prefix.",
      },
      {
        question: "What is the difference between module.exports and exports?",
        solution:
          "Both module.exports and exports reference the same object initially, but they serve different purposes. module.exports is the actual object that gets returned when a module is required. exports is just a shorthand reference to module.exports. Key differences: You can reassign module.exports to export a single function or class: `module.exports = MyClass`, but you cannot do `exports = MyClass` as this breaks the reference. exports is used to add properties: `exports.prop = value`. If you reassign module.exports, exports becomes useless. Always use module.exports when exporting a single item, and either one for exporting multiple properties.",
      },
      {
        question: "How do you export in ES Modules?",
        solution:
          "ES Modules support two types of exports: named exports and default exports. Named exports: `export const myVar = 'value'`, `export function myFunc() {}`, or `export { var1, var2, func1 }`. Default export: `export default function() {}`, `export default class MyClass {}`, or `export default myVariable`. You can combine both: `export default MyClass; export const helper = () => {}`. You can also re-export from other modules: `export { something } from './other-module'` or `export * from './other-module'`. Use named exports for utilities and multiple items, default exports for the main functionality of a module.",
      },
      {
        question: "How do you import in ES Modules?",
        solution:
          "ES Modules use the import statement with various syntaxes. Default import: `import MyClass from './module'`. Named imports: `import { func1, var1 } from './module'`. Mixed import: `import MyClass, { helper } from './module'`. Namespace import: `import * as utils from './module'`. Renaming imports: `import { longName as short } from './module'`. Dynamic imports: `import('./module').then(module => {})` or `const module = await import('./module')`. Side-effect only: `import './module'`. ES modules are statically analyzable, meaning imports are resolved at compile time, enabling tree-shaking and better tooling support.",
      },
      {
        question: "What is a default export?",
        solution:
          "A default export is the primary export from an ES Module, representing the main functionality that the module provides. Each module can have only one default export. Syntax: `export default function() {}`, `export default class MyClass {}`, or `export default myVariable`. When importing, you don't use braces: `import MyComponent from './MyComponent'`. You can name the default import anything: `import AnyName from './MyComponent'`. Default exports are useful for modules that export a single main item like a React component, a class, or a primary function. They can be combined with named exports in the same module.",
      },
      {
        question: "Can you have multiple default exports?",
        solution:
          "No, you cannot have multiple default exports in a single module. Each ES Module can have only one default export. Attempting to have multiple default exports will result in a syntax error: 'Multiple default exports'. However, you can have multiple named exports along with one default export: `export default MyClass; export const helper = () => {}; export const utils = {}`. If you need to export multiple main items, use named exports instead: `export { Class1, Class2, mainFunction }`. The default export is meant to represent the primary, most important export from a module, so having multiple would be contradictory to this concept.",
      },
      {
        question: "What is module caching?",
        solution:
          "Module caching is a mechanism where Node.js stores loaded modules in memory to avoid reloading and re-executing them on subsequent require() calls. When you require a module for the first time, Node.js loads, compiles, and executes it, then caches the result in require.cache object. Subsequent require() calls for the same module return the cached version. This means module code runs only once, and all imports share the same instance (singleton behavior). Benefits include better performance, consistent state across imports, and preventing infinite recursion. The cache key is the fully resolved file path. This applies to both CommonJS and ES Modules, though ESM has a separate module cache.",
      },
      {
        question: "How do you clear module cache?",
        solution:
          "In CommonJS, you can clear module cache by deleting entries from require.cache object. To clear a specific module: `delete require.cache[require.resolve('./myModule')]`. To clear all cache: `Object.keys(require.cache).forEach(key => { delete require.cache[key]; })`. However, be cautious as this can cause issues with native modules and circular dependencies. For ES Modules, there's no direct way to clear cache as it's managed by the engine. Alternative approaches include using dynamic imports for fresh loads: `delete require.cache[path]; const fresh = require(path)`, or using tools like `decache` npm package, or implementing cache-busting in development environments.",
      },
      {
        question: "What is the module wrapper in Node.js?",
        solution:
          "The module wrapper is a function that Node.js uses to wrap every CommonJS module before execution. Each module is wrapped in: `(function(exports, require, module, __filename, __dirname) { /* module code */ })`. This wrapper provides the module with its own scope and makes available five important objects: exports (reference to module.exports), require (function to load other modules), module (reference to current module object), __filename (absolute path of current file), and __dirname (directory name of current file). This wrapper enables module isolation, prevents global scope pollution, and provides essential module functionality. It's why you can use these variables without importing them in any Node.js module.",
      },
      {
        question: "What are core modules?",
        solution:
          "Core modules are built-in modules that come with Node.js installation and provide essential functionality for server-side development. They include: fs (file system operations), http/https (HTTP server/client), path (file path utilities), os (operating system utilities), crypto (cryptographic functions), events (event emitter), stream (streaming data), url (URL parsing), util (utility functions), and many others. Core modules are compiled into the Node.js binary, so they load faster than file-based modules. You import them without a path: `const fs = require('fs')`. They're always available and don't need installation. Core modules take precedence over local modules with the same name.",
      },
      {
        question: "How do you check if a module is a core module?",
        solution:
          "You can check if a module is a core module using several methods. Method 1: Use require.resolve.paths() - if it returns null, it's a core module: `require.resolve.paths('fs') === null`. Method 2: Try to require it and check if it throws: `try { require('moduleName'); return true; } catch { return false; }`. Method 3: Use the built-in module list from Node.js: `const builtinModules = require('module').builtinModules; builtinModules.includes('fs')`. Method 4: Use require('util').types.isNativeModule() for native modules. Method 5: Check Node.js documentation or use packages like 'is-builtin-module' npm package for programmatic detection.",
      },
      {
        question: "What is the difference between local and global modules?",
        solution:
          "Local modules are installed in the current project's node_modules directory and are only accessible within that project. Install with: `npm install package-name`. They're project-specific, don't conflict between projects, and are included in package.json dependencies. Global modules are installed system-wide and accessible from anywhere in the terminal. Install with: `npm install -g package-name`. They're typically CLI tools like nodemon, pm2, or create-react-app. Local modules: better for project dependencies, version control, team collaboration, and avoiding version conflicts. Global modules: better for development tools and command-line utilities. Best practice: keep project dependencies local and only install CLI tools globally.",
      },
      {
        question: "What is npm?",
        solution:
          "npm (Node Package Manager) is the default package manager for Node.js and the world's largest software registry. It consists of three components: the CLI tool for managing packages, the online registry (npmjs.com) hosting packages, and the package.json file format. npm allows you to install, update, and manage JavaScript packages and dependencies. Key features: package installation (local/global), dependency management, version control, script running, package publishing, and security auditing. Commands include: npm install, npm uninstall, npm update, npm run, npm publish, npm audit. npm comes bundled with Node.js and manages both development and runtime dependencies for JavaScript projects.",
      },
      {
        question: "What is yarn?",
        solution:
          "Yarn (Yet Another Resource Negotiator) is an alternative package manager to npm, developed by Facebook (Meta). It was created to address npm's performance and security issues in earlier versions. Key features: faster package installation through parallel downloads and caching, deterministic installs with yarn.lock file, offline installation capability, workspaces for monorepos, and improved security with checksum verification. Commands: yarn add, yarn remove, yarn upgrade, yarn run, yarn publish. Yarn uses the same package.json format and npm registry but has its own lock file format. It offers better performance, more reliable dependency resolution, and additional features like workspaces and plug-and-play installations.",
      },
      {
        question: "What is the difference between npm and yarn?",
        solution:
          "npm and yarn are both package managers but differ in several aspects. Performance: Yarn is generally faster due to parallel downloads and better caching, though npm has improved significantly. Lock files: npm uses package-lock.json while yarn uses yarn.lock, with yarn having more deterministic installs initially. Installation: npm installs packages sequentially by default, yarn installs in parallel. Commands: slightly different syntax (npm install vs yarn add). Features: yarn has workspaces, offline mode, and plug-and-play, while npm has built-in security auditing and funding info. Storage: yarn has global cache, npm caches per project. Both are mature and capable, choice often depends on team preference and specific project needs.",
      },
      {
        question: "What is a package?",
        solution:
          "A package in the Node.js ecosystem is a reusable piece of code that can be shared and distributed. It consists of one or more modules bundled together with metadata describing the package. A package includes: source code files, package.json (metadata file), README documentation, license information, and optionally tests, configuration files, and binaries. Packages can be libraries (providing functionality), frameworks (application structure), tools (CLI utilities), or applications (complete programs). They're distributed through registries like npm, can have dependencies on other packages, and follow semantic versioning. Packages enable code reuse, modular development, and collaborative software development in the JavaScript ecosystem.",
      },
      {
        question: "What is package.json?",
        solution:
          "package.json is a metadata file that defines a Node.js project or package. It contains essential information including: name and version (required for published packages), description and keywords, author and license information, main entry point, scripts (npm run commands), dependencies (runtime requirements), devDependencies (development-only requirements), peerDependencies, engines (Node.js version requirements), and repository information. Key sections: 'dependencies' for runtime packages, 'devDependencies' for build/test tools, 'scripts' for automation commands, 'main' for entry point. This file enables dependency management, project configuration, script automation, and package publishing. It's the heart of every Node.js project.",
      },
      {
        question: "What are peer dependencies?",
        solution:
          "Peer dependencies are packages that your package expects to be installed alongside it, but doesn't install automatically. They're specified in the 'peerDependencies' field of package.json. Common use cases: plugin systems (webpack plugins expect webpack), UI libraries (React components expect React), and shared dependencies to avoid version conflicts. Example: a React component library specifies React as a peer dependency, expecting the consuming application to provide React. Benefits: prevents duplicate installations, ensures version compatibility, reduces bundle size. npm 7+ automatically installs peer dependencies, while earlier versions show warnings. Peer dependencies solve the problem of shared dependencies and version conflicts in the dependency tree.",
      },
      {
        question: "What is npm audit?",
        solution:
          "npm audit is a security feature that scans your project dependencies for known vulnerabilities. It checks packages against the npm security database and provides a detailed report of security issues. Command: `npm audit` shows vulnerabilities, `npm audit fix` attempts automatic fixes, `npm audit fix --force` applies breaking changes if needed. The report includes: vulnerability severity (low, moderate, high, critical), affected packages, vulnerability details, and recommended actions. It also provides a summary with total vulnerabilities by severity level. npm audit helps maintain secure applications by identifying and fixing security issues in dependencies. It should be run regularly as part of the development workflow and CI/CD pipeline.",
      },
      {
        question: "What is the fs module?",
        solution:
          "The fs (file system) module is a core Node.js module that provides an API for interacting with the file system. It allows you to read, write, create, delete, and manipulate files and directories. The module offers both synchronous and asynchronous methods for most operations. Common methods include: fs.readFile/readFileSync (read files), fs.writeFile/writeFileSync (write files), fs.mkdir/mkdirSync (create directories), fs.unlink/unlinkSync (delete files), fs.stat/statSync (file information), and fs.watch (monitor file changes). It supports various file formats, handles file permissions, and provides stream-based operations for large files. Usage: `const fs = require('fs')`. Essential for server-side file operations and data persistence.",
      },
      {
        question:
          "What is the difference between fs.readFile() and fs.readFileSync()?",
        solution:
          "fs.readFile() and fs.readFileSync() both read files but differ in execution model. fs.readFile() is asynchronous (non-blocking) - it uses callbacks or promises, doesn't block the event loop, and allows other operations to continue while reading. Syntax: `fs.readFile('file.txt', 'utf8', (err, data) => {})` or with promises: `const data = await fs.promises.readFile('file.txt', 'utf8')`. fs.readFileSync() is synchronous (blocking) - it returns data directly, blocks the event loop until complete, and stops all other operations. Syntax: `const data = fs.readFileSync('file.txt', 'utf8')`. Use async version for better performance and non-blocking I/O in servers, sync version for initialization scripts or simple CLI tools.",
      },
      {
        question: "How do you remove all listeners for an event?",
        solution:
          "Use `emitter.removeAllListeners([eventName])`. Without eventName parameter, it removes all listeners for all events. With eventName, it removes only listeners for that specific event. Example: `emitter.removeAllListeners('data')` removes all 'data' event listeners. Use `emitter.listenerCount('eventName')` to verify removal. This is useful for cleanup to prevent memory leaks, especially in long-running applications or when dynamically adding/removing listeners.",
      },
      {
        question: "What is event bubbling in Node.js?",
        solution:
          "Node.js doesn't have event bubbling like DOM events. EventEmitter is flat - events don't bubble up a hierarchy. However, you can simulate bubbling by manually propagating events through a chain of emitters. For hierarchical event handling, you'd need to implement custom logic where child emitters explicitly emit events on parent emitters. Libraries like 'eventemitter3' provide more advanced features, but core EventEmitter keeps it simple with direct emission only.",
      },
      {
        question: "How do you get the list of event names?",
        solution:
          "Use `emitter.eventNames()` which returns an array of event names that have listeners. Example: `const events = emitter.eventNames(); console.log(events);` This is useful for debugging, introspection, or cleanup operations. The returned array contains string or Symbol event names. You can also use `emitter.listeners(eventName)` to get actual listener functions for a specific event, or `emitter.listenerCount(eventName)` to get the count.",
      },
      {
        question: "What happens if you emit an event with no listeners?",
        solution:
          "Nothing happens - the event is simply ignored and execution continues normally. No error is thrown. This is by design for loose coupling. However, the 'error' event is special - if you emit an 'error' event with no listeners, Node.js will throw an unhandled exception and potentially crash the process. Example: `emitter.emit('nonexistent-event', data)` does nothing, but `emitter.emit('error', new Error())` with no error listeners will crash the app.",
      },
      {
        question: "What is the 'error' event?",
        solution:
          "The 'error' event is a special built-in event in Node.js EventEmitter used for error handling. When emitted without listeners, it throws an unhandled exception that can crash the process. It's the standard way to handle asynchronous errors in Node.js. Always add error listeners: `emitter.on('error', (err) => console.error(err))`. Many Node.js APIs automatically emit 'error' events (streams, HTTP requests, etc.), so proper error handling is crucial for application stability.",
      },
      {
        question: "How do you handle the error event?",
        solution:
          "Always add an error listener using `emitter.on('error', (error) => { /* handle error */ })`. Best practices: 1) Add error listeners before other listeners, 2) Log the error with context, 3) Decide whether to recover or terminate gracefully, 4) Use domains or try-catch for synchronous code, 5) For streams, handle both 'error' and 'close' events. Example: `emitter.on('error', (err) => { logger.error('EventEmitter error:', err); process.exit(1); })`. Consider using process.on('uncaughtException') as a last resort.",
      },
      {
        question: "What is the maximum number of listeners?",
        solution:
          "By default, EventEmitter warns when more than 10 listeners are added to prevent memory leaks. Use `emitter.setMaxListeners(n)` to change this limit, or `EventEmitter.defaultMaxListeners = n` globally. Set to 0 for unlimited (not recommended). The warning appears in console but doesn't prevent adding more listeners. Example: `emitter.setMaxListeners(20)`. Good practice is to investigate why you need many listeners - often indicates design issues or missing cleanup of unused listeners.",
      },
      {
        question: "How do you extend EventEmitter?",
        solution:
          "Two main approaches: 1) Inheritance: `class MyClass extends EventEmitter { constructor() { super(); } }` 2) Composition: `const events = require('events'); class MyClass { constructor() { this.emitter = new events.EventEmitter(); } on(event, listener) { this.emitter.on(event, listener); } }`. Inheritance is cleaner for simple cases, composition provides more control. Always call `super()` in constructor when using inheritance. You can then emit custom events and use all EventEmitter methods.",
      },
      {
        question: "What is the 'newListener' event?",
        solution:
          "The 'newListener' event is automatically emitted when a new listener is added to any event. It receives the event name and listener function as arguments. Useful for monitoring, debugging, or dynamic behavior. Example: `emitter.on('newListener', (eventName, listener) => console.log('New listener added for:', eventName))`. There's also 'removeListener' event for when listeners are removed. Note: 'newListener' is emitted before the listener is actually added to the internal array.",
      },
      {
        question: "How do you create a basic HTTP server?",
        solution:
          "Use the built-in `http` module: `const http = require('http'); const server = http.createServer((req, res) => { res.writeHead(200, {'Content-Type': 'text/plain'}); res.end('Hello World'); }); server.listen(3000, () => console.log('Server running on port 3000'));`. The callback receives request and response objects. Use `res.writeHead()` for status/headers, `res.write()` for body content, and `res.end()` to finish. The server is an EventEmitter that emits 'request', 'connection', 'close' events.",
      },
      {
        question: "What are the main components of an HTTP request?",
        solution:
          "HTTP request components: 1) **Method** (GET, POST, PUT, DELETE) - `req.method`, 2) **URL** - `req.url` (path + query string), 3) **Headers** - `req.headers` (object with key-value pairs), 4) **Body** - request payload (for POST/PUT), accessed via data events, 5) **HTTP Version** - `req.httpVersion`, 6) **Query Parameters** - parsed from URL, 7) **Path** - the route part of URL. Example: `console.log(req.method, req.url, req.headers['user-agent'])`. Use URL module to parse: `const url = require('url'); const parsed = url.parse(req.url, true);`.",
      },
      {
        question: "What are HTTP status codes?",
        solution:
          "HTTP status codes indicate request results: **1xx Informational** (100 Continue), **2xx Success** (200 OK, 201 Created, 204 No Content), **3xx Redirection** (301 Moved, 302 Found, 304 Not Modified), **4xx Client Errors** (400 Bad Request, 401 Unauthorized, 404 Not Found, 422 Unprocessable Entity), **5xx Server Errors** (500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable). Set with `res.statusCode = 404` or `res.writeHead(404)`. Common patterns: 200 for success, 400 for validation errors, 401 for auth issues, 404 for not found, 500 for server errors.",
      },
      {
        question: "How do you handle different HTTP methods?",
        solution:
          "Check `req.method` property and route accordingly: `if (req.method === 'GET') { /* handle GET */ } else if (req.method === 'POST') { /* handle POST */ }`. Better approach using switch: `switch(req.method) { case 'GET': handleGet(req, res); break; case 'POST': handlePost(req, res); break; default: res.statusCode = 405; res.end('Method Not Allowed'); }`. For complex routing, use frameworks like Express. Consider using method-specific middleware and separate handler functions for better organization and maintainability.",
      },
      {
        question: "How do you parse URL parameters?",
        solution:
          "Use the built-in `url` module: `const url = require('url'); const querystring = require('querystring'); const parsed = url.parse(req.url, true); const query = parsed.query;`. For `/api/users?name=john&age=25`: `query.name` returns 'john', `query.age` returns '25'. Alternative: `const { URL, URLSearchParams } = require('url'); const myURL = new URL(req.url, 'http://localhost'); const params = myURL.searchParams; params.get('name');`. Remember to handle missing parameters and validate input data.",
      },
      {
        question: "How do you read POST data?",
        solution:
          "POST data comes in chunks via events: `let body = ''; req.on('data', chunk => { body += chunk; }); req.on('end', () => { try { const data = JSON.parse(body); console.log(data); } catch(e) { res.statusCode = 400; res.end('Invalid JSON'); } });`. For form data, parse with querystring: `const data = querystring.parse(body);`. Always handle parsing errors, set content-length limits to prevent DoS attacks, and validate the Content-Type header. Consider using body-parser middleware in production applications.",
      },
      {
        question: "What is middleware?",
        solution:
          "Middleware are functions that execute during the request-response cycle, having access to request (req), response (res), and next middleware function (next). They can: 1) Execute code, 2) Modify req/res objects, 3) End request-response cycle, 4) Call next middleware with `next()`. Types: Application-level (app.use()), Router-level, Error-handling, Built-in (express.static), Third-party (body-parser, cors). Example: `app.use((req, res, next) => { console.log('Time:', Date.now()); next(); });`. Order matters - middleware executes sequentially.",
      },
      {
        question: "What is Express.js?",
        solution:
          "Express.js is a minimal, fast, and flexible Node.js web application framework that provides robust features for web and mobile applications. It's built on top of Node.js http module and provides: 1) **Routing** - URL path handling, 2) **Middleware** - request processing pipeline, 3) **Template engines** - view rendering, 4) **Static file serving**, 5) **Error handling**, 6) **HTTP utilities**. It simplifies server creation, routing, and middleware management. Express follows the middleware pattern and is highly extensible with thousands of npm packages. It's the 'E' in MEAN/MERN stacks.",
      },
      {
        question: "How do you create a basic Express server?",
        solution:
          "Install Express: `npm install express`. Create server: `const express = require('express'); const app = express(); const port = 3000; app.get('/', (req, res) => { res.send('Hello World!'); }); app.listen(port, () => { console.log('Server running at http://localhost:3000'); });`. The `app` object represents the Express application. Use `app.METHOD()` for routing (get, post, put, delete). `res.send()` automatically sets Content-Type and ends response. Express handles much of the HTTP boilerplate compared to raw Node.js http module.",
      },
      {
        question: "What are route parameters in Express?",
        solution:
          "Route parameters are named URL segments that capture values at their position. Defined with colon syntax: `app.get('/users/:id', (req, res) => { const userId = req.params.id; res.send('User ID: ' + userId); });`. Multiple parameters: `app.get('/users/:userId/posts/:postId', (req, res) => { const { userId, postId } = req.params; });`. Optional parameters: `app.get('/posts/:year/:month?', ...)`. Use parameter validation with express-validator or custom middleware. Parameters are always strings - convert with `parseInt()` or `Number()` if needed.",
      },
      {
        question: "How do you serve static files in Express?",
        solution:
          "Use built-in `express.static` middleware: `app.use(express.static('public'));` serves files from 'public' directory. Access files: `http://localhost:3000/images/logo.png` maps to `/public/images/logo.png`. Virtual path prefix: `app.use('/static', express.static('public'));` then access via `/static/images/logo.png`. Multiple static directories: `app.use(express.static('public')); app.use(express.static('files'));`. Options: `app.use(express.static('public', { maxAge: '1d', etag: false }));`. Express looks for files in order of middleware registration.",
      },
      {
        question: "What is body parsing in Express?",
        solution:
          "Body parsing extracts data from request bodies. Express 4.16+ has built-in parsers: `app.use(express.json())` for JSON data, `app.use(express.urlencoded({ extended: true }))` for form data. Access parsed data via `req.body`. For older versions, use body-parser: `const bodyParser = require('body-parser'); app.use(bodyParser.json());`. Configure limits: `express.json({ limit: '10mb' })`. Handle parsing errors with error middleware. Different content types need appropriate parsers - multipart/form-data requires multer for file uploads.",
      },
      {
        question: "What is CORS?",
        solution:
          "CORS (Cross-Origin Resource Sharing) is a security mechanism that allows/restricts web pages to make requests to different domains. Browsers block cross-origin requests by default for security. CORS headers tell browsers which origins are allowed. **Simple requests** (GET, POST with basic headers) get automatic preflight. **Complex requests** (PUT, DELETE, custom headers) trigger preflight OPTIONS request. Key headers: `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers`. Without proper CORS setup, frontend apps can't call APIs on different domains/ports.",
      },
      {
        question: "How do you enable CORS in Express?",
        solution:
          "Install cors middleware: `npm install cors`. Basic usage: `const cors = require('cors'); app.use(cors());` allows all origins. Configure origins: `app.use(cors({ origin: ['http://localhost:3000', 'https://myapp.com'] }));`. Method-specific: `app.use(cors({ methods: ['GET', 'POST'] }));`. Route-specific: `app.get('/api/data', cors(), handler);`. Manual setup: `app.use((req, res, next) => { res.header('Access-Control-Allow-Origin', '*'); res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); next(); });`.",
      },
      {
        question:
          "What is the difference between req.params, req.query, and req.body?",
        solution:
          "**req.params** - Route parameters from URL path: `/users/:id` → `req.params.id`. **req.query** - Query string parameters: `/users?name=john&age=25` → `req.query.name`, `req.query.age`. **req.body** - Request body data (POST/PUT): JSON or form data → `req.body.username`. Examples: For `GET /users/123?sort=name`, `req.params.id = '123'`, `req.query.sort = 'name'`. For `POST /users` with JSON body `{\"name\": \"John\"}`, `req.body.name = 'John'`. Params are from URL structure, query from URL parameters, body from request payload.",
      },
      {
        question: "What is routing in Express?",
        solution:
          "Routing determines how an application responds to client requests for specific endpoints (URL paths + HTTP methods). Express provides: **Basic routes**: `app.get('/', handler)`, `app.post('/users', handler)`. **Route patterns**: `/users/:id`, `/files/*`, `/ab?cd` (optional 'b'), `/ab+cd` (one+ 'b'), `/ab*cd` (wildcard). **Route handlers**: Multiple callbacks, middleware arrays. **express.Router()**: Modular routing - create route modules, mount with `app.use('/api', router)`. **Route parameters**, **query strings**, and **middleware** integration. Routing enables RESTful API design and organized URL structure.",
      },
      {
        question: "How do you handle 404 errors in Express?",
        solution:
          "404 errors in Express are handled by creating a catch-all middleware at the end of your middleware stack. Since Express processes middleware in order, any request that doesn't match previous routes will reach this middleware. Create it using app.use() with no path specified, and it should be the last middleware before error handlers. Example: app.use((req, res, next) => { res.status(404).json({ error: 'Page not found' }); }). You can also use next() to pass it to an error handler: app.use((req, res, next) => { const error = new Error('Not Found'); error.status = 404; next(error); }). This approach allows centralized error handling and consistent 404 responses across your application.",
      },
      {
        question: "What is app.use() in Express?",
        solution:
          "app.use() is a method in Express that mounts middleware functions to the application. Middleware functions are executed sequentially for every request (unless a path is specified). It can accept an optional path parameter and one or more middleware functions. Without a path, it applies to all routes: app.use(express.json()). With a path, it applies only to routes starting with that path: app.use('/api', authMiddleware). You can chain multiple middleware: app.use(middleware1, middleware2, middleware3). The middleware functions receive (req, res, next) parameters, and must call next() to pass control to the next middleware, unless they end the request-response cycle by sending a response.",
      },
      {
        question: "What is the next() function in Express middleware?",
        solution:
          "The next() function is a callback parameter passed to middleware functions that passes control to the next middleware in the stack. When called without arguments next(), it continues to the next middleware. When called with an argument next(error), it skips all remaining non-error middleware and jumps directly to error-handling middleware. If you don't call next() and don't send a response, the request will hang indefinitely. You can also call next('route') to skip remaining middleware for the current route and move to the next route handler. Example: app.use((req, res, next) => { console.log('Time:', Date.now()); next(); // Continue to next middleware }). The next() function is essential for the middleware chain to function properly.",
      },
      {
        question: "How do you create custom middleware in Express?",
        solution:
          "Custom middleware in Express is created as a function that accepts (req, res, next) parameters. You can create it as a standalone function: const myMiddleware = (req, res, next) => { // Custom logic here, req.customProperty = 'value'; next(); }; then use it with app.use(myMiddleware). You can create parameterized middleware by returning a middleware function: const authMiddleware = (requiredRole) => { return (req, res, next) => { if (req.user && req.user.role === requiredRole) { next(); } else { res.status(403).send('Forbidden'); } }; }; Usage: app.use('/admin', authMiddleware('admin')). Middleware can modify request/response objects, end the request-response cycle, or call next middleware. Always call next() unless you're ending the response.",
      },
      {
        question: "What is the difference between app.get() and app.use()?",
        solution:
          "app.get() is for handling specific HTTP GET requests to specific routes, while app.use() is for mounting middleware that applies to all HTTP methods (or specific paths). app.get('/users', handler) only responds to GET requests to '/users' exactly. app.use('/users', middleware) applies to ALL HTTP methods (GET, POST, PUT, DELETE) for any route starting with '/users' (including '/users/123', '/users/profile'). app.get() is typically used for route handlers that send responses, while app.use() is for middleware that processes requests before they reach route handlers. app.get() handlers usually don't call next() as they send responses, while app.use() middleware should call next() to continue the chain. You can have multiple app.get() for the same path with different middleware, but they execute in order until one sends a response.",
      },
      {
        question: "How do you handle errors in Express?",
        solution:
          "Express has built-in error handling through error-handling middleware that has 4 parameters: (err, req, res, next). Define error handlers after all other middleware and routes: app.use((err, req, res, next) => { console.error(err.stack); res.status(err.status || 500).json({ error: err.message }); }). Errors reach this handler when: 1) You call next(error), 2) An unhandled exception occurs in middleware/routes, 3) A promise is rejected (with express-async-errors package). For async routes, wrap in try-catch: app.get('/async-route', async (req, res, next) => { try { const data = await someAsyncOperation(); res.json(data); } catch (error) { next(error); } }). You can have multiple error handlers for different error types. Express will use the default error handler if you don't define one.",
      },
      {
        question: "What is a template engine?",
        solution:
          "A template engine is a tool that allows you to generate HTML dynamically by combining static template files with dynamic data. It separates presentation (HTML structure) from logic (data processing), making code more maintainable. Template engines use special syntax to embed variables, loops, conditionals, and other logic within HTML templates. For example, a template might have {{username}} which gets replaced with actual user data at runtime. Benefits include: code reusability through partials/layouts, automatic HTML escaping for security, separation of concerns, and easier maintenance. Template engines compile templates into functions that accept data and return HTML strings. They're essential for server-side rendering where HTML is generated on the server before sending to the client, unlike client-side frameworks that render in the browser.",
      },
      {
        question: "How do you set up a template engine in Express?",
        solution:
          "Set up a template engine in Express using app.set() to configure the view engine and views directory. Steps: 1) Install the template engine: npm install ejs (or pug, handlebars). 2) Set the view engine: app.set('view engine', 'ejs'). 3) Set views directory: app.set('views', './views') or app.set('views', path.join(__dirname, 'views')). 4) Create template files in the views directory with the appropriate extension (.ejs, .pug, .hbs). 5) Use res.render() in routes: app.get('/', (req, res) => { res.render('index', { title: 'Home', users: ['John', 'Jane'] }); }). The template engine will automatically look for 'index.ejs' in the views directory and render it with the provided data. You can also configure additional settings like template caching for production.",
      },
      {
        question: "What are popular template engines for Node.js?",
        solution:
          "Popular template engines for Node.js include: 1) EJS (Embedded JavaScript) - Uses familiar JavaScript syntax, easy to learn, supports includes and layouts. Syntax: <% for loops %>, <%= variables %>. 2) Pug (formerly Jade) - Clean, indentation-based syntax, very concise, built-in features like mixins and inheritance. 3) Handlebars - Logic-less templates, great for simple use cases, supports helpers and partials. 4) Mustache - Logic-less, language-agnostic, simple syntax with {{}} for variables. 5) Nunjucks - Rich templating language inspired by Python's Jinja2, supports inheritance, macros, and async rendering. 6) Twig - Similar to Twig for PHP, good for developers familiar with Symfony. Each has different strengths: EJS for JavaScript familiarity, Pug for clean syntax, Handlebars for logic separation, and Nunjucks for advanced features.",
      },
      {
        question: "What is a callback function?",
        solution:
          "A callback function is a function passed as an argument to another function and executed at a specific time, usually after some operation completes. It's a fundamental concept in JavaScript's asynchronous programming. The receiving function decides when and how to call the callback. Example: function processData(data, callback) { setTimeout(() => { const result = data.toUpperCase(); callback(result); }, 1000); } processData('hello', (result) => { console.log(result); // 'HELLO' }). Callbacks enable asynchronous operations without blocking the main thread. They're used extensively in Node.js for file operations, HTTP requests, database queries, and event handling. The callback typically follows the Node.js convention of (error, result) where the first parameter is an error object (null if no error) and the second is the successful result.",
      },
      {
        question: "What are the problems with callbacks?",
        solution:
          "Callbacks have several problems: 1) Callback Hell (Pyramid of Doom) - Nested callbacks create deeply indented, hard-to-read code: getData(a, (err, a) => { getData(b, (err, b) => { getData(c, (err, c) => { // deeply nested }); }); }). 2) Error Handling - Each callback needs individual error handling, leading to repetitive code and potential missed errors. 3) Inversion of Control - You pass your callback to another function, losing control over when/how it's called. 4) No Built-in Composition - Hard to combine multiple async operations. 5) Debugging Difficulty - Stack traces are confusing with nested callbacks. 6) Trust Issues - Third-party libraries might call your callback multiple times, never call it, or call it with wrong parameters. These problems led to the development of Promises and async/await as better alternatives for handling asynchronous operations.",
      },
      {
        question: "What is a Promise?",
        solution:
          "A Promise is an object representing the eventual completion or failure of an asynchronous operation. It's a cleaner alternative to callbacks for handling async code. A Promise has three states: Pending (initial state), Fulfilled (operation completed successfully), and Rejected (operation failed). Once settled (fulfilled or rejected), a Promise cannot change state. Promises provide methods like .then() for handling success, .catch() for handling errors, and .finally() for cleanup. Example: const promise = new Promise((resolve, reject) => { setTimeout(() => resolve('Success!'), 1000); }); promise.then(result => console.log(result)).catch(error => console.error(error)). Promises solve callback problems by: providing better error handling, avoiding callback hell through chaining, enabling composition with Promise.all(), and offering better debugging with stack traces.",
      },
      {
        question: "How do you create a Promise?",
        solution:
          "Create a Promise using the Promise constructor that takes an executor function with resolve and reject parameters: const promise = new Promise((resolve, reject) => { // Async operation here, if (someCondition) { resolve('Success value'); } else { reject(new Error('Error message')); } }). The executor runs immediately when the Promise is created. Call resolve(value) when the operation succeeds, or reject(error) when it fails. You can also create resolved/rejected Promises directly: Promise.resolve('immediate value') or Promise.reject(new Error('immediate error')). Example with setTimeout: const delayedPromise = new Promise((resolve) => { setTimeout(() => resolve('Done after 2 seconds'), 2000); }). Always handle both success and failure cases, and avoid common mistakes like not calling resolve/reject or calling them multiple times (only the first call matters).",
      },
      {
        question: "What are Promise methods?",
        solution:
          "Promise methods include: 1) Instance methods - .then(onFulfilled, onRejected): handles fulfilled/rejected states, returns new Promise for chaining. .catch(onRejected): handles only rejection, equivalent to .then(null, onRejected). .finally(onFinally): executes regardless of outcome, for cleanup. 2) Static methods - Promise.resolve(value): creates fulfilled Promise. Promise.reject(reason): creates rejected Promise. Promise.all(iterable): waits for all promises to fulfill, rejects if any reject. Promise.allSettled(iterable): waits for all promises to settle, never rejects. Promise.race(iterable): resolves/rejects with first settled promise. Promise.any(iterable): fulfills with first fulfilled promise. Example: Promise.all([promise1, promise2]).then(results => console.log(results)).catch(error => console.error(error)). These methods enable powerful composition and control flow patterns for async operations.",
      },
      {
        question: "What is Promise.resolve()?",
        solution:
          "Promise.resolve() is a static method that creates a Promise that is immediately resolved with the given value. If the value is already a Promise, it returns that Promise unchanged. If it's a thenable (has a .then method), it converts it to a Promise. Otherwise, it creates a fulfilled Promise with that value. Usage: Promise.resolve(42).then(value => console.log(value)); // 42. It's useful for: 1) Converting values to Promises for consistent async handling. 2) Starting Promise chains: Promise.resolve(data).then(process).then(save). 3) Ensuring a function always returns a Promise: function maybeAsync(value) { return Promise.resolve(value); }. 4) Converting thenables to native Promises. 5) Creating resolved Promises for testing. It's the opposite of Promise.reject() and commonly used when you need to wrap synchronous values in Promise-based APIs.",
      },
      {
        question: "What is Promise.reject()?",
        solution:
          "Promise.reject() is a static method that creates a Promise that is immediately rejected with the given reason (usually an Error object). Unlike Promise.resolve(), it doesn't unwrap thenables - it always creates a rejected Promise with the provided value as the rejection reason. Usage: Promise.reject(new Error('Something failed')).catch(error => console.error(error)). It's useful for: 1) Creating rejected Promises for error scenarios. 2) Early returns in Promise chains: if (!isValid) return Promise.reject(new Error('Invalid')); 3) Testing error handling in Promise-based code. 4) Converting synchronous errors to Promise rejections. 5) Consistent error handling in APIs. Example: function validateAndProcess(data) { if (!data) return Promise.reject(new Error('Data required')); return processData(data); }. Always pass Error objects rather than strings for better debugging and stack traces.",
      },
      {
        question: "What is async/await?",
        solution:
          "async/await is syntactic sugar over Promises that makes asynchronous code look and behave more like synchronous code. 'async' keyword marks a function as asynchronous and makes it automatically return a Promise. 'await' keyword pauses function execution until the Promise resolves, then returns the resolved value. Example: async function fetchData() { const response = await fetch('/api/data'); const data = await response.json(); return data; }. Benefits: 1) Cleaner, more readable code than Promise chains. 2) Better error handling with try-catch. 3) Easier debugging with normal stack traces. 4) Sequential async operations are more intuitive. 5) Conditional async operations are simpler. async functions always return Promises, so you can chain .then()/.catch() or await them. await can only be used inside async functions (or top-level in modules). It effectively converts Promise-based code to synchronous-looking code.",
      },
      {
        question: "How do you declare an async function?",
        solution:
          "Declare async functions using the 'async' keyword before the function declaration. Methods: 1) Function Declaration: async function myFunction() { return 'hello'; }. 2) Function Expression: const myFunction = async function() { return 'hello'; }. 3) Arrow Function: const myFunction = async () => { return 'hello'; }. 4) Method in Object: const obj = { async myMethod() { return 'hello'; } }. 5) Class Method: class MyClass { async myMethod() { return 'hello'; } }. async functions automatically return Promises - if you return a value, it's wrapped in Promise.resolve(). If you throw an error, it becomes Promise.reject(). Example: async function getData() { const result = await fetch('/api'); return result.json(); } // Returns Promise. You can then call: getData().then(data => console.log(data)) or await getData() inside another async function.",
      },
      {
        question: "What does the await keyword do?",
        solution:
          "The await keyword pauses the execution of an async function until a Promise settles (resolves or rejects), then returns the resolved value or throws the rejection reason. It can only be used inside async functions (or at the top level in modules). When await encounters a Promise, it: 1) Pauses function execution. 2) Waits for the Promise to settle. 3) Returns resolved value or throws rejection. Example: async function example() { const result = await fetch('/api'); // Pauses here until fetch completes, const data = await result.json(); // Pauses here until JSON parsing completes, return data; // Returns the parsed data }. await makes async code read like synchronous code. If the awaited Promise rejects, await throws that error, which can be caught with try-catch. await works with any thenable, not just Promises. Multiple awaits execute sequentially unless wrapped in Promise.all().",
      },
      {
        question: "Can you use await without async?",
        solution:
          "No, you cannot use await without async in most contexts. await can only be used: 1) Inside async functions: async function test() { await promise; }. 2) At the top level of ES modules (Node.js 14.8+ with --experimental-top-level-await flag, or ES2022 modules): await fetch('/api'); // Only in module scope, not in CommonJS or scripts. Attempting to use await in regular functions causes a SyntaxError: 'await' is only valid in async functions and the top level bodies of modules. If you need to wait for a Promise in non-async code, use .then(): promise.then(result => console.log(result)). However, top-level await in modules is becoming more widely supported, allowing await directly in module files without wrapping in async functions. This is useful for module initialization that depends on async operations.",
      },
      {
        question: "How do you handle errors in async/await?",
        solution:
          "Handle errors in async/await using try-catch blocks, which catch both synchronous errors and rejected Promises. Example: async function handleData() { try { const response = await fetch('/api'); const data = await response.json(); return data; } catch (error) { console.error('Error:', error); throw error; // Re-throw if needed } }. Additional patterns: 1) Handle specific errors: try { await riskyOperation(); } catch (error) { if (error.code === 'NETWORK_ERROR') { // Handle network error } else { throw error; } }. 2) Finally block for cleanup: try { const data = await fetchData(); } catch (error) { console.error(error); } finally { cleanup(); }. 3) Multiple operations: try { const [user, posts] = await Promise.all([getUser(), getPosts()]); } catch (error) { // Handles errors from either operation }. Remember that unhandled rejections in async functions become unhandled Promise rejections.",
      },
      {
        question: "What happens if you don't await a Promise?",
        solution:
          "If you don't await a Promise, the function continues executing without waiting for the Promise to resolve, and you get the Promise object itself rather than its resolved value. Example: async function example() { const promise = fetch('/api'); // Returns Promise, not data, console.log(promise); // Logs: Promise { <pending> }, const data = await promise; // Now we wait and get the actual data }. Consequences: 1) You lose the resolved value and get a Promise object. 2) The async operation may complete after your function finishes. 3) Errors in the unawaited Promise become unhandled rejections. 4) Timing issues - your code might not work as expected. 5) Memory leaks if Promises accumulate. This is sometimes intentional for fire-and-forget operations: fetch('/analytics', { method: 'POST', body: data }); // Don't wait for analytics. But usually, you want to await Promises to handle their results and errors properly.",
      },
      {
        question: "Can async functions return non-Promise values?",
        solution:
          "Yes, async functions can return non-Promise values, but they are automatically wrapped in a resolved Promise. Whatever you return from an async function becomes the resolved value of the Promise that the function returns. Examples: async function returnString() { return 'hello'; } // Returns Promise<string> that resolves to 'hello'. async function returnNumber() { return 42; } // Returns Promise<number> that resolves to 42. async function returnObject() { return { name: 'John' }; } // Returns Promise<object>. Usage: returnString().then(str => console.log(str)); // 'hello', or const str = await returnString(); // 'hello'. If you return a Promise from an async function, it's not double-wrapped - the returned Promise is used directly. If you don't return anything, the function returns Promise<undefined>. This auto-wrapping makes async functions consistent - they always return Promises, making them composable with other async operations.",
      },
      {
        question:
          "What is the difference between Promise.all() and awaiting multiple promises separately?",
        solution:
          "Promise.all() executes Promises concurrently (in parallel) and waits for all to complete, while awaiting separately executes them sequentially (one after another). Promise.all(): const [result1, result2] = await Promise.all([promise1, promise2]); // Both start immediately, total time = max(time1, time2). Sequential await: const result1 = await promise1; // Waits for promise1, const result2 = await promise2; // Then starts and waits for promise2, total time = time1 + time2. Promise.all() is faster when operations can run independently. It fails fast - if any Promise rejects, Promise.all() immediately rejects. Sequential await provides more control - you can use result1 in promise2, handle errors individually, or conditionally execute promise2. Use Promise.all() when: operations are independent, you want maximum speed, all must succeed. Use sequential await when: operations depend on each other, you need individual error handling, or operations should run one at a time.",
      },
      {
        question: "How do you convert a callback-based function to Promise?",
        solution:
          "Convert callback-based functions to Promises by wrapping them in a new Promise constructor. The pattern for Node.js-style callbacks (error-first): function promisify(callbackFunction) { return function(...args) { return new Promise((resolve, reject) => { callbackFunction(...args, (error, result) => { if (error) { reject(error); } else { resolve(result); } }); }); }; }. Example: const fs = require('fs'); const readFilePromise = promisify(fs.readFile); readFilePromise('file.txt', 'utf8').then(data => console.log(data)).catch(err => console.error(err)). For custom callbacks: function delay(ms, callback) { setTimeout(() => callback(null, 'done'), ms); } const delayPromise = () => new Promise((resolve, reject) => { delay(1000, (err, result) => { err ? reject(err) : resolve(result); }); }); Modern Node.js provides util.promisify() for this purpose.",
      },
      {
        question: "What is util.promisify()?",
        solution:
          "util.promisify() is a Node.js utility function that converts callback-based functions to Promise-based functions. It specifically works with functions that follow Node.js callback conventions (error-first callbacks where the last parameter is a callback function with (error, result) signature). Usage: const util = require('util'); const fs = require('fs'); const readFile = util.promisify(fs.readFile); readFile('file.txt', 'utf8').then(data => console.log(data)).catch(err => console.error(err)). It handles the error-first callback pattern automatically: if the first callback argument is truthy, it rejects the Promise; otherwise, it resolves with the second argument. Custom promisify symbol: functions can implement util.promisify.custom to provide custom Promise versions. Example: const sleep = util.promisify(setTimeout); await sleep(1000); // Wait 1 second. util.promisify() is the standard way to convert Node.js built-in functions and other callback-based APIs to work with Promises and async/await.",
      },
      {
        question: "What is Promise chaining?",
        solution:
          "Promise chaining is the practice of connecting multiple asynchronous operations in sequence using .then() methods. Each .then() returns a new Promise, allowing you to chain additional operations. The return value of one .then() becomes the input to the next .then(). Example: fetch('/api/user').then(response => response.json()).then(user => fetch(`/api/posts/${user.id}`)).then(response => response.json()).then(posts => console.log(posts)).catch(error => console.error(error)). Benefits: 1) Avoids callback hell. 2) Sequential async operations. 3) Single error handling with .catch(). 4) Each step can transform data for the next. Rules: 1) Always return values from .then() handlers. 2) Return Promises for async operations. 3) Add .catch() for error handling. 4) Use .finally() for cleanup. Modern alternative is async/await which makes the same logic more readable: const user = await fetch('/api/user').then(r => r.json()); const posts = await fetch(`/api/posts/${user.id}`).then(r => r.json()).",
      },
      {
        question: "How do you handle multiple async operations in parallel?",
        solution:
          "Handle multiple async operations in parallel using Promise.all(), Promise.allSettled(), or Promise.race() depending on your needs. Promise.all() - waits for all to succeed, fails if any fails: const [users, posts, comments] = await Promise.all([fetchUsers(), fetchPosts(), fetchComments()]); // All start immediately. Promise.allSettled() - waits for all to complete regardless of success/failure: const results = await Promise.allSettled([op1(), op2(), op3()]); results.forEach(result => { if (result.status === 'fulfilled') { console.log(result.value); } else { console.error(result.reason); } }). Promise.race() - resolves with the first completed: const fastest = await Promise.race([server1(), server2(), server3()]). For conditional parallel execution: const promises = []; if (needUsers) promises.push(fetchUsers()); if (needPosts) promises.push(fetchPosts()); const results = await Promise.all(promises). Use Promise.all() when all operations must succeed, Promise.allSettled() when some can fail, and Promise.race() for fastest response scenarios.",
      },
      {
        question:
          "What is the difference between throw and reject in Promises?",
        solution:
          "Both 'throw' and 'reject' create rejected Promises, but they're used in different contexts. 'throw' is used inside .then() handlers, async functions, or synchronous code to create a rejection: promise.then(data => { throw new Error('Something failed'); }).catch(error => console.error(error)). In async functions: async function example() { throw new Error('Failed'); // Creates rejected Promise }. 'reject' is used inside Promise constructor's executor function: new Promise((resolve, reject) => { reject(new Error('Failed')); }). Key differences: 1) Context - throw in handlers/async functions, reject in Promise constructors. 2) Timing - throw can be used for immediate synchronous errors, reject is for async operations. 3) Behavior - both create rejected Promises that can be caught with .catch() or try-catch in async functions. 4) Stack traces - throw preserves stack traces better. Best practice: use throw in async/await and .then() handlers, use reject only in Promise constructors. Both should typically use Error objects rather than strings for better debugging.",
      },
      {
        question: "Can you use async/await with forEach?",
        solution:
          "No, async/await doesn't work as expected with forEach() because forEach doesn't wait for async operations. forEach calls the callback function synchronously for each element, ignoring returned Promises. Example of what doesn't work: const items = [1, 2, 3]; items.forEach(async (item) => { await processItem(item); // These don't wait for each other }); console.log('Done'); // Prints immediately. Solutions: 1) Use for...of loop: for (const item of items) { await processItem(item); } // Sequential. 2) Use Promise.all() with map() for parallel: await Promise.all(items.map(async (item) => await processItem(item))); 3) Use for loop: for (let i = 0; i < items.length; i++) { await processItem(items[i]); }. 4) Use reduce for sequential with accumulator: await items.reduce(async (promise, item) => { await promise; return processItem(item); }, Promise.resolve()). The key issue is that forEach doesn't return a Promise, so there's nothing to await. Use proper async iteration methods instead.",
      },
      {
        question: "What is Promise.allSettled()?",
        solution:
          "Promise.allSettled() is a utility method that waits for all promises in an array to settle (either resolve or reject), returning an array of result objects. Unlike Promise.all() which fails fast on first rejection, allSettled() waits for all promises to complete. Each result object contains a 'status' property ('fulfilled' or 'rejected') and either a 'value' (for fulfilled) or 'reason' (for rejected). Example: Promise.allSettled([promise1, promise2]).then(results => results.forEach(result => console.log(result.status, result.value || result.reason))).",
      },
      {
        question: "What is the difference between settled and resolved?",
        solution:
          "A promise is 'settled' when it has completed execution (either fulfilled or rejected), while 'resolved' specifically means the promise has fulfilled successfully with a value. Settled is the umbrella term covering both resolved and rejected states. A resolved promise is always settled, but a settled promise may be rejected. The Promise lifecycle: Pending → Settled (which branches to either Fulfilled/Resolved or Rejected). This distinction is important when using methods like Promise.allSettled() vs Promise.all().",
      },
      {
        question: "How do you create a timeout Promise?",
        solution:
          "Create a timeout Promise using setTimeout() within the Promise constructor. Common pattern: const timeout = (ms) => new Promise((resolve, reject) => setTimeout(() => reject(new Error('Timeout')), ms)). For auto-resolving timeout: const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms)). You can combine with Promise.race() for timeout behavior: Promise.race([fetchData(), timeout(5000)]).catch(err => console.log('Request timed out')). Modern alternative: AbortController with fetch() API for cancellable requests.",
      },
      {
        question: "What happens if an async function throws an error?",
        solution:
          "When an async function throws an error, it automatically returns a rejected Promise with that error as the rejection reason. The error can be caught using .catch() on the returned Promise or try-catch when awaiting. Example: async function failing() { throw new Error('Oops'); } - calling failing() returns Promise.reject(Error('Oops')). If uncaught, it becomes an unhandled Promise rejection. Always wrap async function calls in try-catch or use .catch() to handle errors properly.",
      },
      {
        question: "What are global objects in Node.js?",
        solution:
          "Global objects in Node.js are objects available in all modules without requiring imports. Key globals include: global (global namespace), process (current Node.js process), console (debugging output), Buffer (binary data handling), setTimeout/setInterval (timers), __dirname (current directory path), __filename (current file path), require (module loader), module/exports (module system). Unlike browsers which have 'window', Node.js uses 'global'. These objects provide core functionality and environment information accessible throughout your application.",
      },
      {
        question: "What is the process object?",
        solution:
          "The process object is a global that provides information and control over the current Node.js process. It's an instance of EventEmitter offering properties like process.pid (process ID), process.platform (operating system), process.version (Node version), and methods like process.exit() (terminate process). Key features include: accessing command line arguments (process.argv), environment variables (process.env), working directory (process.cwd()), and listening to process events like 'exit', 'uncaughtException'. It's essential for process management and environment interaction.",
      },
      {
        question: "How do you access command line arguments?",
        solution:
          "Access command line arguments through process.argv array. process.argv[0] is the Node.js executable path, process.argv[1] is the script file path, and process.argv.slice(2) contains actual arguments. Example: node app.js --port 3000 name=John results in process.argv = ['/usr/bin/node', '/path/app.js', '--port', '3000', 'name=John']. For better parsing, use libraries like yargs or commander. You can also use process.argv.forEach((arg, index) => console.log(index, arg)) to iterate through arguments.",
      },
      {
        question: "What is process.env?",
        solution:
          "process.env is an object containing the user environment variables. It provides access to system environment variables like PATH, HOME, USER, and custom variables you set. Common usage: const port = process.env.PORT || 3000; const dbUrl = process.env.DATABASE_URL. Environment variables are string values, so convert when needed: parseInt(process.env.MAX_CONNECTIONS). They're useful for configuration without hardcoding values, especially for sensitive data like API keys. Set via shell (export VAR=value) or .env files with dotenv package.",
      },
      {
        question: "How do you exit a Node.js process?",
        solution:
          "Exit Node.js processes using process.exit([exitCode]) where exitCode is optional (0 for success, non-zero for error). Example: process.exit(1) for error exit. Alternatively, use return from main execution context or let the event loop empty naturally. For graceful shutdown, handle SIGTERM/SIGINT signals: process.on('SIGTERM', () => { cleanup(); process.exit(0); }). Avoid process.exit() in libraries as it prevents cleanup. Use throw new Error() to let calling code decide, or return error codes from main functions.",
      },
      {
        question: "What is process.cwd()?",
        solution:
          "process.cwd() returns the current working directory of the Node.js process as an absolute path string. This is the directory from which the node command was executed, not necessarily where the script file is located. Example: console.log(process.cwd()) might output '/home/user/projects/myapp'. You can change it using process.chdir('/new/path'). This is useful for resolving relative paths, file operations, and determining the execution context. Different from __dirname which shows the script file's directory location.",
      },
      {
        question: "What is __dirname?",
        solution:
          "__dirname is a global variable containing the absolute path of the directory containing the currently executing script file. Unlike process.cwd() which shows where Node was started, __dirname always points to the script's location. Example: if script is in '/home/user/app/lib/utils.js', __dirname equals '/home/user/app/lib'. Commonly used for: path.join(__dirname, 'config.json') to load files relative to script location. Note: __dirname is not available in ES modules; use import.meta.url with fileURLToPath() instead.",
      },
      {
        question: "What is __filename?",
        solution:
          "__filename is a global variable containing the absolute path and filename of the currently executing script. Example: if executing '/home/user/app/server.js', __filename equals '/home/user/app/server.js'. Useful for logging which file generated output, dynamic imports, or path operations. Common usage: path.basename(__filename) gets just filename, path.dirname(__filename) gets directory (same as __dirname). Like __dirname, it's not available in ES modules; use import.meta.url instead. Essential for file-relative operations and debugging.",
      },
      {
        question: "What is the difference between __dirname and process.cwd()?",
        solution:
          "__dirname represents the directory of the current script file, while process.cwd() represents the working directory from which Node.js was started. Key differences: __dirname is static (relative to file location), process.cwd() is dynamic (can change with process.chdir()). Example: script in '/app/lib/utils.js' executed from '/app' - __dirname = '/app/lib', process.cwd() = '/app'. __dirname is for file-relative paths, process.cwd() is for execution-relative paths. __dirname unavailable in ES modules, process.cwd() always available.",
      },
      {
        question: "What is the global object in Node.js?",
        solution:
          "The global object in Node.js is the top-level object that serves as the global namespace, similar to 'window' in browsers. Access via 'global' or 'globalThis'. Properties attached to global are accessible from any module without importing. However, unlike browsers, Node.js modules have their own scope - variables declared with var/let/const in modules are not automatically global. Common globals include: process, console, Buffer, setTimeout, require, __dirname, __filename. Best practice: avoid polluting global namespace; use module.exports/require for sharing between modules.",
      },
      {
        question: "What is the Buffer class?",
        solution:
          "Buffer is a global class for handling binary data in Node.js, representing fixed-size sequences of bytes. Before Node.js had good string handling for binary data, Buffer provided a way to work with raw memory. Buffers are useful for file I/O, network operations, cryptography, and image processing. Key features: fixed size (can't be resized), indexed like arrays, stores raw binary data. Example: Buffer.from('hello', 'utf8'), Buffer.alloc(10), buffer.toString('hex'). Buffers complement strings and are essential for low-level data manipulation.",
      },
      {
        question: "How do you create a Buffer?",
        solution:
          "Create Buffers using several methods: Buffer.from() creates from string/array/buffer - Buffer.from('hello', 'utf8') or Buffer.from([1,2,3]). Buffer.alloc(size) creates zero-filled buffer - Buffer.alloc(10). Buffer.allocUnsafe(size) creates uninitialized buffer (faster but contains random data). Buffer.concat([buf1, buf2]) joins multiple buffers. Examples: const buf1 = Buffer.from('Hello'); const buf2 = Buffer.alloc(5, 'a'); const buf3 = Buffer.concat([buf1, buf2]). Always specify encoding when working with text to avoid issues.",
      },
      {
        question: "What is console in Node.js?",
        solution:
          "console in Node.js is a global object providing debugging and output functionality, implementing a subset of the web console API. It writes to process.stdout (console.log) and process.stderr (console.error). The console object can be customized with new Console(stdout, stderr). Key difference from browser: Node.js console is synchronous for TTY destinations but may be asynchronous for files/pipes. Supports string substitution (%s, %d, %j), colors in TTY environments, and can be redirected. Essential for debugging, logging, and user output in CLI applications.",
      },
      {
        question: "What are the different console methods?",
        solution:
          "Node.js console provides multiple methods: console.log() for general output, console.error() for errors (writes to stderr), console.warn() as alias for error, console.info() as alias for log. Advanced methods: console.dir() for object inspection with options, console.table() for tabular data, console.time()/timeEnd() for performance timing, console.count() for counting occurrences, console.trace() for stack traces, console.assert() for conditional logging, console.clear() to clear terminal. Each serves specific debugging and output needs in development and production.",
      },
      {
        question: "What is setTimeout and setInterval?",
        solution:
          "setTimeout() and setInterval() are global timer functions. setTimeout(callback, delay, ...args) executes callback once after delay milliseconds. setInterval(callback, delay, ...args) executes callback repeatedly every delay milliseconds. Both return timer objects that can be cleared with clearTimeout()/clearInterval(). Examples: const timer = setTimeout(() => console.log('Done'), 1000); clearTimeout(timer). Important: minimum delay is ~1ms, actual delay may be longer due to event loop. Use for delayed execution, polling, animations, and scheduling tasks.",
      },
      {
        question: "What are the types of errors in Node.js?",
        solution:
          "Node.js has several error types: JavaScript errors (SyntaxError, TypeError, ReferenceError), System errors (ENOENT, EADDRINUSE - from OS operations), User-specified errors (custom Error objects), Assertion errors (from assert module). Categories include: Operational errors (expected errors like network failures, file not found) and Programmer errors (bugs like undefined variables, wrong types). Errors can be synchronous (thrown immediately) or asynchronous (passed to callbacks or rejected promises). Understanding error types helps in proper error handling strategies.",
      },
      {
        question: "How do you handle errors in Node.js?",
        solution:
          "Node.js error handling varies by context: Synchronous code uses try-catch blocks. Callbacks follow error-first convention: callback(err, result). Promises use .catch() or try-catch with async/await. Event emitters use 'error' event listeners. Examples: try { JSON.parse(data); } catch (err) { handle(err); }. For async: async function() { try { await operation(); } catch (err) { handle(err); } }. For streams: stream.on('error', handleError). Global handlers: process.on('uncaughtException') and process.on('unhandledRejection') for last resort error catching.",
      },
      {
        question: "What is the error-first callback convention?",
        solution:
          "Error-first callback convention is a Node.js pattern where callback functions receive error as the first parameter, followed by result data. Format: callback(error, result). If operation succeeds, error is null/undefined and result contains data. If operation fails, error contains Error object and result is typically undefined. Example: fs.readFile('file.txt', (err, data) => { if (err) return console.error(err); console.log(data); }). This convention provides consistent error handling across Node.js APIs and enables proper error propagation in asynchronous operations.",
      },
      {
        question: "How do you handle uncaught exceptions?",
        solution:
          "Handle uncaught exceptions using process.on('uncaughtException', handler) event listener. This catches synchronous errors that weren't caught by try-catch. Example: process.on('uncaughtException', (err) => { console.error('Uncaught Exception:', err); process.exit(1); }). Important: after uncaught exception, the process is in undefined state and should exit. For unhandled Promise rejections, use process.on('unhandledRejection'). Best practice: fix the root cause rather than relying on these handlers. Use domains or clustering for better error isolation in production.",
      },
      {
        question:
          "What is the difference between throw and return in error handling?",
        solution:
          "throw and return serve different purposes in error handling: 'throw' creates and raises an exception that stops normal execution flow and must be caught by try-catch or will become uncaught exception. 'return' simply exits function with a value and continues normal flow. Example: throw new Error('Failed') vs return { error: 'Failed' }. Throw is for exceptional conditions that should interrupt execution, return is for normal control flow with error information. In async functions, throw creates rejected Promise, return creates resolved Promise. Choose throw for true errors, return for controlled error responses.",
      },
      {
        question: "How do you create custom errors?",
        solution:
          "Create custom errors by extending the Error class or creating error factory functions. Class approach: class CustomError extends Error { constructor(message, code) { super(message); this.name = 'CustomError'; this.code = code; Error.captureStackTrace(this, CustomError); } }. Factory approach: function createError(message, type) { const err = new Error(message); err.type = type; return err; }. Usage: throw new CustomError('Something failed', 'CUSTOM_001'). Custom errors provide better error identification, additional context, and improved debugging capabilities.",
      },
      {
        question: "What is process.on('unhandledRejection')?",
        solution:
          "process.on('unhandledRejection') is an event listener that catches Promise rejections that weren't handled with .catch() or try-catch. Example: process.on('unhandledRejection', (reason, promise) => { console.error('Unhandled Rejection at:', promise, 'reason:', reason); }). This prevents silent failures of rejected Promises. In newer Node.js versions, unhandled rejections cause process termination by default. Best practice: always handle Promise rejections properly rather than relying on this global handler. Use for logging and graceful shutdown, not for continuing execution after errors.",
      },
      {
        question: "How do you handle errors in Express.js?",
        solution:
          "Express.js error handling uses error-first middleware with 4 parameters: (err, req, res, next). Place error handlers after all routes and middleware. Example: app.use((err, req, res, next) => { console.error(err.stack); res.status(500).send('Something broke!'); }). For async route handlers, wrap in try-catch or use next(err). Middleware can call next(err) to pass errors to error handlers. Express has default error handler, but custom handlers provide better control. Use different error handlers for different error types, and ensure error responses don't expose sensitive information.",
      },
      {
        question:
          "What is the difference between operational and programmer errors?",
        solution:
          "Operational errors are expected runtime problems like network failures, file not found, invalid user input, database connection issues - these should be handled gracefully and are part of normal application flow. Programmer errors are bugs in code like undefined variables, wrong function arguments, logic errors - these indicate code problems that need fixing. Operational errors should be caught and handled (retry, user feedback, fallback), while programmer errors should be allowed to crash during development for debugging. In production, log programmer errors and restart process. Design error handling strategies differently for each type.",
      },
      {
        question: "How do you debug Node.js applications?",
        solution:
          "Debug Node.js applications using multiple approaches: console.log() for simple debugging, Node.js built-in debugger with --inspect flag (node --inspect app.js), VS Code debugger integration, Chrome DevTools (chrome://inspect), third-party debuggers like node-inspect. Debugging techniques: add breakpoints, step through code, inspect variables, analyze call stack, use console.trace() for stack traces. Advanced: use --inspect-brk to break on first line, debug production with --inspect in containers, use heapdump and clinic.js for performance debugging, logging libraries like winston for structured debugging.",
      },
    ],
  },
  {
    id: 22,
    topic: "Node",
    categories: "Mid",
    tags: [
      { name: "runtime", link: "" },
      { name: "javascript", link: "" },
      { name: "npm", link: "" },
      { name: "modules", link: "" },
      { name: "fundamentals", link: "" },
    ],
    prepareLink: "",
    externallinks: [],
    questions: [
      {
        question: "What are the four fundamental stream types in Node.js?",
        solution:
          "The four fundamental stream types are: 1) **Readable** - produces data for consumption (fs.createReadStream, http.IncomingMessage). Data flows from source to consumer. 2) **Writable** - consumes data for output (fs.createWriteStream, http.ServerResponse). Receives data and processes/stores it. 3) **Transform** - both readable and writable, modifies data as it passes through (zlib.createGzip, crypto.createCipher). Acts as a duplex stream that transforms input to output. 4) **Duplex** - independent readable and writable sides (net.Socket, tls.TLSSocket). Can read and write simultaneously without transformation relationship. Each type extends EventEmitter and follows specific contracts for data flow, buffering, and error handling.",
      },
      {
        question: "Compare fs.createReadStream vs fs.readFile.",
        solution:
          "**fs.createReadStream**: Streams file in chunks, memory-efficient for large files. Returns a readable stream that emits 'data' events. Memory usage is constant (default 64KB buffer). Supports backpressure, pausing/resuming. Ideal for large files or real-time processing. Example: `fs.createReadStream('large.txt').pipe(response)`. **fs.readFile**: Loads entire file into memory at once. Returns complete buffer/string via callback. Memory usage equals file size. Blocking operation that can cause memory issues with large files. Better for small files or when you need complete content. Example: `fs.readFile('config.json', callback)`. Use streams for files >100MB, processing data chunks, or when piping to other streams. Use readFile for small config files, JSON parsing, or simple file operations.",
      },
      {
        question: "How do you handle back-pressure in a writable stream?",
        solution:
          "Back-pressure occurs when data arrives faster than a writable stream can process it. Handle it by: 1) **Check write() return value** - returns false when internal buffer is full: `if (!stream.write(chunk)) { stream.once('drain', callback); }` 2) **Listen to 'drain' event** - emitted when buffer has space again. 3) **Use highWaterMark** to control buffer size: `new fs.WriteStream(file, { highWaterMark: 16384 })`. 4) **Implement proper flow control**: ```js\nfunction writeWithBackpressure(stream, data) {\n  return new Promise((resolve) => {\n    if (stream.write(data)) {\n      resolve();\n    } else {\n      stream.once('drain', resolve);\n    }\n  });\n}\n``` 5) **Use pipeline()** for automatic backpressure handling. This prevents memory leaks and ensures smooth data flow.",
      },
      {
        question:
          "Explain the difference between flowing and paused readable streams.",
        solution:
          "Readable streams have two modes: **Flowing Mode**: Data is automatically pushed to application. Stream emits 'data' events continuously. Triggered by: adding 'data' listener, calling resume(), or piping to writable stream. Data flows immediately when available. Example: `stream.on('data', chunk => console.log(chunk))`. **Paused Mode**: Data must be explicitly read using read() method. Default state for readable streams. No automatic 'data' events. Application controls when to consume data. Example: `stream.on('readable', () => { let chunk; while ((chunk = stream.read()) !== null) process(chunk); })`. **Switching modes**: pause() switches to paused, resume() switches to flowing. Adding 'data' listener auto-switches to flowing. Removing all 'data' listeners switches to paused. Use flowing for real-time processing, paused for controlled consumption or when implementing custom reading logic.",
      },
      {
        question: "Implement a transform stream that upper-cases every chunk.",
        solution:
          "```js\nconst { Transform } = require('stream');\n\nclass UpperCaseTransform extends Transform {\n  _transform(chunk, encoding, callback) {\n    // Convert chunk to string, uppercase, then back to buffer\n    const upperChunk = Buffer.from(chunk.toString().toUpperCase());\n    callback(null, upperChunk);\n  }\n}\n\n// Usage example\nconst upperTransform = new UpperCaseTransform();\nprocess.stdin.pipe(upperTransform).pipe(process.stdout);\n\n// Alternative: Functional approach\nconst upperStream = new Transform({\n  transform(chunk, encoding, callback) {\n    this.push(chunk.toString().toUpperCase());\n    callback();\n  }\n});\n\n// With error handling\nclass SafeUpperTransform extends Transform {\n  _transform(chunk, encoding, callback) {\n    try {\n      const result = chunk.toString().toUpperCase();\n      callback(null, result);\n    } catch (error) {\n      callback(error);\n    }\n  }\n}\n```",
      },
      {
        question: "When would you use pipeline() instead of .pipe()?",
        solution:
          "Use **pipeline()** instead of **.pipe()** when: 1) **Error handling** - pipeline() automatically handles errors from all streams and cleans up properly. With pipe(), errors don't propagate automatically. 2) **Resource cleanup** - pipeline() ensures all streams are properly destroyed on error or completion. 3) **Promise support** - pipeline() returns a promise when used with promisify or pipeline from 'stream/promises'. 4) **Multiple streams** - cleaner syntax for chaining many streams. **Example**: ```js\nconst { pipeline } = require('stream/promises');\n\n// pipeline() - recommended\ntry {\n  await pipeline(\n    fs.createReadStream('input.txt'),\n    transform,\n    fs.createWriteStream('output.txt')\n  );\n  console.log('Done');\n} catch (error) {\n  console.error('Pipeline error:', error);\n}\n\n// vs pipe() - manual error handling needed\nsource.pipe(transform).pipe(dest)\n  .on('error', handleError)\n  .on('finish', handleSuccess);\n```",
      },
      {
        question: "What events does a readable stream emit?",
        solution:
          "Readable streams emit these key events: 1) **'readable'** - emitted when data is available to read via read() method. Used in paused mode. 2) **'data'** - emitted when stream is in flowing mode. Contains the actual chunk of data. Automatically switches stream to flowing mode. 3) **'end'** - emitted when no more data will be provided. Stream has finished reading all data. 4) **'error'** - emitted when an error occurs. Stream becomes unusable after this. 5) **'close'** - emitted when underlying resource is closed (file descriptor, network connection). 6) **'pause'** - emitted when stream is paused via pause() method. 7) **'resume'** - emitted when stream is resumed via resume() method. **Example**: ```js\nstream.on('readable', () => console.log('Data available'));\nstream.on('data', chunk => console.log('Received:', chunk));\nstream.on('end', () => console.log('Stream ended'));\nstream.on('error', err => console.error('Error:', err));\nstream.on('close', () => console.log('Stream closed'));\n```",
      },
      {
        question:
          "How do you limit memory usage when piping a 10 GB file to a client?",
        solution:
          "Limit memory usage for large files by: 1) **Use streams with small buffers**: ```js\nconst readStream = fs.createReadStream('10gb-file.dat', {\n  highWaterMark: 64 * 1024 // 64KB chunks instead of default 16MB\n});\n``` 2) **Implement proper backpressure**: ```js\nconst { pipeline } = require('stream/promises');\n\napp.get('/download', async (req, res) => {\n  try {\n    res.setHeader('Content-Type', 'application/octet-stream');\n    await pipeline(\n      fs.createReadStream('large-file.dat', { highWaterMark: 64 * 1024 }),\n      res\n    );\n  } catch (error) {\n    res.status(500).send('Download failed');\n  }\n});\n``` 3) **Monitor memory usage**: Set response headers for proper streaming. 4) **Use compression**: Add gzip compression to reduce bandwidth. 5) **Implement range requests** for resumable downloads. This keeps memory usage constant (~64KB) regardless of file size.",
      },
      {
        question:
          "Describe the internal buffering thresholds highWaterMark controls.",
        solution:
          "**highWaterMark** controls internal buffer size thresholds in streams: **For Readable streams**: Determines when to stop reading from underlying source. When internal buffer reaches highWaterMark, readable._read() won't be called until buffer drains below threshold. Default: 16KB for object mode, 16KB for buffer mode. **For Writable streams**: Controls when write() returns false (backpressure signal). When internal buffer size >= highWaterMark, write() returns false and 'drain' event is emitted when buffer drains. Default: 16KB. **For Transform/Duplex**: Has separate highWaterMark for readable and writable sides. **Example**: ```js\n// Large buffer for high-throughput scenarios\nconst stream = fs.createReadStream('file.txt', {\n  highWaterMark: 1024 * 1024 // 1MB buffer\n});\n\n// Small buffer for memory-constrained environments\nconst stream2 = fs.createWriteStream('output.txt', {\n  highWaterMark: 4096 // 4KB buffer\n});\n``` Higher values = better throughput but more memory usage. Lower values = less memory but more I/O overhead.",
      },
      {
        question:
          "How do you detect if a write stream has finished successfully?",
        solution:
          "Detect successful write stream completion using multiple approaches: 1) **'finish' event** - emitted when end() is called and all data has been processed: ```js\nwriteStream.on('finish', () => {\n  console.log('All writes completed successfully');\n});\nwriteStream.end(); // Required to trigger 'finish'\n``` 2) **'close' event** - emitted when underlying resource closes: ```js\nwriteStream.on('close', () => {\n  console.log('Stream closed');\n});\n``` 3) **stream.finished()** utility - handles both success and error: ```js\nconst { finished } = require('stream');\n\nfinished(writeStream, (error) => {\n  if (error) {\n    console.error('Stream failed:', error);\n  } else {\n    console.log('Stream finished successfully');\n  }\n});\n``` 4) **Promise-based approach**: ```js\nconst { finished } = require('stream/promises');\n\ntry {\n  await finished(writeStream);\n  console.log('Success');\n} catch (error) {\n  console.error('Failed:', error);\n}\n``` Always use 'finish' for logical completion and 'close' for resource cleanup.",
      },
      {
        question: "Give a practical use-case for a duplex stream.",
        solution:
          "**WebSocket Connection** is a perfect duplex stream use-case: ```js\nconst WebSocket = require('ws');\nconst { Duplex } = require('stream');\n\nclass WebSocketStream extends Duplex {\n  constructor(ws) {\n    super({ objectMode: true });\n    this.ws = ws;\n    \n    // Handle incoming WebSocket messages (readable side)\n    ws.on('message', (data) => {\n      this.push(JSON.parse(data));\n    });\n    \n    ws.on('close', () => {\n      this.push(null); // Signal end of readable\n    });\n  }\n  \n  // Writable side - send data through WebSocket\n  _write(chunk, encoding, callback) {\n    this.ws.send(JSON.stringify(chunk), callback);\n  }\n  \n  // Readable side - data comes from WebSocket events\n  _read() {\n    // Data is pushed via WebSocket 'message' event\n  }\n}\n\n// Usage\nconst wsStream = new WebSocketStream(websocket);\nwsStream.write({ type: 'chat', message: 'Hello' }); // Send data\nwsStream.on('data', data => console.log('Received:', data)); // Receive data\n``` Other practical duplex examples: TCP sockets, database connections with query/result streams, SSH connections, and bidirectional data transformation pipelines.",
      },
      {
        question: "How does Node handle stream errors by default?",
        solution:
          "Node.js handles stream errors with specific default behaviors: 1) **Error events don't propagate automatically** - each stream must handle its own errors. Unhandled 'error' events crash the process. 2) **Streams don't auto-cleanup on error** - resources may leak if not properly destroyed. 3) **pipe() doesn't propagate errors** - source stream errors don't reach destination: ```js\nsource.pipe(dest); // If source errors, dest won't know\nsource.on('error', err => dest.destroy(err)); // Manual error handling\n``` 4) **Default error behavior**: ```js\n// Unhandled error crashes process\nstream.on('error', err => {\n  console.error('Stream error:', err);\n  // Must handle or process crashes\n});\n``` 5) **Better error handling with pipeline()**: ```js\nconst { pipeline } = require('stream');\n\npipeline(source, transform, dest, (error) => {\n  if (error) {\n    console.error('Pipeline error:', error);\n    // All streams are properly cleaned up\n  }\n});\n``` 6) **Error propagation in Transform streams** - errors in _transform() are emitted as 'error' events. Always implement error handlers or use pipeline() for automatic error management and resource cleanup.",
      },
      {
        question:
          "Write a stream that Gzips data on the fly using built-in modules.",
        solution:
          "```js\nconst fs = require('fs');\nconst zlib = require('zlib');\nconst { pipeline } = require('stream');\n\n// Method 1: Using zlib.createGzip() transform stream\nconst gzipStream = zlib.createGzip({\n  level: zlib.constants.Z_BEST_COMPRESSION,\n  windowBits: 15,\n  memLevel: 8\n});\n\n// Compress file on the fly\npipeline(\n  fs.createReadStream('input.txt'),\n  gzipStream,\n  fs.createWriteStream('output.txt.gz'),\n  (error) => {\n    if (error) {\n      console.error('Compression failed:', error);\n    } else {\n      console.log('File compressed successfully');\n    }\n  }\n);\n\n// Method 2: HTTP response compression\nconst http = require('http');\n\nconst server = http.createServer((req, res) => {\n  res.setHeader('Content-Encoding', 'gzip');\n  res.setHeader('Content-Type', 'text/plain');\n  \n  const gzip = zlib.createGzip();\n  const readStream = fs.createReadStream('large-file.txt');\n  \n  pipeline(readStream, gzip, res, (error) => {\n    if (error) {\n      console.error('Compression error:', error);\n      res.statusCode = 500;\n      res.end();\n    }\n  });\n});\n\n// Method 3: Custom gzip transform\nclass GzipTransform extends Transform {\n  constructor(options) {\n    super(options);\n    this.gzip = zlib.createGzip();\n    this.gzip.on('data', chunk => this.push(chunk));\n  }\n  \n  _transform(chunk, encoding, callback) {\n    this.gzip.write(chunk);\n    callback();\n  }\n  \n  _flush(callback) {\n    this.gzip.end();\n    this.gzip.on('end', callback);\n  }\n}\n```",
      },
      {
        question: "What is the difference between objectMode and normal mode?",
        solution:
          "**Normal Mode (default)**: Streams handle Buffers and strings. Data is treated as binary/text chunks. highWaterMark represents bytes. Automatic encoding/decoding between strings and buffers. **Object Mode**: Streams handle any JavaScript objects. Each object is treated as a single unit regardless of size. highWaterMark represents number of objects, not bytes. No automatic encoding/decoding. **Key differences**: ```js\n// Normal mode - handles buffers/strings\nconst normalStream = new Transform({\n  transform(chunk, encoding, callback) {\n    // chunk is Buffer or string\n    this.push(chunk.toString().toUpperCase());\n    callback();\n  }\n});\n\n// Object mode - handles any objects\nconst objectStream = new Transform({\n  objectMode: true,\n  transform(obj, encoding, callback) {\n    // obj can be any JavaScript object\n    this.push({ ...obj, processed: true });\n    callback();\n  }\n});\n``` **Use cases**: Normal mode for file processing, HTTP responses, data compression. Object mode for JSON processing, database records, structured data transformation: ```js\n// Processing JSON objects\nconst jsonProcessor = new Transform({\n  objectMode: true,\n  transform(record, encoding, callback) {\n    if (record.age >= 18) {\n      this.push(record);\n    }\n    callback();\n  }\n});\n```",
      },
      {
        question: "How can you implement a custom readable stream?",
        solution:
          "Implement custom readable streams by extending the Readable class and implementing _read(): ```js\nconst { Readable } = require('stream');\n\n// Method 1: Class-based approach\nclass NumberGenerator extends Readable {\n  constructor(options) {\n    super(options);\n    this.current = 1;\n    this.max = options.max || 100;\n  }\n  \n  _read() {\n    if (this.current <= this.max) {\n      this.push(String(this.current));\n      this.current++;\n    } else {\n      this.push(null); // Signal end of stream\n    }\n  }\n}\n\n// Usage\nconst numberStream = new NumberGenerator({ max: 10 });\nnumberStream.on('data', chunk => console.log('Number:', chunk.toString()));\nnumberStream.on('end', () => console.log('Done'));\n\n// Method 2: Factory function approach\nfunction createReadable(options) {\n  let counter = 0;\n  \n  return new Readable({\n    read() {\n      if (counter < options.limit) {\n        this.push(`Item ${counter++}\\n`);\n      } else {\n        this.push(null);\n      }\n    }\n  });\n}\n\n// Method 3: Async data source\nclass DatabaseReader extends Readable {\n  constructor(query) {\n    super({ objectMode: true });\n    this.query = query;\n    this.offset = 0;\n    this.batchSize = 100;\n  }\n  \n  async _read() {\n    try {\n      const results = await db.query(this.query, {\n        limit: this.batchSize,\n        offset: this.offset\n      });\n      \n      if (results.length === 0) {\n        this.push(null); // End of data\n      } else {\n        results.forEach(row => this.push(row));\n        this.offset += results.length;\n      }\n    } catch (error) {\n      this.emit('error', error);\n    }\n  }\n}\n```",
      },
      {
        question: "Explain stream.finished vs listening to the finish event.",
        solution:
          "**stream.finished()** vs **'finish' event** serve different purposes and scopes: **'finish' event**: Only available on Writable streams. Emitted when end() is called and all data has been flushed to underlying system. Indicates successful completion of writing. ```js\nwriteStream.on('finish', () => {\n  console.log('All data written');\n});\nwriteStream.end(); // Required to trigger 'finish'\n``` **stream.finished()**: Universal utility that works with any stream type (Readable, Writable, Transform, Duplex). Handles both success and error cases. Provides cleanup and proper error detection. ```js\nconst { finished } = require('stream');\n\n// Works with any stream type\nfinished(anyStream, (error) => {\n  if (error) {\n    console.error('Stream failed:', error);\n  } else {\n    console.log('Stream completed successfully');\n  }\n});\n\n// Promise version\nconst { finished } = require('stream/promises');\ntry {\n  await finished(stream);\n  console.log('Success');\n} catch (error) {\n  console.error('Failed:', error);\n}\n``` **Key advantages of finished()**: Handles premature closes, detects errors properly, works with all stream types, provides promise interface, automatically cleans up listeners. Use 'finish' for simple writable stream completion, finished() for robust stream lifecycle management.",
      },
      {
        question: "How do you unit-test a transform stream?",
        solution:
          "Unit test transform streams using stream testing utilities and mock data: ```js\nconst { Transform } = require('stream');\nconst { pipeline } = require('stream/promises');\nconst { Readable, Writable } = require('stream');\n\n// Transform to test\nclass UpperCaseTransform extends Transform {\n  _transform(chunk, encoding, callback) {\n    callback(null, chunk.toString().toUpperCase());\n  }\n}\n\n// Test utilities\nfunction createReadableFromArray(data) {\n  let index = 0;\n  return new Readable({\n    read() {\n      if (index < data.length) {\n        this.push(data[index++]);\n      } else {\n        this.push(null);\n      }\n    }\n  });\n}\n\nfunction createCollectorStream() {\n  const chunks = [];\n  return new Writable({\n    write(chunk, encoding, callback) {\n      chunks.push(chunk.toString());\n      callback();\n    },\n    final(callback) {\n      this.result = chunks.join('');\n      callback();\n    }\n  });\n}\n\n// Jest/Mocha tests\ndescribe('UpperCaseTransform', () => {\n  it('should uppercase input data', async () => {\n    const input = ['hello', ' ', 'world'];\n    const source = createReadableFromArray(input);\n    const transform = new UpperCaseTransform();\n    const collector = createCollectorStream();\n    \n    await pipeline(source, transform, collector);\n    \n    expect(collector.result).toBe('HELLO WORLD');\n  });\n  \n  it('should handle empty input', async () => {\n    const source = createReadableFromArray([]);\n    const transform = new UpperCaseTransform();\n    const collector = createCollectorStream();\n    \n    await pipeline(source, transform, collector);\n    \n    expect(collector.result).toBe('');\n  });\n  \n  it('should propagate errors', async () => {\n    const errorStream = new Readable({\n      read() {\n        this.emit('error', new Error('Test error'));\n      }\n    });\n    \n    const transform = new UpperCaseTransform();\n    const collector = createCollectorStream();\n    \n    await expect(pipeline(errorStream, transform, collector))\n      .rejects.toThrow('Test error');\n  });\n});\n```",
      },
      {
        question: "Describe how pipeline propagates errors automatically.",
        solution:
          "**pipeline()** provides automatic error propagation and cleanup across multiple streams: **Error Propagation Mechanism**: 1) **Listens to 'error' events** on all streams in the pipeline. 2) **Destroys all streams** when any stream emits an error. 3) **Calls final callback** with the error as first argument. 4) **Prevents memory leaks** by properly cleaning up resources. ```js\nconst { pipeline } = require('stream');\n\npipeline(\n  fs.createReadStream('input.txt'),\n  transform1, // If this errors\n  transform2, // This gets destroyed\n  fs.createWriteStream('output.txt'), // This also gets destroyed\n  (error) => {\n    if (error) {\n      console.error('Pipeline failed:', error);\n      // All streams are automatically cleaned up\n    } else {\n      console.log('Pipeline succeeded');\n    }\n  }\n);\n``` **Contrast with manual pipe()**: ```js\n// Manual error handling required\nconst stream1 = fs.createReadStream('input.txt');\nconst stream2 = transform;\nconst stream3 = fs.createWriteStream('output.txt');\n\nstream1.on('error', cleanup);\nstream2.on('error', cleanup);\nstream3.on('error', cleanup);\n\nstream1.pipe(stream2).pipe(stream3);\n\nfunction cleanup(error) {\n  stream1.destroy();\n  stream2.destroy();\n  stream3.destroy();\n  console.error('Error:', error);\n}\n``` **Promise version**: ```js\nconst { pipeline } = require('stream/promises');\n\ntry {\n  await pipeline(source, transform, dest);\n} catch (error) {\n  // All streams automatically destroyed and cleaned up\n  console.error('Pipeline error:', error);\n}\n``` Pipeline ensures fail-fast behavior and prevents resource leaks.",
      },
      {
        question:
          "How do you clone a readable stream to two different destinations?",
        solution:
          "Clone readable streams to multiple destinations using several approaches: **Method 1: Using PassThrough streams** ```js\nconst { PassThrough } = require('stream');\nconst { pipeline } = require('stream');\n\nconst source = fs.createReadStream('input.txt');\nconst dest1 = fs.createWriteStream('output1.txt');\nconst dest2 = fs.createWriteStream('output2.txt');\n\n// Create PassThrough clones\nconst clone1 = new PassThrough();\nconst clone2 = new PassThrough();\n\n// Split the stream\nsource.on('data', chunk => {\n  clone1.write(chunk);\n  clone2.write(chunk);\n});\n\nsource.on('end', () => {\n  clone1.end();\n  clone2.end();\n});\n\nsource.on('error', err => {\n  clone1.destroy(err);\n  clone2.destroy(err);\n});\n\n// Pipe clones to destinations\nclone1.pipe(dest1);\nclone2.pipe(dest2);\n```\n\n**Method 2: Custom Splitter Transform** ```js\nclass StreamSplitter extends Transform {\n  constructor(destinations) {\n    super();\n    this.destinations = destinations;\n  }\n  \n  _transform(chunk, encoding, callback) {\n    // Write to all destinations\n    this.destinations.forEach(dest => {\n      if (!dest.destroyed) {\n        dest.write(chunk);\n      }\n    });\n    callback(); // Don't push to main stream\n  }\n  \n  _flush(callback) {\n    this.destinations.forEach(dest => dest.end());\n    callback();\n  }\n}\n\n// Usage\nconst splitter = new StreamSplitter([dest1, dest2]);\nsource.pipe(splitter);\n```\n\n**Method 3: Using stream.Readable.from() with tee** ```js\nconst { Readable } = require('stream');\n\nasync function* tee(source) {\n  for await (const chunk of source) {\n    yield chunk;\n  }\n}\n\nconst source = fs.createReadStream('input.txt');\nconst stream1 = Readable.from(tee(source));\nconst stream2 = Readable.from(tee(source));\n\nstream1.pipe(dest1);\nstream2.pipe(dest2);\n``` Choose PassThrough for simple cloning, custom Transform for complex logic, or tee for functional approach.",
      },
      {
        question: "What is the purpose of the destroy() method?",
        solution:
          "The **destroy()** method forcefully closes a stream and cleans up resources immediately: **Primary purposes**: 1) **Immediate resource cleanup** - closes file descriptors, network connections, timers. 2) **Error propagation** - can pass error to indicate why stream was destroyed. 3) **Prevent memory leaks** - stops all internal operations and event listeners. 4) **Graceful shutdown** - alternative to waiting for natural stream end. ```js\n// Basic destroy usage\nstream.destroy(); // Clean shutdown\nstream.destroy(new Error('Forced close')); // With error\n\n// Destroy with cleanup\nstream.on('close', () => {\n  console.log('Stream destroyed and cleaned up');\n});\n\nstream.destroy();\n``` **Automatic destroy scenarios**: ```js\n// Pipeline automatically destroys on error\npipeline(source, transform, dest, (error) => {\n  // All streams destroyed if any fails\n});\n\n// Manual error handling with destroy\nsource.on('error', (error) => {\n  dest.destroy(error); // Propagate error and cleanup\n});\n``` **Custom destroy implementation**: ```js\nclass CustomStream extends Readable {\n  _destroy(error, callback) {\n    // Custom cleanup logic\n    this.closeDatabase();\n    this.clearTimers();\n    \n    if (error) {\n      console.error('Stream destroyed with error:', error);\n    }\n    \n    callback(error);\n  }\n}\n``` **Destroy vs other methods**: - **end()**: Graceful close for writable streams - **destroy()**: Immediate forceful close for any stream - **close event**: Emitted after destroy completes. Use destroy() for error handling, timeouts, or when immediate resource cleanup is needed.",
      },
      {
        question: "How do you implement a throttling transform stream?",
        solution:
          "Create a custom Transform stream that limits throughput using a token bucket algorithm or time-based windowing. Override _transform() to buffer chunks and release them at controlled intervals using setTimeout/setInterval. Track bytes/chunks per time window, pause the stream when limits are exceeded, and resume when the window resets. Use backpressure mechanisms by not calling callback() until throttling conditions are met, ensuring proper flow control throughout the pipeline.",
      },
      {
        question: "What happens if you call .write() after the finish event?",
        solution:
          "Calling .write() after the 'finish' event results in an error being emitted on the stream. The stream is considered closed for writing once 'finish' is emitted. The write operation will fail and trigger an 'error' event with an Error object indicating the stream is not writable. This is because 'finish' signifies that end() has been called and all data has been flushed. Always check stream.writable property or listen for 'finish'/'close' events before attempting writes.",
      },
      {
        question:
          "How do you convert a buffer-based API to a stream-based API?",
        solution:
          "Wrap the buffer-based API using Readable/Writable streams. For reading: create a Readable stream, override _read() to call the buffer API in chunks, and push() data until null is returned. For writing: create a Writable stream, override _write() to accumulate chunks in a buffer, and call the original API on _flush() or when buffer reaches threshold. Use async/await or callbacks to handle API responses, implement proper error handling, and respect backpressure by controlling when to read more data.",
      },
      {
        question:
          "Describe how Node.js uses libuv threads for asynchronous stream I/O.",
        solution:
          "Node.js leverages libuv's thread pool for file system operations and some network I/O. When you read/write streams backed by files, libuv dispatches work to background threads (default 4, configurable via UV_THREADPOOL_SIZE). The main event loop remains non-blocking while worker threads perform actual I/O operations. Completed operations are queued back to the main thread via the event loop's I/O phase. Network streams typically use epoll/kqueue for true async I/O without threads, while file streams require thread pool due to blocking nature of file operations.",
      },
      {
        question: "Why is the cluster module required in Node.js?",
        solution:
          "The cluster module is required because Node.js runs on a single thread by default, limiting CPU utilization on multi-core systems. Cluster enables spawning multiple worker processes that share the same server port, effectively creating a multi-process application. This allows full utilization of available CPU cores, improves application throughput, and provides process-level isolation for fault tolerance. Workers are separate processes, so if one crashes, others continue serving requests. It's essential for production deployments to handle high concurrent loads and maximize hardware resource utilization.",
      },
      {
        question: "List the lifecycle events of a worker process.",
        solution:
          "Worker process lifecycle events include: 1) 'setup' - after cluster.setupMaster() is called, 2) 'fork' - when a new worker is forked, 3) 'online' - when worker sends online message to master, 4) 'listening' - when worker calls server.listen(), 5) 'message' - when IPC message is received, 6) 'disconnect' - when IPC channel is severed, 7) 'exit' - when worker process terminates, 8) 'error' - when worker encounters an error. Workers also emit 'death' events on the master. These events enable monitoring worker health, implementing restart logic, and coordinating cluster-wide operations.",
      },
      {
        question:
          "How does the master process balance load when using cluster?",
        solution:
          "The master process uses a round-robin scheduling policy by default (except on Windows). When a new connection arrives, the master distributes it to workers in sequential order. On Windows, it uses a shared handle approach where workers accept connections directly from a shared server handle. The operating system's scheduler handles distribution. You can customize this using cluster.schedulingPolicy = cluster.SCHED_RR for round-robin or cluster.SCHED_NONE for OS-level distribution. The master tracks worker availability and avoids sending requests to disconnected/crashed workers.",
      },
      {
        question: "What is the difference between fork() and spawn()?",
        solution:
          "fork() is specifically designed for spawning Node.js processes and automatically sets up IPC communication channel between parent and child. It's a specialized version of spawn() that runs 'node' executable by default and enables process.send()/process.on('message'). spawn() is more general-purpose, can run any executable, and requires manual stdio configuration for communication. fork() returns a ChildProcess with enhanced IPC capabilities, while spawn() returns a basic ChildProcess. fork() is ideal for Node.js worker processes, while spawn() is better for running system commands or non-Node executables.",
      },
      {
        question: "How do you share a single port among multiple workers?",
        solution:
          "Node.js cluster module handles port sharing automatically through handle passing. The master process creates the server and binds to the port, then passes the server handle to workers using IPC. Workers receive the handle and can accept connections on the shared port. Internally, this uses SO_REUSEPORT on supported systems or handle passing on others. The key is that only the master binds to the port initially: cluster.isMaster ? server.listen(port) : process.on('message', handle => server.listen(handle)). This allows multiple processes to accept connections on the same port without conflicts.",
      },
      {
        question:
          "Explain how sticky sessions can be implemented with clusters.",
        solution:
          "Sticky sessions ensure requests from the same client reach the same worker consistently. Implement by: 1) Hash client identifiers (IP, session ID, cookies) to determine target worker, 2) Use cluster worker IDs as hash buckets, 3) Route requests in the master process before forwarding to workers. Create a proxy layer that examines incoming requests, calculates hash, and sends to specific worker via worker.send(). Alternatively, use external load balancers with session affinity or store session data in shared storage (Redis) to eliminate stickiness requirement. Consider worker failure scenarios and rehashing strategies.",
      },
      {
        question: "How do you gracefully shut down a cluster?",
        solution:
          "Implement graceful shutdown by: 1) Listen for SIGTERM/SIGINT in master, 2) Stop accepting new connections via server.close(), 3) Send shutdown signal to all workers using worker.disconnect(), 4) Allow workers to finish ongoing requests with timeout, 5) Force kill workers if timeout exceeded. In workers: listen for 'disconnect' event, stop accepting new work, finish current requests, then process.exit(0). Use Promise.allSettled() to wait for all workers to disconnect. Implement health checks and connection draining. Example: process.on('SIGTERM', () => { server.close(); workers.forEach(w => w.disconnect()); setTimeout(() => process.exit(1), 30000); });",
      },
      {
        question:
          "Describe the role of process.send() and process.on('message').",
        solution:
          "These methods enable Inter-Process Communication (IPC) between parent and child processes created with fork(). process.send() serializes and sends data from child to parent or vice versa through a dedicated IPC channel. process.on('message') registers event listeners to receive messages. Data is JSON-serialized automatically, supporting objects, arrays, primitives. Special objects like handles (server sockets) can be passed between processes. IPC is bidirectional - both parent and child can send/receive. Used for coordinating work distribution, sharing state, sending commands, and health monitoring between master and workers in cluster environments.",
      },
      {
        question:
          "How do you detect if the current process is master or worker?",
        solution:
          "Use cluster.isMaster or cluster.isWorker boolean properties. In modern Node.js versions, use cluster.isPrimary (replaces isMaster). These properties are set based on the CLUSTER_WORKER_ID environment variable - if undefined, it's the master/primary process. Alternative approaches: check process.env.NODE_UNIQUE_ID (exists only in workers), examine cluster.worker object (undefined in master), or check if process.send exists (only in forked processes). Example: if (cluster.isPrimary) { /* master logic */ } else { /* worker logic */ }. This detection enables conditional code execution for process-specific responsibilities.",
      },
      {
        question:
          "What is the default scheduling policy in the cluster module?",
        solution:
          "The default scheduling policy is cluster.SCHED_RR (round-robin) on all platforms except Windows, where it defaults to cluster.SCHED_NONE (operating system scheduling). Round-robin distributes connections sequentially across workers, providing more predictable load distribution. OS scheduling lets the operating system handle connection distribution, which can be less balanced but potentially more efficient. You can modify the policy using cluster.schedulingPolicy before forking workers. Round-robin is generally preferred for better load balancing, while OS scheduling might perform better in some high-throughput scenarios due to reduced coordination overhead.",
      },
      {
        question: "How do you handle unhandled rejections inside a worker?",
        solution:
          "Implement robust error handling by: 1) Listen for 'unhandledRejection' events in each worker using process.on('unhandledRejection'), 2) Log the error with context (worker ID, timestamp), 3) Optionally send error details to master via process.send(), 4) Decide whether to gracefully exit the worker or continue running, 5) Implement master-side worker restart logic. Best practice: log errors, attempt graceful cleanup, and exit the worker to prevent memory leaks or corrupted state. Master should monitor worker exits and spawn replacements. Use domains or async_hooks for better error context tracking across async operations.",
      },
      {
        question:
          "Give an example of IPC between parent and child using fork().",
        solution:
          "Parent process: const child = require('child_process').fork('./worker.js'); child.send({task: 'process', data: [1,2,3]}); child.on('message', result => console.log('Result:', result)); child.on('exit', code => console.log('Child exited with code', code)); Worker.js: process.on('message', msg => { if (msg.task === 'process') { const result = msg.data.reduce((a,b) => a+b, 0); process.send({status: 'complete', result}); } }); This demonstrates bidirectional communication where parent sends work to child, child processes data and returns results through the IPC channel established by fork().",
      },
      {
        question: "How do you restart a crashed worker automatically?",
        solution:
          "Implement automatic restart by listening for worker 'exit' events in the master process. When a worker crashes (exit code !== 0), immediately fork a replacement worker. Track restart attempts and implement exponential backoff to prevent restart loops. Example: cluster.on('exit', (worker, code, signal) => { if (code !== 0 && !worker.exitedAfterDisconnect) { console.log(`Worker ${worker.process.pid} crashed. Starting new worker...`); cluster.fork(); } }); Add restart limits, health checks, and monitoring to prevent infinite restart cycles. Consider implementing circuit breaker patterns for persistent failures and alerting mechanisms for operations teams.",
      },
      {
        question:
          "Describe the memory footprint difference between threads and processes.",
        solution:
          "Processes have higher memory overhead than threads due to separate address spaces. Each Node.js worker process loads its own V8 heap, requiring ~30-50MB baseline memory plus application code and data. Processes provide complete isolation but use more RAM for redundant code/libraries. Threads share the same address space, heap, and code segments, using significantly less memory (~2-8MB per thread stack). However, Node.js doesn't expose native threading (except Worker Threads in recent versions). Process isolation provides better fault tolerance and security at the cost of higher memory consumption. Choose based on isolation requirements vs memory constraints.",
      },
      {
        question: "What is the maximum number of workers you should spawn?",
        solution:
          "The optimal number of workers typically equals the number of CPU cores (os.cpus().length) for CPU-bound applications. For I/O-bound applications, you might spawn more workers (1.5-2x CPU cores) since workers often wait for I/O operations. Consider available memory (each worker uses ~30-50MB), system limits (ulimit), and application characteristics. Monitor CPU utilization, memory usage, and response times to find the sweet spot. Too many workers can cause context switching overhead and memory pressure. Start with CPU core count and adjust based on performance testing. Container environments may have different core counts than the host system.",
      },
      {
        question: "How do you debug a worker process?",
        solution:
          "Debug worker processes by: 1) Pass --inspect-brk=port to fork() options to enable debugging on specific ports, 2) Use different debug ports for each worker to avoid conflicts (9229 + worker.id), 3) Connect Chrome DevTools or VS Code to individual worker debug ports, 4) Add logging with worker identifiers for tracing, 5) Use process.debugPort to dynamically assign ports. Example: cluster.setupMaster({execArgv: ['--inspect-brk=0']}); This auto-assigns available ports. For production debugging, use logging frameworks, APM tools, and process monitoring. Implement health check endpoints and structured logging with worker IDs for distributed tracing.",
      },
      {
        question: "Compare child_process.exec vs child_process.execFile.",
        solution:
          "exec() spawns a shell and executes commands through it, enabling shell features like pipes, redirects, and glob patterns. It's convenient but has security risks with untrusted input due to shell injection. execFile() directly executes the specified file without shell involvement, making it more secure and efficient but limiting shell functionality. exec() buffers output and returns it in the callback, while execFile() also buffers but is generally faster. Use exec() for shell commands with pipes/redirects, execFile() for direct executable calls with arguments. For large outputs or streaming, use spawn() instead of either buffered approach.",
      },
      {
        question:
          "How do you stream large stdout from a child process without blocking?",
        solution:
          "Use spawn() instead of exec()/execFile() to access stdout as a stream rather than buffered data. The returned ChildProcess has stdout/stderr properties that are readable streams. Example: const child = spawn('command', args); child.stdout.on('data', chunk => process.stdout.write(chunk)); child.stdout.on('end', () => console.log('Stream ended')); For processing, pipe to transform streams: child.stdout.pipe(transformStream).pipe(destination). This prevents memory bloat from large outputs and enables real-time processing. Use { stdio: 'pipe' } option explicitly and handle backpressure properly by pausing/resuming streams when needed.",
      },
      {
        question: "How do you write a middleware that logs response time?",
        solution:
          "Create middleware that captures start time using process.hrtime.bigint(), then uses res.on('finish') to calculate duration. Store start time in res.locals for access across middleware chain. Use performance.now() for browser compatibility or hrtime for nanosecond precision. Log format should include method, URL, status code, and duration in milliseconds with proper error handling for edge cases.",
      },
      {
        question: "How do you share data between middlewares?",
        solution:
          "Use res.locals object to store data that persists throughout the request lifecycle. Alternative approaches include req.user for authentication data, req.context for request-scoped data, or custom properties on req object. Avoid using global variables or closures. Use TypeScript interfaces to define shared data structure for better type safety and IntelliSense support.",
      },
      {
        question: "What is the difference between req.params and req.query?",
        solution:
          "req.params contains route parameters from URL path (e.g., /users/:id where id becomes req.params.id), while req.query contains query string parameters (e.g., ?page=1&limit=10 becomes req.query.page). Params are defined in route patterns and typically represent resource identifiers, while query parameters are optional filters, pagination, or options. Both are automatically parsed by Express into objects.",
      },
      {
        question: "How do you validate incoming JSON schema using middleware?",
        solution:
          "Use libraries like Joi, Yup, or express-validator. Create validation middleware that checks req.body against predefined schemas, returns 400 with detailed error messages for invalid data. Implement separate validation functions for different routes. Use schema compilation for performance, validate required fields, data types, ranges, and custom business rules. Handle validation errors consistently across the application.",
      },
      {
        question: "How do you implement file upload validation with Multer?",
        solution:
          "Configure Multer with fileFilter function to validate MIME types, file extensions, and size limits. Use limits option for file size, field count restrictions. Implement custom storage engines for cloud services. Add virus scanning, check magic numbers for file type verification beyond extensions. Handle multiple file uploads, implement progress tracking, and provide detailed error messages for different validation failures.",
      },
      {
        question: "Describe how helmet helps secure an Express app.",
        solution:
          "Helmet sets various HTTP security headers: X-Content-Type-Options prevents MIME sniffing, X-Frame-Options prevents clickjacking, X-XSS-Protection enables browser XSS filters, Strict-Transport-Security enforces HTTPS, Content-Security-Policy prevents script injection. Configure CSP directives, enable HSTS with includeSubDomains, disable X-Powered-By header, set referrer policy, and implement feature policy for modern browsers.",
      },
      {
        question: "How do you handle 404 globally in Express?",
        solution:
          "Place a catch-all middleware after all route definitions using app.use('*', handler) or app.use((req, res, next) => {}). This middleware only runs if no previous routes matched. Send appropriate 404 response with JSON for APIs or render error page for web apps. Include request URL in response for debugging. Ensure this middleware is placed before error handling middleware.",
      },
      {
        question: "Explain how compression middleware reduces payload size.",
        solution:
          "Compression middleware uses gzip or deflate algorithms to compress response bodies before sending to client. Configure compression levels (1-9), set threshold for minimum response size to compress, filter by content type (text, JSON, CSS, JS). Modern browsers automatically decompress. Reduces bandwidth usage by 60-80% for text-based content. Configure based on CPU vs bandwidth trade-offs in production.",
      },
      {
        question: "How do you chain multiple middleware functions cleanly?",
        solution:
          "Use array syntax: app.get('/path', [auth, validate, handler]) or sequential app.use() calls. Create middleware factory functions that return configured middleware. Use async/await with proper error handling, ensure each middleware calls next() or sends response. Implement middleware composition utilities, use higher-order functions for reusable middleware patterns, and maintain clear execution order.",
      },
      {
        question: "How do you inject a mock request/response for unit testing?",
        solution:
          "Use libraries like supertest for integration testing or create mock objects with httpMocks.createRequest/createResponse. Mock req properties (body, params, headers, user) and res methods (json, status, send). Use Jest mocks for middleware dependencies. Create test utilities that generate common request patterns. Ensure mocks implement the same interface as real Express req/res objects.",
      },
      {
        question: "How do you handle uncaught promise rejections in Express?",
        solution:
          "Implement global error handlers using process.on('unhandledRejection') and process.on('uncaughtException'). Use express-async-errors package or wrap async route handlers with try-catch. Create utility function to wrap async middleware that automatically catches and forwards errors to Express error handler. Log errors with correlation IDs, implement graceful shutdown on critical errors.",
      },
      {
        question: "Describe the role of trust proxy setting.",
        solution:
          "trust proxy tells Express to trust X-Forwarded-* headers from reverse proxies (nginx, AWS ALB, Cloudflare). Set to true for single proxy, number for proxy count, or function for custom logic. Affects req.ip, req.protocol, req.secure properties. Critical for rate limiting, logging real client IPs, HTTPS redirects behind load balancers. Configure based on infrastructure topology.",
      },
      {
        question: "How do you version a REST API using middleware?",
        solution:
          "Implement versioning through URL path (/api/v1/users), headers (Accept-Version), or query parameters (?version=1). Create middleware that extracts version info and routes to appropriate handlers. Use semantic versioning, maintain backward compatibility, implement deprecation warnings. Create version-specific router instances, use content negotiation for header-based versioning, provide clear migration documentation.",
      },
      {
        question: "How do you implement request id generation in middleware?",
        solution:
          "Generate unique request IDs using crypto.randomUUID() or libraries like uuid. Store in res.locals.requestId and add to response headers (X-Request-ID). Use request ID for logging correlation, distributed tracing. Accept existing request IDs from load balancers or clients. Ensure ID is available throughout request lifecycle, include in error responses and audit logs.",
      },
      {
        question: "How do you prevent XSS at the middleware layer?",
        solution:
          "Sanitize user input using libraries like DOMPurify or xss. Set Content-Security-Policy headers to restrict script sources. Escape output when rendering HTML, validate and whitelist input data. Use helmet for security headers, implement CSRF tokens for forms. Encode HTML entities, validate against known malicious patterns, implement input length limits and content type validation.",
      },
      {
        question: "Describe how to throttle by API key.",
        solution:
          "Implement rate limiting middleware using express-rate-limit with custom keyGenerator function that uses API key from headers/query. Store limits in Redis with sliding window or token bucket algorithm. Different tiers have different limits (free: 100/hour, premium: 1000/hour). Include rate limit headers in responses (X-RateLimit-Limit, X-RateLimit-Remaining). Implement burst capacity and automatic key-based limit resets.",
      },
      {
        question: "How do you disable the x-powered-by header?",
        solution:
          "Use app.disable('x-powered-by') in Express configuration or helmet middleware which does this automatically. This header reveals server technology stack to potential attackers. Alternative: set custom value using app.use((req, res, next) => { res.removeHeader('X-Powered-By'); next(); }). Include in security hardening checklist along with other information disclosure headers.",
      },
      {
        question:
          "How do you conditionally apply middleware based on environment?",
        solution:
          "Use process.env.NODE_ENV to conditionally apply middleware: if (process.env.NODE_ENV === 'production') app.use(middleware). Create environment-specific middleware modules, use configuration objects to enable/disable features. Implement middleware factories that return no-op functions in certain environments. Use feature flags, environment-specific router configurations, and separate middleware stacks for different deployment stages.",
      },
      {
        question: "Compare JWT vs session-based auth in Node.js.",
        solution:
          "JWT: stateless, self-contained tokens, good for microservices and mobile apps, horizontal scaling friendly, larger payload size, harder to revoke immediately. Sessions: server-side storage (Redis/database), smaller client payload, easy revocation, requires sticky sessions or shared storage, better for traditional web apps. JWT good for distributed systems, sessions better for high-security applications requiring immediate revocation.",
      },
      {
        question: "How do you refresh a JWT securely?",
        solution:
          "Implement refresh token rotation: short-lived access tokens (15 min) with longer refresh tokens (7 days). Store refresh tokens in httpOnly, secure cookies or client storage. On refresh, issue new access AND refresh token, invalidate old refresh token. Implement refresh token families for security, detect token reuse attacks, provide smooth user experience with automatic token refresh before expiration.",
      },
      {
        question: "Explain how bcrypt handles salting.",
        solution:
          "bcrypt automatically generates random salts for each password hash using crypto-secure random number generator. Salt is embedded in the hash output (not stored separately). Work factor (rounds) determines computational cost - default 10 rounds, increase over time as hardware improves. Salt prevents rainbow table attacks, ensures same passwords have different hashes. Use bcrypt.compare() for verification which extracts salt from stored hash.",
      },
      {
        question: "How do you prevent brute-force attacks on login routes?",
        solution:
          "Implement progressive delays using exponential backoff, account lockouts after N failed attempts, CAPTCHA after multiple failures. Use express-rate-limit with custom key generation (IP + username). Store failed attempts in Redis with TTL. Implement distributed rate limiting for multiple servers. Add logging for suspicious activity, use fail2ban for IP-level blocking, implement account unlock mechanisms with email verification.",
      },
      {
        question: "Describe OAuth 2.0 Authorization Code flow in Node.",
        solution:
          "Client redirects user to authorization server with client_id, redirect_uri, scope, and state. User authenticates and grants permissions. Auth server redirects back with authorization code. Client exchanges code for access token using client_id, client_secret, and code. Use PKCE for public clients, implement state parameter validation for CSRF protection, handle error responses, store tokens securely, implement token refresh flow.",
      },
      {
        question: "How do you store refresh tokens securely on the client?",
        solution:
          "Use httpOnly, secure, SameSite cookies for web apps to prevent XSS access. For SPAs, use secure storage APIs or memory storage with automatic refresh. Mobile apps should use platform keychain/keystore. Implement token rotation, set appropriate expiration times, encrypt tokens in localStorage if necessary. Avoid storing in regular cookies accessible by JavaScript, implement proper CORS policies.",
      },
      {
        question: "How do you rotate signing keys in production?",
        solution:
          "Implement JWT Key Set (JWKS) endpoint exposing public keys with key IDs. Use multiple active keys during rotation period, publish new key before using it for signing. Update JWKS endpoint, wait for propagation, then start using new key. Keep old keys active for token validation until all tokens expire. Automate rotation schedule, implement emergency key rotation procedures, monitor key usage and validation failures.",
      },
      {
        question: "What is the purpose of passport.serializeUser?",
        solution:
          "serializeUser determines what user data is stored in the session (typically user ID to minimize session size). deserializeUser retrieves full user object from database using stored identifier on each request. This separation allows efficient session storage while maintaining access to current user data. Critical for session-based authentication, works with session middleware, enables user data updates without session invalidation.",
      },
      {
        question: "How do you resume a paused readable stream?",
        solution:
          "Call stream.resume() to switch from paused mode to flowing mode. The stream will start emitting 'data' events again. Alternatively, attach a 'data' event listener or pipe to another stream. Example: `stream.on('readable', () => { stream.pause(); setTimeout(() => stream.resume(), 1000); })`. For manual control, use `stream.read()` in paused mode to pull data chunk by chunk without resuming flow mode.",
      },
      {
        question: "What happens when a worker calls process.disconnect()?",
        solution:
          "The worker closes its IPC channel to the master process, preventing further message exchange. The worker process continues running but becomes orphaned. The master's 'disconnect' event fires. The worker can no longer receive messages from master or send messages back. After disconnection, the worker should typically call `process.exit()` to terminate gracefully. Master should handle this in cluster scenarios: `worker.on('disconnect', () => { cluster.fork(); })` to replace the worker.",
      },
      {
        question: "How do you pass environment variables to a child?",
        solution:
          "Use the `env` option in `child_process.spawn/fork/exec`. By default, child inherits parent's environment. Override with: `spawn('node', ['script.js'], { env: { ...process.env, NODE_ENV: 'production', API_KEY: 'secret' } })`. For worker_threads, use `workerData` instead: `new Worker(__filename, { workerData: { apiKey: 'secret' } })`. Access in worker via `require('worker_threads').workerData`. Environment variables are strings only.",
      },
      {
        question: "How do you handle EADDRINUSE when clustering?",
        solution:
          "Use `server.listen(port, () => {})` with error handling: `server.on('error', (err) => { if (err.code === 'EADDRINUSE') { setTimeout(() => server.listen(port), 1000); } })`. In clusters, only master should bind to port initially. Workers get handles passed from master. Implement exponential backoff: `let retries = 0; const tryListen = () => { server.listen(port).on('error', (err) => { if (err.code === 'EADDRINUSE' && retries < 5) { setTimeout(tryListen, Math.pow(2, retries++) * 1000); } }); }`.",
      },
      {
        question: "Describe how PM2 uses the cluster module internally.",
        solution:
          "PM2 creates a master process that spawns worker processes using Node's cluster module. Master handles load balancing via round-robin or IP hash algorithms. Each worker runs the application code. PM2 wraps this with additional features: process monitoring, automatic restarts on crashes, graceful shutdowns, and zero-downtime reloads. When scaling, PM2 forks new workers and manages IPC communication. It maintains process state, handles worker deaths, and implements health checks. PM2's God Daemon manages multiple clustered applications simultaneously.",
      },
      {
        question: "How do you measure per-worker CPU usage?",
        solution:
          "Use `process.cpuUsage()` in each worker to get user/system CPU time. Send metrics to master via IPC: `process.send({ type: 'cpu', usage: process.cpuUsage(), pid: process.pid })`. Master aggregates data: `worker.on('message', (msg) => { if (msg.type === 'cpu') metrics[msg.pid] = msg.usage; })`. For external monitoring, use `pidusage` npm package or read `/proc/[pid]/stat` on Linux. Calculate percentage: `const percent = (usage.user + usage.system) / (process.hrtime.bigint() - startTime) * 100`.",
      },
      {
        question: "Explain how zero-downtime deployments work with clusters.",
        solution:
          "Graceful reload process: 1) Master receives SIGUSR2 signal 2) Workers receive SIGTERM and stop accepting new connections 3) Existing requests complete within timeout 4) Workers exit gracefully 5) Master spawns new workers with updated code 6) New workers start accepting traffic. Implement: `process.on('SIGTERM', () => { server.close(() => { process.exit(0); }); })`. Use process managers like PM2: `pm2 reload app` performs rolling restart. Ensure health checks before routing traffic to new workers. Load balancer should detect unhealthy instances.",
      },
      {
        question: "How can you implement request affinity in a cluster?",
        solution:
          "Override cluster's scheduling policy. Create custom routing based on session ID or user IP: `cluster.schedulingPolicy = cluster.SCHED_NONE; const workers = []; cluster.on('fork', worker => workers.push(worker)); server.on('connection', socket => { const hash = crypto.createHash('md5').update(socket.remoteAddress).digest('hex'); const workerIndex = parseInt(hash.substring(0, 8), 16) % workers.length; workers[workerIndex].send('sticky-session', socket); })`. Workers should handle socket assignment and maintain session state or use shared storage like Redis.",
      },
      {
        question: "What is the signature of an Express middleware function?",
        solution:
          "Standard middleware: `function(req, res, next) { ... }`. Error-handling middleware: `function(err, req, res, next) { ... }`. Must call `next()` to continue or `next(err)` to trigger error handling. Async middleware should return Promise or use try-catch: `async function(req, res, next) { try { await someAsync(); next(); } catch(err) { next(err); } }`. Middleware can modify req/res objects, end response, or pass control. Arrow functions work: `(req, res, next) => { ... }`.",
      },
      {
        question: "How do you skip the rest of the middleware stack?",
        solution:
          "Call `next('route')` to skip remaining middleware for current route and jump to next route handler. Example: `app.get('/users/:id', (req, res, next) => { if (!isValidId(req.params.id)) return next('route'); next(); }, handleUser); app.get('/users/*', handle404);`. Use `return` after `next('route')` to prevent further execution. This only works for route-specific middleware, not app-level middleware. For app-level, use conditional logic or separate route definitions.",
      },
      {
        question: "Explain error-handling middleware placement rules.",
        solution:
          "Error middleware must be defined AFTER all other middleware and routes. Must have 4 parameters: `(err, req, res, next)`. Express identifies error middleware by parameter count. If no error middleware is defined, Express uses default handler. Chain multiple error handlers by calling `next(err)`. Place specific error handlers before generic ones. Example order: routes → 404 handler → validation errors → database errors → generic error handler. Always define last to catch unhandled errors: `app.use((err, req, res, next) => { res.status(500).send('Server Error'); })`.",
      },
      {
        question: "How do you create conditional middleware?",
        solution:
          "Wrap middleware in conditional logic: `app.use((req, res, next) => { if (req.path.startsWith('/api/')) { return authMiddleware(req, res, next); } next(); })`. Use middleware factories: `function conditionalAuth(condition) { return (req, res, next) => { if (condition(req)) return authMiddleware(req, res, next); next(); }; }`. Apply conditionally: `app.use('/admin', adminOnly, routes)`. Environment-based: `if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))`. Route-specific conditions within handlers.",
      },
      {
        question: "Describe the difference between app.use and app.get.",
        solution:
          "`app.use()` registers middleware for ALL HTTP methods and specified paths (prefix matching). Runs for every request matching path. `app.get()` handles only GET requests for exact path matches (unless parameterized). `app.use('/api', middleware)` matches '/api', '/api/users', '/api/posts'. `app.get('/api', handler)` matches only '/api'. `app.use()` without path matches all routes. `app.get()` is route-specific, `app.use()` is middleware registration. Order matters for both. Use `app.use()` for cross-cutting concerns, `app.get()` for specific endpoints.",
      },
      {
        question: "How do you mount a router on multiple paths?",
        solution:
          "Create router once, mount multiple times: `const userRouter = express.Router(); userRouter.get('/', getUsers); app.use('/users', userRouter); app.use('/api/users', userRouter); app.use('/v1/users', userRouter);`. Each mount creates independent middleware stacks. Router paths are relative to mount point. Alternative: use array of paths: `app.use(['/users', '/api/users'], userRouter)`. For different behavior per mount, check `req.baseUrl` within router: `if (req.baseUrl === '/api/users') { /* API logic */ }`.",
      },
      {
        question: "What is next('route') used for?",
        solution:
          "`next('route')` skips remaining middleware functions for the current route and passes control to the next matching route handler. Only works with route-level middleware, not app-level. Example: `app.get('/user/:id', validateId, getUser, notFound); function validateId(req, res, next) { if (!isValidId(req.params.id)) return next('route'); next(); }`. If validation fails, it jumps to the next route definition that matches '/user/:id' pattern. Different from `next()` which continues to next middleware in same route.",
      },
      {
        question: "How do you implement rate-limiting middleware from scratch?",
        solution:
          "Create middleware with in-memory store: `const limits = new Map(); function rateLimit(windowMs, maxRequests) { return (req, res, next) => { const key = req.ip; const now = Date.now(); const windowStart = now - windowMs; if (!limits.has(key)) limits.set(key, []); const requests = limits.get(key).filter(time => time > windowStart); if (requests.length >= maxRequests) { return res.status(429).json({ error: 'Too many requests' }); } requests.push(now); limits.set(key, requests); next(); }; }`. Add cleanup: `setInterval(() => { for (let [key, requests] of limits) { limits.set(key, requests.filter(time => time > Date.now() - windowMs)); } }, windowMs);`",
      },
      {
        question: "How does Express handle async errors by default?",
        solution:
          "Express does NOT automatically catch async errors. Unhandled promise rejections crash the process or are ignored. You must manually catch and pass to `next()`: `app.get('/async', async (req, res, next) => { try { const data = await asyncOperation(); res.json(data); } catch (err) { next(err); } })`. Use wrapper function: `const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next); app.get('/async', asyncHandler(async (req, res) => { const data = await asyncOperation(); res.json(data); }))`. Consider express-async-errors package for automatic handling.",
      },
      {
        question: "Explain how CORS middleware works internally.",
        solution:
          "CORS middleware intercepts requests and adds appropriate headers. For preflight OPTIONS requests, it responds immediately with allowed methods/headers. For simple requests, it adds CORS headers to response. Implementation: `function cors(options) { return (req, res, next) => { const origin = req.headers.origin; if (options.origin === '*' || options.origin.includes(origin)) { res.setHeader('Access-Control-Allow-Origin', origin); } if (req.method === 'OPTIONS') { res.setHeader('Access-Control-Allow-Methods', options.methods.join(',')); res.setHeader('Access-Control-Allow-Headers', options.headers.join(',')); return res.status(204).end(); } next(); }; }`. Handles credentials, max-age, exposed headers based on configuration.",
      },
      {
        question: "How do you stream large responses through middleware?",
        solution:
          "Use Node.js streams with proper headers: `app.get('/large-file', (req, res, next) => { res.setHeader('Content-Type', 'application/octet-stream'); res.setHeader('Transfer-Encoding', 'chunked'); const stream = fs.createReadStream('large-file.dat'); stream.pipe(res); stream.on('error', next); })`. For middleware processing: `const transform = new Transform({ transform(chunk, encoding, callback) { const processed = processChunk(chunk); callback(null, processed); } }); stream.pipe(transform).pipe(res);`. Handle backpressure and cleanup on client disconnect: `req.on('close', () => stream.destroy())`.",
      },
      {
        question: "Describe how express.json() parses the request body.",
        solution:
          "`express.json()` is middleware that reads the request stream, buffers chunks, and parses JSON. Implementation concept: `function json(options = {}) { return (req, res, next) => { if (req.headers['content-type'] !== 'application/json') return next(); let body = ''; req.on('data', chunk => body += chunk); req.on('end', () => { try { req.body = JSON.parse(body); next(); } catch (err) { next(new SyntaxError('Invalid JSON')); } }); req.on('error', next); }; }`. Handles content-length limits, character encoding, and malformed JSON. Sets `req.body` for subsequent middleware. Built on body-parser internally.",
      },
      {
        question: "How do you implement role-based access control (RBAC)?",
        solution:
          "Implement RBAC using a three-tier model: Users → Roles → Permissions. Create database tables for users, roles, permissions, and junction tables (user_roles, role_permissions). Use middleware to check permissions: extract user from JWT, query their roles, check if required permission exists. Cache role permissions in Redis with TTL. Implement hierarchical roles using parent_role_id. Use policy engines like Casbin for complex rules. Example: user 'john' has role 'editor' which has permissions ['read:posts', 'write:posts']. Middleware verifies JWT, loads cached permissions, and allows/denies access based on required permission for the endpoint.",
      },
      {
        question: "How do you revoke a JWT before expiry?",
        solution:
          "Implement JWT revocation using token blacklisting or short-lived tokens with refresh rotation. Store revoked JTI (JWT ID) claims in Redis with expiration matching token TTL. On each request, check if JTI exists in blacklist before validating token. For distributed systems, use Redis Cluster or broadcast revocation events via message queue. Alternative: Use short-lived access tokens (5-15 min) with refresh tokens stored in database. Revoke by deleting refresh token, forcing re-authentication when access token expires. Implement token versioning by including version claim and incrementing user's token_version on revocation - reject tokens with old versions.",
      },
      {
        question: "Describe how CSRF tokens are validated.",
        solution:
          "CSRF tokens are validated through double-submit cookie pattern or synchronizer token pattern. Generate cryptographically secure random token (32+ bytes) stored in server session and embedded in forms/AJAX headers. On submission, compare submitted token with session-stored token using constant-time comparison to prevent timing attacks. For stateless apps, use double-submit: store token in httpOnly cookie and require same token in custom header/form field. Validate by comparing cookie value with submitted value. Implement CSRF middleware that generates tokens via crypto.randomBytes(), sets SameSite=Strict cookies, and validates on state-changing requests (POST/PUT/DELETE). Tokens should be unique per session and regenerated after authentication state changes.",
      },
      {
        question: "How do you mitigate timing attacks during login?",
        solution:
          "Mitigate timing attacks by ensuring constant-time operations regardless of input validity. Always hash provided password even for non-existent users using a dummy hash. Use crypto.timingSafeEqual() or similar constant-time comparison functions. Implement fixed-time delays using setTimeout() or sleep functions to normalize response times. Store user lookup results in variables to avoid conditional database queries. Use bcrypt/scrypt which have built-in timing attack resistance. Add random jitter (50-200ms) to all authentication responses. Rate-limit login attempts per IP/user. Example: always perform bcrypt.compare() whether user exists or not, use consistent error messages, and return responses after fixed minimum time regardless of validation result.",
      },
      {
        question: "How do you securely store secrets in Docker containers?",
        solution:
          "Use Docker Secrets (Swarm) or Kubernetes Secrets mounted as tmpfs volumes at /run/secrets. Never embed secrets in Dockerfiles or environment variables. Use external secret management: AWS Secrets Manager, HashiCorp Vault, or Azure Key Vault with sidecar containers. Implement init containers that fetch secrets and write to shared volumes with restricted permissions (600). Use multi-stage builds to separate secret-requiring build steps from runtime. Mount secrets at runtime using docker run --secret or kubernetes secretKeyRef. Implement secret rotation by watching mounted secret files for changes. Use service mesh (Istio) for automatic TLS certificate management. Example: vault agent sidecar fetches database credentials from Vault and writes to /shared/secrets with app container reading from mounted volume.",
      },
      {
        question:
          "Explain how express-rate-limit prevents credential stuffing.",
        solution:
          "Express-rate-limit prevents credential stuffing by limiting authentication attempts per IP/user/email combination. Configure sliding window rate limiting: 5 attempts per 15 minutes per IP, 3 attempts per hour per email. Use Redis store for distributed rate limiting across instances. Implement progressive delays: increase lockout duration exponentially after failed attempts. Track attempts by multiple identifiers: IP address, user agent, email, and device fingerprint. Use skipSuccessfulRequests option to only count failed attempts. Implement CAPTCHA after threshold reached. Example: rateLimiter({ windowMs: 15*60*1000, max: 5, keyGenerator: (req) => req.ip + req.body.email, skipSuccessfulRequests: true, onLimitReached: triggerCaptcha }). Combine with account lockout policies and anomaly detection for suspicious patterns.",
      },
      {
        question: "How do you implement multi-factor authentication with TOTP?",
        solution:
          "Implement TOTP MFA using libraries like speakeasy or otpauth. Generate secret key during enrollment: speakeasy.generateSecret({name: 'App', account: email}). Store encrypted secret in database with user record. Generate QR code using secret.otpauth_url for authenticator apps. Validate TOTP codes with time window tolerance (usually 30-second windows with ±1 window grace period). Implement backup codes: generate 10 single-use recovery codes, hash and store them. Create MFA middleware that checks if user has MFA enabled and validates second factor. Use time-based validation: speakeasy.totp.verify({secret, token, window: 1}). Implement rate limiting on TOTP attempts to prevent brute force. Store MFA verification status in session/JWT for step-up authentication. Provide admin override capabilities for account recovery.",
      },
      {
        question: "Describe how to validate JWT signature algorithms.",
        solution:
          "Validate JWT signature algorithms by explicitly allowlisting accepted algorithms and rejecting 'none' algorithm. Extract algorithm from JWT header and compare against allowed list ['RS256', 'HS256']. Use algorithm-specific validation: for HMAC (HS256), verify with shared secret; for RSA (RS256), verify with public key. Implement algorithm confusion attack prevention by binding keys to specific algorithms. Never trust alg header value - always validate against expected algorithm for the key type. Use libraries like jsonwebtoken with algorithm parameter: jwt.verify(token, key, {algorithms: ['RS256']}). Implement key rotation with multiple valid keys identified by 'kid' header. Validate key material format matches algorithm requirements. Example: RS256 requires RSA public key, HS256 requires symmetric secret. Reject tokens with mismatched algorithm/key combinations.",
      },
      {
        question: "How do you handle OAuth scope escalation?",
        solution:
          "Handle OAuth scope escalation by implementing strict scope validation and least-privilege principles. Store granted scopes with access tokens and validate on each API request. Implement hierarchical scopes (read:profile implies read:profile:basic). Use middleware to check if request requires scopes beyond those granted: checkScopes(['read:posts', 'write:posts']). Implement scope intersection - only grant permissions available to both client and user. Use incremental authorization for sensitive scopes - prompt user for additional consent when accessing higher-privilege resources. Implement scope downgrading - allow tokens to be issued with subset of originally granted scopes. Log scope usage for auditing. Use consent screens that clearly show scope implications. Example: if token has ['read:profile'], reject requests requiring ['write:profile'] and redirect to consent screen for scope upgrade.",
      },
      {
        question: "How do you encrypt sensitive fields at rest?",
        solution:
          "Encrypt sensitive fields using application-level encryption with AES-256-GCM. Generate unique data encryption keys (DEKs) per record, encrypt DEKs with master key encryption key (KEK) stored in external KMS (AWS KMS, Azure Key Vault). Implement envelope encryption: encrypt field with DEK, encrypt DEK with KEK, store both encrypted field and encrypted DEK. Use authenticated encryption to prevent tampering. Implement field-level encryption in ORM/model layer transparently. Rotate keys regularly - maintain key versions for decryption of old data. Use different keys for different data types (PII, financial, health). Example: CryptoJS.AES.encrypt(sensitiveData, dek).toString(), then encrypt DEK with KMS. Store encrypted_field and encrypted_dek columns. Implement key derivation using PBKDF2 or scrypt for password-based encryption scenarios.",
      },
      {
        question:
          "Describe the differences between bcrypt, scrypt, and Argon2.",
        solution:
          "bcrypt uses Blowfish cipher with adaptive cost parameter (work factor 10-12 recommended). Memory usage is fixed and low (~4KB), making it vulnerable to ASIC attacks. Good for legacy systems but not optimal for new implementations. scrypt uses memory-hard function requiring significant RAM (16MB+ recommended), making it ASIC-resistant. Configurable CPU cost (N), memory factor (r), and parallelization (p) parameters. Better than bcrypt for password hashing but complex parameter tuning. Argon2 is modern winner of Password Hashing Competition. Two variants: Argon2i (side-channel resistant) and Argon2d (faster, GPU-resistant). Configurable time cost, memory cost, and parallelism. Argon2id combines both variants. Recommended settings: memory 64MB, time 3, parallelism 4. Use Argon2id for new applications, scrypt for high-security requirements, bcrypt for legacy compatibility.",
      },
      {
        question: "How do you securely transmit cookies over HTTPS?",
        solution:
          "Secure cookie transmission using Secure, HttpOnly, and SameSite flags. Set Secure flag to ensure cookies only transmitted over HTTPS connections. Use HttpOnly to prevent JavaScript access, mitigating XSS attacks. Implement SameSite=Strict for CSRF protection or SameSite=Lax for usability with external links. Set appropriate expiration with MaxAge or Expires attributes. Use cookie prefixes: __Secure- requires HTTPS and Secure flag, __Host- additionally requires Path=/ and no Domain attribute. Implement cookie signing/encryption using libraries like cookie-signature. Use HSTS headers to force HTTPS. Example: res.cookie('sessionId', token, { secure: true, httpOnly: true, sameSite: 'strict', maxAge: 3600000, signed: true }). Implement secure session management with regular token rotation and proper cleanup on logout.",
      },
      {
        question: "How do you detect and block JWT replay attacks?",
        solution:
          "Detect JWT replay attacks using nonce (jti claim), short expiration times, and request correlation. Include unique 'jti' (JWT ID) in each token and store used JTIs in Redis with token expiration as TTL. Check for duplicate JTI usage on each request. Implement sliding expiration - issue short-lived tokens (5-15 minutes) with refresh capability. Use request-specific binding: include request fingerprint (IP, User-Agent) in token claims and validate on each request. Implement sequence numbers or timestamps with acceptable time skew (5 minutes). Use one-time tokens for sensitive operations. Store token usage patterns and detect anomalies (multiple simultaneous sessions from different locations). Example: generate UUID for jti, store in Redis with SET jti:uuid 'used' EX 900, check EXISTS before processing request. Combine with refresh token rotation for additional security.",
      },
      {
        question: "Explain the security implications of SameSite=Lax.",
        solution:
          "SameSite=Lax provides partial CSRF protection while maintaining usability for legitimate cross-site navigation. Cookies are sent with same-site requests and top-level navigation (GET requests from external sites like email links). Not sent with cross-site subrequests (images, AJAX, forms from other domains). Vulnerable to GET-based CSRF attacks and doesn't protect POST requests initiated by navigation. Safe for authentication cookies in most scenarios but requires CSRF tokens for state-changing operations. More permissive than Strict (allows external link navigation) but more secure than None. Not suitable for highly sensitive applications requiring strict CSRF protection. Example: user clicks email link to bank.com - authentication cookie sent, enabling automatic login. But AJAX request from malicious.com to bank.com won't include cookie. Use SameSite=Lax for session cookies with CSRF token protection for sensitive operations.",
      },
      {
        question: "How do you implement logout across distributed services?",
        solution:
          "Implement distributed logout using token blacklisting, event broadcasting, or centralized session management. Store logout events in shared Redis cache with token expiration as TTL. Each service checks blacklist before processing requests. Use message queues (RabbitMQ, Kafka) to broadcast logout events across services - each service maintains local blacklist cache. Implement session service with centralized token validation - services validate tokens via session service API. Use short-lived access tokens with centralized refresh token validation - revoke refresh token to force re-authentication. Implement logout propagation via service mesh (Istio) with policy enforcement. Example: user logs out → add token to Redis blacklist → publish 'user.logout' event → services receive event and update local caches → subsequent requests with that token are rejected. Include user ID and device information for selective logout (single device vs all devices).",
      },
      {
        question: "How do you rotate client secrets in third-party OAuth apps?",
        solution:
          "Implement zero-downtime client secret rotation using dual-secret validation and phased rollout. Generate new secret while keeping old secret valid during transition period. Update client configuration to use new secret for outbound requests while validating both old and new secrets for incoming requests. Use secret versioning with 'kid' (key ID) parameter to identify which secret to use. Implement automatic rotation schedule (90 days) with monitoring and rollback capability. Store multiple active secrets with expiration timestamps. Coordinate rotation with third-party services - some require manual update, others support API-based rotation. Example: Week 1: Generate new secret, deploy to 50% of instances. Week 2: Deploy to all instances, update third-party app configuration. Week 3: Remove old secret after confirming no usage. Use services like AWS Secrets Manager for automated rotation with Lambda functions.",
      },
      {
        question: "Describe how to use refresh-token rotation.",
        solution:
          "Implement refresh token rotation by issuing new refresh token with each access token renewal, invalidating the previous refresh token. Store refresh tokens in database with user association, expiration, and used status. On token refresh request: validate current refresh token, mark as used, generate new access token and refresh token, return both to client. Detect replay attacks by checking if refresh token already used - if used, revoke all tokens for that user session. Implement token families to track token lineage and detect compromise. Use automatic cleanup job to remove expired tokens. Example: client sends refresh_token → validate and mark as used → generate new access_token + refresh_token → client stores new refresh_token. If old refresh_token used again → security breach detected → revoke all user sessions → force re-authentication. Implement grace period (30 seconds) for network retry scenarios.",
      },
      {
        question: "How do you validate redirect URIs in OAuth?",
        solution:
          "Validate OAuth redirect URIs using exact string matching against pre-registered URIs stored with client registration. Implement strict validation: no wildcards, fragments, or query parameters in registered URIs. Use URL parsing to validate scheme (https required for production), domain, and path components. Implement subdomain validation carefully - avoid overly permissive patterns. For native apps, validate custom schemes (com.company.app://) and localhost URIs with random ports. Check for homograph attacks using punycode normalization. Implement redirect URI categories: web (https://), native (custom scheme), and mobile (deep links). Example: registered URI 'https://app.example.com/callback' must exactly match redirect_uri parameter. Reject 'https://app.example.com/callback?evil=true' or 'https://evil.com'. For development, allow localhost with specific ports. Use URI validation libraries to prevent parsing vulnerabilities.",
      },
      {
        question: "How do you protect user passwords in memory?",
        solution:
          "Protect passwords in memory using secure string handling, immediate clearing, and memory encryption. Never store passwords in regular strings - use SecureString or Buffer with manual clearing. Clear password variables immediately after hashing using buffer.fill(0) or equivalent. Implement memory pools with encrypted storage for sensitive data. Use process isolation and memory protection flags. Avoid string concatenation or logging that might leave password traces. Implement garbage collection forcing after password operations. Use constant-time operations for password comparison. Example: const password = Buffer.from(req.body.password, 'utf8'); const hash = await bcrypt.hash(password, 10); password.fill(0); // clear immediately. Implement core dumps disabled in production, use address space layout randomization (ASLR), and consider hardware security modules (HSMs) for critical applications.",
      },
      {
        question: "How do you implement API key authentication?",
        solution:
          "Implement API key authentication using cryptographically secure keys with proper validation and management. Generate keys using crypto.randomBytes(32).toString('hex') for sufficient entropy. Store hashed keys in database with associated permissions and metadata (creation date, last used, rate limits). Validate keys using constant-time comparison to prevent timing attacks. Implement key prefixes for easy identification (ak_live_, ak_test_). Use HTTP headers (X-API-Key) or query parameters with rate limiting per key. Implement key rotation, expiration, and revocation capabilities. Store key metadata: user association, permissions, IP restrictions, and usage analytics. Example: client sends X-API-Key header → extract key → hash and compare with stored hash → load associated permissions → proceed with request. Implement key management dashboard for users to create, rotate, and monitor API keys. Use different key types for different access levels.",
      },
      {
        question: "How do you enforce password complexity rules?",
        solution:
          "Enforce password complexity using configurable validation rules with user-friendly feedback. Implement minimum length (12+ characters), character class requirements (uppercase, lowercase, numbers, symbols), and entropy calculation. Check against common password lists (rockyou.txt, haveibeenpwned API) and dictionary words. Implement progressive strength meter with real-time feedback. Validate against personal information (username, email, name) to prevent predictable passwords. Use libraries like zxcvbn for realistic password strength estimation. Implement custom rules: no keyboard patterns, no repeated sequences, no company-specific terms. Example: password validator checks length >=12, requires 3 of 4 character classes, entropy >=60 bits, not in breach database, passes custom rules. Provide clear error messages and suggestions. Consider passphrase-based alternatives (4+ random words) as user-friendly option meeting security requirements.",
      },
      {
        question: "How do you audit authentication events?",
        solution:
          "Implement comprehensive authentication event auditing using structured logging and centralized monitoring. Log all authentication events: successful/failed logins, password changes, MFA events, account lockouts, and privilege escalations. Include contextual data: user ID, IP address, user agent, device fingerprint, location, timestamp, and outcome. Use structured logging formats (JSON) with consistent schema for parsing. Implement log aggregation using ELK stack (Elasticsearch, Logstash, Kibana) or similar tools. Create real-time alerts for suspicious patterns: multiple failed attempts, unusual locations, privilege escalation, and account enumeration. Store logs immutably with integrity protection (log signing). Implement retention policies and compliance requirements (GDPR, SOX). Example: logger.info('auth.login.success', { userId, ip, userAgent, location, mfa: true, timestamp }). Create dashboards for security monitoring and automated incident response workflows.",
      },
      {
        question:
          "What are the main HTTP methods and their idempotency guarantees?",
        solution:
          "HTTP methods have different idempotency and safety guarantees affecting security design. GET and HEAD are safe (no side effects) and idempotent (multiple calls have same effect). POST is neither safe nor idempotent - creates resources, processes data, has side effects. PUT is idempotent but not safe - replaces entire resource, same result regardless of call count. PATCH is neither safe nor idempotent - partial updates may have different results. DELETE is idempotent but not safe - deleting non-existent resource still returns success. OPTIONS and TRACE are safe and idempotent. Security implications: use GET only for read operations to prevent CSRF, implement CSRF protection for POST/PUT/PATCH/DELETE, validate HTTP method matches intended operation, use proper status codes (201 for POST creation, 204 for DELETE success). Example: GET /users/123 (safe, cacheable), POST /users (creates user, not idempotent), PUT /users/123 (replaces user, idempotent), DELETE /users/123 (removes user, idempotent result).",
      },
      {
        question: "How do you implement pagination in a RESTful way?",
        solution:
          "Use offset-based or cursor-based pagination with proper HTTP headers. Offset: GET /api/users?limit=20&offset=40. Return pagination metadata in response headers (X-Total-Count, Link header with rel=next/prev/first/last). Cursor-based for large datasets: GET /api/users?limit=20&cursor=eyJpZCI6MTAwfQ==. Include 'has_more' boolean and 'next_cursor' in response. Always validate limit bounds (max 100), provide default values, and include self-links in HATEOAS responses for navigation.",
      },
      {
        question:
          "Describe the differences between 200, 201, and 204 responses.",
        solution:
          "200 OK: Successful GET/PUT/PATCH with response body containing the resource or operation result. 201 Created: Successful POST that creates a new resource; must include Location header pointing to new resource URI and typically returns the created resource in response body. 204 No Content: Successful operation with no response body needed - common for DELETE operations, PUT updates that don't return data, or PATCH operations where the client doesn't need the updated resource back. Use appropriate status to convey semantic meaning to clients.",
      },
      {
        question:
          "How do you version a REST API? Compare URI vs header versioning.",
        solution:
          "URI versioning: /api/v1/users - Simple, visible, cacheable, browser-friendly but clutters URLs and creates multiple endpoints. Header versioning: Accept: application/vnd.myapi.v1+json - Cleaner URLs, supports content negotiation, but harder to test and less discoverable. Other options: Query params (?version=1) for simplicity. Best practice: Start with URI versioning for simplicity, use semantic versioning (v1.2.3), maintain backward compatibility, provide deprecation headers (Sunset: date), and document migration paths. Consider API gateway for version routing and gradual rollouts.",
      },
      {
        question: "How do you handle partial updates with PATCH?",
        solution:
          'Use JSON Merge Patch (RFC 7396) or JSON Patch (RFC 6902). Merge Patch: PATCH /users/123 with {"email": "new@email.com"} updates only email field. JSON Patch uses operations array: [{"op": "replace", "path": "/email", "value": "new@email.com"}]. Validate required fields aren\'t being nullified, handle nested object updates carefully, return 422 for validation errors, 409 for conflicts. Support conditional updates with If-Match header using ETags. Consider field-level permissions and audit trails for sensitive updates.',
      },
      {
        question: "Explain HATEOAS and give an example.",
        solution:
          'HATEOAS (Hypermedia as the Engine of Application State) provides navigation links in API responses to guide client interactions. Example: GET /api/users/123 returns {"id": 123, "name": "John", "_links": {"self": {"/api/users/123"}, "edit": {"/api/users/123"}, "delete": {"/api/users/123"}, "orders": {"/api/users/123/orders"}}}. Benefits: Self-documenting API, loose coupling, easier API evolution. Challenges: Increased payload size, complexity. Implement using HAL (Hypertext Application Language) or JSON-LD formats for standardization.',
      },
      {
        question:
          "How do you implement filtering and sorting query parameters?",
        solution:
          "Use consistent query parameter conventions: Filtering: ?status=active&category=tech&created_after=2023-01-01. Support operators: ?price_gte=100&price_lte=500. Sorting: ?sort=name,-created_at (minus for desc). Complex filters: ?filter[status]=active&filter[price][gte]=100. Validate all parameters, sanitize inputs to prevent injection, limit filterable fields, implement proper indexing on filtered columns. Use query builders like Knex.js or ORM capabilities. Return 400 for invalid filters with descriptive error messages. Consider implementing saved filters and search endpoints for complex queries.",
      },
      {
        question: "What is the difference between 401 and 403?",
        solution:
          "401 Unauthorized: Authentication is required but missing or invalid. Client should retry with valid credentials. Include WWW-Authenticate header specifying auth method needed. Example: Missing JWT token or expired session. 403 Forbidden: Client is authenticated but lacks permission to access the resource. Re-authentication won't help. Example: Regular user trying to access admin endpoint. 401 is about identity (who are you?), 403 is about authorization (what can you do?). Use 401 for login failures, expired tokens; 403 for insufficient privileges, account disabled, or resource-level permissions.",
      },
      {
        question: "How do you document a REST API using OpenAPI (Swagger)?",
        solution:
          "Create OpenAPI 3.0 specification in YAML/JSON defining endpoints, request/response schemas, authentication, examples. Key components: info (title, version, description), servers (base URLs), paths (endpoints with HTTP methods), components (reusable schemas, parameters). Use tools like Swagger Editor for authoring, Swagger UI for interactive docs, code generators for SDKs. Implement schema validation, include comprehensive examples, document error responses, add security schemes (OAuth2, API keys). Integrate with CI/CD to validate spec changes and auto-generate documentation from code annotations using tools like swagger-jsdoc.",
      },
      {
        question: "How do you handle long-running async jobs?",
        solution:
          'Return 202 Accepted with job ID immediately: POST /api/exports returns {"job_id": "abc123", "status": "processing", "created_at": "2023-01-01T10:00:00Z"}. Provide status endpoint: GET /api/jobs/abc123 returns current status, progress percentage, estimated completion. Use webhook callbacks or WebSocket for real-time updates. Store job metadata in database/Redis, implement job queue (Bull, Agenda.js), handle failures with retry logic and dead letter queues. Return final result location in status response when complete. Consider job expiration and cleanup policies.',
      },
      {
        question: "Describe the pros and cons of GraphQL vs REST.",
        solution:
          "GraphQL pros: Single endpoint, exact data fetching (no over/under-fetching), strong type system, real-time subscriptions, introspection. Cons: Complex caching, query complexity attacks, learning curve, tooling maturity. REST pros: Simple concepts, excellent caching (HTTP), mature ecosystem, stateless, multiple representation formats. Cons: Over/under-fetching, multiple round trips, API versioning challenges. Use GraphQL for complex data requirements, mobile apps, rapid frontend development. Use REST for simple CRUD, microservices, public APIs, when caching is critical. Hybrid approach: REST for core operations, GraphQL for complex queries.",
      },
      {
        question: "How do you implement idempotency keys for POST?",
        solution:
          "Accept Idempotency-Key header (UUID) for POST requests. Store key-response mapping in cache/database with TTL (24 hours). First request processes normally and caches result. Subsequent requests with same key return cached response. Implementation: Check idempotency key before processing, handle key expiration gracefully, ensure atomic operations (use database transactions), consider key scope (per user/tenant). Example: Redis storage with key pattern 'idempotent:{user_id}:{key}'. Return 409 Conflict if key exists but request differs. Critical for payment processing, order creation, avoiding duplicate operations in distributed systems.",
      },
      {
        question: "How do you return meaningful error objects?",
        solution:
          'Use consistent error format with proper HTTP status codes. Structure: {"error": {"code": "VALIDATION_FAILED", "message": "Request validation failed", "details": [{"field": "email", "code": "INVALID_FORMAT", "message": "Invalid email format"}], "request_id": "req-123"}}. Include error codes for programmatic handling, human-readable messages, field-specific validation errors, trace IDs for debugging. Use Problem Details (RFC 7807) format for standardization. Map internal errors to appropriate HTTP status codes, avoid exposing internal details in production, implement error logging and monitoring.',
      },
      {
        question: "How do you handle bulk inserts via REST?",
        solution:
          'POST /api/users/bulk with array payload: [{"name": "John"}, {"name": "Jane"}]. Return 207 Multi-Status with individual operation results: {"results": [{"status": 201, "id": 123}, {"status": 422, "errors": [...]}], "summary": {"created": 1, "failed": 1}}. Implement batch size limits (max 1000), use database transactions for atomicity, provide options for partial success vs all-or-nothing. Consider async processing for large batches with job tracking. Alternative: Use JSON Patch format for bulk operations or separate endpoints for different bulk operations (create, update, delete).',
      },
      {
        question: "How do you implement conditional requests with ETags?",
        solution:
          'Generate ETags (entity tags) based on resource version/hash: ETag: "v1.0" or "sha256-abc123". Support If-Match (require exact match), If-None-Match (return 304 if matches), If-Modified-Since headers. GET requests return 304 Not Modified if ETag matches If-None-Match. PUT/PATCH requests return 412 Precondition Failed if If-Match doesn\'t match current ETag. Implementation: Store ETags in database/cache, generate from version numbers or content hash, handle weak vs strong ETags. Benefits: Reduces bandwidth, prevents lost update problem, improves caching efficiency.',
      },
      {
        question: "How do you expose nested resources cleanly?",
        solution:
          "Use hierarchical URLs for clear relationships: GET /api/users/123/orders for user's orders. Limit nesting depth (max 2-3 levels): /users/123/orders/456/items. Provide both nested and direct access: GET /api/orders/456 and GET /api/users/123/orders/456. Use query parameters for filtering: GET /api/orders?user_id=123. Include parent resource info in nested responses. Consider sub-resource collections vs individual resources. For complex relationships, use hypermedia links or separate endpoints. Avoid deep nesting like /users/123/orders/456/items/789/reviews - use /reviews/review_id instead.",
      },
      {
        question: "How do you enforce rate limits per endpoint?",
        solution:
          "Implement sliding window or token bucket algorithms using Redis. Store counters with keys like 'rate_limit:{user_id}:{endpoint}' with TTL. Return headers: X-RateLimit-Limit: 1000, X-RateLimit-Remaining: 999, X-RateLimit-Reset: 1640995200. Different limits per endpoint/user tier: Express middleware example: const rateLimit = require('express-rate-limit'). Configure limits: 100/hour for POST, 1000/hour for GET. Return 429 Too Many Requests when exceeded. Use API gateways (Kong, AWS API Gateway) for distributed systems. Consider burst allowances and graceful degradation.",
      },
      {
        question: "Describe the difference between 410 and 404.",
        solution:
          "404 Not Found: Resource doesn't exist or client lacks access. May exist in future or elsewhere. Temporary condition - retry might succeed later. Use for non-existent IDs, wrong URLs, hidden resources. 410 Gone: Resource previously existed but is permanently deleted and won't return. Intentional removal with no forwarding address. Search engines should remove from index. Use for deprecated API versions, deleted user accounts, expired content. 410 is more definitive than 404 - tells client to stop trying and remove references. Include information about alternatives when possible.",
      },
      {
        question: "How do you support content-negotiation?",
        solution:
          "Use Accept header for response format negotiation: Accept: application/json, application/xml;q=0.8. Support multiple formats: JSON (default), XML, CSV for data export. Check Accept header, return 406 Not Acceptable if unsupported. Use Content-Type header in responses: Content-Type: application/json; charset=utf-8. Handle Accept-Language for internationalization, Accept-Encoding for compression. Example middleware: if (req.accepts('json')) return json; if (req.accepts('xml')) return xml. Consider versioning in Accept header: Accept: application/vnd.api+json;version=1. Provide format query parameter fallback: ?format=json.",
      },
      {
        question: "How do you cache GET responses with Redis?",
        solution:
          "Implement cache-aside pattern: Check Redis first, hit database on miss, store result with TTL. Use hierarchical keys: 'api:users:123', 'api:users:list:page:1'. Set appropriate TTLs based on data volatility: user profiles (1 hour), static data (24 hours). Handle cache invalidation on updates/deletes. Use Redis data types: strings for simple objects, hashes for structured data, sets for collections. Implement cache warming for frequently accessed data. Add cache headers: Cache-Control: public, max-age=3600. Consider cache stampede protection with distributed locks. Monitor hit/miss ratios and adjust TTLs accordingly.",
      },
      {
        question: "How do you handle file downloads with proper headers?",
        solution:
          'Set appropriate headers for file downloads: Content-Type (application/pdf, image/jpeg), Content-Disposition (attachment; filename="report.pdf" for downloads, inline for viewing), Content-Length for progress tracking. Support range requests for large files: Accept-Ranges: bytes, handle Range header, return 206 Partial Content. Implement streaming for large files to avoid memory issues. Add security headers: X-Content-Type-Options: nosniff. For cloud storage, use pre-signed URLs for direct download. Consider CDN integration for performance. Handle file permissions and access control before serving.',
      },
      {
        question: "How do you implement optimistic locking?",
        solution:
          'Use version fields or timestamps in entities. Include version in GET response: {"id": 123, "name": "John", "version": 5}. Require version in update requests: PUT /users/123 with {"name": "Jane", "version": 5}. Check current version in database before update, return 409 Conflict if versions don\'t match. Increment version on successful update. Alternative: Use ETags with If-Match header for conditional updates. Benefits: Prevents lost updates in concurrent scenarios, lightweight compared to pessimistic locking. Handle conflicts gracefully by returning current state and asking client to retry with updated version.',
      },
      {
        question: "How do you expose health check endpoints?",
        solution:
          'Implement multiple health check levels: GET /health (basic liveness), GET /health/ready (readiness with dependencies), GET /health/detailed (comprehensive status). Return appropriate status codes: 200 OK (healthy), 503 Service Unavailable (unhealthy). Include component status: {"status": "healthy", "checks": {"database": "healthy", "redis": "healthy", "external_api": "degraded"}, "version": "1.2.3", "uptime": 3600}. Keep checks fast (<30s timeout), cache results briefly, don\'t expose sensitive information. Support Kubernetes probe format, implement circuit breakers for external dependencies.',
      },
      {
        question: "How do you deal with breaking changes in APIs?",
        solution:
          "Use semantic versioning (major.minor.patch) where major indicates breaking changes. Maintain backward compatibility within major versions. Strategies: 1) API versioning (v1, v2 URLs), 2) Header versioning, 3) Feature flags for gradual rollouts. Provide migration guides and change logs. Use deprecation headers: Sunset: Wed, 01 Jan 2025 00:00:00 GMT. Implement adapter patterns to support old formats. Consider feature toggles for new functionality. Communicate changes well in advance, provide sandbox environments for testing. Use contract testing to catch breaking changes early.",
      },
      {
        question: "How do you implement API deprecation strategies?",
        solution:
          'Multi-phase approach: 1) Announce deprecation with timeline, 2) Add deprecation warnings in responses: Warning: 299 - "Deprecated API" header, 3) Update documentation, 4) Provide migration path and new endpoint details, 5) Monitor usage analytics to identify active consumers, 6) Gradually reduce rate limits on deprecated endpoints, 7) Set sunset date: Sunset: Wed, 01 Jan 2025 00:00:00 GMT header, 8) Return 410 Gone after sunset. Communicate via API change logs, email notifications, developer portal announcements. Provide overlapping support period for smooth transition.',
      },
      {
        question: "How do you handle CORS preflight requests?",
        solution:
          "Configure CORS middleware to handle OPTIONS preflight requests for cross-origin requests with custom headers/methods. Return appropriate headers: Access-Control-Allow-Origin (specific domains or *), Access-Control-Allow-Methods (GET, POST, PUT, DELETE), Access-Control-Allow-Headers (Content-Type, Authorization, X-Requested-With), Access-Control-Max-Age (cache preflight for 86400 seconds). Handle credentials: Access-Control-Allow-Credentials: true (never with wildcard origin). Example Express.js: app.use(cors({origin: 'https://trusted-domain.com', credentials: true})). Configure different policies per route if needed.",
      },
      {
        question: "How do you secure internal endpoints from public access?",
        solution:
          "Implement multiple security layers: 1) Network isolation (VPC, private subnets, security groups), 2) API Gateway with IP whitelisting, 3) Internal-only authentication tokens, 4) Service mesh with mTLS (mutual TLS), 5) Header validation (X-Internal-Request), 6) Separate internal/external route prefixes (/internal/api vs /api), 7) Firewall rules blocking external access to internal ports. Use service discovery for internal communication. Implement zero-trust architecture with service-to-service authentication. Monitor for unauthorized access attempts and implement alerting.",
      },
      {
        question: "How do you expose metrics endpoints (Prometheus)?",
        solution:
          'Create /metrics endpoint returning Prometheus format metrics. Use prometheus client libraries: const prometheus = require(\'prom-client\'). Expose default metrics (CPU, memory, event loop), custom counters (http_requests_total), histograms (http_request_duration_seconds), gauges (active_connections). Label metrics appropriately: http_requests_total{method="GET", route="/users", status="200"}. Secure metrics endpoint with authentication or IP restrictions. Use separate port (9090) for metrics. Implement health metrics, business metrics (orders processed), infrastructure metrics (database connections). Configure Prometheus scraping with proper intervals and retention policies.',
      },
      {
        question: "How do you handle uncaught errors in clusters?",
        solution:
          "Use cluster.on('exit') to respawn workers; implement process.on('uncaughtException') and 'unhandledRejection' handlers that log errors and gracefully shutdown; use domains or AsyncLocalStorage for request context; set up health checks; configure worker restart limits to prevent cascading failures; use PM2 or similar process managers for automatic restart with exponential backoff.",
      },
      {
        question: "Describe how to use NODE_OPTIONS='--trace-warnings'.",
        solution:
          "Set NODE_OPTIONS='--trace-warnings' to print stack traces for process warnings like deprecated API usage, promise rejections, or EventEmitter memory leaks; combine with --trace-deprecation for detailed deprecation info; use --trace-uncaught for unhandled exceptions; --trace-sync-io to detect blocking operations; helps identify problematic code locations during development and testing phases.",
      },
      {
        question: "How do you use console.time and console.trace effectively?",
        solution:
          "Use console.time('label') and console.timeEnd('label') to measure execution time; console.trace() prints stack trace at current location; console.timeLog('label') shows intermediate times; combine with performance.now() for high-precision timing; use unique labels per operation; disable in production via environment flags; integrate with structured logging for better analysis.",
      },
      {
        question: "How do you debug worker_threads?",
        solution:
          "Use --inspect-port=0 to auto-assign debug ports for each worker; access via chrome://inspect or VSCode; pass --inspect-brk to break on start; use Worker constructor options like { execArgv: ['--inspect-port=9230'] }; implement message-based debugging protocol; use shared memory debugging with SharedArrayBuffer; isolate worker issues using try-catch in message handlers.",
      },
      {
        question: "How do you suppress specific error codes in logs?",
        solution:
          "Filter errors by code property: if (err.code !== 'ENOENT') logger.error(err); use logging libraries like Winston with custom filters; implement error classification middleware; use log levels (debug/info/warn/error); configure log transports with different filtering rules; suppress known non-critical errors like ECONNRESET, EPIPE, or ETIMEDOUT based on context.",
      },
      {
        question: "How do you implement graceful shutdown on SIGTERM?",
        solution:
          "Register process.on('SIGTERM', cleanup) handler; close HTTP server with server.close(), wait for existing connections; close database connections; flush logs and metrics; set shutdown timeout (15-30s); send readiness probe failure; drain message queues; use process.exit(0) after cleanup; implement health check endpoint that returns 503 during shutdown.",
      },
      {
        question: "How do you detect event emitter memory leaks?",
        solution:
          "Use --trace-warnings to detect MaxListenersExceededWarning; monitor process.memoryUsage() and heap snapshots; set emitter.setMaxListeners(n) appropriately; use weak references with WeakMap for cleanup; implement listener tracking: const listeners = new Map(); track add/remove operations; use clinic.js or 0x for heap analysis; monitor EventEmitter instances count.",
      },
      {
        question: "How do you use debug module namespaces?",
        solution:
          "Use debug('namespace:component') pattern: const debug = require('debug')('app:database'); debug('query executed: %s', sql); set DEBUG=app:* or DEBUG=app:database,app:auth; use hierarchical namespaces like 'api:routes:users'; filter logs in production with specific namespaces; combine with structured logging; use debug.enabled to conditionally execute expensive debug operations.",
      },
      {
        question: "Explain how to use ndb for Node debugging.",
        solution:
          "Install ndb globally: npm i -g ndb; run ndb script.js for Chrome DevTools debugging; supports async/await debugging, ES modules; use ndb --inspect-brk for breakpoints on start; integrates with source maps; provides better async stack traces than node --inspect; configure via .ndbrc file; supports remote debugging and Docker containers.",
      },
      {
        question: "How do you integrate APM tools (New Relic, Datadog)?",
        solution:
          "Initialize APM at app startup before other requires: require('newrelic'); configure via environment variables or config files; use custom metrics: newrelic.recordMetric('Custom/API/Response', responseTime); implement distributed tracing with trace IDs; monitor errors, performance, and business metrics; set up alerts for SLA violations; use APM-specific middleware for request correlation.",
      },
      {
        question: "How do you trace SQL queries in an ORM?",
        solution:
          "Enable query logging in ORM config: { logging: (sql, timing) => logger.debug(sql, timing) }; use query builders with .debug() or .toSQL(); implement query interceptors for Sequelize/TypeORM; add timing and parameter logging; correlate queries with request IDs; use database proxy tools like pgbouncer with logging; integrate with APM tracing for query performance analysis.",
      },
      {
        question: "How do you handle 500 vs 503 responses?",
        solution:
          "Use 500 for application errors (bugs, exceptions); 503 for service unavailable (overload, maintenance, dependencies down); implement error classification middleware; check system health before responding with 503; include Retry-After header for 503s; use circuit breakers to return 503 when dependencies fail; monitor error rates and implement exponential backoff strategies.",
      },
      {
        question: "How do you expose a debug endpoint safely?",
        solution:
          "Protect with authentication: JWT tokens or API keys; restrict to internal IPs using middleware; use feature flags to enable/disable; implement rate limiting; expose behind reverse proxy with access controls; provide minimal debug info in production; use separate debug server port; log all debug endpoint access; implement permission-based access to different debug levels.",
      },
      {
        question: "How do you validate environment variables at startup?",
        solution:
          "Use joi, yup, or zod for schema validation: const schema = joi.object({ PORT: joi.number().required() }); validate on startup and fail fast; use envalid library for type coercion and validation; implement custom validators for complex formats; provide meaningful error messages; support default values; validate dependencies between variables; use TypeScript for compile-time checking.",
      },
      {
        question: "How do you handle secrets rotation in production?",
        solution:
          "Use secret management services (AWS Secrets Manager, HashiCorp Vault); implement graceful secret reload without restart; use multiple active secrets during rotation period; poll for secret updates or use webhooks; implement retry logic for secret fetch failures; validate new secrets before applying; use encrypted storage and secure transmission; log rotation events for audit trails.",
      },
      {
        question: "Compare dotenv vs convict libraries.",
        solution:
          "dotenv: Simple .env file loading, no validation, lightweight; convict: Schema-based validation, type coercion, multiple formats (JSON, env), built-in documentation generation, strict mode; dotenv better for simple apps; convict better for complex configuration with validation requirements, supports nested configs and formats like JSON schema validation.",
      },
      {
        question: "How do you inject different configs per environment?",
        solution:
          "Use config/default.js, config/development.js structure; implement config factory pattern with NODE_ENV switching; use environment-specific .env files (.env.development); leverage cloud-specific config services (AWS Parameter Store); use Kubernetes ConfigMaps per namespace; implement config inheritance with environment overrides; validate environment-specific requirements.",
      },
      {
        question: "Describe how Docker handles env variables.",
        solution:
          "Set via dockerfile ENV instruction or docker run -e; use .env files with docker-compose; variables available via process.env; support variable expansion: ${VAR:-default}; use secrets for sensitive data; multi-stage builds can use ARG for build-time variables; environment variables override Dockerfile defaults; use docker-compose environment section for service-specific vars.",
      },
      {
        question: "How do you encrypt sensitive environment variables?",
        solution:
          "Use AWS KMS, Azure Key Vault, or GCP Secret Manager; implement envelope encryption: encrypt with data keys, encrypt data keys with master keys; use libraries like node-vault for HashiCorp Vault; implement client-side decryption at startup; use sealed secrets in Kubernetes; rotate encryption keys regularly; validate decryption success and handle failures gracefully.",
      },
      {
        question: "How do you hot-reload config without restart?",
        solution:
          "Watch config files with fs.watchFile() or chokidar; implement config reload endpoint; use EventEmitter to notify components of config changes; validate new config before applying; maintain backward compatibility during transitions; use graceful degradation for invalid configs; implement config versioning; cache expensive config computations; use atomic updates for consistency.",
      },
      {
        question: "How do you share config between Node and frontend?",
        solution:
          "Expose public config via /api/config endpoint; use webpack DefinePlugin for build-time injection; share config files during build process; use environment-specific builds; implement server-side rendering with config injection; use feature flags service; separate public/private configs; use CDN for config distribution; implement config caching strategies.",
      },
      {
        question: "How do you prevent leaking env vars in error messages?",
        solution:
          "Filter sensitive keys in error serializers; use custom error classes that redact data; implement logging middleware that sanitizes output; maintain allow/deny lists for safe variables; use error boundary patterns; mask sensitive values: DATABASE_URL -> DATABASE_URL=***; implement structured logging with field filtering; use secrets detection tools in CI/CD pipelines.",
      },
      {
        question: "How do you implement feature flags with config?",
        solution:
          "Use feature flag services (LaunchDarkly, Split.io) or implement custom solution; store flags in database/Redis for dynamic updates; implement percentage-based rollouts; use user segmentation for targeting; provide admin interface for flag management; implement flag evaluation middleware; use fallback values for missing flags; monitor flag usage and performance impact.",
      },
      {
        question: "How do you use Kubernetes ConfigMaps and Secrets?",
        solution:
          "Create ConfigMaps: kubectl create configmap app-config --from-file=config/; mount as volumes or environment variables; use Secrets for sensitive data with base64 encoding; implement automatic reload with tools like Reloader; use kustomize for environment-specific configs; integrate with external secret operators; implement RBAC for config access; use immutable ConfigMaps for consistency.",
      },
      {
        question: "How do you handle mandatory vs optional variables?",
        solution:
          "Use validation schemas with required/optional fields; implement startup validation that fails for missing mandatory vars; provide sensible defaults for optional variables; use TypeScript strict mode for compile-time checking; document requirements clearly; implement health checks that verify required configs; use config builders with fluent API for optional chaining.",
      },
      {
        question: "How do you validate types (number, boolean) from strings?",
        solution:
          "Use type coercion libraries: const port = Number(process.env.PORT) || 3000; implement custom parsers with validation: parseBoolean('true') -> true; use schema validators like joi with type conversion; validate ranges for numbers; handle edge cases (empty strings, null, undefined); provide meaningful error messages for invalid types; use TypeScript for additional type safety.",
      },
      {
        question: "How do you expose non-secret configs via /config endpoint?",
        solution:
          "Filter sensitive keys using allow-list approach; implement middleware that sanitizes config object; use different config objects for public/private data; protect endpoint with authentication if needed; implement caching headers for static configs; provide config versioning; use Content-Type: application/json; implement etag for conditional requests; document public config schema.",
      },
      {
        question: "How do you handle 12-Factor App config principles?",
        solution:
          "Store config in environment variables, not files; use strict separation between config and code; never commit config to version control; use different configs for different deploys (dev/staging/prod); implement config validation at startup; group related config into services; use meaningful variable names; support multiple configuration sources; implement config hierarchy (defaults < env < cli args).",
      },
      {
        question: "How do you support JSON Patch format?",
        solution:
          "Implement JSON Patch using RFC 6902 specification with libraries like 'fast-json-patch' or 'jsonpatch'. Create middleware to parse patch operations (add, remove, replace, move, copy, test), validate against JSON schema, apply operations atomically with rollback capability. Handle deep object mutations, array operations, and path validation. Example: app.patch('/api/users/:id', jsonPatchMiddleware, (req, res) => { const patches = req.body; const result = applyPatch(originalDoc, patches, true); if (result.newDocument) res.json(result.newDocument); else res.status(400).json({errors: result.errors}); }). Include operation logging and conflict resolution for concurrent modifications.",
      },
      {
        question: "How do you design webhooks for third-party consumers?",
        solution:
          "Design robust webhook system with: 1) Signature verification using HMAC-SHA256 with shared secrets, 2) Retry mechanism with exponential backoff (3 attempts over 24 hours), 3) Dead letter queue for failed deliveries, 4) Event ordering with sequence numbers, 5) Idempotency keys to prevent duplicate processing. Implement webhook management endpoints for subscription CRUD operations, delivery status tracking, and payload filtering. Use Redis for retry scheduling, database for webhook configurations, and Bull queue for reliable delivery. Include webhook testing endpoints, delivery logs, and circuit breaker patterns for failing endpoints. Provide SDK/libraries for common languages with automatic signature verification.",
      },
      {
        question: "How do you catch unhandled promise rejections globally?",
        solution:
          "Use process.on('unhandledRejection') to catch unhandled promise rejections globally. Implement comprehensive error logging, graceful shutdown, and monitoring integration. Example: process.on('unhandledRejection', (reason, promise) => { logger.error('Unhandled Rejection at:', promise, 'reason:', reason); // Log to monitoring service (Sentry, DataDog) errorReporter.captureException(reason); // Graceful shutdown for critical errors if (isCriticalError(reason)) { gracefulShutdown(); } }). Also handle process.on('uncaughtException') similarly. In production, consider using domains (deprecated) alternative like AsyncLocalStorage with error boundaries, or libraries like 'express-async-errors' for Express applications.",
      },
      {
        question: "Describe the domains module—why is it deprecated?",
        solution:
          "Domains module was Node.js's attempt to handle errors in asynchronous operations by creating isolated execution contexts. It's deprecated because: 1) Memory leaks due to domain objects not being garbage collected properly, 2) Inconsistent behavior across different async operations, 3) Performance overhead from domain switching, 4) Incomplete error catching (some errors still escaped), 5) Complex debugging due to lost stack traces. Modern alternatives: AsyncLocalStorage for context tracking, proper promise chains with .catch(), async/await with try-catch blocks, libraries like 'express-async-errors', and structured error handling with custom error classes. Use process.on('uncaughtException') and process.on('unhandledRejection') for last-resort error catching instead of domains.",
      },
      {
        question: "How do you add context to async stack traces?",
        solution:
          "Enhance async stack traces using: 1) AsyncLocalStorage to maintain request context across async operations, 2) Custom Error classes with additional context properties, 3) Stack trace enhancement libraries like 'clarify' or 'trace'. Implement context injection: const asyncLocalStorage = new AsyncLocalStorage(); function addContext(context, fn) { return asyncLocalStorage.run(context, fn); } class ContextualError extends Error { constructor(message) { super(message); this.context = asyncLocalStorage.getStore(); this.captureStackTrace && this.captureStackTrace(this, ContextualError); } }. Use --async-stack-traces flag in Node.js 12+ for better async stack traces. Integrate with APM tools (New Relic, DataDog) that automatically correlate async operations with request context.",
      },
      {
        question: "How do you use AsyncLocalStorage for request context?",
        solution:
          "AsyncLocalStorage maintains context across async operations without explicitly passing data. Implementation: const { AsyncLocalStorage } = require('async_hooks'); const requestContext = new AsyncLocalStorage(); // Middleware to initialize context app.use((req, res, next) => { const context = { requestId: uuidv4(), userId: req.user?.id, timestamp: Date.now() }; requestContext.run(context, next); }); // Access context anywhere function logWithContext(message) { const context = requestContext.getStore(); logger.info(message, { requestId: context?.requestId, userId: context?.userId }); } // Works across promises, callbacks, setTimeout async function processData() { const context = requestContext.getStore(); // Context preserved across await calls const result = await database.query('...'); return result; }. Handle context cleanup, nested contexts, and performance implications in high-throughput applications.",
      },
      {
        question: "How do you create custom Error classes?",
        solution:
          "Create custom Error classes with proper inheritance, stack traces, and serialization: class CustomError extends Error { constructor(message, code, statusCode = 500) { super(message); this.name = this.constructor.name; this.code = code; this.statusCode = statusCode; this.timestamp = new Date().toISOString(); Error.captureStackTrace && Error.captureStackTrace(this, this.constructor); } toJSON() { return { name: this.name, message: this.message, code: this.code, statusCode: this.statusCode, timestamp: this.timestamp, stack: this.stack }; } } class ValidationError extends CustomError { constructor(field, value) { super(`Invalid ${field}: ${value}`, 'VALIDATION_ERROR', 400); this.field = field; this.value = value; } } class DatabaseError extends CustomError { constructor(query, originalError) { super('Database operation failed', 'DB_ERROR', 500); this.query = query; this.originalError = originalError; } }. Include error factory functions, error codes enum, and integration with logging systems.",
      },
      {
        question: "Describe how to use source-map-support in production?",
        solution:
          "Source-map-support maps compiled JavaScript back to original source for better error reporting. Production setup: 1) Install: npm install source-map-support, 2) Enable at app startup: require('source-map-support').install({ environment: 'node', handleUncaughtExceptions: false }), 3) Generate source maps during build with typescript/babel: tsc --sourceMap or babel --source-maps, 4) Store source maps securely (separate from main bundle), 5) Configure error reporting services (Sentry) to upload source maps. Security considerations: Don't expose source maps publicly, use conditional loading based on environment, implement source map server with authentication. Performance: Source maps add memory overhead, consider lazy loading or external source map resolution. Alternative: Use --enable-source-maps flag in Node.js 14+ for native support.",
      },
      {
        question: "How do you debug memory leaks with --inspect?",
        solution:
          "Debug memory leaks using Node.js inspector and Chrome DevTools: 1) Start app with --inspect flag: node --inspect app.js, 2) Open chrome://inspect in Chrome, connect to remote target, 3) Go to Memory tab, take heap snapshots at different intervals, 4) Compare snapshots to identify growing objects, 5) Analyze retainer trees to find leak sources. Advanced techniques: Use --inspect-brk for immediate breakpoint, heap profiling with --heap-prof flag, allocation timeline to track object creation patterns. Common leak patterns: Event listeners not removed, closures capturing large objects, global variables, timers not cleared, circular references. Automated detection: clinic.js doctor for continuous monitoring, memwatch-next for programmatic leak detection, process.memoryUsage() for runtime monitoring. Production: Use external heap dump analysis, memory profiling in staging environments.",
      },
      {
        question:
          "Explain the difference between uncaughtException vs unhandledRejection?",
        solution:
          "uncaughtException: Synchronous errors that weren't caught by try-catch or error events. Occurs when any error bubbles up to the event loop without being handled. Process should exit after logging because application state might be inconsistent. Example: throw new Error('sync error'). Handler: process.on('uncaughtException', (error) => { logger.fatal(error); process.exit(1); }). unhandledRejection: Promise rejections without .catch() handlers or rejected promises in async functions without try-catch. Process can continue running safely. Example: Promise.reject('error'). Handler: process.on('unhandledRejection', (reason, promise) => { logger.error('Unhandled Rejection', { reason, promise }); }). Best practices: Always handle both events, implement graceful shutdown for uncaughtException, use proper promise error handling, consider process.exit() vs graceful shutdown based on error severity.",
      },
      {
        question: "How do you integrate Sentry for error reporting?",
        solution:
          "Integrate Sentry for comprehensive error tracking: 1) Install SDK: npm install @sentry/node @sentry/tracing, 2) Initialize early in application: const Sentry = require('@sentry/node'); Sentry.init({ dsn: 'YOUR_DSN', environment: process.env.NODE_ENV, tracesSampleRate: 0.1 }); 3) Add request handler middleware: app.use(Sentry.Handlers.requestHandler()); 4) Add error handler (last middleware): app.use(Sentry.Handlers.errorHandler()). Advanced configuration: Custom error filtering, user context attachment, release tracking with Git commits, performance monitoring, breadcrumbs for request flow. Custom integration: Sentry.captureException(error), Sentry.captureMessage('info'), Sentry.addBreadcrumb({message: 'User action'}), Sentry.setUser({id, email}). Production optimizations: Error sampling, local error caching for offline scenarios, source map upload in CI/CD, alert configuration based on error frequency and severity.",
      },
      {
        question: "How do you implement centralized error handler middleware?",
        solution:
          "Implement centralized Express error handler with comprehensive error processing: function errorHandler(err, req, res, next) { const errorId = uuidv4(); const context = { errorId, requestId: req.requestId, userId: req.user?.id, method: req.method, url: req.url, userAgent: req.get('User-Agent') }; // Log error with context logger.error('Application Error', { error: err.stack, context }); // Report to monitoring service errorReporter.captureException(err, { tags: context }); // Determine response based on error type const statusCode = err.statusCode || 500; const message = process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message; // Send structured error response res.status(statusCode).json({ error: { id: errorId, message, code: err.code || 'INTERNAL_ERROR', timestamp: new Date().toISOString() } }); } app.use(errorHandler). Include error classification, rate limiting for error responses, and async error wrapper utilities.",
      },
      {
        question: "How do you log request ID across async operations?",
        solution:
          "Maintain request correlation using AsyncLocalStorage and structured logging: const { AsyncLocalStorage } = require('async_hooks'); const requestContext = new AsyncLocalStorage(); // Middleware to generate and store request ID app.use((req, res, next) => { const requestId = req.headers['x-request-id'] || uuidv4(); req.requestId = requestId; res.set('X-Request-ID', requestId); requestContext.run({ requestId, userId: req.user?.id }, next); }); // Logger wrapper that automatically includes context class ContextualLogger { info(message, meta = {}) { const context = requestContext.getStore(); winston.info(message, { ...meta, ...context }); } error(message, error, meta = {}) { const context = requestContext.getStore(); winston.error(message, { error: error.stack, ...meta, ...context }); } } const logger = new ContextualLogger(); // Works across all async operations async function processOrder() { logger.info('Processing order'); // requestId automatically included await database.findOrder(); logger.info('Order processed'); }. Integrate with APM tools for distributed tracing across microservices.",
      },
      {
        question: "How do you handle errors inside streams?",
        solution:
          "Handle stream errors comprehensively using error events and pipeline utilities: const { pipeline, Transform } = require('stream'); const fs = require('fs'); // Individual stream error handling const readStream = fs.createReadStream('input.txt'); readStream.on('error', (err) => { logger.error('Read stream error', err); // Handle gracefully - close resources, notify downstream }); // Transform stream with error handling class DataProcessor extends Transform { _transform(chunk, encoding, callback) { try { const processed = this.processData(chunk); callback(null, processed); } catch (error) { callback(error); // Error will be emitted on stream } } } // Pipeline for automatic error handling and cleanup pipeline( fs.createReadStream('input.txt'), new DataProcessor(), fs.createWriteStream('output.txt'), (err) => { if (err) { logger.error('Pipeline failed', err); // All streams automatically destroyed } else { logger.info('Pipeline succeeded'); } } ). Use finished() utility to handle stream completion, implement proper backpressure handling, and consider using async generators with streams in Node.js 10+.",
      },
      {
        question: "How do you attach error boundaries in Express?",
        solution:
          "Express doesn't have React-like error boundaries, but implement similar patterns using middleware and async wrappers: // Async wrapper for route handlers function asyncHandler(fn) { return (req, res, next) => { Promise.resolve(fn(req, res, next)).catch(next); }; } // Route-level error boundary middleware function routeErrorBoundary(routeHandler) { return async (req, res, next) => { try { await routeHandler(req, res, next); } catch (error) { // Handle specific route errors if (error.name === 'ValidationError') { return res.status(400).json({ error: error.message }); } next(error); // Pass to global handler } }; } // Usage app.get('/users/:id', routeErrorBoundary(async (req, res) => { const user = await User.findById(req.params.id); if (!user) throw new NotFoundError('User not found'); res.json(user); })); // Module-level error boundaries for related routes const userRoutes = express.Router(); userRoutes.use((err, req, res, next) => { if (err.domain === 'USER') { // Handle user-specific errors } next(err); }). Include circuit breaker patterns and fallback responses.",
      },
      {
        question: "How do you tune the V8 --max-old-space-size flag?",
        solution:
          "Tune V8 memory allocation based on application needs and container resources: 1) Default behavior: V8 limits old space to ~1.4GB on 64-bit systems, ~700MB on 32-bit, 2) Increase for memory-intensive apps: node --max-old-space-size=4096 app.js (4GB), 3) Container considerations: Set to 75-80% of container memory limit to prevent OOM kills, 4) Monitoring: Use process.memoryUsage() to track heap usage trends. Optimization strategies: Profile memory usage patterns first, implement memory-efficient algorithms, use streaming for large data processing, configure garbage collection flags (--gc-interval, --optimize-for-size). Production settings: Docker containers with memory limits should set this flag, Kubernetes pods need resource requests/limits aligned with V8 settings, monitor heap growth rates and GC frequency. Example for 8GB container: node --max-old-space-size=6144 --gc-interval=100 app.js. Alternative: Use Worker threads for memory isolation in CPU-intensive tasks.",
      },
      {
        question: "How do you profile CPU usage with 0x?",
        solution:
          "Use 0x for visual CPU profiling and performance optimization: 1) Install globally: npm install -g 0x, 2) Profile application: 0x -- node app.js, 3) Generate load during profiling: curl/ab/artillery commands, 4) Stop with Ctrl+C to generate flame graph HTML report. Advanced usage: 0x --output-dir ./profiles --collect-only -- node app.js (collect data without UI), 0x --kernel-tracing -- node app.js (include kernel calls), 0x --visualize-only path/to/profile (analyze existing profile). Interpretation: Wide bars indicate high CPU time, deep stacks show call complexity, red areas highlight hot paths. Integration: CI/CD performance testing, automated profiling in staging, comparison between releases. Alternatives: clinic.js flame for similar functionality, Node.js built-in --prof flag with --prof-process, perf on Linux systems. Production: Use sampling profilers, avoid continuous profiling due to overhead, implement performance budgets and regression detection.",
      },
      {
        question: "How do you capture heap snapshots in production?",
        solution:
          "Capture heap snapshots safely in production environments: 1) Programmatic capture: const v8 = require('v8'); const snapshot = v8.writeHeapSnapshot('./heap-snapshot.heapsnapshot'); 2) Inspector API: const inspector = require('inspector'); const session = new inspector.Session(); session.connect(); session.post('HeapProfiler.takeHeapSnapshot'); 3) External triggers via HTTP endpoint with authentication: app.post('/debug/heap-snapshot', authenticateAdmin, (req, res) => { const filename = `heap-${Date.now()}.heapsnapshot`; v8.writeHeapSnapshot(filename); res.json({ snapshot: filename }); }). Production considerations: Implement rate limiting to prevent abuse, compress snapshots before storage, use temporary storage with cleanup, avoid during peak traffic. Automated capture: Trigger on memory thresholds, schedule during low-traffic windows, integrate with monitoring alerts. Analysis: Transfer snapshots to development environment, use Chrome DevTools Memory tab, compare snapshots over time to identify leaks. Storage: S3/GCS with lifecycle policies, secure access controls, retention policies.",
      },
      {
        question: "How do you correlate logs across microservices?",
        solution:
          "Implement distributed tracing and correlation IDs across microservice architecture: 1) Generate correlation ID at entry point: const correlationId = req.headers['x-correlation-id'] || uuidv4(), 2) Propagate through all service calls using headers, 3) Include in all log messages using structured logging: logger.info('Processing request', { correlationId, service: 'user-service', operation: 'getUserById' }). Implementation: Use OpenTelemetry for standardized tracing, implement middleware to extract/inject trace context, store correlation data in AsyncLocalStorage. Cross-service propagation: HTTP headers (X-Correlation-ID, X-Trace-ID), message queue metadata (RabbitMQ/Kafka headers), gRPC metadata. Centralized logging: ELK stack (Elasticsearch, Logstash, Kibana) for log aggregation, Fluentd for log forwarding, structured JSON logging format. Advanced features: Span creation for operations, parent-child relationships, error correlation, performance metrics correlation. Tools: Jaeger/Zipkin for distributed tracing visualization, DataDog/New Relic APM for automatic correlation, custom correlation middleware for legacy systems.",
      },
      {
        question:
          "What is the difference between Buffer.alloc and Buffer.allocUnsafe?",
        solution:
          "Buffer.alloc(size) creates a zero-filled buffer, ensuring no data leakage from previous memory usage. Buffer.allocUnsafe(size) creates an uninitialized buffer with potentially sensitive data from memory pool. allocUnsafe is faster (no zero-filling overhead) but requires manual initialization. Use alloc for security-sensitive data, allocUnsafe when you'll immediately overwrite all bytes. Example: const safe = Buffer.alloc(1024); // zeros filled, const unsafe = Buffer.allocUnsafe(1024); unsafe.fill(0); // manual zero-fill required.",
      },
      {
        question: "How do you convert a stream to a buffer?",
        solution:
          "Use stream.pipeline() or collect chunks manually. Modern approach: const chunks = []; stream.on('data', chunk => chunks.push(chunk)); stream.on('end', () => { const buffer = Buffer.concat(chunks); }). Better with async iterators: const chunks = []; for await (const chunk of stream) chunks.push(chunk); const buffer = Buffer.concat(chunks). For large streams, consider streaming processing to avoid memory issues. Alternatively, use stream.Readable.toArray() in Node 17+ or third-party libraries like get-stream.",
      },
      {
        question: "How do you concatenate multiple buffers efficiently?",
        solution:
          "Use Buffer.concat([buf1, buf2, buf3]) which is optimized for multiple buffers. For two buffers, Buffer.concat is still recommended over manual copying. Pre-calculate total length for better performance: const totalLength = buffers.reduce((sum, buf) => sum + buf.length, 0); const result = Buffer.concat(buffers, totalLength). Avoid repeated concatenation in loops; collect buffers in array first, then concatenate once. For streaming scenarios, use writable streams with _write() method to handle backpressure properly.",
      },
      {
        question: "How do you encode/decode base64 without external libs?",
        solution:
          "Use Buffer's built-in base64 support: const encoded = buffer.toString('base64'); const decoded = Buffer.from(encodedString, 'base64'). For URL-safe base64: encoded.replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=/g, ''); For decoding URL-safe: decoded.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - decoded.length % 4) % 4). Handle padding manually for custom implementations. Buffer handles standard RFC 4648 base64 encoding automatically.",
      },
      {
        question: "How do you read a 64-bit integer from a buffer?",
        solution:
          "Use readBigInt64BE()/readBigInt64LE() for signed 64-bit integers, readBigUInt64BE()/readBigUInt64LE() for unsigned. Returns BigInt type: const value = buffer.readBigInt64LE(offset). For compatibility with older Node versions, manually combine two 32-bit reads: const low = buffer.readUInt32LE(offset); const high = buffer.readUInt32LE(offset + 4); const value = high * 0x100000000 + low. Handle potential precision loss when converting BigInt to Number for values > Number.MAX_SAFE_INTEGER.",
      },
      {
        question: "How do you handle endianness in buffers?",
        solution:
          "Use LE (Little Endian) or BE (Big Endian) suffixed methods: readInt32LE() vs readInt32BE(), writeFloatBE() vs writeFloatLE(). Network protocols typically use big-endian (network byte order), while x86/ARM processors use little-endian. Check system endianness: os.endianness(). For cross-platform compatibility, always specify endianness explicitly. Example: buffer.writeInt32BE(value, 0) for network protocols, buffer.writeInt32LE(value, 0) for local storage. Use Buffer.swap16(), swap32(), swap64() to convert between endianness.",
      },
      {
        question: "How do you slice a buffer without copying memory?",
        solution:
          "Use buffer.subarray(start, end) which creates a new Buffer view sharing the same memory. Unlike buffer.slice(), subarray() doesn't copy data - it's a zero-copy operation. Changes to subarray affect original buffer: const view = buf.subarray(10, 20); view[0] = 255; // modifies original buf. For immutable slicing, use buffer.slice() which creates a copy. Be careful with memory retention - subarray keeps reference to entire original buffer, preventing GC. For large buffers with small slices, consider copying: buffer.slice(start, end).",
      },
      {
        question: "How do you compare two buffers in constant time?",
        solution:
          "Use Buffer.compare(buf1, buf2) or buf1.equals(buf2) for timing-safe comparison. These methods prevent timing attacks by always comparing all bytes. Never use === or manual byte-by-byte comparison for security-sensitive data as they may short-circuit. For custom constant-time comparison: let result = buf1.length ^ buf2.length; for (let i = 0; i < Math.max(buf1.length, buf2.length); i++) { result |= (buf1[i] || 0) ^ (buf2[i] || 0); } return result === 0. Buffer.compare returns -1, 0, or 1 for sorting, equals() returns boolean.",
      },
      {
        question: "How do you convert ArrayBuffer to Node.js Buffer?",
        solution:
          "Use Buffer.from(arrayBuffer) to create a copy, or Buffer.from(arrayBuffer, offset, length) for partial conversion. For zero-copy conversion (shares memory): const buffer = Buffer.from(arrayBuffer.slice()). To work with TypedArrays: Buffer.from(uint8Array.buffer, uint8Array.byteOffset, uint8Array.byteLength). For SharedArrayBuffer: Buffer.from(sharedArrayBuffer) creates a copy. Be aware that Buffer.from(arrayBuffer) creates new memory allocation; use arrayBuffer views for efficient memory sharing between Node.js and browser APIs.",
      },
      {
        question: "How do you use buffer.transcode for UTF conversions?",
        solution:
          "buffer.transcode(source, fromEnc, toEnc) converts between different character encodings efficiently. Supported encodings: 'ascii', 'utf8', 'utf16le', 'ucs2', 'base64', 'latin1', 'hex'. Example: const utf16Buffer = buffer.transcode(Buffer.from('hello', 'utf8'), 'utf8', 'utf16le'). More efficient than string conversion for large data: avoids intermediate string creation. Handle BOM (Byte Order Mark) manually for UTF-16: check first bytes \\xFF\\xFE or \\xFE\\xFF. For streaming transcoding, use transform streams with iconv-lite or similar libraries.",
      },
      {
        question: "How do you handle buffer overflow vulnerabilities?",
        solution:
          "Always validate buffer bounds before read/write operations: if (offset + length > buffer.length) throw new RangeError(). Use safe methods like readIntLE(offset, byteLength) with try-catch. Pre-allocate buffers with known size: Buffer.alloc(expectedSize). Implement bounds checking wrappers: function safeWrite(buf, value, offset) { if (offset >= buf.length) throw new Error('Overflow'); return buf.writeUInt32LE(value, offset); }. Use TypeScript for compile-time checks. Enable --check-bounds flag in V8. Sanitize external input sizes and validate protocol specifications.",
      },
      {
        question: "How do you stream processing of binary protocols?",
        solution:
          "Use Transform streams with internal buffering for incomplete messages: class ProtocolParser extends Transform { constructor() { super(); this._buffer = Buffer.alloc(0); } _transform(chunk, encoding, callback) { this._buffer = Buffer.concat([this._buffer, chunk]); while (this._buffer.length >= HEADER_SIZE) { const messageLength = this._buffer.readUInt32LE(0); if (this._buffer.length >= messageLength) { const message = this._buffer.slice(0, messageLength); this._buffer = this._buffer.slice(messageLength); this.push(parseMessage(message)); } else break; } callback(); } }. Handle partial reads, message boundaries, and backpressure.",
      },
      {
        question: "How do you pool buffers to reduce GC pressure?",
        solution:
          "Implement buffer pooling with reusable instances: class BufferPool { constructor(size, count) { this.buffers = Array.from({length: count}, () => Buffer.allocUnsafe(size)); this.available = [...this.buffers]; } get() { return this.available.pop() || Buffer.allocUnsafe(this.size); } release(buffer) { buffer.fill(0); this.available.push(buffer); } }. Use Buffer.allocUnsafeSlow() for large buffers to avoid internal pool fragmentation. Monitor with process.memoryUsage(). Consider weak references for automatic cleanup. Implement size-based pools for different buffer sizes.",
      },
      {
        question: "How do you detect incomplete UTF-8 sequences?",
        solution:
          "Check for incomplete multi-byte sequences at buffer boundaries. UTF-8 continuation bytes start with 10xxxxxx (0x80-0xBF). Implementation: function hasIncompleteUTF8(buffer) { const lastByte = buffer[buffer.length - 1]; if ((lastByte & 0x80) === 0) return false; // ASCII. let i = buffer.length - 1; while (i >= 0 && (buffer[i] & 0xC0) === 0x80) i--; // Find sequence start. const startByte = buffer[i]; const expectedLength = startByte >= 0xF0 ? 4 : startByte >= 0xE0 ? 3 : 2; return (buffer.length - i) < expectedLength; }. Use string_decoder.StringDecoder for proper streaming UTF-8 handling.",
      },
      {
        question: "How do you zero-fill sensitive data after use?",
        solution:
          "Use buffer.fill(0) to overwrite sensitive data immediately after use: function secureClear(buffer) { buffer.fill(0); }. For extra security, use crypto.randomFillSync() to overwrite with random data, then zero-fill: crypto.randomFillSync(buffer); buffer.fill(0). Create wrapper classes that auto-clear: class SecureBuffer extends Buffer { destructor() { crypto.randomFillSync(this); this.fill(0); } }. Use WeakRef with FinalizationRegistry for automatic cleanup. Note that GC may copy data during compaction - consider using external native modules for guaranteed secure deletion on critical applications.",
      },
    ],
  },
  {
    id: 22,
    topic: "Node",
    categories: "Senior",
    tags: [
      { name: "runtime", link: "" },
      { name: "javascript", link: "" },
      { name: "npm", link: "" },
      { name: "modules", link: "" },
      { name: "fundamentals", link: "" },
    ],
    prepareLink: "",
    externallinks: [],
    questions: [
      {
        question:
          "Walk through the 6 phases of the Node.js event loop in order.",
        solution:
          "The event loop has 6 phases: 1) Timers phase - executes callbacks for setTimeout/setInterval; 2) Pending callbacks phase - executes I/O callbacks deferred from previous loop; 3) Idle, prepare phase - internal use for libuv housekeeping; 4) Poll phase - fetches new I/O events, executes I/O callbacks, blocks if no timers/setImmediate pending; 5) Check phase - executes setImmediate callbacks; 6) Close callbacks phase - handles close events like socket.on('close'). Between each phase, Node processes the microtask queue (nextTick queue first, then Promises).",
      },
      {
        question: "Which phase executes setImmediate vs setTimeout(0) and why?",
        solution:
          "setImmediate executes in the Check phase (phase 5), while setTimeout(0) executes in the Timers phase (phase 1). The order depends on context: if called from within an I/O callback (like fs.readFile), setImmediate runs first since we're already past the Timers phase. If called from the main thread, setTimeout(0) typically runs first. This is because setTimeout(0) is clamped to 1ms minimum, and the timer scheduling happens before the Check phase. The execution order is: Timers → ... → Poll → Check, so context determines precedence.",
      },
      {
        question:
          "How does libuv decide when to use the thread-pool vs kernel async APIs?",
        solution:
          "libuv uses a decision matrix based on operation type and platform capabilities. DNS lookups, file system operations, and CPU-intensive crypto always use the thread pool. Network I/O uses kernel async APIs: epoll on Linux, kqueue on macOS/BSD, IOCP on Windows. For file I/O, some platforms like Linux lack true async file APIs, so libuv falls back to thread pool simulation. The decision is made at compile time based on feature detection (HAVE_EPOLL, HAVE_KQUEUE) and runtime based on operation type. Thread pool provides fallback when kernel async isn't available or suitable.",
      },
      {
        question:
          "Explain how epoll/kqueue are leveraged by libuv on *nix systems.",
        solution:
          "libuv uses epoll (Linux) and kqueue (macOS/BSD) as the core I/O multiplexing mechanism. These systems allow monitoring multiple file descriptors with a single system call. libuv maintains an event loop that calls epoll_wait/kevent to block until I/O events are ready. When events arrive, libuv dispatches them to appropriate callbacks. Edge-triggered mode is used for efficiency - events fire only on state changes. libuv handles the complexity of different platforms by abstracting epoll/kqueue behind a unified uv_poll interface, managing file descriptor registration, and handling EAGAIN/EWOULDBLOCK scenarios gracefully.",
      },
      {
        question: "What is the UV_THREADPOOL_SIZE default and maximum value?",
        solution:
          "UV_THREADPOOL_SIZE defaults to 4 threads and has a maximum value of 1024. This environment variable must be set before the first libuv operation (before require() of any native modules). The thread pool is shared across all async operations that require threads: fs operations, DNS lookups, crypto.pbkdf2, zlib compression, etc. Setting it too high can cause memory pressure and context switching overhead. Setting it too low can create bottlenecks. Common production values are 8-16 for I/O bound applications, or higher (32-128) for CPU-intensive crypto operations.",
      },
      {
        question:
          "Why can long CPU work in crypto.pbkdf2 still block the loop even with a thread-pool?",
        solution:
          "crypto.pbkdf2 doesn't block the event loop itself since it runs in the thread pool, but it can starve other thread pool operations. If UV_THREADPOOL_SIZE=4 and you run 10 concurrent pbkdf2 operations, 6 will queue up waiting for threads. More importantly, pbkdf2 is CPU-intensive and can saturate all CPU cores, causing system-wide slowdown affecting the main thread. Additionally, if the result processing in the callback is heavy, it runs on the main thread. The actual blocking happens when: 1) Thread pool exhaustion delays other async ops, 2) CPU saturation affects main thread scheduling, 3) Callback processing is synchronous.",
      },
      {
        question:
          "Describe how V8 handles incremental GC while the loop is running.",
        solution:
          "V8 uses incremental marking to spread garbage collection work across multiple event loop cycles. Instead of stop-the-world GC, V8 performs small incremental marking steps during idle time or between JavaScript execution. The process: 1) Initial marking phase marks root objects; 2) Incremental marking spreads object graph traversal across event loop iterations; 3) Final marking completes the process; 4) Sweeping happens concurrently. V8 uses write barriers to track object changes during incremental marking. The --max-old-space-size flag controls heap size, and --gc-interval controls GC frequency. This prevents long GC pauses that would block the event loop.",
      },
      {
        question: "How can you trace every event-loop delay in production?",
        solution:
          "Use multiple approaches for comprehensive monitoring: 1) perf_hooks.monitorEventLoopDelay() provides histogram data of loop delays; 2) Custom timing with setImmediate timestamps to measure lag; 3) --trace-events-enabled=v8.gc,node.async_hooks for detailed traces; 4) clinic.js tools for flamegraphs and event loop visualization; 5) Custom metrics using process.hrtime.bigint() in setImmediate callbacks; 6) APM tools like New Relic or DataDog; 7) prometheus-gc-stats for GC metrics; 8) 0x profiler for CPU flame graphs. Combine high-resolution timestamps with statistical sampling to avoid observer effect overhead.",
      },
      {
        question:
          "Explain the cost of a single nextTick micro-task vs a Promise micro-task.",
        solution:
          "nextTick has slightly lower overhead than Promises due to simpler queuing mechanism. nextTick uses a simple array-based queue in Node.js C++ code, while Promises use V8's microtask queue with additional Promise state machinery. Performance difference: nextTick ~10-20ns per operation, Promise.resolve().then() ~15-25ns. However, nextTick has higher priority and can starve I/O if used recursively. Memory-wise, nextTick callbacks are stored directly, while Promises create additional objects (Promise instance, fulfillment records). The real cost comes from queue processing order: nextTick queue is fully drained before Promise microtasks, potentially causing starvation.",
      },
      {
        question:
          "How does Node keep track of ref/unref for event-loop keep-alive?",
        solution:
          "Node maintains reference counters in libuv handles to determine if the event loop should stay alive. Each active handle (timers, I/O, etc.) has a ref count. uv_ref() increments, uv_unref() decrements. The event loop exits when ref count reaches zero. Internally, each handle stores an is_referenced flag. Common patterns: server.unref() allows graceful shutdown, timer.unref() prevents keeping process alive. The ref counting happens at the libuv level, not V8. process.exit() bypasses this mechanism. Uncaught exceptions also bypass ref counting and force exit.",
      },
      {
        question: "What is the idle, prepare phase used for internally?",
        solution:
          "The idle and prepare phases are internal libuv phases for housekeeping tasks. Idle phase runs when the loop has no other work - it's used for low-priority maintenance like memory pool cleanup, handle maintenance, and internal bookkeeping. Prepare phase runs before polling for I/O and is used to set up polling parameters, adjust timeouts, and prepare internal state. These phases are not exposed to JavaScript and typically run very quickly. They ensure the event loop maintains optimal performance by handling background tasks that don't require immediate attention but are necessary for long-term stability.",
      },
      {
        question:
          "Compare io_uring vs libuv's traditional AIO on Linux ≥ 5.19.",
        solution:
          "io_uring provides true asynchronous I/O with shared ring buffers between kernel and userspace, eliminating system call overhead. Benefits: 1) Zero-copy operations, 2) Batch submission/completion, 3) True async file I/O (libuv uses thread pool), 4) Lower CPU usage, 5) Higher throughput. libuv's traditional approach uses epoll for network I/O and thread pools for file I/O. io_uring can handle both uniformly with true async. Performance gains: 20-40% improvement in I/O throughput, reduced context switching. However, io_uring support in Node.js is limited - experimental flags exist but full integration requires major libuv changes. Production adoption is still emerging due to kernel version requirements.",
      },
      {
        question:
          "How would you patch Node core to add a new custom event-loop phase?",
        solution:
          "Adding a custom phase requires modifications at multiple levels: 1) libuv level: modify uv_run() in src/unix/core.c to add new phase enum and handler; 2) Node.js level: expose the phase in src/node.cc and create JavaScript bindings; 3) Add phase-specific handle type and callback management; 4) Update loop iteration logic to call new phase at correct position; 5) Implement uv_custom_phase_start/stop functions; 6) Add JavaScript API in lib/timers.js style module; 7) Update documentation and tests. Key considerations: maintain ABI compatibility, ensure proper handle lifecycle, avoid breaking existing phase timing assumptions, handle edge cases like process exit during custom phase.",
      },
      {
        question: "Explain how timers are implemented at the C++ level.",
        solution:
          "Node.js timers use a hybrid approach combining JavaScript scheduling with libuv timer handles. Implementation: 1) TimerWrap class in src/timer_wrap.cc wraps libuv uv_timer_t; 2) JavaScript TimersList maintains sorted linked list of timers; 3) Single libuv timer handle represents nearest timeout; 4) When timer fires, it processes all expired timers from JS list; 5) Heap-based priority queue optimizes insertion/deletion; 6) Timer handles are pooled to reduce allocation overhead; 7) uv_timer_start/stop manage actual kernel timers. This approach minimizes system timer usage while providing JavaScript-level timer management flexibility.",
      },
      {
        question: "How do Promises integrate with the microtask queue in V8?",
        solution:
          "Promises integrate through V8's built-in microtask mechanism. When a Promise resolves/rejects, V8 automatically enqueues continuation callbacks (then/catch handlers) into its internal microtask queue. Process: 1) Promise resolution triggers V8::EnqueueMicrotask; 2) V8 maintains separate microtask queue from event loop; 3) Node.js processes microtasks between event loop phases via v8::MicrotasksScope::PerformCheckpoint; 4) Native Promises use V8's optimized microtask implementation; 5) Custom thenables still work but with overhead. V8 handles Promise state transitions, callback scheduling, and exception propagation internally for optimal performance.",
      },
      {
        question: "Why does a nested nextTick queue starve I/O?",
        solution:
          "nextTick has the highest priority in the microtask processing order and must be fully drained before any event loop phase continues. If a nextTick callback schedules another nextTick, it creates an infinite recursion that prevents the event loop from reaching the Poll phase where I/O callbacks execute. The processing order: 1) Drain entire nextTick queue, 2) Process Promise microtasks, 3) Continue to next event loop phase. Recursive nextTick effectively creates a busy loop that never yields control back to I/O operations. Node.js has warnings (process.maxTickDepth in older versions) and limits to prevent this, but it's still possible to create I/O starvation.",
      },
      {
        question:
          "How does AsyncResource track async context across native boundaries?",
        solution:
          "AsyncResource provides async context propagation through async_hooks mechanism. Implementation: 1) Each AsyncResource instance has unique asyncId; 2) async_hooks.executionAsyncId() tracks current context; 3) Native operations store/restore context through triggerAsyncId; 4) AsyncResource.runInAsyncScope() ensures proper context binding; 5) C++ AsyncWrap class handles native boundary transitions; 6) Context flows: JS → Native → Callback → JS with preserved asyncId chain. This enables async local storage, error tracking, and performance monitoring across native module boundaries. The overhead is minimal when no hooks are active.",
      },
      {
        question:
          "What is the Inspector protocol used by --inspect and how does it hook V8?",
        solution:
          "The Inspector protocol is Chrome DevTools Protocol implementation for Node.js debugging. Architecture: 1) inspector_agent.cc creates WebSocket server on specified port; 2) V8 Inspector API provides debugging hooks through v8_inspector::V8Inspector; 3) Protocol messages (JSON-RPC) handle breakpoints, profiling, heap snapshots; 4) V8 embedder API allows setting breakpoints, stepping, variable inspection; 5) inspector_socket.cc handles WebSocket communication; 6) Main thread integration through inspector_io.cc message pump. The inspector hooks into V8's debug interface, allowing real-time code manipulation, performance profiling, and memory analysis without requiring separate debug builds.",
      },
      {
        question:
          "Explain how the C++ MakeCallback bridges JS land and libuv handles.",
        solution:
          "MakeCallback is the crucial bridge between C++ async operations and JavaScript callbacks. Process: 1) Native async operations store JavaScript callback handles; 2) When libuv operation completes, C++ code calls MakeCallback with stored callback; 3) MakeCallback ensures proper V8 context, handles exceptions, and manages async_hooks; 4) It creates proper call stack, processes domain/async context, and handles uncaught exceptions; 5) After callback execution, it processes nextTick and Promise microtasks; 6) Exception handling includes domain error propagation and process exit on uncaught exceptions. This mechanism ensures JavaScript callbacks execute in correct context with proper error handling and async tracking.",
      },
      {
        question:
          "How is libuv's thread-pool reused across multiple Node processes?",
        solution:
          "libuv's thread pool is NOT shared across processes - each Node.js process has its own isolated thread pool. The thread pool is created once per process in uv_threadpool_init() and destroyed on process exit. Multi-process scenarios: 1) Cluster module creates separate thread pools per worker; 2) Child processes spawn independent thread pools; 3) Thread pool size is per-process, controlled by UV_THREADPOOL_SIZE per process; 4) No shared memory or cross-process synchronization; 5) Each process manages its own thread lifecycle and work queue. This isolation prevents cross-process interference but means total thread count scales with process count (4 × 8 processes = 32 threads default).",
      },
      {
        question: "How do you measure loop idle % vs loop utilization %?",
        solution:
          "Measure event loop metrics using multiple approaches: 1) Loop utilization: (active_time / total_time) * 100 using perf_hooks.performance.eventLoopUtilization(); 2) Loop idle: 100 - utilization%; 3) Custom measurement: track hrtime between setImmediate callbacks to calculate delays; 4) perf_hooks.monitorEventLoopDelay() provides histogram of delays; 5) Active handles via process._getActiveHandles().length; 6) GC impact via v8.getHeapStatistics(); Implementation: const elu = performance.eventLoopUtilization(); console.log(`Utilization: ${(elu.utilization * 100).toFixed(2)}%`); Use sampling intervals to avoid measurement overhead affecting results.",
      },
      {
        question:
          "Describe the snapshot deserialization process when Node starts.",
        solution:
          "Node.js uses V8 snapshots for faster startup by pre-serializing built-in JavaScript code. Process: 1) Build time: mksnapshot tool serializes built-in modules into snapshot.bin; 2) Startup: V8::Initialize() loads snapshot blob into heap; 3) Snapshot contains pre-compiled bytecode, built-in objects, and context state; 4) Deserialization recreates JavaScript objects, prototypes, and global context; 5) Native modules still require dynamic loading and compilation; 6) Snapshot isolation ensures each isolate gets clean state. Benefits: ~20-30% faster startup time by avoiding compilation of core modules. Custom snapshots possible with --build-snapshot flag for application-specific optimization.",
      },
      {
        question:
          "How does source-map-support hook into V8 stack trace generation?",
        solution:
          "source-map-support intercepts V8's stack trace generation through Error.prepareStackTrace override. Implementation: 1) Overrides Error.prepareStackTrace to process CallSite objects; 2) For each CallSite, extracts filename, line, column information; 3) Loads and caches source maps using source-map library; 4) Maps generated positions back to original source positions; 5) Reconstructs stack trace with original file names and line numbers; 6) Handles inline sources, webpack://, and file:// protocols; 7) Caches parsed source maps for performance. The hook executes only when stack traces are accessed, minimizing runtime overhead while providing accurate debugging information for transpiled code.",
      },
      {
        question:
          "What is TracingController in V8 and how do you add custom trace events?",
        solution:
          "TracingController is V8's built-in performance tracing system that generates Chrome DevTools compatible trace events. It's exposed in Node.js via the 'trace_events' module. To add custom events: 1) Enable tracing with --trace-events-enabled flag, 2) Use trace_events.createTracing() to create a tracer, 3) Add custom events with TRACE_EVENT_BEGIN/END macros in C++ addons or performance.mark() in JS, 4) Events appear in chrome://tracing. Custom C++ addon example: TRACE_EVENT_BEGIN0('node', 'CustomOperation'); // your code; TRACE_EVENT_END0('node', 'CustomOperation'). JS approach uses Performance Timeline API with performance.mark('start') and performance.measure('operation', 'start').",
      },
      {
        question: "Explain the zero-cost async stack trace proposal status.",
        solution:
          "Zero-cost async stack traces aim to provide complete stack traces across async boundaries without runtime overhead when not debugging. Current status: V8 implemented async stack traces but with performance cost. The 'zero-cost' proposal involves: 1) Lazy stack trace construction only when Error.stack is accessed, 2) Async context tracking via PromiseHooks without storing full stacks, 3) Reconstructing traces on-demand using async IDs and source maps. Node.js has partial implementation via AsyncLocalStorage and async_hooks. Full zero-cost implementation blocked by need for standardized async context propagation across all async primitives. Current workaround: use --async-stack-traces flag (has overhead) or async_hooks for custom tracking.",
      },
      {
        question: "How does WASI integrate with libuv file descriptors?",
        solution:
          "WASI (WebAssembly System Interface) integrates with Node.js through a compatibility layer that maps WASI file descriptors to libuv handles. Integration works as follows: 1) WASI runtime maintains fd table mapping WASI fds to Node.js streams/files, 2) WASI file operations (fd_read, fd_write) are translated to libuv operations (uv_fs_read, uv_fs_write), 3) Node.js WASI implementation uses preopened directories concept - WASI modules can only access explicitly granted filesystem paths, 4) Stdio fds (0,1,2) map to process.stdin/stdout/stderr streams, 5) Socket operations require capability-based security model. Example: wasi.start(wasmModule, { preopens: { '/tmp': '/host/tmp' }, stdio: [process.stdin, process.stdout, process.stderr] }).",
      },
      {
        question: "What is libuv's back-pressure mechanism for TCP writes?",
        solution:
          "libuv implements back-pressure for TCP writes through write queue management and flow control: 1) Each TCP handle maintains a write_queue of pending uv_write_t requests, 2) When TCP send buffer is full, writes queue up in memory, 3) Back-pressure signals: write callbacks receive UV_EAGAIN or queue size exceeds limits, 4) Application should pause writing when uv_stream_get_write_queue_size() exceeds threshold (typically 64KB), 5) Resume writing on 'drain' equivalent (write callback with status 0), 6) libuv automatically handles TCP window scaling and congestion control via OS stack. Node.js streams layer adds additional back-pressure via highWaterMark - stream.write() returns false when internal buffer exceeds limit, application should wait for 'drain' event.",
      },
      {
        question:
          "Describe cross-compilation steps to build Node for ARM64 from x64.",
        solution:
          "Cross-compile Node.js for ARM64 from x64: 1) Install cross-compilation toolchain: apt install gcc-aarch64-linux-gnu g++-aarch64-linux-gnu, 2) Set environment variables: export CC=aarch64-linux-gnu-gcc CXX=aarch64-linux-gnu-g++ AR=aarch64-linux-gnu-ar STRIP=aarch64-linux-gnu-strip, 3) Configure Node build: ./configure --dest-cpu=arm64 --cross-compiling --without-snapshot (V8 snapshots require native execution), 4) Build: make -j$(nproc), 5) For dependencies with native modules, use npm rebuild --arch=arm64, 6) Alternative: use Docker with multi-arch support: docker buildx build --platform linux/arm64. Challenges: V8 snapshot generation requires running on target arch, some native modules need separate ARM64 compilation, test execution requires ARM64 environment or qemu emulation.",
      },
      {
        question: "How do you hot-patch a running Node binary without restart?",
        solution:
          "Hot-patching Node.js requires runtime code replacement techniques: 1) Module-level hot reload: delete require.cache entries and re-require modules, use tools like nodemon or hot-module-replacement, 2) V8 live code swapping: use --allow-natives-syntax flag with %DebugPrint() and %OptimizeFunctionOnNextCall(), limited to function replacement, 3) Dynamic linking approach: load new code as native addon (.node file), unload old addon, requires C++ wrapper, 4) Container orchestration: blue-green deployment with load balancer switching, 5) Advanced: use ptrace to inject new code into running process (complex, Linux-only), 6) Production approach: graceful shutdown with connection draining, start new process, update load balancer upstream. True zero-downtime patching extremely complex due to V8's JIT compiler and memory layout.",
      },
      {
        question:
          "Explain how Electron reuses the Node event loop in its renderer process.",
        solution:
          "Electron integrates Node.js event loop with Chromium's message loop in renderer processes: 1) Renderer process runs both V8 isolate for web content and Node.js context, 2) Electron patches libuv to integrate with Chromium's MessageLoop instead of running separate event loop, 3) Node.js async operations (timers, I/O) are scheduled through Chromium's task scheduler, 4) Integration achieved via uv_set_loop_wakeup_fd() to wake Chromium loop when libuv has pending work, 5) Both DOM events and Node.js callbacks execute on same thread, avoiding context switching, 6) Process isolation: main process uses full Node.js, renderer processes can disable Node integration for security, 7) IPC between processes via Electron's ipcMain/ipcRenderer using Chromium's IPC system built on top of Node.js streams.",
      },
      {
        question:
          "Compare Node cluster module vs PM2 cluster mode at the syscall level.",
        solution:
          "Node cluster vs PM2 at syscall level: Node cluster: 1) Uses fork() syscall to create worker processes, 2) Master process binds to port with bind() and listen(), 3) Workers inherit socket fd via process.send() IPC using socketpair() syscalls, 4) Load balancing via SO_REUSEPORT (Linux 3.9+) or round-robin scheduling in master, 5) IPC uses unnamed Unix domain sockets (socketpair), 6) Worker death detected via waitpid() on SIGCHLD. PM2 cluster: 1) PM2 daemon forks worker processes, adds process monitoring layer, 2) Uses same SO_REUSEPORT mechanism or proxy mode, 3) Additional syscalls for process monitoring: kill(pid, 0) for health checks, getrusage() for resource monitoring, 4) Log rotation via rename() and SIGUSR2, 5) More overhead due to additional monitoring layer but provides automatic restarts, log management, and deployment features.",
      },
      {
        question: "How does SO_REUSEPORT on Linux improve cluster performance?",
        solution:
          "SO_REUSEPORT enables multiple processes to bind to same IP:port, improving cluster performance through kernel-level load balancing: 1) Each worker process calls setsockopt(sock, SOL_SOCKET, SO_REUSEPORT, &optval, sizeof(optval)), 2) Kernel maintains separate accept queues per socket, distributing connections via hash(src_ip, src_port, dst_ip, dst_port) % num_workers, 3) Benefits: eliminates thundering herd problem (all workers waking on new connection), removes serialization bottleneck of single accept queue, provides better CPU cache locality, 4) Performance improvements: ~40% better throughput vs traditional accept() serialization, lower latency variance, better scalability with CPU cores, 5) Limitations: connection distribution not perfectly even with varying connection lifetimes, requires Linux 3.9+ kernel, hash collision can cause load imbalance.",
      },
      {
        question:
          "Explain Nginx upstream hash vs Node sticky-session strategies.",
        solution:
          "Nginx upstream hash vs Node sticky sessions for load balancing: Nginx hash method: 1) Uses consistent hashing: upstream backend { hash $remote_addr consistent; }, 2) Routes requests based on client IP/session ID hash to same backend, 3) Backend selection: hash(key) % num_backends, with consistent hashing minimizing rehashing on backend changes, 4) Advantages: stateless load balancer, good distribution, fault tolerance. Node sticky sessions: 1) Session affinity using session store or in-memory sessions, 2) Approaches: cookie-based routing (sticky-session package), Redis session store for shared state, JWT tokens with server hints, 3) Load balancer must support session persistence (ip_hash in nginx), 4) Trade-offs: Nginx hash provides better load distribution but can't handle stateful applications, Node sticky sessions enable stateful apps but create hot spots and complicate scaling. Hybrid approach: use Redis for session storage with any load balancing algorithm.",
      },
      {
        question:
          "How do you implement blue-green deployments with Kubernetes and Node?",
        solution:
          'Blue-green deployment with Kubernetes and Node.js: 1) Setup: Create two identical environments (blue/green) with separate Deployments and Services, 2) Deployment manifest: spec.selector.matchLabels.version: blue/green to distinguish environments, 3) Service routing: update Service selector to switch traffic, 4) Implementation steps: deploy new version to inactive environment (green), run smoke tests against green environment, gradually shift traffic using Ingress weights or update Service selector, monitor metrics and health checks, rollback by switching Service selector back to blue, 5) Advanced: use Istio for traffic splitting with VirtualService weights, implement canary deployment with weighted routing, 6) Node.js considerations: implement graceful shutdown handling SIGTERM, health check endpoints for liveness/readiness probes, connection draining before process termination, 7) Example: kubectl patch service myapp -p \'{"spec":{"selector":{"version":"green"}}}\'.',
      },
      {
        question:
          "Describe graceful shutdown with SIGTERM propagation across workers.",
        solution:
          "Graceful shutdown with SIGTERM propagation in Node.js clusters: 1) Master process handles SIGTERM: process.on('SIGTERM', gracefulShutdown), 2) Shutdown sequence: stop accepting new connections (server.close()), signal workers to shutdown via process.kill(worker.process.pid, 'SIGTERM'), wait for workers to finish with timeout, force kill remaining workers with SIGKILL, 3) Worker shutdown: process.on('SIGTERM', async () => { server.close(); await drainConnections(); process.exit(0); }), 4) Connection draining: track active connections, set keep-alive timeout to 0, wait for existing requests to complete, 5) Advanced patterns: use cluster.disconnect() for clean IPC shutdown, implement health check endpoint returning 503 during shutdown, use process.send() for custom shutdown coordination, 6) Kubernetes integration: configure terminationGracePeriodSeconds, implement preStop hook for connection draining, monitor pod termination events.",
      },
      {
        question:
          "How do you drain connections before killing a worker process?",
        solution:
          "Connection draining before worker termination: 1) Track active connections: const connections = new Set(); server.on('connection', conn => connections.add(conn)); conn.on('close', () => connections.delete(conn)), 2) Implement draining: server.close() stops accepting new connections, set conn.setTimeout() to force close stale connections, iterate through active connections calling conn.end() or conn.destroy(), 3) HTTP keep-alive handling: set response headers 'Connection: close' to prevent connection reuse, reduce keep-alive timeout server.keepAliveTimeout = 1000, 4) WebSocket connections: send close frame before destroying, implement graceful disconnect in application logic, 5) Advanced draining: use server.getConnections() to monitor count, implement exponential backoff for forced closure, track request completion vs connection lifetime, 6) Production pattern: const gracefulShutdown = () => { server.close(); setTimeout(() => connections.forEach(c => c.destroy()), DRAIN_TIMEOUT); }.",
      },
      {
        question:
          "Explain health-check patterns for Kubernetes liveness/readiness probes.",
        solution:
          "Kubernetes health check patterns for Node.js: 1) Liveness probe: checks if container is running and should restart if failing, implement simple endpoint: app.get('/health/live', (req, res) => res.status(200).send('OK')), checks basic process health, 2) Readiness probe: checks if pod can serve traffic, more comprehensive checks: database connectivity, downstream service health, memory/CPU thresholds, 3) Implementation patterns: separate endpoints for different checks, include dependency health in readiness only, use shallow vs deep health checks, 4) Advanced patterns: circuit breaker integration returning 503 when dependencies failing, gradual health degradation with warning states, health check caching to avoid overwhelming dependencies, 5) Kubernetes config: livenessProbe: { httpGet: { path: '/health/live', port: 3000 }, periodSeconds: 10 }, readinessProbe: { httpGet: { path: '/health/ready', port: 3000 }, periodSeconds: 5 }, 6) Monitoring: export health check metrics to Prometheus, track probe failure rates and response times.",
      },
      {
        question:
          "How do you hot-reload TLS certificates without dropping connections?",
        solution:
          "Hot-reload TLS certificates without dropping connections: 1) Node.js approach: use tls.createSecureContext() to create new context, update server with server.setSecureContext(newContext), existing connections continue with old certificates, new connections use updated certificates, 2) Implementation: watch certificate files with fs.watch(), reload on change: const newContext = tls.createSecureContext({ key: newKey, cert: newCert }); httpsServer.setSecureContext(newContext), 3) Advanced patterns: validate certificates before applying (openssl verify), implement certificate rotation with overlap period, use SNI (Server Name Indication) for multiple certificates, 4) Production considerations: atomic file updates to prevent partial reads, certificate chain validation, OCSP stapling updates, 5) Load balancer approach: update certificates on load balancer (nginx, haproxy), use certificate management tools (cert-manager in Kubernetes), 6) Example with express-https: const server = https.createServer(options, app); setInterval(() => { if (certChanged()) server.setSecureContext(loadNewCerts()); }, 60000).",
      },
      {
        question:
          "What are the trade-offs of gRPC load-balancing vs HTTP/1 keep-alive?",
        solution:
          "gRPC load-balancing vs HTTP/1 keep-alive trade-offs: gRPC: 1) Connection pooling: maintains persistent HTTP/2 connections with multiplexing, single connection handles multiple concurrent RPCs, 2) Load balancing challenges: sticky connections to single backend, client-side load balancing required (grpc.load_balancing_policy), server-side LB sees single connection, 3) Benefits: lower latency (no connection setup), binary protocol efficiency, streaming support, 4) Solutions: use service mesh (Istio, Linkerd) for L7 load balancing, implement custom resolver for backend discovery. HTTP/1 keep-alive: 1) Connection reuse within single client, but each request is sequential, 2) Load balancer friendly: each request can route to different backend, natural request distribution, 3) Limitations: head-of-line blocking, connection overhead for concurrent requests, 4) Performance: requires connection pools for concurrency (agents in Node.js). Summary: gRPC better for high-throughput, low-latency services but needs sophisticated load balancing; HTTP/1 simpler load balancing but lower efficiency for high-concurrency scenarios.",
      },
      {
        question:
          "How does SO_ATTACH_REUSEPORT_CBPF filter packets in a Node cluster?",
        solution:
          "SO_ATTACH_REUSEPORT_CBPF enables custom packet filtering for SO_REUSEPORT sockets using Classic BPF programs: 1) Mechanism: attach BPF program to socket with setsockopt(sock, SOL_SOCKET, SO_ATTACH_REUSEPORT_CBPF, &bpf_prog, sizeof(bpf_prog)), 2) BPF program receives packet metadata and returns hash value to determine which socket receives packet, 3) Use cases: custom load balancing algorithms (weighted round-robin, least connections), application-aware routing based on packet contents, session affinity based on custom headers, 4) Implementation: write BPF assembly or use BCC/eBPF, program inspects packet headers (IP, TCP, application data), returns hash % num_sockets, 5) Node.js integration: requires native addon to call setsockopt with BPF program, limited to platforms supporting BPF (Linux), 6) Example use case: route HTTP requests with specific User-Agent to dedicated workers, hash based on custom application session ID rather than IP:port tuple. Advanced alternative: use eBPF with SO_ATTACH_REUSEPORT_EBPF for more sophisticated filtering with maps and helper functions.",
      },
      {
        question:
          "Describe HTTP/2 connection coalescing impact on load balancer routing.",
        solution:
          "HTTP/2 connection coalescing affects load balancer routing by reusing connections across different hostnames: 1) Coalescing rules: same IP address, compatible TLS certificates (SAN or wildcard), same HTTP/2 settings, 2) Impact on load balancing: client may reuse connection to api1.example.com for requests to api2.example.com if they resolve to same IP, bypasses load balancer's per-request routing decisions, creates uneven load distribution, 3) Problems: sticky sessions to single backend server, hot spots when clients coalesce many services, L7 load balancing ineffective for coalesced connections, 4) Mitigation strategies: use different IP addresses for different services, configure different TLS certificates per service (prevents coalescing), implement client-side load balancing awareness, 5) Load balancer considerations: proxy protocols like HAProxy can handle HTTP/2 multiplexing, use H2 load balancing at stream level rather than connection level, 6) Monitoring: track connection reuse ratios, monitor backend load distribution, implement circuit breakers per logical service even on shared connections.",
      },
      {
        question:
          "How do you roll back a canary release based on Prometheus metrics?",
        solution:
          "Automated canary rollback using Prometheus metrics: 1) Metrics collection: instrument application with custom metrics (error rate, latency percentiles, business KPIs), use labels to distinguish canary vs stable versions, 2) Prometheus queries: rate(http_requests_total{version='canary',status=~'5..'}[5m]) for error rate, histogram_quantile(0.95, rate(http_request_duration_seconds_bucket{version='canary'}[5m])) for p95 latency, 3) Alerting rules: groups: - name: canary-alerts; rules: - alert: CanaryHighErrorRate; expr: error_rate_canary > error_rate_stable * 1.5, 4) Rollback automation: use Prometheus Alertmanager webhooks to trigger rollback, integrate with deployment tools (ArgoCD, Flux, kubectl), 5) Implementation: webhook receiver updates Kubernetes deployment or Istio traffic weights, gradual traffic reduction before full rollback, 6) Advanced patterns: statistical significance testing (t-test) before rollback, multi-dimensional monitoring (different user segments), automatic traffic shifting based on SLI violations, 7) Example: if canary_error_rate > 5% OR canary_p95_latency > stable_p95_latency * 1.2 for 2 minutes, trigger immediate rollback to 0% canary traffic.",
      },
      {
        question:
          "Explain circuit-breaker algorithms (Netflix Hystrix vs Semaphore).",
        solution:
          "Circuit breaker algorithms comparison: Netflix Hystrix: 1) Three states: CLOSED (normal), OPEN (failing fast), HALF-OPEN (testing recovery), 2) State transitions: CLOSED→OPEN when failure rate exceeds threshold over time window, OPEN→HALF-OPEN after timeout period, HALF-OPEN→CLOSED/OPEN based on test requests, 3) Implementation: sliding window for failure rate calculation, separate thread pools for isolation, fallback mechanisms, 4) Advantages: complete isolation, detailed metrics, battle-tested in production. Semaphore pattern: 1) Uses counting semaphore to limit concurrent requests, no separate thread pools, 2) Fail fast when semaphore permits exhausted, simpler state management, 3) Implementation: acquire permit before request, release after completion, timeout handling, 4) Advantages: lower overhead, no thread pool management, better for high-throughput scenarios. Trade-offs: Hystrix provides better isolation but higher overhead and complexity; Semaphore is simpler and faster but offers less protection. Modern alternatives: resilience4j (Java), brakes (Node.js), implement exponential backoff, bulkhead pattern for resource isolation. Key metrics: failure rate, request volume, response time percentiles, circuit breaker state transitions.",
      },
      {
        question: "How do you scale WebSocket connections beyond 65k ports?",
        solution:
          "Scaling WebSocket connections beyond 65k port limit: 1) Port limitation: client-side ephemeral port range ~28k-65k (37k ports), server can handle millions of connections on single port, 2) Client-side solutions: use multiple source IPs (bind to specific interfaces), implement connection pooling with multiplexing, use proxy servers to distribute connections, 3) Server architecture: single server can handle 100k+ connections with proper tuning (increase ulimit, optimize kernel parameters), use cluster mode with SO_REUSEPORT for multiple processes, 4) Infrastructure scaling: load balancer distributes connections across multiple servers, use sticky sessions for stateful connections, implement horizontal sharding by user ID or room, 5) Advanced techniques: use HTTP/2 Server Push or WebRTC for alternative real-time communication, implement custom protocol over raw TCP sockets, 6) System tuning: increase net.core.somaxconn, net.ipv4.tcp_max_syn_backlog, fs.file-max, optimize TCP window scaling and buffer sizes, 7) Monitoring: track connection counts per server, monitor file descriptor usage, alert on approaching limits.",
      },
      {
        question: "Describe Anycast DNS pitfalls when scaling Node globally.",
        solution:
          "Anycast DNS pitfalls for global Node.js scaling: 1) Route instability: network path changes can redirect users to different data centers mid-session, causes session loss in stateful applications, BGP route flapping affects traffic distribution, 2) Health check challenges: DNS resolvers cache responses, unhealthy nodes continue receiving traffic until TTL expires, different health check mechanisms needed at DNS vs application layer, 3) Load distribution issues: traffic follows network topology not actual server capacity, geographic proximity doesn't guarantee best performance, CDN PoPs may have vastly different capacities, 4) Session management: sticky sessions break with route changes, need distributed session storage (Redis cluster), implement session replication across regions, 5) Mitigation strategies: use short DNS TTL (60s) balanced against resolver caching, implement application-level health checks with graceful degradation, use GeoDNS with Anycast as fallback, 6) Monitoring: track route consistency from different vantage points, monitor cross-region session replication lag, implement client-side retry logic for route changes, 7) Alternative: use CDN with intelligent routing instead of pure Anycast.",
      },
      {
        question: "How do you rate-limit per IP in a distributed cluster?",
        solution:
          'Distributed rate limiting per IP across cluster: 1) Centralized approach: use Redis with sliding window or token bucket algorithm, implement lua scripts for atomic operations: EVAL \'local current = redis.call("INCR", KEYS[1]); if current == 1 then redis.call("EXPIRE", KEYS[1], ARGV[1]) end; return current\' 1 ip:192.168.1.1 60, 2) Distributed consensus: use consistent hashing to assign IP ranges to nodes, each node maintains local rate limits for assigned IPs, handle node failures with rehashing, 3) Hybrid approach: local rate limiting with eventual consistency, periodically sync counts to central store, use circuit breaker when central store unavailable, 4) Advanced algorithms: distributed token bucket with leader election, gossip protocol for count propagation, consensus algorithms (Raft) for critical rate limits, 5) Implementation considerations: handle clock skew between nodes, implement backpressure when rate limits exceeded, use approximate algorithms (HyperLogLog) for memory efficiency, 6) Production patterns: combine with reverse proxy rate limiting (nginx rate limit module), implement different tiers (per-IP, per-user, global), use sliding window log for precise counting vs fixed window for performance.',
      },
      {
        question: "What is TCP Fast Open and how do you enable it in Node?",
        solution:
          "TCP Fast Open (TFO) reduces connection establishment latency by sending data in SYN packet: 1) Mechanism: client includes data in SYN packet with TFO cookie, server validates cookie and processes data immediately, eliminates one RTT for subsequent connections, 2) Cookie exchange: first connection follows normal 3-way handshake, server generates and sends TFO cookie, client stores cookie for future connections, 3) Node.js enablement: requires kernel support (Linux 3.7+), enable via sysctl: net.ipv4.tcp_fastopen = 3 (client + server), 4) Application changes: server-side: net.createServer().listen(port, { fastOpen: true }), client-side: socket.connect({ fastOpen: true, fastOpenData: Buffer.from('GET / HTTP/1.1\\r\\n') }), 5) Limitations: only first request can use TFO, firewall/NAT may drop SYN with data, security concerns with replay attacks, 6) Performance benefits: 15-30% latency reduction for short-lived connections, most beneficial for HTTP request-response patterns, 7) Monitoring: track TFO success rates via netstat -s | grep -i fastopen, implement fallback for TFO failures, measure connection establishment times.",
      },
      {
        question: "How do you benchmark cluster performance using autocannon?",
        solution:
          "Use autocannon with cluster-specific targeting: `autocannon -c 100 -d 30s -p 10 http://localhost:3000` for baseline. For cluster analysis, run multiple autocannon instances targeting different worker ports, measure per-worker throughput with `--renderStatusCodes` and `--renderLatencyTable`. Use `perf stat` to monitor CPU distribution across cores. Implement custom headers to track worker ID responses, enabling per-worker performance analysis. Configure autocannon with `--forever` for sustained load testing, monitoring memory leaks and GC pressure via `--trace-gc`. Combine with flame graphs using `--perf-basic-prof` to identify bottlenecks across worker processes.",
      },
      {
        question:
          "How do you explain SO_LINGER affects zero-downtime restarts?",
        solution:
          "SO_LINGER controls socket closure behavior during graceful shutdowns. Set `server.close()` with SO_LINGER(1, 30) to allow 30s for existing connections to complete before force-closing. Without proper SO_LINGER configuration, connections terminate abruptly during restarts, causing 502 errors. Implement graceful shutdown: listen for SIGTERM, call `server.close()`, set SO_LINGER via `socket.setKeepAlive(true)` and custom C++ addon for SO_LINGER, wait for active connections to drain using connection tracking, then `process.exit(0)`. Use load balancer health checks to remove unhealthy workers before termination. Monitor connection states with `ss -tulpn` during deployment to ensure zero dropped connections.",
      },
      {
        question: "How do you pin CPU affinity for each worker in a cluster?",
        solution:
          "Use `taskset` or Node.js process binding. In cluster master, before forking workers, calculate CPU affinity: `const cpus = os.cpus().length; const affinity = workerId % cpus;`. After `cluster.fork()`, use `child_process.exec(`taskset -cp ${affinity} ${worker.process.pid}`)` to pin worker to specific CPU core. For containers, use cgroups: `echo ${worker.pid} > /sys/fs/cgroup/cpuset/worker-${workerId}/cgroup.procs` after setting `cpuset.cpus=${affinity}`. Alternative approach: use `libuv` thread pool environment variable `UV_THREADPOOL_SIZE` combined with `--max-old-space-size` per worker. Monitor CPU utilization per core with `htop` or custom metrics to verify even distribution and prevent CPU hotspots.",
      },
      {
        question: "Describe kernel bypass techniques (DPDK, XDP) with Node.js",
        solution:
          "Kernel bypass eliminates syscall overhead for high-performance networking. DPDK integration requires native addons: create C++ binding using `node-addon-api` that initializes DPDK environment, allocates hugepages via `rte_eal_init()`, and creates lockless queues for packet processing. Implement zero-copy packet buffers using `SharedArrayBuffer` between Node.js and DPDK threads. For XDP, use eBPF programs loaded via `bpf()` syscall from native addon, implementing custom packet filtering before kernel network stack. Node.js acts as control plane while DPDK/XDP handles data plane. Use `AF_XDP` sockets for userspace packet delivery, avoiding kernel network stack entirely. Typical setup achieves 10M+ packets/second vs 1M with standard sockets, but requires root privileges and specialized hardware with DPDK-compatible NICs.",
      },
      {
        question: "How do you trace TCP retransmits across workers?",
        solution:
          "Implement TCP retransmit monitoring using multiple approaches: 1) Use `ss -i` to monitor retransmit counters per socket, parsing output to correlate with worker PIDs. 2) Deploy eBPF probes via `bcc` tools: `tcpretrans` and custom scripts tracking retransmits per process. 3) In Node.js, monkey-patch net.Socket to emit custom events on TCP state changes, logging with worker ID. 4) Use `netstat -s` periodically to track system-wide TCP retransmit stats, correlating with application metrics. 5) Implement custom metrics using `node-tcp-stats` addon accessing `/proc/net/tcp` and `/proc/net/sockstat`. Set up Prometheus metrics for retransmit rates per worker, alerting when rates exceed thresholds. Use distributed tracing with OpenTelemetry to correlate retransmits with specific requests across worker boundaries.",
      },
      {
        question:
          "Explain Linux cgroups limits when running Node.js in containers",
        solution:
          "Configure cgroups v2 for Node.js containers: Set memory limits via `memory.max` affecting V8 heap and `--max-old-space-size` calculation. Node.js automatically detects cgroup memory limits since v10, but verify with `process.memoryUsage()` and `v8.getHeapStatistics()`. CPU limits via `cpu.max` (quota/period) don't directly affect event loop but influence thread pool performance. Set `UV_THREADPOOL_SIZE` proportional to CPU allocation. Monitor OOMKills via `memory.events` and adjust `memory.swap.max` accordingly. Use `memory.high` for soft limits triggering memory pressure. Configure `pids.max` to prevent fork bombs from child processes. Implement custom metrics reading from `/sys/fs/cgroup/memory.current` and `/sys/fs/cgroup/cpu.stat` to track container resource usage vs limits, adjusting application behavior proactively.",
      },
      {
        question: "How do you scale Pub/Sub horizontally with Redis Cluster?",
        solution:
          "Redis Cluster doesn't support traditional pub/sub across shards. Implement application-level routing: 1) Use Redis Streams with consumer groups for durable pub/sub. Create streams per topic using consistent hashing: `XADD topic:{hash_slot} * message data`. 2) Deploy multiple Redis instances as pub/sub broadcasters, with clients connecting to all instances. 3) Use Redis Cluster with proxy layer (Envoy/HAProxy) routing pub/sub commands to specific nodes. 4) Implement sharded topics: hash topic names to specific Redis nodes, clients subscribe to relevant shards. 5) Use Redis Modules like RedisGears for cross-shard broadcasting. For maximum scalability, combine Redis Streams for persistence with separate Redis instances for real-time pub/sub, implementing dual-write patterns with eventual consistency guarantees.",
      },
      {
        question:
          "Describe edge-side includes (ESI) for dynamic page fragments",
        solution:
          "ESI enables fragment-based caching at CDN edge. Implement ESI tags in HTML responses: `<esi:include src='/api/user-data' ttl='300' />`. Configure CDN (CloudFlare, Fastly) to process ESI directives, caching fragments independently based on TTL and cache keys. In Node.js origin server, generate ESI-enabled templates using libraries like `esi-processor`. Implement fragment controllers returning appropriate cache headers: `Cache-Control: public, max-age=300, s-maxage=600`. Use ESI variables for personalization: `<esi:assign name='user_id' value='$(HTTP_X_USER_ID)'/>`. Handle ESI errors with `<esi:try>/<esi:attempt>/<esi:except>` blocks. For development, implement local ESI processor using middleware that parses ESI tags and performs sub-requests. Monitor fragment cache hit rates and optimize TTL values based on content volatility. ESI reduces TTFB by serving cached fragments while fetching dynamic content asynchronously.",
      },
      {
        question: "How does worker_threads share memory with the parent?",
        solution:
          "Worker threads share memory via `SharedArrayBuffer` and `MessagePort` transfers. Create SharedArrayBuffer in main thread: `const sharedBuffer = new SharedArrayBuffer(1024);` and pass to worker via `postMessage({sharedBuffer}, [sharedBuffer])`. Both threads can access same memory region using typed arrays: `new Int32Array(sharedBuffer)`. Use `Atomics` operations for thread-safe access: `Atomics.store()`, `Atomics.load()`, `Atomics.compareExchange()`. Transfer ownership of ArrayBuffers with zero-copy via Transferable Objects: `postMessage({buffer}, [buffer])` - buffer becomes unusable in sender. For complex data structures, implement lock-free algorithms using `Atomics.wait()` and `Atomics.notify()`. SharedArrayBuffer requires cross-origin isolation headers for security. Alternative: use memory-mapped files via native addons for larger shared memory regions.",
      },
      {
        question: "Explain SharedArrayBuffer and Atomics usage in Node.js",
        solution:
          "SharedArrayBuffer enables true shared memory between threads. Create SAB: `const sab = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * 1000);`. Use typed arrays for access: `const view = new Int32Array(sab);`. Implement thread-safe operations with Atomics: `Atomics.store(view, index, value)` for writes, `Atomics.load(view, index)` for reads, `Atomics.add(view, index, delta)` for atomic increments. For synchronization, use `Atomics.wait(view, index, expectedValue, timeout)` to block until memory changes, and `Atomics.notify(view, index, count)` to wake waiting threads. Implement lock-free data structures: ring buffers for producer-consumer patterns, using `Atomics.compareExchange()` for CAS operations. Handle worker cleanup properly to avoid memory leaks. SharedArrayBuffer requires `--enable-source-maps` and appropriate headers for cross-origin isolation in browsers.",
      },
      {
        question: "How do you transfer an ArrayBuffer to avoid copy overhead?",
        solution:
          "Use Transferable Objects in `postMessage()`: `worker.postMessage({data: buffer}, [buffer])`. After transfer, original buffer becomes detached (length=0, unusable). For bidirectional transfer, implement buffer pool pattern: maintain pool of reusable buffers in each thread, transfer ownership back and forth. Use `ArrayBuffer.isDetached()` to check buffer state. For large datasets, chunk transfer: split large buffers into smaller transferable chunks, reassemble in worker. Implement custom protocols using MessagePort for streaming transfers. Alternative: use SharedArrayBuffer for true zero-copy access, but requires synchronization. For file data, use streams with `readable.read()` returning ArrayBuffer views that can be transferred. Monitor memory usage during transfers to prevent OOM conditions. Consider using native addons for extremely large data sets requiring memory mapping.",
      },
      {
        question: "Describe MessagePort vs parentPort communication patterns",
        solution:
          "MessagePort enables bidirectional communication channels. In main thread: `const {port1, port2} = new MessageChannel(); worker.postMessage({port: port2}, [port2]);`. Worker receives dedicated port for direct communication bypassing main thread message queue. parentPort is worker's default communication channel with parent. Use MessagePort for worker-to-worker communication: main thread creates channels and distributes ports. Implement request-response patterns: assign unique IDs to messages, match responses via ID. MessagePort supports transferring other MessagePorts, creating complex communication topologies. Use `port.start()` to begin message processing, `port.close()` for cleanup. For high-throughput scenarios, MessagePort reduces main thread bottlenecks by enabling direct worker communication. Handle port lifecycle carefully to prevent memory leaks and zombie workers.",
      },
      {
        question: "How do you pool workers to avoid spawn overhead?",
        solution:
          "Implement worker pool with pre-spawned workers: maintain array of idle workers, assign tasks round-robin or based on load. Track worker states (idle/busy/terminating) using Map or custom data structures. Implement task queue for when all workers are busy. Handle worker failures by respawning and updating pool references. Use `cluster.setupPrimary()` for process-based pools or worker_threads for thread pools. Implement worker recycling: terminate workers after N tasks to prevent memory leaks. Add worker health checks via periodic ping-pong messages. For dynamic scaling, monitor queue depth and spawn additional workers when queue exceeds threshold. Implement graceful shutdown: drain task queue, wait for active workers to complete, then terminate pool. Use libraries like `workerpool` or implement custom pool with better control over lifecycle and resource management.",
      },
      {
        question: "Explain Piscina and why it outperforms naive worker pools",
        solution:
          "Piscina implements advanced worker pool optimizations: 1) Task queuing with priority support and LIFO/FIFO strategies. 2) Worker recycling based on memory usage and task count to prevent memory leaks. 3) Load balancing using least-busy-worker algorithm instead of round-robin. 4) Transferable object optimization for zero-copy ArrayBuffer transfers. 5) Worker warm-up with module preloading to reduce cold start latency. 6) Built-in error handling and worker resurrection on crashes. 7) Timeout support with task cancellation. 8) Metrics collection for performance monitoring. Piscina uses C++ addons for performance-critical operations and implements lock-free queues. It handles backpressure better than naive implementations by pausing task acceptance when workers are overloaded. The library also provides AbortController integration for task cancellation and supports both ES modules and CommonJS.",
      },
      {
        question: "How do you debug worker_threads with --inspect-brk?",
        solution:
          "Launch main process with `node --inspect-brk=9229 app.js`. Each worker spawns with incremented debug port: worker 1 on 9230, worker 2 on 9231, etc. Use `--inspect-port=0` to auto-assign ports and log actual ports used. In Chrome DevTools, connect to each debug session separately via chrome://inspect. Set breakpoints in worker code before spawning workers using `--inspect-brk`. For conditional debugging, use environment variables: `if (process.env.DEBUG_WORKER) { debugger; }`. Implement custom debugging helpers: log worker ID with console output, use `process.send()` to report worker state to main thread. Use VS Code with multiple debug configurations targeting different worker ports. For production debugging, use `--inspect` without `-brk` and connect remotely. Implement structured logging with worker correlation IDs for debugging in production environments.",
      },
      {
        question: "What is the cost of serialization for large objects?",
        solution:
          "Serialization cost scales with object complexity and size. JSON.stringify is slowest for large objects (~10-50ms for 10MB objects), with additional parsing cost in worker. Structured cloning (postMessage default) is faster but limited by circular references. For optimization: 1) Use binary formats like MessagePack or Protocol Buffers for 2-3x speed improvement. 2) Implement lazy serialization: only serialize accessed properties. 3) Use streaming serialization for large arrays: process chunks instead of entire object. 4) Transfer ArrayBuffers/TypedArrays directly to avoid serialization. 5) Cache serialized versions when sending same data to multiple workers. 6) Use SharedArrayBuffer for frequently accessed large datasets. Benchmark serialization methods: JSON ~1MB/ms, structured cloning ~5MB/ms, binary formats ~10MB/ms. For 100MB objects, consider memory mapping or chunked processing instead of serialization.",
      },
      {
        question: "How do you cancel a long-running task in a worker?",
        solution:
          "Implement cancellation using AbortController pattern: In main thread, create `AbortController`, pass `signal` to worker via postMessage. Worker checks `signal.aborted` periodically in task loop. For immediate cancellation, use `worker.terminate()` but this kills worker entirely. Better approach: implement cooperative cancellation where worker checks cancellation flag regularly and cleans up gracefully. Use MessagePort for cancellation signals: `port.postMessage({type: 'cancel', taskId})`. For CPU-intensive tasks, insert cancellation checks every N iterations. For I/O operations, use signal.addEventListener('abort', cleanup). Implement task timeout using `setTimeout()` in main thread combined with cancellation. For streaming operations, use AbortController with fetch/readable streams. Handle partial results and cleanup in worker before termination.",
      },
      {
        question:
          "Describe worker_threads vs native addons performance trade-offs",
        solution:
          "Worker threads: Pros: Memory isolation, crash isolation, easier debugging, no compilation step, dynamic worker count. Cons: V8 overhead, serialization costs, limited by JavaScript performance, memory duplication. Native addons: Pros: Direct C++ performance, zero serialization for binary data, access to system APIs, optimized algorithms. Cons: Compilation complexity, potential crashes affecting main process, harder debugging, platform-specific code. Performance comparison: CPU-intensive tasks favor native addons (10-100x faster), I/O-bound tasks show minimal difference. Worker threads better for: parallel JavaScript processing, fault tolerance, rapid prototyping. Native addons better for: mathematical computations, image/video processing, cryptography, system integration. Hybrid approach: use native addons within worker threads for best of both worlds, implementing critical algorithms in C++ while maintaining isolation.",
      },
      {
        question: "How do you share Prisma connections across workers?",
        solution:
          "Prisma connections cannot be directly shared between workers due to connection state isolation. Solutions: 1) Create separate Prisma instance per worker: `const prisma = new PrismaClient()` in each worker, configure connection pooling at database level. 2) Use connection pooling proxy like PgBouncer to manage connections centrally. 3) Implement database request queue in main thread: workers send queries via MessagePort, main thread executes and returns results. 4) Use Prisma's connection pool settings: set `connection_limit` and `pool_timeout` based on worker count. 5) For read replicas, distribute workers across multiple read-only connections. 6) Implement worker recycling to prevent connection leaks: `prisma.$disconnect()` before worker termination. Monitor active connections using `SHOW PROCESSLIST` (MySQL) or `pg_stat_activity` (PostgreSQL) to optimize pool size.",
      },
      {
        question:
          "Explain node:worker_threads and node:child_process hybrid patterns",
        solution:
          "Combine worker_threads for CPU-bound tasks with child_process for system integration. Pattern 1: Worker threads for parallel processing, child processes for external tools: spawn `ffmpeg` child process within worker thread for video processing. Pattern 2: Main process manages child processes, child processes spawn worker threads for internal parallelism. Pattern 3: Use child processes for isolation, worker threads for performance within each child. Implementation: `const { spawn } = require('child_process'); const { Worker } = require('worker_threads');` Create worker thread that manages child processes for executing system commands while maintaining thread pool for CPU tasks. Handle cleanup properly: terminate child processes before worker termination. Use streams for IPC between child processes and worker threads. Monitor resource usage across both process and thread boundaries for optimal resource allocation.",
      },
      {
        question: "How do you measure thread CPU time with performance.now()?",
        solution:
          "performance.now() measures wall clock time, not CPU time. For actual CPU time measurement: 1) Use process.hrtime.bigint() for high-resolution time in nanoseconds. 2) Implement CPU time tracking using process.cpuUsage(): `const start = process.cpuUsage(); /* work */ const cpu = process.cpuUsage(start);` returns user and system CPU microseconds. 3) In worker threads, track per-thread CPU usage by calling cpuUsage() at thread start/end. 4) Use performance.mark() and performance.measure() for custom timing: `performance.mark('start'); /* work */ performance.mark('end'); performance.measure('task', 'start', 'end');`. 5) For detailed profiling, use `--prof` flag and process with `--prof-process`. 6) Implement custom metrics combining wall time and CPU time to calculate CPU efficiency ratios per worker thread.",
      },
      {
        question: "How do you limit memory per worker using resourceLimits?",
        solution:
          "Set resourceLimits in Worker constructor: `new Worker('./worker.js', { resourceLimits: { maxOldGenerationSizeMb: 512, maxYoungGenerationSizeMb: 64, codeRangeSizeMb: 16 } })`. maxOldGenerationSizeMb limits V8 old space heap, maxYoungGenerationSizeMb limits young generation heap. Monitor memory usage in worker using `process.memoryUsage()` and `v8.getHeapStatistics()`. Implement memory pressure handling: when approaching limits, trigger garbage collection with `global.gc()` (requires --expose-gc). Handle out-of-memory gracefully: catch allocation errors, send cleanup message to main thread. Use performance.measureUserAgentSpecificMemory() for detailed memory tracking. Implement memory leak detection: track memory growth over time, restart workers when memory exceeds thresholds. Configure swap limits in containers to prevent system-wide OOM conditions.",
      },
      {
        question: "Describe ESM vs CommonJS loader differences inside workers",
        solution:
          "Workers inherit module system from main thread but can be explicitly configured. ESM workers: Use `new Worker('./worker.mjs', { type: 'module' })` or import() syntax. ESM provides better tree shaking and static analysis. Top-level await supported in ESM workers. CommonJS workers: Default behavior, use require() syntax, synchronous loading. Mixed environments: Main thread can be CommonJS while workers use ESM and vice versa. Dynamic imports work in both: `await import('module')` for ESM, `import()` returns Promise in CommonJS. Worker thread loader resolution follows Node.js resolution algorithm independently. For library compatibility, check module.exports (CommonJS) vs export syntax (ESM). Use conditional exports in package.json for dual-mode packages. Performance: ESM has slight loading overhead but better runtime optimization. Handle loading errors differently: ESM throws during import, CommonJS during require().",
      },
      {
        question: "How do you hot-reload worker code without process restart?",
        solution:
          "Implement worker hot-reloading using several strategies: 1) File watching approach: Use fs.watch() in main thread to monitor worker file changes, terminate and respawn workers on changes. 2) Dynamic worker replacement: Maintain worker registry, spawn new workers with updated code, drain old workers gracefully. 3) Module cache invalidation: Delete require.cache entries before spawning new workers (CommonJS only). 4) For ESM, use dynamic imports with cache busting: `import('./worker.mjs?t=' + Date.now())`. 5) Implement task migration: move pending tasks from old workers to new workers. 6) Use worker pools with rolling updates: update workers one at a time to maintain availability. 7) Version-based worker management: include code version in worker messages, route to appropriate worker version. Handle state migration between worker versions for stateful operations.",
      },
      {
        question: "Explain Worker Thread Scheduling vs OS-level threads",
        solution:
          "Worker threads are actual OS threads managed by libuv thread pool, not green threads or fibers. Node.js worker threads map 1:1 to OS threads, inheriting OS scheduling properties. Differences: 1) OS scheduler determines thread execution order based on priority, CPU affinity, and system load. 2) Worker threads don't have direct priority control from JavaScript - use nice values or cgroups for priority. 3) Context switching occurs at OS level, not controlled by Node.js event loop. 4) Worker threads can run truly parallel on multi-core systems, unlike main thread's event loop concurrency. 5) Memory is isolated per worker thread, preventing shared state corruption. Scheduling implications: CPU-bound workers may starve I/O operations, use worker pools to balance load. Monitor thread states using htop, top, or custom metrics to ensure balanced execution across cores.",
      },
      {
        question:
          "How do you isolate untrusted code inside workers (VM2 vs vm)?",
        solution:
          "Worker threads provide process-level isolation, but additional sandboxing needed for untrusted code. VM2 (deprecated): Provided better isolation than vm module but had security vulnerabilities. Native vm module: Use vm.createContext() with limited global objects: `const context = vm.createContext({ console: { log: sandboxedLog } });` Execute with timeout: `vm.runInContext(code, context, { timeout: 1000 });`. Better approach: Use worker threads + vm module combination: spawn worker with limited require() access, run untrusted code within vm context inside worker. For maximum isolation: Use containers or separate processes via child_process.spawn(). Implement resource limits: CPU time limits, memory limits via resourceLimits, network access restrictions. Consider using WebAssembly for safe code execution with near-native performance. Use libraries like isolated-vm for better sandboxing with v8 isolates.",
      },
      {
        question:
          "How do you profile worker heap snapshots with Chrome DevTools?",
        solution:
          "Enable heap profiling in workers: 1) Launch with `--inspect` flag, each worker gets unique debug port. 2) Connect Chrome DevTools to worker debug sessions via chrome://inspect. 3) In Memory tab, take heap snapshots before/after operations to identify leaks. 4) Use allocation timeline to track memory growth over time. 5) Compare snapshots to find retained objects and growth patterns. 6) For programmatic heap dumps, use v8.writeHeapSnapshot() in worker code. 7) Set up heap snapshot automation: `if (process.memoryUsage().heapUsed > threshold) v8.writeHeapSnapshot();`. 8) Analyze heap dumps offline using chrome://inspect or heap-profile CLI tools. 9) Implement custom heap metrics: track object counts, closure counts, and detached DOM nodes. 10) Use --max-old-space-size with lower values to trigger heap dumps on memory pressure for debugging.",
      },
      {
        question: "Describe WebAssembly integration inside worker_threads",
        solution:
          "WebAssembly provides near-native performance within worker threads for CPU-intensive tasks. Implementation: 1) Load WASM module in worker using WebAssembly.instantiate() or streaming API. 2) Create WASM instance with memory sharing: `const memory = new WebAssembly.Memory({ initial: 10 });`. 3) Use SharedArrayBuffer for zero-copy data exchange between JS and WASM. 4) Implement WASM module caching: compile once in main thread, instantiate in workers. 5) Handle WASM memory growth: monitor memory.buffer changes and update TypedArray views. 6) Use WASM SIMD instructions for parallel data processing. 7) Implement function imports for JS callbacks from WASM code. 8) For streaming data, use WASM linear memory as circular buffer. 9) Profile WASM performance using Chrome DevTools WebAssembly debugging. 10) Consider WASM threads (experimental) for parallel processing within single worker.",
      },
      {
        question: "How do you gracefully terminate workers on SIGINT?",
        solution:
          "Implement graceful shutdown handling SIGINT across worker ecosystem: 1) In main process, listen for SIGINT: `process.on('SIGINT', gracefulShutdown);`. 2) Track active workers and pending tasks in main thread. 3) Send termination signal to all workers: `worker.postMessage({ type: 'shutdown' });`. 4) In worker threads, handle shutdown message: complete current task, cleanup resources, call parentPort.close(). 5) Implement timeout for worker shutdown: use Promise.race with setTimeout to force termination if workers don't respond. 6) Use `worker.terminate()` as last resort after timeout. 7) Track worker states during shutdown to ensure all workers terminate properly. 8) Handle worker exit events: `worker.on('exit', handleWorkerExit);`. 9) Implement resource cleanup: close database connections, file handles, network connections. 10) Exit main process only after all workers terminated: `process.exit(0);`. Use process managers like PM2 for production-grade worker lifecycle management.",
      },
      {
        question:
          "Explain worker_threads impact on libuv thread-pool contention.",
        solution:
          "Worker threads create separate libuv instances with isolated thread pools (default 4 threads each). Main thread's UV_THREADPOOL_SIZE affects file I/O, crypto, DNS operations. Each worker gets its own pool, reducing contention but increasing resource usage. Monitor with process.env.UV_THREADPOOL_SIZE tuning. Use worker.resourceLimits to control memory. Critical for CPU-bound tasks that would otherwise block the main event loop. Measure contention via perf_hooks.monitorEventLoopDelay() and adjust pool sizes accordingly.",
      },
      {
        question: "How do you reuse compiled bytecode across workers?",
        solution:
          "V8 can't directly share compiled bytecode between workers due to isolate boundaries. Workarounds: 1) Use vm.Script with cached data in shared buffer via SharedArrayBuffer, 2) Pre-compile modules in main thread and serialize via vm.Script.createCachedData(), 3) Leverage Node.js built-in bytecode caching by ensuring identical file paths/timestamps, 4) Use --code-cache-path flag for persistent caching, 5) Implement custom module loading with require.cache manipulation. ES modules support top-level await sharing through dynamic import() with consistent URLs.",
      },
      {
        question: "Describe cluster + worker_threads hybrid scaling.",
        solution:
          "Deploy cluster for CPU core utilization (one master, N workers matching CPU cores), then spawn worker_threads within each cluster worker for I/O-bound parallelism. Master handles load balancing via cluster.schedulingPolicy. Each cluster worker maintains 2-4 worker_threads for blocking operations. Use MessageChannel for inter-thread communication, IPC for inter-process. Monitor with process.cpuUsage() per cluster worker and performance.timerify() for worker thread tasks. Scale horizontally with PM2 ecosystem.config.js defining instances: 'max' and exec_mode: 'cluster'.",
      },
      {
        question: "How do you benchmark worker overhead vs native addon?",
        solution:
          "Use benchmark.js or custom perf_hooks timing: 1) Measure worker creation time with performance.mark(), 2) Test message passing latency via MessagePort roundtrip, 3) Compare memory overhead with process.memoryUsage(), 4) Profile context switches using strace -c, 5) Native addons: measure binding call overhead with --prof flag, 6) Use clinic.js flame for flamegraphs, 7) Compare throughput with wrk/autocannon for identical algorithms. Key metrics: worker spawn time (~10-50ms), message serialization cost, GC pressure from transferable objects vs SharedArrayBuffer performance.",
      },
      {
        question: "How do you find the bottleneck in a 20k RPS API?",
        solution:
          "Multi-layer approach: 1) APM tools (New Relic, DataDog) for request tracing, 2) clinic doctor for event loop lag detection, 3) --prof + --prof-process for V8 profiling, 4) perf record -g for system-level profiling, 5) async_hooks for async operation tracking, 6) Custom middleware timing with process.hrtime.bigint(), 7) Database query analysis with EXPLAIN, 8) Memory profiling with --inspect and heap snapshots, 9) Load testing with increasing RPS to find breaking point, 10) Monitor libuv handles/requests with process._getActiveHandles().",
      },
      {
        question: "Explain 0x flamegraph interpretation steps.",
        solution:
          "Flamegraph reading methodology: 1) Y-axis represents call stack depth (root at bottom), 2) X-axis shows relative time spent (width = CPU time %), 3) Colors are random (no semantic meaning), 4) Look for 'plateaus' indicating hot paths, 5) Wide frames at top = leaf functions consuming CPU, 6) Narrow spikes = infrequent expensive calls, 7) Anonymous functions show as (anonymous), 8) Focus on >1% width frames, 9) Trace upward from hot spots to find root cause, 10) Compare before/after optimizations. Generated via: perf record -g -> perf script | stackcollapse-perf.pl | flamegraph.pl.",
      },
      {
        question: "How do you reduce GC pause time in V8?",
        solution:
          "GC optimization strategies: 1) Tune heap sizes with --max-old-space-size and --max-semi-space-size, 2) Enable incremental marking with --incremental-marking, 3) Use --optimize-for-size for memory-constrained environments, 4) Implement object pooling to reduce allocation pressure, 5) Prefer primitive types over objects where possible, 6) Use --trace-gc to monitor pause times, 7) Enable concurrent marking with --concurrent-marking, 8) Avoid large arrays, use streaming/chunking, 9) WeakMap/WeakSet for weak references, 10) Profile with --trace-gc-verbose and adjust --gc-interval based on allocation patterns.",
      },
      {
        question: "Describe hidden classes and how they affect performance.",
        solution:
          "V8 hidden classes (maps) optimize property access through shape-based optimization: 1) Objects with same properties in same order share hidden classes, 2) Property additions create new hidden classes (transitions), 3) Changing property order creates different classes, 4) Delete operations force slow dictionary mode, 5) Monomorphic code (one hidden class) is fastest, 6) Polymorphic (2-4 classes) uses inline caching, 7) Megamorphic (>4) falls back to dictionary lookup. Optimize by: consistent object construction, avoid property deletion, use Map/Set for dynamic properties, initialize all properties in constructor, use --trace-maps to debug transitions.",
      },
      {
        question: "How do you trace deoptimizations with --trace-deopt?",
        solution:
          "Deoptimization debugging workflow: 1) Run with --trace-deopt --trace-opt to see optimization/deoptimization events, 2) Look for 'marked for deoptimization' messages with reasons, 3) Common triggers: wrong type assumptions, bailout conditions, hidden class changes, 4) Use --code-comments for annotated optimized code, 5) --print-opt-code shows optimized assembly, 6) Profile with --prof to correlate with performance, 7) Fix by: consistent types, avoid eval/with, stable object shapes, predictable control flow, 8) Monitor optimization status with %GetOptimizationStatus() in debug builds.",
      },
      {
        question: "Explain inline caching (IC) and how to keep it monomorphic.",
        solution:
          "Inline Caching optimizes property access by caching type information: 1) Uninitialized -> Monomorphic (one type) -> Polymorphic (2-4 types) -> Megamorphic (many types), 2) Monomorphic is fastest with direct memory access, 3) Polymorphic uses branch prediction with type checks, 4) Megamorphic forces slow dictionary lookup. Maintain monomorphism by: consistent object shapes, avoid mixed types in arrays, use TypedArrays for numbers, consistent function signatures, avoid property deletion, use classes over object literals, minimize prototype chain depth. Debug with --trace-ic flag.",
      },
      {
        question: "How do you reduce memory churn in high-throughput streams?",
        solution:
          "Stream optimization techniques: 1) Implement object pooling for frequently allocated objects, 2) Use transform._transform() with push(chunk) instead of creating new streams, 3) Leverage backpressure with proper drain event handling, 4) Use streaming JSON parsers (stream-json) instead of JSON.parse(), 5) Implement custom _write() methods to avoid intermediate buffers, 6) Use pipeline() for proper error handling and cleanup, 7) Configure highWaterMark based on memory constraints, 8) Prefer Buffer.allocUnsafe() for temporary buffers, 9) Use StringDecoder for encoding handling, 10) Monitor with process.memoryUsage() and --trace-gc.",
      },
      {
        question: "Describe heap snapshots vs allocation timeline in Chrome.",
        solution:
          "Heap analysis tools comparison: 1) Heap Snapshots: point-in-time memory state, shows object counts/sizes, retainer analysis for leak detection, compare snapshots for growth patterns, good for finding memory leaks between stable states. 2) Allocation Timeline: real-time allocation tracking, shows allocation rate over time, identifies temporary vs persistent objects, highlights allocation hotspots, better for understanding allocation patterns. Use snapshots for leak detection, timeline for performance optimization. Combine with performance.measureUserAgentSpecificMemory() API and --inspect-brk for automated analysis.",
      },
      {
        question: "How do you diagnose memory leaks with clinic doctor?",
        solution:
          "Clinic Doctor workflow: 1) Install with 'npm i -g clinic', 2) Run 'clinic doctor -- node app.js' under load, 3) Analyze generated HTML report for: event loop utilization >70% = CPU bound, heap usage growing = memory leak, active handles increasing = resource leak, 4) Check recommendations for: GC pressure, memory growth patterns, event loop lag, 5) Use 'clinic bubbleprof' for async operations analysis, 6) Cross-reference with 'clinic flame' for CPU profiling, 7) Export data to JSON for custom analysis, 8) Integrate with CI/CD for regression testing using --collect-only flag.",
      },
      {
        question: "Explain snapshot-based startup optimization in Node 20.",
        solution:
          "Node.js snapshot optimization: 1) V8 startup snapshots contain pre-compiled built-ins and initialized contexts, 2) Use --build-snapshot to create custom snapshots with pre-loaded modules, 3) Implement snapshotSerialize/snapshotDeserialize hooks in modules, 4) Benefits: faster startup time, reduced memory usage, improved cold start performance, 5) Limitations: no dynamic requires, limited global state, 6) Create with mksnapshot tool for custom snapshots, 7) Measure improvement with process.hrtime() around startup, 8) Configure via --snapshot-blob flag, 9) Ideal for serverless/container environments with consistent workloads.",
      },
      {
        question: "How do you tune the新生代/老生代 ratio for your workload?",
        solution:
          "V8 generational GC tuning: 1) Young generation (新生代): short-lived objects, uses Scavenge algorithm, tune with --max-semi-space-size, 2) Old generation (老生代): long-lived objects, uses Mark-Compact, tune with --max-old-space-size, 3) Default ratio ~1:8 (young:old), 4) High allocation workloads: increase young generation size to reduce promotion pressure, 5) Long-lived object workloads: increase old generation, 6) Monitor with --trace-gc-verbose for promotion rates, 7) Use --gc-interval to control frequency, 8) Profile allocation patterns with heap timeline, 9) Target <10% object promotion rate, 10% major GC pause time of total execution.",
      },
      {
        question: "Describe JIT warm-up strategies in serverless environments.",
        solution:
          "Serverless JIT optimization: 1) Pre-warm functions with scheduled events to maintain hot containers, 2) Use provisioned concurrency (AWS Lambda) or min instances (GCP), 3) Implement initialization code outside handler for persistent state, 4) Cache compiled code in global scope, 5) Use --no-lazy compilation for consistent performance, 6) Leverage container reuse with keep-alive patterns, 7) Profile cold vs warm start performance, 8) Use snapshot-based startup for consistent workloads, 9) Implement predictive scaling based on traffic patterns, 10) Monitor with X-Ray/CloudWatch for optimization opportunities, 11) Consider hybrid cluster+worker approach for sustained load.",
      },
      {
        question: "How do you benchmark async_hooks overhead?",
        solution:
          "Async hooks performance testing: 1) Baseline test without hooks enabled, 2) Measure with minimal hook implementation (empty callbacks), 3) Profile individual hook types: init, before, after, destroy, promiseResolve, 4) Use performance.mark() for precise timing, 5) Test with varying async operation types: timers, I/O, promises, 6) Monitor memory usage for hook-related allocations, 7) Benchmark with realistic async patterns (Promise chains, async/await), 8) Measure context propagation overhead, 9) Use --trace-event-categories for detailed analysis, 10) Compare against alternative solutions like AsyncLocalStorage, 11) Target <5% performance impact for production use.",
      },
      {
        question: "Explain TC39 Realms and performance isolation.",
        solution:
          "Realms API performance characteristics: 1) Creates isolated global environments with separate intrinsics, 2) Better isolation than vm.createContext() with lower overhead, 3) Each Realm has independent prototype chains and global objects, 4) No direct object sharing between Realms (security boundary), 5) Use Realm.eval() for code execution with controlled globals, 6) Performance benefits: reduced prototype pollution, cleaner garbage collection, 7) Memory overhead: each Realm duplicates built-in objects, 8) Use cases: plugin systems, untrusted code execution, testing isolation, 9) Compare with worker_threads for different isolation models, 10) Monitor with separate heap snapshots per Realm.",
      },
      {
        question: "How do you reduce require() latency with require caching?",
        solution:
          "Module loading optimization: 1) Leverage Node.js built-in require.cache - modules cached after first load, 2) Pre-load modules during startup: require() all dependencies early, 3) Use require.resolve() to validate paths without loading, 4) Implement custom module loader with Module._load() override, 5) Bundle frequently used modules with webpack/rollup, 6) Use dynamic imports for lazy loading: import() returns Promise, 7) Profile with --prof to identify slow requires, 8) Optimize module structure to reduce dependency chains, 9) Use --experimental-loader for ESM custom loading, 10) Monitor require time with module.createRequire() wrapper.",
      },
      {
        question: "Describe bytecode caching for ESM modules.",
        solution:
          "ESM bytecode optimization: 1) V8 automatically caches compiled bytecode for repeated imports, 2) Cache key based on URL, source code hash, and V8 version, 3) Use --cache-dir for persistent bytecode storage, 4) Dynamic imports benefit from caching with consistent URLs, 5) HTTP/2 Server Push for faster module fetching in web contexts, 6) Implement custom loaders with --experimental-loader for cache optimization, 7) Use import.meta.resolve() for URL consistency, 8) Bundle analysis with webpack-bundle-analyzer for optimization opportunities, 9) Monitor cache hit rates with --trace-loader flag, 10) Precompile with --experimental-compile-cache for production deployment.",
      },
      {
        question: "How do you optimize JSON.parse/stringify throughput?",
        solution:
          "JSON performance optimization: 1) Use streaming JSON parsers (stream-json, oboe.js) for large payloads, 2) Implement custom revivers only when necessary (significant overhead), 3) Profile with JSON.parse() on representative data sizes, 4) Consider alternative serialization: MessagePack, Protocol Buffers, 5) Use JSON.stringify() replacer parameter for selective serialization, 6) Leverage V8's fast path: avoid mixing types in arrays, 7) Pre-allocate buffers for stringify operations, 8) Use worker_threads for CPU-intensive JSON processing, 9) Cache parsed objects when appropriate, 10) Benchmark against native addons like simdjson for extreme performance needs.",
      },
      {
        question: "Explain simdutf integration for UTF-8 validation.",
        solution:
          "SIMD UTF-8 optimization: 1) Node.js uses simdutf library for vectorized UTF-8/UTF-16 validation and transcoding, 2) Leverages CPU SIMD instructions (SSE, AVX) for parallel byte processing, 3) Up to 10x faster than scalar validation for large strings, 4) Automatic fallback to scalar code on unsupported CPUs, 5) Benefits string operations: Buffer.toString(), TextEncoder/TextDecoder, 6) Particularly effective for large JSON payloads and file processing, 7) Enabled by default in Node 18+, 8) Monitor performance with string-heavy workloads using --prof, 9) Benchmark with mixed ASCII/Unicode content, 10) Alternative: use native addons with custom SIMD validation for specialized use cases.",
      },
      {
        question: "How do you profile TLS handshakes with openssl s_time?",
        solution:
          "TLS handshake profiling methodology: 1) Use 'openssl s_time -connect host:port -new' for handshake timing, 2) Test different cipher suites with -cipher flag, 3) Measure session reuse impact with -reuse vs -new, 4) Profile certificate chain validation time, 5) Compare TLS versions: 1.2 vs 1.3 performance, 6) Use 'openssl speed' for crypto operation benchmarks, 7) Node.js specific: monitor with tls.connect() timing, 8) Enable TLS session tickets for faster reconnections, 9) Profile with --trace-tls for detailed handshake logs, 10) Optimize with: shorter certificate chains, faster curves (X25519), appropriate key sizes (2048-bit RSA, 256-bit ECDSA).",
      },
      {
        question: "Describe HTTP keep-alive tuning parameters.",
        solution:
          "HTTP keep-alive optimization: 1) agent.maxSockets controls concurrent connections per host, 2) agent.keepAlive enables connection reuse, 3) agent.keepAliveMsecs sets initial delay for TCP keep-alive, 4) agent.maxFreeSockets limits idle connections, 5) agent.timeout for request timeout, 6) Server-side: server.keepAliveTimeout and server.headersTimeout, 7) Monitor connection reuse with 'netstat -an | grep TIME_WAIT', 8) Tune based on request patterns and latency requirements, 9) Use agentkeepalive library for advanced features, 10) Profile with --trace-http and connection pooling metrics, 11) Balance between connection reuse and memory usage.",
      },
      {
        question:
          "How do you measure event-loop lag with monitorEventLoopDelay()?",
        solution:
          "Event loop monitoring implementation: 1) Use perf_hooks.monitorEventLoopDelay() for histogram-based measurement, 2) Configure resolution and max value based on expected latency, 3) Monitor percentiles: p50, p95, p99 for comprehensive analysis, 4) Set up continuous monitoring with interval sampling, 5) Alert on sustained high lag (>10ms for most applications), 6) Correlate with CPU usage and GC events, 7) Use histogram.reset() for interval-based measurements, 8) Implement custom metrics export to monitoring systems, 9) Combine with process.cpuUsage() for context, 10) Profile blocking operations causing lag with --prof and flame graphs.",
      },
      {
        question: "Explain garbage-collection-aware load shedding.",
        solution:
          "GC-aware load management: 1) Monitor GC pressure with --trace-gc and gc.getHeapStatistics(), 2) Implement adaptive rate limiting based on heap usage, 3) Use memory thresholds to trigger load shedding: >80% heap triggers protection, 4) Defer non-critical operations during GC spikes, 5) Implement circuit breaker pattern with memory conditions, 6) Use gc.on('gc') events for real-time GC monitoring, 7) Prioritize requests by type during memory pressure, 8) Scale out traffic to healthy instances based on GC frequency, 9) Implement graceful degradation: reduce cache sizes, simplify responses, 10) Monitor allocation rate and adjust admission control accordingly.",
      },
      {
        question: "How do you precompile Node with mksnapshot?",
        solution:
          "Node.js snapshot compilation: 1) Use mksnapshot tool from V8 build to create custom snapshots, 2) Build Node.js from source with snapshot support enabled, 3) Create snapshot with pre-loaded core modules and application code, 4) Serialize heap state and compiled code for faster startup, 5) Configure with --snapshot-blob parameter for custom snapshots, 6) Implement snapshot callbacks for proper serialization/deserialization, 7) Limitations: no dynamic requires, limited global state changes, 8) Measure startup improvement with process.hrtime(), 9) Use for containerized applications with consistent startup patterns, 10) Combine with code caching for comprehensive optimization, 11) Test thoroughly for compatibility with dynamic features.",
      },
      {
        question:
          "Describe Node.js startup snapshot customization for containers.",
        solution:
          "Node.js startup snapshots serialize V8 heap state to disk for faster cold starts. Create snapshots with --snapshot-blob flag: `node --snapshot-blob=app.blob --build-snapshot app.js`. In containers, build snapshot during image creation with preloaded dependencies, cached require() results, and initialized global state. Use NODE_OPTIONS='--snapshot-blob=app.blob' in runtime. Snapshots reduce startup time by 40-60% but increase memory usage by 10-20MB. Best for serverless/container environments with frequent cold starts. Limitations: no native modules, limited dynamic imports, serialization overhead for large heaps.",
      },
      {
        question:
          "How do you optimize Docker image size with --experimental-sea?",
        solution:
          "Single Executable Applications (SEA) bundle Node.js runtime with your app into one binary using --experimental-sea. Create sea-config.json with main script and assets, generate blob with `node --experimental-sea-config sea-config.json`, then inject into Node binary with postject tool. Multi-stage Dockerfile: compile in full Node image, copy binary to distroless/scratch. Reduces final image from 900MB+ to <50MB. Enable with NODE_SEA_FUSE_v2, exclude dev dependencies, minify code, compress assets. Limitations: no dynamic require(), limited debugging, slower startup than regular Node.",
      },
      {
        question: "Explain V8 pointer compression impact on 64-bit systems.",
        solution:
          "V8 pointer compression stores heap pointers as 32-bit offsets from a base address instead of full 64-bit pointers, reducing memory usage by 20-40% on 64-bit systems. Enabled by default on x64 with heap <4GB. Compressed pointers are decompressed during access with minimal CPU overhead (~2-3%). Benefits: better cache locality, reduced memory bandwidth, more objects fit in L1/L2 cache. Trade-offs: slight decompression cost, heap size limited to 4GB, can impact pointer-heavy workloads. Disable with --no-pointer-compression if heap >4GB needed. Most effective for applications with many small objects and high allocation rates.",
      },
      {
        question: "How do you trace system calls with strace -c node app.js?",
        solution:
          "Use `strace -c -f node app.js` to profile system calls across all threads. -c provides summary statistics (count, time, errors per syscall), -f traces child processes/workers. Key metrics: read/write calls for I/O analysis, futex for thread synchronization overhead, epoll_wait for event loop efficiency, mmap/munmap for memory allocation patterns. Analyze high-frequency syscalls like clock_gettime (performance.now() overhead), write() patterns for logging optimization. Use -e trace=file,network,process to filter specific syscall categories. Compare syscall distribution between different Node.js versions and optimization techniques to identify performance bottlenecks.",
      },
      {
        question: "Describe perf_hooks to measure async duration.",
        solution:
          "Use Performance API for precise async operation timing. `performance.mark()` creates timestamps, `performance.measure()` calculates durations between marks. For promises: wrap with performance observers or use async_hooks for automatic tracking. Example: `performance.mark('db-start'); await dbQuery(); performance.mark('db-end'); performance.measure('db-duration', 'db-start', 'db-end')`. Use PerformanceObserver to collect metrics asynchronously without blocking main thread. Track async context with AsyncResource or async_hooks.executionAsyncId(). Measure cumulative async work, identify slow operations, detect async queue buildup. Export metrics to APM tools via custom collectors.",
      },
      {
        question: "How do you reduce context switches with SO_REUSEPORT?",
        solution:
          "SO_REUSEPORT allows multiple processes/threads to bind to same port, enabling kernel-level load balancing and reducing context switches. In Node.js cluster mode, each worker binds to same port with `server.listen({port: 3000, reusePort: true})`. Kernel distributes connections across workers using hash-based algorithm, reducing lock contention on accept queue. Benefits: 20-40% performance improvement, better CPU cache locality, reduced scheduler overhead. Considerations: uneven load distribution possible, connection affinity lost, requires Linux 3.9+. Combine with worker CPU affinity using taskset or cgroups for optimal performance in high-concurrency scenarios.",
      },
      {
        question: "Explain Linux taskset vs Node worker_threads affinity.",
        solution:
          "taskset binds processes to specific CPU cores at OS level: `taskset -c 0-3 node app.js` restricts to cores 0-3. For cluster mode, bind each worker to dedicated cores to avoid cache thrashing. Node.js worker_threads don't have direct CPU affinity control - they inherit parent process affinity. Use taskset on main process or libuv thread pool control via UV_THREADPOOL_SIZE. Worker threads share memory but compete for CPU. Best practice: use cluster for CPU-bound work with taskset per worker, worker_threads for I/O parallelization. Monitor with htop/perf to verify core utilization and cache hit rates. NUMA topology awareness critical for multi-socket systems.",
      },
      {
        question: "How do you break a monolith into Node microservices safely?",
        solution:
          "Use Strangler Fig pattern: gradually replace monolith components. Start with bounded contexts analysis, identify service boundaries using Domain-Driven Design. Implement database-per-service pattern with eventual consistency. Extract services iteratively: 1) Create new service alongside monolith, 2) Proxy/route subset of requests to new service, 3) Gradually increase traffic percentage, 4) Decommission monolith code. Use API gateway for request routing and versioning. Implement distributed tracing early. Handle data synchronization with event sourcing/CDC. Use feature toggles for safe rollbacks. Monitor business metrics throughout transition. Consider shared libraries for common code, but avoid tight coupling.",
      },
      {
        question: "Describe API Gateway patterns (BFF, edge auth, rate-limit).",
        solution:
          "Backend for Frontend (BFF): dedicated gateway per client type (web, mobile, IoT) aggregating multiple services into client-specific APIs. Edge authentication: JWT validation, OAuth flows, API key management at gateway level before reaching services. Rate limiting: implement sliding window/token bucket algorithms with Redis backing store for distributed limits. Additional patterns: request/response transformation, circuit breaking, retry logic, caching, logging/monitoring. Use Kong/Envoy/Ambassador for production. Implement health checks, A/B testing routes, canary deployments. Security: CORS, CSRF protection, request validation. Performance: connection pooling, HTTP/2, compression, CDN integration.",
      },
      {
        question: "How do you share common models without tight coupling?",
        solution:
          "Use shared contracts instead of shared code. Publish JSON schemas/OpenAPI specs to schema registry (Confluent, AWS Glue). Generate client SDKs from schemas for type safety. Event-driven: share event schemas via message broker metadata. Database: use database views or read replicas for shared read models. Code sharing: publish internal NPM packages with semantic versioning, use monorepo tools (Lerna, Nx) for coordinated releases. API-first approach: design contracts before implementation. Consumer-driven contracts with Pact testing. Avoid sharing business logic - only data structures and validation rules. Use dependency inversion for service interfaces.",
      },
      {
        question: "Explain Saga orchestration vs choreography with Node.",
        solution:
          "Orchestration: centralized saga coordinator manages transaction flow. Implement with state machines (xstate) or workflow engines. Coordinator sends commands to services, handles failures with compensating transactions. Better for complex workflows, easier debugging, centralized monitoring. Choreography: services communicate via events, no central coordinator. Each service knows next steps, publishes events for downstream services. Implement with EventEmitter/message queues. More resilient, loosely coupled, but harder to track transaction state. Node.js patterns: use async/await for orchestration flows, EventEmitter for choreography. Store saga state in persistent storage. Implement timeouts, retries, idempotency keys. Example: order processing saga with payment, inventory, shipping coordination.",
      },
      {
        question: "How do you version services without breaking clients?",
        solution:
          "Use semantic versioning with backward compatibility. API versioning strategies: 1) URL versioning (/v1/users), 2) Header versioning (Accept: application/vnd.api+json;version=1), 3) Content negotiation. Implement contract-first development with OpenAPI specs. Use deprecation headers and grace periods. Maintain multiple API versions simultaneously with feature toggles. Database migrations: additive changes only, use database views for compatibility. Event versioning: include schema version in messages, maintain multiple event handlers. Consumer-driven contracts ensure changes don't break clients. Blue-green deployments for major version changes. Monitor API usage analytics to plan deprecation timelines.",
      },
      {
        question: "Describe service discovery with Consul vs Kubernetes DNS.",
        solution:
          "Consul: service mesh with health checking, key-value store, multi-datacenter support. Services register with Consul agent, clients query for healthy instances. Features: DNS interface, HTTP API, service mesh with Connect, ACLs. Node.js integration via consul npm package for registration/discovery. Kubernetes DNS: built-in service discovery via DNS resolution. Services accessible via <service>.<namespace>.svc.cluster.local. Automatic service registration, integrates with ingress controllers. Benefits: zero-config for pods, automatic cleanup, native load balancing. Trade-offs: Consul offers richer features but more complexity, K8s DNS simpler but limited to cluster scope. Hybrid approach: Consul for cross-cluster, K8s DNS for intra-cluster communication.",
      },
      {
        question: "How do you handle distributed transactions in Node?",
        solution:
          "Avoid distributed ACID transactions - use eventual consistency patterns instead. Saga pattern: break transaction into local transactions with compensating actions. Two-phase commit (2PC) for ACID requirements but causes availability issues. Outbox pattern: store events in same database as business data, separate process publishes to message broker. Event sourcing: append-only event log as source of truth, rebuild state from events. Use idempotency keys for at-least-once delivery. Implement circuit breakers for service failures. Database strategies: single writer per aggregate, CQRS for read scaling. Message brokers: Kafka for event ordering, RabbitMQ for reliable delivery. Monitor with distributed tracing to identify transaction boundaries and failure points.",
      },
      {
        question: "Explain CQRS and eventual consistency in a Node stack.",
        solution:
          "Command Query Responsibility Segregation separates read/write models. Commands modify state via domain aggregates, queries use optimized read models. Implementation: command handlers modify write database, publish events to message broker, event handlers update read models (projections). Node.js stack: Express for commands/queries, EventStore/Kafka for events, MongoDB/PostgreSQL for read models, Redis for caching. Eventual consistency: read models lag behind writes, use event versioning and idempotent handlers. Handle ordering with event sequence numbers. Benefits: independent scaling of reads/writes, optimized queries, audit trail. Challenges: complexity, data duplication, handling projection failures. Use for complex domains with high read/write throughput differences.",
      },
      {
        question:
          "How do you trace requests across 15 Node services (OpenTelemetry)?",
        solution:
          "Implement distributed tracing with OpenTelemetry SDK. Auto-instrumentation: `@opentelemetry/auto-instrumentations-node` for HTTP, database, message broker spans. Manual spans for business logic: `tracer.startSpan('order-processing')`. Trace context propagation via HTTP headers (W3C Trace Context). Export to Jaeger/Zipkin/DataDog. Service mesh integration with Envoy sidecars for automatic instrumentation. Sampling strategies: probabilistic (1% of traces), rate limiting (100 traces/sec), tail-based sampling for error traces. Correlate logs with trace IDs. Performance monitoring: span duration, error rates, service dependencies. Use trace data for root cause analysis, performance optimization, and service topology visualization.",
      },
      {
        question:
          "Describe circuit-breaker state machines (closed, open, half-open).",
        solution:
          "Circuit breaker prevents cascading failures with three states: CLOSED (normal operation, requests flow through), OPEN (requests fail fast without calling service), HALF-OPEN (limited requests test if service recovered). State transitions: CLOSED→OPEN after failure threshold exceeded, OPEN→HALF-OPEN after timeout period, HALF-OPEN→CLOSED if test requests succeed, HALF-OPEN→OPEN if test requests fail. Node.js implementation with opossum library or custom solution. Configuration: failure threshold (5 failures in 10 requests), timeout (60 seconds), success threshold for recovery (3 successful requests). Monitor state changes, circuit breaker trips, failure rates. Combine with retries, timeouts, bulkhead pattern for comprehensive resilience.",
      },
      {
        question:
          "How do you implement retries with exponential backoff and jitter?",
        solution:
          "Exponential backoff: delay = baseDelay * (backoffFactor ^ attemptNumber). Add jitter to prevent thundering herd: randomize delay within range. Implementation: `delay = baseDelay * Math.pow(2, attempt) + Math.random() * 1000`. Use async/await with setTimeout for delays. Retry conditions: network errors, 5xx responses, timeouts - not 4xx client errors. Maximum retry attempts and total timeout limits. Libraries: axios-retry, p-retry. Dead letter queues for failed messages. Implement idempotency tokens to handle duplicate requests safely. Monitor retry rates, success after retry metrics. Circuit breakers to stop retries when service is down. Consider request prioritization and queue management for high-throughput scenarios.",
      },
      {
        question: "How do you test contract compatibility with Pact?",
        solution:
          "Pact enables consumer-driven contract testing. Consumer tests define expected interactions with provider via Pact framework: specify request/response format, generate pact files. Provider verification: run pact files against actual provider implementation. Workflow: 1) Consumer writes tests with expected API behavior, 2) Generates pact contract file, 3) Provider runs contract tests, 4) Publishes verification results to Pact Broker. Node.js: use @pact-foundation/pact for consumer tests, provider verification. Pact Broker stores contracts, enables CI/CD integration, prevents breaking changes deployment. Benefits: catches breaking changes early, documents API contracts, enables independent team development. Supports versioning, tagging, can-i-deploy checks before production deployment.",
      },
      {
        question: "Explain bulkhead pattern with Node worker_threads.",
        solution:
          "Bulkhead pattern isolates critical resources to prevent failure cascade. With Node.js worker_threads: separate CPU-intensive tasks, database connections, external API calls into different worker pools. Implementation: create dedicated worker pools for different service types using worker_threads pool libraries. Example: separate workers for user requests, admin operations, reporting tasks. Each pool has independent resource limits (CPU, memory, connections). If one pool fails/overloads, others remain operational. Configure pool sizes based on resource requirements: CPU-bound tasks = CPU cores, I/O-bound = higher multiplier. Monitor worker health, automatic restart on failures. Use SharedArrayBuffer for inter-worker communication. Combine with circuit breakers, rate limiting for comprehensive isolation.",
      },
      {
        question: "How do you monitor SLIs/SLOs with Prometheus and Grafana?",
        solution:
          "Service Level Indicators (SLIs): metrics that matter to users - latency, availability, error rate, throughput. Collect with Prometheus client library: histogram for latency (`prom-client`), counter for errors, gauge for queue depth. SLOs: target reliability (99.9% uptime, 95% requests <200ms). Grafana dashboards: RED metrics (Rate, Errors, Duration), USE metrics (Utilization, Saturation, Errors). Error budgets: allowed downtime based on SLO (99.9% = 43 minutes/month). Alert on SLO violations, error budget burn rate. Custom metrics for business KPIs. Use recording rules for complex queries, alerting rules for SLO breaches. Multi-window burn rate alerts for different severity levels.",
      },
      {
        question: "Describe canary analysis using Argo Rollouts.",
        solution:
          "Argo Rollouts provides advanced deployment strategies for Kubernetes. Canary deployment: gradually shift traffic from stable to new version. Define Rollout resource with canary strategy: traffic splitting percentages (10%, 25%, 50%, 100%), analysis templates for success metrics. Integration with service mesh (Istio, Linkerd) or ingress controllers for traffic management. Analysis: query Prometheus metrics during canary steps, define success/failure thresholds (error rate <1%, latency <200ms). Automatic rollback on metric failures or manual promotion. Progressive delivery: pause between steps for manual validation. Background analysis runs continuously, foreground analysis at promotion gates. Node.js specific: monitor application metrics, custom business metrics, log error rates.",
      },
      {
        question: "How do you secure inter-service mTLS certs rotation?",
        solution:
          "Mutual TLS requires both client and server certificates for authentication. Automated certificate management: use cert-manager in Kubernetes, Vault PKI engine, or service mesh (Istio, Linkerd) for automatic cert provisioning and rotation. Short-lived certificates (1-24 hours) reduce compromise risk. Node.js mTLS: configure HTTPS servers with client certificate verification, use agent for outbound requests with client certs. Hot reload certificates without downtime: watch cert files, reload server context on changes. Certificate rotation: implement graceful certificate updates, overlap periods for smooth transitions. Monitor certificate expiration, failed TLS handshakes. Store certificates in Kubernetes secrets with automatic rotation. Use SPIFFE/SPIRE for workload identity and automatic certificate lifecycle.",
      },
      {
        question: "Explain backpressure in gRPC streams between services.",
        solution:
          "Backpressure prevents fast producers from overwhelming slow consumers in streaming scenarios. gRPC uses HTTP/2 flow control: receiver advertises window size, sender respects limits. Node.js gRPC streaming: implement backpressure in server streams by pausing when client can't keep up, resume when buffer space available. Client streams: monitor write buffer, pause writing when full. Bidirectional streams: coordinate flow control in both directions. Strategies: buffering with size limits, dropping messages, applying sampling, degrading service quality. Monitor queue sizes, processing latencies, dropped message rates. Use adaptive batching, dynamic throttling based on downstream capacity. Implement circuit breakers to detect overwhelmed services. Consider message prioritization, load shedding during high load scenarios.",
      },
      {
        question:
          "How do you deploy on AWS Lambda with provisioned concurrency?",
        solution:
          "Provisioned concurrency pre-initializes Lambda execution environments to eliminate cold starts. Configure via AWS Console, CLI, or Infrastructure as Code (CDK/Terraform). Set provisioned concurrency units based on expected concurrent requests. Node.js optimizations: minimize package size, use webpack bundling, enable NODE_OPTIONS='--max-old-space-size=3008' for memory optimization. Connection pooling: reuse database connections across invocations, initialize outside handler function. Monitoring: track ProvisionedConcurrencyUtilization, ProvisionedConcurrencySpillover metrics. Cost optimization: schedule provisioned concurrency for peak hours, use Application Auto Scaling for dynamic adjustment. Layer usage for shared dependencies, environment variable caching, implement warming strategies for optimal performance.",
      },
      {
        question: "Describe event sourcing with Kafka and Node consumers.",
        solution:
          "Event sourcing stores all changes as immutable events, rebuilding state by replaying events. Kafka as event store: topics per aggregate type, partitioned by aggregate ID for ordering. Node.js producers: publish domain events with schemas (Avro/JSON Schema), include event version, timestamp, correlation ID. Consumers: process events to build projections/read models. Event store implementation: serialize events with version information, handle schema evolution. Consumer groups for parallel processing, maintain consumer offsets for resumption. Snapshotting: periodic state snapshots to avoid replaying all events. Handle duplicate events with idempotency keys. Dead letter topics for processing failures. Use Kafka Streams for real-time aggregations, KSQL for event queries.",
      },
      {
        question: "How do you handle duplicate events in idempotent consumers?",
        solution:
          "Implement idempotency to handle at-least-once delivery semantics safely. Strategies: 1) Idempotency keys: unique identifier per operation, store processed keys in Redis/database with TTL, skip processing if key exists. 2) Natural idempotency: operations naturally idempotent (SET user.email vs INCREMENT counter). 3) Version-based: include version numbers in events, apply only if version is newer. 4) Deduplication windows: store recent message IDs with expiration. Node.js implementation: middleware to check idempotency before processing, atomic operations for key storage and business logic. Database transactions ensure consistency. Monitor duplicate rates, processing delays. Consider exactly-once semantics with transactional producers/consumers where supported (Kafka transactions).",
      },
      {
        question: "Explain data partitioning strategies for sharded Mongo.",
        solution:
          "MongoDB sharding strategies: 1) Range-based sharding: partition by field ranges (e.g., user_id 1-1000 → shard1), good for range queries but can create hotspots, 2) Hash-based: use hashed shard key for even distribution, prevents hotspots but loses range query efficiency, 3) Zone-based: geographic/logical partitioning with sh.addShardToZone(), 4) Compound shard keys: combine multiple fields for better distribution, 5) Choose high cardinality, low frequency keys, 6) Monitor with db.stats() and sh.status(), 7) Use mongos router for query distribution, 8) Implement proper balancer settings with sh.setBalancerState(), 9) Handle cross-shard queries efficiently, 10) Plan for resharding operations using refineCollectionShardKey().",
      },
      {
        question: "How do you blue/green databases schema migrations?",
        solution:
          "Blue/Green DB migration strategy: 1) Deploy green environment with new schema alongside blue (current), 2) Use database replication (master-slave) or read replicas, 3) Implement backward-compatible schema changes first, 4) Use feature flags to control which schema version applications use, 5) Sync data between blue/green using CDC (Change Data Capture) tools like Debezium, 6) Route read traffic to green for validation while writes go to blue, 7) Implement rollback procedures with schema versioning, 8) Use tools like Flyway/Liquibase for migration tracking, 9) Monitor data consistency with checksums/row counts, 10) Switch traffic atomically using load balancer/DNS changes, 11) Keep blue environment for quick rollback during grace period.",
      },
      {
        question: "Describe service mesh (Istio) traffic policies.",
        solution:
          "Istio traffic management: 1) VirtualService: define routing rules, match conditions, destination weights for A/B testing, 2) DestinationRule: configure load balancing, circuit breakers, TLS settings per service subset, 3) Gateway: manage ingress/egress traffic with TLS termination, 4) ServiceEntry: add external services to mesh registry, 5) Traffic splitting: percentage-based routing for canary deployments, 6) Fault injection: delay/abort policies for chaos testing, 7) Timeout/retry policies: configure resilience patterns, 8) Rate limiting: use EnvoyFilter for request throttling, 9) mTLS policies: automatic service-to-service encryption, 10) Observability: integrate with Jaeger, Prometheus, Grafana for monitoring, 11) Use istioctl for policy validation and debugging.",
      },
      {
        question: "How do you debug latency with Jaeger traces?",
        solution:
          "Jaeger trace analysis workflow: 1) Instrument code with OpenTracing/OpenTelemetry SDKs, 2) Add custom spans for critical operations (DB queries, external calls), 3) Use trace ID propagation across service boundaries, 4) Analyze trace waterfall in Jaeger UI for bottlenecks, 5) Look for long-running spans, gaps between spans, 6) Use tags/logs for contextual information (SQL queries, error messages), 7) Implement sampling strategies to reduce overhead, 8) Set up service dependency graphs to identify critical paths, 9) Create custom dashboards for latency percentiles, 10) Use trace comparison for before/after performance analysis, 11) Integrate with alerting on high latency traces using Jaeger Query API.",
      },
      {
        question: "Explain feature flags at microservice granularity.",
        solution:
          "Microservice feature flag architecture: 1) Use centralized flag service (LaunchDarkly, Split.io) with service discovery integration, 2) Implement flag evaluation at service boundaries with proper fallbacks, 3) Context propagation: pass user/request context for personalized flags, 4) Cache flag states locally with TTL to reduce latency, 5) Use circuit breakers for flag service failures, 6) Implement gradual rollouts with percentage-based targeting, 7) Service-specific flags for independent deployments, 8) Flag dependencies management across service call chains, 9) Monitoring flag evaluation performance and error rates, 10) Cleanup strategies for deprecated flags, 11) Use feature flag SDKs with proper error handling and metrics collection.",
      },
      {
        question:
          "Compare RabbitMQ routing topologies (direct, topic, fanout).",
        solution:
          "RabbitMQ exchange types comparison: 1) Direct: exact routing key match, one-to-one message routing, ideal for task queues and RPC patterns, low latency, 2) Topic: wildcard pattern matching (* single word, # multiple words), pub/sub with selective consumption, flexible but slower routing, 3) Fanout: broadcasts to all bound queues ignoring routing key, fastest for pub/sub scenarios, highest throughput, 4) Headers: route based on message headers instead of routing key, most flexible but slowest, 5) Use direct for point-to-point, topic for hierarchical routing (logs.error.*, metrics.#), fanout for notifications/events, 6) Performance: fanout > direct > topic > headers, 7) Combine with queue durability, persistence settings based on use case.",
      },
      {
        question: "How do you ensure exactly-once delivery with Kafka in Node?",
        solution:
          "Kafka exactly-once semantics in Node.js: 1) Enable idempotent producers with 'enable.idempotence': true in kafkajs, 2) Use transactions with producer.transaction() for atomic multi-partition writes, 3) Implement consumer-side idempotency with message deduplication using unique message IDs, 4) Use 'isolation.level': 'read_committed' for consumers, 5) Manual offset management with commitOffsets() after successful processing, 6) Implement retry logic with exponential backoff for transient failures, 7) Use at-least-once delivery + idempotent processing pattern, 8) Store processed message IDs in database/cache for deduplication, 9) Handle producer retries with sequence numbers, 10) Monitor duplicate message rates and processing latency, 11) Use Kafka Streams for built-in exactly-once processing when applicable.",
      },
      {
        question: "Describe consumer group rebalancing in kafkajs.",
        solution:
          "KafkaJS consumer group rebalancing: 1) Rebalance triggers: consumer join/leave, partition changes, heartbeat timeout, 2) Strategies: RoundRobin (even distribution), Range (continuous partitions per consumer), 3) Configure 'session.timeout.ms' and 'heartbeat.interval.ms' for failure detection, 4) Use 'max.poll.interval.ms' for processing time limits, 5) Handle rebalance events with consumer.on('consumer.group_join') and 'consumer.rebalancing', 6) Implement graceful shutdown with consumer.disconnect(), 7) Partition assignment sticky for minimal reassignment, 8) Monitor rebalance frequency and duration, 9) Use static group membership for stable assignment, 10) Handle offset commits during rebalance to prevent message loss/duplication, 11) Optimize consumer performance to reduce rebalance frequency.",
      },
      {
        question: "How do you handle poison messages in SQS?",
        solution:
          "SQS poison message handling: 1) Configure dead letter queues (DLQ) with maxReceiveCount threshold, 2) Implement exponential backoff with visibility timeout increases, 3) Use message attributes for retry tracking and failure reasons, 4) Set up CloudWatch alarms for DLQ message counts, 5) Implement circuit breakers to prevent cascading failures, 6) Add structured logging for poison message analysis, 7) Use SQS message filtering to route problematic messages, 8) Implement manual message inspection and reprocessing tools, 9) Consider message transformation/sanitization before requeuing, 10) Use separate processing queues for different message types, 11) Monitor processing success rates and failure patterns, 12) Implement alerting for rapid poison message accumulation.",
      },
      {
        question: "Explain backpressure in RabbitMQ with prefetch count.",
        solution:
          "RabbitMQ backpressure management: 1) Set channel.prefetch(count) to limit unacknowledged messages per consumer, 2) Lower prefetch for CPU-intensive processing, higher for I/O-bound tasks, 3) Global prefetch affects all consumers on connection vs per-channel basis, 4) Monitor queue depth and consumer utilization rates, 5) Use basic.qos for quality of service settings, 6) Implement flow control with publisher confirms and mandatory flag, 7) Configure memory and disk alarms to prevent broker overload, 8) Use TTL (time-to-live) for message expiration during overload, 9) Implement consumer scaling based on queue length metrics, 10) Handle consumer acknowledgments properly to release prefetch slots, 11) Use lazy queues for large message backlogs, 12) Monitor connection blocked/unblocked events.",
      },
      {
        question:
          "How do you scale Node consumers horizontally with Kubernetes HPA?",
        solution:
          "Kubernetes HPA for Node.js consumers: 1) Use custom metrics like queue length, message lag for scaling decisions, 2) Configure HPA with external metrics adapter (Prometheus, AWS CloudWatch), 3) Set appropriate target utilization thresholds (e.g., 100 messages per pod), 4) Implement readiness/liveness probes for consumer health, 5) Use deployment strategies with rolling updates for zero-downtime scaling, 6) Configure resource limits/requests for predictable scaling, 7) Use PodDisruptionBudgets to maintain availability during scaling, 8) Implement graceful shutdown handling with SIGTERM, 9) Monitor scaling events and prevent thrashing with stabilization windows, 10) Use KEDA for advanced event-driven autoscaling, 11) Consider VPA for vertical scaling of consumer resources, 12) Implement consumer group coordination for Kafka scaling.",
      },
      {
        question: "Describe DLQ (dead-letter queue) patterns.",
        solution:
          "Dead Letter Queue implementation patterns: 1) Automatic DLQ routing after max retry attempts with exponential backoff, 2) Categorize failures: transient (network timeout) vs permanent (malformed data), 3) Implement retry policies with increasing delays (1s, 5s, 25s, 125s), 4) Use separate DLQs for different error types or services, 5) Add rich error context: stack traces, input data, timestamps, 6) Implement DLQ monitoring and alerting for operational visibility, 7) Create replay mechanisms for reprocessing corrected messages, 8) Use message TTL to prevent indefinite DLQ growth, 9) Implement manual inspection tools for DLQ analysis, 10) Consider sideline queues for temporary routing during incidents, 11) Use poison message detection to quickly route problematic patterns, 12) Archive old DLQ messages for compliance and analysis.",
      },
      {
        question: "How do you serialize Avro in Kafka Node producers?",
        solution:
          "Avro serialization in Node.js Kafka: 1) Use avsc library for schema compilation and serialization, 2) Integrate with Confluent Schema Registry using @kafkajs/confluent-schema-registry, 3) Register schemas with proper naming conventions and versioning, 4) Implement schema evolution strategies (backward, forward, full compatibility), 5) Cache compiled schemas for performance optimization, 6) Use magic byte prefix for schema registry integration, 7) Handle schema resolution by ID from registry, 8) Implement proper error handling for schema validation failures, 9) Use logical types for complex data (timestamps, decimals), 10) Configure schema registry client with authentication, 11) Monitor schema usage and evolution patterns, 12) Implement schema validation in CI/CD pipelines, 13) Use union types for optional fields and schema evolution.",
      },
      {
        question: "Explain Idempotence enable flag in KafkaJS.",
        solution:
          "KafkaJS idempotent producer configuration: 1) Set 'enable.idempotence': true in producer config for exactly-once semantics, 2) Automatically sets 'acks': 'all', 'retries': MAX_SAFE_INTEGER, 'max.in.flight.requests.per.connection': 5, 3) Uses producer ID and sequence numbers to detect duplicates, 4) Handles network failures and broker restarts gracefully, 5) Prevents message duplication during retry scenarios, 6) Requires broker version 0.11.0+ with proper configuration, 7) Monitor producer metrics for successful vs failed sends, 8) Handle ProducerFencedException for producer epoch conflicts, 9) Use with transactions for multi-partition atomic writes, 10) Impacts throughput due to additional broker coordination, 11) Configure 'delivery.timeout.ms' for maximum delivery time, 12) Implement proper error handling for idempotency violations.",
      },
      {
        question: "How do you monitor queue lag with Prometheus exporters?",
        solution:
          "Queue monitoring with Prometheus: 1) Use JMX exporter for Kafka consumer lag metrics (kafka_consumer_lag_sum), 2) RabbitMQ: deploy rabbitmq_prometheus plugin for queue depth/rate metrics, 3) SQS: use CloudWatch exporter for ApproximateNumberOfMessages, 4) Set up Grafana dashboards with lag alerts and SLI/SLO tracking, 5) Configure alert rules for high lag thresholds (> 10000 messages), 6) Monitor consumer throughput vs producer rate for capacity planning, 7) Use custom metrics for business-specific lag (processing time, error rates), 8) Implement lag-based autoscaling triggers in Kubernetes, 9) Track lag distribution across partitions/queues for hotspot detection, 10) Set up multi-level alerting: warning (1000 msgs) → critical (5000 msgs), 11) Monitor offset commit frequency and failures, 12) Use histogram metrics for lag duration analysis.",
      },
      {
        question: "Describe SQS FIFO vs standard trade-offs.",
        solution:
          "SQS queue type comparison: 1) FIFO: strict ordering within message groups, exactly-once delivery, 300 TPS limit (3000 with batching), higher cost, requires .fifo suffix, 2) Standard: best-effort ordering, at-least-once delivery, unlimited throughput, lower cost, eventual consistency, 3) FIFO use cases: order processing, chat messages, financial transactions, 4) Standard: log aggregation, notifications, fan-out patterns, 5) FIFO features: message deduplication, content-based deduplication, message groups for parallel processing, 6) Performance: Standard offers higher throughput, FIFO guarantees consistency, 7) Choose FIFO for strict ordering requirements, Standard for high-throughput scenarios, 8) Monitor both queue types with CloudWatch metrics, 9) Consider partitioning strategies for FIFO scaling, 10) Use receive message wait time for long polling efficiency.",
      },
      {
        question: "How do you retry with exponential backoff in RabbitMQ?",
        solution:
          "RabbitMQ exponential backoff implementation: 1) Use TTL (x-message-ttl) with increasing delays: 1s, 2s, 4s, 8s, 16s, 2) Implement retry count tracking in message headers, 3) Create separate retry queues with different TTLs for each attempt, 4) Use dead letter exchanges to route expired messages back to processing queue, 5) Set maximum retry limits (typically 5-7 attempts) before DLQ routing, 6) Add jitter (random component) to prevent thundering herd: delay ± 25%, 7) Implement circuit breakers to prevent cascading failures, 8) Use delayed message plugin (rabbitmq-delayed-message-exchange) for precise timing, 9) Monitor retry patterns and success rates after retries, 10) Configure separate retry policies for different error types, 11) Use lazy queues for retry scenarios with large message backlogs, 12) Implement retry budget limits per time window.",
      },
      {
        question: "Explain Kafka transactions with Node kafkajs.",
        solution:
          "KafkaJS transaction implementation: 1) Configure producer with 'transactional.id' for exactly-once semantics, 2) Use producer.transaction() wrapper for atomic operations, 3) Begin transaction with transaction.send() for multiple messages/partitions, 4) Commit or abort based on processing success, 5) Handle ProducerFencedException for zombie producer detection, 6) Use 'isolation.level': 'read_committed' on consumers, 7) Implement proper error handling with transaction rollback, 8) Configure 'transaction.timeout.ms' for maximum transaction duration, 9) Use transactions for consume-transform-produce patterns, 10) Monitor transaction success/failure rates, 11) Handle coordinator failures and epoch bumps, 12) Combine with idempotent producers for complete exactly-once processing, 13) Consider performance impact of transaction coordination overhead.",
      },
      {
        question: "How do you compress messages (snappy, lz4) in Kafka?",
        solution:
          "Kafka message compression configuration: 1) Set 'compression.type': 'snappy' | 'lz4' | 'gzip' | 'zstd' in producer config, 2) Snappy: fast compression/decompression, moderate ratio, good for real-time processing, 3) LZ4: fastest compression, lowest CPU usage, good for high-throughput scenarios, 4) GZIP: highest compression ratio, slower processing, good for storage optimization, 5) ZSTD: best balance of ratio and speed (Kafka 2.1+), 6) Configure 'batch.size' and 'linger.ms' for better compression efficiency, 7) Monitor compression ratio metrics (compressed/uncompressed bytes), 8) Consider network vs storage trade-offs based on infrastructure, 9) Use 'compression.type': 'producer' on broker to maintain producer compression, 10) Profile CPU usage vs network savings for optimal choice, 11) Test different compression algorithms with representative data, 12) Monitor broker decompression overhead for consumers.",
      },
      {
        question: "Describe ordering guarantees in RabbitMQ quorum queues.",
        solution:
          "RabbitMQ quorum queue ordering: 1) FIFO ordering within single queue with proper acknowledgments, 2) Use Raft consensus for consistent message ordering across replicas, 3) Single consumer per queue maintains strict ordering, 4) Multiple consumers break ordering guarantees (use single active consumer), 5) Configure 'x-single-active-consumer' for one active consumer at a time, 6) Implement consumer failover with automatic leader election, 7) Use message priorities carefully as they can affect ordering, 8) Handle duplicate messages during failover scenarios, 9) Monitor consumer lag and failover frequency, 10) Use quorum queues for critical ordering requirements vs classic queues for performance, 11) Configure proper 'delivery-limit' for poison message handling, 12) Implement ordering validation in consumers for verification.",
      },
      {
        question: "How do you migrate from RabbitMQ to Kafka without downtime?",
        solution:
          "Zero-downtime RabbitMQ to Kafka migration: 1) Implement dual-write pattern: write to both RabbitMQ and Kafka simultaneously, 2) Use feature flags to control consumer routing (RabbitMQ → Kafka), 3) Deploy Kafka infrastructure with proper capacity planning, 4) Create topic mapping for RabbitMQ exchanges/queues, 5) Implement message format compatibility layers, 6) Use consumer group offsets for Kafka catch-up processing, 7) Deploy shadow consumers on Kafka for validation, 8) Migrate consumers service by service with rollback capability, 9) Monitor both systems during transition period, 10) Implement offset translation for message replay scenarios, 11) Use dead letter topics for migration error handling, 12) Gradually reduce RabbitMQ traffic, decommission after validation, 13) Plan for schema evolution and serialization changes.",
      },
      {
        question: "Explain SQS visibility timeout tuning.",
        solution:
          "SQS visibility timeout optimization: 1) Set timeout based on maximum expected processing time (default 30s, max 12 hours), 2) Use ChangeMessageVisibility for extending timeout during processing, 3) Configure shorter timeouts for fast processing, longer for batch operations, 4) Monitor processing time distribution to set appropriate defaults, 5) Implement heartbeat mechanism for long-running tasks, 6) Use ReceiveMessageWaitTimeSeconds for long polling efficiency, 7) Handle timeout expiration gracefully to prevent duplicate processing, 8) Set per-message visibility timeout using message attributes, 9) Configure appropriate DelaySeconds for initial message delay, 10) Monitor ApproximateNumberOfMessagesNotVisible metric, 11) Use flight time tracking for timeout adjustment, 12) Implement exponential backoff with visibility timeout increases for retries.",
      },
      {
        question: "How do you batch publish to reduce Kafka round-trips?",
        solution:
          "Kafka batching optimization: 1) Configure 'batch.size' (default 16KB) for maximum batch size, 2) Set 'linger.ms' to wait for additional messages before sending, 3) Use 'buffer.memory' for total producer buffering capacity, 4) Implement application-level batching with producer.sendBatch(), 5) Monitor batch size vs latency trade-offs, 6) Use 'compression.type' for better batch compression ratios, 7) Configure 'max.in.flight.requests.per.connection' for pipelining, 8) Set 'delivery.timeout.ms' for maximum delivery time, 9) Monitor producer metrics: batch-size-avg, records-per-request-avg, 10) Use async sending with callbacks for non-blocking batching, 11) Implement batch size adaptation based on throughput requirements, 12) Consider partition key distribution for even batch distribution, 13) Handle batch failures with proper retry logic.",
      },
      {
        question: "Describe schema registry compatibility checks.",
        solution:
          "Schema registry compatibility management: 1) Backward compatibility: new schema can read old data (add optional fields, remove fields), 2) Forward compatibility: old schema can read new data (add fields with defaults), 3) Full compatibility: bidirectional compatibility for rolling upgrades, 4) None: no compatibility checking, breaking changes allowed, 5) Use schema evolution rules: add optional fields, provide default values, never remove required fields, 6) Configure compatibility at global or per-subject level, 7) Implement CI/CD schema validation with schema-registry CLI, 8) Use schema aliases and field aliases for renaming, 9) Test schema evolution in staging environments, 10) Monitor schema usage and deprecation timelines, 11) Implement schema version pinning for critical consumers, 12) Use logical types for complex data evolution (timestamps, decimals).",
      },
      {
        question: "How do you replay events from Kafka offset?",
        solution:
          "Kafka event replay implementation: 1) Use consumer.seek() to position at specific offset or timestamp, 2) Create dedicated consumer group for replay to avoid affecting production, 3) Implement offset management with manual commits, 4) Use kafka-console-consumer for ad-hoc replay testing, 5) Store checkpoint offsets for incremental replay capabilities, 6) Handle schema evolution during historical data replay, 7) Implement replay rate limiting to prevent overwhelming downstream systems, 8) Use separate topics for replay results vs production data, 9) Monitor replay progress with lag metrics and ETA calculations, 10) Implement replay validation by comparing results, 11) Use Kafka Streams for stateful replay with windowing, 12) Handle partition reassignment during long-running replays, 13) Create replay dashboards for operational visibility.",
      },
      {
        question: "Explain priority queues in RabbitMQ vs SQS.",
        solution:
          "Priority queue comparison: 1) RabbitMQ: native priority support with 'x-max-priority' argument (0-255), higher numbers = higher priority, 2) SQS: no native priority, implement using multiple queues with different polling frequencies, 3) RabbitMQ priority ordering within queue, affects memory usage and performance, 4) SQS approach: high/medium/low priority queues with weighted polling, 5) RabbitMQ considerations: priority queues use more memory, can cause starvation of low-priority messages, 6) SQS multi-queue: better isolation, easier scaling, more complex consumer logic, 7) Monitor priority distribution and processing fairness, 8) Use priority sparingly (2-3 levels maximum), 9) Implement priority aging to prevent starvation, 10) Consider business impact vs implementation complexity, 11) Alternative: use separate services for different priority levels.",
      },
      {
        question: "How do you throttle producers when consumers lag?",
        solution:
          "Producer throttling based on consumer lag: 1) Monitor consumer lag metrics via JMX (Kafka) or management API (RabbitMQ), 2) Implement adaptive rate limiting based on lag thresholds, 3) Use token bucket or sliding window algorithms for smooth throttling, 4) Configure backpressure mechanisms in producers (buffer limits, timeouts), 5) Implement circuit breakers that activate during high lag periods, 6) Use producer flow control with broker feedback (RabbitMQ flow control), 7) Scale consumers automatically based on lag metrics, 8) Implement priority-based throttling (critical vs non-critical messages), 9) Use queue depth monitoring for real-time throttling decisions, 10) Configure producer timeout and retry policies, 11) Monitor throttling effectiveness and adjust thresholds dynamically, 12) Implement graceful degradation with message dropping for non-critical data.",
      },
      {
        question: "Describe Kafka Streams vs external stream processing.",
        solution:
          "Kafka Streams vs external processing comparison: 1) Kafka Streams: embedded library, automatic scaling, exactly-once processing, stateful operations with state stores, 2) External (Spark, Flink): separate cluster management, complex windowing, better resource isolation, 3) Kafka Streams benefits: simpler deployment, automatic consumer group management, integrated exactly-once semantics, 4) External benefits: language flexibility, advanced analytics, better resource management, 5) Use Kafka Streams for: simple transformations, joining streams, stateful aggregations, 6) Use external for: complex ML pipelines, cross-system integration, advanced windowing, 7) Kafka Streams topology: processor nodes, state stores, changelog topics, 8) Monitor stream processing lag, throughput, and state store sizes, 9) Consider operational complexity and team expertise, 10) Hybrid approach: Kafka Streams for real-time, batch processing for complex analytics.",
      },
      {
        question: "How do you secure Kafka with SASL/SCRAM in Node?",
        solution:
          "Kafka SASL/SCRAM authentication in Node.js: 1) Configure SASL mechanism in kafkajs client: sasl: { mechanism: 'scram-sha-256', username: 'user', password: 'pass' }, 2) Set up broker with SCRAM credentials in Kafka configuration, 3) Use SSL/TLS for encrypted communication: ssl: { rejectUnauthorized: true, ca: [fs.readFileSync('ca.pem')] }, 4) Implement credential rotation with configuration hot-reload, 5) Store credentials securely using environment variables or secret management systems, 6) Configure ACLs for topic-level authorization, 7) Use different credentials for producers vs consumers, 8) Monitor authentication failures and unauthorized access attempts, 9) Implement proper error handling for authentication failures, 10) Use connection pooling with authenticated connections, 11) Configure session timeout and heartbeat intervals appropriately, 12) Audit access patterns and implement least-privilege principles.",
      },
      {
        question: "Explain message deduplication in SQS FIFO.",
        solution:
          "SQS FIFO deduplication mechanisms: 1) MessageDeduplicationId: explicit unique identifier per message (SHA-256 hash recommended), 2) Content-based deduplication: automatic hashing of message body (EnableContentBasedDeduplication=true), 3) Deduplication scope: 5-minute interval for identical MessageDeduplicationId, 4) MessageGroupId: enables parallel processing while maintaining order within groups, 5) Use UUIDs or timestamp+sequence for unique deduplication IDs, 6) Monitor duplicate message metrics in CloudWatch, 7) Handle deduplication failures gracefully in producer code, 8) Use idempotent message processing in consumers, 9) Configure appropriate batch sizes with deduplication, 10) Store processed message IDs for additional application-level deduplication, 11) Use deduplication for exactly-once delivery guarantees, 12) Test deduplication behavior under high throughput scenarios.",
      },
      {
        question: "Explain OWASP Top 10 2023 in the context of Node.js.",
        solution:
          "OWASP Top 10 2023 for Node.js security: 1) A01 Broken Access Control: implement proper authentication middleware, use JWT validation, role-based authorization checks, 2) A02 Cryptographic Failures: use bcrypt for passwords, crypto.randomBytes() for tokens, HTTPS everywhere, secure cookie settings, 3) A03 Injection: parameterized queries, input validation with joi/yup, NoSQL injection prevention, 4) A04 Insecure Design: threat modeling, secure coding patterns, principle of least privilege, 5) A05 Security Misconfiguration: helmet.js for headers, disable debug in production, secure Express settings, 6) A06 Vulnerable Components: npm audit, Snyk scanning, dependency management, 7) A07 Identification/Authentication Failures: session management, rate limiting with express-rate-limit, MFA implementation, 8) A08 Software Integrity Failures: package signing, SRI for CDN resources, secure CI/CD pipelines, 9) A09 Security Logging Failures: comprehensive logging with winston, monitoring with ELK stack, 10) A10 SSRF: URL validation, whitelist allowed hosts, network segmentation.",
      },
      {
        question: "How do you mitigate Log4Shell-style attacks in Node?",
        solution:
          "Log4Shell exploits JNDI lookup in log messages. Node.js mitigations: 1) Input sanitization: strip/escape ${} patterns before logging, validate all user inputs. 2) Logging security: use structured logging (winston/pino), avoid concatenating user data directly into log messages, implement log injection filters. 3) Template literal safety: use parameterized logging, avoid eval() in log formatters. 4) Network segmentation: restrict outbound connections from application servers, block LDAP/RMI protocols. 5) WAF rules: detect JNDI patterns in requests. 6) Dependency scanning: regular npm audit, monitor for similar deserialization vulnerabilities. 7) Runtime protection: disable unnecessary protocols, use security headers, implement RASP solutions.",
      },
      {
        question: "Describe npm audit vs Snyk vs OSS Index.",
        solution:
          "npm audit: built-in tool scanning package-lock.json for known vulnerabilities, provides fix suggestions via 'npm audit fix', limited to npm registry CVE database. Snyk: commercial platform with broader vulnerability database, supports multiple languages, provides detailed remediation advice, integrates with CI/CD, offers runtime monitoring, has free tier for open source. OSS Index (Sonatype): free service with RESTful API, covers multiple ecosystems, focuses on component intelligence, integrates with various tools. Comparison: npm audit best for basic Node.js scanning, Snyk offers comprehensive DevSecOps platform with policy enforcement, OSS Index provides component-level insights. Recommendation: use npm audit in development, Snyk for enterprise CI/CD pipelines, OSS Index for custom tooling integration.",
      },
      {
        question:
          "How do you enforce Content-Security-Policy headers in Express?",
        solution:
          'Implement CSP using helmet middleware: `app.use(helmet.contentSecurityPolicy({directives: {defaultSrc: ["\'self\'"], scriptSrc: ["\'self\'", "\'unsafe-inline\'"], styleSrc: ["\'self\'", "https:"], imgSrc: ["\'self\'", "data:"], connectSrc: ["\'self\'"], fontSrc: ["\'self\'"], objectSrc: ["\'none\'"], mediaSrc: ["\'self\'"], frameSrc: ["\'none\'"]}}))`. Progressive deployment: start with CSP-Report-Only header, analyze violation reports, tighten policy gradually. Nonce-based CSP for inline scripts: generate random nonce per request, include in script tags and CSP header. Hash-based CSP: compute SHA-256 of inline scripts, whitelist specific hashes. Monitor violations via report-uri endpoint, implement violation logging and alerting. Handle dynamic content with strict-dynamic directive, use trusted-types for DOM manipulation security.',
      },
      {
        question: "Explain Server-Side Request Forgery (SSRF) defenses.",
        solution:
          "SSRF occurs when application fetches remote resources based on user input. Defenses: 1) URL validation: whitelist allowed domains/IPs, block private IP ranges (127.0.0.0/8, 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16), validate URL schemes (allow only http/https). 2) DNS resolution control: resolve URLs before fetching, block internal DNS names, use custom DNS resolver to filter responses. 3) Network segmentation: isolate application servers, use egress proxies with filtering rules. 4) Timeout controls: short timeouts for external requests, connection limits. 5) Response validation: limit response size, validate content types. Node.js implementation: use axios with custom agent, implement URL parsing validation, use libraries like 'is-localhost-ip' for IP range checking. Monitor outbound connections, implement request logging.",
      },
      {
        question: "How do you sanitize user input to prevent NoSQL injection?",
        solution:
          "NoSQL injection exploits occur through unsanitized input in database queries. Prevention: 1) Input validation: use Joi/express-validator for schema validation, whitelist allowed characters, validate data types. 2) Parameterized queries: use MongoDB's query operators safely, avoid dynamic query construction. 3) Type casting: ensure proper data types (ObjectId for MongoDB _id), use mongoose schema validation. 4) Sanitization: remove/escape MongoDB operators ($, .), use libraries like 'mongo-sanitize'. 5) Query builder patterns: use ORM/ODM query builders instead of raw queries. Example: `User.find({email: validator.escape(req.body.email)})` instead of `User.find(req.body)`. Implement query result filtering, enable MongoDB query logging for suspicious patterns, use database user permissions properly.",
      },
      {
        question: "Describe helmet-csp configuration for strict policies.",
        solution:
          "Strict CSP configuration with helmet: `helmet.contentSecurityPolicy({directives: {defaultSrc: [\"'none'\"], baseUri: [\"'self'\"], fontSrc: [\"'self'\", \"https:\", \"data:\"], formAction: [\"'self'\"], frameAncestors: [\"'none'\"], imgSrc: [\"'self'\", \"data:\"], objectSrc: [\"'none'\"], scriptSrc: [\"'self'\"], scriptSrcAttr: [\"'none'\"], styleSrc: [\"'self'\", \"https:\"], upgradeInsecureRequests: []}, reportOnly: false})`. Key strict settings: default-src 'none' forces explicit permissions, object-src 'none' prevents plugin execution, script-src without 'unsafe-inline'/'unsafe-eval', frame-ancestors 'none' prevents clickjacking. Implement nonce generation: `const nonce = crypto.randomBytes(16).toString('base64'); res.locals.nonce = nonce;`. Use report-uri for violation monitoring, implement gradual policy tightening, test with CSP Evaluator tool.",
      },
      {
        question: "How do you rotate JWT signing keys without downtime?",
        solution:
          "Implement graceful key rotation using multiple active keys: 1) Key versioning: include 'kid' (key ID) in JWT header, maintain key registry with multiple active keys. 2) Rotation process: generate new key pair, add to active keys list, sign new tokens with new key, keep old key for verification during grace period, remove old key after all tokens expire. 3) Implementation: use 'jose' library for JWT operations, store keys in AWS Secrets Manager/HashiCorp Vault, cache keys with TTL. 4) Verification logic: try all active public keys for signature verification until one succeeds. 5) Monitoring: track key usage, failed verifications, implement alerting for rotation failures. Example rotation schedule: daily key generation, 7-day grace period, automated via cron jobs. Use HSM/KMS for key generation security.",
      },
      {
        question: "Explain Subresource Integrity (SRI) for CDN assets.",
        solution:
          'SRI ensures CDN resources haven\'t been tampered with using cryptographic hashes. Implementation: 1) Generate hashes: `openssl dgst -sha384 -binary script.js | openssl base64 -A` or use sri-toolbox npm package. 2) Add integrity attributes: `<script src="https://cdn.example.com/lib.js" integrity="sha384-hash" crossorigin="anonymous"></script>`. 3) Multiple hashes: space-separated for algorithm diversity `integrity="sha256-hash sha384-hash"`. 4) Fallback strategy: implement error handlers to load local copies if SRI fails. 5) Automation: integrate hash generation into build pipeline, use webpack-subresource-integrity plugin. 6) CSP integration: use \'require-sri-for script style\' directive. Monitor SRI failures, implement fallback CDNs, regularly update hashes when vendor libraries change. Use strong hash algorithms (SHA-384/SHA-512), avoid SHA-1/MD5.',
      },
      {
        question: "How do you store secrets in AWS Secrets Manager with Node?",
        solution:
          "Use AWS SDK v3 for Secrets Manager integration: `const {SecretsManagerClient, GetSecretValueCommand} = require('@aws-sdk/client-secrets-manager');`. Implementation: 1) Create secrets: store database credentials, API keys, certificates as JSON or binary. 2) Retrieval with caching: implement local cache with TTL to reduce API calls, refresh before expiration. 3) Error handling: retry with exponential backoff, handle VersionStage not found errors. 4) IAM permissions: principle of least privilege, resource-based policies for cross-account access. 5) Rotation: enable automatic rotation for database credentials, implement Lambda rotation functions. 6) VPC endpoints: use VPC endpoints for private subnet access. Example: `const secret = await client.send(new GetSecretValueCommand({SecretId: 'prod/db/credentials'}));`. Use AWS SDK credential chain, implement secret validation, monitor access patterns.",
      },
      {
        question: "Describe mTLS setup between Node microservices.",
        solution:
          "Mutual TLS requires both client and server authentication: 1) Certificate generation: create CA certificate, generate client/server certificates signed by CA, use short TTL (1-24 hours). 2) Server setup: `https.createServer({key: serverKey, cert: serverCert, ca: [caCert], requestCert: true, rejectUnauthorized: true}, app)`. 3) Client configuration: `const agent = new https.Agent({cert: clientCert, key: clientKey, ca: [caCert]}); axios.defaults.httpsAgent = agent;`. 4) Certificate management: use cert-manager in Kubernetes, Vault PKI for certificate lifecycle, implement certificate rotation without downtime. 5) Service mesh: Istio/Linkerd provide automatic mTLS with Envoy proxies. 6) Monitoring: track certificate expiration, TLS handshake failures, cipher suite usage. Use SPIFFE/SPIRE for workload identity, implement certificate pinning for additional security.",
      },
      {
        question: "How do you prevent prototype pollution vulnerabilities?",
        solution:
          "Prototype pollution occurs when attackers modify Object.prototype. Prevention: 1) Input validation: validate object keys, reject keys like '__proto__', 'constructor', 'prototype'. 2) Safe object operations: use Map instead of objects for dynamic keys, Object.create(null) for prototype-less objects. 3) Library patches: keep lodash/other utilities updated, use '--preserve-symlinks' to avoid deep merge vulnerabilities. 4) Sanitization: implement recursive key filtering, use libraries like 'prototype-pollution-security-scan'. 5) JSON parsing: use JSON.parse with reviver function to filter dangerous keys. 6) Object freezing: Object.freeze(Object.prototype) in application startup. 7) ESLint rules: use 'eslint-plugin-security' to detect vulnerable patterns. Example safe merge: `const safeMerge = (target, source) => Object.keys(source).filter(key => !['__proto__', 'constructor'].includes(key)).forEach(key => target[key] = source[key]);`",
      },
      {
        question:
          "Explain rate-limiting algorithms (token bucket vs sliding window).",
        solution:
          "Token Bucket: maintains bucket with fixed capacity tokens, tokens added at constant rate, requests consume tokens. Implementation: `const bucket = {tokens: 100, capacity: 100, lastRefill: Date.now()}; const refill = () => {const now = Date.now(); const tokensToAdd = Math.floor((now - bucket.lastRefill) / 1000) * refillRate; bucket.tokens = Math.min(bucket.capacity, bucket.tokens + tokensToAdd);}`. Sliding Window: tracks requests in time windows, maintains counter per time slot. Fixed window: simple but allows bursts at window boundaries. Sliding window log: precise but memory intensive, stores timestamp per request. Sliding window counter: hybrid approach, tracks multiple time buckets. Libraries: express-rate-limit, rate-limiter-flexible. Redis backing for distributed systems. Choose token bucket for burst allowance, sliding window for strict rate enforcement. Monitor rate limit hits, implement different limits per user tier.",
      },
      {
        question: "How do you detect dependency confusion attacks?",
        solution:
          "Dependency confusion exploits public packages with same names as private packages. Detection: 1) Package naming: use scoped packages (@company/package-name), unique naming conventions for internal packages. 2) Registry configuration: .npmrc with registry precedence, use private registries (Nexus, Artifactory), registry authentication. 3) Lock file analysis: monitor package-lock.json for unexpected registry changes, validate package sources in CI. 4) Supply chain monitoring: use tools like npm-audit-resolver, Socket.dev, Snyk for dependency analysis. 5) CI/CD checks: verify package integrity hashes, check package authors/publishers, monitor for typosquatting. 6) Network controls: whitelist allowed registries, block external npm in production environments. 7) Dependency pinning: use exact versions, regular dependency updates with testing. Example .npmrc: `@company:registry=https://npm.company.com/`",
      },
      {
        question: "Describe OWASP ASVS checklist for Node APIs.",
        solution:
          "OWASP Application Security Verification Standard checklist: 1) Authentication (V2): implement secure session management, multi-factor authentication, account lockout policies, password requirements. 2) Session Management (V3): secure cookie settings (HttpOnly, Secure, SameSite), session timeout, token-based auth with proper expiration. 3) Access Control (V4): implement RBAC/ABAC, principle of least privilege, path traversal prevention, direct object reference protection. 4) Input Validation (V5): server-side validation, output encoding, mass assignment protection, file upload restrictions. 5) Cryptography (V6): use approved algorithms, proper key management, secure random generation, TLS 1.2+. 6) Error Handling (V7): generic error messages, secure logging, no sensitive data in errors. 7) Data Protection (V9): encrypt sensitive data, secure data transmission, proper data classification. Tools: OWASP ZAP, Burp Suite for testing, SonarQube for static analysis.",
      },
      {
        question: "How do you validate file uploads against malware?",
        solution:
          "Multi-layer file validation approach: 1) File type validation: check MIME types and file extensions, use file signature verification (magic numbers), libraries like 'file-type' for true type detection. 2) Content scanning: integrate with antivirus APIs (ClamAV, VirusTotal), implement file sandboxing for execution analysis. 3) Size limits: enforce maximum file size, implement upload timeouts. 4) Content analysis: scan for embedded executables, check for suspicious patterns, validate file structure integrity. 5) Storage security: upload to isolated storage (S3 with restricted access), scan before moving to production storage. 6) User permissions: authenticate uploads, log all file operations. Implementation: `multer` for upload handling, `node-clamav` for virus scanning, `mmmagic` for MIME type detection. Async processing: queue files for background scanning, notify users of scan results.",
      },
      {
        question: "Explain HSTS preloading and preload list submission.",
        solution:
          "HTTP Strict Transport Security (HSTS) forces HTTPS connections. Preloading eliminates first-visit vulnerability: 1) HSTS header: `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`. 2) Requirements for preload: valid certificate, redirect HTTP to HTTPS, serve HSTS header on base domain, includeSubDomains directive, max-age >= 10886400 (18 weeks). 3) Submission process: submit domain to hstspreload.org, domain included in browser preload lists (Chrome, Firefox, Safari), takes months to propagate. 4) Express implementation: `app.use(helmet.hsts({maxAge: 31536000, includeSubDomains: true, preload: true}))`. 5) Considerations: difficult to remove from preload list, affects all subdomains permanently. 6) Testing: use SSL Labs, Security Headers scanners. Monitor HSTS violations, implement proper certificate management.",
      },
      {
        question: "How do you secure GraphQL against introspection abuse?",
        solution:
          "GraphQL introspection reveals schema structure, enabling attackers to discover sensitive fields: 1) Disable introspection: set `introspection: false` in Apollo Server production config, use conditional disabling based on environment. 2) Query depth limiting: implement query depth analysis, reject queries exceeding max depth (typically 10-15 levels), use libraries like 'graphql-depth-limit'. 3) Query complexity analysis: assign costs to fields, limit total query complexity, use 'graphql-query-complexity' middleware. 4) Rate limiting: implement query-based rate limiting, consider query complexity in rate calculations. 5) Field-level security: use schema directives for authorization (@auth, @hasRole), implement field-level permissions. 6) Query whitelisting: maintain allowed query registry, reject ad-hoc queries in production. 7) Logging: log all queries, monitor for suspicious patterns, implement query fingerprinting for analysis.",
      },
      {
        question: "Describe secure coding patterns for eval avoidance.",
        solution:
          "Avoid eval() and related dangerous functions: 1) Direct eval replacement: use JSON.parse() for data, template literals for strings, Function constructor for limited code generation. 2) Dynamic property access: use bracket notation instead of eval for property access, validate property names against whitelist. 3) Code generation alternatives: use AST manipulation with libraries like 'esprima'/'escodegen', template systems like Handlebars with sandboxing. 4) Expression evaluation: use safe libraries like 'safe-eval', 'vm2' with sandboxing, mathematical expression parsers. 5) Configuration: use JSON/YAML for config instead of JavaScript, implement config validation schemas. 6) Template rendering: use template engines with auto-escaping, avoid server-side template injection. 7) ESLint rules: enable 'no-eval', 'no-implied-eval', 'no-new-func' rules. Example safe property access: `const getValue = (obj, path) => path.split('.').reduce((o, key) => o && o[key], obj);`",
      },
      {
        question: "How do you scan Docker images for CVEs in CI?",
        solution:
          "Integrate vulnerability scanning into CI/CD pipeline: 1) Tools: Trivy (comprehensive, fast), Clair (CoreOS project), Snyk (commercial), AWS ECR scanning, Azure Container Registry scanning. 2) CI integration: add scanning step after image build, fail builds on high/critical vulnerabilities, generate reports for review. 3) Base image security: use minimal base images (alpine, distroless), regularly update base images, use official images from trusted sources. 4) Multi-stage builds: separate build and runtime environments, copy only necessary artifacts to final image. 5) Pipeline example: `trivy image --exit-code 1 --severity HIGH,CRITICAL myapp:latest`. 6) Policy enforcement: define vulnerability policies, whitelist acceptable CVEs with justification, implement break-glass procedures for urgent deployments. 7) Continuous monitoring: scan registry images periodically, alert on new vulnerabilities in deployed images.",
      },
      {
        question: "Explain npm provenance and Sigstore integration.",
        solution:
          "npm provenance provides cryptographic proof of package origin and build integrity: 1) Provenance generation: GitHub Actions automatically generates provenance attestations using OIDC tokens, links packages to source code and build environment. 2) Sigstore integration: uses keyless signing with ephemeral certificates, stores signatures in transparency log (Rekor), verifies using Fulcio certificate authority. 3) Publishing with provenance: `npm publish --provenance` generates and uploads attestation, requires GitHub Actions environment with proper permissions. 4) Verification: `npm audit signatures` checks package signatures and provenance, validates build environment claims. 5) Benefits: supply chain security, build reproducibility, dependency verification. 6) Requirements: GitHub repository with Actions, proper OIDC configuration, publishing from CI environment. 7) Monitoring: track provenance coverage in dependencies, implement policies requiring provenance for critical packages.",
      },
      {
        question: "How do you prevent timing attacks on login endpoints?",
        solution:
          "Timing attacks exploit response time differences to infer information: 1) Constant-time comparison: use crypto.timingSafeEqual() for password/token comparison, avoid early returns in validation logic. 2) Artificial delays: add random delays to login responses, implement consistent processing time regardless of success/failure. 3) Hash computation: always compute password hash even for non-existent users, use bcrypt with consistent work factor. 4) Database timing: normalize database query times, use indexes properly to avoid timing variations. 5) Implementation example: `const loginUser = async (username, password) => {const user = await User.findOne({username}) || {password: '$2b$10$dummy'}; const isValid = await bcrypt.compare(password, user.password); await new Promise(resolve => setTimeout(resolve, Math.random() * 100)); return isValid && user.id ? user : null;}`. 6) Rate limiting: implement progressive delays for failed attempts, account lockout policies. 7) Monitoring: track response time distributions, detect timing attack patterns.",
      },
      {
        question: "Describe OAuth PKCE flow in SPAs + Node backend.",
        solution:
          "PKCE (Proof Key for Code Exchange) secures OAuth in public clients: 1) Client generates: code_verifier (random string), code_challenge (SHA256 hash of verifier), code_challenge_method='S256'. 2) Authorization request: redirect to OAuth provider with client_id, redirect_uri, code_challenge, response_type='code'. 3) Authorization response: provider redirects with authorization code to SPA. 4) Token exchange: SPA sends code + code_verifier to Node.js backend, backend exchanges with OAuth provider including code_verifier. 5) Backend verification: OAuth provider verifies code_challenge matches code_verifier hash. 6) Node.js implementation: `const codeVerifier = crypto.randomBytes(32).toString('base64url'); const codeChallenge = crypto.createHash('sha256').update(codeVerifier).digest('base64url');`. 7) Security benefits: prevents authorization code interception, works with public clients, no client secret needed. Store tokens securely in httpOnly cookies from backend.",
      },
      {
        question:
          "How do you encrypt at rest with AWS KMS envelope encryption?",
        solution:
          "Envelope encryption uses data keys encrypted by master keys for scalable encryption: 1) Key hierarchy: Customer Master Key (CMK) in KMS encrypts Data Encryption Keys (DEKs), DEKs encrypt actual data. 2) Encryption process: generate DEK using KMS GenerateDataKey API, encrypt data with DEK (AES-256), store encrypted DEK alongside encrypted data, discard plaintext DEK. 3) Decryption process: retrieve encrypted DEK, decrypt with KMS using CMK, decrypt data with plaintext DEK, discard plaintext DEK. 4) Node.js implementation: `const {KMSClient, GenerateDataKeyCommand, DecryptCommand} = require('@aws-sdk/client-kms');`. 5) Benefits: unlimited data size encryption, reduced KMS API calls, local encryption performance. 6) Key rotation: KMS automatically rotates CMKs annually, re-encrypt DEKs periodically. 7) Access control: IAM policies for CMK access, encryption context for additional security, audit trails via CloudTrail.",
      },
      {
        question: "Explain WAF rules for Node apps behind CloudFront.",
        solution:
          "Web Application Firewall rules protect Node.js applications: 1) AWS WAF integration: attach WAF WebACL to CloudFront distribution, rules evaluated before reaching origin. 2) Common rules: SQL injection protection, XSS filtering, IP allowlisting/blocklisting, rate limiting per IP/URI. 3) Node.js specific rules: protect API endpoints, validate JSON payloads, limit request sizes, filter user-agent strings. 4) Managed rule groups: AWS Core Rule Set, Known Bad Inputs, SQL Database protection, Node.js specific rules. 5) Custom rules: geographic restrictions, referer header validation, custom regex patterns for application-specific threats. 6) Rate limiting: create rules limiting requests per 5-minute window per IP, different limits for authenticated vs anonymous users. 7) Monitoring: CloudWatch metrics for blocked requests, WAF logs analysis, alert on rule triggers. Example rule: block requests with 'union select' in query parameters, allow only specific HTTP methods per endpoint.",
      },
      {
        question: "Compare GraphQL query complexity vs REST rate-limiting.",
        solution:
          "GraphQL query complexity assigns costs to fields based on computational expense, while REST rate-limiting counts requests. GraphQL challenges: single endpoint serves varying complexity queries, nested queries can exponentially increase load, field-level costs difficult to estimate. Implementation: use graphql-query-complexity plugin with field costs, set maximum complexity (typically 1000), analyze query AST before execution. Example: `createComplexityLimitRule(1000, {objectCost: 2, scalarCost: 1, introspectionCost: 1000})`. REST advantage: predictable resource usage per endpoint, simpler implementation. GraphQL benefits: fine-grained control, prevents malicious deep queries, accounts for actual computational cost. Hybrid approach: combine complexity analysis with traditional rate limiting, implement per-user complexity budgets, monitor query patterns for optimization.",
      },
      {
        question: "How do you prevent N+1 with DataLoader?",
        solution:
          "DataLoader batches and caches database requests within single execution context. N+1 occurs when resolver fetches related data individually for each parent. Implementation: create DataLoader instances per request context, batch related IDs, execute single database query. Example: `const userLoader = new DataLoader(ids => User.findByIds(ids)); const posts = await Post.findAll(); const users = await Promise.all(posts.map(post => userLoader.load(post.userId)));`. Key patterns: batch function receives array of keys, returns Promise<Array<Value>>, maintains key-value order, caching prevents duplicate requests. Advanced: implement DataLoader with Redis for cross-request caching, use prime() method to populate cache proactively, handle partial failures with Error objects. Monitor batch sizes, cache hit rates, database query reduction metrics.",
      },
      {
        question: "Explain schema stitching vs federation in Apollo.",
        solution:
          'Schema stitching merges multiple GraphQL schemas into one, federation distributes single schema across services. Stitching: client-side schema merging, requires gateway to know all schemas, SDL combining with resolvers, good for legacy migration. Federation: service-owned schema portions with @key directives, Apollo Gateway composes execution plan, services extend entities with @extends, better for microservices. Federation benefits: service autonomy, incremental adoption, type safety across services, automatic query planning. Implementation: services define entities with @key, reference other services with @external/@requires, gateway handles query distribution. Example: `type User @key(fields: "id") {id: ID! name: String}` in user service, `extend type User @key(fields: "id") {orders: [Order]}` in order service. Choose federation for new microservices architecture, stitching for combining existing GraphQL APIs.',
      },
      {
        question: "How do you persist queries to mitigate DoS?",
        solution:
          "Persisted queries store approved queries server-side, preventing arbitrary query execution. Implementation: extract queries during build, generate SHA-256 hashes as IDs, store query-hash mapping, clients send hash instead of full query. Apollo APQ (Automatic Persisted Queries): client sends query hash, server returns miss error, client sends full query with hash, server caches query. Manual persisted queries: whitelist approach, only pre-approved queries execute, build-time extraction with graphql-query-extractor. Benefits: reduced payload size, DoS protection, query validation, caching optimization. Security enhancement: disable introspection, block ad-hoc queries in production, implement query complexity limits on persisted queries. Monitoring: track cache hit rates, rejected queries, query usage patterns. Handle query evolution with versioned persisted query stores.",
      },
      {
        question: "Describe subscription backpressure with Redis pub/sub.",
        solution:
          "GraphQL subscriptions can overwhelm slow clients without backpressure handling. Redis pub/sub doesn't provide built-in backpressure, requiring application-level solutions. Implementation: track subscription buffer sizes per client, drop messages when buffer exceeds threshold, implement sliding window rate limiting. Example with graphql-redis-subscriptions: `const pubsub = new RedisPubSub({connection: {host: 'localhost', port: 6379, retryDelayOnFailover: 100}}); const asyncIterator = pubsub.asyncIterator('CHANNEL'); const withBackpressure = createBackpressureAsyncIterator(asyncIterator, {bufferSize: 100, dropStrategy: 'oldest'});`. Strategies: drop oldest messages, sample messages (every nth), implement client-side acknowledgments. Advanced: use Redis streams for at-least-once delivery, implement exponential backoff for slow clients, client-specific subscription priorities. Monitor buffer sizes, dropped message rates, client connection health.",
      },
      {
        question:
          "How do you batch and cache with DataLoader in microservices?",
        solution:
          "DataLoader in microservices requires coordination across service boundaries and caching strategies. Cross-service batching: implement service-specific DataLoaders, use HTTP/2 multiplexing for concurrent requests, batch similar requests to same service. Example: `const userServiceLoader = new DataLoader(ids => userService.batchGetUsers(ids)); const orderServiceLoader = new DataLoader(ids => orderService.batchGetOrders(ids));`. Distributed caching: Redis for cross-request caching, implement cache invalidation strategies, use cache warming for frequently accessed data. Cache key design: include service version, tenant ID, user permissions. Advanced patterns: implement DataLoader with circuit breaker for service failures, use cache aside pattern with TTL, implement cache tags for group invalidation. Federation integration: DataLoaders per service boundary, coordinate caching with Apollo Gateway, implement service-level cache policies.",
      },
      {
        question: "Explain graphql-depth-limit to block malicious queries.",
        solution:
          "graphql-depth-limit prevents deeply nested queries that can cause exponential resource consumption. Implementation: analyze query AST depth before execution, count nesting levels including fragments, reject queries exceeding limit. Basic usage: `import depthLimit from 'graphql-depth-limit'; const server = new ApolloServer({typeDefs, resolvers, validationRules: [depthLimit(7)]});`. Advanced configuration: ignore introspection queries, custom depth calculation for specific fields, different limits per operation type. Example malicious query: `{users {posts {comments {replies {author {posts {comments}}}}}}}` could reach 7+ levels. Considerations: balance security with legitimate use cases, fragment spreading increases complexity, implement alongside query complexity analysis. Monitoring: track blocked queries, analyze depth distribution, identify abuse patterns. Combine with query whitelisting for production environments.",
      },
      {
        question: "How do you validate variables with custom scalars?",
        solution:
          "Custom scalars provide type validation and serialization for domain-specific data types. Implementation: define scalar type in schema, implement serialize/parseValue/parseLiteral methods. Example Email scalar: `const EmailType = new GraphQLScalarType({name: 'Email', serialize: value => String(value), parseValue: value => {if (!isValidEmail(value)) throw new GraphQLError('Invalid email'); return value;}, parseLiteral: ast => {if (ast.kind !== Kind.STRING || !isValidEmail(ast.value)) throw new GraphQLError('Invalid email literal'); return ast.value;}});`. Variable validation: occurs during query parsing, custom scalars validate input variables, throw GraphQLError for invalid data. Advanced patterns: DateTime with timezone validation, JSON scalar with schema validation, coordinate system scalars. Libraries: graphql-scalars provides common types, implement custom business logic scalars. Integration with TypeScript: generate type definitions, ensure runtime-compile time consistency.",
      },
      {
        question: "Describe cost analysis plugins for Apollo Server.",
        solution:
          "Cost analysis plugins prevent expensive queries by assigning computational costs to fields. Apollo Server plugins: implement requestDidStart lifecycle, analyze query before execution, throw error if cost exceeds limit. Implementation: `const costAnalysisPlugin = {requestDidStart() {return {didResolveOperation({request, operationAST}) {const cost = calculateCost(operationAST, schema, typeInfo); if (cost > MAX_COST) throw new ForbiddenError('Query cost too high');}}};}`. Field cost calculation: assign base costs to fields, multiply by argument values (pagination limit), account for nested object costs. Example costs: User field = 1, User.posts(limit) = limit * 2, complex calculations = 10. Advanced features: per-user cost budgets, time-window cost tracking, different costs for authenticated/anonymous users. Integration: combine with query complexity limits, implement cost budgeting with Redis, analyze historical query costs for optimization. Monitor cost distribution, expensive query patterns, user behavior analysis.",
      },
      {
        question: "How do you stream large lists with GraphQL defer/stream?",
        solution:
          "GraphQL defer/stream directives enable progressive response delivery for large datasets. Stream directive: `{users @stream(initialCount: 10) {id name}}` sends initial batch then streams remaining items. Defer directive: `{user {...basicInfo ...extraInfo @defer}}` sends immediate response, defers expensive fields. Implementation requires spec-compliant server: graphql-helix, Apollo Server experimental support, custom execution engine. Protocol: multipart/mixed response format, boundary separators, incremental payloads with path information. Client handling: Apollo Client 3+ supports, parse multipart responses, merge incremental data. Performance benefits: faster perceived load time, reduced memory usage, better user experience for large lists. Considerations: increased complexity, not all clients support, network overhead from multiple payloads. Use cases: infinite scroll, dashboard widgets, large result sets with expensive computed fields.",
      },
      {
        question: "Explain file upload spec (GraphQL multipart request).",
        solution:
          "GraphQL multipart request spec enables file uploads through multipart/form-data. Implementation: client sends query with file variables as null, includes files in form data, server resolves file streams. Apollo Upload Server: `import {graphqlUploadExpress} from 'graphql-upload'; app.use(graphqlUploadExpress());`. Schema definition: `scalar Upload type Mutation {uploadFile(file: Upload!): String}`. Resolver handling: `uploadFile: async (_, {file}) => {const {createReadStream, filename, mimetype} = await file; const stream = createReadStream(); // Process stream}`. Security considerations: validate file types, limit file sizes, scan for malware, sanitize filenames. Advanced features: multiple file uploads, progress tracking, resumable uploads with tus protocol. Alternative approaches: separate REST endpoint for uploads, pre-signed URLs with cloud storage, base64 encoding for small files. Performance: stream processing to avoid memory issues, implement upload progress, handle upload failures gracefully.",
      },
      {
        question: "How do you mock GraphQL schema for fast tests?",
        solution:
          "GraphQL schema mocking generates fake data for resolvers during testing. Apollo Server mocking: `const server = new ApolloServer({typeDefs, mocks: true, mockEntireSchema: false});` provides default mocks. Custom mocks: implement type-specific mock functions, use libraries like faker.js for realistic data. Example: `const mocks = {User: () => ({id: faker.datatype.uuid(), name: faker.name.findName(), email: faker.internet.email()}), Query: () => ({users: () => new MockList([3, 6])})};`. Advanced mocking: mock resolvers with business logic, implement stateful mocks with in-memory database, use schema-first mocking with tools like graphql-tools. Testing strategies: unit test resolvers separately, integration tests with mocked schema, snapshot testing for query responses. Performance: mocking eliminates database calls, enables fast test execution, parallel test runs. Tools: Apollo Studio for schema mocking, GraphQL Playground with mock mode, automated mock generation from schema introspection.",
      },
      {
        question: "Describe subscription authentication with JWT.",
        solution:
          "GraphQL subscriptions require authentication for WebSocket connections before subscription establishment. Connection authentication: validate JWT during WebSocket upgrade, store user context for subscription lifecycle. Implementation with Apollo Server: `const server = new ApolloServer({subscriptions: {onConnect: async (connectionParams) => {const token = connectionParams.authorization; const user = await validateJWT(token); return {user};}, onDisconnect: () => console.log('Disconnected')}});`. Subscription resolver: access user context for authorization, filter events based on user permissions. Example: `subscribe: {commentAdded: {subscribe: withFilter(() => pubsub.asyncIterator('COMMENT_ADDED'), (payload, variables, context) => context.user.id === payload.commentAdded.postAuthorId)}}`. Token refresh: handle JWT expiration during long-lived connections, implement refresh token mechanism, graceful reconnection. Security: validate user permissions per subscription, implement rate limiting per user, monitor subscription abuse patterns. Alternative: connection-level auth with session cookies, API key authentication, OAuth token validation.",
      },
      {
        question: "How do you rate-limit per field?",
        solution:
          'Field-level rate limiting provides granular control over expensive operations beyond query-level limits. Implementation: custom directive or plugin approach, track field access per user/IP, maintain field-specific counters. Directive approach: `@rateLimit(max: 10, window: "1m") directive on FIELD_DEFINITION type Query {expensiveField: String @rateLimit(max: 5, window: "1h")}`. Plugin implementation: analyze query AST for rate-limited fields, check Redis counters before execution, increment counters after successful execution. Example: `const fieldRateLimitPlugin = {requestDidStart() {return {willSendResponse({response, context}) {if (!response.errors) {incrementFieldCounters(context.fieldAccess, context.user.id);}}}};}`. Storage: Redis with field-user key pattern, sliding window counters, TTL-based cleanup. Advanced features: different limits for authenticated/anonymous users, burst allowances, priority queues for premium users. Use cases: expensive database operations, external API calls, computational-heavy fields. Monitor field access patterns, identify abuse, adjust limits based on usage analytics.',
      },
      {
        question:
          "Explain GraphQL security best practices against introspection.",
        solution:
          "Introspection exposes entire schema structure, enabling attackers to discover sensitive fields and operations. Disable introspection: set `introspection: false` in Apollo Server production config, environment-based conditional disabling. Schema design: avoid exposing sensitive field names, use generic field names with proper authorization, separate public/private schemas. Access control: implement field-level authorization, use @auth directives, context-based field filtering. Example: `const server = new ApolloServer({typeDefs, resolvers, introspection: process.env.NODE_ENV !== 'production', playground: process.env.NODE_ENV !== 'production'});`. Alternative approaches: schema subgraphs for different user roles, dynamic schema generation based on permissions, proxy layer filtering introspection. Monitoring: log introspection queries, alert on unexpected schema discovery attempts, analyze query patterns. Additional security: query whitelisting, depth limiting, complexity analysis, field-level rate limiting. Documentation: maintain external API documentation, use schema registries for approved client access, implement proper API versioning strategies.",
      },
    ],
  },
];
