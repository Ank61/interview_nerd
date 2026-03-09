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
        label: "Snippets",
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
      'Authorization': \`Bearer \$ {this.accessToken}\`
    };
    
    let response = await fetch(url, options);
    
    // If token expired, try to refresh
    if (response.status === 401) {
      const refreshed = await this.refreshAccessToken();
      
      if (refreshed) {
        // Retry original request with new token
        options.headers['Authorization'] = \`Bearer \$ {this.accessToken}\`;
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
        message: \`Requires one of: \$ {allowedRoles.join(', ')}\`
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
          message: \`Requires permission: \$ {permission}\`
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
  
  if (userPermissions.includes(\`\$ {resource}:*\`)) {
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
          subject: \`team:\$ {team}\`
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
    const object = \`\$ {objectType}:\$ {objectId}\`;
    const subject = \`user:\$ {req.user.id}\`;
    
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
        'Authorization': \`Bearer \$ {oauthToken.accessToken}\`
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
      'Authorization': \`Bearer \$ {accessToken}\`
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
        \`blacklist:\$ {decoded.jti}\`,
        'revoked',
        'EX',
        ttl
      );
    }
  }
  
  async isRevoked(token) {
    const decoded = jwt.decode(token);
    const revoked = await this.redis.get(\`blacklist:\$ {decoded.jti}\`);
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
      \`session:\$ {sessionId}\`,
      JSON.stringify({ userId, createdAt: Date.now() }),
      'EX',
      30 * 60
    );
    
    return token;
  }
  
  async validate(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if session exists in Redis
    const session = await this.redis.get(\`session:\$ {decoded.sid}\`);
    
    if (!session) {
      throw new Error('Session expired or revoked');
    }
    
    // Extend session TTL on activity (sliding window)
    await this.redis.expire(\`session:\$ {decoded.sid}\`, 30 * 60);
    
    return JSON.parse(session);
  }
  
  async revoke(sessionId) {
    await this.redis.del(\`session:\$ {sessionId}\`);
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
  await fetch(\`http://file-service/files/\$ {fileId}\`, {
    method: 'DELETE',
    headers: {
      'Authorization': \`Bearer \$ {SERVICE_A_TOKEN}\`  // ❌ Admin token
    }
  });
};

// ✅ Good: User's token delegated
const deleteFile = async (fileId, userToken) => {
  // Pass through user's token
  await fetch(\`http://file-service/files/\$ {fileId}\`, {
    method: 'DELETE',
    headers: {
      'Authorization': \`Bearer \$ {userToken}\`,  // ✅ User's token
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
    const attempts = await this.redis.incr(\`attempts:\$ {key}\`);
    
    if (attempts === 1) {
      // Set expiration on first attempt
      await this.redis.expire(\`attempts:\$ {key}\`, 15 * 60);
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
    const key = \`failed:\$ {username}\`;
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
    await this.redis.del(\`failed:\$ {username}\`);
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
  const query = \`SELECT * FROM users WHERE username = '\$ {username}' AND password = '\$ {password}'\`;
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
                  "Logout with JWTs is challenging due to stateless nature. Strategies: 1) Client-side logout: Delete token from storage. Simple but token still valid if intercepted. Only for low-security apps. Implementation: localStorage.removeItem('token'). 2) Short expiration: Use 5-15min access tokens. Delete refresh token on logout. Token remains valid max 15min but can't get new one. Implementation: DELETE FROM refresh_tokens WHERE user_id = ? AND token = ?. 3) Token blacklist: Add JWT ID to Redis blacklist on logout. Check blacklist in middleware. Implementation: On logout: redis.setex(\`blacklist:\$ {jti}\`, ttl, 'revoked'). In middleware: if (await redis.exists(\`blacklist:\$ {jti}\`)) reject. TTL matches token expiration. 4) Token versioning: Increment user's token version on logout. Reject tokens with old version. Implementation: On logout: UPDATE users SET token_version = token_version + 1 WHERE id = ?. In middleware: if (decoded.version !== user.token_version) reject. 5) Logout all devices: Delete all refresh tokens for user. Implementation: DELETE FROM refresh_tokens WHERE user_id = ?. Access tokens expire naturally. Best practice: Combine approaches - Short access tokens (15min), Long refresh tokens (stored server-side), On logout: Delete refresh token + blacklist current access token if needed, On 'logout all': Delete all refresh tokens + increment version. Additional security: Clear all client storage (localStorage, cookies, sessionStorage), redirect to login page, show logout confirmation, log logout events for audit, support remote logout (user can logout other sessions), implement idle timeout (auto-logout after inactivity), consider requiring re-authentication for sensitive actions after certain time.",
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
    
    console.log(\`Node \$ {this.id}: Transaction committed\`);
  }
  
  async abort(transaction) {
    // Rollback any changes
    await this.db.rollback(transaction);
    
    // Remove from prepared state
    this.preparedTransactions.delete(transaction.id);
    
    // Release locks
    await this.unlockResources(transaction);
    
    console.log(\`Node \$ {this.id}: Transaction aborted\`);
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
          console.log(\`Replicated to \$ {node.id}\`);
        } catch (error) {
          // If replication fails, retry later
          console.error(\`Replication failed to \$ {node.id}: \$ {error}\`);
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
      
      console.log(\`Primary: \$ {primaryHealthy ? 'UP' : 'DOWN'}\`);
      console.log(\`Secondary: \$ {secondaryHealthy ? 'UP' : 'DOWN'}\`);
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
        console.error(\`Replication to \$ {master.id} failed: \$ {error}\`);
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
      console.log(\`Circuit breaker: Tripped (OPEN) - \$ {this.failures} failures\`);
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
    
    console.log(\`Only \$ {reachableCount}/\$ {this.nodes.length} nodes reachable\`);
    console.log(\`Need \$ {this.minimumQuorum} for quorum - rejecting writes\`);
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
    console.log(\`⚠️  PARTITION DETECTED: Node \$ {node.id} unreachable\`);
    
    // Trigger partition handling
    this.handlePartition(node);
  }
  
  onPartitionHealed(node) {
    console.log(\`✅ PARTITION HEALED: Node \$ {node.id} recovered\`);
    
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
    console.log(\`Reconciling data for \$ {recoveredNode.id}...\`);
    
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
      throw new Error(\`Cannot write - only \$ {availableNodes.length}/\$ {quorum} nodes available\`);
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
      throw new Error(\`Cannot read - only \$ {availableNodes.length}/\$ {quorum} nodes available\`);
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
        console.log(\`Replication to \$ {node.id} failed - will retry later\`);
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
    const cached = await this.redis.get(\`payment:\$ {idempotencyKey}\`);
    
    if (cached) {
      console.log(\`Duplicate request detected: \$ {idempotencyKey}\`);
      
      // Return cached response (same as original)
      return response.status(200).json({
        ...JSON.parse(cached),
        duplicate: true  // Indicate this was cached
      });
    }
    
    // 3. Check if payment is in progress
    const lockKey = \`payment-lock:\$ {idempotencyKey}\`;
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
        \`payment:\$ {idempotencyKey}\`,
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
          \`payment:\$ {idempotencyKey}\`,
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
    const cached = await this.redis.get(\`payment:\$ {idempotencyKey}\`);
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
          throw new Error(\`Payment failed: \$ {result.message}\`);
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
        value: \`\$ {serviceName}.internal\`
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
        
        console.log(\`Authenticated service: \$ {req.serviceIdentity.commonName}\`);
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
          message: \`Service '\$ {req.serviceIdentity.commonName}' not authorized\`
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
    console.log(\`Payment request from: \$ {req.serviceIdentity.commonName}\`);
    
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
        throw new Error(\`Payment failed: \$ {response.statusText}\`);
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
        console.log(\`\$ {req.method} \$ {req.path} \$ {res.statusCode} \$ {duration}ms\`);
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
      const key = \`ratelimit:\$ {req.user.id}:\$ {req.path}\`;
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
        this.callService('order-service', \`/orders/\$ {req.params.id}\`),
        this.callService('payment-service', \`/payments/order/\$ {req.params.id}\`),
        this.callService('shipping-service', \`/tracking/\$ {req.params.id}\`)
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
        this.callService('order-service', \`/orders/\$ {req.params.id}\`),
        this.callService('payment-service', \`/payments/order/\$ {req.params.id}\`),
        this.callService('shipping-service', \`/tracking/\$ {req.params.id}\`),
        this.callService('catalog-service', \`/items?ids=\$ {order.itemIds.join(',')}\`)
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
    const response = await fetch(\`http://\$ {service}\$ {path}\`);
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
        const response = await fetch(\`http://\$ {serviceName}\$ {path}\`, {
          ...options,
          timeout: 3000
        });
        
        if (!response.ok) {
          throw new Error(\`Service error: \$ {response.status}\`);
        }
        
        return await response.json();
      });
    } catch (error) {
      console.error(\`Circuit breaker: \$ {serviceName} call failed\`, error);
      
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
    const key = \`ratelimit:\$ {userId}:\$ {this.getCurrentWindow()}\`;
    
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
    const key = \`ratelimit:\$ {userId}\`;
    const now = Date.now();
    const windowStart = now - this.window;
    
    // Remove old entries
    await this.redis.zremrangebyscore(key, 0, windowStart);
    
    // Count requests in current window
    const count = await this.redis.zcard(key);
    
    if (count < this.limit) {
      // Add current request timestamp
      await this.redis.zadd(key, now, \`\$ {now}-\$ {Math.random()}\`);
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
    
    const currentKey = \`ratelimit:\$ {userId}:\$ {currentWindow}\`;
    const previousKey = \`ratelimit:\$ {userId}:\$ {previousWindow}\`;
    
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
    const key = \`tokenbucket:\$ {userId}\`;
    
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
    const key = \`leakybucket:\$ {userId}\`;
    
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
    const key = \`leakybucket:\$ {userId}\`;
    
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
      this.checkLimit(\`user:\$ {req.user.id}\`, 100, 60),
      
      // Per user per endpoint
      this.checkLimit(\`user:\$ {req.user.id}:\$ {req.path}\`, 20, 60),
      
      // Per API key
      this.checkLimit(\`apikey:\$ {req.apiKey}\`, 1000, 60),
      
      // Per IP address
      this.checkLimit(\`ip:\$ {req.ip}\`, 50, 60),
      
      // Global (all users)
      this.checkLimit('global', 10000, 60)
    ]);
    
    // All checks must pass
    return checks.every(check => check.allowed);
  }
  
  async checkLimit(key, limit, window) {
    const current = await this.redis.incr(\`ratelimit:\$ {key}\`);
    
    if (current === 1) {
      await this.redis.expire(\`ratelimit:\$ {key}\`, window);
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
    const key = \`ratelimit:\$ {user.id}\`;
    
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
    
    const key = \`ratelimit:\$ {userId}\`;
    
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
      message: \`Rate limit exceeded. Try again in \$ {result.retryAfter} seconds.\`,
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
          message: \`Service '\$ {decoded.serviceName}' not authorized for this endpoint\`
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
      return new RegExp(\`^\$ {pattern.replace(':id', '[^/]+')}\$\`).test(path);
    });
  }
  
  async rateLimitMiddleware(req, res, next) {
    const key = \`ratelimit:\$ {req.service.serviceName}:\$ {req.path}\`;
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
      const cached = await this.redis.get(\`payment:\$ {idempotencyKey}\`);
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
      const lockKey = \`payment-lock:\$ {idempotencyKey}\`;
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
          \`payment:\$ {idempotencyKey}\`,
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
      const cached = await this.redis.get(\`refund:\$ {idempotencyKey}\`);
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
        \`refund:\$ {idempotencyKey}\`,
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
      this.logger.info(\`Payment Service running on port \$ {port}\`);
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
  const response = await fetch(\`http://order-service/orders/\$ {orderId}\`, {
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
      'X-Idempotency-Key': \`\$ {__VU}-\$ {__ITER}\`,
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
          {
            topic: "Async Systems: Video Upload & Transcoding Pipeline",
            tags: [
              "Async Processing",
              "Message Queues",
              "RabbitMQ",
              "Kafka",
              "S3 Blob Storage",
              "FFmpeg",
              "HLS Streaming",
              "Worker Pools",
              "Workflow Orchestration",
              "Idempotent Workers",
              "Dead Letter Queue",
              "Presigned URLs",
              "CDN",
              "Adaptive Bitrate",
              "Circuit Breaker",
              "KEDA Autoscaling",
              "Fan-out Fan-in",
              "Distributed Systems",
            ],

            explanation: `
<div>
  <h2>Async Systems: Video Upload & Transcoding Pipeline</h2>
  <p>
    This guide covers one of the most important architectural shifts in backend engineering: 
    moving from synchronous request-response to asynchronous, queue-driven workflows. 
    The canonical example is video transcoding — accepting an upload, processing it into 
    multiple formats (360p, 720p, 1080p), and serving it for streaming. We'll cover 
    message queues (RabbitMQ vs Kafka), blob storage (S3), workflow orchestration, 
    HLS streaming, and the reliability patterns that make it production-ready.
  </p>

  <h3>The Problem: Why Synchronous Won't Work</h3>
  <pre><code>
// Scenario: User uploads a video for a platform like YouTube
// ===========================================================

// Before (Synchronous — WRONG):
class VideoController {
  async upload(req, res) {
    // ❌ This is the naive approach — never do this in production
    const video = await saveFile(req.body);           // Save file
    await ffmpeg.transcode(video, '360p');            // 5 minutes
    await ffmpeg.transcode(video, '720p');            // 10 minutes
    await ffmpeg.transcode(video, '1080p');           // 15 minutes
    res.json({ done: true });                         // HTTP timed out 30s ago!
  }
}

// After (Asynchronous — CORRECT):
class VideoController {
  async upload(req, res) {
    // ✅ Accept → Store → Enqueue → Return immediately
    const uploadId = uuidv4();
    await s3.upload({ Key: raw/$ {uploadId}/original.mp4, Body: req.body });
    await queue.publish('video.transcode', { uploadId });
    res.status(202).json({ uploadId, status: 'processing' }); // Returns in <1s
    // Workers handle the rest in background
  }
}

// Why synchronous fails — three compounding problems:
// ====================================================
// 1. TIME MISMATCH
//    HTTP connections timeout after 30-120 seconds.
//    Transcoding a 1GB video takes 5-20 minutes.
//    The connection is gone long before work finishes.
//
// 2. RESOURCE BLOCKING
//    Synchronous processing holds a server thread hostage for the entire duration.
//    100 concurrent uploads = 100 threads blocked on FFmpeg = server crashes.
//
// 3. NO RETRY SEMANTICS
//    If server crashes mid-transcode, work is lost.
//    No record of what was done. No way to resume.
//    User just sees a 500 error.

// The Solution: Async Pipeline with Three Phases
// ===============================================
//
// Phase 1: INGEST       → Accept upload, store raw file, return job ID
// Phase 2: PROCESS      → Workers transcode asynchronously in background
// Phase 3: SERVE        → CDN delivers HLS segments to viewers
//
//  Client → Upload Service → S3 (raw) → Queue → Workers → S3 (processed) → CDN → Viewer

// Key Principles:
// ===============
// 1. Return 202 Accepted immediately — never block the client
// 2. Decouple upload from processing via message queue
// 3. Workers are stateless and idempotent — safe to re-run
// 4. Dead Letter Queue — failed jobs never silently disappear
// 5. Scale workers based on queue depth, not CPU
  </code></pre>

  <h3>1. Upload Flow: Presigned URLs & Multipart Upload</h3>
  <pre><code>
// The upload problem: Video files are 100MB–50GB
// ================================================
// Naive approach: Client uploads to your server → server streams to S3
// Problem: Your server becomes a bandwidth bottleneck, memory pressure, single point of failure
//
// Solution: Presigned URLs
// Client uploads DIRECTLY to S3, bypassing your server entirely.
// Your server never touches the bytes.

class UploadService {

  // Step 1: Client requests an upload slot
  // POST /uploads/initiate
  async initiateUpload(req, res) {
    const { filename, fileSize, contentType } = req.body;
    const uploadId = uuidv4();

    // Validate file type
    const allowedTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];
    if (!allowedTypes.includes(contentType)) {
      return res.status(400).json({ error: 'Unsupported video format' });
    }

    // Validate file size (max 10GB)
    if (fileSize > 10 * 1024 * 1024 * 1024) {
      return res.status(400).json({ error: 'File exceeds 10GB limit' });
    }

    const s3Key = raw/$ {req.user.id}/$ {uploadId}/original$ {path.extname(filename)};

    // Initiate S3 Multipart Upload
    // S3 splits large files into chunks (5MB-5GB each)
    // Client uploads each chunk independently — if one fails, retry just that chunk
    const multipartUpload = await s3.createMultipartUpload({
      Bucket: process.env.RAW_BUCKET,
      Key: s3Key,
      ContentType: contentType,
      Metadata: { uploadId, userId: req.user.id, originalFilename: filename }
    }).promise();

    // Generate presigned URL for each 50MB chunk
    // These URLs are temporary (1 hour) and signed — no auth token needed in client
    const chunkSize = 50 * 1024 * 1024; // 50MB
    const numParts = Math.ceil(fileSize / chunkSize);

    const presignedUrls = await Promise.all(
      Array.from({ length: numParts }, (_, i) =>
        s3.getSignedUrlPromise('uploadPart', {
          Bucket: process.env.RAW_BUCKET,
          Key: s3Key,
          UploadId: multipartUpload.UploadId,
          PartNumber: i + 1,
          Expires: 3600  // 1 hour
        })
      )
    );

    // Track upload state in DB
    await db.uploads.create({
      id: uploadId,
      userId: req.user.id,
      s3Key,
      s3UploadId: multipartUpload.UploadId,
      filename,
      fileSize,
      status: 'uploading',
      createdAt: new Date()
    });

    return res.json({
      uploadId,
      s3UploadId: multipartUpload.UploadId,
      presignedUrls,   // Array of URLs, one per 50MB chunk
      chunkSize,
      numParts
      // Client: PUT each presignedUrls[i] with the corresponding file bytes
      // Client uploads ALL chunks in parallel directly to S3
      // Your server never sees the video data
    });
  }

  // Step 2: Client calls this after uploading all parts directly to S3
  // POST /uploads/:uploadId/complete
  async completeUpload(req, res) {
    const { uploadId } = req.params;
    const { parts } = req.body;  // [{ PartNumber: 1, ETag: '"abc..."' }, ...]

    const upload = await db.uploads.findById(uploadId);

    // Tell S3 to assemble all the chunks into one object
    await s3.completeMultipartUpload({
      Bucket: process.env.RAW_BUCKET,
      Key: upload.s3Key,
      UploadId: upload.s3UploadId,
      MultipartUpload: { Parts: parts }
    }).promise();

    // Update DB status
    await db.uploads.update({ id: uploadId }, {
      status: 'uploaded',
      uploadedAt: new Date()
    });

    // Publish job to transcoding queue
    // This is the handoff: upload service's job is done, workers take over
    await queue.publish('video.transcode', {
      uploadId,
      s3Key: upload.s3Key,
      userId: upload.userId,
      resolutions: [
        { name: '360p',  width: 640,  height: 360,  bitrate: '800k'  },
        { name: '720p',  width: 1280, height: 720,  bitrate: '2500k' },
        { name: '1080p', width: 1920, height: 1080, bitrate: '5000k' }
      ]
    }, {
      idempotencyKey: uploadId   // Prevent duplicate jobs if called twice
    });

    // Return 202 Accepted — processing happens asynchronously
    return res.status(202).json({
      uploadId,
      status: 'transcoding',
      estimatedMinutes: 10,
      statusUrl: /uploads/$ {uploadId}/status  // Client polls this
    });
  }

  // Client polls this endpoint while video is processing
  // GET /uploads/:uploadId/status
  async getStatus(req, res) {
    const { uploadId } = req.params;
    const upload = await db.uploads.findById(uploadId);

    if (upload.status === 'ready') {
      return res.status(200).json({
        uploadId,
        status: 'ready',
        video: {
          streamUrl: https://cdn.example.com/hls/$ {uploadId}/master.m3u8,
          thumbnailUrl: https://cdn.example.com/thumbnails/$ { uploadId}.jpg,
          duration: upload.duration,
          resolutions: ['360p', '720p', '1080p']
        }
      });
    }

    return res.status(202).json({
      uploadId,
      status: upload.status,   // 'uploading' | 'uploaded' | 'transcoding' | 'failed'
      progress: upload.progress || 0
    });
  }
}

// Why Presigned URLs are essential:
// ==================================
// ✅ No bandwidth bottleneck — S3 handles all video bytes directly
// ✅ No memory pressure on API servers — server never buffers video data
// ✅ Native parallelism — all chunks upload simultaneously
// ✅ S3 handles resumability — if connection drops, resume from last chunk
// ✅ Scales to any file size — multipart handles files up to 5TB
  </code></pre>

  <h3>2. Message Queues: RabbitMQ vs Kafka</h3>
  <pre><code>
// The queue is the heart of the async pipeline.
// It decouples upload from processing — upload service scales independently from workers.
// If 1000 videos upload at once, they queue up safely instead of crashing workers.

// RabbitMQ vs Kafka — When to use each:
// ========================================
//
//                  RabbitMQ                    Kafka
// Model:           Push (broker → consumer)    Pull (consumer reads at own pace)
// Retention:       Deleted after ACK           Retained for days/forever (log)
// Replay:          No replay after ACK         Replay from any offset ✅
// Throughput:      ~50k msg/s                  ~1M+ msg/s ✅
// Complexity:      Simple, easy setup ✅        Needs Zookeeper/KRaft
// Use case:        Small-medium scale          YouTube/Netflix scale ✅
//
// Choose RabbitMQ when: Simple setup, one consumer type, need priority queues
// Choose Kafka when: Multiple consumer types, need replay, millions of events/day


// RabbitMQ Implementation with Dead Letter Queue (DLQ)
// =====================================================

const amqp = require('amqplib');

class TranscodeQueue {

  async setup(channel) {
    // Dead Letter Queue — where failed jobs go after max retries
    // Without DLQ: failed jobs silently disappear. User's video is stuck "processing" forever.
    // With DLQ: failed jobs preserved, ops team inspects and replays after fixing the bug.
    await channel.assertQueue('video.transcode.dead', { durable: true });

    // Retry queue — messages re-enter main queue after a delay
    // This gives temporary issues (OOM kill, brief network blip) time to resolve
    await channel.assertQueue('video.transcode.retry', {
      durable: true,
      arguments: {
        'x-dead-letter-routing-key': 'video.transcode',
        'x-message-ttl': 30000   // 30s delay before retry
      }
    });

    // Main queue with DLQ configuration
    await channel.assertQueue('video.transcode', {
      durable: true,     // Survives RabbitMQ restart — critical for production
      arguments: {
        'x-dead-letter-exchange': '',
        'x-dead-letter-routing-key': 'video.transcode.dead',
        'x-message-ttl': 3600000,    // 1 hour TTL before expiry
        'x-max-priority': 10         // Priority queue — premium users first
      }
    });
  }

