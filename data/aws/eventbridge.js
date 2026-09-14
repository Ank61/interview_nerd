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
          ],
          links: [
            "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-cross-account.html",
            "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-pipes.html",
            "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-api-destinations.html",
          ],
        },
      ],
    },
  ],
};
