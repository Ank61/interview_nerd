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
];
