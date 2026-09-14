/**
 * AWS Prepare Data
 *
 * Kept in its own file (like linuxPrepareData) so the AWS section stays
 * independent of the very large prepareData.js bundle. Consumed by:
 *   - pages/category/[slug].js      (slug === "aws")
 *   - pages/learn/[...slug].js       (category === "aws")
 *   - pages/test/[...slug].js
 *   - components/learn/TopicSidebar.jsx
 *   - lib/themeUtils.js
 */
export const awsPrepareData = {
  id: 23,
  category: "aws",
  themeBgColor: "#FFF4E5",
  textColor: "#B45309",
  topicColor: "#FF9900",
  lightColor: "#FFFBEB",
  type: [
    {
      id: 1,
      label: "Beginner",
      concepts: [
        {
          topic: "EC2",
          tags: ["aws", "compute", "ec2"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>Amazon EC2 (Elastic Compute Cloud)</strong> provides resizable virtual servers (instances) in the cloud. You pick an AMI (the OS image), an instance type (CPU, memory, network), a network placement (VPC and subnet), storage (EBS volumes), and security rules (security groups). EC2 is the foundation most other compute services are built on, so interviewers use it to probe your understanding of capacity, pricing, and availability.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Key building blocks</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>AMI:</strong> A template with the OS, software, and configuration. You can bake your own with Packer or EC2 Image Builder.</li>
  <li><strong>Instance types:</strong> Families optimised for different workloads. <code>t</code> (burstable), <code>m</code> (general), <code>c</code> (compute), <code>r</code> (memory), <code>g/p</code> (GPU).</li>
  <li><strong>EBS:</strong> Network-attached block storage that persists independently of the instance. <code>gp3</code> is the default general-purpose SSD.</li>
  <li><strong>Instance store:</strong> Ephemeral local disk. Very fast, but data is lost on stop or termination.</li>
  <li><strong>Security groups:</strong> Stateful, instance-level firewalls with allow rules only.</li>
  <li><strong>Key pairs and IAM instance profiles:</strong> SSH access and the IAM role the instance assumes to call AWS APIs without hardcoded keys.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Pricing models</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>On-Demand:</strong> Pay per second, no commitment. Good for unpredictable or short workloads.</li>
  <li><strong>Savings Plans / Reserved Instances:</strong> 1 or 3 year commitment for up to ~72% discount. Good for steady baseline load.</li>
  <li><strong>Spot:</strong> Spare capacity at up to 90% off, but AWS can reclaim it with a 2-minute warning. Ideal for batch, CI, and stateless workers.</li>
  <li><strong>Dedicated Hosts:</strong> Physical server for licensing or compliance needs.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Scaling and availability</h4>
<p style="line-height: 1.75;">An <strong>Auto Scaling Group (ASG)</strong> keeps a desired number of instances healthy across multiple Availability Zones and scales on metrics such as CPU or ALB request count. Pair it with a load balancer so traffic only reaches healthy instances. <strong>User data</strong> scripts bootstrap instances at launch, and <strong>Launch Templates</strong> version that configuration.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Instance metadata (IMDSv2)</h4>
<p style="line-height: 1.75;">Instances can query <code>http://169.254.169.254/latest/meta-data/</code> for their own ID, IP, and temporary IAM credentials. Always enforce <strong>IMDSv2</strong> (session tokens) to protect against SSRF attacks that try to steal instance credentials.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "EC2 gives me virtual machines defined by an AMI and an instance type, attached to EBS storage inside a VPC subnet and protected by security groups. For availability I put them in an Auto Scaling Group across AZs behind a load balancer, and for cost I mix Savings Plans for baseline load with Spot for fault-tolerant workers."</div>
</div>`,
          examples: [
            `# Launch an instance with a launch template and user data
aws ec2 run-instances \\
  --image-id ami-0abcdef1234567890 \\
  --instance-type t3.micro \\
  --subnet-id subnet-0123 \\
  --security-group-ids sg-0456 \\
  --iam-instance-profile Name=app-instance-profile \\
  --metadata-options HttpTokens=required \\
  --user-data file://bootstrap.sh \\
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=api-1}]'

# Describe running instances in a table
aws ec2 describe-instances \\
  --filters Name=instance-state-name,Values=running \\
  --query 'Reservations[].Instances[].[InstanceId,InstanceType,PrivateIpAddress]' \\
  --output table

# Fetch IMDSv2 metadata from inside the instance
TOKEN=$(curl -sX PUT http://169.254.169.254/latest/api/token \\
  -H "X-aws-ec2-metadata-token-ttl-seconds: 300")
curl -s -H "X-aws-ec2-metadata-token: $TOKEN" \\
  http://169.254.169.254/latest/meta-data/instance-id`,
          ],
          questions: [
            {
              question: "What is the difference between stopping and terminating an EC2 instance?",
              solution: "<p><strong>Stopping</strong> shuts the instance down but keeps its EBS root volume, so you can start it again with the same data (you stop paying for compute but still pay for EBS). Instance-store data is lost either way. <strong>Terminating</strong> permanently deletes the instance, and by default deletes the root EBS volume too unless <code>DeleteOnTermination</code> is disabled. Elastic IPs stay allocated to your account (and billed) if not released.</p>",
            },
            {
              question: "When would you choose Spot Instances, and how do you handle interruptions?",
              solution: "<p>Spot is ideal for <strong>fault-tolerant, stateless or batch</strong> workloads: CI runners, data processing, rendering, ML training with checkpoints. AWS gives a <strong>2-minute interruption notice</strong> via instance metadata and EventBridge. Handle it by checkpointing work, draining connections, and using a diversified ASG (multiple instance types and AZs) with a capacity-optimised allocation strategy so replacements are available.</p>",
            },
            {
              question: "How does an EC2 instance call other AWS services securely without storing access keys?",
              solution: "<p>Attach an <strong>IAM role via an instance profile</strong>. The instance retrieves short-lived, automatically rotated credentials from the instance metadata service, and the AWS SDKs pick them up automatically. Enforce <strong>IMDSv2</strong> so an SSRF vulnerability in your app cannot easily exfiltrate those credentials. Never bake long-lived access keys into AMIs or user data.</p>",
            },
            {
              question: "What is the difference between EBS and instance store?",
              solution: "<p><strong>EBS</strong> is network-attached block storage that persists independently of the instance, can be snapshotted to S3, resized, and re-attached to another instance in the same AZ. <strong>Instance store</strong> is physically attached NVMe/SSD with very high IOPS but is <strong>ephemeral</strong>: data disappears on stop, hibernate, or hardware failure. Use instance store for caches and scratch space, EBS for anything that must survive.</p>",
            },
            {
              question: "How would you make an EC2-based web tier highly available?",
              solution: "<p>Put instances in an <strong>Auto Scaling Group spanning at least two Availability Zones</strong>, register them with an <strong>Application Load Balancer</strong> that performs health checks, and scale on a metric such as CPU or requests-per-target. Keep instances stateless by moving sessions to ElastiCache or DynamoDB and files to S3, so any instance can be replaced. Use a Launch Template for immutable, versioned configuration.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html",
            "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html",
            "https://aws.amazon.com/ec2/pricing/",
          ],
        },
        {
          topic: "S3",
          tags: ["aws", "storage", "s3", "object storage"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>Amazon S3 (Simple Storage Service)</strong> is object storage: you store files (objects) in buckets under a key, and access them over HTTPS. There is no filesystem hierarchy, only keys that may contain slashes. S3 is designed for <strong>99.999999999% (11 nines) durability</strong> by redundantly storing every object across at least three Availability Zones, and it scales to effectively unlimited data with strong read-after-write consistency.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Core concepts</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Bucket:</strong> Globally unique name, lives in one region. Objects up to 5 TB each.</li>
  <li><strong>Object:</strong> Data + key + metadata + optional version ID.</li>
  <li><strong>Consistency:</strong> Strong read-after-write for PUTs and DELETEs since December 2020.</li>
  <li><strong>Versioning:</strong> Keeps every version of an object, protecting against accidental deletes and overwrites.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Storage classes</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>S3 Standard:</strong> Frequent access, lowest latency.</li>
  <li><strong>S3 Intelligent-Tiering:</strong> Automatically moves objects between tiers based on access patterns.</li>
  <li><strong>Standard-IA / One Zone-IA:</strong> Infrequent access, cheaper storage but retrieval fees.</li>
  <li><strong>Glacier Instant / Flexible / Deep Archive:</strong> Archival, minutes-to-hours retrieval, lowest cost.</li>
</ul>
<p style="line-height: 1.75;"><strong>Lifecycle rules</strong> transition objects between classes and expire them, for example move logs to Glacier after 90 days and delete after 7 years.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Security</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Block Public Access</strong> is on by default at the account and bucket level. Keep it on.</li>
  <li><strong>Bucket policies</strong> (resource-based) and <strong>IAM policies</strong> (identity-based) control access. ACLs are legacy and disabled by default.</li>
  <li><strong>Encryption:</strong> SSE-S3 is applied by default. SSE-KMS gives key-level audit and access control. Enforce TLS with an <code>aws:SecureTransport</code> condition.</li>
  <li><strong>Pre-signed URLs</strong> grant time-limited access to a single object without making it public.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Performance and integrations</h4>
<p style="line-height: 1.75;">S3 supports at least 3,500 PUT and 5,500 GET requests per second per prefix, so spreading keys across prefixes scales throughput. Use <strong>multipart upload</strong> for objects over 100 MB. S3 <strong>Event Notifications</strong> can trigger Lambda, SQS, SNS, or EventBridge when objects are created or deleted. Static website hosting plus CloudFront is the standard way to serve a SPA.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "S3 is durable object storage with 11 nines of durability because every object is replicated across multiple AZs. I choose storage classes and lifecycle rules by access pattern, lock buckets down with Block Public Access plus bucket policies, encrypt with SSE-KMS where I need audit trails, and hand out pre-signed URLs for controlled client uploads and downloads."</div>
</div>`,
          examples: [
            `# Create a bucket with versioning and default encryption
aws s3api create-bucket --bucket my-app-assets --region us-east-1
aws s3api put-bucket-versioning --bucket my-app-assets \\
  --versioning-configuration Status=Enabled
aws s3api put-bucket-encryption --bucket my-app-assets \\
  --server-side-encryption-configuration '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"aws:kms"}}]}'

# Sync a build folder, then copy to Glacier-friendly class
aws s3 sync ./dist s3://my-app-assets/ --delete
aws s3 cp s3://my-app-assets/logs/ s3://my-archive/ --recursive --storage-class DEEP_ARCHIVE

# Generate a pre-signed download URL valid for 15 minutes
aws s3 presign s3://my-app-assets/report.pdf --expires-in 900`,
            `// Node.js: pre-signed PUT so the browser uploads directly to S3
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({ region: "us-east-1" });

export async function createUploadUrl(key, contentType) {
  const command = new PutObjectCommand({
    Bucket: "my-app-uploads",
    Key: key,
    ContentType: contentType,
  });
  return getSignedUrl(s3, command, { expiresIn: 300 });
}`,
          ],
          questions: [
            {
              question: "What does 11 nines of durability actually mean, and how does S3 achieve it?",
              solution: "<p>99.999999999% durability means that if you store 10 million objects, you can expect to lose one object roughly once every 10,000 years. S3 achieves it by <strong>synchronously storing each object across at least three Availability Zones</strong> (except One Zone-IA), continuously verifying data with checksums, and repairing any corruption automatically. Durability is about not losing data; <strong>availability</strong> (99.99% for Standard) is about being able to read it right now, and the two are different SLAs.</p>",
            },
            {
              question: "How do you make an S3 bucket private but still let users download specific files?",
              solution: "<p>Keep <strong>Block Public Access</strong> enabled and no public bucket policy. Then generate <strong>pre-signed URLs</strong> from your backend using credentials that have <code>s3:GetObject</code>. The URL embeds a signature and expiry (seconds to 7 days) so the client can fetch that one object directly from S3 without your server proxying the bytes. For a whole website, put <strong>CloudFront</strong> in front with Origin Access Control so only CloudFront can read the bucket.</p>",
            },
            {
              question: "Explain S3 storage classes and when you would use lifecycle rules.",
              solution: "<p>Standard is for hot data, Intelligent-Tiering when access patterns are unknown, Standard-IA and One Zone-IA for data read less than monthly, and the Glacier tiers for archives with retrieval times from milliseconds (Instant) to 12+ hours (Deep Archive). <strong>Lifecycle rules</strong> automate transitions and expiry, for example: keep logs in Standard for 30 days, move to Glacier Flexible at 90 days, delete at 7 years. They also clean up incomplete multipart uploads and old versions.</p>",
            },
            {
              question: "What is the S3 consistency model?",
              solution: "<p>Since December 2020 S3 provides <strong>strong read-after-write consistency</strong> for all operations: after a successful PUT (new or overwrite) or DELETE, any subsequent GET or LIST returns the latest state. Before that, overwrites and deletes were eventually consistent. This matters for pipelines that write then immediately list or read, and it removed the need for workarounds such as S3Guard.</p>",
            },
            {
              question: "How would you protect S3 data against accidental deletion or ransomware?",
              solution: "<p>Enable <strong>versioning</strong> so deletes only add a delete marker and overwrites keep the previous version. Add <strong>MFA Delete</strong> or, more practically, <strong>S3 Object Lock</strong> in compliance or governance mode for write-once-read-many retention. Use <strong>Cross-Region Replication</strong> to a separate account for an isolated copy, restrict <code>s3:DeleteObject</code> and <code>s3:PutBucketPolicy</code> via IAM, and monitor with CloudTrail data events.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html",
            "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html",
            "https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html",
          ],
        },
        {
          topic: "IAM",
          tags: ["aws", "security", "iam", "roles", "policies"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>AWS IAM (Identity and Access Management)</strong> answers two questions for every API call: <em>who are you</em> (authentication) and <em>what are you allowed to do</em> (authorization). It is global (not regional), free, and the control plane for security across every other AWS service. Interviewers care most about the difference between users, roles and policies, and how policy evaluation works.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Identities</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Root user:</strong> Owns the account. Lock it with MFA and never use it day to day.</li>
  <li><strong>IAM user:</strong> A long-lived identity with a password and/or access keys. Prefer IAM Identity Center (SSO) for humans instead.</li>
  <li><strong>IAM group:</strong> A collection of users that share policies.</li>
  <li><strong>IAM role:</strong> An identity with <strong>no long-term credentials</strong>. Something (an EC2 instance, Lambda, a user, another account, an OIDC provider like GitHub Actions) <em>assumes</em> the role via STS and receives temporary credentials.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Policies</h4>
<p style="line-height: 1.75;">Policies are JSON documents with <code>Effect</code>, <code>Action</code>, <code>Resource</code>, and optional <code>Condition</code> statements.</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Identity-based:</strong> Attached to users, groups or roles. AWS-managed, customer-managed, or inline.</li>
  <li><strong>Resource-based:</strong> Attached to the resource (S3 bucket policy, SQS queue policy, KMS key policy, Lambda permission). These can grant cross-account access directly.</li>
  <li><strong>Trust policy:</strong> The special resource policy on a role that says <em>who may assume it</em>.</li>
  <li><strong>Permissions boundary:</strong> Caps the maximum permissions an identity can ever have, useful for delegated admin.</li>
  <li><strong>Service Control Policies (SCPs):</strong> Organisation-level guardrails applied to whole accounts.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Evaluation logic</h4>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li>Everything is <strong>implicitly denied</strong> by default.</li>
  <li>An <strong>explicit Deny</strong> anywhere always wins.</li>
  <li>Otherwise the request needs an <strong>Allow</strong> that survives SCPs, permissions boundaries, and session policies.</li>
  <li>Within one account, an Allow in either the identity policy <em>or</em> the resource policy is enough. Cross-account needs both sides to allow.</li>
</ol>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Best practices</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Least privilege: start narrow, widen with IAM Access Analyzer findings.</li>
  <li>Roles over access keys everywhere: EC2 instance profiles, Lambda execution roles, ECS task roles, OIDC for CI.</li>
  <li>Require MFA for humans, rotate or eliminate access keys, use conditions such as <code>aws:SourceIp</code> and <code>aws:PrincipalOrgID</code>.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "IAM is authentication plus authorization. Users and roles are identities, policies are JSON permission documents. I prefer roles because they issue short-lived credentials through STS, and I attach least-privilege identity policies, use resource policies for cross-account sharing, and remember that an explicit deny always beats an allow."</div>
</div>`,
          examples: [
            `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ReadOwnUploads",
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject"],
      "Resource": "arn:aws:s3:::my-app-uploads/\${aws:userid}/*"
    },
    {
      "Sid": "DenyInsecureTransport",
      "Effect": "Deny",
      "Action": "s3:*",
      "Resource": "arn:aws:s3:::my-app-uploads/*",
      "Condition": { "Bool": { "aws:SecureTransport": "false" } }
    }
  ]
}`,
            `# Trust policy letting GitHub Actions assume a deploy role via OIDC
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "Federated": "arn:aws:iam::123456789012:oidc-provider/token.actions.githubusercontent.com" },
    "Action": "sts:AssumeRoleWithWebIdentity",
    "Condition": {
      "StringEquals": { "token.actions.githubusercontent.com:aud": "sts.amazonaws.com" },
      "StringLike": { "token.actions.githubusercontent.com:sub": "repo:my-org/my-repo:ref:refs/heads/main" }
    }
  }]
}

