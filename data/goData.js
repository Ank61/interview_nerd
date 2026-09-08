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
	fmt.Printf("Area: %.2f\\n", area)
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
	fmt.Printf("Result: %.2f\\n", result)
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
      {
        id: 4,
        title: "Package Imports: Math Power",
        difficulty: "Beginner",
        description:
          "Write a program that imports both the `fmt` and `math` packages. Declare a variable `number := 16.0` and use math.Sqrt to compute its square root. Print the result using fmt.Println.",
        starterCode: `package main

import "fmt"

func main() {
	number := 16.0
	// Import math and compute the square root, then print it
}`,
        solution: `package main

import (
	"fmt"
	"math"
)

func main() {
	number := 16.0
	result := math.Sqrt(number)
	fmt.Println("Square root:", result)
}`,
        hints: [
          "Group multiple imports inside parentheses.",
          "math.Sqrt takes and returns a float64.",
          "You can pass multiple arguments to fmt.Println separated by commas.",
        ],
        tags: ["imports", "math package", "fmt"],
        interviewQuestions: [
          "How do you import multiple packages in Go?",
          "What does the math package provide?",
          "What happens if you import a package but never use it?",
        ],
      },
      {
        id: 5,
        title: "Import and Use strings.ToUpper",
        difficulty: "Beginner",
        description:
          "Import the `strings` package alongside `fmt`. Declare a string variable `name := \"gopher\"` and print it converted to uppercase using strings.ToUpper.",
        starterCode: `package main

import "fmt"

func main() {
	name := "gopher"
	// Import strings package and print the uppercase version
}`,
        solution: `package main

import (
	"fmt"
	"strings"
)

func main() {
	name := "gopher"
	fmt.Println(strings.ToUpper(name))
}`,
        hints: [
          'Add "strings" to your import block.',
          "strings.ToUpper converts a string to uppercase.",
          "Standard library functions are called using package.Function, e.g. strings.ToUpper.",
        ],
        tags: ["imports", "strings package", "fmt"],
        interviewQuestions: [
          "What is the standard library in Go?",
          "How does Go know which functions belong to which package?",
          "What happens if you forget to import a package you're using?",
        ],
      },
      {
        id: 6,
        title: "var Block Declarations",
        difficulty: "Beginner",
        description:
          'Declare three variables using a single var block: city (string) = "Ludhiana", population (int) = 1600000, isCapital (bool) = false. Print all three values on one line using fmt.Println.',
        starterCode: `package main

import "fmt"

func main() {
	// Declare city, population, and isCapital using a var block
}`,
        solution: `package main

import "fmt"

func main() {
	var (
		city       = "Ludhiana"
		population = 1600000
		isCapital  = false
	)
	fmt.Println(city, population, isCapital)
}`,
        hints: [
          "A var block groups multiple declarations inside parentheses.",
          "You don't need to repeat 'var' for each variable inside the block.",
          "Go infers the type from the assigned value when you omit it.",
        ],
        tags: ["var", "variables", "declarations"],
        interviewQuestions: [
          "What is the difference between a var block and multiple := statements?",
          "Can you use := at the package level in Go?",
          "When would you prefer var over := ?",
        ],
      },
      {
        id: 7,
        title: "var with Explicit Types",
        difficulty: "Beginner",
        description:
          "Declare a variable `score` of type int and a variable `average` of type float64 using var with explicit type annotations (no initial value). Assign score = 85 and average = 92.5 afterward, then print both.",
        starterCode: `package main

import "fmt"

func main() {
	// Declare score (int) and average (float64) with var, then assign values
}`,
        solution: `package main

import "fmt"

func main() {
	var score int
	var average float64

	score = 85
	average = 92.5

	fmt.Println("Score:", score, "Average:", average)
}`,
        hints: [
          "Syntax: var name type",
          "You can assign a value to a declared variable later using =.",
          "This is useful when you want to declare first and assign later.",
        ],
        tags: ["var", "explicit types", "variables"],
        interviewQuestions: [
          "Why would you declare a variable without an initial value?",
          "What value does score hold before it's assigned 85?",
          "Can := be used to declare a variable without assigning a value?",
        ],
      },
      {
        id: 8,
        title: "Constants: Days in a Week",
        difficulty: "Beginner",
        description:
          "Declare a constant DaysInWeek = 7 at the package level. Write a function `weeksToDays(weeks int) int` that multiplies weeks by DaysInWeek. Call it with 3 and print the result.",
        starterCode: `package main

import "fmt"

const DaysInWeek = 7

func weeksToDays(weeks int) int {
	// Multiply weeks by DaysInWeek
}

func main() {
	fmt.Println(weeksToDays(3))
}`,
        solution: `package main

import "fmt"

const DaysInWeek = 7

func weeksToDays(weeks int) int {
	return weeks * DaysInWeek
}

func main() {
	fmt.Println(weeksToDays(3))
}`,
        hints: [
          "Constants can be declared at the package level, outside any function.",
          "Constants cannot be reassigned once declared.",
          "A function can reference constants declared elsewhere in the package.",
        ],
        tags: ["const", "functions", "package-level declarations"],
        interviewQuestions: [
          "Can constants be declared inside a function in Go?",
          "What types can Go constants have?",
          "What's the difference between const and var?",
        ],
      },
      {
        id: 9,
        title: "Zero Values Explorer",
        difficulty: "Beginner",
        description:
          "Declare four variables without initializing them: an int, a float64, a string, and a bool. Print each one using fmt.Println to see their zero values.",
        starterCode: `package main

import "fmt"

func main() {
	var count int
	var price float64
	var label string
	var active bool
	// Print all four zero values
}`,
        solution: `package main

import "fmt"

func main() {
	var count int
	var price float64
	var label string
	var active bool
	fmt.Println(count, price, label, active)
}`,
        hints: [
          "Go automatically initializes variables to their type's zero value.",
          "The zero value for numeric types is 0.",
          "The zero value for string is an empty string, and for bool it's false.",
        ],
        tags: ["zero values", "var", "primitive types"],
        interviewQuestions: [
          "What is a 'zero value' in Go and why does the language guarantee it?",
          "What is the zero value for a pointer type?",
          "How does Go's zero value behavior differ from languages like C?",
        ],
      },
      {
        id: 10,
        title: "Zero Value Checks",
        difficulty: "Beginner",
        description:
          'Write a function `isEmpty(s string) bool` that returns true if the string equals its zero value (empty string ""). Test it with an uninitialized string variable and print the result.',
        starterCode: `package main

import "fmt"

func isEmpty(s string) bool {
	// Return true if s is the zero value for string
}

func main() {
	var name string
	fmt.Println(isEmpty(name))
}`,
        solution: `package main

import "fmt"

func isEmpty(s string) bool {
	return s == ""
}

func main() {
	var name string
	fmt.Println(isEmpty(name))
}`,
        hints: [
          'You can compare a string directly to "" to check if it\'s empty.',
          'An uninitialized string variable automatically holds "".',
          "This pattern is common for detecting 'unset' values before other logic runs.",
        ],
        tags: ["zero values", "bool", "functions"],
        interviewQuestions: [
          "Why is it useful to know a type's zero value when writing conditionals?",
          "How would you check if an int variable was never explicitly set?",
          "Is nil a zero value in Go, and for which types?",
        ],
      },
      {
        id: 11,
        title: "Primitive Types Playground",
        difficulty: "Beginner",
        description:
          "Declare one variable of each primitive type: age int, height float64, name string, isStudent bool. Assign sample values, then print each variable together with its type using fmt.Printf and the %T verb.",
        starterCode: `package main

import "fmt"

func main() {
	age := 21
	height := 1.75
	name := "Aarav"
	isStudent := true
	// Print each variable with its type using %T
}`,
        solution: `package main

import "fmt"

func main() {
	age := 21
	height := 1.75
	name := "Aarav"
	isStudent := true

	fmt.Printf("age = %d, type = %T\\n", age, age)
	fmt.Printf("height = %.2f, type = %T\\n", height, height)
	fmt.Printf("name = %s, type = %T\\n", name, name)
	fmt.Printf("isStudent = %t, type = %T\\n", isStudent, isStudent)
}`,
        hints: [
          "%T prints the Go type of a value.",
          "%d is for integers, %f or %.2f for floats, %s for strings, %t for booleans.",
          "fmt.Printf does not add a newline automatically, so include \\n.",
        ],
        tags: ["primitive types", "fmt.Printf", "format verbs"],
        interviewQuestions: [
          "What are Go's basic primitive types?",
          "What does the %T verb do in fmt.Printf?",
          "Is Go statically or dynamically typed, and how does that relate to %T?",
        ],
      },
      {
        id: 12,
        title: "Boolean Comparisons",
        difficulty: "Beginner",
        description:
          "Declare two integers a := 10 and b := 20. Create three bool variables that store the results of a < b, a == b, and a > b. Print all three.",
        starterCode: `package main

import "fmt"

func main() {
	a := 10
	b := 20
	// Create bool variables for the three comparisons and print them
}`,
        solution: `package main

import "fmt"

func main() {
	a := 10
	b := 20

	isLess := a < b
	isEqual := a == b
	isGreater := a > b

	fmt.Println(isLess, isEqual, isGreater)
}`,
        hints: [
          "Comparison operators (<, ==, >) always produce a bool result.",
          "You can store the result of a comparison directly in a variable.",
          "Go's bool type only has two possible values: true and false.",
        ],
        tags: ["bool", "operators", "primitive types"],
        interviewQuestions: [
          "What operators in Go return a bool value?",
          "Can you use == to compare values of different types in Go?",
          "How does Go's bool type differ from truthy/falsy values in languages like Python or JavaScript?",
        ],
      },
      {
        id: 13,
        title: "String Concatenation",
        difficulty: "Beginner",
        description:
          'Declare two string variables firstName := "Go" and lastName := "pher". Concatenate them with a space in between and print the full name. Also print the total length of the combined string using len().',
        starterCode: `package main

import "fmt"

func main() {
	firstName := "Go"
	lastName := "pher"
	// Concatenate with a space and print the result and its length
}`,
        solution: `package main

import "fmt"

func main() {
	firstName := "Go"
	lastName := "pher"

	fullName := firstName + " " + lastName
	fmt.Println(fullName)
	fmt.Println("Length:", len(fullName))
}`,
        hints: [
          "Strings in Go can be joined using the + operator.",
          "len() returns the number of bytes in a string.",
          'Remember to include a literal space " " between the two names.',
        ],
        tags: ["strings", "primitive types", "len"],
        interviewQuestions: [
          "What does len() return for a string containing multi-byte UTF-8 characters?",
          "Is string concatenation with + efficient in Go for large numbers of strings?",
          "What package would you use for more advanced string building?",
        ],
      },
      {
        id: 14,
        title: "fmt.Printf Format Verbs",
        difficulty: "Beginner",
        description:
          'Given item := "Notebook", price := 49.99, and quantity := 3, use fmt.Printf to print a single formatted line like "Notebook x3 = $149.97" using %s, %d, and %.2f verbs appropriately.',
        starterCode: `package main

import "fmt"

func main() {
	item := "Notebook"
	price := 49.99
	quantity := 3
	// Print a formatted line using fmt.Printf
}`,
        solution: `package main

import "fmt"

func main() {
	item := "Notebook"
	price := 49.99
	quantity := 3

	total := price * float64(quantity)
	fmt.Printf("%s x%d = $%.2f\\n", item, quantity, total)
}`,
        hints: [
          "Multiply price by quantity, converting quantity to float64 first.",
          "%s formats a string, %d formats an integer, %.2f formats a float with 2 decimals.",
          "The order of verbs in the format string must match the order of arguments.",
        ],
        tags: ["fmt.Printf", "format verbs", "type conversion"],
        interviewQuestions: [
          "What happens if the number of format verbs doesn't match the number of arguments in Printf?",
          "What's the difference between %v and %s in fmt.Printf?",
          "Why is float64(quantity) necessary before multiplying with price?",
        ],
      },
      {
        id: 15,
        title: "Building Strings with fmt.Sprintf",
        difficulty: "Beginner",
        description:
          'Write a function `formatGreeting(name string, age int) string` that uses fmt.Sprintf to build and return the string "Hello NAME, you are AGE years old." without printing it directly. Call it in main and print the returned value.',
        starterCode: `package main

import "fmt"

func formatGreeting(name string, age int) string {
	// Build and return the greeting using fmt.Sprintf
}

func main() {
	message := formatGreeting("Priya", 25)
	fmt.Println(message)
}`,
        solution: `package main

import "fmt"

func formatGreeting(name string, age int) string {
	return fmt.Sprintf("Hello %s, you are %d years old.", name, age)
}

func main() {
	message := formatGreeting("Priya", 25)
	fmt.Println(message)
}`,
        hints: [
          "fmt.Sprintf works like fmt.Printf but returns a string instead of printing it.",
          "This is useful when you need to build a string for later use, such as returning it from a function.",
          "Use %s for the name and %d for the age.",
        ],
        tags: ["fmt.Sprintf", "functions", "strings"],
        interviewQuestions: [
          "When would you use fmt.Sprintf instead of fmt.Printf?",
          "Does fmt.Sprintf print anything to the console by itself?",
          "How is fmt.Sprintf useful when building error messages?",
        ],
      },
      {
        id: 16,
        title: "Println vs Print vs Printf",
        difficulty: "Beginner",
        description:
          'Use all three: fmt.Println, fmt.Print, and fmt.Printf to print the string "Go" and the number 2009 (the year Go was released) in three different ways, and observe how spacing and newlines differ.',
        starterCode: `package main

import "fmt"

func main() {
	language := "Go"
	year := 2009
	// Print using fmt.Println, fmt.Print, and fmt.Printf
}`,
        solution: `package main

import "fmt"

func main() {
	language := "Go"
	year := 2009

	fmt.Println(language, "was released in", year)
	fmt.Print(language, " was released in ", year, "\\n")
	fmt.Printf("%s was released in %d\\n", language, year)
}`,
        hints: [
          "fmt.Println adds spaces between arguments and a newline at the end automatically.",
          "fmt.Print adds spaces only between operands when neither is a string, so you often need to add spaces manually.",
          "fmt.Printf gives full control using format verbs but adds no automatic spacing or newline.",
        ],
        tags: ["fmt.Println", "fmt.Print", "fmt.Printf"],
        interviewQuestions: [
          "What's the key difference between fmt.Print and fmt.Println?",
          "Why might fmt.Print produce unexpected spacing in your output?",
          "Which fmt function would you choose for precise, aligned output and why?",
        ],
      },
      {
        id: 17,
        title: "Explicit Type Conversion: int to float64",
        difficulty: "Beginner",
        description:
          "Declare total := 7 and count := 2 as integers. Compute the average as a float64 by converting both to float64 before dividing, and print the result.",
        starterCode: `package main

import "fmt"

func main() {
	total := 7
	count := 2
	// Convert to float64 and compute the average
}`,
        solution: `package main

import "fmt"

func main() {
	total := 7
	count := 2

	average := float64(total) / float64(count)
	fmt.Printf("Average: %.2f\\n", average)
}`,
        hints: [
          "Dividing two ints in Go performs integer division and truncates the result.",
          "Convert both operands to float64 before dividing to get a decimal result.",
          "float64(x) is Go's syntax for explicit type conversion.",
        ],
        tags: ["type conversion", "int", "float64"],
        interviewQuestions: [
          "What is the result of 7 / 2 in Go if both are ints?",
          "Why doesn't Go automatically convert int to float64 in expressions?",
          "What happens if you only convert one operand to float64 in a division?",
        ],
      },
      {
        id: 18,
        title: "Type Conversion Truncation",
        difficulty: "Beginner",
        description:
          "Declare price := 19.99 as a float64. Convert it to an int and print both the original and converted values. Notice that Go truncates (does not round) when converting float64 to int.",
        starterCode: `package main

import "fmt"

func main() {
	price := 19.99
	// Convert price to int and print both values
}`,
        solution: `package main

import "fmt"

func main() {
	price := 19.99
	roundedDown := int(price)
	fmt.Println("Original:", price)
	fmt.Println("Converted:", roundedDown)
}`,
        hints: [
          "int(price) truncates the decimal part instead of rounding.",
          "19.99 becomes 19, not 20, after conversion.",
          "Use the math.Round function if you need proper rounding instead of truncation.",
        ],
        tags: ["type conversion", "float64", "int"],
        interviewQuestions: [
          "Does converting a float64 to an int in Go round or truncate?",
          "How would you round a float to the nearest int instead of truncating?",
          "What happens when you convert a negative float like -19.99 to an int?",
        ],
      },
      {
        id: 19,
        title: "Converting Between Numeric Types",
        difficulty: "Beginner",
        description:
          "Declare var wholeNumber int32 = 100. Convert it to int64 and to float64, printing each converted value along with its type using %T.",
        starterCode: `package main

import "fmt"

func main() {
	var wholeNumber int32 = 100
	// Convert to int64 and float64, printing each with its type
}`,
        solution: `package main

import "fmt"

func main() {
	var wholeNumber int32 = 100

	asInt64 := int64(wholeNumber)
	asFloat64 := float64(wholeNumber)

	fmt.Printf("%v (%T)\\n", asInt64, asInt64)
	fmt.Printf("%v (%T)\\n", asFloat64, asFloat64)
}`,
        hints: [
          "Go has multiple sized integer types like int32 and int64, and they must be explicitly converted between each other.",
          "%v prints the default representation of a value.",
          "Conversions between numeric types never happen implicitly in Go, even between int32 and int64.",
        ],
        tags: ["type conversion", "numeric types", "fmt.Printf"],
        interviewQuestions: [
          "Why does Go have multiple integer sizes like int8, int32, and int64?",
          "Can you assign an int32 value directly to an int64 variable without conversion?",
          "What's the default int size on most modern systems?",
        ],
      },
      {
        id: 20,
        title: "Named Return Values: Rectangle Area & Perimeter",
        difficulty: "Beginner",
        description:
          "Write a function `rectangleStats(length, width float64) (area float64, perimeter float64)` using named return values. Calculate area and perimeter inside the function body and use a naked return statement. Call it with (5.0, 3.0) and print both results.",
        starterCode: `package main

import "fmt"

func rectangleStats(length, width float64) (area float64, perimeter float64) {
	// Assign to the named return values and use a naked return
}

func main() {
	a, p := rectangleStats(5.0, 3.0)
	fmt.Println("Area:", a, "Perimeter:", p)
}`,
        solution: `package main

import "fmt"

func rectangleStats(length, width float64) (area float64, perimeter float64) {
	area = length * width
	perimeter = 2 * (length + width)
	return
}

func main() {
	a, p := rectangleStats(5.0, 3.0)
	fmt.Println("Area:", a, "Perimeter:", p)
}`,
        hints: [
          "Named return values are declared in the function signature and act like pre-declared variables.",
          "A 'naked return' (just 'return' with no values) returns whatever the named variables currently hold.",
          "Named returns can make code more readable but should be used sparingly in long functions.",
        ],
        tags: ["named return values", "functions", "multiple returns"],
        interviewQuestions: [
          "What is a naked return in Go, and when is it considered bad practice?",
          "How do named return values differ from regular return values?",
          "Can you mix named and unnamed return values in the same function signature?",
        ],
      },
      {
        id: 21,
        title: "Named Returns for Min and Max",
        difficulty: "Beginner",
        description:
          "Write a function `minMax(a, b int) (min int, max int)` using named return values that determines which of a and b is smaller and which is larger. Call it with (12, 7) and print both named values.",
        starterCode: `package main

import "fmt"

func minMax(a, b int) (min int, max int) {
	// Assign min and max based on a and b, then return
}

func main() {
	smaller, larger := minMax(12, 7)
	fmt.Println("Min:", smaller, "Max:", larger)
}`,
        solution: `package main

import "fmt"

func minMax(a, b int) (min int, max int) {
	if a < b {
		min = a
		max = b
	} else {
		min = b
		max = a
	}
	return
}

func main() {
	smaller, larger := minMax(12, 7)
	fmt.Println("Min:", smaller, "Max:", larger)
}`,
        hints: [
          "Named return values min and max start at their zero value (0) until you assign them.",
          "Use an if/else to decide which argument is smaller.",
          "A naked return sends back whatever min and max currently hold.",
        ],
        tags: ["named return values", "multiple returns", "functions"],
        interviewQuestions: [
          "Why might using min and max as variable names be discouraged in some Go style guides?",
          "How would you write minMax without named return values?",
          "What is the zero value of the named return min before any assignment happens?",
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
          'Write a function `wordCount(s string) map[string]int` that takes a string of space-separated words and returns a map of each word to its frequency. In main, call it with "go is fast go is compiled" and print the map.',
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
	fmt.Printf("%s passed: %v\\n", s1.Name, s1.Pass())
	fmt.Printf("%s passed: %v\\n", s2.Name, s2.Pass())
}`,
        hints: [
          "Methods use a receiver: func (s Student) MethodName() ReturnType {}",
          'Use struct literals: Student{Name: "Alice", Grade: 75}',
          "Value receivers get a copy; pointer receivers get the original.",
        ],
        tags: ["structs", "methods", "types"],
        interviewQuestions: [
          "What is the difference between value receivers and pointer receivers?",
          "How does Go achieve object-oriented behaviour without classes?",
          "When should you use a pointer receiver?",
        ],
      },
      {
        id: 4,
        title: "While-Style Loop: Sum Until Limit",
        difficulty: "Beginner",
        description:
          "Go has no while keyword — a for loop with just a condition acts like one. Write a program that starts sum := 0 and n := 1, and keeps adding n to sum, incrementing n each time, while sum < 50. Print the final sum and the last n used.",
        starterCode: `package main
 
import "fmt"
 
func main() {
	sum := 0
	n := 1
	// Use a for loop with only a condition to add numbers until sum >= 50
}`,
        solution: `package main
 
import "fmt"
 
func main() {
	sum := 0
	n := 1
	for sum < 50 {
		sum += n
		n++
	}
	fmt.Println("Sum:", sum, "Last n:", n-1)
}`,
        hints: [
          "A for loop with just a condition — for condition { } — behaves like a while loop.",
          "Remember to update both sum and n inside the loop body.",
          "The loop stops as soon as the condition becomes false.",
        ],
        tags: ["for loop", "while-style loop"],
        interviewQuestions: [
          "How do you simulate a while loop in Go?",
          "What are the three optional parts of a Go for statement?",
          "What happens if you forget to update the loop variable inside a while-style for loop?",
        ],
      },
      {
        id: 5,
        title: "Break Out of a Counting Loop",
        difficulty: "Beginner",
        description:
          "Write an infinite loop using for { } that increments a counter starting at 0. Use break to exit the loop once the counter reaches 5, then print the final counter value.",
        starterCode: `package main
 
import "fmt"
 
func main() {
	counter := 0
	// Write an infinite for loop that breaks when counter reaches 5
}`,
        solution: `package main
 
import "fmt"
 
func main() {
	counter := 0
	for {
		counter++
		if counter == 5 {
			break
		}
	}
	fmt.Println("Final counter:", counter)
}`,
        hints: [
          "for { } with no condition creates an infinite loop.",
          "break immediately exits the nearest enclosing loop.",
          "Always make sure an infinite loop has a break condition, or it will run forever.",
        ],
        tags: ["for loop", "break", "infinite loop"],
        interviewQuestions: [
          "How do you write an infinite loop in Go?",
          "What's the difference between break and continue?",
          "What happens if an infinite loop has no break statement?",
        ],
      },
      {
        id: 6,
        title: "Skip Even Numbers with Continue",
        difficulty: "Beginner",
        description:
          "Loop from 1 to 10. Use continue to skip even numbers, printing only the odd ones.",
        starterCode: `package main
 
import "fmt"
 
func main() {
	for i := 1; i <= 10; i++ {
		// Skip even numbers using continue, print odd ones
	}
}`,
        solution: `package main
 
import "fmt"
 
func main() {
	for i := 1; i <= 10; i++ {
		if i%2 == 0 {
			continue
		}
		fmt.Println(i)
	}
}`,
        hints: [
          "continue skips the rest of the current loop iteration and moves to the next one.",
          "i%2 == 0 checks if a number is even.",
          "continue is useful for filtering out values without deeply nesting if statements.",
        ],
        tags: ["for loop", "continue", "modulo"],
        interviewQuestions: [
          "What does continue do differently from break?",
          "Can continue be used with labeled loops in Go?",
          "Why might using continue improve readability compared to nested if/else?",
        ],
      },
      {
        id: 7,
        title: "If with Init Statement: Even or Odd",
        difficulty: "Beginner",
        description:
          'Write a function `describe(n int) string` that uses an if statement with an initialization statement — if remainder := n % 2; remainder == 0 { ... } else { ... } — to return "even" or "odd". Call it with 7 and print the result.',
        starterCode: `package main
 
import "fmt"
 
func describe(n int) string {
	// Use if with an init statement to check n % 2
}
 
func main() {
	fmt.Println(describe(7))
}`,
        solution: `package main
 
import "fmt"
 
func describe(n int) string {
	if remainder := n % 2; remainder == 0 {
		return "even"
	} else {
		return "odd"
	}
}
 
func main() {
	fmt.Println(describe(7))
}`,
        hints: [
          "Go lets you run a short statement before the condition, separated by a semicolon: if init; condition { }.",
          "The variable declared in the init statement (remainder) is scoped only to the if/else block.",
          "This pattern is very common for error handling: if err := doSomething(); err != nil { }.",
        ],
        tags: ["if/else", "init statement", "scope"],
        interviewQuestions: [
          "What is the scope of a variable declared in an if init statement?",
          "Why is the if-with-init pattern common in Go error handling?",
          "Can you access the init statement's variable in the else block?",
        ],
      },
      {
        id: 8,
        title: "Grade Classifier with Nested If/Else",
        difficulty: "Beginner",
        description:
          'Write a function `letterGrade(score int) string` that returns "F" immediately using an if statement with an init statement — if passed := score >= 40; !passed { return "F" } — then uses further if/else to return "A" (90+), "B" (75-89), or "C" (40-74) for passing scores. Call it with 82 and print the result.',
        starterCode: `package main
 
import "fmt"
 
func letterGrade(score int) string {
	// Use if with init statement to check pass/fail first, then classify further
}
 
func main() {
	fmt.Println(letterGrade(82))
}`,
        solution: `package main
 
import "fmt"
 
func letterGrade(score int) string {
	if passed := score >= 40; !passed {
		return "F"
	}
 
	if score >= 90 {
		return "A"
	} else if score >= 75 {
		return "B"
	}
	return "C"
}
 
func main() {
	fmt.Println(letterGrade(82))
}`,
        hints: [
          "The init statement runs once, right before the condition is checked.",
          "passed is only visible inside that if/else block, keeping your function's namespace clean.",
          "You can chain as many if/else if branches as you need after the initial check.",
        ],
        tags: ["if/else", "init statement", "functions"],
        interviewQuestions: [
          "Why might a Go developer prefer an if-with-init over declaring the variable on its own line first?",
          "What's a common bug when using if-with-init and forgetting the scope rules?",
          "How would you rewrite this function using a switch statement instead?",
        ],
      },
      {
        id: 9,
        title: "Day Name with Switch",
        difficulty: "Beginner",
        description:
          'Write a function `dayName(day int) string` that uses a switch statement on day (1-7) to return the name of the weekday (1 = "Monday" ... 7 = "Sunday"). Return "Invalid day" for anything else using default. Call it with 3.',
        starterCode: `package main
 
import "fmt"
 
func dayName(day int) string {
	// Use switch to return the day name
}
 
func main() {
	fmt.Println(dayName(3))
}`,
        solution: `package main
 
import "fmt"
 
func dayName(day int) string {
	switch day {
	case 1:
		return "Monday"
	case 2:
		return "Tuesday"
	case 3:
		return "Wednesday"
	case 4:
		return "Thursday"
	case 5:
		return "Friday"
	case 6:
		return "Saturday"
	case 7:
		return "Sunday"
	default:
		return "Invalid day"
	}
}
 
func main() {
	fmt.Println(dayName(3))
}`,
        hints: [
          "Go's switch automatically breaks after each case — no fallthrough by default.",
          "default handles any value not matched by a case.",
          "You can return directly from inside a case, no need for an explicit break.",
        ],
        tags: ["switch", "functions"],
        interviewQuestions: [
          "Does Go's switch fall through to the next case by default like C or Java?",
          "How do you force fallthrough behavior in Go if you need it?",
          "What happens if no case matches and there's no default?",
        ],
      },
      {
        id: 10,
        title: "Weekend Checker with Multi-Value Case",
        difficulty: "Beginner",
        description:
          'Write a function `isWeekend(day string) bool` that uses a switch statement with a single case listing multiple comma-separated values — case "Saturday", "Sunday": — to return true for weekends and false otherwise. Call it with "Saturday" and "Tuesday" and print both results.',
        starterCode: `package main
 
import "fmt"
 
func isWeekend(day string) bool {
	// Use a switch with a multi-value case for Saturday and Sunday
}
 
func main() {
	fmt.Println(isWeekend("Saturday"))
	fmt.Println(isWeekend("Tuesday"))
}`,
        solution: `package main
 
import "fmt"
 
func isWeekend(day string) bool {
	switch day {
	case "Saturday", "Sunday":
		return true
	default:
		return false
	}
}
 
func main() {
	fmt.Println(isWeekend("Saturday"))
	fmt.Println(isWeekend("Tuesday"))
}`,
        hints: [
          "A single case can match multiple values separated by commas.",
          'This avoids writing separate case "Saturday": and case "Sunday": blocks.',
          "Go switches can operate on strings, not just integers.",
        ],
        tags: ["switch", "multi-value case", "bool"],
        interviewQuestions: [
          "Can a Go switch statement operate on types other than integers?",
          "How does a multi-value case differ from writing separate cases with fallthrough?",
          "Is switch generally preferred over a long if/else chain in Go? Why?",
        ],
      },
      {
        id: 11,
        title: "Grade Classifier with Switch True",
        difficulty: "Beginner",
        description:
          'Rewrite a grade classifier using switch with no expression (switch true style), where each case is a boolean condition like case score >= 90:. Classify scores into "A", "B", "C", or "F" for a score of 68.',
        starterCode: `package main
 
import "fmt"
 
func letterGrade(score int) string {
	// Use switch with boolean case conditions instead of if/else
}
 
func main() {
	fmt.Println(letterGrade(68))
}`,
        solution: `package main
 
import "fmt"
 
func letterGrade(score int) string {
	switch {
	case score >= 90:
		return "A"
	case score >= 75:
		return "B"
	case score >= 40:
		return "C"
	default:
		return "F"
	}
}
 
func main() {
	fmt.Println(letterGrade(68))
}`,
        hints: [
          "Writing switch with no expression after it is equivalent to switch true.",
          "Each case can be any boolean expression, evaluated top to bottom.",
          "The first matching case wins — order your conditions from most to least specific.",
        ],
        tags: ["switch", "switch true", "functions"],
        interviewQuestions: [
          "What is the 'switch true' idiom in Go used for?",
          "How does a switch-true statement compare to an if/else-if chain in readability?",
          "In what order does Go evaluate the cases in a switch-true statement?",
        ],
      },
      {
        id: 12,
        title: "Array Basics: Sum a Fixed-Size Array",
        difficulty: "Beginner",
        description:
          "Declare a fixed-size array scores := [5]int{85, 90, 78, 92, 88}. Write a function `sumArray(arr [5]int) int` that returns the sum of all elements. Call it and print the total.",
        starterCode: `package main
 
import "fmt"
 
func sumArray(arr [5]int) int {
	// Sum all elements of the array
}
 
func main() {
	scores := [5]int{85, 90, 78, 92, 88}
	fmt.Println(sumArray(scores))
}`,
        solution: `package main
 
import "fmt"
 
func sumArray(arr [5]int) int {
	total := 0
	for i := 0; i < len(arr); i++ {
		total += arr[i]
	}
	return total
}
 
func main() {
	scores := [5]int{85, 90, 78, 92, 88}
	fmt.Println(sumArray(scores))
}`,
        hints: [
          "Go arrays have a fixed size that's part of their type, e.g. [5]int.",
          "len(arr) returns the number of elements in the array.",
          "Arrays are passed by value in Go — the function receives a copy.",
        ],
        tags: ["arrays", "for loop", "len"],
        interviewQuestions: [
          "What is the key difference between an array and a slice in Go?",
          "Are arrays passed by value or by reference when passed to a function?",
          "Why are slices used far more often than arrays in idiomatic Go?",
        ],
      },
      {
        id: 13,
        title: "Slice Basics: Append a Growing List",
        difficulty: "Beginner",
        description:
          'Start with an empty slice var names []string. Use append to add "Asha", "Rohan", and "Meera" one at a time, printing the slice after each append.',
        starterCode: `package main
 
import "fmt"
 
func main() {
	var names []string
	// Append three names one at a time, printing after each append
}`,
        solution: `package main
 
import "fmt"
 
func main() {
	var names []string
 
	names = append(names, "Asha")
	fmt.Println(names)
 
	names = append(names, "Rohan")
	fmt.Println(names)
 
	names = append(names, "Meera")
	fmt.Println(names)
}`,
        hints: [
          "A nil slice (var names []string) can be appended to directly — no need to initialize it first.",
          "append returns a new slice header, so you must assign the result back: names = append(names, ...).",
          "Slices grow dynamically, unlike fixed-size arrays.",
        ],
        tags: ["slices", "append"],
        interviewQuestions: [
          "What happens if you call append but forget to assign the result back to the slice variable?",
          "What is the zero value of a slice, and can you use it directly?",
          "How does append decide whether to grow the underlying array?",
        ],
      },
      {
        id: 14,
        title: "Len vs Cap: Watching a Slice Grow",
        difficulty: "Beginner",
        description:
          "Create a slice nums := make([]int, 0, 2) (length 0, capacity 2). Append four integers one at a time (1, 2, 3, 4), printing len(nums) and cap(nums) after each append to observe how capacity changes.",
        starterCode: `package main
 
import "fmt"
 
func main() {
	nums := make([]int, 0, 2)
	values := []int{1, 2, 3, 4}
	// Append each value, printing len and cap after each step
}`,
        solution: `package main
 
import "fmt"
 
func main() {
	nums := make([]int, 0, 2)
	values := []int{1, 2, 3, 4}
 
	for _, v := range values {
		nums = append(nums, v)
		fmt.Printf("len=%d cap=%d slice=%v\\n", len(nums), cap(nums), nums)
	}
}`,
        hints: [
          "make([]int, 0, 2) creates a slice with length 0 and capacity 2.",
          "len() tells you how many elements are currently in the slice; cap() tells you how much room the underlying array has before it must grow.",
          "When append exceeds the current capacity, Go allocates a new, larger underlying array (often doubling it).",
        ],
        tags: ["slices", "len", "cap", "append"],
        interviewQuestions: [
          "What is the difference between a slice's length and its capacity?",
          "What typically happens to capacity when a slice grows beyond it?",
          "Why does make([]int, 0, 2) matter for performance compared to var nums []int?",
        ],
      },
      {
        id: 15,
        title: "Copying Slices Safely",
        difficulty: "Beginner",
        description:
          "Create a slice original := []int{1, 2, 3}. Create a second slice duplicate with the same length as original, and use copy() to copy original's values into it. Modify duplicate[0] and print both slices to show they're independent.",
        starterCode: `package main
 
import "fmt"
 
func main() {
	original := []int{1, 2, 3}
	// Create duplicate, copy values into it, modify duplicate[0], print both
}`,
        solution: `package main
 
import "fmt"
 
func main() {
	original := []int{1, 2, 3}
	duplicate := make([]int, len(original))
	copy(duplicate, original)
 
	duplicate[0] = 99
 
	fmt.Println("Original:", original)
	fmt.Println("Duplicate:", duplicate)
}`,
        hints: [
          "copy(dst, src) copies elements from src into dst and returns the number of elements copied.",
          "The destination slice must already have enough length to receive the copied elements — make([]int, len(original)) allocates that space.",
          "Without copy(), simply assigning duplicate := original would make both slices share the same underlying array.",
        ],
        tags: ["slices", "copy", "arrays"],
        interviewQuestions: [
          "Why doesn't duplicate := original create an independent copy of a slice?",
          "What does the copy() function return?",
          "What happens if the destination slice passed to copy() is shorter than the source?",
        ],
      },
      {
        id: 16,
        title: "Map Existence Check: The Comma-Ok Idiom",
        difficulty: "Beginner",
        description:
          'Create a map ages := map[string]int{"Asha": 30, "Rohan": 25}. Use the comma-ok idiom — value, ok := ages[key] — to check whether "Meera" and "Asha" exist in the map, printing a message for each.',
        starterCode: `package main
 
import "fmt"
 
func main() {
	ages := map[string]int{"Asha": 30, "Rohan": 25}
	// Check if "Meera" and "Asha" exist using the comma-ok idiom
}`,
        solution: `package main
 
import "fmt"
 
func main() {
	ages := map[string]int{"Asha": 30, "Rohan": 25}
 
	if age, ok := ages["Meera"]; ok {
		fmt.Println("Meera's age:", age)
	} else {
		fmt.Println("Meera not found")
	}
 
	if age, ok := ages["Asha"]; ok {
		fmt.Println("Asha's age:", age)
	} else {
		fmt.Println("Asha not found")
	}
}`,
        hints: [
          "Accessing a map with value, ok := m[key] gives you a second bool telling you if the key actually exists.",
          "Without the comma-ok check, a missing key just silently returns the zero value, which can hide bugs.",
          "This pattern combines nicely with if-with-init statements.",
        ],
        tags: ["maps", "comma-ok idiom", "if/else"],
        interviewQuestions: [
          "Why is the comma-ok idiom important when a map's zero value could be a valid value (like 0)?",
          "What does ok equal when the key exists but its value is the zero value?",
          "How would you write this check without the comma-ok idiom, and why is that worse?",
        ],
      },
      {
        id: 17,
        title: "Deleting from a Map",
        difficulty: "Beginner",
        description:
          'Create a map of inventory stock := map[string]int{"apples": 10, "bananas": 5, "cherries": 20}. Use delete() to remove "bananas" from the map, then print the map before and after deletion.',
        starterCode: `package main
 
import "fmt"
 
func main() {
	stock := map[string]int{"apples": 10, "bananas": 5, "cherries": 20}
	// Print the map, delete "bananas", then print it again
}`,
        solution: `package main
 
import "fmt"
 
func main() {
	stock := map[string]int{"apples": 10, "bananas": 5, "cherries": 20}
	fmt.Println("Before:", stock)
 
	delete(stock, "bananas")
 
	fmt.Println("After:", stock)
}`,
        hints: [
          "delete(map, key) removes a key-value pair from a map in place.",
          "Deleting a key that doesn't exist is safe in Go and does nothing — no error is raised.",
          "Maps are reference types, so delete() modifies the original map directly.",
        ],
        tags: ["maps", "delete"],
        interviewQuestions: [
          "What happens if you call delete() on a key that doesn't exist in the map?",
          "Are maps passed by value or by reference in Go?",
          "How would you remove all entries from a map at once?",
        ],
      },
      {
        id: 18,
        title: "Struct Literals: Point Distance",
        difficulty: "Beginner",
        description:
          "Define a Point struct with X float64 and Y float64. Write a function `distance(p1, p2 Point) float64` that calculates the Euclidean distance between two points using math.Sqrt. Create two points using struct literals and print the distance between them.",
        starterCode: `package main
 
import (
	"fmt"
	"math"
)
 
type Point struct {
	// Define fields
}
 
func distance(p1, p2 Point) float64 {
	// Calculate Euclidean distance
}
 
func main() {
	a := Point{X: 0, Y: 0}
	b := Point{X: 3, Y: 4}
	fmt.Println(distance(a, b))
}`,
        solution: `package main
 
import (
	"fmt"
	"math"
)
 
type Point struct {
	X float64
	Y float64
}
 
func distance(p1, p2 Point) float64 {
	dx := p2.X - p1.X
	dy := p2.Y - p1.Y
	return math.Sqrt(dx*dx + dy*dy)
}
 
func main() {
	a := Point{X: 0, Y: 0}
	b := Point{X: 3, Y: 4}
	fmt.Println(distance(a, b))
}`,
        hints: [
          "Struct literals let you create a struct and set its fields in one expression: Point{X: 0, Y: 0}.",
          "The Euclidean distance formula is sqrt((x2-x1)^2 + (y2-y1)^2).",
          "Structs are passed by value by default, just like arrays.",
        ],
        tags: ["structs", "struct literals", "math"],
        interviewQuestions: [
          "What's the difference between a keyed struct literal (Point{X: 0, Y: 0}) and a positional one (Point{0, 0})?",
          "Are structs passed by value or by reference by default?",
          "Why might you use a pointer receiver instead of a value receiver for large structs?",
        ],
      },
      {
        id: 19,
        title: "Pointers to Structs: Update via Pointer Receiver",
        difficulty: "Beginner",
        description:
          "Define a Counter struct with a field Count int. Write a method Increment() with a pointer receiver (c *Counter) that increases Count by 1. Call Increment three times on a Counter instance and print the final count.",
        starterCode: `package main
 
import "fmt"
 
type Counter struct {
	Count int
}
 
// Add an Increment method with a pointer receiver
 
func main() {
	c := Counter{}
	// Call Increment three times, then print c.Count
}`,
        solution: `package main
 
import "fmt"
 
type Counter struct {
	Count int
}
 
func (c *Counter) Increment() {
	c.Count++
}
 
func main() {
	c := Counter{}
	c.Increment()
	c.Increment()
	c.Increment()
	fmt.Println("Count:", c.Count)
}`,
        hints: [
          "A pointer receiver, func (c *Counter) Increment(), lets the method modify the original struct instead of a copy.",
          "Go automatically takes the address of c when you call c.Increment() — you don't need to write (&c).Increment().",
          "If Increment used a value receiver instead, Count would never actually change.",
        ],
        tags: ["pointers", "structs", "methods"],
        interviewQuestions: [
          "Why would Increment() fail to update Count if it used a value receiver instead of a pointer receiver?",
          "Does Go require you to manually dereference a pointer receiver inside the method body?",
          "When is it idiomatic to use a pointer receiver versus a value receiver?",
        ],
      },
      {
        id: 20,
        title: "Pointers to Structs: Swap Two Points",
        difficulty: "Beginner",
        description:
          "Define a Point struct with X, Y int. Write a function `swap(p1, p2 *Point)` that swaps the X and Y values between the two points using pointers. Create two points, swap them, and print both afterward.",
        starterCode: `package main
 
import "fmt"
 
type Point struct {
	X, Y int
}
 
func swap(p1, p2 *Point) {
	// Swap the X and Y values between p1 and p2 using pointers
}
 
func main() {
	a := Point{X: 1, Y: 2}
	b := Point{X: 3, Y: 4}
	swap(&a, &b)
	fmt.Println(a, b)
}`,
        solution: `package main
 
import "fmt"
 
type Point struct {
	X, Y int
}
 
func swap(p1, p2 *Point) {
	p1.X, p2.X = p2.X, p1.X
	p1.Y, p2.Y = p2.Y, p1.Y
}
 
func main() {
	a := Point{X: 1, Y: 2}
	b := Point{X: 3, Y: 4}
	swap(&a, &b)
	fmt.Println(a, b)
}`,
        hints: [
          "&a and &b pass the addresses of a and b, so swap can modify the originals directly.",
          "Go lets you swap values in a single line using multiple assignment: p1.X, p2.X = p2.X, p1.X.",
          "Without pointers, swap would only modify local copies and have no effect on a and b in main.",
        ],
        tags: ["pointers", "structs", "functions"],
        interviewQuestions: [
          "Why does swap need pointer parameters (*Point) instead of value parameters (Point) to work?",
          "What operator do you use to get the address of a variable in Go?",
          "What operator would you use inside swap if you wanted to dereference p1 explicitly instead of using dot notation?",
        ],
      },
      {
        id: 21,
        title: "Range Over a Slice: Index and Value",
        difficulty: "Beginner",
        description:
          'Given temperatures := []float64{72.5, 68.0, 75.3, 70.1}, use a range loop to print each index and its corresponding temperature value in the format "Day 0: 72.5".',
        starterCode: `package main
 
import "fmt"
 
func main() {
	temperatures := []float64{72.5, 68.0, 75.3, 70.1}
	// Use range to print index and value for each temperature
}`,
        solution: `package main
 
import "fmt"
 
func main() {
	temperatures := []float64{72.5, 68.0, 75.3, 70.1}
 
	for i, temp := range temperatures {
		fmt.Printf("Day %d: %.1f\\n", i, temp)
	}
}`,
        hints: [
          "range over a slice gives you both the index and the value on each iteration.",
          "If you only need the value, you can discard the index with an underscore: for _, temp := range temperatures.",
          "%.1f formats a float with one decimal place.",
        ],
        tags: ["range", "slices", "for loop"],
        interviewQuestions: [
          "What two values does range give you when iterating over a slice?",
          "How do you ignore the index when ranging over a slice?",
          "Does range over a slice give you a copy of each element or a reference to it?",
        ],
      },
      {
        id: 22,
        title: "Range Over a Map: Counting Entries",
        difficulty: "Beginner",
        description:
          'Given inventory := map[string]int{"apples": 10, "bananas": 5, "cherries": 20}, use range to iterate over the map, print each key-value pair, and keep a running total of all the values. Print the total after the loop.',
        starterCode: `package main
 
import "fmt"
 
func main() {
	inventory := map[string]int{"apples": 10, "bananas": 5, "cherries": 20}
	// Use range to print each pair and sum all values
}`,
        solution: `package main
 
import "fmt"
 
func main() {
	inventory := map[string]int{"apples": 10, "bananas": 5, "cherries": 20}
 
	total := 0
	for item, quantity := range inventory {
		fmt.Println(item, ":", quantity)
		total += quantity
	}
	fmt.Println("Total:", total)
}`,
        hints: [
          "range over a map gives you the key and value on each iteration.",
          "Go deliberately randomizes map iteration order, so don't rely on a consistent order across runs.",
          "You can still accumulate totals or perform other logic even though the order isn't guaranteed.",
        ],
        tags: ["range", "maps", "for loop"],
        interviewQuestions: [
          "Why does Go randomize the order of map iteration?",
          "How would you iterate over a map's keys in a sorted, predictable order?",
          "Can you modify a map's contents while ranging over it? What are the risks?",
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
      {
        id: 4,
        title: "Variadic Sum",
        difficulty: "Beginner",
        description:
          "Write a function `sum(nums ...int) int` that accepts any number of integers and returns their total. Call it with no arguments, with (1, 2, 3), and with (10, 20, 30, 40), printing each result.",
        starterCode: `package main
 
import "fmt"
 
func sum(nums ...int) int {
	// Sum all the numbers passed in
}
 
func main() {
	fmt.Println(sum())
	fmt.Println(sum(1, 2, 3))
	fmt.Println(sum(10, 20, 30, 40))
}`,
        solution: `package main
 
import "fmt"
 
func sum(nums ...int) int {
	total := 0
	for _, n := range nums {
		total += n
	}
	return total
}
 
func main() {
	fmt.Println(sum())
	fmt.Println(sum(1, 2, 3))
	fmt.Println(sum(10, 20, 30, 40))
}`,
        hints: [
          "...int in a parameter list means the function accepts zero or more ints.",
          "Inside the function, nums behaves like a regular []int slice.",
          "Calling sum() with no arguments gives you an empty slice, not an error.",
        ],
        tags: ["variadic functions", "functions", "range"],
        interviewQuestions: [
          "What type does a variadic parameter like ...int have inside the function body?",
          "Can a function have more than one variadic parameter?",
          "Where must the variadic parameter appear in the parameter list?",
        ],
      },
      {
        id: 5,
        title: "Variadic with Fixed Parameters",
        difficulty: "Beginner",
        description:
          'Write a function `describeScores(label string, scores ...int) string` that combines a fixed label parameter with a variadic scores parameter, returning a string like "Math: [90 85 78]". Call it with ("Math", 90, 85, 78) and print the result.',
        starterCode: `package main
 
import "fmt"
 
func describeScores(label string, scores ...int) string {
	// Combine label and scores into a descriptive string
}
 
func main() {
	fmt.Println(describeScores("Math", 90, 85, 78))
}`,
        solution: `package main
 
import "fmt"
 
func describeScores(label string, scores ...int) string {
	return fmt.Sprintf("%s: %v", label, scores)
}
 
func main() {
	fmt.Println(describeScores("Math", 90, 85, 78))
}`,
        hints: [
          "A variadic parameter must be the last one in the parameter list.",
          "You can freely mix fixed parameters with a single trailing variadic one.",
          "%v prints a slice in its default Go representation, e.g. [90 85 78].",
        ],
        tags: ["variadic functions", "functions", "fmt.Sprintf"],
        interviewQuestions: [
          "Why must a variadic parameter always come last in the parameter list?",
          "Can you have a function with two variadic parameters?",
          "What's the practical benefit of mixing fixed and variadic parameters?",
        ],
      },
      {
        id: 6,
        title: "Spreading a Slice into a Variadic Function",
        difficulty: "Beginner",
        description:
          "Given an existing slice numbers := []int{4, 8, 15, 16, 23, 42} and the variadic function sum(nums ...int) int from before, call sum by spreading the slice using the ... operator instead of listing each element manually.",
        starterCode: `package main
 
import "fmt"
 
func sum(nums ...int) int {
	total := 0
	for _, n := range nums {
		total += n
	}
	return total
}
 
func main() {
	numbers := []int{4, 8, 15, 16, 23, 42}
	// Call sum by spreading numbers with the ... operator
}`,
        solution: `package main
 
import "fmt"
 
func sum(nums ...int) int {
	total := 0
	for _, n := range nums {
		total += n
	}
	return total
}
 
func main() {
	numbers := []int{4, 8, 15, 16, 23, 42}
	fmt.Println(sum(numbers...))
}`,
        hints: [
          "Appending ... after a slice name spreads its elements as individual variadic arguments.",
          "Without the ..., Go would give a compile error since you can't pass a []int where individual ints are expected.",
          "This is the reverse operation of what happens inside the function — the slice gets 'unpacked' into arguments.",
        ],
        tags: ["variadic functions", "slices", "spread operator"],
        interviewQuestions: [
          "What does the ... operator do when placed after a slice at a call site?",
          "What compile error would you get if you passed numbers directly to sum without the ...?",
          "Can you spread a slice into a variadic parameter mixed with individual extra arguments?",
        ],
      },
      {
        id: 7,
        title: "First-Class Functions: Passing a Function as an Argument",
        difficulty: "Beginner",
        description:
          "Write a function `calculate(a, b int, op func(int, int) int) int` that applies the given operation function to a and b. Define two functions add and multiply matching that signature, and call calculate with each.",
        starterCode: `package main
 
import "fmt"
 
func add(a, b int) int {
	return a + b
}
 
func multiply(a, b int) int {
	return a * b
}
 
func calculate(a, b int, op func(int, int) int) int {
	// Apply op to a and b
}
 
func main() {
	fmt.Println(calculate(3, 4, add))
	fmt.Println(calculate(3, 4, multiply))
}`,
        solution: `package main
 
import "fmt"
 
func add(a, b int) int {
	return a + b
}
 
func multiply(a, b int) int {
	return a * b
}
 
func calculate(a, b int, op func(int, int) int) int {
	return op(a, b)
}
 
func main() {
	fmt.Println(calculate(3, 4, add))
	fmt.Println(calculate(3, 4, multiply))
}`,
        hints: [
          "In Go, functions are values — you can pass them around just like ints or strings.",
          "The parameter type func(int, int) int describes any function taking two ints and returning an int.",
          "You pass the function name without parentheses, e.g. add, not add().",
        ],
        tags: ["first-class functions", "functions", "higher-order functions"],
        interviewQuestions: [
          "What does it mean for functions to be 'first-class' in a language?",
          "How do you write the type signature for a function parameter in Go?",
          "What's a practical use case for passing functions as arguments?",
        ],
      },
      {
        id: 8,
        title: "First-Class Functions: Returning Different Functions",
        difficulty: "Beginner",
        description:
          'Write a function `operatorFor(symbol string) func(int, int) int` that returns the add function for "+" and the multiply function for "*" (define both). In main, get the function for "+" and use it to add 5 and 3.',
        starterCode: `package main
 
import "fmt"
 
func add(a, b int) int {
	return a + b
}
 
func multiply(a, b int) int {
	return a * b
}
 
func operatorFor(symbol string) func(int, int) int {
	// Return add or multiply based on the symbol
}
 
func main() {
	op := operatorFor("+")
	fmt.Println(op(5, 3))
}`,
        solution: `package main
 
import "fmt"
 
func add(a, b int) int {
	return a + b
}
 
func multiply(a, b int) int {
	return a * b
}
 
func operatorFor(symbol string) func(int, int) int {
	switch symbol {
	case "+":
		return add
	case "*":
		return multiply
	default:
		return nil
	}
}
 
func main() {
	op := operatorFor("+")
	fmt.Println(op(5, 3))
}`,
        hints: [
          "A function's return type can itself be a function type, like func(int, int) int.",
          "You return the function itself, without calling it — just add, not add(a, b).",
          "Calling op(5, 3) later invokes whichever function was returned.",
        ],
        tags: ["first-class functions", "switch", "functions"],
        interviewQuestions: [
          "Why is it useful for a function to return another function rather than a computed value?",
          'What would op equal if operatorFor was called with an unrecognized symbol like "/"?',
          "How is this pattern related to a strategy pattern in object-oriented languages?",
        ],
      },
      {
        id: 9,
        title: "Closures: Accumulator with Custom Step",
        difficulty: "Beginner",
        description:
          "Write a function `makeAccumulator(step int) func() int` that returns a closure. Each call to the returned function increases an internal total by step and returns the new total. Create two accumulators with different steps (2 and 5) and call each three times.",
        starterCode: `package main
 
import "fmt"
 
func makeAccumulator(step int) func() int {
	// Return a closure that adds step to a running total each call
}
 
func main() {
	byTwos := makeAccumulator(2)
	byFives := makeAccumulator(5)
 
	fmt.Println(byTwos())
	fmt.Println(byTwos())
	fmt.Println(byFives())
	fmt.Println(byFives())
}`,
        solution: `package main
 
import "fmt"
 
func makeAccumulator(step int) func() int {
	total := 0
	return func() int {
		total += step
		return total
	}
}
 
func main() {
	byTwos := makeAccumulator(2)
	byFives := makeAccumulator(5)
 
	fmt.Println(byTwos())
	fmt.Println(byTwos())
	fmt.Println(byFives())
	fmt.Println(byFives())
}`,
        hints: [
          "step is captured by the closure just like total, and stays fixed for that particular accumulator.",
          "Each call to makeAccumulator creates a brand-new, independent total variable.",
          "This pattern is how Go achieves stateful behavior without using global variables or structs.",
        ],
        tags: ["closures", "first-class functions", "state"],
        interviewQuestions: [
          "What's the difference between the step and total variables in terms of how the closure uses them?",
          "Why don't byTwos and byFives interfere with each other's state?",
          "What would happen if step were declared inside the returned function instead of the outer one?",
        ],
      },
      {
        id: 10,
        title: "Closures: Verifying Independent State",
        difficulty: "Beginner",
        description:
          "Using the makeCounter() closure pattern, create two separate counters, counterA and counterB. Call counterA twice and counterB once, then print all three values in the order they were produced to prove the two counters don't share state.",
        starterCode: `package main
 
import "fmt"
 
func makeCounter() func() int {
	count := 0
	return func() int {
		count++
		return count
	}
}
 
func main() {
	counterA := makeCounter()
	counterB := makeCounter()
	// Call counterA twice and counterB once, print all results
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
	counterA := makeCounter()
	counterB := makeCounter()
 
	a1 := counterA()
	a2 := counterA()
	b1 := counterB()
 
	fmt.Println("counterA:", a1, a2)
	fmt.Println("counterB:", b1)
}`,
        hints: [
          "Each call to makeCounter() creates a fresh count variable in its own closure environment.",
          "counterB starting at 1 (not 3) proves it has independent state from counterA.",
          "This is a key difference from a single shared global counter variable.",
        ],
        tags: ["closures", "state", "functions"],
        interviewQuestions: [
          "Why does counterB start counting from 1 even after counterA has already been called twice?",
          "How would behavior change if count were a package-level variable instead of captured in the closure?",
          "Are closures in Go safe to share across goroutines without extra synchronization?",
        ],
      },
      {
        id: 11,
        title: "The Error Interface: Safe Square Root",
        difficulty: "Beginner",
        description:
          "Write a function `safeSqrt(x float64) (float64, error)` that returns math.Sqrt(x) and a nil error for non-negative x, or 0 and an error (using errors.New) for negative x. Test it with 16.0 and -4.0.",
        starterCode: `package main
 
import (
	"errors"
	"fmt"
	"math"
)
 
func safeSqrt(x float64) (float64, error) {
	// Return an error for negative x, otherwise the square root
}
 
func main() {
	result, err := safeSqrt(16.0)
	fmt.Println(result, err)
 
	result, err = safeSqrt(-4.0)
	fmt.Println(result, err)
}`,
        solution: `package main
 
import (
	"errors"
	"fmt"
	"math"
)
 
func safeSqrt(x float64) (float64, error) {
	if x < 0 {
		return 0, errors.New("cannot take square root of a negative number")
	}
	return math.Sqrt(x), nil
}
 
func main() {
	result, err := safeSqrt(16.0)
	fmt.Println(result, err)
 
	result, err = safeSqrt(-4.0)
	fmt.Println(result, err)
}`,
        hints: [
          "The built-in error type is an interface — errors.New() creates a simple value that satisfies it.",
          "By convention, error is always the last return value in Go.",
          "Printing a nil error with fmt.Println shows <nil>.",
        ],
        tags: ["error interface", "functions", "errors.New"],
        interviewQuestions: [
          "What does the built-in error type actually look like under the hood?",
          "Why is error conventionally the last return value in Go functions?",
          "What gets printed when you fmt.Println a nil error value?",
        ],
      },
      {
        id: 12,
        title: "The Error Interface: Sentinel Errors",
        difficulty: "Beginner",
        description:
          'Declare a package-level sentinel error var ErrNotFound = errors.New("item not found"). Write a function `findItem(items []string, target string) error` that returns ErrNotFound if target isn\'t in items, otherwise nil. Test it by searching for an item that exists and one that doesn\'t.',
        starterCode: `package main
 
import (
	"errors"
	"fmt"
)
 
var ErrNotFound = errors.New("item not found")
 
func findItem(items []string, target string) error {
	// Return ErrNotFound if target isn't in items
}
 
func main() {
	items := []string{"apple", "banana", "cherry"}
	fmt.Println(findItem(items, "banana"))
	fmt.Println(findItem(items, "mango"))
}`,
        solution: `package main
 
import (
	"errors"
	"fmt"
)
 
var ErrNotFound = errors.New("item not found")
 
func findItem(items []string, target string) error {
	for _, item := range items {
		if item == target {
			return nil
		}
	}
	return ErrNotFound
}
 
func main() {
	items := []string{"apple", "banana", "cherry"}
	fmt.Println(findItem(items, "banana"))
	fmt.Println(findItem(items, "mango"))
}`,
        hints: [
          "A sentinel error is a predefined error value that callers can check against directly.",
          "Package-level error variables conventionally start with Err, like ErrNotFound.",
          "Callers can later compare against this exact value using == or errors.Is.",
        ],
        tags: ["error interface", "sentinel errors", "errors.New"],
        interviewQuestions: [
          "What is a sentinel error, and why is the Err naming convention useful?",
          "How would a caller check specifically for ErrNotFound instead of just checking err != nil?",
          "What are the downsides of relying purely on sentinel errors instead of custom error types?",
        ],
      },
      {
        id: 13,
        title: "Custom Error Type: Out-of-Range Error",
        difficulty: "Beginner",
        description:
          'Create an OutOfRangeError struct with Value, Min, Max int. Implement the error interface on it so Error() returns a message like "value 200 is outside range [0, 100]". Write a function `validatePercentage(value int) error` that returns this error if value is outside 0-100. Test it with 200 and 50.',
        starterCode: `package main
 
import "fmt"
 
type OutOfRangeError struct {
	// Define fields
}
 
// Implement the error interface
 
func validatePercentage(value int) error {
	// Return OutOfRangeError if value is outside 0-100
}
 
func main() {
	fmt.Println(validatePercentage(200))
	fmt.Println(validatePercentage(50))
}`,
        solution: `package main
 
import "fmt"
 
type OutOfRangeError struct {
	Value int
	Min   int
	Max   int
}
 
func (e *OutOfRangeError) Error() string {
	return fmt.Sprintf("value %d is outside range [%d, %d]", e.Value, e.Min, e.Max)
}
 
func validatePercentage(value int) error {
	if value < 0 || value > 100 {
		return &OutOfRangeError{Value: value, Min: 0, Max: 100}
	}
	return nil
}
 
func main() {
	fmt.Println(validatePercentage(200))
	fmt.Println(validatePercentage(50))
}`,
        hints: [
          "Any type with an Error() string method automatically satisfies the error interface.",
          "Returning a pointer (&OutOfRangeError{...}) is the idiomatic way to return custom error types.",
          "validatePercentage(50) should print <nil> since 50 is within range.",
        ],
        tags: ["custom error types", "error interface", "structs"],
        interviewQuestions: [
          "What is the minimum requirement for a type to satisfy Go's error interface?",
          "Why is a custom error type like OutOfRangeError more useful than a plain errors.New string?",
          "How could a caller extract the Value field from this error after receiving it as an error interface?",
        ],
      },
      {
        id: 14,
        title: "Defer: Multiple Defers Run in LIFO Order",
        difficulty: "Beginner",
        description:
          'Write a function demoOrder() that has three defer statements printing "first", "second", and "third" in that source order. Call it and observe the actual print order to see LIFO (last-in-first-out) execution.',
        starterCode: `package main
 
import "fmt"
 
func demoOrder() {
	// Add three defer statements: first, second, third
	fmt.Println("Function body running")
}
 
func main() {
	demoOrder()
}`,
        solution: `package main
 
import "fmt"
 
func demoOrder() {
	defer fmt.Println("first")
	defer fmt.Println("second")
	defer fmt.Println("third")
	fmt.Println("Function body running")
}
 
func main() {
	demoOrder()
}`,
        hints: [
          "Deferred calls are pushed onto a stack and run in reverse order when the function returns.",
          "The function body itself always runs before any deferred call fires.",
          "Expect the output order to be: Function body running, third, second, first.",
        ],
        tags: ["defer", "LIFO"],
        interviewQuestions: [
          "What does LIFO mean, and how does it apply to Go's defer statement?",
          "At what point in a function's execution do deferred calls actually run?",
          "Why is LIFO order useful for resource cleanup involving multiple resources?",
        ],
      },
      {
        id: 15,
        title: "Defer: The Loop Variable Gotcha",
        difficulty: "Beginner",
        description:
          'Write a loop over names := []string{"Asha", "Rohan", "Meera"} that defers a print of each name, but pass the loop variable as an argument to the deferred function (defer func(n string) { fmt.Println(n) }(name)) to avoid the classic closure-over-loop-variable bug.',
        starterCode: `package main
 
import "fmt"
 
func main() {
	names := []string{"Asha", "Rohan", "Meera"}
	for _, name := range names {
		// Defer a print of name, passing it as an argument to avoid the loop variable gotcha
	}
}`,
        solution: `package main
 
import "fmt"
 
func main() {
	names := []string{"Asha", "Rohan", "Meera"}
	for _, name := range names {
		defer func(n string) {
			fmt.Println(n)
		}(name)
	}
}`,
        hints: [
          "Passing name as an argument (n string) captures its value at the time defer runs, not later.",
          "If you instead wrote defer func() { fmt.Println(name) }() without the argument, older Go versions would print the same final value three times.",
          "Because defers run LIFO, expect the output order to be Meera, Rohan, Asha.",
        ],
        tags: ["defer", "closures", "for loop"],
        interviewQuestions: [
          "Why did older versions of Go require passing loop variables as arguments to deferred closures?",
          "Did Go 1.22 change how loop variables work with closures, and how?",
          "What output order would you expect from three defers inside a loop, and why?",
        ],
      },
      {
        id: 16,
        title: "Defer: Modifying a Named Return Value",
        difficulty: "Beginner",
        description:
          "Write a function `safeDivide(a, b int) (result int, err error)` with named return values. Use a deferred function to recover from a divide-by-zero panic and set err to a descriptive error instead of letting the program crash. Call it with (10, 0) and (10, 2), printing both outcomes.",
        starterCode: `package main
 
import (
	"errors"
	"fmt"
)
 
func safeDivide(a, b int) (result int, err error) {
	// Defer a recover that sets err if a panic occurs, then perform the division
}
 
func main() {
	r, err := safeDivide(10, 0)
	fmt.Println(r, err)
 
	r, err = safeDivide(10, 2)
	fmt.Println(r, err)
}`,
        solution: `package main
 
import (
	"errors"
	"fmt"
)
 
func safeDivide(a, b int) (result int, err error) {
	defer func() {
		if r := recover(); r != nil {
			err = errors.New("division by zero")
		}
	}()
	result = a / b
	return
}
 
func main() {
	r, err := safeDivide(10, 0)
	fmt.Println(r, err)
 
	r, err = safeDivide(10, 2)
	fmt.Println(r, err)
}`,
        hints: [
          "A deferred function can modify named return values even after a panic, because it runs during the function's return process.",
          "Dividing an int by zero in Go panics at runtime — it doesn't just produce Inf like some languages.",
          "recover() only has an effect when called directly inside a deferred function.",
        ],
        tags: ["defer", "panic", "recover", "named return values"],
        interviewQuestions: [
          "Why can a deferred function modify a named return value but not an unnamed one?",
          "What happens if you divide an int by zero in Go, versus dividing a float64 by zero?",
          "Is this recover-and-convert-to-error pattern considered idiomatic Go? Why or why not?",
        ],
      },
      {
        id: 17,
        title: "Panic and Recover: Safe Slice Access",
        difficulty: "Beginner",
        description:
          "Write a function `safeGet(items []string, index int) (value string, err error)` that attempts items[index] and uses defer/recover to catch an out-of-range panic, converting it into a returned error instead of crashing. Test it with a valid index and an out-of-range index.",
        starterCode: `package main
 
import (
	"errors"
	"fmt"
)
 
func safeGet(items []string, index int) (value string, err error) {
	// Recover from an out-of-range panic and return it as an error
}
 
func main() {
	items := []string{"a", "b", "c"}
 
	v, err := safeGet(items, 1)
	fmt.Println(v, err)
 
	v, err = safeGet(items, 10)
	fmt.Println(v, err)
}`,
        solution: `package main
 
import (
	"errors"
	"fmt"
)
 
func safeGet(items []string, index int) (value string, err error) {
	defer func() {
		if r := recover(); r != nil {
			err = errors.New("index out of range")
		}
	}()
	value = items[index]
	return
}
 
func main() {
	items := []string{"a", "b", "c"}
 
	v, err := safeGet(items, 1)
	fmt.Println(v, err)
 
	v, err = safeGet(items, 10)
	fmt.Println(v, err)
}`,
        hints: [
          "Accessing a slice index beyond its length panics at runtime in Go.",
          "Wrapping risky operations in a recover-based helper is a common way to convert unexpected panics into ordinary errors at API boundaries.",
          "Don't overuse this pattern — checking index < len(items) directly is usually clearer than relying on recover.",
        ],
        tags: ["panic", "recover", "slices", "error handling"],
        interviewQuestions: [
          "What runtime error does Go produce when you access a slice index that's out of range?",
          "Why is checking bounds explicitly usually preferred over relying on recover for this kind of error?",
          "In what situations is recover genuinely the right tool, rather than just returning an error normally?",
        ],
      },
      {
        id: 18,
        title: "Wrapping Errors with fmt.Errorf and %w",
        difficulty: "Beginner",
        description:
          'Write a function `loadConfig() error` that calls a helper readFile() error (which always returns errors.New("file not found")), and wraps that error with additional context using fmt.Errorf("loading config: %w", err). Print the wrapped error in main.',
        starterCode: `package main
 
import (
	"errors"
	"fmt"
)
 
func readFile() error {
	return errors.New("file not found")
}
 
func loadConfig() error {
	// Call readFile and wrap any error with additional context using %w
}
 
func main() {
	err := loadConfig()
	fmt.Println(err)
}`,
        solution: `package main
 
import (
	"errors"
	"fmt"
)
 
func readFile() error {
	return errors.New("file not found")
}
 
func loadConfig() error {
	if err := readFile(); err != nil {
		return fmt.Errorf("loading config: %w", err)
	}
	return nil
}
 
func main() {
	err := loadConfig()
	fmt.Println(err)
}`,
        hints: [
          "%w is a special verb (only valid with fmt.Errorf) that wraps the original error while adding new context.",
          "The wrapped error's message chains together, e.g. 'loading config: file not found'.",
          "Using %w (instead of %v or %s) preserves the original error so it can still be inspected later with errors.Is or errors.As.",
        ],
        tags: ["error wrapping", "fmt.Errorf", "error interface"],
        interviewQuestions: [
          "What's the difference between wrapping an error with %w versus formatting it with %v?",
          "Why would you want to preserve the original error instead of just creating a brand new one?",
          "What function would you use to retrieve the original wrapped error programmatically?",
        ],
      },
      {
        id: 19,
        title: "errors.Is: Checking for a Wrapped Sentinel Error",
        difficulty: "Beginner",
        description:
          'Using the sentinel error var ErrNotFound = errors.New("item not found"), write a function `lookupUser(id int) error` that returns ErrNotFound wrapped with extra context via fmt.Errorf("lookupUser: %w", ErrNotFound) when id is 0. In main, use errors.Is to check if the returned error is ErrNotFound, even though it\'s wrapped.',
        starterCode: `package main
 
import (
	"errors"
	"fmt"
)
 
var ErrNotFound = errors.New("item not found")
 
func lookupUser(id int) error {
	// Return a wrapped ErrNotFound when id is 0
}
 
func main() {
	err := lookupUser(0)
	if errors.Is(err, ErrNotFound) {
		fmt.Println("User lookup failed: not found")
	} else {
		fmt.Println("Unexpected error:", err)
	}
}`,
        solution: `package main
 
import (
	"errors"
	"fmt"
)
 
var ErrNotFound = errors.New("item not found")
 
func lookupUser(id int) error {
	if id == 0 {
		return fmt.Errorf("lookupUser: %w", ErrNotFound)
	}
	return nil
}
 
func main() {
	err := lookupUser(0)
	if errors.Is(err, ErrNotFound) {
		fmt.Println("User lookup failed: not found")
	} else {
		fmt.Println("Unexpected error:", err)
	}
}`,
        hints: [
          "errors.Is walks the chain of wrapped errors (created with %w) looking for a match.",
          "A plain == comparison would fail here because the wrapped error is a different value than ErrNotFound itself.",
          "errors.Is is the idiomatic way to check for sentinel errors, even through multiple layers of wrapping.",
        ],
        tags: ["errors.Is", "error wrapping", "sentinel errors"],
        interviewQuestions: [
          "Why does err == ErrNotFound fail here even though the error was ultimately caused by ErrNotFound?",
          "How does errors.Is traverse a chain of wrapped errors under the hood?",
          "Can errors.Is work through multiple layers of %w wrapping, not just one?",
        ],
      },
      {
        id: 20,
        title: "errors.As: Extracting a Custom Error Type from a Wrapped Error",
        difficulty: "Beginner",
        description:
          "Reuse the ValidationError type. Write a function `processForm() error` that wraps a *ValidationError with additional context using fmt.Errorf(\"processForm: %w\", ...). In main, use errors.As to extract the underlying *ValidationError and print its Field.",
        starterCode: `package main
 
import (
	"fmt"
)
 
type ValidationError struct {
	Field   string
	Message string
}
 
func (e *ValidationError) Error() string {
	return fmt.Sprintf("validation error on %s: %s", e.Field, e.Message)
}
 
func processForm() error {
	// Wrap a *ValidationError with additional context using %w
}
 
func main() {
	err := processForm()
 
	var valErr *ValidationError
	// Use errors.As to extract the underlying *ValidationError
}`,
        solution: `package main
 
import (
	"errors"
	"fmt"
)
 
type ValidationError struct {
	Field   string
	Message string
}
 
func (e *ValidationError) Error() string {
	return fmt.Sprintf("validation error on %s: %s", e.Field, e.Message)
}
 
func processForm() error {
	baseErr := &ValidationError{Field: "email", Message: "invalid format"}
	return fmt.Errorf("processForm: %w", baseErr)
}
 
func main() {
	err := processForm()
 
	var valErr *ValidationError
	if errors.As(err, &valErr) {
		fmt.Println("Failed field:", valErr.Field)
	} else {
		fmt.Println("Not a validation error")
	}
}`,
        hints: [
          "errors.As walks the error chain looking for an error matching the target's type, unwrapping %w layers as needed.",
          "You must pass a pointer to the target variable: &valErr, not valErr.",
          "Once errors.As succeeds, valErr is populated and you can access its fields directly, like valErr.Field.",
        ],
        tags: ["errors.As", "custom error types", "error wrapping"],
        interviewQuestions: [
          "What's the key difference between errors.Is and errors.As?",
          "Why does errors.As require a pointer to the target variable?",
          "How would you use errors.As if a custom error type had multiple useful fields you wanted to access after extraction?",
        ],
      },
      {
        id: 21,
        title: "First-Class Functions: Filtering a Slice with a Predicate",
        difficulty: "Beginner",
        description:
          "Write a function `filter(nums []int, predicate func(int) bool) []int` that returns only the elements for which predicate returns true. In main, use a closure that checks for even numbers and filter []int{1,2,3,4,5,6} with it.",
        starterCode: `package main
 
import "fmt"
 
func filter(nums []int, predicate func(int) bool) []int {
	// Return a new slice containing only elements where predicate(n) is true
}
 
func main() {
	numbers := []int{1, 2, 3, 4, 5, 6}
	isEven := func(n int) bool {
		return n%2 == 0
	}
	fmt.Println(filter(numbers, isEven))
}`,
        solution: `package main
 
import "fmt"
 
func filter(nums []int, predicate func(int) bool) []int {
	var result []int
	for _, n := range nums {
		if predicate(n) {
			result = append(result, n)
		}
	}
	return result
}
 
func main() {
	numbers := []int{1, 2, 3, 4, 5, 6}
	isEven := func(n int) bool {
		return n%2 == 0
	}
	fmt.Println(filter(numbers, isEven))
}`,
        hints: [
          "A predicate is just a function that returns a bool — Go treats it like any other value.",
          "You can define isEven as an anonymous function assigned to a variable, without giving it a top-level name.",
          "Building the result with a nil slice and append is idiomatic — no need to pre-size it.",
        ],
        tags: ["first-class functions", "closures", "slices"],
        interviewQuestions: [
          "What is a predicate function, and why is it useful as a parameter?",
          "How is filter here similar to functions like Filter in other functional languages?",
          "Could you write isEven as a named top-level function instead of an anonymous one? What would change?",
        ],
      },
      {
        id: 22,
        title: "Variadic Functions: Finding the Maximum",
        difficulty: "Beginner",
        description:
          "Write a function `max(numbers ...int) (int, error)` that returns the largest number passed in, or an error if no numbers were given. Call it with (3, 7, 2, 9, 4) and with no arguments, printing both outcomes.",
        starterCode: `package main
 
import (
	"errors"
	"fmt"
)
 
func max(numbers ...int) (int, error) {
	// Return the largest number, or an error if numbers is empty
}
 
func main() {
	m, err := max(3, 7, 2, 9, 4)
	fmt.Println(m, err)
 
	m, err = max()
	fmt.Println(m, err)
}`,
        solution: `package main
 
import (
	"errors"
	"fmt"
)
 
func max(numbers ...int) (int, error) {
	if len(numbers) == 0 {
		return 0, errors.New("max: no numbers provided")
	}
 
	largest := numbers[0]
	for _, n := range numbers[1:] {
		if n > largest {
			largest = n
		}
	}
	return largest, nil
}
 
func main() {
	m, err := max(3, 7, 2, 9, 4)
	fmt.Println(m, err)
 
	m, err = max()
	fmt.Println(m, err)
}`,
        hints: [
          "Check len(numbers) == 0 first, since a variadic call with no arguments produces an empty slice.",
          "numbers[1:] gives you a slice of all elements after the first, handy for starting comparisons.",
          "Combining variadic functions with error returns is a common, idiomatic Go pattern.",
        ],
        tags: ["variadic functions", "error interface", "functions"],
        interviewQuestions: [
          "Why is it good practice for max to return an error instead of silently returning 0 for empty input?",
          "What would numbers[1:] be if only one number was passed in?",
          "How does this pattern compare to how math.Max works for just two float64 values?",
        ],
      },
    ],
  },

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
      {
        id: 4,
        title: "Launching Your First Goroutine",
        difficulty: "Intermediate",
        description:
          'Write a program that uses the go keyword to launch a goroutine which prints "Hello from a goroutine!". Because main() can exit before the goroutine runs, use a sync.WaitGroup to make sure main waits for it to finish before exiting.',
        starterCode: `package main
 
import (
	"fmt"
	"sync"
)
 
func main() {
	var wg sync.WaitGroup
	// Launch a goroutine that prints a greeting, using wg to wait for it
}`,
        solution: `package main
 
import (
	"fmt"
	"sync"
)
 
func main() {
	var wg sync.WaitGroup
 
	wg.Add(1)
	go func() {
		defer wg.Done()
		fmt.Println("Hello from a goroutine!")
	}()
 
	wg.Wait()
}`,
        hints: [
          "The go keyword starts a new goroutine that runs concurrently with the rest of the program.",
          "Without something like wg.Wait(), main() might exit before the goroutine gets a chance to run at all.",
          "wg.Add(1) must be called before the goroutine starts, not inside it.",
        ],
        tags: ["goroutines", "go keyword", "sync.WaitGroup"],
        interviewQuestions: [
          "What happens if main() returns before a launched goroutine finishes?",
          "Why is a goroutine described as 'lightweight' compared to an OS thread?",
          "What would happen if you called wg.Add(1) inside the goroutine instead of before go func(){}()?",
        ],
      },
      {
        id: 5,
        title: "Goroutines Run Concurrently, Not in Order",
        difficulty: "Intermediate",
        description:
          'Launch 5 goroutines, each printing "Goroutine N started" for N from 1 to 5. Use a WaitGroup to wait for all of them. Notice the print order isn\'t guaranteed to be 1,2,3,4,5.',
        starterCode: `package main
 
import (
	"fmt"
	"sync"
)
 
func main() {
	var wg sync.WaitGroup
	// Launch 5 goroutines that each print their number, wait for all
}`,
        solution: `package main
 
import (
	"fmt"
	"sync"
)
 
func main() {
	var wg sync.WaitGroup
 
	for i := 1; i <= 5; i++ {
		wg.Add(1)
		go func(n int) {
			defer wg.Done()
			fmt.Println("Goroutine", n, "started")
		}(i)
	}
 
	wg.Wait()
}`,
        hints: [
          "Each goroutine gets its own copy of n by being passed as an argument, avoiding the classic loop-variable capture bug.",
          "The Go scheduler decides which goroutine runs when — order between them is not guaranteed.",
          "wg.Wait() blocks until every goroutine has called wg.Done().",
        ],
        tags: ["goroutines", "go keyword", "concurrency", "sync.WaitGroup"],
        interviewQuestions: [
          "Why is the print order of concurrently running goroutines not guaranteed?",
          "Why is n passed as an argument to the goroutine's function instead of being captured directly?",
          "What Go version changed how for loop variables are captured by closures, and how does that affect this pattern?",
        ],
      },
      {
        id: 6,
        title: "Unbuffered Channel: Simple Handoff",
        difficulty: "Intermediate",
        description:
          'Create an unbuffered channel ch := make(chan string). In a goroutine, send the message "ping" on the channel. In main, receive from the channel and print it. Notice that both sides must be ready at the same time for an unbuffered channel to complete the exchange.',
        starterCode: `package main
 
import "fmt"
 
func main() {
	ch := make(chan string)
	// Launch a goroutine that sends "ping" on ch, then receive and print it in main
}`,
        solution: `package main
 
import "fmt"
 
func main() {
	ch := make(chan string)
 
	go func() {
		ch <- "ping"
	}()
 
	message := <-ch
	fmt.Println(message)
}`,
        hints: [
          "An unbuffered channel (make(chan string)) has no capacity — a send blocks until a receiver is ready, and vice versa.",
          "This blocking handoff is often called a 'rendezvous' between goroutines.",
          'Without the goroutine, ch <- "ping" in main would block forever with nothing to receive it.',
        ],
        tags: ["channels", "unbuffered channels", "goroutines"],
        interviewQuestions: [
          "What does it mean for an unbuffered channel send to 'block'?",
          "What would happen if you tried to send and receive on an unbuffered channel from the same goroutine sequentially?",
          "How does an unbuffered channel act as a synchronization point between goroutines?",
        ],
      },
      {
        id: 7,
        title: "Buffered Channel: Sending Without Blocking",
        difficulty: "Intermediate",
        description:
          "Create a buffered channel with capacity 3: ch := make(chan int, 3). Send three integers (1, 2, 3) into it from main without any goroutine — notice none of the sends block because the buffer has room. Then receive and print all three.",
        starterCode: `package main
 
import "fmt"
 
func main() {
	ch := make(chan int, 3)
	// Send 1, 2, 3 into ch without blocking, then receive and print all three
}`,
        solution: `package main
 
import "fmt"
 
func main() {
	ch := make(chan int, 3)
 
	ch <- 1
	ch <- 2
	ch <- 3
 
	fmt.Println(<-ch)
	fmt.Println(<-ch)
	fmt.Println(<-ch)
}`,
        hints: [
          "A buffered channel, make(chan int, 3), can hold up to 3 values before a send blocks.",
          "This lets a sender proceed without a receiver being ready yet, up to the buffer's capacity.",
          "If you tried a 4th send with no receiver, it would block since the buffer would be full.",
        ],
        tags: ["channels", "buffered channels"],
        interviewQuestions: [
          "What is the key difference in blocking behavior between buffered and unbuffered channels?",
          "What happens if you try to send into a full buffered channel?",
          "How would you check how many values are currently sitting in a buffered channel?",
        ],
      },
      {
        id: 8,
        title: "Buffered Channel as a Semaphore: Limiting Concurrency",
        difficulty: "Intermediate",
        description:
          'Use a buffered channel of capacity 2 as a semaphore to ensure that, out of 5 launched goroutines, only 2 ever run their critical section at the same time. Each goroutine should acquire a slot (send into the channel), print "working", then release it (receive from the channel).',
        starterCode: `package main
 
import (
	"fmt"
	"sync"
)
 
func main() {
	var wg sync.WaitGroup
	semaphore := make(chan struct{}, 2)
	// Launch 5 goroutines that acquire/release the semaphore around their work
}`,
        solution: `package main
 
import (
	"fmt"
	"sync"
)
 
func main() {
	var wg sync.WaitGroup
	semaphore := make(chan struct{}, 2)
 
	for i := 1; i <= 5; i++ {
		wg.Add(1)
		go func(id int) {
			defer wg.Done()
			semaphore <- struct{}{}
			fmt.Println("worker", id, "working")
			<-semaphore
		}(i)
	}
 
	wg.Wait()
}`,
        hints: [
          "A channel of capacity N can only hold N unreceived values at once, which naturally limits concurrency to N.",
          "struct{}{} is a common idiom for a channel that only cares about signaling, not the value itself — it takes zero memory.",
          "Sending into semaphore before the work and receiving after it forms an 'acquire, work, release' pattern.",
        ],
        tags: ["buffered channels", "goroutines", "concurrency patterns"],
        interviewQuestions: [
          "Why is a buffered channel with capacity N a natural fit for limiting concurrency to N goroutines?",
          "Why use struct{} instead of, say, bool as the channel's element type here?",
          "What would happen to concurrency if the semaphore channel's capacity were set to 1 instead of 2?",
        ],
      },
      {
        id: 9,
        title: "Directional Channels: Producer and Consumer Functions",
        difficulty: "Intermediate",
        description:
          "Write a producer(ch chan<- int) function that sends the numbers 1-5 into ch and then closes it. Write a consumer(ch <-chan int) int function that ranges over ch and returns the sum of all received values. Wire them together with a goroutine and a channel in main.",
        starterCode: `package main
 
import "fmt"
 
func producer(ch chan<- int) {
	// Send 1-5 into ch, then close it
}
 
func consumer(ch <-chan int) int {
	// Sum all values received from ch
}
 
func main() {
	ch := make(chan int)
	go producer(ch)
	total := consumer(ch)
	fmt.Println("Total:", total)
}`,
        solution: `package main
 
import "fmt"
 
func producer(ch chan<- int) {
	for i := 1; i <= 5; i++ {
		ch <- i
	}
	close(ch)
}
 
func consumer(ch <-chan int) int {
	total := 0
	for v := range ch {
		total += v
	}
	return total
}
 
func main() {
	ch := make(chan int)
	go producer(ch)
	total := consumer(ch)
	fmt.Println("Total:", total)
}`,
        hints: [
          "chan<- int means 'send-only channel' — producer can only send, not receive, on ch.",
          "<-chan int means 'receive-only channel' — consumer can only receive, not send.",
          "The Go compiler enforces these restrictions at compile time, preventing a producer from accidentally reading its own channel.",
        ],
        tags: ["directional channels", "channels", "functions"],
        interviewQuestions: [
          "What compile-time errors would occur if producer tried to receive from a chan<- int parameter?",
          "Why are directional channel types useful in function signatures even though the underlying channel is the same?",
          "Can a bidirectional channel (chan int) be passed to a function expecting chan<- int?",
        ],
      },
      {
        id: 10,
        title: "select: Choosing Between Two Channels",
        difficulty: "Intermediate",
        description:
          'Create two channels, fast and slow. In separate goroutines, send "fast result" on fast after 50ms and "slow result" on slow after 200ms. Use a select statement to print whichever result arrives first.',
        starterCode: `package main
 
import (
	"fmt"
	"time"
)
 
func main() {
	fast := make(chan string)
	slow := make(chan string)
 
	go func() {
		time.Sleep(50 * time.Millisecond)
		fast <- "fast result"
	}()
 
	go func() {
		time.Sleep(200 * time.Millisecond)
		slow <- "slow result"
	}()
 
	// Use select to print whichever channel is ready first
}`,
        solution: `package main
 
import (
	"fmt"
	"time"
)
 
func main() {
	fast := make(chan string)
	slow := make(chan string)
 
	go func() {
		time.Sleep(50 * time.Millisecond)
		fast <- "fast result"
	}()
 
	go func() {
		time.Sleep(200 * time.Millisecond)
		slow <- "slow result"
	}()
 
	select {
	case msg := <-fast:
		fmt.Println(msg)
	case msg := <-slow:
		fmt.Println(msg)
	}
}`,
        hints: [
          "select blocks until one of its cases is ready, then runs that case.",
          "Since fast sends after only 50ms and slow after 200ms, the fast case should almost always win.",
          "If multiple cases are ready at the same time, select picks one at random.",
        ],
        tags: ["select", "channels", "goroutines"],
        interviewQuestions: [
          "How does select decide which case to run when multiple channels are ready simultaneously?",
          "What happens if none of the channels in a select are ready and there's no default case?",
          "How is select conceptually similar to a switch statement?",
        ],
      },
      {
        id: 11,
        title: "select with Default: Non-blocking Channel Check",
        difficulty: "Intermediate",
        description:
          'Create an unbuffered channel ch := make(chan int). Use a select statement with a default case to attempt a receive from ch — since nothing has been sent, the default case should run immediately, printing "no data available" instead of blocking.',
        starterCode: `package main
 
import "fmt"
 
func main() {
	ch := make(chan int)
	// Use select with default to check ch without blocking
}`,
        solution: `package main
 
import "fmt"
 
func main() {
	ch := make(chan int)
 
	select {
	case v := <-ch:
		fmt.Println("Received:", v)
	default:
		fmt.Println("no data available")
	}
}`,
        hints: [
          "Adding a default case to select makes it non-blocking: if no other case is ready immediately, default runs instead.",
          "Without default, this select would block forever since nothing ever sends on ch.",
          "This pattern is useful for polling a channel without stopping the rest of your program.",
        ],
        tags: ["select", "channels", "non-blocking"],
        interviewQuestions: [
          "What does adding a default case change about how select behaves?",
          "In what real-world scenario would a non-blocking channel check be useful?",
          "Would this program deadlock without the default case? Why?",
        ],
      },
      {
        id: 12,
        title: "sync.WaitGroup: Waiting for N Dynamic Goroutines",
        difficulty: "Intermediate",
        description:
          "Write a function `processAll(items []string) []string` that launches one goroutine per item to convert it to uppercase (using strings.ToUpper), collects all results via a mutex-protected slice, and uses a sync.WaitGroup sized dynamically to len(items). Call it with 4 fruit names and print the results.",
        starterCode: `package main
 
import (
	"fmt"
	"strings"
	"sync"
)
 
func processAll(items []string) []string {
	var wg sync.WaitGroup
	var mu sync.Mutex
	var results []string
	// Launch one goroutine per item, protect results with mu
	return results
}
 
func main() {
	fruits := []string{"apple", "banana", "cherry", "date"}
	fmt.Println(processAll(fruits))
}`,
        solution: `package main
 
import (
	"fmt"
	"strings"
	"sync"
)
 
func processAll(items []string) []string {
	var wg sync.WaitGroup
	var mu sync.Mutex
	var results []string
 
	for _, item := range items {
		wg.Add(1)
		go func(s string) {
			defer wg.Done()
			upper := strings.ToUpper(s)
			mu.Lock()
			results = append(results, upper)
			mu.Unlock()
		}(item)
	}
 
	wg.Wait()
	return results
}
 
func main() {
	fruits := []string{"apple", "banana", "cherry", "date"}
	fmt.Println(processAll(fruits))
}`,
        hints: [
          "wg.Add(1) is called once per item, inside the loop, right before launching each goroutine.",
          "Appending to a shared slice from multiple goroutines needs a mutex — slices aren't safe for concurrent writes.",
          "The final order of results isn't guaranteed since goroutines finish at different times.",
        ],
        tags: ["sync.WaitGroup", "sync.Mutex", "goroutines", "slices"],
        interviewQuestions: [
          "Why is appending to results from multiple goroutines unsafe without a mutex?",
          "What would happen if wg.Add(1) were called outside the loop with the total count instead?",
          "Is the order of items in the returned results slice guaranteed? Why or why not?",
        ],
      },
      {
        id: 13,
        title: "sync.Mutex: Protecting a Shared Counter",
        difficulty: "Intermediate",
        description:
          "Write a Counter struct with a mu sync.Mutex and a value int. Add an Increment() method that safely increments value using the mutex. Launch 100 goroutines that each call Increment() once, wait for all of them, then print the final value (should always be exactly 100).",
        starterCode: `package main
 
import (
	"fmt"
	"sync"
)
 
type Counter struct {
	mu    sync.Mutex
	value int
}
 
func (c *Counter) Increment() {
	// Safely increment c.value using the mutex
}
 
func main() {
	counter := Counter{}
	var wg sync.WaitGroup
 
	for i := 0; i < 100; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			counter.Increment()
		}()
	}
 
	wg.Wait()
	fmt.Println("Final count:", counter.value)
}`,
        solution: `package main
 
