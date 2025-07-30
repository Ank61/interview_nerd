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
        solution: "",
        tags: [{ name: "event delegation", link: "" }],
      },
      {
        question:
          "Differentiate between a variable that is null, undefined, or undeclared.",
        solution: "",
        tags: [],
      },
      {
        question:
          "Define what a closure is and describe its uses and advantages.",
        solution: "",
        tags: [{ name: "closures", link: "" }],
      },
      {
        question:
          "Clarify the distinctions among 'function User(){}', 'var user = User()', and 'var user = new User()'.",
        solution: "",
        tags: [],
      },
      {
        question: "Define the concept of 'hoisting'.",
        solution: "",
        tags: [{ name: "hoisting", link: "" }],
      },
      {
        question:
          "What is type coercion, and what are some common pitfalls associated with relying on it in JavaScript code?",
        solution: "",
        tags: [{ name: "type coercion", link: "" }],
      },
      {
        question: "Describe event bubbling and event capturing.",
        solution: "",
        tags: [{ name: "event bubbling", link: "" }],
      },
      {
        question: "What distinguishes an 'attribute' from a 'property'?",
        solution: "",
        tags: [],
      },
      {
        question:
          "Why is it referred to as a 'Ternary operator,' and what does the term 'Ternary' signify?",
        solution: "",
        tags: [{ name: "ternary operator", link: "" }],
      },
      {
        question:
          "Explain the disparities between variables created using let, var, or const.",
        solution: "",
        tags: [{ name: "let vs var vs const", link: "" }],
      },
      {
        question:
          "Compare ES6 classes and ES5 function constructors, and furnish a use case for the arrow (=>) function syntax.",
        solution: "",
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
        solution: "",
        tags: [{ name: "this in ES6", link: "" }],
      },
      {
        question: "Explain the concept of prototypal inheritance.",
        solution: "",
        tags: [{ name: "prototypal inheritance", link: "" }],
      },
      {
        question:
          "Explain the primary distinction between the Array.forEach() loop and Array.map() method, as well as when to choose one over the other.",
        solution: "",
        tags: [{ name: "array methods", link: "" }],
      },
      {
        question: "Distinguish between host objects and native objects.",
        solution: "",
        tags: [{ name: "host vs native objects", link: "" }],
      },
      {
        question:
          "Can you elucidate the purposes of Function.call and Function.apply, along with their notable differences?",
        solution: "",
        tags: [{ name: "Function.call", link: "" }],
      },
      {
        question: "Describe the Function.prototype.bind method.",
        solution: "",
        tags: [{ name: "Function.prototype.bind", link: "" }],
      },
      {
        question:
          "Explain the differences between feature detection, feature inference, and utilizing the User Agent (UA) string.",
        solution: "",
        tags: [{ name: "feature detection vs inference", link: "" }],
      },
      {
        question:
          "List the advantages and disadvantages of extending built-in JavaScript objects.",
        solution: "",
        tags: [],
      },
      {
        question:
          "Discuss the same-origin policy's implications for JavaScript.",
        solution: "",
        tags: [{ name: "same-origin policy", link: "" }],
      },
      {
        question:
          "Define strict mode and outline some of its advantages and disadvantages.",
        solution: "",
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
        solution: "",
        tags: [{ name: "immutability", link: "" }],
      },
      {
        question:
          "Discuss the same-origin policy's implications for JavaScript.",
        solution: "",
        tags: [{ name: "same-origin policy", link: "" }],
      },
      {
        question:
          "Analyze the pros and cons of writing JavaScript code in a language that compiles to JavaScript.",
        solution: "",
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
];
