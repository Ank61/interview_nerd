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
            topic: "SQL vs NoSQL",
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
          {
            topic: "Authentication vs Authorization",
            tags: [
              "Authentication",
              "Authorization",
              "OAuth 2.0",
              "OpenID Connect",
              "JWT",
              "Session Management",
              "RBAC",
              "ABAC",
              "ReBAC",
              "Security",
              "Access Control",
              "Token Management",
              "Identity",
              "Permissions",
            ],
            explanation: `
    <div>
      <h2>Authentication vs Authorization</h2>
      <p>
        Authentication and Authorization are two distinct security concepts that are often confused. Understanding 
        the difference and knowing how to implement each correctly is critical for building secure applications. 
        This guide covers everything from basic concepts to advanced architectural patterns.
      </p>

      <h3>The Core Difference</h3>
      <pre><code>
// Authentication (AuthN): "Who are you?"
// =======================================
// Proving your identity to the system
// Examples: Login with password, biometric scan, SSO

// Authorization (AuthZ): "What can you do?"
// ==========================================
// Determining what actions an authenticated user can perform
// Examples: Can you delete this file? Can you view this report?

// Common Misconception:
// ❌ "If I'm logged in, I have authorization"
// ✅ Being authenticated doesn't mean you can do everything

// Real-world analogy:
// Authentication = Showing your ID at airport security (proves who you are)
// Authorization = Your boarding pass (proves you can board THIS flight)

// The Flow:
// 1. User provides credentials (username/password)
// 2. System authenticates (verifies credentials) → Identity established
// 3. User requests an action (delete file)
// 4. System authorizes (checks permissions) → Access granted/denied
      </code></pre>

      <h3>1. Authentication Fundamentals</h3>

      <h4>Session-Based Authentication</h4>
      <pre><code>
// Traditional Server Session Pattern
// ===================================

// Login endpoint
app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  
  // 1. Verify credentials
  const user = await db.users.findOne({ username });
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // Compare hashed password (never store plaintext!)
  const isValid = await bcrypt.compare(password, user.passwordHash);
  
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // 2. Create session
  const sessionId = generateSecureRandomString();
  
  // Store session in database/Redis
  await sessions.set(sessionId, {
    userId: user.id,
    createdAt: Date.now(),
    expiresAt: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
    ipAddress: req.ip,
    userAgent: req.headers['user-agent']
  });
  
  // 3. Send session cookie to client
  res.cookie('sessionId', sessionId, {
    httpOnly: true,      // Prevents JavaScript access (XSS protection)
    secure: true,        // HTTPS only
    sameSite: 'strict',  // CSRF protection
    maxAge: 24 * 60 * 60 * 1000
  });
  
  res.json({ 
    success: true,
    user: {
      id: user.id,
      username: user.username,
      email: user.email
    }
  });
});

// Authentication middleware
const authenticate = async (req, res, next) => {
  const sessionId = req.cookies.sessionId;
  
  if (!sessionId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  // Lookup session
  const session = await sessions.get(sessionId);
  
  if (!session) {
    return res.status(401).json({ error: 'Invalid session' });
  }
  
  // Check expiration
  if (session.expiresAt < Date.now()) {
    await sessions.delete(sessionId);
    return res.status(401).json({ error: 'Session expired' });
  }
  
  // Attach user to request
  const user = await db.users.findById(session.userId);
  req.user = user;
  req.session = session;
  
  next();
};

// Protected route
app.get('/api/profile', authenticate, (req, res) => {
  res.json({ user: req.user });
});

// Logout
app.post('/auth/logout', authenticate, async (req, res) => {
  const sessionId = req.cookies.sessionId;
  
  // Delete session from storage
  await sessions.delete(sessionId);
  
  // Clear cookie
  res.clearCookie('sessionId');
  
  res.json({ success: true });
});

// Characteristics of Session-Based Auth:
// =======================================
// ✅ Easy to revoke (delete session from storage)
// ✅ Stateful - full control over sessions
// ✅ Can store additional session data
// ❌ Requires server-side storage (Redis/Database)
// ❌ Doesn't scale well across multiple servers without shared storage
// ❌ CSRF protection needed
      </code></pre>

      <h4>Token-Based Authentication (JWT)</h4>
      <pre><code>
// JWT (JSON Web Token) Pattern
// =============================

const jwt = require('jsonwebtoken');

// Login endpoint
app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  
  // Verify credentials (same as before)
  const user = await db.users.findOne({ username });
  const isValid = await bcrypt.compare(password, user.passwordHash);
  
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // Create JWT
  const token = jwt.sign(
    {
      // Payload (claims)
      sub: user.id,              // Subject (user ID)
      username: user.username,
      email: user.email,
      roles: user.roles,         // For authorization
      iat: Math.floor(Date.now() / 1000),  // Issued at
      exp: Math.floor(Date.now() / 1000) + (15 * 60)  // Expires in 15 minutes
    },
    process.env.JWT_SECRET,      // Secret key (keep this secure!)
    {
      algorithm: 'HS256'         // Signing algorithm
    }
  );
  
  res.json({ 
    token,
    expiresIn: 900  // 15 minutes in seconds
  });
});

// Authentication middleware for JWT
const authenticateJWT = (req, res, next) => {
  // Get token from Authorization header
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  // Expected format: "Bearer TOKEN"
  const token = authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Malformed token' });
  }
  
  try {
    // Verify signature and decode
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user info to request
    req.user = {
      id: decoded.sub,
      username: decoded.username,
      email: decoded.email,
      roles: decoded.roles
    };
    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

// Protected route
app.get('/api/profile', authenticateJWT, (req, res) => {
  res.json({ user: req.user });
});

// JWT Structure:
// ==============
// Header.Payload.Signature
// eyJhbGc...  .  eyJzdWI...  .  SflKxwRJ...
//   ↑              ↑             ↑
// Algorithm    Claims (data)  Signature (verification)

// Decoded JWT example:
{
  // Header
  "alg": "HS256",
  "typ": "JWT"
}
{
  // Payload (claims)
  "sub": "user123",           // Subject (user ID)
  "username": "john",
  "roles": ["user", "editor"],
  "iat": 1609459200,          // Issued at (timestamp)
  "exp": 1609462800           // Expiration (timestamp)
}
// Signature = HMACSHA256(
//   base64UrlEncode(header) + "." + base64UrlEncode(payload),
//   secret
// )

// Characteristics of JWT:
// =======================
// ✅ Stateless - no server storage needed
// ✅ Scales horizontally (any server can verify)
// ✅ Self-contained - all info in token
// ✅ Works across domains (CORS-friendly)
// ❌ Hard to revoke before expiration
// ❌ Token size grows with claims
// ❌ Can't update claims without new token
// ❌ Exposed to XSS if stored in localStorage

// Security Best Practices:
// ========================
// 1. Use HTTPS only
// 2. Short expiration times (5-15 minutes)
// 3. Store in httpOnly cookie (not localStorage)
// 4. Use refresh tokens for long-lived sessions
// 5. Don't put sensitive data in payload (it's base64, not encrypted!)
// 6. Validate signature on every request
// 7. Use strong secret keys (or asymmetric keys for RS256)
      </code></pre>

      <h4>Refresh Token Pattern</h4>
      <pre><code>
// The Problem: Short-lived access tokens expire frequently
// The Solution: Refresh tokens for seamless re-authentication
// ===========================================================

class AuthService {
  // Login - returns both access and refresh tokens
  async login(username, password) {
    const user = await this.verifyCredentials(username, password);
    
    // Short-lived access token (15 minutes)
    const accessToken = jwt.sign(
      {
        sub: user.id,
        username: user.username,
        roles: user.roles,
        type: 'access'
      },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );
    
    // Long-lived refresh token (7 days)
    const refreshToken = jwt.sign(
      {
        sub: user.id,
        type: 'refresh',
        jti: uuidv4()  // Unique token ID for revocation
      },
      process.env.REFRESH_SECRET,
      { expiresIn: '7d' }
    );
    
    // Store refresh token in database for revocation capability
    await db.refreshTokens.create({
      jti: refreshToken.jti,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      createdAt: new Date()
    });
    
    return {
      accessToken,
      refreshToken,
      expiresIn: 900  // 15 minutes
    };
  }
  
  // Refresh - get new access token without re-entering password
  async refresh(refreshToken) {
    try {
      // Verify refresh token
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
      
      if (decoded.type !== 'refresh') {
        throw new Error('Invalid token type');
      }
      
      // Check if refresh token is revoked
      const storedToken = await db.refreshTokens.findOne({
        jti: decoded.jti,
        userId: decoded.sub
      });
      
      if (!storedToken) {
        throw new Error('Refresh token revoked');
      }
      
      // Get user data
      const user = await db.users.findById(decoded.sub);
      
      // Issue new access token
      const accessToken = jwt.sign(
        {
          sub: user.id,
          username: user.username,
          roles: user.roles,
          type: 'access'
        },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
      );
      
      return {
        accessToken,
        expiresIn: 900
      };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }
  
  // Logout - revoke refresh token
  async logout(refreshToken) {
    const decoded = jwt.decode(refreshToken);
    
    // Delete refresh token from database
    await db.refreshTokens.deleteOne({
      jti: decoded.jti,
      userId: decoded.sub
    });
  }
  
  // Revoke all sessions for a user (e.g., on password change)
  async revokeAllSessions(userId) {
    await db.refreshTokens.deleteMany({ userId });
  }
}

// Client-side usage pattern:
// ==========================

class ApiClient {
  constructor() {
    this.accessToken = localStorage.getItem('accessToken');
    this.refreshToken = localStorage.getItem('refreshToken');
  }
  
  async request(url, options = {}) {
    // Add access token to request
    options.headers = {
      ...options.headers,
      'Authorization': \`Bearer \${this.accessToken}\`
    };
    
    let response = await fetch(url, options);
    
    // If token expired, try to refresh
    if (response.status === 401) {
      const refreshed = await this.refreshAccessToken();
      
      if (refreshed) {
        // Retry original request with new token
        options.headers['Authorization'] = \`Bearer \${this.accessToken}\`;
        response = await fetch(url, options);
      } else {
        // Refresh failed - redirect to login
        window.location.href = '/login';
      }
    }
    
    return response;
  }
  
  async refreshAccessToken() {
    try {
      const response = await fetch('/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          refreshToken: this.refreshToken
        })
      });
      
      if (response.ok) {
        const { accessToken } = await response.json();
        this.accessToken = accessToken;
        localStorage.setItem('accessToken', accessToken);
        return true;
      }
      
      return false;
    } catch (error) {
      return false;
    }
  }
}

// Token Storage Strategies:
// ==========================

// ❌ Bad: localStorage (vulnerable to XSS)
localStorage.setItem('token', token);

// ⚠️ Better: sessionStorage (cleared on tab close, but still XSS vulnerable)
sessionStorage.setItem('token', token);

// ✅ Best: httpOnly cookie (not accessible via JavaScript)
res.cookie('accessToken', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 15 * 60 * 1000
});

// For SPAs: Store refresh token in httpOnly cookie, access token in memory
// On page refresh, use refresh token to get new access token
      </code></pre>

      <h3>2. Authorization Fundamentals</h3>

      <h4>Role-Based Access Control (RBAC)</h4>
      <pre><code>
// RBAC: Users → Roles → Permissions
// ==================================

// Database schema
const userSchema = {
  id: 'user123',
  username: 'john',
  roles: ['editor', 'analyst']  // User has multiple roles
};

const roleSchema = {
  name: 'editor',
  permissions: [
    'posts:create',
    'posts:edit',
    'posts:delete',
    'posts:publish'
  ]
};

// Authorization middleware - Simple RBAC
const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    const hasRole = req.user.roles.some(role => 
      allowedRoles.includes(role)
    );
    
    if (!hasRole) {
      return res.status(403).json({ 
        error: 'Forbidden',
        message: \`Requires one of: \${allowedRoles.join(', ')}\`
      });
    }
    
    next();
  };
};

// Usage
app.delete('/api/posts/:id', 
  authenticate,
  requireRole(['admin', 'editor']),
  PostsController.delete
);

// Authorization middleware - Permission-based RBAC
class RBACService {
  constructor(db) {
    this.db = db;
    // Cache permissions in memory for performance
    this.permissionCache = new Map();
  }
  
  async getUserPermissions(userId) {
    // Check cache
    if (this.permissionCache.has(userId)) {
      return this.permissionCache.get(userId);
    }
    
    // Get user's roles
    const user = await this.db.users.findById(userId);
    
    // Get permissions for each role
    const permissions = new Set();
    
    for (const roleName of user.roles) {
      const role = await this.db.roles.findOne({ name: roleName });
      role.permissions.forEach(p => permissions.add(p));
    }
    
    const permissionsArray = Array.from(permissions);
    
    // Cache for 5 minutes
    this.permissionCache.set(userId, permissionsArray);
    setTimeout(() => this.permissionCache.delete(userId), 5 * 60 * 1000);
    
    return permissionsArray;
  }
  
  async hasPermission(userId, permission) {
    const permissions = await this.getUserPermissions(userId);
    return permissions.includes(permission);
  }
  
  // Middleware factory
  requirePermission(permission) {
    return async (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ error: 'Not authenticated' });
      }
      
      const hasPermission = await this.hasPermission(req.user.id, permission);
      
      if (!hasPermission) {
        return res.status(403).json({ 
          error: 'Forbidden',
          message: \`Requires permission: \${permission}\`
        });
      }
      
      next();
    };
  }
}

// Usage with permissions
const rbac = new RBACService(db);

app.post('/api/reports', 
  authenticate,
  rbac.requirePermission('reports:create'),
  ReportsController.create
);

app.delete('/api/reports/:id',
  authenticate,
  rbac.requirePermission('reports:delete'),
  ReportsController.delete
);

// Wildcard permissions
// ====================

const hasWildcardPermission = (userPermissions, required) => {
  // Check exact match
  if (userPermissions.includes(required)) {
    return true;
  }
  
  // Check wildcard patterns
  // 'posts:*' grants 'posts:create', 'posts:edit', etc.
  const [resource, action] = required.split(':');
  
  if (userPermissions.includes(\`\${resource}:*\`)) {
    return true;
  }
  
  // Super admin wildcard
  if (userPermissions.includes('*:*')) {
    return true;
  }
  
  return false;
};

// Hierarchical roles
// ==================

const roleHierarchy = {
  'super_admin': ['admin', 'editor', 'viewer'],
  'admin': ['editor', 'viewer'],
  'editor': ['viewer'],
  'viewer': []
};

const hasInheritedRole = (userRoles, requiredRole) => {
  for (const userRole of userRoles) {
    if (userRole === requiredRole) {
      return true;
    }
    
    // Check if user's role inherits required role
    const inherited = roleHierarchy[userRole] || [];
    if (inherited.includes(requiredRole)) {
      return true;
    }
  }
  
  return false;
};

// RBAC Pros and Cons:
// ===================
// ✅ Simple to understand and implement
// ✅ Easy to audit ("Who has admin role?")
// ✅ Works well for hierarchical organizations
// ✅ Efficient (role checks are fast)
// ❌ Doesn't handle resource ownership ("Can edit MY posts only")
// ❌ Role explosion (too many specific roles)
// ❌ Difficult for context-dependent rules ("Edit if created < 24h ago")
      </code></pre>

      <h4>Attribute-Based Access Control (ABAC)</h4>
      <pre><code>
// ABAC: Access based on attributes of user, resource, and environment
// ====================================================================

// Example policy: User can edit a post if:
// - They are the owner of the post, OR
// - They have 'editor' role AND post is not published, OR
// - They have 'admin' role

class ABACService {
  evaluatePolicy(policy, context) {
    const { user, resource, action, environment } = context;
    
    // Evaluate each rule in the policy
    return policy.rules.some(rule => this.evaluateRule(rule, context));
  }
  
  evaluateRule(rule, context) {
    const { user, resource, action, environment } = context;
    
    // All conditions must be true
    return rule.conditions.every(condition => {
      return this.evaluateCondition(condition, context);
    });
  }
  
  evaluateCondition(condition, context) {
    const { attribute, operator, value } = condition;
    const actualValue = this.getAttribute(attribute, context);
    
    switch (operator) {
      case 'equals':
        return actualValue === value;
      case 'contains':
        return Array.isArray(actualValue) && actualValue.includes(value);
      case 'greaterThan':
        return actualValue > value;
      case 'lessThan':
        return actualValue < value;
      default:
        return false;
    }
  }
  
  getAttribute(path, context) {
    // Path like "user.id" or "resource.ownerId"
    const parts = path.split('.');
    let value = context;
    
    for (const part of parts) {
      value = value[part];
      if (value === undefined) return null;
    }
    
    return value;
  }
}

// Policy definition (can be stored in database or config)
const editPostPolicy = {
  name: 'edit-post',
  rules: [
    {
      // Rule 1: User is owner
      conditions: [
        { attribute: 'user.id', operator: 'equals', value: '{{resource.ownerId}}' }
      ]
    },
    {
      // Rule 2: User is editor AND post not published
      conditions: [
        { attribute: 'user.roles', operator: 'contains', value: 'editor' },
        { attribute: 'resource.status', operator: 'equals', value: 'draft' }
      ]
    },
    {
      // Rule 3: User is admin
      conditions: [
        { attribute: 'user.roles', operator: 'contains', value: 'admin' }
      ]
    }
  ]
};

// Usage in middleware
const abac = new ABACService();

const requireABAC = (policyName) => {
  return async (req, res, next) => {
    const resourceId = req.params.id;
    const resource = await db.posts.findById(resourceId);
    
    const context = {
      user: req.user,
      resource: resource,
      action: req.method.toLowerCase(),
      environment: {
        time: Date.now(),
        ipAddress: req.ip,
        userAgent: req.headers['user-agent']
      }
    };
    
    const policy = policies[policyName];
    const allowed = abac.evaluatePolicy(policy, context);
    
    if (!allowed) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    // Attach resource to request for controller
    req.resource = resource;
    next();
  };
};

app.put('/api/posts/:id',
  authenticate,
  requireABAC('edit-post'),
  PostsController.update
);

// Real-world ABAC examples:
// =========================

// 1. Time-based access
const timeBasedPolicy = {
  rules: [
    {
      conditions: [
        { attribute: 'user.roles', operator: 'contains', value: 'employee' },
        { attribute: 'environment.time', operator: 'greaterThan', value: '{{workday.start}}' },
        { attribute: 'environment.time', operator: 'lessThan', value: '{{workday.end}}' }
      ]
    }
  ]
};

// 2. Location-based access (VPN required)
const vpnRequiredPolicy = {
  rules: [
    {
      conditions: [
        { attribute: 'environment.ipAddress', operator: 'in', value: ['10.0.0.0/8', '172.16.0.0/12'] }
      ]
    },
    {
      // Or admin can access from anywhere
      conditions: [
        { attribute: 'user.roles', operator: 'contains', value: 'admin' }
      ]
    }
  ]
};

// 3. Resource age limit
const editRecentPostPolicy = {
  rules: [
    {
      conditions: [
        { attribute: 'user.id', operator: 'equals', value: '{{resource.ownerId}}' },
        { attribute: 'resource.createdAt', operator: 'greaterThan', value: '{{now - 24h}}' }
      ]
    }
  ]
};

// 4. Quota-based access
const exportQuotaPolicy = {
  rules: [
    {
      conditions: [
        { attribute: 'user.exportsToday', operator: 'lessThan', value: 5 }
      ]
    },
    {
      // Premium users have unlimited exports
      conditions: [
        { attribute: 'user.plan', operator: 'equals', value: 'premium' }
      ]
    }
  ]
};

// ABAC Pros and Cons:
// ===================
// ✅ Fine-grained control (ownership, time, location, etc.)
// ✅ Dynamic - adapts to context
// ✅ Fewer roles needed (logic in policies)
// ✅ Flexible for complex business rules
// ❌ Complex to implement and maintain
// ❌ Hard to audit ("Who can access X?" requires evaluating all policies)
// ❌ Performance cost (policy evaluation on each request)
// ❌ Testing is more difficult
      </code></pre>

      <h4>Relationship-Based Access Control (ReBAC)</h4>
      <pre><code>
// ReBAC: Access based on relationships in a graph
// ================================================
// Examples: Google Drive (folder permissions), GitHub (org/team structure)

// Zanzibar-style authorization (Google's approach)
// Based on tuples: (object, relation, subject)

// Example relationships:
// (document:123, owner, user:alice)
// (document:123, viewer, user:bob)
// (folder:abc, editor, team:engineering)
// (folder:abc, parent, document:123)

class ReBAC {
  constructor(db) {
    this.db = db;
  }
  
  // Store a relationship
  async grant(object, relation, subject) {
    await this.db.relations.create({
      object,      // e.g., 'document:123'
      relation,    // e.g., 'viewer'
      subject      // e.g., 'user:alice' or 'team:engineering'
    });
  }
  
  // Remove a relationship
  async revoke(object, relation, subject) {
    await this.db.relations.deleteOne({
      object,
      relation,
      subject
    });
  }
  
  // Check if subject has relation to object
  async check(object, relation, subject) {
    // Direct check
    const direct = await this.db.relations.findOne({
      object,
      relation,
      subject
    });
    
    if (direct) return true;
    
    // Check inherited relations
    // Example: if user is in team, and team has access, user has access
    if (subject.startsWith('user:')) {
      const userId = subject.split(':')[1];
      const userTeams = await this.getUserTeams(userId);
      
      for (const team of userTeams) {
        const teamAccess = await this.db.relations.findOne({
          object,
          relation,
          subject: \`team:\${team}\`
        });
        
        if (teamAccess) return true;
      }
    }
    
    // Check parent relationships
    // Example: if user can view folder, they can view documents in folder
    const parentRelations = await this.db.relations.find({
      object,
      relation: 'parent'
    });
    
    for (const parentRel of parentRelations) {
      const hasParentAccess = await this.check(
        parentRel.subject,  // parent object
        relation,           // same permission
        subject             // same user
      );
      
      if (hasParentAccess) return true;
    }
    
    return false;
  }
  
  // Get all objects a subject has relation to
  async listObjects(relation, subject) {
    const direct = await this.db.relations.find({
      relation,
      subject
    });
    
    return direct.map(r => r.object);
  }
  
  // Get all subjects that have relation to object
  async listSubjects(object, relation) {
    const direct = await this.db.relations.find({
      object,
      relation
    });
    
    return direct.map(r => r.subject);
  }
}

// Usage example: Document sharing system
// =======================================

const rebac = new ReBAC(db);

// Alice creates a document
await rebac.grant('document:123', 'owner', 'user:alice');

// Alice shares with Bob as viewer
await rebac.grant('document:123', 'viewer', 'user:bob');

// Alice shares folder with Engineering team as editor
await rebac.grant('folder:abc', 'editor', 'team:engineering');

// Document is in folder
await rebac.grant('document:123', 'parent', 'folder:abc');

// Check access
const canBobView = await rebac.check('document:123', 'viewer', 'user:bob');
// true - direct permission

const canCharlieEdit = await rebac.check('document:123', 'editor', 'user:charlie');
// true if Charlie is in Engineering team (inherited through folder)

// Middleware for ReBAC
const requireReBAC = (relation) => {
  return async (req, res, next) => {
    const objectType = req.baseUrl.split('/')[2];  // e.g., 'documents'
    const objectId = req.params.id;
    const object = \`\${objectType}:\${objectId}\`;
    const subject = \`user:\${req.user.id}\`;
    
    const hasAccess = await rebac.check(object, relation, subject);
    
    if (!hasAccess) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    next();
  };
};

app.get('/api/documents/:id',
  authenticate,
  requireReBAC('viewer'),  // Need viewer or higher
  DocumentsController.show
);

app.put('/api/documents/:id',
  authenticate,
  requireReBAC('editor'),  // Need editor or higher
  DocumentsController.update
);

app.delete('/api/documents/:id',
  authenticate,
  requireReBAC('owner'),   // Only owner can delete
  DocumentsController.delete
);

// Permission hierarchy
// ====================

const permissionHierarchy = {
  'owner': ['editor', 'viewer'],
  'editor': ['viewer'],
  'viewer': []
};

// Check with hierarchy
async function checkWithHierarchy(object, relation, subject) {
  // Check exact permission
  if (await rebac.check(object, relation, subject)) {
    return true;
  }
  
  // Check higher permissions
  const higherPermissions = Object.keys(permissionHierarchy).filter(perm =>
    permissionHierarchy[perm].includes(relation)
  );
  
  for (const higherPerm of higherPermissions) {
    if (await rebac.check(object, higherPerm, subject)) {
      return true;
    }
  }
  
  return false;
}

// ReBAC Pros and Cons:
// ====================
// ✅ Models real-world relationships naturally
// ✅ Supports complex organizational structures
// ✅ Inheritance through relationships (folder → document)
// ✅ Easy to add/remove access (just add/remove relations)
// ✅ Can answer "What can user X access?" efficiently
// ❌ Complex to implement correctly
// ❌ Performance challenges with deep hierarchies
// ❌ Requires graph database or efficient graph traversal
// ❌ Cyclic relationships can cause issues
      </code></pre>

      <h3>3. OAuth 2.0 and OpenID Connect</h3>
      <pre><code>
// OAuth 2.0: Authorization framework
// OpenID Connect (OIDC): Authentication layer on top of OAuth 2.0
// =================================================================

// Key difference:
// OAuth 2.0: "Let this app access my Google Drive" (authorization)
// OIDC: "Tell this app who I am" (authentication)

// OAuth 2.0 Flow (Authorization Code Grant)
// ==========================================

// 1. User clicks "Login with Google"
// Client redirects to authorization server:
window.location.href = 
  'https://accounts.google.com/o/oauth2/v2/auth?' +
  'client_id=YOUR_CLIENT_ID&' +
  'redirect_uri=https://yourapp.com/callback&' +
  'response_type=code&' +
  'scope=openid email profile&' +
  'state=random_string_to_prevent_csrf';

// 2. User logs in and grants permission
// Authorization server redirects back with code:
// https://yourapp.com/callback?code=AUTH_CODE&state=random_string

// 3. Exchange code for tokens (server-side)
app.get('/callback', async (req, res) => {
  const { code, state } = req.query;
  
  // Verify state to prevent CSRF
  if (state !== req.session.oauthState) {
    return res.status(400).send('Invalid state');
  }
  
  // Exchange authorization code for tokens
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: 'https://yourapp.com/callback',
      grant_type: 'authorization_code'
    })
  });
  
  const tokens = await tokenResponse.json();
  // {
  //   access_token: "ya29.a0ARrdaM...",
  //   id_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjI3MGQzMDZjODBlNzQ...",
  //   expires_in: 3599,
  //   token_type: "Bearer",
  //   scope: "openid email profile",
  //   refresh_token: "1//0gPdHFoY7..."
  // }
  
  // Decode ID token (OIDC)
  const idToken = jwt.decode(tokens.id_token);
  // {
  //   iss: "https://accounts.google.com",
  //   sub: "110169484474386276334",
  //   email: "user@example.com",
  //   email_verified: true,
  //   name: "John Doe",
  //   picture: "https://lh3.googleusercontent.com/...",
  //   iat: 1609459200,
  //   exp: 1609462800
  // }
  
  // Create user session
  const user = await findOrCreateUser({
    googleId: idToken.sub,
    email: idToken.email,
    name: idToken.name,
    picture: idToken.picture
  });
  
  // Store tokens
  await db.oauthTokens.create({
    userId: user.id,
    provider: 'google',
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    expiresAt: new Date(Date.now() + tokens.expires_in * 1000)
  });
  
  // Create session for user
  req.session.userId = user.id;
  
  res.redirect('/dashboard');
});

// Using the access token to call Google APIs
app.get('/api/user/drive-files', authenticate, async (req, res) => {
  // Get stored access token
  const oauthToken = await db.oauthTokens.findOne({
    userId: req.user.id,
    provider: 'google'
  });
  
  if (!oauthToken) {
    return res.status(400).json({ error: 'Not connected to Google' });
  }
  
  // Check if token expired
  if (oauthToken.expiresAt < new Date()) {
    // Refresh token
    const newTokens = await refreshGoogleToken(oauthToken.refreshToken);
    // Update stored token...
  }
  
  // Call Google Drive API
  const driveResponse = await fetch(
    'https://www.googleapis.com/drive/v3/files',
    {
      headers: {
        'Authorization': \`Bearer \${oauthToken.accessToken}\`
      }
    }
  );
  
  const files = await driveResponse.json();
  res.json({ files });
});

// OAuth 2.0 Grant Types:
// ======================

// 1. Authorization Code (most common for web apps)
// - Secure: client secret not exposed to browser
// - Use for: Web applications with backend

// 2. Authorization Code with PKCE (for mobile/SPA)
// - No client secret needed
// - Use for: Mobile apps, SPAs

// 3. Client Credentials (machine-to-machine)
// - No user involved
// - Use for: Microservices, background jobs

const clientCredentialsFlow = async () => {
  const response = await fetch('https://oauth.provider.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      scope: 'api:read api:write'
    })
  });
  
  const { access_token } = await response.json();
  return access_token;
};

// 4. Resource Owner Password Credentials (legacy, avoid)
// - User sends password to app (bad for security)
// - Use for: Only when other flows impossible

// OpenID Connect (OIDC) Tokens:
// ==============================

// Access Token: For accessing APIs (OAuth 2.0)
// - Opaque or JWT
// - Short-lived (hours)
// - Used in Authorization header

// ID Token: For identifying user (OIDC)
// - Always JWT
// - Contains user identity claims
// - Not used for API access

// Refresh Token: For getting new access tokens
// - Opaque
// - Long-lived (days/weeks)
// - Stored securely, never exposed to browser

// OIDC UserInfo Endpoint:
// =======================

const getUserInfo = async (accessToken) => {
  const response = await fetch('https://accounts.google.com/userinfo', {
    headers: {
      'Authorization': \`Bearer \${accessToken}\`
    }
  });
  
  return response.json();
  // {
  //   sub: "110169484474386276334",
  //   email: "user@example.com",
  //   email_verified: true,
  //   name: "John Doe",
  //   picture: "https://..."
  // }
};

// PKCE (Proof Key for Code Exchange) for SPAs:
// =============================================

// Prevents authorization code interception attack

// 1. Generate code verifier (random string)
const codeVerifier = generateRandomString(128);

// 2. Create code challenge (SHA256 hash of verifier)
const codeChallenge = base64UrlEncode(sha256(codeVerifier));

// 3. Authorization request includes challenge
window.location.href =
  'https://auth.provider.com/authorize?' +
  'client_id=CLIENT_ID&' +
  'redirect_uri=https://app.com/callback&' +
  'response_type=code&' +
  'code_challenge=' + codeChallenge + '&' +
  'code_challenge_method=S256';

// 4. Token exchange includes verifier
const tokenResponse = await fetch('https://auth.provider.com/token', {
  method: 'POST',
  body: new URLSearchParams({
    grant_type: 'authorization_code',
    code: authCode,
    redirect_uri: 'https://app.com/callback',
    client_id: 'CLIENT_ID',
    code_verifier: codeVerifier  // Proves we initiated the request
  })
});
      </code></pre>

      <h3>4. Advanced Security Patterns</h3>

      <h4>JWT Revocation Strategies</h4>
      <pre><code>
// Problem: JWTs are valid until expiration
// How do we revoke them immediately?
// ========================================

// Strategy 1: Short-lived JWTs + Refresh Tokens
// ==============================================
// - Access token: 5-15 minutes
// - Refresh token: 7 days (stored in database)
// - On revocation: Delete refresh token
// - User must re-login within 15 minutes max

// Strategy 2: Token Blacklist
// ============================

class TokenBlacklist {
  constructor(redis) {
    this.redis = redis;
  }
  
  async revoke(token) {
    const decoded = jwt.decode(token);
    const ttl = decoded.exp - Math.floor(Date.now() / 1000);
    
    if (ttl > 0) {
      // Store token ID until expiration
      await this.redis.set(
        \`blacklist:\${decoded.jti}\`,
        'revoked',
        'EX',
        ttl
      );
    }
  }
  
  async isRevoked(token) {
    const decoded = jwt.decode(token);
    const revoked = await this.redis.get(\`blacklist:\${decoded.jti}\`);
    return revoked === 'revoked';
  }
}

// Middleware with blacklist check
const authenticateWithBlacklist = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check blacklist
    if (await tokenBlacklist.isRevoked(token)) {
      return res.status(401).json({ error: 'Token revoked' });
    }
    
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Strategy 3: Version/Generation Number
// ======================================

// Store a "token version" in user record
// Increment on password change, logout all devices, etc.

const userSchema = {
  id: 'user123',
  username: 'john',
  tokenVersion: 5  // Incremented on security events
};

// Include version in JWT
const createToken = (user) => {
  return jwt.sign(
    {
      sub: user.id,
      username: user.username,
      tokenVersion: user.tokenVersion
    },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );
};

// Validate version in middleware
const authenticateWithVersion = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
  const user = await db.users.findById(decoded.sub);
  
  if (user.tokenVersion !== decoded.tokenVersion) {
    return res.status(401).json({ error: 'Token invalidated' });
  }
  
  req.user = user;
  next();
};

// On password change: increment version
const changePassword = async (userId, newPassword) => {
  await db.users.updateOne(
    { id: userId },
    {
      passwordHash: await bcrypt.hash(newPassword, 10),
      $inc: { tokenVersion: 1 }  // Invalidates all existing tokens
    }
  );
};

// Strategy 4: Sliding Session with Redis
// =======================================

class SlidingSession {
  constructor(redis) {
    this.redis = redis;
  }
  
  async create(userId) {
    const sessionId = uuidv4();
    const token = jwt.sign(
      {
        sub: userId,
        sid: sessionId,
        type: 'access'
      },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );
    
    // Store session in Redis with 30 min TTL
    await this.redis.set(
      \`session:\${sessionId}\`,
      JSON.stringify({ userId, createdAt: Date.now() }),
      'EX',
      30 * 60
    );
    
    return token;
  }
  
  async validate(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if session exists in Redis
    const session = await this.redis.get(\`session:\${decoded.sid}\`);
    
    if (!session) {
      throw new Error('Session expired or revoked');
    }
    
    // Extend session TTL on activity (sliding window)
    await this.redis.expire(\`session:\${decoded.sid}\`, 30 * 60);
    
    return JSON.parse(session);
  }
  
  async revoke(sessionId) {
    await this.redis.del(\`session:\${sessionId}\`);
  }
}
      </code></pre>

      <h4>The Confused Deputy Problem</h4>
      <pre><code>
// The Confused Deputy: When a service acts on behalf of a user
// without properly checking permissions
// ==============================================================

// ❌ Vulnerable Code:
app.delete('/api/files/:id', authenticate, async (req, res) => {
  const fileId = req.params.id;
  
  // Service deletes file without checking if user owns it
  await fileService.delete(fileId);  // ❌ Confused deputy!
  
  res.json({ success: true });
});

// Problem: User can delete ANY file by guessing IDs

// ✅ Fixed Code:
app.delete('/api/files/:id', authenticate, async (req, res) => {
  const fileId = req.params.id;
  const file = await db.files.findById(fileId);
  
  // Check ownership
  if (file.ownerId !== req.user.id) {
    return res.status(403).json({ error: 'Not your file' });
  }
  
  await fileService.delete(fileId);
  res.json({ success: true });
});

// Better: Scope queries to user
app.delete('/api/files/:id', authenticate, async (req, res) => {
  const result = await db.files.deleteOne({
    id: req.params.id,
    ownerId: req.user.id  // Only delete if owned by user
  });
  
  if (result.deletedCount === 0) {
    return res.status(404).json({ error: 'File not found' });
  }
  
  res.json({ success: true });
});

// Service-to-Service Communication:
// ==================================

// When Service A calls Service B on behalf of a user,
// Service B must validate the user's permission, not just Service A's

// ❌ Bad: Service A's credentials used
const deleteFile = async (fileId) => {
  // Service A has admin credentials
  await fetch(\`http://file-service/files/\${fileId}\`, {
    method: 'DELETE',
    headers: {
      'Authorization': \`Bearer \${SERVICE_A_TOKEN}\`  // ❌ Admin token
    }
  });
};

// ✅ Good: User's token delegated
const deleteFile = async (fileId, userToken) => {
  // Pass through user's token
  await fetch(\`http://file-service/files/\${fileId}\`, {
    method: 'DELETE',
    headers: {
      'Authorization': \`Bearer \${userToken}\`,  // ✅ User's token
      'X-Service-Identity': SERVICE_A_TOKEN       // Service's identity
    }
  });
};

// File service validates BOTH:
app.delete('/files/:id', async (req, res) => {
  // 1. Validate service identity
  const serviceToken = req.headers['x-service-identity'];
  const service = await validateServiceToken(serviceToken);
  
  // 2. Validate user permission
  const userToken = req.headers['authorization'].split(' ')[1];
  const user = await validateUserToken(userToken);
  
  const file = await db.files.findById(req.params.id);
  
  if (file.ownerId !== user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  await db.files.deleteOne({ id: req.params.id });
  res.json({ success: true });
});
      </code></pre>

      <h4>Rate Limiting and Brute Force Protection</h4>
      <pre><code>
// Protect authentication endpoints from brute force attacks
// ==========================================================

const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');

// Basic rate limiting
const loginLimiter = rateLimit({
  store: new RedisStore({
    client: redisClient,
    prefix: 'rl:login:'
  }),
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 5,                     // 5 attempts per window
  message: 'Too many login attempts, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

app.post('/auth/login', loginLimiter, async (req, res) => {
  // Login logic
});

// Progressive delay (exponential backoff)
class ProgressiveRateLimiter {
  constructor(redis) {
    this.redis = redis;
  }
  
  async checkAndDelay(key) {
    const attempts = await this.redis.incr(\`attempts:\${key}\`);
    
    if (attempts === 1) {
      // Set expiration on first attempt
      await this.redis.expire(\`attempts:\${key}\`, 15 * 60);
    }
    
    if (attempts > 5) {
      // Calculate delay: 2^(attempts-5) seconds
      const delay = Math.pow(2, attempts - 5) * 1000;
      const maxDelay = 60000; // 1 minute max
      
      await new Promise(resolve => 
        setTimeout(resolve, Math.min(delay, maxDelay))
      );
    }
  }
}

// Account lockout after multiple failures
class AccountLockout {
  constructor(db, redis) {
    this.db = db;
    this.redis = redis;
  }
  
  async recordFailedAttempt(username) {
    const key = \`failed:\${username}\`;
    const attempts = await this.redis.incr(key);
    
    if (attempts === 1) {
      await this.redis.expire(key, 15 * 60);
    }
    
    if (attempts >= 10) {
      // Lock account
      await this.db.users.updateOne(
        { username },
        { 
          locked: true,
          lockedAt: new Date(),
          lockedReason: 'Too many failed login attempts'
        }
      );
      
      // Send alert email
      await sendSecurityAlert(username, 'account_locked');
    }
    
    return attempts;
  }
  
  async clearFailedAttempts(username) {
    await this.redis.del(\`failed:\${username}\`);
  }
  
  async isLocked(username) {
    const user = await this.db.users.findOne({ username });
    return user?.locked === true;
  }
}

// Usage in login
app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  
  // Check if account is locked
  if (await accountLockout.isLocked(username)) {
    return res.status(423).json({ 
      error: 'Account locked',
      message: 'Please contact support to unlock your account'
    });
  }
  
  const user = await db.users.findOne({ username });
  const isValid = user && await bcrypt.compare(password, user.passwordHash);
  
  if (!isValid) {
    const attempts = await accountLockout.recordFailedAttempt(username);
    const remaining = 10 - attempts;
    
    return res.status(401).json({ 
      error: 'Invalid credentials',
      attemptsRemaining: remaining > 0 ? remaining : 0
    });
  }
  
  // Success - clear failed attempts
  await accountLockout.clearFailedAttempts(username);
  
  // Create session...
});
      </code></pre>

      <h3>5. Best Practices and Common Pitfalls</h3>
      <pre><code>
// Best Practices Checklist:
// =========================

// ✅ Authentication
// 1. Always use HTTPS
// 2. Hash passwords with bcrypt (cost factor 10-12)
// 3. Use httpOnly, secure, sameSite cookies
// 4. Implement rate limiting on login endpoints
// 5. Lock accounts after multiple failed attempts
// 6. Use strong session IDs (cryptographically random)
// 7. Regenerate session ID after login (prevent session fixation)
// 8. Set appropriate session timeouts
// 9. Implement "remember me" securely (separate long-lived token)
// 10. Use 2FA/MFA for sensitive accounts

// ✅ Authorization
// 1. Always check permissions at the resource level
// 2. Default deny (whitelist, not blacklist)
// 3. Validate user owns resource before operations
// 4. Don't rely on client-side checks (always validate server-side)
// 5. Use principle of least privilege
// 6. Separate AuthN and AuthZ concerns
// 7. Audit permission changes
// 8. Cache permissions appropriately (invalidate on change)
// 9. Test negative cases (unauthorized access)
// 10. Log authorization failures for security monitoring

// ✅ JWT
// 1. Use short expiration times (5-15 minutes)
// 2. Don't put sensitive data in payload (it's not encrypted)
// 3. Always verify signature
// 4. Use refresh tokens for long-lived sessions
// 5. Store JWTs in httpOnly cookies, not localStorage
// 6. Include 'jti' (JWT ID) for revocation
// 7. Use 'aud' (audience) claim to prevent token misuse
// 8. Rotate signing keys periodically
// 9. Use asymmetric keys (RS256) for microservices
// 10. Set 'nbf' (not before) to prevent token replay

// Common Security Pitfalls:
// =========================

// ❌ Pitfall 1: Storing passwords in plaintext
const badLogin = async (username, password) => {
  const user = await db.users.findOne({ username });
  return user.password === password;  // ❌ Never do this!
};

// ✅ Use bcrypt
const goodLogin = async (username, password) => {
  const user = await db.users.findOne({ username });
  return bcrypt.compare(password, user.passwordHash);
};

// ❌ Pitfall 2: Timing attacks on password comparison
const vulnerableCompare = (a, b) => {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;  // ❌ Exits early
  }
  return true;
};

// ✅ Use constant-time comparison
const crypto = require('crypto');
const safeCompare = (a, b) => {
  return crypto.timingSafeEqual(
    Buffer.from(a),
    Buffer.from(b)
  );
};

// ❌ Pitfall 3: SQL injection in authentication
const sqlInjectionVulnerable = async (username, password) => {
  const query = \`SELECT * FROM users WHERE username = '\${username}' AND password = '\${password}'\`;
  // ❌ Attacker can use: username = "admin'--"
  const result = await db.query(query);
  return result.rows[0];
};

// ✅ Use parameterized queries
const sqlInjectionSafe = async (username, password) => {
  const query = 'SELECT * FROM users WHERE username = $1';
  const result = await db.query(query, [username]);
  return result.rows[0];
};

// ❌ Pitfall 4: Not checking resource ownership
app.delete('/api/posts/:id', authenticate, async (req, res) => {
  await db.posts.deleteOne({ id: req.params.id });  // ❌ Anyone can delete
  res.json({ success: true });
});

// ✅ Always check ownership
app.delete('/api/posts/:id', authenticate, async (req, res) => {
  const result = await db.posts.deleteOne({
    id: req.params.id,
    userId: req.user.id  // ✅ Only owner can delete
  });
  
  if (result.deletedCount === 0) {
    return res.status(404).json({ error: 'Post not found' });
  }
  
  res.json({ success: true });
});

// ❌ Pitfall 5: Insecure direct object references (IDOR)
app.get('/api/invoices/:id', authenticate, async (req, res) => {
  const invoice = await db.invoices.findById(req.params.id);
  res.json({ invoice });  // ❌ Returns ANY invoice
});

// ✅ Scope to user
app.get('/api/invoices/:id', authenticate, async (req, res) => {
  const invoice = await db.invoices.findOne({
    id: req.params.id,
    userId: req.user.id  // ✅ Only user's invoices
  });
  
  if (!invoice) {
    return res.status(404).json({ error: 'Invoice not found' });
  }
  
  res.json({ invoice });
});

// ❌ Pitfall 6: Missing authorization on API routes
app.get('/api/admin/users', async (req, res) => {
  const users = await db.users.find();  // ❌ No auth check!
  res.json({ users });
});

// ✅ Always check permissions
app.get('/api/admin/users', authenticate, requireRole(['admin']), async (req, res) => {
  const users = await db.users.find();
  res.json({ users });
});

// ❌ Pitfall 7: Trusting client-sent user IDs
app.post('/api/orders', async (req, res) => {
  const { userId, items } = req.body;  // ❌ User can fake their ID
  await db.orders.create({ userId, items });
});

// ✅ Use authenticated user ID
app.post('/api/orders', authenticate, async (req, res) => {
  const { items } = req.body;
  await db.orders.create({ 
    userId: req.user.id,  // ✅ From verified token
    items 
  });
});

// ❌ Pitfall 8: Exposing sensitive data in JWTs
const token = jwt.sign({
  userId: user.id,
  email: user.email,
  ssn: user.ssn,           // ❌ Sensitive data in token
  creditCard: user.cc      // ❌ Never do this!
}, secret);

// ✅ Only include necessary claims
const token = jwt.sign({
  sub: user.id,
  email: user.email,
  roles: user.roles        // ✅ Only non-sensitive data
}, secret);

// ❌ Pitfall 9: Not validating redirect URLs (open redirect)
app.get('/login', (req, res) => {
  const redirect = req.query.redirect;
  // After login:
  res.redirect(redirect);  // ❌ Can redirect to evil.com
});

// ✅ Whitelist allowed redirects
const allowedRedirects = ['/dashboard', '/profile', '/settings'];

app.get('/login', (req, res) => {
  const redirect = req.query.redirect;
  
  if (!allowedRedirects.includes(redirect)) {
    return res.redirect('/dashboard');  // ✅ Safe default
  }
  
  res.redirect(redirect);
});

// ❌ Pitfall 10: Session fixation
app.post('/login', async (req, res) => {
  const user = await verifyCredentials(req.body);
  req.session.userId = user.id;  // ❌ Reuses existing session ID
  res.json({ success: true });
});

// ✅ Regenerate session after login
app.post('/login', async (req, res) => {
  const user = await verifyCredentials(req.body);
  
  req.session.regenerate((err) => {  // ✅ New session ID
    req.session.userId = user.id;
    res.json({ success: true });
  });
});
      </code></pre>
    </div>
  `,

            examples: [
              "Session-based authentication with bcrypt password hashing",
              "JWT authentication with access and refresh tokens",
              "RBAC middleware with role hierarchy and permission checking",
              "ABAC policy engine for context-aware authorization",
              "ReBAC with relationship graphs for document sharing",
              "OAuth 2.0 authorization code flow with PKCE",
              "OpenID Connect for SSO authentication",
              "JWT revocation using blacklist and version numbers",
              "Confused deputy prevention in microservices",
              "Rate limiting and brute force protection for login",
              "Progressive rate limiting with exponential backoff",
              "Account lockout after multiple failed attempts",
            ],

            questions: [
              {
                question:
                  "What is the difference between authentication and authorization?",
                difficulty: "Basic",
                category: "Fundamentals",
                answer:
                  "Authentication (AuthN) is proving who you are - verifying your identity. Examples: Login with username/password, biometric scan, SSO. Authorization (AuthZ) is determining what you can do - checking permissions after identity is established. Examples: Can you delete this file? Can you view this report? Real-world analogy: Authentication is showing your ID at airport security (proves identity), Authorization is your boarding pass (proves you can board a specific flight). Common misconception: Being authenticated doesn't mean you have permission to do everything. The flow: User authenticates → identity established → user requests action → system checks authorization → access granted or denied. In code: authenticate() verifies token (401 if fails), authorize() checks permissions (403 if insufficient). Status codes: 401 Unauthorized = authentication failed ('who are you?'), 403 Forbidden = authenticated but not authorized ('you can't do this').",
              },
              {
                question:
                  "What are the pros and cons of session-based vs token-based authentication?",
                difficulty: "Basic",
                category: "Authentication Strategies",
                answer:
                  "Session-based: Server stores session state in database/Redis, sends session ID in cookie. Pros: Easy to revoke (delete from storage), can store additional session data, full control over sessions, simple server-side logic. Cons: Requires server-side storage, doesn't scale horizontally without shared storage (Redis), requires CSRF protection, harder for mobile apps. Token-based (JWT): Server issues signed token, client stores it, server validates signature. Pros: Stateless (no storage needed), scales horizontally (any server can verify), works across domains, mobile-friendly, microservices-friendly. Cons: Hard to revoke before expiration, token size grows with claims, can't update claims without new token, vulnerable to XSS if stored in localStorage. Best practice: Use short-lived JWTs (15min) with long-lived refresh tokens (7 days) stored server-side. Combines stateless performance with revocation capability. For traditional web apps, sessions are simpler. For APIs, microservices, mobile apps, use JWTs.",
              },
              {
                question: "How does JWT work and what are its components?",
                difficulty: "Basic",
                category: "JWT",
                answer:
                  "JWT (JSON Web Token) consists of three parts separated by dots: Header.Payload.Signature. Header contains algorithm (e.g., HS256, RS256) and token type. Payload contains claims (data): sub (subject/user ID), exp (expiration), iat (issued at), custom claims like roles. Signature verifies integrity: HMACSHA256(base64(header) + '.' + base64(payload), secret). Process: 1) User logs in, 2) Server creates JWT with user data, signs with secret, 3) Client stores token, 4) Client sends token in Authorization header, 5) Server verifies signature and expiration, 6) If valid, grants access. Important: Payload is base64-encoded, NOT encrypted - anyone can decode and read it. Don't put secrets in payload. Signature prevents tampering - if payload changes, signature won't match. Use short expiration (5-15min) to limit damage if stolen. For microservices, use asymmetric keys (RS256) so services can verify without sharing secret.",
              },
              {
                question: "What is the purpose of refresh tokens?",
                difficulty: "Intermediate",
                category: "Token Management",
                answer:
                  "Refresh tokens solve the UX vs security trade-off. Short-lived access tokens (15min) are secure but require frequent re-authentication. Long-lived tokens (days) avoid re-login but are risky if stolen. Refresh tokens provide both: Short access token for API requests (stateless, fast), long refresh token for getting new access tokens (stored server-side, revocable). Flow: 1) Login returns both tokens, 2) Client uses access token for requests, 3) When access token expires, client calls /refresh with refresh token, 4) Server validates refresh token (checks database), 5) If valid, issues new access token, 6) Client continues using new access token. Security: Refresh tokens stored in database with user ID, can be revoked immediately (logout, password change), require database lookup (slower but necessary), typically httpOnly cookie to prevent XSS. On logout: Delete refresh token from database. On password change: Delete all refresh tokens for user. This invalidates all sessions immediately while keeping access tokens fast and stateless.",
              },
              {
                question: "How do you revoke JWTs before they expire?",
                difficulty: "Intermediate",
                category: "JWT",
                answer:
                  "JWTs are stateless and valid until expiration, making revocation challenging. Solutions: 1) Short expiration + refresh tokens: Use 5-15min access tokens. On revocation, delete refresh token. User re-authenticates within 15min max. Simple but not immediate. 2) Token blacklist: Store revoked JWT IDs (jti claim) in Redis with TTL matching token expiration. Middleware checks blacklist on each request. Adds network hop but gives immediate control. 3) Token version: Store version number in user record, include in JWT. Increment version on security events (logout, password change). Middleware compares JWT version with user's current version. Reject if mismatched. 4) Sliding session: Store session ID in Redis with JWT. Extend TTL on activity. Delete from Redis to revoke. Hybrid approach. 5) Key rotation: Rotate signing keys to invalidate ALL tokens. Nuclear option for breaches. Best practice: Use short JWTs with refresh tokens for normal use. Add blacklist for critical immediate revocation (fraud, breach). Monitor revocation rate - high rate indicates UX issues.",
              },
              {
                question:
                  "What's the difference between RBAC, ABAC, and ReBAC?",
                difficulty: "Intermediate",
                category: "Authorization Models",
                answer:
                  "RBAC (Role-Based): Users assigned roles, roles have permissions. Example: 'Admins can delete posts'. Pros: Simple, easy to audit ('who has admin?'), efficient. Cons: Doesn't handle ownership ('can edit MY posts only'), role explosion for complex rules, no context awareness. Use for: Clear hierarchies, static permissions. ABAC (Attribute-Based): Access based on attributes of user, resource, environment. Example: 'Users can edit posts if they own them AND post created <24h ago AND access from VPN'. Pros: Fine-grained, context-aware (time, location), fewer roles. Cons: Complex to implement and audit ('who can access X?'), harder to test, performance cost. Use for: Dynamic rules, ownership, environmental factors. ReBAC (Relationship-Based): Access based on relationships in a graph. Example: 'User can edit document if they are editor of parent folder'. Pros: Models real-world relationships naturally (Google Drive), supports inheritance, easy to add/remove access. Cons: Complex implementation, performance with deep hierarchies, requires graph traversal. Use for: Document sharing, organizational hierarchies, social networks. Most real apps use hybrid: RBAC for high-level roles, ABAC for resource-specific rules, ReBAC for hierarchical structures.",
              },
              {
                question: "Explain OAuth 2.0 vs OpenID Connect (OIDC).",
                difficulty: "Intermediate",
                category: "OAuth & OIDC",
                answer:
                  "OAuth 2.0 is an authorization framework - it grants access to resources without sharing passwords. Example: 'Let this app access my Google Drive'. It provides Access Token for API authorization but doesn't identify the user. OpenID Connect (OIDC) is an authentication layer built on top of OAuth 2.0 - it proves identity. Example: 'Tell this app who I am'. It provides ID Token (JWT) containing user identity claims. Analogy: OAuth is valet key (permission to drive car but doesn't say who you are), OIDC is driver's license (proves identity). Tokens: OAuth returns access_token (opaque or JWT) for API access. OIDC returns id_token (always JWT) with user info (sub, email, name) plus access_token. Flow: Same OAuth 2.0 flow but scope includes 'openid'. Authorization server returns both tokens. Use OAuth when: Third-party app needs API access (not identity). Use OIDC when: Single sign-on, need user info, social login. Most 'Login with Google' implementations use OIDC to get both identity and API access. OIDC also provides UserInfo endpoint to get additional user details using access token.",
              },
              {
                question:
                  "What is the Confused Deputy problem and how do you prevent it?",
                difficulty: "Advanced",
                category: "Security",
                answer:
                  "The Confused Deputy problem occurs when a service performs an action on behalf of a user without properly checking if the user has permission for that specific resource. Example: User calls API to delete file ID 123. Service deletes file without checking if user owns it. User can delete ANY file by guessing IDs. This is an Insecure Direct Object Reference (IDOR) vulnerability. Prevention: 1) Always check resource ownership at point of access. Query with user ID: db.files.deleteOne({ id: fileId, userId: req.user.id }). 2) Scope all queries to authenticated user - never trust client-sent IDs. 3) Implement authorization checks in service layer, not just controller. Microservices scenario: Service A calls Service B on behalf of user. Service A has admin credentials. Bad: Service A uses its credentials. Service B performs action with admin rights. User bypasses their actual permissions. Good: Service A delegates user's token to Service B. Service B validates both service identity AND user permission. Service B checks if user owns resource before acting. Key principle: Always validate permissions at the resource access point, using the original user's context, not the calling service's elevated privileges.",
              },
              {
                question: "How do you implement secure password storage?",
                difficulty: "Intermediate",
                category: "Security",
                answer:
                  "Never store passwords in plaintext or encrypt them - use one-way hashing with bcrypt. Process: 1) User registers with password, 2) Hash with bcrypt (salt is automatic): hash = await bcrypt.hash(password, 10), 3) Store hash in database, 4) On login, compare: isValid = await bcrypt.compare(inputPassword, storedHash). Why bcrypt: Built-in salt (prevents rainbow tables), slow by design (prevents brute force), configurable cost factor (10-12 recommended, increases with hardware), automatically handles salt generation and verification. DON'T: Use MD5/SHA-1/SHA-256 (too fast, enables brute force), encrypt passwords (encryption is reversible), use same salt for all passwords, store salt separately when using bcrypt (it's embedded in hash). DO: Use bcrypt or Argon2 (winner of password hashing competition), cost factor 10-12 (balance security vs performance), hash on server-side only (never trust client hashing), implement rate limiting on login, require strong passwords (length > strength), use password strength meter, implement account lockout after failed attempts. Additional security: Pepper (secret key in environment, added before hashing), require password change on breach detection, check against known breached passwords (HaveIBeenPwned API).",
              },
              {
                question:
                  "What are common authentication vulnerabilities and how do you prevent them?",
                difficulty: "Advanced",
                category: "Security",
                answer:
                  "1) Timing attacks: String comparison exits early on mismatch, reveals password length. Fix: Use crypto.timingSafeEqual for constant-time comparison. 2) SQL injection in login: 'admin'-- as username bypasses password check. Fix: Use parameterized queries always. 3) Brute force: Try many passwords quickly. Fix: Rate limiting (5 attempts per 15min), progressive delays, account lockout, CAPTCHA. 4) Session fixation: Attacker sets victim's session ID before login. Fix: Regenerate session ID after successful login. 5) Credential stuffing: Use leaked credentials from other breaches. Fix: Check against breach databases, require strong unique passwords, implement 2FA. 6) CSRF: Trick authenticated user into unwanted actions. Fix: CSRF tokens, SameSite cookies, verify origin header. 7) XSS token theft: JavaScript steals tokens from localStorage. Fix: Store tokens in httpOnly cookies, implement CSP headers. 8) Phishing: Fake login pages. Fix: User education, 2FA, certificate pinning. 9) Man-in-the-middle: Intercept credentials. Fix: Enforce HTTPS only, HSTS headers. 10) Privilege escalation: Change role in JWT payload. Fix: Always verify signature, don't trust client data, check permissions server-side. Defense in depth: Combine multiple protections, monitor failed attempts, log security events, implement anomaly detection, regular security audits.",
              },
              {
                question:
                  "How do you handle authentication in a microservices architecture?",
                difficulty: "Advanced",
                category: "Architecture",
                answer:
                  "Challenges: Multiple services need to verify identity, avoid duplicating authentication logic, maintain security across services. Solutions: 1) API Gateway pattern: Gateway handles authentication, verifies tokens, forwards user context to services via headers. Services trust gateway. Pros: Centralized auth, services simpler. Cons: Gateway is single point of failure, trust boundary. 2) Service mesh: Sidecar proxy (Istio, Linkerd) handles auth/authz, mutual TLS between services, policy enforcement at proxy level. Pros: Consistent security, encrypted service-to-service, language-agnostic. Cons: Complexity, performance overhead. 3) JWT propagation: Gateway issues JWT, services validate independently using shared public key (RS256). Include user ID, roles in claims. Pros: Services are autonomous, no gateway dependency for validation. Cons: Key distribution, revocation complexity. Best practice: Combine patterns - Gateway authenticates users, issues JWT, services validate JWT for authorization. Use short-lived tokens (5-15min). Service-to-service: Separate tokens (service credentials) from user tokens. Include both in calls: User token for authorization, service token for authentication. Security: Use mutual TLS between services, rotate keys regularly, implement token introspection for sensitive operations, zero trust - verify at every boundary, implement distributed tracing for debugging, monitor anomalous patterns.",
              },
              {
                question: "What is PKCE and why is it important for SPAs?",
                difficulty: "Advanced",
                category: "OAuth & OIDC",
                answer:
                  "PKCE (Proof Key for Code Exchange, RFC 7636) prevents authorization code interception in OAuth 2.0. Problem: In traditional OAuth, authorization code can be intercepted and exchanged by attacker. Critical for native apps and SPAs (no client secret). PKCE solution: 1) App generates random code_verifier (128-char string), 2) Creates code_challenge = SHA256(code_verifier) base64-encoded, 3) Sends code_challenge with authorization request, 4) Auth server stores challenge with authorization code, 5) App receives authorization code, 6) App exchanges code + code_verifier for tokens, 7) Auth server verifies SHA256(code_verifier) matches stored challenge, 8) If match, returns tokens. Security: Even if attacker steals authorization code, they can't exchange it without code_verifier (which never left the app). Why important for SPAs: SPAs can't securely store client secret (JavaScript is public), PKCE provides security without secret, prevents authorization code interception attacks, required by OAuth 2.0 for public clients. Implementation: Use crypto library to generate verifier, compute challenge (S256 method preferred over 'plain'), store verifier in memory/session, include in token exchange. Modern best practice: Use PKCE for ALL OAuth flows, even with client secret (defense in depth), required for mobile apps, recommended for SPAs.",
              },
              {
                question:
                  "How do you implement rate limiting for authentication endpoints?",
                difficulty: "Advanced",
                category: "Security",
                answer:
                  "Rate limiting prevents brute force attacks on login. Strategies: 1) Fixed window: Max N attempts per time window (e.g., 5 attempts per 15 minutes). Simple but allows burst at window boundary. Implementation: Use Redis INCR with expiry. 2) Sliding window: Track attempts with timestamps, count in rolling window. More accurate but complex. 3) Token bucket: Refill tokens over time, consume on request. Smooth rate limiting. 4) Progressive/exponential backoff: Delay increases with attempts. 1st fail = instant, 5th fail = 2s delay, 10th fail = 1min delay. Formula: delay = 2^(attempts - threshold) seconds. Forces attacker to slow down dramatically. 5) Account lockout: After N failed attempts (e.g., 10), lock account for duration or until manual unlock. Send security alert email. Combination approach: Use both IP-based and account-based limits. IP limit: 20 attempts per 15min (prevents distributed attack), Account limit: 5 attempts per 15min (protects specific account), After 10 failures: Lock account. Implementation with Redis: Store attempt count: INCR 'attempts:username', Set expiry on first attempt: EXPIRE 'attempts:username' 900, Check count before allowing attempt, Clear on successful login: DEL 'attempts:username'. Advanced: Implement CAPTCHA after N failures, use machine learning to detect patterns, block known malicious IPs, implement honeypot accounts, alert on suspicious patterns (many users, same IP).",
              },
              {
                question:
                  "What are the security implications of storing JWTs in localStorage vs cookies?",
                difficulty: "Advanced",
                category: "Security",
                answer:
                  "localStorage: Accessible via JavaScript (document.localStorage). Vulnerable to XSS (Cross-Site Scripting). If attacker injects malicious script, they can steal token: localStorage.getItem('token'). Send to attacker's server. Persists across tabs and sessions. Not sent automatically with requests (must add manually). Pros: Simple, CORS-friendly, works with all frameworks. Cons: XSS vulnerability (critical), no built-in expiration, survives browser restart. Cookies (httpOnly, secure, sameSite): Not accessible via JavaScript. Immune to XSS (httpOnly flag). Automatically sent with requests. Vulnerable to CSRF (but mitigated with sameSite). Pros: XSS protection, automatic transmission, built-in expiration, secure flag for HTTPS-only, sameSite prevents CSRF. Cons: 4KB size limit, CSRF if not configured properly, subdomain sharing issues. Best practice: Store access token in memory (React state), store refresh token in httpOnly cookie. On page refresh: Use refresh token to get new access token. Benefits: Access token never persisted (memory only), refresh token safe from XSS, logout invalidates refresh token. Alternative: Store JWT in httpOnly cookie with sameSite='strict', use CSRF token for state-changing requests, implement double submit cookie pattern. Never: Store tokens in localStorage for production apps, log tokens to console, send tokens in URL parameters, store long-lived tokens client-side without encryption.",
              },
              {
                question:
                  "How do you implement multi-factor authentication (MFA)?",
                difficulty: "Advanced",
                category: "Authentication",
                answer:
                  "MFA requires multiple proof factors: Something you know (password), something you have (phone, token), something you are (biometric). Common implementations: 1) TOTP (Time-based One-Time Password): Use authenticator app (Google Authenticator). Setup: Generate secret key, store in database, show QR code to user, user scans with app. Login: User enters password + 6-digit code. Server validates: const isValid = speakeasy.totp.verify({ secret: user.mfaSecret, encoding: 'base32', token: userCode, window: 1 }). Code changes every 30 seconds. 2) SMS codes: Send code via SMS to registered phone. Security concerns: SIM swapping attacks, SMS interception. Use only as fallback. 3) Email codes: Send code to registered email. Similar to SMS but more reliable. 4) Backup codes: Generate one-time codes during MFA setup. User stores securely. Allow login if authenticator lost. 5) Hardware tokens (U2F/WebAuthn): Physical USB keys (YubiKey). Highest security. Implementation flow: Setup: User enables MFA, generate secret, show QR + backup codes, verify with test code, mark account as MFA-enabled. Login: Verify password first, if MFA enabled prompt for code, verify code (allow 1 time window for clock skew), create session. Recovery: Allow backup codes, email verification for account recovery, admin reset (with verification). Security: Rate limit MFA attempts (prevent brute force), invalidate backup codes after use, log all MFA events, require MFA for sensitive operations (even if already logged in), support multiple methods (TOTP + backup codes).",
              },
              {
                question:
                  "What is the principle of least privilege and how does it apply to authorization?",
                difficulty: "Intermediate",
                category: "Authorization Principles",
                answer:
                  "Principle of Least Privilege (PoLP): Users/services should have minimum permissions needed to perform their tasks. Nothing more. Application: 1) Default deny: Start with no permissions, explicitly grant what's needed. Never default to 'allow all'. 2) Role granularity: Don't make everyone admin. Create specific roles: viewer, editor, admin. Grant based on job function. 3) Time-limited access: Temporary elevated permissions for specific tasks. Auto-revoke after period. Example: 'Approve invoices for 24 hours'. 4) Scope permissions: 'Can edit documents in Marketing folder' not 'Can edit all documents'. 5) Service accounts: Background jobs have own limited credentials. Don't use admin account for cron jobs. 6) Database access: App uses DB user with minimal permissions (SELECT, INSERT on specific tables). Not root/admin. 7) API permissions: OAuth scopes limit what third-party apps can access. 'Read calendar' not 'Full account access'. Implementation: Regular permission audits (remove unused access), just-in-time access (request temporary elevation), separate read/write permissions, implement approval workflows for sensitive operations, log permission changes, review logs for anomalies. Real-world example: Developer needs to debug production issue. Don't: Give permanent production admin access. Do: Grant 4-hour read-only access to logs, automatically revoke, log all access. Benefits: Limits blast radius of compromised accounts, reduces insider threat risk, compliance requirements (SOC2, PCI-DSS), easier to audit, forces documentation of required permissions.",
              },
              {
                question: "How do you handle authorization in a GraphQL API?",
                difficulty: "Advanced",
                category: "GraphQL",
                answer:
                  "GraphQL authorization challenges: Single endpoint (can't use URL-based protection), nested queries (complex permission checks), field-level authorization needed. Strategies: 1) Schema directives: Define authorization rules in schema. @auth(requires: 'admin'), @hasRole(role: 'editor'). Pros: Declarative, clear from schema. Cons: Limited logic, must implement directive resolver. 2) Resolver-level checks: Check permissions in each resolver. typeDefs: type Query { sensitiveData: String }, resolvers: { Query: { sensitiveData: (parent, args, context) => { if (!context.user.roles.includes('admin')) throw new AuthorizationError(); return getData(); } } }. Pros: Flexible, can use any logic. Cons: Repetitive, easy to forget. 3) Middleware/wrapper pattern: Wrap resolvers with authorization logic. const requireAuth = (next) => (root, args, context, info) => { if (!context.user) throw new AuthenticationError(); return next(root, args, context, info); }. Apply to resolvers: Query: { posts: requireAuth(requireRole(['editor'])(postsResolver)) }. 4) Field-level security: Check each field individually. User can see post.title but not post.authorEmail. Implement in resolver: User: { email: (parent, args, context) => { if (context.user.id !== parent.id && !context.user.admin) return null; return parent.email; } }. Best practices: Authenticate at server middleware (before GraphQL), attach user to context, implement authorization in resolvers or directives, handle N+1 permission checks with DataLoader, return null or error for unauthorized fields (schema decision), log authorization failures, test with various user roles, use GraphQL shield library for declarative rules. Rate limiting: Complexity-based (deep nesting), depth limiting (prevent expensive queries), field-level limiting.",
              },
              {
                question:
                  "What are JWT claims and which ones are important for security?",
                difficulty: "Intermediate",
                category: "JWT",
                answer:
                  "JWT claims are statements about an entity (typically user). Three types: Registered (standard), Public (custom but registered), Private (custom for your app). Important registered claims: 1) iss (Issuer): Who created the token. Prevents token misuse across systems. Verify: if (decoded.iss !== 'https://auth.yourapp.com') reject. 2) sub (Subject): User ID. Primary identifier. Never changes for user. 3) aud (Audience): Who the token is intended for. Prevents one service accepting another service's tokens. Verify: if (!decoded.aud.includes('api.yourapp.com')) reject. 4) exp (Expiration): Unix timestamp when token expires. Mandatory for security. Verify automatically: jwt.verify() checks this. Use short times (5-15min). 5) nbf (Not Before): Token invalid before this time. Prevents token replay, allows future-dated tokens. 6) iat (Issued At): Creation timestamp. For tracking token age, debugging. 7) jti (JWT ID): Unique token identifier. Required for revocation (blacklist). Use UUID. Custom claims for security: 1) roles: User's roles for RBAC. ['admin', 'editor']. 2) permissions: Specific permissions. ['posts:delete', 'users:view']. 3) scope: OAuth scopes for API access. 'read:profile write:posts'. 4) version/token_version: For invalidation strategy. Increment on password change. 5) session_id: Link to server session for hybrid approach. Security practices: Keep payload small (token in every request), don't put sensitive data (it's readable), include only necessary claims, validate all claims server-side, use 'typ': 'JWT' in header, consider encryption for sensitive claims (JWE not JWT).",
              },
              {
                question: "How do you implement secure logout with JWTs?",
                difficulty: "Advanced",
                category: "JWT",
                answer:
                  "Logout with JWTs is challenging due to stateless nature. Strategies: 1) Client-side logout: Delete token from storage. Simple but token still valid if intercepted. Only for low-security apps. Implementation: localStorage.removeItem('token'). 2) Short expiration: Use 5-15min access tokens. Delete refresh token on logout. Token remains valid max 15min but can't get new one. Implementation: DELETE FROM refresh_tokens WHERE user_id = ? AND token = ?. 3) Token blacklist: Add JWT ID to Redis blacklist on logout. Check blacklist in middleware. Implementation: On logout: redis.setex(\`blacklist:\${jti}\`, ttl, 'revoked'). In middleware: if (await redis.exists(\`blacklist:\${jti}\`)) reject. TTL matches token expiration. 4) Token versioning: Increment user's token version on logout. Reject tokens with old version. Implementation: On logout: UPDATE users SET token_version = token_version + 1 WHERE id = ?. In middleware: if (decoded.version !== user.token_version) reject. 5) Logout all devices: Delete all refresh tokens for user. Implementation: DELETE FROM refresh_tokens WHERE user_id = ?. Access tokens expire naturally. Best practice: Combine approaches - Short access tokens (15min), Long refresh tokens (stored server-side), On logout: Delete refresh token + blacklist current access token if needed, On 'logout all': Delete all refresh tokens + increment version. Additional security: Clear all client storage (localStorage, cookies, sessionStorage), redirect to login page, show logout confirmation, log logout events for audit, support remote logout (user can logout other sessions), implement idle timeout (auto-logout after inactivity), consider requiring re-authentication for sensitive actions after certain time.",
              },
            ],

            links: [
              "https://auth0.com/docs/get-started/authentication-and-authorization - Auth0 Authentication vs Authorization guide",
              "https://oauth.net/2/ - OAuth 2.0 official specification",
              "https://openid.net/connect/ - OpenID Connect specification",
              "https://jwt.io/introduction - JWT introduction and debugger",
              "https://datatracker.ietf.org/doc/html/rfc7519 - JWT RFC specification",
              "https://datatracker.ietf.org/doc/html/rfc7636 - PKCE RFC specification",
              "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html - OWASP Authentication Cheat Sheet",
              "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html - OWASP Authorization Cheat Sheet",
              "https://research.google/pubs/pub48190/ - Zanzibar: Google's Authorization System",
              "https://www.openpolicyagent.org/ - Open Policy Agent for authorization",
              "https://www.keycloak.org/ - Keycloak open source identity provider",
              "https://github.com/dwyl/learn-json-web-tokens - Learn JWT tutorial",
            ],
          },
          {
            topic: "CAP Theorem",
            tags: [
              "CAP Theorem",
              "Distributed Systems",
              "Consistency",
              "Availability",
              "Partition Tolerance",
              "Database Design",
              "System Architecture",
              "Trade-offs",
              "NoSQL",
              "SQL",
              "PACELC",
              "Eventual Consistency",
              "Strong Consistency",
              "Network Partitions",
            ],

            explanation: `
<div>
  <h2>CAP Theorem</h2>
  <p>
    The CAP theorem, also known as Brewer's theorem, is a fundamental principle in distributed systems 
    that states you can only guarantee two out of three properties simultaneously: Consistency, Availability, 
    and Partition Tolerance. Understanding CAP is critical for designing distributed databases and systems 
    that meet your application's requirements.
  </p>

  <h3>The Core Concept</h3>
  <pre><code>
// CAP Theorem: Pick Two (but Partition Tolerance is mandatory in practice)
// =========================================================================

// C = Consistency
// ================
// Every read receives the most recent write or an error
// All nodes see the same data at the same time
// Example: Bank account balance must be consistent across all nodes

// A = Availability  
// ================
// Every request receives a response (success or failure)
// System remains operational even if some nodes are down
// Example: Website stays up even if some servers fail

// P = Partition Tolerance
// =======================
// System continues to operate despite network failures between nodes
// Messages between nodes may be lost or delayed
// Example: Data center communication fails but system keeps running

// The Reality:
// ============
// ❌ "Pick any two" is misleading
// ✅ Network partitions WILL happen in distributed systems
// ✅ You must choose: CP (Consistency + Partition Tolerance) 
//                  OR AP (Availability + Partition Tolerance)

// Real-world analogy:
// ===================
// Consistency = Everyone sees the same truth at the same time
// Availability = Service always responds (even if data might be stale)
// Partition Tolerance = System works even when parts can't communicate

// The Trade-off:
// ==============
// When network partition occurs, you must choose:
// - Wait for network to heal before responding (CP - prioritize consistency)
// - Respond with potentially stale data (AP - prioritize availability)

// Common Misconception:
// =====================
// ❌ "CAP means you can only have 2 properties"
// ✅ "When a partition occurs, choose between C and A"
// ❌ "CA systems exist in practice"
// ✅ "CA only works in single-node systems (not distributed)"
  </code></pre>

  <h3>1. Consistency (C)</h3>

  <h4>Strong Consistency</h4>
  <pre><code>
// Strong Consistency: All nodes see the same data at the same time
// ================================================================

// Example: Bank Account Balance
// ==============================

class StronglyConsistentBank {
  constructor() {
    this.primaryNode = new Database();
    this.replicaNodes = [new Database(), new Database()];
    this.quorum = Math.floor((this.replicaNodes.length + 1) / 2) + 1;
  }
  
  // Write with quorum consensus
  async withdraw(accountId, amount) {
    // 1. Acquire distributed lock
    const lock = await this.acquireLock(accountId);
    
    try {
      // 2. Read current balance from primary
      const account = await this.primaryNode.read(accountId);
      
      if (account.balance < amount) {
        throw new Error('Insufficient funds');
      }
      
      // 3. Calculate new balance
      const newBalance = account.balance - amount;
      
      // 4. Write to primary
      await this.primaryNode.write(accountId, { balance: newBalance });
      
      // 5. Write to replicas and wait for quorum
      const writes = this.replicaNodes.map(node => 
        node.write(accountId, { balance: newBalance })
          .then(() => true)
          .catch(() => false)
      );
      
      const results = await Promise.all(writes);
      const successCount = results.filter(r => r).length + 1; // +1 for primary
      
      // 6. Check if we achieved quorum
      if (successCount < this.quorum) {
        // Rollback - not enough nodes confirmed
        await this.primaryNode.write(accountId, account);
        throw new Error('Quorum not reached - operation aborted');
      }
      
      // 7. Success - all reads will now see consistent data
      return { success: true, newBalance };
      
    } finally {
      // 8. Release lock
      await this.releaseLock(accountId);
    }
  }
  
  // Read with quorum
  async getBalance(accountId) {
    // Read from multiple nodes
    const reads = [
      this.primaryNode.read(accountId),
      ...this.replicaNodes.map(node => node.read(accountId))
    ];
    
    const results = await Promise.allSettled(reads);
    const successful = results
      .filter(r => r.status === 'fulfilled')
      .map(r => r.value);
    
    if (successful.length < this.quorum) {
      throw new Error('Cannot achieve quorum - data may be inconsistent');
    }
    
    // Verify all successful reads have same value
    const balances = successful.map(s => s.balance);
    const uniqueBalances = [...new Set(balances)];
    
    if (uniqueBalances.length > 1) {
      // Inconsistency detected - trigger repair
      await this.repairInconsistency(accountId);
      throw new Error('Inconsistent data detected');
    }
    
    return successful[0];
  }
  
  async repairInconsistency(accountId) {
    // Read from all nodes
    const allReads = await Promise.allSettled([
      this.primaryNode.read(accountId),
      ...this.replicaNodes.map(node => node.read(accountId))
    ]);
    
    // Use version numbers to determine latest
    const successfulReads = allReads
      .filter(r => r.status === 'fulfilled')
      .map(r => r.value);
    
    const latest = successfulReads.reduce((max, current) => 
      current.version > max.version ? current : max
    );
    
    // Write latest to all nodes
    await Promise.all([
      this.primaryNode.write(accountId, latest),
      ...this.replicaNodes.map(node => node.write(accountId, latest))
    ]);
  }
}

// Two-Phase Commit (2PC) for Strong Consistency
// ==============================================

class TwoPhaseCommit {
  constructor(nodes) {
    this.coordinator = nodes[0];
    this.participants = nodes.slice(1);
  }
  
  async executeTransaction(transaction) {
    // Phase 1: Prepare
    // =================
    console.log('Phase 1: Prepare');
    
    const prepareResults = await Promise.all(
      this.participants.map(async (node) => {
        try {
          // Ask each node: "Can you commit this transaction?"
          const canCommit = await node.prepare(transaction);
          return { node, canCommit };
        } catch (error) {
          return { node, canCommit: false, error };
        }
      })
    );
    
    // Check if all participants voted YES
    const allReady = prepareResults.every(r => r.canCommit);
    
    // Phase 2: Commit or Abort
    // =========================
    console.log('Phase 2: Commit or Abort');
    
    if (allReady) {
      // All nodes ready - send COMMIT to all
      await Promise.all(
        this.participants.map(node => node.commit(transaction))
      );
      return { success: true, result: 'committed' };
    } else {
      // At least one node not ready - send ABORT to all
      await Promise.all(
        this.participants.map(node => node.abort(transaction))
      );
      return { success: false, result: 'aborted' };
    }
  }
}

// Participant node implementation
class ParticipantNode {
  constructor(id) {
    this.id = id;
    this.db = new Database();
    this.preparedTransactions = new Map();
  }
  
  async prepare(transaction) {
    // Validate transaction
    const canExecute = await this.validateTransaction(transaction);
    
    if (!canExecute) {
      return false;
    }
    
    // Lock resources
    await this.lockResources(transaction);
    
    // Write to transaction log (not committed yet)
    await this.db.writeTransactionLog(transaction);
    
    // Store in prepared state
    this.preparedTransactions.set(transaction.id, transaction);
    
    // Vote YES
    return true;
  }
  
  async commit(transaction) {
    // Execute the transaction
    await this.db.execute(transaction);
    
    // Remove from prepared state
    this.preparedTransactions.delete(transaction.id);
    
    // Release locks
    await this.unlockResources(transaction);
    
    console.log(\`Node \${this.id}: Transaction committed\`);
  }
  
  async abort(transaction) {
    // Rollback any changes
    await this.db.rollback(transaction);
    
    // Remove from prepared state
    this.preparedTransactions.delete(transaction.id);
    
    // Release locks
    await this.unlockResources(transaction);
    
    console.log(\`Node \${this.id}: Transaction aborted\`);
  }
}

// Strong Consistency Characteristics:
// ====================================
// ✅ Linearizability - operations appear to happen instantaneously
// ✅ All nodes have same data at same time
// ✅ No stale reads
// ✅ ACID transactions

// ❌ Lower availability during partitions
// ❌ Higher latency (coordination overhead)
// ❌ System may refuse requests if quorum unavailable
// ❌ Blocking operations

// Use Cases for Strong Consistency:
// ==================================
// - Financial transactions (banking, payments)
// - Inventory management (prevent overselling)
// - Booking systems (hotel rooms, concert tickets)
// - Collaborative editing (last write wins must be deterministic)
// - Configuration management (critical settings)
  </code></pre>

  <h4>Eventual Consistency</h4>
  <pre><code>
// Eventual Consistency: All nodes will eventually have same data
// ==============================================================

// Example: Social Media Feed
// ===========================

class EventuallyConsistentFeed {
  constructor() {
    this.nodes = [
      new Database('us-east'),
      new Database('us-west'),
      new Database('eu-west')
    ];
  }
  
  // Write to any available node (no waiting)
  async createPost(userId, content) {
    const timestamp = Date.now();
    const postId = generateId();
    
    const post = {
      id: postId,
      userId,
      content,
      timestamp,
      version: 1
    };
    
    // Write to local node immediately
    const localNode = this.getClosestNode();
    await localNode.write(postId, post);
    
    // Return success immediately (don't wait for replication)
    // Background process will replicate to other nodes
    this.replicateAsync(postId, post);
    
    return { success: true, postId };
  }
  
  // Asynchronous replication
  async replicateAsync(postId, post) {
    // Replicate to other nodes in background
    const localNode = this.getClosestNode();
    
    this.nodes
      .filter(node => node !== localNode)
      .forEach(async (node) => {
        try {
          await node.write(postId, post);
          console.log(\`Replicated to \${node.id}\`);
        } catch (error) {
          // If replication fails, retry later
          console.error(\`Replication failed to \${node.id}: \${error}\`);
          this.retryQueue.push({ node, postId, post });
        }
      });
  }
  
  // Read from any node (might be stale)
  async getPost(postId) {
    const localNode = this.getClosestNode();
    
    try {
      const post = await localNode.read(postId);
      return post;
    } catch (error) {
      // If local node fails, try another
      for (const node of this.nodes) {
        if (node !== localNode) {
          try {
            return await node.read(postId);
          } catch (e) {
            continue;
          }
        }
      }
      throw new Error('Post not found on any node');
    }
  }
  
  // Conflict resolution - Last Write Wins (LWW)
  async resolveConflict(postId) {
    // Read from all nodes
    const versions = await Promise.all(
      this.nodes.map(async (node) => {
        try {
          const post = await node.read(postId);
          return { node, post };
        } catch {
          return { node, post: null };
        }
      })
    );
    
    // Filter out null results
    const validVersions = versions.filter(v => v.post !== null);
    
    if (validVersions.length === 0) {
      throw new Error('Post not found on any node');
    }
    
    // Find latest version (highest timestamp)
    const latest = validVersions.reduce((max, current) => 
      current.post.timestamp > max.post.timestamp ? current : max
    );
    
    // Write latest version to all nodes
    await Promise.all(
      this.nodes.map(node => node.write(postId, latest.post))
    );
    
    return latest.post;
  }
}

// Vector Clocks for Conflict Detection
// =====================================

class VectorClock {
  constructor(nodeId, nodes) {
    this.nodeId = nodeId;
    // Initialize clock: { node1: 0, node2: 0, node3: 0 }
    this.clock = {};
    nodes.forEach(node => {
      this.clock[node] = 0;
    });
  }
  
  // Increment local counter
  increment() {
    this.clock[this.nodeId]++;
    return this.copy();
  }
  
  // Update when receiving message from another node
  update(otherClock) {
    Object.keys(this.clock).forEach(node => {
      this.clock[node] = Math.max(
        this.clock[node],
        otherClock[node] || 0
      );
    });
    // Increment own counter
    this.clock[this.nodeId]++;
  }
  
  // Compare two vector clocks
  compare(other) {
    let greater = false;
    let less = false;
    
    Object.keys(this.clock).forEach(node => {
      const thisClock = this.clock[node];
      const otherClock = other[node] || 0;
      
      if (thisClock > otherClock) greater = true;
      if (thisClock < otherClock) less = true;
    });
    
    if (greater && !less) return 'greater';  // This happened after other
    if (less && !greater) return 'less';     // This happened before other
    if (!greater && !less) return 'equal';   // Same event
    return 'concurrent';                      // Conflict!
  }
  
  copy() {
    const copy = new VectorClock(this.nodeId, Object.keys(this.clock));
    copy.clock = { ...this.clock };
    return copy;
  }
}

// Using Vector Clocks
class EventuallyConsistentStore {
  constructor(nodeId, allNodes) {
    this.nodeId = nodeId;
    this.clock = new VectorClock(nodeId, allNodes);
    this.data = new Map();
  }
  
  write(key, value) {
    // Increment vector clock
    const newClock = this.clock.increment();
    
    // Store value with clock
    this.data.set(key, {
      value,
      clock: newClock.copy()
    });
    
    return newClock;
  }
  
  read(key) {
    return this.data.get(key);
  }
  
  merge(key, incomingData, incomingClock) {
    const local = this.data.get(key);
    
    if (!local) {
      // No local version - accept incoming
      this.data.set(key, { value: incomingData, clock: incomingClock });
      this.clock.update(incomingClock);
      return;
    }
    
    // Compare vector clocks
    const comparison = local.clock.compare(incomingClock);
    
    switch (comparison) {
      case 'less':
        // Incoming is newer - accept it
        this.data.set(key, { value: incomingData, clock: incomingClock });
        this.clock.update(incomingClock);
        break;
        
      case 'greater':
        // Local is newer - keep it
        break;
        
      case 'equal':
        // Same version - no change needed
        break;
        
      case 'concurrent':
        // Conflict! Need resolution strategy
        const resolved = this.resolveConflict(local.value, incomingData);
        
        // Create new vector clock combining both
        const mergedClock = new VectorClock(this.nodeId, Object.keys(this.clock.clock));
        Object.keys(mergedClock.clock).forEach(node => {
          mergedClock.clock[node] = Math.max(
            local.clock.clock[node] || 0,
            incomingClock.clock[node] || 0
          );
        });
        mergedClock.clock[this.nodeId]++;
        
        this.data.set(key, { value: resolved, clock: mergedClock });
        this.clock = mergedClock;
        break;
    }
  }
  
  resolveConflict(local, incoming) {
    // Strategy 1: Last Write Wins (LWW) using timestamp
    if (incoming.timestamp > local.timestamp) {
      return incoming;
    }
    return local;
    
    // Strategy 2: Keep both (siblings)
    // return [local, incoming];
    
    // Strategy 3: Merge values (for specific data types)
    // return { ...local, ...incoming };
  }
}

// Eventual Consistency Characteristics:
// ======================================
// ✅ High availability (always accepts writes)
// ✅ Low latency (no coordination needed)
// ✅ Partition tolerant (works during network issues)
// ✅ Scales well geographically

// ❌ Temporary inconsistency
// ❌ Conflict resolution needed
// ❌ Stale reads possible
// ❌ Complexity in application logic

// Use Cases for Eventual Consistency:
// ====================================
// - Social media (posts, likes, comments)
// - Shopping cart (non-checkout)
// - DNS (domain name system)
// - CDN content delivery
// - Analytics and metrics
// - Caching layers
// - News feeds
  </code></pre>

  <h3>2. Availability (A)</h3>
  <pre><code>
// Availability: System always responds (success or failure)
// ==========================================================

// High Availability Architecture
// ===============================

class HighlyAvailableService {
  constructor() {
    this.primaryDataCenter = new DataCenter('us-east');
    this.secondaryDataCenter = new DataCenter('us-west');
    this.healthCheckInterval = 5000; // 5 seconds
    this.startHealthChecks();
  }
  
  startHealthChecks() {
    setInterval(async () => {
      const primaryHealthy = await this.primaryDataCenter.isHealthy();
      const secondaryHealthy = await this.secondaryDataCenter.isHealthy();
      
      console.log(\`Primary: \${primaryHealthy ? 'UP' : 'DOWN'}\`);
      console.log(\`Secondary: \${secondaryHealthy ? 'UP' : 'DOWN'}\`);
    }, this.healthCheckInterval);
  }
  
  async handleRequest(request) {
    // Try primary first
    try {
      const response = await this.primaryDataCenter.process(request);
      return response;
    } catch (primaryError) {
      console.log('Primary datacenter failed, trying secondary...');
      
      // Failover to secondary
      try {
        const response = await this.secondaryDataCenter.process(request);
        
        // Mark response as coming from secondary
        response.headers['X-Served-By'] = 'secondary';
        response.headers['X-Data-Freshness'] = 'may-be-stale';
        
        return response;
      } catch (secondaryError) {
        // Both failed - return cached/degraded response
        console.log('Both datacenters failed, serving cached response...');
        return this.serveCachedResponse(request);
      }
    }
  }
  
  serveCachedResponse(request) {
    // Return cached data (stale but available)
    const cached = this.cache.get(request.url);
    
    if (cached) {
      return {
        status: 200,
        data: cached.data,
        headers: {
          'X-Cache': 'HIT',
          'X-Cache-Age': Date.now() - cached.timestamp,
          'Warning': '110 Response is stale'
        }
      };
    }
    
    // No cache - return degraded response
    return {
      status: 503,
      data: {
        error: 'Service temporarily unavailable',
        message: 'We are experiencing technical difficulties',
        retryAfter: 60
      },
      headers: {
        'Retry-After': '60'
      }
    };
  }
}

// Multi-Master Replication (for Availability)
// ============================================

class MultiMasterCluster {
  constructor() {
    this.masters = [
      new Master('node1'),
      new Master('node2'),
      new Master('node3')
    ];
  }
  
  async write(key, value) {
    // Write to ANY available master
    const availableMasters = await this.getAvailableMasters();
    
    if (availableMasters.length === 0) {
      throw new Error('No masters available');
    }
    
    // Pick closest/fastest master
    const master = availableMasters[0];
    
    // Write immediately (don't wait for replication)
    await master.write(key, value);
    
    // Replicate to other masters asynchronously
    this.replicateToOthers(master, key, value);
    
    return { success: true };
  }
  
  async replicateToOthers(sourceMaster, key, value) {
    const others = this.masters.filter(m => m !== sourceMaster);
    
    // Fire and forget - availability > consistency
    others.forEach(async (master) => {
      try {
        await master.write(key, value);
      } catch (error) {
        // Log but don't fail the write
        console.error(\`Replication to \${master.id} failed: \${error}\`);
      }
    });
  }
  
  async read(key) {
    // Read from ANY available master
    const availableMasters = await this.getAvailableMasters();
    
    if (availableMasters.length === 0) {
      throw new Error('No masters available');
    }
    
    // Try each master until success
    for (const master of availableMasters) {
      try {
        return await master.read(key);
      } catch (error) {
        continue; // Try next master
      }
    }
    
    throw new Error('Key not found on any master');
  }
  
  async getAvailableMasters() {
    const health = await Promise.all(
      this.masters.map(async (master) => {
        const isHealthy = await master.isHealthy();
        return { master, isHealthy };
      })
    );
    
    return health
      .filter(h => h.isHealthy)
      .map(h => h.master);
  }
}

// Circuit Breaker Pattern (for Availability)
// ===========================================

class CircuitBreaker {
  constructor(service, options = {}) {
    this.service = service;
    this.failureThreshold = options.failureThreshold || 5;
    this.resetTimeout = options.resetTimeout || 60000; // 1 minute
    this.monitoringPeriod = options.monitoringPeriod || 10000; // 10 seconds
    
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    this.failures = 0;
    this.lastFailureTime = null;
    this.successCount = 0;
  }
  
  async execute(operation, ...args) {
    if (this.state === 'OPEN') {
      // Check if we should try again (reset timeout elapsed)
      if (Date.now() - this.lastFailureTime > this.resetTimeout) {
        console.log('Circuit breaker: Attempting to reset (HALF_OPEN)');
        this.state = 'HALF_OPEN';
        this.successCount = 0;
      } else {
        // Still open - fail fast
        throw new Error('Circuit breaker is OPEN - service unavailable');
      }
    }
    
    try {
      const result = await this.service[operation](...args);
      
      // Success
      this.onSuccess();
      return result;
      
    } catch (error) {
      // Failure
      this.onFailure();
      throw error;
    }
  }
  
  onSuccess() {
    this.failures = 0;
    
    if (this.state === 'HALF_OPEN') {
      this.successCount++;
      
      // After N successes in HALF_OPEN, close circuit
      if (this.successCount >= 3) {
        console.log('Circuit breaker: Recovered (CLOSED)');
        this.state = 'CLOSED';
      }
    }
  }
  
  onFailure() {
    this.failures++;
    this.lastFailureTime = Date.now();
    
    if (this.failures >= this.failureThreshold) {
      console.log(\`Circuit breaker: Tripped (OPEN) - \${this.failures} failures\`);
      this.state = 'OPEN';
    }
  }
  
  getState() {
    return this.state;
  }
}

// Usage
const database = new DatabaseService();
const circuitBreaker = new CircuitBreaker(database, {
  failureThreshold: 5,
  resetTimeout: 60000
});

async function queryData(id) {
  try {
    return await circuitBreaker.execute('query', id);
  } catch (error) {
    // Circuit is open - serve from cache
    return cache.get(id);
  }
}

// Availability Patterns Summary:
// ===============================
// 1. Redundancy: Multiple instances/replicas
// 2. Load balancing: Distribute requests
// 3. Failover: Automatic switch to backup
// 4. Graceful degradation: Partial functionality when systems fail
// 5. Circuit breaker: Prevent cascade failures
// 6. Retry with backoff: Transient failure recovery
// 7. Caching: Serve stale data when fresh unavailable
// 8. Async replication: Don't block on sync
  </code></pre>

  <h3>3. Partition Tolerance (P)</h3>
  <pre><code>
// Partition Tolerance: System works despite network failures
// ===========================================================

// Network Partition Scenarios
// ============================

// Scenario 1: Split Brain
// ========================
/*
Before partition:
  [Node1] ←→ [Node2] ←→ [Node3]
  
During partition:
  [Node1] ←→ [Node2]    [Node3]
  
Both sides think they're the primary cluster!
This can lead to data divergence.
*/

class SplitBrainPrevention {
  constructor(nodes) {
    this.nodes = nodes;
    this.minimumQuorum = Math.floor(nodes.length / 2) + 1;
  }
  
  async canAcceptWrites() {
    // Count reachable nodes
    const reachableCount = await this.countReachableNodes();
    
    // Only accept writes if we have quorum
    if (reachableCount >= this.minimumQuorum) {
      return true;
    }
    
    console.log(\`Only \${reachableCount}/\${this.nodes.length} nodes reachable\`);
    console.log(\`Need \${this.minimumQuorum} for quorum - rejecting writes\`);
    return false;
  }
  
  async countReachableNodes() {
    const pings = await Promise.allSettled(
      this.nodes.map(node => node.ping())
    );
    
    return pings.filter(p => p.status === 'fulfilled').length;
  }
  
  async write(key, value) {
    if (!await this.canAcceptWrites()) {
      throw new Error('Cannot achieve quorum - writes rejected');
    }
    
    // Proceed with write
    return this.performWrite(key, value);
  }
}

// Scenario 2: Detecting Partitions
// =================================

class PartitionDetector {
  constructor(nodes) {
    this.nodes = nodes;
    this.pingInterval = 1000; // 1 second
    this.pingTimeout = 500;   // 500ms
    this.partitionThreshold = 3; // 3 consecutive failures = partition
    
    this.failureCounts = new Map();
    this.nodes.forEach(node => this.failureCounts.set(node.id, 0));
    
    this.startMonitoring();
  }
  
  startMonitoring() {
    setInterval(async () => {
      for (const node of this.nodes) {
        const isReachable = await this.pingNode(node);
        
        if (!isReachable) {
          const failures = this.failureCounts.get(node.id) + 1;
          this.failureCounts.set(node.id, failures);
          
          if (failures >= this.partitionThreshold) {
            this.onPartitionDetected(node);
          }
        } else {
          // Node recovered
          const hadFailures = this.failureCounts.get(node.id) > 0;
          this.failureCounts.set(node.id, 0);
          
          if (hadFailures) {
            this.onPartitionHealed(node);
          }
        }
      }
    }, this.pingInterval);
  }
  
  async pingNode(node) {
    try {
      await Promise.race([
        node.ping(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), this.pingTimeout)
        )
      ]);
      return true;
    } catch {
      return false;
    }
  }
  
  onPartitionDetected(node) {
    console.log(\`⚠️  PARTITION DETECTED: Node \${node.id} unreachable\`);
    
    // Trigger partition handling
    this.handlePartition(node);
  }
  
  onPartitionHealed(node) {
    console.log(\`✅ PARTITION HEALED: Node \${node.id} recovered\`);
    
    // Trigger reconciliation
    this.reconcileData(node);
  }
  
  async handlePartition(partitionedNode) {
    // Mark node as partitioned
    partitionedNode.status = 'PARTITIONED';
    
    // Stop routing requests to it
    this.removeFromLoadBalancer(partitionedNode);
    
    // Start tracking divergent writes
    this.trackDivergence(partitionedNode);
  }
  
  async reconcileData(recoveredNode) {
    console.log(\`Reconciling data for \${recoveredNode.id}...\`);
    
    // Get all keys that diverged during partition
    const divergentKeys = this.getDivergentKeys(recoveredNode);
    
    for (const key of divergentKeys) {
      // Read from majority
      const majorityValue = await this.readFromMajority(key);
      
      // Read from recovered node
      const nodeValue = await recoveredNode.read(key);
      
      if (majorityValue !== nodeValue) {
        // Conflict - resolve it
        const resolved = this.resolveConflict(key, majorityValue, nodeValue);
        
        // Write resolved value everywhere
        await this.writeToAll(key, resolved);
      }
    }
    
    // Mark node as healthy
    recoveredNode.status = 'HEALTHY';
    this.addToLoadBalancer(recoveredNode);
  }
}

// Scenario 3: Handling Partitions - CP Approach
// ==============================================

class CPDuringPartition {
  async handlePartitionedWrite(key, value) {
    const availableNodes = await this.getAvailableNodes();
    const quorum = Math.floor(this.allNodes.length / 2) + 1;
    
    if (availableNodes.length < quorum) {
      // Cannot achieve quorum - REJECT write
      throw new Error(\`Cannot write - only \${availableNodes.length}/\${quorum} nodes available\`);
    }
    
    // Quorum available - proceed with write
    const writes = availableNodes.map(node => node.write(key, value));
    const results = await Promise.allSettled(writes);
    
    const successful = results.filter(r => r.status === 'fulfilled').length;
    
    if (successful >= quorum) {
      return { success: true };
    }
    
    // Couldn't write to quorum - rollback and fail
    throw new Error('Write failed - quorum not reached');
  }
  
  async handlePartitionedRead(key) {
    const availableNodes = await this.getAvailableNodes();
    const quorum = Math.floor(this.allNodes.length / 2) + 1;
    
    if (availableNodes.length < quorum) {
      // Cannot achieve quorum - REJECT read
      throw new Error(\`Cannot read - only \${availableNodes.length}/\${quorum} nodes available\`);
    }
    
    // Read from quorum
    const reads = availableNodes.slice(0, quorum).map(node => node.read(key));
    const results = await Promise.allSettled(reads);
    
    const successful = results
      .filter(r => r.status === 'fulfilled')
      .map(r => r.value);
    
    if (successful.length < quorum) {
      throw new Error('Read failed - quorum not reached');
    }
    
    // Return most recent (by version/timestamp)
    return successful.reduce((latest, current) => 
      current.version > latest.version ? current : latest
    );
  }
}

// Scenario 4: Handling Partitions - AP Approach
// ==============================================

class APDuringPartition {
  async handlePartitionedWrite(key, value) {
    // Accept write on ANY available node
    const availableNodes = await this.getAvailableNodes();
    
    if (availableNodes.length === 0) {
      throw new Error('No nodes available');
    }
    
    // Write to first available (or all available in background)
    const node = availableNodes[0];
    await node.write(key, value);
    
    // Replicate to others asynchronously (best effort)
    this.replicateAsync(key, value, availableNodes.slice(1));
    
    return { success: true };
  }
  
  async handlePartitionedRead(key) {
    // Read from ANY available node (may be stale)
    const availableNodes = await this.getAvailableNodes();
    
    if (availableNodes.length === 0) {
      throw new Error('No nodes available');
    }
    
    // Try to read from local/closest node first
    for (const node of availableNodes) {
      try {
        return await node.read(key);
      } catch {
        continue; // Try next node
      }
    }
    
    throw new Error('Key not found on any available node');
  }
  
  async replicateAsync(key, value, nodes) {
    // Best-effort replication
    nodes.forEach(async (node) => {
      try {
        await node.write(key, value);
      } catch {
        // Log failure but don't throw - availability first
        console.log(\`Replication to \${node.id} failed - will retry later\`);
      }
    });
  }
}

// Partition Tolerance Summary:
// =============================
// - Network partitions WILL happen in distributed systems
// - Must choose between Consistency (CP) and Availability (AP)
// - CP: Reject operations if quorum unavailable
// - AP: Accept operations, reconcile conflicts later
// - Detect partitions via heartbeats/pings
// - Implement quorum to prevent split brain
// - Have reconciliation strategy for when partition heals
  </code></pre>
</div>
`,

            examples: [
              "Strongly consistent bank account with quorum-based writes",
              "Eventually consistent social media feed with async replication",
              "Two-phase commit for distributed transactions",
              "Vector clocks for conflict detection in replicated stores",
              "High availability service with failover and graceful degradation",
              "Multi-master replication for AP systems",
              "Circuit breaker pattern for fault tolerance",
              "Split-brain prevention with quorum consensus",
              "Network partition detection and healing",
              "CP approach rejecting writes during partition",
              "AP approach accepting writes with conflict resolution",
              "E-commerce system with mixed CAP requirements",
            ],

            questions: [
              {
                question:
                  "What is the CAP theorem and what are its three properties?",
                difficulty: "Basic",
                category: "Fundamentals",
                answer:
                  "CAP theorem states you can only guarantee two out of three properties simultaneously in a distributed system: Consistency (C) - every read receives the most recent write or an error, all nodes see the same data at the same time. Example: Bank balance consistent across all servers. Availability (A) - every request receives a response (success or failure), system remains operational even if nodes are down. Example: Website stays up despite server failures. Partition Tolerance (P) - system continues operating despite network failures between nodes. Example: Data centers can't communicate but system keeps running. Reality check: Network partitions WILL happen in distributed systems, so P is mandatory. You must choose between CP (consistency during partition) or AP (availability during partition). Common misconception: CA systems don't exist in distributed scenarios - if nodes are distributed across network, partitions can occur.",
              },
              {
                question:
                  "What's the difference between strong consistency and eventual consistency?",
                difficulty: "Intermediate",
                category: "Consistency Models",
                answer:
                  "Strong Consistency: All nodes see the same data at the same time. Reads always return the most recent write. Achieved through quorum, two-phase commit, or distributed locks. Pros: No stale data, ACID guarantees, predictable behavior. Cons: Higher latency (coordination overhead), lower availability during partitions, blocking operations. Use cases: Banking, inventory, bookings. Example: Read balance from 3 nodes, all return $100. Eventual Consistency: Nodes will eventually converge to same value, but may be temporarily inconsistent. Writes accepted immediately, replicated asynchronously. Pros: High availability, low latency, scales well geographically, partition tolerant. Cons: Temporary inconsistency, stale reads possible, conflict resolution needed. Use cases: Social media feeds, DNS, CDN, analytics. Example: Post created, immediately visible locally, appears in other regions within seconds. Key trade-off: Strong consistency sacrifices availability/speed for correctness. Eventual consistency sacrifices immediate correctness for availability/speed.",
              },
              {
                question: "How does quorum consensus work?",
                difficulty: "Intermediate",
                category: "Consistency Mechanisms",
                answer:
                  "Quorum consensus requires majority of nodes to agree before operation succeeds. Formula: Quorum = floor(N/2) + 1, where N is total nodes. Example: 5 nodes → quorum = 3. Write quorum: Must successfully write to 3+ nodes. Read quorum: Must successfully read from 3+ nodes. Why it works: If write quorum = 3 and read quorum = 3, they must overlap (at least one node has latest value). Prevents split-brain: If network partitions into [2 nodes] and [3 nodes], only 3-node partition can accept writes (has quorum). 2-node partition rejects writes. Process: 1) Attempt write to all nodes, 2) Wait for quorum responses, 3) If quorum reached, commit; if not, rollback and fail. Tunable consistency: Read ONE + Write ALL = strong consistency. Read QUORUM + Write QUORUM = balanced. Read ALL + Write ONE = eventual consistency. Trade-offs: Higher quorum = stronger consistency, lower availability. Lower quorum = higher availability, weaker consistency. Used in: Cassandra (tunable), MongoDB (w:majority), DynamoDB, distributed databases.",
              },
              {
                question:
                  "What is two-phase commit (2PC) and how does it ensure consistency?",
                difficulty: "Advanced",
                category: "Distributed Transactions",
                answer:
                  "Two-Phase Commit ensures all nodes commit or abort together in distributed transaction. Phase 1 - Prepare: Coordinator asks all participants 'Can you commit?' Participants lock resources, write to transaction log, respond YES or NO. If any participant votes NO or timeout occurs, abort. Phase 2 - Commit/Abort: If all voted YES, coordinator sends COMMIT. All participants execute and release locks. If any voted NO, coordinator sends ABORT. All participants rollback and release locks. Guarantees: Atomicity (all-or-nothing), consistency (valid state), durability (committed changes persist). Problems: Blocking protocol - if coordinator crashes during phase 2, participants are blocked waiting for decision. Solution: Timeout + coordinator recovery from transaction log. Not partition-tolerant - network partition between coordinator and participants blocks progress. Alternative: Three-phase commit (3PC) adds PreCommit phase to reduce blocking window. Used in: Distributed databases (MySQL Cluster), XA transactions, microservices orchestration. Modern alternatives: Saga pattern (eventual consistency), event sourcing, compensating transactions. When to use: Financial transactions requiring ACID, critical operations where atomicity is non-negotiable.",
              },
              {
                question:
                  "How do CP and AP systems behave differently during a network partition?",
                difficulty: "Intermediate",
                category: "CAP Trade-offs",
                answer:
                  "CP (Consistency + Partition Tolerance) - Prioritizes consistency during partition. Behavior: If quorum cannot be reached, reject reads/writes. Return error instead of stale/inconsistent data. Example: 5-node cluster partitions into [2] and [3]. Minority partition (2 nodes) rejects all operations. Majority partition (3 nodes) continues operating. Pros: Data always consistent, no divergence. Cons: Lower availability (minority partition unavailable). Examples: PostgreSQL sync replication, etcd, Zookeeper, HBase, MongoDB w:majority. AP (Availability + Partition Tolerance) - Prioritizes availability during partition. Behavior: Accept reads/writes on all partitions. Return potentially stale data. Reconcile conflicts when partition heals. Example: 5-node cluster partitions into [2] and [3]. Both partitions continue accepting writes independently. When partition heals, conflicts resolved (last-write-wins, vector clocks). Pros: Always available, low latency. Cons: Temporary inconsistency, conflict resolution complexity. Examples: Cassandra, DynamoDB, Riak, CouchDB. Real-world analogy: CP = Bank ATM shows error rather than wrong balance. AP = Social media shows slightly old feed rather than error. Choose based on: Correctness critical = CP. User experience critical = AP.",
              },
              {
                question:
                  "What are vector clocks and how do they detect conflicts?",
                difficulty: "Advanced",
                category: "Conflict Resolution",
                answer:
                  "Vector clocks track causality in distributed systems to detect concurrent updates. Structure: Each node maintains counter for every node in system. Example: 3 nodes → clock = {node1: 0, node2: 0, node3: 0}. Operations: Increment - node increments own counter on write. Update - node updates all counters to max(local, received) when receiving message. Comparing clocks: Greater = one happened after other (all counters ≥, at least one >). Less = one happened before other. Equal = same event. Concurrent = neither greater nor less - CONFLICT! Example scenario: Node1 writes 'A' → clock {1:1, 2:0, 3:0}. Node2 writes 'B' → clock {1:0, 2:1, 3:0}. When merged: Compare clocks → Concurrent! Both incremented different counters. Conflict Resolution strategies: Last-write-wins (use timestamp), Keep both versions (siblings), Merge values (application-specific), CRDTs (conflict-free data types). Pros: Detects all conflicts, no central coordination needed. Cons: Clock size grows with nodes (O(N)), complex to implement. Used in: Riak, Voldemort, DynamoDB (modified version). Alternative: Dotted Version Vectors (more efficient). When to use: Multi-master replication, eventually consistent systems, offline-first applications.",
              },
              {
                question: "What is PACELC theorem and how does it extend CAP?",
                difficulty: "Advanced",
                category: "Extended Theory",
                answer:
                  "PACELC extends CAP to describe behavior during normal operation (no partition). Formula: If Partition, choose Availability vs Consistency. Else (no partition), choose Latency vs Consistency. CAP limitation: Only describes partition scenario. Most of time, systems aren't partitioned. PACELC fills gap: What trade-off during normal operation? Four combinations: PA/EL (Cassandra, DynamoDB) - During partition: Available. Normal operation: Low latency (async replication). Use: Social media, IoT, caching. PA/EC (CouchDB) - During partition: Available. Normal operation: Consistent (sync when healthy). Use: Offline-first mobile apps. PC/EL (MongoDB) - During partition: Consistent. Normal operation: Low latency (read from secondary). Use: Content management, catalogs. PC/EC (PostgreSQL sync, etcd, Zookeeper) - During partition: Consistent. Normal operation: Consistent (always sync). Use: Financial systems, configuration management. Key insight: Even without partition, trade-off exists between: Fast operations (async replication, read from any node) vs Strong consistency (sync replication, quorum reads). Example: Async replication faster than sync even with perfect network. Real-world decisions: Social media = PA/EL (always fast). Banking = PC/EC (always correct). E-commerce = Mixed (PA/EL for browsing, PC/EC for checkout).",
              },
              {
                question:
                  "How do you design an e-commerce system considering CAP?",
                difficulty: "Advanced",
                category: "Practical Application",
                answer:
                  "E-commerce systems have different CAP requirements per component. Don't use single choice for entire system. Product Catalog (AP) - Browse products: eventual consistency OK, stale prices acceptable for browsing, fast response critical. Implementation: Read from any replica, async replication across regions. Shopping Cart (AP) - Add/remove items: eventual consistency acceptable (cart not committed), high availability critical for UX. Implementation: Write to local node immediately, replicate async, merge conflicts on checkout. Inventory (CP) - Check stock: strong consistency required to prevent overselling. Must know exact current stock. Implementation: Read with quorum, decrement with majority consensus. Reject if quorum unavailable. Checkout/Payment (CP) - Process payment: strong consistency critical (money involved), use 2PC for distributed transaction, lock inventory, process payment, commit or rollback. Implementation: Acquire distributed locks, validate with quorum reads, execute with 2PC. Recommendations (AP) - Product suggestions: stale recommendations acceptable, speed and availability important. Implementation: Cache-heavy, eventual consistency. Search (AP) - Product search: Slightly stale index acceptable, availability critical. Implementation: Replicated search index, eventual consistency. Order History (CP for writes, AP for reads) - Write orders with consistency (payment tied to it), read from any replica (eventual OK). Pattern: Use AP for user-facing reads (speed), CP for critical writes (correctness), eventual consistency for background jobs.",
              },
              {
                question:
                  "What is the split-brain problem and how do you prevent it?",
                difficulty: "Advanced",
                category: "Partition Handling",
                answer:
                  "Split-brain occurs when network partition causes multiple nodes to think they're the leader/primary. Scenario: Cluster [Node1-Node2-Node3] partitions into [Node1-Node2] and [Node3]. Both sides think they're primary cluster. Both accept writes independently. Data diverges - cannot reconcile. Consequences: Data inconsistency (conflicting writes), duplicate operations (payment processed twice), data loss (on reconciliation). Prevention strategies: 1. Quorum consensus - Only accept writes if majority nodes reachable. Example: 5 nodes → need 3 for quorum. [2 nodes] partition cannot accept writes (no quorum). [3 nodes] partition continues (has quorum). 2. Fencing - Use external coordination service (ZooKeeper, etcd). Leader must maintain lease with coordinator. Lost lease = step down immediately. 3. STONITH (Shoot The Other Node In The Head) - Physically power off isolated nodes. Used in clusters with shared storage. 4. Witness/Tiebreaker node - Add lightweight node in third location. Breaks ties during partition. 5. Majority quorum - Require >50% nodes for any operation. Prevents multiple active primaries. Implementation: Count reachable nodes via heartbeat. If count < quorum, reject writes. Only resume when quorum restored. Used in: All distributed databases (Cassandra, MongoDB, Redis Cluster), distributed coordination (etcd, ZooKeeper), Kubernetes control plane.",
              },
              {
                question:
                  "How do you choose between different consistency levels in Cassandra?",
                difficulty: "Intermediate",
                category: "Tunable Consistency",
                answer:
                  "Cassandra offers tunable consistency per operation via consistency levels. Write levels: ONE - Write to any 1 node. Fast, low latency. Risk: Data lost if node fails before replication. Use: Logging, analytics. QUORUM - Write to majority of replicas. Balanced consistency/availability. Replication factor 3 → 2 nodes must acknowledge. Use: Default for most applications. ALL - Write to all replicas. Strongest consistency, highest latency. Use: Critical data (financial). Read levels: ONE - Read from any 1 node. Fastest, may return stale data. Use: Time-series, metrics (stale OK). QUORUM - Read from majority of replicas. Get latest value with high probability. Use: Consistent reads required. ALL - Read from all replicas. Guaranteed latest, slowest. Use: Critical reads after important writes. Strong consistency combination: Read QUORUM + Write QUORUM. Overlap guarantees seeing latest write. Example: RF=3, Read 2 + Write 2 = overlap. Eventual consistency combination: Read ONE + Write ONE. Fastest, data eventually consistent. Choosing strategy: Correctness critical = QUORUM/ALL. Speed critical = ONE/ONE. Balanced = Read ONE + Write QUORUM (fast reads, durable writes). Session data = Read ONE + Write QUORUM. Financial = Read QUORUM + Write QUORUM. Analytics = Read ONE + Write ONE. Formula: Read level + Write level > Replication factor = Strong consistency.",
              },
              {
                question: "What are common misconceptions about CAP theorem?",
                difficulty: "Intermediate",
                category: "Conceptual Understanding",
                answer:
                  "Misconception 1: 'You can only have 2 out of 3 properties.' Reality: Partition tolerance is mandatory in distributed systems. Must choose between C and A when partition occurs. Misconception 2: 'CA systems exist in distributed scenarios.' Reality: CA only possible on single node (not distributed). Any distributed system must handle partitions. Misconception 3: 'CAP is binary choice for entire system.' Reality: Different components can make different choices. E-commerce: AP for catalog, CP for checkout. Misconception 4: 'AP means no consistency at all.' Reality: AP means eventual consistency. Data converges, just not immediately. Misconception 5: 'CP systems are always unavailable during partition.' Reality: CP rejects operations only for minority partition. Majority partition remains available with quorum. Misconception 6: 'Network partitions are rare.' Reality: Partitions happen regularly. Network cable unplugged, switch failure, GC pauses, network congestion. Misconception 7: 'Choosing CAP category is one-time decision.' Reality: May use different choices per operation. Cassandra: tune per query. MongoDB: tune per collection. Misconception 8: 'CAP only applies to databases.' Reality: Applies to ANY distributed system. Microservices, caches, message queues, coordination services. Truth: CAP is spectrum, not binary. Trade-offs exist even during normal operation (PACELC). Design for partitions, test for partitions, monitor for partitions.",
              },
              {
                question:
                  "How do you implement graceful degradation in AP systems?",
                difficulty: "Advanced",
                category: "Availability Patterns",
                answer:
                  "Graceful degradation maintains partial functionality when full system unavailable. Strategies: 1. Multi-level caching - Primary data source fails → serve from cache. Mark as stale with headers: X-Cache: HIT, X-Cache-Age: 300, Warning: 110 Response is stale. Accept degraded UX over complete failure. 2. Circuit breaker pattern - Detect failures (5+ consecutive errors). Open circuit - fail fast, don't overload failing service. After timeout, try again (half-open state). If successful, close circuit. Prevents cascade failures. 3. Fallback hierarchies - Try primary datacenter. If fails, try secondary datacenter. If fails, serve cached response. If no cache, return user-friendly error with retry guidance. 4. Feature flags - Disable non-critical features during degraded mode. Example: Disable recommendations, keep checkout working. Preserve core functionality. 5. Read from anywhere - Accept stale data from any available node. Add staleness metadata: X-Data-Freshness: may-be-stale, X-Last-Updated: 1234567890. Better than no data. 6. Queue for later - Can't process write now? Queue it. Return success, process asynchronously. Idempotency critical. 7. Partial responses - Can't fetch all data? Return what you have. Mark response as partial: X-Partial-Response: true. Implementation: Monitor health of dependencies, define degradation levels (full, partial, minimal), communicate degradation to users (status page, response headers), automatic recovery when health restored. Example: Amazon checkout continues during recommendation service outage. Shows 'Recommendations unavailable' but checkout works.",
              },
            ],
            links: [
              "https://en.wikipedia.org/wiki/CAP_theorem - CAP Theorem Wikipedia",
              "https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/ - CAP Twelve Years Later by Eric Brewer",
              "https://martin.kleppmann.com/2015/05/11/please-stop-calling-databases-cp-or-ap.html - Please stop calling databases CP or AP by Martin Kleppmann",
              "https://aphyr.com/posts/313-strong-consistency-models - Strong consistency models by Kyle Kingsbury",
              "https://jepsen.io/ - Jepsen - distributed systems safety research",
              "https://aws.amazon.com/builders-library/challenges-with-distributed-systems/ - AWS on distributed systems challenges",
              "https://cloud.google.com/architecture/scalable-and-resilient-apps - Google Cloud on resilient applications",
              "https://cassandra.apache.org/doc/latest/cassandra/architecture/dynamo.html - Cassandra architecture (AP system)",
              "https://etcd.io/docs/latest/learning/why/ - etcd documentation (CP system)",
              "https://www.mongodb.com/docs/manual/core/replica-set-write-concern/ - MongoDB write concern (tunable consistency)",
              "https://queue.acm.org/detail.cfm?id=2610533 - PACELC theorem explanation",
              "https://www.the-paper-trail.org/post/2014-08-09-distributed-systems-theory-for-the-distributed-systems-engineer/ - Distributed systems theory resources",
            ],
          },
        ],
      },
      {
        id: 2,
        label: "Case Study",
        concepts: [
          {
            topic: "Microservices API Design: Payment Service",
            tags: [
              "Microservices",
              "API Design",
              "API Gateway",
              "Payment Processing",
              "Idempotency",
              "Rate Limiting",
              "mTLS",
              "Service-to-Service Authentication",
              "Security",
              "Distributed Systems",
              "Circuit Breaker",
              "Request Deduplication",
              "Retry Logic",
              "Backend for Frontend",
            ],

            explanation: `
<div>
  <h2>Microservices API Design: Building a Payment Service</h2>
  <p>
    When breaking a monolithic application into microservices, designing robust APIs is critical for 
    reliability, security, and maintainability. This guide walks through designing a Payment Service 
    with real-world considerations: idempotency to prevent double charges, secure service-to-service 
    authentication with mTLS, API gateway patterns for routing and cross-cutting concerns, and rate 
    limiting strategies to protect your services.
  </p>

  <h3>The Problem: Designing a Payment Service</h3>
  <pre><code>
// Scenario: Breaking Monolithic E-Commerce into Microservices
// ============================================================

// Before (Monolith):
class MonolithicApp {
  async checkout(userId, cartId) {
    // Everything in one place
    const cart = await this.db.getCart(cartId);
    const user = await this.db.getUser(userId);
    const payment = await this.processPayment(user, cart.total);
    const order = await this.db.createOrder(userId, cart, payment);
    await this.db.clearCart(cartId);
    await this.sendEmail(user.email, order);
    return order;
  }
}

// After (Microservices):
// ----------------------
// Order Service → calls Payment Service → calls Notification Service
// 
// Challenges:
// 1. What if network fails after payment but before order created?
// 2. What if request retried - do we charge twice?
// 3. How do services authenticate each other securely?
// 4. How do we prevent one service from overwhelming another?
// 5. How do we route requests and handle cross-cutting concerns?

// Payment Service Requirements:
// ==============================
// ✅ Process payments (charge credit cards)
// ✅ Prevent double charges (idempotency)
// ✅ Secure service-to-service communication (mTLS)
// ✅ Rate limiting (protect from abuse)
// ✅ API gateway (routing, auth, logging)
// ✅ Retry safety (network failures)
// ✅ Circuit breaking (dependency failures)
// ✅ Audit logging (compliance)

// Key Principles:
// ===============
// 1. Design for failure - networks are unreliable
// 2. Idempotency - same request, same result (no duplicates)
// 3. Zero-trust security - authenticate everything
// 4. Rate limiting - protect resources
// 5. Observability - monitor everything
  </code></pre>

  <h3>1. Idempotency: Preventing Double Charges</h3>
  <pre><code>
// Idempotency: Same request executed multiple times = same result
// ================================================================

// The Problem:
// ------------
// User clicks "Pay" → Request to Payment Service → Network timeout
// Did payment succeed? User clicks again → Charged twice!

// Solution: Idempotency Keys
// ---------------------------
// Client generates unique key per operation
// Server stores result keyed by this ID
// Duplicate requests return cached result

// Payment Service API with Idempotency
// =====================================

class PaymentService {
  constructor() {
    this.db = new Database();
    this.redis = new Redis();
    this.stripe = new StripeClient();
  }
  
  // POST /api/payments
  // Body: { amount, currency, customerId, idempotencyKey }
  async processPayment(request, response) {
    const {
      amount,
      currency,
      customerId,
      paymentMethod,
      idempotencyKey  // Client-generated unique ID
    } = request.body;
    
    // 1. Validate idempotency key
    if (!idempotencyKey) {
      return response.status(400).json({
        error: 'Missing idempotency key',
        message: 'Header X-Idempotency-Key is required'
      });
    }
    
    // 2. Check if we've seen this request before
    const cached = await this.redis.get(\`payment:\${idempotencyKey}\`);
    
    if (cached) {
      console.log(\`Duplicate request detected: \${idempotencyKey}\`);
      
      // Return cached response (same as original)
      return response.status(200).json({
        ...JSON.parse(cached),
        duplicate: true  // Indicate this was cached
      });
    }
    
    // 3. Check if payment is in progress
    const lockKey = \`payment-lock:\${idempotencyKey}\`;
    const lock = await this.redis.set(lockKey, '1', 'NX', 'EX', 60);
    
    if (!lock) {
      // Another request with same key is processing
      return response.status(409).json({
        error: 'Payment in progress',
        message: 'Please wait for current payment to complete',
        retryAfter: 5
      });
    }
    
    try {
      // 4. Validate request
      if (amount <= 0) {
        throw new Error('Invalid amount');
      }
      
      if (!['usd', 'eur', 'gbp'].includes(currency)) {
        throw new Error('Unsupported currency');
      }
      
      // 5. Process payment (external API call)
      const paymentIntent = await this.stripe.charges.create({
        amount: amount * 100,  // Convert to cents
        currency,
        customer: customerId,
        payment_method: paymentMethod,
        confirmation_method: 'manual',
        confirm: true,
        metadata: {
          idempotencyKey,
          source: 'order-service'
        }
      });
      
      // 6. Store payment record in database
      const payment = await this.db.payments.create({
        id: generateId(),
        idempotencyKey,
        stripeChargeId: paymentIntent.id,
        amount,
        currency,
        customerId,
        status: 'succeeded',
        createdAt: new Date(),
        metadata: {
          paymentMethod,
          last4: paymentIntent.payment_method_details.card.last4
        }
      });
      
      // 7. Cache the result (TTL: 24 hours)
      const result = {
        paymentId: payment.id,
        status: 'succeeded',
        amount,
        currency,
        chargeId: paymentIntent.id
      };
      
      await this.redis.setex(
        \`payment:\${idempotencyKey}\`,
        86400,  // 24 hours
        JSON.stringify(result)
      );
      
      // 8. Log for audit
      await this.auditLog.create({
        action: 'payment_processed',
        idempotencyKey,
        paymentId: payment.id,
        amount,
        currency,
        timestamp: new Date()
      });
      
      return response.status(200).json(result);
      
    } catch (error) {
      // 9. Handle errors
      console.error('Payment failed:', error);
      
      // Cache failure to prevent retries
      if (error.type === 'card_error') {
        const errorResult = {
          error: 'payment_failed',
          message: error.message,
          code: error.code
        };
        
        await this.redis.setex(
          \`payment:\${idempotencyKey}\`,
          3600,  // 1 hour
          JSON.stringify(errorResult)
        );
        
        return response.status(400).json(errorResult);
      }
      
      // Don't cache transient errors (network issues, etc.)
      return response.status(500).json({
        error: 'payment_processing_error',
        message: 'Payment could not be processed. Please retry.',
        retryable: true
      });
      
    } finally {
      // 10. Always release lock
      await this.redis.del(lockKey);
    }
  }
  
  // GET /api/payments/:idempotencyKey
  // Check payment status by idempotency key
  async getPaymentStatus(request, response) {
    const { idempotencyKey } = request.params;
    
    // Check cache first
    const cached = await this.redis.get(\`payment:\${idempotencyKey}\`);
    if (cached) {
      return response.json(JSON.parse(cached));
    }
    
    // Check database
    const payment = await this.db.payments.findOne({ idempotencyKey });
    
    if (!payment) {
      return response.status(404).json({
        error: 'Payment not found'
      });
    }
    
    return response.json({
      paymentId: payment.id,
      status: payment.status,
      amount: payment.amount,
      currency: payment.currency
    });
  }
}

// Client-Side: Generating Idempotency Keys
// =========================================

class OrderService {
  async createOrder(userId, cart) {
    // Generate idempotency key (UUID v4)
    const idempotencyKey = uuidv4();
    
    // Store key with order attempt
    await this.db.orderAttempts.create({
      userId,
      cartId: cart.id,
      idempotencyKey,
      status: 'pending',
      createdAt: new Date()
    });
    
    // Call payment service with retry logic
    const payment = await this.callPaymentService({
      amount: cart.total,
      currency: 'usd',
      customerId: userId,
      paymentMethod: cart.paymentMethod,
      idempotencyKey  // Same key on all retries
    });
    
    return payment;
  }
  
  async callPaymentService(paymentData) {
    const maxRetries = 3;
    let attempt = 0;
    
    while (attempt < maxRetries) {
      try {
        const response = await fetch('http://payment-service/api/payments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Idempotency-Key': paymentData.idempotencyKey
          },
          body: JSON.stringify(paymentData)
        });
        
        const result = await response.json();
        
        if (response.ok) {
          return result;
        }
        
        // Don't retry on client errors (bad card, etc.)
        if (response.status >= 400 && response.status < 500) {
          throw new Error(\`Payment failed: \${result.message}\`);
        }
        
        // Retry on server errors
        attempt++;
        await this.exponentialBackoff(attempt);
        
      } catch (error) {
        if (attempt === maxRetries - 1) {
          throw error;
        }
        attempt++;
        await this.exponentialBackoff(attempt);
      }
    }
  }
  
  exponentialBackoff(attempt) {
    const delay = Math.min(1000 * Math.pow(2, attempt), 10000);
    return new Promise(resolve => setTimeout(resolve, delay));
  }
}

// Idempotency Key Best Practices:
// ================================
// 1. Client generates key (UUID v4, ULID)
// 2. Key is unique per logical operation (not per retry)
// 3. Server stores result for 24+ hours
// 4. Include key in header: X-Idempotency-Key
// 5. Return cached result for duplicates (don't re-process)
// 6. Use distributed lock to prevent race conditions
// 7. Cache both success and permanent failures
// 8. Don't cache transient failures (network errors)
// 9. Log idempotency key for debugging
// 10. Clean up old keys periodically

// Alternative: Database-level idempotency
// ========================================

class DatabaseIdempotency {
  async processPayment(paymentData) {
    const { idempotencyKey } = paymentData;
    
    try {
      // Insert with unique constraint on idempotency_key
      const payment = await this.db.payments.create({
        idempotency_key: idempotencyKey,
        status: 'pending',
        ...paymentData
      });
      
      // Process payment
      const result = await this.stripe.charge(paymentData);
      
      // Update status
      await this.db.payments.update(
        { id: payment.id },
        { status: 'succeeded', charge_id: result.id }
      );
      
      return result;
      
    } catch (error) {
      // Duplicate key error = already processed
      if (error.code === 'UNIQUE_VIOLATION') {
        // Return existing payment
        const existing = await this.db.payments.findOne({
          idempotency_key: idempotencyKey
        });
        return existing;
      }
      
      throw error;
    }
  }
}

// Idempotency for Different Operations:
// ======================================

// POST (Create) - Idempotent with key
// PUT (Update) - Naturally idempotent (same update, same result)
// DELETE - Naturally idempotent (deleting twice = same result)
// GET - Always idempotent (read-only)

// Non-idempotent without key:
// - POST /payments (creates new payment each time)
// - POST /orders (creates new order each time)
// - POST /notifications (sends notification each time)
  </code></pre>

  <h3>2. Service-to-Service Authentication with mTLS</h3>
  <pre><code>
// mTLS: Mutual TLS - Both client and server authenticate each other
// ==================================================================

// Traditional TLS (HTTPS):
// - Client verifies server's certificate
// - Server doesn't verify client
// - Anyone can connect to your API

// mTLS (Mutual TLS):
// - Client verifies server's certificate
// - Server verifies client's certificate
// - Only services with valid certificates can connect

// Why mTLS for Microservices?
// ============================
// ✅ Strong authentication (cryptographic, not passwords)
// ✅ Zero-trust security (every service verified)
// ✅ Automatic encryption (TLS)
// ✅ Service identity (certificate = identity)
// ✅ Certificate rotation (automated with service mesh)

// Setting Up mTLS
// ===============

// 1. Generate Certificate Authority (CA)
const forge = require('node-forge');

class CertificateAuthority {
  generateCA() {
    // Generate CA key pair
    const keys = forge.pki.rsa.generateKeyPair(2048);
    
    // Create CA certificate
    const cert = forge.pki.createCertificate();
    cert.publicKey = keys.publicKey;
    cert.serialNumber = '01';
    cert.validity.notBefore = new Date();
    cert.validity.notAfter = new Date();
    cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 10);
    
    const attrs = [{
      name: 'commonName',
      value: 'My Company CA'
    }, {
      name: 'organizationName',
      value: 'My Company'
    }];
    
    cert.setSubject(attrs);
    cert.setIssuer(attrs);
    
    // Set extensions
    cert.setExtensions([{
      name: 'basicConstraints',
      cA: true
    }, {
      name: 'keyUsage',
      keyCertSign: true,
      digitalSignature: true,
      keyEncipherment: true
    }]);
    
    // Self-sign
    cert.sign(keys.privateKey);
    
    return {
      cert: forge.pki.certificateToPem(cert),
      key: forge.pki.privateKeyToPem(keys.privateKey)
    };
  }
  
  // Generate service certificate signed by CA
  generateServiceCert(serviceName, caCert, caKey) {
    const keys = forge.pki.rsa.generateKeyPair(2048);
    
    const cert = forge.pki.createCertificate();
    cert.publicKey = keys.publicKey;
    cert.serialNumber = Math.random().toString();
    cert.validity.notBefore = new Date();
    cert.validity.notAfter = new Date();
    cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);
    
    // Service identity in certificate
    cert.setSubject([{
      name: 'commonName',
      value: serviceName
    }, {
      name: 'organizationName',
      value: 'My Company'
    }]);
    
    cert.setIssuer(forge.pki.certificateFromPem(caCert).subject.attributes);
    
    cert.setExtensions([{
      name: 'basicConstraints',
      cA: false
    }, {
      name: 'keyUsage',
      digitalSignature: true,
      keyEncipherment: true
    }, {
      name: 'subjectAltName',
      altNames: [{
        type: 2, // DNS
        value: \`\${serviceName}.internal\`
      }, {
        type: 2,
        value: serviceName
      }]
    }]);
    
    // Sign with CA private key
    const caPrivateKey = forge.pki.privateKeyFromPem(caKey);
    cert.sign(caPrivateKey);
    
    return {
      cert: forge.pki.certificateToPem(cert),
      key: forge.pki.privateKeyToPem(keys.privateKey)
    };
  }
}

// 2. Payment Service with mTLS (Server Side)
// ===========================================

const https = require('https');
const fs = require('fs');
const express = require('express');

class SecurePaymentService {
  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
  }
  
  setupMiddleware() {
    this.app.use(express.json());
    
    // Extract client certificate info
    this.app.use((req, res, next) => {
      if (req.client.authorized) {
        // Client certificate is valid
        const cert = req.socket.getPeerCertificate();
        
        // Extract service identity from certificate
        req.serviceIdentity = {
          commonName: cert.subject.CN,
          organization: cert.subject.O,
          fingerprint: cert.fingerprint,
          validFrom: cert.valid_from,
          validTo: cert.valid_to
        };
        
        console.log(\`Authenticated service: \${req.serviceIdentity.commonName}\`);
        next();
      } else {
        // Client certificate invalid or missing
        console.error('Client certificate verification failed');
        res.status(401).json({
          error: 'Unauthorized',
          message: 'Valid client certificate required'
        });
      }
    });
    
    // Authorization based on service identity
    this.app.use((req, res, next) => {
      const allowedServices = ['order-service', 'billing-service', 'admin-service'];
      
      if (allowedServices.includes(req.serviceIdentity.commonName)) {
        next();
      } else {
        res.status(403).json({
          error: 'Forbidden',
          message: \`Service '\${req.serviceIdentity.commonName}' not authorized\`
        });
      }
    });
  }
  
  setupRoutes() {
    this.app.post('/api/payments', this.processPayment.bind(this));
    this.app.get('/api/payments/:id', this.getPayment.bind(this));
  }
  
  async processPayment(req, res) {
    // Service identity available in req.serviceIdentity
    console.log(\`Payment request from: \${req.serviceIdentity.commonName}\`);
    
    // Process payment...
    res.json({ success: true });
  }
  
  async getPayment(req, res) {
    res.json({ payment: 'details' });
  }
  
  start() {
    // Load certificates
    const options = {
      // Server certificate and key
      cert: fs.readFileSync('./certs/payment-service.crt'),
      key: fs.readFileSync('./certs/payment-service.key'),
      
      // CA certificate (to verify client certificates)
      ca: fs.readFileSync('./certs/ca.crt'),
      
      // Require client certificates
      requestCert: true,
      rejectUnauthorized: true
    };
    
    // Create HTTPS server with mTLS
    const server = https.createServer(options, this.app);
    
    server.listen(443, () => {
      console.log('Payment Service running with mTLS on port 443');
    });
  }
}

// 3. Order Service with mTLS (Client Side)
// =========================================

const https = require('https');

class OrderServiceClient {
  constructor() {
    // Load client certificates
    this.httpsAgent = new https.Agent({
      // Client certificate and key
      cert: fs.readFileSync('./certs/order-service.crt'),
      key: fs.readFileSync('./certs/order-service.key'),
      
      // CA certificate (to verify server)
      ca: fs.readFileSync('./certs/ca.crt'),
      
      // Reject unauthorized (verify server certificate)
      rejectUnauthorized: true
    });
  }
  
  async createPayment(paymentData) {
    try {
      const response = await fetch('https://payment-service.internal/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Idempotency-Key': paymentData.idempotencyKey
        },
        body: JSON.stringify(paymentData),
        agent: this.httpsAgent  // Use mTLS agent
      });
      
      if (!response.ok) {
        throw new Error(\`Payment failed: \${response.statusText}\`);
      }
      
      return await response.json();
      
    } catch (error) {
      console.error('Payment service call failed:', error);
      throw error;
    }
  }
}

// Using Service Mesh for mTLS (Istio, Linkerd)
// =============================================

// Service Mesh automates mTLS:
// - Automatic certificate generation and rotation
// - Transparent encryption (no code changes)
// - Service-to-service authentication
// - Traffic policies and routing

// Istio Example:
// --------------

// Enable mTLS in Istio (YAML config)
/*
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
  namespace: production
spec:
  mtls:
    mode: STRICT  # Require mTLS for all services
*/

// Service doesn't need certificate handling code
// Istio sidecar (Envoy proxy) handles mTLS automatically

class PaymentServiceWithServiceMesh {
  // No certificate loading needed!
  // Service mesh handles it
  
  setupMiddleware() {
    // Extract service identity from Istio headers
    this.app.use((req, res, next) => {
      // Istio adds these headers
      const sourceService = req.headers['x-forwarded-client-cert'];
      const sourcePrincipal = req.headers['x-envoy-peer-principal'];
      
      if (sourcePrincipal) {
        req.serviceIdentity = {
          principal: sourcePrincipal,
          // Format: spiffe://cluster.local/ns/default/sa/order-service
        };
        next();
      } else {
        res.status(401).json({ error: 'Unauthorized' });
      }
    });
  }
}

// mTLS Best Practices:
// ====================
// 1. Use short-lived certificates (rotate every 24 hours)
// 2. Automate certificate rotation (don't do manually)
// 3. Store certificates securely (Kubernetes secrets, Vault)
// 4. Monitor certificate expiration
// 5. Use service mesh when possible (Istio, Linkerd)
// 6. Implement certificate revocation (CRL or OCSP)
// 7. Log certificate validation failures
// 8. Use strong cipher suites (TLS 1.3)
// 9. Verify certificate chain
// 10. Include service identity in certificate SAN

// Certificate Rotation Strategy:
// ===============================

class CertificateRotation {
  constructor() {
    this.currentCert = null;
    this.nextCert = null;
    this.rotationInterval = 24 * 60 * 60 * 1000; // 24 hours
  }
  
  async start() {
    // Load initial certificate
    this.currentCert = await this.loadCertificate();
    
    // Generate next certificate
    this.nextCert = await this.generateNewCertificate();
    
    // Schedule rotation
    setInterval(() => {
      this.rotateCertificate();
    }, this.rotationInterval);
  }
  
  async rotateCertificate() {
    console.log('Rotating certificate...');
    
    // Switch to next certificate
    this.currentCert = this.nextCert;
    
    // Generate new next certificate
    this.nextCert = await this.generateNewCertificate();
    
    // Update server to use new certificate
    await this.updateServerCertificate(this.currentCert);
    
    console.log('Certificate rotated successfully');
  }
  
  async loadCertificate() {
    // Load from secret management system
    return await this.vaultClient.getCertificate('payment-service');
  }
  
  async generateNewCertificate() {
    // Request new certificate from CA
    return await this.caClient.issueCertificate('payment-service');
  }
  
  async updateServerCertificate(cert) {
    // Graceful reload without downtime
    this.server.updateContext({
      cert: cert.cert,
      key: cert.key
    });
  }
}
  </code></pre>

  <h3>3. API Gateway Patterns</h3>
  <pre><code>
// API Gateway: Single entry point for all client requests
// ========================================================

// Why API Gateway?
// ================
// ✅ Single entry point (simplifies client)
// ✅ Authentication/Authorization (centralized)
// ✅ Rate limiting (protect services)
// ✅ Request routing (to correct service)
// ✅ Load balancing (distribute traffic)
// ✅ Protocol translation (REST → gRPC)
// ✅ Request/response transformation
// ✅ Caching (reduce backend calls)
// ✅ Monitoring and logging (observability)
// ✅ SSL termination (offload from services)

// Architecture:
// =============
/*
Clients (Mobile, Web, API)
         ↓
    API Gateway
    ↙    ↓    ↘
Order  Payment  Inventory
Service Service  Service
*/

// API Gateway Implementation
// ===========================

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

class APIGateway {
  constructor() {
    this.app = express();
    this.services = new Map();
    this.setupMiddleware();
    this.setupRoutes();
  }
  
  // Register microservices
  registerService(name, config) {
    this.services.set(name, config);
  }
  
  setupMiddleware() {
    // 1. Request logging
    this.app.use((req, res, next) => {
      const start = Date.now();
      
      res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(\`\${req.method} \${req.path} \${res.statusCode} \${duration}ms\`);
      });
      
      next();
    });
    
    // 2. CORS handling
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
      if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
      }
      
      next();
    });
    
    // 3. Authentication (JWT)
    this.app.use(async (req, res, next) => {
      // Skip auth for health checks
      if (req.path === '/health') {
        return next();
      }
      
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({
          error: 'Unauthorized',
          message: 'No token provided'
        });
      }
      
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
      } catch (error) {
        return res.status(401).json({
          error: 'Unauthorized',
          message: 'Invalid token'
        });
      }
    });
    
    // 4. Rate limiting
    this.app.use(this.rateLimitMiddleware());
    
    // 5. Request ID (for tracing)
    this.app.use((req, res, next) => {
      req.id = req.headers['x-request-id'] || uuidv4();
      res.setHeader('X-Request-ID', req.id);
      next();
    });
  }
  
  setupRoutes() {
    // Route to Order Service
    this.app.use('/api/orders', createProxyMiddleware({
      target: 'http://order-service:3001',
      changeOrigin: true,
      onProxyReq: (proxyReq, req) => {
        // Add user context
        proxyReq.setHeader('X-User-ID', req.user.id);
        proxyReq.setHeader('X-User-Roles', JSON.stringify(req.user.roles));
        proxyReq.setHeader('X-Request-ID', req.id);
      },
      onError: (err, req, res) => {
        console.error('Order service proxy error:', err);
        res.status(503).json({
          error: 'Service unavailable',
          message: 'Order service is currently unavailable'
        });
      }
    }));
    
    // Route to Payment Service
    this.app.use('/api/payments', createProxyMiddleware({
      target: 'http://payment-service:3002',
      changeOrigin: true,
      onProxyReq: (proxyReq, req) => {
        proxyReq.setHeader('X-User-ID', req.user.id);
        proxyReq.setHeader('X-Request-ID', req.id);
        
        // Service-to-service authentication
        proxyReq.setHeader('X-Service-Token', this.getServiceToken());
      }
    }));
    
    // Route to Inventory Service
    this.app.use('/api/inventory', createProxyMiddleware({
      target: 'http://inventory-service:3003',
      changeOrigin: true,
      onProxyReq: (proxyReq, req) => {
        proxyReq.setHeader('X-User-ID', req.user.id);
        proxyReq.setHeader('X-Request-ID', req.id);
      }
    }));
    
    // Health check
    this.app.get('/health', (req, res) => {
      res.json({ status: 'healthy', timestamp: new Date() });
    });
  }
  
  rateLimitMiddleware() {
    const redis = new Redis();
    
    return async (req, res, next) => {
      const key = \`ratelimit:\${req.user.id}:\${req.path}\`;
      const limit = 100; // requests per minute
      const window = 60; // seconds
      
      const current = await redis.incr(key);
      
      if (current === 1) {
        await redis.expire(key, window);
      }
      
      if (current > limit) {
        return res.status(429).json({
          error: 'Rate limit exceeded',
          limit,
          window,
          retryAfter: await redis.ttl(key)
        });
      }
      
      res.setHeader('X-RateLimit-Limit', limit);
      res.setHeader('X-RateLimit-Remaining', limit - current);
      
      next();
    };
  }
  
  getServiceToken() {
    // Generate service-to-service JWT
    return jwt.sign(
      {
        service: 'api-gateway',
        type: 'service-to-service'
      },
      process.env.SERVICE_SECRET,
      { expiresIn: '5m' }
    );
  }
  
  start() {
    this.app.listen(8080, () => {
      console.log('API Gateway running on port 8080');
    });
  }
}

// Usage
const gateway = new APIGateway();
gateway.start();

// Backend for Frontend (BFF) Pattern
// ===================================

// Different frontends need different data structures
// Mobile needs minimal data (bandwidth constrained)
// Web needs richer data
// Admin dashboard needs everything

class BFFGateway {
  constructor() {
    this.app = express();
    this.setupBFFRoutes();
  }
  
  setupBFFRoutes() {
    // Mobile BFF
    this.app.get('/mobile/api/orders/:id', async (req, res) => {
      // Aggregate data from multiple services
      const [order, payment, shipping] = await Promise.all([
        this.callService('order-service', \`/orders/\${req.params.id}\`),
        this.callService('payment-service', \`/payments/order/\${req.params.id}\`),
        this.callService('shipping-service', \`/tracking/\${req.params.id}\`)
      ]);
      
      // Return minimal mobile-optimized response
      res.json({
        id: order.id,
        status: order.status,
        total: payment.amount,
        tracking: shipping.trackingNumber
      });
    });
    
    // Web BFF
    this.app.get('/web/api/orders/:id', async (req, res) => {
      // Same services, richer response
      const [order, payment, shipping, items] = await Promise.all([
        this.callService('order-service', \`/orders/\${req.params.id}\`),
        this.callService('payment-service', \`/payments/order/\${req.params.id}\`),
        this.callService('shipping-service', \`/tracking/\${req.params.id}\`),
        this.callService('catalog-service', \`/items?ids=\${order.itemIds.join(',')}\`)
      ]);
      
      // Return full web response
      res.json({
        order,
        payment: {
          method: payment.method,
          last4: payment.last4,
          amount: payment.amount,
          status: payment.status
        },
        shipping: {
          trackingNumber: shipping.trackingNumber,
          estimatedDelivery: shipping.estimatedDelivery,
          carrier: shipping.carrier,
          status: shipping.status
        },
        items: items.map(item => ({
          name: item.name,
          image: item.imageUrl,
          price: item.price,
          quantity: order.quantities[item.id]
        }))
      });
    });
  }
  
  async callService(service, path) {
    const response = await fetch(\`http://\${service}\${path}\`);
    return await response.json();
  }
}

// GraphQL Gateway (Alternative)
// ==============================

const { ApolloServer, gql } = require('apollo-server-express');

class GraphQLGateway {
  constructor() {
    this.typeDefs = gql\`
      type Order {
        id: ID!
        status: String!
        total: Float!
        payment: Payment
        items: [OrderItem!]!
      }
      
      type Payment {
        id: ID!
        amount: Float!
        status: String!
        method: String!
      }
      
      type OrderItem {
        productId: ID!
        name: String!
        quantity: Int!
        price: Float!
      }
      
      type Query {
        order(id: ID!): Order
        orders(userId: ID!): [Order!]!
      }
      
      type Mutation {
        createOrder(input: CreateOrderInput!): Order
        createPayment(input: CreatePaymentInput!): Payment
      }
      
      input CreateOrderInput {
        userId: ID!
        items: [OrderItemInput!]!
      }
      
      input CreatePaymentInput {
        orderId: ID!
        amount: Float!
        method: String!
      }
      
      input OrderItemInput {
        productId: ID!
        quantity: Int!
      }
    \`;
    
    this.resolvers = {
      Query: {
        order: async (_, { id }, context) => {
          return await this.orderService.getOrder(id);
        },
        orders: async (_, { userId }, context) => {
          return await this.orderService.getOrdersByUser(userId);
        }
      },
      
      Mutation: {
        createPayment: async (_, { input }, context) => {
          return await this.paymentService.createPayment(input);
        }
      },
      
      Order: {
        // Resolve nested fields
        payment: async (order, _, context) => {
          return await this.paymentService.getPaymentForOrder(order.id);
        },
        items: async (order, _, context) => {
          const products = await this.catalogService.getProducts(
            order.itemIds
          );
          return products.map((p, i) => ({
            ...p,
            quantity: order.quantities[i]
          }));
        }
      }
    };
  }
  
  createServer() {
    return new ApolloServer({
      typeDefs: this.typeDefs,
      resolvers: this.resolvers,
      context: ({ req }) => ({
        user: req.user,
        requestId: req.id
      })
    });
  }
}

// API Gateway Best Practices:
// ============================
// 1. Keep gateway thin (routing, not business logic)
// 2. Implement circuit breakers (prevent cascade failures)
// 3. Cache frequently accessed data
// 4. Version APIs (backward compatibility)
// 5. Implement health checks for all services
// 6. Use service discovery (Consul, Eureka)
// 7. Add request/response logging
// 8. Implement distributed tracing (Jaeger, Zipkin)
// 9. Handle timeouts gracefully
// 10. Provide API documentation (Swagger/OpenAPI)

// Circuit Breaker in Gateway:
// ============================

class CircuitBreakerGateway {
  constructor() {
    this.circuitBreakers = new Map();
  }
  
  getCircuitBreaker(serviceName) {
    if (!this.circuitBreakers.has(serviceName)) {
      this.circuitBreakers.set(serviceName, new CircuitBreaker({
        failureThreshold: 5,
        resetTimeout: 60000,
        timeout: 3000
      }));
    }
    return this.circuitBreakers.get(serviceName);
  }
  
  async callService(serviceName, path, options) {
    const breaker = this.getCircuitBreaker(serviceName);
    
    try {
      return await breaker.execute(async () => {
        const response = await fetch(\`http://\${serviceName}\${path}\`, {
          ...options,
          timeout: 3000
        });
        
        if (!response.ok) {
          throw new Error(\`Service error: \${response.status}\`);
        }
        
        return await response.json();
      });
    } catch (error) {
      console.error(\`Circuit breaker: \${serviceName} call failed\`, error);
      
      // Return cached data or fallback
      return this.getFallbackResponse(serviceName, path);
    }
  }
  
  getFallbackResponse(serviceName, path) {
    // Return cached response or error
    return {
      error: 'Service unavailable',
      service: serviceName,
      cached: true
    };
  }
}
  </code></pre>

  <h3>4. Rate Limiting Strategies</h3>
  <pre><code>
// Rate Limiting: Protecting Services from Overload
// =================================================

// Why Rate Limiting?
// ==================
// ✅ Prevent DDoS attacks
// ✅ Ensure fair usage (prevent single user monopolizing)
// ✅ Cost control (limit external API calls)
// ✅ Maintain SLA (consistent performance)
// ✅ Prevent abuse (credential stuffing, scraping)

// Rate Limiting Algorithms
// =========================

// 1. Fixed Window Counter
// ------------------------
// Simple: Count requests per time window

class FixedWindowRateLimiter {
  constructor(redis, limit, windowSeconds) {
    this.redis = redis;
    this.limit = limit;
    this.window = windowSeconds;
  }
  
  async isAllowed(userId) {
    const key = \`ratelimit:\${userId}:\${this.getCurrentWindow()}\`;
    
    const current = await this.redis.incr(key);
    
    if (current === 1) {
      // First request in window - set expiration
      await this.redis.expire(key, this.window);
    }
    
    return current <= this.limit;
  }
  
  getCurrentWindow() {
    // Current time divided by window size
    return Math.floor(Date.now() / (this.window * 1000));
  }
}

// Usage:
const limiter = new FixedWindowRateLimiter(redis, 100, 60); // 100 req/min

app.use(async (req, res, next) => {
  if (await limiter.isAllowed(req.user.id)) {
    next();
  } else {
    res.status(429).json({
      error: 'Rate limit exceeded',
      limit: 100,
      window: '60s'
    });
  }
});

// Problem: Burst at window boundaries
// User sends 100 requests at 12:00:59
// User sends 100 requests at 12:01:00
// = 200 requests in 2 seconds!

// 2. Sliding Window Log
// ----------------------
// Track timestamp of each request

class SlidingWindowLogRateLimiter {
  constructor(redis, limit, windowMs) {
    this.redis = redis;
    this.limit = limit;
    this.window = windowMs;
  }
  
  async isAllowed(userId) {
    const key = \`ratelimit:\${userId}\`;
    const now = Date.now();
    const windowStart = now - this.window;
    
    // Remove old entries
    await this.redis.zremrangebyscore(key, 0, windowStart);
    
    // Count requests in current window
    const count = await this.redis.zcard(key);
    
    if (count < this.limit) {
      // Add current request timestamp
      await this.redis.zadd(key, now, \`\${now}-\${Math.random()}\`);
      await this.redis.expire(key, Math.ceil(this.window / 1000));
      return true;
    }
    
    return false;
  }
}

// More accurate but uses more memory
// Each request stored individually

// 3. Sliding Window Counter
// --------------------------
// Hybrid: More efficient than log, more accurate than fixed

class SlidingWindowCounterRateLimiter {
  constructor(redis, limit, windowSeconds) {
    this.redis = redis;
    this.limit = limit;
    this.window = windowSeconds;
  }
  
  async isAllowed(userId) {
    const now = Date.now();
    const currentWindow = Math.floor(now / (this.window * 1000));
    const previousWindow = currentWindow - 1;
    
    const currentKey = \`ratelimit:\${userId}:\${currentWindow}\`;
    const previousKey = \`ratelimit:\${userId}:\${previousWindow}\`;
    
    // Get counts from both windows
    const [currentCount, previousCount] = await Promise.all([
      this.redis.get(currentKey),
      this.redis.get(previousKey)
    ]);
    
    const current = parseInt(currentCount || '0');
    const previous = parseInt(previousCount || '0');
    
    // Calculate position in current window
    const elapsed = now - (currentWindow * this.window * 1000);
    const percentage = elapsed / (this.window * 1000);
    
    // Weighted count (more weight on current window)
    const estimatedCount = current + (previous * (1 - percentage));
    
    if (estimatedCount < this.limit) {
      await this.redis.incr(currentKey);
      await this.redis.expire(currentKey, this.window * 2);
      return true;
    }
    
    return false;
  }
}

// Best of both: Accurate and efficient

// 4. Token Bucket
// ---------------
// Tokens refill over time, consumed per request

class TokenBucketRateLimiter {
  constructor(redis, capacity, refillRate) {
    this.redis = redis;
    this.capacity = capacity;  // Max tokens
    this.refillRate = refillRate;  // Tokens per second
  }
  
  async isAllowed(userId, tokens = 1) {
    const key = \`tokenbucket:\${userId}\`;
    
    // Get current bucket state
    const bucket = await this.redis.get(key);
    const now = Date.now();
    
    let currentTokens, lastRefill;
    
    if (bucket) {
      const state = JSON.parse(bucket);
      currentTokens = state.tokens;
      lastRefill = state.lastRefill;
      
      // Refill tokens based on time elapsed
      const elapsed = (now - lastRefill) / 1000;
      const newTokens = elapsed * this.refillRate;
      currentTokens = Math.min(this.capacity, currentTokens + newTokens);
    } else {
      // First request - bucket is full
      currentTokens = this.capacity;
      lastRefill = now;
    }
    
    // Check if enough tokens
    if (currentTokens >= tokens) {
      currentTokens -= tokens;
      
      await this.redis.setex(
        key,
        3600,  // 1 hour expiry
        JSON.stringify({
          tokens: currentTokens,
          lastRefill: now
        })
      );
      
      return true;
    }
    
    return false;
  }
}

// Usage: Different operations cost different tokens
const limiter = new TokenBucketRateLimiter(redis, 1000, 10); // 1000 cap, 10/sec

app.post('/api/payments', async (req, res) => {
  // Payment costs 10 tokens (expensive operation)
  if (await limiter.isAllowed(req.user.id, 10)) {
    // Process payment
  } else {
    res.status(429).json({ error: 'Rate limit exceeded' });
  }
});

app.get('/api/products', async (req, res) => {
  // Read costs 1 token
  if (await limiter.isAllowed(req.user.id, 1)) {
    // Return products
  }
});

// 5. Leaky Bucket
// ---------------
// Requests queued, processed at fixed rate

class LeakyBucketRateLimiter {
  constructor(redis, capacity, leakRate) {
    this.redis = redis;
    this.capacity = capacity;  // Max queue size
    this.leakRate = leakRate;  // Requests per second
  }
  
  async enqueue(userId, request) {
    const key = \`leakybucket:\${userId}\`;
    
    // Get current queue size
    const queueSize = await this.redis.llen(key);
    
    if (queueSize >= this.capacity) {
      throw new Error('Queue full - request rejected');
    }
    
    // Add to queue
    await this.redis.rpush(key, JSON.stringify(request));
    await this.redis.expire(key, 3600);
    
    return {
      queued: true,
      position: queueSize + 1
    };
  }
  
  async processQueue(userId) {
    const key = \`leakybucket:\${userId}\`;
    
    // Process one request (leak)
    const request = await this.redis.lpop(key);
    
    if (request) {
      return JSON.parse(request);
    }
    
    return null;
  }
  
  startLeaking(userId) {
    // Process queue at fixed rate
    const interval = 1000 / this.leakRate;  // ms per request
    
    setInterval(async () => {
      const request = await this.processQueue(userId);
      if (request) {
        await this.executeRequest(request);
      }
    }, interval);
  }
}

// Rate Limiting by Different Dimensions
// ======================================

class MultiDimensionalRateLimiter {
  constructor(redis) {
    this.redis = redis;
  }
  
  async checkLimits(req) {
    const checks = await Promise.all([
      // Per user
      this.checkLimit(\`user:\${req.user.id}\`, 100, 60),
      
      // Per user per endpoint
      this.checkLimit(\`user:\${req.user.id}:\${req.path}\`, 20, 60),
      
      // Per API key
      this.checkLimit(\`apikey:\${req.apiKey}\`, 1000, 60),
      
      // Per IP address
      this.checkLimit(\`ip:\${req.ip}\`, 50, 60),
      
      // Global (all users)
      this.checkLimit('global', 10000, 60)
    ]);
    
    // All checks must pass
    return checks.every(check => check.allowed);
  }
  
  async checkLimit(key, limit, window) {
    const current = await this.redis.incr(\`ratelimit:\${key}\`);
    
    if (current === 1) {
      await this.redis.expire(\`ratelimit:\${key}\`, window);
    }
    
    return {
      allowed: current <= limit,
      current,
      limit,
      remaining: Math.max(0, limit - current)
    };
  }
}

// Tiered Rate Limiting (by subscription plan)
// ============================================

class TieredRateLimiter {
  constructor(redis) {
    this.redis = redis;
    this.tiers = {
      free: { limit: 100, window: 60 },
      basic: { limit: 1000, window: 60 },
      premium: { limit: 10000, window: 60 },
      enterprise: { limit: 100000, window: 60 }
    };
  }
  
  async isAllowed(user) {
    const tier = this.tiers[user.subscriptionPlan];
    const key = \`ratelimit:\${user.id}\`;
    
    const current = await this.redis.incr(key);
    
    if (current === 1) {
      await this.redis.expire(key, tier.window);
    }
    
    const allowed = current <= tier.limit;
    
    // Add headers
    return {
      allowed,
      headers: {
        'X-RateLimit-Limit': tier.limit,
        'X-RateLimit-Remaining': Math.max(0, tier.limit - current),
        'X-RateLimit-Reset': await this.redis.ttl(key)
      }
    };
  }
}

// Distributed Rate Limiting
// ==========================

class DistributedRateLimiter {
  constructor(redisCluster) {
    this.redis = redisCluster;  // Redis Cluster
  }
  
  async isAllowed(userId) {
    // Use Redis Cluster for distributed rate limiting
    // Multiple API gateway instances share rate limit state
    
    const key = \`ratelimit:\${userId}\`;
    
    // Atomic increment and check
    const lua = \`
      local current = redis.call('incr', KEYS[1])
      if current == 1 then
        redis.call('expire', KEYS[1], ARGV[2])
      end
      if current > tonumber(ARGV[1]) then
        return 0
      else
        return 1
      end
    \`;
    
    const allowed = await this.redis.eval(
      lua,
      1,
      key,
      100,  // limit
      60    // window
    );
    
    return allowed === 1;
  }
}

// Rate Limit Response Headers
// ============================

app.use(async (req, res, next) => {
  const result = await rateLimiter.check(req.user.id);
  
  // Standard rate limit headers
  res.setHeader('X-RateLimit-Limit', result.limit);
  res.setHeader('X-RateLimit-Remaining', result.remaining);
  res.setHeader('X-RateLimit-Reset', result.reset);
  
  if (!result.allowed) {
    res.setHeader('Retry-After', result.retryAfter);
    return res.status(429).json({
      error: 'Too Many Requests',
      message: \`Rate limit exceeded. Try again in \${result.retryAfter} seconds.\`,
      limit: result.limit,
      retryAfter: result.retryAfter
    });
  }
  
  next();
});

// Graceful Rate Limiting
// =======================

class GracefulRateLimiter {
  async handleRequest(req, res) {
    const result = await this.checkLimit(req.user.id);
    
    if (result.remaining < result.limit * 0.1) {
      // Under 10% remaining - warn user
      res.setHeader('Warning', '199 - "Rate limit nearly exceeded"');
    }
    
    if (!result.allowed) {
      // Check if user has burst capacity
      if (req.user.plan === 'premium') {
        // Allow burst (one-time exceed)
        const burstAllowed = await this.allowBurst(req.user.id);
        
        if (burstAllowed) {
          res.setHeader('X-RateLimit-Burst', 'true');
          return true;
        }
      }
      
      // Queue request instead of rejecting
      if (req.headers['x-queue-request'] === 'true') {
        await this.queueRequest(req);
        return res.status(202).json({
          message: 'Request queued',
          queuePosition: await this.getQueuePosition(req.user.id)
        });
      }
      
      return false;
    }
    
    return true;
  }
}

// Rate Limiting Best Practices:
// ==============================
// 1. Choose algorithm based on use case
// 2. Use Redis for distributed limiting
// 3. Include rate limit headers
// 4. Different limits for different operations
// 5. Tier limits by subscription plan
// 6. Monitor rate limit hits
// 7. Implement graceful degradation
// 8. Allow burst for premium users
// 9. Queue instead of reject when possible
// 10. Test rate limiting in load tests
  </code></pre>

  <h3>5. Complete Payment Service Design</h3>
  <pre><code>
// Putting It All Together: Production-Ready Payment Service
// ==========================================================

const express = require('express');
const { createClient } = require('redis');

class PaymentService {
  constructor() {
    this.app = express();
    this.redis = createClient();
    this.db = new PostgresClient();
    this.stripe = new StripeClient();
    this.logger = new Logger('payment-service');
    
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }
  
  setupMiddleware() {
    // 1. Request parsing
    this.app.use(express.json({ limit: '1mb' }));
    
    // 2. Request ID and correlation
    this.app.use((req, res, next) => {
      req.id = req.headers['x-request-id'] || uuidv4();
      res.setHeader('X-Request-ID', req.id);
      next();
    });
    
    // 3. Logging
    this.app.use((req, res, next) => {
      this.logger.info({
        requestId: req.id,
        method: req.method,
        path: req.path,
        userAgent: req.headers['user-agent']
      });
      next();
    });
    
    // 4. Service authentication (mTLS or JWT)
    this.app.use(this.authenticateService.bind(this));
    
    // 5. Rate limiting
    this.app.use(this.rateLimitMiddleware.bind(this));
    
    // 6. Circuit breaker for external dependencies
    this.setupCircuitBreakers();
  }
  
  async authenticateService(req, res, next) {
    // Extract service identity from mTLS certificate or JWT
    const serviceToken = req.headers['x-service-token'];
    
    if (!serviceToken) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Service authentication required'
      });
    }
    
    try {
      const decoded = jwt.verify(serviceToken, process.env.SERVICE_SECRET);
      req.service = decoded;
      
      // Check if service is allowed to call this endpoint
      if (!this.isServiceAuthorized(decoded.serviceName, req.path)) {
        return res.status(403).json({
          error: 'Forbidden',
          message: \`Service '\${decoded.serviceName}' not authorized for this endpoint\`
        });
      }
      
      next();
    } catch (error) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid service token'
      });
    }
  }
  
  isServiceAuthorized(serviceName, path) {
    const permissions = {
      'order-service': ['/api/payments', '/api/payments/:id', '/api/refunds'],
      'billing-service': ['/api/payments', '/api/payments/:id'],
      'admin-service': ['/api/payments', '/api/payments/:id', '/api/refunds', '/api/analytics']
    };
    
    return permissions[serviceName]?.some(pattern => {
      return new RegExp(\`^\${pattern.replace(':id', '[^/]+')}\$\`).test(path);
    });
  }
  
  async rateLimitMiddleware(req, res, next) {
    const key = \`ratelimit:\${req.service.serviceName}:\${req.path}\`;
    const limit = 1000; // requests per minute per service
    const window = 60;
    
    const current = await this.redis.incr(key);
    
    if (current === 1) {
      await this.redis.expire(key, window);
    }
    
    if (current > limit) {
      return res.status(429).json({
        error: 'Rate limit exceeded',
        service: req.service.serviceName,
        limit,
        retryAfter: await this.redis.ttl(key)
      });
    }
    
    res.setHeader('X-RateLimit-Limit', limit);
    res.setHeader('X-RateLimit-Remaining', limit - current);
    
    next();
  }
  
  setupCircuitBreakers() {
    this.stripeBreaker = new CircuitBreaker({
      failureThreshold: 5,
      resetTimeout: 60000
    });
    
    this.dbBreaker = new CircuitBreaker({
      failureThreshold: 3,
      resetTimeout: 30000
    });
  }
  
  setupRoutes() {
    // Health check
    this.app.get('/health', (req, res) => {
      res.json({
        status: 'healthy',
        timestamp: new Date(),
        uptime: process.uptime(),
        dependencies: {
          redis: this.redis.status === 'ready',
          database: this.db.isConnected(),
          stripe: this.stripeBreaker.getState() === 'CLOSED'
        }
      });
    });
    
    // Process payment (with idempotency)
    this.app.post('/api/payments', this.processPayment.bind(this));
    
    // Get payment status
    this.app.get('/api/payments/:id', this.getPayment.bind(this));
    
    // Refund payment
    this.app.post('/api/refunds', this.refundPayment.bind(this));
    
    // Webhook for Stripe events
    this.app.post('/webhooks/stripe', this.handleStripeWebhook.bind(this));
  }
  
  async processPayment(req, res) {
    const {
      amount,
      currency,
      customerId,
      paymentMethod,
      orderId,
      metadata = {}
    } = req.body;
    
    // Get idempotency key from header
    const idempotencyKey = req.headers['x-idempotency-key'];
    
    if (!idempotencyKey) {
      return res.status(400).json({
        error: 'Missing idempotency key',
        message: 'Header X-Idempotency-Key is required'
      });
    }
    
    try {
      // 1. Check cache for duplicate request
      const cached = await this.redis.get(\`payment:\${idempotencyKey}\`);
      if (cached) {
        this.logger.info({
          requestId: req.id,
          message: 'Returning cached payment result',
          idempotencyKey
        });
        
        return res.json({
          ...JSON.parse(cached),
          duplicate: true
        });
      }
      
      // 2. Acquire lock
      const lockKey = \`payment-lock:\${idempotencyKey}\`;
      const lock = await this.redis.set(lockKey, '1', 'NX', 'EX', 60);
      
      if (!lock) {
        return res.status(409).json({
          error: 'Payment in progress',
          message: 'Another request with this idempotency key is being processed'
        });
      }
      
      try {
        // 3. Validate input
        this.validatePaymentRequest({ amount, currency, customerId, paymentMethod });
        
        // 4. Call Stripe with circuit breaker
        const paymentIntent = await this.stripeBreaker.execute(async () => {
          return await this.stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency,
            customer: customerId,
            payment_method: paymentMethod,
            confirm: true,
            metadata: {
              orderId,
              idempotencyKey,
              service: req.service.serviceName,
              ...metadata
            }
          });
        });
        
        // 5. Store in database with circuit breaker
        const payment = await this.dbBreaker.execute(async () => {
          return await this.db.payments.create({
            id: uuidv4(),
            idempotency_key: idempotencyKey,
            stripe_payment_intent_id: paymentIntent.id,
            amount,
            currency,
            customer_id: customerId,
            order_id: orderId,
            status: paymentIntent.status,
            payment_method: paymentMethod,
            metadata,
            created_at: new Date(),
            updated_at: new Date()
          });
        });
        
        // 6. Cache result
        const result = {
          paymentId: payment.id,
          status: payment.status,
          amount: payment.amount,
          currency: payment.currency,
          stripePaymentIntentId: paymentIntent.id
        };
        
        await this.redis.setex(
          \`payment:\${idempotencyKey}\`,
          86400, // 24 hours
          JSON.stringify(result)
        );
        
        // 7. Publish event
        await this.publishEvent('payment.created', {
          paymentId: payment.id,
          orderId,
          amount,
          currency,
          status: payment.status
        });
        
        // 8. Audit log
        await this.auditLog({
          action: 'payment.created',
          paymentId: payment.id,
          service: req.service.serviceName,
          requestId: req.id,
          idempotencyKey,
          amount,
          currency
        });
        
        this.logger.info({
          requestId: req.id,
          message: 'Payment processed successfully',
          paymentId: payment.id,
          amount,
          currency
        });
        
        return res.status(201).json(result);
        
      } finally {
        // Always release lock
        await this.redis.del(lockKey);
      }
      
    } catch (error) {
      this.logger.error({
        requestId: req.id,
        message: 'Payment processing failed',
        error: error.message,
        stack: error.stack
      });
      
      // Handle specific error types
      if (error.type === 'StripeCardError') {
        return res.status(400).json({
          error: 'payment_failed',
          message: error.message,
          code: error.code
        });
      }
      
      if (error.message === 'Circuit breaker is OPEN') {
        return res.status(503).json({
          error: 'service_unavailable',
          message: 'Payment service temporarily unavailable',
          retryAfter: 60
        });
      }
      
      return res.status(500).json({
        error: 'internal_error',
        message: 'Payment processing failed',
        retryable: true
      });
    }
  }
  
  validatePaymentRequest(data) {
    if (!data.amount || data.amount <= 0) {
      throw new ValidationError('Invalid amount');
    }
    
    if (!['usd', 'eur', 'gbp'].includes(data.currency)) {
      throw new ValidationError('Unsupported currency');
    }
    
    if (!data.customerId) {
      throw new ValidationError('Customer ID required');
    }
    
    if (!data.paymentMethod) {
      throw new ValidationError('Payment method required');
    }
  }
  
  async getPayment(req, res) {
    const { id } = req.params;
    
    try {
      const payment = await this.db.payments.findById(id);
      
      if (!payment) {
        return res.status(404).json({
          error: 'not_found',
          message: 'Payment not found'
        });
      }
      
      return res.json({
        paymentId: payment.id,
        status: payment.status,
        amount: payment.amount,
        currency: payment.currency,
        orderId: payment.order_id,
        createdAt: payment.created_at
      });
      
    } catch (error) {
      this.logger.error({
        requestId: req.id,
        message: 'Failed to fetch payment',
        paymentId: id,
        error: error.message
      });
      
      return res.status(500).json({
        error: 'internal_error',
        message: 'Failed to fetch payment'
      });
    }
  }
  
  async refundPayment(req, res) {
    const { paymentId, amount, reason } = req.body;
    const idempotencyKey = req.headers['x-idempotency-key'];
    
    if (!idempotencyKey) {
      return res.status(400).json({
        error: 'Missing idempotency key'
      });
    }
    
    try {
      // Check for duplicate refund request
      const cached = await this.redis.get(\`refund:\${idempotencyKey}\`);
      if (cached) {
        return res.json(JSON.parse(cached));
      }
      
      // Get original payment
      const payment = await this.db.payments.findById(paymentId);
      
      if (!payment) {
        return res.status(404).json({
          error: 'Payment not found'
        });
      }
      
      // Create refund in Stripe
      const refund = await this.stripe.refunds.create({
        payment_intent: payment.stripe_payment_intent_id,
        amount: amount ? Math.round(amount * 100) : undefined,
        reason,
        metadata: {
          idempotencyKey
        }
      });
      
      // Store refund record
      const refundRecord = await this.db.refunds.create({
        id: uuidv4(),
        payment_id: paymentId,
        stripe_refund_id: refund.id,
        amount: refund.amount / 100,
        reason,
        status: refund.status,
        created_at: new Date()
      });
      
      // Cache result
      const result = {
        refundId: refundRecord.id,
        paymentId,
        amount: refundRecord.amount,
        status: refundRecord.status
      };
      
      await this.redis.setex(
        \`refund:\${idempotencyKey}\`,
        86400,
        JSON.stringify(result)
      );
      
      // Publish event
      await this.publishEvent('payment.refunded', {
        refundId: refundRecord.id,
        paymentId,
        amount: refundRecord.amount
      });
      
      return res.json(result);
      
    } catch (error) {
      this.logger.error({
        requestId: req.id,
        message: 'Refund failed',
        paymentId,
        error: error.message
      });
      
      return res.status(500).json({
        error: 'refund_failed',
        message: error.message
      });
    }
  }
  
  async publishEvent(eventType, data) {
    // Publish to message queue (RabbitMQ, Kafka, etc.)
    await this.messageQueue.publish('payments', {
      type: eventType,
      timestamp: new Date(),
      data
    });
  }
  
  async auditLog(entry) {
    await this.db.audit_logs.create({
      ...entry,
      timestamp: new Date()
    });
  }
  
  setupErrorHandling() {
    // Handle 404
    this.app.use((req, res) => {
      res.status(404).json({
        error: 'not_found',
        message: 'Endpoint not found'
      });
    });
    
    // Global error handler
    this.app.use((error, req, res, next) => {
      this.logger.error({
        requestId: req.id,
        error: error.message,
        stack: error.stack
      });
      
      res.status(500).json({
        error: 'internal_error',
        message: 'An unexpected error occurred',
        requestId: req.id
      });
    });
  }
  
  async start() {
    // Connect to dependencies
    await this.redis.connect();
    await this.db.connect();
    
    // Start server
    const port = process.env.PORT || 3002;
    this.app.listen(port, () => {
      this.logger.info(\`Payment Service running on port \${port}\`);
    });
    
    // Graceful shutdown
    process.on('SIGTERM', async () => {
      this.logger.info('SIGTERM received, shutting down gracefully');
      await this.redis.quit();
      await this.db.close();
      process.exit(0);
    });
  }
}

// Start the service
const service = new PaymentService();
service.start().catch(error => {
  console.error('Failed to start service:', error);
  process.exit(1);
});
  </code></pre>

  <h3>6. Best Practices and Testing</h3>
  <pre><code>
// Microservices API Design Best Practices
// ========================================

// 1. API Versioning
// ------------------

// URL versioning
app.use('/v1/payments', paymentsV1Router);
app.use('/v2/payments', paymentsV2Router);

// Header versioning
app.use((req, res, next) => {
  const version = req.headers['api-version'] || 'v1';
  req.apiVersion = version;
  next();
});

// 2. Request Validation
// ----------------------

const { body, validationResult } = require('express-validator');

app.post('/api/payments',
  [
    body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be positive'),
    body('currency').isIn(['usd', 'eur', 'gbp']).withMessage('Invalid currency'),
    body('customerId').notEmpty().withMessage('Customer ID required'),
    body('paymentMethod').notEmpty().withMessage('Payment method required')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  processPayment
);

// 3. Timeouts
// -----------

app.use((req, res, next) => {
  // Set timeout for request
  req.setTimeout(30000, () => {
    res.status(408).json({
      error: 'Request timeout',
      message: 'Request took too long to process'
    });
  });
  next();
});

// 4. Correlation IDs
// ------------------

// Propagate request ID across services
async function callOrderService(orderId, requestId) {
  const response = await fetch(\`http://order-service/orders/\${orderId}\`, {
    headers: {
      'X-Request-ID': requestId,
      'X-Correlation-ID': requestId
    }
  });
  return response.json();
}

// 5. Monitoring and Observability
// --------------------------------

const prometheus = require('prom-client');

// Metrics
const paymentCounter = new prometheus.Counter({
  name: 'payments_total',
  help: 'Total number of payments processed',
  labelNames: ['status', 'currency']
});

const paymentDuration = new prometheus.Histogram({
  name: 'payment_duration_seconds',
  help: 'Payment processing duration',
  buckets: [0.1, 0.5, 1, 2, 5]
});

app.post('/api/payments', async (req, res) => {
  const timer = paymentDuration.startTimer();
  
  try {
    const result = await processPayment(req.body);
    paymentCounter.inc({ status: 'success', currency: req.body.currency });
    return res.json(result);
  } catch (error) {
    paymentCounter.inc({ status: 'error', currency: req.body.currency });
    throw error;
  } finally {
    timer();
  }
});

// Expose metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', prometheus.register.contentType);
  res.end(await prometheus.register.metrics());
});

// 6. Testing
// ----------

// Unit tests
describe('PaymentService', () => {
  it('should prevent double charges with idempotency key', async () => {
    const idempotencyKey = 'test-key-123';
    
    // First request
    const result1 = await paymentService.processPayment({
      amount: 100,
      currency: 'usd',
      customerId: 'cus_123',
      paymentMethod: 'pm_123',
      idempotencyKey
    });
    
    // Duplicate request (same key)
    const result2 = await paymentService.processPayment({
      amount: 100,
      currency: 'usd',
      customerId: 'cus_123',
      paymentMethod: 'pm_123',
      idempotencyKey
    });
    
    // Should return same payment ID
    expect(result1.paymentId).toBe(result2.paymentId);
    
    // Should indicate duplicate
    expect(result2.duplicate).toBe(true);
    
    // Stripe should only be called once
    expect(stripeMock.paymentIntents.create).toHaveBeenCalledTimes(1);
  });
  
  it('should handle concurrent requests with same idempotency key', async () => {
    const idempotencyKey = 'concurrent-test';
    
    // Send two requests simultaneously
    const [result1, result2] = await Promise.all([
      paymentService.processPayment({
        amount: 100,
        currency: 'usd',
        customerId: 'cus_123',
        paymentMethod: 'pm_123',
        idempotencyKey
      }),
      paymentService.processPayment({
        amount: 100,
        currency: 'usd',
        customerId: 'cus_123',
        paymentMethod: 'pm_123',
        idempotencyKey
      })
    ]);
    
    // One should process, one should wait and get cached result
    expect(result1.paymentId).toBe(result2.paymentId);
  });
  
  it('should respect rate limits', async () => {
    const userId = 'user-123';
    
    // Send requests up to limit
    for (let i = 0; i < 100; i++) {
      const allowed = await rateLimiter.isAllowed(userId);
      expect(allowed).toBe(true);
    }
    
    // 101st request should be rejected
    const exceededLimit = await rateLimiter.isAllowed(userId);
    expect(exceededLimit).toBe(false);
  });
});

// Integration tests
describe('Payment API Integration', () => {
  it('should process payment end-to-end', async () => {
    const response = await request(app)
      .post('/api/payments')
      .set('X-Service-Token', validServiceToken)
      .set('X-Idempotency-Key', uuidv4())
      .send({
        amount: 99.99,
        currency: 'usd',
        customerId: 'cus_test',
        paymentMethod: 'pm_test'
      });
    
    expect(response.status).toBe(201);
    expect(response.body.paymentId).toBeDefined();
    expect(response.body.status).toBe('succeeded');
    
    // Verify in database
    const payment = await db.payments.findById(response.body.paymentId);
    expect(payment).toBeDefined();
    expect(payment.amount).toBe(99.99);
  });
  
  it('should reject request without service token', async () => {
    const response = await request(app)
      .post('/api/payments')
      .set('X-Idempotency-Key', uuidv4())
      .send({
        amount: 99.99,
        currency: 'usd',
        customerId: 'cus_test',
        paymentMethod: 'pm_test'
      });
    
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Unauthorized');
  });
});

// Load testing (with k6)
/*
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 20 },  // Ramp up to 20 users
    { duration: '1m', target: 20 },   // Stay at 20 users
    { duration: '30s', target: 0 },   // Ramp down to 0
  ],
};

export default function() {
  const payload = JSON.stringify({
    amount: 100,
    currency: 'usd',
    customerId: 'cus_test',
    paymentMethod: 'pm_test'
  });
  
  const params = {
    headers: {
      'Content-Type': 'application/json',
      'X-Service-Token': 'test-token',
      'X-Idempotency-Key': \`\${__VU}-\${__ITER}\`,
    },
  };
  
  let res = http.post('http://localhost:3002/api/payments', payload, params);
  
  check(res, {
    'status is 201': (r) => r.status === 201,
    'payment created': (r) => r.json('paymentId') !== undefined,
  });
  
  sleep(1);
}
*/

// 7. Documentation
// ----------------

// OpenAPI/Swagger specification
/*
openapi: 3.0.0
info:
  title: Payment Service API
  version: 1.0.0
  description: Internal payment processing service

paths:
  /api/payments:
    post:
      summary: Process a payment
      description: Creates a new payment with idempotency support
      security:
        - ServiceToken: []
      parameters:
        - in: header
          name: X-Idempotency-Key
          required: true
          schema:
            type: string
            format: uuid
          description: Unique key to prevent duplicate charges
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - amount
                - currency
                - customerId
                - paymentMethod
              properties:
                amount:
                  type: number
                  minimum: 0.01
                  example: 99.99
                currency:
                  type: string
                  enum: [usd, eur, gbp]
                  example: usd
                customerId:
                  type: string
                  example: cus_123abc
                paymentMethod:
                  type: string
                  example: pm_card_visa
      responses:
        '201':
          description: Payment created successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  paymentId:
                    type: string
                  status:
                    type: string
                  amount:
                    type: number
                  currency:
                    type: string
        '400':
          description: Invalid request
        '401':
          description: Unauthorized
        '429':
          description: Rate limit exceeded

securitySchemes:
  ServiceToken:
    type: apiKey
    in: header
    name: X-Service-Token
*/
  </code></pre>
</div>
`,

            examples: [
              "Payment service with idempotency keys preventing double charges",
              "mTLS certificate generation and service-to-service authentication",
              "API Gateway with routing, authentication, and rate limiting",
              "Backend for Frontend (BFF) pattern for mobile vs web",
              "Fixed window rate limiter with Redis",
              "Sliding window counter rate limiter",
              "Token bucket rate limiter for different operation costs",
              "Multi-dimensional rate limiting (user, IP, endpoint, global)",
              "Tiered rate limiting by subscription plan",
              "Circuit breaker pattern for external dependencies",
              "Request deduplication with distributed locks",
              "Graceful degradation and fallback responses",
            ],

            questions: [
              {
                question:
                  "What is idempotency and why is it critical for payment APIs?",
                difficulty: "Intermediate",
                category: "Idempotency",
                answer:
                  "Idempotency means executing the same request multiple times produces the same result as executing it once. Critical for payments because network failures are common. Scenario: User clicks 'Pay' → request sent → network timeout → did payment succeed? User clicks again → without idempotency, charged twice! Solution: Idempotency keys. Client generates unique UUID per logical operation (not per retry). Includes key in header: X-Idempotency-Key. Server checks if key seen before. If yes, return cached result (don't re-process). If no, process payment and cache result. Implementation: Use Redis for fast lookup. Store result for 24 hours. Use distributed lock to prevent race conditions (two simultaneous requests with same key). Cache both successes and permanent failures. Don't cache transient errors (network issues). Example flow: Request 1: idempotencyKey='abc123' → Process payment → Cache result → Return success. Request 2 (retry): idempotencyKey='abc123' → Check cache → Found! → Return cached result (no duplicate charge). Benefits: Prevents double charges, safe to retry, handles network failures, simple for clients. Best practices: Client generates key (UUID v4), server validates format, store with expiration (24h), log all duplicate requests, include key in audit logs. Alternative: Database unique constraint on idempotency_key column, but slower than Redis.",
              },
              {
                question:
                  "How does mTLS work for service-to-service authentication?",
                difficulty: "Advanced",
                category: "Security",
                answer:
                  "mTLS (Mutual TLS) provides cryptographic authentication where both client and server verify each other's certificates. Traditional TLS: Only server authenticated (HTTPS). Client verifies server certificate. Anyone can connect. mTLS: Both directions authenticated. Server verifies client certificate. Only services with valid certs can connect. How it works: 1) Certificate Authority (CA) generates root certificate. 2) Each service gets certificate signed by CA. Certificate contains service identity (Common Name). 3) Client connects with its certificate. 4) Server verifies client cert against CA. 5) Server extracts service identity from cert. 6) Server checks if that service is authorized. Advantages: Strong authentication (cryptographic, not passwords), zero-trust security (every service verified), automatic encryption (TLS), service identity built-in, certificate rotation automated (with service mesh). Implementation: Load certificates: cert (service's certificate), key (private key), ca (CA cert to verify others). Configure TLS: requestCert: true (require client cert), rejectUnauthorized: true (reject invalid certs). Extract identity: req.socket.getPeerCertificate() → get Common Name. Authorize: Check if service allowed for this endpoint. Service Mesh (Istio/Linkerd): Automates certificate generation and rotation, transparent encryption (no code changes), sidecar proxy handles mTLS. Best practices: Short-lived certificates (rotate every 24 hours), automate rotation (don't do manually), use service mesh when possible, monitor cert expiration, store certs securely (Kubernetes secrets, Vault), include service identity in SAN.",
              },
              {
                question:
                  "What are the different rate limiting algorithms and when to use each?",
                difficulty: "Advanced",
                category: "Rate Limiting",
                answer:
                  "Rate limiting algorithms trade off between accuracy, memory usage, and implementation complexity. 1) Fixed Window Counter - Count requests per time window. Pros: Simple, low memory. Cons: Burst at boundaries (100 at 12:00:59, 100 at 12:01:00 = 200 in 2 seconds). Use: Basic protection, not critical systems. 2) Sliding Window Log - Track timestamp of each request. Pros: Most accurate. Cons: High memory (stores every request). Use: When accuracy critical, low traffic. 3) Sliding Window Counter - Hybrid: weighted count from current and previous window. Pros: Accurate and efficient. Cons: Slightly complex. Use: Production systems, good default choice. 4) Token Bucket - Tokens refill over time, consumed per request. Different operations cost different tokens. Pros: Allows bursts, flexible (weight operations). Cons: More complex state. Use: When operations have different costs (payment=10 tokens, read=1 token). 5) Leaky Bucket - Requests queued, processed at fixed rate. Pros: Smooth rate, no bursts. Cons: Adds latency (queuing). Use: Protecting external APIs with strict limits. Choosing algorithm: Simple protection → Fixed Window. Accuracy critical → Sliding Window Counter. Different operation costs → Token Bucket. Need to queue → Leaky Bucket. Multi-dimensional limiting: Rate limit by: user, endpoint, IP, API key, global. All must pass. Distributed limiting: Use Redis Cluster for shared state across API gateways. Atomic Lua scripts for race-free increment. Tiered limiting: Different limits per subscription tier (free=100/min, premium=10000/min).",
              },
              {
                question:
                  "What is an API Gateway and what responsibilities does it have?",
                difficulty: "Intermediate",
                category: "API Gateway",
                answer:
                  "API Gateway is single entry point for all client requests to microservices. Centralized layer handling cross-cutting concerns. Why needed: In microservices, each service has own API. Without gateway: Clients must know all service URLs, handle authentication for each, different protocols. With gateway: Single URL for clients, consistent authentication, protocol translation. Responsibilities: 1) Request routing - Route /api/orders to Order Service, /api/payments to Payment Service. 2) Authentication/Authorization - Verify JWT tokens, check permissions centrally. 3) Rate limiting - Protect services from overload, per-user and global limits. 4) Load balancing - Distribute requests across service instances. 5) Protocol translation - REST to gRPC, HTTP to WebSocket. 6) Request/response transformation - Add headers (X-User-ID, X-Request-ID), modify payloads. 7) SSL termination - Handle HTTPS, services can use HTTP internally. 8) Caching - Cache frequent requests, reduce backend load. 9) Logging/monitoring - Centralized request logs, metrics. 10) Circuit breaking - Prevent calling failing services. Patterns: Single Gateway - One gateway for all clients. BFF (Backend for Frontend) - Separate gateway per client type (mobile, web, admin). Mobile needs minimal data, Web needs rich data, Admin needs everything. GraphQL Gateway - Single query fetches from multiple services, client requests exactly what it needs. Implementation: Use existing solutions (Kong, AWS API Gateway, NGINX, Envoy) or build with Node.js/Express. Best practices: Keep gateway thin (routing, not business logic), implement circuit breakers, use service discovery, add health checks, version APIs, monitor performance.",
              },
              {
                question:
                  "How do you handle retries and idempotency together in microservices?",
                difficulty: "Advanced",
                category: "Reliability Patterns",
                answer:
                  "Retries and idempotency work together for reliable service-to-service communication. The problem: Network failures are common. Request may fail due to timeout, connection error, temporary unavailability. Naive retry = duplicate operations (double charge, duplicate order). Solution: Idempotent retries. Client side: Generate idempotency key once per logical operation. Retry with same key on failures. Exponential backoff between retries. Max retry limit (e.g., 3). Don't retry on client errors (4xx). Do retry on server errors (5xx) and network errors. Implementation: const maxRetries = 3; for (let i = 0; i < maxRetries; i++) { try { return await callPaymentService({ ...data, idempotencyKey }); } catch (error) { if (error.status >= 400 && error.status < 500) throw error; // Don't retry client errors. await exponentialBackoff(i); } }. Exponential backoff: delay = min(1000 * 2^attempt, 10000). Adds jitter to prevent thundering herd. Server side: Check idempotency key in cache. If found, return cached result (don't re-process). Use distributed lock to handle concurrent requests. Cache both success and permanent failures. Don't cache transient failures (so client will retry). TTL for cache (24 hours). Edge cases: Request times out but succeeds on server. Client retries → server returns cached success. Request processed but response lost. Client retries → server returns cached result. Concurrent requests with same key. One processes, others wait on lock then get cached result. Best practices: Idempotency key is UUID v4. Store key with operation attempt (link retries). Log duplicate requests for debugging. Monitor retry rates (high rate = system issues). Circuit breaker prevents retry storms. Status codes: 409 Conflict = operation in progress, retry later. 429 Too Many Requests = rate limited, backoff.",
              },
              {
                question: "What is the Backend for Frontend (BFF) pattern?",
                difficulty: "Intermediate",
                category: "API Gateway Patterns",
                answer:
                  "BFF (Backend for Frontend) creates separate backend API for each frontend type. Problem: Different frontends have different needs. Mobile: Minimal data (bandwidth limited), simple responses, offline support. Web: Rich data, nested objects, real-time updates. Admin: Everything, complex queries, bulk operations. Single API Gateway: Returns one-size-fits-all responses. Over-fetching (web gets mobile's minimal data). Under-fetching (mobile gets web's heavy data). Many roundtrips (client makes multiple requests). BFF Solution: Separate gateway per frontend type. Mobile BFF: Returns minimal data, aggregates multiple services, optimized for bandwidth. Web BFF: Returns rich data, includes nested objects, supports real-time. Admin BFF: Full data access, bulk operations, advanced queries. Example: GET /mobile/api/orders/123 → Returns { id, status, total, tracking }. GET /web/api/orders/123 → Returns { order: {...}, payment: {...}, shipping: {...}, items: [{...}] }. GET /admin/api/orders/123 → Returns everything + internal fields + analytics. Implementation: Each BFF calls multiple microservices, aggregates data, transforms for specific frontend, handles frontend-specific authentication. Benefits: Frontend-optimized responses, reduces over/under-fetching, independent evolution (change mobile without affecting web), clear ownership (mobile team owns mobile BFF). Trade-offs: More code to maintain (multiple BFFs), potential duplication, coordination needed for shared logic. When to use: Multiple frontend types with different needs, mobile app + web app + admin dashboard, high traffic (optimization matters), team structure supports it (separate mobile/web teams). Alternative: GraphQL - client specifies exact data needed, single backend serves all frontends, client controls response shape. Choose BFF when: Teams own frontends end-to-end, very different client needs, REST-based architecture. Choose GraphQL when: Flexible querying needed, shared data model, exploration encouraged.",
              },
              {
                question:
                  "How do you implement circuit breakers in a microservices architecture?",
                difficulty: "Advanced",
                category: "Resilience Patterns",
                answer:
                  "Circuit Breaker prevents cascading failures by detecting failing services and stopping requests to them. Problem: Service A calls Service B. Service B is slow/failing. Service A keeps calling → threads blocked → Service A fails → Cascade. Circuit Breaker: Proxy between services. Three states: Closed (normal), Open (failing), Half-Open (testing recovery). State transitions: Closed → Normal operation. Count failures. If failures >= threshold (e.g., 5) → Open. Open → All requests fail fast (don't call service). After timeout (e.g., 60s) → Half-Open. Half-Open → Allow limited requests. If success → Closed (recovered). If failure → Open again. Implementation: class CircuitBreaker { states: CLOSED, OPEN, HALF_OPEN. Counts: failures (consecutive failures). Thresholds: failureThreshold (5), resetTimeout (60s). execute(operation): If OPEN → check if timeout elapsed. If yes → HALF_OPEN. If still timeout → fail fast. If CLOSED or HALF_OPEN → try operation. Success → onSuccess() (reset failures, close circuit if half-open). Failure → onFailure() (increment failures, open if threshold reached). }. Integration with services: Wrap all external calls in circuit breaker. const payment = await paymentBreaker.execute(() => callPaymentService(data)). Fallback on failure: catch CircuitOpenError → return cached data or degraded response. Benefits: Prevents cascade failures, fast failure (don't wait for timeout), automatic recovery, gives failing service time to recover. Best practices: Different breakers per dependency (don't share state). Monitor breaker state (metrics). Alert on state changes (OPEN = incident). Implement fallbacks (cache, default values). Tune thresholds per service (fast-failing service = lower threshold). Combine with timeouts (breaker tracks timeout failures). Use with retries (retry on transient errors, circuit breaker for persistent failures). Advanced: Percentage-based threshold (50% error rate vs. absolute count). Sliding window (only recent failures count). Half-open limited concurrency (try with 1 request, not all). Libraries: Netflix Hystrix (Java), opossum (Node.js), resilience4j (Java).",
              },
              {
                question:
                  "What are the security considerations for internal microservices APIs?",
                difficulty: "Advanced",
                category: "Security",
                answer:
                  "Internal services need security even though not public-facing. Zero-trust principle: Never trust, always verify. Threats: Compromised service (exploited vulnerability), malicious insider, lateral movement (attacker pivots between services), confused deputy (service acts with wrong permissions), data exfiltration. Security layers: 1) Service-to-Service Authentication - mTLS (certificate-based), JWT with service identity, API keys per service. Never: Shared secrets, no authentication internally. 2) Authorization - Service A can call endpoint X on Service B. Fine-grained: method + resource level. Example: order-service can POST /payments but not DELETE /payments. Implementation: Permission matrix, check on every request. 3) Network Segmentation - Firewall between services, allow-list (only specific services can connect), VPC/subnet isolation. 4) Encryption in Transit - TLS 1.3 for all communication, even internal, mTLS provides this automatically. 5) Encryption at Rest - Database encryption, encrypt sensitive fields (PII, payment data), use KMS for key management. 6) Secrets Management - Never hardcode secrets, use Vault, AWS Secrets Manager, Kubernetes Secrets, rotate secrets regularly. 7) Audit Logging - Log all service-to-service calls, include: caller service, endpoint, timestamp, result. Store logs securely, monitor for anomalies. 8) Rate Limiting - Prevent abuse even internally, different limits per service. 9) Input Validation - Never trust inputs even from internal services, validate and sanitize everything. 10) Least Privilege - Service only has permissions it needs, separate read/write permissions, rotate credentials. Defense in depth: Multiple layers, compromise one layer ≠ full breach. Service mesh (Istio/Linkerd): Automatic mTLS, policy enforcement, secure by default, observability. Compliance: GDPR, PCI-DSS, HIPAA require encryption and access control. Best practices: Certificate rotation (automated), monitor security events, regular security audits, penetration testing, principle of least privilege, defense in depth.",
              },
              {
                question:
                  "How do you version microservices APIs without breaking clients?",
                difficulty: "Intermediate",
                category: "API Design",
                answer:
                  "API versioning allows evolution without breaking existing clients. Strategies: 1) URL Versioning - /v1/payments, /v2/payments. Pros: Clear, explicit, easy to route. Cons: URL duplication, multiple versions in codebase. When: Major breaking changes. 2) Header Versioning - Header: API-Version: 2.0. Pros: Clean URLs, easy to route with middleware. Cons: Less visible, tooling support. When: Minor version differences. 3) Content Negotiation - Accept: application/vnd.company.v2+json. Pros: RESTful, flexible. Cons: Complex, harder to test. When: Truly RESTful APIs. 4) No Versioning (Backwards Compatible Only) - Only additive changes, never remove/change fields, use feature flags. Pros: Simplest for clients. Cons: Technical debt accumulates. When: Small, internal APIs. Best strategy: URL for major versions (/v1, /v2). Backwards compatible changes within version. Deprecation policy (v1 supported for 12 months after v2 release). Breaking changes: Remove field → Add new field instead, keep old one (deprecated). Change type → Create new field, keep old one. Change behavior → New endpoint. Non-breaking changes: Add new field (clients ignore unknowns), add new endpoint, add optional parameter. Example evolution: v1: { amount: 100, currency: 'USD' }. v2: { amount: 100, currency: 'USD', amountMinorUnits: 10000 } // Added field, v1 compatible. v3: New field: paymentMethod (required) → Breaking change → /v3/payments. Implementation: Separate route handlers: app.use('/v1/payments', v1Router); app.use('/v2/payments', v2Router);. Shared business logic: Both versions call same service layer. Service layer supports all versions. Deprecation: Announce deprecation 6-12 months in advance, log usage of deprecated endpoints, monitor which clients still using v1, sunset old version. Response headers: API-Version: 2.0, API-Deprecated: true (if using old version), Sunset: Sat, 31 Dec 2024 23:59:59 GMT. Documentation: Maintain docs for each version, changelog between versions, migration guide. GraphQL approach: Schema evolution (add fields, never remove), @deprecated directive, clients request specific fields.",
              },
              {
                question:
                  "What monitoring and observability should a payment service have?",
                difficulty: "Advanced",
                category: "Observability",
                answer:
                  "Observability = understanding system's internal state from external outputs. Three pillars: Metrics, Logs, Traces. 1) Metrics (Prometheus/Grafana) - Counters: payments_total (success/failure), refunds_total, errors_total. Gauges: active_requests, circuit_breaker_state. Histograms: payment_duration_seconds (p50, p95, p99), request_size_bytes. By dimension: status, currency, payment_method, error_type. Example query: rate(payments_total{status='success'}[5m]) = payments per second. 2) Logs (ELK Stack, Splunk) - Structured logging (JSON): { timestamp, requestId, service, level, message, context: { paymentId, amount, currency, userId } }. Log levels: ERROR (payment failed), WARN (retry attempt), INFO (payment success), DEBUG (detailed flow). Correlation: Include requestId in all logs, trace requests across services. 3) Distributed Tracing (Jaeger, Zipkin) - Track request through multiple services: API Gateway → Order Service → Payment Service → Stripe. See latency breakdown, identify bottlenecks. Each span includes: service name, operation name, duration, tags (paymentId, amount). 4) Alerting (PagerDuty, Opsgenie) - Critical: Payment success rate < 95%, Error rate > 1%, p99 latency > 5s, Circuit breaker open. Warning: Rate limit hit rate > 80%, Database connection pool exhausted. Alert routing: Critical → Page on-call, Warning → Slack channel. 5) Dashboards - Real-time: Payments per second, Success rate (%), Latency (p50, p95, p99), Error rate. Business: Revenue (successful payments), Average transaction value, Payment methods distribution. System: CPU/Memory usage, Database query time, External API latency (Stripe). 6) Synthetic Monitoring - Periodic test payments (test mode), alert if tests fail, end-to-end validation. 7) Audit Logs - All payment operations: created, succeeded, failed, refunded. Include: who (service, user), what (action), when (timestamp), context (amount, etc.). Immutable, compliant with regulations. SLIs/SLOs: Service Level Indicators: Availability = successful requests / total requests, Latency = p99 < 2s, Throughput = 1000 req/s. Service Level Objectives: 99.9% availability, 99% latency < 2s. Error budgets: 100% - 99.9% = 0.1% allowed downtime = 43 minutes/month. Tools: Metrics: Prometheus + Grafana. Logs: ELK (Elasticsearch, Logstash, Kibana), Datadog. Tracing: Jaeger, Zipkin, AWS X-Ray. APM: New Relic, Datadog, Dynatrace. Best practices: Use correlation IDs, structured logging, monitor business metrics (not just technical), alert on symptoms (not causes), runbooks for common alerts.",
              },
              {
                question:
                  "How do you handle distributed transactions across microservices?",
                difficulty: "Advanced",
                category: "Distributed Transactions",
                answer:
                  "Distributed transactions across microservices are challenging. Avoid 2PC when possible. Patterns: 1) Saga Pattern - Break transaction into sequence of local transactions. Each step has compensating transaction (rollback). Two types: Choreography (event-driven) and Orchestration (coordinator). Choreography example: Order Service creates order → publishes OrderCreated event. Payment Service subscribes → processes payment → publishes PaymentSucceeded. Inventory Service subscribes → reserves stock → publishes StockReserved. If payment fails → publishes PaymentFailed → Order Service cancels order. Orchestration example: Order Orchestrator coordinates: Call Payment Service → wait for response. If success → Call Inventory Service. If inventory fails → Call Payment Service (refund). Pros: No distributed locks, services independent, handles partial failures. Cons: Eventual consistency, complex compensation logic, difficult to debug. 2) Event Sourcing - Store events, not current state. All state changes are events. Rebuild state by replaying events. Example: PaymentCreated, PaymentSucceeded, PaymentRefunded. Benefits: Full audit trail, time travel (state at any point), enables sagas. Cons: Learning curve, eventual consistency, event schema evolution. 3) Two-Phase Commit (2PC) - Avoid in microservices! Coordinator asks all services: 'can you commit?'. All vote yes → coordinator says 'commit'. Any vote no → coordinator says 'abort'. Problems: Blocking (coordinator crash blocks participants), not partition-tolerant, tight coupling. Only use: Within single database (distributed SQL). 4) Outbox Pattern - Reliably publish events. Problem: Service updates DB and publishes event → failure after DB but before publish → inconsistency. Solution: Write to DB + Outbox table in same transaction. Background process reads outbox → publishes events → marks as published. Guarantees: Event published if DB commit succeeded. 5) Eventual Consistency - Accept temporary inconsistency. Order created → payment pending → eventually confirmed. Show user: 'Order processing...'. Benefits: High availability, partition tolerant. Trade-off: UX (user sees pending state). Real-world Payment Service: Use Saga with Orchestrator: Order Orchestrator: 1) Reserve inventory. 2) Charge payment (idempotent). 3) Create order. Rollback: Refund payment, release inventory. Use Outbox: Payment succeeded → write to payments table + outbox. Background job publishes PaymentSucceeded event. Idempotency: All saga steps idempotent (safe to retry). Monitoring: Track saga state, alert on stuck sagas, compensating transaction metrics. Best practices: Prefer choreography for simple flows, orchestration for complex, always idempotent operations, implement compensation for every step, monitor saga completion rates, use outbox for reliable events, eventual consistency > distributed locks.",
              },
              {
                question:
                  "What is the difference between API Gateway and Service Mesh?",
                difficulty: "Intermediate",
                category: "Architecture Patterns",
                answer:
                  "API Gateway and Service Mesh solve different problems. API Gateway: North-South traffic (external clients → services). Single entry point for external requests. Responsibilities: Authentication (verify JWT), authorization (check permissions), routing (to correct service), rate limiting (per user/API key), protocol translation (REST → gRPC), SSL termination, request/response transformation. Deployed: Single instance or cluster at edge. Examples: Kong, AWS API Gateway, NGINX, Apigee. Use when: External clients accessing services, need centralized auth/rate limiting, different client types (mobile, web). Service Mesh: East-West traffic (service → service internal communication). Sidecar proxy with every service. Responsibilities: Service-to-service auth (mTLS), encryption in transit, load balancing (between instances), circuit breaking, retries and timeouts, observability (tracing, metrics), traffic management (canary, blue-green). Deployed: Sidecar proxy per service pod. Examples: Istio, Linkerd, Consul Connect. Use when: Many microservices, need mTLS between services, want traffic management, observability across services. Key differences: Scope - Gateway: external → internal. Mesh: internal ↔ internal. Deployment - Gateway: edge (single point). Mesh: distributed (every service). Auth - Gateway: user authentication. Mesh: service authentication. Rate limiting - Gateway: per user. Mesh: per service. Can use both: API Gateway for external traffic → Service Mesh for internal traffic. Clients → API Gateway → Service Mesh → Microservices. Example: External request → API Gateway (verify JWT, rate limit user) → Order Service (via mesh) → Payment Service (via mesh, mTLS auth). Traffic flow: Internet → API Gateway → [Service Mesh: Order → Payment → Inventory]. Choosing: Start with API Gateway (essential for external access). Add Service Mesh when: 10+ microservices, need internal mTLS, complex traffic patterns, advanced observability. Service Mesh alternatives: Application-level (libraries in code), pros: simpler, cons: language-specific. Sidecar (Istio), pros: language-agnostic, cons: resource overhead. Ambient mode (Istio 2.0), pros: no sidecar overhead, cons: newer technology.",
              },
            ],

            links: [
              "https://stripe.com/docs/api/idempotent_requests - Stripe idempotency documentation",
              "https://martinfowler.com/articles/microservices.html - Martin Fowler on Microservices",
              "https://microservices.io/patterns/index.html - Microservices Patterns",
              "https://www.nginx.com/blog/introduction-to-microservices/ - NGINX Microservices Guide",
              "https://istio.io/latest/docs/concepts/security/ - Istio mTLS and Security",
              "https://docs.konghq.com/gateway/latest/ - Kong API Gateway",
              "https://www.enterpriseintegrationpatterns.com/patterns/messaging/ - Enterprise Integration Patterns",
              "https://samnewman.io/books/building_microservices_2nd_edition/ - Building Microservices by Sam Newman",
              "https://cloud.google.com/architecture/microservices-architecture-introduction - Google Cloud Microservices Guide",
              "https://aws.amazon.com/microservices/ - AWS Microservices",
              "https://www.redhat.com/en/topics/microservices/what-is-a-service-mesh - What is Service Mesh",
              "https://opentelemetry.io/docs/ - OpenTelemetry for Observability",
            ],
          },
        ],
      },
      {
        id: 3,
        label: "Design Patterns",
        concepts: [],
      },
    ],
  },
];
