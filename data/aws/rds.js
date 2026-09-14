/** AWS RDS — managed relational databases and Aurora */
export const awsRds = {
  id: 105,
  category: "AWS RDS",
  themeBgColor: "#DBEAFE",
  textColor: "#1E40AF",
  topicColor: "#2563EB",
  lightColor: "#EFF6FF",
  type: [
    {
      id: 1,
      label: "Beginner",
      concepts: [
        {
          topic: "RDS Fundamentals & Engines",
          tags: ["aws", "rds", "database", "postgresql", "mysql"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>Amazon RDS (Relational Database Service)</strong> is a managed relational database. AWS handles provisioning, OS and engine patching, backups, failover and monitoring, while you keep full control over the schema, queries, users and parameters. You still choose the instance class, storage and network placement, so RDS questions test whether you understand what is managed and what is still your responsibility.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Supported engines</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>PostgreSQL</strong> and <strong>MySQL</strong>: the most common open-source choices.</li>
  <li><strong>MariaDB</strong>, <strong>Oracle</strong> and <strong>SQL Server</strong> (bring-your-own-licence or licence-included).</li>
  <li><strong>Amazon Aurora</strong>: the AWS-built engine compatible with MySQL and PostgreSQL, with a distributed storage layer (covered in its own topic).</li>
  <li><strong>RDS Custom</strong> gives OS and database-level access for legacy Oracle and SQL Server workloads that need it.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What AWS manages vs what you manage</h4>
<pre><code class="language-text">AWS:  hardware, OS patching, engine minor upgrades (opt-in), automated backups, Multi-AZ failover, monitoring metrics
You:  schema, indexes, queries, users and grants, parameter tuning, instance sizing, security groups, major version upgrades</code></pre>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Building blocks</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>DB instance class:</strong> <code>db.t</code> (burstable, dev), <code>db.m</code> (general), <code>db.r</code> (memory-optimised, most production OLTP). Graviton (<code>g</code>) variants are cheaper.</li>
  <li><strong>Storage:</strong> <code>gp3</code> general-purpose SSD with baseline 3,000 IOPS, <code>io1/io2</code> for guaranteed high IOPS. <strong>Storage autoscaling</strong> grows the volume automatically up to a cap.</li>
  <li><strong>DB subnet group:</strong> The private subnets (in at least two AZs) the instance may be placed in.</li>
  <li><strong>Parameter group:</strong> Engine configuration (for example <code>max_connections</code>, <code>shared_buffers</code>); <strong>option group</strong> adds engine features such as Oracle TDE.</li>
  <li><strong>Endpoint:</strong> A DNS name; never hardcode the IP because it changes on failover.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Maintenance and upgrades</h4>
<p style="line-height: 1.75;">A weekly <strong>maintenance window</strong> is when AWS applies OS patches and any minor version upgrade you have enabled with auto minor version upgrade. <strong>Major version upgrades</strong> are manual, cause downtime, and should be rehearsed on a restored snapshot first. Blue/Green Deployments for RDS create a synchronised staging copy so you can switch over in about a minute.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "RDS is managed relational databases: AWS runs the hardware, OS, patching, backups and failover, and I own the schema, queries, users, parameter tuning and sizing. I pick an engine, an instance class, gp3 storage with autoscaling, a private DB subnet group across two AZs, and I always connect through the endpoint DNS name because the underlying host changes on failover."</div>
</div>`,
          examples: [
            `# Create an encrypted PostgreSQL instance in private subnets with a managed master password
aws rds create-db-subnet-group --db-subnet-group-name private-db-subnets \\
  --db-subnet-group-description "data tier" --subnet-ids subnet-data-a subnet-data-b

aws rds create-db-instance \\
  --db-instance-identifier app-db \\
  --engine postgres --engine-version 16 \\
  --db-instance-class db.r6g.large \\
  --allocated-storage 100 --max-allocated-storage 500 --storage-type gp3 \\
  --storage-encrypted \\
  --db-subnet-group-name private-db-subnets \\
  --vpc-security-group-ids sg-db \\
  --master-username appadmin --manage-master-user-password \\
  --backup-retention-period 14 --preferred-maintenance-window sun:03:00-sun:04:00 \\
  --auto-minor-version-upgrade --deletion-protection

# Tune the engine through a parameter group, not on the instance
aws rds create-db-parameter-group --db-parameter-group-name app-pg16 --db-parameter-group-family postgres16 --description "app tuning"
aws rds modify-db-parameter-group --db-parameter-group-name app-pg16 \\
  --parameters "ParameterName=log_min_duration_statement,ParameterValue=500,ApplyMethod=immediate"
aws rds modify-db-instance --db-instance-identifier app-db --db-parameter-group-name app-pg16 --apply-immediately`,
          ],
          questions: [
            {
              question: "What does RDS manage for you, and what is still your responsibility?",
              solution: "<p>RDS manages the <strong>hardware, operating system, engine installation and patching, automated backups, storage, Multi-AZ failover and monitoring metrics</strong>. You remain responsible for the <strong>schema, indexes and query performance, database users and grants, parameter tuning, instance sizing, network placement and security groups, and major version upgrades</strong>. You never get OS or superuser access on standard RDS, which is why some legacy workloads use RDS Custom or EC2 instead.</p>",
            },
            {
              question: "Why should an application connect to the RDS endpoint rather than an IP address?",
              solution: "<p>The endpoint is a <strong>DNS CNAME</strong> that RDS updates whenever the underlying host changes: during Multi-AZ failover, instance class changes, or maintenance. An IP address would point at a dead host after any of those events. Applications should also honour the DNS TTL (and disable long-lived JVM DNS caching) and implement connection retry with backoff so they reconnect quickly after a failover.</p>",
            },
            {
              question: "What is a parameter group and why use a custom one?",
              solution: "<p>A parameter group holds the <strong>engine configuration</strong> (for example <code>max_connections</code>, <code>work_mem</code>, slow query thresholds). Every instance starts with a read-only default group, so any tuning requires creating a <strong>custom parameter group</strong>, editing values, and attaching it to the instance. Some parameters are dynamic and apply immediately; static ones need a reboot. Keeping tuning in a parameter group makes it reproducible across environments and visible in infrastructure-as-code.</p>",
            },
            {
              question: "How do you upgrade an RDS major version safely?",
              solution: "<p>Restore a recent snapshot to a test instance and run the upgrade plus your application test suite there first, checking for deprecated features and extension compatibility. In production, use <strong>RDS Blue/Green Deployments</strong>: RDS creates a synchronised green copy on the new version, you validate it, then switch over with about a minute of downtime and a rollback path. Take a manual snapshot immediately before, schedule it in a low-traffic window, and update the parameter group to the new family.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html",
            "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.DBInstanceClass.html",
            "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithParamGroups.html",
          ],
        },
        {
          topic: "Multi-AZ vs Read Replicas",
          tags: ["aws", "rds", "multi-az", "read replica", "high availability"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  The single most common RDS interview question: <strong>Multi-AZ is for availability, read replicas are for scalability</strong>. They use different replication mechanisms, serve different traffic, and are usually used together.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Multi-AZ deployments</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>A <strong>synchronous standby</strong> replica in a different Availability Zone. Every write is committed on both before the client gets an acknowledgement, so no committed data is lost on failover.</li>
  <li>The standby <strong>serves no traffic</strong> in the classic Multi-AZ instance deployment; it exists to take over.</li>
  <li><strong>Automatic failover</strong> in about 60 to 120 seconds when the primary instance, its AZ, its storage or its network fails, or during patching. The endpoint DNS is repointed; applications reconnect.</li>
  <li><strong>Multi-AZ DB clusters</strong> (MySQL, PostgreSQL) add two <strong>readable</strong> standbys with semi-synchronous replication and failover typically under 35 seconds.</li>
  <li>Roughly doubles the instance cost; backups are taken from the standby so they do not affect the primary.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Read replicas</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Asynchronous</strong> replication using the engine's native mechanism (streaming replication, binlog), so reads can be slightly <strong>stale</strong>.</li>
  <li>Each replica has its <strong>own endpoint</strong> and serves read traffic: reporting, analytics, search indexing, read-heavy APIs.</li>
  <li>Up to 15 replicas; can be in <strong>another region</strong> for disaster recovery or local reads; can themselves be Multi-AZ.</li>
  <li>Can be <strong>promoted</strong> to a standalone read-write instance, which breaks replication; this is the manual DR path.</li>
  <li>Application must route reads and writes separately (different connection strings or a proxy).</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Side by side</h4>
<pre><code class="language-text">                 Multi-AZ standby            Read replica
Purpose          High availability           Read scaling, DR, reporting
Replication      Synchronous                 Asynchronous
Serves reads     No (yes for MAZ clusters)   Yes
Failover         Automatic, same endpoint    Manual promotion, new endpoint
Cross-region     No                          Yes</code></pre>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What the application must do</h4>
<p style="line-height: 1.75;">Use the endpoint, keep DNS caching short, retry failed connections with backoff, treat in-flight transactions during failover as failed, and consider <strong>RDS Proxy</strong>, which keeps client connections open while it reconnects to the new primary and cuts perceived failover time.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Multi-AZ keeps a synchronous standby in another AZ that takes over automatically behind the same endpoint, so it is my availability story. Read replicas are asynchronous copies with their own endpoints that offload reads and can live in other regions, so they are my scalability and DR story. Production typically runs a Multi-AZ primary plus one or more read replicas."</div>
</div>`,
          examples: [
            `# Convert an existing instance to Multi-AZ (brief I/O pause while the standby is built)
aws rds modify-db-instance --db-instance-identifier app-db --multi-az --apply-immediately

# Add a read replica for reporting, and a cross-region replica for DR
aws rds create-db-instance-read-replica \\
  --db-instance-identifier app-db-reporting \\
  --source-db-instance-identifier app-db --db-instance-class db.r6g.large

aws rds create-db-instance-read-replica --region eu-west-1 \\
  --db-instance-identifier app-db-dr \\
  --source-db-instance-identifier arn:aws:rds:us-east-1:123456789012:db:app-db \\
  --kms-key-id alias/rds-eu

# Test failover behaviour (Multi-AZ) and watch the endpoint repoint
aws rds reboot-db-instance --db-instance-identifier app-db --force-failover
watch -n 5 'dig +short app-db.abc123.us-east-1.rds.amazonaws.com'

# Promote the DR replica during a regional outage (breaks replication)
aws rds promote-read-replica --region eu-west-1 --db-instance-identifier app-db-dr`,
          ],
          questions: [
            {
              question: "What is the difference between Multi-AZ and a Read Replica?",
              solution: "<p><strong>Multi-AZ</strong> is for <strong>high availability</strong>: a synchronous standby in another AZ that is not readable (in the instance deployment) and takes over automatically on failure, keeping the same endpoint. A <strong>Read Replica</strong> is for <strong>read scalability and DR</strong>: an asynchronous copy with its own endpoint that serves read traffic, can be cross-region, and must be promoted manually. You often use both: Multi-AZ primary plus several read replicas.</p>",
            },
            {
              question: "How does RDS failover work and what should the application do?",
              solution: "<p>On failure RDS promotes the standby and updates the <strong>DNS CNAME</strong> of the instance endpoint to point at it, usually within 1 to 2 minutes. The application should use the endpoint (never the IP), set a low DNS TTL/JVM cache, implement <strong>connection retry with backoff</strong>, and treat in-flight transactions as failed. RDS Proxy can hide much of this by holding client connections open during failover.</p>",
            },
            {
              question: "Can a read replica return stale data, and how do you handle it?",
              solution: "<p>Yes. Replication is <strong>asynchronous</strong>, so a replica lags the primary by anything from milliseconds to seconds (or longer under heavy write load or long-running replica queries). Monitor <code>ReplicaLag</code>. Route only lag-tolerant reads (reports, listings, search) to replicas; send <strong>read-your-own-write</strong> paths, such as showing a user the record they just saved, to the primary or add a short sticky window after writes. Aurora replicas share storage and typically lag under 20 ms.</p>",
            },
            {
              question: "What is a Multi-AZ DB cluster and how does it differ from a Multi-AZ instance?",
              solution: "<p>A <strong>Multi-AZ DB instance</strong> has one primary and one non-readable synchronous standby. A <strong>Multi-AZ DB cluster</strong> (MySQL and PostgreSQL) has one writer and <strong>two readable standbys</strong> in three AZs using semi-synchronous replication (commit acknowledged by at least one standby), a reader endpoint for read scaling, and faster failover, typically under 35 seconds, because a standby is already serving traffic. It costs more but gives both HA and read capacity in one construct.</p>",
            },
            {
              question: "How would you design RDS for regional disaster recovery?",
              solution: "<p>Create a <strong>cross-region read replica</strong> (encrypted with a key in the target region) and keep the application stack deployable there via infrastructure-as-code. During a regional outage, <strong>promote the replica</strong>, repoint the application (Route 53 failover record or config change) and accept the small data loss equal to replication lag (RPO of seconds). Also <strong>copy automated snapshots cross-region</strong> as a second layer. For near-zero RPO and one-minute RTO, Aurora Global Database is the purpose-built option.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html",
            "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html",
            "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/multi-az-db-clusters-concepts.html",
          ],
        },
        {
          topic: "Backups, Snapshots & Recovery",
          tags: ["aws", "rds", "backups", "snapshots", "point-in-time recovery"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Backups are what let you recover from the failures Multi-AZ cannot help with: a bad migration, an accidental <code>DELETE</code> without a <code>WHERE</code>, a corrupted table, or a compromised account. RDS gives you two mechanisms, and the crucial fact about both is that <strong>restoring always creates a new instance</strong>.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Automated backups</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>A daily <strong>storage-level snapshot</strong> during the backup window plus continuous upload of <strong>transaction logs</strong> to S3 every five minutes.</li>
  <li><strong>Retention</strong> 0 to 35 days (0 disables backups, never do this in production).</li>
  <li>Enable <strong>point-in-time recovery (PITR)</strong> to any second within the retention window, up to about five minutes before now.</li>
  <li>On Multi-AZ the snapshot is taken from the standby, so there is no I/O pause on the primary.</li>
  <li>Deleted with the instance unless you keep them as <strong>retained automated backups</strong> or take a final snapshot.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Manual snapshots</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>User-initiated, full storage snapshots that are <strong>kept until you delete them</strong>.</li>
  <li>Can be <strong>copied across regions</strong> (re-encrypting with a key in the target region) and <strong>shared with other accounts</strong> (unencrypted, or encrypted with a customer-managed key you share).</li>
  <li>Can be exported to <strong>S3 as Parquet</strong> for analytics with Athena without touching the live database.</li>
  <li>Take one before every risky change: major upgrade, schema migration, bulk data fix.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Restoring</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Restore creates a <strong>new instance</strong> with a new endpoint; you then repoint the application or copy the needed rows back.</li>
  <li>The new instance gets the default parameter and security groups unless you specify yours, a classic post-restore surprise.</li>
  <li>Restored instances start with <strong>lazy-loaded storage</strong>, so the first reads are slower until blocks are fetched from S3.</li>
  <li>Encrypted snapshots restore to encrypted instances; you cannot restore an unencrypted snapshot into an encrypted instance directly, but you can copy it with encryption first.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">AWS Backup</h4>
<p style="line-height: 1.75;">For organisation-wide policy, <strong>AWS Backup</strong> centralises schedules, retention, cross-region and cross-account copies and legal-hold vaults across RDS, Aurora, EBS, DynamoDB and more, with compliance reporting.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Automated backups give me daily snapshots plus transaction logs, so I can restore to any second in the retention window of up to 35 days. Manual snapshots persist until deleted and can be copied cross-region or shared with other accounts, so I take one before risky changes. Any restore creates a new instance, so I plan for a new endpoint, reapply parameter and security groups, and expect slower first reads while storage lazy-loads."</div>
</div>`,
          examples: [
            `# Point-in-time restore to just before a bad deploy (creates a new instance)
aws rds restore-db-instance-to-point-in-time \\
  --source-db-instance-identifier app-db \\
  --target-db-instance-identifier app-db-restored \\
  --restore-time 2026-09-10T14:30:00Z \\
  --db-subnet-group-name private-db-subnets --vpc-security-group-ids sg-db \\
  --db-parameter-group-name app-pg16

# Manual snapshot before a migration, then copy it to another region for DR
aws rds create-db-snapshot --db-instance-identifier app-db --db-snapshot-identifier app-db-pre-migration-2026-09-12
aws rds wait db-snapshot-available --db-snapshot-identifier app-db-pre-migration-2026-09-12
aws rds copy-db-snapshot --region eu-west-1 \\
  --source-db-snapshot-identifier arn:aws:rds:us-east-1:123456789012:snapshot:app-db-pre-migration-2026-09-12 \\
  --target-db-snapshot-identifier app-db-pre-migration-2026-09-12 --kms-key-id alias/rds-eu

# Export a snapshot to S3 as Parquet for Athena analysis
aws rds start-export-task --export-task-identifier app-db-export-2026-09 \\
  --source-arn arn:aws:rds:us-east-1:123456789012:snapshot:app-db-pre-migration-2026-09-12 \\
  --s3-bucket-name analytics-exports --iam-role-arn arn:aws:iam::123456789012:role/rds-export --kms-key-id alias/analytics`,
          ],
          questions: [
            {
              question: "What is the difference between automated backups and manual snapshots?",
              solution: "<p><strong>Automated backups</strong> are daily snapshots plus continuously archived transaction logs, retained 1 to 35 days, enabling <strong>point-in-time recovery</strong> to any second; they are deleted with the instance by default. <strong>Manual snapshots</strong> are taken on demand, <strong>persist until you delete them</strong>, and can be copied across regions, shared with other accounts, and exported to S3. Use automated backups for PITR and manual snapshots for long-term retention and pre-change safety points.</p>",
            },
            {
              question: "Someone ran a DELETE without a WHERE clause on production at 14:32. How do you recover?",
              solution: "<p>Use <strong>point-in-time recovery</strong> to restore the instance to 14:31 as a <strong>new instance</strong> (specify your subnet group, security group and parameter group). Then either extract the deleted rows from the restored copy and insert them back into production with a script or <code>pg_dump</code> of that table, or if the damage is wide, repoint the application to the restored instance and replay any writes made after 14:32. Multi-AZ would not have helped because the delete was replicated synchronously.</p>",
            },
            {
              question: "Why does a restored RDS instance sometimes perform poorly at first?",
              solution: "<p>Snapshots live in S3, and a restored volume is <strong>lazy-loaded</strong>: blocks are fetched from S3 on first access, so early reads incur extra latency until the working set has been touched. Mitigate by running a warm-up (for example <code>SELECT COUNT(*)</code> on hot tables or <code>pg_prewarm</code>) before cutting traffic over. Also verify the restored instance received the correct <strong>parameter group</strong> and <strong>security group</strong>, since defaults are applied if you do not specify them.</p>",
            },
            {
              question: "How do you share an encrypted RDS snapshot with another AWS account?",
              solution: "<p>Snapshots encrypted with the <strong>default AWS-managed RDS key cannot be shared</strong>. Copy the snapshot, encrypting it with a <strong>customer-managed KMS key</strong>, and add the target account to that key's policy with <code>kms:Decrypt</code> and <code>kms:CreateGrant</code> permissions. Then modify the snapshot attribute to add the target account ID. The target account copies the shared snapshot with its own key before restoring. Public sharing is only possible for unencrypted snapshots.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.html",
            "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PIT.html",
            "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ShareSnapshot.html",
          ],
        },
      ],
    },
    {
      id: 2,
      label: "Advance",
      concepts: [
        {
          topic: "Amazon Aurora Architecture",
          tags: ["aws", "rds", "aurora", "serverless", "global database"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>Amazon Aurora</strong> is the AWS-built relational engine compatible with MySQL and PostgreSQL. Its defining idea is to <strong>separate compute from storage</strong>: database instances are stateless and a purpose-built, distributed storage service handles durability, which changes how availability, replication and scaling work compared with standard RDS.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The storage layer</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Data is written in 10 GB segments as <strong>six copies across three AZs</strong>; a write is durable once four of six acknowledge, and reads need three of six. It survives the loss of an entire AZ plus one more copy.</li>
  <li>Only <strong>redo log records</strong> travel over the network; the storage nodes apply them, so replication traffic is a fraction of MySQL binlog volume.</li>
  <li>Storage <strong>grows automatically</strong> in 10 GB increments up to 128 TiB and shrinks when data is deleted.</li>
  <li><strong>Continuous backup</strong> to S3 with no performance impact, and <strong>Backtrack</strong> (MySQL) rewinds the cluster in place without a restore.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Compute: writer and readers</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>One <strong>writer</strong> instance and up to <strong>15 reader</strong> instances that share the same storage, so replica lag is typically under 20 ms.</li>
  <li>Any reader can be promoted; <strong>failover takes about 30 seconds</strong>, ordered by failover priority tiers.</li>
  <li><strong>Endpoints:</strong> cluster (writer), reader (load-balanced across readers), and custom endpoints for subsets such as analytics-sized instances.</li>
  <li><strong>Aurora Serverless v2</strong> scales capacity in fine-grained ACUs (0.5 ACU steps) within seconds, ideal for variable or multi-tenant workloads. Mix serverless and provisioned instances in one cluster.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Global Database</h4>
<p style="line-height: 1.75;">Storage-level replication to up to five secondary regions with typically under one second of lag, no impact on the primary, <strong>managed planned failover</strong> with zero data loss, and unplanned promotion in about a minute (RPO of seconds). <strong>Write forwarding</strong> lets applications in secondary regions issue writes that are forwarded to the primary.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Other features</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Fast database cloning</strong> (copy-on-write) creates a full-size test copy in minutes at almost no cost.</li>
  <li><strong>Parallel Query</strong> pushes analytics down to storage nodes; <strong>zero-ETL to Redshift</strong> replicates for analytics.</li>
  <li><strong>Aurora I/O-Optimized</strong> pricing removes per-I/O charges for I/O-heavy workloads.</li>
  <li>Aurora typically costs about 20% more per instance-hour than RDS MySQL/PostgreSQL but often needs fewer, smaller instances.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Aurora separates compute from a distributed storage layer that keeps six copies across three AZs and ships only redo logs. That gives me up to 15 low-lag readers sharing one storage volume, failover in about 30 seconds, continuous backups, fast clones, Serverless v2 for elastic capacity and Global Database for cross-region DR with sub-second lag. I choose it over standard RDS when I need that availability and read scale and the extra cost is justified."</div>
</div>`,
          examples: [
            `# Aurora PostgreSQL cluster with a provisioned writer and a Serverless v2 reader
aws rds create-db-cluster --db-cluster-identifier app-aurora \\
  --engine aurora-postgresql --engine-version 16.2 \\
  --master-username appadmin --manage-master-user-password \\
  --db-subnet-group-name private-db-subnets --vpc-security-group-ids sg-db \\
  --storage-encrypted --backup-retention-period 14 --deletion-protection \\
  --serverless-v2-scaling-configuration MinCapacity=0.5,MaxCapacity=16

aws rds create-db-instance --db-cluster-identifier app-aurora --db-instance-identifier app-aurora-writer \\
  --engine aurora-postgresql --db-instance-class db.r6g.large --promotion-tier 0
aws rds create-db-instance --db-cluster-identifier app-aurora --db-instance-identifier app-aurora-reader-1 \\
  --engine aurora-postgresql --db-instance-class db.serverless --promotion-tier 1

# Endpoints: send writes to the cluster endpoint, reads to the reader endpoint
aws rds describe-db-clusters --db-cluster-identifier app-aurora \\
  --query 'DBClusters[0].{writer:Endpoint,reader:ReaderEndpoint}'

# Fast clone for a realistic load test (copy-on-write, minutes, near-zero cost)
aws rds restore-db-cluster-to-point-in-time --restore-type copy-on-write --use-latest-restorable-time \\
  --source-db-cluster-identifier app-aurora --db-cluster-identifier app-aurora-loadtest

# Global database: add a secondary region
aws rds create-global-cluster --global-cluster-identifier app-global --source-db-cluster-identifier arn:aws:rds:us-east-1:123456789012:cluster:app-aurora
aws rds create-db-cluster --region eu-west-1 --db-cluster-identifier app-aurora-eu --engine aurora-postgresql \\
  --global-cluster-identifier app-global --kms-key-id alias/rds-eu`,
          ],
          questions: [
            {
              question: "How does Aurora differ from standard RDS?",
              solution: "<p>Aurora separates compute from a <strong>distributed, self-healing storage layer</strong> that writes six copies across three AZs and grows automatically to 128 TiB. This gives faster failover (about 30 seconds), up to 15 replicas that share the same storage with millisecond lag, continuous backup to S3, Backtrack for rewinding without restore, Global Database for cross-region replication, and Serverless v2 for fine-grained autoscaling. It is typically faster than community MySQL/PostgreSQL but costs more per instance hour.</p>",
            },
            {
              question: "Why is Aurora replica lag so much lower than an RDS read replica's?",
              solution: "<p>An RDS read replica has its <strong>own copy of the data</strong> and must receive and replay the primary's WAL or binlog to update it, so lag grows with write volume and replica load. Aurora readers <strong>share the same distributed storage volume</strong> as the writer; the writer only sends them small cache-invalidation and redo notifications so their in-memory buffers stay coherent. Because there is no data to copy, lag is typically 10 to 20 ms regardless of database size.</p>",
            },
            {
              question: "When would you choose Aurora Serverless v2?",
              solution: "<p>Choose Serverless v2 for <strong>variable or unpredictable load</strong>: development and test databases, multi-tenant SaaS with bursty tenants, new products with unknown traffic, or workloads with strong daily cycles. Capacity scales in 0.5 ACU increments within seconds without connection drops, and it can sit in the same cluster as provisioned instances, for example a provisioned writer with serverless readers. Steady, high, predictable load is usually cheaper on provisioned instances with reserved pricing.</p>",
            },
            {
              question: "How does Aurora Global Database support disaster recovery, and what are its RPO and RTO?",
              solution: "<p>Global Database replicates at the <strong>storage layer</strong> to up to five secondary regions with typical lag under one second and no load on the primary's compute. For an unplanned outage you <strong>detach and promote</strong> a secondary, achieving an <strong>RPO of about one second</strong> and an <strong>RTO of about one minute</strong>. For planned events, <strong>managed switchover</strong> synchronises fully first for zero data loss. Secondary regions can also serve low-latency local reads and forward writes to the primary.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html",
            "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.html",
            "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html",
          ],
        },
        {
          topic: "Connections, RDS Proxy & Security",
          tags: ["aws", "rds", "rds proxy", "iam authentication", "encryption"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Two things take down otherwise healthy databases in the cloud: <strong>connection storms</strong> from autoscaled applications, and <strong>credential sprawl</strong>. RDS Proxy, IAM authentication, Secrets Manager and a locked-down network design address both.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The connection problem</h4>
<p style="line-height: 1.75;">Every PostgreSQL connection is a process consuming several MB of memory; <code>max_connections</code> on a mid-sized instance is a few hundred. Lambda functions, Fargate tasks and pods each open their own pools, so a traffic spike to 500 concurrent workers means 500 connections, repeated TLS handshakes, and a database that spends its time on connection management instead of queries.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">RDS Proxy</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>A fully managed, highly available proxy that <strong>pools and multiplexes</strong> many client connections onto fewer database connections.</li>
  <li>Applications connect to the proxy endpoint with the same driver; the proxy authenticates using a <strong>Secrets Manager</strong> secret or <strong>IAM</strong>.</li>
  <li>During failover the proxy <strong>keeps client connections open</strong> and reconnects to the new primary, cutting perceived failover time by up to 66%.</li>
  <li>Supports read-only endpoints for Aurora readers, and <strong>pinning</strong> happens when a session uses state the proxy cannot share (prepared statements, session variables), reducing multiplexing benefit.</li>
  <li>Priced per vCPU-hour of the underlying instance; cheap relative to the outages it prevents.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Authentication and secrets</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>IAM database authentication:</strong> The application generates a 15-minute token with <code>rds:GenerateDbAuthToken</code> using its IAM role; no password to store or rotate. Limited to about 200 new connections per second, so pair it with a pool or RDS Proxy.</li>
  <li><strong>Secrets Manager managed master password</strong> (<code>--manage-master-user-password</code>) with automatic rotation; application users get their own rotated secrets.</li>
  <li>Never share the master user with applications; create least-privilege database roles per service.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Network and encryption</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Place instances in <strong>private (isolated) subnets</strong>; <code>PubliclyAccessible</code> should be false.</li>
  <li>The database security group allows the DB port <strong>only from the application security group</strong> (and a bastion or Systems Manager session for admins).</li>
  <li><strong>Encryption at rest</strong> with KMS must be enabled at creation; to encrypt an existing instance, snapshot, copy with encryption, restore.</li>
  <li><strong>Encryption in transit:</strong> require TLS with <code>rds.force_ssl=1</code> (PostgreSQL) or <code>require_secure_transport</code> (MySQL) and use the RDS CA bundle in clients.</li>
  <li>Audit with <strong>CloudTrail</strong> for API calls and engine audit logs (pgAudit, MariaDB audit plugin) exported to CloudWatch Logs.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "I put RDS in private subnets reachable only from the app security group, encrypt at rest with KMS and force TLS in transit. Applications authenticate with IAM tokens or per-service secrets from Secrets Manager with rotation, never the master user. For Lambda or autoscaled containers I add RDS Proxy so hundreds of clients share a small pool of database connections and survive failover without dropping."</div>
</div>`,
          examples: [
            `# RDS Proxy in front of the instance, authenticating with a Secrets Manager secret
aws rds create-db-proxy --db-proxy-name app-db-proxy --engine-family POSTGRESQL \\
  --auth '[{"AuthScheme":"SECRETS","SecretArn":"arn:aws:secretsmanager:us-east-1:123456789012:secret:prod/orders/db","IAMAuth":"REQUIRED"}]' \\
  --role-arn arn:aws:iam::123456789012:role/rds-proxy-role \\
  --vpc-subnet-ids subnet-data-a subnet-data-b --vpc-security-group-ids sg-db-proxy \\
  --require-tls --idle-client-timeout 1800
aws rds register-db-proxy-targets --db-proxy-name app-db-proxy --db-instance-identifiers app-db`,
            `// Node.js: connect through the proxy with a short-lived IAM auth token (no password stored)
import { Signer } from "@aws-sdk/rds-signer";
import pg from "pg";

const signer = new Signer({
  hostname: process.env.PROXY_ENDPOINT, port: 5432, username: "app_user", region: "us-east-1",
});

export async function getClient() {
  const token = await signer.getAuthToken();     // valid for 15 minutes
  const client = new pg.Client({
    host: process.env.PROXY_ENDPOINT, port: 5432, user: "app_user", database: "orders",
    password: token, ssl: { rejectUnauthorized: true },
  });
  await client.connect();
  return client;
}

// In the database, once:  CREATE USER app_user; GRANT rds_iam TO app_user;`,
          ],
          questions: [
            {
              question: "Why would you put RDS Proxy in front of a database?",
              solution: "<p>RDS Proxy pools and shares database connections so thousands of short-lived clients (typically Lambda functions or autoscaled containers) do not exhaust the database's connection limit or waste memory. It also speeds up failover by keeping client connections alive while it reconnects to the new primary, and it integrates with IAM authentication and Secrets Manager so the app never handles the database password directly.</p>",
            },
            {
              question: "How does IAM database authentication work and what are its limits?",
              solution: "<p>You create a database user mapped to IAM (for example <code>GRANT rds_iam</code> in PostgreSQL) and allow the application's IAM role the <code>rds-db:connect</code> action on that user. At connect time the application calls <code>GenerateDbAuthToken</code> to obtain a <strong>signed token valid for 15 minutes</strong> and presents it as the password over TLS. There is no long-lived secret to leak or rotate. Limits: roughly <strong>200 new connections per second</strong> and extra latency per connection, so use it with a connection pool or RDS Proxy rather than opening connections per request.</p>",
            },
            {
              question: "How do you enable encryption on an existing unencrypted RDS instance?",
              solution: "<p>Encryption at rest can only be set <strong>at creation</strong>. The procedure is: take a <strong>snapshot</strong> of the unencrypted instance, <strong>copy the snapshot with encryption</strong> enabled using a KMS key, <strong>restore</strong> the encrypted copy as a new instance, then switch the application to the new endpoint and retire the old instance. To minimise downtime, use RDS Blue/Green Deployments or replicate changes made during the cutover with DMS. Read replicas of an encrypted instance are always encrypted.</p>",
            },
            {
              question: "How do you handle a slow query problem in production RDS?",
              solution: "<p>Start with <strong>Performance Insights</strong> to find the top SQL by database load and wait events, or enable the slow query log. Run <code>EXPLAIN ANALYZE</code> on the offender, add or fix indexes, and check whether the instance is CPU, memory or IOPS bound with CloudWatch metrics. Longer term, move read-heavy reporting to a read replica, add caching (ElastiCache), and tune parameters through a custom parameter group rather than on the instance directly.</p>",
            },
            {
              question: "What network controls should protect a production RDS instance?",
              solution: "<p>Deploy it in <strong>private subnets with no internet route</strong> through a DB subnet group spanning at least two AZs, with <code>PubliclyAccessible</code> set to false. The database <strong>security group</strong> should allow the engine port only from the application tier's security group and from an admin path such as a bastion or Systems Manager Session Manager port forwarding, never from <code>0.0.0.0/0</code>. Force TLS with the engine parameter, enable deletion protection, and record configuration drift with AWS Config rules such as <code>rds-instance-public-access-check</code>.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html",
            "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.html",
            "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html",
          ],
        },
      ],
    },
  ],
};