import (
	"fmt"
	"sync"
)
 
type Counter struct {
	mu    sync.Mutex
	value int
}
 
func (c *Counter) Increment() {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.value++
}
 
func main() {
	counter := Counter{}
	var wg sync.WaitGroup
 
	for i := 0; i < 100; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			counter.Increment()
		}()
	}
 
	wg.Wait()
	fmt.Println("Final count:", counter.value)
}`,
        hints: [
          "Lock() and Unlock() ensure only one goroutine can execute the code between them at a time.",
          "defer c.mu.Unlock() guarantees the mutex is released even if the function panics.",
          "Without the mutex, concurrent increments could race and the final count could be less than 100.",
        ],
        tags: ["sync.Mutex", "goroutines", "concurrency", "race conditions"],
        interviewQuestions: [
          "What is a race condition, and how does value++ become unsafe with concurrent goroutines?",
          "Why does the mutex live inside the Counter struct rather than as a separate global variable?",
          "What tool does Go provide to detect race conditions during testing?",
        ],
      },
      {
        id: 14,
        title: "sync.Mutex: Safely Updating a Shared Map",
        difficulty: "Intermediate",
        description:
          "Go maps are not safe for concurrent writes. Create a SafeMap struct wrapping a map[string]int and a sync.Mutex. Add a Set(key string, value int) method and a Get(key string) (int, bool) method, both protected by the mutex. Launch several goroutines writing different keys concurrently, wait for them, then read a value back.",
        starterCode: `package main
 