  async publish(channel, job) {
    const message = Buffer.from(JSON.stringify(job));

    channel.sendToQueue('video.transcode', message, {
      persistent: true,                            // Survive broker restart
      priority: job.isPremiumUser ? 8 : 3,        // Premium users processed first
      headers: {
        retryCount: 0,
        publishedAt: new Date().toISOString()
      }
    });
  }

  async consume(channel, handler) {
    // prefetch(1) = worker only holds 1 job at a time (backpressure)
    // Without this: RabbitMQ pushes all 1000 queued jobs to workers simultaneously → OOM
    // With this: worker requests next job only after finishing current one
    channel.prefetch(1);

    channel.consume('video.transcode', async (msg) => {
      if (!msg) return;

      const job = JSON.parse(msg.content.toString());
      const retryCount = msg.properties.headers.retryCount || 0;

      try {
        await handler(job);
        channel.ack(msg);   // ✅ Success — remove from queue permanently

      } catch (error) {
        console.error(Job failed (attempt $ {retryCount + 1}):, error);

        if (retryCount < 3) {
          // Retry with backoff: send to retry queue (30s delay), then back to main queue
          channel.sendToQueue('video.transcode.retry', msg.content, {
            persistent: true,
            headers: { retryCount: retryCount + 1 }
          });
          channel.ack(msg);  // Remove original — retry copy is now queued

        } else {
          // Max retries exceeded → DLQ for manual inspection
          // nack(msg, false, false) = reject without requeue = goes to DLQ
          channel.nack(msg, false, false);
          await alertOpsTeam(job, error);  // Page on-call
        }
      }
    });
  }
}


// Kafka Implementation (for scale — multiple consumer types)
// ===========================================================
// Key advantage: Same event consumed by multiple independent consumer groups
// Transcoder reads it. Analytics reads it. Moderation reads it.
// Each at their own pace. Adding new consumer = zero changes to existing code.

const { Kafka } = require('kafkajs');

class KafkaTranscodeQueue {
  constructor() {
    this.kafka = new Kafka({ clientId: 'video-pipeline', brokers: ['kafka:9092'] });
    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: 'transcode-workers' });
  }

  async publishJob(job) {
    await this.producer.send({
      topic: 'video-transcode-jobs',
      messages: [{
        key: job.userId,              // Partition by userId
        // All of one user's videos go to the same partition = ordered processing per user
        value: JSON.stringify(job),
        headers: { 'upload-id': job.uploadId, 'schema-version': '1.0' }
      }]
    });
  }

  async startConsuming(handler) {
    await this.consumer.subscribe({ topic: 'video-transcode-jobs', fromBeginning: false });

    await this.consumer.run({
      eachMessage: async ({ message, partition, offset }) => {
        const job = JSON.parse(message.value.toString());
        await handler(job);
        // Kafka commits offset only after eachMessage resolves successfully
        // If worker crashes mid-job, offset not committed → message redelivered → safe retry
      }
    });
  }

  // The killer feature RabbitMQ can't do: replay from any point in history
  async replayFrom(timestamp) {
    // Reprocess all videos since this timestamp
    // Use case: You deployed a bug in your transcoder and need to re-transcode last 24h of videos
    await this.consumer.seek({
      topic: 'video-transcode-jobs',
      partition: 0,
      offset: await this.getOffsetByTimestamp(timestamp)
    });
  }
}
  </code></pre>

  <h3>3. Transcoder Workers: FFmpeg & HLS Segmentation</h3>
  <pre><code>
// Workers pull jobs from the queue, download raw video from S3,
// run FFmpeg to produce HLS segments at each resolution,
// then upload outputs back to S3.

// What is HLS (HTTP Live Streaming)?
// ====================================
// HLS splits video into small 6-10 second segments (.ts files).
// A playlist file (.m3u8) lists all segments in order.
// Player downloads playlist, fetches segments sequentially, buffers ahead.
//
// Why HLS over a direct MP4 download?
// 1. ADAPTIVE BITRATE: Master playlist lists all quality levels (360p/720p/1080p).
//    Player monitors download speed and switches quality mid-stream automatically.
//    Slow connection = 360p. Fast WiFi = 1080p. No buffering. No quality lock-in.
// 2. SEEKING EFFICIENCY: Seeking to minute 45 downloads only segments around that timestamp.
//    Direct MP4 requires downloading/skipping the whole file or complex byte-range requests.
// 3. CDN FRIENDLY: Each tiny segment is a separate HTTP request — CDN caches aggressively.
//    A 4GB MP4 caches poorly at edge nodes. 6-second chunks cache perfectly.

const ffmpeg = require('fluent-ffmpeg');
const { S3Client } = require('@aws-sdk/client-s3');

class TranscodeWorker {
  constructor() {
    this.s3 = new S3Client({ region: 'us-east-1' });
    this.workDir = '/tmp/transcode';
  }

  async processJob(job) {
    const { uploadId, s3Key, resolutions } = job;
    const jobDir = $ {this.workDir}/$ {uploadId};

    try {
      await this.updateStatus(uploadId, 'transcoding', 0);

      // 1. Download raw video from S3
      const rawPath = $ {jobDir}/original.mp4;
      await this.downloadFromS3(s3Key, rawPath);

      // 2. Transcode ALL resolutions IN PARALLEL
      // They are completely independent — no reason to do sequentially
      // On a 4-core instance: 3 resolutions run simultaneously, all done in ~1x time not 3x
      const transcodeResults = await Promise.all(
        resolutions.map((res, i) =>
          this.transcodeResolution(rawPath, uploadId, res, (progress) => {
            const overall = (i / resolutions.length) * 100 + (progress / resolutions.length);
            this.updateStatus(uploadId, 'transcoding', overall);
          })
        )
      );

      // 3. Generate HLS master playlist
      // This is the entry point for the video player
      // It tells the player: "here are all the quality options, pick based on bandwidth"
      const masterPlaylist = this.generateMasterPlaylist(uploadId, resolutions);
      await this.uploadToS3(
        hls/$ {uploadId}/master.m3u8,
        masterPlaylist,
        'application/vnd.apple.mpegurl'
      );

      // 4. Generate thumbnail from frame at 5 seconds
      const thumbPath = $ {jobDir}/thumbnail.jpg;
      await this.generateThumbnail(rawPath, thumbPath, 5);
      await this.uploadToS3(thumbnails/$ {uploadId}.jpg, thumbPath, 'image/jpeg');

      // 5. Mark video as ready
      await this.updateStatus(uploadId, 'ready', 100);

      // 6. Publish completion event for notification service
      await queue.publish('video.ready', {
        uploadId,
        streamUrl: https://cdn.example.com/hls/$ {uploadId}/master.m3u8,
        thumbnailUrl: https://cdn.example.com/thumbnails/$ {uploadId}.jpg
      });

    } finally {
      // Always clean up temp files — workers run on shared disk
      await fs.rm(jobDir, { recursive: true, force: true });
    }
  }

  async transcodeResolution(inputPath, uploadId, resolution, onProgress) {
    const { name, width, height, bitrate } = resolution;
    const outputDir = $ {this.workDir}/$ {uploadId}/$ {name};
    await fs.mkdir(outputDir, { recursive: true });

    // Run FFmpeg to produce HLS segments
    await new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        // Video encoding settings
        .videoCodec('libx264')          // H.264 codec — universally supported
        .size($ {width}x$ {height})     // Resolution scaling
        .videoBitrate(bitrate)          // Target bitrate for this resolution
        .audioCodec('aac')              // AAC audio — universally supported
        .audioBitrate('128k')

        // HLS output settings
        .outputOptions([
          '-hls_time 6',               // 6-second segments (standard for VOD)
          '-hls_playlist_type vod',    // VOD = fixed duration, not live stream
          '-hls_segment_filename', $ {outputDir}/segment%03d.ts,
          '-preset fast',              // Balance encode speed vs. compression
          '-crf 23'                    // Quality factor (lower = better, 18-28 typical)
        ])
        .output($ {outputDir}/playlist.m3u8)

        .on('progress', (p) => onProgress(p.percent || 0))
        .on('end', resolve)
        .on('error', reject)
        .run();
    });

    // Upload all generated files to S3 (segments + playlist)
    const files = await fs.readdir(outputDir);

    await Promise.all(
      files.map(file =>
        this.uploadToS3(
          hls/$ {uploadId}/$ {name}/$ {file},
          $ {outputDir}/$ {file},
          file.endsWith('.m3u8') ? 'application/vnd.apple.mpegurl' : 'video/MP2T'
        )
      )
    );

    console.log( Transcoded and uploaded $ {name} ($ {files.length} segments));
    return { resolution: name, segments: files.length };
  }

  generateMasterPlaylist(uploadId, resolutions) {
    // HLS Master Playlist — player reads this first, picks best quality automatically
    // Player checks bandwidth, picks appropriate stream, switches seamlessly if it changes
    let content = '#EXTM3U\n#EXT-X-VERSION:3\n\n';

    const bitrateMap = { '360p': 800000, '720p': 2500000, '1080p': 5000000 };
    const resMap    = { '360p': '640x360', '720p': '1280x720', '1080p': '1920x1080' };

    resolutions.forEach(res => {
      content += #EXT-X-STREAM-INF:BANDWIDTH=$ {bitrateMap[res.name]},RESOLUTION=$ {resMap[res.name]}\n;
      content += $ {res.name}/playlist.m3u8\n\n;
    });

    return content;
    /*
    Result (what the video player reads):
    ======================================
    #EXTM3U
    #EXT-X-VERSION:3

    #EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=640x360
    360p/playlist.m3u8

    #EXT-X-STREAM-INF:BANDWIDTH=2500000,RESOLUTION=1280x720
    720p/playlist.m3u8

    #EXT-X-STREAM-INF:BANDWIDTH=5000000,RESOLUTION=1920x1080
    1080p/playlist.m3u8

    Player on slow 3G → loads 360p/playlist.m3u8
    Player on fast WiFi → loads 1080p/playlist.m3u8
    Player on fluctuating LTE → switches between them every few segments
    */
  }
}
  </code></pre>

  <h3>4. Idempotent Workers: Safe to Re-run</h3>
  <pre><code>
// Workers WILL process the same message multiple times. This is not a bug — it's a given.
// Network issues cause redelivery. Spot instances get terminated mid-job.
// Ops team replays from DLQ after fixing a bug. All of these mean duplicate processing.
//
// Your worker MUST be safe to run twice on the same job — this is called IDEMPOTENCY.

class IdempotentTranscodeWorker {

  async processJob(job) {
    const { uploadId } = job;

    // Strategy 1: Check-before-write on S3
    // ======================================
    // Before uploading a segment, check if it already exists.
    // If yes, skip. Uploading identical content twice is harmless anyway.
    async uploadSegmentIdempotent(s3Key, localPath) {
      try {
        await s3.headObject({ Bucket: BUCKET, Key: s3Key }).promise();
        console.log(Segment already exists, skipping: $ {s3Key});
        return;  // Already uploaded — skip
      } catch (e) {
        if (e.code !== 'NotFound') throw e;
        // Doesn't exist yet — upload it
        await this.uploadToS3(s3Key, localPath);
      }
    }

    // Strategy 2: Database unique constraint
    // ========================================
    // When marking a job complete, use INSERT ... ON CONFLICT DO NOTHING.
    // Second completion attempt silently no-ops — no duplicate record, no error.
    async markComplete(uploadId) {
      await db.query(
        INSERT INTO completed_jobs (upload_id, completed_at)
        VALUES ($1, NOW())
        ON CONFLICT (upload_id) DO NOTHING
      , [uploadId]);
      // If this uploadId was already completed, query succeeds but inserts nothing
    }

    // Strategy 3: Deterministic S3 keys
    // ====================================
    // ALWAYS derive S3 keys from the uploadId — never generate new random paths.
    // If worker restarts and re-runs, it produces identical S3 paths and overwrites
    // with identical content. Since content is the same, overwriting is harmless.

    // ✅ Deterministic — same uploadId always produces same key
    const s3Key = hls/$ {uploadId}/720p/segment003.ts;

    // ❌ Non-deterministic — generates different key on each run
    const badKey = hls/$ {uuidv4()}/720p/segment003.ts;  // DON'T DO THIS

    // Strategy 4: Step checkpointing for long workflows
    // ===================================================
    // Record which steps completed. On restart, skip completed steps.
    // Failure in step 7 of 10 doesn't re-run steps 1-6.
    async getCompletedSteps(uploadId) {
      const record = await db.workflows.findOne({ uploadId });
      return record?.completedSteps || [];
    }

    const steps = ['validate', 'transcode_360p', 'transcode_720p', 'transcode_1080p', 'thumbnail', 'manifest'];
    const completedSteps = await this.getCompletedSteps(uploadId);

    for (const step of steps) {
      if (completedSteps.includes(step)) {
        console.log(Skipping completed step: $ {step});
        continue;  // Already done — safe to skip
      }

      await this.executeStep(step, uploadId);

      // Mark step complete
      await db.workflows.update(
        { uploadId },
        { $push: { completedSteps: step } }
      );
    }
  }
}

// Idempotency for Different Operations:
// =======================================
// Upload segment to S3   → Check HeadObject first, skip if exists
// Insert to database     → ON CONFLICT DO NOTHING
// Publish queue event    → Deduplicate by idempotency key in Redis
// Send notification      → Check notification_sent flag in DB before sending
// Mark job complete      → Unique constraint on job_id in completed_jobs table
  </code></pre>

  <h3>5. CDN, Streaming & Status Notifications</h3>
  <pre><code>
// After transcoding, videos are served from CDN not directly from S3.
// CDN (CloudFront, Fastly, etc.) caches segments at edge locations globally.
// User in Mumbai gets segments from a Mumbai edge node, not your S3 in us-east-1.

// CDN Cache Strategy — different TTLs for different file types
// =============================================================
const cdnConfig = {
  behaviors: [
    {
      // .ts segments — VIDEO DATA — immutable, cache forever
      // A segment created today will NEVER change. Safe to cache for a year.
      pathPattern: '*.ts',
      defaultTTL: 86400,       // 24 hours
      maxTTL: 31536000,        // 1 year — segments never change
    },
    {
      // .m3u8 playlists — METADATA — can update (for live streams)
      // For VOD (pre-recorded), these are also immutable. But kept short for safety.
      pathPattern: '*.m3u8',
      defaultTTL: 5,           // 5 seconds for live streams
      maxTTL: 86400,           // 24 hours for VOD
    },
    {
      // Thumbnails — immutable once generated
      pathPattern: 'thumbnails/*',
      defaultTTL: 86400,       // 24 hours
      maxTTL: 2592000,         // 30 days
    }
  ],
  // S3 is the origin — CDN pulls from S3 when cache misses
  // CloudFront Origin Access Control: S3 bucket is PRIVATE
  // Only CloudFront can read it — prevents direct S3 hotlinking
  origins: [{
    domainName: 'my-video-bucket.s3.amazonaws.com',
    originAccessControl: 'enabled'  // All traffic MUST go through CDN
  }]
};

// Status Polling Service
// =======================
// Client polls /uploads/:id/status while video processes
// Returns 202 while in progress, 200 with stream URL when ready

class StatusService {
  async getStatus(req, res) {
    const { uploadId } = req.params;
    const upload = await db.uploads.findById(uploadId);

    if (!upload) {
      return res.status(404).json({ error: 'Not found' });
    }

    const statusResponses = {
      uploading:   { code: 202, message: 'Upload in progress' },
      uploaded:    { code: 202, message: 'Queued for processing' },
      transcoding: { code: 202, message: 'Transcoding in progress' },
      ready:       { code: 200, message: 'Video ready to stream' },
      failed:      { code: 500, message: 'Processing failed' }
    };

    const { code, message } = statusResponses[upload.status];

    const response = {
      uploadId: upload.id,
      status: upload.status,
      message,
      progress: upload.progress || 0,
      createdAt: upload.created_at
    };

    // Only include video URL when actually ready
    if (upload.status === 'ready') {
      response.video = {
        streamUrl: https://cdn.example.com/hls/$ {uploadId}/master.m3u8,
        thumbnailUrl: https://cdn.example.com/thumbnails/$ {uploadId}.jpg,
        duration: upload.duration,
        resolutions: upload.available_resolutions
      };
    }

    return res.status(code).json(response);
  }
}

// WebSocket Notifications — alternative to polling
// ==================================================
// Instead of client polling every 5 seconds, push update when ready.
// Better UX: instant notification. Less load: no polling requests.

class NotificationService {
  constructor(io) {
    this.io = io;  // Socket.IO instance
  }

  // Called by worker after transcoding completes
  async onVideoReady(job) {
    // Push to specific user's WebSocket connection
    this.io.to(user:$ {job.userId}).emit('video.ready', {
      uploadId: job.uploadId,
      streamUrl: https://cdn.example.com/hls/$ {job.uploadId}/master.m3u8,
      message: 'Your video is ready to watch!'
    });

    // Also send email notification via separate email queue
    await emailQueue.publish('send.email', {
      to: job.userEmail,
      template: 'video-ready',
      data: { videoUrl: https://cdn.example.com/hls/$ {job.uploadId}/master.m3u8 }
    });
  }
}

// Flow summary:
// ==============
// 1. Worker completes transcoding
// 2. Worker publishes 'video.ready' event to queue
// 3. Notification service consumes event
// 4. Pushes to user's WebSocket (instant) AND sends email (async)
// 5. Client receives WebSocket push → updates UI → user sees their video
  </code></pre>

  <h3>6. Autoscaling Workers & Complete System Design</h3>
  <pre><code>
// Workers are a perfect autoscaling workload:
// - Stateless: all state in queue + S3 + DB
// - Interruptible: job returns to queue if worker dies
// - Variable load: traffic spikes when users upload
//
// KEY INSIGHT: Scale on QUEUE DEPTH, not CPU utilization.
// A worker sitting idle (waiting for next job) shows 0% CPU.
// But you may need more workers to drain the queue faster.
// CPU is the wrong metric. Queue depth is the right metric.

// KEDA (Kubernetes Event Driven Autoscaling) — scale based on queue depth
const keda_config = 
apiVersion: keda.sh/v1alpha1
kind: ScaledObject
metadata:
  name: transcode-worker-scaler
spec:
  scaleTargetRef:
    name: transcode-worker
  minReplicaCount: 1       # Always 1 worker (never scale to 0 — cold start too slow)
  maxReplicaCount: 50      # Cap at 50 for cost control
  triggers:
  - type: rabbitmq
    metadata:
      queueName: video.transcode
      host: rabbitmq://rabbitmq:5672
      queueLength: "5"     # 1 worker per 5 queued jobs
# Queue depth 0  → 1 worker (minimum)
# Queue depth 25 → 5 workers (scale up)
# Queue depth 250 → 50 workers (maximum)
# Queue depth drops → workers scale back down;

// Spot Instance Strategy — 70% cost savings
// ==========================================
const workerDeployment = {
  instanceType: 'c5.4xlarge',   // Compute optimized — FFmpeg is CPU-bound
  spotInstances: true,           // 70% cheaper than on-demand
  gracefulDrainSeconds: 300,     // Finish current job before termination

  // Handle spot interruption (AWS gives 2 minute warning via SIGTERM):
  spotInterruptionHandling: 
    process.on('SIGTERM', async () => {
      console.log('Spot interruption — draining gracefully');
      // 1. Stop accepting new jobs (stop consuming from queue)
      await channel.cancel(consumerTag);
      // 2. Wait for current job to finish (max 2 minutes)
      await waitForCurrentJobToComplete();
      // 3. If job still running, checkpoint progress to S3 and NACK
      if (currentJob) {
        await saveCheckpoint(currentJob.uploadId, currentProgress);
        channel.nack(currentMsg, false, true);  // Return to queue
      }
      process.exit(0);
      // New worker spins up, picks up from checkpoint
    });
};

// Complete System Architecture
// ==============================

class VideoTranscodingSystem {

  // This orchestrator coordinates the full pipeline
  // In production: use Temporal, AWS Step Functions, or Apache Airflow
  // instead of building your own — they handle timeouts, retries, and state automatically

  async processVideo(uploadId) {
    const steps = [
      'validate_file',         // Check codec, container, metadata integrity
      'extract_metadata',      // Duration, resolution, fps, codec info
      'transcode_360p',        // Independent — runs in parallel with others
      'transcode_720p',        // Independent — runs in parallel with others
      'transcode_1080p',       // Independent — runs in parallel with others
      'generate_thumbnail',    // Extract frame at 5s
      'generate_subtitles',    // Optional: run speech recognition
      'publish_manifest',      // Create master.m3u8 after all resolutions done (fan-in)
      'notify_complete'        // Push WebSocket + send email
    ];

    // Fan-out: steps 3-5 run in PARALLEL (fan-out)
    // Fan-in: step 8 waits for ALL of steps 3-5 to complete (fan-in)
    //
    // Fan-out = 1 job triggers multiple parallel jobs
    // Fan-in = wait for all parallel jobs before proceeding
    //
    // Total time WITH parallelism:  ~15 min (longest single transcode)
    // Total time WITHOUT parallelism: ~30 min (360p + 720p + 1080p sequential)

    for (const step of steps) {
      const alreadyDone = await this.isStepComplete(uploadId, step);
      if (alreadyDone) continue;  // Idempotent: skip if already done

      try {
        await this.executeStep(step, uploadId);
        await this.markStepComplete(uploadId, step);

      } catch (error) {
        await this.markStepFailed(uploadId, step, error);

        // Re-queue from THIS step (not from beginning!)
        // Don't redo 360p transcode if 720p failed — waste of time and money
        await queue.publish('video.transcode.resume', {
          uploadId,
          resumeFrom: step
        });

        throw error;
      }
    }
  }

