/** AWS EventBridge — serverless event bus, rules, Scheduler, Pipes */
export const awsEventBridge = {
  id: 110,
  category: "AWS EventBridge",
  themeBgColor: "#FEF3C7",
  textColor: "#92400E",
  topicColor: "#D97706",
  lightColor: "#FFFBEB",
  type: [
    {
      id: 1,
      label: "Beginner",
      concepts: [
        {
          topic: "Event Buses & Event Structure",
          tags: ["aws", "eventbridge", "event bus", "event-driven", "events"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>Amazon EventBridge</strong> is a serverless <strong>event bus</strong>. Producers put events (JSON documents describing something that happened) on a bus; <strong>rules</strong> match events by pattern and route them to <strong>targets</strong> such as Lambda, SQS, SNS, Step Functions, ECS tasks, API Gateway, or another account's bus. It is the backbone of event-driven architectures on AWS because it decouples who emits an event from who reacts to it.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Types of bus</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Default bus:</strong> Exists in every account and region and automatically receives <strong>AWS service events</strong>: EC2 instance state changes, CodePipeline stage transitions, Auto Scaling lifecycle events, GuardDuty findings, Health notifications, and every CloudTrail-recorded API call if you enable it.</li>
  <li><strong>Custom buses:</strong> Created by you for <strong>application events</strong>, typically one per domain or team (<code>orders-bus</code>, <code>payments-bus</code>). Separating them keeps rules manageable and permissions clear.</li>
  <li><strong>Partner event buses:</strong> SaaS vendors such as Datadog, Stripe, Zendesk, Auth0 and Salesforce publish their events directly into your account.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Anatomy of an event</h4>
<pre><code class="language-json">{
  "version": "0",
  "id": "6a7e8feb-b491-4cf7-a9f1-bf3703467718",
  "detail-type": "OrderPlaced",
  "source": "com.myapp.orders",
  "account": "123456789012",
  "time": "2026-09-12T10:15:00Z",
  "region": "us-east-1",
  "resources": ["arn:aws:dynamodb:us-east-1:123456789012:table/orders"],
  "detail": { "orderId": "o-123", "total": 49.99, "country": "IN", "items": 3 }
}</code></pre>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>source</strong> identifies the producer (reverse-DNS style for custom events; <code>aws.ec2</code> for AWS).</li>
  <li><strong>detail-type</strong> names the kind of event. Use past-tense business facts: <code>OrderPlaced</code>, <code>PaymentFailed</code>.</li>
  <li><strong>detail</strong> is your free-form payload, up to a total event size of 256 KB. Put large blobs in S3 and reference them.</li>
  <li>The envelope fields (<code>id</code>, <code>time</code>, <code>account</code>) are set by EventBridge.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Publishing events</h4>
<p style="line-height: 1.75;">Producers call <code>PutEvents</code> with up to 10 entries per request. Producers need <code>events:PutEvents</code> on the bus ARN; a <strong>resource policy</strong> on the bus can allow other accounts or the whole organisation to publish. Design events to be <strong>self-contained and versioned</strong> so consumers can evolve independently.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Why an event bus instead of direct calls</h4>
<p style="line-height: 1.75;">The producer does not know or care who consumes; adding a new consumer is a new rule, not a code change. Consumers fail independently. The same event feeds analytics, notifications and workflows. The cost is eventual consistency and the need for idempotent consumers.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "EventBridge is a serverless event bus. The default bus carries AWS service events, custom buses carry my domain events, and partner buses carry SaaS events. Each event is a JSON envelope with source, detail-type and a detail payload up to 256 KB. Producers just call PutEvents; rules decide who receives what, so adding a consumer never touches the producer."</div>
</div>`,
          examples: [
            `# Create a domain bus and publish an event to it
aws events create-event-bus --name orders-bus

aws events put-events --entries '[{
  "EventBusName": "orders-bus",
  "Source": "com.myapp.orders",
  "DetailType": "OrderPlaced",
  "Detail": "{\\"orderId\\":\\"o-123\\",\\"total\\":1499,\\"country\\":\\"IN\\",\\"items\\":3}"
}]'`,
            `// Node.js producer: publish a domain event after the order is saved
import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge";
const eb = new EventBridgeClient({});

export async function publishOrderPlaced(order) {
  const res = await eb.send(new PutEventsCommand({
    Entries: [{
      EventBusName: "orders-bus",
      Source: "com.myapp.orders",
      DetailType: "OrderPlaced",
      Detail: JSON.stringify({ schemaVersion: 1, orderId: order.id, total: order.total, country: order.country }),
      Resources: ["arn:aws:dynamodb:us-east-1:123456789012:table/orders"],
    }],
  }));
  if (res.FailedEntryCount > 0) throw new Error("publish failed: " + JSON.stringify(res.Entries));
}`,
          ],
          questions: [
            {
              question: "What is EventBridge and what problem does it solve?",
              solution: "<p>EventBridge is a <strong>serverless event bus</strong> that receives events from AWS services, your applications and SaaS partners, matches them against <strong>rules</strong>, and routes them to targets such as Lambda, SQS, Step Functions or other accounts. It solves <strong>tight coupling</strong>: producers publish facts without knowing the consumers, new consumers are added with a rule instead of a code change, and each consumer fails and retries independently. It also gives native integration with AWS service events and scheduling.</p>",
            },
            {
              question: "What is the difference between the default bus and a custom bus?",
              solution: "<p>The <strong>default bus</strong> exists automatically in every account and region and is where <strong>AWS services</strong> publish their events (EC2 state changes, CloudTrail API calls, CodePipeline transitions, GuardDuty findings). <strong>Custom buses</strong> are created by you for <strong>application events</strong>, letting you separate domains, apply distinct resource policies for cross-account publishing, and keep rule sets manageable. Best practice is to leave AWS events on the default bus and put your own events on one custom bus per domain.</p>",
            },
            {
              question: "How should you design the shape of a custom event?",
              solution: "<p>Use a <strong>reverse-DNS source</strong> (<code>com.company.orders</code>) and a <strong>past-tense detail-type</strong> naming a business fact (<code>OrderPlaced</code>). Put a <strong>schema version</strong> inside <code>detail</code> so consumers can handle evolution, include stable identifiers and the data most consumers need, and keep the total under 256 KB, referencing S3 for large payloads. Prefer <strong>fat events</strong> with enough context to avoid callbacks to the producer, but avoid leaking internal implementation details.</p>",
            },
            {
              question: "How does EventBridge differ from SNS and SQS?",
              solution: "<p><strong>SQS</strong> is a queue: one consumer group pulls and processes each message, with buffering and retries. <strong>SNS</strong> is simple push fan-out on topics, filtered by message attributes, with very high throughput and A2P channels. <strong>EventBridge</strong> is an event bus with <strong>content-based routing on the full event body</strong>, native AWS and SaaS event sources, cross-account buses, schema registry, archive and replay, scheduling, and Pipes. It has lower throughput and higher latency than SNS, so it is chosen for integration flexibility rather than raw speed.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html",
            "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-bus.html",
            "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-events-structure.html",
          ],
        },
        {
          topic: "Rules, Patterns & Targets",
          tags: ["aws", "eventbridge", "rules", "event patterns", "targets", "input transformer"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  A <strong>rule</strong> is the routing unit of EventBridge: it watches one bus, matches events with an <strong>event pattern</strong>, and sends matches to up to five <strong>targets</strong>, optionally reshaping the payload on the way. Because patterns match on the entire event body, you can route with precision that SNS attribute filters cannot.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Event patterns</h4>
<p style="line-height: 1.75;">A pattern is JSON with the same shape as the event; every field you include must match, and array values mean "any of these".</p>
<pre><code class="language-json">{
  "source": ["com.myapp.orders"],
  "detail-type": ["OrderPlaced", "OrderUpdated"],
  "detail": {
    "country": ["IN", "SG"],
    "total": [{ "numeric": [">=", 1000] }],
    "coupon": [{ "exists": false }],
    "channel": [{ "prefix": "mobile-" }],
    "status": [{ "anything-but": ["cancelled"] }]
  }
}</code></pre>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Operators: exact, <code>prefix</code>, <code>suffix</code>, <code>wildcard</code>, <code>numeric</code> ranges, <code>exists</code>, <code>anything-but</code>, <code>equals-ignore-case</code>, <code>cidr</code>, and <code>$or</code> for alternatives across fields.</li>
  <li>Fields not mentioned are ignored, so patterns stay stable as events gain fields.</li>
  <li>Test patterns with <code>aws events test-event-pattern</code> before deploying.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Targets</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Over 20 types: <strong>Lambda</strong>, <strong>SQS</strong> (standard and FIFO), <strong>SNS</strong>, <strong>Step Functions</strong>, <strong>ECS RunTask</strong>, Kinesis, Firehose, <strong>API Gateway</strong>, <strong>API destinations</strong> (external HTTPS), CloudWatch Logs, Systems Manager, Batch, another <strong>event bus</strong>.</li>
  <li>Up to <strong>five targets per rule</strong>; use multiple rules or an SNS/SQS fan-out for more.</li>
  <li>Each target needs permission: Lambda and SNS/SQS use resource policies that EventBridge adds for you (or you manage), while Step Functions, ECS, Kinesis and API destinations need an <strong>IAM role</strong> for EventBridge to assume.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Shaping the payload</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Matched event</strong> (default): the whole event goes to the target.</li>
  <li><strong>Part of the event:</strong> a JSONPath such as <code>$.detail</code>.</li>
  <li><strong>Constant:</strong> a fixed JSON string.</li>
  <li><strong>Input transformer:</strong> extract fields into variables and build a new payload, for example a human-readable message for SNS or the exact input a Step Functions workflow expects.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Rule hygiene</h4>
<p style="line-height: 1.75;">Name rules by intent (<code>high-value-orders-to-sales</code>), keep one responsibility per rule, tag them, and define them in infrastructure as code. Metrics per rule (<code>MatchedEvents</code>, <code>FailedInvocations</code>, <code>TriggeredRules</code>) show whether routing behaves as expected.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "A rule matches events on a bus with a JSON pattern that can test any field with exact values, prefixes, numeric ranges, exists and anything-but, then sends them to up to five targets such as Lambda, SQS, Step Functions or another bus. I use input transformers to give each target the payload shape it wants, give role-based targets an IAM role, and test patterns with the CLI before deploying."</div>
</div>`,
          examples: [
            `# Rule: high-value orders from India or Singapore -> Lambda (notify sales) and SQS (fulfilment)
aws events put-rule --name high-value-orders --event-bus-name orders-bus --event-pattern '{
  "source": ["com.myapp.orders"],
  "detail-type": ["OrderPlaced"],
  "detail": { "country": ["IN", "SG"], "total": [{ "numeric": [">=", 1000] }] }
}'

aws events put-targets --rule high-value-orders --event-bus-name orders-bus --targets '[
  { "Id": "notify-sales", "Arn": "arn:aws:lambda:us-east-1:123456789012:function:notify-sales",
    "InputTransformer": {
      "InputPathsMap": { "id": "$.detail.orderId", "total": "$.detail.total", "country": "$.detail.country" },
      "InputTemplate": "{\\"message\\": \\"High value order <id> for <total> from <country>\\", \\"orderId\\": <id>}"
    }
  },
  { "Id": "fulfilment", "Arn": "arn:aws:sqs:us-east-1:123456789012:fulfilment-queue", "InputPath": "$.detail" }
]'

# Test a pattern against a sample event before deploying
aws events test-event-pattern \\
  --event-pattern '{"detail":{"total":[{"numeric":[">=",1000]}]}}' \\
  --event '{"id":"1","source":"com.myapp.orders","detail-type":"OrderPlaced","account":"123456789012","time":"2026-09-12T10:15:00Z","region":"us-east-1","resources":[],"detail":{"total":1499}}'

# Let EventBridge invoke the Lambda target
aws lambda add-permission --function-name notify-sales --statement-id eb-high-value \\
  --action lambda:InvokeFunction --principal events.amazonaws.com \\
  --source-arn arn:aws:events:us-east-1:123456789012:rule/orders-bus/high-value-orders`,
          ],
          questions: [
            {
              question: "How do EventBridge event patterns work?",
              solution: "<p>A pattern is a JSON document mirroring the event's shape. Every field present in the pattern must match; fields absent from the pattern are ignored, and array values mean any-of. Beyond exact matching you can use <strong>content filters</strong>: <code>prefix</code>, <code>suffix</code>, <code>wildcard</code>, <code>numeric</code> comparisons and ranges, <code>exists</code>, <code>anything-but</code>, <code>cidr</code>, <code>equals-ignore-case</code>, and <code>$or</code>. Because matching covers the whole body including <code>detail</code>, routing decisions can be made on business data such as order value or country.</p>",
            },
            {
              question: "What is an input transformer and when would you use one?",
              solution: "<p>An input transformer reshapes the event before it reaches a target. You declare an <strong>InputPathsMap</strong> of JSONPath expressions extracting values into variables and an <strong>InputTemplate</strong> that builds the new payload with those variables. Use it to produce a human-readable SNS message, to give a Step Functions execution exactly the input schema it expects, to call an API destination whose body format you do not control, or to drop fields a target should not see, all without an intermediate Lambda.</p>",
            },
            {
              question: "How does EventBridge get permission to invoke different target types?",
              solution: "<p>Two mechanisms. Targets with <strong>resource-based policies</strong>, such as Lambda, SNS, SQS and CloudWatch Logs, need a policy statement allowing the <code>events.amazonaws.com</code> principal (scoped with <code>aws:SourceArn</code> to the rule); the console adds it automatically, the CLI requires <code>add-permission</code> or a queue policy. Targets without resource policies, such as Step Functions, ECS RunTask, Kinesis, Batch and API destinations, need an <strong>IAM role</strong> on the target definition that EventBridge assumes, with a trust policy for the EventBridge service.</p>",
            },
            {
              question: "A rule needs to notify eight different services. How do you handle the five-target limit?",
              solution: "<p>Either create <strong>multiple rules</strong> with the same pattern, each with up to five targets, or route the event to a single <strong>SNS topic</strong> or to the eight services' <strong>SQS queues</strong> via a fan-out pattern, which also gives each service its own buffer and retry semantics. In many architectures the cleanest design is one rule per consuming service, each with its own filter, so consumers subscribe independently and the platform team never edits a shared rule.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-patterns.html",
            "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-targets.html",
            "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-transform-target-input.html",
          ],
        },
        {
          topic: "Delivery Guarantees, Retries & DLQs",
          tags: ["aws", "eventbridge", "at-least-once", "retry policy", "dead-letter queue", "idempotency"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  EventBridge is durable and highly available, but its guarantees are specific: delivery is <strong>at least once</strong> and <strong>unordered</strong>, and a failed target does not fail the producer. Designing consumers around these facts is what separates a robust event-driven system from one that silently loses or duplicates work.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The guarantees</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>At-least-once:</strong> An event may be delivered to a target more than once in rare cases, so targets must be <strong>idempotent</strong>.</li>
  <li><strong>No ordering:</strong> Two events published in sequence may reach a target out of order. When order matters within an entity, route to an <strong>SQS FIFO queue</strong> with the entity ID as the message group.</li>
  <li><strong>Durable ingestion:</strong> Once <code>PutEvents</code> returns success the event is stored redundantly; the producer never waits on consumers.</li>
  <li><strong>Latency:</strong> Typically around half a second from publish to target invocation, which is fine for workflows and notifications but not for request-response paths.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Retries</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>If a target returns an error or is throttled, EventBridge retries with <strong>exponential backoff and jitter</strong>.</li>
  <li>Per target you set a <strong>retry policy</strong>: <code>MaximumRetryAttempts</code> (0 to 185) and <code>MaximumEventAgeInSeconds</code> (60 s to 24 h). Defaults are 185 attempts within 24 hours.</li>
  <li>Retries stop when either limit is reached; for time-sensitive events shorten the age so stale events are not delivered hours later.</li>
  <li>Some failures are not retried: a missing target, a target without permission, or a deleted resource go straight to the DLQ.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Dead-letter queues</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Configure an <strong>SQS queue as DLQ per target</strong>. Events that exhaust retries or fail permanently land there with attributes describing the <code>ERROR_CODE</code>, <code>ERROR_MESSAGE</code>, <code>RULE_ARN</code> and <code>TARGET_ARN</code>.</li>
  <li>The queue policy must allow <code>events.amazonaws.com</code> to <code>sqs:SendMessage</code>, scoped to the rule ARN.</li>
  <li>Alarm on <code>ApproximateNumberOfMessagesVisible</code> and build a replay path: fix the target, then re-publish the DLQ contents with a small script or Pipes.</li>
  <li>Without a DLQ, undeliverable events are <strong>dropped silently</strong> after the retry window; the <code>FailedInvocations</code> metric is the only trace.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Consumer design checklist</h4>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li>Idempotency key from the event <code>id</code> or a business identifier, stored with a conditional write and TTL.</li>
  <li>Tolerate reordering, or use FIFO queues where sequence matters.</li>
  <li>Distinguish retryable errors (throw) from poison events (log and succeed, or send to your own DLQ) so a bad payload does not block retries for 24 hours.</li>
  <li>Prefer SQS between EventBridge and slow consumers to buffer bursts and control concurrency.</li>
</ol>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "EventBridge delivers at least once and out of order, so my consumers are idempotent and I use SQS FIFO when sequence matters. Each target has a retry policy with exponential backoff up to 24 hours, and I always attach an SQS dead-letter queue with an alarm so failed events are captured rather than silently dropped. For slow or bursty consumers I put a queue between the bus and the worker."</div>
</div>`,
          examples: [
            `# Target with a tight retry policy and a DLQ
aws events put-targets --rule high-value-orders --event-bus-name orders-bus --targets '[{
  "Id": "notify-sales",
  "Arn": "arn:aws:lambda:us-east-1:123456789012:function:notify-sales",
  "RetryPolicy": { "MaximumRetryAttempts": 5, "MaximumEventAgeInSeconds": 3600 },
  "DeadLetterConfig": { "Arn": "arn:aws:sqs:us-east-1:123456789012:eventbridge-dlq" }
}]'

# DLQ policy: only this rule may write to it
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "Service": "events.amazonaws.com" },
    "Action": "sqs:SendMessage",
    "Resource": "arn:aws:sqs:us-east-1:123456789012:eventbridge-dlq",
    "Condition": { "ArnEquals": { "aws:SourceArn": "arn:aws:events:us-east-1:123456789012:rule/orders-bus/high-value-orders" } }
  }]
}

# Alarm when anything lands in the DLQ
aws cloudwatch put-metric-alarm --alarm-name eventbridge-dlq-not-empty --namespace AWS/SQS \\
  --metric-name ApproximateNumberOfMessagesVisible --dimensions Name=QueueName,Value=eventbridge-dlq \\
  --statistic Maximum --period 60 --evaluation-periods 1 --threshold 0 --comparison-operator GreaterThanThreshold \\
  --alarm-actions arn:aws:sns:us-east-1:123456789012:oncall`,
            `// Idempotent Lambda target: process each EventBridge event id once
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
const ddb = new DynamoDBClient({});

export const handler = async (event) => {
  try {
    await ddb.send(new PutItemCommand({
      TableName: process.env.IDEMPOTENCY_TABLE,
      Item: { pk: { S: "event#" + event.id }, ttl: { N: String(Math.floor(Date.now() / 1000) + 7 * 86400) } },
      ConditionExpression: "attribute_not_exists(pk)",
    }));
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") { console.log("duplicate event, skipping", event.id); return; }
    throw err; // transient error: let EventBridge retry
  }
  await handleOrderPlaced(event.detail);
};`,
          ],
          questions: [
            {
              question: "What are EventBridge delivery guarantees and how do you design around them?",
              solution: "<p>Delivery is <strong>at-least-once</strong> and <strong>unordered</strong>. Duplicate deliveries are rare but possible, so targets must be <strong>idempotent</strong>, keyed on a business ID or the event <code>id</code>. When order matters within an entity, route to an <strong>SQS FIFO</strong> queue using a message group ID. Configure the <strong>retry policy</strong> (attempts and max event age) and a <strong>dead-letter queue</strong> per target so failures after retries are captured rather than silently dropped, and alarm on the DLQ depth.</p>",
            },
            {
              question: "What happens when a target keeps failing?",
              solution: "<p>EventBridge retries the invocation with <strong>exponential backoff</strong> for up to the target's <code>MaximumRetryAttempts</code> (default 185) or until the event is older than <code>MaximumEventAgeInSeconds</code> (default 24 hours), whichever comes first. If a <strong>dead-letter queue</strong> is configured the event is then sent there with error metadata; otherwise it is <strong>dropped</strong> and only the <code>FailedInvocations</code> metric records that it happened. Permanent errors such as a deleted target or missing permission skip retries and go straight to the DLQ.</p>",
            },
            {
              question: "Why put SQS between EventBridge and a consumer instead of invoking Lambda directly?",
              solution: "<p>A queue adds <strong>buffering</strong> for bursts, lets you <strong>control consumer concurrency</strong> (Lambda maximum concurrency or worker count) to protect databases, gives you <strong>visibility timeouts and a redrive policy</strong> tuned to the consumer, supports <strong>FIFO ordering</strong> when needed, and provides a natural place to inspect and replay messages. Direct Lambda targets are simpler and lower latency but couple the bus's retry behaviour to the function's error handling.</p>",
            },
            {
              question: "How do you handle a poison event that will never succeed?",
              solution: "<p>Detect it in the consumer: validation errors and malformed payloads are <strong>non-retryable</strong>, so log them with the event id, send them to an application-owned DLQ or error table, and <strong>return success</strong> so EventBridge does not retry for 24 hours. Reserve thrown errors for transient failures such as timeouts and throttling. Keep the target DLQ for infrastructure-level failures, and set a shorter maximum event age on time-sensitive rules so stale events do not surprise downstream systems.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rule-dlq.html",
            "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rule-event-delivery.html",
          ],
        },
        {
          topic: "EventBridge vs. SNS vs. SQS — Picking the Right Service",
          tags: ["aws", "eventbridge", "sns", "sqs", "messaging", "comparison"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  All three services move a message from a producer to a consumer without either side calling the other directly, and beginners often can't tell them apart at first. The clearest way to separate them is by asking: <strong>how many consumers, and how is a message matched to them?</strong>
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">SQS — a queue for one consumer group</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>A message sits in the queue until <strong>one</strong> consumer (out of potentially many workers pulling from the same queue) picks it up and processes it, then deletes it.</li>
  <li>Built for <strong>buffering and load-leveling</strong>: if a burst of work arrives faster than your workers can process it, SQS holds the backlog safely instead of overwhelming a downstream system.</li>
  <li>No routing logic — a message goes wherever a worker is free to pull from that one queue.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">SNS — push fan-out to many subscribers</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>A message published to a <strong>topic</strong> is pushed to <strong>every</strong> subscriber (multiple SQS queues, Lambda functions, emails, SMS, HTTP endpoints) — one publish, many independent copies delivered.</li>
  <li>Filtering is based on simple <strong>message attributes</strong> (key-value tags attached to the message), not the full message body.</li>
  <li>Very high throughput and low latency — built for "tell everyone who's listening," not for content-aware routing.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">EventBridge — content-aware routing across many sources</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Rules match on the <strong>entire event body</strong> (any field, nested or not), not just a handful of attributes — so you can route only "orders over $1000 from India" to a specific target, something SNS attribute filtering can't express as precisely.</li>
  <li>Natively receives events from <strong>AWS services themselves</strong> (an EC2 state change, a CodePipeline stage) and from <strong>SaaS partners</strong>, not just from your own application code.</li>
  <li>Slightly higher latency and lower raw throughput than SNS, because it's doing more — pattern matching, retries, DLQs, archive/replay, scheduling — as part of the service.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">A simple decision rule for beginners</h4>
<p style="line-height: 1.75;">Ask three questions in order: <strong>Do I just need a durable buffer for one group of workers?</strong> → SQS. <strong>Do I need to push the same message to many independent subscribers with simple filtering?</strong> → SNS. <strong>Do I need to route based on rich event content, react to AWS's own events, or eventually need scheduling/archive/replay?</strong> → EventBridge. In practice these are often combined — EventBridge routing to an SQS queue per consumer is one of the most common real-world patterns, giving you EventBridge's routing plus SQS's buffering in one design.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The same requirement, expressed three ways</h4>
<p style="line-height: 1.75;">Take one concrete requirement: <em>"when an order is placed, the fulfilment service should process it."</em> Watch how the shape of the solution changes:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>With SQS:</strong> the orders service sends a message to the fulfilment queue. This works, but the orders service now has to <em>know that fulfilment exists</em> and know its queue URL. When the analytics team also wants order data, someone has to edit the orders service to send a second message. That edit-the-producer-for-every-new-consumer treadmill is the coupling problem.</li>
  <li><strong>With SNS:</strong> the orders service publishes to an <code>order-events</code> topic, and fulfilment subscribes. Analytics can now subscribe without touching the producer — the coupling problem is solved. But if fulfilment only cares about orders over 1000 rupees, SNS can only filter on a message <em>attribute</em> that the producer deliberately attached, so the producer still has to anticipate what consumers will want to filter on.</li>
  <li><strong>With EventBridge:</strong> the orders service publishes <code>OrderPlaced</code> to a bus and stops thinking. Fulfilment writes a rule matching <code>detail.total &gt;= 1000</code> reading the value straight out of the event body. The producer never anticipated that filter and never needs to know it exists.</li>
</ul>
<p style="line-height: 1.75;">Notice the progression: each step moves more knowledge <em>out of the producer</em> and into the consumer's own configuration. That is the real axis these three services sit on, and it is a much better answer than reciting feature lists.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Practical differences side by side</h4>
<div style="overflow-x: auto; margin-top: 0.75rem;">
<table style="width: 100%; border-collapse: collapse; font-size: 0.92rem;">
  <thead>
    <tr style="background: #f1f5f9; text-align: left;">
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;">Aspect</th>
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;">SQS</th>
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;">SNS</th>
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;">EventBridge</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Delivery model</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Pull (consumer polls)</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Push to subscribers</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Push to rule targets</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Consumers per message</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">One</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Many</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Many (via rules)</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Filtering</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">None</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Message attributes</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Full event body</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Retention if nobody consumes</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Up to 14 days in the queue</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">None — undelivered is gone</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Retries up to 24h, then DLQ</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Ordering option</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Yes (FIFO queues)</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Yes (FIFO topics)</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">No</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">AWS service events built in</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">No</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">No</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Yes</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Scheduling built in</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">No (delay up to 15 min)</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">No</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Yes (cron / rate)</td></tr>
  </tbody>
</table>
</div>
<p style="line-height: 1.75; margin-top: 0.75rem;">Two rows are worth dwelling on. <strong>Retention</strong>: an SQS message waits patiently for up to 14 days, whereas an SNS message with no working subscriber is simply gone — which is why SNS is so often wired to SQS queues rather than directly to consumers. <strong>Ordering</strong>: EventBridge has no FIFO option at all, so any requirement involving sequence has to be solved by routing into an SQS FIFO queue.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The combinations you will actually see</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>EventBridge → SQS → worker:</strong> the most common production shape. EventBridge decides <em>who</em> gets the event; SQS absorbs bursts and lets the worker control its own pace.</li>
  <li><strong>SNS → several SQS queues:</strong> classic fan-out where each consumer needs its own durable buffer and its own retry behaviour, and the filtering needs are simple.</li>
  <li><strong>EventBridge → Lambda directly:</strong> fine for low-volume, fast, non-critical reactions. The moment the consumer is slow, bursty or fragile, a queue belongs in the middle.</li>
  <li><strong>EventBridge → SQS FIFO:</strong> how you get ordering guarantees in a system whose routing lives in EventBridge, using the entity id (like an order id) as the message group so events for one order stay in sequence while different orders still process in parallel.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "I think of it as a spectrum: SQS is a buffer for one consumer group, SNS is push fan-out to many subscribers filtered on simple attributes, and EventBridge is content-based routing across the full event body, with native AWS service and SaaS event sources plus scheduling and replay built in. They're not mutually exclusive — a very common pattern is EventBridge routing into per-consumer SQS queues, combining precise routing with durable buffering."</div>
</div>`,
          examples: [
            `# SQS: any one worker polling this queue picks up the message
aws sqs send-message --queue-url https://sqs.us-east-1.amazonaws.com/123456789012/orders \\
  --message-body '{"orderId":"o-123"}'

# SNS: every subscriber of this topic gets its own copy
aws sns publish --topic-arn arn:aws:sns:us-east-1:123456789012:order-events \\
  --message '{"orderId":"o-123"}' \\
  --message-attributes '{"country":{"DataType":"String","StringValue":"IN"}}'

# EventBridge: routed only if the full event body matches the rule's pattern
aws events put-events --entries '[{
  "EventBusName": "orders-bus",
  "Source": "com.myapp.orders",
  "DetailType": "OrderPlaced",
  "Detail": "{\\"orderId\\":\\"o-123\\",\\"total\\":1499,\\"country\\":\\"IN\\"}"
}]'`,
          ],
          questions: [
            {
              question: "A payments team wants every one of 6 downstream teams to receive a copy of every 'PaymentReceived' event, with only basic filtering by payment method. Which service, and why not the others?",
              solution: "<p><strong>SNS</strong> — it's built exactly for push fan-out: one publish delivers an independent copy to every subscriber, and filtering by a simple attribute like payment method is exactly what SNS message-attribute filters are designed for. SQS wouldn't fan out (only one consumer group would get each message, not all 6 teams), and EventBridge would work but is more machinery than needed for filtering on one simple attribute rather than the full event body.</p>",
            },
            {
              question: "Why might a team choose EventBridge over SNS even though SNS has lower latency and higher throughput?",
              solution: "<p>When routing decisions depend on <strong>rich, nested content</strong> in the message body (not just a couple of flat attributes), when they need to react to <strong>native AWS service events</strong> (like an EC2 state change) or SaaS partner events without writing custom integration code, or when they'll eventually want <strong>scheduling, archiving, or replay</strong> of events — none of which SNS provides. The latency/throughput tradeoff is worth it when the routing and integration flexibility saves significant custom code elsewhere.</p>",
            },
            {
              question: "What does 'EventBridge routing into per-consumer SQS queues' actually buy you over EventBridge invoking each consumer's Lambda directly?",
              solution: "<p>Each SQS queue acts as a <strong>buffer</strong> in front of its consumer, so a slow or temporarily-down consumer doesn't cause events to be dropped or aggressively retried against EventBridge's own retry policy — the queue just holds them. It also lets each consumer control its own <strong>processing concurrency</strong> (how many messages it pulls at once) independently of how fast EventBridge is delivering, which protects downstream systems like databases from being overwhelmed during a burst.</p>",
            },
            {
              question: "An order-processing system must process all events for a single customer in the exact order they happened. EventBridge is already handling the routing. How do you satisfy the ordering requirement?",
              solution: "<p>EventBridge itself gives <strong>no ordering guarantee at all</strong> and has no FIFO mode, so the ordering has to come from somewhere else in the chain. The standard answer is to make the rule's target an <strong>SQS FIFO queue</strong>, using the customer id (or order id) as the <strong>message group id</strong>. Within a message group, SQS FIFO delivers strictly in order and will not hand out the next message until the current one is processed and deleted, while different message groups still process in parallel — so you get per-customer ordering without serialising the whole system down to one consumer. The trade-off is lower throughput than a standard queue and the need for consumers to delete messages promptly, since a stuck message blocks its entire group.</p>",
            },
            {
              question: "Why is SNS so frequently wired to SQS queues rather than directly to the consuming applications?",
              solution: "<p>Because SNS delivery is <strong>push with no retention</strong>: if a subscriber endpoint is down or erroring past its retry policy, that message is simply gone, since SNS has nowhere to park it. Putting an <strong>SQS queue in front of each subscriber</strong> converts the delivery into something durable — the message sits safely in the queue for up to 14 days while the consumer is down, and the consumer drains it at its own pace when it recovers. It also gives each consumer independent retry behaviour, its own dead-letter queue, and the ability to control concurrency, none of which raw SNS push provides. This fan-out-to-queues shape is so standard that it is worth naming explicitly in an interview rather than describing SNS subscribers generically.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html",
            "https://aws.amazon.com/sns/",
            "https://aws.amazon.com/sqs/",
          ],
        },
        {
          topic: "IAM Permissions Basics — Who Can Publish, and What Can EventBridge Invoke",
          tags: ["aws", "eventbridge", "iam", "permissions", "resource policy"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  EventBridge sits in the middle of two separate permission questions, and beginners frequently mix them up: <strong>who is allowed to publish events onto a bus</strong>, and <strong>what is EventBridge itself allowed to invoke on a matched rule's behalf</strong>. Getting these confused is one of the most common causes of "my rule matched but nothing happened."
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Question 1: Can this caller publish to the bus?</h4>
<p style="line-height: 1.75;">Any principal (a user, a role, a Lambda function's execution role) that calls <code>PutEvents</code> needs an <strong>IAM policy</strong> granting <code>events:PutEvents</code> on that specific bus's ARN. This is a completely ordinary IAM identity-based permission, exactly like needing <code>s3:PutObject</code> to upload to a bucket. If you want a <em>different AWS account</em> to publish to your bus, you additionally need a <strong>resource policy on the bus itself</strong> naming that account as an allowed principal — a plain IAM policy in the other account isn't enough on its own, because your bus also has to agree to accept events from them.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Question 2: Can EventBridge invoke this target?</h4>
<p style="line-height: 1.75;">This is the one beginners miss most often. Matching a rule does not automatically mean the target gets invoked — <strong>EventBridge itself needs permission to call the target</strong>, and that permission is granted in one of two ways depending on the target type:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Resource-based policy targets</strong> (Lambda, SNS, SQS, CloudWatch Logs): the target resource itself carries a policy statement allowing the <code>events.amazonaws.com</code> service principal to invoke it, usually scoped down with a condition so only a specific rule's ARN can trigger it. The AWS console adds this automatically when you set up a rule through it; the CLI/IaC requires you to add it yourself (e.g. <code>aws lambda add-permission</code> for a Lambda target).</li>
  <li><strong>IAM role targets</strong> (Step Functions, ECS tasks, Kinesis, API destinations): the target definition on the rule includes an <strong>IAM role ARN</strong> that EventBridge assumes at invocation time. That role needs a trust policy allowing the EventBridge service to assume it, plus whatever permissions the actual action needs (e.g. <code>states:StartExecution</code>).</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">A simple mental model</h4>
<p style="line-height: 1.75;">Think of it as two independent doors: the first door is "can data get onto the bus at all" (producer's IAM permission, plus a bus resource policy for cross-account), and the second door is "once a rule matches, can EventBridge actually knock on the target's door" (a target permission, one of the two mechanisms above). A rule can match perfectly and still silently fail to deliver if only the second door is locked — which is exactly why the <code>FailedInvocations</code> CloudWatch metric and a dead-letter queue matter even at a beginner level.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">How each failure actually looks</h4>
<p style="line-height: 1.75;">The two doors fail in visibly different ways, and recognising which one you are looking at saves a lot of time:</p>
<div style="overflow-x: auto; margin-top: 0.75rem;">
<table style="width: 100%; border-collapse: collapse; font-size: 0.92rem;">
  <thead>
    <tr style="background: #f1f5f9; text-align: left;">
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;">What is missing</th>
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;">What you observe</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Producer lacks <code>events:PutEvents</code></td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">The producer's own code sees the failure — an <code>AccessDeniedException</code>, or a non-zero <code>FailedEntryCount</code> in the PutEvents response. Nothing appears on the bus.</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Bus resource policy missing (cross-account)</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Same as above, but only for the external account — your own account's producers work fine, which makes it look like an application bug rather than a permission one.</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">EventBridge cannot invoke the target</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Everything upstream looks healthy — <code>MatchedEvents</code> climbs normally — but the target never runs and <code>FailedInvocations</code> rises. The producer sees no error at all.</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Target role lacks the action permission</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Same signature as above. The role exists and is assumable, but the underlying call (for example <code>states:StartExecution</code>) is denied, so delivery still fails.</td></tr>
  </tbody>
</table>
</div>
<p style="line-height: 1.75; margin-top: 0.75rem;">The pattern to internalise: <strong>publish-side permission problems are loud</strong> (the producer gets an exception it can log and alert on), while <strong>delivery-side permission problems are silent</strong> from the producer's point of view. That asymmetry is the single biggest reason a dead-letter queue and a <code>FailedInvocations</code> alarm are not optional extras.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Why this trips up people who started in the console</h4>
<p style="line-height: 1.75;">When you create a rule through the AWS console and pick a Lambda target, the console <strong>quietly adds the resource-based policy statement for you</strong>. Everything works first time, and you never learn that the permission exists. Then the same person writes the rule in Terraform, CloudFormation or the CLI, where nothing is added automatically, and the rule matches perfectly while the function never runs. If you learn one thing from this topic, let it be: <strong>console success does not mean your infrastructure-as-code will work</strong>, because the console did an invisible extra step on your behalf.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Habits worth forming immediately</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Scope <code>events:PutEvents</code> to a specific bus ARN</strong>, never <code>Resource: "*"</code>. A service should be able to publish to its own domain bus and nothing else.</li>
  <li><strong>Always add a source condition</strong> when granting the <code>events.amazonaws.com</code> principal access to a target. Without one, the grant technically allows any EventBridge rule — including from another AWS account — to invoke your function. Scoping it with the rule's ARN closes that.</li>
  <li><strong>Give each target role only the one action it needs</strong> (<code>states:StartExecution</code>, not <code>states:*</code>), because a target role is an identity EventBridge assumes on your behalf and should be as narrow as the job.</li>
  <li><strong>Grant the DLQ its permission too.</strong> A dead-letter queue is itself a target EventBridge must write to, so its queue policy needs a statement allowing <code>sqs:SendMessage</code> from the events service — a DLQ that silently cannot be written to is worse than no DLQ, because you believe you are covered.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "There are two separate permission questions: can the producer call PutEvents on the bus, which is a normal IAM policy plus a bus resource policy for cross-account publishing; and can EventBridge invoke the target once a rule matches, which for resource-policy targets like Lambda or SQS means adding a policy statement for the events.amazonaws.com principal, and for role-based targets like Step Functions means giving the rule an IAM role EventBridge can assume. A rule matching successfully doesn't guarantee delivery if that second permission is missing."</div>
</div>`,
          examples: [
            `# Producer-side IAM policy: allow this role to publish to one bus
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": "events:PutEvents",
    "Resource": "arn:aws:events:us-east-1:123456789012:event-bus/orders-bus"
  }]
}

# Resource-based permission so EventBridge can invoke a Lambda target
aws lambda add-permission --function-name notify-sales --statement-id eb-high-value \\
  --action lambda:InvokeFunction --principal events.amazonaws.com \\
  --source-arn arn:aws:events:us-east-1:123456789012:rule/orders-bus/high-value-orders

# IAM role trust policy for a role-based target (e.g. Step Functions)
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "Service": "events.amazonaws.com" },
    "Action": "sts:AssumeRole"
  }]
}`,
          ],
          questions: [
            {
              question: "You created a rule and it shows the correct number of matches in CloudWatch, but the Lambda target never runs. What's the most likely cause?",
              solution: "<p>The rule matching successfully only proves the <strong>producer's</strong> permission and the <strong>pattern</strong> are both fine — it says nothing about whether <strong>EventBridge is allowed to invoke the target</strong>. The most likely cause is a missing resource-based policy statement on the Lambda function allowing the <code>events.amazonaws.com</code> principal (scoped to that rule's ARN) to call <code>lambda:InvokeFunction</code>. This is easy to miss when rules are created via CLI/IaC rather than the console, since the console adds this permission automatically but the CLI does not.</p>",
            },
            {
              question: "Why does publishing across AWS accounts need more than just an IAM policy on the publishing side?",
              solution: "<p>An IAM policy only controls what the <strong>caller's own account</strong> allows that caller to attempt — it can't unilaterally grant access into a resource that lives in a different account. The destination bus's owner must explicitly agree to accept events from the other account by attaching a <strong>resource policy</strong> to the bus (naming the source account, or an entire AWS Organization via <code>aws:PrincipalOrgID</code>). Both sides have to agree: the caller's IAM policy says &quot;I'm allowed to try,&quot; and the bus's resource policy says &quot;I accept requests from you.&quot;</p>",
            },
            {
              question: "What's the difference between how Lambda gets permission to be invoked versus how Step Functions gets permission, and why aren't they the same mechanism?",
              solution: "<p>Lambda supports <strong>resource-based policies</strong> — a policy document attached directly to the function itself that can name an external service principal as an allowed caller, so EventBridge just needs a statement added to that policy. Step Functions state machines don't support that kind of resource policy for this purpose, so instead the <strong>rule's target configuration</strong> supplies an IAM role, and EventBridge assumes that role (via <code>sts:AssumeRole</code>) to call <code>StartExecution</code> — permission flows through an assumed identity rather than through a policy on the target resource itself. Both approaches achieve the same goal, but which one applies depends entirely on what permission model the target service supports.</p>",
            },
            {
              question: "A rule works perfectly when created in the console, but the identical rule defined in Terraform does not invoke its Lambda target. What happened?",
              solution: "<p>The console silently performed an extra step that the infrastructure-as-code definition did not: when you attach a Lambda target through the console, it <strong>automatically adds a resource-based policy statement on the function</strong> permitting the <code>events.amazonaws.com</code> principal to invoke it, scoped to that rule. Terraform, CloudFormation and the raw CLI do no such thing — they create exactly what you declared and nothing more. The fix is to declare that permission explicitly alongside the rule (an <code>aws_lambda_permission</code> resource, or <code>lambda add-permission</code> in the CLI). This is one of the most common real-world EventBridge bugs precisely because the console experience teaches people the permission does not exist.</p>",
            },
            {
              question: "Why is it dangerous to grant the events.amazonaws.com principal access to a Lambda function without any conditions?",
              solution: "<p>Because the grant names a <strong>service principal, not a specific caller</strong>. EventBridge is the entity making the invocation, so any rule that EventBridge evaluates satisfies that policy — including a rule created in a completely different AWS account. An unconditioned statement therefore means a stranger who knows your function ARN can point their own rule at it and trigger your code. The remediation is to always add a condition on <strong><code>aws:SourceArn</code></strong> pinned to the exact rule ARN allowed to invoke it (and <code>aws:SourceAccount</code> as a second layer). This general shape of vulnerability, where a trusted intermediary service is tricked into acting for an untrusted party, is known as the confused deputy problem.</p>",
            },
            {
              question: "You configured a dead-letter queue on a target, but when invocations fail, nothing arrives in the DLQ. What is the most likely reason?",
              solution: "<p>The <strong>DLQ's own queue policy</strong> probably does not allow EventBridge to write to it. A dead-letter queue is just another destination EventBridge must be permitted to deliver to, so the SQS queue policy needs a statement allowing the <code>events.amazonaws.com</code> service principal to perform <code>sqs:SendMessage</code> on that queue, ideally conditioned on the rule ARN. Configuring the DLQ on the target only tells EventBridge <em>where to try</em> sending failures — it does not grant the permission to do so. This failure mode is particularly nasty because it produces a false sense of safety: you believe failed events are being captured while they are actually being dropped, so it is worth verifying the DLQ by deliberately breaking a target once in a non-production environment.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-troubleshooting.html",
            "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-use-resource-based.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_terms-and-concepts.html",
          ],
        },
        {
          topic: "Scheduled Rules — Running a Target on a Cron or Rate Expression",
          tags: ["aws", "eventbridge", "scheduled rules", "cron", "rate expression"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Besides reacting to events, a rule on the default bus can also trigger purely on a <strong>time schedule</strong>, with no incoming event at all — this is the simplest, most beginner-friendly way to run something periodically on AWS without managing a server or a cron daemon yourself.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Two expression types</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Rate expressions</strong>: the simple case — "every N minutes/hours/days." Example: <code>rate(5 minutes)</code>, <code>rate(1 day)</code>.</li>
  <li><strong>Cron expressions</strong>: for anything more specific than a fixed interval — "every weekday at 9am," "on the first of the month." AWS's cron syntax has six fields: <code>minutes hours day-of-month month day-of-week year</code>, for example <code>cron(0 9 ? * MON-FRI *)</code> for 9:00 AM every weekday.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">How it works</h4>
<p style="line-height: 1.75;">You create a rule exactly like an event-pattern rule, except instead of an event pattern you give it a <strong>schedule expression</strong>. When the schedule fires, EventBridge generates a synthetic event and delivers it to the rule's targets — same targets, same permission model, same retry behavior as pattern-matched rules. This is genuinely useful for beginner-level tasks: running a nightly cleanup Lambda, triggering a daily report, polling an external API on an interval, or kicking off a periodic health check.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The important limitation to know</h4>
<p style="line-height: 1.75;">Scheduled rules on the default bus only support the <strong>UTC time zone</strong> — there's no built-in daylight-saving or local-time handling, so a rule meant to fire "at 9am India time" has to be hand-calculated into the equivalent UTC cron expression, and that calculation silently breaks whenever a target time zone observes daylight saving. They also can't easily do a genuinely <strong>one-time</strong> "run once, three days from now, then stop" schedule — a rate/cron expression describes a recurring pattern, not a single future moment. (A more capable, timezone-aware, one-time-schedule-friendly service called EventBridge Scheduler exists for exactly these gaps, but it's a more advanced topic beyond this beginner-level rule mechanism.)</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Reading an AWS cron expression field by field</h4>
<p style="line-height: 1.75;">AWS cron has <strong>six</strong> fields, not the five most people know from Linux — the extra field is the year. Reading <code>cron(0 9 ? * MON-FRI *)</code> left to right:</p>
<div style="overflow-x: auto; margin-top: 0.75rem;">
<table style="width: 100%; border-collapse: collapse; font-size: 0.92rem;">
  <thead>
    <tr style="background: #f1f5f9; text-align: left;">
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;">Position</th>
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;">Field</th>
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;">Value here</th>
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;">Meaning</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">1</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Minutes</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;"><code>0</code></td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">On the hour</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">2</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Hours</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;"><code>9</code></td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">09:00 UTC</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">3</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Day of month</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;"><code>?</code></td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Not specified — defer to day-of-week</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">4</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Month</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;"><code>*</code></td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Every month</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">5</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Day of week</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;"><code>MON-FRI</code></td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Weekdays only</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">6</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Year</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;"><code>*</code></td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Every year</td></tr>
  </tbody>
</table>
</div>
<p style="line-height: 1.75; margin-top: 0.75rem;">The <code>?</code> deserves special attention because it causes more failed <code>put-rule</code> calls than anything else. Day-of-month and day-of-week are <strong>mutually exclusive</strong> — specifying both would be contradictory ("the 15th, but only if it is a Tuesday"), so AWS requires that exactly one of them is <code>?</code>, meaning "no specific value, use the other field." Putting <code>*</code> in both is rejected. If you are scheduling by weekday, day-of-month is <code>?</code>; if you are scheduling by date, day-of-week is <code>?</code>.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What a schedule actually guarantees</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Minute granularity only.</strong> The finest interval is one minute — there is no way to run something every 30 seconds with a scheduled rule. If you need sub-minute work, the usual trick is a one-minute schedule whose target loops internally, or a different mechanism entirely.</li>
  <li><strong>Approximate, not exact.</strong> Invocation is <em>best effort</em> and may be delayed, typically by seconds but occasionally longer. A rule set for 09:00 is not a real-time guarantee, so never build logic that assumes the target ran at exactly the stated instant.</li>
  <li><strong>At-least-once, like everything else in EventBridge.</strong> A scheduled rule can in rare cases fire its target more than once for the same slot. A nightly job that charges customers or sends emails must therefore be <strong>idempotent</strong> — typically by recording "job X already ran for date D" before doing the work.</li>
  <li><strong>And it can occasionally be skipped.</strong> Because delivery is best effort, a critical job should verify it actually ran rather than assuming, for example by emitting a heartbeat metric the target writes on success and alarming when that metric is missing.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Common beginner mistakes</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Writing <code>rate(1 minutes)</code> — the unit must be <strong>singular for a value of one</strong>: <code>rate(1 minute)</code>, but <code>rate(5 minutes)</code>.</li>
  <li>Using <code>*</code> in both the day-of-month and day-of-week fields, which AWS rejects, instead of <code>?</code> in one of them.</li>
  <li>Assuming a cron expression is in local time. It is always <strong>UTC</strong>, so a schedule that looks correct to the author fires at an entirely different local hour.</li>
  <li>Forgetting the <strong>target permission</strong>. A scheduled rule needs exactly the same invoke permission as a pattern-matched rule — the fact that there is no incoming event does not exempt it.</li>
  <li>Creating a scheduled rule on a <strong>custom bus</strong>. Schedule expressions are only supported on the <strong>default</strong> bus, and a rule created elsewhere with a schedule will not fire.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "A rule can trigger on a schedule instead of an event pattern, using either a simple rate expression like 'every 5 minutes' or a cron expression for something more specific like '9am every weekday.' It's the easiest way to run something periodically without managing my own cron daemon or server. The catch at this level is that scheduled rules only understand UTC, so I have to convert any local time zone myself, and they're built for recurring schedules, not clean one-off 'run this once in 3 days' timers."</div>
</div>`,
          examples: [
            `# Rate expression: run every 15 minutes
aws events put-rule --name poll-partner-api --schedule-expression "rate(15 minutes)"

# Cron expression: 9:00 AM UTC every weekday
aws events put-rule --name weekday-report --schedule-expression "cron(0 9 ? * MON-FRI *)"

# Attach a Lambda target to the scheduled rule
aws events put-targets --rule weekday-report --targets '[{
  "Id": "daily-report", "Arn": "arn:aws:lambda:us-east-1:123456789012:function:daily-report"
}]'
aws lambda add-permission --function-name daily-report --statement-id eb-schedule \\
  --action lambda:InvokeFunction --principal events.amazonaws.com \\
  --source-arn arn:aws:events:us-east-1:123456789012:rule/weekday-report`,
          ],
          questions: [
            {
              question: "You need a report to run at 9:00 AM India Standard Time (IST, UTC+5:30) every weekday. How do you express that in a default-bus scheduled rule?",
              solution: "<p>Since scheduled rules only understand <strong>UTC</strong>, you convert 9:00 AM IST to UTC by subtracting 5 hours 30 minutes, giving 3:30 AM UTC, so the expression is <code>cron(30 3 ? * MON-FRI *)</code>. The important caveat to state out loud: this is a fixed offset calculated by hand, so it does not automatically track daylight-saving shifts in time zones that observe it (India doesn't observe DST, so this particular example is stable, but the general limitation still applies) — a time-zone-aware alternative like EventBridge Scheduler avoids this manual conversion entirely.</p>",
            },
            {
              question: "What's the difference between a rate expression and a cron expression, and when would you pick one over the other?",
              solution: "<p>A <strong>rate expression</strong> (<code>rate(5 minutes)</code>) describes a simple, fixed interval starting from when the rule is created — good for polling or periodic checks where the exact clock time doesn't matter, only the spacing. A <strong>cron expression</strong> (<code>cron(0 9 ? * MON-FRI *)</code>) specifies exact calendar/clock conditions — a specific time of day, specific days of the week or month — which you need whenever the requirement is phrased in terms of a real-world schedule like &quot;every weekday morning&quot; rather than &quot;every X minutes.&quot;</p>",
            },
            {
              question: "Why can't you cleanly use a scheduled rule to say 'send this specific reminder exactly once, three days from now, then never again'?",
              solution: "<p>Rate and cron expressions both describe <strong>recurring patterns</strong> relative to a fixed starting point or calendar rule — there's no first-class 'fire once at this exact future timestamp and then stop' expression in the basic scheduled-rule mechanism. You could approximate it with a narrow cron window plus manual rule deletion afterward, but that's awkward at scale (imagine needing this per customer order). This exact gap — one-time, self-cleaning, per-entity schedules — is what a more advanced dedicated scheduling service is built to solve properly.</p>",
            },
            {
              question: "Why does AWS cron require a question mark in either the day-of-month or day-of-week field?",
              solution: "<p>Because those two fields describe the same thing — which days the schedule fires — in two incompatible ways, and specifying both would be self-contradictory. Asking for the 15th of the month <em>and</em> Tuesdays has no coherent meaning: does it fire on the 15th only when that happens to be a Tuesday, or on both? AWS resolves the ambiguity by requiring exactly one of the two fields to be <code>?</code>, which means no specific value, defer to the other field. So a weekday schedule puts <code>?</code> in day-of-month (<code>cron(0 9 ? * MON-FRI *)</code>) and a monthly schedule puts <code>?</code> in day-of-week (<code>cron(0 0 1 * ? *)</code> for midnight on the first of every month). Putting <code>*</code> in both is rejected outright.</p>",
            },
            {
              question: "A nightly billing job runs on a scheduled rule. Why must it be idempotent, and how would you verify it actually ran?",
              solution: "<p>Scheduled rules inherit EventBridge's <strong>at-least-once</strong> delivery, so in rare cases the target can be invoked more than once for the same scheduled slot — which for a billing job means charging a customer twice. The job must therefore record that it has run for a given logical period before doing the work, typically with a conditional write keyed on something like <code>billing-run-2026-09-17</code>, so a duplicate invocation detects the existing record and exits cleanly. Verification is the mirror-image problem: because delivery is best effort, an invocation can also be <strong>delayed or missed</strong>, and a job that silently never ran produces no error anywhere. The standard answer is a <strong>heartbeat</strong> — the job emits a custom CloudWatch metric on successful completion, and an alarm fires when that metric is missing for longer than the expected interval, using missing-data-treated-as-breaching so silence triggers the alarm rather than suppressing it.</p>",
            },
            {
              question: "You created a rule with a schedule expression on your custom orders-bus and it never fires. What is wrong?",
              solution: "<p>Schedule expressions are only supported on the <strong>default event bus</strong>. A rule created on a custom bus with a <code>ScheduleExpression</code> will be accepted in some tooling but will never trigger, because the scheduling mechanism is attached to the default bus specifically. The fix is to create the scheduled rule on the default bus (simply omit the event-bus name, which defaults correctly) and have its target do whatever work is needed — including publishing an event onto your custom bus if the downstream consumers live there. For anything more sophisticated than that, the dedicated EventBridge Scheduler service sits outside the bus model entirely and has no such restriction.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-rule-schedule.html",
            "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rate-expressions.html",
            "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-cron-expressions.html",
          ],
        },
        {
          topic: "Monitoring Basics — CloudWatch Metrics & Basic Troubleshooting",
          tags: ["aws", "eventbridge", "cloudwatch", "monitoring", "troubleshooting"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  EventBridge is largely invisible when it works — there's no server to SSH into and check, no dashboard by default showing "is my event still in flight." At a beginner level, knowing the handful of CloudWatch metrics EventBridge publishes automatically is the difference between confidently answering "how would you know if this broke" and shrugging.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The core metrics, per rule and per bus</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Invocations</strong>: how many times a rule attempted to invoke its target(s). A sudden drop to zero when you expect steady traffic is a red flag that events aren't matching or aren't arriving at all.</li>
  <li><strong>TriggeredRules</strong>: how many rules matched a given event — useful bus-wide health signal.</li>
  <li><strong>MatchedEvents</strong>: how many events matched a specific rule's pattern — if this is zero when you expect matches, the problem is almost always the <strong>event pattern</strong> itself (a typo, wrong field path, or the producer sending a slightly different shape than expected).</li>
  <li><strong>FailedInvocations</strong>: how many target invocations failed even after retries were exhausted — the single most important metric to alarm on, since a nonzero value here means events are being lost (or landing in a DLQ, if one is configured).</li>
  <li><strong>ThrottledRules</strong> / <strong>Throttles</strong>: how often a rule or target hit a rate limit — a sign you're publishing or matching faster than a downstream target (or EventBridge itself) can currently handle.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">A simple beginner troubleshooting order</h4>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Check MatchedEvents first.</strong> If it's zero, the event either never arrived on the bus (check the producer's permissions and that <code>PutEvents</code> actually succeeded) or the pattern doesn't match the real event shape (use <code>aws events test-event-pattern</code> against a real sample event to check this directly).</li>
  <li><strong>If MatchedEvents is nonzero but the target never ran, check Invocations and FailedInvocations.</strong> This usually points to a missing target permission (see the IAM permissions topic) rather than a pattern problem.</li>
  <li><strong>Check the target's own logs/metrics.</strong> If EventBridge successfully invoked a Lambda but the Lambda itself errored, that shows up in the Lambda's own CloudWatch Logs and error metrics, not in EventBridge's.</li>
  <li><strong>Check the dead-letter queue, if one is configured.</strong> Anything that exhausted retries lands there with error details attached — the fastest way to see exactly why a specific event failed.</li>
</ol>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Logging the raw events</h4>
<p style="line-height: 1.75;">For debugging during development, a very simple beginner technique is to add a <strong>CloudWatch Logs target</strong> to a rule (in addition to your real target) — every matched event gets written as plain log lines you can read directly, which is often faster than reasoning about metrics alone when you just want to see exactly what an event looked like.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Where to find these metrics</h4>
<p style="line-height: 1.75;">All of them live in the <strong><code>AWS/Events</code></strong> CloudWatch namespace, and the useful ones carry a <strong><code>RuleName</code></strong> dimension so you can look at one rule in isolation rather than an account-wide total. That per-rule breakdown is what makes them actionable: an account-wide <code>FailedInvocations</code> of 40 tells you something is broken somewhere, while the same metric split by <code>RuleName</code> tells you exactly which rule to go and fix. They are published automatically at no extra cost — there is nothing to enable.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The minimum useful alarm set</h4>
<p style="line-height: 1.75;">For any rule that matters, three alarms cover the overwhelming majority of real incidents:</p>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong><code>FailedInvocations</code> greater than zero.</strong> This is the "events are being lost" alarm, and it should page someone. Any non-zero value means retries were exhausted and events either went to a dead-letter queue or were dropped entirely.</li>
  <li><strong>Dead-letter queue depth greater than zero.</strong> Catches the same failures from the other side, and gives you the actual failed events with error metadata attached so you can see <em>why</em> rather than just <em>that</em>.</li>
  <li><strong>An absence-of-traffic alarm on <code>MatchedEvents</code>.</strong> This is the one beginners never think of and it is arguably the most valuable. If a producer stops publishing, or a rule's pattern silently stops matching because someone renamed a field in the event, <em>nothing errors</em> — every error metric stays at a comforting zero while the business process quietly stops. An alarm that fires when a normally-busy rule sees <em>no</em> matches for some period is the only thing that catches this.</li>
</ol>
<p style="line-height: 1.75;">For that third alarm to work, CloudWatch must be told to treat missing data as a breach rather than ignoring it — otherwise a rule producing no datapoints at all leaves the alarm sitting in an insufficient-data state, which is exactly the failure you were trying to detect.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What these metrics cannot tell you</h4>
<p style="line-height: 1.75;">EventBridge's metrics stop at the boundary of EventBridge's own responsibility, and understanding that boundary prevents a lot of wasted debugging:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>They do not tell you whether the work succeeded.</strong> If EventBridge successfully invokes a Lambda and that Lambda then throws an exception, EventBridge counts a successful invocation. The failure lives in the Lambda's own error metric and logs, not in <code>AWS/Events</code>.</li>
  <li><strong>They do not show event contents.</strong> Metrics are counts. To see the actual JSON of what flowed through, you need a CloudWatch Logs target, a DLQ message, or logging inside the consumer.</li>
  <li><strong>They do not trace a single event end to end.</strong> A count of 500 matched events cannot tell you what happened to <em>your</em> specific order. That requires a correlation id carried in the event payload and searched across consumer logs, or distributed tracing.</li>
  <li><strong>They do not cover the producer side.</strong> An application that fails to call <code>PutEvents</code> at all, or ignores a partial failure in the response, generates no EventBridge metric whatsoever — the event simply never existed.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "I lean on a handful of built-in CloudWatch metrics: MatchedEvents to confirm the pattern is actually matching, Invocations and FailedInvocations to confirm the target was called and succeeded, and ThrottledRules if I suspect a rate limit. My troubleshooting order is pattern first, then target permissions, then the target's own logs — and during development I'll often add a CloudWatch Logs target alongside the real one just to see the raw event shape directly."</div>
</div>`,
          examples: [
            `# Check whether a rule's pattern is even matching
aws cloudwatch get-metric-statistics --namespace AWS/Events --metric-name MatchedEvents \\
  --dimensions Name=RuleName,Value=high-value-orders \\
  --start-time 2026-09-17T00:00:00Z --end-time 2026-09-18T00:00:00Z --period 3600 --statistics Sum

# Check for failed invocations across the bus
aws cloudwatch get-metric-statistics --namespace AWS/Events --metric-name FailedInvocations \\
  --start-time 2026-09-17T00:00:00Z --end-time 2026-09-18T00:00:00Z --period 3600 --statistics Sum

# Add a CloudWatch Logs target for quick visual debugging during development
aws events put-targets --rule high-value-orders --targets '[{
  "Id": "debug-logs", "Arn": "arn:aws:logs:us-east-1:123456789012:log-group:/eventbridge/debug"
}]'`,
          ],
          questions: [
            {
              question: "MatchedEvents is 0 for a rule you expect to be firing constantly. What do you check first, and why?",
              solution: "<p>Check whether events are actually reaching the bus at all, and whether the <strong>event pattern</strong> matches their real shape — in that order. First confirm the producer's <code>PutEvents</code> calls are succeeding (check the producer's own logs/response, and that it has <code>events:PutEvents</code> permission on the right bus). If events are arriving but MatchedEvents is still 0, the pattern itself is the problem — run <code>aws events test-event-pattern</code> with a real sample event to see exactly why it isn't matching, which is much faster than guessing at the JSON by eye.</p>",
            },
            {
              question: "FailedInvocations is nonzero but MatchedEvents looks normal. What does this tell you, and what shouldn't you waste time checking?",
              solution: "<p>It tells you the <strong>pattern is working fine</strong> — events are matching as expected — so the problem is downstream, on the target-invocation side: most likely a <strong>missing target permission</strong> (see the IAM permissions topic) or the target itself erroring/throttling. There's no point re-checking or rewriting the event pattern here, since MatchedEvents already proves that part of the pipeline is healthy; time is better spent on the target's permission policy and its own CloudWatch Logs.</p>",
            },
            {
              question: "Why would you temporarily add a CloudWatch Logs target to a rule that already has a real target, like a Lambda function?",
              solution: "<p>It gives you a simple, direct way to see the <strong>exact raw JSON</strong> of every event that matched the rule, without needing to add temporary logging code inside the Lambda itself or reason indirectly through metrics. It's a low-effort, low-risk debugging technique — the extra target doesn't affect the existing Lambda target at all — commonly used during development or when investigating why a target seems to be receiving unexpected data, then removed once the issue is understood.</p>",
            },
            {
              question: "Every EventBridge metric looks healthy — matches are normal, invocations succeed, no failures — but the business process is clearly not completing. Where is the problem?",
              solution: "<p>Almost certainly <strong>inside the target</strong>, past EventBridge's boundary of responsibility. EventBridge counts an invocation as successful once it has handed the event to the target and received an acceptance — if the Lambda then throws an exception, times out, or completes but writes to the wrong place, that is invisible to <code>AWS/Events</code> entirely. The investigation moves to the target's own telemetry: the Lambda's error and duration metrics, its CloudWatch Logs, and any dead-letter queue configured on the <em>function</em> rather than on the rule. This split is worth stating explicitly in an interview, because it shows you understand that EventBridge guarantees delivery, not outcome.</p>",
            },
            {
              question: "Why is an alarm on the absence of events often more valuable than an alarm on errors, and what configuration detail makes it work?",
              solution: "<p>Because the most dangerous failures in an event-driven system are <strong>silent</strong>. If a producer is deployed with a bug and stops publishing, or a rule's pattern stops matching because a field was renamed in the event payload, there is no error anywhere — <code>FailedInvocations</code> stays at zero, no target throws, no dead-letter queue fills, and every error dashboard stays green while the process quietly stops running. An alarm on <code>MatchedEvents</code> falling below a low threshold for a rule that is normally busy is the only signal that catches this class of problem. The configuration detail that makes it work is telling CloudWatch to <strong>treat missing data as breaching</strong>: if the rule produces no datapoints at all, the default behaviour leaves the alarm in an insufficient-data state and it never fires, which defeats the entire purpose.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-monitoring.html",
            "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-metrics.html",
            "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-troubleshooting.html",
          ],
        },
        {
          topic: "Pricing Basics — What You Actually Pay For",
          tags: ["aws", "eventbridge", "pricing", "cost basics"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  EventBridge pricing is refreshingly simple compared to services with many billing dimensions, but there is one very common beginner confusion worth clearing up: <strong>AWS service events on the default bus are free</strong>, while <strong>custom events on your own buses are billed per event published</strong>.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What's free</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Events published by <strong>AWS services themselves</strong> onto the default bus (EC2 state changes, CodePipeline transitions, etc.) — you don't pay per-event for these.</li>
  <li>Rule matching and target invocation logic on the default bus for those free AWS-service events.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What you pay for</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Custom events</strong>: every event you publish with <code>PutEvents</code> to a custom bus (or the default bus, for your own application events) is billed per million events published — a small, usage-based cost that scales with how much your application actually publishes.</li>
  <li><strong>Cross-account/cross-region forwarding</strong>: when a rule forwards an event to a bus in another account or Region, that forwarded delivery counts as a new billable event on the receiving side.</li>
  <li><strong>Schema discovery</strong> and <strong>archive storage</strong> (covered at an intermediate/advanced level) have their own small per-GB or per-event costs, separate from the base publishing cost.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What's notably not billed separately</h4>
<p style="line-height: 1.75;">Unlike some messaging services, there's no separate per-target-invocation charge layered on top of the per-event publish cost for standard rule routing — you're mainly paying for getting events <em>onto</em> the bus, not for each place a matched event fans out to (though the downstream target itself, like a Lambda invocation, has its own separate billing that's unrelated to EventBridge). As a beginner, the practical cost lever is simply: don't publish more events than you need, and avoid publishing extremely chatty, high-frequency custom events if a cheaper mechanism (like a direct function call within the same service) would do the job just as well.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">A worked example</h4>
<p style="line-height: 1.75;">Custom events are priced <strong>per million published</strong> (on the order of a dollar per million in most Regions — always check current pricing for your Region rather than quoting a number from memory in a real design). Working through a concrete case makes the shape clear:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>An application sustains <strong>100 custom events per second</strong>, which is roughly <strong>260 million events per month</strong>.</li>
  <li>At around a dollar per million, that is <strong>a few hundred dollars a month</strong> for the EventBridge publishing itself — noticeable, but rarely the dominant line item.</li>
  <li>Now suppose each event matches <strong>3 rules</strong>, each invoking a Lambda. EventBridge does not charge extra for that fan-out, but you have just created <strong>780 million Lambda invocations</strong>, which will cost substantially more than the EventBridge bill.</li>
</ul>
<p style="line-height: 1.75;">The lesson is the one that surprises people: <strong>in most architectures EventBridge is not the expensive part — what it triggers is</strong>. A tight event pattern that prevents a target from being invoked at all saves far more money than any optimisation of the publishing side, because it removes a downstream invocation rather than a fraction of a cent of routing.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The other billable dimensions</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Archive storage</strong> is billed per GB per month for however long you retain events — cheap for a modest domain bus, meaningful if you archive everything indefinitely at high volume.</li>
  <li><strong>Replay</strong> is billed for the events replayed, because each replayed event is processed like a new one.</li>
  <li><strong>Schema discovery</strong> has its own per-event ingestion charge while it is enabled, which is why it is usually turned on temporarily to learn a bus's shapes rather than left running forever.</li>
  <li><strong>Cross-account and cross-Region forwarding</strong> bills the forwarded event again on the receiving side, so a central-bus architecture roughly doubles the per-event cost for forwarded traffic.</li>
  <li><strong>Scheduler invocations</strong> are billed per invocation, which matters if you create millions of one-time per-entity schedules.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Cost habits worth forming early</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Filter in the rule pattern, not in the consumer.</strong> A pattern that excludes an event costs nothing; a Lambda that starts up, inspects the event and decides to do nothing costs a full invocation. This is the single highest-leverage cost decision in an event-driven system.</li>
  <li><strong>Do not publish an event for every internal state change.</strong> Events are for facts other services care about. Chatty, fine-grained internal events multiply cost across the whole fan-out without anyone consuming them meaningfully.</li>
  <li><strong>Keep events small.</strong> Large payloads push toward the 256 KB limit and encourage storing bulky data you then pay to archive; put big blobs in S3 and reference them.</li>
  <li><strong>Set archive retention deliberately.</strong> Indefinite retention on a high-volume bus is a cost that grows forever and is easy to forget about.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "The key distinction is that AWS service events on the default bus are free, while custom events I publish myself — to a custom bus or the default bus — are billed per event, priced per million. Cross-account or cross-region forwarding counts as a new billable event on the receiving side. There's no extra per-target fan-out charge on top of that from EventBridge itself, though the target being invoked, like a Lambda function, has its own separate cost."</div>
</div>`,
          examples: [
            `# Free: AWS service events flowing to the default bus need no PutEvents call from you
# (EC2, CodePipeline, GuardDuty, etc. publish these automatically at no per-event cost)

# Billed: your own application publishing custom events
aws events put-events --entries '[{
  "EventBusName": "orders-bus",
  "Source": "com.myapp.orders",
  "DetailType": "OrderPlaced",
  "Detail": "{\\"orderId\\":\\"o-123\\"}"
}]'
# Each entry in this call is one billable custom event`,
          ],
          questions: [
            {
              question: "A teammate says 'EventBridge is basically free since AWS events don't cost anything.' What's wrong with that statement for a typical application?",
              solution: "<p>That's only true for events <strong>AWS services themselves</strong> publish onto the default bus. Almost every real application-level use of EventBridge involves publishing your <strong>own custom events</strong> (order placed, user signed up, etc.), and those are billed per event published, priced per million. For a high-volume application publishing many custom events per second, this can be a meaningful and worth-monitoring cost line, not a free service.</p>",
            },
            {
              question: "Does adding a fourth target to a rule with three targets roughly quadruple the EventBridge cost for that rule?",
              solution: "<p>No — EventBridge's core cost is centered on <strong>events published</strong> (the <code>PutEvents</code> call), not on how many targets a matched rule fans out to. Adding more targets to the same rule doesn't multiply the EventBridge-side cost the way, for example, adding more SNS subscribers can add per-delivery cost in some services. It's worth noting each target invoked (e.g., a Lambda function) still has its own separate billing from its own service, which is unrelated to EventBridge's per-event pricing.</p>",
            },
            {
              question: "If a rule forwards events from your account's bus to a central bus in another account, who pays, and for what?",
              solution: "<p>The <strong>original publish</strong> into your own bus is billed as usual under your account. The <strong>forwarded delivery</strong> to the destination bus in the other account counts as a new event arriving there, which is billed on the <strong>receiving</strong> side. This is worth knowing when designing a central-bus, multi-account architecture, since forwarding effectively double-counts an event across the two accounts' bills rather than being free just because the data originated elsewhere.</p>",
            },
            {
              question: "Where does the money actually go in a typical EventBridge-based architecture, and what is the highest-leverage cost optimisation?",
              solution: "<p>In most real systems <strong>EventBridge itself is not the expensive part — what it triggers is</strong>. Publishing custom events costs on the order of a dollar per million, so even a busy system publishing hundreds of millions of events a month spends a few hundred dollars on the bus, while the Lambda invocations, database writes and third-party API calls those events trigger cost far more, especially once fan-out multiplies one event into several target invocations. The highest-leverage optimisation follows directly: <strong>filter in the rule pattern rather than inside the consumer</strong>. An event excluded by a pattern costs nothing at all, whereas a Lambda that starts, inspects the payload and decides to do nothing has already cost a full invocation plus its cold start. Tightening patterns removes downstream invocations, which is where the money is.</p>",
            },
            {
              question: "Which EventBridge features carry costs beyond the per-event publishing charge, and which one is most likely to be forgotten?",
              solution: "<p>Beyond publishing, you pay for <strong>archive storage</strong> per GB per month, <strong>replay</strong> per event replayed, <strong>schema discovery</strong> per event while it is enabled, <strong>Scheduler invocations</strong> per invocation, and <strong>cross-account or cross-Region forwarding</strong>, which bills the forwarded event again on the receiving side. The one most often forgotten is <strong>archive retention</strong>: setting an archive to retain indefinitely on a high-volume bus creates a cost that grows every single month and that nobody revisits, because archives are configured once during a resilience push and then never looked at again. Schema discovery is a close second, since it is frequently switched on to learn a bus's event shapes and then left running long after that purpose is served.</p>",
            },
          ],
          links: [
            "https://aws.amazon.com/eventbridge/pricing/",
            "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html",
          ],
        },
      ],
    },
    {
      id: 2,
      label: "Advance",
      concepts: [
        {
          topic: "Scheduler, Archive & Replay",
          tags: ["aws", "eventbridge", "scheduler", "cron", "archive", "replay"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Beyond routing live events, EventBridge handles two operational needs that every system has: <strong>running things on a schedule</strong> and <strong>recovering from mistakes</strong>. Scheduler replaces cron jobs and reminder tables; archive and replay let you rerun history through the bus.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">EventBridge Scheduler</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>A dedicated service (separate from bus rules) that invokes a target on a <strong>rate</strong> (<code>rate(5 minutes)</code>), <strong>cron</strong> (<code>cron(0 9 ? * MON-FRI *)</code>) or <strong>one-time</strong> (<code>at(2026-12-31T23:59:00)</code>) schedule.</li>
  <li><strong>Time zones</strong> with daylight-saving handling, a <strong>flexible time window</strong> to spread invocations, start and end dates, and <strong>millions of schedules</strong> per account.</li>
  <li><strong>Universal targets</strong>: call over 6,000 API actions across 270+ services directly (for example <code>StartInstances</code>, <code>PutItem</code>, <code>StartExecution</code>) without a Lambda in between, using a role you supply.</li>
  <li>Built-in retry policy, DLQ, and <strong>automatic deletion</strong> after a one-time schedule fires, which makes it ideal for per-entity reminders (send a payment reminder for order X in three days).</li>
  <li>Schedule <strong>groups</strong> organise and tag schedules per application.</li>
  <li>The older <strong>scheduled rules</strong> on the default bus still work but only support UTC and lack most of these features; use Scheduler for new work.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Archive</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>An archive stores events from a bus that match an optional pattern for a <strong>retention period</strong> (days or indefinite).</li>
  <li>Storage is billed per GB; it is a cheap insurance policy for domain buses.</li>
  <li>Archives are not queryable directly; for analytics stream events to Firehose and S3 as a separate target.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Replay</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>A replay re-publishes archived events from a <strong>start and end time</strong> to the bus, optionally only to <strong>specific rules</strong> so other consumers do not receive duplicates.</li>
  <li>Replayed events carry a <code>replay-name</code> field; consumers can detect and, if necessary, treat them differently.</li>
  <li>Events are replayed at high throughput in roughly original order but ordering is not guaranteed; consumers must be idempotent, as always.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Replay use cases</h4>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Bug recovery:</strong> A consumer mishandled events for six hours; fix it, then replay that window to its rule only.</li>
  <li><strong>Backfill:</strong> A new analytics consumer needs the last 30 days of <code>OrderPlaced</code> events.</li>
  <li><strong>Testing:</strong> Replay production events into a staging bus to reproduce an incident or load-test a new workflow.</li>
</ol>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Scheduler vs. scheduled rules, side by side</h4>
<div style="overflow-x: auto; margin-top: 0.75rem;">
<table style="width: 100%; border-collapse: collapse; font-size: 0.92rem;">
  <thead>
    <tr style="background: #f1f5f9; text-align: left;">
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;">Aspect</th>
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;">Scheduled rule (default bus)</th>
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;">EventBridge Scheduler</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Time zones</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">UTC only, DST handled by you</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Full time-zone support with DST</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">One-time schedules</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">No</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Yes, with self-deletion after firing</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Scale</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Bounded by rules-per-bus (~300)</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Millions of schedules per account</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Targets</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Standard rule targets</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Universal targets: thousands of AWS API actions</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Load spreading</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">No — everything fires at the same instant</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Flexible time window spreads invocations</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Organisation</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Tags on rules</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Schedule groups</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Cost</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Free on the default bus</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Billed per invocation above a free tier</td></tr>
  </tbody>
</table>
</div>
<p style="line-height: 1.75; margin-top: 0.75rem;">That last row is the only genuine argument left for scheduled rules: a handful of low-frequency UTC cron jobs are free, while Scheduler bills per invocation. For anything with time-zone requirements, one-time semantics or scale, Scheduler wins so decisively that the cost difference is noise.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Designing for millions of schedules</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Per-entity schedules replace the polling table.</strong> The traditional design is a <code>reminders</code> table swept every minute by a cron job — which scans rows that are almost never due, scales badly, and has timing accuracy bounded by the sweep interval. Creating one <code>at()</code> schedule per entity inverts this: nothing runs until the exact moment it is needed.</li>
  <li><strong>The thundering herd is the trap.</strong> If 200,000 orders were all placed at roughly the same time, 200,000 reminders fire at roughly the same instant three days later and flatten your downstream. A <strong>flexible time window</strong> tells Scheduler to spread invocations randomly across a window (say 15 minutes), turning a spike into a plateau, for free. Use it on anything that does not need exact-second accuracy.</li>
  <li><strong>Self-cleaning is mandatory at scale.</strong> Setting the schedule to delete itself after completion keeps you from accumulating millions of dead schedules that count against quotas and clutter every listing.</li>
  <li><strong>Schedule groups bound the blast radius.</strong> Grouping by application means you can tag for cost allocation, list per team, and delete a whole feature's schedules in one call rather than paginating through a shared namespace.</li>
  <li><strong>Check the cost model at volume.</strong> Per-invocation billing is excellent for millions of <em>occasional</em> per-entity schedules, but if you find yourself creating a schedule per entity per <em>minute</em>, a batched sweep job may genuinely be cheaper. Do the arithmetic rather than assuming either way.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Archive design decisions</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Scope the archive with a pattern.</strong> Archiving an entire high-volume bus indefinitely is a cost that compounds forever. Archiving only the event types you would realistically replay — domain facts, not chatty internal signals — is usually a fraction of the volume.</li>
  <li><strong>Set retention against the scenario you actually plan for.</strong> Ask how far back you would genuinely replay. For consumer-bug recovery that is days; for backfilling a new consumer it might be weeks; almost nobody replays events from two years ago. Indefinite retention is a decision, not a default.</li>
  <li><strong>Encrypted buses need matching key grants.</strong> If the bus uses a customer managed KMS key, the archive and replay path needs decrypt permission in the key policy. Miss this and archiving appears to work while replay fails — discovered mid-incident, which is the worst possible time.</li>
  <li><strong>An archive is not a data lake.</strong> Archives are not queryable: you cannot ask "how many orders over 1000 last month." Conflating the two is a common design error. For analytics, add a <strong>Firehose target streaming to S3</strong> alongside your real targets, and keep the archive purely for replay.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Replay: the operational runbook</h4>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Know the destination constraint.</strong> You replay back onto the bus the archive was taken from — optionally narrowed with a filter listing specific <strong>rule ARNs</strong>. That filter is the single most important safety control: without it, every consumer on the bus is re-triggered, not just the broken one.</li>
  <li><strong>Size the window deliberately.</strong> Replays run at high throughput, far faster than organic traffic. A six-hour window replayed in minutes can overwhelm consumers sized for normal load, causing throttling, DLQ fills and a second incident on top of the first. Replay a narrow slice first, watch the consumer, then widen.</li>
  <li><strong>Verify idempotency before starting.</strong> Every consumer that will receive the replay must be idempotent, and any side effect that reaches a customer — emails, payments, webhooks — needs a business-state check, not just a dedupe key, so a replay does not email ten thousand people twice.</li>
  <li><strong>Use the replay marker.</strong> Replayed events carry a <code>replay-name</code> field, so consumers can detect them and, where appropriate, suppress customer-facing side effects while still rebuilding internal state.</li>
  <li><strong>Monitor the replay itself.</strong> Poll the replay's state and progress timestamp; a replay that stalls or fails partway leaves you with an unknown fraction of the window reprocessed, which is worse than not having started.</li>
</ol>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "EventBridge Scheduler is my cron and reminder engine: time-zone aware rate, cron and one-time schedules that can call almost any AWS API directly, with retries and a DLQ. I archive every event on my domain buses so that when a consumer has a bug I can fix it and replay just the affected window to just that rule, or backfill a new consumer with history. Because replays redeliver, idempotent consumers are non-negotiable."</div>
</div>`,
          examples: [
            `# Scheduler: run a report Lambda every weekday at 09:00 IST with retries and a DLQ
aws scheduler create-schedule --name daily-report --group-name reporting \\
  --schedule-expression "cron(0 9 ? * MON-FRI *)" --schedule-expression-timezone "Asia/Kolkata" \\
  --flexible-time-window Mode=FLEXIBLE,MaximumWindowInMinutes=15 \\
  --target '{
    "Arn": "arn:aws:lambda:us-east-1:123456789012:function:daily-report",
    "RoleArn": "arn:aws:iam::123456789012:role/scheduler-invoke",
    "RetryPolicy": { "MaximumRetryAttempts": 3, "MaximumEventAgeInSeconds": 1800 },
    "DeadLetterConfig": { "Arn": "arn:aws:sqs:us-east-1:123456789012:scheduler-dlq" }
  }'

# One-time schedule that calls SQS directly (universal target) and deletes itself afterwards
aws scheduler create-schedule --name remind-order-o-123 --group-name reminders \\
  --schedule-expression "at(2026-09-15T10:00:00)" --schedule-expression-timezone "Asia/Kolkata" \\
  --flexible-time-window Mode=OFF --action-after-completion DELETE \\
  --target '{
    "Arn": "arn:aws:scheduler:::aws-sdk:sqs:sendMessage",
    "RoleArn": "arn:aws:iam::123456789012:role/scheduler-sqs",
    "Input": "{\\"QueueUrl\\":\\"https://sqs.us-east-1.amazonaws.com/123456789012/reminders\\",\\"MessageBody\\":\\"{\\\\\\"orderId\\\\\\":\\\\\\"o-123\\\\\\"}\\"}"
  }'

# Archive all events on the orders bus for 90 days
aws events create-archive --archive-name orders-archive \\
  --event-source-arn arn:aws:events:us-east-1:123456789012:event-bus/orders-bus --retention-days 90

# Replay a six-hour window to one rule only, after fixing the consumer
aws events start-replay --replay-name fix-fulfilment-2026-09-12 \\
  --event-source-arn arn:aws:events:us-east-1:123456789012:archive/orders-archive \\
  --event-start-time 2026-09-12T08:00:00Z --event-end-time 2026-09-12T14:00:00Z \\
  --destination '{"Arn":"arn:aws:events:us-east-1:123456789012:event-bus/orders-bus","FilterArns":["arn:aws:events:us-east-1:123456789012:rule/orders-bus/fulfilment"]}'
aws events describe-replay --replay-name fix-fulfilment-2026-09-12 --query '{state:State,progress:EventLastReplayedTime}'`,
            `# Thundering herd control: 200k reminders due at the same instant, spread over 15 minutes.
# Without FLEXIBLE, every one of them fires simultaneously and flattens the consumer.
aws scheduler create-schedule --name remind-order-o-123 --group-name reminders \\
  --schedule-expression "at(2026-09-21T10:00:00)" --schedule-expression-timezone "Asia/Kolkata" \\
  --flexible-time-window Mode=FLEXIBLE,MaximumWindowInMinutes=15 \\
  --action-after-completion DELETE \\
  --target '{
    "Arn": "arn:aws:sqs:us-east-1:123456789012:reminders",
    "RoleArn": "arn:aws:iam::123456789012:role/scheduler-sqs",
    "Input": "{\\"orderId\\":\\"o-123\\"}"
  }'

# Schedule groups bound the blast radius: delete an entire feature's schedules in one call
aws scheduler list-schedules --group-name reminders --query 'Schedules[].Name' --output text
aws scheduler delete-schedule-group --name reminders`,
            `# Archive only what you would realistically replay, not the whole bus forever.
aws events create-archive --archive-name orders-domain-archive \\
  --event-source-arn arn:aws:events:us-east-1:123456789012:event-bus/orders-bus \\
  --retention-days 30 \\
  --event-pattern '{"detail-type":["OrderPlaced","OrderCancelled","PaymentCaptured"]}'

# An archive is NOT queryable. For analytics, stream to S3 alongside the real targets.
aws events put-targets --rule order-analytics --event-bus-name orders-bus --targets '[{
  "Id": "to-s3",
  "Arn": "arn:aws:firehose:us-east-1:123456789012:deliverystream/orders-to-s3",
  "RoleArn": "arn:aws:iam::123456789012:role/eventbridge-firehose"
}]'

