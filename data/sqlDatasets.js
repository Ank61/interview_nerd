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

  hospital: {
    name: "hospital",
    description: "Hospital management system with patients, doctors, appointments, and medical records",
    tables: {
      patients: {
        columns: ["id", "name", "date_of_birth", "gender", "phone", "email", "address", "blood_group"],
        data: [
          [1, "Robert Anderson", "1985-03-15", "M", "555-1001", "robert.a@email.com", "123 Oak St", "A+"],
          [2, "Jennifer Martinez", "1992-07-22", "F", "555-1002", "jennifer.m@email.com", "456 Pine Ave", "O+"],
          [3, "William Thompson", "1978-11-30", "M", "555-1003", "william.t@email.com", "789 Maple Dr", "B+"],
          [4, "Patricia Garcia", "1995-05-18", "F", "555-1004", "patricia.g@email.com", "321 Elm St", "AB+"],
          [5, "Christopher Lee", "1988-09-25", "M", "555-1005", "chris.l@email.com", "654 Cedar Ln", "O-"],
          [6, "Nancy White", "1990-12-08", "F", "555-1006", "nancy.w@email.com", "987 Birch Rd", "A-"],
        ],
      },
      doctors: {
        columns: ["id", "name", "specialization", "phone", "email", "years_experience", "consultation_fee"],
        data: [
          [1, "Dr. Steven Clark", "Cardiology", "555-2001", "s.clark@hospital.com", 15, 200],
          [2, "Dr. Michelle Rodriguez", "Pediatrics", "555-2002", "m.rodriguez@hospital.com", 10, 150],
          [3, "Dr. Kevin Harris", "Orthopedics", "555-2003", "k.harris@hospital.com", 12, 180],
          [4, "Dr. Amanda Walker", "Neurology", "555-2004", "a.walker@hospital.com", 18, 250],
          [5, "Dr. Brian Hall", "General Medicine", "555-2005", "b.hall@hospital.com", 8, 100],
        ],
      },
      appointments: {
        columns: ["id", "patient_id", "doctor_id", "appointment_date", "appointment_time", "status", "reason"],
        data: [
          [1, 1, 1, "2023-09-15", "09:00", "completed", "Chest pain"],
          [2, 2, 2, "2023-09-16", "10:30", "completed", "Child vaccination"],
          [3, 3, 3, "2023-09-17", "14:00", "cancelled", "Knee pain"],
          [4, 4, 4, "2023-09-18", "11:00", "completed", "Headache"],
          [5, 5, 5, "2023-09-19", "15:30", "scheduled", "Regular checkup"],
          [6, 1, 1, "2023-09-20", "09:30", "scheduled", "Follow-up"],
          [7, 6, 2, "2023-09-21", "10:00", "completed", "Fever"],
          [8, 3, 3, "2023-09-22", "13:00", "scheduled", "Back pain"],
        ],
      },
      medical_records: {
        columns: ["id", "patient_id", "doctor_id", "diagnosis", "prescription", "record_date", "follow_up_required"],
        data: [
          [1, 1, 1, "Hypertension", "Beta blockers", "2023-09-15", 1],
          [2, 2, 2, "Common cold", "Paracetamol", "2023-09-16", 0],
          [3, 4, 4, "Migraine", "Pain relievers", "2023-09-18", 1],
          [4, 6, 2, "Viral fever", "Antibiotics", "2023-09-21", 0],
        ],
      },
    },
  },

  banking: {
    name: "banking",
    description: "Banking system with accounts, transactions, loans, and credit cards",
    tables: {
      accounts: {
        columns: ["id", "account_number", "customer_name", "account_type", "balance", "opening_date", "status", "branch_id"],
        data: [
          [1, "ACC001", "John Williams", "Savings", 25000, "2020-01-15", "active", 1],
          [2, "ACC002", "Mary Johnson", "Checking", 15000, "2021-03-20", "active", 1],
          [3, "ACC003", "James Brown", "Savings", 50000, "2019-06-10", "active", 2],
          [4, "ACC004", "Linda Davis", "Checking", 8000, "2022-02-28", "active", 2],
          [5, "ACC005", "Robert Wilson", "Savings", 100000, "2018-11-05", "active", 3],
          [6, "ACC006", "Barbara Moore", "Checking", 3000, "2023-01-12", "frozen", 1],
          [7, "ACC007", "Michael Taylor", "Savings", 75000, "2020-08-22", "active", 3],
        ],
      },
      transactions: {
        columns: ["id", "account_id", "transaction_type", "amount", "transaction_date", "description", "balance_after"],
        data: [
          [1, 1, "deposit", 5000, "2023-09-01", "Salary", 25000],
          [2, 1, "withdrawal", 1000, "2023-09-05", "ATM withdrawal", 24000],
          [3, 2, "deposit", 3000, "2023-09-02", "Check deposit", 15000],
          [4, 3, "withdrawal", 10000, "2023-09-03", "Transfer", 40000],
          [5, 4, "deposit", 2000, "2023-09-04", "Cash deposit", 8000],
          [6, 5, "withdrawal", 5000, "2023-09-06", "Bill payment", 95000],
          [7, 1, "transfer", 2000, "2023-09-07", "Transfer to ACC002", 22000],
          [8, 2, "transfer", 2000, "2023-09-07", "Transfer from ACC001", 17000],
        ],
      },
      loans: {
        columns: ["id", "account_id", "loan_type", "loan_amount", "interest_rate", "loan_date", "tenure_months", "status"],
        data: [
          [1, 1, "Home", 500000, 7.5, "2022-01-15", 240, "active"],
          [2, 3, "Car", 80000, 8.0, "2022-06-20", 60, "active"],
          [3, 5, "Personal", 50000, 10.5, "2023-03-10", 36, "active"],
          [4, 2, "Education", 100000, 6.5, "2021-08-01", 84, "active"],
          [5, 7, "Home", 750000, 7.0, "2020-12-15", 300, "closed"],
        ],
      },
      branches: {
        columns: ["id", "branch_name", "branch_code", "city", "state", "manager_name"],
        data: [
          [1, "Main Branch", "BR001", "New York", "NY", "Richard Anderson"],
          [2, "Downtown Branch", "BR002", "Los Angeles", "CA", "Susan Martinez"],
          [3, "Westside Branch", "BR003", "Chicago", "IL", "Thomas Jackson"],
        ],
      },
    },
  },

  // Flight Reservation System
  flights: {
    name: "flights",
    description: "Flight reservation system with airlines, flights, passengers, and bookings",
    tables: {
      airlines: {
        columns: ["id", "airline_name", "airline_code", "country", "fleet_size"],
        data: [
          [1, "SkyHigh Airlines", "SKY", "USA", 150],
          [2, "Global Airways", "GLB", "UK", 200],
          [3, "Pacific Air", "PAC", "Australia", 100],
          [4, "Euro Express", "EUR", "Germany", 120],
        ],
      },
      flights: {
        columns: ["id", "flight_number", "airline_id", "origin", "destination", "departure_time", "arrival_time", "price", "seats_available"],
        data: [
          [1, "SKY101", 1, "New York", "London", "2023-10-15 08:00", "2023-10-15 20:00", 850, 180],
          [2, "GLB202", 2, "London", "Paris", "2023-10-15 10:30", "2023-10-15 12:30", 250, 150],
          [3, "PAC303", 3, "Sydney", "Tokyo", "2023-10-16 14:00", "2023-10-16 22:00", 920, 200],
          [4, "EUR404", 4, "Berlin", "Rome", "2023-10-16 09:00", "2023-10-16 11:30", 180, 120],
          [5, "SKY102", 1, "Los Angeles", "Tokyo", "2023-10-17 11:00", "2023-10-18 15:00", 1100, 180],
          [6, "GLB203", 2, "Paris", "New York", "2023-10-17 16:00", "2023-10-17 19:00", 900, 150],
        ],
      },
      passengers: {
        columns: ["id", "first_name", "last_name", "email", "phone", "passport_number", "nationality"],
        data: [
          [1, "Daniel", "Cooper", "daniel.c@email.com", "555-3001", "P12345678", "USA"],
          [2, "Sophia", "Bennett", "sophia.b@email.com", "555-3002", "P23456789", "UK"],
          [3, "Oliver", "Sullivan", "oliver.s@email.com", "555-3003", "P34567890", "Australia"],
          [4, "Emma", "Peterson", "emma.p@email.com", "555-3004", "P45678901", "Canada"],
          [5, "Lucas", "Reed", "lucas.r@email.com", "555-3005", "P56789012", "USA"],
        ],
      },
      bookings: {
        columns: ["id", "passenger_id", "flight_id", "booking_date", "seat_number", "booking_status", "total_price"],
        data: [
          [1, 1, 1, "2023-09-01", "12A", "confirmed", 850],
          [2, 2, 2, "2023-09-02", "15C", "confirmed", 250],
          [3, 3, 3, "2023-09-03", "8B", "confirmed", 920],
          [4, 1, 6, "2023-09-04", "20D", "confirmed", 900],
          [5, 4, 4, "2023-09-05", "5A", "cancelled", 180],
          [6, 5, 5, "2023-09-06", "18F", "confirmed", 1100],
        ],
      },
    },
  },

  // Social Media System
  social: {
    name: "social",
    description: "Social media platform with users, posts, comments, and likes",
    tables: {
      users: {
        columns: ["id", "username", "email", "full_name", "bio", "join_date", "followers_count", "following_count"],
        data: [
          [1, "tech_guru", "techguru@social.com", "Alex Thompson", "Tech enthusiast", "2022-01-15", 5000, 200],
          [2, "travel_junkie", "traveler@social.com", "Maria Santos", "World traveler", "2022-03-20", 8000, 150],
          [3, "foodie_life", "foodie@social.com", "Carlos Rodriguez", "Food blogger", "2022-05-10", 12000, 300],
          [4, "fitness_pro", "fitness@social.com", "Jessica Lee", "Fitness coach", "2022-07-05", 15000, 100],
          [5, "art_lover", "artlover@social.com", "David Kim", "Digital artist", "2022-09-12", 3000, 250],
        ],
      },
      posts: {
        columns: ["id", "user_id", "content", "post_date", "likes_count", "comments_count", "shares_count"],
        data: [
          [1, 1, "Just finished building my new PC!", "2023-09-01 10:00", 150, 25, 10],
          [2, 2, "Amazing sunset in Santorini", "2023-09-02 18:30", 500, 80, 45],
          [3, 3, "Best pizza recipe ever!", "2023-09-03 12:00", 350, 60, 30],
          [4, 4, "Morning workout routine", "2023-09-04 06:00", 200, 40, 15],
          [5, 1, "New programming tutorial out now", "2023-09-05 14:00", 180, 30, 20],
          [6, 5, "Digital art commission open", "2023-09-06 11:00", 120, 15, 8],
          [7, 2, "Exploring Tokyo streets", "2023-09-07 20:00", 600, 90, 50],
        ],
      },
      comments: {
        columns: ["id", "post_id", "user_id", "comment_text", "comment_date", "likes_count"],
        data: [
          [1, 1, 2, "Awesome build! What specs?", "2023-09-01 11:00", 10],
          [2, 1, 3, "Nice! How much did it cost?", "2023-09-01 12:00", 5],
          [3, 2, 1, "Stunning view!", "2023-09-02 19:00", 15],
          [4, 3, 4, "I need to try this!", "2023-09-03 13:00", 20],
          [5, 4, 5, "Great routine, thanks for sharing", "2023-09-04 07:00", 8],
          [6, 2, 4, "Added to my bucket list", "2023-09-02 20:00", 12],
        ],
      },
      follows: {
        columns: ["id", "follower_id", "following_id", "follow_date"],
        data: [
          [1, 1, 2, "2023-01-20"],
          [2, 1, 3, "2023-02-15"],
          [3, 2, 1, "2023-03-10"],
          [4, 2, 4, "2023-04-05"],
          [5, 3, 1, "2023-05-12"],
          [6, 4, 2, "2023-06-08"],
          [7, 5, 1, "2023-07-20"],
          [8, 5, 3, "2023-08-15"],
        ],
      },
    },
  },

  // Inventory Management System
  inventory: {
    name: "inventory",
    description: "Inventory management system with products, warehouses, and stock movements",
    tables: {
      products: {
        columns: ["id", "name", "category", "unit_price", "reorder_level", "supplier_id"],
        data: [
          [1, "Laptop Dell XPS", "Electronics", 1299.99, 5, 1],
          [2, "Office Chair Ergonomic", "Furniture", 299.99, 10, 2],
          [3, "Wireless Keyboard", "Electronics", 79.99, 20, 1],
          [4, "Desk Lamp LED", "Furniture", 49.99, 15, 2],
          [5, "Notebook Set", "Stationery", 12.99, 50, 3],
          [6, "Stapler Heavy Duty", "Office Supplies", 24.99, 30, 3],
          [7, "Monitor 24inch", "Electronics", 199.99, 8, 1],
          [8, "Filing Cabinet", "Furniture", 149.99, 12, 2],
        ],
      },
      warehouses: {
        columns: ["id", "name", "location", "capacity_sqft", "manager_id"],
        data: [
          [1, "Main Warehouse", "New York", 10000, 101],
          [2, "West Coast Hub", "Los Angeles", 8000, 102],
          [3, "Central Storage", "Chicago", 6000, 103],
          [4, "South Distribution", "Atlanta", 5000, 104],
        ],
      },
      inventory_levels: {
        columns: ["id", "product_id", "warehouse_id", "quantity", "last_updated"],
        data: [
          [1, 1, 1, 15, "2023-09-01"],
          [2, 1, 2, 8, "2023-09-02"],
          [3, 2, 1, 25, "2023-09-01"],
          [4, 2, 3, 12, "2023-09-03"],
          [5, 3, 1, 45, "2023-09-01"],
          [6, 3, 2, 30, "2023-09-02"],
          [7, 4, 1, 20, "2023-09-01"],
          [8, 4, 4, 18, "2023-09-04"],
          [9, 5, 1, 100, "2023-09-01"],
          [10, 6, 2, 60, "2023-09-02"],
          [11, 7, 1, 12, "2023-09-01"],
          [12, 8, 3, 8, "2023-09-03"],
        ],
      },
      stock_movements: {
        columns: ["id", "product_id", "warehouse_id", "movement_type", "quantity", "movement_date", "reference"],
        data: [
          [1, 1, 1, "IN", 20, "2023-08-15", "PO-001"],
          [2, 1, 1, "OUT", 5, "2023-08-20", "SO-001"],
          [3, 2, 1, "IN", 30, "2023-08-16", "PO-002"],
          [4, 2, 1, "OUT", 5, "2023-08-22", "SO-002"],
          [5, 3, 1, "IN", 50, "2023-08-17", "PO-003"],
          [6, 3, 1, "OUT", 5, "2023-08-25", "SO-003"],
          [7, 1, 2, "IN", 10, "2023-08-18", "PO-004"],
          [8, 1, 2, "OUT", 2, "2023-08-26", "SO-004"],
        ],
      },
    },
  },

  // Project Management System
  projects: {
    name: "projects",
    description: "Project management system with projects, tasks, teams, and time tracking",
    tables: {
      projects: {
        columns: ["id", "name", "description", "start_date", "end_date", "budget", "status", "manager_id"],
        data: [
          [1, "Website Redesign", "Complete website overhaul with new design", "2023-09-01", "2023-12-31", 50000, "active", 101],
          [2, "Mobile App Development", "New cross-platform mobile application", "2023-10-01", "2024-03-31", 75000, "planning", 102],
          [3, "Database Migration", "Migrate legacy database to cloud", "2023-08-15", "2023-11-30", 30000, "active", 103],
          [4, "Marketing Campaign", "Q4 marketing campaign launch", "2023-11-01", "2024-01-31", 25000, "pending", 104],
          [5, "Security Audit", "Comprehensive security assessment", "2023-09-15", "2023-10-31", 15000, "active", 105],
        ],
      },
      tasks: {
        columns: ["id", "project_id", "name", "description", "assignee_id", "start_date", "due_date", "status", "priority", "estimated_hours"],
        data: [
          [1, 1, "Design Mockups", "Create initial design mockups", 201, "2023-09-01", "2023-09-15", "completed", "high", 40],
          [2, 1, "Frontend Development", "Implement frontend components", 202, "2023-09-16", "2023-10-15", "in_progress", "high", 80],
          [3, 1, "Backend API", "Develop backend APIs", 203, "2023-09-20", "2023-10-30", "in_progress", "high", 60],
          [4, 2, "Requirements Gathering", "Collect and document requirements", 204, "2023-10-01", "2023-10-15", "not_started", "medium", 20],
          [5, 3, "Data Analysis", "Analyze existing database structure", 205, "2023-08-15", "2023-09-15", "completed", "high", 35],
          [6, 3, "Migration Scripting", "Create migration scripts", 206, "2023-09-16", "2023-10-31", "in_progress", "high", 50],
          [7, 5, "Vulnerability Assessment", "Scan for security vulnerabilities", 207, "2023-09-15", "2023-10-15", "in_progress", "high", 25],
        ],
      },
      team_members: {
        columns: ["id", "name", "email", "role", "department", "hire_date", "salary"],
        data: [
          [101, "Alice Johnson", "alice.j@company.com", "Project Manager", "Management", "2020-03-15", 85000],
          [102, "Bob Smith", "bob.s@company.com", "Senior PM", "Management", "2019-06-20", 95000],
          [103, "Carol Davis", "carol.d@company.com", "Technical Lead", "IT", "2021-01-10", 78000],
          [104, "David Wilson", "david.w@company.com", "Marketing Manager", "Marketing", "2020-08-12", 72000],
          [105, "Eva Brown", "eva.b@company.com", "Security Specialist", "IT", "2022-03-01", 82000],
          [201, "Frank Miller", "frank.m@company.com", "UI/UX Designer", "Design", "2021-05-20", 65000],
          [202, "Grace Lee", "grace.l@company.com", "Frontend Developer", "Development", "2021-08-15", 70000],
          [203, "Henry Clark", "henry.c@company.com", "Backend Developer", "Development", "2020-11-30", 75000],
          [204, "Ivy Garcia", "ivy.g@company.com", "Business Analyst", "Analysis", "2022-02-14", 68000],
          [205, "Jack Taylor", "jack.t@company.com", "Database Admin", "IT", "2019-09-25", 80000],
          [206, "Karen White", "karen.w@company.com", "DevOps Engineer", "IT", "2021-12-05", 77000],
          [207, "Leo Martinez", "leo.m@company.com", "Security Analyst", "IT", "2022-04-10", 76000],
        ],
      },
      time_entries: {
        columns: ["id", "task_id", "team_member_id", "entry_date", "hours_worked", "description", "billable"],
        data: [
          [1, 1, 201, "2023-09-01", 8, "Initial design research", 1],
          [2, 1, 201, "2023-09-02", 6, "Wireframe creation", 1],
          [3, 1, 201, "2023-09-03", 7, "Mockup refinement", 1],
          [4, 2, 202, "2023-09-16", 8, "React component setup", 1],
          [5, 2, 202, "2023-09-17", 6, "UI implementation", 1],
          [6, 3, 203, "2023-09-20", 8, "API design", 1],
          [7, 5, 205, "2023-08-15", 8, "Database analysis", 1],
          [8, 5, 205, "2023-08-16", 7, "Schema documentation", 1],
          [9, 7, 207, "2023-09-15", 8, "Security scanning setup", 1],
        ],
      },
    },
  },

  // Customer Relationship Management (CRM)
  crm: {
    name: "crm",
    description: "CRM system with leads, contacts, opportunities, and activities",
    tables: {
      leads: {
        columns: ["id", "first_name", "last_name", "company", "email", "phone", "source", "status", "created_date", "assigned_to"],
        data: [
          [1, "John", "Anderson", "TechCorp Inc", "john.anderson@techcorp.com", "555-1001", "website", "new", "2023-09-01", 101],
          [2, "Sarah", "Mitchell", "Global Solutions", "sarah.m@globalsolutions.com", "555-1002", "referral", "contacted", "2023-09-02", 102],
          [3, "Mike", "Roberts", "Innovate LLC", "mike.r@innovate.com", "555-1003", "conference", "qualified", "2023-09-03", 101],
          [4, "Emily", "Chen", "DataSystems Co", "emily.chen@datasystems.com", "555-1004", "website", "new", "2023-09-04", 103],
          [5, "David", "Park", "FutureTech Ltd", "david.park@futuretech.com", "555-1005", "partner", "contacted", "2023-09-05", 102],
        ],
      },
      contacts: {
        columns: ["id", "lead_id", "first_name", "last_name", "email", "phone", "company", "title", "department", "created_date"],
        data: [
          [1, 1, "John", "Anderson", "john.anderson@techcorp.com", "555-1001", "TechCorp Inc", "CTO", "Technology", "2023-09-01"],
          [2, 2, "Sarah", "Mitchell", "sarah.m@globalsolutions.com", "555-1002", "Global Solutions", "VP Sales", "Sales", "2023-09-02"],
          [3, 3, "Mike", "Roberts", "mike.r@innovate.com", "555-1003", "Innovate LLC", "CEO", "Executive", "2023-09-03"],
          [4, 4, "Emily", "Chen", "emily.chen@datasystems.com", "555-1004", "DataSystems Co", "IT Director", "IT", "2023-09-04"],
          [5, 5, "David", "Park", "david.park@futuretech.com", "555-1005", "FutureTech Ltd", "Operations Manager", "Operations", "2023-09-05"],
        ],
      },
      opportunities: {
        columns: ["id", "contact_id", "name", "amount", "stage", "probability", "close_date", "created_date", "assigned_to"],
        data: [
          [1, 1, "Enterprise Software License", 50000, "proposal", 75, "2023-10-15", "2023-09-01", 101],
          [2, 2, "Consulting Services", 25000, "negotiation", 90, "2023-09-30", "2023-09-02", 102],
          [3, 3, "Custom Development", 100000, "discovery", 50, "2023-11-30", "2023-09-03", 101],
          [4, 4, "Support Contract", 15000, "qualification", 25, "2023-10-31", "2023-09-04", 103],
          [5, 5, "Training Services", 20000, "proposal", 60, "2023-10-20", "2023-09-05", 102],
        ],
      },
      activities: {
        columns: ["id", "contact_id", "type", "subject", "description", "activity_date", "due_date", "status", "assigned_to"],
        data: [
          [1, 1, "call", "Initial discovery call", "Discuss current challenges and requirements", "2023-09-02", "2023-09-02", "completed", 101],
          [2, 1, "email", "Follow-up with proposal", "Send detailed proposal and pricing", "2023-09-05", "2023-09-05", "completed", 101],
          [3, 2, "meeting", "Product demonstration", "Show product features and capabilities", "2023-09-03", "2023-09-03", "completed", 102],
          [4, 2, "call", "Contract negotiation", "Discuss terms and conditions", "2023-09-10", "2023-09-10", "scheduled", 102],
          [5, 3, "email", "Initial contact", "Introduce company and services", "2023-09-04", "2023-09-04", "completed", 101],
          [6, 4, "call", "Needs assessment", "Understand current infrastructure", "2023-09-06", "2023-09-06", "scheduled", 103],
        ],
      },
    },
  },

  // Analytics & Reporting System
  analytics: {
    name: "analytics",
    description: "Analytics system with website traffic, user behavior, and conversion data",
    tables: {
      website_traffic: {
        columns: ["id", "date", "page_views", "unique_visitors", "bounce_rate", "avg_session_duration", "source"],
        data: [
          [1, "2023-09-01", 1500, 800, 35.2, 180, "organic"],
          [2, "2023-09-02", 1650, 850, 32.1, 195, "organic"],
          [3, "2023-09-03", 1420, 720, 38.5, 165, "organic"],
          [4, "2023-09-04", 2100, 950, 28.7, 220, "social"],
          [5, "2023-09-05", 1950, 880, 31.2, 205, "social"],
          [6, "2023-09-06", 1800, 820, 33.8, 190, "paid"],
          [7, "2023-09-07", 1720, 780, 36.1, 175, "paid"],
          [8, "2023-09-08", 1580, 750, 37.5, 170, "organic"],
        ],
      },
      user_events: {
        columns: ["id", "user_id", "event_type", "event_timestamp", "page_url", "session_id", "device_type"],
        data: [
          [1, 1001, "page_view", "2023-09-01 10:15:00", "/home", "S001", "desktop"],
          [2, 1001, "click", "2023-09-01 10:16:30", "/products", "S001", "desktop"],
          [3, 1001, "add_to_cart", "2023-09-01 10:18:15", "/cart", "S001", "desktop"],
          [4, 1002, "page_view", "2023-09-01 11:20:00", "/home", "S002", "mobile"],
          [5, 1002, "search", "2023-09-01 11:21:30", "/search", "S002", "mobile"],
          [6, 1003, "page_view", "2023-09-02 09:05:00", "/home", "S003", "tablet"],
          [7, 1003, "click", "2023-09-02 09:07:20", "/about", "S003", "tablet"],
          [8, 1004, "page_view", "2023-09-02 14:30:00", "/home", "S004", "desktop"],
          [9, 1004, "purchase", "2023-09-02 14:35:45", "/checkout", "S004", "desktop"],
        ],
      },
      conversions: {
        columns: ["id", "user_id", "conversion_type", "conversion_value", "conversion_date", "campaign_id", "source"],
        data: [
          [1, 1001, "purchase", 129.99, "2023-09-01", "CAMP001", "organic"],
          [2, 1004, "purchase", 89.99, "2023-09-02", "CAMP002", "social"],
          [3, 1005, "signup", 0, "2023-09-03", "CAMP001", "paid"],
          [4, 1006, "purchase", 249.99, "2023-09-04", "CAMP003", "organic"],
          [5, 1007, "download", 0, "2023-09-05", "CAMP002", "social"],
          [6, 1008, "purchase", 179.99, "2023-09-06", "CAMP001", "paid"],
        ],
      },
      campaigns: {
        columns: ["id", "campaign_name", "campaign_type", "start_date", "end_date", "budget", "status"],
        data: [
          [1, "Summer Sale 2023", "promotional", "2023-09-01", "2023-09-30", 5000, "active"],
          [2, "New Product Launch", "awareness", "2023-09-15", "2023-10-15", 10000, "planned"],
          [3, "Q3 Newsletter", "retention", "2023-08-01", "2023-08-31", 2000, "completed"],
          [4, "Back to School", "seasonal", "2023-08-15", "2023-09-15", 7500, "active"],
        ],
      },
    },
  },

  // Logistics & Shipping System
  logistics: {
    name: "logistics",
    description: "Logistics and shipping system with shipments, carriers, and tracking",
    tables: {
      shipments: {
        columns: ["id", "order_id", "carrier_id", "tracking_number", "ship_date", "estimated_delivery", "actual_delivery", "status", "shipping_cost", "weight_kg"],
        data: [
          [1, 1, 1, "TRK00123456", "2023-09-01", "2023-09-05", "2023-09-04", "delivered", 25.99, 2.5],
          [2, 2, 2, "TRK00234567", "2023-09-02", "2023-09-07", null, "in_transit", 18.50, 1.8],
          [3, 3, 1, "TRK00345678", "2023-09-03", "2023-09-08", null, "in_transit", 12.75, 0.9],
          [4, 4, 3, "TRK00456789", "2023-09-04", "2023-09-09", "2023-09-09", "delivered", 32.25, 4.2],
          [5, 5, 2, "TRK00567890", "2023-09-05", "2023-09-10", null, "processing", 28.99, 3.1],
          [6, 6, 1, "TRK00678901", "2023-09-06", "2023-09-11", "2023-09-10", "delivered", 15.50, 1.2],
          [7, 7, 3, "TRK00789012", "2023-09-07", "2023-09-12", null, "in_transit", 45.75, 6.8],
        ],
      },
      carriers: {
        columns: ["id", "name", "contact_phone", "email", "service_level", "base_rate", "rate_per_kg"],
        data: [
          [1, "FastShip Express", "555-3001", "support@fastship.com", "express", 10.00, 5.00],
          [2, "Reliable Logistics", "555-3002", "info@reliablelog.com", "standard", 8.00, 4.50],
          [3, "Global Carriers", "555-3003", "service@globalcarriers.com", "premium", 15.00, 6.50],
        ],
      },
      tracking_events: {
        columns: ["id", "shipment_id", "event_type", "event_date", "location", "description"],
        data: [
          [1, 1, "pickup", "2023-09-01 09:30:00", "New York Warehouse", "Package picked up from sender"],
          [2, 1, "departure", "2023-09-01 14:15:00", "New York Hub", "Departed sorting facility"],
          [3, 1, "arrival", "2023-09-02 08:45:00", "Chicago Hub", "Arrived at regional facility"],
          [4, 1, "out_for_delivery", "2023-09-04 07:30:00", "Chicago Local", "Out for delivery"],
          [5, 1, "delivered", "2023-09-04 14:20:00", "Chicago", "Delivered to recipient"],
          [6, 2, "pickup", "2023-09-02 10:15:00", "Los Angeles Warehouse", "Package picked up"],
          [7, 2, "departure", "2023-09-02 16:30:00", "Los Angeles Hub", "Departed origin facility"],
          [8, 3, "pickup", "2023-09-03 11:00:00", "Miami Warehouse", "Package picked up"],
        ],
      },
      shipping_zones: {
        columns: ["id", "zone_name", "region", "base_rate", "additional_kg_rate"],
        data: [
          [1, "Local", "Same State", 8.00, 2.00],
          [2, "Regional", "Adjacent States", 12.00, 3.00],
          [3, "National", "Same Country", 18.00, 4.50],
          [4, "International", "Overseas", 35.00, 8.00],
        ],
      },
    },
  },

  // Real Estate Management System
  real_estate: {
    name: "real_estate",
    description: "Real estate management with properties, agents, and transactions",
    tables: {
      properties: {
        columns: ["id", "address", "city", "state", "zip_code", "property_type", "bedrooms", "bathrooms", "square_feet", "list_price", "status", "list_date", "agent_id"],
        data: [
          [1, "123 Main St", "New York", "NY", "10001", "Apartment", 2, 2, 1200, 750000, "for_sale", "2023-08-15", 101],
          [2, "456 Oak Ave", "Los Angeles", "CA", "90001", "House", 4, 3, 2400, 1200000, "for_sale", "2023-08-20", 102],
          [3, "789 Pine Rd", "Chicago", "IL", "60007", "Condo", 1, 1, 800, 450000, "sold", "2023-07-10", 101],
          [4, "321 Elm St", "Miami", "FL", "33101", "Villa", 5, 4, 3500, 2500000, "for_sale", "2023-09-01", 103],
          [5, "654 Maple Dr", "Seattle", "WA", "98101", "Townhouse", 3, 2, 1800, 850000, "pending", "2023-08-25", 102],
          [6, "987 Birch Ln", "Boston", "MA", "02101", "Apartment", 2, 1, 1100, 650000, "for_rent", "2023-09-05", 104],
        ],
      },
      agents: {
        columns: ["id", "first_name", "last_name", "email", "phone", "license_number", "commission_rate", "hire_date"],
        data: [
          [101, "John", "Smith", "john.smith@realestate.com", "555-4001", "RE001", 0.03, "2020-01-15"],
          [102, "Maria", "Garcia", "maria.garcia@realestate.com", "555-4002", "RE002", 0.025, "2019-03-20"],
          [103, "David", "Johnson", "david.johnson@realestate.com", "555-4003", "RE003", 0.035, "2021-06-10"],
          [104, "Sarah", "Williams", "sarah.williams@realestate.com", "555-4004", "RE004", 0.028, "2022-02-28"],
        ],
      },
      transactions: {
        columns: ["id", "property_id", "buyer_name", "seller_name", "sale_price", "sale_date", "closing_date", "agent_commission"],
        data: [
          [1, 3, "Robert Chen", "Jennifer Lopez", 445000, "2023-07-10", "2023-08-15", 13350],
          [2, 1, "Michael Brown", "Lisa Anderson", 740000, "2023-09-05", "2023-10-10", 22200],
          [3, 4, "Amanda Wilson", "Thomas Davis", 2450000, "2023-09-15", "2023-10-30", 85750],
        ],
      },
      property_features: {
        columns: ["id", "property_id", "feature_type", "feature_description"],
        data: [
          [1, 1, "Interior", "Hardwood floors throughout"],
          [2, 1, "Kitchen", "Stainless steel appliances"],
          [3, 1, "Exterior", "Private balcony with city view"],
          [4, 2, "Interior", "Open floor plan with vaulted ceilings"],
          [5, 2, "Exterior", "Swimming pool and landscaped garden"],
          [6, 2, "Amenities", "Smart home system installed"],
          [7, 3, "Interior", "Recently renovated kitchen"],
          [8, 4, "Exterior", "Private beach access"],
          [9, 4, "Amenities", "Home theater and wine cellar"],
        ],
      },
    },
  },

  // Healthcare EHR System
  healthcare: {
    name: "healthcare",
    description: "Healthcare Electronic Health Records system with patients, providers, and medical data",
    tables: {
      patients: {
        columns: ["id", "first_name", "last_name", "date_of_birth", "gender", "ssn", "phone", "email", "primary_address", "emergency_contact"],
        data: [
          [1, "James", "Wilson", "1985-03-15", "M", "123-45-6789", "555-5001", "james.wilson@email.com", "123 Oak St, New York, NY", "Mary Wilson (555-5002)"],
          [2, "Patricia", "Brown", "1992-07-22", "F", "234-56-7890", "555-5003", "patricia.brown@email.com", "456 Pine Ave, Los Angeles, CA", "John Brown (555-5004)"],
          [3, "Richard", "Davis", "1978-11-30", "M", "345-67-8901", "555-5005", "richard.davis@email.com", "789 Maple Dr, Chicago, IL", "Susan Davis (555-5006)"],
          [4, "Jennifer", "Miller", "1995-05-18", "F", "456-78-9012", "555-5007", "jennifer.miller@email.com", "321 Elm St, Miami, FL", "Robert Miller (555-5008)"],
          [5, "Charles", "Taylor", "1988-09-25", "M", "567-89-0123", "555-5009", "charles.taylor@email.com", "654 Cedar Ln, Seattle, WA", "Linda Taylor (555-5010)"],
        ],
      },
      providers: {
        columns: ["id", "first_name", "last_name", "specialty", "license_number", "phone", "email", "department", "years_experience"],
        data: [
          [1, "Dr. Michael", "Chen", "Cardiology", "MD12345", "555-5101", "m.chen@hospital.com", "Cardiology", 15],
          [2, "Dr. Emily", "Rodriguez", "Pediatrics", "MD23456", "555-5102", "e.rodriguez@hospital.com", "Pediatrics", 12],
          [3, "Dr. Christopher", "Lee", "Orthopedics", "MD34567", "555-5103", "c.lee@hospital.com", "Orthopedics", 18],
          [4, "Dr. Amanda", "Martinez", "Neurology", "MD45678", "555-5104", "a.martinez@hospital.com", "Neurology", 10],
          [5, "Dr. Daniel", "Harris", "General Practice", "MD56789", "555-5105", "d.harris@hospital.com", "Primary Care", 8],
        ],
      },
      encounters: {
        columns: ["id", "patient_id", "provider_id", "encounter_date", "encounter_type", "chief_complaint", "diagnosis", "treatment_plan", "follow_up_required"],
        data: [
          [1, 1, 1, "2023-09-01", "Office Visit", "Chest pain and shortness of breath", "Hypertension", "Prescribed beta blockers, lifestyle changes", 1],
          [2, 2, 2, "2023-09-02", "Wellness Check", "Annual pediatric checkup", "Healthy, normal development", "Vaccinations updated", 0],
          [3, 3, 3, "2023-09-03", "Consultation", "Knee pain after fall", "Mild ligament sprain", "Physical therapy, pain management", 1],
          [4, 4, 4, "2023-09-04", "Emergency", "Severe headaches", "Migraine", "Pain medication, rest", 1],
          [5, 5, 5, "2023-09-05", "Follow-up", "Blood pressure monitoring", "Stable hypertension", "Continue current medication", 0],
          [6, 1, 1, "2023-09-15", "Follow-up", "Blood pressure check", "Improved hypertension", "Reduce medication dosage", 1],
        ],
      },
      prescriptions: {
        columns: ["id", "patient_id", "provider_id", "medication_name", "dosage", "frequency", "start_date", "end_date", "refills_remaining"],
        data: [
          [1, 1, 1, "Lisinopril", "10mg", "Once daily", "2023-09-01", "2024-03-01", 5],
          [2, 1, 1, "Metoprolol", "25mg", "Twice daily", "2023-09-01", "2024-03-01", 5],
          [3, 3, 3, "Ibuprofen", "400mg", "Every 6 hours as needed", "2023-09-03", "2023-09-17", 0],
          [4, 4, 4, "Sumatriptan", "50mg", "As needed for migraines", "2023-09-04", "2024-03-04", 2],
          [5, 5, 5, "Amlodipine", "5mg", "Once daily", "2023-03-01", "2024-03-01", 3],
        ],
      },
    },
  },

  // Manufacturing System
  manufacturing: {
    name: "manufacturing",
    description: "Manufacturing system with production lines, work orders, and quality control",
    tables: {
      products: {
        columns: ["id", "product_name", "product_code", "category", "unit_cost", "selling_price", "safety_stock", "lead_time_days"],
        data: [
          [1, "Smartphone X1", "SPX1", "Electronics", 350.00, 799.99, 100, 14],
          [2, "Tablet Pro", "TBP", "Electronics", 280.00, 599.99, 75, 10],
          [3, "Laptop Elite", "LPE", "Electronics", 650.00, 1299.99, 50, 21],
          [4, "Wireless Earbuds", "WEB", "Accessories", 45.00, 99.99, 200, 7],
          [5, "Smart Watch", "SW2", "Wearables", 120.00, 249.99, 150, 10],
        ],
      },
      work_orders: {
        columns: ["id", "product_id", "quantity", "start_date", "due_date", "status", "assigned_line", "completed_date"],
        data: [
          [1, 1, 500, "2023-09-01", "2023-09-15", "completed", "Line A", "2023-09-14"],
          [2, 2, 300, "2023-09-05", "2023-09-18", "in_progress", "Line B", null],
          [3, 3, 200, "2023-09-10", "2023-09-30", "in_progress", "Line C", null],
          [4, 4, 1000, "2023-09-12", "2023-09-25", "planned", "Line A", null],
          [5, 5, 600, "2023-09-15", "2023-09-28", "planned", "Line B", null],
        ],
      },
      production_lines: {
        columns: ["id", "line_name", "location", "capacity_per_hour", "status", "supervisor_id"],
        data: [
          [1, "Line A", "Building 1, Floor 2", 50, "active", 101],
          [2, "Line B", "Building 1, Floor 2", 45, "active", 102],
          [3, "Line C", "Building 2, Floor 1", 40, "maintenance", 103],
          [4, "Line D", "Building 2, Floor 1", 35, "active", 101],
        ],
      },
      quality_checks: {
        columns: ["id", "work_order_id", "check_date", "inspector_id", "defect_count", "total_checked", "pass_fail", "defect_types"],
        data: [
          [1, 1, "2023-09-14", 201, 5, 100, "pass", "Cosmetic:3,Functional:2"],
          [2, 1, "2023-09-14", 202, 8, 100, "pass", "Cosmetic:6,Functional:2"],
          [3, 2, "2023-09-10", 201, 12, 50, "fail", "Cosmetic:8,Functional:4"],
          [4, 2, "2023-09-12", 203, 6, 50, "pass", "Cosmetic:4,Functional:2"],
          [5, 3, "2023-09-15", 202, 3, 30, "pass", "Cosmetic:2,Functional:1"],
        ],
      },
    },
  },

  // Insurance Claims System
  insurance: {
    name: "insurance",
    description: "Insurance claims processing system with policies, claims, and payments",
    tables: {
      policies: {
        columns: ["id", "policy_number", "customer_id", "policy_type", "coverage_amount", "premium", "start_date", "end_date", "status"],
        data: [
          [1, "POL001234", 101, "Home Insurance", 500000, 1200.00, "2023-01-15", "2024-01-15", "active"],
          [2, "POL001235", 102, "Auto Insurance", 75000, 850.00, "2023-02-01", "2024-02-01", "active"],
          [3, "POL001236", 103, "Life Insurance", 1000000, 2000.00, "2023-03-10", "2033-03-10", "active"],
          [4, "POL001237", 104, "Health Insurance", 500000, 3500.00, "2023-04-05", "2024-04-05", "active"],
          [5, "POL001238", 105, "Auto Insurance", 60000, 720.00, "2023-05-20", "2024-05-20", "active"],
        ],
      },
      customers: {
        columns: ["id", "first_name", "last_name", "email", "phone", "address", "date_of_birth", "customer_since"],
        data: [
          [101, "Robert", "Johnson", "robert.j@email.com", "555-6001", "123 Main St, New York, NY", "1980-05-15", "2020-03-10"],
          [102, "Susan", "Williams", "susan.w@email.com", "555-6002", "456 Oak Ave, Los Angeles, CA", "1975-12-22", "2019-07-15"],
          [103, "Thomas", "Brown", "thomas.b@email.com", "555-6003", "789 Pine Rd, Chicago, IL", "1988-08-30", "2021-01-20"],
          [104, "Lisa", "Davis", "lisa.d@email.com", "555-6004", "321 Elm St, Miami, FL", "1992-03-18", "2022-05-05"],
          [105, "Kevin", "Miller", "kevin.m@email.com", "555-6005", "654 Cedar Ln, Seattle, WA", "1985-11-25", "2020-11-12"],
        ],
      },
      claims: {
        columns: ["id", "policy_id", "claim_number", "incident_date", "claim_date", "description", "claim_amount", "approved_amount", "status", "adjuster_id"],
        data: [
          [1, 1, "CLM001", "2023-08-15", "2023-08-20", "Water damage from burst pipe", 25000, 22000, "approved", 201],
          [2, 2, "CLM002", "2023-08-25", "2023-08-26", "Car accident - rear collision", 15000, 12000, "approved", 202],
          [3, 4, "CLM003", "2023-09-01", "2023-09-02", "Emergency surgery - appendectomy", 35000, 32000, "approved", 203],
          [4, 2, "CLM004", "2023-09-10", "2023-09-11", "Theft - stolen car parts", 8000, null, "under_review", 202],
          [5, 5, "CLM005", "2023-09-12", "2023-09-13", "Minor collision - bumper damage", 5000, null, "submitted", 201],
        ],
      },
      payments: {
        columns: ["id", "claim_id", "payment_date", "payment_amount", "payment_method", "check_number", "status"],
        data: [
          [1, 1, "2023-09-05", 22000, "check", "CHK1001", "processed"],
          [2, 2, "2023-09-08", 12000, "electronic", null, "processed"],
          [3, 3, "2023-09-12", 32000, "check", "CHK1002", "processed"],
        ],
      },
    },
  },

  // Financial Trading System
  trading: {
    name: "trading",
    description: "Financial trading system with stocks, trades, and portfolio data",
    tables: {
      stocks: {
        columns: ["id", "symbol", "company_name", "sector", "current_price", "volume", "market_cap"],
        data: [
          [1, "AAPL", "Apple Inc.", "Technology", 175.25, 75000000, 2750000000000],
          [2, "GOOGL", "Alphabet Inc.", "Technology", 135.80, 25000000, 1700000000000],
          [3, "MSFT", "Microsoft Corp.", "Technology", 330.45, 35000000, 2450000000000],
          [4, "AMZN", "Amazon.com Inc.", "Consumer Cyclical", 145.30, 45000000, 1500000000000],
          [5, "JPM", "JPMorgan Chase", "Financial Services", 155.75, 15000000, 450000000000],
          [6, "JNJ", "Johnson & Johnson", "Healthcare", 155.20, 8000000, 380000000000],
        ],
      },
      trades: {
        columns: ["id", "stock_id", "trade_type", "quantity", "price", "trade_date", "portfolio_id"],
        data: [
          [1, 1, "BUY", 100, 170.50, "2023-09-01", 1],
          [2, 2, "BUY", 50, 130.25, "2023-09-02", 1],
          [3, 3, "BUY", 75, 325.80, "2023-09-03", 1],
          [4, 1, "SELL", 25, 178.90, "2023-09-10", 1],
          [5, 4, "BUY", 200, 142.15, "2023-09-05", 2],
          [6, 5, "BUY", 150, 152.30, "2023-09-06", 2],
          [7, 6, "BUY", 100, 153.75, "2023-09-07", 2],
          [8, 2, "SELL", 10, 138.40, "2023-09-15", 1],
        ],
      },
      portfolios: {
        columns: ["id", "portfolio_name", "owner_id", "created_date", "total_value"],
        data: [
          [1, "Tech Growth", 101, "2023-01-15", 75000],
          [2, "Balanced Fund", 102, "2023-02-01", 125000],
          [3, "Retirement", 103, "2023-03-10", 500000],
        ],
      },
    },
  },

  // IoT Sensor Data System
  iot: {
    name: "iot",
    description: "IoT system with sensor readings, devices, and alerts",
    tables: {
      devices: {
        columns: ["id", "device_name", "device_type", "location", "install_date", "status", "firmware_version"],
        data: [
          [1, "Temp_Sensor_01", "Temperature", "Warehouse A", "2023-01-15", "active", "v2.1.5"],
          [2, "Humidity_01", "Humidity", "Warehouse A", "2023-01-20", "active", "v1.8.2"],
          [3, "Temp_Sensor_02", "Temperature", "Warehouse B", "2023-02-10", "active", "v2.1.5"],
          [4, "Pressure_01", "Pressure", "Factory Floor", "2023-03-05", "inactive", "v1.5.0"],
          [5, "Vibration_01", "Vibration", "Machine Room", "2023-04-12", "active", "v3.0.1"],
        ],
      },
      sensor_readings: {
        columns: ["id", "device_id", "reading_value", "reading_type", "timestamp", "battery_level", "signal_strength"],
        data: [
          [1, 1, 22.5, "temperature", "2023-09-01 08:00:00", 85, -45],
          [2, 1, 23.1, "temperature", "2023-09-01 09:00:00", 84, -46],
          [3, 1, 24.2, "temperature", "2023-09-01 10:00:00", 83, -47],
          [4, 2, 65.2, "humidity", "2023-09-01 08:00:00", 90, -42],
          [5, 2, 64.8, "humidity", "2023-09-01 09:00:00", 89, -43],
          [6, 3, 21.8, "temperature", "2023-09-01 08:00:00", 78, -55],
          [7, 5, 0.85, "vibration", "2023-09-01 08:00:00", 92, -38],
          [8, 5, 1.25, "vibration", "2023-09-01 09:00:00", 91, -39],
        ],
      },
      alerts: {
        columns: ["id", "device_id", "alert_type", "alert_message", "severity", "trigger_timestamp", "resolved_timestamp", "status"],
        data: [
          [1, 1, "high_temperature", "Temperature above threshold", "high", "2023-08-15 14:30:00", "2023-08-15 15:45:00", "resolved"],
          [2, 4, "low_battery", "Battery level critical", "medium", "2023-08-20 10:15:00", null, "active"],
          [3, 5, "high_vibration", "Vibration levels excessive", "high", "2023-09-01 09:00:00", null, "active"],
          [4, 2, "sensor_fault", "Humidity sensor reading error", "medium", "2023-08-25 16:20:00", "2023-08-26 09:30:00", "resolved"],
        ],
      },
    },
  },
};