  // Health check exposes dependency status for load balancer
  healthCheck(req, res) {
    res.json({
      status: 'healthy',
      uptime: process.uptime(),
      dependencies: {
        redis: redisClient.status === 'ready',
        database: db.isConnected(),
        s3: s3ConnectionHealthy,
        queue: queueConnection.isOpen()
      },
      metrics: {
        jobsProcessed: this.jobsProcessed,
        jobsFailed: this.jobsFailed,
        averageProcessingTimeMs: this.avgProcessingTime
      }
    });
  }
}

// Monitoring — what to track:
// ============================
// Queue depth — primary scaling signal, alert if growing faster than workers drain it
// Processing time p50/p95/p99 — alert if p99 > SLA (e.g. video not ready within 30 min)
// Success rate — alert if < 99% (most failures should be transient and auto-retry)
// DLQ depth — alert if anything enters DLQ (requires human investigation)
// Spot interruption rate — high rate = need more on-demand fallback capacity
// CDN hit rate — should be > 95% for segments (low = CDN misconfigured or too few edge nodes)
  </code></pre>

</div>`,
            examples: [
              "202 Accepted pattern — upload returns immediately with job ID",
              "S3 multipart upload with presigned URLs for each 50MB chunk",
              "RabbitMQ queue with DLQ and 30-second retry backoff",
              "Kafka consumer group with partition-by-userId for ordering",
              "FFmpeg HLS transcoding — 360p / 720p / 1080p segments with playlist",
              "HLS master playlist for adaptive bitrate streaming",
              "KEDA autoscaling workers on queue depth (not CPU)",
              "Spot instance graceful drain on SIGTERM with checkpointing",
              "CloudFront CDN — 1-year TTL for .ts segments, 5s for .m3u8 playlists",
              "WebSocket push notification when video.ready event fires",
              "Fan-out (parallel transcoding) + Fan-in (wait for all before manifest)",
              "Idempotent worker: HeadObject check, ON CONFLICT DO NOTHING, deterministic S3 keys",
            ],

            questions: [
              {
                question:
                  "Why can't we process video uploads synchronously? What's the core problem?",
                difficulty: "Beginner",
                category: "Async Design",
                answer:
                  "Three compounding problems make synchronous transcoding impossible. 1) TIME MISMATCH: HTTP connections timeout after 30-120 seconds. Transcoding a 1GB video to three resolutions takes 5-20 minutes. Connection is gone before work finishes. 2) RESOURCE BLOCKING: Synchronous processing holds a server thread hostage for the entire duration. With 100 concurrent uploads, you need 100 threads blocked on FFmpeg — server crashes under ordinary load. 3) NO RETRY SEMANTICS: If server crashes mid-transcode, work is lost. No record of what was done. User sees a 500 error. No way to resume. Solution: 202 Accepted pattern. Accept the upload immediately, persist the job to a queue, return a job ID to the client, process asynchronously in background. Client polls /status/:id or listens on WebSocket for completion. This decouples latency-sensitive HTTP from compute-intensive FFmpeg entirely.",
              },
              {
                question:
                  "Kafka vs RabbitMQ — when would you use each for a video pipeline?",
                difficulty: "Intermediate",
                category: "Message Queues",
                answer:
                  "RabbitMQ is a traditional message broker. Messages pushed to consumers, deleted after ACK. Simpler setup, good routing (exchanges, bindings), priority queues, DLQ. Good default for companies processing thousands of videos per day. Kafka is a distributed commit log. Messages retained for days or forever. Consumers pull at own pace. Game-changing feature: REPLAY — reprocess all videos since any timestamp. Matters when: you deploy a bug in transcoder, want to add new resolution to existing videos, need audit trail of all processing. Kafka handles much higher throughput (millions of messages/second). For video pipelines: Use RabbitMQ for simple setups with one consumer type. Use Kafka when multiple consumer types read same events (transcoder, analytics, moderation, notifications each subscribe independently), or when replay is a requirement. At Netflix/YouTube scale, Kafka is non-negotiable. For a startup, RabbitMQ ships faster. Key Kafka advantage that's often missed: adding a new consumer (e.g. copyright detection) requires zero changes to existing code — just add a new consumer group.",
              },
              {
                question:
                  "What is a Dead Letter Queue and why is it essential?",
                difficulty: "Intermediate",
                category: "Reliability",
                answer:
                  "A Dead Letter Queue (DLQ) is where messages go after exceeding their retry limit. Without DLQ: failed messages either disappear silently (job discarded) or loop forever retrying. Both are bad. With DLQ: failed messages preserved for inspection without blocking main queue. Flow: Worker fails processing video → requeues with incremented retry count → after 3 retries → message sent to DLQ instead of main queue. Why essential: Safety net for unexpected failures. A corrupt video that crashes FFmpeg, malformed payload, race condition in code — all surface in DLQ. You inspect message, fix the bug, replay into main queue. Without DLQ, users never know their video silently failed — they just see 'processing' forever. Operational practice: Monitor DLQ depth as health metric. Alert when anything enters DLQ — it means something needs human attention. Build admin UI to inspect DLQ messages and selectively requeue. Log the error alongside the original message for fast debugging.",
              },
              {
                question:
                  "How does HLS work and why use it over a direct MP4 download?",
                difficulty: "Intermediate",
                category: "Streaming",
                answer:
                  "HLS splits video into small segments (typically 6-10 seconds) as .ts files. A playlist file (.m3u8) lists all segments in order. Video player downloads playlist, fetches segments sequentially, buffers ahead. Why not serve MP4 directly? Three reasons: 1) ADAPTIVE BITRATE: HLS master playlist lists multiple quality levels (360p, 720p, 1080p). Player monitors download speed in real time and seamlessly switches quality mid-stream. On slow connection: 360p. On fast WiFi: 1080p. Direct MP4 locks user into one quality. 2) SEEKING EFFICIENCY: Seeking to minute 45 of 2-hour video downloads only segments around that timestamp — not the entire file. Direct MP4 requires byte-range requests and server support. 3) CDN FRIENDLY: Each tiny segment is a separate HTTP request — CDN caches aggressively. A 4GB MP4 file caches poorly at edge nodes. Caching strategy: .ts segments are immutable (never change) → cache 1 year. .m3u8 playlists can change for live streams → cache 5-30 seconds. For VOD, playlists are also immutable → cache 24 hours. This maximizes CDN hit rate while keeping live streams current.",
              },
              {
                question:
                  "How do you handle idempotency in transcoding workers?",
                difficulty: "Intermediate",
                category: "Idempotency",
                answer:
                  "Workers process the same message multiple times — network issues cause redelivery, spot instances terminate mid-job, ops team replays from DLQ. All scenarios mean worker must be safe to run twice on same job. Strategies: 1) CHECK-BEFORE-WRITE: Before uploading segment to S3, check if it already exists (HeadObject). If yes, skip. Uploading identical content twice is harmless. 2) DATABASE UNIQUE CONSTRAINT: When marking job complete, use INSERT INTO completed_jobs (upload_id) VALUES ($1) ON CONFLICT DO NOTHING. Second attempt silently no-ops. 3) DETERMINISTIC S3 KEYS: Always derive S3 keys from uploadId — never generate new random paths. If worker restarts, it produces identical paths and overwrites with identical content. Overwriting is harmless when content is the same. Don't do: hls/{uuidv4()}/segment.ts — different key on each run creates orphaned files. Do: hls/{uploadId}/720p/segment003.ts — always the same path. 4) STEP CHECKPOINTING: For long workflows, record which steps completed. On restart, skip completed steps. Failure in step 7 of 10 doesn't re-run steps 1-6. Core principle: make every side-effecting operation a no-op if the effect already exists.",
              },
              {
                question:
                  "How do you scale transcoding workers? What metric drives autoscaling?",
                difficulty: "Advanced",
                category: "Scaling",
                answer:
                  "CPU utilization is the WRONG metric for scaling queue workers. A worker idle (waiting for next job) shows 0% CPU, but you may need more workers to drain queue faster. Queue depth is the right metric. KEDA (Kubernetes Event Driven Autoscaling) solves this: reads queue depth from RabbitMQ or Kafka, scales worker Deployment accordingly. Configure 1 worker per 5 jobs: depth 0 → 1 worker (min), depth 25 → 5 workers, depth 500 → 50 workers (max). Instance type matters: FFmpeg transcoding is CPU-bound, not memory or GPU bound (for H.264). Use compute-optimized instances (c5.4xlarge, c6a.8xlarge). For hardware-accelerated encoding (H.265, AV1), use GPU instances with -hwaccel nvenc — 5-10x faster. Cost optimization with Spot Instances: Workers are perfect Spot workload — stateless, interruptible (job returns to queue), flexible timing. Spot is 60-80% cheaper than on-demand. Handle SIGTERM: checkpoint progress to S3, NACK the message (returns to queue), exit gracefully. New instance picks up from checkpoint. Parallelism within a job: Within one worker, transcode all three resolutions in parallel (Promise.all) — they're independent. Each uses ~1 CPU core, so 4-core instance transcodes 3 resolutions simultaneously.",
              },
              {
                question:
                  "What happens if a worker dies mid-transcode? How do you recover?",
                difficulty: "Advanced",
                category: "Error Handling",
                answer:
                  "Worker death is handled at two levels. QUEUE LEVEL: RabbitMQ/Kafka tracks which messages are in-flight (unacknowledged). When worker dies, message is automatically redelivered to another worker. Kafka: offset not committed on crash → message redelivered on restart. RabbitMQ: NACK or timeout → message returns to queue front. APPLICATION LEVEL: Worker is idempotent so redelivery is safe. New worker picks up same message, checks which steps completed (via DB), skips them, resumes from where previous worker left off. Spot instance interruption (2-minute warning via SIGTERM): Worker catches SIGTERM, stops consuming new jobs, waits for current job to finish (up to 2 min), if still running checkpoints progress to S3, NACKs message, exits cleanly. New worker picks up message, reads checkpoint from S3, resumes from that segment. Partial completion: What if 360p and 720p succeed but 1080p crashes? Track per-resolution status independently. Mark video as 'partially_ready' — streamable at 360p and 720p while 1080p retries. Users get a watchable video faster instead of waiting for all three. Corrupted files: Run FFprobe validation before FFmpeg — check codec, container, duration metadata. Reject files before they hit the worker. Malicious files crash FFmpeg differently each time → DLQ after 3 retries → human review.",
              },
              {
                question:
                  "Explain fan-out and fan-in patterns in the context of this pipeline.",
                difficulty: "Advanced",
                category: "Workflow Patterns",
                answer:
                  "Fan-out: One message triggers multiple parallel jobs. In the video pipeline, one upload triggers three independent transcoding jobs (360p, 720p, 1080p). Each resolution is a separate queue message processed by separate workers independently. Maximizes parallelism — all three resolutions transcode simultaneously. Total time: ~15 min (longest single transcode) instead of 30 min sequential. Fan-in: Multiple parallel jobs must all complete before a final step runs. After 360p, 720p, and 1080p are all done, you need to generate the master HLS playlist. The fan-in step waits for all three before running. Implementation options for fan-in: 1) DATABASE COUNTER: Each worker increments completed_resolutions counter when done. Worker that increments to 3 (total resolutions) triggers manifest generation. Use atomic increment (UPDATE ... RETURNING) to prevent race condition where two workers both think they're the 3rd. 2) WORKFLOW ORCHESTRATOR (Temporal, AWS Step Functions): Handle fan-in natively. Knows which parallel branches running, automatically triggers join step when all complete. Much cleaner than custom DB logic. 3) QUEUE-BASED: Workers publish resolution.complete events. Coordinator listens and tracks which resolutions completed per upload. When all three seen → trigger manifest. The pattern generalizes: scatter-gather applies to parallel DB queries, parallel API calls, parallel file processing — anywhere parallel steps must converge.",
              },
              {
                question:
                  "How would you design the storage layer — what goes in S3, CDN, and database?",
                difficulty: "Intermediate",
                category: "Storage Design",
                answer:
                  "S3 — two buckets with different permissions: RAW BUCKET (private): Stores original uploaded files. No public access. Workers access via IAM role. Lifecycle policy: delete raw files 7 days after transcoding succeeds (cost savings). Keep indefinitely if transcoding failed (debugging). PROCESSED BUCKET (CDN origin): Stores HLS segments, playlists, thumbnails. CloudFront Origin Access Control restricts direct S3 access — all traffic must go through CDN. This prevents hotlinking and unauthorized access, and forces all traffic through CDN for caching and metrics. CDN (CloudFront/Fastly): Sits in front of processed bucket. Serves from 400+ edge locations globally. Cache settings: .ts segments → cache 1 year (immutable). .m3u8 playlists → cache 30s to 24h depending on live vs VOD. Thumbnails → cache 24 hours. DATABASE (PostgreSQL): Metadata ONLY — never binary data. Tables: uploads (status, s3Key, userId, fileSize, progress), videos (duration, available_resolutions, thumbnail_s3_key), transcode_jobs (per-resolution status, started_at, completed_at), audit_log (all state changes with timestamps). S3 keys are stored as strings in DB. Actual files live in S3. REDIS: Job status cache (avoid DB polling on every 202 status check), rate limiting counters, idempotency key cache, DLQ alert deduplication.",
              },
              {
                question:
                  "How would you add content moderation to this pipeline without blocking uploads?",
                difficulty: "Advanced",
                category: "Pipeline Extension",
                answer:
                  "Content moderation is a classic Kafka fan-out problem. When video.uploaded event fires, multiple independent consumer groups subscribe: transcoding consumer group, moderation consumer group, analytics consumer group. Each processes at their own pace. Adding copyright detection requires zero changes to existing code — just add a new consumer group. Moderation flow: Worker downloads raw video from S3. Extracts frames at 1fps (or uses AWS Rekognition Video API). Sends frames to moderation model. High confidence violation → flag video, update status to under_review, prevent CDN serving. Human reviewer sees in moderation dashboard. Approved → status becomes ready. Rejected → status becomes removed, notify user. NON-BLOCKING DESIGN: Moderation should not block benign content from going live. Options: 1) OPTIMISTIC RELEASE: Publish immediately, remove if flagged — YouTube's approach for most content. 2) HOLD FOR REVIEW: Only when confidence is high (e.g. > 95% confidence of policy violation). For most content, release immediately. For high-confidence violations, hold pending review. Run moderation on raw file BEFORE transcoding — don't waste GPU compute on clearly violating content. But transcode before deep review — users want to see their video quickly even if held pending final review.",
              },
              {
                question:
                  "How do you support resumable uploads for mobile users on unreliable connections?",
                difficulty: "Advanced",
                category: "Upload Design",
                answer:
                  "Mobile connections drop constantly. User uploading 500MB on LTE that disconnects at 80% must restart without resumable uploads — terrible UX. S3 Multipart Upload provides native resumability: upload divided into 5-50MB chunks, each with its own presigned URL. Client uploads chunks in parallel (or sequentially). If connection drops, only in-flight chunk is lost. On reconnect: client calls ListParts API to see which parts already completed, resumes from first missing part. No need to restart from zero. CLIENT-SIDE STATE: Store S3 UploadId and completed part ETags in localStorage or server-side DB. On page reload or app restart, check for in-progress uploads, offer to resume. SERVER-SIDE CLEANUP: Incomplete multipart uploads cost money (storage for partial parts). Set S3 lifecycle rule: abort multipart uploads older than 7 days. DB cron job: mark uploads stuck in 'uploading' state for > 24 hours as 'abandoned', clean up S3. TUS PROTOCOL ALTERNATIVE: tus.io is open protocol specifically designed for resumable uploads. Libraries for all platforms. Handles chunking, resumption, progress tracking. For production with heavy mobile traffic, TUS is worth the investment over rolling your own multipart logic. Key reason to choose TUS: works across browser refreshes, app kills, and network changes with zero custom client code.",
              },
              {
                question:
                  "How do you handle a viral event causing 10,000 simultaneous video uploads?",
                difficulty: "Advanced",
                category: "Backpressure",
                answer:
                  "This is exactly why the queue exists — it acts as a buffer absorbing bursts. Upload service keeps accepting videos regardless; they pile up in queue. Workers scale up (via KEDA) to drain queue as fast as possible. No data lost; users wait longer. LAYERS OF PROTECTION: 1) QUEUE DEPTH LIMITS: Set max queue size. When exceeded, return 503 with Retry-After header. Prevents unbounded memory growth. 2) PRIORITY QUEUES: Premium users get priority 8, free users priority 3. During overload, premium users' videos process first. Maintains SLA for paying customers even during incidents. 3) PER-USER RATE LIMITING: Prevent one user uploading 10,000 videos and starving everyone. Limit to 10 uploads per user per hour. 4) PREFETCH(1) BACKPRESSURE: Workers consume one job at a time. Without this, RabbitMQ pushes all 10,000 jobs to available workers — OOM. With prefetch(1), busy worker doesn't receive new jobs until current one is ACK'd. 5) CAPACITY PLANNING: Monitor queue depth over time. P95 drain time should be under your SLA. If viral events are common, maintain warm standby workers (spin up in 30s) rather than cold-starting EC2 instances (2-5 minutes). GRACEFUL DEGRADATION: When at capacity, return a friendly 'Videos are processing slower than usual — estimated ready in 2 hours' rather than an opaque error.",
              },
            ],

            links: [
              "https://aws.amazon.com/blogs/media/part-1-ways-to-ingest-and-store-large-media-files-in-aws/ - AWS guide to large video ingestion and multipart upload",
              "https://www.rabbitmq.com/confirms.html - RabbitMQ consumer ACK, NACK, DLQ documentation",
              "https://kafka.apache.org/documentation/ - Official Kafka docs: topics, partitions, consumer groups",
              "https://developer.apple.com/streaming/ - Apple HLS specification and authoring guide",
              "https://ffmpeg.org/ffmpeg.html - FFmpeg reference: codecs, formats, HLS output options",
              "https://keda.sh/docs/ - KEDA Kubernetes queue-based autoscaling with RabbitMQ and Kafka",
              "https://tus.io/protocols/resumable-upload - Open protocol for resumable file uploads",
              "https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html - S3 Multipart Upload: initiate, parts, complete, abort",
              "https://temporal.io/blog/workflow-orchestration - Temporal durable workflow execution and fan-in/fan-out",
              "https://netflixtechblog.com/tagged/video - Netflix tech blog: real-world video encoding and streaming",
              "https://docs.aws.amazon.com/mediaconvert/ - AWS Elemental MediaConvert — managed transcoding (alternative to DIY FFmpeg)",
              "https://www.cloudflare.com/learning/video/what-is-hls-streaming/ - HLS, adaptive bitrate, and CDN delivery explained",
            ],
          },
          {
            topic: "Concurrency Control: Ticket Booking System",
            tags: [
              "Concurrency Control",
              "Database Transactions",
              "Pessimistic Locking",
              "Optimistic Locking",
              "SELECT FOR UPDATE",
              "Compare-and-Swap",
              "Race Conditions",
              "Double Booking",
              "Queue-Based Serialization",
              "Redis Distributed Locks",
              "ACID Transactions",
              "Seat Reservation",
              "High-Demand Sale",
              "Thundering Herd",
              "Idempotency",
              "Distributed Systems",
              "Eventual Consistency",
            ],

            explanation: `
<div>
  <h2>Concurrency Control: Ticket Booking System</h2>
  <p>
    This guide covers one of the most critical problems in distributed systems: preventing two users 
    from booking the same seat simultaneously. Ticket booking for a popular concert is the canonical 
    stress test — thousands of users hit "Buy" at the exact same millisecond for the last few seats.
    We'll cover why naive approaches fail, what a race condition actually looks like at the database level,
    pessimistic locking, optimistic locking, queue-based serialization, and why eventual consistency 
    is completely wrong here.
  </p>

  <h3>The Problem: Race Conditions & Double Booking</h3>
  <pre><code>
// Scenario: Coldplay concert goes on sale. 50,000 users hit "Buy" simultaneously.
// Only 200 seats left. Without concurrency control: 400 people get confirmation emails.
// ======================================================================================

// The Race Condition — what actually happens at the database level:
// -----------------------------------------------------------------
//
// Time 0ms:  User A reads seat 42 → status = 'available'
// Time 0ms:  User B reads seat 42 → status = 'available'
// Time 10ms: User A writes seat 42 → status = 'booked', booking_id = 'A'
// Time 11ms: User B writes seat 42 → status = 'booked', booking_id = 'B'  ← OVERWRITES A!
//
// Both A and B receive a booking confirmation.
// Both show up at the concert. Both have valid tickets. Chaos.

// The naive broken implementation:
class TicketService {
  async bookSeat(userId, seatId, eventId) {
    // ❌ BROKEN: Read-check-write is NOT atomic
    // Between the SELECT and the UPDATE, another transaction can sneak in

    const seat = await db.query(
      'SELECT * FROM seats WHERE id = $1 AND status = $2',
      [seatId, 'available']
    );

    if (!seat) {
      throw new Error('Seat not available');
    }

    // ⚠️ GAP HERE: Another user can book this seat between these two queries
    // This is called a "TOCTOU" bug — Time Of Check To Time Of Use

    await db.query(
      'UPDATE seats SET status = $1, user_id = $2 WHERE id = $3',
      ['booked', userId, seatId]
    );

    return { success: true, seatId };
    // Both User A and User B pass the check and execute the update
    // Last writer wins. First booking is silently overwritten.
  }
}

// Why this is catastrophically worse for tickets than for most systems:
// =====================================================================
// Most systems tolerate small inconsistencies temporarily.
// Double-booking has ZERO tolerance — the seat is physically finite.
// A user shows up to the concert. The seat is taken. There is no "eventual fix."
//
// This is why tickets require STRONG consistency and SYNCHRONOUS conflict resolution.
// Eventual consistency is explicitly the WRONG choice here (covered below).

// What we need:
// =============
// 1. Atomicity: Check-and-update as a single uninterruptible operation
// 2. Isolation: No two transactions can see the same available seat simultaneously
// 3. Conflict detection: If two requests race, exactly ONE wins
// 4. Feedback: The loser gets an immediate error, not a silent overwrite
  </code></pre>

