/**
 * AWS IAM - interview prep data
 *
 * Split from the single "IAM" concept in data/awsPrepareData.js into
 * focused Beginner and Advance concepts.
 */
export const awsIam = {
  id: 102,
  category: "AWS IAM",
  themeBgColor: "#FEE2E2",
  textColor: "#991B1B",
  topicColor: "#DC2626",
  lightColor: "#FEF2F2",
  type: [
    {
      id: 1,
      label: "Beginner",
      concepts: [
        {
          topic: "Users, Groups & Roles",
          tags: ["aws", "iam", "identity", "roles", "sts"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>AWS IAM (Identity and Access Management)</strong> answers two questions for every API call: <em>who are you</em> (authentication) and <em>what are you allowed to do</em> (authorization). It is a global service, free of charge, and the control plane for security across every other AWS service. The first thing to master is the set of <strong>identities</strong> IAM offers and when to use each.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The identity types</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Root user:</strong> Created with the account, owns it, and can do things nothing else can (close the account, change support plans, restore some S3 permissions). Protect it with hardware MFA, remove its access keys, and never use it day to day.</li>
  <li><strong>IAM user:</strong> A long-lived identity for one person or application with a console password and/or up to two <strong>access keys</strong>. Convenient but risky, because keys leak and rarely rotate. AWS now recommends <strong>IAM Identity Center</strong> (SSO) for humans and roles for workloads.</li>
  <li><strong>IAM group:</strong> A named collection of users that share policies. Groups cannot be nested and cannot be a principal in a policy; they exist purely to manage permissions for many users at once.</li>
  <li><strong>IAM role:</strong> An identity with permissions but <strong>no long-term credentials</strong>. A trusted principal (an EC2 instance, a Lambda function, a user in another account, a federated identity) <em>assumes</em> it through <strong>AWS STS</strong> and receives temporary credentials that expire after 15 minutes to 12 hours.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">How roles are assumed</h4>
<p style="line-height: 1.75;">Every role has two policies: a <strong>trust policy</strong> stating who may assume it, and one or more <strong>permission policies</strong> stating what the role can do. Assumption happens through STS actions such as <code>sts:AssumeRole</code> (another IAM principal), <code>sts:AssumeRoleWithWebIdentity</code> (OIDC providers like GitHub Actions or Cognito) and <code>sts:AssumeRoleWithSAML</code> (corporate identity providers). AWS services assume roles on your behalf: an EC2 <strong>instance profile</strong>, a Lambda <strong>execution role</strong>, an ECS <strong>task role</strong>. Roles can also be assumed across accounts, making them the primary tool for multi-account access.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Why roles win</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Credentials are short-lived and rotate automatically, so a leak has a limited window.</li>
  <li>Sessions can be narrowed further with <strong>session policies</strong> and tagged for auditing.</li>
  <li>CloudTrail records who assumed which role and when, giving a clear audit chain.</li>
  <li>The same role can be used from many places without distributing secrets.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "IAM users are long-lived identities with passwords or access keys, groups bundle users for shared permissions, and roles are identities with no credentials of their own that a trusted principal assumes via STS for temporary access. I lock down the root user, give humans SSO through Identity Center, and use roles everywhere for workloads so there are no static secrets to leak."</div>
</div>`,
          examples: [
            `# Create a group, attach a managed policy, and add a user to it
aws iam create-group --group-name developers
aws iam attach-group-policy --group-name developers \\
  --policy-arn arn:aws:iam::aws:policy/ReadOnlyAccess
aws iam create-user --user-name alice
aws iam add-user-to-group --group-name developers --user-name alice

# Create a role that trusts Lambda, then see how it is assumed
cat > trust.json <<'EOF'
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "Service": "lambda.amazonaws.com" },
    "Action": "sts:AssumeRole"
  }]
}
EOF
aws iam create-role --role-name orders-fn-role --assume-role-policy-document file://trust.json
aws iam attach-role-policy --role-name orders-fn-role \\
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole

# Assume a role yourself and check who you are
aws sts assume-role --role-arn arn:aws:iam::123456789012:role/deploy --role-session-name ci
aws sts get-caller-identity

# Audit: find users with old access keys
aws iam generate-credential-report
aws iam get-credential-report --query 'Content' --output text | base64 -d | cut -d, -f1,9,10,15`,
          ],
          questions: [
            {
              question: "What is the difference between an IAM user and an IAM role?",
              solution: "<p>An <strong>IAM user</strong> is a permanent identity with long-lived credentials (password, access keys) that belong to one person or application. An <strong>IAM role</strong> has no credentials of its own; a trusted principal <em>assumes</em> it and receives <strong>temporary credentials</strong> from STS (15 minutes to 12 hours). Roles are preferred because credentials rotate automatically, can be scoped per session, and can be assumed across accounts or by AWS services such as EC2 and Lambda.</p>",
            },
            {
              question: "Why should you avoid using the root user, and how do you secure it?",
              solution: "<p>The root user has <strong>unrestricted access</strong> that cannot be limited by IAM policies, permissions boundaries or (mostly) SCPs, so a compromised root account means a compromised AWS account. Secure it by enabling <strong>hardware MFA</strong>, deleting any root access keys, using a strong unique password stored in a vault, setting up account recovery contacts, and creating CloudWatch or EventBridge alerts on any root login via CloudTrail. Use it only for the handful of tasks that require it, such as changing the account's support plan.</p>",
            },
            {
              question: "What are IAM groups for, and can a group be used as a principal in a policy?",
              solution: "<p>Groups let you attach a set of policies once and apply them to many users, so permission management scales with team size instead of headcount. A group is <strong>not an identity</strong>: it cannot log in, cannot own credentials, and <strong>cannot appear as a Principal</strong> in a resource-based or trust policy. Groups also cannot contain other groups. If you need a group of principals in a resource policy, you list the users or roles individually or use conditions on tags or organisation IDs.</p>",
            },
            {
              question: "What is the difference between a trust policy and a permission policy on a role?",
              solution: "<p>The <strong>trust policy</strong> is a resource-based policy attached to the role that defines <strong>who may assume it</strong>: it names principals (an AWS service, an account, a user, a federated provider) and the <code>sts:AssumeRole*</code> action. The <strong>permission policies</strong> are identity-based policies that define <strong>what the role can do</strong> once assumed. Both must allow for a call to succeed; a common mistake is granting permissions but forgetting to trust the caller, which yields an AccessDenied on the AssumeRole call itself.</p>",
            },
            {
              question: "How would you give a new engineer access to AWS today?",
              solution: "<p>Rather than creating an IAM user with a password and keys, add them to <strong>IAM Identity Center</strong> (or your external IdP synced to it) and assign them to a group that maps to <strong>permission sets</strong> per account. They sign in through the SSO portal with MFA and receive short-lived credentials via the CLI (<code>aws sso login</code>). This gives central offboarding, no long-lived keys, and consistent access across a multi-account organisation.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html",
          ],
        },
        {
          topic: "IAM Policy Structure",
          tags: ["aws", "iam", "policies", "json", "least privilege"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  IAM permissions are expressed as <strong>JSON policy documents</strong>. Every policy is a list of statements, and every statement says whether some <strong>actions</strong> on some <strong>resources</strong> are allowed or denied, optionally under certain <strong>conditions</strong>. Being able to read and write these documents fluently is expected of anyone who touches AWS.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Anatomy of a statement</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Version:</strong> Always <code>"2012-10-17"</code>. The older 2008 version does not support policy variables.</li>
  <li><strong>Sid:</strong> Optional statement ID for readability.</li>
  <li><strong>Effect:</strong> <code>Allow</code> or <code>Deny</code>.</li>
  <li><strong>Principal:</strong> Who the statement applies to. Present only in <strong>resource-based</strong> policies (bucket policies, trust policies); identity-based policies imply the attached identity.</li>
  <li><strong>Action / NotAction:</strong> API operations such as <code>s3:GetObject</code>. Wildcards like <code>s3:Get*</code> are allowed.</li>
  <li><strong>Resource / NotResource:</strong> ARNs the statement covers, for example <code>arn:aws:s3:::my-bucket/*</code>. Some actions (like <code>s3:ListAllMyBuckets</code>) only accept <code>*</code>.</li>
  <li><strong>Condition:</strong> Operators (<code>StringEquals</code>, <code>ArnLike</code>, <code>Bool</code>, <code>IpAddress</code>, <code>DateGreaterThan</code>) applied to <strong>condition keys</strong> such as <code>aws:SourceIp</code>, <code>aws:PrincipalOrgID</code>, <code>aws:SecureTransport</code>, <code>aws:RequestTag/team</code>, or service-specific keys like <code>s3:prefix</code>.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Where policies live</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>AWS managed policies:</strong> Maintained by AWS (<code>AmazonS3ReadOnlyAccess</code>). Convenient starting points but usually broader than you need.</li>
  <li><strong>Customer managed policies:</strong> Your own reusable, versioned documents (up to five versions, easy rollback). Preferred for production.</li>
  <li><strong>Inline policies:</strong> Embedded in one user, group or role and deleted with it. Good for one-off tight coupling, hard to audit at scale.</li>
  <li><strong>Resource-based policies:</strong> Attached to the resource itself (S3, SQS, SNS, KMS, Lambda, Secrets Manager, ECR). They carry a <code>Principal</code> and can grant access across accounts directly.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Policy variables and ABAC</h4>
<p style="line-height: 1.75;">Variables such as <code>aws:username</code>, <code>aws:userid</code> and <code>aws:PrincipalTag/team</code> let one policy serve many identities: for example allow each user to read only <code>home/&lt;username&gt;/*</code>. Comparing principal tags to resource tags (<code>aws:ResourceTag/team</code>) is <strong>attribute-based access control (ABAC)</strong>, which scales far better than one policy per team. Size limits apply: 6,144 characters for managed policies and 10,240 for a role's combined inline policies.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Writing good policies</h4>
<p style="line-height: 1.75;">Start from what the workload actually calls, list explicit actions instead of <code>*</code>, scope resources to ARNs, add guard-rail conditions, and validate with <strong>IAM Access Analyzer policy validation</strong> and the <strong>policy simulator</strong> before deploying. Access Analyzer can also generate a least-privilege policy from CloudTrail activity.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "A policy is JSON with statements of Effect, Action, Resource and optional Condition; resource-based policies add a Principal. I prefer customer-managed policies for reuse and versioning, scope actions and ARNs tightly, use conditions like aws:PrincipalOrgID and aws:SecureTransport as guard rails, and lean on tag-based ABAC and Access Analyzer to keep least privilege manageable."</div>
</div>`,
          examples: [
            `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ReadOwnUploads",
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject"],
      "Resource": "arn:aws:s3:::my-app-uploads/\${aws:userid}/*"
    },
    {
      "Sid": "ListOnlyOwnPrefix",
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::my-app-uploads",
      "Condition": { "StringLike": { "s3:prefix": ["\${aws:userid}/*"] } }
    },
    {
      "Sid": "DenyInsecureTransport",
      "Effect": "Deny",
      "Action": "s3:*",
      "Resource": ["arn:aws:s3:::my-app-uploads", "arn:aws:s3:::my-app-uploads/*"],
      "Condition": { "Bool": { "aws:SecureTransport": "false" } }
    }
  ]
}`,
            `# ABAC: a principal may manage EC2 only for resources tagged with their own team
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["ec2:StartInstances", "ec2:StopInstances", "ec2:RebootInstances"],
    "Resource": "arn:aws:ec2:*:*:instance/*",
    "Condition": {
      "StringEquals": { "aws:ResourceTag/team": "\${aws:PrincipalTag/team}" }
    }
  }]
}

# Validate and simulate before attaching
aws accessanalyzer validate-policy --policy-type IDENTITY_POLICY \\
  --policy-document file://policy.json
aws iam simulate-custom-policy --policy-input-list file://policy.json \\
  --action-names s3:GetObject --resource-arns arn:aws:s3:::my-app-uploads/AIDAEXAMPLE/file.txt

# Create a customer managed policy and roll back to a previous version
aws iam create-policy --policy-name AppUploadsAccess --policy-document file://policy.json
aws iam create-policy-version --policy-arn arn:aws:iam::123456789012:policy/AppUploadsAccess \\
  --policy-document file://policy-v2.json --set-as-default
aws iam set-default-policy-version --policy-arn arn:aws:iam::123456789012:policy/AppUploadsAccess --version-id v1`,
          ],
          questions: [
            {
              question: "What is the difference between an identity-based policy and a resource-based policy?",
              solution: "<p><strong>Identity-based</strong> policies attach to a principal (user, group, role) and say what that principal can do. <strong>Resource-based</strong> policies attach to a resource (S3 bucket, SQS queue, KMS key, Lambda function) and say which principals can act on it. Resource policies have a <code>Principal</code> field and can grant access to other accounts directly; identity policies cannot. A role's trust policy is a resource-based policy on the role itself.</p>",
            },
            {
              question: "What are the elements of an IAM policy statement?",
              solution: "<p>A statement has an <strong>Effect</strong> (Allow or Deny), one or more <strong>Actions</strong> (or NotAction) naming API operations, one or more <strong>Resources</strong> (or NotResource) as ARNs, and an optional <strong>Condition</strong> block of operators applied to condition keys. Resource-based policies also include a <strong>Principal</strong> (or NotPrincipal). Optional <strong>Sid</strong> labels the statement, and the document-level <strong>Version</strong> should always be 2012-10-17 so variables and newer features work.</p>",
            },
            {
              question: "Compare AWS managed, customer managed and inline policies.",
              solution: "<p><strong>AWS managed</strong> policies are written and updated by AWS, are quick to attach, but tend to be broad and you cannot edit them. <strong>Customer managed</strong> policies are your own standalone documents that can be attached to many identities, are <strong>versioned</strong> (five versions, easy rollback) and show up cleanly in audits, making them the default for production. <strong>Inline</strong> policies are embedded in a single identity and vanish with it; they are useful when a policy must never be reused by accident but are harder to review at scale.</p>",
            },
            {
              question: "What is attribute-based access control in IAM and why is it useful?",
              solution: "<p><strong>ABAC</strong> grants permissions by comparing <strong>tags on the principal</strong> (for example <code>aws:PrincipalTag/team</code>) with <strong>tags on the resource</strong> (<code>aws:ResourceTag/team</code>) inside a policy condition, rather than enumerating resources per team. One policy then serves every team, new projects need only correct tags instead of new policies, and you stay well under IAM policy size limits. It requires disciplined tagging, usually enforced with <code>aws:RequestTag</code> conditions and tag policies in Organizations.</p>",
            },
            {
              question: "How do you check that a policy does what you intend before deploying it?",
              solution: "<p>Run <strong>IAM Access Analyzer policy validation</strong> to catch syntax errors, overly permissive wildcards and security warnings, then use the <strong>IAM policy simulator</strong> (<code>simulate-custom-policy</code> or <code>simulate-principal-policy</code>) to test specific action and resource combinations, including the effect of boundaries and SCPs. For an existing workload, Access Analyzer can <strong>generate a policy from CloudTrail</strong> activity so you start from what was actually used rather than guessing.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction_attribute-based-access-control.html",
          ],
        },
        {
          topic: "Policy Evaluation Logic",
          tags: ["aws", "iam", "evaluation", "explicit deny", "authorization"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  When a request reaches AWS, the service gathers every policy that could apply and runs a fixed <strong>evaluation algorithm</strong> to decide Allow or Deny. Knowing this algorithm is what lets you debug an unexpected <code>AccessDenied</code> in minutes instead of hours, and interviewers nearly always ask about it.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The policy types that participate</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Service Control Policies (SCPs)</strong> and <strong>Resource Control Policies (RCPs)</strong> from AWS Organizations: account-wide ceilings.</li>
  <li><strong>Resource-based policies</strong> on the target resource.</li>
  <li><strong>Identity-based policies</strong> on the calling user, group or role.</li>
  <li><strong>Permissions boundaries</strong> on the calling identity.</li>
  <li><strong>Session policies</strong> passed when a role was assumed or federated.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The algorithm, single account</h4>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li>Start with <strong>implicit deny</strong>: nothing is allowed until something allows it.</li>
  <li>Look for an <strong>explicit Deny</strong> in any applicable policy. If found, the answer is Deny and evaluation stops. Deny always wins.</li>
  <li>Check <strong>SCPs</strong>: if no SCP allows the action for this account, Deny.</li>
  <li>Check <strong>resource-based policy</strong>: if it explicitly allows the principal, the request is allowed in the same account without consulting identity policies (except for IAM role sessions in some services, where both are consulted).</li>
  <li>Check <strong>identity-based policies</strong>: at least one Allow is required.</li>
  <li>If a <strong>permissions boundary</strong> exists, it must also allow the action; the effective permission is the intersection.</li>
  <li>If a <strong>session policy</strong> exists, it must also allow the action.</li>
  <li>Only if every applicable layer allows and none denies is the final decision <strong>Allow</strong>.</li>
</ol>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Cross-account evaluation</h4>
<p style="line-height: 1.75;">When the caller and the resource are in different accounts, the request must be allowed on <strong>both sides</strong>: the caller's identity policy (and its SCPs and boundaries) must allow the action, and the resource-based policy in the target account must allow that principal. A resource policy alone is not enough across accounts, which is why cross-account S3 access needs both a bucket policy and a matching identity policy.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Common gotchas</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><code>NotAction</code> with Allow grants everything except the listed actions, which is far broader than people expect.</li>
  <li>A <code>Deny</code> with <code>StringNotEquals</code> on a condition key that is missing from the request will match, and deny. Use <code>...IfExists</code> or <code>Null</code> checks carefully.</li>
  <li>Some actions are not resource-scoped and require <code>"Resource": "*"</code>.</li>
  <li>The request context (source IP, VPC endpoint, TLS) is what conditions evaluate against, not the identity's attributes alone.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Everything starts as implicit deny. An explicit deny anywhere wins immediately. Otherwise the request needs an allow that survives SCPs, the permissions boundary and any session policy. Within one account an allow in either the identity policy or the resource policy is enough; across accounts both sides must allow. When I debug AccessDenied I check the error's encoded reason, then walk those layers in order."</div>
</div>`,
          examples: [
            `# Debugging AccessDenied: read the exact reason from the error
aws s3 cp s3://prod-reports/q3.csv .
# An error occurred (AccessDenied) when calling the GetObject operation:
#   User: arn:aws:sts::123456789012:assumed-role/analyst/alice is not authorized to perform:
#   s3:GetObject on resource: "arn:aws:s3:::prod-reports/q3.csv" with an explicit deny in a
#   service control policy

# Simulate the call for the principal, including SCP and boundary effects
aws iam simulate-principal-policy \\
  --policy-source-arn arn:aws:iam::123456789012:role/analyst \\
  --action-names s3:GetObject \\
  --resource-arns arn:aws:s3:::prod-reports/q3.csv \\
  --query 'EvaluationResults[].[EvalActionName,EvalDecision,MatchedStatements[].SourcePolicyId]'

# Which policies does this role actually have?
aws iam list-attached-role-policies --role-name analyst
aws iam list-role-policies --role-name analyst
aws iam get-role --role-name analyst --query 'Role.PermissionsBoundary'

# Find the denied call in CloudTrail (last hour) and grep the error code
aws cloudtrail lookup-events --lookup-attributes AttributeKey=EventName,AttributeValue=GetObject \\
  --start-time $(date -u -v-1H +%Y-%m-%dT%H:%M:%SZ) \\
  --query 'Events[].CloudTrailEvent' --output text | grep -o '"errorCode":"[^"]*"' | sort | uniq -c`,
            `# A guard-rail Deny that beats every Allow: block S3 access from outside the org's VPC endpoint
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "DenyOutsideVpce",
    "Effect": "Deny",
    "Principal": "*",
    "Action": "s3:*",
    "Resource": ["arn:aws:s3:::internal-data", "arn:aws:s3:::internal-data/*"],
    "Condition": {
      "StringNotEqualsIfExists": { "aws:SourceVpce": "vpce-0123456789abcdef0" },
      "Bool": { "aws:ViaAWSService": "false" }
    }
  }]
}`,
          ],
          questions: [
            {
              question: "Explain how IAM policy evaluation works when there are multiple policies.",
              solution: "<p>All requests start as <strong>implicit deny</strong>. AWS evaluates every applicable policy: SCPs, resource-based policies, permissions boundaries, session policies, and identity-based policies. If any policy has an <strong>explicit Deny</strong> that matches, the request is denied, full stop. Otherwise it is allowed only if an Allow exists and is not filtered out by an SCP or permissions boundary. Cross-account access requires an Allow in both the caller's identity policy and the target resource policy.</p>",
            },
            {
              question: "Within a single account, is a resource-based policy alone enough to grant access?",
              solution: "<p>Usually yes. For most services, if the <strong>resource policy explicitly allows</strong> the principal (for example a bucket policy naming a role ARN), the request is allowed even when the identity has no matching identity-based policy, provided no explicit deny, SCP or permissions boundary blocks it. The notable exception is that permissions boundaries and SCPs still apply, and IAM role <strong>sessions</strong> named by session ARN in some services require both. Across accounts a resource policy alone is never sufficient.</p>",
            },
            {
              question: "A developer has AdministratorAccess but still gets AccessDenied creating an S3 bucket in eu-west-1. What could cause this?",
              solution: "<p>An explicit or implicit deny from a layer above the identity policy. The most common culprits are a <strong>Service Control Policy</strong> that denies actions outside approved regions (<code>aws:RequestedRegion</code>), a <strong>permissions boundary</strong> on the role that does not include <code>s3:CreateBucket</code>, or a <strong>session policy</strong> passed during role assumption. The AccessDenied message now names the policy type responsible; the policy simulator with the principal ARN reproduces the decision including SCPs.</p>",
            },
            {
              question: "What is the difference between an implicit deny and an explicit deny?",
              solution: "<p>An <strong>implicit deny</strong> is the default state: no policy grants the action, so it is refused, but any matching Allow would flip it. An <strong>explicit deny</strong> is a statement with <code>Effect: Deny</code> that matches the request; it cannot be overridden by any Allow in any policy type, which makes it the right tool for <strong>guard rails</strong> such as blocking non-TLS access, unapproved regions, or deletion of audit logs. Because it is absolute, explicit denies should be narrow and well documented.</p>",
            },
            {
              question: "Why is NotAction with Allow dangerous, and when is it appropriate?",
              solution: "<p><code>Allow</code> plus <code>NotAction</code> grants <strong>every action except</strong> those listed, including services and actions that did not exist when the policy was written, so it silently widens over time. It is reasonable for break-glass or administrator-style roles where you want almost everything except, say, IAM and Organizations changes. For normal workloads use explicit Action lists, or combine <code>NotAction</code> with <code>Deny</code>, which denies everything except the listed actions and is a much safer pattern for region or service restrictions.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic-cross-account.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/troubleshoot_access-denied.html",
          ],
        },
        {
          topic: "MFA, Access Keys & Best Practices",
          tags: ["aws", "iam", "mfa", "access keys", "security", "least privilege"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Most cloud breaches trace back to <strong>leaked long-lived credentials</strong> or <strong>over-broad permissions</strong>, not to exotic exploits. AWS publishes a short list of IAM best practices, and interviewers expect you to know them and, more importantly, to explain the reasoning and the tooling behind each one.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Protect human access</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>MFA everywhere:</strong> Hardware or FIDO2 security keys for the root user and privileged roles, virtual TOTP at minimum for everyone else. Enforce it with a policy that denies all actions unless <code>aws:MultiFactorAuthPresent</code> is true, and require it to assume sensitive roles.</li>
  <li><strong>Federate, do not create users:</strong> Use <strong>IAM Identity Center</strong> or SAML/OIDC federation so people sign in with their corporate identity and receive temporary credentials. Joiners and leavers are then handled in one directory.</li>
  <li><strong>Strong password policy</strong> for any remaining console users, and disable them when unused.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Eliminate or govern access keys</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Workloads on AWS should use <strong>roles</strong> (instance profiles, execution roles, task roles), and CI outside AWS should use <strong>OIDC federation</strong>. Keys should be the exception.</li>
  <li>Where keys are unavoidable, <strong>rotate</strong> them (create second key, switch, deactivate, delete), track age with the <strong>credential report</strong>, and alert on keys older than 90 days.</li>
  <li>Never commit keys; use git secret scanners, and know that AWS automatically applies a quarantine policy to keys found on public GitHub.</li>
  <li>Use <strong>IAM Access Analyzer unused access</strong> findings to remove keys, roles and permissions nobody has used in 90 days.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Least privilege in practice</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Start narrow with AWS managed policies for exploration, then replace them with customer-managed policies generated from CloudTrail activity.</li>
  <li>Add <strong>condition guard rails</strong>: <code>aws:SecureTransport</code>, <code>aws:PrincipalOrgID</code>, <code>aws:SourceVpce</code>, <code>aws:RequestedRegion</code>.</li>
  <li>Prefer <strong>ABAC</strong> tags over ever-growing resource lists, and use <strong>permissions boundaries</strong> when delegating role creation.</li>
  <li>Separate duties across accounts with AWS Organizations and SCPs so even an admin in one account cannot touch another.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Detect and respond</h4>
<p style="line-height: 1.75;">Enable <strong>CloudTrail</strong> in every region into a locked-down account, turn on <strong>GuardDuty</strong> to flag credential misuse, and alert on root logins, IAM policy changes and console logins without MFA. Keep a rehearsed playbook for a leaked key: deactivate it, revoke active role sessions, review CloudTrail for what it did, and rotate downstream secrets.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "I lock the root user with hardware MFA, federate humans through Identity Center with MFA enforced, and give workloads roles instead of keys. Where keys exist I rotate them and watch age in the credential report, I generate least-privilege policies from CloudTrail with Access Analyzer, add deny guard rails for TLS and regions, and monitor with CloudTrail and GuardDuty so a leak is caught fast."</div>
</div>`,
          examples: [
            `# Deny everything (except MFA setup) when the caller has not used MFA
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "DenyAllExceptMfaSetupWithoutMfa",
    "Effect": "Deny",
    "NotAction": [
      "iam:CreateVirtualMFADevice",
      "iam:EnableMFADevice",
      "iam:ListMFADevices",
      "iam:ResyncMFADevice",
      "sts:GetSessionToken"
    ],
    "Resource": "*",
    "Condition": { "BoolIfExists": { "aws:MultiFactorAuthPresent": "false" } }
  }]
}`,
            `# Rotate an access key safely: create, switch, deactivate, verify, delete
aws iam create-access-key --user-name ci-legacy            # new key (2 max per user)
# ...update the consumer to use the new key, then:
aws iam update-access-key --user-name ci-legacy --access-key-id AKIAOLDKEY --status Inactive
aws iam get-access-key-last-used --access-key-id AKIAOLDKEY # confirm nothing still uses it
aws iam delete-access-key --user-name ci-legacy --access-key-id AKIAOLDKEY

# Set an account password policy
aws iam update-account-password-policy --minimum-password-length 14 \\
  --require-symbols --require-numbers --require-uppercase-characters \\
  --require-lowercase-characters --max-password-age 90 --password-reuse-prevention 24

# Find unused roles, keys and permissions with Access Analyzer
aws accessanalyzer create-analyzer --analyzer-name unused --type ACCOUNT_UNUSED_ACCESS \\
  --configuration '{"unusedAccess":{"unusedAccessAge":90}}'
aws accessanalyzer list-findings-v2 --analyzer-arn arn:aws:access-analyzer:us-east-1:123456789012:analyzer/unused

# Alert on console logins without MFA (CloudWatch Logs metric filter on the CloudTrail log group)
aws logs put-metric-filter --log-group-name CloudTrail/logs --filter-name NoMfaConsoleLogin \\
  --filter-pattern '{ ($.eventName = "ConsoleLogin") && ($.additionalEventData.MFAUsed != "Yes") }' \\
  --metric-transformations metricName=NoMfaConsoleLogin,metricNamespace=Security,metricValue=1`,
          ],
          questions: [
            {
              question: "How do you enforce MFA for IAM users in an account?",
              solution: "<p>Attach a policy (typically to a group all users belong to) with an <strong>explicit Deny on all actions</strong> except the handful needed to enrol an MFA device, conditioned on <code>BoolIfExists: aws:MultiFactorAuthPresent = false</code>. Users can then log in but do nothing until they register MFA and re-authenticate. For roles, add the same condition to the <strong>trust policy</strong> so <code>AssumeRole</code> fails without MFA. Long term, move humans to <strong>Identity Center</strong>, where MFA is enforced centrally by the identity provider.</p>",
            },
            {
              question: "An access key was accidentally pushed to a public GitHub repository. What do you do?",
              solution: "<p>Treat it as compromised immediately. <strong>Deactivate</strong> the key (do not just delete it, so you can still trace it), then review <strong>CloudTrail</strong> for every call made with that key ID and roll back any changes such as new users, roles or keys the attacker created. Revoke any role sessions it may have assumed, rotate any secrets it could read, remove the key from git history, and check for GuardDuty findings. AWS also auto-attaches an <code>AWSCompromisedKeyQuarantine</code> policy when it detects public keys, but you should not rely on that. Finally, replace the key with a role or OIDC federation so it cannot recur.</p>",
            },
            {
              question: "Why does AWS recommend against long-lived access keys, and what should replace them?",
              solution: "<p>Long-lived keys never expire on their own, get copied into config files, CI variables and laptops, and are the most common way AWS accounts are breached. Workloads inside AWS should use <strong>IAM roles</strong> delivered through instance profiles, Lambda execution roles or ECS task roles. External CI systems should use <strong>OIDC federation</strong> to assume a role with a JWT. Humans should sign in through <strong>IAM Identity Center</strong> and get short-lived CLI credentials with <code>aws sso login</code>. Remaining keys should be rotated and their age tracked with the credential report.</p>",
            },
            {
              question: "What is the IAM credential report and how is it used?",
              solution: "<p>The credential report is a CSV listing every IAM user in the account with the age and last-used date of their password and each access key, whether MFA is enabled, and when the user last logged in. It is generated with <code>generate-credential-report</code> and fetched with <code>get-credential-report</code>. Security teams run it on a schedule to find <strong>users without MFA</strong>, <strong>keys older than the rotation policy</strong>, and <strong>dormant identities</strong> that should be removed, and it is a standard artefact for compliance audits.</p>",
            },
            {
              question: "How would you move an account from broad AWS managed policies to least privilege without breaking things?",
              solution: "<p>Enable CloudTrail data and management events, then use <strong>IAM Access Analyzer policy generation</strong>, which reads 90 days of activity for a role and produces a policy containing only the actions actually used. Review it, tighten resource ARNs, attach it alongside the existing broad policy, and monitor for AccessDenied errors in CloudTrail or application logs over a burn-in period. Then remove the broad policy. Use <strong>unused access findings</strong> to keep trimming over time, and add explicit deny guard rails for the truly dangerous actions.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_getting-report.html",
          ],
        },
      ],
    },
    {
      id: 2,
      label: "Advance",
      concepts: [
        {
          topic: "Permissions Boundaries & SCPs",
          tags: ["aws", "iam", "permissions boundary", "scp", "organizations", "guardrails"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Identity policies grant permissions. <strong>Permissions boundaries</strong> and <strong>Service Control Policies (SCPs)</strong> do the opposite: they set the <strong>maximum</strong> permissions an identity or an account can ever have, without granting anything themselves. They are the tools that let a platform team hand out autonomy to developers and business units safely, which is why they appear in senior-level interviews.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Permissions boundaries</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>A <strong>managed policy</strong> attached to a user or role as its boundary. The identity's effective permissions are the <strong>intersection</strong> of the boundary and its identity policies.</li>
  <li>The boundary <strong>grants nothing</strong>: an action allowed by the boundary but absent from the identity policies is still denied.</li>
  <li>Classic use: <strong>delegated role creation</strong>. Developers get <code>iam:CreateRole</code> and <code>iam:AttachRolePolicy</code>, but only when the new role carries a specific boundary (<code>iam:PermissionsBoundary</code> condition), and they cannot modify or remove boundaries. They can therefore never create a role more powerful than the boundary allows.</li>
  <li>Boundaries do not apply to resource-based policies granting access to the identity from other accounts, and they do not limit the root user.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Service Control Policies</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Defined in <strong>AWS Organizations</strong> and attached to the root, organisational units (OUs) or individual accounts. Inherited down the tree, and the effective SCP is the intersection of every level.</li>
  <li>Apply to <strong>every principal in the account including the account root user</strong>, but never to the management account itself and never to service-linked roles.</li>
  <li>Like boundaries, they only filter: a permission needs both an SCP allow and an IAM allow.</li>
  <li>Default is <code>FullAWSAccess</code>; most organisations keep it and layer <strong>deny-list</strong> SCPs on top: deny leaving the organisation, deny disabling CloudTrail or GuardDuty, deny regions outside an approved list, deny root user actions, deny deleting the boundary policy.</li>
  <li>Limits: 5 SCPs per target, 5,120 characters each, and they do not support the <code>Principal</code> element or wildcards mid-string in older versions.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Resource Control Policies</h4>
<p style="line-height: 1.75;"><strong>RCPs</strong> are the newer resource-side counterpart: organisation-wide policies that cap what <em>any</em> principal can do to resources in member accounts, for example denying S3 access from principals outside the organisation regardless of individual bucket policies. Together, SCPs (principal side) and RCPs (resource side) form the data perimeter.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Putting it together</h4>
<p style="line-height: 1.75;">A typical layered design: SCPs on OUs enforce organisation-wide guard rails; permissions boundaries constrain what application teams can grant to their own workloads; identity policies do the actual granting; resource policies plus RCPs stop data leaving the perimeter. When an access decision surprises you, remember the effective permission is the intersection of all of these.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Boundaries and SCPs never grant, they cap. A permissions boundary is a managed policy that limits one identity, which I use so developers can create roles for their own services without exceeding what the boundary allows. SCPs are Organizations-level ceilings on whole accounts, applied even to root, and I use them as deny-list guard rails for regions, CloudTrail and leaving the org. Effective permission is the intersection of every layer."</div>
</div>`,
          examples: [
            `# Delegated role creation: developers may create roles only if they attach the team boundary
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "CreateRolesOnlyWithBoundary",
      "Effect": "Allow",
      "Action": ["iam:CreateRole", "iam:AttachRolePolicy", "iam:PutRolePolicy"],
      "Resource": "arn:aws:iam::123456789012:role/app-*",
      "Condition": {
        "StringEquals": {
          "iam:PermissionsBoundary": "arn:aws:iam::123456789012:policy/DeveloperBoundary"
        }
      }
    },
    {
      "Sid": "NeverTouchBoundaries",
      "Effect": "Deny",
      "Action": [
        "iam:DeleteRolePermissionsBoundary",
        "iam:DeleteUserPermissionsBoundary",
        "iam:CreatePolicyVersion",
        "iam:DeletePolicy",
        "iam:SetDefaultPolicyVersion"
      ],
      "Resource": "arn:aws:iam::123456789012:policy/DeveloperBoundary"
    }
  ]
}

# Attach the boundary when creating a role
aws iam create-role --role-name app-orders-fn \\
  --assume-role-policy-document file://trust.json \\
  --permissions-boundary arn:aws:iam::123456789012:policy/DeveloperBoundary`,
            `# SCP: allow only approved regions, but never block global services
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "DenyUnapprovedRegions",
    "Effect": "Deny",
    "NotAction": [
      "iam:*", "sts:*", "organizations:*", "support:*", "budgets:*",
      "cloudfront:*", "route53:*", "waf:*", "shield:*", "health:*"
    ],
    "Resource": "*",
    "Condition": {
      "StringNotEquals": { "aws:RequestedRegion": ["us-east-1", "eu-west-1"] },
      "ArnNotLike": { "aws:PrincipalARN": "arn:aws:iam::*:role/OrgBreakGlass" }
    }
  }]
}

