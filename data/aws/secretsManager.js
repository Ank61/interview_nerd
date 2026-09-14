/**
 * AWS Secrets Manager
 *
 * Interview-prep concepts for AWS Secrets Manager, split into Beginner and
 * Advance levels. Expanded from the single "AWS Secrets Manager" concept in
 * data/awsPrepareData.js.
 */
export const awsSecretsManager = {
  id: 111,
  category: "AWS Secrets Manager",
  themeBgColor: "#F3E8FF",
  textColor: "#6B21A8",
  topicColor: "#9333EA",
  lightColor: "#FAF5FF",
  type: [
    {
      id: 1,
      label: "Beginner",
      concepts: [
        {
          topic: "Secrets, Versions & KMS Encryption",
          tags: ["aws", "secrets manager", "kms", "versions", "encryption"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>AWS Secrets Manager</strong> is a managed vault for credentials your applications need at runtime: database passwords, third-party API keys, OAuth client secrets, signing keys. Instead of baking those values into code, images or environment variables, the application asks Secrets Manager for them when it starts. Three ideas underpin everything else in the service: the <strong>secret</strong>, its <strong>versions</strong>, and the <strong>KMS key</strong> that encrypts it.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What a secret is</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>A secret has a <strong>name</strong> (often path-like, for example <code>prod/orders/db</code>), an ARN with a random six-character suffix, optional description and tags.</li>
  <li>The value is either <code>SecretString</code> or <code>SecretBinary</code>, up to <strong>64 KB</strong>. By convention <code>SecretString</code> is a JSON document with several keys (<code>username</code>, <code>password</code>, <code>host</code>, <code>port</code>), which is what managed rotation and RDS integrations expect.</li>
  <li>Secrets are <strong>regional</strong>. Multi-region replication copies a primary secret into other regions and keeps the replicas in sync, so a disaster-recovery stack can read the same name locally.</li>
  <li>Deletion is soft: <code>DeleteSecret</code> schedules removal after a 7 to 30 day recovery window (or <code>--force-delete-without-recovery</code> for immediate removal).</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Versions and staging labels</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Every <code>PutSecretValue</code> or rotation creates a new <strong>version</strong> identified by a UUID. Versions are not a history you browse; they are addressed through <strong>staging labels</strong>.</li>
  <li><code>AWSCURRENT</code> is what <code>GetSecretValue</code> returns by default. <code>AWSPREVIOUS</code> is the last current value. <code>AWSPENDING</code> is a value that rotation has created but not yet promoted.</li>
  <li>Exactly one version carries <code>AWSCURRENT</code>. Promoting a version moves the label rather than copying data, and versions with no labels are eventually purged.</li>
  <li>You can fetch a specific version with <code>--version-id</code> or <code>--version-stage AWSPREVIOUS</code>, which is how you roll back after a bad rotation.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Encryption with KMS</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Each secret is encrypted with a <strong>KMS key</strong> using envelope encryption: a unique data key encrypts the value and the KMS key encrypts the data key.</li>
  <li>The default is the AWS managed key <code>aws/secretsmanager</code>, which is free but cannot be shared across accounts or have its policy edited.</li>
  <li>A <strong>customer managed key</strong> (CMK) costs about $1 per month, lets you write a key policy, enables cross-account access, and gives you a second audit trail because every decrypt is logged as a KMS event.</li>
  <li>The caller needs <code>kms:Decrypt</code> on the CMK in addition to <code>secretsmanager:GetSecretValue</code>; Secrets Manager also sets an encryption context of the secret ARN so a key cannot be misused for a different secret.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Pricing</h4>
<p style="line-height: 1.75;">Roughly <strong>$0.40 per secret per month</strong> (pro-rated) and <strong>$0.05 per 10,000 API calls</strong>. Replica secrets are billed as separate secrets. This is why caching, covered in the next concept, matters as much for cost as for latency.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "A secret is a named, KMS-encrypted value up to 64 KB, usually a JSON blob with several keys. Each write creates a version, and staging labels like AWSCURRENT, AWSPENDING and AWSPREVIOUS decide which version a reader sees, which is what makes rotation and rollback safe. I use a customer managed KMS key in production so I can control the key policy, share across accounts and see decrypts in CloudTrail."</div>
</div>`,
          examples: [
            `# Create a JSON secret encrypted with a customer managed key
aws secretsmanager create-secret --name prod/orders/db \\
  --description "Orders service Postgres credentials" \\
  --kms-key-id alias/prod-secrets \\
  --secret-string '{"username":"app","password":"REPLACE_ME","host":"orders.abc.us-east-1.rds.amazonaws.com","port":5432,"dbname":"orders"}' \\
  --tags Key=service,Value=orders Key=env,Value=prod

# Write a new version (becomes AWSCURRENT, old one becomes AWSPREVIOUS)
aws secretsmanager put-secret-value --secret-id prod/orders/db \\
  --secret-string '{"username":"app","password":"NEW_VALUE","host":"orders.abc.us-east-1.rds.amazonaws.com","port":5432,"dbname":"orders"}'

# Inspect versions and their labels
aws secretsmanager list-secret-version-ids --secret-id prod/orders/db \\
  --query 'Versions[].{id:VersionId,stages:VersionStages,created:CreatedDate}' --output table

# Read the previous value (rollback check)
aws secretsmanager get-secret-value --secret-id prod/orders/db \\
  --version-stage AWSPREVIOUS --query SecretString --output text

# Replicate to a DR region and schedule deletion with a recovery window
aws secretsmanager replicate-secret-to-regions --secret-id prod/orders/db \\
  --add-replica-regions Region=us-west-2,KmsKeyId=alias/prod-secrets
aws secretsmanager delete-secret --secret-id prod/legacy/api-key --recovery-window-in-days 14`,
          ],
          questions: [
            {
              question: "Why use Secrets Manager instead of environment variables or a config file?",
              solution: "<p>Environment variables and config files end up in container images, task definitions, CI logs, crash dumps and repositories, and they cannot be rotated without redeploying. Secrets Manager keeps the value <strong>encrypted at rest with KMS</strong>, grants access via <strong>least-privilege IAM</strong> per secret, logs every read in <strong>CloudTrail</strong>, supports <strong>automatic rotation</strong> with versioning, and lets several services or accounts share one source of truth. Env vars are still fine for the secret's <em>name</em>, which the app then resolves at startup.</p>",
            },
            {
              question: "What are staging labels and why does Secrets Manager use them instead of a simple version history?",
              solution: "<p>Staging labels (<code>AWSCURRENT</code>, <code>AWSPENDING</code>, <code>AWSPREVIOUS</code>, plus up to 20 custom labels) are pointers attached to version IDs. <code>GetSecretValue</code> without arguments returns whichever version holds <code>AWSCURRENT</code>, so promoting a new value is an <strong>atomic label move</strong> rather than a data copy, and readers never see a half-written secret. It also makes rotation safe: a new password can sit under <code>AWSPENDING</code> while it is tested, and rollback is just pointing <code>AWSCURRENT</code> back at the <code>AWSPREVIOUS</code> version.</p>",
            },
            {
              question: "When would you choose a customer managed KMS key over the default aws/secretsmanager key?",
              solution: "<p>The default key is free and fine for single-account use, but its policy cannot be edited and it cannot be used from another account. A <strong>customer managed key</strong> is required for <strong>cross-account secret access</strong>, lets you write a key policy that acts as a second authorization gate (for example only specific roles may decrypt), supports key rotation schedules and can be disabled to instantly revoke access to every secret it protects. It also appears as separate <code>Decrypt</code> events in CloudTrail, which auditors like.</p>",
            },
            {
              question: "What happens when you delete a secret, and how do you recover it?",
              solution: "<p><code>DeleteSecret</code> does not remove the value immediately; it marks the secret as scheduled for deletion with a <strong>recovery window of 7 to 30 days</strong> (default 30). During that window <code>GetSecretValue</code> fails but <code>RestoreSecret</code> brings it back intact with all versions. Only <code>--force-delete-without-recovery</code> deletes at once, which is appropriate for test data but should be denied by IAM policy in production accounts.</p>",
            },
            {
              question: "How does multi-region replication work and when do you need it?",
              solution: "<p>You designate one region as the <strong>primary</strong> and add replica regions; Secrets Manager copies the current value and every subsequent version (including rotations) to the replicas asynchronously, encrypting each replica with a KMS key in that region. Applications in the DR region read the same secret name locally with low latency and without a cross-region dependency. You need it for active-active or warm-standby architectures, and you can <strong>promote a replica</strong> to a standalone primary during a regional failover.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html",
            "https://docs.aws.amazon.com/secretsmanager/latest/userguide/whats-in-a-secret.html",
            "https://docs.aws.amazon.com/secretsmanager/latest/userguide/security-encryption.html",
          ],
        },
        {
          topic: "Retrieving & Caching Secrets",
          tags: ["aws", "secrets manager", "sdk", "caching", "latency", "cost"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Storing a secret is the easy half. The half that shows up in production incidents is <strong>how applications read it</strong>: too rarely and they miss rotations, too often and they pay per API call, add latency to every request and risk throttling. The service quota for <code>GetSecretValue</code> is in the thousands of requests per second per account, which sounds generous until a fleet of containers hits it on every HTTP request.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Ways to retrieve a secret</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>SDK or CLI:</strong> <code>GetSecretValue</code> returns the JSON string for the <code>AWSCURRENT</code> version. <code>BatchGetSecretValue</code> reads up to 20 secrets in one call, filtered by name or tag.</li>
  <li><strong>Official caching clients</strong> for Java, Python, .NET and Go wrap the SDK with an in-memory cache and a configurable TTL (default one hour).</li>
  <li><strong>Lambda Parameters and Secrets extension:</strong> A layer that runs a local HTTP endpoint on port 2773 inside the function, caching values across invocations so warm functions never call the API.</li>
  <li><strong>Platform injection:</strong> ECS, EKS (via the Secrets Store CSI driver or External Secrets Operator), CodeBuild and Elastic Beanstalk fetch the secret when the task or build starts and expose it as an environment variable or file.</li>
  <li><strong>Native integrations:</strong> RDS Proxy, Redshift, CloudFormation dynamic references (<code>resolve:secretsmanager</code>) and Terraform data sources read secrets without any application code.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Caching strategy</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Fetch at <strong>startup</strong>, keep the value in process memory, and refresh on a TTL of a few minutes to an hour depending on how often you rotate.</li>
  <li>Add a <strong>refresh-on-failure</strong> path: when the downstream system rejects the credential, drop the cache, fetch again and retry once. This picks up a rotation within seconds without a tight TTL.</li>
  <li>Never write the value to disk or log it. Keep it in memory only, and do not include it in error messages or telemetry.</li>
  <li>If you inject at container start, remember that the running task keeps the old value until it is replaced; a rotation therefore requires a rolling restart or an in-app refresh.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Reliability details</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Use a <strong>VPC interface endpoint</strong> for Secrets Manager so private subnets can reach it without a NAT gateway and so you can pin access to the endpoint with <code>aws:SourceVpce</code>.</li>
  <li>Handle <code>ResourceNotFoundException</code>, <code>AccessDeniedException</code> and throttling (<code>ThrottlingException</code>) with exponential backoff; the SDK retries by default.</li>
  <li>Treat a failed refresh as non-fatal if you still hold a cached value; fail fast only on first load.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "I fetch secrets once at startup, cache them in memory with a TTL, and refresh immediately when the database rejects the credential so rotation is picked up without hammering the API. On Lambda I use the Parameters and Secrets extension for a local cache; on ECS I let the execution role inject the value at task start. That keeps GetSecretValue calls, cost and latency near zero on the request path."</div>
</div>`,
          examples: [
            `// Node.js: fetch once, cache in memory, refresh on TTL and on auth failure
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

const client = new SecretsManagerClient({});
const TTL_MS = 5 * 60 * 1000;
let cached = null;
let fetchedAt = 0;

export async function getDbConfig({ force = false } = {}) {
  const stale = Date.now() - fetchedAt > TTL_MS;
  if (force || !cached || stale) {
    try {
      const res = await client.send(new GetSecretValueCommand({ SecretId: process.env.DB_SECRET_ID }));
      cached = JSON.parse(res.SecretString);
      fetchedAt = Date.now();
    } catch (err) {
      if (!cached) throw err;          // first load must succeed
      console.warn("secret refresh failed, using cached value", err.name);
    }
  }
  return cached;
}

// Usage: on an auth error from Postgres, refresh once and retry
export async function withDbRetry(fn) {
  try {
    return await fn(await getDbConfig());
  } catch (err) {
    if (err.code === "28P01") {        // invalid_password: rotation probably happened
      return fn(await getDbConfig({ force: true }));
    }
    throw err;
  }
}`,
            `# Lambda: Parameters and Secrets extension (local cache on port 2773)
# 1. Attach the layer:
aws lambda update-function-configuration --function-name orders-worker \\
  --layers arn:aws:lambda:us-east-1:177933569100:layer:AWS-Parameters-and-Secrets-Lambda-Extension:12

# 2. Inside the function, call the local endpoint instead of the AWS API:
curl -H "X-Aws-Parameters-Secrets-Token: $AWS_SESSION_TOKEN" \\
  "http://localhost:2773/secretsmanager/get?secretId=prod/orders/db"

# Batch read several secrets by tag in one API call
aws secretsmanager batch-get-secret-value \\
  --filters Key=tag-key,Values=service Key=tag-value,Values=orders \\
  --query 'SecretValues[].{name:Name,value:SecretString}'`,
          ],
          questions: [
            {
              question: "How would you avoid the cost and latency of calling Secrets Manager on every request?",
              solution: "<p>Fetch at startup and <strong>cache in memory</strong> with a TTL (for example 5 to 15 minutes), using the official caching libraries for Java, Python, .NET and Go or the <strong>Lambda Parameters and Secrets extension</strong>, which runs a local HTTP cache inside the function. Invalidate the cache when the downstream system returns an auth error so rotation is picked up immediately. For containers, ECS and EKS can inject the secret at task start, which is effectively a per-deployment cache.</p>",
            },
            {
              question: "A secret was rotated but your containers still fail to connect for several minutes. What went wrong and how do you fix it?",
              solution: "<p>The containers cached the old value, either in application memory with a long TTL or because ECS injected it as an environment variable at task start. Fix it with <strong>refresh-on-failure</strong>: catch the authentication error, force a fresh <code>GetSecretValue</code>, and retry once. For env-var injection, trigger a rolling deployment after rotation (for example an EventBridge rule on the <code>RotationSucceeded</code> event that calls <code>UpdateService --force-new-deployment</code>). Combining this with the <strong>alternating-users</strong> rotation strategy means the old credential stays valid until the next rotation, so nothing fails in the meantime.</p>",
            },
            {
              question: "How does the Lambda Parameters and Secrets extension work and what does it save you?",
              solution: "<p>It is a <strong>Lambda layer</strong> that starts a small HTTP server on <code>localhost:2773</code> inside the execution environment. Your code calls it with the <code>X-Aws-Parameters-Secrets-Token</code> header set to <code>AWS_SESSION_TOKEN</code>, and the extension fetches from Secrets Manager or Parameter Store using the function's execution role, then <strong>caches the value</strong> for a configurable TTL (default 300 seconds). Warm invocations are served from memory, so you save API cost and roughly 20 to 50 ms per call, and you avoid bundling an SDK just to read one secret.</p>",
            },
            {
              question: "Why should Secrets Manager traffic from private subnets go through a VPC endpoint?",
              solution: "<p>Without an endpoint, tasks in private subnets need a <strong>NAT gateway</strong> to reach the public Secrets Manager API, which costs money per GB and adds an internet-facing hop. An <strong>interface VPC endpoint</strong> keeps traffic on the AWS network, removes the NAT dependency, and gives you a policy lever: the secret's resource policy or the caller's IAM policy can require <code>aws:SourceVpce</code> to equal your endpoint ID, so even leaked credentials cannot read the secret from outside your VPC.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/secretsmanager/latest/userguide/retrieving-secrets.html",
            "https://docs.aws.amazon.com/secretsmanager/latest/userguide/retrieving-secrets_lambda.html",
            "https://docs.aws.amazon.com/secretsmanager/latest/userguide/vpc-endpoint-overview.html",
          ],
        },
        {
          topic: "Secrets Manager vs Parameter Store",
          tags: ["aws", "secrets manager", "parameter store", "ssm", "configuration"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Almost every AWS interview that touches secrets asks the same comparison: <strong>Secrets Manager or SSM Parameter Store?</strong> Both store key-value data, both can encrypt with KMS, both are readable with IAM-scoped permissions, and both integrate with ECS, Lambda and CloudFormation. The right answer depends on whether the value is a <strong>credential that rotates</strong> or a piece of <strong>configuration</strong>.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">SSM Parameter Store</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Part of AWS Systems Manager. Parameters have a hierarchical name such as <code>/prod/orders/feature-flags/new-checkout</code>, which makes <code>GetParametersByPath</code> a neat way to load a whole namespace at once.</li>
  <li>Types: <code>String</code>, <code>StringList</code> and <code>SecureString</code> (encrypted with KMS, decrypted on read with <code>--with-decryption</code>).</li>
  <li><strong>Standard tier</strong> is free: up to 10,000 parameters, 4 KB each, standard throughput. <strong>Advanced tier</strong> costs about $0.05 per parameter per month for 8 KB values, 100,000 parameters, parameter policies (expiration, no-change notifications) and higher throughput.</li>
  <li>Keeps a <strong>version history</strong> (up to 100 versions) and supports labels, but has <strong>no built-in rotation</strong> and no cross-account resource policies (you can share advanced parameters through AWS RAM).</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Secrets Manager</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Purpose-built for credentials: <strong>automatic rotation</strong> (managed for RDS, Aurora, Redshift, DocumentDB; Lambda-based for anything else), random password generation, and staging labels for safe promotion and rollback.</li>
  <li>Values up to <strong>64 KB</strong>, string or binary, with native JSON key extraction in ECS and CloudFormation.</li>
  <li><strong>Resource policies</strong> for cross-account access and <strong>multi-region replication</strong>.</li>
  <li>Costs about <strong>$0.40 per secret per month</strong> plus $0.05 per 10,000 API calls, so a thousand feature flags in Secrets Manager would be a needless $400 a month.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Decision guide</h4>
<pre><code class="language-text">Database password, API key, OAuth secret that rotates    -> Secrets Manager
Needs cross-account sharing or multi-region replicas     -> Secrets Manager
Feature flag, endpoint URL, AMI ID, tuning knob          -> Parameter Store (String)
Static secret that never rotates, cost sensitive         -> Parameter Store (SecureString)
Whole config namespace loaded at startup                 -> Parameter Store (GetParametersByPath)</code></pre>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Using both together</h4>
<p style="line-height: 1.75;">A common pattern is Parameter Store for configuration and for the <em>name</em> of the secret, with Secrets Manager holding the credential itself. Secrets Manager secrets are also reachable through the Parameter Store API at the path <code>/aws/reference/secretsmanager/&lt;secret-name&gt;</code>, which lets tooling that only speaks SSM read both. CloudFormation supports both via dynamic references: <code>resolve:ssm</code>, <code>resolve:ssm-secure</code> and <code>resolve:secretsmanager</code>.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Parameter Store is free, hierarchical and ideal for configuration and SecureStrings that do not rotate. Secrets Manager costs per secret but adds automatic rotation, staging labels, cross-account resource policies, replication and 64 KB values. My rule: rotating credentials go in Secrets Manager, everything else in Parameter Store, and the app reads the secret name from a parameter."</div>
</div>`,
          examples: [
            `# Parameter Store: hierarchical configuration plus a SecureString
aws ssm put-parameter --name /prod/orders/db/host --type String \\
  --value orders.abc.us-east-1.rds.amazonaws.com
aws ssm put-parameter --name /prod/orders/feature-flags/new-checkout --type String --value "true"
aws ssm put-parameter --name /prod/orders/stripe-webhook-secret --type SecureString \\
  --key-id alias/prod-secrets --value whsec_REPLACE_ME

# Load a whole namespace at startup (decrypting SecureStrings)
aws ssm get-parameters-by-path --path /prod/orders --recursive --with-decryption \\
  --query 'Parameters[].{name:Name,value:Value}' --output table

# Read a Secrets Manager secret through the SSM API
aws ssm get-parameter --name /aws/reference/secretsmanager/prod/orders/db --with-decryption`,
            `# CloudFormation: dynamic references to both services, so no plaintext in templates
Resources:
  OrdersDb:
    Type: AWS::RDS::DBInstance
    Properties:
      Engine: postgres
      MasterUsername: '{{resolve:secretsmanager:prod/orders/db:SecretString:username}}'
      MasterUserPassword: '{{resolve:secretsmanager:prod/orders/db:SecretString:password}}'
      DBInstanceClass: '{{resolve:ssm:/prod/orders/db/instance-class}}'
  OrdersTask:
    Type: AWS::ECS::TaskDefinition
    Properties:
      ContainerDefinitions:
        - Name: api
          Image: 123456789012.dkr.ecr.us-east-1.amazonaws.com/orders-api:1.4.2
          Environment:
            - Name: FEATURE_NEW_CHECKOUT
              Value: '{{resolve:ssm:/prod/orders/feature-flags/new-checkout}}'
          Secrets:
            - Name: DB_PASSWORD
              ValueFrom: arn:aws:secretsmanager:us-east-1:123456789012:secret:prod/orders/db-AbCdEf:password::
            - Name: STRIPE_WEBHOOK_SECRET
              ValueFrom: arn:aws:ssm:us-east-1:123456789012:parameter/prod/orders/stripe-webhook-secret`,
          ],
          questions: [
            {
              question: "Compare Secrets Manager and SSM Parameter Store.",
              solution: "<p><strong>Parameter Store</strong> is free (standard tier), stores <code>String</code>, <code>StringList</code> and KMS-encrypted <code>SecureString</code> values up to 4 KB (8 KB advanced), organises them hierarchically, and is great for configuration and feature flags. It has no native rotation. <strong>Secrets Manager</strong> charges per secret, stores up to 64 KB, adds <strong>automatic rotation</strong>, <strong>cross-account resource policies</strong>, random password generation and deeper integrations (RDS, RDS Proxy, managed rotation). Rule of thumb: rotating credentials go in Secrets Manager, everything else in Parameter Store.</p>",
            },
            {
              question: "Is a SecureString parameter less secure than a Secrets Manager secret?",
              solution: "<p>Not at rest: both are encrypted with KMS and both require <code>kms:Decrypt</code> plus the service permission to read. The difference is <strong>lifecycle</strong>, not cryptography. Secrets Manager can <strong>rotate</strong> the value automatically, keeps staging labels for safe promotion, and supports resource policies for cross-account sharing. A SecureString that never rotates is a perfectly good home for something like a webhook signing secret; a database password that should change every 30 days belongs in Secrets Manager.</p>",
            },
            {
              question: "When does the Parameter Store advanced tier make sense?",
              solution: "<p>Switch to <strong>advanced</strong> when you exceed 10,000 parameters in a region, need values larger than 4 KB (up to 8 KB), want <strong>parameter policies</strong> such as expiration dates or expiration and no-change notifications through EventBridge, or need to share parameters cross-account via <strong>AWS RAM</strong>. It costs about $0.05 per parameter per month plus API charges for higher throughput, still far cheaper than a Secrets Manager secret, but if you find yourself using expiration policies to fake rotation, that is a sign the value belongs in Secrets Manager.</p>",
            },
            {
              question: "How do you keep plaintext secrets out of CloudFormation and Terraform?",
              solution: "<p>In CloudFormation use <strong>dynamic references</strong>: <code>{{resolve:ssm:name}}</code>, <code>{{resolve:ssm-secure:name}}</code> and <code>{{resolve:secretsmanager:name:SecretString:key}}</code>, which are resolved at deploy time and never stored in the template or stack parameters. For RDS you can go further with <code>ManageMasterUserPassword: true</code> so RDS creates and owns the secret. In Terraform read <code>data.aws_secretsmanager_secret_version</code> or <code>data.aws_ssm_parameter</code> and mark outputs <code>sensitive</code>; remember the value still lands in state, so encrypt the state backend.</p>",
            },
            {
              question: "What does the /aws/reference/secretsmanager path in Parameter Store do?",
              solution: "<p>It is a <strong>read-only bridge</strong>: calling <code>ssm:GetParameter</code> with the name <code>/aws/reference/secretsmanager/&lt;secret-name-or-arn&gt;</code> returns the <code>AWSCURRENT</code> value of that Secrets Manager secret. The caller needs <code>secretsmanager:GetSecretValue</code> (and KMS decrypt) on the underlying secret, not just SSM permissions. It is useful when an existing tool or library only knows how to read from Parameter Store but you want the credential itself to benefit from Secrets Manager rotation.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html",
            "https://docs.aws.amazon.com/secretsmanager/latest/userguide/integrating_parameterstore.html",
            "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/dynamic-references.html",
          ],
        },
      ],
    },
    {
      id: 2,
      label: "Advance",
      concepts: [
        {
          topic: "Rotation Strategies & Lambda Functions",
          tags: ["aws", "secrets manager", "rotation", "lambda", "rds", "zero downtime"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>Automatic rotation</strong> is the feature that justifies paying for Secrets Manager. Rotating a credential on a schedule limits the blast radius of a leak and satisfies compliance controls, but doing it by hand is error-prone: someone changes the database password, forgets one consumer, and production goes down at 2 a.m. Secrets Manager turns rotation into a repeatable, versioned workflow.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Two rotation modes</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Managed rotation</strong> for RDS, Aurora, Redshift and DocumentDB <em>master</em> credentials created with <code>ManageMasterUserPassword</code>. AWS owns the whole process; there is no Lambda in your account.</li>
  <li><strong>Lambda rotation functions</strong> for everything else: application database users, API keys, OAuth client secrets, SSH keys. AWS publishes rotation templates for common engines, and you write your own for custom systems.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The four-step Lambda protocol</h4>
<p style="line-height: 1.75;">Secrets Manager invokes the function four times with a <code>Step</code> parameter, a <code>SecretId</code> and a <code>ClientRequestToken</code> that becomes the new version ID:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>createSecret:</strong> Read the <code>AWSCURRENT</code> value, generate a new password (<code>GetRandomPassword</code>), and store it as a new version labelled <code>AWSPENDING</code>. Idempotent: if a pending version already exists for this token, do nothing.</li>
  <li><strong>setSecret:</strong> Log in to the target system with the current credential and change the password to the pending value.</li>
  <li><strong>testSecret:</strong> Log in with the <code>AWSPENDING</code> credential to prove it works.</li>
  <li><strong>finishSecret:</strong> Move <code>AWSCURRENT</code> to the pending version, which automatically relabels the old one <code>AWSPREVIOUS</code>.</li>
</ul>
<p style="line-height: 1.75;">If any step fails, the pending version stays pending and the current credential is untouched; the next scheduled run retries from the beginning.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Single-user vs alternating-users</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Single user:</strong> The password of one database user changes in place. Simple, but any application still holding the old password gets connection failures until it refreshes.</li>
  <li><strong>Alternating users:</strong> Two database users, <code>app</code> and <code>app_clone</code>, take turns. Rotation updates the <em>inactive</em> user's password and promotes it. The previous user's credential stays valid until the next rotation, so applications have an entire rotation window to refresh. Requires a separate <strong>superuser secret</strong> that the Lambda uses to change passwords.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Operational details</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Schedules accept <code>AutomaticallyAfterDays</code> or a cron or rate expression (for example every Saturday at 02:00) with a rotation window.</li>
  <li>The rotation Lambda must have <strong>network access to the database</strong> (same VPC, security group rule) and to Secrets Manager (NAT or VPC endpoint).</li>
  <li>Set <code>RotateImmediately=false</code> when enabling rotation on an existing secret if you want to test first.</li>
  <li>Watch the <code>RotationFailed</code> and <code>RotationSucceeded</code> events in EventBridge and alarm on them.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Rotation creates a new AWSPENDING version, sets and tests it against the target, then promotes it to AWSCURRENT, so a failure never breaks the live credential. For RDS master users I use managed rotation; for app users I use the alternating-users Lambda template so the old password stays valid for a full cycle and clients can refresh at their own pace. The Lambda lives in the database VPC with a Secrets Manager endpoint, and I alarm on RotationFailed."</div>
</div>`,
          examples: [
            `# Turn on rotation with the AWS-provided Postgres alternating-users template
aws secretsmanager rotate-secret --secret-id prod/orders/db \\
  --rotation-lambda-arn arn:aws:lambda:us-east-1:123456789012:function:SecretsManagerRDSPostgreSQLRotationMultiUser \\
  --rotation-rules 'ScheduleExpression=cron(0 2 ? * SAT#1 *),Duration=2h' \\
  --rotate-immediately

# Or let RDS own the master secret entirely (managed rotation, no Lambda)
aws rds create-db-instance --db-instance-identifier orders --engine postgres \\
  --db-instance-class db.t4g.medium --allocated-storage 50 \\
  --master-username postgres --manage-master-user-password \\
  --master-user-secret-kms-key-id alias/prod-secrets

# Check rotation status and force a manual rotation
aws secretsmanager describe-secret --secret-id prod/orders/db \\
  --query '{rotation:RotationEnabled,last:LastRotatedDate,next:NextRotationDate,rules:RotationRules}'
aws secretsmanager rotate-secret --secret-id prod/orders/db`,
            `// Skeleton of a custom rotation Lambda (Node.js) for a third-party API key
import { SecretsManagerClient, GetSecretValueCommand, PutSecretValueCommand,
         UpdateSecretVersionStageCommand, DescribeSecretCommand } from "@aws-sdk/client-secrets-manager";

const sm = new SecretsManagerClient({});

export const handler = async ({ SecretId, ClientRequestToken, Step }) => {
  const meta = await sm.send(new DescribeSecretCommand({ SecretId }));
  if (!meta.RotationEnabled) throw new Error("rotation not enabled");
  const stages = meta.VersionIdsToStages[ClientRequestToken] || [];
  if (stages.includes("AWSCURRENT")) return;              // already finished

  switch (Step) {
    case "createSecret": {
      try {
        await sm.send(new GetSecretValueCommand({ SecretId, VersionId: ClientRequestToken, VersionStage: "AWSPENDING" }));
        return;                                             // idempotent: pending already exists
      } catch (_) { /* fall through and create it */ }
      const current = JSON.parse((await sm.send(new GetSecretValueCommand({ SecretId, VersionStage: "AWSCURRENT" }))).SecretString);
      const newKey = await vendorApi.createKey(current.apiKey);   // vendor issues a second key
      await sm.send(new PutSecretValueCommand({
        SecretId, ClientRequestToken,
        SecretString: JSON.stringify({ ...current, apiKey: newKey }),
        VersionStages: ["AWSPENDING"],
      }));
      return;
    }
    case "setSecret":
      return;                                               // vendor key is already active
    case "testSecret": {
      const pending = JSON.parse((await sm.send(new GetSecretValueCommand({ SecretId, VersionId: ClientRequestToken, VersionStage: "AWSPENDING" }))).SecretString);
      await vendorApi.ping(pending.apiKey);                 // throws if the new key does not work
      return;
    }
    case "finishSecret": {
      const currentId = Object.keys(meta.VersionIdsToStages).find(id => meta.VersionIdsToStages[id].includes("AWSCURRENT"));
      await sm.send(new UpdateSecretVersionStageCommand({
        SecretId, VersionStage: "AWSCURRENT",
        MoveToVersionId: ClientRequestToken, RemoveFromVersionId: currentId,
      }));
      const old = JSON.parse((await sm.send(new GetSecretValueCommand({ SecretId, VersionStage: "AWSPREVIOUS" }))).SecretString);
      await vendorApi.revokeKey(old.apiKey);                // retire the previous key
      return;
    }
    default:
      throw new Error("unknown step " + Step);
  }
};`,
          ],
          questions: [
            {
              question: "How does automatic rotation work without breaking running applications?",
              solution: "<p>Rotation creates a new version labelled <code>AWSPENDING</code>, sets the new credential in the target system, tests it, then moves the <code>AWSCURRENT</code> label to it (old becomes <code>AWSPREVIOUS</code>). Applications that fetch by name get the new value on their next read, so they must <strong>refresh their cache</strong> either periodically or on an authentication failure. For zero downtime with databases use the <strong>alternating-users</strong> strategy: two DB users take turns, so the old credential stays valid until the next rotation and in-flight connections are unaffected.</p>",
            },
            {
              question: "Walk through the four steps a rotation Lambda must implement and why each must be idempotent.",
              solution: "<p><strong>createSecret</strong> generates a new value and stores it as <code>AWSPENDING</code> under the supplied <code>ClientRequestToken</code>; <strong>setSecret</strong> applies it to the target system; <strong>testSecret</strong> authenticates with the pending value; <strong>finishSecret</strong> moves <code>AWSCURRENT</code> to it. Secrets Manager may <strong>retry any step</strong> after a timeout or error, and a later invocation of the same step must not create a second pending version or change the password twice. That is why the function first inspects <code>VersionIdsToStages</code> for the token and returns early if the work is already done.</p>",
            },
            {
              question: "What is the difference between managed rotation and Lambda rotation, and when is each available?",
              solution: "<p><strong>Managed rotation</strong> is only for master credentials of RDS, Aurora, Redshift and DocumentDB that were created with <code>ManageMasterUserPassword</code>; the service itself rotates the password with no Lambda, no VPC configuration and no code in your account. <strong>Lambda rotation</strong> covers everything else, including application-level database users, using AWS templates for MySQL, Postgres, Oracle, SQL Server, MongoDB and Redshift or your own function for arbitrary systems. Managed is simpler; Lambda is flexible and required whenever the credential is not the master user.</p>",
            },
            {
              question: "Rotation keeps failing at the setSecret step for an RDS Postgres secret. What do you check?",
              solution: "<p>First the <strong>network</strong>: the rotation Lambda must be in a VPC and subnet that can reach the database (security group ingress on 5432 from the Lambda's security group) and must reach Secrets Manager through a NAT gateway or an interface VPC endpoint. Then the <strong>credentials</strong>: for the alternating-users template the <code>masterarn</code> or superuser secret must be valid and have permission to alter the app user. Finally check the Lambda logs in CloudWatch for <code>AccessDenied</code> on KMS, which happens when the function role is missing <code>kms:Decrypt</code> on the customer managed key.</p>",
            },
            {
              question: "How do you roll back a rotation that produced a working but wrong credential?",
              solution: "<p>The old value still exists under <code>AWSPREVIOUS</code>. Call <code>UpdateSecretVersionStage</code> to move <code>AWSCURRENT</code> from the new version back to the previous version ID, which is an atomic pointer change readers pick up on their next fetch. If the rotation also changed the password in the database, you must restore it there too (with alternating users the previous user's password was never touched, so it simply works). Then disable rotation with <code>CancelRotateSecret</code> until the function is fixed.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html",
            "https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotate-secrets_lambda-functions.html",
            "https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets_strategies.html",
          ],
        },
        {
          topic: "Access Control, Policies & Auditing",
          tags: ["aws", "secrets manager", "iam", "resource policy", "cloudtrail", "cross account"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  A secret is only as safe as the policy that guards it. Secrets Manager uses the standard AWS authorization model: an <strong>identity-based IAM policy</strong> on the caller, an optional <strong>resource-based policy</strong> on the secret, and the <strong>KMS key policy</strong> as a third gate. Interviewers want to hear that you scope permissions to individual secret ARNs, use conditions to pin access to a network path, and can prove who read what through CloudTrail.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Identity-based policies</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Grant <code>secretsmanager:GetSecretValue</code> and <code>secretsmanager:DescribeSecret</code> on the exact ARN, not <code>*</code>. Because ARNs end in a random suffix, use <code>arn:aws:secretsmanager:region:acct:secret:prod/orders/db-*</code> or a tag-based condition.</li>
  <li><strong>ABAC</strong>: allow reads only where <code>secretsmanager:ResourceTag/service</code> equals <code>aws:PrincipalTag/service</code>, so a new team's roles automatically see only their secrets.</li>
  <li>Separate <strong>writers</strong> (deployment roles that <code>PutSecretValue</code>, <code>RotateSecret</code>) from <strong>readers</strong> (task and function roles). Deny <code>DeleteSecret</code> without a recovery window in production via an SCP.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Resource-based policies</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Attached to the secret with <code>PutResourcePolicy</code>. Needed for <strong>cross-account access</strong>: the secret's policy allows the other account's role, that role's own IAM policy allows the action, and the <strong>customer managed KMS key</strong> policy allows the role to decrypt. All three must agree.</li>
  <li>Can carry <strong>Deny</strong> statements with conditions: deny unless <code>aws:SourceVpce</code> matches your endpoint, deny unless <code>aws:PrincipalOrgID</code> matches your organization, deny reads outside working hours.</li>
  <li><code>--block-public-policy</code> prevents accidentally granting <code>Principal: *</code>. IAM Access Analyzer flags secrets shared outside the account.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Auditing with CloudTrail</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Every management and data call, including <code>GetSecretValue</code>, is recorded with the principal ARN, source IP, VPC endpoint ID, user agent and the secret ARN. The value itself is never logged.</li>
  <li>Build <strong>CloudWatch metric filters</strong> or EventBridge rules on <code>GetSecretValue</code> from unexpected principals, <code>AccessDenied</code> errors on secrets, <code>DeleteSecret</code> and <code>PutResourcePolicy</code>.</li>
  <li>Secrets Manager emits EventBridge events for rotation success and failure; unused secrets can be found with the <code>LastAccessedDate</code> field from <code>DescribeSecret</code>.</li>
  <li>AWS Config rules such as <code>secretsmanager-rotation-enabled-check</code> and <code>secretsmanager-secret-unused</code> turn these into compliance findings.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Common pitfalls</h4>
<p style="line-height: 1.75;">Granting <code>secretsmanager:*</code> on <code>*</code> to a shared CI role; forgetting the KMS permission and debugging an <code>AccessDenied</code> that is really a KMS error; placing the secret ARN with its suffix in code and breaking when the secret is recreated; and logging the full secret JSON when printing configuration at startup.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Three gates control a secret: the caller's IAM policy, the secret's resource policy and the KMS key policy. I grant GetSecretValue on specific ARNs or via tag-based ABAC, use resource policies with SourceVpce and PrincipalOrgID conditions to pin access to my network and organization, and rely on CloudTrail data events to alarm on reads from unexpected principals. Cross-account sharing needs a customer managed key so the key policy can trust the other account."</div>
</div>`,
          examples: [
            `# Resource policy: allow a role in another account, but only via our VPC endpoint
aws secretsmanager put-resource-policy --secret-id prod/orders/db --block-public-policy \\
  --resource-policy '{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "AllowReportingAccountRead",
        "Effect": "Allow",
        "Principal": { "AWS": "arn:aws:iam::210987654321:role/reporting-etl" },
        "Action": ["secretsmanager:GetSecretValue", "secretsmanager:DescribeSecret"],
        "Resource": "*"
      },
      {
        "Sid": "DenyOutsideVpcEndpoint",
        "Effect": "Deny",
        "Principal": "*",
        "Action": "secretsmanager:GetSecretValue",
        "Resource": "*",
        "Condition": { "StringNotEquals": { "aws:SourceVpce": "vpce-0ab12cd34ef56789a" } }
      }
    ]
  }'

# The KMS key policy must also trust the other account for cross-account reads
# (statement inside the CMK policy)
{
  "Sid": "AllowReportingAccountDecrypt",
  "Effect": "Allow",
  "Principal": { "AWS": "arn:aws:iam::210987654321:role/reporting-etl" },
  "Action": ["kms:Decrypt", "kms:DescribeKey"],
  "Resource": "*",
  "Condition": { "StringEquals": { "kms:ViaService": "secretsmanager.us-east-1.amazonaws.com" } }
}`,
            `# Identity policy for an ECS task role using ABAC: read only secrets tagged with your service
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["secretsmanager:GetSecretValue", "secretsmanager:DescribeSecret"],
      "Resource": "arn:aws:secretsmanager:us-east-1:123456789012:secret:prod/*",
      "Condition": {
        "StringEquals": { "secretsmanager:ResourceTag/service": "orders" }
      }
    },
    { "Effect": "Allow", "Action": "kms:Decrypt", "Resource": "arn:aws:kms:us-east-1:123456789012:key/1234abcd-12ab-34cd-56ef-1234567890ab" }
  ]
}

# Find who read a secret in the last day (CloudTrail Lake / Athena style query)
SELECT eventTime, userIdentity.arn, sourceIPAddress, vpcEndpointId, errorCode
FROM cloudtrail_events
WHERE eventSource = 'secretsmanager.amazonaws.com'
  AND eventName = 'GetSecretValue'
  AND requestParameters LIKE '%prod/orders/db%'
  AND eventTime > current_timestamp - interval '1' day
ORDER BY eventTime DESC;`,
          ],
          questions: [
            {
              question: "How do you control and audit who can read a secret?",
              solution: "<p>Grant <code>secretsmanager:GetSecretValue</code> on the specific secret ARN to the role that needs it (ECS task role, Lambda execution role), optionally with conditions such as <code>aws:SourceVpce</code> to require a VPC endpoint or tag-based conditions for ABAC. Also grant <code>kms:Decrypt</code> on the customer-managed key, whose key policy is a second gate. Every <code>GetSecretValue</code> call appears in <strong>CloudTrail</strong> with the caller identity, so you can alarm on reads from unexpected principals or IPs.</p>",
            },
            {
              question: "What must be in place for a role in account B to read a secret in account A?",
              solution: "<p>Three things. (1) The secret in account A has a <strong>resource policy</strong> allowing account B's role to call <code>GetSecretValue</code>. (2) The role in account B has an <strong>identity policy</strong> allowing the same action on that ARN plus <code>kms:Decrypt</code>. (3) The secret is encrypted with a <strong>customer managed KMS key</strong> whose key policy allows account B's role to decrypt, ideally with a <code>kms:ViaService</code> condition. The default <code>aws/secretsmanager</code> key cannot be used because its policy is not editable, so cross-account sharing fails until you re-encrypt the secret with a CMK.</p>",
            },
            {
              question: "A Lambda gets AccessDeniedException reading a secret although its policy allows GetSecretValue. What is likely wrong?",
              solution: "<p>Most often the missing piece is <strong>KMS</strong>: the secret uses a customer managed key and the function role has no <code>kms:Decrypt</code> on it, or the key policy does not include the role. Secrets Manager surfaces this as an access denied on the secret. Other candidates: the ARN in the policy lacks the random suffix wildcard (<code>secret:prod/orders/db-*</code>), a <strong>Deny</strong> in the resource policy or an SCP with a <code>aws:SourceVpce</code> condition that the Lambda does not satisfy because it is not in the VPC, or a permission boundary on the role. CloudTrail's error message and the <code>vpcEndpointId</code> field usually settle it quickly.</p>",
            },
            {
              question: "How would you implement attribute-based access control for secrets across many teams?",
              solution: "<p>Tag every secret with <code>service</code> and <code>env</code>, tag or session-tag every role the same way, and write one shared policy that allows <code>GetSecretValue</code> when <code>secretsmanager:ResourceTag/service</code> equals <code>aws:PrincipalTag/service</code> and likewise for <code>env</code>. New services get access automatically by tagging, with no policy change and no per-secret ARN lists. Protect the tags themselves by restricting <code>secretsmanager:TagResource</code> and <code>UntagResource</code> to the platform team, otherwise anyone who can retag a secret can grant themselves access.</p>",
            },
            {
              question: "Which signals would you alert on to detect misuse of secrets?",
              solution: "<p>Alert on <code>GetSecretValue</code> from principals or source IPs outside the expected set (for example a human IAM user reading a production database secret), spikes in <code>AccessDenied</code> on secrets, any <code>PutResourcePolicy</code>, <code>DeleteSecret</code> or <code>UpdateSecret</code> that changes the KMS key, and <code>RotationFailed</code> events. Use CloudTrail with EventBridge rules or GuardDuty findings for credential exfiltration, and periodically review <code>LastAccessedDate</code> to delete secrets nothing has read in 90 days, since unused secrets are pure risk.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/secretsmanager/latest/userguide/auth-and-access.html",
            "https://docs.aws.amazon.com/secretsmanager/latest/userguide/auth-and-access_examples_cross.html",
            "https://docs.aws.amazon.com/secretsmanager/latest/userguide/monitoring-cloudtrail.html",
          ],
        },
        {
          topic: "ECS, Lambda & RDS Proxy Integrations",
          tags: ["aws", "secrets manager", "ecs", "lambda", "rds proxy", "eks"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  The value of Secrets Manager comes from how many AWS services can consume a secret <strong>without application code</strong>. Knowing which role does the fetching, when the value is read, and how rotation reaches the consumer is what separates a textbook answer from an operational one.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">ECS and Fargate</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>The task definition's <code>secrets</code> array maps an environment variable to a secret ARN. Append <code>:json-key:version-stage:version-id</code> to pull a single key out of a JSON secret, for example <code>...:prod/orders/db-AbCdEf:password::</code>.</li>
  <li>The <strong>task execution role</strong> (not the task role) needs <code>GetSecretValue</code> and <code>kms:Decrypt</code>, because the ECS agent fetches the value before the container starts.</li>
  <li>The value is read <strong>once at task launch</strong>. After rotation, running tasks keep the old value until replaced; pair this with the alternating-users strategy or trigger a new deployment from the rotation event.</li>
  <li>Fargate tasks in private subnets need a Secrets Manager <strong>VPC endpoint</strong> (and ECR, CloudWatch Logs endpoints) or a NAT gateway.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">EKS</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Secrets Store CSI Driver</strong> with the AWS provider mounts secrets as files in the pod and can sync them to Kubernetes Secrets; the pod's service account uses IRSA or Pod Identity for permissions.</li>
  <li><strong>External Secrets Operator</strong> pulls Secrets Manager values into Kubernetes Secrets on a refresh interval, which keeps existing Helm charts unchanged.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Lambda</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Read with the SDK in the initialisation phase (outside the handler) so the value is reused across warm invocations, or use the <strong>Parameters and Secrets extension</strong> for a managed local cache.</li>
  <li>Avoid mapping secrets into Lambda environment variables at deploy time: they are visible in the console and in <code>GetFunctionConfiguration</code>, and they freeze at deployment.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">RDS Proxy</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>RDS Proxy authenticates to the database using a <strong>Secrets Manager secret per database user</strong>; the proxy role needs <code>GetSecretValue</code> and KMS decrypt.</li>
  <li>Clients connect to the proxy with either the same credentials or, better, <strong>IAM database authentication</strong> so the application never sees a password at all. The proxy handles connection pooling, which is crucial for Lambda's connection storms.</li>
  <li>Because the proxy reads the secret, rotation is transparent: it picks up the new password without the application changing anything.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Other consumers</h4>
<p style="line-height: 1.75;"><strong>CodeBuild</strong> exposes secrets in <code>buildspec.yml</code> via <code>env.secrets-manager</code> and masks them in logs. <strong>CloudFormation</strong> resolves <code>resolve:secretsmanager</code> references at deploy time. <strong>RDS</strong> itself can own the master password with <code>ManageMasterUserPassword</code>. <strong>App Runner</strong>, <strong>Batch</strong> and <strong>Elastic Beanstalk</strong> all support secret references in their configuration.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "On ECS the execution role fetches the secret at task start and injects it as an env var, so I use JSON key selectors and remember it does not update until redeploy. On Lambda I read in the init phase or via the Parameters and Secrets extension. For databases I put RDS Proxy in front: it authenticates with the Secrets Manager secret, pools connections, and lets the app use IAM auth so no password ever reaches the application, and rotation becomes invisible."</div>
</div>`,
          examples: [
            `# ECS task definition: inject individual JSON keys; execution role does the fetching
{
  "family": "orders-api",
  "executionRoleArn": "arn:aws:iam::123456789012:role/ordersTaskExecutionRole",
  "taskRoleArn": "arn:aws:iam::123456789012:role/ordersTaskRole",
  "containerDefinitions": [{
    "name": "api",
    "image": "123456789012.dkr.ecr.us-east-1.amazonaws.com/orders-api:1.4.2",
    "secrets": [
      { "name": "DB_USER",     "valueFrom": "arn:aws:secretsmanager:us-east-1:123456789012:secret:prod/orders/db-AbCdEf:username::" },
      { "name": "DB_PASSWORD", "valueFrom": "arn:aws:secretsmanager:us-east-1:123456789012:secret:prod/orders/db-AbCdEf:password::" },
      { "name": "STRIPE_KEY",  "valueFrom": "arn:aws:secretsmanager:us-east-1:123456789012:secret:prod/orders/stripe-XyZ123" }
    ]
  }]
}

# EventBridge rule: redeploy the service whenever the secret finishes rotating
aws events put-rule --name orders-db-rotated --event-pattern '{
  "source": ["aws.secretsmanager"],
  "detail-type": ["AWS Service Event via CloudTrail"],
  "detail": { "eventName": ["RotationSucceeded"], "additionalEventData": { "SecretId": ["arn:aws:secretsmanager:us-east-1:123456789012:secret:prod/orders/db-AbCdEf"] } }
}'
# target: a small Lambda that runs
aws ecs update-service --cluster prod --service orders-api --force-new-deployment`,
            `# RDS Proxy fronting Postgres, authenticating with a Secrets Manager secret
aws rds create-db-proxy --db-proxy-name orders-proxy --engine-family POSTGRESQL \\
  --auth '[{"AuthScheme":"SECRETS","SecretArn":"arn:aws:secretsmanager:us-east-1:123456789012:secret:prod/orders/db-AbCdEf","IAMAuth":"REQUIRED"}]' \\
  --role-arn arn:aws:iam::123456789012:role/rds-proxy-secrets-role \\
  --vpc-subnet-ids subnet-priv-a subnet-priv-b --vpc-security-group-ids sg-db-proxy \\
  --require-tls

aws rds register-db-proxy-targets --db-proxy-name orders-proxy --db-instance-identifiers orders

# Lambda connects with an IAM auth token instead of a password (Node.js, pg)
import { Signer } from "@aws-sdk/rds-signer";
import pg from "pg";

const signer = new Signer({ hostname: process.env.PROXY_HOST, port: 5432, username: "app" });
export const handler = async () => {
  const token = await signer.getAuthToken();               // valid 15 minutes, signed with the execution role
  const client = new pg.Client({ host: process.env.PROXY_HOST, user: "app", password: token,
                                 database: "orders", ssl: { rejectUnauthorized: true } });
  await client.connect();
  const { rows } = await client.query("select count(*) from orders");
  await client.end();
  return rows[0];
};`,
          ],
          questions: [
            {
              question: "In ECS, which role needs permission to read a secret referenced in the task definition, and why?",
              solution: "<p>The <strong>task execution role</strong>. The ECS agent, acting on your behalf before the container starts, calls <code>GetSecretValue</code> (and <code>kms:Decrypt</code> for a customer managed key) to populate the environment variable, then launches the container. The <strong>task role</strong> is what your application code assumes at runtime and only needs secret permissions if the code itself calls the SDK. Keeping them separate means the agent cannot touch your business data and the app cannot read every secret the platform can.</p>",
            },
            {
              question: "How do you extract one field from a JSON secret when injecting it into an ECS container?",
              solution: "<p>Append selectors to the secret ARN in <code>valueFrom</code>: <code>arn:...:secret:prod/orders/db-AbCdEf:password::</code>. The format is <code>arn:json-key:version-stage:version-id</code>; leaving the last two empty means <code>AWSCURRENT</code>. This lets one secret hold <code>username</code>, <code>password</code>, <code>host</code> and <code>port</code> while each container gets only the keys it needs as separate environment variables. Note the full ARN with suffix is required when using JSON keys, so reference it from infrastructure code rather than hard-coding it.</p>",
            },
            {
              question: "Why put RDS Proxy between Lambda and a database, and how does Secrets Manager fit in?",
              solution: "<p>Each Lambda execution environment opens its own database connection, so a burst of invocations can exhaust <code>max_connections</code>. <strong>RDS Proxy</strong> pools and multiplexes those connections and also speeds up failover. It authenticates to the database with a <strong>Secrets Manager secret</strong> that its own IAM role reads, and can require <strong>IAM authentication</strong> from clients, so the function signs a short-lived token with its execution role and never handles a password. Rotation of the database secret is picked up by the proxy automatically, making it invisible to the application.</p>",
            },
            {
              question: "What are the options for consuming Secrets Manager secrets in EKS, and how do the pods get permission?",
              solution: "<p>Two mainstream options. The <strong>Secrets Store CSI Driver</strong> with the AWS Secrets and Configuration Provider mounts secrets as files in the pod (optionally syncing to a Kubernetes Secret) and fetches them at pod start using the pod's service account. The <strong>External Secrets Operator</strong> runs a controller that periodically copies values into Kubernetes Secrets, so existing charts that expect <code>secretKeyRef</code> work unchanged and rotation propagates on the refresh interval. In both cases permission comes from mapping the Kubernetes service account to an IAM role through <strong>IRSA</strong> or <strong>EKS Pod Identity</strong>, never from node instance roles.</p>",
            },
            {
              question: "Why is storing a secret in a Lambda environment variable at deploy time discouraged?",
              solution: "<p>Environment variables are visible to anyone with <code>lambda:GetFunctionConfiguration</code> or console access, are stored in the deployment package metadata and CloudFormation templates, may appear in CI logs, and are <strong>frozen at deploy time</strong> so rotation does not reach them until the next release. Instead, pass only the <strong>secret name</strong> in the environment and have the function read the value in the initialisation phase (cached across warm invocations) or through the Parameters and Secrets extension, so the execution role's permissions and CloudTrail govern every access.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data-secrets.html",
            "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy-setup.html",
            "https://docs.aws.amazon.com/secretsmanager/latest/userguide/integrating_csi_driver.html",
          ],
        },
      ],
    },
  ],
};