# Replay safely: narrow window first, scoped to ONE rule, then widen once verified.
aws events start-replay --replay-name canary-30min \\
  --event-source-arn arn:aws:events:us-east-1:123456789012:archive/orders-domain-archive \\
  --event-start-time 2026-09-17T08:00:00Z --event-end-time 2026-09-17T08:30:00Z \\
  --destination '{
    "Arn": "arn:aws:events:us-east-1:123456789012:event-bus/orders-bus",
    "FilterArns": ["arn:aws:events:us-east-1:123456789012:rule/orders-bus/fulfilment"]
  }'`,
          ],
          questions: [
            {
              question: "When would you use EventBridge Scheduler instead of a cron-based rule?",
              solution: "<p>The older scheduled rules live on the default bus and support only UTC cron/rate expressions. <strong>EventBridge Scheduler</strong> is a dedicated service supporting <strong>time zones</strong>, <strong>one-time schedules</strong> (useful for reminders or delayed actions), flexible time windows to spread load, millions of schedules, and direct universal targets for thousands of AWS API actions without a Lambda in between. Use Scheduler for all new scheduling work.</p>",
            },
            {
              question: "How do archive and replay help in an event-driven system?",
              solution: "<p>An <strong>archive</strong> stores every event matching a pattern on a bus for a retention period. <strong>Replay</strong> re-publishes archived events from a time range to the bus (or a specific rule). This lets you recover from a consumer bug by fixing the code and replaying the affected window, backfill a brand-new consumer with historical events, or reproduce a production incident in a test bus. Consumers must be idempotent, and replayed events carry a <code>replay-name</code> field so they can be distinguished.</p>",
            },
            {
              question: "How would you implement 'send a reminder three days after an order if it is still unpaid' without a polling job?",
              solution: "<p>When the order is created, call <code>CreateSchedule</code> in <strong>EventBridge Scheduler</strong> with a one-time <code>at()</code> expression three days out, a target such as an SQS queue or Lambda carrying the order ID, and <code>ActionAfterCompletion: DELETE</code> so the schedule cleans itself up. When the order is paid, delete the schedule (or have the consumer check payment status and exit). This scales to millions of orders with no cron scanning a table and exact per-entity timing.</p>",
            },
            {
              question: "What precautions do you take before replaying events into a production bus?",
              solution: "<p>Confirm every consumer on the bus is <strong>idempotent</strong>, or restrict the replay's <strong>destination filter to the specific rules</strong> that need the events so unrelated consumers are not re-triggered. Check that downstream side effects (emails, payments) are guarded by idempotency keys or business-state checks. Replay in a smaller window first to validate, monitor DLQs and throttling since replays are fast, and ensure consumers can recognise the <code>replay-name</code> field if they need to treat replayed events differently.</p>",
            },
            {
              question: "You create one Scheduler schedule per order to send a reminder three days later. Orders arrive in bursts, so hundreds of thousands of reminders come due at almost the same instant. What breaks, and what is the fix?",
              solution: "<p>The reminders fire as a <strong>thundering herd</strong>: hundreds of thousands of near-simultaneous invocations hit the target, blowing through Lambda concurrency, exhausting database connections or tripping a third-party API's rate limit — and the retries that follow make the spike worse. The fix is built into Scheduler: set a <strong>flexible time window</strong> so invocations are spread randomly across a window such as 15 minutes instead of all landing on the same second. It costs nothing, requires no extra infrastructure, and turns a spike into a plateau. It is the right default for anything that does not need exact-second accuracy, which is almost every reminder-style workload. Pair it with a queue in front of the consumer so whatever spike remains is absorbed rather than throttled.</p>",
            },
            {
              question: "A team wants to use an EventBridge archive as the source of truth for analytics queries over historical events. Why is that the wrong tool, and what should they use instead?",
              solution: "<p>Archives are <strong>not queryable</strong>. They exist for one purpose — replaying events back onto the bus they came from — and offer no way to ask analytical questions like how many orders exceeded a threshold last month. You cannot filter, aggregate or join; you can only replay a time range. The right design is to treat them as separate concerns: keep the archive scoped and short-retention purely for operational recovery, and add a <strong>Firehose target streaming events into S3</strong> alongside the real targets, where Athena or a warehouse can query them properly with partitioning and columnar formats. Conflating the two typically shows up as a team paying for indefinite archive retention while still being unable to answer a single analytical question.</p>",
            },
            {
              question: "During an incident you replay six hours of archived events to fix a broken consumer, and immediately trigger a second incident. What most likely went wrong?",
              solution: "<p>Two likely causes, often together. First, the replay was <strong>not scoped with a rule filter</strong>, so instead of re-delivering only to the consumer that was broken, every rule on the bus matched again — meaning healthy consumers reprocessed six hours of events, re-sending emails, re-charging cards or duplicating downstream records. Second, replays run at <strong>far higher throughput than organic traffic</strong>: six hours of events compressed into minutes overwhelms consumers sized for normal load, causing throttling and DLQ fills. The disciplined approach is to replay a narrow canary window scoped to the single affected rule, confirm the consumer handles it and that idempotency is actually working, then widen the window while watching throttles and DLQ depth.</p>",
            },
            {
              question: "When is a scheduled rule on the default bus still the right choice over EventBridge Scheduler?",
              solution: "<p>Only in a narrow case: a <strong>small number of low-frequency, UTC-based recurring jobs</strong> where the free pricing of default-bus scheduled rules matters and none of Scheduler's advantages apply. Scheduler bills per invocation above a free tier, while scheduled rules on the default bus are free, so a handful of nightly maintenance crons genuinely costs nothing as rules. The moment you need a real time zone with daylight-saving handling, a one-time schedule, load spreading via a flexible time window, more schedules than the rules-per-bus quota allows, or a direct call to an arbitrary AWS API without a Lambda in between, Scheduler wins decisively and the cost difference becomes irrelevant next to the engineering effort of working around those gaps.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/scheduler/latest/UserGuide/what-is-scheduler.html",
            "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-archive.html",
            "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-replay-archived-event.html",
          ],
        },
        {
          topic: "Cross-Account Buses, Pipes & Schema Registry",
          tags: ["aws", "eventbridge", "cross-account", "pipes", "schema registry", "api destinations"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Large organisations run many accounts and many teams. EventBridge scales to that with <strong>cross-account buses</strong>, gives you glue-free integrations with <strong>Pipes</strong> and <strong>API destinations</strong>, and keeps producers and consumers honest with the <strong>schema registry</strong>.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Cross-account and cross-region events</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>A rule's target can be an <strong>event bus in another account or region</strong>. The source account needs a role with <code>events:PutEvents</code> on that bus; the destination bus needs a <strong>resource policy</strong> allowing the source account, or the whole organisation via <code>aws:PrincipalOrgID</code>.</li>
  <li><strong>Central bus pattern:</strong> Every account forwards domain events to a shared bus in a platform account; teams write rules there to forward relevant events back into their own accounts. Governance in one place, autonomy everywhere.</li>
  <li><strong>Global endpoints</strong> give a single DNS endpoint that fails over publishing between two regions based on a Route 53 health check, for multi-region resilience of the producer path.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">EventBridge Pipes</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Point-to-point</strong> integrations: one source, optional filter, optional enrichment, one target, with no rule or bus in between.</li>
  <li>Sources: <strong>SQS, Kinesis, DynamoDB Streams, Kafka (MSK or self-managed), Amazon MQ</strong>. Targets: anything a rule can target plus more.</li>
  <li><strong>Filtering</strong> uses event pattern syntax to drop records before they cost anything downstream; <strong>enrichment</strong> calls Lambda, Step Functions or an API to add data before delivery.</li>
  <li>Replaces a whole class of small glue Lambdas ("read SQS, call an API, start a workflow").</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">API destinations</h4>
<p style="line-height: 1.75;">Call an <strong>external HTTPS endpoint</strong> as a target (Slack webhooks, Zendesk, your partner's API). A <strong>connection</strong> stores the auth (API key, basic, OAuth client credentials) in Secrets Manager and EventBridge handles token refresh, and you set an <strong>invocation rate limit</strong> so you never exceed the partner's quota. Combine with input transformers to produce the exact request body.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Schema registry</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>All AWS service events have published <strong>OpenAPI and JSONSchema</strong> definitions you can browse.</li>
  <li><strong>Schema discovery</strong> on a custom bus samples events and infers schemas, versioning them as they change.</li>
  <li>Generate <strong>code bindings</strong> (Java, Python, TypeScript, Go) so producers and consumers share typed event classes and catch breaking changes at compile time.</li>
  <li>Treat schemas as contracts: additive changes are safe, removals or type changes need a new <code>detail-type</code> or version.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Choosing a multi-account topology</h4>
<div style="overflow-x: auto; margin-top: 0.75rem;">
<table style="width: 100%; border-collapse: collapse; font-size: 0.92rem;">
  <thead>
    <tr style="background: #f1f5f9; text-align: left;">
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;">Topology</th>
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;">Strengths</th>
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;">Costs</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;"><strong>Hub and spoke</strong> — every account forwards to one central bus</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">One place to audit, govern and archive; new consumers discover events centrally; a single org-wide resource policy</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">The hub is a shared dependency and a blast radius; every forwarded event is billed twice; the platform team becomes a bottleneck</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;"><strong>Direct peer to peer</strong> — rules target other accounts' buses directly</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Fewest hops and lowest cost; no central component to fail; teams move independently</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Policy sprawl that grows quadratically; no central audit or discovery; nobody knows the full event graph</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;"><strong>Per-domain buses in a shared account</strong></td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Governance without a single choke point; blast radius bounded per domain; clear ownership</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">More buses to operate; cross-domain flows still need forwarding rules</td></tr>
  </tbody>
</table>
</div>
<p style="line-height: 1.75; margin-top: 0.75rem;">Most organisations land on hub and spoke because auditability wins, and accept the double billing as the price of governance. The mistake to avoid is starting peer to peer "because it is simpler" and discovering at thirty accounts that no one can answer which services consume a given event.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Pipes in depth</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Strictly one source to one target.</strong> There is no fan-out — that is the defining difference from a bus. If two consumers need the same stream, you need two pipes or a bus.</li>
  <li><strong>The stages run in a fixed order:</strong> source poll, then <strong>filter</strong>, then <strong>enrichment</strong>, then target. Filtering before enrichment matters economically: a filter that drops 90% of records means the enrichment Lambda is invoked for only 10% of them, so filter criteria are a direct cost lever, not just a convenience.</li>
  <li><strong>Batching and partial failure.</strong> Pipes reads stream and queue sources in batches. For stream sources you can report <strong>partial batch failures</strong> so only the failed records are retried rather than the whole batch — without this, one poison record forces reprocessing of every record alongside it, which duplicates work and can stall a shard indefinitely.</li>
  <li><strong>Ordering follows the source.</strong> Kinesis and DynamoDB Streams preserve order <em>per shard</em>, and Pipes respects that by processing a shard's records in sequence — so a stuck record blocks its shard. SQS FIFO preserves order per message group. A bus, by contrast, offers no ordering at all, which is a genuine reason to choose Pipes over a rule for stream-shaped work.</li>
  <li><strong>Pipes vs. Lambda event source mapping.</strong> Both read SQS, Kinesis, DynamoDB Streams and Kafka. Choose the <strong>event source mapping</strong> when the consumer is a Lambda doing real work. Choose <strong>Pipes</strong> when the target is <em>not</em> a Lambda — Step Functions, an API destination, another bus — so you avoid writing a function whose only job is to read, reshape and forward.</li>
  <li><strong>Pipes has its own retry and DLQ configuration</strong> on the source side, separate from any rule's target retry policy. Configuring one does not configure the other.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">API destinations in depth</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>The rate limit is per API destination, not per rule.</strong> If three rules target the same destination, they share one invocation-rate budget — which is exactly what you want when protecting a partner's quota, but it means one chatty rule can starve the others.</li>
  <li><strong>Partner errors flow into normal retry machinery.</strong> A 429 or 5xx from the endpoint is retried according to the target's retry policy with exponential backoff, and lands in the DLQ once attempts or the maximum event age are exhausted. A 4xx that is not retryable goes to the DLQ sooner.</li>
  <li><strong>At-least-once reaches the partner too.</strong> Because delivery may be duplicated, the partner's API can receive the same call twice. Use an <strong>input transformer to send an idempotency key header</strong> derived from the event id or a business key, so the partner can dedupe. This is easy to forget precisely because the duplicate is invisible on your side.</li>
  <li><strong>Connections hold the credentials</strong> in Secrets Manager and handle OAuth token refresh. Rotating a partner credential is an update to the connection — no rule or target changes, no redeploy — which also means <strong>whoever can edit a connection controls where authenticated traffic goes</strong>, so connection write access deserves the same scrutiny as a production secret.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Schema evolution that does not break consumers</h4>
<p style="line-height: 1.75;">Registering schemas is the easy part; the discipline is in how you change them. The rule of thumb: <strong>additive is safe, everything else is a new version</strong>. Adding an optional field is invisible to consumers that ignore unknown fields. Removing a field, renaming it, narrowing a type or changing the meaning of an existing value will break somebody, usually silently, because their event pattern simply stops matching rather than throwing.</p>
<p style="line-height: 1.75;">There are two versioning strategies, and the choice has real consequences:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>A <code>schemaVersion</code> field inside <code>detail</code>.</strong> One <code>detail-type</code> carries all versions and each consumer branches on the version internally. Fewer moving parts, but every consumer must handle every version, and a consumer that forgets receives a payload it does not understand.</li>
  <li><strong>A versioned <code>detail-type</code></strong> such as <code>OrderPlaced.v2</code>. Consumers select the version they understand <em>in the rule pattern</em>, so an old consumer simply never sees v2 events — the safest option, because the failure mode is "does not receive" rather than "receives and misinterprets". The cost is publishing both versions during migration and maintaining two sets of rules.</li>
</ul>
<p style="line-height: 1.75;">Either way, the retirement procedure is the same and is worth stating in an interview: publish both versions in parallel, then use <strong>per-rule <code>MatchedEvents</code> on the old version's rules</strong> to see who is still consuming it. When those metrics hit zero and stay there, the old version is genuinely safe to retire — which is measurably better than sending an email asking teams to confirm they have migrated.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Limits worth knowing</h4>
<p style="line-height: 1.75;">Default soft limits: about 10,000 <code>PutEvents</code> per second per region (varies), 300 rules per bus, five targets per rule, 256 KB event size, and 24-hour maximum retry. Cross-account forwarding counts as a new event for billing.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "For many accounts I run a central bus in a platform account with a resource policy for the organisation; each account forwards its domain events there and pulls back what it needs with its own rules. Pipes give me filtered, enriched point-to-point links from SQS or Kinesis to targets without glue Lambdas, API destinations call partner APIs with managed auth and rate limits, and the schema registry with generated bindings keeps event contracts explicit across teams."</div>
</div>`,
          examples: [
            `# Destination (platform) account: let the whole organisation publish to the central bus
aws events put-permission --event-bus-name central-bus --action events:PutEvents \\
  --principal '*' --statement-id org-publish \\
  --condition '{"Type":"StringEquals","Key":"aws:PrincipalOrgID","Value":"o-abc123def4"}'

# Source account: forward all domain events to the central bus (role needs events:PutEvents on that ARN)
aws events put-rule --name forward-to-central --event-bus-name orders-bus \\
  --event-pattern '{"source":[{"prefix":"com.myapp."}]}'
aws events put-targets --rule forward-to-central --event-bus-name orders-bus --targets '[{
  "Id": "central", "Arn": "arn:aws:events:us-east-1:999999999999:event-bus/central-bus",
  "RoleArn": "arn:aws:iam::123456789012:role/eventbridge-forward"
}]'`,
            `# Pipe: SQS -> filter -> enrich with Lambda -> Step Functions, no glue code
aws pipes create-pipe --name orders-to-workflow \\
  --source arn:aws:sqs:us-east-1:123456789012:orders \\
  --source-parameters '{"FilterCriteria":{"Filters":[{"Pattern":"{\\"body\\":{\\"type\\":[\\"OrderPaid\\"]}}"}]},"SqsQueueParameters":{"BatchSize":1}}' \\
  --enrichment arn:aws:lambda:us-east-1:123456789012:function:lookup-customer \\
  --target arn:aws:states:us-east-1:123456789012:stateMachine:fulfilment \\
  --target-parameters '{"StepFunctionStateMachineParameters":{"InvocationType":"FIRE_AND_FORGET"}}' \\
  --role-arn arn:aws:iam::123456789012:role/pipes-orders

# API destination: post high-value orders to a partner API with OAuth and a rate limit
aws events create-connection --name partner-crm --authorization-type OAUTH_CLIENT_CREDENTIALS \\
  --auth-parameters '{"OAuthParameters":{"AuthorizationEndpoint":"https://auth.partner.com/oauth/token","HttpMethod":"POST","ClientParameters":{"ClientID":"abc","ClientSecret":"secret"}}}'
aws events create-api-destination --name partner-crm-orders --connection-arn <connection-arn> \\
  --invocation-endpoint https://api.partner.com/v1/orders --http-method POST --invocation-rate-limit-per-second 10

# Schema discovery on the orders bus, then generate TypeScript bindings
aws schemas create-discoverer --source-arn arn:aws:events:us-east-1:123456789012:event-bus/orders-bus
aws schemas get-code-binding-source --registry-name discovered-schemas \\
  --schema-name com.myapp.orders@OrderPlaced --language TypeScript3 out.zip`,
            `# API destination: send an idempotency key so the partner can dedupe our retries.
# At-least-once delivery means this endpoint WILL occasionally be called twice.
aws events put-targets --rule high-value-orders --event-bus-name orders-bus --targets '[{
  "Id": "partner-crm",
  "Arn": "arn:aws:events:us-east-1:123456789012:api-destination/partner-crm-orders/abc123",
  "RoleArn": "arn:aws:iam::123456789012:role/eventbridge-api-dest",
  "HttpParameters": {
    "HeaderParameters": { "Content-Type": "application/json" }
  },
  "InputTransformer": {
    "InputPathsMap": { "eventId": "$.id", "orderId": "$.detail.orderId", "total": "$.detail.total" },
    "InputTemplate": "{\\"idempotencyKey\\": \\"<eventId>\\", \\"orderId\\": \\"<orderId>\\", \\"amount\\": <total>}"
  },
  "RetryPolicy": { "MaximumRetryAttempts": 4, "MaximumEventAgeInSeconds": 900 },
  "DeadLetterConfig": { "Arn": "arn:aws:sqs:us-east-1:123456789012:partner-dlq" }
}]'`,
            `# Versioned detail-type migration: publish v1 and v2 in parallel, then prove v1 is dead.
# Old consumers keep their rule on v1 and never see v2 — they cannot misinterpret it.
aws events put-rule --name fulfilment-v1 --event-bus-name orders-bus \\
  --event-pattern '{"source":["com.myapp.orders"],"detail-type":["OrderPlaced"]}'
aws events put-rule --name fulfilment-v2 --event-bus-name orders-bus \\
  --event-pattern '{"source":["com.myapp.orders"],"detail-type":["OrderPlaced.v2"]}'

# Retirement is a measurement, not an email: is anything still matching v1?
aws cloudwatch get-metric-statistics --namespace AWS/Events --metric-name MatchedEvents \\
  --dimensions Name=RuleName,Value=fulfilment-v1 \\
  --start-time 2026-09-11T00:00:00Z --end-time 2026-09-18T00:00:00Z \\
  --period 86400 --statistics Sum
# Sustained zero across the full window => safe to stop publishing v1 and delete the rule.`,
          ],
          questions: [
            {
              question: "How would you share events between AWS accounts with EventBridge?",
              solution: "<p>Create a rule in the source account whose target is the <strong>event bus ARN in the destination account</strong>, and add a <strong>resource policy</strong> on the destination bus allowing <code>events:PutEvents</code> from the source account or the whole organisation (<code>aws:PrincipalOrgID</code>). The destination account then writes its own rules. This central-bus pattern lets each team own its consumers while a platform team governs the bus, and it works across regions as well.</p>",
            },
            {
              question: "What are EventBridge Pipes and when do you use them instead of rules?",
              solution: "<p>Pipes are <strong>point-to-point integrations</strong> from one source (SQS, Kinesis, DynamoDB Streams, Kafka, MQ) to one target, with optional <strong>filtering</strong> and <strong>enrichment</strong> steps in between and no bus or rule involved. Use a Pipe when you have a single consumer of a stream or queue and would otherwise write a small Lambda just to read, transform and forward, for example SQS to Step Functions or Kinesis to an API. Use buses and rules when many consumers need the same events with pub/sub semantics.</p>",
            },
            {
              question: "How do API destinations differ from calling an external API from a Lambda target?",
              solution: "<p>An <strong>API destination</strong> lets EventBridge call an external HTTPS endpoint directly: a <strong>connection</strong> stores credentials (API key, basic auth or OAuth client credentials) in Secrets Manager and refreshes OAuth tokens automatically, an <strong>invocation rate limit</strong> throttles calls to the partner's quota with retries and a DLQ, and an input transformer shapes the body. You avoid writing, deploying and monitoring a Lambda whose only job is an HTTP call. Use Lambda when the call needs complex logic, signatures, or multi-step flows.</p>",
            },
            {
              question: "How do you prevent breaking changes to events from breaking consumers?",
              solution: "<p>Treat the event as a <strong>contract</strong>: register or discover its schema in the <strong>schema registry</strong>, generate <strong>typed code bindings</strong> for producers and consumers, and include a <code>schemaVersion</code> in <code>detail</code>. Make only <strong>additive changes</strong> to existing versions; for removals or type changes publish a new version or new <code>detail-type</code> and run both until consumers migrate. Consumers should ignore unknown fields and validate the fields they use, and contract tests in CI can validate sample events against the registered schema.</p>",
            },
            {
              question: "Compare hub-and-spoke against direct peer-to-peer event sharing across many AWS accounts. Which would you default to?",
              solution: "<p><strong>Hub and spoke</strong> — every account forwards its domain events to one central bus in a platform account, and teams write rules there to route what they need back into their own accounts. The decisive advantage is <strong>auditability and discovery</strong>: there is one place to see the full event graph, one resource policy governing who may publish, and one archive. <strong>Peer to peer</strong>, where each account's rules target other accounts' buses directly, has fewer hops and avoids double billing, and it genuinely is simpler at three accounts — but the policy surface grows roughly quadratically with account count, and nobody can answer which services consume a given event. The usual failure story is a team choosing peer to peer for simplicity and discovering at thirty accounts that the event graph is unknowable. The price of the hub is real: it is a shared dependency, and every forwarded event is billed again on the receiving side.</p>",
            },
            {
              question: "In an EventBridge Pipe, why does the order of filtering and enrichment matter, and what is the ordering guarantee for a Kinesis source?",
              solution: "<p>The stages run source, then <strong>filter</strong>, then <strong>enrichment</strong>, then target — and filtering first is a direct cost lever, not just tidiness. If the filter drops 90% of records, the enrichment step (typically a Lambda or an API call, billed per invocation and adding latency) runs for only the surviving 10%. Filtering after enrichment would pay to enrich records you then discard. On <strong>ordering</strong>: Pipes inherits the source's guarantee rather than inventing one, so for Kinesis and DynamoDB Streams, records are processed <strong>in order within a shard</strong> and shards progress independently. The consequence is that a record that keeps failing <em>blocks its own shard</em>, which is why partial batch failure reporting and a DLQ matter — without them one poison record can stall a shard indefinitely while other shards continue, producing a confusing partial outage.</p>",
            },
            {
              question: "You route events to a partner's API via an API destination. What are the two things most teams forget?",
              solution: "<p>First, <strong>idempotency at the partner</strong>. EventBridge delivers at least once, and retries on a 429 or 5xx mean the partner's endpoint will occasionally receive the same call twice — creating duplicate records on <em>their</em> side, where you cannot see it. The fix is an input transformer that injects an <strong>idempotency key</strong> derived from the event id or a business key so the partner can dedupe. Second, the <strong>invocation rate limit is per API destination, shared by every rule targeting it</strong>, not per rule. That is exactly right for respecting a partner quota, but it means one high-volume rule can consume the entire budget and starve a low-volume but critical one, which surfaces as unexplained latency and DLQ entries on the quiet rule. A third worth mentioning: connection write access is effectively control over where authenticated traffic is sent, so it should be restricted like a production secret.</p>",
            },
            {
              question: "You need to make a breaking change to an event's shape. Walk through how you roll it out and how you know when it is safe to retire the old version.",
              solution: "<p>Do not mutate the existing shape. Publish a <strong>new version alongside the old one</strong>, preferring a versioned <code>detail-type</code> such as <code>OrderPlaced.v2</code> over an internal <code>schemaVersion</code> field, because consumers then select their version <em>in the rule pattern</em> — an unmigrated consumer simply never receives v2, so the failure mode is not receiving rather than receiving and misinterpreting. Register both in the schema registry, generate bindings, and validate sample events in CI so the change cannot regress. Then migrate consumers one at a time, each switching its own rule from v1 to v2 on its own schedule, with no coordinated release. The retirement decision is a <strong>measurement, not an email</strong>: watch per-rule <code>MatchedEvents</code> on the v1 rules, and when they are sustained at zero across a window long enough to cover weekly or monthly batch consumers, stop publishing v1 and delete the rules. Asking teams to confirm they have migrated is unreliable; a metric at zero is evidence.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-cross-account.html",
            "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-pipes.html",
            "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-api-destinations.html",
          ],
        },
        {
          topic: "Choreography vs. Orchestration — Sagas & Event Design",
          tags: ["aws", "eventbridge", "choreography", "orchestration", "saga", "event design", "architecture"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Once more than a handful of services exchange events, the hard questions stop being "how do I configure a rule" and become <strong>how do I model a multi-step business process across services that each fail independently</strong>. EventBridge is the transport; the architectural decision is whether control flow lives <em>inside the events</em> (choreography) or <em>inside a central coordinator</em> (orchestration).
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Choreography — the flow is emergent</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Each service reacts to events and emits its own: <code>OrderPlaced</code> → payment service emits <code>PaymentCaptured</code> → inventory service emits <code>StockReserved</code> → shipping service emits <code>ShipmentCreated</code>.</li>
  <li><strong>Strengths:</strong> maximum decoupling, no single service owns the process, teams add consumers without coordinating, each step scales and fails independently.</li>
  <li><strong>Costs:</strong> the business process exists <em>nowhere</em> as code — you reconstruct it from rules and logs. Debugging "where did order o-123 stall" means tracing across N services. Cyclic dependencies and infinite event loops become possible.</li>
  <li>Best when steps are genuinely independent reactions (notifications, analytics, cache invalidation, audit) rather than a transaction that must complete or unwind.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Orchestration — the flow is explicit</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>A <strong>Step Functions</strong> state machine (typically started <em>by</em> an EventBridge rule) calls each service in order, holds the state, handles retries, branching, timeouts and compensation.</li>
  <li><strong>Strengths:</strong> the process is one readable artifact, execution history shows exactly where a run stopped, error handling and timeouts are declarative, and long-running waits are first-class.</li>
  <li><strong>Costs:</strong> the orchestrator knows about every participant, so it becomes a coupling point and a deployment bottleneck; per-state-transition cost at very high volume.</li>
  <li>Best for transactional workflows with ordering, compensation and SLA requirements — checkout, onboarding, refunds.</li>
</ul>
<p style="line-height: 1.75;">Mature systems use <strong>both</strong>: orchestrate the transactional core, choreograph the reactions around it. A single <code>OrderPlaced</code> event can start a Step Functions checkout saga <em>and</em> independently trigger analytics, email and fraud scoring via separate rules.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The saga pattern and compensating transactions</h4>
<p style="line-height: 1.75;">There are no distributed ACID transactions across services, so a multi-service business transaction is modelled as a <strong>saga</strong>: a sequence of local transactions where each step has a <strong>compensating action</strong> that semantically undoes it. Money is not "rolled back" — it is refunded; stock is not un-decremented — it is released.</p>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li>Forward path: reserve stock → capture payment → create shipment.</li>
  <li>If payment fails: emit/invoke the compensation for step 1 (release stock) and end in a failed-but-consistent state.</li>
  <li>Compensations must themselves be <strong>idempotent and retryable</strong>, because the compensation can also fail and be retried.</li>
  <li>Some steps are <strong>pivot points</strong> (after which you cannot compensate cleanly, like a physical dispatch) — design so irreversible steps come last.</li>
</ol>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Event design: commands, events, fat vs. thin</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Events are facts, commands are instructions.</strong> <code>OrderPlaced</code> (past tense, owned by the producer, any number of consumers) vs <code>ShipOrder</code> (imperative, implies a specific handler). Putting commands on a shared bus quietly re-couples producer to consumer — if only one service may handle it and the producer cares about the outcome, a queue or direct call is usually the honest choice.</li>
  <li><strong>Event-carried state transfer (fat events)</strong> embeds enough state that consumers do not call back to the producer — removing runtime coupling and read amplification, at the cost of larger payloads and stale copies.</li>
  <li><strong>Thin events</strong> carry only identifiers, so consumers re-read the source of truth — always fresh, but every consumer now depends on the producer's API being up, which reintroduces exactly the coupling events were meant to remove.</li>
  <li>Practical middle ground: include the stable identifiers plus the fields most consumers need plus a <code>schemaVersion</code>, and let rare consumers fetch details.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Anti-patterns interviewers listen for</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>The distributed monolith:</strong> services that cannot be deployed independently because event shapes are shared mutable contracts with no versioning.</li>
  <li><strong>Event chains as request/response:</strong> publishing an event and waiting for a correlated reply event to return a synchronous API call — high tail latency, awkward timeouts; use a direct call or Step Functions callback instead.</li>
  <li><strong>Event loops:</strong> service A reacts to B's event by emitting an event B reacts to. Guard with pattern filters on <code>source</code>, and never let a consumer publish to the bus it consumes without a discriminator.</li>
  <li><strong>Leaking internal schema:</strong> publishing a raw database row or CDC record as a domain event, so any internal refactor breaks every consumer.</li>
  <li><strong>Deep chains:</strong> five hops of choreography where each hop adds latency and a failure mode nobody owns end to end.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "I orchestrate the transactional core with Step Functions started from an EventBridge rule, and choreograph the independent reactions around it with additional rules. Multi-service transactions become sagas with idempotent compensating actions, with irreversible steps ordered last. I keep events as past-tense facts owned by the producer, carry enough state that consumers do not call back, version them explicitly, and watch for the classic failure modes: commands disguised as events, event chains used as request/response, and cycles where a consumer publishes back onto the bus it reads."</div>
</div>`,
          examples: [
            `# Choreography + orchestration together: one event starts a saga AND independent reactions
# 1) Transactional core: start a Step Functions checkout saga
aws events put-rule --name checkout-saga --event-bus-name orders-bus \\
  --event-pattern '{"source":["com.myapp.orders"],"detail-type":["OrderPlaced"]}'
aws events put-targets --rule checkout-saga --event-bus-name orders-bus --targets '[{
  "Id": "saga",
  "Arn": "arn:aws:states:us-east-1:123456789012:stateMachine:checkout",
  "RoleArn": "arn:aws:iam::123456789012:role/eventbridge-start-execution",
  "InputPath": "$.detail"
}]'

