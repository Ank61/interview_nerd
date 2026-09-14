/**
 * AWS ECS (covers ECS, EKS and Fargate)
 *
 * Interview-prep concepts for running containers on AWS, split into Beginner
 * and Advance levels. Expanded from the "ECS, EKS & Fargate" concept in
 * data/awsPrepareData.js.
 */
export const awsEcs = {
  id: 112,
  category: "AWS ECS",
  themeBgColor: "#FFE4E6",
  textColor: "#9F1239",
  topicColor: "#E11D48",
  lightColor: "#FFF1F2",
  type: [
    {
      id: 1,
      label: "Beginner",
      concepts: [
        {
          topic: "ECS vs EKS vs Fargate",
          tags: ["aws", "containers", "ecs", "eks", "fargate", "kubernetes"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  AWS gives you three ways to run containers, and interviewers want to hear that you know they answer different questions. <strong>ECS</strong> and <strong>EKS</strong> are <strong>orchestrators</strong> (what to run, how many, how to route to them). <strong>Fargate</strong> is a <strong>serverless compute engine</strong> (where the containers physically run) that works with either orchestrator, as an alternative to managing EC2 nodes yourself. You always choose an orchestrator <em>and</em> a capacity model.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">ECS (Elastic Container Service)</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>AWS-native orchestrator with no control plane to pay for or manage. The API is small: clusters, task definitions, tasks and services.</li>
  <li>Deep integration with IAM (a role per task), ALB and NLB target groups, CloudWatch Logs, Secrets Manager, CodeDeploy blue/green and Service Connect for service-to-service networking.</li>
  <li>Best when the team wants the simplest path to production on AWS and has no requirement for Kubernetes portability.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">EKS (Elastic Kubernetes Service)</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Managed, upstream-conformant <strong>Kubernetes</strong> control plane (about $0.10 per hour per cluster, more for extended version support). AWS runs etcd and the API servers across three AZs; you run the workers.</li>
  <li>You bring the Kubernetes ecosystem: Helm, ArgoCD, Istio, Prometheus, operators and CRDs. Nodes come from managed node groups, <strong>Karpenter</strong>, self-managed groups or <strong>Fargate profiles</strong>; <strong>EKS Auto Mode</strong> manages nodes, networking and storage add-ons for you.</li>
  <li>Choose EKS for multi-cloud or hybrid portability, an existing Kubernetes skill base, or workloads that depend on Kubernetes-native tooling.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Fargate</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>You specify vCPU and memory per task or pod; AWS provisions, patches and isolates the host. Each task runs in its own micro-VM (Firecracker), so there is no shared kernel between tenants or tasks.</li>
  <li>Pay per vCPU-second and GB-second with a one-minute minimum. <strong>Fargate Spot</strong> is up to 70% cheaper for interruptible work; Graviton (ARM64) is about 20% cheaper than x86.</li>
  <li>Trade-offs: no GPUs, no privileged containers or DaemonSets, capped task sizes, slower cold start than a warm EC2 node, and a per-unit premium over EC2.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Decision guide</h4>
<pre><code class="language-text">Need Kubernetes APIs / portability / CRDs / operators?   -> EKS
Just want to run containers on AWS simply?               -> ECS
Want no servers to manage?                               -> Fargate (with ECS or EKS)
GPU, huge steady fleet, special kernels, DaemonSets?     -> EC2 launch type / node groups
Very small team, few services, tight ops budget?         -> ECS on Fargate
Platform team serving many product teams?                -> EKS (often with Karpenter)</code></pre>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Shared building blocks</h4>
<p style="line-height: 1.75;">Whichever you choose, images live in <strong>ECR</strong>, logs flow to <strong>CloudWatch Logs</strong> (or a sidecar such as FireLens or Fluent Bit), traffic enters through an <strong>ALB or NLB</strong>, secrets come from <strong>Secrets Manager</strong>, and workloads get IAM permissions through a per-task or per-pod role rather than the node's instance role.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "ECS and EKS are orchestrators; Fargate is serverless capacity for either. I reach for ECS on Fargate when I want the simplest path to production on AWS: task definitions, a service behind an ALB, autoscaling and rolling deploys with no nodes to patch. I choose EKS when the team needs Kubernetes portability or its ecosystem, and I move to EC2 capacity when I need GPUs or the cost of a large steady fleet justifies managing nodes."</div>
</div>`,
          examples: [
            `# Same container, three ways to run it

# 1. ECS on Fargate: one task, no cluster nodes
aws ecs create-cluster --cluster-name prod
aws ecs run-task --cluster prod --launch-type FARGATE --task-definition orders-api:1 \\
  --network-configuration 'awsvpcConfiguration={subnets=[subnet-priv-a],securityGroups=[sg-app],assignPublicIp=DISABLED}'

# 2. ECS on EC2: register instances via a capacity provider (Auto Scaling group)
aws ecs create-capacity-provider --name prod-ec2 \\
  --auto-scaling-group-provider 'autoScalingGroupArn=arn:aws:autoscaling:us-east-1:123456789012:autoScalingGroup:...:autoScalingGroupName/ecs-prod,managedScaling={status=ENABLED,targetCapacity=90},managedTerminationProtection=ENABLED'
aws ecs put-cluster-capacity-providers --cluster prod --capacity-providers prod-ec2 FARGATE FARGATE_SPOT \\
  --default-capacity-provider-strategy capacityProvider=prod-ec2,weight=1

# 3. EKS: managed control plane plus a Fargate profile for the orders namespace
eksctl create cluster --name prod --region us-east-1 --version 1.31 --without-nodegroup
eksctl create fargateprofile --cluster prod --name orders --namespace orders
kubectl create namespace orders
kubectl -n orders create deployment orders-api \\
  --image=123456789012.dkr.ecr.us-east-1.amazonaws.com/orders-api:1.4.2 --replicas=3`,
          ],
          questions: [
            {
              question: "What is the difference between ECS, EKS and Fargate?",
              solution: "<p><strong>ECS</strong> is the AWS-native container orchestrator with a simple task/service model and no control-plane cost. <strong>EKS</strong> is managed upstream Kubernetes, giving portability and the Kubernetes ecosystem at the price of more complexity and a per-cluster fee. <strong>Fargate</strong> is not an orchestrator: it is a <strong>serverless launch type</strong> for ECS tasks or EKS pods where AWS runs the underlying compute, so you never patch or scale nodes. You pick an orchestrator (ECS or EKS) and then a capacity model (Fargate or EC2).</p>",
            },
            {
              question: "A startup with three backend services and two engineers asks you to recommend a container platform. What do you say and why?",
              solution: "<p><strong>ECS on Fargate.</strong> There is no control plane fee, no nodes to patch, no Kubernetes upgrade cadence to keep up with, and the concepts (task definition, service, ALB) map directly onto what they need. Autoscaling, rolling deploys with a circuit breaker, Secrets Manager injection and CloudWatch logging come out of the box. I would revisit EKS only if they later need Kubernetes-specific tooling, must run on another cloud, or hire a platform team; until then the operational cost of Kubernetes outweighs its flexibility.</p>",
            },
            {
              question: "What does the EKS control plane fee buy you, and what are you still responsible for?",
              solution: "<p>The fee (about $0.10 per cluster-hour) pays for a highly available <strong>Kubernetes API server and etcd</strong> spread across three Availability Zones, automatic control-plane patching, control-plane logging to CloudWatch and certified upstream conformance. You remain responsible for the <strong>data plane</strong>: worker node AMIs and their patching (unless you use Fargate, managed node groups with automatic updates, or EKS Auto Mode), cluster add-ons such as VPC CNI, CoreDNS and kube-proxy, in-cluster tooling, and scheduling Kubernetes version upgrades before support windows lapse.</p>",
            },
            {
              question: "Which workloads are a poor fit for Fargate?",
              solution: "<p>Anything needing <strong>GPUs</strong> or specialised hardware, <strong>privileged</strong> containers or custom kernel modules, <strong>DaemonSets</strong> and host-level agents, very large tasks beyond the vCPU and memory caps, workloads that need local NVMe or more ephemeral storage than Fargate allows, and <strong>large steady fleets</strong> where EC2 with Savings Plans and tight bin-packing is markedly cheaper. Latency-sensitive services with frequent scale-out can also suffer from Fargate's slower task start compared with placing a task on an already-warm EC2 node.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html",
            "https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html",
            "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html",
          ],
        },
        {
          topic: "Task Definitions, Services & Clusters",
          tags: ["aws", "ecs", "task definition", "service", "cluster", "alb"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  ECS has a small vocabulary, and interviewers expect you to use it precisely. A <strong>cluster</strong> is a logical grouping of capacity, a <strong>task definition</strong> is the blueprint for a set of containers, a <strong>task</strong> is a running instance of that blueprint, and a <strong>service</strong> is a controller that keeps a desired number of tasks running and wired into a load balancer.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Task definition</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Versioned as <strong>revisions</strong> of a <strong>family</strong> (<code>orders-api:12</code>). Revisions are immutable; a deploy means registering a new revision and pointing the service at it.</li>
  <li>Task-level settings: <code>cpu</code> and <code>memory</code>, <code>networkMode</code> (<code>awsvpc</code> gives every task its own ENI and security group and is mandatory on Fargate), <code>requiresCompatibilities</code>, <code>runtimePlatform</code> (ARM64 or X86_64), the <strong>task role</strong> and <strong>execution role</strong>, volumes (EFS, ephemeral storage).</li>
  <li>Container definitions: image, port mappings, environment and <code>secrets</code>, <code>healthCheck</code>, <code>logConfiguration</code>, <code>dependsOn</code> for sidecar ordering, <code>essential</code> flag, <code>ulimits</code>, <code>linuxParameters</code>. A task can hold several containers that share the network namespace and can share volumes.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Service</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Desired count</strong> plus a scheduler (<code>REPLICA</code>, or <code>DAEMON</code> on EC2 to run one task per instance).</li>
  <li><strong>Load balancing:</strong> registers each task's IP and port with an ALB or NLB target group; unhealthy targets are replaced automatically. <code>healthCheckGracePeriodSeconds</code> gives slow-starting apps time.</li>
  <li><strong>Deployment configuration:</strong> rolling (<code>ECS</code>) or blue/green (<code>CODE_DEPLOY</code> or the native ECS blue/green option), <code>minimumHealthyPercent</code>, <code>maximumPercent</code>, and the <strong>deployment circuit breaker</strong> that rolls back when new tasks keep failing.</li>
  <li><strong>Placement</strong> on EC2: strategies (<code>spread</code> across AZs, <code>binpack</code> on memory) and constraints (<code>distinctInstance</code>, attribute filters).</li>
  <li><strong>Service discovery:</strong> <strong>Service Connect</strong> (Envoy sidecar with retries, TLS and metrics) or Cloud Map DNS, so <code>http://payments:8080</code> resolves inside the namespace.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Cluster</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>A namespace for services and tasks with attached <strong>capacity providers</strong>: <code>FARGATE</code>, <code>FARGATE_SPOT</code>, or Auto Scaling groups of EC2 instances running the ECS agent.</li>
  <li>Cluster settings enable <strong>Container Insights</strong> metrics and <strong>ECS Exec</strong> for shelling into a running task through SSM without SSH.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Standalone tasks</h4>
<p style="line-height: 1.75;"><code>RunTask</code> starts tasks without a service for batch jobs, migrations and cron work, usually triggered by <strong>EventBridge Scheduler</strong> or Step Functions. A task ends when its essential container exits; a service would restart it, a standalone task would not.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "A task definition is the immutable, versioned blueprint: containers, CPU and memory, roles, secrets, logging. A service keeps N copies of it running, registers them with an ALB target group, replaces unhealthy tasks and manages rolling or blue/green deployments. The cluster is the pool of Fargate or EC2 capacity they schedule onto. Deploying is registering a new revision and updating the service; one-off jobs use RunTask instead of a service."</div>
</div>`,
          examples: [
            `# Task definition for ECS on Fargate with an app container and a log-router sidecar
{
  "family": "orders-api",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "runtimePlatform": { "cpuArchitecture": "ARM64", "operatingSystemFamily": "LINUX" },
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "arn:aws:iam::123456789012:role/ecsTaskExecutionRole",
  "taskRoleArn": "arn:aws:iam::123456789012:role/orders-api-task-role",
  "containerDefinitions": [
    {
      "name": "api",
      "image": "123456789012.dkr.ecr.us-east-1.amazonaws.com/orders-api:1.4.2",
      "essential": true,
      "portMappings": [{ "containerPort": 8080, "protocol": "tcp", "name": "http" }],
      "environment": [{ "name": "NODE_ENV", "value": "production" }],
      "secrets": [{ "name": "DB_URL", "valueFrom": "arn:aws:secretsmanager:us-east-1:123456789012:secret:prod/orders/db" }],
      "healthCheck": { "command": ["CMD-SHELL", "curl -f http://localhost:8080/health || exit 1"], "interval": 30, "timeout": 5, "retries": 3, "startPeriod": 20 },
      "dependsOn": [{ "containerName": "log-router", "condition": "START" }],
      "logConfiguration": { "logDriver": "awsfirelens" }
    },
    {
      "name": "log-router",
      "image": "public.ecr.aws/aws-observability/aws-for-fluent-bit:stable",
      "essential": true,
      "firelensConfiguration": { "type": "fluentbit" },
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": { "awslogs-group": "/ecs/orders-api/firelens", "awslogs-region": "us-east-1", "awslogs-stream-prefix": "fluentbit" }
      }
    }
  ]
}`,
            `# Register the definition, create the service behind an ALB, then deploy a new revision
aws ecs register-task-definition --cli-input-json file://task-def.json

aws ecs create-service --cluster prod --service-name orders-api \\
  --task-definition orders-api --desired-count 3 --launch-type FARGATE \\
  --network-configuration 'awsvpcConfiguration={subnets=[subnet-priv-a,subnet-priv-b],securityGroups=[sg-app],assignPublicIp=DISABLED}' \\
  --load-balancers targetGroupArn=arn:aws:elasticloadbalancing:us-east-1:123456789012:targetgroup/orders/abc123,containerName=api,containerPort=8080 \\
  --health-check-grace-period-seconds 60 \\
  --deployment-configuration 'minimumHealthyPercent=100,maximumPercent=200,deploymentCircuitBreaker={enable=true,rollback=true}' \\
  --enable-execute-command

# Deploy: new revision, then update; watch until the rollout is stable
aws ecs update-service --cluster prod --service orders-api --task-definition orders-api:13
aws ecs wait services-stable --cluster prod --services orders-api

# Shell into a running task (ECS Exec) and run a one-off migration task
aws ecs execute-command --cluster prod --task 0f1e2d3c --container api --interactive --command "/bin/sh"
aws ecs run-task --cluster prod --launch-type FARGATE --task-definition orders-migrate:4 \\
  --network-configuration 'awsvpcConfiguration={subnets=[subnet-priv-a],securityGroups=[sg-app]}'`,
          ],
          questions: [
            {
              question: "What is the difference between a task and a service in ECS?",
              solution: "<p>A <strong>task</strong> is one running instance of a task definition: a set of containers started together on Fargate or an EC2 instance. It runs until its essential container exits. A <strong>service</strong> is a long-lived controller that keeps a <strong>desired count</strong> of identical tasks running, replaces tasks that stop or fail health checks, registers them with a load balancer target group, and orchestrates rolling or blue/green deployments when you point it at a new revision. Use <code>RunTask</code> for batch jobs and migrations; use a service for anything that should always be up.</p>",
            },
            {
              question: "Why does Fargate require the awsvpc network mode, and what does it give you?",
              solution: "<p>In <code>awsvpc</code> mode every task gets its <strong>own elastic network interface</strong> with a private IP and its own <strong>security group</strong>, so tasks are first-class VPC citizens: the ALB targets the task IP directly, security rules are per service rather than per host, and VPC Flow Logs show task traffic. Fargate has no host you could share ports on, so bridge and host modes make no sense there. The costs are ENI limits on EC2 instances (mitigated by ENI trunking) and slightly longer task start while the ENI attaches.</p>",
            },
            {
              question: "How do you run a scheduled or one-off job on ECS without keeping a service alive?",
              solution: "<p>Create a task definition for the job and start it with <code>RunTask</code>. For schedules, use <strong>EventBridge Scheduler</strong> (or an EventBridge rule) with an ECS target that specifies the cluster, task definition, launch type and network configuration; the scheduler role needs <code>ecs:RunTask</code> and <code>iam:PassRole</code> for the task and execution roles. For multi-step or retry logic, orchestrate <code>RunTask</code> from <strong>Step Functions</strong> with the <code>.sync</code> integration so the workflow waits for the task to finish and captures its exit code.</p>",
            },
            {
              question: "What is Service Connect and how does it differ from Cloud Map service discovery?",
              solution: "<p><strong>Cloud Map</strong> service discovery registers task IPs in a private DNS namespace, so clients resolve a name and connect directly; there is no retry, TLS or metrics layer, and DNS caching can point at tasks that just stopped. <strong>Service Connect</strong> injects an Envoy-based sidecar proxy into each task and gives services stable names inside a namespace (<code>payments:8080</code>) with connection draining during deployments, automatic retries, outlier detection, optional TLS and per-route CloudWatch metrics. Service Connect is the recommended option for ECS-to-ECS traffic; Cloud Map remains useful when non-ECS clients need to discover tasks.</p>",
            },
            {
              question: "Where do container logs go in ECS and what are the options?",
              solution: "<p>The <code>logConfiguration</code> of each container chooses a driver. <code>awslogs</code> sends stdout and stderr straight to a <strong>CloudWatch Logs</strong> group, optionally in non-blocking mode with a buffer so a logging outage does not stall the app. <code>awsfirelens</code> routes through a <strong>Fluent Bit</strong> sidecar that can filter, enrich and fan out to OpenSearch, S3, Datadog or Kinesis Firehose. On EC2 you can also use <code>json-file</code>, <code>splunk</code> or <code>fluentd</code>. Fargate supports only <code>awslogs</code>, <code>awsfirelens</code> and <code>splunk</code>.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html",
            "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html",
            "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-connect.html",
          ],
        },
        {
          topic: "Task Role vs Execution Role",
          tags: ["aws", "ecs", "iam", "task role", "execution role", "least privilege"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Every ECS task definition can reference two IAM roles, and confusing them is the single most common ECS interview mistake. The <strong>task execution role</strong> is used by the <strong>ECS agent</strong> to set the task up. The <strong>task role</strong> is used by <strong>your application code</strong> once it is running. They exist so that platform plumbing and business logic each get exactly the permissions they need and nothing more.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Task execution role</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Assumed by the ECS agent (on Fargate, by the Fargate infrastructure) <em>before</em> your containers start.</li>
  <li>Typical permissions: <code>ecr:GetAuthorizationToken</code>, <code>ecr:BatchGetImage</code>, <code>ecr:GetDownloadUrlForLayer</code> to pull the image; <code>logs:CreateLogStream</code> and <code>logs:PutLogEvents</code> for the <code>awslogs</code> driver; <code>secretsmanager:GetSecretValue</code>, <code>ssm:GetParameters</code> and <code>kms:Decrypt</code> to inject <code>secrets</code>; permissions to pull private registry credentials.</li>
  <li>The managed policy <code>AmazonECSTaskExecutionRolePolicy</code> covers ECR and logs; secrets permissions are added per environment.</li>
  <li>Often shared by many services in an account, because its job is generic. If a container never pulls from ECR or writes to CloudWatch, you may not need one at all on EC2, but Fargate always requires it.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Task role</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Credentials are exposed to the containers through the <strong>container credential provider</strong> endpoint (<code>AWS_CONTAINER_CREDENTIALS_RELATIVE_URI</code>) on <code>169.254.170.2</code>; every AWS SDK picks them up automatically.</li>
  <li>Grants what the <em>application</em> needs: read a DynamoDB table, put objects in one S3 prefix, publish to an SNS topic, read a specific secret at runtime.</li>
  <li>Should be <strong>unique per service</strong>, so a compromised orders container cannot read the payments queue.</li>
  <li>Credentials are temporary and rotate automatically; nothing is stored in the image or environment.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Side by side</h4>
<pre><code class="language-text">                     Execution role                 Task role
Who uses it          ECS agent / Fargate             Your code (SDK inside container)
When                 Before containers start         While the task runs
Pulls image from ECR yes                             no
Injects secrets      yes (secrets[] in task def)     only if code calls the SDK itself
Writes app logs      yes (awslogs driver)            no
Calls S3/SQS/Dynamo  no                              yes
Sharing              usually shared per account      one per service</code></pre>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Related guard rails</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>On the EC2 launch type, block containers from reaching the <strong>instance metadata service</strong> (<code>ECS_AWSVPC_BLOCK_IMDS=true</code> or IMDSv2 hop limit 1) so they cannot borrow the instance role.</li>
  <li>The role that calls <code>RegisterTaskDefinition</code> or <code>RunTask</code> needs <code>iam:PassRole</code> for both roles; scope it so developers cannot pass an admin role into a task.</li>
  <li>Use <strong>ECS Exec</strong> (<code>ssmmessages:*</code> on the task role) instead of SSH and baked-in credentials for debugging.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "The execution role is what ECS itself uses before my container starts: pulling the image from ECR, fetching secrets to inject, writing logs. The task role is what my code assumes at runtime through the container credential endpoint to call S3, SQS or DynamoDB. I keep one generic execution role and a dedicated least-privilege task role per service, block IMDS on EC2 hosts, and lock down iam:PassRole so nobody can attach a privileged role to a task."</div>
</div>`,
          examples: [
            `# Execution role: trust policy + permissions the ECS agent needs
aws iam create-role --role-name ecsTaskExecutionRole --assume-role-policy-document '{
  "Version": "2012-10-17",
  "Statement": [{ "Effect": "Allow", "Principal": { "Service": "ecs-tasks.amazonaws.com" }, "Action": "sts:AssumeRole" }]
}'
aws iam attach-role-policy --role-name ecsTaskExecutionRole \\
  --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy
aws iam put-role-policy --role-name ecsTaskExecutionRole --policy-name read-prod-secrets --policy-document '{
  "Version": "2012-10-17",
  "Statement": [
    { "Effect": "Allow", "Action": ["secretsmanager:GetSecretValue"], "Resource": "arn:aws:secretsmanager:us-east-1:123456789012:secret:prod/*" },
    { "Effect": "Allow", "Action": ["kms:Decrypt"], "Resource": "arn:aws:kms:us-east-1:123456789012:key/1234abcd-12ab-34cd-56ef-1234567890ab" }
  ]
}'

# Task role: unique per service, only what the application calls
aws iam create-role --role-name orders-api-task-role --assume-role-policy-document '{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow", "Principal": { "Service": "ecs-tasks.amazonaws.com" }, "Action": "sts:AssumeRole",
    "Condition": { "ArnLike": { "aws:SourceArn": "arn:aws:ecs:us-east-1:123456789012:*" },
                   "StringEquals": { "aws:SourceAccount": "123456789012" } }
  }]
}'
aws iam put-role-policy --role-name orders-api-task-role --policy-name orders-api-access --policy-document '{
  "Version": "2012-10-17",
  "Statement": [
    { "Effect": "Allow", "Action": ["dynamodb:GetItem","dynamodb:PutItem","dynamodb:Query"], "Resource": "arn:aws:dynamodb:us-east-1:123456789012:table/orders" },
    { "Effect": "Allow", "Action": ["sqs:SendMessage"], "Resource": "arn:aws:sqs:us-east-1:123456789012:order-events" },
    { "Effect": "Allow", "Action": ["ssmmessages:CreateControlChannel","ssmmessages:CreateDataChannel","ssmmessages:OpenControlChannel","ssmmessages:OpenDataChannel"], "Resource": "*" }
  ]
}'`,
            `// Inside the container nothing special is needed: the SDK reads the task role
// credentials from the container credential provider automatically.
import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

const ddb = new DynamoDBClient({});   // no keys, no profile: uses AWS_CONTAINER_CREDENTIALS_RELATIVE_URI

export async function getOrder(id) {
  const res = await ddb.send(new GetItemCommand({ TableName: "orders", Key: { pk: { S: id } } }));
  return res.Item;
}

// Verify which identity the task is running as (handy when debugging AccessDenied)
// $ aws ecs execute-command --cluster prod --task <id> --container api --interactive --command "aws sts get-caller-identity"
// -> arn:aws:sts::123456789012:assumed-role/orders-api-task-role/<task-id>`,
          ],
          questions: [
            {
              question: "Explain the ECS task role versus the task execution role.",
              solution: "<p>The <strong>execution role</strong> is used by the ECS agent <em>on your behalf</em> before your container starts: pulling the image from ECR, fetching secrets from Secrets Manager or SSM to inject as environment variables, and writing logs to CloudWatch. The <strong>task role</strong> is assumed by your <em>application code</em> inside the container to call AWS APIs (read S3, publish to SQS). Keeping them separate applies least privilege: the app cannot read every secret, and the agent cannot touch your business data.</p>",
            },
            {
              question: "A task fails to start with a CannotPullContainerError or a secrets ResourceInitializationError. Which role do you check and why?",
              solution: "<p>The <strong>task execution role</strong>, because both errors happen <em>before</em> any container runs. <code>CannotPullContainerError</code> usually means the execution role lacks ECR permissions, the image tag does not exist, or the task has no network path to ECR (private subnet without a NAT gateway or the <code>ecr.api</code>, <code>ecr.dkr</code> and S3 VPC endpoints). <code>ResourceInitializationError</code> on secrets means the execution role is missing <code>secretsmanager:GetSecretValue</code> or <code>kms:Decrypt</code>, or cannot reach Secrets Manager. The task role is irrelevant at that stage.</p>",
            },
            {
              question: "How does application code inside an ECS container obtain the task role credentials?",
              solution: "<p>ECS sets the environment variable <code>AWS_CONTAINER_CREDENTIALS_RELATIVE_URI</code> in every container. The AWS SDK default credential chain notices it and requests temporary credentials from the <strong>container credential provider</strong> at <code>http://169.254.170.2</code> plus that path, receiving an access key, secret key and session token scoped to the task role and valid for a few hours. The SDK refreshes them automatically before expiry. No configuration, keys or profiles are required in the image, and the credentials are unique to that task.</p>",
            },
            {
              question: "Why should you block access to the EC2 instance metadata service from containers on the EC2 launch type?",
              solution: "<p>On the EC2 launch type, containers share the host network stack unless you use <code>awsvpc</code> mode, so a container could call <code>169.254.169.254</code> and obtain the <strong>instance role</strong> credentials, which typically include broad ECS, ECR and CloudWatch permissions. That would let a compromised app escalate past its task role. Mitigate with <code>ECS_AWSVPC_BLOCK_IMDS=true</code> in the agent config for awsvpc tasks, require <strong>IMDSv2</strong> with a hop limit of 1 so bridge-mode containers cannot reach it, and keep the instance role minimal. Fargate has no instance role, which is one of its security advantages.</p>",
            },
            {
              question: "Why does the identity that deploys a task definition need iam:PassRole, and how do you restrict it?",
              solution: "<p>Registering a task definition or running a task with a <code>taskRoleArn</code> or <code>executionRoleArn</code> hands those roles to the ECS service to assume, so IAM requires the caller to hold <code>iam:PassRole</code> on each role; otherwise anyone able to run a task could attach an administrator role to their container. Restrict it by scoping <code>iam:PassRole</code> to role ARNs matching a naming convention (<code>arn:aws:iam::123456789012:role/ecs/*</code>) and adding the condition <code>iam:PassedToService</code> equals <code>ecs-tasks.amazonaws.com</code>, so the deploy role can only pass ECS task roles to ECS.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html",
            "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_execution_IAM_role.html",
            "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/security-iam.html",
          ],
        },
        {
          topic: "Fargate Pricing & Limits",
          tags: ["aws", "fargate", "pricing", "spot", "graviton", "limits"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>Fargate</strong> bills you for the resources a task <em>requests</em>, from the moment the image pull starts until the task stops, rounded up to the second with a one-minute minimum. Because you pay for the requested size rather than what the container actually uses, right-sizing and picking the right pricing model matter more than on EC2, where idle capacity is at least shared across tasks.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What you pay for</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>vCPU-seconds</strong> and <strong>GB-seconds</strong> of memory for the task-level <code>cpu</code> and <code>memory</code> values. Container-level limits do not affect the bill.</li>
  <li><strong>Ephemeral storage</strong> beyond the 20 GB included, up to 200 GB per task.</li>
  <li>Data transfer, ALB hours and LCUs, CloudWatch Logs ingestion and ECR storage are billed separately and are often a bigger share than compute for small services.</li>
  <li><strong>Windows</strong> tasks add an OS licence fee per vCPU.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Ways to pay less</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Graviton (ARM64):</strong> set <code>runtimePlatform.cpuArchitecture</code> to <code>ARM64</code> and build multi-arch images; about 20% cheaper per vCPU with equal or better performance for most web workloads.</li>
  <li><strong>Fargate Spot:</strong> up to 70% off for tasks that tolerate a two-minute interruption notice (<code>SIGTERM</code> then stop). Use a capacity provider strategy with a <code>base</code> of on-demand tasks and Spot for the rest.</li>
  <li><strong>Compute Savings Plans</strong> cover Fargate as well as EC2 and Lambda, with up to about 50% discount for a one- or three-year commitment on a baseline spend.</li>
  <li><strong>Right-size</strong> with Container Insights or CloudWatch <code>CpuUtilized</code> and <code>MemoryUtilized</code>; many services run happily at 0.25 vCPU / 0.5 GB.</li>
  <li><strong>Scale to zero</strong> for dev environments with scheduled scaling on desired count.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Sizing and limits to remember</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>CPU from <strong>0.25 vCPU to 16 vCPU</strong>, memory from 0.5 GB to <strong>120 GB</strong>, and only specific CPU-to-memory combinations are valid (for example 1 vCPU allows 2 to 8 GB).</li>
  <li>Ephemeral storage 20 to 200 GB; persistent data needs <strong>EFS</strong> volumes.</li>
  <li>Networking is <code>awsvpc</code> only; one ENI per task, and each task needs a free IP in the subnet. Public IPs are optional; private tasks need NAT or VPC endpoints for ECR, Logs and Secrets Manager.</li>
  <li>No GPUs, no privileged mode, no host networking, no DaemonSets, limited Linux capabilities (<code>SYS_PTRACE</code> only), and no <code>docker.sock</code>.</li>
  <li>Task start typically takes 30 to 60 seconds and depends heavily on image size; keep images small and use <strong>SOCI</strong> lazy loading for large ones.</li>
  <li>Spot tasks are not eligible for the ECS service scheduler's guaranteed capacity; a shortage of Spot capacity leaves the service under-scaled until on-demand fills in.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">When EC2 is cheaper</h4>
<p style="line-height: 1.75;">For a large, steady fleet with high utilisation, EC2 capacity providers plus Savings Plans or Reserved Instances and dense bin-packing can undercut Fargate by 30 to 50%, and they unlock GPUs and huge instance types. The break-even depends on how much engineering time you spend patching AMIs, tuning cluster autoscaling and handling half-empty nodes; for most teams below a few hundred vCPUs that time outweighs the raw compute difference.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Fargate charges per vCPU-second and GB-second for the task size I request, so I right-size from Container Insights, run on Graviton for a 20% saving, use Fargate Spot with an on-demand base for tolerant work, and cover the baseline with a Compute Savings Plan. I know the limits: 16 vCPU and 120 GB per task, 200 GB ephemeral, no GPUs or privileged containers, and awsvpc networking only. Once a fleet is large and steady I compare against EC2 capacity providers with bin-packing."</div>
</div>`,
          examples: [
            `# Mixed capacity: always 2 on-demand tasks, then 3 Spot for every 1 on-demand beyond that
aws ecs put-cluster-capacity-providers --cluster prod \\
  --capacity-providers FARGATE FARGATE_SPOT \\
  --default-capacity-provider-strategy capacityProvider=FARGATE,weight=1,base=2 capacityProvider=FARGATE_SPOT,weight=3

aws ecs create-service --cluster prod --service-name thumbnail-worker \\
  --task-definition thumbnail-worker --desired-count 10 \\
  --capacity-provider-strategy capacityProvider=FARGATE,weight=1,base=2 capacityProvider=FARGATE_SPOT,weight=3 \\
  --network-configuration 'awsvpcConfiguration={subnets=[subnet-priv-a,subnet-priv-b],securityGroups=[sg-worker]}'

# Graviton task with extra ephemeral storage; valid cpu/memory pair (1 vCPU -> 2 to 8 GB)
{
  "family": "thumbnail-worker",
  "requiresCompatibilities": ["FARGATE"],
  "networkMode": "awsvpc",
  "cpu": "1024",
  "memory": "4096",
  "runtimePlatform": { "cpuArchitecture": "ARM64", "operatingSystemFamily": "LINUX" },
  "ephemeralStorage": { "sizeInGiB": 50 },
  "containerDefinitions": [{ "name": "worker", "image": "123456789012.dkr.ecr.us-east-1.amazonaws.com/thumbnail-worker:2.0.0", "essential": true, "stopTimeout": 120 }]
}

# Build a multi-arch image so the same tag runs on ARM64 and X86_64
docker buildx build --platform linux/arm64,linux/amd64 \\
  -t 123456789012.dkr.ecr.us-east-1.amazonaws.com/thumbnail-worker:2.0.0 --push .`,
            `// Handle the Fargate Spot interruption: SIGTERM arrives ~2 minutes before the task is stopped.
// Finish or hand back in-flight work, then exit cleanly within stopTimeout.
let shuttingDown = false;

process.on("SIGTERM", async () => {
  shuttingDown = true;
  console.log("SIGTERM received: draining in-flight jobs");
  await queueConsumer.stopPolling();          // stop taking new SQS messages
  await Promise.allSettled(inFlight);         // let current jobs finish (visibility timeout covers retries)
  process.exit(0);
});

// Right-sizing: look at what the task actually used before shrinking it
// $ aws cloudwatch get-metric-statistics --namespace ECS/ContainerInsights --metric-name MemoryUtilized \\
//     --dimensions Name=ClusterName,Value=prod Name=ServiceName,Value=thumbnail-worker \\
//     --statistics Maximum --period 3600 --start-time 2026-09-01T00:00:00Z --end-time 2026-09-08T00:00:00Z`,
          ],
          questions: [
            {
              question: "When is Fargate more expensive than EC2, and how do you decide?",
              solution: "<p>Fargate charges a premium per vCPU and GB compared with the equivalent EC2 instance, and you cannot bin-pack tasks tightly or use EC2 Reserved Instances. For a <strong>large, steady fleet</strong> with high utilisation, EC2 capacity providers with Savings Plans and good bin-packing are cheaper. For <strong>bursty, small or many heterogeneous services</strong>, Fargate usually wins once you count the engineering time spent on patching AMIs, scaling clusters and handling under-utilised nodes. Fargate Spot and Graviton (ARM) close much of the gap for tolerant workloads.</p>",
            },
            {
              question: "Exactly what does Fargate bill for, and what common cost is people forget?",
              solution: "<p>Fargate bills <strong>vCPU-seconds and GB-seconds</strong> for the task-level <code>cpu</code> and <code>memory</code> you request (not what the container uses), from image pull start to task stop, with a one-minute minimum, plus <strong>ephemeral storage</strong> above 20 GB and a licence surcharge for Windows. People forget that <strong>NAT gateway data processing</strong> for image pulls and API calls from private subnets, <strong>CloudWatch Logs ingestion</strong>, and ALB LCUs frequently exceed the Fargate compute line for small services, so VPC endpoints for ECR and S3 and sensible log levels are real cost controls.</p>",
            },
            {
              question: "How would you use Fargate Spot safely for a production queue worker?",
              solution: "<p>Use a <strong>capacity provider strategy</strong> with a <code>base</code> of on-demand tasks so throughput never drops to zero, and Spot with a higher <code>weight</code> for the rest. Make the worker idempotent and rely on <strong>SQS visibility timeouts</strong> so an interrupted message is retried. Handle <code>SIGTERM</code>: stop polling, finish in-flight work, exit before <code>stopTimeout</code> (up to 120 seconds). Spread across multiple AZs to improve Spot availability, alarm on the <code>SpotInterruption</code> task stop reason, and never put Spot behind a user-facing ALB without enough on-demand base to absorb a burst of reclaims.</p>",
            },
            {
              question: "What limits does Fargate impose that could block a migration from EC2?",
              solution: "<p>Task size maxes at <strong>16 vCPU and 120 GB</strong> with fixed CPU-to-memory ratios; ephemeral storage tops out at 200 GB and persistent storage must be <strong>EFS</strong>. There are <strong>no GPUs</strong>, no privileged mode, no host networking, no DaemonSets or host agents, no access to the Docker socket, and only <code>SYS_PTRACE</code> among added Linux capabilities. Networking is <code>awsvpc</code> only, so each task consumes a subnet IP. Applications that rely on local high-IOPS disks, kernel tuning, GPU inference or sidecars running as node-level agents need EC2 capacity instead.</p>",
            },
            {
              question: "Why does Graviton matter for Fargate cost, and what does adopting it require?",
              solution: "<p>ARM64 Fargate tasks cost roughly <strong>20% less</strong> per vCPU and GB than x86 and typically match or beat performance for interpreted and JIT languages and most web services. Adoption requires building <strong>multi-architecture images</strong> (for example <code>docker buildx --platform linux/arm64,linux/amd64</code>), verifying that native dependencies and base images have ARM builds, and setting <code>runtimePlatform.cpuArchitecture</code> to <code>ARM64</code> in the task definition. Fargate Spot is also available for ARM64, so the two savings stack.</p>",
            },
          ],
          links: [
            "https://aws.amazon.com/fargate/pricing/",
            "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate-tasks-services.html",
            "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate-capacity-providers.html",
          ],
        },
      ],
    },
    {
      id: 2,
      label: "Advance",
      concepts: [
        {
          topic: "Zero-Downtime Deployments on ECS",
          tags: ["aws", "ecs", "deployment", "blue green", "codedeploy", "rolling update"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Shipping a new image to a service without dropping a request is a matter of coordinating three actors: the <strong>ECS scheduler</strong> that starts and stops tasks, the <strong>load balancer</strong> that decides which tasks receive traffic, and the <strong>application</strong> that must start healthy and stop gracefully. Interviewers probe whether you understand each hand-off, not just which button to press.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Rolling update (deployment controller ECS)</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><code>minimumHealthyPercent</code> and <code>maximumPercent</code> bound how many tasks can be stopped or added during the rollout. <strong>100 / 200</strong> means: start a full new set, wait until they pass health checks, then stop the old set.</li>
  <li>A new task is considered healthy only when both its <strong>container health check</strong> and the <strong>target group health check</strong> pass; <code>healthCheckGracePeriodSeconds</code> stops ECS from killing slow starters early.</li>
  <li>The <strong>deployment circuit breaker</strong> counts failed task launches; when it trips, the deployment is marked failed and, with <code>rollback=true</code>, the service reverts to the last steady revision automatically. Pair it with <strong>CloudWatch alarm-based rollback</strong> for functional failures (5xx rate) that pass health checks.</li>
  <li>Cost: at 200% you briefly pay for double the tasks; at <code>minimumHealthyPercent=50</code> you save capacity but lose headroom.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Blue/green with CodeDeploy (or native ECS blue/green)</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Two <strong>target groups</strong> and two listener rules: production (<code>:443</code>) and an optional <strong>test listener</strong> (<code>:8443</code>). The green task set is started behind the test listener, validated (smoke tests via the <code>AfterAllowTestTraffic</code> hook), then production traffic shifts.</li>
  <li>Traffic shifting configs: <code>AllAtOnce</code>, <code>Canary10Percent5Minutes</code>, <code>Linear10PercentEvery1Minute</code>. Alarms during the shift trigger an <strong>instant rollback</strong> by flipping the listener back to blue.</li>
  <li>Blue tasks are kept for a configurable wait time after the shift, so rollback is seconds rather than a redeploy.</li>
  <li>ECS now offers a <strong>native blue/green</strong> deployment type with lifecycle hooks, bake time and alarm rollback, without a separate CodeDeploy application.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Graceful shutdown</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>When a task is scheduled to stop, ECS <strong>deregisters</strong> it from the target group; the ALB stops sending new connections and waits the <strong>deregistration delay</strong> (default 300 s, often lowered to 30 to 60 s) for in-flight requests.</li>
  <li>ECS then sends <code>SIGTERM</code>, waits <code>stopTimeout</code> (default 30 s, max 120 s on Fargate), then <code>SIGKILL</code>. Your app must stop accepting new work, finish in-flight requests, close DB connections and exit on <code>SIGTERM</code>.</li>
  <li>Make sure PID 1 receives the signal: use <code>exec</code> form in <code>CMD</code>, or an init such as <code>tini</code>, otherwise a shell swallows it.</li>
  <li>Enable <strong>connection draining</strong> in Service Connect and keep-alive handling so clients do not reuse a connection to a dying task.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Compatibility beyond the deploy</h4>
<p style="line-height: 1.75;">Zero downtime also requires that old and new versions coexist: <strong>backwards-compatible database migrations</strong> (expand, migrate, contract), API contracts that tolerate both versions, and feature flags for behaviour switches. A perfect rollout still fails if revision 13 drops a column revision 12 is reading.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "For rolling deploys I set minimumHealthyPercent 100 and maximumPercent 200, enable the deployment circuit breaker with rollback and add alarm-based rollback on 5xx. For riskier changes I use blue/green: a green task set behind a test listener, smoke tests in a hook, canary traffic shifting with alarm rollback, and blue kept warm for instant revert. On the app side I handle SIGTERM, drain within stopTimeout and lower the ALB deregistration delay, and I keep schema changes backwards compatible so both versions can run at once."</div>
</div>`,
          examples: [
            `# Rolling deployment with circuit breaker and CloudWatch alarm rollback
aws ecs update-service --cluster prod --service orders-api --task-definition orders-api:13 \\
  --deployment-configuration '{
    "minimumHealthyPercent": 100,
    "maximumPercent": 200,
    "deploymentCircuitBreaker": { "enable": true, "rollback": true },
    "alarms": { "enable": true, "rollback": true, "alarmNames": ["orders-api-5xx-rate", "orders-api-p99-latency"] }
  }'

# Shorten how long the ALB waits for in-flight requests on a deregistered task
aws elbv2 modify-target-group-attributes \\
  --target-group-arn arn:aws:elasticloadbalancing:us-east-1:123456789012:targetgroup/orders/abc123 \\
  --attributes Key=deregistration_delay.timeout_seconds,Value=30

# Blue/green via CodeDeploy: service created with the CODE_DEPLOY controller
aws ecs create-service --cluster prod --service-name orders-api --task-definition orders-api:13 \\
  --desired-count 3 --launch-type FARGATE --deployment-controller type=CODE_DEPLOY \\
  --load-balancers targetGroupArn=arn:aws:elasticloadbalancing:us-east-1:123456789012:targetgroup/orders-blue/111,containerName=api,containerPort=8080 \\
  --network-configuration 'awsvpcConfiguration={subnets=[subnet-priv-a,subnet-priv-b],securityGroups=[sg-app]}'

aws deploy create-deployment-group --application-name orders-api --deployment-group-name prod \\
  --service-role-arn arn:aws:iam::123456789012:role/CodeDeployECSRole \\
  --deployment-config-name CodeDeployDefault.ECSCanary10Percent5Minutes \\
  --ecs-services clusterName=prod,serviceName=orders-api \\
  --auto-rollback-configuration enabled=true,events=DEPLOYMENT_FAILURE,DEPLOYMENT_STOP_ON_ALARM \\
  --alarm-configuration enabled=true,alarms=[{name=orders-api-5xx-rate}] \\
  --blue-green-deployment-configuration 'terminateBlueInstancesOnDeploymentSuccess={action=TERMINATE,terminationWaitTimeInMinutes=30},deploymentReadyOption={actionOnTimeout=CONTINUE_DEPLOYMENT}' \\
  --load-balancer-info 'targetGroupPairInfoList=[{targetGroups=[{name=orders-blue},{name=orders-green}],prodTrafficRoute={listenerArns=[arn:aws:elasticloadbalancing:us-east-1:123456789012:listener/app/prod/aaa/bbb]},testTrafficRoute={listenerArns=[arn:aws:elasticloadbalancing:us-east-1:123456789012:listener/app/prod/aaa/ccc]}}]'`,
            `// Graceful shutdown in a Node.js API: stop taking connections, drain, exit within stopTimeout
import http from "node:http";
import { pool } from "./db.js";

const server = http.createServer(app);
server.keepAliveTimeout = 5000;              // shorter than the ALB idle timeout (60 s)
server.listen(8080);

let healthy = true;
app.get("/health", (req, res) => (healthy ? res.send("ok") : res.status(503).send("draining")));

process.on("SIGTERM", () => {
  healthy = false;                            // fail health checks so the ALB stops routing
  console.log("SIGTERM: draining");
  server.close(async () => {                  // stop accepting, wait for in-flight requests
    await pool.end();
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 25_000);  // hard stop before ECS sends SIGKILL at stopTimeout (30 s)
});

// Dockerfile: exec form so node is PID 1 and actually receives SIGTERM
// CMD ["node", "server.js"]`,
          ],
          questions: [
            {
              question: "How do you achieve zero-downtime deployments on ECS?",
              solution: "<p>For a <strong>rolling update</strong>, set <code>minimumHealthyPercent</code> to 100 and <code>maximumPercent</code> to 200 so new tasks start and pass ALB health checks before old ones stop, enable the <strong>deployment circuit breaker</strong> with automatic rollback, and give the ALB a sensible deregistration delay so in-flight requests drain. For stricter control use <strong>blue/green with CodeDeploy</strong>: a second target group receives the new tasks, a test listener validates them, then traffic shifts linearly or canary-style with automatic rollback on alarms. Make sure the container handles SIGTERM gracefully within the stop timeout.</p>",
            },
            {
              question: "Users see a burst of 502 errors for a few seconds during every deploy even though health checks pass. What is happening?",
              solution: "<p>Old tasks are being killed while they still hold <strong>in-flight or keep-alive connections</strong>. Check three things: the ALB target group <strong>deregistration delay</strong> must be long enough for requests to finish (but ECS also waits for it, so 30 to 60 seconds is typical); the app must handle <code>SIGTERM</code> by closing the listener and finishing requests instead of dying instantly (a shell-form <code>CMD</code> often swallows the signal so the process is <code>SIGKILL</code>ed at <code>stopTimeout</code>); and the server's keep-alive timeout should be shorter than the ALB idle timeout so the ALB never reuses a connection the app has just closed. Failing the health endpoint on SIGTERM also helps the ALB stop routing faster.</p>",
            },
            {
              question: "Compare the deployment circuit breaker with CloudWatch alarm-based rollback.",
              solution: "<p>The <strong>circuit breaker</strong> watches <em>task launches</em>: if new tasks repeatedly fail to start or fail health checks (threshold scales with desired count, minimum 3, maximum 200), ECS marks the deployment failed and rolls back to the previous revision. It catches crashes, bad images and misconfiguration, but not a service that starts fine and returns 500s. <strong>Alarm-based rollback</strong> watches <em>metrics</em> you choose (5xx rate, latency, custom business metrics) during the deployment and a bake period afterwards, rolling back when an alarm fires. Use both: the breaker for fast structural failures, alarms for functional regressions.</p>",
            },
            {
              question: "What are the trade-offs between rolling updates and blue/green on ECS?",
              solution: "<p><strong>Rolling</strong> is simpler, needs one target group, costs at most double capacity briefly, and is built into the service; but old and new versions serve traffic simultaneously for the whole rollout and rollback means another rollout. <strong>Blue/green</strong> needs two target groups, listener rules and either CodeDeploy or the native ECS blue/green controller; in exchange you can validate green on a test listener before any user sees it, shift traffic in canary or linear steps with alarm-driven rollback, and revert in seconds by flipping the listener because blue is still running. Choose blue/green for high-risk or high-traffic services and rolling for the long tail.</p>",
            },
            {
              question: "How do database schema changes fit into a zero-downtime ECS deployment?",
              solution: "<p>During a rollout both revisions run at once, so every migration must be <strong>backwards compatible</strong>. Use the expand-migrate-contract pattern: first deploy a migration that <em>adds</em> the new column or table (run as a standalone <code>RunTask</code> or a pipeline step before the service update), then deploy code that writes to both and reads the new one, then in a later release remove the old column once no running revision needs it. Never drop or rename in the same release that stops writing to it, and keep migrations idempotent so a rollback followed by a re-deploy does not fail.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-ecs.html",
            "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-bluegreen.html",
            "https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-steps-ecs.html",
          ],
        },
        {
          topic: "EKS Pod Identity & IRSA",
          tags: ["aws", "eks", "irsa", "pod identity", "iam", "oidc"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Pods need to call AWS APIs, and the naive answer, giving the <strong>node instance role</strong> broad permissions, means every pod on the node inherits them. EKS offers two mechanisms to give <strong>each workload its own IAM role</strong>: the older <strong>IAM Roles for Service Accounts (IRSA)</strong> and the newer <strong>EKS Pod Identity</strong>. Both map a Kubernetes service account to an IAM role; they differ in how the trust is established and how much per-cluster plumbing you maintain.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">IRSA (IAM Roles for Service Accounts)</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Each EKS cluster has an <strong>OIDC issuer URL</strong>. You register it as an <strong>IAM OIDC identity provider</strong> once per cluster.</li>
  <li>The IAM role's trust policy allows <code>sts:AssumeRoleWithWebIdentity</code> when the token's <code>sub</code> claim equals <code>system:serviceaccount:&lt;namespace&gt;:&lt;service-account&gt;</code> and <code>aud</code> equals <code>sts.amazonaws.com</code>.</li>
  <li>The service account carries the annotation <code>eks.amazonaws.com/role-arn</code>. A mutating webhook injects a <strong>projected service account token</strong> volume plus <code>AWS_ROLE_ARN</code> and <code>AWS_WEB_IDENTITY_TOKEN_FILE</code> environment variables into the pod.</li>
  <li>The AWS SDK's default credential chain exchanges the token for temporary credentials via STS and refreshes them automatically.</li>
  <li>Works on EKS and on self-managed Kubernetes with the same webhook; supports cross-account roles directly since trust is on the OIDC provider.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">EKS Pod Identity</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Install the <strong>eks-pod-identity-agent</strong> add-on, which runs as a DaemonSet on each node and serves credentials on a link-local address.</li>
  <li>The IAM role trusts the single service principal <code>pods.eks.amazonaws.com</code> with <code>sts:AssumeRole</code> and <code>sts:TagSession</code>; no OIDC provider per cluster.</li>
  <li>You create a <strong>Pod Identity Association</strong> (cluster, namespace, service account, role ARN) through the EKS API. One role can be associated with many clusters without editing its trust policy.</li>
  <li>The SDK receives credentials through the container credential provider (<code>AWS_CONTAINER_CREDENTIALS_FULL_URI</code> plus an auth token file), so it needs a reasonably recent SDK version.</li>
  <li>Supports <strong>session tags</strong> (cluster name, namespace, service account) for ABAC policies, and <strong>target role chaining</strong> for cross-account access.</li>
  <li>Limitations: EKS only, not supported on Fargate pods or Windows nodes, and the agent add-on must be present.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Choosing</h4>
<pre><code class="language-text">Many clusters sharing roles, want simple trust policies, EC2 nodes  -> Pod Identity
Fargate pods, self-managed Kubernetes, existing tooling, old SDKs    -> IRSA
Cross-account access                                                 -> both (Pod Identity via target role)
Attribute-based policies on cluster/namespace tags                   -> Pod Identity (session tags)</code></pre>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Hardening the node role</h4>
<p style="line-height: 1.75;">Whichever you pick, keep the node instance role minimal (CNI, ECR pull, SSM) and stop pods from reading <strong>instance metadata</strong> by setting the IMDSv2 hop limit to 1 or using a network policy, otherwise a pod can bypass its own role and use the node's. Move the VPC CNI itself to IRSA or Pod Identity so even that permission leaves the node role.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Both IRSA and Pod Identity give a pod its own IAM role through its Kubernetes service account instead of the node role. IRSA uses the cluster's OIDC issuer and a projected token exchanged with AssumeRoleWithWebIdentity, so the trust policy names the namespace and service account. Pod Identity replaces that with an agent add-on, a single pods.eks.amazonaws.com trust principal and an association object, which scales better across clusters and adds session tags. I default to Pod Identity on EC2 nodes, keep IRSA for Fargate pods, and lock down IMDS on the nodes."</div>
</div>`,
          examples: [
            `# IRSA: OIDC provider once per cluster, then a role bound to namespace/service-account
eksctl utils associate-iam-oidc-provider --cluster prod --approve

eksctl create iamserviceaccount --cluster prod --namespace orders --name orders-api \\
  --attach-policy-arn arn:aws:iam::123456789012:policy/orders-api-access --approve

# What eksctl generated behind the scenes: trust policy on the role
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "Federated": "arn:aws:iam::123456789012:oidc-provider/oidc.eks.us-east-1.amazonaws.com/id/EXAMPLED539D4633E53DE1B71EXAMPLE" },
    "Action": "sts:AssumeRoleWithWebIdentity",
    "Condition": {
      "StringEquals": {
        "oidc.eks.us-east-1.amazonaws.com/id/EXAMPLED539D4633E53DE1B71EXAMPLE:sub": "system:serviceaccount:orders:orders-api",
        "oidc.eks.us-east-1.amazonaws.com/id/EXAMPLED539D4633E53DE1B71EXAMPLE:aud": "sts.amazonaws.com"
      }
    }
  }]
}

# ...and the annotated service account the pod references
apiVersion: v1
kind: ServiceAccount
metadata:
  name: orders-api
  namespace: orders
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::123456789012:role/eksctl-prod-addon-iamserviceaccount-orders-Role1
---
apiVersion: apps/v1
kind: Deployment
metadata: { name: orders-api, namespace: orders }
spec:
  replicas: 3
  selector: { matchLabels: { app: orders-api } }
  template:
    metadata: { labels: { app: orders-api } }
    spec:
      serviceAccountName: orders-api          # pod gets AWS_ROLE_ARN + projected token
      containers:
        - name: api
          image: 123456789012.dkr.ecr.us-east-1.amazonaws.com/orders-api:1.4.2`,
            `# EKS Pod Identity: agent add-on, a role trusting pods.eks.amazonaws.com, an association
aws eks create-addon --cluster-name prod --addon-name eks-pod-identity-agent

aws iam create-role --role-name orders-api-pod-role --assume-role-policy-document '{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "Service": "pods.eks.amazonaws.com" },
    "Action": ["sts:AssumeRole", "sts:TagSession"]
  }]
}'
aws iam attach-role-policy --role-name orders-api-pod-role \\
  --policy-arn arn:aws:iam::123456789012:policy/orders-api-access

