/** AWS Lambda — serverless, event-driven compute */
export const awsLambda = {
  id: 104,
  category: "AWS Lambda",
  themeBgColor: "#FFEDD5",
  textColor: "#9A3412",
  topicColor: "#EA580C",
  lightColor: "#FFF7ED",
  type: [
    {
      id: 1,
      label: "Beginner",
      concepts: [
        {
          topic: "Lambda Fundamentals & Execution Model",
          tags: ["aws", "lambda", "serverless", "handler", "runtime"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>AWS Lambda</strong> is serverless, event-driven compute: you upload a function, choose memory, and AWS runs it in response to events, scaling from zero to thousands of concurrent executions and billing only for the milliseconds used. There are no servers to patch or capacity to plan, which makes Lambda the default glue for APIs, file processing, stream consumers and scheduled jobs.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The handler</h4>
<p style="line-height: 1.75;">The entry point receives an <code>event</code> (the JSON payload from the trigger) and a <code>context</code> (request ID, remaining time, function metadata). Supported runtimes include Node.js, Python, Java, Go, .NET and Ruby, plus custom runtimes and <strong>container images</strong> up to 10 GB.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The execution environment lifecycle</h4>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Init:</strong> Lambda creates a Firecracker micro-VM, downloads your code, starts the runtime and runs code outside the handler (imports, SDK clients). This is the <strong>cold start</strong>.</li>
  <li><strong>Invoke:</strong> The handler runs. One environment handles <strong>one request at a time</strong>.</li>
  <li><strong>Reuse:</strong> After the response the environment is frozen and kept warm for minutes; the next request reuses it (<strong>warm start</strong>), including anything cached in module scope or <code>/tmp</code>.</li>
  <li><strong>Shutdown:</strong> Idle environments are eventually reclaimed.</li>
</ol>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Configuration knobs</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Memory:</strong> 128 MB to 10,240 MB; <strong>CPU and network scale with memory</strong>, so more memory is often faster and cheaper overall.</li>
  <li><strong>Timeout:</strong> Up to 15 minutes.</li>
  <li><strong>Ephemeral storage:</strong> 512 MB to 10 GB at <code>/tmp</code>.</li>
  <li><strong>Environment variables, layers</strong> (shared dependencies), <strong>architecture</strong> (x86_64 or arm64 Graviton, about 20% cheaper).</li>
  <li><strong>Execution role:</strong> The IAM role the function assumes to call other AWS services.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Pricing</h4>
<p style="line-height: 1.75;">Requests (first million free monthly) plus GB-seconds of duration, rounded to the millisecond. A function with 1 GB memory running 100 ms costs about 0.1 GB-seconds. Idle costs nothing, which is the whole point.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Lambda runs my handler inside a micro-VM that is created on a cold start and reused for warm invocations, one request per environment at a time. I configure memory, which also sets CPU, a timeout up to 15 minutes, and an execution role, and I pay per request and per millisecond of duration so idle capacity is free."</div>
</div>`,
          examples: [
            `// index.mjs - the anatomy of a handler
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

// Runs once per execution environment (cold start), reused on warm starts
const ddb = new DynamoDBClient({});
const TABLE = process.env.TABLE_NAME;

export const handler = async (event, context) => {
  console.log(JSON.stringify({ requestId: context.awsRequestId, remainingMs: context.getRemainingTimeInMillis() }));
  const body = JSON.parse(event.body || "{}");
  // ... business logic using ddb and TABLE ...
  return { statusCode: 200, headers: { "content-type": "application/json" }, body: JSON.stringify({ ok: true, id: body.id }) };
};`,
            `# Package, create and invoke
zip -r function.zip index.mjs node_modules
aws lambda create-function --function-name orders-api \\
  --runtime nodejs20.x --architectures arm64 --handler index.handler \\
  --role arn:aws:iam::123456789012:role/orders-api-role \\
  --zip-file fileb://function.zip --memory-size 1024 --timeout 10 \\
  --environment Variables={TABLE_NAME=orders}

aws lambda invoke --function-name orders-api \\
  --payload '{"body":"{\\"id\\":\\"o-1\\"}"}' --cli-binary-format raw-in-base64-out out.json && cat out.json`,
          ],
          questions: [
            {
              question: "What is AWS Lambda and what problems does it solve?",
              solution: "<p>Lambda is a <strong>serverless compute service</strong> that runs your code in response to events without you provisioning or managing servers. It solves capacity planning (it scales per request), operations (AWS patches the OS and runtime), and cost for spiky or low-volume workloads (you pay only per invocation and millisecond). It fits APIs, file and stream processing, scheduled jobs and glue between AWS services, but not long-running or very high steady-throughput workloads.</p>",
            },
            {
              question: "Why should you initialise SDK clients outside the handler?",
              solution: "<p>Code outside the handler runs once during the <strong>Init phase</strong> of an execution environment and the result is kept in memory for every subsequent <strong>warm invocation</strong>. Creating SDK clients, database connection pools or loading configuration there avoids repeating that work per request, cutting latency and cost. Anything created inside the handler is rebuilt every time. The same applies to caching secrets or reference data with a TTL.</p>",
            },
            {
              question: "How do memory and CPU relate in Lambda, and how do you choose the memory size?",
              solution: "<p>You configure only memory (128 MB to 10 GB); Lambda allocates <strong>CPU proportionally</strong>, reaching a full vCPU around 1,769 MB and up to six vCPUs at 10 GB. Because billing is memory times duration, a CPU-bound function often becomes <strong>faster and cheaper</strong> with more memory. Use <strong>AWS Lambda Power Tuning</strong> (a Step Functions state machine) to run the function at several sizes and pick the cost or speed optimum from real measurements.</p>",
            },
            {
              question: "What is the maximum Lambda timeout and what do you do for longer jobs?",
              solution: "<p>The maximum timeout is <strong>15 minutes</strong>. For longer work, break it into steps orchestrated by <strong>Step Functions</strong>, process in chunks driven by SQS or a Map state, or move the job to <strong>AWS Batch</strong>, <strong>ECS/Fargate</strong> tasks or a container that can run for hours. Also check whether the work can be made incremental so each invocation checkpoints its progress.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html",
            "https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtime-environment.html",
            "https://docs.aws.amazon.com/lambda/latest/dg/configuration-memory.html",
          ],
        },
        {
          topic: "Invocation Models & Event Sources",
          tags: ["aws", "lambda", "event-driven", "sqs", "api gateway", "s3 events"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Lambda is <strong>event-driven</strong>: something happens, and Lambda runs your function with a JSON description of it. How that event arrives determines how errors and retries behave, so interviewers expect you to know the three invocation models by heart.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">1. Synchronous (request-response)</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Sources: <strong>API Gateway</strong>, <strong>Application Load Balancer</strong>, <strong>Function URLs</strong>, Cognito triggers, direct SDK <code>Invoke</code>.</li>
  <li>The caller waits for the response and receives errors directly; <strong>Lambda does not retry</strong>. The client (or API Gateway) decides.</li>
  <li>Typical for REST and GraphQL APIs. API Gateway adds a 29-second integration timeout.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">2. Asynchronous (fire and forget)</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Sources: <strong>S3 events</strong>, <strong>SNS</strong>, <strong>EventBridge</strong>, CloudWatch Logs, CodeCommit, SES.</li>
  <li>Lambda places the event in an internal queue, returns 202 to the caller, and invokes the function. On failure it <strong>retries twice</strong> with backoff (about 1 and 2 minutes).</li>
  <li>After the retries the event goes to an <strong>on-failure destination</strong> (SQS, SNS, EventBridge, another function) or a <strong>dead-letter queue</strong>. Configure <strong>maximum event age</strong> and <strong>retry attempts</strong> per function.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">3. Poll-based (event source mappings)</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Sources: <strong>SQS</strong>, <strong>Kinesis Data Streams</strong>, <strong>DynamoDB Streams</strong>, Amazon MSK and self-managed <strong>Kafka</strong>, MQ, DocumentDB.</li>
  <li>Lambda runs pollers on your behalf that read <strong>batches</strong> and invoke the function synchronously with the batch.</li>
  <li>Controls: <strong>batch size</strong>, <strong>batching window</strong>, <strong>filter criteria</strong> (skip irrelevant records before invocation), <strong>partial batch responses</strong> (report only the failed items), and for streams <strong>parallelization factor</strong>, <strong>bisect on error</strong>, and <strong>maximum retry attempts</strong>.</li>
  <li>SQS failures return the messages to the queue after the visibility timeout; stream failures block the shard until resolved or expired.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Event shapes</h4>
<pre><code class="language-json">// S3 (async): event.Records[0].s3.bucket.name, .s3.object.key
// SQS (poll):  event.Records[0].body, .messageId, .receiptHandle
// API Gateway HTTP API (sync): event.requestContext.http.method, event.rawPath, event.body</code></pre>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Lambda Destinations vs DLQ</h4>
<p style="line-height: 1.75;">Destinations (for async invocations) are the modern option: they capture the full invocation record for <strong>both success and failure</strong> and can target SQS, SNS, EventBridge or Lambda. Dead-letter queues only capture failures and only the original event payload.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "There are three invocation models. Synchronous sources like API Gateway wait for the response and handle errors themselves. Asynchronous sources like S3 and EventBridge queue the event, retry twice and then send it to a failure destination. Poll-based sources like SQS and Kinesis are read in batches by Lambda's pollers, and I tune batch size, filters and partial batch responses so a single bad record does not force the whole batch to be retried."</div>
</div>`,
          examples: [
            `# SQS event source mapping with filtering and partial batch responses
aws lambda create-event-source-mapping --function-name process-orders \\
  --event-source-arn arn:aws:sqs:us-east-1:123456789012:orders \\
  --batch-size 10 --maximum-batching-window-in-seconds 5 \\
  --function-response-types ReportBatchItemFailures \\
  --filter-criteria '{"Filters":[{"Pattern":"{\\"body\\":{\\"type\\":[\\"OrderPaid\\"]}}"}]}'

# Async invocation config: fewer retries, short max age, failure destination
aws lambda put-function-event-invoke-config --function-name resize-images \\
  --maximum-retry-attempts 1 --maximum-event-age-in-seconds 600 \\
  --destination-config '{"OnFailure":{"Destination":"arn:aws:sqs:us-east-1:123456789012:resize-failures"}}'

# S3 -> Lambda notification (async)
aws s3api put-bucket-notification-configuration --bucket my-uploads --notification-configuration '{
  "LambdaFunctionConfigurations": [{
    "LambdaFunctionArn": "arn:aws:lambda:us-east-1:123456789012:function:resize-images",
    "Events": ["s3:ObjectCreated:*"],
    "Filter": {"Key": {"FilterRules": [{"Name": "suffix", "Value": ".jpg"}]}}
  }]
}'`,
            `// Partial batch response: only failed messages return to the queue
export const handler = async (event) => {
  const batchItemFailures = [];
  for (const record of event.Records) {
    try {
      await processOrder(JSON.parse(record.body));
    } catch (err) {
      console.error("failed", record.messageId, err);
      batchItemFailures.push({ itemIdentifier: record.messageId });
    }
  }
  return { batchItemFailures };
};`,
          ],
          questions: [
            {
              question: "How does Lambda handle failures for synchronous, asynchronous and stream-based invocations?",
              solution: "<p><strong>Synchronous:</strong> the error is returned to the caller, which decides whether to retry. <strong>Asynchronous:</strong> Lambda retries up to two more times with backoff, then routes the event to an on-failure destination or dead-letter queue. <strong>Poll-based (SQS):</strong> a failed batch becomes visible again after the visibility timeout and is retried until <code>maxReceiveCount</code> sends it to the queue's DLQ; partial batch responses let you retry only the failed messages. <strong>Kinesis/DynamoDB Streams:</strong> the shard is blocked and the batch retried until success, record expiry, or bisect/max-retry settings kick in, so poison records need explicit handling.</p>",
            },
            {
              question: "What is an event source mapping?",
              solution: "<p>An event source mapping is a Lambda-managed resource that <strong>polls a source</strong> (SQS, Kinesis, DynamoDB Streams, Kafka, MQ) and invokes your function with batches of records; the source itself never calls Lambda. You configure batch size, batching window, filter criteria, starting position for streams, concurrency limits, error handling (bisect, retries, destinations) and partial batch responses. It is what makes queue and stream consumption serverless without writing a polling loop.</p>",
            },
            {
              question: "Why use event filtering on an event source mapping?",
              solution: "<p>Filter criteria let Lambda <strong>discard records that do not match a pattern before invoking</strong> your function, for example only DynamoDB stream records where <code>eventName</code> is INSERT or only SQS messages of a certain type. That saves invocations and cost, removes boilerplate from the handler, and for SQS the non-matching messages are deleted so they do not clog the queue. It uses the same pattern syntax as EventBridge rules.</p>",
            },
            {
              question: "What is the difference between a dead-letter queue and Lambda Destinations?",
              solution: "<p>A <strong>DLQ</strong> (SQS or SNS) receives only the <strong>original event</strong> of asynchronous invocations that failed all retries. <strong>Destinations</strong> are newer and richer: you can configure separate targets for <strong>OnSuccess and OnFailure</strong>, targets include SQS, SNS, EventBridge and Lambda, and the record contains the request, the response or error, and metadata such as the retry count. Destinations are the recommended choice; DLQs remain for backward compatibility.</p>",
            },
            {
              question: "How do you connect Lambda to an HTTP client?",
              solution: "<p>Three managed options: <strong>API Gateway</strong> (REST or HTTP API) for routing, authorizers, throttling, caching and usage plans; an <strong>Application Load Balancer</strong> target group when Lambda sits alongside containers behind one ALB; or a <strong>Function URL</strong>, a dedicated HTTPS endpoint with IAM or no auth, ideal for webhooks and simple internal tools. All three invoke the function synchronously and translate the HTTP request into an event object.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/lambda/latest/dg/lambda-invocation.html",
            "https://docs.aws.amazon.com/lambda/latest/dg/invocation-eventsourcemapping.html",
            "https://docs.aws.amazon.com/lambda/latest/dg/invocation-async.html",
          ],
        },
        {
          topic: "Permissions, Roles & VPC Access",
          tags: ["aws", "lambda", "iam", "execution role", "vpc"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Two separate permission questions apply to every Lambda function: <strong>what may the function do</strong> (its execution role), and <strong>who may invoke the function</strong> (its resource-based policy). Confusing the two is a classic interview trap.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Execution role</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>An IAM role the Lambda service <strong>assumes</strong> when running your code; the SDK inside the function picks up its temporary credentials automatically.</li>
  <li>Needs at least <code>logs:CreateLogGroup</code>, <code>logs:CreateLogStream</code> and <code>logs:PutLogEvents</code> (the <code>AWSLambdaBasicExecutionRole</code> managed policy).</li>
  <li>Add least-privilege statements for the resources the function touches: one table, one bucket prefix, one queue. Avoid wildcard resources.</li>
  <li>Poll-based sources need the role to read the source (<code>sqs:ReceiveMessage</code>, <code>kinesis:GetRecords</code>), because Lambda's poller uses the function's role.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Resource-based policy (who can invoke)</h4>
<p style="line-height: 1.75;">Push-based sources such as S3, SNS, EventBridge and API Gateway need <code>lambda:InvokeFunction</code> permission granted <strong>on the function</strong>, usually with <code>aws:SourceArn</code> so only one bucket or rule can trigger it. Cross-account invocation is also granted here. <code>aws lambda add-permission</code> manages it.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Lambda in a VPC</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Needed only to reach <strong>private resources</strong>: RDS, ElastiCache, internal ALBs, on-premises via VPN.</li>
  <li>Lambda creates <strong>Hyperplane ENIs</strong> in your subnets (shared across functions with the same subnet and security group combination), so scaling no longer burns one ENI per environment.</li>
  <li>A VPC-attached function <strong>loses internet access</strong> unless its subnets route through a NAT Gateway; use private subnets plus NAT, or VPC endpoints for AWS services.</li>
  <li>The execution role needs <code>ec2:CreateNetworkInterface</code>, <code>DescribeNetworkInterfaces</code> and <code>DeleteNetworkInterface</code> (<code>AWSLambdaVPCAccessExecutionRole</code>).</li>
  <li>Use <strong>RDS Proxy</strong> when connecting to relational databases so thousands of concurrent functions do not exhaust connections.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Secrets and configuration</h4>
<p style="line-height: 1.75;">Environment variables are encrypted at rest with KMS but visible to anyone who can read the function configuration. Keep real secrets in <strong>Secrets Manager</strong> or <strong>SSM Parameter Store</strong> and fetch them at init through the <strong>Parameters and Secrets Lambda extension</strong>, which caches locally.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "The execution role defines what my function can call and follows least privilege; the resource-based policy defines who can invoke it, scoped with a source ARN. I attach a function to a VPC only when it must reach private resources like RDS, remembering it then needs NAT or endpoints for outbound access, and I fetch secrets from Secrets Manager rather than storing them in environment variables."</div>
</div>`,
          examples: [
            `# Least-privilege execution role
{
  "Version": "2012-10-17",
  "Statement": [
    { "Effect": "Allow", "Action": ["logs:CreateLogGroup","logs:CreateLogStream","logs:PutLogEvents"], "Resource": "arn:aws:logs:us-east-1:123456789012:log-group:/aws/lambda/orders-api:*" },
    { "Effect": "Allow", "Action": ["dynamodb:GetItem","dynamodb:PutItem","dynamodb:UpdateItem"], "Resource": "arn:aws:dynamodb:us-east-1:123456789012:table/orders" },
    { "Effect": "Allow", "Action": "secretsmanager:GetSecretValue", "Resource": "arn:aws:secretsmanager:us-east-1:123456789012:secret:prod/orders/*" }
  ]
}

# Allow one S3 bucket to invoke the function (resource-based policy)
aws lambda add-permission --function-name resize-images --statement-id s3-uploads \\
  --action lambda:InvokeFunction --principal s3.amazonaws.com \\
  --source-arn arn:aws:s3:::my-uploads --source-account 123456789012

# Attach the function to private subnets so it can reach RDS
aws lambda update-function-configuration --function-name orders-api \\
  --vpc-config SubnetIds=subnet-private-a,subnet-private-b,SecurityGroupIds=sg-lambda`,
          ],
          questions: [
            {
              question: "What is the difference between a Lambda execution role and a resource-based policy?",
              solution: "<p>The <strong>execution role</strong> is an IAM role the function assumes at runtime; its policies define what AWS APIs the function code may call, such as reading a DynamoDB table. The <strong>resource-based policy</strong> is attached to the function itself and defines which principals or services may <strong>invoke</strong> it, for example allowing <code>s3.amazonaws.com</code> from a specific bucket ARN or another AWS account. One is outbound permission, the other inbound.</p>",
            },
            {
              question: "When should a Lambda function be attached to a VPC, and what are the consequences?",
              solution: "<p>Attach it only when it must reach <strong>private resources</strong> such as RDS, ElastiCache, or services behind an internal load balancer. Consequences: the function gets Hyperplane ENIs in your subnets, it <strong>loses direct internet access</strong> unless the subnets route through a NAT Gateway, calls to AWS services need NAT or VPC endpoints, and the execution role needs ENI permissions. Functions that only call public AWS APIs should stay outside the VPC for simplicity.</p>",
            },
            {
              question: "How does Lambda call other AWS services securely without storing access keys?",
              solution: "<p>Through its <strong>execution role</strong>. The Lambda service assumes the role and injects short-lived STS credentials into the environment variables of the execution environment; the AWS SDKs read them automatically and Lambda rotates them. You never embed access keys. Least privilege is enforced by granting the role only the specific actions and resource ARNs the function needs.</p>",
            },
            {
              question: "Why is RDS Proxy recommended when Lambda talks to a relational database?",
              solution: "<p>Each concurrent Lambda execution opens its own database connection, so a traffic spike to 500 concurrent invocations means 500 connections and repeated TLS and auth handshakes, which can exhaust the database's connection limit. <strong>RDS Proxy</strong> maintains a warm pool and multiplexes many Lambda connections onto fewer database connections, speeds up failover, and can authenticate with IAM so the function needs no database password.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/lambda/latest/dg/lambda-intro-execution-role.html",
            "https://docs.aws.amazon.com/lambda/latest/dg/access-control-resource-based.html",
            "https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc.html",
          ],
        },
      ],
    },
    {
      id: 2,
      label: "Advance",
      concepts: [
        {
          topic: "Cold Starts & Performance Tuning",
          tags: ["aws", "lambda", "cold start", "performance", "snapstart"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  A <strong>cold start</strong> is the latency added when Lambda must create a new execution environment before running your handler: allocate a micro-VM, download the code, start the runtime, and execute your initialisation code. It ranges from under 100 ms for a small Node.js or Python function to several seconds for a large Java application, and it happens on the first request, after idle periods, and every time concurrency scales up.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Where the time goes</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Environment provisioning:</strong> AWS's part, typically 100 to 200 ms, not in your control.</li>
  <li><strong>Runtime start:</strong> JVM and .NET are slow; Node, Python and Go are fast.</li>
  <li><strong>Init code:</strong> Imports, dependency injection frameworks, SDK client creation, configuration fetches. Entirely in your control and usually the biggest lever.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Reducing cold starts</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Trim the package:</strong> Bundle and tree-shake (esbuild), import only the SDK v3 clients you need, exclude dev dependencies. Smaller zips download and parse faster.</li>
  <li><strong>Lazy-load</strong> rarely used modules inside the code path that needs them.</li>
  <li><strong>More memory</strong> means more CPU for the init phase.</li>
  <li><strong>ARM (Graviton)</strong> is often faster and 20% cheaper.</li>
  <li><strong>SnapStart</strong> (Java, Python, .NET): Lambda snapshots the initialised environment at publish time and restores from it, cutting Java cold starts by up to 90%.</li>
  <li><strong>Provisioned concurrency:</strong> Keeps N environments pre-initialised so those requests never cold start; pay for the warm capacity, scale it on a schedule.</li>
  <li>Avoid heavyweight frameworks; prefer lightweight DI or none.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Warm-path performance</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Reuse connections and clients across invocations; enable HTTP keep-alive.</li>
  <li>Cache reference data and secrets in module scope with a TTL.</li>
  <li>Use <code>/tmp</code> for large downloads that repeat.</li>
  <li>Return early and let async work happen via a queue instead of blocking the caller.</li>
  <li>Right-size memory with <strong>Lambda Power Tuning</strong>; measure with <strong>X-Ray</strong> or CloudWatch Lambda Insights.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Measuring</h4>
<p style="line-height: 1.75;">The <code>REPORT</code> log line includes <code>Init Duration</code> only on cold starts. Query it in Logs Insights to see the cold start rate and p99, and alarm on <code>Duration</code> percentiles rather than averages.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Cold starts are the init cost of a fresh execution environment. I shrink and tree-shake the package, keep init code lean, initialise clients once in module scope, choose a fast runtime and ARM, use SnapStart for Java, and for latency-critical APIs enable provisioned concurrency on a schedule. I measure with the Init Duration field in the REPORT logs and tune memory with Power Tuning."</div>
</div>`,
          examples: [
            `# Logs Insights: cold start rate and p99 init time over the last hour
filter @type = "REPORT"
| stats count(*) as invocations,
        sum(ispresent(@initDuration)) as coldStarts,
        avg(@initDuration) as avgInitMs,
        pct(@initDuration, 99) as p99InitMs,
        pct(@duration, 99) as p99DurationMs
  by bin(5m)

# Provisioned concurrency on a published alias, scaled on a weekday schedule
aws lambda publish-version --function-name orders-api
aws lambda create-alias --function-name orders-api --name live --function-version 7
aws lambda put-provisioned-concurrency-config --function-name orders-api --qualifier live \\
  --provisioned-concurrent-executions 20

aws application-autoscaling register-scalable-target --service-namespace lambda \\
  --resource-id function:orders-api:live --scalable-dimension lambda:function:ProvisionedConcurrency \\
  --min-capacity 5 --max-capacity 50
aws application-autoscaling put-scheduled-action --service-namespace lambda \\
  --resource-id function:orders-api:live --scalable-dimension lambda:function:ProvisionedConcurrency \\
  --scheduled-action-name business-hours --schedule "cron(0 8 ? * MON-FRI *)" \\
  --scalable-target-action MinCapacity=30,MaxCapacity=50`,
            `// esbuild: bundle + tree-shake to shrink the package and speed up init
// build.mjs
import { build } from "esbuild";
await build({
  entryPoints: ["src/handler.ts"],
  bundle: true,
  minify: true,
  platform: "node",
  target: "node20",
  format: "esm",
  outfile: "dist/index.mjs",
  external: ["@aws-sdk/*"], // already present in the Node 20 runtime
});`,
          ],
          questions: [
            {
              question: "What is a cold start and how do you reduce its impact?",
              solution: "<p>A cold start is the latency added when Lambda must create a new execution environment: download the code, start the runtime, and run your initialisation code. Reduce it by keeping deployment packages small, using lighter runtimes (Node, Python, Go) or SnapStart for Java, initialising clients outside the handler so warm invocations reuse them, choosing ARM, and for latency-critical paths enabling <strong>provisioned concurrency</strong> so environments are pre-initialised before traffic arrives.</p>",
            },
            {
              question: "How does SnapStart work and which runtimes support it?",
              solution: "<p>When you publish a version with SnapStart enabled, Lambda runs the init phase once, takes an encrypted <strong>Firecracker snapshot</strong> of the initialised memory and disk state, and caches it. New environments are <strong>restored from the snapshot</strong> instead of re-running init, cutting cold starts by up to 90% for heavy runtimes. It supports Java, Python and .NET managed runtimes on published versions. Code must handle uniqueness after restore (regenerate random seeds, re-establish network connections) using runtime hooks.</p>",
            },
            {
              question: "Why can increasing memory make a Lambda function cheaper?",
              solution: "<p>Cost equals memory allocated multiplied by execution time. Because <strong>CPU scales linearly with memory</strong>, a CPU-bound function at 1,769 MB gets a full vCPU and may finish three times faster than at 512 MB. If duration drops more than memory rises, the GB-seconds billed fall too, and the user sees lower latency. Only I/O-bound functions that spend their time waiting on network calls see little benefit. Lambda Power Tuning finds the optimum empirically.</p>",
            },
            {
              question: "How do you measure cold starts in production?",
              solution: "<p>Every invocation writes a <code>REPORT</code> line to CloudWatch Logs; only cold starts include <code>Init Duration</code>. A Logs Insights query filtering on <code>@type = REPORT</code> can count invocations with <code>@initDuration</code> present to get the cold start rate and its p50/p99. <strong>X-Ray</strong> traces show an Initialization subsegment, and <strong>CloudWatch Lambda Insights</strong> surfaces init duration and memory usage as metrics you can alarm on.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html",
            "https://docs.aws.amazon.com/lambda/latest/dg/snapstart.html",
            "https://docs.aws.amazon.com/lambda/latest/dg/provisioned-concurrency.html",
          ],
        },
        {
          topic: "Concurrency, Scaling & Throttling",
          tags: ["aws", "lambda", "concurrency", "throttling", "scaling"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Lambda scales by running <strong>one request per execution environment</strong> and adding environments as requests arrive. <strong>Concurrency</strong> is the number of environments busy at the same instant, and it is the unit AWS limits, bills provisioned capacity in, and that you use to protect downstream systems.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Estimating concurrency</h4>
<p style="line-height: 1.75;"><code>concurrency = requests per second x average duration in seconds</code>. An API receiving 200 requests per second with 250 ms responses needs about 50 concurrent executions. Halving duration halves concurrency and cost.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Limits and scaling rates</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Default <strong>account concurrency</strong> is 1,000 per region, shared by all functions; it is a soft limit you can raise.</li>
  <li>Each function can scale by <strong>1,000 additional environments every 10 seconds</strong> (per function, since late 2023) until the account limit is hit.</li>
  <li>Requests beyond available concurrency are <strong>throttled</strong>: synchronous callers receive HTTP 429 <code>TooManyRequestsException</code>; asynchronous events are retried for up to six hours; pollers back off automatically.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Reserved concurrency</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Sets a <strong>hard maximum</strong> for one function and <strong>guarantees</strong> that slice of the account pool for it.</li>
  <li>Use it to protect a downstream database that can only handle N connections, to keep a noisy function from starving others, or set it to 0 as an emergency off switch.</li>
  <li>Free; it simply partitions the pool.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Provisioned concurrency</h4>
<p style="line-height: 1.75;">Pre-initialises a fixed number of environments so those requests avoid cold starts. Applies to a version or alias, is billed per hour of warm capacity plus a discounted duration rate, and can be scheduled or target-tracked with Application Auto Scaling. Requests above the provisioned amount spill over to normal on-demand environments.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">SQS-specific control</h4>
<p style="line-height: 1.75;">For SQS event source mappings set <strong>maximum concurrency</strong> on the mapping (minimum 2) rather than reserved concurrency on the function; it stops the pollers from pulling messages the function cannot process, avoiding needless throttles and visibility-timeout churn.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Monitoring</h4>
<p style="line-height: 1.75;">Alarm on <code>Throttles</code>, <code>ConcurrentExecutions</code> approaching the limit, <code>Errors</code>, and <code>IteratorAge</code> for streams. Throttles on a customer-facing API mean lost requests, so treat them as errors.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Concurrency is requests per second times duration. The account has a shared pool, and a function can burst by a thousand environments every ten seconds. Reserved concurrency caps a function and guarantees its share, which I use to protect databases; provisioned concurrency pre-warms environments to remove cold starts, which I use for latency-sensitive APIs. I alarm on Throttles because a throttled synchronous request is a failed request."</div>
</div>`,
          examples: [
            `# Cap a function so it cannot overwhelm a downstream API (also guarantees 50 slots)
aws lambda put-function-concurrency --function-name sync-to-crm --reserved-concurrent-executions 50

# Emergency stop: reserved concurrency of 0 throttles every invocation
aws lambda put-function-concurrency --function-name sync-to-crm --reserved-concurrent-executions 0

# For SQS, limit at the event source mapping instead
aws lambda update-event-source-mapping --uuid <mapping-uuid> \\
  --scaling-config MaximumConcurrency=20

# Alarm when any throttling happens on the public API function
aws cloudwatch put-metric-alarm --alarm-name orders-api-throttles \\
  --namespace AWS/Lambda --metric-name Throttles --dimensions Name=FunctionName,Value=orders-api \\
  --statistic Sum --period 60 --evaluation-periods 1 --threshold 0 \\
  --comparison-operator GreaterThanThreshold --treat-missing-data notBreaching \\
  --alarm-actions arn:aws:sns:us-east-1:123456789012:oncall

# Check remaining account concurrency
aws lambda get-account-settings --query 'AccountLimit.ConcurrentExecutions'`,
          ],
          questions: [
            {
              question: "What is the difference between reserved and provisioned concurrency?",
              solution: "<p><strong>Reserved concurrency</strong> sets a hard maximum number of concurrent executions for a function and guarantees that share of the account limit; requests above it are throttled. It is used to protect downstream resources or isolate noisy functions, and it is free. <strong>Provisioned concurrency</strong> pre-initialises a fixed number of execution environments so those invocations never cold start; you pay for the warm capacity whether or not it is used, and you can scale it on a schedule with Application Auto Scaling.</p>",
            },
            {
              question: "How do you estimate the concurrency an API will need?",
              solution: "<p>Multiply expected <strong>requests per second by average duration in seconds</strong>. For example 300 requests per second at 200 ms average needs about 60 concurrent executions; at peak with a 3x safety factor plan for 180. Compare that with the account limit (default 1,000 shared across all functions) and request an increase early if a launch could exceed it. Reducing duration is the cheapest way to reduce concurrency.</p>",
            },
            {
              question: "What happens to requests when a function is throttled?",
              solution: "<p>For <strong>synchronous</strong> invocations the caller gets a 429 <code>TooManyRequestsException</code> and must retry; API Gateway surfaces it as a 500 or 429 to the client. For <strong>asynchronous</strong> invocations Lambda keeps the event in its internal queue and retries with backoff for up to six hours before sending it to the failure destination. For <strong>poll-based</strong> sources the pollers slow down; SQS messages return to the queue after the visibility timeout and stream iterators fall behind, raising <code>IteratorAge</code>.</p>",
            },
            {
              question: "A Lambda consuming an SQS queue is overwhelming your database. How do you limit it?",
              solution: "<p>Set <strong>maximum concurrency on the SQS event source mapping</strong> (for example 10) so Lambda's pollers never invoke more than that many environments for the queue. This is better than reserved concurrency on the function, which would cause pollers to pull messages, get throttled, and return them to the queue repeatedly. Combine with <strong>RDS Proxy</strong> for connection pooling and consider a larger batch size so each invocation does more work per connection.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html",
            "https://docs.aws.amazon.com/lambda/latest/dg/configuration-concurrency.html",
            "https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html",
          ],
        },
        {
          topic: "Idempotency, Versions & Deployment",
          tags: ["aws", "lambda", "idempotency", "versions", "aliases", "canary"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Running Lambda in production means handling duplicate events safely, shipping changes without breaking callers, and knowing when Lambda is the wrong tool. These operational topics separate candidates who have deployed serverless from those who have only read about it.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Idempotency</h4>
<p style="line-height: 1.75;">Asynchronous and poll-based sources deliver <strong>at least once</strong>, so the same event can arrive twice after a timeout or retry. An idempotent handler produces the same result no matter how many times it runs.</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Derive an <strong>idempotency key</strong> from the event (order ID, message ID, S3 object key plus version).</li>
  <li>Before the side effect, write the key to <strong>DynamoDB with a conditional put</strong> and a TTL; if the write fails the event was already handled.</li>
  <li>Store the previous response so duplicates return the same result.</li>
  <li><strong>AWS Lambda Powertools</strong> (Python, TypeScript, Java, .NET) provides an idempotency decorator that implements exactly this.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Versions and aliases</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><code>$LATEST</code> is mutable. <strong>Publishing a version</strong> creates an immutable snapshot of code plus configuration.</li>
  <li>An <strong>alias</strong> (for example <code>live</code>) is a pointer to a version. Triggers and callers reference the alias so deploys are a pointer update, and rollback is pointing it back.</li>
  <li><strong>Weighted aliases</strong> split traffic between two versions (for example 90/10) for canary releases.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Safe deployments</h4>
<p style="line-height: 1.75;"><strong>CodeDeploy</strong> (via SAM or CDK) automates alias shifting with strategies such as <code>Canary10Percent5Minutes</code> or <code>Linear10PercentEvery1Minute</code>, runs pre- and post-traffic hook functions, and <strong>rolls back automatically</strong> if a CloudWatch alarm on errors or latency fires during the shift. Infrastructure as code (SAM, CDK, Terraform, Serverless Framework) should define the function, role, triggers and alarms together.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Observability</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Emit <strong>structured JSON logs</strong> with request IDs and business keys; Powertools Logger does this.</li>
  <li>Enable <strong>X-Ray</strong> active tracing to see downstream call latency.</li>
  <li>Use the <strong>Embedded Metric Format</strong> to publish custom metrics from logs without API calls.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">When not to use Lambda</h4>
<p style="line-height: 1.75;">Jobs over 15 minutes, workloads needing more than 10 GB of memory or GPUs, long-lived connections you manage yourself, very high steady throughput where a right-sized container is cheaper, or strict p99 latency that provisioned concurrency cannot economically meet. ECS/Fargate, EKS or Batch fit those cases.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Because async and poll-based sources deliver at least once, my handlers are idempotent: I record an idempotency key in DynamoDB with a conditional write before doing the side effect. I deploy through published versions and a live alias, shift traffic gradually with CodeDeploy canaries, and roll back automatically on alarms. I emit structured logs and X-Ray traces, and I move work to containers when it exceeds Lambda's 15-minute or resource limits."</div>
</div>`,
          examples: [
            `// Idempotent handler using a conditional DynamoDB write with TTL
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
const ddb = new DynamoDBClient({});

async function claim(key) {
  try {
    await ddb.send(new PutItemCommand({
      TableName: process.env.IDEMPOTENCY_TABLE,
      Item: { pk: { S: key }, expiresAt: { N: String(Math.floor(Date.now() / 1000) + 86400) } },
      ConditionExpression: "attribute_not_exists(pk)",
    }));
    return true;                       // first time we have seen this key
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") return false; // duplicate
    throw err;
  }
}

export const handler = async (event) => {
  for (const record of event.Records) {
    const order = JSON.parse(record.body);
    if (!(await claim("order#" + order.id))) { console.log("duplicate, skipping", order.id); continue; }
    await chargeCustomer(order);        // side effect happens at most once
  }
};`,
            `# Publish, alias, and canary 10% of traffic to the new version
aws lambda update-function-code --function-name orders-api --zip-file fileb://function.zip
aws lambda publish-version --function-name orders-api --description "v8: new pricing rules"
aws lambda update-alias --function-name orders-api --name live --function-version 7 \\
  --routing-config AdditionalVersionWeights={"8"=0.1}
# ... watch Errors / Duration alarms, then promote or roll back ...
aws lambda update-alias --function-name orders-api --name live --function-version 8 --routing-config AdditionalVersionWeights={}

# SAM: automated canary with rollback on alarm
# template.yaml (excerpt)
#   AutoPublishAlias: live
#   DeploymentPreference:
#     Type: Canary10Percent5Minutes
#     Alarms: [!Ref OrdersApiErrorsAlarm]
#     Hooks: { PreTraffic: !Ref SmokeTestFunction }`,
          ],
          questions: [
            {
              question: "Why should Lambda functions be idempotent, and how do you implement that?",
              solution: "<p>Asynchronous and poll-based sources deliver <strong>at-least-once</strong>, so the same event can be processed twice after a timeout or retry. Idempotency means the second run has no additional effect. Implement it by deriving an idempotency key from the event (message ID, order ID), storing it in DynamoDB with a conditional write and TTL before doing the side effect, and skipping when the key exists. AWS Lambda Powertools provides a ready-made idempotency decorator for this pattern.</p>",
            },
            {
              question: "What are Lambda versions and aliases, and why use them?",
              solution: "<p>A <strong>version</strong> is an immutable, numbered snapshot of a function's code and configuration; <code>$LATEST</code> is the mutable working copy. An <strong>alias</strong> is a named pointer (such as <code>live</code> or <code>staging</code>) to a version, and it can split traffic between two versions by weight. Callers and triggers reference the alias, so deploying is a pointer change, rolling back is pointing to the previous version, and provisioned concurrency and permissions can be attached to a stable ARN.</p>",
            },
            {
              question: "How would you deploy a Lambda change with zero downtime and automatic rollback?",
              solution: "<p>Publish a new version and use <strong>CodeDeploy</strong> (through SAM or CDK) to shift the production alias gradually, for example <code>Canary10Percent5Minutes</code>. Attach <strong>CloudWatch alarms</strong> on <code>Errors</code>, <code>Throttles</code> and p99 <code>Duration</code> for the new version; if any alarm fires during the shift CodeDeploy reverts the alias automatically. Add a pre-traffic hook function that runs smoke tests against the new version before any real traffic reaches it.</p>",
            },
            {
              question: "When would you not use Lambda?",
              solution: "<p>Avoid Lambda for jobs longer than <strong>15 minutes</strong>, workloads needing more than 10 GB memory or GPUs, long-lived connections such as WebSockets you manage yourself, very high steady throughput where per-request pricing exceeds a right-sized container, or applications with heavy startup costs and strict p99 latency that provisioned concurrency cannot economically cover. In those cases ECS/Fargate, EKS, or Batch are better fits.</p>",
            },
            {
              question: "How do you make Lambda logs useful at scale?",
              solution: "<p>Log <strong>structured JSON</strong> with a consistent schema including the request ID, a correlation ID from the caller, and business identifiers, so Logs Insights can filter and aggregate them. Set <strong>log retention</strong> on every log group. Use the <strong>Embedded Metric Format</strong> to emit custom metrics from logs without extra API calls, enable <strong>X-Ray</strong> for distributed traces, and sample verbose debug logs in production. Powertools Logger, Metrics and Tracer implement all of this with a few lines.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/lambda/latest/dg/configuration-versions.html",
            "https://docs.aws.amazon.com/lambda/latest/dg/lambda-rolling-deployments.html",
            "https://docs.powertools.aws.dev/lambda/typescript/latest/utilities/idempotency/",
          ],
        },
      ],
    },
  ],
};