import (
	"fmt"
	"sync"
)
 
type SafeMap struct {
	mu   sync.Mutex
	data map[string]int
}
 
func NewSafeMap() *SafeMap {
	return &SafeMap{data: make(map[string]int)}
}
 
func (m *SafeMap) Set(key string, value int) {
	// Safely set data[key] = value
}
 
func (m *SafeMap) Get(key string) (int, bool) {
	// Safely read data[key]
}
 
func main() {
	m := NewSafeMap()
	var wg sync.WaitGroup
 
	keys := []string{"a", "b", "c", "d"}
	for i, key := range keys {
		wg.Add(1)
		go func(k string, v int) {
			defer wg.Done()
			m.Set(k, v)
		}(key, i)
	}
 
	wg.Wait()
	value, ok := m.Get("b")
	fmt.Println(value, ok)
}`,
        solution: `package main
 
import (
	"fmt"
	"sync"
)
 
type SafeMap struct {
	mu   sync.Mutex
	data map[string]int
}
 
func NewSafeMap() *SafeMap {
	return &SafeMap{data: make(map[string]int)}
}
 
func (m *SafeMap) Set(key string, value int) {
	m.mu.Lock()
	defer m.mu.Unlock()
	m.data[key] = value
}
 
func (m *SafeMap) Get(key string) (int, bool) {
	m.mu.Lock()
	defer m.mu.Unlock()
	value, ok := m.data[key]
	return value, ok
}
 
