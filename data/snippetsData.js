export const snippetsData = [
  {
    id: 1,
    category: "System Design",
    themeBgColor: "#F3E5F5",
    textColor: "#4A148C",
    topicColor: "#9C27B0",
    lightColor: "#FCE4EC",
    type: [
      {
        id: 1,
        label: "SQL vs NoSQL",
        concepts: [
          {
            topic: "SQL vs NoSQL: Senior-Level Decision Framework",
            tags: ["database", "scalability", "consistency", "architecture"],
            explanation: `<div>
   <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; color: #4A148C;">Beyond Features: The Constraint-Based Decision Framework</h3>
   
   <p style="line-height: 1.75; margin-top: 1.5rem; color: #333;">
     At senior levels, database selection isn't about features—it's about <strong>constraint analysis</strong>. Evaluate these five dimensions systematically:
   </p>

   <div style="background: #F9F9F9; padding: 1.5rem; border-radius: 8px; margin-top: 1rem; border-left: 4px solid #4A148C;">
     <h5 style="font-weight: 600; color: #4A148C; margin-bottom: 1rem;">Senior Decision Framework</h5>
     <ul style="margin-left: 1.5rem; color: #333;">
       <li style="margin-top: 0.5rem;"><strong>Data Shape Stability:</strong> Will your schema survive 2-5 years without breaking changes?</li>
       <li style="margin-top: 0.5rem;"><strong>Consistency Guarantees:</strong> What happens if nodes serve different data during partitions?</li>
       <li style="margin-top: 0.5rem;"><strong>Query Predictability:</strong> Can you predefine 90%+ of your access patterns?</li>
       <li style="margin-top: 0.5rem;"><strong>Operational Failure Modes:</strong> How does the system degrade when nodes fail?</li>
       <li style="margin-top: 0.5rem;"><strong>Scale Direction:</strong> Read-heavy vs write-heavy? Vertical vs horizontal growth path?</li>
     </ul>
     <p style="margin-top: 1rem; color: #333; font-style: italic;">
       Junior engineers focus on features. Senior engineers analyze constraints.
     </p>
   </div>

   <h4 style="margin-top: 2rem; font-size: 1.25rem; font-weight: 600; color: #4A148C;">SQL: When Correctness is Non-Negotiable</h4>
   
   <p style="line-height: 1.75; margin-top: 1rem; color: #333;">
     <strong>Architectural Reality:</strong> SQL's ACID properties are a distributed systems compromise—they prioritize correctness over availability during partitions (CP in CAP). This isn't a limitation; it's a deliberate trade-off for domains where wrong data is catastrophic.
   </p>

   <h5 style="margin-top: 1.5rem; font-size: 1.1rem; font-weight: 600; color: #4A148C;">Scaling Reality Check:</h5>
   <p style="line-height: 1.75; margin-top: 0.5rem; color: #333;">
     <strong>Vertical scaling:</strong> Works remarkably well until ~$50K/month hardware. <br>
     <strong>Horizontal scaling:</strong> Possible but shifts complexity from database to application layer. Sharding SQL requires you to implement routing logic, handle cross-shard transactions, and manage distributed consistency—essentially building a database on top of a database.
   </p>

   <div style="background: #F3E5F5; padding: 1rem; border-radius: 8px; margin-top: 1.5rem;">
     <h5 style="font-weight: 600; color: #4A148C;">Senior Interview Signals:</h5>
     <ul style="margin-left: 1.5rem; color: #333;">
       <li style="margin-top: 0.5rem;">"SQL scales until joins and transactions dominate latency"</li>
       <li style="margin-top: 0.5rem;">"Sharding moves the distributed systems problem to your application code"</li>
       <li style="margin-top: 0.5rem;">"Choose SQL when the business cost of inconsistency exceeds infrastructure cost"</li>
     </ul>
   </div>

   <h5 style="margin-top: 1.5rem; font-size: 1.1rem; font-weight: 600; color: #4A148C;">Failure Modes You've Seen:</h5>
   <p style="line-height: 1.75; margin-top: 0.5rem; color: #333;">
     • Write amplification from indexes at high throughput <br>
     • Deadlock cascades in complex transaction graphs <br>
     • Replication lag causing read-your-writes violations <br>
     • Schema migrations that require 3am deployments and rollback plans
   </p>

   <h4 style="margin-top: 2rem; font-size: 1.25rem; font-weight: 600; color: #4A148C;">NoSQL: When Availability and Scale Dominate</h4>
   
   <p style="line-height: 1.75; margin-top: 1rem; color: #333;">
     <strong>Architectural Reality:</strong> NoSQL's eventual consistency is also a deliberate trade-off—availability over immediate correctness (AP in CAP). The constraint isn't technical; it's organizational: you must design queries <em>before</em> schema, not after.
   </p>

   <h5 style="margin-top: 1.5rem; font-size: 1.1rem; font-weight: 600; color: #4A148C;">The Denormalization Mandate:</h5>
   <p style="line-height: 1.75; margin-top: 0.5rem; color: #333;">
     This isn't optional. You're trading storage cost for read performance and availability. Every join you avoid in production required upfront design work. If you find yourself needing ad-hoc joins, you chose wrong.
   </p>

   <div style="background: #F3E5F5; padding: 1rem; border-radius: 8px; margin-top: 1.5rem;">
     <h5 style="font-weight: 600; color: #4A148C;">Consistency Spectrum (Know These):</h5>
     <ul style="margin-left: 1.5rem; color: #333;">
       <li style="margin-top: 0.5rem;"><strong>Strong:</strong> All nodes agree immediately (SQL default)</li>
       <li style="margin-top: 0.5rem;"><strong>Eventual:</strong> Nodes converge eventually (NoSQL default)</li>
       <li style="margin-top: 0.5rem;"><strong>Read-your-writes:</strong> Your reads see your writes</li>
       <li style="margin-top: 0.5rem;"><strong>Monotonic reads:</strong> You never see older data</li>
       <li style="margin-top: 0.5rem;"><strong>Causal consistency:</strong> Preserves cause-effect order</li>
     </ul>
   </div>

   <h5 style="margin-top: 1.5rem; font-size: 1.1rem; font-weight: 600; color: #4A148C;">Operational Truths:</h5>
   <p style="line-height: 1.75; margin-top: 0.5rem; color: #333;">
     • Automatic sharding works until hotspotting requires manual intervention <br>
     • Tunable consistency means each operation has its own SLA <br>
     • Repair operations during node failures become your problem <br>
     • Data correctness becomes an application-level concern
   </p>

   <h4 style="margin-top: 2rem; font-size: 1.25rem; font-weight: 600; color: #4A148C;">Production Patterns (Not Toy Examples)</h4>
   
   <div style="background: #F9F9F9; padding: 1rem; border-radius: 8px; margin-top: 1rem;">
     <h5 style="font-weight: 600; color: #4A148C;">Pattern 1: CQRS with Bounded Contexts</h5>
     <p style="color: #333; margin-top: 0.5rem;">
       <strong>Write side:</strong> PostgreSQL for order processing (strong consistency required) <br>
       <strong>Read side:</strong> Elasticsearch for product search (eventual consistency acceptable) <br>
       <strong>Sync:</strong> Change Data Capture (CDC) streaming with idempotent consumers
     </p>
     
     <h5 style="font-weight: 600; color: #4A148C; margin-top: 1rem;">Pattern 2: Time-Series with Retention Tiers</h5>
     <p style="color: #333; margin-top: 0.5rem;">
       <strong>Hot data (7 days):</strong> Redis for real-time dashboards <br>
       <strong>Warm data (30 days):</strong> Cassandra for analytical queries <br>
       <strong>Cold data (years):</strong> S3 + Athena for compliance/archival
     </p>
     
     <h5 style="font-weight: 600; color: #4A148C; margin-top: 1rem;">Pattern 3: Global Session Management</h5>
     <p style="color: #333; margin-top: 0.5rem;">
       <strong>Primary region:</strong> DynamoDB with strong consistency <br>
       <strong>Secondary regions:</strong> DynamoDB Global Tables with eventual consistency <br>
       <strong>Trade-off:</strong> Milliseconds of inconsistency acceptable for global availability
     </p>
   </div>

   <h4 style="margin-top: 2rem; font-size: 1.25rem; font-weight: 600; color: #4A148C;">Anti-Patterns You Should Call Out</h4>
   <div style="background: #FFEBEE; padding: 1rem; border-radius: 8px; margin-top: 1rem;">
     <ul style="margin-left: 1.5rem; color: #333;">
       <li style="margin-top: 0.5rem;">
         <strong>"We'll use MongoDB for everything":</strong> Polyglot persistence exists for a reason. Different problems need different tools.
       </li>
       <li style="margin-top: 0.5rem;">
         <strong>"Let's shard early":</strong> Premature sharding creates operational debt. Scale vertically first until pain points are clear.
       </li>
       <li style="margin-top: 0.5rem;">
         <strong>"NoSQL doesn't need data modeling":</strong> Actually requires more upfront modeling—just of queries, not storage.
       </li>
       <li style="margin-top: 0.5rem;">
         <strong>"We can always add consistency later":</strong> Changing consistency guarantees requires data migration and application rewrites.
       </li>
     </ul>
   </div>

   <h4 style="margin-top: 2rem; font-size: 1.25rem; font-weight: 600; color: #4A148C;">The Senior Synthesis</h4>
   <div style="background: #E8F5E9; padding: 1.5rem; border-radius: 8px; margin-top: 1rem;">
     <p style="line-height: 1.75; color: #333; font-style: italic;">
       SQL and NoSQL aren't competitors; they're complementary tools for different constraints. <br><br>
       
       <strong>Choose SQL when:</strong> Your business logic requires transactional integrity, your data shape is stable, and you need ad-hoc query flexibility. You're trading operational simplicity at scale for correctness guarantees.<br><br>
       
       <strong>Choose NoSQL when:</strong> Your access patterns are predictable, your scale demands horizontal growth, and eventual consistency is acceptable. You're trading upfront query design work for linear scalability.<br><br>
       
       <strong>Production reality:</strong> Modern systems use both, separated by bounded contexts with clear consistency boundaries. The skill isn't choosing one database—it's knowing where to draw the lines between them.
     </p>
   </div>

   <div style="margin-top: 2rem; padding: 1rem; border: 1px solid #4A148C; border-radius: 8px;">
     <h5 style="font-weight: 600; color: #4A148C;">Interview Power Statement:</h5>
     <p style="color: #333; margin-top: 0.5rem;">
       "For a senior role, I'd evaluate based on the five constraint dimensions. If data correctness dominates (financial systems), we start with SQL and scale vertically until joins become problematic. If availability and horizontal scale dominate (social feeds), we start with NoSQL and design queries upfront. Most production systems I've built use both, with clear boundaries between consistency domains."
     </p>
   </div>
 </div>`,
            examples: [
              `// SENIOR EXAMPLE: Hybrid Architecture with Clear Boundaries
// Order Service (SQL - Consistency Domain)
public class OrderService {
    @Transactional  // ACID boundary
    public Order createOrder(Cart cart) {
        // 1. Inventory check with serializable isolation
        inventoryRepository.reserveItems(cart.getItems());
        
        // 2. Payment processing (rollback on failure)
        paymentProcessor.charge(cart.getTotal());
        
        // 3. Order creation
        Order order = orderRepository.save(cart.toOrder());
        
        // 4. Async event for eventual consistency domains
        eventPublisher.publish(new OrderCreatedEvent(order));
        
        return order;
    }
}

// Product Catalog Service (NoSQL - Availability Domain)
@Repository
public class ProductCatalogRepository {
    // Query-first design: All queries known upfront
    public List<Product> searchProducts(SearchFilters filters) {
        // Single-table design with GSI patterns
        // No joins - all data denormalized
        return dynamoDB.query(buildQueryFromFilters(filters));
    }
    
    // Update requires denormalization to all access patterns
    @Async
    public void updateProductStock(String productId, int delta) {
        // Update primary record
        updatePrimaryRecord(productId, delta);
        
        // Update denormalized views (eventually consistent)
        updateSearchIndex(productId, delta);
        updateCategoryView(productId, delta);
        updateRecommendationView(productId, delta);
    }
}

// Event Handler for Consistency Bridge
@Component
public class OrderEventConsumer {
    @EventListener
    public void handleOrderCreated(OrderCreatedEvent event) {
        // Eventually consistent update to read-optimized views
        recommendationEngine.updateUserPreferences(
            event.getUserId(), 
            event.getProductIds()
        );
        
        analyticsService.recordPurchase(event);
        
        // No rollback here - eventual consistency domain
        // Compensating actions if needed
    }
}`,
              `-- SCALING PATTERN: SQL to NoSQL Evolution
-- Phase 1: Monolithic SQL (Startup)
SELECT o.*, u.email, p.name, SUM(oi.price) as total
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
WHERE o.user_id = 12345
GROUP BY o.id, u.email, p.name;

-- Phase 2: CQRS Split (Growth)
-- Write side (SQL - source of truth)
INSERT INTO orders (...) VALUES (...);
INSERT INTO order_items (...) VALUES (...);

-- Read side (NoSQL - denormalized view)
{
  "orderId": "ORD_789",
  "userId": "USR_12345",
  "userEmail": "john@example.com",
  "items": [
    {
      "productId": "PROD_456",
      "productName": "Wireless Headphones",
      "price": 199.99,
      "quantity": 1
    }
  ],
  "total": 199.99,
  "createdAt": "2026-01-22T14:30:00Z"
}

-- Phase 3: Event Sourcing (Scale)
// Order aggregate stored as event stream
[
  {"type": "OrderCreated", "payload": {...}},
  {"type": "ItemAdded", "payload": {...}},
  {"type": "PaymentProcessed", "payload": {...}},
  {"type": "OrderShipped", "payload": {...}}
]

// Multiple read models built from events
// - Customer service view (SQL)
// - Analytics view (NoSQL time-series)
// - Search index (Elasticsearch)
// - Cache layer (Redis)`,
            ],
            questions: [
              {
                question:
                  "How would you evolve a monolithic SQL application that's hitting scaling limits?",
                solution:
                  "<p><strong>Step 1:</strong> Identify bounded contexts and their consistency requirements. Payment processing stays in SQL; user activity feeds move to NoSQL.<br><br><strong>Step 2:</strong> Implement CQRS for read-heavy domains. Use CDC (Debezium) to stream SQL changes to NoSQL read models.<br><br><strong>Step 3:</strong> Introduce async boundaries with idempotent consumers. Events bridge consistency domains.<br><br><strong>Step 4:</strong> Scale reads with read replicas first. Shard only when clear partitioning key emerges.<br><br><strong>Step 5:</strong> Consider time-series separation—hot data in Redis, warm in Cassandra, cold in object storage.</p>",
              },
              {
                question:
                  "What are the operational differences you've experienced between managing SQL and NoSQL at scale?",
                solution:
                  "<p><strong>SQL at scale:</strong> Monitoring replication lag becomes critical. Deadlock detection and resolution is manual. Schema migrations require orchestration. Backup/restore times grow linearly with data. Connection pool management is non-trivial.<br><br><strong>NoSQL at scale:</strong> Hotspot detection and rebalancing is ongoing. Tunable consistency means monitoring per-operation SLAs. Repair operations during node failures. Data modeling changes require new tables (not migrations). Cross-region replication configuration is complex.</p>",
              },
              {
                question:
                  "How do you handle data consistency across SQL and NoSQL in a hybrid architecture?",
                solution:
                  "<p><strong>Pattern 1:</strong> Eventual consistency with compensating actions. SQL writes emit events; NoSQL consumers update eventually. If inconsistencies occur, compensating workflows fix them.<br><br><strong>Pattern 2:</strong> Two-phase commit where absolutely required (rare). Mostly avoid—breaks availability.<br><br><strong>Pattern 3:</strong> Command Query Responsibility Segregation (CQRS). SQL handles commands (writes with strong consistency). NoSQL handles queries (reads with eventual consistency). Sync via change data capture.<br><br><strong>Key insight:</strong> Draw clear consistency boundaries. Don't mix strong and eventual consistency in the same transaction boundary.</p>",
              },
              {
                question:
                  "What metrics would you monitor to decide when to split a SQL database?",
                solution:
                  "<p><strong>Business metrics:</strong> Cost of inconsistency vs infrastructure cost. Revenue impact of downtime.<br><br><strong>Technical metrics:</strong> 1) Write amplification ratio (index updates vs data). 2) 95th percentile join latency crossing 100ms. 3) Replication lag exceeding SLA. 4) Lock wait time > 1% of transaction time. 5) Storage I/O saturation > 70%.<br><br><strong>Organizational signals:</strong> Team spending > 30% time on DB ops. Feature velocity blocked by migration complexity. Multiple services contending for same tables.</p>",
              },
              {
                question:
                  "How would you explain the CAP theorem trade-off to a product manager?",
                solution:
                  "<p>'During network failures, we must choose: either show consistent but potentially stale data (CP), or show available but potentially inconsistent data (AP). For payments, we choose consistency—we'd rather say 'system down' than show wrong balance. For product recommendations, we choose availability—showing slightly stale suggestions is better than showing none. This isn't about technology; it's about business risk tolerance.'</p>",
              },
            ],
            links: [
              "https://martinfowler.com/bliki/PolyglotPersistence.html",
              "https://aws.amazon.com/builders-library/time-series-data-types-and-database-architecture/",
              "https://www.confluent.io/blog/event-sourcing-vs-cqrs-two-architectural-patterns-for-cloud-native-applications/",
              "https://www.cockroachlabs.com/blog/sql-vs-nosql-databases/",
            ],
          },
        ],
      },
    ],
  },
];
