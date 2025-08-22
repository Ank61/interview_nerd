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
  {
    id: 39,
    topic: "SQL",
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
        question: "What is SQL?",
        solution:
          "SQL (Structured Query Language) is a standard language for storing, manipulating and retrieving data in relational database systems such as MySQL, PostgreSQL, SQL Server, Oracle, etc.",
      },
      {
        question: "What are the different types of SQL commands?",
        solution:
          "Five broad categories:\n1. DDL – CREATE, ALTER, DROP (define structure)\n2. DML – SELECT, INSERT, UPDATE, DELETE (manipulate data)\n3. DCL – GRANT, REVOKE (control access)\n4. TCL – COMMIT, ROLLBACK, SAVEPOINT (transaction control)",
      },
      {
        question: "What is a primary key in SQL?",
        solution:
          "A PRIMARY KEY is a column (or set of columns) that uniquely identifies each row in a table. It enforces entity integrity, disallows NULLs, and automatically creates a unique index on the key column(s).",
      },
      {
        question: "What is a foreign key?",
        solution:
          "A FOREIGN KEY is a column (or columns) that references the PRIMARY KEY of another table. It enforces referential integrity by ensuring values in the child table always match values in the parent table.",
      },
      {
        question:
          "Explain the difference between the DELETE and TRUNCATE commands.",
        solution:
          "DELETE removes rows one-by-one and can include a WHERE clause; it fires triggers and can be rolled back. TRUNCATE is a DDL operation that de-allocates all data pages instantly; it cannot include a WHERE clause, does not fire triggers, and usually cannot be rolled back.",
      },
      {
        question: "What is a JOIN in SQL, and what are its types?",
        solution:
          "A JOIN combines rows from two or more tables based on a related column.\nTypes: INNER, LEFT (OUTER), RIGHT (OUTER), FULL (OUTER), CROSS, and SELF joins.",
      },
      {
        question: "How do you optimize SQL queries?",
        solution:
          "Use selective WHERE clauses, proper indexes, avoid SELECT *, limit the result set with LIMIT/TOP, rewrite sub-queries as joins when possible, analyze execution plans, and keep statistics updated.",
      },
      {
        question: "What is the difference between UNION and UNION ALL?",
        solution:
          "UNION combines result sets and removes duplicate rows. UNION ALL concatenates result sets including duplicates; it is faster because it skips duplicate elimination.",
      },
      {
        question: "What are correlated subqueries?",
        solution:
          "A correlated subquery references columns from the outer query and is executed once for every candidate row in the outer query, making it potentially slower than non-correlated subqueries.",
      },
      {
        question: "Explain ACID properties in SQL.",
        solution:
          "Atomicity – all or none of a transaction completes. Consistency – the database remains in a valid state after the transaction. Isolation – concurrent transactions do not interfere. Durability – committed changes persist even after crashes.",
      },
      {
        question: "How do you find the second highest salary in a table?",
        solution:
          "SELECT MAX(salary) AS SecondHighest FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);",
      },
      {
        question: "What is the difference between CHAR and VARCHAR data types?",
        solution:
          "CHAR has a fixed length (padded with spaces) and is faster for small, consistent strings. VARCHAR has a variable length, uses only the space needed plus a length prefix, and is more space-efficient but slightly slower.",
      },
      {
        question: "How do you use the GROUP BY clause?",
        solution:
          "GROUP BY groups rows sharing the same values in specified columns so that aggregate functions (COUNT, SUM, AVG, MAX, MIN) can be applied to each group.",
      },
      {
        question: "What is the difference between INNER JOIN and OUTER JOIN?",
        solution:
          "INNER JOIN returns only matching rows from both tables. OUTER JOIN returns matching rows plus non-matching rows from one or both tables, filling NULLs where no match exists.",
      },
      {
        question: "How do you use the HAVING clause?",
        solution:
          "HAVING filters groups after aggregation is performed. It is used with GROUP BY to include only groups that meet a specified condition.",
      },
      {
        question: "What is a view in SQL?",
        solution:
          "A VIEW is a virtual table based on the result set of a SQL statement. It simplifies complex queries, restricts access to underlying tables, and can sometimes be updated if it meets certain criteria.",
      },
      {
        question: "How do you use the DISTINCT keyword?",
        solution:
          "SELECT DISTINCT column_name FROM table_name; returns unique values for the specified column(s), removing duplicates from the result set.",
      },
      {
        question: "What is a transaction in SQL?",
        solution:
          "A transaction is a single logical unit of work that must either complete entirely or not at all. It is controlled with BEGIN, COMMIT, and ROLLBACK statements.",
      },
      {
        question: "How do you use the LIKE operator?",
        solution:
          "LIKE is used in a WHERE clause for pattern matching with wildcards: % (any sequence of characters), _ (single character). Example: WHERE name LIKE 'A%';",
      },
      {
        question: "What is a subquery?",
        solution:
          "A subquery (inner query) is a query nested inside another SQL statement (outer query) and can return a scalar, single column, or full result set to be used by the outer query.",
      },
      {
        question: "What does SELECT 1 do in SQL?",
        solution:
          "The SQL statement **SELECT 1** returns a single column with a value of **1** for each row that satisfies the `WHERE` clause. It is primarily used for existence checks, particularly in subqueries with the `EXISTS` operator. Its main benefit is **performance**. By selecting a constant value (1), the database engine does not need to retrieve and transfer actual data from the disk. It simply needs to find a single matching row to confirm that the condition is met. This makes it significantly more efficient than using `SELECT *` or `SELECT column_name` for the same purpose, as those queries would involve a full data scan and retrieval.",
      },
      {
        question: "How do you list all tables in PostgreSQL?",
        solution:
          "There are two primary methods to list all tables in **PostgreSQL**:\n\n1.  **psql command-line tool:** Use the meta-command `\\dt`. This is the quickest way to get a formatted list of tables, views, and sequences in the current database schema.\n\n2.  **SQL query:** You can query the **`information_schema.tables`** view, which is part of the SQL standard. This approach is useful for programmatic access or when you need more detailed information. The query is: `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE';`.\n\n`table_schema = 'public'` filters for tables in the default schema, while `table_type = 'BASE TABLE'` ensures that only actual tables (not views or system tables) are returned.",
      },
      {
        question: "How do you list all tables in MySQL?",
        solution:
          "Listing tables in **MySQL** can be done with a simple command or a standard query:\n\n1.  **SQL command:** The most common method is using `SHOW TABLES;`. This is a MySQL-specific command that quickly returns a list of all tables in the currently selected database.\n\n2.  **SQL query:** For a more general approach, you can query the **`information_schema`** database. The query to list tables in a specific database is: `SELECT table_name FROM information_schema.tables WHERE table_schema = 'your_database_name';`.",
      },
      {
        question: "How do you list all tables in SQL Server?",
        solution:
          "In **SQL Server**, you can list tables by querying system views:\n\n1.  **Using `information_schema`:** This is a standard method that is portable across different database systems: `SELECT table_name FROM information_schema.tables WHERE table_type = 'BASE TABLE';`.\n\n2.  **Using `sys.tables`:** This is the more common and powerful SQL Server-specific approach. The `sys.tables` catalog view contains detailed metadata about tables in the current database: `SELECT name FROM sys.tables;`.",
      },
      {
        question: "What is the default sort order of ORDER BY in SQL?",
        solution:
          "The default sort order of the **`ORDER BY`** clause is **ascending (`ASC`)**. When you sort a result set without specifying `ASC` or `DESC`, the database sorts the values from lowest to highest. For numbers, this means 1, 2, 3...; for dates, oldest to newest; and for text, alphabetically from A-Z.",
      },
      {
        question: "How do you concatenate first and last names in SQL?",
        solution:
          "Concatenating strings (joining them together) is done differently across database systems:\n\n1.  **Standard SQL, PostgreSQL, and MySQL:** Use the **`CONCAT()`** function. This function takes a variable number of arguments and joins them into a single string. Example: `SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM employees;`.\n\n2.  **SQL Server:** Use the `+` operator. Example: `SELECT first_name + ' ' + last_name AS full_name FROM employees;`.\n\n3.  **Oracle and PostgreSQL:** The `||` operator is also used. Example: `SELECT first_name || ' ' || last_name AS full_name FROM employees;`.",
      },
      {
        question: "How do you get today’s date in SQL?",
        solution:
          "Retrieving the current date is a basic function with varying names:\n\n* **Standard SQL:** `CURRENT_DATE` returns the current date without the time component.\n* **SQL Server:** `GETDATE()` returns the current date and time.\n* **MySQL:** `CURDATE()` returns just the date, while `NOW()` returns date and time.\n* **PostgreSQL:** `CURRENT_DATE` returns the date, while `NOW()` or `CURRENT_TIMESTAMP` return both date and time.",
      },
      {
        question: "How do you add 30 days to a date column in SQL?",
        solution:
          "Adding or subtracting days from a date column requires specific syntax for each database management system:\n\n* **PostgreSQL and MySQL:** Use the **`INTERVAL`** keyword. Example: `SELECT date_column + INTERVAL '30 days' FROM table_name;`.\n\n* **SQL Server:** Use the **`DATEADD()`** function, which takes the interval unit, the number of units, and the date column. Example: `SELECT DATEADD(day, 30, date_column) FROM table_name;`.\n\n* **Oracle:** You can simply add the integer to the date column. Example: `SELECT date_column + 30 FROM table_name;`.",
      },
      {
        question: "What is an alias and why is it used?",
        solution:
          "An **alias** is a temporary, alternative name given to a column or a table within a SQL query, using the `AS` keyword. Aliases are crucial for improving the **readability** and **simplicity** of queries. They are used to:\n\n* **Rename columns:** Give a more descriptive name to a column in the result set, which is useful for reports.\n* **Simplify joins:** Use short aliases for long table names to make join conditions easier to write and read.\n* **Handle self-joins:** When a table is joined with itself, aliases are required to distinguish between the two instances of the table.",
      },
      {
        question: "What is the difference between WHERE and HAVING?",
        solution:
          "The key difference between `WHERE` and `HAVING` lies in **when** they filter data in a query's execution order.  \n\n* **`WHERE` clause:** Filters individual rows **before** they are grouped by the `GROUP BY` clause. You cannot use aggregate functions (`SUM`, `COUNT`, `AVG`) within the `WHERE` clause.\n\n* **`HAVING` clause:** Filters groups of rows **after** they have been created by the `GROUP BY` clause. This is the correct place to use aggregate functions to filter results based on an aggregated value.\n\n**Analogy:** If you have a box of apples, `WHERE` is like picking out all the rotten apples **before** you put them into baskets (groups). `HAVING` is like looking at all the baskets and throwing away any that have fewer than 10 apples.",
      },
      {
        question: "How do you count the number of rows in a table?",
        solution:
          "You count rows using the **`COUNT()`** aggregate function.\n\n* **`COUNT(*)`:** This is the most efficient method to count all rows, including those with `NULL` values. The asterisk (`*`) instructs the database to count all rows without checking any specific column's value. \n\n* **`COUNT(column_name)`:** This counts only the rows where the specified `column_name` is **not NULL**. If a row has a `NULL` value in that column, it will not be included in the count.",
      },
      {
        question: "How do you retrieve the top 5 records in SQL Server?",
        solution:
          "In **SQL Server**, you use the **`TOP`** keyword in the `SELECT` statement to limit the number of rows. It's almost always used with an `ORDER BY` clause to define what constitutes the 'top' records.\n\nExample: `SELECT TOP 5 * FROM employees ORDER BY salary DESC;` (This returns the 5 employees with the highest salaries).",
      },
      {
        question: "How do you retrieve the top 5 records in MySQL/PostgreSQL?",
        solution:
          "In **MySQL** and **PostgreSQL**, you use the **`LIMIT`** clause at the end of the query to specify the maximum number of rows to return. As with `TOP`, it's best to use it with `ORDER BY`.\n\nExample: `SELECT * FROM employees ORDER BY salary DESC LIMIT 5;`.",
      },
      {
        question: "How do you remove duplicate rows from a result set?",
        solution:
          "To return a result set with only unique rows, you use the **`DISTINCT`** keyword immediately after `SELECT`. `DISTINCT` considers all columns in the `SELECT` list and returns only unique combinations of values.\n\nExample: `SELECT DISTINCT city, state FROM customers;` (This will return a unique list of city/state pairs. If multiple customers are from 'New York, NY', only one instance will appear).",
      },
      {
        question: "Can you use ORDER BY without SELECTing the column?",
        solution:
          "Yes, it is perfectly valid to use `ORDER BY` on a column that is not in the `SELECT` list. The `ORDER BY` clause operates on the entire result set, sorting the data based on the specified column's values before presenting the final output. This is useful when you need to order the results by a specific criteria but don't need to display that criteria in the final output.",
      },
      {
        question: "How do you sort by multiple columns?",
        solution:
          "To sort by multiple columns, you simply list them in the `ORDER BY` clause, separated by commas. The sorting is **hierarchical**. SQL first sorts by the first column, and then for any rows that have identical values in the first column, it uses the second column for sorting, and so on.\n\nExample: `SELECT first_name, last_name FROM employees ORDER BY last_name ASC, first_name DESC;` (This sorts employees alphabetically by last name, and for those with the same last name, it sorts their first names in reverse alphabetical order).",
      },
      {
        question: "How do you rename a column in a query result?",
        solution:
          "You rename a column in a query's output using a **column alias** with the **`AS`** keyword. This temporary name exists only for the duration of the query. It is a best practice to use aliases to make your query results more readable and understandable, especially when using functions or complex expressions.\n\nExample: `SELECT first_name AS first_name, last_name AS surname FROM employees;`.",
      },
      {
        question: "How do you comment a single line in SQL?",
        solution:
          "To add a single-line comment in SQL, you use two consecutive hyphens (`--`). Everything from the hyphens to the end of that line is ignored by the database engine. This is a standard and very common method for adding notes or disabling parts of a query temporarily.",
      },
      {
        question: "How do you comment multiple lines in SQL?",
        solution:
          "To add a multi-line comment, you use the `/* ... */` syntax. All text between the `/*` and `*/` markers is treated as a comment, allowing you to easily comment out large blocks of code or write detailed explanations.",
      },
      {
        question: "What is the result of SELECT * FROM table WHERE 1 = 0?",
        solution:
          "The result of `SELECT * FROM table WHERE 1 = 0;` is an **empty result set** (zero rows). The `WHERE` clause's condition, `1 = 0`, is a logical expression that is always false. Since no rows can ever satisfy this condition, the query will return nothing, but it will not produce an error because the syntax is valid.",
      },
      {
        question: "How do you check if a column value is NULL?",
        solution:
          "To check for a `NULL` value, you must use the `IS NULL` operator. You cannot use the equality operator (`=`) because `NULL` is not a value; it's a marker for missing or unknown data. A comparison like `column_name = NULL` will always return unknown, which is treated as false. \n\nExample: `SELECT * FROM employees WHERE hire_date IS NULL;`.",
      },
      {
        question: "How do you return all rows where a column is NOT NULL?",
        solution:
          "To find all rows where a column contains a value (is not `NULL`), you use the `IS NOT NULL` operator.\n\nExample: `SELECT * FROM employees WHERE hire_date IS NOT NULL;`.",
      },
      {
        question: "What happens if you omit the WHERE clause in an UPDATE?",
        solution:
          "If you omit the `WHERE` clause in an `UPDATE` statement, the database will update the specified column(s) for **every single row** in the table. This is an extremely dangerous and destructive operation, and it's a common mistake that can lead to data loss or corruption. Always use a `WHERE` clause to target specific rows.",
      },
      {
        question: "What happens if you omit the WHERE clause in a DELETE?",
        solution:
          "If you omit the `WHERE` clause in a `DELETE` statement, the query will **delete every single row** from the table, effectively emptying it. This is a permanent and irreversible action. A safer alternative to deleting all rows is often using `TRUNCATE TABLE`, which is faster as it deallocates the data pages but does not log individual row deletions. However, `TRUNCATE` is also irreversible.",
      },
      {
        question: "How do you calculate the sum of a numeric column?",
        solution:
          "To calculate the sum of values in a numeric column, you use the **`SUM()`** aggregate function. This function returns the total sum of all values in a specified column for the rows that match the query's criteria.\n\nExample: `SELECT SUM(salary) FROM employees;`.",
      },
      {
        question: "How do you calculate the average of a numeric column?",
        solution:
          "To calculate the average (arithmetic mean) of values in a numeric column, you use the **`AVG()`** aggregate function. This function sums all the non-NULL values in the column and divides by the number of those values.\n\nExample: `SELECT AVG(total_price) FROM orders;`.",
      },
      {
        question: "How do you calculate the minimum and maximum of a column?",
        solution:
          "You use the aggregate functions **`MIN()`** and **`MAX()`** to find the minimum and maximum values in a column, respectively. These functions work on both numeric and character data types, returning the lowest or highest value in a specified column. For example, `SELECT MIN(price) AS min_price, MAX(price) AS max_price FROM products;` will return the lowest and highest product prices from the `products` table.",
      },
      {
        question: "How do you round a numeric value to two decimal places?",
        solution:
          "You use the **`ROUND()`** function to round a numeric value. It typically takes two arguments: the numeric value to be rounded and the number of decimal places to which it should be rounded. For example, `SELECT ROUND(price, 2) FROM products;` will round the values in the `price` column to two decimal places. In some database systems like MySQL, a single-argument `ROUND()` rounds to the nearest whole number.",
      },
      {
        question: "How do you convert a string to a date in SQL?",
        solution:
          "Converting a string to a date depends on the database system. Most systems provide a function for this purpose:\n\n* **SQL Server:** Use **`CONVERT()`** or **`CAST()`**. Example: `SELECT CONVERT(DATE, '2023-10-26');`\n* **PostgreSQL:** Use **`TO_DATE()`** or `CAST()`. Example: `SELECT TO_DATE('26 Oct 2023', 'DD Mon YYYY');` or `SELECT CAST('2023-10-26' AS DATE);`\n* **MySQL:** Use **`STR_TO_DATE()`**. Example: `SELECT STR_TO_DATE('October 26, 2023', '%M %d, %Y');`",
      },
      {
        question:
          "How do you convert a date to a string with format 'YYYY-MM-DD'?",
        solution:
          "Converting a date to a string with a specific format also varies by database:\n\n* **SQL Server:** Use **`FORMAT()`** or **`CONVERT()`**. Example: `SELECT FORMAT(GETDATE(), 'yyyy-MM-dd');` or `SELECT CONVERT(VARCHAR, GETDATE(), 120);` (Style code 120 is for 'YYYY-MM-DD HH:MI:SS', but SQL Server will handle the date part correctly).\n* **PostgreSQL:** Use **`TO_CHAR()`**. Example: `SELECT TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD');`\n* **MySQL:** Use **`DATE_FORMAT()`**. Example: `SELECT DATE_FORMAT(NOW(), '%Y-%m-%d');`",
      },
      {
        question: "What is the difference between IN and EXISTS?",
        solution:
          "Both `IN` and `EXISTS` are used in subqueries to check for the existence of data, but they differ in how they operate and their performance characteristics.\n\n* **`IN`:** The `IN` operator works by first executing the inner subquery, which returns a list of values. The outer query then checks if a value exists within that list. This can be inefficient for large lists because the database must load all the values from the subquery into memory.\n\n* **`EXISTS`:** The `EXISTS` operator works by executing the outer query first. For each row in the outer query, it checks if the inner subquery returns **any** rows. As soon as the subquery finds one matching row, it returns true and stops scanning. This is generally more efficient than `IN`, especially with large subquery result sets, because it doesn't need to load all data from the subquery into memory.",
      },
      {
        question: "How do you use BETWEEN in SQL?",
        solution:
          "The **`BETWEEN`** operator is used to select values within a specified range, inclusive of the start and end values. The syntax is `column_name BETWEEN value1 AND value2`. It is a shorthand for a combination of `>=` and `<=` operators. For example, `SELECT * FROM orders WHERE order_date BETWEEN '2023-01-01' AND '2023-01-31';` will return all orders placed in January 2023.",
      },
      {
        question: "How do you use IN with a list of values?",
        solution:
          "The **`IN`** operator is used to check if a value is present in a list of specified values. The list is provided in parentheses, separated by commas. It is a more concise way of writing multiple `OR` conditions. For example, `SELECT * FROM students WHERE major IN ('Computer Science', 'Physics', 'Mathematics');` will return students whose major is either 'Computer Science', 'Physics', or 'Mathematics'.",
      },
      {
        question: "How do you use LIKE to find names starting with 'A'?",
        solution:
          "You use the **`LIKE`** operator with the percent wildcard (`%`) at the end of the string. The query `SELECT * FROM employees WHERE first_name LIKE 'A%';` will return all employees whose first name begins with the letter 'A'. The `%` matches any sequence of zero or more characters.",
      },
      {
        question: "How do you use LIKE to find names ending with 'son'?",
        solution:
          "To find names ending with a specific string, you use the percent wildcard (`%`) at the beginning. The query `SELECT * FROM employees WHERE last_name LIKE '%son';` will return all employees whose last name ends with 'son'.",
      },
      {
        question: "How do you use LIKE to find names containing 'an'?",
        solution:
          "To find names that contain a specific substring, you place the percent wildcard (`%`) at both the beginning and the end of the substring. The query `SELECT * FROM employees WHERE first_name LIKE '%an%';` will return all employees whose first name contains 'an'.",
      },
      {
        question:
          "What is the wildcard character for a single character in LIKE?",
        solution:
          "The wildcard character for a single character in the `LIKE` operator is the **underscore (`_`)**. It matches exactly one character, regardless of what that character is. For example, `SELECT * FROM products WHERE product_code LIKE 'T_5';` would match 'T15', 'T25', 'T-5', etc., but not 'T105' or 'T5'.",
      },
      {
        question: "How do you escape a wildcard character in LIKE?",
        solution:
          "To search for a literal `%` or `_` character instead of using it as a wildcard, you need to use an `ESCAPE` clause. You define a character to act as the escape character, which is then placed before the wildcard. For example, `SELECT * FROM products WHERE sku LIKE '100\\%A' ESCAPE '\\';` will search for SKUs that literally contain `100%A`.",
      },
      {
        question: "How do you create an index on a column?",
        solution:
          "You create an index on a column using the **`CREATE INDEX`** statement. This command improves query performance by allowing the database to quickly locate data without having to scan the entire table. The syntax is `CREATE INDEX index_name ON table_name (column_name);`. For example, `CREATE INDEX idx_last_name ON employees (last_name);`.",
      },
      {
        question: "How do you drop an index?",
        solution:
          "You drop an index using the **`DROP INDEX`** statement. This command removes the index from the table. The syntax varies slightly by database system, but generally follows the format `DROP INDEX index_name ON table_name;` (SQL Server) or `DROP INDEX index_name;` (MySQL/PostgreSQL).",
      },
      {
        question: "What is a composite index?",
        solution:
          "A **composite index** (also known as a multicolumn index) is an index that is created on two or more columns of a table. It is used to improve the performance of queries that frequently filter or sort by a combination of those columns. The order of the columns in the index is important as it dictates how the data is sorted and accessed.",
      },
      {
        question: "How do you create a composite index?",
        solution:
          "You create a composite index using the `CREATE INDEX` statement, but you list multiple column names inside the parentheses, separated by commas. For example, `CREATE INDEX idx_name ON employees (last_name, first_name);` will create a composite index that is efficient for queries filtering on both `last_name` and `first_name`.",
      },
      {
        question: "How do you see the execution plan in SQL Server?",
        solution:
          "In SQL Server Management Studio (SSMS), you can see the execution plan by selecting your query and pressing **`Ctrl + L`** (for the Estimated Execution Plan) or by clicking the 'Display Estimated Execution Plan' button on the toolbar. For the Actual Execution Plan, you can select the query and press **`Ctrl + M`** or click the 'Include Actual Execution Plan' button before running the query. The plan is a visual representation of how the database engine will process your query.",
      },
      {
        question: "How do you see the execution plan in PostgreSQL?",
        solution:
          "In PostgreSQL, you can see the execution plan by using the **`EXPLAIN`** command before your query. \n\n* `EXPLAIN SELECT * FROM products WHERE price > 100;` will show the estimated plan without running the query.\n* `EXPLAIN ANALYZE SELECT * FROM products WHERE price > 100;` will run the query and show the actual execution plan, including timing and row counts.",
      },
      {
        question:
          "What is the difference between clustered and non-clustered indexes?",
        solution:
          "This is a key concept in database indexing:\n\n* **Clustered Index:** A clustered index determines the physical order of data storage in the table. A table can only have **one** clustered index because data can only be sorted in one way. The leaf nodes of a clustered index are the actual data rows. It's often created automatically on the primary key.\n\n* **Non-Clustered Index:** A non-clustered index does not change the physical order of the data. It is a separate structure that contains the indexed column values and a pointer (a row locator) to the actual data row. A table can have **multiple** non-clustered indexes.",
      },
      {
        question: "How do you add a new column to an existing table?",
        solution:
          "You add a new column to an existing table using the **`ALTER TABLE`** statement with the `ADD COLUMN` clause. For example, `ALTER TABLE employees ADD COLUMN start_date DATE;` will add a new column named `start_date` with a `DATE` data type to the `employees` table.",
      },
      {
        question: "How do you drop a column from a table?",
        solution:
          "You drop a column from an existing table using the **`ALTER TABLE`** statement with the `DROP COLUMN` clause. For example, `ALTER TABLE employees DROP COLUMN start_date;` will remove the `start_date` column from the `employees` table. This is a permanent and irreversible action.",
      },
      {
        question: "How do you change the data type of a column?",
        solution:
          "You change the data type of a column using the **`ALTER TABLE`** statement with a `MODIFY COLUMN` or `ALTER COLUMN` clause, depending on the database. For example, `ALTER TABLE employees ALTER COLUMN phone_number VARCHAR(15);` (SQL Server) or `ALTER TABLE employees MODIFY COLUMN phone_number VARCHAR(15);` (MySQL) or `ALTER TABLE employees ALTER COLUMN phone_number TYPE VARCHAR(15);` (PostgreSQL).",
      },
      {
        question: "How do you set a default value for a column?",
        solution:
          "You set a default value for a column using the **`DEFAULT`** keyword. This value will be automatically inserted into the column if a new row is created without a value specified for that column. You can set a default value when creating a new column or by altering an existing one. For example, `ALTER TABLE products ADD COLUMN status VARCHAR(20) DEFAULT 'in stock';`.",
      },
      {
        question: "How do you remove a default value from a column?",
        solution:
          "You remove a default value from a column using the **`ALTER TABLE`** statement. The specific syntax varies by database system. In **SQL Server** and **PostgreSQL**, you use `DROP CONSTRAINT` or `ALTER COLUMN DROP DEFAULT`. In **MySQL**, you use `ALTER COLUMN DROP DEFAULT`. The command to remove the default from the `status` column would look like `ALTER TABLE products ALTER COLUMN status DROP DEFAULT;`.",
      },
      {
        question: "How do you create a simple stored procedure?",
        solution:
          "You create a stored procedure using the **`CREATE PROCEDURE`** or **`CREATE OR REPLACE PROCEDURE`** statement, which defines a reusable block of SQL code. This code can be executed on demand. The structure typically includes a name, an optional list of parameters, and the SQL statements to be executed. For example, `CREATE PROCEDURE GetEmployees AS SELECT * FROM employees;` (SQL Server) or `CREATE PROCEDURE get_employees() LANGUAGE SQL AS $$ SELECT * FROM employees; $$;` (PostgreSQL).",
      },
      {
        question: "How do you execute a stored procedure?",
        solution:
          "You execute a stored procedure using the **`EXEC`** or **`CALL`** command. In **SQL Server**, you use `EXEC procedure_name;`. In **MySQL** and **PostgreSQL**, you use `CALL procedure_name();`. You can also pass parameters to the procedure in the command, such as `EXEC GetEmployeeById 123;`.",
      },
      {
        question: "How do you drop a stored procedure?",
        solution:
          "You drop a stored procedure using the **`DROP PROCEDURE`** statement. This command permanently removes the stored procedure from the database. The syntax is `DROP PROCEDURE procedure_name;`.",
      },
      {
        question: "How do you create a user-defined function?",
        solution:
          "You create a user-defined function (UDF) using the **`CREATE FUNCTION`** statement. Unlike a stored procedure, a UDF is designed to return a value and can be used in a `SELECT` statement. The syntax includes the function name, parameters, and the data type of the return value. For example, `CREATE FUNCTION GetTotalSales() RETURNS INT AS BEGIN RETURN (SELECT SUM(total) FROM orders); END;` (SQL Server).",
      },
      {
        question: "How do you call a user-defined function?",
        solution:
          "You call a user-defined function in a `SELECT` statement or other SQL expressions. The function name is followed by parentheses, which contain any required arguments. For example, `SELECT dbo.GetTotalSales();` (SQL Server) or `SELECT get_total_sales();` (PostgreSQL/MySQL).",
      },
      {
        question: "How do you create a simple trigger?",
        solution:
          "A trigger is a set of SQL statements that automatically execute when a specific event (like an `INSERT`, `UPDATE`, or `DELETE`) occurs on a table. You create one with the **`CREATE TRIGGER`** statement. The syntax specifies the trigger name, the event (`AFTER INSERT`, `BEFORE UPDATE`, etc.), the table it applies to, and the code to be executed. For example, `CREATE TRIGGER update_timestamp AFTER UPDATE ON products FOR EACH ROW UPDATE products SET last_modified = NOW() WHERE id = OLD.id;`.",
      },
      {
        question: "How do you disable a trigger?",
        solution:
          "To temporarily disable a trigger without dropping it, you use the **`ALTER TABLE`** or **`ALTER TRIGGER`** statement. In **SQL Server**, you would use `DISABLE TRIGGER trigger_name ON table_name;`. In **PostgreSQL**, it's `ALTER TABLE table_name DISABLE TRIGGER trigger_name;`.",
      },
      {
        question: "How do you enable a trigger?",
        solution:
          "To re-enable a disabled trigger, you use the **`ALTER TABLE`** or **`ALTER TRIGGER`** statement with the `ENABLE` clause. In **SQL Server**, it's `ENABLE TRIGGER trigger_name ON table_name;`. In **PostgreSQL**, it's `ALTER TABLE table_name ENABLE TRIGGER trigger_name;`.",
      },
      {
        question: "How do you drop a trigger?",
        solution:
          "You permanently remove a trigger from the database using the **`DROP TRIGGER`** statement. The syntax is `DROP TRIGGER trigger_name;`.",
      },
      {
        question: "What is the purpose of the LIMIT clause (MySQL/PostgreSQL)?",
        solution:
          "The **`LIMIT`** clause in **MySQL** and **PostgreSQL** is used to constrain the number of rows returned by a query. It's often used with `ORDER BY` to retrieve the 'top N' records, a specific number of records from a sorted list, or for pagination (e.g., `LIMIT 10 OFFSET 20` to get the third page of results).",
      },
      {
        question: "What is the purpose of the TOP clause (SQL Server)?",
        solution:
          "The **`TOP`** clause in **SQL Server** serves a similar purpose to `LIMIT`. It is used to return a specified number of rows from the top of the result set. It is almost always used with an `ORDER BY` clause to define the sort order of the 'top' rows. You can also specify a percentage of rows to return, such as `SELECT TOP 50 PERCENT * FROM products;`.",
      },
      {
        question: "How do you perform a bulk insert in SQL Server?",
        solution:
          "In **SQL Server**, you can perform a bulk insert from a file using the **`BULK INSERT`** statement. It's a high-performance method for loading data from a data file into a table. For example, `BULK INSERT employees FROM 'C:\\data\\employees.csv' WITH (FIELDTERMINATOR = ',', ROWTERMINATOR = '\\n');`.",
      },
      {
        question: "How do you perform a bulk insert in PostgreSQL?",
        solution:
          "In **PostgreSQL**, you use the **`COPY`** command to import data from a file directly into a table. It is one of the fastest ways to load data. The syntax is `COPY employees FROM 'C:\\data\\employees.csv' WITH (FORMAT CSV, HEADER);`.",
      },
      {
        question: "How do you perform a bulk insert in MySQL?",
        solution:
          "In **MySQL**, the **`LOAD DATA INFILE`** statement is used for bulk data loading. It is extremely fast for large datasets. The syntax is `LOAD DATA INFILE 'C:\\data\\employees.csv' INTO TABLE employees FIELDS TERMINATED BY ',' ENCLOSED BY '\"' LINES TERMINATED BY '\\n' IGNORE 1 ROWS;`.",
      },
      {
        question: "How do you export query results to CSV?",
        solution:
          "Exporting query results to a CSV file is typically done through a command-line utility or a GUI tool, as standard SQL doesn't have a direct `EXPORT TO CSV` command. For example, in **psql** (PostgreSQL), you would use `\\copy (SELECT * FROM products) TO 'C:\\exports\\products.csv' WITH CSV HEADER;`. In **MySQL**, you can use `SELECT ... INTO OUTFILE`. Most graphical tools like DBeaver or SSMS have a right-click menu option to export the results of a query.",
      },
      {
        question: "How do you import data from CSV into a table?",
        solution:
          "Similar to exporting, importing data from a CSV file is handled by database-specific commands designed for bulk loading, such as **`BULK INSERT`** (SQL Server), **`COPY`** (PostgreSQL), and **`LOAD DATA INFILE`** (MySQL). These commands are optimized for performance and handle the file parsing.",
      },
      {
        question: "How do you check the current database you are connected to?",
        solution:
          "To check the current database, you can execute a system-specific command or function. In **SQL Server**, you can use `SELECT DB_NAME();`. In **MySQL**, you can use `SELECT DATABASE();` or `SELECT CURRENT_SCHEMA();`. In **PostgreSQL**, you can use `SELECT current_database();`.",
      },
      {
        question: "How do you list all databases on the server?",
        solution:
          "You can list all databases using a command or query. In **SQL Server**, you use `SELECT name FROM sys.databases;`. In **MySQL**, you use `SHOW DATABASES;`. In **PostgreSQL**, you use the meta-command `\\l` in psql or the query `SELECT datname FROM pg_database;`.",
      },
      {
        question: "How do you switch databases in SQL?",
        solution:
          "You switch the active database using the `USE` or `\\c` command. In **SQL Server** and **MySQL**, you use `USE database_name;`. In **PostgreSQL**, you use the psql meta-command `\\c database_name;`.",
      },
      {
        question: "How do you create a new database?",
        solution:
          "You create a new database using the **`CREATE DATABASE`** statement. For example, `CREATE DATABASE new_database_name;`.",
      },
      {
        question: "How do you drop a database?",
        solution:
          "You permanently delete a database using the **`DROP DATABASE`** statement. This command deletes the database and all objects and data within it. It's a highly destructive and irreversible action. For example, `DROP DATABASE old_database_name;`.",
      },
      {
        question: "How do you back up a database in SQL Server?",
        solution:
          "In **SQL Server**, you can back up a database using the **`BACKUP DATABASE`** command. This command creates a backup file. For example, `BACKUP DATABASE MyDatabase TO DISK = 'C:\\backups\\MyDatabase.bak';`.",
      },
      {
        question: "How do you restore a database in SQL Server?",
        solution:
          "To restore a database in **SQL Server**, you use the **`RESTORE DATABASE`** command. The database must be in single-user mode to prevent other connections. For example, `RESTORE DATABASE MyDatabase FROM DISK = 'C:\\backups\\MyDatabase.bak' WITH REPLACE;`.",
      },
      {
        question: "How do you back up a database in PostgreSQL?",
        solution:
          "You back up a PostgreSQL database using the command-line utility `pg_dump`. This command creates a script file containing SQL commands that can be used to recreate the database. 🐘\n\n## Key Concepts\n- **`pg_dump`**: A utility for backing up a single PostgreSQL database. It creates a consistent snapshot, meaning the backup reflects the database's state at the moment `pg_dump` was started.\n- **Formats**: You can create backups in plain text (`.sql`) or compressed archive formats (`-Fc` for custom format, which is recommended for flexibility).\n\n## Detailed Steps & Commands\n\n1.  **Open your terminal or command prompt.**\n\n2.  **Basic Backup (Plain SQL format):**\n    This command dumps the database named `mydatabase` into a file called `mydatabase.sql`.\n    ```sql\n    pg_dump -U myuser -h localhost mydatabase > mydatabase.sql\n    ```\n    - `-U myuser`: Specifies the PostgreSQL username.\n    - `-h localhost`: Specifies the database server host. You can omit this if connecting locally.\n    - `mydatabase`: The name of the database you want to back up.\n    - `> mydatabase.sql`: Redirects the output to a file.\n\n3.  **Recommended Backup (Custom-compressed format):**\n    This format is compressed, more flexible for restoring specific objects, and generally preferred.\n    ```sql\n    pg_dump -U myuser -h localhost -Fc mydatabase > mydatabase.dump\n    ```\n    - `-Fc`: Specifies the custom archive file format.\n\n4.  **Backing up all databases:**\n    Use the `pg_dumpall` utility to back up all databases, along with global objects like roles and tablespaces.\n    ```sql\n    pg_dumpall -U postgres > all_databases.sql\n    ```",
      },
      {
        question: "How do you restore a database in PostgreSQL?",
        solution:
          "You restore a PostgreSQL database using either `psql` (for plain SQL files) or `pg_restore` (for compressed archive formats created by `pg_dump`).\n\n## Key Concepts\n- **`psql`**: The standard interactive terminal for PostgreSQL. It can execute SQL commands from a file.\n- **`pg_restore`**: A utility to restore a PostgreSQL database from an archive created by `pg_dump` in a non-plain-text format (like custom, directory, or tar).\n\n## Detailed Steps & Commands\n\n**Scenario 1: Restoring from a plain SQL file (`.sql`)**\n\n1.  **Create a new, empty database** in PostgreSQL where you'll restore the data.\n    ```sql\n    -- Connect to postgres and run:\n    CREATE DATABASE mydatabase_restored;\n    ```\n\n2.  **Use `psql` to execute the backup file.**\n    ```sql\n    psql -U myuser -d mydatabase_restored < mydatabase.sql\n    ```\n    - `-d mydatabase_restored`: Specifies the target database to restore into.\n    - `< mydatabase.sql`: Feeds the SQL file into the `psql` command.\n\n--- \n\n**Scenario 2: Restoring from a custom-format archive (`.dump`)**\nThis is the more robust method.\n\n1.  **Create a new, empty database** as in the previous scenario.\n    ```sql\n    CREATE DATABASE mydatabase_restored;\n    ```\n\n2.  **Use `pg_restore` to load the archive.**\n    ```sql\n    pg_restore -U myuser -d mydatabase_restored mydatabase.dump\n    ```\n    - `-d mydatabase_restored`: The target database.\n    - `mydatabase.dump`: The archive file you want to restore.",
      },
      {
        question: "How do you back up a database in MySQL?",
        solution:
          "You back up a MySQL database using the `mysqldump` command-line utility. It generates a `.sql` file containing the necessary `CREATE TABLE` and `INSERT INTO` statements to rebuild the database. 🐬\n\n## Key Concepts\n- **`mysqldump`**: A client utility that performs logical backups, producing a set of SQL statements that can be executed to reproduce the original database object definitions and table data.\n\n## Detailed Steps & Commands\n\n1.  **Open your terminal or command prompt.**\n\n2.  **Back up a single database:**\n    This command backs up the `mydatabase` schema into a file named `backup.sql`.\n    ```sql\n    mysqldump -u myuser -p mydatabase > backup.sql\n    ```\n    - `-u myuser`: Specifies the MySQL username.\n    - `-p`: Prompts you to enter the password securely.\n    - `mydatabase`: The name of the database to back up.\n    - `> backup.sql`: Redirects the output to the specified file.\n\n3.  **Back up multiple specific databases:**\n    ```sql\n    mysqldump -u myuser -p --databases db1 db2 > multiple_db_backup.sql\n    ```\n\n4.  **Back up all databases on the server:**\n    Use the `--all-databases` flag.\n    ```sql\n    mysqldump -u root -p --all-databases > all_databases_backup.sql\n    ```",
      },
      {
        question: "How do you restore a database in MySQL?",
        solution:
          "You restore a MySQL database by executing the `.sql` backup file using the `mysql` command-line client.\n\n## Key Concepts\n- **`mysql` client**: The standard command-line tool for interacting with a MySQL server. It can execute scripts fed to it via standard input.\n\n## Detailed Steps & Commands\n\n1.  **Create an empty database (if it doesn't exist):**\n    Log in to MySQL and create the database that will receive the restored data.\n    ```sql\n    -- Login to mysql\n    mysql -u root -p\n\n    -- Create the database\n    CREATE DATABASE mydatabase_restored;\n    EXIT;\n    ```\n\n2.  **Restore the backup file using the `mysql` client.**\n    This command connects to the `mydatabase_restored` and executes the commands from `backup.sql`.\n    ```sql\n    mysql -u myuser -p mydatabase_restored < backup.sql\n    ```\n    - `mydatabase_restored`: The target database for the restore operation.\n    - `< backup.sql`: Redirects the content of the `.sql` file as input to the `mysql` client.\n\n3.  **Alternative: Restore from within the MySQL client:**\n    You can also use the `SOURCE` command after logging into the MySQL client.\n    ```sql\n    -- Login to mysql\n    mysql -u myuser -p\n\n    -- Select the target database\n    USE mydatabase_restored;\n\n    -- Run the source command\n    SOURCE /path/to/your/backup.sql;\n    ```",
      },
      {
        question: "How do you create a new user in SQL Server?",
        solution:
          "Creating a user in SQL Server is a two-step process: first, you create a **Login** at the server level, and then you create a **User** in a specific database and map it to that login.\n\n## Key Concepts\n- **Login**: An identity that can connect to the SQL Server instance (server-level). It authenticates you.\n- **User**: An identity that has permissions within a specific database (database-level). It authorizes you.\n\n## Detailed Steps & Commands\n\n1.  **Create a Server-Level Login:**\n    This login allows the user to connect to the SQL Server instance.\n    ```sql\n    -- Use the master database to create server-level objects\n    USE master;\n    GO\n\n    -- Create a login with a password\n    CREATE LOGIN new_user_login\n    WITH PASSWORD = 'a_very_strong_password';\n    GO\n    ```\n\n2.  **Create a Database-Level User and Map to the Login:**\n    Now, go into the specific database where the user needs access and create a user mapped to the login from Step 1.\n    ```sql\n    -- Switch to the target database\n    USE YourDatabaseName;\n    GO\n\n    -- Create a user in this database for the login created above\n    CREATE USER new_user_name FOR LOGIN new_user_login;\n    GO\n    ```\n    Now, `new_user_name` can access `YourDatabaseName` after authenticating as `new_user_login`.",
      },
      {
        question: "How do you grant SELECT permission to a user?",
        solution:
          "You grant permissions using the `GRANT` statement. To give a user the ability to read data from a table, you grant them `SELECT` permission.\n\n## Syntax\n```sql\nGRANT permission_type ON object_name TO user_or_role;\n```\n\n## Detailed Steps & Commands\n\n1.  **Ensure you are in the correct database context.**\n    ```sql\n    USE YourDatabaseName;\n    GO\n    ```\n\n2.  **Grant `SELECT` on a specific table:**\n    This allows `new_user_name` to run `SELECT` queries only on the `Employees` table.\n    ```sql\n    GRANT SELECT ON dbo.Employees TO new_user_name;\n    GO\n    ```\n\n3.  **Grant `SELECT` on all tables in a schema (e.g., `dbo`):**\n    ```sql\n    GRANT SELECT ON SCHEMA::dbo TO new_user_name;\n    GO\n    ```",
      },
      {
        question: "How do you revoke permissions from a user?",
        solution:
          "You revoke permissions using the `REVOKE` statement. This is the opposite of `GRANT` and is used to remove access rights.\n\n## Syntax\n```sql\nREVOKE permission_type ON object_name FROM user_or_role;\n```\n\n## Detailed Steps & Commands\n\n1.  **Ensure you are in the correct database context.**\n    ```sql\n    USE YourDatabaseName;\n    GO\n    ```\n\n2.  **Revoke `SELECT` on a specific table:**\n    This removes the previously granted `SELECT` permission on the `Employees` table from `new_user_name`.\n    ```sql\n    REVOKE SELECT ON dbo.Employees FROM new_user_name;\n    GO\n    ```",
      },
      {
        question:
          "How do you create a table with an auto-increment primary key in MySQL?",
        solution:
          "In MySQL, you create an auto-incrementing primary key by using the `AUTO_INCREMENT` attribute on an integer-based primary key column.\n\n## Detailed Syntax\nWhen you insert a new row without specifying a value for this column (or by specifying `NULL` or `0`), MySQL automatically generates the next sequential integer.\n```sql\nCREATE TABLE Products (\n    product_id INT AUTO_INCREMENT PRIMARY KEY,\n    product_name VARCHAR(255) NOT NULL,\n    price DECIMAL(10, 2)\n);\n```\n- **`INT`**: The column must be an integer type (e.g., `INT`, `BIGINT`).\n- **`AUTO_INCREMENT`**: This keyword tells MySQL to automatically generate a value for this column on new inserts.\n- **`PRIMARY KEY`**: An `AUTO_INCREMENT` column must be indexed, and it's almost always the primary key.",
      },
      {
        question:
          "How do you create a table with an auto-increment primary key in PostgreSQL?",
        solution:
          "In PostgreSQL, there are two common ways to create an auto-incrementing primary key: the traditional `SERIAL` pseudo-type and the modern, SQL-standard `IDENTITY` column.\n\n## Method 1: Using `SERIAL` (Traditional)\n`SERIAL` is a shorthand that automatically creates a sequence object and sets the column's default value to the next value from that sequence.\n```sql\nCREATE TABLE Products (\n    product_id SERIAL PRIMARY KEY,\n    product_name VARCHAR(255) NOT NULL,\n    price DECIMAL(10, 2)\n);\n```\n- **`SERIAL`** is an alias for `INT`. There is also `BIGSERIAL` for `BIGINT`.\n\n## Method 2: Using `IDENTITY` (Modern & Recommended)\nThis is the SQL-standard way and provides more control.\n```sql\nCREATE TABLE Products (\n    product_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    product_name VARCHAR(255) NOT NULL,\n    price DECIMAL(10, 2)\n);\n```\n- **`GENERATED ALWAYS AS IDENTITY`**: This enforces that the value is always generated. You cannot manually insert a value into this column. You can also use `GENERATED BY DEFAULT AS IDENTITY` if you want to allow manual overrides.",
      },
      {
        question:
          "How do you create a table with an identity column in SQL Server?",
        solution:
          "In SQL Server, you create an auto-incrementing column, known as an **identity column**, using the `IDENTITY` property.\n\n## Detailed Syntax\n```sql\nCREATE TABLE Products (\n    ProductID INT IDENTITY(1,1) PRIMARY KEY,\n    ProductName VARCHAR(255) NOT NULL,\n    Price DECIMAL(10, 2)\n);\n```\n- **`IDENTITY(seed, increment)`**: This property defines the column as an identity column.\n  - **`seed`**: The starting value for the first row inserted. `IDENTITY(1,1)` starts at 1.\n  - **`increment`**: The value to add to the previous identity value for each new row. `IDENTITY(1,1)` increments by 1.\n- The column must be of an integer data type (like `int`, `bigint`, `smallint`, `tinyint`).",
      },
      {
        question: "What is the difference between NOW() and CURRENT_TIMESTAMP?",
        solution:
          "In modern, mainstream SQL databases like **PostgreSQL** and **MySQL**, there is **no functional difference** between `NOW()` and `CURRENT_TIMESTAMP`. They are synonyms and both return the timestamp representing the start of the current transaction.\n\n## Key Points\n- **Synonyms**: For all practical purposes at a junior level, you can treat them as identical. `CURRENT_TIMESTAMP` is defined in the SQL standard, while `NOW()` is a common and traditional function name.\n- **Transaction Start Time**: It's important to remember that they return a stable timestamp for the duration of a transaction. If you run multiple statements inside a `BEGIN`/`COMMIT` block, `NOW()` will return the same value in all of them.\n\n## Example (in PostgreSQL or MySQL)\n```sql\nSELECT NOW(), CURRENT_TIMESTAMP;\n```\nThis query will return the exact same value in both columns. ✅",
      },
      {
        question: "How do you get yesterday’s date in SQL?",
        solution:
          "The method to get yesterday's date varies by SQL dialect because date/time functions are not perfectly standardized.\n\n## Examples by Database\n\n- **PostgreSQL:**\n  You can use `INTERVAL` arithmetic.\n  ```sql\n  SELECT CURRENT_DATE - INTERVAL '1 day';\n  ```\n\n- **MySQL:**\n  You can use `INTERVAL` or the `DATE_SUB()` function.\n  ```sql\n  SELECT CURDATE() - INTERVAL 1 DAY;\n  -- Or, more explicitly:\n  SELECT DATE_SUB(CURDATE(), INTERVAL 1 DAY);\n  ```\n\n- **SQL Server:**\n  Use the `DATEADD()` function.\n  ```sql\n  SELECT DATEADD(day, -1, GETDATE());\n  ```",
      },
      {
        question: "How do you get the first day of the current month?",
        solution:
          "This also depends on the specific SQL database you are using.\n\n## Examples by Database\n\n- **PostgreSQL:**\n  The `DATE_TRUNC()` function is perfect for this.\n  ```sql\n  SELECT DATE_TRUNC('month', CURRENT_DATE);\n  ```\n\n- **MySQL:**\n  You can construct the date by taking the year and month from the current date.\n  ```sql\n  SELECT DATE_FORMAT(CURDATE(), '%Y-%m-01');\n  ```\n\n- **SQL Server:**\n  You can use `DATEFROMPARTS` or a combination of `DATEADD` and `DATEDIFF`.\n  ```sql\n  -- Modern and clean approach\n  SELECT DATEFROMPARTS(YEAR(GETDATE()), MONTH(GETDATE()), 1);\n  ```",
      },
      {
        question: "How do you get the last day of the current month?",
        solution:
          "Finding the last day of the month is a common task with specific functions available in most databases.\n\n## Examples by Database\n\n- **PostgreSQL:**\n  A common trick is to find the first day of the *next* month and subtract one day.\n  ```sql\n  SELECT (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month' - INTERVAL '1 day')::date;\n  ```\n\n- **MySQL:**\n  MySQL has a convenient built-in function, `LAST_DAY()`.\n  ```sql\n  SELECT LAST_DAY(CURDATE());\n  ```\n\n- **SQL Server:**\n  SQL Server has a handy function called `EOMONTH()` (End Of Month).\n  ```sql\n  SELECT EOMONTH(GETDATE());\n  ```",
      },
      {
        question: "How do you extract the year from a date column?",
        solution:
          "You can extract the year from a date using the standard `EXTRACT` function or database-specific functions like `YEAR()`.\n\n## SQL Standard: `EXTRACT()`\nThis works in PostgreSQL, Oracle, and MySQL.\n```sql\nSELECT EXTRACT(YEAR FROM order_date) FROM orders;\n```\n\n## Database-Specific Functions\n\n- **MySQL and SQL Server:**\n  Both support the convenient `YEAR()` function.\n  ```sql\n  SELECT YEAR(order_date) FROM orders;\n  ```",
      },
      {
        question: "How do you extract the month from a date column?",
        solution:
          "Similar to extracting the year, you can use the standard `EXTRACT` function or specific functions like `MONTH()`.\n\n## SQL Standard: `EXTRACT()`\nThis works in PostgreSQL, Oracle, and MySQL.\n```sql\nSELECT EXTRACT(MONTH FROM order_date) FROM orders;\n```\n\n## Database-Specific Functions\n\n- **MySQL and SQL Server:**\n  Both support the `MONTH()` function.\n  ```sql\n  SELECT MONTH(order_date) FROM orders;\n  ```",
      },
      {
        question: "How do you extract the day of the week from a date?",
        solution:
          "Extracting the day of the week can be tricky because the numbering can differ (e.g., does the week start on Sunday or Monday?).\n\n## Examples by Database\n\n- **PostgreSQL:**\n  `EXTRACT(DOW ...)` gives a number where Sunday=0, Saturday=6.\n  `EXTRACT(ISODOW ...)` gives the ISO 8601 standard where Monday=1, Sunday=7.\n  ```sql\n  -- Sunday=0, Monday=1, ..., Saturday=6\n  SELECT EXTRACT(DOW FROM '2025-08-22'); -- Returns 5 (Friday)\n\n  -- Monday=1, ..., Sunday=7\n  SELECT EXTRACT(ISODOW FROM '2025-08-22'); -- Returns 5 (Friday)\n  ```\n\n- **MySQL:**\n  `DAYOFWEEK()` returns a number where Sunday=1, Saturday=7.\n  ```sql\n  SELECT DAYOFWEEK('2025-08-22'); -- Returns 6 (Friday)\n  ```\n\n- **SQL Server:**\n  `DATEPART(weekday, ...)` returns a number that depends on the server's `@@DATEFIRST` setting. If `@@DATEFIRST` is 7 (the US default), Sunday=1.\n  ```sql\n  -- Assuming @@DATEFIRST = 7 (default US)\n  SELECT DATEPART(weekday, '2025-08-22'); -- Returns 6 (Friday)\n  ```",
      },
      {
        question: "How do you format a date as DD-MON-YYYY in Oracle?",
        solution:
          "In Oracle, you use the `TO_CHAR()` function to convert a date into a formatted string.\n\n## Syntax & Example\n```sql\nTO_CHAR(date_value, 'format_model')\n```\nTo get the `DD-MON-YYYY` format (e.g., `22-AUG-2025`), you would use the following query:\n```sql\nSELECT TO_CHAR(SYSDATE, 'DD-MON-YYYY') FROM dual;\n```\n- **`SYSDATE`**: Oracle's function for the current date and time.\n- **`'DD-MON-YYYY'`**: The format model.\n  - `DD`: Day of the month (01-31).\n  - `MON`: Abbreviated, three-letter month name in uppercase (e.g., AUG).\n  - `YYYY`: Four-digit year.\n- **`dual`**: A special one-row, one-column table in Oracle used for queries where you don't need data from a real table.",
      },
      {
        question:
          "How do you calculate the difference in days between two dates?",
        solution:
          "Calculating the difference in days between two dates varies across different SQL databases.\n\n## Examples by Database\n\n- **PostgreSQL:**\n  You can directly subtract date values. The result is an integer representing the number of days.\n  ```sql\n  SELECT '2025-09-01'::date - '2025-08-22'::date;\n  -- Result: 10\n  ```\n\n- **MySQL:**\n  Use the `DATEDIFF()` function. Note the order of arguments: `DATEDIFF(later_date, earlier_date)`.\n  ```sql\n  SELECT DATEDIFF('2025-09-01', '2025-08-22');\n  -- Result: 10\n  ```\n\n- **SQL Server:**\n  Use the `DATEDIFF()` function. The first argument specifies the unit of time (`day`). The order is `DATEDIFF(unit, earlier_date, later_date)`.\n  ```sql\n  SELECT DATEDIFF(day, '2025-08-22', '2025-09-01');\n  -- Result: 10\n  ```",
      },
      {
        question: "How do you add 1 hour to a timestamp?",
        solution:
          "Adding an interval of time to a timestamp is a common operation, and the syntax differs slightly between database systems.\n\n## Examples by Database\n\n- **PostgreSQL:**\n  Use the `+` operator with an `INTERVAL`.\n  ```sql\n  SELECT NOW() + INTERVAL '1 hour';\n  ```\n\n- **MySQL:**\n  You can use the `+` operator with `INTERVAL` or the `DATE_ADD()` function.\n  ```sql\n  -- Using the + operator\n  SELECT NOW() + INTERVAL 1 HOUR;\n\n  -- Using the DATE_ADD function (more explicit)\n  SELECT DATE_ADD(NOW(), INTERVAL 1 HOUR);\n  ```\n\n- **SQL Server:**\n  Use the `DATEADD()` function, specifying `hour` as the time part to modify.\n  ```sql\n  SELECT DATEADD(hour, 1, GETDATE());\n  ```",
      },
      {
        question: "How do you subtract 30 minutes from a timestamp?",
        solution:
          "Subtracting an interval of time from a timestamp is a common operation, with syntax that varies slightly across different database systems. ⏱️\n\n## Examples by Database\n\n- **PostgreSQL:**\n  Use the `-` operator with an `INTERVAL`.\n  ```sql\n  SELECT NOW() - INTERVAL '30 minutes';\n  ```\n\n- **MySQL:**\n  You can use the `-` operator with `INTERVAL` or the `DATE_SUB()` function.\n  ```sql\n  -- Using the - operator\n  SELECT NOW() - INTERVAL 30 MINUTE;\n\n  -- Using the DATE_SUB function\n  SELECT DATE_SUB(NOW(), INTERVAL 30 MINUTE);\n  ```\n\n- **SQL Server:**\n  Use the `DATEADD()` function with a negative number.\n  ```sql\n  SELECT DATEADD(minute, -30, GETDATE());\n  ```",
      },
      {
        question: "How do you check if a table exists before creating it?",
        solution:
          "The best practice to avoid errors is to conditionally create a table only if it doesn't already exist. The modern and easiest way is to use the `IF NOT EXISTS` clause.\n\n## Examples by Database\n\n- **PostgreSQL & MySQL (Recommended):**\n  Both systems support the `IF NOT EXISTS` clause directly in the `CREATE TABLE` statement. This is the most concise method.\n  ```sql\n  CREATE TABLE IF NOT EXISTS employees (\n      id INT PRIMARY KEY,\n      name VARCHAR(100)\n  );\n  ```\n\n- **SQL Server:**\n  You need to check the system catalog views (like `sys.objects`) within an `IF` block.\n  ```sql\n  IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'dbo.employees') AND type in (N'U'))\n  BEGIN\n      CREATE TABLE dbo.employees (\n          id INT PRIMARY KEY,\n          name VARCHAR(100)\n      );\n  END\n  ```",
      },
      {
        question: "How do you check if a column exists before adding it?",
        solution:
          "Conditionally adding a column prevents errors when running scripts multiple times. The approach varies by database.\n\n## Examples by Database\n\n- **PostgreSQL (version 9.6+):**\n  PostgreSQL supports an `IF NOT EXISTS` clause for adding columns.\n  ```sql\n  ALTER TABLE employees\n  ADD COLUMN IF NOT EXISTS hire_date DATE;\n  ```\n\n- **SQL Server:**\n  You query the `sys.columns` system view before running the `ALTER TABLE` statement.\n  ```sql\n  IF NOT EXISTS (SELECT * FROM sys.columns WHERE Name = N'hire_date' AND Object_ID = Object_ID(N'dbo.employees'))\n  BEGIN\n      ALTER TABLE dbo.employees\n      ADD hire_date DATE;\n  END\n  ```\n\n- **MySQL:**\n  MySQL does not have a direct `IF NOT EXISTS` for `ADD COLUMN`. You must write a stored procedure or query `information_schema.columns` from an application layer to check first. A common simplified approach in a script is to query first:\n  ```sql\n  -- This is a conceptual example, usually done in a scripting language or stored procedure.\n  -- 1. Query to check if the column exists:\n  SELECT COUNT(*)\n  FROM information_schema.columns\n  WHERE table_schema = 'your_database' AND table_name = 'employees' AND column_name = 'hire_date';\n  \n  -- 2. If the count is 0, then run the ALTER statement:\n  ALTER TABLE employees ADD COLUMN hire_date DATE;\n  ```",
      },
      {
        question: "How do you list all constraints on a table in PostgreSQL?",
        solution:
          "You can list a table's constraints in PostgreSQL by querying the standard `information_schema` views, which provide a database-agnostic way to see metadata.\n\n## Query\nThis query retrieves the name and type of all constraints associated with a specific table.\n```sql\nSELECT\n    constraint_name,\n    constraint_type\nFROM\n    information_schema.table_constraints\nWHERE\n    table_name = 'your_table_name';\n```\n- **`constraint_type`** can be `PRIMARY KEY`, `FOREIGN KEY`, `UNIQUE`, or `CHECK`.",
      },
      {
        question: "How do you list all constraints on a table in SQL Server?",
        solution:
          "In SQL Server, the easiest way to list all constraints on a table is to use the `sp_helpconstraint` system stored procedure.\n\n## Command\nSimply execute the procedure with the table name as the argument.\n```sql\nEXEC sp_helpconstraint 'dbo.your_table_name';\n```\nThis command provides a detailed and readable list of all primary keys, foreign keys, defaults, check, and unique constraints on the specified table.",
      },
      {
        question: "How do you list all constraints on a table in MySQL?",
        solution:
          "Like PostgreSQL, MySQL allows you to query the `information_schema` to get metadata about table constraints.\n\n## Query\nThis query will list the names and types of all constraints on the `your_table_name` table within a specific database schema.\n```sql\nSELECT\n    constraint_name,\n    constraint_type\nFROM\n    information_schema.table_constraints\nWHERE\n    table_schema = 'your_database_name'\n    AND table_name = 'your_table_name';\n```\n- **`constraint_type`** will show values like `PRIMARY KEY`, `UNIQUE`, `FOREIGN KEY`, etc.",
      },
      {
        question: "How do you disable a foreign key constraint temporarily?",
        solution:
          "Disabling a foreign key is often necessary during large data imports to avoid validation checks on every row. The method is specific to each database.\n\n## Examples by Database\n\n- **MySQL:**\n  You can disable checks for the entire session. This is the most common approach.\n  ```sql\n  -- Disable for the current session\n  SET foreign_key_checks = 0;\n  \n  -- ... perform your bulk data operations ...\n  ```\n\n- **SQL Server:**\n  You can disable a specific constraint by name.\n  ```sql\n  -- Disable a specific constraint\n  ALTER TABLE dbo.Orders NOCHECK CONSTRAINT FK_Orders_Customers;\n  ```\n\n- **PostgreSQL:**\n  You can temporarily disable all triggers on a table (foreign keys are implemented via triggers).\n  ```sql\n  -- Disable all triggers (including FKs) for the table\n  ALTER TABLE public.orders DISABLE TRIGGER ALL;\n  ```",
      },
      {
        question: "How do you re-enable a foreign key constraint?",
        solution:
          "After your data operations are complete, you must re-enable the constraints to ensure data integrity.\n\n## Examples by Database\n\n- **MySQL:**\n  You simply set the session variable back to its default value.\n  ```sql\n  -- Re-enable for the current session\n  SET foreign_key_checks = 1;\n  ```\n\n- **SQL Server:**\n  You re-enable the specific constraint and tell the server to check all existing data against it.\n  ```sql\n  -- Re-enable the constraint and validate existing data\n  ALTER TABLE dbo.Orders CHECK CONSTRAINT FK_Orders_Customers;\n  ```\n\n- **PostgreSQL:**\n  You re-enable the triggers you previously disabled.\n  ```sql\n  -- Re-enable all triggers for the table\n  ALTER TABLE public.orders ENABLE TRIGGER ALL;\n  ```",
      },
      {
        question: "How do you create a unique constraint on a column?",
        solution:
          "A unique constraint ensures that all values in a column (or a set of columns) are distinct. You can add it when creating a table or to an existing table.\n\n## Method 1: During Table Creation\n```sql\nCREATE TABLE Users (\n    user_id INT PRIMARY KEY,\n    username VARCHAR(50) NOT NULL UNIQUE, -- Inline method\n    email VARCHAR(100) NOT NULL,\n    CONSTRAINT UQ_Users_Email UNIQUE (email) -- Constraint method\n);\n```\n\n## Method 2: On an Existing Table\nThis is useful when you need to enforce uniqueness on a table that already contains data.\n```sql\nALTER TABLE Users\nADD CONSTRAINT UQ_Users_Email UNIQUE (email);\n```\n- **`UQ_Users_Email`** is a custom, descriptive name for the constraint, which is good practice.",
      },
      {
        question: "How do you drop a unique constraint?",
        solution:
          "Dropping a unique constraint removes the rule that values in the column must be unique. You must know the name of the constraint to drop it.\n\n## Syntax\n\n- **PostgreSQL & SQL Server:**\n  ```sql\n  ALTER TABLE Users DROP CONSTRAINT UQ_Users_Email;\n  ```\n\n- **MySQL:**\n  In MySQL, a unique constraint is implemented as a unique index. You drop the index to remove the constraint.\n  ```sql\n  ALTER TABLE Users DROP INDEX UQ_Users_Email;\n  ```",
      },
      {
        question: "How do you create a check constraint?",
        solution:
          "A `CHECK` constraint is used to limit the value range that can be placed in a column. It enforces a specific condition on the data.\n\n## Method 1: During Table Creation\n```sql\nCREATE TABLE Products (\n    product_id INT PRIMARY KEY,\n    product_name VARCHAR(100),\n    price DECIMAL(10, 2) NOT NULL CHECK (price > 0),\n    stock_level INT NOT NULL,\n    CONSTRAINT CHK_Stock_Positive CHECK (stock_level >= 0)\n);\n```\n\n## Method 2: On an Existing Table\n```sql\nALTER TABLE Products\nADD CONSTRAINT CHK_Price_Positive CHECK (price > 0);\n```\n**Note:** While MySQL has parsed `CHECK` constraint syntax for years, it only began enforcing them in version 8.0.16.",
      },
      {
        question: "How do you drop a check constraint?",
        solution:
          "You can remove a `CHECK` constraint using the `ALTER TABLE...DROP CONSTRAINT` statement. You will need to know the name of the constraint.\n\n## Syntax (PostgreSQL, SQL Server, MySQL 8+)\n```sql\nALTER TABLE Products DROP CONSTRAINT CHK_Price_Positive;\n```",
      },
      {
        question: "How do you rename a table in SQL?",
        solution:
          "The syntax for renaming a table varies slightly across different SQL database systems.\n\n## Examples by Database\n\n- **PostgreSQL & MySQL:**\n  Both use a simple and intuitive `ALTER TABLE...RENAME TO` syntax.\n  ```sql\n  ALTER TABLE old_table_name RENAME TO new_table_name;\n  ```\n\n- **SQL Server:**\n  SQL Server uses the `sp_rename` system stored procedure.\n  ```sql\n  EXEC sp_rename 'dbo.old_table_name', 'new_table_name';\n  ```",
      },
      {
        question: "How do you copy data from one table to another?",
        solution:
          "You can copy data from one table to another using an `INSERT INTO ... SELECT` statement. This assumes the destination table (`table2`) already exists and its column structure is compatible with the data being selected from the source table (`table1`).\n\n## Syntax\n```sql\nINSERT INTO table2 (column1, column2, column3)\nSELECT columnA, columnB, columnC\nFROM table1\nWHERE condition;\n```\n\n## Example: Copying all data\nIf the columns are in the same order and are compatible, you can simplify it:\n```sql\n-- Assuming 'archived_employees' exists and has the same structure as 'employees'\nINSERT INTO archived_employees\nSELECT * FROM employees WHERE status = 'inactive';\n```",
      },
      {
        question: "How do you clone a table with data?",
        solution:
          "Cloning a table with its data means creating a new table with the exact same structure and content as an existing one. This is often used for creating quick backups or test tables.\n\n## Examples by Database\n\n- **MySQL:**\n  Use the `CREATE TABLE ... AS SELECT` syntax.\n  ```sql\n  CREATE TABLE new_employees AS SELECT * FROM employees;\n  ```\n\n- **PostgreSQL & SQL Server:**\n  Use the `SELECT ... INTO` syntax.\n  ```sql\n  SELECT * INTO new_employees FROM employees;\n  ```\n**Note:** These methods typically copy only the basic column definitions, data types, and the data itself. They usually **do not** copy constraints, indexes, or triggers. You would need to add those manually.",
      },
      {
        question: "How do you clone a table without data?",
        solution:
          "Cloning a table's structure without any of its data is useful for creating a new empty table with an identical schema.\n\n## Examples by Database\n\n- **MySQL:**\n  Use the `CREATE TABLE ... LIKE` command. This is very effective as it also copies indexes and constraints.\n  ```sql\n  CREATE TABLE new_employees LIKE employees;\n  ```\n\n- **PostgreSQL:**\n  Also uses a `LIKE` clause, which is very powerful.\n  ```sql\n  -- This creates an empty table with the same columns and data types.\n  CREATE TABLE new_employees (LIKE employees);\n\n  -- To also include constraints, indexes, etc., use INCLUDING ALL:\n  CREATE TABLE new_employees (LIKE employees INCLUDING ALL);\n  ```\n\n- **SQL Server:**\n  A common trick is to use `SELECT INTO` with a condition that is never true, like `WHERE 1 = 0`.\n  ```sql\n  SELECT * INTO new_employees FROM employees WHERE 1 = 0;\n  ```",
      },
      {
        question: "How do you swap the values of two columns in a table?",
        solution:
          "You can swap the values of two columns for every row in a table with a single, simple `UPDATE` statement. This works across all major SQL databases.\n\n## Syntax\n```sql\nUPDATE your_table\nSET column1 = column2, \n    column2 = column1;\n```\n\n## Example\nLet's say you have a `Users` table with `first_name` and `last_name` columns and you want to swap them.\n```sql\nUPDATE Users\nSET first_name = last_name,\n    last_name = first_name;\n```\nThe database handles the transaction correctly, so you don't need to worry about using a temporary variable. It reads the original values of all columns on the right side of the `SET` clause before assigning them to the columns on the left.",
      },
      {
        question: "How do you update multiple columns in a single statement?",
        solution:
          "You can update multiple columns in a single row or multiple rows by separating each column-value assignment with a comma in the `SET` clause of your `UPDATE` statement.\n\n## Syntax\n```sql\nUPDATE table_name\nSET \n    column1 = value1,\n    column2 = value2,\n    column3 = value3\nWHERE \n    condition;\n```\n\n## Example\nUpdate the email and department for an employee with a specific ID.\n```sql\nUPDATE Employees\nSET \n    email = 'jane.d.smith@example.com',\n    department = 'Sales',\n    last_updated = NOW()\nWHERE \n    employee_id = 101;\n```\nThis is more efficient than running separate `UPDATE` statements for each column.",
      },
      {
        question: "How do you delete duplicate rows keeping only one?",
        solution:
          "The most modern and reliable way to delete duplicate rows is by using a **Common Table Expression (CTE)** with the `ROW_NUMBER()` window function. This approach gives you precise control over which row to keep.\n\n## Method using CTE and `ROW_NUMBER()`\n\n1.  **Identify Duplicates**: Use `ROW_NUMBER()` to assign a unique, sequential integer to rows partitioned by the columns that define a duplicate. For example, if a duplicate is defined by having the same `email`, we partition by `email`.\n2.  **Select a Keeper**: Within each partition, you order the rows by some criteria (e.g., a timestamp or a primary key) to decide which one to keep. The first one (`rn = 1`) is the keeper.\n3.  **Delete the Rest**: Delete all rows where the row number is greater than 1.\n\n## Example\nImagine a `Customers` table where duplicate entries have the same `email`. We want to keep the one with the highest `customer_id` (the most recent entry).\n\n```sql\n-- This works in PostgreSQL, SQL Server, and modern MySQL\nWITH DuplicateCTE AS (\n    SELECT \n        customer_id,\n        ROW_NUMBER() OVER(\n            PARTITION BY email \n            ORDER BY customer_id DESC\n        ) as rn\n    FROM \n        Customers\n)\nDELETE FROM Customers\nWHERE customer_id IN (SELECT customer_id FROM DuplicateCTE WHERE rn > 1);\n```\n- **`PARTITION BY email`**: Groups rows with the same email together.\n- **`ORDER BY customer_id DESC`**: Within each group, orders them from newest to oldest.\n- **`rn > 1`**: Identifies all rows in each group except the first one (which we want to keep).",
      },
      {
        question: "How do you find the Nth highest salary without a subquery?",
        solution:
          "You can find the Nth highest salary without a traditional subquery by using `OFFSET` and `LIMIT` (or `FETCH`) clauses, which are designed for pagination.\n\n## Key Idea\n1.  **Order** all salaries in descending order (`DESC`).\n2.  **Skip** the first `N-1` salaries using `OFFSET`.\n3.  **Take** the very next one using `LIMIT 1`.\n\n## Examples by Database\nLet's find the **4th** highest salary (so N=4, and we need to offset by N-1=3).\n\n- **PostgreSQL & MySQL:**\n  ```sql\n  SELECT DISTINCT salary\n  FROM employees\n  ORDER BY salary DESC\n  LIMIT 1 OFFSET 3;\n  ```\n\n- **SQL Server:**\n  ```sql\n  SELECT DISTINCT salary\n  FROM employees\n  ORDER BY salary DESC\n  OFFSET 3 ROWS\n  FETCH NEXT 1 ROWS ONLY;\n  ```\nUsing `DISTINCT` is important to handle cases where multiple employees have the same salary.",
      },
      {
        question: "How do you find the Nth lowest salary without a subquery?",
        solution:
          "This is the same logic as finding the Nth highest salary, but you simply reverse the sort order to ascending (`ASC`).\n\n## Key Idea\n1.  **Order** all salaries in ascending order (`ASC`).\n2.  **Skip** the first `N-1` salaries using `OFFSET`.\n3.  **Take** the very next one using `LIMIT 1`.\n\n## Examples by Database\nLet's find the **3rd** lowest salary (so N=3, and we need to offset by N-1=2).\n\n- **PostgreSQL & MySQL:**\n  ```sql\n  SELECT DISTINCT salary\n  FROM employees\n  ORDER BY salary ASC\n  LIMIT 1 OFFSET 2;\n  ```\n\n- **SQL Server:**\n  ```sql\n  SELECT DISTINCT salary\n  FROM employees\n  ORDER BY salary ASC\n  OFFSET 2 ROWS\n  FETCH NEXT 1 ROWS ONLY;\n  ```",
      },
      {
        question: "How do you generate a running total in SQL?",
        solution:
          "The best way to generate a running total (or cumulative sum) is by using the `SUM()` window function. This is an elegant and efficient SQL-standard feature.\n\n## Syntax\n```sql\nSUM(column_to_sum) OVER (ORDER BY ordering_column)\n```\n- **`SUM(column)`**: The aggregate function.\n- **`OVER (...)`**: Defines it as a window function.\n- **`ORDER BY column`**: This is the crucial part for a running total. It tells the `SUM` to accumulate values in the specified order. The sum for a given row includes that row and all preceding rows.\n\n## Example\nImagine a `Sales` table. We want to see the daily sales and a running total of sales over time.\n```sql\nSELECT\n    sale_date,\n    daily_revenue,\n    SUM(daily_revenue) OVER (ORDER BY sale_date) AS running_total_revenue\nFROM\n    Sales\nORDER BY\n    sale_date;\n```\nThis query will produce a result where each row shows the `sale_date`, its `daily_revenue`, and a `running_total_revenue` that grows with each passing day. You can also add `PARTITION BY` inside the `OVER()` clause to restart the running total for different groups (e.g., `PARTITION BY product_id`).",
      },
      {
        question: "How do you calculate a cumulative sum by group?",
        solution:
          "To calculate a cumulative sum that resets for each group, you add the **`PARTITION BY`** clause to your window function. This is extremely useful for things like calculating a running total of sales for each individual product. 📈\n\n## Syntax & Explanation\n```sql\nSUM(column_to_sum) OVER (PARTITION BY grouping_column ORDER BY ordering_column)\n```\n- **`PARTITION BY grouping_column`**: This is the key part. It divides the rows into groups (partitions). The `SUM()` will be calculated independently for each group and will reset to zero when the group changes.\n- **`ORDER BY ordering_column`**: Within each group, this defines the order of accumulation, just like a regular running total.\n\n## Example\nLet's calculate the running total of sales for each `product_id` over time.\n```sql\nSELECT\n    sale_date,\n    product_id,\n    daily_revenue,\n    SUM(daily_revenue) OVER (PARTITION BY product_id ORDER BY sale_date) AS running_product_total\nFROM\n    Sales\nORDER BY\n    product_id,\n    sale_date;\n```\nIn the result, `running_product_total` will increase for product 1, then when `product_id` changes to 2, it will start over from that product's first `daily_revenue`.",
      },
      {
        question:
          "How do you create a row number starting at 1 for each group?",
        solution:
          "You can assign a sequential number to rows within a specific group using the **`ROW_NUMBER()`** window function combined with **`PARTITION BY`**. This is perfect for ranking items within categories.\n\n## Syntax & Explanation\n```sql\nROW_NUMBER() OVER (PARTITION BY grouping_column ORDER BY ordering_column)\n```\n- **`PARTITION BY grouping_column`**: Divides the data into groups. The row numbering will restart at 1 for each new group.\n- **`ORDER BY ordering_column`**: Determines the sequence of numbering *within* each group.\n\n## Example\nRank employees in each department based on their salary, from highest to lowest.\n```sql\nSELECT \n    employee_name, \n    department, \n    salary,\n    ROW_NUMBER() OVER(PARTITION BY department ORDER BY salary DESC) as salary_rank_in_dept\nFROM \n    employees;\n```\nThis will assign `salary_rank_in_dept` of 1 to the highest-paid employee in 'Sales', 2 to the second-highest in 'Sales', and so on. Then, it will restart the count at 1 for the highest-paid employee in the 'Engineering' department.",
      },
      {
        question:
          "How do you find the longest and shortest string lengths in a column?",
        solution:
          "You can find the maximum and minimum string lengths in a text column by combining the `MAX()` and `MIN()` aggregate functions with the appropriate string length function for your database.\n\n## Key Functions\n- **`LENGTH(column)`** or **`CHAR_LENGTH(column)`**: Standard SQL, used by PostgreSQL and MySQL.\n- **`LEN(column)`**: Used by SQL Server.\n\n## Example\nFind the lengths of the longest and shortest product names in a `Products` table.\n\n- **PostgreSQL / MySQL:**\n  ```sql\n  SELECT \n      MAX(LENGTH(product_name)) AS longest_name,\n      MIN(LENGTH(product_name)) AS shortest_name\n  FROM Products;\n  ```\n\n- **SQL Server:**\n  ```sql\n  SELECT \n      MAX(LEN(product_name)) AS longest_name,\n      MIN(LEN(product_name)) AS shortest_name\n  FROM Products;\n  ```\n**Note**: `LEN()` in SQL Server notoriously does not count trailing spaces, while `LENGTH()` in other databases usually does. `DATALENGTH()` in SQL Server can be used to get the length in bytes, including spaces.",
      },
      {
        question:
          "How do you remove leading and trailing spaces from a column?",
        solution:
          "The standard SQL function to remove both leading and trailing whitespace from a string is **`TRIM()`**. Most databases also provide `LTRIM()` to remove only leading spaces and `RTRIM()` to remove only trailing spaces.\n\n## Syntax\n```sql\nSELECT TRIM(column_name) FROM your_table;\n```\n\n## Example\nImagine a `users` table where the `email` column might have extra spaces from data entry errors.\n```sql\n-- This query selects the cleaned email addresses\nSELECT TRIM(email) as cleaned_email FROM users;\n\n-- This statement updates the table to fix the data permanently\nUPDATE users SET email = TRIM(email);\n```",
      },
      {
        question:
          "How do you replace NULL with a default value in the result set?",
        solution:
          "The standard and most portable way to replace `NULL` values with a default value in a query result is by using the **`COALESCE()`** function. It returns the first non-NULL value from its list of arguments.\n\n## Syntax\n```sql\nCOALESCE(column_name, default_value)\n```\n\n## Example\nSuppose a `products` table has a `description` column that can be `NULL`. If it's `NULL`, we want to display 'No description available' instead.\n```sql\nSELECT \n    product_name,\n    COALESCE(description, 'No description available') AS product_description\nFROM \n    products;\n```\nIf the `description` for a product is 'Great product!', the query returns 'Great product!'. If it's `NULL`, the query returns 'No description available'.",
      },
      {
        question: "How do you use COALESCE vs ISNULL vs NVL?",
        solution:
          "These three functions all replace `NULL` values, but they differ in their standardization, number of arguments, and behavior.\n\n### `COALESCE(arg1, arg2, ...)`\n- **Standardization**: ANSI SQL standard. ✅ It's the **most portable** and generally recommended function.\n- **Arguments**: Takes **two or more** arguments.\n- **Behavior**: Returns the first non-NULL argument in the list.\n- **Example**: `COALESCE(phone_number, mobile_number, office_number, 'N/A')`\n\n--- \n\n### `ISNULL(check_expression, replacement_value)`\n- **Standardization**: **SQL Server specific**. ❌ Not portable.\n- **Arguments**: Takes only **two** arguments.\n- **Behavior**: Returns `replacement_value` if `check_expression` is `NULL`.\n- **Example**: `ISNULL(phone_number, 'N/A')`\n\n--- \n\n### `NVL(expr1, expr2)`\n- **Standardization**: **Oracle specific**. ❌ Not portable.\n- **Arguments**: Takes only **two** arguments.\n- **Behavior**: Functionally identical to `ISNULL`. Returns `expr2` if `expr1` is `NULL`.\n- **Example**: `NVL(phone_number, 'N/A')`\n\n**Conclusion**: Always prefer **`COALESCE`** for better portability and flexibility unless you are certain your code will only ever run on SQL Server or Oracle.",
      },
      {
        question: "How do you split a comma-separated string into rows?",
        solution:
          "Splitting a delimited string into multiple rows is a common data transformation task. Modern databases provide specific functions for this.\n\n## Examples by Database\n\n- **PostgreSQL:**\n  PostgreSQL offers a clean two-function approach: `string_to_array()` followed by `unnest()`.\n  ```sql\n  -- Given a string 'apple,banana,cherry'\n  SELECT unnest(string_to_array('apple,banana,cherry', ','));\n  ```\n\n- **SQL Server (2016+):**\n  SQL Server has the built-in `STRING_SPLIT` table-valued function.\n  ```sql\n  -- Given a string 'apple,banana,cherry'\n  SELECT value FROM STRING_SPLIT('apple,banana,cherry', ',');\n  ```\n\n- **MySQL:**\n  MySQL historically lacked a simple built-in function for this. In modern versions (8+), you can write a **recursive Common Table Expression (CTE)** to achieve this, but it's significantly more complex than the other systems. For junior developers, it's often better to handle this transformation in the application layer before the data enters the database.",
      },
      {
        question: "How do you reverse a string in SQL?",
        solution:
          "Most major database systems provide a simple and straightforward `REVERSE()` function.\n\n## Syntax & Example\nThis works in **PostgreSQL, MySQL, and SQL Server**.\n\n```sql\n-- Returns 'tac'\nSELECT REVERSE('cat');\n\n-- Example on a table column\nSELECT product_name, REVERSE(product_name) AS reversed_name\nFROM Products;\n```",
      },
      {
        question: "How do you convert uppercase to lowercase and vice-versa?",
        solution:
          "The standard SQL functions for changing character case are **`LOWER()`** for lowercase and **`UPPER()`** for uppercase. They are available in virtually all SQL databases.\n\n## Syntax & Examples\n\n- **Convert to Lowercase:**\n  ```sql\n  -- Returns 'hello world'\n  SELECT LOWER('HELLO World');\n  ```\n\n- **Convert to Uppercase:**\n  ```sql\n  -- Returns 'HELLO WORLD'\n  SELECT UPPER('Hello World');\n  ```\n\n- **Usage in a query:**\n  This is often used to standardize data for case-insensitive comparisons.\n  ```sql\n  -- Find a user regardless of the case they used to sign up\n  SELECT * \n  FROM Users \n  WHERE LOWER(username) = 'admin';\n  ```",
      },
      {
        question: "How do you extract the first word from a string?",
        solution:
          "Extracting the first word typically involves finding the position of the first space and taking the substring from the beginning up to that point.\n\n## Examples by Database\n\n- **PostgreSQL:**\n  Uses the convenient `split_part()` function.\n  ```sql\n  -- The '1' means take the first part\n  SELECT split_part('Hello World From Postgres', ' ', 1);\n  -- Returns: 'Hello'\n  ```\n\n- **SQL Server:**\n  Combines `SUBSTRING()` with `CHARINDEX()` to find the first space.\n  ```sql\n  -- Note the '- 1' to avoid including the space itself\n  SELECT SUBSTRING('Hello World', 1, CHARINDEX(' ', 'Hello World') - 1);\n  -- Returns: 'Hello'\n  ```\n\n- **MySQL:**\n  Similar to SQL Server, but uses `LOCATE()` instead of `CHARINDEX()`.\n  ```sql\n  SELECT SUBSTRING('Hello World', 1, LOCATE(' ', 'Hello World') - 1);\n  -- Returns: 'Hello'\n  ```",
      },
      {
        question: "How do you extract the last word from a string?",
        solution:
          "Extracting the last word is trickier than the first. A common and clever technique is to reverse the entire string, find the *first* word of the reversed string, and then reverse that result back.\n\n## Example using the Reverse Trick (All Databases)\nThis conceptual approach works in any database that has `REVERSE()` and a way to find the first word.\n\nLet's extract the last word from 'Find the last word'.\n\n1.  **Reverse the full string**: `REVERSE('Find the last word')` -> `'drow tsal eht dniF'`\n2.  **Find the position of the first space**: `CHARINDEX(' ', 'drow tsal eht dniF')` -> `5`\n3.  **Take the substring before that space**: `SUBSTRING('drow tsal eht dniF', 1, 4)` -> `'drow'`\n4.  **Reverse the result**: `REVERSE('drow')` -> `'word'`\n\n## SQL Server Implementation\n```sql\nDECLARE @s VARCHAR(100) = 'Find the last word';\nSELECT REVERSE(SUBSTRING(REVERSE(@s), 1, CHARINDEX(' ', REVERSE(@s)) - 1));\n```",
      },
      {
        question: "How do you count the number of words in a string?",
        solution:
          "A simple and clever trick to count words is to count the number of spaces and add one. This works assuming words are separated by a single space.\n\n## The Logic\n1.  Get the total length of the original string.\n2.  Create a new string with all spaces removed.\n3.  Get the length of the new string.\n4.  The difference in lengths is the number of spaces.\n5.  The number of words is `(number of spaces) + 1`.\n\n## Example (Works in Most Databases)\n```sql\n-- For 'SQL is a powerful language'\n-- Original Length: 26\n-- String with spaces removed ('SQLisapowerfullanguage'): Length 22\n-- Number of spaces: 26 - 22 = 4\n-- Number of words: 4 + 1 = 5\n\n-- Generic SQL (using LENGTH)\nSELECT \n    (LENGTH(my_column) - LENGTH(REPLACE(my_column, ' ', ''))) + 1 AS word_count\nFROM my_table;\n\n-- For SQL Server (using LEN)\nSELECT \n    (LEN(my_column) - LEN(REPLACE(my_column, ' ', ''))) + 1 AS word_count\nFROM my_table;\n```",
      },
      {
        question: "How do you count the number of occurrences of a substring?",
        solution:
          "You can count substring occurrences using a logic similar to counting words: calculate the difference in string length after removing all instances of the substring, and then divide by the length of the substring itself.\n\n## The Logic\n```\n(OriginalLength - LengthAfterRemovingSubstring) / LengthOfSubstring\n```\n\n## Example\nLet's count how many times 'is' appears in the string 'This is his mission.'\n\n- Original String: `'This is his mission.'` (Length: 20)\n- Substring: `'is'` (Length: 2)\n- String with 'is' removed: `'Th h h mson.'` (Length: 14)\n- Difference in length: `20 - 14 = 6`\n- Occurrences: `6 / 2 = 3`\n\n## SQL Implementation\n```sql\n-- Generic SQL (using LENGTH)\nSELECT \n    (LENGTH('This is his mission.') - LENGTH(REPLACE('This is his mission.', 'is', ''))) / LENGTH('is') AS occurrences;\n\n-- For SQL Server (using LEN)\nSELECT \n    (LEN('This is his mission.') - LEN(REPLACE('This is his mission.', 'is', ''))) / LEN('is') AS occurrences;\n```",
      },
      {
        question: "How do you pad a string with leading zeros?",
        solution:
          "Padding a string, often a number, with leading zeros to meet a fixed length is a common formatting task.\n\n## Examples by Database\n\n- **PostgreSQL / MySQL / Oracle:**\n  These databases provide the convenient `LPAD()` (Left Pad) function.\n  ```sql\n  -- LPAD(string, total_length, character_to_pad_with)\n  SELECT LPAD('42', 5, '0'); \n  -- Returns: '00042'\n\n  SELECT LPAD(CAST(id AS TEXT), 8, '0') FROM my_table;\n  ```\n\n- **SQL Server:**\n  SQL Server doesn't have a built-in `LPAD()`. A common method is to concatenate a string of zeros to the front and then take the rightmost characters.\n  ```sql\n  -- Pad the number 42 to a total length of 5\n  SELECT RIGHT('00000' + CAST(42 AS VARCHAR(5)), 5);\n  -- Returns: '00042'\n  ```",
      },
      {
        question:
          "How do you remove non-alphanumeric characters from a string?",
        solution:
          "Removing non-alphanumeric characters usually requires regular expressions, which are supported in modern versions of most databases.\n\n## Examples by Database\n\n- **PostgreSQL & MySQL (8.0+):**\n  Both use `REGEXP_REPLACE`.\n  ```sql\n  -- The regex '[^a-zA-Z0-9]' means 'any character that is NOT (^)\n  -- in the set of a-z, A-Z, or 0-9'.\n  SELECT REGEXP_REPLACE('AB-123-CD!@#$', '[^a-zA-Z0-9]', '');\n  -- Returns: 'AB123CD'\n  ```\n\n- **SQL Server:**\n  SQL Server does not have a built-in `REGEXP_REPLACE` function. The process is much more cumbersome, often requiring a custom function (CLR or T-SQL) or a long chain of nested `REPLACE` calls for each character you want to remove.\n  ```sql\n  -- Example: A highly inefficient way for just a few characters\n  SELECT \n      REPLACE(REPLACE(REPLACE('AB-123-CD!@#$', '-', ''), '!', ''), '@', '');\n  ```",
      },
      {
        question: "How do you generate a random number in SQL?",
        solution:
          "Most databases provide a function to generate a random floating-point number between 0 (inclusive) and 1 (exclusive).\n\n- **PostgreSQL:** `RANDOM()`\n- **MySQL:** `RAND()`\n- **SQL Server:** `RAND()`\n\n## Example\n```sql\n-- PostgreSQL\nSELECT RANDOM(); -- Returns a value like 0.8432156\n\n-- MySQL or SQL Server\nSELECT RAND(); -- Returns a value like 0.5487912\n```\n**Important Note for SQL Server**: When used in a `SELECT` statement on a table, `RAND()` will return the *same* random value for every single row. To get a different random number for each row, you can use `RAND(CHECKSUM(NEWID()))`.",
      },
      {
        question: "How do you generate a random integer between 1 and 100?",
        solution:
          "To generate a random integer within a specific range, you scale the result of the basic random function (which is between 0 and 1) and then use `FLOOR()` to convert it to an integer.\n\n## The Formula\n```\nFLOOR( random_function() * (max - min + 1) ) + min\n```\nFor a range of 1 to 100, `max=100` and `min=1`. The formula simplifies to `FLOOR(RAND() * 100) + 1`.\n\n## Examples by Database\n\n- **PostgreSQL:**\n  ```sql\n  SELECT floor(random() * 100 + 1)::int;\n  ```\n\n- **MySQL:**\n  ```sql\n  SELECT FLOOR(RAND() * 100) + 1;\n  ```\n\n- **SQL Server:**\n  ```sql\n  -- The RAND() function needs a seed to generate different values per row\n  SELECT FLOOR(RAND(CHECKSUM(NEWID())) * 100) + 1;\n  ```",
      },
      {
        question: "How do you shuffle rows randomly?",
        solution:
          "You can easily shuffle the entire result set of a query by using the `ORDER BY` clause with your database's random function.\n\n## Examples by Database\n\n- **PostgreSQL:**\n  ```sql\n  SELECT * FROM employees ORDER BY RANDOM();\n  ```\n\n- **MySQL:**\n  ```sql\n  SELECT * FROM employees ORDER BY RAND();\n  ```\n\n- **SQL Server:**\n  SQL Server's `RAND()` returns the same value for every row, so it can't be used for ordering. Instead, you must use `NEWID()`, which generates a unique identifier for each row.\n  ```sql\n  SELECT * FROM employees ORDER BY NEWID();\n  ```",
      },
      {
        question: "How do you sample 10 random rows from a table?",
        solution:
          "To get a random sample of rows, you combine the shuffling method (`ORDER BY RAND()`) with a way to limit the number of rows returned.\n\n## Examples by Database\n\n- **PostgreSQL & MySQL:**\n  Use `ORDER BY` with the random function and then `LIMIT` the result.\n  ```sql\n  -- PostgreSQL\n  SELECT * FROM employees ORDER BY RANDOM() LIMIT 10;\n\n  -- MySQL\n  SELECT * FROM employees ORDER BY RAND() LIMIT 10;\n  ```\n\n- **SQL Server:**\n  Use `ORDER BY NEWID()` and take the `TOP 10` rows.\n  ```sql\n  SELECT TOP 10 * FROM employees ORDER BY NEWID();\n  ```\n**Performance Note**: On very large tables, `ORDER BY RAND()` can be slow because it must generate a random number for every row and then sort them. For truly large-scale sampling, more advanced techniques are used.",
      },
      {
        question: "How do you create a simple numbers (tally) table?",
        solution:
          "A numbers or 'tally' table is a simple table containing a sequence of integers (1, 2, 3, ...). It's a surprisingly powerful tool for solving many complex SQL problems.\n\n## Examples by Database\n\n- **PostgreSQL:**\n  PostgreSQL has a dedicated function, `generate_series()`, which makes this trivial.\n  ```sql\n  -- Creates a result set with numbers from 1 to 1000\n  SELECT n FROM generate_series(1, 1000) AS n;\n  ```\n\n- **SQL Server & MySQL (Modern Versions):**\n  The standard way is to use a **recursive Common Table Expression (CTE)**.\n  ```sql\n  WITH RECURSIVE Tally (n) AS (\n      -- Anchor member: the starting point\n      SELECT 1\n      UNION ALL\n      -- Recursive member: adds to the previous result\n      SELECT n + 1 FROM Tally WHERE n < 1000\n  )\n  SELECT n FROM Tally;\n  ```\n  *Note: MySQL requires the `RECURSIVE` keyword, while SQL Server does not.*",
      },
      {
        question: "How do you create a calendar table for one year?",
        solution:
          "A calendar table is an extension of a numbers table, containing a row for every day in a given range. They are incredibly useful for time-based analysis. You can build one using a numbers generator and date functions.\n\n## Examples by Database\nLet's create a calendar for the year 2025.\n\n- **PostgreSQL:**\n  Combine `generate_series()` with date casting.\n  ```sql\n  SELECT CAST('2025-01-01' AS DATE) + (n - 1) * INTERVAL '1 day' AS calendar_date\n  FROM generate_series(1, 365) AS s(n);\n  ```\n\n- **SQL Server:**\n  Use a recursive CTE and the `DATEADD()` function.\n  ```sql\n  WITH CalendarCTE AS (\n      SELECT CAST('2025-01-01' AS DATE) AS calendar_date\n      UNION ALL\n      SELECT DATEADD(day, 1, calendar_date)\n      FROM CalendarCTE\n      WHERE calendar_date < '2025-12-31'\n  )\n  SELECT calendar_date FROM CalendarCTE OPTION (MAXRECURSION 366);\n  ```",
      },
      {
        question: "How do you fill gaps in a date series?",
        solution:
          "To find and fill gaps in your data (e.g., days with no sales), you can **`LEFT JOIN`** a complete calendar table to your data table.\n\n## The Logic\n1.  Start with a complete **calendar table** (the source of all possible dates).\n2.  `LEFT JOIN` your `sales` data to the calendar table `ON calendar_date = sale_date`.\n3.  When a date exists in the calendar but has no matching sale, the columns from the `sales` table will be **`NULL`**. These `NULL`s represent the gaps.\n4.  You can then use `COALESCE` to fill these gaps with a zero.\n\n## Example\n```sql\nSELECT\n    c.calendar_date,\n    COALESCE(s.daily_revenue, 0) AS revenue -- If revenue is NULL, use 0\nFROM\n    Calendar c\nLEFT JOIN\n    Sales s ON c.calendar_date = s.sale_date\nWHERE\n    c.calendar_date BETWEEN '2025-01-01' AND '2025-01-31'\nORDER BY\n    c.calendar_date;\n```",
      },
      {
        question: "How do you explode a date range into individual days?",
        solution:
          "To 'explode' a start and end date into a row for each day in that range, you can **`JOIN`** your data table with a calendar table.\n\n## The Logic\nJoin your table of date ranges to a calendar table where the calendar's date falls **`BETWEEN`** the `start_date` and `end_date`.\n\n## Example\nImagine a `Projects` table with `start_date` and `end_date` columns. We want a row for every single day each project was active.\n\n```sql\nSELECT\n    p.project_name,\n    c.calendar_date\nFROM\n    Projects p\nJOIN\n    Calendar c ON c.calendar_date BETWEEN p.start_date AND p.end_date\nORDER BY\n    p.project_name, c.calendar_date;\n```\nThis will generate one row for 'Project A' on 2025-01-01, another for 'Project A' on 2025-01-02, and so on, until its `end_date`.",
      },
      {
        question: "How do you calculate business days between two dates?",
        solution:
          "Calculating the number of business days (excluding weekends) is complex because it requires generating the series of dates and checking each one. A simplified approach that ignores public holidays is to join with a calendar table.\n\n## The Logic\n1.  Generate all the days between the start and end dates.\n2.  For each generated day, determine its day of the week.\n3.  Count only the rows that are not a Saturday or Sunday.\n\n## Example (Conceptual)\nThis example uses a calendar table that has a pre-calculated `day_of_week` column (e.g., where Monday=1, Sunday=7).\n\n```sql\nSELECT\n    COUNT(*)\nFROM\n    Calendar\nWHERE\n    calendar_date >= '2025-08-01' \n    AND calendar_date <= '2025-08-31'\n    AND day_of_week NOT IN (6, 7); -- Assuming 6=Saturday, 7=Sunday\n```\n**Note**: This is a simplified solution. A robust solution would also require a separate `Holidays` table to exclude those dates as well.",
      },
      {
        question: "How do you exclude weekends from a date diff?",
        solution:
          "Excluding weekends from a date difference calculation is the same problem as counting business days. The most reliable method is to generate the series of dates and count only the weekdays.\n\n## The Logic\nInstead of a simple `DATEDIFF(end, start)`, you count the number of rows from a calendar table that meet your criteria.\n\n## Example (SQL Server)\nLet's find the number of weekdays between two dates.\n```sql\nDECLARE @StartDate DATE = '2025-08-01';\nDECLARE @EndDate DATE = '2025-08-31';\n\n-- Uses a recursive CTE to generate the dates\nWITH DateSeries AS (\n    SELECT @StartDate AS MyDate\n    UNION ALL\n    SELECT DATEADD(day, 1, MyDate)\n    FROM DateSeries\n    WHERE MyDate < @EndDate\n)\nSELECT COUNT(*)\nFROM DateSeries\nWHERE DATEPART(weekday, MyDate) NOT IN (1, 7); -- Assuming Sunday=1, Saturday=7\n```",
      },
      {
        question: "How do you create an index on a computed column?",
        solution:
          "Indexing a computed column, also known as an **index on an expression**, allows the database to quickly access rows based on the result of a function or expression, rather than just the raw column value. This is great for case-insensitive searches.\n\n## Examples by Database\n\n- **PostgreSQL (Index on Expression):**\n  PostgreSQL allows you to directly index the result of an expression.\n  ```sql\n  -- Create an index on the lowercase version of the email column\n  CREATE INDEX idx_users_email_lower ON users (LOWER(email));\n  \n  -- A query can now use this index:\n  -- SELECT * FROM users WHERE LOWER(email) = 'test@example.com';\n  ```\n\n- **SQL Server (Index on Computed Column):**\n  In SQL Server, you must first add a formal computed column to the table, and then you can create an index on it. The column must be 'persisted' (physically stored) if the expression is not deterministic.\n  ```sql\n  -- 1. Add the computed column\n  ALTER TABLE users ADD email_lower AS LOWER(email);\n  \n  -- 2. Create the index on the new column\n  CREATE INDEX idx_users_email_lower ON users (email_lower);\n  ```",
      },
      {
        question: "How do you create a filtered index (SQL Server)?",
        solution:
          "A **filtered index** is a special type of index in SQL Server that only includes rows that meet a specific `WHERE` condition. This is highly efficient for queries that frequently target a small, well-defined subset of data (e.g., only active orders).\n\n## Use Case\nImagine you have an `Orders` table with millions of rows, but 99% of them have a status of 'Shipped' or 'Complete'. Queries for 'Pending' orders are frequent but scan a lot of irrelevant data. A filtered index can solve this.\n\n## Syntax\n```sql\nCREATE NONCLUSTERED INDEX IX_Orders_PendingStatus\nON Orders (CustomerID, OrderDate) -- Columns in the index\nWHERE Status = 'Pending'; -- The filter condition\n```\nNow, any query like `SELECT * FROM Orders WHERE Status = 'Pending'` will use this small, highly efficient index instead of scanning the entire table.",
      },
      {
        question: "How do you create a partial index (PostgreSQL)?",
        solution:
          "A **partial index** in PostgreSQL is conceptually identical to a filtered index in SQL Server. It's an index built over a subset of a table's rows, defined by a `WHERE` clause.\n\n## Use Case\nImagine a `users` table where you want to enforce that the `email` is unique, but only for active users, allowing `NULL` or duplicate emails for inactive users.\n\n## Syntax\n```sql\n-- This index only includes rows for active users\nCREATE UNIQUE INDEX idx_users_active_email\nON users (email)\nWHERE is_active = TRUE;\n```\nThis partial unique index is much smaller than a full unique index and only enforces the uniqueness constraint on the subset of rows defined by the `WHERE` clause.",
      },
      {
        question: "How do you check index fragmentation?",
        solution:
          "Index fragmentation occurs when the logical ordering of pages in an index doesn't match the physical ordering on disk, which can slow down read performance. The concept and tools to check it differ by database.\n\n## Examples by Database\n\n- **SQL Server:**\n  SQL Server provides a Dynamic Management View (DMV) specifically for this.\n  ```sql\n  SELECT \n      dbschemas.name as 'Schema',\n      dbtables.name as 'Table',\n      dbindexes.name as 'Index',\n      indexstats.avg_fragmentation_in_percent\n  FROM \n      sys.dm_db_index_physical_stats (DB_ID(), NULL, NULL, NULL, NULL) AS indexstats\n  INNER JOIN sys.tables dbtables on dbtables.object_id = indexstats.object_id\n  INNER JOIN sys.schemas dbschemas on dbtables.schema_id = dbschemas.schema_id\n  INNER JOIN sys.indexes AS dbindexes ON dbindexes.object_id = indexstats.object_id AND indexstats.index_id = dbindexes.index_id\n  WHERE \n      indexstats.avg_fragmentation_in_percent > 30 -- General rule of thumb\n  ORDER BY \n      indexstats.avg_fragmentation_in_percent DESC;\n  ```\n  - **< 5%**: Fine.\n  - **5% - 30%**: `ALTER INDEX ... REORGANIZE`.\n  - **> 30%**: `ALTER INDEX ... REBUILD`.\n\n- **PostgreSQL:**\n  PostgreSQL's architecture (MVCC) makes fragmentation less of an issue than 'bloat' (dead, unused space left by old row versions). There is no direct fragmentation metric. Instead, you check for bloat using extensions like `pgstattuple` or by running analysis queries that compare the estimated table size to the actual size. The fix for bloat is typically `VACUUM FULL` or tools like `pg_repack`.\n\n- **MySQL (InnoDB):**\n  For InnoDB tables, you can get an idea of fragmentation by checking the `Data_free` value in the output of `SHOW TABLE STATUS`. A high `Data_free` value indicates space that can be reclaimed. The command `OPTIMIZE TABLE your_table;` can be used to defragment the table and its indexes.",
      },
      {
        question: "How do you rebuild an index?",
        solution:
          "Rebuilding an index drops and recreates it. This process removes fragmentation, reclaims space, and re-orders the pages, resulting in a fresh, contiguous index. It's a more intensive operation than reorganizing and can be an offline operation by default, locking the table. ⚙️\n\n## Examples by Database\n\n- **SQL Server:**\n  Uses the `ALTER INDEX...REBUILD` command. Enterprise editions support online rebuilds.\n  ```sql\n  -- A standard, offline rebuild (locks the table)\n  ALTER INDEX IX_Orders_OrderDate ON dbo.Orders REBUILD;\n\n  -- An online rebuild (Enterprise Edition feature, allows concurrent user access)\n  ALTER INDEX IX_Orders_OrderDate ON dbo.Orders REBUILD WITH (ONLINE = ON);\n  ```\n\n- **PostgreSQL:**\n  Uses the `REINDEX` command. This is always a blocking operation.\n  ```sql\n  -- Rebuild a single index\n  REINDEX INDEX ix_orders_orderdate;\n\n  -- Rebuild all indexes on a table\n  REINDEX TABLE orders;\n  ```\n\n- **MySQL:**\n  There isn't a direct `REBUILD` command for a single index. The common practice is to run `OPTIMIZE TABLE`, which analyzes, repairs, and rebuilds the table and all its indexes.\n  ```sql\n  OPTIMIZE TABLE orders;\n  ```",
      },
      {
        question: "How do you reorganize an index?",
        solution:
          "Reorganizing an index is a lighter-weight maintenance operation compared to rebuilding. It defragments the leaf-level pages of the index by physically reordering them to match the logical order. It is always an **online operation**.\n\n## Key Differences from Rebuild\n- **Less disruptive**: It's online and uses minimal system resources.\n- **Less effective**: Only works on the leaf level; does not create a brand new structure.\n- **When to use**: Best for indexes with low to medium fragmentation (e.g., 5%-30%).\n\n## Examples by Database\n\n- **SQL Server:**\n  This is the primary database that has a distinct `REORGANIZE` command.\n  ```sql\n  ALTER INDEX IX_Orders_OrderDate ON dbo.Orders REORGANIZE;\n  ```\n\n- **PostgreSQL & MySQL:**\n  These databases do not have a direct `REORGANIZE` command. Their storage engines (MVCC in Postgres, InnoDB in MySQL) handle space management differently. The closest equivalents are:\n  - **PostgreSQL**: Running a regular `VACUUM` (not `VACUUM FULL`) helps reclaim space from dead rows, which is a form of maintenance.\n  - **MySQL**: The InnoDB storage engine has background threads that clean up and merge changes automatically.",
      },
      {
        question: "How do you find unused indexes?",
        solution:
          "Unused indexes provide no benefit to `SELECT` queries but still add overhead to write operations (`INSERT`, `UPDATE`, `DELETE`) and consume disk space. It's good practice to identify and drop them.\n\n## Logic\nDatabases keep usage statistics for indexes. We can query system views to find indexes that have been updated but never used for reads (seeks, scans, or lookups).\n\n## Examples by Database\n\n- **SQL Server:**\n  Query the `sys.dm_db_index_usage_stats` DMV.\n  ```sql\n  SELECT \n      OBJECT_NAME(s.object_id) AS 'Table',\n      i.name AS 'Index',\n      i.index_id,\n      s.user_updates AS 'Writes'\n  FROM sys.dm_db_index_usage_stats AS s\n  INNER JOIN sys.indexes AS i ON s.object_id = i.object_id AND s.index_id = i.index_id\n  WHERE s.database_id = DB_ID()\n    AND OBJECTPROPERTY(s.object_id, 'IsUserTable') = 1\n    AND s.user_seeks = 0 AND s.user_scans = 0 AND s.user_lookups = 0\n    AND i.is_primary_key = 0; -- Exclude primary keys\n  ```\n\n- **PostgreSQL:**\n  Query the `pg_stat_user_indexes` view.\n  ```sql\n  SELECT\n      relname AS table_name,\n      indexrelname AS index_name,\n      idx_scan\n  FROM pg_stat_user_indexes\n  WHERE idx_scan = 0\n    AND indexrelname NOT LIKE '%_pkey'; -- Exclude primary keys\n  ```\n\n- **MySQL (with Performance Schema enabled):**\n  Query the `schema_unused_indexes` view.\n  ```sql\n  SELECT * FROM sys.schema_unused_indexes;\n  ```",
      },
      {
        question: "How do you find missing indexes suggested by the optimizer?",
        solution:
          "The query optimizer can identify when a query's performance could be significantly improved by a new index. In some databases, these suggestions are stored in system views for analysis.\n\n## Examples by Database\n\n- **SQL Server:**\n  This is a standout feature of SQL Server. It provides a set of Dynamic Management Views (DMVs) specifically for this purpose.\n  ```sql\n  SELECT \n      'CREATE NONCLUSTERED INDEX [IX_' + t.name + '_Suggested] ON ' + \n      s.name + '.' + t.name + ' (' + ISNULL(mid.equality_columns, '') + \n      CASE WHEN mid.equality_columns IS NOT NULL AND mid.inequality_columns IS NOT NULL THEN ',' ELSE '' END + \n      ISNULL(mid.inequality_columns, '') + ')' + \n      ISNULL(' INCLUDE (' + mid.included_columns + ')', '') AS create_statement,\n      migs.avg_total_user_cost * migs.avg_user_impact * (migs.user_seeks + migs.user_scans) AS improvement_measure\n  FROM sys.dm_db_missing_index_group_stats AS migs\n  INNER JOIN sys.dm_db_missing_index_groups AS mig ON migs.group_handle = mig.index_group_handle\n  INNER JOIN sys.dm_db_missing_index_details AS mid ON mig.index_handle = mid.index_handle\n  INNER JOIN sys.tables AS t ON mid.object_id = t.object_id\n  INNER JOIN sys.schemas AS s ON t.schema_id = s.schema_id\n  ORDER BY improvement_measure DESC;\n  ```\n\n- **PostgreSQL & MySQL:**\n  These databases **do not have** a built-in feature that automatically suggests missing indexes in a system view. The standard process is more manual:\n  1.  Identify slow-running queries using the **slow query log**.\n  2.  Take a slow query and run it with **`EXPLAIN`** (or `EXPLAIN ANALYZE` in Postgres).\n  3.  Analyze the execution plan to see if it's performing full table scans where an index seek would be better. Based on this analysis, you manually decide which index to create.",
      },
      {
        question: "How do you see which queries are currently running?",
        solution:
          "Viewing active sessions and their current queries is essential for real-time monitoring and troubleshooting performance issues.\n\n## Examples by Database\n\n- **SQL Server:**\n  The classic stored procedure is `sp_who2`. A more detailed approach uses DMVs.\n  ```sql\n  -- Quick and easy\n  EXEC sp_who2;\n\n  -- More detailed view\n  SELECT \n      s.session_id,\n      r.status,\n      r.command,\n      t.text AS sql_text,\n      r.wait_type,\n      r.cpu_time,\n      r.total_elapsed_time\n  FROM sys.dm_exec_requests r\n  CROSS APPLY sys.dm_exec_sql_text(r.sql_handle) t\n  JOIN sys.dm_exec_sessions s ON r.session_id = s.session_id\n  WHERE s.is_user_process = 1;\n  ```\n\n- **PostgreSQL:**\n  Query the `pg_stat_activity` view.\n  ```sql\n  SELECT \n      pid,\n      usename,\n      client_addr,\n      state,\n      wait_event,\n      query\n  FROM pg_stat_activity\n  WHERE state <> 'idle';\n  ```\n\n- **MySQL:**\n  Use the `SHOW PROCESSLIST` command.\n  ```sql\n  -- Shows all active processes\n  SHOW FULL PROCESSLIST;\n  ```",
      },
      {
        question: "How do you kill a long-running query?",
        solution:
          "If a query is consuming excessive resources or blocking other processes, you may need to terminate it manually. This should be done with caution, as it will roll back any work the query has done.\n\n## Steps\n1.  **Identify the Process/Session ID** of the query you want to terminate using the methods from the previous question (e.g., `sp_who2`, `pg_stat_activity`, `SHOW PROCESSLIST`).\n2.  **Use the `KILL` command** with that ID.\n\n## Examples by Database\n\n- **SQL Server:**\n  The ID is called a `Session ID` or `SPID`.\n  ```sql\n  -- First, find the SPID (e.g., 52)\n  EXEC sp_who2;\n\n  -- Then, kill it\n  KILL 52;\n  ```\n\n- **PostgreSQL:**\n  The ID is a process ID (`pid`). The function is `pg_terminate_backend()`.\n  ```sql\n  -- First, find the PID (e.g., 12345)\n  SELECT pid, query FROM pg_stat_activity;\n\n  -- Then, terminate it\n  SELECT pg_terminate_backend(12345);\n  ```\n\n- **MySQL:**\n  The ID is the process `Id`.\n  ```sql\n  -- First, find the Id (e.g., 8)\n  SHOW FULL PROCESSLIST;\n\n  -- Then, kill it\n  KILL 8;\n  ```",
      },
      {
        question: "How do you set a lock timeout in SQL Server?",
        solution:
          "In SQL Server, you can control how long a specific session will wait for a locked resource before giving up and returning an error. This is done with the `SET LOCK_TIMEOUT` command.\n\n## Key Concepts\n- **Scope**: The setting applies only to the **current session**. It resets when the connection is closed.\n- **Units**: The timeout is specified in **milliseconds**.\n- **Default**: The default value is -1, which means wait forever.\n\n## Syntax & Example\n```sql\n-- Set the lock timeout to 10 seconds (10,000 milliseconds)\nSET LOCK_TIMEOUT 10000;\n\n-- Now, try to execute a query that might get blocked\nBEGIN TRY\n    UPDATE dbo.Products SET UnitsInStock = 50 WHERE ProductID = 1;\nEND TRY\nBEGIN CATCH\n    IF ERROR_NUMBER() = 1222\n        PRINT 'The statement timed out because it was blocked by another process.';\n    ELSE\n        THROW;\nEND CATCH;\n\n-- Set it back to waiting indefinitely\nSET LOCK_TIMEOUT -1;\n```",
      },
      {
        question: "How do you check for blocking transactions?",
        solution:
          "A blocking transaction occurs when one session holds a lock that another session is waiting to acquire. Identifying the 'head' of a blocking chain is key to resolving the issue.\n\n## Examples by Database\n\n- **SQL Server:**\n  Query the `sys.dm_exec_requests` DMV, looking for a `blocking_session_id`.\n  ```sql\n  SELECT \n      r.session_id, \n      r.status, \n      r.wait_type, \n      r.blocking_session_id,\n      t.text AS blocking_query, -- The query being blocked\n      (SELECT text FROM sys.dm_exec_sql_text(s.sql_handle)) AS blocker_query -- The query holding the lock\n  FROM sys.dm_exec_requests r\n  CROSS APPLY sys.dm_exec_sql_text(r.sql_handle) t\n  LEFT JOIN sys.dm_exec_sessions s ON r.blocking_session_id = s.session_id\n  WHERE r.blocking_session_id <> 0;\n  ```\n\n- **PostgreSQL:**\n  Query the `pg_locks` view to find sessions that are waiting for a lock (`granted = false`).\n  ```sql\n  SELECT\n      blocked_locks.pid     AS blocked_pid,\n      blocked_activity.usename  AS blocked_user,\n      blocked_activity.query    AS blocked_statement,\n      blocking_locks.pid     AS blocking_pid,\n      blocking_activity.usename AS blocking_user,\n      blocking_activity.query   AS current_statement_in_blocking_process\n  FROM  pg_catalog.pg_locks         blocked_locks\n  JOIN  pg_catalog.pg_stat_activity blocked_activity  ON blocked_activity.pid = blocked_locks.pid\n  JOIN  pg_catalog.pg_locks         blocking_locks \n     ON blocking_locks.locktype = blocked_locks.locktype\n     AND blocking_locks.DATABASE IS NOT DISTINCT FROM blocked_locks.DATABASE\n     AND blocking_locks.relation IS NOT DISTINCT FROM blocked_locks.relation\n     AND blocking_locks.page IS NOT DISTINCT FROM blocked_locks.page\n     AND blocking_locks.tuple IS NOT DISTINCT FROM blocked_locks.tuple\n     AND blocking_locks.virtualxid IS NOT DISTINCT FROM blocked_locks.virtualxid\n     AND blocking_locks.transactionid IS NOT DISTINCT FROM blocked_locks.transactionid\n     AND blocking_locks.classid IS NOT DISTINCT FROM blocked_locks.classid\n     AND blocking_locks.objid IS NOT DISTINCT FROM blocked_locks.objid\n     AND blocking_locks.objsubid IS NOT DISTINCT FROM blocked_locks.objsubid\n     AND blocking_locks.pid != blocked_locks.pid\n  JOIN  pg_catalog.pg_stat_activity blocking_activity ON blocking_activity.pid = blocking_locks.pid\n  WHERE NOT blocked_locks.granted;\n  ```\n\n- **MySQL:**\n  Query the `information_schema.innodb_lock_waits` and `innodb_trx` tables.\n  ```sql\n  SELECT\n    r.trx_id waiting_trx_id,\n    r.trx_mysql_thread_id waiting_thread,\n    r.trx_query waiting_query,\n    b.trx_id blocking_trx_id,\n    b.trx_mysql_thread_id blocking_thread,\n    b.trx_query blocking_query\n  FROM information_schema.innodb_lock_waits w\n  JOIN information_schema.innodb_trx b ON b.trx_id = w.blocking_trx_id\n  JOIN information_schema.innodb_trx r ON r.trx_id = w.requesting_trx_id;\n  ```",
      },
      {
        question: "How do you identify deadlock events?",
        solution:
          "A deadlock occurs when two or more sessions are mutually blocking each other in a circular chain. The database engine automatically detects this, kills one session (the 'victim'), and rolls back its transaction to let the other proceed.\n\n## How to Find Evidence\n\n- **SQL Server:**\n  SQL Server provides excellent tooling for this. You can use the **system_health Extended Event session**, which captures deadlock graphs by default. You can view this in SSMS by navigating to Management -> Extended Events -> Sessions -> system_health -> package0.event_file -> View Target Data, and then filtering for the `xml_deadlock_report` event.\n\n- **PostgreSQL:**\n  When a deadlock occurs, PostgreSQL logs a detailed error message to the server's standard log file. You need to check the database logs for messages containing the keyword **`deadlock detected`**. To get more context, you can enable the `log_lock_waits` parameter in `postgresql.conf`.\n\n- **MySQL:**\n  The most common way is to use the `SHOW ENGINE INNODB STATUS` command. This produces a large text output. You need to scroll through it and look for a section titled **`LATEST DETECTED DEADLOCK`**, which provides a detailed breakdown of the transactions, locks, and statements involved.",
      },
      {
        question: "How do you trace SQL statements in MySQL?",
        solution:
          "In MySQL, there are two primary logs for tracing SQL statements: the General Query Log and the Slow Query Log.\n\n### General Query Log\nThis log captures **every single action** that happens on the server: every connection, disconnection, and query. It's extremely detailed but also has a **very high performance overhead**. It should only be enabled temporarily for specific debugging tasks.\n\n- **To Enable:**\n  ```sql\n  SET GLOBAL general_log = 'ON';\n  SET GLOBAL log_output = 'TABLE'; -- Or 'FILE'\n  ```\n- **To View (if logged to table):**\n  ```sql\n  SELECT * FROM mysql.general_log;\n  ```\n- **To Disable:**\n  ```sql\n  SET GLOBAL general_log = 'OFF';\n  ```\n\n### Slow Query Log\nThis log is much more practical for performance tuning. It only records queries that take **longer than a specified amount of time** to execute.\n\n- **To Enable and Configure:**\n  ```sql\n  -- Enable the log\n  SET GLOBAL slow_query_log = 'ON';\n  \n  -- Set the threshold (e.g., log queries that take more than 2 seconds)\n  SET GLOBAL long_query_time = 2;\n  ```\n- **To View (if logged to file):**\n  You must check the log file on the database server's file system, typically located in the data directory.",
      },
      {
        question: "How do you use EXPLAIN in MySQL?",
        solution:
          "The `EXPLAIN` command in MySQL is a powerful diagnostic tool that shows how the query optimizer plans to execute a SQL statement. It reveals which indexes will be used, how tables will be joined, and estimates the number of rows to be examined.\n\n## How to Use\nSimply prepend `EXPLAIN` to your `SELECT`, `INSERT`, `UPDATE`, or `DELETE` statement.\n```sql\nEXPLAIN SELECT \n    c.customer_name, \n    o.order_date \nFROM customers c \nJOIN orders o ON c.customer_id = o.customer_id \nWHERE c.country = 'USA';\n```\n\n## Key Columns in the Output\n- **`id`**: The sequence number of the operation.\n- **`select_type`**: The type of SELECT (e.g., `SIMPLE`, `PRIMARY`, `SUBQUERY`).\n- **`table`**: The table being accessed.\n- **`type`**: **(Most Important)** The join type. You want to see `ref`, `eq_ref`, or `const`. `index` is okay. **`ALL` is bad**, as it indicates a full table scan.\n- **`possible_keys`**: Indexes that MySQL could potentially use.\n- **`key`**: The actual index that MySQL decided to use.\n- **`rows`**: An *estimate* of the number of rows MySQL needs to read to execute this step.\n- **`Extra`**: Additional information, such as `Using where`, `Using index` (a good sign for covering indexes), or `Using filesort` (a bad sign).",
      },
      {
        question: "How do you use EXPLAIN ANALYZE in PostgreSQL?",
        solution:
          "In PostgreSQL, `EXPLAIN ANALYZE` is a supercharged version of `EXPLAIN`. While a regular `EXPLAIN` shows the optimizer's *plan*, `EXPLAIN ANALYZE` actually **executes the query** and then displays the plan along with the **actual execution statistics**. This is far more accurate for diagnosing performance issues.\n\n## How to Use\nSimply prepend `EXPLAIN ANALYZE` to your query.\n```sql\nEXPLAIN ANALYZE SELECT \n    c.customer_name, \n    o.order_date \nFROM customers c \nJOIN orders o ON c.customer_id = o.customer_id \nWHERE c.country = 'USA';\n```\n**Warning**: Because it runs the query, be cautious with `UPDATE` or `DELETE` statements. Wrap them in a transaction (`BEGIN; ... ROLLBACK;`) if you don't want to commit the changes.\n\n## Key Information in the Output\nFor each node in the plan, you'll see:\n- **`cost=0.00..123.45`**: The optimizer's *estimated* cost (startup..total).\n- **`rows=1000`**: The optimizer's *estimated* number of rows.\n- **`actual time=0.010..5.678`**: The **actual time taken** in milliseconds (startup..total). This is the most valuable metric.\n- **`rows=987`**: The **actual number of rows** returned by that node.\n- **`Loops`**: How many times the node was executed.\n\nBy comparing the estimated `rows` to the actual `rows`, you can identify where the optimizer's estimates are wrong, which often points to stale statistics.",
      },
      {
        question: "How do you read an execution plan’s cost estimates?",
        solution:
          "The 'cost' shown in an execution plan is one of the most frequently misunderstood metrics. Here's what you need to know:\n\n- **It's Not Time**: The cost estimate is **not a measure of time** (e.g., milliseconds or seconds). It's an arbitrary, unitless number.\n\n- **It's Relative**: The cost is a **relative value** that the query optimizer calculates to compare different possible execution plans against each other. The optimizer's entire job is to find the valid plan with the **lowest total cost**.\n\n- **How It's Calculated**: The cost is an internal calculation based on estimates of I/O operations (reading pages from disk) and CPU operations (comparing values, sorting data). Reading from disk is considered much more 'expensive' than processing data already in memory.\n\n- **What to Look For**: When analyzing a plan, don't focus on the absolute cost number. Instead, look for the **operators with the highest relative cost** within the plan. A single operator that accounts for 90% of the total plan cost is the first place you should investigate for optimization.",
      },
      {
        question: "How do you force an index hint in MySQL?",
        solution:
          "An index hint is a directive you give to the MySQL optimizer to influence its choice of index for a query. This should be used as a last resort when you are certain the optimizer is making a mistake.\n\n## Syntax\nThere are a few types of hints:\n- **`USE INDEX (index_name)`**: Suggests that the optimizer use one of the listed indexes.\n- **`FORCE INDEX (index_name)`**: Stronger than `USE`, this tells the optimizer that a table scan is extremely expensive and it should strongly prefer using the index.\n- **`IGNORE INDEX (index_name)`**: Tells the optimizer *not* to use a particular index.\n\n## Example\nImagine MySQL is choosing to do a full table scan on `employees` instead of using the `ix_department` index.\n```sql\n-- The original query that is slow\nSELECT * FROM employees WHERE department_id = 10;\n\n-- The query with a hint to force the index\nSELECT * FROM employees FORCE INDEX (ix_department) WHERE department_id = 10;\n```",
      },
      {
        question: "How do you force an index hint in SQL Server?",
        solution:
          "In SQL Server, an index hint is specified using the `WITH` clause in the query. Like in other databases, this should only be done when you have thoroughly analyzed a query and are confident you can choose a better plan than the optimizer.\n\n## Syntax\nThe hint is placed after the table name.\n```sql\nSELECT column_list \nFROM table_name WITH (INDEX(index_name))\nWHERE ...;\n```\n\n## Example\nSuppose the optimizer is incorrectly choosing a table scan on the `Sales.SalesOrderDetail` table instead of using a specific non-clustered index `IX_SalesOrderDetail_ProductID`.\n```sql\n-- The original query\nSELECT OrderQty, UnitPrice\nFROM Sales.SalesOrderDetail\nWHERE ProductID = 870;\n\n-- The query with the index hint\nSELECT OrderQty, UnitPrice\nFROM Sales.SalesOrderDetail WITH (INDEX(IX_SalesOrderDetail_ProductID))\nWHERE ProductID = 870;\n```",
      },
      {
        question: "How do you disable an index temporarily?",
        solution:
          "Disabling an index makes it unavailable to the query optimizer but keeps its definition in the metadata. This is useful for bulk-loading data, as it avoids the overhead of updating the index for every inserted row.\n\n## Examples by Database\n\n- **SQL Server:**\n  SQL Server has a straightforward `DISABLE` command. To use the index again, it must be `REBUILD`ed.\n  ```sql\n  -- To disable the index\n  ALTER INDEX IX_Orders_OrderDate ON dbo.Orders DISABLE;\n\n  -- ... perform bulk operations ...\n\n  -- To re-enable the index\n  ALTER INDEX IX_Orders_OrderDate ON dbo.Orders REBUILD;\n  ```\n\n- **MySQL (8.0+):**\n  MySQL uses the concept of 'invisible' indexes. An invisible index is not used by the optimizer but is still maintained in the background.\n  ```sql\n  -- To make an index invisible (disable it)\n  ALTER TABLE orders ALTER INDEX ix_orders_orderdate INVISIBLE;\n\n  -- To make it visible again (enable it)\n  ALTER TABLE orders ALTER INDEX ix_orders_orderdate VISIBLE;\n  ```\n\n- **PostgreSQL:**\n  PostgreSQL does not have a direct `DISABLE` or `INVISIBLE` command. The standard practice is to `DROP` the index before a large data load and then `CREATE` it again afterward.",
      },
      {
        question: "How do you create a covering index?",
        solution:
          "A **covering index** is an index that contains all the columns required to satisfy a query without having to look up data in the main table. Because the database can get everything it needs from the smaller, more efficient index structure, these queries can be extremely fast.\n\n## The Concept\nA query is 'covered' if every column mentioned in the `SELECT`, `JOIN`, `WHERE`, and `ORDER BY` clauses exists within the index itself.\n\n## Examples by Database\nConsider this query: `SELECT OrderDate, ShipCountry FROM Orders WHERE CustomerID = 'ALFKI';`\n\n- **SQL Server:**\n  SQL Server has a special `INCLUDE` clause to store non-key columns in the leaf level of the index.\n  ```sql\n  CREATE NONCLUSTERED INDEX IX_Orders_Covering\n  ON Orders (CustomerID)       -- The column for the WHERE clause\n  INCLUDE (OrderDate, ShipCountry); -- The columns for the SELECT clause\n  ```\n\n- **PostgreSQL & MySQL:**\n  These databases do not have an `INCLUDE` clause. To create a covering index, you simply add all the required columns as part of the index definition. The columns you filter on (`WHERE`) should come first.\n  ```sql\n  CREATE INDEX ix_orders_covering\n  ON Orders (CustomerID, OrderDate, ShipCountry);\n  ```",
      },
      {
        question: "How do you create a unique filtered index?",
        solution:
          "A unique filtered (or partial) index is a powerful feature that enforces uniqueness on a **subset of rows** in a table, as defined by a `WHERE` clause.\n\n## Use Case\nThis is perfect for implementing 'soft deletes'. Imagine you want every active user to have a unique email, but when a user is deleted (e.g., `is_deleted = true`), their email should be freed up for a new user to register with. A normal unique index would prevent this.\n\n## Examples by Database\nLet's enforce uniqueness on the `email` column, but only for rows where `is_deleted` is `false`.\n\n- **SQL Server (Filtered Index):**\n  ```sql\n  CREATE UNIQUE NONCLUSTERED INDEX UQ_Users_ActiveEmail\n  ON dbo.Users (Email)\n  WHERE (is_deleted = 0);\n  ```\n\n- **PostgreSQL (Partial Index):**\n  ```sql\n  CREATE UNIQUE INDEX uq_users_active_email\n  ON users (email)\n  WHERE is_deleted = false;\n  ```\n\n- **MySQL:**\n  MySQL does not support filtered/partial indexes directly. This logic often has to be enforced at the application level or with complex triggers.",
      },
      {
        question:
          "How do you find duplicate records based on multiple columns?",
        solution:
          "You can find duplicate rows based on a combination of columns by using the `GROUP BY` clause on those columns and then filtering the results with a `HAVING` clause to find groups with more than one record.\n\n## The Logic\n1.  **`GROUP BY`** the set of columns that define a duplicate (e.g., `first_name`, `last_name`, `date_of_birth`).\n2.  Use **`COUNT(*)`** to count how many rows fall into each group.\n3.  Use **`HAVING COUNT(*) > 1`** to filter out the unique records, leaving only the groups of duplicates.\n\n## Example\nFind customers who have the same `first_name` and `last_name` in a `Customers` table.\n```sql\nSELECT\n    first_name,\n    last_name,\n    COUNT(*) AS duplicate_count\nFROM\n    Customers\nGROUP BY\n    first_name, \n    last_name\nHAVING \n    COUNT(*) > 1\nORDER BY\n    duplicate_count DESC;\n```",
      },
      {
        question: "How do you delete duplicates keeping the newest row?",
        solution:
          "A common and robust method to delete duplicate records while keeping one specific version (like the newest or oldest) is to use a **Common Table Expression (CTE)** with the `ROW_NUMBER()` window function.\n\n## The Logic\n1.  Use `ROW_NUMBER()` to assign a rank to each row.\n2.  `PARTITION BY` the columns that define a duplicate (e.g., `email`). This makes the ranking restart for each group of duplicates.\n3.  `ORDER BY` a column that defines which row to keep. To keep the newest, you would order by a creation date or ID in descending (`DESC`) order, so the newest row gets rank #1.\n4.  Delete all rows from the CTE where the rank is greater than 1.\n\n## Example\nIn a `Subscribers` table, delete duplicate emails, keeping only the one with the highest `id` (the most recent entry).\n```sql\nWITH NumberedSubscribers AS (\n    SELECT \n        id, \n        ROW_NUMBER() OVER(\n            PARTITION BY email \n            ORDER BY id DESC\n        ) AS rn\n    FROM \n        Subscribers\n)\nDELETE FROM Subscribers\nWHERE id IN (SELECT id FROM NumberedSubscribers WHERE rn > 1);\n```",
      },
      {
        question: "How do you update statistics on a table?",
        solution:
          "Database statistics are metadata about the distribution of values in your columns. The query optimizer relies on them to make smart decisions. When data changes significantly, statistics can become stale, leading to bad execution plans. Manually updating them can resolve performance issues.\n\n## Examples by Database\n\n- **SQL Server:**\n  ```sql\n  -- Update statistics for all indexes and columns on a table\n  UPDATE STATISTICS dbo.SalesOrderDetail;\n\n  -- Update with a full scan for maximum accuracy (slower)\n  UPDATE STATISTICS dbo.SalesOrderDetail WITH FULLSCAN;\n  ```\n\n- **PostgreSQL:**\n  The command is `ANALYZE`. It's often run as part of `VACUUM ANALYZE`.\n  ```sql\n  -- Update statistics for a table\n  ANALYZE public.orders;\n\n  -- For more detailed output\n  ANALYZE VERBOSE public.orders;\n  ```\n\n- **MySQL:**\n  The command is `ANALYZE TABLE`.\n  ```sql\n  ANALYZE TABLE sales.orders;\n  ```",
      },
      {
        question: "How do you check when statistics were last updated?",
        solution:
          "Knowing when statistics were last updated helps you determine if they might be stale and contributing to poor query performance.\n\n## Examples by Database\n\n- **SQL Server:**\n  You can use the `STATS_DATE()` function or query the `sys.stats` catalog view.\n  ```sql\n  SELECT \n      s.name AS statistics_name,\n      STATS_DATE(s.object_id, s.stats_id) AS last_updated_date\n  FROM sys.stats AS s\n  WHERE s.object_id = OBJECT_ID('dbo.SalesOrderDetail');\n  ```\n\n- **PostgreSQL:**\n  Query the `pg_stat_user_tables` system view. This shows the times for the last manual or autovacuum `ANALYZE`.\n  ```sql\n  SELECT \n      relname AS table_name,\n      last_analyze,\n      last_autoanalyze\n  FROM pg_stat_user_tables\n  WHERE relname = 'orders';\n  ```\n\n- **MySQL:**\n  Query the `information_schema.tables` view and look for the `UPDATE_TIME` column. This reflects the last update, which includes statistics updates from `ANALYZE TABLE`.\n  ```sql\n  SELECT UPDATE_TIME\n  FROM information_schema.tables\n  WHERE table_schema = 'your_database' AND table_name = 'orders';\n  ```",
      },
      {
        question: "How do you create a simple audit trigger?",
        solution:
          "An audit trigger is a special stored procedure that automatically runs when a data modification event (`INSERT`, `UPDATE`, or `DELETE`) occurs on a table. It's used to log who changed what, and when.\n\n## Core Components\n1.  **An Audit Table**: A separate table to store the history of changes (e.g., `Products_Audit`).\n2.  **The Trigger**: A procedure attached to the primary table (e.g., `Products`) that fires on an event.\n3.  **Logging Logic**: Inside the trigger, an `INSERT` statement that records the relevant information into the audit table.\n\n## Example (Conceptual T-SQL for SQL Server)\n```sql\n-- 1. Create the audit table\nCREATE TABLE Products_Audit (\n    AuditID INT IDENTITY(1,1) PRIMARY KEY,\n    ProductID INT,\n    OldPrice DECIMAL(10,2),\n    NewPrice DECIMAL(10,2),\n    ChangedBy NVARCHAR(128),\n    ChangedAt DATETIME\n);\nGO\n\n-- 2. Create the trigger on the Products table\nCREATE TRIGGER trg_Products_Audit\nON dbo.Products\nAFTER UPDATE\nAS\nBEGIN\n    -- Check if the price column was actually updated\n    IF UPDATE(UnitPrice)\n    BEGIN\n        INSERT INTO Products_Audit (ProductID, OldPrice, NewPrice, ChangedBy, ChangedAt)\n        SELECT\n            i.ProductID,      -- Get ProductID from the 'inserted' table\n            d.UnitPrice,      -- Get the old price from the 'deleted' table\n            i.UnitPrice,      -- Get the new price from the 'inserted' table\n            SUSER_SNAME(),    -- Get the current user\n            GETDATE()         -- Get the current timestamp\n        FROM\n            inserted i\n        JOIN\n            deleted d ON i.ProductID = d.ProductID;\n    END\nEND;\nGO\n```",
      },
      {
        question: "How do you log changes to a table into an audit table?",
        solution:
          "To properly log changes, a trigger needs to access both the old state of the data (before the change) and the new state (after the change). Different databases provide special pseudo-tables or records for this purpose.\n\n## Accessing Old vs. New Data\n\n- **SQL Server:**\n  Inside a trigger, SQL Server provides two special tables: `inserted` and `deleted`.\n  - For an `INSERT`, `inserted` contains the new rows.\n  - For a `DELETE`, `deleted` contains the old rows.\n  - For an `UPDATE`, `deleted` contains the old versions of the rows, and `inserted` contains the new versions.\n  ```sql\n  -- Inside an UPDATE trigger:\n  INSERT INTO MyAuditTable (ID, OldValue, NewValue)\n  SELECT d.ID, d.MyColumn, i.MyColumn\n  FROM deleted d JOIN inserted i ON d.ID = i.ID;\n  ```\n\n- **PostgreSQL & MySQL:**\n  These systems use special records named `OLD` and `NEW` that represent a single row being affected by the trigger.\n  - For an `INSERT`, only `NEW` is available.\n  - For a `DELETE`, only `OLD` is available.\n  - For an `UPDATE`, both `OLD` and `NEW` are available.\n  ```sql\n  -- Inside an UPDATE trigger (PostgreSQL syntax):\n  INSERT INTO MyAuditTable (ID, OldValue, NewValue)\n  VALUES (OLD.ID, OLD.MyColumn, NEW.MyColumn);\n  ```",
      },
      {
        question: "How do you implement soft deletes (is_deleted flag)?",
        solution:
          "A 'soft delete' is a design pattern where you don't physically remove data from a table. Instead, you mark it as inactive using a flag. This preserves data history and referential integrity.\n\n## Implementation Steps\n\n1.  **Add a Flag Column**: Add a column to your table, typically a `BOOLEAN` or `BIT` named `is_deleted` or `is_active`. It's helpful to add a `deleted_at` timestamp as well.\n    ```sql\n    ALTER TABLE Customers\n    ADD COLUMN is_deleted BOOLEAN NOT NULL DEFAULT FALSE,\n    ADD COLUMN deleted_at TIMESTAMP NULL;\n    ```\n\n2.  **Change `DELETE` Operations to `UPDATE`s**: Instead of running `DELETE FROM Customers WHERE CustomerID = 123;`, your application logic now runs an `UPDATE`.\n    ```sql\n    UPDATE Customers\n    SET is_deleted = TRUE, deleted_at = NOW()\n    WHERE CustomerID = 123;\n    ```\n\n3.  **Modify `SELECT` Queries**: All queries that fetch data from this table must now include a `WHERE` clause to exclude the soft-deleted records.\n    ```sql\n    SELECT * FROM Customers WHERE is_deleted = FALSE;\n    ```\n\n4.  **(Optional) Create a View**: To simplify step 3, you can create a view that automatically filters out the deleted records. Your application can then query the view instead of the base table.\n    ```sql\n    CREATE VIEW vw_ActiveCustomers AS\n    SELECT * FROM Customers WHERE is_deleted = FALSE;\n    ```",
      },
      {
        question: "How do you archive old data to another table?",
        solution:
          "Archiving involves moving old, infrequently accessed data from a primary 'hot' table to a secondary 'cold' archive table. This keeps the primary table smaller and faster.\n\n## The Process\nThis is typically a two-step process performed within a single transaction to ensure data consistency.\n\n1.  **Copy the Data**: Use an `INSERT INTO ... SELECT` statement to copy the target rows from the primary table to the archive table.\n2.  **Delete the Data**: Use a `DELETE` statement to remove the copied rows from the primary table.\n\n## Example\nLet's archive all orders placed before the year 2020 from `dbo.Orders` to `dbo.Orders_Archive`.\n```sql\n-- Ensure both steps succeed or fail together\nBEGIN TRANSACTION;\n\nBEGIN TRY\n    -- Step 1: Copy the old data to the archive table\n    INSERT INTO dbo.Orders_Archive (OrderID, CustomerID, OrderDate, Amount)\n    SELECT OrderID, CustomerID, OrderDate, Amount\n    FROM dbo.Orders\n    WHERE OrderDate < '2020-01-01';\n\n    -- Step 2: Delete the old data from the primary table\n    DELETE FROM dbo.Orders\n    WHERE OrderDate < '2020-01-01';\n\n    -- If both succeed, commit the changes\n    COMMIT TRANSACTION;\n    PRINT 'Archive completed successfully.';\n\nEND TRY\nBEGIN CATCH\n    -- If anything fails, roll back all changes\n    ROLLBACK TRANSACTION;\n    PRINT 'Archive failed. All changes have been rolled back.';\n    THROW;\nEND CATCH;\n```",
      },
      {
        question: "How do you partition a table by date in PostgreSQL?",
        solution:
          "PostgreSQL provides a powerful feature called **declarative partitioning**. You create a 'parent' partitioned table and then define 'child' tables, each holding a specific range of data.\n\n## Steps to Partition by Date Range\n\n1.  **Create the Parent Table**: Define the table structure and specify the partitioning method (`RANGE`) and the partition key column (`order_date`).\n    ```sql\n    CREATE TABLE sales (\n        sale_id INT PRIMARY KEY,\n        product_id INT,\n        order_date DATE NOT NULL,\n        amount DECIMAL(10, 2)\n    )\n    PARTITION BY RANGE (order_date);\n    ```\n\n2.  **Create the Child Partitions**: Create individual tables that will store the data for specific time periods. Each is defined as a `PARTITION OF` the parent table.\n    ```sql\n    -- Partition for sales in Q1 2024\n    CREATE TABLE sales_2024_q1 PARTITION OF sales\n    FOR VALUES FROM ('2024-01-01') TO ('2024-04-01');\n\n    -- Partition for sales in Q2 2024\n    CREATE TABLE sales_2024_q2 PARTITION OF sales\n    FOR VALUES FROM ('2024-04-01') TO ('2024-07-01');\n    ```\nWhen you insert data into the main `sales` table, PostgreSQL automatically routes the row to the correct partition. When you query the `sales` table with a `WHERE` clause on `order_date`, the optimizer knows to only scan the relevant partition(s), which is called **partition pruning**.",
      },
      {
        question: "How do you partition a table by range in MySQL 8?",
        solution:
          "MySQL 8 supports native partitioning, allowing you to split a table into smaller, more manageable pieces based on a key column's value.\n\n## Steps to Partition by Range\nWhen you create the table, you define the partitioning scheme directly in the `CREATE TABLE` statement using the `PARTITION BY RANGE` clause.\n\n## Example\nLet's partition an `employees` table based on the year they were hired (`hired_year`).\n```sql\nCREATE TABLE employees (\n    id INT NOT NULL,\n    first_name VARCHAR(30),\n    last_name VARCHAR(30),\n    hired_date DATE NOT NULL,\n    hired_year INT NOT NULL -- The partition key column\n)\nPARTITION BY RANGE (hired_year) (\n    -- Partition for employees hired before 1991\n    PARTITION p0 VALUES LESS THAN (1991),\n    \n    -- Partition for hires from 1991 to 1995\n    PARTITION p1 VALUES LESS THAN (1996),\n    \n    -- Partition for hires from 1996 to 2000\n    PARTITION p2 VALUES LESS THAN (2001),\n    \n    -- A catch-all for any hires after 2000\n    PARTITION p3 VALUES LESS THAN MAXVALUE\n);\n```\nWith this structure, when you run a query like `SELECT * FROM employees WHERE hired_year = 1998;`, MySQL's optimizer knows it only needs to look inside the `p2` partition, significantly speeding up the query.",
      },
      {
        question: "How do you switch a table to a new partition scheme?",
        solution:
          "Applying a new partitioning scheme to an existing, non-partitioned table is a significant operation that involves migrating all the data. There is no simple `ALTER TABLE` command to do this directly. The process generally involves creating a new table and swapping it with the old one.\n\n## High-Level Steps\nThis is a simplified outline of a common strategy:\n\n1.  **Create a New Partitioned Table**: Create a new table (`MyTable_new`) with the exact same columns, indexes, and constraints as the original table, but with the desired new partitioning scheme.\n\n2.  **Migrate the Data**: Copy all the data from the old table to the new partitioned table. This is often the most time-consuming step.\n    ```sql\n    INSERT INTO MyTable_new (col1, col2, ...)\n    SELECT col1, col2, ... FROM MyTable_old;\n    ```\n\n3.  **Perform the Swap**: During a planned maintenance window, you perform a quick rename operation to swap the tables.\n    ```sql\n    -- Swap the tables using RENAME\n    RENAME TABLE MyTable_old TO MyTable_archive, MyTable_new TO MyTable;\n    ```\n\n4.  **Verification**: Verify that the application works correctly with the new partitioned table.\n\n5.  **Drop the Old Table**: Once everything is confirmed to be working, you can drop the archived old table (`MyTable_archive`).",
      },
      {
        question: "How do you shrink a transaction log file (SQL Server)?",
        solution:
          "Shrinking a transaction log file in SQL Server reclaims unused space, reducing the physical file size on disk. **This is not a routine maintenance task** and should only be performed after an unusual event has caused the log to grow unexpectedly large.\n\n## Why it Grows\nIn `FULL` or `BULK_LOGGED` recovery models, the log cannot be reused until it has been backed up. If log backups are missed, the file will grow continuously.\n\n## The Correct Shrink Procedure\n\n1.  **Identify the Issue**: First, determine why the log grew. The most common reason is missed log backups.\n\n2.  **Back Up the Log**: Before you can shrink, you must back up the transaction log. This marks the internal portions of the log as reusable.\n    ```sql\n    -- Perform a log backup\n    BACKUP LOG [YourDatabase] TO DISK = N'C:\\Path\\To\\YourDatabase.trn' WITH NOFORMAT, NOINIT, SKIP, NOREWIND, NOUNLOAD, STATS = 10;\n    ```\n    *You may need to run this more than once if there's a lot of log to clear.*\n\n3.  **Shrink the File**: After backing up, use `DBCC SHRINKFILE` to shrink the log file to a reasonable target size.\n    ```sql\n    -- First, find the logical name of your log file\n    USE [YourDatabase];\n    SELECT name FROM sys.database_files WHERE type_desc = 'LOG';\n    -- (Let's assume the name is 'YourDatabase_log')\n\n    -- Now, shrink it (e.g., to 1024 MB)\n    DBCC SHRINKFILE (N'YourDatabase_log', 1024);\n    ```\n\n4.  **Fix the Underlying Problem**: Ensure that your regular log backup jobs are running correctly to prevent the issue from happening again.",
      },
    ],
  },
  {
    id: 42,
    topic: "SQL",
    categories: "Mid",
    tags: [
      { name: "basics", link: "" },
      { name: "exchanges", link: "" },
      { name: "queues", link: "" },
    ],
    prepareLink: "",
    externallinks: [],
    questions: [
      {
        question:
          "How do you create empty tables with the same structure as another table?",
        solution:
          "You can create an empty table with the same structure as an existing table using a couple of common methods. 🤓\n\n### Method 1: Using `LIKE` (Most Databases)\nThis is the most straightforward way. It copies the column definitions, data types, and constraints (like `NOT NULL`), but not the data itself.\n\n**Syntax:**\n```sql\nCREATE TABLE new_table LIKE original_table;\n```\n**Example:** To create a new table `archived_employees` with the same structure as `employees`:\n```sql\nCREATE TABLE archived_employees LIKE employees;\n```\n\n### Method 2: Using `SELECT ... WHERE` (Universally Supported)\nThis method creates a new table based on the result of a `SELECT` query. By using a `WHERE` clause that is always false (like `1=0`), you ensure no rows are selected, resulting in an empty table with the same column structure.\n\n**Syntax:**\n```sql\nCREATE TABLE new_table AS SELECT * FROM original_table WHERE 1=0;\n```\n**Example:**\n```sql\nCREATE TABLE archived_employees AS SELECT * FROM employees WHERE 1=0;\n```\nThis second method is very flexible, as you can select specific columns or modify them if you don't want the exact same structure.",
      },
      {
        question: "What is a Recursive Stored Procedure?",
        solution:
          "A **recursive stored procedure** is a stored procedure that calls itself until a specific condition, known as a **base condition**, is met. It's a way to perform repetitive tasks, especially on hierarchical or tree-structured data. 🌳\n\n**Key Components:**\n1.  **Base Case:** A condition that stops the recursion. Without it, the procedure would call itself indefinitely, leading to a stack overflow error.\n2.  **Recursive Call:** The part of the procedure where it calls itself, typically with modified parameters that move it closer to the base case.\n\n**Common Use Case: Organizational Hierarchy**\nImagine a table of employees where each employee has a `manager_id` that points to another employee. A recursive procedure could be used to find all employees under a specific manager at all levels.\n\n**Simplified Example:**\nLet's say you want to find the entire management chain for a given employee.\n```sql\n-- Procedure to find the manager of a given employee and then their manager, and so on.\nCREATE PROCEDURE GetManagementChain (@employeeID INT)\nAS\nBEGIN\n    DECLARE @managerID INT;\n\n    -- Select the manager for the current employee\n    SELECT @managerID = manager_id \n    FROM employees \n    WHERE employee_id = @employeeID;\n\n    -- Base Case: If there is no manager, the recursion stops.\n    IF @managerID IS NOT NULL\n    BEGIN\n        PRINT 'Manager ID: ' + CAST(@managerID AS VARCHAR);\n        \n        -- Recursive Call: Call the same procedure for the manager.\n        EXEC GetManagementChain @employeeID = @managerID;\n    END\nEND;\n```",
      },
      {
        question: "What is a Stored Procedure?",
        solution:
          "A **stored procedure** is a pre-compiled set of one or more SQL statements that are stored in the database. Instead of writing the same complex query over and over, you can save it as a stored procedure and then just call it by name. Think of it as a function or a macro for your database. 🚀\n\n**Key Benefits:**\n* **Performance:** Stored procedures are compiled once and stored in executable form. This means subsequent calls are very fast because the query execution plan is already created.\n* **Reusability & Reduced Network Traffic:** You can execute complex operations by calling a single procedure name instead of sending hundreds of lines of SQL code over the network.\n* **Security:** You can grant users permission to execute a stored procedure without giving them direct access to the underlying tables. This prevents malicious or accidental data manipulation.\n* **Maintainability:** If the business logic changes, you only need to update the stored procedure in one place, and all applications that use it will automatically get the update.\n\n**Example:**\nA simple procedure to get all employees from a specific department.\n```sql\nCREATE PROCEDURE GetEmployeesByDepartment (@DeptName VARCHAR(50))\nAS\nBEGIN\n    SELECT \n        e.employee_id,\n        e.first_name,\n        e.last_name\n    FROM \n        employees e\n    JOIN \n        departments d ON e.department_id = d.department_id\n    WHERE \n        d.department_name = @DeptName;\nEND;\n```\nTo run it, you would simply execute:\n```sql\nEXEC GetEmployeesByDepartment @DeptName = 'Sales';\n```",
      },
      {
        question: "What is the difference between DDL and DML commands?",
        solution:
          "The main difference between **DDL (Data Definition Language)** and **DML (Data Manipulation Language)** is that DDL commands define and manage the database's structure, while DML commands manage the data within that structure. 🏗️ vs. ✍️\n\n--- \n\n## DDL (Data Definition Language)\nDDL is used to define or modify the database schema. It deals with the \"skeleton\" of the database.\n* **Purpose:** To create and manage database objects like tables, indexes, and users.\n* **Commands:** \n    * `CREATE`: To create new database objects (e.g., `CREATE TABLE ...`).\n    * `ALTER`: To modify the structure of existing objects (e.g., `ALTER TABLE ... ADD COLUMN ...`).\n    * `DROP`: To permanently delete objects (e.g., `DROP TABLE ...`).\n    * `TRUNCATE`: To delete all data from a table quickly (it's faster than `DELETE` and cannot be rolled back easily).\n* **Transaction Control:** DDL commands are generally **auto-committed**, meaning they cannot be rolled back once executed.\n\n--- \n\n## DML (Data Manipulation Language)\nDML is used for adding, retrieving, or updating the data inside the tables.\n* **Purpose:** To interact with the data stored in the database objects.\n* **Commands:** \n    * `SELECT`: To retrieve data from tables.\n    * `INSERT`: To add new rows of data into a table.\n    * `UPDATE`: To modify existing rows in a table.\n    * `DELETE`: To remove rows from a table.\n* **Transaction Control:** DML commands are **not auto-committed**. They can be part of a transaction and can be rolled back using `ROLLBACK` until `COMMIT` is issued.",
      },
      {
        question: "What is the purpose of the SQL ORDER BY clause?",
        solution:
          "The purpose of the `ORDER BY` clause in SQL is to **sort the rows in a result set** returned by a `SELECT` query. Sorting can be done based on one or more columns, in either ascending or descending order. ↕️\n\n**Key Features:**\n* **Sorting Order:**\n    * `ASC` (Ascending): Sorts from lowest to highest value (A to Z, 0 to 9). This is the **default** order if none is specified.\n    * `DESC` (Descending): Sorts from highest to lowest value (Z to A, 9 to 0).\n* **Multi-column Sorting:** You can sort by one column, and then by another column if the values in the first column are the same.\n* **Placement:** The `ORDER BY` clause is almost always the last clause in a `SELECT` statement.\n\n**Syntax:**\n```sql\nSELECT column1, column2, ...\nFROM table_name\nORDER BY column1 [ASC|DESC], column2 [ASC|DESC], ...;\n```\n\n**Example:**\nTo get a list of employees, sorted first by their department in alphabetical order (`ASC`), and then by their salary from highest to lowest (`DESC`) within each department.\n```sql\nSELECT first_name, last_name, department, salary\nFROM employees\nORDER BY department ASC, salary DESC;\n```",
      },
      {
        question: "What are the differences between SQL and NoSQL databases?",
        solution:
          "SQL and NoSQL databases are fundamentally different in their structure, data models, and scalability. Choosing between them depends entirely on the application's needs. Here’s a breakdown of the key differences:\n\n\n\n--- \n\n## SQL (Relational Databases) 🗂️\nSQL databases are also known as **relational databases**. They store data in a structured way, using tables with rows and columns. They enforce a predefined schema.\n* **Data Model:** Relational (tables with rows and columns).\n* **Schema:** **Predefined and strict** (schema-on-write). The table structure must be defined before inserting data.\n* **Examples:** MySQL, PostgreSQL, Microsoft SQL Server, Oracle Database.\n* **Scalability:** Primarily **vertically scalable**. You increase capacity by adding more resources (CPU, RAM) to a single server.\n* **Consistency:** Emphasizes **ACID** properties (Atomicity, Consistency, Isolation, Durability), making them ideal for transactional systems like banking and e-commerce.\n* **Best For:** Applications requiring high consistency, complex queries, and structured data (e.g., financial systems, order management).\n\n--- \n\n## NoSQL (Non-Relational Databases) 📑\nNoSQL databases encompass a variety of database types that are non-relational and do not require a fixed schema.\n* **Data Model:** Varies. Can be **document** (MongoDB), **key-value** (Redis), **column-family** (Cassandra), or **graph** (Neo4j).\n* **Schema:** **Dynamic** (schema-on-read). Data can be stored without a predefined structure.\n* **Examples:** MongoDB, Redis, Cassandra, Neo4j, Couchbase.\n* **Scalability:** Primarily **horizontally scalable**. You increase capacity by adding more servers to a cluster.\n* **Consistency:** Often favors **BASE** properties (Basically Available, Soft state, Eventual consistency). This allows for higher availability and scalability at the cost of immediate consistency.\n* **Best For:** Applications with large volumes of unstructured data, a need for high availability, and rapid development (e.g., social media feeds, IoT data, content management systems).",
      },
      {
        question: "What is a table in SQL?",
        solution:
          "In SQL, a **table** is the primary database object used to store data. It organizes information into a structured grid format consisting of **rows** and **columns**. 📊\n\n* **Columns (Fields/Attributes):** The vertical entities in a table. Each column has a specific name and data type (e.g., `INTEGER`, `VARCHAR`, `DATE`) and defines a particular attribute of the data being stored. For example, in an `Employees` table, columns might be `EmployeeID`, `FirstName`, and `HireDate`.\n\n* **Rows (Records/Tuples):** The horizontal entities in a table. Each row represents a single, complete record or entry in the table. For example, one row in the `Employees` table would contain all the information for a single employee.\n\nThink of a table as a spreadsheet. The columns are the headers at the top, and each row is a line item containing the data for one specific item.",
      },
      {
        question: "What is the purpose of the SQL SELECT statement?",
        solution:
          "The purpose of the `SELECT` statement is fundamental to SQL: it is used to **retrieve or query data** from one or more tables in a database. It allows you to specify exactly what data you want to see. 🔎\n\nIt's the most commonly used SQL command and can be very simple or incredibly complex. The statement's power comes from its various clauses that allow you to filter, sort, group, and aggregate the data.\n\n**Basic Syntax:**\n```sql\nSELECT column1, column2, ...\nFROM table_name;\n```\n\n**Common Clauses Used with `SELECT`:**\n* `FROM`: Specifies the table(s) from which to retrieve the data.\n* `WHERE`: Filters records based on a specific condition.\n* `GROUP BY`: Groups rows that have the same values into summary rows.\n* `HAVING`: Filters groups based on a condition, used after `GROUP BY`.\n* `ORDER BY`: Sorts the result set.\n* `JOIN`: Combines rows from two or more tables.\n\n**Example:**\nTo retrieve the first name and salary of all employees in the 'Sales' department who earn more than $50,000, and sort them by salary in descending order:\n```sql\nSELECT \n    first_name, \n    salary\nFROM \n    employees\nWHERE \n    department = 'Sales' AND salary > 50000\nORDER BY \n    salary DESC;\n```",
      },
      {
        question: "What are NULL values in SQL?",
        solution:
          "In SQL, a `NULL` value represents a **missing, unknown, or not applicable value** in a column. It's a placeholder, not a value itself. ❓\n\nIt's crucial to understand that `NULL` is **not the same as:**\n* **Zero (`0`)**: Zero is a specific numerical value.\n* **An empty string (`''`)**: An empty string is a specific character value of zero length.\n* **A blank space (`' '`)**: A blank space is a character.\n\n**Key Behaviors of `NULL`:**\n1.  **Comparisons:** Any arithmetic or comparison operation with `NULL` (e.g., `NULL = 5`, `NULL > 10`, `NULL = NULL`) results in `UNKNOWN` (which is treated as false in `WHERE` clauses). To check for `NULL`, you must use the `IS NULL` or `IS NOT NULL` operators.\n    ```sql\n    -- Correct way to find records with a missing manager_id\n    SELECT * FROM employees WHERE manager_id IS NULL;\n\n    -- Incorrect way (will not return any rows)\n    SELECT * FROM employees WHERE manager_id = NULL;\n    ```\n2.  **Aggregate Functions:** Most aggregate functions like `SUM()`, `AVG()`, `MAX()`, `MIN()` **ignore** `NULL` values. The `COUNT(*)` function counts all rows, while `COUNT(column_name)` counts only the non-`NULL` values in that specific column.",
      },
      {
        question: "What is a subquery?",
        solution:
          "A **subquery**, also known as an **inner query** or a **nested query**, is a `SELECT` statement that is embedded inside another SQL statement. The result of the subquery is used by the outer query to help restrict or evaluate its data.  nesting doll of queries! 🪆\n\nSubqueries can be used in several places within a larger query:\n* In a `WHERE` clause for filtering.\n* In a `FROM` clause to create a temporary table-like result set.\n* In a `SELECT` clause to retrieve a single value (a scalar subquery).\n* With operators like `IN`, `NOT IN`, `ANY`, `ALL`, and `EXISTS`.\n\n**Example: Subquery in a `WHERE` Clause**\nLet's find all employees who work in the same department as an employee named 'John'.\n\n1.  **Inner Query:** First, find the department ID for 'John'.\n    ```sql\n    (SELECT department_id FROM employees WHERE first_name = 'John')\n    ```\n2.  **Outer Query:** Then, find all employees who have that department ID.\n    ```sql\n    SELECT first_name, last_name\n    FROM employees\n    WHERE department_id IN (SELECT department_id FROM employees WHERE first_name = 'John');\n    ```\nIn this example, the inner query runs first and returns a list of department IDs. The outer query then uses this list to filter its results.",
      },
      {
        question: "How do you use the CASE statement in SQL?",
        solution:
          "The `CASE` statement in SQL acts like an **if-then-else** construct, allowing you to add conditional logic directly into your queries. It evaluates a list of conditions and returns one of multiple possible result expressions. It's incredibly useful for categorizing data or applying different logic based on column values. 🚦\n\n**Syntax:**\n```sql\nCASE\n    WHEN condition1 THEN result1\n    WHEN condition2 THEN result2\n    ...\n    ELSE result_else\nEND\n```\n* The database evaluates the `WHEN` conditions in order.\n* It stops and returns the `result` for the first condition that is true.\n* If no conditions are true, it returns the value in the `ELSE` clause.\n* The `ELSE` clause is optional. If it's omitted and no conditions are met, `NULL` is returned.\n\n**Example:**\nImagine you want to categorize employees based on their salary. You can use a `CASE` statement to create a new column called `SalaryCategory`.\n\n```sql\nSELECT \n    first_name,\n    last_name,\n    salary,\n    CASE\n        WHEN salary >= 100000 THEN 'High Earner'\n        WHEN salary >= 50000 AND salary < 100000 THEN 'Mid Earner'\n        ELSE 'Standard Earner'\n    END AS SalaryCategory\nFROM \n    employees;\n```\nThis query will return the employee's name, salary, and a new, dynamically created 'SalaryCategory' column with the appropriate label for each employee.",
      },
      {
        question: "What is a cursor in SQL?",
        solution:
          "A **cursor** is a database object that allows you to retrieve and process the rows from a result set one by one, rather than all at once. Think of it as a pointer that navigates through the rows of a query's result, similar to how a cursor on your screen moves through text. 👆\n\nWhile standard SQL operations are set-based (they operate on all rows at once), cursors provide a way to perform **row-by-row processing**. This is sometimes necessary for complex, sequential logic that can't be handled by a single SQL statement.\n\n**The general process of using a cursor is:**\n1.  **`DECLARE`:** Define the cursor and associate it with a `SELECT` statement.\n2.  **`OPEN`:** Execute the `SELECT` statement and populate the cursor with the result set.\n3.  **`FETCH`:** Retrieve one row from the result set and move the pointer to the next row.\n4.  **Process:** Perform operations on the data from the fetched row.\n5.  **Loop:** Repeat the `FETCH` and process steps until all rows are processed.\n6.  **`CLOSE`:** Deactivate the cursor.\n7.  **`DEALLOCATE`:** Release the resources used by the cursor.\n\n**When to Use Cursors (and When to Avoid):**\n* **Use Case:** Cursors can be useful for administrative tasks, complex sequential validations, or calling a stored procedure for each row in a result set.\n* **Caution:** Cursors are generally **inefficient and resource-intensive** compared to set-based operations. They can lead to poor performance and should be avoided whenever a standard `JOIN` or subquery can achieve the same result. They are often considered a last resort in application code.",
      },
      {
        question: "How do you use the EXISTS clause?",
        solution:
          "The `EXISTS` clause is a boolean operator in SQL used to test for the existence of any records in a subquery. It returns `TRUE` if the subquery returns one or more rows, and `FALSE` if the subquery returns zero rows. It is used in the `WHERE` clause of the outer query. ✅\n\n**Key Characteristics:**\n* **Efficiency:** `EXISTS` is highly efficient because the database engine can stop processing the subquery as soon as it finds the **first matching row**. It doesn't need to collect all the matching rows, unlike an `IN` clause or a `JOIN`.\n* **No Data Returned:** The subquery inside `EXISTS` doesn't return data to the outer query; it only returns a `TRUE` or `FALSE` signal. For this reason, it's common and good practice to use `SELECT 1` or `SELECT *` in the subquery, as the columns selected are ignored.\n\n**Syntax:**\n```sql\nSELECT column_name(s)\nFROM table_name\nWHERE EXISTS (SELECT 1 FROM another_table WHERE condition);\n```\n\n**Example:**\nLet's find all departments that have at least one employee.\n\nWe can use `EXISTS` to check if, for each department, there is at least one corresponding record in the `employees` table.\n```sql\nSELECT department_name\nFROM departments d\nWHERE EXISTS (\n    SELECT 1 \n    FROM employees e \n    WHERE e.department_id = d.department_id\n);\n```\nIn this query, for each row in the `departments` table, the subquery is executed. If the subquery finds even one employee with the matching `department_id`, it returns `TRUE`, and the `department_name` is included in the final result set.",
      },
      {
        question: "How do you use the UNION and UNION ALL operators?",
        solution:
          "The `UNION` and `UNION ALL` operators are used to combine the result sets of two or more `SELECT` statements into a single result set. 🔀\n\nFor these operators to work, the `SELECT` statements must follow these rules:\n1.  They must have the same number of columns.\n2.  The columns must have similar data types.\n3.  The columns in each `SELECT` statement must be in the same order.\n\n--- \n\n## `UNION`\nThe `UNION` operator combines the result sets and then **removes any duplicate rows**. Because it has to check for and eliminate duplicates, it is slightly slower than `UNION ALL`.\n\n**Syntax:**\n```sql\nSELECT column_name(s) FROM table1\nUNION\nSELECT column_name(s) FROM table2;\n```\n\n**Example:** Get a unique list of all cities where customers and suppliers are located.\n```sql\nSELECT City FROM Customers\nUNION\nSELECT City FROM Suppliers;\n```\nIf 'New York' exists in both tables, it will appear only once in the final result.\n\n--- \n\n## `UNION ALL`\nThe `UNION ALL` operator combines the result sets but **includes all rows, including duplicates**. It is faster than `UNION` because it doesn't perform the extra step of checking for duplicates.\n\n**Syntax:**\n```sql\nSELECT column_name(s) FROM table1\nUNION ALL\nSELECT column_name(s) FROM table2;\n```\n\n**Example:** Get a combined list of all customer and supplier cities, allowing for duplicates.\n```sql\nSELECT City FROM Customers\nUNION ALL\nSELECT City FROM Suppliers;\n```\nIf 'New York' exists in both tables, it will appear twice in the final result.",
      },
      {
        question: "What is a view in SQL?",
        solution:
          "A **view** in SQL is a **virtual table** that is based on the result set of a `SELECT` statement. It contains rows and columns just like a real table, but it doesn't store any data itself. Instead, the data is dynamically generated from one or more underlying base tables whenever the view is queried. 🖼️\n\nThink of a view as a stored query that you can interact with as if it were a table.\n\n**Key Purposes and Benefits:**\n1.  **Simplicity:** A view can simplify complex queries. You can join multiple tables and use various functions in a view, and then users can query the view with a simple `SELECT` statement without needing to know the complex logic behind it.\n2.  **Security:** You can use a view to restrict access to data. For example, you can create a view that only shows certain columns or rows from a table (e.g., hiding salary information from most users), and then grant users permission to the view instead of the underlying table.\n3.  **Logical Data Independence:** A view can provide a consistent structure to users even if the underlying tables are changed. If you need to refactor or normalize the base tables, you can maintain the original view structure so that applications that use it don't break.\n\n**Example:**\nLet's create a view that shows the full name and department of each employee, hiding their salary and other personal info.\n```sql\nCREATE VIEW EmployeeDepartmentView AS\nSELECT \n    e.first_name,\n    e.last_name,\n    d.department_name\nFROM \n    employees e\nJOIN \n    departments d ON e.department_id = d.department_id;\n```\nNow, instead of writing the `JOIN` every time, a user can simply query the view:\n```sql\nSELECT * FROM EmployeeDepartmentView WHERE department_name = 'Sales';\n```",
      },
      {
        question: "How do you use the JOIN clause?",
        solution:
          "The `JOIN` clause is used in SQL to **combine rows from two or more tables** based on a related column between them. It is one of the most powerful and fundamental features of relational databases. 🤝\n\nThere are several types of `JOIN`s, each serving a different purpose.\n\n--- \n\n### `INNER JOIN`\nThis is the most common type of join. It returns only the rows where the join condition is met in **both** tables. It finds the intersection of the two tables.\n\n**Example:** Get a list of employees and their department names. This will only include employees who are assigned to a department.\n```sql\nSELECT e.first_name, d.department_name\nFROM employees e\nINNER JOIN departments d ON e.department_id = d.department_id;\n```\n\n\n--- \n\n### `LEFT JOIN` (or `LEFT OUTER JOIN`)\nThis returns **all rows from the left table** and the matched rows from the right table. If there is no match in the right table for a row from the left table, the result will contain `NULL` values for the columns from the right table.\n\n**Example:** Get all employees and their department, including employees who are not yet assigned to any department.\n```sql\nSELECT e.first_name, d.department_name\nFROM employees e\nLEFT JOIN departments d ON e.department_id = d.department_id;\n```\n\n\n--- \n\n### `RIGHT JOIN` (or `RIGHT OUTER JOIN`)\nThis is the opposite of a `LEFT JOIN`. It returns **all rows from the right table** and the matched rows from the left table. If there's no match, the columns from the left table will be `NULL`.\n\n**Example:** Get all departments and the employees in them, including departments that have no employees.\n```sql\nSELECT e.first_name, d.department_name\nFROM employees e\nRIGHT JOIN departments d ON e.department_id = d.department_id;\n```\n\n--- \n\n### `FULL OUTER JOIN`\nThis returns all rows when there is a match in either the left or the right table. It essentially combines the results of `LEFT JOIN` and `RIGHT JOIN`. If there's no match, the missing side's columns will be `NULL`.\n\n**Example:** Get all employees and all departments, matching them where possible but including unmatched employees and unmatched departments.\n```sql\nSELECT e.first_name, d.department_name\nFROM employees e\nFULL OUTER JOIN departments d ON e.department_id = d.department_id;\n```",
      },
      {
        question: "What is a transaction in SQL?",
        solution:
          "A **transaction** is a sequence of operations performed as a **single logical unit of work**. All the operations within a transaction must succeed; if any one of them fails, the entire transaction is rolled back, and the database is returned to the state it was in before the transaction began. This ensures data integrity. 🛡️\n\nA transaction is defined by the **ACID** properties, which guarantee its reliability:\n\n1.  **Atomicity:** (All or nothing) A transaction is an indivisible unit. It either completes in its entirety (`COMMIT`) or fails completely (`ROLLBACK`). There is no partial completion.\n\n2.  **Consistency:** A transaction brings the database from one valid state to another. It preserves the database's integrity constraints. For example, a transaction to transfer money between two bank accounts should not change the total amount of money in the system.\n\n3.  **Isolation:** Transactions are often executed concurrently. Isolation ensures that the execution of one transaction does not interfere with another. It makes each transaction feel as if it's the only one running on the system.\n\n4.  **Durability:** Once a transaction has been successfully committed, the changes it made to the database are permanent and will survive any subsequent system failures (like a power outage or crash).\n\n**Common SQL Transaction Commands:**\n* `BEGIN TRANSACTION`: Starts a new transaction.\n* `COMMIT`: Saves all the changes made in the transaction to the database.\n* `ROLLBACK`: Undoes all the changes made in the transaction.\n* `SAVEPOINT`: Sets a point within a transaction to which you can later roll back.",
      },
      {
        question: "How do you use the GROUP BY clause?",
        solution:
          "The `GROUP BY` clause is used in SQL to arrange identical data into groups. It is almost always used in conjunction with **aggregate functions** (`COUNT()`, `MAX()`, `MIN()`, `SUM()`, `AVG()`) to perform calculations on each group. 🧮\n\nIn essence, `GROUP BY` collapses multiple rows into a single summary row based on the values in the specified column(s).\n\n**How it works:**\n1.  It takes all the rows from the `FROM` and `WHERE` clauses.\n2.  It groups them so that all rows with the same value in the `GROUP BY` column are put into a single group.\n3.  The aggregate function then calculates a result for each of these groups.\n\n**Syntax:**\n```sql\nSELECT column_name(s), aggregate_function(column_name)\nFROM table_name\nWHERE condition\nGROUP BY column_name(s)\nORDER BY column_name(s);\n```\n\n**Important Rule:** When you use `GROUP BY`, any column in your `SELECT` list must either be part of the `GROUP BY` clause or be used inside an aggregate function.\n\n**Example:**\nLet's say you have an `orders` table and you want to find the total number of orders placed by each customer.\n\n```sql\nSELECT\n    customer_id,\n    COUNT(order_id) AS total_orders\nFROM \n    orders\nGROUP BY \n    customer_id;\n```\n\n**Result:**\nThis query will produce a result set with two columns: `customer_id` and `total_orders`. Each row will show a unique `customer_id` and the count of how many orders that specific customer has placed.",
      },
      {
        question: "What is a primary key in SQL?",
        solution:
          "A **primary key** is a constraint in SQL that **uniquely identifies each record** in a table. It acts as a unique identifier for each row, ensuring that you can always pinpoint a specific entry. 🔑\n\n**Fundamental Properties of a Primary Key:**\n1.  **Must Be Unique:** No two rows in a table can have the same primary key value. This enforces the uniqueness of each record.\n2.  **Cannot Contain `NULL` Values:** A primary key column must have a value. It cannot be left empty or `NULL`, ensuring that every record has an identifier.\n\n**Key Characteristics:**\n* A table can have **only one** primary key.\n* This primary key can consist of a single column (a simple key) or multiple columns (a composite key). When multiple columns are used, the *combination* of their values must be unique for each row.\n* When a primary key is created, most database systems automatically create a unique **index** on that key to speed up data retrieval.\n\n**Example:**\nIn an `Employees` table, the `EmployeeID` column would be an ideal primary key. Each employee has a unique ID, and no employee can exist without one.\n\n**Defining a Primary Key:**\nYou can define a primary key when you create a table (`CREATE TABLE`) or add it to an existing table (`ALTER TABLE`).\n\n```sql\n-- Defining a primary key during table creation\nCREATE TABLE Employees (\n    EmployeeID INT PRIMARY KEY,\n    FirstName VARCHAR(50) NOT NULL,\n    LastName VARCHAR(50) NOT NULL\n);\n\n-- Or, for a composite primary key\nCREATE TABLE OrderDetails (\n    OrderID INT,\n    ProductID INT,\n    Quantity INT,\n    PRIMARY KEY (OrderID, ProductID) -- Combination of OrderID and ProductID is unique\n);\n```",
      },
      {
        question:
          "What is a foreign key and how does it differ from a primary key?",
        solution:
          "A **foreign key** is a key used to link two tables together. It's a field (or a collection of fields) in one table that refers to the **primary key** in another table. The main purpose of a foreign key is to enforce **referential integrity**, ensuring that relationships between tables remain consistent. 🔗\n\nHere’s a breakdown of the differences between a primary key and a foreign key:\n\n--- \n\n## Primary Key (PK) 🔑\n* **Purpose:** To **uniquely identify** each record within its **own** table.\n* **Uniqueness:** Must contain unique values.\n* **NULL Values:** Cannot contain `NULL` values.\n* **Quantity:** A table can have **only one** primary key.\n* **Indexing:** Is automatically indexed (a clustered index by default in many systems).\n\n**Example:** In an `Employees` table, `EmployeeID` is the primary key.\n\n--- \n\n## Foreign Key (FK) 🗝️\n* **Purpose:** To **create a link** between two tables. It references the primary key of another table to establish a relationship.\n* **Uniqueness:** Can contain duplicate values. For example, multiple employees can belong to the same department, so the `DepartmentID` foreign key in the `Employees` table will have duplicate values.\n* **NULL Values:** Can contain `NULL` values. For example, an employee might not yet be assigned to a department.\n* **Quantity:** A table can have **multiple** foreign keys, each linking to a different table.\n* **Indexing:** Is not automatically indexed, but it's often a good practice to index them for performance.\n\n**Example:**\nConsider two tables: `Departments` and `Employees`.\n\n* `Departments` table has `DepartmentID` as its **primary key**.\n* `Employees` table has `EmployeeID` as its **primary key** and also has a `DepartmentID` column.\n\nIn the `Employees` table, the `DepartmentID` column is a **foreign key** that points to the `DepartmentID` (the primary key) in the `Departments` table. This link ensures that you cannot add an employee with a `DepartmentID` that does not exist in the `Departments` table.",
      },
      {
        question: "How do you find duplicate records in a table?",
        solution:
          "The most common way to find duplicate records in a table is by using the `GROUP BY` clause in combination with the `HAVING` clause and the `COUNT()` aggregate function. This approach allows you to group rows based on the columns you suspect have duplicates and then filter those groups to find the ones with more than one entry. 🕵️‍♀️\n\n**The Method:**\n1.  **`GROUP BY`:** Group the rows by the set of columns where you want to check for duplicates (e.g., `first_name`, `last_name`, `email`).\n2.  **`COUNT(*)`:** For each group, count the number of rows in it.\n3.  **`HAVING`:** Filter the results to keep only those groups where the count is greater than 1. These are your duplicates.\n\n**Example Query:**\nSuppose you have a `Contacts` table and you want to find people who have the same `first_name` and `last_name`.\n\n```sql\nSELECT\n    first_name,\n    last_name,\n    COUNT(*) AS duplicate_count\nFROM\n    Contacts\nGROUP BY\n    first_name,\n    last_name\nHAVING\n    COUNT(*) > 1;\n```\n\n**Explanation:**\n* `SELECT first_name, last_name, COUNT(*)`: This selects the columns that define a duplicate and shows how many times each combination appears.\n* `FROM Contacts`: Specifies the table.\n* `GROUP BY first_name, last_name`: This tells the database to treat all rows with the same `first_name` and `last_name` as a single group.\n* `HAVING COUNT(*) > 1`: This is the crucial filtering step. After grouping, it checks the count for each group and only returns the groups that have a count of more than one, which are by definition the duplicates.\n\nTo see the full duplicate records (including their primary keys), you could use this query in a subquery or a Common Table Expression (CTE).",
      },
      {
        question:
          "Write a query to find the 3rd highest salary from an employees table.",
        solution:
          "Finding the nth highest value is a classic SQL problem. The most robust and modern way to solve this is by using a window function like `DENSE_RANK()`. This method correctly handles ties in salaries.\n\n### Method: Using `DENSE_RANK()`\n`DENSE_RANK()` assigns a rank to each row within a partition of a result set, with no gaps in the ranking values. This is perfect for finding the 'nth' item.\n\n```sql\nWITH SalaryRanks AS (\n    SELECT\n        salary,\n        DENSE_RANK() OVER (ORDER BY salary DESC) as rank_num\n    FROM\n        employees\n)\nSELECT salary\nFROM SalaryRanks\nWHERE rank_num = 3;\n```\n\n**How it Works:**\n1.  The **Common Table Expression (CTE)** `SalaryRanks` first calculates the rank of each unique salary in descending order. If two employees have the same salary, they get the same rank.\n2.  The outer query then simply selects the salary from the CTE where the calculated rank is 3. 🥉\n\nThis is generally preferred over methods using `LIMIT` and `OFFSET` because `LIMIT`/`OFFSET` can skip ranks if there are ties for the highest or second-highest salaries.",
      },
      {
        question:
          "Explain the difference between INNER JOIN and LEFT JOIN with examples.",
        solution:
          "The fundamental difference between `INNER JOIN` and `LEFT JOIN` lies in how they handle rows that don't have a match in the other table. 🤝\n\n--- \n\n### `INNER JOIN`\nAn `INNER JOIN` returns **only the rows where the join condition is met in both tables**. It finds the intersection of the two tables. Think of it as finding matching puzzle pieces; you only keep the ones that fit together perfectly.\n\n**Example:** Get a list of employees and the name of the department they work in.\n```sql\nSELECT e.employee_name, d.department_name\nFROM employees e\nINNER JOIN departments d ON e.department_id = d.department_id;\n```\nThis query will **only** return employees who are assigned to a department that exists in the `departments` table. An employee with a `NULL` or invalid `department_id` would be excluded.\n\n\n--- \n\n### `LEFT JOIN` (or `LEFT OUTER JOIN`)\nA `LEFT JOIN` returns **all rows from the left table** and the matched rows from the right table. If there is no match for a row from the left table in the right table, the result will show `NULL` values for the columns from the right table.\n\n**Example:** Get a list of *all* employees and their department name, including those not yet assigned to a department.\n```sql\nSELECT e.employee_name, d.department_name\nFROM employees e\nLEFT JOIN departments d ON e.department_id = d.department_id;\n```\nThis query returns every single employee. If an employee isn't in a department, their `department_name` will appear as `NULL` in the result set.\n",
      },
      {
        question:
          "How do you use the HAVING clause and when is it different from WHERE?",
        solution:
          "The `HAVING` and `WHERE` clauses both filter data, but they operate at different stages of a query.\n\n* `WHERE` filters **individual rows** *before* any grouping occurs.\n* `HAVING` filters **groups of rows** *after* they have been aggregated by the `GROUP BY` clause.\n\n**Analogy:** Imagine baking cakes. 🎂\n* The **`WHERE`** clause is like choosing your ingredients. You decide *before* baking which ingredients to include (e.g., `WHERE flour_type = 'whole_wheat'`).\n* The **`HAVING`** clause is like choosing which of the finished cakes to keep. You filter *after* baking, based on a characteristic of the group (e.g., `HAVING weight_of_cake > 2`).\n\n### Example\nFind all departments with more than 10 employees who were hired after the year 2020.\n\n```sql\nSELECT \n    d.department_name,\n    COUNT(e.employee_id) as number_of_employees\nFROM \n    employees e\nJOIN \n    departments d ON e.department_id = d.department_id\nWHERE \n    e.hire_date > '2020-12-31'  -- Filters individual rows BEFORE grouping\nGROUP BY \n    d.department_name\nHAVING \n    COUNT(e.employee_id) > 10;  -- Filters the GROUPS AFTER grouping\n```\n\nIn this query:\n1.  **`WHERE`** first removes any employee hired in 2020 or earlier.\n2.  **`GROUP BY`** then groups the remaining employees by their department.\n3.  **`HAVING`** finally filters out any of those groups that don't have more than 10 employees.",
      },
      {
        question: "What is the purpose of the DISTINCT keyword?",
        solution:
          "The purpose of the `DISTINCT` keyword in a `SELECT` statement is to **remove duplicate rows** from the result set. It ensures that every row returned is unique. ✨\n\nWhen `DISTINCT` is applied to one or more columns, the query returns only the unique combinations of values for those columns.\n\n### Example: Single Column\nIf you want a list of all the unique cities where your customers live, you would use:\n```sql\nSELECT DISTINCT city\nFROM customers;\n```\nIf 'London' appears 10 times in the `city` column, this query will only return it once.\n\n### Example: Multiple Columns\nWhen used with multiple columns, `DISTINCT` returns the unique *combination* of those columns.\n```sql\nSELECT DISTINCT city, country\nFROM customers;\n```\nThis query will return rows like ('London', 'UK') and ('London', 'USA') as separate, unique rows because the combination of city and country is different.",
      },
      {
        question:
          "How do you update records based on values from another table?",
        solution:
          "You can update records in one table using values from another by joining the tables in the `UPDATE` statement. The syntax can vary slightly between database systems (like SQL Server vs. PostgreSQL), but the concept is the same.\n\n### Standard SQL Approach (PostgreSQL, SQL Server)\nThe most common method involves a `FROM` clause in the `UPDATE` statement to perform a join.\n\n**Scenario:** You have a `products` table and a `price_updates` table. You need to update the `price` in the `products` table with the `new_price` from `price_updates`.\n\n```sql\nUPDATE products p\nSET price = pu.new_price\nFROM price_updates pu\nWHERE p.product_id = pu.product_id;\n```\n\n**How it Works:**\n1.  `UPDATE products p`: Specifies the target table to be updated.\n2.  `SET price = pu.new_price`: Defines the column to update and the new value it should take from the source table.\n3.  `FROM price_updates pu`: Specifies the source table.\n4.  `WHERE p.product_id = pu.product_id`: This is the join condition that links the target row to the correct source row.\n\nSome database systems, like Oracle, use a slightly different syntax involving a correlated subquery in the `SET` clause.",
      },
      {
        question:
          "What is the difference between COUNT(*) and COUNT(column_name)?",
        solution:
          "Both `COUNT(*)` and `COUNT(column_name)` are aggregate functions used to count rows, but they differ in how they handle `NULL` values.\n\n--- \n\n### `COUNT(*)`\nThis function counts the **total number of rows** in a table or a group. It does not consider the values within the columns at all; it simply counts rows.\n\n**Example:**\n```sql\nSELECT COUNT(*) FROM employees;\n```\nThis will return the total number of employees in the table, regardless of whether some of their information is missing.\n\n--- \n\n### `COUNT(column_name)`\nThis function counts the number of rows where the specified `column_name` has a **non-NULL value**. It ignores any rows where that specific column is `NULL`.\n\n**Example:**\nSuppose you have an `employees` table where the `manager_id` column is `NULL` for employees who don't have a manager.\n```sql\nSELECT COUNT(manager_id) FROM employees;\n```\nThis will return the number of employees who are assigned a manager, excluding any where `manager_id` is `NULL`.\n\n**In summary:** Use `COUNT(*)` to get the total row count, and use `COUNT(column_name)` when you want to count entries that have a specific piece of data present.",
      },
      {
        question: "Explain the concept of database normalization.",
        solution:
          "Database normalization is the process of organizing columns and tables in a relational database to **minimize data redundancy** and improve data integrity. The goal is to ensure that data is stored logically and that dependencies are enforced correctly. 📚\n\nBy reducing redundancy, you avoid issues like:\n* **Update Anomalies:** Having to change the same piece of data in multiple places.\n* **Insertion Anomalies:** Being unable to add a record because some related data is missing.\n* **Deletion Anomalies:** Accidentally losing data because deleting one record removes related information.\n\nNormalization is typically broken down into different **Normal Forms (NF)**:\n\n1.  **First Normal Form (1NF):**\n    * Ensures a table has a primary key.\n    * Eliminates repeating groups of columns.\n    * Ensures that values in each column are atomic (indivisible).\n\n2.  **Second Normal Form (2NF):**\n    * Must be in 1NF.\n    * All non-key attributes must be fully dependent on the entire primary key. (This is mainly relevant for tables with composite primary keys).\n\n3.  **Third Normal Form (3NF):**\n    * Must be in 2NF.\n    * Eliminates transitive dependencies. This means no non-key attribute should be dependent on another non-key attribute.\n\nFor most applications, achieving **3NF** provides a good balance between data integrity and performance.",
      },
      {
        question: "How do you create indexes and when should you use them?",
        solution:
          "An **index** is a database object that improves the speed of data retrieval operations on a table. It works like the index in the back of a book; instead of searching through the entire book (the table), the database can use the index to find the location of the data quickly. 📖\n\n### How to Create an Index\n\nThe syntax is straightforward:\n```sql\nCREATE INDEX index_name\nON table_name (column1, column2, ...);\n```\n\n**Example:** To create an index on the `last_name` column of an `employees` table to speed up searches by last name:\n```sql\nCREATE INDEX idx_employees_lastname\nON employees (last_name);\n```\n\n### When to Use Indexes\nYou should create indexes on:\n* **Columns frequently used in `WHERE` clauses:** This is the most common reason. If you often filter by a specific column, an index will make those queries much faster.\n* **Columns used in `JOIN` conditions:** Indexes on foreign key columns dramatically speed up join operations.\n* **Columns used in `ORDER BY` or `GROUP BY` clauses:** An index can help the database retrieve data in a sorted order without having to perform a separate sort operation.\n\n### The Trade-off\nWhile indexes speed up read operations (`SELECT`), they **slow down write operations** (`INSERT`, `UPDATE`, `DELETE`). This is because every time you modify the data in the table, the database must also update the index. Therefore, you should avoid over-indexing tables that have frequent write operations.",
      },
      {
        question: "What is a self-join and provide a real-world use case.",
        solution:
          "A **self-join** is a regular join, but it involves joining a table to **itself**. To do this, you must use table aliases to give the table two different temporary names so that the database can handle it as if they were two separate tables. 🎭\n\n### Real-World Use Case: Employee-Manager Hierarchy\nA classic example is an `employees` table where each employee has a `manager_id` that refers to the `employee_id` of another employee in the *same table*. A self-join can be used to display each employee's name alongside their manager's name.\n\n**Table Structure (`employees`):**\n\n| employee_id | employee_name | manager_id |\n|-------------|---------------|------------|\n| 1           | Alice         | 3          |\n| 2           | Bob           | 3          |\n| 3           | Charlie       | NULL       |\n\n\n**Query:**\n```sql\nSELECT\n    e.employee_name AS EmployeeName,\n    m.employee_name AS ManagerName\nFROM\n    employees e\nLEFT JOIN\n    employees m ON e.manager_id = m.employee_id;\n```\n\n**How it Works:**\n1.  We refer to the `employees` table twice, giving it two aliases: `e` (for the employee) and `m` (for the manager).\n2.  We perform a `LEFT JOIN` from `e` to `m`.\n3.  The join condition `e.manager_id = m.employee_id` matches the employee's `manager_id` with their manager's `employee_id`.\n4.  A `LEFT JOIN` is used to include employees who don't have a manager (like the CEO), where the `ManagerName` would be `NULL`.",
      },
      {
        question: "How do you handle NULL values in aggregate functions?",
        solution:
          "Aggregate functions in SQL are designed to handle `NULL` values in a specific way: they simply **ignore them** during calculation. This is a critical behavior to understand as it can affect your results. 🤔\n\nHere's how the common aggregate functions behave:\n\n* `COUNT(column_name)`: Counts only the non-`NULL` values in the specified column.\n* `COUNT(*)`: Counts all rows, regardless of `NULL` values.\n* `SUM(column_name)`: Calculates the sum of all non-`NULL` values.\n* `MAX(column_name)`: Finds the maximum value among all non-`NULL` entries.\n* `MIN(column_name)`: Finds the minimum value among all non-`NULL` entries.\n* `AVG(column_name)`: Calculates the average of all non-`NULL` values. This one can be tricky! The average is `SUM(column_name) / COUNT(column_name)`, not `SUM(column_name) / COUNT(*)`. \n\n### Handling `NULL`s explicitly\nIf you want to treat `NULL`s as a specific value (like zero) in your calculations, you must do so explicitly using a function like `COALESCE` or `ISNULL`.\n\n**Example:** To calculate an average salary where `NULL` salaries are treated as `0`:\n```sql\n-- This will give an incorrect average if NULLs should be included as 0\nSELECT AVG(salary) FROM employees;\n\n-- This correctly treats NULL salaries as 0 in the calculation\nSELECT AVG(COALESCE(salary, 0)) FROM employees;\n```\nThe `COALESCE(salary, 0)` function returns the salary if it's not `NULL`, otherwise it returns `0`.",
      },
      {
        question:
          "Write a query to find records that exist in one table but not another.",
        solution:
          "Finding records that exist in one table but not a second is a common task, often used for data reconciliation. There are two primary, efficient methods to achieve this: `LEFT JOIN` with a `NULL` check, and `NOT EXISTS`.\n\n**Scenario:** Find all customers in the `Customers` table who have never placed an order in the `Orders` table.\n\n### Method 1: `LEFT JOIN ... WHERE IS NULL` (Most Common)\nThis is a very intuitive approach. You perform a `LEFT JOIN` from the first table to the second and then filter for rows where the primary key from the second (right) table is `NULL`, which indicates no match was found.\n\n```sql\nSELECT c.*\nFROM Customers c\nLEFT JOIN Orders o ON c.CustomerID = o.CustomerID\nWHERE o.CustomerID IS NULL;\n```\n\n### Method 2: `NOT EXISTS`\nThis method uses a correlated subquery to check for the non-existence of a matching record. It can be more efficient in some database systems as it stops searching as soon as it confirms a record doesn't exist.\n\n```sql\nSELECT c.*\nFROM Customers c\nWHERE NOT EXISTS (\n    SELECT 1\n    FROM Orders o\n    WHERE o.CustomerID = c.CustomerID\n);\n```\nBoth queries will return the list of customers who have no corresponding entries in the `Orders` table. 🕵️‍♂️",
      },
      {
        question: "What is the difference between DELETE and TRUNCATE?",
        solution:
          "Both `DELETE` and `TRUNCATE` are used to remove data from a table, but they work in fundamentally different ways and have different implications.\n\n| Feature             | `DELETE`                                  | `TRUNCATE`                                       |\n|---------------------|-------------------------------------------|--------------------------------------------------|\n| **Type** | DML (Data Manipulation Language) command. | DDL (Data Definition Language) command.          |\n| **Operation** | Removes rows one by one.                  | Deallocates the data pages, a quick bulk delete. |\n| **`WHERE` Clause** | **Can** be used to delete specific rows.  | **Cannot** be used. It removes all rows.         |\n| **Speed** | Slower, as it logs each row deletion.     | Much faster, as it logs the page deallocation.   |\n| **Triggers** | Fires `DELETE` triggers for each row.     | Does **not** fire `DELETE` triggers.             |\n| **Transactions** | Can be rolled back.                       | Cannot be easily rolled back (some systems allow it). |\n| **Identity Reset** | Does not reset identity columns.          | Resets the table's identity column to its seed value. |\n\n**In summary:** Use **`DELETE`** when you need to remove specific rows or when you need the operation to be logged and reversible. Use **`TRUNCATE`** when you want to quickly delete all rows from a table and don't need row-level triggers or an easy rollback. 🔥",
      },
      {
        question:
          "How do you use string functions like SUBSTRING, CONCAT, and REPLACE?",
        solution:
          "String functions are essential for manipulating and cleaning text data in SQL. Here’s how three of the most common ones work:\n\n### `SUBSTRING()` (or `SUBSTR`)\nThis function extracts a part of a string.\n\n**Syntax:** `SUBSTRING(string, start_position, length)`\n\n**Example:** Extract the year from a date string 'YYYY-MM-DD'.\n```sql\nSELECT SUBSTRING('2025-08-21', 1, 4); -- Returns '2025'\n```\n\n--- \n\n### `CONCAT()`\nThis function joins two or more strings together.\n\n**Syntax:** `CONCAT(string1, string2, ...)`\n\n**Example:** Combine first and last names into a full name.\n```sql\nSELECT CONCAT(first_name, ' ', last_name) AS full_name FROM employees;\n-- Returns 'John Doe'\n```\n\n--- \n\n### `REPLACE()`\nThis function replaces all occurrences of a specified substring with another substring.\n\n**Syntax:** `REPLACE(original_string, substring_to_replace, new_substring)`\n\n**Example:** Standardize phone number formats.\n```sql\nSELECT REPLACE('123-456-7890', '-', ''); -- Returns '1234567890'\n```",
      },
      {
        question: "Explain the GROUP BY clause with multiple columns.",
        solution:
          "Using `GROUP BY` with multiple columns allows you to create hierarchical groups. It aggregates rows based on the **unique combination** of values in all the specified columns. 🗂️\n\nThink of it as creating groups, and then sub-groups within those groups.\n\n**How it Works:**\nThe database first groups all rows that have the same value in the first column. Then, within each of those primary groups, it creates sub-groups for all rows that have the same value in the second column, and so on.\n\n### Example\nImagine you want to count the number of orders for each product category in each sales region.\n\n```sql\nSELECT\n    region,\n    product_category,\n    COUNT(order_id) AS number_of_orders\nFROM\n    sales\nGROUP BY\n    region, product_category\nORDER BY\n    region, product_category;\n```\n\n**Result:**\nThis query will produce a summary showing the order count for every unique combination of `region` and `product_category`.\n\n| region    | product_category | number_of_orders |\n|-----------|------------------|------------------|\n| North     | Electronics      | 150              |\n| North     | Clothing         | 210              |\n| South     | Electronics      | 125              |\n| South     | Clothing         | 180              |",
      },
      {
        question: "How do you calculate running totals in SQL?",
        solution:
          "The modern and most efficient way to calculate running totals (also known as cumulative sums) in SQL is by using **window functions**, specifically `SUM() OVER (...)`.\n\nThis approach avoids complex self-joins and provides a clean, readable solution.\n\n### Syntax\n```sql\nSUM(column_to_sum) OVER (PARTITION BY grouping_column ORDER BY ordering_column)\n```\n* `PARTITION BY`: (Optional) This clause divides the rows into groups (e.g., by customer or department). The running total will restart for each new group.\n* `ORDER BY`: This clause is mandatory. It specifies the order in which the rows should be processed to calculate the cumulative sum.\n\n### Example\nCalculate the running total of sales for each day.\n\n```sql\nSELECT\n    sale_date,\n    daily_sales,\n    SUM(daily_sales) OVER (ORDER BY sale_date) AS running_total_sales\nFROM\n    daily_sales_summary;\n```\n\n**Result:**\n\n| sale_date  | daily_sales | running_total_sales |\n|------------|-------------|---------------------|\n| 2025-01-01 | 1000        | 1000                |\n| 2025-01-02 | 1500        | 2500                |\n| 2025-01-03 | 1200        | 3700                |\n| 2025-01-04 | 2000        | 5700                |\n\nEach value in `running_total_sales` is the sum of the `daily_sales` for that day and all the preceding days. 📈",
      },
      {
        question: "What is the purpose of the CASE statement?",
        solution:
          "The `CASE` statement in SQL allows you to implement **if-then-else conditional logic** directly within your queries. Its purpose is to evaluate a series of conditions and return a specific value when the first condition is met. It's incredibly versatile for tasks like categorizing data, transforming values, or handling different scenarios in a single column. 🚦\n\n### How it Works\nThe statement goes through `WHEN` conditions in order. The first condition that evaluates to true determines the result. If no conditions are met, the value in the optional `ELSE` clause is returned. If `ELSE` is omitted, `NULL` is returned.\n\n### Example: Tiering Customers\nSuppose you want to categorize customers into tiers based on their total spending.\n\n```sql\nSELECT\n    customer_name,\n    total_spent,\n    CASE\n        WHEN total_spent > 5000 THEN 'Platinum'\n        WHEN total_spent > 1000 THEN 'Gold'\n        WHEN total_spent > 200  THEN 'Silver'\n        ELSE 'Bronze'\n    END AS customer_tier\nFROM\n    customer_spending;\n```\nThis query doesn't just retrieve data; it creates a new, meaningful column (`customer_tier`) on the fly based on your business rules.",
      },
      {
        question: "How do you convert data types in SQL (CAST vs CONVERT)?",
        solution:
          "Both `CAST` and `CONVERT` are used to change an expression from one data type to another. The main difference between them is that `CAST` is an ANSI SQL standard, making it more portable across different database systems, while `CONVERT` is often specific to a particular database (like SQL Server) and can offer more formatting options.\n\n### `CAST()`\n* **Standard:** ANSI SQL-92 standard. Supported by most databases (PostgreSQL, MySQL, SQL Server, Oracle, etc.).\n* **Syntax:** `CAST (expression AS data_type)`\n* **Best For:** General-purpose data type conversions where portability is important.\n\n**Example:**\n```sql\nSELECT CAST('123' AS INT);\nSELECT CAST(150.55 AS DECIMAL(10, 2));\n```\n\n--- \n\n### `CONVERT()`\n* **Standard:** Not an ANSI standard. Its implementation is specific to the database system (most famously in SQL Server).\n* **Syntax:** `CONVERT (data_type, expression, [style_code])`\n* **Best For:** When you need specific formatting, especially for dates and times. The optional `style_code` argument allows you to define the output format.\n\n**Example (in SQL Server):**\n```sql\n-- Simple conversion\nSELECT CONVERT(INT, '123');\n\n-- Date formatting using a style code (103 = dd/mm/yyyy)\nSELECT CONVERT(VARCHAR, GETDATE(), 103); -- Returns something like '21/08/2025'\n```",
      },
      {
        question: "Write a query to find the top 10 customers by revenue.",
        solution:
          "To find the top 10 customers by revenue, you need to join the relevant tables, calculate the total revenue for each customer, sort them in descending order, and then take the top 10.\n\n**Assumed Tables:**\n* `Customers` (CustomerID, CustomerName)\n* `Orders` (OrderID, CustomerID)\n* `OrderDetails` (OrderID, ProductID, Quantity, UnitPrice)\n\n### The Query\n```sql\nSELECT\n    c.CustomerName,\n    SUM(od.Quantity * od.UnitPrice) AS TotalRevenue\nFROM\n    Customers c\nJOIN\n    Orders o ON c.CustomerID = o.CustomerID\nJOIN\n    OrderDetails od ON o.OrderID = od.OrderID\nGROUP BY\n    c.CustomerID, c.CustomerName -- Group by ID for accuracy, Name for display\nORDER BY\n    TotalRevenue DESC\nLIMIT 10;\n```\n\n**Explanation:**\n1.  **`JOIN`**: We link `Customers` to `Orders` and then `Orders` to `OrderDetails` to connect customers to what they bought.\n2.  **`SUM(...)`**: We calculate the revenue for each line item (`Quantity * UnitPrice`) and then sum it up for each customer.\n3.  **`GROUP BY`**: This aggregates all the order details for each unique customer.\n4.  **`ORDER BY ... DESC`**: This sorts the customers from the highest revenue to the lowest.\n5.  **`LIMIT 10`**: This restricts the final output to only the top 10 results. (Note: In SQL Server, you would use `TOP 10` in the `SELECT` clause). 🏆",
      },
      {
        question: "Explain the difference between UNION and UNION ALL.",
        solution:
          "Both `UNION` and `UNION ALL` are used to combine the result sets of two or more `SELECT` statements. The key difference lies in how they handle duplicate rows.\n\nFor either operator to work, the columns in the `SELECT` statements must match in number, order, and have compatible data types.\n\n--- \n\n### `UNION`\n`UNION` combines the result sets and then **removes any duplicate rows**. Because it has to perform this extra step of checking for and eliminating duplicates, it is inherently slower than `UNION ALL`.\n\n**Example:** Get a unique list of all cities where customers and suppliers are located.\n```sql\nSELECT City FROM Customers\nUNION\nSELECT City FROM Suppliers;\n```\nIf 'Paris' is a city in both tables, it will appear **only once** in the final result.\n\n--- \n\n### `UNION ALL`\n`UNION ALL` combines the result sets and **includes all rows, including any duplicates**. It is faster because it simply appends one result set to the other without checking for duplicates.\n\n**Example:** Get a complete list of all customer and supplier cities.\n```sql\nSELECT City FROM Customers\nUNION ALL\nSELECT City FROM Suppliers;\n```\nIf 'Paris' is in both tables, it will appear **twice** in the final result.\n\n**Guideline:** If you know for sure that your result sets have no duplicates or if the duplicates don't matter, always use `UNION ALL` for better performance. ⚡️",
      },
      {
        question: "How do you use subqueries in the SELECT statement?",
        solution:
          "A subquery used in a `SELECT` clause is called a **scalar subquery**. Its defining characteristic is that it **must return a single value** (i.e., one row with one column). This single value is then included as a column in the result set of the outer query.\n\nScalar subqueries are useful for retrieving an aggregated value related to each row in the outer query.\n\n### Example\nLet's say you want to get a list of all employees and, for each employee, also show the total number of orders they have processed.\n\n```sql\nSELECT\n    e.EmployeeID,\n    e.FirstName,\n    e.LastName,\n    (SELECT COUNT(o.OrderID)\n     FROM Orders o\n     WHERE o.EmployeeID = e.EmployeeID) AS TotalOrdersProcessed\nFROM\n    Employees e;\n```\n\n**How it Works:**\nFor each row being processed in the outer query (for each employee `e`), the inner query (the subquery) is executed. It filters the `Orders` table for that specific employee (`WHERE o.EmployeeID = e.EmployeeID`) and returns the count of their orders. This count becomes the value for the `TotalOrdersProcessed` column for that employee's row.\n\n**Caution:** Scalar subqueries can be inefficient because they may execute once for every row in the outer query's result set. Often, a `LEFT JOIN` with `GROUP BY` can achieve the same result more performantly.",
      },
      {
        question: "What is a correlated subquery and when would you use it?",
        solution:
          "A **correlated subquery** is an inner query that depends on the outer query for its values. Unlike a regular subquery that runs once, a correlated subquery is evaluated **once for each row** processed by the outer query. It uses values from the outer query's current row to filter its own results. 🔄\n\nThis 'correlation' between the inner and outer queries is what defines it.\n\n### When to Use It\nYou use a correlated subquery when you need to answer a question that depends on the specific row being examined in the outer query. A classic use case is comparing a value in a row to an aggregate value of a group that the row belongs to.\n\n### Example\nFind all employees whose salary is higher than the average salary of their **own department**.\n\n```sql\nSELECT\n    e1.EmployeeName,\n    e1.Salary,\n    e1.DepartmentID\nFROM\n    Employees e1\nWHERE\n    e1.Salary > (SELECT AVG(e2.Salary)\n                 FROM Employees e2\n                 WHERE e2.DepartmentID = e1.DepartmentID);\n```\n\n**How it Works:**\n1.  The outer query gets a row for an employee, let's say 'Alice' in Department 10 (`e1`).\n2.  The inner subquery then runs, but it uses `e1.DepartmentID` (which is 10) from the outer query's current row.\n3.  The subquery calculates the average salary *only* for Department 10.\n4.  The `WHERE` clause of the outer query then compares Alice's salary to this calculated average.\n5.  The process repeats for the next employee in the outer query.\n\nWhile powerful, correlated subqueries can be slow. In many cases, they can be rewritten using joins or window functions for better performance.",
      },
      {
        question: "How do you find the oldest and newest records in a table?",
        solution:
          "You can find the oldest and newest records in a table, typically based on a date or timestamp column, using a couple of simple methods.\n\n**Scenario:** Find the first and most recent order dates from an `Orders` table with an `OrderDate` column.\n\n### Method 1: Using `MIN()` and `MAX()` Aggregate Functions\nThis is the most direct way to find the oldest and newest dates themselves.\n\n```sql\nSELECT\n    MIN(OrderDate) AS FirstOrderDate,\n    MAX(OrderDate) AS MostRecentOrderDate\nFROM\n    Orders;\n```\nThis gives you the two dates but not the full records associated with them.\n\n--- \n\n### Method 2: Using `ORDER BY` and `LIMIT`\nTo get the entire record for the oldest or newest entry, you can sort the table and take the first row.\n\n**To find the oldest record:**\n```sql\nSELECT *\nFROM Orders\nORDER BY OrderDate ASC\nLIMIT 1;\n```\n\n**To find the newest record:**\n```sql\nSELECT *\nFROM Orders\nORDER BY OrderDate DESC\nLIMIT 1;\n```\n(Note: In SQL Server, you would use `SELECT TOP 1 * ...` instead of `LIMIT 1`). This method is great for retrieving the full details of that specific record.",
      },
      {
        question: "Write a query to calculate monthly sales totals.",
        solution:
          "To calculate monthly sales totals, you need to extract the year and month from a date column, and then use `SUM()` and `GROUP BY` to aggregate the sales data for each of those periods.\n\n**Assumed Table:** `Sales` (SaleID, SaleDate, SaleAmount)\n\nThe exact function to extract the date parts can vary by SQL dialect.\n\n### Example (using standard SQL functions)\nMany databases support `EXTRACT` or similar functions.\n\n```sql\nSELECT\n    EXTRACT(YEAR FROM SaleDate) AS SalesYear,\n    EXTRACT(MONTH FROM SaleDate) AS SalesMonth,\n    SUM(SaleAmount) AS TotalMonthlySales\nFROM\n    Sales\nGROUP BY\n    EXTRACT(YEAR FROM SaleDate),\n    EXTRACT(MONTH FROM SaleDate)\nORDER BY\n    SalesYear, SalesMonth;\n```\n\n### Example (using `DATE_TRUNC` - PostgreSQL/others)\n`DATE_TRUNC` is often a cleaner way to group by a time period as it truncates the date to the beginning of the specified interval (e.g., the first day of the month).\n\n```sql\nSELECT\n    DATE_TRUNC('month', SaleDate)::DATE AS SalesMonth,\n    SUM(SaleAmount) AS TotalMonthlySales\nFROM\n    Sales\nGROUP BY\n    SalesMonth\nORDER BY\n    SalesMonth;\n```\nThis query groups all sales from the same month and year together and calculates their sum, giving you a clear monthly sales report. 📅",
      },
      {
        question: "What is the purpose of the BETWEEN operator?",
        solution:
          "The `BETWEEN` operator in SQL is used to filter results within a specific range. It's a convenient shorthand for a pair of `AND` conditions.\n\nThe range is **inclusive**, meaning it includes the start and end values.\n\n### Syntax\n```sql\nWHERE column_name BETWEEN value1 AND value2;\n```\nThis is equivalent to:\n```sql\nWHERE column_name >= value1 AND column_name <= value2;\n```\n\n### Example\nTo find all products with a price between $50 and $100, inclusive:\n```sql\nSELECT\n    ProductName,\n    Price\nFROM\n    Products\nWHERE\n    Price BETWEEN 50 AND 100;\n```\nThis is much more readable and concise than writing:\n```sql\nSELECT\n    ProductName,\n    Price\nFROM\n    Products\nWHERE\n    Price >= 50 AND Price <= 100;\n```\nThe `BETWEEN` operator can be used with numbers, text, and dates.",
      },
      {
        question: "How do you use the LIKE operator for pattern matching?",
        solution:
          "The `LIKE` operator is used in a `WHERE` clause to search for a specified pattern in a column. It's an essential tool for flexible string searches. `LIKE` uses two main wildcard characters:\n\n1.  **`%` (Percent Sign):** Represents zero, one, or multiple characters.\n2.  **`_` (Underscore):** Represents a single character.\n\n### Examples\n\n* **Find names that start with 'A':**\n    ```sql\n    SELECT * FROM Customers WHERE CustomerName LIKE 'A%';\n    -- Matches: 'Alice', 'Anna', 'Anderson'\n    ```\n\n* **Find names that end with 'son':**\n    ```sql\n    SELECT * FROM Customers WHERE CustomerName LIKE '%son';\n    -- Matches: 'Johnson', 'Peterson'\n    ```\n\n* **Find names that contain 'oh':**\n    ```sql\n    SELECT * FROM Customers WHERE CustomerName LIKE '%oh%';\n    -- Matches: 'John', 'Johnson', 'Mohr'\n    ```\n\n* **Find names that are exactly 4 letters long and start with 'J':**\n    ```sql\n    SELECT * FROM Customers WHERE CustomerName LIKE 'J___';\n    -- Matches: 'John', 'Jane'\n    ```\n\n* **Find names that start with 'S' and have 'n' as the third letter:**\n    ```sql\n    SELECT * FROM Customers WHERE CustomerName LIKE 'S_n%';\n    -- Matches: 'Sun', 'Sanjay'\n    ```",
      },
      {
        question: "Explain the concept of referential integrity.",
        solution:
          "Referential integrity is a core concept in relational databases that ensures relationships between tables remain consistent. It is a set of rules, enforced by the database, that prevents users from entering inconsistent data. ⛓️\n\nThe primary mechanism for enforcing referential integrity is the **foreign key** constraint.\n\n### Key Rules of Referential Integrity\n1.  **Prevents Orphan Records:** A foreign key in one table must match a primary key in another table, or it must be `NULL`. This rule prevents you from adding a record to a related table unless a corresponding record exists in the primary table. For example, you can't create an `Order` for a `CustomerID` that doesn't exist in the `Customers` table.\n2.  **Governs Deletions:** It dictates what happens when you try to delete a record that has other records referencing it. You can't delete a customer from the `Customers` table if they still have orders in the `Orders` table (unless you have a cascading delete rule set up).\n3.  **Governs Updates:** Similarly, you typically can't change a primary key value in a primary table if that key is being referenced by records in another table.\n\nBy enforcing these rules, referential integrity guarantees that the links between your data are always valid and reliable, preventing data corruption.",
      },
      {
        question: "How do you add and remove columns from existing tables?",
        solution:
          "You can add and remove columns from an existing table using the `ALTER TABLE` statement. This is a common Data Definition Language (DDL) operation for modifying a table's structure.\n\n### Adding a Column\nTo add a new column, you specify the table name, the new column name, and its data type.\n\n**Syntax:**\n```sql\nALTER TABLE table_name\nADD COLUMN new_column_name data_type [constraints];\n```\n\n**Example:** Add a `PhoneNumber` column to the `Employees` table.\n```sql\nALTER TABLE Employees\nADD COLUMN PhoneNumber VARCHAR(20);\n```\n\n--- \n\n### Removing (Dropping) a Column\nTo remove an existing column, you specify the table name and the name of the column you want to delete.\n\n**Caution:** Dropping a column is a destructive and often irreversible action that will permanently delete all data within that column. ⚠️\n\n**Syntax:**\n```sql\nALTER TABLE table_name\nDROP COLUMN column_name;\n```\n\n**Example:** Remove the `PhoneNumber` column from the `Employees` table.\n```sql\nALTER TABLE Employees\nDROP COLUMN PhoneNumber;\n```",
      },
      {
        id: 1,
        question: "What is the difference between CHAR and VARCHAR data types?",
        solution: `CHAR and VARCHAR are both string data types but with key differences:

CHAR:
- Fixed-length character string
- Always uses the declared length (padded with spaces if needed)
- Faster for fixed-length data (phone numbers, ZIP codes, status codes)
- Maximum length: 255 characters (varies by DBMS)
- Storage: Uses full declared length regardless of actual content

VARCHAR:
- Variable-length character string
- Uses only the space needed for actual content (plus length overhead)
- More storage-efficient for variable-length data (names, addresses, descriptions)
- Maximum length: Typically 65,535 characters (varies by DBMS)
- Storage: Content length + 1-2 bytes for length information

Example usage:
- CHAR(10) storing 'ABC' uses 10 bytes: 'ABC       ' (with 7 spaces)
- VARCHAR(10) storing 'ABC' uses 4 bytes: length byte + 'ABC'

Performance considerations:
- CHAR is faster for exact-length comparisons and fixed patterns
- VARCHAR is more storage-efficient for variable-length data
- CHAR may perform better for frequently updated columns with fixed lengths`,
      },
      {
        id: 2,
        question:
          "Write a query to identify customers who haven't placed orders in the last 6 months",
        solution: `-- Using current date as reference
SELECT 
    c.customer_id,
    c.customer_name,
    c.email,
    MAX(o.order_date) as last_order_date,
    DATEDIFF(CURDATE(), MAX(o.order_date)) as days_since_last_order
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name, c.email
HAVING MAX(o.order_date) IS NULL 
    OR MAX(o.order_date) < DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
ORDER BY last_order_date DESC;

-- Alternative using subquery for better performance with large datasets
SELECT 
    c.customer_id,
    c.customer_name,
    c.email
FROM customers c
WHERE NOT EXISTS (
    SELECT 1 
    FROM orders o 
    WHERE o.customer_id = c.customer_id 
    AND o.order_date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
)
OR c.customer_id NOT IN (
    SELECT DISTINCT customer_id 
    FROM orders
);

-- For databases without DATE_SUB function (using date arithmetic)
SELECT 
    c.customer_id,
    c.customer_name,
    c.email
FROM customers c
LEFT JOIN (
    SELECT customer_id, MAX(order_date) as last_order
    FROM orders
    GROUP BY customer_id
) recent_orders ON c.customer_id = recent_orders.customer_id
WHERE recent_orders.last_order IS NULL 
    OR recent_orders.last_order < CURRENT_DATE - INTERVAL '6 months';`,
      },
      {
        id: 3,
        question: "How do you calculate year-over-year growth using SQL?",
        solution: `-- Calculate YoY growth for monthly sales
WITH monthly_sales AS (
    SELECT 
        EXTRACT(YEAR FROM order_date) as year,
        EXTRACT(MONTH FROM order_date) as month,
        SUM(sales_amount) as total_sales
    FROM orders
    GROUP BY EXTRACT(YEAR FROM order_date), EXTRACT(MONTH FROM order_date)
),
yoy_comparison AS (
    SELECT 
        year,
        month,
        total_sales as current_sales,
        LAG(total_sales, 12) OVER (ORDER BY year, month) as previous_year_sales
    FROM monthly_sales
)
SELECT 
    year,
    month,
    current_sales,
    previous_year_sales,
    ROUND(
        ((current_sales - previous_year_sales) / previous_year_sales) * 100, 
        2
    ) as yoy_growth_percent,
    CASE 
        WHEN previous_year_sales IS NULL THEN 'No previous data'
        WHEN current_sales > previous_year_sales THEN 'Growth'
        ELSE 'Decline'
    END as growth_status
FROM yoy_comparison
ORDER BY year, month;

-- Alternative for specific metric comparison
SELECT 
    current_year.year,
    current_year.metric,
    current_year.value as current_value,
    previous_year.value as previous_value,
    ROUND(
        ((current_year.value - previous_year.value) / previous_year.value) * 100, 
        2
    ) as yoy_growth_percent
FROM metrics current_year
LEFT JOIN metrics previous_year 
    ON current_year.metric = previous_year.metric 
    AND current_year.year = previous_year.year + 1
WHERE current_year.period = 'annual';`,
      },
      {
        id: 4,
        question: "Write a query to find the median salary in each department",
        solution: `-- Method 1: Using PERCENTILE_CONT (available in PostgreSQL, SQL Server, BigQuery)
SELECT 
    department,
    PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY salary) as median_salary
FROM employees
GROUP BY department;

-- Method 2: Using window functions (works in most databases)
WITH ranked_salaries AS (
    SELECT 
        department,
        salary,
        ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary) as row_num,
        COUNT(*) OVER (PARTITION BY department) as total_count
    FROM employees
    WHERE salary IS NOT NULL
)
SELECT 
    department,
    AVG(salary) as median_salary
FROM ranked_salaries
WHERE row_num IN (
    FLOOR((total_count + 1) / 2), 
    CEIL((total_count + 1) / 2)
)
GROUP BY department;

-- Method 3: Using self-join for databases without window functions
SELECT 
    e1.department,
    AVG(e1.salary) as median_salary
FROM employees e1
JOIN employees e2 ON e1.department = e2.department
GROUP BY e1.department, e1.salary
HAVING SUM(CASE WHEN e2.salary <= e1.salary THEN 1 ELSE 0 END) >= COUNT(*)/2
   AND SUM(CASE WHEN e2.salary >= e1.salary THEN 1 ELSE 0 END) >= COUNT(*)/2
GROUP BY e1.department;`,
      },
      {
        id: 5,
        question:
          "How do you identify and remove duplicate records while keeping the most recent?",
        solution: `-- Step 1: Identify duplicates
SELECT 
    customer_id, 
    email, 
    COUNT(*) as duplicate_count,
    MAX(created_at) as most_recent
FROM customers
GROUP BY customer_id, email
HAVING COUNT(*) > 1;

-- Step 2: Create a temporary table with unique records
CREATE TEMPORARY TABLE unique_customers AS
SELECT DISTINCT ON (customer_id, email) *
FROM customers
ORDER BY customer_id, email, created_at DESC;

-- Alternative using window functions
WITH ranked_customers AS (
    SELECT *,
        ROW_NUMBER() OVER (
            PARTITION BY customer_id, email 
            ORDER BY created_at DESC
        ) as rn
    FROM customers
)
SELECT * 
INTO temp_unique_customers
FROM ranked_customers
WHERE rn = 1;

-- Step 3: Delete duplicates and reinsert unique records
BEGIN TRANSACTION;

-- Delete all duplicates
DELETE FROM customers 
WHERE (customer_id, email, created_at) NOT IN (
    SELECT customer_id, email, MAX(created_at)
    FROM customers
    GROUP BY customer_id, email
);

-- Or using CTID (PostgreSQL) or ROWID (Oracle) for exact row identification
DELETE FROM customers
WHERE ctid IN (
    SELECT ctid
    FROM (
        SELECT ctid,
            ROW_NUMBER() OVER (
                PARTITION BY customer_id, email 
                ORDER BY created_at DESC
            ) as rn
        FROM customers
    ) ranked
    WHERE rn > 1
);

COMMIT;

-- Step 4: Add unique constraint to prevent future duplicates
ALTER TABLE customers
ADD CONSTRAINT unique_customer_email UNIQUE (customer_id, email);`,
      },
      {
        id: 6,
        question:
          "Write a query to calculate the cumulative sum of sales by date",
        solution: `-- Using window functions (modern approach)
SELECT 
    order_date,
    SUM(sales_amount) as daily_sales,
    SUM(SUM(sales_amount)) OVER (
        ORDER BY order_date 
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) as cumulative_sales
FROM orders
GROUP BY order_date
ORDER BY order_date;

-- Alternative for databases without window functions
SELECT 
    o1.order_date,
    SUM(o1.sales_amount) as daily_sales,
    (
        SELECT SUM(o2.sales_amount)
        FROM orders o2
        WHERE o2.order_date <= o1.order_date
    ) as cumulative_sales
FROM orders o1
GROUP BY o1.order_date
ORDER BY o1.order_date;

-- Cumulative sum by category and date
SELECT 
    category,
    order_date,
    SUM(sales_amount) as daily_sales,
    SUM(SUM(sales_amount)) OVER (
        PARTITION BY category
        ORDER BY order_date 
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) as cumulative_sales_by_category
FROM orders
GROUP BY category, order_date
ORDER BY category, order_date;

-- Using Common Table Expression for better readability
WITH daily_totals AS (
    SELECT 
        order_date,
        SUM(sales_amount) as daily_total
    FROM orders
    GROUP BY order_date
)
SELECT 
    order_date,
    daily_total,
    SUM(daily_total) OVER (ORDER BY order_date) as running_total
FROM daily_totals
ORDER BY order_date;`,
      },
      {
        id: 7,
        question: "How do you find consecutive login days for users?",
        solution: `-- Method using window functions and date difference
WITH login_groups AS (
    SELECT 
        user_id,
        login_date,
        login_date - INTERVAL '1 day' * 
            ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date) as grp
    FROM user_logins
    GROUP BY user_id, login_date  -- Remove duplicates for same day
),
consecutive_days AS (
    SELECT 
        user_id,
        grp,
        MIN(login_date) as start_date,
        MAX(login_date) as end_date,
        COUNT(*) as consecutive_days
    FROM login_groups
    GROUP BY user_id, grp
)
SELECT 
    user_id,
    MAX(consecutive_days) as max_consecutive_days,
    ARRAY_AGG(
        JSON_BUILD_OBJECT(
            'start_date', start_date,
            'end_date', end_date,
            'days', consecutive_days
        )
    ) as consecutive_periods
FROM consecutive_days
WHERE consecutive_days >= 3  -- Filter for meaningful streaks
GROUP BY user_id
ORDER BY max_consecutive_days DESC;

-- Alternative using LAG to find breaks in sequence
WITH login_sequence AS (
    SELECT 
        user_id,
        login_date,
        LAG(login_date) OVER (PARTITION BY user_id ORDER BY login_date) as prev_login,
        CASE 
            WHEN login_date - LAG(login_date) OVER (
                PARTITION BY user_id ORDER BY login_date
            ) = 1 THEN 0 
            ELSE 1 
        END as new_streak
    FROM (
        SELECT DISTINCT user_id, login_date
        FROM user_logins
    ) distinct_logins
),
streak_groups AS (
    SELECT 
        user_id,
        login_date,
        SUM(new_streak) OVER (PARTITION BY user_id ORDER BY login_date) as streak_id
    FROM login_sequence
)
SELECT 
    user_id,
    streak_id,
    MIN(login_date) as streak_start,
    MAX(login_date) as streak_end,
    COUNT(*) as consecutive_days
FROM streak_groups
GROUP BY user_id, streak_id
HAVING COUNT(*) >= 3
ORDER BY user_id, streak_start;`,
      },
      {
        id: 8,
        question:
          "Write a query to identify the top 5% of customers by spending",
        solution: `-- Using NTILE window function
WITH customer_spending AS (
    SELECT 
        customer_id,
        customer_name,
        SUM(order_amount) as total_spent,
        NTILE(20) OVER (ORDER BY SUM(order_amount) DESC) as percentile_group
    FROM orders o
    JOIN customers c ON o.customer_id = c.customer_id
    GROUP BY customer_id, customer_name
)
SELECT 
    customer_id,
    customer_name,
    total_spent,
    percentile_group,
    CASE 
        WHEN percentile_group = 1 THEN 'Top 5%'
        ELSE 'Other'
    END as customer_segment
FROM customer_spending
WHERE percentile_group = 1
ORDER BY total_spent DESC;

-- Alternative using PERCENT_RANK
WITH customer_spending AS (
    SELECT 
        customer_id,
        customer_name,
        SUM(order_amount) as total_spent,
        PERCENT_RANK() OVER (ORDER BY SUM(order_amount) DESC) as percentile_rank
    FROM orders o
    JOIN customers c ON o.customer_id = c.customer_id
    GROUP BY customer_id, customer_name
)
SELECT 
    customer_id,
    customer_name,
    total_spent,
    ROUND(percentile_rank * 100, 2) as percentile,
    'Top 5% Spender' as segment
FROM customer_spending
WHERE percentile_rank <= 0.05
ORDER BY total_spent DESC;

-- Using COUNT and mathematical calculation
WITH customer_ranking AS (
    SELECT 
        customer_id,
        customer_name,
        SUM(order_amount) as total_spent,
        ROW_NUMBER() OVER (ORDER BY SUM(order_amount) DESC) as rank,
        COUNT(*) OVER () as total_customers
    FROM orders o
    JOIN customers c ON o.customer_id = c.customer_id
    GROUP BY customer_id, customer_name
)
SELECT 
    customer_id,
    customer_name,
    total_spent,
    rank,
    total_customers,
    ROUND((rank::decimal / total_customers) * 100, 2) as top_percentage
FROM customer_ranking
WHERE rank <= CEIL(total_customers * 0.05)
ORDER BY rank;`,
      },
      {
        id: 9,
        question: "How do you calculate retention rates using SQL?",
        solution: `-- Calculate monthly retention rate
WITH user_cohorts AS (
    SELECT 
        user_id,
        DATE_TRUNC('month', MIN(created_at)) as cohort_month
    FROM users
    GROUP BY user_id
),
monthly_activity AS (
    SELECT 
        u.user_id,
        c.cohort_month,
        DATE_TRUNC('month', a.activity_date) as activity_month,
        EXTRACT(MONTH FROM AGE(
            DATE_TRUNC('month', a.activity_date), 
            c.cohort_month
        )) as months_since_cohort
    FROM users u
    JOIN user_cohorts c ON u.user_id = c.user_id
    JOIN user_activities a ON u.user_id = a.user_id
    WHERE a.activity_date >= c.cohort_month
),
cohort_size AS (
    SELECT 
        cohort_month,
        COUNT(DISTINCT user_id) as total_users
    FROM user_cohorts
    GROUP BY cohort_month
),
retention_data AS (
    SELECT 
        cohort_month,
        months_since_cohort,
        COUNT(DISTINCT user_id) as active_users
    FROM monthly_activity
    GROUP BY cohort_month, months_since_cohort
)
SELECT 
    r.cohort_month,
    c.total_users as cohort_size,
    r.months_since_cohort,
    r.active_users,
    ROUND(
        (r.active_users::decimal / c.total_users) * 100, 
        2
    ) as retention_rate_percent
FROM retention_data r
JOIN cohort_size c ON r.cohort_month = c.cohort_month
ORDER BY r.cohort_month, r.months_since_cohort;

-- Simplified version for specific time period
SELECT 
    DATE_TRUNC('month', u.created_at) as signup_month,
    COUNT(DISTINCT u.user_id) as total_signups,
    COUNT(DISTINCT a.user_id) as active_this_month,
    ROUND(
        (COUNT(DISTINCT a.user_id)::decimal / COUNT(DISTINCT u.user_id)) * 100, 
        2
    ) as monthly_retention_rate
FROM users u
LEFT JOIN user_activities a ON u.user_id = a.user_id
    AND DATE_TRUNC('month', a.activity_date) = DATE_TRUNC('month', u.created_at) + INTERVAL '1 month'
WHERE u.created_at >= '2023-01-01'
GROUP BY DATE_TRUNC('month', u.created_at)
ORDER BY signup_month;`,
      },
      {
        id: 10,
        question:
          "Write a query to find the first and last transaction per customer",
        solution: `-- Using window functions (most efficient)
SELECT 
    customer_id,
    transaction_id,
    transaction_date,
    amount,
    CASE 
        WHEN first_transaction = 1 THEN 'First'
        WHEN last_transaction = 1 THEN 'Last'
        ELSE 'Middle'
    END as transaction_type
FROM (
    SELECT 
        customer_id,
        transaction_id,
        transaction_date,
        amount,
        ROW_NUMBER() OVER (
            PARTITION BY customer_id 
            ORDER BY transaction_date
        ) as first_transaction,
        ROW_NUMBER() OVER (
            PARTITION BY customer_id 
            ORDER BY transaction_date DESC
        ) as last_transaction
    FROM transactions
) ranked
WHERE first_transaction = 1 OR last_transaction = 1
ORDER BY customer_id, transaction_date;

-- Alternative using aggregate functions
SELECT 
    t.customer_id,
    t.transaction_id as first_transaction_id,
    t.transaction_date as first_transaction_date,
    t.amount as first_amount,
    last_t.transaction_id as last_transaction_id,
    last_t.transaction_date as last_transaction_date,
    last_t.amount as last_amount
FROM transactions t
JOIN (
    SELECT 
        customer_id,
        MIN(transaction_date) as first_date
    FROM transactions
    GROUP BY customer_id
) first ON t.customer_id = first.customer_id AND t.transaction_date = first.first_date
JOIN (
    SELECT 
        customer_id,
        MAX(transaction_date) as last_date
    FROM transactions
    GROUP BY customer_id
) last ON t.customer_id = last.customer_id
JOIN transactions last_t ON last.customer_id = last_t.customer_id 
    AND last.last_date = last_t.transaction_date;

-- Using FIRST_VALUE and LAST_VALUE window functions
SELECT DISTINCT
    customer_id,
    FIRST_VALUE(transaction_id) OVER (
        PARTITION BY customer_id 
        ORDER BY transaction_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) as first_transaction_id,
    FIRST_VALUE(transaction_date) OVER (
        PARTITION BY customer_id 
        ORDER BY transaction_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) as first_transaction_date,
    LAST_VALUE(transaction_id) OVER (
        PARTITION BY customer_id 
        ORDER BY transaction_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) as last_transaction_id,
    LAST_VALUE(transaction_date) OVER (
        PARTITION BY customer_id 
        ORDER BY transaction_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) as last_transaction_date
FROM transactions;`,
      },
      {
        id: 11,
        question: "How do you identify seasonality patterns in sales data?",
        solution: `-- Analyze sales by month to identify seasonal patterns
WITH monthly_sales AS (
    SELECT 
        EXTRACT(YEAR FROM order_date) as year,
        EXTRACT(MONTH FROM order_date) as month,
        TO_CHAR(order_date, 'Month') as month_name,
        SUM(sales_amount) as total_sales,
        COUNT(*) as order_count
    FROM orders
    GROUP BY EXTRACT(YEAR FROM order_date), EXTRACT(MONTH FROM order_date), TO_CHAR(order_date, 'Month')
),
monthly_avg AS (
    SELECT 
        month,
        month_name,
        AVG(total_sales) as avg_monthly_sales,
        AVG(order_count) as avg_monthly_orders,
        STDDEV(total_sales) as sales_stddev,
        MIN(total_sales) as min_sales,
        MAX(total_sales) as max_sales
    FROM monthly_sales
    GROUP BY month, month_name
)
SELECT 
    m.month,
    m.month_name,
    m.avg_monthly_sales,
    m.avg_monthly_orders,
    ROUND(
        (m.avg_monthly_sales / (SELECT AVG(avg_monthly_sales) FROM monthly_avg) - 1) * 100, 
        2
    ) as sales_deviation_percent,
    CASE 
        WHEN m.avg_monthly_sales > (SELECT AVG(avg_monthly_sales) FROM monthly_avg) * 1.2 
            THEN 'Peak Season'
        WHEN m.avg_monthly_sales < (SELECT AVG(avg_monthly_sales) FROM monthly_avg) * 0.8 
            THEN 'Low Season'
        ELSE 'Normal Season'
    END as seasonality_classification
FROM monthly_avg m
ORDER BY m.month;

-- Additional analysis: Day of week patterns
SELECT 
    EXTRACT(DOW FROM order_date) as day_of_week,
    TO_CHAR(order_date, 'Day') as day_name,
    AVG(sales_amount) as avg_daily_sales,
    COUNT(*) as total_orders,
    SUM(sales_amount) as total_sales
FROM orders
GROUP BY EXTRACT(DOW FROM order_date), TO_CHAR(order_date, 'Day')
ORDER BY day_of_week;

-- Time series decomposition using moving averages
SELECT 
    order_date,
    sales_amount,
    AVG(sales_amount) OVER (
        ORDER BY order_date 
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) as weekly_moving_avg,
    AVG(sales_amount) OVER (
        ORDER BY order_date 
        ROWS BETWEEN 29 PRECEDING AND CURRENT ROW
    ) as monthly_moving_avg
FROM (
    SELECT 
        order_date,
        SUM(sales_amount) as sales_amount
    FROM orders
    GROUP BY order_date
) daily_sales
ORDER BY order_date;`,
      },
      {
        id: 12,
        question:
          "Write a query to calculate moving averages over 7-day windows",
        solution: `-- Calculate 7-day moving average of daily sales
SELECT 
    order_date,
    daily_sales,
    AVG(daily_sales) OVER (
        ORDER BY order_date 
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) as moving_avg_7d,
    -- Additional metrics for context
    MIN(daily_sales) OVER (
        ORDER BY order_date 
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) as min_7d,
    MAX(daily_sales) OVER (
        ORDER BY order_date 
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) as max_7d
FROM (
    SELECT 
        order_date,
        SUM(sales_amount) as daily_sales
    FROM orders
    GROUP BY order_date
) daily_totals
ORDER BY order_date;

-- For databases that don't support window frame syntax
SELECT 
    d1.order_date,
    d1.daily_sales,
    (
        SELECT AVG(d2.daily_sales)
        FROM (
            SELECT order_date, SUM(sales_amount) as daily_sales
            FROM orders
            GROUP BY order_date
        ) d2
        WHERE d2.order_date BETWEEN d1.order_date - INTERVAL '6 days' 
            AND d1.order_date
    ) as moving_avg_7d
FROM (
    SELECT 
        order_date,
        SUM(sales_amount) as daily_sales
    FROM orders
    GROUP BY order_date
) d1
ORDER BY d1.order_date;

-- Moving average with handling for incomplete windows (beginning of dataset)
SELECT 
    order_date,
    daily_sales,
    CASE 
        WHEN row_num >= 7 THEN
            AVG(daily_sales) OVER (
                ORDER BY order_date 
                ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
            )
        ELSE
            AVG(daily_sales) OVER (
                ORDER BY order_date 
                ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
            )
    END as moving_avg_7d_adjusted
FROM (
    SELECT 
        order_date,
        SUM(sales_amount) as daily_sales,
        ROW_NUMBER() OVER (ORDER BY order_date) as row_num
    FROM orders
    GROUP BY order_date
) numbered_days
ORDER BY order_date;

-- Multiple moving averages for comparison
SELECT 
    order_date,
    daily_sales,
    AVG(daily_sales) OVER (
        ORDER BY order_date 
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) as ma_7d,
    AVG(daily_sales) OVER (
        ORDER BY order_date 
        ROWS BETWEEN 29 PRECEDING AND CURRENT ROW
    ) as ma_30d,
    AVG(daily_sales) OVER (
        ORDER BY order_date 
        ROWS BETWEEN 89 PRECEDING AND CURRENT ROW
    ) as ma_90d
FROM (
    SELECT 
        order_date,
        SUM(sales_amount) as daily_sales
    FROM orders
    GROUP BY order_date
) daily_totals
ORDER BY order_date;`,
      },
      {
        id: 13,
        question: "How do you find the longest streak of daily active users?",
        solution: `-- Find the longest streak of daily active users
WITH daily_activity AS (
    SELECT 
        activity_date,
        COUNT(DISTINCT user_id) as active_users
    FROM user_activities
    GROUP BY activity_date
),
activity_streaks AS (
    SELECT 
        activity_date,
        active_users,
        CASE 
            WHEN active_users > 0 THEN 1
            ELSE 0
        END as had_activity,
        activity_date - INTERVAL '1 day' * 
            ROW_NUMBER() OVER (ORDER BY activity_date) as streak_group
    FROM daily_activity
    WHERE activity_date BETWEEN '2023-01-01' AND '2023-12-31'
),
streak_lengths AS (
    SELECT 
        MIN(activity_date) as streak_start,
        MAX(activity_date) as streak_end,
        COUNT(*) as streak_length,
        SUM(active_users) as total_activity_during_streak
    FROM activity_streaks
    WHERE had_activity = 1
    GROUP BY streak_group
)
SELECT 
    streak_start,
    streak_end,
    streak_length,
    total_activity_during_streak,
    ROUND(total_activity_during_streak::decimal / streak_length, 2) as avg_daily_activity
FROM streak_lengths
ORDER BY streak_length DESC, total_activity_during_streak DESC
LIMIT 10;

-- Alternative: Find the current active streak
WITH daily_status AS (
    SELECT 
        generate_series::date as calendar_date,
        COALESCE(da.active_users, 0) as active_users,
        CASE 
            WHEN da.active_users > 0 THEN 1
            ELSE 0
        END as had_activity
    FROM generate_series(
        '2023-01-01'::date, 
        CURRENT_DATE, 
        '1 day'::interval
    )
    LEFT JOIN daily_activity da ON generate_series::date = da.activity_date
),
streak_calc AS (
    SELECT 
        calendar_date,
        active_users,
        had_activity,
        SUM(CASE WHEN had_activity = 0 THEN 1 ELSE 0 END) OVER (
            ORDER BY calendar_date DESC
        ) as reverse_streak_group
    FROM daily_status
    ORDER BY calendar_date DESC
)
SELECT 
    MIN(calendar_date) as current_streak_start,
    MAX(calendar_date) as current_streak_end,
    COUNT(*) as current_streak_length,
    SUM(active_users) as total_activity_current_streak
FROM streak_calc
WHERE had_activity = 1
AND reverse_streak_group = 0;`,
      },
      {
        id: 14,
        question:
          "Write a query to identify customers with declining purchase frequency",
        solution: `-- Identify customers with declining purchase frequency over time
WITH customer_purchase_trends AS (
    SELECT 
        customer_id,
        DATE_TRUNC('month', order_date) as order_month,
        COUNT(*) as monthly_orders,
        AVG(COUNT(*)) OVER (
            PARTITION BY customer_id
            ORDER BY DATE_TRUNC('month', order_date)
            ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
        ) as moving_avg_3m,
        LAG(COUNT(*), 1) OVER (
            PARTITION BY customer_id 
            ORDER BY DATE_TRUNC('month', order_date)
        ) as prev_month_orders
    FROM orders
    WHERE order_date >= CURRENT_DATE - INTERVAL '6 months'
    GROUP BY customer_id, DATE_TRUNC('month', order_date)
),
trend_analysis AS (
    SELECT 
        customer_id,
        order_month,
        monthly_orders,
        moving_avg_3m,
        prev_month_orders,
        CASE 
            WHEN monthly_orders < moving_avg_3m * 0.7 THEN 'Significant Decline'
            WHEN monthly_orders < prev_month_orders THEN 'Declining'
            WHEN monthly_orders > prev_month_orders THEN 'Increasing'
            ELSE 'Stable'
        END as trend_direction,
        ROUND(
            ((monthly_orders - prev_month_orders)::decimal / 
            NULLIF(prev_month_orders, 0)) * 100, 
            2
        ) as month_over_month_change
    FROM customer_purchase_trends
)
SELECT 
    c.customer_id,
    c.customer_name,
    c.email,
    t.order_month,
    t.monthly_orders,
    t.trend_direction,
    t.month_over_month_change,
    CASE 
        WHEN t.trend_direction IN ('Significant Decline', 'Declining') 
            AND t.month_over_month_change < -20 
            THEN 'At Risk - Declining Frequency'
        ELSE 'Normal'
    END as customer_status
FROM trend_analysis t
JOIN customers c ON t.customer_id = c.customer_id
WHERE t.trend_direction IN ('Significant Decline', 'Declining')
ORDER BY t.month_over_month_change ASC, t.customer_id;

-- Additional analysis: Calculate slope of regression line
WITH monthly_orders AS (
    SELECT 
        customer_id,
        EXTRACT(MONTH FROM AGE(order_date, '2023-01-01')) as month_index,
        COUNT(*) as order_count
    FROM orders
    WHERE order_date >= '2023-01-01'
    GROUP BY customer_id, EXTRACT(MONTH FROM AGE(order_date, '2023-01-01'))
),
regression_slopes AS (
    SELECT 
        customer_id,
        -- Calculate slope using linear regression formula
        (COUNT(*) * SUM(month_index * order_count) - 
         SUM(month_index) * SUM(order_count)) /
        (COUNT(*) * SUM(month_index * month_index) - 
         SUM(month_index) * SUM(month_index)) as slope
    FROM monthly_orders
    GROUP BY customer_id
    HAVING COUNT(*) >= 3  -- Need at least 3 data points
)
SELECT 
    r.customer_id,
    c.customer_name,
    r.slope,
    CASE 
        WHEN r.slope < -0.5 THEN 'Rapid Decline'
        WHEN r.slope < -0.1 THEN 'Gradual Decline'
        WHEN r.slope > 0.1 THEN 'Increasing'
        ELSE 'Stable'
    END as trend_category
FROM regression_slopes r
JOIN customers c ON r.customer_id = c.customer_id
WHERE r.slope < -0.1  -- Filter for declining trends
ORDER BY r.slope ASC;`,
      },
      {
        id: 15,
        question:
          "How do you calculate the percentage contribution of each product to total sales?",
        solution: `-- Calculate product contribution to total sales
WITH product_sales AS (
    SELECT 
        p.product_id,
        p.product_name,
        p.category,
        SUM(o.quantity * o.unit_price) as total_sales,
        COUNT(*) as order_count
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    JOIN products p ON oi.product_id = p.product_id
    GROUP BY p.product_id, p.product_name, p.category
),
total_sales AS (
    SELECT SUM(total_sales) as grand_total
    FROM product_sales
)
SELECT 
    ps.product_id,
    ps.product_name,
    ps.category,
    ps.total_sales,
    ps.order_count,
    ROUND(
        (ps.total_sales / ts.grand_total) * 100, 
        2
    ) as contribution_percent,
    ROUND(
        SUM(ps.total_sales) OVER (
            ORDER BY ps.total_sales DESC
        ) / ts.grand_total * 100, 
        2
    ) as cumulative_percent
FROM product_sales ps
CROSS JOIN total_sales ts
ORDER BY ps.total_sales DESC;

-- Breakdown by category and product
SELECT 
    category,
    product_name,
    total_sales,
    category_sales,
    ROUND((total_sales / category_sales) * 100, 2) as percent_of_category,
    ROUND((total_sales / grand_total) * 100, 2) as percent_of_total
FROM (
    SELECT 
        p.category,
        p.product_name,
        SUM(o.quantity * o.unit_price) as total_sales,
        SUM(SUM(o.quantity * o.unit_price)) OVER (
            PARTITION BY p.category
        ) as category_sales,
        SUM(SUM(o.quantity * o.unit_price)) OVER () as grand_total
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    JOIN products p ON oi.product_id = p.product_id
    GROUP BY p.category, p.product_name
) sales_data
ORDER BY category, total_sales DESC;

-- Pareto analysis (80/20 rule)
WITH product_contributions AS (
    SELECT 
        product_name,
        total_sales,
        ROUND((total_sales / SUM(total_sales) OVER ()) * 100, 2) as contribution_percent,
        ROUND(
            SUM(total_sales) OVER (
                ORDER BY total_sales DESC
            ) / SUM(total_sales) OVER () * 100, 
            2
        ) as cumulative_percent
    FROM (
        SELECT 
            p.product_name,
            SUM(o.quantity * o.unit_price) as total_sales
        FROM orders o
        JOIN order_items oi ON o.order_id = oi.order_id
        JOIN products p ON oi.product_id = p.product_id
        GROUP BY p.product_name
    ) product_sales
)
SELECT 
    product_name,
    total_sales,
    contribution_percent,
    cumulative_percent,
    CASE 
        WHEN cumulative_percent <= 80 THEN 'A - Top 80%'
        WHEN cumulative_percent <= 95 THEN 'B - Next 15%'
        ELSE 'C - Bottom 5%'
    END as pareto_category
FROM product_contributions
ORDER BY total_sales DESC;`,
      },
      {
        id: 16,
        question:
          "Write a query to find the most common product combinations in orders",
        solution: `-- Find most common product pairs in orders
WITH order_products AS (
    SELECT 
        o.order_id,
        oi.product_id,
        p.product_name
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    JOIN products p ON oi.product_id = p.product_id
),
product_pairs AS (
    SELECT 
        op1.product_id as product1_id,
        op1.product_name as product1_name,
        op2.product_id as product2_id,
        op2.product_name as product2_name,
        COUNT(DISTINCT op1.order_id) as order_count
    FROM order_products op1
    JOIN order_products op2 ON op1.order_id = op2.order_id
    WHERE op1.product_id < op2.product_id  -- Avoid duplicates and self-pairs
    GROUP BY op1.product_id, op1.product_name, op2.product_id, op2.product_name
),
total_orders AS (
    SELECT COUNT(DISTINCT order_id) as total_order_count
    FROM orders
)
SELECT 
    pp.product1_name,
    pp.product2_name,
    pp.order_count,
    ROUND(
        (pp.order_count::decimal / t.total_order_count) * 100, 
        2
    ) as penetration_rate,
    ROW_NUMBER() OVER (
        ORDER BY pp.order_count DESC
    ) as popularity_rank
FROM product_pairs pp
CROSS JOIN total_orders t
WHERE pp.order_count >= 10  -- Minimum threshold
ORDER BY pp.order_count DESC
LIMIT 20;

-- Find most common product triplets
WITH order_products AS (
    SELECT 
        order_id,
        ARRAY_AGG(product_id ORDER BY product_id) as product_array
    FROM order_items
    GROUP BY order_id
    HAVING COUNT(*) >= 3
),
product_triplets AS (
    SELECT 
        product_array[1] as product1,
        product_array[2] as product2,
        product_array[3] as product3,
        COUNT(*) as order_count
    FROM order_products
    WHERE array_length(product_array, 1) >= 3
    GROUP BY product_array[1], product_array[2], product_array[3]
)
SELECT 
    p1.product_name as product1,
    p2.product_name as product2,
    p3.product_name as product3,
    pt.order_count,
    ROUND(
        (pt.order_count::decimal / (SELECT COUNT(*) FROM orders)) * 100, 
        4
    ) as penetration_rate
FROM product_triplets pt
JOIN products p1 ON pt.product1 = p1.product_id
JOIN products p2 ON pt.product2 = p2.product_id
JOIN products p3 ON pt.product3 = p3.product_id
ORDER BY pt.order_count DESC
LIMIT 15;

-- Using market basket analysis (association rules)
WITH product_cooccurrence AS (
    SELECT 
        oi1.product_id as product_a,
        oi2.product_id as product_b,
        COUNT(DISTINCT oi1.order_id) as cooccurrence_count,
        (SELECT COUNT(DISTINCT order_id) FROM order_items) as total_orders
    FROM order_items oi1
    JOIN order_items oi2 ON oi1.order_id = oi2.order_id
    WHERE oi1.product_id != oi2.product_id
    GROUP BY oi1.product_id, oi2.product_id
),
product_support AS (
    SELECT 
        product_id,
        COUNT(DISTINCT order_id) as support_count
    FROM order_items
    GROUP BY product_id
)
SELECT 
    pa.product_name as product_a,
    pb.product_name as product_b,
    pc.cooccurrence_count,
    ROUND(
        (pc.cooccurrence_count::decimal / pc.total_orders) * 100, 
        2
    ) as support_percent,
    ROUND(
        (pc.cooccurrence_count::decimal / ps_a.support_count) * 100, 
        2
    ) as confidence_percent,
    ROUND(
        (pc.cooccurrence_count::decimal / pc.total_orders) / 
        ((ps_a.support_count::decimal / pc.total_orders) * 
         (ps_b.support_count::decimal / pc.total_orders)), 
        2
    ) as lift_ratio
FROM product_cooccurrence pc
JOIN products pa ON pc.product_a = pa.product_id
JOIN products pb ON pc.product_b = pb.product_id
JOIN product_support ps_a ON pc.product_a = ps_a.product_id
JOIN product_support ps_b ON pc.product_b = ps_b.product_id
WHERE pc.cooccurrence_count >= 50
ORDER BY lift_ratio DESC, cooccurrence_count DESC
LIMIT 20;`,
      },
      {
        id: 17,
        question: "How do you identify outliers in transaction amounts?",
        solution: `-- Identify outliers using statistical methods
WITH transaction_stats AS (
    SELECT 
        AVG(amount) as mean_amount,
        STDDEV(amount) as stddev_amount,
        PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY amount) as q1,
        PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY amount) as q3,
        PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY amount) - 
        PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY amount) as iqr
    FROM transactions
    WHERE amount > 0
),
outlier_analysis AS (
    SELECT 
        t.transaction_id,
        t.customer_id,
        t.amount,
        t.transaction_date,
        ts.mean_amount,
        ts.stddev_amount,
        ts.q1,
        ts.q3,
        ts.iqr,
        -- Z-score method
        ABS((t.amount - ts.mean_amount) / ts.stddev_amount) as z_score,
        -- IQR method
        CASE 
            WHEN t.amount < ts.q1 - 1.5 * ts.iqr THEN 'Low Outlier'
            WHEN t.amount > ts.q3 + 1.5 * ts.iqr THEN 'High Outlier'
            ELSE 'Normal'
        END as iqr_outlier_status
    FROM transactions t
    CROSS JOIN transaction_stats ts
    WHERE t.amount > 0
)
SELECT 
    transaction_id,
    customer_id,
    amount,
    transaction_date,
    ROUND(z_score, 2) as z_score,
    iqr_outlier_status,
    CASE 
        WHEN z_score > 3 THEN 'Extreme Outlier (Z > 3)'
        WHEN z_score > 2 THEN 'Moderate Outlier (Z > 2)'
        WHEN iqr_outlier_status != 'Normal' THEN 'IQR Outlier'
        ELSE 'Normal'
    END as outlier_classification,
    ROUND(mean_amount, 2) as average_amount,
    ROUND(stddev_amount, 2) as standard_deviation
FROM outlier_analysis
WHERE z_score > 2 OR iqr_outlier_status != 'Normal'
ORDER BY amount DESC;

-- Additional analysis: Customer-specific outliers
WITH customer_stats AS (
    SELECT 
        customer_id,
        AVG(amount) as cust_mean,
        STDDEV(amount) as cust_stddev,
        COUNT(*) as transaction_count
    FROM transactions
    WHERE amount > 0
    GROUP BY customer_id
    HAVING COUNT(*) >= 10
),
customer_outliers AS (
    SELECT 
        t.transaction_id,
        t.customer_id,
        t.amount,
        t.transaction_date,
        cs.cust_mean,
        cs.cust_stddev,
        ABS((t.amount - cs.cust_mean) / cs.cust_stddev) as cust_z_score
    FROM transactions t
    JOIN customer_stats cs ON t.customer_id = cs.customer_id
    WHERE t.amount > 0
)
SELECT 
    co.transaction_id,
    co.customer_id,
    c.customer_name,
    co.amount,
    co.transaction_date,
    ROUND(co.cust_z_score, 2) as customer_z_score,
    ROUND(co.cust_mean, 2) as customer_average,
    CASE 
        WHEN co.cust_z_score > 3 THEN 'Extreme Customer Outlier'
        WHEN co.cust_z_score > 2 THEN 'Moderate Customer Outlier'
        ELSE 'Normal for Customer'
    END as customer_outlier_status
FROM customer_outliers co
JOIN customers c ON co.customer_id = c.customer_id
WHERE co.cust_z_score > 2
ORDER BY co.cust_z_score DESC;

-- Using MAD (Median Absolute Deviation) for robust outlier detection
WITH transaction_medians AS (
    SELECT 
        PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY amount) as median_amount
    FROM transactions
    WHERE amount > 0
),
absolute_deviations AS (
    SELECT 
        transaction_id,
        amount,
        ABS(amount - (SELECT median_amount FROM transaction_medians)) as abs_deviation
    FROM transactions
    WHERE amount > 0
),
mad_value AS (
    SELECT 
        PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY abs_deviation) as mad
    FROM absolute_deviations
)
SELECT 
    t.transaction_id,
    t.customer_id,
    t.amount,
    t.transaction_date,
    ROUND(ad.abs_deviation / mv.mad, 2) as mad_score,
    CASE 
        WHEN ad.abs_deviation / mv.mad > 3.5 THEN 'Outlier (MAD > 3.5)'
        ELSE 'Normal'
    END as mad_outlier_status
FROM transactions t
JOIN absolute_deviations ad ON t.transaction_id = ad.transaction_id
CROSS JOIN mad_value mv
WHERE ad.abs_deviation / mv.mad > 3.5
ORDER BY ad.abs_deviation / mv.mad DESC;`,
      },
      {
        id: 18,
        question: "Write a query to calculate customer lifetime value (CLV)",
        solution: `-- Calculate Customer Lifetime Value (CLV)
WITH customer_transactions AS (
    SELECT 
        customer_id,
        MIN(order_date) as first_order_date,
        MAX(order_date) as last_order_date,
        COUNT(DISTINCT order_id) as total_orders,
        SUM(order_amount) as total_revenue,
        AVG(order_amount) as avg_order_value
    FROM orders
    GROUP BY customer_id
),
customer_lifespan AS (
    SELECT 
        customer_id,
        first_order_date,
        last_order_date,
        total_orders,
        total_revenue,
        avg_order_value,
        EXTRACT(DAY FROM (last_order_date - first_order_date)) as lifespan_days,
        CASE 
            WHEN EXTRACT(DAY FROM (last_order_date - first_order_date)) > 0 
            THEN total_orders::decimal / 
                 EXTRACT(DAY FROM (last_order_date - first_order_date)) * 365
            ELSE 0
        END as projected_annual_orders
    FROM customer_transactions
),
clv_calculation AS (
    SELECT 
        cl.customer_id,
        c.customer_name,
        cl.first_order_date,
        cl.last_order_date,
        cl.lifespan_days,
        cl.total_orders,
        cl.total_revenue,
        cl.avg_order_value,
        cl.projected_annual_orders,
        -- Simple CLV: Average revenue per year
        CASE 
            WHEN cl.lifespan_days > 0
            THEN (cl.total_revenue / cl.lifespan_days) * 365
            ELSE 0
        END as simple_clv,
        -- Predictive CLV: Using purchase frequency and average value
        cl.projected_annual_orders * cl.avg_order_value as predictive_clv,
        -- Historical CLV: Total revenue adjusted for time
        cl.total_revenue * 
            (365 / GREATEST(cl.lifespan_days, 1)) as time_adjusted_clv
    FROM customer_lifespan cl
    JOIN customers c ON cl.customer_id = c.customer_id
    WHERE cl.total_orders >= 2  -- Only customers with multiple orders
)
SELECT 
    customer_id,
    customer_name,
    first_order_date,
    last_order_date,
    lifespan_days,
    total_orders,
    total_revenue,
    ROUND(avg_order_value, 2) as avg_order_value,
    ROUND(projected_annual_orders, 2) as projected_annual_orders,
    ROUND(simple_clv, 2) as simple_clv,
    ROUND(predictive_clv, 2) as predictive_clv,
    ROUND(time_adjusted_clv, 2) as time_adjusted_clv,
    CASE 
        WHEN simple_clv > 1000 THEN 'VIP'
        WHEN simple_clv > 500 THEN 'Premium'
        WHEN simple_clv > 100 THEN 'Standard'
        ELSE 'Low Value'
    END as clv_segment
FROM clv_calculation
ORDER BY simple_clv DESC;

-- Advanced CLV with retention rates and discount factors
WITH customer_metrics AS (
    SELECT 
        customer_id,
        COUNT(DISTINCT order_id) as total_orders,
        SUM(order_amount) as total_revenue,
        AVG(order_amount) as avg_order_value,
        EXTRACT(MONTH FROM AGE(MAX(order_date), MIN(order_date))) as tenure_months
    FROM orders
    GROUP BY customer_id
),
retention_rates AS (
    SELECT 
        customer_id,
        CASE 
            WHEN COUNT(DISTINCT DATE_TRUNC('month', order_date)) > 1
            THEN COUNT(DISTINCT order_id)::decimal / 
                 COUNT(DISTINCT DATE_TRUNC('month', order_date))
            ELSE 0
        END as retention_rate
    FROM orders
    GROUP BY customer_id
)
SELECT 
    cm.customer_id,
    c.customer_name,
    cm.total_orders,
    cm.total_revenue,
    cm.avg_order_value,
    cm.tenure_months,
    rr.retention_rate,
    -- CLV formula: Avg Order Value × Purchase Frequency × Customer Lifespan
    cm.avg_order_value * 
    (cm.total_orders / GREATEST(cm.tenure_months, 1)) * 
    (12 * rr.retention_rate) as advanced_clv,
    -- Discounted CLV (assuming 10% discount rate)
    cm.avg_order_value * 
    (cm.total_orders / GREATEST(cm.tenure_months, 1)) * 
    (12 * rr.retention_rate) / 
    POWER(1.10, cm.tenure_months/12) as discounted_clv
FROM customer_metrics cm
JOIN retention_rates rr ON cm.customer_id = rr.customer_id
JOIN customers c ON cm.customer_id = c.customer_id
WHERE cm.tenure_months >= 3
ORDER BY advanced_clv DESC;`,
      },
      {
        id: 19,
        question:
          "How do you find the optimal price point using historical sales data?",
        solution: `-- Price elasticity and optimal pricing analysis
WITH price_sales_data AS (
    SELECT 
        product_id,
        unit_price,
        COUNT(DISTINCT order_id) as order_count,
        SUM(quantity) as total_quantity,
        SUM(quantity * unit_price) as total_revenue,
        AVG(quantity) as avg_quantity_per_order
    FROM order_items
    WHERE unit_price > 0
    GROUP BY product_id, unit_price
    HAVING COUNT(DISTINCT order_id) >= 10  -- Minimum data points
),
price_elasticity AS (
    SELECT 
        product_id,
        unit_price,
        order_count,
        total_quantity,
        total_revenue,
        avg_quantity_per_order,
        LAG(unit_price) OVER (
            PARTITION BY product_id 
            ORDER BY unit_price
        ) as prev_price,
        LAG(total_quantity) OVER (
            PARTITION BY product_id 
            ORDER BY unit_price
        ) as prev_quantity,
        CASE 
            WHEN LAG(unit_price) OVER (
                PARTITION BY product_id 
                ORDER BY unit_price
            ) IS NOT NULL
            THEN (
                (total_quantity - LAG(total_quantity) OVER (
                    PARTITION BY product_id 
                    ORDER BY unit_price
                )) / 
                LAG(total_quantity) OVER (
                    PARTITION BY product_id 
                    ORDER BY unit_price
                )
            ) / (
                (unit_price - LAG(unit_price) OVER (
                    PARTITION BY product_id 
                    ORDER BY unit_price
                )) / 
                LAG(unit_price) OVER (
                    PARTITION BY product_id 
                    ORDER BY unit_price
                )
            )
            ELSE NULL
        END as price_elasticity
    FROM price_sales_data
),
optimal_pricing AS (
    SELECT 
        pe.product_id,
        p.product_name,
        pe.unit_price,
        pe.total_quantity,
        pe.total_revenue,
        pe.price_elasticity,
        -- Revenue optimization: where marginal revenue = marginal cost
        -- Assuming cost is 60% of price for demonstration
        pe.unit_price * 0.6 as estimated_cost,
        pe.total_revenue - (pe.total_quantity * pe.unit_price * 0.6) as gross_profit,
        -- Find price that maximizes profit
        FIRST_VALUE(pe.unit_price) OVER (
            PARTITION BY pe.product_id 
            ORDER BY pe.total_revenue - (pe.total_quantity * pe.unit_price * 0.6) DESC
        ) as suggested_optimal_price,
        FIRST_VALUE(pe.total_revenue - (pe.total_quantity * pe.unit_price * 0.6)) OVER (
            PARTITION BY pe.product_id 
            ORDER BY pe.total_revenue - (pe.total_quantity * pe.unit_price * 0.6) DESC
        ) as max_profit
    FROM price_elasticity pe
    JOIN products p ON pe.product_id = p.product_id
    WHERE pe.price_elasticity IS NOT NULL
)
SELECT 
    product_id,
    product_name,
    unit_price as current_price,
    total_quantity as units_sold,
    total_revenue,
    ROUND(price_elasticity, 2) as elasticity,
    ROUND(estimated_cost, 2) as estimated_cost,
    ROUND(gross_profit, 2) as gross_profit,
    suggested_optimal_price,
    ROUND(max_profit, 2) as estimated_max_profit,
    CASE 
        WHEN price_elasticity < -1 THEN 'Elastic (price sensitive)'
        WHEN price_elasticity > -1 THEN 'Inelastic (price insensitive)'
        ELSE 'Unitary elastic'
    END as elasticity_type,
    CASE 
        WHEN unit_price < suggested_optimal_price THEN 'UNDERPRICED'
        WHEN unit_price > suggested_optimal_price THEN 'OVERPRICED'
        ELSE 'OPTIMAL'
    END as pricing_status
FROM optimal_pricing
WHERE total_quantity >= 100  -- Only products with significant sales
ORDER BY (gross_profit - max_profit) DESC, product_id;

-- Additional analysis: Price sensitivity by customer segment
WITH customer_price_sensitivity AS (
    SELECT 
        o.customer_id,
        oi.product_id,
        oi.unit_price,
        oi.quantity,
        c.income_level,
        c.customer_segment,
        AVG(oi.unit_price) OVER (PARTITION BY oi.product_id) as avg_product_price,
        CASE 
            WHEN oi.unit_price > AVG(oi.unit_price) OVER (PARTITION BY oi.product_id) 
            THEN 'Above Average'
            ELSE 'Below Average'
        END as price_position
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    JOIN customers c ON o.customer_id = c.customer_id
),
segment_elasticity AS (
    SELECT 
        product_id,
        customer_segment,
        price_position,
        COUNT(*) as order_count,
        SUM(quantity) as total_quantity,
        AVG(unit_price) as avg_price_paid,
        -- Calculate price sensitivity by segment
        CORR(unit_price, quantity) as price_sensitivity_correlation
    FROM customer_price_sensitivity
    GROUP BY product_id, customer_segment, price_position
)
SELECT 
    p.product_name,
    cps.customer_segment,
    cps.price_position,
    cps.order_count,
    cps.total_quantity,
    ROUND(cps.avg_price_paid, 2) as avg_price_paid,
    ROUND(cps.price_sensitivity_correlation, 3) as price_sensitivity,
    CASE 
        WHEN cps.price_sensitivity_correlation < -0.3 THEN 'Highly Price Sensitive'
        WHEN cps.price_sensitivity_correlation < -0.1 THEN 'Moderately Sensitive'
        WHEN cps.price_sensitivity_correlation > 0.1 THEN 'Price Insensitive'
        ELSE 'Neutral'
    END as sensitivity_category
FROM segment_elasticity cps
JOIN products p ON cps.product_id = p.product_id
WHERE cps.order_count >= 50
ORDER BY p.product_name, cps.customer_segment, cps.price_sensitivity_correlation;`,
      },
      {
        id: 20,
        question: "Write a query to identify cross-selling opportunities",
        solution: `-- Identify cross-selling opportunities between product categories
WITH customer_purchase_history AS (
    SELECT 
        o.customer_id,
        p.category,
        COUNT(DISTINCT o.order_id) as order_count,
        MAX(o.order_date) as last_purchase_date
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    JOIN products p ON oi.product_id = p.product_id
    GROUP BY o.customer_id, p.category
),
customer_category_matrix AS (
    SELECT 
        customer_id,
        MAX(CASE WHEN category = 'Electronics' THEN 1 ELSE 0 END) as bought_electronics,
        MAX(CASE WHEN category = 'Books' THEN 1 ELSE 0 END) as bought_books,
        MAX(CASE WHEN category = 'Clothing' THEN 1 ELSE 0 END) as bought_clothing,
        MAX(CASE WHEN category = 'Home' THEN 1 ELSE 0 END) as bought_home,
        COUNT(DISTINCT category) as total_categories
    FROM customer_purchase_history
    GROUP BY customer_id
),
cross_sell_opportunities AS (
    SELECT 
        customer_id,
        total_categories,
        -- Identify what customers haven't bought but might be interested in
        CASE 
            WHEN bought_electronics = 1 AND bought_books = 0 THEN 'Books'
            WHEN bought_books = 1 AND bought_electronics = 0 THEN 'Electronics'
            WHEN bought_clothing = 1 AND bought_home = 0 THEN 'Home'
            WHEN bought_home = 1 AND bought_clothing = 0 THEN 'Clothing'
            ELSE 'Multiple Opportunities'
        END as suggested_category,
        -- Score based on purchase history
        total_categories * order_count as opportunity_score
    FROM customer_category_matrix ccm
    JOIN (
        SELECT customer_id, COUNT(*) as order_count
        FROM orders
        GROUP BY customer_id
    ) oc ON ccm.customer_id = oc.customer_id
    WHERE total_categories < 4  -- Customers who haven't bought from all categories
)
SELECT 
    cso.customer_id,
    c.customer_name,
    c.email,
    cso.total_categories,
    cso.suggested_category,
    cso.opportunity_score,
    cph.last_purchase_date,
    CASE 
        WHEN cso.opportunity_score > 100 THEN 'High Priority'
        WHEN cso.opportunity_score > 50 THEN 'Medium Priority'
        ELSE 'Low Priority'
    END as priority_level
FROM cross_sell_opportunities cso
JOIN customers c ON cso.customer_id = c.customer_id
JOIN (
    SELECT customer_id, MAX(last_purchase_date) as last_purchase_date
    FROM customer_purchase_history
    GROUP BY customer_id
) cph ON cso.customer_id = cph.customer_id
WHERE cso.suggested_category != 'Multiple Opportunities'
ORDER BY cso.opportunity_score DESC;

-- Product-level cross-selling recommendations
WITH product_affinities AS (
    SELECT 
        oi1.product_id as product_a,
        oi2.product_id as product_b,
        COUNT(DISTINCT oi1.order_id) as co_purchase_count,
        COUNT(DISTINCT oi1.order_id)::decimal / 
        (SELECT COUNT(DISTINCT order_id) FROM order_items WHERE product_id = oi1.product_id) as confidence_ab,
        COUNT(DISTINCT oi1.order_id)::decimal / 
        (SELECT COUNT(DISTINCT order_id) FROM order_items WHERE product_id = oi2.product_id) as confidence_ba
    FROM order_items oi1
    JOIN order_items oi2 ON oi1.order_id = oi2.order_id
    WHERE oi1.product_id != oi2.product_id
    GROUP BY oi1.product_id, oi2.product_id
    HAVING COUNT(DISTINCT oi1.order_id) >= 5
),
customer_product_gaps AS (
    SELECT 
        o.customer_id,
        pa.product_a as owned_product,
        pa.product_b as recommended_product,
        pa.co_purchase_count,
        pa.confidence_ab,
        c.total_orders,
        -- Has customer bought product_a but not product_b?
        CASE 
            WHEN EXISTS (
                SELECT 1 FROM order_items oi 
                JOIN orders o2 ON oi.order_id = o2.order_id 
                WHERE o2.customer_id = o.customer_id 
                AND oi.product_id = pa.product_a
            ) AND NOT EXISTS (
                SELECT 1 FROM order_items oi 
                JOIN orders o2 ON oi.order_id = o2.order_id 
                WHERE o2.customer_id = o.customer_id 
                AND oi.product_id = pa.product_b
            ) THEN 1
            ELSE 0
        END as is_opportunity
    FROM product_affinities pa
    CROSS JOIN (
        SELECT DISTINCT customer_id, COUNT(*) as total_orders
        FROM orders
        GROUP BY customer_id
    ) c
    WHERE pa.confidence_ab > 0.3  -- Minimum confidence threshold
)
SELECT 
    cpg.customer_id,
    c.customer_name,
    p1.product_name as owned_product,
    p2.product_name as recommended_product,
    cpg.co_purchase_count,
    ROUND(cpg.confidence_ab * 100, 2) as confidence_percent,
    cpg.total_orders,
    ROW_NUMBER() OVER (
        PARTITION BY cpg.customer_id 
        ORDER BY cpg.confidence_ab DESC
    ) as recommendation_rank
FROM customer_product_gaps cpg
JOIN customers c ON cpg.customer_id = c.customer_id
JOIN products p1 ON cpg.owned_product = p1.product_id
JOIN products p2 ON cpg.recommended_product = p2.product_id
WHERE cpg.is_opportunity = 1
AND cpg.total_orders >= 3
ORDER BY cpg.confidence_ab DESC, cpg.customer_id
LIMIT 50;`,
      },
      {
        id: 21,
        question: "How do you calculate inventory turnover rates?",
        solution: `-- Calculate inventory turnover rates by product and category
WITH inventory_movements AS (
    SELECT 
        product_id,
        DATE_TRUNC('month', movement_date) as movement_month,
        SUM(CASE WHEN movement_type = 'PURCHASE' THEN quantity ELSE 0 END) as purchases,
        SUM(CASE WHEN movement_type = 'SALE' THEN quantity ELSE 0 END) as sales,
        SUM(CASE WHEN movement_type = 'RETURN' THEN quantity ELSE 0 END) as returns,
        SUM(CASE WHEN movement_type = 'ADJUSTMENT' THEN quantity ELSE 0 END) as adjustments
    FROM inventory_transactions
    WHERE movement_date >= CURRENT_DATE - INTERVAL '12 months'
    GROUP BY product_id, DATE_TRUNC('month', movement_date)
),
inventory_costs AS (
    SELECT 
        product_id,
        AVG(unit_cost) as avg_unit_cost
    FROM purchase_orders
    GROUP BY product_id
),
turnover_calculation AS (
    SELECT 
        im.product_id,
        p.product_name,
        p.category,
        im.movement_month,
        im.sales as units_sold,
        im.purchases as units_purchased,
        ic.avg_unit_cost,
        -- Cost of Goods Sold
        im.sales * ic.avg_unit_cost as cogs,
        -- Average Inventory (simplified)
        (COALESCE(LAG(im.purchases - im.sales + im.returns) OVER (
            PARTITION BY im.product_id 
            ORDER BY im.movement_month
        ), 0) + (im.purchases - im.sales + im.returns)) / 2 as avg_inventory_value,
        -- Inventory Turnover Ratio
        CASE 
            WHEN (COALESCE(LAG(im.purchases - im.sales + im.returns) OVER (
                PARTITION BY im.product_id 
                ORDER BY im.movement_month
            ), 0) + (im.purchases - im.sales + im.returns)) / 2 > 0
            THEN (im.sales * ic.avg_unit_cost) / 
                 ((COALESCE(LAG(im.purchases - im.sales + im.returns) OVER (
                     PARTITION BY im.product_id 
                     ORDER BY im.movement_month
                 ), 0) + (im.purchases - im.sales + im.returns)) / 2)
            ELSE NULL
        END as turnover_ratio,
        -- Days in Inventory
        CASE 
            WHEN (im.sales * ic.avg_unit_cost) > 0
            THEN 365 / ((im.sales * ic.avg_unit_cost) / 
                 ((COALESCE(LAG(im.purchases - im.sales + im.returns) OVER (
                     PARTITION BY im.product_id 
                     ORDER BY im.movement_month
                 ), 0) + (im.purchases - im.sales + im.returns)) / 2))
            ELSE NULL
        END as days_in_inventory
    FROM inventory_movements im
    JOIN products p ON im.product_id = p.product_id
    LEFT JOIN inventory_costs ic ON im.product_id = ic.product_id
)
SELECT 
    product_id,
    product_name,
    category,
    movement_month,
    units_sold,
    units_purchased,
    ROUND(avg_unit_cost, 2) as avg_unit_cost,
    ROUND(cogs, 2) as cost_of_goods_sold,
    ROUND(avg_inventory_value, 2) as average_inventory_value,
    ROUND(turnover_ratio, 2) as inventory_turnover_ratio,
    ROUND(days_in_inventory, 2) as days_in_inventory,
    CASE 
        WHEN turnover_ratio > 12 THEN 'Very Fast Moving'
        WHEN turnover_ratio > 6 THEN 'Fast Moving'
        WHEN turnover_ratio > 3 THEN 'Medium Moving'
        WHEN turnover_ratio > 1 THEN 'Slow Moving'
        ELSE 'Very Slow Moving'
    END as turnover_category
FROM turnover_calculation
WHERE turnover_ratio IS NOT NULL
ORDER BY category, product_id, movement_month;

-- Annual summary by category
SELECT 
    category,
    COUNT(DISTINCT product_id) as product_count,
    ROUND(AVG(turnover_ratio), 2) as avg_turnover_ratio,
    ROUND(MIN(turnover_ratio), 2) as min_turnover_ratio,
    ROUND(MAX(turnover_ratio), 2) as max_turnover_ratio,
    ROUND(AVG(days_in_inventory), 2) as avg_days_in_inventory,
    SUM(units_sold) as total_units_sold,
    ROUND(SUM(cogs), 2) as total_cogs
FROM turnover_calculation
WHERE movement_month >= DATE_TRUNC('year', CURRENT_DATE)
GROUP BY category
ORDER BY avg_turnover_ratio DESC;

-- Identify slow-moving and fast-moving products
WITH annual_turnover AS (
    SELECT 
        product_id,
        product_name,
        category,
        AVG(turnover_ratio) as avg_turnover,
        AVG(days_in_inventory) as avg_days_inventory,
        SUM(units_sold) as annual_units_sold
    FROM turnover_calculation
    WHERE movement_month >= DATE_TRUNC('year', CURRENT_DATE) - INTERVAL '1 year'
    GROUP BY product_id, product_name, category
)
SELECT 
    product_id,
    product_name,
    category,
    ROUND(avg_turnover, 2) as annual_turnover_rate,
    ROUND(avg_days_inventory, 2) as avg_days_in_inventory,
    annual_units_sold,
    CASE 
        WHEN avg_turnover > 8 THEN 'Fast Moving - Consider increasing stock'
        WHEN avg_turnover < 2 THEN 'Slow Moving - Review inventory levels'
        ELSE 'Normal Moving'
    END as inventory_status,
    CASE 
        WHEN avg_turnover < 2 AND annual_units_sold > 100 THEN 
            'Slow mover with high volume - Investigate'
        WHEN avg_turnover > 8 AND annual_units_sold < 50 THEN 
            'Fast mover with low volume - Potential opportunity'
        ELSE 'Normal'
    END as action_required
FROM annual_turnover
ORDER BY avg_turnover DESC;`,
      },
      {
        id: 22,
        question: "Write a query to identify slow-moving inventory",
        solution: `-- Identify slow-moving inventory items
WITH inventory_age AS (
    SELECT 
        p.product_id,
        p.product_name,
        p.category,
        p.supplier_id,
        s.supplier_name,
        i.quantity_on_hand,
        i.unit_cost,
        i.quantity_on_hand * i.unit_cost as inventory_value,
        MAX(m.movement_date) as last_movement_date,
        CURRENT_DATE - MAX(m.movement_date) as days_since_last_movement,
        COUNT(DISTINCT m.movement_id) as movement_count,
        SUM(CASE WHEN m.movement_type = 'SALE' THEN m.quantity ELSE 0 END) as units_sold_90d,
        SUM(CASE WHEN m.movement_type = 'SALE' THEN m.quantity * i.unit_cost ELSE 0 END) as sales_value_90d
    FROM products p
    JOIN inventory i ON p.product_id = i.product_id
    LEFT JOIN inventory_movements m ON p.product_id = m.product_id
        AND m.movement_date >= CURRENT_DATE - INTERVAL '90 days'
    JOIN suppliers s ON p.supplier_id = s.supplier_id
    WHERE i.quantity_on_hand > 0
    GROUP BY p.product_id, p.product_name, p.category, p.supplier_id, 
             s.supplier_name, i.quantity_on_hand, i.unit_cost
),
sales_velocity AS (
    SELECT 
        product_id,
        AVG(
            CASE 
                WHEN movement_type = 'SALE' AND movement_date >= CURRENT_DATE - INTERVAL '90 days'
                THEN quantity 
                ELSE 0 
            END
        ) as avg_daily_sales_90d,
        STDDEV(
            CASE 
                WHEN movement_type = 'SALE' AND movement_date >= CURRENT_DATE - INTERVAL '90 days'
                THEN quantity 
                ELSE 0 
            END
        ) as sales_volatility
    FROM inventory_movements
    WHERE movement_date >= CURRENT_DATE - INTERVAL '90 days'
    GROUP BY product_id
),
slow_moving_analysis AS (
    SELECT 
        ia.product_id,
        ia.product_name,
        ia.category,
        ia.supplier_name,
        ia.quantity_on_hand,
        ia.unit_cost,
        ia.inventory_value,
        ia.days_since_last_movement,
        ia.movement_count,
        ia.units_sold_90d,
        ia.sales_value_90d,
        COALESCE(sv.avg_daily_sales_90d, 0) as avg_daily_sales,
        COALESCE(sv.sales_volatility, 0) as sales_volatility,
        -- Days of supply based on recent sales velocity
        CASE 
            WHEN COALESCE(sv.avg_daily_sales_90d, 0) > 0
            THEN ia.quantity_on_hand / sv.avg_daily_sales_90d
            ELSE 999  -- Infinite supply if no sales
        END as days_of_supply,
        -- Inventory turnover rate
        CASE 
            WHEN ia.inventory_value > 0
            THEN ia.sales_value_90d / ia.inventory_value * 4  -- Annualized
            ELSE 0
        END as annualized_turnover
    FROM inventory_age ia
    LEFT JOIN sales_velocity sv ON ia.product_id = sv.product_id
    WHERE ia.quantity_on_hand > 0
)
SELECT 
    product_id,
    product_name,
    category,
    supplier_name,
    quantity_on_hand,
    ROUND(unit_cost, 2) as unit_cost,
    ROUND(inventory_value, 2) as inventory_value,
    days_since_last_movement,
    movement_count,
    units_sold_90d,
    ROUND(sales_value_90d, 2) as sales_value_90d,
    ROUND(avg_daily_sales, 2) as avg_daily_sales,
    ROUND(days_of_supply, 2) as days_of_supply,
    ROUND(annualized_turnover, 2) as annualized_turnover,
    CASE 
        WHEN days_since_last_movement > 90 THEN 'No Movement > 90 days'
        WHEN units_sold_90d = 0 THEN 'No Sales in 90 days'
        WHEN days_of_supply > 180 THEN 'Excess Stock (>6 months supply)'
        WHEN annualized_turnover < 1 THEN 'Very Slow Turnover (<1x annual)'
        WHEN annualized_turnover < 2 THEN 'Slow Turnover (<2x annual)'
        ELSE 'Normal Movement'
    END as slow_moving_status,
    CASE 
        WHEN days_of_supply > 365 THEN 'CRITICAL: >1 year supply'
        WHEN days_of_supply > 180 THEN 'HIGH: >6 months supply'
        WHEN days_of_supply > 90 THEN 'MEDIUM: >3 months supply'
        WHEN units_sold_90d = 0 THEN 'NO SALES: Consider liquidation'
        ELSE 'LOW RISK'
    END as risk_level,
    -- Recommended actions
    CASE 
        WHEN days_of_supply > 365 THEN 'Immediate liquidation required'
        WHEN days_of_supply > 180 THEN 'Aggressive discounting needed'
        WHEN days_of_supply > 90 THEN 'Review purchasing strategy'
        WHEN units_sold_90d = 0 THEN 'Evaluate product viability'
        ELSE 'Monitor regularly'
    END as recommended_action
FROM slow_moving_analysis
WHERE days_since_last_movement > 60  -- At least 60 days since last movement
   OR units_sold_90d = 0
   OR days_of_supply > 90
   OR annualized_turnover < 2
ORDER BY days_of_supply DESC, inventory_value DESC;

-- Summary by category and supplier
SELECT 
    category,
    supplier_name,
    COUNT(*) as slow_moving_items,
    SUM(quantity_on_hand) as total_slow_moving_quantity,
    SUM(inventory_value) as total_slow_moving_value,
    AVG(days_of_supply) as avg_days_supply,
    MIN(days_of_supply) as min_days_supply,
    MAX(days_of_supply) as max_days_supply
FROM slow_moving_analysis
WHERE days_of_supply > 90 OR units_sold_90d = 0
GROUP BY category, supplier_name
HAVING SUM(inventory_value) > 1000
ORDER BY total_slow_moving_value DESC;`,
      },
      {
        question: "How do you determine the most effective marketing channels?",
        solution: `-- Analyze marketing channel effectiveness
WITH channel_performance AS (
  SELECT 
    m.channel_name,
    m.campaign_id,
    COUNT(DISTINCT c.customer_id) as acquired_customers,
    SUM(o.order_amount) as total_revenue,
    COUNT(DISTINCT o.order_id) as total_orders,
    SUM(m.marketing_spend) as total_spend,
    -- Calculate ROI
    CASE 
      WHEN SUM(m.marketing_spend) > 0 
      THEN (SUM(o.order_amount) - SUM(m.marketing_spend)) / SUM(m.marketing_spend) 
      ELSE NULL 
    END as roi,
    -- Customer Acquisition Cost
    CASE 
      WHEN COUNT(DISTINCT c.customer_id) > 0 
      THEN SUM(m.marketing_spend) / COUNT(DISTINCT c.customer_id) 
      ELSE NULL 
    END as cac,
    -- Lifetime Value (simplified)
    AVG(o.order_amount) * 4.5 as estimated_ltv
  FROM marketing_campaigns m
  LEFT JOIN customers c ON m.campaign_id = c.acquisition_campaign
  LEFT JOIN orders o ON c.customer_id = o.customer_id
  WHERE m.start_date >= CURRENT_DATE - INTERVAL '12 months'
  GROUP BY m.channel_name, m.campaign_id
),
channel_attribution AS (
  SELECT
    channel_name,
    COUNT(DISTINCT campaign_id) as campaign_count,
    SUM(acquired_customers) as total_acquired_customers,
    SUM(total_revenue) as total_revenue,
    SUM(total_spend) as total_spend,
    AVG(roi) as avg_roi,
    AVG(cac) as avg_cac,
    AVG(estimated_ltv) as avg_ltv,
    -- Channel efficiency score
    (AVG(roi) * 0.4) + (AVG(estimated_ltv) / NULLIF(AVG(cac), 0) * 0.6) as efficiency_score
  FROM channel_performance
  GROUP BY channel_name
  HAVING SUM(acquired_customers) >= 10
)
SELECT
  channel_name,
  campaign_count,
  total_acquired_customers,
  ROUND(total_revenue, 2) as total_revenue,
  ROUND(total_spend, 2) as total_spend,
  ROUND(avg_roi * 100, 2) as roi_percent,
  ROUND(avg_cac, 2) as customer_acquisition_cost,
  ROUND(avg_ltv, 2) as estimated_lifetime_value,
  ROUND(avg_ltv / NULLIF(avg_cac, 0), 2) as ltv_to_cac_ratio,
  ROUND(efficiency_score, 3) as channel_efficiency_score,
  CASE
    WHEN efficiency_score >= 8 THEN 'Highly Effective'
    WHEN efficiency_score >= 5 THEN 'Effective'
    WHEN efficiency_score >= 3 THEN 'Moderate'
    ELSE 'Inefficient'
  END as effectiveness_rating
FROM channel_attribution
ORDER BY efficiency_score DESC;

-- Multi-touch attribution model
WITH customer_journey AS (
  SELECT
    c.customer_id,
    m.channel_name,
    m.touchpoint_date,
    ROW_NUMBER() OVER (PARTITION BY c.customer_id ORDER BY m.touchpoint_date) as touchpoint_order,
    COUNT(*) OVER (PARTITION BY c.customer_id) as total_touchpoints
  FROM customers c
  JOIN marketing_touchpoints m ON c.customer_id = m.customer_id
  WHERE m.touchpoint_date BETWEEN c.created_at - INTERVAL '30 days' AND c.created_at
),
attribution_weights AS (
  SELECT
    customer_id,
    channel_name,
    CASE
      WHEN total_touchpoints = 1 THEN 1.0
      WHEN touchpoint_order = 1 THEN 0.4  -- First touch
      WHEN touchpoint_order = total_touchpoints THEN 0.3  -- Last touch
      ELSE 0.3 / (total_touchpoints - 2)  -- Distributed among middle touches
    END as attribution_weight
  FROM customer_journey
)
SELECT
  channel_name,
  COUNT(DISTINCT customer_id) as attributed_customers,
  SUM(attribution_weight) as total_attribution,
  ROUND(SUM(attribution_weight) / COUNT(DISTINCT customer_id), 3) as avg_attribution_per_customer
FROM attribution_weights
GROUP BY channel_name
ORDER BY total_attribution DESC;`,
      },
      {
        id: 24,
        question:
          "Write a query to calculate email campaign performance metrics",
        solution: `-- Email campaign performance analysis
WITH email_metrics AS (
  SELECT
    ec.campaign_id,
    ec.campaign_name,
    ec.send_date,
    COUNT(DISTINCT es.email_id) as total_sent,
    COUNT(DISTINCT CASE WHEN es.opened = TRUE THEN es.email_id END) as total_opened,
    COUNT(DISTINCT CASE WHEN es.clicked = TRUE THEN es.email_id END) as total_clicked,
    COUNT(DISTINCT CASE WHEN es.bounced = TRUE THEN es.email_id END) as total_bounced,
    COUNT(DISTINCT CASE WHEN es.unsubscribed = TRUE THEN es.email_id END) as total_unsubscribed,
    COUNT(DISTINCT o.order_id) as orders_generated,
    SUM(o.order_amount) as revenue_generated
  FROM email_campaigns ec
  LEFT JOIN email_sends es ON ec.campaign_id = es.campaign_id
  LEFT JOIN orders o ON es.email_id = o.source_email_id
    AND o.order_date BETWEEN ec.send_date AND ec.send_date + INTERVAL '7 days'
  GROUP BY ec.campaign_id, ec.campaign_name, ec.send_date
)
SELECT
  campaign_id,
  campaign_name,
  send_date,
  total_sent,
  total_opened,
  total_clicked,
  total_bounced,
  total_unsubscribed,
  orders_generated,
  revenue_generated,
  -- Calculate rates
  ROUND((total_opened::DECIMAL / NULLIF(total_sent - total_bounced, 0)) * 100, 2) as open_rate,
  ROUND((total_clicked::DECIMAL / NULLIF(total_opened, 0)) * 100, 2) as click_through_rate,
  ROUND((total_bounced::DECIMAL / NULLIF(total_sent, 0)) * 100, 2) as bounce_rate,
  ROUND((total_unsubscribed::DECIMAL / NULLIF(total_sent, 0)) * 100, 4) as unsubscribe_rate,
  ROUND((orders_generated::DECIMAL / NULLIF(total_clicked, 0)) * 100, 2) as conversion_rate,
  ROUND((revenue_generated::DECIMAL / NULLIF(total_clicked, 0)), 2) as revenue_per_click,
  ROUND((revenue_generated::DECIMAL / NULLIF(orders_generated, 0)), 2) as average_order_value,
  -- Campaign effectiveness score
  CASE
    WHEN total_sent >= 1000 THEN
      (open_rate * 0.2) + (click_through_rate * 0.3) + 
      (conversion_rate * 0.4) + (revenue_per_click * 0.1)
    ELSE NULL
  END as effectiveness_score
FROM email_metrics
ORDER BY send_date DESC, effectiveness_score DESC NULLS LAST;

-- Segment performance by customer type
SELECT
  ec.campaign_id,
  ec.campaign_name,
  c.customer_segment,
  COUNT(DISTINCT es.email_id) as total_sent,
  COUNT(DISTINCT CASE WHEN es.opened = TRUE THEN es.email_id END) as total_opened,
  COUNT(DISTINCT CASE WHEN es.clicked = TRUE THEN es.email_id END) as total_clicked,
  ROUND((COUNT(DISTINCT CASE WHEN es.opened = TRUE THEN es.email_id END)::DECIMAL / 
         NULLIF(COUNT(DISTINCT es.email_id), 0)) * 100, 2) as segment_open_rate,
  ROUND((COUNT(DISTINCT CASE WHEN es.clicked = TRUE THEN es.email_id END)::DECIMAL / 
         NULLIF(COUNT(DISTINCT CASE WHEN es.opened = TRUE THEN es.email_id END), 0)) * 100, 2) as segment_ctr
FROM email_campaigns ec
JOIN email_sends es ON ec.campaign_id = es.campaign_id
JOIN customers c ON es.customer_id = c.customer_id
GROUP BY ec.campaign_id, ec.campaign_name, c.customer_segment
HAVING COUNT(DISTINCT es.email_id) >= 50
ORDER BY ec.campaign_id, segment_open_rate DESC;

-- Time-based performance analysis
SELECT
  DATE_TRUNC('hour', es.send_timestamp) as send_hour,
  DAYNAME(es.send_timestamp) as day_of_week,
  COUNT(DISTINCT es.email_id) as total_sent,
  AVG(CASE WHEN es.opened = TRUE THEN 1 ELSE 0 END) * 100 as open_rate,
  AVG(CASE WHEN es.clicked = TRUE THEN 1 ELSE 0 END) * 100 as click_rate,
  AVG(EXTRACT(EPOCH FROM (es.open_timestamp - es.send_timestamp)) / 60) as avg_minutes_to_open
FROM email_sends es
WHERE es.send_timestamp >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE_TRUNC('hour', es.send_timestamp), DAYNAME(es.send_timestamp)
HAVING COUNT(DISTINCT es.email_id) >= 100
ORDER BY open_rate DESC;`,
      },
      {
        id: 25,
        question: "How do you identify fraudulent transactions?",
        solution: `-- Fraud detection using multiple heuristic rules
WITH transaction_features AS (
  SELECT
    t.transaction_id,
    t.customer_id,
    t.amount,
    t.transaction_date,
    t.merchant_id,
    t.country,
    t.ip_address,
    t.device_id,
    c.avg_transaction_amount,
    c.last_transaction_date,
    -- Feature engineering
    ABS(t.amount - c.avg_transaction_amount) / NULLIF(c.avg_transaction_amount, 0) as amount_deviation,
    EXTRACT(HOUR FROM t.transaction_date) as transaction_hour,
    CASE WHEN t.country != c.home_country THEN 1 ELSE 0 END as foreign_transaction,
    CASE WHEN t.device_id != c.last_device_id THEN 1 ELSE 0 END as new_device,
    CASE WHEN t.ip_address::inet <<= '192.168.0.0/16'::inet THEN 1 ELSE 0 END as internal_ip,
    -- Behavioral features
    COUNT(*) OVER (PARTITION BY t.customer_id 
                   ORDER BY t.transaction_date 
                   ROWS BETWEEN 10 PRECEDING AND 1 PRECEDING) as recent_transaction_count,
    SUM(t.amount) OVER (PARTITION BY t.customer_id 
                        ORDER BY t.transaction_date 
                        ROWS BETWEEN 10 PRECEDING AND 1 PRECEDING) as recent_transaction_total
  FROM transactions t
  JOIN customers c ON t.customer_id = c.customer_id
  WHERE t.transaction_date >= CURRENT_DATE - INTERVAL '7 days'
),
fraud_scoring AS (
  SELECT
    transaction_id,
    customer_id,
    amount,
    transaction_date,
    merchant_id,
    -- Apply fraud detection rules with weights
    CASE WHEN amount_deviation > 3 THEN 0.3 ELSE 0 END +
    CASE WHEN transaction_hour BETWEEN 0 AND 5 THEN 0.2 ELSE 0 END +
    CASE WHEN foreign_transaction = 1 THEN 0.1 ELSE 0 END +
    CASE WHEN new_device = 1 THEN 0.15 ELSE 0 END +
    CASE WHEN internal_ip = 1 THEN -0.1 ELSE 0 END +
    CASE WHEN recent_transaction_count > 5 AND amount > recent_transaction_total * 0.5 THEN 0.25 ELSE 0 END
    as fraud_score,
    -- Individual flags
    amount_deviation > 3 as high_amount_deviation,
    transaction_hour BETWEEN 0 AND 5 as unusual_hours,
    foreign_transaction = 1 as foreign_country,
    new_device = 1 as new_device_flag,
    internal_ip = 1 as internal_ip_flag
  FROM transaction_features
)
SELECT
  transaction_id,
  customer_id,
  amount,
  transaction_date,
  merchant_id,
  ROUND(fraud_score, 3) as fraud_score,
  high_amount_deviation,
  unusual_hours,
  foreign_country,
  new_device_flag,
  internal_ip_flag,
  CASE
    WHEN fraud_score >= 0.7 THEN 'HIGH RISK'
    WHEN fraud_score >= 0.4 THEN 'MEDIUM RISK'
    WHEN fraud_score >= 0.2 THEN 'LOW RISK'
    ELSE 'NORMAL'
  END as risk_level,
  CASE
    WHEN fraud_score >= 0.7 THEN 'Review immediately and consider blocking'
    WHEN fraud_score >= 0.4 THEN 'Review and potentially request verification'
    WHEN fraud_score >= 0.2 THEN 'Monitor for additional suspicious activity'
    ELSE 'No action needed'
  END as recommended_action
FROM fraud_scoring
WHERE fraud_score >= 0.2
ORDER BY fraud_score DESC, amount DESC;

-- Merchant-level fraud analysis
SELECT
  merchant_id,
  m.merchant_name,
  COUNT(*) as total_transactions,
  SUM(amount) as total_amount,
  AVG(fs.fraud_score) as avg_fraud_score,
  SUM(CASE WHEN fs.fraud_score >= 0.4 THEN 1 ELSE 0 END) as suspicious_transactions,
  ROUND(SUM(CASE WHEN fs.fraud_score >= 0.4 THEN 1 ELSE 0 END)::DECIMAL / 
        COUNT(*) * 100, 2) as suspicious_percentage
FROM fraud_scoring fs
JOIN merchants m ON fs.merchant_id = m.merchant_id
GROUP BY merchant_id, m.merchant_name
HAVING COUNT(*) >= 10
ORDER BY suspicious_percentage DESC;

-- Real-time fraud detection view for monitoring
CREATE VIEW real_time_fraud_monitor AS
SELECT
  transaction_id,
  customer_id,
  amount,
  transaction_date,
  fraud_score,
  risk_level,
  EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - transaction_date)) / 60 as minutes_ago
FROM fraud_scoring
WHERE transaction_date >= CURRENT_TIMESTAMP - INTERVAL '1 hour'
AND fraud_score >= 0.4
ORDER BY transaction_date DESC;`,
      },
      {
        id: 26,
        question:
          "Write a query to segment customers based on purchase behavior",
        solution: `-- RFM (Recency, Frequency, Monetary) Segmentation
WITH customer_rfm AS (
  SELECT
    customer_id,
    -- Recency: days since last purchase
    EXTRACT(DAY FROM (CURRENT_DATE - MAX(order_date))) as recency,
    -- Frequency: number of purchases in last 12 months
    COUNT(DISTINCT order_id) as frequency,
    -- Monetary: total spending in last 12 months
    SUM(order_amount) as monetary
  FROM orders
  WHERE order_date >= CURRENT_DATE - INTERVAL '12 months'
  GROUP BY customer_id
  HAVING SUM(order_amount) > 0
),
rfm_scores AS (
  SELECT
    customer_id,
    recency,
    frequency,
    monetary,
    -- Score each dimension (1-5, with 5 being best)
    NTILE(5) OVER (ORDER BY recency DESC) as recency_score,
    NTILE(5) OVER (ORDER BY frequency) as frequency_score,
    NTILE(5) OVER (ORDER BY monetary) as monetary_score,
    -- Combined RFM score
    (NTILE(5) OVER (ORDER BY recency DESC) * 100) +
    (NTILE(5) OVER (ORDER BY frequency) * 10) +
    NTILE(5) OVER (ORDER BY monetary) as rfm_score
  FROM customer_rfm
),
rfm_segments AS (
  SELECT
    customer_id,
    recency,
    frequency,
    monetary,
    recency_score,
    frequency_score,
    monetary_score,
    rfm_score,
    CASE
      WHEN recency_score >= 4 AND frequency_score >= 4 AND monetary_score >= 4 THEN 'Champions'
      WHEN recency_score >= 3 AND frequency_score >= 3 AND monetary_score >= 3 THEN 'Loyal Customers'
      WHEN recency_score >= 4 THEN 'New Customers'
      WHEN recency_score >= 3 AND frequency_score >= 1 AND monetary_score >= 1 THEN 'Potential Loyalists'
      WHEN recency_score >= 2 AND frequency_score >= 2 AND monetary_score >= 2 THEN 'Need Attention'
      WHEN recency_score <= 2 AND frequency_score >= 3 AND monetary_score >= 3 THEN 'At Risk'
      WHEN recency_score <= 1 AND frequency_score >= 1 AND monetary_score >= 1 THEN 'Cant Lose Them'
      WHEN recency_score <= 2 AND frequency_score <= 2 AND monetary_score <= 2 THEN 'Hibernating'
      ELSE 'Others'
    END as rfm_segment
  FROM rfm_scores
)
SELECT
  rfm_segment,
  COUNT(*) as customer_count,
  ROUND(AVG(recency), 1) as avg_recency_days,
  ROUND(AVG(frequency), 1) as avg_frequency,
  ROUND(AVG(monetary), 2) as avg_monetary,
  ROUND(SUM(monetary), 2) as total_monetary,
  ROUND(COUNT(*)::DECIMAL / (SELECT COUNT(*) FROM rfm_segments) * 100, 2) as percentage
FROM rfm_segments
GROUP BY rfm_segment
ORDER BY total_monetary DESC;

-- Additional behavioral segmentation
WITH customer_behavior AS (
  SELECT
    o.customer_id,
    c.customer_name,
    c.join_date,
    -- Purchase behavior
    COUNT(DISTINCT o.order_id) as total_orders,
    SUM(o.order_amount) as total_spent,
    AVG(o.order_amount) as avg_order_value,
    MIN(o.order_date) as first_order_date,
    MAX(o.order_date) as last_order_date,
    -- Product preferences
    COUNT(DISTINCT oi.product_id) as unique_products,
    MAX(p.category) as favorite_category,
    -- Time patterns
    AVG(EXTRACT(HOUR FROM o.order_date)) as avg_order_hour,
    MODE() WITHIN GROUP (ORDER BY EXTRACT(DOW FROM o.order_date)) as most_common_day
  FROM orders o
  JOIN customers c ON o.customer_id = c.customer_id
  JOIN order_items oi ON o.order_id = oi.order_id
  JOIN products p ON oi.product_id = p.product_id
  GROUP BY o.customer_id, c.customer_name, c.join_date
),
behavior_segments AS (
  SELECT
    customer_id,
    customer_name,
    total_orders,
    total_spent,
    avg_order_value,
    -- Segment based on behavior patterns
    CASE
      WHEN total_orders >= 10 AND total_spent >= 1000 THEN 'VIP'
      WHEN total_orders >= 5 AND total_spent >= 500 THEN 'Premium'
      WHEN total_orders >= 2 THEN 'Regular'
      ELSE 'New/Infrequent'
    END as value_segment,
    
    CASE
      WHEN avg_order_hour BETWEEN 9 AND 17 THEN 'Day Shopper'
      WHEN avg_order_hour BETWEEN 18 AND 23 THEN 'Evening Shopper'
      ELSE 'Night Owl'
    END as time_segment,
    
    CASE
      WHEN unique_products >= 10 THEN 'Variety Seeker'
      WHEN unique_products BETWEEN 5 AND 9 THEN 'Moderate Explorer'
      ELSE 'Brand Loyal'
    END as variety_segment
  FROM customer_behavior
)
SELECT
  value_segment,
  time_segment,
  variety_segment,
  COUNT(*) as customer_count,
  ROUND(AVG(total_spent), 2) as avg_spent,
  ROUND(AVG(total_orders), 1) as avg_orders
FROM behavior_segments
GROUP BY value_segment, time_segment, variety_segment
ORDER BY value_segment, customer_count DESC;`,
      },
      {
        id: 27,
        question: "How do you calculate the impact of promotional campaigns?",
        solution: `-- Promotional campaign impact analysis
WITH campaign_periods AS (
  SELECT
    campaign_id,
    campaign_name,
    start_date,
    end_date,
    discount_percentage,
    promotion_type
  FROM promotions
  WHERE end_date >= CURRENT_DATE - INTERVAL '6 months'
),
campaign_performance AS (
  SELECT
    cp.campaign_id,
    cp.campaign_name,
    cp.start_date,
    cp.end_date,
    cp.discount_percentage,
    cp.promotion_type,
    -- Sales during campaign
    COUNT(DISTINCT o.order_id) as campaign_orders,
    SUM(o.order_amount) as campaign_revenue,
    SUM(oi.quantity) as campaign_units,
    -- Baseline sales (same period before campaign)
    (SELECT COUNT(DISTINCT order_id)
     FROM orders 
     WHERE order_date BETWEEN cp.start_date - INTERVAL '30 days' AND cp.end_date - INTERVAL '30 days'
    ) as baseline_orders,
    (SELECT SUM(order_amount)
     FROM orders 
     WHERE order_date BETWEEN cp.start_date - INTERVAL '30 days' AND cp.end_date - INTERVAL '30 days'
    ) as baseline_revenue,
    -- Incremental impact
    COUNT(DISTINCT o.order_id) - 
    (SELECT COUNT(DISTINCT order_id)
     FROM orders 
     WHERE order_date BETWEEN cp.start_date - INTERVAL '30 days' AND cp.end_date - INTERVAL '30 days'
    ) as incremental_orders,
    SUM(o.order_amount) - 
    (SELECT SUM(order_amount)
     FROM orders 
     WHERE order_date BETWEEN cp.start_date - INTERVAL '30 days' AND cp.end_date - INTERVAL '30 days'
    ) as incremental_revenue,
    -- Campaign cost
    SUM(o.order_amount * cp.discount_percentage / 100) as total_discount_amount
  FROM campaign_periods cp
  LEFT JOIN orders o ON o.order_date BETWEEN cp.start_date AND cp.end_date
  LEFT JOIN order_items oi ON o.order_id = oi.order_id
  GROUP BY cp.campaign_id, cp.campaign_name, cp.start_date, cp.end_date, 
           cp.discount_percentage, cp.promotion_type
)
SELECT
  campaign_id,
  campaign_name,
  start_date,
  end_date,
  promotion_type,
  discount_percentage,
  campaign_orders,
  campaign_revenue,
  baseline_orders,
  baseline_revenue,
  incremental_orders,
  incremental_revenue,
  total_discount_amount,
  -- Calculate ROI
  ROUND((incremental_revenue - total_discount_amount) / NULLIF(total_discount_amount, 0), 2) as roi,
  -- Calculate incremental revenue per dollar spent
  ROUND(incremental_revenue / NULLIF(total_discount_amount, 0), 2) as revenue_per_discount_dollar,
  -- Statistical significance
  CASE
    WHEN baseline_orders > 0 AND campaign_orders > 0 THEN
      ABS(campaign_orders - baseline_orders) / 
      SQRT(baseline_orders + campaign_orders)
    ELSE 0
  END as statistical_significance,
  -- Campaign effectiveness rating
  CASE
    WHEN (incremental_revenue - total_discount_amount) > 0 THEN 'Profitable'
    WHEN incremental_revenue > 0 THEN 'Revenue Positive'
    ELSE 'Ineffective'
  END as effectiveness
FROM campaign_performance
ORDER BY roi DESC;

-- Product-level campaign impact
SELECT
  p.product_id,
  p.product_name,
  cp.campaign_name,
  SUM(oi.quantity) as units_sold_during_campaign,
  (SELECT SUM(quantity)
   FROM order_items oi2
   JOIN orders o2 ON oi2.order_id = o2.order_id
   WHERE oi2.product_id = p.product_id
   AND o2.order_date BETWEEN cp.start_date - INTERVAL '30 days' AND cp.end_date - INTERVAL '30 days'
  ) as baseline_units,
  SUM(oi.quantity) - 
  (SELECT SUM(quantity)
   FROM order_items oi2
   JOIN orders o2 ON oi2.order_id = o2.order_id
   WHERE oi2.product_id = p.product_id
   AND o2.order_date BETWEEN cp.start_date - INTERVAL '30 days' AND cp.end_date - INTERVAL '30 days'
  ) as incremental_units,
  ROUND((SUM(oi.quantity) - 
   (SELECT SUM(quantity)
    FROM order_items oi2
    JOIN orders o2 ON oi2.order_id = o2.order_id
    WHERE oi2.product_id = p.product_id
    AND o2.order_date BETWEEN cp.start_date - INTERVAL '30 days' AND cp.end_date - INTERVAL '30 days'
   )) / NULLIF(
   (SELECT SUM(quantity)
    FROM order_items oi2
    JOIN orders o2 ON oi2.order_id = o2.order_id
    WHERE oi2.product_id = p.product_id
    AND o2.order_date BETWEEN cp.start_date - INTERVAL '30 days' AND cp.end_date - INTERVAL '30 days'
   ), 0) * 100, 2) as uplift_percentage
FROM campaign_periods cp
JOIN orders o ON o.order_date BETWEEN cp.start_date AND cp.end_date
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id
GROUP BY p.product_id, p.product_name, cp.campaign_name, cp.start_date, cp.end_date
HAVING SUM(oi.quantity) >= 10
ORDER BY uplift_percentage DESC;`,
      },
      {
        id: 28,
        question:
          "Write a query to identify churned customers and their characteristics",
        solution: `-- Customer churn analysis
WITH customer_activity AS (
  SELECT
    c.customer_id,
    c.customer_name,
    c.join_date,
    c.customer_segment,
    MAX(o.order_date) as last_order_date,
    COUNT(DISTINCT o.order_id) as total_orders,
    SUM(o.order_amount) as total_spent,
    -- Days since last activity
    EXTRACT(DAY FROM (CURRENT_DATE - MAX(o.order_date))) as days_since_last_order,
    -- Average order frequency
    EXTRACT(DAY FROM (MAX(o.order_date) - MIN(o.order_date))) / 
    NULLIF(COUNT(DISTINCT o.order_id) - 1, 0) as avg_days_between_orders
  FROM customers c
  LEFT JOIN orders o ON c.customer_id = o.customer_id
  GROUP BY c.customer_id, c.customer_name, c.join_date, c.customer_segment
),
churn_candidates AS (
  SELECT
    customer_id,
    customer_name,
    join_date,
    customer_segment,
    last_order_date,
    total_orders,
    total_spent,
    days_since_last_order,
    avg_days_between_orders,
    -- Churn probability based on activity patterns
    CASE
      WHEN total_orders = 0 THEN 1.0
      WHEN days_since_last_order > avg_days_between_orders * 3 THEN 0.8
      WHEN days_since_last_order > avg_days_between_orders * 2 THEN 0.6
      WHEN days_since_last_order > avg_days_between_orders * 1.5 THEN 0.4
      ELSE 0.2
    END as churn_probability,
    -- Churn status
    CASE
      WHEN total_orders = 0 AND join_date < CURRENT_DATE - INTERVAL '90 days' THEN 'Never Activated'
      WHEN days_since_last_order > 90 THEN 'Churned (>90 days)'
      WHEN days_since_last_order > 60 THEN 'At Risk (>60 days)'
      WHEN days_since_last_order > 30 THEN 'Dormant (>30 days)'
      ELSE 'Active'
    END as churn_status
  FROM customer_activity
)
SELECT
  churn_status,
  COUNT(*) as customer_count,
  ROUND(AVG(total_orders), 1) as avg_orders,
  ROUND(AVG(total_spent), 2) as avg_spent,
  ROUND(AVG(days_since_last_order), 1) as avg_days_inactive,
  ROUND(AVG(churn_probability) * 100, 2) as avg_churn_probability,
  -- Customer value at risk
  SUM(CASE WHEN churn_status IN ('Churned (>90 days)', 'At Risk (>60 days)') 
           THEN total_spent ELSE 0 END) as revenue_at_risk,
  -- Segment analysis
  MODE() WITHIN GROUP (ORDER BY customer_segment) as most_common_segment
FROM churn_candidates
GROUP BY churn_status
ORDER BY 
  CASE churn_status
    WHEN 'Churned (>90 days)' THEN 1
    WHEN 'At Risk (>60 days)' THEN 2
    WHEN 'Dormant (>30 days)' THEN 3
    WHEN 'Never Activated' THEN 4
    ELSE 5
  END;

-- Detailed churn characteristics
SELECT
  cc.customer_id,
  cc.customer_name,
  cc.churn_status,
  cc.churn_probability,
  cc.total_orders,
  cc.total_spent,
  cc.days_since_last_order,
  c.email,
  c.phone,
  c.location,
  -- Last order details
  (SELECT product_name 
   FROM order_items oi
   JOIN products p ON oi.product_id = p.product_id
   JOIN orders o ON oi.order_id = o.order_id
   WHERE o.customer_id = cc.customer_id
   ORDER BY o.order_date DESC
   LIMIT 1) as last_product,
  -- Customer service interactions
  (SELECT COUNT(*)
   FROM customer_service_tickets cst
   WHERE cst.customer_id = cc.customer_id) as support_tickets,
  -- Feedback sentiment
  (SELECT AVG(sentiment_score)
   FROM customer_feedback cf
   WHERE cf.customer_id = cc.customer_id) as avg_feedback_sentiment
FROM churn_candidates cc
JOIN customers c ON cc.customer_id = c.customer_id
WHERE cc.churn_status IN ('Churned (>90 days)', 'At Risk (>60 days)')
ORDER BY cc.churn_probability DESC, cc.total_spent DESC;

-- Churn prediction model training data
SELECT
  customer_id,
  total_orders,
  total_spent,
  days_since_last_order,
  avg_days_between_orders,
  EXTRACT(MONTH FROM AGE(CURRENT_DATE, join_date)) as tenure_months,
  CASE WHEN customer_segment = 'VIP' THEN 1 ELSE 0 END as is_vip,
  churn_status,
  churn_probability
FROM churn_candidates
WHERE total_orders > 0  -- Only customers with at least one order
ORDER BY customer_id;`,
      },
      {
        id: 29,
        question: "How do you analyze customer journey funnels using SQL?",
        solution: `-- Customer journey funnel analysis
WITH user_journey AS (
  SELECT
    user_id,
    session_id,
    MIN(event_timestamp) as session_start,
    MAX(event_timestamp) as session_end,
    -- Check for each step in the funnel
    MAX(CASE WHEN event_name = 'page_view' THEN 1 ELSE 0 END) as viewed_page,
    MAX(CASE WHEN event_name = 'product_view' THEN 1 ELSE 0 END) as viewed_product,
    MAX(CASE WHEN event_name = 'add_to_cart' THEN 1 ELSE 0 END) as added_to_cart,
    MAX(CASE WHEN event_name = 'checkout_start' THEN 1 ELSE 0 END) as started_checkout,
    MAX(CASE WHEN event_name = 'purchase_complete' THEN 1 ELSE 0 END) as completed_purchase
  FROM user_events
  WHERE event_timestamp >= CURRENT_DATE - INTERVAL '30 days'
  GROUP BY user_id, session_id
),
funnel_steps AS (
  SELECT
    COUNT(DISTINCT session_id) as total_sessions,
    SUM(viewed_page) as step1_page_views,
    SUM(viewed_product) as step2_product_views,
    SUM(added_to_cart) as step3_add_to_cart,
    SUM(started_checkout) as step4_checkout_start,
    SUM(completed_purchase) as step5_purchase_complete
  FROM user_journey
),
funnel_rates AS (
  SELECT
    total_sessions,
    step1_page_views,
    step2_product_views,
    step3_add_to_cart,
    step4_checkout_start,
    step5_purchase_complete,
    -- Conversion rates between steps
    ROUND(step2_product_views::DECIMAL / NULLIF(step1_page_views, 0) * 100, 2) as page_to_product_rate,
    ROUND(step3_add_to_cart::DECIMAL / NULLIF(step2_product_views, 0) * 100, 2) as product_to_cart_rate,
    ROUND(step4_checkout_start::DECIMAL / NULLIF(step3_add_to_cart, 0) * 100, 2) as cart_to_checkout_rate,
    ROUND(step5_purchase_complete::DECIMAL / NULLIF(step4_checkout_start, 0) * 100, 2) as checkout_to_purchase_rate,
    -- Overall conversion rate
    ROUND(step5_purchase_complete::DECIMAL / NULLIF(step1_page_views, 0) * 100, 4) as overall_conversion_rate
  FROM funnel_steps
)
SELECT
  total_sessions,
  step1_page_views,
  step2_product_views,
  step3_add_to_cart,
  step4_checkout_start,
  step5_purchase_complete,
  page_to_product_rate,
  product_to_cart_rate,
  cart_to_checkout_rate,
  checkout_to_purchase_rate,
  overall_conversion_rate,
  -- Identify biggest drop-off point
  CASE
    WHEN page_to_product_rate <= 50 THEN 'Page to Product'
    WHEN product_to_cart_rate <= 30 THEN 'Product to Cart'
    WHEN cart_to_checkout_rate <= 40 THEN 'Cart to Checkout'
    WHEN checkout_to_purchase_rate <= 60 THEN 'Checkout to Purchase'
    ELSE 'All steps performing well'
  END as biggest_dropoff_point
FROM funnel_rates;

-- Funnel analysis by traffic source
SELECT
  u.traffic_source,
  COUNT(DISTINCT uj.session_id) as total_sessions,
  SUM(uj.viewed_page) as page_views,
  SUM(uj.viewed_product) as product_views,
  SUM(uj.added_to_cart) as add_to_cart,
  SUM(uj.started_checkout) as checkout_start,
  SUM(uj.completed_purchase) as purchase_complete,
  ROUND(SUM(uj.viewed_product)::DECIMAL / NULLIF(SUM(uj.viewed_page), 0) * 100, 2) as page_to_product_rate,
  ROUND(SUM(uj.added_to_cart)::DECIMAL / NULLIF(SUM(uj.viewed_product), 0) * 100, 2) as product_to_cart_rate,
  ROUND(SUM(uj.completed_purchase)::DECIMAL / NULLIF(SUM(uj.viewed_page), 0) * 100, 4) as overall_conversion_rate
FROM user_journey uj
JOIN user_sessions u ON uj.session_id = u.session_id
GROUP BY u.traffic_source
HAVING COUNT(DISTINCT uj.session_id) >= 100
ORDER BY overall_conversion_rate DESC;

-- Time-based funnel analysis
SELECT
  DATE_TRUNC('day', uj.session_start) as journey_date,
  COUNT(DISTINCT uj.session_id) as daily_sessions,
  SUM(uj.viewed_page) as daily_page_views,
  SUM(uj.completed_purchase) as daily_purchases,
  ROUND(SUM(uj.completed_purchase)::DECIMAL / NULLIF(SUM(uj.viewed_page), 0) * 100, 4) as daily_conversion_rate,
  -- 7-day moving average conversion rate
  AVG(SUM(uj.completed_purchase)::DECIMAL / NULLIF(SUM(uj.viewed_page), 0)) 
    OVER (ORDER BY DATE_TRUNC('day', uj.session_start) 
          ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) * 100 as moving_avg_conversion_rate
FROM user_journey uj
GROUP BY DATE_TRUNC('day', uj.session_start)
ORDER BY journey_date DESC;`,
      },
      {
        id: 30,
        question:
          "Write a query to calculate revenue per visitor for e-commerce",
        solution: `-- Revenue per visitor (RPV) calculation
WITH visitor_revenue AS (
  SELECT
    u.user_id,
    u.traffic_source,
    u.device_type,
    u.country,
    COUNT(DISTINCT u.session_id) as total_sessions,
    SUM(CASE WHEN e.event_name = 'purchase_complete' THEN e.order_amount ELSE 0 END) as total_revenue,
    COUNT(DISTINCT CASE WHEN e.event_name = 'purchase_complete' THEN e.order_id END) as total_orders
  FROM user_sessions u
  LEFT JOIN user_events e ON u.session_id = e.session_id
  WHERE u.visit_date >= CURRENT_DATE - INTERVAL '30 days'
  GROUP BY u.user_id, u.traffic_source, u.device_type, u.country
),
rpv_calculation AS (
  SELECT
    user_id,
    traffic_source,
    device_type,
    country,
    total_sessions,
    total_revenue,
    total_orders,
    -- Revenue per visitor
    ROUND(total_revenue / NULLIF(total_sessions, 0), 2) as revenue_per_visit,
    -- Average order value
    ROUND(total_revenue / NULLIF(total_orders, 0), 2) as average_order_value,
    -- Conversion rate
    ROUND(total_orders::DECIMAL / NULLIF(total_sessions, 0) * 100, 2) as conversion_rate
  FROM visitor_revenue
)
SELECT
  traffic_source,
  device_type,
  country,
  COUNT(DISTINCT user_id) as unique_visitors,
  SUM(total_sessions) as total_visits,
  SUM(total_revenue) as total_revenue,
  SUM(total_orders) as total_orders,
  ROUND(SUM(total_revenue) / NULLIF(SUM(total_sessions), 0), 2) as overall_rpv,
  ROUND(AVG(revenue_per_visit), 2) as avg_rpv_per_visitor,
  ROUND(SUM(total_orders)::DECIMAL / NULLIF(SUM(total_sessions), 0) * 100, 2) as overall_conversion_rate,
  -- Statistical significance
  STDDEV(revenue_per_visit) as rpv_std_dev,
  MIN(revenue_per_visit) as min_rpv,
  MAX(revenue_per_visit) as max_rpv
FROM rpv_calculation
GROUP BY traffic_source, device_type, country
HAVING SUM(total_sessions) >= 100
ORDER BY overall_rpv DESC;

-- RPV trend analysis over time
SELECT
  DATE_TRUNC('day', u.visit_date) as visit_date,
  u.traffic_source,
  COUNT(DISTINCT u.user_id) as daily_visitors,
  COUNT(DISTINCT u.session_id) as daily_sessions,
  SUM(CASE WHEN e.event_name = 'purchase_complete' THEN e.order_amount ELSE 0 END) as daily_revenue,
  ROUND(SUM(CASE WHEN e.event_name = 'purchase_complete' THEN e.order_amount ELSE 0 END) / 
        NULLIF(COUNT(DISTINCT u.session_id), 0), 2) as daily_rpv,
  -- 7-day moving average RPV
  AVG(SUM(CASE WHEN e.event_name = 'purchase_complete' THEN e.order_amount ELSE 0 END) / 
      NULLIF(COUNT(DISTINCT u.session_id), 0)) 
    OVER (PARTITION BY u.traffic_source 
          ORDER BY DATE_TRUNC('day', u.visit_date)
          ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) as moving_avg_rpv
FROM user_sessions u
LEFT JOIN user_events e ON u.session_id = e.session_id
WHERE u.visit_date >= CURRENT_DATE - INTERVAL '90 days'
GROUP BY DATE_TRUNC('day', u.visit_date), u.traffic_source
HAVING COUNT(DISTINCT u.session_id) >= 10
ORDER BY visit_date DESC, daily_rpv DESC;

-- Cohort-based RPV analysis
WITH visitor_cohorts AS (
  SELECT
    user_id,
    DATE_TRUNC('month', MIN(visit_date)) as cohort_month,
    traffic_source
  FROM user_sessions
  GROUP BY user_id, traffic_source
),
cohort_rpv AS (
  SELECT
    vc.cohort_month,
    vc.traffic_source,
    EXTRACT(MONTH FROM AGE(u.visit_date, vc.cohort_month)) as months_since_cohort,
    COUNT(DISTINCT u.session_id) as cohort_sessions,
    SUM(CASE WHEN e.event_name = 'purchase_complete' THEN e.order_amount ELSE 0 END) as cohort_revenue,
    ROUND(SUM(CASE WHEN e.event_name = 'purchase_complete' THEN e.order_amount ELSE 0 END) / 
          NULLIF(COUNT(DISTINCT u.session_id), 0), 2) as cohort_rpv
  FROM visitor_cohorts vc
  JOIN user_sessions u ON vc.user_id = u.user_id
  LEFT JOIN user_events e ON u.session_id = e.session_id
  WHERE vc.cohort_month >= CURRENT_DATE - INTERVAL '12 months'
  GROUP BY vc.cohort_month, vc.traffic_source, EXTRACT(MONTH FROM AGE(u.visit_date, vc.cohort_month))
)
SELECT
  cohort_month,
  traffic_source,
  months_since_cohort,
  cohort_sessions,
  cohort_revenue,
  cohort_rpv,
  -- Percentage change from previous month
  ROUND((cohort_rpv - LAG(cohort_rpv) OVER (PARTITION BY cohort_month, traffic_source ORDER BY months_since_cohort)) /
        NULLIF(LAG(cohort_rpv) OVER (PARTITION BY cohort_month, traffic_source ORDER BY months_since_cohort), 0) * 100, 2) 
        as rpv_growth_percent
FROM cohort_rpv
WHERE cohort_sessions >= 50
ORDER BY cohort_month DESC, months_since_cohort;`,
      },
      {
        id: 31,
        question: "How do you identify peak usage hours for an application?",
        solution: `-- Identify peak usage hours
WITH usage_by_hour AS (
  SELECT
    DATE_TRUNC('hour', event_timestamp) as usage_hour,
    EXTRACT(HOUR FROM event_timestamp) as hour_of_day,
    TO_CHAR(event_timestamp, 'Day') as day_name,
    COUNT(DISTINCT user_id) as unique_users,
    COUNT(DISTINCT session_id) as total_sessions,
    COUNT(*) as total_events,
    -- Different types of events
    SUM(CASE WHEN event_type = 'page_view' THEN 1 ELSE 0 END) as page_views,
    SUM(CASE WHEN event_type = 'api_call' THEN 1 ELSE 0 END) as api_calls,
    SUM(CASE WHEN event_type = 'transaction' THEN 1 ELSE 0 END) as transactions
  FROM application_events
  WHERE event_timestamp >= CURRENT_DATE - INTERVAL '30 days'
  GROUP BY DATE_TRUNC('hour', event_timestamp), EXTRACT(HOUR FROM event_timestamp), TO_CHAR(event_timestamp, 'Day')
),
hourly_stats AS (
  SELECT
    hour_of_day,
    day_name,
    AVG(unique_users) as avg_unique_users,
    AVG(total_sessions) as avg_sessions,
    AVG(total_events) as avg_events,
    AVG(page_views) as avg_page_views,
    AVG(api_calls) as avg_api_calls,
    AVG(transactions) as avg_transactions,
    PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY unique_users) as p95_users,
    PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY total_events) as p95_events,
    -- Peak hour identification
    CASE
      WHEN AVG(unique_users) >= PERCENTILE_CONT(0.75) OVER (ORDER BY AVG(unique_users)) THEN 'Peak Hour'
      WHEN AVG(unique_users) <= PERCENTILE_CONT(0.25) OVER (ORDER BY AVG(unique_users)) THEN 'Off-Peak Hour'
      ELSE 'Normal Hour'
    END as usage_category
  FROM usage_by_hour
  GROUP BY hour_of_day, day_name
)
SELECT
  hour_of_day,
  day_name,
  ROUND(avg_unique_users, 0) as avg_users_per_hour,
  ROUND(avg_events, 0) as avg_events_per_hour,
  ROUND(avg_api_calls, 0) as avg_api_calls_per_hour,
  ROUND(p95_users, 0) as p95_users_per_hour,
  ROUND(p95_events, 0) as p95_events_per_hour,
  usage_category,
  -- Load factor (peak vs average)
  ROUND(avg_unique_users / NULLIF(MIN(avg_unique_users) OVER (), 0), 2) as load_factor,
  -- Recommended scaling strategy
  CASE
    WHEN usage_category = 'Peak Hour' AND p95_users > avg_unique_users * 2 THEN 'Scale up before peak'
    WHEN usage_category = 'Off-Peak Hour' AND avg_unique_users < 10 THEN 'Scale down'
    ELSE 'Maintain current capacity'
  END as scaling_recommendation
FROM hourly_stats
ORDER BY day_name, hour_of_day;

-- Peak usage analysis by day of week
SELECT
  EXTRACT(DOW FROM event_timestamp) as day_of_week,
  TO_CHAR(event_timestamp, 'Day') as day_name,
  COUNT(DISTINCT user_id) as unique_users,
  COUNT(DISTINCT session_id) as total_sessions,
  COUNT(*) as total_events,
  ROUND(COUNT(*)::DECIMAL / 24, 0) as avg_events_per_hour,
  MAX(COUNT(*)) OVER (PARTITION BY EXTRACT(DOW FROM event_timestamp)) as peak_daily_events,
  -- Busiest hour for each day
  MODE() WITHIN GROUP (ORDER BY EXTRACT(HOUR FROM event_timestamp)) as peak_hour
FROM application_events
WHERE event_timestamp >= CURRENT_DATE - INTERVAL '90 days'
GROUP BY EXTRACT(DOW FROM event_timestamp), TO_CHAR(event_timestamp, 'Day')
ORDER BY day_of_week;

-- Real-time peak detection for monitoring
WITH current_usage AS (
  SELECT
    DATE_TRUNC('hour', event_timestamp) as current_hour,
    COUNT(DISTINCT user_id) as current_users,
    COUNT(*) as current_events,
    AVG(COUNT(DISTINCT user_id)) OVER (
      ORDER BY DATE_TRUNC('hour', event_timestamp)
      ROWS BETWEEN 24 PRECEDING AND 1 PRECEDING
    ) as trailing_24h_avg
  FROM application_events
  WHERE event_timestamp >= CURRENT_TIMESTAMP - INTERVAL '1 hour'
  GROUP BY DATE_TRUNC('hour', event_timestamp)
)
SELECT
  current_hour,
  current_users,
  current_events,
  trailing_24h_avg,
  ROUND((current_users - trailing_24h_avg) / NULLIF(trailing_24h_avg, 0) * 100, 2) as deviation_percent,
  CASE
    WHEN current_users > trailing_24h_avg * 1.5 THEN 'CRITICAL: Unusual peak detected'
    WHEN current_users > trailing_24h_avg * 1.3 THEN 'WARNING: High load detected'
    WHEN current_users < trailing_24h_avg * 0.5 THEN 'INFO: Low load period'
    ELSE 'NORMAL'
  END as load_status
FROM current_usage;`,
      },
      {
        id: 32,
        question: "Explain Common Table Expressions (CTEs) with examples",
        solution: `-- Common Table Expressions (CTEs) explanation and examples

/*
WHAT ARE CTEs?
- CTEs are temporary named result sets that exist only within the execution of a single SQL statement
- They improve readability and maintainability of complex queries
- They can be recursive (for hierarchical data) or non-recursive
- CTEs are defined using the WITH clause
*/

-- Example 1: Basic CTE for readability
WITH recent_orders AS (
  SELECT 
    customer_id,
    order_date,
    order_amount
  FROM orders
  WHERE order_date >= CURRENT_DATE - INTERVAL '30 days'
)
SELECT 
  customer_id,
  COUNT(*) as order_count,
  SUM(order_amount) as total_spent
FROM recent_orders
GROUP BY customer_id
HAVING COUNT(*) >= 2
ORDER BY total_spent DESC;

-- Example 2: Multiple CTEs in single query
WITH 
customer_stats AS (
  SELECT 
    customer_id,
    COUNT(*) as total_orders,
    SUM(order_amount) as lifetime_value
  FROM orders
  GROUP BY customer_id
),
recent_activity AS (
  SELECT 
    customer_id,
    MAX(order_date) as last_order_date
  FROM orders
  GROUP BY customer_id
)
SELECT 
  c.customer_id,
  c.customer_name,
  cs.total_orders,
  cs.lifetime_value,
  ra.last_order_date,
  EXTRACT(DAY FROM (CURRENT_DATE - ra.last_order_date)) as days_since_last_order
FROM customers c
JOIN customer_stats cs ON c.customer_id = cs.customer_id
JOIN recent_activity ra ON c.customer_id = ra.customer_id
WHERE cs.lifetime_value > 1000
ORDER BY cs.lifetime_value DESC;

-- Example 3: CTE with window functions
WITH order_ranking AS (
  SELECT 
    customer_id,
    order_id,
    order_date,
    order_amount,
    ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC) as recent_rank,
    SUM(order_amount) OVER (PARTITION BY customer_id) as customer_total
  FROM orders
)
SELECT 
  customer_id,
  order_id,
  order_date,
  order_amount,
  customer_total,
  ROUND((order_amount / customer_total) * 100, 2) as percent_of_total
FROM order_ranking
WHERE recent_rank = 1  -- Most recent order for each customer
ORDER BY customer_total DESC;

-- Example 4: Recursive CTE for hierarchical data
WITH RECURSIVE category_tree AS (
  -- Anchor member: top-level categories
  SELECT 
    category_id,
    category_name,
    parent_category_id,
    1 as depth,
    category_name::TEXT as path
  FROM categories
  WHERE parent_category_id IS NULL
  
  UNION ALL
  
  -- Recursive member: subcategories
  SELECT 
    c.category_id,
    c.category_name,
    c.parent_category_id,
    ct.depth + 1,
    ct.path || ' > ' || c.category_name
  FROM categories c
  JOIN category_tree ct ON c.parent_category_id = ct.category_id
)
SELECT 
  category_id,
  category_name,
  depth,
  path
FROM category_tree
ORDER BY path;

-- Example 5: CTE for data transformation
WITH cleaned_data AS (
  SELECT 
    order_id,
    customer_id,
    -- Data cleaning operations
    TRIM(UPPER(product_name)) as normalized_product,
    NULLIF(order_amount, 0) as order_amount,  -- Replace 0 with NULL
    CASE 
      WHEN order_date < '2020-01-01' THEN NULL  -- Filter out old invalid dates
      ELSE order_date
    END as valid_order_date
  FROM raw_orders
  WHERE customer_id IS NOT NULL
),
aggregated_data AS (
  SELECT 
    customer_id,
    normalized_product,
    COUNT(*) as order_count,
    SUM(order_amount) as total_spent
  FROM cleaned_data
  WHERE valid_order_date IS NOT NULL
  GROUP BY customer_id, normalized_product
)
SELECT 
  normalized_product,
  COUNT(DISTINCT customer_id) as unique_customers,
  SUM(order_count) as total_orders,
  ROUND(AVG(total_spent), 2) as avg_customer_value
FROM aggregated_data
GROUP BY normalized_product
HAVING COUNT(DISTINCT customer_id) >= 5
ORDER BY total_orders DESC;

-- Example 6: CTE for complex business logic
WITH 
monthly_revenue AS (
  SELECT 
    DATE_TRUNC('month', order_date) as revenue_month,
    SUM(order_amount) as total_revenue
  FROM orders
  GROUP BY DATE_TRUNC('month', order_date)
),
growth_calculation AS (
  SELECT
    revenue_month,
    total_revenue,
    LAG(total_revenue) OVER (ORDER BY revenue_month) as previous_revenue,
    total_revenue - LAG(total_revenue) OVER (ORDER BY revenue_month) as revenue_growth,
    ROUND((total_revenue - LAG(total_revenue) OVER (ORDER BY revenue_month)) / 
          LAG(total_revenue) OVER (ORDER BY revenue_month) * 100, 2) as growth_percentage
  FROM monthly_revenue
)
SELECT
  revenue_month,
  total_revenue,
  previous_revenue,
  revenue_growth,
  growth_percentage,
  CASE
    WHEN growth_percentage > 10 THEN 'High Growth'
    WHEN growth_percentage > 0 THEN 'Moderate Growth'
    WHEN growth_percentage = 0 THEN 'Stagnant'
    ELSE 'Declining'
  END as growth_status
FROM growth_calculation
ORDER BY revenue_month DESC;

/*
BENEFITS OF USING CTEs:
1. Improved readability and maintainability
2. Breaking down complex queries into logical parts
3. Ability to reference the same subquery multiple times
4. Support for recursive queries
5. Better performance in some cases (materialized CTEs in some databases)

LIMITATIONS:
1. CTEs are not stored objects and exist only during query execution
2. Performance may vary across different database systems
3. Some databases have limitations on recursive CTE depth
*/`,
      },
      {
        id: 33,
        question: "How do you use window functions for ranking?",
        solution: `-- Window functions for ranking data

/*
COMMON RANKING FUNCTIONS:
1. ROW_NUMBER() - Unique sequential integers
2. RANK() - Ranking with gaps for ties
3. DENSE_RANK() - Ranking without gaps for ties
4. NTILE(n) - Divides rows into n groups
*/

-- Example 1: Basic ranking of customers by total spending
WITH customer_ranking AS (
  SELECT
    customer_id,
    customer_name,
    SUM(order_amount) as total_spent,
    ROW_NUMBER() OVER (ORDER BY SUM(order_amount) DESC) as row_num,
    RANK() OVER (ORDER BY SUM(order_amount) DESC) as rank,
    DENSE_RANK() OVER (ORDER BY SUM(order_amount) DESC) as dense_rank,
    NTILE(4) OVER (ORDER BY SUM(order_amount) DESC) as quartile
  FROM orders o
  JOIN customers c ON o.customer_id = c.customer_id
  GROUP BY customer_id, customer_name
)
SELECT
  customer_id,
  customer_name,
  total_spent,
  row_num,
  rank,
  dense_rank,
  CASE quartile
    WHEN 1 THEN 'Top 25%'
    WHEN 2 THEN 'Upper Middle 25%'
    WHEN 3 THEN 'Lower Middle 25%'
    WHEN 4 THEN 'Bottom 25%'
  END as spending_quartile
FROM customer_ranking
ORDER BY total_spent DESC;

-- Example 2: Ranking within partitions (categories)
SELECT
  product_id,
  product_name,
  category,
  unit_price,
  -- Rank products by price within each category
  ROW_NUMBER() OVER (PARTITION BY category ORDER BY unit_price DESC) as price_rank_in_category,
  RANK() OVER (PARTITION BY category ORDER BY unit_price DESC) as price_rank_with_gaps,
  DENSE_RANK() OVER (PARTITION BY category ORDER BY unit_price DESC) as price_dense_rank,
  -- Compare to category average
  unit_price - AVG(unit_price) OVER (PARTITION BY category) as price_difference_from_avg,
  ROUND((unit_price / AVG(unit_price) OVER (PARTITION BY category) - 1) * 100, 2) as price_percent_difference
FROM products
ORDER BY category, unit_price DESC;

-- Example 3: Time-based ranking (most recent orders per customer)
SELECT
  customer_id,
  order_id,
  order_date,
  order_amount,
  ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC) as recent_order_rank,
  FIRST_VALUE(order_amount) OVER (PARTITION BY customer_id ORDER BY order_date DESC) as most_recent_order_amount,
  LAST_VALUE(order_amount) OVER (PARTITION BY customer_id ORDER BY order_date 
                                ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) as first_order_amount,
  -- Percentage of total spending for this order
  ROUND(order_amount * 100.0 / SUM(order_amount) OVER (PARTITION BY customer_id), 2) as percent_of_customer_total
FROM orders
QUALIFY ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC) <= 3
ORDER BY customer_id, order_date DESC;

-- Example 4: Advanced ranking with multiple criteria
WITH sales_ranking AS (
  SELECT
    s.salesperson_id,
    s.salesperson_name,
    r.region_name,
    SUM(o.order_amount) as total_sales,
    COUNT(DISTINCT o.customer_id) as unique_customers,
    -- Multiple ranking criteria
    ROW_NUMBER() OVER (ORDER BY SUM(o.order_amount) DESC) as sales_rank,
    RANK() OVER (PARTITION BY r.region_name ORDER BY SUM(o.order_amount) DESC) as region_sales_rank,
    DENSE_RANK() OVER (ORDER BY COUNT(DISTINCT o.customer_id) DESC) as customer_count_rank,
    -- Percentile ranking
    ROUND(PERCENT_RANK() OVER (ORDER BY SUM(o.order_amount)) * 100, 2) as sales_percentile,
    -- Moving average for context
    AVG(SUM(o.order_amount)) OVER (ORDER BY s.salesperson_id 
                                  ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING) as moving_avg_sales
  FROM orders o
  JOIN salespersons s ON o.salesperson_id = s.salesperson_id
  JOIN regions r ON s.region_id = r.region_id
  WHERE o.order_date >= CURRENT_DATE - INTERVAL '12 months'
  GROUP BY s.salesperson_id, s.salesperson_name, r.region_name
)
SELECT
  salesperson_id,
  salesperson_name,
  region_name,
  total_sales,
  unique_customers,
  sales_rank,
  region_sales_rank,
  customer_count_rank,
  sales_percentile,
  moving_avg_sales,
  CASE
    WHEN sales_percentile >= 90 THEN 'Top 10% Performer'
    WHEN sales_percentile >= 75 THEN 'Top 25% Performer'
    WHEN sales_percentile >= 50 THEN 'Above Average'
    ELSE 'Needs Improvement'
  END as performance_category
FROM sales_ranking
ORDER BY sales_rank;

-- Example 5: Ranking with filters and conditional logic
SELECT
  product_id,
  product_name,
  category,
  unit_price,
  units_in_stock,
  -- Rank by price but only consider products with sufficient stock
  CASE 
    WHEN units_in_stock > 0 THEN
      RANK() OVER (PARTITION BY category ORDER BY unit_price DESC)
    ELSE NULL
  END as in_stock_price_rank,
  -- Rank products by profitability (assuming 40% margin)
  RANK() OVER (ORDER BY (unit_price * 0.4) DESC) as profitability_rank,
  -- Rank within price ranges
  CASE
    WHEN unit_price < 50 THEN NTILE(4) OVER (PARTITION BY category, 
                                           CASE WHEN unit_price < 50 THEN 1 ELSE 0 END 
                                           ORDER BY unit_price DESC)
    WHEN unit_price BETWEEN 50 AND 200 THEN NTILE(4) OVER (PARTITION BY category, 
                                                         CASE WHEN unit_price BETWEEN 50 AND 200 THEN 1 ELSE 0 END 
                                                         ORDER BY unit_price DESC)
    ELSE NTILE(4) OVER (PARTITION BY category, 
                       CASE WHEN unit_price > 200 THEN 1 ELSE 0 END 
                       ORDER BY unit_price DESC)
  END as price_segment_rank
FROM products
WHERE discontinued = FALSE
ORDER BY category, unit_price DESC;

/*
PERFORMANCE CONSIDERATIONS:
1. Window functions can be expensive on large datasets
2. Proper indexing on PARTITION BY and ORDER BY columns improves performance
3. Consider using WHERE clauses to limit data before window function processing
4. Some databases optimize certain window functions better than others

USE CASES:
- Top-N per category queries
- Percentile calculations
- Running totals and moving averages
- Gap analysis (comparing to peers)
- Ranking for reporting and analytics
*/`,
      },
      {
        id: 34,
        question:
          "What is the difference between ROW_NUMBER(), RANK(), and DENSE_RANK()?",
        solution: `-- Differences between ROW_NUMBER(), RANK(), and DENSE_RANK()

/*
KEY DIFFERENCES:
1. ROW_NUMBER(): Assigns unique sequential integers to each row, even with ties
2. RANK(): Assigns same rank to tied values, with gaps in the sequence
3. DENSE_RANK(): Assigns same rank to tied values, without gaps in the sequence
*/

-- Demonstration with sample data
WITH sample_scores AS (
  SELECT 1 as student_id, 'Math' as subject, 95 as score UNION ALL
  SELECT 2, 'Math', 92 UNION ALL
  SELECT 3, 'Math', 92 UNION ALL  -- Tie with student 2
  SELECT 4, 'Math', 88 UNION ALL
  SELECT 5, 'Math', 88 UNION ALL  -- Tie with student 4
  SELECT 6, 'Math', 85 UNION ALL
  SELECT 7, 'Math', 82 UNION ALL
  SELECT 8, 'Math', 82 UNION ALL  -- Tie with student 7
  SELECT 9, 'Math', 78 UNION ALL
  SELECT 10, 'Math', 75
)
SELECT
  student_id,
  subject,
  score,
  ROW_NUMBER() OVER (ORDER BY score DESC) as row_number,
  RANK() OVER (ORDER BY score DESC) as rank,
  DENSE_RANK() OVER (ORDER BY score DESC) as dense_rank
FROM sample_scores
ORDER BY score DESC;

/*
EXPECTED RESULTS:
student_id | subject | score | row_number | rank | dense_rank
-----------+---------+-------+------------+------+-----------
1          | Math    | 95    | 1          | 1    | 1
2          | Math    | 92    | 2          | 2    | 2
3          | Math    | 92    | 3          | 2    | 2  -- Same rank as student 2
4          | Math    | 88    | 4          | 4    | 3  -- Rank jumps to 4 (gap), Dense continues to 3
5          | Math    | 88    | 5          | 4    | 3  -- Same as student 4
6          | Math    | 85    | 6          | 6    | 4  -- Rank jumps to 6, Dense continues to 4
7          | Math    | 82    | 7          | 7    | 5
8          | Math    | 82    | 8          | 7    | 5  -- Same as student 7
9          | Math    | 78    | 9          | 9    | 6  -- Rank jumps to 9
10         | Math    | 75    | 10         | 10   | 7
*/

-- Practical example with sales data
WITH sales_data AS (
  SELECT
    salesperson_id,
    region,
    sales_amount,
    ROW_NUMBER() OVER (PARTITION BY region ORDER BY sales_amount DESC) as row_num,
    RANK() OVER (PARTITION BY region ORDER BY sales_amount DESC) as rank,
    DENSE_RANK() OVER (PARTITION BY region ORDER BY sales_amount DESC) as dense_rank
  FROM sales
  WHERE sales_date >= CURRENT_DATE - INTERVAL '3 months'
)
SELECT
  salesperson_id,
  region,
  sales_amount,
  row_num,
  rank,
  dense_rank,
  CASE
    WHEN rank = 1 THEN 'Top Performer'
    WHEN dense_rank <= 3 THEN 'Top 3 in Region'
    WHEN dense_rank <= 10 THEN 'Top 10 in Region'
    ELSE 'Other'
  END as performance_category
FROM sales_data
ORDER BY region, sales_amount DESC;

-- When to use each function:

-- 1. Use ROW_NUMBER() when you need unique sequential numbers
--    Example: Pagination, selecting top N per group without ties
SELECT *
FROM (
  SELECT
    product_id,
    product_name,
    category,
    unit_price,
    ROW_NUMBER() OVER (PARTITION BY category ORDER BY unit_price DESC) as price_rank
  FROM products
) ranked
WHERE price_rank <= 5;  -- Exactly 5 products per category

-- 2. Use RANK() when you want to show position with gaps for ties
--    Example: Competition rankings where tied scores get same rank but next rank has gap
SELECT
  student_id,
  test_score,
  RANK() OVER (ORDER BY test_score DESC) as class_rank
FROM test_scores
ORDER BY class_rank;

-- 3. Use DENSE_RANK() when you want consecutive ranking without gaps
--    Example: Tier-based systems where you want continuous tier numbers
SELECT
  customer_id,
  total_spent,
  DENSE_RANK() OVER (ORDER BY total_spent DESC) as customer_tier
FROM customer_lifetime_value
ORDER BY customer_tier;

-- Advanced example showing all three functions together
WITH employee_salaries AS (
  SELECT
    department_id,
    employee_id,
    salary,
    ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) as row_num,
    RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as rank,
    DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as dense_rank,
    -- Additional context
    AVG(salary) OVER (PARTITION BY department_id) as avg_department_salary,
    salary - AVG(salary) OVER (PARTITION BY department_id) as difference_from_avg
  FROM employees
  WHERE active = true
)
SELECT
  department_id,
  employee_id,
  salary,
  row_num,
  rank,
  dense_rank,
  avg_department_salary,
  difference_from_avg,
  CASE
    WHEN rank = 1 THEN 'Highest Paid'
    WHEN dense_rank <= 3 THEN 'Top 3 in Department'
    WHEN salary > avg_department_salary THEN 'Above Average'
    ELSE 'Below Average'
  END as salary_status
FROM employee_salaries
ORDER BY department_id, salary DESC;

/*
PERFORMANCE NOTES:
- ROW_NUMBER() is generally the fastest as it doesn't need to handle ties
- RANK() and DENSE_RANK() have similar performance characteristics
- All three functions require sorting by the ORDER BY clause
- Partitioning can improve performance by allowing parallel processing
*/`,
      },
      {
        id: 35,
        question: "How do you use the LAG and LEAD functions?",
        solution: `-- Using LAG and LEAD functions for time series analysis

/*
LAG(): Accesses data from previous rows in the result set
LEAD(): Accesses data from following rows in the result set

Syntax:
LAG(column, offset, default_value) OVER (PARTITION BY ... ORDER BY ...)
LEAD(column, offset, default_value) OVER (PARTITION BY ... ORDER BY ...)
*/

-- Example 1: Basic LAG and LEAD for month-over-month comparison
WITH monthly_sales AS (
  SELECT
    DATE_TRUNC('month', order_date) as sales_month,
    SUM(order_amount) as total_sales,
    COUNT(DISTINCT order_id) as order_count
  FROM orders
  WHERE order_date >= CURRENT_DATE - INTERVAL '12 months'
  GROUP BY DATE_TRUNC('month', order_date)
)
SELECT
  sales_month,
  total_sales,
  order_count,
  -- Previous month values
  LAG(total_sales) OVER (ORDER BY sales_month) as previous_month_sales,
  LAG(order_count) OVER (ORDER BY sales_month) as previous_month_orders,
  -- Next month values
  LEAD(total_sales) OVER (ORDER BY sales_month) as next_month_sales,
  LEAD(order_count) OVER (ORDER BY sales_month) as next_month_orders,
  -- Month-over-month growth
  ROUND((total_sales - LAG(total_sales) OVER (ORDER BY sales_month)) / 
        LAG(total_sales) OVER (ORDER BY sales_month) * 100, 2) as sales_growth_percent,
  -- Difference from next month
  LEAD(total_sales) OVER (ORDER BY sales_month) - total_sales as sales_change_next_month
FROM monthly_sales
ORDER BY sales_month;

-- Example 2: Using LAG/LEAD with partitions (by category)
SELECT
  product_id,
  category,
  price_date,
  unit_price,
  -- Previous price in same category
  LAG(unit_price) OVER (PARTITION BY category ORDER BY price_date) as previous_price,
  -- Next price in same category
  LEAD(unit_price) OVER (PARTITION BY category ORDER BY price_date) as next_price,
  -- Price change from previous
  unit_price - LAG(unit_price) OVER (PARTITION BY category ORDER BY price_date) as price_change,
  -- Percent change from previous
  ROUND((unit_price - LAG(unit_price) OVER (PARTITION BY category ORDER BY price_date)) / 
        LAG(unit_price) OVER (PARTITION BY category ORDER BY price_date) * 100, 2) as price_change_percent,
  -- Flag significant changes
  CASE
    WHEN ABS(unit_price - LAG(unit_price) OVER (PARTITION BY category ORDER BY price_date)) > 
         LAG(unit_price) OVER (PARTITION BY category ORDER BY price_date) * 0.1 THEN 'Significant Change'
    ELSE 'Normal Change'
  END as change_type
FROM product_prices
ORDER BY category, price_date;

-- Example 3: Analyzing time between events
WITH user_sessions AS (
  SELECT
    user_id,
    session_id,
    session_start,
    session_end,
    -- Previous session end time
    LAG(session_end) OVER (PARTITION BY user_id ORDER BY session_start) as previous_session_end,
    -- Time between sessions
    EXTRACT(EPOCH FROM (session_start - 
          LAG(session_end) OVER (PARTITION BY user_id ORDER BY session_start))) / 3600 as hours_between_sessions,
    -- Next session start time
    LEAD(session_start) OVER (PARTITION BY user_id ORDER BY session_start) as next_session_start
  FROM user_activity_sessions
  WHERE session_start >= CURRENT_DATE - INTERVAL '30 days'
)
SELECT
  user_id,
  session_id,
  session_start,
  session_end,
  previous_session_end,
  ROUND(hours_between_sessions, 2) as hours_between_sessions,
  next_session_start,
  -- Session duration in hours
  EXTRACT(EPOCH FROM (session_end - session_start)) / 3600 as session_duration_hours,
  -- User engagement pattern
  CASE
    WHEN hours_between_sessions < 1 THEN 'Highly Engaged'
    WHEN hours_between_sessions < 24 THEN 'Daily User'
    WHEN hours_between_sessions < 168 THEN 'Weekly User'
    ELSE 'Infrequent User'
  END as engagement_pattern
FROM user_sessions
ORDER BY user_id, session_start;

-- Example 4: Calculating running differences and trends
WITH daily_metrics AS (
  SELECT
    metric_date,
    active_users,
    revenue,
    LAG(active_users) OVER (ORDER BY metric_date) as previous_users,
    LAG(revenue) OVER (ORDER BY metric_date) as previous_revenue,
    LEAD(active_users) OVER (ORDER BY metric_date) as next_users,
    LEAD(revenue) OVER (ORDER BY metric_date) as next_revenue
  FROM daily_performance
  WHERE metric_date >= CURRENT_DATE - INTERVAL '90 days'
)
SELECT
  metric_date,
  active_users,
  revenue,
  -- User changes
  active_users - previous_users as user_change,
  ROUND((active_users - previous_users)::DECIMAL / NULLIF(previous_users, 0) * 100, 2) as user_change_percent,
  -- Revenue changes
  revenue - previous_revenue as revenue_change,
  ROUND((revenue - previous_revenue)::DECIMAL / NULLIF(previous_revenue, 0) * 100, 2) as revenue_change_percent,
  -- 3-day trend
  CASE
    WHEN revenue > previous_revenue AND revenue > next_revenue THEN 'Peak'
    WHEN revenue < previous_revenue AND revenue < next_revenue THEN 'Trough'
    WHEN revenue > previous_revenue THEN 'Increasing'
    WHEN revenue < previous_revenue THEN 'Decreasing'
    ELSE 'Stable'
  END as revenue_trend
FROM daily_metrics
ORDER BY metric_date;

-- Example 5: Advanced pattern detection with multiple offsets
SELECT
  log_timestamp,
  error_type,
  error_count,
  -- Multiple previous values
  LAG(error_count, 1) OVER (ORDER BY log_timestamp) as prev_1,
  LAG(error_count, 2) OVER (ORDER BY log_timestamp) as prev_2,
  LAG(error_count, 3) OVER (ORDER BY log_timestamp) as prev_3,
  -- Multiple next values
  LEAD(error_count, 1) OVER (ORDER BY log_timestamp) as next_1,
  LEAD(error_count, 2) OVER (ORDER BY log_timestamp) as next_2,
  LEAD(error_count, 3) OVER (ORDER BY log_timestamp) as next_3,
  -- Detect spikes (current > 2x average of previous 3)
  CASE
    WHEN error_count > COALESCE(LAG(error_count, 1) OVER (ORDER BY log_timestamp), 0) * 2
     AND error_count > COALESCE(LAG(error_count, 2) OVER (ORDER BY log_timestamp), 0) * 2
     AND error_count > COALESCE(LAG(error_count, 3) OVER (ORDER BY log_timestamp), 0) * 2
    THEN 'SPIKE_DETECTED'
    ELSE 'NORMAL'
  END as spike_status,
  -- Moving average for comparison
  AVG(error_count) OVER (ORDER BY log_timestamp ROWS BETWEEN 3 PRECEDING AND 3 FOLLOWING) as moving_avg
FROM error_logs
WHERE log_timestamp >= CURRENT_TIMESTAMP - INTERVAL '24 hours'
ORDER BY log_timestamp;

/*
COMMON USE CASES:
1. Time series analysis and trend detection
2. Calculating period-over-period changes
3. Identifying patterns and anomalies
4. Calculating time differences between events
5. Comparing current values with historical benchmarks

PERFORMANCE TIPS:
1. Use appropriate indexes on PARTITION BY and ORDER BY columns
2. Limit the range of data using WHERE clauses when possible
3. Consider using materialized views for frequently accessed historical comparisons
4. Use default values to handle NULLs appropriately
*/`,
      },

      {
        id: 36,
        question:
          "Write a query using recursive CTEs to handle hierarchical data",
        solution: `-- Recursive CTE for organizational hierarchy
WITH RECURSIVE org_hierarchy AS (
  -- Anchor member: top-level employees (those with no manager)
  SELECT 
    employee_id,
    employee_name,
    manager_id,
    title,
    1 as depth,
    employee_name::TEXT as hierarchy_path,
    ARRAY[employee_id] as path_ids
  FROM employees
  WHERE manager_id IS NULL
  
  UNION ALL
  
  -- Recursive member: subordinates of previous level
  SELECT 
    e.employee_id,
    e.employee_name,
    e.manager_id,
    e.title,
    oh.depth + 1,
    oh.hierarchy_path || ' -> ' || e.employee_name,
    oh.path_ids || e.employee_id
  FROM employees e
  INNER JOIN org_hierarchy oh ON e.manager_id = oh.employee_id
  WHERE NOT e.employee_id = ANY(oh.path_ids) -- Prevent cycles
)
SELECT 
  employee_id,
  employee_name,
  manager_id,
  title,
  depth,
  hierarchy_path,
  -- Indentation for visual hierarchy
  REPEAT('  ', depth - 1) || employee_name as visual_hierarchy,
  -- Count subordinates
  (SELECT COUNT(*) FROM employees WHERE manager_id = oh.employee_id) as direct_reports
FROM org_hierarchy oh
ORDER BY path_ids;

-- Recursive CTE for product categories hierarchy
WITH RECURSIVE category_tree AS (
  -- Anchor: root categories
  SELECT 
    category_id,
    category_name,
    parent_category_id,
    1 as level,
    category_name::TEXT as full_path,
    CAST(category_id AS TEXT) as category_path
  FROM categories
  WHERE parent_category_id IS NULL
  
  UNION ALL
  
  -- Recursive: subcategories
  SELECT 
    c.category_id,
    c.category_name,
    c.parent_category_id,
    ct.level + 1,
    ct.full_path || ' > ' || c.category_name,
    ct.category_path || '.' || CAST(c.category_id AS TEXT)
  FROM categories c
  INNER JOIN category_tree ct ON c.parent_category_id = ct.category_id
)
SELECT 
  category_id,
  category_name,
  parent_category_id,
  level,
  full_path,
  category_path,
  -- Flag leaf nodes (categories with no children)
  CASE WHEN NOT EXISTS (
    SELECT 1 FROM categories WHERE parent_category_id = ct.category_id
  ) THEN 'Leaf' ELSE 'Branch' END as node_type
FROM category_tree ct
ORDER BY category_path;

-- Calculating aggregated values in hierarchy (rollup)
WITH RECURSIVE sales_hierarchy AS (
  SELECT 
    d.department_id,
    d.department_name,
    d.parent_department_id,
    d.department_name::TEXT as hierarchy_path,
    COALESCE(SUM(s.sales_amount), 0) as department_sales
  FROM departments d
  LEFT JOIN sales s ON d.department_id = s.department_id
  WHERE d.parent_department_id IS NULL
  GROUP BY d.department_id, d.department_name, d.parent_department_id
  
  UNION ALL
  
  SELECT 
    d.department_id,
    d.department_name,
    d.parent_department_id,
    sh.hierarchy_path || ' > ' || d.department_name,
    COALESCE(SUM(s.sales_amount), 0)
  FROM departments d
  INNER JOIN sales_hierarchy sh ON d.parent_department_id = sh.department_id
  LEFT JOIN sales s ON d.department_id = s.department_id
  GROUP BY d.department_id, d.department_name, d.parent_department_id, sh.hierarchy_path
)
SELECT 
  department_id,
  department_name,
  hierarchy_path,
  department_sales,
  -- Rollup sales from children
  (SELECT SUM(department_sales) FROM sales_hierarchy 
   WHERE hierarchy_path LIKE sh.hierarchy_path || ' > %') as child_sales,
  department_sales + COALESCE((
    SELECT SUM(department_sales) FROM sales_hierarchy 
    WHERE hierarchy_path LIKE sh.hierarchy_path || ' > %'
  ), 0) as total_sales
FROM sales_hierarchy sh
ORDER BY hierarchy_path;`,
      },
      {
        id: 37,
        question: "How do you implement pagination in SQL queries?",
        solution: `-- Pagination using LIMIT and OFFSET (PostgreSQL, MySQL, SQLite)
SELECT 
  product_id,
  product_name,
  category,
  unit_price,
  created_date
FROM products
WHERE discontinued = FALSE
  AND unit_price BETWEEN 10 AND 100
ORDER BY created_date DESC, product_name
LIMIT 20 OFFSET 40; -- Page 3 (records 41-60)

-- Pagination using ROW_NUMBER() (More standard across databases)
WITH paginated_results AS (
  SELECT 
    product_id,
    product_name,
    category,
    unit_price,
    created_date,
    ROW_NUMBER() OVER (ORDER BY created_date DESC, product_name) as row_num
  FROM products
  WHERE discontinued = FALSE
    AND unit_price BETWEEN 10 AND 100
)
SELECT 
  product_id,
  product_name,
  category,
  unit_price,
  created_date
FROM paginated_results
WHERE row_num BETWEEN 41 AND 60;

-- Pagination with total count for UI display
WITH filtered_products AS (
  SELECT 
    product_id,
    product_name,
    category,
    unit_price,
    created_date
  FROM products
  WHERE discontinued = FALSE
    AND unit_price BETWEEN 10 AND 100
),
paginated AS (
  SELECT 
    *,
    ROW_NUMBER() OVER (ORDER BY created_date DESC, product_name) as row_num,
    COUNT(*) OVER () as total_count
  FROM filtered_products
)
SELECT 
  product_id,
  product_name,
  category,
  unit_price,
  created_date,
  total_count,
  CEIL(total_count / 20.0) as total_pages,
  CEIL(row_num / 20.0) as current_page
FROM paginated
WHERE row_num BETWEEN 41 AND 60;

-- Keyset pagination (for large datasets, better performance than OFFSET)
SELECT 
  product_id,
  product_name,
  category,
  unit_price,
  created_date
FROM products
WHERE discontinued = FALSE
  AND unit_price BETWEEN 10 AND 100
  AND (created_date < '2023-06-01' 
       OR (created_date = '2023-06-01' AND product_id > 1000))
ORDER BY created_date DESC, product_id
LIMIT 20;

-- Parameterized pagination stored procedure
CREATE OR REPLACE FUNCTION get_paginated_products(
  page_number INTEGER DEFAULT 1,
  page_size INTEGER DEFAULT 20,
  min_price DECIMAL DEFAULT 0,
  max_price DECIMAL DEFAULT 1000
) RETURNS TABLE (
  product_id INTEGER,
  product_name VARCHAR,
  category VARCHAR,
  unit_price DECIMAL,
  created_date DATE,
  total_count BIGINT,
  total_pages INTEGER
) AS $$
DECLARE
  offset_val INTEGER;
BEGIN
  offset_val := (page_number - 1) * page_size;
  
  RETURN QUERY
  WITH filtered AS (
    SELECT 
      product_id,
      product_name,
      category,
      unit_price,
      created_date
    FROM products
    WHERE discontinued = FALSE
      AND unit_price BETWEEN min_price AND max_price
  ),
  paginated AS (
    SELECT 
      *,
      ROW_NUMBER() OVER (ORDER BY created_date DESC, product_name) as row_num,
      COUNT(*) OVER () as total_records
    FROM filtered
  )
  SELECT 
    product_id,
    product_name,
    category,
    unit_price,
    created_date,
    total_records,
    CEIL(total_records / page_size::DECIMAL)
  FROM paginated
  WHERE row_num > offset_val AND row_num <= offset_val + page_size;
END;
$$ LANGUAGE plpgsql;

-- Usage: SELECT * FROM get_paginated_products(3, 20, 10, 100);`,
      },
      {
        id: 38,
        question: "Explain the concept of materialized views",
        solution: `-- Materialized Views: Precomputed query results stored as physical tables

-- Creating a materialized view for sales reporting
CREATE MATERIALIZED VIEW mv_monthly_sales_report AS
SELECT 
  DATE_TRUNC('month', order_date) as sales_month,
  region,
  product_category,
  COUNT(DISTINCT order_id) as order_count,
  SUM(quantity) as total_quantity,
  SUM(order_amount) as total_revenue,
  AVG(order_amount) as avg_order_value,
  COUNT(DISTINCT customer_id) as unique_customers
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id
WHERE order_date >= CURRENT_DATE - INTERVAL '12 months'
GROUP BY DATE_TRUNC('month', order_date), region, product_category
WITH DATA;

-- Refresh the materialized view (required to update data)
REFRESH MATERIALIZED VIEW mv_monthly_sales_report;

-- Refresh concurrently (allows reads during refresh, requires unique index)
REFRESH MATERIALIZED VIEW CONCURRENTLY mv_monthly_sales_report;

-- Create index on materialized view for performance
CREATE UNIQUE INDEX idx_mv_sales_month_region_category 
ON mv_monthly_sales_report (sales_month, region, product_category);

CREATE INDEX idx_mv_sales_region ON mv_monthly_sales_report (region);
CREATE INDEX idx_mv_sales_category ON mv_monthly_sales_report (product_category);

-- Query from materialized view (much faster than base tables)
SELECT 
  sales_month,
  region,
  product_category,
  total_revenue,
  unique_customers
FROM mv_monthly_sales_report
WHERE region = 'North America'
  AND sales_month >= '2023-01-01'
ORDER BY sales_month, product_category;

-- Materialized view for user activity aggregation
CREATE MATERIALIZED VIEW mv_daily_user_activity AS
SELECT 
  DATE(event_timestamp) as activity_date,
  user_id,
  COUNT(*) as total_events,
  COUNT(DISTINCT session_id) as total_sessions,
  SUM(CASE WHEN event_type = 'purchase' THEN 1 ELSE 0 END) as purchase_events,
  SUM(CASE WHEN event_type = 'page_view' THEN 1 ELSE 0 END) as page_views,
  MAX(event_timestamp) as last_activity
FROM user_events
WHERE event_timestamp >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(event_timestamp), user_id
WITH DATA;

-- Automated refresh using cron job or scheduled task
-- Example: Refresh every night at 2 AM
/*
0 2 * * * psql -d your_database -c "REFRESH MATERIALIZED VIEW mv_daily_user_activity;"
*/

-- Materialized view with complex joins and calculations
CREATE MATERIALIZED VIEW mv_customer_lifetime_value AS
WITH customer_stats AS (
  SELECT 
    c.customer_id,
    c.join_date,
    COUNT(DISTINCT o.order_id) as total_orders,
    SUM(o.order_amount) as total_revenue,
    MAX(o.order_date) as last_order_date,
    AVG(o.order_amount) as avg_order_value
  FROM customers c
  LEFT JOIN orders o ON c.customer_id = o.customer_id
  GROUP BY c.customer_id, c.join_date
),
cohort_analysis AS (
  SELECT 
    customer_id,
    EXTRACT(MONTH FROM AGE(last_order_date, join_date)) as lifetime_months,
    total_revenue / NULLIF(EXTRACT(MONTH FROM AGE(last_order_date, join_date)), 0) as monthly_value
  FROM customer_stats
  WHERE last_order_date IS NOT NULL
)
SELECT 
  cs.customer_id,
  cs.join_date,
  cs.total_orders,
  cs.total_revenue,
  cs.last_order_date,
  cs.avg_order_value,
  co.lifetime_months,
  co.monthly_value,
  co.monthly_value * 12 as predicted_annual_value
FROM customer_stats cs
LEFT JOIN cohort_analysis co ON cs.customer_id = co.customer_id
WITH DATA;

-- Benefits of materialized views:
-- 1. Dramatically improved query performance for complex aggregations
-- 2. Reduced load on production databases
-- 3. Precomputed results for reporting and analytics

-- Limitations:
-- 1. Data can become stale until refreshed
-- 2. Storage overhead (duplicate data)
-- 3. Refresh operations can be resource-intensive

-- When to use materialized views:
-- * Complex reports that are run frequently
-- * Dashboards requiring fast response times
-- * Data that doesn't need real-time freshness
-- * Aggregations over large datasets`,
      },
      {
        id: 39,
        question: "How do you use the PIVOT and UNPIVOT operators?",
        solution: `-- PIVOT: Converting rows to columns for cross-tabulation

-- Monthly sales by category pivot
SELECT *
FROM (
  SELECT 
    product_category,
    DATE_TRUNC('month', order_date) as sales_month,
    order_amount
  FROM orders o
  JOIN order_items oi ON o.order_id = oi.order_id
  JOIN products p ON oi.product_id = p.product_id
) src
PIVOT (
  SUM(order_amount)
  FOR product_category IN (
    'Electronics' as electronics,
    'Clothing' as clothing,
    'Books' as books,
    'Home' as home
  )
) AS pivot_table
ORDER BY sales_month;

-- Pivot with multiple aggregate functions
SELECT *
FROM (
  SELECT 
    region,
    product_category,
    order_amount,
    quantity
  FROM orders o
  JOIN order_items oi ON o.order_id = oi.order_id
  JOIN products p ON oi.product_id = p.product_id
  JOIN customers c ON o.customer_id = c.customer_id
) src
PIVOT (
  SUM(order_amount) as revenue,
  AVG(quantity) as avg_quantity
  FOR product_category IN (
    'Electronics' as electronics,
    'Clothing' as clothing
  )
) AS pivot_table
ORDER BY region;

-- Dynamic pivot (when categories are unknown at design time)
CREATE OR REPLACE FUNCTION dynamic_sales_pivot() 
RETURNS TABLE (sales_month DATE, categories JSON) 
AS $$
DECLARE
  category_list TEXT;
  query TEXT;
BEGIN
  -- Get distinct categories
  SELECT STRING_AGG(DISTINCT quote_literal(product_category), ', ')
  INTO category_list
  FROM products;
  
  -- Build dynamic query
  query := '
    SELECT sales_month, JSON_OBJECT_AGG(product_category, revenue) as categories
    FROM (
      SELECT 
        DATE_TRUNC(''month'', order_date) as sales_month,
        product_category,
        SUM(order_amount) as revenue
      FROM orders o
      JOIN order_items oi ON o.order_id = oi.order_id
      JOIN products p ON oi.product_id = p.product_id
      GROUP BY DATE_TRUNC(''month'', order_date), product_category
    ) src
    GROUP BY sales_month
    ORDER BY sales_month';
  
  RETURN QUERY EXECUTE query;
END;
$$ LANGUAGE plpgsql;

-- UNPIVOT: Converting columns to rows

-- Sales data by quarter in columns
CREATE TABLE quarterly_sales (
  product_id INT,
  product_name VARCHAR,
  q1_sales DECIMAL,
  q2_sales DECIMAL,
  q3_sales DECIMAL,
  q4_sales DECIMAL
);

-- Unpivot quarterly sales to rows
SELECT 
  product_id,
  product_name,
  quarter,
  sales_amount
FROM quarterly_sales
UNPIVOT (
  sales_amount
  FOR quarter IN (
    q1_sales AS 'Q1',
    q2_sales AS 'Q2',
    q3_sales AS 'Q3',
    q4_sales AS 'Q4'
  )
);

-- Unpivot with multiple value columns
SELECT 
  product_id,
  product_name,
  quarter,
  sales_amount,
  units_sold
FROM (
  SELECT 
    product_id,
    product_name,
    q1_sales, q1_units,
    q2_sales, q2_units,
    q3_sales, q3_units,
    q4_sales, q4_units
  FROM quarterly_sales
) src
UNPIVOT (
  (sales_amount, units_sold)
  FOR quarter IN (
    (q1_sales, q1_units) AS 'Q1',
    (q2_sales, q2_units) AS 'Q2',
    (q3_sales, q3_units) AS 'Q3',
    (q4_sales, q4_units) AS 'Q4'
  )
);

-- Using JSON functions for flexible pivoting (PostgreSQL)
SELECT 
  sales_month,
  JSON_OBJECT_AGG(product_category, revenue) as category_revenue
FROM (
  SELECT 
    DATE_TRUNC('month', order_date) as sales_month,
    product_category,
    SUM(order_amount) as revenue
  FROM orders o
  JOIN order_items oi ON o.order_id = oi.order_id
  JOIN products p ON oi.product_id = p.product_id
  GROUP BY DATE_TRUNC('month', order_date), product_category
) grouped
GROUP BY sales_month
ORDER BY sales_month;

-- Conditional aggregation (alternative to PIVOT)
SELECT 
  DATE_TRUNC('month', order_date) as sales_month,
  SUM(CASE WHEN product_category = 'Electronics' THEN order_amount ELSE 0 END) as electronics,
  SUM(CASE WHEN product_category = 'Clothing' THEN order_amount ELSE 0 END) as clothing,
  SUM(CASE WHEN product_category = 'Books' THEN order_amount ELSE 0 END) as books,
  SUM(CASE WHEN product_category = 'Home' THEN order_amount ELSE 0 END) as home,
  SUM(order_amount) as total_sales
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id
GROUP BY DATE_TRUNC('month', order_date)
ORDER BY sales_month;`,
      },
      {
        id: 40,
        question:
          "Write a query to calculate running totals using window functions",
        solution: `-- Running total using window functions

-- Basic running total of sales by date
SELECT 
  order_date,
  order_amount,
  SUM(order_amount) OVER (ORDER BY order_date) as running_total,
  AVG(order_amount) OVER (ORDER BY order_date) as running_avg
FROM orders
WHERE order_date >= '2023-01-01'
ORDER BY order_date;

-- Running total by customer with partition
SELECT 
  customer_id,
  order_date,
  order_amount,
  SUM(order_amount) OVER (
    PARTITION BY customer_id 
    ORDER BY order_date
  ) as customer_running_total,
  COUNT(*) OVER (
    PARTITION BY customer_id 
    ORDER BY order_date
  ) as customer_order_count
FROM orders
ORDER BY customer_id, order_date;

-- Running total with specific window frame
SELECT 
  order_date,
  order_amount,
  SUM(order_amount) OVER (
    ORDER BY order_date
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) as running_total,
  SUM(order_amount) OVER (
    ORDER BY order_date
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
  ) as last_3_days_total,
  AVG(order_amount) OVER (
    ORDER BY order_date
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ) as last_7_days_avg
FROM orders
WHERE order_date >= '2023-01-01'
ORDER BY order_date;

-- Running percentage of total
SELECT 
  order_date,
  order_amount,
  SUM(order_amount) OVER (ORDER BY order_date) as running_total,
  ROUND(
    order_amount * 100.0 / SUM(order_amount) OVER (ORDER BY order_date),
    2
  ) as percent_of_running_total,
  ROUND(
    SUM(order_amount) OVER (ORDER BY order_date) * 100.0 / 
    SUM(order_amount) OVER (),
    2
  ) as cumulative_percent
FROM orders
WHERE order_date >= '2023-01-01'
ORDER BY order_date;

-- Running totals with multiple partitions
SELECT 
  region,
  order_date,
  order_amount,
  SUM(order_amount) OVER (
    PARTITION BY region
    ORDER BY order_date
  ) as region_running_total,
  SUM(order_amount) OVER (
    PARTITION BY DATE_TRUNC('month', order_date)
    ORDER BY order_date
  ) as monthly_running_total,
  SUM(order_amount) OVER (
    ORDER BY order_date
  ) as overall_running_total
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
WHERE order_date >= '2023-01-01'
ORDER BY region, order_date;

-- Running difference from average
SELECT 
  order_date,
  order_amount,
  AVG(order_amount) OVER (ORDER BY order_date) as running_avg,
  order_amount - AVG(order_amount) OVER (ORDER BY order_date) as difference_from_avg,
  ROUND(
    (order_amount - AVG(order_amount) OVER (ORDER BY order_date)) * 100.0 / 
    AVG(order_amount) OVER (ORDER BY order_date),
    2
  ) as percent_difference
FROM orders
WHERE order_date >= '2023-01-01'
ORDER BY order_date;

-- Running totals with gaps (using date series)
WITH date_series AS (
  SELECT generate_series(
    '2023-01-01'::date,
    '2023-12-31'::date,
    '1 day'::interval
  ) as date_day
),
daily_sales AS (
  SELECT 
    order_date,
    SUM(order_amount) as daily_total
  FROM orders
  WHERE order_date BETWEEN '2023-01-01' AND '2023-12-31'
  GROUP BY order_date
)
SELECT 
  ds.date_day,
  COALESCE(ds.daily_total, 0) as daily_sales,
  SUM(COALESCE(ds.daily_total, 0)) OVER (
    ORDER BY ds.date_day
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) as running_total,
  AVG(COALESCE(ds.daily_total, 0)) OVER (
    ORDER BY ds.date_day
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ) as weekly_moving_avg
FROM date_series ds
LEFT JOIN daily_sales ds ON ds.date_day = ds.order_date
ORDER BY ds.date_day;

-- Performance optimized running totals for large datasets
SELECT 
  order_date,
  daily_total,
  SUM(daily_total) OVER (ORDER BY order_date) as running_total
FROM (
  SELECT 
    order_date,
    SUM(order_amount) as daily_total
  FROM orders
  WHERE order_date >= '2023-01-01'
  GROUP BY order_date
) daily_aggregates
ORDER BY order_date;`,
      },
      {
        id: 41,
        question: "How do you handle many-to-many relationships in SQL?",
        solution: `-- Many-to-many relationships require a junction/join table

-- Example: Students and Courses relationship
CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE courses (
    course_id SERIAL PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    course_code VARCHAR(20) UNIQUE NOT NULL,
    credits INT NOT NULL
);

-- Junction table for many-to-many relationship
CREATE TABLE student_courses (
    student_id INT REFERENCES students(student_id) ON DELETE CASCADE,
    course_id INT REFERENCES courses(course_id) ON DELETE CASCADE,
    enrollment_date DATE NOT NULL DEFAULT CURRENT_DATE,
    grade CHAR(2) NULL,
    PRIMARY KEY (student_id, course_id)  -- Composite primary key
);

-- Insert sample data
INSERT INTO students (first_name, last_name, email) VALUES
('John', 'Doe', 'john.doe@email.com'),
('Jane', 'Smith', 'jane.smith@email.com');

INSERT INTO courses (course_name, course_code, credits) VALUES
('Database Systems', 'CS401', 4),
('Web Development', 'CS402', 3),
('Data Structures', 'CS403', 4);

INSERT INTO student_courses (student_id, course_id, enrollment_date, grade) VALUES
(1, 1, '2023-09-01', 'A'),
(1, 2, '2023-09-01', 'B+'),
(2, 1, '2023-09-01', 'A-'),
(2, 3, '2023-09-01', NULL);

-- Query: Find all courses for a specific student
SELECT s.first_name, s.last_name, c.course_name, c.course_code, sc.enrollment_date, sc.grade
FROM students s
JOIN student_courses sc ON s.student_id = sc.student_id
JOIN courses c ON sc.course_id = c.course_id
WHERE s.student_id = 1;

-- Query: Find all students in a specific course
SELECT c.course_name, s.first_name, s.last_name, s.email, sc.grade
FROM courses c
JOIN student_courses sc ON c.course_id = sc.course_id
JOIN students s ON sc.student_id = s.student_id
WHERE c.course_id = 1;

-- Query: Count students per course
SELECT c.course_name, COUNT(sc.student_id) as student_count
FROM courses c
LEFT JOIN student_courses sc ON c.course_id = sc.course_id
GROUP BY c.course_id, c.course_name
ORDER BY student_count DESC;

-- Additional junction table with extra attributes
CREATE TABLE product_tags (
    product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
    tag_id INT REFERENCES tags(tag_id) ON DELETE CASCADE,
    assigned_by INT REFERENCES users(user_id),
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    confidence_score DECIMAL(3,2) CHECK (confidence_score BETWEEN 0 AND 1),
    PRIMARY KEY (product_id, tag_id)
);

-- Query using EXISTS to check relationships
SELECT p.product_name
FROM products p
WHERE EXISTS (
    SELECT 1 FROM product_tags pt
    JOIN tags t ON pt.tag_id = t.tag_id
    WHERE pt.product_id = p.product_id AND t.tag_name = 'electronics'
);

-- Indexing junction tables for performance
CREATE INDEX idx_student_courses_student ON student_courses(student_id);
CREATE INDEX idx_student_courses_course ON student_courses(course_id);
CREATE INDEX idx_student_courses_grade ON student_courses(grade);

-- Handling cascading deletes
ALTER TABLE student_courses
ADD CONSTRAINT fk_student_courses_student
FOREIGN KEY (student_id) REFERENCES students(student_id)
ON DELETE CASCADE;

ALTER TABLE student_courses
ADD CONSTRAINT fk_student_courses_course
FOREIGN KEY (course_id) REFERENCES courses(course_id)
ON DELETE CASCADE;`,
      },
      {
        id: 42,
        question: "Explain the use of CROSS APPLY and OUTER APPLY",
        solution: `-- CROSS APPLY and OUTER APPLY (SQL Server) / LATERAL JOIN (PostgreSQL)

-- CROSS APPLY: Returns only rows where the right table expression returns results
-- Similar to INNER JOIN but with the ability to reference columns from the left table

-- Example: Get top 3 most recent orders for each customer
SELECT c.customer_id, c.customer_name, recent_orders.*
FROM customers c
CROSS APPLY (
    SELECT TOP 3 order_id, order_date, order_amount
    FROM orders o
    WHERE o.customer_id = c.customer_id
    ORDER BY order_date DESC
) recent_orders;

-- Equivalent in PostgreSQL using LATERAL JOIN
SELECT c.customer_id, c.customer_name, recent_orders.*
FROM customers c
CROSS JOIN LATERAL (
    SELECT order_id, order_date, order_amount
    FROM orders o
    WHERE o.customer_id = c.customer_id
    ORDER BY order_date DESC
    LIMIT 3
) recent_orders;

-- OUTER APPLY: Returns all rows from left table, even if right table expression returns no results
-- Similar to LEFT JOIN but with the ability to reference columns from the left table

-- Example: Get top 3 orders for each customer, including customers with no orders
SELECT c.customer_id, c.customer_name, recent_orders.*
FROM customers c
OUTER APPLY (
    SELECT TOP 3 order_id, order_date, order_amount
    FROM orders o
    WHERE o.customer_id = c.customer_id
    ORDER BY order_date DESC
) recent_orders;

-- Equivalent in PostgreSQL
SELECT c.customer_id, c.customer_name, recent_orders.*
FROM customers c
LEFT JOIN LATERAL (
    SELECT order_id, order_date, order_amount
    FROM orders o
    WHERE o.customer_id = c.customer_id
    ORDER BY order_date DESC
    LIMIT 3
) recent_orders ON true;

-- Practical example: Calculate running totals per customer
SELECT c.customer_id, c.customer_name, o.order_date, o.order_amount,
       running.total as running_total
FROM customers c
CROSS APPLY (
    SELECT SUM(order_amount) as total
    FROM orders o2
    WHERE o2.customer_id = c.customer_id
    AND o2.order_date <= o.order_date
) running
JOIN orders o ON c.customer_id = o.customer_id
ORDER BY c.customer_id, o.order_date;

-- Using APPLY with table-valued functions
CREATE FUNCTION get_customer_orders(@customer_id INT, @min_amount DECIMAL)
RETURNS TABLE
AS
RETURN (
    SELECT order_id, order_date, order_amount
    FROM orders
    WHERE customer_id = @customer_id AND order_amount >= @min_amount
);

-- Call function for each customer
SELECT c.customer_id, c.customer_name, co.order_id, co.order_amount
FROM customers c
CROSS APPLY get_customer_orders(c.customer_id, 1000) co;

-- Complex example: Top products by category for each customer
SELECT c.customer_id, c.customer_name, p.category, top_products.*
FROM customers c
CROSS APPLY (
    SELECT DISTINCT p.category
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    JOIN products p ON oi.product_id = p.product_id
    WHERE o.customer_id = c.customer_id
) p
CROSS APPLY (
    SELECT TOP 3 p2.product_name, SUM(oi.quantity) as total_quantity
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    JOIN products p2 ON oi.product_id = p2.product_id
    WHERE o.customer_id = c.customer_id AND p2.category = p.category
    GROUP BY p2.product_id, p2.product_name
    ORDER BY SUM(oi.quantity) DESC
) top_products;`,
      },
      {
        id: 43,
        question: "How do you implement full-text search in SQL?",
        solution: `-- Full-text search implementation across different databases

-- PostgreSQL full-text search
CREATE TABLE documents (
    document_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create GIN index for full-text search
CREATE INDEX idx_documents_content_gin ON documents 
USING GIN (to_tsvector('english', content));

CREATE INDEX idx_documents_title_gin ON documents 
USING GIN (to_tsvector('english', title));

-- Insert sample data
INSERT INTO documents (title, content, author) VALUES
('Database Systems', 'Introduction to database management systems and SQL queries.', 'John Doe'),
('Web Development', 'Building modern web applications with React and Node.js.', 'Jane Smith'),
('Data Analytics', 'Analyzing large datasets using Python and machine learning.', 'John Doe');

-- Basic full-text search query
SELECT document_id, title, 
       ts_headline('english', content, 
                   to_tsquery('english', 'database & management'), 
                   'StartSel=<b>, StopSel=</b>') as highlighted_content
FROM documents
WHERE to_tsvector('english', content) @@ to_tsquery('english', 'database & management');

-- Search with ranking
SELECT document_id, title,
       ts_rank_cd(to_tsvector('english', content), 
                  to_tsquery('english', 'database | management')) as rank,
       ts_headline('english', content, 
                   to_tsquery('english', 'database | management')) as snippet
FROM documents
WHERE to_tsvector('english', content) @@ to_tsquery('english', 'database | management')
ORDER BY rank DESC;

-- MySQL full-text search
ALTER TABLE documents ADD FULLTEXT(title, content);

SELECT document_id, title, content,
       MATCH(title, content) AGAINST('database management' IN NATURAL LANGUAGE MODE) as relevance
FROM documents
WHERE MATCH(title, content) AGAINST('database management' IN NATURAL LANGUAGE MODE);

-- SQL Server full-text search
CREATE FULLTEXT CATALOG ft_catalog AS DEFAULT;
CREATE FULLTEXT INDEX ON documents(title, content) KEY INDEX pk_documents;

SELECT document_id, title, content,
       FREETEXTTABLE(documents, (title, content), 'database management') as ft
FROM documents d
INNER JOIN FREETEXTTABLE(documents, (title, content), 'database management') ft 
ON d.document_id = ft.[KEY]
ORDER BY ft.RANK DESC;

-- Advanced search with multiple fields and weights
SELECT document_id, title,
       ts_rank_cd(
         setweight(to_tsvector('english', title), 'A') || 
         setweight(to_tsvector('english', content), 'B'),
         to_tsquery('english', 'database & systems')
       ) as rank
FROM documents
WHERE (setweight(to_tsvector('english', title), 'A') || 
       setweight(to_tsvector('english', content), 'B')) 
      @@ to_tsquery('english', 'database & systems')
ORDER BY rank DESC;

-- Search with synonyms and thesaurus
-- Create a thesaurus file (english.thesaurus) with:
# database system : dbms, rdbms

SELECT to_tsquery('english', 'thesaurus:database system');

-- Fuzzy search with trigrams (PostgreSQL pg_trgm extension)
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX idx_documents_title_trgm ON documents USING GIN (title gin_trgm_ops);
CREATE INDEX idx_documents_content_trgm ON documents USING GIN (content gin_trgm_ops);

SELECT document_id, title, similarity(title, 'datbase') as similarity_score
FROM documents
WHERE title % 'datbase'  -- Fuzzy match
ORDER BY similarity_score DESC;

-- Combined exact and fuzzy search
SELECT document_id, title, content,
       CASE 
         WHEN title ILIKE '%database%' THEN 1.0
         ELSE similarity(title, 'database')
       END as search_score
FROM documents
WHERE title ILIKE '%database%' OR title % 'database'
ORDER BY search_score DESC;

-- Search with autocomplete/suggestions
SELECT DISTINCT word
FROM ts_stat('SELECT to_tsvector(''english'', title) || 
                     to_tsvector(''english'', content) 
              FROM documents')
WHERE word LIKE 'data%'
ORDER BY word;`,
      },
      {
        id: 44,
        question: "Write a query using window functions for cohort analysis",
        solution: `-- Cohort analysis using window functions

-- Step 1: Define user cohorts based on signup month
WITH user_cohorts AS (
  SELECT 
    user_id,
    DATE_TRUNC('month', signup_date) as cohort_month,
    EXTRACT(YEAR FROM signup_date) as cohort_year,
    EXTRACT(MONTH FROM signup_date) as cohort_month_num
  FROM users
  WHERE signup_date >= '2023-01-01'
),

-- Step 2: Get user activity by month
user_activity AS (
  SELECT 
    u.user_id,
    uc.cohort_month,
    DATE_TRUNC('month', a.activity_date) as activity_month,
    EXTRACT(MONTH FROM AGE(DATE_TRUNC('month', a.activity_date), uc.cohort_month)) as months_since_signup
  FROM users u
  JOIN user_cohorts uc ON u.user_id = uc.user_id
  JOIN user_activities a ON u.user_id = a.user_id
  WHERE a.activity_date >= '2023-01-01'
  GROUP BY u.user_id, uc.cohort_month, DATE_TRUNC('month', a.activity_date)
),

-- Step 3: Calculate cohort sizes and active users
cohort_analysis AS (
  SELECT 
    cohort_month,
    activity_month,
    months_since_signup,
    COUNT(DISTINCT uc.user_id) as cohort_size,
    COUNT(DISTINCT ua.user_id) as active_users,
    ROUND(COUNT(DISTINCT ua.user_id) * 100.0 / COUNT(DISTINCT uc.user_id), 2) as retention_rate
  FROM user_cohorts uc
  LEFT JOIN user_activity ua ON uc.user_id = ua.user_id 
    AND ua.activity_month = DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '0 months'
  GROUP BY cohort_month, activity_month, months_since_signup
)

-- Step 4: Pivot the data for better visualization
SELECT 
  cohort_month,
  cohort_size,
  MAX(CASE WHEN months_since_signup = 0 THEN retention_rate END) as month_0,
  MAX(CASE WHEN months_since_signup = 1 THEN retention_rate END) as month_1,
  MAX(CASE WHEN months_since_signup = 2 THEN retention_rate END) as month_2,
  MAX(CASE WHEN months_since_signup = 3 THEN retention_rate END) as month_3,
  MAX(CASE WHEN months_since_signup = 6 THEN retention_rate END) as month_6,
  MAX(CASE WHEN months_since_signup = 12 THEN retention_rate END) as month_12
FROM cohort_analysis
GROUP BY cohort_month, cohort_size
ORDER BY cohort_month;

-- Alternative: Using window functions for cumulative retention
WITH monthly_retention AS (
  SELECT 
    DATE_TRUNC('month', u.signup_date) as cohort_month,
    EXTRACT(MONTH FROM AGE(DATE_TRUNC('month', a.activity_date), u.signup_date)) as month_number,
    COUNT(DISTINCT u.user_id) as cohort_size,
    COUNT(DISTINCT a.user_id) as active_users,
    ROUND(COUNT(DISTINCT a.user_id) * 100.0 / COUNT(DISTINCT u.user_id), 2) as retention_rate
  FROM users u
  LEFT JOIN user_activities a ON u.user_id = a.user_id
    AND DATE_TRUNC('month', a.activity_date) = DATE_TRUNC('month', u.signup_date) + 
        (EXTRACT(MONTH FROM AGE(DATE_TRUNC('month', a.activity_date), u.signup_date)) || ' months')::INTERVAL
  WHERE u.signup_date >= '2023-01-01'
  GROUP BY DATE_TRUNC('month', u.signup_date), 
           EXTRACT(MONTH FROM AGE(DATE_TRUNC('month', a.activity_date), u.signup_date))
)

SELECT 
  cohort_month,
  month_number,
  retention_rate,
  FIRST_VALUE(retention_rate) OVER (PARTITION BY cohort_month ORDER BY month_number) as initial_retention,
  retention_rate - FIRST_VALUE(retention_rate) OVER (PARTITION BY cohort_month ORDER BY month_number) as change_from_initial
FROM monthly_retention
ORDER BY cohort_month, month_number;

-- Cohort analysis with revenue metrics
WITH revenue_cohorts AS (
  SELECT 
    u.user_id,
    DATE_TRUNC('month', u.signup_date) as cohort_month,
    DATE_TRUNC('month', o.order_date) as order_month,
    EXTRACT(MONTH FROM AGE(DATE_TRUNC('month', o.order_date), u.signup_date)) as months_since_signup,
    SUM(o.order_amount) as monthly_revenue
  FROM users u
  JOIN orders o ON u.user_id = o.customer_id
  WHERE u.signup_date >= '2023-01-01'
  GROUP BY u.user_id, DATE_TRUNC('month', u.signup_date), DATE_TRUNC('month', o.order_date)
)

SELECT 
  cohort_month,
  months_since_signup,
  COUNT(DISTINCT user_id) as active_customers,
  SUM(monthly_revenue) as total_revenue,
  AVG(monthly_revenue) as avg_revenue_per_customer,
  SUM(SUM(monthly_revenue)) OVER (PARTITION BY cohort_month ORDER BY months_since_signup) as cumulative_revenue
FROM revenue_cohorts
GROUP BY cohort_month, months_since_signup
ORDER BY cohort_month, months_since_signup;

-- Retention curve analysis
SELECT 
  months_since_signup,
  AVG(retention_rate) as avg_retention_rate,
  MIN(retention_rate) as min_retention_rate,
  MAX(retention_rate) as max_retention_rate,
  STDDEV(retention_rate) as retention_stddev
FROM (
  SELECT 
    cohort_month,
    months_since_signup,
    retention_rate
  FROM cohort_analysis
) sub
GROUP BY months_since_signup
ORDER BY months_since_signup;`,
      },
      {
        id: 45,
        question: "How do you calculate percentiles using SQL?",
        solution: `-- Percentile calculations using various methods

-- Method 1: Using PERCENTILE_CONT (continuous percentile)
SELECT 
  department_id,
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY salary) as median_salary,
  PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY salary) as q1_salary,
  PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY salary) as q3_salary,
  PERCENTILE_CONT(0.9) WITHIN GROUP (ORDER BY salary) as p90_salary
FROM employees
WHERE salary IS NOT NULL
GROUP BY department_id;

-- Method 2: Using PERCENTILE_DISC (discrete percentile)
SELECT 
  department_id,
  PERCENTILE_DISC(0.5) WITHIN GROUP (ORDER BY salary) as median_salary,
  PERCENTILE_DISC(0.25) WITHIN GROUP (ORDER BY salary) as q1_salary,
  PERCENTILE_DISC(0.75) WITHIN GROUP (ORDER BY salary) as q3_salary
FROM employees
GROUP BY department_id;

-- Method 3: Using NTILE for percentiles
WITH salary_ntiles AS (
  SELECT 
    department_id,
    salary,
    NTILE(100) OVER (PARTITION BY department_id ORDER BY salary) as percentile
  FROM employees
  WHERE salary IS NOT NULL
)
SELECT 
  department_id,
  MAX(CASE WHEN percentile = 50 THEN salary END) as median_salary,
  MAX(CASE WHEN percentile = 25 THEN salary END) as q1_salary,
  MAX(CASE WHEN percentile = 75 THEN salary END) as q3_salary,
  MAX(CASE WHEN percentile = 90 THEN salary END) as p90_salary
FROM salary_ntiles
GROUP BY department_id;

-- Method 4: Manual percentile calculation using window functions
WITH ordered_salaries AS (
  SELECT 
    department_id,
    salary,
    ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary) as row_num,
    COUNT(*) OVER (PARTITION BY department_id) as total_count
  FROM employees
  WHERE salary IS NOT NULL
)
SELECT 
  department_id,
  AVG(salary) as median_salary
FROM ordered_salaries
WHERE row_num IN (FLOOR((total_count + 1) / 2), CEIL((total_count + 1) / 2))
GROUP BY department_id;

-- Multiple percentiles in single query
SELECT 
  department_id,
  PERCENTILE_CONT(ARRAY[0.25, 0.5, 0.75, 0.9, 0.95, 0.99]) 
    WITHIN GROUP (ORDER BY salary) as percentiles
FROM employees
WHERE salary IS NOT NULL
GROUP BY department_id;

-- Accessing individual percentiles from array
SELECT 
  department_id,
  percentiles[1] as q1_salary,
  percentiles[2] as median_salary,
  percentiles[3] as q3_salary,
  percentiles[4] as p90_salary,
  percentiles[5] as p95_salary,
  percentiles[6] as p99_salary
FROM (
  SELECT 
    department_id,
    PERCENTILE_CONT(ARRAY[0.25, 0.5, 0.75, 0.9, 0.95, 0.99]) 
      WITHIN GROUP (ORDER BY salary) as percentiles
  FROM employees
  WHERE salary IS NOT NULL
  GROUP BY department_id
) p;

-- Percentile rank of individual values
SELECT 
  employee_id,
  salary,
  department_id,
  PERCENT_RANK() OVER (PARTITION BY department_id ORDER BY salary) as percentile_rank,
  CASE 
    WHEN PERCENT_RANK() OVER (PARTITION BY department_id ORDER BY salary) <= 0.1 THEN 'Top 10%'
    WHEN PERCENT_RANK() OVER (PARTITION BY department_id ORDER BY salary) <= 0.25 THEN 'Top 25%'
    WHEN PERCENT_RANK() OVER (PARTITION BY department_id ORDER BY salary) <= 0.5 THEN 'Top 50%'
    ELSE 'Bottom 50%'
  END as percentile_group
FROM employees
WHERE salary IS NOT NULL;

-- Interquartile range (IQR) calculation
SELECT 
  department_id,
  PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY salary) - 
  PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY salary) as iqr,
  PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY salary) + 
  1.5 * (PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY salary) - 
         PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY salary)) as upper_outlier_threshold,
  PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY salary) - 
  1.5 * (PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY salary) - 
         PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY salary)) as lower_outlier_threshold
FROM employees
WHERE salary IS NOT NULL
GROUP BY department_id;

-- Percentiles for time-based data
SELECT 
  DATE_TRUNC('month', order_date) as order_month,
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY order_amount) as median_order_value,
  PERCENTILE_CONT(0.9) WITHIN GROUP (ORDER BY order_amount) as p90_order_value,
  AVG(order_amount) as avg_order_value
FROM orders
WHERE order_date >= '2023-01-01'
GROUP BY DATE_TRUNC('month', order_date)
ORDER BY order_month;`,
      },
      {
        id: 46,
        question: "Explain the concept of temporal tables",
        solution: `-- Temporal tables (system-versioned tables) track historical data automatically

-- SQL Server temporal table implementation
CREATE TABLE Employees
(
    EmployeeID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Position VARCHAR(100) NOT NULL,
    Department VARCHAR(100) NOT NULL,
    Salary DECIMAL(10,2) NOT NULL,
    -- System period columns
    ValidFrom DATETIME2 GENERATED ALWAYS AS ROW START,
    ValidTo DATETIME2 GENERATED ALWAYS AS ROW END,
    PERIOD FOR SYSTEM_TIME (ValidFrom, ValidTo)
)
WITH (SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.EmployeesHistory));

-- PostgreSQL temporal table using triggers
CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    position VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    valid_from TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    valid_to TIMESTAMP NOT NULL DEFAULT '9999-12-31 23:59:59'
);

CREATE TABLE employees_history (
    history_id SERIAL PRIMARY KEY,
    employee_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    position VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    valid_from TIMESTAMP NOT NULL,
    valid_to TIMESTAMP NOT NULL
);

-- Create trigger function for temporal support
CREATE OR REPLACE FUNCTION employees_temporal_trigger()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'UPDATE') THEN
        -- Archive old version
        INSERT INTO employees_history 
        (employee_id, name, position, department, salary, valid_from, valid_to)
        VALUES (OLD.employee_id, OLD.name, OLD.position, OLD.department, OLD.salary, 
                OLD.valid_from, CURRENT_TIMESTAMP);
        
        -- Update valid_from for new version
        NEW.valid_from := CURRENT_TIMESTAMP;
        RETURN NEW;
        
    ELSIF (TG_OP = 'DELETE') THEN
        -- Archive deleted row
        INSERT INTO employees_history 
        (employee_id, name, position, department, salary, valid_from, valid_to)
        VALUES (OLD.employee_id, OLD.name, OLD.position, OLD.department, OLD.salary, 
                OLD.valid_from, CURRENT_TIMESTAMP);
        RETURN OLD;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER employees_temporal
BEFORE UPDATE OR DELETE ON employees
FOR EACH ROW EXECUTE FUNCTION employees_temporal_trigger();

-- Querying temporal data (SQL Server)
-- Current data
SELECT * FROM Employees WHERE EmployeeID = 1;

-- Historical data as of specific time
SELECT * FROM Employees 
FOR SYSTEM_TIME AS OF '2023-06-01 10:00:00'
WHERE EmployeeID = 1;

-- Historical data in time range
SELECT * FROM Employees 
FOR SYSTEM_TIME FROM '2023-01-01' TO '2023-06-30'
WHERE EmployeeID = 1;

-- All historical versions
SELECT * FROM Employees 
FOR SYSTEM_TIME ALL
WHERE EmployeeID = 1;

-- Manual query for PostgreSQL temporal data
-- Current version
SELECT * FROM employees WHERE employee_id = 1 AND valid_to = '9999-12-31 23:59:59';

-- Historical version as of specific time
SELECT * FROM (
    SELECT * FROM employees 
    WHERE employee_id = 1 AND valid_from <= '2023-06-01 10:00:00' AND valid_to > '2023-06-01 10:00:00'
    UNION ALL
    SELECT employee_id, name, position, department, salary, valid_from, valid_to 
    FROM employees_history
    WHERE employee_id = 1 AND valid_from <= '2023-06-01 10:00:00' AND valid_to > '2023-06-01 10:00:00'
) AS historical_data;

-- Track changes over time
SELECT 
    employee_id,
    name,
    position,
    salary,
    valid_from as change_date,
    'UPDATE' as change_type
FROM employees_history
WHERE employee_id = 1
UNION ALL
SELECT 
    employee_id,
    name,
    position,
    salary,
    valid_from as change_date,
    'INSERT' as change_type
FROM employees
WHERE employee_id = 1
ORDER BY change_date;

-- Temporal table for price changes
CREATE TABLE product_prices (
    product_id INT,
    price DECIMAL(10,2),
    valid_from DATE,
    valid_to DATE,
    PRIMARY KEY (product_id, valid_from)
);

-- Query to find price at specific date
SELECT product_id, price
FROM product_prices
WHERE product_id = 123 
  AND '2023-06-15' BETWEEN valid_from AND valid_to;

-- Benefits of temporal tables:
-- 1. Automatic history tracking
-- 2. Easy point-in-time queries
-- 3. Audit trail compliance
-- 4. Simplified change tracking

-- Use cases:
-- * Regulatory compliance and auditing
-- * Historical reporting and analysis
-- * Change tracking for critical data
-- * Legal and financial record keeping`,
      },
      {
        id: 47,
        question: "How do you implement row-level security?",
        solution: `-- Row-Level Security (RLS) implementation

-- PostgreSQL RLS example
CREATE TABLE documents (
    document_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    owner_id INT NOT NULL REFERENCES users(user_id),
    department_id INT REFERENCES departments(department_id),
    confidentiality_level INT CHECK (confidentiality_level BETWEEN 1 AND 3)
);

-- Enable RLS on the table
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Policy 1: Users can see their own documents
CREATE POLICY user_own_documents ON documents
    FOR ALL
    TO authenticated_user
    USING (owner_id = current_user_id());

-- Policy 2: Managers can see department documents
CREATE POLICY manager_department_documents ON documents
    FOR SELECT
    TO manager_role
    USING (department_id IN (
        SELECT department_id FROM user_departments 
        WHERE user_id = current_user_id() AND is_manager = true
    ));

-- Policy 3: Executives can see all documents up to confidentiality level 2
CREATE POLICY executive_all_documents ON documents
    FOR SELECT
    TO executive_role
    USING (confidentiality_level <= 2);

-- Policy 4: System administrators have full access
CREATE POLICY admin_all_access ON documents
    FOR ALL
    TO admin_role
    USING (true);

-- SQL Server RLS example
CREATE SCHEMA Security;
GO

CREATE FUNCTION Security.fn_security_predicate(@owner_id INT)
RETURNS TABLE
WITH SCHEMABINDING
AS
    RETURN SELECT 1 AS fn_security_result
    WHERE @owner_id = USER_ID() 
       OR USER_NAME() = 'admin'
       OR IS_MEMBER('managers') = 1;
GO

CREATE SECURITY POLICY DocumentSecurityPolicy
    ADD FILTER PREDICATE Security.fn_security_predicate(owner_id) ON dbo.documents,
    ADD BLOCK PREDICATE Security.fn_security_predicate(owner_id) ON dbo.documents;
GO

-- Dynamic data masking with RLS (SQL Server)
CREATE TABLE customer_data (
    customer_id INT PRIMARY KEY,
    email VARCHAR(255) MASKED WITH (FUNCTION = 'email()'),
    phone VARCHAR(20) MASKED WITH (FUNCTION = 'partial(3,"-XXXX-",4)'),
    ssn VARCHAR(11) MASKED WITH (FUNCTION = 'partial(0,"XXX-XX-",4)'),
    credit_card VARCHAR(19) MASKED WITH (FUNCTION = 'partial(0,"XXXX-XXXX-XXXX-",4)')
);

GRANT SELECT ON customer_data TO sales_role;
GRANT UNMASK TO manager_role;

-- Advanced RLS with multiple conditions
CREATE POLICY complex_access_policy ON documents
    FOR ALL
    TO authenticated_user
    USING (
        -- User owns the document
        owner_id = current_user_id()
        OR
        -- User is in the same department and document is not confidential
        (department_id IN (
            SELECT department_id FROM user_departments 
            WHERE user_id = current_user_id()
        ) AND confidentiality_level <= 2)
        OR
        -- User has explicit access through sharing
        document_id IN (
            SELECT document_id FROM document_shares 
            WHERE user_id = current_user_id()
        )
    );

-- RLS for multi-tenant applications
CREATE TABLE tenant_data (
    id SERIAL PRIMARY KEY,
    tenant_id INT NOT NULL,
    data VARCHAR(255),
    CONSTRAINT fk_tenant FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

ALTER TABLE tenant_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_policy ON tenant_data
    USING (tenant_id = current_tenant_id());

-- Implementation with application roles
CREATE TABLE application_roles (
    user_id INT,
    role_name VARCHAR(50),
    department_id INT,
    PRIMARY KEY (user_id, role_name)
);

CREATE POLICY role_based_access ON documents
    USING (
        EXISTS (
            SELECT 1 FROM application_roles ar
            WHERE ar.user_id = current_user_id()
            AND (
                (ar.role_name = 'admin')
                OR
                (ar.role_name = 'department_manager' 
                 AND ar.department_id = documents.department_id)
                OR
                (ar.role_name = 'user' AND owner_id = current_user_id())
            )
        )
    );

-- Testing RLS policies
-- Test as regular user
SET ROLE regular_user;
SELECT * FROM documents;  -- Should only see owned documents

-- Test as manager
SET ROLE department_manager;
SELECT * FROM documents;  -- Should see department documents

-- Test as admin
SET ROLE admin;
SELECT * FROM documents;  -- Should see all documents

-- Best practices:
-- 1. Always test policies with different roles
-- 2. Use the principle of least privilege
-- 3. Regularly audit security policies
-- 4. Combine with column-level security when needed
-- 5. Document all security policies thoroughly`,
      },
      {
        id: 48,
        question: "Write a query to handle slowly changing dimensions (SCD)",
        solution: `-- Slowly Changing Dimensions (SCD) implementation

-- Type 1 SCD: Overwrite old values (no history)
CREATE TABLE scd_type1_customers (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    -- No effective date columns
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Update Type 1: Simply overwrite
UPDATE scd_type1_customers 
SET customer_name = 'New Name', city = 'New City', updated_at = CURRENT_TIMESTAMP
WHERE customer_id = 123;

-- Type 2 SCD: Full history tracking
CREATE TABLE scd_type2_customers (
    customer_key SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    customer_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    effective_date DATE NOT NULL,
    expiration_date DATE NOT NULL DEFAULT '9999-12-31',
    is_current BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX idx_scd2_customer_id ON scd_type2_customers(customer_id);
CREATE INDEX idx_scd2_current ON scd_type2_customers(is_current);

-- Procedure for Type 2 SCD updates
CREATE OR REPLACE PROCEDURE update_scd2_customer(
    p_customer_id INT,
    p_customer_name VARCHAR,
    p_email VARCHAR,
    p_city VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Expire the current record
    UPDATE scd_type2_customers
    SET expiration_date = CURRENT_DATE - INTERVAL '1 day',
        is_current = false
    WHERE customer_id = p_customer_id AND is_current = true;

    -- Insert the new record
    INSERT INTO scd_type2_customers 
    (customer_id, customer_name, email, city, effective_date, expiration_date, is_current)
    VALUES (p_customer_id, p_customer_name, p_email, p_city, 
            CURRENT_DATE, '9999-12-31', true);
END;
$$;

-- Type 3 SCD: Limited history (previous value only)
CREATE TABLE scd_type3_customers (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    current_city VARCHAR(50) NOT NULL,
    previous_city VARCHAR(50) NULL,
    city_change_date DATE NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Update Type 3: Track previous value
UPDATE scd_type3_customers 
SET previous_city = current_city,
    current_city = 'New City',
    city_change_date = CURRENT_DATE,
    updated_at = CURRENT_TIMESTAMP
WHERE customer_id = 123;

-- Hybrid approach with all SCD types
CREATE TABLE customers_scd (
    customer_key SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    
    -- Type 1 attributes (no history)
    email VARCHAR(100) NOT NULL,
    
    -- Type 2 attributes (full history)
    customer_name VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    
    -- Type 3 attributes (limited history)
    previous_segment VARCHAR(20) NULL,
    segment_change_date DATE NULL,
    
    -- SCD metadata
    effective_date DATE NOT NULL,
    expiration_date DATE NOT NULL DEFAULT '9999-12-31',
    is_current BOOLEAN NOT NULL DEFAULT true,
    version_number INT NOT NULL DEFAULT 1
);

-- ETL process for SCD Type 2
WITH current_records AS (
    SELECT * FROM customers_scd WHERE is_current = true
),
new_data AS (
    SELECT * FROM staging_customers
),
changes AS (
    SELECT 
        n.customer_id,
        n.customer_name,
        n.city,
        CASE 
            WHEN c.customer_id IS NULL THEN 'INSERT'
            WHEN n.customer_name != c.customer_name OR n.city != c.city THEN 'UPDATE'
            ELSE 'NO_CHANGE'
        END as change_type
    FROM new_data n
    LEFT JOIN current_records c ON n.customer_id = c.customer_id
)
-- Handle inserts
INSERT INTO customers_scd (customer_id, customer_name, city, effective_date)
SELECT customer_id, customer_name, city, CURRENT_DATE
FROM changes
WHERE change_type = 'INSERT'

-- Handle updates
UNION ALL
SELECT customer_id, customer_name, city, CURRENT_DATE
FROM changes
WHERE change_type = 'UPDATE';

-- Expire old records for updates
UPDATE customers_scd cs
SET expiration_date = CURRENT_DATE - INTERVAL '1 day',
    is_current = false
FROM changes c
WHERE cs.customer_id = c.customer_id 
  AND cs.is_current = true
  AND c.change_type = 'UPDATE';

-- Query to get current dimension view
SELECT customer_id, customer_name, email, city
FROM customers_scd
WHERE is_current = true;

-- Query to get historical dimension data
SELECT customer_id, customer_name, city, effective_date, expiration_date
FROM customers_scd
WHERE customer_id = 123
ORDER BY effective_date;

-- SCD with audit tracking
CREATE TABLE scd_audit_log (
    audit_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    change_type VARCHAR(10) NOT NULL,
    old_values JSONB,
    new_values JSONB,
    changed_by VARCHAR(50) NOT NULL,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigger for SCD audit logging
CREATE OR REPLACE FUNCTION log_scd_changes()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'UPDATE') THEN
        INSERT INTO scd_audit_log 
        (customer_id, change_type, old_values, new_values, changed_by)
        VALUES (
            NEW.customer_id,
            'UPDATE',
            jsonb_build_object(
                'customer_name', OLD.customer_name,
                'city', OLD.city
            ),
            jsonb_build_object(
                'customer_name', NEW.customer_name,
                'city', NEW.city
            ),
            current_user
        );
    ELSIF (TG_OP = 'INSERT') THEN
        INSERT INTO scd_audit_log 
        (customer_id, change_type, new_values, changed_by)
        VALUES (
            NEW.customer_id,
            'INSERT',
            jsonb_build_object(
                'customer_name', NEW.customer_name,
                'city', NEW.city
            ),
            current_user
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER scd_audit_trigger
AFTER INSERT OR UPDATE ON customers_scd
FOR EACH ROW EXECUTE FUNCTION log_scd_changes();`,
      },
      {
        id: 49,
        question: "How do you use table-valued parameters?",
        solution: `-- Table-Valued Parameters (TVPs) allow passing tables to stored procedures

-- SQL Server TVP example
CREATE TYPE dbo.ProductList AS TABLE (
    ProductID INT,
    Quantity INT,
    UnitPrice DECIMAL(10,2)
);

CREATE PROCEDURE ProcessOrder
    @CustomerID INT,
    @OrderDate DATE,
    @Products dbo.ProductList READONLY
AS
BEGIN
    BEGIN TRANSACTION;
    
    -- Insert order header
    INSERT INTO Orders (CustomerID, OrderDate, TotalAmount)
    SELECT @CustomerID, @OrderDate, SUM(Quantity * UnitPrice)
    FROM @Products;
    
    DECLARE @OrderID INT = SCOPE_IDENTITY();
    
    -- Insert order details
    INSERT INTO OrderItems (OrderID, ProductID, Quantity, UnitPrice)
    SELECT @OrderID, ProductID, Quantity, UnitPrice
    FROM @Products;
    
    COMMIT TRANSACTION;
END;

-- Calling the procedure with TVP
DECLARE @ProductTVP dbo.ProductList;
INSERT INTO @ProductTVP VALUES 
(1, 2, 10.99),
(2, 1, 25.50),
(3, 3, 5.99);

EXEC ProcessOrder 
    @CustomerID = 123,
    @OrderDate = '2023-06-15',
    @Products = @ProductTVP;

-- PostgreSQL equivalent using array types
CREATE TYPE product_item AS (
    product_id INT,
    quantity INT,
    unit_price DECIMAL(10,2)
);

CREATE OR REPLACE FUNCTION process_order(
    p_customer_id INT,
    p_order_date DATE,
    p_products product_item[]
)
RETURNS INT
LANGUAGE plpgsql
AS $$
DECLARE
    v_order_id INT;
    v_total_amount DECIMAL(10,2);
BEGIN
    -- Calculate total amount
    SELECT SUM((item).quantity * (item).unit_price)
    INTO v_total_amount
    FROM UNNEST(p_products) AS item;
    
    -- Insert order header
    INSERT INTO orders (customer_id, order_date, total_amount)
    VALUES (p_customer_id, p_order_date, v_total_amount)
    RETURNING order_id INTO v_order_id;
    
    -- Insert order details
    INSERT INTO order_items (order_id, product_id, quantity, unit_price)
    SELECT v_order_id, (item).product_id, (item).quantity, (item).unit_price
    FROM UNNEST(p_products) AS item;
    
    RETURN v_order_id;
END;
$$;

-- Calling PostgreSQL function
SELECT process_order(
    123,
    '2023-06-15',
    ARRAY[
        (1, 2, 10.99)::product_item,
        (2, 1, 25.50)::product_item,
        (3, 3, 5.99)::product_item
    ]
);

-- Alternative PostgreSQL approach using JSON
CREATE OR REPLACE FUNCTION process_order_json(
    p_customer_id INT,
    p_order_date DATE,
    p_products JSON
)
RETURNS INT
LANGUAGE plpgsql
AS $$
DECLARE
    v_order_id INT;
BEGIN
    -- Insert order header
    INSERT INTO orders (customer_id, order_date, total_amount)
    SELECT p_customer_id, p_order_date, 
           SUM((item->>'quantity')::INT * (item->>'unitPrice')::DECIMAL)
    FROM JSON_ARRAY_ELEMENTS(p_products) AS item
    RETURNING order_id INTO v_order_id;
    
    -- Insert order details
    INSERT INTO order_items (order_id, product_id, quantity, unit_price)
    SELECT v_order_id, 
           (item->>'productId')::INT,
           (item->>'quantity')::INT,
           (item->>'unitPrice')::DECIMAL
    FROM JSON_ARRAY_ELEMENTS(p_products) AS item;
    
    RETURN v_order_id;
END;
$$;

-- Complex TVP with multiple data types
CREATE TYPE dbo.EmployeeData AS TABLE (
    EmployeeID INT NULL, -- NULL for new employees
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Email VARCHAR(100),
    DepartmentID INT,
    Salary DECIMAL(10,2),
    HireDate DATE,
    IsActive BIT
);

CREATE PROCEDURE MergeEmployees
    @Employees dbo.EmployeeData READONLY
AS
BEGIN
    MERGE INTO Employees AS target
    USING @Employees AS source
    ON target.EmployeeID = source.EmployeeID
    WHEN MATCHED THEN
        UPDATE SET 
            FirstName = source.FirstName,
            LastName = source.LastName,
            Email = source.Email,
            DepartmentID = source.DepartmentID,
            Salary = source.Salary,
            IsActive = source.IsActive
    WHEN NOT MATCHED THEN
        INSERT (FirstName, LastName, Email, DepartmentID, Salary, HireDate, IsActive)
        VALUES (source.FirstName, source.LastName, source.Email, source.DepartmentID, 
                source.Salary, source.HireDate, source.IsActive);
END;

-- TVP for bulk updates
CREATE TYPE dbo.PriceUpdate AS TABLE (
    ProductID INT,
    NewPrice DECIMAL(10,2),
    EffectiveDate DATE
);

CREATE PROCEDURE UpdateProductPrices
    @PriceUpdates dbo.PriceUpdate READONLY
AS
BEGIN
    -- Update current prices
    UPDATE p
    SET UnitPrice = pu.NewPrice,
        LastPriceChange = pu.EffectiveDate
    FROM Products p
    INNER JOIN @PriceUpdates pu ON p.ProductID = pu.ProductID;
    
    -- Log price changes
    INSERT INTO PriceHistory (ProductID, OldPrice, NewPrice, ChangeDate)
    SELECT p.ProductID, p.UnitPrice, pu.NewPrice, pu.EffectiveDate
    FROM Products p
    INNER JOIN @PriceUpdates pu ON p.ProductID = pu.ProductID;
END;

-- Benefits of TVPs:
-- 1. Reduced round trips to database
-- 2. Better performance for bulk operations
-- 3. Type safety and validation
-- 4. Simplified parameter passing for complex data

-- Limitations:
-- 1. Database-specific implementation
-- 2. May have size limitations
-- 3. Requires type creation`,
      },
      {
        id: 50,
        question: "Explain the MERGE statement and its use cases",
        solution: `-- MERGE statement (UPSERT operation) for synchronizing data

-- Basic MERGE example
MERGE INTO target_table AS target
USING source_table AS source
ON target.id = source.id
WHEN MATCHED THEN
    UPDATE SET 
        target.name = source.name,
        target.value = source.value,
        target.updated_at = CURRENT_TIMESTAMP
WHEN NOT MATCHED BY TARGET THEN
    INSERT (id, name, value, created_at)
    VALUES (source.id, source.name, source.value, CURRENT_TIMESTAMP)
WHEN NOT MATCHED BY SOURCE THEN
    DELETE;

-- Practical example: Synchronizing product data
MERGE INTO products AS target
USING (
    SELECT 
        product_id,
        product_name,
        category,
        unit_price,
        supplier_id
    FROM staging_products
    WHERE processed = false
) AS source
ON target.product_id = source.product_id
WHEN MATCHED AND (
    target.product_name != source.product_name OR
    target.category != source.category OR
    ABS(target.unit_price - source.unit_price) > 0.01
) THEN
    UPDATE SET 
        product_name = source.product_name,
        category = source.category,
        unit_price = source.unit_price,
        supplier_id = source.supplier_id,
        last_updated = CURRENT_TIMESTAMP
WHEN NOT MATCHED BY TARGET THEN
    INSERT (product_id, product_name, category, unit_price, supplier_id, created_at)
    VALUES (source.product_id, source.product_name, source.category, 
            source.unit_price, source.supplier_id, CURRENT_TIMESTAMP)
WHEN NOT MATCHED BY SOURCE AND target.discontinued = false THEN
    UPDATE SET 
        discontinued = true,
        discontinued_date = CURRENT_TIMESTAMP
OUTPUT 
    $action AS operation,
    INSERTED.product_id AS inserted_id,
    DELETED.product_id AS deleted_id;

-- MERGE with additional conditions
MERGE INTO customer_segments AS target
USING customer_metrics AS source
ON target.customer_id = source.customer_id
WHEN MATCHED AND source.total_spent > 1000 THEN
    UPDATE SET segment = 'VIP',
               updated_at = CURRENT_TIMESTAMP
WHEN MATCHED AND source.total_spent BETWEEN 500 AND 1000 THEN
    UPDATE SET segment = 'Premium',
               updated_at = CURRENT_TIMESTAMP
WHEN MATCHED AND source.total_spent < 500 THEN
    UPDATE SET segment = 'Standard',
               updated_at = CURRENT_TIMESTAMP
WHEN NOT MATCHED BY TARGET AND source.total_spent > 0 THEN
    INSERT (customer_id, segment, created_at)
    VALUES (source.customer_id, 
            CASE 
                WHEN source.total_spent > 1000 THEN 'VIP'
                WHEN source.total_spent > 500 THEN 'Premium'
                ELSE 'Standard'
            END,
            CURRENT_TIMESTAMP);

-- MERGE for slowly changing dimensions Type 2
MERGE INTO scd_customers AS target
USING staging_customers AS source
ON target.customer_id = source.customer_id AND target.is_current = true
WHEN MATCHED AND (
    target.customer_name != source.customer_name OR
    target.city != source.city
) THEN
    UPDATE SET 
        is_current = false,
        expiration_date = CURRENT_DATE - INTERVAL '1 day'
WHEN NOT MATCHED BY TARGET THEN
    INSERT (customer_id, customer_name, city, effective_date, expiration_date, is_current)
    VALUES (source.customer_id, source.customer_name, source.city, 
            CURRENT_DATE, '9999-12-31', true);

-- Insert historical records after MERGE
INSERT INTO scd_customers (customer_id, customer_name, city, effective_date, expiration_date, is_current)
SELECT 
    source.customer_id,
    source.customer_name,
    source.city,
    CURRENT_DATE,
    '9999-12-31',
    true
FROM staging_customers source
WHERE EXISTS (
    SELECT 1 FROM scd_customers target
    WHERE target.customer_id = source.customer_id 
    AND target.is_current = false
    AND (
        target.customer_name != source.customer_name OR
        target.city != source.city
    )
);

-- MERGE with OUTPUT clause for auditing
MERGE INTO inventory AS target
USING inventory_updates AS source
ON target.product_id = source.product_id
WHEN MATCHED THEN
    UPDATE SET 
        quantity = target.quantity + source.adjustment,
        last_updated = CURRENT_TIMESTAMP
WHEN NOT MATCHED BY TARGET THEN
    INSERT (product_id, quantity, created_at)
    VALUES (source.product_id, source.adjustment, CURRENT_TIMESTAMP)
OUTPUT 
    $action AS operation,
    COALESCE(INSERTED.product_id, DELETED.product_id) AS product_id,
    INSERTED.quantity AS new_quantity,
    DELETED.quantity AS old_quantity,
    GETDATE() AS change_timestamp
INTO inventory_audit;

-- Handling MERGE conflicts with unique constraints
BEGIN TRY
    BEGIN TRANSACTION;
    
    MERGE INTO products WITH (HOLDLOCK) AS target
    USING staging_products AS source
    ON target.product_code = source.product_code
    WHEN NOT MATCHED BY TARGET THEN
        INSERT (product_code, product_name, unit_price)
        VALUES (source.product_code, source.product_name, source.unit_price);
    
    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
    -- Handle error (duplicate key, etc.)
    THROW;
END CATCH;

-- Use cases for MERGE:
-- 1. Data synchronization between tables
-- 2. ETL processes and data warehousing
-- 3. Slowly changing dimensions
-- 4. Incremental data loading
-- 5. Audit trail generation

-- Best practices:
-- 1. Always test with sample data first
-- 2. Use appropriate indexes on join columns
-- 3. Consider using HOLDLOCK for concurrency control
-- 4. Use OUTPUT clause for auditing and debugging
-- 5. Handle potential errors with TRY/CATCH`,
      },
    ],
  },
];