func main() {
	m := NewSafeMap()
	var wg sync.WaitGroup
 
	keys := []string{"a", "b", "c", "d"}
	for i, key := range keys {
		wg.Add(1)
		go func(k string, v int) {
			defer wg.Done()
			m.Set(k, v)
		}(key, i)
	}
 
	wg.Wait()
	value, ok := m.Get("b")
	fmt.Println(value, ok)
}`,
        hints: [
          "Concurrent writes to a plain Go map (even to different keys) can crash your program with 'fatal error: concurrent map writes'.",
          "Wrapping every access — both Set and Get — with the same mutex is essential; protecting only writes isn't enough.",
          "This SafeMap pattern is a common building block before reaching for more specialized tools like sync.Map.",
        ],
        tags: ["sync.Mutex", "maps", "concurrency", "race conditions"],
        interviewQuestions: [
          "What actually happens at runtime if two goroutines write to a Go map at the same time without synchronization?",
          "Why must Get() also acquire the mutex, even though it's only reading?",
          "What is sync.Map, and when might it be preferable to a mutex-protected map like this one?",
        ],
      },
      {
        id: 15,
        title: "sync.RWMutex: Concurrent Reads, Exclusive Writes",
        difficulty: "Intermediate",
        description:
          "Create a Cache struct wrapping a map[string]string and a sync.RWMutex. Add a Read(key string) string method using RLock/RUnlock (allowing many concurrent readers), and a Write(key, value string) method using Lock/Unlock (exclusive access). Launch several concurrent readers and one writer to demonstrate.",
        starterCode: `package main
 
import (
	"fmt"
	"sync"
)
 
type Cache struct {
	mu   sync.RWMutex
	data map[string]string
}
 
func NewCache() *Cache {
	return &Cache{data: make(map[string]string)}
}
 
func (c *Cache) Write(key, value string) {
	// Exclusive write access
}
 
func (c *Cache) Read(key string) string {
	// Shared read access
}
 
func main() {
	cache := NewCache()
	cache.Write("greeting", "hello")
 
	var wg sync.WaitGroup
	for i := 0; i < 3; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			fmt.Println(cache.Read("greeting"))
		}()
	}
	wg.Wait()
}`,
        solution: `package main
 
import (
	"fmt"
	"sync"
)
 
type Cache struct {
	mu   sync.RWMutex
	data map[string]string
}
 
func NewCache() *Cache {
	return &Cache{data: make(map[string]string)}
}
 
func (c *Cache) Write(key, value string) {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.data[key] = value
}
 
func (c *Cache) Read(key string) string {
	c.mu.RLock()
	defer c.mu.RUnlock()
	return c.data[key]
}
 
func main() {
	cache := NewCache()
	cache.Write("greeting", "hello")
 
	var wg sync.WaitGroup
	for i := 0; i < 3; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			fmt.Println(cache.Read("greeting"))
		}()
	}
	wg.Wait()
}`,
        hints: [
          "RLock() allows multiple goroutines to hold a read lock simultaneously, as long as no one holds the write lock.",
          "Lock() (the writer's lock) is exclusive — it blocks until all current readers finish and no other writer is active.",
          "sync.RWMutex is a good choice when reads vastly outnumber writes; for balanced read/write workloads, a plain sync.Mutex is often simpler and just as fast.",
        ],
        tags: ["sync.RWMutex", "concurrency", "maps"],
        interviewQuestions: [
          "When is sync.RWMutex preferable to a plain sync.Mutex?",
          "Can a goroutine hold RLock() while another goroutine is waiting on Lock()? What happens next?",
          "What would go wrong if Read() used Lock() instead of RLock()?",
        ],
      },
      {
        id: 16,
        title: "context.Context: Manual Cancellation with WithCancel",
        difficulty: "Intermediate",
        description:
          "Write a function countUp(ctx context.Context, ch chan<- int) that sends increasing integers (starting at 1) into ch every 10ms, stopping as soon as ctx is cancelled. In main, create a cancellable context, run countUp in a goroutine, receive and print 3 values, then call cancel() and stop.",
        starterCode: `package main
 
import (
	"context"
	"fmt"
	"time"
)
 
func countUp(ctx context.Context, ch chan<- int) {
	// Send increasing integers every 10ms, stop when ctx is cancelled
}
 
func main() {
	ctx, cancel := context.WithCancel(context.Background())
	ch := make(chan int)
 
	go countUp(ctx, ch)
 
	for i := 0; i < 3; i++ {
		fmt.Println(<-ch)
	}
	cancel()
}`,
        solution: `package main
 
import (
	"context"
	"fmt"
	"time"
)
 
func countUp(ctx context.Context, ch chan<- int) {
	n := 1
	for {
		select {
		case <-ctx.Done():
			return
		case ch <- n:
			n++
			time.Sleep(10 * time.Millisecond)
		}
	}
}
 
func main() {
	ctx, cancel := context.WithCancel(context.Background())
	ch := make(chan int)
 
	go countUp(ctx, ch)
 
	for i := 0; i < 3; i++ {
		fmt.Println(<-ch)
	}
	cancel()
}`,
        hints: [
          "context.WithCancel returns a context along with a cancel function you call manually to signal cancellation.",
          "select lets countUp simultaneously try to send a value and watch for cancellation — whichever happens first wins.",
          "Calling cancel() closes ctx.Done()'s channel, which is why <-ctx.Done() unblocks and the goroutine returns.",
        ],
        tags: ["context.Context", "cancellation", "select", "goroutines"],
        interviewQuestions: [
          "What does calling the cancel function returned by context.WithCancel actually do internally?",
          "Why does ctx.Done() return a channel instead of a simple bool?",
          "What happens if you never call cancel() at all — is that a resource leak?",
        ],
      },
      {
        id: 17,
        title: "Fan-Out: Multiple Workers Reading One Channel",
        difficulty: "Intermediate",
        description:
          "Write a function `fanOut(input <-chan int, workerCount int) <-chan int` that starts workerCount goroutines, all reading from the same input channel and squaring each number, sending results to a shared output channel. Feed it numbers 1-6 with 3 workers and print all results (order may vary).",
        starterCode: `package main
 
import (
	"fmt"
	"sync"
)
 
func fanOut(input <-chan int, workerCount int) <-chan int {
	output := make(chan int)
	var wg sync.WaitGroup
	// Launch workerCount goroutines reading from input, sending squares to output
	// Close output once all workers are done
	return output
}
 
func main() {
	input := make(chan int)
	go func() {
		for i := 1; i <= 6; i++ {
			input <- i
		}
		close(input)
	}()
 
	output := fanOut(input, 3)
	for v := range output {
		fmt.Println(v)
	}
}`,
        solution: `package main
 
import (
	"fmt"
	"sync"
)
 
func fanOut(input <-chan int, workerCount int) <-chan int {
	output := make(chan int)
	var wg sync.WaitGroup
 
	for i := 0; i < workerCount; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			for n := range input {
				output <- n * n
			}
		}()
	}
 
	go func() {
		wg.Wait()
		close(output)
	}()
 
	return output
}
 
func main() {
	input := make(chan int)
	go func() {
		for i := 1; i <= 6; i++ {
			input <- i
		}
		close(input)
	}()
 
	output := fanOut(input, 3)
	for v := range output {
		fmt.Println(v)
	}
}`,
        hints: [
          "Multiple goroutines can safely range over the same channel — each value is delivered to exactly one of them.",
          "A separate goroutine waits on wg.Wait() before closing output, since you can't close output from within the workers without a race.",
          "This 'fan-out' pattern distributes work from one source across several concurrent workers.",
        ],
        tags: ["fan-out", "channels", "goroutines", "sync.WaitGroup"],
        interviewQuestions: [
          "Why can't each worker goroutine safely close(output) itself?",
          "What would happen if two workers both tried to close the same channel?",
          "How does ranging over a channel behave when multiple goroutines range over the same one simultaneously?",
        ],
      },
      {
        id: 18,
        title: "Fan-In: Merging Multiple Channels into One",
        difficulty: "Intermediate",
        description:
          "Write a function `fanIn(channels ...<-chan int) <-chan int` that merges any number of input channels into a single output channel, using a goroutine per input channel and a sync.WaitGroup to know when to close the merged output. Merge two channels of numbers and print everything received.",
        starterCode: `package main
 
import (
	"fmt"
	"sync"
)
 
func fanIn(channels ...<-chan int) <-chan int {
	merged := make(chan int)
	var wg sync.WaitGroup
	// Launch one goroutine per input channel, forwarding values to merged
	// Close merged once all input channels are drained
	return merged
}
 
func gen(nums ...int) <-chan int {
	out := make(chan int)
	go func() {
		defer close(out)
		for _, n := range nums {
			out <- n
		}
	}()
	return out
}
 
func main() {
	c1 := gen(1, 2, 3)
	c2 := gen(10, 20, 30)
 
	for v := range fanIn(c1, c2) {
		fmt.Println(v)
	}
}`,
        solution: `package main
 
import (
	"fmt"
	"sync"
)
 
func fanIn(channels ...<-chan int) <-chan int {
	merged := make(chan int)
	var wg sync.WaitGroup
 
	for _, ch := range channels {
		wg.Add(1)
		go func(c <-chan int) {
			defer wg.Done()
			for v := range c {
				merged <- v
			}
		}(ch)
	}
 
	go func() {
		wg.Wait()
		close(merged)
	}()
 
	return merged
}
 
func gen(nums ...int) <-chan int {
	out := make(chan int)
	go func() {
		defer close(out)
		for _, n := range nums {
			out <- n
		}
	}()
	return out
}
 
func main() {
	c1 := gen(1, 2, 3)
	c2 := gen(10, 20, 30)
 
	for v := range fanIn(c1, c2) {
		fmt.Println(v)
	}
}`,
        hints: [
          "Each input channel gets its own forwarding goroutine, copying values into the shared merged channel.",
          "wg.Wait() in a separate goroutine ensures merged is only closed after every input channel has been fully drained.",
          "The interleaving of values from c1 and c2 in the output is not guaranteed to follow any particular order.",
        ],
        tags: ["fan-in", "channels", "goroutines", "sync.WaitGroup", "variadic functions"],
        interviewQuestions: [
          "Why does fanIn accept a variadic ...<-chan int parameter instead of a slice?",
          "What's the risk of closing merged directly inside one of the forwarding goroutines instead of waiting for all of them?",
          "How is fan-in the logical complement of fan-out?",
        ],
      },
      {
        id: 19,
        title: "Fan-Out / Fan-In Pipeline: Doubling Numbers Concurrently",
        difficulty: "Intermediate",
        description:
          "Combine fan-out and fan-in into a small pipeline: generate numbers 1-10 on one channel, fan them out to 4 worker goroutines that each double their number, then fan the doubled results back into a single channel. Sum everything received and print the total.",
        starterCode: `package main
 
import (
	"fmt"
	"sync"
)
 
func generator(nums ...int) <-chan int {
	out := make(chan int)
	go func() {
		defer close(out)
		for _, n := range nums {
			out <- n
		}
	}()
	return out
}
 
func double(input <-chan int, workerCount int) <-chan int {
	output := make(chan int)
	var wg sync.WaitGroup
	// Fan out: workerCount goroutines double each value from input
	// Fan in: close output once all workers are done
	return output
}
 
func main() {
	nums := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
	input := generator(nums...)
	output := double(input, 4)
 
	total := 0
	for v := range output {
		total += v
	}
	fmt.Println("Total:", total)
}`,
        solution: `package main
 
import (
	"fmt"
	"sync"
)
 
func generator(nums ...int) <-chan int {
	out := make(chan int)
	go func() {
		defer close(out)
		for _, n := range nums {
			out <- n
		}
	}()
	return out
}
 
func double(input <-chan int, workerCount int) <-chan int {
	output := make(chan int)
	var wg sync.WaitGroup
 
	for i := 0; i < workerCount; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			for n := range input {
				output <- n * 2
			}
		}()
	}
 
	go func() {
		wg.Wait()
		close(output)
	}()
 
	return output
}
 
