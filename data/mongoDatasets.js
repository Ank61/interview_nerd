export const mongoDatasets = {
  ecommerce: {
    name: "E-commerce Platform",
    description: "Online store with products, users, orders, and reviews",
    collections: {
      products: [
        {
          _id: "64a1b2c3d4e5f6789012345a",
          name: "Wireless Headphones",
          category: "Electronics",
          brand: "AudioTech",
          price: 99.99,
          stock: 150,
          rating: 4.5,
          reviews: 324,
          tags: ["wireless", "bluetooth", "noise-cancelling"],
          specifications: {
            color: "Black",
            weight: "250g",
            batteryLife: "30 hours",
          },
          createdAt: new Date("2023-01-15"),
          updatedAt: new Date("2023-12-01"),
        },
        {
          _id: "64a1b2c3d4e5f6789012345b",
          name: "Gaming Laptop",
          category: "Electronics",
          brand: "GameMax",
          price: 1299.99,
          stock: 25,
          rating: 4.8,
          reviews: 156,
          tags: ["gaming", "laptop", "high-performance"],
          specifications: {
            color: "Black",
            weight: "2.5kg",
            processor: "Intel i7",
            ram: "16GB",
            storage: "512GB SSD",
          },
          createdAt: new Date("2023-02-20"),
          updatedAt: new Date("2023-11-15"),
        },
        {
          _id: "64a1b2c3d4e5f6789012345c",
          name: "Coffee Maker",
          category: "Home & Kitchen",
          brand: "BrewMaster",
          price: 79.99,
          stock: 85,
          rating: 4.2,
          reviews: 89,
          tags: ["coffee", "kitchen", "appliance"],
          specifications: {
            color: "Silver",
            capacity: "12 cups",
            type: "Drip",
          },
          createdAt: new Date("2023-03-10"),
          updatedAt: new Date("2023-10-20"),
        },
        {
          _id: "64a1b2c3d4e5f6789012345d",
          name: "Running Shoes",
          category: "Sports",
          brand: "RunFast",
          price: 129.99,
          stock: 200,
          rating: 4.6,
          reviews: 445,
          tags: ["running", "shoes", "athletic"],
          specifications: {
            color: "Blue",
            size: "Various",
            material: "Mesh",
          },
          createdAt: new Date("2023-04-05"),
          updatedAt: new Date("2023-12-10"),
        },
      ],
      users: [
        {
          _id: "64a1b2c3d4e5f6789012346a",
          username: "john_doe",
          email: "john@example.com",
          firstName: "John",
          lastName: "Doe",
          age: 28,
          address: {
            street: "123 Main St",
            city: "New York",
            state: "NY",
            zipCode: "10001",
            country: "USA",
          },
          preferences: {
            categories: ["Electronics", "Sports"],
            notifications: true,
            newsletter: true,
          },
          joinDate: new Date("2022-06-15"),
          lastLogin: new Date("2023-12-15"),
        },
        {
          _id: "64a1b2c3d4e5f6789012346b",
          username: "jane_smith",
          email: "jane@example.com",
          firstName: "Jane",
          lastName: "Smith",
          age: 32,
          address: {
            street: "456 Oak Ave",
            city: "Los Angeles",
            state: "CA",
            zipCode: "90210",
            country: "USA",
          },
          preferences: {
            categories: ["Home & Kitchen", "Electronics"],
            notifications: false,
            newsletter: true,
          },
          joinDate: new Date("2021-03-20"),
          lastLogin: new Date("2023-12-14"),
        },
        {
          _id: "64a1b2c3d4e5f6789012346c",
          username: "mike_wilson",
          email: "mike@example.com",
          firstName: "Mike",
          lastName: "Wilson",
          age: 25,
          address: {
            street: "789 Pine Rd",
            city: "Chicago",
            state: "IL",
            zipCode: "60601",
            country: "USA",
          },
          preferences: {
            categories: ["Sports", "Electronics"],
            notifications: true,
            newsletter: false,
          },
          joinDate: new Date("2023-01-10"),
          lastLogin: new Date("2023-12-16"),
        },
      ],
      orders: [
        {
          _id: "64a1b2c3d4e5f6789012347a",
          userId: "64a1b2c3d4e5f6789012346a",
          orderNumber: "ORD-2023-001",
          items: [
            {
              productId: "64a1b2c3d4e5f6789012345a",
              productName: "Wireless Headphones",
              quantity: 1,
              price: 99.99,
            },
            {
              productId: "64a1b2c3d4e5f6789012345d",
              productName: "Running Shoes",
              quantity: 1,
              price: 129.99,
            },
          ],
          totalAmount: 229.98,
          status: "delivered",
          shippingAddress: {
            street: "123 Main St",
            city: "New York",
            state: "NY",
            zipCode: "10001",
            country: "USA",
          },
          orderDate: new Date("2023-11-01"),
          deliveryDate: new Date("2023-11-05"),
        },
        {
          _id: "64a1b2c3d4e5f6789012347b",
          userId: "64a1b2c3d4e5f6789012346b",
          orderNumber: "ORD-2023-002",
          items: [
            {
              productId: "64a1b2c3d4e5f6789012345c",
              productName: "Coffee Maker",
              quantity: 1,
              price: 79.99,
            },
          ],
          totalAmount: 79.99,
          status: "shipped",
          shippingAddress: {
            street: "456 Oak Ave",
            city: "Los Angeles",
            state: "CA",
            zipCode: "90210",
            country: "USA",
          },
          orderDate: new Date("2023-12-10"),
          deliveryDate: null,
        },
        {
          _id: "64a1b2c3d4e5f6789012347c",
          userId: "64a1b2c3d4e5f6789012346c",
          orderNumber: "ORD-2023-003",
          items: [
            {
              productId: "64a1b2c3d4e5f6789012345b",
              productName: "Gaming Laptop",
              quantity: 1,
              price: 1299.99,
            },
          ],
          totalAmount: 1299.99,
          status: "processing",
          shippingAddress: {
            street: "789 Pine Rd",
            city: "Chicago",
            state: "IL",
            zipCode: "60601",
            country: "USA",
          },
          orderDate: new Date("2023-12-15"),
          deliveryDate: null,
        },
      ],
      reviews: [
        {
          _id: "64a1b2c3d4e5f6789012348a",
          productId: "64a1b2c3d4e5f6789012345a",
          userId: "64a1b2c3d4e5f6789012346a",
          rating: 5,
          title: "Excellent sound quality!",
          comment:
            "These headphones have amazing sound quality and the battery life is fantastic.",
          helpful: 15,
          reviewDate: new Date("2023-11-10"),
        },
        {
          _id: "64a1b2c3d4e5f6789012348b",
          productId: "64a1b2c3d4e5f6789012345a",
          userId: "64a1b2c3d4e5f6789012346b",
          rating: 4,
          title: "Good but could be better",
          comment:
            "Sound is good but the fit could be more comfortable for long sessions.",
          helpful: 8,
          reviewDate: new Date("2023-10-25"),
        },
        {
          _id: "64a1b2c3d4e5f6789012348c",
          productId: "64a1b2c3d4e5f6789012345d",
          userId: "64a1b2c3d4e5f6789012346a",
          rating: 5,
          title: "Perfect for running!",
          comment:
            "Very comfortable and great support. Highly recommend for runners.",
          helpful: 22,
          reviewDate: new Date("2023-11-12"),
        },
      ],
      inventory: [
        {
          _id: "64a1b2c3d4e5f6789012350a",
          productId: "64a1b2c3d4e5f6789012345a",
          warehouse: "NYC-01",
          quantity: 150,
          lastRestocked: new Date("2023-12-01"),
          location: {
            type: "Point",
            coordinates: [-74.006, 40.7128] // NYC coordinates
          }
        },
        {
          _id: "64a1b2c3d4e5f6789012350b",
          productId: "64a1b2c3d4e5f6789012345b",
          warehouse: "LA-02",
          quantity: 25,
          lastRestocked: new Date("2023-11-15"),
          location: {
            type: "Point",
            coordinates: [-118.2437, 34.0522] // LA coordinates
          }
        },
        {
          _id: "64a1b2c3d4e5f6789012350c",
          productId: "64a1b2c3d4e5f6789012345c",
          warehouse: "CHI-03",
          quantity: 85,
          lastRestocked: new Date("2023-10-20"),
          location: {
            type: "Point",
            coordinates: [-87.6298, 41.8781] // Chicago coordinates
          }
        },
        {
          _id: "64a1b2c3d4e5f6789012350d",
          productId: "64a1b2c3d4e5f6789012345d",
          warehouse: "NYC-01",
          quantity: 200,
          lastRestocked: new Date("2023-12-10"),
          location: {
            type: "Point",
            coordinates: [-74.006, 40.7128]
          }
        }
      ],
      promotions: [
        {
          _id: "64a1b2c3d4e5f6789012351a",
          code: "WELCOME10",
          discountPercent: 10,
          validFrom: new Date("2023-01-01"),
          validUntil: new Date("2024-12-31"),
          usageCount: 1250,
          maxUsage: 10000,
          categories: ["Electronics", "Sports"],
          active: true
        },
        {
          _id: "64a1b2c3d4e5f6789012351b",
          code: "SUMMER25",
          discountPercent: 25,
          validFrom: new Date("2023-06-01"),
          validUntil: new Date("2023-08-31"),
          usageCount: 580,
          maxUsage: 1000,
          categories: ["Sports"],
          active: false
        },
        {
          _id: "64a1b2c3d4e5f6789012351c",
          code: "NEWYEAR50",
          discountPercent: 50,
          validFrom: new Date("2024-01-01"),
          validUntil: new Date("2024-01-15"),
          usageCount: 3200,
          maxUsage: 5000,
          categories: ["Electronics", "Home & Kitchen", "Sports"],
          active: false
        }
      ],
      transactions: [
        {
          _id: "64a1b2c3d4e5f6789012354a",
          userId: "64a1b2c3d4e5f6789012346a",
          orderId: "64a1b2c3d4e5f6789012347a",
          amount: 229.98,
          paymentMethod: "credit_card",
          status: "completed",
          transactionDate: new Date("2023-11-01T10:30:00"),
          refundAmount: 0,
          processingFee: 6.90
        },
        {
          _id: "64a1b2c3d4e5f6789012354b",
          userId: "64a1b2c3d4e5f6789012346b",
          orderId: "64a1b2c3d4e5f6789012347b",
          amount: 79.99,
          paymentMethod: "paypal",
          status: "completed",
          transactionDate: new Date("2023-12-10T14:20:00"),
          refundAmount: 0,
          processingFee: 2.40
        },
        {
          _id: "64a1b2c3d4e5f6789012354c",
          userId: "64a1b2c3d4e5f6789012346a",
          orderId: "64a1b2c3d4e5f6789012347a",
          amount: 50.00,
          paymentMethod: "credit_card",
          status: "refunded",
          transactionDate: new Date("2023-11-08T16:45:00"),
          refundAmount: 50.00,
          processingFee: 1.50
        }
      ],
    },
  },
  social: {
    name: "Social Media Platform",
    description: "Social network with users, posts, comments, and follows",
    collections: {
      users: [
        {
          _id: "64a1b2c3d4e5f6789012349a",
          username: "alex_photographer",
          email: "alex@photo.com",
          displayName: "Alex Johnson",
          bio: "Professional photographer capturing life's moments",
          avatar: "https://example.com/avatars/alex.jpg",
          followers: 1250,
          following: 340,
          verified: true,
          location: "San Francisco, CA",
          website: "https://alexjohnson.photography",
          joinDate: new Date("2021-08-15"),
          lastActive: new Date("2023-12-16"),
        },
        {
          _id: "64a1b2c3d4e5f6789012349b",
          username: "sarah_writer",
          email: "sarah@writer.com",
          displayName: "Sarah Chen",
          bio: "Writer, blogger, and coffee enthusiast ☕",
          avatar: "https://example.com/avatars/sarah.jpg",
          followers: 890,
          following: 520,
          verified: false,
          location: "Portland, OR",
          website: "https://sarahwrites.blog",
          joinDate: new Date("2022-02-10"),
          lastActive: new Date("2023-12-15"),
        },
        {
          _id: "64a1b2c3d4e5f6789012349c",
          username: "tech_guru",
          email: "guru@tech.com",
          displayName: "David Kumar",
          bio: "Full-stack developer | Tech enthusiast | Open source contributor",
          avatar: "https://example.com/avatars/david.jpg",
          followers: 2100,
          following: 180,
          verified: true,
          location: "Austin, TX",
          website: "https://davidkumar.dev",
          joinDate: new Date("2020-11-05"),
          lastActive: new Date("2023-12-16"),
        },
      ],
      posts: [
        {
          _id: "64a1b2c3d4e5f678901234aa",
          userId: "64a1b2c3d4e5f6789012349a",
          content:
            "Just captured this amazing sunset at Golden Gate Bridge! 🌅 #photography #sunset #goldengatebridge",
          images: ["https://example.com/posts/sunset1.jpg"],
          hashtags: ["photography", "sunset", "goldengatebridge"],
          mentions: [],
          likes: 245,
          comments: 18,
          shares: 12,
          createdAt: new Date("2023-12-15T18:30:00"),
          updatedAt: new Date("2023-12-15T18:30:00"),
        },
        {
          _id: "64a1b2c3d4e5f678901234ab",
          userId: "64a1b2c3d4e5f6789012349b",
          content:
            "New blog post is live! 'The Art of Minimalist Writing' - check it out on my website. What are your thoughts on minimalism in writing? 📝",
          images: [],
          hashtags: ["writing", "blog", "minimalism"],
          mentions: [],
          likes: 89,
          comments: 7,
          shares: 5,
          createdAt: new Date("2023-12-14T10:15:00"),
          updatedAt: new Date("2023-12-14T10:15:00"),
        },
        {
          _id: "64a1b2c3d4e5f678901234ac",
          userId: "64a1b2c3d4e5f6789012349c",
          content:
            "Working on a new React project with TypeScript. The type safety is incredible! 💻 Anyone else loving the TS + React combo?",
          images: [],
          hashtags: ["react", "typescript", "webdev", "coding"],
          mentions: [],
          likes: 156,
          comments: 23,
          shares: 8,
          createdAt: new Date("2023-12-13T14:45:00"),
          updatedAt: new Date("2023-12-13T14:45:00"),
        },
      ],
      comments: [
        {
          _id: "64a1b2c3d4e5f678901234ba",
          postId: "64a1b2c3d4e5f678901234aa",
          userId: "64a1b2c3d4e5f6789012349b",
          content: "Absolutely stunning! The colors are incredible 😍",
          likes: 12,
          replies: [],
          createdAt: new Date("2023-12-15T19:15:00"),
        },
        {
          _id: "64a1b2c3d4e5f678901234bb",
          postId: "64a1b2c3d4e5f678901234aa",
          userId: "64a1b2c3d4e5f6789012349c",
          content: "Great shot! What camera did you use?",
          likes: 5,
          replies: [
            {
              _id: "64a1b2c3d4e5f678901234bc",
              userId: "64a1b2c3d4e5f6789012349a",
              content: "Thanks! Shot with Canon EOS R5 📸",
              likes: 3,
              createdAt: new Date("2023-12-15T20:00:00"),
            },
          ],
          createdAt: new Date("2023-12-15T19:45:00"),
        },
        {
          _id: "64a1b2c3d4e5f678901234bd",
          postId: "64a1b2c3d4e5f678901234ac",
          userId: "64a1b2c3d4e5f6789012349b",
          content:
            "Yes! TypeScript has been a game changer for my projects too",
          likes: 8,
          replies: [],
          createdAt: new Date("2023-12-13T15:30:00"),
        },
      ],
      follows: [
        {
          _id: "64a1b2c3d4e5f678901234ca",
          followerId: "64a1b2c3d4e5f6789012349b",
          followingId: "64a1b2c3d4e5f6789012349a",
          followDate: new Date("2022-05-20"),
        },
        {
          _id: "64a1b2c3d4e5f678901234cb",
          followerId: "64a1b2c3d4e5f6789012349c",
          followingId: "64a1b2c3d4e5f6789012349a",
          followDate: new Date("2021-12-10"),
        },
        {
          _id: "64a1b2c3d4e5f678901234cc",
          followerId: "64a1b2c3d4e5f6789012349a",
          followingId: "64a1b2c3d4e5f6789012349c",
          followDate: new Date("2022-01-15"),
        },
      ],
      notifications: [
        {
          _id: "64a1b2c3d4e5f6789012355a",
          userId: "64a1b2c3d4e5f6789012349a",
          type: "like",
          content: "sarah_writer liked your post",
          relatedId: "64a1b2c3d4e5f678901234aa",
          read: true,
          createdAt: new Date("2023-12-15T19:00:00"),
          expiresAt: new Date("2024-01-15T19:00:00")
        },
        {
          _id: "64a1b2c3d4e5f6789012355b",
          userId: "64a1b2c3d4e5f6789012349b",
          type: "follow",
          content: "tech_guru started following you",
          relatedId: "64a1b2c3d4e5f6789012349c",
          read: false,
          createdAt: new Date("2023-12-16T10:30:00"),
          expiresAt: new Date("2024-01-16T10:30:00")
        },
        {
          _id: "64a1b2c3d4e5f6789012355c",
          userId: "64a1b2c3d4e5f6789012349c",
          type: "comment",
          content: "alex_photographer commented on your post",
          relatedId: "64a1b2c3d4e5f678901234ac",
          read: false,
          createdAt: new Date("2023-12-16T11:00:00"),
          expiresAt: new Date("2024-01-16T11:00:00")
        }
      ],
    },
  },
  analytics: {
    name: "Web Analytics",
    description: "Website analytics with sessions, events, and user behavior",
    collections: {
      sessions: [
        {
          _id: "64a1b2c3d4e5f678901234da",
          sessionId: "sess_2023121601",
          userId: "user_12345",
          startTime: new Date("2023-12-16T09:00:00"),
          endTime: new Date("2023-12-16T09:45:00"),
          duration: 2700, // seconds
          pageViews: 8,
          bounceRate: false,
          device: {
            type: "desktop",
            os: "Windows",
            browser: "Chrome",
            screenResolution: "1920x1080",
          },
          location: {
            country: "USA",
            state: "California",
            city: "San Francisco",
            ip: "192.168.1.100",
          },
          referrer: "https://google.com",
          landingPage: "/home",
          exitPage: "/checkout",
        },
        {
          _id: "64a1b2c3d4e5f678901234db",
          sessionId: "sess_2023121602",
          userId: "user_67890",
          startTime: new Date("2023-12-16T10:30:00"),
          endTime: new Date("2023-12-16T10:35:00"),
          duration: 300,
          pageViews: 2,
          bounceRate: true,
          device: {
            type: "mobile",
            os: "iOS",
            browser: "Safari",
            screenResolution: "375x812",
          },
          location: {
            country: "Canada",
            state: "Ontario",
            city: "Toronto",
            ip: "192.168.1.101",
          },
          referrer: "https://facebook.com",
          landingPage: "/products",
          exitPage: "/products",
        },
        {
          _id: "64a1b2c3d4e5f678901234dc",
          sessionId: "sess_2023121603",
          userId: "user_11111",
          startTime: new Date("2023-12-16T14:15:00"),
          endTime: new Date("2023-12-16T15:00:00"),
          duration: 2700,
          pageViews: 12,
          bounceRate: false,
          device: {
            type: "tablet",
            os: "Android",
            browser: "Chrome",
            screenResolution: "768x1024",
          },
          location: {
            country: "UK",
            state: "England",
            city: "London",
            ip: "192.168.1.102",
          },
          referrer: "direct",
          landingPage: "/blog",
          exitPage: "/contact",
        },
      ],
      events: [
        {
          _id: "64a1b2c3d4e5f678901234ea",
          sessionId: "sess_2023121601",
          eventType: "click",
          eventName: "button_click",
          element: "add_to_cart",
          page: "/products/headphones",
          timestamp: new Date("2023-12-16T09:15:00"),
          properties: {
            productId: "64a1b2c3d4e5f6789012345a",
            productName: "Wireless Headphones",
            price: 99.99,
            category: "Electronics",
          },
        },
        {
          _id: "64a1b2c3d4e5f678901234eb",
          sessionId: "sess_2023121601",
          eventType: "form_submit",
          eventName: "newsletter_signup",
          element: "newsletter_form",
          page: "/home",
          timestamp: new Date("2023-12-16T09:30:00"),
          properties: {
            email: "user@example.com",
            source: "homepage_footer",
          },
        },
        {
          _id: "64a1b2c3d4e5f678901234ec",
          sessionId: "sess_2023121603",
          eventType: "scroll",
          eventName: "page_scroll",
          element: "page_body",
          page: "/blog/mongodb-tips",
          timestamp: new Date("2023-12-16T14:25:00"),
          properties: {
            scrollDepth: 75,
            timeOnPage: 600,
          },
        },
      ],
      pageViews: [
        {
          _id: "64a1b2c3d4e5f678901234fa",
          sessionId: "sess_2023121601",
          page: "/home",
          title: "Home - E-commerce Store",
          timestamp: new Date("2023-12-16T09:00:00"),
          loadTime: 1.2,
          exitTime: new Date("2023-12-16T09:05:00"),
          timeOnPage: 300,
        },
        {
          _id: "64a1b2c3d4e5f678901234fb",
          sessionId: "sess_2023121601",
          page: "/products",
          title: "Products - E-commerce Store",
          timestamp: new Date("2023-12-16T09:05:00"),
          loadTime: 0.8,
          exitTime: new Date("2023-12-16T09:15:00"),
          timeOnPage: 600,
        },
        {
          _id: "64a1b2c3d4e5f678901234fc",
          sessionId: "sess_2023121602",
          page: "/products",
          title: "Products - E-commerce Store",
          timestamp: new Date("2023-12-16T10:30:00"),
          loadTime: 2.1,
          exitTime: new Date("2023-12-16T10:35:00"),
          timeOnPage: 300,
        },
      ]
    },
  },
  logistics: {
    name: "Logistics & Delivery",
    description: "Delivery tracking, drivers, and shipments",
    collections: {
      shipments: [
        {
          _id: "64a1b2c3d4e5f6789012352a",
          orderId: "64a1b2c3d4e5f6789012347a",
          trackingNumber: "TRK-2023-001",
          carrier: "FastShip",
          status: "delivered",
          weight: 1.5,
          dimensions: { length: 30, width: 20, height: 15 },
          origin: {
            type: "Point",
            coordinates: [-74.006, 40.7128],
            address: "Warehouse NYC-01"
          },
          destination: {
            type: "Point",
            coordinates: [-73.9857, 40.7484],
            address: "123 Main St, New York, NY"
          },
          shippedDate: new Date("2023-11-01T10:00:00"),
          deliveredDate: new Date("2023-11-05T14:30:00"),
          estimatedDelivery: new Date("2023-11-06"),
          cost: 12.50
        },
        {
          _id: "64a1b2c3d4e5f6789012352b",
          orderId: "64a1b2c3d4e5f6789012347b",
          trackingNumber: "TRK-2023-002",
          carrier: "QuickDeliver",
          status: "in_transit",
          weight: 2.3,
          dimensions: { length: 25, width: 25, height: 20 },
          origin: {
            type: "Point",
            coordinates: [-87.6298, 41.8781],
            address: "Warehouse CHI-03"
          },
          destination: {
            type: "Point",
            coordinates: [-118.2437, 34.0522],
            address: "456 Oak Ave, Los Angeles, CA"
          },
          shippedDate: new Date("2023-12-10T08:00:00"),
          deliveredDate: null,
          estimatedDelivery: new Date("2023-12-14"),
          cost: 18.75
        },
        {
          _id: "64a1b2c3d4e5f6789012352c",
          orderId: "64a1b2c3d4e5f6789012347c",
          trackingNumber: "TRK-2023-003",
          carrier: "FastShip",
          status: "processing",
          weight: 3.8,
          dimensions: { length: 45, width: 35, height: 10 },
          origin: {
            type: "Point",
            coordinates: [-118.2437, 34.0522],
            address: "Warehouse LA-02"
          },
          destination: {
            type: "Point",
            coordinates: [-87.6298, 41.8781],
            address: "789 Pine Rd, Chicago, IL"
          },
          shippedDate: null,
          deliveredDate: null,
          estimatedDelivery: new Date("2023-12-20"),
          cost: 25.00
        }
      ],
      drivers: [
        {
          _id: "64a1b2c3d4e5f6789012353a",
          name: "Robert Johnson",
          email: "robert@fastship.com",
          phone: "+1-555-0101",
          carrier: "FastShip",
          vehicleType: "Van",
          licenseNumber: "DL-12345",
          rating: 4.8,
          totalDeliveries: 1250,
          currentLocation: {
            type: "Point",
            coordinates: [-74.006, 40.7128]
          },
          status: "available",
          joinDate: new Date("2021-03-15")
        },
        {
          _id: "64a1b2c3d4e5f6789012353b",
          name: "Maria Garcia",
          email: "maria@quickdeliver.com",
          phone: "+1-555-0102",
          carrier: "QuickDeliver",
          vehicleType: "Truck",
          licenseNumber: "DL-67890",
          rating: 4.9,
          totalDeliveries: 2100,
          currentLocation: {
            type: "Point",
            coordinates: [-118.2437, 34.0522]
          },
          status: "on_delivery",
          joinDate: new Date("2020-06-20")
        },
        {
          _id: "64a1b2c3d4e5f6789012353c",
          name: "James Wilson",
          email: "james@fastship.com",
          phone: "+1-555-0103",
          carrier: "FastShip",
          vehicleType: "Van",
          licenseNumber: "DL-11122",
          rating: 4.6,
          totalDeliveries: 890,
          currentLocation: {
            type: "Point",
            coordinates: [-87.6298, 41.8781]
          },
          status: "available",
          joinDate: new Date("2022-01-10")
        }
      ]
    }
  }
};