// SQL Practice Questions with Expected Results
export const sqlQuestions = [
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

  // ORDER BY & LIMIT
  {
    id: 11,
    title: "Top 5 Highest Paid Employees",
    description: "Find the 5 employees with the highest salaries.",
    dataset: "employees",
    difficulty: "easy",
    category: "ORDER BY",
    question: "Select the top 5 employees by salary in descending order.",
    expectedQuery: "SELECT name, salary FROM employees ORDER BY salary DESC LIMIT 5;",
    hint: "Use ORDER BY with DESC and LIMIT.",
  },
  {
    id: 12,
    title: "Oldest Books in Library",
    description: "List the 3 oldest books by publication year.",
    dataset: "library",
    difficulty: "easy",
    category: "ORDER BY",
    question: "Find the 3 oldest books sorted by publication year.",
    expectedQuery: "SELECT title, author_id, publication_year FROM books ORDER BY publication_year ASC LIMIT 3;",
    hint: "Sort by publication_year in ascending order.",
  },

  // DISTINCT
  {
    id: 13,
    title: "Unique Countries",
    description: "Get all unique countries from customers.",
    dataset: "ecommerce",
    difficulty: "easy",
    category: "DISTINCT",
    question: "Select all distinct countries from the customers table.",
    expectedQuery: "SELECT DISTINCT country FROM customers;",
    hint: "Use DISTINCT to remove duplicates.",
  },
  {
    id: 14,
    title: "Unique Majors",
    description: "Find all unique majors offered.",
    dataset: "university",
    difficulty: "easy",
    category: "DISTINCT",
    question: "Get a list of all unique majors from the students table.",
    expectedQuery: "SELECT DISTINCT major FROM students;",
    hint: "DISTINCT eliminates duplicate values.",
  },

  // BETWEEN & IN
  {
    id: 15,
    title: "Salary Range",
    description: "Find employees with salaries in a specific range.",
    dataset: "employees",
    difficulty: "easy",
    category: "WHERE",
    question: "Select employees with salaries between 65000 and 80000.",
    expectedQuery: "SELECT name, salary FROM employees WHERE salary BETWEEN 65000 AND 80000;",
    hint: "Use BETWEEN operator for range queries.",
  },
  {
    id: 16,
    title: "Specific Departments",
    description: "Find employees in specific departments.",
    dataset: "employees",
    difficulty: "easy",
    category: "WHERE",
    question: "Select employees who work in Engineering or Sales departments.",
    expectedQuery: "SELECT e.name, d.name as department FROM employees e JOIN departments d ON e.department_id = d.id WHERE d.name IN ('Engineering', 'Sales');",
    hint: "Use IN operator for multiple values.",
  },

  // LIKE & Pattern Matching
  {
    id: 17,
    title: "Name Pattern Search",
    description: "Find employees whose names start with 'J'.",
    dataset: "employees",
    difficulty: "easy",
    category: "WHERE",
    question: "Select all employees whose names begin with the letter 'J'.",
    expectedQuery: "SELECT name, email FROM employees WHERE name LIKE 'J%';",
    hint: "Use LIKE with % wildcard for pattern matching.",
  },
  {
    id: 18,
    title: "Email Domain Search",
    description: "Find customers with specific email domains.",
    dataset: "ecommerce",
    difficulty: "easy",
    category: "WHERE",
    question: "Find all customers whose email ends with 'email.com'.",
    expectedQuery: "SELECT name, email FROM customers WHERE email LIKE '%@email.com';",
    hint: "Use LIKE with % at the beginning for suffix matching.",
  },

  // HAVING
  {
    id: 19,
    title: "Departments with High Average Salary",
    description: "Find departments where average salary exceeds 70000.",
    dataset: "employees",
    difficulty: "medium",
    category: "HAVING",
    question: "Find departments with an average salary greater than 70000.",
    expectedQuery: "SELECT d.name, AVG(e.salary) as avg_salary FROM employees e JOIN departments d ON e.department_id = d.id GROUP BY d.name HAVING AVG(e.salary) > 70000;",
    hint: "Use HAVING to filter grouped results.",
  },
  {
    id: 20,
    title: "Popular Products",
    description: "Find products ordered more than once.",
    dataset: "ecommerce",
    difficulty: "medium",
    category: "HAVING",
    question: "Show products that appear in more than 1 order.",
    expectedQuery: "SELECT p.name, COUNT(DISTINCT oi.order_id) as order_count FROM products p JOIN order_items oi ON p.id = oi.product_id GROUP BY p.name HAVING COUNT(DISTINCT oi.order_id) > 1;",
    hint: "GROUP BY product and use HAVING with COUNT.",
  },

  // Multiple JOINs
  {
    id: 21,
    title: "Complete Order Details",
    description: "Show customer, product, and order information together.",
    dataset: "ecommerce",
    difficulty: "hard",
    category: "JOIN",
    question: "Display customer name, product name, quantity, and order date for all orders.",
    expectedQuery: "SELECT c.name as customer, p.name as product, oi.quantity, o.order_date FROM customers c JOIN orders o ON c.id = o.customer_id JOIN order_items oi ON o.id = oi.order_id JOIN products p ON oi.product_id = p.id;",
    hint: "Chain multiple JOINs to connect all related tables.",
  },
  {
    id: 22,
    title: "Course Enrollment Details",
    description: "Show student, course, and professor information.",
    dataset: "university",
    difficulty: "hard",
    category: "JOIN",
    question: "Display student name, course title, and professor name for all enrollments.",
    expectedQuery: "SELECT s.name as student, c.title as course, p.name as professor FROM students s JOIN enrollments e ON s.id = e.student_id JOIN courses c ON e.course_id = c.id JOIN professors p ON c.professor_id = p.id;",
    hint: "Join students, enrollments, courses, and professors tables.",
  },

  // LEFT JOIN
  {
    id: 23,
    title: "All Customers Including Non-Buyers",
    description: "List all customers and their order count including those who haven't ordered.",
    dataset: "ecommerce",
    difficulty: "medium",
    category: "JOIN",
    question: "Show all customers with their total number of orders (including 0 orders).",
    expectedQuery: "SELECT c.name, COUNT(o.id) as order_count FROM customers c LEFT JOIN orders o ON c.id = o.customer_id GROUP BY c.name;",
    hint: "Use LEFT JOIN to include customers without orders.",
  },
  {
    id: 24,
    title: "Books Never Borrowed",
    description: "Find books that have never been borrowed.",
    dataset: "library",
    difficulty: "medium",
    category: "JOIN",
    question: "List all books that have no borrowing records.",
    expectedQuery: "SELECT b.title, b.author_id FROM books b LEFT JOIN borrowings br ON b.id = br.book_id WHERE br.id IS NULL;",
    hint: "LEFT JOIN and filter for NULL in the joined table.",
  },

  // Aggregate Functions
  {
    id: 25,
    title: "Total Revenue per Product",
    description: "Calculate total revenue for each product.",
    dataset: "ecommerce",
    difficulty: "medium",
    category: "GROUP BY",
    question: "Calculate the total revenue (quantity * unit_price) for each product.",
    expectedQuery: "SELECT p.name, SUM(oi.quantity * oi.unit_price) as total_revenue FROM products p JOIN order_items oi ON p.id = oi.product_id GROUP BY p.name ORDER BY total_revenue DESC;",
    hint: "Use SUM with multiplication for total revenue.",
  },
  {
    id: 26,
    title: "Student Statistics",
    description: "Get min, max, and average GPA.",
    dataset: "university",
    difficulty: "easy",
    category: "AGGREGATE",
    question: "Calculate the minimum, maximum, and average GPA of all students.",
    expectedQuery: "SELECT MIN(gpa) as min_gpa, MAX(gpa) as max_gpa, AVG(gpa) as avg_gpa FROM students;",
    hint: "Use MIN, MAX, and AVG functions.",
  },

  // Subqueries
  {
    id: 27,
    title: "Employees Earning More Than Average",
    description: "Find employees with above-average salaries in their department.",
    dataset: "employees",
    difficulty: "hard",
    category: "SUBQUERY",
    question: "Find employees whose salary is above the average salary of their department.",
    expectedQuery: "SELECT e.name, e.salary, d.name as department FROM employees e JOIN departments d ON e.department_id = d.id WHERE e.salary > (SELECT AVG(e2.salary) FROM employees e2 WHERE e2.department_id = e.department_id);",
    hint: "Use correlated subquery to compare with department average.",
  },
  {
    id: 28,
    title: "Most Expensive Product per Category",
    description: "Find the most expensive product in each category.",
    dataset: "ecommerce",
    difficulty: "hard",
    category: "SUBQUERY",
    question: "Select products that have the highest price in their category.",
    expectedQuery: "SELECT name, category, price FROM products p WHERE price = (SELECT MAX(price) FROM products WHERE category = p.category);",
    hint: "Use correlated subquery with MAX.",
  },

  // CASE statements
  {
    id: 29,
    title: "Salary Classification",
    description: "Classify employees by salary level.",
    dataset: "employees",
    difficulty: "medium",
    category: "CASE",
    question: "Classify employees as 'High' (>80000), 'Medium' (65000-80000), or 'Low' (<65000) salary.",
    expectedQuery: "SELECT name, salary, CASE WHEN salary > 80000 THEN 'High' WHEN salary >= 65000 THEN 'Medium' ELSE 'Low' END as salary_level FROM employees;",
    hint: "Use CASE WHEN for conditional logic.",
  },
  {
    id: 30,
    title: "Order Status Summary",
    description: "Categorize orders by status.",
    dataset: "ecommerce",
    difficulty: "medium",
    category: "CASE",
    question: "Add a column that shows 'Active' for pending/shipped orders and 'Closed' for completed orders.",
    expectedQuery: "SELECT id, customer_id, status, CASE WHEN status IN ('pending', 'shipped') THEN 'Active' ELSE 'Closed' END as order_category FROM orders;",
    hint: "Use CASE with IN operator.",
  },

  // Date Functions
  {
    id: 31,
    title: "Recent Hires",
    description: "Find employees hired in the last 2 years.",
    dataset: "employees",
    difficulty: "medium",
    category: "DATE",
    question: "Select employees hired after January 1, 2022.",
    expectedQuery: "SELECT name, hire_date FROM employees WHERE hire_date > '2022-01-01';",
    hint: "Compare hire_date with a specific date.",
  },
  {
    id: 32,
    title: "Borrowing Duration",
    description: "Calculate how long books were borrowed.",
    dataset: "library",
    difficulty: "medium",
    category: "DATE",
    question: "For returned books, calculate the number of days between borrow_date and return_date.",
    expectedQuery: "SELECT m.name, b.title, borrow_date, return_date, (julianday(return_date) - julianday(borrow_date)) as days_borrowed FROM borrowings br JOIN members m ON br.member_id = m.id JOIN books b ON br.book_id = b.id WHERE return_date IS NOT NULL;",
    hint: "Use date arithmetic to calculate the difference.",
  },

  // UNION
  {
    id: 33,
    title: "All Email Contacts",
    description: "Combine employee and customer emails.",
    dataset: "employees",
    difficulty: "medium",
    category: "UNION",
    question: "Create a list of all email addresses from both employees and ecommerce customers.",
    expectedQuery: "SELECT email, name, 'Employee' as type FROM employees UNION SELECT email, name, 'Customer' as type FROM customers;",
    hint: "Use UNION to combine results from two queries. Note: This requires access to both datasets.",
  },

  // EXISTS
  {
    id: 34,
    title: "Customers Who Ordered",
    description: "Find customers who have placed at least one order.",
    dataset: "ecommerce",
    difficulty: "medium",
    category: "SUBQUERY",
    question: "Select customers who have at least one order using EXISTS.",
    expectedQuery: "SELECT name, email FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);",
    hint: "Use EXISTS with a correlated subquery.",
  },

  // Self JOIN
  {
    id: 35,
    title: "Employee Manager Relationship",
    description: "Show employees with their manager names.",
    dataset: "employees",
    difficulty: "hard",
    category: "JOIN",
    question: "Display each employee's name along with their manager's name.",
    expectedQuery: "SELECT e.name as employee, m.name as manager FROM employees e LEFT JOIN employees m ON e.manager_id = m.id;",
    hint: "Join the employees table with itself.",
  },

  // Complex Aggregation
  {
    id: 36,
    title: "Department Statistics",
    description: "Get comprehensive department statistics.",
    dataset: "employees",
    difficulty: "hard",
    category: "GROUP BY",
    question: "For each department, show total employees, average salary, min salary, and max salary.",
    expectedQuery: "SELECT d.name, COUNT(e.id) as employee_count, AVG(e.salary) as avg_salary, MIN(e.salary) as min_salary, MAX(e.salary) as max_salary FROM departments d LEFT JOIN employees e ON d.id = e.department_id GROUP BY d.name;",
    hint: "Use multiple aggregate functions with GROUP BY.",
  },

  // Window Functions (Advanced)
  {
    id: 37,
    title: "Salary Rank by Department",
    description: "Rank employees by salary within their department.",
    dataset: "employees",
    difficulty: "hard",
    category: "WINDOW",
    question: "Assign a rank to each employee based on salary within their department.",
    expectedQuery: "SELECT e.name, d.name as department, e.salary, RANK() OVER (PARTITION BY e.department_id ORDER BY e.salary DESC) as salary_rank FROM employees e JOIN departments d ON e.department_id = d.id;",
    hint: "Use RANK() window function with PARTITION BY.",
  },

  // Nested Subqueries
  {
    id: 38,
    title: "Top Spending Customers",
    description: "Find customers who spent more than the average total spending.",
    dataset: "ecommerce",
    difficulty: "hard",
    category: "SUBQUERY",
    question: "Find customers whose total order amount exceeds the average total spent per customer.",
    expectedQuery: "SELECT c.name, SUM(o.total_amount) as total_spent FROM customers c JOIN orders o ON c.id = o.customer_id GROUP BY c.name HAVING SUM(o.total_amount) > (SELECT AVG(total) FROM (SELECT SUM(total_amount) as total FROM orders GROUP BY customer_id));",
    hint: "Use nested subqueries with HAVING clause.",
  },

  // NULL handling
  {
    id: 39,
    title: "Unenrolled Courses",
    description: "Find courses with no enrollments.",
    dataset: "university",
    difficulty: "medium",
    category: "JOIN",
    question: "List courses that have no students enrolled.",
    expectedQuery: "SELECT c.course_code, c.title FROM courses c LEFT JOIN enrollments e ON c.id = e.course_id WHERE e.id IS NULL;",
    hint: "Use LEFT JOIN and check for NULL.",
  },

  // Complex filtering
  {
    id: 40,
    title: "Best Students by Major",
    description: "Find the student with highest GPA in each major.",
    dataset: "university",
    difficulty: "hard",
    category: "SUBQUERY",
    question: "Select the student with the highest GPA for each major.",
    expectedQuery: "SELECT name, major, gpa FROM students s WHERE gpa = (SELECT MAX(gpa) FROM students WHERE major = s.major);",
    hint: "Use correlated subquery with MAX grouped by major.",
  },

  {
    id: 41,
    title: "Account Balance Update",
    description: "Simulate a transaction updating account balance.",
    dataset: "banking",
    difficulty: "medium",
    category: "TRANSACTION",
    question: "Write a query to update account balance after a withdrawal of 1000 from account 'ACC001'.",
    expectedQuery: "UPDATE accounts SET balance = balance - 1000 WHERE account_number = 'ACC001' AND balance >= 1000;",
    hint: "Use UPDATE with WHERE clause ensuring sufficient balance.",
  },

  // INDEXES & PERFORMANCE
  {
    id: 42,
    title: "Create Index for Performance",
    description: "Create an index on frequently queried columns.",
    dataset: "hospital",
    difficulty: "medium",
    category: "INDEX",
    question: "Create an index on the appointments table for appointment_date and doctor_id columns.",
    expectedQuery: "CREATE INDEX idx_appointments_date_doctor ON appointments(appointment_date, doctor_id);",
    hint: "Use CREATE INDEX with multiple columns.",
  },

  // VIEWS
  {
    id: 43,
    title: "Create Patient Summary View",
    description: "Create a view showing patient appointment history.",
    dataset: "hospital",
    difficulty: "medium",
    category: "VIEW",
    question: "Create a view that shows patient name, doctor name, and appointment date for all completed appointments.",
    expectedQuery: "CREATE VIEW patient_appointment_history AS SELECT p.name as patient_name, d.name as doctor_name, a.appointment_date FROM patients p JOIN appointments a ON p.id = a.patient_id JOIN doctors d ON a.doctor_id = d.id WHERE a.status = 'completed';",
    hint: "Use CREATE VIEW with JOIN statements.",
  },

  // STORED PROCEDURES
  {
    id: 44,
    title: "Account Balance Check Procedure",
    description: "Create a procedure to check if account has sufficient balance.",
    dataset: "banking",
    difficulty: "hard",
    category: "PROCEDURE",
    question: "Create a stored procedure that checks if an account has sufficient balance for a withdrawal amount.",
    expectedQuery: "CREATE PROCEDURE CheckBalance(IN acc_id INT, IN amount DECIMAL(10,2), OUT is_sufficient BOOLEAN) BEGIN SELECT balance >= amount INTO is_sufficient FROM accounts WHERE id = acc_id; END;",
    hint: "Use CREATE PROCEDURE with IN and OUT parameters.",
  },

  // TRIGGERS
  {
    id: 45,
    title: "Update Likes Count Trigger",
    description: "Create a trigger to automatically update post likes count.",
    dataset: "social",
    difficulty: "hard",
    category: "TRIGGER",
    question: "Create a trigger that updates the likes_count in posts table when a new like is added (assuming a likes table exists).",
    expectedQuery: "CREATE TRIGGER update_likes_count AFTER INSERT ON likes FOR EACH ROW BEGIN UPDATE posts SET likes_count = likes_count + 1 WHERE id = NEW.post_id; END;",
    hint: "Use CREATE TRIGGER with AFTER INSERT.",
  },

  // PIVOT/UNPIVOT
  {
    id: 46,
    title: "Monthly Transaction Summary",
    description: "Create a pivot showing transaction types by month.",
    dataset: "banking",
    difficulty: "hard",
    category: "PIVOT",
    question: "Create a summary showing count of each transaction type (deposit, withdrawal, transfer) by account.",
    expectedQuery: "SELECT account_id, SUM(CASE WHEN transaction_type = 'deposit' THEN 1 ELSE 0 END) as deposits, SUM(CASE WHEN transaction_type = 'withdrawal' THEN 1 ELSE 0 END) as withdrawals, SUM(CASE WHEN transaction_type = 'transfer' THEN 1 ELSE 0 END) as transfers FROM transactions GROUP BY account_id;",
    hint: "Use CASE statements with SUM to pivot data.",
  },

  // RECURSIVE CTE
  {
    id: 47,
    title: "Employee Hierarchy Path",
    description: "Find the complete management chain for employees.",
    dataset: "employees",
    difficulty: "hard",
    category: "CTE",
    question: "Use a recursive CTE to show the complete management hierarchy from employee to top-level manager.",
    expectedQuery: "WITH RECURSIVE emp_hierarchy AS (SELECT id, name, manager_id, name as path, 1 as level FROM employees WHERE manager_id IS NULL UNION ALL SELECT e.id, e.name, e.manager_id, eh.path || ' -> ' || e.name, eh.level + 1 FROM employees e JOIN emp_hierarchy eh ON e.manager_id = eh.id) SELECT * FROM emp_hierarchy ORDER BY level, path;",
    hint: "Use WITH RECURSIVE to traverse the hierarchy.",
  },

  // COMMON TABLE EXPRESSIONS (CTE)
  {
    id: 48,
    title: "Flight Route Analysis",
    description: "Analyze popular flight routes using CTE.",
    dataset: "flights",
    difficulty: "medium",
    category: "CTE",
    question: "Use a CTE to find the most booked flight routes with total revenue.",
    expectedQuery: "WITH route_stats AS (SELECT f.origin, f.destination, COUNT(b.id) as booking_count, SUM(b.total_price) as total_revenue FROM flights f JOIN bookings b ON f.id = b.flight_id WHERE b.booking_status = 'confirmed' GROUP BY f.origin, f.destination) SELECT * FROM route_stats ORDER BY booking_count DESC;",
    hint: "Create a CTE for aggregated route statistics.",
  },

  // JSON FUNCTIONS
  {
    id: 49,
    title: "Extract Patient Contact Info",
    description: "Work with JSON data if stored in database.",
    dataset: "hospital",
    difficulty: "medium",
    category: "JSON",
    question: "Assuming patient contact info is stored as JSON, extract phone and email separately.",
    expectedQuery: "SELECT name, phone as contact_phone, email as contact_email FROM patients;",
    hint: "In systems with JSON columns, use JSON_EXTRACT or -> operators.",
  },

  // PARTITIONING
  {
    id: 50,
    title: "Partition Transactions by Date",
    description: "Understand table partitioning concepts.",
    dataset: "banking",
    difficulty: "hard",
    category: "PARTITION",
    question: "Create a partitioned table for transactions based on transaction_date by year.",
    expectedQuery: "CREATE TABLE transactions_partitioned (id INT, account_id INT, transaction_type VARCHAR(50), amount DECIMAL(10,2), transaction_date DATE, description VARCHAR(200), balance_after DECIMAL(10,2)) PARTITION BY RANGE (YEAR(transaction_date)) (PARTITION p2022 VALUES LESS THAN (2023), PARTITION p2023 VALUES LESS THAN (2024), PARTITION p2024 VALUES LESS THAN (2025));",
    hint: "Use PARTITION BY RANGE for date-based partitioning.",
  },

  // FULL-TEXT SEARCH
  {
    id: 51,
    title: "Search Posts by Content",
    description: "Implement full-text search on post content.",
    dataset: "social",
    difficulty: "medium",
    category: "FULLTEXT",
    question: "Search for posts containing the word 'amazing' or 'awesome' in content.",
    expectedQuery: "SELECT * FROM posts WHERE content LIKE '%amazing%' OR content LIKE '%awesome%';",
    hint: "For full-text indexes, use MATCH AGAINST in MySQL or FTS in SQLite.",
  },

  // DATA INTEGRITY & CONSTRAINTS
  {
    id: 52,
    title: "Add Foreign Key Constraint",
    description: "Add referential integrity constraint.",
    dataset: "hospital",
    difficulty: "medium",
    category: "CONSTRAINT",
    question: "Add a foreign key constraint to appointments table referencing patients table.",
    expectedQuery: "ALTER TABLE appointments ADD CONSTRAINT fk_patient FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE;",
    hint: "Use ALTER TABLE with ADD CONSTRAINT FOREIGN KEY.",
  },

  // NORMALIZATION
  {
    id: 53,
    title: "Identify Normalization Issues",
    description: "Understand database normalization concepts.",
    dataset: "employees",
    difficulty: "medium",
    category: "NORMALIZATION",
    question: "Identify if storing department budget in employees table would violate normalization principles.",
    expectedQuery: "SELECT 'Storing department budget in employees table violates 3NF as department budget depends on department, not on employee (transitive dependency)' as answer;",
    hint: "This is a conceptual question about Third Normal Form (3NF).",
  },

  // WINDOW FUNCTIONS - LEAD/LAG
  {
    id: 54,
    title: "Transaction Comparison",
    description: "Compare each transaction with the previous one.",
    dataset: "banking",
    difficulty: "hard",
    category: "WINDOW",
    question: "For each account, show current transaction amount and previous transaction amount using LAG function.",
    expectedQuery: "SELECT account_id, transaction_date, amount, LAG(amount, 1) OVER (PARTITION BY account_id ORDER BY transaction_date) as previous_amount FROM transactions;",
    hint: "Use LAG() window function partitioned by account.",
  },

  // WINDOW FUNCTIONS - RUNNING TOTAL
  {
    id: 55,
    title: "Running Balance Calculation",
    description: "Calculate running total of account balance.",
    dataset: "banking",
    difficulty: "hard",
    category: "WINDOW",
    question: "Calculate the running balance for each account based on transaction history.",
    expectedQuery: "SELECT account_id, transaction_date, transaction_type, amount, SUM(CASE WHEN transaction_type = 'deposit' THEN amount WHEN transaction_type IN ('withdrawal', 'transfer') THEN -amount ELSE 0 END) OVER (PARTITION BY account_id ORDER BY transaction_date) as running_balance FROM transactions;",
    hint: "Use SUM() OVER with ORDER BY for cumulative calculation.",
  },

  // CORRELATED SUBQUERY
  {
    id: 56,
    title: "Doctors with Above Average Consultations",
    description: "Find doctors with more appointments than average.",
    dataset: "hospital",
    difficulty: "hard",
    category: "SUBQUERY",
    question: "Find doctors who have more completed appointments than the average number of appointments per doctor.",
    expectedQuery: "SELECT d.name, COUNT(a.id) as appointment_count FROM doctors d JOIN appointments a ON d.id = a.doctor_id WHERE a.status = 'completed' GROUP BY d.id, d.name HAVING COUNT(a.id) > (SELECT AVG(cnt) FROM (SELECT COUNT(*) as cnt FROM appointments WHERE status = 'completed' GROUP BY doctor_id) as avg_appts);",
    hint: "Use nested subquery to calculate average, then compare in HAVING.",
  },

  // SET OPERATIONS - INTERSECT
  {
    id: 57,
    title: "Common Flight Destinations",
    description: "Find destinations served by multiple airlines.",
    dataset: "flights",
    difficulty: "medium",
    category: "SET_OPERATIONS",
    question: "Find destinations that are served by at least 2 different airlines.",
    expectedQuery: "SELECT destination FROM flights GROUP BY destination HAVING COUNT(DISTINCT airline_id) >= 2;",
    hint: "Group by destination and count distinct airlines.",
  },

  // SET OPERATIONS - EXCEPT/MINUS
  {
    id: 58,
    title: "Users Who Never Posted",
    description: "Find users who have not created any posts.",
    dataset: "social",
    difficulty: "medium",
    category: "SET_OPERATIONS",
    question: "Find users who have joined but never created a post.",
    expectedQuery: "SELECT u.username, u.full_name FROM users u LEFT JOIN posts p ON u.id = p.user_id WHERE p.id IS NULL;",
    hint: "Use LEFT JOIN and filter for NULL to find non-matching records.",
  },

  // MATERIALIZED VIEWS
  {
    id: 59,
    title: "Create Materialized View for Analytics",
    description: "Create a materialized view for flight statistics.",
    dataset: "flights",
    difficulty: "hard",
    category: "MATERIALIZED_VIEW",
    question: "Create a materialized view showing airline booking statistics.",
    expectedQuery: "CREATE MATERIALIZED VIEW airline_stats AS SELECT a.airline_name, COUNT(b.id) as total_bookings, SUM(b.total_price) as total_revenue, AVG(b.total_price) as avg_booking_value FROM airlines a JOIN flights f ON a.id = f.airline_id JOIN bookings b ON f.id = b.flight_id WHERE b.booking_status = 'confirmed' GROUP BY a.airline_name;",
    hint: "CREATE MATERIALIZED VIEW stores query results physically.",
  },

  // DATABASE BACKUP & RECOVERY
  {
    id: 60,
    title: "Create Database Backup",
    description: "Understanding backup concepts.",
    dataset: "banking",
    difficulty: "medium",
    category: "BACKUP",
    question: "Write a command to create a logical backup of the accounts table.",
    expectedQuery: "-- Using mysqldump: mysqldump -u username -p database_name accounts > accounts_backup.sql",
    hint: "This is a conceptual question about database backup tools.",
  },

  // USER MANAGEMENT & SECURITY
  {
    id: 61,
    title: "Create Read-Only User",
    description: "Create a user with limited permissions.",
    dataset: "hospital",
    difficulty: "medium",
    category: "USER_MANAGEMENT",
    question: "Create a read-only user that can only SELECT from the patients table.",
    expectedQuery: "CREATE USER 'readonly_user'@'localhost' IDENTIFIED BY 'password'; GRANT SELECT ON hospital.patients TO 'readonly_user'@'localhost';",
    hint: "Use CREATE USER and GRANT SELECT commands.",
  },

  // QUERY OPTIMIZATION
  {
    id: 62,
    title: "Optimize Slow Query",
    description: "Identify query optimization opportunities.",
    dataset: "ecommerce",
    difficulty: "hard",
    category: "OPTIMIZATION",
    question: "Optimize a query finding products by category - what indexes would help?",
    expectedQuery: "CREATE INDEX idx_products_category ON products(category); CREATE INDEX idx_products_category_price ON products(category, price);",
    hint: "Create indexes on frequently filtered and joined columns.",
  },

  // EXPLAIN PLAN
  {
    id: 63,
    title: "Analyze Query Execution",
    description: "Use EXPLAIN to understand query performance.",
    dataset: "employees",
    difficulty: "medium",
    category: "EXPLAIN",
    question: "Use EXPLAIN to analyze how the database executes a query joining employees and departments.",
    expectedQuery: "EXPLAIN SELECT e.name, d.name FROM employees e JOIN departments d ON e.department_id = d.id WHERE e.salary > 70000;",
    hint: "Prefix query with EXPLAIN keyword.",
  },

  // STRING FUNCTIONS
  {
    id: 64,
    title: "Format Patient Names",
    description: "Use string functions to format data.",
    dataset: "hospital",
    difficulty: "easy",
    category: "STRING_FUNCTIONS",
    question: "Extract first name from full name and convert to uppercase.",
    expectedQuery: "SELECT UPPER(SUBSTR(name, 1, INSTR(name, ' ') - 1)) as first_name FROM patients;",
    hint: "Use SUBSTR, INSTR, and UPPER functions.",
  },

  // INVENTORY MANAGEMENT QUERIES
  {
    id: 65,
    title: "Low Stock Alert",
    description: "Find products below reorder level",
    dataset: "inventory",
    difficulty: "easy",
    category: "WHERE",
    question: "Find all products where current inventory level is below the reorder level.",
    expectedQuery: "SELECT p.name, p.reorder_level, SUM(i.quantity) as current_stock FROM products p JOIN inventory_levels i ON p.id = i.product_id GROUP BY p.id, p.name, p.reorder_level HAVING SUM(i.quantity) < p.reorder_level;",
    hint: "Use HAVING clause to filter aggregated results.",
  },
  {
    id: 66,
    title: "Warehouse Stock Value",
    description: "Calculate total inventory value per warehouse",
    dataset: "inventory",
    difficulty: "medium",
    category: "AGGREGATE",
    question: "Calculate the total value of inventory (quantity * unit_price) for each warehouse.",
    expectedQuery: "SELECT w.name, SUM(i.quantity * p.unit_price) as total_value FROM warehouses w JOIN inventory_levels i ON w.id = i.warehouse_id JOIN products p ON i.product_id = p.id GROUP BY w.id, w.name;",
    hint: "Join all three tables and multiply quantity by unit_price.",
  },

  // PROJECT MANAGEMENT QUERIES
  {
    id: 67,
    title: "Project Budget Utilization",
    description: "Calculate actual vs budgeted costs",
    dataset: "projects",
    difficulty: "hard",
    category: "AGGREGATE",
    question: "Calculate total actual cost (hours_worked * hourly_rate) vs budget for each project.",
    expectedQuery: "SELECT p.name, p.budget, SUM(t.hours_worked * m.salary/2080) as actual_cost FROM projects p JOIN tasks t ON p.id = t.project_id JOIN time_entries te ON t.id = te.task_id JOIN team_members m ON te.team_member_id = m.id GROUP BY p.id, p.name, p.budget;",
    hint: "Assume 2080 working hours per year for hourly rate calculation.",
  },
  {
    id: 68,
    title: "Team Workload Analysis",
    description: "Find team members with excessive workload",
    dataset: "projects",
    difficulty: "medium",
    category: "HAVING",
    question: "Find team members who have logged more than 40 hours in the current week.",
    expectedQuery: "SELECT m.name, SUM(te.hours_worked) as total_hours FROM team_members m JOIN time_entries te ON m.id = te.team_member_id WHERE te.entry_date >= DATE('now', '-7 days') GROUP BY m.id, m.name HAVING SUM(te.hours_worked) > 40;",
    hint: "Use date functions to filter recent entries and HAVING for aggregation filter.",
  },

  // CRM QUERIES
  {
    id: 69,
    title: "Lead Conversion Rate",
    description: "Calculate lead to opportunity conversion rate",
    dataset: "crm",
    difficulty: "hard",
    category: "SUBQUERY",
    question: "Calculate the conversion rate from leads to opportunities for each source.",
    expectedQuery: "SELECT source, COUNT(*) as total_leads, SUM(CASE WHEN l.id IN (SELECT contact_id FROM opportunities) THEN 1 ELSE 0 END) as converted_leads, ROUND(SUM(CASE WHEN l.id IN (SELECT contact_id FROM opportunities) THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) as conversion_rate FROM leads l GROUP BY source;",
    hint: "Use subquery in CASE statement to count converted leads.",
  },
  {
    id: 70,
    title: "Sales Pipeline Value",
    description: "Calculate total pipeline value by stage",
    dataset: "crm",
    difficulty: "medium",
    category: "GROUP BY",
    question: "Calculate the total opportunity amount grouped by sales stage.",
    expectedQuery: "SELECT stage, SUM(amount) as total_pipeline_value, COUNT(*) as opportunity_count FROM opportunities GROUP BY stage ORDER BY total_pipeline_value DESC;",
    hint: "Simple aggregation with GROUP BY on stage column.",
  },

  // ANALYTICS QUERIES
  {
    id: 71,
    title: "Daily Traffic Trends",
    description: "Analyze website traffic patterns",
    dataset: "analytics",
    difficulty: "medium",
    category: "DATE_FUNCTIONS",
    question: "Calculate 7-day moving average of page views.",
    expectedQuery: "SELECT date, page_views, AVG(page_views) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) as moving_avg_7d FROM website_traffic ORDER BY date;",
    hint: "Use window function with ROWS BETWEEN for moving average.",
  },
  {
    id: 72,
    title: "Campaign ROI Analysis",
    description: "Calculate return on investment for marketing campaigns",
    dataset: "analytics",
    difficulty: "hard",
    category: "JOIN",
    question: "Calculate ROI (return on investment) for each campaign based on conversion value.",
    expectedQuery: "SELECT c.campaign_name, c.budget, SUM(conv.conversion_value) as total_revenue, ROUND((SUM(conv.conversion_value) - c.budget) * 100.0 / c.budget, 2) as roi_percentage FROM campaigns c LEFT JOIN conversions conv ON c.id = conv.campaign_id GROUP BY c.id, c.campaign_name, c.budget;",
    hint: "Calculate ROI as (revenue - cost) / cost * 100.",
  },

  // ADVANCED WINDOW FUNCTIONS
  {
    id: 73,
    title: "Running Inventory Total",
    description: "Calculate cumulative inventory movements",
    dataset: "inventory",
    difficulty: "hard",
    category: "WINDOW",
    question: "Calculate running total of stock movements for each product.",
    expectedQuery: "SELECT product_id, movement_date, movement_type, quantity, SUM(CASE WHEN movement_type = 'IN' THEN quantity ELSE -quantity END) OVER (PARTITION BY product_id ORDER BY movement_date) as running_total FROM stock_movements ORDER BY product_id, movement_date;",
    hint: "Use window function with PARTITION BY and conditional SUM.",
  },
  {
    id: 74,
    title: "Project Progress Ranking",
    description: "Rank projects by completion percentage",
    dataset: "projects",
    difficulty: "medium",
    category: "WINDOW",
    question: "Rank projects by the percentage of completed tasks.",
    expectedQuery: "SELECT p.name, COUNT(t.id) as total_tasks, SUM(CASE WHEN t.status = 'completed' THEN 1 ELSE 0 END) as completed_tasks, RANK() OVER (ORDER BY SUM(CASE WHEN t.status = 'completed' THEN 1 ELSE 0 END) * 100.0 / COUNT(t.id) DESC) as progress_rank FROM projects p LEFT JOIN tasks t ON p.id = t.project_id GROUP BY p.id, p.name;",
    hint: "Use RANK() window function with calculated completion percentage.",
  },

  // ADVANCED SUBQUERIES
  {
    id: 75,
    title: "Products Never Sold",
    description: "Find products with no sales history",
    dataset: "inventory",
    difficulty: "medium",
    category: "SUBQUERY",
    question: "Find products that have never had any OUT movement in stock_movements.",
    expectedQuery: "SELECT p.name FROM products p WHERE p.id NOT IN (SELECT DISTINCT product_id FROM stock_movements WHERE movement_type = 'OUT');",
    hint: "Use NOT IN with subquery to find products without OUT movements.",
  },
  {
    id: 76,
    title: "Top Performing Sales Reps",
    description: "Find sales representatives with highest win rates",
    dataset: "crm",
    difficulty: "hard",
    category: "SUBQUERY",
    question: "Find sales representatives with the highest opportunity win rate (closed-won opportunities / total opportunities).",
    expectedQuery: "SELECT m.name, COUNT(o.id) as total_opps, SUM(CASE WHEN o.stage = 'closed_won' THEN 1 ELSE 0 END) as won_opps, ROUND(SUM(CASE WHEN o.stage = 'closed_won' THEN 1 ELSE 0 END) * 100.0 / COUNT(o.id), 2) as win_rate FROM team_members m JOIN opportunities o ON m.id = o.assigned_to GROUP BY m.id, m.name HAVING COUNT(o.id) > 0 ORDER BY win_rate DESC;",
    hint: "Calculate win rate using CASE statements in aggregation.",
  },

  // TEMPORAL QUERIES
  {
    id: 77,
    title: "Monthly Traffic Growth",
    description: "Calculate month-over-month growth percentage",
    dataset: "analytics",
    difficulty: "hard",
    category: "DATE_FUNCTIONS",
    question: "Calculate month-over-month growth rate for unique visitors.",
    expectedQuery: "WITH monthly_traffic AS (SELECT strftime('%Y-%m', date) as month, SUM(unique_visitors) as visitors FROM website_traffic GROUP BY strftime('%Y-%m', date)) SELECT month, visitors, LAG(visitors) OVER (ORDER BY month) as prev_month_visitors, ROUND((visitors - LAG(visitors) OVER (ORDER BY month)) * 100.0 / LAG(visitors) OVER (ORDER BY month), 2) as growth_rate FROM monthly_traffic ORDER BY month;",
    hint: "Use LAG() window function to compare with previous month.",
  },
  {
    id: 78,
    title: "User Session Duration Analysis",
    description: "Analyze user engagement patterns",
    dataset: "analytics",
    difficulty: "medium",
    category: "GROUP BY",
    question: "Calculate average session duration by device type and hour of day.",
    expectedQuery: "SELECT device_type, strftime('%H', event_timestamp) as hour_of_day, AVG(avg_session_duration) as avg_duration FROM user_events u JOIN website_traffic w ON DATE(u.event_timestamp) = w.date GROUP BY device_type, strftime('%H', event_timestamp) ORDER BY device_type, hour_of_day;",
    hint: "Use date/time functions to extract hour from timestamp.",
  },

  // DATA QUALITY QUERIES
  {
    id: 79,
    title: "Data Integrity Check",
    description: "Identify missing or invalid data",
    dataset: "crm",
    difficulty: "medium",
    category: "DATA_QUALITY",
    question: "Find leads with invalid email formats or missing phone numbers.",
    expectedQuery: "SELECT id, first_name, last_name, email, phone FROM leads WHERE email NOT LIKE '%@%.%' OR phone IS NULL OR phone = '';",
    hint: "Use pattern matching with LIKE and check for NULL/empty values.",
  },
  {
    id: 80,
    title: "Duplicate Record Detection",
    description: "Find potential duplicate contacts",
    dataset: "crm",
    difficulty: "hard",
    category: "DATA_QUALITY",
    question: "Find potential duplicate contacts based on email or phone number.",
    expectedQuery: "SELECT c1.id, c1.first_name, c1.last_name, c1.email, c1.phone, c2.id as duplicate_id, c2.first_name as duplicate_first_name, c2.last_name as duplicate_last_name FROM contacts c1 JOIN contacts c2 ON (c1.email = c2.email OR c1.phone = c2.phone) AND c1.id < c2.id;",
    hint: "Self-join on email or phone with ID comparison to avoid self-matches.",
  },

  // PERFORMANCE OPTIMIZATION QUERIES
  {
    id: 81,
    title: "Query Execution Plan Analysis",
    description: "Analyze and optimize query performance",
    dataset: "projects",
    difficulty: "hard",
    category: "PERFORMANCE",
    question: "Write a query that would benefit from composite indexes and suggest the index structure.",
    expectedQuery: "CREATE INDEX idx_tasks_project_status ON tasks(project_id, status); CREATE INDEX idx_time_entries_task_date ON time_entries(task_id, entry_date);",
    hint: "Create composite indexes on frequently filtered columns.",
  },
  {
    id: 82,
    title: "Database Size Analysis",
    description: "Analyze table sizes and growth",
    dataset: "inventory",
    difficulty: "medium",
    category: "MAINTENANCE",
    question: "Estimate the size of each table in the inventory database.",
    expectedQuery: "SELECT 'products' as table_name, COUNT(*) as row_count, COUNT(*) * 100 as estimated_size_bytes FROM products UNION ALL SELECT 'inventory_levels', COUNT(*), COUNT(*) * 80 FROM inventory_levels UNION ALL SELECT 'stock_movements', COUNT(*), COUNT(*) * 120 FROM stock_movements;",
    hint: "Use row count with estimated row size for size calculation.",
  },

  // BACKUP AND RECOVERY
  {
    id: 83,
    title: "Point-in-Time Recovery Setup",
    description: "Implement recovery strategies",
    dataset: "banking",
    difficulty: "hard",
    category: "BACKUP",
    question: "Create a backup strategy for transaction data with point-in-time recovery capability.",
    expectedQuery: "-- Enable binary logging for point-in-time recovery SET GLOBAL log_bin = ON; -- Regular backup schedule: mysqldump --single-transaction --master-data=2 banking > backup_$(date +%Y%m%d).sql",
    hint: "Use binary logging and consistent backups for PITR.",
  },

  // SECURITY AND PERMISSIONS
  {
    id: 84,
    title: "Role-Based Access Control",
    description: "Implement security policies",
    dataset: "projects",
    difficulty: "medium",
    category: "SECURITY",
    question: "Create roles for different team members with appropriate permissions.",
    expectedQuery: "CREATE ROLE project_manager; CREATE ROLE team_member; GRANT SELECT, INSERT, UPDATE ON projects.* TO project_manager; GRANT SELECT ON projects.tasks TO team_member; GRANT SELECT, INSERT, UPDATE ON projects.time_entries TO team_member;",
    hint: "Use CREATE ROLE and GRANT statements for role-based access.",
  },

  // DATA MIGRATION QUERIES
  {
    id: 85,
    title: "Data Transformation for Migration",
    description: "Prepare data for system migration",
    dataset: "crm",
    difficulty: "hard",
    category: "MIGRATION",
    question: "Transform lead data from old system format to new system format.",
    expectedQuery: "INSERT INTO new_leads_system (first_name, last_name, email, company_name, created_at) SELECT first_name, last_name, email, company, created_date FROM leads WHERE status IN ('new', 'contacted', 'qualified');",
    hint: "Use INSERT INTO SELECT with appropriate transformations.",
  },

  // ADVANCED ANALYTICS QUERIES
  {
    id: 86,
    title: "Cohort Analysis",
    description: "Analyze user retention cohorts",
    dataset: "analytics",
    difficulty: "hard",
    category: "ANALYTICS",
    question: "Perform cohort analysis to track user retention over time.",
    expectedQuery: "WITH user_cohorts AS (SELECT user_id, MIN(DATE(event_timestamp)) as cohort_date FROM user_events GROUP BY user_id), cohort_data AS (SELECT uc.cohort_date, DATE(u.event_timestamp) as event_date, COUNT(DISTINCT u.user_id) as active_users FROM user_cohorts uc JOIN user_events u ON uc.user_id = u.user_id GROUP BY uc.cohort_date, DATE(u.event_timestamp)) SELECT * FROM cohort_data ORDER BY cohort_date, event_date;",
    hint: "Use CTEs to define cohorts and track activity over time.",
  },
  {
    id: 87,
    title: "Funnel Analysis",
    description: "Analyze user conversion funnels",
    dataset: "analytics",
    difficulty: "hard",
    category: "ANALYTICS",
    question: "Create a conversion funnel from page view to purchase.",
    expectedQuery: "WITH funnel_steps AS (SELECT COUNT(DISTINCT user_id) as page_views FROM user_events WHERE event_type = 'page_view' UNION ALL SELECT COUNT(DISTINCT user_id) FROM user_events WHERE event_type = 'add_to_cart' UNION ALL SELECT COUNT(DISTINCT user_id) FROM user_events WHERE event_type = 'purchase') SELECT step, count, ROUND(count * 100.0 / (SELECT COUNT(DISTINCT user_id) FROM user_events WHERE event_type = 'page_view'), 2) as conversion_rate FROM (SELECT 'page_view' as step, COUNT(DISTINCT user_id) as count FROM user_events WHERE event_type = 'page_view' UNION ALL SELECT 'add_to_cart', COUNT(DISTINCT user_id) FROM user_events WHERE event_type = 'add_to_cart' UNION ALL SELECT 'purchase', COUNT(DISTINCT user_id) FROM user_events WHERE event_type = 'purchase') as funnel;",
    hint: "Use UNION ALL to combine different funnel steps and calculate rates.",
  },

  // REAL-TIME MONITORING QUERIES
  {
    id: 88,
    title: "System Performance Monitoring",
    description: "Monitor database performance metrics",
    dataset: "projects",
    difficulty: "hard",
    category: "MONITORING",
    question: "Create a query to monitor long-running tasks and resource usage.",
    expectedQuery: "SELECT p.name as project_name, t.name as task_name, m.name as assignee, SUM(te.hours_worked) as total_hours, t.estimated_hours as estimated, CASE WHEN SUM(te.hours_worked) > t.estimated_hours THEN 'Over Budget' ELSE 'On Track' END as status FROM projects p JOIN tasks t ON p.id = t.project_id JOIN time_entries te ON t.id = te.task_id JOIN team_members m ON te.team_member_id = m.id GROUP BY p.name, t.name, m.name, t.estimated_hours HAVING SUM(te.hours_worked) > t.estimated_hours;",
    hint: "Compare actual hours worked vs estimated hours.",
  },

  // DATA ARCHIVING STRATEGIES
  {
    id: 89,
    title: "Data Archiving Procedure",
    description: "Implement data archiving for old records",
    dataset: "crm",
    difficulty: "medium",
    category: "MAINTENANCE",
    question: "Create a procedure to archive leads older than 2 years with no activity.",
    expectedQuery: "CREATE TABLE archived_leads AS SELECT * FROM leads WHERE created_date < DATE('now', '-2 years') AND id NOT IN (SELECT contact_id FROM opportunities WHERE close_date > DATE('now', '-2 years')); DELETE FROM leads WHERE id IN (SELECT id FROM archived_leads);",
    hint: "Use CREATE TABLE AS to archive and then DELETE original records.",
  },

  // DISASTER RECOVERY
  {
    id: 90,
    title: "Disaster Recovery Validation",
    description: "Verify data consistency after recovery",
    dataset: "banking",
    difficulty: "hard",
    category: "RECOVERY",
    question: "Create a checksum validation query to verify data integrity after recovery.",
    expectedQuery: "SELECT 'accounts' as table_name, COUNT(*) as row_count, SUM(balance) as total_balance, MD5(GROUP_CONCAT(id, account_number, balance)) as data_checksum FROM accounts UNION ALL SELECT 'transactions', COUNT(*), SUM(amount), MD5(GROUP_CONCAT(id, account_id, amount, transaction_date)) FROM transactions;",
    hint: "Use checksum functions and row counts for data validation.",
  },

  // LOGISTICS & SHIPPING QUERIES
  {
    id: 91,
    title: "Delivery Performance Analysis",
    description: "Analyze carrier delivery performance",
    dataset: "logistics",
    difficulty: "medium",
    category: "ANALYTICS",
    question: "Calculate on-time delivery rate for each carrier.",
    expectedQuery: "SELECT c.name, COUNT(*) as total_shipments, SUM(CASE WHEN s.actual_delivery <= s.estimated_delivery THEN 1 ELSE 0 END) as on_time_deliveries, ROUND(SUM(CASE WHEN s.actual_delivery <= s.estimated_delivery THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) as on_time_rate FROM carriers c JOIN shipments s ON c.id = s.carrier_id WHERE s.actual_delivery IS NOT NULL GROUP BY c.id, c.name;",
    hint: "Compare actual_delivery with estimated_delivery for delivered shipments.",
  },
  {
    id: 92,
    title: "Shipping Cost Optimization",
    description: "Identify cost-saving opportunities in shipping",
    dataset: "logistics",
    difficulty: "hard",
    category: "OPTIMIZATION",
    question: "Find shipments where a different carrier would have been cheaper based on weight and zone.",
    expectedQuery: "SELECT s.id, s.tracking_number, c.name as current_carrier, s.shipping_cost as current_cost, (SELECT MIN(base_rate + (s.weight_kg * rate_per_kg)) FROM carriers c2 WHERE c2.id != s.carrier_id) as alternative_min_cost FROM shipments s JOIN carriers c ON s.carrier_id = c.id WHERE s.shipping_cost > (SELECT MIN(base_rate + (s.weight_kg * rate_per_kg)) FROM carriers c2 WHERE c2.id != s.carrier_id);",
    hint: "Use subquery to find minimum alternative shipping cost.",
  },

  // REAL ESTATE QUERIES
  {
    id: 93,
    title: "Market Analysis by Property Type",
    description: "Analyze real estate market trends",
    dataset: "real_estate",
    difficulty: "medium",
    category: "ANALYTICS",
    question: "Calculate average days on market and average sale price by property type.",
    expectedQuery: "SELECT p.property_type, AVG(julianday(t.sale_date) - julianday(p.list_date)) as avg_days_on_market, AVG(t.sale_price) as avg_sale_price FROM properties p JOIN transactions t ON p.id = t.property_id WHERE p.status = 'sold' GROUP BY p.property_type;",
    hint: "Use date arithmetic to calculate days between listing and sale.",
  },
  {
    id: 94,
    title: "Agent Performance Ranking",
    description: "Rank real estate agents by sales performance",
    dataset: "real_estate",
    difficulty: "hard",
    category: "WINDOW",
    question: "Rank agents by total commission earned and number of properties sold.",
    expectedQuery: "SELECT a.first_name, a.last_name, COUNT(t.id) as properties_sold, SUM(t.agent_commission) as total_commission, RANK() OVER (ORDER BY SUM(t.agent_commission) DESC) as commission_rank FROM agents a LEFT JOIN properties p ON a.id = p.agent_id LEFT JOIN transactions t ON p.id = t.property_id GROUP BY a.id, a.first_name, a.last_name;",
    hint: "Use RANK() window function over total commission.",
  },

  // HEALTHCARE EHR QUERIES
  {
    id: 95,
    title: "Patient Medication History",
    description: "Track patient medication adherence",
    dataset: "healthcare",
    difficulty: "medium",
    category: "JOIN",
    question: "Create a comprehensive patient medication history with provider details.",
    expectedQuery: "SELECT p.first_name, p.last_name, pr.medication_name, pr.dosage, pr.frequency, pr.start_date, pr.end_date, d.first_name as provider_first, d.last_name as provider_last, d.specialty FROM patients p JOIN prescriptions pr ON p.id = pr.patient_id JOIN providers d ON pr.provider_id = d.id ORDER BY p.last_name, pr.start_date DESC;",
    hint: "Join patients, prescriptions, and providers tables.",
  },
  {
    id: 96,
    title: "Provider Workload Analysis",
    description: "Analyze provider patient load and encounter frequency",
    dataset: "healthcare",
    difficulty: "hard",
    category: "ANALYTICS",
    question: "Calculate average patients per provider and encounters per patient by specialty.",
    expectedQuery: "SELECT p.specialty, COUNT(DISTINCT e.patient_id) as unique_patients, COUNT(e.id) as total_encounters, ROUND(COUNT(DISTINCT e.patient_id) * 1.0 / COUNT(DISTINCT p.id), 2) as avg_patients_per_provider, ROUND(COUNT(e.id) * 1.0 / COUNT(DISTINCT e.patient_id), 2) as avg_encounters_per_patient FROM providers p JOIN encounters e ON p.id = e.provider_id GROUP BY p.specialty;",
    hint: "Use multiple COUNT DISTINCT for different aggregations.",
  },

  // MANUFACTURING QUERIES
  {
    id: 97,
    title: "Production Efficiency Analysis",
    description: "Analyze production line efficiency and defect rates",
    dataset: "manufacturing",
    difficulty: "hard",
    category: "ANALYTICS",
    question: "Calculate defect rate and production efficiency for each production line.",
    expectedQuery: "SELECT pl.line_name, SUM(w.quantity) as total_units, SUM(qc.defect_count) as total_defects, ROUND(SUM(qc.defect_count) * 100.0 / SUM(qc.total_checked), 2) as defect_rate, ROUND((SUM(w.quantity) - SUM(qc.defect_count)) * 100.0 / SUM(w.quantity), 2) as efficiency_rate FROM production_lines pl JOIN work_orders w ON pl.line_name = w.assigned_line JOIN quality_checks qc ON w.id = qc.work_order_id WHERE w.status = 'completed' GROUP BY pl.id, pl.line_name;",
    hint: "Calculate defect rate as (defects/total_checked) and efficiency as (good_units/total_units).",
  },
  {
    id: 98,
    title: "Inventory Turnover Calculation",
    description: "Calculate inventory turnover ratio for products",
    dataset: "manufacturing",
    difficulty: "medium",
    category: "FINANCIAL",
    question: "Calculate inventory turnover ratio based on production and sales data.",
    expectedQuery: "SELECT p.product_name, SUM(w.quantity) as units_produced, (SELECT SUM(oi.quantity) FROM order_items oi JOIN products p2 ON oi.product_id = p2.id WHERE p2.product_code = p.product_code) as units_sold, ROUND((SELECT SUM(oi.quantity) FROM order_items oi JOIN products p2 ON oi.product_id = p2.id WHERE p2.product_code = p.product_code) * 1.0 / p.safety_stock, 2) as turnover_ratio FROM products p JOIN work_orders w ON p.id = w.product_id WHERE w.status = 'completed' GROUP BY p.id, p.product_name, p.product_code, p.safety_stock;",
    hint: "Join manufacturing data with sales data from ecommerce dataset.",
  },

  // INSURANCE CLAIMS QUERIES
  {
    id: 99,
    title: "Claims Fraud Detection Patterns",
    description: "Identify potential fraud patterns in insurance claims",
    dataset: "insurance",
    difficulty: "hard",
    category: "SECURITY",
    question: "Find customers with multiple claims in short time periods.",
    expectedQuery: "SELECT c.first_name, c.last_name, COUNT(cl.id) as claim_count, MIN(cl.incident_date) as first_claim, MAX(cl.incident_date) as last_claim, ROUND((julianday(MAX(cl.incident_date)) - julianday(MIN(cl.incident_date))) / COUNT(cl.id), 2) as avg_days_between_claims FROM customers c JOIN policies p ON c.id = p.customer_id JOIN claims cl ON p.id = cl.policy_id GROUP BY c.id, c.first_name, c.last_name HAVING COUNT(cl.id) > 1 AND (julianday(MAX(cl.incident_date)) - julianday(MIN(cl.incident_date))) / COUNT(cl.id) < 30;",
    hint: "Calculate average days between claims and filter for frequent claims.",
  },
  {
    id: 100,
    title: "Policy Renewal Forecasting",
    description: "Forecast policy renewals and revenue",
    dataset: "insurance",
    difficulty: "hard",
    category: "FORECASTING",
    question: "Identify policies expiring in the next 30 days and calculate potential renewal revenue.",
    expectedQuery: "SELECT policy_number, customer_id, policy_type, coverage_amount, premium, end_date, CASE WHEN status = 'active' THEN premium ELSE 0 END as potential_renewal_revenue FROM policies WHERE end_date BETWEEN DATE('now') AND DATE('now', '+30 days') AND status = 'active';",
    hint: "Filter by end_date range and active status.",
  },

  // ADVANCED SECURITY QUERIES
  {
    id: 101,
    title: "Data Access Audit Trail",
    description: "Create comprehensive audit trails",
    dataset: "healthcare",
    difficulty: "hard",
    category: "SECURITY",
    question: "Create a query to audit patient data access by providers.",
    expectedQuery: "SELECT p.first_name, p.last_name, d.first_name as provider_first, d.last_name as provider_last, e.encounter_date, e.encounter_type, 'PHI Access' as access_type FROM patients p JOIN encounters e ON p.id = e.patient_id JOIN providers d ON e.provider_id = d.id UNION ALL SELECT p.first_name, p.last_name, d.first_name as provider_first, d.last_name as provider_last, pr.start_date as access_date, 'Prescription' as access_type, 'PHI Access' as access_category FROM patients p JOIN prescriptions pr ON p.id = pr.patient_id JOIN providers d ON pr.provider_id = d.id ORDER BY last_name, access_date DESC;",
    hint: "Use UNION to combine different types of data access.",
  },

  // DISASTER RECOVERY QUERIES
  {
    id: 102,
    title: "Database Recovery Point Objective",
    description: "Calculate Recovery Point Objective compliance",
    dataset: "banking",
    difficulty: "hard",
    category: "RECOVERY",
    question: "Calculate potential data loss based on backup frequency and transaction volume.",
    expectedQuery: "SELECT 'Transactions' as metric, COUNT(*) as total_count, MAX(transaction_date) as latest_transaction, MIN(transaction_date) as earliest_transaction, ROUND((julianday(MAX(transaction_date)) - julianday(MIN(transaction_date))) / COUNT(*), 4) as avg_transactions_per_day FROM transactions WHERE transaction_date >= DATE('now', '-1 day');",
    hint: "Analyze transaction patterns to determine RPO requirements.",
  },

  // DATA GOVERNANCE QUERIES
  {
    id: 103,
    title: "Data Quality Metrics Dashboard",
    description: "Monitor data quality across systems",
    dataset: "multiple",
    difficulty: "hard",
    category: "DATA_QUALITY",
    question: "Create a comprehensive data quality report across multiple datasets.",
    expectedQuery: "SELECT 'employees' as dataset, COUNT(*) as total_records, SUM(CASE WHEN email IS NULL OR email = '' THEN 1 ELSE 0 END) as missing_emails, ROUND(SUM(CASE WHEN email IS NULL OR email = '' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) as missing_email_pct FROM employees UNION ALL SELECT 'customers', COUNT(*), SUM(CASE WHEN email IS NULL OR email = '' THEN 1 ELSE 0 END), ROUND(SUM(CASE WHEN email IS NULL OR email = '' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) FROM customers;",
    hint: "Use UNION to combine data quality metrics from multiple tables.",
  },
  {
    id: 105,
    title: "Select All Columns",
    description: "Basic SELECT statement with all columns",
    dataset: "employees",
    difficulty: "easy",
    category: "SELECT",
    question: "Select all columns from the employees table.",
    expectedQuery: "SELECT * FROM employees;",
    hint: "Use * to select all columns.",
  },
  {
    id: 106,
    title: "Select Specific Columns",
    description: "Select only specific columns",
    dataset: "employees",
    difficulty: "easy",
    category: "SELECT",
    question: "Select only name and email columns from employees.",
    expectedQuery: "SELECT name, email FROM employees;",
    hint: "Specify column names separated by commas.",
  },
  {
    id: 107,
    title: "Select with Table Alias",
    description: "Use table aliases in SELECT",
    dataset: "employees",
    difficulty: "easy",
    category: "SELECT",
    question: "Select employee names using table alias 'e'.",
    expectedQuery: "SELECT e.name FROM employees e;",
    hint: "Use table_name alias_name syntax.",
  },
  {
    id: 108,
    title: "Select with Column Alias",
    description: "Use column aliases in SELECT",
    dataset: "employees",
    difficulty: "easy",
    category: "SELECT",
    question: "Select employee names with column alias 'employee_name'.",
    expectedQuery: "SELECT name AS employee_name FROM employees;",
    hint: "Use column_name AS alias_name syntax.",
  },
  {
    id: 109,
    title: "Select Distinct Values",
    description: "Use DISTINCT to get unique values",
    dataset: "employees",
    difficulty: "easy",
    category: "SELECT",
    question: "Get all unique department IDs from employees.",
    expectedQuery: "SELECT DISTINCT department_id FROM employees;",
    hint: "Use DISTINCT keyword before column name.",
  },
  {
    id: 110,
    title: "Select with Calculations",
    description: "Perform calculations in SELECT",
    dataset: "employees",
    difficulty: "easy",
    category: "SELECT",
    question: "Select employee names with their annual bonus (10% of salary).",
    expectedQuery: "SELECT name, salary * 0.1 AS annual_bonus FROM employees;",
    hint: "You can perform arithmetic operations in SELECT.",
  },
  {
    id: 111,
    title: "Select with String Concatenation",
    description: "Concatenate strings in SELECT",
    dataset: "employees",
    difficulty: "easy",
    category: "SELECT",
    question: "Select employee names in 'Name: [employee_name]' format.",
    expectedQuery: "SELECT 'Name: ' || name AS formatted_name FROM employees;",
    hint: "Use || for string concatenation.",
  },
  {
    id: 112,
    title: "Select with CASE Expression",
    description: "Use CASE in SELECT statement",
    dataset: "employees",
    difficulty: "medium",
    category: "SELECT",
    question: "Select employees with salary category: 'High' if salary > 80000, 'Medium' otherwise.",
    expectedQuery: "SELECT name, salary, CASE WHEN salary > 80000 THEN 'High' ELSE 'Medium' END AS salary_category FROM employees;",
    hint: "Use CASE WHEN condition THEN result ELSE default END.",
  },
  {
    id: 113,
    title: "Select with Date Formatting",
    description: "Format dates in SELECT",
    dataset: "employees",
    difficulty: "medium",
    category: "SELECT",
    question: "Select employee names and hire dates in 'YYYY-MM' format.",
    expectedQuery: "SELECT name, strftime('%Y-%m', hire_date) AS hire_month FROM employees;",
    hint: "Use strftime function for date formatting.",
  },
  {
    id: 114,
    title: "Select with NULL Handling",
    description: "Handle NULL values in SELECT",
    dataset: "employees",
    difficulty: "medium",
    category: "SELECT",
    question: "Select employee names and manager IDs, showing 'No Manager' for NULL values.",
    expectedQuery: "SELECT name, COALESCE(CAST(manager_id AS TEXT), 'No Manager') AS manager_info FROM employees;",
    hint: "Use COALESCE or CASE to handle NULL values.",
  },

  // WHERE CLAUSE (10 questions)
  {
    id: 115,
    title: "Basic WHERE Filter",
    description: "Simple WHERE clause with equality",
    dataset: "employees",
    difficulty: "easy",
    category: "WHERE",
    question: "Select employees from department_id 1.",
    expectedQuery: "SELECT * FROM employees WHERE department_id = 1;",
    hint: "Use WHERE column = value syntax.",
  },
  {
    id: 116,
    title: "WHERE with AND Operator",
    description: "Multiple conditions with AND",
    dataset: "employees",
    difficulty: "easy",
    category: "WHERE",
    question: "Select employees from department 1 with salary greater than 70000.",
    expectedQuery: "SELECT * FROM employees WHERE department_id = 1 AND salary > 70000;",
    hint: "Use AND to combine multiple conditions.",
  },
  {
    id: 117,
    title: "WHERE with OR Operator",
    description: "Multiple conditions with OR",
    dataset: "employees",
    difficulty: "easy",
    category: "WHERE",
    question: "Select employees from department 1 OR department 2.",
    expectedQuery: "SELECT * FROM employees WHERE department_id = 1 OR department_id = 2;",
    hint: "Use OR for alternative conditions.",
  },
  {
    id: 118,
    title: "WHERE with IN Operator",
    description: "Filter with IN list",
    dataset: "employees",
    difficulty: "easy",
    category: "WHERE",
    question: "Select employees from department 1, 2, or 3.",
    expectedQuery: "SELECT * FROM employees WHERE department_id IN (1, 2, 3);",
    hint: "Use IN (value1, value2, ...) for multiple values.",
  },
  {
    id: 119,
    title: "WHERE with BETWEEN",
    description: "Filter with range using BETWEEN",
    dataset: "employees",
    difficulty: "easy",
    category: "WHERE",
    question: "Select employees with salary between 60000 and 80000.",
    expectedQuery: "SELECT * FROM employees WHERE salary BETWEEN 60000 AND 80000;",
    hint: "Use BETWEEN lower AND upper for range filtering.",
  },
  {
    id: 120,
    title: "WHERE with LIKE Pattern",
    description: "Pattern matching with LIKE",
    dataset: "employees",
    difficulty: "easy",
    category: "WHERE",
    question: "Select employees whose names start with 'J'.",
    expectedQuery: "SELECT * FROM employees WHERE name LIKE 'J%';",
    hint: "Use % as wildcard with LIKE operator.",
  },
  {
    id: 121,
    title: "WHERE with NOT Operator",
    description: "Negate conditions with NOT",
    dataset: "employees",
    difficulty: "easy",
    category: "WHERE",
    question: "Select employees NOT from department 1.",
    expectedQuery: "SELECT * FROM employees WHERE department_id != 1;",
    hint: "Use != or <> for not equal.",
  },
  {
    id: 122,
    title: "WHERE with NULL Check",
    description: "Filter NULL values",
    dataset: "employees",
    difficulty: "easy",
    category: "WHERE",
    question: "Select employees who have no manager (manager_id is NULL).",
    expectedQuery: "SELECT * FROM employees WHERE manager_id IS NULL;",
    hint: "Use IS NULL to check for NULL values.",
  },
  {
    id: 123,
    title: "WHERE with Date Comparison",
    description: "Filter by dates",
    dataset: "employees",
    difficulty: "medium",
    category: "WHERE",
    question: "Select employees hired after January 1, 2022.",
    expectedQuery: "SELECT * FROM employees WHERE hire_date > '2022-01-01';",
    hint: "Compare dates using standard comparison operators.",
  },

  // AMAZON Interview Questions
  {
    id: 201,
    title: "Second Highest Salary",
    description: "Find the second highest salary from employees table",
    dataset: "employees",
    difficulty: "medium",
    category: "SUBQUERY",
    question: "Write a SQL query to find the second highest salary from the employees table. If there is no second highest salary, return null.",
    expectedQuery: "SELECT MAX(salary) AS second_highest_salary FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);",
    hint: "Use subquery to first find the maximum salary, then find the maximum salary that is less than that.",
    interview_company: "Amazon"
  },
  {
    id: 202,
    title: "Department Highest Salary",
    description: "Find employees with highest salary in each department",
    dataset: "employees",
    difficulty: "medium",
    category: "WINDOW",
    question: "Find employees who have the highest salary in their respective departments.",
    expectedQuery: "WITH RankedSalaries AS (SELECT name, department_id, salary, RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as rank FROM employees) SELECT name, department_id, salary FROM RankedSalaries WHERE rank = 1;",
    hint: "Use window function RANK() partitioned by department and ordered by salary descending.",
    interview_company: "Amazon"
  },
  {
    id: 203,
    title: "Consecutive Login Days",
    description: "Find users who logged in for 3 consecutive days",
    dataset: "social",
    difficulty: "hard",
    category: "WINDOW",
    question: "Given a user login table, find users who logged in for at least 3 consecutive days.",
    expectedQuery: "WITH LoginGroups AS (SELECT user_id, login_date, DATE(login_date, '-' || (ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date)) || ' days') as group_date FROM (SELECT DISTINCT user_id, DATE(post_date) as login_date FROM posts) logins) SELECT user_id, COUNT(*) as consecutive_days FROM LoginGroups GROUP BY user_id, group_date HAVING COUNT(*) >= 3;",
    hint: "Use window functions and date arithmetic to group consecutive dates.",
    interview_company: "Amazon"
  },

  // GOOGLE Interview Questions
  {
    id: 204,
    title: "Cumulative Sum",
    description: "Calculate running total of sales",
    dataset: "ecommerce",
    difficulty: "medium",
    category: "WINDOW",
    question: "Calculate the cumulative sum of order amounts for each customer over time.",
    expectedQuery: "SELECT customer_id, order_date, total_amount, SUM(total_amount) OVER (PARTITION BY customer_id ORDER BY order_date) as running_total FROM orders ORDER BY customer_id, order_date;",
    hint: "Use SUM() window function with PARTITION BY and ORDER BY.",
    interview_company: "Google"
  },
  {
    id: 205,
    title: "Top N Per Group",
    description: "Find top 3 products by revenue in each category",
    dataset: "ecommerce",
    difficulty: "hard",
    category: "WINDOW",
    question: "For each product category, find the top 3 products by total revenue.",
    expectedQuery: "WITH ProductRevenue AS (SELECT p.category, p.name, SUM(oi.quantity * oi.unit_price) as revenue, ROW_NUMBER() OVER (PARTITION BY p.category ORDER BY SUM(oi.quantity * oi.unit_price) DESC) as rank FROM products p JOIN order_items oi ON p.id = oi.product_id GROUP BY p.category, p.name) SELECT category, name, revenue FROM ProductRevenue WHERE rank <= 3;",
    hint: "Use ROW_NUMBER() window function partitioned by category.",
    interview_company: "Google"
  },
  {
    id: 206,
    title: "Median Salary",
    description: "Find median salary per department",
    dataset: "employees",
    difficulty: "hard",
    category: "WINDOW",
    question: "Calculate the median salary for each department.",
    expectedQuery: "WITH RankedSalaries AS (SELECT department_id, salary, ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary) as row_num, COUNT(*) OVER (PARTITION BY department_id) as total_count FROM employees) SELECT department_id, AVG(salary) as median_salary FROM RankedSalaries WHERE row_num IN (FLOOR((total_count + 1)/2), FLOOR((total_count + 2)/2)) GROUP BY department_id;",
    hint: "Use window functions to handle both even and odd number of records.",
    interview_company: "Google"
  },

  // FACEBOOK/META Interview Questions
  {
    id: 207,
    title: "Friend Recommendations",
    description: "Suggest friends of friends",
    dataset: "social",
    difficulty: "hard",
    category: "SELF_JOIN",
    question: "For each user, recommend friends who are friends of their friends but not already friends.",
    expectedQuery: "SELECT DISTINCT f1.follower_id as user_id, f2.following_id as recommended_friend FROM follows f1 JOIN follows f2 ON f1.following_id = f2.follower_id LEFT JOIN follows f3 ON f1.follower_id = f3.follower_id AND f2.following_id = f3.following_id WHERE f1.follower_id != f2.following_id AND f3.follower_id IS NULL;",
    hint: "Use self-joins on the follows table and exclude existing friendships.",
    interview_company: "Facebook"
  },
  {
    id: 208,
    title: "Active Users Retention",
    description: "Calculate monthly active users retention",
    dataset: "social",
    difficulty: "hard",
    category: "ANALYTICS",
    question: "Calculate month-over-month retention rate of active users.",
    expectedQuery: "WITH MonthlyActiveUsers AS (SELECT DISTINCT user_id, strftime('%Y-%m', post_date) as activity_month FROM posts), UserRetention AS (SELECT a.user_id, a.activity_month as current_month, b.activity_month as next_month FROM MonthlyActiveUsers a LEFT JOIN MonthlyActiveUsers b ON a.user_id = b.user_id AND b.activity_month = strftime('%Y-%m', date(a.activity_month || '-01', '+1 month')) SELECT current_month, COUNT(DISTINCT user_id) as active_users, ROUND(100.0 * SUM(CASE WHEN next_month IS NOT NULL THEN 1 ELSE 0 END) / COUNT(*), 2) as retention_rate FROM UserRetention GROUP BY current_month ORDER BY current_month;",
    hint: "Use self-join on the user activity table with date arithmetic.",
    interview_company: "Facebook"
  },

  // MICROSOFT Interview Questions
  {
    id: 209,
    title: "Employees Earning More Than Managers",
    description: "Find employees who earn more than their managers",
    dataset: "employees",
    difficulty: "easy",
    category: "SELF_JOIN",
    question: "Write a SQL query to find employees who earn more than their managers.",
    expectedQuery: "SELECT e.name as employee_name, e.salary as employee_salary, m.name as manager_name, m.salary as manager_salary FROM employees e JOIN employees m ON e.manager_id = m.id WHERE e.salary > m.salary;",
    hint: "Use self-join on the employees table.",
    interview_company: "Microsoft"
  },
  {
    id: 210,
    title: "Duplicate Emails",
    description: "Find duplicate email addresses",
    dataset: "employees",
    difficulty: "easy",
    category: "GROUP_BY",
    question: "Find all duplicate email addresses in the employees table.",
    expectedQuery: "SELECT email, COUNT(*) as count FROM employees GROUP BY email HAVING COUNT(*) > 1;",
    hint: "Use GROUP BY and HAVING to find duplicates.",
    interview_company: "Microsoft"
  },

  // APPLE Interview Questions
  {
    id: 211,
    title: "Department Top Three Salaries",
    description: "Find top 3 salaries in each department",
    dataset: "employees",
    difficulty: "hard",
    category: "WINDOW",
    question: "Find employees who have one of the top three unique salaries in their department.",
    expectedQuery: "WITH SalaryRanks AS (SELECT name, department_id, salary, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as rank FROM employees) SELECT name, department_id, salary FROM SalaryRanks WHERE rank <= 3;",
    hint: "Use DENSE_RANK() instead of ROW_NUMBER() to handle ties properly.",
    interview_company: "Apple"
  },
  {
    id: 212,
    title: "Product Sales Analysis",
    description: "Analyze product sales across quarters",
    dataset: "ecommerce",
    difficulty: "medium",
    category: "PIVOT",
    question: "Show total sales for each product by quarter.",
    expectedQuery: "SELECT p.name, SUM(CASE WHEN strftime('%m', o.order_date) BETWEEN '01' AND '03' THEN oi.quantity * oi.unit_price ELSE 0 END) as Q1_sales, SUM(CASE WHEN strftime('%m', o.order_date) BETWEEN '04' AND '06' THEN oi.quantity * oi.unit_price ELSE 0 END) as Q2_sales, SUM(CASE WHEN strftime('%m', o.order_date) BETWEEN '07' AND '09' THEN oi.quantity * oi.unit_price ELSE 0 END) as Q3_sales, SUM(CASE WHEN strftime('%m', o.order_date) BETWEEN '10' AND '12' THEN oi.quantity * oi.unit_price ELSE 0 END) as Q4_sales FROM products p JOIN order_items oi ON p.id = oi.product_id JOIN orders o ON oi.order_id = o.id GROUP BY p.name;",
    hint: "Use CASE statements to create pivot table columns.",
    interview_company: "Apple"
  },

  // NETFLIX Interview Questions
  {
    id: 213,
    title: "Popular Content Analysis",
    description: "Find most engaged-with content",
    dataset: "social",
    difficulty: "medium",
    category: "ANALYTICS",
    question: "Find posts with above-average engagement (likes + comments + shares).",
    expectedQuery: "SELECT id, content, (likes_count + comments_count + shares_count) as total_engagement FROM posts WHERE (likes_count + comments_count + shares_count) > (SELECT AVG(likes_count + comments_count + shares_count) FROM posts);",
    hint: "Calculate total engagement and compare with average using subquery.",
    interview_company: "Netflix"
  },
  {
    id: 214,
    title: "User Session Analysis",
    description: "Analyze user session patterns",
    dataset: "analytics",
    difficulty: "hard",
    category: "WINDOW",
    question: "Find users who had sessions lasting more than 30 minutes.",
    expectedQuery: "WITH SessionTimes AS (SELECT user_id, session_id, MIN(event_timestamp) as session_start, MAX(event_timestamp) as session_end, (julianday(MAX(event_timestamp)) - julianday(MIN(event_timestamp))) * 24 * 60 as session_minutes FROM user_events GROUP BY user_id, session_id) SELECT user_id, session_id, session_minutes FROM SessionTimes WHERE session_minutes > 30;",
    hint: "Group by session_id and calculate time difference between first and last event.",
    interview_company: "Netflix"
  },

  // UBER Interview Questions
  {
    id: 215,
    title: "Ride Cancellation Rate",
    description: "Calculate driver cancellation rates",
    dataset: "logistics",
    difficulty: "medium",
    category: "ANALYTICS",
    question: "Calculate cancellation rate for each carrier (assuming cancelled shipments have status 'cancelled').",
    expectedQuery: "SELECT name, COUNT(*) as total_shipments, SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled_shipments, ROUND(SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) as cancellation_rate FROM carriers c JOIN shipments s ON c.id = s.carrier_id GROUP BY c.id, c.name;",
    hint: "Use CASE statement to count cancellations and calculate percentage.",
    interview_company: "Uber"
  },
  {
    id: 216,
    title: "Peak Hours Analysis",
    description: "Find busiest hours for service",
    dataset: "analytics",
    difficulty: "medium",
    category: "GROUP_BY",
    question: "Find the hour of day with the most user activity.",
    expectedQuery: "SELECT strftime('%H', event_timestamp) as hour, COUNT(*) as activity_count FROM user_events GROUP BY strftime('%H', event_timestamp) ORDER BY activity_count DESC LIMIT 1;",
    hint: "Extract hour from timestamp and group by hour.",
    interview_company: "Uber"
  },

  // AIRBNB Interview Questions
  {
    id: 217,
    title: "Host Performance Ranking",
    description: "Rank hosts by multiple metrics",
    dataset: "real_estate",
    difficulty: "hard",
    category: "WINDOW",
    question: "Rank real estate agents by both number of properties sold and total commission earned.",
    expectedQuery: "WITH AgentStats AS (SELECT a.id, a.first_name, a.last_name, COUNT(t.id) as properties_sold, SUM(t.agent_commission) as total_commission FROM agents a LEFT JOIN properties p ON a.id = p.agent_id LEFT JOIN transactions t ON p.id = t.property_id GROUP BY a.id, a.first_name, a.last_name) SELECT first_name, last_name, properties_sold, total_commission, RANK() OVER (ORDER BY properties_sold DESC, total_commission DESC) as overall_rank FROM AgentStats;",
    hint: "Use multiple columns in ORDER BY clause of window function.",
    interview_company: "Airbnb"
  },
  {
    id: 218,
    title: "Price Optimization",
    description: "Analyze pricing strategies",
    dataset: "real_estate",
    difficulty: "medium",
    category: "ANALYTICS",
    question: "Find properties that sold for more than 10% above their list price.",
    expectedQuery: "SELECT p.address, p.list_price, t.sale_price, ROUND((t.sale_price - p.list_price) * 100.0 / p.list_price, 2) as premium_percent FROM properties p JOIN transactions t ON p.id = t.property_id WHERE t.sale_price > p.list_price * 1.1;",
    hint: "Calculate percentage difference between sale price and list price.",
    interview_company: "Airbnb"
  },

  // LINKEDIN Interview Questions
  {
    id: 219,
    title: "Connection Recommendations",
    description: "Suggest professional connections",
    dataset: "social",
    difficulty: "hard",
    category: "GRAPH",
    question: "Find users who work in the same department and have mutual connections but are not directly connected.",
    expectedQuery: "WITH DepartmentUsers AS (SELECT e.id as user_id, e.name, e.department_id FROM employees e), MutualConnections AS (SELECT d1.user_id as user1, d2.user_id as user2, COUNT(*) as mutual_count FROM DepartmentUsers d1 JOIN DepartmentUsers d2 ON d1.department_id = d2.department_id AND d1.user_id < d2.user_id JOIN follows f1 ON d1.user_id = f1.follower_id JOIN follows f2 ON d2.user_id = f2.follower_id AND f1.following_id = f2.following_id LEFT JOIN follows direct ON d1.user_id = direct.follower_id AND d2.user_id = direct.following_id WHERE direct.follower_id IS NULL GROUP BY d1.user_id, d2.user_id HAVING COUNT(*) >= 2) SELECT * FROM MutualConnections;",
    hint: "This is a complex graph query requiring multiple joins on the follows table.",
    interview_company: "LinkedIn"
  },

  // TWITTER Interview Questions
  {
    id: 220,
    title: "Viral Content Detection",
    description: "Identify trending content",
    dataset: "social",
    difficulty: "medium",
    category: "ANALYTICS",
    question: "Find posts that have a shares-to-likes ratio greater than 0.5 (considered viral).",
    expectedQuery: "SELECT id, content, likes_count, shares_count, ROUND(shares_count * 1.0 / NULLIF(likes_count, 0), 2) as shares_to_likes_ratio FROM posts WHERE shares_count * 1.0 / NULLIF(likes_count, 0) > 0.5;",
    hint: "Handle division by zero using NULLIF.",
    interview_company: "Twitter"
  },

  // SPOTIFY Interview Questions
  {
    id: 221,
    title: "User Listening Patterns",
    description: "Analyze user music listening behavior",
    dataset: "analytics",
    difficulty: "hard",
    category: "WINDOW",
    question: "Find users who listened for more than 60 minutes in a single day.",
    expectedQuery: "SELECT user_id, DATE(event_timestamp) as listen_date, SUM(avg_session_duration) as total_listen_minutes FROM user_events u JOIN website_traffic w ON DATE(u.event_timestamp) = w.date WHERE event_type = 'play' GROUP BY user_id, DATE(event_timestamp) HAVING SUM(avg_session_duration) > 60;",
    hint: "Group by user and date, then filter with HAVING.",
    interview_company: "Spotify"
  },

  // SALESFORCE Interview Questions
  {
    id: 222,
    title: "Sales Pipeline Analysis",
    description: "Analyze sales conversion rates",
    dataset: "crm",
    difficulty: "medium",
    category: "ANALYTICS",
    question: "Calculate conversion rate from lead to opportunity for each source.",
    expectedQuery: "SELECT source, COUNT(*) as total_leads, SUM(CASE WHEN status = 'qualified' THEN 1 ELSE 0 END) as qualified_leads, ROUND(SUM(CASE WHEN status = 'qualified' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) as conversion_rate FROM leads GROUP BY source;",
    hint: "Use CASE statement to count qualified leads and calculate percentage.",
    interview_company: "Salesforce"
  },

  // ORACLE Interview Questions
  {
    id: 223,
    title: "Hierarchical Employee Data",
    description: "Query organizational hierarchy",
    dataset: "employees",
    difficulty: "hard",
    category: "RECURSIVE",
    question: "Display the complete management hierarchy for all employees.",
    expectedQuery: "WITH RECURSIVE EmployeeHierarchy AS (SELECT id, name, manager_id, 0 as level, name as hierarchy_path FROM employees WHERE manager_id IS NULL UNION ALL SELECT e.id, e.name, e.manager_id, eh.level + 1, eh.hierarchy_path || ' -> ' || e.name FROM employees e JOIN EmployeeHierarchy eh ON e.manager_id = eh.id) SELECT * FROM EmployeeHierarchy ORDER BY level, name;",
    hint: "Use recursive CTE to traverse the management hierarchy.",
    interview_company: "Oracle"
  },

  // INTEL Interview Questions
  {
    id: 224,
    title: "Manufacturing Defect Analysis",
    description: "Analyze production quality",
    dataset: "manufacturing",
    difficulty: "medium",
    category: "ANALYTICS",
    question: "Find production lines with defect rates above 5%.",
    expectedQuery: "SELECT pl.line_name, SUM(qc.total_checked) as total_units, SUM(qc.defect_count) as total_defects, ROUND(SUM(qc.defect_count) * 100.0 / SUM(qc.total_checked), 2) as defect_rate FROM production_lines pl JOIN work_orders w ON pl.line_name = w.assigned_line JOIN quality_checks qc ON w.id = qc.work_order_id GROUP BY pl.line_name HAVING ROUND(SUM(qc.defect_count) * 100.0 / SUM(qc.total_checked), 2) > 5;",
    hint: "Calculate defect rate and filter with HAVING clause.",
    interview_company: "Intel"
  },

  // PAYPAL Interview Questions
  {
    id: 225,
    title: "Fraud Detection Patterns",
    description: "Identify suspicious transactions",
    dataset: "banking",
    difficulty: "hard",
    category: "ANALYTICS",
    question: "Find accounts with multiple large withdrawals (> $5000) within 24 hours.",
    expectedQuery: "WITH LargeWithdrawals AS (SELECT account_id, transaction_date, amount FROM transactions WHERE transaction_type = 'withdrawal' AND amount > 5000), SuspiciousActivity AS (SELECT a1.account_id, a1.transaction_date as first_withdrawal, a2.transaction_date as second_withdrawal, a1.amount as first_amount, a2.amount as second_amount FROM LargeWithdrawals a1 JOIN LargeWithdrawals a2 ON a1.account_id = a2.account_id AND a1.transaction_date < a2.transaction_date AND julianday(a2.transaction_date) - julianday(a1.transaction_date) <= 1) SELECT account_id, COUNT(*) as suspicious_events FROM SuspiciousActivity GROUP BY account_id HAVING COUNT(*) >= 2;",
    hint: "Self-join the transactions table with date range condition.",
    interview_company: "PayPal"
  },

  // Additional Real Interview Questions
  {
    id: 226,
    title: "Trips and Users",
    description: "Cancellation rate by user type",
    dataset: "logistics",
    difficulty: "hard",
    category: "ANALYTICS",
    question: "Calculate cancellation rate for each carrier, but only for shipments that were scheduled in the last 30 days.",
    expectedQuery: "SELECT c.name, COUNT(*) as total_shipments, SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled_count, ROUND(SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) as cancellation_rate FROM carriers c JOIN shipments s ON c.id = s.carrier_id WHERE s.ship_date >= DATE('now', '-30 days') GROUP BY c.name;",
    hint: "Filter by date range before calculating rates.",
    interview_company: "Uber"
  },
  {
    id: 227,
    title: "Market Basket Analysis",
    description: "Find frequently bought together products",
    dataset: "ecommerce",
    difficulty: "hard",
    category: "SELF_JOIN",
    question: "Find pairs of products that are frequently ordered together.",
    expectedQuery: "SELECT p1.name as product1, p2.name as product2, COUNT(*) as times_ordered_together FROM order_items oi1 JOIN order_items oi2 ON oi1.order_id = oi2.order_id AND oi1.product_id < oi2.product_id JOIN products p1 ON oi1.product_id = p1.id JOIN products p2 ON oi2.product_id = p2.id GROUP BY p1.name, p2.name HAVING COUNT(*) >= 2 ORDER BY times_ordered_together DESC;",
    hint: "Self-join order_items on order_id and ensure product1 < product2 to avoid duplicates.",
    interview_company: "Amazon"
  },
  {
    id: 228,
    title: "Employee Tenure Analysis",
    description: "Calculate average tenure by department",
    dataset: "employees",
    difficulty: "medium",
    category: "ANALYTICS",
    question: "Calculate the average tenure (in years) of employees in each department.",
    expectedQuery: "SELECT d.name as department, ROUND(AVG((julianday('now') - julianday(hire_date)) / 365.25), 2) as avg_tenure_years FROM employees e JOIN departments d ON e.department_id = d.id GROUP BY d.name;",
    hint: "Use date arithmetic to calculate tenure in years.",
    interview_company: "Microsoft"
  },
  {
    id: 229,
    title: "Customer Cohort Analysis",
    description: "Monthly cohort retention analysis",
    dataset: "ecommerce",
    difficulty: "hard",
    category: "ANALYTICS",
    question: "Perform cohort analysis to see how many customers return each month after their first purchase.",
    expectedQuery: "WITH FirstPurchases AS (SELECT customer_id, MIN(order_date) as first_purchase_month FROM orders GROUP BY customer_id), MonthlyActivity AS (SELECT fp.customer_id, fp.first_purchase_month, strftime('%Y-%m', o.order_date) as activity_month FROM FirstPurchases fp JOIN orders o ON fp.customer_id = o.customer_id) SELECT first_purchase_month, activity_month, COUNT(DISTINCT customer_id) as active_customers FROM MonthlyActivity GROUP BY first_purchase_month, activity_month ORDER BY first_purchase_month, activity_month;",
    hint: "Use two CTEs - one for first purchases, one for monthly activity.",
    interview_company: "Facebook"
  },
  {
    id: 230,
    title: "Gap Analysis in Sequences",
    description: "Find missing numbers in sequence",
    dataset: "employees",
    difficulty: "hard",
    category: "ANALYTICS",
    question: "Find missing employee IDs in the sequence (gaps in ID numbers).",
    expectedQuery: "WITH IDSequence AS (SELECT id, LEAD(id) OVER (ORDER BY id) as next_id FROM employees) SELECT id + 1 as gap_start, next_id - 1 as gap_end FROM IDSequence WHERE next_id - id > 1;",
    hint: "Use LEAD window function to find gaps between consecutive IDs.",
    interview_company: "Google"
  }
];

export default { sqlDatasets, sqlQuestions };
