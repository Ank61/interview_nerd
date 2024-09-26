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
            explanation: "<></>",
            examples: [""],
            questions: [{}],
            links: [
              "https://www.hellojavascript.info/docs/browser-related-questions/miscellaneous-browser-questions/event-loop-microtasks-macrotasks",
            ],
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
