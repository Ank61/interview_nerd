// Python Practice Questions and Datasets
export const pythonQuestions = {
  beginner: [
    {
      id: 1,
      title: "Hello World",
      description:
        "Write a Python program that prints 'Hello, World!' to the console.",
      difficulty: "easy",
      category: "basics",
      starterCode: `# Write your code here
print("Hello, World!")`,
      solution: `print("Hello, World!")`,
      expectedOutput: "Hello, World!",
      hints: [
        "Use the print() function to display text",
        "Remember to use quotes around the text",
      ],
    },
    {
      id: 2,
      title: "Variable Assignment",
      description:
        "Create variables for your name (string), age (integer), height in meters (float), and whether you like pizza (boolean). Print each variable.",
      difficulty: "easy",
      category: "variables",
      starterCode: `# Create your variables here
name = 
age = 
height = 
likes_pizza = 

# Print each variable`,
      solution: `name = "Alice"
age = 25
height = 1.65
likes_pizza = True

print(name)
print(age)
print(height)
print(likes_pizza)`,
      expectedOutput: "Alice\n25\n1.65\nTrue",
      hints: [
        "Use quotes for strings",
        "Integers don't need quotes or decimal points",
        "Floats need decimal points",
        "Boolean values are True or False (capitalized)",
      ],
    },
    {
      id: 3,
      title: "Proper Indentation",
      description:
        "Fix the indentation errors in this code that defines variables inside an if statement.",
      difficulty: "easy",
      category: "syntax",
      starterCode: `# Fix the indentation in this code
if True:
message = "This needs proper indentation"
    number = 42
print(message)
   print(number)`,
      solution: `# Fix the indentation in this code
if True:
    message = "This needs proper indentation"
    number = 42
    print(message)
    print(number)`,
      expectedOutput: "This needs proper indentation\n42",
      hints: [
        "Python uses 4 spaces for indentation",
        "All code inside the if block should be indented",
        "Use consistent indentation throughout",
      ],
    },
    {
      id: 4,
      title: "Single Line Comments",
      description:
        "Add single-line comments to explain what each line of code does.",
      difficulty: "easy",
      category: "comments",
      starterCode: `name = "Python"
version = 3.9
is_popular = True
print(f"{name} version {version} is popular: {is_popular}")`,
      solution: `# Store the programming language name
name = "Python"
# Store the version number
version = 3.9
# Boolean indicating popularity
is_popular = True
# Print formatted information about Python
print(f"{name} version {version} is popular: {is_popular}")`,
      expectedOutput: "Python version 3.9 is popular: True",
      hints: [
        "Use # at the beginning of a line for comments",
        "Comments should explain what the code does",
        "Good comments are clear and concise",
      ],
    },
    {
      id: 5,
      title: "Multiline Comments",
      description:
        "Add a multiline comment at the top of the program explaining its purpose, then add single-line comments for the variables.",
      difficulty: "easy",
      category: "comments",
      starterCode: `width = 10
height = 5
area = width * height
print(f"Area of rectangle: {area}")`,
      solution: `"""
This program calculates the area of a rectangle.
It takes width and height values and multiplies them
to find the total area.
Author: Student
Date: Today
"""

# Width of the rectangle in units
width = 10
# Height of the rectangle in units  
height = 5
# Calculate area by multiplying width and height
area = width * height
# Display the calculated area
print(f"Area of rectangle: {area}")`,
      expectedOutput: "Area of rectangle: 50",
      hints: [
        "Use triple quotes ''' or \"\"\" for multiline comments",
        "Multiline comments are great for documentation",
        "Include purpose, author, and other relevant info",
      ],
    },
    {
      id: 6,
      title: "String to Integer",
      description:
        "Convert a string number to an integer and perform arithmetic operations.",
      difficulty: "easy",
      category: "type_casting",
      starterCode: `# Convert string to integer and add 10
str_number = "25"
# Your code here`,
      solution: `# Convert string to integer and add 10
str_number = "25"
int_number = int(str_number)
result = int_number + 10
print(f"Original string: {str_number}")
print(f"As integer: {int_number}")
print(f"After adding 10: {result}")`,
      expectedOutput:
        "Original string: 25\nAs integer: 25\nAfter adding 10: 35",
      hints: [
        "Use int() to convert string to integer",
        "Make sure the string contains only numbers",
        "You can do arithmetic with integers",
      ],
    },
    {
      id: 7,
      title: "Float Conversion and Rounding",
      description:
        "Convert a string to float, perform division, and convert the result back to different types.",
      difficulty: "medium",
      category: "type_casting",
      starterCode: `# Convert and manipulate different number types
price_str = "19.99"
quantity_str = "3"
# Your code here`,
      solution: `# Convert and manipulate different number types
price_str = "19.99"
quantity_str = "3"

price = float(price_str)
quantity = int(quantity_str)
total = price * quantity

print(f"Price per item: $ {price}")
print(f"Quantity: {quantity}")
print(f"Total cost: $ {total}")
print(f"Total as integer: $ {int(total)}")
print(f"Total as string: '{str(total)}'")`,
      expectedOutput:
        "Price per item: $19.99\nQuantity: 3\nTotal cost: $59.97\nTotal as integer: $59\nTotal as string: '59.97'",
      hints: [
        "Use float() to convert string to decimal number",
        "Use int() to truncate decimal places",
        "Use str() to convert numbers back to strings",
      ],
    },
    {
      id: 8,
      title: "Boolean Conversion",
      description:
        "Practice converting different values to boolean and understand truthy/falsy values.",
      difficulty: "medium",
      category: "type_casting",
      starterCode: `# Convert various values to boolean
values = [1, 0, "hello", "", 3.14, 0.0]
# Convert each value to boolean and print the result`,
      solution: `# Convert various values to boolean
values = [1, 0, "hello", "", 3.14, 0.0]

for value in values:
    boolean_result = bool(value)
    print(f"{value} -> {boolean_result} (type: {type(value).__name__})")`,
      expectedOutput:
        "1 -> True (type: int)\n0 -> False (type: int)\nhello -> True (type: str)\n -> False (type: str)\n3.14 -> True (type: float)\n0.0 -> False (type: float)",
      hints: [
        "Use bool() to convert values to boolean",
        "Empty strings, 0, and 0.0 are falsy",
        "Non-empty strings and non-zero numbers are truthy",
      ],
    },
    {
      id: 9,
      title: "Basic Input",
      description: "Get user input and display it back with a greeting.",
      difficulty: "easy",
      category: "input_output",
      starterCode: `# Get user's name and greet them
# Your code here`,
      solution: `# Get user's name and greet them
name = input("What is your name? ")
print(f"Hello, {name}! Nice to meet you!")`,
      expectedOutput:
        "What is your name? [User Input]\nHello, [User Input]! Nice to meet you!",
      hints: [
        "Use input() to get text from the user",
        "input() always returns a string",
        "Use f-strings or .format() to include variables in output",
      ],
    },
    {
      id: 10,
      title: "Input with Type Conversion",
      description:
        "Get the user's age as input, convert it to integer, and calculate their birth year.",
      difficulty: "medium",
      category: "input_output",
      starterCode: `# Get user's age and calculate birth year
current_year = 2024
# Your code here`,
      solution: `# Get user's age and calculate birth year
current_year = 2024
age_str = input("How old are you? ")
age = int(age_str)
birth_year = current_year - age
print(f"You are {age} years old.")
print(f"You were born in approximately {birth_year}.")`,
      expectedOutput:
        "How old are you? [User Input]\nYou are [User Input] years old.\nYou were born in approximately [calculated year].",
      hints: [
        "input() returns a string, so convert to int",
        "Use int() to convert the age string",
        "Subtract age from current year to get birth year",
      ],
    },
    {
      id: 11,
      title: "Multiple Inputs and Calculations",
      description:
        "Get length and width from user input, convert to float, and calculate rectangle area and perimeter.",
      difficulty: "medium",
      category: "input_output",
      starterCode: `# Calculate rectangle area and perimeter from user input
# Your code here`,
      solution: `# Calculate rectangle area and perimeter from user input
print("Rectangle Calculator")
print("-" * 20)

length = float(input("Enter the length: "))
width = float(input("Enter the width: "))

area = length * width
perimeter = 2 * (length + width)

print(f"\nResults:")
print(f"Length: {length}")
print(f"Width: {width}")
print(f"Area: {area}")
print(f"Perimeter: {perimeter}")`,
      expectedOutput:
        "Rectangle Calculator\n--------------------\nEnter the length: [User Input]\nEnter the width: [User Input]\n\nResults:\nLength: [User Input]\nWidth: [User Input]\nArea: [calculated]\nPerimeter: [calculated]",
      hints: [
        "Use float() to handle decimal inputs",
        "Area = length × width",
        "Perimeter = 2 × (length + width)",
        "Use \\n for new lines in strings",
      ],
    },
    {
      id: 12,
      title: "Data Type Identification",
      description:
        "Create variables of different types and use the type() function to identify them.",
      difficulty: "easy",
      category: "data_types",
      starterCode: `# Create variables and identify their types
# Create one variable of each type: int, float, str, bool
# Then print each variable and its type`,
      solution: `# Create variables and identify their types
integer_var = 42
float_var = 3.14159
string_var = "Python Programming"
boolean_var = True

print(f"Value: {integer_var}, Type: {type(integer_var)}")
print(f"Value: {float_var}, Type: {type(float_var)}")
print(f"Value: {string_var}, Type: {type(string_var)}")
print(f"Value: {boolean_var}, Type: {type(boolean_var)}")`,
      expectedOutput:
        "Value: 42, Type: <class 'int'>\nValue: 3.14159, Type: <class 'float'>\nValue: Python Programming, Type: <class 'str'>\nValue: True, Type: <class 'bool'>",
      hints: [
        "Use type() function to check data types",
        "Integers don't have decimal points",
        "Floats have decimal points",
        "Strings are enclosed in quotes",
      ],
    },
    {
      id: 13,
      title: "String Formatting Practice",
      description:
        "Practice different ways to format and print strings with variables.",
      difficulty: "medium",
      category: "input_output",
      starterCode: `# Practice string formatting methods
name = "Alice"
age = 25
gpa = 3.875
# Use different formatting methods to print the information`,
      solution: `# Practice string formatting methods
name = "Alice"
age = 25
gpa = 3.875

# Method 1: f-strings (recommended)
print(f"Student: {name}, Age: {age}, GPA: {gpa:.2f}")

# Method 2: .format() method
print("Student: {}, Age: {}, GPA: {:.2f}".format(name, age, gpa))

# Method 3: % formatting (older style)
print("Student: %s, Age: %d, GPA: %.2f" % (name, age, gpa))

# Method 4: Simple concatenation
print("Student: " + name + ", Age: " + str(age) + ", GPA: " + str(round(gpa, 2)))`,
      expectedOutput:
        "Student: Alice, Age: 25, GPA: 3.88\nStudent: Alice, Age: 25, GPA: 3.88\nStudent: Alice, Age: 25, GPA: 3.88\nStudent: Alice, Age: 25, GPA: 3.88",
      hints: [
        "f-strings are the modern preferred method",
        "Use :.2f to format floats to 2 decimal places",
        "Convert numbers to strings when concatenating",
        "Each method produces the same result",
      ],
    },
    {
      id: 14,
      title: "Input Validation and Error Handling",
      description:
        "Get numeric input from user and handle potential conversion errors gracefully.",
      difficulty: "hard",
      category: "input_output",
      starterCode: `# Get a number from user with basic error handling
# Your code here`,
      solution: `# Get a number from user with basic error handling
print("Number Processing Program")
user_input = input("Enter a number: ")

try:
    # Try to convert to float first (handles both int and float)
    number = float(user_input)
    
    # Check if it's actually an integer
    if number.is_integer():
        number = int(number)
        print(f"You entered an integer: {number}")
        print(f"Type: {type(number)}")
    else:
        print(f"You entered a float: {number}")
        print(f"Type: {type(number)}")
    
    # Perform some calculations
    print(f"Doubled: {number * 2}")
    print(f"Squared: {number ** 2}")
    
except ValueError:
    print(f"'{user_input}' is not a valid number!")
    print("Please enter a numeric value next time.")`,
      expectedOutput:
        "Number Processing Program\nEnter a number: [User Input]\n[Various outputs based on input type and validity]",
      hints: [
        "Use try/except to handle conversion errors",
        "float() can convert both integer and decimal strings",
        "Use .is_integer() to check if a float is whole",
        "ValueError occurs when conversion fails",
      ],
    },
    {
      id: 15,
      title: "Complete Data Types Showcase",
      description:
        "Create a program that demonstrates all basic data types, type conversion, input/output, and proper formatting.",
      difficulty: "hard",
      category: "comprehensive",
      starterCode: `# Complete showcase of Python basics
# Your program should:
# 1. Use proper comments and formatting
# 2. Get user input for different data types
# 3. Perform type conversions
# 4. Display results with good formatting
# Your code here`,
      solution: `"""
Python Basics Showcase Program
This program demonstrates variables, data types, 
type conversion, input/output, and formatting.
"""

# Program header
print("=" * 40)
print("PYTHON BASICS SHOWCASE")
print("=" * 40)

# Get user information with proper type conversion
print("\n📝 Personal Information:")
name = input("Enter your name: ")
age_str = input("Enter your age: ")
height_str = input("Enter your height in meters (e.g., 1.75): ")
is_student_str = input("Are you a student? (yes/no): ")

# Type conversions with error handling
try:
    age = int(age_str)
    height = float(height_str)
    is_student = is_student_str.lower() in ['yes', 'y', 'true', '1']
    
    # Display original inputs and their types
    print(f"\n🔍 Data Analysis:")
    print(f"Name: '{name}' (type: {type(name).__name__})")
    print(f"Age: {age} (type: {type(age).__name__})")
    print(f"Height: {height} (type: {type(height).__name__})")
    print(f"Student: {is_student} (type: {type(is_student).__name__})")
    
    # Perform calculations and conversions
    print(f"\n🧮 Calculations:")
    birth_year = 2024 - age
    height_cm = height * 100
    height_ft = height * 3.28084
    
    print(f"Approximate birth year: {birth_year}")
    print(f"Height in centimeters: {height_cm:.1f} cm")
    print(f"Height in feet: {height_ft:.2f} ft")
    
    # Type conversion examples
    print(f"\n🔄 Type Conversions:")
    print(f"Age as string: '{str(age)}'")
    print(f"Height as integer: {int(height)} meters")
    print(f"Student status as string: '{str(is_student)}'")
    
    # Final formatted summary
    print(f"\n📋 Summary:")
    status = "a student" if is_student else "not a student"
    print(f"{name} is {age} years old, {height}m tall, and is {status}.")
    
except ValueError as e:
    print(f"\n❌ Error: Please enter valid numeric values for age and height.")
    print(f"Error details: {e}")

print(f"\n{'=' * 40}")
print("Program completed successfully!")`,
      expectedOutput:
        "[Interactive program with multiple input prompts and formatted output based on user inputs]",
      hints: [
        "Use triple quotes for program documentation",
        "Handle user input validation with try/except",
        "Convert string inputs to appropriate data types",
        "Use f-strings for clean, readable output formatting",
        "Include error handling for invalid inputs",
      ],
    },
    {
      id: 1,
      title: "Basic Addition",
      description:
        "Write a Python program that adds two numbers (15 and 25) and prints the result.",
      difficulty: "easy",
      category: "arithmetic_operators",
      starterCode: `# Write your code here
# Add 15 and 25 and print the result`,
      solution: `print(15 + 25)`,
      expectedOutput: "40",
      hints: [
        "Use the + operator to add numbers",
        "Use print() to display the result",
      ],
    },
    {
      id: 2,
      title: "Calculator Operations",
      description:
        "Create variables a=10 and b=3. Print the results of addition, subtraction, multiplication, division, floor division, modulo, and exponentiation.",
      difficulty: "medium",
      category: "arithmetic_operators",
      starterCode: `# Create variables and perform all arithmetic operations
a = 10
b = 3
# Print results of: +, -, *, /, //, %, **`,
      solution: `a = 10
b = 3
print(a + b)    # Addition: 13
print(a - b)    # Subtraction: 7
print(a * b)    # Multiplication: 30
print(a / b)    # Division: 3.333...
print(a // b)   # Floor division: 3
print(a % b)    # Modulo: 1
print(a ** b)   # Exponentiation: 1000`,
      expectedOutput: "13\n7\n30\n3.3333333333333335\n3\n1\n1000",
      hints: [
        "Use // for floor division (integer division)",
        "Use % to get the remainder",
        "Use ** for exponentiation (power)",
      ],
    },
    {
      id: 3,
      title: "Age Comparison",
      description:
        "Create two variables age1=25 and age2=30. Use comparison operators to check if age1 is equal to, not equal to, less than, greater than, less than or equal to, and greater than or equal to age2.",
      difficulty: "easy",
      category: "comparison_operators",
      starterCode: `# Compare two ages using all comparison operators
age1 = 25
age2 = 30
# Print results of: ==, !=, <, >, <=, >=`,
      solution: `age1 = 25
age2 = 30
print(age1 == age2)  # Equal: False
print(age1 != age2)  # Not equal: True
print(age1 < age2)   # Less than: True
print(age1 > age2)   # Greater than: False
print(age1 <= age2)  # Less than or equal: True
print(age1 >= age2)  # Greater than or equal: False`,
      expectedOutput: "False\nTrue\nTrue\nFalse\nTrue\nFalse",
      hints: [
        "== checks for equality, not assignment",
        "!= means 'not equal to'",
        "Comparison operators return True or False",
      ],
    },
    {
      id: 4,
      title: "Boolean Logic",
      description:
        "Create variables is_sunny=True and is_warm=False. Use logical operators to print the results of 'and', 'or', and 'not' operations.",
      difficulty: "easy",
      category: "logical_operators",
      starterCode: `# Use logical operators with boolean variables
is_sunny = True
is_warm = False
# Print results of: and, or, not operations`,
      solution: `is_sunny = True
is_warm = False
print(is_sunny and is_warm)  # False
print(is_sunny or is_warm)   # True
print(not is_sunny)          # False
print(not is_warm)           # True`,
      expectedOutput: "False\nTrue\nFalse\nTrue",
      hints: [
        "'and' returns True only if both conditions are True",
        "'or' returns True if at least one condition is True",
        "'not' reverses the boolean value",
      ],
    },
    {
      id: 5,
      title: "Grade Evaluation",
      description:
        "Create variables score=85 and passing_grade=60. Write a program that checks if the student passed (score >= passing_grade) AND if they got an A (score >= 90).",
      difficulty: "medium",
      category: "logical_operators",
      starterCode: `# Check if student passed and if they got an A
score = 85
passing_grade = 60
# Check: passed (score >= passing_grade) and got_A (score >= 90)`,
      solution: `score = 85
passing_grade = 60
passed = score >= passing_grade
got_A = score >= 90
print(f"Passed: {passed}")
print(f"Got A: {got_A}")
print(f"Passed AND got A: {passed and got_A}")
print(f"Passed OR got A: {passed or got_A}")`,
      expectedOutput:
        "Passed: True\nGot A: False\nPassed AND got A: False\nPassed OR got A: True",
      hints: [
        "Use >= for 'greater than or equal to'",
        "Store comparison results in variables",
        "Use 'and' and 'or' to combine conditions",
      ],
    },
    {
      id: 6,
      title: "Assignment Operators",
      description:
        "Start with x=10. Use compound assignment operators to add 5, subtract 3, multiply by 2, divide by 4, and get the remainder when divided by 3. Print x after each operation.",
      difficulty: "medium",
      category: "assignment_operators",
      starterCode: `# Use compound assignment operators
x = 10
print(f"Initial: {x}")
# Use +=, -=, *=, /=, %= and print x after each operation`,
      solution: `x = 10
print(f"Initial: {x}")
x += 5  # x = x + 5
print(f"After += 5: {x}")
x -= 3  # x = x - 3
print(f"After -= 3: {x}")
x *= 2  # x = x * 2
print(f"After *= 2: {x}")
x /= 4  # x = x / 4
print(f"After /= 4: {x}")
x %= 3  # x = x % 3
print(f"After %= 3: {x}")`,
      expectedOutput:
        "Initial: 10\nAfter += 5: 15\nAfter -= 3: 12\nAfter *= 2: 24\nAfter /= 4: 6.0\nAfter %= 3: 0.0",
      hints: [
        "+= is shorthand for x = x + value",
        "Each operator modifies the variable in place",
        "Division always returns a float in Python 3",
      ],
    },
    {
      id: 7,
      title: "Fruit Checker",
      description:
        "Create a list of fruits ['apple', 'banana', 'orange']. Check if 'apple' is in the list, if 'grape' is not in the list, and if 'banana' is in the list.",
      difficulty: "easy",
      category: "membership",
      starterCode: `# Check membership in a list
fruits = ['apple', 'banana', 'orange']
# Check if 'apple' is in, 'grape' is not in, and 'banana' is in the list`,
      solution: `fruits = ['apple', 'banana', 'orange']
print('apple' in fruits)      # True
print('grape' not in fruits)  # True
print('banana' in fruits)     # True
print('grape' in fruits)      # False`,
      expectedOutput: "True\nTrue\nTrue\nFalse",
      hints: [
        "Use 'in' to check if an item exists in a list",
        "Use 'not in' to check if an item doesn't exist",
        "Membership operators return True or False",
      ],
    },
    {
      id: 8,
      title: "String Membership",
      description:
        "Create a string text='Hello World'. Check if 'Hello' is in the text, if 'Python' is not in the text, and if 'world' (lowercase) is in the text.",
      difficulty: "easy",
      category: "membership",
      starterCode: `# Check membership in a string
text = 'Hello World'
# Check if 'Hello' is in, 'Python' is not in, and 'world' is in the text`,
      solution: `text = 'Hello World'
print('Hello' in text)        # True
print('Python' not in text)   # True
print('world' in text)        # False (case sensitive)
print('World' in text)        # True`,
      expectedOutput: "True\nTrue\nFalse\nTrue",
      hints: [
        "String membership is case-sensitive",
        "'Hello' is in 'Hello World'",
        "'world' and 'World' are different",
      ],
    },
    {
      id: 9,
      title: "Identity Check",
      description:
        "Create variables a=10, b=10, c=[1,2,3], and d=[1,2,3]. Use identity operators to check if a is b, c is d, and c is not d.",
      difficulty: "medium",
      category: "identity",
      starterCode: `# Check identity using 'is' and 'is not'
a = 10
b = 10
c = [1, 2, 3]
d = [1, 2, 3]
# Check if a is b, c is d, and c is not d`,
      solution: `a = 10
b = 10
c = [1, 2, 3]
d = [1, 2, 3]
print(a is b)      # True (small integers are cached)
print(c is d)      # False (different list objects)
print(c is not d)  # True
print(c == d)      # True (same content, different objects)`,
      expectedOutput: "True\nFalse\nTrue\nTrue",
      hints: [
        "'is' checks if two variables point to the same object",
        "'==' checks if values are equal, 'is' checks identity",
        "Small integers (-5 to 256) are cached in Python",
      ],
    },
    {
      id: 10,
      title: "None Identity",
      description:
        "Create variables x=None and y=None. Also create z=0. Check if x is None, y is None, z is None, and z is not None.",
      difficulty: "easy",
      category: "identity",
      starterCode: `# Check identity with None
x = None
y = None
z = 0
# Check if x is None, y is None, z is None, and z is not None`,
      solution: `x = None
y = None
z = 0
print(x is None)      # True
print(y is None)      # True
print(z is None)      # False
print(z is not None)  # True
print(x is y)         # True (None is a singleton)`,
      expectedOutput: "True\nTrue\nFalse\nTrue\nTrue",
      hints: [
        "Always use 'is' and 'is not' when checking for None",
        "None is a singleton object in Python",
        "Don't use == to check for None",
      ],
    },
    {
      id: 11,
      title: "Complex Expression",
      description:
        "Create variables age=25, has_license=True, and countries=['USA', 'Canada']. Write a program that checks if someone can rent a car (age >= 21 AND has_license is True AND 'USA' is in countries).",
      difficulty: "hard",
      category: "mixed_operators",
      starterCode: `# Combine multiple operator types
age = 25
has_license = True
countries = ['USA', 'Canada']
# Check if can rent car: age >= 21 AND has_license AND 'USA' in countries`,
      solution: `age = 25
has_license = True
countries = ['USA', 'Canada']

can_rent = age >= 21 and has_license is True and 'USA' in countries
print(f"Age >= 21: {age >= 21}")
print(f"Has license: {has_license is True}")
print(f"USA in countries: {'USA' in countries}")
print(f"Can rent car: {can_rent}")`,
      expectedOutput:
        "Age >= 21: True\nHas license: True\nUSA in countries: True\nCan rent car: True",
      hints: [
        "Use 'and' to combine all conditions",
        "Use 'is True' to explicitly check boolean identity",
        "Use 'in' to check if country is in the list",
      ],
    },
    {
      id: 12,
      title: "Operator Precedence",
      description:
        "Calculate the result of: 2 + 3 * 4 > 10 and not False or 5 < 3. Print intermediate results to understand operator precedence.",
      difficulty: "hard",
      category: "mixed_operators",
      starterCode: `# Understand operator precedence
# Calculate: 2 + 3 * 4 > 10 and not False or 5 < 3
# Print intermediate steps`,
      solution: `# Step by step calculation
step1 = 3 * 4        # Multiplication first: 12
step2 = 2 + step1    # Addition: 2 + 12 = 14
step3 = step2 > 10   # Comparison: 14 > 10 = True
step4 = not False    # Not operator: True
step5 = step3 and step4  # And: True and True = True
step6 = 5 < 3        # Comparison: False
final = step5 or step6   # Or: True or False = True

print(f"3 * 4 = {step1}")
print(f"2 + 12 = {step2}")
print(f"14 > 10 = {step3}")
print(f"not False = {step4}")
print(f"True and True = {step5}")
print(f"5 < 3 = {step6}")
print(f"True or False = {final}")`,
      expectedOutput:
        "3 * 4 = 12\n2 + 12 = 14\n14 > 10 = True\nnot False = True\nTrue and True = True\n5 < 3 = False\nTrue or False = True",
      hints: [
        "Order: ** → *,/,//,% → +,- → comparisons → not → and → or",
        "Break down complex expressions step by step",
        "Parentheses can override default precedence",
      ],
    },
    {
      id: 1,
      title: "Simple If Statement",
      description:
        "Write a program that checks if a number is positive. If the number is greater than 0, print 'Positive number'.",
      difficulty: "easy",
      category: "if_statement",
      starterCode: `# Check if a number is positive
number = 5
# Write an if statement to check if number > 0`,
      solution: `number = 5
if number > 0:
    print('Positive number')`,
      expectedOutput: "Positive number",
      hints: [
        "Use if followed by a condition",
        "Don't forget the colon (:) after the condition",
        "Indent the code inside the if block",
      ],
    },
    {
      id: 2,
      title: "If-Else Statement",
      description:
        "Write a program that checks if a person is an adult (age >= 18). Print 'Adult' if true, 'Minor' if false.",
      difficulty: "easy",
      category: "if_else",
      starterCode: `# Check if person is adult or minor
age = 16
# Use if-else to print 'Adult' or 'Minor'`,
      solution: `age = 16
if age >= 18:
    print('Adult')
else:
    print('Minor')`,
      expectedOutput: "Minor",
      hints: [
        "Use >= for 'greater than or equal to'",
        "The else block runs when the if condition is False",
        "Both if and else blocks need proper indentation",
      ],
    },
    {
      id: 3,
      title: "Grade Classification",
      description:
        "Write a program that classifies a grade: A (90-100), B (80-89), C (70-79), D (60-69), F (below 60).",
      difficulty: "medium",
      category: "elif_statement",
      starterCode: `# Classify grades using if-elif-else
grade = 85
# Print the letter grade based on the score`,
      solution: `grade = 85
if grade >= 90:
    print('A')
elif grade >= 80:
    print('B')
elif grade >= 70:
    print('C')
elif grade >= 60:
    print('D')
else:
    print('F')`,
      expectedOutput: "B",
      hints: [
        "Use elif for multiple conditions",
        "Order matters - start with the highest grade",
        "The first True condition will execute",
      ],
    },
    {
      id: 4,
      title: "Temperature Description",
      description:
        "Write a program that describes temperature: 'Freezing' (below 0), 'Cold' (0-15), 'Cool' (16-25), 'Warm' (26-35), 'Hot' (above 35).",
      difficulty: "medium",
      category: "elif_statement",
      starterCode: `# Describe temperature based on value
temperature = 22
# Use if-elif-else to classify temperature`,
      solution: `temperature = 22
if temperature < 0:
    print('Freezing')
elif temperature <= 15:
    print('Cold')
elif temperature <= 25:
    print('Cool')
elif temperature <= 35:
    print('Warm')
else:
    print('Hot')`,
      expectedOutput: "Cool",
      hints: [
        "Use <= to include the upper bound",
        "Think about the logical order of conditions",
        "Each range should be mutually exclusive",
      ],
    },
    {
      id: 5,
      title: "Login Validation",
      description:
        "Write a program that checks username and password. Print 'Login successful' if both are correct, specific error messages otherwise. Use username='admin' and password='secret123'.",
      difficulty: "medium",
      category: "nested_conditions",
      starterCode: `# Validate login credentials
username = 'admin'
password = 'wrong'
correct_username = 'admin'
correct_password = 'secret123'
# Use nested if statements for validation`,
      solution: `username = 'admin'
password = 'wrong'
correct_username = 'admin'
correct_password = 'secret123'

if username == correct_username:
    if password == correct_password:
        print('Login successful')
    else:
        print('Incorrect password')
else:
    print('Username not found')`,
      expectedOutput: "Incorrect password",
      hints: [
        "First check the username",
        "Only check password if username is correct",
        "Nest the password check inside the username check",
      ],
    },
    {
      id: 6,
      title: "Number Category",
      description:
        "Write a program that categorizes a number. First check if it's positive, negative, or zero. If positive, check if it's even or odd.",
      difficulty: "medium",
      category: "nested_conditions",
      starterCode: `# Categorize a number with nested conditions
number = 8
# First check sign, then if positive check even/odd`,
      solution: `number = 8
if number > 0:
    print('Positive')
    if number % 2 == 0:
        print('Even')
    else:
        print('Odd')
elif number < 0:
    print('Negative')
else:
    print('Zero')`,
      expectedOutput: "Positive\nEven",
      hints: [
        "Use % 2 == 0 to check for even numbers",
        "Nest the even/odd check inside the positive check",
        "Handle all three cases: positive, negative, zero",
      ],
    },
    {
      id: 7,
      title: "Age Group and Activity",
      description:
        "Write a program that suggests activities based on age and weather. For children (0-12): 'indoor games' if raining, 'playground' if sunny. For teens (13-19): 'video games' if raining, 'sports' if sunny. For adults (20+): 'reading' if raining, 'hiking' if sunny.",
      difficulty: "hard",
      category: "nested_conditions",
      starterCode: `# Suggest activity based on age and weather
age = 15
weather = 'sunny'  # 'sunny' or 'raining'
# Use nested conditions for age groups and weather`,
      solution: `age = 15
weather = 'sunny'  # 'sunny' or 'raining'

if age <= 12:
    if weather == 'raining':
        print('indoor games')
    else:
        print('playground')
elif age <= 19:
    if weather == 'raining':
        print('video games')
    else:
        print('sports')
else:
    if weather == 'raining':
        print('reading')
    else:
        print('hiking')`,
      expectedOutput: "sports",
      hints: [
        "First categorize by age group",
        "Then check weather within each age group",
        "Use <= to define age ranges clearly",
      ],
    },
    {
      id: 8,
      title: "Truthy Values Test",
      description:
        "Write a program that tests various values for truthiness. Check these values: True, 1, 'hello', [1,2,3], {'key': 'value'}. Print 'Truthy' or 'Falsy' for each.",
      difficulty: "easy",
      category: "truthy_falsy",
      starterCode: `# Test truthy values
values = [True, 1, 'hello', [1,2,3], {'key': 'value'}]
# Check each value and print 'Truthy' or 'Falsy'`,
      solution: `values = [True, 1, 'hello', [1,2,3], {'key': 'value'}]

for value in values:
    if value:
        print(f'{value} is Truthy')
    else:
        print(f'{value} is Falsy')`,
      expectedOutput:
        "True is Truthy\n1 is Truthy\nhello is Truthy\n[1, 2, 3] is Truthy\n{'key': 'value'} is Truthy",
      hints: [
        "Use the value directly in the if condition",
        "Non-zero numbers are truthy",
        "Non-empty collections are truthy",
      ],
    },
    {
      id: 9,
      title: "Falsy Values Test",
      description:
        "Write a program that tests various falsy values. Check these values: False, 0, '', [], {}, None. Print 'Truthy' or 'Falsy' for each.",
      difficulty: "easy",
      category: "truthy_falsy",
      starterCode: `# Test falsy values
values = [False, 0, '', [], {}, None]
# Check each value and print 'Truthy' or 'Falsy'`,
      solution: `values = [False, 0, '', [], {}, None]

for value in values:
    if value:
        print(f'{repr(value)} is Truthy')
    else:
        print(f'{repr(value)} is Falsy')`,
      expectedOutput:
        "False is Falsy\n0 is Falsy\n'' is Falsy\n[] is Falsy\n{} is Falsy\nNone is Falsy",
      hints: [
        "Use repr() to display values properly",
        "Empty collections are falsy",
        "Zero and None are falsy",
      ],
    },
    {
      id: 10,
      title: "Smart Default Values",
      description:
        "Write a program that uses truthy/falsy values to set defaults. If name is provided use it, otherwise use 'Anonymous'. If age is provided use it, otherwise use 'Unknown'. If items list is provided use it, otherwise use empty list.",
      difficulty: "medium",
      category: "truthy_falsy",
      starterCode: `# Use truthy/falsy for default values
name = ''
age = 0
items = []
# Set defaults using truthy/falsy evaluation`,
      solution: `name = ''
age = 0
items = []

# Using truthy/falsy for defaults
display_name = name if name else 'Anonymous'
display_age = age if age else 'Unknown'
display_items = items if items else []

print(f'Name: {display_name}')
print(f'Age: {display_age}')
print(f'Items: {display_items}')

# Alternative using 'or' operator
display_name2 = name or 'Anonymous'
display_age2 = age or 'Unknown'
display_items2 = items or []

print(f'Name (using or): {display_name2}')
print(f'Age (using or): {display_age2}')
print(f'Items (using or): {display_items2}')`,
      expectedOutput:
        "Name: Anonymous\nAge: Unknown\nItems: []\nName (using or): Anonymous\nAge (using or): Unknown\nItems (using or): []",
      hints: [
        "Use 'or' operator for default values",
        "Empty strings and zero are falsy",
        "The 'or' operator returns the first truthy value",
      ],
    },
    {
      id: 11,
      title: "Input Validation",
      description:
        "Write a program that validates user input using truthy/falsy values. Check if email, phone, and address are provided. Print appropriate messages for missing fields.",
      difficulty: "medium",
      category: "truthy_falsy",
      starterCode: `# Validate input fields using truthy/falsy
email = 'user@example.com'
phone = ''
address = None
# Check each field and print validation messages`,
      solution: `email = 'user@example.com'
phone = ''
address = None

print('Validation Results:')

if not email:
    print('❌ Email is required')
else:
    print('✅ Email provided')

if not phone:
    print('❌ Phone is required')
else:
    print('✅ Phone provided')

if not address:
    print('❌ Address is required')
else:
    print('✅ Address provided')

# Overall validation
all_valid = email and phone and address
if all_valid:
    print('\\n✅ All fields valid')
else:
    print('\\n❌ Some fields missing')`,
      expectedOutput:
        "Validation Results:\n✅ Email provided\n❌ Phone is required\n❌ Address is required\n\n❌ Some fields missing",
      hints: [
        "Use 'not' to check for falsy values",
        "Empty strings and None are falsy",
        "Use 'and' to check if all fields are valid",
      ],
    },
    {
      id: 12,
      title: "Complex Decision Making",
      description:
        "Write a program for a movie ticket system. Check age for discount (senior 65+, child under 13), membership status, and show time. Apply different pricing and restrictions based on these conditions.",
      difficulty: "hard",
      category: "complex_conditions",
      starterCode: `# Movie ticket system with complex conditions
age = 70
is_member = True
show_time = 'evening'  # 'morning', 'afternoon', 'evening'
base_price = 12.00

# Apply discounts and restrictions based on multiple conditions`,
      solution: `age = 70
is_member = True
show_time = 'evening'  # 'morning', 'afternoon', 'evening'
base_price = 12.00

# Determine ticket price with complex conditions
if age >= 65:  # Senior discount
    if show_time == 'morning':
        price = base_price * 0.4  # 60% off for morning senior shows
        print('Senior morning special: 60% off')
    else:
        price = base_price * 0.6  # 40% off for other senior shows
        print('Senior discount: 40% off')
elif age < 13:  # Child discount
    price = base_price * 0.5
    print('Child discount: 50% off')
    if show_time == 'evening':
        print('Warning: Evening shows may not be suitable for children')
else:  # Regular pricing
    price = base_price
    print('Regular pricing')

# Apply membership discount
if is_member:
    price *= 0.9  # Additional 10% off for members
    print('Member discount: Additional 10% off')

# Show time restrictions and pricing
if show_time == 'morning':
    print('Morning show: Reduced price already applied')
elif show_time == 'evening':
    if not (age >= 65 or age < 13):  # No evening surcharge for seniors/children
        price += 2.00
        print('Evening surcharge: +$2.00')

print(f'Final ticket price: $ {price:.2f}')`,
      expectedOutput:
        "Senior morning special: 60% off\nMember discount: Additional 10% off\nMorning show: Reduced price already applied\nFinal ticket price: $4.32",
      hints: [
        "Layer conditions from most specific to general",
        "Use nested conditions for complex rules",
        "Apply discounts and surcharges step by step",
        "Consider all combinations of age, membership, and time",
      ],
    },
    {
      id: 1,
      title: "Basic For Loop",
      description:
        "Write a program that prints numbers from 1 to 5 using a for loop and range().",
      difficulty: "easy",
      category: "for_loops",
      starterCode: `# Print numbers 1 to 5 using for loop
# Use range() function`,
      solution: `for i in range(1, 6):
    print(i)`,
      expectedOutput: "1\n2\n3\n4\n5",
      hints: [
        "range(1, 6) generates numbers from 1 to 5",
        "The second parameter in range() is exclusive",
        "Use for loop with range() to iterate over numbers",
      ],
    },
    {
      id: 2,
      title: "For Loop with Step",
      description:
        "Write a program that prints even numbers from 2 to 10 using a for loop with range() and step parameter.",
      difficulty: "easy",
      category: "for_loops",
      starterCode: `# Print even numbers from 2 to 10
# Use range() with step parameter`,
      solution: `for i in range(2, 11, 2):
    print(i)`,
      expectedOutput: "2\n4\n6\n8\n10",
      hints: [
        "range() can take a third parameter for step",
        "range(start, stop, step) - step of 2 for even numbers",
        "Stop value should be 11 to include 10",
      ],
    },
    {
      id: 3,
      title: "Loop Over String",
      description:
        "Write a program that prints each character in the string 'Python' on a separate line using a for loop.",
      difficulty: "easy",
      category: "string_iteration",
      starterCode: `# Loop through each character in 'Python'
word = 'Python'
# Print each character on a separate line`,
      solution: `word = 'Python'
for char in word:
    print(char)`,
      expectedOutput: "P\ny\nt\nh\no\nn",
      hints: [
        "Strings are iterable in Python",
        "Use 'for char in string' to iterate characters",
        "Each iteration gives you one character",
      ],
    },
    {
      id: 4,
      title: "Loop Over List",
      description:
        "Write a program that prints each fruit in the list ['apple', 'banana', 'orange'] using a for loop.",
      difficulty: "easy",
      category: "list_iteration",
      starterCode: `# Loop through a list of fruits
fruits = ['apple', 'banana', 'orange']
# Print each fruit`,
      solution: `fruits = ['apple', 'banana', 'orange']
for fruit in fruits:
    print(fruit)`,
      expectedOutput: "apple\nbanana\norange",
      hints: [
        "Lists are iterable in Python",
        "Use 'for item in list' to iterate over elements",
        "Each iteration gives you one list element",
      ],
    },
    {
      id: 5,
      title: "Loop with Index",
      description:
        "Write a program that prints each fruit with its index number using enumerate(). Format: '0: apple', '1: banana', etc.",
      difficulty: "medium",
      category: "list_iteration",
      starterCode: `# Loop through list with index numbers
fruits = ['apple', 'banana', 'orange']
# Print index and fruit using enumerate()`,
      solution: `fruits = ['apple', 'banana', 'orange']
for index, fruit in fruits:
    print(f'{index}: {fruit}')`,
      expectedOutput: "0: apple\n1: banana\n2: orange",
      hints: [
        "enumerate() returns both index and value",
        "Use two variables in the for loop: index, value",
        "enumerate() starts counting from 0 by default",
      ],
    },
    {
      id: 6,
      title: "Loop Over Dictionary",
      description:
        "Write a program that prints each key-value pair in the dictionary {'name': 'John', 'age': 25, 'city': 'NYC'}. Format: 'name: John'.",
      difficulty: "medium",
      category: "dict_iteration",
      starterCode: `# Loop through dictionary key-value pairs
person = {'name': 'John', 'age': 25, 'city': 'NYC'}
# Print each key-value pair`,
      solution: `person = {'name': 'John', 'age': 25, 'city': 'NYC'}
for key, value in person.items():
    print(f'{key}: {value}')`,
      expectedOutput: "name: John\nage: 25\ncity: NYC",
      hints: [
        "Use .items() to get key-value pairs",
        "Use two variables in the for loop: key, value",
        "Dictionary order is preserved in Python 3.7+",
      ],
    },
    {
      id: 7,
      title: "Dictionary Keys and Values",
      description:
        "Write a program that first prints all keys, then all values from the dictionary {'a': 1, 'b': 2, 'c': 3}.",
      difficulty: "medium",
      category: "dict_iteration",
      starterCode: `# Print dictionary keys and values separately
data = {'a': 1, 'b': 2, 'c': 3}
# First print all keys, then all values`,
      solution: `data = {'a': 1, 'b': 2, 'c': 3}

print('Keys:')
for key in data.keys():
    print(key)

print('Values:')
for value in data.values():
    print(value)`,
      expectedOutput: "Keys:\na\nb\nc\nValues:\n1\n2\n3",
      hints: [
        "Use .keys() to iterate over keys only",
        "Use .values() to iterate over values only",
        "Print a header to separate keys from values",
      ],
    },
    {
      id: 8,
      title: "Basic While Loop",
      description:
        "Write a program that prints numbers from 1 to 5 using a while loop.",
      difficulty: "easy",
      category: "while_loops",
      starterCode: `# Print numbers 1 to 5 using while loop
# Initialize counter and use while condition`,
      solution: `count = 1
while count <= 5:
    print(count)
    count += 1`,
      expectedOutput: "1\n2\n3\n4\n5",
      hints: [
        "Initialize a counter variable before the loop",
        "Use a condition that will eventually become False",
        "Don't forget to increment the counter inside the loop",
      ],
    },
    {
      id: 9,
      title: "While Loop with User Input",
      description:
        "Write a program that keeps asking for a password until the user enters 'secret'. Print 'Access granted' when correct password is entered.",
      difficulty: "medium",
      category: "while_loops",
      starterCode: `# Keep asking for password until correct
correct_password = 'secret'
# Use while loop to keep asking until password matches`,
      solution: `correct_password = 'secret'
password = ''

while password != correct_password:
    password = input('Enter password: ')
    if password != correct_password:
        print('Incorrect password, try again')

print('Access granted')`,
      expectedOutput:
        "Enter password: wrong\nIncorrect password, try again\nEnter password: secret\nAccess granted",
      hints: [
        "Initialize password variable before the loop",
        "Loop continues while password is incorrect",
        "Check password inside the loop and give feedback",
      ],
    },
    {
      id: 10,
      title: "Break Statement",
      description:
        "Write a program that prints numbers from 1 to 10, but stops (breaks) when it reaches 6.",
      difficulty: "easy",
      category: "break_continue",
      starterCode: `# Print numbers 1 to 10, but stop at 6
# Use break statement when number equals 6`,
      solution: `for i in range(1, 11):
    if i == 6:
        break
    print(i)`,
      expectedOutput: "1\n2\n3\n4\n5",
      hints: [
        "Use break to exit the loop immediately",
        "Check the condition before printing",
        "Numbers after 6 should not be printed",
      ],
    },
    {
      id: 11,
      title: "Continue Statement",
      description:
        "Write a program that prints numbers from 1 to 10, but skips (continues) when the number is even.",
      difficulty: "easy",
      category: "break_continue",
      starterCode: `# Print numbers 1 to 10, but skip even numbers
# Use continue statement for even numbers`,
      solution: `for i in range(1, 11):
    if i % 2 == 0:
        continue
    print(i)`,
      expectedOutput: "1\n3\n5\n7\n9",
      hints: [
        "Use continue to skip the rest of the loop iteration",
        "Check if number is even using i % 2 == 0",
        "Only odd numbers should be printed",
      ],
    },
    {
      id: 12,
      title: "Pass Statement",
      description:
        "Write a program that loops through numbers 1 to 5. For now, just use pass statement in the loop body (placeholder for future code).",
      difficulty: "easy",
      category: "break_continue",
      starterCode: `# Loop through numbers 1 to 5
# Use pass statement as placeholder`,
      solution: `for i in range(1, 6):
    pass  # Placeholder - do nothing for now
    
print('Loop completed')`,
      expectedOutput: "Loop completed",
      hints: [
        "pass is a null operation - it does nothing",
        "Use pass when you need syntactically correct code",
        "pass is often used as a placeholder",
      ],
    },
    {
      id: 13,
      title: "Find First Vowel",
      description:
        "Write a program that finds and prints the first vowel in the word 'programming'. Use break to stop after finding the first vowel.",
      difficulty: "medium",
      category: "break_continue",
      starterCode: `# Find first vowel in 'programming'
word = 'programming'
vowels = 'aeiou'
# Use break to stop after finding first vowel`,
      solution: `word = 'programming'
vowels = 'aeiou'

for char in word:
    if char.lower() in vowels:
        print(f'First vowel found: {char}')
        break
else:
    print('No vowels found')`,
      expectedOutput: "First vowel found: o",
      hints: [
        "Use 'in' to check if character is a vowel",
        "Use .lower() to handle both cases",
        "Use break to stop after first match",
      ],
    },
    {
      id: 14,
      title: "Skip Vowels",
      description:
        "Write a program that prints all consonants in the word 'hello' (skips vowels using continue).",
      difficulty: "medium",
      category: "break_continue",
      starterCode: `# Print consonants in 'hello' (skip vowels)
word = 'hello'
vowels = 'aeiou'
# Use continue to skip vowels`,
      solution: `word = 'hello'
vowels = 'aeiou'

for char in word:
    if char.lower() in vowels:
        continue
    print(char)`,
      expectedOutput: "h\nl\nl",
      hints: [
        "Use continue to skip vowels",
        "Check if character is in vowels string",
        "Only consonants should be printed",
      ],
    },
    {
      id: 15,
      title: "Nested Loops",
      description:
        "Write a program that prints a 3x3 multiplication table using nested for loops. Format: '1 x 1 = 1'.",
      difficulty: "medium",
      category: "nested_loops",
      starterCode: `# Create 3x3 multiplication table
# Use nested loops for rows and columns`,
      solution: `for i in range(1, 4):
    for j in range(1, 4):
        result = i * j
        print(f'{i} x {j} = {result}')
    print()  # Empty line after each row`,
      expectedOutput:
        "1 x 1 = 1\n1 x 2 = 2\n1 x 3 = 3\n\n2 x 1 = 2\n2 x 2 = 4\n2 x 3 = 6\n\n3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n",
      hints: [
        "Outer loop for rows, inner loop for columns",
        "Calculate result as i * j",
        "Add empty line after each row for formatting",
      ],
    },
    {
      id: 16,
      title: "List of Lists",
      description:
        "Write a program that prints all elements from a list of lists: [[1, 2], [3, 4], [5, 6]]. Use nested loops.",
      difficulty: "medium",
      category: "nested_loops",
      starterCode: `# Print all elements from nested lists
matrix = [[1, 2], [3, 4], [5, 6]]
# Use nested loops to access all elements`,
      solution: `matrix = [[1, 2], [3, 4], [5, 6]]

for row in matrix:
    for element in row:
        print(element)`,
      expectedOutput: "1\n2\n3\n4\n5\n6",
      hints: [
        "Outer loop iterates over rows (sublists)",
        "Inner loop iterates over elements in each row",
        "Each element is accessed individually",
      ],
    },
    {
      id: 17,
      title: "Sum Calculator",
      description:
        "Write a program that calculates the sum of numbers from 1 to 100 using a for loop.",
      difficulty: "medium",
      category: "accumulator_pattern",
      starterCode: `# Calculate sum of numbers 1 to 100
# Use accumulator pattern with for loop`,
      solution: `total = 0
for i in range(1, 101):
    total += i

print(f'Sum of numbers 1 to 100: {total}')`,
      expectedOutput: "Sum of numbers 1 to 100: 5050",
      hints: [
        "Initialize total to 0 before the loop",
        "Add each number to the total",
        "Use range(1, 101) to include 100",
      ],
    },
    {
      id: 18,
      title: "Count Items",
      description:
        "Write a program that counts how many times the letter 'l' appears in the string 'hello world'.",
      difficulty: "medium",
      category: "accumulator_pattern",
      starterCode: `# Count occurrences of 'l' in 'hello world'
text = 'hello world'
# Use counter variable and for loop`,
      solution: `text = 'hello world'
count = 0

for char in text:
    if char == 'l':
        count += 1

print(f"Letter 'l' appears {count} times")`,
      expectedOutput: "Letter 'l' appears 3 times",
      hints: [
        "Initialize counter to 0",
        "Increment counter when character matches",
        "Check each character in the string",
      ],
    },
    {
      id: 19,
      title: "Shopping Cart Total",
      description:
        "Write a program that calculates the total price of items in a shopping cart. Use the dictionary {'apple': 1.50, 'bread': 2.00, 'milk': 3.25}.",
      difficulty: "medium",
      category: "dict_accumulator",
      starterCode: `# Calculate total price from shopping cart
cart = {'apple': 1.50, 'bread': 2.00, 'milk': 3.25}
# Loop through items and sum prices`,
      solution: `cart = {'apple': 1.50, 'bread': 2.00, 'milk': 3.25}
total = 0

for item, price in cart.items():
    print(f'{item}: $ {price:.2f}')
    total += price

print(f'Total: $ {total:.2f}')`,
      expectedOutput: "apple: $1.50\nbread: $2.00\nmilk: $3.25\nTotal: $6.75",
      hints: [
        "Initialize total to 0",
        "Loop through dictionary items",
        "Add each price to the total",
      ],
    },
    {
      id: 20,
      title: "Advanced Search and Filter",
      description:
        "Write a program that finds all words longer than 4 characters in the list ['cat', 'elephant', 'dog', 'giraffe', 'ant']. Use continue to skip short words and break if you find 3 long words.",
      difficulty: "hard",
      category: "complex_loops",
      starterCode: `# Find words longer than 4 characters, stop after finding 3 animals = ['cat', 'elephant', 'dog', 'giraffe', 'ant']
# Use continue for short words, break after finding 3 long words`,
      solution: `animals = ['cat', 'elephant', 'dog', 'giraffe', 'ant']
long_words = []
found_count = 0

for animal in animals:
    if len(animal) <= 4:
        continue  # Skip short words
    
    long_words.append(animal)
    found_count += 1
    print(f'Found long word: {animal}')
    
    if found_count == 3:
        break  # Stop after finding 3 long words

print(f'Long words found: {long_words}')`,
      expectedOutput:
        "Found long word: elephant\nFound long word: giraffe\nLong words found: ['elephant', 'giraffe']",
      hints: [
        "Use len() to check word length",
        "Use continue to skip short words",
        "Keep a counter for long words found",
        "Use break when you reach the limit",
      ],
    },
    {
      id: 1,
      title: "String Indexing",
      description:
        "Write a program that extracts and prints the first, last, and middle character from the string 'Python'.",
      difficulty: "easy",
      category: "string_indexing",
      starterCode: `# Extract characters from 'Python'
text = 'Python'
# Print first, last, and middle character`,
      solution: `text = 'Python'
print(f'First character: {text[0]}')
print(f'Last character: {text[-1]}')
print(f'Middle character: {text[len(text)//2]}')`,
      expectedOutput:
        "First character: P\nLast character: n\nMiddle character: h",
      hints: [
        "Use index 0 for first character",
        "Use index -1 for last character",
        "Calculate middle using len(text)//2",
      ],
    },
    {
      id: 2,
      title: "String Slicing",
      description:
        "Write a program that extracts different parts from the string 'Hello World': first 5 characters, last 5 characters, every second character, and reverse the string.",
      difficulty: "medium",
      category: "string_slicing",
      starterCode: `# Slice 'Hello World' in different ways
text = 'Hello World'
# Extract: first 5, last 5, every 2nd, reverse`,
      solution: `text = 'Hello World'
print(f'Original: {text}')
print(f'First 5: {text[:5]}')
print(f'Last 5: {text[-5:]}')
print(f'Every 2nd: {text[::2]}')
print(f'Reversed: {text[::-1]}')`,
      expectedOutput:
        "Original: Hello World\nFirst 5: Hello\nLast 5: World\nEvery 2nd: HloWrd\nReversed: dlroW olleH",
      hints: [
        "Use text[:5] for first 5 characters",
        "Use text[-5:] for last 5 characters",
        "Use text[::2] for every second character",
        "Use text[::-1] to reverse",
      ],
    },
    {
      id: 3,
      title: "String Split and Join",
      description:
        "Write a program that splits the sentence 'apple,banana,orange,grape' by commas, then joins them back with ' | ' as separator.",
      difficulty: "easy",
      category: "string_methods",
      starterCode: `# Split by comma and join with pipe
fruits = 'apple,banana,orange,grape'
# Split by comma, then join with ' | '`,
      solution: `fruits = 'apple,banana,orange,grape'
fruit_list = fruits.split(',')
print(f'Split result: {fruit_list}')
joined_fruits = ' | '.join(fruit_list)
print(f'Joined result: {joined_fruits}')`,
      expectedOutput:
        "Split result: ['apple', 'banana', 'orange', 'grape']\nJoined result: apple | banana | orange | grape",
      hints: [
        "Use .split(',') to split by comma",
        "split() returns a list",
        "Use ' | '.join(list) to join with pipe",
      ],
    },
    {
      id: 4,
      title: "String Replace and Case Methods",
      description:
        "Write a program that takes the string 'Hello Python World' and: replaces 'Python' with 'Beautiful', converts to uppercase, lowercase, and title case.",
      difficulty: "easy",
      category: "string_methods",
      starterCode: `# Transform 'Hello Python World'
text = 'Hello Python World'
# Replace 'Python', try different case methods`,
      solution: `text = 'Hello Python World'
print(f'Original: {text}')
print(f'Replaced: {text.replace("Python", "Beautiful")}')
print(f'Uppercase: {text.upper()}')
print(f'Lowercase: {text.lower()}')
print(f'Title case: {text.title()}')
print(f'Capitalized: {text.capitalize()}')`,
      expectedOutput:
        "Original: Hello Python World\nReplaced: Hello Beautiful World\nUppercase: HELLO PYTHON WORLD\nLowercase: hello python world\nTitle case: Hello Python World\nCapitalized: Hello python world",
      hints: [
        "Use .replace(old, new) to replace text",
        "Use .upper() and .lower() for case conversion",
        "Use .title() for title case",
        "Use .capitalize() to capitalize first letter only",
      ],
    },
    {
      id: 5,
      title: "F-String Formatting",
      description:
        "Create variables name='Alice', age=25, score=95.5. Use f-strings to create formatted messages with different number formatting and alignment.",
      difficulty: "medium",
      category: "f_strings",
      starterCode: `# Format data using f-strings
name = 'Alice'
age = 25
score = 95.5
# Create different formatted messages`,
      solution: `name = 'Alice'
age = 25
score = 95.5

print(f'Basic: {name} is {age} years old')
print(f'Score with 1 decimal: {score:.1f}')
print(f'Right aligned name: {name:>10}')
print(f'Left aligned name: {name:<10}!')
print(f'Centered name: {name:^10}')
print(f'Age with leading zeros: {age:03d}')
print(f'Percentage: {score/100:.1%}')`,
      expectedOutput:
        "Basic: Alice is 25 years old\nScore with 1 decimal: 95.5\nRight aligned name:      Alice\nLeft aligned name: Alice     !\nCentered name:   Alice   \nAge with leading zeros: 025\nPercentage: 95.5%",
      hints: [
        "Use {variable:.1f} for decimal formatting",
        "Use {variable:>10} for right alignment",
        "Use {variable:03d} for zero padding",
        "Use {variable:.1%} for percentage",
      ],
    },
    {
      id: 6,
      title: "Advanced String Operations",
      description:
        "Write a program that checks if email 'user@example.com' is valid: contains '@', ends with '.com', and extract username and domain parts.",
      difficulty: "medium",
      category: "string_validation",
      starterCode: `# Validate and parse email address
email = 'user@example.com'
# Check validity and extract parts`,
      solution: `email = 'user@example.com'

# Validation checks
has_at = '@' in email
ends_com = email.endswith('.com')
starts_letter = email[0].isalpha()

print(f'Email: {email}')
print(f'Contains @: {has_at}')
print(f'Ends with .com: {ends_com}')
print(f'Starts with letter: {starts_letter}')

# Extract parts
if has_at:
    parts = email.split('@')
    username = parts[0]
    domain = parts[1]
    print(f'Username: {username}')
    print(f'Domain: {domain}')

print(f'Is valid: {has_at and ends_com and starts_letter}')`,
      expectedOutput:
        "Email: user@example.com\nContains @: True\nEnds with .com: True\nStarts with letter: True\nUsername: user\nDomain: example.com\nIs valid: True",
      hints: [
        "Use 'in' to check for @ symbol",
        "Use .endswith() to check suffix",
        "Use .split('@') to separate username and domain",
        "Use .isalpha() to check if character is a letter",
      ],
    },
    {
      id: 7,
      title: "List Append and Extend",
      description:
        "Create an empty list. Add individual items using append(), then add multiple items using extend(). Show the difference between the two methods.",
      difficulty: "easy",
      category: "list_methods",
      starterCode: `# Demonstrate append() vs extend()
my_list = []
# Use append() and extend() to add items`,
      solution: `my_list = []
print(f'Initial list: {my_list}')

# Using append
my_list.append('apple')
my_list.append('banana')
print(f'After append: {my_list}')

# Using extend
my_list.extend(['orange', 'grape'])
print(f'After extend: {my_list}')

# Difference demonstration
list1 = [1, 2, 3]
list2 = [1, 2, 3]

list1.append([4, 5])  # Adds list as single element
list2.extend([4, 5])  # Adds elements individually

print(f'Append list: {list1}')
print(f'Extend list: {list2}')`,
      expectedOutput:
        "Initial list: []\nAfter append: ['apple', 'banana']\nAfter extend: ['apple', 'banana', 'orange', 'grape']\nAppend list: [1, 2, 3, [4, 5]]\nExtend list: [1, 2, 3, 4, 5]",
      hints: [
        "append() adds one item to the end",
        "extend() adds multiple items individually",
        "append() can add any object, including lists",
        "extend() only works with iterables",
      ],
    },
    {
      id: 8,
      title: "List Pop and Remove",
      description:
        "Create a list [1, 2, 3, 2, 4, 2, 5]. Use pop() to remove the last item and an item at index 1. Use remove() to remove the first occurrence of 2.",
      difficulty: "easy",
      category: "list_methods",
      starterCode: `# Demonstrate pop() and remove()
numbers = [1, 2, 3, 2, 4, 2, 5]
# Use pop() and remove() methods`,
      solution: `numbers = [1, 2, 3, 2, 4, 2, 5]
print(f'Original list: {numbers}')

# Using pop() - removes and returns last item
last_item = numbers.pop()
print(f'Popped last item: {last_item}')
print(f'List after pop(): {numbers}')

# Using pop(index) - removes and returns item at index
second_item = numbers.pop(1)
print(f'Popped item at index 1: {second_item}')
print(f'List after pop(1): {numbers}')

# Using remove() - removes first occurrence
numbers.remove(2)
print(f'After removing first 2: {numbers}')`,
      expectedOutput:
        "Original list: [1, 2, 3, 2, 4, 2, 5]\nPopped last item: 5\nList after pop(): [1, 2, 3, 2, 4, 2]\nPopped item at index 1: 2\nList after pop(1): [1, 3, 2, 4, 2]\nAfter removing first 2: [1, 3, 4, 2]",
      hints: [
        "pop() without argument removes last item",
        "pop(index) removes item at specific position",
        "remove() removes first occurrence of value",
        "pop() returns the removed item",
      ],
    },
    {
      id: 9,
      title: "List Sorting",
      description:
        "Create a list of names ['Charlie', 'Alice', 'Bob', 'Diana']. Sort it alphabetically using sort(), then reverse it. Also demonstrate sorted() function.",
      difficulty: "easy",
      category: "list_methods",
      starterCode: `# Sort list of names
names = ['Charlie', 'Alice', 'Bob', 'Diana']
# Use sort() method and sorted() function`,
      solution: `names = ['Charlie', 'Alice', 'Bob', 'Diana']
print(f'Original: {names}')

# Using sort() - modifies original list
names.sort()
print(f'After sort(): {names}')

names.sort(reverse=True)
print(f'Reverse sorted: {names}')

# Using sorted() - returns new list
original = ['Charlie', 'Alice', 'Bob', 'Diana']
new_sorted = sorted(original)
print(f'Original unchanged: {original}')
print(f'New sorted list: {new_sorted}')

# Sort by length
names_by_length = sorted(original, key=len)
print(f'Sorted by length: {names_by_length}')`,
      expectedOutput:
        "Original: ['Charlie', 'Alice', 'Bob', 'Diana']\nAfter sort(): ['Alice', 'Bob', 'Charlie', 'Diana']\nReverse sorted: ['Diana', 'Charlie', 'Bob', 'Alice']\nOriginal unchanged: ['Charlie', 'Alice', 'Bob', 'Diana']\nNew sorted list: ['Alice', 'Bob', 'Charlie', 'Diana']\nSorted by length: ['Bob', 'Alice', 'Diana', 'Charlie']",
      hints: [
        "sort() modifies the original list",
        "sorted() returns a new list",
        "Use reverse=True for descending order",
        "Use key parameter for custom sorting",
      ],
    },
    {
      id: 10,
      title: "Basic List Comprehension",
      description:
        "Create a list comprehension that generates squares of numbers from 1 to 10. Then create another that only includes even squares.",
      difficulty: "medium",
      category: "list_comprehensions",
      starterCode: `# Create list comprehensions for squares
# 1. Squares of numbers 1-10
# 2. Even squares only`,
      solution: `# Basic list comprehension
squares = [x**2 for x in range(1, 11)]
print(f'Squares: {squares}')

# List comprehension with condition
even_squares = [x**2 for x in range(1, 11) if x**2 % 2 == 0]
print(f'Even squares: {even_squares}')

# Alternative: filter even numbers first
even_num_squares = [x**2 for x in range(1, 11) if x % 2 == 0]
print(f'Squares of even numbers: {even_num_squares}')

# Comparison with traditional loop
traditional_squares = []
for x in range(1, 11):
    traditional_squares.append(x**2)
print(f'Traditional method: {traditional_squares}')`,
      expectedOutput:
        "Squares: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]\nEven squares: [4, 16, 36, 64, 100]\nSquares of even numbers: [4, 16, 36, 64, 100]\nTraditional method: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]",
      hints: [
        "Syntax: [expression for item in iterable]",
        "Add condition: [expression for item in iterable if condition]",
        "Use x**2 for square",
        "Use % 2 == 0 to check if even",
      ],
    },
    {
      id: 11,
      title: "Advanced List Comprehension",
      description:
        "Create list comprehensions to: 1) Extract vowels from 'Hello World', 2) Convert words to uppercase if they have more than 4 letters from ['cat', 'elephant', 'dog', 'tiger'].",
      difficulty: "medium",
      category: "list_comprehensions",
      starterCode: `# Advanced list comprehensions
text = 'Hello World'
words = ['cat', 'elephant', 'dog', 'tiger']
# 1. Extract vowels from text
# 2. Uppercase long words`,
      solution: `text = 'Hello World'
words = ['cat', 'elephant', 'dog', 'tiger']
vowels = 'aeiouAEIOU'

# Extract vowels
found_vowels = [char for char in text if char in vowels]
print(f'Vowels in "{text}": {found_vowels}')

# Uppercase words longer than 4 characters
long_words_upper = [word.upper() if len(word) > 4 else word for word in words]
print(f'Conditional uppercase: {long_words_upper}')

# Only words longer than 4 characters
long_words_only = [word for word in words if len(word) > 4]
print(f'Only long words: {long_words_only}')

# Word lengths
word_lengths = [len(word) for word in words]
print(f'Word lengths: {word_lengths}')`,
      expectedOutput:
        "Vowels in \"Hello World\": ['e', 'o', 'o']\nConditional uppercase: ['cat', 'ELEPHANT', 'dog', 'TIGER']\nOnly long words: ['elephant', 'tiger']\nWord lengths: [3, 8, 3, 5]",
      hints: [
        "Use conditional expression: value_if_true if condition else value_if_false",
        "Use 'in' to check membership",
        "Use len() to get string length",
        "Combine conditions with 'and', 'or'",
      ],
    },
    {
      id: 12,
      title: "Tuple Creation and Unpacking",
      description:
        "Create a tuple with person data (name, age, city). Demonstrate tuple unpacking and show that tuples are immutable.",
      difficulty: "easy",
      category: "tuples",
      starterCode: `# Work with tuples
# Create person tuple and demonstrate unpacking`,
      solution: `# Create tuple
person = ('Alice', 25, 'New York')
print(f'Person tuple: {person}')
print(f'Type: {type(person)}')

# Tuple unpacking
name, age, city = person
print(f'Unpacked - Name: {name}, Age: {age}, City: {city}')

# Partial unpacking with *
person_extended = ('Bob', 30, 'Chicago', 'Engineer', 'Single')
name, age, *other_info = person_extended
print(f'Name: {name}, Age: {age}, Other: {other_info}')

# Tuple immutability demonstration
coordinates = (10, 20)
print(f'Original coordinates: {coordinates}')
# coordinates[0] = 15  # This would cause an error

# But you can create a new tuple
new_coordinates = (coordinates[0] + 5, coordinates[1])
print(f'New coordinates: {new_coordinates}')`,
      expectedOutput:
        "Person tuple: ('Alice', 25, 'New York')\nType: <class 'tuple'>\nUnpacked - Name: Alice, Age: 25, City: New York\nName: Bob, Age: 30, Other: ['Chicago', 'Engineer', 'Single']\nOriginal coordinates: (10, 20)\nNew coordinates: (15, 20)",
      hints: [
        "Use parentheses () to create tuples",
        "Assign multiple variables: var1, var2 = tuple",
        "Use * to collect remaining items",
        "Tuples are immutable - cannot change after creation",
      ],
    },
    {
      id: 13,
      title: "Tuple Applications",
      description:
        "Use tuples to swap variables, return multiple values from a function, and store coordinates. Demonstrate enumerate() returning tuples.",
      difficulty: "medium",
      category: "tuples",
      starterCode: `# Practical tuple applications
# 1. Variable swapping
# 2. Function returning multiple values
# 3. Working with coordinates`,
      solution: `# Variable swapping using tuples
a = 10
b = 20
print(f'Before swap: a={a}, b={b}')
a, b = b, a
print(f'After swap: a={a}, b={b}')

# Function returning multiple values
def get_name_age():
    return 'John', 28

name, age = get_name_age()
print(f'Function returned: {name}, {age}')

# Working with coordinates
points = [(0, 0), (3, 4), (6, 8)]
for x, y in points:
    distance = (x**2 + y**2)**0.5
    print(f'Point ({x}, {y}) - Distance from origin: {distance:.2f}')

# Enumerate returns tuples
fruits = ['apple', 'banana', 'orange']
for index, fruit in enumerate(fruits):
    print(f'{index}: {fruit}')`,
      expectedOutput:
        "Before swap: a=10, b=20\nAfter swap: a=20, b=10\nFunction returned: John, 28\nPoint (0, 0) - Distance from origin: 0.00\nPoint (3, 4) - Distance from origin: 5.00\nPoint (6, 8) - Distance from origin: 10.00\n0: apple\n1: banana\n2: orange",
      hints: [
        "Tuple unpacking enables easy variable swapping",
        "Functions can return tuples implicitly",
        "Use tuple unpacking in for loops",
        "enumerate() returns (index, value) tuples",
      ],
    },
    {
      id: 14,
      title: "Dictionary Basics",
      description:
        "Create a student dictionary with keys: name, age, grades (list). Use get() method to safely access values and demonstrate keys(), values(), items().",
      difficulty: "easy",
      category: "dictionaries",
      starterCode: `# Work with dictionary basics
# Create student dict and use dict methods`,
      solution: `# Create dictionary
student = {
    'name': 'Emma',
    'age': 20,
    'grades': [85, 92, 78, 96],
    'major': 'Computer Science'
}

print(f'Student: {student}')

# Accessing values
print(f'Name: {student["name"]}')
print(f'Age using get(): {student.get("age")}')

# Safe access with get()
phone = student.get('phone', 'Not provided')
print(f'Phone: {phone}')

# Dictionary methods
print(f'Keys: {list(student.keys())}')
print(f'Values: {list(student.values())}')
print(f'Items: {list(student.items())}')

# Checking if key exists
if 'grades' in student:
    average = sum(student['grades']) / len(student['grades'])
    print(f'Average grade: {average:.1f}')`,
      expectedOutput:
        "Student: {'name': 'Emma', 'age': 20, 'grades': [85, 92, 78, 96], 'major': 'Computer Science'}\nName: Emma\nAge using get(): 20\nPhone: Not provided\nKeys: ['name', 'age', 'grades', 'major']\nValues: ['Emma', 20, [85, 92, 78, 96], 'Computer Science']\nItems: [('name', 'Emma'), ('age', 20), ('grades', [85, 92, 78, 96]), ('major', 'Computer Science')]\nAverage grade: 87.8",
      hints: [
        "Use dict[key] or dict.get(key) to access values",
        "get() method returns None or default if key missing",
        "keys(), values(), items() return dict views",
        "Use 'in' to check if key exists",
      ],
    },
    {
      id: 15,
      title: "Dictionary Operations",
      description:
        "Create two dictionaries and demonstrate updating, merging, and modifying operations. Show different ways to add and remove items.",
      difficulty: "medium",
      category: "dictionaries",
      starterCode: `# Dictionary operations
dict1 = {'a': 1, 'b': 2}
dict2 = {'c': 3, 'd': 4}
# Demonstrate update, merge, add, remove operations`,
      solution: `dict1 = {'a': 1, 'b': 2}
dict2 = {'c': 3, 'd': 4}
print(f'Dict1: {dict1}')
print(f'Dict2: {dict2}')

# Adding items
dict1['e'] = 5
print(f'After adding e: {dict1}')

# Updating with another dictionary
dict1.update(dict2)
print(f'After update: {dict1}')

# Merging dictionaries (Python 3.9+)
dict3 = {'x': 24, 'y': 25}
dict4 = {'z': 26}
merged = dict3 | dict4  # Union operator
print(f'Merged with |: {merged}')

# Alternative merging
merged2 = {**dict3, **dict4}
print(f'Merged with **: {merged2}')

# Removing items
removed_value = dict1.pop('c', 'Not found')
print(f'Removed c: {removed_value}')
print(f'After pop: {dict1}')

# Remove arbitrary item
item = dict1.popitem()
print(f'Popped item: {item}')
print(f'Final dict: {dict1}')`,
      expectedOutput:
        "Dict1: {'a': 1, 'b': 2}\nDict2: {'c': 3, 'd': 4}\nAfter adding e: {'a': 1, 'b': 2, 'e': 5}\nAfter update: {'a': 1, 'b': 2, 'e': 5, 'c': 3, 'd': 4}\nMerged with |: {'x': 24, 'y': 25, 'z': 26}\nMerged with **: {'x': 24, 'y': 25, 'z': 26}\nRemoved c: 3\nAfter pop: {'a': 1, 'b': 2, 'e': 5, 'd': 4}\nPopped item: ('d', 4)\nFinal dict: {'a': 1, 'b': 2, 'e': 5}",
      hints: [
        "Use dict[key] = value to add items",
        "update() merges another dictionary",
        "Use | operator or ** for merging (newer Python)",
        "pop() removes specific key, popitem() removes arbitrary",
      ],
    },
    {
      id: 16,
      title: "Set Creation and Basic Operations",
      description:
        "Create sets from lists and strings. Demonstrate basic set properties: uniqueness, adding/removing elements, and membership testing.",
      difficulty: "easy",
      category: "sets",
      starterCode: `# Work with sets
numbers = [1, 2, 2, 3, 3, 3, 4]
text = 'hello'
# Create sets and demonstrate basic operations`,
      solution: `numbers = [1, 2, 2, 3, 3, 3, 4]
text = 'hello'

# Creating sets
number_set = set(numbers)
char_set = set(text)
print(f'Original list: {numbers}')
print(f'Set from list: {number_set}')
print(f'Set from string: {char_set}')

# Creating set with literals
fruits = {'apple', 'banana', 'orange'}
print(f'Fruit set: {fruits}')

# Adding elements
fruits.add('grape')
print(f'After add: {fruits}')

# Adding multiple elements
fruits.update(['mango', 'kiwi'])
print(f'After update: {fruits}')

# Removing elements
fruits.remove('banana')  # Raises error if not found
print(f'After remove: {fruits}')

fruits.discard('watermelon')  # No error if not found
print(f'After discard: {fruits}')

# Membership testing
print(f'Is apple in set: {"apple" in fruits}')
print(f'Set length: {len(fruits)}')`,
      expectedOutput:
        "Original list: [1, 2, 2, 3, 3, 3, 4]\nSet from list: {1, 2, 3, 4}\nSet from string: {'e', 'h', 'l', 'o'}\nFruit set: {'apple', 'banana', 'orange'}\nAfter add: {'apple', 'banana', 'orange', 'grape'}\nAfter update: {'apple', 'banana', 'orange', 'grape', 'mango', 'kiwi'}\nAfter remove: {'apple', 'orange', 'grape', 'mango', 'kiwi'}\nAfter discard: {'apple', 'orange', 'grape', 'mango', 'kiwi'}\nIs apple in set: True\nSet length: 5",
      hints: [
        "Sets automatically remove duplicates",
        "Use set() to convert list to set",
        "Use {} for set literals (not empty set)",
        "remove() raises error, discard() doesn't",
      ],
    },
    {
      id: 17,
      title: "Set Operations - Union and Intersection",
      description:
        "Write a program that demonstrates set union, intersection, difference, and symmetric difference with two sets of numbers.",
      difficulty: "medium",
      category: "sets",
      starterCode: `# Set operations demonstration
set_a = {1, 2, 3, 4, 5}
set_b = {4, 5, 6, 7, 8}
# Perform and display all set operations`,
      solution: `set_a = {1, 2, 3, 4, 5}
set_b = {4, 5, 6, 7, 8}

print(f'Set A: {set_a}')
print(f'Set B: {set_b}')

# Union - all elements from both sets
union = set_a | set_b
union_alt = set_a.union(set_b)
print(f'Union (A | B): {union}')

# Intersection - common elements
intersection = set_a & set_b
intersection_alt = set_a.intersection(set_b)
print(f'Intersection (A & B): {intersection}')

# Difference - elements in A but not in B
difference = set_a - set_b
difference_alt = set_a.difference(set_b)
print(f'Difference (A - B): {difference}')

# Symmetric difference - elements in either set but not both
sym_diff = set_a ^ set_b
sym_diff_alt = set_a.symmetric_difference(set_b)
print(f'Symmetric Difference (A ^ B): {sym_diff}')`,
      expectedOutput:
        "Set A: {1, 2, 3, 4, 5}\nSet B: {4, 5, 6, 7, 8}\nUnion (A | B): {1, 2, 3, 4, 5, 6, 7, 8}\nIntersection (A & B): {4, 5}\nDifference (A - B): {1, 2, 3}\nSymmetric Difference (A ^ B): {1, 2, 3, 6, 7, 8}",
      hints: [
        "Use | for union, & for intersection",
        "Use - for difference, ^ for symmetric difference",
        "Each operator has a method equivalent",
        "Sets are unordered collections",
      ],
    },
    {
      id: 18,
      title: "Set Subset and Superset",
      description:
        "Write a program that checks if one set is a subset, superset, or disjoint from another set.",
      difficulty: "medium",
      category: "sets",
      starterCode: `# Check set relationships
set_a = {1, 2, 3}
set_b = {1, 2, 3, 4, 5}
set_c = {6, 7, 8}
# Check subset, superset, and disjoint relationships`,
      solution: `set_a = {1, 2, 3}
set_b = {1, 2, 3, 4, 5}
set_c = {6, 7, 8}

print(f'Set A: {set_a}')
print(f'Set B: {set_b}')
print(f'Set C: {set_c}')

# Subset - all elements of A are in B
print(f'Is A subset of B: {set_a.issubset(set_b)}')
print(f'Is A subset of B (using <=): {set_a <= set_b}')

# Superset - B contains all elements of A
print(f'Is B superset of A: {set_b.issuperset(set_a)}')
print(f'Is B superset of A (using >=): {set_b >= set_a}')

# Proper subset/superset (not equal)
print(f'Is A proper subset of B: {set_a < set_b}')
print(f'Is B proper superset of A: {set_b > set_a}')

# Disjoint - no common elements
print(f'Are A and C disjoint: {set_a.isdisjoint(set_c)}')
print(f'Are A and B disjoint: {set_a.isdisjoint(set_b)}')`,
      expectedOutput:
        "Set A: {1, 2, 3}\nSet B: {1, 2, 3, 4, 5}\nSet C: {6, 7, 8}\nIs A subset of B: True\nIs A subset of B (using <=): True\nIs B superset of A: True\nIs B superset of A (using >=): True\nIs A proper subset of B: True\nIs B proper superset of A: True\nAre A and C disjoint: True\nAre A and B disjoint: False",
      hints: [
        "Use issubset() or <= to check subsets",
        "Use issuperset() or >= to check supersets",
        "Use < or > for proper subset/superset",
        "isdisjoint() checks if sets have no common elements",
      ],
    },
    {
      id: 1,
      title: "Basic Function Definition",
      description:
        "Write a function that takes a name parameter and returns a greeting message.",
      difficulty: "easy",
      category: "functions",
      starterCode: `# Define a greeting function
def greet(name):
    # Return greeting message
    pass

# Test the function
print(greet('Alice'))`,
      solution: `def greet(name):
    return f'Hello, {name}! Welcome!'

print(greet('Alice'))`,
      expectedOutput: "Hello, Alice! Welcome!",
      hints: [
        "Use the return statement to send back a value",
        "Use f-strings for string formatting",
        "Function names should be descriptive",
      ],
    },
    {
      id: 2,
      title: "Function with Multiple Parameters",
      description:
        "Write a function that calculates the area of a rectangle given length and width.",
      difficulty: "easy",
      category: "functions",
      starterCode: `# Calculate rectangle area
def calculate_area(length, width):
    # Calculate and return area
    pass

# Test the function
print(calculate_area(5, 3))`,
      solution: `def calculate_area(length, width):
    area = length * width
    return area

print(calculate_area(5, 3))`,
      expectedOutput: "15",
      hints: [
        "Area = length × width",
        "Return the calculated value",
        "Parameters are passed in order",
      ],
    },
    {
      id: 3,
      title: "Function with Default Parameters",
      description:
        "Write a function that calculates power with a default exponent of 2 (square).",
      difficulty: "easy",
      category: "functions",
      starterCode: `# Power function with default exponent
def power(base, exponent=2):
    # Calculate and return power
    pass

# Test with and without exponent
print(power(3))      # Should square 3
print(power(2, 3))   # Should calculate 2^3`,
      solution: `def power(base, exponent=2):
    result = base ** exponent
    return result

print(power(3))      # 3^2 = 9
print(power(2, 3))   # 2^3 = 8`,
      expectedOutput: "9\n8",
      hints: [
        "Set default value in parameter: exponent=2",
        "Use ** operator for exponentiation",
        "Default parameters come after required parameters",
      ],
    },
    {
      id: 4,
      title: "Function Returning Multiple Values",
      description:
        "Write a function that returns both quotient and remainder of division.",
      difficulty: "medium",
      category: "functions",
      starterCode: `# Return quotient and remainder
def divide_with_remainder(dividend, divisor):
    # Calculate and return quotient and remainder
    pass

# Test the function
quotient, remainder = divide_with_remainder(17, 5)
print(f'Quotient: {quotient}, Remainder: {remainder}')`,
      solution: `def divide_with_remainder(dividend, divisor):
    quotient = dividend // divisor
    remainder = dividend % divisor
    return quotient, remainder

quotient, remainder = divide_with_remainder(17, 5)
print(f'Quotient: {quotient}, Remainder: {remainder}')`,
      expectedOutput: "Quotient: 3, Remainder: 2",
      hints: [
        "Use // for integer division",
        "Use % for remainder",
        "Return multiple values as a tuple",
        "Unpack returned values into variables",
      ],
    },
    {
      id: 5,
      title: "Args - Variable Number of Arguments",
      description:
        "Write a function that calculates the sum of any number of arguments using *args.",
      difficulty: "medium",
      category: "functions",
      starterCode: `# Sum function with variable arguments
def calculate_sum(*args):
    # Sum all arguments
    pass

# Test with different number of arguments
print(calculate_sum(1, 2, 3))
print(calculate_sum(10, 20, 30, 40, 50))`,
      solution: `def calculate_sum(*args):
    total = sum(args)
    return total

print(calculate_sum(1, 2, 3))
print(calculate_sum(10, 20, 30, 40, 50))`,
      expectedOutput: "6\n150",
      hints: [
        "*args collects all arguments into a tuple",
        "Use sum() function on args",
        "You can pass any number of arguments",
        "args is just a naming convention",
      ],
    },
    {
      id: 6,
      title: "Kwargs - Keyword Arguments",
      description:
        "Write a function that creates a person profile using **kwargs.",
      difficulty: "medium",
      category: "functions",
      starterCode: `# Create profile with keyword arguments
def create_profile(**kwargs):
    # Print all key-value pairs
    pass

# Test the function
create_profile(name='John', age=30, city='NYC', job='Engineer')`,
      solution: `def create_profile(**kwargs):
    profile = []
    for key, value in kwargs.items():
        profile.append(f'{key}: {value}')
    return '\\n'.join(profile)

print(create_profile(name='John', age=30, city='NYC', job='Engineer'))`,
      expectedOutput: "name: John\nage: 30\ncity: NYC\njob: Engineer",
      hints: [
        "**kwargs collects keyword arguments into a dictionary",
        "Use .items() to iterate over key-value pairs",
        "kwargs is treated as a dictionary",
        "You can pass any keyword arguments",
      ],
    },
    {
      id: 7,
      title: "Lambda Functions",
      description:
        "Create lambda functions for common operations: square, check even, concatenate strings.",
      difficulty: "medium",
      category: "functions",
      starterCode: `# Create lambda functions
square = None  # lambda to square a number
is_even = None  # lambda to check if even
concat = None  # lambda to concatenate two strings

# Test the lambdas
print(square(5))
print(is_even(4))
print(concat('Hello', 'World'))`,
      solution: `# Create lambda functions
square = lambda x: x ** 2
is_even = lambda x: x % 2 == 0
concat = lambda a, b: a + ' ' + b

# Test the lambdas
print(square(5))
print(is_even(4))
print(concat('Hello', 'World'))`,
      expectedOutput: "25\nTrue\nHello World",
      hints: [
        "Lambda syntax: lambda parameters: expression",
        "Lambda functions are anonymous (no name needed)",
        "They return the result of the expression",
        "Use for simple, one-line functions",
      ],
    },
    {
      id: 8,
      title: "Map Function",
      description:
        "Use map() with lambda to convert a list of temperatures from Celsius to Fahrenheit.",
      difficulty: "medium",
      category: "functions",
      starterCode: `# Convert temperatures using map
celsius = [0, 10, 20, 30, 40]
# Use map() with lambda to convert to Fahrenheit
# Formula: F = C * 9/5 + 32`,
      solution: `celsius = [0, 10, 20, 30, 40]

# Using map with lambda
fahrenheit = list(map(lambda c: c * 9/5 + 32, celsius))

print(f'Celsius: {celsius}')
print(f'Fahrenheit: {fahrenheit}')`,
      expectedOutput:
        "Celsius: [0, 10, 20, 30, 40]\nFahrenheit: [32.0, 50.0, 68.0, 86.0, 104.0]",
      hints: [
        "map() applies a function to each item",
        "Formula: F = C × 9/5 + 32",
        "Convert map object to list",
        "Lambda is useful for simple transformations",
      ],
    },
    {
      id: 9,
      title: "Filter Function",
      description:
        "Use filter() to get all numbers greater than 50 from a list.",
      difficulty: "medium",
      category: "functions",
      starterCode: `# Filter numbers greater than 50
numbers = [23, 45, 67, 89, 12, 56, 34, 78, 90, 43]
# Use filter() with lambda`,
      solution: `numbers = [23, 45, 67, 89, 12, 56, 34, 78, 90, 43]

# Using filter with lambda
greater_than_50 = list(filter(lambda x: x > 50, numbers))

print(f'Original: {numbers}')
print(f'Greater than 50: {greater_than_50}')`,
      expectedOutput:
        "Original: [23, 45, 67, 89, 12, 56, 34, 78, 90, 43]\nGreater than 50: [67, 89, 56, 78, 90]",
      hints: [
        "filter() keeps items where condition is True",
        "Lambda should return True/False",
        "Convert filter object to list",
        "filter() doesn't modify original list",
      ],
    },
    {
      id: 10,
      title: "Reduce Function",
      description:
        "Use reduce() from functools to find the product of all numbers in a list.",
      difficulty: "hard",
      category: "functions",
      starterCode: `# Calculate product using reduce
from functools import reduce

numbers = [1, 2, 3, 4, 5]
# Use reduce() to multiply all numbers`,
      solution: `from functools import reduce

numbers = [1, 2, 3, 4, 5]

# Using reduce to multiply all numbers
product = reduce(lambda x, y: x * y, numbers)

print(f'Numbers: {numbers}')
print(f'Product: {product}')

# Alternative with initial value
product_with_init = reduce(lambda x, y: x * y, numbers, 1)
print(f'Product with init: {product_with_init}')`,
      expectedOutput:
        "Numbers: [1, 2, 3, 4, 5]\nProduct: 120\nProduct with init: 120",
      hints: [
        "reduce() applies function cumulatively",
        "It takes pairs of items and reduces to single value",
        "Lambda takes two parameters for reduce",
        "Optional third parameter is initial value",
      ],
    },
    {
      id: 11,
      title: "Function Scope - Local vs Global",
      description:
        "Demonstrate the difference between local and global variables.",
      difficulty: "medium",
      category: "functions",
      starterCode: `# Demonstrate variable scope
counter = 0  # Global variable

def increment():
    # Modify global counter
    pass

def local_test():
    # Create local variable
    pass

# Test the functions`,
      solution: `counter = 0  # Global variable

def increment():
    global counter
    counter += 1
    print(f'Counter inside function: {counter}')

def local_test():
    local_var = 10
    print(f'Local variable: {local_var}')

print(f'Initial counter: {counter}')
increment()
increment()
print(f'Counter after increments: {counter}')

local_test()
# print(local_var)  # This would cause an error`,
      expectedOutput:
        "Initial counter: 0\nCounter inside function: 1\nCounter inside function: 2\nCounter after increments: 2\nLocal variable: 10",
      hints: [
        "Use 'global' keyword to modify global variables",
        "Local variables only exist within function",
        "Global variables are accessible everywhere",
        "Avoid excessive use of global variables",
      ],
    },
    {
      id: 12,
      title: "Closure Function",
      description: "Create a closure that maintains a counter state.",
      difficulty: "hard",
      category: "functions",
      starterCode: `# Create a closure
def make_counter():
    # Create closure that maintains count
    pass

# Test the closure
counter1 = make_counter()
counter2 = make_counter()`,
      solution: `def make_counter():
    count = 0
    
    def increment():
        nonlocal count
        count += 1
        return count
    
    return increment

# Test the closure
counter1 = make_counter()
counter2 = make_counter()

print(f'Counter 1: {counter1()}')
print(f'Counter 1: {counter1()}')
print(f'Counter 1: {counter1()}')
print(f'Counter 2: {counter2()}')
print(f'Counter 2: {counter2()}')`,
      expectedOutput:
        "Counter 1: 1\nCounter 1: 2\nCounter 1: 3\nCounter 2: 1\nCounter 2: 2",
      hints: [
        "Closure is a function that remembers its environment",
        "Use 'nonlocal' to modify outer function's variables",
        "Each counter maintains its own state",
        "Inner function has access to outer function's variables",
      ],
    },
    {
      id: 13,
      title: "Decorator Basics",
      description:
        "Create a simple decorator that prints function name before execution.",
      difficulty: "hard",
      category: "decorators",
      starterCode: `# Create a decorator
def log_function_call(func):
    # Create wrapper that logs function name
    pass

@log_function_call
def greet(name):
    return f'Hello, {name}!'

# Test the decorated function
print(greet('Alice'))`,
      solution: `def log_function_call(func):
    def wrapper(*args, **kwargs):
        print(f'Calling function: {func.__name__}')
        result = func(*args, **kwargs)
        print(f'Function {func.__name__} completed')
        return result
    return wrapper

@log_function_call
def greet(name):
    return f'Hello, {name}!'

print(greet('Alice'))`,
      expectedOutput:
        "Calling function: greet\nFunction greet completed\nHello, Alice!",
      hints: [
        "Decorator wraps a function with additional functionality",
        "Use *args and **kwargs to pass all arguments",
        "Wrapper function calls the original function",
        "@ syntax applies decorator",
      ],
    },
    {
      id: 14,
      title: "Decorator with Parameters",
      description:
        "Create a decorator that repeats function execution n times.",
      difficulty: "hard",
      category: "decorators",
      starterCode: `# Create parameterized decorator
def repeat(times):
    # Create decorator that repeats function
    pass

@repeat(3)
def say_hello():
    print('Hello!')

# Test the decorated function
say_hello()`,
      solution: `def repeat(times):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for i in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def say_hello():
    print('Hello!')

say_hello()`,
      expectedOutput: "Hello!\nHello!\nHello!",
      hints: [
        "Parameterized decorators need three levels of functions",
        "Outer function takes decorator parameters",
        "Middle function is the actual decorator",
        "Inner function is the wrapper",
      ],
    },
    {
      id: 15,
      title: "Timing Decorator",
      description:
        "Create a decorator that measures and prints function execution time.",
      difficulty: "hard",
      category: "decorators",
      starterCode: `# Create timing decorator
import time

def timing_decorator(func):
    # Measure execution time
    pass

@timing_decorator
def slow_function():
    time.sleep(1)
    return 'Done'

# Test the decorated function
result = slow_function()`,
      solution: `import time

def timing_decorator(func):
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        execution_time = end_time - start_time
        print(f'{func.__name__} took {execution_time:.4f} seconds')
        return result
    return wrapper

@timing_decorator
def slow_function():
    time.sleep(1)
    return 'Done'

result = slow_function()
print(result)`,
      expectedOutput: "slow_function took 1.0001 seconds\nDone",
      hints: [
        "Use time.time() to get current time",
        "Calculate difference between start and end time",
        "Print execution time before returning result",
        "Format time using :.4f for 4 decimal places",
      ],
    },
    {
      id: 1,
      title: "Try-Except Basics",
      description: "Write a program that handles division by zero error.",
      difficulty: "easy",
      category: "exception_handling",
      starterCode: `# Handle division by zero
def safe_divide(a, b):
    # Add try-except to handle division by zero
    pass

# Test the function
print(safe_divide(10, 2))
print(safe_divide(10, 0))`,
      solution: `def safe_divide(a, b):
    try:
        result = a / b
        return result
    except ZeroDivisionError:
        return 'Error: Cannot divide by zero'

print(safe_divide(10, 2))
print(safe_divide(10, 0))`,
      expectedOutput: "5.0\nError: Cannot divide by zero",
      hints: [
        "Use try block for code that might raise exception",
        "Use except to catch specific exceptions",
        "ZeroDivisionError is raised for division by zero",
        "Return or handle error appropriately",
      ],
    },
    {
      id: 2,
      title: "Multiple Exception Types",
      description:
        "Write a function that handles both ValueError and TypeError when converting input to integer.",
      difficulty: "medium",
      category: "exception_handling",
      starterCode: `# Handle multiple exception types
def safe_int_conversion(value):
    # Handle ValueError and TypeError
    pass

# Test cases
print(safe_int_conversion('123'))
print(safe_int_conversion('abc'))
print(safe_int_conversion(None))`,
      solution: `def safe_int_conversion(value):
    try:
        result = int(value)
        return result
    except ValueError:
        return f'ValueError: Cannot convert "{value}" to integer'
    except TypeError:
        return f'TypeError: Cannot convert {type(value).__name__} to integer'

print(safe_int_conversion('123'))
print(safe_int_conversion('abc'))
print(safe_int_conversion(None))`,
      expectedOutput:
        '123\nValueError: Cannot convert "abc" to integer\nTypeError: Cannot convert NoneType to integer',
      hints: [
        "Use multiple except blocks for different exceptions",
        "ValueError is raised for invalid string conversion",
        "TypeError is raised for incompatible types",
        "Order specific exceptions before general ones",
      ],
    },
    {
      id: 3,
      title: "Try-Except-Else-Finally",
      description:
        "Write a function that demonstrates the complete try-except-else-finally structure.",
      difficulty: "medium",
      category: "exception_handling",
      starterCode: `# Complete exception handling structure
def read_and_process(filename):
    # Use try-except-else-finally
    pass

# Test the function
read_and_process('data.txt')`,
      solution: `def read_and_process(filename):
    file = None
    try:
        file = open(filename, 'r')
        data = file.read()
        print(f'File content: {data}')
    except FileNotFoundError:
        print(f'Error: File "{filename}" not found')
    except PermissionError:
        print(f'Error: No permission to read "{filename}"')
    else:
        print('File read successfully')
    finally:
        if file:
            file.close()
            print('File closed')
        print('Cleanup completed')

read_and_process('data.txt')`,
      expectedOutput: 'Error: File "data.txt" not found\nCleanup completed',
      hints: [
        "else block runs if no exception occurs",
        "finally block always runs",
        "finally is useful for cleanup operations",
        "Close files in finally to ensure cleanup",
      ],
    },
    {
      id: 4,
      title: "Raising Exceptions",
      description:
        "Create a function that validates age and raises ValueError for invalid values.",
      difficulty: "medium",
      category: "exception_handling",
      starterCode: `# Raise custom exceptions
def validate_age(age):
    # Raise ValueError for invalid age
    pass

# Test cases
try:
    validate_age(25)
    validate_age(-5)
except ValueError as e:
    print(f'Error: {e}')`,
      solution: `def validate_age(age):
    if not isinstance(age, int):
        raise TypeError('Age must be an integer')
    if age < 0:
        raise ValueError('Age cannot be negative')
    if age > 150:
        raise ValueError('Age seems unrealistic')
    print(f'Valid age: {age}')
    return True

# Test cases
try:
    validate_age(25)
    validate_age(-5)
except (ValueError, TypeError) as e:
    print(f'Error: {e}')
    
try:
    validate_age(200)
except ValueError as e:
    print(f'Error: {e}')`,
      expectedOutput:
        "Valid age: 25\nError: Age cannot be negative\nError: Age seems unrealistic",
      hints: [
        "Use 'raise' keyword to raise exceptions",
        "Provide descriptive error messages",
        "Check conditions before raising",
        "Use appropriate exception types",
      ],
    },
    {
      id: 5,
      title: "Custom Exception Classes",
      description: "Create custom exception classes for a banking application.",
      difficulty: "hard",
      category: "exception_handling",
      starterCode: `# Define custom exceptions
class InsufficientFundsError(Exception):
    pass

class InvalidAmountError(Exception):
    pass

# Create BankAccount class with custom exceptions
class BankAccount:
    def __init__(self, balance=0):
        self.balance = balance
    
    def withdraw(self, amount):
        # Implement with custom exceptions
        pass
    
    def deposit(self, amount):
        # Implement with custom exceptions
        pass`,
      solution: `class InsufficientFundsError(Exception):
    pass

class InvalidAmountError(Exception):
    pass

class BankAccount:
    def __init__(self, balance=0):
        self.balance = balance
    
    def withdraw(self, amount):
        if amount <= 0:
            raise InvalidAmountError('Withdrawal amount must be positive')
        if amount > self.balance:
            raise InsufficientFundsError(f'Insufficient funds. Balance: {self.balance}')
        self.balance -= amount
        return self.balance
    
    def deposit(self, amount):
        if amount <= 0:
            raise InvalidAmountError('Deposit amount must be positive')
        self.balance += amount
        return self.balance

# Test the account
account = BankAccount(100)
try:
    print(f'Balance: {account.balance}')
    account.deposit(50)
    print(f'After deposit: {account.balance}')
    account.withdraw(200)
except (InsufficientFundsError, InvalidAmountError) as e:
    print(f'Transaction failed: {e}')`,
      expectedOutput:
        "Balance: 100\nAfter deposit: 150\nTransaction failed: Insufficient funds. Balance: 150",
      hints: [
        "Custom exceptions inherit from Exception",
        "Use descriptive names ending with 'Error'",
        "Pass error messages to exception constructor",
        "Raise custom exceptions like built-in ones",
      ],
    },
    {
      id: 1,
      title: "Read Text File",
      description:
        "Write a program that reads and prints the contents of a text file line by line.",
      difficulty: "easy",
      category: "file_handling",
      starterCode: `# Read file line by line
def read_file(filename):
    # Read and print each line
    pass

# Test (will work if file exists)
# read_file('sample.txt')`,
      solution: `def read_file(filename):
    try:
        with open(filename, 'r') as file:
            for line_num, line in enumerate(file, 1):
                print(f'{line_num}: {line.strip()}')
    except FileNotFoundError:
        print(f'File "{filename}" not found')

# Example usage with a test file
# read_file('sample.txt')

# Creating a sample file for demonstration
with open('sample.txt', 'w') as f:
    f.write('Line 1\\nLine 2\\nLine 3')

read_file('sample.txt')`,
      expectedOutput: "1: Line 1\n2: Line 2\n3: Line 3",
      hints: [
        "Use 'with' statement for automatic file closing",
        "Use 'r' mode for reading",
        "enumerate() adds line numbers",
        "strip() removes trailing newlines",
      ],
    },
    {
      id: 2,
      title: "Write to File",
      description:
        "Write a function that writes a list of items to a file, one per line.",
      difficulty: "easy",
      category: "file_handling",
      starterCode: `# Write list to file
def write_list_to_file(filename, items):
    # Write each item on a new line
    pass

# Test the function
items = ['apple', 'banana', 'orange']
write_list_to_file('fruits.txt', items)`,
      solution: `def write_list_to_file(filename, items):
    with open(filename, 'w') as file:
        for item in items:
            file.write(f'{item}\\n')
    print(f'Written {len(items)} items to {filename}')

# Read it back to verify
def read_and_print(filename):
    with open(filename, 'r') as file:
        print(file.read())

items = ['apple', 'banana', 'orange']
write_list_to_file('fruits.txt', items)
read_and_print('fruits.txt')`,
      expectedOutput: "Written 3 items to fruits.txt\napple\nbanana\norange\n",
      hints: [
        "Use 'w' mode for writing (overwrites existing file)",
        "Use write() method to write strings",
        "Add \\n for new lines",
        "with statement closes file automatically",
      ],
    },
    {
      id: 4,
      title: "Read and Write CSV",
      description:
        "Write functions to read from and write to CSV files using the csv module.",
      difficulty: "medium",
      category: "file_handling",
      starterCode: `# Work with CSV files
import csv

def write_csv(filename, data):
    # Write list of dictionaries to CSV
    pass

def read_csv(filename):
    # Read CSV and return list of dictionaries
    pass

# Test data
students = [
    {'name': 'Alice', 'age': 20, 'grade': 'A'},
    {'name': 'Bob', 'age': 21, 'grade': 'B'}
]`,
      solution: `import csv

def write_csv(filename, data):
    if not data:
        return
    
    with open(filename, 'w', newline='') as file:
        fieldnames = data[0].keys()
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(data)
    print(f'Written {len(data)} rows to {filename}')

def read_csv(filename):
    with open(filename, 'r') as file:
        reader = csv.DictReader(file)
        data = list(reader)
    return data

# Test data
students = [
    {'name': 'Alice', 'age': '20', 'grade': 'A'},
    {'name': 'Bob', 'age': '21', 'grade': 'B'}
]

write_csv('students.csv', students)
read_data = read_csv('students.csv')
print('\\nRead from CSV:')
for row in read_data:
    print(row)`,
      expectedOutput:
        "Written 2 rows to students.csv\n\nRead from CSV:\n{'name': 'Alice', 'age': '20', 'grade': 'A'}\n{'name': 'Bob', 'age': '21', 'grade': 'B'}",
      hints: [
        "Use csv.DictWriter for writing dictionaries",
        "Use csv.DictReader for reading as dictionaries",
        "writeheader() writes column names",
        "newline='' prevents extra blank rows",
      ],
    },
    {
      id: 5,
      title: "JSON File Operations",
      description:
        "Write functions to save and load Python objects as JSON files.",
      difficulty: "medium",
      category: "file_handling",
      starterCode: `# Work with JSON files
import json

def save_json(filename, data):
    # Save data as JSON
    pass

def load_json(filename):
    # Load data from JSON
    pass

# Test data
person = {
    'name': 'John',
    'age': 30,
    'hobbies': ['reading', 'coding'],
    'address': {'city': 'NYC', 'zip': '10001'}
}`,
      solution: `import json

def save_json(filename, data):
    with open(filename, 'w') as file:
        json.dump(data, file, indent=2)
    print(f'Data saved to {filename}')

def load_json(filename):
    with open(filename, 'r') as file:
        data = json.load(file)
    return data

# Test data
person = {
    'name': 'John',
    'age': 30,
    'hobbies': ['reading', 'coding'],
    'address': {'city': 'NYC', 'zip': '10001'}
}

save_json('person.json', person)
loaded_data = load_json('person.json')
print('\\nLoaded data:')
print(json.dumps(loaded_data, indent=2))`,
      expectedOutput:
        'Data saved to person.json\n\nLoaded data:\n{\n  "name": "John",\n  "age": 30,\n  "hobbies": [\n    "reading",\n    "coding"\n  ],\n  "address": {\n    "city": "NYC",\n    "zip": "10001"\n  }\n}',
      hints: [
        "Use json.dump() to write to file",
        "Use json.load() to read from file",
        "indent parameter makes output readable",
        "JSON preserves nested structures",
      ],
    },
    {
      id: 1,
      title: "Basic Class Definition",
      description: "Create a simple Dog class with attributes and a method.",
      difficulty: "easy",
      category: "classes",
      starterCode: `# Define Dog class
class Dog:
    def __init__(self, name, breed):
        # Initialize attributes
        pass
    
    def bark(self):
        # Return bark message
        pass

# Create and test
dog = Dog('Buddy', 'Golden Retriever')`,
      solution: `class Dog:
    def __init__(self, name, breed):
        self.name = name
        self.breed = breed
    
    def bark(self):
        return f'{self.name} says Woof!'
    
    def info(self):
        return f'{self.name} is a {self.breed}'

# Create and test
dog = Dog('Buddy', 'Golden Retriever')
print(dog.bark())
print(dog.info())`,
      expectedOutput: "Buddy says Woof!\nBuddy is a Golden Retriever",
      hints: [
        "__init__ is the constructor method",
        "self refers to the instance",
        "Use self.attribute to store instance variables",
        "Methods should have self as first parameter",
      ],
    },
    {
      id: 2,
      title: "Class with Private Attributes",
      description:
        "Create a BankAccount class with private balance attribute and methods to deposit and withdraw.",
      difficulty: "medium",
      category: "classes",
      starterCode: `# Create BankAccount with private attributes
class BankAccount:
    def __init__(self, owner, balance=0):
        # Initialize with private balance
        pass
    
    def deposit(self, amount):
        pass
    
    def withdraw(self, amount):
        pass
    
    def get_balance(self):
        pass`,
      solution:
        "class BankAccount:\n" +
        "    def __init__(self, owner, balance=0):\n" +
        "        self.owner = owner\n" +
        "        self.__balance = balance  # Private attribute\n" +
        "\n" +
        "    def deposit(self, amount):\n" +
        "        if amount > 0:\n" +
        "            self.__balance += amount\n" +
        "            return f'Deposited \\${amount}. New balance: \\${self.__balance}'\n" +
        '        return "Invalid amount"\n' +
        "\n" +
        "    def withdraw(self, amount):\n" +
        "        if 0 < amount <= self.__balance:\n" +
        "            self.__balance -= amount\n" +
        "            return f'Withdrew \\${amount}. New balance: \\${self.__balance}'\n" +
        '        return "Insufficient funds or invalid amount"\n' +
        "\n" +
        "    def get_balance(self):\n" +
        "        return f'Current balance: \\${self.__balance}'\n" +
        "\n" +
        "# Test\n" +
        "account = BankAccount('Alice', 1000)\n" +
        "print(account.get_balance())\n" +
        "print(account.deposit(500))\n" +
        "print(account.withdraw(200))",
      expectedOutput:
        "Current balance: $1000\nDeposited $500. New balance: $1500\nWithdrew $200. New balance: $1300",
      hints: [
        "Use double underscore __ for private attributes",
        "Private attributes can't be accessed directly outside class",
        "Provide getter methods to access private data",
        "Validate inputs in methods",
      ],
    },
    {
      id: 3,
      title: "Class Properties",
      description:
        "Create a Temperature class with property decorators for Celsius and Fahrenheit conversion.",
      difficulty: "medium",
      category: "classes",
      starterCode: `# Temperature class with properties
class Temperature:
    def __init__(self, celsius):
        pass
    
    @property
    def fahrenheit(self):
        pass
    
    @fahrenheit.setter
    def fahrenheit(self, value):
        pass`,
      solution: `class Temperature:
    def __init__(self, celsius=0):
        self._celsius = celsius
    
    @property
    def celsius(self):
        return self._celsius
    
    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError('Temperature below absolute zero')
        self._celsius = value
    
    @property
    def fahrenheit(self):
        return self._celsius * 9/5 + 32
    
    @fahrenheit.setter
    def fahrenheit(self, value):
        self.celsius = (value - 32) * 5/9

# Test
temp = Temperature(25)
print(f'Celsius: {temp.celsius}')
print(f'Fahrenheit: {temp.fahrenheit}')
temp.fahrenheit = 100
print(f'New Celsius: {temp.celsius:.2f}')`,
      expectedOutput: "Celsius: 25\nFahrenheit: 77.0\nNew Celsius: 37.78",
      hints: [
        "@property makes method accessible as attribute",
        "@property_name.setter creates a setter method",
        "Properties provide controlled access to attributes",
        "Validate data in setter methods",
      ],
    },
    {
      id: 4,
      title: "Class Inheritance",
      description:
        "Create a Vehicle base class and Car, Motorcycle subclasses with inheritance.",
      difficulty: "medium",
      category: "inheritance",
      starterCode: `# Create inheritance hierarchy
class Vehicle:
    def __init__(self, brand, model):
        pass
    
    def start(self):
        pass

class Car(Vehicle):
    def __init__(self, brand, model, doors):
        pass

class Motorcycle(Vehicle):
    def __init__(self, brand, model, has_sidecar):
        pass`,
      solution: `class Vehicle:
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model
    
    def start(self):
        return f'{self.brand} {self.model} is starting...'
    
    def info(self):
        return f'Vehicle: {self.brand} {self.model}'

class Car(Vehicle):
    def __init__(self, brand, model, doors):
        super().__init__(brand, model)
        self.doors = doors
    
    def info(self):
        return f'Car: {self.brand} {self.model} with {self.doors} doors'

class Motorcycle(Vehicle):
    def __init__(self, brand, model, has_sidecar):
        super().__init__(brand, model)
        self.has_sidecar = has_sidecar
    
    def info(self):
        sidecar = 'with sidecar' if self.has_sidecar else 'without sidecar'
        return f'Motorcycle: {self.brand} {self.model} {sidecar}'

# Test
car = Car('Toyota', 'Camry', 4)
bike = Motorcycle('Harley', 'Sportster', False)
print(car.start())
print(car.info())
print(bike.start())
print(bike.info())`,
      expectedOutput:
        "Toyota Camry is starting...\nCar: Toyota Camry with 4 doors\nHarley Sportster is starting...\nMotorcycle: Harley Sportster without sidecar",
      hints: [
        "Use super() to call parent class methods",
        "Child classes inherit parent attributes and methods",
        "Override methods in child classes for specific behavior",
        "Use ParentClass as parameter in class definition",
      ],
    },
    {
      id: 5,
      title: "Method Overriding and Super",
      description:
        "Create a Shape hierarchy with area calculation using method overriding.",
      difficulty: "medium",
      category: "inheritance",
      starterCode: `# Shape hierarchy with method overriding
class Shape:
    def __init__(self, name):
        pass
    
    def area(self):
        pass

class Rectangle(Shape):
    def __init__(self, width, height):
        pass
    
    def area(self):
        pass

class Circle(Shape):
    def __init__(self, radius):
        pass
    
    def area(self):
        pass`,
      solution: `import math

class Shape:
    def __init__(self, name):
        self.name = name
    
    def area(self):
        raise NotImplementedError('Subclass must implement area method')
    
    def describe(self):
        return f'{self.name} with area: {self.area():.2f}'

class Rectangle(Shape):
    def __init__(self, width, height):
        super().__init__('Rectangle')
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height

class Circle(Shape):
    def __init__(self, radius):
        super().__init__('Circle')
        self.radius = radius
    
    def area(self):
        return math.pi * self.radius ** 2

# Test
rect = Rectangle(5, 3)
circle = Circle(4)
print(rect.describe())
print(circle.describe())`,
      expectedOutput: "Rectangle with area: 15.00\nCircle with area: 50.27",
      hints: [
        "Override parent methods in child classes",
        "Call parent methods using super()",
        "Each shape calculates area differently",
        "Use math.pi for circle calculations",
      ],
    },
    {
      id: 6,
      title: "Multiple Inheritance",
      description:
        "Demonstrate multiple inheritance with mixins for logging and serialization.",
      difficulty: "hard",
      category: "inheritance",
      starterCode: `# Multiple inheritance with mixins
class LoggerMixin:
    def log(self, message):
        pass

class SerializerMixin:
    def to_dict(self):
        pass

class Product(LoggerMixin, SerializerMixin):
    def __init__(self, name, price):
        pass`,
      solution: `import json
from datetime import datetime

class LoggerMixin:
    def log(self, message):
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        print(f'[{timestamp}] {self.__class__.__name__}: {message}')

class SerializerMixin:
    def to_dict(self):
        return {k: v for k, v in self.__dict__.items() if not k.startswith('_')}
    
    def to_json(self):
        return json.dumps(self.to_dict(), indent=2)

class Product(LoggerMixin, SerializerMixin):
    def __init__(self, name, price, stock):
        self.name = name
        self.price = price
        self.stock = stock
        self.log(f'Product created: {name}')
    
    def sell(self, quantity):
        if quantity <= self.stock:
            self.stock -= quantity
            self.log(f'Sold {quantity} units of {self.name}')
            return True
        self.log(f'Insufficient stock for {self.name}')
        return False

# Test
product = Product('Laptop', 999.99, 10)
print(product.to_json())
product.sell(3)
print(f'\\nRemaining stock: {product.stock}')`,
      expectedOutput:
        '[timestamp] Product: Product created: Laptop\n{\n  "name": "Laptop",\n  "price": 999.99,\n  "stock": 10\n}\n[timestamp] Product: Sold 3 units of Laptop\n\nRemaining stock: 7',
      hints: [
        "Multiple inheritance: class Child(Parent1, Parent2)",
        "Mixins provide reusable functionality",
        "Method Resolution Order (MRO) determines which method is called",
        "Use __dict__ to get object attributes",
      ],
    },
    {
      id: 7,
      title: "Class Methods and Static Methods",
      description: "Create a Date class with class methods and static methods.",
      difficulty: "medium",
      category: "classes",
      starterCode: `# Class methods and static methods
class Date:
    def __init__(self, year, month, day):
        pass
    
    @classmethod
    def from_string(cls, date_string):
        # Create Date from string like "2024-01-15"
        pass
    
    @staticmethod
    def is_valid_date(year, month, day):
        # Check if date is valid
        pass`,
      solution: `class Date:
    def __init__(self, year, month, day):
        self.year = year
        self.month = month
        self.day = day
    
    def __str__(self):
        return f'{self.year}-{self.month:02d}-{self.day:02d}'
    
    @classmethod
    def from_string(cls, date_string):
        year, month, day = map(int, date_string.split('-'))
        return cls(year, month, day)
    
    @classmethod
    def today(cls):
        from datetime import date
        today = date.today()
        return cls(today.year, today.month, today.day)
    
    @staticmethod
    def is_valid_date(year, month, day):
        if month < 1 or month > 12:
            return False
        if day < 1 or day > 31:
            return False
        return True

# Test
date1 = Date(2024, 1, 15)
print(f'Regular constructor: {date1}')

date2 = Date.from_string('2024-12-25')
print(f'From string: {date2}')

print(f'Is valid (2024, 2, 30): {Date.is_valid_date(2024, 2, 30)}')
print(f'Is valid (2024, 12, 15): {Date.is_valid_date(2024, 12, 15)}')`,
      expectedOutput:
        "Regular constructor: 2024-01-15\nFrom string: 2024-12-25\nIs valid (2024, 2, 30): False\nIs valid (2024, 12, 15): True",
      hints: [
        "@classmethod takes cls as first parameter",
        "@staticmethod doesn't take self or cls",
        "Class methods can create alternate constructors",
        "Static methods are utility functions related to the class",
      ],
    },
    {
      id: 8,
      title: "Magic Methods (Dunder Methods)",
      description:
        "Create a Vector class with magic methods for arithmetic operations.",
      difficulty: "hard",
      category: "classes",
      starterCode: `# Vector class with magic methods
class Vector:
    def __init__(self, x, y):
        pass
    
    def __add__(self, other):
        pass
    
    def __str__(self):
        pass
    
    def __eq__(self, other):
        pass`,
      solution: `class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __str__(self):
        return f'Vector({self.x}, {self.y})'
    
    def __repr__(self):
        return f'Vector({self.x}, {self.y})'
    
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)
    
    def __sub__(self, other):
        return Vector(self.x - other.x, self.y - other.y)
    
    def __mul__(self, scalar):
        return Vector(self.x * scalar, self.y * scalar)
    
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y
    
    def __len__(self):
        return int((self.x**2 + self.y**2)**0.5)

# Test
v1 = Vector(3, 4)
v2 = Vector(1, 2)
print(f'v1: {v1}')
print(f'v2: {v2}')
print(f'v1 + v2: {v1 + v2}')
print(f'v1 - v2: {v1 - v2}')
print(f'v1 * 2: {v1 * 2}')
print(f'v1 == v2: {v1 == v2}')
print(f'Magnitude of v1: {len(v1)}')`,
      expectedOutput:
        "v1: Vector(3, 4)\nv2: Vector(1, 2)\nv1 + v2: Vector(4, 6)\nv1 - v2: Vector(2, 2)\nv1 * 2: Vector(6, 8)\nv1 == v2: False\nMagnitude of v1: 5",
      hints: [
        "__str__ for human-readable string",
        "__repr__ for developer-friendly representation",
        "__add__, __sub__, __mul__ for arithmetic",
        "__eq__ for equality comparison",
        "__len__ returns integer length",
      ],
    },
    {
      id: 1,
      title: "List Comprehension with Condition",
      description:
        "Create list comprehensions to filter and transform data in one line.",
      difficulty: "medium",
      category: "comprehensions",
      starterCode: `# Advanced list comprehensions
numbers = range(1, 21)
# 1. Squares of even numbers
# 2. Numbers divisible by 3 or 5
# 3. First letter of words longer than 4 chars
words = ['apple', 'cat', 'elephant', 'dog', 'giraffe']`,
      solution: `numbers = range(1, 21)
words = ['apple', 'cat', 'elephant', 'dog', 'giraffe']

# Squares of even numbers
even_squares = [x**2 for x in numbers if x % 2 == 0]
print(f'Even squares: {even_squares}')

# Numbers divisible by 3 or 5
divisible = [x for x in numbers if x % 3 == 0 or x % 5 == 0]
print(f'Divisible by 3 or 5: {divisible}')

# First letter of long words
first_letters = [word[0].upper() for word in words if len(word) > 4]
print(f'First letters of long words: {first_letters}')

# Conditional expression in comprehension
labels = ['Even' if x % 2 == 0 else 'Odd' for x in range(1, 6)]
print(f'Labels: {labels}')`,
      expectedOutput:
        "Even squares: [4, 16, 36, 64, 100, 144, 196, 256, 324, 400]\nDivisible by 3 or 5: [3, 5, 6, 9, 10, 12, 15, 18, 20]\nFirst letters of long words: ['A', 'E', 'G']\nLabels: ['Odd', 'Even', 'Odd', 'Even', 'Odd']",
      hints: [
        "Syntax: [expression for item in iterable if condition]",
        "Use conditional expression: value_if_true if condition else value_if_false",
        "Combine multiple conditions with and/or",
        "Can access string elements by index",
      ],
    },
    {
      id: 2,
      title: "Nested List Comprehension",
      description:
        "Create nested list comprehensions to work with 2D data structures.",
      difficulty: "hard",
      category: "comprehensions",
      starterCode: `# Nested list comprehensions
# 1. Flatten a 2D list
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
# 2. Create multiplication table
# 3. Extract diagonals`,
      solution: `matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

# Flatten 2D list
flattened = [item for row in matrix for item in row]
print(f'Flattened: {flattened}')

# Create 3x3 multiplication table
mult_table = [[i * j for j in range(1, 4)] for i in range(1, 4)]
print(f'Multiplication table:')
for row in mult_table:
    print(row)

# Extract diagonal
diagonal = [matrix[i][i] for i in range(len(matrix))]
print(f'Diagonal: {diagonal}')

# Transpose matrix
transposed = [[matrix[j][i] for j in range(len(matrix))] for i in range(len(matrix[0]))]
print(f'Transposed:')
for row in transposed:
    print(row)`,
      expectedOutput:
        "Flattened: [1, 2, 3, 4, 5, 6, 7, 8, 9]\nMultiplication table:\n[1, 2, 3]\n[2, 4, 6]\n[3, 6, 9]\nDiagonal: [1, 5, 9]\nTransposed:\n[1, 4, 7]\n[2, 5, 8]\n[3, 6, 9]",
      hints: [
        "Nested: [expr for outer in outer_list for inner in outer]",
        "Order matters in nested comprehensions",
        "Can access 2D elements: matrix[row][col]",
        "Use range(len()) for indices",
      ],
    },
    {
      id: 3,
      title: "Dictionary Comprehension",
      description: "Create dictionaries using comprehension syntax.",
      difficulty: "medium",
      category: "comprehensions",
      starterCode: `# Dictionary comprehensions
# 1. Square numbers as dict
numbers = [1, 2, 3, 4, 5]
# 2. Invert a dictionary
# 3. Filter dictionary by value
original = {'a': 1, 'b': 2, 'c': 3, 'd': 4}`,
      solution: `numbers = [1, 2, 3, 4, 5]
original = {'a': 1, 'b': 2, 'c': 3, 'd': 4}

# Create dict with squares
squares_dict = {num: num**2 for num in numbers}
print(f'Squares dict: {squares_dict}')

# Invert dictionary (swap keys and values)
inverted = {value: key for key, value in original.items()}
print(f'Inverted: {inverted}')

# Filter dictionary by value
filtered = {k: v for k, v in original.items() if v > 2}
print(f'Filtered (value > 2): {filtered}')

# Transform values
doubled = {k: v * 2 for k, v in original.items()}
print(f'Doubled values: {doubled}')

# Create from two lists
keys = ['name', 'age', 'city']
values = ['Alice', 25, 'NYC']
combined = {k: v for k, v in zip(keys, values)}
print(f'Combined: {combined}')`,
      expectedOutput:
        "Squares dict: {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}\nInverted: {1: 'a', 2: 'b', 3: 'c', 4: 'd'}\nFiltered (value > 2): {'c': 3, 'd': 4}\nDoubled values: {'a': 2, 'b': 4, 'c': 6, 'd': 8}\nCombined: {'name': 'Alice', 'age': 25, 'city': 'NYC'}",
      hints: [
        "Syntax: {key: value for item in iterable}",
        "Use .items() to get key-value pairs",
        "Add if condition after the for clause",
        "Use zip() to combine two lists",
      ],
    },
    {
      id: 4,
      title: "Set Comprehension",
      description:
        "Create sets using comprehension syntax to remove duplicates and perform transformations.",
      difficulty: "medium",
      category: "comprehensions",
      starterCode: `# Set comprehensions
# 1. Unique lengths of words
words = ['apple', 'cat', 'banana', 'dog', 'cat', 'apple']
# 2. Unique digits from numbers
numbers = [123, 456, 789, 111, 222]`,
      solution: `words = ['apple', 'cat', 'banana', 'dog', 'cat', 'apple']
numbers = [123, 456, 789, 111, 222]

# Unique word lengths
lengths = {len(word) for word in words}
print(f'Unique word lengths: {lengths}')

# Unique first letters
first_letters = {word[0].upper() for word in words}
print(f'Unique first letters: {first_letters}')

# Unique digits from all numbers
digits = {int(digit) for num in numbers for digit in str(num)}
print(f'Unique digits: {digits}')

# Squares of numbers (no duplicates)
number_list = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
unique_squares = {x**2 for x in number_list}
print(f'Unique squares: {unique_squares}')`,
      expectedOutput:
        "Unique word lengths: {3, 5, 6}\nUnique first letters: {'A', 'C', 'B', 'D'}\nUnique digits: {1, 2, 3, 4, 5, 6, 7, 8, 9}\nUnique squares: {16, 1, 4, 9}",
      hints: [
        "Syntax: {expression for item in iterable}",
        "Sets automatically remove duplicates",
        "Can use nested loops in set comprehensions",
        "Convert to string to iterate digits",
      ],
    },
  ],
  advanced: [
    {
      id: 7,
      title: "List Comprehension",
      description:
        "Create a list of squares of even numbers from 1 to 10 using list comprehension.",
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
        "Check if a number is even using x % 2 == 0",
      ],
    },
    {
      id: 8,
      title: "Dictionary Operations",
      description:
        "Create a function that counts the frequency of characters in a string.",
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
        "Iterate through each character in the string",
      ],
    },
    {
      id: 9,
      title: "Recursive Function",
      description:
        "Write a recursive function to calculate the factorial of a number.",
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
        "Recursive case: n * factorial(n-1)",
      ],
    },
    {
      id: 10,
      title: "Class and Objects",
      description:
        "Create a simple Person class with name and age attributes, and a method to introduce themselves.",
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
        "Return a formatted string in the introduce method",
      ],
    },
    {
      id: 11,
      title: "File Processing",
      description:
        "Create a function that processes a list of numbers and returns statistics.",
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
        "Mode is the most frequent value",
      ],
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
        "Use a counter to limit the sequence",
      ],
    },
    {
      id: 13,
      title: "Decorators",
      description:
        "Create a decorator that measures the execution time of a function.",
      difficulty: "hard",
      category: "decorators",
      starterCode: `import time

def timing_decorator(func):
    # Write your decorator here
    pass

@timing_decorator
def slow_function():
    time.sleep(1)
    return "Done"

result = slow_function()
print(result)`,
      solution: `import time

def timing_decorator(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start:.2f} seconds")
        return result
    return wrapper

@timing_decorator
def slow_function():
    time.sleep(1)
    return "Done"

result = slow_function()
print(result)`,
      expectedOutput: "slow_function took 1.00 seconds\nDone",
      hints: [
        "Use a wrapper function inside the decorator",
        "Capture start and end time using time.time()",
        "Return the wrapper function",
      ],
    },
    {
      id: 14,
      title: "Context Managers",
      description:
        "Create a custom context manager for temporarily changing a variable's value.",
      difficulty: "hard",
      category: "context_managers",
      starterCode: `class TemporaryValue:
    def __init__(self, obj, attr, value):
        # Initialize context manager
        pass
    
    def __enter__(self):
        # Enter context
        pass
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        # Exit context
        pass

# Test
class Config:
    debug = False

config = Config()
print(f"Before: {config.debug}")
with TemporaryValue(config, 'debug', True):
    print(f"Inside: {config.debug}")
print(f"After: {config.debug}")`,
      solution: `class TemporaryValue:
    def __init__(self, obj, attr, value):
        self.obj = obj
        self.attr = attr
        self.new_value = value
        self.old_value = None
    
    def __enter__(self):
        self.old_value = getattr(self.obj, self.attr)
        setattr(self.obj, self.attr, self.new_value)
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        setattr(self.obj, self.attr, self.old_value)
        return False

class Config:
    debug = False

config = Config()
print(f"Before: {config.debug}")
with TemporaryValue(config, 'debug', True):
    print(f"Inside: {config.debug}")
print(f"After: {config.debug}")`,
      expectedOutput: "Before: False\nInside: True\nAfter: False",
      hints: [
        "Store the original value in __enter__",
        "Restore the original value in __exit__",
        "Use getattr and setattr for attribute access",
      ],
    },
    {
      id: 15,
      title: "Regular Expressions",
      description:
        "Extract all email addresses from a text using regular expressions.",
      difficulty: "medium",
      category: "regex",
      starterCode: `import re

def extract_emails(text):
    # Write regex pattern and extract emails
    pass

text = "Contact us at info@example.com or support@test.org for help"
emails = extract_emails(text)
print(emails)`,
      solution: `import re

def extract_emails(text):
    pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
    return re.findall(pattern, text)

text = "Contact us at info@example.com or support@test.org for help"
emails = extract_emails(text)
print(emails)`,
      expectedOutput: "['info@example.com', 'support@test.org']",
      hints: [
        "Use re.findall() to find all matches",
        "Email pattern: username@domain.extension",
        "Use character classes like [a-zA-Z0-9]",
      ],
    },
    {
      id: 16,
      title: "Lambda Functions",
      description:
        "Use lambda functions with map, filter, and reduce to process a list.",
      difficulty: "medium",
      category: "lambda",
      starterCode: `from functools import reduce

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Square all numbers
squared = []  # Use map with lambda

# Filter even numbers
evens = []  # Use filter with lambda

# Sum all numbers
total = 0  # Use reduce with lambda

print(f"Squared: {squared}")
print(f"Evens: {evens}")
print(f"Total: {total}")`,
      solution: `from functools import reduce

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

squared = list(map(lambda x: x**2, numbers))
evens = list(filter(lambda x: x % 2 == 0, numbers))
total = reduce(lambda x, y: x + y, numbers)

print(f"Squared: {squared}")
print(f"Evens: {evens}")
print(f"Total: {total}")`,
      expectedOutput:
        "Squared: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]\nEvens: [2, 4, 6, 8, 10]\nTotal: 55",
      hints: [
        "map() applies a function to all items",
        "filter() selects items based on condition",
        "reduce() accumulates values using a function",
      ],
    },
    {
      id: 17,
      title: "Exception Handling",
      description:
        "Create a function with proper exception handling for division operations.",
      difficulty: "medium",
      category: "exceptions",
      starterCode: `def safe_divide(a, b):
    # Implement with try-except-else-finally
    pass

# Test cases
print(safe_divide(10, 2))
print(safe_divide(10, 0))
print(safe_divide("10", 2))`,
      solution: `def safe_divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        return "Error: Cannot divide by zero"
    except TypeError:
        return "Error: Invalid type for division"
    else:
        return f"Result: {result}"
    finally:
        pass

print(safe_divide(10, 2))
print(safe_divide(10, 0))
print(safe_divide("10", 2))`,
      expectedOutput:
        "Result: 5.0\nError: Cannot divide by zero\nError: Invalid type for division",
      hints: [
        "Use try-except blocks for error handling",
        "Handle ZeroDivisionError and TypeError",
        "else block runs if no exception occurs",
      ],
    },
    {
      id: 18,
      title: "Iterators",
      description:
        "Create a custom iterator class that generates countdown numbers.",
      difficulty: "hard",
      category: "iterators",
      starterCode: `class Countdown:
    def __init__(self, start):
        # Initialize iterator
        pass
    
    def __iter__(self):
        # Return iterator object
        pass
    
    def __next__(self):
        # Return next value or raise StopIteration
        pass

# Test
for num in Countdown(5):
    print(num, end=" ")
print()`,
      solution: `class Countdown:
    def __init__(self, start):
        self.start = start
        self.current = start
    
    def __iter__(self):
        self.current = self.start
        return self
    
    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        self.current -= 1
        return self.current + 1

for num in Countdown(5):
    print(num, end=" ")
print()`,
      expectedOutput: "5 4 3 2 1 ",
      hints: [
        "__iter__ returns self",
        "__next__ returns the next value",
        "Raise StopIteration when done",
      ],
    },
    {
      id: 19,
      title: "Property Decorators",
      description:
        "Create a class with getter, setter, and deleter properties.",
      difficulty: "medium",
      category: "properties",
      starterCode: `class Temperature:
    def __init__(self, celsius):
        # Initialize
        pass
    
    # Add property for fahrenheit with getter, setter, deleter
    pass

# Test
temp = Temperature(25)
print(f"Celsius: {temp.celsius}, Fahrenheit: {temp.fahrenheit}")
temp.fahrenheit = 86
print(f"Celsius: {temp.celsius}, Fahrenheit: {temp.fahrenheit}")`,
      solution: `class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius
    
    @property
    def celsius(self):
        return self._celsius
    
    @celsius.setter
    def celsius(self, value):
        self._celsius = value
    
    @property
    def fahrenheit(self):
        return (self._celsius * 9/5) + 32
    
    @fahrenheit.setter
    def fahrenheit(self, value):
        self._celsius = (value - 32) * 5/9

temp = Temperature(25)
print(f"Celsius: {temp.celsius}, Fahrenheit: {temp.fahrenheit}")
temp.fahrenheit = 86
print(f"Celsius: {temp.celsius}, Fahrenheit: {temp.fahrenheit}")`,
      expectedOutput:
        "Celsius: 25, Fahrenheit: 77.0\nCelsius: 30.0, Fahrenheit: 86.0",
      hints: [
        "Use @property decorator for getter",
        "Use @property_name.setter for setter",
        "Convert between Celsius and Fahrenheit",
      ],
    },
    {
      id: 20,
      title: "Multiple Inheritance",
      description:
        "Create classes demonstrating multiple inheritance and method resolution order.",
      difficulty: "hard",
      category: "inheritance",
      starterCode: `class Flyer:
    def fly(self):
        # Implement fly method
        pass

class Swimmer:
    def swim(self):
        # Implement swim method
        pass

class Duck:
    # Inherit from both Flyer and Swimmer
    pass

# Test
duck = Duck()
duck.fly()
duck.swim()`,
      solution: `class Flyer:
    def fly(self):
        return "Flying in the sky"

class Swimmer:
    def swim(self):
        return "Swimming in water"

class Duck(Flyer, Swimmer):
    def __init__(self):
        pass

duck = Duck()
print(duck.fly())
print(duck.swim())`,
      expectedOutput: "Flying in the sky\nSwimming in water",
      hints: [
        "Use multiple inheritance: class Duck(Flyer, Swimmer)",
        "Duck inherits methods from both parent classes",
        "No need to redefine inherited methods",
      ],
    },
    {
      id: 21,
      title: "Abstract Base Classes",
      description: "Create an abstract base class with abstract methods.",
      difficulty: "hard",
      category: "abc",
      starterCode: `from abc import ABC, abstractmethod

class Shape(ABC):
    # Define abstract methods for area and perimeter
    pass

class Rectangle(Shape):
    def __init__(self, width, height):
        # Initialize
        pass
    
    # Implement abstract methods
    pass

# Test
rect = Rectangle(5, 3)
print(f"Area: {rect.area()}")
print(f"Perimeter: {rect.perimeter()}")`,
      solution: `from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass
    
    @abstractmethod
    def perimeter(self):
        pass

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height
    
    def perimeter(self):
        return 2 * (self.width + self.height)

rect = Rectangle(5, 3)
print(f"Area: {rect.area()}")
print(f"Perimeter: {rect.perimeter()}")`,
      expectedOutput: "Area: 15\nPerimeter: 16",
      hints: [
        "Use ABC as base class",
        "@abstractmethod decorator for abstract methods",
        "Concrete classes must implement all abstract methods",
      ],
    },
    {
      id: 22,
      title: "Threading",
      description:
        "Create a simple multi-threaded program to execute tasks concurrently.",
      difficulty: "hard",
      category: "threading",
      starterCode: `import threading
import time

def task(name, duration):
    # Implement task that prints start and end
    pass

# Create and start threads
# Wait for all threads to complete

print("All tasks completed")`,
      solution: `import threading
import time

def task(name, duration):
    print(f"{name} started")
    time.sleep(duration)
    print(f"{name} completed")

threads = []
tasks_list = [("Task1", 1), ("Task2", 2), ("Task3", 1)]

for name, duration in tasks_list:
    thread = threading.Thread(target=task, args=(name, duration))
    threads.append(thread)
    thread.start()

for thread in threads:
    thread.join()

print("All tasks completed")`,
      expectedOutput:
        "Task1 started\nTask2 started\nTask3 started\nTask1 completed\nTask3 completed\nTask2 completed\nAll tasks completed",
      hints: [
        "Use threading.Thread to create threads",
        "Use thread.start() to begin execution",
        "Use thread.join() to wait for completion",
      ],
    },
    {
      id: 23,
      title: "Asyncio Basics",
      description: "Create an asynchronous function that simulates API calls.",
      difficulty: "hard",
      category: "asyncio",
      starterCode: `import asyncio

async def fetch_data(id):
    # Simulate async operation
    pass

async def main():
    # Run multiple fetch_data calls concurrently
    pass

# Run the async program
asyncio.run(main())`,
      solution: `import asyncio

async def fetch_data(id):
    print(f"Fetching data {id}...")
    await asyncio.sleep(1)
    return f"Data {id}"

async def main():
    tasks = [fetch_data(i) for i in range(1, 4)]
    results = await asyncio.gather(*tasks)
    for result in results:
        print(result)

asyncio.run(main())`,
      expectedOutput:
        "Fetching data 1...\nFetching data 2...\nFetching data 3...\nData 1\nData 2\nData 3",
      hints: [
        "Use async def to define async functions",
        "Use await for async operations",
        "Use asyncio.gather() to run tasks concurrently",
      ],
    },
    {
      id: 24,
      title: "Dataclasses",
      description:
        "Create a dataclass with default values and post-init processing.",
      difficulty: "medium",
      category: "dataclasses",
      starterCode: `from dataclasses import dataclass

# Create a Product dataclass with name, price, and discount
# Calculate final_price in __post_init__

product = Product("Laptop", 1000, 0.1)
print(product)
print(f"Final price: {product.final_price}")`,
      solution: `from dataclasses import dataclass

@dataclass
class Product:
    name: str
    price: float
    discount: float = 0.0
    final_price: float = 0.0
    
    def __post_init__(self):
        self.final_price = self.price * (1 - self.discount)

product = Product("Laptop", 1000, 0.1)
print(product)
print(f"Final price: {product.final_price}")`,
      expectedOutput:
        "Product(name='Laptop', price=1000, discount=0.1, final_price=900.0)\nFinal price: 900.0",
      hints: [
        "Use @dataclass decorator",
        "Type hints for all fields",
        "__post_init__ for post-initialization",
      ],
    },
    {
      id: 25,
      title: "Enums",
      description: "Create an enum for status codes and use it in a function.",
      difficulty: "medium",
      category: "enums",
      starterCode: `from enum import Enum

# Create Status enum with values: PENDING, PROCESSING, COMPLETED, FAILED

def check_status(status):
    # Return message based on status
    pass

# Test
print(check_status(Status.PENDING))
print(check_status(Status.COMPLETED))`,
      solution: `from enum import Enum

class Status(Enum):
    PENDING = 1
    PROCESSING = 2
    COMPLETED = 3
    FAILED = 4

def check_status(status):
    messages = {
        Status.PENDING: "Task is pending",
        Status.PROCESSING: "Task is being processed",
        Status.COMPLETED: "Task completed successfully",
        Status.FAILED: "Task failed"
    }
    return messages.get(status, "Unknown status")

print(check_status(Status.PENDING))
print(check_status(Status.COMPLETED))`,
      expectedOutput: "Task is pending\nTask completed successfully",
      hints: [
        "Inherit from Enum",
        "Define status values",
        "Use dictionary for status messages",
      ],
    },
    {
      id: 26,
      title: "Collections Module",
      description: "Use Counter, defaultdict, and namedtuple from collections.",
      difficulty: "medium",
      category: "collections",
      starterCode: `from collections import Counter, defaultdict, namedtuple

# Count word frequencies
text = "hello world hello python world"
word_count = None  # Use Counter

# Group by length using defaultdict
words = ["a", "ab", "abc", "abcd", "ab"]
grouped = None  # Use defaultdict(list)

# Create Point namedtuple
# Create a point at (3, 4)

print(f"Word count: {word_count}")
print(f"Grouped: {dict(grouped)}")
print(f"Point: {point}")`,
      solution: `from collections import Counter, defaultdict, namedtuple

text = "hello world hello python world"
word_count = Counter(text.split())

words = ["a", "ab", "abc", "abcd", "ab"]
grouped = defaultdict(list)
for word in words:
    grouped[len(word)].append(word)

Point = namedtuple('Point', ['x', 'y'])
point = Point(3, 4)

print(f"Word count: {word_count}")
print(f"Grouped: {dict(grouped)}")
print(f"Point: {point}")`,
      expectedOutput:
        "Word count: Counter({'hello': 2, 'world': 2, 'python': 1})\nGrouped: {1: ['a'], 2: ['ab', 'ab'], 3: ['abc'], 4: ['abcd']}\nPoint: Point(x=3, y=4)",
      hints: [
        "Counter() counts items automatically",
        "defaultdict avoids KeyError",
        "namedtuple creates tuple with named fields",
      ],
    },
    {
      id: 27,
      title: "Type Hints",
      description:
        "Add type hints to a function and use typing module features.",
      difficulty: "medium",
      category: "typing",
      starterCode: `from typing import List, Dict, Optional, Union

def process_users(users, status):
    # Add type hints for parameters and return value
    # Filter users by status and return their names
    pass

users = [
    {"name": "Alice", "status": "active"},
    {"name": "Bob", "status": "inactive"},
    {"name": "Charlie", "status": "active"}
]

result = process_users(users, "active")
print(result)`,
      solution: `from typing import List, Dict, Optional, Union

def process_users(users: List[Dict[str, str]], status: str) -> List[str]:
    return [user["name"] for user in users if user["status"] == status]

users = [
    {"name": "Alice", "status": "active"},
    {"name": "Bob", "status": "inactive"},
    {"name": "Charlie", "status": "active"}
]

result = process_users(users, "active")
print(result)`,
      expectedOutput: "['Alice', 'Charlie']",
      hints: [
        "Use List[Type] for list type hints",
        "Use Dict[KeyType, ValueType] for dictionaries",
        "Return type goes after -> symbol",
      ],
    },
    {
      id: 28,
      title: "Metaclasses",
      description:
        "Create a simple metaclass that adds a class variable to all classes.",
      difficulty: "hard",
      category: "metaclasses",
      starterCode: `class TimestampMeta(type):
    # Create metaclass that adds creation_time
    pass

class MyClass(metaclass=TimestampMeta):
    pass

# Test
import time
obj1 = MyClass()
time.sleep(0.1)
obj2 = MyClass()
print(f"Class created at: {MyClass.creation_time}")`,
      solution: `import time

class TimestampMeta(type):
    def __new__(mcs, name, bases, attrs):
        attrs['creation_time'] = time.time()
        return super().__new__(mcs, name, bases, attrs)

class MyClass(metaclass=TimestampMeta):
    pass

obj1 = MyClass()
time.sleep(0.1)
obj2 = MyClass()
print(f"Class created at: {MyClass.creation_time}")`,
      expectedOutput: "Class created at: [timestamp]",
      hints: [
        "Metaclass inherits from type",
        "Override __new__ method",
        "Add attributes to attrs dictionary",
      ],
    },
    {
      id: 29,
      title: "Pickle Serialization",
      description: "Serialize and deserialize a Python object using pickle.",
      difficulty: "medium",
      category: "serialization",
      starterCode: `import pickle

class User:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def __repr__(self):
        return f"User(name='{self.name}', age={self.age})"

# Create user, serialize to bytes, then deserialize
user = User("Alice", 30)
# Serialize
serialized = None
# Deserialize
deserialized = None

print(f"Original: {user}")
print(f"Deserialized: {deserialized}")`,
      solution: `import pickle

class User:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def __repr__(self):
        return f"User(name='{self.name}', age={self.age})"

user = User("Alice", 30)
serialized = pickle.dumps(user)
deserialized = pickle.loads(serialized)

print(f"Original: {user}")
print(f"Deserialized: {deserialized}")`,
      expectedOutput:
        "Original: User(name='Alice', age=30)\nDeserialized: User(name='Alice', age=30)",
      hints: [
        "pickle.dumps() serializes to bytes",
        "pickle.loads() deserializes from bytes",
        "Object structure must be available",
      ],
    },
    {
      id: 30,
      title: "JSON Processing",
      description: "Parse and create JSON with custom object encoding.",
      difficulty: "medium",
      category: "json",
      starterCode: `import json
from datetime import datetime

class DateTimeEncoder(json.JSONEncoder):
    # Custom encoder for datetime objects
    pass

# Create data with datetime
data = {
    "name": "Event",
    "timestamp": datetime(2025, 1, 1, 12, 0, 0)
}

# Serialize and deserialize
json_str = None  # Use custom encoder
print(json_str)`,
      solution: `import json
from datetime import datetime

class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super().default(obj)

data = {
    "name": "Event",
    "timestamp": datetime(2025, 1, 1, 12, 0, 0)
}

json_str = json.dumps(data, cls=DateTimeEncoder)
print(json_str)`,
      expectedOutput: '{"name": "Event", "timestamp": "2025-01-01T12:00:00"}',
      hints: [
        "Inherit from json.JSONEncoder",
        "Override default() method",
        "Use cls parameter in json.dumps()",
      ],
    },
  ],
};