# 2) Independent reactions: separate rules, separate owners, no coupling to the saga
aws events put-rule --name order-analytics --event-bus-name orders-bus \\
  --event-pattern '{"source":["com.myapp.orders"],"detail-type":["OrderPlaced"]}'
aws events put-rule --name order-fraud-scoring --event-bus-name orders-bus \\
  --event-pattern '{"source":["com.myapp.orders"],"detail-type":["OrderPlaced"],"detail":{"total":[{"numeric":[">=",5000]}]}}'`,
            `// Saga step with a compensating action, driven by Step Functions
// Forward: reserve stock -> capture payment -> create shipment
// On failure after stock reservation, the Catch branch runs the compensation.
{
  "StartAt": "ReserveStock",
  "States": {
    "ReserveStock": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:123456789012:function:reserve-stock",
      "Next": "CapturePayment",
      "Catch": [{ "ErrorEquals": ["States.ALL"], "Next": "Failed" }]
    },
    "CapturePayment": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:123456789012:function:capture-payment",
      "Next": "CreateShipment",
      "Catch": [{ "ErrorEquals": ["States.ALL"], "Next": "ReleaseStock" }]
    },
    "ReleaseStock": {
      "Type": "Task",
      "Comment": "Compensation: idempotent, safe to retry, keyed on reservationId",
      "Resource": "arn:aws:lambda:us-east-1:123456789012:function:release-stock",
      "Next": "Failed"
    },
    "CreateShipment": { "Type": "Task", "Resource": "arn:aws:lambda:us-east-1:123456789012:function:create-shipment", "End": true },
    "Failed": { "Type": "Fail" }
  }
}`,
            `// Fat event (event-carried state transfer) vs thin event