# Attach to an OU and inspect the effective policy
aws organizations create-policy --name DenyUnapprovedRegions --type SERVICE_CONTROL_POLICY \\
  --description "Region guard rail" --content file://scp.json
aws organizations attach-policy --policy-id p-abc123 --target-id ou-root-workloads
aws organizations list-policies-for-target --target-id 123456789012 --filter SERVICE_CONTROL_POLICY`,
          ],
          questions: [
            {
              question: "What is a permissions boundary and when would you use one?",
              solution: "<p>A permissions boundary is a managed policy attached to a user or role that sets the <strong>maximum</strong> permissions that identity can have; the effective permissions are the intersection of the boundary and the identity's policies. It is used for <strong>delegated administration</strong>: you let developers create roles for their Lambda functions, but require every role to carry a boundary so they cannot grant themselves more than the boundary allows.</p>",
            },
            {
              question: "How do SCPs differ from permissions boundaries?",
              solution: "<p>Both are filters that cap permissions without granting any, but they apply at different scopes. A <strong>permissions boundary</strong> is attached to a <strong>single IAM user or role</strong> inside one account and is managed by that account's IAM admins. An <strong>SCP</strong> is attached in <strong>AWS Organizations</strong> to accounts or OUs, applies to <strong>every principal in those accounts including root</strong>, and can only be changed from the management account. SCPs are organisation guard rails; boundaries are for delegating role creation within an account.</p>",
            },
            {
              question: "If an SCP allows an action and the identity policy denies it, what happens? And the reverse?",
              solution: "<p>The request is denied in both cases. An SCP allow only means the action is <strong>available</strong> to the account; the principal still needs an identity or resource policy allow, and an explicit deny in any policy wins. In the reverse case, an identity policy allow is <strong>filtered out</strong> because the SCP does not permit the action for that account, so the result is an implicit deny from the SCP layer. The effective permission is always the intersection.</p>",
            },
            {
              question: "How would you prevent a developer from escalating privileges when you allow them to create IAM roles?",
              solution: "<p>Grant <code>iam:CreateRole</code>, <code>iam:AttachRolePolicy</code> and <code>iam:PutRolePolicy</code> only with a <strong>condition that <code>iam:PermissionsBoundary</code> equals your approved boundary ARN</strong>, restrict the resource to a role name prefix, and add an explicit <strong>Deny</strong> on deleting or modifying that boundary policy and on <code>iam:DeleteRolePermissionsBoundary</code>. Also deny <code>iam:PassRole</code> to roles outside their prefix so they cannot hand a powerful existing role to a service. Every role they create is then capped by the boundary regardless of what policies they attach.</p>",
            },
            {
              question: "What should a baseline set of SCPs include for a new organisation?",
              solution: "<p>Common deny-list guard rails are: deny <code>organizations:LeaveOrganization</code>; deny disabling or deleting <strong>CloudTrail</strong>, <strong>GuardDuty</strong>, <strong>Config</strong> and Security Hub; deny actions in <strong>unapproved regions</strong> with a NotAction carve-out for global services; deny all <strong>root user</strong> actions via <code>aws:PrincipalArn</code>; deny creating IAM users or access keys where SSO is mandated; and protect key resources such as the log archive bucket and the permissions boundary policy. Attach them to OUs rather than individual accounts so new accounts inherit them automatically, and always keep a break-glass exception.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html",
            "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html",
            "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_rcps.html",
          ],
        },
        {
          topic: "Cross-Account Access & STS",
          tags: ["aws", "iam", "sts", "cross-account", "assume role", "external id"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Modern AWS estates are <strong>multi-account</strong>: separate accounts for prod, staging, shared services, security and logging. Work constantly crosses those boundaries, so knowing how to grant, assume and audit <strong>cross-account access</strong> with the <strong>Security Token Service (STS)</strong> is essential. The two mechanisms are assuming a role in the other account, or letting a resource policy in the other account name your principal directly.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Pattern 1: assume a role in the target account</h4>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li>Account B (target) creates a role whose <strong>trust policy</strong> names account A (or a specific role in A) as principal for <code>sts:AssumeRole</code>.</li>
  <li>The role's permission policies grant what B is willing to let A do.</li>
  <li>Account A grants its principal <code>sts:AssumeRole</code> on that role ARN.</li>
  <li>The caller in A calls <code>AssumeRole</code>, receives temporary credentials, and acts inside B as that role. CloudTrail in both accounts records the hop, and the session name identifies the caller.</li>
</ol>
<p style="line-height: 1.75;">Trusting the whole account (<code>arn:aws:iam::111111111111:root</code>) delegates the decision of <em>which</em> principals may assume the role to account A's own IAM policies; trusting specific role ARNs is tighter. <strong>Role chaining</strong> (assuming a role from an assumed role) is allowed but sessions are capped at one hour.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Pattern 2: resource-based policy</h4>
<p style="line-height: 1.75;">Services with resource policies (S3, KMS, SQS, SNS, Lambda, Secrets Manager, ECR, EventBridge) can name a principal from another account directly. The caller keeps its own identity, which is simpler and avoids credential juggling, but the caller also needs an identity policy allowing the action, and for S3 you must think about object ownership (use <strong>Bucket owner enforced</strong>). Use <code>aws:PrincipalOrgID</code> to allow the whole organisation without listing accounts.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The confused deputy problem and External ID</h4>
<p style="line-height: 1.75;">When a <strong>third-party SaaS</strong> assumes a role in your account, an attacker who is also a customer of that SaaS could point it at <em>your</em> role ARN. The fix is an <strong>External ID</strong>: a secret value the vendor must pass in <code>sts:AssumeRole</code> that your trust policy checks with <code>sts:ExternalId</code>. For AWS services acting on your behalf, the equivalent guard is <code>aws:SourceArn</code> and <code>aws:SourceAccount</code> conditions.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">STS details worth knowing</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Session duration: 15 minutes to the role's <code>MaxSessionDuration</code> (up to 12 hours); chained sessions max 1 hour.</li>
  <li><strong>Session policies</strong> passed at assume time can only narrow the role's permissions.</li>
  <li><strong>Session tags</strong> (<code>sts:TagSession</code>) carry attributes into the session for ABAC, and <code>sts:SourceIdentity</code> preserves the original human identity through chains.</li>
  <li>Use <strong>regional STS endpoints</strong> for lower latency and resilience; tokens from regional endpoints work in all regions.</li>
  <li>To cut off a compromised session, attach an inline deny with <code>aws:TokenIssueTime</code> earlier than now, which revokes all existing sessions of the role.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "For cross-account access I create a role in the target account whose trust policy names the caller, grant the caller sts:AssumeRole, and use the temporary credentials, so both accounts have to agree and CloudTrail sees both sides. For third parties I add an External ID to stop confused-deputy attacks. Where a service has a resource policy I can name the foreign principal directly, but the caller still needs its own identity allow."</div>
</div>`,
          examples: [
            `# Account B (222222222222): role trusted by a specific role in account A, with External ID for a vendor
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "TrustDeployRoleInAccountA",
      "Effect": "Allow",
      "Principal": { "AWS": "arn:aws:iam::111111111111:role/ci-deploy" },
      "Action": ["sts:AssumeRole", "sts:TagSession"],
      "Condition": { "Bool": { "aws:MultiFactorAuthPresent": "false" } }
    },
    {
      "Sid": "TrustVendorWithExternalId",
      "Effect": "Allow",
      "Principal": { "AWS": "arn:aws:iam::999999999999:root" },
      "Action": "sts:AssumeRole",
      "Condition": { "StringEquals": { "sts:ExternalId": "c0ffee-unique-per-customer" } }
    }
  ]
}

# Account A: allow the ci-deploy role to assume it
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": "sts:AssumeRole",
    "Resource": "arn:aws:iam::222222222222:role/prod-deployer"
  }]
}`,
            `# Assume the role from the CLI and export the temporary credentials
CREDS=$(aws sts assume-role \\
  --role-arn arn:aws:iam::222222222222:role/prod-deployer \\
  --role-session-name alice-deploy-42 \\
  --duration-seconds 3600 \\
  --tags Key=team,Value=payments \\
  --query 'Credentials.[AccessKeyId,SecretAccessKey,SessionToken]' --output text)
export AWS_ACCESS_KEY_ID=$(echo $CREDS | cut -f1)
export AWS_SECRET_ACCESS_KEY=$(echo $CREDS | cut -f2)
export AWS_SESSION_TOKEN=$(echo $CREDS | cut -f3)
aws sts get-caller-identity

# Simpler: let the CLI chain roles via a named profile in ~/.aws/config
# [profile prod]
# role_arn = arn:aws:iam::222222222222:role/prod-deployer
# source_profile = default
# mfa_serial = arn:aws:iam::111111111111:mfa/alice
aws s3 ls --profile prod

# Cross-account S3 via bucket policy for the whole organisation
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": "*",
    "Action": ["s3:GetObject", "s3:ListBucket"],
    "Resource": ["arn:aws:s3:::shared-artifacts", "arn:aws:s3:::shared-artifacts/*"],
    "Condition": { "StringEquals": { "aws:PrincipalOrgID": "o-abc123def4" } }
  }]
}

# Emergency: revoke every active session of a role issued before now
aws iam put-role-policy --role-name prod-deployer --policy-name RevokeOldSessions \\
  --policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Deny","Action":"*","Resource":"*","Condition":{"DateLessThan":{"aws:TokenIssueTime":"2026-09-12T10:00:00Z"}}}]}'`,
          ],
          questions: [
            {
              question: "Walk through how account A gets access to an S3 bucket in account B using a role.",
              solution: "<p>In <strong>account B</strong>, create a role with a permission policy allowing the needed S3 actions on the bucket and a <strong>trust policy</strong> whose principal is account A (or a specific role ARN in A) for <code>sts:AssumeRole</code>. In <strong>account A</strong>, attach an identity policy to the caller allowing <code>sts:AssumeRole</code> on that role's ARN. The caller invokes <code>AssumeRole</code>, receives temporary credentials, and uses them to access the bucket as B's role. Both accounts must consent, and CloudTrail in both records the assumption and the S3 calls.</p>",
            },
            {
              question: "What is the confused deputy problem and how does External ID solve it?",
              solution: "<p>A confused deputy is a trusted service tricked into using its privileges on behalf of the wrong party. If a SaaS vendor assumes roles in customer accounts, a malicious customer could give the vendor <em>your</em> role ARN and the vendor would happily assume it. The <strong>External ID</strong> is a unique secret per customer that the vendor must include in <code>AssumeRole</code>, and your trust policy requires <code>sts:ExternalId</code> to match, so the vendor can only assume your role when acting for your account. For AWS services the analogous protection is <code>aws:SourceArn</code> / <code>aws:SourceAccount</code>.</p>",
            },
            {
              question: "When would you use a resource-based policy for cross-account access instead of a role?",
              solution: "<p>Use a <strong>resource-based policy</strong> when the target service supports one (S3, KMS, SQS, SNS, Lambda, Secrets Manager) and you want the caller to keep its own identity and avoid credential swapping, for example a Lambda in account A reading a queue in account B. The caller still needs an identity policy allow and the resource policy must name the caller (or use <code>aws:PrincipalOrgID</code>). Use a <strong>role</strong> when the service has no resource policy (EC2, most of RDS), when the caller needs many permissions in the target account, or when you want the actions to appear as the target account's identity in CloudTrail.</p>",
            },
            {
              question: "What is role chaining and what limitation does it have?",
              solution: "<p>Role chaining is using the temporary credentials of one assumed role to assume another role. It is common in hub-and-spoke designs where a central identity role hops into member account roles. The main limitation is that a <strong>chained session is capped at one hour</strong> regardless of the role's <code>MaxSessionDuration</code>, and you cannot use the console switch-role feature for the second hop with a longer duration. Preserve the original caller through the chain with <code>sts:SourceIdentity</code> so audit logs remain meaningful.</p>",
            },
            {
              question: "How do you revoke active temporary credentials for a role that may be compromised?",
              solution: "<p>Temporary credentials cannot be individually deleted, but you can make them useless. Attach an inline policy to the role with <strong>Deny on all actions</strong> conditioned on <code>aws:TokenIssueTime</code> being earlier than the current time, which the console does for you with Revoke Sessions. Every session issued before that moment is denied, while new assumptions continue to work. Then fix the trust policy or the compromised principal, review CloudTrail for what the sessions did, and remove the deny once all old sessions have expired.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/tutorial_cross-account-with-roles.html",
            "https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/confused-deputy.html",
          ],
        },
        {
          topic: "OIDC Federation & Identity Center",
          tags: ["aws", "iam", "oidc", "federation", "identity center", "github actions"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>Federation</strong> lets identities that live outside IAM (your corporate directory, GitHub Actions, a mobile app's users) obtain temporary AWS credentials without ever having an IAM user or access key. Two flavours dominate interviews: <strong>OIDC federation for workloads</strong> such as CI pipelines and Kubernetes pods, and <strong>IAM Identity Center</strong> for human single sign-on across a multi-account organisation.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">OIDC federation for CI and workloads</h4>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li>Register the provider (for example <code>token.actions.githubusercontent.com</code>) as an <strong>IAM OIDC identity provider</strong>, with its audience.</li>
  <li>Create a role whose trust policy allows <code>sts:AssumeRoleWithWebIdentity</code> for that federated principal, and <strong>pin the claims</strong>: <code>aud</code> must be <code>sts.amazonaws.com</code> and <code>sub</code> must match a specific repository, branch or environment.</li>
  <li>The pipeline requests a short-lived signed <strong>JWT</strong> from the provider, exchanges it with STS for temporary credentials, and deploys.</li>
</ol>
<p style="line-height: 1.75;">Nothing is stored: no secrets to rotate, no keys to leak, and CloudTrail records exactly which repo and branch acted. The same mechanism powers <strong>IRSA</strong> (IAM Roles for Service Accounts) on EKS, where the cluster's OIDC issuer signs a projected service account token, and it is how <strong>Amazon Cognito</strong> identity pools give mobile users scoped credentials. <strong>IAM Roles Anywhere</strong> covers on-premises servers with X.509 certificates instead of OIDC.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Common OIDC mistakes</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Trusting <code>sub</code> with a wildcard like <code>repo:my-org/*</code>, which lets any repository, including forks with pull-request workflows, assume the role.</li>
  <li>Forgetting the <code>aud</code> condition, so tokens minted for other audiences are accepted.</li>
  <li>Using a single broad deploy role for every environment instead of one role per environment with a matching <code>sub</code>.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">IAM Identity Center for humans</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Formerly AWS SSO. Connects to an <strong>identity source</strong>: its own directory, Active Directory, or an external IdP (Okta, Entra ID, Google) via SAML plus <strong>SCIM</strong> for automatic user and group provisioning.</li>
  <li><strong>Permission sets</strong> are templates of IAM policies (managed, inline, boundary) that Identity Center materialises as roles in each account you assign them to.</li>
  <li>Users open the <strong>access portal</strong>, pick an account and permission set, and receive console access or CLI credentials via <code>aws sso login</code> with sessions typically 1 to 12 hours.</li>
  <li>MFA is enforced at the IdP or in Identity Center itself, and offboarding a user in the directory removes all AWS access at once.</li>
  <li>Identity Center also handles access to AWS applications and supports <strong>trusted identity propagation</strong> so services like Redshift and Athena see the real user identity.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">SAML versus OIDC</h4>
<p style="line-height: 1.75;">Enterprise IdPs traditionally use <strong>SAML 2.0</strong> assertions (<code>AssumeRoleWithSAML</code>), while modern web and CI providers use <strong>OIDC</strong> JWTs (<code>AssumeRoleWithWebIdentity</code>). Both end in an STS session; Identity Center hides the plumbing for humans, and direct OIDC providers are the right fit for machines.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "For CI I register the provider as an OIDC identity provider and create a role that trusts sts:AssumeRoleWithWebIdentity only for tokens whose aud is STS and whose sub matches the exact repo and branch, so the pipeline trades a short-lived JWT for temporary credentials with no stored secret. For people I use IAM Identity Center with our IdP over SAML and SCIM, mapping groups to permission sets per account, which gives MFA, central offboarding and short-lived CLI credentials."</div>
</div>`,
          examples: [
            `# Register GitHub as an OIDC provider and create a per-environment deploy role
aws iam create-open-id-connect-provider \\
  --url https://token.actions.githubusercontent.com \\
  --client-id-list sts.amazonaws.com

# Trust policy letting GitHub Actions assume a deploy role via OIDC
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "Federated": "arn:aws:iam::123456789012:oidc-provider/token.actions.githubusercontent.com" },
    "Action": "sts:AssumeRoleWithWebIdentity",
    "Condition": {
      "StringEquals": {
        "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
        "token.actions.githubusercontent.com:sub": "repo:my-org/my-repo:environment:production"
      }
    }
  }]
}