func main() {
	nums := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
	input := generator(nums...)
	output := double(input, 4)
 
	total := 0
	for v := range output {
		total += v
	}
	fmt.Println("Total:", total)
}`,
        hints: [
          "This exercise combines everything: generator produces values, double fans them out to 4 workers, and the same function fans the results back in.",
          "The final total should always be 110 (twice the sum of 1 through 10), even though the order of processing is nondeterministic.",
          "Pipelines like this — a chain of stages connected by channels — are a hallmark of idiomatic Go concurrency.",
        ],
        tags: ["fan-out", "fan-in", "channels", "goroutines", "pipeline"],
        interviewQuestions: [
          "Why does the final total remain deterministic (110) even though the internal processing order isn't?",
          "What would you change to add a third pipeline stage after double, say one that filters out odd results?",
          "What are the benefits of structuring concurrent code as a pipeline of small, composable stages?",
        ],
      },
      {
        id: 20,
        title: "Worker Pool: Processing Text Jobs",
        difficulty: "Intermediate",
        description:
          'Implement a worker pool with 2 workers that process string jobs from a jobs channel. Each worker reverses the string (write a helper reverse(s string) string) and sends the result to a results channel. Send the words "go", "channels", "worker", "pool" and collect and print all 4 results.',
        starterCode: `package main
 
import "fmt"
 
func reverse(s string) string {
	runes := []rune(s)
	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		runes[i], runes[j] = runes[j], runes[i]
	}
	return string(runes)
}
 
func worker(jobs <-chan string, results chan<- string) {
	// Reverse each job and send it to results
}
 
func main() {
	jobs := make(chan string, 4)
	results := make(chan string, 4)
	// Launch 2 workers, send the 4 words, collect results
}`,
        solution: `package main
 
import "fmt"
 
func reverse(s string) string {
	runes := []rune(s)
	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		runes[i], runes[j] = runes[j], runes[i]
	}
	return string(runes)
}
 
func worker(jobs <-chan string, results chan<- string) {
	for j := range jobs {
		results <- reverse(j)
	}
}
 
func main() {
	jobs := make(chan string, 4)
	results := make(chan string, 4)
 
	for w := 1; w <= 2; w++ {
		go worker(jobs, results)
	}
 
	words := []string{"go", "channels", "worker", "pool"}
	for _, w := range words {
		jobs <- w
	}
	close(jobs)
 
	for i := 0; i < len(words); i++ {
		fmt.Println(<-results)
	}
}`,
        hints: [
          "The worker pool structure here is identical to squaring numbers — only the job type and processing logic changed.",
          "Closing jobs after sending all words tells every worker's range loop to stop once the channel is drained.",
          "Because 2 workers race to pull from jobs, the order results arrive in isn't guaranteed to match the order words were sent.",
        ],
        tags: ["worker pool", "channels", "goroutines", "strings"],
        interviewQuestions: [
          "What has to change if you wanted to reuse this exact worker pool structure for a completely different job type, like processing images?",
          "Why is len(words) used as the loop bound when collecting results instead of ranging over results directly?",
          "What would happen if you forgot to close(jobs) in this program?",
        ],
      },
      {
        id: 21,
        title: "Directional Channels Revisited: Type-Safe Pipeline Stage",
        difficulty: "Intermediate",
        description:
          "Write a function `doubleStage(input <-chan int) <-chan int` that reads each value from input, doubles it, sends it to a new output channel, and closes output once input is exhausted — all using directional channel types in the signature. Feed it values 1-4 from a generator and print the doubled results.",
        starterCode: `package main
 
import "fmt"
 
func generator(nums ...int) <-chan int {
	out := make(chan int)
	go func() {
		defer close(out)
		for _, n := range nums {
			out <- n
		}
	}()
	return out
}
 
func doubleStage(input <-chan int) <-chan int {
	// Read from input, double each value, send to a new output channel, close it when done
}
 
func main() {
	nums := generator(1, 2, 3, 4)
	for v := range doubleStage(nums) {
		fmt.Println(v)
	}
}`,
        solution: `package main
 
import "fmt"
 
func generator(nums ...int) <-chan int {
	out := make(chan int)
	go func() {
		defer close(out)
		for _, n := range nums {
			out <- n
		}
	}()
	return out
}
 
func doubleStage(input <-chan int) <-chan int {
	output := make(chan int)
	go func() {
		defer close(output)
		for n := range input {
			output <- n * 2
		}
	}()
	return output
}
 
func main() {
	nums := generator(1, 2, 3, 4)
	for v := range doubleStage(nums) {
		fmt.Println(v)
	}
}`,
        hints: [
          "input <-chan int means doubleStage can only receive from it, guaranteeing at compile time it won't accidentally try to send.",
          "The returned channel is also receive-only (<-chan int) from the caller's perspective, even though it's created as a regular chan int inside the function.",
          "This 'stage' pattern — receive-only in, receive-only out — is the basic building block of Go concurrency pipelines.",
        ],
        tags: ["directional channels", "channels", "pipeline"],
        interviewQuestions: [
          "Why is it good practice for a pipeline stage function to return <-chan int rather than a plain chan int?",
          "Can you assign a chan int value to a variable of type <-chan int? What about the reverse?",
          "How would you chain three of these stage functions together to build a longer pipeline?",
        ],
      },
      {
        id: 22,
        title: "context.Context: Ticking Loop with Timeout",
        difficulty: "Intermediate",
        description:
          'Write a function tick(ctx context.Context) that prints "tick" every 30ms in a loop, stopping as soon as ctx\'s deadline is reached. In main, create a context with a 100ms timeout and call tick(ctx), then print "done" after it returns.',
        starterCode: `package main
 
import (
	"context"
	"fmt"
	"time"
)
 
func tick(ctx context.Context) {
	// Print "tick" every 30ms until ctx is done
}
 
func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
	defer cancel()
 
	tick(ctx)
	fmt.Println("done")
}`,
        solution: `package main
 
import (
	"context"
	"fmt"
	"time"
)
 
func tick(ctx context.Context) {
	for {
		select {
		case <-ctx.Done():
			return
		case <-time.After(30 * time.Millisecond):
			fmt.Println("tick")
		}
	}
}
 
func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
	defer cancel()
 
	tick(ctx)
	fmt.Println("done")
}`,
        hints: [
          "Each loop iteration races ctx.Done() against a fresh 30ms timer created by time.After.",
          "Once the context's 100ms timeout elapses, ctx.Done()'s channel becomes ready and the function returns.",
          "You should see roughly 3 'tick' prints before 'done', though exact timing can vary slightly.",
        ],
        tags: ["context.Context", "select", "timeout", "cancellation"],
        interviewQuestions: [
          "Why does tick use select instead of just a plain for loop with time.Sleep?",
          "What's the difference between context.WithTimeout and context.WithCancel in terms of when ctx.Done() fires?",
          "Is it safe to call ctx.Done() multiple times across different select statements?",
        ],
      },
    ],
  },

  {
    id: 4,
    level: "Intermediate",
    icon: "Cpu",
    title: "Goroutines & Channels",
    summary:
      "Master Go's concurrency model: lightweight goroutines, typed channels, select statements, WaitGroups, Mutexes, and common patterns like fan-out/fan-in.",
    topics: [],
    excersice: [
      {
        id: 3,
        title: "Interface Embedding — Composable Behaviors",
        difficulty: "Intermediate",
        description:
          "Define two small interfaces, `Walker` (Walk() string) and `Swimmer` (Swim() string). Create a composite interface `Amphibian` that embeds both. Implement `Frog` so it satisfies `Amphibian`, then call both methods through the `Amphibian` variable.",
        starterCode: `package main
 
import "fmt"
 
type Walker interface {
	Walk() string
}
 
type Swimmer interface {
	Swim() string
}
 
type Amphibian interface {
	// Embed Walker and Swimmer here
}
 
type Frog struct{ Name string }
 
// Implement Walk and Swim for Frog so it satisfies Amphibian
 
func main() {
	var a Amphibian = Frog{Name: "Kermit"}
	fmt.Println(a.Walk())
	fmt.Println(a.Swim())
}`,
        solution: `package main
 
import "fmt"
 
type Walker interface {
	Walk() string
}
 
type Swimmer interface {
	Swim() string
}
 
type Amphibian interface {
	Walker
	Swimmer
}
 
type Frog struct{ Name string }
 
func (f Frog) Walk() string { return f.Name + " hops along the ground" }
func (f Frog) Swim() string { return f.Name + " paddles through the water" }
 
func main() {
	var a Amphibian = Frog{Name: "Kermit"}
	fmt.Println(a.Walk())
	fmt.Println(a.Swim())
}`,
        hints: [
          "Embedding an interface inside another interface just unions their method sets — no special syntax beyond listing the name.",
          "Any type implementing Walk() string and Swim() string automatically satisfies Amphibian — there's nothing extra to declare.",
          "This is how io.ReadWriter is built from io.Reader + io.Writer in the standard library.",
        ],
        tags: ["interfaces", "embedding", "composition"],
        interviewQuestions: [
          "What is interface embedding and how does it differ from struct embedding?",
          "How does the standard library use interface embedding (e.g. io.ReadWriter, io.ReadWriteCloser)?",
          "Can an interface embed a type that has unexported methods from another package? What happens?",
        ],
      },
      {
        id: 4,
        title: "Struct Embedding & Method Promotion",
        difficulty: "Intermediate",
        description:
          "Define an `Engine` struct with a `Start() string` method. Embed `Engine` in a `Car` struct and call the promoted `Start()` method directly on a `Car` value. Then define `SportsCar` embedding `Car`, and give `SportsCar` its own `Start()` method that shadows the promoted one — but still calls the embedded version internally via `s.Car.Start()`.",
        starterCode: `package main
 
import "fmt"
 
type Engine struct{ HorsePower int }
 
func (e Engine) Start() string {
	return fmt.Sprintf("Engine starting with %d HP", e.HorsePower)
}
 
type Car struct {
	Engine
	Brand string
}
 
type SportsCar struct {
	Car
}
 
// Give SportsCar its own Start() that shadows Car's promoted Start(),
// but still calls the embedded Engine's Start() internally.
 
func main() {
	c := Car{Engine: Engine{HorsePower: 150}, Brand: "Sedan"}
	fmt.Println(c.Start()) // promoted method
 
	sc := SportsCar{Car: Car{Engine: Engine{HorsePower: 500}, Brand: "GT"}}
	fmt.Println(sc.Start()) // shadowed method
}`,
        solution: `package main
 
import "fmt"
 
type Engine struct{ HorsePower int }
 
func (e Engine) Start() string {
	return fmt.Sprintf("Engine starting with %d HP", e.HorsePower)
}
 
type Car struct {
	Engine
	Brand string
}
 
type SportsCar struct {
	Car
}
 
func (s SportsCar) Start() string {
	return "[SPORT MODE] " + s.Car.Start()
}
 
func main() {
	c := Car{Engine: Engine{HorsePower: 150}, Brand: "Sedan"}
	fmt.Println(c.Start())
 
	sc := SportsCar{Car: Car{Engine: Engine{HorsePower: 500}, Brand: "GT"}}
	fmt.Println(sc.Start())
}`,
        hints: [
          "Method promotion means c.Start() is shorthand for c.Engine.Start() — Go inserts the field access automatically.",
          "Defining Start() directly on SportsCar shadows the promoted Engine.Start() at that depth.",
          "You can still reach a shadowed method explicitly by naming the embedded field: s.Car.Start().",
        ],
        tags: ["struct embedding", "method promotion", "composition"],
        interviewQuestions: [
          "How is struct embedding different from classical inheritance?",
          "What happens if two embedded types at the same depth define a method with the same name and you call it unqualified?",
          "How would you explicitly call a shadowed promoted method?",
        ],
      },
      {
        id: 5,
        title: "Struct Embedding to Satisfy an Interface",
        difficulty: "Intermediate",
        description:
          "Define a `Logger` interface with `Log(msg string)`. Implement `ConsoleLogger` that satisfies it. Embed `ConsoleLogger` inside a `Service` struct so that `Service` automatically satisfies `Logger` without writing its own `Log` method. Write a function `run(l Logger)` and pass a `Service` value to it.",
        starterCode: `package main
 
import "fmt"
 
type Logger interface {
	Log(msg string)
}
 
type ConsoleLogger struct{}
 
func (ConsoleLogger) Log(msg string) {
	fmt.Println("[LOG]", msg)
}
 
type Service struct {
	// Embed ConsoleLogger here
	Name string
}
 
func run(l Logger) {
	l.Log("service starting")
}
 
func main() {
	s := Service{Name: "billing"}
	run(s)
}`,
        solution: `package main
 
import "fmt"
 
type Logger interface {
	Log(msg string)
}
 
type ConsoleLogger struct{}
 
func (ConsoleLogger) Log(msg string) {
	fmt.Println("[LOG]", msg)
}
 
type Service struct {
	ConsoleLogger
	Name string
}
 
func run(l Logger) {
	l.Log("service starting")
}
 
func main() {
	s := Service{Name: "billing"}
	run(s)
}`,
        hints: [
          "Embedding a type that already implements an interface promotes that implementation to the outer struct for free.",
          "This is a common Go idiom for adding default/optional behavior (loggers, mutexes, base handlers) without inheritance.",
          "If Service later defines its own Log method, that one wins — same shadowing rule as struct embedding.",
        ],
        tags: ["struct embedding", "interfaces", "composition"],
        interviewQuestions: [
          "How can struct embedding be used to satisfy an interface without explicitly implementing its methods?",
          "Why is this preferred over embedding-as-inheritance thinking in Go?",
          "What's a real standard-library example of this pattern (hint: sync.Mutex embedded in a struct)?",
        ],
      },
      {
        id: 6,
        title: "Empty Interface & Safe Type Assertions",
        difficulty: "Intermediate",
        description:
          "Write `printAll(items []interface{})` that prints each item with its concrete type using `%T`. Then write `safeDivide(a, b interface{}) (float64, bool)` that uses the comma-ok form of a type assertion to safely handle only `int` and `float64` operands, returning `(0, false)` for anything else instead of panicking.",
        starterCode: `package main
 
import "fmt"
 
func printAll(items []interface{}) {
	// Print each item's value and its %T type
}
 
func toFloat(v interface{}) (float64, bool) {
	// Use comma-ok type assertions for int and float64
	return 0, false
}
 
func safeDivide(a, b interface{}) (float64, bool) {
	af, ok1 := toFloat(a)
	bf, ok2 := toFloat(b)
	if !ok1 || !ok2 || bf == 0 {
		return 0, false
	}
	return af / bf, true
}
 
func main() {
	printAll([]interface{}{1, "two", 3.0, true})
	fmt.Println(safeDivide(10, 2))
	fmt.Println(safeDivide(10, "oops"))
}`,
        solution: `package main
 
import "fmt"
 
func printAll(items []interface{}) {
	for _, item := range items {
		fmt.Printf("value=%v type=%T\n", item, item)
	}
}
 
func toFloat(v interface{}) (float64, bool) {
	if i, ok := v.(int); ok {
		return float64(i), true
	}
	if f, ok := v.(float64); ok {
		return f, true
	}
	return 0, false
}
 
func safeDivide(a, b interface{}) (float64, bool) {
	af, ok1 := toFloat(a)
	bf, ok2 := toFloat(b)
	if !ok1 || !ok2 || bf == 0 {
		return 0, false
	}
	return af / bf, true
}
 
func main() {
	printAll([]interface{}{1, "two", 3.0, true})
	fmt.Println(safeDivide(10, 2))
	fmt.Println(safeDivide(10, "oops"))
}`,
        hints: [
          "The comma-ok form `v, ok := x.(T)` never panics — it just sets ok to false on mismatch.",
          "Without comma-ok, a bare `x.(T)` assertion panics at runtime if the concrete type doesn't match.",
          "interface{} (or `any` since Go 1.18) can hold a value of any type, but you lose static type information until you assert it back.",
        ],
        tags: ["empty interface", "any", "type assertion"],
        interviewQuestions: [
          "What's the difference between `x.(T)` and `x, ok := x.(T)`?",
          "When would you reach for `any`/interface{} instead of generics?",
          "What runtime cost does boxing a value into an interface{} carry?",
        ],
      },
      {
        id: 7,
        title: "Advanced Type Switches",
        difficulty: "Intermediate",
        description:
          "Write `classify(v interface{}) string` that: returns \"nil\" for a nil value, groups `int` and `int64` into one case returning \"whole number\", handles `string` and `[]int` separately, and falls back to a default case using `%T` for anything else.",
        starterCode: `package main
 
import "fmt"
 
func classify(v interface{}) string {
	// Type switch: nil, int/int64 together, string, []int, default
	return ""
}
 
func main() {
	fmt.Println(classify(nil))
	fmt.Println(classify(42))
	fmt.Println(classify(int64(42)))
	fmt.Println(classify("hello"))
	fmt.Println(classify([]int{1, 2, 3}))
	fmt.Println(classify(3.14))
}`,
        solution: `package main
 
import "fmt"
 
func classify(v interface{}) string {
	switch t := v.(type) {
	case nil:
		return "nil"
	case int, int64:
		return "whole number"
	case string:
		return fmt.Sprintf("string of length %d", len(t))
	case []int:
		return fmt.Sprintf("int slice with %d elements", len(t))
	default:
		return fmt.Sprintf("unhandled type %T", t)
	}
}
 
