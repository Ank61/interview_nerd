/** AWS Route 53 — managed DNS, routing policies and health checks */
export const awsRoute53 = {
  id: 108,
  category: "AWS Route 53",
  themeBgColor: "#D1FAE5",
  textColor: "#065F46",
  topicColor: "#059669",
  lightColor: "#ECFDF5",
  type: [
    {
      id: 1,
      label: "Beginner",
      concepts: [
        {
          topic: "DNS Basics & Hosted Zones",
          tags: ["aws", "route 53", "dns", "hosted zones", "records"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>Amazon Route 53</strong> is a highly available, scalable DNS service with a 100% availability SLA. It does three jobs: <strong>domain registration</strong>, <strong>DNS hosting</strong> through public and private hosted zones, and <strong>health-checked traffic routing</strong>. The name comes from TCP/UDP port 53, the DNS port.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">How a DNS lookup works</h4>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li>The client asks its <strong>recursive resolver</strong> (ISP, corporate, or the VPC resolver) for <code>api.example.com</code>.</li>
  <li>The resolver walks from the <strong>root servers</strong> to the <strong>.com TLD servers</strong> to the <strong>authoritative name servers</strong> for <code>example.com</code>, which Route 53 provides (four per hosted zone, on separate top-level domains for resilience).</li>
  <li>Route 53 answers with the record, plus a <strong>TTL</strong> telling the resolver how long to cache it.</li>
</ol>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Hosted zones</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Public hosted zone:</strong> Answers queries from the internet for a domain. Created with NS and SOA records; you point the registrar at the four NS values.</li>
  <li><strong>Private hosted zone:</strong> Answers only inside the VPCs you associate with it, for internal names like <code>db.prod.internal</code>. Requires the VPC's DNS resolution and hostnames attributes.</li>
  <li>The same name can exist in both, giving <strong>split-horizon DNS</strong>: internal clients get a private IP, external clients get the public one.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Record types you must know</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>A / AAAA:</strong> Name to IPv4 / IPv6 address.</li>
  <li><strong>CNAME:</strong> Name to another name. Not allowed at the zone apex and cannot coexist with other records for the same name.</li>
  <li><strong>MX:</strong> Mail servers with priorities. <strong>TXT:</strong> Verification and SPF/DKIM/DMARC. <strong>NS / SOA:</strong> Delegation and zone metadata. <strong>SRV, CAA, PTR</strong> for services, certificate authorities and reverse lookups.</li>
  <li><strong>Alias:</strong> A Route 53 extension covered in the next topic; the answer to most "how do I point my apex domain at an ALB" questions.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">TTL</h4>
<p style="line-height: 1.75;">The TTL is a trade-off: long TTLs (hours) reduce query volume and cost but make changes slow to propagate; short TTLs (30 to 60 seconds) let failover and migrations take effect quickly at the price of more queries. Lower the TTL well before a planned change so caches expire in time.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Route 53 is authoritative DNS plus registration and routing. A public hosted zone answers the internet, a private hosted zone answers only inside associated VPCs, and I can use both for split-horizon. I know the core record types and that a CNAME cannot sit at the apex, and I manage TTLs deliberately, lowering them ahead of migrations so changes propagate quickly."</div>
</div>`,
          examples: [
            `# Create a public hosted zone and see the four name servers to give the registrar
aws route53 create-hosted-zone --name example.com --caller-reference $(date +%s)
aws route53 get-hosted-zone --id Z123EXAMPLE --query 'DelegationSet.NameServers'

# Private hosted zone for internal service names
aws route53 create-hosted-zone --name prod.internal --caller-reference $(date +%s) \\
  --vpc VPCRegion=us-east-1,VPCId=vpc-0abc --hosted-zone-config PrivateZone=true

# Add an A record and a CNAME with a short TTL
aws route53 change-resource-record-sets --hosted-zone-id Z123EXAMPLE --change-batch '{
  "Changes": [
    {"Action":"UPSERT","ResourceRecordSet":{"Name":"db.prod.internal","Type":"A","TTL":60,"ResourceRecords":[{"Value":"10.0.100.15"}]}},
    {"Action":"UPSERT","ResourceRecordSet":{"Name":"www.example.com","Type":"CNAME","TTL":300,"ResourceRecords":[{"Value":"example.com"}]}}
  ]
}'

# Debug what resolvers actually see
dig +short api.example.com
dig @8.8.8.8 example.com NS
dig +trace api.example.com | tail -5`,
          ],
          questions: [
            {
              question: "What is the difference between a public and a private hosted zone?",
              solution: "<p>A <strong>public hosted zone</strong> is authoritative for a domain on the internet; anyone can query its records once the registrar delegates to Route 53's name servers. A <strong>private hosted zone</strong> answers only for queries originating inside the <strong>VPCs associated with it</strong> (across accounts if you authorise them) and is invisible to the internet. Private zones are used for internal service discovery and for split-horizon DNS where a name resolves differently inside and outside.</p>",
            },
            {
              question: "Why can you not put a CNAME at the zone apex, and what do you use instead?",
              solution: "<p>The DNS standard forbids a CNAME from coexisting with any other record for the same name, and the zone apex (<code>example.com</code>) must have <strong>NS and SOA records</strong>, so a CNAME there is invalid. Route 53's answer is the <strong>Alias record</strong>: an A or AAAA record whose value is an AWS resource (ALB, CloudFront, S3 website, API Gateway) or another record in the zone, resolved by Route 53 at query time and returned as plain IP addresses.</p>",
            },
            {
              question: "Why do low TTLs matter for failover, and what is the trade-off?",
              solution: "<p>Resolvers and clients cache DNS answers for the <strong>TTL</strong>. If a record has a 24-hour TTL, a failover change may not be seen for a day. Setting 30 to 60 seconds means clients re-query quickly after a health check flips the answer. The trade-off is more queries (slightly higher Route 53 cost and resolver load) and a small latency cost on cache misses. Some clients ignore TTLs entirely, which is one reason Global Accelerator or client-side retries are used for critical paths.</p>",
            },
            {
              question: "How do you migrate a domain's DNS to Route 53 without downtime?",
              solution: "<p>Export the existing zone and recreate every record in a new Route 53 hosted zone, then compare answers from Route 53's name servers with the current provider using <code>dig @ns-xxx.awsdns-xx.com</code>. Lower the TTLs at the old provider ahead of time. Finally update the <strong>NS records at the registrar</strong> to Route 53's four name servers; both providers serve identical answers during the delegation TTL, so no query fails. Keep the old zone running for a couple of days before deleting it.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html",
            "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-working-with.html",
            "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/ResourceRecordTypes.html",
          ],
        },
        {
          topic: "Alias Records vs CNAME",
          tags: ["aws", "route 53", "alias", "cname", "alb", "cloudfront"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Pointing a domain at an AWS resource is the everyday Route 53 task, and the <strong>Alias record</strong> is the tool built for it. Interviewers use the Alias versus CNAME comparison to check that you understand both DNS rules and AWS-specific behaviour.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">CNAME recap</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Standard DNS: maps a name to another name (<code>www.example.com</code> to <code>my-alb-123.us-east-1.elb.amazonaws.com</code>). The resolver then performs a second lookup.</li>
  <li>Cannot be used at the <strong>zone apex</strong> and cannot coexist with other records of the same name.</li>
  <li>Every query is billed and adds an extra resolution hop.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Alias records</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>A Route 53 extension: an A or AAAA record whose target is an <strong>AWS resource</strong>: ALB/NLB, CloudFront distribution, S3 static website endpoint, API Gateway, Elastic Beanstalk, Global Accelerator, VPC interface endpoint, or another record in the same hosted zone.</li>
  <li><strong>Works at the apex</strong> (<code>example.com</code>), because Route 53 resolves the target internally and returns plain IP addresses to the client.</li>
  <li>Automatically tracks the target's <strong>changing IP addresses</strong>; load balancer and CloudFront IPs change constantly.</li>
  <li><strong>Free</strong> for queries to AWS resources.</li>
  <li><code>EvaluateTargetHealth</code> can make Route 53 stop returning the alias when the target (for example an ALB with no healthy targets) is unhealthy, without a separate health check.</li>
  <li>The TTL is inherited from the target (60 seconds for ALBs), you cannot set it.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Side by side</h4>
<pre><code class="language-text">                    CNAME                       Alias
Target              Any DNS name                AWS resources or same-zone records
Zone apex           Not allowed                 Allowed
Cost per query      Billed                      Free (AWS targets)
Health awareness    None                        EvaluateTargetHealth
TTL                 You choose                  Inherited from target
Returned to client  A name (extra lookup)       IP addresses directly</code></pre>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Common patterns</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><code>example.com</code> and <code>www.example.com</code> as Alias A and AAAA records to a CloudFront distribution (both IPv4 and IPv6).</li>
  <li><code>api.example.com</code> Alias to an ALB, with an ACM certificate on the ALB for that name.</li>
  <li>Alias to another record in the zone to keep many subdomains pointing at one canonical record.</li>
  <li>Apex redirect: an S3 website bucket with a redirect rule fronted by CloudFront, aliased from the apex, when the app must live on <code>www</code>.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "A CNAME points a name at another name, cannot live at the apex and costs a query plus an extra lookup. An Alias is Route 53's own record type that points at an AWS resource such as an ALB or CloudFront, works at the apex, follows the resource's changing IPs, is free to query and can evaluate the target's health. I use Alias records for every AWS target and reserve CNAMEs for names outside AWS."</div>
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

# Look up the canonical hosted zone ID an alias target needs
aws elbv2 describe-load-balancers --names app-alb --query 'LoadBalancers[0].CanonicalHostedZoneId'

# Alias A + AAAA to a CloudFront distribution (CloudFront always uses zone Z2FDTNDATAQYW2)
for type in A AAAA; do
aws route53 change-resource-record-sets --hosted-zone-id Z123EXAMPLE --change-batch "{
  \\"Changes\\": [{\\"Action\\":\\"UPSERT\\",\\"ResourceRecordSet\\":{\\"Name\\":\\"www.example.com\\",\\"Type\\":\\"$type\\",
    \\"AliasTarget\\":{\\"HostedZoneId\\":\\"Z2FDTNDATAQYW2\\",\\"DNSName\\":\\"d111111abcdef8.cloudfront.net\\",\\"EvaluateTargetHealth\\":false}}}]
}"
done`,
          ],
          questions: [
            {
              question: "What is the difference between a CNAME and an Alias record in Route 53?",
              solution: "<p>A <strong>CNAME</strong> is a standard DNS record that maps a name to another name; it cannot exist at the zone apex (<code>example.com</code>) and each lookup is billed. An <strong>Alias</strong> is a Route 53-specific pointer to an AWS resource (ALB, CloudFront, S3 website, API Gateway, another record in the same zone). It works at the apex, returns the target's current IPs directly as A/AAAA answers, can evaluate target health, and alias queries to AWS resources are free.</p>",
            },
            {
              question: "Why should you not create an A record with a load balancer's current IP addresses?",
              solution: "<p>ALB and NLB (without static IPs) node addresses <strong>change</strong> as AWS scales and replaces the load balancer nodes, so a hardcoded A record will eventually point at addresses that no longer belong to your load balancer. An <strong>Alias record</strong> resolves the load balancer's DNS name at query time and always returns the current set. If you truly need static IPs for a customer allowlist, use an NLB with Elastic IPs or Global Accelerator.</p>",
            },
            {
              question: "What does EvaluateTargetHealth do on an Alias record?",
              solution: "<p>When set to true, Route 53 checks the <strong>health of the alias target itself</strong> before answering: for an ALB it considers the load balancer healthy only if at least one target in each enabled AZ is healthy, and for another Route 53 record it uses that record's health check. If the target is unhealthy, Route 53 omits the record from answers, which lets failover or weighted records fall back to alternatives <strong>without creating a separate health check</strong>. It does not work for CloudFront or S3 website targets.</p>",
            },
            {
              question: "How do you serve a site on both example.com and www.example.com from CloudFront?",
              solution: "<p>Add both names as <strong>alternate domain names (CNAMEs)</strong> on the CloudFront distribution with an ACM certificate in us-east-1 covering both, then in Route 53 create <strong>Alias A and AAAA records</strong> for <code>example.com</code> and <code>www.example.com</code> targeting the distribution. If you want one canonical hostname for SEO, have a CloudFront Function or the origin redirect one to the other with a 301.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resource-record-sets-choosing-alias-non-alias.html",
            "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-elb-load-balancer.html",
            "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-cloudfront-distribution.html",
          ],
        },
        {
          topic: "Routing Policies",
          tags: ["aws", "route 53", "routing policies", "weighted", "latency", "geolocation"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Where a plain DNS server returns the same answer to everyone, Route 53 can vary the answer based on <strong>weights, latency, geography, health, or the resolver's IP</strong>. These <strong>routing policies</strong> turn DNS into a global traffic manager and are a favourite interview topic because each policy maps to a real architecture problem.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The policies</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Simple:</strong> One record, one or more values returned in random order. No health checks.</li>
  <li><strong>Weighted:</strong> Several records for the same name, each with a weight 0 to 255; traffic splits proportionally. Use for canary releases, gradual migrations, or A/B testing. A weight of 0 drains a target.</li>
  <li><strong>Latency-based:</strong> One record per region; Route 53 returns the region with the <strong>lowest measured latency</strong> from the resolver's location. The standard choice for active-active multi-region.</li>
  <li><strong>Failover:</strong> A PRIMARY and a SECONDARY record; the secondary is returned only when the primary's health check fails. Active-passive DR.</li>
  <li><strong>Geolocation:</strong> Route by the user's <strong>continent, country or US state</strong>. Use for data residency, localisation, or licensing. Always add a default record for unmatched locations.</li>
  <li><strong>Geoproximity:</strong> Route by geographic <strong>distance</strong> to resources, with a <strong>bias</strong> to expand or shrink a region's catchment. Requires traffic flow.</li>
  <li><strong>Multivalue answer:</strong> Up to eight healthy records returned per query; lightweight client-side load balancing with health checks (unlike simple).</li>
  <li><strong>IP-based:</strong> Route by the resolver's <strong>CIDR block</strong>, for example send a specific ISP or corporate network to a dedicated endpoint.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Combining policies</h4>
<p style="line-height: 1.75;"><strong>Traffic Flow</strong> lets you build a decision tree: geolocation first (EU users stay in EU regions for compliance), then latency inside each group, then failover to a static S3 page if everything is down. Alias records pointing to other records in the zone let you compose these without Traffic Flow too.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Choosing quickly</h4>
<pre><code class="language-text">Canary / migration            -> Weighted
Multi-region active-active    -> Latency (or Geoproximity with bias)
Active-passive DR             -> Failover
Compliance / localisation     -> Geolocation
Simple HA for a few IPs       -> Multivalue answer
Specific networks             -> IP-based</code></pre>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Caveats</h4>
<p style="line-height: 1.75;">DNS-based routing is only as good as client TTL behaviour; some clients cache far longer than told. Latency measurements are per resolver location, so users behind a distant public resolver may be misrouted unless EDNS Client Subnet is honoured. For instant failover and static anycast IPs, <strong>AWS Global Accelerator</strong> sits in front of the regional endpoints and removes DNS propagation from the equation.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Route 53 routing policies decide which answer a client gets. I use weighted records for canaries and migrations, latency-based for active-active multi-region, failover for active-passive DR, geolocation when data must stay in a jurisdiction, and multivalue for simple health-checked round robin. I combine them with health checks and low TTLs, and when I need instant failover I add Global Accelerator so I am not waiting on DNS caches."</div>
</div>`,
          examples: [
            `# Weighted canary: 90% to the current stack, 10% to the new one
aws route53 change-resource-record-sets --hosted-zone-id Z123EXAMPLE --change-batch '{
  "Changes": [
    {"Action":"UPSERT","ResourceRecordSet":{"Name":"api.example.com","Type":"A","SetIdentifier":"blue","Weight":90,
      "AliasTarget":{"HostedZoneId":"Z35SXDOTRQ7X7K","DNSName":"blue-alb-1.us-east-1.elb.amazonaws.com","EvaluateTargetHealth":true}}},
    {"Action":"UPSERT","ResourceRecordSet":{"Name":"api.example.com","Type":"A","SetIdentifier":"green","Weight":10,
      "AliasTarget":{"HostedZoneId":"Z35SXDOTRQ7X7K","DNSName":"green-alb-1.us-east-1.elb.amazonaws.com","EvaluateTargetHealth":true}}}
  ]
}'

# Latency-based routing across two regions
aws route53 change-resource-record-sets --hosted-zone-id Z123EXAMPLE --change-batch '{
  "Changes": [
    {"Action":"UPSERT","ResourceRecordSet":{"Name":"app.example.com","Type":"A","SetIdentifier":"use1","Region":"us-east-1",
      "AliasTarget":{"HostedZoneId":"Z35SXDOTRQ7X7K","DNSName":"app-use1.us-east-1.elb.amazonaws.com","EvaluateTargetHealth":true}}},
    {"Action":"UPSERT","ResourceRecordSet":{"Name":"app.example.com","Type":"A","SetIdentifier":"euw1","Region":"eu-west-1",
      "AliasTarget":{"HostedZoneId":"Z32O12XQLNTSW2","DNSName":"app-euw1.eu-west-1.elb.amazonaws.com","EvaluateTargetHealth":true}}}
  ]
}'

# Geolocation: EU users to Frankfurt, everyone else to the default
aws route53 change-resource-record-sets --hosted-zone-id Z123EXAMPLE --change-batch '{
  "Changes": [
    {"Action":"UPSERT","ResourceRecordSet":{"Name":"portal.example.com","Type":"CNAME","TTL":60,"SetIdentifier":"eu","GeoLocation":{"ContinentCode":"EU"},"ResourceRecords":[{"Value":"portal-euc1.example.com"}]}},
    {"Action":"UPSERT","ResourceRecordSet":{"Name":"portal.example.com","Type":"CNAME","TTL":60,"SetIdentifier":"default","GeoLocation":{"CountryCode":"*"},"ResourceRecords":[{"Value":"portal-use1.example.com"}]}}
  ]
}'`,
          ],
          questions: [
            {
              question: "How would you design DNS for an active-active multi-region application?",
              solution: "<p>Use <strong>latency-based routing</strong> (or geoproximity) with one record per region pointing at each region's ALB or CloudFront, each with a <strong>health check</strong> so an unhealthy region is removed from answers automatically. Keep TTLs low (30 to 60 seconds). For a simpler, faster failover with static anycast IPs, put <strong>AWS Global Accelerator</strong> in front instead of relying on DNS propagation. Ensure data replication (Aurora Global Database, DynamoDB global tables) supports writes in both regions.</p>",
            },
            {
              question: "What is the difference between geolocation and geoproximity routing?",
              solution: "<p><strong>Geolocation</strong> routes on the <strong>political boundary</strong> of the resolver's location (continent, country, US state) and is deterministic, which suits compliance and localisation. <strong>Geoproximity</strong> routes on <strong>physical distance</strong> between the user and your resources (AWS regions or latitude/longitude for on-premises), and a <strong>bias</strong> value lets you expand or shrink a resource's catchment area to shift load. Geoproximity requires Traffic Flow; geolocation does not.</p>",
            },
            {
              question: "How do you migrate traffic from an old platform to a new one with minimal risk using Route 53?",
              solution: "<p>Create <strong>weighted records</strong> for the same name: the old endpoint at weight 95 and the new at 5, both with health checks or EvaluateTargetHealth. Watch error rates and latency on the new stack, then step the weights (25/75, 50/50, 100/0) over hours or days. Because TTLs govern how fast clients see each step, lower them to 60 seconds beforehand. Rolling back is setting the new weight to 0, which drains it without deleting anything.</p>",
            },
            {
              question: "What is multivalue answer routing and how does it differ from simple routing?",
              solution: "<p>Both return multiple IP addresses for one name so clients pick one, giving crude load distribution. The difference is that <strong>multivalue answer</strong> records each have their own <strong>health check</strong>, and Route 53 returns only up to eight <strong>healthy</strong> values per query, whereas <strong>simple</strong> routing cannot use health checks and will happily return a dead server's address. Multivalue is a cheap availability improvement for services without a load balancer; it is not a replacement for an ELB.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html",
            "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/traffic-flow.html",
          ],
        },
      ],
    },
    {
      id: 2,
      label: "Advance",
      concepts: [
        {
          topic: "Health Checks & DNS Failover",
          tags: ["aws", "route 53", "health checks", "failover", "disaster recovery"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Routing policies become an availability tool only when combined with <strong>health checks</strong>: Route 53 stops returning records whose health check fails, so traffic flows to what is still working. Understanding what health checks can observe, how they decide, and where DNS failover falls short is what separates a working DR design from a hopeful one.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Three kinds of health check</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Endpoint:</strong> Health checkers in many AWS regions probe an IP or hostname over HTTP, HTTPS or TCP every 30 seconds (10 with fast interval), optionally requiring a 2xx/3xx and a <strong>string match</strong> in the first 5,120 bytes. The endpoint is healthy when more than 18% of checkers report success, so a single region's network issue does not cause a false failover.</li>
  <li><strong>Calculated:</strong> Aggregates up to 256 child health checks with AND, OR or "at least N healthy", letting you say "the region is healthy if two of three services are".</li>
  <li><strong>CloudWatch alarm:</strong> Healthy while an alarm is in OK state. This lets you fail over on <strong>internal signals</strong> an external probe cannot see: replication lag, queue depth, or a private endpoint's metrics. Private resources must use this type because health checkers live on the public internet.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Failure detection timing</h4>
<p style="line-height: 1.75;">Detection is interval times failure threshold (30 s x 3 = 90 s by default), then the client cache must expire (TTL), so realistic DNS failover is <strong>2 to 3 minutes</strong>. Fast interval and a 30-second TTL bring it under a minute. Invert a health check to build "if primary is healthy, secondary is unhealthy" logic.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Failover patterns</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Active-passive:</strong> Failover routing with PRIMARY health-checked and SECONDARY pointing at a warm standby region or a static S3 maintenance page (which needs no health check).</li>
  <li><strong>Active-active:</strong> Latency or weighted records each with a health check; failure removes one answer and the rest absorb traffic.</li>
  <li><strong>Nested:</strong> Alias records with EvaluateTargetHealth pointing at per-region failover or weighted records, forming a tree.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Where DNS failover is not enough</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Clients that ignore TTLs (some Java runtimes, mobile SDKs, corporate resolvers) keep hitting the dead endpoint.</li>
  <li>The health check tests the path from AWS checkers, not from your users.</li>
  <li>Data has to be in the other region already; DNS moves requests, not databases.</li>
  <li><strong>Global Accelerator</strong> provides two static anycast IPs and shifts traffic between regional endpoints in seconds at the network layer, independent of DNS caching, and <strong>Route 53 Application Recovery Controller</strong> adds routing controls and readiness checks for audited, manual or automated failover with no dependency on the failed region.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Route 53 health checks are global probes, aggregations of other checks, or CloudWatch alarms; the alarm type is how I fail over on internal signals or for private endpoints. Records tied to a failing check are dropped from answers, so failover records give me active-passive DR and health-checked latency records give me active-active. I set fast intervals and short TTLs to get under a minute, and when clients may ignore TTLs I front the regions with Global Accelerator."</div>
</div>`,
          examples: [
            `# Active-passive failover: primary in us-east-1 with a fast health check, secondary is a static S3 site
aws route53 create-health-check --caller-reference primary-$(date +%s) --health-check-config \\
  'Type=HTTPS,FullyQualifiedDomainName=api-use1.example.com,ResourcePath=/health,RequestInterval=10,FailureThreshold=3,SearchString=ok,MeasureLatency=true'

aws route53 change-resource-record-sets --hosted-zone-id Z123EXAMPLE --change-batch '{
  "Changes": [
    {"Action":"UPSERT","ResourceRecordSet":{"Name":"api.example.com","Type":"A","SetIdentifier":"primary","Failover":"PRIMARY","HealthCheckId":"<hc-id>",
      "AliasTarget":{"HostedZoneId":"Z35SXDOTRQ7X7K","DNSName":"api-use1-alb.us-east-1.elb.amazonaws.com","EvaluateTargetHealth":true}}},
    {"Action":"UPSERT","ResourceRecordSet":{"Name":"api.example.com","Type":"A","SetIdentifier":"secondary","Failover":"SECONDARY",
      "AliasTarget":{"HostedZoneId":"Z3AQBSTGFYJSTF","DNSName":"s3-website-us-east-1.amazonaws.com","EvaluateTargetHealth":false}}}
  ]
}'

# Health check driven by an internal CloudWatch alarm (for private endpoints or replication lag)
aws route53 create-health-check --caller-reference lag-$(date +%s) --health-check-config \\
  'Type=CLOUDWATCH_METRIC,AlarmIdentifier={Region=us-east-1,Name=aurora-replica-lag-high},InsufficientDataHealthStatus=LastKnownStatus'

# Region healthy only if at least 2 of 3 service checks pass
aws route53 create-health-check --caller-reference region-$(date +%s) --health-check-config \\
  'Type=CALCULATED,ChildHealthChecks=[<hc-api>,<hc-web>,<hc-auth>],HealthThreshold=2'

# Notify on-call when the primary flips
aws cloudwatch put-metric-alarm --alarm-name route53-primary-unhealthy --namespace AWS/Route53 \\
  --metric-name HealthCheckStatus --dimensions Name=HealthCheckId,Value=<hc-id> --region us-east-1 \\
  --statistic Minimum --period 60 --evaluation-periods 1 --threshold 1 --comparison-operator LessThanThreshold \\
  --alarm-actions arn:aws:sns:us-east-1:123456789012:oncall`,
          ],
          questions: [
            {
              question: "How do Route 53 health checks work and what can they monitor?",
              solution: "<p>Route 53 runs health checkers from multiple global locations that probe an endpoint every 10 or 30 seconds over HTTP, HTTPS or TCP, optionally requiring a specific string in the first 5 KB of the response; the endpoint is healthy when more than 18% of checkers agree. Health checks can also be <strong>calculated</strong> (aggregating child checks) or based on a <strong>CloudWatch alarm</strong>, which lets you fail over on internal metrics such as database replication lag that an external probe cannot see. Records associated with an unhealthy check are excluded from DNS answers.</p>",
            },
            {
              question: "How do you health-check a private endpoint that Route 53 checkers cannot reach?",
              solution: "<p>Route 53 health checkers operate from the public internet and cannot reach private IPs. Instead, publish a metric that reflects the endpoint's health, for example a CloudWatch alarm on the internal ALB's <code>HealthyHostCount</code> or a Lambda canary that probes the private endpoint and emits a custom metric, and create a Route 53 health check of type <strong>CloudWatch alarm</strong> bound to it. Choose <code>InsufficientDataHealthStatus</code> deliberately (usually LastKnownStatus) so missing data does not trigger a false failover.</p>",
            },
            {
              question: "How long does DNS failover actually take, and how do you make it faster?",
              solution: "<p>Detection takes interval multiplied by failure threshold (default 30 s x 3 = 90 s), then clients must wait for cached answers to expire (the TTL), so 2 to 3 minutes is typical. Use the <strong>fast interval</strong> (10 s) with a threshold of 2 or 3, set the record <strong>TTL to 30 to 60 seconds</strong>, and enable EvaluateTargetHealth on aliases so ALB-level failures are seen immediately. If you need seconds rather than a minute, or your clients ignore TTLs, use <strong>Global Accelerator</strong> in front of the regional endpoints.</p>",
            },
            {
              question: "Why is Global Accelerator sometimes preferred over Route 53 failover?",
              solution: "<p>Global Accelerator gives your application <strong>two static anycast IP addresses</strong> announced from AWS edge locations; clients connect to the nearest edge and AWS routes over its backbone to the healthiest, closest regional endpoint. Failover happens at the <strong>network layer within seconds</strong> and is invisible to DNS caches, so clients that ignore TTLs still follow it. It also improves latency for TCP and UDP traffic and simplifies customer allowlisting. Route 53 remains necessary to point the domain at the accelerator, but it no longer carries the failover logic.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover.html",
            "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-types.html",
            "https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html",
          ],
        },
        {
          topic: "Route 53 Resolver & Hybrid DNS",
          tags: ["aws", "route 53", "resolver", "hybrid", "dns firewall"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Route 53 is not only authoritative DNS for your domains; it is also the <strong>recursive resolver</strong> every VPC uses, and the bridge between AWS and on-premises DNS. Hybrid DNS is where many migrations stall, so knowing the Resolver components is valuable.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The VPC resolver</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Every VPC has the <strong>Route 53 Resolver</strong> (the AmazonProvidedDNS) at the VPC base address plus two, for example <code>10.0.0.2</code>, and at <code>169.254.169.253</code>.</li>
  <li>It answers <strong>private hosted zones</strong> associated with the VPC, EC2 internal hostnames, VPC endpoint private DNS, and recurses to the internet for everything else.</li>
  <li>It is not reachable from outside the VPC, which is exactly the problem hybrid setups must solve.</li>
  <li>Limit: 1,024 packets per second per ENI; heavy DNS clients should cache locally.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Resolver endpoints</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Inbound endpoint:</strong> ENIs with private IPs in your VPC that <strong>on-premises DNS servers forward to</strong>, so the data centre can resolve private hosted zones and AWS internal names (for example <code>db.prod.internal</code> or an RDS endpoint) over VPN or Direct Connect.</li>
  <li><strong>Outbound endpoint plus forwarding rules:</strong> ENIs from which the Resolver <strong>forwards queries for specific domains</strong> (such as <code>corp.example.com</code>) to your on-premises DNS servers. Rules can be shared across accounts with Resource Access Manager and associated with many VPCs.</li>
  <li>Deploy both across two AZs for resilience; each endpoint ENI handles about 10,000 queries per second.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Multi-account DNS</h4>
<p style="line-height: 1.75;">Private hosted zones can be <strong>associated with VPCs in other accounts</strong> (authorise, then associate). A common design is a central networking account that owns the hosted zones, Resolver endpoints and rules, sharing them via RAM so every workload VPC gets consistent name resolution.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Route 53 Resolver DNS Firewall</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Filters outbound DNS queries from VPCs against <strong>domain lists</strong>: AWS-managed lists of malware and botnet domains, plus your own allow and deny lists.</li>
  <li>Actions: allow, block (NXDOMAIN, NODATA or override to a sinkhole), or alert. Stops data exfiltration over DNS and command-and-control callbacks.</li>
  <li><strong>Resolver query logging</strong> records every query to CloudWatch Logs, S3 or Kinesis for forensics and to find which workload asked for a suspicious domain.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">DNSSEC and domain protection</h4>
<p style="line-height: 1.75;">Route 53 supports <strong>DNSSEC signing</strong> for hosted zones with KMS-managed keys and DNSSEC validation in the Resolver. Enable <strong>domain transfer lock</strong> and registrar MFA to protect against hijacking, and use <strong>CAA records</strong> to restrict which certificate authorities may issue for your domain.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Every VPC resolves through the Route 53 Resolver at its base address plus two. For hybrid DNS I create an inbound endpoint so the data centre can resolve AWS private names, and an outbound endpoint with forwarding rules so AWS can resolve corporate domains, both spread across two AZs and shared to other accounts with RAM. DNS Firewall and query logging give me visibility and blocking for malicious domains, and I sign zones with DNSSEC and lock the registrar."</div>
</div>`,
          examples: [
            `# Inbound endpoint: on-prem DNS forwards *.prod.internal and AWS names to these IPs
aws route53resolver create-resolver-endpoint --name inbound --direction INBOUND \\
  --creator-request-id in-$(date +%s) --security-group-ids sg-dns \\
  --ip-addresses SubnetId=subnet-private-a SubnetId=subnet-private-b

# Outbound endpoint + rule: AWS forwards corp.example.com to on-prem DNS servers
aws route53resolver create-resolver-endpoint --name outbound --direction OUTBOUND \\
  --creator-request-id out-$(date +%s) --security-group-ids sg-dns \\
  --ip-addresses SubnetId=subnet-private-a SubnetId=subnet-private-b

aws route53resolver create-resolver-rule --name corp --rule-type FORWARD --domain-name corp.example.com \\
  --creator-request-id rule-$(date +%s) --resolver-endpoint-id rslvr-out-0123 \\
  --target-ips Ip=10.200.0.53,Port=53 Ip=10.200.1.53,Port=53
aws route53resolver associate-resolver-rule --resolver-rule-id rslvr-rr-0456 --vpc-id vpc-0abc

# Share a private hosted zone with a VPC in another account
aws route53 create-vpc-association-authorization --hosted-zone-id Z123PRIVATE --vpc VPCRegion=us-east-1,VPCId=vpc-other
aws route53 associate-vpc-with-hosted-zone --hosted-zone-id Z123PRIVATE --vpc VPCRegion=us-east-1,VPCId=vpc-other   # run in the other account

# DNS Firewall: block AWS-managed malware domains and log every query
aws route53resolver create-firewall-rule-group --name baseline --creator-request-id fw-$(date +%s)
aws route53resolver create-firewall-rule --firewall-rule-group-id rslvr-frg-0123 --creator-request-id r1-$(date +%s) \\
  --firewall-domain-list-id <aws-managed-malware-list-id> --priority 100 --action BLOCK --block-response NXDOMAIN --name block-malware
aws route53resolver associate-firewall-rule-group --firewall-rule-group-id rslvr-frg-0123 --vpc-id vpc-0abc --priority 101 --name baseline-prod
aws route53resolver create-resolver-query-log-config --name vpc-dns-logs --destination-arn arn:aws:logs:us-east-1:123456789012:log-group:/dns/queries`,
          ],
          questions: [
            {
              question: "How do on-premises servers resolve private AWS hostnames, and how do AWS workloads resolve corporate names?",
              solution: "<p>Create a Route 53 Resolver <strong>inbound endpoint</strong> in the VPC; its ENI IPs are reachable over VPN or Direct Connect, and the on-premises DNS servers add a conditional forwarder for AWS domains (private hosted zones, <code>amazonaws.com</code>) pointing at them. For the reverse, create an <strong>outbound endpoint</strong> and <strong>forwarding rules</strong> for the corporate domains targeting the on-premises DNS servers, then associate the rules with each VPC. Both endpoints should span two AZs.</p>",
            },
            {
              question: "What is a private hosted zone and when would you use one?",
              solution: "<p>A private hosted zone holds DNS records that resolve <strong>only within the VPCs you associate</strong> with it, and it is invisible to the public internet. Use it for internal service discovery (<code>orders.internal</code>, <code>db.prod.internal</code>), for split-horizon DNS where the same name resolves to a private IP internally and a public one externally, and for hybrid setups where on-premises resolvers forward to Route 53 via inbound Resolver endpoints.</p>",
            },
            {
              question: "How would you centralise DNS across many AWS accounts?",
              solution: "<p>Put the hosted zones, Resolver endpoints and forwarding rules in a <strong>central networking account</strong>. Share the <strong>Resolver rules</strong> with the organisation through <strong>Resource Access Manager</strong> so each account can associate them with its VPCs, and share private hosted zones by <strong>authorising and associating</strong> each workload VPC. Combined with a Transit Gateway for connectivity, every VPC then resolves internal, cross-account and on-premises names consistently without per-account duplication.</p>",
            },
            {
              question: "What does Route 53 Resolver DNS Firewall protect against?",
              solution: "<p>It inspects <strong>outbound DNS queries</strong> from your VPCs and blocks or alerts on domains matching <strong>AWS-managed threat lists</strong> (malware, botnet command-and-control) or your own deny lists, and can enforce an <strong>allow-list-only</strong> posture for sensitive VPCs. This stops compromised workloads from resolving attacker infrastructure and from <strong>exfiltrating data through DNS</strong> tunnelling. Paired with Resolver query logging, it also tells you which ENI made the suspicious query.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver.html",
            "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-forwarding-outbound-queries.html",
            "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-dns-firewall.html",
          ],
        },
      ],
    },
  ],
};
