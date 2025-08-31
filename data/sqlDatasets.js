// SQL Practice Datasets
// Contains dummy data for various SQL practice scenarios

export const sqlDatasets = {
  // Employee Management System
  employees: {
    name: "employees",
    description:
      "Employee management data with departments, salaries, and hierarchies",
    tables: {
      employees: {
        columns: [
          "id",
          "name",
          "email",
          "department_id",
          "salary",
          "hire_date",
          "manager_id",
        ],
        data: [
          [1, "John Doe", "john.doe@company.com", 1, 75000, "2022-01-15", null],
          [
            2,
            "Jane Smith",
            "jane.smith@company.com",
            1,
            68000,
            "2022-03-20",
            1,
          ],
          [
            3,
            "Mike Johnson",
            "mike.johnson@company.com",
            2,
            82000,
            "2021-11-10",
            null,
          ],
          [
            4,
            "Sarah Wilson",
            "sarah.wilson@company.com",
            2,
            71000,
            "2022-05-08",
            3,
          ],
          [
            5,
            "David Brown",
            "david.brown@company.com",
            3,
            95000,
            "2020-09-12",
            null,
          ],
          [
            6,
            "Lisa Davis",
            "lisa.davis@company.com",
            3,
            78000,
            "2021-12-03",
            5,
          ],
          [
            7,
            "Tom Miller",
            "tom.miller@company.com",
            1,
            65000,
            "2023-02-14",
            1,
          ],
          [
            8,
            "Amy Garcia",
            "amy.garcia@company.com",
            2,
            73000,
            "2022-08-25",
            3,
          ],
          [
            9,
            "Chris Lee",
            "chris.lee@company.com",
            4,
            89000,
            "2021-06-18",
            null,
          ],
          [
            10,
            "Emma Taylor",
            "emma.taylor@company.com",
            4,
            67000,
            "2023-01-09",
            9,
          ],
        ],
      },
      departments: {
        columns: ["id", "name", "budget", "location"],
        data: [
          [1, "Engineering", 500000, "San Francisco"],
          [2, "Marketing", 200000, "New York"],
          [3, "Sales", 300000, "Chicago"],
          [4, "HR", 150000, "Austin"],
        ],
      },
    },
  },

  // E-commerce System
  ecommerce: {
    name: "ecommerce",
    description:
      "E-commerce data with customers, products, orders, and order items",
    tables: {
      customers: {
        columns: [
          "id",
          "name",
          "email",
          "city",
          "country",
          "registration_date",
        ],
        data: [
          [
            1,
            "Alice Johnson",
            "alice@email.com",
            "New York",
            "USA",
            "2023-01-15",
          ],
          [2, "Bob Smith", "bob@email.com", "London", "UK", "2023-02-20"],
          [
            3,
            "Carol Davis",
            "carol@email.com",
            "Toronto",
            "Canada",
            "2023-03-10",
          ],
          [
            4,
            "David Wilson",
            "david@email.com",
            "Sydney",
            "Australia",
            "2023-04-05",
          ],
          [5, "Eva Brown", "eva@email.com", "Berlin", "Germany", "2023-05-12"],
        ],
      },
      products: {
        columns: [
          "id",
          "name",
          "category",
          "price",
          "stock_quantity",
          "supplier_id",
        ],
        data: [
          [1, "Laptop Pro", "Electronics", 1299.99, 50, 1],
          [2, "Wireless Mouse", "Electronics", 29.99, 200, 1],
          [3, "Office Chair", "Furniture", 249.99, 30, 2],
          [4, "Coffee Mug", "Kitchen", 12.99, 100, 3],
          [5, "Notebook", "Stationery", 5.99, 150, 3],
          [6, "Smartphone", "Electronics", 799.99, 75, 1],
          [7, "Desk Lamp", "Furniture", 89.99, 40, 2],
          [8, "Water Bottle", "Kitchen", 19.99, 80, 3],
        ],
      },
      orders: {
        columns: ["id", "customer_id", "order_date", "total_amount", "status"],
        data: [
          [1, 1, "2023-06-01", 1329.98, "completed"],
          [2, 2, "2023-06-02", 249.99, "completed"],
          [3, 3, "2023-06-03", 42.98, "pending"],
          [4, 1, "2023-06-04", 89.99, "completed"],
          [5, 4, "2023-06-05", 819.98, "shipped"],
          [6, 5, "2023-06-06", 25.98, "completed"],
          [7, 2, "2023-06-07", 1299.99, "pending"],
          [8, 3, "2023-06-08", 12.99, "completed"],
        ],
      },
      order_items: {
        columns: ["id", "order_id", "product_id", "quantity", "unit_price"],
        data: [
          [1, 1, 1, 1, 1299.99],
          [2, 1, 2, 1, 29.99],
          [3, 2, 3, 1, 249.99],
          [4, 3, 4, 1, 12.99],
          [5, 3, 2, 1, 29.99],
          [6, 4, 7, 1, 89.99],
          [7, 5, 6, 1, 799.99],
          [8, 5, 8, 1, 19.99],
          [9, 6, 5, 2, 5.99],
          [10, 6, 4, 1, 12.99],
          [11, 7, 1, 1, 1299.99],
          [12, 8, 4, 1, 12.99],
        ],
      },
      suppliers: {
        columns: ["id", "name", "contact_email", "country"],
        data: [
          [1, "TechCorp", "contact@techcorp.com", "USA"],
          [2, "FurniturePlus", "info@furnitureplus.com", "Canada"],
          [3, "HomeGoods", "sales@homegoods.com", "UK"],
        ],
      },
    },
  },

  // Library Management System
  library: {
    name: "library",
    description:
      "Library management system with books, authors, members, and borrowing records",
    tables: {
      authors: {
        columns: ["id", "name", "birth_year", "nationality"],
        data: [
          [1, "George Orwell", 1903, "British"],
          [2, "Jane Austen", 1775, "British"],
          [3, "Mark Twain", 1835, "American"],
          [4, "Agatha Christie", 1890, "British"],
          [5, "Ernest Hemingway", 1899, "American"],
        ],
      },
      books: {
        columns: [
          "id",
          "title",
          "author_id",
          "genre",
          "publication_year",
          "isbn",
          "copies_available",
        ],
        data: [
          [1, "1984", 1, "Dystopian Fiction", 1949, "978-0-452-28423-4", 3],
          [
            2,
            "Animal Farm",
            1,
            "Political Satire",
            1945,
            "978-0-452-28424-1",
            2,
          ],
          [
            3,
            "Pride and Prejudice",
            2,
            "Romance",
            1813,
            "978-0-14-143951-8",
            4,
          ],
          [
            4,
            "The Adventures of Tom Sawyer",
            3,
            "Adventure",
            1876,
            "978-0-14-243717-4",
            2,
          ],
          [
            5,
            "Murder on the Orient Express",
            4,
            "Mystery",
            1934,
            "978-0-00-711931-2",
            3,
          ],
          [
            6,
            "The Old Man and the Sea",
            5,
            "Literary Fiction",
            1952,
            "978-0-684-80122-3",
            1,
          ],
          [
            7,
            "Sense and Sensibility",
            2,
            "Romance",
            1811,
            "978-0-14-143966-2",
            2,
          ],
        ],
      },
      members: {
        columns: [
          "id",
          "name",
          "email",
          "phone",
          "membership_date",
          "membership_type",
        ],
        data: [
          [
            1,
            "Alex Thompson",
            "alex@email.com",
            "555-0101",
            "2023-01-15",
            "premium",
          ],
          [
            2,
            "Maria Rodriguez",
            "maria@email.com",
            "555-0102",
            "2023-02-20",
            "standard",
          ],
          [
            3,
            "James Wilson",
            "james@email.com",
            "555-0103",
            "2023-03-10",
            "student",
          ],
          [
            4,
            "Sarah Kim",
            "sarah@email.com",
            "555-0104",
            "2023-04-05",
            "premium",
          ],
          [
            5,
            "Michael Chen",
            "michael@email.com",
            "555-0105",
            "2023-05-12",
            "standard",
          ],
        ],
      },
      borrowings: {
        columns: [
          "id",
          "member_id",
          "book_id",
          "borrow_date",
          "due_date",
          "return_date",
          "status",
        ],
        data: [
          [1, 1, 1, "2023-06-01", "2023-06-15", "2023-06-14", "returned"],
          [2, 2, 3, "2023-06-02", "2023-06-16", null, "borrowed"],
          [3, 3, 5, "2023-06-03", "2023-06-17", "2023-06-20", "returned"],
          [4, 1, 2, "2023-06-04", "2023-06-18", null, "borrowed"],
          [5, 4, 4, "2023-06-05", "2023-06-19", null, "borrowed"],
          [6, 5, 6, "2023-06-06", "2023-06-20", "2023-06-19", "returned"],
          [7, 2, 7, "2023-06-07", "2023-06-21", null, "overdue"],
        ],
      },
    },
  },

  // University System
  university: {
    name: "university",
    description:
      "University management system with students, courses, professors, and enrollments",
    tables: {
      students: {
        columns: ["id", "name", "email", "major", "year", "gpa"],
        data: [
          [
            1,
            "John Smith",
            "john.smith@university.edu",
            "Computer Science",
            3,
            3.7,
          ],
          [
            2,
            "Emily Johnson",
            "emily.johnson@university.edu",
            "Mathematics",
            2,
            3.9,
          ],
          [
            3,
            "Michael Brown",
            "michael.brown@university.edu",
            "Physics",
            4,
            3.5,
          ],
          [
            4,
            "Sarah Davis",
            "sarah.davis@university.edu",
            "Computer Science",
            1,
            3.8,
          ],
          [
            5,
            "David Wilson",
            "david.wilson@university.edu",
            "Chemistry",
            3,
            3.4,
          ],
          [
            6,
            "Lisa Garcia",
            "lisa.garcia@university.edu",
            "Mathematics",
            2,
            3.6,
          ],
        ],
      },
      professors: {
        columns: ["id", "name", "email", "department", "hire_date", "salary"],
        data: [
          [
            1,
            "Dr. Robert Lee",
            "r.lee@university.edu",
            "Computer Science",
            "2015-08-20",
            95000,
          ],
          [
            2,
            "Dr. Maria Martinez",
            "m.martinez@university.edu",
            "Mathematics",
            "2012-09-01",
            88000,
          ],
          [
            3,
            "Dr. James Taylor",
            "j.taylor@university.edu",
            "Physics",
            "2018-01-15",
            92000,
          ],
          [
            4,
            "Dr. Jennifer White",
            "j.white@university.edu",
            "Chemistry",
            "2016-03-10",
            89000,
          ],
        ],
      },
      courses: {
        columns: [
          "id",
          "course_code",
          "title",
          "professor_id",
          "credits",
          "semester",
          "max_enrollment",
        ],
        data: [
          [1, "CS101", "Introduction to Programming", 1, 3, "Fall 2023", 30],
          [2, "CS201", "Data Structures", 1, 4, "Fall 2023", 25],
          [3, "MATH201", "Calculus II", 2, 4, "Fall 2023", 35],
          [4, "PHYS101", "General Physics I", 3, 3, "Fall 2023", 40],
          [5, "CHEM101", "General Chemistry", 4, 4, "Fall 2023", 30],
          [6, "MATH101", "Calculus I", 2, 4, "Fall 2023", 35],
        ],
      },
      enrollments: {
        columns: ["id", "student_id", "course_id", "enrollment_date", "grade"],
        data: [
          [1, 1, 1, "2023-08-25", "A"],
          [2, 1, 2, "2023-08-25", "B+"],
          [3, 2, 3, "2023-08-26", "A-"],
          [4, 2, 6, "2023-08-26", "A"],
          [5, 3, 4, "2023-08-27", "B"],
          [6, 4, 1, "2023-08-28", "A-"],
          [7, 5, 5, "2023-08-29", "B+"],
          [8, 6, 3, "2023-08-30", "A"],
          [9, 3, 2, "2023-08-27", null],
          [10, 4, 6, "2023-08-28", null],
        ],
      },
    },
  },
};