func main() {
	fmt.Println(classify(nil))
	fmt.Println(classify(42))
	fmt.Println(classify(int64(42)))
	fmt.Println(classify("hello"))
	fmt.Println(classify([]int{1, 2, 3}))
	fmt.Println(classify(3.14))
}`,
        hints: [
          "A `case nil:` in a type switch matches when the interface value itself is nil.",
          "When a case lists multiple types (case int, int64:), `t` inside that branch has the original interface type, not a concrete one.",
          "Type switches don't support fallthrough — each case is independent.",
        ],
        tags: ["type switch", "interfaces"],
        interviewQuestions: [
          "Why can't you use `t` as its concrete type when a case lists more than one type?",
          "How does a `case nil:` differ from checking `v == nil` on an interface directly?",
          "Does a type switch support `fallthrough` like a regular switch? Why or why not?",
        ],
      },
      {
        id: 8,
        title: "fmt.Stringer — Avoiding the Infinite Recursion Trap",
        difficulty: "Intermediate",
        description:
          "Given a `Point` struct, a naive `String() string` method that formats the struct using `fmt.Sprintf(\"%v\", p)` will recurse infinitely, because `%v` on a Stringer calls `String()` again. Fix the implementation so it formats the fields directly, then verify `fmt.Println(p)` prints correctly.",
        starterCode: `package main
 
import "fmt"
 
type Point struct{ X, Y int }
 
// BUG: this causes infinite recursion — fix it
func (p Point) String() string {
	return fmt.Sprintf("%v", p)
}
 
func main() {
	p := Point{X: 3, Y: 4}
	fmt.Println(p)
}`,
        solution: `package main
 
import "fmt"
 
type Point struct{ X, Y int }
 
func (p Point) String() string {
	return fmt.Sprintf("(%d, %d)", p.X, p.Y)
}
 
func main() {
	p := Point{X: 3, Y: 4}
	fmt.Println(p)
}`,
        hints: [
          "fmt.Sprintf(\"%v\", p) checks whether p implements Stringer and calls String() again — that's the recursion.",
          "Format the individual fields (p.X, p.Y) instead of formatting the whole struct value.",
          "A safe escape hatch when you must format the raw struct is to convert it to a named type without the method, e.g. type raw Point; fmt.Sprintf(\"%v\", raw(p)).",
        ],
        tags: ["Stringer", "fmt", "gotcha"],
        interviewQuestions: [
          "Why does fmt.Sprintf(\"%v\", p) inside p's own String() method cause infinite recursion?",
          "How would you safely print the default representation of a type from inside its own String() method?",
          "What interface does fmt check for before falling back to reflection-based formatting?",
        ],
      },
      {
        id: 9,
        title: "Custom Error Types",
        difficulty: "Intermediate",
        description:
          "Define a `ValidationError` struct with `Field` and `Msg` fields, and implement the `error` interface on `*ValidationError` (a pointer receiver). Write `validateAge(age int) error` that returns a `*ValidationError` when age is negative, and demonstrate extracting the concrete type back out with `errors.As`.",
        starterCode: `package main
 
import (
	"errors"
	"fmt"
)
 
type ValidationError struct {
	Field string
	Msg   string
}
 
// Implement Error() string on *ValidationError
 
func validateAge(age int) error {
	if age < 0 {
		return &ValidationError{Field: "age", Msg: "must not be negative"}
	}
	return nil
}
 
func main() {
	err := validateAge(-5)
	fmt.Println(err)
 
	var ve *ValidationError
	if errors.As(err, &ve) {
		fmt.Println("field:", ve.Field)
	}
}`,
        solution: `package main
 
import (
	"errors"
	"fmt"
)
 
type ValidationError struct {
	Field string
	Msg   string
}
 
func (e *ValidationError) Error() string {
	return fmt.Sprintf("validation failed on %s: %s", e.Field, e.Msg)
}
 
func validateAge(age int) error {
	if age < 0 {
		return &ValidationError{Field: "age", Msg: "must not be negative"}
	}
	return nil
}
 
func main() {
	err := validateAge(-5)
	fmt.Println(err)
 
	var ve *ValidationError
	if errors.As(err, &ve) {
		fmt.Println("field:", ve.Field)
	}
}`,
        hints: [
          "The built-in `error` interface only requires one method: Error() string.",
          "Any type with an Error() string method implicitly satisfies error — no explicit declaration needed.",
          "errors.As walks the error chain looking for a concrete type match and assigns it into the target pointer.",
        ],
        tags: ["error interface", "custom errors", "errors.As"],
        interviewQuestions: [
          "What single method must a type implement to satisfy the error interface?",
          "Why implement Error() on *ValidationError rather than ValidationError by value here?",
          "How does errors.As differ from a plain type assertion on an error?",
        ],
      },
      {
        id: 10,
        title: "Error Wrapping with %w and errors.Is",
        difficulty: "Intermediate",
        description:
          "Declare a sentinel error `ErrNotFound`. Write `fetchUser(id int) error` that wraps it with additional context using `fmt.Errorf(\"...: %w\", ErrNotFound)`. Write a second function that calls `fetchUser` and wraps its error again. Finally, use `errors.Is` at the top level to check whether the root cause was `ErrNotFound`, even through multiple layers of wrapping.",
        starterCode: `package main
 
import (
	"errors"
	"fmt"
)
 
var ErrNotFound = errors.New("not found")
 
func fetchUser(id int) error {
	// Wrap ErrNotFound with context about the id using %w
	return nil
}
 
func loadProfile(id int) error {
	// Call fetchUser, wrap its error with more context using %w
	return nil
}
 
func main() {
	err := loadProfile(42)
	fmt.Println(err)
	fmt.Println("is not found:", errors.Is(err, ErrNotFound))
}`,
        solution: `package main
 
import (
	"errors"
	"fmt"
)
 
var ErrNotFound = errors.New("not found")
 
func fetchUser(id int) error {
	return fmt.Errorf("fetchUser(%d): %w", id, ErrNotFound)
}
 
func loadProfile(id int) error {
	if err := fetchUser(id); err != nil {
		return fmt.Errorf("loadProfile(%d): %w", id, err)
	}
	return nil
}
 
func main() {
	err := loadProfile(42)
	fmt.Println(err)
	fmt.Println("is not found:", errors.Is(err, ErrNotFound))
}`,
        hints: [
          "%w (unlike %v) preserves a link back to the wrapped error so it can be unwrapped later.",
          "errors.Is walks the whole chain of wrapped errors calling Unwrap() until it finds a match or runs out of chain.",
          "You can wrap multiple times across function boundaries — the chain just gets longer.",
        ],
        tags: ["error wrapping", "errors.Is", "sentinel errors"],
        interviewQuestions: [
          "What's the difference between %v and %w in fmt.Errorf?",
          "How does errors.Is differ from errors.As?",
          "What method does a wrapped error need to implement for errors.Is/As to walk the chain?",
        ],
      },
      {
        id: 11,
        title: "Implementing io.Reader from Scratch",
        difficulty: "Advanced",
        description:
          "Implement a custom `UpperReader` that wraps another `io.Reader` and uppercases every byte it reads before returning it, without allocating a second buffer. Read(p []byte) should delegate to the wrapped reader, then transform `p` in place.",
        starterCode: `package main
 
import (
	"fmt"
	"io"
	"strings"
)
 
type UpperReader struct {
	r io.Reader
}
 
func (u *UpperReader) Read(p []byte) (int, error) {
	// Read from u.r into p, then uppercase the bytes actually read
	return 0, nil
}
 
func main() {
	src := strings.NewReader("hello, gophers!")
	u := &UpperReader{r: src}
 
	out, err := io.ReadAll(u)
	if err != nil {
		panic(err)
	}
	fmt.Println(string(out))
}`,
        solution: `package main
 
import (
	"fmt"
	"io"
	"strings"
)
 
type UpperReader struct {
	r io.Reader
}
 
func (u *UpperReader) Read(p []byte) (int, error) {
	n, err := u.r.Read(p)
	for i := 0; i < n; i++ {
		if p[i] >= 'a' && p[i] <= 'z' {
			p[i] -= 'a' - 'A'
		}
	}
	return n, err
}
 
func main() {
	src := strings.NewReader("hello, gophers!")
	u := &UpperReader{r: src}
 
	out, err := io.ReadAll(u)
	if err != nil {
		panic(err)
	}
	fmt.Println(string(out))
}`,
        hints: [
          "io.Reader's contract: Read(p []byte) (n int, err error) fills p with up to len(p) bytes and reports how many it actually wrote.",
          "Always transform only the first n bytes of p — the rest of the slice may contain stale data from a previous call.",
          "Propagate the underlying error (including io.EOF) unchanged so io.ReadAll/io.Copy know when to stop.",
        ],
        tags: ["io.Reader", "interfaces", "decorator pattern"],
        interviewQuestions: [
          "What are the exact semantics of the Read method's return values, especially around io.EOF?",
          "Why is it valid for Read to return n > 0 and a non-nil error in the same call?",
          "Why wrap an io.Reader instead of just returning a transformed string?",
        ],
      },
      {
        id: 12,
        title: "Implementing io.Writer from Scratch",
        difficulty: "Intermediate",
        description:
          "Implement a `CountingWriter` that satisfies `io.Writer` but discards the data — it only keeps a running total of bytes written. Use it with `fmt.Fprintf` to measure how many bytes a formatted string would occupy without allocating the string itself.",
        starterCode: `package main
 
import "fmt"
 
type CountingWriter struct {
	Count int
}
 
func (c *CountingWriter) Write(p []byte) (int, error) {
	// Count the bytes, discard the data, never return an error
	return 0, nil
}
 
func main() {
	cw := &CountingWriter{}
	fmt.Fprintf(cw, "Hello, %s! You are %d years old.\n", "Ankit", 30)
	fmt.Println("bytes written:", cw.Count)
}`,
        solution: `package main
 
import "fmt"
 
type CountingWriter struct {
	Count int
}
 
func (c *CountingWriter) Write(p []byte) (int, error) {
	c.Count += len(p)
	return len(p), nil
}
 
func main() {
	cw := &CountingWriter{}
	fmt.Fprintf(cw, "Hello, %s! You are %d years old.\n", "Ankit", 30)
	fmt.Println("bytes written:", cw.Count)
}`,
        hints: [
          "io.Writer's contract: Write(p []byte) (n int, err error) must return n == len(p) if it successfully consumed everything.",
          "Any function accepting io.Writer (fmt.Fprintf, json.NewEncoder, gzip.NewWriter, etc.) works with your custom type for free.",
          "This exact pattern is how you'd measure size before allocating, e.g. sizing a buffer ahead of time.",
        ],
        tags: ["io.Writer", "interfaces"],
        interviewQuestions: [
          "What must Write return if it successfully wrote all of p?",
          "Why can fmt.Fprintf accept any io.Writer instead of only *os.File?",
          "What's the difference between io.Writer and io.Discard?",
        ],
      },
      {
        id: 13,
        title: "io.Copy Between Custom Reader and Writer",
        difficulty: "Intermediate",
        description:
          "Wire together a `strings.Reader` (source) and a `bytes.Buffer` (destination) using `io.Copy`, then do it again but route the copy through your own `CountingWriter` from the previous exercise wrapped alongside a `bytes.Buffer` using `io.MultiWriter`, so the data is both captured and counted in a single pass.",
        starterCode: `package main
 
import (
	"bytes"
	"fmt"
	"io"
	"strings"
)
 
type CountingWriter struct{ Count int }
 
func (c *CountingWriter) Write(p []byte) (int, error) {
	c.Count += len(p)
	return len(p), nil
}
 
func main() {
	src := strings.NewReader("streaming this through io.Copy")
 
	var buf bytes.Buffer
	cw := &CountingWriter{}
 
	// Use io.MultiWriter to copy src into both buf and cw in one io.Copy call
	dst := io.Writer(nil) // TODO: replace with io.MultiWriter(...)
 
	n, err := io.Copy(dst, src)
	if err != nil {
		panic(err)
	}
	fmt.Println("bytes copied:", n)
	fmt.Println("buffer contents:", buf.String())
	fmt.Println("counted bytes:", cw.Count)
}`,
        solution: `package main
 
import (
	"bytes"
	"fmt"
	"io"
	"strings"
)
 
type CountingWriter struct{ Count int }
 
func (c *CountingWriter) Write(p []byte) (int, error) {
	c.Count += len(p)
	return len(p), nil
}
 
func main() {
	src := strings.NewReader("streaming this through io.Copy")
 
	var buf bytes.Buffer
	cw := &CountingWriter{}
 
	dst := io.MultiWriter(&buf, cw)
 
	n, err := io.Copy(dst, src)
	if err != nil {
		panic(err)
	}
	fmt.Println("bytes copied:", n)
	fmt.Println("buffer contents:", buf.String())
	fmt.Println("counted bytes:", cw.Count)
}`,
        hints: [
          "io.Copy only needs the source to satisfy io.Reader and the destination to satisfy io.Writer — concrete types don't matter.",
          "io.MultiWriter fans a single Write out to several writers, stopping at the first error.",
          "This is exactly how the standard library composes small pieces (buffers, hashes, counters, network conns) into pipelines.",
        ],
        tags: ["io.Copy", "io.MultiWriter", "composition"],
        interviewQuestions: [
          "Why does io.Copy work with any pair of types instead of just files?",
          "What does io.MultiWriter do if one of the underlying writers returns an error?",
          "How would you compute a checksum while writing data, in a single pass, using this pattern?",
        ],
      },
      {
        id: 14,
        title: "Composite Interfaces — Building an In-Memory io.ReadWriteCloser",
        difficulty: "Advanced",
        description:
          "Implement a `MemFile` type backed by a `[]byte` and a read cursor that satisfies `io.ReadWriteCloser` (Read, Write, and Close). Writing appends to the backing slice; reading advances the cursor; Close marks it closed and makes further reads/writes return an error.",
        starterCode: `package main
 
import (
	"errors"
	"fmt"
	"io"
)
 
var ErrClosed = errors.New("memfile: already closed")
 
type MemFile struct {
	data   []byte
	cursor int
	closed bool
}
 
func (m *MemFile) Read(p []byte) (int, error) {
	// Return io.EOF when cursor reaches len(data); return ErrClosed if closed
	return 0, nil
}
 
func (m *MemFile) Write(p []byte) (int, error) {
	// Append p to data; return ErrClosed if closed
	return 0, nil
}
 
func (m *MemFile) Close() error {
	// Mark closed; return ErrClosed if already closed
	return nil
}
 
func main() {
	var f io.ReadWriteCloser = &MemFile{}
	f.Write([]byte("hello memfile"))
 
	buf := make([]byte, 5)
	n, _ := f.Read(buf)
	fmt.Println(string(buf[:n]))
 
	f.Close()
	_, err := f.Read(buf)
	fmt.Println("after close:", err)
}`,
        solution: `package main
 
import (
	"errors"
	"fmt"
	"io"
)
 
var ErrClosed = errors.New("memfile: already closed")
 
type MemFile struct {
	data   []byte
	cursor int
	closed bool
}
 
func (m *MemFile) Read(p []byte) (int, error) {
	if m.closed {
		return 0, ErrClosed
	}
	if m.cursor >= len(m.data) {
		return 0, io.EOF
	}
	n := copy(p, m.data[m.cursor:])
	m.cursor += n
	return n, nil
}
 
func (m *MemFile) Write(p []byte) (int, error) {
	if m.closed {
		return 0, ErrClosed
	}
	m.data = append(m.data, p...)
	return len(p), nil
}
 
func (m *MemFile) Close() error {
	if m.closed {
		return ErrClosed
	}
	m.closed = true
	return nil
}
 
func main() {
	var f io.ReadWriteCloser = &MemFile{}
	f.Write([]byte("hello memfile"))
 
	buf := make([]byte, 5)
	n, _ := f.Read(buf)
	fmt.Println(string(buf[:n]))
 
	f.Close()
	_, err := f.Read(buf)
	fmt.Println("after close:", err)
}`,
        hints: [
          "io.ReadWriteCloser is just io.Reader + io.Writer + io.Closer embedded together — implement all three methods and you're done.",
          "copy(dst, src) returns the number of bytes actually copied, which is exactly what Read needs to return.",
          "Guard every method with the closed flag so behavior after Close() is well-defined instead of silently corrupting state.",
        ],
        tags: ["io.ReadWriteCloser", "io.Closer", "composite interfaces"],
        interviewQuestions: [
          "What three interfaces make up io.ReadWriteCloser?",
          "Why should Read return io.EOF instead of a custom 'end of data' error?",
          "What's the convention for calling Close() more than once — should it error or be idempotent, and why might libraries differ?",
        ],
      },
      {
        id: 15,
        title: "Reader Chaining — Building a Mini io.TeeReader",
        difficulty: "Advanced",
        description:
          "Without using the standard library's `io.TeeReader`, implement your own `teeReader` that wraps an `io.Reader` and an `io.Writer`: every time `Read` is called, the bytes read are also written to the writer, before being returned to the caller. Use it to read from a string while simultaneously logging everything read into a buffer.",
        starterCode: `package main
 
import (
	"bytes"
	"fmt"
	"io"
	"strings"
)
 
type teeReader struct {
	r io.Reader
	w io.Writer
}
 
func (t *teeReader) Read(p []byte) (int, error) {
	// Read from t.r into p, write the bytes read to t.w, then return
	return 0, nil
}
 
func main() {
	src := strings.NewReader("data flowing through the pipe")
	var log bytes.Buffer
 
	tr := &teeReader{r: src, w: &log}
	out, _ := io.ReadAll(tr)
 
	fmt.Println("read:", string(out))
	fmt.Println("logged:", log.String())
}`,
        solution: `package main
 
import (
	"bytes"
	"fmt"
	"io"
	"strings"
)
 
type teeReader struct {
	r io.Reader
	w io.Writer
}
 
func (t *teeReader) Read(p []byte) (int, error) {
	n, err := t.r.Read(p)
	if n > 0 {
		if _, werr := t.w.Write(p[:n]); werr != nil {
			return n, werr
		}
	}
	return n, err
}
 
func main() {
	src := strings.NewReader("data flowing through the pipe")
	var log bytes.Buffer
 
	tr := &teeReader{r: src, w: &log}
	out, _ := io.ReadAll(tr)
 
	fmt.Println("read:", string(out))
	fmt.Println("logged:", log.String())
}`,
        hints: [
          "Only write the slice p[:n], not the whole p — p may contain stale bytes past n from a previous call.",
          "If the write to the tee destination fails, that error takes priority over the read's own error for that call.",
          "This is precisely what the standard library's io.TeeReader does — you've just reimplemented it.",
        ],
        tags: ["io.Reader", "io.Writer", "decorator pattern"],
        interviewQuestions: [
          "What real-world use case would you use a TeeReader for (hint: logging a request body while still parsing it)?",
          "Why must you write p[:n] rather than the full buffer p?",
          "How is this pattern related to the Decorator design pattern?",
        ],
      },
      {
        id: 16,
        title: "sort.Interface — Implementing a Custom Sort",
        difficulty: "Intermediate",
        description:
          "Given a `Person` struct with `Name` and `Age`, define a `ByAge []Person` type that implements `sort.Interface` (`Len`, `Less`, `Swap`) so a slice of people can be sorted by age using `sort.Sort`.",
        starterCode: `package main
 
import (
	"fmt"
	"sort"
)
 
type Person struct {
	Name string
	Age  int
}
 
type ByAge []Person
 
// Implement Len, Less, and Swap for ByAge
 
func main() {
	people := []Person{
		{"Bob", 31},
		{"Alice", 25},
		{"Charlie", 45},
	}
 
	sort.Sort(ByAge(people))
	fmt.Println(people)
}`,
        solution: `package main
 
import (
	"fmt"
	"sort"
)
 
type Person struct {
	Name string
	Age  int
}
 
type ByAge []Person
 
func (a ByAge) Len() int           { return len(a) }
func (a ByAge) Less(i, j int) bool { return a[i].Age < a[j].Age }
func (a ByAge) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }
 
func main() {
	people := []Person{
		{"Bob", 31},
		{"Alice", 25},
		{"Charlie", 45},
	}
 
	sort.Sort(ByAge(people))
	fmt.Println(people)
}`,
        hints: [
          "sort.Interface needs exactly three methods: Len() int, Less(i, j int) bool, Swap(i, j int).",
          "Defining a named slice type (type ByAge []Person) lets you attach methods to it, since you can't add methods to []Person directly.",
          "Since Go 1.8 you can often skip this boilerplate with sort.Slice(people, func(i, j int) bool {...}) — but sort.Interface is still a classic interview topic.",
        ],
        tags: ["sort.Interface", "interfaces", "standard library"],
        interviewQuestions: [
          "What three methods does sort.Interface require?",
          "Why can't you add methods directly to the built-in []Person slice type?",
          "How does sort.Slice differ from sort.Sort under the hood?",
        ],
      },
      {
        id: 17,
        title: "The Nil Interface Gotcha",
        difficulty: "Advanced",
        description:
          "Reproduce Go's classic nil-interface pitfall: a function declares `var e *MyError = nil` and returns it as an `error`. Even though the pointer is nil, the returned `error` interface is NOT nil (because it carries type information), so `if err != nil` incorrectly evaluates to true. Fix the function so it returns a truly nil error when there's no failure.",
        starterCode: `package main
 
import "fmt"
 
type MyError struct{ msg string }
 
func (e *MyError) Error() string { return e.msg }
 
func mayFail(fail bool) error {
	var e *MyError
	if fail {
		e = &MyError{msg: "something broke"}
	}
	return e // BUG: always non-nil as an interface, even when e is nil
}
 
func main() {
	err := mayFail(false)
	if err != nil {
		fmt.Println("got an error (unexpectedly!):", err)
	} else {
		fmt.Println("no error")
	}
}`,
        solution: `package main
 
import "fmt"
 
type MyError struct{ msg string }
 
func (e *MyError) Error() string { return e.msg }
 
func mayFail(fail bool) error {
	if fail {
		return &MyError{msg: "something broke"}
	}
	return nil // explicit nil interface, not a nil *MyError wrapped in an interface
}
 
func main() {
	err := mayFail(false)
	if err != nil {
		fmt.Println("got an error (unexpectedly!):", err)
	} else {
		fmt.Println("no error")
	}
}`,
        hints: [
          "An interface value is a (type, value) pair. A nil *MyError still has a non-nil type, so the interface itself isn't nil.",
          "Always return the interface's zero value (nil) directly from an error-returning function, rather than a typed nil pointer.",
          "This bug is one of the most commonly cited Go interview gotchas — know it cold.",
        ],
        tags: ["nil interface", "gotcha", "error interface"],
        interviewQuestions: [
          "Why is a nil *MyError, when returned as an error, not equal to nil?",
          "How would you detect this bug using reflection or testing?",
          "What's the general rule for avoiding this pitfall in your own APIs?",
        ],
      },
      {
        id: 18,
        title: "Compile-Time Interface Satisfaction Checks",
        difficulty: "Intermediate",
        description:
          "Add compile-time assertions (the `var _ Interface = (*Type)(nil)` idiom) for two custom types against `io.Reader` and `io.Writer`, so that if either type ever stops satisfying its interface, the code fails to compile immediately instead of failing at a distant call site.",
        starterCode: `package main
 
import (
	"fmt"
	"io"
)
 
type NullReader struct{}
 
func (NullReader) Read(p []byte) (int, error) { return 0, io.EOF }
 
type NullWriter struct{}
 
func (NullWriter) Write(p []byte) (int, error) { return len(p), nil }
 
// Add compile-time assertions here that NullReader satisfies io.Reader
// and NullWriter satisfies io.Writer
 
func main() {
	fmt.Println("compiled successfully")
}`,
        solution: `package main
 
import (
	"fmt"
	"io"
)
 
type NullReader struct{}
 
func (NullReader) Read(p []byte) (int, error) { return 0, io.EOF }
 
type NullWriter struct{}
 
func (NullWriter) Write(p []byte) (int, error) { return len(p), nil }
 
var _ io.Reader = (*NullReader)(nil)
var _ io.Writer = (*NullWriter)(nil)
 
func main() {
	fmt.Println("compiled successfully")
}`,
        hints: [
          "`var _ Interface = (*Type)(nil)` creates a discarded variable purely to force the compiler to check interface satisfaction.",
          "This costs nothing at runtime — the blank identifier means the value is never actually used.",
          "Place these near the type definition so a broken implementation surfaces immediately, not at some unrelated call site months later.",
        ],
        tags: ["interfaces", "compile-time checks", "idioms"],
        interviewQuestions: [
          "What does `var _ io.Reader = (*T)(nil)` actually accomplish?",
          "Why check against (*T)(nil) instead of T{}?",
          "When would you skip this idiom (hint: for types with an intentionally unstable or private interface contract)?",
        ],
      },
      {
        id: 19,
        title: "Value vs Pointer Receivers and Interface Satisfaction",
        difficulty: "Advanced",
        description:
          "Given a `Notifier` interface with `Notify()` implemented using a pointer receiver on `Alert` (because it needs to mutate a `sentCount` field), explain and fix the compile error that occurs when trying to assign a value (non-pointer) `Alert{}` to a `Notifier` variable.",
        starterCode: `package main
 
import "fmt"
 
type Notifier interface {
	Notify()
}
 
type Alert struct {
	Message   string
	sentCount int
}
 
func (a *Alert) Notify() {
	a.sentCount++
	fmt.Printf("sending %q (sent %d times)\n", a.Message, a.sentCount)
}
 
func main() {
	var n Notifier = Alert{Message: "disk usage high"} // won't compile — fix this line
	n.Notify()
}`,
        solution: `package main
 
import "fmt"
 
type Notifier interface {
	Notify()
}
 
type Alert struct {
	Message   string
	sentCount int
}
 
func (a *Alert) Notify() {
	a.sentCount++
	fmt.Printf("sending %q (sent %d times)\n", a.Message, a.sentCount)
}
 
func main() {
	var n Notifier = &Alert{Message: "disk usage high"} // use a pointer instead
	n.Notify()
}`,
        hints: [
          "Go's method sets: a pointer type *T includes methods with both value and pointer receivers; the value type T only includes value-receiver methods.",
          "Since Notify has a pointer receiver, only *Alert satisfies Notifier — Alert (by value) does not.",
          "This matters because a value-receiver method operates on a copy, which would silently make sentCount++ invisible to the caller — the pointer receiver is required here for correctness, not just to satisfy the interface.",
        ],
        tags: ["pointer receivers", "value receivers", "method sets", "interfaces"],
        interviewQuestions: [
          "What is the rule for which method set a value type vs a pointer type satisfies?",
          "Why does mutating state inside a method require a pointer receiver?",
          "If a struct is large, is there a performance reason to prefer pointer receivers even without mutation?",
        ],
      },
      {
        id: 20,
        title: "Interface Segregation — Splitting a Fat Interface",
        difficulty: "Intermediate",
        description:
          "You're given a single fat `Worker` interface with `Work()`, `Eat()`, and `Sleep()`, forcing a `Robot` type to implement irrelevant `Eat`/`Sleep` methods. Refactor it into small, focused interfaces (`Workable`, `Eater`, `Sleeper`) and have `Robot` implement only `Workable`, while a `Human` type implements all three by embedding the smaller interfaces where needed.",
        starterCode: `package main
 
import "fmt"
 
// BEFORE: a fat interface that forces irrelevant methods on Robot
type Worker interface {
	Work() string
	Eat() string
	Sleep() string
}
 
// TODO: split Worker into Workable, Eater, and Sleeper
 
type Robot struct{ ID string }
 
// Robot should only need to implement Work()
 
type Human struct{ Name string }
 
// Human implements Work, Eat, and Sleep
 
func main() {
	var w interface{ Work() string } = Robot{ID: "R2"}
	fmt.Println(w.Work())
}`,
        solution: `package main
 
import "fmt"
 
type Workable interface {
	Work() string
}
 
type Eater interface {
	Eat() string
}
 
type Sleeper interface {
	Sleep() string
}
 
type Worker interface {
	Workable
	Eater
	Sleeper
}
 
type Robot struct{ ID string }
 
func (r Robot) Work() string { return r.ID + " is welding parts" }
 
type Human struct{ Name string }
 
func (h Human) Work() string  { return h.Name + " is coding" }
func (h Human) Eat() string   { return h.Name + " is eating lunch" }
func (h Human) Sleep() string { return h.Name + " is sleeping" }
 
func main() {
	var w Workable = Robot{ID: "R2"}
	fmt.Println(w.Work())
 
	var full Worker = Human{Name: "Ankit"}
	fmt.Println(full.Work(), "|", full.Eat(), "|", full.Sleep())
}`,
        hints: [
          "Small, single-purpose interfaces (Workable, Eater, Sleeper) let each type implement exactly what it needs — this is the Interface Segregation Principle applied to Go.",
          "You can still compose the small interfaces back into a bigger one (Worker) via embedding for code that genuinely needs all three behaviors.",
          "Go's standard library follows this heavily: io.Reader, io.Writer, io.Closer are all tiny and composed as needed.",
        ],
        tags: ["interface segregation", "design principles", "embedding"],
        interviewQuestions: [
          "Why does Go favor many small interfaces over few large ones?",
          "How does this relate to the SOLID Interface Segregation Principle from OOP?",
          "Give an example from the standard library of small interfaces being composed into a larger one.",
        ],
      },
      {
        id: 21,
        title: "Package Organization — Exported vs Unexported Identifiers",
        difficulty: "Intermediate",
        description:
          "Design a small `user` package split across two files, exposing a clean public API. `NewUser` (exported constructor) should validate input using an unexported helper `validateEmail`, and the `User` struct's `email` field should be unexported with an exported `Email()` getter, so callers outside the package can't set an invalid address directly.",
        starterCode: `// file: user/user.go
package user
 
import (
	"errors"
	"strings"
)
 
type User struct {
	Name string
	// TODO: unexported email field
}
 
// TODO: unexported validateEmail helper
 
// TODO: exported NewUser constructor that validates and returns (*User, error)
 
// TODO: exported Email() getter
 
// file: main.go
package main
 
import (
	"fmt"
	"yourmodule/user"
)
 
func main() {
	u, err := user.NewUser("Ankit", "ankit@example.com")
	if err != nil {
		panic(err)
	}
	fmt.Println(u.Name, u.Email())
}`,
        solution: `// file: user/user.go
package user
 
import (
	"errors"
	"strings"
)
 
type User struct {
	Name  string
	email string
}
 
func validateEmail(email string) error {
	if !strings.Contains(email, "@") {
		return errors.New("invalid email address")
	}
	return nil
}
 
func NewUser(name, email string) (*User, error) {
	if err := validateEmail(email); err != nil {
		return nil, err
	}
	return &User{Name: name, email: email}, nil
}
 
func (u *User) Email() string {
	return u.email
}
 
// file: main.go
package main
 
import (
	"fmt"
	"yourmodule/user"
)
 
func main() {
	u, err := user.NewUser("Ankit", "ankit@example.com")
	if err != nil {
		panic(err)
	}
	fmt.Println(u.Name, u.Email())
}`,
        hints: [
          "Capitalized identifiers (User, NewUser, Email) are exported and visible outside the package; lowercase ones (email, validateEmail) are package-private.",
          "This is Go's only access-control mechanism — there's no `private`/`public` keyword, just the case of the first letter.",
          "Exposing a getter instead of the raw field lets the package enforce invariants (like 'email must be valid') that direct field access would bypass.",
        ],
        tags: ["packages", "exported identifiers", "encapsulation"],
        interviewQuestions: [
          "How does Go decide whether an identifier is exported, since there's no public/private keyword?",
          "Why put validation in a constructor function (NewUser) rather than relying on callers to build the struct literal directly?",
          "What happens if code outside the `user` package tries to access u.email directly?",
        ],
      },
      {
        id: 22,
        title: "Dependency Injection via Interfaces for Testability",
        difficulty: "Advanced",
        description:
          "Define a `Repository` interface with `Save(name string) error`. Build a `UserService` that depends on a `Repository` through its constructor (constructor injection) rather than a concrete database type. Write a `FakeRepository` used only in tests, and show that `UserService` can be exercised without any real database.",
        starterCode: `package main
 
import "fmt"
 
type Repository interface {
	Save(name string) error
}
 
type UserService struct {
	repo Repository
}
 
func NewUserService(repo Repository) *UserService {
	return &UserService{repo: repo}
}
 
func (s *UserService) Register(name string) error {
	if name == "" {
		return fmt.Errorf("name cannot be empty")
	}
	return s.repo.Save(name)
}
 
// TODO: define FakeRepository implementing Repository, storing names in a slice
// so it can be used in tests without touching a real database.
 
func main() {
	fake := &FakeRepository{}
	svc := NewUserService(fake)
 
	if err := svc.Register("Ankit"); err != nil {
		panic(err)
	}
	fmt.Println("saved names:", fake.Names)
}`,
        solution: `package main
 
import "fmt"
 
type Repository interface {
	Save(name string) error
}
 
type UserService struct {
	repo Repository
}
 
func NewUserService(repo Repository) *UserService {
	return &UserService{repo: repo}
}
 
func (s *UserService) Register(name string) error {
	if name == "" {
		return fmt.Errorf("name cannot be empty")
	}
	return s.repo.Save(name)
}
 
type FakeRepository struct {
	Names []string
}
 
func (f *FakeRepository) Save(name string) error {
	f.Names = append(f.Names, name)
	return nil
}
 
func main() {
	fake := &FakeRepository{}
	svc := NewUserService(fake)
 
	if err := svc.Register("Ankit"); err != nil {
		panic(err)
	}
	fmt.Println("saved names:", fake.Names)
}`,
        hints: [
          "UserService depends on the Repository interface, not on *sql.DB or any concrete store — that's what makes swapping in a fake trivial.",
          "In real Go test files, FakeRepository (or a similar mock) is exactly how you'd unit test UserService.Register without a real database connection.",
          "This pattern — accept an interface, return a struct — is one of the most repeated idioms in idiomatic Go APIs.",
        ],
        tags: ["dependency injection", "testability", "interfaces", "mocking"],
        interviewQuestions: [
          "Why does accepting an interface in a constructor make code easier to test?",
          "What's the Go proverb related to this pattern (\"accept interfaces, return ___\")?",
          "How would you extend FakeRepository to simulate a Save failure for testing error handling in Register?",
        ],
      },
      {
        id: 23,
        title: "Decorator Pattern with io.Writer — A Logging Writer",
        difficulty: "Advanced",
        description:
          "Implement a `loggingWriter` that wraps any `io.Writer`, logs the number of bytes on every write (e.g. to stdout), and then delegates the actual write to the wrapped writer. Chain it in front of a `bytes.Buffer` and confirm both the log output and the buffer's final contents are correct.",
        starterCode: `package main
 
import (
	"bytes"
	"fmt"
	"io"
)
 
type loggingWriter struct {
	w io.Writer
}
 
func (lw *loggingWriter) Write(p []byte) (int, error) {
	// Log len(p), then delegate the write to lw.w
	return 0, nil
}
 
func main() {
	var buf bytes.Buffer
	lw := &loggingWriter{w: &buf}
 
	fmt.Fprintln(lw, "first line")
	fmt.Fprintln(lw, "second line")
 
	fmt.Println("---")
	fmt.Println("final buffer contents:")
	fmt.Print(buf.String())
}`,
        solution: `package main
 
import (
	"bytes"
	"fmt"
	"io"
)
 
type loggingWriter struct {
	w io.Writer
}
 
func (lw *loggingWriter) Write(p []byte) (int, error) {
	fmt.Printf("[write] %d bytes\n", len(p))
	return lw.w.Write(p)
}
 
func main() {
	var buf bytes.Buffer
	lw := &loggingWriter{w: &buf}
 
	fmt.Fprintln(lw, "first line")
	fmt.Fprintln(lw, "second line")
 
	fmt.Println("---")
	fmt.Println("final buffer contents:")
	fmt.Print(buf.String())
}`,
        hints: [
          "loggingWriter satisfies io.Writer itself, so it can wrap any other io.Writer and be wrapped again by yet another decorator — this composes indefinitely.",
          "Always return exactly what the wrapped Write call returns, so callers relying on io.Writer's contract (n == len(p) on success) still get correct behavior.",
          "This is the same shape as http.ResponseWriter wrapping done by most Go web middleware libraries.",
        ],
        tags: ["io.Writer", "decorator pattern", "middleware"],
        interviewQuestions: [
          "How is this loggingWriter conceptually similar to HTTP middleware in Go web frameworks?",
          "Why should a decorator forward the exact (n, err) from the wrapped call rather than always returning (len(p), nil)?",
          "How would you build a chain of three decorators (logging, counting, and the real writer) together?",
        ],
      },

    ]
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
      {
        id: 3,
        title: "Numeric Constraints — Generic Sum",
        difficulty: "Advanced",
        description:
          "Define a `Number` constraint that permits any int or float underlying type (using `~`), then write `Sum[T Number](nums []T) T` that works for both `[]int` and `[]float64` without duplicating the function.",
        starterCode: `package main

    import "fmt"

    // TODO: define a Number constraint covering int/int64/float32/float64 (with ~)

    func Sum[T Number](nums []T) T {
    	// Sum the slice generically
    	var total T
    	return total
    }

    func main() {
    	fmt.Println(Sum([]int{1, 2, 3}))
    	fmt.Println(Sum([]float64{1.5, 2.5, 3.0}))
    }`,
        solution: `package main

    import "fmt"

    type Number interface {
    	~int | ~int8 | ~int16 | ~int32 | ~int64 |
    		~uint | ~uint8 | ~uint16 | ~uint32 | ~uint64 |
    		~float32 | ~float64
    }

    func Sum[T Number](nums []T) T {
    	var total T
    	for _, n := range nums {
    		total += n
    	}
    	return total
    }

    func main() {
    	fmt.Println(Sum([]int{1, 2, 3}))
    	fmt.Println(Sum([]float64{1.5, 2.5, 3.0}))
    }`,
        hints: [
          "A constraint is just an interface that lists the allowed underlying types with `|` as a union.",
          "The `~T` syntax means 'any type whose underlying type is T', so your own `type Score int` still satisfies `~int`.",
          "Without a constraint like this, `total += n` wouldn't compile because the compiler can't assume `any` supports `+`.",
        ],
        tags: ["generics", "constraints", "type parameters"],
        interviewQuestions: [
          "What does the `~` symbol mean in a type constraint?",
          "Why can't you write a generic Sum function using the `any` constraint?",
          "What's the difference between a union constraint like `int | float64` and an interface constraint with methods?",
        ],
      },
      {
        id: 4,
        title: "comparable Constraint — Generic Contains & IndexOf",
        difficulty: "Advanced",
        description:
          "Using the built-in `comparable` constraint, write `Contains[T comparable](s []T, v T) bool` and `IndexOf[T comparable](s []T, v T) int` (returning -1 if not found). Demonstrate both with a slice of ints and a slice of strings.",
        starterCode: `package main

    import "fmt"

    func Contains[T comparable](s []T, v T) bool {
    	// Return true if v is in s
    	return false
    }

    func IndexOf[T comparable](s []T, v T) int {
    	// Return the index of v in s, or -1
    	return -1
    }

    func main() {
    	nums := []int{10, 20, 30}
    	fmt.Println(Contains(nums, 20), IndexOf(nums, 20))

    	words := []string{"go", "rust", "zig"}
    	fmt.Println(Contains(words, "python"), IndexOf(words, "rust"))
    }`,
        solution: `package main

    import "fmt"

    func Contains[T comparable](s []T, v T) bool {
    	for _, item := range s {
    		if item == v {
    			return true
    		}
    	}
    	return false
    }

    func IndexOf[T comparable](s []T, v T) int {
    	for i, item := range s {
    		if item == v {
    			return i
    		}
    	}
    	return -1
    }

    func main() {
    	nums := []int{10, 20, 30}
    	fmt.Println(Contains(nums, 20), IndexOf(nums, 20))

    	words := []string{"go", "rust", "zig"}
    	fmt.Println(Contains(words, "python"), IndexOf(words, "rust"))
    }`,
        hints: [
          "`comparable` is a built-in constraint satisfied by any type that supports `==` and `!=`.",
          "Structs are comparable if all their fields are comparable; slices, maps, and functions are not.",
          "This single generic pair replaces what used to require a hand-written ContainsInt, ContainsString, etc. before Go 1.18.",
        ],
        tags: ["generics", "comparable", "constraints"],
        interviewQuestions: [
          "What does the comparable constraint guarantee about a type?",
          "Why can't you use comparable with a slice or map type parameter?",
          "How did code like this get written before Go 1.18 introduced generics?",
        ],
      },
      {
        id: 5,
        title: "Custom Ordered Constraint — Generic Max & Min",
        difficulty: "Advanced",
        description:
          "Define an `Ordered` constraint covering all int/float/string underlying types, then implement `Max[T Ordered](a, b T) T` and `Min[T Ordered](a, b T) T` that work across ints, floats, and strings (lexicographic comparison).",
        starterCode: `package main

    import "fmt"

    // TODO: define an Ordered constraint (ints, floats, strings)

    func Max[T Ordered](a, b T) T {
    	// Return the larger of a and b
    	return a
    }

    func Min[T Ordered](a, b T) T {
    	// Return the smaller of a and b
    	return a
    }

    func main() {
    	fmt.Println(Max(3, 7))
    	fmt.Println(Max(3.5, 1.2))
    	fmt.Println(Max("apple", "banana"))
    	fmt.Println(Min(3, 7))
    }`,
        solution: `package main

    import "fmt"

    type Ordered interface {
    	~int | ~int8 | ~int16 | ~int32 | ~int64 |
    		~uint | ~uint8 | ~uint16 | ~uint32 | ~uint64 |
    		~float32 | ~float64 | ~string
    }

    func Max[T Ordered](a, b T) T {
    	if a > b {
    		return a
    	}
    	return b
    }

    func Min[T Ordered](a, b T) T {
    	if a < b {
    		return a
    	}
    	return b
    }

    func main() {
    	fmt.Println(Max(3, 7))
    	fmt.Println(Max(3.5, 1.2))
    	fmt.Println(Max("apple", "banana"))
    	fmt.Println(Min(3, 7))
    }`,
        hints: [
          "`<` and `>` work on any type in the Ordered union, including string (which compares lexicographically byte by byte).",
          "This constraint is essentially what golang.org/x/exp/constraints.Ordered (and later the standard library's cmp.Ordered) provides.",
          "Since Go 1.21 there are built-in `min`/`max` functions — but implementing your own is a very common interview exercise.",
        ],
        tags: ["generics", "constraints", "Ordered"],
        interviewQuestions: [
          "Why does the Ordered constraint need to list every numeric type individually instead of just 'numbers'?",
          "How does Go compare strings under the hood — what does `>` mean for two strings?",
          "What's the relationship between this hand-rolled constraint and the standard library's cmp.Ordered?",
        ],
      },
      {
        id: 6,
        title: "Generic Map — Functional-Style Transform",
        difficulty: "Advanced",
        description:
          "Implement a generic `Map[T, U any](s []T, fn func(T) U) []U` that transforms a slice of one type into a slice of another, mirroring `map` from functional languages. Use it to convert `[]int` into `[]string`.",
        starterCode: `package main

    import (
    	"fmt"
    	"strconv"
    )

    func Map[T, U any](s []T, fn func(T) U) []U {
    	// Apply fn to every element and collect the results
    	return nil
    }

    func main() {
    	nums := []int{1, 2, 3, 4}

    	strs := Map(nums, func(n int) string {
    		return strconv.Itoa(n * n)
    	})

    	fmt.Println(strs)
    }`,
        solution: `package main

    import (
    	"fmt"
    	"strconv"
    )

    func Map[T, U any](s []T, fn func(T) U) []U {
    	result := make([]U, len(s))
    	for i, v := range s {
    		result[i] = fn(v)
    	}
    	return result
    }

    func main() {
    	nums := []int{1, 2, 3, 4}

    	strs := Map(nums, func(n int) string {
    		return strconv.Itoa(n * n)
    	})

    	fmt.Println(strs)
    }`,
        hints: [
          "Map needs two independent type parameters, T (input element) and U (output element) — they don't have to be related.",
          "Pre-allocating `make([]U, len(s))` avoids repeated reallocation compared to appending in a loop.",
          "This is the generic equivalent of writing a separate MapIntToString, MapIntToFloat, etc. for every pair of types.",
        ],
        tags: ["generics", "functional programming", "higher-order functions"],
        interviewQuestions: [
          "Why does Map need two type parameters instead of one?",
          "How would you constrain U if you needed its zero value to be printable?",
          "What's the performance trade-off of using function values (closures) here versus a hand-written loop?",
        ],
      },
      {
        id: 7,
        title: "Generic Filter and Reduce",
        difficulty: "Advanced",
        description:
          "Implement `Filter[T any](s []T, pred func(T) bool) []T` and `Reduce[T, U any](s []T, initial U, fn func(U, T) U) U`. Use them together to sum only the even numbers in a slice.",
        starterCode: `package main

    import "fmt"

    func Filter[T any](s []T, pred func(T) bool) []T {
    	// Keep only elements where pred returns true
    	return nil
    }

    func Reduce[T, U any](s []T, initial U, fn func(U, T) U) U {
    	// Fold the slice into a single accumulated value
    	return initial
    }

    func main() {
    	nums := []int{1, 2, 3, 4, 5, 6}

    	evens := Filter(nums, func(n int) bool { return n%2 == 0 })
    	sum := Reduce(evens, 0, func(acc, n int) int { return acc + n })

    	fmt.Println("evens:", evens)
    	fmt.Println("sum of evens:", sum)
    }`,
        solution: `package main

    import "fmt"

    func Filter[T any](s []T, pred func(T) bool) []T {
    	var result []T
    	for _, v := range s {
    		if pred(v) {
    			result = append(result, v)
    		}
    	}
    	return result
    }

    func Reduce[T, U any](s []T, initial U, fn func(U, T) U) U {
    	acc := initial
    	for _, v := range s {
    		acc = fn(acc, v)
    	}
    	return acc
    }

    func main() {
    	nums := []int{1, 2, 3, 4, 5, 6}

    	evens := Filter(nums, func(n int) bool { return n%2 == 0 })
    	sum := Reduce(evens, 0, func(acc, n int) int { return acc + n })

    	fmt.Println("evens:", evens)
    	fmt.Println("sum of evens:", sum)
    }`,
        hints: [
          "Filter's result starts as a nil slice — appending to a nil slice is perfectly valid in Go.",
          "Reduce's accumulator type U is independent of the element type T, so you could reduce a []string into an int (e.g. total length).",
          "Together, Map/Filter/Reduce form the classic functional trio, all made possible in Go only since generics landed in 1.18.",
        ],
        tags: ["generics", "functional programming", "Filter", "Reduce"],
        interviewQuestions: [
          "Why is it safe for Filter to return a nil slice for no matches instead of an empty slice?",
          "How would you chain Map, Filter, and Reduce together fluently in Go, given it lacks method chaining on slices?",
          "What's a case where Reduce is a better fit than a plain for-loop?",
        ],
      },
      {
        id: 8,
        title: "Multiple Type Parameters — Generic Pair & Zip",
        difficulty: "Advanced",
        description:
          "Define a generic `Pair[K, V any]` struct with `First K` and `Second V` fields. Write `Zip[K, V any](keys []K, values []V) []Pair[K, V]` that combines two slices element-wise, stopping at the shorter one.",
        starterCode: `package main

    import "fmt"

    type Pair[K, V any] struct {
    	First  K
    	Second V
    }

    func Zip[K, V any](keys []K, values []V) []Pair[K, V] {
    	// Combine keys[i] and values[i] into Pair{keys[i], values[i]}
    	return nil
    }

    func main() {
    	names := []string{"Alice", "Bob", "Charlie"}
    	ages := []int{30, 25}

    	pairs := Zip(names, ages)
    	fmt.Println(pairs)
    }`,
        solution: `package main

    import "fmt"

    type Pair[K, V any] struct {
    	First  K
    	Second V
    }

    func Zip[K, V any](keys []K, values []V) []Pair[K, V] {
    	n := len(keys)
    	if len(values) < n {
    		n = len(values)
    	}
    	result := make([]Pair[K, V], n)
    	for i := 0; i < n; i++ {
    		result[i] = Pair[K, V]{First: keys[i], Second: values[i]}
    	}
    	return result
    }

    func main() {
    	names := []string{"Alice", "Bob", "Charlie"}
    	ages := []int{30, 25}

    	pairs := Zip(names, ages)
    	fmt.Println(pairs)
    }`,
        hints: [
          "A generic struct declares its type parameters right after the name: type Pair[K, V any] struct {...}.",
          "When instantiating a generic struct explicitly you repeat the type arguments: Pair[K, V]{...}.",
          "Stopping at the shorter slice avoids an out-of-range panic — always guard against mismatched lengths in Zip-like functions.",
        ],
        tags: ["generics", "generic structs", "multiple type parameters"],
        interviewQuestions: [
          "How do you declare type parameters on a struct versus on a function?",
          "Why must Go usually infer type parameters from arguments rather than requiring you to write Zip[string, int](...)?",
          "What would you change if you wanted Zip to error instead of silently truncating on mismatched lengths?",
        ],
      },
      {
        id: 9,
        title: "Generic Set via map[T]struct{}",
        difficulty: "Advanced",
        description:
          "Implement a generic `Set[T comparable]` backed by `map[T]struct{}` (using the empty struct so it costs zero bytes per entry). Provide `Add(v T)`, `Has(v T) bool`, and `Items() []T`.",
        starterCode: `package main

    import "fmt"

    type Set[T comparable] struct {
    	items map[T]struct{}
    }

    func NewSet[T comparable]() *Set[T] {
    	// Initialize the underlying map
    	return nil
    }

    func (s *Set[T]) Add(v T) {
    	// Add v to the set
    }

    func (s *Set[T]) Has(v T) bool {
    	// Check membership
    	return false
    }

    func (s *Set[T]) Items() []T {
    	// Return all items as a slice (order not guaranteed)
    	return nil
    }

    func main() {
    	s := NewSet[string]()
    	s.Add("go")
    	s.Add("rust")
    	s.Add("go") // duplicate, ignored

    	fmt.Println(s.Has("go"), s.Has("python"))
    	fmt.Println(len(s.Items()))
    }`,
        solution: `package main

    import "fmt"

    type Set[T comparable] struct {
    	items map[T]struct{}
    }

    func NewSet[T comparable]() *Set[T] {
    	return &Set[T]{items: make(map[T]struct{})}
    }

    func (s *Set[T]) Add(v T) {
    	s.items[v] = struct{}{}
    }

    func (s *Set[T]) Has(v T) bool {
    	_, ok := s.items[v]
    	return ok
    }

    func (s *Set[T]) Items() []T {
    	result := make([]T, 0, len(s.items))
    	for k := range s.items {
    		result = append(result, k)
    	}
    	return result
    }

    func main() {
    	s := NewSet[string]()
    	s.Add("go")
    	s.Add("rust")
    	s.Add("go") // duplicate, ignored

    	fmt.Println(s.Has("go"), s.Has("python"))
    	fmt.Println(len(s.Items()))
    }`,
        hints: [
          "struct{} occupies zero bytes, making map[T]struct{} the idiomatic Go way to represent a set — cheaper than map[T]bool.",
          "A generic constructor function (NewSet[T]()) is the standard way to build a zero-valued generic type correctly, since a bare Set[T]{} would have a nil map.",
          "Set membership and Items() ordering is never guaranteed in Go — map iteration order is intentionally randomized.",
        ],
        tags: ["generics", "Set", "map[T]struct{}"],
        interviewQuestions: [
          "Why use map[T]struct{} instead of map[T]bool for a set?",
          "Why can't methods on a generic type declare additional type parameters of their own?",
          "Why is map iteration order randomized in Go, and what does that mean for Items() here?",
        ],
      },
      {
        id: 10,
        title: "Generic Queue (FIFO)",
        difficulty: "Advanced",
        description:
          "Implement a generic `Queue[T any]` (first-in, first-out) with `Enqueue(v T)`, `Dequeue() (T, bool)`, and `Len() int`, backed by a slice.",
        starterCode: `package main

    import "fmt"

    type Queue[T any] struct {
    	items []T
    }

    func (q *Queue[T]) Enqueue(v T) {
    	// Add to the back
    }

    func (q *Queue[T]) Dequeue() (T, bool) {
    	// Remove and return from the front
    	var zero T
    	return zero, false
    }

    func (q *Queue[T]) Len() int {
    	return len(q.items)
    }

    func main() {
    	var q Queue[int]
    	q.Enqueue(1)
    	q.Enqueue(2)
    	q.Enqueue(3)

    	for q.Len() > 0 {
    		v, _ := q.Dequeue()
    		fmt.Println(v)
    	}
    }`,
        solution: `package main

    import "fmt"

    type Queue[T any] struct {
    	items []T
    }

    func (q *Queue[T]) Enqueue(v T) {
    	q.items = append(q.items, v)
    }

    func (q *Queue[T]) Dequeue() (T, bool) {
    	var zero T
    	if len(q.items) == 0 {
    		return zero, false
    	}
    	front := q.items[0]
    	q.items = q.items[1:]
    	return front, true
    }

    func (q *Queue[T]) Len() int {
    	return len(q.items)
    }

    func main() {
    	var q Queue[int]
    	q.Enqueue(1)
    	q.Enqueue(2)
    	q.Enqueue(3)

    	for q.Len() > 0 {
    		v, _ := q.Dequeue()
    		fmt.Println(v)
    	}
    }`,
        hints: [
          "A zero-value Queue[T] (var q Queue[int]) is immediately usable since its nil slice supports append — no constructor required here, unlike the map-backed Set.",
          "Slicing off the front (q.items[1:]) is simple but O(n) per dequeue since it doesn't reclaim the underlying array — fine for teaching, worth mentioning as a real-world limitation.",
          "This is the FIFO counterpart to the Stack[T] (LIFO) exercise from an earlier topic — compare the two side by side.",
        ],
        tags: ["generics", "Queue", "data structures"],
        interviewQuestions: [
          "Why doesn't Queue[T] need a constructor the way Set[T] did?",
          "What's the time complexity of this Dequeue implementation, and how would you improve it for a high-throughput queue?",
          "How does a generic Queue[T] compare to using container/list from the standard library?",
        ],
      },
      {
        id: 11,
        title: "Table-Driven Tests with Error Cases",
        difficulty: "Advanced",
        description:
          "Write `Divide(a, b float64) (float64, error)` that returns an error on division by zero. Sketch a table-driven `TestDivide` (as a comment block, since real tests live in `_test.go` files) covering a normal case, a division-by-zero case, and a negative-number case, checking both the result and whether an error was expected.",
        starterCode: `package main

    import (
    	"errors"
    	"fmt"
    )

    var ErrDivByZero = errors.New("division by zero")

    func Divide(a, b float64) (float64, error) {
    	// Return ErrDivByZero when b == 0
    	return 0, nil
    }

    // Sketch a table-driven TestDivide as a comment block:
    // func TestDivide(t *testing.T) {
    //   tests := []struct{ ... }{ ... }
    //   for _, tt := range tests { t.Run(...) }
    // }

    func main() {
    	fmt.Println(Divide(10, 2))
    	fmt.Println(Divide(5, 0))
    }`,
        solution: `package main

    import (
    	"errors"
    	"fmt"
    )

    var ErrDivByZero = errors.New("division by zero")

    func Divide(a, b float64) (float64, error) {
    	if b == 0 {
    		return 0, ErrDivByZero
    	}
    	return a / b, nil
    }

    // Table-driven test (would live in divide_test.go):
    //
    // func TestDivide(t *testing.T) {
    // 	tests := []struct {
    // 		name    string
    // 		a, b    float64
    // 		want    float64
    // 		wantErr error
    // 	}{
    // 		{"normal", 10, 2, 5, nil},
    // 		{"by zero", 5, 0, 0, ErrDivByZero},
    // 		{"negative", -9, 3, -3, nil},
    // 	}
    // 	for _, tt := range tests {
    // 		t.Run(tt.name, func(t *testing.T) {
    // 			got, err := Divide(tt.a, tt.b)
    // 			if !errors.Is(err, tt.wantErr) {
    // 				t.Fatalf("Divide(%v, %v) error = %v, want %v", tt.a, tt.b, err, tt.wantErr)
    // 			}
    // 			if err == nil && got != tt.want {
    // 				t.Errorf("Divide(%v, %v) = %v, want %v", tt.a, tt.b, got, tt.want)
    // 			}
    // 		})
    // 	}
    // }

    func main() {
    	fmt.Println(Divide(10, 2))
    	fmt.Println(Divide(5, 0))
    }`,
        hints: [
          "Include a wantErr field in the test-case struct alongside want, so a single table can cover both success and failure paths.",
          "Use errors.Is(err, tt.wantErr) instead of err == tt.wantErr so the check still works if the error gets wrapped later.",
          "t.Fatalf stops that subtest immediately (useful when a wrong error makes checking the result meaningless), while t.Errorf lets the subtest continue and report more.",
        ],
        tags: ["testing", "table-driven", "error handling"],
        interviewQuestions: [
          "Why prefer errors.Is over direct equality when checking expected errors in a test table?",
          "What's the difference between t.Fatalf and t.Errorf?",
          "How would you extend this table to also assert on a specific error message substring?",
        ],
      },
      {
        id: 12,
        title: "Subtests with t.Run and t.Parallel",
        difficulty: "Advanced",
        description:
          "Sketch a test (as a comment block) for a `IsPalindrome(s string) bool` function that runs multiple subtests via `t.Run`, with each subtest calling `t.Parallel()` so they execute concurrently. Implement `IsPalindrome` itself as real, runnable code.",
        starterCode: `package main

    import "fmt"

    func IsPalindrome(s string) bool {
    	// Return true if s reads the same forwards and backwards
    	return false
    }

    // Sketch parallel subtests as a comment block:
    // func TestIsPalindrome(t *testing.T) {
    //   cases := []string{"level", "hello", "racecar"}
    //   for _, c := range cases {
    //     c := c // capture range variable (needed pre Go 1.22)
    //     t.Run(c, func(t *testing.T) {
    //       t.Parallel()
    //       ...
    //     })
    //   }
    // }

    func main() {
    	fmt.Println(IsPalindrome("level"))
    	fmt.Println(IsPalindrome("hello"))
    }`,
        solution: `package main

    import "fmt"

    func IsPalindrome(s string) bool {
    	for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
    		if s[i] != s[j] {
    			return false
    		}
    	}
    	return true
    }

    // Parallel subtests (would live in palindrome_test.go):
    //
    // func TestIsPalindrome(t *testing.T) {
    // 	cases := map[string]bool{
    // 		"level":   true,
    // 		"hello":   false,
    // 		"racecar": true,
    // 	}
    // 	for input, want := range cases {
    // 		input, want := input, want // capture loop variables (needed before Go 1.22)
    // 		t.Run(input, func(t *testing.T) {
    // 			t.Parallel()
    // 			if got := IsPalindrome(input); got != want {
    // 				t.Errorf("IsPalindrome(%q) = %v, want %v", input, got, want)
    // 			}
    // 		})
    // 	}
    // }

    func main() {
    	fmt.Println(IsPalindrome("level"))
    	fmt.Println(IsPalindrome("hello"))
    }`,
        hints: [
          "t.Parallel() marks a subtest to run concurrently with other parallel subtests in the same parent — the parent test function returns only after all of them finish.",
          "Before Go 1.22, loop variables were reused across iterations, so subtests capturing them for use inside a closure needed a local shadow copy (input, want := input, want); Go 1.22+ fixed this per-iteration scoping.",
          "t.Run gives each case its own named, individually reportable and individually re-runnable (`go test -run TestIsPalindrome/level`) test.",
        ],
        tags: ["testing", "subtests", "t.Parallel"],
        interviewQuestions: [
          "What does t.Parallel() actually do, and when do parallel subtests run relative to non-parallel ones?",
          "Why did loop variable capture used to require a workaround before Go 1.22?",
          "How would you run just one named subtest from the command line?",
        ],
      },
      {
        id: 13,
        title: "Test Setup and Teardown with TestMain",
        difficulty: "Advanced",
        description:
          "Sketch (as a comment block) a `TestMain(m *testing.M)` that performs one-time setup before all tests in a package run and cleanup afterward, wrapping `m.Run()` and using its exit code with `os.Exit`. Implement a small `Config` struct and `LoadConfig`/`Cleanup` functions as real, runnable code representing what TestMain would call.",
        starterCode: `package main

    import "fmt"

    type Config struct {
    	Initialized bool
    }

    func LoadConfig() *Config {
    	// Simulate one-time setup (e.g. spinning up a test database)
    	return nil
    }

    func (c *Config) Cleanup() {
    	// Simulate teardown
    }

    // Sketch TestMain as a comment block:
    // func TestMain(m *testing.M) {
    //   cfg := LoadConfig()
    //   code := m.Run()
    //   cfg.Cleanup()
    //   os.Exit(code)
    // }

    func main() {
    	cfg := LoadConfig()
    	fmt.Println("initialized:", cfg.Initialized)
    	cfg.Cleanup()
    }`,
        solution: `package main

    import "fmt"

    type Config struct {
    	Initialized bool
    }

    func LoadConfig() *Config {
    	fmt.Println("setting up shared test resources...")
    	return &Config{Initialized: true}
    }

    func (c *Config) Cleanup() {
    	fmt.Println("tearing down shared test resources...")
    	c.Initialized = false
    }

    // TestMain (would live in main_test.go), run once for the whole package:
    //
    // func TestMain(m *testing.M) {
    // 	cfg := LoadConfig()
    // 	code := m.Run() // runs every Test/Benchmark function in the package
    // 	cfg.Cleanup()
    // 	os.Exit(code) // must forward the real exit code so 'go test' reports failures correctly
    // }

    func main() {
    	cfg := LoadConfig()
    	fmt.Println("initialized:", cfg.Initialized)
    	cfg.Cleanup()
    }`,
        hints: [
          "TestMain replaces the default test runner for the whole package — if you define it, you're responsible for calling m.Run() yourself.",
          "Forgetting os.Exit(code) is a classic bug: without it, the process always exits 0, so CI would report tests as passing even when they failed.",
          "TestMain runs once per package, not once per test — use it for expensive shared setup like spinning up a test container, not per-test state.",
        ],
        tags: ["testing", "TestMain", "setup/teardown"],
        interviewQuestions: [
          "What happens if you define TestMain but forget to call os.Exit with m.Run()'s result?",
          "How many times does TestMain run relative to individual Test functions in a package?",
          "When would you use TestMain versus a per-test helper with t.Cleanup()?",
        ],
      },
      {
        id: 14,
        title: "Benchmarking with testing.B",
        difficulty: "Advanced",
        description:
          "Sketch (as a comment block) a benchmark `BenchmarkFibonacci` for a recursive `Fibonacci(n int) int` function, using `b.N` correctly and `b.ResetTimer()` to exclude setup cost. Implement `Fibonacci` as real, runnable code.",
        starterCode: `package main

    import "fmt"

    func Fibonacci(n int) int {
    	// Naive recursive Fibonacci
    	return 0
    }

    // Sketch a benchmark as a comment block:
    // func BenchmarkFibonacci(b *testing.B) {
    //   // expensive setup here, if any
    //   b.ResetTimer()
    //   for i := 0; i < b.N; i++ {
    //     Fibonacci(20)
    //   }
    // }

    func main() {
    	fmt.Println(Fibonacci(10))
    }`,
        solution: `package main

    import "fmt"

    func Fibonacci(n int) int {
    	if n < 2 {
    		return n
    	}
    	return Fibonacci(n-1) + Fibonacci(n-2)
    }

    // Benchmark (would live in fib_test.go):
    //
    // func BenchmarkFibonacci(b *testing.B) {
    // 	// any expensive one-time setup would go here
    // 	b.ResetTimer() // exclude the setup above from the timed portion
    // 	for i := 0; i < b.N; i++ {
    // 		Fibonacci(20)
    // 	}
    // }
    //
    // Run with: go test -bench=Fibonacci -benchmem

    func main() {
    	fmt.Println(Fibonacci(10))
    }`,
        hints: [
          "The testing framework calls your benchmark function repeatedly with increasing b.N until the timing is statistically stable — you never set b.N yourself.",
          "b.ResetTimer() zeroes the clock right before the loop, so any setup code above it doesn't skew the per-operation timing.",
          "`go test -bench=. -benchmem` also reports allocations per operation, which is often more revealing than raw speed.",
        ],
        tags: ["benchmarking", "testing.B", "performance"],
        interviewQuestions: [
          "What is b.N and who controls its value?",
          "Why would you call b.ResetTimer() partway through a benchmark function?",
          "What does the -benchmem flag add to benchmark output?",
        ],
      },
      {
        id: 15,
        title: "Sub-Benchmarks Comparing Two Implementations",
        difficulty: "Advanced",
        description:
          "Implement two ways to concatenate strings — naive `+=` concatenation and `strings.Builder` — then sketch (as a comment block) sub-benchmarks using `b.Run` to compare them side by side under `go test -bench`.",
        starterCode: `package main

    import (
    	"fmt"
    	"strings"
    )

    func ConcatNaive(parts []string) string {
    	// Concatenate using += in a loop
    	return ""
    }

    func ConcatBuilder(parts []string) string {
    	// Concatenate using strings.Builder
    	return ""
    }

    // Sketch sub-benchmarks as a comment block:
    // func BenchmarkConcat(b *testing.B) {
    //   parts := make([]string, 1000)
    //   ...
    //   b.Run("naive", func(b *testing.B) { ... })
    //   b.Run("builder", func(b *testing.B) { ... })
    // }

    func main() {
    	parts := []string{"go", "is", "fast"}
    	fmt.Println(ConcatNaive(parts))
    	fmt.Println(ConcatBuilder(parts))
    }`,
        solution: `package main

    import (
    	"fmt"
    	"strings"
    )

    func ConcatNaive(parts []string) string {
    	result := ""
    	for _, p := range parts {
    		result += p
    	}
    	return result
    }

    func ConcatBuilder(parts []string) string {
    	var b strings.Builder
    	for _, p := range parts {
    		b.WriteString(p)
    	}
    	return b.String()
    }

    // Sub-benchmarks (would live in concat_test.go):
    //
    // func BenchmarkConcat(b *testing.B) {
    // 	parts := make([]string, 1000)
    // 	for i := range parts {
    // 		parts[i] = "x"
    // 	}
    //
    // 	b.Run("naive", func(b *testing.B) {
    // 		for i := 0; i < b.N; i++ {
    // 			ConcatNaive(parts)
    // 		}
    // 	})
    //
    // 	b.Run("builder", func(b *testing.B) {
    // 		for i := 0; i < b.N; i++ {
    // 			ConcatBuilder(parts)
    // 		}
    // 	})
    // }
    //
    // Run with: go test -bench=BenchmarkConcat/ -benchmem

    func main() {
    	parts := []string{"go", "is", "fast"}
    	fmt.Println(ConcatNaive(parts))
    	fmt.Println(ConcatBuilder(parts))
    }`,
        hints: [
          "b.Run inside a benchmark works exactly like t.Run inside a test — it creates a named, separately reported sub-benchmark.",
          "ConcatNaive reallocates a new string on every += , making it O(n²) for n parts; strings.Builder grows a single internal buffer, making it O(n).",
          "Sub-benchmarks are the standard way to A/B two implementations without duplicating the whole benchmark file.",
        ],
        tags: ["benchmarking", "b.Run", "strings.Builder", "performance"],
        interviewQuestions: [
          "Why is naive string += concatenation in a loop asymptotically worse than using strings.Builder?",
          "What's the benefit of nesting benchmarks with b.Run instead of writing two top-level Benchmark functions?",
          "What other standard-library type besides strings.Builder helps avoid repeated allocations when building byte data?",
        ],
      },
      {
        id: 16,
        title: "CPU Profiling with pprof",
        difficulty: "Advanced",
        description:
          "Write a program that profiles its own CPU usage: start a CPU profile to a file using `runtime/pprof`, run a deliberately expensive computation, then stop the profile so it can later be inspected with `go tool pprof`.",
        starterCode: `package main

    import (
    	"fmt"
    	"os"
    	"runtime/pprof"
    )

    func expensiveWork() int {
    	sum := 0
    	for i := 0; i < 50_000_000; i++ {
    		sum += i % 7
    	}
    	return sum
    }

    func main() {
    	f, err := os.Create("cpu.prof")
    	if err != nil {
    		panic(err)
    	}
    	defer f.Close()

    	// TODO: start CPU profiling to f, run expensiveWork, then stop profiling

    	fmt.Println("profiling complete, see cpu.prof")
    }`,
        solution: `package main

    import (
    	"fmt"
    	"os"
    	"runtime/pprof"
    )

    func expensiveWork() int {
    	sum := 0
    	for i := 0; i < 50_000_000; i++ {
    		sum += i % 7
    	}
    	return sum
    }

    func main() {
    	f, err := os.Create("cpu.prof")
    	if err != nil {
    		panic(err)
    	}
    	defer f.Close()

    	if err := pprof.StartCPUProfile(f); err != nil {
    		panic(err)
    	}
    	defer pprof.StopCPUProfile()

    	result := expensiveWork()
    	fmt.Println("result:", result)
    	fmt.Println("profiling complete, see cpu.prof")
    }

    // Inspect afterward with:
    //   go tool pprof cpu.prof
    //   (pprof) top
    //   (pprof) web`,
        hints: [
          "pprof.StartCPUProfile writes samples to the given io.Writer at a fixed rate (100Hz by default) until StopCPUProfile is called.",
          "Always defer pprof.StopCPUProfile() right after a successful StartCPUProfile call, so the profile flushes even if something panics later.",
          "The resulting file is binary — inspect it with `go tool pprof cpu.prof`, not by opening it as text.",
        ],
        tags: ["pprof", "profiling", "performance"],
        interviewQuestions: [
          "What does runtime/pprof's CPU profiler actually sample, and at what rate by default?",
          "Why should StopCPUProfile be deferred immediately after StartCPUProfile succeeds?",
          "What's the difference between profiling like this versus enabling pprof over HTTP with net/http/pprof?",
        ],
      },
      {
        id: 17,
        title: "Memory (Heap) Profiling with pprof",
        difficulty: "Advanced",
        description:
          "Write a program that allocates a large number of objects, forces a garbage-collection pass with `runtime.GC()`, then writes a heap profile to a file with `pprof.WriteHeapProfile` so allocation hotspots can be inspected later.",
        starterCode: `package main

    import (
    	"fmt"
    	"os"
    	"runtime"
    	"runtime/pprof"
    )

    type Blob struct {
    	Data [1024]byte
    }

    func allocateLots() []*Blob {
    	blobs := make([]*Blob, 0, 10000)
    	for i := 0; i < 10000; i++ {
    		blobs = append(blobs, &Blob{})
    	}
    	return blobs
    }

    func main() {
    	blobs := allocateLots()
    	fmt.Println("allocated:", len(blobs))

    	// TODO: force a GC pass, then write a heap profile to "mem.prof"
    }`,
        solution: `package main

    import (
    	"fmt"
    	"os"
    	"runtime"
    	"runtime/pprof"
    )

    type Blob struct {
    	Data [1024]byte
    }

    func allocateLots() []*Blob {
    	blobs := make([]*Blob, 0, 10000)
    	for i := 0; i < 10000; i++ {
    		blobs = append(blobs, &Blob{})
    	}
    	return blobs
    }

    func main() {
    	blobs := allocateLots()
    	fmt.Println("allocated:", len(blobs))

    	runtime.GC() // get an up-to-date view of live heap objects

    	f, err := os.Create("mem.prof")
    	if err != nil {
    		panic(err)
    	}
    	defer f.Close()

    	if err := pprof.WriteHeapProfile(f); err != nil {
    		panic(err)
    	}
    	fmt.Println("heap profile written to mem.prof")
    }

    // Inspect afterward with:
    //   go tool pprof mem.prof
    //   (pprof) top
    //   (pprof) list allocateLots`,
        hints: [
          "runtime.GC() before writing the profile gives you a snapshot of what's actually still live, rather than transient garbage.",
          "pprof.WriteHeapProfile writes a single snapshot immediately — unlike CPU profiling, there's no Start/Stop pair.",
          "`go tool pprof -alloc_objects mem.prof` or `-inuse_space` let you pivot between 'total allocated over time' and 'currently live' views.",
        ],
        tags: ["pprof", "memory profiling", "performance"],
        interviewQuestions: [
          "Why call runtime.GC() before writing a heap profile?",
          "What's the difference between inuse_space and alloc_objects views in a heap profile?",
          "How would you use a heap profile to track down a memory leak in a long-running service?",
        ],
      },
      {
        id: 18,
        title: "Live Profiling with net/http/pprof",
        difficulty: "Advanced",
        description:
          "Wire up `net/http/pprof` so a running service exposes live profiling endpoints on a debug port, without touching your main application routes. Start the debug server in a goroutine so it doesn't block the rest of the program.",
        starterCode: `package main

    import (
    	"fmt"
    	"net/http"
    	"time"

    	// TODO: blank-import net/http/pprof to register its debug handlers
    )

    func startDebugServer() {
    	// TODO: serve the default mux on :6060 in a goroutine
    }

    func main() {
    	startDebugServer()

    	fmt.Println("app running; debug endpoints available at http://localhost:6060/debug/pprof/")
    	time.Sleep(2 * time.Second) // stand-in for real application work
    	fmt.Println("shutting down")
    }`,
        solution: `package main

    import (
    	"fmt"
    	"net/http"
    	"time"

    	_ "net/http/pprof" // registers /debug/pprof/* handlers on the default mux
    )

    func startDebugServer() {
    	go func() {
    		// Deliberately ignore the error here for the exercise; in production,
    		// log it or route it through your normal server-lifecycle error handling.
    		http.ListenAndServe("localhost:6060", nil)
    	}()
    }

    func main() {
    	startDebugServer()

    	fmt.Println("app running; debug endpoints available at http://localhost:6060/debug/pprof/")
    	time.Sleep(2 * time.Second) // stand-in for real application work
    	fmt.Println("shutting down")
    }`,
        hints: [
          "Blank-importing net/http/pprof (`_ \"net/http/pprof\"`) has the side effect of registering /debug/pprof/* handlers on http.DefaultServeMux — you don't call any of its functions directly.",
          "Run the debug server on a separate port from your main application traffic, and in real deployments, never expose it publicly without authentication.",
          "Once running, `go tool pprof http://localhost:6060/debug/pprof/profile?seconds=30` captures a live 30-second CPU profile from a running process.",
        ],
        tags: ["pprof", "net/http/pprof", "live profiling"],
        interviewQuestions: [
          "What does blank-importing net/http/pprof actually do?",
          "Why is it important to run the pprof debug server on a separate, non-public port?",
          "How would you capture a live CPU profile from a production service using this setup?",
        ],
      },
      {
        id: 19,
        title: "sync.Pool for Object Reuse",
        difficulty: "Advanced",
        description:
          "Use `sync.Pool` to reuse `*bytes.Buffer` objects instead of allocating a new one on every call, reducing GC pressure in a hot path. Implement a `Get`/`Put` wrapper and demonstrate reusing a buffer across several simulated requests.",
        starterCode: `package main

    import (
    	"bytes"
    	"fmt"
    	"sync"
    )

    var bufPool = sync.Pool{
    	New: func() interface{} {
    		// TODO: return a new *bytes.Buffer
    		return nil
    	},
    }

    func getBuffer() *bytes.Buffer {
    	// TODO: get from the pool and type-assert to *bytes.Buffer
    	return nil
    }

    func putBuffer(b *bytes.Buffer) {
    	// TODO: reset the buffer before returning it to the pool
    }

    func handleRequest(id int) string {
    	buf := getBuffer()
    	defer putBuffer(buf)

    	fmt.Fprintf(buf, "handling request #%d", id)
    	return buf.String()
    }

    func main() {
    	for i := 1; i <= 3; i++ {
    		fmt.Println(handleRequest(i))
    	}
    }`,
        solution: `package main

    import (
    	"bytes"
    	"fmt"
    	"sync"
    )

    var bufPool = sync.Pool{
    	New: func() interface{} {
    		return new(bytes.Buffer)
    	},
    }

    func getBuffer() *bytes.Buffer {
    	return bufPool.Get().(*bytes.Buffer)
    }

    func putBuffer(b *bytes.Buffer) {
    	b.Reset() // must clear old contents before returning it to the pool
    	bufPool.Put(b)
    }

    func handleRequest(id int) string {
    	buf := getBuffer()
    	defer putBuffer(buf)

    	fmt.Fprintf(buf, "handling request #%d", id)
    	return buf.String()
    }

    func main() {
    	for i := 1; i <= 3; i++ {
    		fmt.Println(handleRequest(i))
    	}
    }`,
        hints: [
          "sync.Pool's New function is only called when the pool is empty — most Get() calls return a previously Put() object instead of allocating.",
          "Always Reset() (or otherwise clear) an object before returning it to the pool — otherwise the next caller sees leftover data from a previous use.",
          "sync.Pool objects can be garbage-collected at any time (notably between GC cycles), so never rely on the pool as a cache with guaranteed retention — it's purely an allocation-reduction optimization.",
        ],
        tags: ["sync.Pool", "performance", "GC pressure"],
        interviewQuestions: [
          "When does sync.Pool actually call its New function versus reuse an existing object?",
          "Why is it critical to reset an object before putting it back into the pool?",
          "Why shouldn't sync.Pool be used as a general-purpose object cache?",
        ],
      },
      {
        id: 20,
        title: "Atomic Counter with sync/atomic",
        difficulty: "Advanced",
        description:
          "Implement a thread-safe counter using `atomic.Int64` (Go 1.19+) incremented concurrently by multiple goroutines, and confirm the final value is correct — no data race, and no mutex required.",
        starterCode: `package main

    import (
    	"fmt"
    	"sync"
    	"sync/atomic"
    )

    func main() {
    	var counter atomic.Int64
    	var wg sync.WaitGroup

    	for i := 0; i < 100; i++ {
    		wg.Add(1)
    		go func() {
    			defer wg.Done()
    			// TODO: increment counter atomically 1000 times
    		}()
    	}

    	wg.Wait()
    	fmt.Println("final count:", counter.Load())
    }`,
        solution: `package main

    import (
    	"fmt"
    	"sync"
    	"sync/atomic"
    )

    func main() {
    	var counter atomic.Int64
    	var wg sync.WaitGroup

    	for i := 0; i < 100; i++ {
    		wg.Add(1)
    		go func() {
    			defer wg.Done()
    			for j := 0; j < 1000; j++ {
    				counter.Add(1)
    			}
    		}()
    	}

    	wg.Wait()
    	fmt.Println("final count:", counter.Load()) // deterministically 100000
    }`,
        hints: [
          "atomic.Int64 (and its siblings atomic.Int32, atomic.Uint64, atomic.Bool, etc., added in Go 1.19) wrap the lower-level atomic functions in a safer, method-based API.",
          "counter.Add(1) performs an atomic read-modify-write, so concurrent goroutines never lose an increment the way a plain `counter++` on a shared int would.",
          "Compare this to the older API: atomic.AddInt64(&counter, 1) operating on a plain int64 — functionally equivalent but easier to misuse (passing the value instead of a pointer).",
        ],
        tags: ["sync/atomic", "concurrency", "atomic.Int64"],
        interviewQuestions: [
          "Why does a plain `counter++` shared across goroutines produce a data race, while atomic.Int64.Add doesn't?",
          "What's the difference between the newer atomic.Int64 type and the older atomic.AddInt64(*int64, ...) function style?",
          "When would you reach for atomic operations instead of a sync.Mutex?",
        ],
      },
      {
        id: 21,
        title: "Compare-And-Swap — A Lock-Free Optimistic Update",
        difficulty: "Advanced",
        description:
          "Implement a lock-free \"set maximum seen value\" tracker using `atomic.Int64`'s `CompareAndSwap`, retrying in a loop until the swap succeeds — a classic optimistic-concurrency pattern used to avoid locking entirely.",
        starterCode: `package main

    import (
    	"fmt"
    	"sync"
    	"sync/atomic"
    )

    func updateMax(max *atomic.Int64, candidate int64) {
    	// TODO: loop, reading the current max and attempting CompareAndSwap
    	// until candidate is stored (or a larger value already won the race)
    }

    func main() {
    	var max atomic.Int64
    	var wg sync.WaitGroup

    	values := []int64{3, 42, 17, 99, 8, 56}
    	for _, v := range values {
    		wg.Add(1)
    		go func(v int64) {
    			defer wg.Done()
    			updateMax(&max, v)
    		}(v)
    	}

    	wg.Wait()
    	fmt.Println("max seen:", max.Load())
    }`,
        solution: `package main

    import (
    	"fmt"
    	"sync"
    	"sync/atomic"
    )

    func updateMax(max *atomic.Int64, candidate int64) {
    	for {
    		current := max.Load()
    		if candidate <= current {
    			return // someone already recorded an equal or larger value
    		}
    		if max.CompareAndSwap(current, candidate) {
    			return // successfully installed our candidate
    		}
    		// else: another goroutine changed max between Load and CompareAndSwap — retry
    	}
    }

    func main() {
    	var max atomic.Int64
    	var wg sync.WaitGroup

    	values := []int64{3, 42, 17, 99, 8, 56}
    	for _, v := range values {
    		wg.Add(1)
    		go func(v int64) {
    			defer wg.Done()
    			updateMax(&max, v)
    		}(v)
    	}

    	wg.Wait()
    	fmt.Println("max seen:", max.Load())
    }`,
        hints: [
          "CompareAndSwap(old, new) only writes new if the current value still equals old — it fails harmlessly if another goroutine got there first.",
          "The retry loop is what makes this 'lock-free': instead of blocking, a losing goroutine just re-reads the latest value and tries again.",
          "This exact retry-on-CAS-failure shape underlies most lock-free data structures and is a very common systems interview question.",
        ],
        tags: ["sync/atomic", "CompareAndSwap", "lock-free"],
        interviewQuestions: [
          "How does CompareAndSwap detect that another goroutine modified the value in between your read and write?",
          "Why is this pattern called 'optimistic' concurrency control?",
          "What could go wrong if you used max.Store(candidate) directly instead of this CAS loop?",
        ],
      },
      {
        id: 22,
        title: "Atomic Counter vs Mutex — A Benchmark Comparison",
        difficulty: "Advanced",
        description:
          "Implement the same counter two ways — one guarded by `sync.Mutex`, one using `atomic.Int64` — then sketch (as a comment block) sub-benchmarks comparing them under concurrent increments, to build intuition for when each is the better tool.",
        starterCode: `package main

    import (
    	"fmt"
    	"sync"
    	"sync/atomic"
    )

    type MutexCounter struct {
    	mu    sync.Mutex
    	value int64
    }

    func (c *MutexCounter) Inc() {
    	// TODO: increment value under the mutex
    }

    type AtomicCounter struct {
    	value atomic.Int64
    }

    func (c *AtomicCounter) Inc() {
    	// TODO: increment atomically
    }

    // Sketch a benchmark comparison as a comment block:
    // func BenchmarkCounters(b *testing.B) {
    //   b.Run("mutex", func(b *testing.B) { ... })
    //   b.Run("atomic", func(b *testing.B) { ... })
    // }

    func main() {
    	mc := &MutexCounter{}
    	ac := &AtomicCounter{}

    	for i := 0; i < 1000; i++ {
    		mc.Inc()
    		ac.Inc()
    	}

    	fmt.Println("mutex counter:", mc.value)
    	fmt.Println("atomic counter:", ac.value.Load())
    }`,
        solution: `package main

    import (
    	"fmt"
    	"sync"
    	"sync/atomic"
    )

    type MutexCounter struct {
    	mu    sync.Mutex
    	value int64
    }

    func (c *MutexCounter) Inc() {
    	c.mu.Lock()
    	c.value++
    	c.mu.Unlock()
    }

    type AtomicCounter struct {
    	value atomic.Int64
    }

    func (c *AtomicCounter) Inc() {
    	c.value.Add(1)
    }

    // Benchmark comparison (would live in counter_test.go):
    //
    // func BenchmarkCounters(b *testing.B) {
    // 	b.Run("mutex", func(b *testing.B) {
    // 		c := &MutexCounter{}
    // 		b.RunParallel(func(pb *testing.PB) {
    // 			for pb.Next() {
    // 				c.Inc()
    // 			}
    // 		})
    // 	})
    //
    // 	b.Run("atomic", func(b *testing.B) {
    // 		c := &AtomicCounter{}
    // 		b.RunParallel(func(pb *testing.PB) {
    // 			for pb.Next() {
    // 				c.Inc()
    // 			}
    // 		})
    // 	})
    // }
    //
    // Typically atomic wins for a single counter under contention, since it
    // avoids OS-level lock/unlock overhead — but a mutex generalizes far better
    // once you need to protect more than one related field atomically together.

    func main() {
    	mc := &MutexCounter{}
    	ac := &AtomicCounter{}

    	for i := 0; i < 1000; i++ {
    		mc.Inc()
    		ac.Inc()
    	}

    	fmt.Println("mutex counter:", mc.value)
    	fmt.Println("atomic counter:", ac.value.Load())
    }`,
        hints: [
          "b.RunParallel is the standard way to benchmark code under real concurrent contention, spreading pb.Next() iterations across GOMAXPROCS goroutines.",
          "Atomic operations are typically faster than a mutex for protecting a single word of memory, since they avoid OS scheduler involvement in the uncontended case.",
          "A mutex remains the right tool once you need to update multiple related fields together as one atomic unit — atomics only protect a single value at a time.",
        ],
        tags: ["sync/atomic", "sync.Mutex", "benchmarking", "concurrency"],
        interviewQuestions: [
          "Why does atomic.Int64 generally outperform a sync.Mutex for a single counter?",
          "When would you still choose a mutex over atomics even for simple numeric state?",
          "What does b.RunParallel simulate that a plain for-loop benchmark doesn't?",
        ],
      },
      {
        id: 23,
        title: "Generics + comparable — A Minimal Binary Search Tree",
        difficulty: "Advanced",
        description:
          "Combine generics with the Ordered constraint to build a minimal binary search tree `BST[T Ordered]` supporting `Insert(v T)` and `InOrder() []T` (returning sorted contents via an in-order traversal).",
        starterCode: `package main

    import "fmt"

    type Ordered interface {
    	~int | ~int8 | ~int16 | ~int32 | ~int64 |
    		~uint | ~uint8 | ~uint16 | ~uint32 | ~uint64 |
    		~float32 | ~float64 | ~string
    }

    type bstNode[T Ordered] struct {
    	value       T
    	left, right *bstNode[T]
    }

    type BST[T Ordered] struct {
    	root *bstNode[T]
    }

    func (t *BST[T]) Insert(v T) {
    	// TODO: insert v into the correct position, maintaining BST ordering
    }

    func (t *BST[T]) InOrder() []T {
    	// TODO: return all values via in-order (left, node, right) traversal
    	return nil
    }

    func main() {
    	var t BST[int]
    	for _, v := range []int{5, 2, 8, 1, 9, 3} {
    		t.Insert(v)
    	}
    	fmt.Println(t.InOrder())
    }`,
        solution: `package main

    import "fmt"

    type Ordered interface {
    	~int | ~int8 | ~int16 | ~int32 | ~int64 |
    		~uint | ~uint8 | ~uint16 | ~uint32 | ~uint64 |
    		~float32 | ~float64 | ~string
    }

    type bstNode[T Ordered] struct {
    	value       T
    	left, right *bstNode[T]
    }

    type BST[T Ordered] struct {
    	root *bstNode[T]
    }

    func (t *BST[T]) Insert(v T) {
    	t.root = insertNode(t.root, v)
    }

    func insertNode[T Ordered](n *bstNode[T], v T) *bstNode[T] {
    	if n == nil {
    		return &bstNode[T]{value: v}
    	}
    	if v < n.value {
    		n.left = insertNode(n.left, v)
    	} else if v > n.value {
    		n.right = insertNode(n.right, v)
    	}
    	return n
    }

    func (t *BST[T]) InOrder() []T {
    	var result []T
    	var visit func(n *bstNode[T])
    	visit = func(n *bstNode[T]) {
    		if n == nil {
    			return
    		}
    		visit(n.left)
    		result = append(result, n.value)
    		visit(n.right)
    	}
    	visit(t.root)
    	return result
    }

    func main() {
    	var t BST[int]
    	for _, v := range []int{5, 2, 8, 1, 9, 3} {
    		t.Insert(v)
    	}
    	fmt.Println(t.InOrder())
    }`,
        hints: [
          "A generic type can hold a pointer to another generic type instantiated with the same type parameter — that's how bstNode[T] links to itself as left/right.",
          "insertNode is a free (non-method) generic function because recursive struct-returning logic is easier to express outside the method receiver here — it's then called from the Insert method.",
          "An in-order traversal of a BST always yields values in sorted order — that invariant is exactly what makes BSTs useful, and it's independent of which Ordered type T is.",
        ],
        tags: ["generics", "Ordered", "binary search tree", "data structures"],
        interviewQuestions: [
          "Why does an in-order traversal of a BST produce sorted output regardless of insertion order?",
          "What happens to Insert's and InOrder's time complexity in the worst case (e.g. inserting already-sorted data), and how do self-balancing trees address it?",
          "Why is it valid for bstNode[T] to reference *bstNode[T] recursively inside its own definition?",
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