export const pythonConcepts = {
  basics: {
    title: "Python Basics",
    description:
      "Learn fundamental Python concepts including variables, data types, and basic operations.",
    color: "bg-blue-500",
  },
  variables: {
    title: "Variables & Data Types",
    description:
      "Understanding different data types in Python: strings, integers, floats, and booleans.",
    color: "bg-green-500",
  },
  functions: {
    title: "Functions",
    description: "Learn how to define and use functions to organize your code.",
    color: "bg-purple-500",
  },
  lists: {
    title: "Lists & Arrays",
    description:
      "Working with Python lists, including common operations and methods.",
    color: "bg-yellow-500",
  },
  loops: {
    title: "Loops & Iteration",
    description:
      "Master for loops, while loops, and iteration patterns in Python.",
    color: "bg-red-500",
  },
  conditionals: {
    title: "Conditional Statements",
    description:
      "Learn if, elif, and else statements for decision making in code.",
    color: "bg-indigo-500",
  },
  comprehensions: {
    title: "List Comprehensions",
    description: "Advanced list creation techniques using comprehensions.",
    color: "bg-pink-500",
  },
  dictionaries: {
    title: "Dictionaries & Sets",
    description:
      "Working with key-value pairs and unique collections in Python.",
    color: "bg-teal-500",
  },
  recursion: {
    title: "Recursion",
    description: "Understanding recursive functions and their applications.",
    color: "bg-orange-500",
  },
  oop: {
    title: "Object-Oriented Programming",
    description: "Classes, objects, inheritance, and encapsulation in Python.",
    color: "bg-cyan-500",
  },
  algorithms: {
    title: "Algorithms & Data Structures",
    description: "Common algorithms and data structure implementations.",
    color: "bg-gray-700",
  },
  generators: {
    title: "Generators & Iterators",
    description: "Advanced Python concepts for memory-efficient iteration.",
    color: "bg-emerald-500",
  },
  decorators: {
    title: "Decorators",
    description:
      "Function and class decorators for extending functionality without modification.",
    color: "bg-violet-500",
  },
  context_managers: {
    title: "Context Managers",
    description:
      "Managing resources efficiently with context managers and the with statement.",
    color: "bg-lime-500",
  },
  regex: {
    title: "Regular Expressions",
    description:
      "Pattern matching and text processing using regular expressions.",
    color: "bg-rose-500",
  },
  lambda: {
    title: "Lambda & Functional Programming",
    description: "Functional programming with lambda, map, filter, and reduce.",
    color: "bg-amber-500",
  },
  exceptions: {
    title: "Exception Handling",
    description: "Error handling and creating custom exceptions in Python.",
    color: "bg-red-600",
  },
  iterators: {
    title: "Custom Iterators",
    description:
      "Building custom iterator classes and understanding iteration protocol.",
    color: "bg-sky-500",
  },
  properties: {
    title: "Properties & Descriptors",
    description:
      "Managing attribute access with property decorators and descriptors.",
    color: "bg-fuchsia-500",
  },
  inheritance: {
    title: "Inheritance & Polymorphism",
    description:
      "Multiple inheritance, method resolution order, and polymorphism.",
    color: "bg-blue-600",
  },
  abc: {
    title: "Abstract Base Classes",
    description:
      "Defining interfaces and abstract classes using the ABC module.",
    color: "bg-purple-600",
  },
  threading: {
    title: "Threading & Concurrency",
    description: "Multi-threaded programming and thread synchronization.",
    color: "bg-gray-600",
  },
  asyncio: {
    title: "Async/Await",
    description: "Asynchronous programming with asyncio and coroutines.",
    color: "bg-indigo-600",
  },
  dataclasses: {
    title: "Dataclasses",
    description: "Modern data containers with automatic method generation.",
    color: "bg-green-600",
  },
  enums: {
    title: "Enumerations",
    description: "Creating enumerated constants for better code organization.",
    color: "bg-yellow-600",
  },
  collections: {
    title: "Collections Module",
    description:
      "Specialized container datatypes: Counter, defaultdict, namedtuple, and deque.",
    color: "bg-teal-600",
  },
  typing: {
    title: "Type Hints & Annotations",
    description:
      "Static type checking and type annotations for better code quality.",
    color: "bg-pink-600",
  },
  metaclasses: {
    title: "Metaclasses",
    description: "Advanced class creation and customization using metaclasses.",
    color: "bg-orange-600",
  },
  serialization: {
    title: "Serialization",
    description:
      "Object serialization and deserialization with pickle and JSON.",
    color: "bg-cyan-600",
  },
  json: {
    title: "JSON Processing",
    description: "Working with JSON data and custom encoders/decoders.",
    color: "bg-emerald-600",
  },
  file_io: {
    title: "File I/O Operations",
    description:
      "Reading and writing files, working with different file formats.",
    color: "bg-slate-600",
  },
  pathlib: {
    title: "Path Operations",
    description: "Modern file path handling using pathlib module.",
    color: "bg-stone-600",
  },
  logging: {
    title: "Logging",
    description: "Application logging and debugging with the logging module.",
    color: "bg-zinc-600",
  },
  testing: {
    title: "Unit Testing",
    description:
      "Writing tests with unittest, pytest, and test-driven development.",
    color: "bg-neutral-600",
  },
  packages: {
    title: "Modules & Packages",
    description: "Creating and organizing Python modules and packages.",
    color: "bg-blue-700",
  },
  virtual_env: {
    title: "Virtual Environments",
    description: "Managing project dependencies with virtual environments.",
    color: "bg-green-700",
  },
  pip: {
    title: "Package Management",
    description:
      "Installing and managing packages with pip and requirements files.",
    color: "bg-purple-700",
  },
  comprehensions_advanced: {
    title: "Advanced Comprehensions",
    description:
      "Dict, set, and nested comprehensions for complex data transformations.",
    color: "bg-red-700",
  },
  closures: {
    title: "Closures & Scope",
    description:
      "Understanding variable scope, closures, and nonlocal variables.",
    color: "bg-yellow-700",
  },
  magic_methods: {
    title: "Magic Methods",
    description:
      "Special methods (dunder methods) for operator overloading and customization.",
    color: "bg-indigo-700",
  },
  multiprocessing: {
    title: "Multiprocessing",
    description:
      "Parallel processing using multiple CPU cores with multiprocessing.",
    color: "bg-pink-700",
  },
  networking: {
    title: "Networking & Sockets",
    description: "Network programming with sockets and HTTP requests.",
    color: "bg-teal-700",
  },
  database: {
    title: "Database Operations",
    description: "Working with databases using SQLite, SQL, and ORMs.",
    color: "bg-orange-700",
  },
  web_scraping: {
    title: "Web Scraping",
    description:
      "Extracting data from websites using requests and BeautifulSoup.",
    color: "bg-cyan-700",
  },
  apis: {
    title: "REST APIs",
    description: "Building and consuming RESTful APIs with Flask/FastAPI.",
    color: "bg-emerald-700",
  },
  performance: {
    title: "Performance Optimization",
    title: "Performance & Profiling",
    description:
      "Code optimization, profiling, and performance best practices.",
    color: "bg-gray-800",
  },
  memory_management: {
    title: "Memory Management",
    description:
      "Understanding garbage collection, reference counting, and memory optimization.",
    color: "bg-slate-700",
  },
  design_patterns: {
    title: "Design Patterns",
    description:
      "Common design patterns: Singleton, Factory, Observer, Strategy, and more.",
    color: "bg-violet-600",
  },
  solid_principles: {
    title: "SOLID Principles",
    description: "Writing maintainable code with SOLID design principles.",
    color: "bg-lime-600",
  },
  debugging: {
    title: "Debugging Techniques",
    description:
      "Using debuggers, breakpoints, and debugging tools effectively.",
    color: "bg-rose-600",
  },
  best_practices: {
    title: "Best Practices & PEP8",
    description: "Python coding standards, style guides, and best practices.",
    color: "bg-amber-600",
  },
};

export default { pythonQuestions, pythonConcepts };