// SQL Practice Questions with Expected Results
export const sqlQuestions = [
  // Basic SELECT queries
  {
    id: 1,
    title: "List All Employees",
    description:
      "Write a query to select all employees from the employees table.",
    dataset: "employees",
    difficulty: "easy",
    category: "SELECT",
    question: "Select all columns from the employees table.",
    expectedQuery: "SELECT * FROM employees;",
    hint: "Use SELECT * to get all columns from a table.",
  },
  {
    id: 2,
    title: "Employee Names and Salaries",
    description: "Get the names and salaries of all employees.",
    dataset: "employees",
    difficulty: "easy",
    category: "SELECT",
    question:
      "Select only the name and salary columns from the employees table.",
    expectedQuery: "SELECT name, salary FROM employees;",
    hint: "Specify the column names you want to select.",
  },
  {
    id: 3,
    title: "High Salary Employees",
    description: "Find employees with salary greater than 70000.",
    dataset: "employees",
    difficulty: "easy",
    category: "WHERE",
    question: "Select all employees who earn more than $70,000.",
    expectedQuery: "SELECT * FROM employees WHERE salary > 70000;",
    hint: "Use WHERE clause with a comparison operator.",
  },

  // JOIN queries
  {
    id: 4,
    title: "Employees with Department Names",
    description: "Show employee names along with their department names.",
    dataset: "employees",
    difficulty: "medium",
    category: "JOIN",
    question:
      "Join employees and departments tables to show employee names with their department names.",
    expectedQuery:
      "SELECT e.name, d.name as department_name FROM employees e JOIN departments d ON e.department_id = d.id;",
    hint: "Use JOIN to combine data from multiple tables.",
  },
  {
    id: 5,
    title: "Customer Orders",
    description: "Show customer names with their order totals.",
    dataset: "ecommerce",
    difficulty: "medium",
    category: "JOIN",
    question:
      "Join customers and orders tables to show customer names with their order amounts.",
    expectedQuery:
      "SELECT c.name, o.total_amount FROM customers c JOIN orders o ON c.id = o.customer_id;",
    hint: "Join customers table with orders table using customer_id.",
  },

  // Aggregate functions
  {
    id: 6,
    title: "Average Salary by Department",
    description: "Calculate the average salary for each department.",
    dataset: "employees",
    difficulty: "medium",
    category: "GROUP BY",
    question: "Find the average salary for each department.",
    expectedQuery:
      "SELECT d.name, AVG(e.salary) as avg_salary FROM employees e JOIN departments d ON e.department_id = d.id GROUP BY d.name;",
    hint: "Use GROUP BY with aggregate functions like AVG().",
  },
  {
    id: 7,
    title: "Total Orders per Customer",
    description: "Count the number of orders for each customer.",
    dataset: "ecommerce",
    difficulty: "medium",
    category: "GROUP BY",
    question: "Count how many orders each customer has placed.",
    expectedQuery:
      "SELECT c.name, COUNT(o.id) as order_count FROM customers c LEFT JOIN orders o ON c.id = o.customer_id GROUP BY c.name;",
    hint: "Use COUNT() with GROUP BY. Consider using LEFT JOIN to include customers with no orders.",
  },

  // Complex queries
  {
    id: 8,
    title: "Top Selling Products",
    description: "Find the top 3 products by total quantity sold.",
    dataset: "ecommerce",
    difficulty: "hard",
    category: "SUBQUERY",
    question: "Show the top 3 products with the highest total quantity sold.",
    expectedQuery:
      "SELECT p.name, SUM(oi.quantity) as total_sold FROM products p JOIN order_items oi ON p.id = oi.product_id GROUP BY p.name ORDER BY total_sold DESC LIMIT 3;",
    hint: "Use SUM(), GROUP BY, ORDER BY, and LIMIT.",
  },
  {
    id: 9,
    title: "Students Above Average GPA",
    description: "Find students with GPA above the class average.",
    dataset: "university",
    difficulty: "hard",
    category: "SUBQUERY",
    question:
      "Select students whose GPA is above the average GPA of all students.",
    expectedQuery:
      "SELECT name, gpa FROM students WHERE gpa > (SELECT AVG(gpa) FROM students);",
    hint: "Use a subquery to calculate the average GPA first.",
  },
  {
    id: 10,
    title: "Overdue Books",
    description: "Find all books that are currently overdue.",
    dataset: "library",
    difficulty: "medium",
    category: "WHERE",
    question:
      "Find all borrowings where the book is overdue (past due date and not returned).",
    expectedQuery:
      "SELECT b.title, m.name, br.due_date FROM borrowings br JOIN books b ON br.book_id = b.id JOIN members m ON br.member_id = m.id WHERE br.return_date IS NULL AND br.due_date < CURRENT_DATE;",
    hint: "Check for NULL return_date and due_date less than current date.",
  },
];

export default { sqlDatasets, sqlQuestions };