# Assume a role and check who you are
aws sts assume-role --role-arn arn:aws:iam::123456789012:role/deploy --role-session-name ci
aws sts get-caller-identity`,
          ],
          questions: [
            {
              question: "What is the difference between an IAM user and an IAM role?",
              solution: "<p>An <strong>IAM user</strong> is a permanent identity with long-lived credentials (password, access keys) that belong to one person or application. An <strong>IAM role</strong> has no credentials of its own; a trusted principal <em>assumes</em> it and receives <strong>temporary credentials</strong> from STS (15 minutes to 12 hours). Roles are preferred because credentials rotate automatically, can be scoped per session, and can be assumed across accounts or by AWS services such as EC2 and Lambda.</p>",
            },
            {
              question: "Explain how IAM policy evaluation works when there are multiple policies.",
              solution: "<p>All requests start as <strong>implicit deny</strong>. AWS evaluates every applicable policy: SCPs, resource-based policies, permissions boundaries, session policies, and identity-based policies. If any policy has an <strong>explicit Deny</strong> that matches, the request is denied, full stop. Otherwise it is allowed only if an Allow exists and is not filtered out by an SCP or permissions boundary. Cross-account access requires an Allow in both the caller's identity policy and the target resource policy.</p>",
            },
            {
              question: "What is a permissions boundary and when would you use one?",
              solution: "<p>A permissions boundary is a managed policy attached to a user or role that sets the <strong>maximum</strong> permissions that identity can have; the effective permissions are the intersection of the boundary and the identity's policies. It is used for <strong>delegated administration</strong>: you let developers create roles for their Lambda functions, but require every role to carry a boundary so they cannot grant themselves more than the boundary allows.</p>",
            },
            {
              question: "How would you give a CI/CD pipeline running outside AWS access to deploy, without storing access keys?",
              solution: "<p>Use <strong>OIDC federation</strong>. Register the CI provider (GitHub Actions, GitLab) as an IAM OIDC identity provider, create a role whose <strong>trust policy</strong> allows <code>sts:AssumeRoleWithWebIdentity</code> only for tokens from a specific repository and branch, and attach a least-privilege deploy policy. The pipeline exchanges its signed JWT for temporary credentials at runtime, so there are no static secrets to leak or rotate.</p>",
            },
            {
              question: "What is the difference between an identity-based policy and a resource-based policy?",
              solution: "<p><strong>Identity-based</strong> policies attach to a principal (user, group, role) and say what that principal can do. <strong>Resource-based</strong> policies attach to a resource (S3 bucket, SQS queue, KMS key, Lambda function) and say which principals can act on it. Resource policies have a <code>Principal</code> field and can grant access to other accounts directly; identity policies cannot. A role's trust policy is a resource-based policy on the role itself.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html",
          ],
        },
        {
          topic: "VPC",
          tags: ["aws", "networking", "vpc", "subnets", "route tables", "gateways"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>Amazon VPC (Virtual Private Cloud)</strong> is your own logically isolated network inside AWS. You choose the IP range, carve it into subnets, decide how traffic is routed, and attach gateways to reach the internet or other networks. Almost every compute and database service lives inside a VPC, so networking questions come up in most AWS interviews.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Core components</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>CIDR block:</strong> The VPC address range, for example <code>10.0.0.0/16</code> (65,536 IPs). Plan it so it does not overlap with other VPCs or on-prem networks you may peer with.</li>
  <li><strong>Subnets:</strong> Slices of the CIDR bound to <strong>one Availability Zone</strong>. AWS reserves 5 IPs per subnet.</li>
  <li><strong>Route tables:</strong> Rules that decide where traffic leaves a subnet. Every subnet has exactly one route table; the <code>local</code> route always covers the VPC itself.</li>
  <li><strong>Internet Gateway (IGW):</strong> Lets resources with public IPs talk to the internet. A subnet is "public" only if its route table sends <code>0.0.0.0/0</code> to an IGW.</li>
  <li><strong>NAT Gateway:</strong> Lets private subnets make outbound calls (package updates, third-party APIs) without accepting inbound connections. Deployed per AZ for resilience.</li>
  <li><strong>Security Groups:</strong> Stateful, instance-level, allow rules only. Can reference other security groups.</li>
  <li><strong>Network ACLs:</strong> Stateless, subnet-level, ordered allow and deny rules. Default NACL allows everything.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Typical three-tier layout</h4>
<pre><code class="language-text">VPC 10.0.0.0/16
  Public subnets   10.0.0.0/24 (AZ-a), 10.0.1.0/24 (AZ-b)   -> ALB, NAT GW, bastion
  Private app      10.0.10.0/24, 10.0.11.0/24             -> ECS tasks, EC2, Lambda (VPC)
  Private data     10.0.20.0/24, 10.0.21.0/24             -> RDS, ElastiCache (no internet route)</code></pre>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Connecting beyond the VPC</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>VPC Peering:</strong> One-to-one private link between two VPCs. Not transitive.</li>
  <li><strong>Transit Gateway:</strong> Hub-and-spoke router for many VPCs and on-prem connections.</li>
  <li><strong>VPC Endpoints:</strong> Gateway endpoints (S3, DynamoDB) and Interface endpoints (PrivateLink) keep traffic to AWS services off the public internet and avoid NAT charges.</li>
  <li><strong>Site-to-Site VPN / Direct Connect:</strong> Hybrid connectivity to on-premises data centres.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Observability</h4>
<p style="line-height: 1.75;"><strong>VPC Flow Logs</strong> capture accepted and rejected traffic metadata per ENI, subnet or VPC into CloudWatch Logs or S3. They are the first tool for debugging "why can't service A reach service B".</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "A VPC is my isolated network with a CIDR range split into subnets per AZ. Route tables decide where traffic goes: a subnet is public if it routes to an Internet Gateway, private if it goes through a NAT Gateway or has no internet route. Security groups are stateful instance firewalls, NACLs are stateless subnet filters, and I use VPC endpoints so traffic to S3 or DynamoDB never leaves the AWS network."</div>
</div>`,
          examples: [
            `# Create a VPC with a public and a private subnet
aws ec2 create-vpc --cidr-block 10.0.0.0/16 \\
  --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=app-vpc}]'
aws ec2 create-subnet --vpc-id vpc-0abc --cidr-block 10.0.0.0/24  --availability-zone us-east-1a
aws ec2 create-subnet --vpc-id vpc-0abc --cidr-block 10.0.10.0/24 --availability-zone us-east-1a

# Internet gateway + public route
aws ec2 create-internet-gateway
aws ec2 attach-internet-gateway --vpc-id vpc-0abc --internet-gateway-id igw-0def
aws ec2 create-route --route-table-id rtb-public --destination-cidr-block 0.0.0.0/0 --gateway-id igw-0def

# NAT gateway in the public subnet, private route through it
aws ec2 allocate-address --domain vpc
aws ec2 create-nat-gateway --subnet-id subnet-public --allocation-id eipalloc-0123
aws ec2 create-route --route-table-id rtb-private --destination-cidr-block 0.0.0.0/0 --nat-gateway-id nat-0456

# Gateway endpoint so private subnets reach S3 without NAT
aws ec2 create-vpc-endpoint --vpc-id vpc-0abc --service-name com.amazonaws.us-east-1.s3 \\
  --route-table-ids rtb-private`,
            `# Security group chaining: only the ALB may reach the app tier
aws ec2 authorize-security-group-ingress --group-id sg-app \\
  --protocol tcp --port 8080 --source-group sg-alb

# Only the app tier may reach the database
aws ec2 authorize-security-group-ingress --group-id sg-db \\
  --protocol tcp --port 5432 --source-group sg-app`,
          ],
          questions: [
            {
              question: "What makes a subnet public versus private?",
              solution: "<p>Nothing about the subnet itself. A subnet is <strong>public</strong> when its associated <strong>route table</strong> has a route for <code>0.0.0.0/0</code> pointing to an <strong>Internet Gateway</strong>, and instances in it have public or Elastic IPs. A subnet is <strong>private</strong> when its default route goes to a <strong>NAT Gateway</strong> (outbound only) or there is no internet route at all. The same CIDR could be either depending on routing.</p>",
            },
            {
              question: "Compare Security Groups and Network ACLs.",
              solution: "<p><strong>Security Groups</strong> operate at the ENI/instance level, are <strong>stateful</strong> (return traffic is automatically allowed), support only <strong>allow</strong> rules, and can reference other security groups as sources. <strong>NACLs</strong> operate at the subnet level, are <strong>stateless</strong> (you must allow ephemeral return ports explicitly), support <strong>allow and deny</strong> rules evaluated in number order, and apply to every resource in the subnet. Security groups are the day-to-day tool; NACLs are a coarse extra layer, for example to block a malicious IP range.</p>",
            },
            {
              question: "Why would you use a VPC endpoint instead of a NAT Gateway to reach S3?",
              solution: "<p>A <strong>Gateway VPC endpoint</strong> for S3 or DynamoDB adds a route so traffic to those services stays on the AWS backbone and never traverses the internet or the NAT Gateway. That is more secure (you can restrict the bucket policy to <code>aws:sourceVpce</code>) and much cheaper, since NAT Gateways charge per GB processed. Interface endpoints (PrivateLink) do the same for most other services via an ENI with a private IP.</p>",
            },
            {
              question: "Why is VPC peering not transitive, and what do you use when you have many VPCs?",
              solution: "<p>Peering creates a direct one-to-one route between two VPCs; AWS does not forward traffic from VPC A through VPC B to VPC C because routes are only installed for the two peers and overlapping CIDRs would be ambiguous. For many VPCs (or VPCs plus on-prem) you use a <strong>Transit Gateway</strong>, a regional hub that each VPC attaches to once, with route tables controlling which attachments can talk to each other.</p>",
            },
            {
              question: "An EC2 instance in a private subnet cannot reach an external API. How do you debug it?",
              solution: "<p>Work through the path: (1) Does the subnet's <strong>route table</strong> have <code>0.0.0.0/0</code> to a NAT Gateway, and is that NAT Gateway in a public subnet with an IGW route? (2) Does the <strong>security group</strong> allow outbound 443? (3) Does the <strong>NACL</strong> allow outbound 443 and inbound ephemeral ports 1024-65535? (4) Check <strong>VPC Flow Logs</strong> for REJECT records to see which layer is dropping. (5) Confirm DNS resolution works (VPC DNS enabled). Reachability Analyzer can also trace the path automatically.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html",
            "https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Security.html",
            "https://docs.aws.amazon.com/vpc/latest/privatelink/concepts.html",
          ],
        },
        {
          topic: "Lambda",
          tags: ["aws", "serverless", "lambda", "event-driven", "compute"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>AWS Lambda</strong> is serverless, event-driven compute: you upload a function, choose memory, and AWS runs it in response to events, scaling from zero to thousands of concurrent executions and billing only for the milliseconds used. There are no servers to patch or capacity to plan, which makes Lambda the default glue for APIs, file processing, stream consumers and scheduled jobs.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">How it runs</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Handler:</strong> The entry point that receives <code>(event, context)</code>. Runtimes include Node.js, Python, Java, Go, .NET, Ruby, or a container image up to 10 GB.</li>
  <li><strong>Execution environment:</strong> A micro-VM (Firecracker) that is created on a <strong>cold start</strong> and reused for subsequent <strong>warm</strong> invocations. Initialise SDK clients and DB connections outside the handler to reuse them.</li>
  <li><strong>Configuration:</strong> Memory 128 MB to 10 GB (CPU scales with memory), timeout up to 15 minutes, 512 MB to 10 GB ephemeral <code>/tmp</code>, environment variables, layers for shared dependencies.</li>
  <li><strong>Execution role:</strong> The IAM role the function assumes to call other AWS services.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Invocation models</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Synchronous:</strong> API Gateway, ALB, Function URLs, direct SDK <code>Invoke</code>. Caller waits for the response and handles errors.</li>
  <li><strong>Asynchronous:</strong> S3, SNS, EventBridge. Lambda queues the event, retries twice, then sends to a dead-letter queue or failure destination.</li>
  <li><strong>Poll-based (event source mapping):</strong> SQS, Kinesis, DynamoDB Streams, Kafka. Lambda polls and invokes with batches; batch size, batching window and partial-batch responses control throughput.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Scaling and concurrency</h4>
<p style="line-height: 1.75;">Each concurrent request runs in its own environment. Accounts start with 1,000 concurrent executions per region (soft limit). <strong>Reserved concurrency</strong> caps a function (and protects downstream databases); <strong>provisioned concurrency</strong> keeps environments pre-warmed to eliminate cold starts for latency-sensitive APIs.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Best practices</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Keep functions small and single purpose; make handlers <strong>idempotent</strong> because retries happen.</li>
  <li>Minimise package size and use ARM (Graviton) for cheaper, often faster execution.</li>
  <li>Use <strong>RDS Proxy</strong> when connecting to relational databases to avoid connection storms.</li>
  <li>Emit structured JSON logs, enable X-Ray tracing, alarm on <code>Errors</code>, <code>Throttles</code> and <code>Duration</code>.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Lambda runs my code in response to events without servers, scaling per request and billing per millisecond. I understand the three invocation models, design handlers to be idempotent because async and poll-based sources retry, reuse clients outside the handler to reduce cold-start cost, and use reserved or provisioned concurrency to protect downstream systems and control latency."</div>
</div>`,
          examples: [
            `// index.mjs - S3 upload -> resize image -> write to another bucket
import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

// Created once per execution environment and reused across warm invocations
const s3 = new S3Client({});

export const handler = async (event) => {
  for (const record of event.Records) {
    const bucket = record.s3.bucket.name;
    const key = decodeURIComponent(record.s3.object.key.replace(/\\+/g, " "));

    const original = await s3.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
    const resized = await sharp(await original.Body.transformToByteArray())
      .resize(400)
      .toBuffer();

    await s3.send(new PutObjectCommand({
      Bucket: process.env.THUMBNAIL_BUCKET,
      Key: "thumbs/" + key,
      Body: resized,
      ContentType: "image/jpeg",
    }));
  }
  return { processed: event.Records.length };
};`,
            `# Deploy and invoke with the CLI
zip -r function.zip index.mjs node_modules
aws lambda create-function --function-name resize-images \\
  --runtime nodejs20.x --architectures arm64 --handler index.handler \\
  --role arn:aws:iam::123456789012:role/resize-images-role \\
  --zip-file fileb://function.zip --memory-size 1024 --timeout 30 \\
  --environment Variables={THUMBNAIL_BUCKET=my-thumbs}

aws lambda invoke --function-name resize-images \\
  --payload file://s3-event.json --cli-binary-format raw-in-base64-out out.json

# Cap concurrency to protect a downstream database
aws lambda put-function-concurrency --function-name resize-images --reserved-concurrent-executions 50`,
          ],
          questions: [
            {
              question: "What is a cold start and how do you reduce its impact?",
              solution: "<p>A cold start is the latency added when Lambda must create a new execution environment: download the code, start the runtime, and run your initialisation code. Reduce it by keeping deployment packages small, using lighter runtimes (Node, Python, Go) or SnapStart for Java, initialising clients outside the handler so warm invocations reuse them, choosing ARM, and for latency-critical paths enabling <strong>provisioned concurrency</strong> so environments are pre-initialised before traffic arrives.</p>",
            },
            {
              question: "How does Lambda handle failures for synchronous, asynchronous and stream-based invocations?",
              solution: "<p><strong>Synchronous:</strong> the error is returned to the caller, which decides whether to retry. <strong>Asynchronous:</strong> Lambda retries up to two more times with backoff, then routes the event to an on-failure destination or dead-letter queue. <strong>Poll-based (SQS):</strong> a failed batch becomes visible again after the visibility timeout and is retried until <code>maxReceiveCount</code> sends it to the queue's DLQ; use partial-batch responses to only retry failed messages. <strong>Kinesis/DynamoDB Streams:</strong> the shard is blocked and the batch retried until success, record expiry, or bisect/max-retry settings kick in, so poison records need explicit handling.</p>",
            },
            {
              question: "What is the difference between reserved and provisioned concurrency?",
              solution: "<p><strong>Reserved concurrency</strong> sets a hard maximum number of concurrent executions for a function and guarantees that share of the account limit; requests above it are throttled. It is used to protect downstream resources or isolate noisy functions, and it is free. <strong>Provisioned concurrency</strong> pre-initialises a fixed number of execution environments so those invocations never cold start; you pay for the warm capacity whether or not it is used, and you can scale it on a schedule with Application Auto Scaling.</p>",
            },
            {
              question: "Why should Lambda functions be idempotent, and how do you implement that?",
              solution: "<p>Asynchronous and poll-based sources deliver <strong>at-least-once</strong>, so the same event can be processed twice after a timeout or retry. Idempotency means the second run has no additional effect. Implement it by deriving an idempotency key from the event (message ID, order ID), storing it in DynamoDB with a conditional write and TTL before doing the side effect, and skipping when the key exists. AWS Lambda Powertools provides a ready-made idempotency decorator for this pattern.</p>",
            },
            {
              question: "When would you not use Lambda?",
              solution: "<p>Avoid Lambda for jobs longer than <strong>15 minutes</strong>, workloads needing more than 10 GB memory or GPUs, long-lived connections such as WebSockets you manage yourself, very high steady throughput where per-request pricing exceeds a right-sized container, or applications with heavy startup costs and strict p99 latency that provisioned concurrency cannot economically cover. In those cases ECS/Fargate, EKS, or Batch are better fits.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html",
            "https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html",
            "https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html",
          ],
        },
        {
          topic: "RDS",
          tags: ["aws", "database", "rds", "aurora", "sql"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>Amazon RDS (Relational Database Service)</strong> is a managed relational database. AWS handles provisioning, patching, backups, failover and monitoring for PostgreSQL, MySQL, MariaDB, Oracle, SQL Server and Amazon Aurora, while you keep full control over schema and queries. You still choose instance size, storage and network placement, so RDS questions test whether you understand availability versus scalability trade-offs.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Availability: Multi-AZ</h4>
<p style="line-height: 1.75;">A <strong>Multi-AZ</strong> deployment keeps a synchronous standby replica in another Availability Zone. The standby serves no reads; it exists for <strong>automatic failover</strong> (typically 60 to 120 seconds) when the primary, its AZ, or its storage fails. The DNS endpoint stays the same, so applications reconnect without config changes. Multi-AZ DB clusters add two readable standbys with faster failover.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Scalability: Read Replicas</h4>
<p style="line-height: 1.75;"><strong>Read replicas</strong> use asynchronous replication and have their own endpoints. They offload reporting and read-heavy traffic, can live in other regions for disaster recovery, and can be promoted to a standalone primary. Because replication is asynchronous, reads may be slightly stale.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Backups and recovery</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Automated backups:</strong> Daily snapshot plus transaction logs, retained 1 to 35 days, enabling <strong>point-in-time recovery</strong> to any second in the window.</li>
  <li><strong>Manual snapshots:</strong> Kept until you delete them; can be copied across regions and shared across accounts.</li>
  <li>Restoring always creates a <strong>new instance</strong>; you cannot restore in place.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Aurora</h4>
<p style="line-height: 1.75">Aurora is the AWS-built MySQL and PostgreSQL compatible engine with a distributed storage layer that keeps <strong>six copies across three AZs</strong>, supports up to 15 low-lag read replicas, failover in around 30 seconds, and <strong>Aurora Serverless v2</strong> for auto-scaling capacity. Aurora Global Database replicates to other regions with about one second of lag.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Operations checklist</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Place RDS in <strong>private subnets</strong>; allow only the app security group on the DB port.</li>
  <li>Enable encryption at rest (KMS) at creation time; it cannot be added later without a snapshot copy.</li>
  <li>Use <strong>RDS Proxy</strong> in front of Lambda or bursty apps to pool connections.</li>
  <li>Watch <code>CPUUtilization</code>, <code>FreeableMemory</code>, <code>DatabaseConnections</code>, <code>ReadLatency</code>, and use <strong>Performance Insights</strong> for slow queries.</li>
  <li>Store credentials in Secrets Manager with automatic rotation.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "RDS is managed relational databases. Multi-AZ is for availability: a synchronous standby that takes over automatically. Read replicas are for scalability: asynchronous copies that serve reads. I keep the instance in private subnets, encrypt it, back it up with point-in-time recovery, and front it with RDS Proxy when connections are bursty."</div>
</div>`,
          examples: [
            `# Create an encrypted Multi-AZ PostgreSQL instance in private subnets
aws rds create-db-instance \\
  --db-instance-identifier app-db \\
  --engine postgres --engine-version 16 \\
  --db-instance-class db.r6g.large \\
  --allocated-storage 100 --storage-type gp3 \\
  --multi-az --storage-encrypted \\
  --db-subnet-group-name private-db-subnets \\
  --vpc-security-group-ids sg-db \\
  --master-username appadmin --manage-master-user-password \\
  --backup-retention-period 14 --deletion-protection

# Add a read replica for reporting
aws rds create-db-instance-read-replica \\
  --db-instance-identifier app-db-reporting \\
  --source-db-instance-identifier app-db

# Restore to a point in time (creates a new instance)
aws rds restore-db-instance-to-point-in-time \\
  --source-db-instance-identifier app-db \\
  --target-db-instance-identifier app-db-restored \\
  --restore-time 2026-09-10T14:30:00Z`,
          ],
          questions: [
            {
              question: "What is the difference between Multi-AZ and a Read Replica?",
              solution: "<p><strong>Multi-AZ</strong> is for <strong>high availability</strong>: a synchronous standby in another AZ that is not readable and takes over automatically on failure, keeping the same endpoint. A <strong>Read Replica</strong> is for <strong>read scalability and DR</strong>: an asynchronous copy with its own endpoint that serves read traffic, can be cross-region, and must be promoted manually. You often use both: Multi-AZ primary plus several read replicas.</p>",
            },
            {
              question: "How does RDS failover work and what should the application do?",
              solution: "<p>On failure RDS promotes the standby and updates the <strong>DNS CNAME</strong> of the instance endpoint to point at it, usually within 1 to 2 minutes. The application should use the endpoint (never the IP), set a low DNS TTL/JVM cache, implement <strong>connection retry with backoff</strong>, and treat in-flight transactions as failed. RDS Proxy can hide much of this by holding client connections open during failover.</p>",
            },
            {
              question: "Why would you put RDS Proxy in front of a database?",
              solution: "<p>RDS Proxy pools and shares database connections so thousands of short-lived clients (typically Lambda functions or autoscaled containers) do not exhaust the database's connection limit or waste memory. It also speeds up failover by keeping client connections alive while it reconnects to the new primary, and it integrates with IAM authentication and Secrets Manager so the app never handles the database password directly.</p>",
            },
            {
              question: "How does Aurora differ from standard RDS?",
              solution: "<p>Aurora separates compute from a <strong>distributed, self-healing storage layer</strong> that writes six copies across three AZs and grows automatically to 128 TiB. This gives faster failover (about 30 seconds), up to 15 replicas that share the same storage with millisecond lag, continuous backup to S3, Backtrack for rewinding without restore, Global Database for cross-region replication, and Serverless v2 for fine-grained autoscaling. It is typically faster than community MySQL/PostgreSQL but costs more per instance hour.</p>",
            },
            {
              question: "How do you handle a slow query problem in production RDS?",
              solution: "<p>Start with <strong>Performance Insights</strong> to find the top SQL by database load and wait events, or enable the slow query log. Run <code>EXPLAIN ANALYZE</code> on the offender, add or fix indexes, and check whether the instance is CPU, memory or IOPS bound with CloudWatch metrics. Longer term, move read-heavy reporting to a read replica, add caching (ElastiCache), and tune parameters through a custom parameter group rather than on the instance directly.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html",
            "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html",
            "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html",
          ],
        },
        {
          topic: "ELB",
          tags: ["aws", "load balancing", "alb", "nlb", "elb"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>Elastic Load Balancing (ELB)</strong> distributes incoming traffic across healthy targets (EC2 instances, containers, IP addresses, Lambda functions) in multiple Availability Zones. It is the entry point for most AWS web architectures, providing health checks, TLS termination and integration with Auto Scaling.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Load balancer types</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Application Load Balancer (ALB):</strong> Layer 7 (HTTP/HTTPS, gRPC, WebSockets). Routes on host, path, headers, query string and HTTP method. Supports Lambda targets, fixed responses, redirects, authentication via Cognito or OIDC, and sticky sessions.</li>
  <li><strong>Network Load Balancer (NLB):</strong> Layer 4 (TCP, UDP, TLS). Ultra-low latency, millions of requests per second, <strong>static IPs</strong> and Elastic IP support, preserves client source IP. Used for non-HTTP protocols and PrivateLink.</li>
  <li><strong>Gateway Load Balancer (GWLB):</strong> Layer 3, for inserting third-party firewalls and inspection appliances transparently.</li>
  <li><strong>Classic Load Balancer:</strong> Legacy; avoid for new work.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Building blocks</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Listener:</strong> Port and protocol the LB accepts, for example HTTPS:443 with an ACM certificate.</li>
  <li><strong>Rules:</strong> Ordered conditions that forward to target groups, for example <code>/api/*</code> to the API service.</li>
  <li><strong>Target group:</strong> Set of targets plus <strong>health check</strong> settings (path, interval, healthy/unhealthy thresholds) and a routing algorithm (round robin, least outstanding requests).</li>
  <li><strong>Cross-zone load balancing:</strong> Spread traffic evenly across all targets regardless of AZ (always on for ALB).</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Common patterns</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Public ALB in public subnets forwards to ECS tasks or EC2 in private subnets. Only the ALB security group is allowed to reach the app tier.</li>
  <li>Terminate TLS at the ALB with a free <strong>ACM</strong> certificate; redirect HTTP to HTTPS with a listener rule.</li>
  <li>Attach <strong>AWS WAF</strong> to the ALB for OWASP rules and rate limiting.</li>
  <li>Use <strong>weighted target groups</strong> for blue/green or canary releases.</li>
  <li>Enable <strong>access logs</strong> to S3 and alarm on <code>HTTPCode_Target_5XX_Count</code>, <code>TargetResponseTime</code> and <code>UnHealthyHostCount</code>.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; font-size: 0.9rem; border-radius: 4px;"><strong>🎯 Interview Answer:</strong> "I use an ALB for HTTP workloads because it routes on paths and hosts, terminates TLS with ACM, integrates with WAF and Cognito, and supports weighted target groups for canaries. I use an NLB when I need static IPs, raw TCP/UDP, or extreme throughput. Health checks in the target group decide which targets receive traffic, and I chain security groups so only the load balancer can reach my services."</div>
</div>`,
          examples: [
            `# Create an internet-facing ALB with an HTTPS listener and path routing
aws elbv2 create-load-balancer --name app-alb --scheme internet-facing \\
  --subnets subnet-pub-a subnet-pub-b --security-groups sg-alb

aws elbv2 create-target-group --name api-tg --protocol HTTP --port 8080 \\
  --vpc-id vpc-0abc --target-type ip \\
  --health-check-path /health --health-check-interval-seconds 15 \\
  --healthy-threshold-count 2 --unhealthy-threshold-count 3

aws elbv2 create-listener --load-balancer-arn <alb-arn> \\
  --protocol HTTPS --port 443 \\
  --certificates CertificateArn=<acm-cert-arn> \\
  --ssl-policy ELBSecurityPolicy-TLS13-1-2-2021-06 \\
  --default-actions Type=forward,TargetGroupArn=<web-tg-arn>

aws elbv2 create-rule --listener-arn <listener-arn> --priority 10 \\
  --conditions Field=path-pattern,Values='/api/*' \\
  --actions Type=forward,TargetGroupArn=<api-tg-arn>

# Redirect HTTP -> HTTPS
aws elbv2 create-listener --load-balancer-arn <alb-arn> --protocol HTTP --port 80 \\
  --default-actions 'Type=redirect,RedirectConfig={Protocol=HTTPS,Port=443,StatusCode=HTTP_301}'`,
            `# Canary: send 10% of traffic to the new target group
aws elbv2 modify-listener --listener-arn <listener-arn> --default-actions \\
  'Type=forward,ForwardConfig={TargetGroups=[{TargetGroupArn=<blue-tg>,Weight=90},{TargetGroupArn=<green-tg>,Weight=10}]}'`,
          ],
          questions: [
            {
              question: "When would you choose an ALB versus an NLB?",
              solution: "<p>Choose an <strong>ALB</strong> for HTTP/HTTPS, gRPC and WebSocket traffic when you need content-based routing (host, path, headers), TLS termination with ACM, WAF, OIDC/Cognito authentication, or Lambda targets. Choose an <strong>NLB</strong> when you need <strong>static or Elastic IPs</strong> (for customer allowlists), non-HTTP protocols such as TCP/UDP/TLS passthrough, ultra-low latency at very high throughput, client IP preservation at layer 4, or to expose a service through PrivateLink. An NLB can also front an ALB when you need both.</p>",
            },
            {
              question: "How do health checks work and what happens when all targets are unhealthy?",
              solution: "<p>The load balancer sends a request to the health check path at the configured interval; a target is marked healthy after N consecutive successes and unhealthy after M failures, and unhealthy targets stop receiving new requests. Auto Scaling can be configured to use ELB health checks so unhealthy instances are replaced. If <strong>all</strong> targets in a target group are unhealthy, the load balancer <strong>fails open</strong> and routes to all of them anyway, on the assumption that the health check may be wrong.</p>",
            },
            {
              question: "How does the ALB preserve the original client IP, and why does it matter?",
              solution: "<p>Because the ALB terminates the connection, the backend sees the ALB's private IP as the source. The ALB adds the <code>X-Forwarded-For</code> header with the client IP, plus <code>X-Forwarded-Proto</code> and <code>X-Forwarded-Port</code>. Applications must read these for rate limiting, geo logic and audit logs, and must trust only the last hop to avoid spoofing. An NLB, by contrast, preserves the source IP at the TCP level by default for instance and IP targets.</p>",
            },
            {
              question: "What are sticky sessions and why should you avoid depending on them?",
              solution: "<p>Sticky sessions (session affinity) make the ALB send a given client to the same target using a load-balancer or application cookie. They help legacy apps that keep session state in memory, but they undermine even load distribution, complicate scale-in and deployments, and lose sessions when a target dies. The better design is <strong>stateless targets</strong> with session data in ElastiCache, DynamoDB or a signed JWT.</p>",
            },
            {
              question: "How would you do a zero-downtime deployment behind an ALB?",
              solution: "<p>Use <strong>blue/green with two target groups</strong>: deploy the new version to the green group, wait for its health checks to pass, then shift traffic with weighted forwarding (canary 10%, 50%, 100%) or swap the listener rule. Configure <strong>connection draining (deregistration delay)</strong> so in-flight requests finish before old targets are removed, and roll back by re-pointing to blue. ECS and CodeDeploy automate exactly this pattern.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html",
            "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html",
            "https://docs.aws.amazon.com/elasticloadbalancing/latest/network/introduction.html",
          ],
        },
        {
          topic: "CloudWatch & CloudTrail",
          tags: ["aws", "observability", "cloudwatch", "cloudtrail", "logging", "monitoring"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>CloudWatch</strong> and <strong>CloudTrail</strong> are frequently confused, so interviewers love asking about them together. CloudWatch is about <strong>how your systems are performing</strong> (metrics, logs, alarms, dashboards). CloudTrail is about <strong>who did what in your AWS account</strong> (an audit log of API calls). You need both: CloudWatch tells you the database CPU spiked, CloudTrail tells you which IAM user resized the instance five minutes earlier.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">CloudWatch</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Metrics:</strong> Time-series data with namespaces and dimensions. AWS services publish default metrics (EC2 CPU every 5 minutes, 1 minute with detailed monitoring). Custom metrics via <code>PutMetricData</code> or the Embedded Metric Format in logs. EC2 memory and disk need the CloudWatch Agent.</li>
  <li><strong>Logs:</strong> Log groups contain log streams. Set <strong>retention</strong> (default is never expire, which costs money). <strong>Logs Insights</strong> is the query language. <strong>Metric filters</strong> turn log patterns into metrics. <strong>Subscription filters</strong> stream logs to Lambda, Kinesis or OpenSearch.</li>
  <li><strong>Alarms:</strong> Watch a metric or math expression over evaluation periods and move between OK, ALARM and INSUFFICIENT_DATA. Actions include SNS notifications, Auto Scaling policies and EC2 recovery. <strong>Composite alarms</strong> reduce noise by combining several alarms.</li>
  <li><strong>Dashboards, Synthetics (canaries), RUM, ServiceLens and X-Ray</strong> round out the observability picture.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">CloudTrail</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Records every <strong>management event</strong> (control-plane call such as <code>RunInstances</code>, <code>PutBucketPolicy</code>, <code>AssumeRole</code>) with the caller identity, source IP, time, parameters and response.</li>
  <li><strong>Event history</strong> in the console keeps 90 days for free. A <strong>trail</strong> delivers events to S3 (and optionally CloudWatch Logs) for long-term retention and analysis with Athena.</li>
  <li><strong>Data events</strong> (S3 object-level, Lambda invoke, DynamoDB item access) are opt-in and high volume.</li>
  <li><strong>Organisation trails</strong> cover every account; enable <strong>log file validation</strong> and store logs in a locked-down security account.</li>
  <li><strong>CloudTrail Lake</strong> lets you run SQL over events without managing S3 and Athena yourself.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Putting them together</h4>
<p style="line-height: 1.75;">Send CloudTrail to CloudWatch Logs, create metric filters for sensitive actions (root login, security group changes, <code>DeleteTrail</code>), and alarm to SNS. Route CloudTrail events through <strong>EventBridge</strong> for real-time automated responses.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "CloudWatch is operational telemetry: metrics, logs, alarms, dashboards. CloudTrail is the audit trail of API calls: who did what, when, from where. I ship CloudTrail to S3 for retention and to CloudWatch Logs so I can metric-filter and alarm on suspicious actions, and I set log retention everywhere so observability does not become the biggest line item on the bill."</div>
</div>`,
          examples: [
            `# Publish a custom metric and alarm on it
aws cloudwatch put-metric-data --namespace MyApp --metric-name OrdersFailed \\
  --dimensions Service=checkout --value 1 --unit Count

aws cloudwatch put-metric-alarm --alarm-name checkout-failures-high \\
  --namespace MyApp --metric-name OrdersFailed --dimensions Name=Service,Value=checkout \\
  --statistic Sum --period 60 --evaluation-periods 3 --datapoints-to-alarm 2 \\
  --threshold 10 --comparison-operator GreaterThanThreshold \\
  --treat-missing-data notBreaching \\
  --alarm-actions arn:aws:sns:us-east-1:123456789012:oncall

# Logs Insights: top 5 slowest requests in the last hour
aws logs start-query --log-group-name /ecs/checkout \\
  --start-time $(date -v-1H +%s) --end-time $(date +%s) \\
  --query-string 'fields @timestamp, path, durationMs | filter durationMs > 500 | sort durationMs desc | limit 5'

# Set retention so logs do not live forever
aws logs put-retention-policy --log-group-name /ecs/checkout --retention-in-days 30`,
            `# Find who deleted a security group in the last 7 days
aws cloudtrail lookup-events \\
  --lookup-attributes AttributeKey=EventName,AttributeValue=DeleteSecurityGroup \\
  --start-time $(date -v-7d +%Y-%m-%dT%H:%M:%SZ) \\
  --query 'Events[].{time:EventTime,user:Username,source:CloudTrailEvent}' --output json

# Metric filter that counts root account console logins
aws logs put-metric-filter --log-group-name CloudTrail/Default \\
  --filter-name RootLogin \\
  --filter-pattern '{ $.userIdentity.type = "Root" && $.eventName = "ConsoleLogin" }' \\
  --metric-transformations metricName=RootLoginCount,metricNamespace=Security,metricValue=1`,
          ],
          questions: [
            {
              question: "What is the difference between CloudWatch and CloudTrail?",
              solution: "<p><strong>CloudWatch</strong> is a monitoring service for <strong>performance and operational data</strong>: metrics such as CPU or latency, application and system logs, alarms, dashboards. <strong>CloudTrail</strong> is an <strong>audit and governance</strong> service that records API calls made in the account: the identity, time, source IP, parameters and result of actions such as launching an instance or changing a bucket policy. CloudWatch answers is it healthy; CloudTrail answers who changed it.</p>",
            },
            {
              question: "How do you monitor memory and disk usage on EC2 with CloudWatch?",
              solution: "<p>EC2 only reports hypervisor-visible metrics (CPU, network, disk I/O counts, status checks). Memory, disk space and process metrics live inside the OS, so you install the <strong>CloudWatch Agent</strong>, configure it (often via SSM Parameter Store) to collect <code>mem_used_percent</code> and <code>disk_used_percent</code>, and give the instance an IAM role with <code>CloudWatchAgentServerPolicy</code>. The agent can also ship application log files to CloudWatch Logs.</p>",
            },
            {
              question: "Explain alarm states and how you avoid flapping and noisy alerts.",
              solution: "<p>An alarm is in <strong>OK</strong>, <strong>ALARM</strong> or <strong>INSUFFICIENT_DATA</strong>. It transitions based on N out of M evaluation periods (<code>datapoints-to-alarm</code>), which suppresses single spikes. Configure <code>treat-missing-data</code> deliberately (for example notBreaching for sparse error metrics), use percentiles or metric math for meaningful signals, and combine related alarms into a <strong>composite alarm</strong> so on-call gets one page for a service outage instead of ten.</p>",
            },
            {
              question: "What are CloudTrail management events versus data events?",
              solution: "<p><strong>Management events</strong> are control-plane operations on resources: creating, modifying, deleting, and read-only describe calls. They are logged by default for the last 90 days and by any trail. <strong>Data events</strong> are high-volume data-plane operations on the resources themselves: S3 <code>GetObject</code>/<code>PutObject</code>, Lambda <code>Invoke</code>, DynamoDB item reads and writes. They are opt-in per resource because of volume and cost, and are essential for forensic investigation of data access.</p>",
            },
            {
              question: "How would you detect and respond to someone disabling CloudTrail or logging in as root?",
              solution: "<p>Deliver CloudTrail to CloudWatch Logs and create <strong>metric filters</strong> for <code>StopLogging</code>, <code>DeleteTrail</code>, <code>UpdateTrail</code> and root <code>ConsoleLogin</code>, each with an alarm to an SNS security topic. For automated response, create an <strong>EventBridge rule</strong> on those CloudTrail events that triggers a Lambda to re-enable logging and open a ticket. Prevent it in the first place with an SCP denying those actions outside the security account, and store trails in a separate, locked-down log archive account.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html",
            "https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html",
            "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html",
          ],
        },
        {
          topic: "Route 53",
          tags: ["aws", "dns", "route 53", "networking"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>Amazon Route 53</strong> is a highly available, scalable DNS service with a 100% availability SLA. It does three jobs: <strong>domain registration</strong>, <strong>DNS hosting</strong> (public and private hosted zones), and <strong>health-checked traffic routing</strong>. The name comes from TCP/UDP port 53, the DNS port.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Hosted zones and records</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Public hosted zone:</strong> Answers queries from the internet for a domain.</li>
  <li><strong>Private hosted zone:</strong> Answers only inside associated VPCs, for internal names like <code>db.internal.example.com</code>.</li>
  <li><strong>Record types:</strong> A/AAAA (IP), CNAME (alias to another name, not allowed at the zone apex), MX, TXT, NS, SOA.</li>
  <li><strong>Alias records:</strong> A Route 53 extension that points a name (including the apex <code>example.com</code>) at an AWS resource such as an ALB, CloudFront distribution, S3 website or API Gateway. Alias queries are free and resolve to the target's current IPs automatically.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Routing policies</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Simple:</strong> One record, one or more values returned randomly.</li>
  <li><strong>Weighted:</strong> Split traffic by percentage, for canaries or gradual migrations.</li>
  <li><strong>Latency:</strong> Return the region with the lowest latency for the user.</li>
  <li><strong>Failover:</strong> Primary and secondary records with health checks; active-passive DR.</li>
  <li><strong>Geolocation:</strong> Route by the user's country or continent, for compliance or localisation.</li>
  <li><strong>Geoproximity:</strong> Route by geographic distance with a bias to shift traffic between regions.</li>
  <li><strong>Multivalue answer:</strong> Up to eight healthy IPs, a lightweight client-side load balancing.</li>
  <li><strong>IP-based:</strong> Route by the resolver's CIDR block, for ISP-specific optimisation.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Health checks</h4>
<p style="line-height: 1.75;">Health checkers around the world probe an endpoint (HTTP status, string match), aggregate other checks, or watch a CloudWatch alarm. Unhealthy records are removed from answers, which is how failover and multivalue routing work. Combine with low <strong>TTLs</strong> (30 to 60 seconds) so clients notice changes quickly.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Resolver</h4>
<p style="line-height: 1.75;">Every VPC has the Route 53 Resolver at the <code>.2</code> address. <strong>Resolver endpoints</strong> forward queries between on-premises DNS and AWS for hybrid setups, and <strong>DNS Firewall</strong> blocks queries to known-bad domains.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Route 53 is managed DNS with routing intelligence. I use alias records to point my apex domain at an ALB or CloudFront, private hosted zones for internal service names, and routing policies with health checks to do weighted canaries, latency-based multi-region routing, or active-passive failover, keeping TTLs low so changes propagate fast."</div>
</div>`,
          examples: [
            `# Alias the apex domain to an ALB (no CNAME needed at the apex)
aws route53 change-resource-record-sets --hosted-zone-id Z123EXAMPLE --change-batch '{
  "Changes": [{
    "Action": "UPSERT",
    "ResourceRecordSet": {
      "Name": "example.com",
      "Type": "A",
      "AliasTarget": {
        "HostedZoneId": "Z35SXDOTRQ7X7K",
        "DNSName": "app-alb-123456.us-east-1.elb.amazonaws.com",
        "EvaluateTargetHealth": true
      }
    }
  }]
}'

# Active-passive failover: primary in us-east-1, secondary in eu-west-1
aws route53 create-health-check --caller-reference primary-1 --health-check-config \\
  'Type=HTTPS,FullyQualifiedDomainName=api-use1.example.com,ResourcePath=/health,RequestInterval=10,FailureThreshold=3'

aws route53 change-resource-record-sets --hosted-zone-id Z123EXAMPLE --change-batch '{
  "Changes": [
    {"Action":"UPSERT","ResourceRecordSet":{"Name":"api.example.com","Type":"CNAME","TTL":30,
      "SetIdentifier":"primary","Failover":"PRIMARY","HealthCheckId":"<hc-id>",
      "ResourceRecords":[{"Value":"api-use1.example.com"}]}},
    {"Action":"UPSERT","ResourceRecordSet":{"Name":"api.example.com","Type":"CNAME","TTL":30,
      "SetIdentifier":"secondary","Failover":"SECONDARY",
      "ResourceRecords":[{"Value":"api-euw1.example.com"}]}}
  ]
}'

# Debug what resolvers actually see
dig +short api.example.com
dig @8.8.8.8 example.com A`,
          ],
          questions: [
            {
              question: "What is the difference between a CNAME and an Alias record in Route 53?",
              solution: "<p>A <strong>CNAME</strong> is a standard DNS record that maps a name to another name; it cannot exist at the zone apex (<code>example.com</code>) and each lookup is billed. An <strong>Alias</strong> is a Route 53-specific pointer to an AWS resource (ALB, CloudFront, S3 website, API Gateway, another record in the same zone). It works at the apex, returns the target's current IPs directly as A/AAAA answers, can evaluate target health, and alias queries to AWS resources are free.</p>",
            },
            {
              question: "How would you design DNS for an active-active multi-region application?",
              solution: "<p>Use <strong>latency-based routing</strong> (or geoproximity) with one record per region pointing at each region's ALB or CloudFront, each with a <strong>health check</strong> so an unhealthy region is removed from answers automatically. Keep TTLs low (30 to 60 seconds). For a simpler, faster failover with static anycast IPs, put <strong>AWS Global Accelerator</strong> in front instead of relying on DNS propagation. Ensure data replication (Aurora Global Database, DynamoDB global tables) supports writes in both regions.</p>",
            },
            {
              question: "Why do low TTLs matter for failover, and what is the trade-off?",
              solution: "<p>Resolvers and clients cache DNS answers for the <strong>TTL</strong>. If a record has a 24-hour TTL, a failover change may not be seen for a day. Setting 30 to 60 seconds means clients re-query quickly after a health check flips the answer. The trade-off is more queries (slightly higher Route 53 cost and resolver load) and a small latency cost on cache misses. Some clients ignore TTLs entirely, which is one reason Global Accelerator or client-side retries are used for critical paths.</p>",
            },
            {
              question: "What is a private hosted zone and when would you use one?",
              solution: "<p>A private hosted zone holds DNS records that resolve <strong>only within the VPCs you associate</strong> with it, and it is invisible to the public internet. Use it for internal service discovery (<code>orders.internal</code>, <code>db.prod.internal</code>), for split-horizon DNS where the same name resolves to a private IP internally and a public one externally, and for hybrid setups where on-premises resolvers forward to Route 53 via inbound Resolver endpoints.</p>",
            },
            {
              question: "How do Route 53 health checks work and what can they monitor?",
              solution: "<p>Route 53 runs health checkers from multiple global locations that probe an endpoint every 10 or 30 seconds over HTTP, HTTPS or TCP, optionally requiring a specific string in the first 5 KB of the response; the endpoint is healthy when more than 18% of checkers agree. Health checks can also be <strong>calculated</strong> (aggregating child checks) or based on a <strong>CloudWatch alarm</strong>, which lets you fail over on internal metrics such as database replication lag that an external probe cannot see. Records associated with an unhealthy check are excluded from DNS answers.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html",
            "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html",
            "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resource-record-sets-choosing-alias-non-alias.html",
          ],
        },
      ],
    },
    {
      id: 2,
      label: "Advance",
      concepts: [
        {
          topic: "CloudFront",
          tags: ["aws", "cdn", "cloudfront", "edge", "caching"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>Amazon CloudFront</strong> is a global Content Delivery Network (CDN). It caches and serves content from hundreds of <strong>edge locations</strong> close to users, terminates TLS at the edge, and proxies dynamic requests back to your origin over the AWS backbone. It is the standard front door for static sites, SPAs, APIs, media and downloads, and it also absorbs DDoS traffic through AWS Shield.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Core concepts</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Distribution:</strong> The CloudFront configuration with a <code>d111.cloudfront.net</code> domain, which you alias from Route 53 with an ACM certificate issued in <strong>us-east-1</strong>.</li>
  <li><strong>Origins:</strong> S3 buckets, ALBs, API Gateway, MediaStore, or any HTTP server. <strong>Origin groups</strong> give automatic failover between two origins.</li>
  <li><strong>Behaviours:</strong> Path patterns (<code>/api/*</code>, <code>/static/*</code>) mapped to origins with their own caching, allowed methods and policies.</li>
  <li><strong>Cache policy:</strong> Which headers, cookies and query strings form the <strong>cache key</strong>, plus TTLs. Fewer key components mean higher hit ratio.</li>
  <li><strong>Origin request policy:</strong> What CloudFront forwards to the origin even if it is not in the cache key.</li>
  <li><strong>Response headers policy:</strong> Add security headers (HSTS, CSP) and CORS at the edge.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Securing origins</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Origin Access Control (OAC):</strong> Lets CloudFront sign requests to a private S3 bucket so users cannot bypass the CDN.</li>
  <li>For ALB origins, add a secret custom header at CloudFront and require it in a WAF or listener rule on the ALB, or use the CloudFront managed prefix list in the ALB security group.</li>
  <li><strong>Signed URLs and signed cookies</strong> restrict private content (paid videos, downloads) to authorised users.</li>
  <li>Attach <strong>AWS WAF</strong> and rely on <strong>Shield Standard</strong> (free) or Advanced.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Edge compute</h4>
<p style="line-height: 1.75;"><strong>CloudFront Functions</strong> are sub-millisecond JavaScript for header rewrites, redirects and URL normalisation. <strong>Lambda@Edge</strong> runs full Node.js or Python at regional edges for heavier logic such as A/B routing or auth token verification.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Invalidation vs versioning</h4>
<p style="line-height: 1.75;">Invalidations purge objects from all edges but are slow and cost after the first 1,000 paths per month. The better practice is <strong>versioned file names</strong> (<code>app.3f2a1.js</code>) with long TTLs, and a short TTL only on <code>index.html</code>.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "CloudFront caches content at edge locations and proxies dynamic requests to my origins over the AWS backbone. I lock the S3 origin down with Origin Access Control, tune the cache key so the hit ratio stays high, add security headers and WAF at the edge, and avoid invalidations by versioning asset file names."</div>
</div>`,
          examples: [
            `# Serve a private S3 SPA through CloudFront with OAC
aws cloudfront create-origin-access-control --origin-access-control-config \\
  'Name=spa-oac,SigningProtocol=sigv4,SigningBehavior=always,OriginAccessControlOriginType=s3'

# Bucket policy: only this distribution may read
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "Service": "cloudfront.amazonaws.com" },
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::my-spa-bucket/*",
    "Condition": { "StringEquals": {
      "AWS:SourceArn": "arn:aws:cloudfront::123456789012:distribution/E1ABCDEF"
    }}
  }]
}

# Purge index.html after a deploy (assets are versioned, so only this file)
aws cloudfront create-invalidation --distribution-id E1ABCDEF --paths "/index.html"`,
            `// CloudFront Function: SPA routing + security headers
function handler(event) {
  var request = event.request;
  var uri = request.uri;
  // Rewrite extension-less paths to index.html so client-side routing works
  if (!uri.includes(".")) {
    request.uri = "/index.html";
  }
  return request;
}`,
          ],
          questions: [
            {
              question: "How does CloudFront decide whether a request is a cache hit?",
              solution: "<p>CloudFront builds a <strong>cache key</strong> from the request URL path plus whatever the <strong>cache policy</strong> includes: selected headers, cookies and query strings. If an object with that exact key exists at the edge (or regional edge cache) and its TTL has not expired, it is a hit. Every extra key component multiplies the number of variants, so include only what actually changes the response (for example <code>Accept-Encoding</code> and a language header) and forward everything else via the origin request policy without caching on it.</p>",
            },
            {
              question: "How do you stop users from bypassing CloudFront and hitting your S3 bucket or ALB directly?",
              solution: "<p>For <strong>S3</strong>, keep the bucket private and use <strong>Origin Access Control</strong> so CloudFront signs its requests, with a bucket policy allowing only that distribution's ARN. For an <strong>ALB</strong>, have CloudFront add a secret custom header and reject requests without it (via WAF or listener rule), and restrict the ALB security group to the <strong>CloudFront managed prefix list</strong> so only CloudFront IPs can connect. Optionally make the ALB internal and use VPC origins.</p>",
            },
            {
              question: "What is the difference between CloudFront Functions and Lambda@Edge?",
              solution: "<p><strong>CloudFront Functions</strong> run lightweight JavaScript at every edge location in under a millisecond, only on viewer request and viewer response, with no network or filesystem access. They suit header manipulation, redirects, URL rewrites and simple token checks. <strong>Lambda@Edge</strong> runs Node.js or Python at regional edge caches on all four events (viewer/origin request and response), with up to 30 seconds and network access, for things like origin selection, dynamic content generation or calling an auth service. Functions are roughly a sixth of the cost.</p>",
            },
            {
              question: "How do you serve private content such as paid videos through CloudFront?",
              solution: "<p>Use <strong>signed URLs</strong> (per object) or <strong>signed cookies</strong> (many objects, such as HLS segments). Your backend signs a policy containing the resource, expiry and optional IP range with a private key registered in a CloudFront <strong>key group</strong>; the distribution's behaviour is set to require trusted key groups, so unsigned or expired requests get 403. Combine with OAC so the S3 origin itself is private, and set short expiries with refresh for long sessions.</p>",
            },
            {
              question: "How would you deploy a new frontend version without users seeing stale files?",
              solution: "<p>Build with <strong>content-hashed file names</strong> (<code>main.8c1f.js</code>) and upload them with <code>Cache-Control: max-age=31536000, immutable</code>. Upload <code>index.html</code> with <code>no-cache</code> or a very short TTL, then <strong>invalidate only <code>/index.html</code></strong>. New HTML references new hashed assets, old assets remain cached for users mid-session, and you avoid large, slow, billable invalidations.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html",
            "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html",
            "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html",
          ],
        },
        {
          topic: "SQS",
          tags: ["aws", "messaging", "sqs", "queue", "decoupling"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>Amazon SQS (Simple Queue Service)</strong> is a fully managed message queue for decoupling producers from consumers. Producers put messages on a queue and move on; consumers poll, process, and then delete. This buffers traffic spikes, lets components fail independently, and lets you scale consumers separately from producers.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Standard vs FIFO</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Standard:</strong> Nearly unlimited throughput, <strong>at-least-once</strong> delivery, <strong>best-effort ordering</strong>. Consumers must be idempotent.</li>
  <li><strong>FIFO:</strong> <strong>Exactly-once processing</strong> (5-minute deduplication window) and strict ordering within a <strong>message group</strong>. 300 messages/second (3,000 with batching), or higher in high-throughput mode. Queue names end in <code>.fifo</code>.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The message lifecycle</h4>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li>Producer calls <code>SendMessage</code> (up to 256 KB; use S3 for larger payloads via the extended client library).</li>
  <li>Consumer calls <code>ReceiveMessage</code>, ideally with <strong>long polling</strong> (<code>WaitTimeSeconds</code> up to 20) to reduce empty responses and cost.</li>
  <li>The message becomes invisible for the <strong>visibility timeout</strong> (default 30 seconds) while the consumer works.</li>
  <li>Consumer calls <code>DeleteMessage</code> on success. If it crashes, the message reappears after the timeout and is retried.</li>
  <li>After <code>maxReceiveCount</code> failed attempts, the <strong>redrive policy</strong> moves it to a <strong>dead-letter queue (DLQ)</strong> for inspection and replay.</li>
</ol>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Key settings</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Visibility timeout:</strong> Set to about six times your processing time when used with Lambda; extend it programmatically for long jobs.</li>
  <li><strong>Message retention:</strong> 1 minute to 14 days (default 4 days).</li>
  <li><strong>Delay queues and per-message timers</strong> postpone delivery up to 15 minutes.</li>
  <li><strong>Batching</strong> (up to 10 messages) cuts API cost and improves throughput.</li>
  <li><strong>Encryption</strong> with SSE-SQS or KMS; <strong>queue policies</strong> control which principals and services may send.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Common patterns</h4>
<p style="line-height: 1.75;">Lambda event source mapping with partial batch responses; ECS workers that scale on <code>ApproximateNumberOfMessagesVisible</code>; <strong>SNS fan-out</strong> to multiple SQS queues so each service gets its own copy; SQS as a buffer in front of a rate-limited third-party API.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "SQS decouples producers and consumers with a durable queue. Standard queues give me huge throughput with at-least-once delivery, so my consumers are idempotent; FIFO queues give ordering per message group and deduplication when I need them. I tune the visibility timeout to my processing time, use long polling, and always attach a dead-letter queue so poison messages do not block the pipeline."</div>
</div>`,
          examples: [
            `# Create a queue with a dead-letter queue and long polling
aws sqs create-queue --queue-name orders-dlq
aws sqs create-queue --queue-name orders --attributes '{
  "VisibilityTimeout": "120",
  "ReceiveMessageWaitTimeSeconds": "20",
  "MessageRetentionPeriod": "1209600",
  "RedrivePolicy": "{\\"deadLetterTargetArn\\":\\"arn:aws:sqs:us-east-1:123456789012:orders-dlq\\",\\"maxReceiveCount\\":\\"5\\"}"
}'

# Send and receive
aws sqs send-message --queue-url <url> --message-body '{"orderId":"o-123","total":49.99}'
aws sqs receive-message --queue-url <url> --max-number-of-messages 10 --wait-time-seconds 20`,
            `// Node.js worker loop with long polling and explicit delete
import { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } from "@aws-sdk/client-sqs";

const sqs = new SQSClient({});
const QueueUrl = process.env.QUEUE_URL;

async function poll() {
  const { Messages = [] } = await sqs.send(new ReceiveMessageCommand({
    QueueUrl, MaxNumberOfMessages: 10, WaitTimeSeconds: 20,
  }));

  for (const msg of Messages) {
    try {
      await processOrder(JSON.parse(msg.Body)); // must be idempotent
      await sqs.send(new DeleteMessageCommand({ QueueUrl, ReceiptHandle: msg.ReceiptHandle }));
    } catch (err) {
      console.error("processing failed, will retry after visibility timeout", err);
      // do not delete: SQS redelivers, DLQ catches it after maxReceiveCount
    }
  }
  setImmediate(poll);
}
poll();`,
          ],
          questions: [
            {
              question: "What is the visibility timeout and what happens if it is set wrong?",
              solution: "<p>When a consumer receives a message, SQS hides it from other consumers for the <strong>visibility timeout</strong>. If the consumer deletes it in time, it is gone; if not, it becomes visible again and another consumer picks it up. Set it <strong>too short</strong> and slow jobs get processed twice concurrently. Set it <strong>too long</strong> and a crashed consumer delays the retry unnecessarily. With Lambda, AWS recommends at least six times the function timeout; for long jobs call <code>ChangeMessageVisibility</code> to extend it while working.</p>",
            },
            {
              question: "Compare SQS Standard and FIFO queues.",
              solution: "<p><strong>Standard</strong> offers nearly unlimited throughput, at-least-once delivery (rare duplicates) and best-effort ordering; it fits most decoupling and work-queue use cases where consumers are idempotent. <strong>FIFO</strong> guarantees exactly-once processing within a 5-minute deduplication window (via content hash or <code>MessageDeduplicationId</code>) and strict ordering within a <code>MessageGroupId</code>, at 300 msg/s per API action without batching (3,000 with, more in high-throughput mode). Use FIFO for order events per customer, ledger entries, or anything where sequence matters.</p>",
            },
            {
              question: "What is a dead-letter queue and how do you use it operationally?",
              solution: "<p>A DLQ is a normal queue that receives messages the source queue could not process after <code>maxReceiveCount</code> attempts, configured via a redrive policy. It prevents poison messages from being retried forever and blocking throughput. Operationally you alarm on <code>ApproximateNumberOfMessagesVisible</code> on the DLQ, inspect the payloads and consumer logs to find the bug, fix it, and use <strong>DLQ redrive</strong> to move the messages back to the source queue. Set the DLQ retention longer than the source queue so nothing expires before you look.</p>",
            },
            {
              question: "How does SQS differ from SNS and when do you combine them?",
              solution: "<p><strong>SQS</strong> is pull-based, point-to-point: messages persist until one consumer processes and deletes them. <strong>SNS</strong> is push-based publish/subscribe: a message is delivered immediately to all subscribers and is not stored. The classic combination is <strong>fan-out</strong>: publish an OrderPlaced event to an SNS topic subscribed by several SQS queues (billing, shipping, analytics). Each service gets its own durable queue, can fail and retry independently, and can filter messages with subscription filter policies.</p>",
            },
            {
              question: "How do you scale consumers based on queue depth?",
              solution: "<p>For <strong>Lambda</strong>, the event source mapping scales automatically (up to 1,250 concurrent pollers for standard queues) and you cap it with maximum concurrency. For <strong>ECS or EC2 workers</strong>, use target tracking on a custom metric of <strong>backlog per instance</strong> (<code>ApproximateNumberOfMessagesVisible</code> divided by running tasks) so the fleet grows until each worker has an acceptable backlog, then shrinks. Also monitor <code>ApproximateAgeOfOldestMessage</code>, which directly reflects how far behind you are.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html",
            "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html",
            "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html",
          ],
        },
        {
          topic: "SNS",
          tags: ["aws", "messaging", "sns", "pub/sub", "notifications"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>Amazon SNS (Simple Notification Service)</strong> is a managed publish/subscribe service. A publisher sends a message to a <strong>topic</strong>, and SNS pushes a copy to every <strong>subscription</strong> on that topic at once. It is the AWS way to broadcast an event to many consumers, and the way alarms and pipelines notify humans.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Subscription types</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Application-to-application (A2A):</strong> SQS queues, Lambda functions, HTTP/S endpoints, Kinesis Data Firehose, EventBridge (via API destinations).</li>
  <li><strong>Application-to-person (A2P):</strong> Email, SMS, mobile push (APNs, FCM).</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Key features</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Fan-out:</strong> One publish, many independent consumers. Pair with SQS so each consumer has a durable buffer.</li>
  <li><strong>Filter policies:</strong> Subscribers receive only messages whose attributes (or payload body) match a JSON filter, avoiding the need for a topic per event type.</li>
  <li><strong>FIFO topics:</strong> Ordered, deduplicated delivery to SQS FIFO queues.</li>
  <li><strong>Message attributes and raw message delivery:</strong> Send metadata; deliver the bare payload to SQS without the SNS envelope.</li>
  <li><strong>Delivery retries and DLQs:</strong> SNS retries failed deliveries (HTTP endpoints get a configurable backoff policy) and can send undeliverable messages to an SQS DLQ per subscription.</li>
  <li><strong>Encryption and access policies:</strong> KMS encryption at rest; topic policies control who can publish and subscribe, including cross-account.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">SNS vs EventBridge</h4>
<p style="line-height: 1.75;">Both are pub/sub. SNS is simpler, higher throughput, lower latency, and supports A2P channels. EventBridge offers richer content-based routing on the whole event body, schema registry, archive and replay, and native SaaS and AWS service event sources. Many teams use SNS for high-volume application fan-out and alerts, and EventBridge as the event bus for cross-service, cross-account integration.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "SNS is push-based pub/sub. I publish an event to a topic once and SNS fans it out to SQS queues, Lambdas, HTTP endpoints, email or SMS. I use subscription filter policies so each consumer only gets what it cares about, put SQS between SNS and my services for durability and retries, and use SNS for CloudWatch alarm notifications to on-call."</div>
</div>`,
          examples: [
            `# Topic, two queue subscriptions with filters, and an email for on-call
aws sns create-topic --name order-events

aws sns subscribe --topic-arn <topic-arn> --protocol sqs \\
  --notification-endpoint arn:aws:sqs:us-east-1:123456789012:shipping-queue \\
  --attributes '{"RawMessageDelivery":"true","FilterPolicy":"{\\"eventType\\":[\\"OrderPaid\\"]}"}'

aws sns subscribe --topic-arn <topic-arn> --protocol sqs \\
  --notification-endpoint arn:aws:sqs:us-east-1:123456789012:analytics-queue

aws sns subscribe --topic-arn <topic-arn> --protocol email --notification-endpoint oncall@example.com

# Publish with attributes used by the filter policy
aws sns publish --topic-arn <topic-arn> \\
  --message '{"orderId":"o-123","total":49.99}' \\
  --message-attributes '{"eventType":{"DataType":"String","StringValue":"OrderPaid"}}'`,
            `# SQS queue policy allowing the topic to deliver (required for SNS -> SQS)
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "Service": "sns.amazonaws.com" },
    "Action": "sqs:SendMessage",
    "Resource": "arn:aws:sqs:us-east-1:123456789012:shipping-queue",
    "Condition": { "ArnEquals": { "aws:SourceArn": "arn:aws:sns:us-east-1:123456789012:order-events" } }
  }]
}`,
          ],
          questions: [
            {
              question: "Explain the SNS fan-out pattern and why you put SQS behind SNS.",
              solution: "<p>Fan-out means a single published message is delivered to <strong>many subscribers in parallel</strong>. Subscribing SQS queues rather than invoking services directly adds <strong>durability</strong> (messages wait if a consumer is down), <strong>independent retry and DLQ</strong> per consumer, <strong>back-pressure</strong> (each service consumes at its own pace), and decoupling so adding a new consumer is just a new subscription with no producer change. SNS alone is push-and-forget for the subscriber side.</p>",
            },
            {
              question: "What are SNS filter policies and what problem do they solve?",
              solution: "<p>A filter policy is a JSON document on a <strong>subscription</strong> that matches message attributes (or, with payload-based filtering, the message body) using exact values, prefixes, numeric ranges, anything-but and exists operators. Only matching messages are delivered to that subscriber. This lets one topic carry many event types while each consumer receives only the subset it needs, instead of either creating dozens of topics or making every consumer receive and discard irrelevant messages.</p>",
            },
            {
              question: "How does SNS handle delivery failures?",
              solution: "<p>For AWS endpoints (SQS, Lambda) SNS retries with backoff for up to 23 days of server-side errors. For <strong>HTTP/S</strong> endpoints it follows a configurable delivery policy (number of retries, backoff function, min/max delay) and then gives up. Any message that exhausts retries can be sent to a <strong>per-subscription dead-letter queue</strong> in SQS. Delivery status logging to CloudWatch shows success and failure rates per protocol. SNS does not store messages, so without a DLQ a failed delivery is lost.</p>",
            },
            {
              question: "What is raw message delivery and when do you enable it?",
              solution: "<p>By default SNS wraps the payload in a JSON envelope with <code>Type</code>, <code>MessageId</code>, <code>TopicArn</code>, <code>Message</code>, <code>MessageAttributes</code> and more. <strong>Raw message delivery</strong> sends only your original message body to SQS or HTTP subscribers, with attributes mapped to SQS message attributes. Enable it when the consumer expects the plain payload, for example when the same worker code must handle messages arriving directly on SQS and via SNS, or when you want to avoid double JSON parsing.</p>",
            },
            {
              question: "When would you pick EventBridge over SNS?",
              solution: "<p>Pick <strong>EventBridge</strong> when you need content-based routing on any field of the event body, a schema registry, event archive and replay, native ingestion of AWS service events and third-party SaaS events, cross-account event buses, or scheduling. Pick <strong>SNS</strong> when you need very high throughput and low latency fan-out, FIFO ordered pub/sub, mobile push, SMS or email, or a simple alerting channel for CloudWatch alarms. They are often used together, with SNS as a target of an EventBridge rule.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/sns/latest/dg/welcome.html",
            "https://docs.aws.amazon.com/sns/latest/dg/sns-message-filtering.html",
            "https://docs.aws.amazon.com/sns/latest/dg/sns-sqs-as-subscriber.html",
          ],
        },
        {
          topic: "EventBridge",
          tags: ["aws", "events", "eventbridge", "event-driven", "scheduler"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>Amazon EventBridge</strong> is a serverless <strong>event bus</strong>. Producers put events (JSON) on a bus; <strong>rules</strong> match events by pattern and route them to <strong>targets</strong> such as Lambda, SQS, SNS, Step Functions, ECS tasks, API Gateway, or another account's bus. It is the backbone of event-driven architectures on AWS because it decouples who emits an event from who reacts to it.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Buses and event sources</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Default bus:</strong> Receives events from AWS services automatically (EC2 state changes, CodePipeline stage changes, CloudTrail API calls, Auto Scaling, Health).</li>
  <li><strong>Custom buses:</strong> For your own application events, typically one per domain or team.</li>
  <li><strong>Partner event sources:</strong> SaaS vendors (Datadog, Stripe, Zendesk, Auth0) publish directly into your account.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Event structure and rules</h4>
<pre><code class="language-json">{
  "source": "com.myapp.orders",
  "detail-type": "OrderPlaced",
  "detail": { "orderId": "o-123", "total": 49.99, "country": "IN" }
}</code></pre>
<p style="line-height: 1.75;">Rules use <strong>event patterns</strong> that match on any field: exact values, prefixes, numeric ranges, <code>exists</code>, <code>anything-but</code>, wildcards. Each rule can have up to five targets and an <strong>input transformer</strong> to reshape the event for the target.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Delivery guarantees</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>At-least-once</strong> delivery; targets must be idempotent.</li>
  <li>Retries with exponential backoff for up to 24 hours (configurable), then to a per-target <strong>DLQ</strong> in SQS.</li>
  <li>Not ordered. Use SQS FIFO as a target when order matters.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Beyond routing</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Scheduler:</strong> Cron and rate expressions, one-time schedules, time zones, flexible windows; the modern replacement for cron-based Lambda triggers.</li>
  <li><strong>Archive and replay:</strong> Store events and replay them to a bus to recover from a bug or backfill a new consumer.</li>
  <li><strong>Schema registry:</strong> Discover event schemas and generate typed code bindings.</li>
  <li><strong>Pipes:</strong> Point-to-point integrations (SQS to Step Functions, Kinesis to Lambda) with filtering and enrichment, no glue code.</li>
  <li><strong>API destinations:</strong> Call external HTTPS APIs as targets with managed auth (OAuth, API key) and rate limiting.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "EventBridge is a serverless event bus. My services publish domain events to a custom bus, rules match on any field of the event and route to Lambda, SQS, Step Functions or other accounts. It gives me loose coupling, content-based routing, native AWS and SaaS event sources, scheduling, and archive and replay. Delivery is at-least-once and unordered, so consumers are idempotent and I attach DLQs to every target."</div>
</div>`,
          examples: [
            `# Custom bus, a rule matching high-value Indian orders, Lambda target with DLQ
aws events create-event-bus --name orders-bus

aws events put-rule --name high-value-orders-in --event-bus-name orders-bus --event-pattern '{
  "source": ["com.myapp.orders"],
  "detail-type": ["OrderPlaced"],
  "detail": {
    "country": ["IN"],
    "total": [{ "numeric": [">=", 1000] }]
  }
}'

aws events put-targets --rule high-value-orders-in --event-bus-name orders-bus --targets '[{
  "Id": "notify-sales",
  "Arn": "arn:aws:lambda:us-east-1:123456789012:function:notify-sales",
  "DeadLetterConfig": { "Arn": "arn:aws:sqs:us-east-1:123456789012:eventbridge-dlq" },
  "RetryPolicy": { "MaximumRetryAttempts": 5, "MaximumEventAgeInSeconds": 3600 }
}]'

# Publish an event
aws events put-events --entries '[{
  "EventBusName": "orders-bus",
  "Source": "com.myapp.orders",
  "DetailType": "OrderPlaced",
  "Detail": "{\\"orderId\\":\\"o-123\\",\\"total\\":1499,\\"country\\":\\"IN\\"}"
}]'

# Scheduler: run a report Lambda every weekday at 09:00 IST
aws scheduler create-schedule --name daily-report \\
  --schedule-expression "cron(0 9 ? * MON-FRI *)" --schedule-expression-timezone "Asia/Kolkata" \\
  --flexible-time-window Mode=OFF \\
  --target '{"Arn":"arn:aws:lambda:us-east-1:123456789012:function:daily-report","RoleArn":"arn:aws:iam::123456789012:role/scheduler-invoke"}'`,
          ],
          questions: [
            {
              question: "How does EventBridge differ from SNS and SQS?",
              solution: "<p><strong>SQS</strong> is a queue: one consumer group pulls and processes each message, with buffering and retries. <strong>SNS</strong> is simple push fan-out on topics, filtered by message attributes, with very high throughput and A2P channels. <strong>EventBridge</strong> is an event bus with <strong>content-based routing on the full event body</strong>, native AWS and SaaS event sources, cross-account buses, schema registry, archive and replay, scheduling, and Pipes. It has lower throughput and higher latency than SNS, so it is chosen for integration flexibility rather than raw speed.</p>",
            },
            {
              question: "What are EventBridge delivery guarantees and how do you design around them?",
              solution: "<p>Delivery is <strong>at-least-once</strong> and <strong>unordered</strong>. Duplicate deliveries are rare but possible, so targets must be <strong>idempotent</strong>, keyed on a business ID or the event <code>id</code>. When order matters within an entity, route to an <strong>SQS FIFO</strong> queue using a message group ID. Configure the <strong>retry policy</strong> (attempts and max event age) and a <strong>dead-letter queue</strong> per target so failures after retries are captured rather than silently dropped, and alarm on the DLQ depth.</p>",
            },
            {
              question: "How would you share events between AWS accounts with EventBridge?",
              solution: "<p>Create a rule in the source account whose target is the <strong>event bus ARN in the destination account</strong>, and add a <strong>resource policy</strong> on the destination bus allowing <code>events:PutEvents</code> from the source account or the whole organisation (<code>aws:PrincipalOrgID</code>). The destination account then writes its own rules. This central-bus pattern lets each team own its consumers while a platform team governs the bus, and it works across regions as well.</p>",
            },
            {
              question: "When would you use EventBridge Scheduler instead of a cron-based rule?",
              solution: "<p>The older scheduled rules live on the default bus and support only UTC cron/rate expressions. <strong>EventBridge Scheduler</strong> is a dedicated service supporting <strong>time zones</strong>, <strong>one-time schedules</strong> (useful for reminders or delayed actions), flexible time windows to spread load, millions of schedules, and direct universal targets for over 270 AWS API actions without a Lambda in between. Use Scheduler for all new scheduling work.</p>",
            },
            {
              question: "How do archive and replay help in an event-driven system?",
              solution: "<p>An <strong>archive</strong> stores every event matching a pattern on a bus for a retention period. <strong>Replay</strong> re-publishes archived events from a time range to the bus (or a specific rule). This lets you recover from a consumer bug by fixing the code and replaying the affected window, backfill a brand-new consumer with historical events, or reproduce a production incident in a test bus. Consumers must be idempotent, and replayed events carry a <code>replay-name</code> field so they can be distinguished.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html",
            "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-patterns.html",
            "https://docs.aws.amazon.com/scheduler/latest/UserGuide/what-is-scheduler.html",
          ],
        },
        {
          topic: "AWS Secrets Manager",
          tags: ["aws", "security", "secrets manager", "rotation", "kms"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>AWS Secrets Manager</strong> stores, retrieves and automatically <strong>rotates</strong> secrets such as database passwords, API keys and OAuth tokens. Secrets are encrypted with KMS, access is controlled with IAM and resource policies, every retrieval is logged in CloudTrail, and applications fetch secrets at runtime instead of shipping them in code, config files or environment variables.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">How it works</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>A secret is a name plus a value (string or binary, up to 64 KB, usually JSON with several keys), encrypted with the default or a customer-managed <strong>KMS key</strong>.</li>
  <li><strong>Versions</strong> carry staging labels: <code>AWSCURRENT</code>, <code>AWSPENDING</code>, <code>AWSPREVIOUS</code>. Rotation moves labels rather than deleting values, so rollback is possible.</li>
  <li>Applications call <code>GetSecretValue</code> via the SDK. Use the <strong>client-side caching libraries</strong> (or Lambda extension) so you are not calling the API on every request.</li>
  <li><strong>Resource policies</strong> allow cross-account access; <strong>IAM conditions</strong> restrict by tag or VPC endpoint.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Rotation</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Managed rotation</strong> for RDS, Aurora, Redshift and DocumentDB credentials: enable it and AWS does everything.</li>
  <li><strong>Lambda rotation functions</strong> for anything else, following four steps: createSecret, setSecret, testSecret, finishSecret. AWS provides templates.</li>
  <li><strong>Single-user</strong> strategy changes the password in place (brief connection failures possible); <strong>alternating-users</strong> strategy swaps between two database users for zero downtime.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Secrets Manager vs SSM Parameter Store</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Parameter Store</strong> (standard tier) is free, stores plain or <code>SecureString</code> values, but has no built-in rotation and lower limits. Ideal for configuration and non-rotating values.</li>
  <li><strong>Secrets Manager</strong> costs about $0.40 per secret per month plus API calls, adds rotation, cross-account sharing, and larger size. Ideal for credentials.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Integrations</h4>
<p style="line-height: 1.75;">ECS and EKS inject secrets into containers as environment variables or files; Lambda can use the Parameters and Secrets extension; RDS Proxy authenticates with a Secrets Manager secret; CodeBuild and CodePipeline read secrets at build time.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Secrets Manager keeps credentials out of code. Secrets are encrypted with KMS, fetched at runtime with IAM-scoped permissions and audited in CloudTrail. Its differentiator is automatic rotation, managed for RDS and via Lambda for everything else, with versioning so I can roll back. I cache secrets client-side and use Parameter Store for plain configuration to keep costs down."</div>
</div>`,
          examples: [
            `# Create a secret and turn on managed rotation for an RDS database
aws secretsmanager create-secret --name prod/orders/db \\
  --secret-string '{"username":"app","password":"REPLACE_ME","host":"orders.abc.us-east-1.rds.amazonaws.com","port":5432,"dbname":"orders"}' \\
  --kms-key-id alias/prod-secrets

aws secretsmanager rotate-secret --secret-id prod/orders/db \\
  --rotation-rules AutomaticallyAfterDays=30

# Read the current value
aws secretsmanager get-secret-value --secret-id prod/orders/db --query SecretString --output text`,
            `// Node.js: fetch once, cache in memory, refresh periodically
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

const client = new SecretsManagerClient({});
let cached = null;
let fetchedAt = 0;

export async function getDbConfig() {
  const stale = Date.now() - fetchedAt > 5 * 60 * 1000;
  if (!cached || stale) {
    const res = await client.send(new GetSecretValueCommand({ SecretId: process.env.DB_SECRET_ID }));
    cached = JSON.parse(res.SecretString);
    fetchedAt = Date.now();
  }
  return cached;
}

// On an auth error from the DB, drop the cache and retry once:
// rotation may have moved AWSCURRENT to a new version.`,
            `# ECS task definition snippet: inject a single JSON key as an env var
"secrets": [
  {
    "name": "DB_PASSWORD",
    "valueFrom": "arn:aws:secretsmanager:us-east-1:123456789012:secret:prod/orders/db-AbCdEf:password::"
  }
]`,
          ],
          questions: [
            {
              question: "Why use Secrets Manager instead of environment variables or a config file?",
              solution: "<p>Environment variables and config files end up in container images, task definitions, CI logs, crash dumps and repositories, and they cannot be rotated without redeploying. Secrets Manager keeps the value <strong>encrypted at rest with KMS</strong>, grants access via <strong>least-privilege IAM</strong> per secret, logs every read in <strong>CloudTrail</strong>, supports <strong>automatic rotation</strong> with versioning, and lets several services or accounts share one source of truth. Env vars are still fine for the secret's <em>name</em>, which the app then resolves at startup.</p>",
            },
            {
              question: "How does automatic rotation work without breaking running applications?",
              solution: "<p>Rotation creates a new version labelled <code>AWSPENDING</code>, sets the new credential in the target system, tests it, then moves the <code>AWSCURRENT</code> label to it (old becomes <code>AWSPREVIOUS</code>). Applications that fetch by name get the new value on their next read, so they must <strong>refresh their cache</strong> either periodically or on an authentication failure. For zero downtime with databases use the <strong>alternating-users</strong> strategy: two DB users take turns, so the old credential stays valid until the next rotation and in-flight connections are unaffected.</p>",
            },
            {
              question: "Compare Secrets Manager and SSM Parameter Store.",
              solution: "<p><strong>Parameter Store</strong> is free (standard tier), stores <code>String</code>, <code>StringList</code> and KMS-encrypted <code>SecureString</code> values up to 4 KB (8 KB advanced), organises them hierarchically, and is great for configuration and feature flags. It has no native rotation. <strong>Secrets Manager</strong> charges per secret, stores up to 64 KB, adds <strong>automatic rotation</strong>, <strong>cross-account resource policies</strong>, random password generation and deeper integrations (RDS, RDS Proxy, managed rotation). Rule of thumb: rotating credentials go in Secrets Manager, everything else in Parameter Store.</p>",
            },
            {
              question: "How do you control and audit who can read a secret?",
              solution: "<p>Grant <code>secretsmanager:GetSecretValue</code> on the specific secret ARN to the role that needs it (ECS task role, Lambda execution role), optionally with conditions such as <code>aws:SourceVpce</code> to require a VPC endpoint or tag-based conditions for ABAC. Also grant <code>kms:Decrypt</code> on the customer-managed key, whose key policy is a second gate. Every <code>GetSecretValue</code> call appears in <strong>CloudTrail</strong> with the caller identity, so you can alarm on reads from unexpected principals or IPs.</p>",
            },
            {
              question: "How would you avoid the cost and latency of calling Secrets Manager on every request?",
              solution: "<p>Fetch at startup and <strong>cache in memory</strong> with a TTL (for example 5 to 15 minutes), using the official caching libraries for Java, Python, .NET and Go or the <strong>Lambda Parameters and Secrets extension</strong>, which runs a local HTTP cache inside the function. Invalidate the cache when the downstream system returns an auth error so rotation is picked up immediately. For containers, ECS and EKS can inject the secret at task start, which is effectively a per-deployment cache.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html",
            "https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html",
            "https://docs.aws.amazon.com/secretsmanager/latest/userguide/retrieving-secrets.html",
          ],
        },
        {
          topic: "ECS, EKS & Fargate",
          tags: ["aws", "containers", "ecs", "eks", "fargate", "kubernetes"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  AWS gives you three ways to run containers, and interviewers want to hear that you know they answer different questions. <strong>ECS</strong> and <strong>EKS</strong> are <strong>orchestrators</strong> (what to run, how many, how to route to them). <strong>Fargate</strong> is a <strong>serverless compute engine</strong> (where the containers physically run) that works with either orchestrator, as an alternative to managing EC2 nodes yourself.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">ECS (Elastic Container Service)</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>AWS-native orchestrator, no control plane to pay for or manage.</li>
  <li><strong>Task definition:</strong> Blueprint with containers, images (usually from ECR), CPU and memory, port mappings, environment, secrets, logging, and two roles: the <strong>task role</strong> (what your app can call) and the <strong>execution role</strong> (what ECS needs to pull images and secrets).</li>
  <li><strong>Service:</strong> Keeps N tasks running, registers them with an ALB target group, performs rolling or blue/green (CodeDeploy) deployments, and autoscales on CPU, memory or ALB request count.</li>
  <li><strong>Cluster:</strong> Logical grouping backed by EC2 capacity providers or Fargate.</li>
  <li><strong>Service Connect / Cloud Map</strong> for service discovery, <strong>ECS Exec</strong> for shelling into a task.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">EKS (Elastic Kubernetes Service)</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Managed, upstream-conformant <strong>Kubernetes</strong> control plane (about $0.10 per hour per cluster). You bring the Kubernetes ecosystem: Helm, ArgoCD, Istio, Prometheus.</li>
  <li>Nodes via <strong>managed node groups</strong>, <strong>Karpenter</strong> for just-in-time provisioning, or <strong>Fargate profiles</strong>.</li>
  <li><strong>IAM Roles for Service Accounts (IRSA)</strong> or <strong>EKS Pod Identity</strong> map pods to IAM roles.</li>
  <li>Add-ons: VPC CNI (pods get real VPC IPs), CoreDNS, kube-proxy, EBS/EFS CSI drivers, AWS Load Balancer Controller (creates ALBs from Ingress).</li>
  <li>Choose EKS for multi-cloud portability, existing Kubernetes skills, or when you need operators and CRDs.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Fargate</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>You specify vCPU and memory per task or pod; AWS provisions and patches the underlying host. Each task runs in its own isolated micro-VM.</li>
  <li>Pay per vCPU-second and GB-second. <strong>Fargate Spot</strong> is up to 70% cheaper for interruptible work.</li>
  <li>Limits: no GPUs, no privileged containers or daemonsets, max 16 vCPU / 120 GB, ephemeral storage up to 200 GB, slower start than a warm EC2 node.</li>
  <li>Great for variable workloads and small teams; EC2 capacity wins for steady, dense, or GPU workloads where you can bin-pack and use reservations.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Decision guide</h4>
<pre><code class="language-text">Need Kubernetes APIs / portability / CRDs?   -> EKS
Just want to run containers on AWS simply?   -> ECS
Want no servers to manage?                   -> Fargate (with ECS or EKS)
GPU, huge steady fleet, special kernels?      -> EC2 launch type / node groups</code></pre>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "ECS and EKS are orchestrators; Fargate is serverless capacity for either. I reach for ECS on Fargate when I want the simplest path to production on AWS: task definitions, a service behind an ALB, autoscaling and rolling deploys with no nodes to patch. I choose EKS when the team needs Kubernetes portability or its ecosystem, and I move to EC2 capacity when I need GPUs or the cost of a large steady fleet justifies managing nodes."</div>
</div>`,
          examples: [
            `# ECS on Fargate: task definition and service behind an ALB
{
  "family": "orders-api",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "arn:aws:iam::123456789012:role/ecsTaskExecutionRole",
  "taskRoleArn": "arn:aws:iam::123456789012:role/orders-api-task-role",
  "containerDefinitions": [{
    "name": "api",
    "image": "123456789012.dkr.ecr.us-east-1.amazonaws.com/orders-api:1.4.2",
    "portMappings": [{ "containerPort": 8080, "protocol": "tcp" }],
    "environment": [{ "name": "NODE_ENV", "value": "production" }],
    "secrets": [{ "name": "DB_URL", "valueFrom": "arn:aws:secretsmanager:us-east-1:123456789012:secret:prod/orders/db" }],
    "healthCheck": { "command": ["CMD-SHELL", "curl -f http://localhost:8080/health || exit 1"], "interval": 30, "retries": 3 },
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": { "awslogs-group": "/ecs/orders-api", "awslogs-region": "us-east-1", "awslogs-stream-prefix": "api" }
    }
  }]
}

aws ecs register-task-definition --cli-input-json file://task-def.json
aws ecs create-service --cluster prod --service-name orders-api \\
  --task-definition orders-api --desired-count 3 --launch-type FARGATE \\
  --network-configuration 'awsvpcConfiguration={subnets=[subnet-priv-a,subnet-priv-b],securityGroups=[sg-app],assignPublicIp=DISABLED}' \\
  --load-balancers targetGroupArn=<tg-arn>,containerName=api,containerPort=8080 \\
  --deployment-configuration 'minimumHealthyPercent=100,maximumPercent=200,deploymentCircuitBreaker={enable=true,rollback=true}'

# Deploy a new image: register a new revision and update the service
aws ecs update-service --cluster prod --service orders-api --task-definition orders-api:12 --force-new-deployment`,
            `# EKS: cluster with Fargate profile and a pod that assumes an IAM role via IRSA
eksctl create cluster --name prod --region us-east-1 --fargate

eksctl create iamserviceaccount --cluster prod --namespace orders --name orders-api \\
  --attach-policy-arn arn:aws:iam::123456789012:policy/orders-api-access --approve

# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata: { name: orders-api, namespace: orders }
spec:
  replicas: 3
  selector: { matchLabels: { app: orders-api } }
  template:
    metadata: { labels: { app: orders-api } }
    spec:
      serviceAccountName: orders-api          # IRSA -> IAM role, no static keys
      containers:
        - name: api
          image: 123456789012.dkr.ecr.us-east-1.amazonaws.com/orders-api:1.4.2
          ports: [{ containerPort: 8080 }]
          resources:
            requests: { cpu: "250m", memory: "512Mi" }
            limits:   { cpu: "500m", memory: "1Gi" }
          readinessProbe: { httpGet: { path: /health, port: 8080 }, periodSeconds: 10 }`,
          ],
          questions: [
            {
              question: "What is the difference between ECS, EKS and Fargate?",
              solution: "<p><strong>ECS</strong> is the AWS-native container orchestrator with a simple task/service model and no control-plane cost. <strong>EKS</strong> is managed upstream Kubernetes, giving portability and the Kubernetes ecosystem at the price of more complexity and a per-cluster fee. <strong>Fargate</strong> is not an orchestrator: it is a <strong>serverless launch type</strong> for ECS tasks or EKS pods where AWS runs the underlying compute, so you never patch or scale nodes. You pick an orchestrator (ECS or EKS) and then a capacity model (Fargate or EC2).</p>",
            },
            {
              question: "Explain the ECS task role versus the task execution role.",
              solution: "<p>The <strong>execution role</strong> is used by the ECS agent <em>on your behalf</em> before your container starts: pulling the image from ECR, fetching secrets from Secrets Manager or SSM to inject as environment variables, and writing logs to CloudWatch. The <strong>task role</strong> is assumed by your <em>application code</em> inside the container to call AWS APIs (read S3, publish to SQS). Keeping them separate applies least privilege: the app cannot read every secret, and the agent cannot touch your business data.</p>",
            },
            {
              question: "When is Fargate more expensive than EC2, and how do you decide?",
              solution: "<p>Fargate charges a premium per vCPU and GB compared with the equivalent EC2 instance, and you cannot bin-pack tasks tightly or use EC2 Reserved Instances. For a <strong>large, steady fleet</strong> with high utilisation, EC2 capacity providers with Savings Plans and good bin-packing are cheaper. For <strong>bursty, small or many heterogeneous services</strong>, Fargate usually wins once you count the engineering time spent on patching AMIs, scaling clusters and handling under-utilised nodes. Fargate Spot and Graviton (ARM) close much of the gap for tolerant workloads.</p>",
            },
            {
              question: "How do pods on EKS get AWS permissions securely?",
              solution: "<p>Use <strong>IAM Roles for Service Accounts (IRSA)</strong> or the newer <strong>EKS Pod Identity</strong>. The cluster has an OIDC issuer; you create an IAM role whose trust policy allows a specific Kubernetes service account in a specific namespace to assume it via <code>sts:AssumeRoleWithWebIdentity</code>. Pods using that service account get a projected token, and the AWS SDK exchanges it for temporary credentials automatically. This gives per-workload least privilege and avoids giving the whole node's instance role to every pod.</p>",
            },
            {
              question: "How do you achieve zero-downtime deployments on ECS?",
              solution: "<p>For a <strong>rolling update</strong>, set <code>minimumHealthyPercent</code> to 100 and <code>maximumPercent</code> to 200 so new tasks start and pass ALB health checks before old ones stop, enable the <strong>deployment circuit breaker</strong> with automatic rollback, and give the ALB a sensible deregistration delay so in-flight requests drain. For stricter control use <strong>blue/green with CodeDeploy</strong>: a second target group receives the new tasks, a test listener validates them, then traffic shifts linearly or canary-style with automatic rollback on alarms. Make sure the container handles SIGTERM gracefully within the stop timeout.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html",
            "https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html",
            "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html",
          ],
        },
        {
          topic: "CodePipeline",
          tags: ["aws", "ci/cd", "codepipeline", "codebuild", "codedeploy", "devops"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>AWS CodePipeline</strong> is a managed continuous delivery service that models a release as a series of <strong>stages</strong> (Source, Build, Test, Deploy) containing <strong>actions</strong>. Each time the source changes, a new <strong>execution</strong> flows through the stages, passing <strong>artifacts</strong> via S3. It orchestrates the other AWS developer tools and third-party providers rather than doing the work itself.
</p>
<h4 style="margin-left: 0; margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The family of services</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Source:</strong> GitHub, GitLab, Bitbucket via <strong>CodeConnections</strong>, S3, ECR image pushes, or CodeCommit (no longer available to new customers).</li>
  <li><strong>CodeBuild:</strong> Serverless build containers driven by <code>buildspec.yml</code>. Runs tests, builds Docker images, pushes to ECR, runs Terraform or CDK. Pay per build minute.</li>
  <li><strong>CodeDeploy:</strong> Deployment engine for EC2/on-prem (in-place or blue/green with agents), ECS (blue/green with ALB traffic shifting), and Lambda (canary and linear alias shifting) with automatic rollback on CloudWatch alarms.</li>
  <li><strong>CloudFormation / CDK actions:</strong> Deploy infrastructure as part of the pipeline; CDK Pipelines generates a self-mutating CodePipeline.</li>
  <li><strong>Manual approval</strong> actions and <strong>Step Functions / Lambda</strong> actions for custom gates.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Pipeline mechanics</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Stages run sequentially; actions within a stage can run in parallel</strong> using run order.</li>
  <li><strong>V2 pipelines</strong> add trigger filters (branches, tags, file paths), pipeline-level variables, stage-level rollback, and per-execution pricing.</li>
  <li>Execution modes: <strong>Superseded</strong> (newer commit skips ahead when waiting), <strong>Queued</strong>, or <strong>Parallel</strong>.</li>
  <li>State changes emit <strong>EventBridge</strong> events, so you can notify Slack or trigger downstream automation.</li>
  <li>Cross-account deployments use an artifact bucket with a KMS key and roles in the target accounts that the pipeline assumes.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Typical container pipeline</h4>
<pre><code class="language-text">Source (GitHub main)  ->  Build (CodeBuild: test, docker build, push :sha to ECR, emit imagedefinitions.json)
  ->  Deploy-Staging (ECS rolling)  ->  Integration tests (CodeBuild)  ->  Manual approval
  ->  Deploy-Prod (CodeDeploy ECS blue/green, 10% canary for 5 min, alarm-based rollback)</code></pre>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Good practices</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Build once, promote the same immutable artifact (image digest) through every environment.</li>
  <li>Keep secrets in Secrets Manager or SSM and reference them from <code>buildspec.yml</code>, never in plain environment variables.</li>
  <li>Give each action its own least-privilege role; the pipeline role only orchestrates.</li>
  <li>Define the pipeline itself as code (CloudFormation, CDK, Terraform).</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "CodePipeline orchestrates stages and actions: source from GitHub, CodeBuild to test and build an image, then CodeDeploy for blue/green ECS or canary Lambda releases with automatic rollback on alarms. I build one artifact and promote it, gate production with tests and approvals, run everything with least-privilege roles, and define the pipeline as code so it is reviewable and reproducible."</div>
</div>`,
          examples: [
            `# buildspec.yml for CodeBuild: test, build, push image, hand off to ECS deploy action
version: 0.2
env:
  variables:
    REPO_URI: 123456789012.dkr.ecr.us-east-1.amazonaws.com/orders-api
  secrets-manager:
    NPM_TOKEN: ci/npm-token:token
phases:
  install:
    runtime-versions: { nodejs: 20 }
    commands:
      - npm ci
  pre_build:
    commands:
      - npm test
      - aws ecr get-login-password | docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-east-1.amazonaws.com
      - export TAG=\${CODEBUILD_RESOLVED_SOURCE_VERSION:0:7}
  build:
    commands:
      - docker build -t $REPO_URI:$TAG .
      - docker push $REPO_URI:$TAG
  post_build:
    commands:
      - printf '[{"name":"api","imageUri":"%s"}]' $REPO_URI:$TAG > imagedefinitions.json
artifacts:
  files: [imagedefinitions.json]`,
            `# CodeDeploy appspec.yaml for an ECS blue/green deployment
version: 0.0
Resources:
  - TargetService:
      Type: AWS::ECS::Service
      Properties:
        TaskDefinition: <TASK_DEFINITION>
        LoadBalancerInfo:
          ContainerName: api
          ContainerPort: 8080
Hooks:
  - AfterAllowTestTraffic: "arn:aws:lambda:us-east-1:123456789012:function:smoke-test"

# Start a pipeline run and watch it
aws codepipeline start-pipeline-execution --name orders-api-pipeline
aws codepipeline get-pipeline-state --name orders-api-pipeline \\
  --query 'stageStates[].{stage:stageName,status:latestExecution.status}' --output table`,
          ],
          questions: [
            {
              question: "What is the difference between CodePipeline, CodeBuild and CodeDeploy?",
              solution: "<p><strong>CodePipeline</strong> is the orchestrator: it defines the stages, watches the source, passes artifacts and decides what runs next. <strong>CodeBuild</strong> does the work of compiling, testing and packaging in ephemeral containers driven by a buildspec. <strong>CodeDeploy</strong> handles the release onto EC2, ECS or Lambda with strategies such as in-place, blue/green, canary and linear, plus automatic rollback. A pipeline typically has CodeBuild in its build and test stages and CodeDeploy (or CloudFormation) in its deploy stages, but any of them can be used alone.</p>",
            },
            {
              question: "How would you implement a canary deployment for a Lambda-based API in CodePipeline?",
              solution: "<p>Use a <strong>CodeDeploy Lambda deployment</strong> (often via SAM or CDK). Publish a new function version, and CodeDeploy shifts the production <strong>alias</strong> using a configuration such as <code>Canary10Percent5Minutes</code> or <code>Linear10PercentEvery1Minute</code>. Attach <strong>CloudWatch alarms</strong> on error rate and latency; if any alarm fires during the shift, CodeDeploy rolls the alias back automatically. Add <strong>pre- and post-traffic hook</strong> Lambdas for smoke tests. The pipeline stage simply invokes this CodeDeploy deployment after the build.</p>",
            },
            {
              question: "How do you deploy from one pipeline into multiple AWS accounts (dev, staging, prod)?",
              solution: "<p>Run the pipeline in a <strong>tooling account</strong>. Use an artifact S3 bucket and a <strong>customer-managed KMS key</strong> whose policies allow the target accounts to read. In each target account create a <strong>cross-account role</strong> that the pipeline's action role can assume, with permissions to deploy (CloudFormation, ECS, etc.). Each deploy action specifies that role ARN. CDK Pipelines automates this bootstrap. Promote the same artifact through accounts, with approvals or automated tests between them.</p>",
            },
            {
              question: "What are pipeline execution modes and why does superseded mode matter?",
              solution: "<p>In <strong>Superseded</strong> mode (the default), if a newer execution reaches a stage where an older one is waiting (for example at a manual approval), the older one is cancelled and the newer proceeds, so you always deploy the latest commit. <strong>Queued</strong> mode processes executions strictly in order, useful when each change must be applied (database migrations). <strong>Parallel</strong> mode lets executions run simultaneously, useful for independent feature branches with V2 trigger filters. Choosing wrongly can either skip a required change or create a backlog of stale deployments.</p>",
            },
            {
              question: "How would you keep secrets and credentials out of your CodeBuild logs and pipeline?",
              solution: "<p>Reference secrets in <code>buildspec.yml</code> via the <code>env.secrets-manager</code> or <code>env.parameter-store</code> sections so CodeBuild injects them at runtime and masks them in logs. Never <code>echo</code> them. Use the CodeBuild service role (and ECR login via <code>get-login-password</code>) instead of static access keys, and use CodeConnections for GitHub rather than personal tokens. Restrict the build project's role to only the secrets and resources it needs, and enable CloudTrail to audit reads.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html",
            "https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html",
            "https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html",
          ],
        },
        {
          topic: "AWS Cognito",
          tags: ["aws", "auth", "cognito", "oauth", "jwt", "identity"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>Amazon Cognito</strong> is the AWS managed identity service for your application's <em>end users</em> (as opposed to IAM, which is for AWS operators and services). It handles sign-up, sign-in, MFA, password policies, social and enterprise federation, and issues standard <strong>OAuth 2.0 / OpenID Connect</strong> tokens your APIs can verify. It has two distinct parts that interviewers expect you to keep straight.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">User Pools: authentication</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>A <strong>user directory</strong> with attributes, groups, password policies, MFA (SMS, TOTP, passkeys), account recovery and adaptive risk-based authentication.</li>
  <li><strong>Federation:</strong> Sign in with Google, Apple, Facebook, Amazon, or any SAML 2.0 / OIDC provider (Okta, Entra ID). Cognito normalises everyone into one pool.</li>
  <li><strong>Hosted UI</strong> and the <strong>OAuth endpoints</strong> (<code>/authorize</code>, <code>/token</code>, <code>/userInfo</code>) so you get authorization code flow with PKCE for free.</li>
  <li>Issues three JWTs: <strong>ID token</strong> (who the user is), <strong>access token</strong> (scopes, groups, for calling APIs), <strong>refresh token</strong> (long-lived, to get new tokens).</li>
  <li><strong>Lambda triggers</strong> customise every step: pre sign-up (auto-confirm, allowlist), post confirmation (create DB row), pre token generation (add custom claims), custom auth challenges (magic links).</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Identity Pools: authorization to AWS</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Exchange an identity token (from a User Pool, social provider, or SAML) for <strong>temporary AWS credentials</strong> via STS.</li>
  <li>Map users to <strong>IAM roles</strong>, for example authenticated users may write to <code>s3://uploads/\${cognito-identity.amazonaws.com:sub}/*</code>; guests get read-only access.</li>
  <li>Used when the browser or mobile app talks to AWS services directly (S3, DynamoDB, AppSync, IoT) instead of going through your API.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Verifying tokens in your backend</h4>
<p style="line-height: 1.75;">Fetch the JWKS from <code>https://cognito-idp.&lt;region&gt;.amazonaws.com/&lt;poolId&gt;/.well-known/jwks.json</code>, verify the signature, <code>iss</code>, <code>exp</code>, <code>token_use</code> and the client ID or audience, then authorise on <code>cognito:groups</code> or custom scopes. <strong>API Gateway</strong> has a built-in Cognito authorizer and <strong>ALB</strong> can authenticate users with Cognito before forwarding.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Pricing and limits to remember</h4>
<p style="line-height: 1.75;">Billed on monthly active users with a free tier; advanced security features and SAML/OIDC federation cost more per MAU. Refresh tokens live 1 hour to 10 years, access and ID tokens 5 minutes to 24 hours.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Cognito User Pools authenticate my app's users, including social and SAML federation and MFA, and issue OIDC JWTs that my API verifies against the pool's JWKS or via an API Gateway authorizer. Identity Pools are different: they swap a token for temporary IAM credentials so a client can call S3 or DynamoDB directly with fine-grained, per-user policies. I use Lambda triggers to add custom claims and sync users into my own database."</div>
</div>`,
          examples: [
            `# Create a user pool with email sign-in, strong passwords and TOTP MFA
aws cognito-idp create-user-pool --pool-name app-users \\
  --username-attributes email --auto-verified-attributes email \\
  --policies 'PasswordPolicy={MinimumLength=12,RequireUppercase=true,RequireNumbers=true,RequireSymbols=true}' \\
  --mfa-configuration OPTIONAL --software-token-mfa-configuration Enabled=true

# App client for a SPA (public client, PKCE, no secret)
aws cognito-idp create-user-pool-client --user-pool-id us-east-1_AbC123 \\
  --client-name web --no-generate-secret \\
  --allowed-o-auth-flows code --allowed-o-auth-flows-user-pool-client \\
  --allowed-o-auth-scopes openid email profile \\
  --callback-urls https://app.example.com/callback \\
  --supported-identity-providers COGNITO Google \\
  --access-token-validity 60 --id-token-validity 60 --refresh-token-validity 30 \\
  --token-validity-units AccessToken=minutes,IdToken=minutes,RefreshToken=days`,
            `// Express middleware: verify a Cognito access token
import { CognitoJwtVerifier } from "aws-jwt-verify";

const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.USER_POOL_ID,
  tokenUse: "access",
  clientId: process.env.CLIENT_ID,
});

export async function requireAuth(req, res, next) {
  try {
    const token = (req.headers.authorization || "").replace("Bearer ", "");
    const payload = await verifier.verify(token); // checks signature, iss, exp, client_id
    req.user = { sub: payload.sub, groups: payload["cognito:groups"] || [] };
    next();
  } catch (err) {
    res.status(401).json({ error: "invalid or expired token" });
  }
}

export const requireGroup = (group) => (req, res, next) =>
  req.user.groups.includes(group) ? next() : res.status(403).end();`,
            `// Pre Token Generation trigger: add a tenant claim from your database
export const handler = async (event) => {
  const tenantId = await lookupTenant(event.request.userAttributes.email);
  event.response = {
    claimsOverrideDetails: {
      claimsToAddOrOverride: { "custom:tenantId": tenantId },
    },
  };
  return event;
};`,
          ],
          questions: [
            {
              question: "What is the difference between a Cognito User Pool and an Identity Pool?",
              solution: "<p>A <strong>User Pool</strong> is an <strong>authentication</strong> service and user directory: it signs users up and in (with MFA and federation) and issues OIDC JWTs (ID, access, refresh) that your own APIs verify. An <strong>Identity Pool</strong> (Federated Identities) is an <strong>authorization</strong> bridge to AWS: it exchanges a token from a User Pool or external provider for <strong>temporary IAM credentials</strong> so a client can call AWS services directly under a role. You can use either alone or chain them: authenticate with a User Pool, then obtain AWS credentials from an Identity Pool.</p>",
            },
            {
              question: "Explain the three tokens Cognito issues and how each should be used.",
              solution: "<p>The <strong>ID token</strong> is an OIDC JWT describing the user (email, name, groups) and is meant for the client to know who is logged in; it should not be sent to third-party APIs. The <strong>access token</strong> carries scopes and groups and is what you send as a Bearer token to your APIs for authorization. The <strong>refresh token</strong> is opaque and long-lived; the client uses it to silently obtain new ID and access tokens when they expire, and it should be stored as securely as possible (HTTP-only cookie via a backend, or secure storage on mobile). Revoking the refresh token ends the session.</p>",
            },
            {
              question: "How does your backend verify a Cognito JWT without calling Cognito on every request?",
              solution: "<p>Cognito signs tokens with RS256 and publishes its public keys at the pool's <strong>JWKS URL</strong>. The backend downloads and caches those keys, then for each request verifies the signature locally, checks <code>iss</code> matches the pool, <code>exp</code> is in the future, <code>token_use</code> is <code>access</code> (or <code>id</code>), and the <code>client_id</code> or <code>aud</code> matches your app client. Libraries such as <code>aws-jwt-verify</code> handle key rotation. No network call to Cognito is needed after the JWKS is cached, so verification is fast and scales.</p>",
            },
            {
              question: "How would you implement multi-tenant authorization with Cognito?",
              solution: "<p>Store the tenant relationship in your database or as a custom attribute, and use a <strong>Pre Token Generation Lambda trigger</strong> to inject a <code>custom:tenantId</code> claim (and roles) into the tokens. Your API reads the claim and scopes every query to that tenant. For per-tenant SSO, configure each enterprise customer as a SAML or OIDC identity provider in the same pool and map their attributes. If tenants need hard isolation or separate password policies, use a user pool per tenant and route by domain at login.</p>",
            },
            {
              question: "What are Cognito Lambda triggers and give three practical uses.",
              solution: "<p>Lambda triggers are hooks Cognito invokes at points in the auth lifecycle. Practical uses: (1) <strong>Pre sign-up</strong> to restrict registration to allowed email domains or auto-confirm invited users; (2) <strong>Post confirmation</strong> to create the user's profile row in your database and send a welcome email; (3) <strong>Pre token generation</strong> to add custom claims such as tenant, plan or permissions; (4) <strong>Custom message</strong> to brand verification emails; (5) <strong>Define/Create/Verify auth challenge</strong> to build passwordless magic-link or OTP flows; (6) <strong>User migration</strong> to lazily import users from a legacy system on first login.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html",
            "https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-with-identity-providers.html",
            "https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools-working-with-aws-lambda-triggers.html",
          ],
        },
        {
          topic: "Sentry",
          tags: ["observability", "sentry", "error tracking", "monitoring", "apm"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>Sentry</strong> is an application monitoring platform focused on <strong>error tracking</strong> and <strong>performance monitoring</strong>. Where CloudWatch tells you a container is unhealthy, Sentry tells you <em>which line of code threw, for which users, after which release</em>, with the full stack trace, request context and breadcrumbs. It is not an AWS service, but it sits next to CloudWatch in almost every production stack, so it comes up in AWS-heavy interviews.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Core concepts</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>DSN:</strong> The project-specific endpoint the SDK sends events to.</li>
  <li><strong>Event and Issue:</strong> Every captured exception is an event; Sentry <strong>groups</strong> similar events into an issue using the stack trace fingerprint, so 10,000 occurrences of one bug are one issue with a count, not 10,000 alerts.</li>
  <li><strong>Breadcrumbs:</strong> A trail of recent console logs, HTTP calls, DB queries and UI clicks leading up to the error.</li>
  <li><strong>Context and tags:</strong> User ID, tenant, release, environment, feature flags. Tags are indexed and searchable.</li>
  <li><strong>Releases and source maps:</strong> Tag events with a version so you can see which deploy introduced a regression and get readable stack traces for minified JavaScript.</li>
  <li><strong>Environments:</strong> Separate production, staging and development so alerts are meaningful.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Performance and tracing</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Transactions and spans</strong> (OpenTelemetry compatible) measure request duration and break it into DB queries, HTTP calls and rendering.</li>
  <li><strong>Distributed tracing</strong> links the browser request to the API to the background worker via <code>sentry-trace</code> and <code>baggage</code> headers.</li>
  <li><strong>Web Vitals</strong>, slow query detection, N+1 detection, and <strong>Session Replay</strong> to watch what the user did.</li>
  <li><strong>Sampling:</strong> <code>tracesSampleRate</code> (or a sampler function) controls cost; errors are usually captured at 100%, traces at 5 to 20%.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Alerting and workflow</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Issue alerts</strong> (new issue, regression, spike) and <strong>metric alerts</strong> (error rate, p95 latency, Apdex) route to Slack, PagerDuty, email or webhooks.</li>
  <li>Assign, resolve (in next release), ignore, and link issues to Jira or GitHub. Suspect commits point at the likely author.</li>
  <li><strong>Data scrubbing</strong> removes PII (passwords, tokens, credit cards) before storage; <code>beforeSend</code> lets you filter or redact in code.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Sentry alongside AWS</h4>
<p style="line-height: 1.75;">Use CloudWatch for infrastructure metrics, alarms and raw logs; use Sentry for application exceptions, release health and user-facing performance. Sentry has SDK integrations for Lambda (wrap the handler, flush before return), ECS and Next.js, and can forward events to EventBridge via webhooks for automation.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Sentry captures exceptions with stack traces, breadcrumbs and user context, groups them into issues, and ties them to releases so I can see exactly which deploy broke what and for whom. I add performance tracing with sampling to find slow endpoints and N+1 queries, scrub PII before events leave the app, and alert on new issues and regressions to Slack. It complements CloudWatch, which watches the infrastructure."</div>
</div>`,
          examples: [
            `// Next.js / Node setup with release, environment, sampling and PII scrubbing
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  release: process.env.NEXT_PUBLIC_GIT_SHA,       // ties events to a deploy
  tracesSampleRate: 0.1,                          // 10% of transactions
  replaysOnErrorSampleRate: 1.0,                  // record replay when an error happens
  sendDefaultPii: false,
  beforeSend(event) {
    if (event.request?.headers) delete event.request.headers.authorization;
    return event;
  },
});

// Attach who and where, then capture with extra context
Sentry.setUser({ id: user.id, segment: user.plan });
Sentry.setTag("tenant", tenantId);

try {
  await chargeCard(order);
} catch (err) {
  Sentry.captureException(err, { extra: { orderId: order.id, amount: order.total } });
  throw err;
}`,
            `// AWS Lambda: wrap the handler so events flush before the function freezes
import * as Sentry from "@sentry/aws-serverless";

Sentry.init({ dsn: process.env.SENTRY_DSN, tracesSampleRate: 0.2 });

export const handler = Sentry.wrapHandler(async (event) => {
  const result = await processRecords(event.Records);
  return result;
});`,
            `# Upload source maps for a release during CI (sentry-cli)
export SENTRY_AUTH_TOKEN=... SENTRY_ORG=my-org SENTRY_PROJECT=web
sentry-cli releases new "$GIT_SHA"
sentry-cli sourcemaps upload --release "$GIT_SHA" ./.next
sentry-cli releases set-commits "$GIT_SHA" --auto
sentry-cli releases finalize "$GIT_SHA"
sentry-cli releases deploys "$GIT_SHA" new -e production`,
          ],
          questions: [
            {
              question: "How does Sentry differ from CloudWatch Logs, and why use both?",
              solution: "<p><strong>CloudWatch Logs</strong> is a raw, append-only log store with query and alarm capabilities; it captures everything the infrastructure and applications write, and it is the source of truth for audit and ops. <strong>Sentry</strong> is opinionated about <strong>exceptions</strong>: it captures structured events with stack traces, local variables, breadcrumbs and user context, <strong>deduplicates</strong> them into issues, links them to releases and commits, and adds performance tracing and session replay. You use CloudWatch to know the system is unhealthy and to search logs, and Sentry to know which bug, in which release, is affecting which users.</p>",
            },
            {
              question: "What is issue grouping (fingerprinting) and why does it matter?",
              solution: "<p>Sentry computes a <strong>fingerprint</strong> from the exception type and the in-app stack frames so that repeated occurrences of the same bug become one <strong>issue</strong> with a count, a first-seen and last-seen, and affected-user statistics, instead of thousands of separate alerts. It matters for signal-to-noise: you get one notification per new issue or regression. When grouping is too coarse or too fine (for example dynamic error messages), you set a <strong>custom fingerprint</strong> in <code>beforeSend</code> or with server-side grouping rules.</p>",
            },
            {
              question: "How do you keep Sentry from capturing sensitive data?",
              solution: "<p>Set <code>sendDefaultPii: false</code>, use server-side <strong>data scrubbing</strong> rules (defaults cover passwords, tokens and card numbers, and you can add regexes for your own fields), and implement <code>beforeSend</code> / <code>beforeSendTransaction</code> to strip headers such as <code>Authorization</code> and cookies, or drop events entirely. Mask text and block media in <strong>Session Replay</strong>. For strict compliance use a regional data residency option or self-hosted Sentry, and keep only user IDs, never emails or names, in the user context.</p>",
            },
            {
              question: "How do releases and source maps improve debugging a frontend error?",
              solution: "<p>Minified production JavaScript produces useless stack traces like <code>a.js:1:23456</code>. Uploading <strong>source maps</strong> for a given <strong>release</strong> lets Sentry map frames back to original file names, line numbers and surrounding source code. Tagging every event with the release also enables <strong>release health</strong>: crash-free session rates per version, marking an issue as resolved in the next release and getting a regression alert if it reappears, and <strong>suspect commits</strong> that point to the change most likely to have caused it.</p>",
            },
            {
              question: "How would you control Sentry cost and noise in a high-traffic service?",
              solution: "<p>Capture errors at 100% but set <code>tracesSampleRate</code> low (5 to 20%) or use a <code>tracesSampler</code> to sample important routes more and health checks at zero. Use <strong>inbound filters</strong> to drop browser extension errors, known bots and legacy browsers, and <code>ignoreErrors</code> for expected exceptions. Configure <strong>rate limits and spike protection</strong> per project so a deploy bug cannot burn the quota. Finally, tune alert rules to fire on new issues, regressions and error-rate thresholds rather than every event.</p>",
            },
          ],
          links: [
            "https://docs.sentry.io/product/",
            "https://docs.sentry.io/platforms/javascript/guides/nextjs/",
            "https://docs.sentry.io/platforms/javascript/guides/aws-lambda/",
          ],
        },
      ],
    },
  ],
};