// FAT: consumers act without calling back to the orders service
{
  "detail-type": "OrderPlaced",
  "detail": {
    "schemaVersion": 2,
    "orderId": "o-123", "customerId": "c-9", "customerTier": "gold",
    "total": 1499, "currency": "INR", "country": "IN",
    "items": [{ "sku": "A-1", "qty": 2, "price": 749.5 }]
  }
}
// THIN: every consumer must now call the orders API, recreating runtime coupling
{ "detail-type": "OrderPlaced", "detail": { "orderId": "o-123" } }`,
          ],
          questions: [
            {
              question: "When would you choose choreography over orchestration, and what do you give up?",
              solution: "<p>Choose <strong>choreography</strong> when the steps are genuinely independent reactions to a fact — analytics, notifications, cache invalidation, audit trails — and you want teams to add consumers without coordinating with the producer or a central coordinator. You give up a single place where the business process is visible: the flow exists only as the sum of rules and consumer code, so debugging a stalled process means correlating logs across services, and there is no built-in mechanism for compensation, timeouts or knowing that step three never happened. Choose <strong>orchestration</strong> (Step Functions) when the steps form a transaction with ordering, compensation and SLA requirements, accepting that the orchestrator becomes a coupling point that knows every participant.</p>",
            },
            {
              question: "Explain the saga pattern and why compensating actions are not simply rollbacks.",
              solution: "<p>A <strong>saga</strong> models a business transaction spanning services as a sequence of local transactions, each with a <strong>compensating action</strong> that runs if a later step fails. There is no distributed ACID transaction available, so nothing is technically rolled back: the compensation is a new, forward-moving business operation with its own side effects — a captured payment is <em>refunded</em>, reserved stock is <em>released</em>, a sent email may need a follow-up correction. Compensations must be idempotent and retryable because they can fail too, and because some steps are <strong>pivot points</strong> that cannot be compensated cleanly (a parcel already dispatched), irreversible steps should be ordered last so the compensable window is as large as possible.</p>",
            },
            {
              question: "What is the difference between a command and an event, and why does putting commands on a shared bus cause problems?",
              solution: "<p>An <strong>event</strong> is a past-tense fact owned by the producer (<code>OrderPlaced</code>); the producer does not know or care who consumes it, and any number of consumers may react. A <strong>command</strong> is an instruction aimed at one specific handler (<code>ShipOrder</code>), usually with an expected outcome the sender cares about. Publishing commands onto a shared bus recreates the coupling events were meant to remove: exactly one service may act on it, so a second matching rule silently causes duplicate side effects; the sender implicitly depends on that handler existing and succeeding; and failures are invisible to the sender because the bus only guarantees delivery, not outcome. Commands belong on a queue owned by the handler, or in a direct call, or as a Step Functions task where the outcome is part of the workflow state.</p>",
            },
            {
              question: "A consumer publishes an event back onto the same bus it consumes from, and you are seeing runaway invocations. How do you diagnose and prevent this class of bug?",
              solution: "<p>This is an <strong>event loop</strong>: the consumer's own output matches the rule that triggered it, so each iteration re-triggers the chain, and because EventBridge retries and fans out, volume grows quickly. Diagnose with per-rule <code>MatchedEvents</code> and <code>Invocations</code> rising together in a compounding curve, and by inspecting the <code>source</code> and <code>detail-type</code> of events arriving on the bus. Prevent it by making rule patterns discriminate explicitly on <code>source</code> so a service never matches its own emissions, by using a separate bus or distinct <code>detail-type</code> for derived events, and by adding a hop counter or causation identifier in <code>detail</code> that consumers check and refuse to process beyond a threshold. Operationally, alarm on a sudden rise in <code>TriggeredRules</code> for a bus and be prepared to disable the offending rule, which stops the cycle immediately.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html",
            "https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-data-persistence/saga-pattern.html",
            "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-patterns.html",
          ],
        },
        {
          topic: "Quotas, Throughput & Performance Engineering",
          tags: ["aws", "eventbridge", "quotas", "throughput", "throttling", "performance", "scaling"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  EventBridge is serverless, but it is not limitless. At scale the questions become: <strong>what are the actual ceilings, what happens when you hit them, and how does one event multiply into downstream load</strong>. Knowing the shape of the limits — and that most are <em>soft</em> and adjustable — separates a candidate who has run this in production from one who has only built a demo.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The quotas that matter</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>PutEvents throughput</strong> is per account, per Region, and varies by Region — roughly 10,000 requests/second in large Regions, materially lower in smaller ones. It is a <strong>soft quota</strong>: request an increase through Service Quotas well before you need it, because approval is not instant.</li>
  <li><strong>Batching:</strong> one <code>PutEvents</code> call carries up to <strong>10 entries</strong>. Each entry counts individually against the per-second <em>event</em> quota, but batching still cuts request overhead and client-side connection pressure dramatically.</li>
  <li><strong>Size:</strong> 256 KB per entry <em>and</em> per request total. Oversized events fail the entry, not the whole call — check <code>FailedEntryCount</code> on every response.</li>
  <li><strong>Rules:</strong> around 300 rules per bus by default (soft, adjustable). <strong>Five targets per rule</strong> is a <em>hard</em> limit — no increase available.</li>
  <li><strong>Invocation throttling</strong> is applied per Region and per target; exceeding it produces retries with backoff, not dropped events, until the retry window expires.</li>
  <li><strong>Retry window:</strong> up to 24 hours / 185 attempts by default, configurable per target.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Fan-out amplification — the number people forget</h4>
<p style="line-height: 1.75;">One published event is not one unit of downstream load. If an event matches <strong>4 rules</strong> and each rule has <strong>3 targets</strong>, a single <code>PutEvents</code> entry becomes <strong>12 target invocations</strong>. At 2,000 events/second that is 24,000 invocations/second hitting Lambda concurrency limits, database connections and third-party API quotas. Capacity planning must be done on the <em>amplified</em> number, and every new rule someone adds silently increases it — which is why per-rule <code>Invocations</code> dashboards matter as the rule count grows.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Latency characteristics</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Typical publish-to-target latency is <strong>sub-second</strong>, commonly around half a second, but the tail is much wider than SNS and is <strong>not covered by a latency SLA</strong>.</li>
  <li>That makes EventBridge unsuitable for a synchronous request path where a user is waiting; it is built for workflows, integrations and reactions.</li>
  <li>Pattern complexity has negligible effect on latency — matching is not your bottleneck. Target cold starts, downstream throttling and retry backoff are.</li>
  <li>Archive, schema discovery and cross-Region forwarding each add their own hop and cost; forwarded events are billed again on the receiving side.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Designing for burst and backpressure</h4>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Put SQS between the bus and slow consumers.</strong> The queue absorbs the burst and lets the consumer set its own concurrency, converting a throttling problem into a latency problem — which is almost always the better trade.</li>
  <li><strong>Reserve or cap Lambda concurrency</strong> per consumer so one noisy rule cannot exhaust account-wide concurrency and starve unrelated functions.</li>
  <li><strong>Filter as early as possible.</strong> A precise event pattern costs nothing and prevents invocation, whereas filtering inside a Lambda costs a full invocation to decide to do nothing.</li>
  <li><strong>Shard across buses</strong> when a single bus approaches the rules limit or when blast-radius isolation per domain matters more than a single pane of glass.</li>
  <li><strong>Batch producer-side</strong> with up to 10 entries, retry only the failed entries from <code>FailedEntryCount</code>, and apply jittered backoff so a retry storm does not synchronise.</li>
</ol>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What to watch</h4>
<p style="line-height: 1.75;"><code>ThrottledRules</code> and target-side throttles show you are at a ceiling. <code>FailedInvocations</code> plus DLQ depth show events are being lost or parked. A rising gap between <code>MatchedEvents</code> and <code>Invocations</code> indicates delivery pressure. On the producer side, a non-zero <code>FailedEntryCount</code> that the client ignores is the classic silent data-loss bug — the API call returned HTTP 200 while individual entries failed.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "The ceilings that bite are the Region-specific PutEvents rate, 10 entries per call, 256 KB per event, roughly 300 rules per bus, and a hard five targets per rule. Most are soft, so I raise them through Service Quotas ahead of a launch. The number people forget is fan-out amplification: one event across four rules with three targets each is twelve invocations, so I plan downstream capacity on the amplified figure. For bursts I put SQS in front of slow consumers, cap Lambda concurrency per consumer, filter in the pattern rather than in code, and always check FailedEntryCount on PutEvents, because a partial failure still returns a 200."</div>
</div>`,
          examples: [
            `# Inspect current EventBridge quotas and what is adjustable
aws service-quotas list-service-quotas --service-code events \\
  --query 'Quotas[].{Name:QuotaName,Value:Value,Adjustable:Adjustable}' --output table

# Request an increase ahead of a launch (approval is not instant)
aws service-quotas request-service-quota-increase \\
  --service-code events --quota-code L-EXAMPLE1 --desired-value 20000

# Watch for throttling and the matched-vs-invoked gap
aws cloudwatch get-metric-statistics --namespace AWS/Events --metric-name ThrottledRules \\
  --start-time 2026-09-17T00:00:00Z --end-time 2026-09-18T00:00:00Z --period 300 --statistics Sum`,
            `// Producer: batch up to 10 entries and retry ONLY the failed ones
import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge";
const eb = new EventBridgeClient({});

export async function publishBatch(entries, attempt = 0) {
  const res = await eb.send(new PutEventsCommand({ Entries: entries.slice(0, 10) }));

  // A 200 response can still contain per-entry failures. Ignoring this is silent data loss.
  if (res.FailedEntryCount > 0) {
    const failed = entries.filter((_, i) => res.Entries[i].ErrorCode);
    if (attempt >= 5) throw new Error("permanent publish failure: " + JSON.stringify(res.Entries));
    const backoff = Math.min(2 ** attempt * 100, 5000) * (0.5 + Math.random()); // jitter
    await new Promise((r) => setTimeout(r, backoff));
    return publishBatch(failed, attempt + 1);
  }
}`,
            `# Backpressure: route to SQS instead of invoking a slow consumer directly,
# then let the consumer control its own concurrency.
aws events put-targets --rule high-value-orders --event-bus-name orders-bus --targets '[{
  "Id": "buffered", "Arn": "arn:aws:sqs:us-east-1:123456789012:fulfilment-queue"
}]'

# Cap the consumer so one rule cannot exhaust account-wide Lambda concurrency
aws lambda put-function-concurrency --function-name fulfilment-worker --reserved-concurrent-executions 50`,
          ],
          questions: [
            {
              question: "Your system publishes 2,000 events per second and each event matches 4 rules with 3 targets apiece. What number do you actually plan capacity around, and what breaks first?",
              solution: "<p>Plan around the <strong>amplified</strong> figure: 2,000 × 4 rules × 3 targets = <strong>24,000 target invocations per second</strong>, not 2,000. What breaks first is almost never EventBridge itself — it is the downstream constraints: Lambda account concurrency (a burst of 24,000 concurrent invocations will throttle long before EventBridge does), database or connection-pool limits behind those functions, and any third-party API quota on an API-destination target. The mitigations are to buffer via SQS so invocation rate is decoupled from processing rate, reserve concurrency per consumer so one rule cannot starve others, and tighten patterns so fewer rules match each event in the first place.</p>",
            },
            {
              question: "PutEvents returned HTTP 200 but events are missing downstream. What is the most likely cause?",
              solution: "<p>The client is ignoring <strong><code>FailedEntryCount</code></strong> in the response. <code>PutEvents</code> is a <strong>partial-failure API</strong>: the HTTP call can succeed while individual entries in the batch fail — for exceeding the 256 KB entry limit, referencing a bus the caller lacks <code>events:PutEvents</code> on, or being throttled. Each failed entry carries an <code>ErrorCode</code> and <code>ErrorMessage</code> in the parallel <code>Entries</code> array. The fix is to inspect the response on every call, retry only the failed entries with jittered exponential backoff, and alarm on a persistent non-zero failure rate — treating a 200 as success is a classic silent data-loss bug.</p>",
            },
            {
              question: "A rule needs to reach eight targets, but the limit is five. What are the options and what are their trade-offs?",
              solution: "<p>The five-targets-per-rule limit is <strong>hard</strong> and cannot be raised, so the options are structural. <strong>Multiple rules with the same pattern</strong> is simplest and keeps per-consumer metrics and DLQs separate, at the cost of duplicated pattern definitions that can drift. <strong>Fan out via SNS</strong> reaches many subscribers with one target but loses per-consumer EventBridge metrics and adds a hop. <strong>One rule per consuming service</strong> is usually the cleanest at scale: each team owns its own rule, filter, retry policy and DLQ, so nobody edits a shared rule and a bad consumer cannot affect the others. Note that each extra rule also increases fan-out amplification, so downstream capacity planning must keep up.</p>",
            },
            {
              question: "How do you prepare EventBridge for a known traffic spike, such as a flash sale?",
              solution: "<p>Ahead of time: check current usage against quotas with Service Quotas and <strong>request increases early</strong> for the Region's PutEvents rate and rules-per-bus, since approval is not immediate. Confirm fan-out amplification against downstream limits and pre-provision or reserve Lambda concurrency for critical consumers. Put SQS in front of anything slow so the spike becomes queue depth rather than throttled invocations, and shorten <code>MaximumEventAgeInSeconds</code> on time-sensitive rules so stale events are not delivered hours later during recovery. Ensure every target has a DLQ with an alarm, batch producer-side up to 10 entries with jittered retry on partial failures, and dashboard <code>ThrottledRules</code>, <code>FailedInvocations</code> and DLQ depth so you can see pressure building rather than discovering it afterwards.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-quota.html",
            "https://docs.aws.amazon.com/eventbridge/latest/APIReference/API_PutEvents.html",
            "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-monitoring.html",
          ],
        },
        {
          topic: "Multi-Region Resilience, Global Endpoints & DR",
          tags: ["aws", "eventbridge", "multi-region", "global endpoints", "disaster recovery", "failover"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  A bus is a <strong>Regional</strong> resource. If the Region degrades, producers cannot publish and consumers cannot be triggered — the event-driven backbone of the application is down. Multi-Region EventBridge answers two separate questions that candidates often merge: <strong>where do producers publish during an outage</strong>, and <strong>what happens to the events already in flight</strong>.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Global endpoints</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>A <strong>global endpoint</strong> is a single managed DNS name that producers publish to instead of a Regional bus. It fronts a <strong>primary</strong> and a <strong>secondary</strong> bus in two Regions.</li>
  <li>Failover is driven by a <strong>Route 53 health check</strong> you define (typically on a CloudWatch alarm representing Regional health). When the check goes unhealthy, the SDK routes <code>PutEvents</code> to the secondary Region automatically — no application redeploy, no config change.</li>
  <li><strong>Event replication</strong> can be enabled alongside it, so events published to the primary are also copied to the secondary bus, keeping the standby warm and giving the secondary a history to work with.</li>
  <li>Failback is automatic once the health check recovers. Both Regions need the <strong>same rules and consumers deployed</strong> — a global endpoint routes events, it does not deploy your infrastructure.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What replication does and does not give you</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Replication is <strong>asynchronous</strong>, so events published moments before an outage may not have reached the secondary — that gap is your effective <strong>RPO</strong>.</li>
  <li>Replicated events arrive as <em>new</em> events in the secondary Region and are <strong>billed there</strong>; replication roughly doubles event cost for the covered traffic.</li>
  <li>During failover and failback windows, the same logical event can be processed in both Regions. <strong>Idempotency is mandatory</strong>, and the idempotency store must be visible to both Regions (a global table, or a deterministic business key) or duplicates will not be detected.</li>
  <li>Ordering is not preserved across Regions, and it was never guaranteed within one.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Building DR without global endpoints</h4>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Cross-Region rule targets:</strong> a rule in Region A forwards matching events to a bus in Region B. Explicit and simple, but the producer still depends on Region A being reachable — this protects consumers, not publishing.</li>
  <li><strong>Archive per Region plus replay:</strong> the cheapest form of recovery. After a Regional incident, replay the affected window into the recovered bus, optionally scoped to specific rules so unaffected consumers are not re-triggered.</li>
  <li><strong>Client-side failover:</strong> producers catch publish failures and write to a local durable buffer (SQS in another Region, or local disk) for later drain. More code, but it covers the case where nothing AWS-managed is reachable.</li>
</ol>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Choosing a posture</h4>
<p style="line-height: 1.75;">Match the mechanism to the requirement rather than defaulting to the most elaborate one. <strong>Backup and restore</strong> (archive plus replay, minutes-to-hours RTO) is right for internal workflows. <strong>Warm standby</strong> (global endpoint with replication, consumers deployed and idle in both Regions) fits revenue-critical flows with an RTO in minutes. <strong>Active-active</strong> (both Regions publishing and consuming continuously) gives the lowest RTO but demands genuinely global idempotency and conflict handling in every consumer, and doubles steady-state cost — it is a decision about the whole application, not about EventBridge.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "For the publish path I use a global endpoint: producers target one managed DNS name fronting a primary and secondary bus, and a Route 53 health check on a Regional health alarm shifts PutEvents to the secondary automatically, with failback when it recovers. I enable replication so the standby has history, deploy identical rules and consumers in both Regions, and treat the asynchronous replication lag as my RPO. Because the same event can be processed in both Regions during failover, consumers must be idempotent against a store both Regions can see. Where the requirement is looser, archive plus scoped replay is a much cheaper recovery mechanism than full active-active."</div>
</div>`,
          examples: [
            `# Global endpoint: one DNS name fronting primary (us-east-1) and secondary (eu-west-1)
aws events create-endpoint --name global-orders \\
  --routing-config '{
    "FailoverConfig": {
      "Primary": { "HealthCheck": "arn:aws:route53:::healthcheck/abcd-1234" },
      "Secondary": { "Route": "eu-west-1" }
    }
  }' \\
  --event-buses '[
    { "EventBusArn": "arn:aws:events:us-east-1:123456789012:event-bus/orders-bus" },
    { "EventBusArn": "arn:aws:events:eu-west-1:123456789012:event-bus/orders-bus" }
  ]' \\
  --replication-config State=ENABLED \\
  --role-arn arn:aws:iam::123456789012:role/eventbridge-replication