# .github/workflows/deploy.yml (excerpt)
# permissions:
#   id-token: write
#   contents: read
# steps:
#   - uses: aws-actions/configure-aws-credentials@v4
#     with:
#       role-to-assume: arn:aws:iam::123456789012:role/gh-deploy-prod
#       aws-region: us-east-1
#   - run: aws sts get-caller-identity`,
            `# IAM Identity Center: create a permission set and assign a group to an account
aws sso-admin create-permission-set --instance-arn arn:aws:sso:::instance/ssoins-abc \\
  --name DeveloperAccess --session-duration PT8H
aws sso-admin attach-managed-policy-to-permission-set --instance-arn arn:aws:sso:::instance/ssoins-abc \\
  --permission-set-arn arn:aws:sso:::permissionSet/ssoins-abc/ps-123 \\
  --managed-policy-arn arn:aws:iam::aws:policy/PowerUserAccess
aws sso-admin put-permissions-boundary-to-permission-set --instance-arn arn:aws:sso:::instance/ssoins-abc \\
  --permission-set-arn arn:aws:sso:::permissionSet/ssoins-abc/ps-123 \\
  --permissions-boundary '{"ManagedPolicyArn":"arn:aws:iam::aws:policy/PowerUserAccess"}'
aws sso-admin create-account-assignment --instance-arn arn:aws:sso:::instance/ssoins-abc \\
  --target-id 222222222222 --target-type AWS_ACCOUNT \\
  --permission-set-arn arn:aws:sso:::permissionSet/ssoins-abc/ps-123 \\
  --principal-type GROUP --principal-id 9a67...group-id

# Developer side: SSO login and short-lived CLI credentials
aws configure sso          # one-time: start URL, region, account, role -> profile name
aws sso login --profile dev
aws sts get-caller-identity --profile dev`,
          ],
          questions: [
            {
              question: "How would you give a CI/CD pipeline running outside AWS access to deploy, without storing access keys?",
              solution: "<p>Use <strong>OIDC federation</strong>. Register the CI provider (GitHub Actions, GitLab) as an IAM OIDC identity provider, create a role whose <strong>trust policy</strong> allows <code>sts:AssumeRoleWithWebIdentity</code> only for tokens from a specific repository and branch, and attach a least-privilege deploy policy. The pipeline exchanges its signed JWT for temporary credentials at runtime, so there are no static secrets to leak or rotate.</p>",
            },
            {
              question: "What conditions must a GitHub Actions OIDC trust policy include, and why?",
              solution: "<p>At minimum <strong><code>aud</code> equals <code>sts.amazonaws.com</code></strong>, so only tokens minted for AWS are accepted, and a tight <strong><code>sub</code></strong> match such as <code>repo:org/repo:ref:refs/heads/main</code> or <code>repo:org/repo:environment:production</code>. Without the <code>sub</code> pin, any repository whose tokens are signed by GitHub could assume the role; with a wildcard like <code>repo:org/*</code>, any repo in the org, including forks running pull-request workflows, could deploy to production. One role per environment with an exact <code>sub</code> is the recommended pattern.</p>",
            },
            {
              question: "What is IAM Identity Center and how does it differ from creating IAM users?",
              solution: "<p><strong>IAM Identity Center</strong> (formerly AWS SSO) is the managed single sign-on service for a multi-account organisation. Users come from a connected identity source (its directory, Active Directory, or an external IdP via SAML and SCIM), and you assign groups to <strong>permission sets</strong> per account, which Identity Center provisions as roles. Users get console and CLI access with <strong>temporary credentials</strong> and centrally enforced MFA. Compared with IAM users, there are no long-lived passwords or keys per account, offboarding happens once in the directory, and access is consistent across every account.</p>",
            },
            {
              question: "How do Kubernetes pods on EKS get AWS permissions without sharing the node role?",
              solution: "<p>Through <strong>IAM Roles for Service Accounts (IRSA)</strong> or the newer <strong>EKS Pod Identity</strong>. With IRSA, the cluster exposes an OIDC issuer registered in IAM; a Kubernetes service account is annotated with a role ARN whose trust policy pins that issuer, namespace and service account name. The pod receives a projected service account JWT, and the SDK exchanges it via <code>AssumeRoleWithWebIdentity</code> for credentials scoped to that role. Each workload therefore gets its own least-privilege identity instead of inheriting the node instance profile.</p>",
            },
            {
              question: "Compare SAML and OIDC federation in IAM.",
              solution: "<p>Both let an external identity provider vouch for a principal so STS issues temporary credentials. <strong>SAML 2.0</strong> uses XML assertions and <code>sts:AssumeRoleWithSAML</code>, and is the traditional protocol for enterprise IdPs and browser-based console access. <strong>OIDC</strong> uses signed JSON Web Tokens and <code>sts:AssumeRoleWithWebIdentity</code>, and is the norm for CI systems, Kubernetes, and mobile or web apps via Cognito. Attributes from either can become session tags for ABAC. For human SSO you normally use Identity Center, which speaks SAML to your IdP; for machines you register OIDC providers directly.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html",
            "https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html",
            "https://docs.github.com/en/actions/security-for-github-actions/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services",
          ],
        },
      ],
    },
  ],
};