export const mongoQuestions = {
  beginner: [
    {
      id: 1,
      title: "Find All Products",
      difficulty: "Easy",
      dataset: "ecommerce",
      collection: "products",
      question: "Find all products in the products collection.",
      hint: "Use db.products.find() to retrieve all documents",
      solution: "db.products.find()",
      expectedResult: "All products in the collection",
    },
    {
      id: 2,
      title: "Find Products by Category",
      difficulty: "Easy",
      dataset: "ecommerce",
      collection: "products",
      question: "Find all products in the 'Electronics' category.",
      hint: "Use find() with a query filter for category field",
      solution: 'db.products.find({category: "Electronics"})',
      expectedResult: "Products with category 'Electronics'",
    },
    {
      id: 3,
      title: "Find User by Username",
      difficulty: "Easy",
      dataset: "ecommerce",
      collection: "users",
      question: "Find the user with username 'john_doe'.",
      hint: "Use find() with username field filter",
      solution: 'db.users.find({username: "john_doe"})',
      expectedResult: "User document for john_doe",
    },
    {
      id: 4,
      title: "Count Total Products",
      difficulty: "Easy",
      dataset: "ecommerce",
      collection: "products",
      question: "Count the total number of products.",
      hint: "Use countDocuments() method",
      solution: "db.products.countDocuments()",
      expectedResult: "Total count of products",
    },
    {
      id: 5,
      title: "Find Products Above Price",
      difficulty: "Easy",
      dataset: "ecommerce",
      collection: "products",
      question: "Find all products with price greater than $100.",
      hint: "Use $gt operator for greater than comparison",
      solution: "db.products.find({price: {$gt: 100}})",
      expectedResult: "Products with price > 100",
    },
    {
      id: 12,
      title: "Insert New Product",
      difficulty: "Easy",
      dataset: "ecommerce",
      collection: "products",
      question: "Insert a new product 'Smart Watch' with category 'Electronics', price $199.99, and stock 100.",
      hint: "Use insertOne() method",
      solution: `db.products.insertOne({
  name: "Smart Watch",
  category: "Electronics",
  brand: "TechTime",
  price: 199.99,
  stock: 100,
  reviews: 0,
  tags: ["smart", "watch", "fitness"],
  specifications: { color: "Silver", weight: "50g" },
  createdAt: new Date(),
  updatedAt: new Date()
})`,
      expectedResult: "New product inserted with generated _id"
    },
    {
      id: 13,
      title: "Update Product Stock",
      difficulty: "Easy",
      dataset: "ecommerce",
      collection: "products",
      question: "Increase the stock of 'Wireless Headphones' by 50 units.",
      hint: "Use updateOne() with $inc operator",
      solution: `db.products.updateOne(
  {name: "Wireless Headphones"},
  {$inc: {stock: 50}, $set: {updatedAt: new Date()}}
)`,
      expectedResult: "Stock increased by 50"
    },
    {
      id: 14,
      title: "Delete Old Orders",
      difficulty: "Easy",
      dataset: "ecommerce",
      collection: "orders",
      question: "Delete orders with status 'delivered' that were delivered before November 2023.",
      hint: "Use deleteMany() with date comparison",
      solution: `db.orders.deleteMany({
  status: "delivered",
  deliveryDate: {$lt: new Date("2023-11-01")}
})`,
      expectedResult: "Delivered orders before Nov 2023 deleted"
    },

    {
      id: 15,
      title: "Format User Display Names",
      difficulty: "Medium",
      dataset: "ecommerce",
      collection: "users",
      question: "Create a full name in uppercase by concatenating firstName and lastName for all users.",
      hint: "Use $concat and $toUpper in aggregation",
      solution: `db.users.aggregate([
  {$project: {
    username: 1,
    fullNameUpper: {
      $toUpper: {
        $concat: ["$firstName", " ", "$lastName"]
      }
    }
  }}
])`,
      expectedResult: "Full names in uppercase format"
    },
    {
      id: 16,
      title: "Extract Domain from Email",
      difficulty: "Medium",
      dataset: "social",
      collection: "users",
      question: "Extract the domain name from user email addresses.",
      hint: "Use $split operator to split email by '@' and get second element",
      solution: `db.users.aggregate([
  {$project: {
    username: 1,
    email: 1,
    domain: {
      $arrayElemAt: [{$split: ["$email", "@"]}, 1]
    }
  }}
])`,
      expectedResult: "Email domains extracted"
    },

    {
      id: 17,
      title: "Orders by Month",
      difficulty: "Medium",
      dataset: "ecommerce",
      collection: "orders",
      question: "Group orders by month and year, and count total orders per month.",
      hint: "Use $year and $month operators with $group",
      solution: `db.orders.aggregate([
  {$group: {
    _id: {
      year: {$year: "$orderDate"},
      month: {$month: "$orderDate"}
    },
    totalOrders: {$sum: 1},
    totalRevenue: {$sum: "$totalAmount"}
  }},
  {$sort: {"_id.year": 1, "_id.month": 1}}
])`,
      expectedResult: "Orders grouped by month with counts"
    },
    {
      id: 18,
      title: "User Join Day of Week",
      difficulty: "Medium",
      dataset: "social",
      collection: "users",
      question: "Find which day of the week each user joined (1=Sunday, 7=Saturday).",
      hint: "Use $dayOfWeek operator",
      solution: `db.users.aggregate([
  {$project: {
    username: 1,
    displayName: 1,
    joinDate: 1,
    dayOfWeek: {$dayOfWeek: "$joinDate"}
  }}
])`,
      expectedResult: "Day of week for each user's join date"
    },

    {
      id: 19,
      title: "Calculate Product Profit Margin",
      difficulty: "Medium",
      dataset: "ecommerce",
      collection: "products",
      question: "Calculate a 30% profit margin on each product and show original price, cost (70% of price), and profit.",
      hint: "Use $multiply and $subtract for calculations",
      solution: `db.products.aggregate([
  {$project: {
    name: 1,
    price: 1,
    cost: {$multiply: ["$price", 0.7]},
    profit: {$multiply: ["$price", 0.3]},
    profitMargin: 30
  }}
])`,
      expectedResult: "Products with cost and profit calculations"
    },
    {
      id: 20,
      title: "Promotion Discount Calculator",
      difficulty: "Medium",
      dataset: "ecommerce",
      collection: "promotions",
      question: "Calculate remaining usage capacity and usage percentage for each promotion.",
      hint: "Use $subtract, $divide, and $multiply for percentage",
      solution: `db.promotions.aggregate([
  {$project: {
    code: 1,
    discountPercent: 1,
    usageCount: 1,
    maxUsage: 1,
    remainingUsage: {$subtract: ["$maxUsage", "$usageCount"]},
    usagePercent: {
      $multiply: [
        {$divide: ["$usageCount", "$maxUsage"]},
        100
      ]
    }
  }}
])`,
      expectedResult: "Promotions with remaining capacity and percentages"
    }
  ],
  expert: [
    {
      id: 21,
      title: "Product Stock Status",
      difficulty: "Hard",
      dataset: "ecommerce",
      collection: "products",
      question: "Add a status field: 'Out of Stock' if stock is 0, 'Low Stock' if stock < 50, otherwise 'In Stock'.",
      hint: "Use $cond or $switch operator",
      solution: `db.products.aggregate([
  {$project: {
    name: 1,
    stock: 1,
    stockStatus: {
      $switch: {
        branches: [
          {case: {$eq: ["$stock", 0]}, then: "Out of Stock"},
          {case: {$lt: ["$stock", 50]}, then: "Low Stock"}
        ],
        default: "In Stock"
      }
    }
  }}
])`,
      expectedResult: "Products with stock status labels"
    },
    {
      id: 22,
      title: "Order Delivery Performance",
      difficulty: "Hard",
      dataset: "ecommerce",
      collection: "orders",
      question: "Calculate days to delivery and mark as 'Fast' (<3 days), 'Normal' (3-5 days), or 'Slow' (>5 days). Handle null deliveryDate.",
      hint: "Use $cond, $ifNull, and date subtraction",
      solution: `db.orders.aggregate([
  {$project: {
    orderNumber: 1,
    orderDate: 1,
    deliveryDate: 1,
    daysToDeliver: {
      $cond: {
        if: {$ne: ["$deliveryDate", null]},
        then: {
          $divide: [
            {$subtract: ["$deliveryDate", "$orderDate"]},
            1000 * 60 * 60 * 24
          ]
        },
        else: null
      }
    }
  }},
  {$addFields: {
    deliverySpeed: {
      $switch: {
        branches: [
          {case: {$eq: ["$daysToDeliver", null]}, then: "Pending"},
          {case: {$lt: ["$daysToDeliver", 3]}, then: "Fast"},
          {case: {$lte: ["$daysToDeliver", 5]}, then: "Normal"}
        ],
        default: "Slow"
      }
    }
  }}
])`,
      expectedResult: "Orders with delivery performance metrics"
    },
    {
      id: 23,
      title: "Filter Product Tags",
      difficulty: "Hard",
      dataset: "ecommerce",
      collection: "products",
      question: "Filter product tags to only include tags that start with 'w' or contain 'performance'.",
      hint: "Use $filter and $regexMatch",
      solution: `db.products.aggregate([
  {$project: {
    name: 1,
    tags: 1,
    filteredTags: {
      $filter: {
        input: "$tags",
        as: "tag",
        cond: {
          $or: [
            {$regexMatch: {input: "$$tag", regex: "^w", options: "i"}},
            {$regexMatch: {input: "$$tag", regex: "performance", options: "i"}}
          ]
        }
      }
    }
  }}
])`,
      expectedResult: "Products with filtered tags"
    },
    {
      id: 24,
      title: "Transform Hashtags to Uppercase",
      difficulty: "Hard",
      dataset: "social",
      collection: "posts",
      question: "Convert all hashtags in posts to uppercase using array transformation.",
      hint: "Use $map and $toUpper",
      solution: `db.posts.aggregate([
  {$project: {
    content: 1,
    hashtags: 1,
    hashtagsUpper: {
      $map: {
        input: "$hashtags",
        as: "tag",
        in: {$toUpper: "$$tag"}
      }
    }
  }}
])`,
      expectedResult: "Posts with uppercase hashtags"
    },
    {
      id: 25,
      title: "Calculate Order Item Totals",
      difficulty: "Hard",
      dataset: "ecommerce",
      collection: "orders",
      question: "For each order, calculate the total for each item (price * quantity) and sum them up.",
      hint: "Use $map to transform items array, then $reduce or $sum",
      solution: `db.orders.aggregate([
  {$project: {
    orderNumber: 1,
    items: 1,
    itemTotals: {
      $map: {
        input: "$items",
        as: "item",
        in: {
          productName: "$$item.productName",
          quantity: "$$item.quantity",
          price: "$$item.price",
          total: {$multiply: ["$$item.quantity", "$$item.price"]}
        }
      }
    }
  }},
  {$addFields: {
    calculatedTotal: {
      $reduce: {
        input: "$itemTotals",
        initialValue: 0,
        in: {$add: ["$$value", "$$this.total"]}
      }
    }
  }}
])`,
      expectedResult: "Orders with item-level totals calculated"
    },
    {
      id: 26,
      title: "Find Nearby Warehouses",
      difficulty: "Hard",
      dataset: "ecommerce",
      collection: "inventory",
      question: "Find all warehouses within 100 kilometers of New York City (coordinates: -74.006, 40.7128).",
      hint: "Use $geoNear or $near operator with 2dsphere index",
      solution: `db.inventory.aggregate([
  {$geoNear: {
    near: {type: "Point", coordinates: [-74.006, 40.7128]},
    distanceField: "distance",
    maxDistance: 100000,
    spherical: true
  }},
  {$project: {
    warehouse: 1,
    productId: 1,
    quantity: 1,
    distanceKm: {$divide: ["$distance", 1000]}
  }}
])`,
      expectedResult: "Warehouses within 100km of NYC with distances"
    },
    {
      id: 27,
      title: "Calculate Shipment Distance",
      difficulty: "Hard",
      dataset: "logistics",
      collection: "shipments",
      question: "Calculate the distance between origin and destination for each shipment using coordinates.",
      hint: "You would typically use $geoNear, but for custom calculation use coordinates",
      solution: `db.shipments.aggregate([
  {$project: {
    trackingNumber: 1,
    status: 1,
    origin: 1,
    destination: 1,
    estimatedDistance: {
      $let: {
        vars: {
          lat1: {$arrayElemAt: ["$origin.coordinates", 1]},
          lon1: {$arrayElemAt: ["$origin.coordinates", 0]},
          lat2: {$arrayElemAt: ["$destination.coordinates", 1]},
          lon2: {$arrayElemAt: ["$destination.coordinates", 0]}
        },
        in: "Calculated using Haversine formula"
      }
    }
  }}
])`,
      expectedResult: "Shipments with distance information"
    },
    {
      id: 28,
      title: "Add Current Timestamp to Records",
      difficulty: "Medium",
      dataset: "ecommerce",
      collection: "products",
      question: "Add a field showing current time and the entire document using system variables.",
      hint: "Use $$NOW and $$ROOT system variables",
      solution: `db.products.aggregate([
  {$project: {
    name: 1,
    price: 1,
    queryTimestamp: "$$NOW",
    originalDocument: "$$ROOT"
  }}
])`,
      expectedResult: "Products with current timestamp and full document"
    },
    {
      id: 29,
      title: "Compare Order Date to Current Time",
      difficulty: "Medium",
      dataset: "ecommerce",
      collection: "orders",
      question: "Calculate days since order was placed using current time.",
      hint: "Use $$NOW to get current time and subtract orderDate",
      solution: `db.orders.aggregate([
  {$project: {
    orderNumber: 1,
    orderDate: 1,
    daysSinceOrder: {
      $divide: [
        {$subtract: ["$$NOW", "$orderDate"]},
        1000 * 60 * 60 * 24
      ]
    }
  }}
])`,
      expectedResult: "Orders with days since placed"
    },
    {
      id: 30,
      title: "Complete User Order Analytics",
      difficulty: "Expert",
      dataset: "ecommerce",
      collection: "users",
      question: "For each user, calculate total orders, total spent, average order value, and preferred category based on order history.",
      hint: "Use $lookup, $unwind, $group with multiple aggregations",
      solution: `db.users.aggregate([
  {$lookup: {
    from: "orders",
    localField: "_id",
    foreignField: "userId",
    as: "orders"
  }},
  {$unwind: {path: "$orders", preserveNullAndEmptyArrays: true}},
  {$group: {
    _id: "$_id",
    username: {$first: "$username"},
    email: {$first: "$email"},
    totalOrders: {$sum: {$cond: [{$ifNull: ["$orders", false]}, 1, 0]}},
    totalSpent: {$sum: {$ifNull: ["$orders.totalAmount", 0]}},
    avgOrderValue: {$avg: "$orders.totalAmount"}
  }},
  {$addFields: {
    customerTier: {
      $switch: {
        branches: [
          {case: {$gte: ["$totalSpent", 1000]}, then: "Gold"},
          {case: {$gte: ["$totalSpent", 500]}, then: "Silver"}
        ],
        default: "Bronze"
      }
    }
  }},
  {$sort: {totalSpent: -1}}
])`,
      expectedResult: "Complete user analytics with spending tiers"
    },
    {
      id: 31,
      title: "Database Collection Statistics",
      difficulty: "Medium",
      dataset: "ecommerce",
      collection: "products",
      question: "Get statistics about the products collection including document count and average document size.",
      hint: "Use db.collection.stats() command",
      solution: `db.products.stats()`,
      expectedResult: "Collection statistics and metadata"
    },
    {
      id: 33,
      title: "Update Multiple Products Price",
      difficulty: "Easy",
      dataset: "ecommerce",
      collection: "products",
      question: "Increase the price of all Electronics products by 10%.",
      hint: "Use updateMany() with $mul operator",
      solution: `db.products.updateMany(
  {category: "Electronics"},
  {$mul: {price: 1.1}, $set: {updatedAt: new Date()}}
)`,
      expectedResult: "All Electronics products price increased by 10%"
    },
    {
      id: 34,
      title: "Bulk Insert Reviews",
      difficulty: "Easy",
      dataset: "ecommerce",
      collection: "reviews",
      question: "Insert multiple reviews in a single operation for different products.",
      hint: "Use insertMany() method",
      solution: `db.reviews.insertMany([
  {
    productId: "64a1b2c3d4e5f6789012345b",
    userId: "64a1b2c3d4e5f6789012346c",
    rating: 5,
    title: "Best laptop ever!",
    comment: "Perfect for gaming, runs smoothly.",
    helpful: 0,
    reviewDate: new Date()
  },
  {
    productId: "64a1b2c3d4e5f6789012345c",
    userId: "64a1b2c3d4e5f6789012346b",
    rating: 4,
    title: "Good coffee maker",
    comment: "Makes great coffee but a bit noisy.",
    helpful: 0,
    reviewDate: new Date()
  }
])`,
      expectedResult: "Multiple reviews inserted"
    },
    {
      id: 35,
      title: "Replace Product Document",
      difficulty: "Easy",
      dataset: "ecommerce",
      collection: "products",
      question: "Replace the entire document for a product with specific _id (use Coffee Maker's _id).",
      hint: "Use replaceOne() method",
      solution: `db.products.replaceOne(
  {_id: "64a1b2c3d4e5f6789012345c"},
  {
    _id: "64a1b2c3d4e5f6789012345c",
    name: "Premium Coffee Maker",
    category: "Home & Kitchen",
    brand: "BrewMaster Pro",
    price: 129.99,
    stock: 60,
    rating: 4.7,
    reviews: 150,
    tags: ["coffee", "premium", "kitchen"],
    specifications: {
      color: "Stainless Steel",
      capacity: "14 cups",
      type: "Programmable"
    },
    createdAt: new Date("2023-03-10"),
    updatedAt: new Date()
  }
)`,
      expectedResult: "Product document completely replaced"
    },
    {
      id: 36,
      title: "Add Tags to Product",
      difficulty: "Easy",
      dataset: "ecommerce",
      collection: "products",
      question: "Add new tags 'bestseller' and 'featured' to Wireless Headphones without duplicates.",
      hint: "Use updateOne() with $addToSet and $each",
      solution: `db.products.updateOne(
  {name: "Wireless Headphones"},
  {$addToSet: {tags: {$each: ["bestseller", "featured"]}}}
)`,
      expectedResult: "New tags added to product"
    },
    {
      id: 37,
      title: "Remove Tag from Product",
      difficulty: "Easy",
      dataset: "ecommerce",
      collection: "products",
      question: "Remove the 'bluetooth' tag from Wireless Headphones.",
      hint: "Use updateOne() with $pull operator",
      solution: `db.products.updateOne(
  {name: "Wireless Headphones"},
  {$pull: {tags: "bluetooth"}}
)`,
      expectedResult: "Tag removed from product"
    },
    {
      id: 38,
      title: "Find and Modify Order Status",
      difficulty: "Medium",
      dataset: "ecommerce",
      collection: "orders",
      question: "Find an order with status 'processing' and update it to 'shipped', return the modified document.",
      hint: "Use findOneAndUpdate() with returnDocument option",
      solution: `db.orders.findOneAndUpdate(
  {status: "processing"},
  {$set: {status: "shipped", updatedAt: new Date()}},
  {returnDocument: "after"}
)`,
      expectedResult: "Updated order document returned"
    },

    // Add to advanced array:
    {
      id: 39,
      title: "Transaction Fee Analysis",
      difficulty: "Medium",
      dataset: "ecommerce",
      collection: "transactions",
      question: "Calculate total transaction amount, total fees, and net revenue by payment method.",
      hint: "Use $group with multiple $sum operations and $subtract",
      solution: `db.transactions.aggregate([
  {$group: {
    _id: "$paymentMethod",
    totalTransactions: {$sum: 1},
    totalAmount: {$sum: "$amount"},
    totalFees: {$sum: "$processingFee"},
    totalRefunds: {$sum: "$refundAmount"}
  }},
  {$addFields: {
    netRevenue: {
      $subtract: [
        {$subtract: ["$totalAmount", "$totalFees"]},
        "$totalRefunds"
      ]
    }
  }},
  {$sort: {netRevenue: -1}}
])`,
      expectedResult: "Revenue analysis by payment method"
    },
    {
      id: 40,
      title: "Split and Analyze Product Names",
      difficulty: "Medium",
      dataset: "ecommerce",
      collection: "products",
      question: "Split product names by space and count the number of words in each product name.",
      hint: "Use $split and $size operators",
      solution: `db.products.aggregate([
  {$project: {
    name: 1,
    nameWords: {$split: ["$name", " "]},
    wordCount: {$size: {$split: ["$name", " "]}},
    nameLower: {$toLower: "$name"}
  }}
])`,
      expectedResult: "Products with word count analysis"
    },
    {
      id: 41,
      title: "User Age Groups",
      difficulty: "Medium",
      dataset: "ecommerce",
      collection: "users",
      question: "Categorize users into age groups: '18-25', '26-35', '36+' and count users in each group.",
      hint: "Use $bucket or $switch with age ranges",
      solution: `db.users.aggregate([
  {$bucket: {
    groupBy: "$age",
    boundaries: [18, 26, 36, 100],
    default: "Other",
    output: {
      count: {$sum: 1},
      users: {$push: "$username"},
      avgAge: {$avg: "$age"}
    }
  }},
  {$project: {
    ageGroup: {
      $switch: {
        branches: [
          {case: {$eq: ["$_id", 18]}, then: "18-25"},
          {case: {$eq: ["$_id", 26]}, then: "26-35"},
          {case: {$eq: ["$_id", 36]}, then: "36+"}
        ],
        default: "Other"
      }
    },
    count: 1,
    avgAge: 1
  }}
])`,
      expectedResult: "Users grouped by age ranges"
    },
    {
      id: 42,
      title: "Warehouse Inventory within Distance",
      difficulty: "Hard",
      dataset: "ecommerce",
      collection: "inventory",
      question: "Find all inventory locations within 200km of Chicago coordinates (-87.6298, 41.8781) and calculate total stock.",
      hint: "Use $geoWithin with $centerSphere for radius search",
      solution: `db.inventory.aggregate([
  {$match: {
    location: {
      $geoWithin: {
        $centerSphere: [[-87.6298, 41.8781], 200 / 6378.1]
      }
    }
  }},
  {$group: {
    _id: null,
    totalStock: {$sum: "$quantity"},
    warehouses: {$addToSet: "$warehouse"},
    products: {$push: {warehouse: "$warehouse", productId: "$productId", quantity: "$quantity"}}
  }}
])`,
      expectedResult: "Total inventory within 200km of Chicago"
    },
    {
      id: 43,
      title: "Nearest Warehouse to Destination",
      difficulty: "Hard",
      dataset: "logistics",
      collection: "shipments",
      question: "For in_transit shipments, find the nearest warehouse from inventory based on destination coordinates.",
      hint: "Use $geoNear with shipment destinations",
      solution: `db.shipments.aggregate([
  {$match: {status: "in_transit"}},
  {$lookup: {
    from: "inventory",
    let: {destCoords: "$destination.coordinates"},
    pipeline: [
      {$geoNear: {
        near: {type: "Point", coordinates: [-118.2437, 34.0522]},
        distanceField: "distance",
        spherical: true
      }},
      {$limit: 1}
    ],
    as: "nearestWarehouse"
  }},
  {$unwind: "$nearestWarehouse"},
  {$project: {
    trackingNumber: 1,
    destination: 1,
    nearestWarehouse: "$nearestWarehouse.warehouse",
    distance: {$divide: ["$nearestWarehouse.distance", 1000]}
  }}
])`,
      expectedResult: "In-transit shipments with nearest warehouses"
    },
    {
      id: 32,
      title: "Create Index for Performance",
      difficulty: "Medium",
      dataset: "ecommerce",
      collection: "products",
      question: "Create a compound index on category and price fields for better query performance.",
      hint: "Use createIndex() method",
      solution: `db.products.createIndex({category: 1, price: -1})`,
      expectedResult: "Index created successfully"
    },
    {
      id: 44,
      title: "Complex Price Calculation with Discounts",
      difficulty: "Hard",
      dataset: "ecommerce",
      collection: "products",
      question: "Calculate discounted price for products: if price > $500 apply 20% discount, if > $200 apply 10%, else 5%. Show original, discount amount, and final price.",
      hint: "Use nested $cond or $switch with $multiply and $subtract",
      solution: `db.products.aggregate([
  {$project: {
    name: 1,
    originalPrice: "$price",
    discountPercent: {
      $switch: {
        branches: [
          {case: {$gt: ["$price", 500]}, then: 20},
          {case: {$gt: ["$price", 200]}, then: 10}
        ],
        default: 5
      }
    }
  }},
  {$addFields: {
    discountAmount: {
      $multiply: ["$originalPrice", {$divide: ["$discountPercent", 100]}]
    }
  }},
  {$addFields: {
    finalPrice: {$subtract: ["$originalPrice", "$discountAmount"]}
  }}
])`,
      expectedResult: "Products with calculated discounts"
    },
    {
      id: 45,
      title: "Reduce Array to Calculate Total Order Value",
      difficulty: "Hard",
      dataset: "ecommerce",
      collection: "orders",
      question: "Use $reduce to calculate total order value from items array and compare with stored totalAmount.",
      hint: "Use $reduce to iterate through items array",
      solution: `db.orders.aggregate([
  {$project: {
    orderNumber: 1,
    storedTotal: "$totalAmount",
    calculatedTotal: {
      $reduce: {
        input: "$items",
        initialValue: 0,
        in: {
          $add: [
            "$$value",
            {$multiply: ["$$this.quantity", "$$this.price"]}
          ]
        }
      }
    }
  }},
  {$addFields: {
    matches: {$eq: ["$storedTotal", "$calculatedTotal"]},
    difference: {$subtract: ["$storedTotal", "$calculatedTotal"]}
  }}
])`,
      expectedResult: "Orders with calculated vs stored totals"
    },
    {
      id: 46,
      title: "Filter and Map Order Items",
      difficulty: "Hard",
      dataset: "ecommerce",
      collection: "orders",
      question: "Filter order items with quantity > 1, then map to show item name with total price.",
      hint: "Combine $filter and $map operators",
      solution: `db.orders.aggregate([
  {$project: {
    orderNumber: 1,
    multipleQuantityItems: {
      $map: {
        input: {
          $filter: {
            input: "$items",
            as: "item",
            cond: {$gt: ["$$item.quantity", 1]}
          }
        },
        as: "filteredItem",
        in: {
          name: "$$filteredItem.productName",
          quantity: "$$filteredItem.quantity",
          totalPrice: {
            $multiply: ["$$filteredItem.quantity", "$$filteredItem.price"]
          }
        }
      }
    }
  }},
  {$match: {multipleQuantityItems: {$ne: []}}}
])`,
      expectedResult: "Orders with multi-quantity items processed"
    },
    {
      id: 47,
      title: "Time-based Query with $$NOW",
      difficulty: "Medium",
      dataset: "social",
      collection: "notifications",
      question: "Find unread notifications that haven't expired yet using current time.",
      hint: "Use $$NOW system variable for current time comparison",
      solution: `db.notifications.aggregate([
  {$match: {
    read: false,
    expiresAt: {$gt: "$$NOW"}
  }},
  {$addFields: {
    hoursUntilExpiry: {
      $divide: [
        {$subtract: ["$expiresAt", "$$NOW"]},
        1000 * 60 * 60
      ]
    }
  }},
  {$sort: {createdAt: -1}}
])`,
      expectedResult: "Active unread notifications with expiry time"
    },
    {
      id: 48,
      title: "Preserve Original Document with $$ROOT",
      difficulty: "Medium",
      dataset: "ecommerce",
      collection: "products",
      question: "Calculate inventory value (price * stock) while preserving original document using $$ROOT.",
      hint: "Use $$ROOT to reference entire document",
      solution: `db.products.aggregate([
  {$addFields: {
    inventoryValue: {$multiply: ["$price", "$stock"]},
    originalDoc: "$$ROOT"
  }},
  {$match: {inventoryValue: {$gt: 10000}}},
  {$project: {
    name: 1,
    price: 1,
    stock: 1,
    inventoryValue: 1,
    category: "$originalDoc.category"
  }}
])`,
      expectedResult: "High-value inventory with original data"
    },
    {
      id: 49,
      title: "Explain Query Execution Plan",
      difficulty: "Medium",
      dataset: "ecommerce",
      collection: "products",
      question: "Analyze the execution plan for finding Electronics products with price > $100.",
      hint: "Use explain() method with executionStats",
      solution: `db.products.find({
  category: "Electronics",
  price: {$gt: 100}
}).explain("executionStats")`,
      expectedResult: "Query execution plan with statistics"
    },
    {
      id: 50,
      title: "Get Database Statistics",
      difficulty: "Easy",
      dataset: "ecommerce",
      collection: "products",
      question: "Retrieve statistics for the entire database including size and collection count.",
      hint: "Use db.stats() command",
      solution: `db.stats()`,
      expectedResult: "Database statistics and metrics"
    },
    {
      id: 51,
      title: "List All Indexes",
      difficulty: "Easy",
      dataset: "ecommerce",
      collection: "products",
      question: "List all indexes created on the products collection.",
      hint: "Use getIndexes() method",
      solution: `db.products.getIndexes()`,
      expectedResult: "Array of all indexes on collection"
    },
    {
      id: 52,
      title: "Text Search with Index",
      difficulty: "Medium",
      dataset: "ecommerce",
      collection: "products",
      question: "Create a text index on name and tags fields, then search for products containing 'wireless'.",
      hint: "Create text index first, then use $text search",
      solution: `// First create index:
db.products.createIndex({name: "text", tags: "text"})

// Then search:
db.products.find({$text: {$search: "wireless"}})`,
      expectedResult: "Products matching text search"
    },
    {
      id: 53,
      title: "Aggregate with $$CURRENT",
      difficulty: "Hard",
      dataset: "ecommerce",
      collection: "orders",
      question: "In order items, reference current document fields using $$CURRENT while transforming the items array.",
      hint: "Use $$CURRENT to reference current document in pipeline",
      solution: `db.orders.aggregate([
  {$project: {
    orderNumber: 1,
    totalAmount: 1,
    itemsWithOrderInfo: {
      $map: {
        input: "$items",
        as: "item",
        in: {
          productName: "$$item.productName",
          itemTotal: {$multiply: ["$$item.quantity", "$$item.price"]},
          orderNumber: "$$CURRENT.orderNumber",
          percentOfTotal: {
            $multiply: [
              {$divide: [
                {$multiply: ["$$item.quantity", "$$item.price"]},
                "$$CURRENT.totalAmount"
              ]},
              100
            ]
          }
        }
      }
    }
  }}
])`,
      expectedResult: "Order items with reference to parent order"
    },
  ],
  advanced: [
    {
      id: 6,
      title: "Products by Category with Count",
      difficulty: "Medium",
      dataset: "ecommerce",
      collection: "products",
      question:
        "Group products by category and count how many products are in each category.",
      hint: "Use aggregation pipeline with $group and $sum",
      solution:
        'db.products.aggregate([{$group: {_id: "$category", count: {$sum: 1}}}])',
      expectedResult: "Count of products per category",
    },
    {
      id: 7,
      title: "Average Rating by Category",
      difficulty: "Medium",
      dataset: "ecommerce",
      collection: "products",
      question: "Calculate the average rating for each product category.",
      hint: "Use $group with $avg aggregation operator",
      solution:
        'db.products.aggregate([{$group: {_id: "$category", avgReviews: {$avg: "$reviews"}}}])',
      expectedResult: "Average rating per category",
    },
    {
      id: 8,
      title: "Top Rated Products",
      difficulty: "Medium",
      dataset: "ecommerce",
      collection: "products",
      question:
        "Find the top 3 highest rated products with their names and ratings.",
      hint: "Use find() with sort() and limit(), or aggregation with $sort and $limit",
      solution:
        'db.products.aggregate([{$sort: {reviews: -1}}, {$limit: 3}, {$project: {name: 1, reviews: 1}}])',
      expectedResult: "Top 3 products by rating",
    },
    {
      id: 9,
      title: "Total Order Value by User",
      difficulty: "Medium",
      dataset: "ecommerce",
      collection: "orders",
      question:
        "Calculate the total order value and count of orders grouped by userId.",
      hint: "Use $group to group by userId and $sum to calculate totals",
      solution: 'db.orders.aggregate([{$group: {_id: "$userId", totalSpent: {$sum: "$totalAmount"}, orderCount: {$sum: 1}}}])',
      expectedResult: "Total spending per user",
    },
    {
      id: 10,
      title: "Popular Posts by Engagement",
      difficulty: "Hard",
      dataset: "social",
      collection: "posts",
      question:
        "Find posts with highest engagement (likes + comments + shares) and include user details.",
      hint: "Use $addFields to calculate engagement score, $lookup for user details, then $sort",
      solution: `db.posts.aggregate([
  {$addFields: {engagement: {$add: ["$likes", "$comments", "$shares"]}}},
  {$lookup: {from: "users", localField: "userId", foreignField: "_id", as: "author"}},
  {$unwind: "$author"},
  {$sort: {engagement: -1}},
  {$limit: 5},
  {$project: {content: 1, engagement: 1, "author.displayName": 1, "author.username": 1}}
])`,
      expectedResult: "Top engaging posts with author details",
    },
    {
      id: 11,
      title: "Session Analytics by Device",
      difficulty: "Hard",
      dataset: "analytics",
      collection: "sessions",
      question:
        "Analyze user sessions by device type: average duration, bounce rate, and page views.",
      hint: "Use $group with device.type, calculate averages and bounce rate percentage",
      solution: `db.sessions.aggregate([
  {$group: {
    _id: "$device.type",
    avgDuration: {$avg: "$duration"},
    avgPageViews: {$avg: "$pageViews"},
    totalSessions: {$sum: 1},
    bounces: {$sum: {$cond: ["$bounceRate", 1, 0]}}
  }},
  {$addFields: {
    bounceRatePercent: {$multiply: [{$divide: ["$bounces", "$totalSessions"]}, 100]}
  }}
])`,
      expectedResult: "Device analytics with bounce rates",
    },
  ],
};