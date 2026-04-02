// ─────────────────────────────────────────────────────────────────────────────
// goData.js — Central data file for all Go Practice pages.
// ─────────────────────────────────────────────────────────────────────────────

export const goConcepts = [
  // ── 1 · Basics & Syntax ──────────────────────────────────────────────────
  {
    id: 1,
    level: "Beginner",
    icon: "Code2",
    title: "Basics & Syntax",
    summary:
      "Learn Go's fundamentals: package declarations, imports, variables, constants, primitive types, and the `fmt` package. Understand how Go programs are structured.",
    topics: [
      "package main & import",
      "var, :=, const declarations",
      "Primitive types: int, float64, string, bool",
      "fmt.Println, fmt.Printf, fmt.Sprintf",
      "Zero values in Go",
      "Type conversions",
      "Multiple return values",
      "Named return values",
    ],
    exercises: [
      {
        id: 1,
        title: "Hello, Gopher!",
        difficulty: "Beginner",
        description:
          "Write a Go program that prints 'Hello, Gopher!' to the console. Declare a string variable called `greeting`, assign the message to it, and print it using fmt.Println.",
        starterCode: `package main

import "fmt"

func main() {
	// Declare a variable greeting and print it
}`,
        solution: `package main

import "fmt"

func main() {
	greeting := "Hello, Gopher!"
	fmt.Println(greeting)
}`,
        hints: [
          "Use := for short variable declaration inside a function.",
          "fmt.Println prints the value followed by a newline.",
          "String literals are enclosed in double quotes in Go.",
        ],
        tags: ["fmt", "variables", "strings"],
        interviewQuestions: [
          "What is the difference between var and := in Go?",
          "What is the zero value of a string in Go?",
          "Why must every Go file start with a package declaration?",
        ],
      },
      {
        id: 2,
        title: "Type Conversions & Constants",
        difficulty: "Beginner",
        description:
          "Create a program that declares a constant Pi = 3.14159, an integer radius = 7, and calculates the circle's area. Convert the integer radius to float64 before computing. Print the area formatted to 2 decimal places.",
        starterCode: `package main

import "fmt"

func main() {
	const Pi = 3.14159
	radius := 7
	// Calculate area and print formatted
}`,
        solution: `package main

import "fmt"

func main() {
	const Pi = 3.14159
	radius := 7
	area := Pi * float64(radius) * float64(radius)
	fmt.Printf("Area: %.2f\n", area)
}`,
        hints: [
          "Go requires explicit type conversion: float64(radius).",
          "Use fmt.Printf with %.2f for 2 decimal places.",
          "Constants can be declared with const keyword.",
        ],
        tags: ["const", "type conversion", "fmt.Printf"],
        interviewQuestions: [
          "Why does Go not allow implicit type conversion?",
          "What is the difference between typed and untyped constants?",
          "How do you format floats in Go?",
        ],
      },
      {
        id: 3,
        title: "Multiple Return Values",
        difficulty: "Beginner",
        description:
          "Write a function `divide(a, b float64) (float64, error)` that returns the result of dividing a by b. If b is 0, return 0 and an error with message 'division by zero'. In main, call the function with (10.0, 2.0) and print the result or error.",
        starterCode: `package main

import (
	"errors"
	"fmt"
)

func divide(a, b float64) (float64, error) {
	// Implement divide function
}

func main() {
	// Call divide and handle result
}`,
        solution: `package main

import (
	"errors"
	"fmt"
)

func divide(a, b float64) (float64, error) {
	if b == 0 {
		return 0, errors.New("division by zero")
	}
	return a / b, nil
}

func main() {
	result, err := divide(10.0, 2.0)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	fmt.Printf("Result: %.2f\n", result)
}`,
        hints: [
          "Return multiple values by listing types in parentheses: (float64, error).",
          "Use errors.New() to create an error value.",
          "Return nil for the error when successful.",
          "Always check err != nil before using the result.",
        ],
        tags: ["functions", "error handling", "multiple returns"],
        interviewQuestions: [
          "Why does Go use multiple return values instead of exceptions?",
          "What is the idiomatic way to handle errors in Go?",
          "What is nil in Go?",
        ],
      },
    ],
  },

  // ── 2 · Control Flow & Data Structures ────────────────────────────────────
  {
    id: 2,
    level: "Beginner",
    icon: "Workflow",
    title: "Control Flow & Data Structures",
    summary:
      "Master Go's for loop (no while!), if/else, switch, and the core data structures: arrays, slices, maps, and structs.",
    topics: [
      "for loop — the only loop in Go",
      "if / else with initialisation statements",
      "switch without fallthrough by default",
      "Arrays and slices — append, copy, len, cap",
      "Maps — make, delete, zero value check",
      "Structs and struct literals",
      "Pointers to structs",
      "Range over slices and maps",
    ],
    exercises: [
      {
        id: 1,
        title: "FizzBuzz in Go",
        difficulty: "Beginner",
        description:
          "Write a Go program that prints FizzBuzz for numbers 1-20. Print 'Fizz' for multiples of 3, 'Buzz' for multiples of 5, 'FizzBuzz' for both, and the number otherwise. Use a for loop and an if/else chain.",
        starterCode: `package main

import "fmt"

func main() {
	// FizzBuzz 1-20
}`,
        solution: `package main

import "fmt"

func main() {
	for i := 1; i <= 20; i++ {
		if i%3 == 0 && i%5 == 0 {
			fmt.Println("FizzBuzz")
		} else if i%3 == 0 {
			fmt.Println("Fizz")
		} else if i%5 == 0 {
			fmt.Println("Buzz")
		} else {
			fmt.Println(i)
		}
	}
}`,
        hints: [
          "Go only has a for loop — no while keyword.",
          "Check the combined condition first (i%3==0 && i%5==0).",
          "The % operator gives the remainder.",
        ],
        tags: ["for loop", "if/else", "modulo"],
        interviewQuestions: [
          "Why does Go only have a for loop?",
          "How do you write an infinite loop in Go?",
          "What is the difference between for range and a traditional for loop?",
        ],
      },
      {
        id: 2,
        title: "Word Frequency Map",
        difficulty: "Beginner",
        description:
          "Write a function `wordCount(s string) map[string]int` that takes a string of space-separated words and returns a map of each word to its frequency. In main, call it with \"go is fast go is compiled\" and print the map.",
        starterCode: `package main

import (
	"fmt"
	"strings"
)

func wordCount(s string) map[string]int {
	// Return word frequency map
}

func main() {
	// Call wordCount and print result
}`,
        solution: `package main

import (
	"fmt"
	"strings"
)

func wordCount(s string) map[string]int {
	counts := make(map[string]int)
	for _, word := range strings.Fields(s) {
		counts[word]++
	}
	return counts
}

func main() {
	result := wordCount("go is fast go is compiled")
	fmt.Println(result)
}`,
        hints: [
          "Use make(map[string]int) to initialise an empty map.",
          "strings.Fields splits by whitespace.",
          "Accessing a missing map key returns the zero value (0 for int).",
        ],
        tags: ["maps", "strings", "range"],
        interviewQuestions: [
          "What happens when you access a missing key in a Go map?",
          "How do you check if a key exists in a map?",
          "Are Go maps ordered?",
        ],
      },
      {
        id: 3,
        title: "Student Struct with Methods",
        difficulty: "Beginner",
        description:
          "Define a `Student` struct with fields `Name string` and `Grade int`. Add a method `Pass() bool` that returns true if Grade >= 50. Create two students in main, call Pass() on each, and print whether they passed.",
        starterCode: `package main

import "fmt"

type Student struct {
	// Define fields
}

// Add Pass() method

func main() {
	// Create students and print results
}`,
        solution: `package main

import "fmt"

type Student struct {
	Name  string
	Grade int
}

func (s Student) Pass() bool {
	return s.Grade >= 50
}

func main() {
	s1 := Student{Name: "Alice", Grade: 75}
	s2 := Student{Name: "Bob", Grade: 40}
	fmt.Printf("%s passed: %v\n", s1.Name, s1.Pass())
	fmt.Printf("%s passed: %v\n", s2.Name, s2.Pass())
}`,
        hints: [
          "Methods use a receiver: func (s Student) MethodName() ReturnType {}",
          "Use struct literals: Student{Name: \"Alice\", Grade: 75}",
          "Value receivers get a copy; pointer receivers get the original.",
        ],
        tags: ["structs", "methods", "types"],
        interviewQuestions: [
          "What is the difference between value receivers and pointer receivers?",
          "How does Go achieve object-oriented behaviour without classes?",
          "When should you use a pointer receiver?",
        ],
      },
    ],
  },

  // ── 3 · Functions, Errors & Defer ──────────────────────────────────────────
  {
    id: 3,
    level: "Beginner",
    icon: "FileCode",
    title: "Functions, Errors & Defer",
    summary:
      "Deep dive into Go functions: variadic functions, closures, first-class functions, idiomatic error handling with the error interface, and the defer/panic/recover triad.",
    topics: [
      "Variadic functions (...args)",
      "First-class functions & closures",
      "The error interface",
      "Custom error types",
      "defer — LIFO execution",
      "panic and recover",
      "Wrapping errors with fmt.Errorf %w",
      "errors.Is and errors.As",
    ],
    exercises: [
      {
        id: 1,
        title: "Counter Closure",
        difficulty: "Beginner",
        description:
          "Write a function `makeCounter() func() int` that returns a closure. Each time the returned function is called, it increments an internal counter and returns the new count. In main, create a counter and call it 3 times, printing each result.",
        starterCode: `package main

import "fmt"

func makeCounter() func() int {
	// Return a closure that increments and returns count
}

func main() {
	// Create counter and call it 3 times
}`,
        solution: `package main

import "fmt"

func makeCounter() func() int {
	count := 0
	return func() int {
		count++
		return count
	}
}

func main() {
	counter := makeCounter()
	fmt.Println(counter())
	fmt.Println(counter())
	fmt.Println(counter())
}`,
        hints: [
          "The inner function captures the outer variable by reference.",
          "Each call to makeCounter() creates an independent counter.",
          "The return type is func() int — a function that returns an int.",
        ],
        tags: ["closures", "functions", "state"],
        interviewQuestions: [
          "What is a closure in Go?",
          "How does a closure capture variables from its enclosing scope?",
          "What are practical uses of closures in Go?",
        ],
      },
      {
        id: 2,
        title: "Custom Error Type",
        difficulty: "Beginner",
        description:
          "Create a `ValidationError` struct with a `Field string` and `Message string`. Implement the `error` interface on it. Write a function `validateAge(age int) error` that returns a ValidationError if age < 0 or age > 150, otherwise nil. Test it in main.",
        starterCode: `package main

import "fmt"

type ValidationError struct {
	// Define fields
}

// Implement error interface

func validateAge(age int) error {
	// Validate age
}

func main() {
	// Test with valid and invalid ages
}`,
        solution: `package main

import "fmt"

type ValidationError struct {
	Field   string
	Message string
}

func (e *ValidationError) Error() string {
	return fmt.Sprintf("validation error on %s: %s", e.Field, e.Message)
}

func validateAge(age int) error {
	if age < 0 {
		return &ValidationError{Field: "age", Message: "must be non-negative"}
	}
	if age > 150 {
		return &ValidationError{Field: "age", Message: "must be <= 150"}
	}
	return nil
}

func main() {
	if err := validateAge(-5); err != nil {
		fmt.Println(err)
	}
	if err := validateAge(25); err != nil {
		fmt.Println(err)
	} else {
		fmt.Println("Age is valid")
	}
}`,
        hints: [
          "The error interface requires an Error() string method.",
          "Return a pointer to your struct: &ValidationError{...}",
          "Use errors.As to unwrap custom error types.",
        ],
        tags: ["error interface", "custom errors", "structs"],
        interviewQuestions: [
          "How does Go's error interface work?",
          "When would you create a custom error type vs using errors.New?",
          "What is the difference between errors.Is and errors.As?",
        ],
      },
      {
        id: 3,
        title: "Defer & Resource Cleanup",
        difficulty: "Beginner",
        description:
          "Write a function `processData()` that simulates opening a resource (print 'Resource opened'), does some work (print 'Processing...'), and uses defer to ensure 'Resource closed' is always printed — even if panic occurs. Demonstrate with recover in a wrapper.",
        starterCode: `package main

import "fmt"

func processData() {
	// Open resource, defer close, do work
}

func safeProcess() {
	// Use recover to handle any panic
}

func main() {
	safeProcess()
}`,
        solution: `package main

import "fmt"

func processData() {
	fmt.Println("Resource opened")
	defer fmt.Println("Resource closed")
	fmt.Println("Processing...")
}

func safeProcess() {
	defer func() {
		if r := recover(); r != nil {
			fmt.Println("Recovered from panic:", r)
		}
	}()
	processData()
}

func main() {
	safeProcess()
}`,
        hints: [
          "defer statements execute in LIFO order when the function returns.",
          "defer runs even when a panic occurs.",
          "recover() must be called inside a deferred function.",
        ],
        tags: ["defer", "panic", "recover"],
        interviewQuestions: [
          "In what order do deferred functions execute?",
          "When should you use panic vs returning an error?",
          "How do you implement cleanup logic in Go without defer?",
        ],
      },
    ],
  },

  // ── 4 · Goroutines & Channels ──────────────────────────────────────────────
  {
    id: 4,
    level: "Intermediate",
    icon: "Cpu",
    title: "Goroutines & Channels",
    summary:
      "Master Go's concurrency model: lightweight goroutines, typed channels, select statements, WaitGroups, Mutexes, and common patterns like fan-out/fan-in.",
    topics: [
      "go keyword — launching goroutines",
      "Buffered vs unbuffered channels",
      "Directional channels (chan<-, <-chan)",
      "select statement",
      "sync.WaitGroup",
      "sync.Mutex & sync.RWMutex",
      "context.Context for cancellation",
      "Fan-out / Fan-in patterns",
      "Worker pool pattern",
    ],
    exercises: [
      {
        id: 1,
        title: "Concurrent Sum with WaitGroup",
        difficulty: "Intermediate",
        description:
          "Split a slice of 8 integers into two halves. Use two goroutines to sum each half concurrently. Collect results via a channel and print the total. Use sync.WaitGroup to wait for both goroutines.",
        starterCode: `package main

import (
	"fmt"
	"sync"
)

func sumSlice(nums []int, ch chan<- int, wg *sync.WaitGroup) {
	// Sum nums and send result to ch
}

func main() {
	nums := []int{1, 2, 3, 4, 5, 6, 7, 8}
	// Launch goroutines and collect results
}`,
        solution: `package main

import (
	"fmt"
	"sync"
)

func sumSlice(nums []int, ch chan<- int, wg *sync.WaitGroup) {
	defer wg.Done()
	total := 0
	for _, n := range nums {
		total += n
	}
	ch <- total
}

func main() {
	nums := []int{1, 2, 3, 4, 5, 6, 7, 8}
	ch := make(chan int, 2)
	var wg sync.WaitGroup

	wg.Add(2)
	go sumSlice(nums[:4], ch, &wg)
	go sumSlice(nums[4:], ch, &wg)

	wg.Wait()
	close(ch)

	total := 0
	for v := range ch {
		total += v
	}
	fmt.Println("Total:", total)
}`,
        hints: [
          "Use wg.Add(n) before launching goroutines, wg.Done() inside each.",
          "A buffered channel (make(chan int, 2)) avoids deadlock here.",
          "Close the channel after wg.Wait() so range terminates.",
        ],
        tags: ["goroutines", "channels", "WaitGroup", "concurrency"],
        interviewQuestions: [
          "What is the difference between buffered and unbuffered channels?",
          "When can goroutines cause a deadlock?",
          "How does sync.WaitGroup work?",
        ],
      },
      {
        id: 2,
        title: "Worker Pool Pattern",
        difficulty: "Intermediate",
        description:
          "Implement a worker pool with 3 workers that process jobs from a jobs channel. Each job is an integer — the worker squares it and sends the result to a results channel. Send jobs 1-9, collect and print all results.",
        starterCode: `package main

import "fmt"

func worker(id int, jobs <-chan int, results chan<- int) {
	// Process each job: square the number
}

func main() {
	jobs := make(chan int, 9)
	results := make(chan int, 9)
	// Launch 3 workers, send 9 jobs, collect results
}`,
        solution: `package main

import "fmt"

func worker(id int, jobs <-chan int, results chan<- int) {
	for j := range jobs {
		results <- j * j
	}
}

func main() {
	jobs := make(chan int, 9)
	results := make(chan int, 9)

	for w := 1; w <= 3; w++ {
		go worker(w, jobs, results)
	}

	for j := 1; j <= 9; j++ {
		jobs <- j
	}
	close(jobs)

	for r := 0; r < 9; r++ {
		fmt.Println(<-results)
	}
}`,
        hints: [
          "Directional channels (chan<-, <-chan) prevent misuse.",
          "Closing the jobs channel signals workers to stop via range.",
          "Collect exactly as many results as you sent jobs.",
        ],
        tags: ["worker pool", "channels", "goroutines"],
        interviewQuestions: [
          "What is a worker pool and why use it?",
          "What happens if you close a channel that has already been closed?",
          "How do directional channels improve code safety?",
        ],
      },
      {
        id: 3,
        title: "Timeout with Select & Context",
        difficulty: "Intermediate",
        description:
          "Write a function `fetchData(ctx context.Context) (string, error)` that simulates a slow operation (sleep 200ms) and returns 'data'. In main, call it with a 100ms timeout context and handle the timeout error.",
        starterCode: `package main

import (
	"context"
	"fmt"
	"time"
)

func fetchData(ctx context.Context) (string, error) {
	// Simulate slow work, respect context cancellation
}

func main() {
	// Create a 100ms timeout context and call fetchData
}`,
        solution: `package main

import (
	"context"
	"fmt"
	"time"
)

func fetchData(ctx context.Context) (string, error) {
	select {
	case <-time.After(200 * time.Millisecond):
		return "data", nil
	case <-ctx.Done():
		return "", ctx.Err()
	}
}

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
	defer cancel()

	result, err := fetchData(ctx)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	fmt.Println("Result:", result)
}`,
        hints: [
          "context.WithTimeout returns a context and a cancel function.",
          "Always defer cancel() to release resources.",
          "select chooses whichever channel is ready first.",
          "ctx.Done() returns a channel that closes when context expires.",
        ],
        tags: ["context", "select", "timeout", "cancellation"],
        interviewQuestions: [
          "Why should you always call the cancel function from context.WithTimeout?",
          "What is the difference between context.WithTimeout and context.WithDeadline?",
          "How does select handle multiple ready channels?",
        ],
      },
    ],
  },

  // ── 5 · Interfaces & Packages ─────────────────────────────────────────────
  {
    id: 5,
    level: "Intermediate",
    icon: "Layers",
    title: "Interfaces & Packages",
    summary:
      "Understand Go's implicit interface satisfaction, embedding, the Stringer and io.Reader/Writer interfaces, and how to structure Go packages for maintainability.",
    topics: [
      "Interface declaration and implicit satisfaction",
      "The empty interface (interface{} / any)",
      "Type assertions and type switches",
      "Embedding interfaces",
      "fmt.Stringer interface",
      "io.Reader and io.Writer",
      "Package organisation",
      "Exported vs unexported identifiers",
    ],
    exercises: [
      {
        id: 1,
        title: "Shape Interface",
        difficulty: "Intermediate",
        description:
          "Define a `Shape` interface with `Area() float64` and `Perimeter() float64` methods. Implement it for `Rectangle` (width, height) and `Circle` (radius). Write a `printShapeInfo(s Shape)` function and call it for both shapes in main.",
        starterCode: `package main

import (
	"fmt"
	"math"
)

type Shape interface {
	// Define Area and Perimeter methods
}

type Rectangle struct{ Width, Height float64 }
type Circle struct{ Radius float64 }

// Implement Shape for Rectangle and Circle

func printShapeInfo(s Shape) {
	// Print area and perimeter
}

func main() {
	// Create shapes and call printShapeInfo
}`,
        solution: `package main

import (
	"fmt"
	"math"
)

type Shape interface {
	Area() float64
	Perimeter() float64
}

type Rectangle struct{ Width, Height float64 }
type Circle struct{ Radius float64 }

func (r Rectangle) Area() float64      { return r.Width * r.Height }
func (r Rectangle) Perimeter() float64 { return 2 * (r.Width + r.Height) }

func (c Circle) Area() float64      { return math.Pi * c.Radius * c.Radius }
func (c Circle) Perimeter() float64 { return 2 * math.Pi * c.Radius }

func printShapeInfo(s Shape) {
	fmt.Printf("Area: %.2f, Perimeter: %.2f\n", s.Area(), s.Perimeter())
}

func main() {
	printShapeInfo(Rectangle{Width: 4, Height: 3})
	printShapeInfo(Circle{Radius: 5})
}`,
        hints: [
          "Go interfaces are satisfied implicitly — no 'implements' keyword.",
          "Any type with the required methods satisfies the interface.",
          "Use math.Pi for π and math.Pow or multiplication for powers.",
        ],
        tags: ["interfaces", "polymorphism", "math"],
        interviewQuestions: [
          "How does Go's implicit interface satisfaction differ from Java?",
          "What is the empty interface and when would you use it?",
          "What is the difference between interface embedding and struct embedding?",
        ],
      },
      {
        id: 2,
        title: "Type Switch & fmt.Stringer",
        difficulty: "Intermediate",
        description:
          "Define a `Color` type (int) with constants Red=0, Green=1, Blue=2. Implement `fmt.Stringer` on it. Write a function `describe(v interface{})` using a type switch that prints different messages for int, string, Color, and other types. Demo in main.",
        starterCode: `package main

import "fmt"

type Color int

const (
	Red Color = iota
	Green
	Blue
)

// Implement Stringer for Color

func describe(v interface{}) {
	// Type switch here
}

func main() {
	describe(42)
	describe("hello")
	describe(Green)
	describe(3.14)
}`,
        solution: `package main

import "fmt"

type Color int

const (
	Red Color = iota
	Green
	Blue
)

func (c Color) String() string {
	switch c {
	case Red:
		return "Red"
	case Green:
		return "Green"
	case Blue:
		return "Blue"
	default:
		return "Unknown"
	}
}

func describe(v interface{}) {
	switch t := v.(type) {
	case int:
		fmt.Printf("Integer: %d\n", t)
	case string:
		fmt.Printf("String: %s\n", t)
	case Color:
		fmt.Printf("Color: %s\n", t)
	default:
		fmt.Printf("Unknown type: %T\n", t)
	}
}

func main() {
	describe(42)
	describe("hello")
	describe(Green)
	describe(3.14)
}`,
        hints: [
          "iota auto-increments within a const block.",
          "fmt.Stringer requires a String() string method.",
          "Type switch: switch t := v.(type) { case int: ... }",
        ],
        tags: ["interfaces", "type switch", "Stringer", "iota"],
        interviewQuestions: [
          "How does fmt.Stringer work?",
          "What is the difference between a type assertion and a type switch?",
          "When would you use interface{} vs generics?",
        ],
      },
    ],
  },

  // ── 6 · Advanced Patterns ─────────────────────────────────────────────────
  {
    id: 6,
    level: "Advanced",
    icon: "Zap",
    title: "Advanced Go Patterns",
    summary:
      "Go generics (1.18+), the context pattern for large systems, table-driven testing, benchmarking, and performance profiling with pprof.",
    topics: [
      "Generics: type parameters and constraints",
      "comparable and any constraints",
      "Generic data structures (Stack, Map)",
      "Table-driven tests with testing.T",
      "Benchmarks with testing.B",
      "Subtests — t.Run()",
      "pprof CPU and memory profiling",
      "sync.Pool for object reuse",
      "atomic operations — sync/atomic",
    ],
    exercises: [
      {
        id: 1,
        title: "Generic Stack",
        difficulty: "Advanced",
        description:
          "Implement a generic `Stack[T any]` with methods `Push(v T)`, `Pop() (T, bool)`, and `Len() int`. Demonstrate it with int and string stacks in main.",
        starterCode: `package main

import "fmt"

type Stack[T any] struct {
	// Internal storage
}

func (s *Stack[T]) Push(v T) {
	// Push to stack
}

func (s *Stack[T]) Pop() (T, bool) {
	// Pop from stack
}

func (s *Stack[T]) Len() int {
	// Return length
}

func main() {
	// Demo int and string stacks
}`,
        solution: `package main

import "fmt"

type Stack[T any] struct {
	items []T
}

func (s *Stack[T]) Push(v T) {
	s.items = append(s.items, v)
}

func (s *Stack[T]) Pop() (T, bool) {
	var zero T
	if len(s.items) == 0 {
		return zero, false
	}
	top := s.items[len(s.items)-1]
	s.items = s.items[:len(s.items)-1]
	return top, true
}

func (s *Stack[T]) Len() int {
	return len(s.items)
}

func main() {
	var intStack Stack[int]
	intStack.Push(1)
	intStack.Push(2)
	v, ok := intStack.Pop()
	fmt.Println(v, ok)

	var strStack Stack[string]
	strStack.Push("Go")
	strStack.Push("Generics")
	fmt.Println(strStack.Pop())
}`,
        hints: [
          "Type parameter syntax: type Stack[T any] struct{}",
          "Methods on generic types: func (s *Stack[T]) Push(v T)",
          "Return the zero value of T when the stack is empty: var zero T",
        ],
        tags: ["generics", "type parameters", "data structures"],
        interviewQuestions: [
          "What are generics in Go and when were they introduced?",
          "What is the difference between any and comparable constraints?",
          "How do generics compare to interface{} for type safety?",
        ],
      },
      {
        id: 2,
        title: "Table-Driven Tests",
        difficulty: "Advanced",
        description:
          "Write a `Sum(nums ...int) int` function and a comprehensive table-driven test `TestSum` covering: empty input, single element, multiple elements, and negative numbers. Use t.Run for subtests.",
        starterCode: `package main

// Note: In real Go, tests go in _test.go files.
// Write the Sum function and show the test structure.

func Sum(nums ...int) int {
	// Implement variadic Sum
}

// TestSum shows table-driven test structure
// func TestSum(t *testing.T) {
//   tests := []struct{ ... }{ ... }
//   for _, tt := range tests { t.Run(...) }
// }`,
        solution: `package main

import "fmt"

func Sum(nums ...int) int {
	total := 0
	for _, n := range nums {
		total += n
	}
	return total
}

// Table-driven test (would live in sum_test.go):
//
// func TestSum(t *testing.T) {
// 	tests := []struct {
// 		name     string
// 		input    []int
// 		expected int
// 	}{
// 		{"empty", []int{}, 0},
// 		{"single", []int{5}, 5},
// 		{"multiple", []int{1, 2, 3}, 6},
// 		{"negatives", []int{-1, -2, 3}, 0},
// 	}
// 	for _, tt := range tests {
// 		t.Run(tt.name, func(t *testing.T) {
// 			got := Sum(tt.input...)
// 			if got != tt.expected {
// 				t.Errorf("Sum(%v) = %d, want %d", tt.input, got, tt.expected)
// 			}
// 		})
// 	}
// }

func main() {
	fmt.Println(Sum())
	fmt.Println(Sum(5))
	fmt.Println(Sum(1, 2, 3))
	fmt.Println(Sum(-1, -2, 3))
}`,
        hints: [
          "Variadic functions use ... before the type: nums ...int",
          "Table-driven tests use a slice of anonymous structs.",
          "t.Run(name, func(t *testing.T){}) creates a named subtest.",
        ],
        tags: ["testing", "table-driven", "variadic", "subtests"],
        interviewQuestions: [
          "What are the advantages of table-driven tests?",
          "How do you run a specific subtest with go test -run?",
          "How do you write a benchmark in Go?",
        ],
      },
    ],
  },
];

