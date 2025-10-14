// Component Topics Data with Interview Questions
// This file contains dummy data for AWS, SystemDesign, Database, and DevOps topics

export const componentTopicsData = {
    // AWS Topics
    AWS: {
        "EC2&Compute": {
            title: "EC2 & Compute",
            description: "Elastic Compute Cloud, instances, auto-scaling, and load balancing",
            component: "AWS",
            questions: [
                {
                    id: "aws-ec2-1",
                    question: "What is Amazon EC2 and what are its key features?",
                    solution: `<p><strong>Amazon EC2 (Elastic Compute Cloud)</strong> is a web service that provides resizable compute capacity in the cloud. It's designed to make web-scale cloud computing easier for developers.</p>
            
  <p><strong>Key Features:</strong></p>
  <ul>
    <li><strong>Virtual Computing Environments:</strong> Known as instances with various configurations of CPU, memory, storage, and networking</li>
    <li><strong>Preconfigured Templates:</strong> Amazon Machine Images (AMIs) for quick instance launches</li>
    <li><strong>Secure Login:</strong> Key pairs for secure instance access</li>
    <li><strong>Storage Volumes:</strong> Temporary and persistent storage using Amazon EBS</li>
    <li><strong>Multiple Locations:</strong> Regions and Availability Zones for resource placement</li>
    <li><strong>Firewall:</strong> Security groups to control inbound and outbound traffic</li>
    <li><strong>Elastic IP Addresses:</strong> Static IPv4 addresses for dynamic cloud computing</li>
    <li><strong>Auto Scaling:</strong> Automatically scale capacity up or down</li>
  </ul>`,
                    tags: [
                        { name: "EC2", link: "" },
                        { name: "Cloud Computing", link: "" },
                        { name: "AWS", link: "" }
                    ],
                    difficulty: "medium"
                },
                {
                    id: "aws-ec2-2",
                    question: "Explain the difference between EC2 instance types and when to use each.",
                    solution: `<p><strong>EC2 Instance Types</strong> are optimized for different use cases:</p>
  
  <p><strong>1. General Purpose (T3, T4g, M5, M6i):</strong></p>
  <ul>
    <li>Balanced compute, memory, and networking</li>
    <li>Use for: Web servers, small databases, development environments</li>
  </ul>
  
  <p><strong>2. Compute Optimized (C5, C6i, C7g):</strong></p>
  <ul>
    <li>High-performance processors</li>
    <li>Use for: Batch processing, media transcoding, high-performance web servers</li>
  </ul>
  
  <p><strong>3. Memory Optimized (R5, R6i, X2gd):</strong></p>
  <ul>
    <li>Fast performance for memory-intensive workloads</li>
    <li>Use for: In-memory databases, real-time big data analytics</li>
  </ul>
  
  <p><strong>4. Storage Optimized (I3, D2, H1):</strong></p>
  <ul>
    <li>High sequential read/write access to large datasets</li>
    <li>Use for: NoSQL databases, data warehousing, distributed file systems</li>
  </ul>
  
  <p><strong>5. Accelerated Computing (P4, G5, F1):</strong></p>
  <ul>
    <li>Hardware accelerators or co-processors</li>
    <li>Use for: Machine learning, graphics processing, computational finance</li>
  </ul>`,
                    tags: [
                        { name: "Instance Types", link: "" },
                        { name: "EC2", link: "" }
                    ],
                    difficulty: "medium"
                },
                {
                    id: "aws-ec2-3",
                    question: "What is Auto Scaling in AWS and how does it work?",
                    solution: `<p><strong>AWS Auto Scaling</strong> monitors your applications and automatically adjusts capacity to maintain steady, predictable performance at the lowest possible cost.</p>
  
  <p><strong>How it Works:</strong></p>
  <ol>
    <li><strong>Create Launch Configuration:</strong> Define instance type, AMI, security groups</li>
    <li><strong>Create Auto Scaling Group:</strong> Specify min, max, and desired capacity</li>
    <li><strong>Define Scaling Policies:</strong> Set rules based on metrics (CPU, memory, custom)</li>
    <li><strong>Monitor & Scale:</strong> CloudWatch monitors metrics and triggers scaling actions</li>
  </ol>
  
  <p><strong>Scaling Types:</strong></p>
  <ul>
    <li><strong>Target Tracking:</strong> Maintain a specific metric value (e.g., 50% CPU)</li>
    <li><strong>Step Scaling:</strong> Scale based on metric thresholds</li>
    <li><strong>Scheduled Scaling:</strong> Scale at specific times</li>
    <li><strong>Predictive Scaling:</strong> ML-based forecasting</li>
  </ul>
  
  <p><strong>Benefits:</strong></p>
  <ul>
    <li>Improved fault tolerance</li>
    <li>Better availability</li>
    <li>Cost optimization</li>
    <li>Automatic health checks and replacement</li>
  </ul>`,
                    tags: [
                        { name: "Auto Scaling", link: "" },
                        { name: "High Availability", link: "" }
                    ],
                    difficulty: "medium"
                },
                {
                    id: "aws-ec2-4",
                    question: "Explain Elastic Load Balancing (ELB) and its types.",
                    solution: `<p><strong>Elastic Load Balancing (ELB)</strong> automatically distributes incoming application traffic across multiple targets, such as EC2 instances, containers, and IP addresses.</p>
  
  <p><strong>Types of Load Balancers:</strong></p>
  
  <p><strong>1. Application Load Balancer (ALB):</strong></p>
  <ul>
    <li>Layer 7 (HTTP/HTTPS)</li>
    <li>Content-based routing</li>
    <li>Host-based and path-based routing</li>
    <li>WebSocket and HTTP/2 support</li>
    <li>Best for: Microservices, containers</li>
  </ul>
  
  <p><strong>2. Network Load Balancer (NLB):</strong></p>
  <ul>
    <li>Layer 4 (TCP/UDP)</li>
    <li>Ultra-high performance (millions of requests/sec)</li>
    <li>Static IP support</li>
    <li>Best for: Extreme performance, TCP traffic</li>
  </ul>
  
  <p><strong>3. Gateway Load Balancer (GWLB):</strong></p>
  <ul>
    <li>Layer 3 (Network layer)</li>
    <li>Deploy, scale, and manage third-party virtual appliances</li>
    <li>Best for: Firewalls, intrusion detection systems</li>
  </ul>
  
  <p><strong>4. Classic Load Balancer (CLB):</strong></p>
  <ul>
    <li>Legacy (Layer 4 & 7)</li>
    <li>Basic load balancing</li>
    <li>Not recommended for new applications</li>
  </ul>`,
                    tags: [
                        { name: "Load Balancing", link: "" },
                        { name: "ELB", link: "" }
                    ],
                    difficulty: "medium"
                }
            ]
        },
        "S3&Storage": {
            title: "S3 & Storage",
            description: "Simple Storage Service, data lifecycle, and storage classes",
            component: "AWS",
            questions: [
                {
                    id: "aws-s3-1",
                    question: "What is Amazon S3 and what are its key features?",
                    solution: `<p><strong>Amazon S3 (Simple Storage Service)</strong> is an object storage service offering industry-leading scalability, data availability, security, and performance.</p>
  
  <p><strong>Key Features:</strong></p>
  <ul>
    <li><strong>Scalability:</strong> Store unlimited amount of data</li>
    <li><strong>Durability:</strong> 99.999999999% (11 9's) durability</li>
    <li><strong>Availability:</strong> 99.99% availability SLA</li>
    <li><strong>Security:</strong> Encryption at rest and in transit, IAM policies, bucket policies</li>
    <li><strong>Performance:</strong> High throughput and low latency</li>
    <li><strong>Storage Classes:</strong> Multiple tiers for cost optimization</li>
    <li><strong>Versioning:</strong> Keep multiple versions of objects</li>
    <li><strong>Lifecycle Policies:</strong> Automate data transitions</li>
  </ul>
  
  <p><strong>Use Cases:</strong></p>
  <ul>
    <li>Backup and restore</li>
    <li>Data archiving</li>
    <li>Static website hosting</li>
    <li>Big data analytics</li>
    <li>Content distribution</li>
  </ul>`,
                    tags: [
                        { name: "S3", link: "" },
                        { name: "Object Storage", link: "" }
                    ],
                    difficulty: "easy"
                },
                {
                    id: "aws-s3-2",
                    question: "Explain S3 storage classes and when to use each.",
                    solution: `<p><strong>S3 Storage Classes</strong> are designed for different use cases based on access patterns and cost requirements:</p>
  
  <p><strong>1. S3 Standard:</strong></p>
  <ul>
    <li>Frequently accessed data</li>
    <li>Low latency, high throughput</li>
    <li>Use for: Active data, websites, content distribution</li>
  </ul>
  
  <p><strong>2. S3 Intelligent-Tiering:</strong></p>
  <ul>
    <li>Automatic cost optimization</li>
    <li>Moves data between access tiers automatically</li>
    <li>Use for: Unknown or changing access patterns</li>
  </ul>
  
  <p><strong>3. S3 Standard-IA (Infrequent Access):</strong></p>
  <ul>
    <li>Less frequently accessed data</li>
    <li>Lower storage cost, retrieval fee</li>
    <li>Use for: Backups, disaster recovery</li>
  </ul>
  
  <p><strong>4. S3 One Zone-IA:</strong></p>
  <ul>
    <li>Single AZ storage</li>
    <li>20% cheaper than Standard-IA</li>
    <li>Use for: Secondary backups, reproducible data</li>
  </ul>
  
  <p><strong>5. S3 Glacier:</strong></p>
  <ul>
    <li>Long-term archive</li>
    <li>Retrieval: minutes to hours</li>
    <li>Use for: Compliance archives, media archives</li>
  </ul>
  
  <p><strong>6. S3 Glacier Deep Archive:</strong></p>
  <ul>
    <li>Lowest cost storage</li>
    <li>Retrieval: 12 hours</li>
    <li>Use for: Long-term retention (7-10 years)</li>
  </ul>`,
                    tags: [
                        { name: "Storage Classes", link: "" },
                        { name: "S3", link: "" }
                    ],
                    difficulty: "medium"
                }
            ]
        },
        "Lambda&Serverless": {
            title: "Lambda & Serverless",
            description: "Function-as-a-Service, event-driven architecture, and serverless patterns",
            component: "AWS",
            questions: [
                {
                    id: "aws-lambda-1",
                    question: "What is AWS Lambda and how does it work?",
                    solution: `<p><strong>AWS Lambda</strong> is a serverless compute service that runs your code in response to events and automatically manages the underlying compute resources.</p>
  
  <p><strong>How it Works:</strong></p>
  <ol>
    <li><strong>Upload Code:</strong> Upload your function code to Lambda</li>
    <li><strong>Configure Trigger:</strong> Set up event sources (API Gateway, S3, DynamoDB, etc.)</li>
    <li><strong>Automatic Execution:</strong> Lambda runs your code when triggered</li>
    <li><strong>Auto Scaling:</strong> Automatically scales based on incoming requests</li>
    <li><strong>Pay Per Use:</strong> Only pay for compute time consumed</li>
  </ol>
  
  <p><strong>Key Features:</strong></p>
  <ul>
    <li><strong>No Server Management:</strong> AWS handles all infrastructure</li>
    <li><strong>Automatic Scaling:</strong> From few requests to thousands per second</li>
    <li><strong>Subsecond Metering:</strong> Pay only for compute time used</li>
    <li><strong>Multiple Languages:</strong> Node.js, Python, Java, Go, .NET, Ruby</li>
    <li><strong>Built-in Fault Tolerance:</strong> Maintains compute capacity across AZs</li>
  </ul>
  
  <p><strong>Use Cases:</strong></p>
  <ul>
    <li>Real-time file processing</li>
    <li>Data transformation</li>
    <li>Backends for web/mobile apps</li>
    <li>IoT backends</li>
    <li>Scheduled tasks</li>
  </ul>`,
                    tags: [
                        { name: "Lambda", link: "" },
                        { name: "Serverless", link: "" }
                    ],
                    difficulty: "medium"
                }
            ]
        },
        "VPC&Networking": {
            title: "VPC & Networking",
            description: "Virtual Private Cloud, subnets, security groups, and routing",
            component: "AWS",
            questions: [
                {
                    id: "aws-vpc-1",
                    question: "What is Amazon VPC and its key components?",
                    solution: `<p><strong>Amazon VPC (Virtual Private Cloud)</strong> lets you provision a logically isolated section of the AWS Cloud where you can launch AWS resources in a virtual network that you define.</p>
  
  <p><strong>Key Components:</strong></p>
  
  <p><strong>1. Subnets:</strong></p>
  <ul>
    <li>Public Subnet: Has route to Internet Gateway</li>
    <li>Private Subnet: No direct internet access</li>
    <li>Can span multiple AZs for high availability</li>
  </ul>
  
  <p><strong>2. Internet Gateway (IGW):</strong></p>
  <ul>
    <li>Allows communication between VPC and internet</li>
    <li>Horizontally scaled, redundant, highly available</li>
  </ul>
  
  <p><strong>3. NAT Gateway:</strong></p>
  <ul>
    <li>Enables private subnet instances to connect to internet</li>
    <li>Prevents internet from initiating connections to instances</li>
  </ul>
  
  <p><strong>4. Route Tables:</strong></p>
  <ul>
    <li>Control traffic routing within VPC</li>
    <li>Each subnet must be associated with a route table</li>
  </ul>
  
  <p><strong>5. Security Groups:</strong></p>
  <ul>
    <li>Virtual firewall at instance level</li>
    <li>Stateful (return traffic automatically allowed)</li>
    <li>Allow rules only</li>
  </ul>
  
  <p><strong>6. Network ACLs:</strong></p>
  <ul>
    <li>Firewall at subnet level</li>
    <li>Stateless (must explicitly allow return traffic)</li>
    <li>Allow and deny rules</li>
  </ul>`,
                    tags: [
                        { name: "VPC", link: "" },
                        { name: "Networking", link: "" }
                    ],
                    difficulty: "medium"
                }
            ]
        },
        "RDS&Databases": {
            title: "RDS & Databases",
            description: "Relational Database Service, Aurora, and database management",
            component: "AWS",
            questions: [
                {
                    id: "aws-rds-1",
                    question: "What is Amazon RDS and what are its benefits?",
                    solution: `<p><strong>Amazon RDS (Relational Database Service)</strong> makes it easy to set up, operate, and scale a relational database in the cloud.</p>
  
  <p><strong>Supported Database Engines:</strong></p>
  <ul>
    <li>Amazon Aurora</li>
    <li>PostgreSQL</li>
    <li>MySQL</li>
    <li>MariaDB</li>
    <li>Oracle</li>
    <li>Microsoft SQL Server</li>
  </ul>
  
  <p><strong>Key Benefits:</strong></p>
  <ul>
    <li><strong>Automated Administration:</strong> Automatic backups, patching, and updates</li>
    <li><strong>High Availability:</strong> Multi-AZ deployments for failover</li>
    <li><strong>Scalability:</strong> Easy vertical and horizontal scaling</li>
    <li><strong>Security:</strong> Encryption at rest and in transit, VPC isolation</li>
    <li><strong>Monitoring:</strong> CloudWatch integration for performance metrics</li>
    <li><strong>Read Replicas:</strong> Improve read performance</li>
  </ul>
  
  <p><strong>Use Cases:</strong></p>
  <ul>
    <li>Web and mobile applications</li>
    <li>E-commerce platforms</li>
    <li>Enterprise applications</li>
    <li>Online gaming</li>
  </ul>`,
                    tags: [
                        { name: "RDS", link: "" },
                        { name: "Databases", link: "" }
                    ],
                    difficulty: "medium"
                }
            ]
        },
        "CloudFormation&IaC": {
            title: "CloudFormation & IaC",
            description: "Infrastructure as Code, templates, and automated deployments",
            component: "AWS",
            questions: [
                {
                    id: "aws-cf-1",
                    question: "What is AWS CloudFormation and how does it work?",
                    solution: `<p><strong>AWS CloudFormation</strong> provides a common language to model and provision AWS and third-party application resources in your cloud environment.</p>
  
  <p><strong>How it Works:</strong></p>
  <ol>
    <li><strong>Create Template:</strong> Define resources in JSON or YAML</li>
    <li><strong>Upload Template:</strong> Upload to CloudFormation</li>
    <li><strong>Create Stack:</strong> CloudFormation provisions resources</li>
    <li><strong>Manage Stack:</strong> Update, delete, or monitor stack</li>
  </ol>
  
  <p><strong>Key Concepts:</strong></p>
  <ul>
    <li><strong>Templates:</strong> JSON/YAML files describing resources</li>
    <li><strong>Stacks:</strong> Collection of AWS resources managed as a single unit</li>
    <li><strong>Change Sets:</strong> Preview changes before applying</li>
    <li><strong>Stack Sets:</strong> Deploy stacks across multiple accounts/regions</li>
  </ul>
  
  <p><strong>Benefits:</strong></p>
  <ul>
    <li><strong>Infrastructure as Code:</strong> Version control for infrastructure</li>
    <li><strong>Consistency:</strong> Replicate infrastructure reliably</li>
    <li><strong>Automation:</strong> Automate provisioning and updates</li>
    <li><strong>Dependency Management:</strong> Automatic resource ordering</li>
    <li><strong>Rollback:</strong> Automatic rollback on errors</li>
  </ul>`,
                    tags: [
                        { name: "CloudFormation", link: "" },
                        { name: "IaC", link: "" }
                    ],
                    difficulty: "medium"
                }
            ]
        }
    },

    // System Design Topics
    SystemDesign: {
        "ScalabilityPatterns": {
            title: "Scalability Patterns",
            description: "Horizontal vs vertical scaling, load balancing, and caching strategies",
            component: "SystemDesign",
            questions: [
                {
                    id: "sd-scale-1",
                    question: "Explain the difference between horizontal and vertical scaling.",
                    solution: `<p><strong>Vertical Scaling (Scale Up):</strong></p>
  <ul>
    <li><strong>Definition:</strong> Adding more power (CPU, RAM) to existing machine</li>
    <li><strong>Pros:</strong>
      <ul>
        <li>Simpler to implement</li>
        <li>No code changes required</li>
        <li>Maintains data consistency</li>
      </ul>
    </li>
    <li><strong>Cons:</strong>
      <ul>
        <li>Hardware limits</li>
        <li>Single point of failure</li>
        <li>Downtime during upgrades</li>
        <li>More expensive at scale</li>
      </ul>
    </li>
    <li><strong>Use Cases:</strong> Databases, legacy applications</li>
  </ul>
  
  <p><strong>Horizontal Scaling (Scale Out):</strong></p>
  <ul>
    <li><strong>Definition:</strong> Adding more machines to handle load</li>
    <li><strong>Pros:</strong>
      <ul>
        <li>No hardware limits</li>
        <li>Better fault tolerance</li>
        <li>No downtime</li>
        <li>Cost-effective at scale</li>
      </ul>
    </li>
    <li><strong>Cons:</strong>
      <ul>
        <li>More complex architecture</li>
        <li>Data consistency challenges</li>
        <li>Requires load balancing</li>
        <li>Network overhead</li>
      </ul>
    </li>
    <li><strong>Use Cases:</strong> Web servers, microservices, distributed systems</li>
  </ul>
  
  <p><strong>Best Practice:</strong> Use horizontal scaling for stateless components and vertical scaling for stateful components like databases.</p>`,
                    tags: [
                        { name: "Scaling", link: "" },
                        { name: "Architecture", link: "" }
                    ],
                    difficulty: "medium"
                },
                {
                    id: "sd-scale-2",
                    question: "What are common caching strategies and when to use them?",
                    solution: `<p><strong>Caching Strategies:</strong></p>
  
  <p><strong>1. Cache-Aside (Lazy Loading):</strong></p>
  <ul>
    <li>Application checks cache first</li>
    <li>On miss, loads from database and updates cache</li>
    <li><strong>Pros:</strong> Only caches requested data, resilient to cache failures</li>
    <li><strong>Cons:</strong> Initial request slower, stale data possible</li>
    <li><strong>Use for:</strong> Read-heavy workloads</li>
  </ul>
  
  <p><strong>2. Write-Through:</strong></p>
  <ul>
    <li>Writes go to cache and database simultaneously</li>
    <li><strong>Pros:</strong> Data always fresh, no cache misses on reads</li>
    <li><strong>Cons:</strong> Write latency, unused data cached</li>
    <li><strong>Use for:</strong> Write-heavy, read consistency critical</li>
  </ul>
  
  <p><strong>3. Write-Behind (Write-Back):</strong></p>
  <ul>
    <li>Writes to cache, asynchronously to database</li>
    <li><strong>Pros:</strong> Fast writes, reduced database load</li>
    <li><strong>Cons:</strong> Data loss risk, complex implementation</li>
    <li><strong>Use for:</strong> High write throughput needed</li>
  </ul>
  
  <p><strong>4. Refresh-Ahead:</strong></p>
  <ul>
    <li>Automatically refresh cache before expiration</li>
    <li><strong>Pros:</strong> Reduced latency for frequently accessed data</li>
    <li><strong>Cons:</strong> Difficult to predict access patterns</li>
    <li><strong>Use for:</strong> Predictable access patterns</li>
  </ul>
  
  <p><strong>Cache Eviction Policies:</strong></p>
  <ul>
    <li><strong>LRU (Least Recently Used):</strong> Most common</li>
    <li><strong>LFU (Least Frequently Used):</strong> For stable access patterns</li>
    <li><strong>FIFO:</strong> Simple but less effective</li>
    <li><strong>TTL (Time To Live):</strong> Time-based expiration</li>
  </ul>`,
                    tags: [
                        { name: "Caching", link: "" },
                        { name: "Performance", link: "" }
                    ],
                    difficulty: "hard"
                }
            ]
        },
        "DistributedSystems": {
            title: "Distributed Systems",
            description: "Microservices, service discovery, and inter-service communication",
            component: "SystemDesign",
            questions: [
                {
                    id: "sd-dist-1",
                    question: "What are microservices and what are their advantages and challenges?",
                    solution: `<p><strong>Microservices</strong> is an architectural style that structures an application as a collection of loosely coupled, independently deployable services.</p>
  
  <p><strong>Advantages:</strong></p>
  <ul>
    <li><strong>Independent Deployment:</strong> Deploy services independently</li>
    <li><strong>Technology Diversity:</strong> Use different tech stacks per service</li>
    <li><strong>Scalability:</strong> Scale services independently</li>
    <li><strong>Fault Isolation:</strong> Failure in one service doesn't crash entire system</li>
    <li><strong>Team Autonomy:</strong> Small teams own specific services</li>
    <li><strong>Easier Maintenance:</strong> Smaller codebases easier to understand</li>
  </ul>
  
  <p><strong>Challenges:</strong></p>
  <ul>
    <li><strong>Distributed System Complexity:</strong> Network latency, partial failures</li>
    <li><strong>Data Consistency:</strong> Maintaining consistency across services</li>
    <li><strong>Testing:</strong> Integration testing more complex</li>
    <li><strong>Deployment:</strong> More moving parts to deploy</li>
    <li><strong>Monitoring:</strong> Need distributed tracing and logging</li>
    <li><strong>Service Discovery:</strong> Services need to find each other</li>
  </ul>
  
  <p><strong>When to Use:</strong></p>
  <ul>
    <li>Large, complex applications</li>
    <li>Multiple teams working independently</li>
    <li>Need for different scaling requirements</li>
    <li>Long-term project with evolving requirements</li>
  </ul>
  
  <p><strong>When NOT to Use:</strong></p>
  <ul>
    <li>Small applications</li>
    <li>Limited team size</li>
    <li>Tight coupling between components</li>
    <li>Simple CRUD applications</li>
  </ul>`,
                    tags: [
                        { name: "Microservices", link: "" },
                        { name: "Architecture", link: "" }
                    ],
                    difficulty: "hard"
                }
            ]
        },
        "DatabaseDesign": {
            title: "Database Design",
            description: "Sharding, replication, consistency models, and CAP theorem",
            component: "SystemDesign",
            questions: [
                {
                    id: "sd-db-1",
                    question: "Explain the CAP theorem and its implications for distributed databases.",
                    solution: `<p><strong>CAP Theorem</strong> states that a distributed database system can only guarantee two out of three properties simultaneously:</p>
  
  <p><strong>1. Consistency (C):</strong></p>
  <ul>
    <li>All nodes see the same data at the same time</li>
    <li>Every read receives the most recent write</li>
    <li>Strong consistency guarantees</li>
  </ul>
  
  <p><strong>2. Availability (A):</strong></p>
  <ul>
    <li>Every request receives a response (success or failure)</li>
    <li>System remains operational even during failures</li>
    <li>No downtime</li>
  </ul>
  
  <p><strong>3. Partition Tolerance (P):</strong></p>
  <ul>
    <li>System continues to operate despite network partitions</li>
    <li>Can handle communication breakdowns between nodes</li>
    <li>Essential for distributed systems</li>
  </ul>
  
  <p><strong>Trade-offs:</strong></p>
  
  <p><strong>CP Systems (Consistency + Partition Tolerance):</strong></p>
  <ul>
    <li>Sacrifice availability during partitions</li>
    <li>Examples: MongoDB, HBase, Redis</li>
    <li>Use for: Banking, financial transactions</li>
  </ul>
  
  <p><strong>AP Systems (Availability + Partition Tolerance):</strong></p>
  <ul>
    <li>Sacrifice consistency for availability</li>
    <li>Examples: Cassandra, DynamoDB, CouchDB</li>
    <li>Use for: Social media, analytics, caching</li>
  </ul>
  
  <p><strong>CA Systems (Consistency + Availability):</strong></p>
  <ul>
    <li>Cannot tolerate partitions (not truly distributed)</li>
    <li>Examples: Traditional RDBMS in single location</li>
    <li>Rare in modern distributed systems</li>
  </ul>
  
  <p><strong>Modern Approach:</strong></p>
  <ul>
    <li>Most systems choose AP and provide eventual consistency</li>
    <li>Use techniques like quorum reads/writes</li>
    <li>Implement conflict resolution strategies</li>
  </ul>`,
                    tags: [
                        { name: "CAP Theorem", link: "" },
                        { name: "Distributed Systems", link: "" }
                    ],
                    difficulty: "hard"
                }
            ]
        },
        "MessageQueues": {
            title: "Message Queues",
            description: "Event-driven architecture, message brokers, and async processing",
            component: "SystemDesign",
            questions: [
                {
                    id: "sd-mq-1",
                    question: "What are message queues and when should you use them?",
                    solution: `<p><strong>Message Queues</strong> are a form of asynchronous service-to-service communication used in serverless and microservices architectures.</p>
  
  <p><strong>How They Work:</strong></p>
  <ol>
    <li>Producer sends message to queue</li>
    <li>Message stored in queue</li>
    <li>Consumer retrieves and processes message</li>
    <li>Message deleted after successful processing</li>
  </ol>
  
  <p><strong>Benefits:</strong></p>
  <ul>
    <li><strong>Decoupling:</strong> Services don't need to know about each other</li>
    <li><strong>Scalability:</strong> Handle traffic spikes by queuing requests</li>
    <li><strong>Reliability:</strong> Messages not lost if consumer is down</li>
    <li><strong>Asynchronous Processing:</strong> Don't block on slow operations</li>
    <li><strong>Load Leveling:</strong> Smooth out traffic bursts</li>
  </ul>
  
  <p><strong>Popular Message Queue Systems:</strong></p>
  <ul>
    <li><strong>RabbitMQ:</strong> Feature-rich, supports multiple protocols</li>
    <li><strong>Apache Kafka:</strong> High throughput, distributed streaming</li>
    <li><strong>Amazon SQS:</strong> Fully managed, highly scalable</li>
    <li><strong>Redis:</strong> Fast, in-memory, simple pub/sub</li>
    <li><strong>Apache ActiveMQ:</strong> Enterprise-grade, supports JMS</li>
  </ul>
  
  <p><strong>When to Use:</strong></p>
  <ul>
    <li>High-throughput applications</li>
    <li>Decoupling services</li>
    <li>Asynchronous processing</li>
    <li>Load leveling</li>
    <li>Event sourcing</li>
  </ul>
  
  <p><strong>When NOT to Use:</strong></p>
  <ul>
    <li>Simple point-to-point communication</li>
    <li>Real-time applications</li>
    <li>Low-throughput applications</li>
    <li>Simple CRUD operations</li>
  </ul>`,
                    tags: [
                        { name: "Message Queues", link: "" },
                        { name: "Asynchronous Processing", link: "" }
                    ],
                    difficulty: "hard"
                }
            ]
        },
        "CDN & Caching": {
            title: "CDN & Caching",
            description: "Content Delivery Networks, caching layers, and performance optimization",
            component: "SystemDesign",
            questions: [
                {
                    id: "sd-cdn-1",
                    question: "What are CDN and caching and when should you use them?",
                    solution: `<p><strong>CDN (Content Delivery Network)</strong> is a network of servers distributed geographically that deliver content to users based on their location.</p>
  
  <p><strong>Benefits:</strong></p>
  <ul>
    <li><strong>Performance:</strong> Faster content delivery</li>
    <li><strong>Cost Efficiency:</strong> Reduced bandwidth usage</li>
    <li><strong>Scalability:</strong> Handle high traffic volumes</li>
    <li><strong>Security:</strong> Content protection and access control</li>
    <li><strong>Flexibility:</strong> Support for different delivery methods</li>
    <li><strong>Cost Efficiency:</strong> Reduced bandwidth usage</li>
    <li><strong>Flexibility:</strong> Support for different delivery methods</li>
    </ul>
    
    <p><strong>Popular CDN Providers:</strong></p>
    <ul>
      <li><strong>Amazon CloudFront:</strong> Fully managed, global coverage</li>
      <li><strong>Cloudflare:</strong> Fast, flexible, and secure</li>
      <li><strong>MaxCDN:</strong> High performance, global coverage</li>
      <li><strong>KeyCDN:</strong> Enterprise-grade, custom solutions</li>
      <li><strong>Fastly:</strong> High performance, global coverage</li>
    </ul>
    
    <p><strong>When to Use:</strong></p>
    <ul>
      <li>Large websites with high traffic volumes</li>
      <li>Content-heavy applications</li>
      <li>Large media files (videos, images)</li>
      <li>Static assets (CSS, JS, images)</li>
      <li>Large datasets (data files, databases)</li>
    </ul>
    
    <p><strong>When NOT to Use:</strong></p>
    <ul>
      <li>Small websites</li>
      <li>Simple point-to-point communication</li>
      <li>Real-time applications</li>
      <li>Low-throughput applications</li>
      <li>Simple CRUD operations</li>
    </ul>`,
                    tags: [
                        { name: "CDN", link: "" },
                        { name: "Caching", link: "" }
                    ],
                    difficulty: "hard"
                }
            ]
        },
        "CloudFormation & IaC": {
            title: "CloudFormation & IaC",
            description: "Infrastructure as Code, templates, and automated deployments",
            component: "SystemDesign",
            questions: [
                {
                    id: "sd-iac-1",
                    question: "What is Infrastructure as Code (IaC) and why is it important?",
                    solution: `<p><strong>Infrastructure as Code (IaC)</strong> is the practice of managing and provisioning infrastructure through code, typically using configuration management tools like Terraform, Ansible, or Chef.</p>
  
  <p><strong>Benefits:</strong></p>
  <ul>
    <li><strong>Consistency:</strong> Ensure consistent infrastructure across environments</li>
    <li><strong>Automation:</strong> Automate infrastructure provisioning and management</li>
    <li><strong>Version Control:</strong> Track changes to infrastructure configuration</li>
    <li><strong>Cost Efficiency:</strong> Reduce manual errors and human intervention</li>
    <li><strong>Flexibility:</strong> Support for different delivery methods</li>
    <li><strong>Cost Efficiency:</strong> Reduced bandwidth usage</li>
    <li><strong>Flexibility:</strong> Support for different delivery methods</li>
    </ul>
    
    <p><strong>Popular IaC Tools:</strong></p>
    <ul>
      <li><strong>Terraform:</strong> Fully managed, global coverage</li>
      <li><strong>Ansible:</strong> Fast, flexible, and secure</li>
      <li><strong>CloudFormation:</strong> High performance, global coverage</li>
      <li><strong>KeyCDN:</strong> Enterprise-grade, custom solutions</li>
      <li><strong>Fastly:</strong> High performance, global coverage</li>
    </ul>
    
    <p><strong>When to Use:</strong></p>
    <ul>
      <li>Large websites with high traffic volumes</li>
      <li>Content-heavy applications</li>
      <li>Large media files (videos, images)</li>
      <li>Static assets (CSS, JS, images)</li>
      <li>Large datasets (data files, databases)</li>
    </ul>
    
    <p><strong>When NOT to Use:</strong></p>
    <ul>
      <li>Small websites</li>
      <li>Simple point-to-point communication</li>
      <li>Real-time applications</li>
      <li>Low-throughput applications</li>
      <li>Simple CRUD operations</li>
    </ul>`,
                    tags: [
                        { name: "CDN", link: "" },
                        { name: "Caching", link: "" }
                    ],
                    difficulty: "hard"
                }
            ]
        }
    }
}