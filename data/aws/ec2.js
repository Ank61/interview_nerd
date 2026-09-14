/**
 * AWS EC2 - interview prep data
 *
 * Split from the single "EC2" concept in data/awsPrepareData.js into
 * focused Beginner and Advance concepts.
 */
export const awsEc2 = {
  id: 101,
  category: "AWS EC2",
  themeBgColor: "#FFF4E5",
  textColor: "#B45309",
  topicColor: "#F97316",
  lightColor: "#FFFBEB",
  type: [
    {
      id: 1,
      label: "Beginner",
      concepts: [
        {
          topic: "Instance Types & AMIs",
          tags: ["aws", "ec2", "compute", "ami", "instance types"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>Amazon EC2 (Elastic Compute Cloud)</strong> provides resizable virtual servers called instances. Every instance is defined by two core choices: the <strong>AMI</strong> (Amazon Machine Image), which decides what software boots, and the <strong>instance type</strong>, which decides how much CPU, memory, storage and network bandwidth the virtual machine gets. Interviewers use these two building blocks to check that you can right-size compute and reproduce environments reliably.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What an AMI contains</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>A root volume template: the operating system, installed packages, and application code.</li>
  <li>Launch permissions that control which accounts may use the image.</li>
  <li>A block device mapping describing the volumes to attach at launch.</li>
  <li>AMIs are <strong>regional</strong>; copy them to launch in another region. They can be public (Amazon Linux, Ubuntu), Marketplace, or private images you bake yourself.</li>
</ul>
<p style="line-height: 1.75;">Teams typically build <strong>golden AMIs</strong> with <strong>EC2 Image Builder</strong> or HashiCorp Packer so that every instance starts hardened and pre-installed, leaving only environment-specific configuration to <strong>user data</strong> scripts. This shortens boot time and makes Auto Scaling replacements predictable.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Reading an instance type name</h4>
<p style="line-height: 1.75;">A name like <code>m7g.xlarge</code> breaks down into family (<code>m</code> = general purpose), generation (<code>7</code>), attributes (<code>g</code> = Graviton ARM processor, <code>a</code> = AMD, <code>d</code> = local NVMe, <code>n</code> = enhanced networking) and size (<code>xlarge</code>). Sizes roughly double vCPU and memory at each step.</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>t (burstable):</strong> Cheap baseline CPU with credits for bursts. Good for dev boxes and low-traffic sites; watch for credit exhaustion.</li>
  <li><strong>m (general):</strong> Balanced CPU to memory (1:4). Web and application servers.</li>
  <li><strong>c (compute):</strong> High CPU to memory (1:2). Batch, encoding, game servers.</li>
  <li><strong>r, x (memory):</strong> 1:8 or more. In-memory caches, analytics, large databases.</li>
  <li><strong>i, d (storage):</strong> Dense local NVMe or HDD for data warehouses and distributed file systems.</li>
  <li><strong>g, p, inf, trn (accelerated):</strong> GPUs and custom ML chips.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Choosing well</h4>
<p style="line-height: 1.75;">Start with a general-purpose type, measure with CloudWatch (<code>CPUUtilization</code>, memory via the agent, <code>NetworkIn/Out</code>), then move to a specialised family. <strong>Graviton</strong> instances are usually 20 to 40 percent cheaper for the same performance if your stack runs on ARM. <strong>AWS Compute Optimizer</strong> recommends right-sizing based on real utilisation.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "An AMI is the boot template, an instance type is the hardware profile. I bake golden AMIs with Image Builder so launches are fast and consistent, and I pick a family by the workload's bottleneck: c for CPU, r for memory, general-purpose m or Graviton for most web tiers, then right-size with Compute Optimizer."</div>
</div>`,
          examples: [
            `# Find the latest Amazon Linux 2023 ARM AMI via public SSM parameter
aws ssm get-parameter \\
  --name /aws/service/ami-amazon-linux-latest/al2023-ami-kernel-default-arm64 \\
  --query 'Parameter.Value' --output text

# Launch a Graviton instance from it
aws ec2 run-instances \\
  --image-id ami-0abcdef1234567890 \\
  --instance-type m7g.large \\
  --subnet-id subnet-0123 \\
  --security-group-ids sg-0456 \\
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=api-1}]'

# Bake a custom AMI from a configured instance
aws ec2 create-image --instance-id i-0abc123 --name "api-golden-2026-09-12" --no-reboot

# Compare instance types by vCPU and memory
aws ec2 describe-instance-types \\
  --instance-types m7g.large c7g.large r7g.large \\
  --query 'InstanceTypes[].[InstanceType,VCpuInfo.DefaultVCpus,MemoryInfo.SizeInMiB]' \\
  --output table`,
          ],
          questions: [
            {
              question: "What is an AMI and why would you build your own instead of using a public one?",
              solution: "<p>An <strong>AMI</strong> is a regional image containing the root volume snapshot, launch permissions and block device mapping used to launch instances. Building a <strong>golden AMI</strong> (with EC2 Image Builder or Packer) pre-installs runtimes, agents and security hardening so instances boot in seconds instead of running long <code>user data</code> installs. It also makes Auto Scaling replacements deterministic and lets you version and roll back the whole machine, not just the app.</p>",
            },
            {
              question: "Explain the difference between t3, m5 and c5 instance families.",
              solution: "<p><strong>t3</strong> is <strong>burstable</strong>: it earns CPU credits at a low baseline and spends them during spikes, which is cheap but throttles (or bills extra in unlimited mode) when credits run out. <strong>m5</strong> is general purpose with a balanced 1:4 vCPU to GiB ratio for typical web and app servers. <strong>c5</strong> is compute optimised with a 1:2 ratio and higher clock speeds for CPU-bound work like encoding, batch processing and scientific computing.</p>",
            },
            {
              question: "What does the letter g mean in m7g and why does it matter for cost?",
              solution: "<p>The <code>g</code> denotes an <strong>AWS Graviton</strong> ARM-based processor. Graviton instances typically deliver up to 40 percent better price-performance than comparable x86 types because AWS designs the chip and prices it lower. The catch is architecture compatibility: your AMI, container images and native dependencies must be built for <code>arm64</code>, so you test for ARM support before migrating.</p>",
            },
            {
              question: "Can you launch an AMI created in us-east-1 directly in eu-west-1?",
              solution: "<p>No. AMIs are <strong>regional resources</strong>. You must run <code>aws ec2 copy-image</code> to copy it into the target region, which creates a new AMI ID there (encrypted AMIs need a KMS key in the destination region). Multi-region deployments usually automate this copy in the image pipeline so every region has an identical, versioned image.</p>",
            },
            {
              question: "How do you decide whether an instance is under or over-provisioned?",
              solution: "<p>Look at <strong>CloudWatch</strong> metrics over a representative window: sustained <code>CPUUtilization</code> above 70 to 80 percent, high <code>CPUCreditBalance</code> depletion on t-types, memory pressure (needs the CloudWatch agent), or network and EBS throughput hitting the type's documented limits all indicate under-provisioning. Consistently low usage means you can step down a size or switch families. <strong>AWS Compute Optimizer</strong> automates this and recommends specific types with projected savings.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html",
            "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html",
            "https://docs.aws.amazon.com/imagebuilder/latest/userguide/what-is-image-builder.html",
          ],
        },
        {
          topic: "EBS vs Instance Store",
          tags: ["aws", "ec2", "ebs", "storage", "snapshots"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  EC2 instances can use two kinds of block storage: <strong>Amazon EBS (Elastic Block Store)</strong>, a network-attached volume that lives independently of the instance, and <strong>instance store</strong>, physically attached disks on the host. Understanding which data survives a stop, a termination, or a hardware failure is one of the most common EC2 interview topics.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">EBS essentials</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Persistent:</strong> data survives instance stop and start. On termination the root volume is deleted by default (<code>DeleteOnTermination=true</code>); additional volumes are kept.</li>
  <li><strong>AZ-bound:</strong> a volume can only attach to instances in the same Availability Zone. To move it, snapshot and restore in another AZ or region.</li>
  <li><strong>Volume types:</strong> <code>gp3</code> (general SSD, baseline 3,000 IOPS and 125 MiB/s, provision more independently of size), <code>io2 Block Express</code> (up to 256,000 IOPS for databases), <code>st1</code> (throughput HDD for logs and big data), <code>sc1</code> (cold HDD).</li>
  <li><strong>Elastic:</strong> you can grow size, change type and adjust IOPS online, then extend the file system inside the OS.</li>
  <li><strong>Snapshots:</strong> incremental point-in-time copies stored in S3, usable for backup, cloning, cross-region DR and creating AMIs. Amazon Data Lifecycle Manager or AWS Backup schedules them.</li>
  <li><strong>Encryption:</strong> KMS-backed encryption at rest and in transit between volume and instance; enable encryption-by-default per region.</li>
  <li><strong>Multi-Attach:</strong> io1/io2 volumes can attach to several instances in the same AZ for clustered file systems.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Instance store essentials</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Ephemeral:</strong> data is lost when the instance stops, hibernates, terminates or the underlying host fails. It does survive a reboot.</li>
  <li><strong>Very fast:</strong> local NVMe with millions of IOPS and no network hop, included in the instance price.</li>
  <li>Only available on certain families (<code>i</code>, <code>d</code>, and types with the <code>d</code> suffix such as <code>m6id</code>).</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Choosing between them</h4>
<p style="line-height: 1.75;">Use EBS for anything that must survive: operating systems, databases, application state. Use instance store for scratch space, caches, buffers, and distributed systems that already replicate data (Kafka, Cassandra, Elasticsearch) where raw IOPS matter more than durability. A common pattern is instance store for hot data with regular checkpoints to EBS or S3.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "EBS is network-attached, persistent, AZ-bound block storage I can snapshot, resize and encrypt; instance store is local NVMe that is extremely fast but disappears on stop or hardware failure. I use gp3 for most workloads, io2 for IOPS-heavy databases, and instance store only for caches or replicated systems."</div>
</div>`,
          examples: [
            `# Create an encrypted gp3 volume with extra IOPS and attach it
aws ec2 create-volume --availability-zone us-east-1a --size 200 \\
  --volume-type gp3 --iops 6000 --throughput 250 --encrypted \\
  --tag-specifications 'ResourceType=volume,Tags=[{Key=Name,Value=app-data}]'
aws ec2 attach-volume --volume-id vol-0abc --instance-id i-0123 --device /dev/sdf

# Inside the instance: format, mount, and persist in fstab
sudo mkfs -t xfs /dev/nvme1n1
sudo mkdir -p /data && sudo mount /dev/nvme1n1 /data
echo "UUID=$(sudo blkid -s UUID -o value /dev/nvme1n1) /data xfs defaults,nofail 0 2" | sudo tee -a /etc/fstab

# Grow a volume online, then extend the filesystem
aws ec2 modify-volume --volume-id vol-0abc --size 400
sudo xfs_growfs /data

# Snapshot and copy to another region for DR
aws ec2 create-snapshot --volume-id vol-0abc --description "nightly app-data"
aws ec2 copy-snapshot --source-region us-east-1 --source-snapshot-id snap-0def \\
  --destination-region eu-west-1 --encrypted`,
          ],
          questions: [
            {
              question: "What is the difference between EBS and instance store?",
              solution: "<p><strong>EBS</strong> is network-attached block storage that persists independently of the instance, can be snapshotted to S3, resized, and re-attached to another instance in the same AZ. <strong>Instance store</strong> is physically attached NVMe/SSD with very high IOPS but is <strong>ephemeral</strong>: data disappears on stop, hibernate, or hardware failure. Use instance store for caches and scratch space, EBS for anything that must survive.</p>",
            },
            {
              question: "What is the difference between stopping and terminating an EC2 instance?",
              solution: "<p><strong>Stopping</strong> shuts the instance down but keeps its EBS root volume, so you can start it again with the same data (you stop paying for compute but still pay for EBS). Instance-store data is lost either way. <strong>Terminating</strong> permanently deletes the instance, and by default deletes the root EBS volume too unless <code>DeleteOnTermination</code> is disabled. Elastic IPs stay allocated to your account (and billed) if not released.</p>",
            },
            {
              question: "How do EBS snapshots work and why are they called incremental?",
              solution: "<p>The first snapshot copies every written block of the volume to S3-backed storage. Each later snapshot stores only the <strong>blocks that changed</strong> since the previous one, yet every snapshot is independently restorable because it references the unchanged blocks. Deleting an older snapshot never breaks newer ones; AWS just moves any still-referenced blocks forward. This keeps storage cost low and makes frequent backups practical.</p>",
            },
            {
              question: "When would you choose io2 over gp3?",
              solution: "<p><strong>gp3</strong> gives 3,000 IOPS and 125 MiB/s baseline and can be provisioned up to 16,000 IOPS and 1,000 MiB/s, which covers most application and small database workloads cheaply. Choose <strong>io2 (Block Express)</strong> when you need more than 16,000 IOPS per volume (up to 256,000), sub-millisecond consistent latency, higher durability (99.999 percent), or <strong>Multi-Attach</strong> for clustered databases. It costs considerably more per GB and per provisioned IOPS.</p>",
            },
            {
              question: "Can you attach an EBS volume from us-east-1a to an instance in us-east-1b?",
              solution: "<p>No, EBS volumes are <strong>Availability Zone specific</strong> because they are replicated within a single AZ. To move data, create a <strong>snapshot</strong> (which is regional) and create a new volume from it in the target AZ. The same snapshot-and-restore approach, combined with <code>copy-snapshot</code>, is how you move volumes across regions.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volume-types.html",
            "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage.html",
            "https://docs.aws.amazon.com/ebs/latest/userguide/ebs-snapshots.html",
          ],
        },
        {
          topic: "Security Groups & Key Pairs",
          tags: ["aws", "ec2", "security groups", "ssh", "firewall"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Two controls decide who can reach an EC2 instance and how: the <strong>security group</strong>, a virtual firewall attached to the instance's network interface, and the <strong>key pair</strong>, the public-key credential used for SSH (Linux) or decrypting the administrator password (Windows). Interviewers expect you to know the security group model cold and to describe modern alternatives to opening port 22.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Security group behaviour</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Stateful:</strong> if an inbound request is allowed, the response is automatically allowed out, and vice versa. No need to open ephemeral ports.</li>
  <li><strong>Allow rules only:</strong> there is no deny; anything not explicitly allowed is dropped. Default inbound is deny all, default outbound is allow all.</li>
  <li><strong>Attached to ENIs:</strong> an instance can have up to five security groups per interface, and rules are evaluated as a union.</li>
  <li><strong>Sources can be other security groups:</strong> allowing <code>sg-alb</code> on port 8080 into <code>sg-app</code> means any instance carrying the ALB group can connect, regardless of its IP. This <strong>chaining</strong> pattern is how you model tiers.</li>
  <li><strong>Changes apply immediately</strong> to all associated instances; no reboot required.</li>
  <li>Rules can also reference <strong>prefix lists</strong> (for example the managed list of CloudFront origin-facing IPs).</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Key pairs</h4>
<p style="line-height: 1.75;">When you launch an instance you choose a key pair; AWS places the public key in <code>~/.ssh/authorized_keys</code> of the default user and you keep the private key (<code>.pem</code> or <code>.ppk</code>). AWS never stores the private key, so a lost key means you must recover through a rescue volume, <strong>EC2 Instance Connect</strong>, or Systems Manager. Rotate keys by adding a new public key and removing the old one, and never share one key across teams.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Avoiding open SSH ports</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>AWS Systems Manager Session Manager:</strong> shell access through the SSM agent with IAM permissions and CloudTrail logging, no inbound rule and no key pair required.</li>
  <li><strong>EC2 Instance Connect:</strong> pushes a one-time 60-second public key using IAM, so long-lived keys are unnecessary.</li>
  <li><strong>Bastion host:</strong> the legacy approach; a hardened jump box in a public subnet with a tight security group, ideally replaced by Session Manager.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Security groups are stateful, allow-only firewalls attached to the instance's network interface; I chain them by referencing other groups so only the load balancer tier can reach the app tier. Key pairs handle SSH, but I prefer Session Manager so I never open port 22 and every session is logged through IAM and CloudTrail."</div>
</div>`,
          examples: [
            `# Create a security group and allow HTTPS from anywhere, app port only from the ALB group
aws ec2 create-security-group --group-name web-sg --description "web tier" --vpc-id vpc-0abc
aws ec2 authorize-security-group-ingress --group-id sg-web \\
  --ip-permissions 'IpProtocol=tcp,FromPort=443,ToPort=443,IpRanges=[{CidrIp=0.0.0.0/0,Description=public https}]'
aws ec2 authorize-security-group-ingress --group-id sg-app \\
  --protocol tcp --port 8080 --source-group sg-alb

# Create a key pair and save the private key locally
aws ec2 create-key-pair --key-name deploy-key --key-type ed25519 \\
  --query 'KeyMaterial' --output text > deploy-key.pem
chmod 400 deploy-key.pem
ssh -i deploy-key.pem ec2-user@ec2-203-0-113-10.compute-1.amazonaws.com

# Prefer Session Manager: no port 22, no key pair, IAM-controlled
aws ssm start-session --target i-0123456789abcdef0

# Push a one-time key with EC2 Instance Connect
aws ec2-instance-connect send-ssh-public-key --instance-id i-0123 \\
  --instance-os-user ec2-user --ssh-public-key file://~/.ssh/id_ed25519.pub`,
          ],
          questions: [
            {
              question: "Why are security groups described as stateful, and what does that mean in practice?",
              solution: "<p>A stateful firewall tracks connections, so when an inbound request matches an allow rule the <strong>return traffic is automatically permitted</strong> even if no outbound rule covers it, and the same applies to responses for outbound requests. In practice you only write rules for the direction that initiates the connection. Network ACLs, by contrast, are stateless and require explicit rules for ephemeral return ports in both directions.</p>",
            },
            {
              question: "How would you allow only your load balancer to reach your application instances?",
              solution: "<p>Use <strong>security group referencing</strong>. Create <code>sg-alb</code> for the load balancer and <code>sg-app</code> for the instances, then add an inbound rule to <code>sg-app</code> allowing the app port with <strong>source = sg-alb</strong> instead of a CIDR. Any interface carrying <code>sg-alb</code> can connect and nothing else can, and the rule keeps working when ALB node IPs change. Repeat the pattern from app to database.</p>",
            },
            {
              question: "You lost the private key for a running instance. How do you regain access?",
              solution: "<p>AWS does not keep private keys, so you have a few options. If the <strong>SSM agent</strong> is running and the instance has an SSM role, use <strong>Session Manager</strong> to open a shell and add a new public key. Otherwise use <strong>EC2 Instance Connect</strong> to push a temporary key (supported AMIs only). As a last resort, stop the instance, detach the root volume, attach it to a rescue instance, edit <code>authorized_keys</code>, and re-attach. Going forward, standardise on Session Manager so keys are not a single point of failure.</p>",
            },
            {
              question: "What is the difference between a security group and a NACL?",
              solution: "<p>A <strong>security group</strong> is attached to an instance's network interface, is <strong>stateful</strong>, supports allow rules only, and can reference other groups. A <strong>NACL</strong> is attached to a subnet, is <strong>stateless</strong>, supports numbered allow and deny rules, and applies to every resource in the subnet. Security groups are the primary day-to-day control; NACLs add a coarse layer, for example to block a known malicious CIDR from an entire subnet.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-security-groups.html",
            "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html",
            "https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html",
          ],
        },
        {
          topic: "EC2 Pricing Models",
          tags: ["aws", "ec2", "pricing", "spot", "savings plans"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  EC2 offers several ways to pay for the same instance, and choosing the right mix is a classic cost-optimisation interview question. The models differ in <strong>commitment</strong>, <strong>flexibility</strong> and <strong>interruption risk</strong>, and a well-run account uses more than one at once.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The four main models</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>On-Demand:</strong> Pay per second (Linux) with no commitment. Highest unit price, zero risk. Use for unpredictable, spiky or short-lived workloads and for anything you have not yet measured.</li>
  <li><strong>Savings Plans:</strong> Commit to a dollar-per-hour spend for 1 or 3 years for up to about 72 percent off. <strong>Compute Savings Plans</strong> apply across instance family, size, region, OS and even Fargate and Lambda; <strong>EC2 Instance Savings Plans</strong> lock to a family in a region for a bigger discount.</li>
  <li><strong>Reserved Instances (RIs):</strong> The older commitment model tied to a specific instance type and region. Standard RIs give the biggest discount; Convertible RIs can be exchanged. Savings Plans are now recommended for most cases.</li>
  <li><strong>Spot Instances:</strong> Spare capacity at up to 90 percent off. AWS can reclaim the instance with a <strong>two-minute interruption notice</strong>. Perfect for stateless, fault-tolerant, or checkpointed work: CI runners, batch, rendering, big data, ML training.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Dedicated options</h4>
<p style="line-height: 1.75;"><strong>Dedicated Hosts</strong> give you a whole physical server so you can bring existing per-socket licences (Windows Server, SQL Server, Oracle) and meet compliance rules. <strong>Dedicated Instances</strong> run on hardware isolated to your account without host-level visibility. <strong>Capacity Reservations</strong> guarantee capacity in a specific AZ without a pricing discount, and can be combined with Savings Plans.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">A practical strategy</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Measure steady-state usage for a few weeks with Cost Explorer.</li>
  <li>Cover the <strong>baseline</strong> with a Compute Savings Plan.</li>
  <li>Run <strong>fault-tolerant workers on Spot</strong> in a diversified Auto Scaling Group (multiple instance types and AZs, price-capacity-optimized allocation).</li>
  <li>Leave <strong>peaks on On-Demand</strong> so you never over-commit.</li>
  <li>Right-size continuously and stop non-production instances outside working hours.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "I cover predictable baseline load with a Compute Savings Plan, run stateless or batch work on Spot with diversified instance types so interruptions are absorbed, and leave spikes on On-Demand. Dedicated Hosts are only for licensing or compliance. That mix typically cuts the compute bill by more than half without risking availability."</div>
</div>`,
          examples: [
            `# Compare current Spot prices for a few types in one AZ
aws ec2 describe-spot-price-history \\
  --instance-types m6i.large m6a.large m7g.large \\
  --product-descriptions "Linux/UNIX" \\
  --availability-zone us-east-1a --max-results 3 \\
  --query 'SpotPriceHistory[].[InstanceType,SpotPrice,Timestamp]' --output table

# Request a one-off Spot instance with a max price cap
aws ec2 run-instances --image-id ami-0abc --instance-type m6i.large \\
  --instance-market-options 'MarketType=spot,SpotOptions={MaxPrice=0.05,SpotInstanceType=one-time}'

# From inside a Spot instance: poll for the 2-minute interruption notice (IMDSv2)
TOKEN=$(curl -sX PUT http://169.254.169.254/latest/api/token \\
  -H "X-aws-ec2-metadata-token-ttl-seconds: 60")
curl -s -o /dev/null -w "%{http_code}" \\
  -H "X-aws-ec2-metadata-token: $TOKEN" \\
  http://169.254.169.254/latest/meta-data/spot/instance-action
# 404 = no interruption scheduled, 200 = drain and checkpoint now

# See Savings Plan recommendations based on the last 30 days
aws ce get-savings-plans-purchase-recommendation \\
  --savings-plans-type COMPUTE_SP --term-in-years ONE_YEAR \\
  --payment-option NO_UPFRONT --lookback-period-in-days THIRTY_DAYS`,
          ],
          questions: [
            {
              question: "When would you choose Spot Instances, and how do you handle interruptions?",
              solution: "<p>Spot is ideal for <strong>fault-tolerant, stateless or batch</strong> workloads: CI runners, data processing, rendering, ML training with checkpoints. AWS gives a <strong>2-minute interruption notice</strong> via instance metadata and EventBridge. Handle it by checkpointing work, draining connections, and using a diversified ASG (multiple instance types and AZs) with a capacity-optimised allocation strategy so replacements are available.</p>",
            },
            {
              question: "What is the difference between Savings Plans and Reserved Instances?",
              solution: "<p>Both are 1 or 3 year commitments with similar maximum discounts, but <strong>Reserved Instances</strong> reserve a specific instance type (and, for Standard RIs, a specific region or AZ), so changing families wastes the commitment. <strong>Savings Plans</strong> commit to a <strong>dollar-per-hour spend</strong> instead: Compute Savings Plans apply automatically across any family, size, region, OS, and also to Fargate and Lambda, so they survive architecture changes. AWS now recommends Savings Plans for most workloads, keeping RIs mainly for RDS and other services that do not support Savings Plans.</p>",
            },
            {
              question: "Design a cost-efficient compute strategy for a web application with a steady baseline and daily traffic peaks.",
              solution: "<p>Measure a few weeks of usage in Cost Explorer, then buy a <strong>Compute Savings Plan</strong> sized to the always-on baseline (for example the minimum ASG capacity). Configure the Auto Scaling Group with a <strong>mixed instances policy</strong>: the baseline on On-Demand (covered by the plan) and additional capacity for peaks on <strong>Spot</strong> across several instance types and AZs, with On-Demand as fallback. Move background jobs entirely to Spot, right-size with Compute Optimizer, and schedule non-production environments to stop at night.</p>",
            },
            {
              question: "What are Dedicated Hosts and when are they required?",
              solution: "<p>A <strong>Dedicated Host</strong> is an entire physical server allocated to your account, giving visibility into sockets and cores and control over instance placement. It is required when you <strong>bring your own licences</strong> that are bound to physical cores or sockets (Windows Server, SQL Server, Oracle in BYOL mode) or when compliance mandates no tenancy sharing. It is billed per host, not per instance, and is the most expensive option, so it is not used for general cost or performance reasons.</p>",
            },
            {
              question: "Does stopping an EC2 instance stop all charges?",
              solution: "<p>No. Stopping ends the <strong>per-second compute charge</strong>, but you keep paying for <strong>EBS volumes</strong>, <strong>snapshots</strong>, and any <strong>Elastic IP</strong> that is allocated but not attached to a running instance. Data transfer for the instance stops. To fully stop charges you must terminate the instance, delete unneeded volumes and snapshots, and release Elastic IPs.</p>",
            },
          ],
          links: [
            "https://aws.amazon.com/ec2/pricing/",
            "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html",
            "https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html",
          ],
        },
      ],
    },
    {
      id: 2,
      label: "Advance",
      concepts: [
        {
          topic: "Auto Scaling Groups & Launch Templates",
          tags: ["aws", "ec2", "auto scaling", "launch template", "high availability"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  An <strong>Auto Scaling Group (ASG)</strong> maintains a fleet of EC2 instances that matches a desired capacity, replaces unhealthy instances, spreads them across Availability Zones, and grows or shrinks in response to load. A <strong>Launch Template</strong> is the versioned blueprint the ASG uses to create each instance: AMI, instance type, key pair, security groups, IAM instance profile, user data, block devices and metadata options. Together they are the standard answer to "how do you make an EC2 tier highly available and elastic".
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Core ASG settings</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Min, max, desired capacity:</strong> the guard rails and the current target.</li>
  <li><strong>Subnets:</strong> list one per AZ so the ASG balances instances across zones and rebalances after an AZ failure.</li>
  <li><strong>Health checks:</strong> EC2 status checks by default; enable <strong>ELB health checks</strong> so an instance failing the application health path is replaced even if the VM is up. A grace period avoids killing instances that are still booting.</li>
  <li><strong>Target groups:</strong> new instances are registered with the load balancer automatically and deregistered (with connection draining) on scale-in.</li>
  <li><strong>Mixed instances policy:</strong> combine On-Demand and Spot across several instance types with an allocation strategy such as <code>price-capacity-optimized</code>.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Scaling policies</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Target tracking:</strong> keep a metric at a value, for example 50 percent average CPU or 1,000 requests per target. Simplest and usually best.</li>
  <li><strong>Step scaling:</strong> add or remove a set number of instances per alarm threshold band.</li>
  <li><strong>Scheduled:</strong> known daily or weekly patterns.</li>
  <li><strong>Predictive scaling:</strong> ML forecast of recurring load that pre-launches capacity.</li>
  <li><strong>Warm pools</strong> keep pre-initialised stopped instances to cut scale-out time.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Lifecycle hooks and deployments</h4>
<p style="line-height: 1.75;"><strong>Lifecycle hooks</strong> pause an instance in <code>Pending:Wait</code> or <code>Terminating:Wait</code> so you can finish bootstrapping, register with a service mesh, or drain and upload logs before termination. To roll out a new AMI you publish a new launch template version and run an <strong>instance refresh</strong>, which replaces instances in batches while honouring a minimum healthy percentage, giving you a rolling deployment without extra tooling. Launch templates supersede the older launch configurations, which cannot be edited or versioned and are deprecated.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "I define the instance in a versioned launch template, then run an Auto Scaling Group across at least two AZs behind an ALB with ELB health checks so unhealthy instances are replaced automatically. Target tracking on CPU or requests-per-target handles elasticity, lifecycle hooks drain instances cleanly, and instance refresh gives me rolling AMI updates."</div>
</div>`,
          examples: [
            `# Create a launch template with IMDSv2 enforced and user data
aws ec2 create-launch-template --launch-template-name api-lt --version-description v1 \\
  --launch-template-data '{
    "ImageId": "ami-0abcdef1234567890",
    "InstanceType": "m7g.large",
    "IamInstanceProfile": {"Name": "api-instance-profile"},
    "SecurityGroupIds": ["sg-app"],
    "MetadataOptions": {"HttpTokens": "required", "HttpPutResponseHopLimit": 1},
    "UserData": "IyEvYmluL2Jhc2gKc3lzdGVtY3RsIHN0YXJ0IGFwaQo=",
    "TagSpecifications": [{"ResourceType": "instance", "Tags": [{"Key": "Name", "Value": "api"}]}]
  }'

# ASG across two AZs, attached to an ALB target group, using ELB health checks
aws autoscaling create-auto-scaling-group --auto-scaling-group-name api-asg \\
  --launch-template LaunchTemplateName=api-lt,Version='$Latest' \\
  --min-size 2 --max-size 10 --desired-capacity 2 \\
  --vpc-zone-identifier "subnet-a,subnet-b" \\
  --target-group-arns arn:aws:elasticloadbalancing:us-east-1:123456789012:targetgroup/api/abc \\
  --health-check-type ELB --health-check-grace-period 120

# Target tracking: keep average CPU near 50%
aws autoscaling put-scaling-policy --auto-scaling-group-name api-asg \\
  --policy-name cpu-50 --policy-type TargetTrackingScaling \\
  --target-tracking-configuration '{
    "PredefinedMetricSpecification": {"PredefinedMetricType": "ASGAverageCPUUtilization"},
    "TargetValue": 50.0
  }'

# Roll out a new launch template version with an instance refresh
aws autoscaling start-instance-refresh --auto-scaling-group-name api-asg \\
  --preferences MinHealthyPercentage=90,InstanceWarmup=120`,
          ],
          questions: [
            {
              question: "How would you make an EC2-based web tier highly available?",
              solution: "<p>Put instances in an <strong>Auto Scaling Group spanning at least two Availability Zones</strong>, register them with an <strong>Application Load Balancer</strong> that performs health checks, and scale on a metric such as CPU or requests-per-target. Keep instances stateless by moving sessions to ElastiCache or DynamoDB and files to S3, so any instance can be replaced. Use a Launch Template for immutable, versioned configuration.</p>",
            },
            {
              question: "What is the difference between EC2 health checks and ELB health checks in an ASG?",
              solution: "<p><strong>EC2 health checks</strong> only look at the hypervisor-level status checks, so an instance whose application has crashed but whose VM is running is considered healthy. <strong>ELB health checks</strong> mark the instance unhealthy when the load balancer's HTTP health path fails, so the ASG terminates and replaces it. Always enable ELB health checks for web tiers and set a <strong>grace period</strong> long enough for the application to boot, otherwise the ASG will kill instances that are still starting.</p>",
            },
            {
              question: "Explain launch templates versus launch configurations.",
              solution: "<p><strong>Launch configurations</strong> are the legacy, immutable definition: to change anything you create a new one and swap it on the ASG, and they cannot express newer features. <strong>Launch templates</strong> are <strong>versioned</strong>, support a default and latest version, can be used by <code>run-instances</code> as well as ASGs, and unlock mixed instance types, Spot and On-Demand mixing, T2/T3 unlimited, placement, and IMDSv2 settings. AWS has deprecated launch configurations, so new work should use templates.</p>",
            },
            {
              question: "How do you deploy a new AMI to a running Auto Scaling Group without downtime?",
              solution: "<p>Create a new <strong>launch template version</strong> pointing at the new AMI and start an <strong>instance refresh</strong>. The ASG replaces instances in batches, waiting for each new instance to pass health checks and the warm-up period, and keeps at least the configured <code>MinHealthyPercentage</code> in service. If errors appear you can cancel or enable automatic rollback. For blue/green you can instead create a second ASG behind the same ALB and shift target group weights.</p>",
            },
            {
              question: "What are lifecycle hooks and when would you use them?",
              solution: "<p>Lifecycle hooks pause an instance transition. A <strong>launch hook</strong> holds the instance in <code>Pending:Wait</code> until your bootstrap (config download, agent registration) signals completion, so traffic is not sent too early. A <strong>terminate hook</strong> holds <code>Terminating:Wait</code> so you can drain connections, flush logs to S3, or deregister from a discovery service before shutdown. Hooks notify via EventBridge, SNS or SQS, and you finish them with <code>complete-lifecycle-action</code> or let the timeout continue the default action.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html",
            "https://docs.aws.amazon.com/autoscaling/ec2/userguide/launch-templates.html",
            "https://docs.aws.amazon.com/autoscaling/ec2/userguide/asg-instance-refresh.html",
          ],
        },
        {
          topic: "IAM Roles & Instance Metadata",
          tags: ["aws", "ec2", "iam", "imdsv2", "instance profile", "security"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Code on an EC2 instance almost always needs to call other AWS services: read from S3, write to DynamoDB, publish metrics. The secure way is an <strong>IAM role attached through an instance profile</strong>, delivered to the instance via the <strong>Instance Metadata Service (IMDS)</strong>. Interviewers use this topic to test whether you understand temporary credentials and the SSRF risk that made IMDSv2 necessary.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Instance profiles and roles</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>An <strong>instance profile</strong> is a container that holds exactly one IAM role and is what you actually attach to the instance; the console creates it for you, the CLI makes you create it explicitly.</li>
  <li>The role's <strong>trust policy</strong> allows <code>ec2.amazonaws.com</code> to assume it; its permission policies describe what the instance may do.</li>
  <li>EC2 calls STS on your behalf and exposes <strong>temporary credentials</strong> (access key, secret, session token) that rotate automatically several times a day.</li>
  <li>The AWS SDKs and CLI find these credentials automatically through the <strong>credential provider chain</strong>, so application code needs no configuration.</li>
  <li>You can attach, replace or detach a role on a running instance without restarting it.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The Instance Metadata Service</h4>
<p style="line-height: 1.75;">IMDS is a link-local HTTP endpoint at <code>169.254.169.254</code> (and <code>fd00:ec2::254</code> for IPv6) that returns instance ID, AZ, private IP, tags, user data, Spot interruption notices, and the role credentials at <code>/latest/meta-data/iam/security-credentials/&lt;role&gt;</code>. Anything running on the instance can reach it, which is exactly the problem.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">IMDSv1 versus IMDSv2</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>IMDSv1</strong> answers plain GET requests. A web app with a <strong>server-side request forgery (SSRF)</strong> bug can be tricked into fetching the credentials URL and leaking the role's keys; this was the root of the 2019 Capital One breach.</li>
  <li><strong>IMDSv2</strong> is session-oriented: the client must first <code>PUT</code> to <code>/latest/api/token</code> with a TTL header to obtain a token, then send it on every request. SSRF via GET cannot perform a PUT with custom headers, and the default <strong>hop limit of 1</strong> blocks forwarded requests from containers.</li>
  <li>Enforce it with <code>HttpTokens=required</code> in the launch template, set an account-level default, and use the <code>MetadataNoToken</code> CloudWatch metric to find stragglers before switching.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Least privilege for instance roles</h4>
<p style="line-height: 1.75;">Give each application tier its own role scoped to the exact buckets, tables and queues it uses. Add conditions such as <code>aws:SourceVpc</code> or <code>aws:ec2InstanceSourceVPC</code> so stolen credentials are useless from outside the VPC, and never place long-lived access keys in AMIs, user data or environment files.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "I attach an IAM role via an instance profile so the SDK picks up short-lived, auto-rotated credentials from the metadata service instead of hard-coded keys. I enforce IMDSv2 so an SSRF bug cannot fetch those credentials with a simple GET, keep the hop limit at 1, and scope each role to exactly what that tier needs."</div>
</div>`,
          examples: [
            `# Create a role EC2 can assume, wrap it in an instance profile, attach to a running instance
cat > trust.json <<'EOF'
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "Service": "ec2.amazonaws.com" },
    "Action": "sts:AssumeRole"
  }]
}
EOF
aws iam create-role --role-name api-role --assume-role-policy-document file://trust.json
aws iam attach-role-policy --role-name api-role \\
  --policy-arn arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore
aws iam create-instance-profile --instance-profile-name api-instance-profile
aws iam add-role-to-instance-profile --instance-profile-name api-instance-profile --role-name api-role
aws ec2 associate-iam-instance-profile --instance-id i-0123 \\
  --iam-instance-profile Name=api-instance-profile

# Enforce IMDSv2 on an existing instance
aws ec2 modify-instance-metadata-options --instance-id i-0123 \\
  --http-tokens required --http-put-response-hop-limit 1 --http-endpoint enabled`,
            `# Fetch IMDSv2 metadata from inside the instance
TOKEN=$(curl -sX PUT http://169.254.169.254/latest/api/token \\
  -H "X-aws-ec2-metadata-token-ttl-seconds: 300")
curl -s -H "X-aws-ec2-metadata-token: $TOKEN" \\
  http://169.254.169.254/latest/meta-data/instance-id

# The role credentials the SDK uses (never log these in real life)
ROLE=$(curl -s -H "X-aws-ec2-metadata-token: $TOKEN" \\
  http://169.254.169.254/latest/meta-data/iam/security-credentials/)
curl -s -H "X-aws-ec2-metadata-token: $TOKEN" \\
  http://169.254.169.254/latest/meta-data/iam/security-credentials/$ROLE

# Confirm which identity the instance is acting as
aws sts get-caller-identity`,
          ],
          questions: [
            {
              question: "How does an EC2 instance call other AWS services securely without storing access keys?",
              solution: "<p>Attach an <strong>IAM role via an instance profile</strong>. The instance retrieves short-lived, automatically rotated credentials from the instance metadata service, and the AWS SDKs pick them up automatically. Enforce <strong>IMDSv2</strong> so an SSRF vulnerability in your app cannot easily exfiltrate those credentials. Never bake long-lived access keys into AMIs or user data.</p>",
            },
            {
              question: "What is the difference between IMDSv1 and IMDSv2, and why does it matter?",
              solution: "<p><strong>IMDSv1</strong> is request/response: any process on the instance can <code>GET</code> metadata, including role credentials. <strong>IMDSv2</strong> requires a session token obtained with a <code>PUT</code> request and a TTL header, sent on every subsequent call, and defaults to a hop limit of 1. This defeats <strong>SSRF</strong> attacks, where a vulnerable web app is coerced into fetching internal URLs, because such attacks normally cannot issue a PUT with custom headers or handle the token exchange. Set <code>HttpTokens=required</code> to disable v1 entirely.</p>",
            },
            {
              question: "What is an instance profile and how does it relate to an IAM role?",
              solution: "<p>An <strong>instance profile</strong> is a thin container that holds a single IAM role and is the object EC2 actually attaches to an instance; roles cannot be attached directly. The console creates the profile automatically with the same name as the role, but with the CLI or IaC you must create it and add the role explicitly. The role's trust policy must allow the <code>ec2.amazonaws.com</code> service principal, and EC2 then delivers that role's temporary credentials through IMDS.</p>",
            },
            {
              question: "Containers on an EC2 host can reach IMDS. How do you prevent a container from stealing the host role's credentials?",
              solution: "<p>Keep the IMDSv2 <strong>hop limit at 1</strong> so packets forwarded through the container bridge network are dropped, and enforce IMDSv2. On ECS use <strong>task roles</strong> and on EKS use <strong>IAM Roles for Service Accounts (IRSA) or Pod Identity</strong> so each workload gets its own credentials and does not need the node role. Many teams also block <code>169.254.169.254</code> from containers with iptables or the ECS agent's <code>ECS_AWSVPC_BLOCK_IMDS</code> setting, and keep the node role minimal.</p>",
            },
            {
              question: "How would you reduce the blast radius if an instance role's credentials are stolen?",
              solution: "<p>Scope the role to <strong>least privilege</strong> (specific buckets, tables, actions) so the credentials are worth little, and add <strong>condition keys</strong> such as <code>aws:SourceVpc</code>, <code>aws:SourceVpce</code> or <code>aws:ec2InstanceSourceVPC</code> so the credentials are rejected when used from outside your network. Monitor with GuardDuty, which specifically flags EC2 credentials used from another account or IP. If a leak is confirmed, revoke sessions on the role with an inline deny on <code>aws:TokenIssueTime</code> and rotate by replacing the instance.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html",
            "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html",
          ],
        },
        {
          topic: "Placement Groups & Networking",
          tags: ["aws", "ec2", "placement groups", "eni", "elastic ip", "networking"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Beyond picking an instance type, advanced EC2 work involves controlling <strong>where instances land physically</strong> and how their <strong>network interfaces</strong> behave. Placement groups tune latency and fault isolation, while Elastic Network Interfaces, Elastic IPs and enhanced networking determine throughput and addressability. These topics separate candidates who have run latency-sensitive or large-scale fleets from those who have only launched single instances.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Placement group strategies</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Cluster:</strong> packs instances close together in one AZ on the same high-bisection network segment for the lowest latency and highest per-flow bandwidth (up to 100 Gbps or more with EFA). Used for HPC, MPI, tightly coupled ML training. Trade-off: a rack failure hits everything, and capacity errors are more likely, so launch all instances at once and use a single type.</li>
  <li><strong>Spread:</strong> each instance on distinct underlying hardware, maximum seven instances per AZ per group. Used for a small number of critical nodes that must not share a failure domain, such as etcd or ZooKeeper members.</li>
  <li><strong>Partition:</strong> divides the group into up to seven partitions per AZ, each on isolated racks, with many instances per partition. The instance sees its partition number via metadata, so distributed systems like HDFS, Kafka and Cassandra can place replicas in different partitions.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Network interfaces and addresses</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>ENI (Elastic Network Interface):</strong> a virtual NIC with a primary private IP, optional secondary IPs, one or more security groups and a MAC address. Extra ENIs can be created independently and moved between instances in the same AZ, which enables failover of a fixed IP or dual-homing across subnets.</li>
  <li><strong>Public IPv4:</strong> assigned at launch from Amazon's pool and released on stop. <strong>Elastic IP:</strong> a static public IPv4 you own and can remap to another instance or ENI in seconds; billed per hour for every public IPv4 since 2024.</li>
  <li><strong>IPv6:</strong> dual-stack or IPv6-only subnets avoid public IPv4 charges and NAT.</li>
  <li><strong>Enhanced networking (ENA):</strong> SR-IOV based driver giving up to 200 Gbps on the largest types with lower jitter; standard on current generation instances. <strong>EFA</strong> adds OS-bypass for MPI and NCCL workloads.</li>
  <li><strong>Bandwidth limits</strong> scale with instance size; small types have burst credits for network too, so sustained throughput tests should be run on the size you plan to deploy.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Related controls</h4>
<p style="line-height: 1.75;"><strong>Source/destination checking</strong> must be disabled on an ENI acting as a NAT or router. <strong>Nitro Enclaves</strong> carve an isolated VM for secret processing. <strong>Capacity Reservations</strong> guarantee that a cluster placement group launch will succeed at a planned time.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Cluster placement groups give lowest latency in one AZ for HPC, spread puts a few critical instances on separate hardware, and partition isolates rack groups for big distributed data systems. For networking I use ENIs for movable IPs and dual-homing, Elastic IPs only when a stable public address is required, and enhanced networking with EFA when inter-node bandwidth is the bottleneck."</div>
</div>`,
          examples: [
            `# Create a partition placement group and launch Kafka brokers into it
aws ec2 create-placement-group --group-name kafka-pg --strategy partition --partition-count 3
aws ec2 run-instances --image-id ami-0abc --instance-type r6i.xlarge --count 6 \\
  --placement 'GroupName=kafka-pg' --subnet-id subnet-a --security-group-ids sg-kafka

# Cluster placement group for an HPC job (launch everything in one call)
aws ec2 create-placement-group --group-name hpc-pg --strategy cluster
aws ec2 run-instances --image-id ami-0hpc --instance-type c6in.32xlarge --count 8 \\
  --placement 'GroupName=hpc-pg' --subnet-id subnet-a

# Secondary ENI with a fixed private IP that can fail over between instances
aws ec2 create-network-interface --subnet-id subnet-a --groups sg-app \\
  --private-ip-address 10.0.1.50 --description "floating app IP"
aws ec2 attach-network-interface --network-interface-id eni-0abc \\
  --instance-id i-primary --device-index 1
# On failure: detach and attach to the standby
aws ec2 detach-network-interface --attachment-id eni-attach-0123 --force
aws ec2 attach-network-interface --network-interface-id eni-0abc \\
  --instance-id i-standby --device-index 1

# Elastic IP: allocate and remap without changing DNS
aws ec2 allocate-address --domain vpc
aws ec2 associate-address --allocation-id eipalloc-0123 --instance-id i-standby

# Check whether ENA enhanced networking is enabled
aws ec2 describe-instances --instance-ids i-0123 --query 'Reservations[].Instances[].EnaSupport'`,
          ],
          questions: [
            {
              question: "Compare cluster, spread and partition placement groups and give a use case for each.",
              solution: "<p><strong>Cluster</strong> packs instances onto the same network segment in one AZ for the lowest latency and highest throughput; use it for HPC, MPI or multi-node ML training. <strong>Spread</strong> places each instance on distinct hardware (max seven per AZ) so a single rack failure takes out at most one; use it for quorum members like etcd or ZooKeeper. <strong>Partition</strong> splits the group into up to seven rack-isolated partitions with many instances each and exposes the partition ID via metadata; use it for HDFS, Kafka or Cassandra so replicas are rack-aware.</p>",
            },
            {
              question: "What is an Elastic Network Interface and when would you attach a second one?",
              solution: "<p>An <strong>ENI</strong> is a virtual network card with private IPs, security groups and a MAC address that exists independently of the instance. Attaching a second ENI lets you <strong>move a fixed private IP</strong> to a standby instance for failover without DNS changes, give an instance a foot in two subnets (management and data plane), run software that binds to a specific MAC for licensing, or apply different security groups to different traffic. ENIs are AZ-bound and can only move between instances in the same AZ.</p>",
            },
            {
              question: "What is the difference between a public IP and an Elastic IP?",
              solution: "<p>A <strong>public IPv4</strong> is auto-assigned from the Amazon pool at launch and is <strong>released when the instance stops</strong>, so you get a different one on restart. An <strong>Elastic IP</strong> is a static address allocated to your account that persists across stops and can be remapped to another instance or ENI in seconds, which is useful for failover and for whitelisting by third parties. Both are now billed per hour, and an EIP that is allocated but not associated still incurs the charge, so release unused ones or move to IPv6 and load balancers.</p>",
            },
            {
              question: "You launch 20 instances into a cluster placement group and receive an insufficient capacity error. Why, and what do you do?",
              solution: "<p>A cluster placement group needs all instances on the same tightly connected hardware segment, so AWS may not have contiguous free capacity even when the AZ has capacity overall. Mitigate by launching <strong>all instances in a single request</strong> so the placement can be planned together, using a <strong>single instance type</strong>, retrying in another AZ, or stopping and restarting the existing members to let AWS migrate them. For guaranteed launches at a known time, create an <strong>On-Demand Capacity Reservation</strong> tied to the placement group.</p>",
            },
            {
              question: "What is enhanced networking and how does EFA differ from ENA?",
              solution: "<p><strong>Enhanced networking</strong> uses SR-IOV to give the instance direct access to a slice of the physical NIC through the <strong>Elastic Network Adapter (ENA)</strong> driver, yielding higher packets per second, lower latency and less jitter than emulated NICs; it is standard on Nitro instances. <strong>Elastic Fabric Adapter (EFA)</strong> adds an <strong>OS-bypass</strong> path (libfabric) on top of ENA so MPI and NCCL traffic skips the kernel network stack, dramatically lowering latency for tightly coupled HPC and distributed training. EFA is only available on select instance types and only within one subnet.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-groups.html",
            "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-eni.html",
            "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/enhanced-networking.html",
          ],
        },
      ],
    },
  ],
};