// ─── Global Exercises (shown on /go-practice/exercises) ─────────────────────
export const goExercises = [
  {
    id: 1,
    title: "Hello, World!",
    difficulty: "Beginner",
    description:
      "Write a complete Go program in package main that imports fmt and prints 'Hello, World!' using fmt.Println.",
    starterCode: `package main\n\nimport "fmt"\n\nfunc main() {\n\t\n}`,
    solution: `package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello, World!")\n}`,
    hints: [
      "Every Go executable must have package main and a main() function.",
      'Use fmt.Println("Hello, World!") to print.',
    ],
    tags: ["basics", "fmt", "package main"],
  },
  {
    id: 2,
    title: "Fibonacci Sequence",
    difficulty: "Beginner",
    description:
      "Write a function `fib(n int) int` that returns the nth Fibonacci number (0-indexed: fib(0)=0, fib(1)=1). Print fib(0) through fib(9) in main.",
    starterCode: `package main\n\nimport "fmt"\n\nfunc fib(n int) int {\n\t// Return nth Fibonacci number\n}\n\nfunc main() {\n\t// Print fib(0) to fib(9)\n}`,
    solution: `package main\n\nimport "fmt"\n\nfunc fib(n int) int {\n\tif n <= 1 {\n\t\treturn n\n\t}\n\treturn fib(n-1) + fib(n-2)\n}\n\nfunc main() {\n\tfor i := 0; i < 10; i++ {\n\t\tfmt.Println(fib(i))\n\t}\n}`,
    hints: [
      "Base cases: fib(0)=0, fib(1)=1.",
      "Use recursion: fib(n) = fib(n-1) + fib(n-2).",
    ],
    tags: ["recursion", "functions", "loops"],
  },
  {
    id: 3,
    title: "Reverse a String",
    difficulty: "Beginner",
    description:
      "Write a function `reverseString(s string) string` that returns the reversed string. Handle Unicode correctly by converting to []rune. Test with 'golang' and 'hello'.",
    starterCode: `package main\n\nimport "fmt"\n\nfunc reverseString(s string) string {\n\t// Reverse the string\n}\n\nfunc main() {\n\tfmt.Println(reverseString("golang"))\n\tfmt.Println(reverseString("hello"))\n}`,
    solution: `package main\n\nimport "fmt"\n\nfunc reverseString(s string) string {\n\trunes := []rune(s)\n\tfor i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {\n\t\trunes[i], runes[j] = runes[j], runes[i]\n\t}\n\treturn string(runes)\n}\n\nfunc main() {\n\tfmt.Println(reverseString("golang"))\n\tfmt.Println(reverseString("hello"))\n}`,
    hints: [
      "Convert to []rune for proper Unicode handling.",
      "Swap elements from both ends moving inward.",
    ],
    tags: ["strings", "runes", "unicode"],
  },
  {
    id: 4,
    title: "Is Prime?",
    difficulty: "Beginner",
    description:
      "Write a function `isPrime(n int) bool`. Print prime numbers from 2 to 30 in main.",
    starterCode: `package main\n\nimport "fmt"\n\nfunc isPrime(n int) bool {\n\t// Check if n is prime\n}\n\nfunc main() {\n\t// Print primes from 2 to 30\n}`,
    solution: `package main\n\nimport (\n\t"fmt"\n\t"math"\n)\n\nfunc isPrime(n int) bool {\n\tif n < 2 {\n\t\treturn false\n\t}\n\tfor i := 2; i <= int(math.Sqrt(float64(n))); i++ {\n\t\tif n%i == 0 {\n\t\t\treturn false\n\t\t}\n\t}\n\treturn true\n}\n\nfunc main() {\n\tfor i := 2; i <= 30; i++ {\n\t\tif isPrime(i) {\n\t\t\tfmt.Println(i)\n\t\t}\n\t}\n}`,
    hints: [
      "Numbers < 2 are not prime.",
      "Only check divisors up to sqrt(n) for efficiency.",
      "Use math.Sqrt(float64(n)).",
    ],
    tags: ["math", "loops", "conditionals"],
  },
  {
    id: 5,
    title: "Slice Operations",
    difficulty: "Beginner",
    description:
      "Given a slice `nums := []int{5, 3, 8, 1, 9, 2, 7, 4, 6}`, write code to: (1) find the max value, (2) filter only even numbers into a new slice, (3) print both results.",
    starterCode: `package main\n\nimport "fmt"\n\nfunc main() {\n\tnums := []int{5, 3, 8, 1, 9, 2, 7, 4, 6}\n\t// Find max and filter evens\n}`,
    solution: `package main\n\nimport "fmt"\n\nfunc main() {\n\tnums := []int{5, 3, 8, 1, 9, 2, 7, 4, 6}\n\n\tmax := nums[0]\n\tfor _, v := range nums {\n\t\tif v > max {\n\t\t\tmax = v\n\t\t}\n\t}\n\n\tvar evens []int\n\tfor _, v := range nums {\n\t\tif v%2 == 0 {\n\t\t\tevens = append(evens, v)\n\t\t}\n\t}\n\n\tfmt.Println("Max:", max)\n\tfmt.Println("Evens:", evens)\n}`,
    hints: [
      "Initialise max to nums[0] before the loop.",
      "Use append to build the evens slice.",
      "range gives index and value: for i, v := range nums",
    ],
    tags: ["slices", "range", "append"],
  },
  {
    id: 6,
    title: "Goroutine Fan-Out",
    difficulty: "Intermediate",
    description:
      "Launch 5 goroutines. Each goroutine receives its ID (1-5) and sends ID*ID to a results channel. Collect and print all results in main. Use a buffered channel to avoid deadlock.",
    starterCode: `package main\n\nimport "fmt"\n\nfunc main() {\n\t// Launch 5 goroutines, collect squares via channel\n}`,
    solution: `package main\n\nimport "fmt"\n\nfunc main() {\n\tresults := make(chan int, 5)\n\n\tfor i := 1; i <= 5; i++ {\n\t\tgo func(id int) {\n\t\t\tresults <- id * id\n\t\t}(i)\n\t}\n\n\tfor i := 0; i < 5; i++ {\n\t\tfmt.Println(<-results)\n\t}\n}`,
    hints: [
      "Pass loop variable as argument to the goroutine to avoid capture issues.",
      "Buffered channel (make(chan int, 5)) holds results without blocking.",
    ],
    tags: ["goroutines", "channels", "concurrency"],
  },
  {
    id: 7,
    title: "Interface Polymorphism",
    difficulty: "Intermediate",
    description:
      "Define a `Speaker` interface with a `Speak() string` method. Implement it on `Dog` (returns 'Woof!') and `Cat` (returns 'Meow!'). Write `makeNoise(s Speaker)` that prints the result. Demo both.",
    starterCode: `package main\n\nimport "fmt"\n\ntype Speaker interface {\n\t// Define Speak method\n}\n\ntype Dog struct{}\ntype Cat struct{}\n\n// Implement Speak for Dog and Cat\n\nfunc makeNoise(s Speaker) {\n\t// Print s.Speak()\n}\n\nfunc main() {\n\tmakeNoise(Dog{})\n\tmakeNoise(Cat{})\n}`,
    solution: `package main\n\nimport "fmt"\n\ntype Speaker interface {\n\tSpeak() string\n}\n\ntype Dog struct{}\ntype Cat struct{}\n\nfunc (d Dog) Speak() string { return "Woof!" }\nfunc (c Cat) Speak() string { return "Meow!" }\n\nfunc makeNoise(s Speaker) {\n\tfmt.Println(s.Speak())\n}\n\nfunc main() {\n\tmakeNoise(Dog{})\n\tmakeNoise(Cat{})\n}`,
    hints: [
      "No implements keyword — just define the method with the right signature.",
      "Both Dog and Cat satisfy Speaker automatically.",
    ],
    tags: ["interfaces", "polymorphism"],
  },
  {
    id: 8,
    title: "Error Wrapping with %w",
    difficulty: "Intermediate",
    description:
      "Write a `readConfig(path string) error` that wraps a simulated 'file not found' error using fmt.Errorf with %w. In main, use errors.Is to detect the wrapped error.",
    starterCode: `package main\n\nimport (\n\t"errors"\n\t"fmt"\n)\n\nvar ErrNotFound = errors.New("file not found")\n\nfunc readConfig(path string) error {\n\t// Simulate wrapping ErrNotFound\n}\n\nfunc main() {\n\terr := readConfig("config.yaml")\n\t// Use errors.Is to check\n}`,
    solution: `package main\n\nimport (\n\t"errors"\n\t"fmt"\n)\n\nvar ErrNotFound = errors.New("file not found")\n\nfunc readConfig(path string) error {\n\treturn fmt.Errorf("readConfig %q: %w", path, ErrNotFound)\n}\n\nfunc main() {\n\terr := readConfig("config.yaml")\n\tif errors.Is(err, ErrNotFound) {\n\t\tfmt.Println("Config not found:", err)\n\t}\n}`,
    hints: [
      "Use %w (not %v) in fmt.Errorf to wrap the error for errors.Is.",
      "errors.Is traverses the error chain.",
    ],
    tags: ["error wrapping", "fmt.Errorf", "errors.Is"],
  },
  {
    id: 9,
    title: "Mutex-Safe Counter",
    difficulty: "Intermediate",
    description:
      "Create a `SafeCounter` struct with a sync.Mutex and an int value. Add `Increment()` and `Value() int` methods with proper locking. Launch 1000 goroutines each calling Increment, then print the final value.",
    starterCode: `package main\n\nimport (\n\t"fmt"\n\t"sync"\n)\n\ntype SafeCounter struct {\n\t// mu and count fields\n}\n\nfunc (c *SafeCounter) Increment() {\n\t// Lock, increment, unlock\n}\n\nfunc (c *SafeCounter) Value() int {\n\t// Lock, return value, unlock\n}\n\nfunc main() {\n\t// Launch 1000 goroutines, wait, print\n}`,
    solution: `package main\n\nimport (\n\t"fmt"\n\t"sync"\n)\n\ntype SafeCounter struct {\n\tmu    sync.Mutex\n\tcount int\n}\n\nfunc (c *SafeCounter) Increment() {\n\tc.mu.Lock()\n\tdefer c.mu.Unlock()\n\tc.count++\n}\n\nfunc (c *SafeCounter) Value() int {\n\tc.mu.Lock()\n\tdefer c.mu.Unlock()\n\treturn c.count\n}\n\nfunc main() {\n\tvar wg sync.WaitGroup\n\tc := &SafeCounter{}\n\n\tfor i := 0; i < 1000; i++ {\n\t\twg.Add(1)\n\t\tgo func() {\n\t\t\tdefer wg.Done()\n\t\t\tc.Increment()\n\t\t}()\n\t}\n\twg.Wait()\n\tfmt.Println("Final count:", c.Value())\n}`,
    hints: [
      "sync.Mutex provides Lock() and Unlock().",
      "Use defer c.mu.Unlock() for cleaner code.",
      "Use a pointer receiver for methods that mutate state.",
    ],
    tags: ["mutex", "sync", "concurrency", "race condition"],
  },
  {
    id: 10,
    title: "Generic Filter Function",
    difficulty: "Advanced",
    description:
      "Write a generic function `Filter[T any](slice []T, predicate func(T) bool) []T` that returns a new slice containing only elements for which predicate returns true. Demo with filtering even ints and strings longer than 3 chars.",
    starterCode: `package main\n\nimport "fmt"\n\nfunc Filter[T any](slice []T, predicate func(T) bool) []T {\n\t// Return filtered slice\n}\n\nfunc main() {\n\t// Filter ints and strings\n}`,
    solution: `package main\n\nimport "fmt"\n\nfunc Filter[T any](slice []T, predicate func(T) bool) []T {\n\tvar result []T\n\tfor _, v := range slice {\n\t\tif predicate(v) {\n\t\t\tresult = append(result, v)\n\t\t}\n\t}\n\treturn result\n}\n\nfunc main() {\n\tnums := []int{1, 2, 3, 4, 5, 6}\n\tevens := Filter(nums, func(n int) bool { return n%2 == 0 })\n\tfmt.Println(evens)\n\n\twords := []string{"go", "rust", "python", "c"}\n\tlong := Filter(words, func(s string) bool { return len(s) > 3 })\n\tfmt.Println(long)\n}`,
    hints: [
      "Generic type parameter: [T any].",
      "The predicate is a function value passed as argument.",
      "Type inference lets you call Filter(nums, ...) without explicit [int].",
    ],
    tags: ["generics", "higher-order functions", "slices"],
  },
];