aws events describe-endpoint --name global-orders --query '{state:State,arn:EndpointUrl}'`,
            `// Producers publish to the endpoint, not to a Regional bus.
// The SDK resolves the endpoint and follows the health check during failover.
import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge";

const eb = new EventBridgeClient({
  endpointId: "abcde12345.veo",       // from the global endpoint
  region: "us-east-1",                 // home Region; SDK fails over automatically
});

await eb.send(new PutEventsCommand({
  Entries: [{
    EventBusName: "orders-bus",
    Source: "com.myapp.orders",
    DetailType: "OrderPlaced",
    // Deterministic business key so BOTH Regions dedupe to the same identity
    Detail: JSON.stringify({ idempotencyKey: "order:o-123:placed", orderId: "o-123" }),
  }],
}));`,
            `# Cheaper DR posture: archive per Region, then scoped replay after an incident
aws events create-archive --archive-name orders-archive-use1 \\
  --event-source-arn arn:aws:events:us-east-1:123456789012:event-bus/orders-bus \\
  --retention-days 30

# Replay only the outage window, and only to the rules that missed events
aws events start-replay --replay-name recover-2026-09-17 \\
  --event-source-arn arn:aws:events:us-east-1:123456789012:archive/orders-archive-use1 \\
  --event-start-time 2026-09-17T08:00:00Z --event-end-time 2026-09-17T11:30:00Z \\
  --destination '{
    "Arn": "arn:aws:events:us-east-1:123456789012:event-bus/orders-bus",
    "FilterArns": ["arn:aws:events:us-east-1:123456789012:rule/orders-bus/fulfilment"]
  }'`,
          ],
          questions: [
            {
              question: "What exactly does a global endpoint protect, and what does it not protect?",
              solution: "<p>It protects the <strong>publish path</strong>: producers send to one managed DNS name, and when the Route 53 health check for the primary Region goes unhealthy, <code>PutEvents</code> is routed to the secondary Region's bus automatically, with failback on recovery. It does <strong>not</strong> deploy your rules, targets or consumer functions — those must already exist and be identical in the secondary Region, or events will arrive and match nothing. It also does not make replication synchronous, so events published just before the failure may never have reached the secondary, and it does not remove duplicates: during failover and failback the same logical event can be processed in both Regions.</p>",
            },
            {
              question: "With replication enabled, what is your RPO, and how do you reason about duplicates?",
              solution: "<p>Replication is <strong>asynchronous</strong>, so the RPO is the replication lag at the moment of failure — events accepted by the primary but not yet copied are effectively lost from the secondary's view. You measure it rather than assume it, and pair it with an archive so a post-incident replay can close the gap. For duplicates, assume the same logical event will be delivered in both Regions during failover and failback, and dedupe on a <strong>deterministic business key</strong> carried in <code>detail</code> rather than the EventBridge-assigned event id, because the replicated copy is a distinct event with its own id. Critically, the idempotency store must be readable from both Regions — a Regional DynamoDB table gives you per-Region dedupe only, which is exactly the case failover breaks.</p>",
            },
            {
              question: "A team wants full active-active EventBridge across two Regions. What questions do you ask before agreeing?",
              solution: "<p>First, what is the actual RTO and RPO requirement, and does warm standby with a global endpoint already meet it at a fraction of the complexity and cost? Second, is every consumer idempotent against a <strong>globally visible</strong> store, since active-active means concurrent processing of related events in both Regions, not just during failover. Third, how are write conflicts resolved when two Regions act on the same entity — is there a Regional partition key, a global table with conflict resolution, or an authoritative Region per entity? Fourth, are the downstream systems (databases, third-party APIs, payment providers) themselves multi-Region, because an active-active event bus in front of a single-Region database buys nothing. Finally, cost: replication plus duplicated steady-state consumption roughly doubles event spend, and the operational burden of keeping rules identical across Regions is permanent.</p>",
            },
            {
              question: "When is archive-plus-replay a better DR answer than a global endpoint?",
              solution: "<p>When the requirement is <strong>eventual completeness rather than continuous availability</strong> — internal workflows, analytics pipelines, billing reconciliation, anything where processing an hour late is acceptable but losing events is not. Archive plus replay costs only storage, requires no duplicate infrastructure in a second Region, and lets you recover precisely: replay a specific time window and scope the destination to the specific rules whose consumers missed events, so unaffected consumers are not re-triggered. A global endpoint, by contrast, adds replication cost, demands consumers deployed and maintained in two Regions, and only pays for itself when producers genuinely cannot tolerate a publish outage.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-global-endpoints.html",
            "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-archive.html",
            "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-replay-archived-event.html",
          ],
        },
        {
          topic: "Security Deep Dive — KMS Encryption, PrivateLink & Governance",
          tags: ["aws", "eventbridge", "security", "kms", "privatelink", "vpc endpoint", "governance"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  At beginner level, EventBridge security is "who can publish and what can the rule invoke." At scale it becomes four distinct concerns: <strong>encryption of event data, network isolation of the publish path, preventing confused-deputy access, and organisation-wide guardrails</strong> that survive individual teams making mistakes.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Encryption at rest with a customer managed key</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Event data is encrypted at rest by default with an AWS-owned key. Attaching a <strong>customer managed KMS key (CMK)</strong> to a bus gives you the things an owned key cannot: a <strong>key policy</strong> you control, <strong>CloudTrail visibility of every decrypt</strong>, independent <strong>rotation</strong>, and the ability to <strong>revoke</strong> access to historical data by disabling the key.</li>
  <li><strong>Archives and replays need the same key access.</strong> A common production failure is encrypting the bus with a CMK, then discovering replay fails because the EventBridge service principal was never granted <code>kms:Decrypt</code> in the key policy for the archive's context.</li>
  <li>KMS adds a per-request cost and its own throttling quota on the encrypt/decrypt path, which matters at very high event rates — budget for it rather than discovering it as latency.</li>
  <li>Encryption at rest is not field-level protection: anyone permitted to read the event sees the whole payload. Sensitive fields should be tokenised or omitted, with the event carrying a reference rather than the secret itself.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Network isolation with interface VPC endpoints</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>By default <code>PutEvents</code> from a private subnet requires a NAT gateway and traverses the public AWS network path. An <strong>interface VPC endpoint (PrivateLink)</strong> for <code>com.amazonaws.&lt;region&gt;.events</code> keeps that traffic entirely on the AWS private network.</li>
  <li>Benefits are both security and cost: no internet egress, no NAT data-processing charges for that traffic, and an <strong>endpoint policy</strong> that can restrict which buses may be published to from inside that VPC.</li>
  <li>Pair it with a bus resource policy condition on <code>aws:SourceVpce</code> to require that events arrive only through the approved endpoint, closing the path where valid credentials are used from outside the network.</li>
  <li>Note the endpoint covers the <em>publish</em> side. Target invocation is performed by EventBridge itself and does not flow through your VPC endpoint.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The confused deputy problem</h4>
<p style="line-height: 1.75;">When you allow the <code>events.amazonaws.com</code> principal to invoke a Lambda or write to a queue, an unconditioned statement allows <strong>any</strong> EventBridge rule, in any account, to trigger it. The fix is always a condition scoping the grant to your own rule or account: <code>aws:SourceArn</code> pinned to the specific rule ARN, and <code>aws:SourceAccount</code> as a defence in depth. The same applies to DLQ queue policies and to cross-account bus policies, where <code>aws:PrincipalOrgID</code> is far safer than listing account IDs that drift over time.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Least privilege and governance at organisation scale</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Scope producer permissions with EventBridge <strong>condition keys</strong> such as <code>events:source</code> and <code>events:detail-type</code>, so a service can publish <em>its own</em> event types and not impersonate another domain.</li>
  <li>Use <strong>SCPs</strong> to deny bus resource policies that grant to a wildcard principal without an organisation condition, and to prevent deletion of archives or disabling of CloudTrail in member accounts.</li>
  <li>Apply <strong>tag-based access control</strong> so platform teams manage rules broadly while application teams manage only rules tagged to their own service.</li>
  <li>Audit continuously: CloudTrail records rule and target changes, and a rule targeting an unexpected cross-account bus or a newly created API destination to an unknown endpoint is a genuine exfiltration signal worth alarming on.</li>
  <li>For <strong>API destinations</strong>, credentials live in a connection backed by Secrets Manager — restrict who can read or update connections, because whoever edits one controls where events are sent and with what credentials.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "I encrypt domain buses with a customer managed KMS key so I get a key policy, CloudTrail decrypt visibility and revocability, remembering that archives and replay need the same key grants or replay silently fails. Publishing from private subnets goes through an interface VPC endpoint, with the bus policy conditioned on aws:SourceVpce so credentials alone are not enough. Every grant to the events.amazonaws.com principal is scoped with aws:SourceArn to defeat the confused deputy, cross-account access uses aws:PrincipalOrgID rather than account lists, producers are restricted by the events:source condition key so a service cannot impersonate another domain, and SCPs stop teams from attaching wildcard bus policies in the first place."</div>
</div>`,
          examples: [
            `# Bus encrypted with a customer managed key
aws events create-event-bus --name orders-bus \\
  --kms-key-identifier arn:aws:kms:us-east-1:123456789012:key/1234abcd-12ab-34cd-56ef

# Key policy MUST also allow the archive/replay path, or replay fails silently later
{
  "Sid": "AllowEventBridgeArchiveAndReplay",
  "Effect": "Allow",
  "Principal": { "Service": "events.amazonaws.com" },
  "Action": ["kms:Decrypt", "kms:GenerateDataKey", "kms:DescribeKey"],
  "Resource": "*",
  "Condition": { "StringEquals": { "aws:SourceAccount": "123456789012" } }
}`,
            `# Interface VPC endpoint so PutEvents never leaves the AWS private network
aws ec2 create-vpc-endpoint --vpc-id vpc-0abc123 --vpc-endpoint-type Interface \\
  --service-name com.amazonaws.us-east-1.events \\
  --subnet-ids subnet-0aaa subnet-0bbb --security-group-ids sg-0eee \\
  --private-dns-enabled

# Bus policy: credentials alone are not enough, traffic must arrive via the endpoint
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "OnlyFromApprovedVpcEndpoint",
    "Effect": "Deny",
    "Principal": "*",
    "Action": "events:PutEvents",
    "Resource": "arn:aws:events:us-east-1:123456789012:event-bus/orders-bus",
    "Condition": { "StringNotEquals": { "aws:SourceVpce": "vpce-0123456789abcdef0" } }
  }]
}`,
            `# Confused deputy: scope every grant to events.amazonaws.com with aws:SourceArn