aws eks create-pod-identity-association --cluster-name prod \\
  --namespace orders --service-account orders-api \\
  --role-arn arn:aws:iam::123456789012:role/orders-api-pod-role

# ABAC using the session tags Pod Identity adds automatically
{
  "Effect": "Allow",
  "Action": "s3:GetObject",
  "Resource": "arn:aws:s3:::tenant-data/*",
  "Condition": { "StringEquals": { "s3:ExistingObjectTag/namespace": "\${aws:PrincipalTag/kubernetes-namespace}" } }
}

# Verify from inside a pod
kubectl -n orders exec deploy/orders-api -- aws sts get-caller-identity
# -> assumed-role/orders-api-pod-role/eks-prod-orders-api-...`,
          ],
          questions: [
            {
              question: "How do pods on EKS get AWS permissions securely?",
              solution: "<p>Use <strong>IAM Roles for Service Accounts (IRSA)</strong> or the newer <strong>EKS Pod Identity</strong>. The cluster has an OIDC issuer; you create an IAM role whose trust policy allows a specific Kubernetes service account in a specific namespace to assume it via <code>sts:AssumeRoleWithWebIdentity</code>. Pods using that service account get a projected token, and the AWS SDK exchanges it for temporary credentials automatically. This gives per-workload least privilege and avoids giving the whole node's instance role to every pod.</p>",
            },
            {
              question: "What are the main differences between IRSA and EKS Pod Identity?",
              solution: "<p><strong>Trust model:</strong> IRSA needs an IAM OIDC provider per cluster and a trust policy naming the namespace and service account; Pod Identity uses one principal, <code>pods.eks.amazonaws.com</code>, and an EKS-side <strong>association</strong>, so one role can serve many clusters without policy edits. <strong>Mechanics:</strong> IRSA injects a projected token and env vars via webhook; Pod Identity runs an <strong>agent DaemonSet</strong> that serves credentials over the container credential endpoint. <strong>Features:</strong> Pod Identity adds session tags for ABAC and simpler cross-account chaining; IRSA works on Fargate pods and self-managed Kubernetes, which Pod Identity does not.</p>",
            },
            {
              question: "A pod using IRSA gets AccessDenied on AssumeRoleWithWebIdentity. What do you check?",
              solution: "<p>First that the <strong>OIDC provider</strong> for this cluster exists in IAM and its URL and thumbprint match the cluster issuer. Then the role trust policy: the <code>sub</code> condition must be exactly <code>system:serviceaccount:&lt;namespace&gt;:&lt;name&gt;</code> and <code>aud</code> must be <code>sts.amazonaws.com</code>, with the right provider host in the condition keys. Then the pod itself: it must reference the annotated <code>serviceAccountName</code>, the annotation must hold the role ARN, and the pod must have been created after the annotation so the webhook injected <code>AWS_ROLE_ARN</code> and the token volume (restart it). Finally confirm the SDK version supports web identity and that <code>kubectl exec ... env | grep AWS</code> shows the variables.</p>",
            },
            {
              question: "Why is relying on the node instance role for pod permissions dangerous?",
              solution: "<p>All pods scheduled on a node can reach the <strong>instance metadata service</strong> and obtain the node role's credentials, so the effective permission of every pod becomes the union of everything any pod on that node needs. A compromised low-value pod could read production secrets or delete S3 data. Least privilege demands per-workload roles via IRSA or Pod Identity, a node role limited to CNI, ECR pull and SSM, and blocking pod access to IMDS by setting the <strong>IMDSv2 hop limit to 1</strong> or applying a network policy that denies <code>169.254.169.254</code>.</p>",
            },
            {
              question: "How do you give an EKS pod access to a resource in a different AWS account?",
              solution: "<p>With <strong>IRSA</strong>, create the role in the <em>target</em> account with a trust policy that federates the source cluster's OIDC provider (the provider must be registered in the target account too) and annotate the service account with that role ARN; the pod assumes it directly. With <strong>Pod Identity</strong>, use a <strong>target role</strong>: the association names a role in the cluster account, and you configure a target role ARN in the other account that the pod-identity role is allowed to assume via role chaining, so the pod receives credentials for the target account without any OIDC setup there. In both cases the target resource policy (bucket, table, KMS key) must also allow that role.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/eks/latest/userguide/pod-identities.html",
            "https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html",
            "https://docs.aws.amazon.com/eks/latest/userguide/pod-id-how-it-works.html",
          ],
        },
        {
          topic: "Autoscaling & Capacity Providers",
          tags: ["aws", "ecs", "autoscaling", "capacity provider", "karpenter", "target tracking"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Container autoscaling is a <strong>two-layer</strong> problem. The first layer scales the <em>workload</em>: how many task copies or pod replicas should run. The second layer scales the <em>capacity</em>: how many hosts exist for them to land on. Fargate collapses the second layer, which is much of its appeal; on EC2 you must solve both, and interviewers like to see that you know the two layers are coupled but configured separately.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Layer 1: ECS Service Auto Scaling</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Built on <strong>Application Auto Scaling</strong>: register the service's <code>DesiredCount</code> as a scalable target with min and max, then attach policies.</li>
  <li><strong>Target tracking</strong> keeps a metric near a goal: <code>ECSServiceAverageCPUUtilization</code>, <code>ECSServiceAverageMemoryUtilization</code>, or <code>ALBRequestCountPerTarget</code>. Scale-out is aggressive, scale-in is conservative by design. This is the default choice.</li>
  <li><strong>Step scaling</strong> maps alarm breach sizes to increments, useful for custom metrics such as SQS queue depth per task (backlog per instance).</li>
  <li><strong>Scheduled scaling</strong> raises the minimum before a known peak or drops dev environments to zero at night.</li>
  <li><strong>Predictive scaling</strong> uses ML on historical load to pre-provision for daily and weekly patterns.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Layer 2: capacity providers</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><code>FARGATE</code> and <code>FARGATE_SPOT</code> are built-in; capacity is effectively infinite within account quotas.</li>
  <li>An <strong>EC2 capacity provider</strong> wraps an Auto Scaling group. With <strong>managed scaling</strong> enabled, ECS publishes a <code>CapacityProviderReservation</code> metric (desired capacity needed as a percentage of current) and drives the ASG toward a <code>targetCapacity</code>, for example 90% to keep some headroom or 100% for maximum density.</li>
  <li><strong>Managed termination protection</strong> stops the ASG from terminating instances that still run tasks; <strong>managed instance draining</strong> moves tasks off instances that are being retired.</li>
  <li>A <strong>capacity provider strategy</strong> on the service mixes providers with <code>base</code> (fixed tasks on one provider) and <code>weight</code> (ratio for the rest), which is how you blend on-demand and Spot or EC2 and Fargate.</li>
  <li>Tasks that cannot be placed wait in <code>PROVISIONING</code> until managed scaling adds an instance; task start on EC2 therefore ranges from seconds (warm node) to minutes (new instance).</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The EKS equivalents</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Workload layer: <strong>Horizontal Pod Autoscaler</strong> on CPU, memory or custom metrics; <strong>KEDA</strong> for event-driven scaling (SQS, Kafka, cron) including scale to zero; <strong>VPA</strong> for right-sizing requests.</li>
  <li>Capacity layer: <strong>Cluster Autoscaler</strong> grows node groups when pods are unschedulable; <strong>Karpenter</strong> replaces node groups with just-in-time provisioning that picks the cheapest instance type fitting pending pods, consolidates under-used nodes and handles Spot interruption; <strong>EKS Auto Mode</strong> bundles this management.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Tuning advice</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Pick the metric that actually saturates: CPU for compute-bound APIs, request count per target for I/O-bound ones, queue backlog per task for workers.</li>
  <li>Set <strong>cooldowns</strong> so scale-in does not fight scale-out, and keep <code>min</code> high enough to absorb a sudden spike while new tasks start.</li>
  <li>Watch the ALB <strong>health check grace period</strong> and container start time; slow starts make target tracking overshoot.</li>
  <li>On EC2, leave headroom (<code>targetCapacity</code> below 100) if task start latency matters, and use multiple instance types for Spot resilience.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "I scale in two layers. Service Auto Scaling with target tracking on CPU or ALB requests per target adjusts the desired task count; for queue workers I use step scaling on backlog per task. On Fargate that is all. On EC2 a capacity provider with managed scaling drives the Auto Scaling group toward a target reservation so instances appear when tasks are stuck in PROVISIONING, with termination protection so busy nodes are not killed. On EKS the equivalents are HPA or KEDA for pods and Karpenter for nodes."</div>
</div>`,
          examples: [
            `# Layer 1: service autoscaling with target tracking on ALB requests per target
aws application-autoscaling register-scalable-target --service-namespace ecs \\
  --resource-id service/prod/orders-api --scalable-dimension ecs:service:DesiredCount \\
  --min-capacity 3 --max-capacity 30

aws application-autoscaling put-scaling-policy --service-namespace ecs \\
  --resource-id service/prod/orders-api --scalable-dimension ecs:service:DesiredCount \\
  --policy-name orders-api-rps --policy-type TargetTrackingScaling \\
  --target-tracking-scaling-policy-configuration '{
    "TargetValue": 400,
    "PredefinedMetricSpecification": {
      "PredefinedMetricType": "ALBRequestCountPerTarget",
      "ResourceLabel": "app/prod/aaa111/targetgroup/orders/bbb222"
    },
    "ScaleOutCooldown": 60,
    "ScaleInCooldown": 300
  }'

# Queue worker: step scaling on a custom "backlog per task" metric
aws cloudwatch put-metric-alarm --alarm-name thumbnails-backlog-high \\
  --metric-name BacklogPerTask --namespace Orders/Workers --statistic Average \\
  --period 60 --evaluation-periods 2 --threshold 100 --comparison-operator GreaterThanThreshold \\
  --alarm-actions arn:aws:autoscaling:us-east-1:123456789012:scalingPolicy:...:policyName/thumbnails-step-out

aws application-autoscaling put-scaling-policy --service-namespace ecs \\
  --resource-id service/prod/thumbnail-worker --scalable-dimension ecs:service:DesiredCount \\
  --policy-name thumbnails-step-out --policy-type StepScaling \\
  --step-scaling-policy-configuration '{
    "AdjustmentType": "PercentChangeInCapacity",
    "StepAdjustments": [
      { "MetricIntervalLowerBound": 0,   "MetricIntervalUpperBound": 200, "ScalingAdjustment": 50 },
      { "MetricIntervalLowerBound": 200, "ScalingAdjustment": 100 }
    ],
    "Cooldown": 120, "MinAdjustmentMagnitude": 1
  }'`,
            `# Layer 2: EC2 capacity provider with managed scaling and a mixed strategy
aws ecs create-capacity-provider --name prod-ec2-graviton \\
  --auto-scaling-group-provider '{
    "autoScalingGroupArn": "arn:aws:autoscaling:us-east-1:123456789012:autoScalingGroup:uuid:autoScalingGroupName/ecs-prod-arm",
    "managedScaling": { "status": "ENABLED", "targetCapacity": 90, "minimumScalingStepSize": 1, "maximumScalingStepSize": 10, "instanceWarmupPeriod": 120 },
    "managedTerminationProtection": "ENABLED",
    "managedDraining": "ENABLED"
  }'

aws ecs put-cluster-capacity-providers --cluster prod \\
  --capacity-providers prod-ec2-graviton FARGATE FARGATE_SPOT \\
  --default-capacity-provider-strategy capacityProvider=prod-ec2-graviton,weight=1

# Overflow to Fargate when the EC2 fleet is full: base 6 on EC2, then 1:1
aws ecs update-service --cluster prod --service orders-api \\
  --capacity-provider-strategy capacityProvider=prod-ec2-graviton,base=6,weight=1 capacityProvider=FARGATE,weight=1

# EKS equivalent: Karpenter NodePool that picks the cheapest fitting Spot or on-demand instance
apiVersion: karpenter.sh/v1
kind: NodePool
metadata: { name: default }
spec:
  template:
    spec:
      requirements:
        - { key: karpenter.sh/capacity-type, operator: In, values: ["spot", "on-demand"] }
        - { key: kubernetes.io/arch, operator: In, values: ["arm64", "amd64"] }
        - { key: karpenter.k8s.aws/instance-category, operator: In, values: ["c", "m", "r"] }
      nodeClassRef: { group: karpenter.k8s.aws, kind: EC2NodeClass, name: default }
  disruption:
    consolidationPolicy: WhenEmptyOrUnderutilized
    consolidateAfter: 1m
  limits: { cpu: "500" }`,
          ],
          questions: [
            {
              question: "How does ECS service autoscaling differ from cluster (capacity) autoscaling, and why do you need both on EC2?",
              solution: "<p><strong>Service autoscaling</strong> changes the service's <code>desiredCount</code> based on metrics such as CPU or requests per target; it decides how many tasks <em>should</em> run. <strong>Capacity autoscaling</strong> changes how many EC2 instances exist for those tasks to be placed on, driven by the capacity provider's managed scaling and the <code>CapacityProviderReservation</code> metric. Without the second layer, service autoscaling would raise the desired count and tasks would sit in <code>PROVISIONING</code> with no host. On Fargate the capacity layer is AWS's problem, so only service autoscaling is configured.</p>",
            },
            {
              question: "Which metric would you autoscale a queue-consuming ECS service on, and how?",
              solution: "<p>Not CPU, which may be low while messages pile up. Use <strong>backlog per task</strong>: publish a custom CloudWatch metric equal to <code>ApproximateNumberOfMessagesVisible</code> divided by the running task count (a small Lambda or the service itself can emit it), then attach a <strong>target tracking</strong> policy to keep it at, say, 50 messages per task, or step scaling with larger increments for larger breaches. Give the policy a long scale-in cooldown so a briefly empty queue does not collapse the fleet, and set <code>minCapacity</code> to 1 (or 0 with a separate scheduled or event-driven kick-start) for cost.</p>",
            },
            {
              question: "What does targetCapacity mean on an ECS capacity provider, and what value would you choose?",
              solution: "<p>Managed scaling computes <code>CapacityProviderReservation</code>, the ratio of capacity needed by running and pending tasks to capacity currently in the Auto Scaling group, and adjusts the group so that ratio approaches <strong>targetCapacity</strong>. At <strong>100%</strong> the ASG is sized exactly for current tasks, maximising density but forcing every scale-out to wait for a new instance. At <strong>80 to 90%</strong> you keep spare instances warm so new tasks start in seconds at the cost of some idle compute. Latency-sensitive services usually use around 90%; batch clusters can run at 100%.</p>",
            },
            {
              question: "Explain base and weight in a capacity provider strategy with an example.",
              solution: "<p><code>base</code> is the fixed number of tasks that must run on that provider before any weighting applies; only one provider in a strategy can have a base. <code>weight</code> then sets the ratio for the remaining tasks. With <code>FARGATE base=2 weight=1</code> and <code>FARGATE_SPOT weight=3</code>, a service with desired count 10 runs 2 tasks on Fargate on-demand as the guaranteed floor, and the other 8 are split 1:3, so 2 more on-demand and 6 on Spot. The same mechanism lets you fill a reserved EC2 fleet first (<code>base</code>) and overflow to Fargate.</p>",
            },
            {
              question: "How does Karpenter differ from the Kubernetes Cluster Autoscaler on EKS?",
              solution: "<p><strong>Cluster Autoscaler</strong> works through pre-defined node groups (Auto Scaling groups) of a single instance type each and only scales a group up or down when pods are unschedulable, so it is slow and needs many groups for flexibility. <strong>Karpenter</strong> watches pending pods and directly launches the <strong>cheapest instance type</strong> that satisfies their requirements from a broad list, in seconds and without node groups; it also <strong>consolidates</strong> by replacing under-utilised or over-sized nodes, handles Spot interruptions and drift, and expresses all of this in <code>NodePool</code> and <code>EC2NodeClass</code> resources. It is the recommended approach for cost-efficient EKS data planes.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-auto-scaling.html",
            "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cluster-capacity-providers.html",
            "https://docs.aws.amazon.com/eks/latest/best-practices/karpenter.html",
          ],
        },
      ],
    },
  ],
};
