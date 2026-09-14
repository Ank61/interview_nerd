/**
 * AWS ELB (Elastic Load Balancing) interview-prep data.
 *
 * Standalone category (id 106) covering ALB, NLB and GWLB: listeners, rules,
 * target groups, health checks, TLS, WAF, authentication, blue-green releases,
 * stickiness and client IP preservation. Same shape as awsPrepareData.js.
 */
export const awsElb = {
  id: 106,
  category: "AWS ELB",
  themeBgColor: "#EDE9FE",
  textColor: "#5B21B6",
  topicColor: "#7C3AED",
  lightColor: "#F5F3FF",
  type: [
    {
      id: 1,
      label: "Beginner",
      concepts: [
        {
          topic: "ALB vs NLB vs GWLB",
          tags: ["aws", "elb", "alb", "nlb", "gwlb", "load balancing"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>Elastic Load Balancing (ELB)</strong> distributes incoming traffic across healthy targets (EC2 instances, containers, IP addresses, Lambda functions) in multiple Availability Zones. It is the entry point for most AWS web architectures, providing health checks, TLS termination and integration with Auto Scaling. The first interview question is almost always <strong>which load balancer type</strong> you would choose and why, so you need a crisp mental model of the three modern types.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Application Load Balancer (Layer 7)</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Understands <strong>HTTP, HTTPS, gRPC and WebSockets</strong>. Routes on host, path, HTTP header, HTTP method, query string and source IP.</li>
  <li>Targets can be instances, IP addresses (including on-premises over Direct Connect) or <strong>Lambda functions</strong>.</li>
  <li>Rich actions: forward (including weighted target groups), redirect, fixed response, and authentication via <strong>Cognito or any OIDC provider</strong>.</li>
  <li>Integrates with <strong>AWS WAF</strong>, supports sticky sessions, slow start, and terminates the client connection so the backend sees the ALB IP plus <code>X-Forwarded-For</code>.</li>
  <li>DNS name only; IPs change over time, so you point Route 53 at it with an <strong>alias record</strong>, never a hard-coded IP.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Network Load Balancer (Layer 4)</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Forwards <strong>TCP, UDP and TLS</strong> connections with ultra-low latency and millions of requests per second.</li>
  <li>Provides <strong>one static IP per AZ</strong> and lets you attach Elastic IPs, which is what customers need for firewall allowlists.</li>
  <li><strong>Preserves the client source IP</strong> at the TCP level by default for instance and IP targets.</li>
  <li>Required for <strong>AWS PrivateLink</strong> endpoint services, and can have an ALB as a target when you need static IPs in front of Layer 7 routing.</li>
  <li>Supports security groups (since 2023) and TLS termination with ACM certificates, or plain TCP for TLS passthrough.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Gateway Load Balancer (Layer 3)</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>A transparent <strong>bump in the wire</strong> for third-party firewalls, IDS/IPS and deep packet inspection appliances.</li>
  <li>Encapsulates traffic with the <strong>GENEVE</strong> protocol on port 6081 and delivers it to a fleet of appliances, with flow stickiness so a connection is inspected by one appliance.</li>
  <li>Consumed through <strong>Gateway Load Balancer Endpoints</strong> (PrivateLink) placed in the route tables of the VPCs you want inspected, so the appliance fleet can live in a central security VPC.</li>
</ul>
<p style="line-height: 1.75; margin-top: 1.5rem;">The <strong>Classic Load Balancer</strong> still exists for EC2-Classic-era workloads, but it lacks target groups, path routing and most modern features, so it should not be chosen for new designs.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; font-size: 0.9rem; border-radius: 4px;"><strong>🎯 Interview Answer:</strong> "I use an ALB for HTTP workloads because it routes on paths and hosts, terminates TLS with ACM, integrates with WAF and Cognito, and supports Lambda targets and weighted target groups. I use an NLB when I need static IPs, raw TCP/UDP, TLS passthrough, PrivateLink, or extreme throughput. A GWLB is for inserting third-party inspection appliances transparently. When I need both static IPs and Layer 7 routing, I put an NLB in front of an ALB."</div>
</div>`,
          examples: [
            `# Create an internet-facing ALB in two public subnets
aws elbv2 create-load-balancer --name app-alb --type application \\
  --scheme internet-facing --ip-address-type ipv4 \\
  --subnets subnet-pub-a subnet-pub-b --security-groups sg-alb

# Create an NLB with one Elastic IP per AZ (static IPs for customer allowlists)
aws elbv2 create-load-balancer --name edge-nlb --type network \\
  --scheme internet-facing \\
  --subnet-mappings SubnetId=subnet-pub-a,AllocationId=eipalloc-aaa \\
                    SubnetId=subnet-pub-b,AllocationId=eipalloc-bbb

# Create a Gateway Load Balancer for a firewall appliance fleet
aws elbv2 create-load-balancer --name inspection-gwlb --type gateway \\
  --subnets subnet-sec-a subnet-sec-b

aws elbv2 create-target-group --name fw-tg --protocol GENEVE --port 6081 \\
  --vpc-id vpc-security --target-type instance \\
  --health-check-protocol HTTP --health-check-port 80 --health-check-path /health`,
          ],
          questions: [
            {
              question: "When would you choose an ALB versus an NLB?",
              solution: "<p>Choose an <strong>ALB</strong> for HTTP/HTTPS, gRPC and WebSocket traffic when you need content-based routing (host, path, headers), TLS termination with ACM, WAF, OIDC/Cognito authentication, or Lambda targets. Choose an <strong>NLB</strong> when you need <strong>static or Elastic IPs</strong> (for customer allowlists), non-HTTP protocols such as TCP/UDP/TLS passthrough, ultra-low latency at very high throughput, client IP preservation at layer 4, or to expose a service through PrivateLink. An NLB can also front an ALB when you need both.</p>",
            },
            {
              question: "What problem does a Gateway Load Balancer solve that the other types do not?",
              solution: "<p>A <strong>GWLB</strong> operates at Layer 3 and lets you insert third-party security appliances (firewalls, IDS/IPS, packet brokers) <strong>transparently</strong> into the traffic path. It encapsulates packets with <strong>GENEVE</strong> and sends them to an autoscaled appliance fleet, then returns them unchanged, so applications and clients see no NAT and need no configuration. Traffic enters through <strong>Gateway Load Balancer Endpoints</strong> referenced from VPC route tables, which allows a centralised inspection VPC shared across many accounts. ALBs and NLBs terminate or proxy connections, so they cannot provide this kind of bump-in-the-wire behaviour.</p>",
            },
            {
              question: "Why can you not hard-code the IP address of an ALB, and what should you do instead?",
              solution: "<p>An ALB is a managed fleet of nodes that AWS scales and replaces, so its <strong>IP addresses change</strong> over time; only its DNS name is stable. Clients must resolve the DNS name, and in Route 53 you use an <strong>alias record</strong> pointing at the ALB so even the zone apex works. If a customer insists on fixed IPs for an allowlist, place an <strong>NLB with Elastic IPs</strong> in front of the ALB (ALB as an NLB target) or use AWS Global Accelerator, which provides two static anycast IPs.</p>",
            },
            {
              question: "What OSI layer does each load balancer operate at and why does that matter?",
              solution: "<p>The <strong>ALB is Layer 7</strong>: it terminates the HTTP connection, parses the request and can make decisions on URL, headers and cookies, but this costs some latency and hides the client IP behind <code>X-Forwarded-For</code>. The <strong>NLB is Layer 4</strong>: it forwards TCP/UDP flows without inspecting payloads, so it is faster, preserves the source IP and handles any protocol, but it cannot route on HTTP content. The <strong>GWLB is Layer 3</strong>: it forwards raw IP packets to appliances. The layer determines what the balancer can see, what it can route on and what it can change.</p>",
            },
            {
              question: "Can an ALB route traffic to on-premises servers or to a Lambda function?",
              solution: "<p>Yes to both. With <strong>IP target type</strong> an ALB or NLB can register any private IP reachable from the VPC, including on-premises servers over <strong>Direct Connect or Site-to-Site VPN</strong>, which is a common hybrid migration pattern. An ALB can also register a <strong>Lambda function</strong> as a target: the HTTP request is converted into a JSON event and the function's response is turned back into an HTTP response, so a single ALB can front containers and serverless code under one domain with path-based rules.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html",
            "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html",
            "https://docs.aws.amazon.com/elasticloadbalancing/latest/network/introduction.html",
          ],
        },
        {
          topic: "Listeners, Rules & Target Groups",
          tags: ["aws", "elb", "alb", "listener", "target group", "routing"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Every ELB configuration is built from three objects: a <strong>listener</strong> that accepts connections, a set of <strong>rules</strong> that decide where a request goes, and <strong>target groups</strong> that hold the actual backends. Understanding how they fit together is the difference between copying a tutorial and being able to design routing for a real multi-service application.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Listeners</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>A listener is a <strong>port and protocol</strong> the load balancer checks for connections, for example HTTPS:443 or TCP:5432.</li>
  <li>An HTTPS or TLS listener holds one or more <strong>ACM certificates</strong> and a <strong>security policy</strong> that fixes the TLS versions and cipher suites.</li>
  <li>Each listener has a <strong>default action</strong> that runs when no rule matches, typically forward to a target group or return a 404 fixed response.</li>
  <li>A common pair is an HTTP:80 listener whose only job is a <strong>301 redirect to HTTPS</strong>, plus the HTTPS:443 listener doing the real work.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Rules (ALB only)</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Rules are evaluated in <strong>priority order</strong> (lowest number first) and the first match wins, so more specific rules need lower numbers.</li>
  <li><strong>Conditions:</strong> host-header (<code>api.example.com</code>), path-pattern (<code>/api/*</code>), http-header, http-request-method, query-string and source-ip. Up to five conditions per rule are ANDed together; multiple values within a condition are ORed.</li>
  <li><strong>Actions:</strong> forward (to one target group or several with weights), redirect, fixed-response, authenticate-cognito and authenticate-oidc.</li>
  <li>NLB listeners have no rules: each listener forwards straight to one target group.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Target groups</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>A target group has a <strong>target type</strong>: <code>instance</code> (routes to the primary ENI, works with Auto Scaling groups), <code>ip</code> (any private IP in the VPC or peered network, required for ECS awsvpc tasks and Fargate), <code>lambda</code>, or <code>alb</code> (an ALB as an NLB target).</li>
  <li>It defines the <strong>protocol and port</strong> used to reach targets, which can differ from the listener port (listener 443, targets on 8080).</li>
  <li>It owns the <strong>health check</strong> settings and target group attributes such as deregistration delay, stickiness, slow start and the routing algorithm (<strong>round robin</strong>, <strong>least outstanding requests</strong>, or <strong>weighted random</strong> with automatic target weights).</li>
  <li>A target can belong to multiple target groups, and one target group can be referenced by several rules or listeners.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Typical microservice layout</h4>
<p style="line-height: 1.75;">One ALB, one HTTPS listener, and one target group per service. Rules send <code>/api/orders/*</code> to the orders group, <code>/api/users/*</code> to the users group, <code>admin.example.com</code> to the admin group, and the default action returns a fixed 404 JSON body. This keeps a single public entry point and a single certificate while each team deploys independently.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; font-size: 0.9rem; border-radius: 4px;"><strong>🎯 Interview Answer:</strong> "A listener is the port and protocol the load balancer accepts. On an ALB, prioritised rules match host, path, headers, method, query string or source IP and forward to a target group, redirect, return a fixed response or authenticate. A target group is a set of instances, IPs or Lambda functions with its own health check and routing algorithm. I usually run one ALB with one HTTPS listener and a target group per microservice, with an HTTP listener that only redirects to HTTPS."</div>
</div>`,
          examples: [
            `# Target group for ECS tasks on port 8080 (ip target type)
aws elbv2 create-target-group --name api-tg --protocol HTTP --port 8080 \\
  --vpc-id vpc-0abc --target-type ip \\
  --health-check-path /health --health-check-interval-seconds 15 \\
  --healthy-threshold-count 2 --unhealthy-threshold-count 3

# HTTPS listener with a fixed 404 default action
aws elbv2 create-listener --load-balancer-arn <alb-arn> \\
  --protocol HTTPS --port 443 \\
  --certificates CertificateArn=<acm-cert-arn> \\
  --ssl-policy ELBSecurityPolicy-TLS13-1-2-2021-06 \\
  --default-actions 'Type=fixed-response,FixedResponseConfig={StatusCode=404,ContentType=application/json,MessageBody="{\\"error\\":\\"not found\\"}"}'

# Rule: host + path conditions ANDed together, forward to api-tg
aws elbv2 create-rule --listener-arn <listener-arn> --priority 10 \\
  --conditions '[{"Field":"host-header","HostHeaderConfig":{"Values":["api.example.com"]}},
                 {"Field":"path-pattern","PathPatternConfig":{"Values":["/v1/*","/v2/*"]}}]' \\
  --actions Type=forward,TargetGroupArn=<api-tg-arn>

# Redirect HTTP -> HTTPS
aws elbv2 create-listener --load-balancer-arn <alb-arn> --protocol HTTP --port 80 \\
  --default-actions 'Type=redirect,RedirectConfig={Protocol=HTTPS,Port=443,StatusCode=HTTP_301}'`,
            `# Switch the routing algorithm and deregistration delay on a target group
aws elbv2 modify-target-group-attributes --target-group-arn <api-tg-arn> --attributes \\
  Key=load_balancing.algorithm.type,Value=least_outstanding_requests \\
  Key=deregistration_delay.timeout_seconds,Value=60 \\
  Key=slow_start.duration_seconds,Value=120`,
          ],
          questions: [
            {
              question: "How are ALB listener rules evaluated when several could match a request?",
              solution: "<p>Rules are evaluated in <strong>ascending priority order</strong> and the <strong>first rule whose conditions all match wins</strong>; the listener's default action runs only when no rule matches. Within one rule, different condition types are ANDed while multiple values in the same condition are ORed. Because of this, specific rules such as <code>/api/v2/admin/*</code> must have a lower priority number than broad ones like <code>/api/*</code>, otherwise the broad rule shadows them. Leaving gaps between priorities (10, 20, 30) makes later insertions easy.</p>",
            },
            {
              question: "What is the difference between the instance and ip target types?",
              solution: "<p>With the <strong>instance</strong> target type you register EC2 instance IDs and traffic is delivered to the <strong>primary private IP of the primary ENI</strong>; this is what Auto Scaling groups use. With the <strong>ip</strong> target type you register IP addresses directly, which is required for <strong>ECS tasks in awsvpc networking mode and Fargate</strong> (each task has its own ENI), for secondary ENIs, and for targets outside the VPC such as on-premises servers reached over Direct Connect or peering. The ip type also lets a single instance host several containers on different ports registered as separate targets.</p>",
            },
            {
              question: "Which routing algorithms does an ALB target group support and when would you change the default?",
              solution: "<p>The default is <strong>round robin</strong>, which is fine when requests are uniform. <strong>Least outstanding requests</strong> sends each new request to the target with the fewest in-flight requests, which is better when request durations vary widely or targets have different capacities, and it is the recommended choice for slow, heterogeneous APIs. <strong>Weighted random</strong> with <strong>automatic target weights</strong> lets the ALB detect anomalous targets returning errors and shift traffic away from them. Note that sticky sessions override any algorithm for clients that already have an affinity cookie.</p>",
            },
            {
              question: "Can one ALB serve multiple domains with different certificates?",
              solution: "<p>Yes. An HTTPS listener supports <strong>multiple ACM certificates with Server Name Indication (SNI)</strong>: the ALB picks the certificate matching the hostname the client requested. Combine this with <strong>host-header rules</strong> so <code>shop.example.com</code> and <code>api.example.com</code> forward to different target groups. Wildcard certificates (<code>*.example.com</code>) cover many subdomains with one cert. This lets a single ALB, a single set of security groups and a single WAF web ACL front many applications, reducing cost and operational surface.</p>",
            },
            {
              question: "What happens to in-flight requests when a target is deregistered?",
              solution: "<p>The target enters the <strong>draining</strong> state for the <strong>deregistration delay</strong> (default 300 seconds, 0 to 3600). The load balancer stops sending new requests immediately but keeps existing connections open until they complete or the delay elapses, then forcibly closes them. For short HTTP requests a 30 to 60 second delay speeds up deployments; for long-lived connections such as WebSockets you may need a longer window, and for NLB there is also a connection termination attribute for UDP and TCP flows. ECS waits for draining to finish before stopping the old task.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-listeners.html",
            "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-update-rules.html",
            "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-target-groups.html",
          ],
        },
        {
          topic: "Health Checks & Cross-Zone Balancing",
          tags: ["aws", "elb", "health check", "availability", "cross-zone"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Load balancers only add availability if they know which targets are working. <strong>Health checks</strong> are how a target group decides which targets receive traffic, and <strong>cross-zone load balancing</strong> decides how traffic is spread across Availability Zones. Both are small settings with a large blast radius when misconfigured.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Health check settings</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Protocol, port and path:</strong> for example HTTP on the traffic port to <code>/health</code>. The port can be a dedicated management port.</li>
  <li><strong>Interval</strong> (5 to 300 seconds) and <strong>timeout</strong>: how often a probe is sent and how long to wait for a reply.</li>
  <li><strong>Healthy threshold</strong> and <strong>unhealthy threshold</strong> (2 to 10 each): consecutive successes to become healthy, consecutive failures to become unhealthy. The two numbers can differ so a target is quick to be removed and slower to be trusted again.</li>
  <li><strong>Matcher / success codes:</strong> the ALB accepts a range such as <code>200-299</code>; for gRPC target groups it checks gRPC status codes.</li>
  <li>NLB health checks can be TCP (connection succeeds), HTTP or HTTPS.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Target states</h4>
<p style="line-height: 1.75;">Targets move through <code>initial</code> (being registered, health checks starting), <code>healthy</code>, <code>unhealthy</code> (with a reason such as <code>Target.ResponseCodeMismatch</code>, <code>Target.Timeout</code> or <code>Target.FailedHealthChecks</code>), <code>draining</code> (deregistering) and <code>unused</code>. <strong>Slow start</strong> on an ALB target group ramps traffic to a newly healthy target linearly over 30 to 900 seconds, protecting JIT-compiled or cache-warming services from a thundering herd.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Fail open</h4>
<p style="line-height: 1.75;">If <strong>every</strong> target in a target group is unhealthy, the load balancer routes requests to all of them anyway. The reasoning is that a health check that fails everywhere is more likely to be broken itself (a bad path, a dependency check that is too strict) than every server being down at once. Design health endpoints to report the health of <strong>this instance</strong>, not of every downstream dependency, or a database blip will take out your whole fleet.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Cross-zone load balancing</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Each load balancer node lives in one AZ. With cross-zone <strong>on</strong>, every node spreads requests evenly across <strong>all</strong> registered targets in every AZ. With cross-zone <strong>off</strong>, each node only sends traffic to targets in its own AZ.</li>
  <li><strong>ALB:</strong> on by default at the load balancer level and included in the price; it can be turned off per target group.</li>
  <li><strong>NLB and GWLB:</strong> off by default; enabling it can incur inter-AZ data transfer charges, and DNS answers still distribute clients across the NLB's AZ IPs.</li>
  <li>Turning it off keeps traffic zonal (lower latency, lower cost, and zonal fault isolation) but means an AZ with fewer healthy targets receives the same share of traffic and gets overloaded.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Auto Scaling integration</h4>
<p style="line-height: 1.75;">Set the Auto Scaling group health check type to <strong>ELB</strong> so instances that fail load balancer health checks are terminated and replaced, not just removed from rotation. Alarm on <code>UnHealthyHostCount</code>, <code>HTTPCode_Target_5XX_Count</code> and <code>TargetResponseTime</code> so you notice degradation before customers do.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; font-size: 0.9rem; border-radius: 4px;"><strong>🎯 Interview Answer:</strong> "Health checks in the target group decide which targets receive traffic: I set a cheap local /health endpoint, a short interval, a low unhealthy threshold so bad targets leave quickly, and slow start for JVM services. If every target fails the load balancer fails open, so my health endpoint reports the instance, not its dependencies. Cross-zone balancing is always on for ALB; for NLB I enable it unless I specifically want zonal isolation, and I let Auto Scaling replace instances that fail ELB health checks."</div>
</div>`,
          examples: [
            `# Tune health checks: fast removal, slower re-admission, accept 200-299
aws elbv2 modify-target-group --target-group-arn <tg-arn> \\
  --health-check-protocol HTTP --health-check-port traffic-port \\
  --health-check-path /health --health-check-interval-seconds 10 \\
  --health-check-timeout-seconds 5 \\
  --healthy-threshold-count 3 --unhealthy-threshold-count 2 \\
  --matcher HttpCode=200-299

# Inspect target health and the reason for any failures
aws elbv2 describe-target-health --target-group-arn <tg-arn> \\
  --query 'TargetHealthDescriptions[].{id:Target.Id,state:TargetHealth.State,reason:TargetHealth.Reason}'

# Enable cross-zone load balancing on an NLB
aws elbv2 modify-load-balancer-attributes --load-balancer-arn <nlb-arn> \\
  --attributes Key=load_balancing.cross_zone.enabled,Value=true

# Make the Auto Scaling group replace instances that fail ELB health checks
aws autoscaling update-auto-scaling-group --auto-scaling-group-name web-asg \\
  --health-check-type ELB --health-check-grace-period 120`,
            `// Express health endpoint: report THIS instance, not every dependency
const express = require("express");
const app = express();

let ready = false;
app.get("/health", (req, res) => {
  // Liveness: process is up and can serve. Do not call the database here.
  if (!ready) return res.status(503).json({ status: "starting" });
  res.status(200).json({ status: "ok" });
});

app.listen(8080, () => {
  // Warm caches, load config, then start accepting load balancer traffic
  ready = true;
});`,
          ],
          questions: [
            {
              question: "How do health checks work and what happens when all targets are unhealthy?",
              solution: "<p>The load balancer sends a request to the health check path at the configured interval; a target is marked healthy after N consecutive successes and unhealthy after M failures, and unhealthy targets stop receiving new requests. Auto Scaling can be configured to use ELB health checks so unhealthy instances are replaced. If <strong>all</strong> targets in a target group are unhealthy, the load balancer <strong>fails open</strong> and routes to all of them anyway, on the assumption that the health check may be wrong.</p>",
            },
            {
              question: "What should a good health check endpoint do, and what should it avoid?",
              solution: "<p>It should be <strong>cheap, fast and local</strong>: confirm the process is running, has finished start-up, and can serve requests, returning 200 within the timeout. It should <strong>avoid deep dependency checks</strong> such as querying the database or calling downstream APIs, because a shared dependency outage would then mark every target unhealthy at once, triggering fail-open or mass Auto Scaling replacement. Keep dependency health in a separate readiness or diagnostics endpoint and in CloudWatch alarms, and make the health route skip authentication so the load balancer probe is not rejected with 401.</p>",
            },
            {
              question: "What is cross-zone load balancing and how does it differ between ALB and NLB?",
              solution: "<p>Load balancer nodes exist in each enabled AZ. With <strong>cross-zone enabled</strong>, each node distributes requests across all healthy targets in every AZ, so an AZ with two targets and one with eight each get a fair per-target share. With it <strong>disabled</strong>, each node only sends to its own AZ's targets. For an <strong>ALB</strong> it is enabled by default at the load balancer level, free, and can be disabled per target group. For an <strong>NLB</strong> and GWLB it is disabled by default and may incur inter-AZ data transfer costs when enabled, so it is a deliberate trade-off between even distribution and zonal isolation.</p>",
            },
            {
              question: "Why would you enable slow start on a target group?",
              solution: "<p><strong>Slow start</strong> gives a newly healthy target a warm-up window (30 to 900 seconds) during which the ALB linearly increases its share of requests instead of immediately sending it a full round-robin share. This protects services that need time to reach steady-state performance, for example JVM applications waiting for JIT compilation, services filling in-memory caches, or connection pools that open lazily. Without it a fresh instance can be flooded, respond slowly, fail health checks and be pulled from rotation, which makes scale-out events worse rather than better.</p>",
            },
            {
              question: "A target is stuck in the unhealthy state with reason Target.Timeout. How would you troubleshoot?",
              solution: "<p><code>Target.Timeout</code> means the probe reached no response within the timeout, so start with <strong>network reachability</strong>: the target's security group must allow the health check port from the load balancer's security group (ALB) or from the VPC CIDR / NLB private IPs, and the subnet NACLs must allow the traffic and ephemeral return ports. Next confirm the <strong>application is listening on the health check port</strong> and that the path responds quickly (curl it from another instance in the same VPC). Finally compare the timeout with the application's real response time and check for start-up work blocking the server, increasing the health check grace period if the ASG is terminating instances too early.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html",
            "https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html",
            "https://docs.aws.amazon.com/elasticloadbalancing/latest/network/target-group-health-checks.html",
          ],
        },
      ],
    },
    {
      id: 2,
      label: "Advance",
      concepts: [
        {
          topic: "TLS Termination, WAF & Authentication",
          tags: ["aws", "elb", "tls", "acm", "waf", "oidc"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  A load balancer is the natural place to enforce security for everything behind it. On an ALB you can terminate TLS with free <strong>ACM</strong> certificates, filter malicious traffic with <strong>AWS WAF</strong>, and even <strong>authenticate users</strong> before a request reaches your code. Doing this once at the edge of your VPC is simpler and safer than re-implementing it in every service.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">TLS termination</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>An HTTPS listener holds one default certificate plus additional certificates selected by <strong>SNI</strong>. ACM issues and <strong>renews them automatically</strong> as long as DNS validation records stay in place.</li>
  <li>The <strong>security policy</strong> (for example <code>ELBSecurityPolicy-TLS13-1-2-2021-06</code>) sets minimum protocol versions and cipher suites. Choosing a TLS 1.2+ policy is a common compliance requirement.</li>
  <li><strong>End-to-end encryption:</strong> create the target group with protocol HTTPS so the ALB re-encrypts to the backend. The ALB does not validate the backend certificate, so self-signed certificates work.</li>
  <li><strong>Mutual TLS (mTLS):</strong> an ALB can verify client certificates against a trust store, or pass them through in headers for the application to validate, which is useful for B2B and IoT APIs.</li>
  <li>On an <strong>NLB</strong>, a TLS listener terminates TLS with ACM and forwards TCP; a TCP listener passes TLS through untouched so the backend holds the private key.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">AWS WAF</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>A <strong>regional web ACL</strong> is associated with the ALB and evaluates every HTTP request before rules run.</li>
  <li><strong>Managed rule groups</strong> cover OWASP Top 10 style attacks (Core rule set, SQL injection, known bad inputs, IP reputation, Bot Control).</li>
  <li><strong>Rate-based rules</strong> block or challenge IPs that exceed a request count in a 5 minute window, a cheap defence against credential stuffing and scrapers.</li>
  <li>Custom rules can match headers, body, geo location and URI, and can return custom responses or add labels for later rules.</li>
  <li>WAF logs go to CloudWatch Logs, S3 or Kinesis Firehose; start rules in <strong>count</strong> mode before switching to block.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Built-in authentication</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>The <code>authenticate-cognito</code> and <code>authenticate-oidc</code> rule actions perform the <strong>OpenID Connect authorization code flow</strong> for you: unauthenticated users are redirected to the identity provider, and the ALB stores a session cookie (<code>AWSELBAuthSessionCookie</code>).</li>
  <li>After authentication the ALB forwards the request with <code>x-amzn-oidc-identity</code>, <code>x-amzn-oidc-accesstoken</code> and <code>x-amzn-oidc-data</code> (a JWT with user claims).</li>
  <li>The backend must <strong>verify the JWT signature</strong> using the ALB's regional public key endpoint and must be reachable only from the ALB; otherwise an attacker could forge those headers by calling the service directly.</li>
  <li>Works with Cognito user pools or any OIDC provider such as Okta, Auth0 or Google, ideal for internal dashboards and admin tools that should not implement their own login.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; font-size: 0.9rem; border-radius: 4px;"><strong>🎯 Interview Answer:</strong> "I terminate TLS at the ALB with ACM certificates and a TLS 1.2+ security policy, re-encrypt to the targets when compliance requires it, and attach a WAF web ACL with managed OWASP rules and a rate-based rule. For internal tools I use the ALB's OIDC authentication action so users log in through our identity provider before the request reaches the app, and the app verifies the x-amzn-oidc-data JWT and only accepts traffic from the ALB's security group."</div>
</div>`,
          examples: [
            `# Add a second certificate for SNI and tighten the TLS policy
aws elbv2 add-listener-certificates --listener-arn <listener-arn> \\
  --certificates CertificateArn=<acm-cert-arn-for-api-example-com>

aws elbv2 modify-listener --listener-arn <listener-arn> \\
  --ssl-policy ELBSecurityPolicy-TLS13-1-2-Res-2021-06

# Associate a regional WAF web ACL with the ALB
aws wafv2 associate-web-acl --web-acl-arn <web-acl-arn> --resource-arn <alb-arn>

# Require OIDC login for the /admin/* path, then forward
aws elbv2 create-rule --listener-arn <listener-arn> --priority 5 \\
  --conditions Field=path-pattern,Values='/admin/*' \\
  --actions '[
    {"Type":"authenticate-oidc","Order":1,"AuthenticateOidcConfig":{
      "Issuer":"https://login.example.com",
      "AuthorizationEndpoint":"https://login.example.com/authorize",
      "TokenEndpoint":"https://login.example.com/oauth/token",
      "UserInfoEndpoint":"https://login.example.com/userinfo",
      "ClientId":"abc123","ClientSecret":"<secret>",
      "SessionTimeout":3600,"Scope":"openid email",
      "OnUnauthenticatedRequest":"authenticate"}},
    {"Type":"forward","Order":2,"TargetGroupArn":"<admin-tg-arn>"}
  ]'`,
            `// Verify the ALB-issued x-amzn-oidc-data JWT in Node.js
const jwt = require("jsonwebtoken");
const https = require("https");

function fetchKey(kid, region) {
  return new Promise((resolve, reject) => {
    const url = "https://public-keys.auth.elb." + region + ".amazonaws.com/" + kid;
    https.get(url, (res) => {
      let pem = "";
      res.on("data", (d) => (pem += d));
      res.on("end", () => resolve(pem));
    }).on("error", reject);
  });
}

async function userFromAlbHeader(req) {
  const token = req.headers["x-amzn-oidc-data"];
  if (!token) throw new Error("missing ALB auth header");
  const header = JSON.parse(Buffer.from(token.split(".")[0], "base64").toString());
  const pem = await fetchKey(header.kid, process.env.AWS_REGION);
  return jwt.verify(token, pem, { algorithms: ["ES256"] }); // claims: sub, email, ...
}`,
          ],
          questions: [
            {
              question: "How does TLS termination at the ALB work, and how do you keep traffic encrypted to the backend?",
              solution: "<p>The HTTPS listener holds an <strong>ACM certificate</strong> and decrypts client traffic using the configured <strong>security policy</strong>; the ALB then opens its own connection to the target. By default that backend hop is plain HTTP inside the VPC. For <strong>end-to-end encryption</strong> you create the target group with protocol HTTPS so the ALB re-encrypts; it does not validate the target certificate, so a self-signed or internal CA certificate on the instance is sufficient. ACM renews public certificates automatically, so you never manage key rotation on the load balancer.</p>",
            },
            {
              question: "What does AWS WAF add on top of security groups when protecting an ALB?",
              solution: "<p>Security groups only filter by <strong>IP, port and protocol</strong>, so any client on the internet reaching port 443 is allowed through. <strong>WAF</strong> inspects the <strong>HTTP request itself</strong>: URI, headers, body, cookies and geo location. It can block SQL injection and XSS patterns with managed rule groups, throttle abusive IPs with rate-based rules, filter bots, block or allow specific countries, and return custom responses, all with logging. It is a Layer 7 control complementing the Layer 3/4 controls of security groups and network ACLs.</p>",
            },
            {
              question: "How does ALB authentication with OIDC or Cognito work, and what must the application still do?",
              solution: "<p>An <code>authenticate-oidc</code> or <code>authenticate-cognito</code> action makes the ALB run the <strong>OIDC authorization code flow</strong>: it redirects unauthenticated users to the IdP, exchanges the code for tokens, and sets an encrypted session cookie. Requests are forwarded with <code>x-amzn-oidc-identity</code>, <code>x-amzn-oidc-accesstoken</code> and <code>x-amzn-oidc-data</code>, a JWT signed by the ALB. The app must <strong>verify that JWT signature</strong> against the ALB regional public key endpoint and still perform <strong>authorization</strong> (what the user may do). It should also accept traffic only from the ALB, since anyone able to reach it directly could forge these headers.</p>",
            },
            {
              question: "When would you use TLS passthrough on an NLB instead of terminating TLS?",
              solution: "<p>Use a <strong>TCP listener</strong> so the NLB forwards encrypted bytes untouched when the backend must hold the private key, for example for <strong>mutual TLS with client certificates handled by the application</strong>, for compliance rules forbidding decryption in transit, or for protocols where the load balancer cannot terminate (custom TLS over TCP, some database drivers). The trade-off is losing the free ACM lifecycle management and centralised cipher policy, and the load balancer cannot inspect or route on anything in the encrypted stream. A TLS listener on the NLB, by contrast, terminates with ACM and forwards TCP.</p>",
            },
            {
              question: "How would you roll out a new WAF rule without breaking legitimate users?",
              solution: "<p>Deploy the rule in <strong>count mode</strong> first so WAF records matches without blocking, and enable WAF logging to CloudWatch Logs or S3. Review the matched requests, tune with <strong>scope-down statements</strong> or rule exclusions for known false positives such as rich-text editors triggering XSS rules, then switch the rule to <strong>block</strong>. Keep a CloudWatch alarm on <code>BlockedRequests</code> and a documented way to flip back to count quickly, and prefer rate-based rules with a CAPTCHA or challenge action where legitimate bursts are possible.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html",
            "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-authenticate-users.html",
            "https://docs.aws.amazon.com/waf/latest/developerguide/how-aws-waf-works.html",
          ],
        },
        {
          topic: "Blue-Green & Weighted Target Groups",
          tags: ["aws", "elb", "blue-green", "canary", "deployment", "codedeploy"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  A load balancer is the traffic switch that makes <strong>zero-downtime deployments</strong> possible. Instead of updating servers in place, you run the new version alongside the old one and move traffic between them. ALB <strong>weighted target groups</strong> give you fine-grained control over that move, and services such as ECS and CodeDeploy automate the whole dance.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Deployment strategies</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Rolling:</strong> replace targets in one target group a few at a time. Simple, but two versions serve traffic together and rollback means redeploying.</li>
  <li><strong>Blue-green:</strong> the current version (blue) and the new version (green) each have their own target group. Traffic is switched at the listener; rollback is switching back.</li>
  <li><strong>Canary:</strong> a blue-green variant where only a small percentage (1 to 10 percent) goes to green first, then increases after metrics look healthy.</li>
  <li><strong>Linear:</strong> traffic shifts in equal steps at fixed intervals, for example 10 percent every 5 minutes.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Weighted target groups</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>An ALB <strong>forward action</strong> can reference up to <strong>five target groups</strong>, each with a weight from 0 to 999. Traffic splits proportionally to the weights.</li>
  <li><strong>Target group stickiness</strong> in the forward config keeps a given client on the same target group for a duration, so a user does not bounce between versions mid-session.</li>
  <li>Weights are changed with a single <code>modify-listener</code> or <code>modify-rule</code> call, which takes effect within seconds and does not disturb open connections.</li>
  <li>Weighted routing works for Lambda target groups too, enabling serverless canaries behind an ALB.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Managed automation</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>ECS rolling updates</strong> use <code>minimumHealthyPercent</code> and <code>maximumPercent</code> and only drain old tasks once new ones pass ALB health checks.</li>
  <li><strong>CodeDeploy blue-green for ECS</strong> requires two target groups and a production listener plus an optional <strong>test listener</strong> (for example port 8443) to smoke-test green before any production traffic reaches it. Predefined configs such as <code>Canary10Percent5Minutes</code> shift traffic, and CloudWatch alarms trigger automatic rollback.</li>
  <li><strong>CodeDeploy for EC2 / Auto Scaling</strong> can copy the ASG, deploy to the new instances, then re-register them with the target group.</li>
  <li>Route 53 weighted records offer a coarser, DNS-level alternative when the two versions sit behind different load balancers or regions.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Making it safe</h4>
<p style="line-height: 1.75;">Wait for green health checks before shifting traffic, watch <code>HTTPCode_Target_5XX_Count</code> and <code>TargetResponseTime</code> <strong>per target group</strong> (the metrics carry a TargetGroup dimension), keep a sensible <strong>deregistration delay</strong> so in-flight requests finish, and make database migrations backwards compatible so blue can still run if you roll back. Keep blue running until you are confident, since rollback is only instant while it exists.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; font-size: 0.9rem; border-radius: 4px;"><strong>🎯 Interview Answer:</strong> "I deploy the new version into a second target group, wait for its health checks, then use ALB weighted forwarding to send 10 percent, then 50, then 100 percent of traffic to it while watching per-target-group 5XX and latency metrics. Rollback is setting the weight back to zero. With ECS I let CodeDeploy do this with a test listener and alarm-based automatic rollback, and I keep schema changes backwards compatible so rolling back the code is always safe."</div>
</div>`,
          examples: [
            `# Canary: send 10% of traffic to the green target group, keep users sticky to one version
aws elbv2 modify-listener --listener-arn <listener-arn> --default-actions '[{
  "Type": "forward",
  "ForwardConfig": {
    "TargetGroups": [
      {"TargetGroupArn": "<blue-tg-arn>", "Weight": 90},
      {"TargetGroupArn": "<green-tg-arn>", "Weight": 10}
    ],
    "TargetGroupStickinessConfig": {"Enabled": true, "DurationSeconds": 600}
  }
}]'

# Promote: 100% green. Rollback is the same call with the weights swapped.
aws elbv2 modify-listener --listener-arn <listener-arn> --default-actions '[{
  "Type": "forward",
  "ForwardConfig": {"TargetGroups": [
    {"TargetGroupArn": "<blue-tg-arn>", "Weight": 0},
    {"TargetGroupArn": "<green-tg-arn>", "Weight": 100}
  ]}
}]'

# Watch errors per target group while shifting
aws cloudwatch get-metric-statistics --namespace AWS/ApplicationELB \\
  --metric-name HTTPCode_Target_5XX_Count --statistic Sum --period 60 \\
  --dimensions Name=LoadBalancer,Value=app/app-alb/abc123 Name=TargetGroup,Value=targetgroup/green-tg/def456 \\
  --start-time $(date -u -v-15M +%Y-%m-%dT%H:%M:%SZ) --end-time $(date -u +%Y-%m-%dT%H:%M:%SZ)`,
            `# CodeDeploy ECS blue/green: two target groups, prod + test listeners
aws deploy create-deployment-group --application-name checkout \\
  --deployment-group-name checkout-prod \\
  --service-role-arn arn:aws:iam::123456789012:role/CodeDeployECSRole \\
  --deployment-config-name CodeDeployDefault.ECSCanary10Percent5Minutes \\
  --ecs-services clusterName=prod,serviceName=checkout \\
  --auto-rollback-configuration enabled=true,events=DEPLOYMENT_FAILURE,DEPLOYMENT_STOP_ON_ALARM \\
  --alarm-configuration enabled=true,alarms=[{name=checkout-green-5xx}] \\
  --blue-green-deployment-configuration '{
    "terminateBlueInstancesOnDeploymentSuccess":{"action":"TERMINATE","terminationWaitTimeInMinutes":30},
    "deploymentReadyOption":{"actionOnTimeout":"CONTINUE_DEPLOYMENT"}}' \\
  --load-balancer-info '{"targetGroupPairInfoList":[{
    "targetGroups":[{"name":"checkout-blue"},{"name":"checkout-green"}],
    "prodTrafficRoute":{"listenerArns":["<prod-listener-arn>"]},
    "testTrafficRoute":{"listenerArns":["<test-listener-arn>"]}}]}'`,
          ],
          questions: [
            {
              question: "How would you do a zero-downtime deployment behind an ALB?",
              solution: "<p>Use <strong>blue/green with two target groups</strong>: deploy the new version to the green group, wait for its health checks to pass, then shift traffic with weighted forwarding (canary 10%, 50%, 100%) or swap the listener rule. Configure <strong>connection draining (deregistration delay)</strong> so in-flight requests finish before old targets are removed, and roll back by re-pointing to blue. ECS and CodeDeploy automate exactly this pattern.</p>",
            },
            {
              question: "What is the difference between a canary and a rolling deployment, and when is each appropriate?",
              solution: "<p>A <strong>rolling deployment</strong> replaces targets inside a single target group in batches, so capacity is preserved but the mix of versions is dictated by how many instances have been updated, and rollback means deploying again. A <strong>canary</strong> keeps two full sets of targets and uses weights to expose a small, controlled percentage of users to the new version while comparing error rates and latency, then promotes or rolls back instantly. Rolling is cheaper (no double capacity) and fine for low-risk internal services; canary is preferred for customer-facing or high-risk changes where fast, precise rollback matters more than cost.</p>",
            },
            {
              question: "Why does CodeDeploy for ECS blue-green ask for a test listener?",
              solution: "<p>The <strong>test listener</strong> (for example HTTPS on port 8443, restricted by security group to internal IPs) is attached to the green target group before any production traffic moves. Your pipeline can run smoke tests and synthetic checks against it in the real production environment, hitting real dependencies, and only after those pass does CodeDeploy start shifting the <strong>production listener</strong> to green. It is optional, but it turns the deployment into a two-stage gate: validate green in isolation, then expose it to users gradually with alarm-based rollback.</p>",
            },
            {
              question: "How do you make rollback safe when the new version includes a database schema change?",
              solution: "<p>Keep migrations <strong>backwards compatible</strong> using the expand and contract pattern: first add new columns or tables that the old code ignores, deploy the new code that writes to both old and new shapes, and only remove the old columns in a later release after blue has been retired. Never rename or drop in the same deployment as the code that stops using the field. This ensures that flipping the listener weights back to blue restores a working system, because blue still finds the schema it expects. Also keep blue's target group running (do not terminate) until the green version has been stable through a full traffic cycle.</p>",
            },
            {
              question: "How can you observe the health of the green version specifically during a canary?",
              solution: "<p>ALB CloudWatch metrics carry both a <strong>LoadBalancer</strong> and a <strong>TargetGroup</strong> dimension, so you can chart <code>HTTPCode_Target_5XX_Count</code>, <code>TargetResponseTime</code> (use p95 or p99), <code>RequestCount</code> and <code>UnHealthyHostCount</code> for the green target group alone and compare them with blue receiving the remaining traffic at the same time. Enable <strong>ALB access logs</strong> to S3 and query them with Athena for per-target-group status codes if you need request-level detail. Wire those green metrics into CloudWatch alarms that CodeDeploy or your pipeline uses to <strong>automatically roll back</strong>.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-update-rules.html#modify-rule-actions",
            "https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-steps-ecs.html",
            "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-bluegreen.html",
          ],
        },
        {
          topic: "Sticky Sessions & Client IP Preservation",
          tags: ["aws", "elb", "sticky sessions", "x-forwarded-for", "proxy protocol"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Two behaviours of a load balancer surprise developers the first time: requests from one user may land on different servers, and the server sees the load balancer's address instead of the user's. <strong>Sticky sessions</strong> address the first, and <strong>client IP preservation</strong> addresses the second. Interviewers use these to check whether you understand what a proxy actually does to a connection.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Sticky sessions on an ALB</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Duration-based stickiness:</strong> the ALB issues an <code>AWSALB</code> cookie that pins the client to a target for a configurable duration (1 second to 7 days). The cookie is regenerated on each request, sliding the expiry.</li>
  <li><strong>Application-based stickiness:</strong> your app sets its own cookie (for example <code>JSESSIONID</code>); the ALB mirrors it in an <code>AWSALBAPP</code> cookie and honours the app's session lifetime.</li>
  <li>Stickiness is a <strong>target group attribute</strong>, so different services behind one ALB can have different behaviour. Weighted forwarding also has separate <strong>target group stickiness</strong>.</li>
  <li>If the pinned target becomes unhealthy the ALB picks a new one and the user loses their in-memory session.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Stickiness on an NLB</h4>
<p style="line-height: 1.75;">An NLB has no cookies. Enabling stickiness on its target group routes by <strong>source IP</strong>, and by default it uses a flow hash (protocol, source IP and port, destination IP and port, TCP sequence) so a single TCP connection always stays on the same target anyway.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Why stateless beats sticky</h4>
<p style="line-height: 1.75;">Stickiness undermines even distribution (a few heavy users can pile on one target), complicates scale-in and deployments (draining a target logs people out), and loses sessions on failure. The better design is <strong>stateless targets</strong> with session state in <strong>ElastiCache (Redis)</strong> or <strong>DynamoDB</strong>, or in a signed <strong>JWT</strong>. Use stickiness only as a bridge for legacy apps or for WebSocket-style long connections that cannot be shared.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Client IP with an ALB</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>The ALB terminates the TCP connection, so the backend socket shows the ALB's private IP. The real client is in <code>X-Forwarded-For</code>, with <code>X-Forwarded-Proto</code> and <code>X-Forwarded-Port</code> describing the original scheme and port.</li>
  <li><code>X-Forwarded-For</code> is a comma-separated list; a client can send a fake value that the ALB then appends to. Trust only the <strong>right-most address added by the ALB</strong> (or by CloudFront when it is in front) and configure the ALB's <code>xff_header_processing.mode</code> (append, preserve or remove) deliberately.</li>
  <li>Frameworks need to be told to trust the proxy (for example Express <code>app.set("trust proxy", 1)</code>) so rate limiting, geo logic and audit logs use the correct address.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Client IP with an NLB</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Client IP preservation</strong> is on by default for instance and IP targets, so the backend sees the true source address at the TCP level and must allow it in its security group (or allow the NLB security group).</li>
  <li>When preservation is disabled (or for targets outside the VPC, such as through PrivateLink), enable <strong>Proxy Protocol v2</strong>: the NLB prepends a binary header with the original source and destination to each connection, and the backend (NGINX, HAProxy, Envoy) must be configured to parse it.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; font-size: 0.9rem; border-radius: 4px;"><strong>🎯 Interview Answer:</strong> "Sticky sessions pin a client to one target with an ALB cookie, which helps legacy apps with in-memory sessions but hurts distribution, deployments and failover, so I prefer stateless services with sessions in Redis or a JWT. Because the ALB terminates the connection, I read the client IP from X-Forwarded-For and trust only the value the ALB appended; an NLB preserves the source IP natively or via Proxy Protocol v2 when it cannot."</div>
</div>`,
          examples: [
            `# Application-based stickiness that follows the app's own session cookie
aws elbv2 modify-target-group-attributes --target-group-arn <tg-arn> --attributes \\
  Key=stickiness.enabled,Value=true \\
  Key=stickiness.type,Value=app_cookie \\
  Key=stickiness.app_cookie.cookie_name,Value=JSESSIONID \\
  Key=stickiness.app_cookie.duration_seconds,Value=86400

# Control how the ALB handles a client-supplied X-Forwarded-For header
aws elbv2 modify-load-balancer-attributes --load-balancer-arn <alb-arn> \\
  --attributes Key=routing.http.xff_header_processing.mode,Value=append

# NLB: keep the client IP at layer 4 and turn on Proxy Protocol v2
aws elbv2 modify-target-group-attributes --target-group-arn <nlb-tg-arn> --attributes \\
  Key=preserve_client_ip.enabled,Value=true \\
  Key=proxy_protocol_v2.enabled,Value=true`,
            `// Express behind an ALB: trust exactly one proxy hop, then rate limit per real client IP
const express = require("express");
const rateLimit = require("express-rate-limit");

const app = express();
// 1 = trust the last hop (the ALB). req.ip becomes the right-most XFF address it appended.
app.set("trust proxy", 1);

app.use(rateLimit({ windowMs: 60_000, max: 100, keyGenerator: (req) => req.ip }));

app.get("/whoami", (req, res) => {
  res.json({
    clientIp: req.ip,
    scheme: req.headers["x-forwarded-proto"],
    xff: req.headers["x-forwarded-for"],
  });
});

app.listen(8080);`,
          ],
          questions: [
            {
              question: "How does the ALB preserve the original client IP, and why does it matter?",
              solution: "<p>Because the ALB terminates the connection, the backend sees the ALB's private IP as the source. The ALB adds the <code>X-Forwarded-For</code> header with the client IP, plus <code>X-Forwarded-Proto</code> and <code>X-Forwarded-Port</code>. Applications must read these for rate limiting, geo logic and audit logs, and must trust only the last hop to avoid spoofing. An NLB, by contrast, preserves the source IP at the TCP level by default for instance and IP targets.</p>",
            },
            {
              question: "What are sticky sessions and why should you avoid depending on them?",
              solution: "<p>Sticky sessions (session affinity) make the ALB send a given client to the same target using a load-balancer or application cookie. They help legacy apps that keep session state in memory, but they undermine even load distribution, complicate scale-in and deployments, and lose sessions when a target dies. The better design is <strong>stateless targets</strong> with session data in ElastiCache, DynamoDB or a signed JWT.</p>",
            },
            {
              question: "What is the difference between duration-based and application-based stickiness on an ALB?",
              solution: "<p>With <strong>duration-based</strong> stickiness the ALB generates and manages its own <code>AWSALB</code> cookie with a fixed lifetime you configure, and the application knows nothing about it. With <strong>application-based</strong> stickiness the application issues its own session cookie (you tell the ALB its name, such as <code>JSESSIONID</code>) and the ALB pairs it with an <code>AWSALBAPP</code> cookie, so affinity lasts exactly as long as the app's session and ends when the app logs the user out. Application-based mode aligns load balancer and app session lifecycles and lets the app control expiry, while duration-based mode needs no code changes.</p>",
            },
            {
              question: "Why is blindly trusting X-Forwarded-For dangerous and how do you handle it correctly?",
              solution: "<p>Any client can send its own <code>X-Forwarded-For</code> header with a fabricated address, and by default the ALB <strong>appends</strong> the real client IP to whatever it received, producing a list like <code>fake-ip, real-ip</code>. Code that takes the first entry can be tricked into bypassing IP allowlists or rate limits. Take the <strong>right-most address added by the trusted proxy</strong>, configure the framework to trust exactly the number of hops you have (one for ALB alone, two with CloudFront in front), or set the ALB attribute <code>routing.http.xff_header_processing.mode</code> to <code>remove</code> or <code>preserve</code> as appropriate. For the strongest guarantee, use the NLB's true source IP or Proxy Protocol.</p>",
            },
            {
              question: "What is Proxy Protocol v2 and when do you need it with an NLB?",
              solution: "<p><strong>Proxy Protocol v2</strong> is a small binary header the NLB prepends to each TCP connection containing the original source and destination IPs and ports, plus optional TLVs such as the VPC endpoint ID for PrivateLink. You need it when <strong>client IP preservation is not available or disabled</strong>: targets reached through PrivateLink from another VPC, targets outside the VPC, or IP targets where preservation was turned off to avoid loopback issues when a target also calls the NLB. The backend must be configured to parse it (NGINX <code>proxy_protocol</code>, HAProxy <code>accept-proxy</code>), otherwise it sees garbage bytes at the start of every connection.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/sticky-sessions.html",
            "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/x-forwarded-headers.html",
            "https://docs.aws.amazon.com/elasticloadbalancing/latest/network/edit-target-group-attributes.html",
          ],
        },
      ],
    },
  ],
};