  <h3>1. Database Transactions & ACID</h3>
  <pre><code>
// ACID is the foundation. Understand what each property actually means for tickets.
// =================================================================================
//
// A — ATOMICITY:   All operations in a transaction succeed, or ALL are rolled back.
//                  Charge user AND book seat — if charge fails, seat is not booked.
//                  No partial states. "Half booked" doesn't exist.
//
// C — CONSISTENCY: Database moves from one valid state to another valid state.
//                  Invariant: booked_count <= total_seats, always.
//                  A transaction that violates this cannot commit.
//
// I — ISOLATION:   Concurrent transactions behave as if they ran sequentially.
//                  User A's transaction cannot see User B's in-progress changes.
//                  This is the property that PREVENTS double booking.
//
// D — DURABILITY:  Once committed, a booking survives crashes, power loss, restarts.
//                  "Your booking is confirmed" must mean it's actually persisted.

// Transaction isolation levels — they matter enormously here:
// ============================================================
//
// READ UNCOMMITTED:  Can read rows another transaction hasn't committed yet.
//                    "Dirty reads." Completely useless for tickets.
//
// READ COMMITTED:    Only read committed rows. Still allows "non-repeatable reads."
//                    User A reads seat as available. User B books it and commits.
//                    User A re-reads the same seat — now it's booked. Surprise!
//                    STILL NOT SAFE for tickets without locking.
//
// REPEATABLE READ:   Same row read twice in same transaction returns same data.
//                    Prevents non-repeatable reads. PostgreSQL default.
//                    Still allows phantom reads (new rows inserted by others).
//
// SERIALIZABLE:      Transactions behave as if executed one at a time, serially.
//                    Strongest isolation. Correct for tickets but expensive.
//                    Usually overkill — row-level locking is the practical solution.
//
// What we actually use: READ COMMITTED + explicit row locks (SELECT FOR UPDATE)
// This gives us the safety of SERIALIZABLE for the specific rows we care about,
// without paying the performance cost of full table serialization.

// Minimal correct transaction (no locking yet — still broken):
async function bookSeatTransaction(userId, seatId) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const result = await client.query(
      'SELECT status FROM seats WHERE id = $1',
      [seatId]
    );

    if (result.rows[0].status !== 'available') {
      await client.query('ROLLBACK');
      throw new Error('Seat not available');
    }

    // ⚠️ STILL BROKEN: Two transactions can both pass the check above
    // before either one commits the update.
    // BEGIN/COMMIT alone does NOT prevent the race condition.
    // You need row-level LOCKING. See next section.

    await client.query(
      'UPDATE seats SET status = $1, user_id = $2 WHERE id = $3',
      ['booked', userId, seatId]
    );

    await client.query('COMMIT');
    return { success: true };

  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

// Key insight: BEGIN/COMMIT gives you atomicity and durability.
// It does NOT give you isolation against concurrent writes to the SAME row.
// For that, you need explicit locking — pessimistic or optimistic.
  </code></pre>

  <h3>2. Pessimistic Locking: SELECT FOR UPDATE</h3>
  <pre><code>
// Pessimistic Locking: "Assume conflicts WILL happen — lock the row immediately."
// ================================================================================
// Lock the seat row the moment you read it.
// Any other transaction trying to read (with lock) the same row WAITS.
// Your transaction finishes → releases lock → next transaction proceeds.
// Exactly one transaction wins at a time. Serialized at the database level.

class PessimisticBookingService {

  async bookSeat(userId, seatId, eventId) {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // SELECT FOR UPDATE — acquires an exclusive row-level lock
      // This is the key: no other transaction can SELECT FOR UPDATE this row
      // until this transaction commits or rolls back.
      //
      // Without FOR UPDATE: two transactions both read 'available', both proceed
      // With FOR UPDATE:    second transaction BLOCKS on this line until first commits
      const result = await client.query(
        SELECT id, status, event_id, seat_number
         FROM seats
         WHERE id = $1
         FOR UPDATE,           // ← This single clause prevents double booking
        [seatId]
      );

      if (result.rows.length === 0) {
        throw new Error('Seat does not exist');
      }

      const seat = result.rows[0];

      if (seat.status !== 'available') {
        // Another transaction already booked it — this is the correct failure path
        throw new Error('Seat already booked');
      }

      // Create booking record
      const booking = await client.query(
        INSERT INTO bookings (id, user_id, seat_id, event_id, status, created_at)
         VALUES ($1, $2, $3, $4, $5, NOW())
         RETURNING id,
        [uuidv4(), userId, seatId, eventId, 'confirmed']
      );

      // Mark seat as booked
      await client.query(
        UPDATE seats
         SET status = 'booked', user_id = $1, booking_id = $2, booked_at = NOW()
         WHERE id = $3,
        [userId, booking.rows[0].id, seatId]
      );

      await client.query('COMMIT');
      // Lock is released HERE. Next waiting transaction can now proceed.

      return {
        bookingId: booking.rows[0].id,
        seatId,
        status: 'confirmed'
      };

    } catch (error) {
      await client.query('ROLLBACK');
      // Lock is also released on ROLLBACK
      throw error;

    } finally {
      client.release();
    }
  }

  // SKIP LOCKED — for booking multiple seats, or processing a queue
  // ================================================================
  // NOWAIT: Fail immediately if row is locked (don't queue up waiting)
  // SKIP LOCKED: Skip locked rows, return next available unlocked row
  //
  // Use case: User wants "any available seat in section A"
  // Without SKIP LOCKED: all users queue up for seat 1, nobody tries seat 2
  // With SKIP LOCKED: users spread across all available seats simultaneously

  async bookAnyAvailableSeat(userId, eventId, section) {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // SKIP LOCKED: find first available seat not locked by anyone else
      // Multiple users run this simultaneously — each gets a DIFFERENT seat
      const result = await client.query(
        SELECT id, seat_number
         FROM seats
         WHERE event_id = $1
           AND section = $2
           AND status = 'available'
         ORDER BY seat_number
         LIMIT 1
         FOR UPDATE SKIP LOCKED,   // ← Skip any seat another transaction has locked
        [eventId, section]
      );

      if (result.rows.length === 0) {
        throw new Error('No seats available in this section');
      }

      const seat = result.rows[0];

      await client.query(
        UPDATE seats SET status = 'booked', user_id = $1 WHERE id = $2,
        [userId, seat.id]
      );

      await client.query('COMMIT');
      return { seatId: seat.id, seatNumber: seat.seat_number };

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}

// How SELECT FOR UPDATE works under the hood:
// ============================================
//
// Transaction A: BEGIN → SELECT FOR UPDATE seat 42 → LOCK ACQUIRED → (processing...)
// Transaction B: BEGIN → SELECT FOR UPDATE seat 42 → BLOCKS (waiting for lock)
// Transaction A: UPDATE seats → COMMIT → LOCK RELEASED
// Transaction B: (unblocked) → reads seat 42 → status = 'booked' → throws error → ROLLBACK
//
// Result: Exactly one booking. Second user gets a clean error. Zero double bookings.

// Pessimistic Locking — Pros and Cons:
// =====================================
// ✅ Guaranteed correctness — impossible to double-book
// ✅ Simple mental model — lock, do work, unlock
// ✅ Works perfectly for single-row operations
// ✅ Database handles all the complexity
// ❌ Lock contention under high load — all users for same seat queue up
// ❌ Deadlocks possible when multiple rows locked in different orders
// ❌ Long transactions hold locks longer — more blocking
// ❌ Doesn't scale horizontally without careful sharding

// Deadlock prevention:
// ====================
// If booking multiple seats, ALWAYS lock in a consistent order (e.g. by seat ID ascending).
// Transaction A locks seat 1, then seat 2.
// Transaction B locks seat 1, then seat 2.  (never: seat 2 then seat 1)
// Consistent ordering prevents circular waits → prevents deadlocks.

async bookMultipleSeats(userId, seatIds, eventId) {
  const sortedSeatIds = [...seatIds].sort();  // Always same order — prevents deadlock
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const placeholders = sortedSeatIds.map((_, i) => $$ {i + 1}).join(', ');
    const result = await client.query(
      SELECT id, status FROM seats WHERE id IN ($ {placeholders}) ORDER BY id FOR UPDATE,
      sortedSeatIds
    );

    const unavailable = result.rows.filter(s => s.status !== 'available');
    if (unavailable.length > 0) {
      throw new Error(Seats not available: $ {unavailable.map(s => s.id).join(', ')});
    }

    // All seats available and locked — proceed with booking
    for (const seat of result.rows) {
      await client.query(
        UPDATE seats SET status = 'booked', user_id = $1 WHERE id = $2,
        [userId, seat.id]
      );
    }

    await client.query('COMMIT');
    return { bookedSeats: sortedSeatIds };

  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
  </code></pre>

  <h3>3. Optimistic Locking: Compare-and-Swap</h3>
  <pre><code>
// Optimistic Locking: "Assume conflicts are RARE — don't lock, just detect and retry."
// =====================================================================================
// No upfront lock on the row.
// Read the row and record its current version.
// Do your work. At commit time, check: has the version changed since I read it?
// If yes: conflict — someone else modified it. Abort and retry.
// If no: safe to commit. Increment the version.
//
// Best for: Low-contention scenarios (browsing, wishlist, profile updates)
// Worst for: High-contention scenarios (Coldplay last 10 seats)

class OptimisticBookingService {

  async bookSeat(userId, seatId, eventId) {
    const maxRetries = 3;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const result = await this.attemptBooking(userId, seatId, eventId);
        return result;

      } catch (error) {
        if (error.type === 'VERSION_CONFLICT' && attempt < maxRetries - 1) {
          // Another user modified this row — wait a bit and retry
          await this.jitteredBackoff(attempt);
          continue;
        }
        throw error;
      }
    }
  }

  async attemptBooking(userId, seatId, eventId) {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // 1. Read seat WITHOUT locking — just record the version
      const result = await client.query(
        SELECT id, status, version FROM seats WHERE id = $1,
        [seatId]
      );

      const seat = result.rows[0];

      if (seat.status !== 'available') {
        throw new Error('Seat not available');
      }

      const readVersion = seat.version;  // Remember the version we saw

      // ... do business logic, validate payment, etc. ...
      // No lock held during this time — other transactions can read freely

      // 2. Update ONLY IF version hasn't changed since we read it
      // This is the Compare-and-Swap: "update where version = what I saw"
      const updateResult = await client.query(
        UPDATE seats
         SET status = 'booked',
             user_id = $1,
             version = version + 1    -- Increment version on every update
         WHERE id = $2
           AND version = $3           -- ← This is the optimistic lock check
           AND status = 'available',  // Double-check status too
        [userId, seatId, readVersion]
      );

      if (updateResult.rowCount === 0) {
        // rowCount = 0 means the WHERE clause failed:
        // version changed (another user booked/modified this seat) OR
        // status changed (seat was booked between our read and write)
        // This is our conflict detection.
        const error = new Error('Seat was modified — please retry');
        error.type = 'VERSION_CONFLICT';
        throw error;
      }

      await client.query('COMMIT');
      return { success: true, seatId };

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  jitteredBackoff(attempt) {
    // Jitter prevents all retrying users from hammering at exactly the same time
    // (Thundering herd problem on retries)
    const base = Math.min(100 * Math.pow(2, attempt), 1000);  // Exponential: 100ms, 200ms, 400ms...
    const jitter = Math.random() * base * 0.5;                // Add up to 50% random jitter
    return new Promise(resolve => setTimeout(resolve, base + jitter));
  }
}

// Schema: the 'version' column is the key
// =========================================
/*
CREATE TABLE seats (
  id          UUID PRIMARY KEY,
  event_id    UUID NOT NULL,
  seat_number VARCHAR(10),
  section     VARCHAR(50),
  status      VARCHAR(20) DEFAULT 'available',
  user_id     UUID,
  version     INTEGER DEFAULT 0,   -- ← Incremented on every update
  booked_at   TIMESTAMP
);
*/

// How optimistic locking fails under high contention:
// =====================================================
//
// 10,000 users simultaneously read seat 42 (version = 0, status = available)
// 10,000 users simultaneously try to UPDATE WHERE version = 0
// Exactly 1 succeeds (version becomes 1)
// 9,999 get rowCount = 0 → VERSION_CONFLICT → retry
// 9,999 retry: seat is now 'booked' → 'Seat not available' error
//
// This is CORRECT behavior — one booking. But those 9,999 retries hit the database again.
// Under extreme load (Coldplay scale), this creates a thundering herd on retries.
// This is why high-contention scenarios need pessimistic locking or queue serialization.

// When to use Optimistic vs Pessimistic:
// ========================================
//
// OPTIMISTIC:  Low conflict rate, short transactions, read-heavy
//              Examples: User profile updates, product reviews, wishlist items
//              Why: No lock overhead for the 99% of cases with no conflict
//
// PESSIMISTIC: High conflict rate, contended resources, correctness critical
//              Examples: Last few concert seats, hotel rooms, flight seats
//              Why: Fail fast with clear error, no expensive retry storms
//
// Rule of thumb: If multiple users are LIKELY to want the SAME specific row
//                simultaneously → pessimistic. Otherwise → optimistic.
  </code></pre>

  <h3>4. Seat Hold / Reservation System</h3>
  <pre><code>
// Real-world ticket systems (Ticketmaster, BookMyShow) don't lock forever.
// They use a TIME-BOUNDED HOLD: "seat is reserved for you for 10 minutes."
// If you don't complete payment in 10 minutes, seat is released back to pool.
// This prevents seats being locked indefinitely by users who abandon checkout.

class SeatHoldService {

