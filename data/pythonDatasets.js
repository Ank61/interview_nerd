// Python Practice Questions and Datasets
export const pythonQuestions = {
  beginner: [
    {
      id: 1,
      title: "Hello World",
      description: "Write a Python program that prints 'Hello, World!' to the console.",
      difficulty: "easy",
      category: "basics",
      starterCode: `# Write your code here
print("Hello, World!")`,
      solution: `print("Hello, World!")`,
      expectedOutput: "Hello, World!",
      hints: [
        "Use the print() function to display text",
        "Remember to use quotes around the text"
      ]
    },
    {
      id: 2,
      title: "Variables and Data Types",
      description: "Create variables of different data types and print them.",
      difficulty: "easy",
      category: "variables",
      starterCode: `# Create variables of different types
name = "Alice"
age = 25
height = 5.6
is_student = True

# Print all variables
`,
      solution: `name = "Alice"
age = 25
height = 5.6
is_student = True

print(f"Name: {name}")
print(f"Age: {age}")
print(f"Height: {height}")
print(f"Is Student: {is_student}")`,
      expectedOutput: "Name: Alice\nAge: 25\nHeight: 5.6\nIs Student: True",
      hints: [
        "Use f-strings for formatted output",
        "Each variable should be printed on a new line"
      ]
    },
    {
      id: 3,
      title: "Simple Calculator",
      description: "Create a simple calculator that adds two numbers.",
      difficulty: "easy",
      category: "functions",
      starterCode: `def add_numbers(a, b):
    # Write your code here
    pass

# Test the function
result = add_numbers(5, 3)
print(f"5 + 3 = {result}")`,
      solution: `def add_numbers(a, b):
    return a + b

result = add_numbers(5, 3)
print(f"5 + 3 = {result}")`,
      expectedOutput: "5 + 3 = 8",
      hints: [
        "Use the return statement to return the sum",
        "The + operator adds two numbers"
      ]
    },
    {
      id: 4,
      title: "List Operations",
      description: "Create a list of fruits and perform basic operations.",
      difficulty: "easy",
      category: "lists",
      starterCode: `# Create a list of fruits
fruits = ["apple", "banana", "orange"]

# Add a new fruit
# Remove a fruit
# Print the final list
`,
      solution: `fruits = ["apple", "banana", "orange"]
print(f"Original list: {fruits}")

fruits.append("grape")
print(f"After adding grape: {fruits}")

fruits.remove("banana")
print(f"After removing banana: {fruits}")`,
      expectedOutput: "Original list: ['apple', 'banana', 'orange']\nAfter adding grape: ['apple', 'banana', 'orange', 'grape']\nAfter removing banana: ['apple', 'orange', 'grape']",
      hints: [
        "Use append() to add items to a list",
        "Use remove() to remove items from a list"
      ]
    },
    {
      id: 5,
      title: "For Loop",
      description: "Use a for loop to print numbers from 1 to 5.",
      difficulty: "easy",
      category: "loops",
      starterCode: `# Use a for loop to print numbers 1 to 5
for i in range(1, 6):
    # Write your code here
    pass`,
      solution: `for i in range(1, 6):
    print(f"Number: {i}")`,
      expectedOutput: "Number: 1\nNumber: 2\nNumber: 3\nNumber: 4\nNumber: 5",
      hints: [
        "Use range(1, 6) to get numbers 1 through 5",
        "Print each number in the loop"
      ]
    },
    {
      id: 6,
      title: "Conditional Statements",
      description: "Write a program to check if a number is positive, negative, or zero.",
      difficulty: "easy",
      category: "conditionals",
      starterCode: `def check_number(num):
    # Write your conditional logic here
    pass

# Test with different numbers
print(check_number(5))
print(check_number(-3))
print(check_number(0))`,
      solution: `def check_number(num):
    if num > 0:
        return "Positive"
    elif num < 0:
        return "Negative"
    else:
        return "Zero"

print(check_number(5))
print(check_number(-3))
print(check_number(0))`,
      expectedOutput: "Positive\nNegative\nZero",
      hints: [
        "Use if, elif, and else statements",
        "Compare the number with 0"
      ]
    }
  ],
  advanced: [
    {
      id: 7,
      title: "List Comprehension",
      description: "Create a list of squares of even numbers from 1 to 10 using list comprehension.",
      difficulty: "medium",
      category: "comprehensions",
      starterCode: `# Create a list of squares of even numbers from 1 to 10
squares = []  # Replace this with list comprehension

print(squares)`,
      solution: `squares = [x**2 for x in range(1, 11) if x % 2 == 0]
print(squares)`,
      expectedOutput: "[4, 16, 36, 64, 100]",
      hints: [
        "Use list comprehension syntax: [expression for item in iterable if condition]",
        "Check if a number is even using x % 2 == 0"
      ]
    },
    {
      id: 8,
      title: "Dictionary Operations",
      description: "Create a function that counts the frequency of characters in a string.",
      difficulty: "medium",
      category: "dictionaries",
      starterCode: `def count_characters(text):
    # Write your code here
    pass

# Test the function
result = count_characters("hello")
print(result)`,
      solution: `def count_characters(text):
    char_count = {}
    for char in text:
        if char in char_count:
            char_count[char] += 1
        else:
            char_count[char] = 1
    return char_count

result = count_characters("hello")
print(result)`,
      expectedOutput: "{'h': 1, 'e': 1, 'l': 2, 'o': 1}",
      hints: [
        "Use a dictionary to store character counts",
        "Iterate through each character in the string"
      ]
    },
    {
      id: 9,
      title: "Recursive Function",
      description: "Write a recursive function to calculate the factorial of a number.",
      difficulty: "medium",
      category: "recursion",
      starterCode: `def factorial(n):
    # Write your recursive function here
    pass

# Test the function
print(f"5! = {factorial(5)}")
print(f"0! = {factorial(0)}")`,
      solution: `def factorial(n):
    if n == 0 or n == 1:
        return 1
    else:
        return n * factorial(n - 1)

print(f"5! = {factorial(5)}")
print(f"0! = {factorial(0)}")`,
      expectedOutput: "5! = 120\n0! = 1",
      hints: [
        "Base case: factorial of 0 or 1 is 1",
        "Recursive case: n * factorial(n-1)"
      ]
    },
    {
      id: 10,
      title: "Class and Objects",
      description: "Create a simple Person class with name and age attributes, and a method to introduce themselves.",
      difficulty: "medium",
      category: "oop",
      starterCode: `class Person:
    def __init__(self, name, age):
        # Initialize attributes
        pass
    
    def introduce(self):
        # Return introduction string
        pass

# Create a person and call introduce
person = Person("Alice", 30)
print(person.introduce())`,
      solution: `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def introduce(self):
        return f"Hi, I'm {self.name} and I'm {self.age} years old."

person = Person("Alice", 30)
print(person.introduce())`,
      expectedOutput: "Hi, I'm Alice and I'm 30 years old.",
      hints: [
        "Use self.name and self.age to store attributes",
        "Return a formatted string in the introduce method"
      ]
    },
    {
      id: 11,
      title: "File Processing",
      description: "Create a function that processes a list of numbers and returns statistics.",
      difficulty: "hard",
      category: "algorithms",
      starterCode: `def calculate_stats(numbers):
    # Calculate mean, median, and mode
    # Return as a dictionary
    pass

# Test with sample data
data = [1, 2, 2, 3, 4, 4, 4, 5]
stats = calculate_stats(data)
print(stats)`,
      solution: `def calculate_stats(numbers):
    if not numbers:
        return {}
    
    # Mean
    mean = sum(numbers) / len(numbers)
    
    # Median
    sorted_nums = sorted(numbers)
    n = len(sorted_nums)
    if n % 2 == 0:
        median = (sorted_nums[n//2 - 1] + sorted_nums[n//2]) / 2
    else:
        median = sorted_nums[n//2]
    
    # Mode
    from collections import Counter
    count = Counter(numbers)
    mode = count.most_common(1)[0][0]
    
    return {
        'mean': round(mean, 2),
        'median': median,
        'mode': mode
    }

data = [1, 2, 2, 3, 4, 4, 4, 5]
stats = calculate_stats(data)
print(stats)`,
      expectedOutput: "{'mean': 3.12, 'median': 3.5, 'mode': 4}",
      hints: [
        "Mean is sum divided by count",
        "Median is the middle value when sorted",
        "Mode is the most frequent value"
      ]
    },
    {
      id: 12,
      title: "Generator Function",
      description: "Create a generator function that yields Fibonacci numbers.",
      difficulty: "hard",
      category: "generators",
      starterCode: `def fibonacci_generator(n):
    # Create a generator that yields first n Fibonacci numbers
    pass

# Test the generator
fib_gen = fibonacci_generator(8)
for num in fib_gen:
    print(num, end=" ")
print()`,
      solution: `def fibonacci_generator(n):
    a, b = 0, 1
    count = 0
    while count < n:
        yield a
        a, b = b, a + b
        count += 1

fib_gen = fibonacci_generator(8)
for num in fib_gen:
    print(num, end=" ")
print()`,
      expectedOutput: "0 1 1 2 3 5 8 13 ",
      hints: [
        "Use yield instead of return",
        "Keep track of the previous two numbers",
        "Use a counter to limit the sequence"
      ]
    }
  ]
};

