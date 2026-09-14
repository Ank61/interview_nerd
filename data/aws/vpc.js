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
          topic: "VPC — Your Own Isolated Virtual Network in a Region",
          tags: ["aws", "vpc", "networking", "region", "isolation", "dns"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  A <strong>VPC (Virtual Private Cloud)</strong> is a logically isolated slice of the AWS network that you define and control. It is the box that everything else in this list lives inside: subnets, route tables, gateways, and the network interfaces attached to your EC2 instances, RDS databases, Lambda functions and containers. Think of it as <em>your own data centre network</em>, except the cabling, routers and firewalls are API calls instead of hardware.
</p>
<p style="line-height: 1.75;">The word that matters most is <strong>isolated</strong>. Two VPCs — yours and another customer's, or two of your own — cannot talk to each other by default even if they use identical IP ranges. Isolation is enforced by the AWS network fabric itself (a mapping/encapsulation layer), not by rules you configure, so it is not something you can accidentally turn off.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Scope: regional, spanning all AZs</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>A VPC belongs to <strong>exactly one region</strong> (e.g. <code>ap-south-1</code>) and is created inside one account.</li>
  <li>It <strong>spans every Availability Zone in that region</strong>. You do not create a VPC "in an AZ" — you create subnets in AZs, and the VPC stretches across them.</li>
  <li>A VPC cannot span regions. Connecting VPCs across regions needs <strong>VPC peering</strong> or <strong>Transit Gateway peering</strong>.</li>
  <li>Default soft limit: <strong>5 VPCs per region per account</strong> (raisable). Most organisations use few, large VPCs plus accounts as the isolation boundary.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What you get the moment a VPC is created</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>A <strong>CIDR block</strong> you chose — the private IPv4 range the whole VPC draws from.</li>
  <li>A <strong>main route table</strong>, containing a single un-deletable <code>local</code> route for the VPC CIDR. That local route is why anything in the VPC can reach anything else in the VPC by private IP from the very first second.</li>
  <li>A <strong>default security group</strong> (allows all outbound, and inbound only from itself).</li>
  <li>A <strong>default network ACL</strong> (allows all inbound and outbound).</li>
  <li>A <strong>DHCP options set</strong> pointing at the Amazon-provided DNS resolver.</li>
  <li><em>Nothing else.</em> No subnets, no internet gateway, no internet connectivity. A brand-new custom VPC is a sealed room.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The two DNS attributes people forget</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><code>enableDnsSupport</code> (default <strong>true</strong>) — turns on the <strong>Route 53 Resolver</strong> at <code>VPC base + 2</code> (e.g. <code>10.0.0.2</code> for <code>10.0.0.0/16</code>) and at the link-local <code>169.254.169.253</code>. If you switch this off, nothing inside resolves DNS names, and <strong>VPC endpoints and private hosted zones stop working</strong>.</li>
  <li><code>enableDnsHostnames</code> (default <strong>true</strong> for the default VPC, <strong>false</strong> for a custom VPC) — instances with a public IP also get a public DNS name. Needed for an RDS instance to get a resolvable endpoint and for interface endpoints to resolve to private IPs.</li>
  <li>Classic bug: someone builds a custom VPC, adds an interface VPC endpoint, and traffic still goes over the internet — because <code>enableDnsHostnames</code> was left false, so private DNS never overrode the public service name.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Objects that live inside a VPC</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Subnets</strong> — AZ-scoped slices of the CIDR.</li>
  <li><strong>Route tables</strong> — where traffic goes, attached to subnets.</li>
  <li><strong>Gateways</strong> — internet gateway, NAT gateway, virtual private gateway, transit gateway attachment.</li>
  <li><strong>ENIs (Elastic Network Interfaces)</strong> — the actual virtual NICs. Every EC2 instance, every RDS node, every interface VPC endpoint, every Lambda in a VPC is ultimately <em>an ENI holding a private IP in a subnet</em>. If you remember one unifying idea, remember that.</li>
  <li><strong>Security groups and NACLs</strong> — the two firewall layers.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Tenancy</h4>
<p style="line-height: 1.75;">A VPC has a <strong>tenancy</strong> attribute: <code>default</code> (instances share physical hosts, normal) or <code>dedicated</code> (every instance lands on hardware dedicated to you, far more expensive and it <em>overrides</em> per-instance settings). Set it to <code>dedicated</code> only for a hard compliance requirement — and know that you cannot change it back to <code>default</code> on the VPC without recreating it in some cases. Interviewers occasionally ask this as a "gotcha" cost question.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "A VPC is a logically isolated virtual network I define inside one AWS region. It spans all AZs in that region, and I carve it into subnets that are each pinned to a single AZ. Creating one gives me a CIDR block, a main route table with a local route, a default security group, a default NACL and a DHCP options set — and nothing else, so a custom VPC has no internet access until I add an internet gateway and a route. Everything that runs in a VPC is really an ENI holding a private IP in a subnet, which is why security groups attach to ENIs, not to instances."</div>
</div>`,
          examples: [
            `# ---------- Create a custom VPC and inspect what you got ----------
aws ec2 create-vpc \\
  --cidr-block 10.0.0.0/16 \\
  --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=prod-vpc}]'
# {"Vpc": {"VpcId": "vpc-0a1b2c3d", "CidrBlock": "10.0.0.0/16",
#          "State": "pending", "InstanceTenancy": "default",
#          "IsDefault": false, "DhcpOptionsId": "dopt-1234"}}

# The main route table that came with it: ONE local route, nothing else.
aws ec2 describe-route-tables \\
  --filters Name=vpc-id,Values=vpc-0a1b2c3d Name=association.main,Values=true \\
  --query 'RouteTables[].Routes'
# [[{"DestinationCidrBlock": "10.0.0.0/16", "GatewayId": "local", "State": "active"}]]

# ---------- The DNS attributes (custom VPC defaults hostnames to FALSE) ----------
aws ec2 describe-vpc-attribute --vpc-id vpc-0a1b2c3d --attribute enableDnsSupport
aws ec2 describe-vpc-attribute --vpc-id vpc-0a1b2c3d --attribute enableDnsHostnames
aws ec2 modify-vpc-attribute --vpc-id vpc-0a1b2c3d --enable-dns-hostnames
# Without this, interface VPC endpoints and RDS endpoints will not resolve privately.

# ---------- Prove the isolation: everything is an ENI ----------
aws ec2 describe-network-interfaces \\
  --filters Name=vpc-id,Values=vpc-0a1b2c3d \\
  --query 'NetworkInterfaces[].{ENI:NetworkInterfaceId,IP:PrivateIpAddress,AZ:AvailabilityZone,Type:InterfaceType,Desc:Description}' \\
  --output table
# interface_type tells you what it really is: "interface" (EC2/Lambda),
# "nat_gateway", "vpc_endpoint", "network_load_balancer", "gateway_load_balancer".

# ---------- Terraform equivalent ----------
# resource "aws_vpc" "prod" {
#   cidr_block           = "10.0.0.0/16"
#   enable_dns_support   = true
#   enable_dns_hostnames = true   # NOT the default - set it explicitly
#   instance_tenancy     = "default"
#   tags = { Name = "prod-vpc" }
# }`,
          ],
          questions: [
            {
              question: "Is a VPC regional or zonal? What about a subnet?",
              solution: "<p>A <strong>VPC is regional</strong> — it is created in one region and automatically spans every Availability Zone in that region. A <strong>subnet is zonal</strong> — it lives in exactly one AZ and cannot be stretched or moved. That split is the whole basis of high availability design in AWS: you build one VPC, then create one subnet per AZ per tier, so that losing an AZ removes some subnets but never the VPC itself. A VPC cannot span regions; crossing regions requires VPC peering, Transit Gateway peering, or public connectivity.</p>",
            },
            {
              question: "You create a brand-new custom VPC and launch an instance in it. Can it reach the internet? Can it reach other instances in the VPC?",
              solution: "<p>It <strong>can</strong> reach other instances in the VPC — the main route table ships with an un-deletable <code>local</code> route covering the VPC CIDR, so intra-VPC routing works from the first second (subject to security groups and NACLs). It <strong>cannot</strong> reach the internet. A custom VPC comes with no internet gateway, so there is no path out; and even after you create and attach an IGW, nothing changes until you add a <code>0.0.0.0/0 → igw-xxx</code> route to the route table the subnet is associated with, and the instance has a public IPv4 address. A default VPC differs because AWS pre-wires exactly those pieces for you.</p>",
            },
            {
              question: "What do enableDnsSupport and enableDnsHostnames actually do, and which one bites you in a custom VPC?",
              solution: "<p><code>enableDnsSupport</code> turns on the Amazon-provided DNS resolver reachable at <strong>VPC base + 2</strong> and at <code>169.254.169.253</code>; with it off, nothing in the VPC can resolve names and private hosted zones plus VPC endpoints stop working. <code>enableDnsHostnames</code> makes AWS assign public DNS hostnames to instances that have public IPs, and is the flag that lets <strong>private DNS for interface VPC endpoints</strong> and RDS endpoints resolve correctly. The one that bites you is <code>enableDnsHostnames</code>: it defaults to <strong>true in the default VPC but false in a custom VPC</strong>, so a hand-built VPC silently sends endpoint traffic to public service names until you enable it.</p>",
            },
            {
              question: "How is one customer's VPC kept isolated from another's if they both use 10.0.0.0/16?",
              solution: "<p>Isolation is done by the AWS network fabric, not by your rules. Every packet leaving an instance is encapsulated and tagged with the VPC it belongs to, and the mapping service on each host will only deliver a packet to a destination inside the same VPC (or to an explicitly configured attachment such as a peering connection, Transit Gateway or gateway). Overlapping CIDRs are therefore harmless <em>until</em> you try to connect the two networks — which is exactly why peering and Transit Gateway <strong>refuse overlapping CIDR blocks</strong>, and why you should allocate non-overlapping ranges from a central IPAM plan even for VPCs you believe will never talk to each other.</p>",
            },
            {
              question: "What is an ENI and why does it matter conceptually?",
              solution: "<p>An <strong>Elastic Network Interface</strong> is a virtual NIC: it holds one or more private IPv4 addresses from a subnet, optionally a public IP or Elastic IP, a MAC address, and the security groups that apply. It matters because <em>almost everything in a VPC is an ENI in disguise</em> — an EC2 instance, a NAT gateway, an interface VPC endpoint, an NLB node, an RDS instance, a VPC-attached Lambda. That is why security groups attach to ENIs rather than to instances, why a Lambda in a VPC consumes subnet IP addresses, and why <code>describe-network-interfaces</code> is the single best command for finding out what is actually consuming IPs in a subnet.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html",
            "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-dns.html",
            "https://docs.aws.amazon.com/vpc/latest/userguide/amazon-vpc-limits.html",
          ],
        },
        {
          topic: "CIDR Blocks — Reading, Sizing and Planning IP Ranges",
          tags: ["aws", "vpc", "cidr", "subnetting", "ipv4", "ipv6", "networking"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>CIDR (Classless Inter-Domain Routing)</strong> notation is how you write an IP range: <code>10.0.0.0/16</code>. The number after the slash is the <strong>prefix length</strong> — how many leading bits are fixed as the network portion. The remaining bits are free to vary, and they are the addresses you get.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The only arithmetic you need</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>An IPv4 address is <strong>32 bits</strong>. Host bits = <code>32 − prefix</code>. Total addresses = <code>2^(32 − prefix)</code>.</li>
  <li><strong>Every +1 on the prefix halves the range. Every −1 doubles it.</strong> That one sentence gets you through most whiteboard questions.</li>
  <li><code>/16</code> → 65,536 addresses · <code>/20</code> → 4,096 · <code>/24</code> → 256 · <code>/26</code> → 64 · <code>/28</code> → 16.</li>
  <li>Anchor to memorise: <strong>/24 = 256</strong>. Then count in halves: /25=128, /26=64, /27=32, /28=16.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">AWS steals 5 addresses from every subnet</h4>
<p style="line-height: 1.75;">In a normal network you lose 2 (network + broadcast). <strong>In AWS you lose 5.</strong> For a subnet <code>10.0.1.0/24</code>:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><code>10.0.1.0</code> — network address.</li>
  <li><code>10.0.1.1</code> — the <strong>VPC router</strong> (your implicit default gateway).</li>
  <li><code>10.0.1.2</code> — <strong>DNS</strong>. (The resolver really lives at VPC-base+2, but base+2 is reserved in <em>every</em> subnet.)</li>
  <li><code>10.0.1.3</code> — reserved by AWS for future use.</li>
  <li><code>10.0.1.255</code> — broadcast address. AWS does not support broadcast, but the address is still reserved.</li>
</ul>
<p style="line-height: 1.75;">So a <code>/24</code> gives you <strong>251</strong> usable IPs, not 254. And the smallest allowed subnet, a <code>/28</code>, gives you <strong>11</strong> usable IPs out of 16 — which is why <code>/28</code> is almost never the right answer for a workload subnet.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">AWS size limits</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>VPC CIDR: /16 (largest) to /28 (smallest).</strong></li>
  <li><strong>Subnet CIDR: same /16 to /28 bounds</strong>, and it must sit inside a VPC CIDR without overlapping another subnet.</li>
  <li>The VPC's primary CIDR <strong>cannot be changed or resized</strong> after creation. You can only <em>add</em> up to 4 (soft, raisable to 50) <strong>secondary CIDR blocks</strong> — and those cannot overlap the primary, or a route in any route table associated with the VPC.</li>
  <li>You can also bring your own range (<strong>BYOIP</strong>) or allocate from <strong>AWS IPAM</strong> pools.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Which ranges to use (RFC 1918)</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><code>10.0.0.0/8</code> — 16.7M addresses. The default choice for AWS; gives you room to hand each VPC its own /16.</li>
  <li><code>172.16.0.0/12</code> — <code>172.16.x</code> to <code>172.31.x</code>. <strong>Avoid 172.31.0.0/16</strong>: that is the default VPC's range in every region, and re-using it guarantees a future peering conflict. Docker's default bridge also lives in 172.17.0.0/16.</li>
  <li><code>192.168.0.0/16</code> — small, and collides with home/office routers, which breaks VPN users.</li>
  <li><strong>Never overlap</strong> with on-prem, with partner networks, or with another VPC you might one day peer. Peering and Transit Gateway simply refuse overlapping CIDRs, and fixing it later means rebuilding the VPC.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">A sane sizing recipe</h4>
<p style="line-height: 1.75;">Give the VPC a <code>/16</code> even if you think you need a <code>/22</code> — private IPv4 space is free, and running out is expensive. Then split by AZ first, tier second:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><code>10.0.0.0/16</code> VPC in 3 AZs.</li>
  <li>Public subnets (small — they hold only load balancers and NAT gateways): <code>10.0.0.0/24</code>, <code>10.0.1.0/24</code>, <code>10.0.2.0/24</code>.</li>
  <li>Private app subnets (big — pods and Lambda ENIs eat IPs fast): <code>10.0.16.0/20</code>, <code>10.0.32.0/20</code>, <code>10.0.48.0/20</code>.</li>
  <li>Private data subnets: <code>10.0.64.0/24</code>, <code>10.0.65.0/24</code>, <code>10.0.66.0/24</code>.</li>
  <li>Leave the second half of the VPC (<code>10.0.128.0/17</code>) completely unallocated for growth.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">IPv6 in one paragraph</h4>
<p style="line-height: 1.75;">IPv6 is opt-in and additive — a VPC can be dual-stack but never IPv6-only at the VPC level. AWS gives the VPC a fixed <strong>/56</strong> (Amazon-provided or your own), and every subnet takes a <strong>/64</strong>. Sizes are fixed, so there is no IPv6 subnetting maths to do. All IPv6 addresses in AWS are <strong>publicly routable</strong> — there is no NAT — so a private IPv6 subnet gets outbound-only access through an <strong>egress-only internet gateway</strong>, the IPv6 analogue of a NAT gateway.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "The /N is the number of fixed network bits, so the range holds 2^(32−N) addresses and each extra bit halves it — /16 is 65,536, /24 is 256, /28 is 16. AWS reserves five addresses in every subnet — network, VPC router, DNS, one future-use, and broadcast — so a /24 gives 251 usable. A VPC CIDR must be between /16 and /28, cannot be resized after creation (only extended with secondary CIDRs), and must not overlap on-prem or any VPC you might peer with. In practice I allocate a /16 per VPC out of 10.0.0.0/8, avoid 172.31.0.0/16 because that is the default VPC, keep public subnets small and app subnets large, and leave half the range unallocated."</div>
</div>`,
          examples: [
            `# ---------- Reading a CIDR in your head ----------
# 10.0.0.0/16   -> fixed: 10.0.   free: x.y      -> 65,536 addrs  (10.0.0.0 - 10.0.255.255)
# 10.0.1.0/24   -> fixed: 10.0.1. free: last     ->    256 addrs  (10.0.1.0 - 10.0.1.255)
# 10.0.1.0/26   -> free: 6 bits                  ->     64 addrs  (10.0.1.0 - 10.0.1.63)
# 10.0.1.64/26  -> the next block                ->     64 addrs  (10.0.1.64 - 10.0.1.127)
# Rule of thumb: /24 = 256, and every +1 halves it.

# ---------- The 5 reserved addresses in 10.0.1.0/24 ----------
# 10.0.1.0    network
# 10.0.1.1    VPC router (default gateway)
# 10.0.1.2    Amazon DNS
# 10.0.1.3    reserved for future use
# 10.0.1.255  broadcast (reserved, unusable)
# => 251 usable. A /28 => 16 - 5 = 11 usable.

# ---------- Ask AWS instead of trusting your arithmetic ----------
aws ec2 describe-subnets --subnet-ids subnet-0a1b2c3d \\
  --query 'Subnets[].{CIDR:CidrBlock,Free:AvailableIpAddressCount,AZ:AvailabilityZone}'
# [{"CIDR": "10.0.1.0/24", "Free": 243, "AZ": "ap-south-1a"}]
# Free counts only unassigned addresses: 251 usable minus ENIs already in use.

# ---------- Add a secondary CIDR when you run out (you cannot resize the primary) ----------
aws ec2 associate-vpc-cidr-block --vpc-id vpc-0a1b2c3d --cidr-block 10.1.0.0/16
# Constraints: must not overlap the primary or any existing route destination.
# The new range does NOT automatically create subnets - you still carve them.

# ---------- Dual-stack: let AWS pick an IPv6 /56 ----------
aws ec2 associate-vpc-cidr-block --vpc-id vpc-0a1b2c3d --amazon-provided-ipv6-cidr-block
# VPC gets a /56; each subnet must be given exactly a /64 out of it.

# ---------- Quick local sanity check before you commit a plan ----------
python3 - <<'PY'
import ipaddress
vpc = ipaddress.ip_network("10.0.0.0/16")
print("VPC addrs:", vpc.num_addresses)
for s in ["10.0.0.0/24", "10.0.16.0/20", "10.0.64.0/24"]:
    n = ipaddress.ip_network(s)
    print(s, "total", n.num_addresses, "usable in AWS", n.num_addresses - 5,
          "inside VPC:", n.subnet_of(vpc))
PY`,
          ],
          questions: [
            {
              question: "How many usable IP addresses does a /24 subnet give you in AWS, and why is it not 254?",
              solution: "<p><strong>251.</strong> A /24 has 256 addresses, and AWS reserves <strong>five</strong> in every subnet rather than the usual two: the network address (<code>.0</code>), the VPC router (<code>.1</code>, which acts as your default gateway), the DNS reservation (<code>.2</code>), one address reserved for future use (<code>.3</code>), and the broadcast address (<code>.255</code>, reserved even though AWS does not support broadcast). The same five-address tax applies at every size, which is why the smallest permitted subnet — a /28 with 16 addresses — yields only <strong>11</strong> usable IPs and is effectively useless for real workloads.</p>",
            },
            {
              question: "What are the minimum and maximum CIDR sizes for a VPC and a subnet, and can you resize later?",
              solution: "<p>Both a VPC CIDR and a subnet CIDR must be between <strong>/16 (largest) and /28 (smallest)</strong>. Neither can be resized after creation. A <strong>subnet's CIDR is immutable</strong> — to change it you delete and recreate it, which means moving every ENI in it. A <strong>VPC's primary CIDR is also immutable</strong>, but you can extend the VPC by associating up to four (raisable) <strong>secondary CIDR blocks</strong>, provided they do not overlap the primary or any existing route destination. Because of this, size generously up front: a /16 of private space costs nothing, and running out means adding secondary ranges or rebuilding.</p>",
            },
            {
              question: "You need three subnets that each hold about 100 instances. Size them.",
              solution: "<p>100 instances needs 100 usable IPs, so account for the 5 reserved addresses plus headroom for ELB nodes and future growth. A <strong>/25</strong> gives 128 − 5 = <strong>123 usable</strong> — workable but tight. A <strong>/24</strong> gives <strong>251 usable</strong> and is the sensible choice: it doubles the headroom for free, since private IPv4 space costs nothing. A /26 (59 usable) is far too small. So: <code>10.0.1.0/24</code>, <code>10.0.2.0/24</code>, <code>10.0.3.0/24</code>, one per AZ. If these are EKS subnets I would go larger still — a /20 — because every pod consumes a VPC IP under the AWS VPC CNI.</p>",
            },
            {
              question: "Why should you avoid 172.31.0.0/16 and 192.168.0.0/16 for a production VPC?",
              solution: "<p><code>172.31.0.0/16</code> is the CIDR AWS assigns to the <strong>default VPC in every region</strong>, so choosing it almost guarantees a collision the day you peer with another account or region — peering and Transit Gateway both refuse overlapping ranges. <code>192.168.0.0/16</code> is the range used by consumer routers and small office networks, so it breaks Client VPN and site-to-site users whose home network already uses it. (For the same reason, watch <code>172.17.0.0/16</code>, Docker's default bridge.) The safe default is to allocate distinct /16s out of <code>10.0.0.0/8</code>, ideally from a central <strong>AWS IPAM</strong> pool so no two teams pick the same range.</p>",
            },
            {
              question: "Your EKS cluster fails to schedule pods with an IP exhaustion error. What happened and what are your options?",
              solution: "<p>With the AWS VPC CNI, <strong>every pod gets a real VPC IP address</strong> from the node's subnet, and nodes pre-warm whole batches of IPs onto secondary ENIs — so a /24 app subnet (251 usable) runs dry after a surprisingly small number of pods. Options, cheapest first: (1) add a <strong>secondary CIDR</strong> to the VPC, create large new subnets in it, and point the CNI at them via custom networking; (2) enable <strong>prefix delegation</strong>, so each ENI is assigned /28 prefixes instead of individual IPs, dramatically increasing pod density per node; (3) tune <code>WARM_IP_TARGET</code>/<code>MINIMUM_IP_TARGET</code> so nodes hoard fewer spare IPs. The long-term fix is the lesson: size app subnets as /20s from day one.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/vpc/latest/userguide/subnet-sizing.html",
            "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-cidr-blocks.html",
            "https://docs.aws.amazon.com/vpc/latest/ipam/what-it-is-ipam.html",
          ],
        },
        {
          topic: "Subnets — AZ-Scoped Slices of the VPC",
          tags: ["aws", "vpc", "subnet", "availability-zone", "eni", "networking"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  A <strong>subnet</strong> is a sub-range of the VPC's CIDR block, pinned to <strong>exactly one Availability Zone</strong>. It is the unit you actually launch things into: when you start an EC2 instance, create an RDS database, attach a Lambda to a VPC or place a load balancer, you choose <em>subnets</em>, and AWS creates ENIs that take private IPs from those subnets.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The rules</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>One subnet = one AZ.</strong> Always. A subnet can never span two AZs, and you cannot move it to another AZ.</li>
  <li><strong>One AZ can hold many subnets</strong> — that is exactly how you build tiers (public / app / data) inside the same AZ.</li>
  <li>Subnet CIDRs must be <strong>inside the VPC CIDR</strong> and must <strong>not overlap</strong> each other.</li>
  <li>The CIDR is <strong>immutable</strong>. Resizing means create-new / migrate / delete-old.</li>
  <li>Every subnet is <strong>associated with exactly one route table</strong> — explicitly, or implicitly with the VPC's main route table.</li>
  <li>Every subnet is associated with exactly one <strong>network ACL</strong> (the default one unless you change it).</li>
  <li>Five IPs per subnet are reserved by AWS (see the CIDR section).</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Subnet "types" are a naming convention, not a setting</h4>
<p style="line-height: 1.75;">There is no <code>Type: public</code> field on a subnet. The type is <em>emergent</em> from routing:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Public</strong> — its route table has <code>0.0.0.0/0 → igw-xxx</code>.</li>
  <li><strong>Private</strong> — no IGW route; typically <code>0.0.0.0/0 → nat-xxx</code> for outbound-only access.</li>
  <li><strong>Isolated</strong> — no default route at all, only <code>local</code>. Used for databases that must never reach the internet; they reach AWS services through VPC endpoints.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Per-subnet settings worth knowing</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><code>MapPublicIpOnLaunch</code> (auto-assign public IPv4) — <strong>false</strong> in a custom subnet, <strong>true</strong> in default-VPC subnets. Turning it on does <em>not</em> make a subnet public; without an IGW route the address is simply unusable.</li>
  <li><code>AssignIpv6AddressOnCreation</code> — the IPv6 equivalent.</li>
  <li><code>EnableDns64</code>, <code>PrivateDnsHostnameTypeOnLaunch</code> — resource-name vs IP-name hostnames, and NAT64 support.</li>
  <li><strong>AvailableIpAddressCount</strong> — the number you check first when a launch or a pod fails.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Who else eats your subnet IPs</h4>
<p style="line-height: 1.75;">Beginners size subnets for instances and get surprised. Each of these consumes real IPs from the subnet: an <strong>Application Load Balancer</strong> (it scales out and can use 8+ IPs per subnet), a <strong>NAT gateway</strong> (1), each <strong>interface VPC endpoint</strong> (1 per subnet), each <strong>VPC-attached Lambda</strong> (a shared Hyperplane ENI per subnet+SG combination), each <strong>RDS/ElastiCache node</strong>, and every <strong>EKS pod</strong> under the VPC CNI. ALBs in particular require their subnets to have at least <strong>/27 and 8 free IPs</strong> in each of at least two AZs.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The standard three-tier layout</h4>
<p style="line-height: 1.75;">For each of 2-3 AZs you create three subnets: a small <strong>public</strong> subnet (ALB + NAT gateway), a large <strong>private app</strong> subnet (EC2/ECS/EKS/Lambda), and a <strong>private data</strong> subnet (RDS, ElastiCache) whose route table has no internet route at all. The data subnets are grouped into an <strong>RDS DB subnet group</strong>, which requires subnets in at least two AZs so Multi-AZ failover has somewhere to go.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "A subnet is a slice of the VPC CIDR bound to exactly one AZ — it can never span AZs, and its CIDR is immutable. Every subnet has one route table and one NACL, and five of its IPs are reserved by AWS. Public versus private is not a property of the subnet: it is purely whether its route table has a 0.0.0.0/0 route to an internet gateway. In production I create one public, one private-app and one private-data subnet per AZ across at least two AZs, keep the public ones small since they only hold ALBs and NAT gateways, and make the app subnets large because ALB nodes, VPC endpoints, Lambda ENIs and EKS pods all consume subnet IPs."</div>
</div>`,
          examples: [
            `# ---------- Create one subnet per AZ (note: AZ is chosen at creation, forever) ----------
aws ec2 create-subnet --vpc-id vpc-0a1b2c3d \\
  --cidr-block 10.0.0.0/24 --availability-zone ap-south-1a \\
  --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=public-1a},{Key=tier,Value=public}]'
aws ec2 create-subnet --vpc-id vpc-0a1b2c3d \\
  --cidr-block 10.0.16.0/20 --availability-zone ap-south-1a \\
  --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=app-1a},{Key=tier,Value=private}]'

# ---------- Turn on auto-assign public IPv4 (public subnets only) ----------
aws ec2 modify-subnet-attribute --subnet-id subnet-pub1a --map-public-ip-on-launch
# This alone does NOT make it public - the route table decides that.

# ---------- The one-glance audit: which subnets are actually public? ----------
aws ec2 describe-route-tables --filters Name=vpc-id,Values=vpc-0a1b2c3d \\
  --query 'RouteTables[].{RT:RouteTableId,
                          Public:Routes[?GatewayId!=null && starts_with(GatewayId,\`igw-\`)].DestinationCidrBlock,
                          Subnets:Associations[].SubnetId}' --output table

# ---------- Find out what is eating IPs before you blame the subnet size ----------
aws ec2 describe-subnets --filters Name=vpc-id,Values=vpc-0a1b2c3d \\
  --query 'Subnets[].{Name:Tags[?Key==\`Name\`]|[0].Value,AZ:AvailabilityZone,
                      CIDR:CidrBlock,Free:AvailableIpAddressCount,
                      AutoPublicIP:MapPublicIpOnLaunch}' --output table

aws ec2 describe-network-interfaces --filters Name=subnet-id,Values=subnet-app1a \\
  --query 'NetworkInterfaces[].{IP:PrivateIpAddress,Type:InterfaceType,Desc:Description}' --output table
# InterfaceType: interface | nat_gateway | vpc_endpoint | network_load_balancer | lambda

# ---------- RDS needs a DB subnet group spanning >= 2 AZs ----------
aws rds create-db-subnet-group --db-subnet-group-name prod-data \\
  --db-subnet-group-description "private data subnets" \\
  --subnet-ids subnet-data1a subnet-data1b subnet-data1c`,
          ],
          questions: [
            {
              question: "Can a subnet span two Availability Zones? Can an AZ contain multiple subnets?",
              solution: "<p><strong>No</strong> and <strong>yes.</strong> A subnet is bound to exactly one AZ at creation and can never span AZs or be moved — the AZ is as immutable as the CIDR. A single AZ, on the other hand, can hold as many subnets as you like, and that is precisely how tiering works: in <code>ap-south-1a</code> you might have a public subnet for the ALB, a private app subnet, and a private data subnet, all in the same zone. The practical consequence is that <strong>fault tolerance comes from spreading subnets across AZs</strong>, and services that require high availability (ALB, RDS Multi-AZ, EKS) demand subnets in at least two different AZs.</p>",
            },
            {
              question: "What makes a subnet 'public'? Is there a flag for it?",
              solution: "<p>There is <strong>no public/private flag</strong> anywhere on a subnet. A subnet is public if and only if <strong>its associated route table contains a route to an internet gateway</strong>, typically <code>0.0.0.0/0 → igw-xxx</code>. Two things are commonly mistaken for the flag: the <code>MapPublicIpOnLaunch</code> attribute (which only assigns public IPs — without an IGW route those addresses do nothing), and the subnet's Name tag saying <code>public</code> (which is pure convention). To audit an unfamiliar VPC, ignore the names and list route tables, checking which ones have an <code>igw-</code> target and which subnets are associated with them.</p>",
            },
            {
              question: "Your ALB fails to launch with a 'not enough available IP addresses' error, but the subnet shows 20 free. Why?",
              solution: "<p>An <strong>Application Load Balancer requires each of its subnets to be at least a /27 and to have at least 8 free IP addresses</strong>, and it reserves capacity to scale out under load — so a subnet that is technically non-empty can still fail the check, especially if the subnet is smaller than /27. The wider lesson is that many things quietly consume subnet IPs besides your instances: NAT gateways (1 each), interface VPC endpoints (1 per subnet), Lambda Hyperplane ENIs (one per subnet+security-group combination), RDS nodes, and EKS pods under the VPC CNI. The fix is a larger subnet — and since subnet CIDRs are immutable, that means creating a new, bigger subnet and migrating.</p>",
            },
            {
              question: "How do you change a subnet's CIDR from /24 to /22?",
              solution: "<p>You cannot. <strong>A subnet's CIDR block is immutable</strong>, as is the VPC's primary CIDR. The real procedure is: (1) if the VPC has no free space, associate a <strong>secondary CIDR block</strong> with the VPC; (2) create a new, larger subnet in the <em>same AZ</em>; (3) associate it with the same route table and NACL; (4) migrate workloads — launch new instances/nodes there, re-point Auto Scaling groups, add the subnet to the ALB or DB subnet group, drain the old one; (5) delete the old subnet once no ENIs remain. This is exactly why you size subnets generously at design time — a /20 for app tiers costs nothing extra.</p>",
            },
            {
              question: "What is a subnet associated with by default if you never attach a route table or NACL?",
              solution: "<p>It is <strong>implicitly associated with the VPC's main route table</strong> and with the VPC's <strong>default network ACL</strong>. That implicit association is a common source of accidents: if someone adds an internet gateway route to the <em>main</em> route table, every subnet that was never explicitly associated elsewhere silently becomes public — including database subnets. The defensive practice is to leave the main route table with only the <code>local</code> route (or make it the private one), and <strong>explicitly associate every subnet</strong> with a purpose-built route table so nothing inherits internet access by accident.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html",
            "https://docs.aws.amazon.com/vpc/latest/userguide/subnet-sizing.html",
            "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/application-load-balancers.html#subnets-load-balancer",
          ],
        },
        {
          topic: "Availability Zones — How Subnets Buy You Fault Tolerance",
          tags: ["aws", "vpc", "availability-zone", "high-availability", "az-id", "resilience"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  An <strong>Availability Zone</strong> is one or more discrete data centres inside a region, with independent power, cooling and physical security, connected to the other AZs in that region by dedicated, high-bandwidth, low-latency (single-digit millisecond) links. Most regions have <strong>3-6 AZs</strong>. The point of the design is simple: an AZ is the <strong>blast radius</strong> of a physical failure, and subnets are how you spread across that boundary.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Why this matters for VPC design</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>A VPC spans all AZs, but <strong>each subnet lives in one</strong>. So the only way to survive an AZ failure is to have <strong>subnets and running capacity in more than one AZ</strong>.</li>
  <li>AWS enforces this for you in places: an <strong>ALB/NLB requires subnets in at least two AZs</strong>, and an <strong>RDS DB subnet group requires at least two AZs</strong>.</li>
  <li>Per-AZ resources fail with their AZ. A <strong>NAT gateway is zonal</strong> — one NAT gateway serving all three AZs is both a single point of failure and a cross-AZ data charge generator. Production pattern: <strong>one NAT gateway per AZ</strong>, and each AZ's private route table points at its own.</li>
  <li>An <strong>EBS volume is zonal</strong> too, so an instance can only attach a volume in its own AZ.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">AZ names are shuffled per account — use AZ IDs</h4>
<p style="line-height: 1.75;">This is the detail that separates people who have operated multi-account AWS from people who have read about it. <code>ap-south-1a</code> in <em>your</em> account and <code>ap-south-1a</code> in <em>my</em> account are very likely <strong>different physical zones</strong> — AWS randomises the letter-to-zone mapping per account to stop everyone piling into "the first one". The stable, account-independent identifier is the <strong>AZ ID</strong>, like <code>aps1-az1</code>. Use AZ IDs when you must correlate zones across accounts: shared VPC subnets via <strong>Resource Access Manager</strong>, cross-account data-transfer analysis, or placing capacity next to a partner's.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Cross-AZ traffic costs money</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Traffic between AZs is charged in <strong>both directions</strong> (historically $0.01/GB each way). Traffic <em>within</em> an AZ using private IPs is free.</li>
  <li>This is why chatty microservices, a cross-AZ NAT gateway, or an ALB with cross-zone load balancing switched on can produce a surprising "EC2-Other" line on the bill.</li>
  <li>The trade-off is real but one-sided: <strong>pay for cross-AZ redundancy</strong>. A single-AZ deployment is cheaper right up until the zone goes down.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Related zone concepts</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Local Zones</strong> — AWS infrastructure placed in a metro area for single-digit-ms latency; you extend a VPC into one by creating a subnet there (opt-in required).</li>
  <li><strong>Wavelength Zones</strong> — the same idea inside telco 5G networks.</li>
  <li><strong>Outposts</strong> — AWS racks in your own data centre, again surfaced as a subnet of your VPC.</li>
  <li>All three follow the same model: <em>a new place to put a subnet</em>, which is a neat confirmation that the subnet is the real unit of placement.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "An AZ is one or more physically separate data centres in a region with independent power and cooling, linked by low-latency private fibre. A VPC spans every AZ but each subnet sits in exactly one, so spreading subnets across AZs is how you get fault tolerance — and AWS enforces it, since ALBs and RDS subnet groups both require at least two AZs. I also put one NAT gateway per AZ so a zone failure or cross-AZ charges do not bite. One subtlety: AZ letters are randomised per account, so to correlate zones across accounts you use AZ IDs like aps1-az1, not ap-south-1a."</div>
</div>`,
          examples: [
            `# ---------- List AZs and, crucially, their account-independent IDs ----------
aws ec2 describe-availability-zones --region ap-south-1 \\
  --query 'AvailabilityZones[].{Name:ZoneName,Id:ZoneId,Type:ZoneType,State:State}' --output table
# | ap-south-1a | aps1-az1 | availability-zone | available |
# | ap-south-1b | aps1-az3 | availability-zone | available |
# | ap-south-1c | aps1-az2 | availability-zone | available |
# Note how the letters do NOT line up with the IDs: that mapping is per-account.

# ---------- Include opt-in zones (Local Zones, Wavelength) ----------
aws ec2 describe-availability-zones --all-availability-zones \\
  --query 'AvailabilityZones[?ZoneType!=\`availability-zone\`].{Name:ZoneName,Type:ZoneType,Parent:ParentZoneName}'

# ---------- Build subnets across AZs programmatically, never hardcoding letters ----------
VPC=vpc-0a1b2c3d; i=0
for AZ in $(aws ec2 describe-availability-zones --region ap-south-1 \\
            --query 'AvailabilityZones[?State==\`available\`].ZoneName' --output text); do
  aws ec2 create-subnet --vpc-id $VPC --availability-zone "$AZ" \\
    --cidr-block "10.0.$i.0/24" \\
    --tag-specifications "ResourceType=subnet,Tags=[{Key=Name,Value=public-$AZ}]"
  i=$((i+1))
done

# ---------- One NAT gateway PER AZ: the production pattern ----------
# AZ-a: private-rt-a  0.0.0.0/0 -> nat-a (which lives in public-a)
# AZ-b: private-rt-b  0.0.0.0/0 -> nat-b (which lives in public-b)
# Wrong (cheap but fragile): all three private RTs -> nat-a.
#   - nat-a's AZ fails  => all private subnets lose egress
#   - b and c traffic crosses AZs => charged both ways, every GB

# ---------- Terraform: let the data source pick the AZs ----------
# data "aws_availability_zones" "available" { state = "available" }
# resource "aws_subnet" "public" {
#   count             = 3
#   vpc_id            = aws_vpc.prod.id
#   availability_zone = data.aws_availability_zones.available.names[count.index]
#   cidr_block        = cidrsubnet(aws_vpc.prod.cidr_block, 8, count.index)
# }`,
          ],
          questions: [
            {
              question: "Why is ap-south-1a in your account possibly a different physical zone than ap-south-1a in mine?",
              solution: "<p>AWS <strong>randomises the mapping of AZ letters to physical zones on a per-account basis</strong>, so that customers do not all concentrate load in whatever zone is named <code>a</code>. The account-independent identifier is the <strong>AZ ID</strong> — <code>aps1-az1</code>, <code>use1-az4</code> and so on — which refers to the same physical zone in every account. This matters whenever you correlate zones across accounts: sharing subnets through <strong>Resource Access Manager</strong> (shared subnets are presented with their AZ ID), keeping a workload physically co-located with a partner service, or reasoning about cross-AZ data transfer between accounts.</p>",
            },
            {
              question: "How many AZs should a production VPC use, and why not just one?",
              solution: "<p><strong>At least two, preferably three.</strong> An AZ is the blast radius of a power, cooling or network failure, and a single-AZ deployment goes down with it — there is no recovery path because subnets, EBS volumes and NAT gateways are all zonal. AWS bakes the requirement into its services: ALBs and NLBs need subnets in two or more AZs, and an RDS DB subnet group must span at least two. Three AZs additionally protect quorum-based systems (etcd, Kafka, ZooKeeper) which need a majority to survive one zone loss. The cost is cross-AZ data transfer, charged in both directions — a price worth paying for surviving a zone outage.</p>",
            },
            {
              question: "You have three private subnets in three AZs, all routing 0.0.0.0/0 to a single NAT gateway. What is wrong with that?",
              solution: "<p>Two things. <strong>Availability:</strong> a NAT gateway is a zonal resource, so if its AZ fails, private subnets in <em>all three</em> AZs lose outbound internet access — you have coupled three zones to one zone's fate. <strong>Cost and latency:</strong> traffic from the other two AZs crosses zone boundaries to reach the NAT and crosses back, and cross-AZ transfer is billed in both directions, so the bill grows with every GB of egress. The production pattern is <strong>one NAT gateway per AZ</strong>, in that AZ's public subnet, with each AZ's private route table pointing at its own NAT. In dev, a single shared NAT is a reasonable cost saving — as long as it is a conscious choice.</p>",
            },
            {
              question: "What is a Local Zone and how does it relate to your VPC?",
              solution: "<p>A <strong>Local Zone</strong> is an extension of an AWS region placed close to a large population centre, offering single-digit-millisecond latency to users in that metro. You use it exactly the way you use an AZ: after opting in, you <strong>create a subnet in the Local Zone</strong> within your existing VPC, and launch a subset of services there while the rest stays in the parent region. Wavelength Zones (inside telco 5G networks) and Outposts (AWS racks in your own data centre) follow the same pattern. This is a good illustration that <strong>the subnet is the unit of physical placement</strong> in AWS — the VPC is a logical construct stretched over whatever locations you attach to it.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html",
            "https://docs.aws.amazon.com/ram/latest/userguide/working-with-az-ids.html",
            "https://aws.amazon.com/about-aws/global-infrastructure/regions_az/",
          ],
        },
        {
          topic: "Route Tables — The Rules That Decide Where Traffic Goes",
          tags: ["aws", "vpc", "route-table", "routing", "longest-prefix-match", "networking"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  A <strong>route table</strong> is an ordered-by-specificity set of rules — <em>destination CIDR → target</em> — that the VPC's implicit router consults for every packet leaving a subnet. It is the single most important object in a VPC, because it is what actually determines whether a subnet is public, private or isolated, and it is where the majority of "why can't this reach that?" bugs live.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Anatomy of a route</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Destination</strong> — a CIDR (<code>0.0.0.0/0</code>, <code>10.0.0.0/16</code>, <code>172.16.5.0/24</code>) or a <strong>managed prefix list</strong> (how gateway VPC endpoints appear).</li>
  <li><strong>Target</strong> — where to send it: <code>local</code>, <code>igw-</code> (internet gateway), <code>nat-</code> (NAT gateway), <code>eigw-</code> (egress-only IGW), <code>pcx-</code> (peering), <code>tgw-</code> (transit gateway), <code>vgw-</code> (virtual private gateway), <code>vpce-</code> (gateway endpoint), or an <strong>ENI</strong> (for a firewall/appliance).</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The rules of evaluation</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Longest prefix match wins.</strong> The <em>most specific</em> matching route is used, regardless of order in the console. <code>10.0.5.0/24</code> beats <code>10.0.0.0/16</code>, which beats <code>0.0.0.0/0</code>.</li>
  <li><strong>The <code>local</code> route always wins for VPC-internal traffic</strong> and cannot be deleted or overridden by a less specific route. (Only a <em>more specific</em> route than the VPC CIDR can steer intra-VPC traffic — that is the trick used to force traffic through an inspection appliance.)</li>
  <li><strong>No matching route = packet dropped.</strong> There is no implicit default gateway.</li>
  <li>Route tables only affect traffic <strong>leaving a subnet</strong>. Return traffic is handled by the same table on the way back, which is why asymmetric setups break.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Association rules</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>One subnet → exactly one route table.</strong> A route table can serve many subnets.</li>
  <li>Every VPC has a <strong>main route table</strong>. Any subnet you do not explicitly associate falls back to it. Danger: adding an IGW route to the main table silently makes every unassociated subnet public.</li>
  <li>Best practice: leave the main route table with only the <code>local</code> route, and explicitly associate every subnet with a named table (<code>public-rt</code>, <code>private-rt-1a</code>, ...).</li>
  <li>There is also a <strong>gateway route table</strong> — a route table associated with the IGW itself, used for ingress routing to inspection appliances. Advanced, but worth naming.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The three canonical tables</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>public-rt</strong>: <code>10.0.0.0/16 → local</code>, <code>0.0.0.0/0 → igw-xxx</code>.</li>
  <li><strong>private-rt-1a</strong>: <code>10.0.0.0/16 → local</code>, <code>0.0.0.0/0 → nat-1a</code> (one per AZ), plus <code>pl-xxxx (S3) → vpce-xxx</code> if you use a gateway endpoint.</li>
  <li><strong>isolated-rt</strong>: <code>10.0.0.0/16 → local</code>. Nothing else. Databases live here and reach AWS services only through VPC endpoints.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Propagation and blackholes</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Route propagation</strong> lets a virtual private gateway or Transit Gateway inject learned BGP routes automatically instead of you typing them. Turn it on per route table.</li>
  <li>A route whose target no longer exists (deleted NAT gateway, deleted peering) shows state <strong><code>blackhole</code></strong> and silently drops traffic. It is the first thing to grep for when egress mysteriously dies.</li>
  <li>Quota: <strong>50 routes per route table</strong> (raisable to 1,000 with performance caveats) and 200 route tables per VPC.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "A route table maps destination CIDRs to targets, and every subnet is associated with exactly one — implicitly the VPC's main table if you do not attach another. Matching is by longest prefix, so the most specific route wins, and the un-deletable local route always handles intra-VPC traffic. If nothing matches, the packet is dropped — there is no implicit default gateway. In practice I keep one public table with 0.0.0.0/0 to the IGW, one private table per AZ pointing at that AZ's NAT gateway, and an isolated table with only the local route for databases; and I never put an internet route in the main table, because every subnet I forget to associate would inherit it."</div>
</div>`,
          examples: [
            `# ---------- Create the public route table and wire it up ----------
RT=$(aws ec2 create-route-table --vpc-id vpc-0a1b2c3d \\
       --tag-specifications 'ResourceType=route-table,Tags=[{Key=Name,Value=public-rt}]' \\
       --query 'RouteTable.RouteTableId' --output text)

aws ec2 create-route --route-table-id $RT \\
  --destination-cidr-block 0.0.0.0/0 --gateway-id igw-0123456789abcdef0

aws ec2 associate-route-table --route-table-id $RT --subnet-id subnet-pub1a
# The subnet only becomes "public" at THIS moment.

# ---------- Private table: egress via this AZ's NAT gateway ----------
aws ec2 create-route --route-table-id rtb-private1a \\
  --destination-cidr-block 0.0.0.0/0 --nat-gateway-id nat-0aaa111

# ---------- Longest prefix match in action ----------
# Destination        Target          Chosen for 10.0.5.20?  For 8.8.8.8?
# 10.0.0.0/16        local           yes (more specific)     no
# 10.0.5.0/24        eni-firewall    YES - most specific     no
# 0.0.0.0/0          igw-0123        no                      yes
# The /24 wins over /16 wins over /0. Console row order is irrelevant.

# ---------- Find blackholed routes (deleted NAT/peering = silent outage) ----------
aws ec2 describe-route-tables --filters Name=vpc-id,Values=vpc-0a1b2c3d \\
  --query 'RouteTables[].Routes[?State==\`blackhole\`].{RT:RouteTableId,Dest:DestinationCidrBlock,NAT:NatGatewayId}'

# ---------- Which subnets fall through to the main route table? ----------
aws ec2 describe-route-tables --filters Name=vpc-id,Values=vpc-0a1b2c3d \\
  --query 'RouteTables[].{RT:RouteTableId,Main:Associations[?Main==\`true\`]|[0].Main,
                          Subnets:Associations[?SubnetId!=null].SubnetId,
                          Routes:Routes[].[DestinationCidrBlock,GatewayId,NatGatewayId]}' --output json

# ---------- Let AWS tell you if a path exists, without deploying anything ----------
aws ec2 create-network-insights-path --source i-0abc --destination i-0def \\
  --protocol tcp --destination-port 443
aws ec2 start-network-insights-analysis --network-insights-path-id nip-0123
# Reachability Analyzer names the exact route table, SG or NACL that blocks the path.`,
          ],
          questions: [
            {
              question: "A route table has 0.0.0.0/0 → IGW and 10.0.0.0/16 → local. Where does traffic to 10.0.5.20 go?",
              solution: "<p>To <code>local</code> — it stays inside the VPC. Routing uses <strong>longest prefix match</strong>: <code>10.0.0.0/16</code> is a /16 and <code>0.0.0.0/0</code> is a /0, so the more specific /16 wins for any address inside the VPC. The <code>local</code> route is also special: it is created automatically, <strong>cannot be deleted</strong>, and cannot be overridden by a less specific route — which is what guarantees that instances in a VPC can always reach each other by private IP. The only way to divert intra-VPC traffic (for example through an inspection appliance) is to add a route <em>more specific</em> than the VPC CIDR, such as <code>10.0.5.0/24 → eni-firewall</code>.</p>",
            },
            {
              question: "Can one subnet be associated with two route tables? Can one route table serve several subnets?",
              solution: "<p><strong>No</strong> to the first, <strong>yes</strong> to the second. A subnet has exactly one effective route table — either an explicit association or, failing that, the VPC's <strong>main route table</strong>. A single route table can be associated with any number of subnets, which is normal for a set of public subnets that all share <code>0.0.0.0/0 → igw</code>. The one place you deliberately <em>don't</em> share is private route tables in a multi-AZ design: each AZ gets its own table so it can point at its own NAT gateway, avoiding cross-AZ charges and a single point of failure.</p>",
            },
            {
              question: "Someone added an internet gateway route to the main route table. What is the blast radius?",
              solution: "<p>Every subnet that was never <strong>explicitly associated</strong> with another route table just became public — potentially including database subnets nobody intended to expose. Whether that leads to actual internet exposure also depends on instances having public IPs and on security groups, but the routing barrier is gone, and outbound access is immediate. This is why the standard hardening practice is to <strong>leave the main route table with only the local route</strong> (or make it the private/isolated table) and explicitly associate every subnet with a purpose-named table. A quick audit: list route tables, find any with an <code>igw-</code> target, and check which subnets they serve.</p>",
            },
            {
              question: "Your instances suddenly lose outbound internet access. Routes look present in the console. What do you check?",
              solution: "<p>Check the route's <strong>State</strong>: a route whose target no longer exists shows <code>blackhole</code> and silently drops traffic while still appearing as a row. The usual causes are a deleted or recreated <strong>NAT gateway</strong> (its id changed), a deleted <strong>peering connection</strong>, or a detached gateway. Fix by repointing the route at the current target. If the routes are all <code>active</code>, move down the list: is the NAT gateway in a <em>public</em> subnet with an IGW route and an Elastic IP, does the NACL allow the ephemeral return ports, and does the security group allow the outbound? <strong>Reachability Analyzer</strong> will name the exact blocking component without any guesswork.</p>",
            },
            {
              question: "What is route propagation and when do you use it?",
              solution: "<p><strong>Route propagation</strong> is a per-route-table setting that lets a <strong>virtual private gateway</strong> (Site-to-Site VPN) or a <strong>Transit Gateway</strong> automatically install the routes it learns over BGP, instead of you maintaining static entries for every on-prem prefix. You enable it on the route tables that should learn those prefixes. It keeps hybrid routing correct as the on-prem side changes, but the usual rules still apply — propagated routes compete by <strong>longest prefix match</strong>, and a static route you typed takes precedence over a propagated route for the same destination, which is occasionally a surprising override.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Route_Tables.html",
            "https://docs.aws.amazon.com/vpc/latest/userguide/route-table-options.html",
            "https://docs.aws.amazon.com/vpc/latest/reachability/what-is-reachability-analyzer.html",
          ],
        },
        {
          topic: "Internet Gateway — The VPC's Door to the Public Internet",
          tags: ["aws", "vpc", "internet-gateway", "igw", "nat", "public-ip", "egress-only"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  An <strong>Internet Gateway (IGW)</strong> is a horizontally scaled, redundant, highly available VPC component that allows communication between your VPC and the internet. It imposes <strong>no bandwidth constraints</strong> and costs nothing by itself — you pay only for data transfer out of AWS. There is no instance to patch, no throughput to size; it is a logical attachment point.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What it actually does</h4>
<p style="line-height: 1.75;">Two jobs:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Routing target</strong> — it gives route tables a place to send internet-bound traffic.</li>
  <li><strong>1:1 NAT for public IPv4</strong> — this is the part people miss. Your instance never sees its public IP: the ENI only holds a private address like <code>10.0.1.25</code>, and the IGW rewrites the source address to the associated public IP or Elastic IP on the way out, and rewrites the destination back to the private address on the way in. That is why <code>ip addr</code> inside a public EC2 instance shows only the private IP, and why you must not hardcode the public address into the OS network config.</li>
</ul>
<p style="line-height: 1.75;">For <strong>IPv6</strong> there is no translation — IPv6 addresses are globally routable, so the IGW simply forwards.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The rules</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>One IGW per VPC</strong>, and an IGW can be attached to only one VPC at a time.</li>
  <li>Creating it is not enough — it must be <strong>attached</strong> to the VPC, <em>and</em> a route table must point at it.</li>
  <li>You cannot detach an IGW while any instance in the VPC still has a public IP or Elastic IP associated.</li>
  <li>It is <strong>free</strong>; NAT gateways are not. If a beginner is told "internet access costs money", the money is the NAT gateway, not the IGW.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The four conditions for an instance to reach the internet</h4>
<p style="line-height: 1.75;">Memorise this checklist — it is the single most common troubleshooting question in a VPC interview:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>1.</strong> An IGW is created <em>and attached</em> to the VPC.</li>
  <li><strong>2.</strong> The subnet's route table has <code>0.0.0.0/0 → igw-xxx</code>.</li>
  <li><strong>3.</strong> The instance's ENI has a <strong>public IPv4 or Elastic IP</strong>.</li>
  <li><strong>4.</strong> Security group (outbound, and inbound for replies to unsolicited traffic) <strong>and</strong> NACL (both directions, remembering ephemeral ports) permit the traffic.</li>
</ul>
<p style="line-height: 1.75;">Miss any one and it fails, usually with a timeout rather than an error — because dropped packets look identical to a slow server.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Egress-only internet gateway (the IPv6 cousin)</h4>
<p style="line-height: 1.75;">Because IPv6 has no NAT, a private IPv6 instance with a route to a normal IGW would be <em>reachable from the internet</em>. The <strong>egress-only internet gateway (EIGW)</strong> solves this: it is stateful and allows outbound IPv6 connections plus their replies, while blocking unsolicited inbound. It is <strong>free</strong>, unlike a NAT gateway. Route: <code>::/0 → eigw-xxx</code>.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">IGW vs NAT gateway vs egress-only IGW</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>IGW</strong> — bidirectional, IPv4 + IPv6, needed by public subnets, free.</li>
  <li><strong>NAT gateway</strong> — outbound-only IPv4 for private subnets, lives <em>in a public subnet</em>, needs an EIP, charged per hour and per GB processed, zonal.</li>
  <li><strong>Egress-only IGW</strong> — outbound-only IPv6, free, VPC-wide.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "An internet gateway is a highly available, horizontally scaled VPC attachment that does two things: it is a valid route target for internet traffic, and it performs one-to-one NAT between an instance's private IPv4 address and its public IP or Elastic IP — which is why the instance itself only ever sees a private address. There is one IGW per VPC and it is free. For an instance to actually reach the internet you need four things: the IGW attached, a 0.0.0.0/0 route to it in the subnet's route table, a public IP on the ENI, and security group plus NACL rules that allow the traffic. For IPv6 there is no NAT, so outbound-only access uses an egress-only internet gateway instead."</div>
</div>`,
          examples: [
            `# ---------- Create + attach (two separate steps - people forget the second) ----------
IGW=$(aws ec2 create-internet-gateway \\
        --tag-specifications 'ResourceType=internet-gateway,Tags=[{Key=Name,Value=prod-igw}]' \\
        --query 'InternetGateway.InternetGatewayId' --output text)
aws ec2 attach-internet-gateway --internet-gateway-id $IGW --vpc-id vpc-0a1b2c3d

# Verify the attachment actually exists and is "available"
aws ec2 describe-internet-gateways --internet-gateway-ids $IGW \\
  --query 'InternetGateways[].Attachments'
# [[{"State": "available", "VpcId": "vpc-0a1b2c3d"}]]

# ---------- Then, and only then, the route ----------
aws ec2 create-route --route-table-id rtb-public \\
  --destination-cidr-block 0.0.0.0/0 --gateway-id $IGW

# ---------- Proof that the IGW does 1:1 NAT ----------
# Inside a public EC2 instance with public IP 52.66.10.20:
#   $ ip -4 addr show dev ens5 | grep inet
#       inet 10.0.1.25/24 ...           <- ONLY the private IP exists in the OS
#   $ curl -s https://checkip.amazonaws.com
#       52.66.10.20                     <- the IGW rewrote the source address
# Read your own public IP from IMDSv2, never from the OS:
#   TOKEN=$(curl -sX PUT http://169.254.169.254/latest/api/token \\
#             -H "X-aws-ec2-metadata-token-ttl-seconds: 300")
#   curl -s -H "X-aws-ec2-metadata-token: $TOKEN" \\
#        http://169.254.169.254/latest/meta-data/public-ipv4

# ---------- The 4-point checklist as commands ----------
# 1) IGW attached?
aws ec2 describe-internet-gateways --filters Name=attachment.vpc-id,Values=vpc-0a1b2c3d
# 2) Route present and active?
aws ec2 describe-route-tables --route-table-ids rtb-public \\
  --query 'RouteTables[].Routes[?DestinationCidrBlock==\`0.0.0.0/0\`]'
# 3) Public IP on the ENI?
aws ec2 describe-instances --instance-ids i-0abc \\
  --query 'Reservations[].Instances[].{Priv:PrivateIpAddress,Pub:PublicIpAddress,Subnet:SubnetId}'
# 4) SG + NACL allow it? (NACL is stateless - check BOTH directions)
aws ec2 describe-network-acls --filters Name=association.subnet-id,Values=subnet-pub1a

# ---------- IPv6: egress-only internet gateway (free, outbound only) ----------
EIGW=$(aws ec2 create-egress-only-internet-gateway --vpc-id vpc-0a1b2c3d \\
        --query 'EgressOnlyInternetGateway.EgressOnlyInternetGatewayId' --output text)
aws ec2 create-route --route-table-id rtb-private1a \\
  --destination-ipv6-cidr-block ::/0 --egress-only-internet-gateway-id $EIGW`,
          ],
          questions: [
            {
              question: "You attached an internet gateway but instances still cannot reach the internet. Walk through the checks.",
              solution: "<p>Four things must all be true. <strong>(1)</strong> The IGW is not just created but <strong>attached</strong> to the VPC and in state <code>available</code>. <strong>(2)</strong> The <strong>route table associated with that specific subnet</strong> has <code>0.0.0.0/0 → igw-xxx</code> — check the subnet's actual association, not the main table. <strong>(3)</strong> The instance's ENI has a <strong>public IPv4 or Elastic IP</strong>; if <code>MapPublicIpOnLaunch</code> was off, it has none and cannot be given one after launch except via an EIP. <strong>(4)</strong> The <strong>security group allows the outbound</strong> traffic and the <strong>NACL allows both directions</strong>, including the ephemeral return range 1024-65535. Failures present as timeouts, so use <strong>Reachability Analyzer</strong> to get the blocking component named directly.</p>",
            },
            {
              question: "Why does ip addr inside a public EC2 instance show only a private IP?",
              solution: "<p>Because the public IPv4 address is never configured on the instance. The <strong>internet gateway performs one-to-one NAT</strong>: outbound packets have their source rewritten from the private address to the public IP or Elastic IP, and inbound packets have their destination rewritten back. The OS only ever sees <code>10.0.1.25</code>. Two practical consequences: never hardcode the public IP into the OS network configuration (it will break the interface), and read your own public address from <strong>IMDS</strong> (<code>/latest/meta-data/public-ipv4</code>) rather than from the interface. IPv6 behaves differently — those addresses are globally routable and appear directly on the interface with no translation.</p>",
            },
            {
              question: "How many internet gateways can a VPC have, and does an IGW cost anything?",
              solution: "<p><strong>One.</strong> A VPC can have at most one internet gateway attached, and an IGW can be attached to at most one VPC at a time — there is no notion of several doors to size or load-balance, because the IGW is horizontally scaled and redundant by design with no bandwidth limits. It is also <strong>free</strong>: you pay only standard data-transfer-out charges. When people say internet access in a VPC is expensive they mean the <strong>NAT gateway</strong>, which charges both an hourly rate and a per-GB processing fee on top of transfer. Note you cannot detach an IGW while any instance in the VPC still holds a public IP or EIP.</p>",
            },
            {
              question: "Why can't you just use a normal internet gateway for outbound-only IPv6, and what do you use instead?",
              solution: "<p>Because <strong>IPv6 has no NAT in AWS</strong> — every IPv6 address assigned to an instance is globally routable. A private instance with a <code>::/0 → igw</code> route would therefore be directly reachable from the internet, with only security groups and NACLs standing between it and the world; the routing-level privacy that NAT gives IPv4 simply does not exist. The correct component is an <strong>egress-only internet gateway</strong>: it is stateful, allowing outbound IPv6 connections and their return traffic while dropping unsolicited inbound. Route it as <code>::/0 → eigw-xxx</code>. Unlike a NAT gateway it is <strong>free</strong> and VPC-wide rather than zonal.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html",
            "https://docs.aws.amazon.com/vpc/latest/userguide/egress-only-internet-gateway.html",
            "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-comparison.html",
          ],
        },
        {
          topic: "Public vs Private Subnets — and How Private Subnets Reach Out (NAT)",
          tags: ["aws", "vpc", "public-subnet", "private-subnet", "nat-gateway", "vpc-endpoints", "architecture"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  The single sentence to memorise: <strong>a subnet is public if and only if its route table has a route to an internet gateway.</strong> There is no attribute, no checkbox, no naming convention that makes it so. Everything else — public IPs, security groups, the word "public" in the Name tag — is decoration around that one routing fact.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The three flavours in practice</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Public subnet</strong> — <code>0.0.0.0/0 → igw</code>. Resources with public IPs here are reachable from the internet (subject to SGs/NACLs) and can reach out. Put <em>only</em> load balancers, NAT gateways, and bastion hosts here.</li>
  <li><strong>Private subnet</strong> — <code>0.0.0.0/0 → nat</code>. Outbound-only: instances can call APIs, download packages and reach the internet, but nothing on the internet can initiate a connection to them. This is where application servers belong.</li>
  <li><strong>Isolated subnet</strong> — only the <code>local</code> route. No internet in either direction at all. Databases live here; they talk to AWS services through <strong>VPC endpoints</strong>.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Two things that are NOT what makes a subnet public</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong><code>MapPublicIpOnLaunch</code></strong> — assigns a public IPv4 at launch. Without an IGW route, that address is inert: the instance is unreachable and cannot reach out, and (since Feb 2024) you are <em>still billed</em> for the address. A public IP on a private subnet is pure waste.</li>
  <li><strong>The Name tag</strong> — a subnet called <code>private-db-1a</code> with an IGW route in its route table is a <strong>public subnet with a misleading name</strong>. Always audit routes, never names.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">NAT gateway — how private subnets get outbound access</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>A managed, highly available (within its AZ) NAT service. It performs <strong>source NAT</strong>: many private IPs share the NAT's Elastic IP on the way out, and the NAT keeps a connection-tracking table so replies find their way home.</li>
  <li><strong>It lives in a PUBLIC subnet</strong> — this is the classic exam trip-up. The NAT itself needs an IGW route to reach the internet; the <em>private</em> subnet's route table then points <code>0.0.0.0/0</code> at the NAT.</li>
  <li>It needs an <strong>Elastic IP</strong>.</li>
  <li>It is <strong>zonal</strong>. One per AZ in production, so an AZ failure does not remove egress everywhere and traffic does not cross zones.</li>
  <li>It is <strong>outbound-only by construction</strong>: there is no way to port-forward inbound through it. For inbound, use a load balancer.</li>
  <li>It is <strong>the expensive one</strong>: roughly $0.045/hour plus ~$0.045 per GB processed (region-dependent), <em>on top of</em> data transfer. Three AZs of NAT costs ~$100/month before a single byte moves.</li>
  <li>Scales to 100 Gbps and 55,000 simultaneous connections <em>per unique destination</em>; the classic failure is <code>ErrorPortAllocation</code> when thousands of clients hammer one destination IP and port.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">NAT gateway vs NAT instance</h4>
<p style="line-height: 1.75;">A <strong>NAT instance</strong> is an EC2 instance doing NAT yourself — cheaper at small scale, but you patch it, you size it, you make it HA, and you must <strong>disable the source/destination check</strong> on its ENI (a favourite interview detail). It can also act as a bastion or do port forwarding, which a NAT gateway cannot. Default to the gateway; use an instance only for cost-sensitive dev environments or when you need those extra behaviours.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">VPC endpoints — the cheaper answer for AWS-bound traffic</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Gateway endpoints</strong> (S3 and DynamoDB only) are <strong>free</strong> and work by adding a <em>prefix-list route</em> to your route table. If your private instances mostly talk to S3, a gateway endpoint can cut the NAT bill dramatically.</li>
  <li><strong>Interface endpoints (PrivateLink)</strong> put an ENI with a private IP in your subnet for almost any AWS service; charged per hour per AZ plus per GB, but usually still cheaper than NAT and they keep traffic off the internet entirely.</li>
  <li>Design rule: <strong>NAT is for the public internet; endpoints are for AWS services.</strong></li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "The only real difference is the route table: a public subnet has 0.0.0.0/0 pointing at an internet gateway, a private one does not. Auto-assign public IP and the subnet's name have nothing to do with it. Private subnets get outbound-only access through a NAT gateway, which itself must sit in a public subnet with an Elastic IP, and since it is zonal I run one per AZ with each AZ's private route table pointing at its own. NAT is billed hourly plus per GB, so for S3 and DynamoDB I use a free gateway endpoint and for other AWS services an interface endpoint, keeping NAT for genuine internet traffic. Databases go in isolated subnets with only the local route."</div>
</div>`,
          examples: [
            `# ---------- The canonical 3-tier wiring in one AZ ----------
# public-1a   rtb-public    : 10.0.0.0/16 -> local , 0.0.0.0/0 -> igw-abc
#                             holds: ALB nodes, nat-1a
# app-1a      rtb-private1a : 10.0.0.0/16 -> local , 0.0.0.0/0 -> nat-1a
#                             holds: EC2/ECS/EKS/Lambda ENIs
# data-1a     rtb-isolated  : 10.0.0.0/16 -> local
#                             holds: RDS, ElastiCache. No internet, ever.

# ---------- Build the NAT gateway (note: --subnet-id is the PUBLIC subnet) ----------
EIP=$(aws ec2 allocate-address --domain vpc --query AllocationId --output text)
NAT=$(aws ec2 create-nat-gateway --subnet-id subnet-pub1a --allocation-id $EIP \\
        --tag-specifications 'ResourceType=natgateway,Tags=[{Key=Name,Value=nat-1a}]' \\
        --query 'NatGateway.NatGatewayId' --output text)
aws ec2 wait nat-gateway-available --nat-gateway-ids $NAT
aws ec2 create-route --route-table-id rtb-private1a \\
  --destination-cidr-block 0.0.0.0/0 --nat-gateway-id $NAT

# ---------- Audit: is any subnet public that should not be? ----------
for RT in $(aws ec2 describe-route-tables --filters Name=vpc-id,Values=vpc-0a1b2c3d \\
            --query 'RouteTables[].RouteTableId' --output text); do
  IGW=$(aws ec2 describe-route-tables --route-table-ids $RT \\
        --query 'RouteTables[].Routes[?GatewayId!=null]|[0][?starts_with(GatewayId,\`igw-\`)].GatewayId' --output text)
  SUBS=$(aws ec2 describe-route-tables --route-table-ids $RT \\
         --query 'RouteTables[].Associations[].SubnetId' --output text)
  [ -n "$IGW" ] && echo "PUBLIC via $IGW -> subnets: $SUBS"
done

# ---------- Free gateway endpoint for S3: instantly cuts the NAT bill ----------
aws ec2 create-vpc-endpoint --vpc-id vpc-0a1b2c3d \\
  --vpc-endpoint-type Gateway \\
  --service-name com.amazonaws.ap-south-1.s3 \\
  --route-table-ids rtb-private1a rtb-private1b rtb-private1c
# It adds a prefix-list route (pl-xxxx -> vpce-xxxx). S3 traffic now bypasses NAT.

# ---------- Interface endpoint for everything else (per-hour + per-GB, no internet) ----------
aws ec2 create-vpc-endpoint --vpc-id vpc-0a1b2c3d \\
  --vpc-endpoint-type Interface \\
  --service-name com.amazonaws.ap-south-1.secretsmanager \\
  --subnet-ids subnet-app1a subnet-app1b \\
  --security-group-ids sg-endpoints \\
  --private-dns-enabled
# Requires enableDnsHostnames + enableDnsSupport on the VPC, or private DNS silently no-ops.

# ---------- Is the NAT saturating? ----------
# CloudWatch metric: ErrorPortAllocation > 0  => >55k simultaneous connections to one
# destination IP:port. Fix = spread destinations, or add NAT gateways.`,
          ],
          questions: [
            {
              question: "What is the only real difference between a public and a private subnet?",
              solution: "<p><strong>The route table.</strong> A public subnet's associated route table contains a route to an <strong>internet gateway</strong> (normally <code>0.0.0.0/0 → igw-xxx</code>); a private subnet's does not. Everything else is circumstantial: <code>MapPublicIpOnLaunch</code> merely assigns a public IPv4 that is useless (and still billable) without an IGW route, and the Name tag is a convention that can be flatly wrong. When auditing an unfamiliar VPC, enumerate route tables and look for <code>igw-</code> targets rather than trusting names — a subnet called <code>private-db</code> with an IGW route is a public subnet.</p>",
            },
            {
              question: "Which subnet does a NAT gateway go in, and why?",
              solution: "<p>A NAT gateway goes in a <strong>public subnet</strong> — a subnet whose route table has a route to the internet gateway — and it needs an <strong>Elastic IP</strong>. The reason is that the NAT itself must be able to reach the internet in order to forward traffic on behalf of others; its own egress path is through the IGW. The <em>private</em> subnets then point <code>0.0.0.0/0</code> at the NAT gateway. Putting the NAT in a private subnet is the classic mistake: everything is created successfully, and every private instance times out, because the NAT has no path out itself.</p>",
            },
            {
              question: "How do you give a private instance internet access without a NAT gateway?",
              solution: "<p>Ask first whether it needs the <em>internet</em> or just <em>AWS services</em>. For S3 and DynamoDB, a <strong>gateway VPC endpoint</strong> is free and needs only a route-table entry. For most other AWS services, an <strong>interface endpoint (PrivateLink)</strong> places an ENI in your subnet — cheaper than NAT at moderate volume and the traffic never touches the internet. For package installs, host an internal mirror or use <strong>CodeArtifact</strong> behind an endpoint. If genuine internet access is required, the alternatives to a NAT gateway are a <strong>NAT instance</strong> (cheaper, but you own patching, sizing, HA, and must disable the source/destination check) or a proxy fleet. For IPv6, an <strong>egress-only internet gateway</strong> does the job for free.</p>",
            },
            {
              question: "Why is running one NAT gateway per AZ recommended, and what does it cost?",
              solution: "<p>A NAT gateway is a <strong>zonal</strong> resource. With one shared NAT, an AZ failure removes outbound access for <em>every</em> private subnet, and traffic from the other AZs crosses zone boundaries — billed in both directions. One NAT per AZ, with each AZ's private route table pointing at its own, removes both problems. The price is roughly <strong>$0.045/hour plus ~$0.045 per GB processed</strong> (region-dependent) <em>per gateway</em>, so three AZs is about $100/month before any traffic. That is why teams keep a NAT per AZ in production but often share a single one in dev — and why moving S3/ECR traffic onto VPC endpoints is usually the biggest single NAT saving available.</p>",
            },
            {
              question: "An instance in a private subnet has a public IP assigned. Can it reach the internet?",
              solution: "<p><strong>No.</strong> The public IP is inert because the subnet's route table has no route to an internet gateway — there is no path for the packet to take, and no IGW to perform the 1:1 NAT that a public address depends on. Worse, since AWS began charging for all public IPv4 addresses in February 2024, that useless address <strong>costs about $3.60/month</strong>. The instance can still reach the internet if the private subnet routes <code>0.0.0.0/0</code> to a <strong>NAT gateway</strong> — but that path uses the NAT's Elastic IP, not the instance's own public IP, which remains entirely unused. The fix is to turn off <code>MapPublicIpOnLaunch</code> on private subnets.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html#subnet-basics",
            "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html",
            "https://docs.aws.amazon.com/vpc/latest/privatelink/concepts.html",
          ],
        },
        {
          topic: "Default VPC vs Custom VPC",
          tags: ["aws", "vpc", "default-vpc", "custom-vpc", "security", "best-practices"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Every AWS account gets a <strong>default VPC in every region</strong>, pre-built so that a beginner can launch an instance and reach it over SSH within two minutes. That convenience is exactly why it is wrong for production: <strong>everything in it is public by default.</strong>
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What the default VPC comes with</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>CIDR <code>172.31.0.0/16</code> — <strong>identical in every region and every account</strong>.</li>
  <li>A <strong>/20 subnet in every AZ</strong> (4,096 addresses each), all of them public.</li>
  <li>An <strong>internet gateway</strong>, attached.</li>
  <li>A <strong>main route table with <code>0.0.0.0/0 → igw</code></strong>, and the subnets associated with it.</li>
  <li><code>MapPublicIpOnLaunch = true</code> on every subnet — every instance gets a public IP automatically.</li>
  <li><code>enableDnsSupport</code> and <code>enableDnsHostnames</code> both <strong>true</strong>.</li>
  <li>A default security group (all outbound, inbound only from itself) and a default NACL (allow all, both ways).</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Why production uses a custom VPC</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>No private subnets.</strong> There is no tier separation at all — databases would sit in the same public subnets as web servers.</li>
  <li><strong>Guaranteed CIDR collisions.</strong> Because every default VPC is <code>172.31.0.0/16</code>, you cannot peer two of them, ever. Any merger, partner integration or multi-account architecture hits this wall.</li>
  <li><strong>Public by default is the wrong default.</strong> A mistyped security group in a default VPC exposes an instance to the internet immediately; in a private subnet it does not.</li>
  <li><strong>No IP planning.</strong> /20 subnets fixed by AWS, no room for a considered layout.</li>
  <li><strong>Hard to express as code.</strong> Your infrastructure should be reproducible in Terraform/CloudFormation; the default VPC is a pre-existing snowflake.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">When the default VPC is fine</h4>
<p style="line-height: 1.75;">Quick experiments, a throwaway tutorial instance, a sandbox account, or a personal learning environment. It is genuinely useful for what it is designed for. Just never let it carry production data.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Deleting and recreating it</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>You <strong>can</strong> delete a default VPC, and many organisations do so in every region as a baseline hardening step (often enforced by a Config rule or a Control Tower guardrail, because an unused default VPC in an unwatched region is a classic place for crypto-mining instances to appear).</li>
  <li>You can get it back: <code>aws ec2 create-default-vpc</code> rebuilds it with the standard layout — so deleting it is reversible, which removes most of the fear.</li>
  <li>Some old services assumed a default VPC exists; modern ones ask you for subnets explicitly.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The "default" traps in naming</h4>
<p style="line-height: 1.75;">Three different things are called default and they are unrelated: the <strong>default VPC</strong> (the pre-built network), the <strong>default subnet</strong> (its pre-built public subnets), and the <strong>default security group</strong> (which exists in <em>every</em> VPC, including custom ones, cannot be deleted, and allows all traffic between members of itself). Do not use the default security group for workloads — create purpose-named ones so that intent is visible in the rules.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Every account gets a default VPC per region: 172.31.0.0/16, a public /20 subnet in every AZ, an attached internet gateway, a main route table with a default route to it, and auto-assign public IP switched on. It exists so you can launch an instance and reach it immediately. It is wrong for production for three reasons: there are no private subnets so there is no tier separation, every instance is public by default, and the CIDR is identical in every account and region so you can never peer two of them. Production uses a custom VPC with a planned CIDR, public/private/isolated subnets across AZs, and everything defined in Terraform. Deleting default VPCs in unused regions is standard hardening, and create-default-vpc brings one back if needed."</div>
</div>`,
          examples: [
            `# ---------- Find the default VPC in this region ----------
aws ec2 describe-vpcs --filters Name=isDefault,Values=true \\
  --query 'Vpcs[].{VpcId:VpcId,CIDR:CidrBlock}' --output table
# | vpc-0f9e8d7c | 172.31.0.0/16 |      <- the SAME CIDR in every account, every region

aws ec2 describe-subnets --filters Name=vpc-id,Values=vpc-0f9e8d7c \\
  --query 'Subnets[].{AZ:AvailabilityZone,CIDR:CidrBlock,Default:DefaultForAz,AutoPubIP:MapPublicIpOnLaunch}' \\
  --output table
# every row: /20, DefaultForAz true, AutoPubIP TRUE  -> all public

# ---------- Audit every region for default VPCs (the usual hardening finding) ----------
for R in $(aws ec2 describe-regions --query 'Regions[].RegionName' --output text); do
  V=$(aws ec2 describe-vpcs --region $R --filters Name=isDefault,Values=true \\
      --query 'Vpcs[0].VpcId' --output text 2>/dev/null)
  [ "$V" != "None" ] && echo "$R has default VPC $V"
done

# ---------- Delete one (dependencies must go first) ----------
# aws ec2 delete-subnet --subnet-id <each default subnet>
# aws ec2 detach-internet-gateway --internet-gateway-id igw-x --vpc-id vpc-0f9e8d7c
# aws ec2 delete-internet-gateway --internet-gateway-id igw-x
# aws ec2 delete-vpc --vpc-id vpc-0f9e8d7c

# ---------- ...and get it back if you ever need it ----------
aws ec2 create-default-vpc     # rebuilds the full standard layout

# ---------- The default SECURITY GROUP exists in custom VPCs too, and you cannot delete it ----------
aws ec2 describe-security-groups \\
  --filters Name=vpc-id,Values=vpc-0a1b2c3d Name=group-name,Values=default \\
  --query 'SecurityGroups[].IpPermissions'
# [[{"IpProtocol":"-1","UserIdGroupPairs":[{"GroupId":"sg-self"}]}]]
# i.e. "anything, from anyone else using this same SG". Fine as a placeholder,
# wrong as a workload SG - create named SGs so intent is readable.

# ---------- CIDR collision this causes, concretely ----------
# Account A default VPC: 172.31.0.0/16
# Account B default VPC: 172.31.0.0/16
# aws ec2 create-vpc-peering-connection ...
#   -> InvalidVpcPeeringConnection: CIDR blocks overlap. Unfixable without rebuilding.`,
          ],
          questions: [
            {
              question: "What exactly does a default VPC come pre-configured with?",
              solution: "<p>CIDR <strong>172.31.0.0/16</strong>; one <strong>public /20 subnet in every Availability Zone</strong>, each marked <code>DefaultForAz</code>; an <strong>internet gateway attached</strong>; a <strong>main route table with <code>0.0.0.0/0 → igw</code></strong> that all those subnets use; <strong><code>MapPublicIpOnLaunch = true</code></strong> so every instance gets a public IP; both DNS attributes enabled; plus the usual default security group and permissive default NACL. The design goal is that <code>aws ec2 run-instances</code> with no networking arguments produces a reachable instance — which is also precisely why it is unsuitable for production.</p>",
            },
            {
              question: "Why can you never peer two default VPCs?",
              solution: "<p>Because every default VPC in every account and every region uses the identical CIDR block <strong>172.31.0.0/16</strong>, and <strong>VPC peering (and Transit Gateway) refuse overlapping CIDRs</strong> — with identical ranges there is no way to route a packet unambiguously. The failure appears as <code>InvalidVpcPeeringConnection: CIDR blocks overlap</code>, and there is no configuration that fixes it: you must rebuild one side in a non-overlapping custom VPC and migrate. This is the concrete reason organisations allocate ranges from a central plan or <strong>AWS IPAM</strong> from day one, and avoid 172.31.0.0/16 entirely in custom VPCs.</p>",
            },
            {
              question: "Should you delete the default VPC? What do you lose?",
              solution: "<p>In production and in any account under a security baseline, <strong>yes</strong> — deleting default VPCs in all regions is standard hardening, commonly enforced by AWS Config or a Control Tower guardrail. An unused default VPC in an unmonitored region is a favourite launch pad for crypto-mining instances after a credential leak, because everything in it is already internet-facing. What you lose is convenience: services and scripts that assume a default VPC will now require explicit subnet IDs, which is arguably an improvement. And the decision is reversible — <code>aws ec2 create-default-vpc</code> recreates the standard layout at any time.</p>",
            },
            {
              question: "A teammate says 'the default security group is safe because it denies everything inbound'. Are they right?",
              solution: "<p>Only half right, and the half they are missing matters. The default security group — which exists in <strong>every</strong> VPC including custom ones, and cannot be deleted — allows <strong>all traffic on all ports from any other ENI that is also a member of the same default security group</strong>, plus all outbound. So it is not a deny-all: it is a flat, fully-open internal network among everything that happens to use it, which is how a compromised web instance ends up with unrestricted access to a database. It is also unreadable as documentation, since the rules say nothing about intent. Create purpose-named security groups (<code>sg-alb</code>, <code>sg-app</code>, <code>sg-db</code>) and reference them by ID instead.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/vpc/latest/userguide/default-vpc.html",
            "https://docs.aws.amazon.com/vpc/latest/userguide/work-with-default-vpc.html",
            "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html#default-security-group",
          ],
        },
        {
          topic: "Elastic IP — A Static Public IPv4 You Own",
          tags: ["aws", "vpc", "elastic-ip", "public-ip", "eip", "cost", "nat-gateway"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  An <strong>Elastic IP (EIP)</strong> is a static public IPv4 address allocated to <em>your account</em> rather than to a resource. You can move it between instances, network interfaces and NAT gateways at will, which makes it the tool for "this address must not change".
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">EIP vs auto-assigned public IP</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Auto-assigned public IP</strong> — handed out at launch from a shared AWS pool, tied to the instance's lifecycle. <strong>It changes</strong> on every stop/start (a stop deallocates it) and is lost on termination. Cannot be moved, cannot be reserved.</li>
  <li><strong>Elastic IP</strong> — allocated to your account, persists across stop/start and even across instance termination, and can be <strong>remapped to another instance in seconds</strong>. That remap is a legitimate failover technique.</li>
  <li>Both are implemented the same way underneath: the <strong>IGW does 1:1 NAT</strong>, so the OS still sees only the private address.</li>
  <li>A reboot never changes either — only a <strong>stop/start</strong> does, because that moves the instance to a different physical host.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Pricing — changed in 2024, and interviewers know it</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Since <strong>1 February 2024</strong>, AWS charges <strong>$0.005 per hour for every public IPv4 address</strong> — in use or not, Elastic IP or auto-assigned. That is about <strong>$3.60 per address per month</strong>.</li>
  <li>The old rule ("free while attached to a running instance, charged when idle") is gone. Idle EIPs are still charged — and remain the single most common piece of forgotten spend in an AWS account.</li>
  <li>Consequences worth stating: every NAT gateway carries an EIP, so NAT costs include an IPv4 charge; an ALB consumes public IPs per AZ; and turning <em>off</em> <code>MapPublicIpOnLaunch</code> in private subnets is now a direct saving.</li>
  <li>The strategic answer is <strong>IPv6</strong>, which has no such charge, plus VPC endpoints and NAT consolidation to reduce how many public addresses you need at all.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Limits and mechanics</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>5 EIPs per region per account</strong> by default (raisable via a quota increase).</li>
  <li>An EIP attaches to a <strong>network interface</strong>, not really to an instance — which is why you can pre-create an ENI with an EIP and attach it to whichever instance is currently primary.</li>
  <li>Releasing an EIP returns it to the pool and <strong>you will probably never get it back</strong>. If DNS or a partner firewall references it, releasing is effectively irreversible.</li>
  <li><strong>BYOIP</strong> lets you bring your own publicly routable range into AWS and allocate EIPs from it — the standard answer when a customer's allowlist is tied to addresses you already own.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">When you actually need one — and when you don't</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Need it:</strong> a <strong>NAT gateway</strong> (mandatory); a partner or customer firewall that allowlists your outbound source IP; an appliance whose address is baked into external configuration; a fast manual failover by remapping.</li>
  <li><strong>Don't need it:</strong> web servers behind a load balancer (target them by private IP); anything addressed by DNS — use <strong>Route 53</strong> with a health check instead, which is more flexible and scales past one address; and autoscaling fleets, where per-instance static addresses make no sense.</li>
  <li>An EIP on every instance is a smell: it usually means the architecture is missing a load balancer.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "An Elastic IP is a static public IPv4 allocated to my account rather than to an instance, so it survives stop/start and termination and can be remapped to another ENI in seconds. An auto-assigned public IP comes from a shared pool and changes whenever the instance is stopped and started. Both work through the internet gateway doing one-to-one NAT, so the OS only ever sees the private address. Since February 2024 AWS charges roughly $3.60 a month for every public IPv4, attached or idle, so unused EIPs are pure waste. I use EIPs where the address genuinely must be stable — NAT gateways, partner allowlists — and otherwise put instances behind a load balancer and point Route 53 at it."</div>
</div>`,
          examples: [
            `# ---------- Allocate, associate, move ----------
ALLOC=$(aws ec2 allocate-address --domain vpc --query AllocationId --output text)
aws ec2 associate-address --allocation-id $ALLOC --instance-id i-0abc
# Failover: point the same address at a standby instance in seconds
aws ec2 associate-address --allocation-id $ALLOC --instance-id i-0def --allow-reassociation

# Attach to a specific ENI instead (more precise, works with multi-ENI instances)
aws ec2 associate-address --allocation-id $ALLOC --network-interface-id eni-0abc

# ---------- Find idle EIPs: the classic forgotten bill (~$3.60/mo each) ----------
aws ec2 describe-addresses \\
  --query 'Addresses[?AssociationId==\`null\`].{IP:PublicIp,Alloc:AllocationId,Name:Tags[?Key==\`Name\`]|[0].Value}' \\
  --output table
# Release them - but check DNS and partner allowlists first, you will not get the IP back.
# aws ec2 release-address --allocation-id eipalloc-0123

# ---------- Everything holding a public IPv4 in this account/region ----------
aws ec2 describe-addresses \\
  --query 'Addresses[].{IP:PublicIp,InstanceId:InstanceId,ENI:NetworkInterfaceId,NAT:NetworkInterfaceOwnerId}' \\
  --output table

# ---------- Prove auto-assigned public IPs are not stable ----------
# aws ec2 stop-instances  --instance-ids i-0abc && aws ec2 wait instance-stopped  --instance-ids i-0abc
# aws ec2 start-instances --instance-ids i-0abc && aws ec2 wait instance-running  --instance-ids i-0abc
aws ec2 describe-instances --instance-ids i-0abc \\
  --query 'Reservations[].Instances[].PublicIpAddress'
# Different address than before. A REBOOT would not have changed it - only stop/start does.

# ---------- Stop paying for public IPs you never use ----------
aws ec2 modify-subnet-attribute --subnet-id subnet-app1a --no-map-public-ip-on-launch

# ---------- Which of my public IPv4s are actually costing money? ----------
# CloudWatch metric: AWS/EC2  "PublicIPv4Address" hours, or use Cost Explorer:
#   Service = EC2-Other, Usage type group = "EC2: IPv4 Address Charges"`,
          ],
          questions: [
            {
              question: "What is the difference between an Elastic IP and an auto-assigned public IP?",
              solution: "<p>An <strong>auto-assigned public IP</strong> comes from a shared AWS pool at launch, belongs to the instance's lifecycle, and is <strong>released on stop and lost on termination</strong> — restart the instance and the address is different. An <strong>Elastic IP</strong> is allocated to your <em>account</em>, survives stop/start and even termination, and can be <strong>remapped to a different ENI or instance in seconds</strong>, which makes it usable as a manual failover mechanism. Both are delivered identically at the network level: the internet gateway performs 1:1 NAT, so the instance's OS only ever sees its private address. Note a <em>reboot</em> changes neither — only a stop/start does, because that relocates the instance to a new host.</p>",
            },
            {
              question: "Are unused Elastic IPs free? Has that changed?",
              solution: "<p>No, and yes it changed. The old model charged only for <em>idle</em> EIPs. Since <strong>1 February 2024</strong> AWS charges <strong>$0.005 per hour for every public IPv4 address</strong> whether it is attached or not, Elastic or auto-assigned — roughly <strong>$3.60 per address per month</strong>. Idle EIPs are therefore still the most common forgotten spend, but the change also means an unused auto-assigned public IP on a private-subnet instance is pure waste, that every NAT gateway's EIP adds to its cost, and that ALBs carry per-AZ public IP charges. The structural mitigations are IPv6 (no such charge), VPC endpoints, and consolidating public entry points behind load balancers.</p>",
            },
            {
              question: "When should you NOT use an Elastic IP?",
              solution: "<p>Whenever a <strong>load balancer plus DNS</strong> would do the job — which is most of the time. Web and app servers should sit in private subnets behind an ALB/NLB, addressed by the load balancer's DNS name; giving each instance a static public address defeats scaling, adds cost, and widens the attack surface. For failover, <strong>Route 53 with health checks</strong> is more flexible than remapping a single address, since it can shift traffic across AZs, regions and multiple endpoints. Autoscaling groups in particular should never hand out EIPs — the default limit is 5 per region and there is no sensible mapping from a per-instance static IP to an elastic fleet. Reserve EIPs for NAT gateways, partner IP allowlists, and appliances whose address is baked into external configuration.</p>",
            },
            {
              question: "A partner will only accept traffic from a fixed set of source IPs. How do you architect that?",
              solution: "<p>Route the outbound traffic through a component with a <strong>stable Elastic IP</strong> and give the partner that address. In practice: put the workload in private subnets and send <code>0.0.0.0/0</code> to <strong>NAT gateways</strong>, each with its own EIP, then allowlist every NAT's EIP — one per AZ, so hand over all of them since any AZ may be the source. If you need the addresses to survive a region rebuild or a provider migration, use <strong>BYOIP</strong> to bring a range you own into AWS and allocate the EIPs from it. For inbound, the analogous answer is a <strong>Network Load Balancer</strong>, which can be given static Elastic IPs per subnet, unlike an ALB.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html",
            "https://aws.amazon.com/blogs/aws/new-aws-public-ipv4-address-charge-public-ip-insights/",
            "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-byoip.html",
          ],
        },
        {
          topic: "Security Groups — Stateful, Instance-Level Firewalls",
          tags: ["aws", "vpc", "security-group", "firewall", "stateful", "sg-referencing", "security"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  A <strong>security group</strong> is a virtual firewall attached to <strong>ENIs</strong> (not to subnets), and it is the primary network access control in AWS. Two properties define it: it is <strong>stateful</strong>, and it contains <strong>allow rules only</strong>.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Stateful — what that really means</h4>
<p style="line-height: 1.75;">The security group tracks connections. If an inbound request is allowed, <strong>its response is automatically allowed out</strong>, regardless of the outbound rules — and vice versa. So:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Allow inbound TCP 443, and the reply leaves fine even with zero outbound rules.</li>
  <li>Allow outbound TCP 443 to the internet, and the response comes back fine even with zero inbound rules. <em>This is why a private instance can call an API with no inbound rules at all.</em></li>
  <li>You never write rules for <strong>ephemeral ports</strong> in a security group. You do in a NACL. That contrast is the most-asked security group question there is.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Allow-only — there is no Deny</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>A security group cannot express "block this IP". If you need a block, you need a <strong>NACL</strong> (subnet-level), <strong>AWS Network Firewall</strong>, or <strong>WAF</strong> at the load balancer.</li>
  <li>Everything not explicitly allowed is denied. All rules are evaluated as a <strong>union</strong>: if an ENI has 3 security groups, the effective permission is the sum of all their allow rules — <strong>adding a security group can only ever widen access</strong>.</li>
  <li><strong>Defaults:</strong> a newly created security group has <strong>no inbound rules</strong> and <strong>allow-all outbound</strong>. The VPC's <em>default</em> security group instead allows all inbound from members of itself.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Rule anatomy</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Protocol</strong> (TCP/UDP/ICMP/all), <strong>port range</strong>, and <strong>source/destination</strong>.</li>
  <li>Source can be a <strong>CIDR</strong>, a <strong>prefix list</strong>, or — the powerful one — <strong>another security group's ID</strong>.</li>
  <li>Every rule has a <strong>description</strong> field. Use it. <code>"jira ticket NET-482, partner webhook"</code> six months later is worth more than any wiki.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Security group referencing — the pattern that matters</h4>
<p style="line-height: 1.75;">Instead of allowlisting IPs, allow <em>another security group</em>. The rule then means "any ENI carrying that security group", so it keeps working as instances scale, are replaced or move AZs — no IP maintenance at all:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><code>sg-alb</code>: inbound 443 from <code>0.0.0.0/0</code>.</li>
  <li><code>sg-app</code>: inbound 8080 <strong>from sg-alb</strong>.</li>
  <li><code>sg-db</code>: inbound 5432 <strong>from sg-app</strong>.</li>
</ul>
<p style="line-height: 1.75;">That chain is the canonical three-tier answer, and it also means the database is unreachable from anywhere except the app tier — no CIDR, however tight, achieves that as cleanly. (Referencing works across peered VPCs too, and cross-account, but not across regions.)</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Quotas and operational details</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>5 security groups per ENI</strong> by default (raisable to 16), <strong>60 inbound + 60 outbound rules</strong> per group. A rule referencing a group counts as one rule regardless of how many instances carry it.</li>
  <li><strong>Changes take effect immediately</strong> on existing ENIs — but be aware that for <em>established</em> connections, removing a rule does not always tear down the existing flow instantly.</li>
  <li>Security groups are <strong>VPC-scoped</strong>: you cannot attach one from another VPC.</li>
  <li>Deleting a security group requires that nothing references it — including other security groups' rules.</li>
  <li><strong>VPC Flow Logs</strong> record ACCEPT/REJECT per flow and are how you prove what a security group actually did.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "A security group is a stateful, allow-only firewall attached to ENIs. Stateful means return traffic is automatically permitted, so I never write ephemeral-port rules the way I would in a NACL. There is no deny rule — if I need to block a specific IP I use a NACL or Network Firewall — and because multiple groups on one ENI are evaluated as a union, adding a group can only widen access. The pattern I always reach for is security-group referencing: the ALB group allows 443 from the internet, the app group allows 8080 from the ALB group, and the database group allows 5432 from the app group. It scales automatically and needs no IP maintenance."</div>
</div>`,
          examples: [
            `# ---------- The three-tier chain, by reference not by IP ----------
ALB=$(aws ec2 create-security-group --group-name sg-alb --description "public ALB" \\
       --vpc-id vpc-0a1b2c3d --query GroupId --output text)
APP=$(aws ec2 create-security-group --group-name sg-app --description "app tier" \\
       --vpc-id vpc-0a1b2c3d --query GroupId --output text)
DB=$(aws ec2 create-security-group  --group-name sg-db  --description "postgres" \\
       --vpc-id vpc-0a1b2c3d --query GroupId --output text)

# ALB: 443 from the world (use a description on EVERY rule)
aws ec2 authorize-security-group-ingress --group-id $ALB \\
  --ip-permissions 'IpProtocol=tcp,FromPort=443,ToPort=443,IpRanges=[{CidrIp=0.0.0.0/0,Description="public https"}]'

# App: 8080 ONLY from anything wearing sg-alb
aws ec2 authorize-security-group-ingress --group-id $APP \\
  --ip-permissions "IpProtocol=tcp,FromPort=8080,ToPort=8080,UserIdGroupPairs=[{GroupId=$ALB,Description=\\"from ALB\\"}]"

# DB: 5432 ONLY from anything wearing sg-app
aws ec2 authorize-security-group-ingress --group-id $DB \\
  --ip-permissions "IpProtocol=tcp,FromPort=5432,ToPort=5432,UserIdGroupPairs=[{GroupId=$APP,Description=\\"from app\\"}]"

# No inbound rule is needed on sg-app for the RESPONSE to its outbound calls:
# security groups are stateful.

# ---------- Find the classic audit failures ----------
# 1) SSH or RDP open to the world
aws ec2 describe-security-groups --filters Name=vpc-id,Values=vpc-0a1b2c3d \\
  --query 'SecurityGroups[?IpPermissions[?(FromPort==\`22\` || FromPort==\`3389\`) &&
            IpRanges[?CidrIp==\`0.0.0.0/0\`]]].{SG:GroupId,Name:GroupName}' --output table

# 2) Unused security groups (nothing attached)
comm -23 <(aws ec2 describe-security-groups --query 'SecurityGroups[].GroupId' --output text | tr '\\t' '\\n' | sort) \\
         <(aws ec2 describe-network-interfaces --query 'NetworkInterfaces[].Groups[].GroupId' --output text | tr '\\t' '\\n' | sort -u)

# ---------- What is actually attached to this ENI, and what did it allow? ----------
aws ec2 describe-network-interfaces --network-interface-ids eni-0abc \\
  --query 'NetworkInterfaces[].Groups'

# Flow Logs tell you ACCEPT vs REJECT per flow - the ground truth
aws ec2 create-flow-logs --resource-type VPC --resource-ids vpc-0a1b2c3d \\
  --traffic-type ALL --log-destination-type cloud-watch-logs \\
  --log-group-name /vpc/flowlogs --deliver-logs-permission-arn arn:aws:iam::111122223333:role/flowlogs

# ---------- Terraform: reference groups, never hardcode IPs ----------
# resource "aws_security_group_rule" "db_from_app" {
#   type                     = "ingress"
#   from_port                = 5432
#   to_port                  = 5432
#   protocol                 = "tcp"
#   security_group_id        = aws_security_group.db.id
#   source_security_group_id = aws_security_group.app.id   # <- the whole point
#   description              = "postgres from app tier"
# }`,
          ],
          questions: [
            {
              question: "What does it mean that security groups are stateful, and what practical rule follows from it?",
              solution: "<p>The security group tracks connection state, so <strong>return traffic for an allowed connection is permitted automatically</strong> regardless of the rules in the other direction. Allow inbound on 443 and the response goes out even with no outbound rules; allow outbound on 443 and the response comes back even with no inbound rules. The practical rule that follows: <strong>you never write ephemeral-port rules in a security group</strong>. That is a NACL concern, because NACLs are stateless and evaluate each packet independently — which is why a NACL needs an explicit allow for the 1024-65535 return range while a security group does not. It also explains why a private instance with zero inbound rules can still call external APIs successfully.</p>",
            },
            {
              question: "Can a security group block a specific malicious IP address?",
              solution: "<p><strong>No.</strong> Security groups contain <strong>allow rules only</strong> — there is no deny construct, so you cannot carve an exception out of a broader allow. To block a specific source you need a layer that supports deny: a <strong>network ACL</strong> (subnet-level, stateless, numbered rules, supports DENY), <strong>AWS Network Firewall</strong> for stateful inspection and domain/IP blocking at scale, or <strong>AWS WAF</strong> with an IP set if the traffic arrives via an ALB, CloudFront or API Gateway. A related consequence of allow-only semantics: since rules from multiple attached groups are unioned, <strong>attaching another security group can only ever widen access</strong>, never restrict it.</p>",
            },
            {
              question: "Why reference a security group as a source instead of a CIDR block?",
              solution: "<p>Because the rule then means <em>\"any ENI carrying that security group\"</em>, which stays correct as instances scale out, get replaced, change IPs or move AZs — there is no IP list to maintain and no window where a new instance is denied. It also expresses intent: <code>sg-db</code> allowing 5432 from <code>sg-app</code> states that only the app tier may reach the database, something no CIDR can guarantee since any other workload in that range would also match. Operationally it is cheaper on quota too — one referencing rule covers any number of instances, against a 60-rule-per-group limit. Referencing works within a VPC, across peered VPCs and across accounts, but <strong>not across regions</strong>.</p>",
            },
            {
              question: "What are the default rules of a newly created security group versus the VPC's default security group?",
              solution: "<p>A <strong>newly created</strong> security group has <strong>no inbound rules at all</strong> (so nothing can initiate a connection to it) and <strong>allow-all outbound</strong>. The VPC's <strong>default</strong> security group is different: it allows <strong>all traffic inbound from any ENI that is also a member of that same group</strong>, plus all outbound. That self-referencing rule effectively creates a flat, unrestricted network among everything using it, which is why the default group should not be used for workloads — it is unreadable as documentation and lets a compromised web instance reach a database freely. It also exists in every VPC, including custom ones, and <strong>cannot be deleted</strong>.</p>",
            },
            {
              question: "An instance has three security groups attached. How are the rules combined?",
              solution: "<p>As a <strong>union</strong> — the effective permission set is every allow rule from all three groups added together, evaluated in no particular order (there are no rule numbers or precedence). Because there are no deny rules, <strong>attaching a group can only widen access</strong>: you cannot use a restrictive group to claw back what a permissive one granted. The default quota is <strong>5 security groups per ENI</strong> (raisable to 16) with 60 inbound and 60 outbound rules each. When debugging, look at every attached group together — and use <strong>VPC Flow Logs</strong> (ACCEPT/REJECT per flow) or <strong>Reachability Analyzer</strong> to find out which component actually blocked the traffic rather than reasoning about rules by eye.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html",
            "https://docs.aws.amazon.com/vpc/latest/userguide/security-group-rules.html",
            "https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html",
          ],
        },
        {
          topic: "Security Groups vs Network ACLs — The Two Firewall Layers",
          tags: ["aws", "vpc", "nacl", "security-group", "stateless", "ephemeral-ports", "defense-in-depth"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  A VPC gives you <strong>two independent firewall layers</strong>, and traffic must pass <em>both</em>. A <strong>network ACL (NACL)</strong> guards the <strong>subnet boundary</strong>; a <strong>security group</strong> guards the <strong>ENI</strong>. Understanding exactly how they differ is the most reliably asked VPC question in interviews.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The comparison table, memorised</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Level</strong> — SG: attached to an ENI (instance-level). NACL: attached to a subnet, applying to everything in it.</li>
  <li><strong>State</strong> — SG: <strong>stateful</strong> (return traffic auto-allowed). NACL: <strong>stateless</strong> (every packet judged on its own, so you must allow the return direction explicitly).</li>
  <li><strong>Rule types</strong> — SG: <strong>allow only</strong>. NACL: <strong>allow and deny</strong>.</li>
  <li><strong>Evaluation</strong> — SG: all rules in all attached groups, unioned, order irrelevant. NACL: <strong>numbered rules processed lowest-first, and the first match wins</strong> — later rules never run.</li>
  <li><strong>Defaults</strong> — new SG: no inbound, all outbound. <strong>Default NACL: allows everything both ways. A newly created custom NACL: denies everything both ways</strong> (the classic "I created a NACL and the world went dark" moment).</li>
  <li><strong>Quotas</strong> — SG: 60 inbound + 60 outbound rules, 5 SGs per ENI. NACL: 20 rules per direction by default (raisable to 40), 1 NACL per subnet.</li>
  <li><strong>Applies to</strong> — SG: only the ENIs it is attached to. NACL: <em>all</em> traffic crossing the subnet boundary, including from instances you do not control.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Ephemeral ports — the trap</h4>
<p style="line-height: 1.75;">Because a NACL is stateless, allowing inbound HTTPS is only half the configuration: the <strong>response leaves from the server's port 443 to the client's ephemeral port</strong>, so the NACL's <em>outbound</em> rules must allow <strong>TCP 1024-65535</strong>. The mirror case matters just as much: an instance making an outbound API call needs the NACL to allow <strong>inbound 1024-65535</strong> for the reply. Get this wrong and you see the signature symptom — <em>connections that hang and time out rather than being refused</em>. Ranges differ by OS (Linux typically 32768-60999, Windows 49152-65535, ELB 1024-65535), so the safe allow is <strong>1024-65535</strong>.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Rule numbering</h4>
<p style="line-height: 1.75;">NACL rules are evaluated from the lowest number up and <strong>stop at the first match</strong>. So a DENY at rule 50 beats an ALLOW at rule 100, but an ALLOW at 50 beats a DENY at 100. Leave gaps (100, 200, 300) so you can insert rules later. There is also an implicit final rule <code>*</code> that denies anything unmatched.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Which one do you actually use?</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Security groups do 95% of the work.</strong> They are stateful, reference each other, and express the application's real access graph.</li>
  <li><strong>Leave NACLs at the permissive default</strong> unless you have a specific reason — misconfigured NACLs cause a large share of the mysterious timeouts in AWS.</li>
  <li><strong>Reach for a NACL when you need what a security group cannot do:</strong> an explicit <strong>DENY</strong> (block a malicious IP or CIDR), or a <strong>blanket subnet-wide guardrail</strong> that applies to every instance regardless of which security groups someone attaches — for example, a database subnet NACL denying all traffic that did not come from the app subnet CIDR.</li>
  <li>Together they are <strong>defence in depth</strong>: a misconfigured security group is contained by the NACL, and vice versa.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Debugging with the difference in mind</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Connection refused</strong> → you reached the host; the application is not listening. Not a firewall problem.</li>
  <li><strong>Connection timeout</strong> → a packet was silently dropped: security group, NACL, routing, or the return path. Check the NACL's <em>other</em> direction.</li>
  <li><strong>Works one way only</strong> → almost always a stateless NACL missing the ephemeral-port return rule.</li>
  <li><strong>VPC Flow Logs</strong> show ACCEPT/REJECT per flow; a REJECT on the return leg points squarely at the NACL. <strong>Reachability Analyzer</strong> names the blocking component outright.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Security groups sit on the ENI and are stateful with allow-only rules evaluated as a union; NACLs sit on the subnet and are stateless with numbered allow and deny rules where the first match wins. Because a NACL is stateless I have to allow the return traffic explicitly on ephemeral ports 1024-65535, which is the single most common cause of connections that hang rather than fail fast. A default NACL allows everything, but a custom one denies everything until you add rules. In practice I do the real access control with security groups referencing each other, leave NACLs permissive, and add NACL rules only where I need an explicit deny or a subnet-wide guardrail."</div>
</div>`,
          examples: [
            `# ---------- Stateless in one picture: a web server on 443 in a subnet with a custom NACL ----------
# INBOUND rules                                      OUTBOUND rules
# 100 ALLOW tcp 443      0.0.0.0/0                   100 ALLOW tcp 1024-65535 0.0.0.0/0   <- THE RESPONSE
# 200 ALLOW tcp 1024-65535 0.0.0.0/0  <- replies to  200 ALLOW tcp 443        0.0.0.0/0   <- its own API calls
#                                        its outbound
#   * DENY  all                                        * DENY  all
# Omit inbound 100 -> nobody connects.
# Omit OUTBOUND 100 -> connections HANG and time out. The classic bug.
# A security group needs none of this: it is stateful.

# ---------- Create a NACL and remember: it starts DENY-ALL ----------
NACL=$(aws ec2 create-network-acl --vpc-id vpc-0a1b2c3d \\
        --query 'NetworkAcl.NetworkAclId' --output text)
# At this instant, associating it with a subnet blackholes that subnet entirely.

aws ec2 create-network-acl-entry --network-acl-id $NACL --rule-number 100 \\
  --protocol tcp --port-range From=443,To=443 --cidr-block 0.0.0.0/0 --rule-action allow --ingress
aws ec2 create-network-acl-entry --network-acl-id $NACL --rule-number 200 \\
  --protocol tcp --port-range From=1024,To=65535 --cidr-block 0.0.0.0/0 --rule-action allow --ingress
aws ec2 create-network-acl-entry --network-acl-id $NACL --rule-number 100 \\
  --protocol tcp --port-range From=1024,To=65535 --cidr-block 0.0.0.0/0 --rule-action allow --egress

# ---------- The thing only a NACL can do: an explicit DENY ----------
aws ec2 create-network-acl-entry --network-acl-id $NACL --rule-number 50 \\
  --protocol -1 --cidr-block 203.0.113.45/32 --rule-action deny --ingress
# Rule 50 < rule 100, and first match wins -> this IP is blocked even though 100 allows 443.
# A security group CANNOT express this at all.

# ---------- Inspect what a subnet is actually protected by ----------
aws ec2 describe-network-acls --filters Name=association.subnet-id,Values=subnet-app1a \\
  --query 'NetworkAcls[].Entries[].{N:RuleNumber,Dir:Egress,Action:RuleAction,Proto:Protocol,Ports:PortRange,CIDR:CidrBlock}' \\
  --output table

# ---------- Ground truth: did the packet get rejected, and in which direction? ----------
# Flow log line format:
# 2 111122223333 eni-0abc 203.0.113.9 10.0.1.25 43122 443 6 10 840 1700000000 1700000060 ACCEPT OK
# 2 111122223333 eni-0abc 10.0.1.25 203.0.113.9 443 43122 6 8  600 1700000000 1700000060 REJECT OK
#                                   ^ the RETURN leg rejected = stateless NACL, missing egress rule

aws ec2 start-network-insights-analysis --network-insights-path-id nip-0123
# ExplanationCode e.g. "ACL_RULE_MISMATCH" / "SECURITY_GROUP_RULE_MISMATCH" - names the culprit.`,
          ],
          questions: [
            {
              question: "Give the four key differences between a security group and a NACL.",
              solution: "<p><strong>(1) Level:</strong> a security group attaches to an <strong>ENI</strong>; a NACL attaches to a <strong>subnet</strong> and applies to everything in it. <strong>(2) State:</strong> security groups are <strong>stateful</strong> — return traffic is automatically allowed; NACLs are <strong>stateless</strong>, so each direction must be permitted explicitly, including ephemeral return ports. <strong>(3) Rule types:</strong> security groups support <strong>allow only</strong>; NACLs support <strong>allow and deny</strong>. <strong>(4) Evaluation:</strong> all security group rules across all attached groups are unioned with no ordering; NACL rules are <strong>numbered and evaluated lowest-first with the first match winning</strong>. A useful fifth: a new security group denies inbound while a <em>new custom</em> NACL denies everything in both directions, though the <em>default</em> NACL allows everything.</p>",
            },
            {
              question: "Why do you need to allow ephemeral ports in a NACL but never in a security group?",
              solution: "<p>Because NACLs are <strong>stateless</strong>: every packet is evaluated independently, with no memory of the connection it belongs to. A client connecting to your server on 443 sources the request from a high-numbered <strong>ephemeral port</strong>, and the server's reply travels from 443 <em>to that ephemeral port</em> — a separate packet the NACL judges on its own, so the <strong>outbound rules must allow TCP 1024-65535</strong>. The same applies in reverse for outbound calls, whose replies arrive inbound on ephemeral ports. Security groups are <strong>stateful</strong>, so they track the connection and permit the return automatically. Allow <strong>1024-65535</strong> to cover all cases, since Linux, Windows and ELB use different sub-ranges.</p>",
            },
            {
              question: "A NACL has rule 100 ALLOW tcp/443 from 0.0.0.0/0 and rule 50 DENY all from 203.0.113.45/32. Can that IP reach port 443?",
              solution: "<p><strong>No.</strong> NACL rules are evaluated in ascending rule-number order and <strong>the first match wins</strong> — evaluation stops there, so rule 100 is never consulted for that source. Reverse the numbers (DENY at 150, ALLOW at 100) and the same IP <em>would</em> get through, because the ALLOW matches first. This is the practical reason to number rules in gaps of 100 so that specific DENY entries can be inserted below broad ALLOWs later. It is also exactly the capability security groups lack: with allow-only, unioned rules, there is no way to carve an exception out of <code>0.0.0.0/0</code>.</p>",
            },
            {
              question: "You add a custom NACL to a working subnet and everything immediately breaks. Why?",
              solution: "<p>Because a <strong>newly created custom NACL denies all traffic in both directions</strong> — it ships with only the implicit <code>*</code> deny rule, unlike the <strong>default</strong> NACL, which allows everything. The moment you associate it with a subnet, every flow in and out is blackholed. The recovery is to re-associate the subnet with the default NACL (or add the needed allow rules), and the lesson is to write and review the full rule set — <em>both</em> directions, including the ephemeral 1024-65535 return range — before associating. It is also why the general advice is to leave NACLs permissive and do access control with security groups, reserving NACLs for explicit denies and subnet-wide guardrails.</p>",
            },
            {
              question: "A connection times out rather than being refused. What does that tell you?",
              solution: "<p>That a packet is being <strong>silently dropped</strong> somewhere, which is firewall or routing behaviour — 'connection refused' would instead mean the packet arrived and the host actively rejected it (nothing listening on that port), which is an application problem, not a network one. For a timeout, check in order: the <strong>security group</strong> on the destination ENI, the <strong>NACL on both subnets and both directions</strong> (the return leg with ephemeral ports is the usual culprit), the <strong>route table</strong> on each side including blackholed routes, and whether the target is even running. <strong>VPC Flow Logs</strong> will show a REJECT and tell you which leg failed; <strong>Reachability Analyzer</strong> will name the exact blocking component.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html",
            "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-comparison.html",
            "https://docs.aws.amazon.com/vpc/latest/userguide/nacl-ephemeral-ports.html",
          ],
        },
        {
          topic: "Putting It Together — Building and Debugging a Two-Tier VPC",
          tags: ["aws", "vpc", "architecture", "troubleshooting", "flow-logs", "reachability-analyzer", "interview"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Interviews rarely ask the definitions on their own — they ask you to <strong>build a VPC out loud</strong> or to <strong>debug one that does not work</strong>. Both come down to the same ordered mental model, because every component depends on the ones before it.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The build order (say it in this order and you cannot go wrong)</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>1. VPC</strong> with a planned, non-overlapping CIDR — <code>10.0.0.0/16</code>. Enable DNS hostnames.</li>
  <li><strong>2. Subnets</strong>, one set per AZ across at least two AZs: small public (<code>/24</code>), large private app (<code>/20</code>), private data (<code>/24</code>).</li>
  <li><strong>3. Internet gateway</strong>, created <em>and attached</em>.</li>
  <li><strong>4. Route tables</strong>: <code>public-rt</code> with <code>0.0.0.0/0 → igw</code> associated to the public subnets; one <code>private-rt</code> per AZ; an isolated table for data. Explicitly associate every subnet.</li>
  <li><strong>5. NAT gateway per AZ</strong> in the public subnets, each with an Elastic IP; point each private route table at its own.</li>
  <li><strong>6. Security groups</strong> chained by reference: <code>sg-alb</code> ← internet:443, <code>sg-app</code> ← sg-alb:8080, <code>sg-db</code> ← sg-app:5432.</li>
  <li><strong>7. VPC endpoints</strong> — a free gateway endpoint for S3 (and DynamoDB), interface endpoints for the services you call often, so that AWS traffic bypasses the NAT.</li>
  <li><strong>8. Observability</strong> — VPC Flow Logs to CloudWatch or S3 from day one. You cannot debug what you did not record.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The debugging ladder</h4>
<p style="line-height: 1.75;">When something cannot reach something else, walk these in order. Each layer is cheap to check and the first failure explains everything downstream:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Is it a timeout or a refusal?</strong> Refused = you reached the host, the app is not listening. Timeout = a packet was dropped; continue down the ladder.</li>
  <li><strong>Routing</strong> — does the source subnet's route table have a path to the destination, and is the route <code>active</code> rather than <code>blackhole</code>? Is the return path routable too?</li>
  <li><strong>Security group on the destination</strong> — is the port allowed, and from the right source (CIDR or referenced SG)?</li>
  <li><strong>Security group on the source</strong> — outbound is allow-all by default, but people lock it down and forget.</li>
  <li><strong>NACLs on both subnets, both directions</strong> — the stateless layer, and the ephemeral 1024-65535 return range is the usual culprit.</li>
  <li><strong>Public IP / NAT</strong> — for internet destinations: does the instance have a public IP, or does the private route table point at a healthy NAT in a public subnet?</li>
  <li><strong>DNS</strong> — is <code>enableDnsSupport</code>/<code>enableDnsHostnames</code> on? Does the name resolve to a private endpoint IP as expected?</li>
  <li><strong>The application</strong> — is the process bound to <code>0.0.0.0</code> rather than <code>127.0.0.1</code>, and is the host firewall (iptables/firewalld) open?</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The two tools that replace guessing</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>VPC Flow Logs</strong> — per-flow records with ACCEPT/REJECT, source, destination, ports and the ENI. They tell you whether packets arrived, and which leg was rejected. Note they capture metadata, not payloads, and they do not record DNS-to-Route-53-Resolver traffic or IMDS traffic.</li>
  <li><strong>Reachability Analyzer</strong> — a static analysis of your configuration that either traces the full path hop by hop or names the exact blocking component with a code like <code>ACL_RULE_MISMATCH</code> or <code>NO_ROUTE_TO_DESTINATION</code>. It needs nothing deployed and no packets sent, which makes it the fastest first move in a real incident.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Five mistakes that account for most broken VPCs</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>IGW created but <strong>never attached</strong>, or attached but <strong>no route added</strong>.</li>
  <li><strong>NAT gateway placed in a private subnet</strong> — it needs to be in a public one.</li>
  <li>A <strong>custom NACL</strong> associated before its rules exist, or missing the ephemeral return range.</li>
  <li>An <strong>IGW route in the main route table</strong>, silently making every unassociated subnet public.</li>
  <li><strong>Subnets sized too small</strong>, then discovering the CIDR is immutable when EKS pods or ALB nodes exhaust the IPs.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "I build in dependency order: VPC with a planned /16, subnets per AZ in public/app/data tiers, internet gateway attached, route tables explicitly associated, a NAT gateway per AZ with an Elastic IP, security groups chained by reference, VPC endpoints for S3 so AWS traffic skips the NAT, and Flow Logs from day one. To debug I first ask whether it is a timeout or a refusal — a refusal means the app is not listening, a timeout means something dropped the packet — then walk routing, destination security group, source security group, NACLs in both directions, NAT or public IP, DNS, and finally the application binding. Reachability Analyzer will usually name the blocking component in one call, and Flow Logs show which leg was rejected."</div>
</div>`,
          examples: [
            `# ================= A complete two-AZ VPC, end to end =================
VPC=$(aws ec2 create-vpc --cidr-block 10.0.0.0/16 \\
      --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=demo}]' \\
      --query Vpc.VpcId --output text)
aws ec2 modify-vpc-attribute --vpc-id $VPC --enable-dns-hostnames

# 2. Subnets: public + private in two AZs
PUB_A=$(aws ec2 create-subnet --vpc-id $VPC --cidr-block 10.0.0.0/24  --availability-zone ap-south-1a --query Subnet.SubnetId --output text)
PUB_B=$(aws ec2 create-subnet --vpc-id $VPC --cidr-block 10.0.1.0/24  --availability-zone ap-south-1b --query Subnet.SubnetId --output text)
APP_A=$(aws ec2 create-subnet --vpc-id $VPC --cidr-block 10.0.16.0/20 --availability-zone ap-south-1a --query Subnet.SubnetId --output text)
APP_B=$(aws ec2 create-subnet --vpc-id $VPC --cidr-block 10.0.32.0/20 --availability-zone ap-south-1b --query Subnet.SubnetId --output text)
aws ec2 modify-subnet-attribute --subnet-id $PUB_A --map-public-ip-on-launch
aws ec2 modify-subnet-attribute --subnet-id $PUB_B --map-public-ip-on-launch

# 3. IGW: create AND attach
IGW=$(aws ec2 create-internet-gateway --query InternetGateway.InternetGatewayId --output text)
aws ec2 attach-internet-gateway --internet-gateway-id $IGW --vpc-id $VPC

# 4. Public route table, explicitly associated
PUB_RT=$(aws ec2 create-route-table --vpc-id $VPC --query RouteTable.RouteTableId --output text)
aws ec2 create-route --route-table-id $PUB_RT --destination-cidr-block 0.0.0.0/0 --gateway-id $IGW
aws ec2 associate-route-table --route-table-id $PUB_RT --subnet-id $PUB_A
aws ec2 associate-route-table --route-table-id $PUB_RT --subnet-id $PUB_B

# 5. One NAT per AZ -> one private route table per AZ
for AZ in A B; do
  eval PUB=\\$PUB_$AZ; eval APP=\\$APP_$AZ
  EIP=$(aws ec2 allocate-address --domain vpc --query AllocationId --output text)
  NAT=$(aws ec2 create-nat-gateway --subnet-id $PUB --allocation-id $EIP --query NatGateway.NatGatewayId --output text)
  aws ec2 wait nat-gateway-available --nat-gateway-ids $NAT
  RT=$(aws ec2 create-route-table --vpc-id $VPC --query RouteTable.RouteTableId --output text)
  aws ec2 create-route --route-table-id $RT --destination-cidr-block 0.0.0.0/0 --nat-gateway-id $NAT
  aws ec2 associate-route-table --route-table-id $RT --subnet-id $APP
done

# 7. Free S3 gateway endpoint so app traffic to S3 bypasses the NAT bill
aws ec2 create-vpc-endpoint --vpc-id $VPC --vpc-endpoint-type Gateway \\
  --service-name com.amazonaws.ap-south-1.s3 --route-table-ids $(aws ec2 describe-route-tables \\
    --filters Name=vpc-id,Values=$VPC --query 'RouteTables[].RouteTableId' --output text)

# 8. Flow Logs from day one
aws ec2 create-flow-logs --resource-type VPC --resource-ids $VPC --traffic-type ALL \\
  --log-destination-type s3 --log-destination arn:aws:s3:::my-flowlogs-bucket

# ================= Debugging: let AWS find the blocker =================
PATH_ID=$(aws ec2 create-network-insights-path --source i-0app --destination i-0db \\
          --protocol tcp --destination-port 5432 \\
          --query NetworkInsightsPath.NetworkInsightsPathId --output text)
AN=$(aws ec2 start-network-insights-analysis --network-insights-path-id $PATH_ID \\
     --query NetworkInsightsAnalysis.NetworkInsightsAnalysisId --output text)
aws ec2 describe-network-insights-analyses --network-insights-analysis-ids $AN \\
  --query 'NetworkInsightsAnalyses[].{Reachable:NetworkPathFound,Why:Explanations[].ExplanationCode}'
# {"Reachable": false, "Why": ["SECURITY_GROUP_RULE_MISMATCH"]}   <- no guessing required

# Flow Logs query (CloudWatch Logs Insights): who is being rejected?
# fields @timestamp, srcAddr, dstAddr, dstPort, action
# | filter action = "REJECT"
# | stats count(*) by srcAddr, dstAddr, dstPort
# | sort count desc`,
          ],
          questions: [
            {
              question: "Walk me through building a VPC for a public web tier and a private database.",
              solution: "<p>In dependency order: <strong>(1)</strong> a VPC with a planned non-overlapping CIDR such as <code>10.0.0.0/16</code>, DNS hostnames enabled. <strong>(2)</strong> Subnets in at least two AZs — a small public <code>/24</code> per AZ and a private <code>/20</code> per AZ. <strong>(3)</strong> An internet gateway, created <em>and attached</em>. <strong>(4)</strong> A public route table with <code>0.0.0.0/0 → igw</code>, explicitly associated with the public subnets, and a separate private route table per AZ. <strong>(5)</strong> A NAT gateway per AZ in the public subnets with an Elastic IP, each private table routing <code>0.0.0.0/0</code> to its own. <strong>(6)</strong> Security groups chained by reference — ALB allows 443 from the internet, app allows 8080 from the ALB group, database allows 5432 from the app group. <strong>(7)</strong> A free S3 gateway endpoint so app traffic bypasses NAT, plus interface endpoints for other AWS services. <strong>(8)</strong> VPC Flow Logs enabled from the start. The ALB goes in the public subnets, the app and database in private ones.</p>",
            },
            {
              question: "An EC2 instance in a private subnet cannot reach the internet. How do you diagnose it?",
              solution: "<p>Walk the layers in order. <strong>Route table:</strong> does the <em>private</em> subnet's associated table have <code>0.0.0.0/0 → nat-xxx</code>, and is that route <code>active</code> rather than <code>blackhole</code> (a recreated NAT gets a new id)? <strong>NAT placement:</strong> is the NAT gateway in a <em>public</em> subnet whose route table points at the IGW, with an Elastic IP and state <code>available</code>? <strong>Security group:</strong> does the instance allow the outbound traffic — outbound is allow-all by default, but often tightened. <strong>NACL:</strong> both subnets, both directions, including inbound <code>1024-65535</code> for return traffic. <strong>DNS:</strong> if it fails only by hostname, check <code>enableDnsSupport</code>. The fastest single move is <strong>Reachability Analyzer</strong>, which names the blocking component directly; <strong>Flow Logs</strong> then confirm which leg was rejected.</p>",
            },
            {
              question: "What is the difference between a 'connection refused' and a 'connection timed out' when debugging in a VPC?",
              solution: "<p><strong>Refused</strong> means your packet reached the destination host and the host actively sent back a TCP RST — nothing is listening on that port, or the application is bound to <code>127.0.0.1</code> instead of <code>0.0.0.0</code>. Routing, security groups and NACLs are all working; this is an <em>application</em> problem. <strong>Timed out</strong> means the packet vanished with no reply, which is what a firewall or routing drop looks like: a security group with no matching allow, a stateless NACL missing the return rule, a blackholed or absent route, or a missing NAT/public IP. Making that distinction first saves you from auditing security groups when the real issue is a service that never started.</p>",
            },
            {
              question: "What are VPC Flow Logs and what can they not tell you?",
              solution: "<p>Flow Logs record <strong>metadata for IP flows</strong> at the VPC, subnet or ENI level — source and destination addresses and ports, protocol, packet and byte counts, the ENI, and crucially <strong>ACCEPT or REJECT</strong> — delivered to CloudWatch Logs, S3 or Kinesis Data Firehose. They are the ground truth for whether traffic arrived and which direction was blocked. What they cannot tell you: <strong>packet contents</strong> (no payloads — for that you need Traffic Mirroring), <em>why</em> a flow was rejected (they name no rule), and they omit some traffic entirely, including DNS queries to the Amazon-provided resolver, instance metadata (<code>169.254.169.254</code>) traffic, DHCP, and Windows license activation. Delivery is also near-real-time, not instant, with aggregation windows of a minute or more.</p>",
            },
            {
              question: "Name the most common VPC misconfigurations you have seen.",
              solution: "<p><strong>(1)</strong> An internet gateway created but never <strong>attached</strong>, or attached with no <code>0.0.0.0/0</code> route added. <strong>(2)</strong> A <strong>NAT gateway placed in a private subnet</strong>, which creates successfully and then fails every request, because the NAT itself has no route out. <strong>(3)</strong> A <strong>custom NACL</strong> associated before its rules exist (it defaults to deny-all), or one missing the ephemeral <code>1024-65535</code> return range — producing hangs rather than clean failures. <strong>(4)</strong> An <strong>IGW route in the main route table</strong>, silently making every subnet that was never explicitly associated public, including database subnets. <strong>(5)</strong> <strong>Subnets sized too small</strong> — then discovering that a subnet's CIDR is immutable when EKS pods or ALB nodes exhaust the addresses. Honourable mention: a single shared NAT gateway across three AZs, which is both a single point of failure and a cross-AZ data transfer bill.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-example-private-subnets-nat.html",
            "https://docs.aws.amazon.com/vpc/latest/reachability/getting-started.html",
            "https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs-records-examples.html",
          ],
        },
        {
          topic: "Network ACL — The Stateless, Subnet-Level Firewall",
          tags: ["aws", "vpc", "nacl", "stateless", "ephemeral-ports", "deny-rules", "security"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  A <strong>Network ACL</strong> is a firewall that sits at the <strong>subnet boundary</strong>. Every packet entering or leaving a subnet is checked against it, regardless of which instance sent it and regardless of which security groups are attached. Two properties define it, and both are the opposite of a security group: it is <strong>stateless</strong>, and it supports <strong>both ALLOW and DENY</strong> rules.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Stateless — the property everything else follows from</h4>
<p style="line-height: 1.75;">A NACL has no connection tracking table. It sees individual packets and judges each one against the rules for the direction it is travelling. A single TCP conversation therefore crosses the NACL <strong>twice, in two different rule sets</strong>:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Client <code>203.0.113.9:51234</code> → server <code>10.0.1.25:443</code> — matched against <strong>inbound</strong> rules.</li>
  <li>Server <code>10.0.1.25:443</code> → client <code>203.0.113.9:51234</code> — matched against <strong>outbound</strong> rules, where the destination port is the client's <strong>ephemeral port</strong>.</li>
</ul>
<p style="line-height: 1.75;">So allowing inbound 443 is only half a configuration. You must also allow <strong>outbound TCP 1024-65535</strong> or the response is silently dropped and the client hangs until it times out. The mirror case is just as common: an instance making an outbound API call needs <strong>inbound 1024-65535</strong> allowed for the reply to get back in.</p>
<p style="line-height: 1.75;">Ephemeral ranges differ by client: Linux kernels typically use <strong>32768-60999</strong>, Windows <strong>49152-65535</strong>, NAT gateways and Elastic Load Balancers <strong>1024-65535</strong>. Because you rarely control who is calling, the safe allow is the widest: <strong>1024-65535</strong>.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Rule numbering: first match wins</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Rules are numbered <strong>1-32766</strong> and evaluated in <strong>ascending order</strong>. The <strong>first match ends evaluation</strong> — later rules are never consulted.</li>
  <li>A DENY at rule 50 beats an ALLOW at 100. An ALLOW at 50 beats a DENY at 100. <strong>Order is the logic</strong>, unlike security groups where order is meaningless.</li>
  <li>Every NACL ends with an un-editable <code>*</code> rule that <strong>DENYs everything unmatched</strong>, in both directions.</li>
  <li>Number in gaps of 100 so you can slot a specific DENY below a broad ALLOW later without renumbering.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The two NACLs you will meet</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>The default NACL</strong> (created with the VPC) has rule 100 ALLOW all inbound and rule 100 ALLOW all outbound. It is wide open on purpose, so that security groups are the only thing you have to reason about.</li>
  <li><strong>A newly created custom NACL</strong> has <em>only</em> the <code>*</code> DENY rules. Associating it with a subnet <strong>blackholes that subnet instantly</strong> — the single most common self-inflicted VPC outage.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Rules, limits and scope</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>One NACL per subnet</strong>; one NACL can be associated with many subnets. Every subnet has one — the VPC's default if you never attach another.</li>
  <li><strong>20 rules per direction</strong> by default (raisable to 40, and the quota counts inbound and outbound separately). That ceiling is low, which is another reason not to build fine-grained policy here.</li>
  <li>A rule specifies rule number, protocol, port range, source (inbound) or destination (outbound) CIDR, and ALLOW/DENY. <strong>You cannot reference a security group</strong> — CIDRs only. This is a major expressiveness gap versus security groups.</li>
  <li>Changes apply <strong>immediately</strong> to all traffic crossing the subnet boundary.</li>
  <li>NACLs do <strong>not</strong> filter traffic between two instances <em>inside the same subnet</em> — that traffic never crosses the boundary. Only security groups can separate same-subnet peers.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">When a NACL is the right tool</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Explicit DENY of a specific IP or CIDR</strong> — the thing a security group fundamentally cannot express. Blocking an abusive scanner at the subnet edge is the canonical use.</li>
  <li><strong>A subnet-wide guardrail</strong> that holds no matter what security groups someone attaches later. Example: a database subnet whose NACL denies everything that did not originate from the app subnet CIDR, so a misconfigured SG cannot expose it.</li>
  <li><strong>Compliance separation of duties</strong> — a network team owns NACLs while application teams own their own security groups.</li>
  <li><strong>Blocking an entire protocol or port range</strong> across a tier in one place instead of editing dozens of security groups.</li>
</ul>
<p style="line-height: 1.75;">Outside those cases, leave NACLs at the permissive default. Fine-grained NACL policy is where mysterious, intermittent, hard-to-attribute timeouts come from.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "A NACL is a stateless firewall at the subnet boundary that supports both allow and deny rules, numbered and evaluated lowest-first with the first match winning and an implicit deny at the end. Stateless means every packet is judged alone, so I must allow the return direction explicitly — ephemeral ports 1024-65535 — and forgetting that is the classic cause of connections that hang instead of failing fast. The default NACL allows everything; a newly created custom one denies everything, so associating it before writing rules takes the subnet down. I do real access control with security groups and use NACLs only for what they uniquely offer: an explicit deny of a bad IP, or a subnet-wide guardrail that survives whatever security groups someone attaches."</div>
</div>`,
          examples: [
            `# ---------- A working NACL for a subnet serving HTTPS and making outbound calls ----------
# INBOUND                                           OUTBOUND
# 100 ALLOW tcp 443       0.0.0.0/0  (requests)     100 ALLOW tcp 1024-65535 0.0.0.0/0 (responses)
# 200 ALLOW tcp 1024-65535 0.0.0.0/0 (its own       200 ALLOW tcp 443        0.0.0.0/0 (its own
#                                     API replies)                                      API calls)
# 300 ALLOW tcp 22        10.0.0.0/16 (bastion)     300 ALLOW tcp 5432       10.0.64.0/24 (to DB)
#   * DENY  all                                       * DENY  all
#
# Delete OUTBOUND 100 and every HTTPS request hangs, then times out.
# A security group needs none of these return rules - it is stateful.

# ---------- Create one. IT STARTS AS DENY-ALL. Write rules BEFORE associating. ----------
NACL=$(aws ec2 create-network-acl --vpc-id vpc-0a1b2c3d \\
        --tag-specifications 'ResourceType=network-acl,Tags=[{Key=Name,Value=app-nacl}]' \\
        --query 'NetworkAcl.NetworkAclId' --output text)

aws ec2 create-network-acl-entry --network-acl-id $NACL --ingress --rule-number 100 \\
  --protocol tcp --port-range From=443,To=443 --cidr-block 0.0.0.0/0 --rule-action allow
aws ec2 create-network-acl-entry --network-acl-id $NACL --ingress --rule-number 200 \\
  --protocol tcp --port-range From=1024,To=65535 --cidr-block 0.0.0.0/0 --rule-action allow
aws ec2 create-network-acl-entry --network-acl-id $NACL --egress --rule-number 100 \\
  --protocol tcp --port-range From=1024,To=65535 --cidr-block 0.0.0.0/0 --rule-action allow
aws ec2 create-network-acl-entry --network-acl-id $NACL --egress --rule-number 200 \\
  --protocol tcp --port-range From=443,To=443 --cidr-block 0.0.0.0/0 --rule-action allow

# Only now is it safe to associate (needs the CURRENT association id, not the subnet id)
ASSOC=$(aws ec2 describe-network-acls --filters Name=association.subnet-id,Values=subnet-app1a \\
        --query 'NetworkAcls[].Associations[?SubnetId==\`subnet-app1a\`].NetworkAclAssociationId' --output text)
aws ec2 replace-network-acl-association --association-id $ASSOC --network-acl-id $NACL

# ---------- The thing ONLY a NACL can do: block a specific attacker ----------
aws ec2 create-network-acl-entry --network-acl-id $NACL --ingress --rule-number 50 \\
  --protocol -1 --cidr-block 203.0.113.45/32 --rule-action deny
# 50 < 100, first match wins -> blocked even though rule 100 allows 443 from everywhere.
# No security group can express this: SGs are allow-only.

# ---------- Read a NACL the way the engine reads it: sorted by rule number ----------
aws ec2 describe-network-acls --network-acl-ids $NACL \\
  --query 'NetworkAcls[].Entries[?Egress==\`false\`]|[0]|sort_by(@,&RuleNumber)[].{N:RuleNumber,Action:RuleAction,Proto:Protocol,Ports:PortRange,CIDR:CidrBlock}' \\
  --output table

# ---------- Emergency: put a subnet back on the permissive default NACL ----------
DEF=$(aws ec2 describe-network-acls --filters Name=vpc-id,Values=vpc-0a1b2c3d Name=default,Values=true \\
      --query 'NetworkAcls[0].NetworkAclId' --output text)
aws ec2 replace-network-acl-association --association-id $ASSOC --network-acl-id $DEF`,
          ],
          questions: [
            {
              question: "Why does a NACL need ephemeral port rules and what range do you allow?",
              solution: "<p>Because a NACL is <strong>stateless</strong>: it keeps no connection table, so the request packet and the response packet are two unrelated events judged against two different rule sets. A client connects from a high-numbered <strong>ephemeral port</strong> to your server on 443, and the server's reply travels from 443 <em>to that ephemeral port</em> — an outbound packet that the outbound rules must explicitly allow. Ranges vary by client: Linux typically 32768-60999, Windows 49152-65535, NAT gateways and ELB 1024-65535. Since you rarely control the caller, allow <strong>TCP 1024-65535</strong> in the return direction. Security groups need none of this because they are stateful.</p>",
            },
            {
              question: "A NACL has 100 ALLOW tcp/443 from 0.0.0.0/0 and 200 DENY all from 203.0.113.45/32. Is that IP blocked?",
              solution: "<p><strong>No</strong> — not on port 443. NACL rules are evaluated in <strong>ascending rule-number order and the first match wins</strong>, so a request from 203.0.113.45 to port 443 matches rule 100 first, is allowed, and rule 200 is never reached. The deny only takes effect for traffic that rule 100 does not match, such as other ports. To actually block that address you must number the DENY <em>below</em> the ALLOW — for example rule 50. This is the opposite of security group behaviour, where all rules are unioned and order is meaningless, and it is why NACL rules are conventionally spaced by 100.</p>",
            },
            {
              question: "What happens the moment you associate a freshly created custom NACL with a busy subnet?",
              solution: "<p>The subnet goes dark. A newly created NACL contains <strong>only the implicit <code>*</code> DENY rules</strong> in both directions — unlike the <em>default</em> NACL, which allows everything. Every existing and new flow is dropped instantly, in both directions, for every instance in the subnet. The recovery is to <code>replace-network-acl-association</code> back to the default NACL (note you replace by <em>association id</em>, not subnet id), or to add the missing allow rules. The discipline that prevents it: write the complete rule set — both directions, including the ephemeral 1024-65535 return range — <strong>before</strong> associating anything.</p>",
            },
            {
              question: "Can a NACL stop two instances in the same subnet from talking to each other?",
              solution: "<p><strong>No.</strong> A NACL only inspects traffic that <strong>crosses the subnet boundary</strong>. Two ENIs in the same subnet communicate directly via the VPC's local routing and never cross that boundary, so no NACL rule — not even an explicit deny — applies. Only <strong>security groups</strong> can separate same-subnet peers, since they are enforced at the ENI. This is a good argument for keeping tiers in separate subnets when you want NACL-level guardrails, and a reminder that the NACL is a coarse perimeter control while the security group is the real access-control mechanism.</p>",
            },
            {
              question: "How many rules can a NACL have, and can a rule reference a security group?",
              solution: "<p>The default quota is <strong>20 rules per direction</strong> (inbound and outbound counted separately), raisable to <strong>40</strong> — with a caveat that going to 40 can affect network performance. Rule numbers run 1-32766. And <strong>no, a NACL rule cannot reference a security group or a prefix list</strong>: sources and destinations are plain CIDR blocks only. That is a significant expressiveness gap — the security-group-referencing pattern (<code>sg-db</code> allows 5432 from <code>sg-app</code>) has no NACL equivalent, so NACL policy has to be written against IP ranges and re-checked whenever subnets change. Both facts point the same way: keep NACLs coarse, do fine-grained policy in security groups.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html",
            "https://docs.aws.amazon.com/vpc/latest/userguide/nacl-ephemeral-ports.html",
            "https://docs.aws.amazon.com/vpc/latest/userguide/amazon-vpc-limits.html#vpc-limits-nacls",
          ],
        },
        {
          topic: "Security Group vs NACL — The #1 Asked VPC Comparison",
          tags: ["aws", "vpc", "security-group", "nacl", "comparison", "defense-in-depth", "interview"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Traffic in a VPC passes through <strong>two independent filters</strong>, and it must be permitted by <strong>both</strong>. Knowing the difference cold — and, more importantly, knowing <em>which one to reach for</em> — is the most reliably asked VPC question there is.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The table, line by line</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Attaches to</strong> — SG: an <strong>ENI</strong> (so: instance-level, and it moves with the interface). NACL: a <strong>subnet</strong> (so: everything inside it, including resources other teams launch).</li>
  <li><strong>State</strong> — SG: <strong>stateful</strong>, return traffic auto-allowed. NACL: <strong>stateless</strong>, each packet judged alone, return direction must be allowed explicitly.</li>
  <li><strong>Rule types</strong> — SG: <strong>ALLOW only</strong>. NACL: <strong>ALLOW and DENY</strong>.</li>
  <li><strong>Evaluation</strong> — SG: every rule of every attached group is <strong>unioned</strong>; order is meaningless; most permissive wins. NACL: rules are <strong>numbered, processed lowest-first, first match wins</strong>, then an implicit deny.</li>
  <li><strong>Source/destination can be</strong> — SG: a CIDR, a <strong>prefix list</strong>, or <strong>another security group ID</strong>. NACL: <strong>CIDR only</strong>.</li>
  <li><strong>Defaults</strong> — new SG: no inbound, all outbound. Default VPC SG: all inbound <em>from itself</em>, all outbound. Default NACL: <strong>allow everything both ways</strong>. New custom NACL: <strong>deny everything both ways</strong>.</li>
  <li><strong>Quotas</strong> — SG: 60 inbound + 60 outbound rules, 5 SGs per ENI (raisable to 16). NACL: 20 rules per direction (raisable to 40), 1 NACL per subnet.</li>
  <li><strong>Same-subnet traffic</strong> — SG: <strong>filtered</strong>. NACL: <strong>not filtered</strong> (it never crosses the subnet boundary).</li>
  <li><strong>Ephemeral ports</strong> — SG: never think about them. NACL: always think about them.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The order traffic actually hits them</h4>
<p style="line-height: 1.75;">For a packet arriving from outside the subnet: <strong>route table → inbound NACL → inbound security group → instance</strong>. On the way back out: <strong>outbound security group (stateful: auto-allowed if it is a response) → outbound NACL → route table</strong>. Two consequences follow. First, a NACL rejection happens <em>before</em> the security group is consulted, so a packet blocked by a NACL is invisible in any instance-level logging. Second, in <strong>VPC Flow Logs</strong> a security group rejection shows up only on the inbound leg, whereas a NACL rejection can appear on either leg — a REJECT on the <em>return</em> leg is a near-certain fingerprint of a stateless NACL missing its ephemeral rule.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Which one do you use? (the answer they are listening for)</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Security groups do ~95% of real access control.</strong> They are stateful, they reference each other, and a chain of them (<code>sg-alb → sg-app → sg-db</code>) <em>is</em> a readable statement of the application's access graph.</li>
  <li><strong>Leave NACLs at the permissive default</strong> unless there is a specific reason. Hand-tuned NACLs are a leading cause of intermittent, hard-to-attribute timeouts.</li>
  <li><strong>Use a NACL for what an SG cannot do:</strong> an explicit <strong>DENY</strong> (block a scanner, block a CIDR), or a <strong>subnet-wide guardrail</strong> that holds regardless of which security groups get attached later.</li>
  <li>Together they are <strong>defence in depth</strong>: a mistake in one layer is contained by the other, and different teams can own each layer.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Beyond the two: when neither is enough</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>AWS Network Firewall</strong> — stateful inspection, domain-name filtering, Suricata-compatible IPS rules, centralised across a VPC or an Organization.</li>
  <li><strong>AWS WAF</strong> — layer-7 filtering at CloudFront, ALB or API Gateway (SQLi, XSS, rate limiting, IP sets).</li>
  <li><strong>Shield Advanced</strong> — managed DDoS protection.</li>
  <li>Security groups and NACLs are layer 3/4 only: neither can inspect a URL, a hostname, or a request body.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "A security group attaches to an ENI, is stateful, allow-only, and all attached groups are unioned with no ordering. A NACL attaches to a subnet, is stateless, supports allow and deny, and its numbered rules are evaluated lowest-first with the first match winning. Because the NACL is stateless I have to allow return traffic on ephemeral ports 1024-65535, and forgetting that gives you hangs rather than clean failures. Traffic hits the NACL before the security group inbound and after it outbound, which is why a REJECT on the return leg in Flow Logs points straight at the NACL. In practice I express the access graph with security groups referencing each other, leave NACLs permissive, and add NACL rules only for an explicit deny or a subnet-wide guardrail."</div>
</div>`,
          examples: [
            `# ---------- Same goal, two layers: "app tier can reach Postgres" ----------
# WITH SECURITY GROUPS (preferred): identity-based, stateful, self-maintaining
aws ec2 authorize-security-group-ingress --group-id sg-db \\
  --ip-permissions 'IpProtocol=tcp,FromPort=5432,ToPort=5432,UserIdGroupPairs=[{GroupId=sg-app,Description="from app tier"}]'
# That is the ENTIRE configuration. No return rule. No IP list. Survives scaling.

# WITH A NACL (coarser): CIDR-based, stateless, needs BOTH directions
# db subnet NACL, INBOUND : 100 ALLOW tcp 5432        from 10.0.16.0/20 (app CIDR)
# db subnet NACL, OUTBOUND: 100 ALLOW tcp 1024-65535  to   10.0.16.0/20 (the responses!)
# Miss the outbound rule and every query hangs. And it cannot say "from sg-app".

# ---------- What each layer can express that the other cannot ----------
# ONLY a NACL can DENY:
aws ec2 create-network-acl-entry --network-acl-id acl-0abc --ingress --rule-number 10 \\
  --protocol -1 --cidr-block 198.51.100.77/32 --rule-action deny
# ONLY a security group can reference an identity:
aws ec2 authorize-security-group-ingress --group-id sg-cache \\
  --ip-permissions 'IpProtocol=tcp,FromPort=6379,ToPort=6379,UserIdGroupPairs=[{GroupId=sg-app}]'
# ONLY a security group filters traffic between two instances in the SAME subnet.

# ---------- Reading the evidence in Flow Logs ----------
# Inbound leg rejected -> SG or inbound NACL blocked the request:
# 2 111122223333 eni-0app 10.0.16.9 10.0.64.5 51234 5432 6 5 300 ... REJECT OK
# RETURN leg rejected -> stateless NACL missing the ephemeral egress rule:
# 2 111122223333 eni-0db  10.0.64.5 10.0.16.9 5432 51234 6 5 300 ... REJECT OK
#                         ^ source is the DB, i.e. the response was dropped

# CloudWatch Logs Insights: split rejects by direction to tell the layers apart
# fields @timestamp, srcAddr, srcPort, dstAddr, dstPort, action
# | filter action = "REJECT"
# | stats count(*) by srcAddr, srcPort, dstAddr, dstPort

# ---------- Stop guessing: Reachability Analyzer names the layer ----------
aws ec2 start-network-insights-analysis --network-insights-path-id nip-0123 \\
  --query 'NetworkInsightsAnalysis.NetworkInsightsAnalysisId' --output text
aws ec2 describe-network-insights-analyses --network-insights-analysis-ids nia-0123 \\
  --query 'NetworkInsightsAnalyses[].{Found:NetworkPathFound,Codes:Explanations[].ExplanationCode}'
# "ACL_RULE_MISMATCH"            -> NACL
# "SECURITY_GROUP_RULE_MISMATCH" -> security group
# "NO_ROUTE_TO_DESTINATION"      -> route table, not a firewall at all`,
          ],
          questions: [
            {
              question: "Compare security groups and NACLs across the dimensions that matter.",
              solution: "<p><strong>Attachment:</strong> SG to an ENI, NACL to a subnet. <strong>State:</strong> SG stateful (returns auto-allowed), NACL stateless (both directions explicit, ephemeral ports included). <strong>Rule types:</strong> SG allow-only, NACL allow and deny. <strong>Evaluation:</strong> SG rules from all attached groups are unioned with no ordering; NACL rules are numbered and evaluated lowest-first, first match wins, then an implicit deny. <strong>Sources:</strong> an SG rule can reference a CIDR, a prefix list, or <em>another security group</em>; a NACL rule takes CIDRs only. <strong>Defaults:</strong> a new SG denies inbound and allows all outbound, the default NACL allows everything while a new custom NACL denies everything. <strong>Scope:</strong> SGs filter same-subnet traffic, NACLs do not, since that traffic never crosses the subnet boundary.</p>",
            },
            {
              question: "In what order does traffic hit these two layers, and why does that matter for debugging?",
              solution: "<p>Inbound to an instance: <strong>route table → inbound NACL → inbound security group → ENI</strong>. Outbound: <strong>security group (stateful, so responses are auto-permitted) → outbound NACL → route table</strong>. It matters twice over. First, a NACL drop occurs <em>before</em> the security group is ever consulted, so nothing on the instance — and no SG-level reasoning — will reveal it. Second, in <strong>VPC Flow Logs</strong>, a security group rejection appears on the request leg only, while a NACL rejection can appear on either leg; a <strong>REJECT whose source is your own server</strong> is the fingerprint of a stateless NACL that is dropping the response.</p>",
            },
            {
              question: "When would you actually add NACL rules rather than adjusting a security group?",
              solution: "<p>Three cases. <strong>(1) An explicit DENY</strong> — blocking a specific abusive IP or CIDR, which security groups cannot express at all because they are allow-only and unioned. <strong>(2) A subnet-wide guardrail</strong> that must hold regardless of what anyone attaches later — for example a database subnet NACL denying anything not sourced from the app subnet CIDR, so a mistaken security group cannot expose the tier. <strong>(3) Separation of duties</strong> — a central network team owning the subnet perimeter while application teams own their own security groups. Outside those, leave NACLs at the permissive default: hand-tuned NACLs are a leading source of intermittent timeouts, and their 20-rule-per-direction quota makes them a poor place for detailed policy.</p>",
            },
            {
              question: "A request reaches the server and the server responds, but the client still times out. Which layer is the prime suspect?",
              solution: "<p>The <strong>NACL</strong>, on the return path. Because it is stateless, the response is a fresh packet judged against the <em>outbound</em> rules, with the client's <strong>ephemeral port</strong> as its destination — so a missing <code>ALLOW tcp 1024-65535</code> outbound silently drops every reply while inbound requests continue to arrive normally. A security group could not cause this: it is stateful, so a permitted inbound connection's response is always allowed out. Confirm it in <strong>Flow Logs</strong> by looking for a REJECT whose <em>source</em> is your server and whose destination port is a high ephemeral number, or run <strong>Reachability Analyzer</strong>, which returns <code>ACL_RULE_MISMATCH</code> outright.</p>",
            },
            {
              question: "Can security groups or NACLs block traffic based on a URL path or hostname?",
              solution: "<p><strong>No.</strong> Both operate at <strong>layers 3 and 4</strong> — IP addresses, protocols and ports. Neither can see a Host header, a URL path, a TLS SNI value or a request body. For layer-7 control you need different tools: <strong>AWS WAF</strong> attached to CloudFront, an ALB or API Gateway for SQLi/XSS rules, IP sets, geo-matching and rate limiting; <strong>AWS Network Firewall</strong> for stateful inspection inside the VPC with domain-name allowlists and Suricata-compatible IPS rules; and <strong>Shield Advanced</strong> for managed DDoS response. A common production layout uses all of them: WAF at the edge, security groups for service-to-service access, Network Firewall for egress domain filtering, and NACLs as a coarse guardrail.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-comparison.html",
            "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html",
            "https://docs.aws.amazon.com/vpc/latest/reachability/explanation-codes.html",
          ],
        },
        {
          topic: "Route Table Association — Every Subnet Gets Exactly One",
          tags: ["aws", "vpc", "route-table", "association", "main-route-table", "networking"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>Association</strong> is the act of binding a route table to a subnet. It is a small idea with outsized consequences, because association is what turns an abstract set of routes into the actual behaviour of a subnet — and it is where "why is my database subnet public?" incidents come from.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The rules</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Every subnet is associated with exactly one route table.</strong> Never zero, never two.</li>
  <li>A route table can be associated with <strong>many subnets</strong>.</li>
  <li>If you never associate a subnet explicitly, it is <strong>implicitly associated with the VPC's main route table</strong>. There is no such thing as an unrouted subnet.</li>
  <li>Changing an association is atomic and takes effect <strong>immediately</strong> for new flows.</li>
  <li>An <strong>explicit</strong> association always wins over the implicit main-table fallback.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Main vs custom, and the trap</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Every VPC has exactly one <strong>main route table</strong>, created with the VPC, holding the un-deletable <code>local</code> route. You can change <em>which</em> table is main (<code>replace-route-table-association</code> with <code>--association-id</code> of the main association), but you cannot have zero.</li>
  <li>You cannot <strong>delete</strong> the main route table, and you cannot delete any route table that still has associations.</li>
  <li><strong>The trap:</strong> add <code>0.0.0.0/0 → igw</code> to the main route table and <em>every subnet nobody explicitly associated</em> becomes public — including subnets created later, by other people, for databases. Nothing warns you.</li>
  <li><strong>The discipline:</strong> leave the main route table with only the <code>local</code> route (or make the private/isolated table the main one, so accidents fail closed), and <strong>explicitly associate every subnet</strong> with a purpose-named table.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">How many route tables should you have?</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>One public table</strong>, shared by all public subnets — they all want the same <code>0.0.0.0/0 → igw</code>.</li>
  <li><strong>One private table per AZ</strong> — <em>not</em> one shared table — because each must point at that AZ's own NAT gateway. This is the single most common reason a VPC has more route tables than tiers.</li>
  <li><strong>One isolated table</strong> for data subnets, holding only <code>local</code> (plus gateway-endpoint prefix-list routes).</li>
  <li>So a three-AZ, three-tier VPC typically has <strong>five</strong> route tables: 1 public + 3 private + 1 isolated.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The other kind of association: gateway route tables</h4>
<p style="line-height: 1.75;">A route table can also be associated with a <strong>gateway</strong> — an internet gateway or a virtual private gateway — rather than a subnet. This is <strong>ingress routing</strong>, and it exists so that traffic <em>entering</em> the VPC can be forced through an inspection appliance (a firewall ENI or a Gateway Load Balancer endpoint) before it reaches the workload subnet. Association targets are therefore: a subnet, a gateway, or nothing.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Operational details worth knowing</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Quotas: <strong>200 route tables per VPC</strong>, <strong>50 routes per route table</strong> (raisable to 1,000 with caveats), and a subnet association is not separately capped beyond that.</li>
  <li><code>associate-route-table</code> creates a new association and returns an <strong>association id</strong>; <code>replace-route-table-association</code> moves an existing one and is what you use to change a subnet's table (or to change which table is main).</li>
  <li><code>disassociate-route-table</code> drops an explicit association, and the subnet silently falls back to the main table — a quiet way to change behaviour, so audit for it.</li>
  <li>Associations are the first thing to enumerate when you inherit an unfamiliar VPC: names lie, associations do not.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Every subnet is associated with exactly one route table — explicitly, or implicitly with the VPC's main route table if you never attach one. A table can serve many subnets, and an explicit association always overrides the main-table fallback. The practical rule I follow is to keep the main route table with only the local route and explicitly associate every subnet, because putting an internet gateway route in the main table silently makes every unassociated subnet public, including ones created later. A three-AZ three-tier VPC usually ends up with five tables: one public, one private per AZ so each points at its own NAT gateway, and one isolated table for the data tier."</div>
</div>`,
          examples: [
            `# ---------- Create an association (returns an association id you will need later) ----------
aws ec2 associate-route-table --route-table-id rtb-public --subnet-id subnet-pub1a
# {"AssociationId": "rtbassoc-0aaa111", "AssociationState": {"State": "associated"}}

# ---------- MOVE a subnet to a different table (replace, do not associate again) ----------
ASSOC=$(aws ec2 describe-route-tables --filters Name=association.subnet-id,Values=subnet-app1a \\
        --query 'RouteTables[].Associations[?SubnetId==\`subnet-app1a\`].RouteTableAssociationId' --output text)
aws ec2 replace-route-table-association --association-id $ASSOC --route-table-id rtb-private1a

# ---------- Change WHICH table is main (fail-closed pattern) ----------
MAIN_ASSOC=$(aws ec2 describe-route-tables --filters Name=vpc-id,Values=vpc-0a1b2c3d Name=association.main,Values=true \\
             --query 'RouteTables[].Associations[?Main==\`true\`].RouteTableAssociationId' --output text)
aws ec2 replace-route-table-association --association-id $MAIN_ASSOC --route-table-id rtb-isolated
# Now anything nobody associated defaults to NO internet, instead of inheriting one.

# ---------- THE AUDIT: which subnets fall through to main, and is main dangerous? ----------
aws ec2 describe-route-tables --filters Name=vpc-id,Values=vpc-0a1b2c3d \\
  --query 'RouteTables[].{RT:RouteTableId,
                          Name:Tags[?Key==\`Name\`]|[0].Value,
                          IsMain:Associations[?Main==\`true\`]|[0].Main,
                          Subnets:Associations[?SubnetId!=null].SubnetId,
                          HasIGW:Routes[?GatewayId!=null && starts_with(GatewayId,\`igw-\`)].GatewayId}' \\
  --output json

# Subnets with NO explicit association = silently using the main table
aws ec2 describe-subnets --filters Name=vpc-id,Values=vpc-0a1b2c3d --query 'Subnets[].SubnetId' --output text | tr '\\t' '\\n' | sort > /tmp/all
aws ec2 describe-route-tables --filters Name=vpc-id,Values=vpc-0a1b2c3d \\
  --query 'RouteTables[].Associations[].SubnetId' --output text | tr '\\t' '\\n' | grep -v '^$' | sort > /tmp/assoc
comm -23 /tmp/all /tmp/assoc     # <- these inherit whatever main does

# ---------- The five-table layout for a 3-AZ, 3-tier VPC ----------
# rtb-public     : local, 0.0.0.0/0 -> igw          <- subnet-pub1a/1b/1c
# rtb-private1a  : local, 0.0.0.0/0 -> nat-1a       <- subnet-app1a
# rtb-private1b  : local, 0.0.0.0/0 -> nat-1b       <- subnet-app1b
# rtb-private1c  : local, 0.0.0.0/0 -> nat-1c       <- subnet-app1c
# rtb-isolated   : local, pl-s3 -> vpce-s3          <- subnet-data1a/1b/1c

# ---------- Terraform: one association resource per subnet, always explicit ----------
# resource "aws_route_table_association" "app" {
#   count          = length(aws_subnet.app)
#   subnet_id      = aws_subnet.app[count.index].id
#   route_table_id = aws_route_table.private[count.index].id   # per-AZ table
# }`,
          ],
          questions: [
            {
              question: "Can a subnet have two route tables, or none?",
              solution: "<p>Neither. <strong>Every subnet is associated with exactly one route table</strong> — there is no way to attach two, and no way to have none. A subnet you never associate explicitly is <strong>implicitly associated with the VPC's main route table</strong>, so it always has routing behaviour from somewhere. A single route table, by contrast, can serve any number of subnets, which is normal for a set of public subnets sharing <code>0.0.0.0/0 → igw</code>. When you need a subnet to behave differently you <code>replace-route-table-association</code> rather than adding a second table.</p>",
            },
            {
              question: "What is the main route table and what is the danger with it?",
              solution: "<p>The <strong>main route table</strong> is created with the VPC, holds the un-deletable <code>local</code> route, and acts as the <strong>fallback for any subnet without an explicit association</strong>. The danger is that adding an internet gateway route to it <strong>silently makes every unassociated subnet public</strong> — including subnets created later by other people, for databases, with no warning and no error. The defensive practice is to leave the main table with only the local route and explicitly associate every subnet with a named table; some teams go further and make the <em>isolated</em> table the main one via <code>replace-route-table-association</code>, so that a forgotten association fails closed rather than open.</p>",
            },
            {
              question: "How many route tables does a three-AZ, three-tier VPC typically need, and why?",
              solution: "<p><strong>Five.</strong> One <strong>public</strong> table shared by all three public subnets, since they all want the same <code>0.0.0.0/0 → igw</code>. Then <strong>one private table per AZ</strong> — three of them — because each must send <code>0.0.0.0/0</code> to <em>that AZ's own NAT gateway</em>; sharing one table would force all AZs through a single NAT, creating a zonal single point of failure and cross-AZ data transfer charges in both directions. Finally one <strong>isolated</strong> table for the data subnets, holding only <code>local</code> plus any gateway-endpoint prefix-list routes. Per-AZ private tables are the reason route-table count usually exceeds tier count.</p>",
            },
            {
              question: "What is a gateway route table association?",
              solution: "<p>A route table can be associated with a <strong>gateway</strong> — an internet gateway or virtual private gateway — instead of a subnet. This is <strong>ingress routing</strong>: it lets you intercept traffic <em>entering</em> the VPC and steer it to an inspection appliance (a firewall ENI or a Gateway Load Balancer endpoint) before it reaches the workload subnet, rather than trusting every subnet to protect itself. The route entries target the appliance for the workload subnet CIDRs. So the full set of association targets is: a subnet, a gateway, or nothing — and the subnet case is the one you use daily.</p>",
            },
            {
              question: "You inherit an unfamiliar VPC. How do you determine which subnets are actually public?",
              solution: "<p>Ignore names entirely — a subnet tagged <code>private-db-1a</code> may well be public. Enumerate <strong>route tables and their associations</strong>: list every table, find the ones with a route whose target starts with <code>igw-</code>, and read off the subnets associated with them. Then close the gap: list all subnets, subtract the ones with an <strong>explicit</strong> association, and whatever remains is silently using the <strong>main route table</strong> — so check whether main has an IGW route too. Cross-check with <code>MapPublicIpOnLaunch</code> and with <code>describe-network-interfaces</code> for ENIs holding public IPs, since a public route plus a public IP is what actually creates exposure.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Route_Tables.html#RouteTableDetails",
            "https://docs.aws.amazon.com/vpc/latest/userguide/route-table-options.html",
            "https://docs.aws.amazon.com/vpc/latest/userguide/amazon-vpc-limits.html#vpc-limits-route-tables",
          ],
        },
        {
          topic: "NAT Gateway — Outbound-Only Internet for Private Subnets",
          tags: ["aws", "vpc", "nat-gateway", "private-subnet", "egress", "cost", "high-availability"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  A <strong>NAT gateway</strong> is a managed service that lets instances in a <strong>private subnet initiate outbound connections</strong> to the internet — to download packages, call third-party APIs, reach AWS service endpoints — while making it <strong>structurally impossible</strong> for anything on the internet to initiate a connection to them.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">How it works</h4>
<p style="line-height: 1.75;">It performs <strong>source NAT (SNAT) with port address translation</strong>. A packet leaving <code>10.0.16.9:51234</code> for <code>api.example.com:443</code> has its source rewritten to <code>&lt;NAT's Elastic IP&gt;:&lt;allocated port&gt;</code>. The NAT records that mapping in a connection-tracking table, and when the response comes back it rewrites the destination to the original private address. Many private instances share one public address. Because the mapping is only ever created by an <em>outbound</em> packet, an unsolicited inbound packet has no entry to match and is dropped — <strong>there is no port-forwarding feature to enable</strong>.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The placement rule everyone gets wrong once</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>The NAT gateway goes in a PUBLIC subnet</strong> — one whose route table has <code>0.0.0.0/0 → igw</code>. The NAT itself needs a path to the internet.</li>
  <li>The <strong>private</strong> subnet's route table then points <code>0.0.0.0/0 → nat-xxx</code>.</li>
  <li>Put the NAT in a private subnet and everything creates successfully, then every request times out. It is the classic exam trap.</li>
  <li>Never point a NAT gateway's own subnet's default route at itself — that is a routing loop.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Properties</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Zonal.</strong> It lives in one AZ and dies with it. Production pattern: <strong>one per AZ</strong>, each AZ's private route table pointing at its own.</li>
  <li><strong>Managed and redundant within its AZ</strong> — AWS patches and scales it; there is no instance to size.</li>
  <li><strong>Bandwidth:</strong> starts at 5 Gbps and scales automatically to <strong>100 Gbps</strong>.</li>
  <li><strong>Connections:</strong> up to <strong>55,000 simultaneous connections per unique destination</strong> (IP + port + protocol). Exceeding that raises <code>ErrorPortAllocation</code> — the signature failure when thousands of clients hammer one endpoint.</li>
  <li><strong>Needs an Elastic IP</strong> (public NAT gateway), which since Feb 2024 also carries the public IPv4 charge.</li>
  <li><strong>No security group.</strong> You cannot attach one to a NAT gateway — control egress with the private subnets' security groups and NACLs instead. (It does honour the NACL of the subnet it sits in.)</li>
  <li><strong>IPv4 only.</strong> IPv6 has no NAT; the equivalent is a free <strong>egress-only internet gateway</strong>.</li>
  <li><strong>Supports TCP, UDP and ICMP.</strong> It does not support IP fragments for UDP, and it times idle TCP connections out after <strong>350 seconds</strong> — long-lived idle connections need TCP keepalives below that, or you get inexplicable resets.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Cost — usually the second-biggest surprise on a VPC bill</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Roughly <strong>$0.045 per hour</strong> per gateway <em>plus</em> <strong>~$0.045 per GB processed</strong> (region-dependent), <strong>on top of</strong> normal data transfer out.</li>
  <li>Three AZs ≈ <strong>$100/month before a single byte moves</strong>.</li>
  <li>The per-GB charge applies to <em>all</em> traffic through it, including traffic to S3 and ECR that never needed to leave AWS.</li>
  <li><strong>The biggest single saving available:</strong> add a <strong>free S3/DynamoDB gateway endpoint</strong> and interface endpoints for ECR, Secrets Manager, CloudWatch and STS. In container-heavy accounts, image pulls alone often dominate NAT processing charges.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Private NAT gateway</h4>
<p style="line-height: 1.75;">Since 2021 there is also a <strong>private NAT gateway</strong>: no Elastic IP, no internet access. It SNATs to a private address, and exists to solve <strong>overlapping CIDRs</strong> when connecting to on-premises or partner networks over Transit Gateway, VPN or Direct Connect — the other side sees a single address from your NAT's subnet instead of your real, colliding ranges. Know it exists; it is the answer to "how do you connect two networks whose CIDRs overlap?"</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "A NAT gateway does source NAT with port translation so private instances can initiate outbound connections while nothing on the internet can initiate inbound — because the connection-tracking entry only ever gets created by an outbound packet, there is no port forwarding to enable. It must sit in a public subnet with an Elastic IP, and the private subnets route 0.0.0.0/0 to it. It is zonal, so I run one per AZ with per-AZ private route tables; it scales to 100 Gbps and 55,000 connections per unique destination, and you cannot attach a security group to it. The cost is hourly plus per-GB processed, so I always add a free S3 gateway endpoint and interface endpoints for ECR and Secrets Manager to keep AWS-bound traffic off it."</div>
</div>`,
          examples: [
            `# ---------- Build it: EIP -> NAT in a PUBLIC subnet -> route from the PRIVATE subnet ----------
EIP=$(aws ec2 allocate-address --domain vpc --query AllocationId --output text)
NAT=$(aws ec2 create-nat-gateway \\
        --subnet-id subnet-pub1a \\
        --allocation-id $EIP \\
        --tag-specifications 'ResourceType=natgateway,Tags=[{Key=Name,Value=nat-1a}]' \\
        --query 'NatGateway.NatGatewayId' --output text)
aws ec2 wait nat-gateway-available --nat-gateway-ids $NAT     # takes ~1-2 minutes

aws ec2 create-route --route-table-id rtb-private1a \\
  --destination-cidr-block 0.0.0.0/0 --nat-gateway-id $NAT
#            ^ the PRIVATE table points at the NAT
#              the PUBLIC table (where the NAT lives) still points at the IGW

# ---------- One NAT per AZ: the production loop ----------
for AZ in 1a 1b 1c; do
  E=$(aws ec2 allocate-address --domain vpc --query AllocationId --output text)
  N=$(aws ec2 create-nat-gateway --subnet-id subnet-pub$AZ --allocation-id $E \\
        --query 'NatGateway.NatGatewayId' --output text)
  aws ec2 wait nat-gateway-available --nat-gateway-ids $N
  aws ec2 create-route --route-table-id rtb-private$AZ --destination-cidr-block 0.0.0.0/0 --nat-gateway-id $N
done

# ---------- Is it healthy, and where is it? ----------
aws ec2 describe-nat-gateways --filter Name=vpc-id,Values=vpc-0a1b2c3d \\
  --query 'NatGateways[].{Id:NatGatewayId,State:State,AZ:SubnetId,
                          EIP:NatGatewayAddresses[0].PublicIp,
                          Private:NatGatewayAddresses[0].PrivateIp,Type:ConnectivityType}' --output table

# ---------- The metrics that matter ----------
# ErrorPortAllocation  > 0  -> hit 55k connections to ONE destination. Spread destinations
#                              or add gateways; a bigger NAT is not a thing.
# PacketsDropCount     > 0  -> NAT-level drops, investigate immediately
# BytesOutToDestination     -> this is your bill. Break it down before optimising.
aws cloudwatch get-metric-statistics --namespace AWS/NATGateway \\
  --metric-name ErrorPortAllocation --dimensions Name=NatGatewayId,Value=$NAT \\
  --start-time 2026-09-13T00:00:00Z --end-time 2026-09-14T00:00:00Z \\
  --period 300 --statistics Sum

# ---------- Cut the bill: keep AWS-bound traffic off the NAT ----------
aws ec2 create-vpc-endpoint --vpc-id vpc-0a1b2c3d --vpc-endpoint-type Gateway \\
  --service-name com.amazonaws.ap-south-1.s3 \\
  --route-table-ids rtb-private1a rtb-private1b rtb-private1c        # FREE
for S in ecr.api ecr.dkr secretsmanager logs sts; do                  # per-hour + per-GB, still cheaper
  aws ec2 create-vpc-endpoint --vpc-id vpc-0a1b2c3d --vpc-endpoint-type Interface \\
    --service-name com.amazonaws.ap-south-1.$S \\
    --subnet-ids subnet-app1a subnet-app1b --security-group-ids sg-endpoints --private-dns-enabled
done

# ---------- Private NAT gateway: the overlapping-CIDR answer (no EIP, no internet) ----------
aws ec2 create-nat-gateway --subnet-id subnet-app1a --connectivity-type private`,
          ],
          questions: [
            {
              question: "Which subnet does a NAT gateway live in, and what routes are involved?",
              solution: "<p>The NAT gateway lives in a <strong>public subnet</strong> — one whose route table has <code>0.0.0.0/0 → igw-xxx</code> — because the NAT itself must be able to reach the internet on everyone's behalf. The <strong>private</strong> subnets then have their own route tables pointing <code>0.0.0.0/0 → nat-xxx</code>. So two route tables are involved and they point at different targets. Placing the NAT in a private subnet is the classic mistake: every API call succeeds, nothing errors at creation time, and every request from the private tier times out because the NAT has no egress path of its own.</p>",
            },
            {
              question: "Why can't the internet initiate a connection to an instance behind a NAT gateway?",
              solution: "<p>Because the NAT's translation table entry is only ever created by an <strong>outbound</strong> packet. When an instance connects out, the NAT allocates a source port on its Elastic IP and records the mapping back to the private address and port; returning packets match that entry and get translated home. An <strong>unsolicited inbound packet has no matching entry</strong>, so the NAT has nowhere to send it and drops it. This is structural, not a rule you configured — there is no port-forwarding or DNAT feature on a NAT gateway to enable, deliberately. For inbound access you use a load balancer in the public subnets targeting the private instances.</p>",
            },
            {
              question: "What does an ErrorPortAllocation metric above zero mean and how do you fix it?",
              solution: "<p>The NAT gateway ran out of source ports for a <strong>single unique destination</strong>. It supports about <strong>55,000 simultaneous connections per destination IP, port and protocol</strong>, so the error means many clients are hammering one endpoint — a shared API, a database, a metrics collector. Fixes, in order of usefulness: spread the load across <strong>more destination IPs</strong> (multiple endpoints or a DNS name resolving to several addresses), add <strong>VPC endpoints</strong> so AWS-bound traffic bypasses the NAT entirely, reduce connection churn with <strong>connection pooling and keepalives</strong>, or add <strong>more NAT gateways</strong> and split subnets across them. There is no larger NAT gateway size to buy — it already autoscales to 100 Gbps; the limit is per-destination ports, not bandwidth.</p>",
            },
            {
              question: "How do you reduce NAT gateway costs?",
              solution: "<p>Attack the per-GB processing charge, since that is usually larger than the hourly fee. <strong>(1)</strong> Add a <strong>gateway endpoint for S3 and DynamoDB</strong> — it is free and instantly removes that traffic from the NAT. <strong>(2)</strong> Add <strong>interface endpoints</strong> for the services you call constantly — ECR (both <code>ecr.api</code> and <code>ecr.dkr</code>), Secrets Manager, CloudWatch Logs, STS — since container image pulls alone often dominate NAT charges. <strong>(3)</strong> Make sure each AZ uses <em>its own</em> NAT so you are not also paying cross-AZ transfer in both directions. <strong>(4)</strong> In dev, share a single NAT or use a small NAT instance. <strong>(5)</strong> Break down <code>BytesOutToDestination</code> before optimising — measure first, because the answer is usually one or two chatty destinations.</p>",
            },
            {
              question: "Can you attach a security group to a NAT gateway? How do you control what it lets out?",
              solution: "<p><strong>No</strong> — a NAT gateway does not accept a security group. You control egress at the sources and the perimeter instead: <strong>security groups on the private instances</strong> restrict what they may connect to, the <strong>NACL on the NAT's own subnet</strong> can filter traffic crossing that boundary, and for real egress policy — allowlisting destination <em>domains</em> rather than IPs — you use <strong>AWS Network Firewall</strong> or a proxy fleet in the path. Two related facts worth knowing: the NAT also has no port-forwarding, and it idles TCP connections out after <strong>350 seconds</strong>, so long-lived idle connections need keepalives below that interval.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html",
            "https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateway-troubleshooting.html",
            "https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateway-basics.html",
          ],
        },
        {
          topic: "NAT Gateway vs Internet Gateway — Directionality and Placement",
          tags: ["aws", "vpc", "nat-gateway", "internet-gateway", "comparison", "egress-only", "architecture"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  These two are constantly confused because both are "how you get to the internet". The distinction is clean once you hold two axes in mind: <strong>direction</strong> (can a connection be <em>initiated</em> from outside?) and <strong>placement</strong> (what does it attach to?).
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Internet Gateway</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Attaches to the VPC itself.</strong> One per VPC. It is not "in" a subnet.</li>
  <li><strong>Bidirectional</strong> — connections can be initiated in <em>both</em> directions. That is exactly what a load balancer or a public web server needs.</li>
  <li>Performs <strong>1:1 NAT</strong> between a private address and the ENI's public IP or Elastic IP. Each resource needs its own public address.</li>
  <li>Handles <strong>IPv4 and IPv6</strong> (for IPv6 it simply forwards; there is no translation).</li>
  <li><strong>Free</strong>, horizontally scaled, redundant, no bandwidth limit, nothing to manage.</li>
  <li>Makes a subnet <strong>public</strong> by being the target of that subnet's <code>0.0.0.0/0</code> route.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">NAT Gateway</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Lives inside a subnet</strong> — specifically a <em>public</em> one — and is <strong>zonal</strong>.</li>
  <li><strong>One-directional</strong> — outbound-initiated only. Inbound connections are structurally impossible because no translation entry exists for them.</li>
  <li>Performs <strong>many-to-one SNAT with port translation</strong>: hundreds of private instances share the NAT's single Elastic IP.</li>
  <li><strong>IPv4 only.</strong> The IPv6 equivalent is the <strong>egress-only internet gateway</strong>.</li>
  <li><strong>Costs money</strong> — hourly plus per-GB processed — and you run one per AZ.</li>
  <li>Makes a subnet <strong>private-with-egress</strong> by being the target of its <code>0.0.0.0/0</code> route.</li>
  <li><strong>Depends on an IGW.</strong> A NAT gateway is useless without one: its own subnet's route table must point at the IGW.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">They are not alternatives — they work together</h4>
<p style="line-height: 1.75;">The most important sentence in this comparison: <strong>a NAT gateway requires an internet gateway to function.</strong> The traffic path from a private instance to the internet is <code>instance → private route table → NAT gateway (in the public subnet) → public route table → IGW → internet</code>. Choosing "NAT gateway instead of internet gateway" is not a thing. The real choice is <em>which subnets route to which</em>.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The full family of gateways</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>IGW</strong> — bidirectional, IPv4+IPv6, VPC-attached, free.</li>
  <li><strong>NAT gateway</strong> — outbound-only IPv4, subnet-placed, zonal, paid.</li>
  <li><strong>Egress-only IGW</strong> — outbound-only IPv6, VPC-attached, <strong>free</strong>. Needed because IPv6 has no NAT, so a private IPv6 host routed to a normal IGW would be reachable from the internet.</li>
  <li><strong>Virtual private gateway (VGW)</strong> — the VPC end of a Site-to-Site VPN or Direct Connect. Not internet at all.</li>
  <li><strong>Transit gateway (TGW)</strong> — a regional router hub connecting many VPCs, VPNs and Direct Connect gateways transitively.</li>
  <li><strong>Gateway VPC endpoint</strong> — a route-table target for S3/DynamoDB that keeps traffic on the AWS network entirely.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Choosing, in one line each</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Needs to <strong>receive</strong> connections from the internet → public subnet + <strong>IGW</strong> + public IP (in practice: an ALB/NLB).</li>
  <li>Needs to <strong>make</strong> outbound calls but must not be reachable → private subnet + <strong>NAT gateway</strong>.</li>
  <li>Only talks to <strong>AWS services</strong> → <strong>VPC endpoints</strong>, and skip the NAT bill entirely.</li>
  <li>Talks to nothing outside the VPC → isolated subnet, <strong>no gateway at all</strong>.</li>
  <li>IPv6 outbound-only → <strong>egress-only IGW</strong>.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "An internet gateway attaches to the VPC, is bidirectional, does one-to-one NAT with each resource's own public IP, handles IPv4 and IPv6, and is free. A NAT gateway sits inside a public subnet, is zonal, is outbound-initiated only, does many-to-one source NAT so private instances share one Elastic IP, is IPv4-only, and is billed hourly plus per GB. The key point is they are not alternatives: a NAT gateway needs an internet gateway to work, because its own subnet routes 0.0.0.0/0 to the IGW. Public subnets route to the IGW, private subnets route to the NAT, and for IPv6 the outbound-only equivalent is an egress-only internet gateway, which is free."</div>
</div>`,
          examples: [
            `# ---------- The actual packet path, end to end ----------
# App instance 10.0.16.9 (private subnet) calls https://api.example.com
#
#   1. instance  -> rtb-private1a : 0.0.0.0/0 -> nat-1a
#   2. nat-1a    (sits in subnet-pub1a) SNATs 10.0.16.9:51234 -> 52.66.10.20:31002
#   3. nat-1a    -> rtb-public    : 0.0.0.0/0 -> igw-abc
#   4. igw-abc   -> internet
#   Return path reverses, matched against the NAT's connection-tracking table.
#
# Remove the IGW route from rtb-public and the NAT gateway stops working entirely.

# ---------- Two route tables, two different targets ----------
aws ec2 describe-route-tables --route-table-ids rtb-public rtb-private1a \\
  --query 'RouteTables[].{RT:RouteTableId,Routes:Routes[].[DestinationCidrBlock,GatewayId,NatGatewayId]}' \\
  --output json
# rtb-public    : [["10.0.0.0/16","local",null], ["0.0.0.0/0","igw-abc",null]]
# rtb-private1a : [["10.0.0.0/16","local",null], ["0.0.0.0/0",null,"nat-0aaa"]]

# ---------- Direction, demonstrated ----------
# PUBLIC subnet instance (IGW + public IP): both of these work
#   curl https://example.com                     # outbound  OK
#   curl http://<its-public-ip>/ from laptop     # inbound   OK (if SG allows)
#
# PRIVATE subnet instance (NAT): only the first works
#   curl https://example.com                     # outbound  OK - via NAT's EIP
#   curl http://<nat-eip>/ from laptop           # inbound   IMPOSSIBLE, no DNAT exists

# ---------- IPv6: no NAT anywhere, use an egress-only IGW ----------
EIGW=$(aws ec2 create-egress-only-internet-gateway --vpc-id vpc-0a1b2c3d \\
        --query 'EgressOnlyInternetGateway.EgressOnlyInternetGatewayId' --output text)
aws ec2 create-route --route-table-id rtb-private1a \\
  --destination-ipv6-cidr-block ::/0 --egress-only-internet-gateway-id $EIGW   # free
# For a PUBLIC IPv6 subnet you would instead route ::/0 -> igw (bidirectional).

# ---------- Cost contrast, per month, ap-south-1 ballpark ----------
# IGW                       : $0.00  (+ normal data transfer out)
# NAT gateway x3 AZs        : ~$97   (+ ~$0.045/GB processed  + data transfer out)
# Egress-only IGW           : $0.00
# S3 gateway endpoint       : $0.00  <- removes S3 traffic from the NAT's per-GB charge
# Interface endpoint        : ~$7/AZ/month + $0.01/GB`,
          ],
          questions: [
            {
              question: "Can you use a NAT gateway without an internet gateway?",
              solution: "<p><strong>No.</strong> A NAT gateway is not an alternative to an internet gateway — it <em>depends</em> on one. The NAT sits in a public subnet whose route table points <code>0.0.0.0/0</code> at the IGW; that is how the NAT itself reaches the internet on behalf of the private instances. The full path is <code>private instance → private route table → NAT gateway → public route table → IGW → internet</code>. Remove the IGW route from the NAT's subnet and every private instance loses egress, even though the NAT still shows as <code>available</code>. (The one exception in name only is the <strong>private NAT gateway</strong>, which deliberately has no internet path at all and exists to handle overlapping CIDRs over TGW/VPN/Direct Connect.)</p>",
            },
            {
              question: "State the main differences between an IGW and a NAT gateway.",
              solution: "<p><strong>Attachment:</strong> the IGW attaches to the <em>VPC</em> (one per VPC, not in any subnet); the NAT gateway lives <em>inside a public subnet</em> and is <strong>zonal</strong>. <strong>Direction:</strong> the IGW is <strong>bidirectional</strong> — connections can be initiated from outside; the NAT is <strong>outbound-initiated only</strong>. <strong>Translation:</strong> the IGW does <strong>1:1 NAT</strong> so each resource needs its own public IP; the NAT does <strong>many-to-one SNAT with port translation</strong> so many instances share one Elastic IP. <strong>Protocol:</strong> the IGW handles IPv4 and IPv6; the NAT gateway is <strong>IPv4-only</strong> (use an egress-only IGW for IPv6). <strong>Cost:</strong> the IGW is free; the NAT is hourly plus per-GB processed.</p>",
            },
            {
              question: "An instance must accept inbound connections from the internet. IGW or NAT gateway?",
              solution: "<p><strong>Internet gateway</strong> — it is the only one of the two that permits inbound-initiated connections. The instance needs to be in a subnet whose route table targets the IGW, needs a <strong>public IP or Elastic IP</strong>, and needs security group rules allowing the inbound port. A NAT gateway cannot do this at any configuration: it has no port forwarding and no DNAT, by design. That said, the better architecture is usually to keep the instance in a <strong>private</strong> subnet and put an <strong>Application or Network Load Balancer</strong> in the public subnets targeting it — you then get one public entry point, TLS termination, health checks and WAF, while the instance itself stays unreachable.</p>",
            },
            {
              question: "Why is there no NAT gateway for IPv6, and what do you use instead?",
              solution: "<p>Because NAT exists to solve IPv4 address scarcity, and IPv6 has no scarcity — every IPv6 address AWS assigns is <strong>globally routable</strong>, so there is nothing to multiplex. But that also means a private IPv6 host routed <code>::/0</code> to a normal internet gateway would be <strong>directly reachable from the internet</strong>, with only security groups and NACLs in the way. The purpose-built answer is the <strong>egress-only internet gateway</strong>: it is stateful, permits outbound IPv6 connections and their replies, and drops unsolicited inbound. It attaches to the VPC (not a subnet), is not zonal, and unlike a NAT gateway it is <strong>free</strong>.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-comparison.html",
            "https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html",
            "https://docs.aws.amazon.com/vpc/latest/userguide/egress-only-internet-gateway.html",
          ],
        },
        {
          topic: "NAT Instance vs NAT Gateway — Legacy DIY vs Managed Service",
          tags: ["aws", "vpc", "nat-instance", "nat-gateway", "source-dest-check", "cost", "legacy"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  A <strong>NAT instance</strong> is an EC2 instance you configure to forward and masquerade traffic — Linux <code>iptables</code> doing what the managed NAT gateway does for you. It is the original approach, predating NAT gateways (2015). <strong>The interview answer is: use a NAT gateway.</strong> But you are expected to know why, and to know the handful of things only an instance can do.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The comparison</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Management</strong> — Gateway: fully managed, AWS patches it. Instance: <em>you</em> patch the OS, monitor it, and own every CVE.</li>
  <li><strong>Availability</strong> — Gateway: redundant within its AZ automatically. Instance: a single EC2 instance is a single point of failure; HA needs an Auto Scaling group of one plus a health-check script that rewrites the route table on failover.</li>
  <li><strong>Bandwidth</strong> — Gateway: 5 Gbps scaling automatically to 100 Gbps. Instance: whatever the instance type gives you, and <em>you</em> must resize it.</li>
  <li><strong>Cost</strong> — Gateway: ~$0.045/hr + ~$0.045/GB processed. Instance: just the EC2 cost, so a <code>t4g.nano</code> can be <strong>an order of magnitude cheaper</strong> for a low-traffic dev VPC (no per-GB processing fee at all).</li>
  <li><strong>Security groups</strong> — Gateway: <strong>cannot</strong> have one. Instance: it is an ENI, so it <em>can</em> — which is one legitimate reason to choose it.</li>
  <li><strong>Port forwarding / bastion</strong> — Gateway: impossible. Instance: yes, it can also serve as a bastion or run a proxy.</li>
  <li><strong>Source/destination check</strong> — Gateway: not applicable. Instance: you <strong>must disable it</strong>, or nothing works.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The source/destination check — the detail interviewers probe</h4>
<p style="line-height: 1.75;">By default, every EC2 ENI <strong>drops any packet whose source or destination address is not its own</strong>. That is a safety feature against spoofing — and it makes forwarding impossible, which is exactly what a NAT instance does for a living. So <code>modify-instance-attribute --no-source-dest-check</code> is mandatory. The same requirement applies to <em>any</em> forwarding appliance you run on EC2: a software router, a VPN concentrator, a firewall, a transparent proxy. If someone says "my EC2-based router silently drops everything", this is the first thing to check.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What a NAT instance needs to actually work</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Launch it in a <strong>public subnet</strong> with a public IP or Elastic IP (same placement rule as a NAT gateway).</li>
  <li><strong>Disable the source/destination check.</strong></li>
  <li>Enable <strong>IP forwarding</strong> in the kernel (<code>net.ipv4.ip_forward=1</code>) and add a <strong>MASQUERADE</strong> rule in iptables.</li>
  <li>A security group allowing inbound from the private subnet CIDRs and outbound to the internet.</li>
  <li>A route in each private route table: <code>0.0.0.0/0 → eni-xxx</code> (target the <strong>ENI</strong>, not the instance id, so failover can re-point it).</li>
  <li>Note the <strong>Amazon Linux NAT AMI (<code>amzn-ami-vpc-nat</code>) is deprecated</strong> — you now build your own from a current AMI.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">When a NAT instance is still defensible</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Cost-sensitive dev/test</strong> where $35+/month per NAT gateway is not justified and an outage is tolerable. A <code>t4g.nano</code> runs a few dollars a month.</li>
  <li>You need a <strong>security group on the NAT itself</strong>, or <strong>port forwarding</strong>, or want one box to double as a bastion.</li>
  <li>You need custom packet handling — traffic shaping, a transparent proxy, deep logging.</li>
  <li>Very high, steady egress volumes where the per-GB processing fee dominates and a large instance is genuinely cheaper — though at that point a <strong>fleet behind a Gateway Load Balancer</strong> or AWS Network Firewall is usually the better architecture.</li>
</ul>
<p style="line-height: 1.75;">In every other case — and certainly in production — the managed NAT gateway wins, because the failure mode of a self-managed NAT instance is "the entire private tier loses internet at 3am and the on-call has to remember how the route table failover script works".</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "A NAT instance is an EC2 instance doing iptables masquerading; a NAT gateway is the managed equivalent, and it is the standard answer today. The gateway is redundant within its AZ, scales automatically from 5 to 100 Gbps, and needs no patching; the instance is a single point of failure whose bandwidth is the instance type and whose OS is your problem, and its HA story is an Auto Scaling group plus a script that rewrites the route table. The critical detail is that a NAT instance only works if you disable the source/destination check on its ENI, because EC2 otherwise drops packets not addressed to it. I would only choose an instance for a cost-sensitive dev VPC, or when I need a security group on the NAT or port forwarding, which a NAT gateway cannot do."</div>
</div>`,
          examples: [
            `# ---------- Build a NAT instance (the steps people forget are 2 and 3) ----------
# 1. Launch in a PUBLIC subnet with a public IP
aws ec2 run-instances --image-id ami-0abcdef --instance-type t4g.nano \\
  --subnet-id subnet-pub1a --associate-public-ip-address \\
  --security-group-ids sg-nat --key-name mykey \\
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=nat-instance-1a}]'

# 2. THE CRITICAL STEP: disable the source/destination check
aws ec2 modify-instance-attribute --instance-id i-0nat --no-source-dest-check
# Without this, EC2 drops every packet not addressed to the instance itself
# and the NAT silently forwards nothing. Same requirement for ANY EC2 router,
# VPN concentrator, firewall or transparent proxy.

# 3. Inside the instance: enable forwarding + masquerade
#   sudo sysctl -w net.ipv4.ip_forward=1
#   echo 'net.ipv4.ip_forward=1' | sudo tee /etc/sysctl.d/99-nat.conf
#   sudo iptables -t nat -A POSTROUTING -o ens5 -s 10.0.0.0/16 -j MASQUERADE
#   sudo iptables-save | sudo tee /etc/iptables/rules.v4
#   (The old amzn-ami-vpc-nat AMI did this for you - it is deprecated, build your own.)

# 4. Route private subnets at its ENI (NOT the instance id - survives replacement)
ENI=$(aws ec2 describe-instances --instance-ids i-0nat \\
      --query 'Reservations[].Instances[].NetworkInterfaces[0].NetworkInterfaceId' --output text)
aws ec2 create-route --route-table-id rtb-private1a \\
  --destination-cidr-block 0.0.0.0/0 --network-interface-id $ENI

# 5. Security group - the thing a NAT GATEWAY cannot have
aws ec2 authorize-security-group-ingress --group-id sg-nat \\
  --ip-permissions 'IpProtocol=-1,IpRanges=[{CidrIp=10.0.0.0/16,Description="private subnets"}]'

# ---------- Verify the check is really off ----------
aws ec2 describe-instances --instance-ids i-0nat \\
  --query 'Reservations[].Instances[].SourceDestCheck'
# [false]   <- must be false. [true] means it will never forward anything.

# ---------- Cost comparison, low-traffic dev VPC (~100 GB/month egress) ----------
# NAT gateway  : $0.045/hr * 730h = $32.85  +  100 GB * $0.045 = $4.50   => ~$37/month
# t4g.nano NAT : ~$3/month  + EIP ~$3.60/month                          => ~$7/month
# Production:     take the gateway. The instance's 3am failure mode is not worth $30.

# ---------- Migrating instance -> gateway is just a route change ----------
aws ec2 replace-route --route-table-id rtb-private1a \\
  --destination-cidr-block 0.0.0.0/0 --nat-gateway-id nat-0aaa111
# Existing connections drop; new ones use the gateway. Then terminate the instance.`,
          ],
          questions: [
            {
              question: "Why must you disable the source/destination check on a NAT instance?",
              solution: "<p>Because every EC2 network interface, by default, <strong>drops any packet whose source or destination address is not the interface's own</strong> — an anti-spoofing safeguard. A NAT instance's entire job is to forward packets on behalf of other hosts, so with the check enabled it silently discards everything and the private tier appears to have no internet, with no error anywhere. <code>aws ec2 modify-instance-attribute --no-source-dest-check</code> turns it off. The same requirement applies to <em>any</em> forwarding appliance you run on EC2: a software router, VPN concentrator, firewall or transparent proxy. A managed NAT gateway has no such setting because it is not an EC2 instance.</p>",
            },
            {
              question: "When would you still choose a NAT instance over a NAT gateway?",
              solution: "<p>Four situations. <strong>(1) Cost-sensitive dev/test</strong> — a NAT gateway is ~$33/month per AZ before traffic, while a <code>t4g.nano</code> is a few dollars and has no per-GB processing fee. <strong>(2) You need a security group on the NAT itself</strong>, which a NAT gateway cannot have. <strong>(3) You need port forwarding, or want one host to double as a bastion or proxy</strong> — a NAT gateway supports neither. <strong>(4) Custom packet handling</strong> such as traffic shaping or deep logging. In production, everything else favours the gateway: it is redundant within its AZ, scales to 100 Gbps automatically, and nobody has to patch it. Note the old <code>amzn-ami-vpc-nat</code> AMI is deprecated, so an instance now means building and maintaining your own image.</p>",
            },
            {
              question: "How do you make a NAT instance highly available, and how does that compare to a NAT gateway?",
              solution: "<p>You cannot make a single instance HA, so the pattern is an <strong>Auto Scaling group with min=max=1</strong> per AZ, plus a health-check mechanism (a script or Lambda) that detects failure and <strong>rewrites the private route table</strong> to point at the replacement instance's ENI — which is why you always route to the <strong>ENI id rather than the instance id</strong>. That is meaningful custom machinery to build, test and keep working. A <strong>NAT gateway</strong> is redundant within its AZ out of the box; the only design work is running <strong>one per AZ</strong> so a zone failure does not take out egress everywhere. The comparison is the real argument for the managed service: the instance's failure mode is a 3am outage that depends on a failover script nobody has exercised recently.</p>",
            },
            {
              question: "A colleague's EC2-based software router drops all forwarded traffic. What is your first question?",
              solution: "<p>&quot;Is the <strong>source/destination check</strong> disabled on its ENI?&quot; It is <code>true</code> by default, and while enabled the interface discards every packet not addressed to itself — which is all forwarded traffic. Check with <code>describe-instances --query 'Reservations[].Instances[].SourceDestCheck'</code>; it must return <code>false</code>. If that is already off, work down the list: is <code>net.ipv4.ip_forward</code> set to 1 in the kernel, is there a <strong>MASQUERADE</strong> rule in iptables, does the security group allow inbound from the client CIDRs, does the route table point at the correct <strong>ENI</strong>, and is the appliance in a subnet that itself has a path to the destination?</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/vpc/latest/userguide/VPC_NAT_Instance.html",
            "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-comparison.html",
            "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-eni.html#change_source_dest_check",
          ],
        },
        {
          topic: "VPC Peering — Private, Non-Transitive VPC-to-VPC Connectivity",
          tags: ["aws", "vpc", "vpc-peering", "non-transitive", "cidr-overlap", "transit-gateway", "networking"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  A <strong>VPC peering connection</strong> is a private, one-to-one network link between two VPCs that lets resources in each communicate using <strong>private IP addresses</strong>, as if they were on the same network. Traffic stays on the AWS backbone — it never touches the public internet, needs no gateway, and there is no single point of failure or bandwidth bottleneck to manage.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The two rules you must state</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>CIDRs must not overlap.</strong> AWS refuses the connection outright — with identical or overlapping ranges there is no unambiguous way to route. This is why every default VPC (all <code>172.31.0.0/16</code>) can never be peered with another, and why you allocate non-overlapping ranges from a central plan or IPAM from day one.</li>
  <li><strong>Peering is NOT transitive.</strong> If A peers with B and B peers with C, <strong>A cannot reach C</strong>. There is no routing through the middle VPC, not even with routes added — AWS explicitly does not forward between two peering connections. Full mesh connectivity between <em>n</em> VPCs needs <strong>n(n−1)/2</strong> connections: 3 VPCs = 3, 6 VPCs = 15, 10 VPCs = 45. That combinatorial blow-up is precisely why <strong>Transit Gateway</strong> exists.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Setting one up</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Request → accept.</strong> The requester creates the connection; the owner of the accepter VPC must <strong>accept</strong> it. Cross-account and cross-region are both supported.</li>
  <li><strong>Routes on BOTH sides.</strong> Accepting is not enough — each VPC needs route-table entries pointing the <em>other</em> VPC's CIDR at <code>pcx-xxxxx</code>. Forgetting one side gives you one-way traffic that fails silently.</li>
  <li><strong>Security groups on both sides</strong> must allow the traffic. Within the same region you can <strong>reference the peer's security group by ID</strong> (even cross-account) — a genuinely useful feature. <strong>Cross-region peering does not support SG referencing</strong>; you must use CIDRs.</li>
  <li><strong>DNS resolution</strong> is off by default: enable it on the peering connection so private hosted-zone names and private DNS resolve to the peer's <em>private</em> IPs rather than public ones.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What peering cannot do — "no edge-to-edge routing"</h4>
<p style="line-height: 1.75;">You cannot use the peer VPC's edge resources. Concretely, VPC A <strong>cannot</strong> route through the peering connection to use VPC B's:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Internet gateway</strong> (no borrowing internet access),</li>
  <li><strong>NAT gateway</strong> (no sharing egress),</li>
  <li><strong>VPN connection or Direct Connect</strong> (no reaching on-prem through a peer),</li>
  <li><strong>Gateway VPC endpoint</strong> (S3/DynamoDB endpoints serve only their own VPC).</li>
</ul>
<p style="line-height: 1.75;">Interface endpoints (PrivateLink) are the exception — those <em>are</em> reachable across a peering connection, because they are just ENIs with private IPs. This asymmetry is a favourite interview follow-up.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Cost, limits and performance</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>No hourly charge</strong> for the connection itself — you pay only data transfer. Same-AZ, same-region peering traffic is <strong>free</strong>; cross-AZ is charged both directions; inter-region is charged at inter-region rates.</li>
  <li><strong>Quota: 50 active peering connections per VPC</strong> by default (raisable to 125).</li>
  <li><strong>MTU:</strong> jumbo frames (9001) are supported within a region; <strong>inter-region peering is limited to 1500 bytes</strong>.</li>
  <li><strong>Inter-region traffic is encrypted</strong> by AWS and stays on the AWS global backbone.</li>
  <li>You cannot have <strong>two peering connections between the same pair of VPCs</strong>, and you cannot peer transitively — see above.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Peering vs Transit Gateway vs PrivateLink</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Peering</strong> — a few VPCs, full network access between them, no hourly cost. Simple and cheap; does not scale as a mesh.</li>
  <li><strong>Transit Gateway</strong> — a regional hub; attach many VPCs, VPNs and Direct Connect gateways, route <strong>transitively</strong> with its own route tables and segmentation. Costs per attachment-hour plus per GB, but replaces the n² mesh.</li>
  <li><strong>PrivateLink</strong> — expose a <em>single service</em> rather than a whole network, one-directional, and it <strong>works even with overlapping CIDRs</strong>. When two companies must integrate one API and their IP ranges collide, this is the answer.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "VPC peering is a private one-to-one link between two VPCs using private IPs, staying on the AWS backbone, with no hourly charge and no bandwidth bottleneck. Two rules dominate: the CIDRs must not overlap, and peering is non-transitive — A to B and B to C does not give A to C, so a full mesh needs n(n−1)/2 connections, which is why Transit Gateway exists. Setup is request, accept, then routes and security groups on both sides; same-region peering lets me reference the peer's security group by ID, cross-region does not. And there is no edge-to-edge routing, so I cannot use a peer's internet gateway, NAT gateway, VPN or gateway endpoint — though interface endpoints do work across peering."</div>
</div>`,
          examples: [
            `# ---------- Create and accept (cross-account, cross-region both supported) ----------
PCX=$(aws ec2 create-vpc-peering-connection \\
       --vpc-id vpc-aaa111 \\
       --peer-vpc-id vpc-bbb222 \\
       --peer-owner-id 444455556666 \\
       --peer-region ap-southeast-1 \\
       --query 'VpcPeeringConnection.VpcPeeringConnectionId' --output text)

# The ACCEPTER must accept (in the peer's region/account)
aws ec2 accept-vpc-peering-connection --vpc-peering-connection-id $PCX --region ap-southeast-1

# ---------- Routes on BOTH sides - accepting alone does nothing ----------
# In VPC A (10.0.0.0/16), route to B's CIDR:
aws ec2 create-route --route-table-id rtb-a --destination-cidr-block 10.1.0.0/16 \\
  --vpc-peering-connection-id $PCX
# In VPC B (10.1.0.0/16), route back to A's CIDR:
aws ec2 create-route --route-table-id rtb-b --destination-cidr-block 10.0.0.0/16 \\
  --vpc-peering-connection-id $PCX --region ap-southeast-1
# Miss one side => traffic leaves but replies never return. Silent, one-way failure.

# ---------- Same-region bonus: reference the PEER's security group by ID ----------
aws ec2 authorize-security-group-ingress --group-id sg-db-in-A \\
  --ip-permissions 'IpProtocol=tcp,FromPort=5432,ToPort=5432,UserIdGroupPairs=[{GroupId=sg-app-in-B,UserId=444455556666,Description="peer app tier"}]'
# CROSS-REGION peering does NOT support this - you must use CIDRs there.

# ---------- Turn on DNS resolution across the peering (off by default) ----------
aws ec2 modify-vpc-peering-connection-options --vpc-peering-connection-id $PCX \\
  --requester-peering-connection-options AllowDnsResolutionFromRemoteVpc=true \\
  --accepter-peering-connection-options AllowDnsResolutionFromRemoteVpc=true
# Without it, a peer's private DNS name resolves to its PUBLIC IP, and the traffic
# then tries to go out over the internet instead of the peering connection.

# ---------- The overlap rule, demonstrated ----------
# VPC A 10.0.0.0/16  <-> VPC B 10.0.0.0/16
#   -> InvalidVpcPeeringConnection: CIDR blocks overlap.  Unfixable. Rebuild one side.

# ---------- Non-transitivity, demonstrated ----------
# A(10.0/16) <-> B(10.1/16) <-> C(10.2/16)
# From A, adding "10.2.0.0/16 -> pcx-AB" does NOT work: B will not forward between
# two peering connections. A needs its OWN pcx to C, or you move to Transit Gateway.

# ---------- Mesh cost of peering, in connections ----------
#  3 VPCs ->  3 | 5 VPCs -> 10 | 10 VPCs -> 45 | 20 VPCs -> 190   (quota: 50, max 125)
# Transit Gateway: N attachments, one route table, transitive. That is the pivot point.

# ---------- Audit existing peerings ----------
aws ec2 describe-vpc-peering-connections \\
  --query 'VpcPeeringConnections[].{Id:VpcPeeringConnectionId,Status:Status.Code,
            Req:RequesterVpcInfo.CidrBlock,Acc:AccepterVpcInfo.CidrBlock,
            AccRegion:AccepterVpcInfo.Region}' --output table`,
          ],
          questions: [
            {
              question: "Explain why VPC peering is non-transitive and what you do instead at scale.",
              solution: "<p>Each peering connection is a strict <strong>one-to-one</strong> relationship, and AWS will not forward packets between two peering connections — a middle VPC is not a router. So with A↔B and B↔C, adding a route in A for C's CIDR changes nothing: B drops the traffic. Full mesh connectivity therefore requires <strong>n(n−1)/2</strong> connections — 45 for ten VPCs — each with route entries on both sides in every relevant route table, which quickly becomes unmanageable and runs into the 50-per-VPC quota (raisable to 125). The scale answer is <strong>AWS Transit Gateway</strong>: a regional hub where each VPC has a single attachment and the TGW routes <strong>transitively</strong>, with its own route tables for segmentation. You trade a per-attachment-hour and per-GB charge for linear rather than quadratic complexity.</p>",
            },
            {
              question: "Two VPCs both use 10.0.0.0/16 and must talk to each other. What are your options?",
              solution: "<p>Peering and Transit Gateway are both out — <strong>overlapping CIDRs are rejected</strong> because routing would be ambiguous. Options, in increasing order of effort: <strong>(1) AWS PrivateLink</strong> — expose the specific service behind an NLB as an endpoint service; the consumer reaches it through an interface endpoint in their own address space, so <strong>overlap does not matter</strong>. This is the standard answer when only one API needs to be shared. <strong>(2) A private NAT gateway</strong> in front of a Transit Gateway attachment, so the other side sees a single non-overlapping address instead of your real range. <strong>(3) Re-IP one VPC</strong> — the clean but expensive fix, usually done by adding a non-overlapping <strong>secondary CIDR</strong> and migrating workloads into new subnets there.</p>",
            },
            {
              question: "Can VPC A use VPC B's NAT gateway or internet gateway over a peering connection?",
              solution: "<p><strong>No</strong> — this is the <strong>no edge-to-edge routing</strong> rule. Traffic arriving over a peering connection cannot be routed onward through the peer's internet gateway, NAT gateway, VPN connection, Direct Connect, or <strong>gateway VPC endpoint</strong>. So you cannot centralise internet egress with peering alone; that pattern needs a <strong>Transit Gateway</strong> with a shared egress VPC. The notable exception is <strong>interface endpoints (PrivateLink)</strong>, which <em>are</em> reachable across a peering connection because they are simply ENIs holding private IPs in the peer's subnet — which is exactly why a shared-services VPC full of interface endpoints is a common cost-saving design.</p>",
            },
            {
              question: "You created and accepted a peering connection but the instances still cannot reach each other. What is missing?",
              solution: "<p>Almost always the <strong>route tables</strong> — accepting a peering connection creates the link but adds <em>no</em> routes. Each side needs an entry pointing the <em>other</em> VPC's CIDR at <code>pcx-xxxxx</code>, in the route table associated with the <strong>specific subnets</strong> involved, not just the main table. Miss one side and traffic leaves but replies never return, which looks like a timeout. Next, check <strong>security groups on both ends</strong> (same-region peering lets you reference the peer's SG by ID; cross-region requires CIDRs), then <strong>NACLs on both subnets in both directions</strong>. If it works by IP but not by name, enable <strong>DNS resolution</strong> on the peering connection — otherwise the peer's DNS name resolves to a public IP and the traffic tries to go out over the internet.</p>",
            },
            {
              question: "Peering, Transit Gateway or PrivateLink — how do you choose?",
              solution: "<p><strong>Peering</strong> for a small number of VPCs that need general network access to each other: no hourly charge, no bandwidth bottleneck, simple — but non-transitive and quadratic, so it stops scaling past a handful. <strong>Transit Gateway</strong> once you have many VPCs, or need on-prem connectivity via VPN/Direct Connect in the same topology, or want <strong>transitive routing with segmentation</strong> through multiple TGW route tables; you pay per attachment-hour and per GB. <strong>PrivateLink</strong> when you want to expose <em>one service</em> rather than join two networks — it is one-directional, gives the consumer no network reach into your VPC, and crucially <strong>works with overlapping CIDRs</strong>, which makes it the default for SaaS and cross-organisation integrations.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html",
            "https://docs.aws.amazon.com/vpc/latest/peering/vpc-peering-basics.html#vpc-peering-limitations",
            "https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html",
          ],
        },
        {
          topic: "VPC Endpoints — Reaching AWS Services Without an IGW or NAT",
          tags: ["aws", "vpc", "vpc-endpoint", "privatelink", "security", "cost", "endpoint-policy"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Every AWS service has a <strong>public API endpoint</strong> — <code>s3.ap-south-1.amazonaws.com</code>, <code>secretsmanager.ap-south-1.amazonaws.com</code>. By default, an instance calling one of those resolves a public IP and the traffic leaves your VPC through an internet gateway or a NAT gateway. A <strong>VPC endpoint</strong> changes that: it provides <strong>private connectivity from your VPC directly to the service</strong>, over the AWS network, with no IGW, no NAT and no public IP anywhere.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Why you want them — three reasons, in order</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Security.</strong> Traffic never traverses the internet. A truly isolated subnet — no IGW, no NAT — can still call S3, KMS, Secrets Manager and CloudWatch. That is how you build a data tier with zero internet exposure that still functions.</li>
  <li><strong>Cost.</strong> A gateway endpoint is <strong>free</strong> and removes that traffic from the NAT gateway's per-GB processing charge. In container-heavy accounts, ECR image pulls and S3 traffic often dominate the NAT bill, and endpoints are the single biggest lever available.</li>
  <li><strong>Control.</strong> An <strong>endpoint policy</strong> is a resource policy on the endpoint itself — you can allow only specific buckets or only your own account's resources, so even a compromised instance with valid credentials cannot exfiltrate to an attacker's bucket through your endpoint.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The three types</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Gateway endpoint</strong> — S3 and DynamoDB only. Free. Implemented as a <strong>route-table entry</strong> pointing a managed <strong>prefix list</strong> at <code>vpce-xxxx</code>.</li>
  <li><strong>Interface endpoint (PrivateLink)</strong> — almost every other AWS service, plus SaaS and your own services. An <strong>ENI with a private IP</strong> in each subnet you choose. Charged hourly per AZ plus per GB.</li>
  <li><strong>Gateway Load Balancer endpoint</strong> — the target used to steer traffic into a fleet of third-party inspection appliances. Same PrivateLink plumbing, different purpose.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Endpoint policies — the control plane people forget</h4>
<p style="line-height: 1.75;">Every endpoint carries a policy, defaulting to full access. Tightening it gives you a <strong>network-level data perimeter</strong> that IAM alone does not: a statement with <code>"aws:PrincipalOrgID"</code> or an explicit list of bucket ARNs means requests to anything else are refused <em>at the endpoint</em>. Combine it with the bucket-side condition <code>aws:SourceVpce</code> and you get the classic pairing — the VPC can only reach your buckets, and your buckets can only be reached from your VPC.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Practical details that trip people up</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>DNS attributes are mandatory.</strong> Private DNS for an interface endpoint requires both <code>enableDnsSupport</code> and <code>enableDnsHostnames</code> on the VPC. Miss <code>enableDnsHostnames</code> (false by default in a custom VPC) and the service name keeps resolving publicly — the endpoint sits there, billed, doing nothing.</li>
  <li><strong>Interface endpoints need a security group.</strong> It must allow inbound <strong>443</strong> from your application subnets or SGs, or every call times out.</li>
  <li><strong>Endpoints are regional.</strong> An endpoint serves the service in its own region only.</li>
  <li><strong>Create them per AZ</strong> for the same fault-tolerance reasons as everything else; each AZ's ENI is billed.</li>
  <li>Some services need <strong>more than one endpoint</strong>: ECR requires both <code>ecr.api</code> and <code>ecr.dkr</code>, <em>and</em> an S3 gateway endpoint for the image layers themselves — a very common half-configured setup.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "A VPC endpoint gives my VPC private connectivity to an AWS service without an internet gateway or NAT, so the traffic stays on the AWS network. I use them for three reasons: security, because an isolated subnet with no internet path can still reach S3 and Secrets Manager; cost, because a gateway endpoint is free and takes that traffic off the NAT's per-GB charge; and control, because an endpoint policy can restrict access to specific buckets or my own organisation, which stops exfiltration even from an instance with valid credentials. The two gotchas are that private DNS needs enableDnsHostnames on the VPC, and that interface endpoints need a security group allowing 443 from the app tier."</div>
</div>`,
          examples: [
            `# ---------- Gateway endpoint for S3: free, and immediately cuts the NAT bill ----------
aws ec2 create-vpc-endpoint --vpc-id vpc-0a1b2c3d \\
  --vpc-endpoint-type Gateway \\
  --service-name com.amazonaws.ap-south-1.s3 \\
  --route-table-ids rtb-private1a rtb-private1b rtb-private1c

# It works by adding a PREFIX LIST route - look at the route table afterwards:
aws ec2 describe-route-tables --route-table-ids rtb-private1a \\
  --query 'RouteTables[].Routes[?DestinationPrefixListId!=null]'
# [{"DestinationPrefixListId": "pl-78a54011", "GatewayId": "vpce-0abc", "State": "active"}]

# ---------- Interface endpoint (PrivateLink): an ENI with a private IP ----------
aws ec2 create-vpc-endpoint --vpc-id vpc-0a1b2c3d \\
  --vpc-endpoint-type Interface \\
  --service-name com.amazonaws.ap-south-1.secretsmanager \\
  --subnet-ids subnet-app1a subnet-app1b \\
  --security-group-ids sg-endpoints \\
  --private-dns-enabled

# The SG is NOT optional - without 443 inbound, every call silently times out
aws ec2 authorize-security-group-ingress --group-id sg-endpoints \\
  --ip-permissions 'IpProtocol=tcp,FromPort=443,ToPort=443,UserIdGroupPairs=[{GroupId=sg-app,Description="app tier to endpoints"}]'

# ---------- Verify from an instance that DNS now points INSIDE the VPC ----------
#   $ dig +short secretsmanager.ap-south-1.amazonaws.com
#   10.0.16.42          <- private IP = endpoint working
#   52.x.x.x            <- public IP  = private DNS NOT in effect; check enableDnsHostnames

# ---------- Endpoint policy: a data perimeter the IAM policy cannot give you ----------
cat > s3-endpoint-policy.json <<'JSON'
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": "*",
    "Action": ["s3:GetObject", "s3:PutObject", "s3:ListBucket"],
    "Resource": ["arn:aws:s3:::my-prod-data", "arn:aws:s3:::my-prod-data/*"],
    "Condition": {"StringEquals": {"aws:PrincipalOrgID": "o-exampleorgid"}}
  }]
}
JSON
aws ec2 modify-vpc-endpoint --vpc-endpoint-id vpce-0abc --policy-document file://s3-endpoint-policy.json
# Now even a compromised instance with valid credentials cannot PUT to an
# attacker's bucket through this endpoint.

# ---------- The mirror control, on the bucket side ----------
# {"Effect":"Deny","Principal":"*","Action":"s3:*",
#  "Resource":["arn:aws:s3:::my-prod-data","arn:aws:s3:::my-prod-data/*"],
#  "Condition":{"StringNotEquals":{"aws:SourceVpce":"vpce-0abc"}}}
# => the bucket is reachable ONLY from this VPC endpoint.

# ---------- The set most private workloads actually need ----------
# GATEWAY (free)   : s3, dynamodb
# INTERFACE        : ecr.api, ecr.dkr, logs, monitoring, secretsmanager, kms,
#                    sts, ssm, ssmmessages, ec2messages   <- last three = Session Manager
for S in ecr.api ecr.dkr logs monitoring secretsmanager kms sts ssm ssmmessages ec2messages; do
  aws ec2 create-vpc-endpoint --vpc-id vpc-0a1b2c3d --vpc-endpoint-type Interface \\
    --service-name com.amazonaws.ap-south-1.$S \\
    --subnet-ids subnet-app1a subnet-app1b --security-group-ids sg-endpoints --private-dns-enabled
done
# NOTE: ECR needs ecr.api AND ecr.dkr AND the S3 gateway endpoint (layers live in S3).

# ---------- What services can I even create an endpoint for? ----------
aws ec2 describe-vpc-endpoint-services --query 'ServiceNames' --output text | tr '\\t' '\\n' | sort`,
          ],
          questions: [
            {
              question: "What problem does a VPC endpoint solve?",
              solution: "<p>By default, calling an AWS service API from your VPC resolves a <strong>public endpoint</strong>, so the traffic leaves through an internet gateway or NAT gateway. A VPC endpoint provides <strong>private connectivity to the service over the AWS network</strong>, solving three things at once. <strong>Security:</strong> traffic never touches the internet, so a fully isolated subnet with no IGW and no NAT can still use S3, KMS and Secrets Manager. <strong>Cost:</strong> gateway endpoints are free and remove that traffic from the NAT's per-GB processing charge — usually the largest single NAT saving available. <strong>Control:</strong> an <strong>endpoint policy</strong> can restrict access to specific buckets or to your own organisation, giving a network-level data perimeter that IAM alone cannot provide.</p>",
            },
            {
              question: "How does an endpoint policy differ from an IAM policy, and why does it matter for exfiltration?",
              solution: "<p>An <strong>IAM policy</strong> governs what a <em>principal</em> may do; an <strong>endpoint policy</strong> is a resource policy on the endpoint governing what may pass <em>through that network path</em>, regardless of who the caller is. That difference is exactly what blocks exfiltration: an instance with legitimate S3 credentials could otherwise write your data to an attacker-controlled bucket. An endpoint policy restricting <code>Resource</code> to your bucket ARNs, or adding <code>aws:PrincipalOrgID</code>, means such a request is refused at the endpoint even though IAM would have allowed it. Pair it with the bucket-side condition <code>aws:SourceVpce</code> and you get both halves of the perimeter: your VPC can only reach your buckets, and your buckets are only reachable from your VPC.</p>",
            },
            {
              question: "You created an interface endpoint but traffic still goes over the NAT gateway. Why?",
              solution: "<p>Most likely <strong>private DNS is not in effect</strong>. An interface endpoint only intercepts traffic because AWS overrides the service's DNS name to resolve to the endpoint's private IP — and that requires <code>--private-dns-enabled</code> on the endpoint <em>plus</em> both <strong><code>enableDnsSupport</code> and <code>enableDnsHostnames</code></strong> on the VPC. <code>enableDnsHostnames</code> defaults to <strong>false in a custom VPC</strong>, so the endpoint sits there being billed while the service name keeps resolving to a public IP. Verify from an instance with <code>dig secretsmanager.&lt;region&gt;.amazonaws.com</code> — a private 10.x address means it is working, a public address means it is not. Other causes: the endpoint was created in different subnets than the workload, or its <strong>security group does not allow 443</strong> from the app tier, in which case calls time out rather than fall back.</p>",
            },
            {
              question: "Which endpoints does a private EKS or ECS cluster typically need?",
              solution: "<p>An <strong>S3 gateway endpoint</strong> (free — ECR image <em>layers</em> are stored in S3, so without it image pulls still traverse the NAT), plus interface endpoints for <strong><code>ecr.api</code> and <code>ecr.dkr</code></strong> (both are required; configuring only one is a classic half-done setup), <strong><code>logs</code></strong> for CloudWatch Logs, <strong><code>sts</code></strong> for IRSA/task-role credentials, and typically <strong><code>secretsmanager</code></strong>, <strong><code>kms</code></strong> and <strong><code>monitoring</code></strong>. If you want Session Manager access without a bastion, add <strong><code>ssm</code>, <code>ssmmessages</code> and <code>ec2messages</code></strong>. Configured fully, this is often the largest NAT cost reduction available in a container account, since image pulls dominate egress.</p>",
            },
            {
              question: "Can a VPC endpoint in one VPC be used from a peered VPC or from on-premises?",
              solution: "<p>It depends on the type. A <strong>gateway endpoint (S3/DynamoDB) cannot</strong> — it is a route-table construct serving only its own VPC, and the <em>no edge-to-edge routing</em> rule means a peered VPC, VPN or Direct Connect connection cannot use it. An <strong>interface endpoint can</strong>, because it is simply an ENI with a private IP: reachable over VPC peering, Transit Gateway, VPN and Direct Connect. That asymmetry drives a common design — a <strong>shared-services VPC</strong> hosting interface endpoints that many spoke VPCs and on-prem networks use, avoiding per-VPC endpoint charges, while each VPC keeps its own free S3 gateway endpoint locally.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/vpc/latest/privatelink/concepts.html",
            "https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-access.html",
            "https://docs.aws.amazon.com/vpc/latest/privatelink/gateway-endpoints.html",
          ],
        },
        {
          topic: "Gateway Endpoint vs Interface Endpoint",
          tags: ["aws", "vpc", "gateway-endpoint", "interface-endpoint", "privatelink", "prefix-list", "comparison"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Both give private access to AWS services, but they are built on completely different mechanisms — one is a <strong>routing trick</strong>, the other is <strong>an ENI in your subnet</strong>. Almost every difference between them follows from that.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Gateway endpoint</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Services: S3 and DynamoDB only.</strong> That list has not grown and will not.</li>
  <li><strong>Free.</strong> No hourly charge, no per-GB charge.</li>
  <li><strong>Implemented as a route-table entry</strong>: a managed <strong>prefix list</strong> (e.g. <code>pl-78a54011</code>, which expands to S3's IP ranges in that region) targeting <code>vpce-xxxx</code>. You attach it to route tables, not to subnets.</li>
  <li><strong>Consumes no IP addresses</strong> and creates no ENI.</li>
  <li><strong>DNS is unchanged</strong> — the public service name still resolves to a public IP; the <em>routing</em> is what diverts the traffic. That is why it works without any DNS attribute changes.</li>
  <li><strong>Only usable from inside its own VPC.</strong> Not from a peered VPC, not over VPN or Direct Connect — the no-edge-to-edge-routing rule.</li>
  <li>Supports an <strong>endpoint policy</strong>.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Interface endpoint (AWS PrivateLink)</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Services: almost everything</strong> — including S3 (an interface endpoint for S3 also exists, for the cases a gateway endpoint cannot serve), plus SaaS partner services and services you publish yourself.</li>
  <li><strong>Costs</strong> roughly <strong>$0.01 per hour per AZ</strong> (~$7/month/AZ) <strong>plus ~$0.01 per GB</strong>.</li>
  <li><strong>Implemented as an ENI with a private IP</strong> in each subnet you choose. It therefore <strong>consumes subnet IP addresses</strong> and <strong>requires a security group</strong> allowing 443.</li>
  <li><strong>Changes DNS.</strong> With <code>--private-dns-enabled</code>, the normal service hostname resolves to the endpoint's private IP, so application code needs no change — but this requires <code>enableDnsSupport</code> <em>and</em> <code>enableDnsHostnames</code> on the VPC.</li>
  <li><strong>Reachable from outside the VPC</strong>: over peering, Transit Gateway, VPN and Direct Connect. It is just an IP address.</li>
  <li>Supports an <strong>endpoint policy</strong> (for AWS services).</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Choosing between them</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>For <strong>S3 and DynamoDB from inside the VPC</strong>: use the <strong>gateway endpoint</strong>. It is free — there is no argument.</li>
  <li>For <strong>S3 from on-premises, or from a peered VPC</strong>: you need the <strong>interface endpoint</strong>, because a gateway endpoint cannot be reached from outside its VPC. Many accounts run <em>both</em>.</li>
  <li>For <strong>every other AWS service</strong>: interface endpoint, or keep paying the NAT.</li>
  <li><strong>The economics:</strong> an interface endpoint costs ~$7/AZ/month plus $0.01/GB versus NAT's $0.045/GB — so it pays for itself at a few hundred GB per month <em>per endpoint</em>. Measure your NAT's <code>BytesOutToDestination</code> before creating twenty of them.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Two details people miss</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>The <strong>prefix list</strong> behind a gateway endpoint is also useful on its own: you can reference <code>pl-xxxx</code> as a <strong>destination in a security group rule</strong> to allow egress to S3 without hardcoding IP ranges that change.</li>
  <li>Because a gateway endpoint works by routing rather than DNS, and an interface endpoint works by DNS rather than routing, the <strong>debugging methods differ</strong>: for a gateway endpoint you inspect the route table for the prefix-list route; for an interface endpoint you run <code>dig</code> on the service name and check whether you get a private address.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "A gateway endpoint works only for S3 and DynamoDB, is free, and is implemented as a prefix-list route in your route tables — it creates no ENI, consumes no IPs, changes no DNS, and cannot be used from a peered VPC or from on-premises. An interface endpoint is PrivateLink: an ENI with a private IP in each subnet, so it needs a security group allowing 443, consumes subnet addresses, overrides the service's DNS name so code needs no change, and is reachable over peering, Transit Gateway and Direct Connect. It covers nearly every service and costs about seven dollars per AZ per month plus a cent per GB. So: gateway endpoints for S3 and DynamoDB inside the VPC, interface endpoints for everything else — and both for S3 when on-prem also needs private access."</div>
</div>`,
          examples: [
            `# ================= GATEWAY: a route, not an ENI =================
aws ec2 create-vpc-endpoint --vpc-id vpc-0a1b2c3d --vpc-endpoint-type Gateway \\
  --service-name com.amazonaws.ap-south-1.s3 \\
  --route-table-ids rtb-private1a rtb-private1b rtb-private1c     # <- ROUTE TABLES

# Proof it is pure routing:
aws ec2 describe-route-tables --route-table-ids rtb-private1a \\
  --query 'RouteTables[].Routes[?DestinationPrefixListId!=null]'
# [{"DestinationPrefixListId":"pl-78a54011","GatewayId":"vpce-0s3","State":"active"}]
aws ec2 describe-network-interfaces --filters Name=vpc-id,Values=vpc-0a1b2c3d \\
  --query 'NetworkInterfaces[?InterfaceType==\`vpc_endpoint\`].NetworkInterfaceId'
# []        <- no ENI created, no subnet IPs consumed
# And DNS is untouched: s3.ap-south-1.amazonaws.com still resolves to a PUBLIC IP.
# The route is what sends the packet to the endpoint instead of the NAT.

# The prefix list is reusable in security groups - no hardcoded S3 IP ranges:
aws ec2 describe-managed-prefix-lists --filters Name=prefix-list-name,Values=com.amazonaws.ap-south-1.s3
aws ec2 authorize-security-group-egress --group-id sg-app \\
  --ip-permissions 'IpProtocol=tcp,FromPort=443,ToPort=443,PrefixListIds=[{PrefixListId=pl-78a54011,Description="S3"}]'

# ================= INTERFACE: an ENI, a security group, and DNS =================
aws ec2 create-vpc-endpoint --vpc-id vpc-0a1b2c3d --vpc-endpoint-type Interface \\
  --service-name com.amazonaws.ap-south-1.kms \\
  --subnet-ids subnet-app1a subnet-app1b \\                        # <- SUBNETS
  --security-group-ids sg-endpoints \\
  --private-dns-enabled

aws ec2 describe-vpc-endpoints --filters Name=service-name,Values=com.amazonaws.ap-south-1.kms \\
  --query 'VpcEndpoints[].{Id:VpcEndpointId,Type:VpcEndpointType,ENIs:NetworkInterfaceIds,
           PrivateDNS:PrivateDnsEnabled,DNS:DnsEntries[0].DnsName}'
# ENIs: ["eni-0aa","eni-0bb"]   <- one per subnet, each holding a private IP

# From an instance - THIS is how you debug an interface endpoint:
#   $ dig +short kms.ap-south-1.amazonaws.com
#   10.0.16.87        <- private = working
#   13.234.x.x        <- public  = private DNS not in effect (check enableDnsHostnames)

# ================= THE DECISION, AS NUMBERS =================
# 500 GB/month of S3 traffic from private subnets:
#   via NAT gateway      : 500 * $0.045                 = $22.50/month
#   via gateway endpoint : $0.00                        = FREE      <- obvious win
#
# 500 GB/month to Secrets Manager + KMS + CloudWatch Logs, 2 AZs:
#   via NAT gateway      : 500 * $0.045                 = $22.50/month
#   via 3 interface eps  : 3 * 2 * $7.30 + 500 * $0.01  = $48.80/month
#   -> at THIS volume the NAT is cheaper. Measure before you build twenty endpoints.

# Measure first:
aws cloudwatch get-metric-statistics --namespace AWS/NATGateway \\
  --metric-name BytesOutToDestination --dimensions Name=NatGatewayId,Value=nat-0aaa \\
  --start-time 2026-08-14T00:00:00Z --end-time 2026-09-14T00:00:00Z \\
  --period 86400 --statistics Sum

# ================= BOTH, for S3, when on-prem also needs private access =================
# gateway endpoint  -> free path for everything inside the VPC
# interface endpoint-> reachable over Direct Connect / VPN / peering (gateway is not)`,
          ],
          questions: [
            {
              question: "What are the mechanical differences between a gateway and an interface endpoint?",
              solution: "<p>A <strong>gateway endpoint</strong> is a <strong>route-table entry</strong>: a managed prefix list targeting <code>vpce-xxxx</code>. It creates no ENI, consumes no subnet IPs, takes no security group, does not alter DNS, and is <strong>free</strong> — but it exists only for <strong>S3 and DynamoDB</strong> and is usable only from within its own VPC. An <strong>interface endpoint</strong> is <strong>PrivateLink</strong>: an <strong>ENI with a private IP</strong> in each subnet you select, so it consumes addresses, <strong>requires a security group allowing 443</strong>, and overrides the service hostname via private DNS so application code needs no change. It supports nearly every service, is reachable from peered VPCs and on-premises, and costs ~$0.01/hour/AZ plus ~$0.01/GB.</p>",
            },
            {
              question: "Which AWS services support gateway endpoints?",
              solution: "<p>Only <strong>Amazon S3 and DynamoDB</strong> — and that list is not growing; AWS has standardised on PrivateLink for everything else. The practical rule is therefore simple: for S3 and DynamoDB traffic originating <em>inside</em> the VPC, always create the gateway endpoint, because it is free and removes that traffic from the NAT gateway's per-GB charge with no downside. For every other service — Secrets Manager, KMS, ECR, CloudWatch Logs, STS, SSM — an interface endpoint is the only option. Note that S3 <em>also</em> has an interface endpoint, which you add when access must come from on-premises or a peered VPC, since a gateway endpoint cannot serve those.</p>",
            },
            {
              question: "Can on-premises servers use a gateway endpoint over Direct Connect?",
              solution: "<p><strong>No.</strong> A gateway endpoint is a route-table construct that only applies to traffic originating inside its own VPC; the <strong>no edge-to-edge routing</strong> rule means traffic arriving over Direct Connect, VPN, peering or Transit Gateway cannot use it. For private S3 access from on-premises you need the <strong>S3 interface endpoint</strong>, which is just an ENI with a private IP and is therefore reachable across all of those paths. A typical hybrid account runs <strong>both</strong>: the free gateway endpoint for in-VPC traffic, and an interface endpoint for on-prem and peered consumers — usually hosted in a shared-services VPC so you are not paying for one per spoke.</p>",
            },
            {
              question: "How do you decide whether an interface endpoint is worth the cost?",
              solution: "<p>Compare it against what the NAT gateway is charging for the same traffic. An interface endpoint costs roughly <strong>$7/AZ/month plus $0.01/GB</strong>; NAT charges <strong>$0.045/GB</strong> processed on top of its own hourly fee. In two AZs the endpoint's fixed cost is ~$14.60/month, so it breaks even at roughly <strong>400-500 GB/month for that one service</strong>. Below that, the NAT is cheaper. So measure first — pull <code>BytesOutToDestination</code> from the NAT's CloudWatch metrics and break it down by destination — then create endpoints for the heavy hitters, which in container accounts are almost always <strong>ECR plus S3</strong>. There are also non-cost reasons that can override the arithmetic: an isolated subnet with no NAT at all, or a compliance requirement that traffic never traverse the internet.</p>",
            },
            {
              question: "How do you debug each type when it appears not to be working?",
              solution: "<p>They fail differently because they work differently. For a <strong>gateway endpoint</strong>, the mechanism is <em>routing</em>: check that the endpoint is attached to the route table associated with the workload's subnet, and that a <code>DestinationPrefixListId → vpce-xxxx</code> route is present and <code>active</code>. DNS is irrelevant — the public name still resolves publicly. For an <strong>interface endpoint</strong>, the mechanism is <em>DNS</em>: run <code>dig</code> on the service hostname from an instance and confirm you get a <strong>private</strong> address; a public one means private DNS is not in effect, usually because <code>enableDnsHostnames</code> is false on the VPC. If DNS resolves privately but calls hang, the cause is nearly always the endpoint's <strong>security group not allowing 443</strong> from the app tier.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/vpc/latest/privatelink/gateway-endpoints.html",
            "https://docs.aws.amazon.com/vpc/latest/privatelink/create-interface-endpoint.html",
            "https://docs.aws.amazon.com/vpc/latest/userguide/working-with-aws-managed-prefix-lists.html",
          ],
        },
        {
          topic: "Bastion Host / Jump Box — and Why You Probably Should Not Use One",
          tags: ["aws", "vpc", "bastion", "jump-box", "session-manager", "ssh", "security"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  A <strong>bastion host</strong> (or jump box) is a hardened instance in a <strong>public subnet</strong> that serves as the single, controlled entry point for administrative access into <strong>private subnets</strong>. You SSH to the bastion, and from there to private instances. It is the classic answer to "how do you administer a server that has no public IP?" — and it is increasingly the <em>wrong</em> answer.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The classic design</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Bastion in a <strong>public subnet</strong> with an Elastic IP; private instances have <strong>no public IPs</strong>.</li>
  <li><code>sg-bastion</code>: inbound 22 <strong>only from your corporate CIDR</strong> — never <code>0.0.0.0/0</code>.</li>
  <li><code>sg-private</code>: inbound 22 <strong>from sg-bastion</strong> (a security group reference, not an IP), so only the bastion can reach them.</li>
  <li>Use <strong>SSH agent forwarding</strong> or <code>ProxyJump</code> so private keys never sit on the bastion.</li>
  <li>Keep it minimal and disposable: no application software, patched automatically, replaced rather than maintained.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Why it is a liability</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>It is an <strong>internet-facing host with SSH open</strong> — permanently scanned, and a single misconfiguration or unpatched CVE away from being the way in.</li>
  <li>It requires managing <strong>SSH keys</strong>: distribution, rotation, offboarding. Keys outlive employees.</li>
  <li><strong>Auditing is weak.</strong> You know a TCP connection happened; you do not natively know what commands were run unless you build session recording yourself.</li>
  <li>It is <strong>infrastructure to patch, monitor and pay for</strong>, whose entire purpose is to be a door.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The modern answers, in order of preference</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>AWS Systems Manager Session Manager</strong> — the default recommendation. The instance opens an <em>outbound</em> connection to SSM, so there is <strong>no inbound rule, no open port, no bastion, no SSH key, and no public IP</strong> required. Access is governed by <strong>IAM</strong>, every session is logged to <strong>CloudTrail</strong>, and session <em>content</em> can be recorded to S3 or CloudWatch Logs. It works in a fully isolated subnet if you add the <code>ssm</code>, <code>ssmmessages</code> and <code>ec2messages</code> interface endpoints. It also supports port forwarding and SSH-over-SSM when you need scp or tunnels.</li>
  <li><strong>EC2 Instance Connect Endpoint</strong> — lets you SSH to a private instance through an AWS-managed endpoint in your VPC, no bastion and no public IP, with IAM-based access and short-lived keys.</li>
  <li><strong>AWS Client VPN</strong> — when engineers need broad network access rather than shell on one host.</li>
  <li><strong>A bastion</strong> — when you genuinely need raw TCP to something SSM cannot reach, a third-party tool demands it, or you are in a constrained/regulated environment that mandates a jump host.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">If you must run one, harden it</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Source-restrict SSH to the corporate CIDR or a VPN range; consider opening it <strong>on demand</strong> via automation rather than permanently.</li>
  <li>Run it in an <strong>Auto Scaling group</strong> so it is replaced, not repaired, and patch via SSM Patch Manager.</li>
  <li>Ship <code>auth.log</code> and shell history to CloudWatch Logs; alarm on failed logins.</li>
  <li><strong>Never store private keys on it</strong> — use <code>ssh -J</code> / <code>ProxyJump</code>.</li>
  <li>Best of both: give the bastion <strong>no inbound rules at all</strong> and reach it via Session Manager, then jump onward. You keep the jump-host pattern without an internet-facing SSH port.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "A bastion is a hardened host in a public subnet that is the single controlled entry point to private subnets: SSH inbound only from the corporate CIDR, and the private instances allow 22 only from the bastion's security group by reference. But I would not build one by default — I use <strong>SSM Session Manager</strong>, where the instance makes an outbound connection to SSM, so there is no inbound port, no public IP, no SSH key to rotate, access is controlled by IAM, and every session is logged to CloudTrail with optional full session recording. It works in fully isolated subnets with the ssm, ssmmessages and ec2messages interface endpoints. I would keep a bastion only for raw TCP that SSM cannot handle or a regulatory requirement — and even then I would give it no inbound rules and reach it through Session Manager."</div>
</div>`,
          examples: [
            `# ================= THE PREFERRED ANSWER: no bastion at all =================
# Instance needs: an IAM role with AmazonSSMManagedInstanceCore + the SSM agent.
# NO inbound rules. NO public IP. NO key pair.
aws ssm start-session --target i-0privateinstance

# Port-forward a private database to your laptop through SSM
aws ssm start-session --target i-0privateinstance \\
  --document-name AWS-StartPortForwardingSessionToRemoteHost \\
  --parameters '{"host":["prod-db.abc.ap-south-1.rds.amazonaws.com"],"portNumber":["5432"],"localPortNumber":["5432"]}'
# psql -h localhost -p 5432 ... - no bastion, no open port, no key.

# Works in a FULLY ISOLATED subnet (no IGW, no NAT) with three endpoints:
for S in ssm ssmmessages ec2messages; do
  aws ec2 create-vpc-endpoint --vpc-id vpc-0a1b2c3d --vpc-endpoint-type Interface \\
    --service-name com.amazonaws.ap-south-1.$S \\
    --subnet-ids subnet-app1a subnet-app1b \\
    --security-group-ids sg-endpoints --private-dns-enabled
done

# Who connected to what, and when - natively, from CloudTrail:
aws cloudtrail lookup-events --lookup-attributes AttributeKey=EventName,AttributeValue=StartSession \\
  --query 'Events[].{User:Username,Time:EventTime}' --output table
# Record session CONTENT to S3/CloudWatch via an SSM session document preference.

# ================= IF YOU MUST RUN A BASTION =================
# sg-bastion: 22 from the CORPORATE CIDR only - never 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-id sg-bastion \\
  --ip-permissions 'IpProtocol=tcp,FromPort=22,ToPort=22,IpRanges=[{CidrIp=203.0.113.0/24,Description="office"}]'

# sg-private: 22 ONLY from the bastion's SG (reference, not IP - survives replacement)
aws ec2 authorize-security-group-ingress --group-id sg-private \\
  --ip-permissions 'IpProtocol=tcp,FromPort=22,ToPort=22,UserIdGroupPairs=[{GroupId=sg-bastion,Description="via bastion"}]'

# Connect WITHOUT ever copying a private key onto the bastion:
#   ssh -J ec2-user@<bastion-eip> ec2-user@10.0.16.9
# or in ~/.ssh/config:
#   Host bastion
#     HostName 52.66.10.20
#     User ec2-user
#   Host 10.0.*
#     ProxyJump bastion
#     User ec2-user
# NEVER: scp ~/.ssh/id_rsa ec2-user@bastion:   <- one compromise = every host

# Best of both: a bastion with NO inbound rules, reached via SSM, then jump onward
aws ssm start-session --target i-0bastion

# ================= THE AUDIT =================
# Any security group anywhere allowing 22 from the world:
aws ec2 describe-security-groups \\
  --query 'SecurityGroups[?IpPermissions[?FromPort==\`22\` && IpRanges[?CidrIp==\`0.0.0.0/0\`]]].{SG:GroupId,Name:GroupName,VPC:VpcId}' \\
  --output table

# EC2 Instance Connect Endpoint - SSH to a private instance, no bastion, no public IP
aws ec2 create-instance-connect-endpoint --subnet-id subnet-app1a
# aws ec2-instance-connect ssh --instance-id i-0private --connection-type eice`,
          ],
          questions: [
            {
              question: "How would you set up a bastion host properly?",
              solution: "<p>Put a minimal, hardened instance in a <strong>public subnet</strong> with an Elastic IP. Its security group allows <strong>inbound 22 only from the corporate CIDR or VPN range</strong> — never <code>0.0.0.0/0</code>. The private instances' security group allows <strong>22 from the bastion's security group by reference</strong>, not by IP, so it keeps working when the bastion is replaced. Engineers connect with <strong><code>ssh -J</code> / ProxyJump or agent forwarding</strong> so private keys never land on the bastion. Run it in an <strong>Auto Scaling group</strong> so it is replaced rather than repaired, patch via SSM Patch Manager, ship <code>auth.log</code> to CloudWatch Logs, and alarm on failed logins. Ideally give it no inbound rules at all and reach it through Session Manager.</p>",
            },
            {
              question: "Why is Session Manager preferred over a bastion?",
              solution: "<p>Because it removes the attack surface rather than hardening it. The instance makes an <strong>outbound</strong> connection to the SSM service, so there is <strong>no inbound rule, no open SSH port, no public IP, and no SSH key</strong> to distribute, rotate or revoke when someone leaves. Access is governed by <strong>IAM policies</strong> — the same system as everything else, so you can scope it by tag, require MFA, or restrict by time — and every session start is recorded in <strong>CloudTrail</strong>, with optional <strong>full session recording</strong> to S3 or CloudWatch Logs, which a bastion gives you only if you build it. It also works in a completely isolated subnet once you add the <code>ssm</code>, <code>ssmmessages</code> and <code>ec2messages</code> interface endpoints, and supports port forwarding for database access.</p>",
            },
            {
              question: "A private instance has no internet access at all. Can you still use Session Manager?",
              solution: "<p><strong>Yes</strong> — this is one of its best properties. The SSM agent needs to reach the SSM service, and you can provide that privately by creating three <strong>interface VPC endpoints</strong>: <code>com.amazonaws.&lt;region&gt;.ssm</code>, <code>ssmmessages</code> (the session data channel) and <code>ec2messages</code>. Add <code>s3</code> and <code>logs</code> endpoints if you want session logging or patching. The instance also needs an <strong>IAM instance profile containing <code>AmazonSSMManagedInstanceCore</code></strong>, the agent running, and the endpoints' security group must allow <strong>443</strong> from the instance. With that, a subnet with no IGW, no NAT and no public IPs remains fully administrable — which is the strongest form of the pattern.</p>",
            },
            {
              question: "What are the security risks of a bastion host?",
              solution: "<p>It is, by design, an <strong>internet-facing host with SSH exposed</strong> — continuously scanned, and one unpatched CVE or misconfigured rule away from being the entry point to the whole private tier. It forces <strong>SSH key management</strong>: distribution, rotation and revocation, and keys frequently outlive the people who held them. Its <strong>audit trail is weak</strong> — you see that a connection happened, not what was executed, unless you build session recording yourself. And if someone copies a private key onto it (a depressingly common shortcut), compromising the bastion compromises every host it can reach. Mitigations: source-restrict inbound, ProxyJump instead of stored keys, ASG replacement, log shipping, and ideally no inbound rules at all with access via Session Manager.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html",
            "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/connect-using-eice.html",
            "https://docs.aws.amazon.com/systems-manager/latest/userguide/setup-create-vpc.html",
          ],
        },
        {
          topic: "Three-Tier VPC Design — The Default Answer to 'Design the Network for X'",
          tags: ["aws", "vpc", "architecture", "three-tier", "high-availability", "design", "interview"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Almost any "design the network for X" question is answered with the same shape: <strong>a public tier holding only the load balancer, a private tier holding the application, and an isolated tier holding the data</strong>, each replicated across at least two Availability Zones. Learn it once and adapt the details.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The three tiers</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Public subnets</strong> (<code>10.0.0.0/24</code> per AZ — deliberately small). Route: <code>0.0.0.0/0 → igw</code>. Contents: <strong>only</strong> the ALB/NLB nodes and the NAT gateways. No application code ever runs here.</li>
  <li><strong>Private app subnets</strong> (<code>10.0.16.0/20</code> per AZ — deliberately large). Route: <code>0.0.0.0/0 → nat-&lt;that AZ&gt;</code>. Contents: EC2/ECS/EKS/Lambda ENIs. Sized big because ALB nodes, endpoint ENIs and EKS pods all consume IPs.</li>
  <li><strong>Isolated data subnets</strong> (<code>10.0.64.0/24</code> per AZ). Route: <code>local</code> only, plus gateway-endpoint prefix lists. Contents: RDS, ElastiCache, OpenSearch. <strong>No internet path in either direction.</strong></li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The security group chain — the part interviewers listen for</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><code>sg-alb</code> — inbound <strong>443 from 0.0.0.0/0</strong>.</li>
  <li><code>sg-app</code> — inbound <strong>8080 from sg-alb</strong>.</li>
  <li><code>sg-db</code> — inbound <strong>5432 from sg-app</strong>.</li>
  <li><code>sg-endpoints</code> — inbound <strong>443 from sg-app</strong>.</li>
</ul>
<p style="line-height: 1.75;">Each tier accepts traffic <em>only</em> from the tier above, expressed by <strong>security group reference</strong> rather than CIDR, so it survives scaling and instance replacement with no IP maintenance. Stated aloud, that chain <em>is</em> the security design.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Why three tiers and not two</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Blast radius.</strong> Compromising the ALB gets you nothing; compromising an app server still does not give network reach to the database beyond port 5432 from that one security group.</li>
  <li><strong>No accidental exposure.</strong> A database in a subnet with no internet route cannot be exposed by a mistaken security group or a stray public IP — the routing simply is not there.</li>
  <li><strong>Egress control.</strong> The app tier's outbound path is a NAT gateway you can monitor, restrict and replace with a filtering firewall.</li>
  <li><strong>It matches compliance language</strong> (PCI DSS network segmentation, and similar), which is often why the question is being asked at all.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The full build list</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>VPC</strong> <code>10.0.0.0/16</code>, DNS hostnames <em>and</em> DNS support enabled.</li>
  <li><strong>9 subnets</strong> — 3 tiers × 3 AZs (or 6 across 2 AZs at minimum).</li>
  <li><strong>1 IGW</strong>, attached. <strong>3 NAT gateways</strong>, one per AZ, each with an EIP.</li>
  <li><strong>5 route tables</strong> — 1 public, 3 private (one per AZ, each pointing at its own NAT), 1 isolated.</li>
  <li><strong>ALB</strong> across the public subnets; <strong>target group</strong> pointing at the app tier; <strong>ASG</strong> spanning the private app subnets.</li>
  <li><strong>RDS Multi-AZ</strong> in a DB subnet group built from the isolated subnets.</li>
  <li><strong>VPC endpoints</strong> — free S3/DynamoDB gateway endpoints on every private route table; interface endpoints for ECR, Secrets Manager, KMS, CloudWatch Logs, STS and the three SSM services.</li>
  <li><strong>Flow Logs</strong> to S3 or CloudWatch from day one; <strong>SSM Session Manager</strong> instead of a bastion.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">How to adapt it under follow-up questions</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>"Make it cheaper"</strong> → one NAT instead of three (state the AZ-failure and cross-AZ-cost trade-off), more VPC endpoints, single-AZ dev environments.</li>
  <li><strong>"Make it more available"</strong> → three AZs, NAT per AZ, RDS Multi-AZ, ASG minimum spread across zones, health checks at the ALB.</li>
  <li><strong>"Make it more secure"</strong> → isolated data tier with endpoints only, NACL guardrails on the data subnets, AWS Network Firewall for egress domain filtering, WAF on the ALB, VPC endpoint policies as a data perimeter, Flow Logs with alerting.</li>
  <li><strong>"Multiple environments"</strong> → separate <strong>accounts</strong> per environment (the real isolation boundary), non-overlapping CIDRs from IPAM, connected via Transit Gateway if they must talk.</li>
  <li><strong>"Global"</strong> → the same VPC per region, Route 53 latency or failover routing, CloudFront in front, cross-region replication for data.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "I build one VPC with a /16 and three tiers per AZ across at least two AZs: small public subnets holding only the load balancer and NAT gateways, large private subnets for the application, and isolated subnets for the database with no internet route at all. Five route tables — one public, one private per AZ so each uses its own NAT, one isolated. The security groups chain by reference: the ALB group takes 443 from the internet, the app group takes 8080 from the ALB group, the database group takes 5432 from the app group. I add a free S3 gateway endpoint plus interface endpoints for ECR and Secrets Manager to keep AWS traffic off the NAT, use Session Manager instead of a bastion, and turn on Flow Logs from day one."</div>
</div>`,
          examples: [
            `# ================= THE TOPOLOGY, ON ONE SCREEN =================
#                        Internet
#                           |
#                        [ IGW ]                       (VPC-attached, free)
#                           |
#   PUBLIC   10.0.0.0/24 | 10.0.1.0/24 | 10.0.2.0/24        rtb-public -> igw
#            [   ALB nodes   ]  [ nat-1a ] [ nat-1b ] [ nat-1c ]
#                           |                    \\
#                    443 -> 8080                  outbound only
#                           v                      v
#   APP      10.0.16.0/20 | 10.0.32.0/20 | 10.0.48.0/20     rtb-private<AZ> -> nat-<AZ>
#            [ ASG: EC2 / ECS tasks / EKS nodes / Lambda ENIs ]
#                           |
#                    5432 (sg-app only)
#                           v
#   DATA     10.0.64.0/24 | 10.0.65.0/24 | 10.0.66.0/24     rtb-isolated -> local ONLY
#            [ RDS Multi-AZ ] [ ElastiCache ]
#                           \\__ S3/DynamoDB via gateway endpoint (prefix-list route)
#
#   AZ:        ap-south-1a  |  ap-south-1b  |  ap-south-1c
#   Reserved:  10.0.128.0/17 left unallocated for growth

# ================= THE SECURITY GROUP CHAIN =================
aws ec2 authorize-security-group-ingress --group-id sg-alb \\
  --ip-permissions 'IpProtocol=tcp,FromPort=443,ToPort=443,IpRanges=[{CidrIp=0.0.0.0/0,Description="public https"}]'
aws ec2 authorize-security-group-ingress --group-id sg-app \\
  --ip-permissions 'IpProtocol=tcp,FromPort=8080,ToPort=8080,UserIdGroupPairs=[{GroupId=sg-alb,Description="from ALB"}]'
aws ec2 authorize-security-group-ingress --group-id sg-db \\
  --ip-permissions 'IpProtocol=tcp,FromPort=5432,ToPort=5432,UserIdGroupPairs=[{GroupId=sg-app,Description="from app"}]'
aws ec2 authorize-security-group-ingress --group-id sg-endpoints \\
  --ip-permissions 'IpProtocol=tcp,FromPort=443,ToPort=443,UserIdGroupPairs=[{GroupId=sg-app,Description="app to endpoints"}]'
# Nothing anywhere says "10.0.16.0/20". Scaling, replacement and AZ moves all just work.

# ================= THE PIECES THAT MAKE IT REAL =================
# ALB across the PUBLIC subnets, targets in the PRIVATE ones
aws elbv2 create-load-balancer --name prod-alb --type application --scheme internet-facing \\
  --subnets subnet-pub1a subnet-pub1b subnet-pub1c --security-groups sg-alb
aws elbv2 create-target-group --name app-tg --protocol HTTP --port 8080 \\
  --vpc-id vpc-0a1b2c3d --target-type instance --health-check-path /healthz

# RDS in the ISOLATED subnets, Multi-AZ, never publicly accessible
aws rds create-db-subnet-group --db-subnet-group-name prod-data \\
  --db-subnet-group-description "isolated data tier" \\
  --subnet-ids subnet-data1a subnet-data1b subnet-data1c
aws rds create-db-instance --db-instance-identifier prod-db --engine postgres \\
  --db-instance-class db.r6g.large --multi-az --no-publicly-accessible \\
  --db-subnet-group-name prod-data --vpc-security-group-ids sg-db

# Endpoints so the private tiers never need the NAT for AWS traffic
aws ec2 create-vpc-endpoint --vpc-id vpc-0a1b2c3d --vpc-endpoint-type Gateway \\
  --service-name com.amazonaws.ap-south-1.s3 \\
  --route-table-ids rtb-private1a rtb-private1b rtb-private1c rtb-isolated

# Flow Logs on day one
aws ec2 create-flow-logs --resource-type VPC --resource-ids vpc-0a1b2c3d \\
  --traffic-type ALL --log-destination-type s3 --log-destination arn:aws:s3:::my-flowlogs

# ================= THE THREE CHECKS THAT PROVE THE DESIGN =================
# 1) No data subnet has an internet route
aws ec2 describe-route-tables --route-table-ids rtb-isolated \\
  --query 'RouteTables[].Routes[?DestinationCidrBlock==\`0.0.0.0/0\`]'          # => []
# 2) Nothing in a private subnet holds a public IP
aws ec2 describe-instances --filters Name=subnet-id,Values=subnet-app1a \\
  --query 'Reservations[].Instances[?PublicIpAddress!=null].InstanceId'        # => []
# 3) No security group allows 22 or 3389 from the world
aws ec2 describe-security-groups --filters Name=vpc-id,Values=vpc-0a1b2c3d \\
  --query 'SecurityGroups[?IpPermissions[?(FromPort==\`22\`||FromPort==\`3389\`) && IpRanges[?CidrIp==\`0.0.0.0/0\`]]].GroupId'`,
          ],
          questions: [
            {
              question: "Design the network for a standard web application. Walk me through it.",
              solution: "<p>One VPC with a planned <code>10.0.0.0/16</code>, three tiers replicated across at least two (preferably three) AZs. <strong>Public subnets</strong>, small <code>/24</code>s routing <code>0.0.0.0/0 → igw</code>, holding <em>only</em> the ALB nodes and one NAT gateway per AZ. <strong>Private app subnets</strong>, large <code>/20</code>s routing <code>0.0.0.0/0</code> to that AZ's NAT, holding the Auto Scaling group or container workloads. <strong>Isolated data subnets</strong> with <code>local</code> routing only, holding RDS Multi-AZ via a DB subnet group. Five route tables: one public, one private per AZ, one isolated. Security groups chained by reference — ALB takes 443 from the internet, app takes 8080 from <code>sg-alb</code>, database takes 5432 from <code>sg-app</code>. Add a free S3 gateway endpoint plus interface endpoints for ECR, Secrets Manager and the SSM trio, use <strong>Session Manager</strong> instead of a bastion, and enable <strong>Flow Logs</strong> from the start.</p>",
            },
            {
              question: "Why put the database in its own subnet rather than just using a restrictive security group?",
              solution: "<p><strong>Defence in depth and a smaller blast radius.</strong> A security group is a single control that one mistaken rule, one automation bug, or one over-broad merge can undo. A subnet with <strong>no route to an internet gateway or NAT</strong> cannot reach the internet no matter what security group anyone attaches, because the path does not exist — routing is a structurally stronger guarantee than a rule. It also enables <strong>subnet-level NACL guardrails</strong> that hold regardless of security groups, keeps the data tier's IP ranges distinct for auditing and compliance segmentation (PCI DSS language maps directly onto it), and forces AWS-service access through <strong>VPC endpoints</strong>, where an endpoint policy gives you an explicit data perimeter.</p>",
            },
            {
              question: "How would you make this design cheaper, and what do you lose?",
              solution: "<p>The two big levers are NAT gateways and public IPv4. <strong>(1) Run one NAT gateway instead of three</strong> — saves ~$65/month, and costs you availability (an AZ failure removes egress everywhere) plus cross-AZ transfer charges in both directions; acceptable in dev, not in production. <strong>(2) Add VPC endpoints</strong> — a free S3/DynamoDB gateway endpoint plus interface endpoints for ECR and friends, which often removes the majority of NAT per-GB processing with no downside. <strong>(3) Two AZs instead of three</strong> — meets the ALB and RDS minimums and cuts a third of the zonal costs. <strong>(4) Turn off <code>MapPublicIpOnLaunch</code></strong> on private subnets, since every public IPv4 now costs ~$3.60/month. <strong>(5) In dev, a <code>t4g.nano</code> NAT instance</strong> instead of a gateway. Always state the trade-off aloud — the interviewer is testing whether you know what you are giving up.</p>",
            },
            {
              question: "Where do serverless components fit in this design?",
              solution: "<p><strong>Lambda</strong> attached to a VPC runs in your <strong>private app subnets</strong>, creating Hyperplane ENIs (one per subnet + security group combination) that consume subnet IPs — another reason to size app subnets generously. A Lambda in a VPC has <em>no</em> internet access unless the subnet routes to a NAT gateway, so give it <strong>VPC endpoints</strong> for the AWS services it calls. Only attach Lambda to a VPC when it must reach private resources such as RDS; otherwise leave it outside, where it is faster to scale and needs no ENIs. <strong>API Gateway</strong> and <strong>CloudFront</strong> sit outside the VPC entirely and reach in via a private integration, VPC Link, or the ALB in the public subnets. <strong>RDS Proxy</strong> belongs in the private subnets between Lambda and the database to avoid exhausting connections.</p>",
            },
            {
              question: "The interviewer says 'now make it multi-region'. What changes?",
              solution: "<p>The VPC design itself does not change — you <strong>replicate the same three-tier topology in each region</strong>, with <strong>non-overlapping CIDRs</strong> (e.g. <code>10.0.0.0/16</code> and <code>10.1.0.0/16</code>) allocated from IPAM so the regions can later be connected. Then add the cross-region layer: <strong>Route 53</strong> with latency-based or failover routing and health checks, <strong>CloudFront</strong> in front for static assets and edge termination, and data replication appropriate to the store — <strong>RDS cross-region read replicas or Aurora Global Database</strong>, <strong>DynamoDB global tables</strong>, <strong>S3 Cross-Region Replication</strong>. If the regions need private connectivity, use <strong>inter-region VPC peering</strong> (encrypted, on the AWS backbone, but MTU 1500 and no security group referencing) or <strong>Transit Gateway peering</strong> for a hub topology. State the hard part explicitly: the network is easy, <strong>data consistency and failover semantics are the real design problem</strong>.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-example-private-subnets-nat.html",
            "https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/introduction.html",
            "https://aws.amazon.com/architecture/well-architected/",
          ],
        },
        {
          topic: "VPC Flow Logs — Traffic Metadata for Troubleshooting and Auditing",
          tags: ["aws", "vpc", "flow-logs", "observability", "security", "athena", "troubleshooting"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>VPC Flow Logs</strong> capture <strong>metadata about IP traffic</strong> going to and from network interfaces in your VPC. They are the ground truth for "did the packet actually arrive, and was it accepted or rejected?" — the answer to most connectivity arguments, and the raw material for network security auditing.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Three levels, three destinations</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Scope:</strong> a <strong>VPC</strong> (covers every ENI in it, including ones created later — the usual choice), a <strong>subnet</strong>, or a single <strong>ENI</strong>.</li>
  <li><strong>Destination:</strong> <strong>CloudWatch Logs</strong> (queryable immediately with Logs Insights, alarmable, more expensive at volume), <strong>S3</strong> (cheap, query with Athena, the right choice for long retention and security analysis), or <strong>Kinesis Data Firehose</strong> (stream to a SIEM).</li>
  <li><strong>Traffic type:</strong> <code>ACCEPT</code>, <code>REJECT</code>, or <code>ALL</code>. Capture ALL — a REJECT-only log tells you nothing about a successful intrusion.</li>
  <li><strong>Aggregation interval:</strong> 1 or 10 minutes. Records are aggregated and delivered with a delay, so Flow Logs are <em>near</em>-real-time, not live packet capture.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Reading a record</h4>
<p style="line-height: 1.75;">The default (version 2) format is: <code>version account-id interface-id srcaddr dstaddr srcport dstport protocol packets bytes start end action log-status</code>. Two fields carry most of the value:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong><code>action</code></strong> — <code>ACCEPT</code> or <code>REJECT</code>, as decided by security groups and NACLs combined. A <code>REJECT</code> on the <em>return</em> leg (source = your server, destination port = a high ephemeral number) is the fingerprint of a stateless NACL missing its egress rule.</li>
  <li><strong><code>log-status</code></strong> — <code>OK</code>, <code>NODATA</code> (no traffic in the window — useful in itself), or <strong><code>SKIPDATA</code></strong> (records were <em>dropped</em> during aggregation; your data has holes, which matters if you are using it for security evidence).</li>
</ul>
<p style="line-height: 1.75;">Note <code>protocol</code> is the IANA number: <strong>6 = TCP, 17 = UDP, 1 = ICMP</strong>.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Custom formats — the fields worth adding</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong><code>flow-direction</code></strong> (ingress/egress) — removes all ambiguity about which leg you are looking at.</li>
  <li><strong><code>pkt-srcaddr</code> / <code>pkt-dstaddr</code></strong> — the <em>original</em> addresses before NAT. Essential behind a NAT gateway, where <code>srcaddr</code> is the NAT and you want to know which instance actually sent it.</li>
  <li><strong><code>traffic-path</code></strong> — whether egress went via the IGW, a NAT gateway, a VPC peering connection, or a gateway endpoint. Excellent for finding traffic that is expensively taking the NAT when an endpoint exists.</li>
  <li><strong><code>tcp-flags</code></strong> — distinguishes a SYN with no SYN-ACK (blocked/unreachable) from a completed handshake; the way to spot port scans.</li>
  <li><strong><code>instance-id</code>, <code>az-id</code>, <code>vpc-id</code>, <code>subnet-id</code></strong> — save you from joining against the EC2 API later.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What Flow Logs do NOT capture</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Packet contents.</strong> Metadata only. For payloads you need <strong>VPC Traffic Mirroring</strong>.</li>
  <li><strong>Why</strong> something was rejected. They say REJECT, never which rule did it — for that use <strong>Reachability Analyzer</strong>.</li>
  <li><strong>Traffic to the Amazon DNS server</strong> (Route 53 Resolver) — use <strong>Route 53 Resolver query logging</strong> instead.</li>
  <li><strong>Instance metadata</strong> traffic to <code>169.254.169.254</code>, and other link-local addresses.</li>
  <li><strong>DHCP</strong> traffic, Windows license activation, and traffic to the reserved VPC router address.</li>
  <li>Traffic between two ENIs where one is a <strong>Network Load Balancer</strong> node in certain configurations, and mirrored/ignored flows in some managed services.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What you actually use them for</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Connectivity debugging</strong> — did the packet arrive at all, and which leg was rejected?</li>
  <li><strong>Security investigation</strong> — who talked to a compromised host, what did it connect out to, and over what period. This is the evidence trail during an incident.</li>
  <li><strong>Detecting port scans and exfiltration</strong> — many REJECTs across many ports from one source; or unusually large <code>bytes</code> egressing to an unfamiliar address.</li>
  <li><strong>Cost analysis</strong> — find the chatty cross-AZ or NAT-traversing flows that are generating data-transfer charges, especially with <code>traffic-path</code>.</li>
  <li><strong>Compliance</strong> — many frameworks simply require network flow records to exist and be retained.</li>
  <li><strong>Feeding GuardDuty</strong>, which consumes Flow Logs (among other sources) to detect crypto-mining, C2 traffic and anomalous behaviour automatically.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Flow Logs capture metadata for IP flows — source, destination, ports, protocol, bytes, and crucially ACCEPT or REJECT — at the VPC, subnet or ENI level, delivered to CloudWatch Logs, S3 or Firehose. I enable them at the VPC level with traffic type ALL and send them to S3 for cheap retention, then query with Athena. They tell me whether a packet arrived and which leg was rejected — a REJECT whose source is my own server points straight at a stateless NACL — but they never tell me <em>which rule</em> blocked it, which is what Reachability Analyzer is for. They also capture no payloads, and omit Amazon DNS resolver traffic, instance metadata and DHCP. I add the custom fields pkt-srcaddr and traffic-path, because behind a NAT the source address is the NAT, and traffic-path shows me which egress route each flow took."</div>
</div>`,
          examples: [
            `# ---------- Enable at the VPC level, to S3, with a CUSTOM format ----------
aws ec2 create-flow-logs \\
  --resource-type VPC --resource-ids vpc-0a1b2c3d \\
  --traffic-type ALL \\
  --log-destination-type s3 \\
  --log-destination arn:aws:s3:::my-flowlogs-bucket/prod/ \\
  --max-aggregation-interval 60 \\
  --log-format '\${version} \${vpc-id} \${subnet-id} \${instance-id} \${interface-id} \${srcaddr} \${dstaddr} \${srcport} \${dstport} \${protocol} \${packets} \${bytes} \${start} \${end} \${action} \${log-status} \${flow-direction} \${traffic-path} \${pkt-srcaddr} \${pkt-dstaddr} \${tcp-flags}'

# ---------- Reading a default (v2) record ----------
# 2 111122223333 eni-0abc 10.0.16.9 10.0.64.5 51234 5432 6 12 1500 1757836800 1757836860 ACCEPT OK
# |  account      ENI      src        dst      sport dport |  pkts bytes  start       end      action status
#                                                     protocol 6=TCP 17=UDP 1=ICMP
#
# The fingerprint of a stateless NACL dropping the RESPONSE:
# 2 111122223333 eni-0db  10.0.64.5 10.0.16.9 5432 51234 6 8 600 ... REJECT OK
#                          ^ source is the DATABASE = the reply was dropped

# ---------- CloudWatch Logs Insights: the four queries you actually run ----------
# 1) What is being rejected, and by whom?
# fields @timestamp, srcAddr, dstAddr, dstPort, protocol
# | filter action = "REJECT" | stats count(*) as hits by srcAddr, dstAddr, dstPort
# | sort hits desc | limit 50
#
# 2) Port scan: one source hitting many ports
# filter action = "REJECT" | stats count_distinct(dstPort) as ports by srcAddr
# | sort ports desc | limit 20
#
# 3) Possible exfiltration: biggest egress to outside the VPC
# filter not isIpv4InSubnet(dstAddr, "10.0.0.0/16")
# | stats sum(bytes)/1024/1024 as MB by srcAddr, dstAddr | sort MB desc | limit 20
#
# 4) Did this flow EVER succeed?
# filter srcAddr = "10.0.16.9" and dstAddr = "10.0.64.5" and dstPort = 5432
# | stats count(*) by action

# ---------- Athena over S3: cheap, and the right tool at volume ----------
# CREATE EXTERNAL TABLE flow_logs (
#   version int, account_id string, interface_id string, srcaddr string, dstaddr string,
#   srcport int, dstport int, protocol bigint, packets bigint, bytes bigint,
#   start bigint, \`end\` bigint, action string, log_status string
# ) PARTITIONED BY (dt string)
# ROW FORMAT DELIMITED FIELDS TERMINATED BY ' '
# LOCATION 's3://my-flowlogs-bucket/prod/AWSLogs/111122223333/vpcflowlogs/ap-south-1/';
#
# -- Top talkers by cost-relevant egress
# SELECT srcaddr, dstaddr, sum(bytes)/1e9 AS gb
# FROM flow_logs WHERE dt = '2026/09/13' AND action = 'ACCEPT'
# GROUP BY 1,2 ORDER BY gb DESC LIMIT 20;

# ---------- Find traffic taking the NAT when an endpoint exists (traffic-path) ----------
# filter traffic_path = 2        # 2 = through a NAT gateway (1 = same VPC, 8 = IGW, ...)
# | stats sum(bytes)/1e9 as gb by dstAddr | sort gb desc
# S3/ECR addresses at the top = money you are burning; create the endpoint.

# ---------- Health check: are you actually capturing everything? ----------
# filter log_status = "SKIPDATA" | stats count(*)
# Non-zero => records were DROPPED during aggregation. Your evidence has holes.

# ---------- What Flow Logs cannot answer - use the right tool ----------
# "Which RULE blocked it?"      -> aws ec2 start-network-insights-analysis ...
# "What was in the packet?"     -> VPC Traffic Mirroring
# "What DNS name was resolved?" -> Route 53 Resolver query logging`,
          ],
          questions: [
            {
              question: "What do VPC Flow Logs capture, and what do they not?",
              solution: "<p>They capture <strong>metadata for IP flows</strong> at the VPC, subnet or ENI level: source and destination addresses and ports, protocol, packet and byte counts, the time window, the interface, and <strong>ACCEPT or REJECT</strong>. They do <strong>not</strong> capture <strong>packet contents</strong> (use VPC Traffic Mirroring), and they never say <em>which rule</em> caused a rejection (use Reachability Analyzer). They also omit several categories entirely: traffic to the <strong>Amazon-provided DNS resolver</strong> (use Route 53 Resolver query logging), <strong>instance metadata</strong> traffic to <code>169.254.169.254</code> and other link-local addresses, <strong>DHCP</strong>, Windows license activation, and traffic to the reserved VPC router address. Finally, delivery is aggregated and near-real-time, not live — and a <code>SKIPDATA</code> log status means records were dropped, so the record is not always complete.</p>",
            },
            {
              question: "You see a REJECT in Flow Logs. How do you tell whether a security group or a NACL caused it?",
              solution: "<p>Look at the <strong>direction of the rejected flow</strong>. If the REJECT is on the <em>request</em> leg — source is the client, destination is your server's service port — it could be either the inbound NACL or the destination security group. If the REJECT is on the <em>return</em> leg — <strong>source is your own server, destination port is a high ephemeral number</strong> — it is almost certainly a <strong>stateless NACL</strong> missing its egress rule, because a stateful security group always permits the response to an allowed connection. Adding the <code>flow-direction</code> custom field removes the guesswork. To get a definitive answer rather than an inference, run <strong>Reachability Analyzer</strong>, which returns <code>ACL_RULE_MISMATCH</code> or <code>SECURITY_GROUP_RULE_MISMATCH</code> explicitly.</p>",
            },
            {
              question: "Should you send Flow Logs to CloudWatch Logs or S3?",
              solution: "<p><strong>S3 for most production use</strong>: it is far cheaper at volume, supports long retention for compliance, and is queried well by <strong>Athena</strong> — the right shape for security investigation and cost analysis over weeks of data. <strong>CloudWatch Logs</strong> when you want <strong>Logs Insights</strong> for ad-hoc interactive queries during an incident, <strong>metric filters and alarms</strong> on patterns such as spikes in REJECTs, or subscription filters into a real-time pipeline — at noticeably higher ingestion cost. <strong>Kinesis Data Firehose</strong> is the third option, for streaming into a SIEM such as Splunk or Datadog. Many accounts run both S3 and CloudWatch: S3 for retention and analysis, CloudWatch for alarms.</p>",
            },
            {
              question: "Which custom fields would you add beyond the default format, and why?",
              solution: "<p><strong><code>pkt-srcaddr</code> and <code>pkt-dstaddr</code></strong> — the <em>original</em> addresses before translation; behind a NAT gateway <code>srcaddr</code> is the NAT itself, so without these you cannot tell which instance actually sent the traffic. <strong><code>flow-direction</code></strong> — removes all ambiguity about which leg of a conversation you are reading, which is exactly what you need to distinguish a NACL drop from a security group drop. <strong><code>traffic-path</code></strong> — shows whether egress went via the IGW, a NAT gateway, peering or a gateway endpoint, making it trivial to find expensive traffic that is taking the NAT when an endpoint already exists. <strong><code>tcp-flags</code></strong> — separates an unanswered SYN from a completed handshake, which is how you spot port scans. Plus <strong><code>instance-id</code>, <code>subnet-id</code>, <code>az-id</code></strong> to avoid joining against the EC2 API later.</p>",
            },
            {
              question: "How would you use Flow Logs to investigate a possible compromise?",
              solution: "<p>Build the flow timeline for the suspect ENI. First, <strong>outbound connections</strong>: group by destination address and port, sorted by bytes, filtering to destinations outside the VPC CIDR — large or sustained egress to an unfamiliar address suggests <strong>exfiltration</strong>, and connections to unusual ports on a small set of addresses suggest <strong>command and control</strong>. Second, <strong>lateral movement</strong>: connections from that instance to other internal addresses on ports it never normally uses. Third, <strong>the entry point</strong>: inbound ACCEPTs before the first anomaly, and the pattern of REJECTs across many ports that would indicate scanning. Use <code>tcp-flags</code> to separate real handshakes from unanswered SYNs. Then pivot to other evidence — <strong>CloudTrail</strong> for API activity by that instance's role, <strong>GuardDuty</strong> findings (which are themselves partly derived from Flow Logs), and Route 53 Resolver query logs for the domains it looked up.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html",
            "https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs-records-examples.html",
            "https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs-athena.html",
          ],
        },
      ],
    },
    {
      id: 2,
      label: "Advance",
      concepts: [
        {
          topic: "Transit Gateway — Hub-and-Spoke Connectivity Across Many VPCs and Accounts",
          tags: ["aws", "vpc", "transit gateway", "tgw", "hub and spoke", "routing", "multi-account"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  A <strong>Transit Gateway (TGW)</strong> is a regional, managed network hub. Every VPC, VPN and Direct Connect link in a region can attach to it, and once attached they can all reach each other through it. That is the whole idea in one sentence — but the reason it exists, and the reason interviewers reach for it the moment you say "we have a lot of VPCs", is arithmetic.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The problem: mesh growth is quadratic</h4>
<p style="line-height: 1.75;">Before Transit Gateway existed, connecting VPCs meant <strong>VPC peering</strong>, and peering is a point-to-point relationship between exactly two VPCs. To let every VPC talk to every other VPC you need a full mesh, and a full mesh of <em>n</em> nodes requires <strong>n(n−1)/2</strong> connections.</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>3 VPCs → 3 peering connections. Fine.</li>
  <li>5 VPCs → 10. Getting tedious.</li>
  <li>10 VPCs → 45. Unpleasant.</li>
  <li>20 VPCs → 190. Nobody is managing that by hand.</li>
  <li>50 VPCs → 1,225. Not a design, an incident waiting to happen.</li>
</ul>
<p style="line-height: 1.75;">And the connection count is only half the pain. Each peering connection needs <strong>route table entries on both sides</strong>, in every route table that should use it. A VPC with three subnets and three route tables, peered to nineteen other VPCs, needs up to fifty-seven route entries — and every new VPC means editing every existing VPC. Route tables also have entry quotas, so at a certain scale you literally cannot add another route.</p>
<p style="line-height: 1.75;">Transit Gateway collapses that to <strong>n attachments</strong>. Twenty VPCs means twenty attachments and, in the simplest design, one route in each VPC's route table pointing at the TGW. Adding VPC twenty-one is one attachment and one route — no existing VPC has to change at all. That shift from O(n²) to O(n) is the entire pitch, and it is the answer an interviewer is listening for.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What it actually is</h4>
<p style="line-height: 1.75;">Mentally, a TGW is a <strong>managed, horizontally scaled virtual router</strong> that lives in a region and belongs to one account (though it can be shared). It is not a device you patch, size or fail over; AWS runs it across availability zones and it scales elastically up to very high aggregate throughput.</p>
<p style="line-height: 1.75;">Things attach to it. The attachment types worth knowing:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>VPC attachment.</strong> You pick the VPC and one subnet <em>per availability zone</em>. AWS places an elastic network interface in each chosen subnet, and that is the entry point for traffic from that AZ. A common mistake is attaching in only one AZ and then wondering why instances in the other AZs have poor or broken connectivity — always attach in every AZ where you have workloads.</li>
  <li><strong>VPN attachment.</strong> A Site-to-Site VPN terminating on the TGW instead of on a Virtual Private Gateway. This is how you give every VPC access to on-premises with one VPN rather than one per VPC.</li>
  <li><strong>Direct Connect Gateway attachment.</strong> Connects your Direct Connect private virtual interfaces to the TGW, so a single physical circuit serves every VPC behind it.</li>
  <li><strong>Transit Gateway peering attachment.</strong> Connects a TGW in one region to a TGW in another, which is how you build a global backbone. Note: inter-region TGW peering does <em>not</em> support transitive routing through a third region by default — you route explicitly.</li>
  <li><strong>Connect attachment.</strong> Runs GRE tunnels with BGP to third-party virtual appliances (SD-WAN gear) running on EC2, giving them native TGW routing rather than a hand-built overlay.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Routing: two layers, and everyone forgets one of them</h4>
<p style="line-height: 1.75;">This is where most Transit Gateway troubleshooting lives, so it is worth being precise. There are <strong>two independent routing layers</strong> and traffic must succeed at both.</p>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>The VPC's own subnet route tables.</strong> An instance sends a packet; its subnet's route table must contain a route for the destination CIDR pointing at the <strong>transit gateway</strong> as the target. Without it, the packet never leaves the VPC and nothing about the TGW matters.</li>
  <li><strong>The Transit Gateway route table.</strong> Once the packet arrives at the TGW, the TGW consults <em>its own</em> route table — the one <strong>associated</strong> with the incoming attachment — to decide which attachment to send it out of.</li>
</ol>
<p style="line-height: 1.75;">Within the TGW layer there are two further concepts that people mix up constantly:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Association</strong> — an attachment is <em>associated</em> with exactly <strong>one</strong> TGW route table. That association answers "when traffic arrives from this attachment, which route table do I look in?" It controls what this attachment <em>can reach</em>.</li>
  <li><strong>Propagation</strong> — an attachment's routes (the VPC's CIDR, or the BGP routes from a VPN) can be <em>propagated</em> into <strong>many</strong> TGW route tables. That answers "which route tables learn about this attachment?" It controls who <em>can reach this attachment</em>.</li>
</ul>
<p style="line-height: 1.75;">Association is one-to-one and about egress decisions; propagation is one-to-many and about advertising reachability. Nearly every "why can A reach B but B cannot reach A?" question resolves to a propagation that was configured in one direction only. You can also write <strong>static routes</strong> in a TGW route table, which override propagated ones and are how you steer traffic through an inspection VPC.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Segmentation: why multiple TGW route tables matter</h4>
<p style="line-height: 1.75;">If you use a single TGW route table and propagate everything into it, you have built a flat network where every VPC can reach every other VPC. That is occasionally what you want and usually not. The power of the two-layer model is that <strong>multiple TGW route tables let you build isolated routing domains on one hub</strong>.</p>
<p style="line-height: 1.75;">The canonical patterns:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Environment isolation.</strong> A <code>prod</code> route table and a <code>nonprod</code> route table. Production VPCs associate with the first, development with the second, and neither propagates into the other. Dev and prod are now unable to route to each other even though they share a hub — enforced by routing, not by security groups that someone might loosen.</li>
  <li><strong>Shared services.</strong> A third route table for a shared-services VPC holding Active Directory, DNS resolvers, artifact repositories or monitoring. Shared services propagates into both prod and nonprod, and both propagate into shared services — so everyone reaches shared services, but spokes still cannot reach each other.</li>
  <li><strong>Centralised egress.</strong> One VPC owns the NAT Gateways and internet path. Spoke route tables get a default route (<code>0.0.0.0/0</code>) pointing at the egress VPC's attachment, so twenty VPCs share a handful of NAT Gateways instead of running their own. This is a significant, very commonly cited cost saving, since NAT Gateways carry an hourly charge per gateway plus a per-GB processing charge.</li>
  <li><strong>Centralised inspection.</strong> A static default route sending everything to an inspection VPC running Network Firewall or third-party appliances, which then returns traffic to the TGW. This is where <strong>appliance mode</strong> becomes mandatory.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Appliance mode, and why asymmetric routing breaks firewalls</h4>
<p style="line-height: 1.75;">By default, a TGW makes AZ-affinity decisions that can send the forward and return paths of a single flow through different availability zones. For ordinary traffic that is harmless. For a <strong>stateful appliance</strong> — a firewall that tracks connections — it is fatal: the appliance in AZ-a sees the SYN, the appliance in AZ-b sees the response, neither has the full connection state, and the firewall drops the traffic. The symptom is maddening, because connectivity appears to work intermittently or only in one direction.</p>
<p style="line-height: 1.75;"><strong>Appliance mode</strong>, enabled on the inspection VPC's attachment, tells the TGW to keep both directions of a flow pinned to the same AZ. If a design question involves inserting a firewall or NAT appliance into the path, mentioning appliance mode unprompted is a strong signal you have actually built one.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Cross-account and cross-region</h4>
<p style="line-height: 1.75;">In a multi-account organisation, the TGW is usually owned by a <strong>central networking account</strong> and shared with workload accounts using <strong>AWS Resource Access Manager (RAM)</strong>. Workload account owners can then create an attachment from their own VPC, but they cannot modify the TGW's route tables — so the networking team keeps control of segmentation while teams self-service their connectivity. Attachments from another account require acceptance unless auto-accept is enabled, which is a useful approval gate.</p>
<p style="line-height: 1.75;">Across regions, you create a <strong>TGW peering attachment</strong> between two Transit Gateways. Traffic travels over the AWS global backbone rather than the public internet, and it is encrypted in transit. Two constraints to remember: inter-region peering attachments only support <strong>static routes</strong>, not propagation, and routing is not transitive through a middle region — if you want region A to reach region C via region B, you configure it explicitly, and many designs prefer a full mesh of regional TGWs instead.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Limits, quotas and cost</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Bandwidth</strong> is up to 50 Gbps per VPC attachment (burst), with much higher aggregate across the TGW. A single flow is limited — typically around 5 Gbps per flow — so bandwidth-hungry single-stream workloads need multiple flows or a different design.</li>
  <li><strong>Attachments</strong> — a few thousand per TGW, and one VPC attachment per VPC per TGW.</li>
  <li><strong>Route tables</strong> — on the order of twenty per TGW, with a large number of routes each. Segmentation designs rarely come close.</li>
  <li><strong>Cost</strong> has two parts: an <strong>hourly charge per attachment</strong> and a <strong>per-GB data processing charge</strong>. This is the crucial economic difference from peering, which has no hourly charge and no processing charge — only standard cross-AZ or cross-region data transfer. For a handful of VPCs moving a lot of data, peering can be materially cheaper; the TGW earns its cost through operational simplicity at scale.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What Transit Gateway does not solve</h4>
<p style="line-height: 1.75;">Being able to name the limits is what separates a considered answer from an enthusiastic one.</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Overlapping CIDRs still break everything.</strong> A TGW routes on IP prefixes; if two VPCs both use <code>10.0.0.0/16</code>, no routing configuration can disambiguate them. The fixes are re-addressing, or NAT in the path, or PrivateLink — which sidesteps routing entirely.</li>
  <li><strong>It does not replace security controls.</strong> Reachability is not authorisation. Security groups and NACLs still govern what is permitted once packets arrive, and a flat TGW with permissive security groups is a flat network.</li>
  <li><strong>It is regional.</strong> Global connectivity means multiple TGWs and peering between them.</li>
  <li><strong>It does not do NAT, and it does not do DNS.</strong> Centralised egress needs NAT Gateways in an egress VPC; cross-VPC name resolution needs Route 53 Resolver rules and endpoints, which is a separate design exercise people frequently forget until the first application fails to resolve a hostname.</li>
  <li><strong>It is a single logical point of configuration.</strong> A bad route table change can partition your entire network at once — which is an argument for infrastructure as code, staged rollout, and keeping production and non-production in separate routing domains.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Observability</h4>
<p style="line-height: 1.75;">Two tools matter. <strong>Transit Gateway Flow Logs</strong> record traffic traversing the hub, including the source and destination attachment, which is exactly the field you need to answer "which VPC is generating this traffic?" — something VPC flow logs alone cannot tell you. And <strong>Reachability Analyzer</strong> performs static analysis across route tables, security groups, NACLs and TGW configuration to tell you whether a path exists and, if not, precisely which component blocks it. For a network of any size, Reachability Analyzer converts a multi-hour debugging session into a single API call, and mentioning it is a good sign of operational maturity.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">When you would still not use one</h4>
<p style="line-height: 1.75;">A TGW is the default answer above roughly five VPCs, or whenever hybrid connectivity is in the picture. Below that, and especially for two or three VPCs with heavy data transfer, plain <strong>peering</strong> is simpler and cheaper. If the requirement is "expose one service to many consumers" rather than "connect networks", <strong>PrivateLink</strong> is the better tool, because it needs no routing relationship at all and tolerates overlapping CIDRs. And if the requirement is "these accounts should share one network" rather than "connect separate networks", <strong>VPC sharing through RAM</strong> removes the connectivity problem entirely by not creating separate VPCs in the first place.</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">A worked design: the landing-zone network</h4>
<p style="line-height: 1.75;">To make all of this concrete, here is the shape most large AWS estates converge on, and being able to sketch it is worth a lot in a design interview.</p>
<p style="line-height: 1.75;">There is a <strong>network account</strong> that owns the Transit Gateway and nothing else of consequence. It shares the TGW to the organisation with RAM. It also owns two special VPCs: an <strong>egress VPC</strong> containing public subnets with NAT Gateways and an internet gateway, and an <strong>inspection VPC</strong> running AWS Network Firewall or a third-party appliance behind a Gateway Load Balancer. In some designs these are the same VPC; separating them is cleaner but costs more.</p>
<p style="line-height: 1.75;">There is a <strong>shared-services account</strong> with a VPC holding Route 53 Resolver inbound and outbound endpoints, directory services, package mirrors, and centralised logging collectors. Everything needs to reach it; it needs to reach almost nothing.</p>
<p style="line-height: 1.75;">Then there are <strong>workload accounts</strong>, typically one or two per application per environment, each with a VPC carved from a planned, non-overlapping address space. Each attaches to the shared TGW.</p>
<p style="line-height: 1.75;">The routing domains are then: a <em>production</em> table, a <em>non-production</em> table, a <em>shared-services</em> table, and an <em>egress/inspection</em> table. Production and non-production propagate into shared services and into egress, and receive shared services and a default route back — but never see each other. On-premises connectivity attaches once, via Direct Connect Gateway and a backup VPN, and propagates into whichever domains are permitted to reach the corporate network.</p>
<p style="line-height: 1.75;">The properties worth calling out: adding a new application account is a single attachment plus an association, with no change to any existing VPC; the security team controls segmentation centrally because workload accounts cannot edit TGW route tables; and the internet egress cost is amortised across the whole estate instead of being duplicated per VPC.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Address planning, which is the part that ages badly</h4>
<p style="line-height: 1.75;">Everything above depends on one decision made early and almost impossible to change later: <strong>the IP address plan</strong>. A Transit Gateway routes on prefixes, so overlapping CIDRs are not a configuration problem you can solve — they are a design failure. The standard approach is to allocate a large private supernet to AWS (for example a <code>/12</code> or a set of <code>/16</code>s), subdivide it by region, then by environment, then by account, so that summarisation is possible and route tables stay small.</p>
<p style="line-height: 1.75;"><strong>AWS IPAM</strong> (IP Address Manager) exists to enforce this: pools per region and per environment, automatic allocation when a VPC is created, and monitoring for overlap and utilisation. Without something like it, teams create VPCs with the console's default <code>10.0.0.0/16</code> and you discover the collision the day you try to connect them — usually during a merger or a migration, which is the worst possible time.</p>
<p style="line-height: 1.75;">When collisions already exist, the options are all unpleasant: re-address one side (disruptive but correct), place a NAT layer in the path (works, obscures source IPs, complicates logging and security groups), or move that traffic to <strong>PrivateLink</strong>, which connects a consumer to a service without any shared routing domain and therefore does not care about overlaps at all. It is worth saying plainly in an interview that the third option is often the pragmatic answer for a single service, and the first is the only real answer for general connectivity.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Migration from an existing peering mesh</h4>
<p style="line-height: 1.75;">Teams rarely get to start clean, so "how would you migrate?" is a fair follow-up. A safe sequence:</p>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Create the TGW and attach every VPC</strong>, without changing any VPC route tables. Attachments alone move no traffic.</li>
  <li><strong>Build the route tables and associations</strong> to reflect the segmentation you want, and verify with Reachability Analyzer rather than with live traffic.</li>
  <li><strong>Migrate one VPC pair at a time.</strong> In the source VPC's route table, replace the specific peering route with a route to the TGW. Because more specific routes win, you can move a single destination prefix at a time and leave everything else on peering.</li>
  <li><strong>Watch flow logs</strong> for the moved prefix to confirm traffic is traversing the hub, and keep the peering connection in place as a rollback path.</li>
  <li><strong>Delete the peering connections</strong> only after every route referencing them is gone — deleting a peering with live routes blackholes traffic immediately.</li>
</ol>
<p style="line-height: 1.75;">The route-specificity property in step 3 is the key to doing this without a big-bang cutover, and mentioning it shows you have thought about how to do the change safely rather than just what the end state looks like.</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The sentence to leave them with</h4>
<p style="line-height: 1.75;">A Transit Gateway converts a connectivity problem that grows quadratically into one that grows linearly, and in doing so it moves network policy from being spread across dozens of route tables into one place a platform team can own. That is the whole value proposition — and the cost of it is an attachment fee per hour, a processing fee per gigabyte, and a single object whose misconfiguration can partition everything at once. Whether that trade is worth making is almost entirely a function of how many VPCs you have and how much data moves between them.</p>


<p style="line-height: 1.75;">One last framing worth carrying into an interview: a Transit Gateway is not primarily a performance product or a security product. It is an <strong>operations</strong> product. It does not make traffic faster than peering — it adds a hop — and it does not by itself permit or deny anything that security groups do not already govern. What it changes is who has to know about a connection, how many places a change must be made, and whether adding the next VPC is a one-line change or a project. Framing it that way makes the cost trade-off obvious rather than arbitrary: you are paying attachment and processing fees to buy back engineering time and reduce the chance of a mistake.</p>

<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Transit Gateway is a regional managed router that VPCs, VPNs and Direct Connect attach to, turning a full mesh into hub-and-spoke. The reason is arithmetic: peering needs n(n−1)/2 connections plus route entries on both sides, so twenty VPCs means 190 peerings, while a TGW means twenty attachments and one route per VPC. Routing has two layers — the VPC subnet route table has to point at the TGW, and the TGW's own route table decides where it goes next — and within that, <strong>association</strong> is one-to-one and controls what an attachment can reach, while <strong>propagation</strong> is one-to-many and controls who can reach it. I use separate TGW route tables to isolate prod from non-prod while both reach a shared-services VPC, centralise egress through one NAT VPC to cut NAT costs, and enable <strong>appliance mode</strong> on any inspection attachment so stateful firewalls don't break on asymmetric AZ paths. The trade-off versus peering is cost: TGW charges per attachment-hour and per GB processed, whereas peering charges neither."</div>
</div>`,
          examples: [
            `# ---------- The arithmetic that drives the decision ----------
# Full mesh peering:  n(n-1)/2 connections
#    3 VPCs ->   3      10 VPCs ->  45      50 VPCs -> 1,225
#    5 VPCs ->  10      20 VPCs -> 190     100 VPCs -> 4,950
#
# Transit Gateway: n attachments
#    3 VPCs ->   3      10 VPCs ->  10      50 VPCs ->    50
#
# And peering needs routes on BOTH sides of EVERY connection.
# Adding VPC #21 to a mesh = editing 20 existing VPCs.
# Adding VPC #21 to a TGW  = 1 attachment + 1 route. Nothing else changes.`,

            `# ---------- Build the hub and attach a VPC ----------
TGW=$(aws ec2 create-transit-gateway \\
  --description "core-hub-euw1" \\
  --options 'AmazonSideAsn=64512,AutoAcceptSharedAttachments=disable,DefaultRouteTableAssociation=disable,DefaultRouteTablePropagation=disable,DnsSupport=enable,VpnEcmpSupport=enable' \\
  --query 'TransitGateway.TransitGatewayId' --output text)

# Disabling the default association/propagation is deliberate: it forces
# you to place every attachment in a routing domain on purpose.

# Attach a VPC - ONE SUBNET PER AZ, or that AZ gets poor connectivity
aws ec2 create-transit-gateway-vpc-attachment \\
  --transit-gateway-id $TGW \\
  --vpc-id vpc-0aaa111 \\
  --subnet-ids subnet-0a1 subnet-0b1 subnet-0c1 \\
  --options ApplianceModeSupport=disable,DnsSupport=enable,Ipv6Support=disable \\
  --tag-specifications 'ResourceType=transit-gateway-attachment,Tags=[{Key=Name,Value=prod-app-vpc}]'

# LAYER 1 - the VPC still needs its own route pointing at the TGW
aws ec2 create-route --route-table-id rtb-0prodapp \\
  --destination-cidr-block 10.0.0.0/8 --transit-gateway-id $TGW`,

            `# ---------- Segmentation: association vs propagation ----------
PROD=$(aws ec2 create-transit-gateway-route-table --transit-gateway-id $TGW \\
  --query 'TransitGatewayRouteTable.TransitGatewayRouteTableId' --output text)
DEV=$(aws ec2 create-transit-gateway-route-table  --transit-gateway-id $TGW \\
  --query 'TransitGatewayRouteTable.TransitGatewayRouteTableId' --output text)
SHARED=$(aws ec2 create-transit-gateway-route-table --transit-gateway-id $TGW \\
  --query 'TransitGatewayRouteTable.TransitGatewayRouteTableId' --output text)

# ASSOCIATION = one per attachment = "which table do I consult for egress?"
aws ec2 associate-transit-gateway-route-table \\
  --transit-gateway-route-table-id $PROD --transit-gateway-attachment-id tgw-attach-prod1

# PROPAGATION = many tables = "who learns my CIDR / who can reach me?"
# Shared services is reachable from BOTH prod and dev...
aws ec2 enable-transit-gateway-route-table-propagation \\
  --transit-gateway-route-table-id $PROD --transit-gateway-attachment-id tgw-attach-shared
aws ec2 enable-transit-gateway-route-table-propagation \\
  --transit-gateway-route-table-id $DEV  --transit-gateway-attachment-id tgw-attach-shared

# ...but prod and dev NEVER propagate into each other's tables,
# so they are routing-isolated even though they share one hub.

# One-way connectivity almost always = propagation configured one way only.
aws ec2 get-transit-gateway-route-table-propagations \\
  --transit-gateway-route-table-id $PROD`,

            `# ---------- Centralised egress + inspection ----------
# Spokes: send everything internet-bound to the egress VPC attachment
aws ec2 create-transit-gateway-route \\
  --transit-gateway-route-table-id $PROD \\
  --destination-cidr-block 0.0.0.0/0 \\
  --transit-gateway-attachment-id tgw-attach-egress
# 20 VPCs now share a few NAT Gateways instead of running 20 sets.

# Inspection VPC attachment MUST run in appliance mode, or a stateful
# firewall sees the forward path in one AZ and the return path in another
# and silently drops the flow.
aws ec2 modify-transit-gateway-vpc-attachment \\
  --transit-gateway-attachment-id tgw-attach-inspect \\
  --options ApplianceModeSupport=enable

# Blackhole a CIDR you never want reachable through the hub
aws ec2 create-transit-gateway-route \\
  --transit-gateway-route-table-id $DEV \\
  --destination-cidr-block 10.50.0.0/16 --blackhole`,

            `# ---------- Share cross-account, and debug ----------
# Networking account shares the TGW; workload accounts attach their own VPCs
aws ram create-resource-share --name core-tgw \\
  --resource-arns arn:aws:ec2:eu-west-1:111122223333:transit-gateway/$TGW \\
  --principals o-abc123xyz --permission-arns \\
    arn:aws:ram::aws:permission/AWSRAMDefaultPermissionTransitGateway

# Which attachment does the hub think serves 10.20.0.0/16?
aws ec2 search-transit-gateway-routes \\
  --transit-gateway-route-table-id $PROD \\
  --filters "Name=route-search.subnet-of-match,Values=10.20.0.0/16"

# Static path analysis across route tables, SGs, NACLs and the TGW
aws ec2 create-network-insights-path \\
  --source i-0source --destination i-0dest --protocol tcp --destination-port 443
aws ec2 start-network-insights-analysis --network-insights-path-id nip-0abc
# The result names the exact component that blocks the path.`,
          ],
          questions: [
            {
              question: "What is a Transit Gateway and what problem does it solve?",
              solution: "<p>It is a <strong>regional managed router</strong> that VPCs, Site-to-Site VPNs, Direct Connect Gateways and other Transit Gateways attach to, giving hub-and-spoke connectivity instead of a full mesh. The problem it solves is quadratic growth: peering is point-to-point and non-transitive, so a full mesh needs <strong>n(n−1)/2</strong> connections — 45 for ten VPCs, 190 for twenty — each requiring route entries on both sides, so adding one VPC means editing every existing VPC. A TGW needs <strong>n attachments</strong> and, typically, one route per VPC, so adding the twenty-first VPC changes nothing that already exists.</p>",
            },
            {
              question: "Explain the difference between association and propagation on a Transit Gateway route table.",
              solution: "<p><strong>Association</strong> is <em>one-to-one</em>: each attachment is associated with exactly one TGW route table, and that determines which table the TGW consults for traffic <em>arriving from</em> that attachment — so it controls what the attachment <strong>can reach</strong>. <strong>Propagation</strong> is <em>one-to-many</em>: an attachment's routes can be propagated into many route tables, determining which tables learn its CIDR — so it controls who <strong>can reach the attachment</strong>. Most \"A can reach B but B cannot reach A\" problems are a propagation configured in only one direction. You can also add <strong>static routes</strong>, which take precedence over propagated ones and are how you force traffic through an inspection VPC.</p>",
            },
            {
              question: "How would you isolate production from development while both still reach shared services?",
              solution: "<p>Use <strong>three Transit Gateway route tables</strong>. Production VPC attachments associate with the prod table, development attachments with the dev table, and the shared-services VPC with its own. Propagate the shared-services attachment into <em>both</em> the prod and dev tables, and propagate the prod and dev attachments into the shared-services table. Critically, do <strong>not</strong> propagate prod into dev or dev into prod. The result is that both environments reach shared services and shared services reaches both, but prod and dev have no route to each other at all — isolation enforced at the routing layer rather than depending on security group hygiene. I would also disable default route table association and propagation on the TGW so every attachment must be placed in a domain deliberately.</p>",
            },
            {
              question: "What is appliance mode and when do you need it?",
              solution: "<p>By default a Transit Gateway may send the forward and return paths of a single flow through <strong>different availability zones</strong>. That is harmless for ordinary traffic but fatal for a <strong>stateful appliance</strong> — a firewall or IDS — because the appliance in one AZ sees the SYN and the appliance in another sees the response, so neither holds the full connection state and the flow is dropped. Enabling <strong>appliance mode</strong> on the inspection VPC's attachment pins both directions of a flow to the same AZ. You need it whenever you insert stateful inspection into the TGW path, and the symptom of forgetting it is intermittent or one-directional connectivity that looks like a routing bug.</p>",
            },
            {
              question: "Transit Gateway or VPC peering — how do you decide?",
              solution: "<p>Count the VPCs and look at the data volume. <strong>Peering</strong> is right for a small number of VPCs (roughly up to five) with heavy data transfer, because it has <em>no hourly charge and no per-GB processing charge</em> — you pay only standard data transfer — and it gives direct, lowest-latency paths. <strong>Transit Gateway</strong> is right once the count grows, once you need hybrid connectivity, or once you want routing-level segmentation, because it collapses the mesh to n attachments and centralises policy. The trade-off is cost: TGW bills <strong>per attachment-hour plus per GB processed</strong>, so a high-throughput two-VPC design can be significantly cheaper peered. Neither helps with <strong>overlapping CIDRs</strong> — for that you need re-addressing, NAT, or PrivateLink.</p>",
            },
            {
              question: "Traffic between two VPCs attached to the same Transit Gateway isn't flowing. How do you debug it?",
              solution: "<p>Work the two routing layers in order. <strong>Layer 1:</strong> does the source subnet's <em>VPC route table</em> have a route for the destination CIDR targeting the transit gateway? Without it the packet never reaches the hub. <strong>Layer 2:</strong> is the source attachment <em>associated</em> with a TGW route table that contains a route to the destination, and is the destination attachment <em>propagating</em> into that table? Check the reverse direction too, since one-way propagation is the classic cause. Then check the non-routing layers: security groups (stateful, so the return path is implicit) and NACLs (stateless, so you must allow ephemeral ports back). Also confirm the VPC attachment exists in the <strong>AZ</strong> the workload runs in, check for a <strong>blackhole</strong> route, and confirm the CIDRs do not overlap. <code>search-transit-gateway-routes</code> and <strong>Reachability Analyzer</strong> will identify the blocking component directly.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html",
            "https://docs.aws.amazon.com/vpc/latest/tgw/how-transit-gateways-work.html",
            "https://docs.aws.amazon.com/vpc/latest/tgw/tgw-route-tables.html",
            "https://docs.aws.amazon.com/whitepapers/latest/building-scalable-secure-multi-vpc-network-infrastructure/welcome.html",
          ],
        },
        {
          topic: "VPC Peering vs Transit Gateway — Why Peering Stops Scaling",
          tags: ["aws", "vpc", "peering", "transit gateway", "transitive routing", "cidr", "cost"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  This comparison is asked constantly because it has a clean right answer with a clean threshold. <strong>VPC peering is a one-to-one network link between two VPCs. Transit Gateway is a one-to-many hub.</strong> Peering is simpler, faster and cheaper for a handful of VPCs; it becomes unmanageable beyond that, for three specific and memorable reasons. Knowing those three reasons — and being able to say when peering is still the better answer — is what a good answer looks like.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What a peering connection actually is</h4>
<p style="line-height: 1.75;">A VPC peering connection is a networking relationship between exactly two VPCs, which can be in the same account or different accounts, the same region or different regions (inter-region peering). Critically, it is <strong>not a device</strong>. There is no gateway, no appliance, no bandwidth cap introduced by the peering itself, and no single point of failure to manage. AWS wires it into the underlying network fabric, so traffic takes a direct path using the AWS backbone and stays on private IP addresses throughout.</p>
<p style="line-height: 1.75;">Creating one is a two-step handshake: the requester creates the peering connection, and the accepter accepts it. That is deliberate — it means nobody can attach a network to your VPC unilaterally, which matters in a multi-account organisation. After acceptance, <strong>nothing flows yet</strong>. You must add routes on <em>both</em> sides: in each VPC, every route table serving a subnet that should participate needs an entry for the other VPC's CIDR with the peering connection as the target. Forgetting the route tables, or adding them on only one side, is the single most common peering mistake and produces traffic that leaves but never returns.</p>
<p style="line-height: 1.75;">Two optional settings are worth knowing. <strong>DNS resolution</strong> can be enabled so that a public hostname of an instance in the peer VPC resolves to its <em>private</em> IP rather than its public one — without it, cross-VPC DNS lookups return public addresses and traffic tries to leave through the internet gateway. And in the <em>same region</em>, you can <strong>reference a security group in the peer VPC</strong> by ID in your own security group rules, which is an underrated advantage: you write "allow from sg-app" rather than hard-coding CIDR ranges, and it keeps working as the peer VPC's instances change. That capability does <em>not</em> exist across regions, and it does not exist through a Transit Gateway at all — a genuinely useful detail to drop into an answer.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Limitation 1: peering is not transitive</h4>
<p style="line-height: 1.75;">This is the headline constraint and the one interviewers probe first. If VPC A is peered with VPC B, and VPC B is peered with VPC C, then <strong>A cannot reach C</strong>. Traffic does not "pass through" B. There is no configuration that changes this — no route, no flag, no setting. If A needs to reach C, you create a third peering connection between A and C.</p>
<p style="line-height: 1.75;">The reason is architectural rather than arbitrary: a peering connection is a relationship between two specific VPCs, not a router, and AWS deliberately does not let one customer's VPC become a transit path for another's traffic without explicit intent. If you genuinely want B to forward traffic between A and C, you have to put something in B that does the forwarding — an EC2 instance acting as a router, or a Gateway Load Balancer — and then you own the scaling, patching and availability of that thing. That is precisely the problem Transit Gateway was built to remove.</p>
<p style="line-height: 1.75;">Non-transitivity is also what drives the quadratic growth. Because you cannot chain connections, full connectivity requires a full mesh, and that is where the arithmetic becomes the argument.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Limitation 2: the N² problem, in connections and in routes</h4>
<p style="line-height: 1.75;">A full mesh of <em>n</em> VPCs requires <strong>n(n−1)/2</strong> peering connections:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>4 VPCs → 6 connections</li>
  <li>8 VPCs → 28</li>
  <li>15 VPCs → 105</li>
  <li>30 VPCs → 435</li>
  <li>60 VPCs → 1,770</li>
</ul>
<p style="line-height: 1.75;">The connection count alone would be tolerable if it were only an inventory problem. The real pain is the <strong>route tables</strong>. Each VPC needs a route to every other VPC's CIDR, in <em>every route table it uses</em>. A VPC with public, private and database route tables peered to twenty-nine others needs up to eighty-seven route entries, and every new VPC added to the estate means touching all twenty-nine existing VPCs. There are also hard quotas — a route table has a default limit on entries (raisable, but not unbounded), and an account has a limit on active peering connections per VPC — so at sufficient scale you do not merely find it annoying, you find it impossible.</p>
<p style="line-height: 1.75;">Compare that with a Transit Gateway, where the same thirty VPCs need thirty attachments and, in the simplest design, a single summarised route such as <code>10.0.0.0/8</code> pointing at the TGW in each VPC. Adding VPC thirty-one touches nothing that already exists. The operational difference is not incremental; it is the difference between a change that is a ticket and a change that is a project.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Limitation 3: no overlapping CIDRs, and no edge-to-edge routing</h4>
<p style="line-height: 1.75;">You cannot peer two VPCs whose CIDR blocks overlap — the request is simply rejected, because routing would be ambiguous. This is shared with Transit Gateway, so it is not a differentiator, but it is worth stating because it catches out mergers and acquisitions, where two organisations have both used <code>10.0.0.0/16</code>. If a secondary CIDR on either VPC overlaps, that also blocks the peering.</p>
<p style="line-height: 1.75;">Less well known, and a favourite interview detail, is the <strong>edge-to-edge routing restriction</strong>. You cannot use a peering connection to reach resources on the <em>other side</em> of the peer VPC's edge devices. Concretely, if VPC A is peered to VPC B, then A cannot:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>use B's <strong>internet gateway</strong> to reach the internet;</li>
  <li>use B's <strong>NAT Gateway</strong> for outbound traffic;</li>
  <li>use B's <strong>VPN or Direct Connect</strong> connection to reach on-premises;</li>
  <li>use B's <strong>gateway VPC endpoints</strong> to reach S3 or DynamoDB privately.</li>
</ul>
<p style="line-height: 1.75;">This is exactly why "centralised egress through a shared NAT VPC" cannot be built with peering — it requires a Transit Gateway (or a Gateway Load Balancer arrangement). Candidates who know this rule can answer cost-optimisation questions properly: the reason you cannot simply peer everything to one NAT VPC and save money is edge-to-edge routing, and the reason a TGW can do it is that the TGW itself is the router.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Side by side</h4>
<div style="overflow-x: auto; margin-top: 0.75rem;">
<table style="width: 100%; border-collapse: collapse; font-size: 0.92rem;">
  <thead>
    <tr style="background: #f1f5f9; text-align: left;">
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;"></th>
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;">VPC Peering</th>
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;">Transit Gateway</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Topology</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Point-to-point mesh</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Hub and spoke</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Connections for n VPCs</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">n(n−1)/2</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">n</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Transitive routing</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;"><strong>No</strong></td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Yes</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Hourly charge</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;"><strong>None</strong></td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Per attachment, per hour</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Data processing charge</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;"><strong>None</strong> (transfer only)</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Per GB processed</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Extra hop / latency</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">None — direct path</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">One hop through the hub</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Bandwidth limit</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">No peering-imposed limit</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">~50 Gbps per attachment; ~5 Gbps per flow</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Cross-region</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Yes (inter-region peering)</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Yes (TGW peering)</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Security group referencing</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;"><strong>Yes, same region</strong></td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">No</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Centralised egress / inspection</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">No (edge-to-edge restriction)</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Yes</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Segmentation</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Implicit (connect or don't)</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Explicit, via route tables</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Overlapping CIDRs</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Not supported</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Not supported</td></tr>
  </tbody>
</table>
</div>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The cost comparison, done honestly</h4>
<p style="line-height: 1.75;">Cost is where candidates often reflexively say "Transit Gateway is better" and get pushed back on. The structures are genuinely different:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Peering</strong> has <em>no</em> hourly charge and <em>no</em> processing charge. You pay only standard data transfer — and within the same region and the same availability zone, peered traffic is free; across AZs it is charged at the normal cross-AZ rate in both directions; across regions at the inter-region rate.</li>
  <li><strong>Transit Gateway</strong> charges an hourly fee <em>per attachment</em> plus a fee <em>per GB processed</em>, on top of the underlying data transfer.</li>
</ul>
<p style="line-height: 1.75;">The practical consequence: for two VPCs exchanging a very large volume of data, peering can be dramatically cheaper, because the per-GB processing charge on a TGW applies to every gigabyte that crosses the hub. For twenty VPCs exchanging modest volumes, the TGW's attachment fees are trivial next to the engineering cost of managing 190 peering connections, and the centralised NAT saving frequently pays for the TGW several times over.</p>
<p style="line-height: 1.75;">This is why a <strong>hybrid design</strong> is common and worth proposing: run a Transit Gateway as the general-purpose fabric for the estate, and add a <em>direct peering connection</em> between the two specific VPCs that exchange terabytes — for example an analytics VPC and its data lake. Because more specific routes win, you point just that prefix at the peering connection and leave everything else on the hub. Suggesting that unprompted signals that you understand both the mechanism and the economics.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Latency and throughput</h4>
<p style="line-height: 1.75;">Peering gives a <strong>direct path</strong> with no intermediate hop, and imposes no bandwidth ceiling of its own — you are limited by the instances' network performance, not by the peering. A Transit Gateway adds a hop through the hub, which costs a small amount of latency (typically sub-millisecond within a region, but measurable), and applies per-attachment and per-flow bandwidth limits. The per-flow limit is the one that surprises people: a single TCP stream through a TGW is capped at roughly 5 Gbps regardless of the attachment's headroom, so a large single-stream transfer that saturated a peering link may slow down after a migration. The fix is parallel streams, or keeping that particular path on peering.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">When peering is still the right answer</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Two to about five VPCs</strong> with a stable, known connectivity pattern.</li>
  <li><strong>Very high data volumes</strong> between a specific pair, where per-GB processing charges would dominate.</li>
  <li><strong>Latency-sensitive paths</strong> where the extra hop matters.</li>
  <li><strong>A single connection to an external partner's VPC</strong>, where you want exactly one relationship and no risk of that partner reaching anything else.</li>
  <li><strong>Same-region designs that rely on cross-VPC security group references</strong>, which peering supports and Transit Gateway does not.</li>
  <li><strong>Cost-sensitive environments</strong> where connectivity is genuinely sparse — three VPCs that each talk to one other VPC do not need a hub.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The decision framework to say out loud</h4>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>How many VPCs, and what is the growth trajectory?</strong> Under five and static, peer. Growing, or already above five, use a hub.</li>
  <li><strong>Is on-premises connectivity involved?</strong> If yes, Transit Gateway, almost regardless of count — otherwise every VPC needs its own VPN or Direct Connect attachment.</li>
  <li><strong>Do you need centralised egress or inspection?</strong> If yes, Transit Gateway — peering cannot do it because of edge-to-edge routing.</li>
  <li><strong>Do you need routing-level segmentation between environments?</strong> If yes, Transit Gateway route tables give it declaratively.</li>
  <li><strong>Is there a single very high-volume path?</strong> If yes, consider peering that pair even inside a TGW design.</li>
  <li><strong>Do the CIDRs overlap?</strong> If yes, neither works — re-address, NAT, or use PrivateLink.</li>
</ol>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Traps to avoid in the answer</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Saying peering is "less secure". It is not — traffic is private and never touches the internet in either case. The difference is manageability and topology.</li>
  <li>Saying Transit Gateway is always better. The cost structure says otherwise for high-volume, low-count designs.</li>
  <li>Forgetting that <strong>both</strong> require route table entries and that both reject overlapping CIDRs.</li>
  <li>Claiming a TGW gives you security segmentation on its own. It gives <em>routing</em> segmentation; security groups and NACLs still decide what is permitted.</li>
  <li>Overlooking that peering needs acceptance and routes on both sides, so "I created the peering and it doesn't work" is nearly always missing routes.</li>
</ul>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Inter-region peering, and what changes across a region boundary</h4>
<p style="line-height: 1.75;">Peering is not limited to one region, and inter-region peering is worth knowing separately because several properties change. Traffic travels the <strong>AWS global backbone</strong> rather than the public internet and is <strong>encrypted in transit</strong> automatically, which usually satisfies the compliance question that inevitably follows. But three capabilities drop away:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Security group references stop working.</strong> Across regions you are back to CIDR-based rules, with all the drift that implies.</li>
  <li><strong>Jumbo frames are not supported</strong>, so the MTU falls back to 1500 — occasionally relevant for bulk transfer performance.</li>
  <li><strong>DNS resolution of private addresses</strong> behaves differently and needs explicit configuration.</li>
</ul>
<p style="line-height: 1.75;">The costing also changes: inter-region data transfer is charged at the inter-region rate in both directions, which is materially more than intra-region traffic. For a pair of VPCs in different regions exchanging a steady stream of data, that charge usually dwarfs any argument about attachment fees, and the design conversation becomes "should this data be crossing regions at all?" rather than "peering or Transit Gateway?".</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What "non-transitive" means for hybrid connectivity</h4>
<p style="line-height: 1.75;">Non-transitivity has a consequence beyond VPC-to-VPC traffic that is easy to miss and frequently tested. If VPC A has a Virtual Private Gateway with a VPN to your data centre, and VPC B is peered with A, then <strong>B cannot reach on-premises through A's VPN</strong>. Nor can on-premises reach B. This is the edge-to-edge restriction again, and it means that in a peering-based estate <em>every VPC that needs hybrid connectivity needs its own VPN or Direct Connect attachment</em>.</p>
<p style="line-height: 1.75;">That is the hidden cost that usually decides the argument in practice. Ten VPCs needing on-premises access means ten Virtual Private Gateways, ten VPN connections, twenty tunnels, ten sets of BGP sessions to configure on your routers, and ten things to monitor — or, with a Transit Gateway, one VPN connection terminating on the hub and ten attachments. Even organisations with only a handful of VPCs frequently adopt a Transit Gateway for this reason alone, well before the VPC count would justify it.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Operational differences you feel day to day</h4>
<p style="line-height: 1.75;">Beyond topology and cost, the two feel different to run, and describing that is a sign of experience rather than reading.</p>
<p style="line-height: 1.75;"><strong>Change safety.</strong> A peering change affects exactly two VPCs, so the blast radius of a mistake is small and contained. A Transit Gateway route table change can affect every attached VPC simultaneously — which is powerful when you want it and alarming when you do not. Mature TGW deployments therefore treat route tables as production infrastructure: defined in code, reviewed, and rolled out in stages, with production and non-production in separate routing domains so a mistake in one cannot reach the other.</p>
<p style="line-height: 1.75;"><strong>Observability.</strong> Peering traffic appears in VPC flow logs on both sides, but nothing tells you it traversed a specific peering connection, so attributing traffic to a relationship requires inference from CIDRs. Transit Gateway flow logs record the <strong>source and destination attachment</strong>, which answers "which VPC generated this?" directly — a capability that becomes genuinely valuable once you have more than a handful of networks.</p>
<p style="line-height: 1.75;"><strong>Failure modes.</strong> A deleted peering connection leaves <strong>blackhole routes</strong> behind in every route table that referenced it, and those routes silently discard traffic rather than failing loudly. Auditing for <code>blackhole</code> state is a worthwhile periodic check in any peering-based estate. A Transit Gateway's equivalent failure is a missing or one-sided propagation, which presents as one-directional connectivity — also silent, but diagnosable from a single place rather than from dozens of route tables.</p>
<p style="line-height: 1.75;"><strong>Governance.</strong> With peering, any account that owns a VPC can request a connection, and acceptance is the only control. With a Transit Gateway shared through RAM, the networking account keeps the route tables, so workload teams can create attachments but cannot grant themselves reachability — which is usually the division a platform team wants.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">A short decision script</h4>
<p style="line-height: 1.75;">If you want one paragraph to say under pressure: "Peering for a small, stable set of VPCs with mutual trust, especially where data volumes are high or latency matters, and where I want cross-VPC security group references. Transit Gateway the moment there is hybrid connectivity, centralised egress or inspection, routing-level segmentation, or more than about five VPCs — because the mesh maintenance and the per-VPC VPN duplication both become untenable. And I am happy to run both, using a direct peering for the single heaviest path inside an otherwise hub-and-spoke design, because more specific routes win."</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Quotas that decide the argument for you</h4>
<p style="line-height: 1.75;">Sometimes the choice is settled by limits rather than judgement, and knowing roughly where they sit is useful. A VPC supports a bounded number of <strong>active peering connections</strong> (raisable, but not without limit), and a route table supports a bounded number of <strong>routes</strong> — which is the one you hit first, because a full mesh requires a route per peer in every route table. A Transit Gateway, by contrast, supports thousands of attachments and a large number of routes per route table, and a VPC needs only one summarised route to reach all of them.</p>
<p style="line-height: 1.75;">There is also a quieter limit: the <strong>number of routes a VPC route table can hold when propagation is involved</strong>, which matters once hybrid routes are in the picture. The practical signal is that if you find yourself requesting quota increases to keep a peering mesh working, the mesh has already outgrown the model and the increase is postponing rather than solving the problem.</p>


<p style="line-height: 1.75;">A last observation about how this question is usually marked. Interviewers are rarely looking for a preference; they are looking for a <strong>threshold and a reason</strong>. Answering "Transit Gateway, it scales better" is weaker than "peering up to about five VPCs, or wherever there is a single very high-volume path, and a Transit Gateway the moment hybrid connectivity or centralised egress appears — because peering is non-transitive and the edge-to-edge restriction makes shared NAT impossible." The second answer contains a number, a mechanism and a counter-case, which is what demonstrates that the knowledge is load-bearing rather than recalled.</p>

<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Peering is a point-to-point link between two VPCs; Transit Gateway is a hub. Peering fails to scale for three reasons: it is <strong>non-transitive</strong>, so A–B and B–C never gives A–C; a full mesh needs <strong>n(n−1)/2</strong> connections plus route entries in every route table on both sides, so adding one VPC means editing all the others; and the <strong>edge-to-edge routing restriction</strong> means you cannot use a peer's NAT Gateway, internet gateway, VPN or gateway endpoints — which is why centralised egress is impossible with peering. My threshold is about five VPCs, or any requirement for hybrid connectivity, central inspection or routing segmentation. I would still use peering for a small number of VPCs, for a very high-volume path where the TGW's per-GB processing charge would dominate, or where I want cross-VPC security group references, which peering supports in-region and TGW does not — and I am happy to run both, peering the one heavy path inside an otherwise TGW-based design."</div>
</div>`,
          examples: [
            `# ---------- Peering: request, accept, and then the part people forget ----------
PCX=$(aws ec2 create-vpc-peering-connection \\
  --vpc-id vpc-0aaa --peer-vpc-id vpc-0bbb \\
  --peer-owner-id 444455556666 --peer-region eu-west-1 \\
  --query 'VpcPeeringConnection.VpcPeeringConnectionId' --output text)

aws ec2 accept-vpc-peering-connection --vpc-peering-connection-id $PCX

# NOTHING FLOWS YET. Routes are required on BOTH sides, in EVERY
# route table whose subnets should participate.
aws ec2 create-route --route-table-id rtb-0aaa-private \\
  --destination-cidr-block 10.20.0.0/16 --vpc-peering-connection-id $PCX
aws ec2 create-route --route-table-id rtb-0bbb-private \\
  --destination-cidr-block 10.10.0.0/16 --vpc-peering-connection-id $PCX

# Make peer DNS resolve to PRIVATE IPs, not public ones
aws ec2 modify-vpc-peering-connection-options \\
  --vpc-peering-connection-id $PCX \\
  --requester-peering-connection-options AllowDnsResolutionFromRemoteVpc=true \\
  --accepter-peering-connection-options  AllowDnsResolutionFromRemoteVpc=true`,

            `# ---------- Non-transitive, demonstrated ----------
# A(10.10/16) <-peer-> B(10.20/16) <-peer-> C(10.30/16)
#
# From A, try to reach C:
#   aws ec2 create-route --route-table-id rtb-A \\
#     --destination-cidr-block 10.30.0.0/16 --vpc-peering-connection-id $PCX_AB
#   -> the route is accepted, and traffic is BLACKHOLED.
#      B does not forward. There is no setting that makes it forward.
#
# The only fixes:
#   1. A third peering connection A <-> C  (mesh grows)
#   2. A routing appliance inside B        (you now own its HA)
#   3. Transit Gateway                     (B is no longer in the path)

# EDGE-TO-EDGE: none of these work across a peering connection
#   A -> B's internet gateway
#   A -> B's NAT Gateway            <-- kills "centralised egress via peering"
#   A -> B's VPN / Direct Connect
#   A -> B's S3/DynamoDB gateway endpoint`,

            `# ---------- The advantage peering has and TGW does not ----------
# Same-region peering lets you reference a security group in the PEER VPC
# by ID, instead of hard-coding CIDRs that drift.
aws ec2 authorize-security-group-ingress \\
  --group-id sg-0db-in-vpc-b \\
  --ip-permissions '[{
    "IpProtocol":"tcp","FromPort":5432,"ToPort":5432,
    "UserIdGroupPairs":[{"GroupId":"sg-0app-in-vpc-a","VpcPeeringConnectionId":"'$PCX'"}]
  }]'

# Through a Transit Gateway this is impossible - you must use CIDRs:
#   --cidr 10.10.1.0/24
# which silently grants access to anything that lands in that range later.`,

            `# ---------- Cost: the comparison that decides real designs ----------
# PEERING
#   hourly charge ............ none
#   per-GB processing ........ none
#   you pay ................... standard data transfer only
#                               (free same-AZ; cross-AZ charged both ways)
#
# TRANSIT GATEWAY
#   per attachment per hour ... yes
#   per GB processed .......... yes
#   plus ...................... underlying data transfer
#
# So: 2 VPCs moving 500 TB/month  -> peering wins, decisively.
#     25 VPCs moving 5 TB/month   -> TGW wins on operations, and the
#                                    centralised NAT saving usually pays
#                                    for the attachments several times over.

# HYBRID - more specific route wins, so peer just the heavy path:
aws ec2 create-route --route-table-id rtb-analytics \\
  --destination-cidr-block 10.44.0.0/16 --vpc-peering-connection-id $PCX_HEAVY
aws ec2 create-route --route-table-id rtb-analytics \\
  --destination-cidr-block 10.0.0.0/8 --transit-gateway-id tgw-0hub`,

            `# ---------- Audit an existing mesh before you migrate ----------
echo "### how many active peerings, and between what?"
aws ec2 describe-vpc-peering-connections \\
  --filters Name=status-code,Values=active \\
  --query 'VpcPeeringConnections[].[VpcPeeringConnectionId,
            RequesterVpcInfo.VpcId,RequesterVpcInfo.CidrBlock,
            AccepterVpcInfo.VpcId,AccepterVpcInfo.CidrBlock]' --output table

echo "### blackholed routes = a peering was deleted with routes still pointing at it"
aws ec2 describe-route-tables \\
  --query 'RouteTables[].Routes[?State==\`blackhole\`].[DestinationCidrBlock,VpcPeeringConnectionId]' \\
  --output text

echo "### how close are we to route-table quotas?"
aws ec2 describe-route-tables \\
  --query 'RouteTables[].{rtb:RouteTableId,routes:length(Routes)}' --output table

echo "### do any CIDRs overlap? (blocks BOTH peering and TGW)"
aws ec2 describe-vpcs --query 'Vpcs[].[VpcId,CidrBlock]' --output text | sort -k2`,
          ],
          questions: [
            {
              question: "Why doesn't VPC peering scale, and at what point do you switch to Transit Gateway?",
              solution: "<p>Three reasons. It is <strong>non-transitive</strong>, so connectivity cannot be chained and full connectivity requires a full mesh. That mesh grows as <strong>n(n−1)/2</strong> — 45 connections for ten VPCs, 190 for twenty — and each connection needs <strong>route entries on both sides in every participating route table</strong>, so adding one VPC means editing every existing VPC, eventually hitting route-table quotas. And the <strong>edge-to-edge routing restriction</strong> means a peer cannot use your NAT Gateway, internet gateway, VPN or gateway endpoints, so shared egress and centralised inspection are impossible. My practical threshold is about five VPCs, or immediately if hybrid connectivity, centralised egress or routing-level segmentation is required.</p>",
            },
            {
              question: "VPC A is peered to B, and B is peered to C. Can A reach C?",
              solution: "<p><strong>No.</strong> Peering is strictly non-transitive — traffic does not pass through the intermediate VPC, and no route, flag or setting changes that. If you add a route in A for C's CIDR pointing at the A–B peering connection, the route is accepted and the traffic is silently blackholed, which makes this a particularly confusing failure. The options are: create a third peering connection between A and C, place a routing appliance inside B and own its availability yourself, or move to a <strong>Transit Gateway</strong>, which is a router and therefore forwards between attachments by design.</p>",
            },
            {
              question: "What is the edge-to-edge routing restriction and why does it matter?",
              solution: "<p>It means a peered VPC cannot reach resources on the far side of the peer's <em>edge devices</em>. Concretely, across a peering connection you cannot use the peer's <strong>internet gateway</strong>, <strong>NAT Gateway</strong>, <strong>VPN or Direct Connect</strong> connection, or <strong>gateway VPC endpoints</strong> for S3 and DynamoDB. It matters because it rules out the most common cost-optimisation design — a single shared egress VPC with centralised NAT Gateways serving many VPCs. That design requires a <strong>Transit Gateway</strong>, because the TGW is itself a router and can forward a default route to the egress VPC's attachment. Knowing this rule is what lets you answer \"why can't we just peer everything to the NAT VPC?\" correctly.</p>",
            },
            {
              question: "Is Transit Gateway always cheaper or better than peering?",
              solution: "<p>No, and the cost structures are genuinely different. <strong>Peering has no hourly charge and no per-GB processing charge</strong> — you pay only standard data transfer, and same-AZ traffic within a region is free. <strong>Transit Gateway charges per attachment-hour plus per GB processed</strong>, on top of data transfer. So two VPCs exchanging very large volumes can be dramatically cheaper peered, and peering also avoids the extra hop and the TGW's roughly 5 Gbps per-flow limit. The TGW earns its cost at scale through operational simplicity and by enabling centralised NAT, which usually saves more than the attachments cost. A sensible answer is often <strong>both</strong>: a TGW as the general fabric, with a direct peering for the one terabyte-scale path, relying on more-specific-route-wins.</p>",
            },
            {
              question: "Name something VPC peering can do that Transit Gateway cannot.",
              solution: "<p><strong>Cross-VPC security group referencing.</strong> With same-region peering you can write a security group rule whose source is a security group <em>in the peer VPC</em>, identified by ID, rather than a CIDR range. That keeps working as instances come and go and avoids hard-coding address ranges that later grant access to unrelated workloads. This is not available through a Transit Gateway, and not available across regions even with peering. Peering also gives a <strong>direct path with no extra hop</strong>, no per-flow bandwidth ceiling imposed by a hub, and no per-GB processing charge — so for latency-sensitive or very high-throughput pairs it remains the better mechanism.</p>",
            },
            {
              question: "How would you migrate an existing peering mesh to a Transit Gateway without downtime?",
              solution: "<p>Exploit the fact that <strong>more specific routes win</strong>. First create the TGW and attach every VPC — attachments alone move no traffic. Build the route tables, associations and propagations to match the segmentation you want, and verify with <strong>Reachability Analyzer</strong> rather than live traffic. Then migrate one destination prefix at a time: in a VPC's route table, replace the specific peering route for that prefix with a route to the TGW, leaving all other prefixes on peering. Confirm with flow logs that traffic is now traversing the hub, keeping the peering connection in place as an instant rollback. Only once no route anywhere references a peering connection do you delete it — deleting a peering while routes still point at it blackholes traffic immediately.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html",
            "https://docs.aws.amazon.com/vpc/latest/peering/vpc-peering-basics.html",
            "https://docs.aws.amazon.com/vpc/latest/peering/vpc-peering-security-groups.html",
            "https://docs.aws.amazon.com/vpc/latest/tgw/tgw-best-design-practices.html",
          ],
        },
        {
          topic: "AWS PrivateLink — Exposing a Service Privately Without Connecting Networks",
          tags: ["aws", "vpc", "privatelink", "endpoint service", "interface endpoint", "nlb", "saas"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>AWS PrivateLink</strong> answers a question that peering and Transit Gateway answer badly: <em>how do I let someone consume one specific service of mine, privately, without joining our networks together?</em> Peering and Transit Gateway are network-level tools — they merge routing domains, so once connected, reachability is governed by routes and security groups across whole address ranges. PrivateLink is a service-level tool. It exposes exactly one endpoint, in one direction, and it never creates a routing relationship at all.
</p>
<p style="line-height: 1.75;">The mental model that makes it click: peering and Transit Gateway are like connecting two office buildings with a corridor — now everything depends on who has keys to which doors. PrivateLink is like installing a single service window in a wall. The consumer can reach through that window and nothing else. They cannot walk into the building, they cannot see the corridor, and it does not matter whether the two buildings happen to use the same room numbering.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The three moving parts</h4>
<p style="line-height: 1.75;">A PrivateLink setup always has the same shape, and being able to name the three pieces in order is most of the answer.</p>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>On the provider side: a load balancer.</strong> Normally a <strong>Network Load Balancer</strong>, which fronts whatever is actually serving the traffic — EC2 instances, ECS tasks, an internal ALB registered as a target. A <strong>Gateway Load Balancer</strong> is used instead when the "service" is a fleet of inline appliances such as firewalls.</li>
  <li><strong>On the provider side: a VPC endpoint service.</strong> This is the object you create in front of the load balancer that says "this is available for others to connect to". It gets a service name of the form <code>com.amazonaws.vpce.eu-west-1.vpce-svc-0abc123</code>, which is what you hand to consumers. You control who may connect through an <strong>allow-list of principals</strong> (accounts, roles or users) and whether connections require manual <strong>acceptance</strong>.</li>
  <li><strong>On the consumer side: an interface VPC endpoint.</strong> The consumer creates an endpoint in their own VPC, naming the service and choosing subnets. AWS places an <strong>elastic network interface with a private IP address from the consumer's own subnet</strong> in each chosen availability zone. The consumer's applications then connect to that private IP — which, from their perspective, is simply an address inside their own network.</li>
</ol>
<p style="line-height: 1.75;">That last detail is the whole trick and worth dwelling on. The endpoint ENI lives in the consumer's subnet and carries the consumer's address space. Traffic to it never traverses a route to the provider's VPC, because as far as the consumer's routing is concerned the destination is local. AWS handles the mapping from that ENI to the provider's load balancer internally. No route table entry is needed, no peering exists, and no prefix from the provider's network is ever advertised into the consumer's network.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Why that design is so useful</h4>
<p style="line-height: 1.75;">Four properties fall out of it, and each answers a real design problem.</p>
<p style="line-height: 1.75;"><strong>Overlapping CIDRs do not matter.</strong> This is the property people underuse. Peering and Transit Gateway both refuse to work when address ranges collide, and re-addressing a production network is an enormous undertaking. PrivateLink does not care: the consumer talks to an address in their own range, the provider serves from theirs, and the two never need to be routable to each other. In mergers, acquisitions and SaaS integrations — exactly the situations where collisions are guaranteed — this often turns an impossible problem into a straightforward one.</p>
<p style="line-height: 1.75;"><strong>The exposure is a single endpoint, not a network.</strong> With peering, the blast radius of a mistake is a whole CIDR range and depends on security group hygiene on hundreds of instances. With PrivateLink, the consumer can reach the load balancer's listeners and nothing else. There is no lateral movement path, because there is no path.</p>
<p style="line-height: 1.75;"><strong>It is unidirectional.</strong> The consumer initiates; the provider cannot initiate connections back through the endpoint. That asymmetry is often exactly what you want — a vendor's monitoring agent should be able to call home, but the vendor should not be able to reach into your environment.</p>
<p style="line-height: 1.75;"><strong>It scales to many consumers without topology growth.</strong> One endpoint service can accept connections from a very large number of consumer VPCs and accounts. Each consumer creates their own endpoint; the provider's side does not change. Compare that with peering, where every new consumer is a new connection plus routes on both sides, or with a Transit Gateway, where every consumer needs to be in the same routing domain — which is precisely what you do not want when consumers are different customers who must not see each other.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Interface endpoints for AWS's own services</h4>
<p style="line-height: 1.75;">Here is the connection that many people miss: <strong>the interface endpoints you create for AWS services are PrivateLink</strong>. When you create an endpoint for <code>com.amazonaws.eu-west-1.secretsmanager</code> or <code>.ssm</code> or <code>.ecr.api</code>, you are consuming a PrivateLink service that AWS publishes, using exactly the same mechanism. AWS is the provider; you are the consumer; an ENI appears in your subnet.</p>
<p style="line-height: 1.75;">That matters practically because it is how a workload in a fully private subnet reaches AWS APIs without any internet path at all — no NAT Gateway, no internet gateway. A private EC2 instance managed by Systems Manager needs endpoints for <code>ssm</code>, <code>ssmmessages</code> and <code>ec2messages</code>; a Fargate task pulling an image needs <code>ecr.api</code>, <code>ecr.dkr</code>, <code>logs</code>, and an S3 endpoint for the image layers. Getting that list right is a very common practical task and a very common interview scenario.</p>
<p style="line-height: 1.75;">The important distinction to hold alongside it: <strong>S3 and DynamoDB also offer <em>gateway</em> endpoints</strong>, which work completely differently — they are route table entries with a prefix list, they cost nothing, and they cannot be reached from outside the VPC. Interface endpoints for S3 also exist and are useful precisely because, unlike gateway endpoints, they <em>can</em> be reached from on-premises over Direct Connect or VPN. Choosing between them is a real design decision covered in depth in the S3/DynamoDB topic.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Private DNS, and the failure everyone hits once</h4>
<p style="line-height: 1.75;">An endpoint gives you AWS-generated DNS names that resolve to the endpoint ENIs. For AWS service endpoints there is also an option called <strong>private DNS</strong>, which overrides the <em>public</em> service hostname inside your VPC so that <code>secretsmanager.eu-west-1.amazonaws.com</code> resolves to your endpoint's private IP instead of the public address. Enabling it means your existing code and SDKs work unchanged — which is the point, because nobody wants to rewrite every client to use an endpoint-specific hostname.</p>
<p style="line-height: 1.75;">Private DNS requires <code>enableDnsSupport</code> and <code>enableDnsHostnames</code> on the VPC, and this is where the classic failure occurs: the endpoint is created, security groups are correct, and calls still go out through the NAT Gateway — because private DNS was left disabled, or DNS hostnames were never enabled on the VPC, so the public name still resolves publicly. The symptom is that everything works (so nobody notices) while you continue paying NAT data processing charges for traffic you thought was private. Checking with <code>dig</code> or <code>nslookup</code> from inside the VPC is the fastest way to confirm which path is actually in use.</p>
<p style="line-height: 1.75;">For your <em>own</em> endpoint services, you can also configure a private DNS name, but AWS requires you to prove domain ownership with a TXT record before it will let you claim it — a sensible control that prevents someone publishing an endpoint service claiming to be another company's domain.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Access control on both sides</h4>
<p style="line-height: 1.75;">There are several independent controls, and a complete answer names more than one.</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>The provider's allow-list.</strong> An endpoint service names the principals permitted to connect — specific accounts, roles, or <code>*</code>. Combined with <strong>acceptance required</strong>, this gives a deliberate approval step per consumer.</li>
  <li><strong>Security groups on the consumer's endpoint ENI.</strong> The endpoint is an ENI, so it carries security groups. This is what restricts which of the consumer's own instances may use the endpoint — and forgetting to open the port here is the most common reason a brand-new endpoint appears to hang.</li>
  <li><strong>Endpoint policies.</strong> An IAM-style resource policy on the endpoint itself, restricting what can be done through it. For an S3 interface or gateway endpoint you might allow access only to specific buckets, which is a powerful data-perimeter control: even a principal with broad S3 permissions cannot reach an unapproved bucket through that endpoint.</li>
  <li><strong>Condition keys.</strong> <code>aws:SourceVpce</code> and <code>aws:SourceVpc</code> let a resource policy on the far side require that requests arrive through a specific endpoint — the identity-side and resource-side halves of the same control.</li>
  <li><strong>The provider's own load balancer and application authentication.</strong> PrivateLink establishes a private path; it is not authentication. The service behind it still needs to authenticate callers, because every approved consumer reaches the same listeners.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Cost, and why it drives design</h4>
<p style="line-height: 1.75;">Interface endpoints are billed <strong>per endpoint, per availability zone, per hour</strong>, plus a charge <strong>per GB processed</strong>. The hourly component is the one that surprises teams, because it is charged per AZ: an endpoint deployed across three AZs costs three times the hourly rate, and a design with twenty AWS service endpoints in three AZs across thirty VPCs becomes a genuinely large monthly line item.</p>
<p style="line-height: 1.75;">That economic pressure produces a standard pattern: <strong>centralised endpoints</strong>. Rather than every VPC creating its own set, a shared-services VPC hosts one set of interface endpoints, and other VPCs reach them across a Transit Gateway, with Route 53 Resolver rules and private hosted zones making the names resolve correctly from the spokes. You trade TGW data processing charges for endpoint hourly charges, and above a certain number of VPCs the centralised design wins clearly. Being able to describe that trade-off — and to note that <em>gateway</em> endpoints for S3 and DynamoDB are free and therefore should always be created locally in every VPC — is a strong, practical answer.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Limits and constraints worth knowing</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>It is TCP only, and inbound only.</strong> The consumer initiates; UDP is not supported for standard PrivateLink services, and the provider cannot open connections back.</li>
  <li><strong>The provider must front the service with an NLB or GWLB.</strong> You cannot publish a bare instance or an ALB directly — though an internal ALB can be registered as a target of the NLB, which is the usual way to get layer-7 features.</li>
  <li><strong>Availability zone alignment matters.</strong> An endpoint service is only available in the AZs where the NLB has subnets. Because AZ names are randomised per account, AWS uses AZ <em>IDs</em> for this — so a consumer in an AZ the provider does not serve will find the service unavailable there, which looks like a bug and is really an AZ mismatch.</li>
  <li><strong>Source IP is not preserved by default.</strong> The provider sees the NLB's addresses unless client IP preservation or the Proxy Protocol is enabled, which matters for allow-listing and for logging.</li>
  <li><strong>It is regional.</strong> Cross-region access requires either a cross-region endpoint capability where supported, or fronting the service in each region.</li>
  <li><strong>Quotas</strong> exist on endpoints per VPC, connections per endpoint service, and allow-listed principals — generous, but worth checking for a large SaaS deployment.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">When to choose it over peering or Transit Gateway</h4>
<p style="line-height: 1.75;">The decision is about <em>what</em> you are connecting, not how many.</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Exposing one service to consumers you do not fully trust</strong> — other business units, partners, customers of a SaaS product. PrivateLink, every time.</li>
  <li><strong>Overlapping CIDRs</strong> that you cannot re-address. PrivateLink, because it is the only option that ignores addressing entirely.</li>
  <li><strong>Many consumers who must not see each other.</strong> PrivateLink, because each consumer's endpoint is independent; a shared Transit Gateway routing domain would risk exactly the wrong kind of visibility.</li>
  <li><strong>General network connectivity</strong> — many services, bidirectional traffic, on-premises integration. Transit Gateway.</li>
  <li><strong>Two VPCs, heavy traffic, mutual trust.</strong> Peering.</li>
</ul>
<p style="line-height: 1.75;">A useful line to close on: <strong>Transit Gateway connects networks; PrivateLink publishes services.</strong> If the requirement is phrased as "team X needs to call our API", that is a service and PrivateLink is the better fit. If it is phrased as "these environments need to talk to each other", that is a network.</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What the provider sees, and why source IP matters</h4>
<p style="line-height: 1.75;">By default the provider's targets see the <strong>Network Load Balancer's addresses</strong> as the source, not the consumer's. That has three practical consequences worth knowing.</p>
<p style="line-height: 1.75;">First, <strong>you cannot allow-list consumers by IP address</strong> at the application layer, because every consumer looks the same. Authorisation has to come from somewhere else — mutual TLS, an API key, a token, or the endpoint-service allow-list itself. Second, <strong>logging is less useful</strong> unless you do something about it: every request appears to come from a handful of load balancer addresses, which makes per-tenant analysis impossible. Third, because consumer address spaces may overlap with each other and with yours, the source address would not be meaningful even if you had it.</p>
<p style="line-height: 1.75;">The remedies are <strong>client IP preservation</strong> on the NLB target group where the target type supports it, or the <strong>Proxy Protocol v2</strong>, which prepends connection metadata — including the consumer's VPC endpoint ID — so the application can identify which consumer a connection came from. That endpoint ID is the useful identifier in a PrivateLink context, more so than an IP address, because it maps directly to a specific consumer account. Designing for it up front is much easier than retrofitting per-tenant attribution later.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The availability zone trap</h4>
<p style="line-height: 1.75;">An endpoint service is only available in the availability zones where its Network Load Balancer has subnets. A consumer trying to create an endpoint in an AZ the provider does not serve will find the service unavailable there — and because <strong>AZ names are randomised per account</strong>, the provider's <code>eu-west-1a</code> may be the consumer's <code>eu-west-1c</code>. AWS therefore matches on <strong>AZ IDs</strong> internally, and the endpoint service configuration exposes the supported zones so consumers can check.</p>
<p style="line-height: 1.75;">The failure is confusing because everything else looks correct: permissions are right, the service name is right, and the endpoint simply cannot be created in one particular subnet. The fix is for the provider to add subnets in more zones, or for the consumer to place the endpoint in a zone that is served — and the preventative measure is for a provider to enable their NLB in every AZ in the region, so no consumer can be excluded.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Centralised endpoints, in more detail</h4>
<p style="line-height: 1.75;">Because interface endpoints are billed per AZ per hour, a large estate creating a full set in every VPC accumulates a substantial bill for what is fundamentally the same capability repeated. The centralised pattern is worth being able to describe end to end, because it is a realistic design question.</p>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li>A <strong>shared-services VPC</strong> hosts one set of interface endpoints across the AZs you use.</li>
  <li>Spoke VPCs reach it over a <strong>Transit Gateway</strong>.</li>
  <li>Because <strong>private DNS</strong> only works inside the VPC that owns the endpoint, you disable it there and instead create a <strong>Route 53 private hosted zone</strong> for each service's hostname, with records pointing at the endpoint's addresses, and associate that hosted zone with every spoke VPC.</li>
  <li>Spoke workloads then resolve the normal service hostname to the central endpoint and route to it over the hub, with no application change.</li>
</ol>
<p style="line-height: 1.75;">The economics are a straight trade: you remove per-VPC endpoint hourly charges and add Transit Gateway per-GB processing charges. Above a certain VPC count the centralised design wins clearly; below it, local endpoints are simpler. The one part of the design that should <em>never</em> be centralised is the <strong>gateway endpoints for S3 and DynamoDB</strong> — they are free, they cannot be reached across a Transit Gateway anyway because of the edge-to-edge restriction, and there is no scenario in which omitting them locally is correct.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Gateway Load Balancer endpoints, briefly</h4>
<p style="line-height: 1.75;">A variant worth recognising: <strong>Gateway Load Balancer endpoints</strong> use the same PrivateLink plumbing but operate at layer 3 with GENEVE encapsulation, and they appear as a <em>route target</em> rather than as a destination address. This is the mechanism behind centralised traffic inspection — you route a subnet's traffic to a GWLB endpoint, which sends it to a fleet of firewall appliances and returns it. It is the same family of technology, solving a different problem: rather than publishing a service for consumers to call, it inserts appliances transparently into a path that neither endpoint knows about.</p>


<p style="line-height: 1.75;">A final note on positioning. PrivateLink is frequently introduced as a networking feature, but its real character is closer to an <strong>API gateway between trust domains</strong>. It exposes one thing, in one direction, to named consumers, with no shared routing and no visibility either way beyond that single endpoint. When a design question involves two parties who need to exchange data but should not be on the same network — different business units after an acquisition, a vendor and its customers, a regulated workload and the rest of the estate — that shape is usually the right answer, and reaching for it before reaching for peering or a Transit Gateway is a sign of good instincts.</p>


<p style="line-height: 1.75;">And a practical closing note: the most common PrivateLink mistakes are not architectural but operational. Forgetting the <strong>security group on the endpoint ENI</strong> makes a correct design appear to hang. Leaving <strong>private DNS disabled</strong> means traffic silently keeps using the public path. Placing the endpoint in fewer availability zones than the workload spans creates a partial failure that looks intermittent. And omitting the <strong>allow-list and acceptance</strong> settings on an endpoint service leaves it discoverable more widely than intended. None is hard to fix; all are easy to miss, and checking them first saves considerable time.</p>

<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "PrivateLink exposes a single service privately rather than connecting networks. The provider puts a Network Load Balancer in front of the service and creates a VPC endpoint service; the consumer creates an interface endpoint, which places an ENI <em>with an IP from their own subnet</em> in their VPC. Because the consumer talks to a local address, there is no routing relationship at all — which means <strong>overlapping CIDRs don't matter</strong>, the exposure is one endpoint rather than a whole network, traffic is unidirectional, and one service can serve many consumers who cannot see each other. The interface endpoints we create for AWS services like Secrets Manager and SSM are the same mechanism with AWS as the provider, which is how a private subnet reaches AWS APIs with no NAT at all. The things I watch for are enabling <strong>private DNS</strong> — otherwise calls silently keep going via NAT — security groups on the endpoint ENI, and the per-AZ hourly cost, which is why large estates centralise interface endpoints in a shared VPC behind a Transit Gateway while keeping the free S3 and DynamoDB gateway endpoints local."</div>
</div>`,
          examples: [
            `# ---------- Provider side: publish a service ----------
# 1. NLB in front of whatever actually serves traffic
aws elbv2 create-load-balancer --name orders-nlb --type network \\
  --scheme internal --subnets subnet-0a1 subnet-0b1 subnet-0c1

# 2. The endpoint service itself
SVC=$(aws ec2 create-vpc-endpoint-service-configuration \\
  --network-load-balancer-arns arn:aws:elasticloadbalancing:eu-west-1:111122223333:loadbalancer/net/orders-nlb/abc \\
  --acceptance-required \\
  --query 'ServiceConfiguration.ServiceName' --output text)
echo $SVC
# com.amazonaws.vpce.eu-west-1.vpce-svc-0abc123def   <-- hand this to consumers

# 3. Who is allowed to even see and connect to it
aws ec2 modify-vpc-endpoint-service-permissions \\
  --service-id vpce-svc-0abc123def \\
  --add-allowed-principals arn:aws:iam::444455556666:root \\
                           arn:aws:iam::777788889999:role/consumer-app`,

            `# ---------- Consumer side: one ENI, in THEIR OWN subnet ----------
aws ec2 create-vpc-endpoint \\
  --vpc-id vpc-0consumer \\
  --vpc-endpoint-type Interface \\
  --service-name com.amazonaws.vpce.eu-west-1.vpce-svc-0abc123def \\
  --subnet-ids subnet-0c1 subnet-0c2 \\
  --security-group-ids sg-0endpoint \\
  --private-dns-enabled

# The ENI gets an address from the CONSUMER's subnet, e.g. 10.99.1.42
# -> no route table entry needed
# -> no peering, no TGW attachment
# -> the provider's CIDR is never advertised into this VPC
# -> so overlapping CIDRs are completely irrelevant

# The most common "it hangs" cause: the endpoint ENI's security group
aws ec2 authorize-security-group-ingress --group-id sg-0endpoint \\
  --protocol tcp --port 443 --source-group sg-0app`,

            `# ---------- AWS service endpoints ARE PrivateLink ----------
# A fully private subnet with NO NAT and NO internet gateway still needs
# to reach AWS APIs. Interface endpoints do that.

for s in ssm ssmmessages ec2messages secretsmanager kms logs sts \\
         ecr.api ecr.dkr monitoring elasticloadbalancing; do
  aws ec2 create-vpc-endpoint --vpc-id vpc-0private \\
    --vpc-endpoint-type Interface \\
    --service-name com.amazonaws.eu-west-1.$s \\
    --subnet-ids subnet-0p1 subnet-0p2 \\
    --security-group-ids sg-0endpoints --private-dns-enabled
done

# S3 and DynamoDB: use the FREE gateway endpoints instead
aws ec2 create-vpc-endpoint --vpc-id vpc-0private \\
  --vpc-endpoint-type Gateway \\
  --service-name com.amazonaws.eu-west-1.s3 \\
  --route-table-ids rtb-0p1 rtb-0p2

# Minimum sets worth memorising:
#   SSM Session Manager -> ssm + ssmmessages + ec2messages
#   Fargate image pull  -> ecr.api + ecr.dkr + logs + S3 (layers)`,

            `# ---------- Verify you are ACTUALLY using the endpoint ----------
# The silent failure: endpoint exists, private DNS off, traffic still
# leaves via NAT. Everything "works" and you keep paying per GB.

dig +short secretsmanager.eu-west-1.amazonaws.com
# 10.99.1.42        <- private IP  = going through the endpoint  ✅
# 52.94.x.x         <- public IP   = still going out via NAT     ❌

aws ec2 describe-vpcs --vpc-ids vpc-0private \\
  --query 'Vpcs[].[EnableDnsSupport.Value,EnableDnsHostnames.Value]'
# BOTH must be true for private DNS to work.

aws ec2 modify-vpc-endpoint --vpc-endpoint-id vpce-0abc --private-dns-enabled`,

            `# ---------- Lock down what can be done THROUGH the endpoint ----------
# Endpoint policy: only these buckets, only from this VPC
aws ec2 modify-vpc-endpoint --vpc-endpoint-id vpce-0s3 \\
  --policy-document '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Principal": "*",
      "Action": ["s3:GetObject", "s3:PutObject"],
      "Resource": ["arn:aws:s3:::acme-approved/*"],
      "Condition": {"StringEquals": {"aws:PrincipalOrgID": "o-abc123xyz"}}
    }]
  }'

# And the matching half on the resource, so the bucket refuses anything
# that did NOT arrive through the endpoint:
# {
#   "Effect": "Deny", "Principal": "*", "Action": "s3:*",
#   "Resource": ["arn:aws:s3:::acme-approved", "arn:aws:s3:::acme-approved/*"],
#   "Condition": {"StringNotEquals": {"aws:SourceVpce": "vpce-0s3"}}
# }

aws ec2 describe-vpc-endpoint-connections \\
  --filters Name=service-id,Values=vpce-svc-0abc123def \\
  --query 'VpcEndpointConnections[].[VpcEndpointId,VpcEndpointOwner,VpcEndpointState]'`,
          ],
          questions: [
            {
              question: "What is AWS PrivateLink and how does it differ from VPC peering?",
              solution: "<p>PrivateLink exposes <strong>one service</strong> privately; peering connects <strong>two networks</strong>. The provider fronts the service with a Network Load Balancer and creates a VPC endpoint service; the consumer creates an <strong>interface endpoint</strong>, which places an ENI with an IP address <em>from the consumer's own subnet</em> into their VPC. Because the consumer is talking to a local address, there is no routing relationship, no route table entry and no advertised prefix. The consequences are that <strong>overlapping CIDRs are irrelevant</strong>, the exposure is a single endpoint rather than an entire CIDR range, traffic is unidirectional, and many consumers can connect without any topology change on the provider side.</p>",
            },
            {
              question: "Two VPCs have overlapping CIDR blocks but one needs to call an API in the other. What do you do?",
              solution: "<p><strong>PrivateLink.</strong> Peering and Transit Gateway both refuse overlapping address ranges because routing would be ambiguous, and re-addressing a production network is a major undertaking. PrivateLink sidesteps the problem entirely: the consumer connects to an interface endpoint whose ENI carries an address from the <em>consumer's</em> subnet, and AWS maps that to the provider's NLB internally — the two address spaces never need to be mutually routable. The alternatives are worse: re-address one side (correct but disruptive), or insert NAT in the path (works, but obscures source IPs and complicates security groups and logging). This is the situation where PrivateLink is not merely convenient but uniquely capable.</p>",
            },
            {
              question: "How does a workload in a private subnet with no NAT Gateway reach AWS APIs?",
              solution: "<p>Through <strong>VPC endpoints</strong>, which are PrivateLink with AWS as the provider. Create <strong>interface endpoints</strong> for the services the workload calls — each places an ENI in your subnets — and enable <strong>private DNS</strong> so the standard service hostnames resolve to those private IPs and the SDKs work unchanged. For <strong>S3 and DynamoDB</strong>, prefer the <strong>gateway endpoints</strong>, which are route table entries, cost nothing, and carry no per-GB charge. Two sets worth memorising: SSM Session Manager needs <code>ssm</code>, <code>ssmmessages</code> and <code>ec2messages</code>; a Fargate task pulling an image needs <code>ecr.api</code>, <code>ecr.dkr</code>, <code>logs</code> and an S3 endpoint for the layers.</p>",
            },
            {
              question: "You created a VPC endpoint but traffic still goes through the NAT Gateway. Why?",
              solution: "<p>Almost certainly <strong>private DNS</strong>. Without it, the public service hostname still resolves to a public IP, so the SDK routes out through the NAT Gateway and everything keeps working — which is why nobody notices except on the bill. Enable <code>--private-dns-enabled</code> on the endpoint, and confirm the VPC has both <code>enableDnsSupport</code> and <code>enableDnsHostnames</code> set to true, since private DNS silently requires both. Verify from inside the VPC with <code>dig</code>: a private address means the endpoint is in use, a public one means it is not. The other candidates are a missing route-table association for a <em>gateway</em> endpoint, or a security group on the endpoint ENI that is not permitting the callers.</p>",
            },
            {
              question: "A SaaS vendor wants to offer their product to hundreds of AWS customers privately. Which mechanism?",
              solution: "<p>A <strong>PrivateLink endpoint service</strong>. The vendor runs one NLB and one endpoint service; each customer creates their own interface endpoint. That scales without any topology change per customer, and crucially each customer's endpoint is independent, so <strong>customers cannot see each other</strong> — which a shared Transit Gateway routing domain would risk. It also tolerates customers whose address space collides with the vendor's or with each other's, avoids exposing the service to the public internet, and is unidirectional so the vendor cannot reach back into customer networks. The vendor controls access with an <strong>allow-list of principals</strong> plus <strong>acceptance required</strong>, and should still authenticate callers at the application layer, since PrivateLink provides a private path rather than authentication.</p>",
            },
            {
              question: "What are the cost considerations with interface endpoints, and how do large estates handle them?",
              solution: "<p>Interface endpoints bill <strong>per endpoint, per availability zone, per hour</strong>, plus a <strong>per-GB processing charge</strong>. The per-AZ component is what scales badly: twenty service endpoints across three AZs in thirty VPCs is a substantial monthly cost. The standard response is <strong>centralised endpoints</strong> — one set hosted in a shared-services VPC, reached from spoke VPCs across a <strong>Transit Gateway</strong>, with Route 53 Resolver rules and private hosted zones making the hostnames resolve from the spokes. That trades endpoint hourly charges for TGW processing charges and wins above a certain VPC count. The exception is <strong>gateway endpoints for S3 and DynamoDB</strong>, which are free and have no processing charge, so those should be created in every VPC rather than centralised.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html",
            "https://docs.aws.amazon.com/vpc/latest/privatelink/privatelink-share-your-services.html",
            "https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-access.html",
            "https://docs.aws.amazon.com/vpc/latest/privatelink/interface-endpoints.html",
          ],
        },
        {
          topic: "Direct Connect vs Site-to-Site VPN — Dedicated Circuit vs Encrypted Tunnel",
          tags: ["aws", "vpc", "direct connect", "vpn", "hybrid", "bgp", "dx gateway", "latency"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Both of these answer the same question — <em>how does my data centre reach my VPCs privately?</em> — with opposite trade-offs. <strong>Site-to-Site VPN is an encrypted tunnel over the public internet: available in minutes, cheap, and only as good as the internet between you and AWS. Direct Connect is a dedicated physical circuit into an AWS facility: consistent, low-latency, high-bandwidth, and it takes weeks to months to provision.</strong> Almost every real hybrid design ends up using both, which is itself the most important thing to say.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Site-to-Site VPN: what you actually get</h4>
<p style="line-height: 1.75;">A Site-to-Site VPN is an IPsec tunnel between a device you control and AWS. You create two objects — a <strong>Customer Gateway</strong> representing your side and either a <strong>Virtual Private Gateway</strong> or a <strong>Transit Gateway</strong> representing AWS's side — and then a VPN connection joining them. AWS gives you a configuration file for your router, you apply it, and traffic flows.</p>
<p style="line-height: 1.75;">The detail that matters most, and that candidates routinely miss: <strong>every AWS VPN connection provides two tunnels, terminating on two different AWS endpoints in two different availability zones.</strong> This is AWS's side of the redundancy, and it is not optional. What <em>is</em> optional — and frequently neglected — is whether your side is redundant. If both tunnels terminate on one customer router, that router is a single point of failure and AWS's dual tunnels have bought you nothing. A genuinely resilient design uses two customer gateways on two physical devices, ideally with different internet circuits, which means two VPN connections and four tunnels in total.</p>
<p style="line-height: 1.75;">Each tunnel delivers roughly <strong>1.25 Gbps</strong> of throughput. That number is worth remembering because it is a hard ceiling per tunnel, not a guideline. By default the second tunnel is standby, so a single VPN connection gives you about 1.25 Gbps of usable bandwidth. To exceed it you either terminate on a <strong>Transit Gateway with ECMP</strong> (equal-cost multi-path) enabled and run multiple VPN connections that load-share, or you move to Direct Connect. This is a common scenario question: "our VPN is saturated at 1.2 Gbps, what do you do?" — and the answer is ECMP over a Transit Gateway as the quick fix, Direct Connect as the structural one.</p>
<p style="line-height: 1.75;">Routing can be <strong>static</strong> (you list the prefixes) or <strong>dynamic via BGP</strong>. BGP is strongly preferred: it propagates prefix changes automatically, it detects failure quickly, and it is required for useful failover behaviour and for ECMP. Static routing is acceptable only for tiny, stable environments.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Direct Connect: what you actually get</h4>
<p style="line-height: 1.75;">Direct Connect is a physical cross-connect between your network and AWS, established at a Direct Connect <strong>location</strong> — a colocation facility where AWS has presence. You either take a <strong>dedicated connection</strong> (a whole port: 1, 10, 100 Gbps, ordered from AWS and provisioned by the facility) or a <strong>hosted connection</strong> through an AWS Direct Connect Partner, which gives you a slice of their existing capacity at sub-port speeds from 50 Mbps upward. Hosted connections are how most organisations actually start, because ordering a dedicated 10 Gbps port and running fibre is a project with a lead time measured in months.</p>
<p style="line-height: 1.75;">On top of the physical connection you create <strong>virtual interfaces (VIFs)</strong>, and knowing the three types is standard interview material:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Private VIF</strong> — reaches VPC private IP space, via a Virtual Private Gateway (one VPC) or a Direct Connect Gateway (many VPCs, many regions).</li>
  <li><strong>Public VIF</strong> — reaches AWS <em>public</em> service endpoints (S3, DynamoDB, public APIs) over the Direct Connect circuit rather than the internet, using public IP addresses. Useful when you want predictable performance to public services without internet transit.</li>
  <li><strong>Transit VIF</strong> — connects to a Direct Connect Gateway that is attached to one or more <strong>Transit Gateways</strong>, which is how a single circuit serves an entire multi-VPC, multi-region estate.</li>
</ul>
<p style="line-height: 1.75;">The <strong>Direct Connect Gateway</strong> deserves emphasis because it is what makes Direct Connect scale. Without it, a private VIF talks to one Virtual Private Gateway, meaning one VPC — so ten VPCs would mean ten VIFs. A Direct Connect Gateway is a global object that lets one circuit reach many VPCs across many regions, and combined with a Transit VIF and a Transit Gateway it becomes: one circuit, one VIF, one gateway, and every VPC in the organisation.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The comparison that matters</h4>
<div style="overflow-x: auto; margin-top: 0.75rem;">
<table style="width: 100%; border-collapse: collapse; font-size: 0.92rem;">
  <thead>
    <tr style="background: #f1f5f9; text-align: left;">
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;"></th>
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;">Site-to-Site VPN</th>
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;">Direct Connect</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Medium</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Public internet</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Dedicated physical circuit</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Time to provision</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;"><strong>Minutes to hours</strong></td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;"><strong>Weeks to months</strong></td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Bandwidth</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">~1.25 Gbps per tunnel</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">50 Mbps – 100 Gbps</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Latency</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Variable — internet dependent</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Low and <strong>consistent</strong></td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Encryption</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">IPsec, always</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;"><strong>None by default</strong> — add MACsec or VPN over DX</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Cost shape</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Low hourly + data out</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Port hours + cross-connect + <strong>cheaper data out</strong></td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Resilience</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">2 tunnels included</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Single circuit unless you buy more</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Typical use</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Backup, branch offices, getting started</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Primary hybrid link, large data movement</td></tr>
  </tbody>
</table>
</div>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The encryption point that catches people out</h4>
<p style="line-height: 1.75;">A Direct Connect circuit is <strong>not encrypted</strong>. It is private in the sense that it is a dedicated path that does not traverse the public internet, but the traffic on it is in the clear at layer 3. For many organisations that is unacceptable under their own policy or a regulatory requirement, and there are two answers: <strong>MACsec</strong>, which encrypts at layer 2 and is available on certain dedicated port speeds at certain locations, or running an <strong>IPsec VPN over the Direct Connect circuit</strong>, which gives you encryption at the cost of some throughput and the tunnel's bandwidth ceiling. Mentioning this unprompted is a reliable way to demonstrate real hybrid experience, because it is the kind of thing you only learn when a security review stops your project.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Cost: the part that surprises finance</h4>
<p style="line-height: 1.75;">VPN is cheap to start: an hourly charge per connection plus standard data transfer out. Direct Connect has a <strong>port-hour charge</strong>, a <strong>cross-connect fee</strong> from the colocation facility, and usually a circuit charge from a carrier to reach that facility — but its <strong>data transfer out rate is substantially lower</strong> than standard internet egress. That produces a crossover point: below some monthly volume, VPN is cheaper overall; above it, Direct Connect is, and the more data you move the more decisively. For organisations shifting tens or hundreds of terabytes a month, the egress saving alone can justify the circuit, which is why "we move a lot of data to AWS" is effectively an argument for Direct Connect regardless of the latency requirement.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Resilience: the designs AWS actually recommends</h4>
<p style="line-height: 1.75;">A single Direct Connect circuit is a single point of failure — one port, one facility, often one carrier. The recognised tiers of hybrid resilience are worth being able to list:</p>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Development / lowest.</strong> One Direct Connect connection, with a <strong>Site-to-Site VPN as backup</strong>. This is by far the most common real-world design and a completely defensible answer: BGP handles the failover, and because the VPN is cheap it costs little to keep idle.</li>
  <li><strong>Maximum resilience for critical workloads.</strong> Two connections at <strong>two different Direct Connect locations</strong>, ideally through different carriers, terminating on separate customer routers.</li>
  <li><strong>High resilience.</strong> Two connections at two locations, without full device separation on your side.</li>
</ol>
<p style="line-height: 1.75;">The failover mechanism in all of these is <strong>BGP</strong>, and the way you steer it is with path attributes: AS path prepending on the VPN so it looks less attractive than the Direct Connect path, or local preference communities that AWS publishes for exactly this purpose. It is worth knowing the default preference order too — AWS prefers a Direct Connect path over a VPN path for the same prefix, and prefers longer (more specific) prefixes over shorter ones, which is the lever you use when you want deterministic behaviour rather than relying on defaults.</p>
<p style="line-height: 1.75;">One failure mode worth naming: if your Direct Connect saturates and you have a VPN backup, traffic does <em>not</em> spill over to the VPN — BGP failover is about reachability, not congestion. The circuit stays up, it is simply full, and applications degrade. Capacity planning is therefore a separate exercise from resilience planning, and conflating them is a common design error.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Choosing, in one paragraph</h4>
<p style="line-height: 1.75;">Use <strong>VPN</strong> when you need connectivity today, when bandwidth requirements are modest, for branch offices and remote sites, as a backup path, or while you wait for a Direct Connect circuit to be delivered. Use <strong>Direct Connect</strong> when you need consistent low latency for chatty or latency-sensitive workloads, when you are moving large volumes regularly, when regulatory requirements preclude the public internet, or when you need bandwidth beyond what tunnels can deliver. And in practice, use both: Direct Connect as primary, VPN as backup, with BGP deciding — which is both the most resilient answer and the one that shows you understand that provisioning time is itself a design constraint.</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Getting a circuit: what actually happens</h4>
<p style="line-height: 1.75;">The reason Direct Connect takes weeks or months becomes obvious once you know the steps, and being able to describe them explains why a VPN is almost always part of the plan.</p>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Choose a Direct Connect location</strong> — a colocation facility where AWS has a presence. Your network must be able to reach that building, which usually means a carrier circuit you also have to order.</li>
  <li><strong>Order the connection.</strong> Either a <strong>dedicated</strong> port (1, 10 or 100 Gbps) from AWS, which produces a Letter of Authorisation and Connecting Facility Assignment (LOA-CFA) that you hand to the facility so they can run the cross-connect; or a <strong>hosted</strong> connection from an AWS Direct Connect Partner, who provisions a slice of their existing capacity — far quicker, available at sub-port speeds from 50 Mbps, and how most organisations start.</li>
  <li><strong>Have the cross-connect installed</strong> in the facility, physically patching your equipment (or your carrier's) to AWS's.</li>
  <li><strong>Create virtual interfaces</strong> and establish BGP.</li>
</ol>
<p style="line-height: 1.75;">Each step involves a third party with its own lead time, which is why the realistic sequence for any project is: <strong>bring up a VPN today, start the Direct Connect process in parallel, and keep the VPN as the backup path once the circuit lands.</strong> Presenting it that way in an interview shows you understand delivery constraints as well as architecture.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">BGP in a bit more depth</h4>
<p style="line-height: 1.75;">Both options use BGP, and a few specifics recur in real deployments. You advertise your on-premises prefixes to AWS and AWS advertises your VPC prefixes to you. AWS applies a deterministic preference order for the same prefix: <strong>longest prefix match first</strong>, then <strong>Direct Connect over VPN</strong>, then <strong>shorter AS path</strong>. That ordering is the lever you use to make failover behave predictably rather than hoping defaults align with your intent.</p>
<p style="line-height: 1.75;">Two practical techniques. To make a path less attractive, <strong>prepend your own ASN</strong> several times on the advertisement you send over it — typically done on the VPN so the Direct Connect path wins while both are healthy. To make a path more attractive from AWS's side, use the <strong>local preference BGP communities</strong> AWS publishes, which let you set high, medium or low preference on routes you advertise. And note that AWS accepts a bounded number of prefixes per BGP session, so advertise <strong>summarised</strong> routes rather than hundreds of specifics — exceeding the limit can drop the session entirely, which is an unpleasant way to discover the constraint.</p>
<p style="line-height: 1.75;"><strong>Bidirectional Forwarding Detection (BFD)</strong> is worth enabling on Direct Connect: without it, failure detection relies on BGP hold timers and can take tens of seconds, while BFD detects a dead path in well under a second. For anything with a tight recovery objective, that difference matters more than the rest of the design.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Accelerated and third-party options</h4>
<p style="line-height: 1.75;">Two variants fill the gap between the two main choices. <strong>Accelerated Site-to-Site VPN</strong> uses AWS Global Accelerator so the tunnel enters the AWS backbone at the nearest edge location rather than traversing the public internet end to end — reducing jitter and improving consistency, while remaining a VPN with its per-tunnel limits. It is a good answer when latency variability is the complaint but a physical circuit is not justified.</p>
<p style="line-height: 1.75;">Separately, many organisations reach AWS through <strong>SD-WAN appliances</strong> or a carrier's cloud-connect product, which can present as either a VPN or a hosted Direct Connect. The <strong>Transit Gateway Connect</strong> attachment exists specifically for this: it runs GRE tunnels with BGP to appliances running on EC2, giving them native Transit Gateway routing rather than a hand-assembled overlay. Mentioning it shows awareness that most large enterprises do not connect to AWS with a bare router.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Monitoring what you have built</h4>
<p style="line-height: 1.75;">Hybrid links fail quietly, so the monitoring list is short and worth stating: CloudWatch metrics for Direct Connect <code>ConnectionState</code>, <code>ConnectionBpsEgress/Ingress</code> and light levels on the optics; VPN <code>TunnelState</code> and <code>TunnelDataIn/Out</code> per tunnel; and BGP <code>AcceptedRouteCount</code>, because a session that is up while advertising nothing is a common and confusing failure. Alarm on a <em>single</em> tunnel going down, not just both — losing one tunnel is invisible to users but removes your redundancy, and if nobody notices, the next failure is an outage. The same argument applies to a Direct Connect with a VPN backup: alarm when the backup becomes active, because by then you are running without a spare.</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The hidden cost comparison people forget</h4>
<p style="line-height: 1.75;">When comparing the two on cost, candidates usually reach for the port-hour versus VPN-hour comparison, which is the least important part. The dominant term for most organisations is <strong>data transfer out of AWS</strong>, and the two differ substantially there: Direct Connect egress is billed at a notably lower rate than standard internet egress, which is what a VPN uses. The crossover point depends on region and volume, but for an organisation moving tens of terabytes a month the egress saving alone can exceed the entire cost of the circuit.</p>
<p style="line-height: 1.75;">There are also costs that appear on someone else's budget and get missed in the comparison: the <strong>cross-connect fee</strong> charged by the colocation facility, the <strong>carrier circuit</strong> to reach that facility, and the <strong>router capacity</strong> at your end. Those are usually a networking or facilities line item rather than a cloud one, which is why a Direct Connect business case that only counts AWS charges tends to be wrong in both directions — understating total cost while also understating the saving.</p>
<p style="line-height: 1.75;">The honest framing is: VPN has essentially no fixed cost and a higher variable cost; Direct Connect has a substantial fixed cost and a lower variable cost. That is the same shape as most capacity decisions, and saying so explicitly is more useful than quoting rates that change.</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">How this appears in scenario questions</h4>
<p style="line-height: 1.75;">The question is rarely asked abstractly; it arrives wrapped in a scenario, and the wording usually signals the expected answer. Phrases like <em>"consistent low latency"</em>, <em>"predictable performance"</em>, <em>"we transfer several terabytes nightly"</em>, or <em>"regulatory requirement not to traverse the public internet"</em> all point to <strong>Direct Connect</strong>. Phrases like <em>"we need this working this week"</em>, <em>"a branch office"</em>, <em>"a proof of concept"</em>, or <em>"a backup path"</em> point to <strong>VPN</strong>.</p>
<p style="line-height: 1.75;">The strongest answers do two further things. They <strong>name the combination</strong> — Direct Connect primary with a VPN backup, BGP deciding — because that is what production estates actually run and it directly addresses the provisioning-time problem. And they <strong>ask a clarifying question</strong> where the scenario is genuinely ambiguous: how much data, what latency tolerance, what recovery objective, and is encryption in transit a stated requirement? A candidate who asks about the encryption requirement before recommending Direct Connect has demonstrated the single most commonly missed fact about it.</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Migration traffic, which is its own use case</h4>
<p style="line-height: 1.75;">A category worth separating: moving a data centre into AWS is a one-off transfer problem rather than an ongoing connectivity one, and the right answer often is neither option. For very large volumes, <strong>AWS Snowball</strong> and its larger siblings ship physical devices, because a petabyte over any circuit takes longer than a courier. For sustained transfers over an existing link, <strong>DataSync</strong> handles scheduling, verification and incremental sync far better than hand-rolled scripts. And <strong>S3 Transfer Acceleration</strong> uses edge locations to improve long-distance uploads without any dedicated link at all.</p>
<p style="line-height: 1.75;">The reason to mention this is that "we need to move 500 TB to AWS" is frequently answered with "Direct Connect", when the honest calculation shows the circuit would not be delivered before a Snowball round trip completes — and once migrated, the ongoing traffic may be modest enough that a VPN suffices. Separating the <em>migration</em> requirement from the <em>steady-state</em> requirement is a good instinct to demonstrate.</p>


<p style="line-height: 1.75;">To close with the shape of the decision rather than the details: this is a classic fixed-cost-versus-variable-cost choice, dressed in networking vocabulary. A VPN has near-zero fixed cost, meaningful variable cost, and can be delivered this afternoon. Direct Connect has substantial fixed cost across several budgets, materially lower variable cost, and a delivery timeline measured in months. Every organisation that ends up with both did so because those two profiles complement each other — the VPN covers the period before the circuit arrives and the period after it fails, and the circuit covers the volume and the latency that the VPN never could.</p>

<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Site-to-Site VPN is an IPsec tunnel over the public internet — up in minutes, cheap, but with internet-dependent latency and about 1.25 Gbps per tunnel. Direct Connect is a dedicated physical circuit from 50 Mbps to 100 Gbps with consistent low latency and cheaper data egress, but it takes weeks or months to provision and costs port-hours plus a cross-connect. Two details I'd flag: every AWS VPN gives you <strong>two tunnels</strong>, but that's only AWS's side — if both land on one customer router you still have a single point of failure; and Direct Connect is <strong>not encrypted</strong>, so you add MACsec or run IPsec over it if policy requires. In practice I'd run Direct Connect as primary with a VPN as backup and let BGP fail over, using a Direct Connect Gateway and a Transit VIF into a Transit Gateway so one circuit serves every VPC. And I'd be clear that VPN backup covers <em>failure</em>, not <em>congestion</em> — a saturated circuit doesn't spill over."</div>
</div>`,
          examples: [
            `# ---------- VPN: up in minutes ----------
CGW=$(aws ec2 create-customer-gateway \\
  --type ipsec.1 --public-ip 203.0.113.10 --bgp-asn 65000 \\
  --device-name dc1-edge-router-a \\
  --query 'CustomerGateway.CustomerGatewayId' --output text)

# Terminate on a Transit Gateway (serves every VPC) rather than a VGW (one VPC)
VPN=$(aws ec2 create-vpn-connection \\
  --type ipsec.1 --customer-gateway-id $CGW \\
  --transit-gateway-id tgw-0hub \\
  --options '{"StaticRoutesOnly":false,"EnableAcceleration":false}' \\
  --query 'VpnConnection.VpnConnectionId' --output text)

# The router config AWS generates for you
aws ec2 describe-vpn-connections --vpn-connection-ids $VPN \\
  --query 'VpnConnections[0].CustomerGatewayConfiguration' --output text

# TWO tunnels, always - but that is only AWS's half of the redundancy
aws ec2 describe-vpn-connections --vpn-connection-ids $VPN \\
  --query 'VpnConnections[0].VgwTelemetry[].[OutsideIpAddress,Status,StatusMessage]'
# 52.x.x.x  UP    1 BGP ROUTES
# 52.y.y.y  DOWN  IPSEC IS DOWN     <- normal if your side is single-homed`,

            `# ---------- Redundancy on YOUR side is the part people skip ----------
# BAD:  one customer router, both tunnels -> router dies, hybrid dies
# GOOD: two routers, two customer gateways, two VPN connections = 4 tunnels
aws ec2 create-customer-gateway --type ipsec.1 \\
  --public-ip 203.0.113.11 --bgp-asn 65000 --device-name dc1-edge-router-b

# Break the ~1.25 Gbps per-tunnel ceiling with ECMP on a Transit Gateway
aws ec2 modify-transit-gateway --transit-gateway-id tgw-0hub \\
  --options VpnEcmpSupport=enable
# Then run multiple VPN connections; BGP load-shares across them.
# This is the quick answer to "our VPN is saturated at 1.2 Gbps".`,

            `# ---------- Direct Connect: one circuit for the whole estate ----------
# Direct Connect Gateway = global object, decouples the circuit from VPCs
DXGW=$(aws directconnect create-direct-connect-gateway \\
  --direct-connect-gateway-name corp-dxgw --amazon-side-asn 64513 \\
  --query 'directConnectGateway.directConnectGatewayId' --output text)

# TRANSIT VIF -> DXGW -> Transit Gateway -> every VPC, every region
aws directconnect create-transit-virtual-interface \\
  --connection-id dxcon-abc123 \\
  --new-transit-virtual-interface \\
    'virtualInterfaceName=corp-transit,vlan=101,asn=65000,directConnectGatewayId='$DXGW',addressFamily=ipv4'

aws directconnect create-direct-connect-gateway-association \\
  --direct-connect-gateway-id $DXGW \\
  --gateway-id tgw-0hub \\
  --add-allowed-prefixes-to-direct-connect-gateway cidr=10.0.0.0/8

# The three VIF types:
#   private VIF  -> VPC private IPs (via VGW or DXGW)
#   public  VIF  -> AWS public endpoints (S3 etc) over DX, not the internet
#   transit VIF  -> DXGW attached to Transit Gateway(s)   <-- scales best`,

            `# ---------- Direct Connect is NOT encrypted ----------
# The circuit is private, but layer 3 traffic is in the clear.
# Two ways to satisfy a security review:

#  1. MACsec (layer 2), on supported dedicated ports/locations
aws directconnect update-connection \\
  --connection-id dxcon-abc123 --encryption-mode should_encrypt

#  2. IPsec VPN riding over the Direct Connect public VIF
#     - full encryption, but back to the ~1.25 Gbps per-tunnel ceiling
#     - use TGW + ECMP with several tunnels if you need more

aws directconnect describe-connections --connection-id dxcon-abc123 \\
  --query 'connections[].[bandwidth,encryptionMode,macSecCapable,location]'`,

            `# ---------- Primary/backup with BGP, and how to steer it ----------
# AWS prefers, for the same prefix:
#   1. longest (most specific) prefix
#   2. Direct Connect over VPN
#   3. shorter AS path
#
# Make the VPN deliberately less attractive by prepending your ASN:
#   ip prefix-list AWS permit 10.0.0.0/8
#   route-map TO-AWS-VPN permit 10
#     set as-path prepend 65000 65000 65000

# Watch the failover actually happen
aws ec2 describe-vpn-connections \\
  --query 'VpnConnections[].VgwTelemetry[].[OutsideIpAddress,Status,AcceptedRouteCount]' \\
  --output table

aws cloudwatch get-metric-statistics --namespace AWS/DX \\
  --metric-name ConnectionState --dimensions Name=ConnectionId,Value=dxcon-abc123 \\
  --start-time 2026-09-14T00:00:00Z --end-time 2026-09-14T23:59:59Z \\
  --period 300 --statistics Minimum

# REMEMBER: BGP fails over on REACHABILITY, not congestion.
# A saturated DX stays up and applications just degrade.`,
          ],
          questions: [
            {
              question: "Direct Connect or Site-to-Site VPN — how do you choose?",
              solution: "<p><strong>VPN</strong> when you need connectivity now, bandwidth needs are modest, or it is a branch office or a backup path — it is an IPsec tunnel over the internet, provisioned in minutes, cheap, but with variable latency and about <strong>1.25 Gbps per tunnel</strong>. <strong>Direct Connect</strong> when you need consistent low latency, high bandwidth (50 Mbps to 100 Gbps), or are moving large volumes — its data egress rate is substantially cheaper, which alone justifies it above a certain monthly volume, but provisioning takes weeks to months and it carries port-hour and cross-connect charges. The realistic answer is usually <strong>both</strong>: Direct Connect primary, VPN backup, with BGP handling failover — which also solves the problem that you cannot wait months to start.</p>",
            },
            {
              question: "Is Direct Connect encrypted?",
              solution: "<p><strong>No.</strong> It is a private, dedicated circuit that does not traverse the public internet, but the traffic on it is unencrypted at layer 3 — \"private\" is not the same as \"encrypted\", and security reviews frequently stop projects on exactly this point. Two remedies: <strong>MACsec</strong>, which encrypts at layer 2 and is available on certain dedicated port speeds and locations, or running an <strong>IPsec VPN over the Direct Connect circuit</strong>, which gives full encryption but reintroduces the per-tunnel bandwidth ceiling — mitigable with a Transit Gateway and ECMP across several tunnels. By contrast, a Site-to-Site VPN is always IPsec-encrypted, which is one of its genuine advantages.</p>",
            },
            {
              question: "Your Site-to-Site VPN is saturated at about 1.2 Gbps. What are the options?",
              solution: "<p>That is the <strong>per-tunnel ceiling</strong> of roughly 1.25 Gbps, and by default the second tunnel is standby rather than active, so a single VPN connection cannot go faster. Two answers. Short term: terminate the VPNs on a <strong>Transit Gateway with ECMP enabled</strong> and run multiple VPN connections, so BGP load-shares across several tunnels and aggregate throughput scales roughly linearly. Structurally: move to <strong>Direct Connect</strong>, which removes the tunnel ceiling entirely and also lowers the per-GB egress cost. Note that simply adding a second customer gateway without ECMP gives you redundancy, not additional bandwidth — a distinction worth stating explicitly.</p>",
            },
            {
              question: "What is a Direct Connect Gateway and why does it matter?",
              solution: "<p>It is a <strong>global</strong> object that decouples a Direct Connect circuit from individual VPCs. Without it, a private VIF associates with a single Virtual Private Gateway, meaning one VPC per VIF — so ten VPCs would need ten virtual interfaces on the circuit. A Direct Connect Gateway lets one circuit reach <strong>many VPCs across many regions</strong>, and when you pair a <strong>Transit VIF</strong> with a Direct Connect Gateway associated to a <strong>Transit Gateway</strong>, a single physical circuit serves every VPC in the organisation with one VIF. That combination — circuit, transit VIF, DX gateway, transit gateway — is the standard enterprise hybrid design and is what makes Direct Connect scale operationally.</p>",
            },
            {
              question: "How do you make hybrid connectivity resilient?",
              solution: "<p>Layer it. AWS's own tiers: for critical workloads, <strong>two Direct Connect connections at two different Direct Connect locations</strong>, ideally via different carriers and terminating on separate customer routers; below that, one Direct Connect with a <strong>Site-to-Site VPN backup</strong>, which is the most common real design because the VPN costs little to keep idle. On the VPN side, remember AWS always provides <strong>two tunnels</strong>, but that is only AWS's half — terminating both on one customer router leaves a single point of failure, so use two customer gateways on two devices. Failover is driven by <strong>BGP</strong>, steered with AS path prepending or AWS's local preference communities. And be explicit that this covers <em>failure</em>, not <em>congestion</em>: a saturated circuit stays up and traffic does not spill to the backup.</p>",
            },
            {
              question: "What are the three types of Direct Connect virtual interface?",
              solution: "<p><strong>Private VIF</strong> — reaches VPC private IP space through a Virtual Private Gateway (a single VPC) or a Direct Connect Gateway (many VPCs, many regions). <strong>Public VIF</strong> — reaches AWS <em>public</em> service endpoints such as S3 and DynamoDB over the circuit rather than the internet, using public addressing; useful for predictable performance to public services and as the path for an IPsec-over-DX design. <strong>Transit VIF</strong> — connects to a Direct Connect Gateway associated with one or more <strong>Transit Gateways</strong>, which is the design that lets one circuit serve an entire multi-VPC estate. Choosing the transit VIF early avoids a painful migration later, since converting an estate from per-VPC private VIFs is disruptive.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/introduction.html",
            "https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html",
            "https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html",
            "https://docs.aws.amazon.com/directconnect/latest/UserGuide/direct-connect-gateways.html",
          ],
        },
        {
          topic: "Customer Gateway vs Virtual Private Gateway — Your Side vs AWS's Side",
          tags: ["aws", "vpc", "customer gateway", "virtual private gateway", "vgw", "vpn", "bgp", "asn"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  This is a short concept that gets asked because it is a quick check on whether you have actually built a VPN or only read about one. A VPN connection has two ends, and AWS models each end as its own object. <strong>The Customer Gateway (CGW) represents your side. The Virtual Private Gateway (VGW) represents AWS's side.</strong> The VPN connection is the object that joins them.
</p>
<p style="line-height: 1.75;">The naming is from AWS's point of view, which is what confuses people: the "customer" gateway is <em>you</em>, and it is the object that describes your on-premises router to AWS. It is worth saying the mapping out loud once — <em>customer = mine = on-premises; virtual private = AWS's = attached to my VPC</em> — because under interview pressure people reverse them.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The Customer Gateway in detail</h4>
<p style="line-height: 1.75;">A Customer Gateway is a <strong>description</strong>, not a device. Creating one does not provision anything; it records information AWS needs in order to build a tunnel to your equipment. It carries:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>A public IP address</strong> — the internet-routable address of your router or firewall. If your device sits behind NAT, this is the NAT device's address, and you will also need NAT traversal configured.</li>
  <li><strong>A BGP ASN</strong> — your autonomous system number, used for dynamic routing. Private ASNs (64512–65534, and the 32-bit private range) are normal for organisations without a public ASN.</li>
  <li><strong>A type</strong>, which is always <code>ipsec.1</code>.</li>
  <li><strong>Optionally a certificate ARN</strong>, if you are using certificate-based authentication from AWS Private CA instead of a pre-shared key.</li>
  <li><strong>Optionally a device name</strong>, purely for your own sanity when you have twenty of them.</li>
</ul>
<p style="line-height: 1.75;">The physical thing on your side is your own router, firewall or SD-WAN appliance — a Cisco ASR, a Juniper SRX, a Palo Alto, a pfSense box, whatever you run. AWS generates a vendor-specific configuration file for that device, which is genuinely useful: it contains the tunnel addresses, the pre-shared keys, the IKE and IPsec parameters, and the BGP configuration, formatted for the platform you selected. Most VPN setup problems are resolved by applying that file as generated rather than hand-translating it.</p>
<p style="line-height: 1.75;">Because it is only a description, you create <strong>one Customer Gateway per physical device</strong>. Two routers in your data centre means two Customer Gateways, and therefore two VPN connections — which is how you achieve redundancy on your side, since AWS's two tunnels alone do not protect you from your own router failing.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The Virtual Private Gateway in detail</h4>
<p style="line-height: 1.75;">A Virtual Private Gateway is the AWS-managed VPN concentrator on the AWS side. Unlike the Customer Gateway, it is a real, running, highly available thing — AWS deploys it redundantly across availability zones, which is why every VPN connection terminating on it gets two tunnel endpoints in two AZs.</p>
<p style="line-height: 1.75;">Key properties:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>It attaches to exactly one VPC.</strong> This is its central limitation. Ten VPCs needing on-premises connectivity means ten VGWs and ten VPN connections — which is precisely the problem Transit Gateway solves.</li>
  <li><strong>It has an Amazon-side ASN</strong>, defaulting to 64512, which you can set at creation. It must differ from your ASN for eBGP to work.</li>
  <li><strong>It terminates both VPN connections and Direct Connect private VIFs</strong>, so it is not VPN-specific.</li>
  <li><strong>It supports route propagation</strong> — enable it on a VPC route table and routes learned over BGP appear automatically, rather than being maintained by hand. This is one of the most useful and most forgotten settings: without it, the tunnel is up, BGP is established, and traffic still does not flow because no subnet route points at the VGW.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">How they combine</h4>
<p style="line-height: 1.75;">The assembly is: create the Customer Gateway (describing your router), create the Virtual Private Gateway and attach it to your VPC, create the VPN connection referencing both, apply AWS's generated configuration to your router, then <strong>enable route propagation</strong> on the relevant VPC route tables — or add static routes if you are not using BGP. Traffic then flows in both directions, and security groups and NACLs govern what is permitted as usual.</p>
<p style="line-height: 1.75;">The order matters less than the completeness. The most common "the VPN is up but nothing works" scenario is a tunnel showing UP with BGP routes accepted, while the VPC route tables contain no route to on-premises — because propagation was never enabled on the route table that the instances' subnets actually use. Checking <code>describe-route-tables</code> for a propagated route with the VGW as target resolves it in seconds.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Where Transit Gateway replaces the VGW</h4>
<p style="line-height: 1.75;">Modern designs increasingly terminate VPNs on a <strong>Transit Gateway instead of a Virtual Private Gateway</strong>, and being able to explain why is the mature version of this answer. A VGW serves one VPC; a TGW serves all of them. With a TGW you build the hybrid connection once and every attached VPC inherits it, subject to your routing domains — so on-premises can reach production and shared services but not development, expressed declaratively in TGW route tables.</p>
<p style="line-height: 1.75;">There are functional gains too. A TGW supports <strong>ECMP across multiple VPN connections</strong>, which is the only way to exceed the per-tunnel bandwidth ceiling; a VGW does not load-share in the same way. A TGW also accepts Direct Connect via a transit VIF and can peer to TGWs in other regions, so the same hub carries every form of connectivity. The Customer Gateway object, notably, is <strong>unchanged</strong> in either design — your side is described the same way regardless of what AWS terminates on, which is a neat illustration of the separation of concerns between the two objects.</p>
<p style="line-height: 1.75;">The VGW still has its place: a single VPC needing on-premises access, a simple environment where a Transit Gateway's attachment charges are not justified, or a design where you deliberately want that VPC's connectivity isolated from everything else. But once there is a second VPC with the same requirement, the TGW is almost always the better answer.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Troubleshooting, in order</h4>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Tunnel status.</strong> <code>describe-vpn-connections</code> shows each tunnel's state and a status message. "IPSEC IS DOWN" usually means phase 2 mismatch; a phase 1 failure usually means the pre-shared key, the peer address, or a firewall blocking UDP 500 and 4500.</li>
  <li><strong>The public IP.</strong> Your Customer Gateway's address must be what AWS actually sees. Behind NAT, that is the NAT address, and NAT-T must be permitted.</li>
  <li><strong>ASN mismatch.</strong> The Customer Gateway's ASN must match what your router advertises, and must differ from the Amazon-side ASN.</li>
  <li><strong>Routes.</strong> Is propagation enabled on the right route tables, or are static routes present? Is your side advertising the prefixes AWS should learn?</li>
  <li><strong>Security groups and NACLs.</strong> Reachability is not permission; on-premises CIDRs must be allowed inbound.</li>
  <li><strong>Asymmetry.</strong> With two tunnels or two connections, check that traffic returns the way you expect — stateful firewalls on your side may drop asymmetric flows.</li>
</ol>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What the generated configuration contains</h4>
<p style="line-height: 1.75;">One of the genuinely useful things about AWS's VPN implementation is that it hands you a <strong>ready-made router configuration</strong>, and knowing what is inside it demystifies the whole setup. You select your device vendor and model, and AWS produces a file containing, for each of the two tunnels:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>The outside addresses</strong> — AWS's tunnel endpoint, and your Customer Gateway's address.</li>
  <li><strong>The inside addresses</strong> — a small <code>/30</code> per tunnel used for the BGP peering session itself, which is why you occasionally see <code>169.254.x.x</code> link-local addresses in VPN documentation.</li>
  <li><strong>The pre-shared key</strong> (or certificate configuration).</li>
  <li><strong>IKE and IPsec parameters</strong> — the proposals, DH groups, lifetimes and algorithms AWS will accept.</li>
  <li><strong>BGP configuration</strong> — the neighbour addresses, your ASN, and AWS's ASN.</li>
</ul>
<p style="line-height: 1.75;">The practical advice is to apply it as generated rather than hand-translating it, because most phase 1 and phase 2 failures are a mismatched proposal or lifetime that somebody "cleaned up". If your device is not on AWS's list, take the generic configuration and map it carefully — and expect the DH group and lifetime settings to be where the mismatch hides.</p>
<p style="line-height: 1.75;">You can also customise the tunnel options at creation: the inside CIDR, the pre-shared key, the permitted algorithms, whether to require certificate authentication, and — importantly — the <strong>startup action</strong>, which controls whether AWS initiates the tunnel or waits for your device. Setting it to <code>start</code> is useful when your side is behind a firewall that only permits outbound initiation.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Static routing versus BGP, and when static is defensible</h4>
<p style="line-height: 1.75;">A VPN connection can use static routing, where you declare the on-premises prefixes explicitly, or <strong>BGP</strong>, where each side advertises its own. BGP is preferred for almost everything, and knowing why matters:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Automatic propagation.</strong> New on-premises subnets appear in AWS without a change request.</li>
  <li><strong>Failure detection.</strong> BGP notices a dead peer and withdraws routes; a static route stays in the table pointing at a dead tunnel, silently blackholing traffic.</li>
  <li><strong>Failover behaviour.</strong> Primary and backup path selection is expressed through BGP attributes — with static routing you have no mechanism at all.</li>
  <li><strong>ECMP.</strong> Load-sharing across multiple tunnels on a Transit Gateway requires BGP.</li>
</ul>
<p style="line-height: 1.75;">Static routing is defensible for a small, stable site with a device that does not speak BGP, or as a temporary measure during a migration. It should not be the plan for anything that needs to survive a failure gracefully, and an interviewer asking "static or dynamic?" is usually checking whether you know that failover is the real differentiator rather than convenience.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Accelerated VPN and other variants</h4>
<p style="line-height: 1.75;">Two variants are worth recognising because they change where the objects sit. An <strong>accelerated Site-to-Site VPN</strong> uses AWS Global Accelerator so the tunnel enters the AWS backbone at the nearest edge location rather than crossing the public internet end to end, which reduces jitter; it requires termination on a <strong>Transit Gateway</strong> rather than a Virtual Private Gateway, which is a good example of how the choice of AWS-side object gates capability. And <strong>AWS Client VPN</strong> is an entirely different product despite the similar name — it terminates individual user devices rather than sites, uses OpenVPN, and associates with subnets rather than using a Customer Gateway at all. Confusing Client VPN with Site-to-Site VPN is a common slip worth avoiding.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Where the objects live in a multi-account estate</h4>
<p style="line-height: 1.75;">In a landing zone, the hybrid connectivity objects belong to the <strong>network account</strong>: the Customer Gateways, the VPN connections, the Direct Connect Gateway, and the Transit Gateway they terminate on. That Transit Gateway is then shared to the organisation with RAM, so workload accounts create attachments without being able to alter routing. The consequence is that the Customer Gateway and Virtual Private Gateway discussion becomes a <em>networking team</em> concern rather than something individual application teams ever touch — which is the correct division, because a VPN misconfiguration affects everyone.</p>
<p style="line-height: 1.75;">It also explains why Virtual Private Gateways become rare in mature estates. A VGW attaches to one VPC, which implies the hybrid connection belongs to that VPC's owner; a Transit Gateway attachment implies the connection belongs to the platform and the VPC merely consumes it. The object you choose encodes an ownership model, not just a topology.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">A compact summary</h4>
<p style="line-height: 1.75;">Customer Gateway: your side, a description, one per physical device, provisions nothing. Virtual Private Gateway: AWS's side, a real managed concentrator, one VPC only, AZ-redundant, supports route propagation. VPN connection: the object joining them, always two tunnels, roughly 1.25 Gbps each, BGP or static. Transit Gateway: the modern replacement for the VGW when more than one VPC is involved, adding ECMP, routing domains and a single place to terminate every form of connectivity. Get those four sentences right and the topic is covered.</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Why AWS models your side at all</h4>
<p style="line-height: 1.75;">It is worth pausing on a question that sounds naive but has a real answer: why does AWS need an object representing equipment it does not control? Because an IPsec tunnel is a mutual arrangement. AWS must know <strong>where to send the tunnel</strong> (your public address), <strong>how to authenticate</strong> (pre-shared key or certificate), and <strong>how to exchange routes</strong> (your ASN). Without those three facts it cannot initiate or accept a tunnel at all.</p>
<p style="line-height: 1.75;">Modelling them as a first-class object rather than as fields on the VPN connection has a practical benefit: one Customer Gateway can be referenced by <strong>multiple VPN connections</strong>. A single on-premises router can therefore terminate tunnels to several Virtual Private Gateways or Transit Gateways — in different VPCs, different regions, or different accounts — without you re-entering its details each time. When the router's public address changes, you create a new Customer Gateway and repoint the connections rather than reconfiguring everything from scratch.</p>
<p style="line-height: 1.75;">It also makes the ownership boundary explicit in the API, which matters in a multi-account estate: the Customer Gateway describes something the networking team owns physically, and its presence in the account is a record of a real-world dependency that nothing in AWS can fix if it fails.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">A checklist for standing one up</h4>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Confirm the public IP</strong> AWS will actually see — the NAT device's address if your router is behind NAT, with UDP 500 and 4500 permitted and NAT traversal enabled.</li>
  <li><strong>Choose ASNs</strong>: a private ASN for your side, different from the Amazon-side ASN.</li>
  <li><strong>Decide the AWS side</strong>: Transit Gateway if more than one VPC will ever need this, Virtual Private Gateway only for a genuinely isolated single VPC.</li>
  <li><strong>Create two Customer Gateways</strong> for two physical devices if the link matters, giving four tunnels rather than two.</li>
  <li><strong>Apply the generated configuration</strong> verbatim; resist tidying the proposals.</li>
  <li><strong>Enable route propagation</strong> on every route table whose subnets need the on-premises path — the step that most often gets missed.</li>
  <li><strong>Advertise summarised prefixes</strong> from your side, staying within the accepted prefix count.</li>
  <li><strong>Open security groups and NACLs</strong> for the on-premises ranges; reachability is not permission.</li>
  <li><strong>Alarm on a single tunnel dropping</strong>, not just both, so you learn about lost redundancy before it becomes an outage.</li>
</ol>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">A note on naming, since it is the actual difficulty</h4>
<p style="line-height: 1.75;">Most of the difficulty in this topic is vocabulary rather than concept, so it is worth fixing the names deliberately. AWS names things <strong>from AWS's perspective</strong>: the <em>customer</em> gateway is the customer's, meaning yours, meaning on-premises. The <em>virtual private</em> gateway is the virtualised one AWS runs inside your VPC. If you read them as "the gateway describing the customer" and "the virtual gateway AWS provides", both names become self-explanatory.</p>
<p style="line-height: 1.75;">Two adjacent names cause further confusion and are worth separating explicitly. An <strong>internet gateway</strong> is nothing to do with VPNs — it provides internet access for public subnets. A <strong>NAT gateway</strong> is also unrelated — it provides outbound-only internet access for private subnets. Neither participates in hybrid connectivity at all. And <strong>AWS Client VPN</strong> terminates individual user devices, not sites, and uses no Customer Gateway whatsoever. Being able to place all five objects correctly — internet gateway, NAT gateway, virtual private gateway, customer gateway, transit gateway — is a quick way to demonstrate that the vocabulary is genuinely understood rather than pattern-matched.</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What monitoring actually tells you</h4>
<p style="line-height: 1.75;">A VPN's health is visible through a small set of signals, and knowing what each means shortens diagnosis considerably. <strong><code>TunnelState</code></strong> reports each tunnel individually — and the important habit is alarming on <em>one</em> going down, not both, because losing one is invisible to users while silently removing your redundancy. <strong><code>AcceptedRouteCount</code></strong> shows how many prefixes AWS has learned from your side; a tunnel that is up with a count of zero means BGP established but your router is advertising nothing, which is a configuration problem rather than a connectivity one. <strong><code>TunnelDataIn</code> and <code>TunnelDataOut</code></strong> show whether traffic is actually using each tunnel, which reveals whether failover behaved as designed or whether both tunnels are carrying traffic when you expected active/standby.</p>
<p style="line-height: 1.75;">On the AWS side, CloudTrail records changes to the Customer Gateway, the Virtual Private Gateway and the VPN connection, which matters because these objects change rarely — any modification is worth reviewing. And on your own side, the router's IPsec and BGP logs are where phase 1 and phase 2 negotiation failures are actually explained; AWS's status messages are deliberately generic and will tell you that IPsec is down without telling you which proposal mismatched.</p>


<p style="line-height: 1.75;">And a note on why this small topic is asked so often: it is a fast, reliable test of whether someone has actually configured a VPN or only read a diagram. Anyone who has built one knows immediately which side is which, knows that the Customer Gateway provisions nothing, and — most tellingly — knows that route propagation is the step that makes an otherwise healthy tunnel carry traffic. Those three facts are hard to acquire from documentation alone and trivial to recall after a single real deployment, which is exactly what makes the question useful to an interviewer and worth preparing properly.</p>


<p style="line-height: 1.75;">One more asymmetry that is easy to state and easy to forget: the Customer Gateway is <strong>free</strong>, because it provisions nothing — it is a record. The Virtual Private Gateway is likewise not charged directly; the billing attaches to the <strong>VPN connection</strong>, per hour, plus data transfer out. That means creating Customer Gateways speculatively costs nothing, which is worth knowing when you are preparing a second site or a replacement router ahead of a cutover. It also means the cost of redundancy on your side is one extra VPN connection's hourly charge, which is almost always trivial against the cost of an outage — an easy argument to make when someone questions whether two customer routers are justified.</p>

<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "They're the two ends of a Site-to-Site VPN. The <strong>Customer Gateway</strong> is AWS's description of <em>my</em> side — my router's public IP, my BGP ASN, type ipsec.1 — and it provisions nothing; the actual device is my own firewall or router. The <strong>Virtual Private Gateway</strong> is AWS's side: a managed, AZ-redundant VPN concentrator attached to <strong>exactly one VPC</strong>, which is its main limitation. The VPN connection joins them and always comes with two tunnels — though that's only AWS's redundancy, so I'd use two customer gateways on two physical devices for mine. The step people forget is <strong>route propagation</strong> on the VPC route tables: the tunnel shows UP, BGP is established, and nothing flows because no subnet route points at the VGW. In modern designs I'd terminate on a <strong>Transit Gateway</strong> rather than a VGW, so one VPN serves every VPC and I get ECMP across tunnels — the Customer Gateway object is identical either way."</div>
</div>`,
          examples: [
            `# ---------- YOUR side: a description, not a device ----------
aws ec2 create-customer-gateway \\
  --type ipsec.1 \\
  --public-ip 203.0.113.10 \\
  --bgp-asn 65000 \\
  --device-name dc1-edge-router-a \\
  --tag-specifications 'ResourceType=customer-gateway,Tags=[{Key=Site,Value=london-dc1}]'

# Creating this provisions NOTHING. It records what AWS needs to know
# about your router: public IP, ASN, and how to authenticate.
# The real device is your ASR / SRX / Palo Alto / pfSense.

# One CGW per PHYSICAL device. Two routers = two CGWs = two VPN
# connections = real redundancy on your side.
aws ec2 create-customer-gateway --type ipsec.1 \\
  --public-ip 203.0.113.11 --bgp-asn 65000 --device-name dc1-edge-router-b`,

            `# ---------- AWS's side: a real, managed, AZ-redundant thing ----------
VGW=$(aws ec2 create-vpn-gateway --type ipsec.1 --amazon-side-asn 64512 \\
  --query 'VpnGateway.VpnGatewayId' --output text)

# It attaches to EXACTLY ONE VPC. That is its defining limitation.
aws ec2 attach-vpn-gateway --vpn-gateway-id $VGW --vpc-id vpc-0aaa

aws ec2 create-vpn-connection --type ipsec.1 \\
  --customer-gateway-id cgw-0abc --vpn-gateway-id $VGW \\
  --options '{"StaticRoutesOnly":false}'

# customer gateway      = mine  = on-premises router (a description)
# virtual private gateway = AWS's = managed concentrator (a real thing)`,

            `# ---------- The step everyone forgets ----------
# Tunnel UP + BGP established + nothing works = no route in the VPC.
aws ec2 enable-vgw-route-propagation \\
  --route-table-id rtb-0private --gateway-id $VGW

# Verify a PROPAGATED route actually landed in the table the
# instances' subnets use - not just in the default one.
aws ec2 describe-route-tables --route-table-ids rtb-0private \\
  --query 'RouteTables[].Routes[?GatewayId==\`'$VGW'\`].[DestinationCidrBlock,Origin,State]'
# 192.168.0.0/16  EnableVgwRoutePropagation  active     ✅

# Static instead of BGP (small, stable sites only)
aws ec2 create-vpn-connection-route \\
  --vpn-connection-id vpn-0abc --destination-cidr-block 192.168.0.0/16`,

            `# ---------- Terminate on a Transit Gateway instead ----------
# Same Customer Gateway. Different AWS side. Every VPC benefits.
aws ec2 create-vpn-connection --type ipsec.1 \\
  --customer-gateway-id cgw-0abc \\
  --transit-gateway-id tgw-0hub \\
  --options '{"StaticRoutesOnly":false}'

#   VGW  -> one VPC,  no ECMP,        simple
#   TGW  -> all VPCs, ECMP supported, routing-domain segmentation,
#           and the same hub also takes Direct Connect and TGW peering

aws ec2 modify-transit-gateway --transit-gateway-id tgw-0hub \\
  --options VpnEcmpSupport=enable`,

            `# ---------- Troubleshooting, in the order that finds it fastest ----------
aws ec2 describe-vpn-connections --vpn-connection-ids vpn-0abc \\
  --query 'VpnConnections[0].VgwTelemetry[].[OutsideIpAddress,Status,StatusMessage,AcceptedRouteCount]' \\
  --output table
# "IPSEC IS DOWN"          -> phase 2 / proposal mismatch
# "IKE NEGOTIATION FAILED" -> PSK, peer IP, or UDP 500/4500 blocked
# AcceptedRouteCount = 0   -> your side is advertising nothing

# Is the CGW's public IP what AWS actually sees? (NAT changes it)
aws ec2 describe-customer-gateways --customer-gateway-ids cgw-0abc \\
  --query 'CustomerGateways[].[IpAddress,BgpAsn,State]'

# ASN must match your router AND differ from the Amazon-side ASN
aws ec2 describe-vpn-gateways --vpn-gateway-ids $VGW \\
  --query 'VpnGateways[].[AmazonSideAsn,State,VpcAttachments]'

# Then: route tables, then security groups / NACLs for the on-prem CIDR.`,
          ],
          questions: [
            {
              question: "What is the difference between a Customer Gateway and a Virtual Private Gateway?",
              solution: "<p>They are the two ends of a Site-to-Site VPN. The <strong>Customer Gateway</strong> represents <em>your</em> side: it is a description AWS holds of your on-premises router — its public IP, its BGP ASN, type <code>ipsec.1</code> — and creating one provisions nothing, since the actual device is your own firewall or router. The <strong>Virtual Private Gateway</strong> is AWS's side: a managed, AZ-redundant VPN concentrator that attaches to <strong>exactly one VPC</strong>. The VPN connection object joins the two. The naming is from AWS's perspective, which is why people reverse them under pressure — <em>customer means mine</em>.</p>",
            },
            {
              question: "How many VPCs can a Virtual Private Gateway serve?",
              solution: "<p><strong>One.</strong> A VGW attaches to a single VPC, so ten VPCs needing on-premises connectivity would mean ten VGWs and ten VPN connections — with ten sets of tunnels, configuration and monitoring. That is exactly the scaling problem <strong>Transit Gateway</strong> solves: terminate the VPN on a TGW instead, and every attached VPC inherits the hybrid connection, with TGW route tables deciding which environments may actually reach on-premises. The Customer Gateway object is unchanged either way, which nicely illustrates that it only ever describes your side.</p>",
            },
            {
              question: "Your VPN tunnel shows UP and BGP is established, but no traffic flows. What's missing?",
              solution: "<p>Almost certainly <strong>route propagation on the VPC route tables</strong>. The tunnel being up means the IPsec and BGP layers are healthy, but instances still need a route to the on-premises CIDR pointing at the Virtual Private Gateway. Run <code>enable-vgw-route-propagation</code> on the route tables that the relevant subnets actually use — a very common mistake is enabling it on the main route table while the workload subnets are associated with a different one. Then verify with <code>describe-route-tables</code> that a route with origin <code>EnableVgwRoutePropagation</code> is present and active. After routing, check <strong>security groups and NACLs</strong> allow the on-premises ranges, and confirm your side is advertising the prefixes AWS should learn — an <code>AcceptedRouteCount</code> of zero means it is not.</p>",
            },
            {
              question: "Why does every AWS VPN connection have two tunnels, and is that enough for high availability?",
              solution: "<p>AWS provisions two tunnels terminating on <strong>two endpoints in two availability zones</strong>, so a failure on AWS's side does not take the connection down. It is <strong>not</strong> enough on its own, because it only covers AWS's half: if both tunnels terminate on a single customer router, that router — and its single internet circuit — remains a single point of failure. Real redundancy means <strong>two Customer Gateways on two physical devices</strong>, ideally with separate internet connections, giving two VPN connections and four tunnels. Note also that the second tunnel is standby by default, so it provides availability rather than additional bandwidth; to aggregate throughput you need a <strong>Transit Gateway with ECMP</strong> across multiple connections.</p>",
            },
            {
              question: "What information does a Customer Gateway hold, and what ASN should you use?",
              solution: "<p>It holds the <strong>public IP address</strong> of your router (the NAT device's address if your router sits behind NAT, with NAT traversal permitted), your <strong>BGP ASN</strong>, the type <code>ipsec.1</code>, optionally a certificate ARN for certificate-based authentication instead of a pre-shared key, and an optional device name for your own clarity. For the ASN, use a <strong>private ASN</strong> — 64512–65534 in the 16-bit range, or the 32-bit private range — unless your organisation owns a public one. It must match what your router actually advertises and must <strong>differ from the Amazon-side ASN</strong> (default 64512) for eBGP to establish, which is a surprisingly common misconfiguration when someone accepts both defaults.</p>",
            },
            {
              question: "When would you still use a Virtual Private Gateway rather than a Transit Gateway?",
              solution: "<p>When there is genuinely <strong>one VPC</strong> that needs on-premises connectivity and no prospect of more — a small environment, an isolated regulated workload, or a proof of concept. A VGW has no attachment charge and no per-GB processing charge, so for a single VPC it is simpler and cheaper. You might also choose it deliberately when you want that VPC's hybrid connectivity <em>isolated</em> from the rest of the estate, since a shared TGW makes it easy for a routing change to expose more than intended. Beyond the second VPC with the same requirement, the TGW wins: one connection serves everything, routing domains give you segmentation, ECMP gives you bandwidth, and the same hub also terminates Direct Connect and inter-region peering.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/vpn/latest/s2svpn/your-cgw.html",
            "https://docs.aws.amazon.com/vpn/latest/s2svpn/SetUpVPNConnections.html",
            "https://docs.aws.amazon.com/vpn/latest/s2svpn/vpn-redundant-connection.html",
            "https://docs.aws.amazon.com/vpc/latest/tgw/tgw-vpn-attachments.html",
          ],
        },
        {
          topic: "Multi-AZ and Multi-Region VPC Design — Subnets, Route Tables and Blast Radius",
          tags: ["aws", "vpc", "availability zone", "multi-az", "multi-region", "ha", "dr", "subnets"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  High availability in AWS is mostly a <em>placement</em> problem, and placement in a VPC means subnets. Almost every HA question reduces to two facts: <strong>a subnet lives in exactly one availability zone, and a VPC lives in exactly one region.</strong> Everything else — redundant NAT Gateways, multi-AZ databases, cross-region failover — follows from those two constraints and from deciding what you are willing to lose.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What an availability zone actually is</h4>
<p style="line-height: 1.75;">An availability zone is one or more discrete data centres with independent power, cooling and physical security, connected to the other AZs in the region by high-bandwidth, low-latency private links — typically single-digit milliseconds, often well under one. That combination is what makes synchronous replication across AZs practical, which in turn is why AWS's own multi-AZ features (RDS Multi-AZ, ELB, Aurora) work the way they do.</p>
<p style="line-height: 1.75;">A detail worth knowing because it causes genuine confusion in multi-account work: <strong>AZ names are randomised per account.</strong> Your <code>eu-west-1a</code> is not necessarily the same physical zone as another account's <code>eu-west-1a</code>. AWS did this deliberately so that customers do not all pile into "the first one". When you need to talk about the same physical zone across accounts — for cross-account placement, for PrivateLink AZ alignment, or for minimising cross-AZ data transfer between accounts — you use the <strong>AZ ID</strong> (<code>euw1-az1</code>), which <em>is</em> consistent. Mentioning AZ IDs unprompted is a good signal of multi-account experience.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The subnet is the unit of AZ placement</h4>
<p style="line-height: 1.75;">A VPC spans every AZ in its region, but a <strong>subnet does not</strong> — each subnet is created in exactly one AZ and cannot be moved or stretched. That single fact drives the whole design:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>An EC2 instance is placed in a subnet, so its AZ is determined by that choice.</li>
  <li>An Auto Scaling group spans AZs by being given <em>multiple subnets</em>, one per AZ.</li>
  <li>A load balancer is made highly available by enabling it in <em>multiple subnets</em> in different AZs.</li>
  <li>An RDS DB subnet group must contain subnets in <strong>at least two AZs</strong>, which is what makes Multi-AZ failover possible at all.</li>
  <li>"Multi-AZ" for any service is therefore, underneath, always "you gave it subnets in more than one AZ".</li>
</ul>
<p style="line-height: 1.75;">The corollary that catches people: a single-AZ resource cannot be made multi-AZ after the fact by changing a setting. If you built one subnet in one AZ and put everything in it, the remedy is to create new subnets and migrate resources, which for stateful services can be genuinely disruptive. Getting the subnet layout right at VPC creation is cheap; retrofitting it is not.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The canonical layout</h4>
<p style="line-height: 1.75;">The design nearly everyone converges on is three tiers across three AZs — nine subnets, arranged so that each tier has one subnet per AZ:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Public subnets</strong> (one per AZ) — route <code>0.0.0.0/0</code> to the <strong>internet gateway</strong>. These hold load balancers, NAT Gateways and bastion hosts. "Public" means only one thing technically: the route table has an internet gateway route.</li>
  <li><strong>Private application subnets</strong> (one per AZ) — route <code>0.0.0.0/0</code> to a <strong>NAT Gateway</strong>. These hold application servers, containers and Lambda ENIs. They can reach out; nothing can reach in from the internet.</li>
  <li><strong>Private data subnets</strong> (one per AZ) — often with <strong>no default route at all</strong>, reaching AWS services through VPC endpoints. These hold databases, caches and anything that should never touch the internet in either direction.</li>
</ul>
<p style="line-height: 1.75;">Address planning is worth doing deliberately rather than accepting defaults. A <code>/16</code> VPC divided into <code>/20</code> subnets gives roughly 4,000 usable addresses each and sixteen subnets' worth of space — enough for three tiers across three AZs with room for a fourth tier later. Remember AWS reserves <strong>five addresses in every subnet</strong> (network address, VPC router, DNS, a future-use address, and broadcast), so a <code>/24</code> gives you 251 usable rather than 254. Under-sizing subnets is a recurring, painful mistake because <strong>a subnet's CIDR cannot be resized</strong> — you can add secondary CIDRs to the VPC and create new subnets, but the original stays as it is.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Route tables are where AZ independence is won or lost</h4>
<p style="line-height: 1.75;">This is the part that separates a diagram from a design. A NAT Gateway is a <strong>zonal</strong> resource: it lives in one subnet in one AZ. If all three private subnets share a single route table pointing at one NAT Gateway, then every instance in every AZ depends on that one AZ. Lose it and your entire application loses outbound connectivity, even though your instances are perfectly healthy in the surviving zones — you have built a three-AZ deployment with a one-AZ failure domain.</p>
<p style="line-height: 1.75;">The correct pattern is <strong>one NAT Gateway per AZ, and one private route table per AZ</strong>, each pointing at the NAT Gateway in its own zone. This buys two things at once:</p>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Fault isolation.</strong> An AZ failure removes only that AZ's egress path; the other two continue unaffected.</li>
  <li><strong>Cost.</strong> Cross-AZ data transfer is charged, so routing AZ-b's traffic through a NAT Gateway in AZ-a adds a per-GB charge on top of the NAT's own processing charge. Keeping traffic zonal removes that.</li>
</ol>
<p style="line-height: 1.75;">The trade-off is that NAT Gateways have an hourly charge each, so three cost three times as much as one. For production this is straightforwardly worth it; for a development environment, a single NAT Gateway (or a NAT instance, or no NAT at all with VPC endpoints) is a reasonable economy. Being able to state that trade-off explicitly — rather than insisting on three everywhere — is the better answer.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Cross-AZ data transfer, which quietly dominates some bills</h4>
<p style="line-height: 1.75;">Traffic between AZs is charged in <strong>both directions</strong>, and it accumulates invisibly because nothing in the console flags it. Chatty microservices spread randomly across three AZs can generate an enormous amount of inter-AZ traffic for no architectural benefit. Several features exist to control it: <strong>cross-zone load balancing</strong> can be disabled on an NLB so a load balancer node prefers targets in its own AZ; <strong>topology-aware routing</strong> in Kubernetes keeps pod-to-pod traffic zonal; and placing a full stack in each AZ, rather than spreading tiers arbitrarily, keeps request paths within a zone.</p>
<p style="line-height: 1.75;">There is a real tension here worth naming: minimising cross-AZ traffic pushes towards zonal isolation, while availability pushes towards spreading. The resolution is usually to keep <em>request paths</em> zonal where possible while keeping <em>capacity</em> spread across zones, so that an AZ loss removes a third of capacity rather than breaking the application.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What actually survives an AZ failure</h4>
<p style="line-height: 1.75;">Being precise about this is a strong answer. In a well-built three-AZ design: the <strong>load balancer</strong> stops sending traffic to targets in the failed zone and continues serving from the others; the <strong>Auto Scaling group</strong> detects unhealthy instances and launches replacements in the remaining zones; <strong>RDS Multi-AZ</strong> promotes the standby, typically within a minute or two, with the same endpoint name now resolving to the new primary; <strong>NAT Gateways</strong> in surviving zones continue serving their own subnets. Regional services — S3, DynamoDB, SQS — are unaffected because they are regional by construction.</p>
<p style="line-height: 1.75;">What does <em>not</em> survive: anything single-AZ by design. A single EC2 instance, an EBS volume (which is zonal), an unreplicated self-managed database, an ElastiCache cluster without a replica in another zone, and — the classic — a single shared NAT Gateway. Capacity is also a consideration people forget: if you run at full utilisation across three AZs, losing one leaves you at 150% load on the survivors. Genuine AZ resilience means provisioning so the remaining zones can absorb the load, which is why n+1 capacity planning belongs in the same conversation.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Multi-region: a different problem entirely</h4>
<p style="line-height: 1.75;">A VPC is a <strong>regional</strong> construct and cannot span regions. Multi-region therefore means <em>separate VPCs in separate regions</em>, with something joining them and something replicating the data. There is no equivalent of "multi-AZ" at the region level that AWS provides for you, and the latency — tens to hundreds of milliseconds — rules out synchronous replication for most workloads.</p>
<p style="line-height: 1.75;">The connectivity options are: <strong>inter-region VPC peering</strong> for a couple of VPCs; <strong>Transit Gateway peering</strong> for estates, giving a hub in each region joined over the AWS backbone; and <strong>PrivateLink</strong> where you only need to expose a service. Traffic on the AWS backbone is encrypted in transit between regions, which matters for compliance conversations.</p>
<p style="line-height: 1.75;">Getting <em>users</em> to the right region is separate from connecting the networks, and uses <strong>Route 53</strong> (latency-based, geolocation or failover routing, with health checks) or <strong>AWS Global Accelerator</strong> (anycast IP addresses that bring traffic onto the AWS backbone at the nearest edge and fail over in seconds rather than waiting for DNS TTLs). Global Accelerator is the better answer when failover speed matters, because DNS caching by clients and resolvers makes DNS-based failover unpredictable.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The four DR patterns, and what each costs</h4>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Backup and restore</strong> — backups replicated to another region, infrastructure built on demand. Recovery in hours; cheapest by far.</li>
  <li><strong>Pilot light</strong> — data replicated continuously, minimal core infrastructure running, application tier scaled from zero on failover. Recovery in tens of minutes.</li>
  <li><strong>Warm standby</strong> — a scaled-down but fully functional copy running continuously, scaled up on failover. Recovery in minutes.</li>
  <li><strong>Active-active</strong> — both regions serving traffic, data replicated bidirectionally. Near-zero recovery time, highest cost, and by far the hardest because you now own conflict resolution and data consistency.</li>
</ol>
<p style="line-height: 1.75;">The right answer in an interview is to ask for the <strong>RTO and RPO</strong> before choosing, because these patterns are a direct trade of cost against recovery time. It is also worth saying that whatever you choose must be <strong>tested</strong> — an untested DR region is a hypothesis, not a capability, and the usual failure is that IAM roles, quotas, AMIs or certificates were never created in the second region.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">CIDR planning across regions</h4>
<p style="line-height: 1.75;">Multi-region makes address planning non-negotiable, because you will eventually want the regions to talk to each other and overlapping ranges make that impossible. The standard approach is to allocate a distinct block per region from an overall supernet — for example <code>10.0.0.0/12</code> to eu-west-1 and <code>10.16.0.0/12</code> to us-east-1 — so routes summarise cleanly and a Transit Gateway route table stays small. <strong>AWS IPAM</strong> exists to enforce this centrally, with pools per region and per environment and automatic allocation at VPC creation. The alternative — teams accepting the console's default <code>10.0.0.0/16</code> in every region — guarantees a collision, and you discover it at the worst possible moment.</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Subnet sizing arithmetic, done once properly</h4>
<p style="line-height: 1.75;">Because subnet CIDRs cannot be resized, the sizing decision is permanent, and it is worth being able to reason about it quickly. AWS reserves <strong>five addresses per subnet</strong>: the network address, the VPC router (<code>.1</code>), the DNS resolver (<code>.2</code>), one reserved for future use (<code>.3</code>), and the broadcast address. So:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><code>/28</code> → 16 addresses → <strong>11 usable</strong>. The smallest AWS permits, and only suitable for tiny fixed-size things.</li>
  <li><code>/24</code> → 256 → <strong>251 usable</strong>. Fine for a load balancer subnet, usually too small for containers.</li>
  <li><code>/22</code> → 1,024 → <strong>1,019 usable</strong>.</li>
  <li><code>/20</code> → 4,096 → <strong>4,091 usable</strong>. A sensible default for application subnets.</li>
  <li><code>/16</code> → 65,536 → the largest VPC CIDR AWS accepts.</li>
</ul>
<p style="line-height: 1.75;">The demand side matters as much as the arithmetic. An EKS node with the VPC CNI reserves a pool of addresses whether or not pods are using them; a Fargate task takes one each; a Lambda function attached to the VPC consumes addresses for its shared ENIs; interface endpoints take one per AZ each; and a load balancer scales into spare addresses as traffic grows. A <code>/24</code> that looks generous for twenty EC2 instances is exhausted by a modest container platform.</p>
<p style="line-height: 1.75;">The recovery path when you get it wrong is to <strong>add a secondary CIDR to the VPC</strong> and create new subnets from it — which works, but leaves you with a fragmented address plan and route tables that no longer summarise neatly. Spending ten minutes on sizing at creation is dramatically cheaper.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Two AZs or three?</h4>
<p style="line-height: 1.75;">A reasonable interview follow-up, and the answer is not simply "more is better". <strong>Two</strong> gives you survival of a single AZ failure, but each zone must carry 100% of the load after a failure, so you provision double the capacity you need. <strong>Three</strong> means each zone carries 50% after a failure, so you provision 1.5×, which is cheaper at scale despite the extra subnets and NAT Gateways. Beyond three, the marginal availability gain is small and the cross-AZ traffic and NAT costs keep accruing.</p>
<p style="line-height: 1.75;">Some services also have their own requirements — an ALB needs at least two AZs, an RDS DB subnet group needs at least two, and quorum-based systems such as etcd or ZooKeeper want an odd number, which is an independent argument for three. The honest answer is "three for production where the region supports it, two for non-production, and I would state the capacity-planning reason rather than treating it as a rule of thumb."</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Testing failure rather than assuming it</h4>
<p style="line-height: 1.75;">A design that has never failed over is a hypothesis. The practical ways to test, in increasing order of realism: <strong>reboot an RDS instance with <code>--force-failover</code></strong> and measure how long the application takes to recover; <strong>terminate instances in one AZ</strong> and watch the Auto Scaling group and load balancer respond; <strong>remove the NAT Gateway route</strong> in one AZ to confirm the others are unaffected; and use <strong>AWS Fault Injection Service</strong>, which can simulate an availability zone impairment more faithfully than manual disruption.</p>
<p style="line-height: 1.75;">What these tests usually reveal is not a networking problem but an application one: connection pools holding stale addresses after an RDS failover, health check grace periods too short for startup, capacity insufficient in the surviving zones, or a dependency that turns out to be single-AZ. Saying that you would test — and what you expect the test to find — is a stronger answer than describing the target architecture alone.</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What "region-scoped" means for a DR plan</h4>
<p style="line-height: 1.75;">A recurring failure in multi-region designs is discovering, during a test, that something essential exists only in the primary region. The list of region-scoped things is longer than people expect: <strong>AMIs</strong>, <strong>KMS keys</strong>, <strong>ACM certificates</strong> (and note that a certificate used by CloudFront must live in us-east-1 specifically), <strong>Secrets Manager secrets</strong>, <strong>Parameter Store parameters</strong>, <strong>service quotas</strong>, <strong>ECR repositories</strong>, <strong>Lambda function code</strong>, and <strong>capacity</strong> itself — a region you have never used at scale may not grant you the instance capacity you assume during a regional failover, when everyone else is failing over too.</p>
<p style="line-height: 1.75;">IAM is the notable exception: it is global, so roles and policies exist everywhere. That asymmetry is worth stating precisely, because candidates often assume either everything or nothing is global. The practical consequence is that a DR region should be built from the same infrastructure-as-code as the primary and exercised regularly, rather than being assembled during an incident from a runbook that has never been run.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Data replication is the hard part</h4>
<p style="line-height: 1.75;">Network connectivity between regions is straightforward; keeping data consistent is not, and it is where the real design work lives. The options each carry a different consistency and cost profile: <strong>S3 Cross-Region Replication</strong> is asynchronous and eventually consistent, with replication time control available if you need an SLA; <strong>DynamoDB global tables</strong> are multi-active with last-writer-wins conflict resolution, which is fine for some workloads and quietly wrong for others; <strong>Aurora Global Database</strong> gives sub-second replication lag with a designated primary; and <strong>cross-region read replicas</strong> for standard RDS are asynchronous with lag that varies with load.</p>
<p style="line-height: 1.75;">The question to ask before choosing is not "which is best?" but "what RPO can the business tolerate, and what happens to in-flight writes at the moment of failure?" An active-active design in particular is not simply two warm standbys — it makes you responsible for conflict resolution, idempotency and clock skew, which is an application problem that no amount of networking solves.</p>


<p style="line-height: 1.75;">One closing observation that ties the two halves of this topic together. <strong>Multi-AZ is something AWS largely does for you if you give it the subnets; multi-region is something you build yourself.</strong> An ALB, an Auto Scaling group and an RDS Multi-AZ deployment all become resilient simply by being handed subnets in several zones — the failover logic is AWS's. Nothing equivalent exists across regions: you own the replication, the traffic steering, the failover decision and the testing. That asymmetry is why the honest answer to "should we be multi-region?" starts with the recovery objectives and the appetite for that operational burden, rather than with an architecture diagram.</p>


<p style="line-height: 1.75;">One practical closing note on route tables. Because each private subnet needs its own route table in a per-AZ NAT design, the number of route tables grows with zones and tiers, and it becomes easy to associate a new subnet with the wrong one — which produces a subnet whose egress crosses an availability zone without anyone noticing until the data transfer charges appear. Naming route tables after their zone and tier, and defining them in infrastructure as code rather than the console, removes most of that risk. It is a small discipline that prevents a class of quiet misconfiguration.</p>

<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "HA in a VPC is a placement problem, because a <strong>subnet lives in exactly one AZ</strong> and a <strong>VPC lives in exactly one region</strong>. So I build three tiers across three AZs — public subnets with an internet gateway route for load balancers and NAT, private app subnets, and private data subnets with no default route. The detail that matters most is <strong>one NAT Gateway per AZ with a separate route table per AZ</strong>: a shared NAT makes a three-AZ deployment fail with one zone, and it also incurs cross-AZ data charges. 'Multi-AZ' for any service is always really 'I gave it subnets in more than one AZ' — that's what an RDS DB subnet group and an ALB's subnet list are doing. For multi-region, VPCs can't stretch, so it's separate VPCs joined by Transit Gateway peering or inter-region peering, with Route 53 or Global Accelerator steering users — and I'd pick between backup-and-restore, pilot light, warm standby and active-active only after asking for the RTO and RPO."</div>
</div>`,
          examples: [
            `# ---------- Nine subnets: three tiers x three AZs ----------
VPC=vpc-0aaa   # 10.0.0.0/16

# PUBLIC - one per AZ (ALB, NAT Gateway, bastion)
aws ec2 create-subnet --vpc-id $VPC --cidr-block 10.0.0.0/20   --availability-zone eu-west-1a
aws ec2 create-subnet --vpc-id $VPC --cidr-block 10.0.16.0/20  --availability-zone eu-west-1b
aws ec2 create-subnet --vpc-id $VPC --cidr-block 10.0.32.0/20  --availability-zone eu-west-1c

# PRIVATE APP - one per AZ
aws ec2 create-subnet --vpc-id $VPC --cidr-block 10.0.48.0/20  --availability-zone eu-west-1a
aws ec2 create-subnet --vpc-id $VPC --cidr-block 10.0.64.0/20  --availability-zone eu-west-1b
aws ec2 create-subnet --vpc-id $VPC --cidr-block 10.0.80.0/20  --availability-zone eu-west-1c

# PRIVATE DATA - one per AZ (no default route at all)
aws ec2 create-subnet --vpc-id $VPC --cidr-block 10.0.96.0/20  --availability-zone eu-west-1a
aws ec2 create-subnet --vpc-id $VPC --cidr-block 10.0.112.0/20 --availability-zone eu-west-1b
aws ec2 create-subnet --vpc-id $VPC --cidr-block 10.0.128.0/20 --availability-zone eu-west-1c

# AWS reserves 5 addresses per subnet -> a /20 gives 4091 usable, not 4096.
# A subnet CIDR can NEVER be resized. Size it once, generously.`,

            `# ---------- The design decision that actually decides your HA ----------
# BAD: one NAT Gateway, one shared private route table
#   -> lose that AZ and ALL private subnets lose egress
#   -> plus cross-AZ data transfer charges in both directions
#   -> a three-AZ deployment with a one-AZ failure domain

# GOOD: one NAT Gateway per AZ, one private route table per AZ
for az in a b c; do
  EIP=$(aws ec2 allocate-address --domain vpc --query AllocationId --output text)
  NAT=$(aws ec2 create-nat-gateway --subnet-id subnet-public-$az \\
        --allocation-id $EIP --query 'NatGateway.NatGatewayId' --output text)
  RTB=$(aws ec2 create-route-table --vpc-id $VPC \\
        --query 'RouteTable.RouteTableId' --output text)
  aws ec2 create-route --route-table-id $RTB \\
    --destination-cidr-block 0.0.0.0/0 --nat-gateway-id $NAT
  aws ec2 associate-route-table --route-table-id $RTB --subnet-id subnet-app-$az
done
# Cost: 3x the NAT hourly charge. Worth it in prod; often not in dev.`,

            `# ---------- AZ names are randomised per account. AZ IDs are not. ----------
aws ec2 describe-availability-zones \\
  --query 'AvailabilityZones[].[ZoneName,ZoneId,State]' --output table
# eu-west-1a   euw1-az2      <- account A
# eu-west-1a   euw1-az1      <- account B: SAME NAME, DIFFERENT ZONE

# Use the ZoneId whenever you need the same PHYSICAL zone across accounts:
#  - minimising cross-AZ transfer between accounts
#  - PrivateLink provider/consumer AZ alignment
#  - capacity reservations shared across an organisation

aws ec2 describe-subnets --filters Name=vpc-id,Values=$VPC \\
  --query 'Subnets[].[SubnetId,AvailabilityZone,AvailabilityZoneId,CidrBlock]' --output table`,

            `# ---------- "Multi-AZ" is always "I gave it subnets in >1 AZ" ----------
# RDS: the DB subnet group IS the multi-AZ mechanism
aws rds create-db-subnet-group --db-subnet-group-name prod-db \\
  --db-subnet-group-description "private data subnets, 3 AZs" \\
  --subnet-ids subnet-data-a subnet-data-b subnet-data-c

# ALB: enabled in one subnet per AZ
aws elbv2 create-load-balancer --name prod-alb --type application \\
  --subnets subnet-public-a subnet-public-b subnet-public-c

# ASG: spans AZs by being given multiple subnets
aws autoscaling create-auto-scaling-group \\
  --auto-scaling-group-name prod-app --min-size 6 --max-size 18 \\
  --desired-capacity 9 \\
  --vpc-zone-identifier "subnet-app-a,subnet-app-b,subnet-app-c"
# n+1 planning: at 9 instances across 3 AZs, losing one AZ leaves 6
# carrying 100% of the load. Size for the surviving zones.`,

            `# ---------- Multi-region: separate VPCs, joined deliberately ----------
# VPCs cannot span regions. Plan non-overlapping space per region.
#   eu-west-1 : 10.0.0.0/12
#   us-east-1 : 10.16.0.0/12
aws ec2 create-vpc --cidr-block 10.16.0.0/16 --region us-east-1

# Join the hubs over the AWS backbone (encrypted in transit)
aws ec2 create-transit-gateway-peering-attachment \\
  --transit-gateway-id tgw-0euw1 \\
  --peer-transit-gateway-id tgw-0use1 \\
  --peer-region us-east-1 --peer-account-id 111122223333
# Inter-region TGW peering supports STATIC routes only - no propagation.

# Steering users is a separate problem from connecting networks:
#   Route 53 latency/failover  -> simple, but client DNS caching is slow
#   Global Accelerator         -> anycast IPs, failover in seconds
aws globalaccelerator create-accelerator --name prod-global --enabled

# Enforce the address plan centrally so collisions never happen
aws ec2-ipam create-ipam-pool --address-family ipv4 \\
  --locale eu-west-1 --provisioned-cidrs Cidr=10.0.0.0/12 2>/dev/null || true`,
          ],
          questions: [
            {
              question: "How do you design a VPC for high availability?",
              solution: "<p>Spread across <strong>at least two, preferably three availability zones</strong>, remembering that a <strong>subnet exists in exactly one AZ</strong> — so HA is fundamentally about subnet placement. The canonical layout is three tiers × three AZs: <strong>public subnets</strong> with an internet gateway route for load balancers and NAT Gateways, <strong>private application subnets</strong> routing out via NAT, and <strong>private data subnets</strong> with no default route, reaching AWS services through VPC endpoints. Critically, deploy <strong>one NAT Gateway per AZ with a separate route table per AZ</strong>, so an AZ failure does not remove egress for the whole application. Then give every AZ-aware service subnets in each zone — an ALB's subnet list, an ASG's <code>vpc-zone-identifier</code>, an RDS DB subnet group — and provision n+1 capacity so the surviving zones can absorb the load.</p>",
            },
            {
              question: "Why deploy a NAT Gateway per availability zone instead of sharing one?",
              solution: "<p>Two reasons. <strong>Fault isolation:</strong> a NAT Gateway is a zonal resource, so if all private subnets route through one, losing that AZ removes outbound connectivity for instances in <em>every</em> zone — you have a three-AZ deployment with a one-AZ failure domain, and the instances are healthy but cannot reach anything. <strong>Cost:</strong> cross-AZ data transfer is charged in both directions, so routing AZ-b's traffic through a NAT Gateway in AZ-a adds a per-GB charge on top of the NAT's own processing charge. The trade-off is the hourly charge per gateway, so three cost three times one — entirely justified in production, often not in development, where a single NAT Gateway or VPC endpoints with no NAT at all is reasonable.</p>",
            },
            {
              question: "Why are AZ names randomised per account, and when does it matter?",
              solution: "<p>AWS maps AZ names to physical zones independently per account so that customers do not all concentrate in \"the first one\" — your <code>eu-west-1a</code> may be a different physical zone from another account's <code>eu-west-1a</code>. It matters whenever you need to reason about the <em>same physical zone</em> across accounts: aligning a PrivateLink provider and consumer, minimising cross-AZ data transfer between accounts, or sharing capacity reservations. For those, use the <strong>AZ ID</strong> (for example <code>euw1-az1</code>), which is consistent across every account. <code>describe-availability-zones</code> returns both the name and the ID, and <code>describe-subnets</code> exposes <code>AvailabilityZoneId</code> for the same reason.</p>",
            },
            {
              question: "Can a VPC span regions, and how do you build multi-region?",
              solution: "<p>No — a VPC is a <strong>regional</strong> construct. Multi-region means separate VPCs in each region, joined explicitly and with data replicated. Connectivity options are <strong>inter-region VPC peering</strong> for a small number of VPCs, <strong>Transit Gateway peering</strong> for estates (note it supports <em>static routes only</em>, not propagation), or <strong>PrivateLink</strong> if you only need to expose a service. Steering users is a separate problem, solved with <strong>Route 53</strong> latency or failover routing, or <strong>Global Accelerator</strong> when you need failover in seconds rather than waiting on DNS caching. Plan <strong>non-overlapping CIDRs per region</strong> from the start — ideally enforced with AWS IPAM — because otherwise you discover the collision the day you try to connect them.</p>",
            },
            {
              question: "What survives an AZ failure in a well-designed VPC, and what doesn't?",
              solution: "<p><strong>Survives:</strong> the load balancer stops routing to the failed zone and serves from the others; the Auto Scaling group replaces unhealthy instances in the surviving zones; RDS Multi-AZ promotes the standby, usually within a minute or two, with the same endpoint resolving to the new primary; NAT Gateways in the other zones keep serving their own subnets; and regional services such as S3, DynamoDB and SQS are unaffected. <strong>Does not survive:</strong> anything zonal by design — a single EC2 instance, an EBS volume, an unreplicated self-managed database, an ElastiCache cluster with no replica elsewhere, and the classic single shared NAT Gateway. Capacity is the other half: running three AZs at full utilisation means the survivors face 150% load, so n+1 provisioning is part of the design rather than an optimisation.</p>",
            },
            {
              question: "Walk me through choosing a multi-region DR strategy.",
              solution: "<p>Start by asking for <strong>RTO and RPO</strong>, because the four patterns are a direct trade of cost against recovery time. <strong>Backup and restore</strong> — cross-region backups, infrastructure built on demand; recovery in hours, cheapest. <strong>Pilot light</strong> — data replicated continuously, minimal core running, application tier scaled from zero; tens of minutes. <strong>Warm standby</strong> — a scaled-down but working copy running continuously; minutes. <strong>Active-active</strong> — both regions serving, bidirectional replication; near-zero RTO, highest cost, and hardest because you own conflict resolution. Whichever you choose, the design must also cover the <em>non-obvious</em> region-scoped things — IAM roles, service quotas, AMIs, certificates, KMS keys — and it must be <strong>tested</strong>, because an untested DR region is a hypothesis rather than a capability.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html",
            "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html",
            "https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html",
            "https://docs.aws.amazon.com/vpc/latest/ipam/what-it-is-ipam.html",
          ],
        },
        {
          topic: "IPv6 in a VPC — Dual-Stack Subnets and the Egress-Only Internet Gateway",
          tags: ["aws", "vpc", "ipv6", "dual-stack", "egress-only igw", "nat64", "dns64", "subnets"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  IPv6 in AWS is mostly straightforward, but it has a handful of rules that differ sharply from IPv4, and interviewers ask about it because those differences reveal whether you understand <em>why</em> NAT exists rather than just how to configure it. The headline: <strong>every IPv6 address AWS gives you is globally routable, there is no NAT for IPv6, and the thing that replaces NAT is the egress-only internet gateway.</strong>
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Why anyone bothers</h4>
<p style="line-height: 1.75;">Two reasons, and the second has become much more compelling recently.</p>
<p style="line-height: 1.75;">The original reason is <strong>address exhaustion</strong>. RFC 1918 private space gives you roughly 17.9 million addresses across the <code>10/8</code>, <code>172.16/12</code> and <code>192.168/16</code> ranges, which sounds enormous until you run a large multi-account estate with container workloads where every pod takes an address. Organisations genuinely run out, and the symptom is ugly: VPCs that cannot be peered because ranges collide, subnets that cannot be resized, and elaborate NAT workarounds. IPv6 gives a single VPC a <code>/56</code>, which is 256 subnets each holding roughly 18 quintillion addresses. Exhaustion stops being a design constraint.</p>
<p style="line-height: 1.75;">The newer reason is <strong>cost</strong>. AWS now charges an hourly fee for every public IPv4 address in use, including those attached to instances, NAT Gateways and load balancers. For a large fleet that is a real, recurring line item, and it has turned IPv6 adoption from a tidiness exercise into a budget conversation. Combined with the fact that a NAT Gateway itself carries both an hourly charge and a per-GB processing charge — and that IPv6 needs no NAT at all — a dual-stack or IPv6-preferred design can remove a meaningful amount of spend.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">How AWS assigns IPv6</h4>
<p style="line-height: 1.75;">The allocation model is rigid, which is actually helpful because there is almost nothing to decide:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>A VPC gets a <strong><code>/56</code></strong>, either assigned by Amazon from its own pool or brought by you (BYOIP) if you own address space.</li>
  <li>Each subnet gets a <strong><code>/64</code></strong> — always. You cannot choose a different prefix length. This is deliberate: <code>/64</code> is the standard subnet size in IPv6 and is required for mechanisms like SLAAC.</li>
  <li>You do not pick the range in the way you do with IPv4; you pick which <code>/64</code> out of the VPC's <code>/56</code>, and the rest follows.</li>
</ul>
<p style="line-height: 1.75;">You can run a VPC <strong>dual-stack</strong> (both IPv4 and IPv6 on every subnet), which is the normal approach, or create <strong>IPv6-only subnets</strong> for workloads that genuinely do not need IPv4. IPv6-only is cleaner but requires that everything the workload talks to is reachable over IPv6, which in practice still constrains you — several AWS services and a great many third-party endpoints remain IPv4-only. Dual-stack is the pragmatic default.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The rule that changes everything: all IPv6 addresses are public</h4>
<p style="line-height: 1.75;">In AWS's IPv6 model there is no equivalent of RFC 1918. Every address assigned to an instance is a <strong>globally unique, globally routable</strong> address. There is no "private IPv6" tier.</p>
<p style="line-height: 1.75;">This makes people uncomfortable at first, and the discomfort is worth addressing head-on because it is a common interview probe. <em>Globally routable does not mean reachable.</em> Reachability is decided by two things you already control: whether the subnet's route table has a path to an internet gateway, and whether security groups and network ACLs permit the traffic. An instance with a global IPv6 address in a subnet whose route table has no <code>::/0</code> route is exactly as unreachable as an instance with only a private IPv4 address. What has changed is that <strong>the security boundary is entirely your route tables and security groups, with no accidental protection from unroutable addressing.</strong></p>
<p style="line-height: 1.75;">That shift explains why NAT does not exist for IPv6. NAT was invented to solve address scarcity — many private hosts sharing few public addresses — and the privacy it appears to provide is a side effect, not a design goal. With no scarcity, there is nothing for NAT to solve, so AWS provides no NAT Gateway for IPv6 at all.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The egress-only internet gateway</h4>
<p style="line-height: 1.75;">What people actually want from a NAT Gateway, besides address sharing, is the <em>directionality</em>: instances can start outbound connections, but nothing on the internet can start an inbound one. AWS provides that for IPv6 as a separate object — the <strong>egress-only internet gateway (EIGW)</strong>.</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>It is <strong>stateful</strong>: outbound connections are allowed and their return traffic is permitted, while unsolicited inbound connections are blocked.</li>
  <li>It is <strong>horizontally scaled and highly available</strong> by AWS, like an internet gateway — it is not a zonal resource, so there is no "one per AZ" design question.</li>
  <li>It performs <strong>no address translation</strong>. The instance's own global IPv6 address is the source address seen by the destination, which is excellent for logging, allow-listing and debugging.</li>
  <li>It costs <strong>nothing per hour and nothing per GB</strong>. Compare that with a NAT Gateway, which charges both. This is a genuinely significant operational difference and worth stating explicitly.</li>
</ul>
<p style="line-height: 1.75;">The route table pattern is therefore: a public subnet routes <code>::/0</code> to the <strong>internet gateway</strong> (inbound and outbound), while a private subnet routes <code>::/0</code> to the <strong>egress-only internet gateway</strong> (outbound only). It maps cleanly onto the IPv4 pattern of internet gateway versus NAT Gateway, and saying that mapping out loud is the fastest way to demonstrate you understand both.</p>
<p style="line-height: 1.75;">One asymmetry worth remembering: an internet gateway handles both IPv4 and IPv6, but an egress-only internet gateway is <strong>IPv6-only</strong>. A dual-stack private subnet therefore needs <em>both</em> a NAT Gateway for IPv4 and an EIGW for IPv6.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The gotcha that bites everyone: security rules are not shared</h4>
<p style="line-height: 1.75;">Security group and network ACL rules for IPv4 and IPv6 are <strong>completely separate</strong>. A rule allowing <code>0.0.0.0/0</code> on port 443 does absolutely nothing for IPv6 traffic; you need a matching rule for <code>::/0</code>. This produces two opposite failure modes, and both are common.</p>
<p style="line-height: 1.75;">The first is a <strong>connectivity failure</strong>: you enable IPv6, clients start preferring AAAA records, and connections fail — because the security group only ever had IPv4 rules. The application appears broken for some users and fine for others, depending on whether their resolver and stack prefer IPv6.</p>
<p style="line-height: 1.75;">The second, and more dangerous, is a <strong>security hole</strong>: someone carefully restricts IPv4 access to a corporate range, enables IPv6 later, and leaves a permissive <code>::/0</code> rule that was added during testing. The IPv4 controls look immaculate while the service is wide open over IPv6. Any audit of security groups after an IPv6 rollout must check both families, and it is worth saying so in an interview because it is exactly the kind of oversight that produces incidents.</p>
<p style="line-height: 1.75;">Network ACLs have the same split, with the added subtlety that they are stateless — so IPv6 return traffic on ephemeral ports needs its own explicit outbound rules alongside the IPv4 ones.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Reaching IPv4-only destinations from IPv6-only workloads</h4>
<p style="line-height: 1.75;">If you commit to IPv6-only subnets, you still need to reach the large part of the internet that is IPv4-only. AWS solves this with <strong>DNS64 and NAT64</strong> working together:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>DNS64</strong> is enabled per subnet. When a lookup returns only an A record, the Route 53 Resolver synthesises an AAAA record by embedding the IPv4 address inside the well-known prefix <code>64:ff9b::/96</code>.</li>
  <li><strong>NAT64</strong> is performed by the <strong>NAT Gateway</strong>, which recognises traffic to that prefix and translates it to real IPv4 on the way out.</li>
</ul>
<p style="line-height: 1.75;">The consequence that surprises people: an IPv6-only design that needs IPv4 destinations <strong>still requires a NAT Gateway</strong>, and therefore still incurs its hourly and per-GB charges, plus a route for <code>64:ff9b::/96</code> pointing at it. So IPv6-only removes NAT for IPv6 traffic, not for IPv4 traffic. Being precise about that distinction is a good differentiator.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Practical constraints</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Not every service supports IPv6.</strong> Coverage has improved a great deal, but gaps remain, and a service that is IPv4-only forces dual-stack on any subnet that talks to it. Check before committing to IPv6-only.</li>
  <li><strong>Instance types matter.</strong> IPv6-only subnets require Nitro-based instance types; older families cannot be used.</li>
  <li><strong>Load balancers</strong> can be dual-stack, and an ALB can accept IPv6 from clients while forwarding to IPv4-only targets — a very useful transitional pattern that lets you offer IPv6 externally without converting the back end.</li>
  <li><strong>You cannot disable IPv4 on a dual-stack subnet</strong>; a subnet is either dual-stack or IPv6-only, chosen at creation.</li>
  <li><strong>Egress-only internet gateways do not work with IPv4</strong>, and NAT Gateways do not translate IPv6-to-IPv6 — the two mechanisms are not interchangeable.</li>
  <li><strong>IPv6 CIDRs cannot be removed</strong> from a VPC without disruption once resources are using them, so plan the rollout rather than experimenting in production.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">A sensible migration sequence</h4>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Associate an IPv6 <code>/56</code></strong> with the VPC. This changes nothing on its own.</li>
  <li><strong>Add a <code>/64</code> to each subnet</strong>, making them dual-stack. Still no behaviour change until routes exist.</li>
  <li><strong>Create an internet gateway route</strong> (<code>::/0</code>) in public subnets and an <strong>egress-only internet gateway route</strong> in private subnets.</li>
  <li><strong>Update security groups and NACLs</strong> with matching IPv6 rules — before enabling anything that will use them, and audited for accidental <code>::/0</code> allows.</li>
  <li><strong>Enable IPv6 on load balancers</strong> and publish AAAA records, so external clients can use IPv6 while back ends remain unchanged.</li>
  <li><strong>Assign IPv6 to instances</strong> and verify both stacks work, including outbound through the EIGW.</li>
  <li><strong>Only then consider IPv6-only subnets</strong> for new workloads, with DNS64/NAT64 if they must reach IPv4 destinations.</li>
</ol>
<p style="line-height: 1.75;">The reason for that order is that each step is independently reversible until you start removing IPv4, and the security-rule step comes before traffic rather than after.</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What stays the same, and what quietly differs</h4>
<p style="line-height: 1.75;">Most VPC concepts carry across unchanged, which is worth saying because it reduces the apparent size of the topic. Subnets are still zonal, route tables still work the same way, security groups are still stateful and NACLs still stateless, VPC endpoints still exist, and peering and Transit Gateway both support IPv6. What differs is a short list:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Route entries are separate.</strong> An IPv4 route to <code>0.0.0.0/0</code> says nothing about IPv6; you need a matching <code>::/0</code> entry. A dual-stack subnet therefore has two default routes pointing at two different gateways.</li>
  <li><strong>Security rules are separate</strong>, as covered — the single most consequential difference operationally.</li>
  <li><strong>No NAT, and therefore no zonal NAT resource</strong> to deploy per AZ for IPv6 traffic. The egress-only gateway is regional and needs no HA planning.</li>
  <li><strong>Prefix sizes are fixed</strong> at <code>/56</code> and <code>/64</code>, so subnet sizing stops being a decision.</li>
  <li><strong>Addresses are not reused the way private IPv4 space is</strong>, so the same address never appears in two VPCs — which incidentally removes the overlapping-CIDR problem that dominates IPv4 multi-VPC design.</li>
</ul>
<p style="line-height: 1.75;">That last point deserves emphasis because it is easy to miss. A large part of the complexity in IPv4 multi-VPC networking — IPAM, careful allocation, NAT to work around collisions, PrivateLink chosen specifically to avoid routing — exists because RFC 1918 space is small and everyone uses the same ranges. With globally unique IPv6 addressing, VPCs can be peered or joined by a Transit Gateway without any possibility of collision, which is a genuine architectural simplification and not merely a bigger address pool.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">IPv6 with Transit Gateway, peering and endpoints</h4>
<p style="line-height: 1.75;">A few integration details that come up in design discussions. <strong>Transit Gateway VPC attachments</strong> have an explicit <code>Ipv6Support</code> option that is disabled by default — enabling IPv6 on your subnets does nothing for inter-VPC traffic until that option is turned on, which is an easy thing to miss when retrofitting. <strong>VPC peering</strong> supports IPv6 and requires its own <code>::/0</code>-style routes for the peer's IPv6 CIDR, in addition to the IPv4 ones. <strong>Gateway endpoints</strong> for S3 and DynamoDB support IPv6 through dual-stack endpoints, but you must add the IPv6 prefix-list route as well as the IPv4 one, and the bucket must be addressed via a dual-stack hostname.</p>
<p style="line-height: 1.75;"><strong>Site-to-Site VPN</strong> supports IPv6 traffic inside the tunnel, though the tunnel's outer addresses are typically still IPv4, and <strong>Direct Connect</strong> supports IPv6 on virtual interfaces with its own BGP peering session for the address family. The general pattern: IPv6 is supported nearly everywhere, but almost always as a <em>separate</em> configuration alongside IPv4 rather than something inherited automatically — which is exactly why a rollout is a sequence of deliberate steps rather than a single switch.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Where IPv6 actually pays off first</h4>
<p style="line-height: 1.75;">If you are deciding where to start, three cases give the clearest return. <strong>Public-facing load balancers</strong> — making an ALB dual-stack lets IPv6 clients reach you while the entire back end stays IPv4, so it is low risk and immediately useful for mobile networks that are IPv6-only. <strong>Large container platforms</strong> — where IPv4 exhaustion is already forcing secondary CIDRs and awkward workarounds, and where the pod-per-address model makes the address pool the binding constraint. And <strong>high-egress workloads</strong> — where replacing NAT Gateway processing charges with a free egress-only gateway is a direct, measurable saving.</p>
<p style="line-height: 1.75;">Where it pays off least is a small, stable estate with modest traffic and no address pressure: the migration effort and the doubled security-rule surface buy very little. Being able to say where it is <em>not</em> worth doing is as useful in an interview as knowing how it works.</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Reading IPv6 addresses without panic</h4>
<p style="line-height: 1.75;">Part of the resistance to IPv6 is simply that the addresses look intimidating, and a short orientation helps. An address is 128 bits written as eight groups of four hexadecimal digits. Leading zeros in a group may be dropped, and one run of all-zero groups may be collapsed to <code>::</code> — once per address. So <code>2600:1f14:0abc:0d00:0000:0000:0000:0001</code> is written <code>2600:1f14:abc:d00::1</code>.</p>
<p style="line-height: 1.75;">The structure AWS gives you makes this easier than it looks. Your VPC's <code>/56</code> fixes the first 56 bits, and each subnet's <code>/64</code> fixes the next 8 — so within a VPC, <strong>the subnet is identified by a single hex digit pair</strong> and everything after the <code>::</code> is host addressing. In practice you read the fourth group to know which subnet you are looking at and ignore the rest, which is no harder than reading the third octet of an IPv4 address.</p>
<p style="line-height: 1.75;">A few well-known prefixes are worth recognising when they appear in logs and policies: <code>::/0</code> is the default route; <code>fe80::/10</code> is link-local; <code>64:ff9b::/96</code> is the NAT64 prefix; and <code>2000::/3</code> covers the globally routable unicast space that AWS allocates from. Seeing <code>64:ff9b::</code> in a flow log, for instance, immediately tells you that a DNS64 synthesis happened and the traffic is heading for an IPv4 destination through a NAT Gateway.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Operational habits that prevent surprises</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Audit both address families together.</strong> Any script or Config rule that checks for <code>0.0.0.0/0</code> in security groups must also check <code>::/0</code>, or your reporting is silently half-blind.</li>
  <li><strong>Test with both stacks explicitly.</strong> <code>curl -4</code> and <code>curl -6</code> against the same endpoint catches the case where one family works and the other does not — which otherwise surfaces as an intermittent failure affecting only some users.</li>
  <li><strong>Watch what clients actually prefer.</strong> Once AAAA records exist, most stacks prefer IPv6, so a broken IPv6 path becomes the primary path rather than a fallback. Publishing AAAA records is therefore the moment of truth, not enabling addresses.</li>
  <li><strong>Keep flow logs on.</strong> IPv6 traffic appears there with its own records, and it is the fastest way to confirm which family a workload is really using.</li>
</ul>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">A compact summary of the differences</h4>
<p style="line-height: 1.75;">If the topic compresses to a handful of contrasts worth reciting: prefix sizes are <strong>fixed</strong> (<code>/56</code> per VPC, <code>/64</code> per subnet) rather than chosen; every address is <strong>globally routable</strong>, so there is no private tier and no NAT; outbound-only access comes from an <strong>egress-only internet gateway</strong> which is free, regional and performs no translation, rather than a NAT Gateway which is charged, zonal and does; security rules and routes are <strong>maintained separately per address family</strong>, which is where both the outages and the security holes come from; reaching IPv4-only destinations from an IPv6-only subnet needs <strong>DNS64 plus NAT64</strong> and therefore still needs a NAT Gateway; and the practical driver for adoption today is as much the <strong>hourly charge on public IPv4 addresses</strong> as it is address exhaustion.</p>
<p style="line-height: 1.75;">Everything else — subnets being zonal, security groups being stateful, NACLs being stateless, endpoints, peering and Transit Gateway support — carries across unchanged, which is worth saying because it makes the migration sound like the incremental exercise it actually is rather than a redesign.</p>


<p style="line-height: 1.75;">Finally, a note on sequencing within an organisation. IPv6 rollouts succeed when they start at the <strong>edge</strong> and move inward — dual-stack load balancers first, because that is low risk, immediately valuable for IPv6-only mobile clients, and requires no backend change — and they stall when they start in the middle by enabling addresses everywhere and hoping. Each step inward should be independently reversible, with the security-rule work done <em>before</em> traffic rather than after, and with both address families tested explicitly at every stage.</p>


<p style="line-height: 1.75;">As a last orientation point: the mental shift IPv6 demands is giving up the habit of treating <em>addressing</em> as a security control. In IPv4 practice, "it has a private address" has long been shorthand for "it is not reachable", and that shorthand happens to be true because RFC 1918 space is not routable on the internet. IPv6 removes the coincidence — every address is routable — so reachability becomes purely a function of routes and rules you set deliberately. That is a better model, because it was always the routes and rules doing the real work, but it does mean the controls have to be correct rather than merely conventional.</p>

<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "A VPC gets a <code>/56</code> and every subnet a <code>/64</code> — fixed sizes. The key difference from IPv4 is that <strong>all AWS IPv6 addresses are globally routable</strong>; there's no private range, so there's no address scarcity and therefore <strong>no NAT for IPv6</strong>. What replaces it is the <strong>egress-only internet gateway</strong>: stateful, outbound-only, no translation, highly available — and unlike a NAT Gateway it costs nothing per hour or per GB. So public subnets route <code>::/0</code> to the internet gateway and private subnets route <code>::/0</code> to the EIGW, mirroring IGW-versus-NAT on the IPv4 side. The gotcha I always check is that <strong>security group and NACL rules are separate per address family</strong> — an IPv4 rule does nothing for IPv6, which either breaks connectivity or, worse, leaves a wide-open <code>::/0</code> rule beside carefully locked-down IPv4. And if you go IPv6-only you still need a NAT Gateway for <strong>DNS64/NAT64</strong> to reach IPv4-only destinations."</div>
</div>`,
          examples: [
            `# ---------- Enable IPv6: fixed prefix sizes, nothing to choose ----------
aws ec2 associate-vpc-cidr-block --vpc-id vpc-0aaa \\
  --amazon-provided-ipv6-cidr-block
# VPC gets a /56, e.g. 2600:1f14:abc:d00::/56

aws ec2 describe-vpcs --vpc-ids vpc-0aaa \\
  --query 'Vpcs[].Ipv6CidrBlockAssociationSet[].Ipv6CidrBlock'

# Every subnet gets a /64. Always. You cannot pick another size.
aws ec2 associate-subnet-cidr-block --subnet-id subnet-0pub-a \\
  --ipv6-cidr-block 2600:1f14:abc:d00::/64
aws ec2 associate-subnet-cidr-block --subnet-id subnet-0app-a \\
  --ipv6-cidr-block 2600:1f14:abc:d01::/64

# Auto-assign on launch so instances actually get an address
aws ec2 modify-subnet-attribute --subnet-id subnet-0app-a \\
  --assign-ipv6-address-on-creation`,

            `# ---------- The IPv6 answer to "NAT Gateway" ----------
EIGW=$(aws ec2 create-egress-only-internet-gateway --vpc-id vpc-0aaa \\
  --query 'EgressOnlyInternetGateway.EgressOnlyInternetGatewayId' --output text)

# PUBLIC subnet: both directions, via the internet gateway
aws ec2 create-route --route-table-id rtb-0public \\
  --destination-ipv6-cidr-block ::/0 --gateway-id igw-0abc

# PRIVATE subnet: outbound only, via the egress-only gateway
aws ec2 create-route --route-table-id rtb-0private \\
  --destination-ipv6-cidr-block ::/0 --egress-only-internet-gateway-id $EIGW

#            IPv4                    IPv6
#  public :  IGW                     IGW
#  private:  NAT Gateway             Egress-Only IGW
#
#  NAT Gateway : hourly + per-GB, zonal, translates addresses
#  EIGW        : FREE, regional/HA,      NO translation
#                -> the instance's own global address is the source IP`,

            `# ---------- The mistake that breaks things, and the one that opens them ----------
# Security group and NACL rules are SEPARATE per address family.

# This does NOTHING for IPv6 traffic:
aws ec2 authorize-security-group-ingress --group-id sg-0web \\
  --protocol tcp --port 443 --cidr 0.0.0.0/0

# You need the matching IPv6 rule:
aws ec2 authorize-security-group-ingress --group-id sg-0web \\
  --ip-permissions '[{"IpProtocol":"tcp","FromPort":443,"ToPort":443,
    "Ipv6Ranges":[{"CidrIpv6":"::/0","Description":"https v6"}]}]'

# AUDIT: IPv4 locked to the office, IPv6 wide open = the classic hole
aws ec2 describe-security-groups \\
  --query 'SecurityGroups[].IpPermissions[?Ipv6Ranges[?CidrIpv6==\`::/0\`]].[
            IpProtocol,FromPort,ToPort]' --output text

# NACLs are stateless: IPv6 return traffic needs its own egress rules
aws ec2 create-network-acl-entry --network-acl-id acl-0abc --rule-number 110 \\
  --protocol tcp --port-range From=1024,To=65535 --egress \\
  --ipv6-cidr-block ::/0 --rule-action allow`,

            `# ---------- IPv6-only subnets, and the NAT you still need ----------
aws ec2 create-subnet --vpc-id vpc-0aaa \\
  --ipv6-cidr-block 2600:1f14:abc:d10::/64 \\
  --ipv6-native --availability-zone eu-west-1a
# Nitro-based instance types only.

# Reaching IPv4-only destinations: DNS64 synthesises AAAA records...
aws ec2 modify-subnet-attribute --subnet-id subnet-0v6only \\
  --enable-dns64

# ...and the NAT Gateway does the NAT64 translation
aws ec2 create-route --route-table-id rtb-0v6only \\
  --destination-ipv6-cidr-block 64:ff9b::/96 \\
  --nat-gateway-id nat-0abc

# So "IPv6-only" removes NAT for IPv6 traffic, NOT for IPv4 destinations.
# You still pay NAT hourly + per-GB for anything reaching the v4 internet.`,

            `# ---------- Dual-stack at the edge: v6 outside, v4 inside ----------
aws elbv2 set-ip-address-type --load-balancer-arn "$ALB_ARN" \\
  --ip-address-type dualstack
# Clients connect over IPv6; targets can stay IPv4-only.
# This is the cheapest way to "support IPv6" without touching the backend.

aws ec2 describe-instances --instance-ids i-0abc \\
  --query 'Reservations[].Instances[].NetworkInterfaces[].[
            PrivateIpAddress,Ipv6Addresses[].Ipv6Address]'

# From the instance, confirm BOTH paths work:
#   curl -4 https://checkip.amazonaws.com     -> via NAT Gateway
#   curl -6 https://ipv6.icanhazip.com        -> via EIGW, shows its OWN address

# Cost driver worth naming: AWS now charges hourly for every public IPv4
# address in use - instances, NAT Gateways and load balancers included.`,
          ],
          questions: [
            {
              question: "How does IPv6 addressing work in a VPC?",
              solution: "<p>A VPC is assigned a <strong><code>/56</code></strong>, either from Amazon's pool or brought via BYOIP, and every subnet gets a <strong><code>/64</code></strong> — the sizes are fixed and cannot be chosen. Subnets can be <strong>dual-stack</strong> (IPv4 and IPv6 together, the pragmatic default) or <strong>IPv6-only</strong>, which requires Nitro-based instance types. The defining difference from IPv4 is that <strong>every AWS IPv6 address is globally routable</strong> — there is no RFC 1918 equivalent, so no private tier and no address scarcity. Reachability is therefore controlled entirely by route tables and security groups rather than by unroutable addressing.</p>",
            },
            {
              question: "What is an egress-only internet gateway and why does IPv6 need one?",
              solution: "<p>It is the IPv6 equivalent of a NAT Gateway's <em>directionality</em>: <strong>stateful, outbound-only</strong> internet access, so instances can initiate connections and receive the responses while unsolicited inbound connections are blocked. IPv6 needs a separate object because <strong>there is no NAT for IPv6</strong> — NAT exists to solve IPv4 address scarcity, and with globally routable addresses there is nothing to translate. Three practical differences from a NAT Gateway: it performs <strong>no address translation</strong>, so the instance's own address is the source seen by the destination; it is <strong>regional and highly available</strong> rather than zonal, so there is no one-per-AZ design decision; and it costs <strong>nothing per hour and nothing per GB</strong>.</p>",
            },
            {
              question: "If all IPv6 addresses are public, how do you keep instances private?",
              solution: "<p>The same way you always did — <strong>route tables and security groups</strong>. Globally routable is not the same as reachable: an instance in a subnet whose route table has no <code>::/0</code> entry has no path to the internet at all, and one routed to an <strong>egress-only internet gateway</strong> can initiate outbound connections but cannot receive inbound ones. Security groups and NACLs then govern what is permitted. What genuinely changes is that you lose the accidental protection of unroutable addressing, so the controls must be correct rather than merely present — which is exactly why the separate IPv6 rule set is the thing to audit carefully.</p>",
            },
            {
              question: "You enabled IPv6 and some users can no longer reach the application. What happened?",
              solution: "<p>Almost certainly <strong>security group rules</strong>. IPv4 and IPv6 rules are entirely separate — a rule allowing <code>0.0.0.0/0</code> on port 443 does nothing for IPv6 traffic, and you need a matching <code>::/0</code> rule. Once AAAA records are published, clients whose stack prefers IPv6 use it and fail, while IPv4-preferring clients succeed, producing a confusing partial outage. Check NACLs too, remembering they are <strong>stateless</strong>, so IPv6 return traffic on ephemeral ports needs its own outbound rules. The mirror-image risk is worth auditing at the same time: a permissive <code>::/0</code> rule left over from testing sitting beside carefully restricted IPv4 rules is a wide-open service that every IPv4-focused review will miss.</p>",
            },
            {
              question: "Does going IPv6-only let you remove NAT Gateways?",
              solution: "<p>Only for IPv6 traffic. IPv6 needs no NAT, and outbound IPv6 goes through a free <strong>egress-only internet gateway</strong>. But an IPv6-only workload still has to reach the substantial part of the internet that is <strong>IPv4-only</strong>, and AWS handles that with <strong>DNS64</strong> — the resolver synthesises an AAAA record embedding the IPv4 address in the <code>64:ff9b::/96</code> prefix — plus <strong>NAT64</strong>, which is performed by a <strong>NAT Gateway</strong>. So you keep a NAT Gateway, its hourly and per-GB charges, and a route for <code>64:ff9b::/96</code> pointing at it. The saving is real but narrower than \"IPv6 removes NAT\" suggests.</p>",
            },
            {
              question: "Why has IPv6 adoption in AWS accelerated recently?",
              solution: "<p>Chiefly <strong>cost</strong>. AWS now charges an hourly fee for <em>every public IPv4 address in use</em> — on instances, NAT Gateways and load balancers alike — so a large fleet carries a continuous, visible charge that did not previously exist. Combined with NAT Gateway hourly and per-GB processing fees, and the fact that IPv6 needs no NAT and its egress-only gateway is free, dual-stack becomes a budget conversation rather than a tidiness exercise. The older driver still applies too: large multi-account estates with container workloads genuinely exhaust RFC 1918 space, producing VPCs that cannot be peered because ranges collide — and an IPv6 <code>/56</code> makes exhaustion a non-issue.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-migrate-ipv6.html",
            "https://docs.aws.amazon.com/vpc/latest/userguide/egress-only-internet-gateway.html",
            "https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateway-nat64-dns64.html",
            "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-ip-addressing.html",
          ],
        },
        {
          topic: "VPC Sharing with AWS RAM — One VPC, Many Accounts, No Peering",
          tags: ["aws", "vpc", "ram", "resource access manager", "vpc sharing", "multi-account", "subnets"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>VPC sharing</strong> inverts the usual multi-account networking question. Instead of asking "how do I connect all these VPCs?", it asks "why are there all these VPCs?" One account — the <strong>owner</strong> — creates a VPC and shares specific <strong>subnets</strong> with other accounts in the same AWS Organization using <strong>AWS Resource Access Manager (RAM)</strong>. Those accounts, the <strong>participants</strong>, launch their own resources directly into those subnets. There is no peering, no Transit Gateway attachment, no routing configuration, and no data transfer charge between them, because <em>it is all one VPC</em>.
</p>
<p style="line-height: 1.75;">The analogy that lands: peering and Transit Gateway are like connecting separate office buildings with corridors and managing who has keys. VPC sharing is like giving each team its own floor of the same building. There is nothing to connect because nobody left.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Owner and participant: who controls what</h4>
<p style="line-height: 1.75;">The split of responsibilities is the heart of the concept, and it is the thing interviewers probe.</p>
<p style="line-height: 1.75;">The <strong>owner account</strong> controls the network itself: the VPC and its CIDR, the subnets, all <strong>route tables</strong>, internet gateways and NAT Gateways, VPC endpoints, peering connections and Transit Gateway attachments, network ACLs, and VPC flow logs. Participants cannot modify any of these — they cannot add a route, cannot change the CIDR, cannot delete a subnet.</p>
<p style="line-height: 1.75;">The <strong>participant accounts</strong> control their own resources: EC2 instances, RDS databases, load balancers, Lambda ENIs, ECS tasks — and, importantly, <strong>their own security groups</strong>. Each participant sees only the shared subnets, not the whole VPC, and by default sees only their own resources. They are billed for what they run.</p>
<p style="line-height: 1.75;">That division is exactly what a platform team usually wants: <strong>central control of the network, decentralised control of the workloads</strong>. The networking team owns addressing, egress, inspection and hybrid connectivity in one place, while application teams keep their own account boundary for IAM, billing, quotas and blast radius.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What you get for free</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>No connectivity to build.</strong> Participants' resources are on the same network, so they reach each other by private IP with no peering, no TGW attachment and no routes.</li>
  <li><strong>No inter-VPC data transfer charge.</strong> Traffic between participants is intra-VPC. Cross-AZ charges still apply, but there is no peering or Transit Gateway processing fee — which for chatty workloads is a substantial saving.</li>
  <li><strong>Shared infrastructure costs amortise.</strong> One set of NAT Gateways, one set of interface VPC endpoints, one set of Direct Connect or VPN attachments, serving every participant. Interface endpoints in particular are billed per AZ per hour, so sharing them across ten accounts instead of duplicating them is a large, direct saving.</li>
  <li><strong>Far better IP utilisation.</strong> Separate VPCs each reserve a block regardless of usage; a shared VPC allocates from one pool, so sparse teams do not each waste a <code>/16</code>.</li>
  <li><strong>Fewer objects to govern.</strong> One VPC's route tables and flow logs instead of thirty.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Security groups across accounts</h4>
<p style="line-height: 1.75;">A detail worth knowing precisely, because it is both useful and surprising. Participants create their own security groups in the shared VPC. They can also <strong>reference security groups owned by other accounts</strong> in the same shared VPC — so an application team's security group can allow traffic from a specific security group belonging to a different team, by ID, rather than hard-coding CIDR ranges.</p>
<p style="line-height: 1.75;">That is a genuine advantage over both Transit Gateway (which cannot do cross-VPC security group references at all) and peering (which supports them only within the same region). It makes micro-segmentation across team boundaries practical, and it survives instances being replaced, which CIDR-based rules do not. A participant cannot, however, delete or modify a security group owned by another account — referencing is read-only.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Constraints and gotchas</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Organization membership is required.</strong> Subnet sharing works within an AWS Organization (and normally requires RAM sharing with the organization to be enabled). You cannot share subnets with an arbitrary external account.</li>
  <li><strong>You share subnets, not the VPC.</strong> This is a control feature — you can share only the private application subnets with one team and a different set with another, so teams never see subnets that are not theirs.</li>
  <li><strong>Participants cannot see the whole picture.</strong> They cannot view route tables or other accounts' resources, which is good for isolation but means troubleshooting frequently requires the owner. A participant seeing "no route to host" has no way to check the route table themselves — a real operational friction worth planning for with good documentation or read-only cross-account roles.</li>
  <li><strong>Deleting is asymmetric.</strong> The owner cannot delete a subnet while participant resources are in it, and unsharing a subnet does not terminate what is already running — but it does prevent new launches, and it can leave participants with resources they can no longer manage cleanly.</li>
  <li><strong>Blast radius is shared.</strong> A route table change by the owner affects every participant at once. This is the flip side of central control and argues strongly for infrastructure as code and change review on the owner account.</li>
  <li><strong>Quotas are shared.</strong> Security groups per VPC, network interfaces, and similar limits are VPC-scoped, so one noisy participant can consume headroom that others need. Worth monitoring.</li>
  <li><strong>Some services need care.</strong> A handful of AWS services behave differently or have restrictions in shared subnets, so it is worth verifying for anything unusual rather than assuming parity.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">VPC sharing versus Transit Gateway</h4>
<p style="line-height: 1.75;">These are not competitors so much as answers to different questions, and saying so is the strongest framing.</p>
<div style="overflow-x: auto; margin-top: 0.75rem;">
<table style="width: 100%; border-collapse: collapse; font-size: 0.92rem;">
  <thead>
    <tr style="background: #f1f5f9; text-align: left;">
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;"></th>
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;">VPC sharing</th>
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;">Transit Gateway</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Model</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">One VPC, many accounts</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Many VPCs, connected</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Network isolation between teams</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Security groups only</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Routing domains + security groups</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Data transfer between teams</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Intra-VPC (no TGW fee)</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Per-GB processing charge</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">IP efficiency</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">High — one pool</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Lower — a block per VPC</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Who controls routing</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Owner only</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Each VPC owner, plus the hub</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Cross-account SG references</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;"><strong>Yes</strong></td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">No</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Blast radius of a change</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">All participants</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Per VPC, or the hub</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Best for</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Many small workloads, one network policy</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Independent environments, strong isolation</td></tr>
  </tbody>
</table>
</div>
<p style="line-height: 1.75;">In practice large estates use <strong>both</strong>: shared VPCs to consolidate many small workloads within an environment, and a Transit Gateway to connect those shared VPCs to each other, to on-premises, and to genuinely independent VPCs that need their own routing. Offering that combination, rather than treating it as an either/or, is the answer that reflects how real landing zones are built.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">When not to use it</h4>
<p style="line-height: 1.75;">VPC sharing gives you <em>account</em> isolation but not <em>network</em> isolation. Every participant is on the same layer-3 network, so the only thing separating teams is security groups and NACLs. If your requirement is that production and development must be unable to route to each other regardless of any misconfiguration, a shared VPC is the wrong tool — use separate VPCs and Transit Gateway routing domains, where the isolation is structural. Similarly, if teams genuinely need to control their own routing, endpoints or peering, the owner/participant split will feel like a bottleneck rather than a service. And for a regulated workload that must demonstrate network-level separation, an auditor will usually want separate VPCs.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">RAM beyond subnets</h4>
<p style="line-height: 1.75;">Worth knowing that RAM is a general mechanism, not a VPC feature. The same service shares <strong>Transit Gateways</strong> (so workload accounts can create their own attachments while the networking account keeps the route tables), <strong>Route 53 Resolver rules</strong> (so one set of forwarding rules serves the organisation), <strong>License Manager configurations</strong>, <strong>Capacity Reservations</strong>, <strong>Aurora DB clusters</strong>, and more. In a well-built landing zone you typically see several RAM shares working together: the TGW shared from the network account, resolver rules shared from shared services, and subnets shared from a per-environment network account. Mentioning that breadth shows you see RAM as the multi-account sharing primitive rather than a one-off.</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The organisational argument, which is the real one</h4>
<p style="line-height: 1.75;">The technical description of VPC sharing undersells why organisations adopt it. The driver is usually not cost or IP efficiency but <strong>the separation of concerns between a platform team and application teams</strong>.</p>
<p style="line-height: 1.75;">Without it, a multi-account estate forces an awkward choice. Either every application team owns a VPC — in which case they own subnetting, NAT Gateways, endpoints, route tables and hybrid connectivity, all of which they neither want nor are equipped to get right, and the networking team loses any ability to enforce consistency — or the networking team owns everything centrally, in which case every VPC change is a ticket and teams cannot move. VPC sharing resolves it: <strong>the network is a product the platform team operates, and application teams consume subnets the way they consume any other managed service.</strong></p>
<p style="line-height: 1.75;">That framing also explains what participants are given and denied. They get everything that is about <em>their workload</em> — instances, tasks, databases, load balancers, security groups — and nothing that is about <em>the network</em>. A team cannot accidentally route their subnet to an internet gateway, cannot create a peering connection to a partner, cannot disable flow logs, and cannot widen the VPC's CIDR. Those are exactly the actions a platform team wants to retain, and exactly the ones an application team has no reason to perform.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What a shared-VPC landing zone looks like</h4>
<p style="line-height: 1.75;">Concretely, an estate built this way typically has, per environment and per region:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>A network account</strong> owning one VPC per environment, with subnets allocated from a planned address space, NAT Gateways per AZ, a full set of interface endpoints, gateway endpoints for S3 and DynamoDB, flow logs, and a Transit Gateway attachment for hybrid and cross-environment connectivity.</li>
  <li><strong>RAM shares</strong> exposing specific subnet sets to specific organisational units — the application subnets to application OUs, the data subnets to teams that run databases, and nothing to teams that need neither.</li>
  <li><strong>Workload accounts</strong> that contain only workloads: no VPC, no route tables, no gateways. Their IAM, billing, quotas and blast radius remain separate, which is the entire point of having separate accounts.</li>
</ul>
<p style="line-height: 1.75;">The result is that adding a new application account is a RAM association rather than a networking project, and the number of VPCs in the organisation stays in the low tens rather than the hundreds — which is itself a large operational saving, because every VPC carries its own endpoints, NAT Gateways, flow logs and route tables to maintain.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Operating it: the friction points and how to remove them</h4>
<p style="line-height: 1.75;">Two frictions show up in practice and both have standard mitigations, which is worth knowing because an interviewer may push on "doesn't that make troubleshooting harder?".</p>
<p style="line-height: 1.75;"><strong>Participants cannot see the network.</strong> A team hitting a connectivity problem cannot inspect route tables or NACLs, so every such issue escalates. The mitigation is a <strong>read-only cross-account role</strong> in the network account that participants may assume, granting <code>ec2:Describe*</code> on networking resources. They can then diagnose their own problems without being able to change anything, which removes most of the escalations while preserving the control boundary.</p>
<p style="line-height: 1.75;"><strong>Shared quotas and noisy neighbours.</strong> Security groups per VPC, network interfaces, and available addresses per subnet are all VPC-scoped, so one team's growth consumes headroom another team needs. The mitigations are monitoring (<code>AvailableIpAddressCount</code> per subnet, and Service Quotas for security groups per VPC and rules per group), giving different teams <em>different subnet sets</em> so address exhaustion is contained, and sizing subnets generously at creation since they cannot be resized.</p>
<p style="line-height: 1.75;">A third, subtler point: <strong>flow logs and network monitoring live with the owner</strong>, so a participant investigating traffic needs either access to those logs or a log-sharing arrangement. Planning that up front avoids a situation where the team that can see the logs is not the team that understands the application.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Combining it with Transit Gateway</h4>
<p style="line-height: 1.75;">The two are complementary, and the combination is what most large landing zones actually run. <strong>Within</strong> an environment, a shared VPC consolidates many workloads onto one network with shared egress and endpoints. <strong>Between</strong> environments — and to on-premises — a Transit Gateway connects those shared VPCs with routing domains providing structural isolation that security groups alone cannot.</p>
<p style="line-height: 1.75;">So a typical estate might have three shared VPCs (production, staging, development), each in its own network account, each with dozens of participant accounts, all attached to a central Transit Gateway that also carries the Direct Connect and VPN connections. Production and development are in separate TGW routing domains and cannot reach each other; both reach shared services; on-premises reaches production only. Each layer is doing what it is best at: <strong>sharing removes unnecessary VPCs, and the Transit Gateway connects the ones that genuinely need to be separate.</strong></p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Migrating into a shared model</h4>
<p style="line-height: 1.75;">Teams rarely start with shared VPCs, so "how would you move to it?" is a fair follow-up. The honest answer is that it is a workload migration rather than a networking change, because resources cannot be moved between VPCs — an instance, a database or a load balancer lives in the VPC it was created in.</p>
<p style="line-height: 1.75;">A workable sequence: build the shared VPC and its subnets in the network account with a clean address plan; share the relevant subnets to the target accounts; deploy the workload <em>alongside</em> the existing one, into the shared subnets; connect the old and new environments temporarily with peering or a Transit Gateway attachment so data can be migrated and traffic can be shifted gradually; cut over with DNS; then decommission the original VPC and its NAT Gateways and endpoints, which is where the cost saving actually appears.</p>
<p style="line-height: 1.75;">The parts that take longest are stateful: databases need snapshot-and-restore or replication-based migration, and anything holding a fixed private address needs re-addressing. It is worth saying explicitly that the saving from consolidating NAT Gateways and interface endpoints only materialises once the <em>old</em> VPCs are deleted — keeping them running "just in case" for six months turns a cost-reduction project into a cost increase.</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">How it changes cost attribution</h4>
<p style="line-height: 1.75;">A practical consequence that surfaces quickly in real adoption: <strong>shared infrastructure is billed to the owner</strong>. The network account pays for the NAT Gateways, the interface endpoints, the Transit Gateway attachment and the data processing, while participants pay only for the resources they run. That is usually the intent — the platform is a shared service — but it means the network account's bill grows as participants scale, without an obvious link back to who caused it.</p>
<p style="line-height: 1.75;">The mitigations are worth knowing. <strong>Cost allocation tags</strong> on shared resources help, but do not attribute per-participant usage of a shared NAT Gateway. <strong>VPC flow logs</strong> can be analysed to attribute traffic by source address, which maps back to participant resources, and is the usual basis for chargeback where that matters. And <strong>separating subnets per team</strong> makes address consumption attributable even when data processing is not.</p>
<p style="line-height: 1.75;">The broader point for an interview is that VPC sharing does not remove costs; it <strong>consolidates and relocates</strong> them. The saving is real — one set of endpoints instead of thirty — but the resulting bill sits in one account, and an organisation that treats per-account spend as a team accountability measure needs to plan for that before adopting the model rather than discovering it in the first month's invoice.</p>


<p style="line-height: 1.75;">A useful way to close: VPC sharing is best understood as answering a <em>governance</em> question with a <em>networking</em> mechanism. The question is "how do application teams get their own AWS accounts without each becoming a network operator?", and the answer is to let the account boundary carry IAM, billing, quotas and blast radius while the network stays a single shared thing that a platform team runs properly. Peering and Transit Gateway connect networks that already exist; VPC sharing questions whether those networks needed to exist separately at all — and in a large estate of small workloads, most of them did not.</p>


<p style="line-height: 1.75;">A final point of comparison worth holding: sharing, peering, Transit Gateway and PrivateLink are four answers to four genuinely different questions. <strong>Sharing</strong> answers "should these be separate networks at all?" <strong>Peering</strong> answers "how do these two networks talk?" <strong>Transit Gateway</strong> answers "how do many networks talk, with policy?" And <strong>PrivateLink</strong> answers "how does one party consume one service without joining networks?" Reaching for the right one starts with hearing which of those four questions is actually being asked — and a surprising number of multi-VPC problems are really the first question, asked too late.</p>


<p style="line-height: 1.75;">A closing practical detail on lifecycle. Unsharing a subnet does <strong>not</strong> terminate anything already running in it — existing resources continue to work, but no <em>new</em> ones can be launched there, which produces a confusing state where a team's running services are fine and their deployments fail. Similarly, the owner <strong>cannot delete a subnet</strong> while participant resources occupy it, and cannot always see enough detail about those resources to know whose they are. The practical habits that avoid both: tag everything with an owning team, keep an inventory of which accounts a subnet is shared with, and treat unsharing as a coordinated change with notice rather than a cleanup task — because the failure it causes is delayed and lands on someone else.</p>


<p style="line-height: 1.75;">And the shortest version, if you have one sentence: VPC sharing is the option you reach for when the honest answer to "how do we connect these thirty VPCs?" is that most of them should never have been separate VPCs in the first place.</p>

<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "VPC sharing lets an owner account share specific <strong>subnets</strong> with other accounts in the same Organization via AWS RAM. Participants launch their own resources into those subnets and manage their own security groups, while the owner keeps sole control of route tables, gateways, endpoints and NACLs. The point is that there's nothing to connect — it's one VPC, so no peering, no TGW attachment, no inter-VPC data transfer charge, and shared NAT Gateways and interface endpoints amortise across every participant. It also uses IP space far more efficiently than a VPC per team. Two things I'd flag: participants can't see route tables, so troubleshooting often needs the owner; and it gives <strong>account</strong> isolation but not <strong>network</strong> isolation — everyone is on the same layer-3 network with only security groups between them. So I'd use shared VPCs to consolidate many workloads within one environment, and still use a Transit Gateway to separate environments where the isolation has to be structural."</div>
</div>`,
          examples: [
            `# ---------- Owner: share SUBNETS, not the VPC ----------
# Enable org-wide sharing once (from the management account)
aws ram enable-sharing-with-aws-organization

SHARE=$(aws ram create-resource-share \\
  --name prod-app-subnets \\
  --resource-arns \\
    arn:aws:ec2:eu-west-1:111122223333:subnet/subnet-0app-a \\
    arn:aws:ec2:eu-west-1:111122223333:subnet/subnet-0app-b \\
    arn:aws:ec2:eu-west-1:111122223333:subnet/subnet-0app-c \\
  --principals arn:aws:organizations::111122223333:ou/o-abc123/ou-prod \\
  --query 'resourceShare.resourceShareArn' --output text)

# Sharing SUBNETS rather than the VPC is the control point:
# team A gets the app subnets, team B gets a different set,
# and neither ever sees the other's or the data subnets.`,

            `# ---------- Participant: it just looks like a subnet ----------
# Shared subnets appear in describe-subnets with a different OwnerId
aws ec2 describe-subnets \\
  --query 'Subnets[].[SubnetId,OwnerId,AvailabilityZone,CidrBlock,
            AvailableIpAddressCount]' --output table
# subnet-0app-a  111122223333  eu-west-1a  10.0.48.0/20  4012
#                ^^^^^^^^^^^^ not my account = shared with me

# Launch straight into it. No peering, no attachment, no routes.
aws ec2 run-instances --image-id ami-0abc --instance-type t3.medium \\
  --subnet-id subnet-0app-a --security-group-ids sg-0mine

# What a participant CANNOT do:
aws ec2 describe-route-tables --filters Name=vpc-id,Values=vpc-0shared
# -> empty. Route tables belong to the owner.
aws ec2 create-route --route-table-id rtb-0owner ...
# -> AccessDenied. This is the operational friction to plan for.`,

            `# ---------- The advantage TGW cannot give you ----------
# Participants can REFERENCE security groups owned by OTHER accounts
# in the same shared VPC - by ID, not by CIDR.
aws ec2 authorize-security-group-ingress \\
  --group-id sg-0db-team-b \\
  --ip-permissions '[{
    "IpProtocol":"tcp","FromPort":5432,"ToPort":5432,
    "UserIdGroupPairs":[{"GroupId":"sg-0app-team-a","UserId":"444455556666"}]
  }]'

# Transit Gateway: impossible - you must use CIDRs, which silently
#   grant access to anything that later lands in that range.
# VPC peering: possible, but same-region only.
# Shared VPC: works across accounts, survives instance replacement.

# Referencing is read-only - you cannot modify another account's SG.`,

            `# ---------- What sharing actually saves ----------
# Interface endpoints bill PER ENDPOINT, PER AZ, PER HOUR.
# 10 separate VPCs x 12 endpoints x 3 AZs = 360 endpoint-AZ-hours
# 1 shared VPC    x 12 endpoints x 3 AZs =  36 endpoint-AZ-hours
for s in ssm ssmmessages ec2messages secretsmanager kms logs sts ecr.api ecr.dkr; do
  aws ec2 create-vpc-endpoint --vpc-id vpc-0shared --vpc-endpoint-type Interface \\
    --service-name com.amazonaws.eu-west-1.$s \\
    --subnet-ids subnet-0app-a subnet-0app-b subnet-0app-c \\
    --private-dns-enabled
done

# Same for NAT Gateways: 3 shared, not 30.
# And traffic between participants is INTRA-VPC:
#   no peering charge, no TGW per-GB processing charge
#   (cross-AZ transfer still applies - keep tiers zonal where you can)`,

            `# ---------- Operate it safely ----------
# Watch VPC-scoped quotas: participants consume shared headroom
aws ec2 describe-subnets --subnet-ids subnet-0app-a \\
  --query 'Subnets[].AvailableIpAddressCount'
aws service-quotas get-service-quota --service-code vpc --quota-code L-E79EC296  # SGs per VPC

# Who is actually using my shared subnets?
aws ec2 describe-network-interfaces \\
  --filters Name=subnet-id,Values=subnet-0app-a \\
  --query 'NetworkInterfaces[].[NetworkInterfaceId,OwnerId,Description]' --output table

# Unsharing does NOT terminate existing resources - it blocks NEW launches
aws ram disassociate-resource-share --resource-share-arn $SHARE \\
  --principals 444455556666

# RAM shares far more than subnets - a real landing zone uses several:
#   Transit Gateways        (attachments self-service, routes centrally owned)
#   Route 53 Resolver rules (one set of forwarding rules for the org)
#   License Manager, Capacity Reservations, Aurora clusters, Prefix Lists`,
          ],
          questions: [
            {
              question: "What is VPC sharing and how does it differ from peering or Transit Gateway?",
              solution: "<p>An <strong>owner</strong> account shares specific <strong>subnets</strong> of its VPC with other accounts in the same AWS Organization using <strong>AWS RAM</strong>; those <strong>participants</strong> launch resources directly into those subnets. The difference is categorical rather than incremental: peering and Transit Gateway <em>connect separate VPCs</em>, whereas VPC sharing means there is only <strong>one VPC</strong> — so there is nothing to connect, no routes to maintain, and no inter-VPC data transfer or TGW processing charge between participants. The owner retains sole control of route tables, gateways, endpoints and NACLs; participants control their own resources and security groups.</p>",
            },
            {
              question: "What can a participant account do, and what can't it?",
              solution: "<p><strong>Can:</strong> launch and manage its own resources in the shared subnets — EC2, RDS, load balancers, Lambda ENIs, ECS tasks — create and manage its own <strong>security groups</strong>, and even <em>reference</em> security groups owned by other accounts in the same shared VPC by ID. <strong>Cannot:</strong> view or modify <strong>route tables</strong>, change the VPC or subnet CIDRs, create or delete subnets, manage internet or NAT gateways, VPC endpoints, peering connections or Transit Gateway attachments, or see other accounts' resources. That split — central network control, decentralised workload control — is the point, but it means a participant hitting a routing problem cannot diagnose it themselves, which is a real operational friction worth planning for.</p>",
            },
            {
              question: "What are the main cost benefits of VPC sharing?",
              solution: "<p>Three. <strong>Shared infrastructure amortises</strong>: one set of NAT Gateways and one set of interface VPC endpoints serve every participant, and since interface endpoints bill <em>per endpoint, per AZ, per hour</em>, consolidating ten VPCs' worth into one is a large, direct saving. <strong>No inter-VPC transfer charges</strong> between participants, because the traffic is intra-VPC — no peering charge and no Transit Gateway per-GB processing fee (cross-AZ transfer still applies). And <strong>far better IP utilisation</strong>, since a VPC per team reserves a block regardless of usage while a shared VPC allocates from one pool. There is also an indirect saving in operational effort: one VPC's route tables, flow logs and endpoints to govern instead of thirty.</p>",
            },
            {
              question: "When would you NOT use VPC sharing?",
              solution: "<p>When you need <strong>network</strong> isolation rather than just <strong>account</strong> isolation. Every participant sits on the same layer-3 network, so the only separation is security groups and NACLs — if the requirement is that production and development cannot route to each other regardless of any misconfiguration, use separate VPCs with Transit Gateway routing domains, where the isolation is structural. Also avoid it when teams genuinely need to control their own routing, endpoints or peering, since the owner/participant split will feel like a bottleneck; when a regulated workload must demonstrate network-level separation to an auditor; or when a single owner-side route table change affecting <em>every</em> participant at once is an unacceptable blast radius.</p>",
            },
            {
              question: "Can security groups reference each other across accounts in a shared VPC?",
              solution: "<p><strong>Yes</strong>, and it is one of the strongest reasons to choose VPC sharing. A participant can write a rule whose source is a security group <em>owned by another account</em> in the same shared VPC, identified by group ID and owner ID — so a database team allows traffic from an application team's security group rather than hard-coding CIDR ranges that drift and over-grant. Referencing is read-only: you cannot modify another account's group. Compare the alternatives: <strong>Transit Gateway</strong> cannot do cross-VPC security group references at all, and <strong>peering</strong> supports them only within the same region. This makes cross-team micro-segmentation practical in a way the other models do not.</p>",
            },
            {
              question: "What else can AWS RAM share, and how does that fit a landing zone?",
              solution: "<p>RAM is the general multi-account sharing primitive, not a VPC feature. Beyond subnets it shares <strong>Transit Gateways</strong> — so workload accounts create their own attachments while the networking account retains the route tables — plus <strong>Route 53 Resolver rules</strong>, <strong>prefix lists</strong>, <strong>License Manager configurations</strong>, <strong>Capacity Reservations</strong> and <strong>Aurora DB clusters</strong>, among others. A realistic landing zone uses several simultaneously: the TGW shared from a network account, resolver rules shared from shared services, and subnets shared from a per-environment network account. Framing RAM that way — as the mechanism by which a platform team offers self-service without surrendering control — is more convincing than describing subnet sharing in isolation.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-sharing.html",
            "https://docs.aws.amazon.com/ram/latest/userguide/what-is.html",
            "https://docs.aws.amazon.com/ram/latest/userguide/shareable.html",
            "https://docs.aws.amazon.com/whitepapers/latest/building-scalable-secure-multi-vpc-network-infrastructure/vpc-sharing.html",
          ],
        },
      ],
    },
  ],
};
