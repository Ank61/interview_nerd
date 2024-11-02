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
                question:
                  "What are the performance implications of using Maps versus Objects for large datasets in JavaScript?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Maps provide better performance than Objects for large datasets in specific scenarios, particularly when frequent additions and deletions of key-value pairs are required. This is because Maps are optimized for such operations, whereas Objects need to handle key-string conversion and prototype chain traversal, which can introduce overhead. Additionally, Maps maintain insertion order and allow non-string keys, making them more versatile for complex data structures, but with the trade-off of slightly more memory consumption compared to Objects.
                  </p>
                `,
              },
              {
                question:
                  "How does the internal implementation of Map in JavaScript ensure order preservation, and what are the potential trade-offs?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Maps in JavaScript maintain order by internally using linked lists or similar structures to track the insertion order of key-value pairs. This allows the <code>for...of</code> loop and methods like <code>entries()</code>, <code>keys()</code>, and <code>values()</code> to return items in the order of insertion. The trade-off is that order tracking introduces additional memory overhead and may lead to slower operations compared to unordered data structures. Moreover, maintaining this order could marginally affect performance in very large Maps when iterating or deleting elements.
                  </p>
                `,
              },
              {
                question:
                  "In what scenarios would a WeakMap's garbage collection behavior become crucial for maintaining application performance?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    A WeakMap’s garbage collection behavior becomes critical in scenarios where you need to associate temporary or auxiliary data with objects without preventing those objects from being garbage collected. For example, in cases like DOM element caching, memoization of function results, or storing metadata for objects that have a limited lifecycle, WeakMap ensures that once an object is no longer needed and no other references exist, the object and its associated data are automatically garbage collected. This helps in preventing memory leaks and reduces the overall memory footprint in long-running applications or memory-sensitive environments.
                  </p>
                `,
              },
              {
                question:
                  "How does the weak reference mechanism in a WeakMap affect the ability to enumerate or inspect keys and values?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    WeakMaps use weak references for keys, meaning that the JavaScript engine can garbage collect a key-value pair when there are no other references to the key object. As a result, WeakMaps do not support enumeration or inspection of keys and values through methods like <code>for...of</code>, <code>keys()</code>, or <code>values()</code>. This design ensures that the garbage collection process is transparent and automatic, but it also means that you cannot track or inspect the contents of a WeakMap programmatically, except by directly querying individual keys via the <code>get()</code> method.
                  </p>
                `,
              },
              {
                question:
                  "Why are WeakMaps considered useful for managing memory in complex JavaScript applications, and how does this relate to the concept of 'memory leaks'?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    WeakMaps are especially useful in complex JavaScript applications where objects might need to be temporarily linked to additional data, such as DOM elements or components. If a regular Map or Object were used in these cases, the referenced objects would not be garbage collected as long as they are held as keys in the Map, leading to potential memory leaks where unused memory is not released. WeakMaps avoid this issue by allowing the garbage collector to clean up key-value pairs when no other references to the key object exist. This automatic memory management helps in maintaining the performance and scalability of large applications, preventing memory from being held unnecessarily.
                  </p>
                `,
              },
              {
                question:
                  "What are the limitations of using WeakMaps in terms of key types, and why does JavaScript enforce these restrictions?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    The primary limitation of WeakMaps is that keys must be objects, not primitive values like strings or numbers. This restriction exists because WeakMaps rely on weak references, which only work with objects. Primitive values in JavaScript are immutable and not stored by reference, meaning that weak referencing them would be meaningless since primitives can't be garbage collected or tracked in the same way as objects.
                  </p>
                `,
              },
              {
                question:
                  "How does the choice of key types in a Map affect lookup performance, and what best practices should be followed when using complex keys?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    In Maps, keys can be of any type, including objects, unlike Objects, where keys must be strings or symbols. When using primitive values as keys, Map lookup performance is very fast since these are compared by value. However, when using complex objects as keys, the lookup performance can be slightly slower because Map checks object reference equality (i.e., if two objects are not the same instance, they are treated as different keys). For optimal performance, it’s recommended to use primitive types for keys when possible. If objects must be used as keys, ensure that key reuse (using the same object instance) is well-controlled to avoid unexpected behavior.
                  </p>
                `,
              },
              {
                question:
                  "What are the memory and performance trade-offs of using Map versus Object for storing large numbers of key-value pairs in JavaScript?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Maps generally consume more memory than Objects because they store additional metadata to support features such as preserving key insertion order and allowing non-string keys. However, Maps are optimized for scenarios involving frequent insertions and deletions, making them faster for these operations compared to Objects, which incur overhead due to string key conversion and potential prototype chain lookups. Maps also provide consistent performance for key lookups and deletions, regardless of the size of the dataset, whereas Object performance can degrade with large datasets due to hash collisions. Therefore, for large datasets with frequent operations, Maps offer better overall performance at the cost of higher memory consumption.
                  </p>
                `,
              },
              {
                question:
                  "How does the iteration behavior of Map differ from that of Object, and when should iteration order be a deciding factor in choosing between them?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Maps guarantee iteration order, meaning that elements are iterated in the order in which they were inserted. In contrast, Objects do not guarantee a reliable iteration order, especially for non-integer keys, and older JavaScript engines may iterate keys in arbitrary order. When order of elements is important for your application, such as when rendering items in a specific sequence or when processing key-value pairs in insertion order, a Map is the preferred choice. The trade-off, however, is that Maps have a slightly higher overhead due to the need to track insertion order, so if order is irrelevant, Object may be more efficient.
                  </p>
                `,
              },
              {
                question:
                  "In what scenarios would the use of Map's size property provide a performance advantage over calculating an Object's size using Object.keys().length?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    The <code>size</code> property of a Map provides constant-time access to the number of entries, making it highly efficient. In contrast, calculating the number of entries in an Object requires iterating over its keys using <code>Object.keys(obj).length</code>, which has linear-time complexity. This difference is especially significant in performance-critical applications where the size of the dataset is frequently queried. For large data structures or when needing to check the size of a collection multiple times, using Map provides a clear advantage, as accessing the <code>size</code> property is instantaneous regardless of the number of elements stored.
                  </p>
                `,
              },
              {
                question:
                  "What are the implications of Map's structural equality requirement for object keys, and how can developers manage the use of object keys effectively?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Maps in JavaScript use reference equality for object keys, meaning that two distinct object instances with the same properties will be considered different keys. This can lead to unexpected behavior if object keys are created dynamically and not reused consistently. To manage this effectively, developers should ensure that the same object reference is reused if the same key is intended to be accessed multiple times. Alternatively, using a unique identifier or stringified version of the object as a key can help mitigate issues related to reference equality. This strategy is particularly useful when working with objects that are recreated during execution.
                  </p>
                `,
              },
              {
                question:
                  "How can Maps be leveraged to implement a cache in JavaScript, and what are the advantages and potential pitfalls of this approach?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Maps can be used to implement a simple cache by storing key-value pairs where the keys represent input data and the values represent cached results. Since Maps maintain insertion order and allow any data type as keys, they are well-suited for caching complex data structures. A key advantage of using Maps is the <code>has()</code> method, which enables fast lookup to check if an item is already cached. However, one pitfall is that Maps do not automatically manage cache size or expiration, so developers must implement strategies like manually clearing the Map or limiting its size to avoid excessive memory usage. For more advanced scenarios, <code>WeakMap</code> could be used for caching data with a limited lifecycle.
                  </p>
                `,
              },
              {
                question:
                  "How does the spread operator (...) affect Maps in JavaScript, and what are the performance implications of converting Maps to Arrays and vice versa?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    The spread operator can be used to convert a Map into an Array by spreading its entries, such as <code>[...myMap]</code>. Similarly, a Map can be created from an Array of key-value pairs by passing the array to the Map constructor. While these operations are convenient, they involve iterating over the entire Map or Array, which can be expensive for large datasets. The performance of such conversions depends on the size of the data structure. When working with large Maps or Arrays, it's important to minimize the frequency of such conversions to avoid performance bottlenecks.
                  </p>
                `,
              },
              {
                question:
                  "How do Maps handle NaN as a key, and how does this differ from the behavior of Objects with NaN properties?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Maps in JavaScript treat <code>NaN</code> as equal to itself, meaning that <code>map.set(NaN, 'value1')</code> followed by <code>map.set(NaN, 'value2')</code> will overwrite the original value, as both instances of <code>NaN</code> are considered the same key. In contrast, Objects treat <code>NaN</code> like any other property, but since object keys are strings, <code>NaN</code> is implicitly converted to the string "NaN". As a result, multiple <code>NaN</code> values can be added to an Object without overwriting each other, but this could lead to unexpected behavior, especially if numeric values are expected. Maps, with their strict treatment of <code>NaN</code> as equal, provide a more predictable approach.
                  </p>
                `,
              },
              {
                question:
                  "How does Map's insertion order preservation affect the performance of frequent reordering operations, and what alternatives exist for faster insertion and sorting?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Map preserves the order of entries as they are inserted, which can slow down operations that involve frequent reordering, such as moving entries to the front or the back of the Map. This is because Maps are optimized for maintaining a stable insertion order, not for efficient reordering. In scenarios where reordering is frequent, a combination of an array and a plain object (for fast lookups) may provide better performance. Using an array for order and an object for quick access allows for more efficient manipulation, but at the cost of losing Map-specific features like non-string keys and the <code>size</code> property.
                  </p>
                `,
              },
              {
                question:
                  "How does JavaScript's garbage collection mechanism interact with entries in a Map, and when could this lead to potential memory retention issues?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Maps in JavaScript strongly reference both their keys and values, meaning that as long as a key-value pair is in the Map, neither the key nor the value will be garbage collected. This can lead to potential memory retention issues, especially if large objects are used as keys or values and are no longer needed. The garbage collector will not reclaim the memory for these objects as long as they remain referenced by the Map. To mitigate this, developers should ensure that unnecessary entries are removed from the Map using <code>map.delete(key)</code>, or consider using a <code>WeakMap</code> if they only need weak references for the keys.
                  </p>
                `,
              },
              {
                question:
                  "What are the differences between Map and WeakMap in terms of key management and performance for long-running applications?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    The key difference between Map and WeakMap lies in key management. In a Map, keys can be of any type and are strongly referenced, meaning that they won't be garbage collected until they are explicitly removed. This can be problematic in long-running applications where memory usage may grow indefinitely if unused keys are not cleaned up. In contrast, WeakMap keys must be objects and are weakly referenced, allowing the garbage collector to automatically remove key-value pairs when the key is no longer referenced elsewhere. For long-running applications, using WeakMaps for short-lived objects can improve performance by reducing memory consumption and preventing memory leaks.
                  </p>
                `,
              },
              {
                question:
                  "How does the <code>forEach</code> method in Map differ from iterating with a <code>for...of</code> loop, and what are the performance implications of each?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    The <code>forEach</code> method in Map executes a provided function once for each key-value pair, allowing custom iteration logic. It is generally considered less efficient than a <code>for...of</code> loop because <code>forEach</code> requires invoking a callback for each iteration, which introduces additional function call overhead. In contrast, <code>for...of</code> is more performant for simple iteration as it directly retrieves each entry without the need for function calls. When performance is critical, especially in large Maps, using <code>for...of</code> is preferable due to its lower overhead, while <code>forEach</code> is useful for more complex scenarios where custom logic is needed during iteration.
                  </p>
                `,
              },
              {
                question:
                  "What are the considerations for using Map versus Set in terms of performance and functionality, and when should each be preferred?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Maps and Sets serve different purposes in JavaScript. Maps are designed for key-value pairs, where each key can be of any type, while Sets are designed to store unique values without key-value associations. In terms of performance, both Maps and Sets offer fast lookup times (O(1) complexity) for their respective data types. However, Maps incur additional overhead for managing key-value pairs, while Sets are more lightweight since they only store values. Sets are preferable when you need to store unique values and perform operations like unions or intersections, while Maps should be used when key-value relationships are needed. Choosing the correct structure is crucial for optimizing both performance and memory usage.
                  </p>
                `,
              },
              {
                question:
                  "How can Maps be used to implement a Least Recently Used (LRU) cache, and what considerations should be taken into account for performance optimization?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Maps can be used to implement a Least Recently Used (LRU) cache by tracking insertion order and moving accessed entries to the end of the Map to denote recent usage. The cache can be optimized by using the <code>delete</code> and <code>set</code> methods to remove the least recently used entry (the first item in the Map) and then reinsert it at the end when accessed. However, frequent reordering can introduce performance overhead, so developers should limit the cache size and ensure that eviction logic is efficient. A hybrid approach, using both a Map and a doubly-linked list, can further optimize performance by reducing the cost of reordering entries.
                  </p>
                `,
              },
              {
                question:
                  "What are the trade-offs of using Maps with custom iterators, and how can custom iteration logic improve performance or flexibility?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Custom iterators in Maps allow for more flexible iteration logic, such as skipping certain entries or performing operations in a specific order. While they provide greater control, custom iterators can introduce additional complexity and potential performance costs, especially if the iteration logic involves frequent lookups or modifications to the Map. The trade-off is between flexibility and performance—custom iterators allow fine-tuned control over the iteration process but may slow down iteration compared to using built-in methods like <code>for...of</code> or <code>entries()</code>. To improve performance, developers should ensure that custom iteration logic is optimized for the specific use case and avoid unnecessary modifications during iteration.
                  </p>
                `,
              },
              {
                question:
                  "What are the limitations of using Maps with non-primitive keys and how does this affect equality checks?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Maps allow any object type to be used as a key, unlike Objects, which only allow strings or symbols. However, this comes with a caveat: Map uses the <code>SameValueZero</code> algorithm for key comparison, meaning that two objects are considered distinct even if they have identical properties. For example, <code>map.set({}, 'value1')</code> followed by <code>map.set({}, 'value2')</code> will result in two separate entries, because the two empty objects are different instances. This limitation makes Map unsuitable for cases where you need deep equality comparisons of object keys, as Map only checks references, not the values or structure of the objects.
                  </p>
                `,
              },
              {
                question:
                  "How does the size of a Map affect performance when performing lookups, and how can you optimize lookups in very large Maps?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Maps in JavaScript have constant time complexity O(1) for lookups, but this performance can degrade slightly as the size of the Map grows due to internal hash table management. For very large Maps, optimizing lookups involves minimizing hash collisions by ensuring that keys are sufficiently unique. Additionally, splitting large Maps into smaller, more manageable chunks, such as using a Map of Maps or implementing a sharding mechanism, can help distribute the load and improve lookup performance. It's also advisable to avoid storing complex or large objects as keys, as this can slow down hash calculation and reference checks.
                  </p>
                `,
              },
              {
                question:
                  "What are the trade-offs of using Maps with large datasets in memory-constrained environments, and how can you mitigate memory issues?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    While Maps offer efficient key-value storage, their memory consumption can be significant, especially with large datasets. This is due to Maps storing both keys and values in a separate structure from the main execution environment, which can result in higher memory overhead compared to Objects. In memory-constrained environments, this could lead to performance degradation or out-of-memory errors. To mitigate memory issues, developers can use <code>WeakMaps</code> for objects with short lifecycles, manually clear unused entries with <code>map.delete(key)</code>, or implement data eviction strategies, such as LRU caching, to remove less frequently used entries and free up memory.
                  </p>
                `,
              },
              {
                question:
                  "What considerations should be made when using Maps for concurrent data operations in JavaScript, especially in multithreaded environments like Web Workers?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    JavaScript is single-threaded by default, meaning that operations on Maps are generally safe from race conditions. However, in multithreaded environments like Web Workers or when using SharedArrayBuffer, concurrent access to Maps must be managed carefully. Since Maps are not inherently thread-safe, simultaneous read and write operations across threads can lead to inconsistent states or data corruption. To handle this, you should either avoid sharing Maps between threads, use message passing to synchronize data between workers, or implement locking mechanisms using external libraries that provide concurrency control, ensuring that only one thread can modify the Map at a time.
                  </p>
                `,
              },
              {
                question:
                  "How does the garbage collection behavior of objects in Maps differ from WeakMaps, and when should you prefer one over the other?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Maps strongly reference both their keys and values, meaning that objects stored as keys or values in a Map will not be garbage collected until they are explicitly removed from the Map. This is different from WeakMaps, where keys are weakly referenced and can be garbage collected when no other references to the key exist. WeakMaps are preferable when you need to associate metadata or temporary data with objects and ensure that memory is released when the object is no longer in use. Maps should be used when strong references to keys and values are required for the duration of their lifetime in memory.
                  </p>
                `,
              },
              {
                question:
                  "What are the best practices for ensuring optimal performance when frequently adding and deleting key-value pairs in a large Map?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    To optimize performance when frequently adding and deleting key-value pairs in a large Map, it's important to minimize the number of rehashing operations. Rehashing occurs when the Map’s internal capacity is exceeded, leading to costly resizing operations. To avoid frequent resizing, it's recommended to pre-allocate a large initial size for the Map if you expect a large dataset. Additionally, batching operations, such as adding or removing multiple entries at once, can reduce the overhead of multiple rehashes. Regularly cleaning up unused entries using <code>map.delete(key)</code> will also ensure that the Map's memory footprint remains manageable.
                  </p>
                `,
              },
              {
                question:
                  "How can you improve the efficiency of Map operations when working with hierarchical or nested data structures?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    When working with hierarchical or nested data structures in Maps, performance can degrade if deeply nested lookups are frequent. To improve efficiency, consider flattening the data structure where possible or using a Map of Maps. This allows you to avoid deep lookups by grouping related key-value pairs into separate Maps, effectively reducing the depth of nested operations. Additionally, using a caching mechanism to store frequently accessed nested data can help avoid redundant lookups. It's also beneficial to use well-structured key naming conventions that allow for faster access and retrieval.
                  </p>
                `,
              },
              {
                question:
                  "How does the <code>Symbol.iterator</code> property enhance the flexibility of Maps, and what are the potential use cases for customizing iteration behavior?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    The <code>Symbol.iterator</code> property in Maps allows for custom iteration behavior by defining how the Map should be iterated over using constructs like <code>for...of</code> or spread syntax. This can be useful for customizing iteration logic, such as skipping certain entries, filtering results, or iterating in a specific order. Potential use cases include iterating over Maps with conditional logic (e.g., only iterating over entries that match a certain criterion) or modifying how key-value pairs are returned, such as swapping the key and value in each iteration. Custom iterators provide enhanced flexibility in how Maps are processed, especially in scenarios where fine-grained control over iteration is required.
                  </p>
                `,
              },
            ],
            links: [""],
          },
          {
            topic: "Set",
            tags: [""],
            explanation: `<p style="margin-top: 1.0rem;">
  In JavaScript, a <strong>Set</strong> is an integrated object that allows you to store unique values of any type, whether primitive values or object references. Unlike arrays, Sets automatically enforce uniqueness, meaning you can't have duplicate elements in a Set.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Key Features of Sets</h4>

<p style="margin-top: 1.0rem;">
  <strong>Unique Values:</strong> A Set only stores unique elements, ensuring there are no duplicates. If you attempt to add a value that already exists in the Set, it will be ignored.
</p>

<p style="margin-top: 1.0rem;">
  <strong>Order of Elements:</strong> Sets preserve the insertion order of values. When you iterate over a Set, elements are returned in the order they were added.
</p>

<p style="margin-top: 1.0rem;">
  <strong>Flexibility in Value Types:</strong> Sets can store values of any type, including primitive values (like strings, numbers, booleans) and object references.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Creating a Set</h4>

<p style="margin-top: 1.0rem;">
  You can create a Set using the Set constructor:
</p>

<pre><code className="language-javascript">
const mySet = new Set();
</code></pre>

<p style="margin-top: 1.0rem;">
  You can also initialize a Set with an iterable, such as an array:
</p>

<pre><code className="language-javascript">
const mySet = new Set([1, 2, 3, 3, 4]);
console.log(mySet); // Output: Set { 1, 2, 3, 4 }
</code></pre>

<p style="margin-top: 1.0rem;">
  In the example above, 3 is added only once since Sets enforce uniqueness.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Common Methods and Properties</h4>

<ul style="margin-top: 0.5rem; margin-left: 1.5rem; list-style-type: disc;">
  <li><code>add(value)</code>: Adds a new value to the Set.</li>
</ul>

<pre><code className="language-javascript">
const mySet = new Set();
mySet.add(10);
mySet.add(20);
console.log(mySet); // Output: Set { 10, 20 }
</code></pre>

<ul style="margin-top: 0.5rem; margin-left: 1.5rem; list-style-type: disc;">
  <li><code>has(value)</code>: Checks if a specific value exists in the Set. Returns true or false.</li>
</ul>

<pre><code className="language-javascript">
console.log(mySet.has(10)); // Output: true
console.log(mySet.has(30)); // Output: false
</code></pre>

<ul style="margin-top: 0.5rem; margin-left: 1.5rem; list-style-type: disc;">
  <li><code>delete(value)</code>: Removes a specific value from the Set.</li>
</ul>

<pre><code className="language-javascript">
mySet.delete(10);
console.log(mySet); // Output: Set { 20 }
</code></pre>

<ul style="margin-top: 0.5rem; margin-left: 1.5rem; list-style-type: disc;">
  <li><code>size</code>: Returns the number of elements in the Set.</li>
</ul>

<pre><code className="language-javascript">
console.log(mySet.size); // Output: 1
</code></pre>

<ul style="margin-top: 0.5rem; margin-left: 1.5rem; list-style-type: disc;">
  <li><code>clear()</code>: Removes all elements from the Set.</li>
</ul>

<pre><code className="language-javascript">
mySet.clear();
console.log(mySet.size); // Output: 0
</code></pre>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Iterating Over a Set</h4>

<p style="margin-top: 1.0rem;">
  You can iterate through the elements of a Set using methods like <code>forEach()</code>, or by using a <code>for...of</code> loop:
</p>

<pre><code className="language-javascript">
// forEach
const set = new Set([1, 2, 3]);
set.forEach(value => {
  console.log(value); // Output: 1, 2, 3 (each in a new line)
});
</code></pre>

<pre><code className="language-javascript">
// for...of loop
for (let value of set) {
  console.log(value); // Output: 1, 2, 3
}
</code></pre>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Working with Sets and Arrays</h4>

<p style="margin-top: 1.0rem;">
  Convert a Set to an Array:
</p>

<pre><code className="language-javascript">
const set = new Set([1, 2, 3]);
const array = [...set];
console.log(array); // Output: [1, 2, 3]
</code></pre>

<p style="margin-top: 1.0rem;">
  Convert an Array to a Set (to remove duplicates):
</p>

<pre><code className="language-javascript">
const array = [1, 2, 2, 3, 4, 4, 5];
const uniqueSet = new Set(array);
const uniqueArray = [...uniqueSet];
console.log(uniqueArray); // Output: [1, 2, 3, 4, 5]
</code></pre>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Set Operations</h4>

<p style="margin-top: 1.0rem;">
  Union: Combine the elements of two Sets.
</p>

<pre><code className="language-javascript">
const setA = new Set([1, 2, 3]);
const setB = new Set([3, 4, 5]);

const unionSet = new Set([...setA, ...setB]);
console.log(unionSet); // Output: Set { 1, 2, 3, 4, 5 }
</code></pre>

<p style="margin-top: 1.0rem;">
  Intersection: Find the common elements between two Sets.
</p>

<pre><code className="language-javascript">
const intersectionSet = new Set([...setA].filter(x => setB.has(x)));
console.log(intersectionSet); // Output: Set { 3 }
</code></pre>

<p style="margin-top: 1.0rem;">
  Difference: Find elements that are in one Set but not in another.
</p>

<pre><code className="language-javascript">
const differenceSet = new Set([...setA].filter(x => !setB.has(x)));
console.log(differenceSet); // Output: Set { 1, 2 }
</code></pre>

<p style="margin-top: 1.0rem;">
  Subset: Check if one Set is a subset of another.
</p>

<pre><code className="language-javascript">
const isSubset = [...setA].every(x => setB.has(x));
console.log(isSubset); // Output: false
</code></pre>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">WeakSet</h4>

<p style="margin-top: 1.0rem;">
  A <strong>WeakSet</strong> is similar to a Set, but it only holds weak references to its values, which must be objects. If there are no other references to an object stored in a WeakSet, the object can be garbage collected, helping manage memory.
</p>

<p style="margin-top: 1.0rem;">
  <strong>Key differences between WeakSet and Set:</strong>
</p>

<ul style="margin-top: 0.5rem; margin-left: 1.5rem; list-style-type: disc;">
  <li>Only objects can be stored in a WeakSet (no primitives like numbers or strings).</li>
  <li>No enumeration methods: You cannot iterate over a WeakSet or access its contents. There are no <code>forEach()</code>, <code>size</code>, <code>keys()</code>, or <code>values()</code> methods.</li>
</ul>

<pre><code className="language-javascript">
const weakSet = new WeakSet();
const obj1 = { name: 'John' };
const obj2 = { age: 30 };

weakSet.add(obj1);
weakSet.add(obj2);

console.log(weakSet.has(obj1)); // Output: true

weakSet.delete(obj1);
console.log(weakSet.has(obj1)); // Output: false
</code></pre>`,
            examples: [""],
            questions: [
              {
                question:
                  "What are the key differences between Sets and Arrays in JavaScript, and when would you prefer to use a Set?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Sets are collections of unique values, meaning they automatically prevent duplicate entries. In contrast, Arrays can contain duplicates and maintain the order of elements. You would prefer to use a Set when you need to ensure uniqueness, such as when storing a list of user IDs or tags. Additionally, Sets offer optimized performance for certain operations, like checking for existence (O(1) complexity), compared to the O(n) complexity for Arrays using <code>Array.includes()</code>.
                  </p>
                `,
              },
              {
                question:
                  "How do you efficiently convert an Array with potential duplicates into a Set and back into an Array?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    To convert an Array into a Set, simply pass the Array to the Set constructor: <code>const uniqueSet = new Set(array);</code>. This removes any duplicate values. To convert the Set back into an Array, use the spread operator: <code>const uniqueArray = [...uniqueSet];</code>. This is a common pattern for deduplication in JavaScript.
                  </p>
                `,
              },
              {
                question:
                  "What are some performance considerations when using Sets with large datasets, and how can you mitigate potential issues?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Sets have average time complexities of O(1) for add, delete, and has operations, but performance can degrade with very large datasets due to memory overhead and garbage collection. To mitigate potential issues, it's essential to avoid storing large objects or deeply nested structures as Set elements. If necessary, use <code>WeakSet</code> for temporary object storage, as it allows for automatic garbage collection of objects that are no longer in use.
                  </p>
                `,
              },
              {
                question:
                  "How does the garbage collection behavior of Sets differ from WeakSets, and in what scenarios should you choose one over the other?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Sets maintain strong references to their values, preventing them from being garbage collected as long as they remain in the Set. In contrast, WeakSets hold weak references to their objects, allowing for garbage collection if no other references to those objects exist. Choose Sets when you need to keep the values alive for the duration of the Set’s lifetime, and use WeakSets when associating metadata or transient data with objects that may be freed by the garbage collector.
                  </p>
                `,
              },
              {
                question:
                  "What are the implications of using Sets in terms of memory usage compared to Arrays, especially when storing large amounts of data?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Sets generally consume more memory than Arrays because they maintain additional internal structures to ensure uniqueness and optimize performance. When dealing with large datasets, this can lead to increased memory usage and potential performance issues. To manage memory effectively, avoid unnecessary duplication of data by leveraging Sets for deduplication only when needed. Additionally, consider using Typed Arrays for numeric data, which can be more memory-efficient.
                  </p>
                `,
              },
              {
                question:
                  "How can you customize iteration over a Set using the <code>Symbol.iterator</code> property, and what use cases might benefit from this customization?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    The <code>Symbol.iterator</code> property allows you to define custom iteration behavior for a Set. For example, you might want to skip certain values or return values in a specific order. A use case for this customization could involve creating a Set of user roles and needing to filter out certain roles during iteration. Custom iterators enhance flexibility, allowing for tailored processing of the Set entries.
                  </p>
                `,
              },
              {
                question:
                  "What are the best practices for ensuring optimal performance when frequently adding and removing elements from a large Set?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    To optimize performance with a large Set, batch operations whenever possible instead of adding or removing elements one at a time. Minimize frequent mutations, as Sets can incur overhead when resizing their internal storage. If a Set becomes too large or experiences high mutation rates, consider transitioning to another data structure or implementing a data eviction strategy to manage the size and ensure performance remains stable.
                  </p>
                `,
              },
              {
                question:
                  "How can you determine if two Sets are equal in JavaScript, considering their contents?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    To check if two Sets are equal, you need to compare their sizes first; if they differ, they are not equal. Then, iterate through one Set and check if each element exists in the other Set using the <code>has()</code> method. Keep in mind that Set equality checks require a deep comparison of their elements if they contain objects, as Sets do not consider objects equal based on their contents but rather their references.
                  </p>
                `,
              },
              {
                question:
                  "What methods are available for manipulating Sets in JavaScript, and how do they differ from Array methods?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Sets provide several methods for manipulation, including <code>add(value)</code>, <code>delete(value)</code>, and <code>clear()</code>, which allow you to add, remove, and clear all values, respectively. Unlike Arrays, Sets do not have methods like <code>push()</code> or <code>pop()</code>, as they do not maintain order or allow duplicates. This makes Sets more suitable for scenarios where you need unique values without concern for ordering.
                  </p>
                `,
              },
              {
                question:
                  "Can you explain the performance implications of using Sets for large datasets versus using an object for unique keys?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Sets provide O(1) time complexity for add, delete, and has operations, making them efficient for maintaining unique values. However, they may consume more memory than objects due to their internal data structures. Objects also have O(1) average time complexity for property access, but they can contain duplicate keys. If your data primarily consists of unique keys without associated values, Sets might be the better choice for performance and memory efficiency.
                  </p>
                `,
              },
              {
                question:
                  "What is the significance of the order of elements in a Set, and how does it differ from that of an Array?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Sets maintain the insertion order of elements, allowing you to iterate through them in the order they were added. However, unlike Arrays, Sets do not have indexing, so you cannot access elements by position. This characteristic makes Sets suitable for use cases where the order of unique values is important, but direct indexing is not needed.
                  </p>
                `,
              },
              {
                question:
                  "How can you convert a Set back to a Map, and what would be the use case for this transformation?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    You can convert a Set back to a Map by using the <code>Map</code> constructor and providing an iterable. For example: <code>const mapFromSet = new Map([...set].map(value => [value, someDefaultValue]));</code>. This transformation is useful when you want to associate additional data with each unique value from the Set, allowing you to leverage Map's key-value structure while starting from unique elements.
                  </p>
                `,
              },
              {
                question:
                  "What is a practical scenario where you would use a Set instead of a Map?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    A practical scenario for using a Set instead of a Map is when you need to track a list of unique user IDs for authentication. In this case, you only need to store the IDs without any associated data. A Set provides efficient membership checking and ensures that each user ID is unique, making it ideal for this use case. Using a Map would be unnecessary overhead since you don't need key-value pairs.
                  </p>
                `,
              },
              {
                question:
                  "How do Sets handle primitive types and object references, and what implications does this have for data storage?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Sets treat primitive types as unique values based on their value, while object references are treated as unique based on their reference. For example, two objects with the same properties are considered different if they are distinct instances. This behavior has implications for data storage: if you store objects in a Set, you must be aware that identical objects (with the same content) will not be treated as duplicates unless they are the same reference, which can lead to unexpected results.
                  </p>
                `,
              },
              {
                question:
                  "Can you explain the difference between <code>Set.prototype.forEach</code> and the traditional <code>for...of</code> loop when iterating over Sets?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Both <code>Set.prototype.forEach</code> and the <code>for...of</code> loop allow you to iterate over the values in a Set, but they differ in syntax and use cases. <code>forEach</code> accepts a callback function and can pass additional arguments (the value and the Set itself) to the function. In contrast, <code>for...of</code> is simpler and more concise, iterating directly over the values without needing a callback. You might prefer <code>for...of</code> for cleaner code when no additional arguments or complex logic are required.
                  </p>
                `,
              },
              {
                question:
                  "How can you create a Set of objects, and what precautions should you take when doing so?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    You can create a Set of objects by simply passing an array of objects to the Set constructor: <code>const mySet = new Set([{ id: 1 }, { id: 2 }, { id: 1 }]);</code>. However, because Sets consider object references, two different object instances with the same properties will be treated as distinct entries. To ensure uniqueness based on object properties rather than references, you may need to implement a custom method to compare objects before adding them to the Set.
                  </p>
                `,
              },
              {
                question:
                  "What happens when you attempt to add the same object to a Set multiple times?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    When you attempt to add the same object instance to a Set multiple times, it will only be stored once, as Sets enforce uniqueness. If you have the same object reference, subsequent calls to <code>add()</code> will not change the Set. However, if you create a new object with the same properties, that new instance will be considered unique and added to the Set as a separate entry.
                  </p>
                `,
              },
              {
                question:
                  "What is the difference between a Set and a WeakSet, and when should you choose one over the other?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    A Set holds strong references to its values, meaning the values will not be garbage collected as long as they are in the Set. In contrast, a WeakSet holds weak references, allowing for garbage collection of its objects if there are no other references to them. You should choose a WeakSet when you want to associate metadata with objects and want those objects to be automatically cleaned up when they are no longer in use. A Set is preferable when you need to maintain a list of values and require the ability to iterate over them.
                  </p>
                `,
              },
              {
                question:
                  "How can you efficiently determine if a large dataset contains duplicates using Sets?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    To determine if a large dataset contains duplicates using Sets, you can create a Set from the dataset. As you iterate through the dataset, attempt to add each element to the Set. If you encounter an element that already exists in the Set (using the <code>has</code> method), it indicates a duplicate. This approach is efficient because it leverages the O(1) time complexity of Sets for insertions and lookups, making it a suitable solution for large datasets.
                  </p>
                `,
              },
              {
                question:
                  "What happens when you use non-primitive values as keys in a Set, and how does this affect equality checks?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    In a Set, non-primitive values (like objects or arrays) are treated based on reference equality, not structural equality. This means that two objects with the same properties will be considered distinct entries in the Set if they are different instances. For example, <code>const a = {}; const b = {}; mySet.add(a); mySet.add(b);</code> will result in two separate entries, even though <code>a</code> and <code>b</code> have identical structures. This behavior can lead to unexpected results when trying to check for duplicates based on content.
                  </p>
                `,
              },
              {
                question:
                  "How can you create a Set from an Array and ensure unique values while ignoring case sensitivity?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    To create a Set from an Array while ensuring unique values that ignore case sensitivity, you can use the <code>map</code> method to convert all elements to a common case (e.g., lowercase) before passing them to the Set constructor: <code>const uniqueSet = new Set(array.map(item => item.toLowerCase()));</code>. This will ensure that values like "Apple" and "apple" are treated as the same entry in the Set.
                  </p>
                `,
              },
              {
                question:
                  "What are some common use cases for utilizing Sets in JavaScript applications?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Common use cases for utilizing Sets include:
                    <ul>
                      <li><strong>Removing duplicates:</strong> Easily filter out duplicate values from arrays.</li>
                      <li><strong>Membership tests:</strong> Quickly check for the existence of a value in a dataset.</li>
                      <li><strong>Tracking unique items:</strong> Maintain a collection of unique identifiers, such as user IDs or product SKUs.</li>
                      <li><strong>Combining datasets:</strong> Easily union and intersection operations on multiple datasets to find common or unique values.</li>
                    </ul>
                  </p>
                `,
              },
              {
                question:
                  "How can you use the <code>Set.prototype.values()</code> method, and how does it compare to <code>Set.prototype.entries()</code>?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    The <code>Set.prototype.values()</code> method returns a new iterator object that contains the values for each element in the Set, in insertion order. This method is similar to the <code>Set.prototype.entries()</code> method, which returns an iterator of [value, value] pairs. Since Sets only store unique values (without keys), both methods effectively yield the same values, but <code>values()</code> is typically used for clarity when you are only interested in the values.
                  </p>
                `,
              },
              {
                question:
                  "What is the performance impact of using a Set versus an Array when frequently checking for the existence of elements?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    Sets provide O(1) average time complexity for existence checks using the <code>has</code> method, making them much faster than Arrays, which require O(n) time complexity for the same operation using the <code>includes</code> method. Therefore, when working with large datasets where frequent membership checks are necessary, using a Set will significantly improve performance compared to using an Array.
                  </p>
                `,
              },
              {
                question:
                  "How do you handle complex data structures, like Sets of objects, and ensure they remain unique based on certain properties?",
                solution: `
                  <p style="margin-top: 0.5rem;">
                    To ensure uniqueness based on specific properties in a Set of objects, you can use a helper structure, like a Map, to track seen properties while adding objects to the Set. For example, iterate over your objects, and for each object, check if its unique property exists in the Map before adding it to the Set. If not, add the object to both the Set and the Map: 
                  <code>
                    const seen = new Map(); 
                    const uniqueSet = new Set(); 
                    array.forEach(item => { 
                      if (!seen.has(item.uniqueProperty)) { 
                        seen.set(item.uniqueProperty, true); 
                        uniqueSet.add(item); 
                      } 
                    });
                  </code>
                  This approach will ensure that only unique objects based on the specified property are added to the Set.
                  </p>
                `,
              },
            ],
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
            explanation: `<p style="margin-top: 1.0rem;">
  In JavaScript, shallow copy and deep copy are two methods of creating objects, but they handle issues with nested objects or arrays in a copied object differently.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">1. Shallow Copy</h4>

<p style="margin-top: 1.0rem;">
  A shallow copy only duplicates the top-level properties of the object. If a property has a primitive value (such as a number or a string), the value is copied. However, if the property is a reference to another object (such as an array or another object), it is simply a copy of the reference. This means that changes to nested objects in the original or copied object will be reflected in both, because they refer to the same context.
</p>

<pre><code class="language-javascript">
const original = { name: "Alice", address: { city: "Wonderland" } };
const shallowCopy = { ...original };

shallowCopy.name = "Bob"; // Changes the name in the shallow copy
shallowCopy.address.city = "New Wonderland"; // Changes city in both original and shallowCopy

console.log(original); // { name: "Alice", address: { city: "New Wonderland" } }
console.log(shallowCopy); // { name: "Bob", address: { city: "New Wonderland" } }
</code></pre>

<p style="margin-top: 1.0rem;">
  In the example above, <code>name</code> is a primitive, so changing it in <code>shallowCopy</code> doesn’t affect <code>original</code>. But <code>address</code> is an object, so modifying its properties in <code>shallowCopy</code> affects <code>original</code>.
</p>

<p style="margin-top: 1.0rem;">
  Ways to create a shallow copy:
</p>
<ol style="margin-top: 0.5rem; margin-left: 1.5rem; list-style-type: disc;">
  <li><code class="language-javascript">Object.assign()</code></li>
  <li><code class="language-javascript">Spread operator (...)</code> for objects and arrays</li>
  <li><code class="language-javascript">Array.prototype.slice()</code> for arrays</li>
</ol>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">2. Deep Copy</h4>

<p style="margin-top: 1.0rem;">
  A deep copy duplicates all levels of an object, including nested objects. This means that a completely separate copy of the original object and all its nested properties are created. Changes to the nested objects in the copy do not affect the original, and vice versa.
</p>

<p style="margin-top: 1.0rem;">
  Example of Deep Copy:
</p>

<pre><code class="language-javascript">
const original = { name: "Alice", address: { city: "Wonderland" } };
const deepCopy = JSON.parse(JSON.stringify(original));

deepCopy.name = "Bob"; // Changes only in the deepCopy
deepCopy.address.city = "New Wonderland"; // Changes city only in deepCopy

console.log(original); // { name: "Alice", address: { city: "Wonderland" } }
console.log(deepCopy); // { name: "Bob", address: { city: "New Wonderland" } }
</code></pre>

<p style="margin-top: 1.0rem;">
  In this example, the <code>address</code> object in <code>original</code> and <code>deepCopy</code> are separate objects. Modifying one does not affect the other.
</p>

<p style="margin-top: 1.0rem;">
  Ways to create a deep copy:
</p>
<ol style="margin-top: 0.5rem; margin-left: 1.5rem; list-style-type: disc;">
  <li><code class="language-javascript">JSON.parse(JSON.stringify(object))</code> – works only for JSON-safe objects (no functions, undefined, Date, etc.).</li>
  <li>Recursive function – a custom recursive function to handle complex objects.</li>
  <li><code class="language-javascript">Lodash _.cloneDeep()</code> – a library function that handles complex objects and circular references.</li>
</ol>
`,
            examples: [""],
            questions: [
              {
                question:
                  "What are some potential pitfalls of using shallow copies with nested objects?",
                solution:
                  "<p>Shallow copies only copy top-level properties. For nested objects, they retain references to the original objects, meaning changes to nested objects will affect both the copy and the original. This can lead to unexpected mutations in large or shared objects.</p>",
              },
              {
                question:
                  "How does the spread operator work when creating a shallow copy of an object with nested arrays or other objects? Can you provide an example?",
                solution: `<p>The spread operator only performs a shallow copy, meaning nested arrays or objects within the original object are still referenced in the copy.</p>
                <pre><code className="language-javascript">
            const original = { name: "Alice", details: { age: 25, interests: ["reading", "coding"] } };
            const shallowCopy = { ...original };
            shallowCopy.details.age = 30; // Alters original as well
            
            console.log(original.details.age); // Outputs: 30
            console.log(shallowCopy.details.age); // Outputs: 30
                </code></pre>`,
              },
              {
                question:
                  "What are the limitations of JSON.parse(JSON.stringify()) for deep copying in JavaScript?",
                solution:
                  "<p>JSON.parse(JSON.stringify()) cannot copy functions, Date objects, undefined values, or properties with Symbol keys. It also throws errors with circular references, as it serializes the object into a JSON string format which doesn't support these cases.</p>",
              },
              {
                question:
                  "How would you create a deep copy of an object with cyclic references?",
                solution: `<p>To handle cyclic references, we can use a recursive function with a WeakMap to keep track of visited objects, preventing infinite loops.</p>
                <pre><code className="language-javascript">
            function deepCopy(obj, hash = new WeakMap()) {
              if (Object(obj) !== obj) return obj;
              if (hash.has(obj)) return hash.get(obj);
              const result = Array.isArray(obj) ? [] : {};
              hash.set(obj, result);
              for (let key in obj) result[key] = deepCopy(obj[key], hash);
              return result;
            }
                </code></pre>`,
              },
              {
                question:
                  "How does _.cloneDeep() from Lodash handle deep copying differently from JSON.parse(JSON.stringify())?",
                solution:
                  "<p>Lodash's _.cloneDeep() can handle complex types such as functions, Date objects, and circular references. It traverses each property and creates independent copies where necessary, making it more versatile for deep copying compared to JSON methods.</p>",
              },
              {
                question:
                  "How would you create a deep copy of an object that includes prototype properties and methods?",
                solution: `<p>To copy prototype properties, a custom deep copy function must be created. This function should iterate over the object's own properties and prototype chain.</p>
                <pre><code className="language-javascript">
            function deepCopyWithPrototypes(obj) {
              if (typeof obj !== 'object' || obj === null) return obj;
              const copy = Object.create(Object.getPrototypeOf(obj));
              for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                  copy[key] = deepCopyWithPrototypes(obj[key]);
                }
              }
              return copy;
            }
                </code></pre>`,
              },
              {
                question:
                  "How would you handle deep-copying an object containing DOM nodes or functions?",
                solution:
                  "<p>DOM nodes and functions are non-serializable, so they require special handling. DOM nodes can be manually cloned using `Node.cloneNode`, while functions can either be skipped or recreated (though they may lose closures and context).</p>",
              },
              {
                question:
                  "How would you optimize a deep copy function for improved performance on large objects?",
                solution:
                  "<p>To optimize, avoid copying properties that are not needed, use iterative deep copy approaches for memory efficiency, and use a WeakMap to prevent redundant copying of already-processed objects, especially with cyclic references.</p>",
              },
              {
                question:
                  "Explain how you would deep copy an object containing typed arrays (e.g., Int8Array).",
                solution: `<p>Typed arrays require creating new instances and copying each value since they reference binary data directly. Example:</p>
                <pre><code className="language-javascript">
            function deepCopyTypedArray(array) {
              return new array.constructor(array);
            }
                </code></pre>`,
              },
              {
                question:
                  "How would you create a function to deep-copy an object but exclude certain properties?",
                solution: `<p>One way to implement this is by using a recursive function that skips specified keys:</p>
                <pre><code className="language-javascript">
            function deepCopyWithExclusions(obj, exclusions = []) {
              if (typeof obj !== 'object' || obj === null) return obj;
              const copy = Array.isArray(obj) ? [] : {};
              for (let key in obj) {
                if (!exclusions.includes(key)) {
                  copy[key] = deepCopyWithExclusions(obj[key], exclusions);
                }
              }
              return copy;
            }
                </code></pre>`,
              },
            ],
            links: [""],
          },
          {
            topic: "Debouncing",
            tags: [""],
            explanation: `<p style="margin-top: 1.0rem;">
  In JavaScript, debouncing is a technique used to limit how often a function executes, particularly in response to events that might trigger multiple times in quick succession. Debouncing ensures that the function only runs after a specific period of inactivity. This is especially useful for optimizing performance in cases like scrolling, resizing, typing, or search input.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">How Debouncing Works</h4>

