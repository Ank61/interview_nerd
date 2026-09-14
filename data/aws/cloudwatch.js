/**
 * AWS CloudWatch (and CloudTrail) interview-prep data.
 *
 * Standalone category (id 107) covering CloudWatch metrics, logs, alarms and
 * dashboards, plus CloudTrail audit trails and how the two are combined for
 * security detection. Same shape as awsPrepareData.js.
 */
export const awsCloudWatch = {
  id: 107,
  category: "AWS CloudWatch",
  themeBgColor: "#FCE7F3",
  textColor: "#9D174D",
  topicColor: "#DB2777",
  lightColor: "#FDF2F8",
  type: [
    {
      id: 1,
      label: "Beginner",
      concepts: [
        {
          topic: "Metrics, Namespaces & Custom Metrics",
          tags: ["aws", "cloudwatch", "metrics", "monitoring", "observability"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>Amazon CloudWatch</strong> is the AWS monitoring and observability service. Its oldest and most important primitive is the <strong>metric</strong>: a time-ordered set of data points such as CPU utilisation, request latency or queue depth. Nearly every AWS service publishes metrics automatically, and your own applications can publish theirs. Alarms, dashboards and Auto Scaling policies are all built on top of metrics, so understanding how metrics are named, stored and priced is the foundation of everything else in CloudWatch.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Anatomy of a metric</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Namespace:</strong> a container such as <code>AWS/EC2</code>, <code>AWS/Lambda</code> or your own <code>MyApp/Checkout</code>. Namespaces stop metrics from different sources being aggregated together.</li>
  <li><strong>Metric name:</strong> <code>CPUUtilization</code>, <code>Duration</code>, <code>OrdersFailed</code>.</li>
  <li><strong>Dimensions:</strong> up to 30 name-value pairs that identify the metric, for example <code>InstanceId=i-0abc</code> or <code>Service=checkout</code>. Each unique combination of dimensions is a <strong>separate metric</strong>, and you cannot aggregate across dimensions unless the service publishes a rolled-up variant.</li>
  <li><strong>Statistics:</strong> Sum, Average, Minimum, Maximum, SampleCount and percentiles such as p99, computed over a <strong>period</strong> (1 second to 1 day).</li>
  <li><strong>Units:</strong> Count, Seconds, Bytes, Percent and so on, mostly for display.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Resolution and retention</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Standard resolution</strong> is one data point per minute; <strong>high resolution</strong> custom metrics can be published every second.</li>
  <li>EC2 publishes <strong>basic monitoring</strong> every 5 minutes for free; <strong>detailed monitoring</strong> (1 minute) is a paid opt-in and makes Auto Scaling react faster.</li>
  <li>Data is rolled up over time: 1-second points are kept for 3 hours, 1-minute for 15 days, 5-minute for 63 days and 1-hour for 15 months. Metrics are never deleted, they simply expire.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Custom metrics</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>PutMetricData API:</strong> publish values directly from your code. Batch up to 1,000 values per call and use <strong>statistic sets</strong> (sum, count, min, max) to reduce API calls.</li>
  <li><strong>Embedded Metric Format (EMF):</strong> write a structured JSON log line and CloudWatch extracts metrics from it asynchronously. No API calls, no latency in the request path, and the raw log line is kept for debugging. This is the recommended approach for Lambda and containers.</li>
  <li><strong>CloudWatch Agent:</strong> installed on EC2 or on-premises hosts to collect what the hypervisor cannot see, such as <strong>memory, disk space and process counts</strong>, and to ship log files. Configuration usually lives in SSM Parameter Store and the instance needs <code>CloudWatchAgentServerPolicy</code>.</li>
  <li><strong>Metric math</strong> combines metrics with expressions (error rate = errors divided by requests) and <strong>anomaly detection</strong> learns a band of expected values.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Cost awareness</h4>
<p style="line-height: 1.75;">Custom metrics are billed <strong>per metric per month</strong>, and every unique dimension combination counts. A metric with a <code>UserId</code> dimension can silently create millions of metrics. Keep dimensions low cardinality (service, environment, endpoint) and put per-user detail in logs instead.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "A CloudWatch metric is identified by namespace, name and dimensions, and each dimension combination is its own billed metric, so I keep cardinality low. AWS services publish defaults, I enable detailed monitoring where Auto Scaling needs one-minute data, and I install the CloudWatch Agent for memory and disk. For application metrics I prefer Embedded Metric Format so I get metrics and logs from one structured log line without PutMetricData calls in the hot path."</div>
</div>`,
          examples: [
            `# Publish a custom metric (statistic set reduces API calls)
aws cloudwatch put-metric-data --namespace MyApp/Checkout \\
  --metric-name OrderLatencyMs --dimensions Service=checkout,Env=prod \\
  --statistic-values Sum=1240,SampleCount=8,Minimum=95,Maximum=410 --unit Milliseconds

# High-resolution counter, published every second
aws cloudwatch put-metric-data --namespace MyApp/Checkout \\
  --metric-name OrdersFailed --dimensions Service=checkout --value 1 \\
  --unit Count --storage-resolution 1

# Query p99 latency for the last hour with metric math
aws cloudwatch get-metric-data --start-time $(date -u -v-1H +%Y-%m-%dT%H:%M:%SZ) \\
  --end-time $(date -u +%Y-%m-%dT%H:%M:%SZ) --metric-data-queries '[
  {"Id":"lat","MetricStat":{"Metric":{"Namespace":"MyApp/Checkout","MetricName":"OrderLatencyMs",
     "Dimensions":[{"Name":"Service","Value":"checkout"},{"Name":"Env","Value":"prod"}]},
     "Period":60,"Stat":"p99"}}]'

# Enable 1-minute detailed monitoring on an instance
aws ec2 monitor-instances --instance-ids i-0abc123`,
            `// Embedded Metric Format from Node.js: one JSON log line becomes a metric
// (Lambda: just console.log; ECS/EC2: ship the log via the CloudWatch Agent)
function emitOrderMetric(latencyMs, failed) {
  const emf = {
    _aws: {
      Timestamp: Date.now(),
      CloudWatchMetrics: [{
        Namespace: "MyApp/Checkout",
        Dimensions: [["Service", "Env"]],
        Metrics: [
          { Name: "OrderLatencyMs", Unit: "Milliseconds" },
          { Name: "OrdersFailed", Unit: "Count" },
        ],
      }],
    },
    Service: "checkout",
    Env: "prod",
    OrderLatencyMs: latencyMs,
    OrdersFailed: failed ? 1 : 0,
    // High-cardinality detail stays in the log, NOT in a dimension
    orderId: "o-123",
    userId: "u-987",
  };
  console.log(JSON.stringify(emf));
}`,
          ],
          questions: [
            {
              question: "How do you monitor memory and disk usage on EC2 with CloudWatch?",
              solution: "<p>EC2 only reports hypervisor-visible metrics (CPU, network, disk I/O counts, status checks). Memory, disk space and process metrics live inside the OS, so you install the <strong>CloudWatch Agent</strong>, configure it (often via SSM Parameter Store) to collect <code>mem_used_percent</code> and <code>disk_used_percent</code>, and give the instance an IAM role with <code>CloudWatchAgentServerPolicy</code>. The agent can also ship application log files to CloudWatch Logs.</p>",
            },
            {
              question: "What are namespaces and dimensions, and why does dimension cardinality matter?",
              solution: "<p>A <strong>namespace</strong> is a container that isolates metrics from different sources (<code>AWS/EC2</code>, <code>MyApp/Checkout</code>). <strong>Dimensions</strong> are name-value pairs that identify a specific metric within the namespace, such as <code>InstanceId</code> or <code>Service</code>. Every unique combination of namespace, metric name and dimension values is stored and <strong>billed as a separate metric</strong>, and CloudWatch cannot aggregate across dimension values you did not publish. A dimension like <code>UserId</code> or <code>RequestId</code> therefore explodes into millions of metrics and a large bill; keep dimensions to low-cardinality attributes and put identifiers in logs.</p>",
            },
            {
              question: "What is the Embedded Metric Format and when would you use it instead of PutMetricData?",
              solution: "<p><strong>EMF</strong> is a JSON log format with an <code>_aws</code> block declaring the namespace, dimensions and metric names; when such a line lands in CloudWatch Logs, CloudWatch extracts the metrics automatically. It removes synchronous <code>PutMetricData</code> calls from the request path (important in Lambda where they add latency and cost), avoids API throttling, keeps the full log line for debugging and lets you attach high-cardinality properties without turning them into dimensions. Use PutMetricData for infrastructure scripts or when you are not already writing to CloudWatch Logs.</p>",
            },
            {
              question: "What is the difference between basic and detailed monitoring for EC2, and when does it matter?",
              solution: "<p><strong>Basic monitoring</strong> publishes EC2 metrics every <strong>5 minutes</strong> at no charge. <strong>Detailed monitoring</strong> publishes every <strong>1 minute</strong> and is billed per instance. It matters for <strong>Auto Scaling</strong>: a target-tracking or step policy can only react as fast as the data arrives, so with basic monitoring a CPU spike may take 10 to 15 minutes to trigger a scale-out. It also improves alarm responsiveness and troubleshooting granularity. Launch templates and Auto Scaling groups have a setting to enable it for every instance they create.</p>",
            },
            {
              question: "How long does CloudWatch keep metric data?",
              solution: "<p>Metric data is retained for <strong>15 months</strong> but is progressively aggregated: data points with a period under 60 seconds are kept for <strong>3 hours</strong>, 1-minute points for <strong>15 days</strong>, 5-minute points for <strong>63 days</strong>, and 1-hour points for <strong>455 days</strong>. You cannot delete metrics manually; they expire when no new data has arrived for the retention window. For longer history or cross-tool analysis, use <strong>Metric Streams</strong> to push metrics continuously to Kinesis Data Firehose and then to S3 or a third-party observability platform.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html",
            "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/publishingMetrics.html",
            "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Embedded_Metric_Format.html",
          ],
        },
        {
          topic: "CloudWatch Logs & Logs Insights",
          tags: ["aws", "cloudwatch", "logs", "logs insights", "retention"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>CloudWatch Logs</strong> is the central log store for AWS. Lambda writes to it automatically, ECS and EKS ship container output with the <code>awslogs</code> driver or Fluent Bit, EC2 uses the CloudWatch Agent, and services such as VPC Flow Logs, Route 53 Resolver, API Gateway and CloudTrail can deliver directly into it. Knowing how logs are organised, queried and priced is essential because <strong>log ingestion is frequently the largest CloudWatch cost</strong> in an account.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Structure</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Log group:</strong> a named collection with shared settings such as retention, KMS encryption and data protection policies, for example <code>/aws/lambda/checkout</code> or <code>/ecs/api</code>.</li>
  <li><strong>Log stream:</strong> a sequence of events from one source (one container, one Lambda execution environment, one EC2 instance).</li>
  <li><strong>Log event:</strong> a timestamp plus a message of up to 256 KB. Structured <strong>JSON</strong> messages are automatically parsed by Logs Insights and metric filters.</li>
  <li><strong>Retention:</strong> the default is <strong>never expire</strong>. Set retention (1 day to 10 years) on every group, ideally with an organisation-wide default enforced by automation.</li>
  <li><strong>Log classes:</strong> Standard for full features, and <strong>Infrequent Access</strong> for roughly half the ingestion price with a reduced feature set (no metric filters, subscriptions or Live Tail).</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Logs Insights</h4>
<p style="line-height: 1.75;">Logs Insights is a purpose-built query language that scans one or many log groups (across accounts with cross-account observability). Queries are pipelines of commands:</p>
<pre><code class="language-bash">fields @timestamp, @message, path, status, durationMs
| filter status >= 500 and path like /checkout/
| stats count() as errors, avg(durationMs) as avgMs, pct(durationMs, 99) as p99 by bin(5m)
| sort @timestamp desc
| limit 50</code></pre>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><code>parse</code> extracts fields from unstructured text with glob or regex patterns; JSON fields are discovered automatically.</li>
  <li><code>stats</code> aggregates with count, sum, avg, min, max, pct and bin for time buckets; <code>dedup</code>, <code>unnest</code> and <code>display</code> shape the output.</li>
  <li>Queries are charged by <strong>data scanned</strong>, so narrow the time range and log groups first. Results can be saved, added to dashboards, or scheduled.</li>
  <li><strong>Live Tail</strong> streams events in near real time for debugging, and <strong>log anomaly detection</strong> finds unusual patterns automatically.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Getting logs out</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Metric filters</strong> turn matching events into CloudWatch metrics you can alarm on (covered under security detection).</li>
  <li><strong>Subscription filters</strong> stream events in real time to Lambda, Kinesis Data Streams or Kinesis Data Firehose (and via those to OpenSearch, S3 or third-party tools). A log group supports two subscription filters.</li>
  <li><strong>Export to S3</strong> is a batch operation for archiving; it can take hours and is not for real-time use.</li>
  <li><strong>Data protection policies</strong> detect and mask sensitive data such as card numbers or emails as logs are ingested.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "CloudWatch Logs organises events into log groups and streams. I log structured JSON so Logs Insights can filter and aggregate fields without parsing, I set retention on every group because the default is forever, and I use the Infrequent Access class for verbose logs I rarely query. Metric filters give me alarms from logs, subscription filters stream them to Kinesis or Lambda for real-time processing, and I keep Logs Insights queries cheap by narrowing the time range before running them."</div>
</div>`,
          examples: [
            `# Create a log group with 30-day retention and KMS encryption
aws logs create-log-group --log-group-name /ecs/checkout --kms-key-id <kms-key-arn>
aws logs put-retention-policy --log-group-name /ecs/checkout --retention-in-days 30

# Logs Insights: top 5 slowest requests in the last hour
QUERY_ID=$(aws logs start-query --log-group-name /ecs/checkout \\
  --start-time $(date -v-1H +%s) --end-time $(date +%s) \\
  --query-string 'fields @timestamp, path, durationMs | filter durationMs > 500 | sort durationMs desc | limit 5' \\
  --query queryId --output text)
aws logs get-query-results --query-id $QUERY_ID

# Error rate per 5 minutes from structured JSON logs
aws logs start-query --log-group-names /ecs/checkout /ecs/payments \\
  --start-time $(date -v-6H +%s) --end-time $(date +%s) \\
  --query-string 'stats count(*) as total, sum(status >= 500) as errors, errors / total * 100 as errorPct by bin(5m)'

# Stream logs in real time to a Lambda function
aws logs put-subscription-filter --log-group-name /ecs/checkout \\
  --filter-name to-lambda --filter-pattern '{ $.level = "ERROR" }' \\
  --destination-arn arn:aws:lambda:us-east-1:123456789012:function:log-processor

# Find every log group without a retention policy (a common cost leak)
aws logs describe-log-groups --query 'logGroups[?!retentionInDays].logGroupName' --output text`,
          ],
          questions: [
            {
              question: "What is the relationship between log groups, log streams and log events?",
              solution: "<p>A <strong>log group</strong> is the top-level container that owns settings such as retention, encryption and access control, typically one per application or service. Inside it, each <strong>log stream</strong> is an ordered sequence of events from a single source, for example one Lambda execution environment or one ECS task, so streams are created and abandoned constantly. A <strong>log event</strong> is a single record with a timestamp and a message up to 256 KB. Queries, metric filters and subscriptions operate at the log group level, so you rarely address streams directly.</p>",
            },
            {
              question: "Why should you always set a retention policy on log groups?",
              solution: "<p>The default retention is <strong>never expire</strong>, so every byte ingested is stored, and billed, forever. Because Lambda and ECS create log groups automatically, accounts accumulate hundreds of groups silently growing for years. Setting retention (for example 30 days for application logs, 1 year for audit logs) caps storage cost and can be required for data protection rules. Enforce it with an AWS Config rule or an EventBridge rule on <code>CreateLogGroup</code> that invokes a Lambda to apply a default, and archive anything that must live longer to S3 with lifecycle policies where storage is far cheaper.</p>",
            },
            {
              question: "How would you find the slowest API endpoints from application logs using Logs Insights?",
              solution: "<p>Log requests as structured JSON with fields such as <code>path</code>, <code>status</code> and <code>durationMs</code>, then run a query such as <code>filter ispresent(durationMs) | stats avg(durationMs), pct(durationMs, 99) as p99, count() as requests by path | sort p99 desc | limit 10</code> over the relevant log group and time range. Logs Insights discovers JSON fields automatically; for plain text you would first use <code>parse</code> with a pattern. Narrow the time window and log group selection to reduce scanned data and cost, and save the query or pin it to a dashboard for reuse.</p>",
            },
            {
              question: "What are metric filters and subscription filters, and how do they differ?",
              solution: "<p>A <strong>metric filter</strong> matches events in a log group against a pattern (text terms or JSON field conditions) and increments a CloudWatch metric, optionally publishing a value extracted from the event. It is the way to alarm on log content, such as counting ERROR lines or root logins. A <strong>subscription filter</strong> also matches a pattern but instead <strong>streams the raw events in near real time</strong> to a destination: a Lambda function, a Kinesis Data Stream or a Kinesis Data Firehose delivery stream, including cross-account destinations. Metric filters produce numbers to alarm on; subscription filters move the log data itself for processing, archival or search in OpenSearch.</p>",
            },
            {
              question: "How can you reduce CloudWatch Logs costs without losing important data?",
              solution: "<p>Ingestion is the dominant charge, so start by <strong>logging less</strong>: drop debug-level output in production, sample repetitive access logs, and avoid logging whole payloads. Use the <strong>Infrequent Access log class</strong> for verbose logs you only query during incidents. Set <strong>retention</strong> on every group and export long-term archives to S3 via Firehose subscription or export tasks. Emit metrics with <strong>Embedded Metric Format</strong> rather than logging then parsing. Finally, narrow Logs Insights queries by time and group, since query cost is proportional to data scanned.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html",
            "https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html",
            "https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax.html",
          ],
        },
        {
          topic: "Alarms, Composite Alarms & Dashboards",
          tags: ["aws", "cloudwatch", "alarms", "dashboards", "sns", "on-call"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Metrics and logs are passive until something watches them. <strong>CloudWatch Alarms</strong> evaluate a metric or expression continuously and take actions when a threshold is breached; <strong>dashboards</strong> give humans a shared view of the same data. A good alarm strategy is the difference between a quiet on-call rotation and pager fatigue, so interviewers probe not just what an alarm is but how you keep it meaningful.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">How an alarm evaluates</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>An alarm watches one metric statistic, a <strong>metric math expression</strong> (error rate, per-instance average) or an <strong>anomaly detection band</strong>.</li>
  <li><strong>Period</strong> is the aggregation window; <strong>evaluation periods</strong> is how many recent periods are examined; <strong>datapoints to alarm</strong> is how many of them must breach. "3 of 5" suppresses single spikes while still catching sustained problems.</li>
  <li>States are <strong>OK</strong>, <strong>ALARM</strong> and <strong>INSUFFICIENT_DATA</strong>. Actions can fire on any state transition, so you can also notify when a service recovers.</li>
  <li><strong>Treat missing data</strong> as <code>missing</code> (default), <code>ignore</code>, <code>breaching</code> or <code>notBreaching</code>. For a sparse error metric, <code>notBreaching</code> stops alarms flapping into INSUFFICIENT_DATA; for a heartbeat metric, <code>breaching</code> turns silence into an alert.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Actions</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>SNS topics</strong> for email, SMS, chat webhooks and PagerDuty or OpsGenie integrations.</li>
  <li><strong>Auto Scaling</strong> policies for EC2, ECS and DynamoDB step scaling.</li>
  <li><strong>EC2 actions:</strong> stop, terminate, reboot or <strong>recover</strong> an instance when the <code>StatusCheckFailed_System</code> metric breaches.</li>
  <li><strong>Systems Manager</strong> OpsItems and Incident Manager, and direct <strong>Lambda</strong> invocation for custom remediation.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Composite alarms</h4>
<p style="line-height: 1.75;">A composite alarm combines other alarms with a boolean expression such as <code>ALARM(api-5xx) AND (ALARM(api-latency) OR ALARM(db-cpu))</code>. Use it to <strong>page once per service outage</strong> rather than once per symptom, to require two independent signals before waking someone, or as a <strong>suppressor</strong>: while a maintenance-window alarm is in ALARM, dependent alarm actions are suppressed. Child alarms keep no actions; only the composite notifies.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Dashboards</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Dashboards hold line, number, gauge, alarm status, log table and text widgets, defined as a JSON body that belongs in version control.</li>
  <li>They can show metrics from <strong>multiple regions and accounts</strong> (with cross-account observability) and can be <strong>shared publicly or via SSO</strong> for stakeholders without console access.</li>
  <li><strong>Automatic dashboards</strong> exist per service, and <strong>Application Signals</strong> and <strong>ServiceLens</strong> layer SLOs and traces on top.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Designing good alarms</h4>
<p style="line-height: 1.75;">Alarm on <strong>symptoms customers feel</strong> (error rate, p99 latency, queue age) before causes (CPU). Use percentiles rather than averages, ratios rather than raw counts where traffic varies, and anomaly detection for metrics with daily cycles. Every paging alarm should have a runbook link in its description, and every alarm should have an OK action so incidents auto-resolve.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "An alarm evaluates a metric or math expression over N of M periods and moves between OK, ALARM and INSUFFICIENT_DATA, firing SNS, Auto Scaling, EC2 or Lambda actions. I configure treat-missing-data deliberately, use M-of-N evaluation to stop flapping, alarm on customer-facing symptoms such as error rate and p99 latency, and group symptom alarms into a composite alarm so on-call gets one page per outage. Dashboards are defined as JSON in source control alongside the alarms."</div>
</div>`,
          examples: [
            `# Error-rate alarm using metric math (errors / requests) with 2-of-3 evaluation
aws cloudwatch put-metric-alarm --alarm-name checkout-error-rate-high \\
  --alarm-description "Runbook: https://wiki.example.com/runbooks/checkout-errors" \\
  --evaluation-periods 3 --datapoints-to-alarm 2 --threshold 2 \\
  --comparison-operator GreaterThanThreshold --treat-missing-data notBreaching \\
  --metrics '[
    {"Id":"errors","ReturnData":false,"MetricStat":{"Metric":{"Namespace":"AWS/ApplicationELB","MetricName":"HTTPCode_Target_5XX_Count",
      "Dimensions":[{"Name":"LoadBalancer","Value":"app/app-alb/abc123"}]},"Period":60,"Stat":"Sum"}},
    {"Id":"requests","ReturnData":false,"MetricStat":{"Metric":{"Namespace":"AWS/ApplicationELB","MetricName":"RequestCount",
      "Dimensions":[{"Name":"LoadBalancer","Value":"app/app-alb/abc123"}]},"Period":60,"Stat":"Sum"}},
    {"Id":"rate","Expression":"IF(requests > 0, errors / requests * 100, 0)","Label":"5xx %"}
  ]' \\
  --alarm-actions arn:aws:sns:us-east-1:123456789012:oncall \\
  --ok-actions arn:aws:sns:us-east-1:123456789012:oncall

# EC2 auto-recovery when the underlying host fails
aws cloudwatch put-metric-alarm --alarm-name i-0abc-recover \\
  --namespace AWS/EC2 --metric-name StatusCheckFailed_System \\
  --dimensions Name=InstanceId,Value=i-0abc123 --statistic Maximum \\
  --period 60 --evaluation-periods 2 --threshold 1 --comparison-operator GreaterThanOrEqualToThreshold \\
  --alarm-actions arn:aws:automate:us-east-1:ec2:recover

# Composite alarm: page only when errors AND (latency OR db) are all bad
aws cloudwatch put-composite-alarm --alarm-name checkout-outage \\
  --alarm-rule "ALARM(checkout-error-rate-high) AND (ALARM(checkout-p99-latency) OR ALARM(orders-db-cpu))" \\
  --alarm-actions arn:aws:sns:us-east-1:123456789012:pagerduty \\
  --actions-suppressor checkout-maintenance-window \\
  --actions-suppressor-wait-period 60 --actions-suppressor-extension-period 60`,
            `# Dashboard as code: a JSON body kept in git and pushed on deploy
aws cloudwatch put-dashboard --dashboard-name checkout-prod --dashboard-body '{
  "widgets": [
    {"type":"metric","x":0,"y":0,"width":12,"height":6,"properties":{
      "title":"Requests & 5xx","region":"us-east-1","stat":"Sum","period":60,
      "metrics":[
        ["AWS/ApplicationELB","RequestCount","LoadBalancer","app/app-alb/abc123"],
        [".","HTTPCode_Target_5XX_Count",".",".",{"yAxis":"right","color":"#d62728"}]
      ]}},
    {"type":"metric","x":12,"y":0,"width":12,"height":6,"properties":{
      "title":"p99 latency","region":"us-east-1","stat":"p99","period":60,
      "metrics":[["AWS/ApplicationELB","TargetResponseTime","LoadBalancer","app/app-alb/abc123"]],
      "annotations":{"horizontal":[{"label":"SLO 800ms","value":0.8}]}}},
    {"type":"alarm","x":0,"y":6,"width":24,"height":3,"properties":{
      "title":"Service alarms",
      "alarms":["arn:aws:cloudwatch:us-east-1:123456789012:alarm:checkout-outage"]}}
  ]
}'`,
          ],
          questions: [
            {
              question: "Explain alarm states and how you avoid flapping and noisy alerts.",
              solution: "<p>An alarm is in <strong>OK</strong>, <strong>ALARM</strong> or <strong>INSUFFICIENT_DATA</strong>. It transitions based on N out of M evaluation periods (<code>datapoints-to-alarm</code>), which suppresses single spikes. Configure <code>treat-missing-data</code> deliberately (for example notBreaching for sparse error metrics), use percentiles or metric math for meaningful signals, and combine related alarms into a <strong>composite alarm</strong> so on-call gets one page for a service outage instead of ten.</p>",
            },
            {
              question: "What does the treat-missing-data setting do and how would you choose a value?",
              solution: "<p>It tells the alarm how to interpret evaluation periods with <strong>no data points</strong>. <code>missing</code> (default) lets the alarm drift to INSUFFICIENT_DATA; <code>ignore</code> keeps the current state; <code>breaching</code> counts missing as over threshold; <code>notBreaching</code> counts it as healthy. Choose <strong>notBreaching</strong> for sparse metrics like error counts where no data means no errors, so the alarm does not flap. Choose <strong>breaching</strong> for heartbeat or throughput metrics where silence itself is the failure, such as a cron job that should publish a metric every 5 minutes.</p>",
            },
            {
              question: "When would you use a composite alarm, and what is an actions suppressor?",
              solution: "<p>Use a <strong>composite alarm</strong> when several individual alarms describe one incident: combining <code>ALARM(5xx) AND ALARM(latency)</code> means a single page per outage instead of one per symptom, and requiring two signals reduces false positives. Child alarms keep no notification actions; the composite carries them. An <strong>actions suppressor</strong> is another alarm referenced by the composite: while the suppressor is in ALARM (for example a maintenance-window alarm or a deployment-in-progress metric), the composite's actions are held back, with configurable wait and extension periods, so planned work does not page on-call.</p>",
            },
            {
              question: "Why is alarming on an error percentage often better than alarming on an error count?",
              solution: "<p>A raw count such as 50 errors per minute means something very different at 100 requests per minute (50 percent failure) than at 100,000 (0.05 percent). A fixed count threshold fires during normal peak traffic and stays silent during a quiet-hours outage. Using <strong>metric math</strong> to compute <code>errors / requests * 100</code> gives a signal proportional to customer impact that stays valid as traffic grows. Guard the expression against division by zero with <code>IF(requests > 0, ...)</code>, and pair it with a minimum request volume or a p99 latency alarm so tiny samples do not trigger it.</p>",
            },
            {
              question: "How can a CloudWatch alarm automatically recover a failed EC2 instance?",
              solution: "<p>EC2 publishes <code>StatusCheckFailed_System</code> when the underlying host has a problem (hardware, network or power loss on the physical server). An alarm on that metric can use the <strong>EC2 recover action</strong> (<code>arn:aws:automate:region:ec2:recover</code>), which migrates the instance to healthy hardware while keeping its instance ID, private and Elastic IPs and EBS volumes; it is like a stop and start without operator involvement. It works for EBS-backed instances on supported types and does not help with <code>StatusCheckFailed_Instance</code> failures caused by the OS or application, for which a reboot action or Auto Scaling replacement is used instead.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html",
            "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Create_Composite_Alarm.html",
            "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Dashboards.html",
          ],
        },
      ],
    },
    {
      id: 2,
      label: "Advance",
      concepts: [
        {
          topic: "CloudTrail Management vs Data Events",
          tags: ["aws", "cloudtrail", "audit", "governance", "security", "compliance"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>CloudWatch</strong> and <strong>CloudTrail</strong> are frequently confused, so interviewers love asking about them together. CloudWatch is about <strong>how your systems are performing</strong> (metrics, logs, alarms). CloudTrail is about <strong>who did what in your AWS account</strong>: an audit log of every API call made through the console, CLI, SDKs and other AWS services. You need both: CloudWatch tells you the database CPU spiked, CloudTrail tells you which IAM user resized the instance five minutes earlier.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What an event contains</h4>
<p style="line-height: 1.75;">Each record is JSON with <code>eventTime</code>, <code>eventSource</code> (<code>ec2.amazonaws.com</code>), <code>eventName</code> (<code>RunInstances</code>), <code>userIdentity</code> (type, ARN, session context including the role that was assumed), <code>sourceIPAddress</code>, <code>userAgent</code>, <code>requestParameters</code>, <code>responseElements</code> and any <code>errorCode</code> such as <code>AccessDenied</code>. Events for a region are delivered within about 5 to 15 minutes, so CloudTrail is near real time, not real time.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Management events</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Control-plane</strong> operations on resources: creating, modifying and deleting things, plus read-only describe and list calls, and sign-in events such as <code>ConsoleLogin</code> and <code>AssumeRole</code>.</li>
  <li>Recorded <strong>by default</strong> for the last <strong>90 days</strong> in <strong>Event history</strong>, free, searchable by attribute in the console or with <code>lookup-events</code>.</li>
  <li>A <strong>trail</strong> delivers them beyond 90 days to an S3 bucket, and optionally to CloudWatch Logs. The first copy of management events in a trail is free.</li>
  <li>Can be split into <strong>read</strong> and <strong>write</strong> events; many teams log write events everywhere and read events only where compliance demands.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Data events</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Data-plane</strong> operations on or within a resource: S3 <code>GetObject</code>, <code>PutObject</code>, <code>DeleteObject</code>; Lambda <code>Invoke</code>; DynamoDB item-level reads and writes; SNS publish; SQS, EBS direct APIs and many more.</li>
  <li><strong>Off by default</strong> because volume and cost are high (billed per 100,000 events). Enable them selectively with <strong>advanced event selectors</strong>, for example only <code>PutObject</code> and <code>DeleteObject</code> on buckets holding customer data.</li>
  <li>Essential for forensic questions like "which principal downloaded this object" that management events cannot answer.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Insights events</h4>
<p style="line-height: 1.75;"><strong>CloudTrail Insights</strong> is an optional add-on that baselines normal API call rates and error rates and emits an Insights event when they spike, for example a sudden burst of <code>DeleteBucket</code> calls or a flood of <code>AccessDenied</code> errors from a compromised key.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Trail best practices</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Create one <strong>organisation trail</strong> from the management or delegated administrator account so every member account is covered automatically, including new ones.</li>
  <li>Make it <strong>multi-region</strong> and include global service events (IAM, STS, CloudFront).</li>
  <li>Deliver to a bucket in a dedicated <strong>log archive account</strong> with Object Lock, SSE-KMS and a bucket policy that only CloudTrail can write to.</li>
  <li>Turn on <strong>log file validation</strong>, which delivers hourly signed digest files so you can prove logs were not altered.</li>
  <li>Query with <strong>Athena</strong> over S3, or use <strong>CloudTrail Lake</strong>: an immutable, SQL-queryable event data store with up to ten years of retention that removes the need to manage S3 partitions yourself.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "CloudTrail records API calls: management events are control-plane actions like RunInstances or PutBucketPolicy and are on by default for 90 days, while data events are high-volume data-plane actions like S3 GetObject or Lambda Invoke that I enable selectively. I run a multi-region organisation trail delivering to a locked-down log archive account with file validation, and I query it with Athena or CloudTrail Lake when I need to know who changed something."</div>
</div>`,
          examples: [
            `# Find who deleted a security group in the last 7 days (Event history, no trail needed)
aws cloudtrail lookup-events \\
  --lookup-attributes AttributeKey=EventName,AttributeValue=DeleteSecurityGroup \\
  --start-time $(date -v-7d +%Y-%m-%dT%H:%M:%SZ) \\
  --query 'Events[].{time:EventTime,user:Username,source:CloudTrailEvent}' --output json

# Multi-region organisation trail with log file validation
aws cloudtrail create-trail --name org-trail --s3-bucket-name org-cloudtrail-logs \\
  --is-multi-region-trail --is-organization-trail --include-global-service-events \\
  --enable-log-file-validation --kms-key-id <kms-key-arn> \\
  --cloud-watch-logs-log-group-arn <log-group-arn> --cloud-watch-logs-role-arn <role-arn>
aws cloudtrail start-logging --name org-trail

# Data events only for writes to buckets holding customer data (advanced event selectors)
aws cloudtrail put-event-selectors --trail-name org-trail --advanced-event-selectors '[
  {"Name":"Management write events","FieldSelectors":[
     {"Field":"eventCategory","Equals":["Management"]},
     {"Field":"readOnly","Equals":["false"]}]},
  {"Name":"Customer bucket writes","FieldSelectors":[
     {"Field":"eventCategory","Equals":["Data"]},
     {"Field":"resources.type","Equals":["AWS::S3::Object"]},
     {"Field":"eventName","Equals":["PutObject","DeleteObject"]},
     {"Field":"resources.ARN","StartsWith":["arn:aws:s3:::customer-data/"]}]}
]'

# Verify that delivered log files have not been tampered with
aws cloudtrail validate-logs --trail-arn <trail-arn> \\
  --start-time $(date -u -v-1d +%Y-%m-%dT%H:%M:%SZ)`,
            `-- Athena over CloudTrail logs in S3: every principal that read from a bucket last month
SELECT useridentity.arn, sourceipaddress, eventname, count(*) AS calls
FROM cloudtrail_logs
WHERE eventsource = 's3.amazonaws.com'
  AND eventname IN ('GetObject', 'ListObjects')
  AND json_extract_scalar(requestparameters, '$.bucketName') = 'customer-data'
  AND eventtime BETWEEN '2026-08-01T00:00:00Z' AND '2026-08-31T23:59:59Z'
GROUP BY 1, 2, 3
ORDER BY calls DESC;`,
          ],
          questions: [
            {
              question: "What is the difference between CloudWatch and CloudTrail?",
              solution: "<p><strong>CloudWatch</strong> is a monitoring service for <strong>performance and operational data</strong>: metrics such as CPU or latency, application and system logs, alarms, dashboards. <strong>CloudTrail</strong> is an <strong>audit and governance</strong> service that records API calls made in the account: the identity, time, source IP, parameters and result of actions such as launching an instance or changing a bucket policy. CloudWatch answers is it healthy; CloudTrail answers who changed it.</p>",
            },
            {
              question: "What are CloudTrail management events versus data events?",
              solution: "<p><strong>Management events</strong> are control-plane operations on resources: creating, modifying, deleting, and read-only describe calls. They are logged by default for the last 90 days and by any trail. <strong>Data events</strong> are high-volume data-plane operations on the resources themselves: S3 <code>GetObject</code>/<code>PutObject</code>, Lambda <code>Invoke</code>, DynamoDB item reads and writes. They are opt-in per resource because of volume and cost, and are essential for forensic investigation of data access.</p>",
            },
            {
              question: "Why create a trail if Event history already shows 90 days of activity?",
              solution: "<p>Event history covers only <strong>management events</strong>, only <strong>90 days</strong>, only the current account and region, and can only be searched by a few attributes. A <strong>trail</strong> delivers events durably to S3 for as long as your compliance regime requires (often 1 to 7 years), can include <strong>data events</strong> and Insights events, can span all regions and, as an <strong>organisation trail</strong>, every account. It also enables integration: delivery to CloudWatch Logs for metric filters and alarms, Athena queries, and <strong>log file validation</strong> digests to prove integrity to auditors.</p>",
            },
            {
              question: "How would you find out which IAM principal downloaded a specific object from S3 last week?",
              solution: "<p>You need <strong>S3 data events</strong> enabled on that bucket in a trail before the download happened; management events do not record <code>GetObject</code>. Then query the trail logs: with <strong>Athena</strong> over the S3 log location filter on <code>eventsource = s3.amazonaws.com</code>, <code>eventname = GetObject</code> and the object key in <code>requestparameters</code>, returning <code>useridentity.arn</code>, <code>sourceipaddress</code> and <code>eventtime</code>. If you use <strong>CloudTrail Lake</strong>, run the same query directly against the event data store. If data events were not enabled, the information does not exist, which is why sensitive buckets should have them turned on in advance; S3 server access logs are a weaker fallback.</p>",
            },
            {
              question: "How do you protect CloudTrail logs from being tampered with or deleted by an attacker with account access?",
              solution: "<p>Deliver logs to a bucket in a <strong>separate log archive account</strong> that workload administrators cannot access, with a bucket policy permitting only the CloudTrail service principal to write, <strong>S3 Object Lock</strong> in compliance mode, versioning and SSE-KMS with a key in that account. Enable <strong>log file validation</strong> so hourly digest files signed by CloudTrail let you prove integrity. Apply a <strong>service control policy</strong> denying <code>cloudtrail:StopLogging</code>, <code>DeleteTrail</code> and <code>UpdateTrail</code> in member accounts, and alarm on those API calls so an attempt is itself detected.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html",
            "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-management-and-data-events-with-cloudtrail.html",
            "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-log-file-validation-intro.html",
          ],
        },
        {
          topic: "Security Detection with Metric Filters",
          tags: ["aws", "cloudwatch", "cloudtrail", "security", "eventbridge", "detection"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Collecting audit logs is only useful if someone, or something, is watching them. The classic AWS detection pipeline is <strong>CloudTrail to CloudWatch Logs to metric filters to alarms</strong>, complemented by <strong>EventBridge rules</strong> for real-time automated response. It is inexpensive, entirely serverless, and forms the backbone of the CIS AWS Foundations Benchmark monitoring controls, so it comes up in almost every cloud security interview.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The pipeline</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Trail to CloudWatch Logs:</strong> the trail is configured with a log group and an IAM role; every event arrives as a JSON log event within minutes.</li>
  <li><strong>Metric filter:</strong> a JSON filter pattern such as <code>{ $.userIdentity.type = "Root" && $.eventName = "ConsoleLogin" }</code> increments a metric in a <code>Security</code> namespace each time it matches.</li>
  <li><strong>Alarm:</strong> threshold of 1 over one period, <code>treat-missing-data notBreaching</code>, action to an SNS topic that pages the security team.</li>
  <li><strong>Runbook:</strong> the alarm description links to what to do, and the log event itself is retrievable with Logs Insights for context.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Detections worth having</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Root account usage and console logins without MFA.</li>
  <li>Unauthorised API calls: <code>errorCode = AccessDenied</code> or <code>UnauthorizedOperation</code> spikes.</li>
  <li>CloudTrail changes: <code>StopLogging</code>, <code>DeleteTrail</code>, <code>UpdateTrail</code>, <code>PutEventSelectors</code>.</li>
  <li>IAM policy changes, new access keys, <code>AttachUserPolicy</code> with admin rights.</li>
  <li>Network changes: security group, NACL, route table, VPC and internet gateway modifications.</li>
  <li>S3 bucket policy or ACL changes, KMS key disabling or scheduled deletion, AWS Config changes.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Real-time response with EventBridge</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>CloudTrail <strong>management write events</strong> are delivered to the EventBridge default bus as <code>AWS API Call via CloudTrail</code> in every account, even without a trail. Read-only calls such as Describe and List are not delivered.</li>
  <li>A rule matching <code>eventName: [StopLogging, DeleteTrail]</code> can invoke a <strong>Lambda</strong> that calls <code>StartLogging</code> again, revokes the offending session, or opens a ticket, all within seconds.</li>
  <li>Rules on <code>AuthorizeSecurityGroupIngress</code> can automatically strip <code>0.0.0.0/0</code> on port 22, and rules on <code>CreateAccessKey</code> can notify the key owner.</li>
  <li><strong>GuardDuty</strong>, <strong>Security Hub</strong> and <strong>IAM Access Analyzer</strong> publish findings to EventBridge too, so the same rule-and-Lambda pattern handles managed detections.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Prevention beats detection</h4>
<p style="line-height: 1.75;">Use <strong>service control policies</strong> to deny disabling CloudTrail, GuardDuty and Config outside the security account, require MFA for sensitive actions, and keep the log archive in a separate account. Detection then becomes a second line that catches misconfiguration and insider activity rather than the only line.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Tuning</h4>
<p style="line-height: 1.75;">Exclude expected automation roles from noisy filters (for example the deployment pipeline changing security groups), route low-severity detections to a chat channel and reserve paging for root usage and logging tampering, and review detections quarterly against the CIS benchmark and your own incident history.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "I send CloudTrail to CloudWatch Logs and create metric filters for the CIS benchmark detections: root login, unauthorised calls, CloudTrail or IAM or security group changes, each with an alarm to a security SNS topic. For anything that needs an immediate response, such as someone stopping CloudTrail, an EventBridge rule on the API call triggers a Lambda that re-enables logging and alerts. And I prevent the worst cases with SCPs so detection is my second line of defence."</div>
</div>`,
          examples: [
            `# Metric filter + alarm: root account console login
aws logs put-metric-filter --log-group-name CloudTrail/org-trail \\
  --filter-name RootLogin \\
  --filter-pattern '{ $.userIdentity.type = "Root" && $.eventName = "ConsoleLogin" }' \\
  --metric-transformations metricName=RootLoginCount,metricNamespace=Security,metricValue=1,defaultValue=0

aws cloudwatch put-metric-alarm --alarm-name security-root-login \\
  --namespace Security --metric-name RootLoginCount --statistic Sum \\
  --period 300 --evaluation-periods 1 --threshold 1 \\
  --comparison-operator GreaterThanOrEqualToThreshold --treat-missing-data notBreaching \\
  --alarm-actions arn:aws:sns:us-east-1:123456789012:security-alerts

# Metric filter: CloudTrail tampering
aws logs put-metric-filter --log-group-name CloudTrail/org-trail \\
  --filter-name CloudTrailChanges \\
  --filter-pattern '{ ($.eventName = StopLogging) || ($.eventName = DeleteTrail) || ($.eventName = UpdateTrail) || ($.eventName = PutEventSelectors) }' \\
  --metric-transformations metricName=CloudTrailChangeCount,metricNamespace=Security,metricValue=1

# Metric filter: unauthorised API calls (exclude a known noisy scanner role)
aws logs put-metric-filter --log-group-name CloudTrail/org-trail \\
  --filter-name UnauthorizedCalls \\
  --filter-pattern '{ (($.errorCode = "*UnauthorizedOperation") || ($.errorCode = "AccessDenied*")) && ($.userIdentity.sessionContext.sessionIssuer.userName != "SecurityScannerRole") }' \\
  --metric-transformations metricName=UnauthorizedCallCount,metricNamespace=Security,metricValue=1

# EventBridge rule: react within seconds when someone stops CloudTrail
aws events put-rule --name cloudtrail-tampering --event-pattern '{
  "source": ["aws.cloudtrail"],
  "detail-type": ["AWS API Call via CloudTrail"],
  "detail": { "eventSource": ["cloudtrail.amazonaws.com"],
              "eventName": ["StopLogging", "DeleteTrail", "UpdateTrail"] }
}'
aws events put-targets --rule cloudtrail-tampering --targets \\
  Id=remediate,Arn=arn:aws:lambda:us-east-1:123456789012:function:reenable-cloudtrail`,
            `// Lambda remediation target: re-enable logging and notify
const { CloudTrailClient, StartLoggingCommand } = require("@aws-sdk/client-cloudtrail");
const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");

const cloudtrail = new CloudTrailClient({});
const sns = new SNSClient({});

exports.handler = async (event) => {
  const d = event.detail;
  const trailName = d.requestParameters && d.requestParameters.name;
  const actor = d.userIdentity && d.userIdentity.arn;

  if (d.eventName === "StopLogging" && trailName) {
    await cloudtrail.send(new StartLoggingCommand({ Name: trailName }));
  }

  await sns.send(new PublishCommand({
    TopicArn: process.env.SECURITY_TOPIC_ARN,
    Subject: "CloudTrail tampering detected: " + d.eventName,
    Message: JSON.stringify({ actor, trailName, sourceIp: d.sourceIPAddress, time: d.eventTime }, null, 2),
  }));
};`,
          ],
          questions: [
            {
              question: "How would you detect and respond to someone disabling CloudTrail or logging in as root?",
              solution: "<p>Deliver CloudTrail to CloudWatch Logs and create <strong>metric filters</strong> for <code>StopLogging</code>, <code>DeleteTrail</code>, <code>UpdateTrail</code> and root <code>ConsoleLogin</code>, each with an alarm to an SNS security topic. For automated response, create an <strong>EventBridge rule</strong> on those CloudTrail events that triggers a Lambda to re-enable logging and open a ticket. Prevent it in the first place with an SCP denying those actions outside the security account, and store trails in a separate, locked-down log archive account.</p>",
            },
            {
              question: "Why use both a metric filter alarm and an EventBridge rule for the same security event?",
              solution: "<p>They serve different purposes. <strong>EventBridge</strong> receives CloudTrail management write events within seconds, is ideal for <strong>automated remediation</strong> and needs no trail, but it only sees write events and each rule is a point-in-time trigger with no history. The <strong>metric filter and alarm</strong> path depends on a trail delivering to CloudWatch Logs (minutes of delay) but produces a <strong>metric with history</strong> you can graph, threshold over time (five unauthorised calls in 5 minutes), include in dashboards and composite alarms, and it covers read-only events too. Using both gives fast response plus durable, auditable detection.</p>",
            },
            {
              question: "What kinds of detections does the CIS AWS Foundations Benchmark expect, and how do you implement them?",
              solution: "<p>The benchmark's monitoring section lists metric filter and alarm pairs for: unauthorised API calls, console sign-in without MFA, root account usage, IAM policy changes, CloudTrail configuration changes, console authentication failures, disabling or scheduled deletion of KMS keys, S3 bucket policy changes, AWS Config changes, security group changes, NACL changes, network gateway changes, route table changes and VPC changes. Each is a CloudWatch Logs <strong>JSON filter pattern</strong> on the CloudTrail log group with a metric in a security namespace and an alarm notifying an SNS topic that has at least one subscriber. Security Hub can evaluate whether these exist, and they are usually deployed with CloudFormation or Terraform so every account gets the same set.</p>",
            },
            {
              question: "A metric filter for AccessDenied errors is firing constantly. How do you tune it without losing signal?",
              solution: "<p>First identify the source with Logs Insights, grouping <code>AccessDenied</code> events by <code>userIdentity.arn</code> and <code>eventName</code>; usually one scanner, CI role or misconfigured application accounts for most of the noise. Then either <strong>fix the underlying permission</strong> or <strong>exclude that principal in the filter pattern</strong> with a condition on the session issuer name, keeping the exclusion list short and reviewed. Raise the alarm to a rate that represents a real attack (for example 20 in 5 minutes) rather than 1, route it to a chat channel instead of paging, and add a separate low-threshold filter for <strong>high-privilege principals</strong> where any denial is suspicious.</p>",
            },
            {
              question: "Which CloudTrail events reach EventBridge and which do not?",
              solution: "<p>EventBridge receives <strong>management events that are write operations</strong> (create, modify, delete, plus sign-in events like <code>ConsoleLogin</code>) as <code>AWS API Call via CloudTrail</code> on the default bus, without needing a trail. It does <strong>not</strong> receive read-only management calls such as <code>Describe*</code>, <code>List*</code> and <code>Get*</code>, and it does not receive most data events; S3 object-level events are the exception, delivered through S3's own EventBridge integration when enabled on the bucket. For detections on read activity or bulk data access you therefore rely on the trail delivered to CloudWatch Logs or S3, or on GuardDuty which analyses CloudTrail data events itself.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudwatch-alarms-for-cloudtrail.html",
            "https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/FilterAndPatternSyntax.html",
            "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-service-event.html",
          ],
        },
        {
          topic: "Subscriptions, Metric Streams & Cost Control",
          tags: ["aws", "cloudwatch", "kinesis", "cost", "observability", "cross-account"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Once an organisation runs dozens of accounts, two problems appear: telemetry is trapped in each account, and the <strong>CloudWatch bill</strong> starts to rival the compute bill. Senior engineers are expected to know how to move metrics and logs out of CloudWatch in real time, how to centralise observability across accounts, and which levers control cost. These topics separate people who have operated AWS at scale from people who have only used it in a sandbox.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Log subscription filters at scale</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Lambda destination:</strong> simplest; receives gzipped batches of events. Good for small volumes and enrichment, but concurrency and cost scale with log volume.</li>
  <li><strong>Kinesis Data Firehose:</strong> buffers and delivers to S3 (with Parquet conversion for Athena), OpenSearch, Datadog, Splunk or an HTTP endpoint. The standard path for archiving and third-party SIEMs.</li>
  <li><strong>Kinesis Data Streams:</strong> for custom real-time consumers that need ordering, replay and fan-out.</li>
  <li><strong>Cross-account destinations:</strong> a <code>logs:Destination</code> resource in the central account wraps a Kinesis stream and has a resource policy allowing member accounts to subscribe; an <strong>account-level subscription filter</strong> can then cover every log group in an account with one rule.</li>
  <li>Filter patterns on the subscription keep noise out; sending only <code>ERROR</code> and above to a SIEM can cut egress volume dramatically.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Metric Streams</h4>
<p style="line-height: 1.75;"><strong>CloudWatch Metric Streams</strong> push metrics continuously (about 2 to 3 minutes latency) to Kinesis Data Firehose in JSON or OpenTelemetry format, either all namespaces or an include list. This replaces polling the <code>GetMetricData</code> API from third-party tools, which is slow, rate limited and billed per request, and it is how Datadog, Grafana Cloud and New Relic ingest AWS metrics at scale.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Cross-account observability</h4>
<p style="line-height: 1.75;">Rather than copying data, <strong>CloudWatch cross-account observability</strong> links <strong>source accounts</strong> to a <strong>monitoring account</strong> using OAM (Observability Access Manager) sinks and links. The monitoring account can then search logs, graph metrics, view alarms and traces across all linked accounts in one console, and Logs Insights queries can span accounts. It is usually deployed organisation-wide with CloudFormation StackSets.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Where the money goes</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Logs ingestion</strong> is the usual number one, priced per GB ingested, with storage a distant second. Retention only fixes storage.</li>
  <li><strong>Custom metrics</strong> per metric per month; high-cardinality dimensions are the classic runaway cost.</li>
  <li><strong>API requests</strong>: <code>GetMetricData</code> and <code>PutMetricData</code> from dashboards, agents and third-party pollers.</li>
  <li><strong>Alarms</strong> (standard and high-resolution), <strong>dashboards</strong> beyond the free tier, <strong>Logs Insights</strong> per GB scanned, <strong>Synthetics</strong> canary runs and <strong>Contributor Insights</strong> rules.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Cost levers</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Log at the right level, sample high-volume access logs, and structure as compact JSON.</li>
  <li>Use the <strong>Infrequent Access</strong> log class for debug and verbose logs; send VPC Flow Logs straight to S3 instead of CloudWatch Logs.</li>
  <li>Aggregate metrics in the CloudWatch Agent (<code>metrics_collection_interval</code>, aggregation dimensions) and use EMF instead of per-request PutMetricData.</li>
  <li>Tag resources and use <strong>Cost Explorer</strong> filtered by the CloudWatch usage types (DataProcessing-Bytes, MetricMonitorUsage) to see which teams drive spend.</li>
  <li>Set <strong>Budgets</strong> alerts on CloudWatch spend so a new noisy service is noticed within a day, not at month end.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "For multi-account observability I link every account to a monitoring account with cross-account observability, and I move data out with subscription filters to Firehose and Metric Streams rather than polling APIs. On cost, log ingestion is usually the biggest line, so I attack volume first: right log levels, sampling, Infrequent Access class, Flow Logs to S3, EMF instead of per-request PutMetricData, low-cardinality dimensions, and a budget alert on CloudWatch spend."</div>
</div>`,
          examples: [
            `# Stream all AWS/Lambda and AWS/ApplicationELB metrics to Firehose (then S3 / a SaaS tool)
aws cloudwatch put-metric-stream --name to-observability-platform \\
  --firehose-arn arn:aws:firehose:us-east-1:123456789012:deliverystream/metrics-out \\
  --role-arn arn:aws:iam::123456789012:role/cw-metric-stream \\
  --output-format opentelemetry1.0 \\
  --include-filters Namespace=AWS/Lambda Namespace=AWS/ApplicationELB

# Account-level subscription: ship ERROR+ from every log group to a Firehose delivery stream
aws logs put-account-policy --policy-name errors-to-firehose --policy-type SUBSCRIPTION_FILTER_POLICY \\
  --policy-document '{
    "DestinationArn": "arn:aws:firehose:us-east-1:123456789012:deliverystream/logs-out",
    "RoleArn": "arn:aws:iam::123456789012:role/cwl-to-firehose",
    "FilterPattern": "{ $.level = \\"ERROR\\" || $.level = \\"FATAL\\" }"
  }' --selection-criteria 'LogGroupName NOT IN ["/aws/lambda/noisy-dev"]'

# Cheaper log class for verbose logs (set at creation, cannot be changed later)
aws logs create-log-group --log-group-name /ecs/checkout/debug --log-group-class INFREQUENT_ACCESS

# Cross-account observability: sink in the monitoring account, link from a source account
aws oam create-sink --name org-monitoring-sink              # run in monitoring account
aws oam create-link --label-template '$AccountName' \\
  --resource-types AWS::CloudWatch::Metric AWS::Logs::LogGroup AWS::XRay::Trace \\
  --sink-identifier <sink-arn>                                # run in each source account

# Which log groups ingested the most data this month?
aws cloudwatch get-metric-data --start-time $(date -u -v-30d +%Y-%m-%dT%H:%M:%SZ) \\
  --end-time $(date -u +%Y-%m-%dT%H:%M:%SZ) --metric-data-queries '[
  {"Id":"top","Expression":"SORT(SEARCH(\\x27{AWS/Logs,LogGroupName} MetricName=\\"IncomingBytes\\"\\x27, \\x27Sum\\x27, 86400), SUM, DESC, 10)"}]'`,
          ],
          questions: [
            {
              question: "How would you centralise logs from 50 AWS accounts into one place for a SIEM?",
              solution: "<p>Create a <strong>CloudWatch Logs destination</strong> in a central logging account that points at a Kinesis Data Stream or Firehose delivery stream, with a destination policy allowing the organisation's accounts to subscribe. In each source account deploy an <strong>account-level subscription filter policy</strong> (via StackSets) targeting that destination, optionally with a filter pattern to forward only relevant levels. Firehose then buffers and writes to S3 in Parquet for Athena, or directly to the SIEM such as Splunk or OpenSearch. For console-based investigation without moving data, add <strong>cross-account observability</strong> so the security account can run Logs Insights across all accounts.</p>",
            },
            {
              question: "What are Metric Streams and why are they preferred over polling the CloudWatch API?",
              solution: "<p><strong>Metric Streams</strong> continuously push metric data (all namespaces or a filtered list) to Kinesis Data Firehose in JSON or OpenTelemetry format with a latency of a few minutes. Polling with <code>GetMetricData</code> or <code>ListMetrics</code> from an external tool is slower to notice new metrics, subject to API rate limits, billed per request (often thousands of calls per minute for a large account) and requires the tool to discover every dimension combination. Streams are pay-per-metric-update, scale automatically, and are the recommended integration path for Datadog, Grafana, New Relic and custom S3 data lakes.</p>",
            },
            {
              question: "What typically dominates a large CloudWatch bill and what would you change first?",
              solution: "<p>In most accounts <strong>Logs ingestion</strong> (charged per GB collected) is the largest line, followed by <strong>custom metrics</strong> inflated by high-cardinality dimensions, then API requests from dashboards or third-party pollers. Retention policies only reduce storage, which is cheap. Attack ingestion first: raise production log levels, sample access logs, stop logging payloads, and send VPC Flow Logs and CloudFront logs straight to S3. Move verbose groups to the <strong>Infrequent Access</strong> class, replace per-request <code>PutMetricData</code> with EMF or agent aggregation, and audit dimensions for identifiers. Use Cost Explorer by usage type to confirm where the spend is before changing anything.</p>",
            },
            {
              question: "What is CloudWatch cross-account observability and how does it differ from copying logs?",
              solution: "<p>Cross-account observability uses <strong>Observability Access Manager</strong>: a <strong>sink</strong> in the monitoring account and <strong>links</strong> from source accounts that share metrics, log groups, traces and Application Insights. The monitoring account then queries and visualises data <strong>in place</strong>; nothing is duplicated, so there is no extra ingestion charge and no delay. Copying via subscription filters and Firehose is still needed when data must leave AWS (SIEM), be retained cheaply in S3, or be processed by custom code, so mature setups use observability links for humans and streaming for machines.</p>",
            },
            {
              question: "When would you choose Kinesis Data Firehose versus Lambda as a subscription filter destination?",
              solution: "<p>Choose <strong>Firehose</strong> when the goal is delivery to a store or partner: it buffers by size and time, compresses, converts to Parquet, retries, and writes to S3, OpenSearch, Splunk, Datadog or HTTP endpoints without code, and it scales without concurrency limits. Choose <strong>Lambda</strong> when you need per-event logic that no downstream tool provides, such as enriching events with lookups, redacting fields, routing to different systems by content, or triggering actions. For high-volume logs, a common compromise is Firehose with a <strong>transformation Lambda</strong> inside it, so batching and delivery are managed while custom logic still runs.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html",
            "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Metric-Streams.html",
            "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Unified-Cross-Account.html",
          ],
        },
      ],
    },
  ],
};