export const pythonConcepts = {
  basics: {
    title: "Python Basics",
    description: "Learn fundamental Python concepts including variables, data types, and basic operations.",
    color: "bg-blue-500"
  },
  variables: {
    title: "Variables & Data Types",
    description: "Understanding different data types in Python: strings, integers, floats, and booleans.",
    color: "bg-green-500"
  },
  functions: {
    title: "Functions",
    description: "Learn how to define and use functions to organize your code.",
    color: "bg-purple-500"
  },
  lists: {
    title: "Lists & Arrays",
    description: "Working with Python lists, including common operations and methods.",
    color: "bg-yellow-500"
  },
  loops: {
    title: "Loops & Iteration",
    description: "Master for loops, while loops, and iteration patterns in Python.",
    color: "bg-red-500"
  },
  conditionals: {
    title: "Conditional Statements",
    description: "Learn if, elif, and else statements for decision making in code.",
    color: "bg-indigo-500"
  },
  comprehensions: {
    title: "List Comprehensions",
    description: "Advanced list creation techniques using comprehensions.",
    color: "bg-pink-500"
  },
  dictionaries: {
    title: "Dictionaries & Sets",
    description: "Working with key-value pairs and unique collections in Python.",
    color: "bg-teal-500"
  },
  recursion: {
    title: "Recursion",
    description: "Understanding recursive functions and their applications.",
    color: "bg-orange-500"
  },
  oop: {
    title: "Object-Oriented Programming",
    description: "Classes, objects, inheritance, and encapsulation in Python.",
    color: "bg-cyan-500"
  },
  algorithms: {
    title: "Algorithms & Data Structures",
    description: "Common algorithms and data structure implementations.",
    color: "bg-gray-700"
  },
  generators: {
    title: "Generators & Iterators",
    description: "Advanced Python concepts for memory-efficient iteration.",
    color: "bg-emerald-500"
  }
};

export default { pythonQuestions, pythonConcepts };