<p style="margin-top: 1.0rem;">
  When an event occurs (e.g., typing in a search box), a debounce function prevents immediate execution. Instead, it waits for a set delay. If another event happens before the delay completes, the timer resets. The function only executes once the delay time has passed without any new events.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Use Cases of Debouncing</h4>

<ul style="margin-top: 1.0rem;">
  <li><strong>Search boxes:</strong> Triggering an API call only after the user stops typing for a while.</li>
  <li><strong>Window resizing:</strong> Performing costly layout recalculations only once after the user finishes resizing.</li>
  <li><strong>Scrolling:</strong> Limiting function calls during scrolling to avoid excessive triggering of events.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Implementation of a Debounce Function</h4>

<pre><code class="language-javascript">
function debounce(func, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer); // Clear any existing timer
    timer = setTimeout(() => {
      func.apply(this, args); // Execute the function with the latest arguments
    }, delay);
  };
}
</code></pre>

<p style="margin-top: 1.0rem;">
  Here’s an example of using a debounced function for an API search:
</p>

<pre><code class="language-javascript">
// Example of a debounced function for an API search
const handleSearch = debounce((query) => {
  console.log(\`Searching for \${query}\`);
  // API call can be placed here
}, 500);

// Simulating typing events
handleSearch("Debounce");
handleSearch("Debounce in");
handleSearch("Debounce in JavaScript");
// Only the final search term "Debounce in JavaScript" will be logged after 500ms.
</code></pre>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Explanation of Code</h4>

<ul style="margin-top: 1.0rem;">
  <li><strong>timer:</strong> Stores a reference to the setTimeout function.</li>
  <li><strong>clearTimeout:</strong> Clears any previously set timer if a new event occurs within the delay period.</li>
  <li><strong>setTimeout:</strong> Sets a new timer; if the timer completes without interruptions, it executes the provided function.</li>
</ul>

<p style="margin-top: 1.0rem;">
  By using debouncing, we can optimize our code to reduce the frequency of function calls, enhancing performance and improving the user experience.
</p>
`,
            examples: [""],
            questions: [
              {
                question:
                  "What is debouncing in JavaScript, and why is it useful?",
                solution:
                  "<p>Debouncing is a technique used to limit the rate at which a function is invoked. It ensures that a function is only called once per specified time period, even if triggered multiple times in quick succession. This is particularly useful for improving performance in scenarios like input field event handling or window resizing, where excessive calls can lead to lag and inefficient processing.</p>",
              },
              {
                question:
                  "Can you explain how to implement a debounce function in JavaScript?",
                solution: `<p>A debounce function delays the execution of a function until a specified time has passed since the last call. Here’s a basic implementation of debounce:</p>
                          <pre><code className="language-javascript">
                  function debounce(func, delay) {
                    let timer;
                    return function (...args) {
                      clearTimeout(timer);
                      timer = setTimeout(() => func.apply(this, args), delay);
                    };
                  }
                          </code></pre>
                          <p>In this example, every time the returned function is called, it clears the existing timer. The function will only execute if no further calls are made within the delay period.</p>`,
              },
              {
                question:
                  "What are some practical use cases for debouncing in front-end development?",
                solution:
                  "<p>Common use cases for debouncing include:</p><ul><li><strong>Search input fields:</strong> Debouncing prevents multiple requests by delaying the search until the user has finished typing.</li><li><strong>Window resize events:</strong> Debouncing optimizes performance by reducing the frequency of calls during window resizing.</li><li><strong>Form validation:</strong> Debouncing can delay validation until the user has finished filling out fields, improving user experience.</li></ul>",
              },
              {
                question:
                  "How is debouncing different from throttling in JavaScript?",
                solution:
                  "<p>Debouncing and throttling both control the rate of function calls but work differently:</p><ul><li><strong>Debouncing:</strong> Delays function execution until after a specified wait time has passed since the last call. It only executes once per 'quiet period.'</li><li><strong>Throttling:</strong> Limits the function to execute at most once in a given time period, regardless of how many times the event is triggered.</li></ul><p>For example, throttling is often used for scrolling, while debouncing suits text input handling.</p>",
              },
              {
                question:
                  "What are some potential issues with using debounce and how can they be mitigated?",
                solution:
                  "<p>Potential issues include:</p><ul><li><strong>Delayed response:</strong> Debounce can create a delay in the user’s experience, such as in search inputs. Choosing an appropriate delay time can help mitigate this.</li><li><strong>Loss of immediate feedback:</strong> Some interactions may feel sluggish with debounce if the delay is too long. Adjusting the delay or using a combination of debounce and immediate execution at the start can help.</li></ul>",
              },
              {
                question:
                  "How would you ensure that a debounced function runs immediately on the first call but then waits for the delay period on subsequent calls?",
                solution: `<p>To run a debounced function immediately on the first call, you can add an immediate flag to the debounce function:</p>
                          <pre><code className="language-javascript">
                  function debounce(func, delay, immediate = false) {
                    let timer;
                    return function (...args) {
                      const callNow = immediate && !timer;
                      clearTimeout(timer);
                      timer = setTimeout(() => {
                        timer = null;
                        if (!immediate) func.apply(this, args);
                      }, delay);
                      if (callNow) func.apply(this, args);
                    };
                  }
                          </code></pre>
                          <p>This allows the function to execute immediately on the first call, but debounce subsequent calls within the delay period.</p>`,
              },
            ],
            links: [""],
          },
          {
            topic: "Throttling",
            tags: [""],
            explanation: `<p style="margin-top: 1.0rem;">
  In JavaScript, throttling is a technique used to control how often a function is executed for events that happen continuously, such as scrolling, resizing, or mouse movement. Throttling ensures that a function is called at most once per specified interval, regardless of how many times the event is triggered within that period.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">How Throttling Works</h4>

<p style="margin-top: 1.0rem;">
  When an event triggers the throttled function, it executes immediately, then ignores any further triggers until a set time interval has passed. Once this interval expires, the function is ready to handle the next event. This approach is especially useful when you need to execute a function repeatedly but in a controlled manner.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Use Cases of Throttling</h4>

<ul style="margin-top: 1.0rem;">
  <li><strong>Window resizing:</strong> Performing layout calculations or rendering updates only once per defined period as the user resizes the window.</li>
  <li><strong>Scrolling:</strong> Triggering updates or animations at intervals during scrolling, rather than on every scroll event.</li>
  <li><strong>Button clicking:</strong> Preventing rapid clicks from executing the function more than once within each interval.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Implementation of a Throttle Function</h4>

<p style="margin-top: 1.0rem;">
  Here's a simple implementation of a throttle function in JavaScript:
</p>

<pre><code class="language-javascript">
function throttle(func, interval) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      func.apply(this, args);
      lastTime = now;
    }
  };
}
</code></pre>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Example Usage</h4>

<pre><code class="language-javascript">
// Throttled function for handling scroll events
const handleScroll = throttle(() => {
  console.log("Handling scroll event");
  // Actions such as fetching data or updating UI elements
}, 1000);

// Attaching the throttled function to a scroll event
window.addEventListener("scroll", handleScroll);
</code></pre>

<pre><code class="language-javascript">
function throttle(delay) {
    let lastExecuted = 0;
    return function () {
        const now = Date.now();  //caluating present millseconds
        if (now - lastExecuted >= delay) {  //if  
            hello()  //SUCCESS
            lastExecuted = now;  //assigning executed time
        }
    };
}
function hello() {  //function to be called on Successfull API calling
    console.log("Throttle Executed")
}
const data = throttle(5000)  //having closure property, Do not put inside the interval
//as it will call the whole function again and not the closure function which will make 
//lastexecuted again 0 and it will continue to hit API everytime
setInterval(() => {
    data()   //Calling return function inside throttle function ( Closure )
}, 500) //Executing every 5 milli second
</code></pre>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Explanation of Code</h4>

<ul style="margin-top: 1.0rem;">
  <li><strong>lastTime:</strong> Stores the timestamp of the last function execution.</li>
  <li><strong>Date.now():</strong> Returns the current timestamp in milliseconds.</li>
  <li><strong>Condition:</strong> Checks if the specified interval has passed since the last execution. If so, it calls the function with the latest arguments and updates lastTime.</li>
</ul>

<p style="margin-top: 1.0rem;">
  By using throttling, we can prevent functions from executing too frequently, improving performance and user experience.
</p>`,
            examples: [""],
            questions: [
              {
                question:
                  "What is throttling in JavaScript, and how is it different from debouncing?",
                solution:
                  "<p>Throttling is a technique that limits how frequently a function can be called over time. Unlike debouncing, which only triggers a function after a quiet period, throttling ensures that a function is called at most once per specified interval, regardless of how often it’s triggered. This is useful for events like scroll or resize, where constant triggering can degrade performance.</p>",
              },
              {
                question:
                  "How would you implement a basic throttle function in JavaScript?",
                solution: `<p>A basic throttle function delays execution by ensuring that the wrapped function can only run once within a specified time interval:</p>
                          <pre><code className="language-javascript">
                  function throttle(func, interval) {
                    let lastCall = 0;
                    return function (...args) {
                      const now = Date.now();
                      if (now - lastCall >= interval) {
                        lastCall = now;
                        func.apply(this, args);
                      }
                    };
                  }
                          </code></pre>
                          <p>This implementation checks the time since the last call and only allows execution if the interval has passed, preventing the function from running too frequently.</p>`,
              },
              {
                question:
                  "What are some practical use cases for throttling in front-end development?",
                solution:
                  "<p>Throttling is useful for:<ul><li><strong>Scroll events:</strong> Throttling can limit the frequency of calls during continuous scrolling to improve performance.</li><li><strong>Window resize events:</strong> Throttling resize events helps avoid excessive computations during window resizing.</li><li><strong>API requests:</strong> Throttling requests can prevent a server from being overwhelmed by rapid, repeated requests.</li></ul></p>",
              },
              {
                question:
                  "What are some potential drawbacks of using throttling in JavaScript, and how can they be addressed?",
                solution:
                  "<p>Potential drawbacks of throttling include:</p><ul><li><strong>Missed events:</strong> Some events may be ignored within the throttling interval, potentially leading to missed updates.</li><li><strong>Laggy behavior:</strong> Throttling can make interactions feel unresponsive if the interval is too long. Adjusting the interval or combining throttling with immediate execution on the first call can help address this.</li></ul>",
              },
              {
                question:
                  "How would you modify a throttle function to call the function immediately on the first event?",
                solution: `<p>To execute the throttled function immediately on the first event, you can add an immediate flag that allows the function to run on the first trigger:</p>
                          <pre><code className="language-javascript">
                  function throttle(func, interval, immediate = true) {
                    let lastCall = 0;
                    return function (...args) {
                      const now = Date.now();
                      if (immediate && lastCall === 0) {
                        func.apply(this, args);
                        lastCall = now;
                      } else if (now - lastCall >= interval) {
                        lastCall = now;
                        func.apply(this, args);
                      }
                    };
                  }
                          </code></pre>
                          <p>With this adjustment, the function executes immediately on the first call and follows the throttling interval afterward.</p>`,
              },
              {
                question:
                  "What is the difference between time-based and event-based throttling?",
                solution:
                  "<p>In time-based throttling, a function can only execute once within a specified time interval, regardless of how many times it is triggered. In event-based throttling, the function executes based on certain conditions being met (like scrolling a certain distance) rather than a fixed time interval.</p>",
              },
              {
                question:
                  "Can you explain the purpose of ‘apply’ or ‘call’ in a throttle function?",
                solution: `<p>'Apply' and 'call' are used to call the throttled function with the correct 'this' context and arguments. 'Apply' allows the function to use arguments as an array, making it versatile for different scenarios:</p>
                          <pre><code className="language-javascript">
                  function throttle(func, interval) {
                    let lastCall = 0;
                    return function (...args) {
                      const now = Date.now();
                      if (now - lastCall >= interval) {
                        lastCall = now;
                        func.apply(this, args);
                      }
                    };
                  }
                          </code></pre>`,
              },
              {
                question:
                  "How would you test if your throttle function is working correctly?",
                solution:
                  "<p>To test a throttle function, trigger the event (e.g., scroll or resize) rapidly in succession and observe whether the throttled function runs only at the specified interval. Using console logs or counters within the function can help confirm the throttling behavior.</p>",
              },
              {
                question:
                  "What would happen if you set a very short interval in a throttle function?",
                solution:
                  "<p>If the interval is too short, the throttled function may still be called frequently, which can defeat the purpose of throttling. Choosing an appropriate interval length is essential to balance performance and responsiveness.</p>",
              },
              {
                question:
                  "What are some alternatives to throttling if you need frequent updates with reduced load?",
                solution:
                  "<p>Alternatives include using debouncing for scenarios where only the final event matters (like search input). Another option is to use requestAnimationFrame for smoother animation-related updates, as it aligns with the browser's refresh rate for optimal performance.</p>",
              },
              {
                question:
                  "How would you combine debouncing and throttling for a more optimized solution?",
                solution:
                  "<p>Combining debouncing and throttling can create an optimized solution for complex scenarios. For example, you might use throttling for a steady update rate during user interaction and then debounce for a final update after the user stops interacting. This approach provides responsive feedback with minimal load on resources.</p>",
              },
              {
                question:
                  "What are leading and trailing edge executions in throttling, and how can you implement them?",
                solution: `<p>Leading and trailing edge executions control when a throttled function is called relative to the start or end of the interval:</p>
                           <ul><li><strong>Leading Edge:</strong> Executes the function immediately on the first trigger.</li>
                           <li><strong>Trailing Edge:</strong> Executes the function at the end of the interval if triggered during the interval.</li></ul>
                           <p>You can implement this by adding flags in the throttle function:</p>
                           <pre><code className="language-javascript">
                  function throttle(func, interval, { leading = true, trailing = true } = {}) {
                    let timer, lastCall = 0;
            
                    return function (...args) {
                      const now = Date.now();
                      if (leading && !lastCall) {
                        func.apply(this, args);
                        lastCall = now;
                      }
            
                      if (trailing) {
                        clearTimeout(timer);
                        timer = setTimeout(() => func.apply(this, args), interval);
                      }
                    };
                  }
                           </code></pre>`,
              },
              {
                question:
                  "How would you throttle an API request in JavaScript to avoid hitting the server too frequently?",
                solution:
                  "<p>To throttle API requests, you can wrap the request function in a throttle function with a suitable interval to prevent exceeding the server rate limit. For example, in a scroll-to-load scenario, the request can be limited to once every few seconds to reduce server load while still loading new data periodically.</p>",
              },
              {
                question:
                  "How can using the throttle function affect user experience, and what factors should be considered?",
                solution:
                  "<p>Throttling can improve performance but may create a lagging experience if not tuned correctly. Consider the nature of the interaction—throttle with shorter intervals for rapid updates (e.g., scrolling) and longer intervals for actions like API calls. Testing and adjusting based on user response times can ensure a smoother experience.</p>",
              },
              {
                question:
                  "How can you implement a throttle function with requestAnimationFrame for smoother animations?",
                solution: `<p>To throttle animations, you can use requestAnimationFrame to sync updates with the browser’s refresh rate. This ensures smooth, efficient animations:</p>
                           <pre><code className="language-javascript">
                  function throttleWithRaf(func) {
                    let ticking = false;
            
                    return function (...args) {
                      if (!ticking) {
                        requestAnimationFrame(() => {
                          func.apply(this, args);
                          ticking = false;
                        });
                        ticking = true;
                      }
                    };
                  }
                           </code></pre>
                           <p>This implementation limits calls to once per animation frame, ideal for animations tied to scroll or resize events.</p>`,
              },
              {
                question:
                  "How would you use throttling in a React component to improve performance?",
                solution:
                  "<p>In React, throttling can enhance performance for frequently-triggered events like scroll or resize. For instance, you can create a throttled version of a function using useCallback and then apply it as an event listener, reducing re-renders and load on the component.</p>",
              },
              {
                question:
                  "What’s the difference between a fixed and a dynamic interval in throttling, and when would you use each?",
                solution:
                  "<p>A fixed interval throttles function calls at a constant rate, which is ideal for predictable interactions like scrolling. A dynamic interval adjusts based on conditions (e.g., server load) and is suitable for rate-limited scenarios, where flexibility in timing can optimize performance without overwhelming resources.</p>",
              },
              {
                question:
                  "How would you apply throttling in conjunction with event listeners for optimal performance?",
                solution:
                  "<p>For optimal performance with event listeners, especially on high-frequency events like scroll or resize, you can throttle the callback function to limit its execution rate. This reduces the load on the event listener and makes the application more responsive without sacrificing functionality.</p>",
              },
              {
                question:
                  "What are some libraries that provide built-in throttling, and how would you use one?",
                solution:
                  "<p>Lodash and Underscore.js are popular libraries that provide built-in throttle methods. For instance, in Lodash, you can use _.throttle to wrap a function and specify an interval, enabling quick implementation of throttling without writing custom code:</p><pre><code className='language-javascript'>const throttledFunc = _.throttle(func, 1000);</code></pre>",
              },
              {
                question:
                  "How does using throttling on event listeners affect memory usage?",
                solution:
                  "<p>Throttling reduces the frequency of event listener executions, which can help decrease memory usage by limiting how often resources are allocated and processed. However, if a throttled function creates timers or closures, memory usage can increase slightly if they aren’t properly managed or cleared.</p>",
              },
            ],
            links: [""],
          },
          {
            topic: "Polyfill",
            tags: [""],
            explanation: `
    <p style="margin-top: 1.0rem;">
      In JavaScript, a polyfill is a piece of code (typically a feature or library) that adds modern functionality to older browsers that don’t natively support it. Polyfills are particularly helpful for ensuring compatibility across different browsers and environments, allowing developers to use recent JavaScript features without worrying about browser support.
    </p>

    <h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">How Polyfills Work</h4>

    <p style="margin-top: 1.0rem;">
      A polyfill works by first checking if a specific feature is available in the browser. If the feature does not exist, the polyfill defines it using alternative code. If the feature already exists in the browser, the polyfill does nothing, making it effectively "backward-compatible."
    </p>

    <p style="margin-top: 1.0rem;">
      For example, many ES6 (ECMAScript 2015) features, like <code>Array.prototype.includes</code> or <code>Promise</code>, may not be supported in older browsers like Internet Explorer. A polyfill adds these methods if they are missing, allowing code that uses them to function as expected.
    </p>

    <h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Example of a Polyfill</h4>

    <p style="margin-top: 1.0rem;">
      Here’s a simple polyfill for <code>Array.prototype.includes</code>, which checks if an array contains a specified value:
    </p>

    <pre><code class="language-javascript">
if (!Array.prototype.includes) {
  Array.prototype.includes = function(element) {
    return this.indexOf(element) !== -1;
  };
}
    </code></pre>

    <p style="margin-top: 1.0rem;">
      In this code:
    </p>
    
    <ul>
      <li><strong>Condition:</strong> The polyfill first checks if <code>Array.prototype.includes</code> is already defined.</li>
      <li><strong>Polyfill Function:</strong> If not, it adds the <code>includes</code> method using <code>indexOf</code> as an alternative. The polyfill checks if a value exists in the array, returning <code>true</code> if it does, or <code>false</code> otherwise.</li>
    </ul>

    <h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">When to Use a Polyfill</h4>

    <ul>
      <li><strong>Browser Compatibility:</strong> When you want to use modern features in older environments.</li>
      <li><strong>Feature Support:</strong> To avoid writing separate code for each browser or environment.</li>
      <li><strong>Standardization:</strong> Polyfills help maintain consistent behavior across different environments.</li>
    </ul>

    <p style="margin-top: 1.0rem;">
  Here are polyfills for several commonly used JavaScript methods:
</p>

<h5 style="margin-top: 1.5rem; font-size: 1.125rem; font-weight: 600; letter-spacing: -0.025em;">1. Polyfill for <code>Array.flat()</code></h5>

<pre><code class="language-javascript">
if (!Array.prototype.flat) {
  Array.prototype.flat = function(depth = 1) {
    const flatten = (arr, depth) => {
      if (depth < 1) return arr;
      return arr.reduce((acc, val) => {
        if (Array.isArray(val)) {
          acc.push(...flatten(val, depth - 1));
        } else {
          acc.push(val);
        }
        return acc;
      }, []);
    };
    return flatten(this, depth);
  };
}
</code></pre>

<h5 style="margin-top: 1.5rem; font-size: 1.125rem; font-weight: 600; letter-spacing: -0.025em;">2. Polyfill for <code>Array.filter()</code></h5>

<pre><code class="language-javascript">
if (!Array.prototype.filter) {
  Array.prototype.filter = function(callback, thisArg) {
    if (this == null) {
      throw new TypeError('this is null or not defined');
    }
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
    
    const result = [];
    for (let i = 0; i < this.length; i++) {
      if (i in this) {
        const value = this[i];
        if (callback.call(thisArg, value, i, this)) {
          result.push(value);
        }
      }
    }
    return result;
  };
}
</code></pre>

<h5 style="margin-top: 1.5rem; font-size: 1.125rem; font-weight: 600; letter-spacing: -0.025em;">3. Polyfill for <code>Array.reduce()</code></h5>

<pre><code class="language-javascript">
if (!Array.prototype.reduce) {
  Array.prototype.reduce = function(callback, initialValue) {
    if (this == null) {
      throw new TypeError('Array.prototype.reduce called on null or undefined');
    }
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
    
    let accumulator = initialValue;
    let startIndex = 0;

    if (arguments.length === 2) {
      accumulator = initialValue;
    } else {
      for (startIndex = 0; startIndex < this.length; startIndex++) {
        if (startIndex in this) {
          accumulator = this[startIndex];
          startIndex++;
          break;
        }
      }
      if (startIndex === this.length) {
        throw new TypeError('Reduce of empty array with no initial value');
      }
    }
    
    for (let i = startIndex; i < this.length; i++) {
      if (i in this) {
        accumulator = callback(accumulator, this[i], i, this);
      }
    }
    return accumulator;
  };
}
</code></pre>

<h5 style="margin-top: 1.5rem; font-size: 1.125rem; font-weight: 600; letter-spacing: -0.025em;">4. Polyfill for <code>Array.map()</code></h5>

<pre><code class="language-javascript">
if (!Array.prototype.map) {
  Array.prototype.map = function(callback, thisArg) {
    if (this == null) {
      throw new TypeError('this is null or not defined');
    }
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
    
    const result = new Array(this.length);
    for (let i = 0; i < this.length; i++) {
      if (i in this) {
        result[i] = callback.call(thisArg, this[i], i, this);
      }
    }
    return result;
  };
}
</code></pre>

<h5 style="margin-top: 1.5rem; font-size: 1.125rem; font-weight: 600; letter-spacing: -0.025em;">5. Polyfill for <code>Array.forEach()</code></h5>

<pre><code class="language-javascript">
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function(callback, thisArg) {
    if (this == null) {
      throw new TypeError('this is null or not defined');
    }
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
    
    for (let i = 0; i < this.length; i++) {
      if (i in this) {
        callback.call(thisArg, this[i], i, this);
      }
    }
  };
}
</code></pre>

<h5 style="margin-top: 1.5rem; font-size: 1.125rem; font-weight: 600; letter-spacing: -0.025em;">6. Polyfill for <code>Promise.all()</code></h5>

<pre><code class="language-javascript">
if (!Promise.all) {
  Promise.all = function(promises) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        return reject(new TypeError('You must pass an array to Promise.all.'));
      }
      let results = [];
      let completed = 0;

      promises.forEach((promise, index) => {
        Promise.resolve(promise)
          .then(value => {
            results[index] = value;
            completed++;
            if (completed === promises.length) {
              resolve(results);
            }
          })
          .catch(reject);
      });

      if (promises.length === 0) {
        resolve(results);
      }
    });
  };
}
</code></pre>

<h5 style="margin-top: 1.5rem; font-size: 1.125rem; font-weight: 600; letter-spacing: -0.025em;">7. Polyfill for <code>reducer</code></h5>

<pre><code class="language-javascript">
// Define an array
let array = [4, 5, 8, 6, 82];

// Define a custom myReduce method on the Array prototype
Array.prototype.myReduce = function(callback, initialValue) {
  let accumulator = initialValue; // Initialize accumulator with the initial value

  // Loop through each element in the array
  for (let i = 0; i < this.length; i++) {
    console.log('this', this); // Log the current array
    accumulator = callback(accumulator, this[i], i); // Update the accumulator using the callback function
  }

  return accumulator; // Return the final accumulator value
}

// Using the custom myReduce method to calculate the sum of all elements in the array
const result = array.myReduce((acc, curr) => {
  acc = acc + curr; // Add the current element to the accumulator
  return acc; // Return the updated accumulator value
}, 0); // Start with an initial accumulator value of 0

console.log('result', result); // Output: result 105
</code></pre>

<h5 style="margin-top: 1.5rem; font-size: 1.125rem; font-weight: 600; letter-spacing: -0.025em;">8. Polyfill for <code>reducer</code></h5>

<pre><code class="language-javascript">
// Define an array
let array = [4, 5, 8, 6, 82];

// Define a custom myReduce method on the Array prototype
Array.prototype.myReduce = function(callback, initialValue) {
  let accumulator = initialValue; // Initialize accumulator with the initial value

  // Loop through each element in the array
  for (let i = 0; i < this.length; i++) {
    console.log('this', this); // Log the current array
    accumulator = callback(accumulator, this[i], i); // Update the accumulator using the callback function
  }

  return accumulator; // Return the final accumulator value
}

// Using the custom myReduce method to calculate the sum of all elements in the array
const result = array.myReduce((acc, curr) => {
  acc = acc + curr; // Add the current element to the accumulator
  return acc; // Return the updated accumulator value
}, 0); // Start with an initial accumulator value of 0

console.log('result', result); // Output: result 105
</code></pre>

<h5 style="margin-top: 1.5rem; font-size: 1.125rem; font-weight: 600; letter-spacing: -0.025em;">9. Polyfill for Promise</h5>
<pre><code class="language-javascript">
// Define a custom Promise implementation
window.MyPromise = function(executor) {
  let resolveFn = null; // Initialize resolve function
  let rejectFn = null; // Initialize reject function
  let settled = false; // Flag to track if the promise has already been settled

  // Function to settle the promise with a status and value
  const settle = function(status, value) {
    if (settled) return; // If already settled, do nothing

    settled = true; // Mark the promise as settled

    // Use setTimeout to mimic asynchronous behavior
    setTimeout(() => {
      if (status == 'resolved') {
        resolveFn(value); // Call the resolve function with the value
      } else if (status == 'rejected') {
        rejectFn(value); // Call the reject function with the value
      }
    }, 0);
  }

  // Function to resolve the promise with a value
  const resolve = function(value) {
    settle('resolved', value); // Settle the promise as resolved
  }

  // Function to reject the promise with a value
  const reject = function(value) {
    settle('rejected', value); // Settle the promise as rejected
  }

  // Execute the executor function with resolve and reject functions as arguments
  executor(resolve, reject);

  // Return an object with a 'then' method for chaining
  return {
    then: (onResolve, onReject) => {
      resolveFn = onResolve; // Set the resolve function for 'then' method
      rejectFn = onReject; // Set the reject function for 'then' method
    }
  }
}

// Create a new promise using the custom MyPromise implementation
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    const i = 5;

    if (i % 2 == 0) {
      resolve(i); // Resolve the promise with the value 5
    } else {
      reject('given number is not even'); // Reject the promise with an error message
    }
  }, 0);
});

// Use the 'then' method to handle resolved and rejected states of the promise
promise.then(
  (value) => {
    console.log('calling polyfill resolved', value); // Output: calling polyfill resolved 5
  },
  (rejected) => {
    console.log('calling polyfill rejected', rejected); // Output: calling polyfill rejected given number is not even
  }
);
</code></pre>

    <h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Popular Polyfill Libraries</h4>

    <ul>
      <li><strong>core-js:</strong> A popular library that provides polyfills for many ES6 features.</li>
      <li><strong>Polyfill.io:</strong> A service that serves only the necessary polyfills based on the user’s browser, reducing unnecessary code.</li>
      <li><strong>Babel:</strong> Although primarily a compiler, Babel can use <code>@babel/polyfill</code> to convert modern JavaScript code and include essential polyfills.</li>
    </ul>

    <p style="margin-top: 1.0rem;">
      Using polyfills can make your code more maintainable and future-proof by enabling modern features without sacrificing browser compatibility.
    </p>
  `,
            examples: [""],
            questions: [
              {
                question:
                  "What is a polyfill in JavaScript, and why is it used?",
                solution:
                  "<p>A polyfill is a piece of code that provides a fallback implementation for a feature that may not be natively supported in all environments, particularly in older browsers. It enables developers to use modern JavaScript features while ensuring compatibility with legacy systems. By using polyfills, developers can write code using newer standards without breaking functionality in older browsers.</p>",
              },
              {
                question:
                  "Can you provide an example of a common JavaScript polyfill and how it works?",
                solution: `<p>A common example is the polyfill for the <code>Array.prototype.includes</code> method, which checks if an array includes a certain value:</p>
                          <pre><code className="language-javascript">
                  if (!Array.prototype.includes) {
                    Array.prototype.includes = function(value) {
                      return this.indexOf(value) !== -1;
                    };
                  }
                          </code></pre>
                          <p>This code snippet checks if the <code>includes</code> method is already defined and adds it if not, allowing it to be used in environments where it's unavailable.</p>`,
              },
              {
                question:
                  "What are some advantages and disadvantages of using polyfills?",
                solution:
                  "<p>Advantages of using polyfills include:<ul><li><strong>Feature availability:</strong> They allow developers to use modern features in older browsers.</li><li><strong>Consistent behavior:</strong> Polyfills provide consistent functionality across different environments.</li></ul><p>Disadvantages include:<ul><li><strong>Performance impact:</strong> Polyfills can introduce additional overhead, potentially affecting performance.</li><li><strong>Increased bundle size:</strong> Adding multiple polyfills can increase the size of the JavaScript bundle.</li></ul></p>",
              },
              {
                question:
                  "How would you determine if a polyfill is necessary for a specific feature in your project?",
                solution:
                  "<p>To determine if a polyfill is necessary, you can check browser compatibility tables (like MDN Web Docs or Can I use...) to see if the feature is supported in the browsers you intend to support. Additionally, you can use feature detection libraries (like Modernizr) to test if a feature exists at runtime and conditionally load polyfills if needed.</p>",
              },
              {
                question:
                  "What is the difference between a polyfill and a shim?",
                solution:
                  "<p>A polyfill implements a feature in the environment that is missing natively, allowing it to work as intended. A shim, on the other hand, provides a way to mimic an API's behavior without necessarily implementing it fully, often providing a limited subset of features or a compatibility layer for old and new code.</p>",
              },
              {
                question:
                  "How would you write a polyfill for the Promise constructor in JavaScript?",
                solution: `<p>Writing a polyfill for the Promise constructor requires implementing the basic Promise functionality. Here’s a simplified version:</p>
                          <pre><code className="language-javascript">
                  if (typeof Promise === 'undefined') {
                    window.Promise = function(executor) {
                      let onResolve, onReject;
                      this.then = function(resolve, reject) {
                        onResolve = resolve;
                        onReject = reject;
                      };
                      executor(onResolve, onReject);
                    };
                  }
                          </code></pre>
                          <p>This basic polyfill does not cover all Promise features but illustrates the general structure.</p>`,
              },
              {
                question:
                  "How do you ensure that polyfills do not conflict with existing implementations?",
                solution:
                  "<p>To ensure polyfills do not conflict with existing implementations, you can check if the feature already exists before defining the polyfill. Additionally, using a unique namespace for your polyfill functions can help avoid naming collisions and potential conflicts with other libraries or code.</p>",
              },
              {
                question:
                  "What are some modern alternatives to using polyfills for feature support?",
                solution:
                  "<p>Modern alternatives include using transpilers like Babel to convert newer JavaScript syntax into compatible code for older browsers. Additionally, tools like Webpack or Rollup can help bundle code with polyfills only for browsers that require them, optimizing performance and reducing the bundle size.</p>",
              },
              {
                question:
                  "How would you implement a polyfill for the <code>fetch</code> API?",
                solution: `<p>A polyfill for the <code>fetch</code> API can be implemented using <code>XMLHttpRequest</code> to replicate its behavior. Here’s a simple example:</p>
                          <pre><code className="language-javascript">
                  if (!window.fetch) {
                    window.fetch = function(url, options) {
                      return new Promise(function(resolve, reject) {
                        const xhr = new XMLHttpRequest();
                        xhr.open(options.method || 'GET', url);
                        xhr.onload = function() {
                          resolve({ json: () => Promise.resolve(JSON.parse(xhr.responseText)) });
                        };
                        xhr.onerror = reject;
                        xhr.send(options.body);
                      });
                    };
                  }
                          </code></pre>
                          <p>This implementation provides a basic version of the <code>fetch</code> API using <code>XMLHttpRequest</code> while returning a Promise.</p>`,
              },
              {
                question:
                  "What strategies can you use to selectively load polyfills in a project?",
                solution:
                  "<p>You can selectively load polyfills using feature detection at runtime. Libraries like Modernizr can check for feature support, and based on the results, load the appropriate polyfill dynamically. Another strategy is to use a conditional script loader, allowing you to load polyfills only for specific browsers or conditions.</p>",
              },
              {
                question:
                  "How can polyfills impact the performance of a web application, and what strategies can be used to mitigate these effects?",
                solution:
                  "<p>Polyfills can slow down web applications, especially if they are large or implemented inefficiently. To mitigate these effects, consider:<ul><li><strong>Selective Loading:</strong> Load polyfills conditionally based on feature detection to prevent unnecessary loading.</li><li><strong>Code Splitting:</strong> Use tools like Webpack to split your code and include polyfills only for the necessary bundles.</li><li><strong>Use of modern libraries:</strong> Choose libraries that provide native implementations or avoid polyfills when possible.</li></ul></p>",
              },
              {
                question:
                  "What are some common pitfalls when implementing polyfills, and how can they be avoided?",
                solution:
                  "<p>Common pitfalls include:<ul><li><strong>Not checking for existing implementations:</strong> Failing to check if a feature already exists can lead to conflicts and performance issues.</li><li><strong>Incomplete implementations:</strong> Polyfills that don't cover edge cases or fully replicate native behavior can introduce bugs.</li><li><strong>Not adhering to the specification:</strong> Implementations that deviate from the official ECMAScript specification can lead to inconsistent behavior.</li></ul><p>These pitfalls can be avoided by thoroughly testing polyfills, reviewing the specifications, and following best practices in polyfill implementation.</p>",
              },
              {
                question:
                  "How would you handle polyfill updates and maintenance in a large codebase?",
                solution:
                  "<p>Handling polyfill updates involves regularly checking for new features and updates to existing polyfills. You can:<ul><li><strong>Automate checks:</strong> Use tools like Babel or ESLint to identify the need for updates based on browser support changes.</li><li><strong>Keep documentation:</strong> Maintain a changelog for polyfills to track their use and any changes made.</li><li><strong>Modularize polyfills:</strong> Isolate polyfills into separate modules to make updating and testing easier.</li></ul></p>",
              },
              {
                question:
                  "Can you explain how to create a polyfill that supports both ES5 and ES6+ features, and what considerations you must keep in mind?",
                solution:
                  '<p>Creating a polyfill that supports both ES5 and ES6+ features involves writing code that checks for the necessary features and conditions before implementing new functionality. Considerations include:<ul><li><strong>Backward compatibility:</strong> Ensure the polyfill works in environments that only support ES5.</li><li><strong>Performance optimizations:</strong> Use efficient algorithms to minimize overhead.</li><li><strong>Testing:</strong> Rigorously test the polyfill in different environments to ensure consistent behavior.</li></ul><p>A conditional check structure can be implemented:</p><pre><code className="language-javascript">if (!Array.prototype.includes) { /* ES5 polyfill implementation */ }</code></pre>',
              },
              {
                question:
                  "How can you use polyfills in conjunction with service workers to enhance performance and feature availability?",
                solution:
                  "<p>Polyfills can be cached using service workers to ensure they're available offline and reduce load times. When a service worker is registered, it can intercept network requests for polyfills and serve them from the cache, improving performance for users without modern browsers. This strategy also enables you to manage polyfill updates effectively by controlling caching behavior.</p>",
              },
              {
                question:
                  "What is the role of the `Reflect` API in polyfilling ES6 features, and can you give an example of its usage?",
                solution:
                  "<p>The Reflect API provides methods for interceptable JavaScript operations, making it useful for polyfilling ES6 features that require more advanced object manipulation. For example, the Reflect.get method can be used to create a polyfill for ES6's Object.get:</p><pre><code className='language-javascript'>if (!Object.get) {Object.get = function(target, property) {return Reflect.get(target, property);};}</code></pre><p>This approach ensures that your polyfill leverages native functionality where available.</p>",
              },
              {
                question:
                  "How can polyfills be bundled and optimized for production to ensure minimal impact on load times?",
                solution:
                  "<p>To optimize polyfills for production, consider the following strategies:<ul><li><strong>Bundle selectively:</strong> Use tools like Webpack to create separate bundles for polyfills and only include the necessary polyfills based on the target browsers.</li><li><strong>Tree shaking:</strong> Use tree shaking to remove unused polyfills from the bundle.</li><li><strong>Code splitting:</strong> Implement code splitting to load polyfills only when necessary, reducing the initial load time.</li></ul></p>",
              },
              {
                question:
                  "What are the best practices for testing polyfills to ensure they work correctly across different browsers and environments?",
                solution:
                  "<p>Best practices for testing polyfills include:<ul><li><strong>Cross-browser testing:</strong> Use tools like BrowserStack or Sauce Labs to test across different browsers and versions.</li><li><strong>Automated testing:</strong> Write unit tests for polyfills to ensure they meet specifications and work as intended.</li><li><strong>Feature detection:</strong> Use feature detection to confirm that polyfills only apply where necessary.</li></ul><p>Maintaining a robust test suite can help catch issues early and ensure compatibility.</p>",
              },
              {
                question:
                  "How would you implement a polyfill for a new ECMAScript feature that has not yet gained wide browser support, and what steps would you take to ensure its reliability?",
                solution:
                  "<p>To implement a polyfill for a new ECMAScript feature, follow these steps:<ul><li><strong>Study the specification:</strong> Understand the feature's requirements and edge cases by reviewing the official ECMAScript specification.</li><li><strong>Write tests:</strong> Create comprehensive tests to cover various scenarios and edge cases of the new feature.</li><li><strong>Use feature detection:</strong> Implement the polyfill conditionally to ensure it does not interfere with existing implementations.</li><li><strong>Get feedback:</strong> Share the polyfill with other developers for feedback and testing in different environments.</li></ul></p>",
              },
            ],
            links: [""],
          },
          {
            topic: "Call Apply Bind",
            tags: [""],
            explanation: `
<p style="margin-top: 1.0rem;">
  In JavaScript, <code>call</code>, <code>apply</code>, and <code>bind</code> are methods that allow you to control the execution context of functions, specifically the value of <code>this</code>. Understanding these methods is essential for managing scope, especially in object-oriented programming and when dealing with callbacks.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">1. call()</h4>

<p style="margin-top: 1.0rem;">
  The <code>call()</code> method calls a function with a specified <code>this</code> value and individual arguments. It immediately invokes the function and is useful when you want to execute a function in the context of a particular object.
</p>

<pre><code class="language-javascript">
function greet() {
  console.log(\`Hello, \${this.name}\`);
}

const person = { name: 'Alice' };
greet.call(person); // Output: Hello, Alice
</code></pre>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">2. apply()</h4>

<p style="margin-top: 1.0rem;">
  The <code>apply()</code> method is similar to <code>call()</code>, but it accepts an array of arguments instead of listing them individually. It is useful when you want to pass an array of arguments to a function and still control the <code>this</code> context.
</p>

<pre><code class="language-javascript">
function introduce(greeting, punctuation) {
  console.log('greeting', \${this.name}\${punctuation}\`);
}

const person = { name: 'Bob' };
introduce.apply(person, ['Hi', '!']); // Output: Hi, Bob!
</code></pre>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">3. bind()</h4>

<p style="margin-top: 1.0rem;">
  The <code>bind()</code> method creates a new function that, when called, has its <code>this</code> keyword set to the provided value. It allows you to preset initial parameters and does not invoke the function immediately.
</p>

<pre><code class="language-javascript">
function sayHello() {
  console.log(\`Hello, \${this.name}\`);
}

const person = { name: 'Charlie' };
const sayHelloToCharlie = sayHello.bind(person);
sayHelloToCharlie(); // Output: Hello, Charlie
</code></pre>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Key Differences</h4>

<ul style="margin-top: 1.0rem;">
  <li><strong>Invocation:</strong> <code>call()</code> and <code>apply()</code> invoke the function immediately, while <code>bind()</code> returns a new function.</li>
  <li><strong>Arguments Handling:</strong> <code>call()</code> accepts arguments individually, <code>apply()</code> accepts a single array of arguments, and <code>bind()</code> can preset arguments.</li>
</ul>
`,
            examples: [""],
            questions: [
              {
                question: "What is the difference between call, apply, and bind in JavaScript?",
                solution: `<p>The primary difference lies in how they invoke functions and handle arguments:</p>
                <ul>
                  <li><strong>call:</strong> Invokes the function immediately with a specified <code>this</code> context and individual arguments.</li>
                  <li><strong>apply:</strong> Invokes the function immediately with a specified <code>this</code> context but takes an array of arguments.</li>
                  <li><strong>bind:</strong> Returns a new function with a specified <code>this</code> context that can be invoked later, allowing you to preset parameters.</li>
                </ul>`,
              },
              {
                question: "Can you provide an example where using apply is more beneficial than call?",
                solution: `<p>Sure! If you have an array of numbers that you want to find the maximum of using <code>Math.max</code>, <code>apply</code> is more convenient:</p>
                <pre><code class="language-javascript">
            const numbers = [1, 2, 3, 4, 5];
            const max = Math.max.apply(null, numbers); // Outputs: 5
                </code></pre>`,
              },
              {
                question: "What happens if you call bind with no arguments?",
                solution: `<p>If you call <code>bind()</code> with no arguments, it returns a new function that has its <code>this</code> set to the global object (or <code>undefined</code> in strict mode) but does not preset any parameters:</p>
                <pre><code class="language-javascript">
            function example() {
              console.log(this);
            }
            const boundExample = example.bind();
            boundExample(); // In non-strict mode: Window object; in strict mode: undefined
                </code></pre>`,
              },
              {
                question: "How does the 'this' keyword behave in an arrow function?",
                solution: `<p>Arrow functions do not have their own <code>this</code> context. Instead, they lexically bind <code>this</code>, meaning it inherits the <code>this</code> from the enclosing execution context at the time they are defined. This behavior makes arrow functions suitable for methods that require the context of the outer function:</p>
                <pre><code class="language-javascript">
            const obj = {
              name: 'Alice',
              greet: function() {
                const arrowGreet = () => console.log(\`Hello, \${this.name}\`);
                arrowGreet();
              }
            };
            obj.greet(); // Output: Hello, Alice
                </code></pre>`,
              },
              {
                question: "How would you implement the bind() function from scratch in JavaScript?",
                solution: `<p style="margin-top: 1.0rem;">
                  Implementing a custom <code>bind</code> function should involve returning a new function that captures the context (<code>this</code>) and, optionally, additional arguments.
                </p>
                <pre><code class="language-javascript">
            Function.prototype.customBind = function(context, ...args) {
              const fn = this;
              return function(...newArgs) {
                return fn.apply(context, [...args, ...newArgs]);
              };
            };
                </code></pre>`,
              },
              {
                question: "Explain how bind() is useful in the context of event handling in JavaScript.",
                solution: `<p style="margin-top: 1.0rem;">
                  <code>bind()</code> is commonly used in event handling to ensure that <code>this</code> within an event handler refers to a specific object or component, such as when using class methods in React.
                </p>`,
              },
              {
                question: "What will be the output of the following code, and why?",
                solution: `<pre><code class="language-javascript">
            const person = { name: 'Emma', getName() { return this.name; } };
            const getName = person.getName;
            console.log(getName()); // undefined
            
            const boundGetName = getName.bind(person);
            console.log(boundGetName()); // Emma
                </code></pre>
                <p style="margin-top: 1.0rem;">
                  Without <code>bind</code>, <code>getName</code> loses its context when assigned to a variable and defaults <code>this</code> to the global scope. <code>bind</code> fixes <code>this</code> to the <code>person</code> object.
                </p>`,
              },
              {
                question: "What issues could arise if you forget to bind a function that relies on this when passed as a callback?",
                solution: `<p style="margin-top: 1.0rem;">
                  Not binding <code>this</code> in asynchronous callbacks or event listeners can result in unexpected behavior, as <code>this</code> may not refer to the intended object, leading to runtime errors or unexpected outputs.
                </p>`,
              },
              {
                question: "How does this work in the context of setTimeout and how can bind() resolve related issues?",
                solution: `<p style="margin-top: 1.0rem;">
                  <code>setTimeout</code> calls functions with <code>this</code> defaulting to the global scope (or <code>undefined</code> in strict mode). Using <code>bind()</code> with <code>setTimeout</code> allows setting <code>this</code> to the desired context.
                </p>`,
              },
            ],
            links: [""],
          },
          {
            topic: "Method Chaining",
            tags: [""],
            explanation: `<p style="margin-top: 1.0rem;">
  Method chaining in JavaScript is a design pattern that allows multiple methods to be called on an object in a single statement, improving code readability and making it more concise. When an object method returns the object itself (<code>this</code>), it enables the subsequent method in the chain to be invoked directly on that object, creating a "chain" of method calls.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">How Method Chaining Works</h4>

<p style="margin-top: 1.0rem;">
  To implement method chaining, each method in the chain should return the current object. By returning <code>this</code> (a reference to the object itself), subsequent method calls can continue on the same instance. This pattern is commonly used in libraries like jQuery and D3.js and is widely adopted in JavaScript classes and frameworks.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Example of Method Chaining</h4>

<pre><code class="language-javascript">
class Calculator {
  constructor(value = 0) {
    this.value = value;
  }

  add(number) {
    this.value += number;
    return this; // Return the object itself to allow chaining
  }

  subtract(number) {
    this.value -= number;
    return this;
  }

  multiply(number) {
    this.value *= number;
    return this;
  }

  divide(number) {
    if (number !== 0) {
      this.value /= number;
    } else {
      console.error("Cannot divide by zero");
    }
    return this;
  }

  result() {
    console.log(this.value);
    return this.value;
  }
}

// Usage with method chaining
const result = new Calculator()
  .add(10)
  .subtract(2)
  .multiply(5)
  .divide(4)
  .result(); // Outputs: 10
</code></pre>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Advantages of Method Chaining</h4>

<p style="margin-top: 1.0rem;">
  <strong>Code Readability:</strong> Method chaining makes code more readable and expressive, especially when performing a sequence of operations.<br>
  <strong>Reduced Lines of Code:</strong> It eliminates the need for repetitive variable assignments or separate statements for each method call.<br>
  <strong>Enhanced Code Flow:</strong> Each call flows naturally into the next, creating a more intuitive way to write sequences of operations.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Common Use Cases</h4>

<p style="margin-top: 1.0rem;">
  <strong>DOM Manipulation Libraries (e.g., jQuery):</strong>
</p>

<pre><code class="language-javascript">
$("#element").addClass("highlight").fadeIn().css("color", "blue");
</code></pre>

<p style="margin-top: 1.0rem;">
  <strong>Array Manipulations:</strong>
</p>

<pre><code class="language-javascript">
const result = [1, 2, 3, 4]
  .filter(num => num > 2)
  .map(num => num * 2)
  .reduce((sum, num) => sum + num, 0);
// result = 14
</code></pre>

<p style="margin-top: 1.0rem;">
  <strong>Promise Chains:</strong>
</p>

<pre><code class="language-javascript">
fetchData()
  .then(processData)
  .then(displayData)
  .catch(handleError);
</code></pre>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Tips for Using Method Chaining</h4>

<p style="margin-top: 1.0rem;">
  <strong>Return <code>this</code>:</strong> Ensure each method that participates in chaining returns <code>this</code>.<br>
  <strong>Handle Edge Cases:</strong> Implement error handling within chained methods to prevent breaking the chain.<br>
  <strong>Consider Readability:</strong> Chaining too many methods can reduce readability; consider grouping related operations for clarity.
</p>

<p style="margin-top: 1.0rem;">
  Method chaining is a powerful technique that, when used correctly, can make JavaScript code cleaner, more readable, and more efficient.
</p>
`,
            examples: [""],
            questions: [
              {
                "question": "What is method chaining in JavaScript, and how does it improve code readability?",
                "solution": `<p style="margin-top: 1.0rem;">
                  Method chaining in JavaScript is a design pattern that allows multiple methods to be called in a single statement on an object. By returning <code>this</code> in each method, it enables successive calls on the same object, enhancing readability and conciseness.
                </p>
                <pre><code class="language-javascript">
            class Calculator {
              constructor(value = 0) {
                this.value = value;
              }
            
              add(number) {
                this.value += number;
                return this;
              }
            }
            new Calculator().add(10).add(5); // Outputs: 15
                </code></pre>`
              },
              {
                "question": "How does method chaining work in libraries like jQuery?",
                "solution": `<p style="margin-top: 1.0rem;">
                  Libraries like jQuery use method chaining by returning <code>this</code> from each method, which refers to the object itself. This allows successive calls to be executed in sequence.
                </p>
                <pre><code class="language-javascript">
            $("#element").addClass("highlight").fadeIn().css("color", "blue");
                </code></pre>`
              },
              {
                "question": "Why is it necessary to return <code>this</code> in methods that participate in chaining?",
                "solution": `<p style="margin-top: 1.0rem;">
                  Returning <code>this</code> enables the current object to be referenced in the chain, allowing for additional method calls on the same object. Without returning <code>this</code>, chaining would break.
                </p>`
              },
              {
                "question": "Can you provide an example of a custom class that implements method chaining?",
                "solution": `<p style="margin-top: 1.0rem;">
                  Here’s an example of a custom class that uses method chaining to perform arithmetic operations:
                </p>
                <pre><code class="language-javascript">
            class Calculator {
              constructor(value = 0) {
                this.value = value;
              }
            
              add(number) {
                this.value += number;
                return this;
              }
            
              subtract(number) {
                this.value -= number;
                return this;
              }
            }
            const result = new Calculator().add(10).subtract(3).add(5); // Outputs: 12
                </code></pre>`
              },
              {
                "question": "What are some advantages and common use cases of method chaining?",
                "solution": `<p style="margin-top: 1.0rem;">
                  <strong>Advantages:</strong>
                </p>
                <ul style="margin-top: 1.0rem;">
                  <li>Improves code readability and flow, especially for sequences of operations.</li>
                  <li>Reduces code length by removing the need for separate assignments.</li>
                </ul>
                <p style="margin-top: 1.0rem;">
                  <strong>Common Use Cases:</strong>
                </p>
                <pre><code class="language-javascript">
            // DOM Manipulation (e.g., jQuery)
            $("#element").fadeIn().css("color", "blue");
            
            // Array manipulations
            const result = [1, 2, 3].filter(num => num > 1).map(num => num * 2);
                </code></pre>`
              },
              {
                "question": "What are some best practices to keep in mind when using method chaining?",
                "solution": `<p style="margin-top: 1.0rem;">
                  When using method chaining, consider these best practices:
                </p>
                <ul style="margin-top: 1.0rem;">
                  <li><strong>Return <code>this</code>:</strong> Ensure methods that should be chained return <code>this</code>.</li>
                  <li><strong>Error Handling:</strong> Handle errors within methods to prevent the chain from breaking.</li>
                  <li><strong>Limit Chain Length:</strong> Avoid overly long chains to maintain readability.</li>
                </ul>`
              },
              {
                "question": "How can method chaining be useful in JavaScript Promises?",
                "solution": `<p style="margin-top: 1.0rem;">
                  Method chaining is commonly used with JavaScript Promises to create a sequential flow of asynchronous operations. Each <code>.then()</code> method returns a new Promise, allowing subsequent calls.
                </p>
                <pre><code class="language-javascript">
            fetchData()
              .then(processData)
              .then(displayData)
              .catch(handleError);
                </code></pre>`
              },
              {
                "question": "What are some potential drawbacks of method chaining in JavaScript?",
                "solution": `<p style="margin-top: 1.0rem;">
                  While method chaining can enhance readability, it has some drawbacks:
                </p>
                <ul style="margin-top: 1.0rem;">
                  <li><strong>Debugging Complexity:</strong> Long chains can make it harder to identify the source of errors.</li>
                  <li><strong>Reduced Readability:</strong> Excessively long chains can decrease readability and be harder to maintain.</li>
                  <li><strong>Unintentional State Mutation:</strong> Mutating objects in chained methods may lead to unintended side effects.</li>
                </ul>`
              },
              {
                "question": "Can method chaining be achieved with functions that do not return <code>this</code>?",
                "solution": `<p style="margin-top: 1.0rem;">
                  No, method chaining requires each method in the chain to return <code>this</code> or a new instance of the object to continue the chain. Without this, chaining will break as the object reference is lost.
                </p>`
              },
              {
                "question": "How would you handle errors within a chain of methods to prevent breaking the chain?",
                "solution": `<p style="margin-top: 1.0rem;">
                  To handle errors gracefully in method chaining, you can add condition checks or use <code>try-catch</code> blocks within the methods. This keeps the chain intact while managing errors.
                </p>
                <pre><code class="language-javascript">
            class SafeCalculator {
              constructor(value = 0) {
                this.value = value;
              }
            
              divide(number) {
                if (number === 0) {
                  console.error("Cannot divide by zero");
                } else {
                  this.value /= number;
                }
                return this;
              }
            }
                </code></pre>`
              },
              {
                "question": "How does returning <code>this</code> differ from returning a new instance in method chaining?",
                "solution": `<p style="margin-top: 1.0rem;">
                  Returning <code>this</code> maintains operations on the same object, useful for stateful modifications. Returning a new instance, on the other hand, creates a fresh object each time, which is helpful for immutable patterns.
                </p>
                <pre><code class="language-javascript">
            class ImmutableCalculator {
              constructor(value = 0) {
                this.value = value;
              }
            
              add(number) {
                return new ImmutableCalculator(this.value + number); // New instance for each operation
              }
            }
            const result = new ImmutableCalculator(0).add(5).add(10);
                </code></pre>`
              },
              {
                "question": "Can method chaining be combined with other design patterns?",
                "solution": `<p style="margin-top: 1.0rem;">
                  Yes, method chaining can be combined with other patterns like the <strong>Fluent Interface</strong> and <strong>Builder Pattern</strong>. These patterns focus on creating a readable, chainable API, especially for constructing objects.
                </p>
                <pre><code class="language-javascript">
            class PizzaBuilder {
              constructor() {
                this.toppings = [];
              }
            
              addTopping(topping) {
                this.toppings.push(topping);
                return this;
              }
            
              build() {
                return this.toppings.join(", ");
              }
            }
            const pizza = new PizzaBuilder().addTopping("cheese").addTopping("pepperoni").build();
                </code></pre>`
              },
              {
                "question": "What would happen if one method in the chain does not return <code>this</code>?",
                "solution": `<p style="margin-top: 1.0rem;">
                  If one method in the chain fails to return <code>this</code>, the chain will break, as <code>undefined</code> or another return value will be passed to the next method, causing an error if further chaining is attempted.
                </p>`
              },
              {
                "question": "How do you decide whether to use method chaining or separate statements?",
                "solution": `<p style="margin-top: 1.0rem;">
                  The choice depends on readability and complexity. If a sequence of operations is simple and related, chaining is effective. For more complex or unrelated operations, separate statements may improve readability.
                </p>`
              }
            ],
            links: [""],
          },
          {
            topic: "Callback Hell",
            tags: [""],
            explanation: "<></>",
            examples: [""],
            questions: [
              {
                "question": "What is callback hell, and why does it occur in JavaScript?",
                "solution": `<p style="margin-top: 1.0rem;">
                  Callback hell refers to the situation where multiple nested callbacks lead to complex, hard-to-read, and maintain code, often in asynchronous operations. It occurs because JavaScript heavily relies on callbacks to handle asynchronous tasks, leading to a "pyramid of doom" structure as callbacks become deeply nested.
                </p>`
              },
              {
                "question": "Can you provide an example of callback hell in JavaScript?",
                "solution": `<p style="margin-top: 1.0rem;">
                  A typical example involves several asynchronous operations like reading a file, processing the data, and saving it to another file. As each operation relies on the previous one, nesting callbacks leads to unreadable code:
                </p>
                <pre><code class="language-javascript">
            fs.readFile("file1.txt", (err, data1) => {
              if (err) throw err;
              processData(data1, (err, result1) => {
                if (err) throw err;
                fs.writeFile("file2.txt", result1, (err) => {
                  if (err) throw err;
                  console.log("File written successfully!");
                });
              });
            });
                </code></pre>`
              },
              {
                "question": "What are some common solutions to avoid callback hell?",
                "solution": `<p style="margin-top: 1.0rem;">
                  Common solutions include:
                </p>
                <ul style="margin-top: 1.0rem;">
                  <li><strong>Modularizing Callbacks:</strong> Break complex callback chains into smaller, named functions to improve readability.</li>
                  <li><strong>Using Promises:</strong> Promises provide a more structured way to handle asynchronous operations, making chaining simpler.</li>
                  <li><strong>Async/Await:</strong> Async/await syntax allows writing asynchronous code in a synchronous style, reducing nested callbacks.</li>
                </ul>`
              },
              {
                "question": "How do Promises help to reduce callback hell?",
                "solution": `<p style="margin-top: 1.0rem;">
                  Promises offer a way to flatten nested callbacks by chaining <code>.then()</code> methods, providing a more readable structure. Each <code>.then()</code> handles the success of the previous step, while <code>.catch()</code> can handle errors at the end of the chain.
                </p>
                <pre><code class="language-javascript">
            fetchData()
              .then(processData)
              .then(saveData)
              .catch(handleError);
                </code></pre>`
              },
              {
                "question": "What is the difference between callback hell and the promise chain?",
                "solution": `<p style="margin-top: 1.0rem;">
                  Callback hell occurs when functions are deeply nested within each other, leading to unreadable code. Promise chaining, however, keeps each asynchronous function at the same level of indentation, making the sequence of actions clearer and reducing nesting.
                </p>`
              },
              {
                "question": "Can async/await eliminate callback hell? How?",
                "solution": `<p style="margin-top: 1.0rem;">
                  Yes, async/await can eliminate callback hell by allowing asynchronous code to be written in a synchronous style. By using <code>await</code>, each asynchronous function call is handled sequentially without requiring nested callbacks, making the code easier to read.
                </p>
                <pre><code class="language-javascript">
            async function handleFiles() {
              try {
                const data1 = await fs.readFile("file1.txt");
                const result1 = await processData(data1);
                await fs.writeFile("file2.txt", result1);
                console.log("File written successfully!");
              } catch (error) {
                console.error(error);
              }
            }
                </code></pre>`
              },
              {
                "question": "What are named functions, and how can they help with callback hell?",
                "solution": `<p style="margin-top: 1.0rem;">
                  Named functions are functions given a specific name, making it easier to reuse and maintain them. By separating each step of a callback sequence into named functions, it’s possible to avoid deep nesting and improve readability.
                </p>
                <pre><code class="language-javascript">
            function readFile(callback) { /*...*/ }
            function processFile(data, callback) { /*...*/ }
            function writeFile(result, callback) { /*...*/ }
            
            readFile((data) => {
              processFile(data, (result) => {
                writeFile(result, () => console.log("Done"));
              });
            });
                </code></pre>`
              },
              {
                "question": "How does error handling in callback hell compare to handling errors with promises?",
                "solution": `<p style="margin-top: 1.0rem;">
                  In callback hell, each nested callback typically requires its own error handling, making the code repetitive and harder to read. With Promises, errors can be handled centrally using <code>.catch()</code>, simplifying the process.
                </p>`
              },
              {
                "question": "When would you choose callbacks over promises or async/await?",
                "solution": `<p style="margin-top: 1.0rem;">
                  Callbacks are still useful for small, synchronous code or when working with legacy code that relies on them. They may also be preferred in environments where promises and async/await syntax are unsupported.
                </p>`
              },
              {
                "question": "What are some best practices to avoid callback hell when using callbacks?",
                "solution": `<p style="margin-top: 1.0rem;">
                  To minimize callback hell:
                </p>
                <ul style="margin-top: 1.0rem;">
                  <li><strong>Use named functions:</strong> Break down nested functions into standalone, named functions for better readability.</li>
                  <li><strong>Limit nesting levels:</strong> Keep the nesting of callbacks to a minimum to avoid excessive indentation.</li>
                  <li><strong>Handle errors carefully:</strong> Ensure that each callback has proper error handling to prevent cascading issues.</li>
                  <li><strong>Consider Promises or async/await:</strong> For complex asynchronous code, use promises or async/await if possible.</li>
                </ul>`
              },
              {
                "question": "How does callback hell impact performance and maintainability?",
                "solution": `<p style="margin-top: 1.0rem;">
                  Callback hell can make code difficult to maintain because deeply nested callbacks are hard to read and debug. Although callback hell itself doesn't necessarily impact performance, the risk of introducing bugs or errors increases with complexity, potentially leading to performance issues and maintenance challenges.
                </p>`
              },
              {
                "question": "What role does recursion play in managing callback hell?",
                "solution": `<p style="margin-top: 1.0rem;">
                  Recursion can sometimes be used as an alternative to avoid deeply nested callbacks. Instead of chaining callbacks, a recursive function can be designed to handle repetitive asynchronous tasks, especially in cases like looping through asynchronous operations.
                </p>
                <pre><code class="language-javascript">
            function processTasks(tasks) {
              if (tasks.length === 0) return;
              const [task, ...remainingTasks] = tasks;
              task(() => processTasks(remainingTasks));
            }
                </code></pre>`
              },
              {
                "question": "How do libraries like async.js help manage callback hell?",
                "solution": `<p style="margin-top: 1.0rem;">
                  Libraries like <code>async.js</code> provide utilities for managing asynchronous workflows without excessive nesting. They offer methods like <code>async.series</code>, <code>async.parallel</code>, and <code>async.waterfall</code> to control flow and handle tasks in series or parallel, reducing callback depth and improving readability.
                </p>`
              },
              {
                "question": "What is the 'pyramid of doom' and how is it related to callback hell?",
                "solution": `<p style="margin-top: 1.0rem;">
                  The "pyramid of doom" is a term describing the heavily indented structure caused by nested callbacks in callback hell. This pyramid-like structure makes code difficult to read and understand, as each callback relies on the previous one, causing excessive nesting and poor readability.
                </p>`
              },
              {
                "question": "How do error-first callbacks help in asynchronous JavaScript code?",
                "solution": `<p style="margin-top: 1.0rem;">
                  Error-first callbacks follow a convention where the first argument of a callback function represents an error object. This approach standardizes error handling, allowing developers to check for errors at each step of an asynchronous operation and avoid chaining unnecessary operations if an error occurs.
                </p>
                <pre><code class="language-javascript">
            fs.readFile('file.txt', (err, data) => {
              if (err) return console.error(err);
              processData(data, (err, result) => {
                if (err) return console.error(err);
                console.log(result);
              });
            });
                </code></pre>`
              },
              {
                "question": "What are some use cases where callbacks are preferred over promises or async/await?",
                "solution": `<p style="margin-top: 1.0rem;">
                  Callbacks are often preferred for simple event listeners, timers, or when working with older APIs that may not support promises. They are also useful in cases where synchronous processing is sufficient, or if minimal code is required without the need for additional chaining.
                </p>`
              },
              {
                "question": "Why is error handling more challenging with callback hell compared to promises?",
                "solution": `<p style="margin-top: 1.0rem;">
                  With callback hell, each nested callback requires its own error handling logic, making the code repetitive and harder to maintain. In contrast, promises centralize error handling with a single <code>.catch()</code> at the end of a chain, simplifying error management and improving readability.
                </p>`
              },
              {
                "question": "How can JavaScript ES6+ features help reduce callback hell?",
                "solution": `<p style="margin-top: 1.0rem;">
                  ES6+ introduced promises and, later, async/await, both of which help reduce callback hell. Promises allow chaining of asynchronous calls without excessive nesting, while async/await offers a syntax similar to synchronous code, greatly enhancing readability and reducing the need for deeply nested callbacks.
                </p>`
              },
              {
                "question": "What is an example of callback hell in handling sequential asynchronous requests?",
                "solution": `<p style="margin-top: 1.0rem;">
                  Sequential asynchronous requests, like fetching data from multiple endpoints, can quickly result in callback hell if each step depends on the previous one:
                </p>
                <pre><code class="language-javascript">
            fetchData1((err, result1) => {
              if (err) return console.error(err);
              fetchData2(result1, (err, result2) => {
                if (err) return console.error(err);
                fetchData3(result2, (err, result3) => {
                  if (err) return console.error(err);
                  console.log(result3);
                });
              });
            });
                </code></pre>`
              },
              {
                "question": "How does async.waterfall help with callback hell?",
                "solution": `<p style="margin-top: 1.0rem;">
                  <code>async.waterfall</code> from the <code>async.js</code> library helps manage callback hell by passing the result of one function to the next. This keeps each step of a process at the same level of indentation, improving readability and allowing easy management of sequential async operations.
                </p>
                <pre><code class="language-javascript">
            async.waterfall([
              function(callback) {
                callback(null, 'data1');
              },
              function(data, callback) {
                callback(null, 'data2');
              }
            ], function (err, result) {
              console.log(result);
            });
                </code></pre>`
              }
            ],
            links: [""],
          },
          {
            topic: "EventLoop",
            tags: [""],
            explanation: `<p style="margin-top: 1.0rem;">
  In JavaScript, the <strong>Event Loop</strong> is crucial for handling asynchronous operations, enabling non-blocking behavior. Although JavaScript is single-threaded—executing code line by line—the Event Loop allows it to manage multiple tasks, such as HTTP requests, user interactions, and timers, without waiting for each one to complete.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">How the Event Loop Works</h4>

<p style="margin-top: 1.0rem;">
  <strong>Call Stack:</strong> This is a structure that tracks function calls in the order they should execute. Each function call is added to the call stack and removed once completed.
</p>

<p style="margin-top: 1.0rem;">
  <strong>Web APIs:</strong> The browser (or Node.js) provides Web APIs like <code>setTimeout</code>, <code>fetch</code>, and DOM events. When an asynchronous function is called, the task is passed to the Web API without immediate execution on the main call stack.
</p>

<p style="margin-top: 1.0rem;">
  <strong>Callback Queue:</strong> After an asynchronous task completes, its callback function goes into the callback queue. It waits until the main thread is free to execute.
</p>

<p style="margin-top: 1.0rem;">
  <strong>Event Loop:</strong> The Event Loop monitors the call stack and callback queue. When the call stack is empty, it takes the first callback from the callback queue and moves it onto the call stack, creating a continuous cycle for handling asynchronous operations.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Example: Event Loop in Action</h4>

<pre><code class="language-javascript">
console.log("Start");

setTimeout(() => {
  console.log("Inside setTimeout");
}, 1000);

console.log("End");
</code></pre>

<p style="margin-top: 1.0rem;">
  Execution begins with <code>console.log("Start")</code>, so "Start" is printed. <code>setTimeout</code> is called, sending the task to the Web API and continuing to the next line. <code>console.log("End")</code> executes, so "End" is printed. After 1 second, the <code>setTimeout</code> callback moves to the callback queue, and once the call stack is clear, it executes and prints "Inside setTimeout".
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Key Concepts Inside the Event Loop</h4>

<p style="margin-top: 1.0rem;">
  <strong>Synchronous vs. Asynchronous:</strong> Synchronous code blocks the call stack, while asynchronous code does not, allowing JavaScript to handle other tasks in the meantime.
</p>

<p style="margin-top: 1.0rem;">
  <strong>Microtasks:</strong> Microtasks, such as Promise callbacks, have higher priority than the regular callback queue. After each task completes, the Event Loop processes all pending microtasks before moving to the next callback.
</p>

<p style="margin-top: 1.0rem;">
  <strong>Callback Queue Priority:</strong> The Event Loop clears microtasks before handling callbacks (e.g., <code>setTimeout</code>), ensuring microtasks are prioritized.
</p>

<pre><code class="language-javascript">
console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");
</code></pre>

<p style="margin-top: 1.0rem;">
  <code>console.log("Start")</code> executes, printing "Start". <code>setTimeout</code> is called, queuing the callback in the callback queue with 0 delay. A resolved Promise queues its <code>.then()</code> callback in the microtask queue. <code>console.log("End")</code> executes, printing "End". The Event Loop checks the microtask queue and executes the Promise callback, printing "Promise". Finally, the Event Loop moves to the callback queue and executes the <code>setTimeout</code> callback, printing "Timeout".
</p>

<p style="margin-top: 1.0rem;">
  <strong>Output:</strong> Start, End, Promise, Timeout
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Why the Event Loop Matters</h4>

<p style="margin-top: 1.0rem;">
  The Event Loop is essential for managing asynchronous tasks in JavaScript, enabling:
</p>

<ul style="margin-top: 1.0rem;">
  <li><strong>Non-blocking I/O:</strong> JavaScript can handle network requests without halting code execution.</li>
  <li><strong>Responsive User Interfaces:</strong> Efficient event handling and animations.</li>
  <li><strong>Efficient Task Management:</strong> JavaScript manages heavy processing without freezing the main thread.</li>
</ul>
`,
            examples: [""],
            questions: [
                {
                  "question": "What is the Event Loop in JavaScript, and why is it necessary?",
                  "solution": `<p style="margin-top: 1.0rem;">
                    The Event Loop is a mechanism in JavaScript that manages the execution of asynchronous code, ensuring that non-blocking operations complete without interrupting the main execution thread. It continuously checks the call stack and task queue, processing tasks in a way that keeps JavaScript's single-threaded nature performant.
                  </p>`
                },
                {
                  "question": "Explain the role of the Call Stack in the Event Loop process.",
                  "solution": `<p style="margin-top: 1.0rem;">
                    The Call Stack is a data structure that keeps track of function calls in the order they need to be executed. In JavaScript, when a function is called, it's added to the Call Stack, and when it finishes, it is removed. The Event Loop only pushes tasks to the Call Stack when it's empty, ensuring synchronous code executes first.
                  </p>`
                },
                {
                  "question": "How does the task queue work in JavaScript's Event Loop?",
                  "solution": `<p style="margin-top: 1.0rem;">
                    The task queue, also called the callback queue, holds asynchronous tasks like I/O events or timers that are ready for execution. When the Call Stack is empty, the Event Loop moves tasks from the task queue to the Call Stack for execution, following a FIFO (First In, First Out) order.
                  </p>`
                },
                {
                  "question": "What is the microtask queue, and how does it differ from the task queue?",
                  "solution": `<p style="margin-top: 1.0rem;">
                    The microtask queue is a high-priority queue where tasks like <code>Promises</code> and <code>MutationObserver</code> callbacks are stored. Microtasks are executed immediately after the current stack is cleared and before tasks in the task queue, giving them priority over regular async tasks.
                  </p>`
                },
                {
                  "question": "How are setTimeout and Promises prioritized by the Event Loop?",
                  "solution": `<p style="margin-top: 1.0rem;">
                    <code>setTimeout</code> callbacks are added to the task queue and are processed after the call stack is cleared. Promises, however, go into the microtask queue, which has higher priority, so they are executed before any task queue items once the call stack is empty.
                  </p>`
                },
                {
                  "question": "What happens if a function in the call stack is slow or blocks for a long time?",
                  "solution": `<p style="margin-top: 1.0rem;">
                    Since JavaScript is single-threaded, a slow or blocking function will keep other tasks from executing. It can delay the Event Loop from processing the task and microtask queues, making the application unresponsive until the blocking function completes.
                  </p>`
                },
                {
                  "question": "What are 'ticks' in the context of the Event Loop?",
                  "solution": `<p style="margin-top: 1.0rem;">
                    A 'tick' refers to a single iteration of the Event Loop. Each tick represents a cycle where the Event Loop checks the call stack, moves tasks from the microtask queue, and then from the task queue to the call stack if available, before moving to the next tick.
                  </p>`
                },
                {
                  "question": "Describe the order of execution for synchronous and asynchronous tasks in the Event Loop.",
                  "solution": `<p style="margin-top: 1.0rem;">
                    The Event Loop executes synchronous tasks first, clearing the call stack. Once empty, it checks the microtask queue (for Promises, MutationObservers) and executes those tasks. Only after the microtask queue is empty does it move to tasks in the task queue, like <code>setTimeout</code> or <code>setInterval</code> callbacks.
                  </p>`
                },
                {
                  "question": "How does the Event Loop impact the performance of JavaScript applications?",
                  "solution": `<p style="margin-top: 1.0rem;">
                    The Event Loop's efficient handling of asynchronous tasks prevents blocking, keeping JavaScript applications responsive. However, if too many tasks are queued or if there are blocking operations, it can slow down the Event Loop, causing performance bottlenecks and lag in the user interface.
                  </p>`
                },
                {
                  "question": "What is the relationship between the Event Loop and JavaScript’s single-threaded nature?",
                  "solution": `<p style="margin-top: 1.0rem;">
                    JavaScript is single-threaded, meaning only one piece of code executes at a time. The Event Loop enables non-blocking behavior by managing asynchronous tasks in separate queues, allowing JavaScript to handle tasks concurrently without creating new threads, simulating multitasking.
                  </p>`
                },
                {
                  "question": "How would you use async/await to simplify Event Loop handling in JavaScript?",
                  "solution": `<p style="margin-top: 1.0rem;">
                    <code>async/await</code> syntax makes asynchronous code appear more synchronous and readable. With <code>await</code>, JavaScript pauses the function execution until the Promise resolves, and the Event Loop can continue handling other tasks while waiting, making it simpler to manage asynchronous logic without deeply nested callbacks.
                  </p>
                  <pre><code class="language-javascript">
              async function fetchData() {
                try {
                  const data = await getDataAsync();
                  console.log(data);
                } catch (error) {
                  console.error(error);
                }
              }
                  </code></pre>`
                },
                {
                  "question": "Can you explain how the browser handles long-running tasks while keeping the UI responsive?",
                  "solution": `<p style="margin-top: 1.0rem;">
                    Browsers handle long-running tasks by using the Event Loop, offloading asynchronous operations to separate queues. With APIs like <code>requestAnimationFrame</code> and <code>setTimeout</code>, JavaScript can split intensive tasks into smaller, non-blocking segments, allowing UI updates between cycles and keeping the interface responsive.
                  </p>`
                },
                {
                  "question": "How does the Event Loop differ in Node.js compared to the browser?",
                  "solution": `<p style="margin-top: 1.0rem;">
                    In Node.js, the Event Loop has additional phases to handle file system and network I/O efficiently. It includes phases for timers, I/O callbacks, idle and prepare, poll, check, and close callbacks, allowing Node.js to manage asynchronous operations outside the browser environment with optimized performance.
                  </p>`
                },
            ],
            links: [""],
          },
          {
            topic: "IIFE",
            tags: [""],
            explanation: `<p style="margin-top: 1.0rem;">
  An Immediately Invoked Function Expression (IIFE) in JavaScript is a function that executes as soon as it is defined. This type of function is useful for creating a local scope, preventing variables and functions that are only needed temporarily from polluting the global scope. IIFEs are often employed when an isolated execution context is needed, such as to safeguard variable values or avoid naming conflicts.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Syntax of an IIFE</h4>

<p style="margin-top: 1.0rem;">
  An IIFE is created by wrapping a function in parentheses and immediately invoking it. The syntax is:
</p>

<pre><code class="language-javascript">
(function() {
  // Code here is executed immediately
  console.log("IIFE executed!");
})();
</code></pre>

<p style="margin-top: 1.0rem;">
  Here, <code>(function() ... )</code> is a function expression, and <code>()</code> at the end immediately invokes it. Without wrapping the function in parentheses, JavaScript would treat it as a function declaration, which requires a name and cannot be invoked immediately.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Why Use an IIFE?</h4>

<p style="margin-top: 1.0rem;">
  <strong>Avoid Global Variables:</strong> Wrapping code in an IIFE ensures that any variables defined within are scoped only to that function, thus preventing them from affecting or being affected by the global scope, which is crucial for modular code.
</p>

<pre><code class="language-javascript">
(function() {
  let count = 10;
  console.log(count); // Outputs: 10
})();

console.log(count); // Error: count is not defined
</code></pre>

<p style="margin-top: 1.0rem;">
  In this example, <code>count</code> is only accessible within the IIFE and does not exist outside of it.
</p>

<p style="margin-top: 1.0rem;">
  <strong>Private Variables and Encapsulation:</strong> IIFEs are also useful for creating private variables that remain inaccessible outside the function, promoting encapsulation.
</p>

<p style="margin-top: 1.0rem;">
  <strong>Avoid Naming Conflicts:</strong> IIFEs help prevent conflicts when working with libraries or code snippets that may contain variables or functions with similar names, as they keep these separate from other code.
</p>

<p style="margin-top: 1.0rem;">
  <strong>Execute Code Immediately:</strong> IIFEs are commonly used to execute code right away, such as when initializing variables or setting up event listeners.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Passing Parameters to an IIFE</h4>

<p style="margin-top: 1.0rem;">
  IIFEs can accept parameters, making them flexible for initialization tasks. For instance, you might pass the <code>window</code> or <code>document</code> objects to an IIFE to avoid accessing them repeatedly within the function:
</p>

<pre><code class="language-javascript">
(function(window, document) {
  // This IIFE has access to 'window' and 'document'
  const title = document.querySelector("title");
  console.log("Title of the page:", title.textContent);
})(window, document);
</code></pre>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Arrow Function IIFE</h4>

<p style="margin-top: 1.0rem;">
  You can also create an IIFE using arrow function syntax:
</p>

<pre><code class="language-javascript">
(() => {
  console.log("Arrow function IIFE executed!");
})();
</code></pre>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Use Cases for IIFE</h4>

<p style="margin-top: 1.0rem;">
  <strong>Modular Code:</strong> Organizing code into isolated blocks to avoid clashes between different parts of a program.
</p>

<p style="margin-top: 1.0rem;">
  <strong>Initialization Code:</strong> Executing code immediately after it loads, such as setting up event listeners or initializing variables.
</p>

<p style="margin-top: 1.0rem;">
  <strong>Frameworks and Libraries:</strong> Libraries often use IIFEs to prevent global namespace pollution and to structure code.
</p>

<pre><code class="language-javascript">
const MathModule = (function() {
  const pi = 3.1415;

  function circleArea(radius) {
    return pi * radius * radius;
  }

  return {
    circleArea: circleArea
  };
})();

console.log(MathModule.circleArea(5)); // Outputs the area of a circle with radius 5
</code></pre>
`,
            examples: [""],
            questions: [
              {
                "question": "What is an Immediately Invoked Function Expression (IIFE) in JavaScript?",
                "solution": `<p style="margin-top: 1.0rem;">
                  An IIFE is a function that is defined and executed immediately after its creation. It is enclosed in parentheses and followed by another set of parentheses to invoke it. This pattern is used to create a local scope and avoid polluting the global namespace.
                </p>
                <pre><code class="language-javascript">
            (function() {
              console.log('I am an IIFE!');
            })(); // Output: I am an IIFE!
                </code></pre>`
              },
              {
                "question": "What are the benefits of using an IIFE?",
                "solution": `<p style="margin-top: 1.0rem;">
                  The primary benefits of using an IIFE include:
                </p>
                <ul style="margin-top: 1.0rem;">
                  <li><strong>Encapsulation:</strong> Variables and functions defined inside an IIFE are not accessible from the outside, preventing conflicts.</li>
                  <li><strong>Isolation:</strong> It creates a private scope, allowing the use of variables without affecting the global scope.</li>
                  <li><strong>Initialization:</strong> IIFEs are often used to initialize variables or perform setup tasks in a contained manner.</li>
                </ul>`
              },
              {
                "question": "How do you pass arguments to an IIFE?",
                "solution": `<p style="margin-top: 1.0rem;">
                  You can pass arguments to an IIFE just like a regular function by including parameters in the function definition and providing arguments in the invocation parentheses:
                </p>
                <pre><code class="language-javascript">
            (function(name) {
              console.log('Hello, ' + name);
            })('Alice'); // Output: Hello, Alice
                </code></pre>`
              },
              {
                "question": "Can you explain how IIFEs help in module pattern creation?",
                "solution": `<p style="margin-top: 1.0rem;">
                  IIFEs are commonly used in the module pattern to create private variables and expose public methods. This pattern allows you to encapsulate functionality while exposing a limited API:
                </p>
                <pre><code class="language-javascript">
            const counter = (function() {
              let count = 0; // Private variable
            
              return {
                increment: function() {
                  count++;
                },
                getCount: function() {
                  return count;
                }
              };
            })();
            
            counter.increment();
            console.log(counter.getCount()); // Output: 1
                </code></pre>`
              },
              {
                "question": "What is the difference between an IIFE and a regular function?",
                "solution": `<p style="margin-top: 1.0rem;">
                  The main difference is that an IIFE is executed immediately after it's defined, while a regular function must be called explicitly. Additionally, IIFEs create their own scope, preventing variable leakage into the global namespace.
                </p>`
              },
              {
                "question": "How do IIFEs relate to the concept of closures in JavaScript?",
                "solution": `<p style="margin-top: 1.0rem;">
                  IIFEs can create closures by defining inner functions that can access the IIFE's scope even after it has executed. This allows you to maintain private state:
                </p>
                <pre><code class="language-javascript">
            const createCounter = (function() {
              let count = 0; // Private variable
            
              return function() {
                count++;
                return count;
              };
            })();
            
            console.log(createCounter()); // Output: 1
            console.log(createCounter()); // Output: 2
                </code></pre>`
              },
              {
                "question": "Can you provide an example of nesting IIFEs?",
                "solution": `<p style="margin-top: 1.0rem;">
                  IIFEs can be nested to create multiple levels of encapsulation. Here’s an example:
                </p>
                <pre><code class="language-javascript">
            (function outer() {
              let outerVar = 'I am outside!';
            
              (function inner() {
                let innerVar = 'I am inside!';
                console.log(outerVar); // Accessing outer scope
              })();
            
              // console.log(innerVar); // Error: innerVar is not defined
            })();
            
                </code></pre>`
              },
              {
                "question": "When should you consider using an IIFE in your code?",
                "solution": `<p style="margin-top: 1.0rem;">
                  You should consider using an IIFE when you want to:
                </p>
                <ul style="margin-top: 1.0rem;">
                  <li>Encapsulate functionality and prevent global namespace pollution.</li>
                  <li>Initialize variables or perform setup operations without leaving traces in the global scope.</li>
                  <li>Create modules that expose specific methods while keeping other parts private.</li>
                </ul>`
              },
              {
                "question": "What are the potential downsides of using IIFEs?",
                "solution": `<p style="margin-top: 1.0rem;">
                  While IIFEs are useful, they can also lead to potential downsides such as:
                </p>
                <ul style="margin-top: 1.0rem;">
                  <li><strong>Overhead:</strong> If overused, they can introduce unnecessary complexity to your code.</li>
                  <li><strong>Readability:</strong> Excessive nesting of IIFEs can reduce readability and make the code harder to follow.</li>
                </ul>`
              },
              {
                "question": "How do IIFEs support JavaScript's functional programming aspects?",
                "solution": `<p style="margin-top: 1.0rem;">
                  IIFEs align with functional programming by allowing the creation of functions that can be executed immediately and have their own scope. This supports higher-order functions, where functions can be passed as arguments and returned as values, promoting a functional style in JavaScript.
                </p>`
              }
            ],
            links: [""],
          },
          {
            topic: "Binding",
            tags: [""],
            explanation: `<p style="margin-top: 1.0rem;">
  In JavaScript, binding refers to setting or fixing the value of <code>this</code> in a function so that it has a specific context when it’s called, regardless of where or how it is used. Binding can be particularly useful when passing functions as callbacks or using them in contexts where the default <code>this</code> value might change.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">How Binding Works</h4>

<p style="margin-top: 1.0rem;">
  JavaScript provides three main methods for explicitly controlling <code>this</code>: <code>call()</code>, <code>apply()</code>, and <code>bind()</code>. These methods allow you to set <code>this</code> to a specific object for a function when it is executed, which is particularly useful in scenarios such as:
</p>
<ul>
  <li>Event Handlers: <code>this</code> may refer to the event target rather than the desired object.</li>
  <li>Callbacks: <code>this</code> can lose its reference to the intended context.</li>
  <li>Functional Programming: Helpful for creating functions with specific contexts.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">1. The <code>bind()</code> Method</h4>

<p style="margin-top: 1.0rem;">
  <code>bind()</code> creates a new function with <code>this</code> set to the value provided as an argument. It does not invoke the function immediately but instead returns a new function that can be called later.
</p>

<pre><code class="language-javascript">
const person = {
  name: "Alice",
  greet: function() {
    console.log("Hello, " + this.name);
  }
};

// Binding 'greet' to 'person'
const greetPerson = person.greet.bind(person);

// Calling greetPerson later
greetPerson(); // Output: Hello, Alice
</code></pre>

<p style="margin-top: 1.0rem;">
  In this example, calling <code>bind()</code> on <code>greet</code> with <code>person</code> ensures that the function’s <code>this</code> refers to <code>person</code> even when <code>greetPerson</code> is called later.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">2. <code>call()</code> and <code>apply()</code> for Immediate Execution</h4>

<p style="margin-top: 1.0rem;">
  While <code>bind()</code> returns a new function that can be called later, <code>call()</code> and <code>apply()</code> immediately execute the function with a specified <code>this</code> context.
</p>
<ul>
  <li><code>call()</code>: Takes arguments individually.</li>
  <li><code>apply()</code>: Takes arguments as an array.</li>
</ul>

<pre><code class="language-javascript">
const person = { name: "Alice" };

function greet(greeting) {
  console.log(greeting + ", " + this.name);
}

greet.call(person, "Hello"); // Output: Hello, Alice
greet.apply(person, ["Hi"]); // Output: Hi, Alice
</code></pre>

<p style="margin-top: 1.0rem;">
  In this example, <code>call()</code> and <code>apply()</code> set <code>this</code> to <code>person</code> and immediately invoke <code>greet</code>.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Binding in Arrow Functions</h4>

<p style="margin-top: 1.0rem;">
  Arrow functions in JavaScript do not have their own <code>this</code> context. Instead, they inherit <code>this</code> from the scope in which they are defined. This makes <code>bind()</code> ineffective for arrow functions since their <code>this</code> is fixed based on where they’re created, not where they’re called.
</p>

<pre><code class="language-javascript">
const person = {
  name: "Alice",
  greet: () => {
    console.log("Hello, " + this.name); // 'this' is inherited from the outer scope, not 'person'
  }
};

person.greet(); // Output: Hello, undefined
</code></pre>

<p style="margin-top: 1.0rem;">
  In this example, <code>greet</code> is an arrow function, so <code>this</code> does not refer to <code>person</code>. Instead, it takes <code>this</code> from the surrounding lexical scope, where <code>this.name</code> is <code>undefined</code>.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Why Use Binding?</h4>

<p style="margin-top: 1.0rem;">
  Binding is useful in many situations:
</p>
<ul>
  <li><strong>Consistent <code>this</code> reference</strong>: Ensures that functions operate on the expected object.</li>
  <li><strong>Flexible reusability</strong>: Allows you to pass methods as callbacks or event handlers with confidence they’ll use the correct <code>this</code>.</li>
  <li><strong>Functional programming patterns</strong>: Helps set up partially applied functions with <code>bind()</code> by fixing some arguments.</li>
</ul>

<p style="margin-top: 1.0rem;">
  In summary, binding gives you control over the context (<code>this</code>) of your functions, enabling more predictable behavior across different JavaScript programming situations.
</p>`,
            examples: [""],
            questions: [
              {
                "question": "What is function binding in JavaScript?",
                "solution": `<p style="margin-top: 1.0rem;">
                  Function binding in JavaScript refers to the process of setting the value of <code>this</code> for a function. It ensures that a function is executed in the context of a specific object, regardless of how it is called. This is typically achieved using the <code>bind()</code> method.
                </p>`
              },
              {
                "question": "How does the bind() method work?",
                "solution": `<p style="margin-top: 1.0rem;">
                  The <code>bind()</code> method creates a new function that, when called, has its <code>this</code> keyword set to the provided value. It can also accept a list of arguments that will be prepended to the arguments provided to the new function when it is called.
                </p>
                <pre><code class="language-javascript">
            const person = {
              name: 'Alice',
              greet: function() {
                console.log('Hello, ' + this.name);
              }
            };
            
            const greetAlice = person.greet.bind(person);
            greetAlice(); // Output: Hello, Alice
                </code></pre>`
              },
              {
                "question": "What is the difference between bind() and call()/apply()?",
                "solution": `<p style="margin-top: 1.0rem;">
                  The main difference is that <code>bind()</code> returns a new function with a fixed <code>this</code> context, while <code>call()</code> and <code>apply()</code> invoke the function immediately with the specified context. <code>call()</code> takes individual arguments, while <code>apply()</code> takes an array of arguments.
                </p>`
              },
              {
                "question": "Can you provide an example where binding is necessary?",
                "solution": `<p style="margin-top: 1.0rem;">
                  Binding is especially useful in event handlers to maintain the correct context of <code>this</code>. Here’s an example:
                </p>
                <pre><code class="language-javascript">
            const button = document.getElementById('myButton');
            const person = {
              name: 'Alice',
              greet: function() {
                console.log('Hello, ' + this.name);
              }
            };
            
            button.addEventListener('click', person.greet.bind(person)); // Correctly binds 'this' to person
                </code></pre>`
              },
              {
                "question": "What happens if you use bind() with a non-existent method?",
                "solution": `<p style="margin-top: 1.0rem;">
                  If you attempt to bind a method that does not exist on an object, it will return a new function that, when called, will throw a <code>TypeError</code> since it cannot find the method to execute.
                </p>
                <pre><code class="language-javascript">
            const person = {
              name: 'Alice'
            };
            
            const greet = person.greet.bind(person); // greet is not defined on person
            greet(); // TypeError: person.greet is not a function
                </code></pre>`
              },
              {
                "question": "How does binding help in functional programming in JavaScript?",
                "solution": `<p style="margin-top: 1.0rem;">
                  Binding can aid functional programming by allowing functions to be passed around with a specific context, enabling more flexible and reusable code. It allows functions to carry their context along with them when they are passed as arguments.
                </p>`
              },
              {
                "question": "Can you bind a function to multiple contexts?",
                "solution": `<p style="margin-top: 1.0rem;">
                  No, a function can only be bound to a single context at a time. Each time you call <code>bind()</code>, it creates a new function with the specified <code>this</code> context. You cannot bind one function to multiple objects simultaneously.
                </p>`
              },
              {
                "question": "What is partial application in the context of bind()?",
                "solution": `<p style="margin-top: 1.0rem;">
                  Partial application refers to the process of fixing a number of arguments to a function, which can be accomplished using <code>bind()</code>. By binding arguments to a function, you can create a new function with fewer parameters.
                </p>
                <pre><code class="language-javascript">
            function multiply(a, b) {
              return a * b;
            }
            
            const double = multiply.bind(null, 2); // Binds 2 to the first parameter
            console.log(double(5)); // Output: 10
                </code></pre>`
              },
              {
                "question": "Can you use bind() with arrow functions?",
                "solution": `<p style="margin-top: 1.0rem;">
                  Using <code>bind()</code> with arrow functions does not change their <code>this</code> context because arrow functions do not have their own <code>this</code>. They inherit <code>this</code> from their enclosing lexical scope.
                </p>
                <pre><code class="language-javascript">
            const person = {
              name: 'Alice',
              greet: () => {
                console.log('Hello, ' + this.name); // 'this' is lexically bound
              }
            };
            
            const greetAlice = person.greet.bind(person);
            greetAlice(); // Output: Hello, undefined
                </code></pre>`
              },
              {
                "question": "How can you remove the binding from a function created with bind()?",
                "solution": `<p style="margin-top: 1.0rem;">
                  Once a function is bound using <code>bind()</code>, you cannot unbind it. The binding is permanent for that instance of the function. To change the context, you would need to create a new bound function with <code>bind()</code> again.
                </p>`
              }
            ],
            links: [""],
          },
          {
            topic: "Async and Defer",
            tags: [""],
            explanation: `<p style="margin-top: 1.0rem;">
  In JavaScript, <strong>async</strong> and <strong>defer</strong> are attributes for <code>&lt;script&gt;</code> tags that control how scripts load and execute relative to the HTML document. These attributes help optimize the loading of external JavaScript files, improving webpage performance.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">How They Work</h4>

<h5 style="margin-top: 1.25rem; font-size: 1.15rem;">Default Script Loading Behavior</h5>
<p style="margin-top: 1.0rem;">
  By default, when a <code>&lt;script src="script.js"&gt;</code> tag is added in the <code>&lt;head&gt;</code>, the browser:
</p>

<ul style="margin-top: 1.0rem;">
  <li>Pauses HTML parsing to fetch and execute the JavaScript file.</li>
  <li>Blocks page rendering until the script is fully loaded and executed.</li>
</ul>

<p style="margin-top: 1.0rem;">
  This can slow down the page load, especially if there are multiple or large JavaScript files at the top of the page.
</p>

<h5 style="margin-top: 1.25rem; font-size: 1.15rem;">Async Attribute</h5>
<p style="margin-top: 1.0rem;">
  The <code>async</code> attribute allows the browser to:
</p>

<ul style="margin-top: 1.0rem;">
  <li>Fetch the script asynchronously without blocking HTML parsing.</li>
  <li>Execute the script as soon as it’s downloaded, potentially before or after HTML parsing completes.</li>
</ul>

<pre><code class="language-html">
&lt;script src="script.js" async&gt;&lt;/script&gt;
</code></pre>

<p style="margin-top: 1.0rem;">
  <strong>Key Points of async:</strong>
</p>

<ul style="margin-top: 1.0rem;">
  <li><strong>Execution order is not guaranteed:</strong> Scripts with <code>async</code> load independently and execute in whichever order they finish loading.</li>
  <li><strong>Good for independent scripts:</strong> Ideal for scripts that don’t rely on the DOM or other scripts, such as analytics or ad scripts.</li>
</ul>

<p style="margin-top: 1.0rem;">
  <strong>Example Scenario:</strong>
</p>

<pre><code class="language-html">
&lt;script src="analytics.js" async&gt;&lt;/script&gt;
&lt;script src="ads.js" async&gt;&lt;/script&gt;
</code></pre>

<p style="margin-top: 1.0rem;">
  Both scripts load simultaneously, but the browser executes whichever finishes downloading first. This can speed up page load times but may result in unpredictable execution order.
</p>

<h5 style="margin-top: 1.25rem; font-size: 1.15rem;">Defer Attribute</h5>
<p style="margin-top: 1.0rem;">
  The <code>defer</code> attribute also loads scripts asynchronously, but:
</p>

<ul style="margin-top: 1.0rem;">
  <li>Ensures script execution only after the entire HTML document is parsed.</li>
  <li>Executes scripts in the order they appear in the HTML.</li>
</ul>

<pre><code class="language-html">
&lt;script src="script.js" defer&gt;&lt;/script&gt;
</code></pre>

<p style="margin-top: 1.0rem;">
  <strong>Key Points of defer:</strong>
</p>

<ul style="margin-top: 1.0rem;">
  <li><strong>Execution order is preserved:</strong> Scripts with <code>defer</code> execute in the order they appear in HTML, regardless of load times.</li>
  <li><strong>Good for DOM-dependent scripts:</strong> Ideal for scripts that rely on the fully loaded HTML, such as those that manipulate the DOM or depend on other scripts.</li>
</ul>

<p style="margin-top: 1.0rem;">
  <strong>Example Scenario:</strong>
</p>

<pre><code class="language-html">
&lt;script src="main.js" defer&gt;&lt;/script&gt;
&lt;script src="helper.js" defer&gt;&lt;/script&gt;
</code></pre>

<p style="margin-top: 1.0rem;">
  The browser loads both scripts in parallel but executes <code>main.js</code> first, followed by <code>helper.js</code>, only after the HTML is fully parsed.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Comparison of async, defer, and Default Loading</h4>

<table style="margin-top: 1.0rem; width: 100%; border-collapse: collapse;">
  <thead>
    <tr>
      <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Attribute</th>
      <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Load Behavior</th>
      <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Execution Timing</th>
      <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Order of Execution</th>
      <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Best Use</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px;">async</td>
      <td style="border: 1px solid #ddd; padding: 8px;">Asynchronous</td>
      <td style="border: 1px solid #ddd; padding: 8px;">Immediately after download</td>
      <td style="border: 1px solid #ddd; padding: 8px;">Unpredictable</td>
      <td style="border: 1px solid #ddd; padding: 8px;">Independent scripts (analytics, ads)</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px;">defer</td>
      <td style="border: 1px solid #ddd; padding: 8px;">Asynchronous</td>
      <td style="border: 1px solid #ddd; padding: 8px;">After HTML parsing completes</td>
      <td style="border: 1px solid #ddd; padding: 8px;">Sequential</td>
      <td style="border: 1px solid #ddd; padding: 8px;">DOM-dependent scripts</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px;">Default</td>
      <td style="border: 1px solid #ddd; padding: 8px;">Synchronous</td>
      <td style="border: 1px solid #ddd; padding: 8px;">When encountered in HTML</td>
      <td style="border: 1px solid #ddd; padding: 8px;">Sequential</td>
      <td style="border: 1px solid #ddd; padding: 8px;">Critical scripts needed early</td>
    </tr>
  </tbody>
</table>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600; letter-spacing: -0.025em;">Summary</h4>

<ul style="margin-top: 1.0rem;">
  <li><strong>async:</strong> Loads scripts asynchronously and executes them immediately, without a guarantee of order.</li>
  <li><strong>defer:</strong> Loads scripts asynchronously but defers execution until HTML parsing completes, ensuring order.</li>
</ul>

<p style="margin-top: 1.0rem;">
  Use <code>async</code> for scripts that don’t rely on the DOM or other scripts and <code>defer</code> for those that do.
</p>
`,
            examples: [""],
            questions: [
              {
                "question": "What is the difference between async and defer attributes in JavaScript?",
                "solution": `<p style="margin-top: 1.0rem;">
                  The <code>async</code> attribute allows the script to be executed as soon as it is available, without waiting for the HTML document to finish parsing. In contrast, the <code>defer</code> attribute ensures that the script is executed only after the HTML document has been completely parsed. Furthermore, scripts with <code>defer</code> are executed in the order they appear in the HTML.
                </p>`
              },
              {
                "question": "How does the async attribute affect the loading of scripts?",
                "solution": `<p style="margin-top: 1.0rem;">
                  When a script is loaded with the <code>async</code> attribute, it downloads asynchronously and executes immediately once it's downloaded, potentially before the HTML document is fully parsed. This can lead to scripts executing in a different order than they appear in the HTML, which is important to consider for dependencies between scripts.
                </p>`
              },
              {
                "question": "What scenarios would you use the defer attribute over async?",
                "solution": `<p style="margin-top: 1.0rem;">
                  You would use the <code>defer</code> attribute for scripts that depend on the DOM being fully loaded, such as scripts that manipulate elements or rely on other scripts to have been executed first. This ensures that all elements are available before the script runs, preventing potential errors.
                </p>`
              },
              {
                "question": "Can you provide an example of using the async attribute in a script tag?",
                "solution": `<p style="margin-top: 1.0rem;">
                  Here’s an example of a script using the <code>async</code> attribute:
                </p>
                <pre><code class="language-html">
            &lt;script src="analytics.js" async&gt;&lt;/script&gt;
                </code></pre>`
              },
              {
                "question": "What happens if both async and defer attributes are present on a script tag?",
                "solution": `<p style="margin-top: 1.0rem;">
                  If both <code>async</code> and <code>defer</code> attributes are present on a script tag, the <code>async</code> attribute takes precedence. The script will be executed as soon as it is available, ignoring the defer behavior.
                </p>`
              },
              {
                "question": "Why is it important to optimize script loading with async and defer?",
                "solution": `<p style="margin-top: 1.0rem;">
                  Optimizing script loading with <code>async</code> and <code>defer</code> can significantly improve webpage performance. It reduces render-blocking, allowing HTML to be parsed and displayed to the user more quickly. This enhances the overall user experience and can lead to better SEO rankings as page load times are a factor in search engine algorithms.
                </p>`
              },
              {
                "question": "How do async and defer attributes affect the execution order of multiple scripts?",
                "solution": `<p style="margin-top: 1.0rem;">
                  When multiple scripts are loaded with the <code>async</code> attribute, they can execute in any order as soon as they finish downloading. This can lead to unpredictable behavior if scripts depend on each other. In contrast, scripts with the <code>defer</code> attribute will always execute in the order they are declared in the HTML, after the document has been fully parsed, ensuring consistent execution order.
                </p>`
              },
              {
                "question": "What potential issues can arise when using async for scripts that manipulate the DOM?",
                "solution": `<p style="margin-top: 1.0rem;">
                  Using the <code>async</code> attribute for scripts that manipulate the DOM can lead to issues where the script tries to access DOM elements that haven’t been created yet. Since <code>async</code> scripts can execute as soon as they are downloaded, they may run before the DOM is ready, resulting in errors or unexpected behavior. In such cases, using <code>defer</code> is more appropriate.
                </p>`
              },
              {
                "question": "How do the async and defer attributes impact page load performance and user experience?",
                "solution": `<p style="margin-top: 1.0rem;">
                  Both <code>async</code> and <code>defer</code> attributes improve page load performance by allowing HTML parsing to continue while scripts are loading. This reduces render-blocking behavior. <code>async</code> is beneficial for scripts that don't depend on the DOM, while <code>defer</code> is ideal for scripts that require DOM elements to be fully available. Using these attributes appropriately leads to a smoother user experience and faster load times.
                </p>`
              },
              {
                "question": "Can you explain the impact of script execution timing when using async and defer in relation to the DOMContentLoaded event?",
                "solution": `<p style="margin-top: 1.0rem;">
                  The <code>DOMContentLoaded</code> event fires when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, or subframes to finish loading. Scripts with the <code>defer</code> attribute will execute after the DOM has been fully constructed but before the <code>DOMContentLoaded</code> event. However, scripts with the <code>async</code> attribute can execute at any time, even before <code>DOMContentLoaded</code> has been fired, which can lead to unexpected behavior if those scripts manipulate the DOM.
                </p>`
              },
              {
                "question": "In what scenarios would you recommend avoiding the use of async and defer attributes?",
                "solution": `<p style="margin-top: 1.0rem;">
                  You should avoid using <code>async</code> for scripts that depend on the execution order or that interact with the DOM. Similarly, avoid using both attributes for critical scripts that are necessary for page functionality and require complete control over the loading sequence. For example, inline scripts that need to be executed in a specific order should not use these attributes.
                </p>`
              },
              {
                "question": "How can you dynamically load scripts with async and defer attributes in JavaScript?",
                "solution": `<p style="margin-top: 1.0rem;">
                  You can dynamically load scripts in JavaScript by creating a <code>&lt;script&gt;</code> element and setting its <code>src</code> attribute to the desired script URL. You can also set the <code>async</code> or <code>defer</code> attributes directly on this element before appending it to the document:
                </p>
                <pre><code class="language-javascript">
            const script = document.createElement('script');
            script.src = 'example.js';
            script.async = true; // or script.defer = true;
            document.head.appendChild(script);
                </code></pre>`
              }
            ],
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
        concepts: [],
      },
    ],
  },
];