  async holdSeat(userId, seatId, eventId) {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // Lock the row
      const result = await client.query(
        SELECT id, status, hold_expires_at
         FROM seats
         WHERE id = $1
         FOR UPDATE,
        [seatId]
      );

      const seat = result.rows[0];

      // Available if: status is 'available', OR status is 'held' but hold has expired
      const now = new Date();
      const isAvailable =
        seat.status === 'available' ||
        (seat.status === 'held' && seat.hold_expires_at < now);

      if (!isAvailable) {
        throw new Error(
          seat.status === 'held'
            ? Seat held by another user. Try again in $ {Math.ceil((seat.hold_expires_at - now) / 1000)}s
            : 'Seat already booked'
        );
      }

      const holdExpiresAt = new Date(now.getTime() + 10 * 60 * 1000);  // 10 minutes

      // Mark as held with expiry time
      await client.query(
        UPDATE seats
         SET status = 'held',
             hold_user_id = $1,
             hold_expires_at = $2,
             version = version + 1
         WHERE id = $3,
        [userId, holdExpiresAt, seatId]
      );

      await client.query('COMMIT');

      // Set Redis key for fast hold lookup (avoid DB query on every status check)
      await redis.setex(
        hold:$ {seatId},
        600,  // 10 minutes in seconds
        JSON.stringify({ userId, seatId, expiresAt: holdExpiresAt })
      );

      return {
        holdId: hold_$ {seatId}_$ {userId},
        seatId,
        expiresAt: holdExpiresAt,
        expiresInSeconds: 600
      };

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  // Step 2: Complete booking during the hold window
  async confirmBooking(userId, seatId, paymentId) {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const result = await client.query(
        SELECT id, status, hold_user_id, hold_expires_at
         FROM seats WHERE id = $1 FOR UPDATE,
        [seatId]
      );

      const seat = result.rows[0];
      const now = new Date();

      // Validate: must still be held by THIS user and not expired
      if (seat.status !== 'held') {
        throw new Error('Seat is no longer held');
      }
      if (seat.hold_user_id !== userId) {
        throw new Error('Seat is held by a different user');
      }
      if (seat.hold_expires_at < now) {
        throw new Error('Hold has expired — please restart booking');
      }

      // Confirm booking
      const bookingId = uuidv4();

      await client.query(
        UPDATE seats
         SET status = 'booked',
             user_id = $1,
             booking_id = $2,
             hold_user_id = NULL,
             hold_expires_at = NULL,
             booked_at = NOW()
         WHERE id = $3,
        [userId, bookingId, seatId]
      );

      await client.query(
        INSERT INTO bookings (id, user_id, seat_id, event_id, payment_id, status, created_at)
         SELECT $1, $2, $3, event_id, $4, 'confirmed', NOW()
         FROM seats WHERE id = $3,
        [bookingId, userId, seatId, paymentId]
      );

      await client.query('COMMIT');

      // Clean up Redis hold
      await redis.del(hold:$ {seatId});

      return { bookingId, status: 'confirmed' };

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  // Background job: release expired holds every 60 seconds
  async releaseExpiredHolds() {
    await db.query(
      UPDATE seats
       SET status = 'available',
           hold_user_id = NULL,
           hold_expires_at = NULL,
           version = version + 1
       WHERE status = 'held'
         AND hold_expires_at < NOW()
    );
    // Seats are now available again for other users to hold
  }
}

// State machine for a seat:
// ==========================
//
//  available → held (user starts checkout, 10 min timer starts)
//  held → booked (user completes payment within 10 min)
//  held → available (timer expires, seat released back to pool)
//  booked → available (refund/cancellation — rare)
//
// Only one valid transition at a time. SELECT FOR UPDATE enforces this.
  </code></pre>

  <h3>5. Queue-Based Serialization: One at a Time</h3>
  <pre><code>
// For extreme high-demand events (Taylor Swift, Coldplay), even pessimistic locking
// struggles — thousands of transactions queue up on the same row simultaneously,
// causing lock wait timeouts and connection pool exhaustion.
//
// Solution: Push ALL requests for a specific event into a queue.
// A single worker processes them one at a time.
// Serialization is enforced at the queue level, not the database level.
// Database sees sequential writes — zero contention, zero deadlocks.

// Architecture:
// =============
// User clicks "Buy" → POST /book → pushed to Redis queue → returns 202 with position
// Worker dequeues one request at a time → books in DB → publishes result
// User polls /booking/status/:id or receives WebSocket push when done

class QueueBasedBookingService {

  // API endpoint — fast, just enqueues
  async requestBooking(req, res) {
    const { userId, seatId, eventId } = req.body;
    const bookingRequestId = uuidv4();

    // Enqueue booking request
    await redis.rpush(
      booking-queue:$ {eventId},  // One queue per event
      JSON.stringify({
        bookingRequestId,
        userId,
        seatId,
        eventId,
        requestedAt: new Date().toISOString()
      })
    );

    // Return position in queue — users love seeing "Position 847 of 50,000"
    const queueLength = await redis.llen(booking-queue:$ {eventId});

    return res.status(202).json({
      bookingRequestId,
      status: 'queued',
      position: queueLength,
      estimatedWaitSeconds: queueLength * 0.5,  // ~500ms per booking
      pollUrl: /booking/status/$ {bookingRequestId}
    });
  }

  // Worker — single instance processes one at a time
  async startWorker(eventId) {
    console.log(Booking worker started for event: $ {eventId});

    while (true) {
      // BLPOP: blocking left-pop — waits for an item if queue is empty
      // Timeout of 0 = wait forever. This is the consumption loop.
      const item = await redis.blpop(booking-queue:$ {eventId}, 0);

      if (!item) continue;

      const request = JSON.parse(item[1]);

      try {
        // Process booking with a simple pessimistic lock
        // No thundering herd: only ONE request hits this code at a time
        const result = await this.processBooking(request);

        // Publish result so user's poll/WebSocket can pick it up
        await redis.setex(
          booking-result:$ {request.bookingRequestId},
          3600,  // 1 hour TTL
          JSON.stringify({ status: 'confirmed', ...result })
        );

      } catch (error) {
        await redis.setex(
          booking-result:$ {request.bookingRequestId},
          3600,
          JSON.stringify({ status: 'failed', reason: error.message })
        );
      }
    }
  }

  async processBooking(request) {
    const { userId, seatId, eventId, bookingRequestId } = request;
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // Idempotency: don't process same request twice
      const existing = await client.query(
        SELECT id FROM bookings WHERE idempotency_key = $1,
        [bookingRequestId]
      );
      if (existing.rows.length > 0) {
        return { bookingId: existing.rows[0].id };  // Already processed
      }

      const result = await client.query(
        SELECT status FROM seats WHERE id = $1 FOR UPDATE,
        [seatId]
      );

      if (result.rows[0].status !== 'available') {
        throw new Error('Seat not available');
      }

      const bookingId = uuidv4();

      await client.query(
        UPDATE seats SET status = 'booked', user_id = $1 WHERE id = $2,
        [userId, seatId]
      );

      await client.query(
        INSERT INTO bookings (id, user_id, seat_id, event_id, idempotency_key, status, created_at)
         VALUES ($1, $2, $3, $4, $5, 'confirmed', NOW()),
        [bookingId, userId, seatId, eventId, bookingRequestId]
      );

      await client.query('COMMIT');
      return { bookingId };

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  // User polls this to check if their queued request completed
  async getBookingStatus(req, res) {
    const { bookingRequestId } = req.params;

    const result = await redis.get(booking-result:$ {bookingRequestId});

    if (!result) {
      // Still in queue — return position
      const position = await this.getQueuePosition(bookingRequestId);
      return res.status(202).json({
        status: 'queued',
        position,
        message: position > 0 ? You are #$ {position} in line : 'Processing...'
      });
    }

    return res.json(JSON.parse(result));
  }
}

// Queue serialization — Pros and Cons:
// ========================================
// ✅ Zero database contention — worker is the only writer
// ✅ Natural backpressure — queue absorbs any traffic spike
// ✅ Queue position is great UX (Ticketmaster virtual waiting room)
// ✅ Easy to add priority (premium members jump queue)
// ✅ Replay on failure — request stays in queue until processed
// ❌ Higher latency — user waits for queue processing (seconds, not milliseconds)
// ❌ More infrastructure — Redis queue + worker process
// ❌ Worker is a single point of failure (mitigate with multiple workers + partitioning)
// ❌ More complex status tracking (polling vs. synchronous response)
  </code></pre>

  <h3>6. Why Eventual Consistency is WRONG Here</h3>
  <pre><code>
// Eventual consistency = "the system will become consistent... eventually."
// This is fine for many systems. It is CATASTROPHICALLY WRONG for ticket booking.
// ================================================================================
//
// Eventual consistency means:
// - Read and write to any node immediately
// - Nodes sync with each other asynchronously
// - For a brief window, different nodes have different views of the data
//
// Example of eventual consistency working fine:
// User A updates their profile bio. User B's feed shows old bio for 500ms.
// Then replication catches up. Both see new bio. No harm done.
//
// Example of eventual consistency for tickets (DISASTER):
// User A books seat 42 on Node 1. Node 1 accepts.
// User B books seat 42 on Node 2. Node 2 also accepts (hasn't received A's write yet).
// Replication runs. Conflict detected. System must pick a winner.
// Under "last write wins" (LWW): A's booking is silently deleted.
// A received a confirmation. A shows up. No seat. A sues the venue.

// Why "last write wins" CAN'T fix double booking:
// =================================================
class LastWriteWins {
  // In distributed databases like Cassandra, DynamoDB (without transactions):
  // Each write has a timestamp.
  // On conflict, the write with the LATER timestamp wins.
  // The EARLIER write is overwritten without error.
  // Both users received 'booking confirmed'. One booking is silently deleted.
  //
  // Cassandra: seat 42 → written at t=100 (User A) and t=101 (User B)
  // Cassandra resolves: User B wins (later timestamp)
  // User A has a confirmation email for a booking that no longer exists.
}

// Why "read your own writes" consistency isn't enough:
// ======================================================
// Even if each user can read their own writes:
// User A writes booking, reads it back → sees confirmed (correct)
// User B writes booking, reads it back → sees confirmed (correct)
// But BOTH EXIST. Seat is still double booked.
// Read-your-own-writes doesn't detect cross-user conflicts.

// Why you need STRONG (linearizable) consistency for booking:
// ============================================================
// Strong consistency: every read sees the most recent write.
// All nodes agree on the current state of every row.
// When User B tries to book seat 42, the system KNOWS User A already booked it.
// User B's booking fails. Zero double bookings.

// Systems that provide strong consistency for OLTP:
// ==================================================
// ✅ PostgreSQL, MySQL — single-node, ACID, serializable
// ✅ CockroachDB, YugabyteDB — distributed, but ACID with serializable isolation
// ✅ Google Spanner — global distributed, external consistency (even stronger than serializable)
// ❌ Cassandra — tunable, but "eventual" by default. No row-level transactions across partitions.
// ❌ DynamoDB — EVENTUALLY consistent reads by default. Strongly consistent reads available
//               but no cross-partition transactions (unless using Transactions API at cost)
// ❌ MongoDB (without transactions) — document-level atomicity only

// The CAP theorem and tickets:
// ============================
// CAP: In a distributed system, choose 2 of: Consistency, Availability, Partition Tolerance
// Network partitions WILL happen. So you choose: Consistency OR Availability.
//
// CP (Consistency + Partition Tolerance): System refuses to serve if it can't guarantee consistency.
//   → Correct for tickets. User gets an error during partition, not a wrong answer.
//
// AP (Availability + Partition Tolerance): System serves requests even during partition.
//   → Might show seat as available when it isn't. Double booking risk.
//
// For ticket booking: choose CP. It is BETTER to show "System temporarily unavailable"
// than to sell the same seat to two people.
// Users tolerate outages. Users do NOT tolerate showing up to a concert without a seat.

// The bottom line:
// ================
// Eventual consistency is a performance/availability optimization.
// It trades correctness for speed.
// Ticket booking cannot trade correctness. Choose strong consistency.
// Use PostgreSQL or a distributed SQL database. Not Cassandra. Not DynamoDB.
  </code></pre>

  <h3>7. Complete Booking System: Production Design</h3>
  <pre><code>
// Putting it all together: high-demand concert booking at scale
// =============================================================

const express = require('express');
const { Pool } = require('pg');

class TicketBookingSystem {
  constructor() {
    this.app = express();
    this.pool = new Pool({ connectionString: process.env.DATABASE_URL });
    this.redis = new Redis(process.env.REDIS_URL);

    this.setupMiddleware();
    this.setupRoutes();
  }

  setupMiddleware() {
    this.app.use(express.json());

    // Request ID for tracing across services
    this.app.use((req, res, next) => {
      req.id = req.headers['x-request-id'] || uuidv4();
      res.setHeader('X-Request-ID', req.id);
      next();
    });

    // Auth middleware
    this.app.use(authenticateUser);

    // Rate limiting — prevent one user hammering "Buy" button
    // Without this: a bot can send 10,000 requests and starve real users
    this.app.use('/api/book', async (req, res, next) => {
      const key = ratelimit:book:$ {req.user.id};
      const count = await this.redis.incr(key);
      if (count === 1) await this.redis.expire(key, 60);

      if (count > 5) {  // 5 booking attempts per minute per user
        return res.status(429).json({
          error: 'Too many booking attempts',
          retryAfter: await this.redis.ttl(key)
        });
      }
      next();
    });
  }

  setupRoutes() {
    // Get available seats — read-heavy, cacheable
    this.app.get('/api/events/:eventId/seats', this.getAvailableSeats.bind(this));

    // Hold a seat (Step 1 of 2-step booking)
    this.app.post('/api/events/:eventId/seats/:seatId/hold', this.holdSeat.bind(this));

    // Confirm booking (Step 2 — complete payment)
    this.app.post('/api/bookings/:holdId/confirm', this.confirmBooking.bind(this));

    // Release hold explicitly (user cancels checkout)
    this.app.delete('/api/bookings/:holdId', this.releaseHold.bind(this));

    // Get booking status
    this.app.get('/api/bookings/:bookingId', this.getBooking.bind(this));
  }

  async getAvailableSeats(req, res) {
    const { eventId } = req.params;

    // Cache seat availability in Redis — avoid DB query on every page load
    // Slightly stale (5 seconds) is fine for browsing. Exact count enforced at booking time.
    const cacheKey = available-seats:$ {eventId};
    const cached = await this.redis.get(cacheKey);

    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const result = await this.pool.query(
      SELECT id, seat_number, section, row, price, status
       FROM seats
       WHERE event_id = $1 AND status IN ('available', 'held')
       ORDER BY section, row, seat_number,
      [eventId]
    );

    const seats = result.rows.map(seat => ({
      ...seat,
      // Show 'held' seats as 'unavailable' to users — they might be released soon
      // but showing 'held' creates false hope and frustration
      displayStatus: seat.status === 'available' ? 'available' : 'unavailable'
    }));

    await this.redis.setex(cacheKey, 5, JSON.stringify(seats));  // 5s cache

    return res.json(seats);
  }

  async holdSeat(req, res) {
    const { eventId, seatId } = req.params;
    const { userId } = req.user;

    const client = await this.pool.connect();

    try {
      await client.query('BEGIN');

      // Pessimistic lock — correct choice for high-contention seat booking
      const result = await client.query(
        SELECT id, status, hold_expires_at, event_id
         FROM seats
         WHERE id = $1 AND event_id = $2
         FOR UPDATE NOWAIT,
        // NOWAIT: fail immediately if row is locked by another transaction
        // Without NOWAIT: users queue up and wait. With NOWAIT: immediate 409 response.
        // Users prefer "seat unavailable" immediately over waiting 5s for the same answer.
        [seatId, eventId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Seat not found' });
      }

      const seat = result.rows[0];
      const now = new Date();

      const isAvailable =
        seat.status === 'available' ||
        (seat.status === 'held' && seat.hold_expires_at < now);

      if (!isAvailable) {
        return res.status(409).json({
          error: 'Seat not available',
          status: seat.status,
          message: seat.status === 'held'
            ? Seat held until $ {seat.hold_expires_at.toISOString()}
            : 'Seat is already booked'
        });
      }

      const holdId = uuidv4();
      const holdExpiresAt = new Date(now.getTime() + 10 * 60 * 1000);  // 10 min

      await client.query(
        UPDATE seats
         SET status = 'held',
             hold_id = $1,
             hold_user_id = $2,
             hold_expires_at = $3,
             version = version + 1
         WHERE id = $4,
        [holdId, userId, holdExpiresAt, seatId]
      );

      await client.query('COMMIT');

      // Invalidate seat availability cache
      await this.redis.del(available-seats:$ {eventId});

      this.logger.info({
        action: 'seat_held',
        holdId,
        seatId,
        userId,
        eventId,
        expiresAt: holdExpiresAt
      });

      return res.status(200).json({
        holdId,
        seatId,
        expiresAt: holdExpiresAt,
        expiresInSeconds: 600,
        checkoutUrl: /checkout/$ {holdId}
      });

    } catch (error) {
      await client.query('ROLLBACK');

      // PostgreSQL error code 55P03 = lock_not_available (thrown by NOWAIT)
      if (error.code === '55P03') {
        return res.status(409).json({
          error: 'Seat is being processed',
          message: 'Someone else is booking this seat. Try another seat or retry in a moment.'
        });
      }

      this.logger.error({ action: 'hold_failed', seatId, userId, error: error.message });
      return res.status(500).json({ error: 'Booking failed', retryable: true });

    } finally {
      client.release();
    }
  }

  async confirmBooking(req, res) {
    const { holdId } = req.params;
    const { paymentMethodId } = req.body;
    const { userId } = req.user;

    const client = await this.pool.connect();

    try {
      await client.query('BEGIN');

      // Lock the seat row again for confirmation
      const result = await client.query(
        SELECT s.id, s.status, s.hold_id, s.hold_user_id, s.hold_expires_at,
                s.event_id, s.price
         FROM seats s
         WHERE s.hold_id = $1
         FOR UPDATE,
        [holdId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Hold not found or already confirmed' });
      }

      const seat = result.rows[0];
      const now = new Date();

      if (seat.hold_user_id !== userId) {
        return res.status(403).json({ error: 'This hold belongs to a different user' });
      }

      if (seat.hold_expires_at < now) {
        return res.status(410).json({
          error: 'Hold expired',
          message: 'Your seat hold has expired. Please start booking again.'
        });
      }

      // Process payment — charge BEFORE updating seat to 'booked'
      // If payment fails, seat hold remains active (user can retry payment)
      const charge = await this.paymentService.charge({
        userId,
        amount: seat.price,
        paymentMethodId,
        idempotencyKey: holdId   // Prevents double charging on payment retry
      });

      const bookingId = uuidv4();

      // Confirm booking
      await client.query(
        UPDATE seats
         SET status = 'booked',
             user_id = $1,
             booking_id = $2,
             hold_id = NULL,
             hold_user_id = NULL,
             hold_expires_at = NULL,
             booked_at = NOW()
         WHERE id = $3,
        [userId, bookingId, seat.id]
      );

      await client.query(
        INSERT INTO bookings
           (id, user_id, seat_id, event_id, payment_id, charge_id, amount, status, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, 'confirmed', NOW()),
        [bookingId, userId, seat.id, seat.event_id, charge.paymentId, charge.chargeId, seat.price]
      );

      await client.query('COMMIT');

      // Invalidate seat cache
      await this.redis.del(available-seats:$ {seat.event_id});

      // Send confirmation (async — don't block the response)
      setImmediate(() => {
        this.notificationService.sendBookingConfirmation(userId, bookingId);
      });

      return res.status(201).json({
        bookingId,
        status: 'confirmed',
        seatId: seat.id,
        amount: seat.price,
        chargeId: charge.chargeId
      });

    } catch (error) {
      await client.query('ROLLBACK');

      if (error.type === 'PaymentFailed') {
        return res.status(402).json({
          error: 'Payment failed',
          message: error.message,
          // Hold is still active — user can retry with different payment method
          holdExpiresAt: error.holdExpiresAt
        });
      }

      return res.status(500).json({ error: 'Booking failed', retryable: false });

    } finally {
      client.release();
    }
  }
}

// Schema for production:
// =======================
/*
CREATE TABLE seats (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id         UUID NOT NULL REFERENCES events(id),
  seat_number      VARCHAR(10) NOT NULL,
  section          VARCHAR(50) NOT NULL,
  row              VARCHAR(10),
  price            DECIMAL(10,2) NOT NULL,
  status           VARCHAR(20) NOT NULL DEFAULT 'available',
  version          INTEGER NOT NULL DEFAULT 0,    -- For optimistic locking
  user_id          UUID REFERENCES users(id),
  booking_id       UUID,
  hold_id          UUID UNIQUE,                   -- One hold per seat
  hold_user_id     UUID REFERENCES users(id),
  hold_expires_at  TIMESTAMP,
  booked_at        TIMESTAMP,
  CONSTRAINT valid_status CHECK (status IN ('available', 'held', 'booked', 'cancelled'))
);

CREATE INDEX idx_seats_event_status ON seats(event_id, status);
CREATE INDEX idx_seats_hold_expires ON seats(hold_expires_at) WHERE status = 'held';

CREATE TABLE bookings (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          UUID NOT NULL REFERENCES users(id),
  seat_id          UUID NOT NULL REFERENCES seats(id),
  event_id         UUID NOT NULL REFERENCES events(id),
  payment_id       UUID,
  charge_id        VARCHAR(100),
  amount           DECIMAL(10,2),
  idempotency_key  VARCHAR(100) UNIQUE,           -- Prevent duplicate bookings
  status           VARCHAR(20) NOT NULL DEFAULT 'confirmed',
  created_at       TIMESTAMP NOT NULL DEFAULT NOW()
);
*/
  </code></pre>

</div>
`,

            examples: [
              "SELECT FOR UPDATE — pessimistic lock on seat row prevents concurrent booking",
              "SELECT FOR UPDATE SKIP LOCKED — spread users across available seats simultaneously",
              "SELECT FOR UPDATE NOWAIT — fail immediately if locked, no wait queue",
              "Optimistic locking with version column — UPDATE WHERE version = $readVersion",
              "Compare-and-swap: rowCount = 0 means conflict detected, retry with jitter",
              "Seat hold with 10-minute TTL — time-bounded reservation before payment",
              "Background job releasing expired holds back to available pool",
              "Queue-based serialization — Redis RPUSH + BLPOP for single-writer per event",
              "Queue position UX — 'You are #847 in line' reduces perceived wait",
              "ACID transaction with atomicity — charge fails → seat not booked",
              "Rate limiting per user — prevent bot hammering buy button",
              "Idempotency key on booking — prevents duplicate charge on payment retry",
              "CAP theorem applied — CP over AP, consistency over availability for tickets",
              "Deadlock prevention — always lock multiple seats in sorted order by ID",
            ],

            questions: [
              {
                question:
                  "What is a race condition and how does it cause double booking?",
                difficulty: "Beginner",
                category: "Concurrency",
                answer:
                  "A race condition occurs when two concurrent operations read shared state, make a decision based on it, and then both write — each unaware the other was doing the same thing. For tickets: User A reads seat 42 → status = available. User B reads seat 42 → status = available. Both pass the availability check. User A writes → booked. User B writes → booked (overwrites A silently). Both get confirmation emails. This is called a TOCTOU bug — Time Of Check to Time Of Use. The check (is seat available?) and the use (mark it booked) are two separate operations with a gap between them. Any other transaction can change reality in that gap. The fix is making check-and-update a single atomic operation — either through database locking (SELECT FOR UPDATE) or through optimistic concurrency control (UPDATE WHERE version = $seen). A simple BEGIN/COMMIT transaction does NOT prevent this race condition — transactions give you atomicity and durability, but isolation against concurrent writes to the same row requires explicit locking.",
              },
              {
                question:
                  "What is pessimistic locking? How does SELECT FOR UPDATE work?",
                difficulty: "Intermediate",
                category: "Pessimistic Locking",
                answer:
                  "Pessimistic locking assumes conflicts will happen and prevents them upfront by locking the row the moment it's read. SELECT FOR UPDATE acquires an exclusive row-level lock in the database. Any other transaction that tries to SELECT FOR UPDATE the same row will BLOCK (wait) until the first transaction commits or rolls back, then re-read the row to see its new state. How it works: Transaction A executes SELECT FOR UPDATE seat 42 → lock acquired → reads status = available → updates to booked → COMMITs → lock released. Transaction B was blocking on SELECT FOR UPDATE since step 1 → now unblocks → reads seat 42 → status = booked → throws 'seat already booked' error → ROLLBACKs. Result: exactly one booking. Second user gets a clean error. Three variants: FOR UPDATE = block until lock available. FOR UPDATE NOWAIT = fail immediately with error if row locked (better UX — instant response vs. waiting). FOR UPDATE SKIP LOCKED = skip this row, try the next available one (best for 'any seat in section A' queries — multiple users spread across all available seats simultaneously instead of queuing for seat 1). Use pessimistic locking when conflict probability is HIGH, like the last few concert seats.",
              },
              {
                question:
                  "What is optimistic locking and when should you use it instead of pessimistic?",
                difficulty: "Intermediate",
                category: "Optimistic Locking",
                answer:
                  "Optimistic locking assumes conflicts are RARE and doesn't lock upfront. Instead it detects conflicts at write time using a version number. Schema: add a version INTEGER column (default 0) to the seats table. Flow: Read seat WITHOUT locking, record the version you saw. Do your work. At commit: UPDATE seats SET status='booked', version=version+1 WHERE id=$seatId AND version=$versionYouSaw AND status='available'. Check rowCount: if 0, conflict detected (version changed since you read it, meaning someone else modified the row). Abort and retry. If 1, you won — committed successfully. When to use optimistic: low conflict rate, short transactions, read-heavy workloads. Examples: user profile updates, product reviews, wishlist additions. When NOT to use for tickets: under high contention (Coldplay last 10 seats), 9,999 of 10,000 concurrent users will get VERSION_CONFLICT and retry. Those 9,999 retries all hit the database simultaneously — thundering herd. The retries find the seat already booked — no benefit over the first attempt. Rule: if multiple users are LIKELY to want the SAME specific row simultaneously → pessimistic. If conflicts are rare → optimistic. For tickets specifically: use optimistic for 'seat browsing' operations, pessimistic for the actual booking transaction.",
              },
              {
                question:
                  "What is a seat hold / reservation system and why do real ticket platforms use it?",
                difficulty: "Intermediate",
                category: "Seat Hold Pattern",
                answer:
                  "A seat hold is a time-bounded reservation — the seat is locked for you for 10 minutes while you complete checkout. If you don't confirm within that window, the seat is automatically released back to the pool. Real platforms (Ticketmaster, BookMyShow) use this for two reasons: 1) UX: Users need time to fill in payment details, review order, etc. Locking a database row for the full checkout duration (potentially minutes) while user types their credit card number is too long. 2) Abandoned carts: Without holds, seats would bounce between 'available' and 'booking in progress' causing confusion. With holds, users see a clear countdown timer. Implementation: seats table has status = 'held' + hold_expires_at timestamp + hold_user_id. Hold creation uses SELECT FOR UPDATE to atomically check availability and set the hold. Background job runs every 60 seconds: UPDATE seats SET status='available' WHERE status='held' AND hold_expires_at < NOW() — releases expired holds. Expired hold = someone abandoned checkout → seat back in pool. Seat state machine: available → held (checkout started) → booked (payment confirmed) OR available (hold expired). Only one valid owner at any time, enforced by SELECT FOR UPDATE at each transition.",
              },
              {
                question:
                  "What is queue-based serialization and when does it outperform database locking?",
                difficulty: "Advanced",
                category: "Queue Serialization",
                answer:
                  "Queue-based serialization pushes ALL booking requests for an event into a queue and processes them one at a time with a single worker. This enforces serialization at the queue level, not the database level. Database sees sequential writes with zero contention. Why it outperforms locking at extreme scale: with pessimistic locking and 10,000 simultaneous requests for the same seat, all 10,000 transactions queue up in the database waiting for the row lock. Database connection pool gets exhausted. Lock wait timeouts fire. PostgreSQL struggles with that many concurrent transactions. With queue serialization: all 10,000 requests are enqueued in Redis in milliseconds (Redis handles 100k+ ops/sec). API returns 202 Accepted with queue position immediately. Single worker processes one booking per ~500ms. No contention. No connection pool exhaustion. Database sees one write at a time. Implementation: Redis RPUSH to enqueue, BLPOP to dequeue. Worker processes one request atomically, publishes result to Redis key, user polls or receives WebSocket push. Tradeoffs vs. locking: Queue = higher latency (seconds not milliseconds), more infrastructure, async UX (queue position). Locking = lower latency, simpler code, synchronous response. Use queue serialization for Taylor Swift / Coldplay scale events with virtual waiting rooms. Use database locking for normal-demand events.",
              },
              {
                question:
                  "Why is eventual consistency wrong for ticket booking? What does the CAP theorem say here?",
                difficulty: "Advanced",
                category: "Eventual Consistency",
                answer:
                  "Eventual consistency means nodes sync asynchronously — for a brief window, different nodes have different views of the data. For most systems this is fine. For ticket booking it causes double booking that cannot be corrected. Scenario: User A books seat 42 on Node 1. Node 1 accepts immediately. User B books seat 42 on Node 2 (hasn't received A's write yet). Node 2 also accepts. Replication runs. Conflict detected. Under Last Write Wins (LWW — how Cassandra resolves conflicts): the booking with the LATER timestamp survives. The EARLIER booking is silently deleted. User A has a confirmation email for a booking that no longer exists. They show up. No seat. No fix possible. The seat is physically finite. CAP theorem: distributed systems can guarantee at most 2 of Consistency, Availability, Partition Tolerance. Partitions will happen. So choose C or A. CP (Consistency + Partition Tolerance): system refuses to serve requests if it cannot guarantee consistency. Users see 'service temporarily unavailable' during partition. AP (Availability + Partition Tolerance): system serves all requests even during partition, at the cost of possible inconsistency. For tickets: CP is correct. Users tolerate a temporary outage. Users do NOT tolerate showing up to a concert to find their seat occupied. Use: PostgreSQL, CockroachDB, YugabyteDB. Do NOT use: Cassandra, DynamoDB default mode, MongoDB without transactions.",
              },
              {
                question:
                  "How do you prevent deadlocks when booking multiple seats?",
                difficulty: "Advanced",
                category: "Deadlocks",
                answer:
                  "A deadlock occurs when Transaction A holds a lock on row 1 and waits for row 2, while Transaction B holds row 2 and waits for row 1. Neither can proceed. They wait forever (until timeout). For ticket booking: Transaction A books seats 1 and 3. Locks seat 1, now tries to lock seat 3. Transaction B books seats 3 and 1. Locks seat 3, now tries to lock seat 1. Deadlock. Prevention strategy: ALWAYS acquire locks in a consistent order. Sort seat IDs before locking. Transaction A and B both lock in order: seat 1 first, then seat 3. Now: A locks seat 1. B tries to lock seat 1 — BLOCKS. A locks seat 3. A commits, releases both locks. B acquires seat 1. B acquires seat 3. B commits. No deadlock — no circular wait. Code: const sortedSeatIds = [...seatIds].sort(); then SELECT FOR UPDATE WHERE id IN (...) ORDER BY id. The ORDER BY id ensures PostgreSQL acquires locks in the same order regardless of input order. Additional protection: set lock_timeout on the connection (SET lock_timeout = '5s'). If you wait more than 5 seconds for a lock, fail fast rather than waiting indefinitely. PostgreSQL also has deadlock detection that will automatically choose a victim transaction to abort — but relying on this means retries and slower UX. Prevention via sorted order is always better than detection.",
              },
              {
                question:
                  "How do you handle the high-demand sale scenario — 50,000 users hitting 'Buy' simultaneously?",
                difficulty: "Advanced",
                category: "High Demand",
                answer:
                  "This is the Coldplay / Taylor Swift problem. Multiple layers needed: 1) VIRTUAL WAITING ROOM: Before sale opens, users enter a queue. At sale time, users are released in random batches (not FIFO — prevents people who refreshed at 10:00:00.001 from having advantage). Ticketmaster does this. Reduces 50,000 simultaneous requests to manageable batches. 2) RATE LIMITING: 5 booking attempts per user per minute. Prevents bots hammering the endpoint. Legitimate users don't need to send 1000 requests per second. 3) REDIS QUEUE SERIALIZATION: All booking requests queued. Workers process sequentially. Database sees no contention. Queue position displayed to users — reduces abandonment ('You are #847, estimated 7 minutes'). 4) SEAT DISTRIBUTION: Instead of all 50,000 users fighting for the same 200 seats, show different seat maps to different users (based on queue position or randomization). Reduces contention per seat. 5) READ CACHE: Seat availability shown from Redis cache (5s TTL) not live DB. Browsing does not hit database. Only the actual hold/book operation hits DB with SELECT FOR UPDATE. 6) CONNECTION POOLING: PgBouncer in transaction mode in front of PostgreSQL. Prevents connection pool exhaustion. 7) DATABASE HARDWARE: This is the time to scale up the primary. More IOPS, more RAM for shared buffers. Vertical scale for the DB, horizontal scale for API servers.",
              },
              {
                question:
                  "What's the difference between a BEGIN/COMMIT transaction and SELECT FOR UPDATE?",
                difficulty: "Intermediate",
                category: "Database Transactions",
                answer:
                  "This is a common confusion. They solve different problems. BEGIN/COMMIT gives you ATOMICITY and DURABILITY. It means: all my SQL statements succeed together, or none of them do. If I INSERT a booking and UPDATE a seat status, and the server crashes between them, the whole thing rolls back. No partial state. But BEGIN/COMMIT alone does NOT prevent two transactions from reading the same row, both seeing 'available', and both writing 'booked'. Each transaction is atomic individually — atomicity doesn't mean exclusivity with OTHER transactions. SELECT FOR UPDATE gives you ISOLATION for specific rows. It says: I am reading this row AND preventing anyone else from modifying it until I'm done. Two transactions running SELECT FOR UPDATE on the same row will execute serially, not concurrently. The second one waits until the first commits, then re-reads the row's new state. You need BOTH: BEGIN/COMMIT wraps the entire operation (atomicity) so partial states can't persist. SELECT FOR UPDATE on the seat row ensures only one transaction can check-and-update at a time (isolation). Without BEGIN/COMMIT: each statement is its own mini-transaction. A crash between SELECT FOR UPDATE and UPDATE could leave the row locked indefinitely. Without SELECT FOR UPDATE: both transactions pass the availability check before either writes.",
              },
              {
                question:
                  "How do you design the seat status to support cancellations and refunds?",
                difficulty: "Intermediate",
                category: "System Design",
                answer:
                  "The seat state machine needs to support the full lifecycle. States: available → held (checkout started, 10 min timer) → booked (payment confirmed) → cancelled (user/admin cancelled). And: booked → refund_pending (refund requested) → available (refund processed, seat back in pool) OR booked → partially_refunded (group booking, some seats cancelled). Implementation: Each transition is a SELECT FOR UPDATE + UPDATE in a transaction. Cancellation flow: SELECT FOR UPDATE the seat. Verify it's booked and belongs to this user. Call payment service to initiate refund (idempotent — same booking ID = same refund). UPDATE seats SET status = 'available', user_id = NULL, booking_id = NULL. INSERT INTO cancellations with reason, timestamp, refund_amount. COMMIT. Key considerations: 1) Don't immediately mark available until refund is confirmed — use 'refund_pending' state. 2) Seat released only after payment processor confirms refund. 3) Keep audit trail — never DELETE bookings, set status = 'cancelled'. 4) Idempotency on refund — if refund service called twice, same refund amount returned once. 5) Time window for cancellation — many venues allow cancellation up to 24 hours before event. Enforce this in the service layer before even attempting the refund.",
              },
              {
                question:
                  "How does the optimistic locking retry with jitter prevent a thundering herd?",
                difficulty: "Advanced",
                category: "Optimistic Locking",
                answer:
                  "A thundering herd occurs when multiple clients all fail simultaneously and all retry at exactly the same time — causing another simultaneous conflict, which causes another simultaneous retry, in a cycle. Example without jitter: 1000 transactions fail at t=0ms. All retry at t=100ms (fixed backoff). 999 fail again at t=100ms. All retry at t=200ms. The spike repeats every 100ms. The database never gets relief. With exponential backoff: retry delays are 100ms, 200ms, 400ms. Spreads retries over time. Better, but if 1000 clients all started at the same time, they still retry in synchronized waves. With jitter: base = 100ms * 2^attempt. jitter = random(0, base * 0.5). actual_delay = base + jitter. Each client picks a slightly different delay. 1000 clients that all failed at t=0ms now retry at t=100ms to t=150ms — spread across 50ms instead of all at once. The database sees a steady trickle instead of a spike. Full-jitter algorithm (AWS recommendation): delay = random(0, base). Even more spread. The key insight: the goal of backoff is not just to wait, but to DESYNCHRONIZE the retries. Without jitter you get correlated failures. With jitter you get uncorrelated independent retries that the database can handle smoothly.",
              },
              {
                question:
                  "How would you monitor this system in production? What are the critical metrics?",
                difficulty: "Advanced",
                category: "Observability",
                answer:
                  "Critical metrics for a ticket booking system: 1) BOOKING SUCCESS RATE: bookings_confirmed / booking_attempts. Alert if < 95% during a sale. Drop indicates seat contention overwhelming the system. 2) LOCK WAIT TIME: How long transactions spend waiting for SELECT FOR UPDATE to acquire. Alert if p99 > 1s. High wait = too many concurrent bookings for same seats, or long-running transactions holding locks. 3) DEADLOCK COUNT: PostgreSQL logs deadlocks. Alert on any deadlock — means lock ordering is wrong in code. 4) SEAT HOLD EXPIRY RATE: Holds expiring / holds created. High rate = users abandoning checkout. Might mean checkout UX is too slow, or hold window too short. 5) DOUBLE BOOKING ATTEMPTS: Log every case where a transaction's SELECT FOR UPDATE finds a seat already booked. This is CORRECT behavior (not an error), but high rate indicates hot seats under heavy contention. 6) DB CONNECTION POOL UTILIZATION: Alert if > 80% utilized. Near 100% = new requests fail immediately. Add PgBouncer or scale DB. 7) QUEUE DEPTH (if using queue serialization): Alert if growing faster than workers drain. 8) P99 BOOKING LATENCY: Alert if > 3 seconds for synchronous booking. 9) Expired hold cleanup lag: Time between hold_expires_at and when cron job releases it. Should be < 2 minutes. Delayed release = false scarcity. 10) Revenue metrics: tickets sold per minute during sale — sudden drop indicates system issue before error rate metrics even fire.",
              },
            ],

            links: [
              "https://www.postgresql.org/docs/current/explicit-locking.html - PostgreSQL explicit locking: FOR UPDATE, FOR SHARE, NOWAIT, SKIP LOCKED",
              "https://www.postgresql.org/docs/current/transaction-iso.html - PostgreSQL transaction isolation levels explained",
              "https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html - Martin Kleppmann on distributed locking pitfalls",
              "https://aws.amazon.com/builders-library/avoiding-fallback-in-distributed-systems/ - AWS Builder's Library: consistency vs. availability tradeoffs",
              "https://redis.io/docs/manual/patterns/distributed-locks/ - Redis Redlock algorithm for distributed locking",
              "https://www.2ndquadrant.com/en/blog/select-skip-locked-postgresql-9-5/ - SELECT FOR UPDATE SKIP LOCKED in PostgreSQL",
              "https://martinfowler.com/articles/patterns-of-distributed-systems/two-phase-locking.html - Two-phase locking pattern",
              "https://use-the-index-luke.com/sql/select-for-update - Use The Index, Luke: SELECT FOR UPDATE performance",
              "https://en.wikipedia.org/wiki/CAP_theorem - CAP theorem: consistency vs. availability under partition",
              "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/transactions.html - DynamoDB Transactions for when you must use DynamoDB",
              "https://www.cockroachlabs.com/blog/serializable-lockless-distributed-isolation-cockroachdb/ - Serializable isolation in distributed databases",
              "https://engineering.ticketmaster.com/ - Ticketmaster Engineering Blog: real-world scale ticket systems",
            ],
          },
          {
            topic: "News Feed System Design: Facebook / Twitter Scale",
            tags: [
              "Fan-out on Write",
              "Fan-in on Read",
              "Hybrid Fan-out",
              "News Feed",
              "Timeline",
              "Push vs Pull",
              "Feed Aggregation",
              "Feed Ranking",
              "Redis Sorted Sets",
              "Pre-computation",
              "Caching",
              "Celebrity Problem",
              "User Graph",
              "Denormalization",
              "CDN",
              "Eventual Consistency",
              "Distributed Systems",
              "Sharding",
              "Hot Keys",
            ],

            explanation: `
<div>
  <h2>News Feed System Design: Facebook / Twitter Scale</h2>
  <p>
    A news feed is deceptively simple on the surface: "show me posts from people I follow."
    But at scale — millions of users, each following hundreds of accounts, each account posting
    dozens of times per day — naive approaches collapse immediately. This guide covers the two
    core strategies (fan-out on write vs. fan-in on read), why neither works alone, the hybrid
    approach used by Facebook and Twitter, feed ranking, caching architecture, and the 
    "celebrity problem" that breaks all of the above.
  </p>

  <h3>The Problem: Naive Approaches and Why They Fail</h3>
  <pre><code>
// Scenario: User opens Twitter. They follow 500 people. Show them the last 20 posts.
// =====================================================================================

// Naive Approach 1: Query on every read (Fan-in on Read, pure pull)
// ------------------------------------------------------------------
// Every time user opens their feed, run a big query:

async function getFeedNaive(userId) {
  // Step 1: Get all the people this user follows
  const following = await db.query(
    SELECT followed_id FROM follows WHERE follower_id = $1,
    [userId]
  );
  // Returns 500 user IDs

  // Step 2: Get recent posts from all of them
  const posts = await db.query(
    SELECT * FROM posts
     WHERE user_id = ANY($1)
     ORDER BY created_at DESC
     LIMIT 20,
    [following.map(f => f.followed_id)]
  );

  return posts;
}

// Why this destroys the database at scale:
// =========================================
// 1. QUERY COST: User follows 500 people. Posts table has 50 billion rows.
//    PostgreSQL must scan the index for 500 user_ids and merge-sort the results.
//    This takes 2-5 seconds per request. At 10,000 requests/second → database on fire.
//
// 2. NO CACHING: Every user has a unique set of follows. You can't cache
//    "posts from user A's follows" for user B — they follow different people.
//    Cache hit rate near 0%. Every request is a fresh DB query.
//
// 3. HOT USERS: If Elon Musk posts, 100 million users' feeds need to include it.
//    100 million queries, each scanning Elon's post index. The index itself becomes
//    a hotspot — thousands of readers hammering the same B-tree pages simultaneously.
//
// 4. THUNDERING HERD: When a celebrity posts, all their followers open the app
//    simultaneously. 50 million concurrent queries at the exact same time.

// Naive Approach 2: Precompute everything synchronously on write
// --------------------------------------------------------------
async function createPostNaive(authorId, content) {
  // Save the post
  const post = await db.posts.create({ authorId, content });

  // Get all followers of this author
  const followers = await db.query(
    SELECT follower_id FROM follows WHERE followed_id = $1,
    [authorId]
  );
  // If author has 50 million followers (Elon Musk), this returns 50 million rows

  // Write post to every follower's feed synchronously
  for (const follower of followers) {
    await db.feeds.insert({
      userId: follower.follower_id,
      postId: post.id,
      score: calculateScore(post)
    });
  }
  // Writing 50 million rows synchronously. POST /tweet takes 8 hours to return.
}

// The core tension:
// =================
// READS are fast (precomputed) but WRITES are catastrophically slow for celebrities.
// WRITES are fast (just save the post) but READS are catastrophically slow for active users.
// The solution: HYBRID — split by user type. Celebrity? Pull on read. Normal user? Push on write.

// What we need:
// =============
// 1. Sub-100ms feed load for active users
// 2. Writes that return in milliseconds (not hours)
// 3. Handle celebrities with 50M followers without special-casing everywhere
// 4. Ranked feed (not just chronological)
// 5. Eventual consistency acceptable — slight staleness is fine (not ticket booking)
  </code></pre>

  <h3>1. Data Model: User Graph + Posts</h3>
  <pre><code>
// The feed blends two very different data types:
// ================================================
// 1. USER GRAPH (relational): who follows whom — structured, queryable, consistent
// 2. POSTS (semi-structured): content, media, reactions — high volume, flexible schema

// Relational: User graph in PostgreSQL
// ======================================
/*
CREATE TABLE users (
  id          UUID PRIMARY KEY,
  username    VARCHAR(50) UNIQUE NOT NULL,
  follower_count  INTEGER DEFAULT 0,   -- Denormalized counter (no COUNT(*) on every read)
  following_count INTEGER DEFAULT 0,
  is_celebrity    BOOLEAN DEFAULT FALSE,  -- Follower count > 1M: use pull-on-read strategy
  created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE follows (
  follower_id  UUID NOT NULL REFERENCES users(id),
  followed_id  UUID NOT NULL REFERENCES users(id),
  created_at   TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (follower_id, followed_id)           -- Composite PK prevents duplicate follows
);

-- Two indexes: "who does user A follow" AND "who follows user A"
CREATE INDEX idx_follows_follower ON follows(follower_id);  -- Fan-in: get my followees
CREATE INDEX idx_follows_followed ON follows(followed_id);  -- Fan-out: get my followers
*/

// Non-relational: Posts in Cassandra or DynamoDB
// ================================================
// Posts are write-heavy, time-ordered, and never need cross-post joins.
// Cassandra is purpose-built for this: fast writes, time-range queries by partition.
/*
CREATE TABLE posts (
  post_id     UUID,
  author_id   UUID,
  content     TEXT,
  media_urls  LIST<TEXT>,
  like_count  COUNTER,
  reply_count COUNTER,
  repost_count COUNTER,
  created_at  TIMESTAMP,
  PRIMARY KEY (author_id, created_at, post_id)   -- Partition by author, cluster by time
) WITH CLUSTERING ORDER BY (created_at DESC);
-- Query: "get last 50 posts by author_id=X" is O(1) — perfect partition alignment
*/

// Feed store: Redis Sorted Sets
// ==============================
// Each user has a sorted set of post IDs, sorted by score (timestamp or rank).
// Redis ZREVRANGE returns top N posts in O(log N + N) — microseconds.
/*
Key:    feed:{userId}
Type:   Sorted Set
Member: {postId}
Score:  Unix timestamp (or computed rank score)
TTL:    7 days (feeds for inactive users expire automatically)

Operations:
  ZADD feed:{userId} {score} {postId}      -- Add post to feed
  ZREVRANGE feed:{userId} 0 19             -- Get top 20 posts (newest first)
  ZCARD feed:{userId}                      -- Feed length
  ZREMRANGEBYRANK feed:{userId} 0 -501     -- Trim feed to max 500 posts
*/

// Why Redis Sorted Sets for feeds?
// ==================================
// ✅ O(log N) insert — fast fan-out writes
// ✅ O(log N + K) range query — fast feed reads
// ✅ Score = sort key — change ranking without re-sorting
// ✅ TTL per key — inactive user feeds expire automatically, saving memory
// ✅ Atomic ZADD — concurrent writes safe without explicit locking
// ✅ ZREVRANGE — returns in ranked order directly, no post-processing

// Key insight: Redis stores post IDs (not post content)
// After getting IDs from Redis, fetch post content from cache/DB in a single batch.
// Separation of concerns: Redis = ordered list of IDs. Content store = actual post data.
  </code></pre>

  <h3>2. Fan-out on Write: Push Model</h3>
  <pre><code>
// Fan-out on Write: When a user posts, immediately push the post ID into
// every follower's feed in Redis. Reads are instant — just query Redis.
// =====================================================================

class FanOutOnWriteService {

  async createPost(authorId, content, mediaUrls = []) {
    // Step 1: Save post to Cassandra (durable storage)
    const postId = uuidv4();
    const now = new Date();

    await cassandra.execute(
      INSERT INTO posts (post_id, author_id, content, media_urls, created_at)
       VALUES (?, ?, ?, ?, ?),
      [postId, authorId, content, mediaUrls, now]
    );

    // Step 2: Return to client IMMEDIATELY — don't wait for fan-out
    // Fan-out is async. User gets instant response. Feed updates propagate in background.
    // This is where eventual consistency is ACCEPTABLE (unlike ticket booking).
    // Followers see the post within seconds, not milliseconds. Fine.

    // Step 3: Publish to fan-out queue (async)
    await queue.publish('post.created', {
      postId,
      authorId,
      createdAt: now.toISOString(),
      score: now.getTime()   // Unix timestamp as initial score
    });

    return { postId, status: 'created' };
  }

  // Fan-out worker — runs asynchronously after post creation
  async processFanOut(event) {
    const { postId, authorId, score } = event;

    // Get all followers of this author
    // For normal users (<1M followers), this is fast
    const followers = await this.getFollowers(authorId);

    // Write post ID into each follower's Redis feed
    // Use pipeline for batch efficiency — 1 round-trip to Redis for N writes
    const pipeline = redis.pipeline();

    for (const followerId of followers) {
      pipeline.zadd(
        feed:$ {followerId},
        score,        // Sort key (timestamp or rank score)
        postId        // Post ID stored as member
      );

      // Keep feeds bounded — remove oldest posts beyond 500 entries
      // Prevents Redis memory from growing unboundedly
      pipeline.zremrangebyrank(feed:$ {followerId}, 0, -501);
    }

    await pipeline.exec();
    // Single round-trip to Redis regardless of follower count
    // Redis processes pipeline atomically (no other commands interleaved)
  }

  // Get followers from PostgreSQL with pagination
  // For large follower lists, process in batches to avoid loading 1M IDs into memory
  async getFollowers(authorId, batchSize = 1000) {
    const followers = [];
    let offset = 0;

    while (true) {
      const result = await db.query(
        SELECT follower_id FROM follows
         WHERE followed_id = $1
         ORDER BY follower_id       -- Consistent pagination
         LIMIT $2 OFFSET $3,
        [authorId, batchSize, offset]
      );

      if (result.rows.length === 0) break;

      followers.push(...result.rows.map(r => r.follower_id));
      offset += batchSize;

      if (result.rows.length < batchSize) break;   // Last page
    }

    return followers;
  }
}

// Fan-out on Write — Pros and Cons:
// ===================================
// ✅ O(1) feed read — just ZREVRANGE on Redis. Microseconds.
// ✅ Works regardless of how many people user follows
// ✅ Feed is pre-sorted and pre-ranked
// ✅ Read path is simple — no complex aggregation at query time
// ❌ Write amplification — 1 post by user with 1M followers = 1M Redis writes
// ❌ Memory cost — storing feed for every user × 500 posts per user
// ❌ Wasted work — inactive users' feeds are updated but never read
// ❌ Celebrity problem — Elon posts, 100M Redis writes enqueued, followers wait
  </code></pre>

  <h3>3. Fan-in on Read: Pull Model</h3>
  <pre><code>
// Fan-in on Read: Don't precompute anything. When user requests their feed,
// pull recent posts from all their followees and merge in real-time.
// ========================================================================

class FanInOnReadService {

  async getFeed(userId, limit = 20) {
    // Step 1: Get the IDs of everyone this user follows
    const following = await db.query(
      SELECT followed_id FROM follows WHERE follower_id = $1,
      [userId]
    );
    const followedIds = following.rows.map(r => r.followed_id);

    if (followedIds.length === 0) {
      return [];  // New user with no follows
    }

    // Step 2: Fetch recent post IDs from each followee's post list in Cassandra
    // Each author's posts are partitioned by author_id — fast per-author queries
    const postPromises = followedIds.map(authorId =>
      cassandra.execute(
        SELECT post_id, created_at FROM posts
         WHERE author_id = ?
         ORDER BY created_at DESC
         LIMIT 100,    // Fetch 100 per author — more than we need, for merge headroom
        [authorId]
      )
    );

    const allResults = await Promise.all(postPromises);
    // If user follows 500 people: 500 parallel Cassandra queries

    // Step 3: Merge all results and sort by time (k-way merge)
    const allPosts = allResults
      .flatMap(result => result.rows)
      .sort((a, b) => b.created_at - a.created_at);   // Newest first

    // Step 4: Take top N
    const topPostIds = allPosts.slice(0, limit).map(p => p.post_id);

    // Step 5: Batch-fetch full post content
    return await this.fetchPostContent(topPostIds);
  }

  async fetchPostContent(postIds) {
    // Check Redis cache first for each post
    const pipeline = redis.pipeline();
    postIds.forEach(id => pipeline.get(post:$ {id}));
    const cached = await pipeline.exec();

    const results = [];
    const missedIds = [];

    cached.forEach(([err, value], i) => {
      if (value) {
        results[i] = JSON.parse(value);
      } else {
        missedIds.push({ index: i, id: postIds[i] });
      }
    });

    // Fetch cache misses from Cassandra
    if (missedIds.length > 0) {
      const dbResults = await cassandra.execute(
        SELECT * FROM posts WHERE post_id IN ?,
        [missedIds.map(m => m.id)]
      );

      const dbMap = new Map(dbResults.rows.map(p => [p.post_id, p]));

      // Fill results and populate cache
      const cachePipeline = redis.pipeline();
      for (const { index, id } of missedIds) {
        const post = dbMap.get(id);
        results[index] = post;
        cachePipeline.setex(post:$ {id}, 3600, JSON.stringify(post));  // 1hr TTL
      }
      await cachePipeline.exec();
    }

    return results.filter(Boolean);
  }
}

// Fan-in on Read — Pros and Cons:
// ==================================
// ✅ Write is trivially cheap — just save the post to Cassandra
// ✅ No write amplification — no fan-out, no wasted work for inactive users
// ✅ Always fresh — reads the latest posts at query time
// ✅ Storage efficient — posts stored once, not N times per follower
// ❌ Read is slow — 500 parallel Cassandra queries, merge-sort 50,000 results
// ❌ Latency proportional to following count — power users (follow 5000) get very slow feeds
// ❌ Hard to cache — each user's merged feed is unique
// ❌ Cassandra fan-out — 500 queries × peak traffic = millions of Cassandra reads/second
// ❌ Doesn't support ranking well — must fetch and score thousands of posts at read time
  </code></pre>

  <h3>4. Hybrid Fan-out: The Real Solution</h3>
  <pre><code>
// Neither pure push nor pure pull works. Real systems (Twitter, Facebook, Instagram)
// use a HYBRID: fan-out on write for normal users, fan-in on read for celebrities.
// ==================================================================================
//
// NORMAL USERS (< 1M followers): Fan-out on write
//   Post → push to all followers' Redis feeds asynchronously
//   Why: 1M Redis writes is manageable. Feed reads are instant.
//
// CELEBRITIES (> 1M followers): Fan-in on read
//   Post → just save to Cassandra
//   Why: 100M Redis writes for one Elon tweet is not manageable.
//   At read time: inject celebrity posts into the feed on the fly.
//
// The threshold (1M) is tunable. Twitter uses a similar split. Facebook uses ML
// to decide per-edge (not per-author) whether to push or pull.

class HybridFeedService {

  // ---- WRITE PATH ----

  async createPost(authorId, content, mediaUrls = []) {
    const postId = uuidv4();
    const now = new Date();
    const score = now.getTime();

    // 1. Persist post (always — both normal and celebrity)
    await cassandra.execute(
      INSERT INTO posts (post_id, author_id, content, media_urls, created_at, score)
       VALUES (?, ?, ?, ?, ?, ?),
      [postId, authorId, content, mediaUrls, now, score]
    );

    // 2. Cache post content (hot cache — first readers hit this)
    await redis.setex(post:$ {postId}, 86400, JSON.stringify({
      postId, authorId, content, mediaUrls,
      createdAt: now, score,
      likeCount: 0, replyCount: 0, repostCount: 0
    }));

    // 3. Fan-out decision
    const author = await this.getUser(authorId);

    if (author.is_celebrity) {
      // Celebrity: NO fan-out. Post is just stored in Cassandra.
      // Followers will pull it at read time.
      // Just invalidate any cached "celebrity post lists" if they exist.
      await redis.del(celebrity-posts:$ {authorId});

    } else {
      // Normal user: async fan-out to all followers' feeds
      await queue.publish('post.fanout', { postId, authorId, score });
    }

    return { postId };
  }

  // ---- FAN-OUT WORKER (for normal users) ----

  async processFanOut(event) {
    const { postId, authorId, score } = event;

    // Process in batches to avoid memory issues with large-ish follower lists
    const batchSize = 1000;
    let cursor = 0;

    while (true) {
      const followers = await db.query(
        SELECT follower_id FROM follows
         WHERE followed_id = $1
         ORDER BY follower_id
         LIMIT $2 OFFSET $3,
        [authorId, batchSize, cursor]
      );

      if (followers.rows.length === 0) break;

      // Batch write to Redis
      const pipeline = redis.pipeline();
      for (const { follower_id } of followers.rows) {
        pipeline.zadd(feed:$ {follower_id}, score, postId);
        pipeline.zremrangebyrank(feed:$ {follower_id}, 0, -501);  // Keep top 500
      }
      await pipeline.exec();

      cursor += batchSize;
      if (followers.rows.length < batchSize) break;
    }
  }

  // ---- READ PATH ----

  async getFeed(userId, limit = 20) {
    // Step 1: Get pre-built feed from Redis (fan-out on write results)
    const postIds = await redis.zrevrange(feed:$ {userId}, 0, limit + 50 - 1);
    // Fetch extra (limit + 50) because we'll merge with celebrity posts and then trim

    // Step 2: Fetch celebrity posts (fan-in on read, only for celebrities)
    const celebrities = await this.getCelebrityFollowees(userId);
    const celebrityPostIds = await this.fetchCelebrityPosts(celebrities, limit);
    // This is cheap: user typically follows 5-20 celebrities, each with cached recent posts

    // Step 3: Merge feed post IDs + celebrity post IDs, deduplicate, re-sort
    const allPostIds = [...new Set([...postIds, ...celebrityPostIds])];

    // Get scores (timestamps) for merged set and re-sort
    const withScores = await this.getScoresForPosts(allPostIds);
    const sorted = withScores.sort((a, b) => b.score - a.score).slice(0, limit);

    // Step 4: Fetch post content in batch (Redis cache → Cassandra fallback)
    const posts = await this.fetchPostContent(sorted.map(p => p.postId));

    // Step 5: Rank posts (chronological → ranked)
    return this.rankPosts(posts, userId);
  }

  async getCelebrityFollowees(userId) {
    // Get celebrities that this user follows
    // Cached in Redis with moderate TTL — follow relationships change infrequently
    const cacheKey = celebrity-follows:$ {userId};
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const result = await db.query(
      SELECT f.followed_id
       FROM follows f
       JOIN users u ON f.followed_id = u.id
       WHERE f.follower_id = $1 AND u.is_celebrity = TRUE,
      [userId]
    );

    const celebrities = result.rows.map(r => r.followed_id);
    await redis.setex(cacheKey, 300, JSON.stringify(celebrities));  // 5 min cache
    return celebrities;
  }

  async fetchCelebrityPosts(celebrityIds, limit) {
    if (celebrityIds.length === 0) return [];

    // Get recent post IDs for each celebrity
    // These are cached in Redis (celebrities post to many readers — great cache ROI)
    const results = await Promise.all(
      celebrityIds.map(async (celebId) => {
        const cacheKey = celebrity-posts:$ {celebId};
        const cached = await redis.zrevrange(cacheKey, 0, 49);  // Top 50 recent posts

        if (cached.length > 0) return cached;

        // Cache miss: fetch from Cassandra and populate cache
        const posts = await cassandra.execute(
          SELECT post_id, created_at FROM posts
           WHERE author_id = ?
           ORDER BY created_at DESC
           LIMIT 50,
          [celebId]
        );

        // Cache celebrity post list as its own sorted set
        const pipeline = redis.pipeline();
        for (const post of posts.rows) {
          pipeline.zadd(cacheKey, post.created_at.getTime(), post.post_id);
        }
        pipeline.expire(cacheKey, 300);  // 5 min TTL
        await pipeline.exec();

        return posts.rows.map(p => p.post_id);
      })
    );

    return results.flat();
  }
}

// Hybrid approach — how Twitter actually works (simplified):
// ===========================================================
// 1. You post a tweet.
// 2. If you have < 1M followers: tweet pushed into all followers' feed caches.
// 3. If you have ≥ 1M followers (celebrity): tweet NOT pushed. Just stored.
// 4. When follower loads their feed:
//    - Read their pre-built cache (fan-out results from normal users)
//    - Pull recent tweets from any celebrity they follow (fan-in)
//    - Merge + sort + rank
//    - Return
//
// This gives you:
// - Sub-millisecond reads for most content (pre-built feed cache)
// - Manageable write cost (no fan-out to 100M people)
// - Fresh celebrity content (pulled at read time)
  </code></pre>

  <h3>5. Feed Ranking: Beyond Chronological</h3>
  <pre><code>
// Chronological feeds are dead at scale. 
// User follows 500 accounts. 500 posts in the last hour. They'll scroll for 20 minutes
// to see the 3 posts they actually care about. Ranking is essential.
//
// Ranking = assign a score to each post, show highest scores first.
// Score = f(recency, engagement, relationship_strength, content_quality, ...)

class FeedRankingService {

  rankPosts(posts, userId) {
    const userContext = this.getUserContext(userId);
    // userContext: who they interact with most, content preferences, online hours

    return posts
      .map(post => ({
        ...post,
        rankScore: this.calculateRankScore(post, userContext)
      }))
      .sort((a, b) => b.rankScore - a.rankScore);
  }

  calculateRankScore(post, userContext) {
    const now = Date.now();

    // 1. RECENCY DECAY
    // Older posts get lower scores — exponential decay
    // Half-life of 6 hours: post from 6h ago has half the recency score of a fresh post
    const ageHours = (now - post.createdAt) / (1000 * 60 * 60);
    const recencyScore = Math.exp(-0.115 * ageHours);  // e^(-ageHours/6) ≈ 0.5 at 6h
    // At 0h:  score = 1.0
    // At 6h:  score = 0.5
    // At 24h: score = 0.06
    // At 48h: score = 0.004  (basically invisible)

    // 2. ENGAGEMENT SCORE
    // Likes, reposts, replies — proxy for content quality
    // Log scale: difference between 0 and 10 likes matters more than 1000 vs 1010
    const engagementScore =
      Math.log1p(post.likeCount) * 1.0 +
      Math.log1p(post.repostCount) * 2.0 +   // Reposts weighted higher (stronger signal)
      Math.log1p(post.replyCount) * 1.5;
    // log1p(0)=0, log1p(9)=2.3, log1p(99)=4.6, log1p(999)=6.9
    // Diminishing returns — viral post doesn't completely dominate feed

    // 3. RELATIONSHIP STRENGTH
    // Do you interact with this author often? Reply? Like their posts?
    // Strong relationship = higher weight for this author's content
    const relationshipScore = userContext.interactionHistory[post.authorId] || 0;
    // 0 = never interacted, 1.0 = interact heavily
    // Stored in Redis: ZINCRBY user-interactions:{userId} 1 {authorId}

    // 4. CONTENT TYPE AFFINITY
    // Does this user engage more with videos? Text? Photos?
    // Learn from their click/like history
    const contentTypeScore = userContext.contentPreferences[post.contentType] || 0.5;

    // 5. FRESHNESS BOOST for unseen posts
    // Posts user hasn't seen yet get a small boost
    // Prevents "I've already read this" fatigue
    const seenBoost = post.seen ? 0 : 0.1;

    // Final score: weighted combination
    // Weights tuned by ML or A/B testing in production
    const score =
      recencyScore * 3.0 +
      engagementScore * 1.5 +
      relationshipScore * 2.0 +
      contentTypeScore * 1.0 +
      seenBoost;

    return score;
  }

  // Where rank scores come from in practice:
  // ==========================================
  // OFFLINE: Train ML model on historical engagement data.
  //          Features: author-follower relationship, post age, content features.
  //          Output: click-through probability (0.0 to 1.0).
  //          Re-train daily. Deploy as scoring service.
  //
  // ONLINE: At feed generation time, call scoring service with post features.
  //         Scoring service returns score in <10ms (model is in memory).
  //         Sort posts by score. Return to user.
  //
  // HYBRID: Pre-compute "base score" at write time (recency + initial engagement).
  //         Update score as engagement accumulates (async background updates).
  //         At read time: fetch pre-computed scores from Redis, re-rank with
  //         user-specific context (relationship strength, preferences).

  // Storing and updating scores in Redis:
  // ========================================

  async updatePostScore(postId, authorId) {
    // Called when a post gets a like, reply, or repost
    const post = await this.getPost(postId);

    // Recalculate engagement component of score
    const engagementScore =
      Math.log1p(post.likeCount) * 1.0 +
      Math.log1p(post.repostCount) * 2.0 +
      Math.log1p(post.replyCount) * 1.5;

    const recencyScore = Math.exp(-0.115 * post.ageHours);
    const newScore = recencyScore * 3.0 + engagementScore * 1.5;

    // Update score in all follower feeds
    // This is expensive for celebrities — only update for users online now
    const onlineFollowers = await this.getOnlineFollowers(authorId);

    const pipeline = redis.pipeline();
    for (const followerId of onlineFollowers) {
      pipeline.zadd(feed:$ {followerId}, newScore, postId);
      // ZADD on existing member updates the score — no duplicate, just re-sorted
    }
    await pipeline.exec();
  }

  // Track user interactions for relationship scoring
  async recordInteraction(userId, authorId, interactionType) {
    const weights = { like: 1, reply: 3, repost: 2, profile_visit: 0.5 };
    const weight = weights[interactionType] || 1;

    // Increment interaction score for this author
    await redis.zincrby(user-interactions:$ {userId}, weight, authorId);
    await redis.expire(user-interactions:$ {userId}, 30 * 24 * 3600);  // 30 days

    // Redis sorted set: members = authorIds, scores = interaction weights
    // ZREVRANGE user-interactions:{userId} 0 49 = top 50 authors user interacts with
  }
}

// Feed ranking in production:
// ============================
// Twitter (X): Uses ML models that consider 3200+ signals per post.
//              Primary signals: author relationship (do you reply to them?),
//              post engagement velocity, content similarity to liked posts.
// Facebook:    EdgeRank (original) → Neural ranking (current).
//              "Edge" = any connection event (post, like, comment).
//              Score = affinity × weight × recency decay.
// Instagram:   Interest score (predicted probability you'd like this post),
//              relationship score (how often you interact with author),
//              recency score.
// All of them: Serve chronological as fallback / user preference option.
  </code></pre>

  <h3>6. Caching Architecture</h3>
  <pre><code>
// Three levels of caching for a feed system:
// ============================================
// L1: Application-level (in-process) cache — nanoseconds
// L2: Redis — microseconds
// L3: Database (Cassandra/PostgreSQL) — milliseconds

class FeedCacheService {

  // LAYER 1: Feed cache (pre-built feed per user)
  // ==============================================================
  // Key:   feed:{userId}
  // Type:  Redis Sorted Set (score = rank score, member = postId)
  // TTL:   7 days (inactive users' feeds expire and are rebuilt on next visit)
  // Size:  Max 500 entries per user (trim with ZREMRANGEBYRANK)

  async getFeedPostIds(userId, offset = 0, limit = 20) {
    const postIds = await redis.zrevrange(
      feed:$ {userId},
      offset,
      offset + limit - 1
    );

    if (postIds.length > 0) {
      return postIds;  // Cache hit — microseconds
    }

    // Cache miss: rebuild feed from scratch (cold start)
    return await this.rebuildFeed(userId, limit);
  }

  async rebuildFeed(userId, limit) {
    // Feed cache expired or user is new — rebuild it
    // This is expensive — do it lazily (only when user actually requests their feed)
    // Not proactively (don't pre-warm feeds for inactive users)

    const following = await db.query(
      SELECT followed_id, u.is_celebrity
       FROM follows f
       JOIN users u ON f.followed_id = u.id
       WHERE f.follower_id = $1,
      [userId]
    );

    const normalUsers = following.rows.filter(f => !f.is_celebrity).map(f => f.followed_id);
    const celebrities = following.rows.filter(f => f.is_celebrity).map(f => f.followed_id);

    // Fetch recent posts from all normal followees
    const normalPosts = await cassandra.execute(
      SELECT post_id, created_at FROM posts
       WHERE author_id IN ?
       ORDER BY created_at DESC
       LIMIT 500,
      [normalUsers]
    );

    // Fetch recent celebrity posts
    const celebPosts = await this.fetchCelebrityPosts(celebrities, 50);

    // Merge and sort
    const allPosts = [...normalPosts.rows, ...celebPosts]
      .sort((a, b) => b.created_at - a.created_at)
      .slice(0, 500);

    // Populate Redis feed cache
    if (allPosts.length > 0) {
      const pipeline = redis.pipeline();
      for (const post of allPosts) {
        pipeline.zadd(feed:$ {userId}, post.created_at.getTime(), post.post_id);
      }
      pipeline.expire(feed:$ {userId}, 7 * 24 * 3600);  // 7 days
      await pipeline.exec();
    }

    return allPosts.slice(0, 20).map(p => p.post_id);
  }

  // LAYER 2: Post content cache
  // ==============================================================
  // Key:   post:{postId}
  // Type:  Redis String (JSON)
  // TTL:   1 hour for regular posts, 24 hours for viral posts
  // Why:   After getting IDs from feed cache, batch-fetch content in one go

  async getPostContent(postIds) {
    if (postIds.length === 0) return [];

    // Batch GET all post IDs in one pipeline
    const pipeline = redis.pipeline();
    postIds.forEach(id => pipeline.get(post:$ {id}));
    const results = await pipeline.exec();

    const posts = [];
    const missIds = [];

    results.forEach(([err, val], i) => {
      if (val) {
        posts[i] = JSON.parse(val);
      } else {
        missIds.push({ i, id: postIds[i] });
      }
    });

    // Batch-fetch misses from Cassandra
    if (missIds.length > 0) {
      const dbPosts = await cassandra.execute(
        SELECT * FROM posts WHERE post_id IN ?,
        [missIds.map(m => m.id)]
      );

      const dbMap = new Map(dbPosts.rows.map(p => [p.post_id, p]));
      const cachePipeline = redis.pipeline();

      for (const { i, id } of missIds) {
        const post = dbMap.get(id);
        if (post) {
          posts[i] = post;
          cachePipeline.setex(post:$ {id}, 3600, JSON.stringify(post));
        }
      }
      await cachePipeline.exec();
    }

    return posts.filter(Boolean);
  }

  // LAYER 3: User profile cache
  // ==============================================================
  // Key:   user:{userId}
  // Type:  Redis Hash
  // TTL:   1 hour
  // Why:   Every post display needs author name, avatar — don't hit users table per post

  async getUserProfiles(userIds) {
    const uniqueIds = [...new Set(userIds)];
    const pipeline = redis.pipeline();
    uniqueIds.forEach(id => pipeline.hgetall(user:$ {id}));
    const results = await pipeline.exec();

    const profileMap = new Map();
    const missIds = [];

    results.forEach(([err, profile], i) => {
      if (profile && Object.keys(profile).length > 0) {
        profileMap.set(uniqueIds[i], profile);
      } else {
        missIds.push(uniqueIds[i]);
      }
    });

    // Fetch misses from PostgreSQL
    if (missIds.length > 0) {
      const dbUsers = await db.query(
        SELECT id, username, display_name, avatar_url, is_verified
         FROM users WHERE id = ANY($1),
        [missIds]
      );

      const cachePipeline = redis.pipeline();
      for (const user of dbUsers.rows) {
        profileMap.set(user.id, user);
        cachePipeline.hmset(user:$ {user.id}, user);
        cachePipeline.expire(user:$ {user.id}, 3600);
      }
      await cachePipeline.exec();
    }

    return profileMap;
  }

  // Cache invalidation — when to evict:
  // =====================================
  // Feed cache:    When user follows/unfollows someone (stale feed entries)
  //               → Delete feed:{userId}, rebuild on next load
  // Post cache:    When post is deleted or edited
  //               → redis.del(post:$ {postId})
  // User cache:    When user updates profile (name, avatar)
  //               → redis.del(user:$ {userId})
  // Count caches:  Like/repost counts update frequently — use HINCRBY on Redis hash
  //               → Don't invalidate, increment atomically
}

// Memory sizing:
// ==============
// 500 posts per user × 8 bytes (postId as UUID) = 4KB per user feed
// 100 million active users × 4KB = 400GB of feed data in Redis
// Real systems use Redis Cluster with 8-16 shards: 25-50GB per shard → manageable
// Plus post content cache: 1KB per post × 10M hot posts = 10GB
// Total Redis cluster: ~500GB for a Twitter-scale feed system
  </code></pre>

  <h3>7. The Celebrity Problem & Hot Keys</h3>
  <pre><code>
// The celebrity problem is the hardest operational challenge in feed systems.
// Beyoncé posts. 300 million followers. What happens?
// =====================================================================================

// WRITE SIDE — Fan-out explosion:
// ---------------------------------
// If we fan-out: 300M Redis ZADDs enqueued in seconds.
// Even at 100K writes/second: takes 3000 seconds (50 minutes) to complete.
// Followers don't see the post for nearly an hour. Unacceptable.
// Solution: Don't fan-out for celebrities. Pull at read time. (See hybrid model above.)

// READ SIDE — Hot key problem:
// -----------------------------
// Beyoncé's post goes viral. Her post_id is "abc123".
// Every Redis read for any of her 300M followers includes GET post:abc123.
// Suddenly 1 Redis shard is getting 10M requests/second for one key.
// A single Redis shard handles ~100K ops/second → that shard is dead.
// This is the HOT KEY problem.

class CelebrityHotKeyService {

  // Solution 1: Key-based sharding for hot posts
  // ==============================================
  // Replicate the hot post across multiple Redis keys
  // Each request reads a random replica → load spread across shards

  async getHotPost(postId, isHotPost = false) {
    if (!isHotPost) {
      return await redis.get(post:$ {postId});
    }

    // Read from one of 10 replicas — each on a different shard
    const replicaIndex = Math.floor(Math.random() * 10);
    const value = await redis.get(post:$ {postId}:replica:$ {replicaIndex});

    if (value) return JSON.parse(value);

    // Cache miss on replica — fetch from primary and populate all replicas
    const post = await cassandra.execute(
      SELECT * FROM posts WHERE post_id = ?, [postId]
    );

    const pipeline = redis.pipeline();
    for (let i = 0; i < 10; i++) {
      pipeline.setex(post:$ {postId}:replica:$ {i}, 3600, JSON.stringify(post.rows[0]));
    }
    await pipeline.exec();

    return post.rows[0];
  }

  // Solution 2: Local in-process cache (L1 cache)
  // ===============================================
  // Cache the 1000 hottest posts IN APPLICATION MEMORY
  // Zero network round-trip — nanoseconds. No Redis pressure.

  constructor() {
    // LRU cache: evicts least recently used when full
    this.localCache = new LRUCache({
      max: 1000,              // 1000 posts in memory
      ttl: 30 * 1000,         // 30 second TTL (short — keep fresh)
    });
  }

  async getPostWithLocalCache(postId) {
    // L1: Application memory (nanoseconds)
    const local = this.localCache.get(postId);
    if (local) return local;

    // L2: Redis (microseconds)
    const cached = await redis.get(post:$ {postId});
    if (cached) {
      const post = JSON.parse(cached);
      this.localCache.set(postId, post);  // Promote to L1
      return post;
    }

    // L3: Cassandra (milliseconds)
    const result = await cassandra.execute(
      SELECT * FROM posts WHERE post_id = ?, [postId]
    );
    const post = result.rows[0];

    // Populate both caches
    await redis.setex(post:$ {postId}, 3600, JSON.stringify(post));
    this.localCache.set(postId, post);

    return post;
  }

  // Solution 3: CDN for media (images, videos in posts)
  // =====================================================
  // Post TEXT is small (280 chars). But celebrity posts have images/videos.
  // If 300M users load Beyoncé's video simultaneously → your S3 is incinerated.
  // CDN handles this: video cached at 400+ edge nodes globally.
  // Each edge serves from cache. S3 sees minimal traffic.

  getMediaUrl(mediaKey, isCelebrity) {
    if (isCelebrity) {
      // Route through CDN — cached at edge
      return https://cdn.example.com/media/$ {mediaKey};
    }
    // Normal user: direct S3 presigned URL (not worth CDN overhead)
    return https://s3.amazonaws.com/media/$ {mediaKey};
  }

  // Detecting hot keys proactively:
  // =================================
  // Monitor Redis key hit rates. If any key > 10K hits/second → hot key.
  // Automatically replicate it across shards.
  // This is what Cloudflare and Twitter do in production.

  async detectAndHandleHotKeys() {
    // Redis 4.0+ has OBJECT FREQ command (with LFU eviction policy)
    // Get most frequently accessed keys
    const hotKeys = await this.getTopAccessedKeys(100);  // Top 100 hottest keys

    for (const { key, accessRate } of hotKeys) {
      if (accessRate > 10000) {  // > 10K/s = hot key
        await this.replicateKey(key, 10);  // Create 10 replicas
        this.hotKeyRegistry.add(key);
      }
    }
  }
}

// The celebrity problem summary:
// ================================
// WRITE: Don't fan-out celebrity posts. Store once. Pull at read time.
// READ: Replicate hot post keys across Redis shards. Use local L1 cache.
// MEDIA: CDN for images/videos. Edge caches handle the thundering herd.
// COUNTS: Like/repost counts increment with Redis HINCRBY (atomic, no hotkey write)
//         Periodically flush to Cassandra. Accept slight staleness on counts (OK).
  </code></pre>

  <h3>8. Complete Feed System: Read Path End-to-End</h3>
  <pre><code>
// Full read path: User opens app → sees ranked, fresh feed in < 100ms
// ====================================================================

class FeedController {

  async getFeed(req, res) {
    const { userId } = req.user;
    const { cursor, limit = 20 } = req.query;
    // Cursor-based pagination: cursor = last seen postId (not page number)
    // Why cursor not page: page 2 changes as new posts arrive. Cursor is stable.

    try {
      const startTime = Date.now();

      // STEP 1: Get post IDs from pre-built feed cache (~1ms)
      const cachedPostIds = await this.getFeedPostIds(userId, cursor, limit + 20);
      // Fetch extra 20 for merging with celebrity posts

      // STEP 2: Get celebrity followees (cached) and their recent posts (~2ms)
      const celebrities = await this.getCelebrityFollowees(userId);
      const celebPostIds = await this.fetchCelebrityPosts(celebrities, 20);

      // STEP 3: Merge + deduplicate + sort by score (~1ms, in memory)
      const allPostIds = this.mergeAndDeduplicate(cachedPostIds, celebPostIds);
      const topPostIds = allPostIds.slice(0, limit + 5);  // Extra 5 for post-rank filtering

      // STEP 4: Batch-fetch post content from Redis cache (~2ms)
      const posts = await this.getPostContent(topPostIds);

      // STEP 5: Batch-fetch author profiles from Redis cache (~2ms)
      const authorIds = [...new Set(posts.map(p => p.authorId))];
      const profiles = await this.getUserProfiles(authorIds);

      // STEP 6: Enrich posts with author info + engagement counts
      const enrichedPosts = posts.map(post => ({
        ...post,
        author: profiles.get(post.authorId),
      }));

      // STEP 7: Rank posts (recency × engagement × relationship)
      const rankedPosts = this.rankPosts(enrichedPosts, userId);
      const finalPosts = rankedPosts.slice(0, limit);

      // STEP 8: Mark posts as seen (async — don't block response)
      setImmediate(() => {
        this.markPostsSeen(userId, finalPosts.map(p => p.postId));
      });

      // STEP 9: Cursor for next page
      const nextCursor = finalPosts.length > 0
        ? finalPosts[finalPosts.length - 1].postId
        : null;

      const duration = Date.now() - startTime;
      this.metrics.histogram('feed.read.duration', duration);

      return res.json({
        posts: finalPosts,
        nextCursor,
        hasMore: nextCursor !== null
      });

    } catch (error) {
      this.logger.error({ userId, error: error.message });
      return res.status(500).json({ error: 'Feed temporarily unavailable' });
    }
  }

  mergeAndDeduplicate(feedPostIds, celebPostIds) {
    // Merge two sorted lists (by score) efficiently
    const seen = new Set(feedPostIds);
    const newCelebPosts = celebPostIds.filter(id => !seen.has(id));

    // Interleave celebrity posts with normal feed
    // Don't just append — celebrity posts could be more recent
    const allIds = [...feedPostIds, ...newCelebPosts];

    // Fetch scores from Redis for proper sorting
    // In practice: scores stored alongside IDs in the sorted set
    return allIds;  // Will be re-scored in ranking step
  }
}

// Performance budget for < 100ms feed:
// =======================================
// Redis feed cache read:    ~1ms
// Celebrity post fetch:     ~2ms (cached sorted sets)
// Post content batch fetch: ~2ms (Redis pipeline, ~20 posts)
// User profile batch fetch: ~1ms (Redis pipeline, ~10 unique authors)
// Ranking computation:      ~1ms (in-memory math)
// Network + serialization:  ~5ms
// Total:                    ~12ms typical, < 50ms p99
//
// Cache miss (cold start):
// Rebuild feed from Cassandra: ~200ms (acceptable — rare event)
// Then subsequent reads: ~12ms
  </code></pre>

</div>
`,

            examples: [
              "Naive fan-in query — SELECT posts WHERE user_id IN (500 IDs) — why it destroys DB at scale",
              "Fan-out on write — async ZADD to Redis sorted set for every follower on post creation",
              "SELECT FOR UPDATE SKIP LOCKED — pipeline batch writes to Redis for 1000 followers at a time",
              "Hybrid fan-out — is_celebrity flag: normal users push, celebrities pull at read time",
              "Celebrity post cache — Redis sorted set per celebrity, 5 min TTL, fallback to Cassandra",
              "Feed rank score — recency decay (e^-0.115t) × engagement (log1p) × relationship strength",
              "Interaction tracking — ZINCRBY user-interactions:{userId} weight {authorId}",
              "L1/L2/L3 cache hierarchy — LRU in-process → Redis → Cassandra",
              "Hot key replication — 10 Redis replicas per viral post, random replica on read",
              "Cursor-based pagination — stable across new post arrivals, unlike offset-based",
              "Feed TTL — 7 days, inactive user feeds expire and rebuild lazily on next visit",
              "Celebrity follow graph cached — celebrity-follows:{userId} 5 min TTL, avoids JOIN on every read",
              "Engagement score update — ZADD with new score on existing member re-sorts the sorted set",
            ],

            questions: [
              {
                question:
                  "What is fan-out and what are the two core strategies for building a news feed?",
                difficulty: "Beginner",
                category: "Feed Architecture",
                answer:
                  "Fan-out is the act of distributing one piece of content (a post) to many recipients (followers). There are two opposite strategies. FAN-OUT ON WRITE (push model): When a user posts, immediately write the post ID into every follower's pre-built feed cache. Reads are instant — just query the cache. Writes are expensive because one post triggers N cache writes (N = follower count). FAN-IN ON READ (pull model): When a user requests their feed, pull recent posts from all N followees and merge them in real-time. Writes are trivially cheap — just save the post. Reads are expensive because every feed load triggers N queries, one per followee. The tradeoff: push = fast reads, slow writes. Pull = fast writes, slow reads. Pure push breaks for celebrities (100M writes per post). Pure pull breaks for power users (1000 parallel queries per feed load). Real systems (Twitter, Facebook, Instagram) use a HYBRID: push to normal user feeds, pull for celebrity content at read time. The dividing line is typically ~1M followers.",
              },
              {
                question:
                  "Why does a pure fan-in (pull) approach fail at scale?",
                difficulty: "Intermediate",
                category: "Fan-in on Read",
                answer:
                  "Three compounding problems. 1) QUERY COST: User follows 500 people. Each feed load requires fetching recent posts from all 500 followees and merge-sorting the results. In Cassandra, this is 500 parallel queries per feed request. At 10,000 concurrent users: 5 million Cassandra queries per second just for feed loads. Cassandra handles ~100K queries/second per node. You'd need 50 nodes just for feed reads. 2) LATENCY PROPORTIONAL TO FOLLOWING COUNT: A user following 5000 people (power user, journalist) has 10x worse latency than someone following 50. Latency becomes unpredictable and uncontrollable. 3) RANKING IS EXPENSIVE: Chronological merge of 500 people's posts is already slow. Ranking those posts by engagement + relationship requires fetching engagement counts and relationship scores for thousands of posts at query time. This adds another 10-50ms per feed load. 4) NO CACHE LEVERAGE: Every user's merged feed is unique (different set of followees). Cache hit rate near zero. Every request is a fresh computation. Compare this to fan-out on write: feed is pre-built, pre-sorted, pre-cached — reading it is a single Redis ZREVRANGE taking microseconds.",
              },
              {
                question:
                  "Explain the celebrity problem and how a hybrid fan-out solves it.",
                difficulty: "Intermediate",
                category: "Celebrity Problem",
                answer:
                  "The celebrity problem: a user with 100 million followers posts. Fan-out on write would trigger 100 million Redis ZADDs. At 100K writes/second, this takes 1000 seconds (16 minutes). Followers don't see the post for 16 minutes. Worse: if Beyoncé and Taylor Swift both post simultaneously, the fan-out queue gets millions of writes backed up, delaying normal users' posts too. The hybrid solution splits users into two categories by follower count (typically 1M threshold). NORMAL USERS: Fan-out on write. 1 post → N follower Redis ZADDs asynchronously. For a user with 10K followers: 10K writes, done in milliseconds. CELEBRITIES: No fan-out. Post is just saved to Cassandra. At READ time, the feed service checks which celebrities the requesting user follows, fetches their recent posts from a celebrity-specific Redis cache (shared across all followers), and injects them into the feed. This celebrity post cache is highly cacheable — millions of followers all need the same celebrity's recent posts. Cache hit rate approaches 100% for active celebrities. The key insight: for celebrities, the READ cost is amortized across all followers through shared caching. The WRITE cost would be multiplied across all followers, making it prohibitive.",
              },
              {
                question:
                  "How does Redis sorted set work for feed storage? Why not a list or hashset?",
                difficulty: "Intermediate",
                category: "Data Structures",
                answer:
                  "Redis Sorted Set (ZSET) stores members with associated float scores, always sorted by score. For feeds: member = postId, score = timestamp or rank score. Key operations: ZADD feed:{userId} {score} {postId} — insert or update post in O(log N). ZREVRANGE feed:{userId} 0 19 — get top 20 posts by score in O(log N + 20). ZREMRANGEBYRANK feed:{userId} 0 -501 — trim to last 500 posts in O(log N + removed). Why not a LIST: List gives you order by insertion time, not by score. You can't re-sort a list without rebuilding it. When a viral post gets 10K likes and its rank score increases, you'd need to remove and re-insert — you don't know where it is in the list. ZADD to an existing member just updates the score and Redis re-positions it automatically in O(log N). Why not a HASH: Hashes store key-value pairs with no ordering. You'd have to fetch all entries and sort in application code on every read. Why not a SET: Sets have no order and no score. The sorted set is purpose-built for ranked/time-ordered data. Feed length bounded by ZREMRANGEBYRANK keeps each user's feed at most 500 entries (~4KB), so 100M active users requires ~400GB of Redis feed data (manageable with a Redis cluster).",
              },
              {
                question:
                  "How do you rank feed posts? What signals matter and how do you compute them?",
                difficulty: "Advanced",
                category: "Feed Ranking",
                answer:
                  "Feed ranking assigns a score to each post. Score = weighted combination of signals. Core signals: 1) RECENCY DECAY: score = e^(-λ × ageHours). Half-life of ~6 hours for Twitter-style feeds, ~24 hours for Facebook. Ensures old posts don't permanently occupy top of feed. 2) ENGAGEMENT: log1p(likes) + 2×log1p(reposts) + 1.5×log1p(replies). Log scale because difference between 0 and 10 likes matters more than 1000 vs 1010. Reposts weighted highest — strongest signal of quality. 3) RELATIONSHIP STRENGTH: How often does this user interact with this author? Track with Redis ZINCRBY user-interactions:{userId} {weight} {authorId} on every like/reply. Score 0 = never interacted, 1.0 = heavy interaction. 4) CONTENT AFFINITY: User engages more with videos? Learn from click history. Boost video posts for that user. In production: train an ML model offline with features (post age, author relationship score, content type, historical engagement velocity) and labels (did user click/like this post?). Model outputs a click probability. Re-train daily. Deploy as a lightweight scoring service called at read time. At read time: fetch pre-computed base scores from Redis, apply user-specific context (relationship, preferences), re-rank, return top N. Pre-computation covers the expensive parts; personalization happens in the last step.",
              },
              {
                question:
                  "What is the hot key problem and how do you solve it in a Redis-based feed?",
                difficulty: "Advanced",
                category: "Hot Keys",
                answer:
                  "A hot key is a Redis key receiving so many requests that the single Redis shard hosting it becomes saturated. Example: Beyoncé posts a viral photo. Her post ID is in every one of her 300M followers' feeds. Every time any of those followers loads their feed, their app fetches GET post:{beyoncePostId} from Redis. At peak, this is 10M requests/second for one key. A single Redis shard handles ~100K commands/second — that shard dies. Solutions: 1) KEY REPLICATION: Write the hot post to 10 copies: post:{postId}:replica:0 through :9, each on different shards. Reads pick a random replica. Load spread 10x. 2) LOCAL IN-PROCESS CACHE (L1): Cache the 1000 most-accessed posts in application server memory (LRU cache, 30s TTL). Zero Redis round-trip. 100 app servers × 1000 posts = 100K posts cached in memory across the fleet. For truly viral posts, L1 hit rate approaches 99%, almost no Redis traffic. 3) CDN FOR MEDIA: Post text is small. Post images/videos are large. CDN caches media at 400+ edge nodes. 300M users loading Beyoncé's video hit their nearest edge node, not your S3. Hot key detection: monitor Redis key access rates. Any key > 10K/s is a hot key. Automatically replicate or route to L1 cache.",
              },
              {
                question:
                  "How does cursor-based pagination work and why is it better than offset pagination for feeds?",
                difficulty: "Intermediate",
                category: "Pagination",
                answer:
                  "Offset pagination: GET /feed?page=2&limit=20. Server executes ZREVRANGE feed:{userId} 20 39 (skip first 20, take next 20). Problem: feed is live. Between page 1 and page 2, 5 new posts arrive. Everything shifts. What was post #21 is now post #26. User sees posts repeated (got post #21 on page 1, it's now post #16, seen again on new page 1) or posts skipped entirely. At high volume this is constant. Also: ZREVRANGE offset N is O(log N + offset) — slow for large offsets. Cursor-based pagination: GET /feed?cursor={lastSeenPostId}&limit=20. The cursor IS the last postId the user saw. Server fetches posts with score less than that post's score: ZREVRANGEBYSCORE feed:{userId} (lastScore -inf LIMIT 0 20. This is always O(log N + 20) regardless of how far the user has scrolled. And it's stable — new posts arriving at the top don't affect where your cursor is. User never sees duplicates or skips. The cursor is typically the postId or a composite of (score, postId) to handle ties. Return nextCursor = last postId in the response. Client sends nextCursor on subsequent request. When nextCursor is null, no more posts exist.",
              },
              {
                question:
                  "How do you keep engagement counts (likes, reposts) consistent across the feed?",
                difficulty: "Advanced",
                category: "Consistency",
                answer:
                  "Engagement counts (like_count, repost_count, reply_count) update constantly for popular posts and are read on every feed load. Several strategies. 1) REDIS COUNTERS + ASYNC FLUSH: Increment counts in Redis atomically with HINCRBY. Redis field: HINCRBY post:{postId}:counts likes 1. This is O(1) and atomic — no race condition. Periodically (every 60s or on TTL), flush Redis counts to Cassandra/Postgres as a background job. Feed reads show Redis counts — always fresh. Cassandra has slightly stale counts — only used for cold reads or analytics. 2) WRITE-THROUGH CACHE: On every like, increment both Redis AND Cassandra atomically (use a Lua script for Redis atomic multi-field increment). Slower writes but counts always consistent. Overkill for engagement counts — slight staleness is acceptable. 3) COUNT APPROXIMATION: For very viral posts (1M+ likes), exact counts don't matter. User doesn't know if it's 1,234,567 or 1,234,591 likes. Use HyperLogLog for approximate unique user counts at 1/100th the memory cost. Reserved for extreme cases. Chosen approach for most systems: Redis counter + 60s async flush. Users see incrementing counts in real-time (the Redis value). Analytics queries use Cassandra (slightly stale but consistent). Post deletion: use a Lua script to atomically decrement counts and remove the key to prevent negative counts.",
              },
              {
                question:
                  "How do you handle a new user with no follows, and a user who just followed someone?",
                difficulty: "Intermediate",
                category: "Edge Cases",
                answer:
                  "NEW USER (empty feed): No follow relationships, empty feed cache. Two options: 1) Cold start with recommendations: show trending posts globally, posts from popular accounts in their interest categories (selected during onboarding), or content similar to any accounts they've searched. Store these in a 'discovery feed' cache keyed by interest category rather than userId. New user sees fresh relevant content without a social graph. 2) Prompt to follow: show an onboarding flow to follow accounts, then rebuild the feed. Most platforms do both — a discovery feed plus nudges to follow accounts. JUST FOLLOWED SOMEONE: User A follows User B at 2pm. User A's feed cache was built at 8am and doesn't include User B's posts. Options: 1) Invalidate feed cache immediately: del feed:{userId}. On next request, rebuild from scratch. Simple but slow first load. 2) Backfill: fetch User B's last 10 posts and ZADD them into User A's existing feed cache. Fast — feed is enriched, not rebuilt. Preferred approach. Also: push User A into User B's followers list so future fan-out includes them. Handle the reverse: User A unfollows User B — remove User B's posts from User A's Redis feed cache via ZREM. Alternatively, just invalidate the cache and let it rebuild without User B's posts.",
              },
              {
                question:
                  "What database does each part of the feed system use and why?",
                difficulty: "Intermediate",
                category: "Data Storage",
                answer:
                  "Each component has different access patterns requiring different storage. USER GRAPH (follows, user profiles): PostgreSQL. Follows are relational data — who follows whom is a many-to-many relationship with foreign keys. Queries like 'get all followers of userId X' need index lookups (idx_follows_followed). Profile data is highly relational (joins with posts, follows). PostgreSQL handles ACID transactions for follow/unfollow operations, preventing duplicate follow entries. POST CONTENT: Cassandra. Posts are write-heavy (millions per day), never need cross-post joins, accessed by author_id + time range. Cassandra's partition key (author_id) with clustering key (created_at DESC) gives O(1) range queries for 'get last N posts by author'. Wide rows are efficient. Cassandra scales writes horizontally (add nodes, more write capacity). Not suitable for: complex joins, transactions across partitions. FEED CACHE: Redis. Sorted sets for feed (ordered by score), Strings for post content cache, Hashes for user profile cache. Sub-millisecond reads, atomic score updates, TTL per key. ENGAGEMENT COUNTS: Redis for real-time (HINCRBY), Cassandra for durability (periodic flush). SEARCH INDEX: Elasticsearch for full-text search on post content. Separate system, updated asynchronously from Cassandra writes.",
              },
              {
                question:
                  "How would you design the write path to handle 1 million posts per second at Twitter scale?",
                difficulty: "Advanced",
                category: "Write Path Scale",
                answer:
                  "1M posts/second requires every component to be horizontally scalable with no single bottleneck. INGESTION: API servers behind load balancer. Stateless — any server handles any request. Auto-scale based on CPU. Rate limiting per user (no one user can post more than 1/s) reduces abuse. PERSISTENCE: Cassandra scales writes linearly — add nodes, get more write throughput. Cassandra's LSM-tree structure batches writes in memory before flushing to disk — extremely fast for write-heavy workloads. Shard by author_id hash. QUEUE: Kafka receives post.created events. Partitioned by author_id — all events for author X go to same partition, maintaining order. 100 partitions × 10K events/s per partition = 1M events/second throughput. FAN-OUT WORKERS: Fan-out is the bottleneck. 1M posts/s × average 1000 followers = 1B Redis writes/second needed. Mitigation: 1) Fan-out only for active followers (last 30 days). 2) Batch writes using Redis pipelines (1000 ZADDs per pipeline = 1 round-trip). 3) Celebrities excluded from fan-out (see hybrid model). 4) Fan-out workers scale horizontally — add more Kafka consumers. 5) Multiple Redis clusters, sharded by userId. REDIS SHARDING: Consistent hashing distributes feed keys across 16 shards. feed:{userId} maps to specific shard based on userId hash. Cluster scales by adding shards (requires re-sharding — use Redis Cluster which handles this automatically).",
              },
              {
                question:
                  "Why is eventual consistency acceptable for news feeds but not for ticket booking?",
                difficulty: "Intermediate",
                category: "Consistency",
                answer:
                  "The key question is: what is the cost of a brief inconsistency? For ticket booking: User A and User B both see seat 42 as available simultaneously. Both book it. Both show up. Physically impossible to fix. One person has no seat. Permanent, unrecoverable harm. Strong consistency required. For news feeds: User posts a tweet at 2:00:00pm. Some followers see it at 2:00:01pm (fan-out complete). Other followers see it at 2:00:10pm (slower fan-out). Worst case: nobody sees it for 30 seconds while fan-out processes. The post still exists. Nobody is harmed. All followers eventually see it. This is acceptable eventual consistency. Specific examples in feed systems: 1) Fan-out lag: followers see post up to 30 seconds late. Fine. 2) Like count staleness: shows 1,234 likes when it's actually 1,241. Fine — nobody checks exact counts. 3) Feed cache TTL: new posts appear after 5 seconds, not instantly. Fine. 4) Celebrity post injection: injected at read time, always current. CAP theorem for feeds: choose AP over CP. System stays available during network partitions (some nodes show slightly stale feeds) rather than refusing to serve until all nodes agree on exact state. Twitter's feed is AP. Ticket booking must be CP. The rule: can the inconsistency cause permanent real-world harm? If yes — strong consistency. If it self-corrects and causes only temporary annoyance — eventual consistency acceptable.",
              },
            ],

            links: [
              "https://engineering.twitter.com/2013/01/improving-performance-of-twitter.html - Twitter's original feed architecture: fan-out on write",
              "https://www.infoq.com/presentations/Twitter-Timeline-Scalability/ - Twitter timeline scalability deep dive",
              "https://engineering.fb.com/2015/03/10/production-engineering/serving-facebook-news-feed/ - Facebook News Feed serving at scale",
              "https://instagram-engineering.com/what-powers-instagram-hundeds-of-millions-of-photos-93cb14b04b93 - Instagram feed architecture",
              "https://redis.io/docs/data-types/sorted-sets/ - Redis Sorted Sets: commands, use cases, complexity",
              "https://cassandra.apache.org/doc/latest/cassandra/data_modeling/intro.html - Cassandra data modeling for time-series posts",
              "https://martin.kleppmann.com/2017/10/25/designing-data-intensive-applications.html - Designing Data-Intensive Applications: replication, consistency",
              "https://netflixtechblog.com/cache-is-the-new-cash-c72b3d08e3bd - Netflix: multi-layer caching strategy",
              "https://www.usenix.org/conference/osdi14/technical-sessions/presentation/nishtala - Facebook Memcache at scale paper",
              "https://highscalability.com/scaling-twitter-making-twitter-10000-percent-faster/ - Scaling Twitter: practical lessons",
              "https://redis.io/docs/management/scaling/ - Redis Cluster: horizontal scaling, sharding",
              "https://kafka.apache.org/documentation/#design - Kafka design: partitions, consumer groups for fan-out at scale",
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