aws lambda add-permission --function-name notify-sales --statement-id eb-scoped \\
  --action lambda:InvokeFunction --principal events.amazonaws.com \\
  --source-arn arn:aws:events:us-east-1:123456789012:rule/orders-bus/high-value-orders

# Least privilege producer: may publish ONLY its own domain's events
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": "events:PutEvents",
    "Resource": "arn:aws:events:us-east-1:123456789012:event-bus/orders-bus",
    "Condition": {
      "StringEquals": { "events:source": "com.myapp.orders" },
      "StringLike": { "events:detail-type": "Order*" }
    }
  }]
}`,
          ],
          questions: [
            {
              question: "What do you gain by encrypting a bus with a customer managed KMS key rather than the default, and what is the classic operational trap?",
              solution: "<p>You gain a <strong>key policy you control</strong> (so access can be granted and revoked independently of IAM), <strong>CloudTrail records of every decrypt</strong> for audit, independent <strong>rotation</strong>, and the ability to render historical event data inaccessible by disabling the key. The classic trap is <strong>archive and replay</strong>: encrypting the bus without granting the EventBridge service principal <code>kms:Decrypt</code> and <code>kms:GenerateDataKey</code> for the archive context means archiving appears to work, but a replay months later — exactly when you are mid-incident — fails. Secondary traps are the per-request KMS cost and KMS throttling quotas on very high-volume buses.</p>",
            },
            {
              question: "A Lambda has a resource policy allowing events.amazonaws.com to invoke it, with no conditions. Why is that a security finding?",
              solution: "<p>It is a <strong>confused deputy</strong> exposure: the grant names a service principal, not a specific caller, so <em>any</em> EventBridge rule — including one in an attacker-controlled AWS account — can invoke that function, because EventBridge is the one making the call and it satisfies the principal test. The remediation is to add <code>aws:SourceArn</code> pinned to the exact rule ARN that should be allowed, plus <code>aws:SourceAccount</code> as defence in depth. The same reasoning applies to SQS queue policies used as DLQs and to any resource policy naming an AWS service principal.</p>",
            },
            {
              question: "How would you stop one microservice from publishing events that impersonate another team's domain?",
              solution: "<p>Constrain the producer's IAM policy with EventBridge <strong>condition keys</strong> rather than granting blanket <code>events:PutEvents</code> on the bus. A condition of <code>events:source</code> equal to that service's own reverse-DNS source — optionally with <code>events:detail-type</code> restricted by pattern — means a compromised or buggy orders service physically cannot publish an event claiming to come from the payments domain. Back this with a governance layer: an SCP preventing teams from attaching over-broad bus policies, and CloudTrail alarms on unexpected sources appearing on a bus, since the condition only protects against principals you have scoped.</p>",
            },
            {
              question: "What does an interface VPC endpoint for EventBridge actually protect, and what does it leave untouched?",
              solution: "<p>It protects the <strong>publish path</strong>: <code>PutEvents</code> calls from resources in your VPC travel over PrivateLink on the AWS private network instead of via a NAT gateway and the public endpoint, which removes internet egress, cuts NAT data-processing cost, and lets you apply an endpoint policy plus a bus policy condition on <code>aws:SourceVpce</code> so stolen credentials cannot be used from outside the network. It leaves the <strong>delivery path</strong> untouched — EventBridge invokes targets itself, from the service's own network, so a VPC endpoint does nothing to constrain where matched events are delivered. Controlling that side is a matter of rule and target permissions, not networking.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-data-protection.html",
            "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-related-service-vpc.html",
            "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-use-resource-based.html",
          ],
        },
        {
          topic: "Testing, Tracing & Observability for Event-Driven Systems",
          tags: ["aws", "eventbridge", "testing", "x-ray", "tracing", "observability", "schema"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  The defining difficulty of event-driven systems is that <strong>there is no call stack</strong>. A request that fails synchronously gives you a stack trace; an event that is never processed gives you silence. Everything below exists to replace the stack trace with something equally actionable.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Tracing across the bus</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>AWS X-Ray</strong> propagates trace context through EventBridge, so a producer Lambda, the bus hop and the consumer Lambda appear on one service map and one trace timeline — the closest equivalent to a distributed stack trace.</li>
  <li>Tracing must be enabled on <strong>both ends</strong>; a consumer without active tracing silently breaks the chain and the trace appears to end at the bus.</li>
  <li>Sampling matters at volume: trace everything in staging, sample in production, but always force-sample events matching failure conditions so the traces you actually need are not the ones sampled away.</li>
  <li>Belt and braces: carry an explicit <strong>correlation identifier</strong> (and a <strong>causation identifier</strong> naming the event that caused this one) inside <code>detail</code>. It survives hops X-Ray does not instrument, works across accounts, and turns log search into a single query.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Testing at each level</h4>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Pattern unit tests.</strong> <code>test-event-pattern</code> checks a pattern against sample events with no deployment. Run it in CI over a fixture set of events that must match and, just as importantly, events that must <em>not</em> match — over-broad patterns are as dangerous as broken ones.</li>
  <li><strong>Contract tests.</strong> Register schemas in the <strong>schema registry</strong>, generate typed bindings, and validate producer sample events against the registered schema in CI so a breaking change fails the pipeline rather than a consumer at 3am.</li>
  <li><strong>Integration tests.</strong> Deploy an ephemeral bus per pull request, publish real events, and assert on target side effects. A CloudWatch Logs or SQS target makes assertions straightforward without mocking the bus.</li>
  <li><strong>Replay-based testing.</strong> Replay a window of real production events from an archive into a staging bus to reproduce an incident or load-test a new consumer against genuinely representative traffic.</li>
</ol>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The alarm set that actually catches problems</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>FailedInvocations &gt; 0</strong> — events are being lost or parked; usually permissions or a broken target.</li>
  <li><strong>DLQ depth &gt; 0, and age of oldest message</strong> — depth tells you something failed, age tells you nobody is fixing it.</li>
  <li><strong>MatchedEvents drops to zero on a rule that is normally busy</strong> — a far better signal than an error metric, because a producer that stops publishing, or a pattern broken by a schema change, generates no errors at all.</li>
  <li><strong>ThrottledRules</strong> — you are at a ceiling and retries are absorbing it, for now.</li>
  <li><strong>End-to-end business latency</strong> — emit a custom metric from the final consumer measuring event <code>time</code> to processing completion. This catches slow degradation that no per-service metric reveals.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The silent-failure modes to design against</h4>
<p style="line-height: 1.75;">Three failures produce no errors anywhere. A <strong>producer that stops publishing</strong> — nothing fails, volume just goes to zero, which is why absence-of-traffic alarms matter. A <strong>pattern that silently stops matching</strong> after a producer renames a field, so <code>MatchedEvents</code> quietly falls while <code>FailedInvocations</code> stays clean. And a <strong>target with no DLQ</strong>, where events are dropped after the retry window with only a metric datapoint as evidence. Configuring a DLQ on every target, alarming on absence of traffic, and treating event shape as a versioned contract are the three habits that eliminate most of this class.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "I replace the missing call stack with X-Ray tracing enabled on both producer and consumer plus an explicit correlation and causation id inside detail, so one query reconstructs a flow across accounts. Testing is layered: test-event-pattern in CI over must-match and must-not-match fixtures, schema-registry contract validation so breaking changes fail the build, ephemeral buses per pull request for integration tests, and replay from archive into staging for realistic load. For alarms I watch FailedInvocations, DLQ depth and the age of the oldest message, and crucially an absence-of-traffic alarm on MatchedEvents, because a producer that stops publishing or a pattern broken by a renamed field throws no errors at all."</div>
</div>`,
          examples: [
            `# Pattern unit tests in CI: assert both matches AND non-matches
aws events test-event-pattern \\
  --event-pattern file://patterns/high-value-orders.json \\
  --event file://fixtures/order-1499-in.json     # expect: true

aws events test-event-pattern \\
  --event-pattern file://patterns/high-value-orders.json \\
  --event file://fixtures/order-99-us.json       # expect: false (guards over-broad patterns)`,
            `// Correlation + causation ids survive hops X-Ray does not instrument
import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge";
const eb = new EventBridgeClient({});

export async function emit(detailType, payload, incoming) {
  await eb.send(new PutEventsCommand({
    Entries: [{
      EventBusName: "orders-bus",
      Source: "com.myapp.orders",
      DetailType: detailType,
      Detail: JSON.stringify({
        schemaVersion: 1,
        // same value for every event in one business flow
        correlationId: incoming?.detail?.correlationId ?? crypto.randomUUID(),
        // which event caused THIS one, so the chain can be walked backwards
        causationId: incoming?.id ?? null,
        ...payload,
      }),
    }],
  }));
}

// One Logs Insights query then reconstructs the whole flow across services:
// fields @timestamp, @message
// | filter @message like /correlationId/ and @message like "c-7f3a"
// | sort @timestamp asc`,
            `# The alarm that catches silent failure: a busy rule going quiet
aws cloudwatch put-metric-alarm --alarm-name orders-rule-no-traffic \\
  --namespace AWS/Events --metric-name MatchedEvents \\
  --dimensions Name=RuleName,Value=high-value-orders \\
  --statistic Sum --period 900 --evaluation-periods 2 \\
  --threshold 1 --comparison-operator LessThanThreshold \\
  --treat-missing-data breaching \\
  --alarm-actions arn:aws:sns:us-east-1:123456789012:oncall

# Depth tells you something failed; age tells you nobody is fixing it
aws cloudwatch put-metric-alarm --alarm-name eventbridge-dlq-stale \\
  --namespace AWS/SQS --metric-name ApproximateAgeOfOldestMessage \\
  --dimensions Name=QueueName,Value=eventbridge-dlq \\
  --statistic Maximum --period 300 --evaluation-periods 1 --threshold 1800 \\
  --comparison-operator GreaterThanThreshold \\
  --alarm-actions arn:aws:sns:us-east-1:123456789012:oncall`,
          ],
          questions: [
            {
              question: "How do you trace a single business transaction across five services connected by EventBridge?",
              solution: "<p>Two complementary mechanisms. <strong>X-Ray</strong> propagates trace context through EventBridge, so with active tracing enabled on both producers and consumers the whole flow renders as one service map and trace timeline — but the chain breaks wherever a participant does not have tracing enabled, and it does not reach every integration. So I also carry an explicit <strong>correlation id</strong> in the <code>detail</code> payload, propagated unchanged by every consumer that emits a downstream event, plus a <strong>causation id</strong> holding the id of the event that triggered this one. The correlation id makes a single CloudWatch Logs Insights query return every log line for the transaction across all services and accounts; the causation id lets you reconstruct the exact parent-child chain when several events share one correlation.</p>",
            },
            {
              question: "What is the most dangerous failure mode in an event-driven system, and which alarm catches it?",
              solution: "<p><strong>Silent absence</strong> — a producer stops publishing, or a pattern stops matching because a producer renamed a field. Nothing errors: <code>FailedInvocations</code> stays at zero, no target throws, no DLQ fills, and every conventional error dashboard stays green while business events quietly stop being processed. The alarm that catches it is an <strong>absence-of-traffic alarm</strong> on <code>MatchedEvents</code> for a rule that should always be busy, configured with a low threshold and, critically, <code>treat-missing-data</code> set to breaching so that <em>no datapoints at all</em> triggers rather than suppresses the alarm. This is also the argument for treating event shape as a versioned contract validated in CI, since a renamed field is the most common trigger.</p>",
            },
            {
              question: "How would you test EventBridge rules in a CI pipeline without deploying to production?",
              solution: "<p>Layer it. <strong>Pattern unit tests</strong> with <code>test-event-pattern</code> need no deployment at all: run each rule's pattern against fixture events that must match and, equally important, events that must not match, so an over-broad pattern fails the build. <strong>Contract tests</strong> validate producer sample events against schemas held in the schema registry, catching breaking changes before release. <strong>Integration tests</strong> deploy an ephemeral bus and rules per pull request, publish real events and assert on target side effects — using an SQS or CloudWatch Logs target makes assertions simple and avoids mocking the bus. For realistic load, <strong>replay</strong> a window of archived production events into a staging bus, which exercises consumers against genuine traffic shapes rather than synthetic ones.</p>",
            },
            {
              question: "Which metrics would you put on an on-call dashboard for a business-critical event flow, and why each?",
              solution: "<p><strong>FailedInvocations</strong> because a non-zero value means events are being lost or parked, usually permissions or a broken target. <strong>DLQ depth and age of oldest message</strong> because depth proves something failed while age proves nobody has fixed it, and the age alarm is the one that prevents a quiet DLQ from accumulating for weeks. <strong>MatchedEvents with an absence-of-traffic alarm</strong> because the silent failures are the ones no error metric reveals. <strong>ThrottledRules</strong> because it signals you are at a ceiling that retries are currently absorbing but will not absorb under a larger spike. And an <strong>end-to-end business latency</strong> custom metric emitted by the final consumer, measuring the event's <code>time</code> field to processing completion, because it is the only number that reflects what a customer actually experiences across the whole chain rather than any single service's view of health.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-monitoring.html",
            "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-schema-registry.html",
            "https://docs.aws.amazon.com/xray/latest/devguide/xray-services-eventbridge.html",
          ],
        },
      ],
    },
  ],
};
