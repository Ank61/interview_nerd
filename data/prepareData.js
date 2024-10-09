export const prepareData = [
  {
    id: 1,
    category: "Javascript",
    themeBgColor: "#f8d444",
    textColor: "#745b10",
    topicColor: "#e4bc40",
    lightColor: "#fefbe8",
    type: [
      {
        id: 1,
        label: "Beginner",
        concepts: [
          {
            topic: "Closures",
            tags: [""],
            explanation: `<div>
   <p style="line-height: 1.75; margin-top: 1.5rem;">
     A closure is a combination of a function and its lexical scope, which allows the function to access variables from its outer scope even after the outer function has completed execution.
     It is mostly used when we have to preserve data between function calls or we have to cache the result of an expensive function calls ( recalculate the same result multiple times ).
   </p>
   <div style="padding: 2px; border-radius: 8px; font-size: 14px;">
      <pre><code className="language-javascript">
function outerFunction() {
  const outerVariable = 'I am from the outer function!'; // Outer variable
  function innerFunction() {
    console.log(outerVariable); // Accessing the outer variable
  }
  return innerFunction; // Return the inner function
}

const closureFunction = outerFunction(); // Execute outerFunction
closureFunction(); // Call the inner function
 </code>
  </pre>
  </div>
 <p style="line-height: 1.75;">
  In the example of a closure, we define an outerFunction that contains a variable, outerVariable, and an inner function, innerFunction. The inner function logs outerVariable to the console. When outerFunction is called, it returns innerFunction, which is then stored in the variable closureFunction. Calling closureFunction() executes innerFunction, which retains access to outerVariable even after outerFunction has completed.
  </p>
   <h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">
     Benefits of Closures
   </h4>
 
   <ol style="margin-top: 1.5rem; margin-left: 1.5rem; list-style-type: number; ">
     <li style="margin-top: 0.5rem;">
      <span style="font-weight: 600; font-size: 1.1rem;">Data Privacy (Encapsulation) :</span> Closures allow you to create private variables and functions that can't be accessed directly from outside. This is useful for encapsulating state within a function and ensuring that it isn't exposed.
 <div style="padding: 2px; border-radius: 8px; font-size: 14px;">
      <pre><code className="language-javascript">
function createCounter() {
 let count = 0; // Private variable
   return function() {
    count++; // Accessing outer scope variable
      return count;
        };
      }

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
 </code>
  </pre>
  </div>

In this example, count is private to the createCounter function,
 and the inner function has access to it even after the outer function has finished executing. No other variable or function can access the count variable from outside the function but only the inner one. Outer function encapsulates the count in itself. 
      </li>
     <li style="margin-top: 0.5rem;">
     <span style="font-weight: 600; font-size: 1.1rem;">Memoization :</span>Closures are usefull in storing the result of expensive function calls so that one can use the result again and again without recalculating the result multiple times.
     <div style="padding: 2px; border-radius: 8px; font-size: 14px;">
      <pre><code className="language-javascript">
function memoize(fn) {
const cache = {};
return function(x) {
    if (cache[x] !== undefined) {
      return cache[x];  // Return cached result
    } else {
      const result = fn(x);
      cache[x] = result;  // Store result in cache
      return result;
    }
  };
}

const square = memoize(x => x * x);
console.log(square(4)); // 16 (calculated)
console.log(square(4)); // 16 (cached)
</code></pre>
    </div>
       </li>
     <li style="margin-top: 0.5rem; letter-spacing: -0.025em;">
      <span style="font-weight: 600; font-size: 1.1rem; ">Function Factories :</span> 
Closures allow you to generate new functions with their own private state based on parameters passed to the outer function.
 <div style="padding: 2px; border-radius: 8px; font-size: 14px;">
      <pre><code className="language-javascript">
function multiplier(factor) {
  return function(x) {
    return x * factor;
  };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
</code></pre>
    </div>
    In this case, the factor variable is "remembered" by each closure (the returned function), allowing different behavior depending on the value of factor.
     </li>
   </ol>
 </div>`,
            examples: [
              `function outest(){
  var c = 12; 
  function outer(b){ 
    function inner(){
      console.log(a, b, c); // try printing b and c  here
    }
    let a =10; // let instead of var
    return inner;
  }
  return outer;
}

let a =100;
// Passing argument here 
var close = outest()("Hi Closures"); // this will give you outer function
close(); // this will give you inner function and equivalent`,
            ],
            questions: [
              {
                question: "How do closures work in JavaScript?",
                solution:
                  "<p>Closures work by allowing functions to retain access to variables from their outer scope, even after the outer function has completed execution. This means a function can 'remember' and access variables from its containing scope, regardless of where it's invoked. This behavior is crucial for data privacy, function factories, and maintaining state in asynchronous operations.</p>",
              },
              {
                question: "Can you provide an example of a closure?",
                solution: `<p>Here's a simple example of a closure:</p>
             <pre><code className="language-javascript">
function outerFunction() {
  let outerVariable = "Hello";
    function innerFunction() {
      console.log(outerVariable);
        }
      return innerFunction;
    }
            
let closure = outerFunction();
closure(); // Outputs: "Hello"
            </code></pre>
           <p> In this example, innerFunction forms a closure over outerVariable, allowing it to access outerVariable even after outerFunction has finished executing.</p>`,
              },
              {
                question:
                  "What's the significance of outerFunction()() syntax?",
                solution:
                  "<p>The double parentheses in outerFunction()() indicate two function calls. The first () calls outerFunction, which returns innerFunction. The second () immediately invokes the returned innerFunction. This can also be written as: let closure = outerFunction(); closure();</p>",
              },
              {
                question:
                  "Does the order of variable declarations affect closures?",
                solution:
                  "<p>No, the order of variable declarations doesn't affect closures. As long as the variable is declared within the outer function's scope, it will be accessible to the inner function, regardless of where it's declared in the outer function. The closure captures the entire lexical environment, not just variables declared before it.</p>",
              },
              {
                question:
                  "How do closures interact with block-scoped variables (let/const)?",
                solution:
                  "<p>Closures work the same way with block-scoped variables (let and const) as they do with function-scoped variables (var). The closure will capture the block-scoped variable in its lexical environment. The key difference is in the variable's scope and lifetime, not in how it interacts with the closure.</p>",
              },
              {
                question: "Can closures access parameters of outer functions?",
                solution:
                  "<p>Yes, closures can access parameters of outer functions. These parameters are part of the function's scope and are therefore included in the closure's lexical environment. This allows inner functions to work with data passed to their containing functions.</p>",
              },
              {
                question: "How do nested functions affect closure scope?",
                solution:
                  "<p>In nested functions, each inner function has access to the variables in its own scope, as well as all outer scopes. This creates a chain of scopes, often referred to as the scope chain. Inner functions can access variables from all containing scopes, but outer functions cannot access variables from inner scopes.</p>",
              },
              {
                question: "How do closures interact with global variables?",
                solution:
                  "<p>Closures prioritize variables in their immediate lexical scope. If a variable isn't found in the immediate scope, the closure will look in outer scopes, eventually reaching the global scope. However, if a variable with the same name exists in a closer scope, it will 'shadow' the global variable. This behavior is part of JavaScript's scope resolution mechanism.</p>",
              },
              {
                question: "What are some practical uses of closures?",
                solution:
                  "<p>Closures have several practical applications in JavaScript, including: implementing data privacy and encapsulation, creating function factories, handling callbacks and event handlers, implementing partial application and currying, and managing state in asynchronous operations. They're fundamental to many JavaScript design patterns and programming techniques.</p>",
              },
              {
                question: "Are there any drawbacks to using closures?",
                solution:
                  "<p>While closures are powerful, they can have some drawbacks: they can lead to increased memory consumption if not managed properly, closed-over variables are not garbage collected as long as the closure exists, and overuse of closures can make code harder to understand and maintain. It's important to use closures judiciously and be aware of their memory implications.</p>",
              },
              {
                question:
                  "How do closures relate to garbage collection in JavaScript?",
                solution:
                  "<p>Closures can prevent variables from being garbage collected. When a function forms a closure over a variable, that variable is kept in memory as long as the closure exists, even if it's not being actively used. This can potentially lead to memory leaks if not managed carefully. Understanding this relationship is crucial for writing memory-efficient JavaScript code.</p>",
              },
              {
                question:
                  "What is meant by 'smart garbage collection' in modern JavaScript engines?",
                solution:
                  "<p>Modern JavaScript engines employ sophisticated garbage collection techniques. They can often identify variables that are truly unreachable, even within closures, and collect them. For example, if a closure captures multiple variables but only uses some of them, the unused variables might be eligible for garbage collection. This optimization helps mitigate some of the memory concerns associated with closures.</p>",
              },
              {
                question:
                  "What if var declaration is moved to Line 5, just before return statement? What will happen? Will it still be a Closure?",
                code: `
                  function outer(){ 
                    function inner(){
                      console.log(a);
                    }
                    var a = 10; // var declaration moved here
                    return inner;
                  }
            
                  var close = outer(); // this will give you outer function
                  close(); // this will give you inner function and equivalent output
                `,
                solution:
                  "Yes, it will still be a closure. It doesn’t matter what the sequence is or where the statement is placed. For a closure, what matters is that the function has access to its lexical environment. The output will remain the same.",
              },
              {
                question:
                  "What if var is replaced by let in Line 5? What will happen?",
                code: `
                <pre><code className="language-javascript" style="font-size: 0.8rem;">
function outer(){ 
  function inner(){
    console.log(a);
  }
let a = 10; // let instead of var
return inner;
}
            
var close = outer(); // this will give you outer function
close(); // this will give you inner function and equivalent output
</code></pre>`,
                solution:
                  "Replacing var with let will not affect the behavior. It will still be a closure and the output will be the same. Both var and let allow access to the variable within the closure's scope.",
              },
              {
                question: "What is Garbage Collector?",
                solution:
                  "Garbage Collector is a program in the browser or JS engine that frees up unutilized memory. In languages like C and C++, memory management (allocation and deallocation) is the developer's responsibility. However, in high-level languages like JavaScript, the JS engine handles most of the work. When variables are no longer in use, the Garbage Collector removes them from memory to optimize performance.",
              },
              {
                question:
                  "How are Closures and Garbage Collector related to each other?",
                code: ` <pre><code className="language-javascript">
function a(){
  var x = 10;
    return function b(){
      console.log(x);
    }
  }
var y = a();
// y() will still have access to 'x' due to closure, preventing garbage collection
</code></pre>`,
                solution:
                  "In the example, `function b()` is a closure. Normally, after executing `a()`, all its memory (including variable `x`) should be garbage collected. However, because `b()` is a closure and it refers to variable `x`, the memory for `x` is retained, since `y()` might call `b()` later. This can lead to memory accumulation. However, modern browsers like Chrome and JS engines like V8 have smart garbage collection mechanisms that can identify unreachable variables and collect them efficiently.",
              },
            ],
            links: [
              "https://medium.com/@swati.developer17/part-13-closure-js-interview-questions-f31c1be77d3e",
              "https://medium.com/@swati.developer17/part-12-settimeout-closures-interview-questions-cfa0d402831f",
              "https://dev.to/jps27cse/exploring-asynchronous-javascript-callbacks-promises-and-asyncawait-16k6",
            ],
          },
          {
            topic: "Promises and Asynchronous JavaScript",
            tags: [""],
            explanation: `<div>
            <p style="line-height: 1.75; margin-top: 1.5rem;">
            Promises in JavaScript are used to handle asynchronous operations like fetching data from a server, reading files, or waiting for an event to happen without blocking the execution of other code.They provide a cleaner and more structured alternative to traditional callback-based asynchronous code. JavaScript is a single-threaded language, which means it can only perform one task at a time. To manage long-running tasks without freezing the interface or halting other code, JavaScript uses asynchronous patterns, such as Promises.
A Promise is an object representing the eventual completion (or failure) of an asynchronous operation. It allows you to attach callbacks to handle the result once it's available, even if the task takes time.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">
Key States of a Promise:
</h4>
<ol style="margin-top: 1.5rem; margin-left: 1.5rem; list-style-type: number; ">
     <li style="margin-top: 0.5rem;">
     <h5 style="margin-top: 1.5rem; font-size: 1.0rem; font-weight: 500; letter-spacing: -0.025em;">Pending: The initial state</h5>
     </li> The operation has started but is not yet complete.
<li style="margin-top: 0.5rem;">
<h5 style="margin-top: 1.5rem; font-size: 1.0rem; font-weight: 500; letter-spacing: -0.025em;">
Fulfilled:
</h5>
The operation completed successfully, and the Promise has a value.
</li>
<li style="margin-top: 0.5rem;">
<h5 style="margin-top: 1.5rem; font-size: 1.0rem; font-weight: 500; letter-spacing: -0.025em;">
Rejected:
</h5>
The operation failed, and the Promise has an error reason.
</li>
</ol>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">
Syntax :
</h4>
The Promise constructor accepts a function as its argument, which includes two parameters: resolve and reject. These parameters are functions that are invoked to signal either the successful completion or failure of the asynchronous task.
<p>
After a promise is made, you can handle its result using the <b>.then()</b> and <b>.catch()</b> methods. Use .then() when the promise is successful, and use .catch() when something goes wrong and the promise fails.
</p>
<pre><code className="language-javascript" >
function fetchDataFromServer() {
  return new Promise((resolve, reject) => {
    // Simulate an HTTP request to fetch data
    setTimeout(() => {
      const data = { id: 1, content: 'This is the fetched data' };
      // Simulate a successful response
      resolve(data);
      // Simulate an error
      // reject(new Error('Failed to fetch data'));
    }, 2000);
  });
}
// Using the fetchDataFromServer function
fetchDataFromServer()
  .then((data) => {
    console.log('Data received:', data);
    return data.content.toUpperCase();
  })
  .then((uppercasedData) => {
    console.log('Uppercased data:', uppercasedData);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
</pre> 
</code>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">
Methods of Promise :
</h4>

<ol style="margin-top: 1.5rem; margin-left: 1.5rem; list-style-type: number;">
<li style="margin-top: 0.5rem;">
 <p>The <b>Promise.all()</b> method lets you handle multiple promises at the same time. You give it an array of promises (or values), and it returns a new promise. This new promise:</p>
    <ul style="margin-top: 1.5rem; margin-left: 1.5rem; list-style-type: disc;">
        <li><strong>Resolves</strong> when all the promises in the array have finished successfully, returning an array of their results.</li>
        <li><strong>Rejects</strong> if any one of the promises fails (rejects), stopping everything and giving the first error it encounters.</li>
    </ul>

    <p>It’s useful when you want to run several tasks in parallel and wait for all of them to finish before moving forward.</p>

    <h5 style="margin-top: 1.5rem; font-size: 1.0rem; font-weight: 600; letter-spacing: -0.025em;">Key Points:</h5>
    <ul style="margin-top: 0.4rem; margin-left: 1.5rem; list-style-type: disc;">
        <li>If you pass an array of promises, it will wait for all of them to resolve.</li>
        <li>If one promise fails, <b>Promise.all()</b> immediately rejects and gives that error.</li>
        <li>If there are non-promises in the array, they are treated as resolved values.</li>
    </ul>
        <p>Example:</p>
        <pre><code className="language-javascript" >
const promiseA = new Promise((resolve, reject) => { <br>
&nbsp;&nbsp;setTimeout(resolve, 200, "value A"); <br>
}); // will be resolved after 200ms <br><br>

const promiseB = "non-promise value"; // non-promise value <br><br>

const promiseC = new Promise((resolve, reject) => { <br>
&nbsp;&nbsp;setTimeout(resolve, 400, "value C"); <br>
}); // will be resolved after 400ms <br><br>

Promise.all([promiseA, promiseB, promiseC]) <br>
&nbsp;&nbsp;.then((values) => { <br>
&nbsp;&nbsp;&nbsp;&nbsp;console.log(values); // Output: [ 'value A', 'non-promise value', 'value C' ] <br>
&nbsp;&nbsp;}) <br>
&nbsp;&nbsp;.catch((err) => { <br>
&nbsp;&nbsp;&nbsp;&nbsp;console.log(err); <br>
&nbsp;&nbsp;});
        </code>
        </pre>
        </li>
           
<li style="margin-top: 0.5rem;">
 <p>The <b>Promise.any()</b> method allows you to handle multiple promises concurrently. You provide it with an iterable (typically an array) of promises, and it returns a new promise. This new promise:</p>
    <ul style="margin-top: 1.5rem; margin-left: 1.5rem; list-style-type: disc;">
        <li><strong>Resolves</strong> as soon as any of the promises in the iterable fulfills, returning the value of that fulfilled promise.</li>
        <li><strong>Rejects</strong> only if all of the promises in the iterable are rejected, returning an AggregateError containing all rejection reasons.</li>
    </ul>
    <p>It's particularly useful when you want to run several tasks in parallel and proceed as soon as any one of them completes successfully.</p>

<h5 style="margin-top: 1.5rem; font-size: 1.0rem; font-weight: 600; letter-spacing: -0.025em;">Key Points:</h5>
<ul style="margin-top: 0.4rem; margin-left: 1.5rem; list-style-type: disc;">
    <li>It returns the first promise that fulfills, without waiting for other promises to complete.</li>
    <li>It short-circuits after the first fulfillment, ignoring any subsequent rejections or fulfillments.</li>
    <li>If the iterable contains non-promises, they are treated as already fulfilled promises.</li>
</ul>
    <pre><code className="language-javascript">
const SlowlyDone = new Promise((resolve, reject) => {
setTimeout(resolve, 500, "Done slowly");
}); // resolves after 500ms

const QuicklyDone = new Promise((resolve, reject) => {
setTimeout(resolve, 100, "Done quickly");
}); // resolves after 100ms

const Rejection = new Promise((resolve, reject) => {
setTimeout(reject, 100, "Rejected");
}); // always rejected

Promise.any([SlowlyDone, QuicklyDone, Rejection])
.then((value) => {
console.log(value); // Output: "Done quickly"
})
.catch((err) => {
console.log(err);
});
</code>
</pre>
</li>

<li style="margin-top: 0.5rem;">
 <p>The <b>Promise.prototype.finally()</b> method is a powerful tool in the Promise chain. It returns a Promise and executes a specified callback function when a Promise settles, regardless of whether it was fulfilled or rejected. Key features include:</p>
    <ul style="margin-top: 1.5rem; margin-left: 1.5rem; list-style-type: disc;">
        <li>Executes after a Promise is settled, whether resolved or rejected.</li>
        <li>Helps eliminate code duplication between Promise's then() and catch() handlers.</li>
        <li>Ideal for performing cleanup or finalizing operations, irrespective of the Promise's outcome.</li>
    </ul>
<p>This method is particularly useful when you need to perform certain actions or cleanups once a promise completes, regardless of its success or failure.</p>

<h5 style="margin-top: 1.5rem; font-size: 1.0rem; font-weight: 600; letter-spacing: -0.025em;">Key Points:</h5>
<ul style="margin-top: 0.4rem; margin-left: 1.5rem; list-style-type: disc;">
    <li>Always runs when the promise settles, whether fulfilled or rejected.</li>
    <li>Receives no arguments, making it unsuitable for processing the promise's result.</li>
    <li>Returns a Promise, allowing for further chaining if necessary.</li>
</ul>
    <p>Example:</p>
    <pre><code className="language-javascript">
const addition = (a, b) =>
new Promise((resolve, reject) => {
if (typeof a === "number" && typeof b === "number") {
resolve(a + b);
} else {
reject("Not a Number");
}
});
addition(10, 5)
.then((response) => {
console.log(response);
})
.catch((err) => {
console.log(err);
})
.finally(() => {
console.log("Operation completed");
});
/* Expected output:
15
Operation completed */
</code>
</pre>
</li>

<li style="margin-top: 0.5rem;">
 <p>The <b>Promise.race()</b> method is a unique tool in the Promise toolkit. It takes an iterable of promises and returns a new Promise that settles as soon as one of the input promises settles (either fulfills or rejects). Key characteristics include:</p>
    <ul style="margin-top: 1.5rem; margin-left: 1.5rem; list-style-type: disc;">
        <li>Returns a Promise that adopts the state of the first settled promise in the iterable.</li>
        <li>If the iterable is empty, the returned promise remains pending indefinitely.</li>
        <li>Non-promise values or already settled promises in the iterable are treated as immediately settled promises.</li>
    </ul>
<p>This method is particularly useful when you want to proceed with the first available result or error from a set of asynchronous operations.</p>

<h5 style="margin-top: 1.5rem; font-size: 1.0rem; font-weight: 600; letter-spacing: -0.025em;">Key Points:</h5>
<ul style="margin-top: 0.4rem; margin-left: 1.5rem; list-style-type: disc;">
    <li>Settles with the outcome of the first promise that settles, whether fulfilled or rejected.</li>
    <li>Can be used to implement timeouts for asynchronous operations.</li>
    <li>The order of promises in the iterable matters, as the fastest settling promise determines the outcome.</li>
</ul>
<pre><code className="language-javascript">
const pro1 = new Promise(resolve => setTimeout(() => resolve("one"), 200));
const pro2 = new Promise(resolve => setTimeout(() => resolve("two"), 100));
Promise.race([pro1, pro2])
.then(console.log)
.catch(console.error);
// Output: two

const pro3 = new Promise((_, reject) => setTimeout(() => reject("rejected"), 300));
const pro4 = new Promise(resolve => setTimeout(() => resolve("four"), 400));
Promise.race([pro3, pro4])
.then(console.log)
.catch(console.error);
// Output: rejected
</code></pre>

    <pre><code className="language-javascript">
const pro1 = new Promise(resolve => setTimeout(() => resolve("one"), 200));
const pro2 = new Promise(resolve => setTimeout(() => resolve("two"), 100));
const pro3 = new Promise((_, reject) => setTimeout(() => reject("rejected"), 300));
const pro4 = new Promise(resolve => setTimeout(() => resolve("four"), 400));
Promise.race([pro1, pro2, pro3, pro4])
.then(console.log)
.catch(console.error);
// Output: two
</code></pre>
<p>In this example, 'two' is output because pro2 settles first, demonstrating that Promise.race() responds to the fastest settling promise regardless of its position in the array.</p>
</li> 
</ol>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">
Asynchronous:
</h4>
<h2>Callbacks: The Original Approach</h2>
<p>
  In the early days of JavaScript, asynchronous tasks were handled using <strong>callbacks</strong>. A callback is a function passed as an argument to another function, which is called once the asynchronous task is completed.
</p>

<h4>Example of a Callback:</h4>
<pre>
<code>
console.log("Start");

// Simulate an API call with setTimeout
function fetchData(callback) {
  setTimeout(() => {
    callback("Data retrieved from the server");
  }, 2000);
}

fetchData((result) => {
  console.log(result);
});

console.log("End");
</code>
</pre>

<h4>Output:</h4>
<pre>
<code>
Start
End
Data retrieved from the server
</code>
</pre>

<h3>Problems with Callbacks:</h3>
<ul>
  <li>
    <strong>Callback Hell:</strong> When multiple asynchronous tasks are chained together, it can result in deeply nested and hard-to-read code.
  </li>
  <li>
    <strong>Error Handling:</strong> Managing errors across multiple callbacks becomes difficult and messy.
  </li>
</ul>

<h4>Callback Hell Example:</h4>
<pre>
<code>
fetchData((result1) => {
  processResult(result1, (result2) => {
    saveResult(result2, (result3) => {
      console.log(result3);
    });
  });
});
</code>
</pre>

<p>This nesting structure is known as <strong>callback hell</strong> or the <strong>pyramid of doom</strong>, which makes code harder to understand and maintain.</p>
<h2>Async/Await: Making Asynchronous Code Look Synchronous</h2>
<p>
  Introduced in ES2017, <strong>async/await</strong> is built on top of promises but provides a more concise and readable syntax. The <strong>await</strong> keyword makes JavaScript wait until a promise is resolved or rejected. It allows you to write asynchronous code that looks synchronous, making it much easier to read and maintain.
</p>

<h4>Example of Async/Await:</h4>
<pre>
<code>
console.log("Start");

async function fetchData() {
  try {
    const result = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Data retrieved from the server");
      }, 2000);
    });
    console.log(result);
  } catch (error) {
    console.log("Error:", error);
  }
}

fetchData();

console.log("End");
</code>
</pre>

<h4>Output:</h4>
<pre>
<code>
Start
End
Data retrieved from the server
</code>
</pre>

<h3>Advantages of Async/Await:</h3>
<ul>
  <li>
    <strong>Synchronous-Like Code:</strong> Makes asynchronous code look like synchronous code, which is easier to read and understand.
  </li>
  <li>
    <strong>Error Handling:</strong> Errors can be handled using <code>try...catch</code>, which is more intuitive than using <code>.catch()</code> with promises.
  </li>
  <li>
    <strong>Flat Structure:</strong> Eliminates promise chaining, making the code less nested and easier to follow.
  </li>
</ul>

<h4>Refactored Example Using Async/Await:</h4>
<pre>
<code>
async function handleData() {
  try {
    const result1 = await fetchData();
    const result2 = await processResult(result1);
    const result3 = await saveResult(result2);
    console.log(result3);
  } catch (error) {
    console.error("Error:", error);
  }
}

handleData();
</code>
</pre>

<p>
  Now, instead of chaining <code>.then()</code> calls, the asynchronous operations are executed in sequence, making the code look synchronous while still maintaining the benefits of asynchronous execution.
</p>

<h2>Evolution of Asynchronous JavaScript</h2>

<h3>1. Callbacks</h3>
<p>
  Callbacks were the original way to handle asynchronous tasks in JavaScript. A callback is a function passed as an argument to another function, which is executed once the asynchronous operation completes.
</p>
<p>
  <strong>Problem:</strong> Callbacks often led to deeply nested structures, commonly referred to as <em>callback hell</em>, making the code difficult to read and maintain.
</p>

<h3>2. Promises</h3>
<p>
  Promises improved the readability of asynchronous code by allowing <em>chaining</em>. They made it easier to work with multiple async tasks, helping developers avoid callback hell.
</p>
<p>
  <strong>Drawback:</strong> While promises were an improvement, chaining multiple promises could still become verbose and hard to manage for complex tasks.
</p>

<h3>3. Async/Await</h3>
<p>
  The <strong>async/await</strong> approach is the most modern solution for handling asynchronous tasks. It simplifies async code by making it look synchronous, while still providing the power of promises under the hood.
</p>
<p>
  <strong>Advantage:</strong> It provides a cleaner and more readable syntax, making it easier to handle async operations, especially when combined with <code>try...catch</code> for error handling.
</p>
</div>`,
            examples: [""],
            questions: [
              {
                question:
                  "What is the difference between Promise.all and Promise.allSettled?",
                solution: `
                  Promise.all returns a single promise that resolves when all promises in the input array resolve or rejects when any promise rejects. 
                  In contrast, Promise.allSettled returns a promise that resolves after all promises have either resolved or rejected.
            
                  Example of Promise.all:
                  <pre><code className="language-javascript">
Promise.all([promise1, promise2, promise3])
  .then(results => {
    // All promises resolved successfully
    })
                    .catch(error => {
                      // Any promise rejected
                    });
            
                  Example of Promise.allSettled:
                  Promise.allSettled([promise1, promise2, promise3])
                    .then(results => {
                      results.forEach(result => {
                        if (result.status === 'fulfilled') {
                          // Promise resolved successfully
                        } else if (result.status === 'rejected') {
                          // Promise rejected
                        }
                      });
                    });
</pre>
</code>
                  Summary: Promise.all stops at the first rejection, while Promise.allSettled collects the outcomes of all promises, even if some reject.
                `,
              },
              {
                question: "How do you handle errors in a chain of Promises?",
                solution: `
                  1. Use catch() blocks: Attach a catch block to the end of your promise chain to catch any errors.
            
                  Example:
                  promise1
                    .then(result1 => {
                      // handle result1
                    })
                    .catch(error => {
                      // handle error
                    });
            
                  2. Return a rejected promise: You can return a rejected promise using Promise.reject(error) to propagate errors to the next catch block.
            
                  Example:
                  promise1
                    .then(result1 => { /* handle result1 */ })
                    .catch(error => {
                      return Promise.reject(error);
                    })
                    .catch(error => {
                      // handle propagated error
                    });
            
                  3. Use try-catch blocks: Wrap promise handling in a try block and use a catch block to handle errors.
            
                  4. Use Promise.prototype.finally(): Add a finally block to execute code regardless of the promise outcome.
                `,
              },
              {
                question:
                  "What is the difference between async/await and using Promises with .then?",
                solution: `
                  Promises with .then:
                  - Use .then() for handling asynchronous operations.
                  - Can become nested and hard to read with multiple .then() calls.
                  - Errors are handled with .catch() blocks.
            
                  Async/await:
                  - Use async/await to make code look synchronous.
                  - Handle errors using try-catch blocks.
                  - Offers better readability, especially with multiple asynchronous operations.
            
                  Example using Promises:
                  promise1
                    .then(result => {
                      return promise2;
                    })
                    .then(result2 => {
                      // handle result
                    })
                    .catch(error => {
                      // handle error
                    });
            
                  Example using async/await:
                  async function example() {
                    try {
                      const result1 = await promise1;
                      const result2 = await promise2;
                    } catch (error) {
                      // handle error
                    }
                  }
            
                  Key differences:
                  - Async/await is easier to read and maintain.
                  - Async/await uses try-catch for error handling, while Promises use .catch().
                `,
              },
              {
                question: "How do you cancel a Promise?",
                solution: `
                  Promises cannot be canceled directly, but cancellation-like behavior can be implemented.
            
                  1. Use a cancel token: Libraries like axios support cancel tokens that can reject promises.
            
                  2. Use a wrapper promise: Create a wrapper that checks for cancellation and resolves/rejects accordingly.
            
                  Example of wrapper:
                  function cancelablePromise(promise) {
                    let isCancelled = false;
                    const wrapperPromise = new Promise((resolve, reject) => {
                      promise.then(result => {
                        if (!isCancelled) resolve(result);
                      }).catch(error => {
                        if (!isCancelled) reject(error);
                      });
                    });
                    return {
                      promise: wrapperPromise,
                      cancel() {
                        isCancelled = true;
                      },
                    };
                  }
            
                  3. Use async/await with a timeout: Reject the promise after a set time limit.
                `,
              },
              {
                question:
                  "What is the difference between a resolved Promise and a fulfilled Promise?",
                solution: `
                  Resolved: A promise is resolved when it has either been fulfilled or rejected. It refers to the final state of the promise.
            
                  Fulfilled: A promise is fulfilled when it has successfully resolved and returned a value.
            
                  In summary:
                  - Resolved includes both fulfilled and rejected promises.
                  - Fulfilled refers to a promise that successfully returned a value.
            
                  Example:
                  const promise = new Promise((resolve, reject) => {
                    setTimeout(() => resolve("Success!"), 1000);
                  });
            
                  promise.then(value => {
                    console.log(\`Promise is resolved and fulfilled with value: \${value}\`);
                  }).catch(error => {
                    console.log(\`Promise is resolved but rejected with error: \${error}\`);
                  });
                `,
              },
              {
                question:
                  "How do you handle multiple errors in a chain of Promises?",
                solution: `
                  1. Use catch blocks after each .then() to handle specific errors for each promise.
            
                  Example:
                  promise1
                    .then(result1 => { /* handle result1 */ })
                    .catch(error1 => { /* handle error1 */ })
                    .then(result2 => { /* handle result2 */ })
                    .catch(error2 => { /* handle error2 */ });
            
                  2. Return a rejected promise using Promise.reject(error) to propagate errors.
            
                  3. Use async/await with try-catch to handle errors in sequential operations.
                `,
              },
              {
                question: "What is the purpose of Promise.prototype.finally?",
                solution: `
                  Promise.prototype.finally allows code execution regardless of whether a promise is resolved or rejected.
            
                  - It is used for cleanup tasks, such as closing connections or releasing resources.
                  - It complements error handling by ensuring certain code runs no matter the outcome.
            
                  Example:
                  promise
                    .then(result => {
                      // handle result
                    })
                    .catch(error => {
                      // handle error
                    })
                    .finally(() => {
                      console.log("Promise settled");
                    });
                `,
              },
              {
                question:
                  "Can you explain the concept of 'Promise hell' and how to avoid it?",
                solution: `
                  Promise hell (also known as callback hell) refers to deeply nested and difficult-to-read Promise chains.
            
                  Characteristics of Promise hell:
                  - Deeply nested Promises or callbacks.
                  - Difficult to maintain and debug.
                  - Complicated error handling.
            
                  How to avoid Promise hell:
                  - Use async/await to write asynchronous code that looks synchronous.
                  - Break long chains into smaller, more manageable functions.
                  - Use promise libraries like Bluebird that offer improved chaining and error handling.
                  - Write modular code to handle tasks in isolation.
            
                  Example of Promise hell:
                  fetchData()
                    .then(data => {
                      return fetchMoreData(data)
                        .then(moreData => {
                          return fetchEvenMoreData(moreData)
                            .then(evenMoreData => {
                              // deeply nested
                            });
                        });
                    });
                `,
              },
              {
                question:
                  "How do you create a Promise that resolves after a certain amount of time?",
                solution: `
                  You can create a Promise that resolves after a set time using setTimeout.
            
                  Example:
                  function delay(ms) {
                    return new Promise(resolve => {
                      setTimeout(resolve, ms);
                    });
                  }
            
                  Usage:
                  delay(2000).then(() => {
                    console.log("Resolved after 2 seconds");
                  });
                `,
              },
            ],
            links: [
              "https://dev.to/swarnaliroy94/methods-of-promise-all-any-finally-o2e",
              "https://medium.com/deno-the-complete-reference/some-javascript-promise-interview-questions-2e2e6c668e89",
            ],
          },
          {
            topic: "Event Loop, Microtasks, and Macrotasks",
            tags: [""],
            explanation: `
    <p style="line-height: 1.75; margin-top: 1.5rem;">
        In JavaScript, the event loop is the mechanism that handles asynchronous operations and ensures that the JavaScript code is executed in an orderly fashion. JavaScript runs on a single thread, meaning it can only do one thing at a time. However, it manages to handle asynchronous tasks like I/O operations, network requests, and timers using the event loop.For synchronous operations javascript uses only Call Stack.
        Web API's like geolocation API, web storage API or setTimeout() methods are asynchronous in nature and they do not run on call satck. So, they done block the execution in the call stack. Web API's responses are placed in callback queue.
    </p>

  <p style="line-height: 1.75; margin-top: 1.5rem;">
        To understand how the event loop works, it is important to differentiate between microtasks and macrotasks, also known as tasks. Both are types of asynchronous operations, but they are handled differently in terms of their execution priority.
    </p>

    <h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">1. Microtasks</h4>
    <p>
        Microtasks are the smaller, higher-priority tasks that need to be executed as soon as the current JavaScript execution stack (or "call stack") is empty.
    </p>
    <p>
        Once the call stack is cleared, the event loop first looks at the microtask queue and executes all microtasks before moving on to other tasks (like macrotasks).
    </p>
    
    <h4 style="margin-top: 1.5rem; font-size: 1.0rem; font-weight: 600; letter-spacing: -0.025em;">Common Microtasks:</h4>
    <ul>
        <li>Promises (e.g., <code>.then()</code>, <code>.catch()</code>, <code>.finally()</code>)</li>
        <li>Await code block</li>
        <li><code>process.nextTick()</code> in Node.js</li>
    </ul>

    <h3 style="margin-top: 1.5rem; font-size: 1.0rem; font-weight: 600; letter-spacing: -0.025em">Characteristics:</h3>
    <ul>
        <li>Microtasks have a high priority, meaning once they are queued, they will be executed right after the current task (if the call stack is empty) and before any macrotask.</li>
        <li>If more microtasks are added during the execution of other microtasks, they are continuously processed until the microtask queue is empty.</li>
    </ul>

    <h3>Example of a Microtask:</h3>
    <pre><code class="language-javascript">
console.log('Start'); // (1)

setTimeout(() => {
  console.log('Timeout'); // (4) Macro task
}, 0);

Promise.resolve().then(() => {
  console.log('Promise 1'); // (3) Micro task
}).then(() => {
  console.log('Promise 2'); // (3) Micro task
});

console.log('End'); // (2)
    </code></pre>

    <h4>Output:</h4>
    <pre><code>
Start
End
Promise 1
Promise 2
Timeout
    </code></pre>

    <h4 style="margin-top: 1.5rem; font-size: 1.0rem; font-weight: 600; letter-spacing: -0.025em;">Explanation:</h4>
    <ul>
        <li>First, synchronous code (Start and End) runs.</li>
        <li>Then, microtasks (Promise 1 and Promise 2) run before any macrotask like <code>setTimeout</code>.</li>
        <li>Finally, the macrotask (<code>setTimeout</code>) is executed.</li>
    </ul>

    <h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">2. Macrotasks</h4>
    <p>
        Macrotasks (also called tasks) are lower-priority tasks and are handled after the microtask queue is emptied.
    </p>
    <p>
        After the microtask queue is cleared, the event loop picks one macrotask from the macrotask queue and executes it. After this, the loop checks the microtask queue again, and so on.
    </p>

    <h4 style="margin-top: 1.5rem; font-size: 1.0rem; font-weight: 600; letter-spacing: -0.025em;">Common Macrotasks:</h4>
    <ul>
        <li><code>setTimeout()</code></li>
        <li><code>setInterval()</code></li>
        <li><code>setImmediate()</code> (Node.js)</li>
        <li>I/O operations (e.g., network requests)</li>
        <li>UI rendering</li>
    </ul>

    <h4 style="margin-top: 1.5rem; font-size: 1.0rem; font-weight: 600; letter-spacing: -0.025em;">Characteristics:</h3>
    <ul>
        <li>Each macrotask is executed one at a time, and after the completion of each macrotask, the event loop checks the microtask queue before proceeding to the next macrotask.</li>
        <li>Macrotasks are queued and executed one by one, after all pending microtasks.</li>
    </ul>

    <h3>Example of a Macrotask:</h3>
    <pre><code class="language-javascript">
console.log('Start'); // (1)

setTimeout(() => {
  console.log('Timeout 1'); // (5) Macro task
}, 0);

setTimeout(() => {
  console.log('Timeout 2'); // (6) Macro task
}, 0);

Promise.resolve().then(() => {
  console.log('Promise 1'); // (3) Micro task
}).then(() => {
  console.log('Promise 2'); // (4) Micro task
});

console.log('End'); // (2)
    </code></pre>

    <h4>Output:</h4>
    <pre><code>
Start
End
Promise 1
Promise 2
Timeout 1
Timeout 2
    </code></pre>

    <h4>Explanation:</h4>
    <ul>
        <li>After running synchronous code (Start and End), all microtasks are executed before any macrotask.</li>
        <li>Once all microtasks (Promise 1 and Promise 2) are executed, the macrotasks (Timeout 1 and Timeout 2) are executed in the order they were scheduled.</li>
    </ul>
    <p>
    Event loop check if the call task is empty or not. If it  is empty then even loop takes callback queue tasks and places in the Call Stack
    </p>
     <h1>Event Loop Sequence</h1>
    <p>The event loop follows this sequence:</p>

    <ol>
        <li>Execute all synchronous code (directly within the script or the call stack).</li>
        <li>Process the microtasks queue (execute all microtasks).</li>
        <li>If no microtasks are left, pick one macrotask from the macrotask queue and execute it.</li>
        <li>Repeat the process by checking for microtasks again, then execute another macrotask, and so on.</li>
    </ol>
    `,
            examples: [""],
            questions: [{}],
            links: [
              "https://www.hellojavascript.info/docs/browser-related-questions/miscellaneous-browser-questions/event-loop-microtasks-macrotasks",
              "https://www.youtube.com/watch?v=eiC58R16hb8&t=664s",
            ],
          },
          {
            topic: "Higher-Order Functions",
            tags: [""],
            explanation: `
            <p style="margin-top: 1.0rem;">
A higher-order function is a function that either accepts one or more functions as arguments, returns a function as its result, or does both. This allows functions to be treated as first-class citizens in programming, enabling a more functional programming style.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Examples:</h4>
 <ol style="margin-top: 1.0rem; margin-left: 1.5rem; list-style-type: number; ">
<li style="margin-top: 0.5rem;">
<span style="font-weight: 600; font-size: 1.0rem;">
Functions as Arguments:
</span>
</li>

Array Methods: The map, filter, and reduce methods of arrays in JavaScript are classic examples of higher-order functions because they take another function as an argument.
javascript
 <pre><code class="language-javascript">
const numbers = [1, 2, 3, 4, 5];
// Using map to square each number
const squares = numbers.map(num => num * num); // [1, 4, 9, 16, 25]
// Using filter to get even numbers
const evens = numbers.filter(num => num % 2 === 0); // [2, 4]
// Using reduce to sum all numbers
const sum = numbers.reduce((acc, num) => acc + num, 0); // 15
</code>
</pre>

<li style="margin-top: 0.5rem;">
<span style="font-weight: 600; font-size: 1.0rem;">
Functions as Return Values:
</span>
</li>

A higher-order function can also return another function. This is useful for creating function factories or encapsulating behavior.
javascript
 <pre><code class="language-javascript">
function createCounter() {
  let count = 0;
  return function() {
    count += 1;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3</>
</code>
</pre>

<h4 style="margin-top: 1.0rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Practical Use Case :</h4>
<ol style="margin-top: 1.0rem; margin-left: 1.5rem; list-style-type: number; "> 
<li style="margin-top: 0.5rem;">
<span style="font-weight: 600; font-size: 1.0rem;">
Currying
</span>
</li>
<p>
 Higher-order functions can be used for currying, transforming a function that takes multiple arguments into a sequence of functions that each take a single argument.
</p>
<pre><code class="language-javascript">
function multiply(a) {
  return function(b) {
    return a * b;
  };
}

const double = multiply(2);
console.log(double(5)); // 10
</code>
</pre>

<li style="margin-top: 0.5rem;"><span style="font-weight: 600; font-size: 1.0rem;">
Event Handling
</span>
</li>
<p>
Higher-order functions are often used in event handling, allowing you to encapsulate behavior and create reusable event handlers.
</p>
Example: Creating Event Handlers
<pre><code class="language-javascript">
function createClickHandler(message) {
  return function() {
    console.log(message);
  };
}

const button1Handler = createClickHandler("Button 1 clicked!");
const button2Handler = createClickHandler("Button 2 clicked!");

// Assume button1 and button2 are DOM elements
button1.addEventListener("click", button1Handler);
button2.addEventListener("click", button2Handler);
</code>
</pre>
<li style="margin-top: 0.5rem;">
<span style="font-weight: 600; font-size: 1.0rem;">
Function Composition
</span>
</li>
<p>
Higher-order functions can be used to create composed functions that combine multiple behaviors.
</p>

Example: Function Composition
<pre><code class="language-javascript">
const double = x => x * 2;
const square = x => x * x;

const compose = (f, g) => x => f(g(x));

const doubleThenSquare = compose(square, double);
console.log(doubleThenSquare(3)); // (3 * 2) ^ 2 = 36
</code>
</pre>
</ol>
`,
            examples: [""],
            questions: [
              {
                question:
                  "Explain the concept of the message queue in the context of the Event Loop.",
                solution:
                  "The message queue is where asynchronous events and their respective callback functions are held. When an asynchronous event occurs (like a timer completion or an HTTP request response), its callback is placed in the message queue.",
              },
              {
                question:
                  "Can you explain the difference between the microtask queue and the task queue in JavaScript?",
                solution:
                  "Both queues are used to store callbacks, but the microtask queue (also known as Job Queue) has a higher priority and is processed before the task queue. Microtasks typically include Promises, whereas the task queue includes other asynchronous tasks like setTimeout callbacks.",
              },
              {
                question:
                  "Can you explain the difference between setTimeout and setImmediate?",
                solution:
                  "`setTimeout` schedules a callback function to be executed after a specified delay (minimum of 4ms in browsers), whereas `setImmediate` schedules a callback to be executed in the next iteration of the Event Loop, but it’s not universally supported (primarily in Node.js).",
              },
              {
                question:
                  "Can you explain the concept of race conditions in JavaScript and how the Event Loop helps in preventing them?",
                solution:
                  "Race conditions occur when the output of code is dependent on the sequence/timing of asynchronous operations. The Event Loop ensures proper order of execution by queuing callbacks, preventing unpredictable outcomes in concurrent operations.",
              },
              {
                question: "Can you explain what the Message Queue is?",
                solution:
                  "The Message Queue in JavaScript stores callbacks from asynchronous operations like events or timeouts, which are processed by the Event Loop when the Call Stack is empty.",
              },
              {
                question: "What is process.nextTick() in Node.js?",
                solution: `The \`process.nextTick()\` is a Node.js method that adds a callback to the "nextTick queue", which is processed after the current operation completes but before the Event Loop continues.
                <pre><code className="language-javascript">
                console.log('Start');
                process.nextTick(() => {   
                  console.log('nextTick callback');
                  });
                  console.log('End');
                  // Output:
                  // Start
                  // End
                  // nextTick callback
                  </code>
                  </pre>
                  <p>
                  In this example, process.nextTick() schedules the callback function to be invoked in the next iteration of the event loop, but before any other I/O events or timers fire. Despite its placement after the second console.log() statement, the 'nextTick callback' message is logged after 'End'.
                  </p>`,
              },
              {
                question: `What will be printed after executing the code?`,
                solution: `<pre><code className="language-javascript">
     async function async1() {
      console.log("async1 start");
        await async2();
         console.log("async1 end");
      }
      
      async function async2() {
        console.log("async2");
      }
      
      console.log("script start");
      
      setTimeout(function () {
        console.log("setTimeout");
      }, 0);
      
      async1();
      
      new Promise(function (resolve) {
        console.log("promise1");
        resolve();
      }).then(function () {
        console.log("promise2");
      });
      
      console.log("script end");
      </code>
      </pre>
                <span>The difference from the previous question is that this question has async syntax. The answer is below, and we will analyze it line by line.\n\n
      1. When the program is executed, it will first print "script start". Then, \`setTimeout\` will be put into the macrotask queue.
      2. Next, it calls the \`async1\` function, prints "async1 start", then calls \`await async2()\` which causes "async2" to be printed.
      3. \`await\` causes the rest of the \`async1\` function (printing "async1 end") to be put into the microtask queue.
      4. The program continues executing and encounters the Promise. It prints "promise1", resolves the promise, and places \`.then\` (which prints "promise2") into the microtask queue.
      5. The program finishes executing the main script and prints "script end".
      6. After the main script is done, the event loop processes the microtasks. It first prints "async1 end" from the microtask queue, followed by "promise2".
      7. Finally, the event loop processes the macrotasks, printing "setTimeout" from the macrotask queue.
      \nThe final output will be:\n\n
      "script start"
      "async1 start"
      "async2"
      "promise1"
      "script end"
      "async1 end"
      "promise2"
      "setTimeout </span>"`,
              },
            ],
            links: [
              "https://medium.com/@a35851150/interview-qustions-on-event-loop-in-js-901c567a1271",
            ],
          },
          {
            topic: "Prototypal Inheritance",
            tags: [""],
            explanation: `<>Prototype inheritance is a feature in javascript which lets you share property and mehtods of other object so that you dont have to copy these properties everywhere.
            Imagine you have an object like a "blueprint" that has some properties (like a name) and methods (like a function to say hello). Other objects can "inherit" or borrow those properties and methods, meaning they can use them even if they don't directly have them.

For example:
const animal = {
  speak() {
    console.log("I am an animal");
  }
};

const dog = Object.create(animal);  // dog borrows properties from animal
dog.speak(); // Output: "I am an animal"
Here, dog doesn't have a speak function on its own, but it looks at the animal object to find it and uses it.</>`,
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Modules (ES6 Modules)",
            tags: [""],
            explanation: `
            <p>
            ES6 (ECMAScript 2015) introduced a native module system to JavaScript, which allows developers to organize their code more efficiently and effectively. Modules are basically separate pieces of code that can be moved from one file to another and to another. This helps manage code dependencies, reuse, and maintenance on large code bases. Modules also act as the foundation of many JavaScript design patterns. Most of the JavaScript modules export an object literal, a function, or a constructor
            </p>
            <h4 style="margin-top: 1.0rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Benefite of using Modules</h4>
            <ol style="margin-top: 1.0rem; margin-left: 1.5rem; list-style-type: number; ">
  <li style="margin-top: 0.5rem;"><strong>Encapsulation:</strong> Modules allow you to keep related code together and avoid polluting the global namespace.</li>
  <li style="margin-top: 0.5rem;"><strong>Reusability:</strong> You can reuse code across different parts of the application or even across different projects.</li>
  <li style="margin-top: 0.5rem;"><strong>Maintainability:</strong> It becomes easier to maintain large codebases by breaking the code into smaller, manageable modules.</li>
  <li style="margin-top: 0.5rem;"><strong>Better Tooling:</strong> ES6 modules provide static structure, enabling better tooling, such as tree shaking (removing unused exports).</li>
</ol>
<h4 style="margin-top: 1.0rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Key Concepts</h4>
<ol style="margin-top: 1.0rem; margin-left: 1.5rem; list-style-type: number;">
  <li style="margin-top: 0.5rem;">
    <strong>Exporting and Importing:</strong> ES6 modules allow you to explicitly export functions, variables, or classes from a module and import them into another module.
    <ol>
      <li style="margin-top: 0.5rem;">
        <strong>Exporting:</strong> You can export values in two ways: named exports and default exports.
        <ul>
          <li style="margin-top: 0.5rem;">
            <strong>Named Exports:</strong> You can export multiple items from a module.
            <pre><code> // mathUtils.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;</code></pre>
          </li>
          <li style="margin-top: 0.5rem;">
            <strong>Default Exports:</strong> A module can have one default export. This is useful when a module has one main thing to export.
            <pre><code> // greeting.js
const greet = (name) => Hello, {name};
export default greet;</code></pre>
          </li>
        </ul>
      </li>
      <li style="margin-top: 0.5rem;">
        <strong>Importing:</strong> To use the exported values from one module in another, you import them.
        <ul>
          <li style="margin-top: 0.5rem;">
            <strong>Importing Named Exports:</strong> You must use the same names as the exported variables.
            <pre><code> // app.js
import { add, subtract } from './mathUtils.js';
console.log(add(5, 3)); // 8
console.log(subtract(5, 3)); // 2;</code></pre>
          </li>
          <li style="margin-top: 0.5rem;">
            <strong>Importing Default Exports:</strong> You can name the default import anything.
            <pre><code> // app.js
import greet from './greeting.js';
console.log(greet('Alice')); // "Hello, Alice!";</code></pre>
          </li>
        </ul>
      </li>
    </ol>
  </li>
  <li style="margin-top: 0.5rem;">
    <strong>Named Exports with Aliases:</strong> If you want to import an item using a different name, you can alias it during import.
    <pre><code>import { add as sum } from './mathUtils.js';
console.log(sum(5, 3)); // 8;</code></pre>
  </li>
  <li style="margin-top: 0.5rem;">
    <strong>Import All from a Module:</strong> You can import everything from a module and assign it to a namespace object.
    <pre><code>import * as math from './mathUtils.js';
console.log(math.add(5, 3)); // 8
console.log(math.subtract(5, 3)); // 2;</code></pre>
  </li>
  <li style="margin-top: 0.5rem;">
    <strong>Re-exporting (Aggregating Modules):</strong> Sometimes you might want to re-export items from one module into another.
    <pre><code> // moreUtils.js
export * from './mathUtils.js';</code></pre>
  </li>
  <li style="margin-top: 0.5rem;">
    <strong>Module Scope:</strong> Variables and functions defined inside a module are scoped to that module by default, meaning they are not accessible in the global scope unless explicitly exported.
  </li>
  <li style="margin-top: 0.5rem;">
    <strong>Modules Are Static:</strong> ES6 modules are statically analyzed. This means that imports and exports are resolved at compile-time, not at runtime. It allows JavaScript engines to optimize modules better, and it ensures that circular dependencies are handled correctly.
  </li>
  <li style="margin-top: 0.5rem;">
    <strong>Strict Mode by Default:</strong> All ES6 modules automatically use strict mode, which helps prevent certain bugs by enforcing stricter parsing and error handling in JavaScript.
  </li>
  <li style="margin-top: 0.5rem;">
    <strong>Browser Support and Loading Modules:</strong> Browsers support ES6 modules with <code>&lt;script type="module"&gt;</code>. Using this, you can directly include modules in your HTML files:
    <pre><code>&lt;script type="module"&gt;
  import { add } from './mathUtils.js';
  console.log(add(5, 3)); // 8
&lt;/script&gt;</code></pre>
    Modules Are Deferred: By default, ES6 modules in browsers are deferred, meaning they are only executed after the HTML document is completely parsed.
    <br/>
    Relative and Absolute Paths: When importing modules, you need to use file paths (relative or absolute). For example:
    <pre><code>import { add } from './utils/math.js'; // relative path</code></pre>
  </li>
</ol>`,
            examples: [""],
            questions: [{
              question: "What are ES6 modules, and how do they differ from traditional JavaScript scripts?",
              solution: `ES6 modules are a way to structure JavaScript code into reusable pieces. Unlike traditional scripts that can pollute the global namespace, modules encapsulate their code, allowing for better organization and maintainability. ES6 modules use the import and export keywords to share functionality between files.
              <pre><code className="language-javascript">
// math.js
export const add = (a, b) => a + b;
// app.js
import { add } from './math.js';
console.log(add(2, 3)); // 5
</code></pre>`
            },
            {
              question: "What is the difference between named exports and default exports?",
              solution: `Named exports allow you to export multiple variables or functions from a module, while a default export allows you to export a single entity from a module.
              <pre><code className="language-javascript">
// Named exports
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;            
// Default export
const greet = (name) => \`Hello, \${name}!\`;
export default greet;
</code></pre>`
            },
            {
              question: "How do you import a default export and a named export from a module?",
              solution: `To import both a default export and named exports, you can do the following:
              <pre><code className="language-javascript">
import greet, { add, subtract } from './math.js';
console.log(greet('Alice')); // "Hello, Alice!"
console.log(add(5, 3)); // 8
console.log(subtract(5, 3)); // 2
</code></pre>`
            },
            {
              question: "What is module scope, and how does it differ from global scope?",
              solution: `Module scope means that variables and functions defined within a module are not accessible outside of that module unless they are explicitly exported. In contrast, global scope allows variables and functions to be accessed anywhere in the application.
              <pre><code className="language-javascript">
// math.js
const privateVar = 42; // Not accessible outside this module
export const publicVar = 'I am public'; // Accessible
</code></pre>`
            },
            {
              question: "What are re-exports in ES6 modules?",
              solution: `Re-exports allow you to export items from one module into another. This can be useful for aggregating exports.
              <pre><code className="language-javascript">
// moreUtils.js
export * from './mathUtils.js'; // Re-exports all exports from mathUtils.js
</code></pre>`
            },
            {
              question: "Can you explain circular dependencies in ES6 modules?",
              solution: `Circular dependencies occur when two or more modules depend on each other. This can lead to issues where one module may not be fully defined when another module tries to use it. It's generally best to avoid circular dependencies or to refactor the code to eliminate them.
              <pre><code className="language-javascript">
// a.js
import { b } from './b.js';
// b.js
import { a } from './a.js';
</code></pre>`
            },
            {
              question: "How do you load ES6 modules in a web browser?",
              solution: `You can load ES6 modules in a web browser by using the script type="module" tag in your HTML file. This allows you to directly include and use modules.type="module" tag`
            }
            ],
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
