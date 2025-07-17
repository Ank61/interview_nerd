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
];
