/** AWS VPC — networking: subnets, route tables, gateways, security, connectivity */
export const awsVpc = {
  id: 103,
  category: "AWS VPC",
  themeBgColor: "#E0E7FF",
  textColor: "#3730A3",
  topicColor: "#4F46E5",
  lightColor: "#EEF2FF",
  type: [
    {
      id: 1,
      label: "Beginner",
      concepts: [
        {
          topic: "VPC Basics & CIDR Planning",
          tags: ["aws", "vpc", "cidr", "networking"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>Amazon VPC (Virtual Private Cloud)</strong> is your own logically isolated network inside an AWS region. You choose the IP address range, carve it into subnets, decide how traffic is routed, and attach gateways to reach the internet or other networks. Almost every compute and database service (EC2, ECS, RDS, Lambda in VPC mode) lives inside a VPC, so networking questions appear in nearly every AWS interview.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The CIDR block</h4>
<p style="line-height: 1.75;">A VPC is defined by an IPv4 CIDR block between <code>/16</code> (65,536 addresses) and <code>/28</code> (16 addresses). Use private ranges from RFC 1918: <code>10.0.0.0/8</code>, <code>172.16.0.0/12</code>, <code>192.168.0.0/16</code>. You can add secondary CIDR blocks later, but you cannot shrink or change the primary one, so plan generously and avoid overlap with other VPCs or on-premises networks you may ever need to peer with.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What comes with a new VPC</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>A <strong>main route table</strong> with only the <code>local</code> route for the VPC CIDR.</li>
  <li>A <strong>default security group</strong> that allows all traffic between members of the group.</li>
  <li>A <strong>default network ACL</strong> that allows everything in and out.</li>
  <li>DNS resolution through the <strong>Route 53 Resolver</strong> at the VPC base address plus two (for example <code>10.0.0.2</code>).</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Default VPC vs custom VPC</h4>
<p style="line-height: 1.75;">Every region has a <strong>default VPC</strong> (<code>172.31.0.0/16</code>) with public subnets in each AZ so you can launch an instance immediately. Production workloads should use a <strong>custom VPC</strong> with deliberate public and private subnets, because the default VPC gives every instance a public IP and an internet route.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Planning checklist</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>One VPC per environment (dev, staging, prod) or per account, not per application.</li>
  <li>Reserve address space for at least three AZs and for future subnets.</li>
  <li>Enable both <strong>DNS resolution</strong> and <strong>DNS hostnames</strong> if you will use private hosted zones or interface endpoints.</li>
  <li>Consider IPv6 (dual-stack) early; AWS assigns a <code>/56</code> and it is free.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "A VPC is an isolated virtual network in one region defined by a CIDR block. I pick a non-overlapping private range large enough for several AZs and future growth, because the primary CIDR cannot be changed later. A new VPC comes with a main route table, a default security group and a default NACL, and I always build a custom VPC for production instead of using the default one."</div>
</div>`,
          examples: [
            `# Create a VPC with DNS support and tag it
aws ec2 create-vpc --cidr-block 10.0.0.0/16 \\
  --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=prod-vpc}]'
aws ec2 modify-vpc-attribute --vpc-id vpc-0abc --enable-dns-hostnames
aws ec2 modify-vpc-attribute --vpc-id vpc-0abc --enable-dns-support

# Add a secondary CIDR when you run out of addresses
aws ec2 associate-vpc-cidr-block --vpc-id vpc-0abc --cidr-block 10.1.0.0/16

# Inspect what AWS created for you
aws ec2 describe-route-tables --filters Name=vpc-id,Values=vpc-0abc \\
  --query 'RouteTables[].{Main:Associations[0].Main,Routes:Routes[].DestinationCidrBlock}'`,
          ],
          questions: [
            {
              question: "What is a VPC and why do you need one?",
              solution: "<p>A VPC is a <strong>logically isolated virtual network</strong> in an AWS region where you launch resources with private IP addresses you control. You need it to decide which resources are reachable from the internet, to segment tiers (web, app, data) with routing and firewalls, to connect privately to on-premises networks or other VPCs, and to keep traffic to AWS services off the public internet using endpoints.</p>",
            },
            {
              question: "How do you choose a CIDR block for a new VPC?",
              solution: "<p>Pick a <strong>private RFC 1918 range</strong> that does not overlap with any other VPC or corporate network you may peer or VPN with, because overlapping ranges cannot be connected. Size it for growth: a <code>/16</code> gives 65,536 addresses, enough for many <code>/24</code> or <code>/20</code> subnets across three AZs. The primary CIDR cannot be changed after creation; you can only add secondary CIDR blocks, so over-provisioning is cheaper than re-architecting.</p>",
            },
            {
              question: "What is the difference between the default VPC and a custom VPC?",
              solution: "<p>The <strong>default VPC</strong> exists in every region with a <code>172.31.0.0/16</code> range, one public subnet per AZ, an internet gateway and auto-assigned public IPs, so instances are reachable from the internet immediately. A <strong>custom VPC</strong> starts with nothing but a local route, and you deliberately add public and private subnets, gateways and endpoints. Production should always use a custom VPC for least-exposure and predictable addressing.</p>",
            },
            {
              question: "Why does AWS reserve five IP addresses in every subnet?",
              solution: "<p>In each subnet the first four and the last address are reserved: the <strong>network address</strong>, the <strong>VPC router</strong> (+1), the <strong>DNS resolver</strong> (+2), a <strong>future-use</strong> address (+3), and the <strong>broadcast</strong> address (last). So a <code>/24</code> subnet has 251 usable addresses, not 256, and a <code>/28</code> has only 11. This matters when sizing subnets for services like Lambda or EKS that consume many IPs.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html",
            "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-cidr-blocks.html",
          ],
        },
        {
          topic: "Subnets & Availability Zones",
          tags: ["aws", "vpc", "subnets", "availability zones"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  A <strong>subnet</strong> is a slice of the VPC CIDR that lives in exactly <strong>one Availability Zone</strong>. Subnets are how you place resources in specific AZs for high availability and how you separate tiers that need different routing rules. The words "public" and "private" describe routing, not the subnet itself.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Public vs private subnets</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Public subnet:</strong> Its route table sends <code>0.0.0.0/0</code> to an <strong>Internet Gateway</strong>, and instances have public or Elastic IPs. Home of load balancers, NAT Gateways and bastion hosts.</li>
  <li><strong>Private subnet:</strong> No direct internet route. Outbound traffic goes through a <strong>NAT Gateway</strong>, or there is no internet route at all. Home of application servers, containers and databases.</li>
  <li><strong>Isolated (data) subnet:</strong> A private subnet with no NAT route either; only reachable from inside the VPC or via endpoints. Ideal for RDS and ElastiCache.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">A typical three-tier layout</h4>
<pre><code class="language-text">VPC 10.0.0.0/16
  Public   10.0.0.0/24   (AZ-a)  10.0.1.0/24   (AZ-b)  10.0.2.0/24   (AZ-c)  -> ALB, NAT GW
  Private  10.0.16.0/20  (AZ-a)  10.0.32.0/20  (AZ-b)  10.0.48.0/20  (AZ-c)  -> ECS, EC2, Lambda
  Data     10.0.100.0/24 (AZ-a)  10.0.101.0/24 (AZ-b)  10.0.102.0/24 (AZ-c)  -> RDS, ElastiCache</code></pre>
<p style="line-height: 1.75;">Private subnets are the largest because application tiers (especially EKS pods and Lambda ENIs) consume the most addresses.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Availability Zones</h4>
<p style="line-height: 1.75;">An AZ is one or more physically separate data centres with independent power and networking. Spreading subnets across at least <strong>two, preferably three</strong> AZs lets load balancers, Auto Scaling Groups and Multi-AZ databases survive the loss of an entire zone. AZ names like <code>us-east-1a</code> are mapped differently per account; use AZ IDs (<code>use1-az1</code>) when coordinating across accounts.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Subnet settings</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Auto-assign public IPv4:</strong> Turn on only for public subnets.</li>
  <li><strong>Route table association:</strong> Each subnet has exactly one; unassociated subnets use the main table.</li>
  <li><strong>NACL association:</strong> Each subnet has exactly one NACL.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "A subnet is part of the VPC range bound to one AZ. I create public subnets for load balancers and NAT Gateways, private subnets for application tiers and isolated subnets for databases, repeated across three AZs so the architecture survives an AZ failure. Whether a subnet is public or private is decided entirely by its route table."</div>
</div>`,
          examples: [
            `# Public and private subnets in two AZs
for az in a b; do
  aws ec2 create-subnet --vpc-id vpc-0abc --availability-zone us-east-1$az \\
    --cidr-block 10.0.$([ $az = a ] && echo 0 || echo 1).0/24 \\
    --tag-specifications "ResourceType=subnet,Tags=[{Key=Name,Value=public-$az}]"
done

aws ec2 create-subnet --vpc-id vpc-0abc --availability-zone us-east-1a --cidr-block 10.0.16.0/20 \\
  --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=private-a}]'

# Only public subnets hand out public IPs automatically
aws ec2 modify-subnet-attribute --subnet-id subnet-public-a --map-public-ip-on-launch

# Discover AZ IDs for cross-account coordination
aws ec2 describe-availability-zones --query 'AvailabilityZones[].[ZoneName,ZoneId]' --output table`,
          ],
          questions: [
            {
              question: "What makes a subnet public versus private?",
              solution: "<p>Nothing about the subnet itself. A subnet is <strong>public</strong> when its associated <strong>route table</strong> has a <code>0.0.0.0/0</code> route to an <strong>Internet Gateway</strong> and its instances have public or Elastic IPs. It is <strong>private</strong> when the default route goes to a <strong>NAT Gateway</strong> (outbound only) or there is no internet route at all. The same CIDR could be either depending purely on routing.</p>",
            },
            {
              question: "Why should subnets span multiple Availability Zones?",
              solution: "<p>A subnet lives in one AZ, and an AZ can fail as a unit (power, cooling, network). Creating matching subnets in at least two or three AZs lets an <strong>Application Load Balancer</strong> route around a failed zone, an <strong>Auto Scaling Group</strong> replace capacity elsewhere, and <strong>RDS Multi-AZ</strong> fail over to its standby. Single-AZ designs have no protection against zonal outages, which are the most common large-scale AWS incidents.</p>",
            },
            {
              question: "How would you size subnets for a Kubernetes (EKS) cluster?",
              solution: "<p>With the default VPC CNI every pod receives a real VPC IP, so a busy node can consume dozens of addresses. Give private node subnets large ranges such as <code>/20</code> (4,091 usable) per AZ, keep public subnets small (<code>/24</code>) for load balancers, and consider a <strong>secondary CIDR</strong> (for example <code>100.64.0.0/16</code>) dedicated to pods using custom networking. Undersized subnets cause pods to stay Pending with no IPs available.</p>",
            },
            {
              question: "What is the difference between an AZ name and an AZ ID?",
              solution: "<p>AZ <strong>names</strong> such as <code>us-east-1a</code> are randomly mapped per AWS account, so your <code>1a</code> may be a different physical zone from another account's <code>1a</code>. AZ <strong>IDs</strong> such as <code>use1-az1</code> identify the physical zone consistently across accounts. Use AZ IDs when sharing subnets via Resource Access Manager, placing PrivateLink endpoints, or ensuring two accounts really are in the same zone for latency or cost reasons.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html",
            "https://docs.aws.amazon.com/ram/latest/userguide/working-with-az-ids.html",
          ],
        },
        {
          topic: "Route Tables & Gateways",
          tags: ["aws", "vpc", "route tables", "internet gateway", "nat gateway"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>Route tables</strong> decide where traffic leaving a subnet goes. <strong>Gateways</strong> are the doors that traffic goes through: to the internet, to other networks, or to AWS services. Together they define the shape of your network far more than subnets do.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Route tables</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Each route is a <strong>destination CIDR</strong> plus a <strong>target</strong> (local, igw-, nat-, pcx-, tgw-, vgw-, vpce-, eni-).</li>
  <li>The <code>local</code> route for the VPC CIDR is always present and cannot be removed.</li>
  <li>AWS uses <strong>longest prefix match</strong>: a <code>10.1.0.0/16</code> route beats <code>0.0.0.0/0</code>.</li>
  <li>Every subnet is associated with exactly one route table; the <strong>main</strong> table is used by subnets without an explicit association.</li>
  <li>Best practice: one route table per tier (public, private per AZ, data) and never customise the main table.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Internet Gateway (IGW)</h4>
<p style="line-height: 1.75;">A horizontally scaled, highly available component attached to the VPC (one per VPC) that performs one-to-one NAT between an instance's private IP and its public or Elastic IP. It has no bandwidth limit and no cost. An instance needs three things to reach the internet: a public IP, a route to the IGW, and permissive security group and NACL rules.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">NAT Gateway</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Managed service in a <strong>public subnet</strong> with an Elastic IP; private subnets route <code>0.0.0.0/0</code> to it for outbound-only access (patches, third-party APIs).</li>
  <li>Scales to 100 Gbps but is <strong>zonal</strong>: deploy one per AZ and point each AZ's private route table at its own NAT Gateway, otherwise an AZ failure breaks outbound traffic everywhere and you pay cross-AZ data charges.</li>
  <li>Costs an hourly fee plus per-GB processing. Traffic to S3 and DynamoDB should bypass it via gateway endpoints.</li>
  <li>Replaces self-managed NAT instances, which are cheaper but a single point of failure you must patch.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Egress-only Internet Gateway</h4>
<p style="line-height: 1.75;">The IPv6 equivalent of a NAT Gateway: because IPv6 addresses are globally routable, this gateway allows outbound connections while blocking unsolicited inbound ones.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Route tables map destination CIDRs to targets using longest-prefix match, and each subnet uses exactly one. Public subnets route the default destination to an Internet Gateway; private subnets route it to a NAT Gateway that lives in a public subnet and gives outbound-only access. I deploy one NAT Gateway per AZ for resilience and add gateway endpoints so S3 and DynamoDB traffic never pays the NAT data charge."</div>
</div>`,
          examples: [
            `# Internet gateway and a public route table
aws ec2 create-internet-gateway --tag-specifications 'ResourceType=internet-gateway,Tags=[{Key=Name,Value=prod-igw}]'
aws ec2 attach-internet-gateway --vpc-id vpc-0abc --internet-gateway-id igw-0def

aws ec2 create-route-table --vpc-id vpc-0abc --tag-specifications 'ResourceType=route-table,Tags=[{Key=Name,Value=public}]'
aws ec2 create-route --route-table-id rtb-public --destination-cidr-block 0.0.0.0/0 --gateway-id igw-0def
aws ec2 associate-route-table --route-table-id rtb-public --subnet-id subnet-public-a
aws ec2 associate-route-table --route-table-id rtb-public --subnet-id subnet-public-b

# One NAT gateway per AZ, each with its own private route table
aws ec2 allocate-address --domain vpc
aws ec2 create-nat-gateway --subnet-id subnet-public-a --allocation-id eipalloc-0123 \\
  --tag-specifications 'ResourceType=natgateway,Tags=[{Key=Name,Value=nat-a}]'
aws ec2 create-route-table --vpc-id vpc-0abc --tag-specifications 'ResourceType=route-table,Tags=[{Key=Name,Value=private-a}]'
aws ec2 create-route --route-table-id rtb-private-a --destination-cidr-block 0.0.0.0/0 --nat-gateway-id nat-0456
aws ec2 associate-route-table --route-table-id rtb-private-a --subnet-id subnet-private-a`,
          ],
          questions: [
            {
              question: "What is the difference between an Internet Gateway and a NAT Gateway?",
              solution: "<p>An <strong>Internet Gateway</strong> is attached to the VPC and allows two-way communication between resources that have public IPs and the internet, performing one-to-one NAT. A <strong>NAT Gateway</strong> sits in a public subnet and lets resources in private subnets, which have no public IPs, initiate <strong>outbound</strong> connections while blocking inbound connections initiated from the internet. The NAT Gateway itself relies on the IGW to reach the internet.</p>",
            },
            {
              question: "Why should you deploy a NAT Gateway in every Availability Zone?",
              solution: "<p>A NAT Gateway is a <strong>zonal</strong> resource. If all private subnets route through a single NAT Gateway in AZ-a and that AZ fails, every private subnet in every AZ loses outbound internet access. Cross-AZ traffic to the NAT Gateway also incurs <strong>inter-AZ data transfer charges</strong>. Deploying one NAT Gateway per AZ with a per-AZ private route table keeps failures isolated and traffic local.</p>",
            },
            {
              question: "How does a route table choose between overlapping routes?",
              solution: "<p>AWS uses <strong>longest prefix match</strong>: the most specific route wins. Given <code>0.0.0.0/0 -> nat-gw</code>, <code>10.0.0.0/16 -> local</code> and <code>10.1.0.0/16 -> pcx-peer</code>, traffic to <code>10.1.5.4</code> uses the peering connection, traffic to <code>10.0.3.9</code> stays local, and everything else goes to the NAT Gateway. Propagated routes from a Virtual Private Gateway are preferred less than static routes of the same prefix length.</p>",
            },
            {
              question: "An instance has a route to the IGW but still cannot reach the internet. What do you check?",
              solution: "<p>Confirm the instance actually has a <strong>public or Elastic IP</strong>; a route alone is not enough. Then verify the <strong>security group</strong> allows the outbound traffic (default allows all) and the <strong>NACL</strong> allows outbound to the destination port and inbound on ephemeral ports 1024-65535 for return traffic. Check the OS firewall and that DNS resolution works. VPC Reachability Analyzer or Flow Logs will show which hop drops the packets.</p>",
            },
            {
              question: "How do you reduce NAT Gateway costs?",
              solution: "<p>Add <strong>gateway VPC endpoints</strong> for S3 and DynamoDB so that traffic (often the bulk of it, for example ECR image layers stored in S3) bypasses NAT entirely and is free. Add <strong>interface endpoints</strong> for other heavy AWS APIs such as ECR, CloudWatch Logs and Secrets Manager when their hourly cost is lower than the NAT data charge. Keep a NAT Gateway per AZ to avoid cross-AZ charges, and audit Flow Logs to find the top talkers.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Route_Tables.html",
            "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html",
            "https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html",
          ],
        },
        {
          topic: "Security Groups vs Network ACLs",
          tags: ["aws", "vpc", "security groups", "nacl", "firewall"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  A VPC gives you two layers of traffic filtering. <strong>Security Groups</strong> protect individual resources; <strong>Network ACLs</strong> protect whole subnets. Interviewers almost always ask you to compare them, and the key words are <em>stateful</em> versus <em>stateless</em>.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Security Groups</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Attached to <strong>elastic network interfaces</strong> (EC2, RDS, ALB, Lambda in VPC, ECS tasks).</li>
  <li><strong>Stateful:</strong> if an inbound request is allowed, its response is automatically allowed out, and vice versa.</li>
  <li><strong>Allow rules only</strong>; anything not allowed is implicitly denied. All rules are evaluated together.</li>
  <li>Sources can be CIDRs, prefix lists, or <strong>other security groups</strong>, which enables tier chaining without knowing IP addresses.</li>
  <li>Default outbound rule allows all traffic; default inbound denies all.</li>
  <li>Limits: 5 security groups per ENI, 60 inbound and 60 outbound rules per group (adjustable).</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Network ACLs</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Attached to <strong>subnets</strong>; every resource in the subnet is affected.</li>
  <li><strong>Stateless:</strong> return traffic must be explicitly allowed, which means opening <strong>ephemeral ports 1024-65535</strong> in the opposite direction.</li>
  <li>Support both <strong>allow and deny</strong> rules, evaluated in <strong>rule number order</strong>; the first match wins and the final <code>*</code> rule denies.</li>
  <li>The default NACL allows all traffic; a custom NACL denies all until you add rules.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Security group chaining</h4>
<pre><code class="language-text">Internet -> sg-alb   (inbound 443 from 0.0.0.0/0)
sg-alb   -> sg-app   (inbound 8080 from sg-alb only)
sg-app   -> sg-db    (inbound 5432 from sg-app only)</code></pre>
<p style="line-height: 1.75;">Because rules reference groups rather than IPs, autoscaled tasks with changing addresses are covered automatically. This is the standard way to build a trust model between tiers.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">When to use which</h4>
<p style="line-height: 1.75;">Security groups are the day-to-day tool for least-privilege access. NACLs are a coarse backstop: block a malicious IP range, enforce that the data subnet never talks to the internet, or satisfy a compliance requirement for subnet-level rules. Keep NACLs simple; debugging stateless rules is painful.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Security groups are stateful, instance-level firewalls with allow rules only, and they can reference other security groups, so I chain them: only the ALB group can reach the app group, only the app group can reach the database group. NACLs are stateless, subnet-level, ordered allow-and-deny lists that need ephemeral ports opened for return traffic. I do fine-grained control with security groups and use NACLs sparingly as a subnet-wide backstop."</div>
</div>`,
          examples: [
            `# Chain security groups so only the ALB reaches the app, only the app reaches the DB
aws ec2 create-security-group --group-name sg-alb --description "ALB" --vpc-id vpc-0abc
aws ec2 create-security-group --group-name sg-app --description "App tier" --vpc-id vpc-0abc
aws ec2 create-security-group --group-name sg-db  --description "Database" --vpc-id vpc-0abc

aws ec2 authorize-security-group-ingress --group-id sg-alb --protocol tcp --port 443 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-id sg-app --protocol tcp --port 8080 --source-group sg-alb
aws ec2 authorize-security-group-ingress --group-id sg-db  --protocol tcp --port 5432 --source-group sg-app`,
            `# NACL: block a hostile range, remember ephemeral ports for return traffic
aws ec2 create-network-acl-entry --network-acl-id acl-0abc --rule-number 50 \\
  --protocol -1 --rule-action deny --ingress --cidr-block 203.0.113.0/24
aws ec2 create-network-acl-entry --network-acl-id acl-0abc --rule-number 100 \\
  --protocol tcp --port-range From=443,To=443 --rule-action allow --ingress --cidr-block 0.0.0.0/0
aws ec2 create-network-acl-entry --network-acl-id acl-0abc --rule-number 100 \\
  --protocol tcp --port-range From=1024,To=65535 --rule-action allow --egress --cidr-block 0.0.0.0/0`,
          ],
          questions: [
            {
              question: "Compare Security Groups and Network ACLs.",
              solution: "<p><strong>Security Groups</strong> operate at the ENI level, are <strong>stateful</strong>, support only <strong>allow</strong> rules evaluated as a whole, and can reference other security groups. <strong>NACLs</strong> operate at the subnet level, are <strong>stateless</strong> (return traffic needs explicit rules on ephemeral ports), support <strong>allow and deny</strong> rules evaluated in number order with first match winning, and apply to every resource in the subnet. Security groups are the primary tool; NACLs are a coarse extra layer.</p>",
            },
            {
              question: "What does stateful mean for a security group, and why does it matter?",
              solution: "<p>Stateful means the security group <strong>tracks connections</strong>: when an inbound request on port 443 is allowed, the outbound response is allowed automatically even if no outbound rule matches, and outbound requests get their responses back regardless of inbound rules. It matters because you only write rules for the direction that initiates the connection, whereas with a stateless NACL you must also open the <strong>ephemeral port range</strong> for the response, which is a common source of mysterious timeouts.</p>",
            },
            {
              question: "How do you allow only your load balancer to reach your application servers?",
              solution: "<p>Create a security group for the ALB that allows inbound 443 from the internet, and a security group for the app tier whose inbound rule allows the app port <strong>with the ALB security group as the source</strong> instead of a CIDR. Because the rule references the group, any ALB node or IP change is covered automatically, and nothing else in the VPC, even in the same subnet, can reach the app port. Repeat the pattern between the app tier and the database.</p>",
            },
            {
              question: "You need to block a single abusive IP address from your whole application. Which tool do you use?",
              solution: "<p>Security groups cannot express deny rules, so use a <strong>Network ACL</strong> deny rule with a low rule number (evaluated first) on the public subnets hosting the load balancer, or better, an <strong>AWS WAF</strong> IP set rule on the ALB or CloudFront, which also gives logging and rate limiting. NACLs are the quick network-level answer; WAF is the application-level answer that scales to managed rule groups.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html",
            "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html",
          ],
        },
      ],
    },
    {
      id: 2,
      label: "Advance",
      concepts: [
        {
          topic: "VPC Endpoints & PrivateLink",
          tags: ["aws", "vpc", "endpoints", "privatelink", "security"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  By default, calls from a VPC to AWS services such as S3 or Secrets Manager travel to public endpoints, which means private subnets need a NAT Gateway and the traffic technically leaves your network. <strong>VPC endpoints</strong> keep that traffic on the AWS backbone, remove the NAT dependency, and let you write policies that pin a bucket or queue to your VPC.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Gateway endpoints</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Available only for <strong>S3 and DynamoDB</strong>.</li>
  <li>Implemented as a <strong>route table entry</strong> using a managed prefix list as destination and the endpoint as target.</li>
  <li><strong>Free</strong>, no bandwidth limits, cannot be reached from outside the VPC (no peering or VPN access).</li>
  <li>Support an <strong>endpoint policy</strong> limiting which buckets or tables may be accessed.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Interface endpoints (PrivateLink)</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>An <strong>ENI with a private IP</strong> in your subnet per AZ, protected by a security group.</li>
  <li>Available for most AWS services (ECR, CloudWatch Logs, Secrets Manager, SSM, STS, Kinesis, SQS, SNS, and S3 as well) plus <strong>third-party SaaS</strong> and your own services.</li>
  <li><strong>Private DNS</strong> overrides the public service hostname so SDKs need no changes.</li>
  <li>Priced per hour per AZ plus per-GB, so weigh them against NAT Gateway data charges.</li>
  <li>Reachable from peered VPCs, VPN and Direct Connect, unlike gateway endpoints.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Exposing your own service with PrivateLink</h4>
<p style="line-height: 1.75;">Put your service behind a <strong>Network Load Balancer</strong> and create an <strong>endpoint service</strong>. Consumers in other VPCs or accounts create an interface endpoint to it; traffic flows privately with no peering, no overlapping-CIDR problems, and one-directional connectivity (consumer to provider only). This is how SaaS vendors and platform teams expose APIs across hundreds of accounts.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Locking resources to the VPC</h4>
<pre><code class="language-json">{
  "Effect": "Deny",
  "Principal": "*",
  "Action": "s3:*",
  "Resource": ["arn:aws:s3:::finance-data", "arn:aws:s3:::finance-data/*"],
  "Condition": { "StringNotEquals": { "aws:sourceVpce": "vpce-0123456789abcdef0" } }
}</code></pre>
<p style="line-height: 1.75;">A bucket policy like this means the data is unreachable even with valid credentials unless the caller is inside the VPC, a powerful data-exfiltration control.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Gateway endpoints for S3 and DynamoDB are free route-table entries that keep traffic off the NAT Gateway. Interface endpoints, built on PrivateLink, put an ENI in my subnet for almost any other AWS service or a partner service, with private DNS so code does not change. I combine them with resource policies conditioned on the endpoint ID so sensitive buckets can only be reached from inside the VPC."</div>
</div>`,
          examples: [
            `# Free gateway endpoint for S3 attached to the private route tables
aws ec2 create-vpc-endpoint --vpc-id vpc-0abc --vpc-endpoint-type Gateway \\
  --service-name com.amazonaws.us-east-1.s3 \\
  --route-table-ids rtb-private-a rtb-private-b

# Interface endpoints so ECS tasks in private subnets can pull from ECR and write logs without NAT
for svc in ecr.api ecr.dkr logs secretsmanager; do
  aws ec2 create-vpc-endpoint --vpc-id vpc-0abc --vpc-endpoint-type Interface \\
    --service-name com.amazonaws.us-east-1.$svc \\
    --subnet-ids subnet-private-a subnet-private-b \\
    --security-group-ids sg-endpoints --private-dns-enabled
done

# Expose an internal API to other accounts via PrivateLink
aws ec2 create-vpc-endpoint-service-configuration \\
  --network-load-balancer-arns <nlb-arn> --acceptance-required \\
  --tag-specifications 'ResourceType=vpc-endpoint-service,Tags=[{Key=Name,Value=orders-api}]'`,
          ],
          questions: [
            {
              question: "Why would you use a VPC endpoint instead of a NAT Gateway to reach S3?",
              solution: "<p>A <strong>gateway endpoint</strong> for S3 adds a route so the traffic stays on the AWS network and never traverses the internet or the NAT Gateway. That is more secure, because you can restrict the bucket policy to <code>aws:sourceVpce</code>, and much cheaper, because NAT Gateways charge per GB processed while gateway endpoints are free. Interface endpoints do the same for most other services via an ENI with a private IP.</p>",
            },
            {
              question: "Compare gateway endpoints and interface endpoints.",
              solution: "<p><strong>Gateway endpoints</strong> exist only for S3 and DynamoDB, are implemented as route-table entries, are free, and can only be used from inside the VPC. <strong>Interface endpoints</strong> (PrivateLink) create ENIs with private IPs in your subnets, work for most AWS services and third-party services, support security groups and private DNS, are reachable over peering, VPN and Direct Connect, and are billed hourly per AZ plus per GB. For S3 both exist; use the gateway endpoint inside the VPC and an interface endpoint when on-premises clients must reach S3 privately.</p>",
            },
            {
              question: "How does PrivateLink differ from VPC peering for connecting to a service in another account?",
              solution: "<p><strong>VPC peering</strong> joins two networks bidirectionally, requires non-overlapping CIDRs, exposes every resource the route tables and security groups allow, and does not scale beyond a few dozen connections. <strong>PrivateLink</strong> exposes a single service behind an NLB as an endpoint service; consumers get a private IP in their own VPC, connectivity is one-directional, CIDRs may overlap, and it scales to thousands of consumer accounts. Use PrivateLink for service-to-service exposure and peering for full network integration.</p>",
            },
            {
              question: "How can you guarantee that a sensitive S3 bucket is only accessible from inside your VPC?",
              solution: "<p>Create a gateway endpoint for S3 and attach a <strong>bucket policy</strong> with an explicit <code>Deny</code> for all principals when <code>aws:sourceVpce</code> does not equal your endpoint ID (or <code>aws:sourceVpc</code> does not equal your VPC). Because explicit deny always wins, even a leaked access key cannot read the bucket from outside. Optionally add an <strong>endpoint policy</strong> that limits which buckets can be reached through the endpoint, preventing exfiltration to an attacker-controlled bucket.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/vpc/latest/privatelink/concepts.html",
            "https://docs.aws.amazon.com/vpc/latest/privatelink/gateway-endpoints.html",
            "https://docs.aws.amazon.com/vpc/latest/privatelink/privatelink-share-your-services.html",
          ],
        },
        {
          topic: "Peering, Transit Gateway & Hybrid",
          tags: ["aws", "vpc", "peering", "transit gateway", "vpn", "direct connect"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Real organisations have many VPCs, several accounts and often an on-premises network. Connecting them is a question of choosing the right hub: <strong>VPC peering</strong> for a few point-to-point links, <strong>Transit Gateway</strong> for many, and <strong>VPN or Direct Connect</strong> to reach the data centre.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">VPC Peering</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>One-to-one private connection between two VPCs, same or different accounts and regions.</li>
  <li>Requires <strong>non-overlapping CIDRs</strong> and routes added on both sides.</li>
  <li><strong>Not transitive</strong>: A-B and B-C do not give A-C. Full mesh of n VPCs needs n(n-1)/2 peerings.</li>
  <li>No hourly charge; inter-AZ and inter-region data charges apply. Security groups can reference peered groups within a region.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Transit Gateway (TGW)</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Regional <strong>hub-and-spoke router</strong>. VPCs, VPNs and Direct Connect gateways become <strong>attachments</strong>.</li>
  <li><strong>TGW route tables</strong> control which attachments can talk to which, enabling segmentation (prod cannot reach dev, shared services reach everything).</li>
  <li>Supports thousands of attachments, <strong>inter-region peering</strong> between TGWs, multicast, and centralised egress (one set of NAT Gateways for every VPC).</li>
  <li>Costs an hourly fee per attachment plus per-GB processing, so it is dearer than peering for two VPCs but far simpler beyond a handful.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Hybrid connectivity</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Site-to-Site VPN:</strong> Two IPsec tunnels over the internet to a Virtual Private Gateway or TGW; quick to set up, about 1.25 Gbps per tunnel, variable latency.</li>
  <li><strong>Direct Connect:</strong> Dedicated fibre from your data centre or a colocation partner, 1 to 100 Gbps, consistent latency, lower data-transfer cost, but weeks to provision. Pair with a VPN as backup or for encryption (or use MACsec).</li>
  <li><strong>Client VPN:</strong> Managed OpenVPN endpoint for remote users.</li>
  <li><strong>Route 53 Resolver endpoints</strong> forward DNS between on-premises and AWS in both directions.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Reference architecture</h4>
<pre><code class="language-text">On-prem  --Direct Connect + VPN backup-->  Transit Gateway  <--attachments--  prod-vpc, staging-vpc, shared-services-vpc, egress-vpc
                                              |  route tables: prod isolated from staging; all reach shared-services and egress</code></pre>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "For two or three VPCs I use peering, remembering it is not transitive and needs non-overlapping CIDRs. Once I have many VPCs or an on-premises link I move to a Transit Gateway, where route tables give me segmentation and I can centralise egress and inspection. On-premises connects via Site-to-Site VPN for speed of setup or Direct Connect for bandwidth and consistent latency, ideally both for redundancy."</div>
</div>`,
          examples: [
            `# Peering between two VPCs (same account) with routes on both sides
aws ec2 create-vpc-peering-connection --vpc-id vpc-app --peer-vpc-id vpc-shared
aws ec2 accept-vpc-peering-connection --vpc-peering-connection-id pcx-0123
aws ec2 create-route --route-table-id rtb-app-private    --destination-cidr-block 10.20.0.0/16 --vpc-peering-connection-id pcx-0123
aws ec2 create-route --route-table-id rtb-shared-private --destination-cidr-block 10.10.0.0/16 --vpc-peering-connection-id pcx-0123

# Transit Gateway hub with two VPC attachments
aws ec2 create-transit-gateway --description "org hub" --options AmazonSideAsn=64512,DefaultRouteTableAssociation=disable
aws ec2 create-transit-gateway-vpc-attachment --transit-gateway-id tgw-0abc --vpc-id vpc-prod \\
  --subnet-ids subnet-prod-tgw-a subnet-prod-tgw-b
aws ec2 create-transit-gateway-vpc-attachment --transit-gateway-id tgw-0abc --vpc-id vpc-shared \\
  --subnet-ids subnet-shared-tgw-a subnet-shared-tgw-b
# In each VPC, send the rest of the org's range to the TGW
aws ec2 create-route --route-table-id rtb-prod-private --destination-cidr-block 10.0.0.0/8 --transit-gateway-id tgw-0abc`,
          ],
          questions: [
            {
              question: "Why is VPC peering not transitive, and what do you use when you have many VPCs?",
              solution: "<p>Peering installs routes only between the two peers; AWS will not forward traffic from VPC A through VPC B to VPC C, both for isolation and because overlapping or ambiguous routes would be unsafe. A full mesh grows quadratically. For many VPCs, or VPCs plus on-premises, use a <strong>Transit Gateway</strong>: each VPC attaches once, and TGW route tables decide which attachments can communicate, giving hub-and-spoke connectivity plus segmentation.</p>",
            },
            {
              question: "When would you choose Direct Connect over a Site-to-Site VPN?",
              solution: "<p>Choose <strong>Direct Connect</strong> when you need high, predictable bandwidth (1 to 100 Gbps), <strong>consistent low latency</strong>, or lower data-transfer costs for large volumes, for example database replication or daily bulk transfers. Choose <strong>Site-to-Site VPN</strong> when you need connectivity in hours rather than weeks, bandwidth under roughly a gigabit is enough, or as a <strong>backup path</strong> for Direct Connect. Direct Connect is not encrypted by default, so add MACsec or run a VPN over it if encryption is required.</p>",
            },
            {
              question: "How would you give many VPCs internet access through a single, inspected egress point?",
              solution: "<p>Attach every spoke VPC to a <strong>Transit Gateway</strong> and create a dedicated <strong>egress VPC</strong> containing NAT Gateways (and optionally firewalls such as AWS Network Firewall). In the TGW route table for spokes, route <code>0.0.0.0/0</code> to the egress VPC attachment; in the egress VPC, route return traffic for the spoke CIDRs back to the TGW. Spoke VPCs then need no NAT Gateways of their own, and all outbound traffic passes one inspection and logging point.</p>",
            },
            {
              question: "Two teams need to connect their VPCs but both use 10.0.0.0/16. What are your options?",
              solution: "<p>Peering and Transit Gateway both require non-overlapping CIDRs, so direct connection is impossible. Options: add a <strong>secondary non-overlapping CIDR</strong> to one VPC and migrate the resources that must communicate; expose the needed services through <strong>PrivateLink</strong>, which tolerates overlapping ranges because consumers see only an endpoint IP in their own VPC; or use a <strong>Private NAT Gateway</strong> to translate one side's addresses into a routable range. Long term, adopt an IP address management plan (Amazon VPC IPAM) so it does not happen again.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html",
            "https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html",
            "https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html",
          ],
        },
        {
          topic: "Flow Logs & Network Troubleshooting",
          tags: ["aws", "vpc", "flow logs", "troubleshooting", "observability"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  "Service A cannot reach service B" is the most common cloud networking ticket. AWS gives you three tools to answer it systematically: <strong>VPC Flow Logs</strong> to see what was accepted or rejected, <strong>Reachability Analyzer</strong> to compute whether a path exists, and a mental checklist of every layer a packet crosses.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">VPC Flow Logs</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Capture <strong>metadata</strong> (not payload) about IP traffic for a VPC, subnet or single ENI: source and destination address and port, protocol, bytes, packets, and <strong>ACCEPT or REJECT</strong>.</li>
  <li>Deliver to <strong>CloudWatch Logs</strong> (query with Logs Insights), <strong>S3</strong> (query with Athena), or Kinesis Data Firehose.</li>
  <li>Custom formats add fields such as <code>pkt-srcaddr</code>, <code>tcp-flags</code>, <code>flow-direction</code>, <code>traffic-path</code> and AZ ID, which reveal NAT translation and whether traffic left via IGW, NAT, TGW or endpoint.</li>
  <li>Aggregated over 1-minute or 10-minute windows; not real time, and traffic to the DNS resolver, instance metadata and DHCP is excluded.</li>
  <li>A REJECT with a security group in place shows up as a single REJECT; a NACL rejection often appears as an ACCEPT inbound followed by a REJECT outbound (stateless return traffic blocked).</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Reachability Analyzer</h4>
<p style="line-height: 1.75;">Given a source and destination (ENI, instance, IGW, TGW, endpoint) plus protocol and port, it analyses the configuration, no packets sent, and returns either the full hop-by-hop path or the exact component blocking it (a missing route, a security group rule, a NACL entry). It is the fastest way to prove or disprove connectivity before touching anything.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The troubleshooting checklist</h4>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>DNS:</strong> Does the name resolve, and to the expected private or public IP?</li>
  <li><strong>Route table:</strong> Does the source subnet have a route to the destination CIDR (local, peering, TGW, NAT, IGW)?</li>
  <li><strong>Security group:</strong> Outbound on the source allows the port; inbound on the destination allows the port from the source group or CIDR.</li>
  <li><strong>NACL:</strong> Both directions on both subnets, including ephemeral ports.</li>
  <li><strong>Destination itself:</strong> Is the process listening on <code>0.0.0.0</code> rather than <code>127.0.0.1</code>? Host firewall? Health check path correct?</li>
  <li><strong>Flow Logs:</strong> Filter on the destination address and port to see REJECTs and identify the layer.</li>
</ol>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Other tools</h4>
<p style="line-height: 1.75;"><strong>Traffic Mirroring</strong> copies full packets from an ENI to a monitoring appliance for deep inspection. <strong>Network Access Analyzer</strong> finds unintended paths, for example any route from the internet to a database subnet. <strong>AWS Network Firewall</strong> adds stateful inspection and IDS rules at the VPC edge.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "I work down the path: DNS, route table, security group, NACL, then the listener on the host. VPC Flow Logs show me ACCEPT and REJECT records per ENI so I can see which layer dropped the traffic, and Reachability Analyzer evaluates the configuration and names the blocking component without sending a packet. Flow Logs go to CloudWatch Logs or S3 where I query them with Logs Insights or Athena."</div>
</div>`,
          examples: [
            `# Enable flow logs for the whole VPC into CloudWatch Logs with a custom format
aws ec2 create-flow-logs --resource-type VPC --resource-ids vpc-0abc \\
  --traffic-type ALL --log-destination-type cloud-watch-logs \\
  --log-group-name /vpc/flow-logs --deliver-logs-permission-arn arn:aws:iam::123456789012:role/flow-logs \\
  --max-aggregation-interval 60 \\
  --log-format '\${version} \${account-id} \${interface-id} \${srcaddr} \${dstaddr} \${srcport} \${dstport} \${protocol} \${packets} \${bytes} \${action} \${flow-direction} \${traffic-path} \${tcp-flags}'

# Logs Insights: who is being rejected on port 5432?
fields @timestamp, srcaddr, dstaddr, dstport, action
| filter dstport = 5432 and action = "REJECT"
| stats count(*) as rejects by srcaddr, dstaddr
| sort rejects desc

# Prove or disprove a path without sending packets
aws ec2 create-network-insights-path --source i-0app --destination i-0db --protocol tcp --destination-port 5432
aws ec2 start-network-insights-analysis --network-insights-path-id nip-0123
aws ec2 describe-network-insights-analyses --network-insights-analysis-ids nia-0456 \\
  --query 'NetworkInsightsAnalyses[0].{Reachable:NetworkPathFound,Blocker:Explanations[0]}'`,
          ],
          questions: [
            {
              question: "An EC2 instance in a private subnet cannot reach an external API. How do you debug it?",
              solution: "<p>Work through the path: (1) does the subnet's <strong>route table</strong> send <code>0.0.0.0/0</code> to a NAT Gateway that itself sits in a public subnet with an IGW route; (2) does the <strong>security group</strong> allow outbound 443; (3) does the <strong>NACL</strong> allow outbound 443 and inbound ephemeral ports 1024-65535; (4) does DNS resolve; (5) check <strong>VPC Flow Logs</strong> for REJECT records to see which layer drops the traffic. Reachability Analyzer can trace the path to the IGW automatically.</p>",
            },
            {
              question: "What do VPC Flow Logs capture, and what do they not capture?",
              solution: "<p>Flow Logs record <strong>metadata per network flow</strong> on an ENI: addresses, ports, protocol, packet and byte counts, start and end time, and whether the traffic was <strong>ACCEPTED or REJECTED</strong> by security groups and NACLs, optionally with NAT and path details. They do not capture packet <strong>payloads</strong>, are aggregated over at least one minute so they are not real time, and exclude traffic to the Amazon DNS resolver, instance metadata service, DHCP, and the default VPC router. For payloads you need Traffic Mirroring.</p>",
            },
            {
              question: "How can you tell from Flow Logs whether a security group or a NACL blocked traffic?",
              solution: "<p>A <strong>security group</strong> is stateful and evaluates the initiating packet, so a block appears as a single <strong>REJECT</strong> for the inbound (or outbound) flow with no corresponding accepted flow. A <strong>NACL</strong> is stateless; a common signature is an <strong>ACCEPT</strong> record for the inbound request followed by a <strong>REJECT</strong> for the outbound response on an ephemeral port, meaning the return path was not opened. Reachability Analyzer removes the guesswork by naming the exact rule.</p>",
            },
            {
              question: "What is VPC Reachability Analyzer and when is it better than Flow Logs?",
              solution: "<p>Reachability Analyzer is a <strong>configuration analysis</strong> tool: you specify a source, destination, protocol and port, and it computes whether a network path exists across route tables, gateways, security groups, NACLs, peering and Transit Gateways, returning the hop-by-hop path or the blocking component. It is better than Flow Logs when you want an answer <strong>before</strong> deploying or without generating traffic, and when there are many hops. Flow Logs are better for observing real traffic patterns, volumes and intermittent rejections over time.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html",
            "https://docs.aws.amazon.com/vpc/latest/reachability/what-is-reachability-analyzer.html",
          ],
        },
      ],
    },
  ],
};
