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
            questions: [
              {
                question:
                  "What are ES6 modules, and how do they differ from traditional JavaScript scripts?",
                solution: `ES6 modules are a way to structure JavaScript code into reusable pieces. Unlike traditional scripts that can pollute the global namespace, modules encapsulate their code, allowing for better organization and maintainability. ES6 modules use the import and export keywords to share functionality between files.
              <pre><code className="language-javascript">
// math.js
export const add = (a, b) => a + b;
// app.js
import { add } from './math.js';
console.log(add(2, 3)); // 5
</code></pre>`,
              },
              {
                question:
                  "What is the difference between named exports and default exports?",
                solution: `Named exports allow you to export multiple variables or functions from a module, while a default export allows you to export a single entity from a module.
              <pre><code className="language-javascript">
// Named exports
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;            
// Default export
const greet = (name) => \`Hello, \${name}!\`;
export default greet;
</code></pre>`,
              },
              {
                question:
                  "How do you import a default export and a named export from a module?",
                solution: `To import both a default export and named exports, you can do the following:
              <pre><code className="language-javascript">
import greet, { add, subtract } from './math.js';
console.log(greet('Alice')); // "Hello, Alice!"
console.log(add(5, 3)); // 8
console.log(subtract(5, 3)); // 2
</code></pre>`,
              },
              {
                question:
                  "What is module scope, and how does it differ from global scope?",
                solution: `Module scope means that variables and functions defined within a module are not accessible outside of that module unless they are explicitly exported. In contrast, global scope allows variables and functions to be accessed anywhere in the application.
              <pre><code className="language-javascript">
// math.js
const privateVar = 42; // Not accessible outside this module
export const publicVar = 'I am public'; // Accessible
</code></pre>`,
              },
              {
                question: "What are re-exports in ES6 modules?",
                solution: `Re-exports allow you to export items from one module into another. This can be useful for aggregating exports.
              <pre><code className="language-javascript">
// moreUtils.js
export * from './mathUtils.js'; // Re-exports all exports from mathUtils.js
</code></pre>`,
              },
              {
                question:
                  "Can you explain circular dependencies in ES6 modules?",
                solution: `Circular dependencies occur when two or more modules depend on each other. This can lead to issues where one module may not be fully defined when another module tries to use it. It's generally best to avoid circular dependencies or to refactor the code to eliminate them.
              <pre><code className="language-javascript">
// a.js
import { b } from './b.js';
// b.js
import { a } from './a.js';
</code></pre>`,
              },
              {
                question: "How do you load ES6 modules in a web browser?",
                solution: `You can load ES6 modules in a web browser by using the script type="module" tag in your HTML file. This allows you to directly include and use modules.type="module" tag`,
              },
            ],
            links: [""],
          },
          {
            topic: "Currying",
            tags: [""],
            explanation: `<div>
<p style="margin-top: 1.0rem;">
Currying is a functional programming technique where a function that takes multiple arguments is transformed into a chain of functions, each taking a single argument. Instead of passing all arguments to the function at once, you pass them separately, returning a new function for each argument until all arguments are provided.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Basic Concept</h4>
<p style="margin-top: 1.0rem;">
In a normal function, you might have something like this:
</p>

<pre><code class="language-javascript">
function add(a, b) {
  return a + b;
}

console.log(add(2, 3)); // Outputs: 5
</code></pre>

<p style="margin-top: 1.0rem;">
In a curried version of this function, instead of taking two arguments at once, it would look like this:
</p>

<pre><code class="language-javascript">
function add(a) {
  return function(b) {
    return a + b;
  };
}

console.log(add(2)(3)); // Outputs: 5
</code></pre>

<p style="margin-top: 1.0rem;">
Here, <code>add(2)</code> returns a new function that takes <code>b</code> as an argument and adds it to <code>a</code>. This process of breaking down the function into smaller functions is what makes it "curried."
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Why Use Currying?</h4>
<ol style="margin-top: 1.0rem; margin-left: 1.5rem; list-style-type: number;">
  <li style="margin-top: 0.5rem;">
    <span style="font-weight: 600; font-size: 1.0rem;">Partial Application:</span>
    <p style="margin-top: 1.0rem;">Currying allows you to partially apply a function by pre-filling some of its arguments and creating a new function with the remaining arguments.</p>
    <pre><code class="language-javascript">
const addTwo = add(2); // returns a new function that adds 2 to any argument you pass.
console.log(addTwo(5)); // Outputs: 7
    </code></pre>
  </li>

  <li style="margin-top: 0.5rem;">
    <span style="font-weight: 600; font-size: 1.0rem;">Code Reusability:</span>
    <p style="margin-top: 1.0rem;">It permits more reusability by creating more specific functions from generic ones.</p>
  </li>

  <li style="margin-top: 0.5rem;">
    <span style="font-weight: 600; font-size: 1.0rem;">Avoid Repetition:</span>
    <p style="margin-top: 1.0rem;">Currying can reduce repetition when you deal with multiple similar functions that share the same parameters.</p>
  </li>

  <li style="margin-top: 0.5rem;">
    <span style="font-weight: 600; font-size: 1.0rem;">Functional Composition:</span>
    <p style="margin-top: 1.0rem;">Currying helps with functional composition, allowing for easier chaining of functions, especially in frameworks or libraries that rely on functional programming.</p>
  </li>
</ol>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Real-World Example</h4>
<p style="margin-top: 1.0rem;">
Here’s how currying might be used in a real scenario, such as logging with a pre-defined log level:
</p>

<pre><code class="language-javascript">
function log(level) {
  return function(message) {
    console.log([level] message);
  };
}

const errorLog = log('ERROR');
const infoLog = log('INFO');

errorLog('Something went wrong'); // Outputs: [ERROR] Something went wrong
infoLog('This is an informational message'); // Outputs: [INFO] This is an informational message
</code></pre>
</div>
`,
            examples: [""],
            questions: [
              {
                question:
                  "What is the difference between curried and non-curried functions?",
                solution:
                  "<p>Non-curried functions take all arguments at once, whereas curried functions take them one at a time, returning a new function for each argument until all arguments are provided. For example, a non-curried function might look like <code>function add(a, b) { return a + b; }</code>, whereas a curried version would be <code>function add(a) { return function(b) { return a + b; }; }</code>.</p>",
              },
              {
                question:
                  "How would you optimize a curried function when dealing with a large number of arguments?",
                solution:
                  "<p>Optimizing a curried function with a large number of arguments involves using techniques such as memoization to cache the intermediate results and avoid redundant computations. Another approach could be tail recursion optimization (if supported by the JavaScript engine) to prevent deep recursion stacks. Additionally, you could group some arguments together to reduce the number of functions in the curried chain.</p>",
              },
              {
                question:
                  "How does currying help with functional composition, and can you give an example where currying simplifies real-world business logic?",
                solution:
                  "<p>Currying simplifies functional composition by making it easier to pass functions as data and chain them together. In real-world business logic, currying is useful for breaking complex processes into smaller steps. For example, in an e-commerce app, currying can be used to first apply user discounts, then add taxes, and finally compute the total amount. Here's an example:</p> <pre><code class='language-javascript'>function applyDiscount(discount) { return function(price) { return price - (price * discount); }; } function applyTax(tax) { return function(price) { return price + (price * tax); }; } const calculateTotal = compose(applyTax(0.15), applyDiscount(0.10)); console.log(calculateTotal(100)); // Calculates total after discount and tax.</code></pre>",
              },
              {
                question:
                  "In what scenarios would currying introduce more complexity rather than simplifying code?",
                solution:
                  "<p>Currying introduces complexity when the functions don't naturally lend themselves to partial application or when too many arguments are required, leading to deeply nested function calls. For instance, currying can become cumbersome when managing highly dynamic or optional parameters. In these cases, the readability and maintainability of the code might suffer, especially for teams unfamiliar with functional programming concepts.</p>",
              },
              {
                question:
                  "Can you explain how currying can be used to control side effects, particularly in asynchronous operations or API calls?",
                solution:
                  "<p>Currying can help control side effects by isolating logic in smaller functions. For example, in an asynchronous API call, you can curry functions to handle different stages of the call: preparing the request, sending the request, and handling the response. This makes the code modular and reusable. Here's an example:</p> <pre><code class='language-javascript'>function makeApiCall(baseUrl) { return function(endpoint) { return function(data) { return fetch(baseUrl + endpoint, { method: 'POST', body: JSON.stringify(data) }) .then(response => response.json()); }; }; } const apiCall = makeApiCall('https://api.example.com'); const postUser = apiCall('/users'); postUser({ name: 'John' }).then(console.log);</code></pre> <p>Here, side effects (like API calls) are delayed until all arguments are supplied, giving control over when the effect actually occurs.</p>",
              },
              {
                question:
                  "How can currying be used in an event-driven system like React, and what are the trade-offs?",
                solution:
                  "<p>In React or any event-driven system, currying can be used to create handlers that pre-fill certain arguments based on context or state. For instance, you might curry a click handler to partially apply a state or ID. However, the trade-off is that currying can lead to more complex debugging, as intermediate functions might clutter the call stack and make tracing more difficult. In addition, currying in React must be used cautiously to avoid unnecessary re-renders and performance bottlenecks due to new function instances being created in every render.</p>",
              },
              {
                question:
                  "Describe a situation where you had to refactor non-curried code into curried functions in a large codebase. What challenges did you face?",
                solution:
                  "<p>Refactoring non-curried code to use currying can simplify certain logic flows, but it comes with challenges such as maintaining backward compatibility and ensuring the changes don't introduce bugs. One common challenge is ensuring that teams are familiar with the functional programming paradigm, as not everyone may be comfortable with curried functions. Another challenge is maintaining readability, especially when debugging complex chains of curried functions. Thorough unit testing is necessary to ensure that partial applications still behave as expected after refactoring.</p>",
              },
              {
                question:
                  "What are the potential memory or performance impacts of currying in JavaScript, and how can you mitigate them?",
                solution:
                  "<p>Currying can introduce performance overhead, particularly in memory consumption, since each partially applied function may hold onto references to arguments in closures. This can lead to excessive memory usage if not managed properly. To mitigate this, you can use memoization to cache results or ensure that curried functions are not overused in scenarios where simple argument passing would suffice. Additionally, using tail-call optimization (where supported) can help reduce stack depth for recursive curried functions.</p>",
              },
              {
                question:
                  "How does currying differ from partial application, and in what situations would you prefer one over the other?",
                solution:
                  "<p>Currying transforms a function with multiple arguments into a chain of functions, each taking a single argument, while partial application fixes a number of arguments and returns a function that expects the rest. Currying is useful when you need to break down a function step-by-step for greater flexibility, while partial application is preferred when you have a known subset of arguments ready upfront. For example, currying allows for more reusable, fine-grained control over functions, whereas partial application simplifies reuse when certain arguments are predetermined.</p>",
              },
              {
                question:
                  "How would you implement a generic currying function in JavaScript that can handle any number of arguments?",
                solution:
                  "<p>A generic currying function can be implemented by recursively applying arguments until all are provided. Here's a sample implementation:</p><pre><code class='language-javascript'>function curry(fn) { const arity = fn.length; return function curried(...args) { if (args.length >= arity) { return fn(...args); } else { return function(...nextArgs) { return curried(...args, ...nextArgs); }; } }; }</code></pre><p>This function checks if the required number of arguments has been provided, and if not, it returns a function waiting for the remaining arguments. If all arguments are provided, it invokes the original function.</p>",
              },
              {
                question:
                  "What are the advantages and disadvantages of using currying in middleware functions, especially in frameworks like Express.js?",
                solution:
                  "<p>In middleware functions, currying can make it easier to create reusable components by pre-filling context or configurations before passing control to the next middleware. For example, you can curry a middleware that checks user roles, pre-filling the role to check:</p><pre><code class='language-javascript'>const requireRole = role => (req, res, next) => { if (req.user.role !== role) { res.status(403).send('Forbidden'); } else { next(); } };</code></pre><p>However, the disadvantage is that currying can make error handling more complicated, especially if the flow is interrupted by a missing argument, leading to subtle bugs. It may also introduce cognitive overhead for teams unfamiliar with this pattern in middleware logic.</p>",
              },
              {
                question:
                  "How would you debug issues related to incorrect arguments passed to curried functions, especially in deeply nested applications?",
                solution:
                  "<p>To debug incorrect arguments in curried functions, you can leverage techniques such as logging each step of the curried function to track how arguments are passed. For deeply nested applications, using a combination of stack traces and intermediate value checks (such as console.log in each curried function) can help pinpoint the step where the arguments go wrong. Another option is to write unit tests for each curried step to ensure that the right arguments are being passed down the chain.</p>",
              },
              {
                question:
                  "How would you apply currying to a function that interacts with a stateful system, such as a database, without causing side effects?",
                solution:
                  "<p>When interacting with a stateful system like a database, currying should be used carefully to avoid side effects by isolating state mutations. You can create curried functions that build up the query parameters or conditions incrementally before finally executing the query. For example:</p><pre><code class='language-javascript'>const buildQuery = table => column => value => `SELECT * FROM ${table} WHERE ${column} = '${value}'`; const queryUsers = buildQuery('users')('age')(25); // 'SELECT * FROM users WHERE age = 25'</code></pre><p>By deferring the actual database call until all parameters are supplied, you ensure that the curried function doesn’t inadvertently trigger state changes prematurely.</p>",
              },
              {
                question:
                  "How would you handle asynchronous operations inside curried functions, particularly with promises?",
                solution:
                  "<p>Currying can handle asynchronous operations by returning promises at each step of the function chain. This allows each step to wait for the previous one to resolve before proceeding:</p><pre><code class='language-javascript'>function asyncCurry(fn) { return function curried(...args) { return args.length >= fn.length ? Promise.resolve(fn(...args)) : (...nextArgs) => curried(...args, ...nextArgs); }; }</code></pre><p>This approach allows you to curry asynchronous functions by ensuring that all arguments are supplied before executing the final promise. Each step can perform an async operation and chain promises in a way that avoids nested callbacks.</p>",
              },
              {
                question:
                  "What are some real-world examples of currying in popular JavaScript libraries or frameworks, and how do they benefit from this pattern?",
                solution:
                  "<p>Currying is commonly used in libraries like Lodash and Ramda, where utility functions are curried by default to promote reusability. For example, Ramda's <code>R.map</code> function is curried, allowing you to first specify the function to apply and then the data structure:</p><pre><code class='language-javascript'>const increment = R.map(x => x + 1); const result = increment([1, 2, 3]); // [2, 3, 4]</code></pre><p>This pattern allows for flexible, reusable code, as you can partially apply functions and reuse them in different contexts without rewriting the entire logic.</p>",
              },
              {
                question:
                  "What are the potential downsides of overusing currying, particularly in large teams or projects?",
                solution:
                  "<p>Overusing currying can lead to code that is harder to understand and maintain, especially for developers unfamiliar with functional programming concepts. Currying can obscure the flow of data and make debugging more challenging, as errors may occur deep within a chain of curried functions. Additionally, over-currying can result in excessive function creation, impacting performance. In large teams, clear documentation and consistent patterns are necessary to avoid confusion and ensure that the benefits of currying outweigh the added complexity.</p>",
              },
            ],
            links: [""],
          },
          {
            topic: "Memoization",
            tags: [""],
            explanation: `<div>
   <p style="line-height: 1.75; margin-top: 1.5rem;">Memoization is an optimization method used to improve the overall performance of capabilities by caching their formerly computed effects. When a memoized function is called with a given set of arguments, it first tests if the end result for the ones arguments is already saved in a cache. If so, it returns the cached end result instead of recalculating it. Otherwise, it computes the end result, stores it in the cache, and returns it.
   </p>
   <p style="line-height: 1.75; margin-top: 1.5rem;">
   Memoization is particularly beneficial in eventualities where a function is computationally high priced and is called frequently with the equal set of arguments. It helps keep away from redundant calculations and improves the performance of packages.
   </p>
    <pre><code className="language-javascript">
    function memoize(fn) {
    const cache = {};
    return function (...args) {
        const key = JSON.stringify(args);
        if (cache[key]) {
            console.log('Fetching from cache:', key);
            return cache[key];
        } else {
            console.log('Calculating result for:', key);
            const result = fn(...args);
            cache[key] = result;
            return result;
        }
    };
}

function slowFunction(num) {
    // Simulate an expensive computation
    let result = 0;
    for (let i = 0; i <= num; i++) {
        result += i;
    }
    return result;
}

const memoizedSlowFunction = memoize(slowFunction);

console.log(memoizedSlowFunction(5));  // Calculating result
console.log(memoizedSlowFunction(5));  // Fetching from cache
    </code></pre>
   </div>
            </>`,
            examples: [
              `let cache = {};
const addTen = function(num){
        if(num in cache){
          console.log("Inside Memoization block")
          return cache[num]
        }else{
          console.log("Inside Regular execution block")
          cache[num] = num + 10;
          return cache[num]
        }
}
console.log(addTen(20))
console.log(addTen(20))
Output of above snippet would be

Inside Regular execution block
30
Inside Memoization block
30`,
            ],
            questions: [
              {
                question:
                  "Can you write a memoization function for calculating the Fibonacci series?",
                solution: `<p>Here’s a memoization function for calculating the Fibonacci series:</p>
            <pre><code className="language-javascript">
            function memoizedFibonacci() {
              const cache = {};
              return function fib(n) {
                if (n < 2) {
                  return n;
                }
                if (cache[n]) {
                  return cache[n];
                }
                cache[n] = fib(n - 1) + fib(n - 2);
                return cache[n];
              };
            }
            
            const fibonacci = memoizedFibonacci();
            console.log(fibonacci(10)); // Outputs: 55
            console.log(fibonacci(5));  // Outputs: 5
            </code></pre>
            <p>This function caches previously computed Fibonacci numbers in the <code>cache</code> object, reducing the number of recursive calls and improving performance.</p>`,
              },
              {
                question:
                  "Can you write a memoization function for finding the factorial of a number?",
                solution: `<p>Here’s a memoization function for calculating the factorial of a number:</p>
            <pre><code className="language-javascript">
            function memoizedFactorial() {
              const cache = {};
              return function fact(n) {
                if (n === 0 || n === 1) {
                  return 1;
                }
                if (cache[n]) {
                  return cache[n];
                }
                cache[n] = n * fact(n - 1);
                return cache[n];
              };
            }
            
            const factorial = memoizedFactorial();
            console.log(factorial(5));  // Outputs: 120
            console.log(factorial(6));  // Outputs: 720
            </code></pre>
            <p>The <code>memoizedFactorial</code> function caches the results of previously computed factorials, speeding up future calls with the same input.</p>`,
              },
              {
                question: "What is memoization in JavaScript?",
                solution:
                  "<p>Memoization is an optimization technique used to speed up function execution by storing the results of expensive function calls and returning the cached result when the same inputs occur again. It prevents redundant calculations, improving performance.</p>",
              },
              {
                question:
                  "Can you provide an example of memoization in JavaScript?",
                solution: `<p>Here’s a simple example of a memoization function:</p>
            <pre><code className="language-javascript">
            function memoize(fn) {
              const cache = {};
              return function(...args) {
                const key = JSON.stringify(args);
                if (cache[key]) {
                  return cache[key];
                } else {
                  const result = fn(...args);
                  cache[key] = result;
                  return result;
                }
              };
            }
            
            function slowFunction(num) {
              let result = 0;
              for (let i = 0; i <= num; i++) {
                result += i;
              }
              return result;
            }
            
            const memoizedSlowFunction = memoize(slowFunction);
            
            console.log(memoizedSlowFunction(5)); // Calculates result
            console.log(memoizedSlowFunction(5)); // Returns cached result
            </code></pre>
            <p>In this example, the <code>memoize</code> function caches the results of the <code>slowFunction</code>. The second time it’s called with the same argument, it returns the cached result instead of recalculating it.</p>`,
              },
              {
                question: "When should you use memoization?",
                solution:
                  "<p>Memoization should be used when a function is computationally expensive and is frequently called with the same arguments. This can happen in recursive algorithms (e.g., Fibonacci) or in situations where data fetching is repeated with the same parameters.</p>",
              },
              {
                question: "What are the trade-offs of memoization?",
                solution:
                  "<p>While memoization can improve performance by reducing redundant calculations, it comes with the cost of increased memory usage to store cached results. For large input spaces, this memory overhead can become significant. You may need to implement cache eviction strategies for long-running applications.</p>",
              },
              {
                question:
                  "How does memoization improve recursive algorithms like Fibonacci?",
                solution: `<p>Memoization optimizes recursive algorithms like Fibonacci by storing the results of subproblems to avoid redundant calculations. Without memoization, a naive recursive Fibonacci algorithm recalculates the same values multiple times, leading to an exponential time complexity. Memoization reduces this to linear time complexity (O(n)).</p>
            <pre><code className="language-javascript">
            function memoizedFibonacci() {
              const cache = {};
              return function fib(n) {
                if (n < 2) {
                  return n;
                }
                if (cache[n]) {
                  return cache[n];
                }
                cache[n] = fib(n - 1) + fib(n - 2);
                return cache[n];
              };
            }
            
            const fibonacci = memoizedFibonacci();
            console.log(fibonacci(10)); // Efficiently calculates the 10th Fibonacci number
            </code></pre>
            <p>In this example, the Fibonacci function uses memoization to store the results of previously computed Fibonacci numbers in the <code>cache</code>, improving performance.</p>`,
              },
              {
                question: "Can memoization be applied to all functions?",
                solution:
                  "<p>No, memoization is best suited for pure functions, i.e., functions that return the same output given the same input without side effects. Functions that rely on external states or have non-deterministic behavior, such as generating random values or making network requests, are not suitable for memoization.</p>",
              },
              {
                question:
                  "How would you handle memoization for functions with complex inputs (objects or arrays)?",
                solution: `<p>For functions with complex inputs like objects or arrays, memoization can be challenging because object references differ even if their contents are identical. One approach is to use <code>JSON.stringify()</code> to convert inputs into strings, which can be used as cache keys.</p>
            <pre><code className="language-javascript">
            function memoize(fn) {
              const cache = {};
              return function(...args) {
                const key = JSON.stringify(args);
                if (cache[key]) {
                  return cache[key];
                } else {
                  const result = fn(...args);
                  cache[key] = result;
                  return result;
                }
              };
            }
            </code></pre>
            <p>However, this approach can be inefficient for large, deeply nested objects, so specialized libraries like <code>lodash.memoize</code> or custom deep comparison functions might be needed for more complex cases.</p>`,
              },
              {
                question:
                  "What is the difference between memoization and caching?",
                solution:
                  "<p>Memoization is a specific form of caching where the focus is on storing the results of function calls based on their input arguments. Caching, in a broader sense, refers to storing any kind of data for quick retrieval, such as HTTP responses or database queries. Memoization typically applies to individual function calls, while caching is more general-purpose.</p>",
              },
              {
                question:
                  "How would you implement cache eviction in a memoization system?",
                solution:
                  "<p>To manage the memory overhead of memoization, you can implement cache eviction strategies such as Least Recently Used (LRU). In an LRU cache, the least recently accessed entries are removed when the cache reaches a certain size. This helps manage memory usage efficiently.</p>",
              },
            ],
            links: [""],
          },
          {
            topic: "Generators and Iterators",
            tags: [""],
            explanation: `<p style="margin-top: 1.0rem;">
  Generators and Iterators in JavaScript are advanced functions that permit efficient coping with iterable data structures, like arrays or custom collections, in a flexible and memory-efficient way. Here’s an explanation of each concept:
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Iterators</h4>
<p style="margin-top: 1.0rem;">
  An iterator is an object that defines a series and potentially has a return value upon its termination. In JavaScript, an iterator is an object that conforms to the following protocol:
</p>
<ul style="margin-top: 1.0rem; margin-left: 1.5rem;">
  <li>It has a <code>next()</code> method, which returns an object with two properties:</li>
  <ul>
    <li><strong>value</strong>: the next value in the collection.</li>
    <li><strong>done</strong>: a boolean, which is <code>true</code> when the series is complete, and <code>false</code> otherwise.</li>
  </ul>
</ul>


<h4 style="margin-top: 1.0rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Example:</h4>
<pre><code class="language-javascript">
const iterator = [1, 2, 3][Symbol.iterator](); // Get iterator for the array

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
</code></pre>

<p style="margin-top: 1.0rem;">
  Here, the iterator walks through the array, yielding each value until it reaches the end, where <code>done</code> becomes <code>true</code>.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Generators</h4>
<p style="margin-top: 1.0rem;">
  A generator is a unique type of synchronous function in JavaScript that can be <span style="font-weight: 500">paused and resumed during its execution</span>. Generators help you define an iterative algorithm by writing a function that can <span style="font-weight: 500">yield multiple values</span>  , separately, based on how they are consumed.
</p>

<p style="margin-top: 1.0rem;">
  Generators are defined with the <code>function*</code> syntax and use the <code>yield</code> keyword to produce values.
</p>
<p>
 Generators can help with memory management by only creating objects when needed, whereas regular functions create all objects at once.</p>

<h4 style="margin-top: 1.0rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Example:</h4>
<pre><code class="language-javascript">
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numberGenerator();

console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }
</code></pre>
<p style="margin-top: 1.0rem;">
Here’s a real-life example of the use of a generator function in JavaScript to simulate an order processing system. This example represents an e-commerce order success procedure, wherein items are processed in batches, and each object can be yielded until the order is complete.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Yield and Yield*</h4>
<p style="margin-top: 1.0rem;">
  The <code>yield</code> statement pauses the generator function and returns a value to the caller. The <code>yield*</code> statement, however, delegates control to another generator or iterable.
</p>
<pre><code class="language-javascript">
function* delegatedGenerator() {
  yield 'Hello';
  yield* ['World', '!'];
  return 'Done!';
}

const iterator = delegatedGenerator();
console.log(iterator.next()); // { value: 'Hello', done: false }
console.log(iterator.next()); // { value: 'World', done: false }
console.log(iterator.next()); // { value: '!', done: false }
console.log(iterator.next()); // { value: 'Done!', done: true }
</code></pre>
<p style="margin-top: 1.0rem;">
  In this example, <code>yield*</code> delegates execution to an array, iterating over each element.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Return Statement</h4>
<p style="margin-top: 1.0rem;">
  The <code>return</code> statement in a generator ends its execution and returns a final value. This can be used alongside <code>yield</code> to return multiple values in sequence.
</p>
<pre><code class="language-javascript">
function* returnGenerator() {
  yield 'Hello';
  yield 'World';
  return 'Done!';
}

const iterator = returnGenerator();
console.log(iterator.next()); // { value: 'Hello', done: false }
console.log(iterator.next()); // { value: 'World', done: false }
console.log(iterator.next()); // { value: 'Done!', done: true }
</code></pre>
<p style="margin-top: 1.0rem;">
  The generator runs until the <code>return</code> statement is encountered, marking it complete with the final value.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Finally Statement</h4>
<p style="margin-top: 1.0rem;">
  The <code>finally</code> block ensures that cleanup code is executed after the generator finishes, even if an exception occurs during execution.

  </p>
<pre><code class="language-javascript">
function* finallyGenerator() {
  try {
    yield 'Hello';
    yield 'World';
    throw new Error('Something went wrong');
  } finally {
    console.log('Cleaning up resources');
  }
}

const iterator = finallyGenerator();
console.log(iterator.next()); // { value: 'Hello', done: false }
console.log(iterator.next()); // { value: 'World', done: false }
console.log(iterator.next()); // Error: Something went wrong
console.log(iterator.next()); // Cleaning up resources
</code></pre>
<p style="margin-top: 1.0rem;">
  The <code>finally</code> block runs cleanup tasks regardless of whether an exception was thrown.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Throw Statement</h4>
<p style="margin-top: 1.0rem;">
  The <code>throw</code> statement is used to throw an exception from the generator. It can also be used to handle errors internally within the generator.
</p>
<pre><code class="language-javascript">
function* throwGenerator() {
  try {
    yield 'Hello';
    yield 'World';
    throw new Error('Something went wrong');
  } catch (e) {
    console.log(e.message);
  }
}

const iterator = throwGenerator();
console.log(iterator.next()); // { value: 'Hello', done: false }
console.log(iterator.next()); // { value: 'World', done: false }
console.log(iterator.throw(new Error('Something else went wrong'))); // Error: Something else went wrong
</code></pre>
<p style="margin-top: 1.0rem;">
  The <code>throw</code> method allows external errors to be injected into the generator, which can be caught and handled.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Real-Life Example: Order Processing System</h4>
<p>
In this scenario, we're going to create a generator function that processes orders in batches. The generator will yield each order object and simulate a delay, representing the time taken to process each item.
</p>

<pre><code class="language-javascript">
// Generator function to simulate order processing
function* processOrders(orders) {
  for (const order of orders) {
    console.log(Processing order: order.id);
    yield new Promise((resolve) => {
      setTimeout(() => {
        console.log(Order order.id processed!);
        resolve(order);
      }, 1000); // Simulate processing time with a 1-second delay
    });
  }
}

// Sample orders
const orders = [
  { id: 1, item: 'Laptop' },
  { id: 2, item: 'Smartphone' },
  { id: 3, item: 'Headphones' },
];

// Function to handle orders asynchronously
async function handleOrders() {
  const orderGenerator = processOrders(orders);
  
  for (const orderPromise of orderGenerator) {
    const processedOrder = await orderPromise; // Wait for the order to be processed
    console.log(Processed: JSON.stringify(processedOrder)};
  }
  
  console.log('All orders processed!');
}

// Start processing orders
handleOrders();
</code></pre>

<h4 style="margin-top: 1.0rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Explanation:</h4>
<h5 style="margin-top: 1.0rem;">Generator Function:</h5>
<p>
processOrders(orders) is a generator function that takes an array of orders as input. It uses a for...of loop to iterate over each order, logging the order ID and yielding a promise that simulates the processing time.
</p>

<h5 style="margin-top: 1.0rem;">Yielding Promises:</h5>
<p>
Each time yield is called, the generator pauses, and a promise is returned that simulates the processing time for the order.When the generator yields a value (in this case, a promise), it pauses execution at that point. The calling code can resume it by iterating or invoking .next().
</p>
<h4 style="margin-top: 1.0rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Summary :</h4>
<ol style="margin-top: 1.0rem; margin-left: 1.5rem; list-style-type: number;">
  <li style="margin-top: 0.5rem;">Regular functions can return only a single value (or nothing), while generators can return multiple values using multiple <code>yield</code> statements.</li>
  <li style="margin-top: 0.5rem;">The <code>yield</code> keyword should be used exclusively within generator functions.</li>
  <li style="margin-top: 0.5rem;">The correct syntax for defining a generator function is <code>function* generatorFunc()</code> or <code>function *generatorFunc()</code>, both of which are valid.</li>
  <li style="margin-top: 0.5rem;">A generator function is considered iterable.</li>
  <li style="margin-top: 0.5rem;">The <code>yield*</code> syntax is used to delegate execution to another generator function (similar to recursion with generators).</li>
  <li style="margin-top: 0.5rem;">Generators allow for processes to pause and resume execution, making them a powerful and versatile feature of JavaScript, even though they are not frequently utilized.</li>
</ol>

`,
            examples: [
              [
                {
                  questions: "Example 1: Fibonacci Sequence Generator",
                  explanation: `
                  <p>This generator produces the Fibonacci sequence up to a given number <code>n</code>. It starts with two numbers, 0 and 1, and continuously yields values until the next number exceeds <code>n</code>.</p>
                  <pre><code>
                  function* fibonacciGenerator(n) {
                    let a = 0;
                    let b = 1;
                    while (a <= n) {
                      yield a;
                      [a, b] = [b, a + b]; // Destructuring to replace a and b
                    }
                  }
            
                  // Usage:
                  const fibGen = fibonacciGenerator(10);
                  for (const num of fibGen) {
                    console.log(num);
                  }
            
                  // Output: 0, 1, 1, 2, 3, 5, 8
                  </code></pre>
                  <ul>
                    <li>Generates Fibonacci sequence.</li>
                    <li>Stops when a number in the sequence exceeds <code>n</code>.</li>
                    <li>Uses <code>yield</code> to pause and return each value.</li>
                  </ul>
                `,
                },
                {
                  questions:
                    "Example 2: Lazy Loading an Array with a Generator",
                  explanation: `
                  <p>This generator implements a lazy loading mechanism by yielding chunks of data from an array in specified sizes. Instead of loading the entire array at once, it processes chunks lazily.</p>
                  <pre><code>
                  function* lazyLoadArray(data, chunkSize = 10) {
                    for (let i = 0; i < data.length; i += chunkSize) {
                      yield data.slice(i, i + chunkSize); // Yield chunks of array
                    }
                  }
            
                  const dataArray = [...Array(100).keys()]; // Array of 100 elements
                  const lazyLoader = lazyLoadArray(dataArray);
            
                  // Usage:
                  for (const chunk of lazyLoader) {
                    console.log(chunk); // Logs chunks of the array
                  }
                  </code></pre>
                  <ul>
                    <li>Loads data in chunks to reduce memory usage.</li>
                    <li>Supports lazy loading for pagination or infinite scrolling.</li>
                    <li>Efficient for large datasets.</li>
                  </ul>
                `,
                },
                {
                  questions: "Example 3: Delayed Yielding of Array Elements",
                  explanation: `
                  <p>This generator yields elements of an array with a 1-second delay between each. It uses <code>setTimeout</code> to create the delay and pauses between yields.</p>
                  <pre><code>
                  function* delayedGenerator(arr) {
                    for (const element of arr) {
                      yield element;
                      yield new Promise(resolve => setTimeout(resolve, 1000)); // 1-second delay
                    }
                  }
            
                  const arr = [1, 2, 3, 4, 5];
                  const gen = delayedGenerator(arr);
            
                  for (const element of gen) {
                    if (typeof element === 'number') {
                      console.log(element); // Logs array elements
                    }
                  }
                  </code></pre>
                  <ul>
                    <li>Delays between each element in the array.</li>
                    <li>Uses <code>yield</code> to pause and wait for 1 second.</li>
                    <li>Useful for pacing data processing or animations.</li>
                  </ul>
                `,
                },
              ],
            ],
            questions: [
              {
                question:
                  "What is a generator in JavaScript, and how is it different from a regular function?",
                solution:
                  "A generator in JavaScript is a special type of function that can pause and resume its execution. It is defined using the `function*` syntax. Unlike regular functions, which run to completion once invoked, generators allow you to pause the execution using `yield` and resume later with `next()`. This allows for more control over function execution and is useful for handling asynchronous code in a synchronous-like fashion.",
              },
              {
                question:
                  "How do you create and use a generator in JavaScript?",
                solution: `To create a generator, use the function* syntax. Inside the generator, use the 'yield' keyword to pause the execution and produce values. To use a generator, call it to return an iterator, then use the .next() method to resume execution and retrieve the next yielded value. Example: <pre><code class="language-javascript"> function* myGenerator() {\n  yield 1;\n  yield 2;\n  yield 3;\n}\nconst gen = myGenerator();\nconsole.log(gen.next().value); </code></pre>`,
              },
              {
                question:
                  "What is the purpose of the `yield` keyword in a generator function?",
                solution:
                  "The `yield` keyword is used to pause the execution of a generator function and return a value to the calling code. The function can then be resumed from where it left off when `.next()` is called. Each `yield` statement can return different values in successive calls of `.next()`.",
              },
              {
                question:
                  "What does the `.next()` method do in a generator function?",
                solution:
                  "The `.next()` method is used to resume the execution of a paused generator function. It returns an object with two properties: `value`, which is the value yielded by the generator, and `done`, which is a boolean indicating whether the generator has completed its execution.",
              },
              {
                question:
                  "Explain how to handle asynchronous operations using generators.",
                solution: `You can handle asynchronous operations using generators by yielding promises from the generator function and resuming execution once the promise resolves. This can be done manually using a loop or automatically with libraries like 'co' or 'async-await' (which is based on the concept of generators). Example: <pre><code class="language-javascript">\nfunction* asyncGenerator() {\n  const result1 = yield fetch('https://api.example.com/data1');\n  console.log(result1);\n  const result2 = yield fetch('https://api.example.com/data2');\n  console.log(result2);\n}\n</code></pre>`,
              },
              {
                question:
                  "What are the advantages of using generators over promises or async/await?",
                solution:
                  "Generators provide fine-grained control over the execution of a function, allowing you to pause and resume execution at multiple points, which can be useful in some cases, such as iterating over large data sets or handling cooperative multitasking. However, for handling asynchronous code specifically, `async/await` is generally simpler and more readable, as it was built on top of the generator concept.",
              },
              {
                question:
                  "How can you iterate over the values yielded by a generator?",
                solution: `You can iterate over the values yielded by a generator using a 'for...of' loop, or by manually calling '.next()' on the generator object. Example using 'for...of' loop:<pre><code class="language-javascript">\nfunction* myGenerator() {\n  yield 1;\n  yield 2;\n  yield 3;\n}\nconst gen = myGenerator();\nfor (const value of gen) {\n  console.log(value); // 1, 2, 3\n}\n </code></pre>`,
              },
              {
                question:
                  "How does the `return` statement behave in a generator function?",
                solution:
                  "When `return` is called in a generator function, it terminates the generator and produces a value, just like `yield`. However, unlike `yield`, `return` also sets the `done` property of the `.next()` result to `true`, indicating that the generator has finished executing. Any further calls to `.next()` will not yield more values.",
              },
              {
                question:
                  "What happens if you call `.next()` on a generator after it has finished?",
                solution:
                  "Once a generator has finished (either by returning or by exhausting all `yield` statements), subsequent calls to `.next()` will return an object with `value: undefined` and `done: true`, indicating that the generator is done and no more values will be yielded.",
              },
              {
                question:
                  "Can a generator be used to produce an infinite sequence? Provide an example.",
                solution: `Yes, a generator can be used to produce an infinite sequence by using an infinite loop inside the generator function. For example:<pre><code class="language-javascript">\nfunction* infiniteSequence() {\n  let i = 0;\n  while (true) {\n    yield i++;\n  }\n}\nconst gen = infiniteSequence();\nconsole.log(gen.next().value); // 0\nconsole.log(gen.next().value); // 1\nconsole.log(gen.next().value); // 2\n// And so on, infinitely...\n</code></pre>`,
              },
              {
                question:
                  "How do you pass values back into a generator function?",
                solution: `You can pass values back into a generator function by using the '.next(value)' method. The value passed will replace the 'yield' expression where the generator was paused. Example:\n<pre><code class="language-javascript">\nfunction* myGenerator() {\n  const first = yield 'First yield';\n  const second = yield first;\n  return second;\n}\nconst gen = myGenerator();\nconsole.log(gen.next().value); // 'First yield'\nconsole.log(gen.next(42).value); // 42\nconsole.log(gen.next(100).value); // 100\n</code></pre>`,
              },
              {
                question:
                  "How would you implement a generator function that produces Fibonacci numbers indefinitely?",
                solution: `A generator can be used to produce an infinite sequence of Fibonacci numbers by maintaining two variables for the last two numbers in the sequence and updating them on each iteration. Here's an implementation:<pre><code class="language-javascript">\nfunction* fibonacciGenerator() {\n  let [prev, current] = [0, 1];\n  while (true) {\n    yield current;\n    [prev, current] = [current, prev + current];\n  }\n}\nconst gen = fibonacciGenerator();\nconsole.log(gen.next().value); // 1\nconsole.log(gen.next().value); // 1\nconsole.log(gen.next().value); // 2\nconsole.log(gen.next().value); // 3</code></pre>`,
              },
              {
                question:
                  "What are the differences between using a generator and an iterator to traverse a sequence? When would you prefer one over the other?",
                solution:
                  "Both generators and iterators allow you to traverse sequences, but they differ in how they're implemented and used:\n1. **Iterators**: <span style='font-weight: 500;'>Iterators are objects</span> that implement the `next()` method, which returns `{ value, done }`. They require manual implementation of the iteration logic.\n2. **Generators**: <span style='font-weight: 500;'>Generators are functions</span> that automatically create an iterator when called. They manage the `next()` method and yield values on demand, making them simpler to implement for complex iteration logic.\n\n**When to prefer one:**\n- Use **iterators** when you need fine control over the iteration logic or when the iteration logic is tightly coupled with an object or class.\n- Use **generators** when you want a cleaner, easier-to-read implementation that handles state internally and produces values lazily.",
              },
              {
                question:
                  "Can you explain how backpressure in asynchronous processing can be managed with generators?",
                solution:
                  "Backpressure occurs when a producer (like a data source) generates values faster than a consumer (like a network or file system) can process them. Generators can help manage backpressure by yielding control at each `yield` point, allowing the consumer to process values at its own pace. In an asynchronous context, a generator can yield Promises, and the consumer can `await` the result, ensuring that it only processes the next value when it's ready, thus preventing overload.",
              },
              {
                question:
                  "Explain how you can combine a generator with `Promise.all` to handle multiple asynchronous tasks concurrently.",
                solution: `To combine a generator with 'Promise.all', you can yield promises from the generator and collect them into an array. Once the generator yields all promises, you can use 'Promise.all()' to process them concurrently. Here's an example:<pre><code class="language-javascript">\nfunction* fetchMultiple(urls) {\n  for (const url of urls) {\n    yield fetch(url);\n  }\n}\n\nconst urls = ['https://api1.com', 'https://api2.com', 'https://api3.com'];\nconst gen = fetchMultiple(urls);\nconst promises = [...gen]; // Collect all promises\n\nPromise.all(promises).then((results) => {\n  console.log('All fetched:', results);\n}).catch((error) => {\n  console.error('Error fetching:', error);\n});\n</code></pre>`,
              },
              {
                question:
                  "How would you implement a generator-based coroutine system in JavaScript?",
                solution: `Coroutines are functions that can pause and resume execution, typically used in cooperative multitasking. Generators can be used to implement coroutines by 'yield'ing control back and forth between different generators. Here's a basic example of a coroutine system using generators:<pre><code class="language-javascript">\nfunction* coroutineA() {\n  console.log('Start A');\n  yield;\n  console.log('End A');\n}\n\nfunction* coroutineB() {\n  console.log('Start B');\n  yield;\n  console.log('End B');\n}\n\nconst a = coroutineA();\nconst b = coroutineB();\n\n// Coroutine scheduler\nfunction scheduler() {\n  a.next(); // Start A\n  b.next(); // Start B\n  a.next(); // End A\n  b.next(); // End B\n}\nscheduler();\n </code></pre>In this example, 'scheduler()' controls when each coroutine ('coroutineA' and 'coroutine') resumes execution.`,
              },
              {
                question:
                  "How would you pause and resume an ongoing generator function from outside the generator?",
                solution: `You can control a generator's execution from outside by calling '.next()', '.return()', or '.throw()' on the generator object. Here’s an example of how you can pause and resume:\n<pre><code class="language-javascript"> function* myGenerator() {\n  console.log('First part');\n  yield 'Paused';\n  console.log('Second part');\n}\nconst gen = myGenerator();\nconsole.log(gen.next().value); // Logs: 'First part' and returns 'Paused'\nconsole.log(gen.next().value); // Logs: 'Second part' </code></pre>\nYou can resume the generator’s execution at any point by calling '.next()'.`,
              },
              {
                question:
                  "How can you implement a generator that handles both synchronous and asynchronous operations?",
                solution: `To handle both synchronous and asynchronous operations in a generator, you can 'yield' both synchronous values and promises. The consumer of the generator needs to handle the yielded values appropriately. For example:<pre><code class="language-javascript">\nfunction* mixedGenerator() {\n  const syncValue = 'Synchronous value';\n  yield syncValue;\n  const asyncValue = yield new Promise((resolve) => setTimeout(() => resolve('Asynchronous value'), 1000));\n  yield asyncValue;\n}\n\nasync function processGenerator() {\n  const gen = mixedGenerator();\n  let result = gen.next();\n  console.log(result.value); // 'Synchronous value'\n\n  result = await gen.next().value; // Waiting for async value\n  console.log(result); // 'Asynchronous value'\n\n  result = gen.next(result).value;\n  console.log(result); // 'Asynchronous value'\n}\nprocessGenerator();\n</code></pre>`,
              },
              {
                question:
                  "What is the relationship between `async/await` and generators? Could you implement `async/await` using generators?",
                solution: `The 'async/await' syntax in JavaScript is built on top of the generator pattern. In fact, you can implement 'async/await' using generators by yielding promises and manually resuming the generator when the promises resolve. Here’s a simplified version of how 'async/await' can be implemented using generators:\n<pre><code class="language-javascript">function asyncExecutor(generatorFunction) {\n  const generator = generatorFunction();\n\n  function handle(result) {\n    if (result.done) return result.value;\n    return result.value.then((value) => handle(generator.next(value)));\n  }\n\n  return handle(generator.next());\n}\n\nfunction* asyncTask() {\n  const result = yield new Promise((resolve) => setTimeout(() => resolve('Done!'), 1000));\n  console.log(result);\n}\n\nasyncExecutor(asyncTask);\n</code></pre>`,
              },
              {
                question:
                  "Can you explain the memory advantages of using generators for large datasets?",
                solution: `Generators are useful for working with large datasets because they produce values lazily, meaning they generate one value at a time and do not load the entire dataset into memory. This allows you to handle sequences of data that are too large to fit into memory all at once. For example, you can use a generator to iterate over lines of a large file without reading the entire file into memory:<pre><code class="language-javascript">\nfunction* fileLineGenerator(file) {\n  const fileStream = require('fs').createReadStream(file);\n  for await (const line of fileStream) {\n    yield line;\n  }\n}\n</code></pre>`,
              },
            ],
            links: [
              "https://www.geeksforgeeks.org/javascript-iterator/",
              "https://www.hellojavascript.info/docs/general-javascript-questions/generators-advance-interation/generators#can-generators-be-used-with-asyncawait",
              "https://atomicjuggernaut.hashnode.dev/javascript-interview-question-generator-function",
              "https://medium.com/deno-the-complete-reference/some-javascript-generators-memoization-interview-questions-c4a7c97fc3bd",
              "https://medium.com/mighty-ghost-hack/js-interview-11-javascript-generator-88b163b0ea2f",
            ],
          },
          {
            topic: "Context and This Keyword",
            tags: [""],
            explanation: `<p style="margin-top: 1.0rem;">
  In JavaScript, context refers to the environment in which a bit of code is executed. It dictates how variables and functions behave and how they're accessed. Understanding context is important as it influences the value of the <code>this</code> keyword and affects how functions interact with objects and the scope in which they operate.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Types of Context in JavaScript</h4>

<ol style="margin-top: 1.0rem; margin-left: 1.5rem;list-style-type: number;">
  <li>
    <strong>Global Context</strong>
    <p style="margin-top: 0.5rem;">
      <strong>Definition:</strong> The global context is the default context in which JavaScript code runs. When you execute JavaScript in a browser or Node.js environment, the primary code that runs operates in the global context.
    </p>
    <p style="margin-top: 0.5rem;">
      <strong>Characteristics:</strong>
    </p>
    <ul style="margin-top: 0.5rem;">
      <li>In a browser, <code class="language-javascript">this</code> refers to the <code class="language-javascript">window</code> object, while in Node.js, it refers to the global object.</li>
      <li>Any variable or function declared inside the global context is added as a property of the global object.</li>
    </ul>
    <pre><code class="language-javascript">// Example of global context
console.log(this); // In a browser, logs the window object

var globalVar = 'I am global';
function globalFunc() {
    console.log('I am a global function');
}

console.log(window.globalVar); // 'I am global' (in a browser)</code></pre>
  </li>

  <li>
    <strong>Function Context</strong>
    <p style="margin-top: 0.5rem;">
      <strong>Definition:</strong> Each time a function is invoked, it has its own execution context. The behavior of <code class="language-javascript">this</code> can change depending on how the function is called.
    </p>
    <p style="margin-top: 0.5rem;">
      <strong>Characteristics:</strong>
    </p>
    <ul style="margin-top: 0.5rem;">
      <li>If a function is called in the global context or as a standalone function (not as a method of an object), <code class="language-javascript">this</code> refers to the global object (in non-strict mode). In strict mode, <code class="language-javascript">this</code> will be undefined.</li>
      <li>If a function is called as a method of an object, <code class="language-javascript">this</code> refers to that object.</li>
    </ul>
    <pre><code class="language-javascript">// Non-strict mode example
function standaloneFunc() {
    console.log(this); // In non-strict mode, logs the global object (window)
}
standaloneFunc();

const obj = {
    name: 'Alice',
    greet: function() {
        console.log('Hello', this.name); // 'this' refers to obj
    }
};
obj.greet(); // Hello, Alice

'use strict';

function strictFunc() {
    console.log(this); // Logs undefined
}
strictFunc();</code></pre>
  </li>

  <li>
    <strong>Object Method Context</strong>
    <p style="margin-top: 0.5rem;">
      <strong>Definition:</strong> When a function is defined as a method of an object and is called using that object, <code class="language-javascript">this</code> refers to the object from which the method was called.
    </p>
    <p style="margin-top: 0.5rem;">
      <strong>Characteristics:</strong>
    </p>
    <pre><code class="language-javascript">const car = {
    make: 'Toyota',
    model: 'Camry',
    displayInfo: function() {
        console.log(Car: this.make this.model); // 'this' refers to car
    }
};
car.displayInfo(); // Car: Toyota Camry</code></pre>
  </li>

  <li>
    <strong>Constructor Function Context</strong>
    <p style="margin-top: 0.5rem;">
      <strong>Definition:</strong> When a function is invoked as a constructor using the <code class="language-javascript">new</code> keyword, a new object is created, and <code class="language-javascript">this</code> refers to that new object.
    </p>
    <p style="margin-top: 0.5rem;">
      <strong>Characteristics:</strong>
    </p>
    <pre><code class="language-javascript">function Person(name) {
    this.name = name; // 'this' refers to the new object being created
}

const person1 = new Person('Bob');
console.log(person1.name); // Bob</code></pre>
  </li>

  <li>
    <strong>Class Context (ES6 Classes)</strong>
    <p style="margin-top: 0.5rem;">
      <strong>Definition:</strong> In ES6, classes provide a cleaner syntax for creating objects and managing context. Methods defined inside classes have a context similar to that of constructor functions.
    </p>
    <p style="margin-top: 0.5rem;">
      <strong>Characteristics:</strong>
    </p>
    <pre><code class="language-javascript">class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
        console.log(this.name makes a noise.);
    }
}

const dog = new Animal('Rover');
dog.speak(); // Rover makes a noise.</code></pre>
  </li>

  <li>
    <strong>Arrow Function Context</strong>
    <p style="margin-top: 0.5rem;">
      <strong>Definition:</strong> Arrow functions were introduced in ES6 and provide a different way to handle <code class="language-javascript">this</code>. They do not have their own <code class="language-javascript">this</code> context but instead inherit it from the surrounding lexical scope.
    </p>
    <p style="margin-top: 0.5rem;">
      <strong>Characteristics:</strong>
    </p>
    <pre><code class="language-javascript">const obj = {
    name: 'Charlie',
    greet: function() {
        const innerFunc = () => {
            console.log('Hello', this.name); // 'this' refers to obj
        };
        innerFunc();
    }
};
obj.greet(); // Hello, Charlie</code></pre>
  </li>
</ol>
`,
            examples: [""],
            questions: [
              {
                question: "What is the global context in JavaScript?",
                solution:
                  "The global context is the default execution context for JavaScript code, where variables and functions are accessible globally. In a browser, 'this' refers to the 'window' object, while in Node.js, it refers to the global object.",
              },
              {
                question: "How does 'this' behave in a regular function?",
                solution:
                  "In a non-strict mode function, 'this' refers to the global object when the function is called as a standalone function. In strict mode, 'this' is undefined.",
              },
              {
                question:
                  "What is the difference between 'this' in a method and 'this' in a standalone function?",
                solution:
                  "When a function is called as a method of an object, 'this' refers to that object. In contrast, if the function is called as a standalone function, 'this' refers to the global object (in non-strict mode) or is undefined (in strict mode).",
              },
              {
                question: "Explain how 'this' works in constructor functions.",
                solution:
                  "'this' in a constructor function refers to the new object being created when the function is invoked with the 'new' keyword. Properties can be attached to 'this' to create instance properties.",
              },
              {
                question:
                  "What is the significance of the 'use strict' directive in relation to 'this'?",
                solution:
                  "The 'use strict' directive enables strict mode, which changes the behavior of 'this' in functions. In strict mode, 'this' is undefined when the function is called as a standalone function, preventing accidental global variable creation.",
              },
              {
                question:
                  "How do arrow functions handle 'this' differently from regular functions?",
                solution:
                  "Arrow functions do not have their own 'this' context. Instead, they inherit 'this' from the surrounding lexical scope. This makes them useful in scenarios where you want to maintain the context of 'this' from the enclosing function.",
              },
              {
                question:
                  "What happens when you use 'this' inside an arrow function?",
                solution:
                  "'this' inside an arrow function refers to the 'this' value from the enclosing lexical context. This means that arrow functions do not create their own 'this', making them suitable for callbacks and methods where you need to preserve the outer context.",
              },
              {
                question:
                  "Can you explain how to use the 'bind', 'call', and 'apply' methods with respect to 'this'?",
                solution:
                  "'bind' creates a new function with a specified 'this' value, allowing you to control the context of the function. 'call' and 'apply' immediately invoke a function with a specified 'this' value. The main difference is that 'call' accepts arguments separately, while 'apply' takes an array of arguments.",
              },
              {
                question:
                  "What is the 'yield*' keyword, and how does it relate to context in generators?",
                solution:
                  "'yield*' is used to delegate execution to another generator function. It allows a generator to yield values from another generator, maintaining the context of the outer generator. This is useful for managing complex generator flows.",
              },
              {
                question:
                  "How does the execution context change when using `setTimeout` or `setInterval`?",
                solution:
                  "When using `setTimeout` or `setInterval`, the context of 'this' inside the callback function defaults to the global object in non-strict mode or is undefined in strict mode. To maintain the context, you can use an arrow function or bind the function explicitly.",
              },
              {
                question:
                  "Explain how the 'this' keyword behaves in event handlers in JavaScript.",
                solution:
                  "In event handlers, 'this' refers to the element that fired the event, unless the function is an arrow function. In arrow functions, 'this' retains the value from the surrounding lexical context.",
              },
              {
                question:
                  "What are the implications of using 'this' in nested functions, and how can you manage it?",
                solution:
                  "In nested functions, 'this' can refer to different contexts, leading to unexpected behavior. To manage this, you can store the value of 'this' in a variable (commonly named 'self' or 'that') or use arrow functions, which preserve the outer context.",
              },
              {
                question:
                  "How does the context of 'this' change when a method is called using the 'apply' method?",
                solution:
                  "'apply' allows you to invoke a function with a specified 'this' value, enabling you to set the context explicitly. This is particularly useful when calling methods from different objects or when using methods of one object on another.",
              },
              {
                question:
                  "What is the difference between using 'call', 'apply', and 'bind'? When would you use each?",
                solution:
                  "'call' and 'apply' invoke a function immediately with a specified 'this' value, while 'bind' returns a new function that, when called, has its 'this' value set to the provided value. Use 'call' when you have a fixed number of arguments, 'apply' for variable arguments (array), and 'bind' to create a new function with a bound context.",
              },
              {
                question:
                  "How does the concept of context affect the performance of JavaScript applications?",
                solution:
                  "Understanding context can affect performance in JavaScript applications, especially in scenarios involving frequent function calls or deep nesting. Using techniques like method binding and avoiding unnecessary context switching can optimize performance.",
              },
              {
                question:
                  "Can you provide an example of how context can lead to memory leaks in JavaScript?",
                solution:
                  "Memory leaks can occur when functions retain references to variables or objects through closures, especially when using 'this' improperly. For example, if an event listener is added without removing it, it can prevent the enclosing context from being garbage collected, causing a memory leak.",
              },
              {
                question:
                  "What is the difference between the 'new' keyword and the 'class' syntax in JavaScript concerning 'this'?",
                solution:
                  "Both 'new' and 'class' create instances where 'this' refers to the new object being created. However, 'class' provides a cleaner syntax with additional features like inheritance, whereas 'new' requires a constructor function and explicit handling of 'this'.",
              },
              {
                question:
                  "How do you handle context when working with promises and asynchronous code?",
                solution:
                  "In asynchronous code, 'this' can change context based on how a function is called. To manage context, you can use arrow functions, which maintain the outer 'this', or bind the function to the desired context before passing it to the promise handler.",
              },
            ],
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
            topic: "Destructuring and Spread Operators",
            tags: [""],
            explanation: `<p style="margin-top: 1.0rem;">
  In JavaScript, destructuring and the rest/spread operators are powerful ES6 features that simplify working with arrays, objects, and parameters. They help make code cleaner, more readable, and concise. Let's break them down:
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">1. Destructuring</h4>

<p style="margin-top: 1.0rem;">
  Destructuring allows you to unpack values from arrays or properties from objects into distinct variables. It offers a shorter syntax for extracting values without having to reference each element individually.
</p>

<h5 style="margin-top: 1.0rem; font-size: 1.15rem; font-weight: 500;">A) Array Destructuring</h5>
<p style="margin-top: 0.5rem;">You can destructure arrays by assigning array values to variables in a single line.</p>

<pre><code class="language-javascript">// Example 1: Basic Array Destructuring
const arr = [1, 2, 3];
const [a, b, c] = arr;
console.log(a); // 1
console.log(b); // 2
console.log(c); // 3

// Example 2: Skipping Values
const [x, , z] = arr; // Skipping the second element
console.log(x); // 1
console.log(z); // 3

// Example 3: Using Rest Operator in Destructuring
const [first, ...rest] = arr;
console.log(first); // 1
console.log(rest); // [2, 3]
</code></pre>

<h5 style="margin-top: 1.0rem; font-size: 1.15rem; font-weight: 500;">B) Object Destructuring</h5>
<p style="margin-top: 0.5rem;">You can destructure objects by assigning object properties to variables.</p>

<pre><code class="language-javascript">// Example 1: Basic Object Destructuring
const person = { name: 'Alice', age: 25 };
const { name, age } = person;
console.log(name); // Alice
console.log(age); // 25

// Example 2: Renaming Variables
const { name: personName, age: personAge } = person;
console.log(personName); // Alice
console.log(personAge); // 25

// Example 3: Destructuring with Default Values
const { city = 'Unknown' } = person; // If 'city' doesn't exist, it gets 'Unknown' as default
console.log(city); // Unknown
</code></pre>

<h5 style="margin-top: 1.0rem; font-size: 1.15rem; font-weight: 500;">C) Destructuring in Function Parameters</h5>
<p style="margin-top: 0.5rem;">You can use destructuring directly in function parameters for easier access to data.</p>

<pre><code class="language-javascript">// Destructuring Object in Function Parameters
function greet({ name, age }) {
  console.log('Hello name, you are age years old.');
}
greet(person); // Hello Alice, you are 25 years old.
</code></pre>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">2. Rest and Spread Operators</h4>

<h5 style="margin-top: 1.0rem; font-size: 1.15rem; font-weight: 500;">A) Spread Operator (...)</h5>
<p style="margin-top: 0.5rem;">The spread operator allows you to spread out elements of an array or properties of an object into another array or object. It is useful for copying and combining arrays or objects.</p>

<pre><code class="language-javascript">// Example 1: Spreading Arrays
const arr1 = [1, 2];
const arr2 = [3, 4];
const combinedArr = [...arr1, ...arr2]; // Combines the two arrays
console.log(combinedArr); // [1, 2, 3, 4]

// Example 2: Copying Arrays
const newArr = [...arr1]; // Copies arr1 into newArr
console.log(newArr); // [1, 2]

// Example 1: Spreading Objects
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const combinedObj = { ...obj1, ...obj2 }; // Combines obj1 and obj2, with obj2 overwriting b
console.log(combinedObj); // { a: 1, b: 3, c: 4 }

// Example 2: Copying Objects
const newObj = { ...obj1 }; // Creates a copy of obj1
console.log(newObj); // { a: 1, b: 2 }
</code></pre>

<h5 style="margin-top: 1.0rem; font-size: 1.15rem; font-weight: 500;">B) Rest Operator (...)</h5>
<p style="margin-top: 0.5rem;">The rest operator is the inverse of the spread operator. It collects multiple elements into an array or multiple object properties into a single item.</p>

<pre><code class="language-javascript">// Collecting Rest of Elements
const [first, ...restOfArray] = [1, 2, 3, 4];
console.log(first); // 1
console.log(restOfArray); // [2, 3, 4]

// Example 1: Rest Parameters in Functions
function sum(...numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}
console.log(sum(1, 2, 3)); // 6

// Example 2: Mixing Rest and Regular Parameters
function greet(greeting, ...names) {
  console.log('greeting', names);
}
greet('Hello', 'Alice', 'Bob', 'Charlie'); // Hello, Alice, Bob, Charlie
</code></pre>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Key Differences Between Rest and Spread</h4>

<ul style="margin-top: 1.0rem;">
  <li><strong>Spread Operator (...):</strong> Used to spread out elements from an array or object. Example: <code class="language-javascript">[...Arr]</code> or <code class="language-javascript">{...Obj}</code></li>
  <li><strong>Rest Operator (...):</strong> Used to collect multiple elements into an array or object. Example: <code class="language-javascript">function(...Args)</code> or <code class="language-javascript">const [a, ...Rest] = arr</code></li>
</ul>
`,
            examples: [""],
            questions: [
              {
                question:
                  "How can you destructure a dynamic property name from an object?",
                solution: `
                <p style="margin-top: 0.5rem;">
                  You can destructure a dynamic property by using computed property names within an object destructuring pattern.
                </p>
                <pre><code class="language-javascript">const prop = 'name';
            const person = { name: 'Alice', age: 25 };
            const { [prop]: dynamicValue } = person;
            console.log(dynamicValue); // Alice
                </code></pre>
                `,
              },
              {
                question:
                  "How can you merge two objects and overwrite properties using the spread operator?",
                solution: `
                <p style="margin-top: 0.5rem;">
                  When merging objects using the spread operator, properties in the object listed later will overwrite properties from the earlier object.
                </p>
                <pre><code class="language-javascript">const obj1 = { a: 1, b: 2 };
            const obj2 = { b: 3, c: 4 };
            const mergedObj = { ...obj1, ...obj2 };
            console.log(mergedObj); // { a: 1, b: 3, c: 4 }
                </code></pre>
                `,
              },
              {
                question:
                  "What are some caveats of copying objects using the spread operator?",
                solution: `
                <p style="margin-top: 0.5rem;">
                  The spread operator creates a shallow copy of the object, meaning nested objects are still referenced by the original object. Changes to the nested object will affect both the original and the copy.
                </p>
                <pre><code class="language-javascript">const original = { a: 1, nested: { b: 2 } };
            const copy = { ...original };
            copy.nested.b = 3;
            console.log(original.nested.b); // 3
                </code></pre>
                <p>To create a deep copy, you'd need to use methods like <code class="language-javascript">JSON.parse(JSON.stringify(obj))</code> or a deep-cloning utility like Lodash's <code class="language-javascript">_.cloneDeep()</code>.</p>
                `,
              },
              {
                question:
                  "Can you explain how destructuring works in function parameters?",
                solution: `
                <p style="margin-top: 0.5rem;">
                  Destructuring can be applied directly in function parameters to extract values from an object or array passed as an argument.
                </p>
                <p><strong>Example with an object:</strong></p>
                <pre><code class="language-javascript">function printUser({ name, age }) {
              console.log(\`Name: \${name}, Age: \${age}\`);
            }
            const user = { name: 'John', age: 30 };
            printUser(user); // Name: John, Age: 30
                </code></pre>
                <p><strong>Example with an array:</strong></p>
                <pre><code class="language-javascript">function sum([a, b]) {
              return a + b;
            }
            console.log(sum([1, 2])); // 3
                </code></pre>
                `,
              },
              {
                question:
                  "How can you use the spread operator to pass an array as arguments to a function?",
                solution: `
                <p style="margin-top: 0.5rem;">
                  The spread operator allows you to pass elements of an array as individual arguments to a function.
                </p>
                <pre><code class="language-javascript">function sum(a, b, c) {
              return a + b + c;
            }
            const numbers = [1, 2, 3];
            console.log(sum(...numbers)); // 6
                </code></pre>
                `,
              },
              {
                question:
                  "What happens when you combine destructuring and default values?",
                solution: `
                <p style="margin-top: 0.5rem;">
                  You can assign default values while destructuring, which will be used if the property doesn't exist or the value is <code class="language-javascript">undefined</code>.
                </p>
                <pre><code class="language-javascript">const person = { name: 'John' };
            const { name, age = 30 } = person;
            console.log(name); // John
            console.log(age);  // 30 (default value)
                </code></pre>
                <p>If the property exists but is explicitly set to <code class="language-javascript">undefined</code>, the default value will still be used:</p>
                <pre><code class="language-javascript">const person = { name: 'John', age: undefined };
            const { age = 25 } = person;
            console.log(age); // 25
                </code></pre>
                `,
              },
              {
                question:
                  "How can destructuring be used in combination with the rest parameter in function arguments?",
                solution: `
                <p style="margin-top: 0.5rem;">
                  Destructuring can be combined with the rest parameter to gather remaining elements into an array or object.
                </p>
                <p><strong>Example with an array:</strong></p>
                <pre><code class="language-javascript">function printFirstAndRest([first, ...rest]) {
              console.log(first);  // First element
              console.log(rest);   // Array of remaining elements
            }
            printFirstAndRest([1, 2, 3, 4]); 
            // Logs: 1
            // Logs: [2, 3, 4]
                </code></pre>
                <p><strong>Example with an object:</strong></p>
                <pre><code class="language-javascript">function printUser({ name, ...rest }) {
              console.log(name);   // Name property
              console.log(rest);   // Remaining properties as an object
            }
            printUser({ name: 'Alice', age: 25, city: 'NY' });
            // Logs: Alice
            // Logs: { age: 25, city: 'NY' }
                </code></pre>
                `,
              },
              {
                question:
                  "How does the spread operator work when used with iterables like strings?",
                solution: `
                <p style="margin-top: 0.5rem;">
                  The spread operator can be used to spread the elements of any iterable, such as strings, into an array or function.
                </p>
                <pre><code class="language-javascript">const str = 'hello';
            const arr = [...str];
            console.log(arr); // ['h', 'e', 'l', 'l', 'o']
            
            function printChars(...chars) {
              console.log(chars);
            }
            printChars(...str); // ['h', 'e', 'l', 'l', 'o']
                </code></pre>
                `,
              },
              {
                question: "How can you swap values using array destructuring?",
                solution: `
                <p style="margin-top: 0.5rem;">
                  Array destructuring provides a clean way to swap values without needing a temporary variable.
                </p>
                <pre><code class="language-javascript">let a = 1;
            let b = 2;
            [a, b] = [b, a];
            console.log(a); // 2
            console.log(b); // 1
                </code></pre>
                `,
              },
              {
                question:
                  "How can you handle nested destructuring with default values?",
                solution: `
                <p style="margin-top: 0.5rem;">
                  Nested destructuring can also have default values for nested properties.
                </p>
                <pre><code class="language-javascript">const user = { name: 'John', address: { city: 'New York' } };
            const { address: { city, zip = 10001 } } = user;
            console.log(city); // New York
            console.log(zip);  // 10001 (default value)
                </code></pre>
                `,
              },
              {
                question:
                  "How can you destructure a dynamic property name from an object?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    You can destructure a dynamic property by using computed property names within an object destructuring pattern.
                  </p>
                  <pre><code class="language-javascript">const prop = 'name';
            const person = { name: 'Alice', age: 25 };
            const { [prop]: dynamicValue } = person;
            console.log(dynamicValue); // Alice
                  </code></pre>
                `,
              },
              {
                question:
                  "How can you merge two objects and overwrite properties using the spread operator?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    When merging objects using the spread operator, properties in the object listed later will overwrite properties from the earlier object.
                  </p>
                  <pre><code class="language-javascript">const obj1 = { a: 1, b: 2 };
            const obj2 = { b: 3, c: 4 };
            const mergedObj = { ...obj1, ...obj2 };
            console.log(mergedObj); // { a: 1, b: 3, c: 4 }
                  </code></pre>
                `,
              },
              {
                question:
                  "What are some caveats of copying objects using the spread operator?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    The spread operator creates a shallow copy of the object, which means nested objects are still referenced by the original object.
                  </p>
                  <pre><code class="language-javascript">const original = { a: 1, nested: { b: 2 } };
            const copy = { ...original };
            copy.nested.b = 3;
            console.log(original.nested.b); // 3
                  </code></pre>
                  <p>
                    To create a deep copy, you'd need to use another method such as <code class="language-javascript">JSON.parse(JSON.stringify(obj))</code> or a deep-cloning utility like Lodash's <code class="language-javascript">_.cloneDeep()</code>.
                  </p>
                `,
              },
              {
                question:
                  "Can you explain how destructuring works in function parameters?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Destructuring can be applied directly in function parameters to extract values from an object or array passed as an argument.
                  </p>
                  <pre><code class="language-javascript">function printUser({ name, age }) {
              console.log(\`Name: \${name}, Age: \${age}\`);
            }
            const user = { name: 'John', age: 30 };
            printUser(user); // Name: John, Age: 30
                  </code></pre>
            
                  <p style="margin-top: 0.5rem;">Example with an array:</p>
                  <pre><code class="language-javascript">function sum([a, b]) {
              return a + b;
            }
            console.log(sum([1, 2])); // 3
                  </code></pre>
                `,
              },
              {
                question:
                  "How can you use the spread operator to pass an array as arguments to a function?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    The spread operator allows you to pass elements of an array as individual arguments to a function.
                  </p>
                  <pre><code class="language-javascript">function sum(a, b, c) {
              return a + b + c;
            }
            const numbers = [1, 2, 3];
            console.log(sum(...numbers)); // 6
                  </code></pre>
                `,
              },
              {
                question:
                  "What happens when you combine destructuring and default values?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    You can assign default values while destructuring, which will be used if the property doesn't exist or the value is <code class="language-javascript">undefined</code>.
                  </p>
                  <pre><code class="language-javascript">const person = { name: 'John' };
            const { name, age = 30 } = person;
            console.log(name); // John
            console.log(age);  // 30 (default value)
                  </code></pre>
                  <p>
                    If the property exists but is explicitly set to <code class="language-javascript">undefined</code>, the default value will still be used:
                  </p>
                  <pre><code class="language-javascript">const person = { name: 'John', age: undefined };
            const { age = 25 } = person;
            console.log(age); // 25
                  </code></pre>
                `,
              },
              {
                question:
                  "How can destructuring be used in combination with the rest parameter in function arguments?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Destructuring can be combined with the rest parameter to gather remaining elements into an array or object.
                  </p>
                  <pre><code class="language-javascript">function printFirstAndRest([first, ...rest]) {
              console.log(first);  // First element
              console.log(rest);   // Array of remaining elements
            }
            printFirstAndRest([1, 2, 3, 4]);
            // Logs: 1
            // Logs: [2, 3, 4]
                  </code></pre>
            
                  <p style="margin-top: 0.5rem;">Example with an object:</p>
                  <pre><code class="language-javascript">function printUser({ name, ...rest }) {
              console.log(name);   // Name property
              console.log(rest);   // Remaining properties as an object
            }
            printUser({ name: 'Alice', age: 25, city: 'NY' });
            // Logs: Alice
            // Logs: { age: 25, city: 'NY' }
                  </code></pre>
                `,
              },
              {
                question:
                  "How does the spread operator work when used with iterables like strings?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    The spread operator can be used to spread the elements of any iterable, such as strings, into an array or function.
                  </p>
                  <pre><code class="language-javascript">const str = 'hello';
            const arr = [...str];
            console.log(arr); // ['h', 'e', 'l', 'l', 'o']
            
            function printChars(...chars) {
              console.log(chars);
            }
            printChars(...str); // ['h', 'e', 'l', 'l', 'o']
                  </code></pre>
                `,
              },
              {
                question: "How can you swap values using array destructuring?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Array destructuring provides a clean way to swap values without needing a temporary variable.
                  </p>
                  <pre><code class="language-javascript">let a = 1;
            let b = 2;
            [a, b] = [b, a];
            console.log(a); // 2
            console.log(b); // 1
                  </code></pre>
                `,
              },
              {
                question:
                  "How can you handle nested destructuring with default values?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Nested destructuring can also have default values for nested properties.
                  </p>
                  <pre><code class="language-javascript">const user = { name: 'John', address: { city: 'New York' } };
            const { address: { city, zip = 10001 } } = user;
            console.log(city); // New York
            console.log(zip);  // 10001 (default value)
                  </code></pre>
                `,
              },
            ],
            links: [""],
          },
          {
            topic: "Proxy and Reflect",
            tags: [""],
            explanation: `<p style="margin-top: 1.0rem;">
            Proxy is an object that will be created from another object(target object), Using this proxy object we can intercept/modify all the operations that are happening on the object
  In JavaScript, Proxy and <strong>Reflect</strong> are advanced ES6 features that give developers control over object behavior and manipulation. They allow the interception of fundamental operations on objects and provide a way to perform default object operations. Let's break them down:
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">1. Proxy</h4>

<p style="margin-top: 1.0rem;">
  A <strong>Proxy</strong> is used to create an intermediary between the code and an object, which allows you to customize the behavior of basic operations such as property lookup, assignment, and function invocation.
</p>

<h5 style="margin-top: 1.0rem; font-size: 1.15rem; font-weight: 500;">A) Creating a Proxy</h5>
<p style="margin-top: 0.5rem;">
  A Proxy takes two arguments: the target object and a handler object. The handler defines traps for intercepting operations like property access or assignment.
</p>

<pre><code class="language-javascript">// Example 1: Basic Proxy
const target = { name: 'Alice', age: 25 };

const handler = {
  get: function(target, prop) {
    return prop in target ? target[prop] : 'Property prop not found!';
  }
};

const proxy = new Proxy(target, handler);

console.log(proxy.name); // Alice
console.log(proxy.age);  // 25
console.log(proxy.gender); // Property gender not found!
</code></pre>

<h5 style="margin-top: 1.0rem; font-size: 1.15rem; font-weight: 500;">B) Common Proxy Traps</h5>
<p style="margin-top: 0.5rem;">
  Proxies can intercept and redefine many object operations using traps such as <code class="language-javascript">get</code>, <code class="language-javascript">set</code>, <code class="language-javascript">deleteProperty</code>, and <code class="language-javascript">apply</code>.
</p>

<pre><code class="language-javascript">// Example 2: Using set and deleteProperty Traps
const handler = {
  set: function(target, prop, value) {
    if (prop === 'age' && typeof value !== 'number') {
      throw new TypeError('Age must be a number');
    }
    target[prop] = value;
    return true;
  },
  deleteProperty: function(target, prop) {
    if (prop === 'name') {
      throw new Error('Cannot delete name property');
    }
    delete target[prop];
    return true;
  }
};

const proxy = new Proxy(target, handler);

// Setting properties
proxy.age = 30; // Works fine
// proxy.age = "thirty"; // Throws error

// Deleting properties
delete proxy.age; // Works fine
// delete proxy.name; // Throws error
</code></pre>

<p style="margin-top: 1.0rem;">
target — is the object for which we want to create a proxy, it can be any sort of object, including a native array, a function, or even another proxy.

handler — is the object which contains all the traps (operations to intercept) on the object

</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">2. Reflect</h4>

<p style="margin-top: 1.0rem;">
  <strong>Reflect</strong> is a built-in JavaScript object that provides methods for standard object operations. It allows you to perform default behavior when using traps in proxies and simplifies object manipulation.
  </p>
  <p style="margin-top: 1.0rem;">Reflect is a global object which has only static methods which are the same as the proxy handler traps
It is similar to a Math object, it only has static methods and we cannot create any instance out of it.
The major use of Reflect is to provide a way to forward the operation that is happening inside the trap to the original target object.</p>

<h5 style="margin-top: 1.0rem; font-size: 1.15rem; font-weight: 500;">A) Why Use Reflect?</h5>
<p style="margin-top: 0.5rem;">
  Reflect provides a consistent and functional API for operations like setting, getting, deleting properties, and more. It complements proxies by allowing developers to access default behaviors when needed.
</p>

<pre><code class="language-javascript">// Example 3: Using Reflect with Proxy
const handler = {
  get: function(target, prop) {
    console.log('Getting prop');
    return Reflect.get(target, prop);
  },
  set: function(target, prop, value) {
    console.log('Setting prop to value');
    return Reflect.set(target, prop, value);
  }
};

const proxy = new Proxy(target, handler);

proxy.age = 32; // Logs: Setting age to 32
console.log(proxy.age); // Logs: Getting age, 32
</code></pre>

<h5 style="margin-top: 1.0rem; font-size: 1.15rem; font-weight: 500;">B) Common Reflect Methods</h5>
<p style="margin-top: 0.5rem;">
  Reflect includes methods like <code class="language-javascript">Reflect.get()</code>, <code class="language-javascript">Reflect.set()</code>, <code class="language-javascript">Reflect.deleteProperty()</code>, and <code class="language-javascript">Reflect.apply()</code>, which are used to perform default operations on objects.
</p>

<pre><code>// Example 4: Reflect Methods
Reflect.get(target, 'name'); // Alice
Reflect.set(target, 'age', 40); // Sets age to 40
Reflect.deleteProperty(target, 'age'); // Deletes the age property
</code></pre>

<h5 style="margin-top: 1.0rem; font-size: 1.15rem; font-weight: 500;">Some of the common use cases of proxies are:</h5>
<ol style="margin-top: 0.5rem; list-style-type: number;">
  <li>To implement custom behavior for any operation</li>
  <li>To log the actions happening on the object</li>
  <li>To validate & format the value</li>
  <li>To sanitize inputs before writing to the object</li>
</ol>
`,
            examples: [""],
            questions: [
              {
                question:
                  "What is a Proxy in JavaScript, and what is its primary purpose?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    A Proxy in JavaScript is an object that allows you to intercept and redefine fundamental operations performed on a target object, such as property access, assignment, and function invocation. It provides custom behavior for these operations by using a handler object that contains 'traps' for each type of operation.
                  </p>
                `,
              },
              {
                question:
                  "How can you intercept property access using a Proxy?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    You can intercept property access by defining a <code>get</code> trap inside the handler object. The <code>get</code> trap takes the target object and the property name as arguments, allowing you to customize the behavior when a property is accessed.
                  </p>
                  <pre><code>const handler = {
              get: (target, prop) => prop in target ? target[prop] : 'Property not found'
            };
            const proxy = new Proxy(target, handler);
                  </code></pre>
                `,
              },
              {
                question:
                  "How would you use a Proxy to validate a value before setting it on an object property?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    You can use the <code>set</code> trap in the handler object to validate a value before assigning it to a property. This trap takes the target object, property name, and the value being set as arguments.
                  </p>
                  <pre><code>const handler = {
              set: (target, prop, value) => {
                if (prop === 'age' && typeof value !== 'number') {
                  throw new Error('Age must be a number');
                }
                target[prop] = value;
                return true;
              }
            };
            const proxy = new Proxy(target, handler);
                  </code></pre>
                `,
              },
              {
                question:
                  "What are traps in a Proxy, and can you name a few examples?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Traps are the methods defined in the handler object that intercept operations performed on the target object. Some common traps include <code>get</code> (for property access), <code>set</code> (for property assignment), <code>deleteProperty</code> (for property deletion), and <code>apply</code> (for function invocation).
                  </p>
                `,
              },
              {
                question:
                  "Can you demonstrate how to log property access and assignment using a Proxy?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    To log property access and assignment, you can define <code>get</code> and <code>set</code> traps in the handler object.
                  </p>
                  <pre><code>const handler = {
              get: (target, prop) => {
                console.log('Getting property ' + prop);
                return target[prop];
              },
              set: (target, prop, value) => {
                console.log('Setting property ' + prop + ' to ' + value);
                target[prop] = value;
                return true;
              }
            };
            const proxy = new Proxy({ name: 'Alice' }, handler);
            proxy.name; // Logs 'Getting property name'
            proxy.name = 'Bob'; // Logs 'Setting property name to Bob'
                  </code></pre>
                `,
              },
              {
                question:
                  "What is the difference between the Proxy and Reflect objects in JavaScript?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    The <code>Proxy</code> object allows you to intercept and redefine basic operations on an object, while the <code>Reflect</code> object provides methods for performing default operations on objects (such as property access, assignment, and deletion). <code>Reflect</code> is often used inside Proxy traps to access the default behavior of operations.
                  </p>
                  <pre><code>const handler = {
              get: (target, prop) => Reflect.get(target, prop)
            };
                  </code></pre>
                `,
              },
              {
                question:
                  "How can you use the `deleteProperty` trap to prevent certain properties from being deleted?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    You can use the <code>deleteProperty</code> trap to intercept and prevent specific properties from being deleted. If deletion is not allowed, you can throw an error or return false.
                  </p>
                  <pre><code>const handler = {
              deleteProperty: (target, prop) => {
                if (prop === 'name') {
                  throw new Error('Cannot delete name property');
                }
                delete target[prop];
                return true;
              }
            };
            const proxy = new Proxy({ name: 'Alice', age: 25 }, handler);
            delete proxy.age; // Works
            // delete proxy.name; // Throws error
                  </code></pre>
                `,
              },
              {
                question:
                  "Why might you want to use the Reflect object in combination with Proxy?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    The Reflect object allows you to call the default behavior of an operation inside a Proxy trap. This is useful when you want to modify or extend the behavior of an operation, but still want to retain the original behavior.
                  </p>
                  <pre><code>const handler = {
              get: (target, prop) => {
                console.log('Accessing ' + prop);
                return Reflect.get(target, prop);
              }
            };
            const proxy = new Proxy(target, handler);
                  </code></pre>
                `,
              },
              {
                question:
                  "How can you create virtual or computed properties using a Proxy?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    You can create virtual or computed properties using the <code>get</code> trap in a Proxy. For example, you can define a virtual 'fullName' property that returns a computed value based on the 'firstName' and 'lastName' properties of the target object.
                  </p>
                  <pre><code>const handler = {
              get: (target, prop) => {
                if (prop === 'fullName') {
                  return target.firstName + ' ' + target.lastName;
                }
                return target[prop];
              }
            };
            const proxy = new Proxy({ firstName: 'John', lastName: 'Doe' }, handler);
            console.log(proxy.fullName); // 'John Doe'
                  </code></pre>
                `,
              },
              {
                question: "How do you create a Proxy in JavaScript?",
                solution: `
                  <pre><code>const target = {};
            const handler = {};
            const proxy = new Proxy(target, handler);</code></pre>
                  <p style="margin-top: 0.5rem;">Here, <code>target</code> is the object you want to wrap, and <code>handler</code> contains the traps that intercept operations on the target object.</p>
                `,
              },
              {
                question:
                  "Can you explain the function of the proxy object in JavaScript?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    The proxy object intercepts and redefines core operations on a target object, such as getting or setting properties, making it easier to control how the object behaves under certain conditions.
                  </p>
                `,
              },
              {
                question: "What is a trap in the context of a Proxy?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    A trap is a method in the handler object that intercepts and customizes an operation on the target object, like accessing a property (<code>get</code>), setting a property (<code>set</code>), or deleting a property (<code>deleteProperty</code>).
                  </p>
                `,
              },
              {
                question: "What can we intercept with a JavaScript proxy trap?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    You can intercept operations such as property access (<code>get</code>), property assignment (<code>set</code>), property deletion (<code>deleteProperty</code>), function invocation (<code>apply</code>), and more.
                  </p>
                `,
              },
              {
                question:
                  "Does the proxy overwrite the variable when you implement a proxy?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    No, the proxy does not overwrite the variable. It wraps around the original object, allowing operations to be intercepted and customized without modifying the target object itself.
                  </p>
                `,
              },
              {
                question:
                  "Can you explain the function of the proxy set method?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    The <code>set</code> method in the proxy's handler intercepts property assignments, allowing you to customize or validate the value before it is assigned to a property.
                  </p>
                `,
              },
              {
                question: "What is meant by invariants in JavaScript proxies?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Invariants are rules enforced by the JavaScript engine, ensuring that certain properties of objects cannot be violated by proxies. For example, if a property is non-configurable, it cannot be deleted by a proxy.
                  </p>
                `,
              },
              {
                question:
                  "Is there a way to iterate over an object’s keys using a method that uses the [[OwnPropertyKeys]] internal method?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Yes, the <code>ownKeys</code> trap can be used in a Proxy to intercept the iteration of an object's keys and customize the behavior of <code>Object.keys()</code> and similar methods.
                  </p>
                `,
              },
              {
                question:
                  "Do private (#) properties and methods require proxies in a class?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    No, private properties and methods (denoted by <code>#</code>) cannot be accessed or modified by proxies since they are not part of the object's accessible properties.
                  </p>
                `,
              },
              {
                question:
                  "What is the benefit of using a Proxy vs. a wrapper function?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    A Proxy offers more flexibility than a wrapper function because it allows you to intercept and customize a wide range of operations on an object, such as property access, property assignment, and method invocation, without changing the object's API or structure.
                  </p>
                `,
              },
              {
                question: "What is the Reflect API in JavaScript?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    The Reflect API is a built-in JavaScript object that provides static methods for performing common object operations like setting, deleting, or defining properties, and it works in conjunction with Proxy objects to access default behaviors.
                  </p>
                `,
              },
              {
                question:
                  "Can you explain the function of the Reflect built-in JavaScript object?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    The Reflect object provides methods that correspond to the fundamental operations you can perform on objects, such as <code>Reflect.get</code> for getting property values, <code>Reflect.set</code> for setting property values, and <code>Reflect.apply</code> for calling functions.
                  </p>
                `,
              },
              {
                question:
                  "What are some common methods provided by the Reflect API?",
                solution: `
                  <pre><code>Reflect.get() // Access a property
            Reflect.set() // Set a property
            Reflect.apply() // Call a function
            Reflect.defineProperty() // Define a new property
            Reflect.deleteProperty() // Delete a property
            Reflect.has() // Check if a property exists</code></pre>
                `,
              },
              {
                question:
                  "How does the Reflect API relate to Proxies in JavaScript?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    The Reflect API is often used inside Proxy traps to call the default behavior of an intercepted operation. For example, the <code>get</code> trap in a Proxy might use <code>Reflect.get</code> to retrieve the property’s default value.
                  </p>
                `,
              },
              {
                question:
                  "Does the JavaScript proxy built-in object have any limitations?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Yes, Proxies cannot intercept operations on private properties or methods (denoted by <code>#</code>), and they also cannot intercept operations that rely on object identity, such as <code>===</code> comparisons.
                  </p>
                `,
              },
              {
                question:
                  "Is it possible to proxy an inherited class with private fields in JavaScript?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    No, private fields and methods (denoted by <code>#</code>) cannot be intercepted by a Proxy since they are hidden from external access and only accessible within the class itself.
                  </p>
                `,
              },
              {
                question:
                  "Can proxies intercept an object used in a strict equality test?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    No, proxies cannot intercept <code>===</code> or strict equality tests. The proxy will be treated as equal to itself, but it cannot modify the result of comparisons with other objects.
                  </p>
                `,
              },
              {
                question: "What is a revocable JavaScript proxy?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    A revocable Proxy allows you to disable the proxy after it has been created. This can be useful in scenarios where you want to stop intercepting operations after a certain point.
                  </p>
                  <pre><code>const { proxy, revoke } = Proxy.revocable(target, handler);
            proxy.name = 'Alice'; // Works
            revoke(); // Disables the proxy
            proxy.name; // Throws an error
                  </code></pre>
                `,
              },
              {
                question:
                  "Why would you use a WeakMap when attempting to revoke a proxy?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    A WeakMap can be used to store the proxy's target object, ensuring that the proxy is garbage-collected when it is no longer needed. This prevents memory leaks when revoking proxies in long-running applications.
                  </p>
                `,
              },
            ],
            links: [
              "https://www.hellojavascript.info/docs/general-javascript-questions/miscellaneous-js-questions/proxy-and-reflect#what-are-some-common-use-cases-for-proxies",
              "https://enlear.academy/javascript-proxy-and-reflect-c74cceb0dcc8",
            ],
          },
          {
            topic: "Falsy and Truthy",
            tags: [""],
            explanation: `<p style="margin-top: 1.0rem;">
  In JavaScript, falsy and truthy values are utilized in conditional statements to decide the flow of logic. A value is considered falsy if it evaluates to false when used in a Boolean context, and truthy if it evaluates to true.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">1. Falsy Values</h4>

<p style="margin-top: 1.0rem;">
  Falsy values are those that, when evaluated in a Boolean context, return false. There are only a few values in JavaScript that are falsy:
</p>

<ol style="margin-top: 0.5rem; margin-left: 1.5rem; list-style-type: disc; ">
  <li><code className="language-javascript">false</code></li>
  <li><code className="language-javascript">0</code> (the number zero)</li>
  <li><code className="language-javascript">""</code> (empty string)</li>
  <li><code className="language-javascript">null</code></li>
  <li><code className="language-javascript">undefined</code></li>
  <li><code className="language-javascript">NaN</code> (Not-a-Number)</li>
</ol>

<p style="margin-top: 1.0rem;">
  Any time one of these values is used in a condition, JavaScript treats it as false.
</p>

<pre><code className="language-javascript">if (0) {
  console.log('This will not execute'); // 0 is falsy
}

if ("") {
  console.log('This will not execute'); // Empty string is falsy
}

if (null) {
  console.log('This will not execute'); // null is falsy
}
</code></pre>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">2. Truthy Values</h4>

<p style="margin-top: 1.0rem;">
  Everything else in JavaScript is considered truthy. Even values that might seem like they should be falsy are truthy in JavaScript. Some examples of truthy values:
</p>

<ol style="margin-top: 0.5rem; margin-left: 1.5rem; list-style-type: disc;">
  <li><code className="language-javascript">true</code></li>
  <li>Any non-zero number (e.g., <code className="language-javascript">1</code>, <code className="language-javascript">-100</code>)</li>
  <li>Any non-empty string (e.g., <code className="language-javascript">"hello"</code>)</li>
  <li>Arrays (<code className="language-javascript">[]</code>)</li>
  <li>Objects (<code className="language-javascript">{}</code>)</li>
  <li>Any other object</li>
</ol>

<pre><code className="language-javascript" >
if (1) {
  console.log('This will execute'); // 1 is truthy
}

if ("hello") {
  console.log('This will execute'); // Non-empty string is truthy
}

if ([]) {
  console.log('This will execute'); // An empty array is truthy
}
</code></pre>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Falsy and Truthy in Conditional Statements</h4>

<p style="margin-top: 1.0rem;">
  In JavaScript, these values are often used in <code className="language-javascript">if</code> statements and loops to control flow based on their truthiness.
</p>

<pre><code className="language-javascript">let value = "JavaScript";

if (value) {
  console.log('This will execute'); // The non-empty string "JavaScript" is truthy
}
</code></pre>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Usage Example</h4>

<p style="margin-top: 1.0rem;">
  The concept of falsy and truthy values is essential in JavaScript when checking conditions without explicitly using Boolean values (<code className="language-javascript">true</code> or <code className="language-javascript">false</code>).
</p>

<pre><code className="language-javascript">let username = ""; // Falsy because it's an empty string
let displayName = username || "Guest"; // Fallback to "Guest" if username is falsy

console.log(displayName); // Outputs: "Guest"
</code></pre>

<pre><code className="language-javascript">
Boolean(false);         // false
Boolean(undefined);     // false
Boolean(null);          // false
Boolean('');            // false
Boolean(NaN);           // false
Boolean(0);             // false
Boolean(-0);            // false
Boolean(0n);            // false

Boolean(true);          // true
Boolean('hi');          // true
Boolean(1);             // true
Boolean([]);            // true
Boolean([0]);           // true
Boolean([1]);           // true
Boolean({});            // true
Boolean({ a: 1 });      // true
</code></pre>
`,
            examples: [""],
            questions: [
              {
                question: "What are falsy values in JavaScript?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Falsy values in JavaScript are values that, when evaluated in a Boolean context, return false. These values include:
                    <ul style="margin-top: 0.5rem;">
                      <li><code>false</code></li>
                      <li><code>0</code> (the number zero)</li>
                      <li><code>""</code> (empty string)</li>
                      <li><code>null</code></li>
                      <li><code>undefined</code></li>
                      <li><code>NaN</code> (Not-a-Number)</li>
                    </ul>
                  </p>
                `,
              },
              {
                question: "What are truthy values in JavaScript?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Truthy values are all values in JavaScript that are not falsy. These include:
                    <ul style="margin-top: 0.5rem;">
                      <li><code>true</code></li>
                      <li>Any non-zero number (e.g., <code>1</code>, <code>-100</code>)</li>
                      <li>Any non-empty string (e.g., <code>"hello"</code>)</li>
                      <li>Arrays (<code>[]</code>)</li>
                      <li>Objects (<code>{}</code>)</li>
                    </ul>
                  </p>
                `,
              },
              {
                question:
                  "How does JavaScript treat falsy values in conditional statements?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    When falsy values are used in conditional statements, JavaScript treats them as false. For example:
                  </p>
                  <pre><code>if (0) {
              console.log('This will not execute'); // 0 is falsy
            }</code></pre>
                `,
              },
              {
                question:
                  "How does JavaScript treat truthy values in conditional statements?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    When truthy values are used in conditional statements, JavaScript treats them as true. For example:
                  </p>
                  <pre><code>if (1) {
              console.log('This will execute'); // 1 is truthy
            }</code></pre>
                `,
              },
              {
                question:
                  "Can you give an example of using falsy and truthy values in JavaScript?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Here is an example of using falsy and truthy values in JavaScript for assigning default values:
                  </p>
                  <pre><code>let username = ""; // Falsy because it's an empty string
            let displayName = username || "Guest"; // Fallback to "Guest" if username is falsy
            console.log(displayName); // Outputs: "Guest"</code></pre>
                `,
              },
              {
                question:
                  "What is the difference between falsy and truthy values in JavaScript?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Falsy values evaluate to false in a Boolean context, while truthy values evaluate to true. Falsy values include <code>false</code>, <code>0</code>, <code>""</code>, <code>null</code>, <code>undefined</code>, and <code>NaN</code>. Everything else is truthy.
                  </p>
                `,
              },
              {
                question: "What are the Truthy and Falsy values?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    A truthy value is similar to true, while a falsy value is similar to false. The falsy values in JavaScript include:
                    <ul style="margin-top: 0.5rem;">
                      <li><code>0</code></li>
                      <li><code>""</code> (empty string)</li>
                      <li><code>undefined</code></li>
                      <li><code>null</code></li>
                      <li><code>NaN</code></li>
                      <li><code>false</code></li>
                    </ul>
                    The truthy values include:
                    <ul style="margin-top: 0.5rem;">
                      <li><code>"0"</code></li>
                      <li><code>" "</code> (a space string)</li>
                      <li><code>[]</code> (empty array)</li>
                      <li><code>{}</code> (empty object)</li>
                      <li><code>'false'</code> (string)</li>
                    </ul>
                    If we use one of these values in an if-else statement, the evaluation will reflect their truthiness or falsiness.
                  </p>
                  <pre><code>console.log(0 ? 'Truth' : 'Falsy'); // Outputs: Falsy
            console.log("0" ? 'Truth' : 'Falsy'); // Outputs: Truth
                  </code></pre>
                `,
              },
              {
                question: "What is the difference between null and undefined?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    <strong>null</strong> represents an intentional absence of any value, while <strong>undefined</strong> means a variable has been declared but not assigned a value.
                  </p>
                  <pre><code>let a = null; // a is explicitly set to null
            let b; // b is undefined because it has not been assigned a value
                  </code></pre>
                `,
              },
              {
                question:
                  "What is the difference between double equal (==) and triple equal (===)?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    <strong>Double equal (==)</strong> checks for equality after performing type coercion, while <strong>Triple equal (===)</strong> checks for both value and type without coercion.
                  </p>
                  <pre><code>console.log(5 == '5'); // true (type coercion)
            console.log(5 === '5'); // false (no type coercion)
                  </code></pre>
                `,
              },
              {
                question: "What is the 'this' keyword?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    The <strong>'this'</strong> keyword refers to the object that is currently executing the JavaScript code. Each function execution has a reference to its executing context.
                  </p>
                  <pre><code>const obj = {
              value: 10,
              getValue: function() {
                return this.value;
              }
            };
            console.log(obj.getValue()); // Outputs: 10
                  </code></pre>
                `,
              },
              {
                question: "How to check for a prime number?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    A prime number is a natural number greater than 1 that is not divisible by any number other than itself and 1. For example, 2, 3, 5, and 7 are prime numbers.
                  </p>
                  <pre><code>function isPrime(num) {
              for (let i = 2; i < num; i++) {
                if (num % i === 0) return false;
              }
              return num > 1;
            }
            console.log(isPrime(5)); // Outputs: true
                  </code></pre>
                `,
              },
              {
                question: "Find the largest element of an array.",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    You can find the largest element in an array using a loop.
                  </p>
                  <pre><code>const arr = [1, 3, 5, 2, 4];
            let largest = arr[0];
            for (let i = 1; i < arr.length; i++) {
              if (arr[i] > largest) {
                largest = arr[i];
              }
            }
            console.log(largest); // Outputs: 5
                  </code></pre>
                `,
              },
              {
                question: "How to use the JavaScript callback function?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    A callback function is a function passed as an argument to another function. This allows for asynchronous programming and event handling.
                  </p>
                  <pre><code>function greet(name, callback) {
              console.log('Hello ' + name);
              callback();
            }
            greet('Alice', function() {
              console.log('This is a callback function!');
            });
                  </code></pre>
                `,
              },
              {
                question: "What is the difference between Let and Const?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    <strong>Let</strong> allows you to declare variables that can be reassigned, while <strong>Const</strong> declares variables that cannot be reassigned after their initial assignment.
                  </p>
                  <pre><code>let a = 1;
            a = 2; // Allowed
            
            const b = 1;
            // b = 2; // Not allowed - TypeError
                  </code></pre>
                `,
              },
              {
                question: "What are the advantages of the Arrow function?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Arrow functions provide a more concise syntax for writing functions and lexically bind the <strong>'this'</strong> value.
                  </p>
                  <pre><code>const add = (x, y) => x + y;
            console.log(add(2, 3)); // Outputs: 5
                  </code></pre>
                `,
              },
              {
                question: "What is Closure in JavaScript?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    A closure is a function that retains access to its lexical scope even when the function is executed outside that scope.
                  </p>
                  <pre><code>function outer() {
              let count = 0;
              return function inner() {
                count++;
                return count;
              };
            }
            const counter = outer();
            console.log(counter()); // Outputs: 1
            console.log(counter()); // Outputs: 2
                  </code></pre>
                `,
              },
            ],
            links: [""],
          },
          {
            topic: "Map",
            tags: [""],
            explanation: `<p style="margin-top: 1.0rem;">
  In JavaScript, a <strong>Map</strong> is a set of key-value pairs where both the keys and the values may be of any data type. Unlike traditional objects where the keys are strings or symbols, Maps allow any type of key (including objects, functions, or any primitive type). Maps also offer better performance for frequent additions and deletions of key-value pairs when compared to regular objects.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Key Features of a Map</h4>

<p style="margin-top: 1.0rem;">
  <strong>Key Flexibility:</strong> In objects, keys are always strings. In Maps, keys can be of any type: strings, numbers, objects, or even functions.
</p>
<p style="margin-top: 1.0rem;">
  <strong>Preserves Order:</strong> Maps maintain the insertion order of the key-value pairs. When you iterate over the map, it returns entries in the order in which they were added.
</p>
<p style="margin-top: 1.0rem;">
  <strong>Size:</strong> Maps have a built-in <code>size</code> property that tells you how many key-value pairs are in the map.
</p>
<p style="margin-top: 1.0rem;">
  <strong>Performance:</strong> Operations like <code>get</code>, <code>set</code>, and <code>delete</code> in Maps are generally more efficient than similar operations in objects, especially when the collection size is large.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Creating a Map</h4>

<p style="margin-top: 1.0rem;">
  You can create a Map using the <code>Map</code> constructor, and you can initialize it with an array of key-value pairs.
</p>

<pre><code className="language-javascript">
const myMap = new Map([
  ['name', 'John'],
  ['age', 30]
]);
console.log(myMap); // Map { 'name' => 'John', 'age' => 30 }
</code></pre>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Key Map Methods</h4>

<ul style="margin-top: 0.5rem; margin-left: 1.5rem; list-style-type: disc;">
  <li><code>set(key, value)</code>: Adds or updates an element in the Map.</li>
  <li><code>get(key)</code>: Retrieves the value associated with the specified key.</li>
  <li><code>has(key)</code>: Checks if the Map contains the specified key.</li>
  <li><code>delete(key)</code>: Removes the key and its associated value.</li>
  <li><code>clear()</code>: Removes all elements from the Map.</li>
  <li><code>size</code>: Returns the number of key-value pairs in the Map.</li>
</ul>

<pre><code className="language-javascript">
// Creating an empty Map
const userMap = new Map();

// Adding key-value pairs
userMap.set('name', 'Alice');
userMap.set('age', 25);
userMap.set('isMember', true);

// Getting values from the Map
console.log(userMap.get('name')); // Output: 'Alice'
console.log(userMap.get('age'));  // Output: 25

// Checking if a key exists
console.log(userMap.has('isMember')); // Output: true
console.log(userMap.has('email'));    // Output: false

// Removing a key-value pair
userMap.delete('age');

// Getting the size of the Map
console.log(userMap.size); // Output: 2

// Iterating over the Map using for...of
for (const [key, value] of userMap) {
  console.log('key: value');
}

// Output:
// name: Alice
// isMember: true
</code></pre>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">WeakMap</h4>

<p style="margin-top: 1.0rem;">
  A <strong>WeakMap</strong> is a version of Map that holds "weak" references to keys, which are always objects. If no other references to the key exist, the key can be garbage collected. This makes WeakMap ideal for storing temporary data or metadata related to objects without preventing the objects from being garbage collected.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">WeakMap Key Points</h4>

<ul style="margin-top: 0.5rem; margin-left: 1.5rem; list-style-type: disc;">
  <li>Keys must be objects: You cannot use primitive types as keys in a WeakMap.</li>
  <li>No <code>size</code> property: You cannot iterate over the keys, values, or entries of a WeakMap because the references are weak and may be garbage collected.</li>
  <li>Use case: WeakMap is often used for data that only needs to be temporarily associated with an object and can be cleaned up automatically when the object is no longer needed.</li>
</ul>

<pre><code className="language-javascript">
const weakMap = new WeakMap();
const obj1 = {};
const obj2 = {};

// Setting key-value pairs
weakMap.set(obj1, 'data for obj1');
weakMap.set(obj2, 'data for obj2');

// Getting values
console.log(weakMap.get(obj1)); // Output: 'data for obj1'

// Checking existence
console.log(weakMap.has(obj2)); // Output: true

// Deleting a key-value pair
weakMap.delete(obj2);

// obj2 is now eligible for garbage collection
</code></pre>
`,
            examples: [""],
            questions: [
              {
                question: "What are the performance implications of using Maps versus Objects for large datasets in JavaScript?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Maps provide better performance than Objects for large datasets in specific scenarios, particularly when frequent additions and deletions of key-value pairs are required. This is because Maps are optimized for such operations, whereas Objects need to handle key-string conversion and prototype chain traversal, which can introduce overhead. Additionally, Maps maintain insertion order and allow non-string keys, making them more versatile for complex data structures, but with the trade-off of slightly more memory consumption compared to Objects.
                  </p>
                `,
              },
              {
                question: "How does the internal implementation of Map in JavaScript ensure order preservation, and what are the potential trade-offs?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Maps in JavaScript maintain order by internally using linked lists or similar structures to track the insertion order of key-value pairs. This allows the <code>for...of</code> loop and methods like <code>entries()</code>, <code>keys()</code>, and <code>values()</code> to return items in the order of insertion. The trade-off is that order tracking introduces additional memory overhead and may lead to slower operations compared to unordered data structures. Moreover, maintaining this order could marginally affect performance in very large Maps when iterating or deleting elements.
                  </p>
                `,
              },
              {
                question: "In what scenarios would a WeakMap's garbage collection behavior become crucial for maintaining application performance?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    A WeakMap’s garbage collection behavior becomes critical in scenarios where you need to associate temporary or auxiliary data with objects without preventing those objects from being garbage collected. For example, in cases like DOM element caching, memoization of function results, or storing metadata for objects that have a limited lifecycle, WeakMap ensures that once an object is no longer needed and no other references exist, the object and its associated data are automatically garbage collected. This helps in preventing memory leaks and reduces the overall memory footprint in long-running applications or memory-sensitive environments.
                  </p>
                `,
              },
              {
                question: "How does the weak reference mechanism in a WeakMap affect the ability to enumerate or inspect keys and values?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    WeakMaps use weak references for keys, meaning that the JavaScript engine can garbage collect a key-value pair when there are no other references to the key object. As a result, WeakMaps do not support enumeration or inspection of keys and values through methods like <code>for...of</code>, <code>keys()</code>, or <code>values()</code>. This design ensures that the garbage collection process is transparent and automatic, but it also means that you cannot track or inspect the contents of a WeakMap programmatically, except by directly querying individual keys via the <code>get()</code> method.
                  </p>
                `,
              },
              {
                question: "Why are WeakMaps considered useful for managing memory in complex JavaScript applications, and how does this relate to the concept of 'memory leaks'?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    WeakMaps are especially useful in complex JavaScript applications where objects might need to be temporarily linked to additional data, such as DOM elements or components. If a regular Map or Object were used in these cases, the referenced objects would not be garbage collected as long as they are held as keys in the Map, leading to potential memory leaks where unused memory is not released. WeakMaps avoid this issue by allowing the garbage collector to clean up key-value pairs when no other references to the key object exist. This automatic memory management helps in maintaining the performance and scalability of large applications, preventing memory from being held unnecessarily.
                  </p>
                `,
              },
              {
                question: "What are the limitations of using WeakMaps in terms of key types, and why does JavaScript enforce these restrictions?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    The primary limitation of WeakMaps is that keys must be objects, not primitive values like strings or numbers. This restriction exists because WeakMaps rely on weak references, which only work with objects. Primitive values in JavaScript are immutable and not stored by reference, meaning that weak referencing them would be meaningless since primitives can't be garbage collected or tracked in the same way as objects.
                  </p>
                `,
              }
            ],            
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
  {
    id: 2,
    category: "React",
    themeBgColor: "#72F8FF",
    textColor: "#12365F",
    topicColor: "#12365F",
    lightColor: "#ECFEFF",
    type: [
      {
        id: 1,
        label: "Beginner",
        concepts: [
          {
            topic: "React Introduction",
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
            topic: "JSX Syntax",
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
    <ol style="margin-top: 1.5rem; margin-left: 1.5rem; list-style-type: disc;">
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
<code className="language-javascript">
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
<code className="language-javascript">
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
<code className="language-javascript">
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
<code className="language-javascript">
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
<code className="language-javascript">
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
    <strong>Error Handling:</strong> Errors can be handled using <code className="language-javascript">try...catch</code>, which is more intuitive than using <code className="language-javascript">.catch()</code> with promises.
  </li>
  <li>
    <strong>Flat Structure:</strong> Eliminates promise chaining, making the code less nested and easier to follow.
  </li>
</ul>

<h4>Refactored Example Using Async/Await:</h4>
<pre>
<code className="language-javascript">
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
  Now, instead of chaining <code className="language-javascript">.then()</code> calls, the asynchronous operations are executed in sequence, making the code look synchronous while still maintaining the benefits of asynchronous execution.
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
  <strong>Advantage:</strong> It provides a cleaner and more readable syntax, making it easier to handle async operations, especially when combined with <code className="language-javascript">try...catch</code> for error handling.
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
            topic: "Functional Components",
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
        <li>Promises (e.g., <code className="language-javascript">.then()</code>, <code className="language-javascript">.catch()</code>, <code className="language-javascript">.finally()</code>)</li>
        <li>Await code block</li>
        <li><code className="language-javascript">process.nextTick()</code> in Node.js</li>
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
    <pre><code className="language-javascript">
Start
End
Promise 1
Promise 2
Timeout
    </code></pre>

    <h4 style="margin-top: 1.5rem; font-size: 1.0rem; font-weight: 600; letter-spacing: -0.025em;">Explanation:</h4>
    <ul>
        <li>First, synchronous code (Start and End) runs.</li>
        <li>Then, microtasks (Promise 1 and Promise 2) run before any macrotask like <code className="language-javascript">setTimeout</code>.</li>
        <li>Finally, the macrotask (<code className="language-javascript">setTimeout</code>) is executed.</li>
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
        <li><code className="language-javascript">setTimeout()</code></li>
        <li><code className="language-javascript">setInterval()</code></li>
        <li><code className="language-javascript">setImmediate()</code> (Node.js)</li>
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
    <pre><code className="language-javascript">
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
            topic: "Class Components",
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
            topic: "Component Lifecycle",
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
            topic: "UseState Hook",
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
            <pre><code className="language-javascript"> // mathUtils.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;</code></pre>
          </li>
          <li style="margin-top: 0.5rem;">
            <strong>Default Exports:</strong> A module can have one default export. This is useful when a module has one main thing to export.
            <pre><code className="language-javascript"> // greeting.js
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
            <pre><code className="language-javascript"> // app.js
import { add, subtract } from './mathUtils.js';
console.log(add(5, 3)); // 8
console.log(subtract(5, 3)); // 2;</code></pre>
          </li>
          <li style="margin-top: 0.5rem;">
            <strong>Importing Default Exports:</strong> You can name the default import anything.
            <pre><code className="language-javascript"> // app.js
import greet from './greeting.js';
console.log(greet('Alice')); // "Hello, Alice!";</code></pre>
          </li>
        </ul>
      </li>
    </ol>
  </li>
  <li style="margin-top: 0.5rem;">
    <strong>Named Exports with Aliases:</strong> If you want to import an item using a different name, you can alias it during import.
    <pre><code className="language-javascript">import { add as sum } from './mathUtils.js';
console.log(sum(5, 3)); // 8;</code></pre>
  </li>
  <li style="margin-top: 0.5rem;">
    <strong>Import All from a Module:</strong> You can import everything from a module and assign it to a namespace object.
    <pre><code className="language-javascript">import * as math from './mathUtils.js';
console.log(math.add(5, 3)); // 8
console.log(math.subtract(5, 3)); // 2;</code></pre>
  </li>
  <li style="margin-top: 0.5rem;">
    <strong>Re-exporting (Aggregating Modules):</strong> Sometimes you might want to re-export items from one module into another.
    <pre><code className="language-javascript"> // moreUtils.js
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
    <strong>Browser Support and Loading Modules:</strong> Browsers support ES6 modules with <code className="language-javascript">&lt;script type="module"&gt;</code>. Using this, you can directly include modules in your HTML files:
    <pre><code className="language-javascript">&lt;script type="module"&gt;
  import { add } from './mathUtils.js';
  console.log(add(5, 3)); // 8
&lt;/script&gt;</code></pre>
    Modules Are Deferred: By default, ES6 modules in browsers are deferred, meaning they are only executed after the HTML document is completely parsed.
    <br/>
    Relative and Absolute Paths: When importing modules, you need to use file paths (relative or absolute). For example:
    <pre><code className="language-javascript">import { add } from './utils/math.js'; // relative path</code></pre>
  </li>
</ol>`,
            examples: [""],
            questions: [
              {
                question:
                  "What are ES6 modules, and how do they differ from traditional JavaScript scripts?",
                solution: `ES6 modules are a way to structure JavaScript code into reusable pieces. Unlike traditional scripts that can pollute the global namespace, modules encapsulate their code, allowing for better organization and maintainability. ES6 modules use the import and export keywords to share functionality between files.
              <pre><code className="language-javascript">
// math.js
export const add = (a, b) => a + b;
// app.js
import { add } from './math.js';
console.log(add(2, 3)); // 5
</code></pre>`,
              },
              {
                question:
                  "What is the difference between named exports and default exports?",
                solution: `Named exports allow you to export multiple variables or functions from a module, while a default export allows you to export a single entity from a module.
              <pre><code className="language-javascript">
// Named exports
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;            
// Default export
const greet = (name) => \`Hello, \${name}!\`;
export default greet;
</code></pre>`,
              },
              {
                question:
                  "How do you import a default export and a named export from a module?",
                solution: `To import both a default export and named exports, you can do the following:
              <pre><code className="language-javascript">
import greet, { add, subtract } from './math.js';
console.log(greet('Alice')); // "Hello, Alice!"
console.log(add(5, 3)); // 8
console.log(subtract(5, 3)); // 2
</code></pre>`,
              },
              {
                question:
                  "What is module scope, and how does it differ from global scope?",
                solution: `Module scope means that variables and functions defined within a module are not accessible outside of that module unless they are explicitly exported. In contrast, global scope allows variables and functions to be accessed anywhere in the application.
              <pre><code className="language-javascript">
// math.js
const privateVar = 42; // Not accessible outside this module
export const publicVar = 'I am public'; // Accessible
</code></pre>`,
              },
              {
                question: "What are re-exports in ES6 modules?",
                solution: `Re-exports allow you to export items from one module into another. This can be useful for aggregating exports.
              <pre><code className="language-javascript">
// moreUtils.js
export * from './mathUtils.js'; // Re-exports all exports from mathUtils.js
</code></pre>`,
              },
              {
                question:
                  "Can you explain circular dependencies in ES6 modules?",
                solution: `Circular dependencies occur when two or more modules depend on each other. This can lead to issues where one module may not be fully defined when another module tries to use it. It's generally best to avoid circular dependencies or to refactor the code to eliminate them.
              <pre><code className="language-javascript">
// a.js
import { b } from './b.js';
// b.js
import { a } from './a.js';
</code></pre>`,
              },
              {
                question: "How do you load ES6 modules in a web browser?",
                solution: `You can load ES6 modules in a web browser by using the script type="module" tag in your HTML file. This allows you to directly include and use modules.type="module" tag`,
              },
            ],
            links: [""],
          },
          {
            topic: "UseEffect Hook",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Props vs State",
            tags: [""],
            explanation: `<div>
   <p style="line-height: 1.75; margin-top: 1.5rem;">Memoization is an optimization method used to improve the overall performance of capabilities by caching their formerly computed effects. When a memoized function is called with a given set of arguments, it first tests if the end result for the ones arguments is already saved in a cache. If so, it returns the cached end result instead of recalculating it. Otherwise, it computes the end result, stores it in the cache, and returns it.
   </p>
   <p style="line-height: 1.75; margin-top: 1.5rem;">
   Memoization is particularly beneficial in eventualities where a function is computationally high priced and is called frequently with the equal set of arguments. It helps keep away from redundant calculations and improves the performance of packages.
   </p>

    <pre><code className="language-javascript">
    function memoize(fn) {
    const cache = {};
    return function (...args) {
        const key = JSON.stringify(args);
        if (cache[key]) {
            console.log('Fetching from cache:', key);
            return cache[key];
        } else {
            console.log('Calculating result for:', key);
            const result = fn(...args);
            cache[key] = result;
            return result;
        }
    };
}

function slowFunction(num) {
    // Simulate an expensive computation
    let result = 0;
    for (let i = 0; i <= num; i++) {
        result += i;
    }
    return result;
}

const memoizedSlowFunction = memoize(slowFunction);

console.log(memoizedSlowFunction(5));  // Calculating result
console.log(memoizedSlowFunction(5));  // Fetching from cache

    </code>
    </pre>
   </div>
            </>`,
            examples: [
              `let cache = {};
const addTen = function(num){
        if(num in cache){
          console.log("Inside Memoization block")
          return cache[num]
        }else{
          console.log("Inside Regular execution block")
          cache[num] = num + 10;
          return cache[num]
        }
}
console.log(addTen(20))
console.log(addTen(20))
Output of above snippet would be

Inside Regular execution block
30
Inside Memoization block
30`,
            ],
            questions: [
              {
                question:
                  "Can you write a memoization function for calculating the Fibonacci series?",
                solution: `<p>Here’s a memoization function for calculating the Fibonacci series:</p>
            <pre><code className="language-javascript">
            function memoizedFibonacci() {
              const cache = {};
              return function fib(n) {
                if (n < 2) {
                  return n;
                }
                if (cache[n]) {
                  return cache[n];
                }
                cache[n] = fib(n - 1) + fib(n - 2);
                return cache[n];
              };
            }
            
            const fibonacci = memoizedFibonacci();
            console.log(fibonacci(10)); // Outputs: 55
            console.log(fibonacci(5));  // Outputs: 5
            </code></pre>
            <p>This function caches previously computed Fibonacci numbers in the <code className="language-javascript">cache</code> object, reducing the number of recursive calls and improving performance.</p>`,
              },
              {
                question:
                  "Can you write a memoization function for finding the factorial of a number?",
                solution: `<p>Here’s a memoization function for calculating the factorial of a number:</p>
            <pre><code className="language-javascript">
            function memoizedFactorial() {
              const cache = {};
              return function fact(n) {
                if (n === 0 || n === 1) {
                  return 1;
                }
                if (cache[n]) {
                  return cache[n];
                }
                cache[n] = n * fact(n - 1);
                return cache[n];
              };
            }
            
            const factorial = memoizedFactorial();
            console.log(factorial(5));  // Outputs: 120
            console.log(factorial(6));  // Outputs: 720
            </code></pre>
            <p>The <code>memoizedFactorial</code> function caches the results of previously computed factorials, speeding up future calls with the same input.</p>`,
              },
              {
                question: "What is memoization in JavaScript?",
                solution:
                  "<p>Memoization is an optimization technique used to speed up function execution by storing the results of expensive function calls and returning the cached result when the same inputs occur again. It prevents redundant calculations, improving performance.</p>",
              },
              {
                question:
                  "Can you provide an example of memoization in JavaScript?",
                solution: `<p>Here’s a simple example of a memoization function:</p>
            <pre><code className="language-javascript">
            function memoize(fn) {
              const cache = {};
              return function(...args) {
                const key = JSON.stringify(args);
                if (cache[key]) {
                  return cache[key];
                } else {
                  const result = fn(...args);
                  cache[key] = result;
                  return result;
                }
              };
            }
            
            function slowFunction(num) {
              let result = 0;
              for (let i = 0; i <= num; i++) {
                result += i;
              }
              return result;
            }
            
            const memoizedSlowFunction = memoize(slowFunction);
            
            console.log(memoizedSlowFunction(5)); // Calculates result
            console.log(memoizedSlowFunction(5)); // Returns cached result
            </code></pre>
            <p>In this example, the <code>memoize</code> function caches the results of the <code>slowFunction</code>. The second time it’s called with the same argument, it returns the cached result instead of recalculating it.</p>`,
              },
              {
                question: "When should you use memoization?",
                solution:
                  "<p>Memoization should be used when a function is computationally expensive and is frequently called with the same arguments. This can happen in recursive algorithms (e.g., Fibonacci) or in situations where data fetching is repeated with the same parameters.</p>",
              },
              {
                question: "What are the trade-offs of memoization?",
                solution:
                  "<p>While memoization can improve performance by reducing redundant calculations, it comes with the cost of increased memory usage to store cached results. For large input spaces, this memory overhead can become significant. You may need to implement cache eviction strategies for long-running applications.</p>",
              },
              {
                question:
                  "How does memoization improve recursive algorithms like Fibonacci?",
                solution: `<p>Memoization optimizes recursive algorithms like Fibonacci by storing the results of subproblems to avoid redundant calculations. Without memoization, a naive recursive Fibonacci algorithm recalculates the same values multiple times, leading to an exponential time complexity. Memoization reduces this to linear time complexity (O(n)).</p>
            <pre><code className="language-javascript">
            function memoizedFibonacci() {
              const cache = {};
              return function fib(n) {
                if (n < 2) {
                  return n;
                }
                if (cache[n]) {
                  return cache[n];
                }
                cache[n] = fib(n - 1) + fib(n - 2);
                return cache[n];
              };
            }
            
            const fibonacci = memoizedFibonacci();
            console.log(fibonacci(10)); // Efficiently calculates the 10th Fibonacci number
            </code></pre>
            <p>In this example, the Fibonacci function uses memoization to store the results of previously computed Fibonacci numbers in the <code>cache</code>, improving performance.</p>`,
              },
              {
                question: "Can memoization be applied to all functions?",
                solution:
                  "<p>No, memoization is best suited for pure functions, i.e., functions that return the same output given the same input without side effects. Functions that rely on external states or have non-deterministic behavior, such as generating random values or making network requests, are not suitable for memoization.</p>",
              },
              {
                question:
                  "How would you handle memoization for functions with complex inputs (objects or arrays)?",
                solution: `<p>For functions with complex inputs like objects or arrays, memoization can be challenging because object references differ even if their contents are identical. One approach is to use <code>JSON.stringify()</code> to convert inputs into strings, which can be used as cache keys.</p>
            <pre><code className="language-javascript">
            function memoize(fn) {
              const cache = {};
              return function(...args) {
                const key = JSON.stringify(args);
                if (cache[key]) {
                  return cache[key];
                } else {
                  const result = fn(...args);
                  cache[key] = result;
                  return result;
                }
              };
            }
            </code></pre>
            <p>However, this approach can be inefficient for large, deeply nested objects, so specialized libraries like <code>lodash.memoize</code> or custom deep comparison functions might be needed for more complex cases.</p>`,
              },
              {
                question:
                  "What is the difference between memoization and caching?",
                solution:
                  "<p>Memoization is a specific form of caching where the focus is on storing the results of function calls based on their input arguments. Caching, in a broader sense, refers to storing any kind of data for quick retrieval, such as HTTP responses or database queries. Memoization typically applies to individual function calls, while caching is more general-purpose.</p>",
              },
              {
                question:
                  "How would you implement cache eviction in a memoization system?",
                solution:
                  "<p>To manage the memory overhead of memoization, you can implement cache eviction strategies such as Least Recently Used (LRU). In an LRU cache, the least recently accessed entries are removed when the cache reaches a certain size. This helps manage memory usage efficiently.</p>",
              },
            ],
            links: [""],
          },
          {
            topic: "Conditional Rendering",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Lists and Keys",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Event Handling",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "React Forms",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Fragments",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "React Router Basics",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Context API Basics",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Inline Styles",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "CSS Modules",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Styled Components",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "State Lifting",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Prop Drilling",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Error Boundaries",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "React.memo()",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "State Lifting",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "State Lifting",
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
            topic: "Error Boundaries Advanced",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "UseMemo Hook ",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "UseCallback Hook",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "UseReducer Hook",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Custom Hooks",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Context API Advanced",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "React Router Advanced",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Dynamic Routing",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Redux State Management",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Recoil State Management",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Redux Middleware",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "React Router Advanced",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Dynamic Routing",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Jest Unit Testing",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "React Testing Library",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Snapshot Testing",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "End-to-End Testing",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Concurrent Mode",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "React.lazy()",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Code Splitting",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Virtualization",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "End-to-End Testing",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Concurrent Mode",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "React.lazy()",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Code Splitting",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Virtualization",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "UseTransition Hook",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "SSR and SSG",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Higher-Order Components",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Controlled Components",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Atomic Design",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "React with TypeScript",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Webpack Basics",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "ESLint and Prettier",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "GraphQL with React",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Optimistic UI Updates",
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
  {
    id: 3,
    category: "Node",
    themeBgColor: "#BAF7DB",
    textColor: "#0E5835",
    topicColor: "#0E5835",
    lightColor: "#ecfdf5",
    type: [
      {
        id: 1,
        label: "Beginner",
        concepts: [
          {
            topic: "Node.js Introduction",
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
            questions: [],
            links: [],
          },
          {
            topic: "V8 Engine",
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
            questions: [],
            links: [],
          },
          {
            topic: "Event Loop",
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
            questions: [],
            links: [],
          },
          {
            topic: "Global Objects",
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
            questions: [],
            links: [],
          },
          {
            topic: "Modules System",
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
            questions: [],
            links: [],
          },
          {
            topic: "CommonJS Modules",
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
            questions: [],
            links: [],
          },
          {
            topic: "ES6 Modules",
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
            questions: [],
            links: [],
          },
          {
            topic: "Package.json",
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
            questions: [],
            links: [],
          },
          {
            topic: "npm Basics",
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
            questions: [],
            links: [],
          },
          {
            topic: "yarn Basics",
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
            questions: [],
            links: [],
          },
          {
            topic: "Asynchronous Programming",
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
            questions: [],
            links: [],
          },
          {
            topic: "Callbacks",
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
            questions: [],
            links: [],
          },
          {
            topic: "Promises",
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
            questions: [],
            links: [],
          },
          {
            topic: "async/await",
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
            questions: [],
            links: [],
          },
          {
            topic: "File System Module",
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
            questions: [],
            links: [],
          },
          {
            topic: "HTTP Module",
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
            questions: [],
            links: [],
          },
          {
            topic: "Streams",
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
            questions: [],
            links: [],
          },
          {
            topic: "Buffers",
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
            questions: [],
            links: [],
          },
          {
            topic: "Event Emitters",
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
            questions: [],
            links: [],
          },
          {
            topic: "URL Module",
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
            questions: [],
            links: [],
          },
          {
            topic: "Basic Routing",
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
            questions: [],
            links: [],
          },
          {
            topic: "Error Handling",
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
            questions: [],
            links: [],
          },
          {
            topic: "Middleware",
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
            questions: [],
            links: [],
          },
          {
            topic: "Environment Variables",
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
            questions: [],
            links: [],
          },
          {
            topic: "Basic Authentication",
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
            questions: [],
            links: [],
          },
          {
            topic: "Process Management",
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
            questions: [],
            links: [],
          },
          {
            topic: "Express Basics",
            tags: [""],
            explanation: ``,
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
            questions: [],
            links: [],
          },
          {
            topic: "Routing in Express",
            tags: [""],
            explanation: ``,
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
            questions: [],
            links: [],
          },
          {
            topic: "Static Files",
            tags: [""],
            explanation: ``,
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
            questions: [],
            links: [],
          },
          {
            topic: "Body Parser",
            tags: [""],
            explanation: ``,
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
            questions: [],
            links: [],
          },
          {
            topic: "CORS in Express",
            tags: [""],
            explanation: ``,
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
            questions: [],
            links: [],
          },
          {
            topic: "Node.js Debugging",
            tags: [""],
            explanation: ``,
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
            questions: [],
            links: [],
          },
          {
            topic: "REST APIs Basics",
            tags: [""],
            explanation: ``,
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
            questions: [],
            links: [],
          },
          {
            topic: "MVC Architecture",
            tags: [""],
            explanation: ``,
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
            questions: [],
            links: [],
          },
          {
            topic: "Error Handling",
            tags: [""],
            explanation: ``,
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
            questions: [],
            links: [],
          },
          {
            topic: "Path Module",
            tags: [""],
            explanation: ``,
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
            questions: [],
            links: [],
          },
          {
            topic: "Environment Variables",
            tags: [""],
            explanation: ``,
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
            questions: [],
            links: [],
          },
        ],
      },
      {
        id: 2,
        label: "Advance",
        concepts: [
          {
            topic: "Cluster Module",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Child Processes",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Worker Threads",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Streams Advanced",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Buffer Optimization",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "EventEmitter Advanced",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Session Management",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "JWT Authentication",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "OAuth2 Integration",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Websockets",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Rate Limiting",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Data Validation",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Request Validation",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Error Handling Patterns",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Logging with Winston",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Morgan for Logging",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Scaling Node.js Apps",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Load Balancing",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "PM2 Process Manager",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Microservices Architecture Advance",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "GraphQL with Node",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Apollo Server",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Database Integration",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "MongoDB with Mongoose",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "SQL with Sequelize",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Knex.js for SQL",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Redis Caching",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "File Uploading",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Multer for Uploads",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Unit Testing (Jest)",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Mocha and Chai",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Multer for Uploads",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Supertest for APIs",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Integration Testing",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Continuous Integration",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Docker with Node.js",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "CI/CD Pipelines",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Serverless Functions",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [""],
          },
          {
            topic: "Helmet Security",
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
  {
    id: 4,
    category: "Next",
    themeBgColor: "#E1E1E1",
    textColor: "#5D5D5D",
    topicColor: "#5D5D5D",
    lightColor: "#f9fafc",
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
