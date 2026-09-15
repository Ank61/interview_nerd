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
          topic: "What IAM Does — Authentication & Authorization",
          tags: ["aws", "iam", "authentication", "authorization", "sigv4", "security"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>AWS IAM (Identity and Access Management)</strong> is the security guard standing in front of every single thing in your AWS account. Nothing happens in AWS without IAM saying yes first. When you click a button in the console, run <code>aws s3 ls</code> in a terminal, or a Lambda function writes a row to DynamoDB, all three become the same thing under the hood: an <strong>HTTPS API request</strong> sent to an AWS service endpoint. Before that service does any real work, IAM steps in and asks two questions.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The two questions</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Authentication — "who are you?"</strong> This is about <em>proving identity</em>. You show a credential, and AWS verifies it really belongs to you. Think of it as showing your passport at the airport.</li>
  <li><strong>Authorization — "what are you allowed to do?"</strong> This is about <em>permission</em>. Now that AWS knows who you are, it looks at the rules written about you and decides whether this particular action on this particular resource is permitted. This is the boarding pass that says which plane and which seat.</li>
</ul>
<p style="line-height: 1.75;">Those two are genuinely separate steps, and mixing them up is the most common beginner confusion. You can be perfectly authenticated and still be denied. In fact that is the normal state of a brand new identity in AWS: AWS knows exactly who you are, and you are allowed to do <em>nothing</em>.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">How authentication actually works (SigV4)</h4>
<p style="line-height: 1.75;">AWS uses a scheme called <strong>Signature Version 4</strong>. You hold two strings: an <strong>access key ID</strong> (public-ish, like a username, starts with <code>AKIA</code> or <code>ASIA</code>) and a <strong>secret access key</strong> (private, like a password). When the SDK or CLI sends a request, it takes the important parts of the request — the HTTP method, the path, the query string, certain headers, a hash of the body, and the current timestamp — glues them together into a "string to sign", and runs an HMAC-SHA256 over it using a key derived from your secret.</p>
<p style="line-height: 1.75;">The clever part: <strong>your secret key never travels over the network.</strong> Only the resulting signature does. AWS has its own copy of your secret, recomputes the exact same signature on its side, and compares. If they match, you are authenticated. Two useful consequences fall out of this design:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>The signature covers the <strong>timestamp</strong>, and AWS rejects requests skewed more than about 5 minutes. So a machine with a badly wrong clock gets mysterious auth failures — a classic real-world bug in containers and CI runners.</li>
  <li>The signature covers the <strong>body hash</strong>, so nobody can tamper with the request in flight. A man-in-the-middle cannot change "delete one object" into "delete the bucket".</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">How authorization actually works</h4>
<p style="line-height: 1.75;">Once IAM knows the caller, it gathers <em>every</em> policy that could possibly apply — the policies attached to the identity, any policy attached to the resource being touched, organisation-level guardrails, session limits — and runs a fixed, deterministic algorithm over them. The rules in short form:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Default deny.</strong> If nothing mentions you, the answer is no. IAM is a whitelist, not a blacklist.</li>
  <li><strong>An explicit Allow flips it to yes.</strong> Some policy has to say "this principal may perform this action on this resource".</li>
  <li><strong>An explicit Deny always wins.</strong> No number of Allows can beat a single Deny. This is why Deny statements are the tool of choice for guardrails you never want anyone to bypass.</li>
</ul>
<p style="line-height: 1.75;">That ordering — deny by default, allow adds, explicit deny overrides — is worth memorising word for word, because interviewers ask it constantly and because it is the mental model you use when debugging a real <code>AccessDenied</code>.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Reading the error tells you which half failed</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><code>InvalidClientTokenId</code>, <code>SignatureDoesNotMatch</code>, <code>ExpiredToken</code> → <strong>authentication</strong> problem. Your credentials are wrong, deleted, expired, or your clock is off. No policy change will help.</li>
  <li><code>AccessDenied</code> / <code>AccessDeniedException</code> → <strong>authorization</strong> problem. AWS knows who you are and is refusing the action. Now go read policies.</li>
</ul>
<p style="line-height: 1.75;">Modern AccessDenied messages are extremely helpful — they usually name the exact principal ARN, the exact action, the exact resource, and increasingly even say <em>which type of policy</em> caused the denial (identity policy, resource policy, SCP, permissions boundary). Read the whole message before touching anything.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Properties of IAM worth knowing</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Global, not regional.</strong> A user or role you create exists in all regions. (You can still restrict which regions it may act in, using the <code>aws:RequestedRegion</code> condition key.)</li>
  <li><strong>Free.</strong> IAM itself costs nothing. You pay only for whatever the allowed actions actually do.</li>
  <li><strong>Eventually consistent.</strong> IAM data is replicated worldwide, so a freshly created role or a just-attached policy may take a few seconds to be visible everywhere. This is why CI scripts that create a role and instantly assume it sometimes need a retry loop — the fix is a retry with backoff, not a <code>sleep 30</code>.</li>
  <li><strong>Highly available but not infinitely fast.</strong> The IAM control plane (creating users, policies) lives in <code>us-east-1</code>; the data plane (evaluating permissions) runs everywhere.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The vocabulary you will be graded on</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Principal</strong> — the "who". A root user, an IAM user, an assumed role session, or an AWS service acting on your behalf.</li>
  <li><strong>Action</strong> — the "what", always <code>service:Operation</code>, e.g. <code>s3:GetObject</code>, <code>ec2:TerminateInstances</code>.</li>
  <li><strong>Resource</strong> — the "on what", named by an <strong>ARN</strong>.</li>
  <li><strong>Policy</strong> — the JSON document holding the rules.</li>
  <li><strong>Request context</strong> — everything else AWS knows about the call: source IP, time, whether MFA was used, TLS version, tags on the principal and on the resource. Conditions test this context.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Principle of least privilege</h4>
<p style="line-height: 1.75;">The guiding rule for all of IAM: give each identity <strong>exactly the permissions it needs to do its job, and nothing more</strong>. In practice that means starting from zero and adding, never starting from <code>"Action": "*"</code> and subtracting. The practical workflow is: start broad in a dev sandbox, let the workload run, then use <strong>CloudTrail</strong> and <strong>IAM Access Analyzer policy generation</strong> to see what it genuinely called, and tighten the policy to that list before it goes to production.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "IAM does two things for every AWS API call. Authentication proves who the caller is — AWS uses SigV4, where the client signs the request with its secret key and AWS recomputes the signature, so the secret never crosses the wire. Authorization then evaluates every applicable policy and decides Allow or Deny, with three rules: deny by default, an explicit Allow grants access, and an explicit Deny always wins. IAM is global, free and eventually consistent, and the error you get tells you which half failed — SignatureDoesNotMatch is authentication, AccessDenied is authorization."</div>
</div>`,
          examples: [
            `# ---------- The single most useful IAM command: who am I right now? ----------
aws sts get-caller-identity
# {
#   "UserId":  "AROAEXAMPLEID:deploy-session",
#   "Account": "111122223333",
#   "Arn":     "arn:aws:sts::111122223333:assumed-role/ci-deploy/deploy-session"
# }
# Note: this call needs NO permissions at all. If it works, you are authenticated.
# If it fails, your problem is credentials, not policies.

# ---------- Telling the two failure modes apart ----------
# AUTHENTICATION failure (bad/expired/deleted key, or clock skew):
#   An error occurred (InvalidClientTokenId) when calling the GetCallerIdentity
#   operation: The security token included in the request is invalid.

# AUTHORIZATION failure (good identity, missing permission):
#   An error occurred (AccessDenied) when calling the GetObject operation:
#   User: arn:aws:iam::111122223333:user/dev is not authorized to perform:
#   s3:GetObject on resource: arn:aws:s3:::prod-reports/q4.csv
#   because no identity-based policy allows the s3:GetObject action

# ---------- Where the CLI looks for credentials, in order ----------
# 1. CLI flags / environment variables (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY,
#    AWS_SESSION_TOKEN)
# 2. ~/.aws/credentials  and  ~/.aws/config  (profiles, SSO, role_arn)
# 3. Container credentials  (ECS task role, via a link-local HTTP endpoint)
# 4. Instance metadata     (EC2 instance profile, IMDSv2)
aws configure list      # shows which source each value came from

# ---------- Debug a permission decision WITHOUT running the real call ----------
aws iam simulate-principal-policy \\
  --policy-source-arn arn:aws:iam::111122223333:user/dev \\
  --action-names s3:GetObject \\
  --resource-arns arn:aws:s3:::prod-reports/q4.csv \\
  --query 'EvaluationResults[].{Action:EvalActionName,Decision:EvalDecision,By:MatchedStatements[].SourcePolicyId}'

# ---------- See the raw signed request the SDK actually sends ----------
aws s3 ls --debug 2>&1 | grep -i 'Authorization:'
# Authorization: AWS4-HMAC-SHA256 Credential=AKIA.../20260914/us-east-1/s3/aws4_request,
#                SignedHeaders=host;x-amz-date, Signature=5f2c...
# The secret key itself is nowhere in the request — only the derived signature.`,
          ],
          questions: [
            {
              question: "What is the difference between authentication and authorization in IAM?",
              solution: "<p><strong>Authentication</strong> answers <em>who are you</em>: the caller proves identity by signing the request with a secret key using <strong>SigV4</strong>, and AWS recomputes the signature to verify it. The secret itself never travels over the network. <strong>Authorization</strong> answers <em>are you allowed</em>: AWS collects every policy that applies to the principal and the resource, then evaluates them to return Allow or Deny. They are independent steps — you can authenticate perfectly and still be denied, which is the default state of a new identity. The error type tells you which failed: <code>SignatureDoesNotMatch</code> or <code>InvalidClientTokenId</code> is authentication, <code>AccessDenied</code> is authorization.</p>",
            },
            {
              question: "A brand new IAM user with no policies attached tries to list S3 buckets. What happens and why?",
              solution: "<p>The call fails with <code>AccessDenied</code>. IAM is <strong>deny by default</strong>: a principal has zero permissions until some policy explicitly grants them. The user <em>is</em> authenticated — AWS knows exactly who they are — but no statement anywhere allows <code>s3:ListAllMyBuckets</code>, so the implicit deny stands. This is also why <code>aws sts get-caller-identity</code> is such a good first debugging step: it requires no permissions, so if it succeeds you have proven the credential is valid and the problem is purely authorization.</p>",
            },
            {
              question: "Your CI job intermittently fails with SignatureDoesNotMatch, but the same credentials work locally. What do you check?",
              solution: "<p>The SigV4 signature covers a <strong>timestamp</strong>, and AWS rejects requests whose clock is skewed by more than roughly five minutes, so the first suspect is <strong>clock drift</strong> on the build host or container — fix with NTP/chrony rather than retries. Other causes: a secret key that was copy-pasted with trailing whitespace or a newline, a key that contains characters mangled by shell quoting, using a temporary credential's access key without also passing the matching <code>AWS_SESSION_TOKEN</code>, or a proxy that rewrites headers or the body after signing (the body hash is part of the signature).</p>",
            },
            {
              question: "Is IAM regional or global, and why does that matter?",
              solution: "<p>IAM is a <strong>global</strong> service — users, groups, roles and policies are not created per region, and their ARNs contain an empty region field. That matters for two reasons. First, you cannot 'scope a role to eu-west-1' by creating it there; you scope region access with the <code>aws:RequestedRegion</code> condition key instead. Second, IAM is <strong>eventually consistent</strong> — a newly created role or attached policy may take seconds to propagate, so automation that creates a role and immediately assumes it should retry with backoff rather than assume failure.</p>",
            },
            {
              question: "What are the three rules of IAM policy evaluation?",
              solution: "<p>(1) <strong>Default deny</strong> — with no matching statement, the request is denied. (2) <strong>Explicit Allow</strong> — a matching Allow in any applicable policy grants access. (3) <strong>Explicit Deny wins</strong> — a matching Deny anywhere overrides every Allow, and cannot be undone by adding more permissions. The full evaluation also layers organisation SCPs and RCPs, permissions boundaries, resource-based policies and session policies on top, but those three rules are the core and are what an interviewer is listening for.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/intro-structure.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_sigv.html",
          ],
        },
        {
          topic: "Root Account vs IAM User — Why Root Is a Break-Glass Credential",
          tags: ["aws", "iam", "root user", "account security", "mfa", "best practices"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  When you create an AWS account you give an email address and a password. That email address becomes the <strong>root user</strong> — sometimes called the account root user or the account owner. It is not an IAM user, it does not live inside IAM, and IAM cannot control it. Understanding exactly how it differs from an ordinary IAM user is a standard interview opener, because the answer reveals whether you have actually run an AWS account or only read about one.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What makes root different</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>It has unlimited power, and that power cannot be taken away.</strong> You cannot attach a policy to root that restricts it. Permissions boundaries do not apply. Service Control Policies in AWS Organizations do not apply to the management account's root. If someone gets root, they own everything: every resource, every bill, the ability to close the account.</li>
  <li><strong>It signs in with an email address</strong>, not an account ID plus username like an IAM user does. The login page is even a different one.</li>
  <li><strong>It is a single, unnamed shared identity.</strong> There is exactly one, and it cannot be duplicated. If three people know the root password, CloudTrail will show "root did it" and you will never know which of the three.</li>
  <li><strong>It is not subject to IAM's deny-by-default rule.</strong> An IAM user starts with nothing; root starts with everything.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">An IAM user, by contrast</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Is created <em>inside</em> IAM, has a name and an ARN like <code>arn:aws:iam::111122223333:user/alice</code>.</li>
  <li>Starts with <strong>zero permissions</strong> and only ever has what policies grant.</li>
  <li>Can be restricted, boundaried, disabled, deleted, and audited individually.</li>
  <li>Is meant to represent one person or one application — never a shared team login.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Why "never use root day-to-day" is not just advice</h4>
<p style="line-height: 1.75;">Three concrete reasons, and an interviewer wants all three:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Blast radius.</strong> Any mistake made as root is unbounded. A typo in a script running as root can delete production. The same typo running as a scoped IAM role gets an AccessDenied and nothing happens.</li>
  <li><strong>No accountability.</strong> Root is shared and unnamed, so audit logs cannot attribute an action to a human. Compliance frameworks (SOC 2, PCI DSS, ISO 27001) explicitly require individual attribution.</li>
  <li><strong>No containment.</strong> If a scoped role's credentials leak, you revoke that role and the damage is bounded. If root leaks, there is no higher authority to stop it — the attacker can lock you out of your own account, change the email, and remove your MFA.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The small list of things only root can do</h4>
<p style="line-height: 1.75;">Root is still needed occasionally, which is why it exists. The classic tasks:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Change the account name, root email address, or root password.</li>
  <li>Change or cancel the AWS <strong>Support plan</strong>.</li>
  <li><strong>Close the AWS account.</strong></li>
  <li>Restore access when an <strong>S3 bucket policy or SQS/KMS resource policy locks everyone out</strong> — root can still delete the offending policy.</li>
  <li>Enable <strong>S3 MFA Delete</strong> on a bucket (must be configured by root).</li>
  <li>Register as a seller in AWS Marketplace, sign up for GovCloud, submit certain penetration-testing or reverse-DNS requests.</li>
  <li>Leave an AWS Organization as a member account, or configure certain tax/billing settings.</li>
</ul>
<p style="line-height: 1.75;">Notice the shape of that list: rare, account-level, and often "I have broken things so badly that nothing else can fix it". That is precisely the definition of a <strong>break-glass credential</strong> — you keep it, you protect it, you do not carry it around.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">How to actually secure root (the checklist)</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Enable MFA — ideally a hardware key</strong> (FIDO2 security key), or at minimum a TOTP authenticator. AWS now supports <strong>multiple MFA devices per root user</strong> (up to eight), which solves the old "one person holds the only token" problem.</li>
  <li><strong>Delete root access keys.</strong> There is no legitimate reason for programmatic root access. <code>aws iam get-account-summary</code> should report <code>AccountAccessKeysPresent: 0</code>.</li>
  <li><strong>Use a long, unique, randomly generated password</strong> stored in a password manager or a physical safe — never reused, never in a wiki.</li>
  <li><strong>Use a group alias email</strong> (e.g. <code>aws-root@company.com</code>) that several trusted people receive, so the account is not tied to one departing employee's mailbox.</li>
  <li><strong>Set alternate contacts</strong> (billing, operations, security) in Account Settings.</li>
  <li><strong>Alarm on root usage.</strong> CloudTrail → EventBridge rule matching <code>userIdentity.type = Root</code> → SNS to the security team. Root logging in should page someone, every time.</li>
  <li><strong>In AWS Organizations, use centralized root access management</strong> to <em>remove root credentials entirely from member accounts</em>, so those accounts simply have no root password or MFA to steal. A privileged task in a member account is then performed by a short-lived, tightly-scoped root session initiated from the management account.</li>
  <li><strong>Apply an SCP</strong> that denies actions when <code>aws:PrincipalArn</code> is the member account root, as defence in depth (note: this does not restrict the management account's root).</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What to use instead, in 2026</h4>
<p style="line-height: 1.75;">Modern AWS guidance has moved one step further: not only "don't use root", but also <strong>"don't create IAM users for humans at all"</strong>. The recommended pattern is <strong>IAM Identity Center</strong> (the service formerly called AWS SSO), backed by your corporate identity provider (Okta, Entra ID, Google Workspace) or Identity Center's own directory. Humans sign in once through an SSO portal with MFA and get <strong>short-lived credentials</strong> for whichever account and role they pick. Applications and workloads use <strong>IAM roles</strong>, which also carry no permanent secret. The end state is an account where root is locked in a safe, there are few or no IAM users, and every credential in daily circulation expires within hours.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "The root user is the email you signed up with. It has unrestricted access that IAM policies, permissions boundaries and SCPs cannot limit, and it is a single shared unnamed identity, so there is no attribution and no containment if it leaks. An IAM user is created inside IAM, starts with zero permissions and can be scoped and audited individually. I treat root as break-glass: hardware MFA, no access keys, a vaulted password on a group alias email, alternate contacts set, and a CloudTrail-driven alarm on any root sign-in. Day to day, humans get SSO through IAM Identity Center and workloads get roles."</div>
</div>`,
          examples: [
            `# ---------- Audit root hygiene in one command ----------
aws iam get-account-summary --query 'SummaryMap.{
  RootHasAccessKeys: AccountAccessKeysPresent,
  RootHasMFA:        AccountMFAEnabled,
  UserCount:         Users,
  MFAEnabledUsers:   MFADevicesInUse
}'
# RootHasAccessKeys MUST be 0.  RootHasMFA MUST be 1.

# ---------- Credential report: root is always the first row ----------
aws iam generate-credential-report
aws iam get-credential-report --query Content --output text | base64 -d \\
  | awk -F, 'NR==1 || $1=="<root_account>"' | column -t -s,
# Columns to care about: mfa_active, access_key_1_active, password_last_used

# ---------- Alarm on every root login (EventBridge rule) ----------
cat > root-login-rule.json <<'EOF'
{
  "source": ["aws.signin"],
  "detail-type": ["AWS Console Sign In via CloudTrail"],
  "detail": { "userIdentity": { "type": ["Root"] } }
}
EOF
aws events put-rule --name alert-on-root-login \\
  --event-pattern file://root-login-rule.json
aws events put-targets --rule alert-on-root-login \\
  --targets 'Id=1,Arn=arn:aws:sns:us-east-1:111122223333:security-alerts'

# ---------- SCP: deny member-account root from doing anything ----------
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "DenyMemberAccountRoot",
    "Effect": "Deny",
    "Action": "*",
    "Resource": "*",
    "Condition": {
      "StringLike": { "aws:PrincipalArn": "arn:aws:iam::*:root" }
    }
  }]
}
# Attach at the OU level. Does NOT apply to the management account's root.

# ---------- What a root action looks like in CloudTrail ----------
aws cloudtrail lookup-events \\
  --lookup-attributes AttributeKey=Username,AttributeValue=root \\
  --max-results 5 \\
  --query 'Events[].{Time:EventTime,Event:EventName,User:Username}'
# Note there is no way to tell WHICH human this was. That is the whole problem.`,
          ],
          questions: [
            {
              question: "Why should the root user never be used for daily work, and how do you secure it?",
              solution: "<p>Root has <strong>unrestricted access that cannot be limited</strong> by IAM policies, permissions boundaries or SCPs, it is a <strong>single shared unnamed identity</strong> so CloudTrail cannot attribute actions to a person, and if it leaks there is <strong>no higher authority</strong> to contain the damage — an attacker can change the email and lock the real owner out. Secure it with hardware (FIDO2) MFA, delete any root access keys, use a long unique vaulted password on a group-alias email so it is not tied to one employee, set alternate billing/operations/security contacts, alarm on every root sign-in via CloudTrail + EventBridge, and in Organizations use <strong>centralized root access management</strong> to strip root credentials from member accounts entirely.</p>",
            },
            {
              question: "Name tasks that genuinely require the root user.",
              solution: "<p>Closing the AWS account; changing the account name, root email or root password; changing or cancelling the Support plan; <strong>restoring access when a resource policy (S3 bucket policy, SQS queue policy, KMS key policy) has locked every other principal out</strong>; enabling S3 MFA Delete on a bucket; registering as an AWS Marketplace seller; signing up for GovCloud; and certain tax/billing or account-level Organizations operations such as leaving an organization as a member account. The list is deliberately short, rare and account-level — the shape of a break-glass credential.</p>",
            },
            {
              question: "Can a Service Control Policy restrict the root user?",
              solution: "<p>Partially, and the nuance matters. SCPs <strong>do</strong> apply to the root user of <em>member</em> accounts in an organization, so a Deny SCP attached to an OU will stop that member account's root from performing the denied action. SCPs <strong>do not</strong> apply to the <strong>management account</strong> at all — including its root user — which is exactly why the management account should contain no workloads and its root should be under the strictest controls. The modern answer is to go further and use <strong>centralized root access management</strong> so member accounts have no usable root credentials in the first place.</p>",
            },
            {
              question: "The root user's MFA device was lost and the root email inbox belongs to someone who left the company. What now?",
              solution: "<p>You are in account-recovery territory: AWS requires proving ownership through the alternate contacts and phone verification with AWS Support, which is slow and painful. The lesson an interviewer is fishing for is <strong>prevention</strong>: use a monitored group alias (<code>aws-root@company.com</code>) rather than a personal mailbox, register <strong>multiple MFA devices</strong> on root (AWS supports up to eight) held by different trusted people or in a safe, keep the alternate contacts current, and document a break-glass runbook that is rehearsed rather than discovered during an outage.</p>",
            },
            {
              question: "What is the difference between the root user and an IAM user with AdministratorAccess?",
              solution: "<p>An admin IAM user is still an IAM principal: it is <strong>subject to policy evaluation</strong>, so it can be limited by an explicit Deny, a <strong>permissions boundary</strong>, an <strong>SCP</strong>, or a resource policy; it can be deleted or disabled; and CloudTrail attributes its actions to a named identity. Root bypasses all of that. There are also things <code>AdministratorAccess</code> cannot do — close the account, change the support plan, or recover from a resource policy that denies everyone — because those are reserved for root. So admin is powerful but bounded and attributable; root is unbounded and anonymous.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/root-user-tasks.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html",
          ],
        },
        {
          topic: "IAM User — A Named Identity With Long-Term Credentials",
          tags: ["aws", "iam", "iam user", "access keys", "credentials", "identity center"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  An <strong>IAM user</strong> is a named identity that lives permanently inside one AWS account. It is the simplest identity to understand and, these days, the one AWS most wants you to stop creating. Knowing <em>both</em> how it works and why it is discouraged is what a good answer sounds like.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What an IAM user is made of</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>A <strong>name</strong>, unique within the account (e.g. <code>alice</code>), and an <strong>ARN</strong> such as <code>arn:aws:iam::111122223333:user/alice</code>.</li>
  <li>An optional <strong>path</strong> — a folder-like prefix such as <code>/engineering/backend/</code> — which is purely organisational but can be matched with wildcards in policies.</li>
  <li>A unique internal <strong>user ID</strong> beginning <code>AIDA…</code>, which never changes and never gets reused, even if you delete and recreate a user with the same name. (Roles get <code>AROA…</code>, access keys get <code>AKIA…</code>, temporary keys get <code>ASIA…</code>.)</li>
  <li>Zero or more <strong>credentials</strong> — see below.</li>
  <li>Zero or more <strong>policies</strong>, attached directly (inline or managed) or inherited through <strong>groups</strong>.</li>
  <li>Optional <strong>tags</strong>, which can drive attribute-based access control.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The credentials a user can hold</h4>
<p style="line-height: 1.75;">This is the part interviewers probe, because it is where the security risk lives. A single IAM user may have:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>A <strong>console password</strong> — for signing in to the web console at the account-specific sign-in URL. Optional: a user can exist with no password at all.</li>
  <li>Up to <strong>two access key pairs</strong> — an access key ID (<code>AKIA…</code>) plus a secret access key, used for the CLI, SDKs and any API call. The limit of two exists specifically to enable <strong>rotation without downtime</strong>: create the second key, deploy it, verify traffic has moved, then deactivate and delete the first.</li>
  <li><strong>MFA devices</strong> — up to eight, virtual (TOTP), hardware TOTP, or FIDO2 security keys/passkeys.</li>
  <li><strong>SSH public keys for CodeCommit</strong> and <strong>service-specific credentials</strong> (e.g. HTTPS Git credentials for CodeCommit, or Keyspaces credentials).</li>
  <li><strong>Signing certificates</strong> for some legacy SOAP-era APIs.</li>
</ul>
<p style="line-height: 1.75;">Critically, the <strong>secret access key is shown exactly once</strong>, at creation. AWS does not store a retrievable copy. Lose it and your only option is to create a new key and delete the old one. That is a good security property — and the reason people paste secrets into Slack and Git, which is a bad security outcome.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Why long-term credentials are the problem</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>They do not expire.</strong> An access key created in 2019 still works in 2026 unless someone deactivates it. A leaked key is a permanent backdoor.</li>
  <li><strong>They spread.</strong> Keys end up in <code>.env</code> files, Dockerfiles, CI variables, Terraform state, laptops, and — extremely often — public GitHub repositories. Automated bots scrape GitHub for <code>AKIA</code> strings within seconds of a push, and the classic outcome is a five-figure crypto-mining bill overnight.</li>
  <li><strong>They rarely get rotated.</strong> Rotation is manual, so it does not happen.</li>
  <li><strong>They are hard to attribute.</strong> A key used from three services tells you nothing about which one misbehaved.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">When an IAM user is still legitimate</h4>
<p style="line-height: 1.75;">The honest answer is "rarely, but not never":</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>A <strong>break-glass emergency user</strong> with admin rights, MFA-protected, used only when the identity provider or SSO is down.</li>
  <li><strong>Legacy or third-party systems</strong> that cannot do OIDC/SAML federation and only accept a static key pair.</li>
  <li>On-premises servers or non-AWS CI systems — though the better answer here is <strong>IAM Roles Anywhere</strong> (X.509 certificates) or OIDC federation, both of which give temporary credentials instead.</li>
  <li>Some service-specific credentials (CodeCommit Git over HTTPS) that only attach to users.</li>
</ul>
<p style="line-height: 1.75;">For anything running <em>inside</em> AWS — EC2, Lambda, ECS, EKS — using an IAM user is simply wrong: those compute services can assume a role automatically and get rotating temporary credentials for free. For humans, the right answer is <strong>IAM Identity Center</strong>. For external CI like GitHub Actions or GitLab, the right answer is <strong>OIDC federation</strong> into a role, so no secret is stored anywhere.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Operational hygiene for users you do keep</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Attach permissions through <strong>groups</strong>, not directly to each user, so permissions are managed once.</li>
  <li>Enforce <strong>MFA</strong> with a policy that denies everything unless <code>aws:MultiFactorAuthPresent</code> is true (while still permitting the user to manage their own MFA device, otherwise they can never enrol).</li>
  <li>Set a strong <strong>account password policy</strong>: minimum length, complexity, reuse prevention, expiry.</li>
  <li><strong>Rotate keys</strong> on a schedule using the two-key dance, and use <code>aws iam get-access-key-last-used</code> to prove a key is dead before deleting it.</li>
  <li>Run the <strong>credential report</strong> regularly to find users with no MFA, unused passwords, or keys older than 90 days — and automate the cleanup rather than doing it by hand.</li>
  <li>Use <strong>IAM Access Analyzer unused-access findings</strong> to spot users, keys and permissions nobody has touched in months.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "An IAM user is a named, permanent identity in one account that can hold a console password and up to two access key pairs, plus MFA devices. Two keys exist so you can rotate without downtime. The problem is that those credentials never expire, so they leak into repos and CI and stay valid forever. I use Identity Center for humans, roles for anything running in AWS, and OIDC federation for external CI — keeping IAM users only for break-glass access and legacy integrations that genuinely cannot federate."</div>
</div>`,
          examples: [
            `# ---------- Create a user and put it in a group (no direct policies) ----------
aws iam create-user --user-name alice --tags Key=team,Value=payments
aws iam add-user-to-group --user-name alice --group-name developers

# ---------- Console access with a forced password reset ----------
aws iam create-login-profile --user-name alice \\
  --password 'TempPassw0rd!Change' --password-reset-required

# ---------- Access keys: the secret is shown ONCE ----------
aws iam create-access-key --user-name alice
# {
#   "AccessKey": {
#     "AccessKeyId": "AKIAIOSFODNN7EXAMPLE",
#     "SecretAccessKey": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",  <-- never retrievable again
#     "Status": "Active"
#   }
# }

# ---------- Zero-downtime key rotation (the reason you get two) ----------
aws iam create-access-key --user-name svc-reporting            # 1. new key
# 2. deploy the new key everywhere
aws iam update-access-key --user-name svc-reporting \\
  --access-key-id AKIAOLDKEY --status Inactive                 # 3. disable old
aws iam get-access-key-last-used --access-key-id AKIAOLDKEY    # 4. prove it is dead
aws iam delete-access-key --user-name svc-reporting \\
  --access-key-id AKIAOLDKEY                                   # 5. delete

# ---------- Find every key older than 90 days ----------
aws iam list-users --query 'Users[].UserName' --output text | tr '\\t' '\\n' | while read u; do
  aws iam list-access-keys --user-name "$u" \\
    --query "AccessKeyMetadata[?CreateDate<='$(date -u -v-90d +%Y-%m-%d)'].[UserName,AccessKeyId,CreateDate]" \\
    --output text
done

# ---------- Force MFA: deny everything unless MFA was used ----------
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowManageOwnMFA",
      "Effect": "Allow",
      "Action": ["iam:CreateVirtualMFADevice","iam:EnableMFADevice","iam:ResyncMFADevice","iam:ListMFADevices","iam:ListVirtualMFADevices"],
      "Resource": ["arn:aws:iam::*:user/\${aws:username}", "arn:aws:iam::*:mfa/*"]
    },
    {
      "Sid": "DenyEverythingElseWithoutMFA",
      "Effect": "Deny",
      "NotAction": ["iam:CreateVirtualMFADevice","iam:EnableMFADevice","iam:ResyncMFADevice","iam:ListMFADevices","iam:ListVirtualMFADevices","iam:ChangePassword","sts:GetSessionToken"],
      "Resource": "*",
      "Condition": { "BoolIfExists": { "aws:MultiFactorAuthPresent": "false" } }
    }
  ]
}

# ---------- Deleting a user: detach everything first ----------
# Order matters — AWS refuses to delete a user that still has attachments.
# login profile -> access keys -> MFA devices -> group memberships
# -> inline policies -> attached managed policies -> signing certs -> ssh keys`,
          ],
          questions: [
            {
              question: "Why can an IAM user have exactly two access keys?",
              solution: "<p>So you can perform <strong>zero-downtime rotation</strong>. The sequence is: create a second key, deploy it to every consumer, watch <code>aws iam get-access-key-last-used</code> until the old key shows no recent usage, set the old key to <code>Inactive</code> (a reversible kill switch — if something breaks you re-activate it), then delete it. With only one key slot you would have to break every consumer at the moment of rotation, which is exactly why nobody would rotate.</p>",
            },
            {
              question: "You accidentally committed an access key to a public GitHub repo. What is your response, in order?",
              solution: "<p>Treat it as compromised immediately — scraping bots find <code>AKIA</code> strings within seconds. (1) <strong>Deactivate then delete the key</strong> (<code>update-access-key --status Inactive</code>, then <code>delete-access-key</code>) — do not merely rewrite git history, the key is already harvested. (2) <strong>Search CloudTrail</strong> for every call made with that <code>accessKeyId</code> to scope the blast radius, looking especially for new IAM users/roles/keys, EC2 RunInstances in unusual regions, and disabled logging. (3) <strong>Remediate anything created</strong> by the attacker and check the bill. (4) Rotate any other secrets that key could reach. (5) Prevent recurrence: pre-commit secret scanning, GitHub push protection, and moving that workload off static keys onto a role or OIDC federation. AWS may also auto-apply the <code>AWSCompromisedKeyQuarantine</code> policy — that is a signal, not a fix.</p>",
            },
            {
              question: "When is creating an IAM user still the right call?",
              solution: "<p>Three narrow cases: a <strong>break-glass emergency user</strong> with MFA, used only when SSO or the identity provider is unavailable; <strong>legacy or third-party systems</strong> that can only accept a static access key pair and cannot do SAML/OIDC; and a few <strong>service-specific credentials</strong> (such as CodeCommit HTTPS Git credentials) that attach only to users. Everything else has a better answer — roles for anything running inside AWS, <strong>IAM Roles Anywhere</strong> for on-premises servers, <strong>OIDC federation</strong> for GitHub Actions or GitLab CI, and <strong>IAM Identity Center</strong> for humans.</p>",
            },
            {
              question: "How do you force MFA for IAM users, and what is the classic mistake in that policy?",
              solution: "<p>Attach a policy with a <code>Deny</code> on everything conditioned on <code>\"BoolIfExists\": {\"aws:MultiFactorAuthPresent\": \"false\"}</code>. The classic mistake is denying <em>literally</em> everything, which locks a new user out of the very actions needed to <strong>enrol an MFA device</strong> — so use <code>NotAction</code> to exempt <code>iam:CreateVirtualMFADevice</code>, <code>iam:EnableMFADevice</code>, <code>iam:ResyncMFADevice</code>, the List MFA calls, <code>iam:ChangePassword</code> and <code>sts:GetSessionToken</code>. The second subtlety is using <code>BoolIfExists</code> rather than <code>Bool</code>: for calls where the key is absent entirely (some service-to-service contexts), plain <code>Bool</code> would not match and the Deny would silently not apply.</p>",
            },
            {
              question: "What is the difference between deactivating and deleting an access key?",
              solution: "<p><strong>Deactivating</strong> sets the key's status to <code>Inactive</code>: it immediately stops working for authentication but still exists, so you can re-activate it if you discover a forgotten consumer. <strong>Deleting</strong> is permanent and the access key ID is never reissued. The safe rotation pattern is deactivate first, observe for a business cycle, then delete — deactivation is a reversible kill switch, which is exactly what you want during an incident when you need to stop a key <em>now</em> but may still need to investigate.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html",
          ],
        },
        {
          topic: "IAM Group — Manage Permissions Once, Inherit Everywhere",
          tags: ["aws", "iam", "groups", "permissions", "rbac", "scaling access"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  An <strong>IAM group</strong> is a named container for IAM users. You attach policies to the group, and every user inside it inherits those permissions automatically. Add a user to the group and they gain the permissions instantly; remove them and the permissions disappear. That is the entire feature — but the details around what a group is <em>not</em> are what interviews test.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The problem groups solve</h4>
<p style="line-height: 1.75;">Imagine twelve developers who each need the same eight permissions. Without groups you attach eight policies to twelve users — ninety-six attachments to keep in sync. When a ninth permission is needed you edit twelve users, and you will miss one. When someone changes team you have to remember which of the eight to strip, and you will miss one of those too. Permission drift like this is how accounts end up with people holding access nobody intended.</p>
<p style="line-height: 1.75;">With a group, you attach the policies <strong>once</strong>. Onboarding is one API call, offboarding is one API call, and a permission change is one edit that lands for everyone simultaneously. Groups turn permission management from an <em>O(users × permissions)</em> problem into an <em>O(roles)</em> problem — this is plain <strong>role-based access control (RBAC)</strong> applied to IAM.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The rules and limits</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>A group contains only users.</strong> It cannot contain roles, and it cannot contain other groups — <strong>no nesting</strong>. There is no "all-engineers" group holding "backend" and "frontend" groups. If you want that hierarchy, you duplicate the base policy into both groups, or use a managed policy attached to both.</li>
  <li><strong>A user can belong to many groups</strong> (default limit 10 per user, and 300 groups per account — both soft, adjustable quotas). Permissions from all groups are simply <strong>unioned</strong>, then combined with any policies attached directly to the user.</li>
  <li><strong>A group is not an identity.</strong> It has no credentials, cannot sign in, cannot make API calls, and — the point interviewers love — <strong>cannot appear as a <code>Principal</code></strong> in a resource-based policy or a role trust policy. You cannot write <code>"Principal": {"AWS": "arn:aws:iam::111122223333:group/developers"}</code>. It will be rejected.</li>
  <li>Each group can have up to <strong>10 managed policies</strong> attached (raisable to 20), plus inline policies subject to a total size limit.</li>
  <li>A group has an ARN (<code>arn:aws:iam::111122223333:group/developers</code>) and an optional <strong>path</strong>, which is useful with wildcards for delegated administration.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">"So how do I grant a group of people access to a bucket in another account?"</h4>
<p style="line-height: 1.75;">Since a group cannot be a principal, you have four real options, and naming them is a strong senior answer:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Use a role instead.</strong> Make the bucket policy trust a <em>role</em>, let the group's policy allow <code>sts:AssumeRole</code> on that role. This is the normal, correct pattern.</li>
  <li><strong>List the principals individually</strong> in the resource policy — works, but does not scale and drifts.</li>
  <li><strong>Use conditions instead of principals</strong>: allow <code>"Principal": "*"</code> but condition on <code>aws:PrincipalOrgID</code>, <code>aws:PrincipalArn</code> with a wildcard, or <code>aws:PrincipalTag/team = payments</code>. Tag-based matching (<strong>ABAC</strong>) is the scalable version of "a group of people".</li>
  <li><strong>Use path-based wildcards</strong>: put users under <code>/payments/</code> and match <code>"aws:PrincipalArn": "arn:aws:iam::111122223333:user/payments/*"</code>.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Designing a group structure that lasts</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Name by job function, not by permission.</strong> <code>developers</code>, <code>data-analysts</code>, <code>oncall-sre</code>, <code>billing-readonly</code> — not <code>s3-write-group</code>. Job-function names survive changes to the underlying permissions.</li>
  <li><strong>Prefer customer-managed policies over inline</strong> on groups, so the same policy can be reused and versioned, and so you can roll back with <code>set-default-policy-version</code>.</li>
  <li><strong>Start from AWS job-function managed policies</strong> (<code>ReadOnlyAccess</code>, <code>PowerUserAccess</code>, <code>Billing</code>, <code>DatabaseAdministrator</code>, <code>SecurityAudit</code>) as a first cut, then tighten. Be aware these are deliberately broad — <code>PowerUserAccess</code>, for instance, is "everything except IAM and Organizations", which is far more than most people assume.</li>
  <li><strong>Layer a baseline group</strong> that every user is in (enforce MFA, allow self-service password/MFA management, deny dangerous regions) with function-specific groups on top. Because there is no nesting, the baseline is achieved by membership in two groups, not by hierarchy.</li>
  <li><strong>Audit membership</strong> regularly — groups make it easy to grant and easy to forget. <code>aws iam get-group</code> and Access Analyzer unused-access findings are the tools.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Groups in the modern, federated world</h4>
<p style="line-height: 1.75;">If you follow current AWS guidance and stop creating IAM users, you also stop needing IAM groups — because there are no users to group. The equivalent concept in <strong>IAM Identity Center</strong> is a <strong>group of SSO identities</strong> (synced from Okta/Entra/Google via SCIM) that is assigned a <strong>permission set</strong> in one or more accounts. A permission set is essentially "a policy bundle that materialises as an IAM role in each assigned account". The mental model is identical — manage permissions once for many people — but it works across the whole organisation instead of one account, and it hands out temporary credentials instead of long-lived ones. Knowing that IAM groups are the single-account, legacy version of this idea is exactly the kind of context that separates a rote answer from an informed one.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "A group is a container of IAM users that exists purely to manage permissions once instead of per person — attach policies to the group and every member inherits them, so onboarding and offboarding become a single API call. Groups cannot be nested, cannot contain roles, and are not identities, so a group can never be a Principal in a resource or trust policy. When I need 'a group of people' in a resource policy, I point it at a role they assume, or I condition on aws:PrincipalOrgID or a principal tag. At organisation scale I use Identity Center groups mapped to permission sets instead."</div>
</div>`,
          examples: [
            `# ---------- Standard group workflow ----------
aws iam create-group --group-name developers --path /engineering/
aws iam attach-group-policy --group-name developers \\
  --policy-arn arn:aws:iam::aws:policy/ReadOnlyAccess
aws iam attach-group-policy --group-name developers \\
  --policy-arn arn:aws:iam::111122223333:policy/DeployToStaging
aws iam add-user-to-group --group-name developers --user-name alice

# Onboarding = 1 call.  Offboarding = 1 call.
aws iam remove-user-from-group --group-name developers --user-name alice

# ---------- Inspect ----------
aws iam get-group --group-name developers --query 'Users[].UserName'
aws iam list-groups-for-user --user-name alice --query 'Groups[].GroupName'
aws iam list-attached-group-policies --group-name developers

# ---------- A baseline group every user belongs to (no nesting, so: two groups) ----------
# baseline  -> enforce MFA + self-service credential management
# developers-> the actual job permissions
aws iam add-user-to-group --group-name baseline    --user-name alice
aws iam add-user-to-group --group-name developers  --user-name alice

# ---------- THIS IS INVALID — a group can never be a Principal ----------
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "AWS": "arn:aws:iam::111122223333:group/developers" },   // rejected
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::shared-bucket/*"
  }]
}

# ---------- The correct alternatives ----------
# (a) point the resource policy at a ROLE the group may assume
{
  "Effect": "Allow",
  "Principal": { "AWS": "arn:aws:iam::111122223333:role/DataReader" },
  "Action": "s3:GetObject",
  "Resource": "arn:aws:s3:::shared-bucket/*"
}
# (b) match on a principal TAG instead of an identity (ABAC)
{
  "Effect": "Allow",
  "Principal": "*",
  "Action": "s3:GetObject",
  "Resource": "arn:aws:s3:::shared-bucket/*",
  "Condition": {
    "StringEquals": {
      "aws:PrincipalTag/team": "payments",
      "aws:PrincipalOrgID":    "o-abc123xyz"
    }
  }
}
# (c) match on a path wildcard
{ "Condition": { "ArnLike": { "aws:PrincipalArn": "arn:aws:iam::111122223333:user/payments/*" } } }

# ---------- Delete a group safely (must be empty and policy-free) ----------
aws iam get-group --group-name old-team --query 'Users[].UserName' --output text \\
  | tr '\\t' '\\n' | xargs -I{} aws iam remove-user-from-group --group-name old-team --user-name {}
aws iam list-attached-group-policies --group-name old-team --query 'AttachedPolicies[].PolicyArn' --output text \\
  | tr '\\t' '\\n' | xargs -I{} aws iam detach-group-policy --group-name old-team --policy-arn {}
aws iam delete-group --group-name old-team`,
          ],
          questions: [
            {
              question: "Can an IAM group be used as a Principal in a bucket policy or a role trust policy?",
              solution: "<p>No. A group is <strong>not an identity</strong> — it has no credentials and cannot make requests, so it can never appear in a <code>Principal</code> element; AWS rejects the policy. The workarounds: point the resource policy at a <strong>role</strong> that the group's members are allowed to assume (the standard pattern); list the individual users or roles; or stop naming principals and use <strong>conditions</strong> instead, such as <code>aws:PrincipalOrgID</code>, an <code>ArnLike</code> match on <code>aws:PrincipalArn</code> with a path wildcard, or <code>aws:PrincipalTag/team</code> for ABAC.</p>",
            },
            {
              question: "Can groups be nested, and how do you model a hierarchy without nesting?",
              solution: "<p>No — IAM groups cannot contain other groups, and they cannot contain roles. You model a hierarchy by <strong>multiple membership</strong>: put every user in a <code>baseline</code> group (MFA enforcement, self-service credential management, regional guardrails) <em>and</em> in their job-function group. Shared permissions are factored into a <strong>customer-managed policy</strong> attached to several groups, so the policy is still written once. A user can be in up to 10 groups by default, and permissions from all of them are unioned.</p>",
            },
            {
              question: "A user is in three groups. One group's policy allows s3:DeleteObject, another explicitly denies it. What happens?",
              solution: "<p>The action is <strong>denied</strong>. All policies from all groups, plus any attached directly to the user, are collected into one evaluation, and an <strong>explicit Deny always overrides any Allow</strong> — no matter which group it came from or how many Allows exist. Order of group membership is irrelevant; IAM evaluation is not sequential. This is exactly why Deny statements are reserved for guardrails you never want a permission grant to accidentally override.</p>",
            },
            {
              question: "How do groups change when a company moves to IAM Identity Center?",
              solution: "<p>They largely disappear, because there are no IAM users to group. In Identity Center you have <strong>groups of SSO identities</strong> — typically synced from Okta, Entra ID or Google Workspace via SCIM — that are <strong>assigned a permission set</strong> in one or more accounts. A permission set materialises as an IAM role in each assigned account, so a person signing in receives <strong>temporary credentials</strong> for that role. The idea is the same (manage permissions once for many people), but it spans the whole organisation rather than a single account and eliminates long-lived credentials.</p>",
            },
            {
              question: "Why attach policies to groups rather than directly to users?",
              solution: "<p>Direct attachment scales as users × permissions and inevitably drifts: adding a permission means editing every user, and offboarding means remembering every grant. Group attachment makes onboarding and offboarding a single API call and makes a permission change land for everyone at once. It also makes auditing tractable — <code>get-group</code> tells you who has a permission set, whereas per-user grants require walking every user. The one caveat is that groups are a single-account construct, so at organisation scale you graduate to Identity Center permission sets.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_groups.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_iam-quotas.html",
            "https://docs.aws.amazon.com/singlesignon/latest/userguide/permissionsetsconcept.html",
          ],
        },
        {
          topic: "IAM Role — An Identity With No Permanent Credentials",
          tags: ["aws", "iam", "roles", "sts", "assume role", "trust policy", "temporary credentials"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  An <strong>IAM role</strong> is an identity that has permissions but <strong>no credentials of its own</strong>. Nobody logs in as a role. Instead, a trusted principal <em>assumes</em> the role and is handed a set of <strong>temporary credentials</strong> that expire. Roles are the single most important concept in IAM, and the answer to a very large fraction of "how should I do X securely?" questions is "with a role".
</p>
<p style="line-height: 1.75;">The best analogy is a <strong>uniform hanging in a locked room</strong>. The uniform grants authority — a hospital badge that opens certain doors. It does not belong to anyone. To use it you must be on the list of people allowed into the room (the trust policy), and when you put it on you get a time-limited shift pass (the temporary credentials). When the shift ends, the authority ends. Many different people can wear the same uniform at different times, and the badge itself is never posted to anyone's home address.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Every role has exactly two kinds of policy</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>The trust policy</strong> (also called the assume-role policy document). This is a <em>resource-based</em> policy attached to the role that answers <strong>"who may assume me?"</strong>. It names principals — an AWS service such as <code>lambda.amazonaws.com</code>, another account, a specific user or role, or a federated identity provider — together with an <code>sts:AssumeRole*</code> action. Every role must have one; a role with no trust policy is unusable.</li>
  <li><strong>The permissions policies</strong> — one or more identity-based policies that answer <strong>"what can I do once assumed?"</strong>. These look exactly like the policies you would attach to a user.</li>
</ul>
<p style="line-height: 1.75;">Both must allow. This is the number one source of confusion when a role "doesn't work": an <code>AccessDenied</code> on the <code>sts:AssumeRole</code> call itself means the <strong>trust policy</strong> is wrong, while an <code>AccessDenied</code> on a later call (say <code>s3:GetObject</code>) means the <strong>permissions policy</strong> is wrong. Read which operation the error names and you know instantly which document to open.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The three ways to assume a role (STS APIs)</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong><code>sts:AssumeRole</code></strong> — the caller is already an AWS principal (an IAM user or another role). Used for cross-account access, privilege elevation within an account, and by AWS services on your behalf.</li>
  <li><strong><code>sts:AssumeRoleWithWebIdentity</code></strong> — the caller presents an <strong>OIDC</strong> token from a provider like GitHub Actions, Google, Cognito, or an EKS service account (IRSA / EKS Pod Identity). This is how you give CI/CD access to AWS <em>without storing any secret</em>, which is a fantastic thing to bring up unprompted.</li>
  <li><strong><code>sts:AssumeRoleWithSAML</code></strong> — the caller presents a SAML 2.0 assertion from a corporate IdP (ADFS, Okta, Entra ID). The classic enterprise console-federation path.</li>
</ul>
<p style="line-height: 1.75;">All three return the same three-part payload: an <strong>AccessKeyId</strong> (starting <code>ASIA</code> — the "S" is a handy tell that it is temporary), a <strong>SecretAccessKey</strong>, and a <strong>SessionToken</strong> that must be sent with every request, plus an <strong>Expiration</strong> timestamp.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Session duration</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Default <strong>1 hour</strong>; requestable range is <strong>15 minutes to 12 hours</strong>, capped by the role's <code>MaxSessionDuration</code> setting (which itself defaults to 1 hour and must be raised explicitly).</li>
  <li><strong>Role chaining</strong> — assuming a role from credentials that already came from an assumed role — is hard-capped at <strong>1 hour</strong>, regardless of <code>MaxSessionDuration</code>. This bites people in multi-hop CI pipelines and is a favourite gotcha question.</li>
  <li>Sessions <strong>cannot be revoked by deleting them</strong>, because there is nothing server-side to delete. To kill sessions early you add an inline Deny conditioned on <code>aws:TokenIssueTime</code> being earlier than "now" — which is precisely what the console's <em>Revoke active sessions</em> button generates.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">How AWS services get roles</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>EC2</strong> → an <strong>instance profile</strong> (a wrapper around a role) attached to the instance. Code on the box fetches credentials from the <strong>Instance Metadata Service</strong> at <code>169.254.169.254</code>. Always use <strong>IMDSv2</strong> (session-token based) — IMDSv1's simple GET is what made SSRF vulnerabilities catastrophic (the Capital One breach).</li>
  <li><strong>Lambda</strong> → an <strong>execution role</strong>; credentials arrive as environment variables that the runtime refreshes.</li>
  <li><strong>ECS</strong> → a <strong>task role</strong> (what your container code may do) which is distinct from the <strong>task execution role</strong> (what the ECS agent may do on your behalf — pull from ECR, write logs). Mixing these two up is a very common real-world bug.</li>
  <li><strong>EKS</strong> → <strong>IRSA</strong> or <strong>EKS Pod Identity</strong>, mapping a Kubernetes service account to a role.</li>
  <li><strong>Service-linked roles</strong> → predefined roles a service creates and owns (e.g. <code>AWSServiceRoleForAutoScaling</code>). You cannot edit their permissions, and they can only be deleted once the service no longer needs them.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Why roles beat users, in one list</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>No stored secret.</strong> Nothing to leak, commit, or forget to rotate.</li>
  <li><strong>Automatic rotation.</strong> Credentials expire in hours and the SDK refreshes them transparently.</li>
  <li><strong>Bounded blast radius.</strong> A leaked temporary credential is useless after expiry.</li>
  <li><strong>Sharper scoping.</strong> A <strong>session policy</strong> passed at assume time can further narrow permissions for that session only — "this build may touch only this one prefix".</li>
  <li><strong>Better auditing.</strong> The <code>RoleSessionName</code> lands in CloudTrail, so <code>assumed-role/deploy/alice-ci-1234</code> tells you exactly who and why.</li>
  <li><strong>Cross-account by design.</strong> One role can be assumed from many accounts, replacing the practice of copying keys between environments.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Two safety features to name unprompted</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>ExternalId</strong> — when you grant a third party (a SaaS monitoring vendor, say) access to your account, require a unique <code>sts:ExternalId</code> in the trust policy. This prevents the <strong>confused deputy</strong> problem, where the vendor could be tricked into using <em>its</em> credentials to reach <em>your</em> account on someone else's behalf.</li>
  <li><strong>iam:PassRole</strong> — handing a role to a service ("run this Lambda with that role") requires the separate <code>iam:PassRole</code> permission. Granting <code>iam:PassRole</code> on <code>*</code> together with the ability to create Lambdas or EC2 instances is a full <strong>privilege-escalation path to admin</strong>, and is one of the most valuable things to flag in a design review.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "A role is an identity with permissions but no long-term credentials. It carries a trust policy saying who may assume it and permissions policies saying what it can do — both must allow, and the operation named in an AccessDenied tells you which one is wrong. A principal assumes it through STS and receives an ASIA-prefixed key, secret and session token that expire between 15 minutes and 12 hours, with role chaining capped at one hour. EC2 gets roles via instance profiles, Lambda via execution roles, ECS via task roles, EKS via IRSA, and external CI via OIDC web-identity federation — so there is no static secret anywhere. For third parties I require an ExternalId, and I watch iam:PassRole because it is a classic escalation path."</div>
</div>`,
          examples: [
            `# ---------- 1. Create a role that Lambda can assume ----------
cat > trust-lambda.json <<'EOF'
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "Service": "lambda.amazonaws.com" },
    "Action": "sts:AssumeRole"
  }]
}
EOF
aws iam create-role --role-name orders-fn-role \\
  --assume-role-policy-document file://trust-lambda.json \\
  --max-session-duration 3600
aws iam attach-role-policy --role-name orders-fn-role \\
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole

# ---------- 2. Cross-account trust, hardened ----------
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "AWS": "arn:aws:iam::222233334444:role/ci-runner" },
    "Action": "sts:AssumeRole",
    "Condition": {
      "StringEquals": { "sts:ExternalId": "b7c1f0e2-vendor-specific" },
      "Bool":         { "aws:MultiFactorAuthPresent": "true" },
      "IpAddress":    { "aws:SourceIp": ["203.0.113.0/24"] }
    }
  }]
}

# ---------- 3. GitHub Actions via OIDC — zero stored secrets ----------
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "Federated": "arn:aws:iam::111122223333:oidc-provider/token.actions.githubusercontent.com" },
    "Action": "sts:AssumeRoleWithWebIdentity",
    "Condition": {
      "StringEquals": { "token.actions.githubusercontent.com:aud": "sts.amazonaws.com" },
      "StringLike":   { "token.actions.githubusercontent.com:sub": "repo:my-org/my-repo:ref:refs/heads/main" }
    }
  }]
}
# CRITICAL: the "sub" condition must be present and must NOT be "repo:my-org/*".
# Without it, ANY GitHub repo in the world can assume this role.

# ---------- 4. Assume a role and use it ----------
aws sts assume-role \\
  --role-arn arn:aws:iam::111122223333:role/deploy \\
  --role-session-name alice-deploy-2026-09-14 \\
  --duration-seconds 3600 \\
  --external-id b7c1f0e2-vendor-specific
# {"Credentials":{"AccessKeyId":"ASIA...","SecretAccessKey":"...",
#                 "SessionToken":"...","Expiration":"2026-09-14T12:00:00Z"}}

export AWS_ACCESS_KEY_ID=ASIA... AWS_SECRET_ACCESS_KEY=... AWS_SESSION_TOKEN=...
aws sts get-caller-identity
# Arn: arn:aws:sts::111122223333:assumed-role/deploy/alice-deploy-2026-09-14
#      ^ the session name is your audit trail

# ---------- 5. Let the SDK do it for you (~/.aws/config) ----------
# [profile prod]
# role_arn       = arn:aws:iam::111122223333:role/deploy
# source_profile = default
# mfa_serial     = arn:aws:iam::111122223333:mfa/alice
# external_id    = b7c1f0e2-vendor-specific
aws s3 ls --profile prod     # credentials fetched + refreshed automatically

# ---------- 6. Narrow a single session further with a session policy ----------
aws sts assume-role \\
  --role-arn arn:aws:iam::111122223333:role/deploy \\
  --role-session-name build-42 \\
  --policy '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Action":"s3:PutObject","Resource":"arn:aws:s3:::artifacts/build-42/*"}]}'
# Effective permissions = role policy INTERSECT session policy.

# ---------- 7. Revoke every session issued before now ----------
aws iam put-role-policy --role-name deploy --policy-name RevokeOldSessions \\
  --policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Deny","Action":"*","Resource":"*",
    "Condition":{"DateLessThan":{"aws:TokenIssueTime":"2026-09-14T11:30:00Z"}}}]}'`,
          ],
          questions: [
            {
              question: "What is the difference between a trust policy and a permissions policy on a role?",
              solution: "<p>The <strong>trust policy</strong> is a resource-based policy attached to the role defining <strong>who may assume it</strong> — it names principals (a service, an account, a user or role, a federated provider) and an <code>sts:AssumeRole*</code> action. The <strong>permissions policies</strong> are identity-based policies defining <strong>what the role may do</strong> once assumed. Both must allow. Diagnostically: an <code>AccessDenied</code> on the <code>AssumeRole</code> call itself points at the trust policy (or the caller's missing <code>sts:AssumeRole</code> permission); an <code>AccessDenied</code> on a subsequent service call points at the permissions policy.</p>",
            },
            {
              question: "Why is role chaining limited to one hour, and when does that bite?",
              solution: "<p>When you assume a role using credentials that themselves came from an assumed role, STS hard-caps the new session at <strong>1 hour</strong> and silently ignores a larger <code>--duration-seconds</code> or the role's <code>MaxSessionDuration</code>. It bites in multi-hop pipelines — a CI runner assumes a hub role, then a spoke role in a target account — where a long build simply dies mid-run with <code>ExpiredToken</code>. Fixes: refresh credentials inside the job rather than fetching once at the start (the SDK's credential provider does this automatically if you configure the profile instead of exporting env vars), flatten the chain so the source principal assumes the final role directly, or shorten the work between refreshes.</p>",
            },
            {
              question: "What is the confused deputy problem and how does ExternalId solve it?",
              solution: "<p>You give a SaaS vendor's role permission to assume a role in your account. That vendor serves many customers with the same role. If an attacker signs up and tells the vendor 'my account is 111122223333' (yours), the vendor's deputy would happily use its own legitimate credentials to act in your account on the attacker's behalf — hence 'confused deputy'. The fix is a secret-ish shared value: your trust policy requires <code>\"StringEquals\": {\"sts:ExternalId\": \"&lt;unique value&gt;\"}</code>, and the vendor must pass that exact value on <code>AssumeRole</code>. Since the attacker does not know your ExternalId, the vendor cannot be tricked into reaching your account. AWS requires vendors to generate a unique, non-guessable ExternalId per customer.</p>",
            },
            {
              question: "How do you revoke a compromised role session immediately?",
              solution: "<p>Temporary credentials have no server-side record to delete, so you make them fail <em>authorization</em> instead. Attach an inline policy to the role with <code>Deny *</code> conditioned on <code>\"DateLessThan\": {\"aws:TokenIssueTime\": \"&lt;now&gt;\"}</code> — every session issued before that instant is instantly dead while newly assumed sessions still work. That is exactly what the console's <em>Revoke active sessions</em> button generates. Heavier alternatives: detach the role's permissions policies (kills current <em>and</em> future sessions) or delete the role. Then close the door: tighten the trust policy, lower <code>MaxSessionDuration</code>, and review CloudTrail for what the session did.</p>",
            },
            {
              question: "Why is OIDC federation better than an IAM user for GitHub Actions, and what must the trust policy get right?",
              solution: "<p>With OIDC there is <strong>no stored secret at all</strong>: GitHub mints a short-lived signed token per workflow run, AWS verifies it against the registered OIDC provider and returns temporary credentials. Nothing to leak, nothing to rotate. The critical detail is the <strong><code>sub</code> claim condition</strong>: you must restrict it to your specific repo and ref, e.g. <code>repo:my-org/my-repo:ref:refs/heads/main</code> (or an environment claim). A trust policy that checks only <code>aud</code>, or uses a loose wildcard like <code>repo:*</code>, lets <em>any</em> GitHub repository in the world assume your role — a real and repeatedly exploited misconfiguration.</p>",
            },
            {
              question: "What is the difference between an ECS task role and a task execution role?",
              solution: "<p>The <strong>task role</strong> is what <em>your application code inside the container</em> uses — e.g. reading from S3 or writing to DynamoDB. The <strong>task execution role</strong> is what the <em>ECS agent</em> uses on your behalf before and around your code: pulling the image from ECR, fetching secrets from Secrets Manager or SSM for the task definition, and writing container logs to CloudWatch. A task that fails to start with an image-pull or logging error usually has an execution-role problem, while a task that starts and then gets AccessDenied from an SDK call has a task-role problem.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html",
            "https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-idp_oidc.html",
          ],
        },
        {
          topic: "IAM Policy — The JSON Document That Defines Permissions",
          tags: ["aws", "iam", "policy", "json", "managed policy", "inline policy", "resource policy"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  A <strong>policy</strong> is a JSON document that describes permissions. It is the only way permissions are expressed in AWS — there are no checkboxes underneath, the console UI simply writes JSON for you. Understanding the <em>kinds</em> of policy, and which attaches to what, is the backbone of every IAM design question.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The shape of every policy</h4>
<p style="line-height: 1.75;">Two top-level fields: <code>Version</code> and <code>Statement</code>.</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><code>"Version": "2012-10-17"</code> — always use this exact string. It is a <strong>policy language version</strong>, not a date you pick, and it is <em>not</em> the version of your document. The older <code>2008-10-17</code> silently disables <strong>policy variables</strong> like <code>\${aws:username}</code>, so an omitted or stale Version is a real and subtle bug.</li>
  <li><code>Statement</code> — an array of statement objects (a single object is also legal). Statements are evaluated together, never in order.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The two big families</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Identity-based policies</strong> attach to a <em>principal</em> — a user, a group, or a role. They say "this identity may do these things". They do <strong>not</strong> contain a <code>Principal</code> element, because the principal is whoever the policy is attached to.</li>
  <li><strong>Resource-based policies</strong> attach to a <em>resource</em> — an S3 bucket, an SQS queue, an SNS topic, a KMS key, a Lambda function, a Secrets Manager secret, an API Gateway API, an ECR repository, an EventBridge bus, and a role's trust policy. They <strong>must</strong> contain a <code>Principal</code>, because they say "these principals may do these things to me".</li>
</ul>
<p style="line-height: 1.75;">The distinction matters enormously for <strong>cross-account access</strong>. Within a single account, an Allow in <em>either</em> the identity policy or the resource policy is enough. Across accounts, you need an Allow on <strong>both sides</strong>: the caller's account must permit the call, and the resource's account must permit the caller. (KMS is the notable variation — a KMS key policy must always grant access, an identity policy alone is never sufficient.)</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Managed vs inline</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>AWS managed policies</strong> — written and maintained by AWS (<code>ReadOnlyAccess</code>, <code>AmazonS3FullAccess</code>, <code>PowerUserAccess</code>). Free, instantly available, updated by AWS as new services launch. That last part is double-edged: a policy you attached in 2023 may grant more today than it did then. Good for prototyping, rarely right for least privilege.</li>
  <li><strong>Customer managed policies</strong> — your own reusable documents with an ARN, attachable to many identities. They are <strong>versioned</strong>: up to 5 versions kept, with one marked default, so a bad change is a one-command rollback via <code>set-default-policy-version</code>. This is the workhorse and the right default choice.</li>
  <li><strong>Inline policies</strong> — embedded directly in one user, group or role, with no separate ARN and no versioning. They are deleted with the identity, which gives a strict 1:1 lifecycle. Use them when a permission must never be accidentally reused elsewhere, or for revocation guardrails like the <code>aws:TokenIssueTime</code> deny. Their downside is invisibility — they do not appear in a policy listing, so audits miss them.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The other policy types (name these and you sound senior)</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Permissions boundary</strong> — an identity policy attached to a user or role that sets the <em>maximum</em> permissions it can ever have. It grants nothing by itself; effective permissions are the <strong>intersection</strong> of the boundary and the identity policies. This is how you safely let developers create their own roles without letting them create an admin role.</li>
  <li><strong>Service Control Policy (SCP)</strong> — an AWS Organizations guardrail applied to accounts or OUs. Also a maximum, not a grant, and it applies to every principal in the account including member-account root (but never to the management account).</li>
  <li><strong>Resource Control Policy (RCP)</strong> — the newer mirror image of an SCP: an organisation-wide maximum on what can be done <em>to resources</em> in your accounts, regardless of who is calling. Excellent for "no data in our S3 buckets may ever be read by a principal outside our org".</li>
  <li><strong>Session policy</strong> — passed inline at <code>AssumeRole</code> time; effective permissions are the intersection with the role's policies, for that session only.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Limits that shape real designs</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>10 managed policies</strong> per user/group/role (raisable to 20). Teams hit this and end up merging policies.</li>
  <li>Managed policy document: <strong>6,144 characters</strong>. Inline policy totals: 2,048 for a user, 5,120 for a group, 10,240 for a role. Whitespace does not count, but this is why big policies get factored or switched to ABAC.</li>
  <li><strong>5 versions</strong> per managed policy — delete old ones or new saves fail.</li>
  <li><strong>1,500 customer managed policies</strong> per account.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">How to write a good one</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Start from <strong>nothing</strong>, add what fails. Do not start from <code>*</code> and subtract.</li>
  <li>Use <strong>IAM Access Analyzer policy generation</strong> to build a policy from the CloudTrail history of what the workload actually called — this turns guesswork into evidence.</li>
  <li>Run <strong>Access Analyzer policy validation</strong> (or <code>iam:ValidatePolicy</code>) on every policy in CI; it catches overly broad grants, invalid actions and syntax errors before deploy.</li>
  <li>Use <code>Sid</code> values as human labels — they also appear in <code>simulate-principal-policy</code> output, so a well-named Sid tells you exactly which statement matched.</li>
  <li>Keep policies <strong>small and composable</strong>, named by job function, stored in version control, and deployed through IaC — a policy edited by hand in the console is a policy nobody can review.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "A policy is a JSON document with a Version and a list of Statements. Identity-based policies attach to users, groups and roles and omit Principal; resource-based policies attach to resources like buckets, queues, KMS keys and role trust relationships and require Principal. Same-account access needs an Allow on either side, cross-account needs both. I use customer managed policies as the default because they are reusable and versioned so I can roll back, inline policies only when the permission must die with the identity, and AWS managed policies mostly for prototyping since AWS can widen them over time. On top of those sit permissions boundaries, SCPs, RCPs and session policies, which are all maximums rather than grants."</div>
</div>`,
          examples: [
            `# ---------- Identity-based: no Principal, attaches to a user/group/role ----------
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "ReadTeamPrefixOnly",
    "Effect": "Allow",
    "Action": ["s3:GetObject", "s3:ListBucket"],
    "Resource": [
      "arn:aws:s3:::company-data",
      "arn:aws:s3:::company-data/payments/*"
    ]
  }]
}

# ---------- Resource-based: Principal is REQUIRED ----------
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "AllowPartnerAccountRead",
    "Effect": "Allow",
    "Principal": { "AWS": "arn:aws:iam::222233334444:role/partner-reader" },
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::company-data/shared/*",
    "Condition": { "Bool": { "aws:SecureTransport": "true" } }
  }]
}

# ---------- Customer managed policy with versioning + rollback ----------
aws iam create-policy --policy-name DeployToStaging \\
  --policy-document file://deploy.json \\
  --description "CI deploy permissions for the staging account"

aws iam create-policy-version \\
  --policy-arn arn:aws:iam::111122223333:policy/DeployToStaging \\
  --policy-document file://deploy-v2.json --set-as-default

# Oops -> roll back in one command
aws iam list-policy-versions --policy-arn arn:aws:iam::111122223333:policy/DeployToStaging
aws iam set-default-policy-version \\
  --policy-arn arn:aws:iam::111122223333:policy/DeployToStaging --version-id v1

# Only 5 versions allowed — prune before creating a 6th
aws iam delete-policy-version \\
  --policy-arn arn:aws:iam::111122223333:policy/DeployToStaging --version-id v1

# ---------- Inline policy: dies with the role, invisible to policy listings ----------
aws iam put-role-policy --role-name deploy --policy-name DenyProdDeletes \\
  --policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Deny",
    "Action":["s3:DeleteBucket","rds:DeleteDBInstance"],"Resource":"*"}]}'

# ---------- Permissions boundary: a ceiling, not a grant ----------
aws iam put-user-permissions-boundary --user-name junior-dev \\
  --permissions-boundary arn:aws:iam::111122223333:policy/DevBoundary
# effective permissions = identity policies  INTERSECT  boundary

# ---------- Validate + generate, instead of guessing ----------
aws accessanalyzer validate-policy \\
  --policy-type IDENTITY_POLICY --policy-document file://deploy.json \\
  --query 'findings[].{Type:findingType,Issue:issueCode,Detail:findingDetails}'

aws accessanalyzer start-policy-generation \\
  --policy-generation-details principalArn=arn:aws:iam::111122223333:role/legacy-app \\
  --cloud-trail-details file://trail-details.json

# ---------- Find every inline policy in the account (audits miss these) ----------
for r in $(aws iam list-roles --query 'Roles[].RoleName' --output text); do
  for p in $(aws iam list-role-policies --role-name "$r" --query 'PolicyNames[]' --output text); do
    echo "ROLE $r -> INLINE $p"
  done
done`,
          ],
          questions: [
            {
              question: "What is the difference between an identity-based and a resource-based policy?",
              solution: "<p>An <strong>identity-based</strong> policy attaches to a user, group or role and says what that principal may do; it has <strong>no <code>Principal</code> element</strong> because the principal is implied by attachment. A <strong>resource-based</strong> policy attaches to a resource — S3 bucket, SQS queue, SNS topic, KMS key, Lambda function, Secrets Manager secret, or a role's trust policy — and <strong>requires <code>Principal</code></strong>. The practical difference is cross-account: within one account an Allow on <em>either</em> side suffices, but <strong>across accounts both sides must allow</strong>. KMS is the exception — the key policy must grant access; an identity policy alone never works.</p>",
            },
            {
              question: "When would you use an inline policy instead of a managed policy?",
              solution: "<p>When you want a <strong>strict one-to-one lifecycle</strong> — the permission must be deleted along with the identity and must never be accidentally attached to something else. Typical cases: a break-glass role's unique grant, and revocation guardrails such as the <code>aws:TokenIssueTime</code> Deny used to kill active sessions. Otherwise prefer <strong>customer managed</strong> policies: they are reusable, have an ARN, and are <strong>versioned</strong> (5 versions, one default) so a bad change rolls back with a single <code>set-default-policy-version</code>. The real cost of inline policies is auditability — they do not show up in policy listings, so they hide from reviews.</p>",
            },
            {
              question: "Why does Version have to be '2012-10-17'?",
              solution: "<p>It identifies the <strong>policy language version</strong>, not your document's revision. <code>2012-10-17</code> is the current language and the only one you should write. The older <code>2008-10-17</code> does not support <strong>policy variables</strong> such as <code>\${aws:username}</code> or <code>\${aws:PrincipalTag/team}</code>, so a policy that looks correct silently treats the variable as a literal string and matches nothing — a nasty, quiet failure. Omitting <code>Version</code> entirely defaults to the old language, so always include it explicitly.</p>",
            },
            {
              question: "What is a permissions boundary and how is it different from an SCP?",
              solution: "<p>Both are <strong>maximums, not grants</strong> — neither gives any permission on its own, and effective access is the intersection with the identity's policies. A <strong>permissions boundary</strong> is attached to a single IAM user or role and caps that one identity; its flagship use is <strong>safe delegation</strong>, letting developers create roles while forcing every role they create to carry the boundary, so they cannot manufacture an admin. An <strong>SCP</strong> is an AWS Organizations control attached to an account or OU that caps <em>every</em> principal in those accounts, including member-account root, but never applies to the management account. Boundary = per-identity ceiling; SCP = per-account ceiling.</p>",
            },
            {
              question: "What are the practical size limits on policies and why do they matter?",
              solution: "<p>A managed policy document is capped at <strong>6,144 characters</strong>; inline policy totals are 2,048 per user, 5,120 per group and 10,240 per role; an identity can have <strong>10 managed policies</strong> attached (raisable to 20); and a managed policy keeps <strong>5 versions</strong>. They matter because a least-privilege policy that enumerates hundreds of specific ARNs will blow through them. The escapes are: factor into multiple composable policies, use wildcards on well-designed resource naming or paths, and — the scalable answer — move to <strong>ABAC</strong>, where one short policy matches resource tags against principal tags instead of listing every ARN.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html",
          ],
        },
        {
          topic: "Policy Anatomy — Effect, Action, Resource, Principal, Condition",
          tags: ["aws", "iam", "policy", "condition keys", "notaction", "policy variables"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Every IAM statement answers five questions. If you can recite them and explain the traps in each, you can read and write any AWS policy. The mental sentence is: <strong>"[Effect] [Principal] to perform [Action] on [Resource] when [Condition]."</strong>
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">1. Effect — Allow or Deny</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Only two legal values, and it is <strong>required</strong> in every statement.</li>
  <li><strong>Deny always wins.</strong> One matching Deny anywhere in any applicable policy defeats every Allow, and nothing can override it. That is why Deny is the right tool for hard guardrails ("never delete CloudTrail", "never leave these regions") and the wrong tool for everyday permission shaping — a sprawl of Denies becomes impossible to reason about.</li>
  <li>Because the default is already deny, an Allow-only policy set is usually cleaner. Reach for Deny when you must stop something that a broader Allow would otherwise permit.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">2. Action — what operation</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Always <code>service:Operation</code>, matching the API name: <code>s3:GetObject</code>, <code>ec2:RunInstances</code>, <code>dynamodb:Query</code>.</li>
  <li><strong>Case-insensitive</strong> for matching, but write it in the documented casing so humans can read it.</li>
  <li>Wildcards allowed: <code>s3:Get*</code>, <code>s3:*</code>, or <code>"*"</code> for everything. An array lists several.</li>
  <li>Some actions look like resources but are not: <code>s3:ListBucket</code> is a <em>bucket</em>-level action while <code>s3:GetObject</code> is an <em>object</em>-level one. Putting the wrong ARN with either is the single most common S3 policy bug.</li>
  <li><strong><code>NotAction</code></strong> means "every action except these". Powerful and dangerous: with Allow it grants everything you did not think of, including future services AWS launches. It is genuinely useful with Deny — "deny everything except the actions needed to set up MFA".</li>
  <li>Beware actions that do not support resource-level permissions — for those, <code>"Resource": "*"</code> is the only legal value, and the IAM docs' service reference tables tell you which. You then scope with conditions instead.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">3. Resource — on what</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>One or more <strong>ARNs</strong>, with <code>*</code> and <code>?</code> wildcards permitted in most segments.</li>
  <li>Required in identity-based policies; in resource-based policies it is optional because the resource is implied (though S3 bucket policies still state it).</li>
  <li>The S3 trap again: bucket-level actions need <code>arn:aws:s3:::my-bucket</code>, object-level actions need <code>arn:aws:s3:::my-bucket/*</code>. They are different ARNs and most real policies need <strong>both</strong> listed.</li>
  <li><strong><code>NotResource</code></strong> exists and carries the same "everything except" danger as <code>NotAction</code>.</li>
  <li>Policy variables can appear here — <code>arn:aws:s3:::team-bucket/\${aws:username}/*</code> gives every user their own private prefix with a single statement, which is elegant and scales to thousands of users.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">4. Principal — who (resource-based policies only)</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Required</strong> in resource-based policies and role trust policies; <strong>illegal</strong> in identity-based policies.</li>
  <li>Forms: <code>{"AWS": "arn:aws:iam::111122223333:role/app"}</code>, <code>{"AWS": "111122223333"}</code> (the whole account — meaning "any principal in that account that its own admin also permits"), <code>{"Service": "lambda.amazonaws.com"}</code>, <code>{"Federated": "&lt;provider ARN&gt;"}</code>, <code>{"CanonicalUser": "…"}</code>, or <code>"*"</code>.</li>
  <li><code>"Principal": "*"</code> means <strong>anyone on the internet</strong> unless a Condition narrows it. This is how public S3 buckets happen. If you use it, always pair with <code>aws:PrincipalOrgID</code>, <code>aws:PrincipalAccount</code>, <code>aws:SourceVpce</code> or similar.</li>
  <li><strong>Groups can never be principals.</strong> Point at a role instead.</li>
  <li>There is also <code>NotPrincipal</code> — rarely correct, easy to get wrong, and best avoided in favour of a Condition.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">5. Condition — under what circumstances</h4>
<p style="line-height: 1.75;">This is where IAM becomes expressive. The structure is three levels: <strong>operator → condition key → value(s)</strong>.</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Operators</strong>: <code>StringEquals</code>, <code>StringLike</code>, <code>StringNotEquals</code>, <code>ArnLike</code>, <code>NumericLessThan</code>, <code>DateGreaterThan</code>, <code>Bool</code>, <code>IpAddress</code>, <code>Null</code>, plus <code>ForAllValues:</code>/<code>ForAnyValue:</code> set operators for multi-valued keys.</li>
  <li><strong>The <code>IfExists</code> suffix</strong> (e.g. <code>StringEqualsIfExists</code>, <code>BoolIfExists</code>) means "if the key is present it must match; if it is absent, this condition passes". Critical for keys that are not always in the request context — the usual example being <code>aws:MultiFactorAuthPresent</code>, which is simply absent for many service-to-service calls rather than false.</li>
  <li><strong>Logic</strong>: multiple keys inside one operator block are <strong>AND</strong>ed; multiple values for one key are <strong>OR</strong>ed; multiple operator blocks are <strong>AND</strong>ed. Getting this wrong produces policies that are far broader than intended.</li>
  <li><strong>Global keys</strong> worth memorising: <code>aws:PrincipalArn</code>, <code>aws:PrincipalOrgID</code>, <code>aws:PrincipalTag/&lt;k&gt;</code>, <code>aws:RequestTag/&lt;k&gt;</code>, <code>aws:ResourceTag/&lt;k&gt;</code>, <code>aws:TagKeys</code>, <code>aws:SourceIp</code>, <code>aws:VpcSourceIp</code>, <code>aws:SourceVpc</code>, <code>aws:SourceVpce</code>, <code>aws:SecureTransport</code>, <code>aws:RequestedRegion</code>, <code>aws:CurrentTime</code>, <code>aws:MultiFactorAuthPresent</code>, <code>aws:MultiFactorAuthAge</code>, <code>aws:TokenIssueTime</code>, <code>aws:SourceArn</code>, <code>aws:SourceAccount</code>, <code>aws:userid</code>, <code>aws:username</code>, <code>aws:PrincipalIsAWSService</code>, <code>aws:ViaAWSService</code>.</li>
  <li><strong>Service-specific keys</strong> are often the sharpest tool: <code>s3:prefix</code>, <code>s3:x-amz-server-side-encryption</code>, <code>ec2:InstanceType</code>, <code>iam:PassedToService</code>, <code>kms:ViaService</code>.</li>
  <li><strong>Trap:</strong> <code>aws:SourceIp</code> does not work as you expect for calls that traverse an AWS service on your behalf (the source IP becomes the service's). Use <code>aws:VpcSourceIp</code>/<code>aws:SourceVpce</code> for VPC endpoint traffic, and <code>aws:ViaAWSService</code> to distinguish direct from service-forwarded calls.</li>
  <li><strong>Trap:</strong> if a condition key is <em>absent</em> from the request, a plain (non-<code>IfExists</code>) operator does <strong>not match</strong> — which silently neuters a Deny you were relying on.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Plus two optional fields</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong><code>Sid</code></strong> — a statement label. Optional and free-form in identity policies (must be unique within a resource policy). Use it: it shows up in <code>simulate-principal-policy</code> results, which makes debugging dramatically faster.</li>
  <li><strong>Policy variables</strong> — <code>\${aws:username}</code>, <code>\${aws:userid}</code>, <code>\${aws:PrincipalTag/team}</code>, <code>\${saml:sub}</code> — substituted at evaluation time. They require <code>Version: 2012-10-17</code> and are the foundation of ABAC.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "A statement is Effect, Action, Resource, optionally Principal, and optionally Condition — 'allow or deny this principal to do these actions on these resources under these circumstances'. Principal appears only in resource-based policies and trust policies, never in identity policies. Deny always beats Allow. Conditions are operator, key, value; keys AND together, values OR, and I use the IfExists suffix for keys like aws:MultiFactorAuthPresent that may be absent rather than false — otherwise the condition silently fails to match. I avoid NotAction with Allow because it grants every service AWS launches in future."</div>
</div>`,
          examples: [
            `# ---------- All five elements in one statement ----------
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PartnerReadEncryptedOverTLSFromOurOrg",
    "Effect": "Allow",
    "Principal": { "AWS": "arn:aws:iam::222233334444:role/partner" },
    "Action": ["s3:GetObject", "s3:GetObjectVersion"],
    "Resource": "arn:aws:s3:::shared-data/reports/*",
    "Condition": {
      "Bool":         { "aws:SecureTransport": "true" },
      "StringEquals": { "aws:PrincipalOrgID": "o-abc123xyz" },
      "DateLessThan": { "aws:CurrentTime": "2026-12-31T23:59:59Z" }
    }
  }]
}

# ---------- The classic S3 mistake: bucket vs object ARNs ----------
# WRONG — ListBucket on an object ARN silently never matches
{ "Effect":"Allow", "Action":["s3:ListBucket","s3:GetObject"], "Resource":"arn:aws:s3:::my-bucket/*" }

# RIGHT — two different ARNs, and s3:prefix scopes the listing
{
  "Version": "2012-10-17",
  "Statement": [
    { "Sid":"ListOnlyMyFolder", "Effect":"Allow", "Action":"s3:ListBucket",
      "Resource":"arn:aws:s3:::my-bucket",
      "Condition":{"StringLike":{"s3:prefix":["payments/*"]}} },
    { "Sid":"ReadWriteMyFolder", "Effect":"Allow",
      "Action":["s3:GetObject","s3:PutObject"],
      "Resource":"arn:aws:s3:::my-bucket/payments/*" }
  ]
}

# ---------- Policy variables: one statement, per-user home folders ----------
{
  "Effect": "Allow",
  "Action": ["s3:GetObject","s3:PutObject","s3:DeleteObject"],
  "Resource": "arn:aws:s3:::team-bucket/home/\${aws:username}/*"
}

# ---------- Condition logic: AND vs OR ----------
"Condition": {
  "StringEquals": {
    "aws:PrincipalTag/team": ["payments","billing"],   // OR  (either team)
    "aws:RequestedRegion":   "eu-west-1"               // AND (and this region)
  },
  "Bool": { "aws:MultiFactorAuthPresent": "true" }     // AND (and MFA)
}

# ---------- IfExists: the difference between working and silently not ----------
# BAD  — for calls where the key is absent, this Deny never fires
"Condition": { "Bool": { "aws:MultiFactorAuthPresent": "false" } }
# GOOD — absent counts as "not MFA", so the Deny fires
"Condition": { "BoolIfExists": { "aws:MultiFactorAuthPresent": "false" } }

# ---------- NotAction used correctly (with Deny), and dangerously (with Allow) ----------
# SAFE: deny everything except the MFA-enrolment actions
{ "Effect":"Deny", "NotAction":["iam:EnableMFADevice","iam:CreateVirtualMFADevice","iam:ListMFADevices"],
  "Resource":"*", "Condition":{"BoolIfExists":{"aws:MultiFactorAuthPresent":"false"}} }

# DANGEROUS: grants every action in every service AWS has or will ever launch, except IAM
{ "Effect":"Allow", "NotAction":"iam:*", "Resource":"*" }

# ---------- Guardrail: block regions, but never break global services ----------
{
  "Effect": "Deny",
  "NotAction": ["iam:*","organizations:*","route53:*","cloudfront:*","support:*","sts:*","budgets:*"],
  "Resource": "*",
  "Condition": { "StringNotEquals": { "aws:RequestedRegion": ["eu-west-1","us-east-1"] } }
}

# ---------- Prove which statement matched ----------
aws iam simulate-custom-policy \\
  --policy-input-list file://policy.json \\
  --action-names s3:GetObject \\
  --resource-arns arn:aws:s3:::shared-data/reports/q4.csv \\
  --query 'EvaluationResults[].{Decision:EvalDecision,MatchedSid:MatchedStatements[].SourcePolicyId}'`,
          ],
          questions: [
            {
              question: "Walk me through the elements of an IAM policy statement.",
              solution: "<p><strong>Effect</strong> (Allow or Deny, required). <strong>Action</strong> — the API operations as <code>service:Operation</code>, wildcards allowed. <strong>Resource</strong> — the ARNs affected, required in identity policies. <strong>Principal</strong> — who the statement applies to; <strong>required in resource-based and trust policies, forbidden in identity policies</strong>. <strong>Condition</strong> — optional tests against the request context, structured as operator → key → value. Plus an optional <code>Sid</code> label, and the inverse forms <code>NotAction</code>/<code>NotResource</code>/<code>NotPrincipal</code>. Read as a sentence: allow or deny <em>this principal</em> to do <em>these actions</em> on <em>these resources</em> when <em>these conditions</em> hold.</p>",
            },
            {
              question: "Why is NotAction with Allow dangerous?",
              solution: "<p>Because it grants <strong>everything except</strong> the listed actions — including every action in every AWS service that does not exist yet. <code>{\"Effect\":\"Allow\",\"NotAction\":\"iam:*\",\"Resource\":\"*\"}</code> looks like a tidy 'power user' grant but silently expands every time AWS launches a service, and it happily permits things like <code>organizations:LeaveOrganization</code> or <code>ec2:RunInstances</code> at any size. <code>NotAction</code> is legitimately useful with <strong>Deny</strong> — 'deny everything except the actions needed to enrol an MFA device' — where the same open-ended behaviour is exactly what you want.</p>",
            },
            {
              question: "Explain the difference between StringEquals and StringEqualsIfExists.",
              solution: "<p><code>StringEquals</code> requires the key to be <strong>present in the request context and equal</strong> to a listed value; if the key is missing, the condition does <strong>not match</strong>. <code>StringEqualsIfExists</code> matches when the key is present and equal <strong>or when the key is absent entirely</strong>. This matters most on <code>Deny</code> statements: a Deny conditioned on plain <code>Bool: {\"aws:MultiFactorAuthPresent\": \"false\"}</code> silently fails to fire for requests where the key is absent (many service-to-service and long-term-credential contexts), leaving the hole you were trying to close. Use <code>BoolIfExists</code> there.</p>",
            },
            {
              question: "In a Condition block, when do multiple entries AND versus OR?",
              solution: "<p>Multiple <strong>values for one key</strong> are <strong>OR</strong>ed — the request matches if any value matches. Multiple <strong>keys inside one operator block</strong> are <strong>AND</strong>ed. Multiple <strong>operator blocks</strong> are also <strong>AND</strong>ed. So a block with <code>StringEquals</code> on two keys plus a <code>Bool</code> block requires all three to hold, but a key listing two team names accepts either. For multi-valued keys (like <code>aws:TagKeys</code>) you need the set operators <code>ForAllValues:</code> ('every value in the request is in my list') and <code>ForAnyValue:</code> ('at least one is') — and <code>ForAllValues</code> also matches when the key is absent, another quiet gap.</p>",
            },
            {
              question: "Why does a policy allowing s3:ListBucket on arn:aws:s3:::my-bucket/* not work?",
              solution: "<p>Because <code>s3:ListBucket</code> is a <strong>bucket-level</strong> action and its resource is the bucket ARN <code>arn:aws:s3:::my-bucket</code> — with no trailing <code>/*</code>. The <code>/*</code> form addresses <strong>objects</strong>, which is what <code>s3:GetObject</code> and <code>s3:PutObject</code> need. A working S3 policy almost always lists <strong>both ARNs in separate statements</strong>. To restrict what a user can <em>see</em> in a listing you additionally condition <code>s3:ListBucket</code> on <code>s3:prefix</code>, since otherwise the user can enumerate every key name in the bucket even if they cannot read the objects.</p>",
            },
            {
              question: "What does \"Principal\": \"*\" mean, and how do you make it safe?",
              solution: "<p>It means <strong>every principal, including anonymous callers on the public internet</strong> — this is precisely how buckets end up in the news. It is only acceptable when a <code>Condition</code> narrows it to something meaningful: <code>aws:PrincipalOrgID</code> for 'anyone in my organization', <code>aws:PrincipalAccount</code> or an <code>ArnLike</code> on <code>aws:PrincipalArn</code> for specific identities, <code>aws:SourceVpce</code> for traffic through a specific VPC endpoint, or <code>aws:SourceArn</code>/<code>aws:SourceAccount</code> when an AWS service is the caller. IAM Access Analyzer's external-access findings exist to catch the cases where you forgot.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_variables.html",
          ],
        },
        {
          topic: "ARN — How a Resource Is Named Inside a Policy",
          tags: ["aws", "iam", "arn", "resources", "wildcards", "policy"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  An <strong>ARN (Amazon Resource Name)</strong> is the globally unique address of a thing in AWS. Policies talk about resources exclusively through ARNs, so being fluent in their structure is what lets you write a tight policy instead of shrugging and typing <code>"Resource": "*"</code>.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The format</h4>
<p style="line-height: 1.75;"><code>arn:partition:service:region:account-id:resource</code></p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>arn</strong> — literal prefix, always.</li>
  <li><strong>partition</strong> — <code>aws</code> for the standard commercial regions, <code>aws-cn</code> for China, <code>aws-us-gov</code> for GovCloud. Hardcoding <code>aws</code> is exactly why some infrastructure code breaks when deployed to GovCloud.</li>
  <li><strong>service</strong> — the namespace: <code>s3</code>, <code>iam</code>, <code>ec2</code>, <code>dynamodb</code>, <code>lambda</code>, <code>sts</code>.</li>
  <li><strong>region</strong> — e.g. <code>us-east-1</code>. <strong>Empty for global services</strong> such as IAM, S3 buckets, Route 53 and CloudFront — hence the double colon.</li>
  <li><strong>account-id</strong> — the 12-digit account number. <strong>Empty for S3</strong>, because bucket names are globally unique so no account is needed to disambiguate — hence S3's distinctive triple colon.</li>
  <li><strong>resource</strong> — the service-specific part, in one of three shapes: <code>resource-id</code>, <code>resource-type/resource-id</code>, or <code>resource-type:resource-id</code>. Which separator a service uses is simply a fact you look up.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Worked examples</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><code>arn:aws:s3:::my-bucket</code> — the bucket itself (no region, no account).</li>
  <li><code>arn:aws:s3:::my-bucket/reports/q4.csv</code> — an object. <strong>Different resource, different ARN.</strong></li>
  <li><code>arn:aws:iam::111122223333:user/alice</code> — IAM is global, so region is empty.</li>
  <li><code>arn:aws:iam::111122223333:role/engineering/deploy</code> — note the <strong>path</strong> segment before the name.</li>
  <li><code>arn:aws:sts::111122223333:assumed-role/deploy/alice-session</code> — what you actually are after assuming a role: role name, then session name.</li>
  <li><code>arn:aws:iam::aws:policy/ReadOnlyAccess</code> — AWS managed policies use the literal account <code>aws</code>.</li>
  <li><code>arn:aws:ec2:us-east-1:111122223333:instance/i-0abc123</code> — regional and account-scoped.</li>
  <li><code>arn:aws:lambda:us-east-1:111122223333:function:orders-api</code> — colon separator, and <code>:orders-api:PROD</code> for a version or alias.</li>
  <li><code>arn:aws:dynamodb:us-east-1:111122223333:table/Orders/index/by-customer</code> — a nested sub-resource.</li>
  <li><code>arn:aws:kms:us-east-1:111122223333:key/1234abcd-…</code> — keys are addressed by UUID, aliases by <code>alias/my-key</code>.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Wildcards</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><code>*</code> matches any sequence of characters, <code>?</code> matches exactly one.</li>
  <li>They work in most segments: <code>arn:aws:s3:::logs-*/*</code>, <code>arn:aws:ec2:us-east-1:111122223333:instance/*</code>, <code>arn:aws:iam::111122223333:role/engineering/*</code>.</li>
  <li>Wildcards in <code>Resource</code> are matched as plain string globs. If you want real pattern logic, use a <code>Condition</code> with <code>ArnLike</code> / <code>ArnEquals</code> on <code>aws:PrincipalArn</code> or <code>aws:SourceArn</code>.</li>
  <li>A practical tip: <strong>design resource names for policy-ability</strong>. If buckets are named <code>acme-{env}-{team}-{purpose}</code>, then <code>arn:aws:s3:::acme-prod-payments-*</code> is a precise grant. If names are ad hoc, you will be stuck enumerating ARNs and hitting the 6,144-character policy limit.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Traps that cost people hours</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Bucket vs object.</strong> <code>arn:aws:s3:::b</code> and <code>arn:aws:s3:::b/*</code> are different resources. Most real policies need both, in separate statements paired with the right actions.</li>
  <li><strong>Actions that ignore resource scoping.</strong> Many list/describe actions (<code>ec2:DescribeInstances</code>, <code>s3:ListAllMyBuckets</code>) do not support resource-level permissions, so <code>"Resource": "*"</code> is the only thing that works. Scope those with conditions, and consult the service authorization reference rather than guessing.</li>
  <li><strong>Role ARN vs assumed-role ARN.</strong> A trust policy names <code>arn:aws:iam::…:role/deploy</code>, but the principal at runtime is <code>arn:aws:sts::…:assumed-role/deploy/session</code>. A condition matching <code>aws:PrincipalArn</code> against the <code>iam</code> form will not match a session — use <code>ArnLike</code> with <code>arn:aws:sts::111122223333:assumed-role/deploy/*</code>.</li>
  <li><strong>Paths are part of the ARN.</strong> A role created with <code>--path /engineering/</code> has a different ARN than one without, and a policy referencing the pathless form will not match.</li>
  <li><strong>Case sensitivity.</strong> The resource portion is generally case-sensitive (S3 keys certainly are), while service and action names are not.</li>
  <li><strong>Deleting and recreating</strong> a resource with the same name reuses the ARN but not the internal unique ID — which is why a trust policy pointing at a deleted role's ARN turns into a raw principal ID like <code>AROAEXAMPLE…</code> in the JSON and stops working.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "An ARN is arn:partition:service:region:account-id:resource — the unique address of anything in AWS, and the only way a policy names a resource. Region is empty for global services like IAM, and both region and account are empty for S3 because bucket names are globally unique. The classic trap is that a bucket and its objects are two different ARNs, so a real S3 policy needs both. I use wildcards, and I name resources with a consistent prefix scheme so that a wildcard grant is naturally scoped rather than having to enumerate ARNs and hit the policy size limit."</div>
</div>`,
          examples: [
            `# ---------- Anatomy ----------
#   arn : partition : service : region    : account-id    : resource
#   arn : aws       : ec2     : us-east-1 : 111122223333  : instance/i-0abc123def

arn:aws:s3:::my-bucket                                   # bucket  (no region, no account)
arn:aws:s3:::my-bucket/reports/2026/q4.csv               # object  (a DIFFERENT resource)
arn:aws:iam::111122223333:user/alice                     # IAM is global -> empty region
arn:aws:iam::111122223333:role/engineering/deploy        # path is part of the ARN
arn:aws:iam::111122223333:policy/DeployToStaging
arn:aws:iam::aws:policy/ReadOnlyAccess                   # AWS managed -> account "aws"
arn:aws:sts::111122223333:assumed-role/deploy/build-42   # what you ARE after AssumeRole
arn:aws:lambda:us-east-1:111122223333:function:orders:PROD
arn:aws:dynamodb:us-east-1:111122223333:table/Orders/index/by-customer
arn:aws:kms:us-east-1:111122223333:key/1234abcd-12ab-34cd-56ef-1234567890ab
arn:aws:secretsmanager:us-east-1:111122223333:secret:prod/db-AbCdEf   # random suffix!

# ---------- Wildcards make policies short AND precise ----------
"Resource": "arn:aws:s3:::acme-prod-payments-*/*"                    # every object, one team's buckets
"Resource": "arn:aws:ec2:us-east-1:111122223333:instance/*"          # instances in one region
"Resource": "arn:aws:iam::111122223333:role/engineering/*"           # every role under a path
"Resource": "arn:aws:logs:*:111122223333:log-group:/aws/lambda/orders-*:*"

# ---------- Role ARN vs assumed-role ARN: the silent mismatch ----------
# WRONG — never matches a live session
"Condition": { "StringEquals": { "aws:PrincipalArn": "arn:aws:iam::111122223333:role/deploy" } }
# RIGHT
"Condition": { "ArnLike": { "aws:PrincipalArn": "arn:aws:sts::111122223333:assumed-role/deploy/*" } }
# (aws:PrincipalArn does normalise to the role ARN in many cases — ArnLike on the sts form
#  is the form that is unambiguous, and aws:userid / aws:PrincipalTag are sturdier still.)

# ---------- Secrets Manager: the 6-character random suffix ----------
# The secret ARN ends in -AbCdEf, so hardcoding a full ARN breaks on recreate:
"Resource": "arn:aws:secretsmanager:us-east-1:111122223333:secret:prod/db-*"

# ---------- Portable across partitions (GovCloud / China) ----------
"Resource": "arn:\${AWS::Partition}:s3:::acme-\${AWS::AccountId}-artifacts/*"   # CloudFormation
# Terraform: "arn:\${data.aws_partition.current.partition}:s3:::..."

# ---------- Discover ARNs you actually have ----------
aws resourcegroupstaggingapi get-resources \\
  --tag-filters Key=env,Values=prod --query 'ResourceTagMappingList[].ResourceARN'
aws iam list-roles --query 'Roles[].Arn'
aws s3api list-buckets --query 'Buckets[].Name' | \\
  jq -r '.[] | "arn:aws:s3:::" + .'`,
          ],
          questions: [
            {
              question: "What is an ARN and what are its parts?",
              solution: "<p>An <strong>Amazon Resource Name</strong> uniquely identifies any AWS resource, and is the only way a policy can refer to one. Format: <code>arn:partition:service:region:account-id:resource</code>. <strong>Partition</strong> is <code>aws</code>, <code>aws-cn</code> or <code>aws-us-gov</code>; <strong>service</strong> is the namespace (<code>s3</code>, <code>iam</code>, <code>ec2</code>); <strong>region</strong> is empty for global services like IAM and CloudFront; <strong>account-id</strong> is the 12-digit account, empty for S3 since bucket names are globally unique; and the <strong>resource</strong> part varies by service as <code>id</code>, <code>type/id</code> or <code>type:id</code>.</p>",
            },
            {
              question: "Why does an S3 ARN have no region and no account ID?",
              solution: "<p>Because <strong>S3 bucket names are globally unique across all of AWS</strong> — two accounts cannot both own <code>my-bucket</code> — so neither a region nor an account is needed to disambiguate the name. That is why S3 ARNs have the distinctive triple colon: <code>arn:aws:s3:::my-bucket</code>. The bucket still physically lives in one region; the ARN just does not need to say so. Newer S3 constructs that <em>are</em> account-scoped, such as access points and Outposts, do carry region and account in their ARNs.</p>",
            },
            {
              question: "How do you scope a policy to many resources without listing every ARN?",
              solution: "<p>Three techniques. (1) <strong>Wildcards</strong> — <code>arn:aws:s3:::acme-prod-payments-*/*</code>, which works well only if you <strong>design resource names</strong> with a consistent <code>{org}-{env}-{team}-{purpose}</code> scheme; naming discipline is what makes wildcards precise rather than sloppy. (2) <strong>Paths</strong> for IAM entities — <code>arn:aws:iam::111122223333:role/engineering/*</code>. (3) <strong>ABAC via conditions</strong> — <code>\"aws:ResourceTag/team\": \"\${aws:PrincipalTag/team}\"</code>, which matches by tag rather than by name and keeps the policy short and static even as resources are added. Enumerating ARNs is also what pushes you into the 6,144-character policy limit.</p>",
            },
            {
              question: "Why doesn't a condition on aws:PrincipalArn equal to a role's ARN match an assumed session?",
              solution: "<p>Because once a role is assumed, the runtime identity is <code>arn:aws:sts::111122223333:assumed-role/&lt;role-name&gt;/&lt;session-name&gt;</code>, not the IAM role ARN, and the session name varies per call. A <code>StringEquals</code> against the role ARN is therefore brittle. Use <code>ArnLike</code> with <code>arn:aws:sts::111122223333:assumed-role/deploy/*</code>, or better, match on something stable that does not encode the session at all — <code>aws:PrincipalTag/&lt;key&gt;</code> for ABAC, or <code>aws:userid</code> with the role's unique <code>AROA…</code> ID, which also survives a delete-and-recreate cycle differently than the name does.</p>",
            },
            {
              question: "Which actions can't be scoped by ARN, and what do you do about it?",
              solution: "<p>Many account-wide list and describe operations — <code>s3:ListAllMyBuckets</code>, <code>ec2:DescribeInstances</code>, <code>iam:ListRoles</code> — do not support resource-level permissions, so <code>\"Resource\": \"*\"</code> is the only legal value. The right move is not to shrug but to (a) check the <strong>service authorization reference</strong>, which lists exactly which actions support resource-level permissions and which condition keys each action supports, and (b) scope with <strong>conditions</strong> instead — for example restricting <code>ec2:RunInstances</code> with <code>ec2:InstanceType</code> and <code>aws:RequestTag</code>, or restricting the whole statement with <code>aws:RequestedRegion</code>.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference-arns.html",
            "https://docs.aws.amazon.com/service-authorization/latest/reference/reference_policies_actions-resources-contextkeys.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_resource.html",
          ],
        },
        {
          topic: "MFA — The Second Factor on Top of Passwords and Keys",
          tags: ["aws", "iam", "mfa", "security", "passkeys", "fido2", "conditions"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>Multi-Factor Authentication</strong> means proving identity with more than one kind of evidence: <em>something you know</em> (a password), <em>something you have</em> (a phone or a security key), and <em>something you are</em> (a fingerprint). A password alone is one factor, and passwords get phished, reused, guessed and dumped in breaches. Adding a second factor means a stolen password by itself is not enough to sign in.
</p>
<p style="line-height: 1.75;">In AWS this is not optional advice any more. AWS now <strong>enforces MFA on root users</strong> for AWS Organizations management accounts and standalone accounts, and is extending that requirement. Every "how would you secure an AWS account?" answer should mention MFA within the first sentence.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The device types AWS supports</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>FIDO2 security keys and passkeys</strong> — YubiKey, Touch ID, Windows Hello, or a passkey synced in a password manager. This is the strongest option because the authentication is <strong>cryptographically bound to the domain</strong>, which makes it genuinely <em>phishing-resistant</em>: a fake <code>aws-console-login.com</code> page cannot get a valid response, because the key refuses to sign for the wrong origin.</li>
  <li><strong>Virtual MFA (TOTP)</strong> — Google Authenticator, Authy, 1Password. A six-digit rotating code. Good, widely used, but <strong>phishable</strong>: an attacker running a real-time proxy page can ask for the code and relay it within its 30-second window.</li>
  <li><strong>Hardware TOTP tokens</strong> — a physical key-fob displaying codes. Useful where phones are banned; same phishing weakness as virtual TOTP.</li>
  <li>SMS is <strong>no longer supported</strong> for IAM MFA, and rightly so — SIM-swapping attacks made it the weakest factor.</li>
</ul>
<p style="line-height: 1.75;">A root user or IAM user can register <strong>up to 8 MFA devices</strong>. This matters operationally: it removes the old single-point-of-failure where one lost phone locked an organisation out of its own root account. Register a hardware key held in a safe plus a second one held by a different trusted person.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">How MFA actually affects API calls</h4>
<p style="line-height: 1.75;">This is the part people get wrong. Registering a device protects <strong>console sign-in</strong> automatically, but it does <strong>not</strong> automatically protect CLI or SDK calls made with an access key. Access keys authenticate on their own; there is no MFA prompt. To make MFA matter programmatically, two things must happen:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>The caller must obtain <strong>MFA-stamped temporary credentials</strong>, via <code>sts:GetSessionToken</code> with <code>--serial-number</code> and <code>--token-code</code>, or via <code>sts:AssumeRole</code> passing the same two parameters. The resulting session carries <code>aws:MultiFactorAuthPresent = true</code>.</li>
  <li>Your policies must <strong>require</strong> it, using a Deny conditioned on <code>aws:MultiFactorAuthPresent</code>, and/or a role trust policy requiring MFA to assume it at all.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The two condition keys</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><code>aws:MultiFactorAuthPresent</code> — boolean, true when the credentials were issued after an MFA check. <strong>Always use <code>BoolIfExists</code> with it.</strong> For calls made with long-term access keys, or by an AWS service on your behalf, the key is <em>absent</em> rather than false, so a plain <code>Bool</code> comparison does not match and your Deny silently does nothing. This is the single most commonly botched condition in all of IAM.</li>
  <li><code>aws:MultiFactorAuthAge</code> — how many seconds ago the MFA check happened. Use it for step-up authentication: allow reads all session long, but require MFA within the last 15 minutes to delete a production database or change a KMS key policy.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The enrolment deadlock, and how to avoid it</h4>
<p style="line-height: 1.75;">If you attach "deny everything unless MFA" to a brand-new user, they cannot enrol a device, because enrolling requires API calls — and those are denied. The fix is a <code>NotAction</code> carve-out for the self-service actions: <code>iam:CreateVirtualMFADevice</code>, <code>iam:EnableMFADevice</code>, <code>iam:ResyncMFADevice</code>, <code>iam:ListMFADevices</code>, <code>iam:ListVirtualMFADevices</code>, <code>iam:ChangePassword</code>, <code>iam:GetUser</code>, and <code>sts:GetSessionToken</code>. Scope the write actions to the user's own resources with <code>\${aws:username}</code> so nobody can tamper with someone else's MFA.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Where to enforce MFA in a real organisation</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Root</strong> — hardware key, non-negotiable, multiple devices registered.</li>
  <li><strong>At the identity provider</strong> — if you use IAM Identity Center or an external IdP, enforce MFA there (Identity Center even supports enforced registration and WebAuthn), so every session issued anywhere in the organisation is already MFA-backed. This is far better than per-account IAM policies.</li>
  <li><strong>In role trust policies</strong> — <code>"Bool": {"aws:MultiFactorAuthPresent": "true"}</code> on any role that can touch production or IAM. Since credentials only ever arrive through assumption, this is a clean chokepoint.</li>
  <li><strong>As an SCP</strong> — an organisation-wide Deny for sensitive actions without MFA, as defence in depth.</li>
  <li><strong>Step-up for destructive actions</strong> — <code>aws:MultiFactorAuthAge</code> under 900 seconds for deletes, key policy changes and IAM writes.</li>
  <li><strong>S3 MFA Delete</strong> — a bucket-level setting (configured by root, on a versioned bucket) requiring an MFA code to permanently delete a version or to disable versioning. Niche but a great thing to name for backup and ransomware-resistance questions.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Honest limitations</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>MFA protects <strong>authentication</strong>, not a session that has already been issued. If an attacker steals the temporary credentials <em>after</em> MFA, those credentials still carry <code>MultiFactorAuthPresent = true</code> until they expire.</li>
  <li>TOTP is phishable in real time; only FIDO2/WebAuthn resists that.</li>
  <li>MFA does nothing for machine identities. The answer there is not MFA but eliminating long-lived credentials entirely — roles, OIDC federation, IAM Roles Anywhere.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "MFA adds a second factor — FIDO2 security key or passkey ideally, TOTP otherwise; SMS is no longer supported. Registering a device protects console sign-in, but it does not protect CLI calls made with an access key: you have to get MFA-stamped temporary credentials through GetSessionToken or AssumeRole with the serial number and token code, and then require aws:MultiFactorAuthPresent in your policies — with BoolIfExists, because for long-term credentials the key is absent rather than false. I enforce MFA at the identity provider and in role trust policies, use MultiFactorAuthAge for step-up on destructive actions, and always carve out the self-service enrolment actions so new users are not locked out."</div>
</div>`,
          examples: [
            `# ---------- Enrol a virtual MFA device ----------
aws iam create-virtual-mfa-device --virtual-mfa-device-name alice \\
  --outfile /tmp/qr.png --bootstrap-method QRCodePNG
aws iam enable-mfa-device --user-name alice \\
  --serial-number arn:aws:iam::111122223333:mfa/alice \\
  --authentication-code1 123456 --authentication-code2 789012   # two CONSECUTIVE codes

# ---------- Get MFA-stamped credentials for the CLI ----------
aws sts get-session-token \\
  --serial-number arn:aws:iam::111122223333:mfa/alice \\
  --token-code 123456 --duration-seconds 3600
# -> ASIA... + SessionToken; this session has aws:MultiFactorAuthPresent = true

# Or assume a role with MFA (the better pattern)
aws sts assume-role --role-arn arn:aws:iam::111122223333:role/admin \\
  --role-session-name alice-admin \\
  --serial-number arn:aws:iam::111122223333:mfa/alice --token-code 123456

# Or let the CLI handle it forever (~/.aws/config)
# [profile admin]
# role_arn    = arn:aws:iam::111122223333:role/admin
# source_profile = default
# mfa_serial  = arn:aws:iam::111122223333:mfa/alice
aws s3 ls --profile admin        # prompts for the code, caches the session

# ---------- Require MFA to ASSUME a role (clean chokepoint) ----------
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "AWS": "arn:aws:iam::111122223333:root" },
    "Action": "sts:AssumeRole",
    "Condition": {
      "Bool":            { "aws:MultiFactorAuthPresent": "true" },
      "NumericLessThan": { "aws:MultiFactorAuthAge": "3600" }
    }
  }]
}

# ---------- Enforce MFA for users, WITHOUT the enrolment deadlock ----------
{
  "Version": "2012-10-17",
  "Statement": [
    { "Sid": "AllowViewOwnUser", "Effect": "Allow",
      "Action": ["iam:GetUser","iam:ListMFADevices","iam:ListVirtualMFADevices","iam:GetAccountPasswordPolicy"],
      "Resource": ["arn:aws:iam::*:user/\${aws:username}","arn:aws:iam::*:mfa/*"] },
    { "Sid": "AllowManageOwnMFA", "Effect": "Allow",
      "Action": ["iam:CreateVirtualMFADevice","iam:EnableMFADevice","iam:ResyncMFADevice","iam:DeleteVirtualMFADevice","iam:ChangePassword"],
      "Resource": ["arn:aws:iam::*:user/\${aws:username}","arn:aws:iam::*:mfa/\${aws:username}"] },
    { "Sid": "DenyAllElseWithoutMFA", "Effect": "Deny",
      "NotAction": ["iam:CreateVirtualMFADevice","iam:EnableMFADevice","iam:ResyncMFADevice","iam:DeleteVirtualMFADevice",
                    "iam:ListMFADevices","iam:ListVirtualMFADevices","iam:GetUser","iam:ChangePassword",
                    "iam:GetAccountPasswordPolicy","sts:GetSessionToken"],
      "Resource": "*",
      "Condition": { "BoolIfExists": { "aws:MultiFactorAuthPresent": "false" } } }
  ]
}

# ---------- Step-up: destructive actions need FRESH MFA ----------
{
  "Effect": "Deny",
  "Action": ["s3:DeleteBucket","rds:DeleteDBInstance","kms:ScheduleKeyDeletion","dynamodb:DeleteTable"],
  "Resource": "*",
  "Condition": { "NumericGreaterThanIfExists": { "aws:MultiFactorAuthAge": "900" } }
}

# ---------- Audit: who has no MFA? ----------
aws iam generate-credential-report >/dev/null
aws iam get-credential-report --query Content --output text | base64 -d \\
  | awk -F, 'NR==1 || ($4=="true" && $8=="false") {print $1,$4,$8}' | column -t
#                       password_enabled ^      ^ mfa_active

# ---------- S3 MFA Delete (must be configured BY ROOT, versioned bucket) ----------
aws s3api put-bucket-versioning --bucket critical-backups \\
  --versioning-configuration Status=Enabled,MFADelete=Enabled \\
  --mfa "arn:aws:iam::111122223333:mfa/root-account-mfa-device 123456"`,
          ],
          questions: [
            {
              question: "Does enabling MFA on an IAM user protect their access keys?",
              solution: "<p>No — and this is the most important MFA misconception. Registering an MFA device protects <strong>console sign-in</strong>, but an access key authenticates entirely on its own with no MFA prompt, so CLI and SDK calls are unaffected. To make MFA matter programmatically you need <strong>both</strong> halves: the caller must obtain MFA-stamped temporary credentials via <code>sts:GetSessionToken</code> or <code>sts:AssumeRole</code> with <code>--serial-number</code> and <code>--token-code</code>, <em>and</em> your policies must require <code>aws:MultiFactorAuthPresent</code>. Without the policy condition, nothing forces the caller to take the MFA path.</p>",
            },
            {
              question: "Why must you use BoolIfExists with aws:MultiFactorAuthPresent?",
              solution: "<p>Because for many requests the key is <strong>absent from the request context rather than false</strong> — calls made with long-term access keys, and some service-to-service calls. A plain <code>\"Bool\": {\"aws:MultiFactorAuthPresent\": \"false\"}</code> condition does <strong>not match</strong> when the key is missing, so a Deny statement you believed was enforcing MFA silently never fires, and long-term keys sail straight through. <code>BoolIfExists</code> treats the absent case as matching, which closes exactly the hole you were worried about. It is the single most commonly botched condition in IAM.</p>",
            },
            {
              question: "Why are FIDO2 security keys better than TOTP apps?",
              solution: "<p>FIDO2/WebAuthn is <strong>phishing-resistant</strong> because the credential is cryptographically bound to the origin: the key signs a challenge that includes the domain, so a lookalike site cannot obtain a usable response even if the user is fully fooled. TOTP is a shared six-digit secret displayed to a human, so a real-time proxy phishing page simply asks for it and relays it within the 30-second window — which is exactly how modern credential-theft kits work. TOTP is still vastly better than nothing; FIDO2 is what you put on root and on anything privileged.</p>",
            },
            {
              question: "How do you require fresh MFA only for destructive actions?",
              solution: "<p>Use <code>aws:MultiFactorAuthAge</code>, which reports how many seconds ago the MFA check occurred. Add a Deny on the destructive actions conditioned on <code>\"NumericGreaterThanIfExists\": {\"aws:MultiFactorAuthAge\": \"900\"}</code> — so reads work all session, but deleting a database or scheduling a KMS key deletion requires an MFA check within the last 15 minutes. That is <strong>step-up authentication</strong>, and it is the right shape for high-blast-radius operations because it keeps day-to-day work frictionless while forcing a deliberate human moment before anything irreversible.</p>",
            },
            {
              question: "You apply a deny-without-MFA policy and new users can no longer set up MFA. What went wrong?",
              solution: "<p>The classic <strong>enrolment deadlock</strong>: enrolling an MFA device requires API calls, but the policy denies everything when MFA is absent — which it always is before enrolment. Fix it with a <code>NotAction</code> carve-out for <code>iam:CreateVirtualMFADevice</code>, <code>iam:EnableMFADevice</code>, <code>iam:ResyncMFADevice</code>, the List MFA calls, <code>iam:GetUser</code>, <code>iam:ChangePassword</code> and <code>sts:GetSessionToken</code>. Scope the write actions to <code>arn:aws:iam::*:user/\${aws:username}</code> and <code>mfa/\${aws:username}</code> so a user can only manage their own device, not disable someone else's.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html#condition-keys-multifactorauthpresent",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/tutorial_users-self-manage-mfa-and-creds.html",
          ],
        },
        {
          topic: "Access Keys vs Console Password vs Temporary Credentials",
          tags: ["aws", "iam", "credentials", "access keys", "sts", "rotation", "secrets"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  There are three ways to authenticate to AWS, and choosing correctly between them is most of what "AWS security" means in practice. The dividing line is <strong>who is calling</strong> (a human or a machine) and <strong>how long the credential lives</strong>.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">1. Console password — for humans, in a browser</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Used at the account sign-in URL (<code>https://&lt;account-id&gt;.signin.aws.amazon.com/console</code>, or an account alias).</li>
  <li>Governed by the <strong>account password policy</strong>: minimum length (up to 128), character classes, reuse prevention (up to 24 previous passwords), expiry, and whether users may change their own.</li>
  <li>Only usable in the console — <strong>a password cannot sign an API request</strong>. The console itself converts your session into temporary credentials behind the scenes.</li>
  <li>Should always be paired with <strong>MFA</strong>.</li>
  <li>Best practice today: don't have one at all. Humans should sign in through <strong>IAM Identity Center</strong> or a corporate IdP, so there is no per-account password to manage, reset, or leak.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">2. Access keys — long-term, for programmatic access</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>A pair: <strong>access key ID</strong> (<code>AKIA…</code>) and <strong>secret access key</strong>. Used by the CLI, SDKs, Terraform, and anything that signs with SigV4.</li>
  <li>Attach only to <strong>IAM users</strong> — roles never have access keys.</li>
  <li><strong>They never expire.</strong> A key from 2019 still works today. That is the whole problem.</li>
  <li>The secret is displayed <strong>exactly once</strong>, at creation, and is not recoverable.</li>
  <li>Two per user, specifically so you can rotate with zero downtime.</li>
  <li>Where they go wrong: committed to Git, baked into Docker images, pasted into Slack, left in <code>~/.aws/credentials</code> on a laptop that gets stolen, stored in CI variables that any contributor can print. Bots scan GitHub for <code>AKIA</code> patterns continuously; the usual outcome is crypto-mining on your bill within minutes.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">3. Temporary credentials — short-lived, from STS</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Three</strong> parts, not two: access key ID (<code>ASIA…</code>), secret access key, and a <strong>session token</strong> that must accompany every request. Forgetting the session token is the classic "why does this key not work" bug.</li>
  <li>Issued by <strong>AWS STS</strong> via <code>AssumeRole</code>, <code>AssumeRoleWithWebIdentity</code>, <code>AssumeRoleWithSAML</code>, <code>GetSessionToken</code> or <code>GetFederationToken</code>.</li>
  <li>Lifetime <strong>15 minutes to 12 hours</strong> (default 1 hour), capped by the role's <code>MaxSessionDuration</code>; <strong>role chaining is hard-capped at 1 hour</strong>.</li>
  <li><strong>Nothing is stored.</strong> They are generated on demand, cached in memory, and the SDK refreshes them automatically before expiry.</li>
  <li>Can be <strong>further restricted per session</strong> with a session policy, and are <strong>tagged and named</strong> (<code>RoleSessionName</code>) so CloudTrail shows exactly who did what.</li>
  <li>They cannot be deleted, only outrun or denied — revocation is done with an <code>aws:TokenIssueTime</code> Deny.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Side-by-side</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Who uses it:</strong> password → humans in a browser. Access keys → scripts and legacy apps. Temporary → everything else, human and machine.</li>
  <li><strong>Lifetime:</strong> password → until changed. Access keys → forever. Temporary → minutes to hours.</li>
  <li><strong>Stored where:</strong> password → a password manager. Access keys → a file or secret store, and therefore everywhere. Temporary → memory only.</li>
  <li><strong>Rotation:</strong> password → manual policy. Access keys → manual, so it doesn't happen. Temporary → automatic.</li>
  <li><strong>Impact of leak:</strong> password → blocked by MFA. Access keys → full compromise until someone notices. Temporary → limited to the remaining lifetime.</li>
  <li><strong>Can sign API calls:</strong> password → no. Access keys → yes. Temporary → yes (with the session token).</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The decision tree to say out loud</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Code running <strong>inside AWS</strong> (EC2, Lambda, ECS, EKS)? → an <strong>IAM role</strong> via instance profile / execution role / task role / IRSA. Never a key.</li>
  <li><strong>External CI/CD</strong> (GitHub Actions, GitLab, CircleCI)? → <strong>OIDC federation</strong> into a role. No stored secret at all.</li>
  <li><strong>On-premises servers or IoT</strong>? → <strong>IAM Roles Anywhere</strong> with X.509 certificates, which exchanges a certificate for temporary credentials.</li>
  <li><strong>Humans</strong>? → <strong>IAM Identity Center</strong> with MFA; <code>aws sso login</code> gives short-lived CLI credentials.</li>
  <li><strong>A legacy third-party system that only accepts a static key</strong>? → an IAM user with a tightly scoped policy, condition-locked to a source IP or VPC endpoint, monitored, rotated on a schedule, and ideally with the key stored in <strong>Secrets Manager</strong> with automatic rotation.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Detecting and containing leaks</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Run the <strong>credential report</strong> and <strong>Access Analyzer unused-access findings</strong> on a schedule to find old and unused keys.</li>
  <li><code>aws iam get-access-key-last-used</code> proves whether a key is genuinely dead before you delete it.</li>
  <li><strong>GuardDuty</strong> raises findings like <code>UnauthorizedAccess:IAMUser/InstanceCredentialExfiltration</code> when instance-role credentials are used from outside AWS — a strong signal of theft.</li>
  <li>AWS scans public repos and may auto-attach <code>AWSCompromisedKeyQuarantineV3</code> to a user whose key leaked. Treat that as an alarm, not a remedy: deactivate, investigate CloudTrail, then delete.</li>
  <li>Use pre-commit secret scanning and GitHub push protection so the key never reaches the remote in the first place.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "A console password is for humans in a browser and cannot sign API calls. Access keys are a long-term two-part credential for programmatic access that never expire, which is why they leak and why AWS steers you away from them. Temporary credentials from STS are three parts — key, secret and session token — last 15 minutes to 12 hours, are never written to disk, and refresh automatically. My rule is: roles for anything running in AWS, OIDC federation for external CI, Roles Anywhere for on-prem, Identity Center for humans, and IAM users with static keys only for legacy systems that genuinely cannot federate — scoped, condition-locked, monitored and rotated."</div>
</div>`,
          examples: [
            `# ---------- Spot the credential type by prefix ----------
# AKIA...  long-term access key   (IAM user)     -> never expires
# ASIA...  temporary access key   (STS session)  -> needs AWS_SESSION_TOKEN
# AROA...  role unique id
# AIDA...  user unique id

# ---------- Console password ----------
aws iam create-login-profile --user-name alice --password '...' --password-reset-required
aws iam update-account-password-policy \\
  --minimum-password-length 16 --require-symbols --require-numbers \\
  --require-uppercase-characters --require-lowercase-characters \\
  --allow-users-to-change-password --password-reuse-prevention 24 --max-password-age 90

# ---------- Long-term access keys ----------
aws iam create-access-key --user-name svc-legacy      # secret shown ONCE
export AWS_ACCESS_KEY_ID=AKIA... AWS_SECRET_ACCESS_KEY=...
# no session token — that is how you know it is long-term

# ---------- Temporary credentials: three parts ----------
aws sts assume-role --role-arn arn:aws:iam::111122223333:role/deploy \\
  --role-session-name ci-build-42 --duration-seconds 3600
export AWS_ACCESS_KEY_ID=ASIA... \\
       AWS_SECRET_ACCESS_KEY=... \\
       AWS_SESSION_TOKEN=...          # <-- omit this and every call fails
aws sts get-caller-identity

# ---------- The modern alternatives, in order of preference ----------
# (a) humans
aws sso login --profile prod
# ~/.aws/config
# [profile prod]
# sso_session = corp
# sso_account_id = 111122223333
# sso_role_name  = PowerUser

# (b) inside AWS — nothing to configure, the SDK just works
#     EC2 -> instance profile via IMDSv2
TOKEN=$(curl -sX PUT "http://169.254.169.254/latest/api/token" \\
  -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")
curl -s -H "X-aws-ec2-metadata-token: $TOKEN" \\
  http://169.254.169.254/latest/meta-data/iam/security-credentials/

# (c) GitHub Actions — OIDC, no secrets stored
# - uses: aws-actions/configure-aws-credentials@v4
#   with:
#     role-to-assume: arn:aws:iam::111122223333:role/gha-deploy
#     aws-region: eu-west-1
#   permissions: { id-token: write, contents: read }

# (d) on-premises — IAM Roles Anywhere (X.509 -> temporary credentials)
aws_signing_helper credential-process \\
  --certificate cert.pem --private-key key.pem \\
  --trust-anchor-arn arn:aws:rolesanywhere:... \\
  --profile-arn arn:aws:rolesanywhere:... \\
  --role-arn arn:aws:iam::111122223333:role/onprem-app

# ---------- Hunt down long-term keys across the account ----------
aws iam generate-credential-report >/dev/null
aws iam get-credential-report --query Content --output text | base64 -d \\
  | awk -F, 'NR==1 || $9=="true" {print $1,$9,$10,$11}' | column -t
#                        access_key_1_active ^  ^last_rotated ^last_used

aws iam get-access-key-last-used --access-key-id AKIAOLDKEY \\
  --query 'AccessKeyLastUsed.{When:LastUsedDate,Service:ServiceName,Region:Region}'

# ---------- Emergency: a key leaked ----------
aws iam update-access-key --user-name svc-legacy --access-key-id AKIALEAKED --status Inactive
aws cloudtrail lookup-events --lookup-attributes AttributeKey=AccessKeyId,AttributeValue=AKIALEAKED \\
  --query 'Events[].{Time:EventTime,Event:EventName,Src:Resources}'
aws iam delete-access-key --user-name svc-legacy --access-key-id AKIALEAKED`,
          ],
          questions: [
            {
              question: "Compare the three ways to authenticate to AWS.",
              solution: "<p><strong>Console password</strong>: for humans in a browser, governed by the account password policy, pair with MFA, and it <em>cannot sign API requests</em>. <strong>Access keys</strong>: a two-part long-term credential (<code>AKIA…</code> + secret) attached to an IAM user, used by the CLI and SDKs, never expires, secret shown only once, two per user for rotation. <strong>Temporary credentials</strong>: three parts (<code>ASIA…</code> + secret + <strong>session token</strong>) issued by STS, lasting 15 minutes to 12 hours, never written to disk, refreshed automatically, and further restrictable per session. Preference order is temporary → temporary → temporary; long-term keys only for legacy systems that cannot federate.</p>",
            },
            {
              question: "What is the third part of a temporary credential and what happens if you omit it?",
              solution: "<p>The <strong>session token</strong> (<code>AWS_SESSION_TOKEN</code>), which must be sent with every signed request alongside the <code>ASIA…</code> access key ID and secret. Omit it and every call fails with <code>InvalidClientTokenId</code> — 'the security token included in the request is invalid' — which people misread as a bad key and waste time regenerating credentials. The <code>ASIA</code> prefix is the giveaway that a session token is required; <code>AKIA</code> keys need only two parts.</p>",
            },
            {
              question: "Your team wants GitHub Actions to deploy to AWS. What do you recommend and why?",
              solution: "<p><strong>OIDC federation</strong>, not an IAM user. Register GitHub's OIDC provider in the account, create a deploy role whose trust policy allows <code>sts:AssumeRoleWithWebIdentity</code> from that provider, and condition it on the <code>aud</code> claim <em>and</em> a specific <code>sub</code> such as <code>repo:my-org/my-repo:ref:refs/heads/main</code> or a deployment environment. Each workflow run gets a fresh short-lived token, so <strong>no secret is stored in GitHub at all</strong> — nothing to leak, nothing to rotate, and every run is attributable in CloudTrail via the session name. The critical mistake to avoid is a loose or missing <code>sub</code> condition, which would let any repository on GitHub assume the role.</p>",
            },
            {
              question: "How do you rotate access keys without downtime?",
              solution: "<p>Use the two-key allowance. (1) <code>create-access-key</code> for a second active key. (2) Deploy the new key to every consumer. (3) Watch <code>get-access-key-last-used</code> on the old key until it shows no recent activity — this is the step people skip and then break production. (4) <code>update-access-key --status Inactive</code> on the old one, which is a reversible kill switch. (5) After a full business cycle with no incidents, <code>delete-access-key</code>. Better still, automate it: store the key in <strong>Secrets Manager</strong> with a rotation Lambda so the whole dance runs on a schedule without a human.</p>",
            },
            {
              question: "Why can't a role have access keys?",
              solution: "<p>Because that would defeat the entire point of a role. A role is deliberately an identity <strong>without long-term credentials</strong> — access is granted by <em>assuming</em> it through STS, which mints credentials that expire and can be further narrowed by a session policy, tagged, named for audit, and revoked en masse with an <code>aws:TokenIssueTime</code> Deny. Attaching a permanent key to a role would reintroduce every property that makes long-term keys dangerous: no expiry, no per-session scoping, and a secret that has to be stored somewhere.</p>",
            },
            {
              question: "An EC2 instance needs to read from S3. Why not just put an access key in the app config?",
              solution: "<p>Because an <strong>instance profile</strong> does the same job with no secret. The role's credentials are delivered through the Instance Metadata Service, rotated automatically, and never touch disk or your repo — so there is nothing to leak in an image, a snapshot, or a config file, and nothing to rotate manually. Configure <strong>IMDSv2</strong> (session-token required, hop limit 1) so a server-side request forgery bug in the app cannot trivially read those credentials, which is exactly the failure mode behind the Capital One breach. Pair it with GuardDuty, which alerts when instance-role credentials are used from outside AWS.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html",
            "https://docs.aws.amazon.com/rolesanywhere/latest/userguide/introduction.html",
          ],
        },
        {
          topic: "Policy Evaluation Logic — How AWS Actually Decides Allow or Deny",
          tags: ["aws", "iam", "policy evaluation", "scp", "rcp", "permissions boundary", "session policy"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  When a request arrives, AWS runs a fixed algorithm over every policy that could apply. Being able to narrate it in order is the clearest signal that you understand IAM rather than having memorised examples — and it is exactly the skill you use when debugging a real <code>AccessDenied</code>.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The evaluation order</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Step 0 — Authenticate.</strong> Verify the SigV4 signature. Failure here is not AccessDenied.</li>
  <li><strong>Step 1 — Start at implicit Deny.</strong> The default answer is no.</li>
  <li><strong>Step 2 — Look for an explicit Deny anywhere.</strong> In any SCP, RCP, resource policy, identity policy, permissions boundary or session policy. If one matches, the answer is <strong>Deny, immediately and finally</strong>. Nothing later can rescue it.</li>
  <li><strong>Step 3 — Service Control Policies (SCPs).</strong> If the account is in an Organization, every SCP from the root down through each OU to the account must allow the action. SCPs never grant — they only bound. A gap in SCPs is a deny.</li>
  <li><strong>Step 4 — Resource Control Policies (RCPs).</strong> The mirror of SCPs for resources: an organisation-wide cap on what may be done <em>to</em> your resources, regardless of who asks.</li>
  <li><strong>Step 5 — Session policies.</strong> If the credentials came from <code>AssumeRole</code> with an inline <code>--policy</code>, the action must be allowed there too — an intersection, never an expansion.</li>
  <li><strong>Step 6 — Permissions boundary.</strong> If the principal has one, the action must be allowed by it. Also an intersection.</li>
  <li><strong>Step 7 — Identity-based and resource-based policies.</strong> Now, finally, AWS looks for an explicit <strong>Allow</strong>.</li>
  <li><strong>Step 8 — If no Allow was found, the implicit Deny stands.</strong></li>
</ul>
<p style="line-height: 1.75;">The compressed version worth memorising: <strong>explicit Deny &gt; SCP/RCP &gt; session policy &gt; permissions boundary &gt; explicit Allow &gt; implicit Deny</strong>. Every layer above the Allow is a <em>filter</em>, not a grant. Only identity and resource policies grant.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The same-account vs cross-account rule</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Same account:</strong> an Allow in <em>either</em> the identity policy <em>or</em> the resource policy is sufficient. They are OR'd.</li>
  <li><strong>Cross-account:</strong> you need an Allow in <em>both</em> — the caller's account must permit the call, and the resource's account must permit the caller. They are AND'd. This is the single most-asked evaluation question.</li>
  <li><strong>KMS is special:</strong> the key policy must always grant access. An identity policy alone never suffices, because a KMS key policy that does not delegate to IAM ignores IAM entirely. This trips up nearly everyone at least once.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Consequences that show up in interviews</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Attaching AdministratorAccess does not always fix an AccessDenied.</strong> If the block is an SCP, a permissions boundary, a session policy or an explicit Deny, more Allow does nothing. When admin does not help, stop adding permissions and start looking at the filters.</li>
  <li><strong>Statement order is irrelevant.</strong> IAM is not a firewall ruleset; there is no "first match wins". All statements are evaluated together.</li>
  <li><strong>A resource policy can grant access to a principal in another account without that principal's admin knowing</strong> — which is why IAM Access Analyzer exists, and why RCPs were introduced.</li>
  <li><strong>Permissions boundaries and session policies do not apply to resource-based policies in the same way</strong> — a resource-based policy granting access to an IAM <em>role</em> can, in some cases, bypass a session policy for that role's session. The detailed matrix is in the docs; knowing the exception exists is enough for most interviews.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">A debugging method rather than guesswork</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Read the whole error message.</strong> Modern AccessDenied text names the principal, the action, the resource, and increasingly the <em>type</em> of policy that caused the denial ("with an explicit deny in a service control policy").</li>
  <li><strong>Confirm the identity</strong> with <code>aws sts get-caller-identity</code> — you are surprisingly often not who you think you are.</li>
  <li><strong>Simulate</strong> with <code>iam simulate-principal-policy</code>, which reports the decision and the matched statement Sid without performing the action.</li>
  <li><strong>Walk the layers top-down</strong>: explicit Deny anywhere? → SCP/RCP? → session policy? → boundary? → is there actually an Allow?</li>
  <li><strong>Check CloudTrail</strong> — the event records the full request context, including the condition keys that were present, which is how you discover a condition silently failed to match.</li>
  <li>Remember <strong>eventual consistency</strong>: a policy attached two seconds ago may not have propagated.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "AWS starts at implicit deny, then checks for an explicit Deny anywhere — which is final — then SCPs and RCPs, then any session policy, then the permissions boundary, and only then looks for an explicit Allow in identity or resource policies. Everything above the Allow is a filter that can only subtract. Within one account an Allow on either the identity or the resource side is enough; across accounts you need both, and KMS always requires the key policy to grant. The practical consequence is that if attaching AdministratorAccess doesn't fix an AccessDenied, the problem is a Deny, an SCP or a boundary — not a missing permission."</div>
</div>`,
          examples: [
            `# ---------- Layer by layer ----------
# 1. explicit DENY anywhere            -> DENY (final)
# 2. SCP  (Organizations, per account) -> must allow
# 3. RCP  (Organizations, per resource)-> must allow
# 4. session policy (AssumeRole --policy) -> must allow
# 5. permissions boundary              -> must allow
# 6. identity policy OR resource policy-> must ALLOW
# 7. otherwise                         -> implicit DENY

# ---------- Same account: OR ----------
# identity policy allows s3:GetObject  -> WORKS (even with no bucket policy)
# bucket policy allows the principal   -> WORKS (even with no identity policy)

# ---------- Cross account: AND ----------
# Account A (caller) identity policy:
{ "Effect":"Allow", "Action":"s3:GetObject", "Resource":"arn:aws:s3:::b-bucket/*" }
# Account B (owner) bucket policy:
{ "Effect":"Allow", "Principal":{"AWS":"arn:aws:iam::111122223333:role/reader"},
  "Action":"s3:GetObject", "Resource":"arn:aws:s3:::b-bucket/*" }
# BOTH required. Either one alone -> AccessDenied.

# ---------- KMS: the key policy must grant, full stop ----------
{
  "Sid": "DelegateToIAM",
  "Effect": "Allow",
  "Principal": { "AWS": "arn:aws:iam::111122223333:root" },
  "Action": "kms:*",
  "Resource": "*"
}
# Without a statement like this, identity policies granting kms:Decrypt do nothing.

# ---------- Simulate before you guess ----------
aws iam simulate-principal-policy \\
  --policy-source-arn arn:aws:iam::111122223333:role/deploy \\
  --action-names s3:PutObject kms:Decrypt \\
  --resource-arns arn:aws:s3:::artifacts/build/42.zip \\
  --context-entries ContextKeyName=aws:MultiFactorAuthPresent,ContextKeyType=boolean,ContextKeyValues=true \\
  --query 'EvaluationResults[].{Action:EvalActionName,Decision:EvalDecision,
           Matched:MatchedStatements[].SourcePolicyId,
           MissingCtx:MissingContextValues}'

# ---------- Was it an SCP? ----------
aws organizations describe-effective-policy \\
  --policy-type SERVICE_CONTROL_POLICY --target-id 111122223333

# ---------- The full request context, from CloudTrail ----------
aws cloudtrail lookup-events --lookup-attributes AttributeKey=EventName,AttributeValue=GetObject \\
  --max-results 1 --query 'Events[0].CloudTrailEvent' --output text | jq '{
     principal: .userIdentity.arn,
     errorCode: .errorCode,
     errorMessage: .errorMessage,
     mfa: .userIdentity.sessionContext.attributes.mfaAuthenticated,
     sourceIP: .sourceIPAddress
  }'

# ---------- A boundary in action ----------
# identity policy:  Allow s3:*, ec2:*, iam:*
# boundary:         Allow s3:*, ec2:Describe*
# EFFECTIVE:        s3:*  +  ec2:Describe*      (intersection — no iam:*, no ec2:RunInstances)`,
          ],
          questions: [
            {
              question: "Walk me through IAM policy evaluation from start to finish.",
              solution: "<p>Authenticate the signature, then start at <strong>implicit deny</strong>. Check for an <strong>explicit Deny</strong> in any applicable policy — if found, the answer is Deny and evaluation stops. Then every <strong>SCP</strong> from the org root down to the account must allow, then <strong>RCPs</strong>, then any <strong>session policy</strong>, then the <strong>permissions boundary</strong>. Only after all those filters pass does AWS look for an <strong>explicit Allow</strong> in identity-based or resource-based policies; if none matches, the implicit deny stands. The key insight is that only identity and resource policies <em>grant</em> — every other layer can only subtract.</p>",
            },
            {
              question: "A user has AdministratorAccess but still gets AccessDenied. Give three explanations.",
              solution: "<p>(1) An <strong>SCP</strong> on the account or an ancestor OU does not allow the action — SCPs cap every principal in the account including root. (2) A <strong>permissions boundary</strong> on the user or role excludes it, since effective permissions are the intersection. (3) An <strong>explicit Deny</strong> somewhere — an inline guardrail, a resource policy, an RCP, or a revocation Deny on <code>aws:TokenIssueTime</code>. Also worth naming: a <strong>session policy</strong> passed at AssumeRole narrowed the session; the call is <strong>cross-account</strong> and the resource side does not allow it; or it is <strong>KMS</strong>, where the key policy must grant regardless of IAM. The general rule: if more Allow doesn't help, the problem is a filter, not a permission.</p>",
            },
            {
              question: "Why does cross-account access require an Allow on both sides?",
              solution: "<p>Because each account is an independent trust boundary and neither should be able to unilaterally grant away the other's control. The caller's account must permit its principal to make the call (identity policy), and the resource owner's account must permit that principal (resource policy or an assumable role). Within a single account the two are OR'd, since one administrator already controls both sides. This is also why a resource policy can quietly expose data to an external account — the resource owner alone decides — and precisely why <strong>IAM Access Analyzer</strong> external-access findings and <strong>RCPs</strong> exist.</p>",
            },
            {
              question: "Does the order of statements in a policy matter?",
              solution: "<p>No. IAM is <strong>not</strong> a firewall ruleset — there is no first-match-wins. Every statement in every applicable policy is evaluated together, and the outcome depends only on whether a Deny matched and whether an Allow matched. Reordering statements changes nothing. What <em>does</em> matter is the layer a statement lives in (SCP vs boundary vs identity policy) and whether its conditions actually match the request context — a condition that silently fails to match, typically because a key is absent and you used a non-<code>IfExists</code> operator, is the usual reason a statement 'didn't apply'.</p>",
            },
            {
              question: "How do you debug an AccessDenied methodically?",
              solution: "<p>(1) <strong>Read the full message</strong> — it names the principal, action, resource, and often the policy type that denied. (2) <code>aws sts get-caller-identity</code> to confirm who you actually are. (3) <code>iam simulate-principal-policy</code> to get the decision plus the matched statement Sid without performing the action. (4) Walk the layers top-down: explicit Deny → SCP/RCP (<code>organizations describe-effective-policy</code>) → session policy → boundary → is there an Allow at all? (5) Inspect the <strong>CloudTrail</strong> event, which records the request context so you can see which condition keys were actually present. (6) Consider <strong>eventual consistency</strong> if the policy was just changed.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic-cross-account.html",
            "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html",
          ],
        },
        {
          topic: "Service Roles, PassRole & Privilege Escalation Paths",
          tags: ["aws", "iam", "passrole", "privilege escalation", "instance profile", "service role", "imdsv2"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Most AWS work is done not by you directly but by a <em>service acting on your behalf</em>: Lambda runs your code, EC2 runs your instance, CodeBuild runs your build. Each needs an identity, and you give it one by <strong>passing a role</strong>. That handover is guarded by a separate permission — <code>iam:PassRole</code> — and understanding it is the difference between a policy that looks least-privilege and one that is secretly an admin grant.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">How each service gets its identity</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>EC2 → instance profile.</strong> An instance profile is a thin container holding exactly one role; you attach the profile to the instance. Code on the box reads credentials from the <strong>Instance Metadata Service</strong> at <code>169.254.169.254</code>. Enforce <strong>IMDSv2</strong> (PUT a token first, then GET with it) and set the hop limit to 1 — IMDSv1's plain GET is what turned an SSRF bug into the Capital One breach, because a vulnerable app could be tricked into fetching role credentials.</li>
  <li><strong>Lambda → execution role.</strong> Credentials arrive as environment variables and the runtime refreshes them. Grant it only what the function calls, plus the logging permissions from <code>AWSLambdaBasicExecutionRole</code>.</li>
  <li><strong>ECS → task role vs task execution role.</strong> The <em>task role</em> is your container's identity. The <em>task execution role</em> is the agent's identity for pulling images from ECR, fetching secrets, and shipping logs. Confusing them produces either a task that cannot start or a container that cannot call AWS.</li>
  <li><strong>EKS → IRSA or EKS Pod Identity.</strong> A Kubernetes service account maps to an IAM role, so pods get per-workload identities instead of sharing the node's role. Always do this — a pod using the node instance role inherits every permission every pod on that node needs.</li>
  <li><strong>Service-linked roles</strong> — predefined, service-owned roles (<code>AWSServiceRoleForAutoScaling</code>) that you cannot edit and that can only be deleted once the service stops needing them.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">iam:PassRole — the permission everyone forgets</h4>
<p style="line-height: 1.75;">When you run <code>aws lambda create-function --role arn:…:role/admin-role</code>, you are <em>passing</em> that role to Lambda. AWS requires you to hold <code>iam:PassRole</code> for that role, separately from <code>lambda:CreateFunction</code>. The reason is obvious once stated: without it, anyone who can create a Lambda could attach the most powerful role in the account and run arbitrary code as it.</p>
<p style="line-height: 1.75;">That makes the combination <strong><code>iam:PassRole</code> on <code>*</code> plus any compute-creation permission</strong> a full privilege-escalation path to administrator. It is one of the highest-value things to spot in a policy review, and it appears constantly in real accounts because people grant <code>iam:PassRole</code> with a wildcard "to make the deploy work".</p>
<p style="line-height: 1.75;">The fix is two-part: scope <code>Resource</code> to the specific roles that may be passed, and add the <code>iam:PassedToService</code> condition so a role meant for Lambda cannot be handed to EC2.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The escalation catalogue worth naming</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>PassRole + CreateFunction/RunInstances/CreateCluster</strong> — run code as a more privileged role.</li>
  <li><strong><code>iam:CreatePolicyVersion</code></strong> — set a new default version of a policy you are already subject to, granting yourself anything. No PassRole needed.</li>
  <li><strong><code>iam:AttachUserPolicy</code> / <code>AttachRolePolicy</code></strong> — attach <code>AdministratorAccess</code> to yourself.</li>
  <li><strong><code>iam:UpdateAssumeRolePolicy</code></strong> — rewrite a powerful role's trust policy to trust you, then assume it.</li>
  <li><strong><code>iam:CreateAccessKey</code> on another user</strong> — mint credentials for a more privileged identity.</li>
  <li><strong><code>iam:PutUserPolicy</code> / <code>PutRolePolicy</code></strong> — write yourself an inline admin policy.</li>
  <li><strong><code>lambda:UpdateFunctionCode</code></strong> on a function with a privileged role — replace the code, inherit the role.</li>
  <li><strong><code>ssm:SendCommand</code></strong> on instances with privileged instance profiles — run commands as those roles.</li>
  <li><strong><code>glue:UpdateDevEndpoint</code>, <code>cloudformation:CreateStack</code> with a passed role, <code>datapipeline</code>, <code>sagemaker:CreateNotebookInstance</code></strong> — all the same shape: get code running under a role you do not own.</li>
</ul>
<p style="line-height: 1.75;">The unifying pattern: <strong>any permission that lets you modify IAM, or run code as something else, is effectively admin.</strong> That is why <code>PowerUserAccess</code> deliberately excludes <code>iam:*</code>, and why IAM write permissions belong behind a permissions boundary and MFA.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Defending against it</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Never grant <code>iam:PassRole</code> with <code>"Resource": "*"</code>. Enumerate the roles, and condition on <code>iam:PassedToService</code>.</li>
  <li>Put a <strong>permissions boundary</strong> on every role that can create roles, and require via condition that any role it creates also carries the boundary. This is the standard safe-delegation pattern.</li>
  <li>Use <strong>SCPs</strong> to deny <code>iam:CreatePolicyVersion</code>, <code>iam:UpdateAssumeRolePolicy</code>, boundary removal and CloudTrail tampering outside a single break-glass role.</li>
  <li>Scan policies for escalation combinations in CI — this is what tools like <em>Cloudsplaining</em>, <em>PMapper</em> and <em>Parliament</em> exist for.</li>
  <li>Alarm on the IAM write actions in the catalogue above; they are rare in healthy accounts and loud when they matter.</li>
  <li>Enforce <strong>IMDSv2</strong> and a hop limit of 1 everywhere, so an SSRF cannot harvest role credentials.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Services act on your behalf using a role you pass them — instance profiles for EC2, execution roles for Lambda, task roles for ECS, IRSA for EKS. Handing a role to a service requires iam:PassRole as a separate permission, and granting it on a wildcard together with any compute-creation permission is a straight path to admin, because you can run code as a role you don't own. So I scope PassRole to specific roles and condition on iam:PassedToService, put permissions boundaries on anyone who can create roles, deny the IAM self-escalation actions like CreatePolicyVersion and UpdateAssumeRolePolicy via SCP, and enforce IMDSv2 so an SSRF can't steal instance credentials."</div>
</div>`,
          examples: [
            `# ---------- DANGEROUS: this is admin in disguise ----------
{
  "Effect": "Allow",
  "Action": ["lambda:CreateFunction","lambda:InvokeFunction","iam:PassRole"],
  "Resource": "*"
}
# Attacker: create a Lambda with the account's admin role, invoke it, done.

# ---------- SAFE: scoped + service-constrained ----------
{
  "Version": "2012-10-17",
  "Statement": [
    { "Sid":"CreateFunctions","Effect":"Allow",
      "Action":["lambda:CreateFunction","lambda:UpdateFunctionConfiguration"],
      "Resource":"arn:aws:lambda:*:111122223333:function:orders-*" },
    { "Sid":"PassOnlyTheseRolesOnlyToLambda","Effect":"Allow",
      "Action":"iam:PassRole",
      "Resource":"arn:aws:iam::111122223333:role/service-role/orders-fn-*",
      "Condition":{"StringEquals":{"iam:PassedToService":"lambda.amazonaws.com"}} }
  ]
}

# ---------- Safe delegation: devs may create roles, but only boundaried ones ----------
{
  "Version": "2012-10-17",
  "Statement": [
    { "Sid":"CreateRolesWithBoundary","Effect":"Allow",
      "Action":["iam:CreateRole","iam:AttachRolePolicy","iam:PutRolePolicy"],
      "Resource":"arn:aws:iam::111122223333:role/dev/*",
      "Condition":{"StringEquals":{"iam:PermissionsBoundary":"arn:aws:iam::111122223333:policy/DevBoundary"}} },
    { "Sid":"NeverRemoveTheBoundary","Effect":"Deny",
      "Action":["iam:DeleteRolePermissionsBoundary","iam:DeleteUserPermissionsBoundary"],
      "Resource":"*" }
  ]
}

# ---------- SCP: shut the classic escalation actions ----------
{
  "Effect": "Deny",
  "Action": [
    "iam:CreatePolicyVersion","iam:SetDefaultPolicyVersion","iam:UpdateAssumeRolePolicy",
    "iam:AttachUserPolicy","iam:AttachRolePolicy","iam:PutUserPolicy","iam:PutRolePolicy",
    "iam:CreateAccessKey","iam:DeleteRolePermissionsBoundary"
  ],
  "Resource": "*",
  "Condition": {
    "ArnNotLike": { "aws:PrincipalArn": "arn:aws:iam::*:role/OrgSecurityBreakGlass" }
  }
}

# ---------- Enforce IMDSv2 (and stop SSRF credential theft) ----------
aws ec2 modify-instance-metadata-options --instance-id i-0abc123 \\
  --http-tokens required --http-put-response-hop-limit 1 --http-endpoint enabled

# Find instances still allowing IMDSv1
aws ec2 describe-instances \\
  --query 'Reservations[].Instances[?MetadataOptions.HttpTokens==\`optional\`].[InstanceId,InstanceType]' \\
  --output table

# ---------- Audit: who can pass which roles? ----------
# Grep every policy document for a wildcard PassRole grant:
aws iam list-policies --scope Local --query 'Policies[].Arn' --output text | tr '\\t' '\\n' | while read a; do
  v=$(aws iam get-policy --policy-arn "$a" --query 'Policy.DefaultVersionId' --output text)
  aws iam get-policy-version --policy-arn "$a" --version-id "$v" \\
    --query 'PolicyVersion.Document' | grep -q 'PassRole' && echo "REVIEW: $a"
done
# In practice use a dedicated scanner:
#   cloudsplaining scan --input-file account.json
#   pmapper graph create && pmapper analysis --output-type text

# ---------- ECS: two different roles, two different jobs ----------
# taskRoleArn          -> what YOUR CODE may call (s3, dynamodb, ...)
# executionRoleArn     -> what the AGENT may do (ecr:GetAuthorizationToken,
#                         secretsmanager:GetSecretValue, logs:CreateLogStream)`,
          ],
          questions: [
            {
              question: "What is iam:PassRole and why does it exist?",
              solution: "<p>When you hand a role to an AWS service — launching an EC2 instance with an instance profile, creating a Lambda with an execution role, starting an ECS task — you are <em>passing</em> that role, and AWS requires the separate <code>iam:PassRole</code> permission for it. It exists because otherwise anyone who could create compute could attach the most privileged role in the account and execute arbitrary code as it. Consequently <strong><code>iam:PassRole</code> on <code>*</code> combined with any compute-creation permission is equivalent to administrator</strong>. Scope the <code>Resource</code> to specific roles and add the <code>iam:PassedToService</code> condition so a Lambda role cannot be passed to EC2.</p>",
            },
            {
              question: "Name several IAM privilege-escalation paths.",
              solution: "<p><code>iam:PassRole</code> plus <code>lambda:CreateFunction</code>, <code>ec2:RunInstances</code> or <code>cloudformation:CreateStack</code> (run code as a better role); <code>iam:CreatePolicyVersion</code> / <code>SetDefaultPolicyVersion</code> (rewrite a policy you are subject to); <code>iam:AttachUserPolicy</code> or <code>AttachRolePolicy</code> (attach AdministratorAccess to yourself); <code>iam:UpdateAssumeRolePolicy</code> (make a powerful role trust you, then assume it); <code>iam:CreateAccessKey</code> on another user; <code>iam:PutUserPolicy</code>/<code>PutRolePolicy</code>; <code>lambda:UpdateFunctionCode</code> on a privileged function; and <code>ssm:SendCommand</code> against instances with privileged profiles. The unifying rule: <strong>any permission to modify IAM or to run code as another identity is effectively admin</strong>.</p>",
            },
            {
              question: "How do you let developers create IAM roles without letting them create admins?",
              solution: "<p><strong>Permissions boundaries with a conditional grant.</strong> Allow <code>iam:CreateRole</code> and the policy-attachment actions, but condition them on <code>\"StringEquals\": {\"iam:PermissionsBoundary\": \"arn:aws:iam::…:policy/DevBoundary\"}</code>, so every role they create is forced to carry the boundary and can therefore never exceed it. Scope creation to a path such as <code>role/dev/*</code>, and add an explicit <strong>Deny</strong> on <code>iam:DeleteRolePermissionsBoundary</code> and <code>iam:DeleteUserPermissionsBoundary</code> so the ceiling cannot be removed afterwards. Without that last Deny the whole scheme is trivially bypassed.</p>",
            },
            {
              question: "Why is IMDSv2 important, and what does hop limit 1 do?",
              solution: "<p>IMDSv1 served instance-role credentials to any plain <code>GET</code> of <code>169.254.169.254</code>, so a <strong>server-side request forgery</strong> bug in an application could be coerced into fetching them — the mechanism behind the Capital One breach. <strong>IMDSv2</strong> requires a <code>PUT</code> to obtain a session token first and that token on every subsequent request, which typical SSRF primitives cannot perform. Setting <code>--http-put-response-hop-limit 1</code> means the response's TTL expires after one network hop, so a <strong>container</strong> on the instance (or any forwarding proxy) cannot reach the metadata service and inherit the node's role — forcing per-workload identities via task roles or IRSA instead.</p>",
            },
            {
              question: "What is the difference between a service role, a service-linked role, and an instance profile?",
              solution: "<p>A <strong>service role</strong> is an ordinary IAM role you create and control, with a trust policy naming an AWS service principal — you choose its permissions and can edit or delete it. A <strong>service-linked role</strong> is predefined and <em>owned by the service</em> (e.g. <code>AWSServiceRoleForAutoScaling</code>): its permissions are managed by AWS, you cannot edit them, and it can only be deleted once the service no longer needs it — which is exactly what makes it safe for a service to depend on. An <strong>instance profile</strong> is not a role at all but a container holding exactly one role, and is the mechanism by which a role is attached to an EC2 instance; the CLI creates one implicitly when you use the console, which is why people are sometimes surprised it exists.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_passrole.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_terms-and-concepts.html",
            "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html",
          ],
        },
        {
          topic: "Multi-Account: Cross-Account Roles, SCPs, RCPs & Permissions Boundaries",
          tags: ["aws", "iam", "organizations", "scp", "rcp", "cross-account", "permissions boundary"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Real companies do not run in one AWS account. They run dozens or hundreds, organised under <strong>AWS Organizations</strong>, because an account is the strongest isolation boundary AWS offers — separate quotas, separate blast radius, separate billing, and a clean line for "production cannot touch development". Once you have many accounts, IAM questions become <em>organisation design</em> questions.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Why multiple accounts</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Blast radius.</strong> A mistake or compromise in one account cannot reach another unless you explicitly connected them.</li>
  <li><strong>Clean guardrails.</strong> SCPs apply per account/OU, so "no one in any production account may disable CloudTrail" is a single control.</li>
  <li><strong>Quota and cost isolation.</strong> Service limits and bills are per account, so one team cannot exhaust another's capacity, and chargeback is trivial.</li>
  <li><strong>Compliance scoping.</strong> Keeping regulated workloads in their own account shrinks the audit boundary enormously.</li>
</ul>
<p style="line-height: 1.75;">The standard layout (AWS Control Tower's "landing zone") is a <strong>management account</strong> that does nothing but manage the organisation, a <strong>log archive</strong> account holding immutable CloudTrail and Config data, a <strong>security tooling</strong> account running GuardDuty/Security Hub with read access everywhere, a <strong>shared services</strong> account, and then workload accounts grouped into OUs by environment and business unit.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Cross-account access patterns</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Role assumption (the default answer).</strong> Account B creates a role trusting account A; a principal in A calls <code>sts:AssumeRole</code>. Both sides must allow: the trust policy in B, and an <code>sts:AssumeRole</code> permission in A. Harden the trust with <code>ExternalId</code> for third parties, MFA conditions for humans, and <code>aws:PrincipalOrgID</code> for internal use.</li>
  <li><strong>Resource-based policy (no assumption needed).</strong> A bucket policy, SQS queue policy, SNS topic policy, KMS key policy or Lambda resource policy can name a principal in another account directly. Simpler, and it avoids a round trip — but it also means the resource owner can grant access without the other account's involvement, which is why it needs monitoring.</li>
  <li><strong>Identity Center permission sets</strong> for humans across many accounts, which is role assumption with the plumbing handled for you.</li>
  <li><strong>Hub-and-spoke</strong>: a central identity or CI account whose roles can assume narrow deployment roles in each workload account. Watch the 1-hour <strong>role-chaining</strong> cap here.</li>
  <li><strong>RAM (Resource Access Manager)</strong> for sharing infrastructure like subnets, Transit Gateways and Route 53 rules — a different mechanism than IAM, and a good one to name.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">SCPs — the account-level ceiling</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Attached to the org root, an OU, or an account; <strong>inherited downward</strong>, and the effective ceiling is the intersection of every level.</li>
  <li><strong>They never grant.</strong> An SCP allowing <code>s3:*</code> gives nobody access; it merely permits identity policies to do so.</li>
  <li>They apply to <strong>every principal in the account, including member-account root</strong>, but <strong>never to the management account</strong> — which is why the management account should hold no workloads.</li>
  <li>They do not apply to <strong>service-linked roles</strong>.</li>
  <li>Two styles: a <strong>deny list</strong> (start from <code>FullAWSAccess</code>, add Deny statements for specific dangerous actions) — the common, manageable choice; or an <strong>allow list</strong> (enumerate everything permitted) — tighter but brittle, because every new service needs an SCP change.</li>
  <li>Classic uses: deny leaving the organisation, deny disabling CloudTrail/Config/GuardDuty, deny regions outside your footprint, deny deleting the security baseline roles, deny root usage in member accounts, require encryption or IMDSv2.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">RCPs — the resource-side ceiling</h4>
<p style="line-height: 1.75;">A <strong>Resource Control Policy</strong> is the newer mirror of an SCP. Where an SCP caps what <em>your principals</em> can do, an RCP caps what can be done <em>to your resources</em>, no matter who is calling — including principals outside your organisation. The flagship use is data perimeter enforcement: "no S3 bucket, KMS key, SQS queue or IAM role in any of our accounts may be accessed by a principal outside our org, except these named AWS services." That is a control you previously had to try to achieve with hundreds of individual resource policies and hope nobody forgot one.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Permissions boundaries — the identity-level ceiling</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>An IAM policy attached to a single user or role that defines its <strong>maximum</strong> permissions. Effective access = identity policies <strong>∩</strong> boundary.</li>
  <li>Grants nothing on its own. A boundary allowing <code>s3:*</code> with no identity policy still yields zero access.</li>
  <li>Its killer use is <strong>safe delegation</strong>: let developers create roles for their own services, but condition <code>iam:CreateRole</code> on <code>iam:PermissionsBoundary</code> equalling your boundary policy, and Deny <code>iam:DeleteRolePermissionsBoundary</code> — now they have autonomy and cannot manufacture an admin.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Putting the layers together (the data perimeter)</h4>
<p style="line-height: 1.75;">The mature pattern combines four controls: <strong>SCPs</strong> so your identities can only act inside your organisation (<code>aws:PrincipalOrgID</code>), <strong>RCPs</strong> so your resources can only be reached by your identities or approved services, <strong>VPC endpoint policies</strong> so network paths only reach approved resources, and <strong>permissions boundaries</strong> so delegated role creation stays inside the lines. Together they answer "can our data ever leave, and can anything outside ever get in?" with a structural yes/no rather than a per-resource audit.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Accounts are the real isolation boundary, so I use Organizations with a management account that holds no workloads, plus log-archive and security-tooling accounts, and workload accounts grouped into OUs. Cross-account access is a role in the target account whose trust policy names the caller, hardened with ExternalId, MFA or aws:PrincipalOrgID — or a resource-based policy where a round trip isn't wanted. On top sit three ceilings that never grant: SCPs cap every principal in an account, RCPs cap what can be done to resources regardless of caller, and permissions boundaries cap one identity, which is what makes delegated role creation safe."</div>
</div>`,
          examples: [
            `# ---------- Cross-account role: BOTH sides required ----------
# Account B (222233334444) — the role's trust policy
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "AWS": "arn:aws:iam::111122223333:role/ci-runner" },
    "Action": "sts:AssumeRole",
    "Condition": {
      "StringEquals": { "aws:PrincipalOrgID": "o-abc123xyz" },
      "Bool":         { "aws:MultiFactorAuthPresent": "true" }
    }
  }]
}
# Account A (111122223333) — the caller's identity policy
{ "Effect":"Allow","Action":"sts:AssumeRole",
  "Resource":"arn:aws:iam::222233334444:role/deploy" }

# ---------- SCP: deny-list style (the manageable one) ----------
{
  "Version": "2012-10-17",
  "Statement": [
    { "Sid":"ProtectAuditTrail","Effect":"Deny",
      "Action":["cloudtrail:StopLogging","cloudtrail:DeleteTrail","cloudtrail:UpdateTrail",
                "config:DeleteConfigurationRecorder","guardduty:DeleteDetector"],
      "Resource":"*",
      "Condition":{"ArnNotLike":{"aws:PrincipalArn":"arn:aws:iam::*:role/OrgSecurityAdmin"}} },
    { "Sid":"DenyLeavingTheOrg","Effect":"Deny",
      "Action":["organizations:LeaveOrganization"],"Resource":"*" },
    { "Sid":"RegionLockButKeepGlobalServices","Effect":"Deny",
      "NotAction":["iam:*","organizations:*","route53:*","cloudfront:*","support:*","sts:*","budgets:*","waf:*"],
      "Resource":"*",
      "Condition":{"StringNotEquals":{"aws:RequestedRegion":["eu-west-1","us-east-1"]}} }
  ]
}

# ---------- RCP: nothing outside the org may touch our data ----------
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "EnforceOrgIdentityPerimeter",
    "Effect": "Deny",
    "Principal": "*",
    "Action": ["s3:*","sqs:*","kms:*","secretsmanager:*","sts:AssumeRole"],
    "Resource": "*",
    "Condition": {
      "StringNotEqualsIfExists": { "aws:PrincipalOrgID": "o-abc123xyz" },
      "BoolIfExists":            { "aws:PrincipalIsAWSService": "false" }
    }
  }]
}

# ---------- Permissions boundary: ceiling, not grant ----------
# DevBoundary policy
{ "Version":"2012-10-17","Statement":[
  { "Effect":"Allow","Action":["s3:*","dynamodb:*","lambda:*","logs:*","cloudwatch:*"],"Resource":"*" },
  { "Effect":"Deny","Action":["iam:*","organizations:*","account:*"],"Resource":"*" } ]}

aws iam put-role-permissions-boundary --role-name dev/app-role \\
  --permissions-boundary arn:aws:iam::111122223333:policy/DevBoundary

# ---------- Inspect the effective org policy on an account ----------
aws organizations describe-effective-policy --policy-type SERVICE_CONTROL_POLICY --target-id 111122223333
aws organizations describe-effective-policy --policy-type RESOURCE_CONTROL_POLICY --target-id 111122223333
aws organizations list-policies-for-target --target-id ou-abc1-11111111 --filter SERVICE_CONTROL_POLICY

# ---------- Find resources shared outside the org ----------
aws accessanalyzer create-analyzer --analyzer-name org-external \\
  --type ORGANIZATION
aws accessanalyzer list-findings --analyzer-arn arn:aws:access-analyzer:... \\
  --filter '{"status":{"eq":["ACTIVE"]}}' \\
  --query 'findings[].{Resource:resource,External:principal,Action:action}'`,
          ],
          questions: [
            {
              question: "What is an SCP and how does it differ from an IAM policy?",
              solution: "<p>A <strong>Service Control Policy</strong> is an AWS Organizations control attached to the org root, an OU or an account. It sets the <strong>maximum</strong> permissions available in those accounts and <strong>never grants anything</strong> — an action must be allowed by both the SCP <em>and</em> an IAM policy to succeed. SCPs are inherited down the OU tree and intersect at every level, apply to every principal in a member account <strong>including its root user</strong>, do not apply to <strong>service-linked roles</strong>, and critically <strong>do not apply to the management account at all</strong> — which is why that account should contain no workloads.</p>",
            },
            {
              question: "What problem do Resource Control Policies solve that SCPs don't?",
              solution: "<p>SCPs constrain <em>your principals</em>; they say nothing about who else can reach your resources. A bucket policy in one of your accounts could still grant an external account access, and you would have to audit every resource policy in the organisation to find it. An <strong>RCP</strong> is an organisation-wide ceiling on what can be done <strong>to resources in your accounts, regardless of the caller</strong> — so a single RCP can enforce 'no principal outside our organisation may access any S3 bucket, KMS key, SQS queue or role in any of our accounts, except these approved AWS services'. It is the resource half of a <strong>data perimeter</strong>.</p>",
            },
            {
              question: "How does a permissions boundary differ from an SCP, and when do you use each?",
              solution: "<p>Both are ceilings that grant nothing. A <strong>permissions boundary</strong> applies to <strong>one IAM user or role</strong> and is the tool for <strong>delegation</strong> — letting developers create their own roles while guaranteeing those roles cannot exceed the boundary. An <strong>SCP</strong> applies to <strong>every principal in an account or OU</strong> and is the tool for <strong>organisation-wide guardrails</strong> — no disabling CloudTrail, no unapproved regions, no leaving the org. Use boundaries for autonomy with safety inside an account; use SCPs for controls no one in the account may bypass, including its root.</p>",
            },
            {
              question: "Design cross-account access for a CI pipeline deploying to dev, staging and prod.",
              solution: "<p>Give the pipeline <strong>no long-lived credentials</strong>: if it runs in GitHub Actions, use <strong>OIDC federation</strong> into a role in a tooling account, with the trust policy pinned to the specific repo and ref. That role holds only <code>sts:AssumeRole</code> on one narrow deploy role per target account. Each target account's deploy role trusts only the tooling role, is scoped to the resources that deployment actually touches, and for production additionally requires an approval gate — a distinct role assumable only from a protected environment or with MFA. Mind the <strong>1-hour role-chaining cap</strong>: configure the profile so the SDK refreshes rather than exporting credentials once at job start. Tag sessions with the build ID so CloudTrail attributes every change to a commit.</p>",
            },
            {
              question: "Why should the management account hold no workloads?",
              solution: "<p>Because <strong>SCPs do not apply to it</strong> — there is no way to place a guardrail over the management account, including over its root user — and because it holds the authority to create accounts, attach policies, and manage the entire organisation. Any compromise there is a compromise of every account. So it is kept empty of workloads, its root is protected with hardware MFA and alarms, access to it is restricted to a small break-glass role, and everything operational (logging, security tooling, shared services, applications) lives in member accounts where SCPs and RCPs can actually constrain it.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html",
            "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_rcps.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html",
          ],
        },
        {
          topic: "Federation, IAM Identity Center & ABAC",
          tags: ["aws", "iam", "federation", "saml", "oidc", "identity center", "abac", "tags"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>Federation</strong> means AWS trusts an external identity provider to say who someone is, so you never create AWS-local credentials for them. <strong>ABAC</strong> means permissions are decided by comparing <em>tags</em> rather than by listing resources. Together they are how access is actually managed at scale, and they are the natural "what would you do in a real company?" follow-up to the basics.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The federation options</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>IAM Identity Center</strong> (formerly AWS SSO) — the recommended front door for humans. It connects to an external IdP (Okta, Entra ID, Google Workspace, Ping) via SAML for authentication and <strong>SCIM</strong> for user/group provisioning, or runs its own directory. You define <strong>permission sets</strong> — policy bundles that materialise as IAM roles in each assigned account — and assign <em>groups</em> to <em>accounts</em> with a permission set. One assignment gives a whole team access to many accounts.</li>
  <li><strong>SAML 2.0 federation</strong> — the classic enterprise pattern, registering the IdP as an IAM identity provider and having users call <code>sts:AssumeRoleWithSAML</code>. Still common, but Identity Center does this with far less per-account plumbing.</li>
  <li><strong>OIDC / web identity federation</strong> — <code>sts:AssumeRoleWithWebIdentity</code> for GitHub Actions, GitLab CI, EKS service accounts (IRSA), and mobile apps. This is how you get <strong>zero stored secrets</strong> in CI.</li>
  <li><strong>Amazon Cognito</strong> — for application end users (a mobile or web app's customers), with user pools for authentication and identity pools to exchange a token for AWS credentials. Do not confuse Cognito (your app's users) with Identity Center (your employees).</li>
  <li><strong>IAM Roles Anywhere</strong> — X.509 certificates from your own CA exchanged for temporary credentials, for on-premises servers and hardware.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Why federation is strictly better</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>One place to offboard.</strong> Disable the person in the IdP and their AWS access ends everywhere, instantly. With IAM users you must remember every account.</li>
  <li><strong>MFA and conditional access enforced centrally</strong> — device posture, geography, risk signals — by a system built for it.</li>
  <li><strong>No long-lived credentials anywhere.</strong> Every session is temporary.</li>
  <li><strong>Group-driven access.</strong> Adding someone to an IdP group grants AWS access without touching AWS at all.</li>
  <li><strong>Attributes flow through</strong> as session tags, which is what makes ABAC possible.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">ABAC — permissions by tag</h4>
<p style="line-height: 1.75;">In <strong>RBAC</strong> you write a policy per role and enumerate resources; every new project means a new policy, and policies grow until they hit the 6,144-character limit. In <strong>ABAC</strong> you write <em>one</em> policy that compares a tag on the principal with a tag on the resource:</p>
<p style="line-height: 1.75;"><code>"Condition": {"StringEquals": {"aws:ResourceTag/team": "\${aws:PrincipalTag/team}"}}</code></p>
<p style="line-height: 1.75;">That single statement says "you may act on resources belonging to your own team". Add a new team, a new project, a thousand new resources — the policy never changes. The principal tag comes from an IAM user/role tag, from a <strong>session tag</strong> passed at <code>AssumeRole</code>, or from an <strong>IdP attribute</strong> mapped through Identity Center or a SAML assertion.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What ABAC requires to actually work</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Tags must be trustworthy.</strong> If a user can tag their own principal or retag a resource, they can grant themselves access. Control <code>iam:TagRole</code>, <code>iam:TagUser</code> and the per-service tag actions tightly, and prefer tags sourced from the IdP over tags anyone can edit.</li>
  <li><strong>Tags must be mandatory at creation.</strong> Enforce with <code>aws:RequestTag/&lt;key&gt;</code> conditions on create actions and <code>aws:TagKeys</code> with <code>ForAllValues</code>, so an untagged resource simply cannot be created — otherwise untagged resources become invisible to your policies.</li>
  <li><strong>Not every service supports tag-based authorization</strong> for every action. Check the service authorization reference; a common design mistake is assuming <code>aws:ResourceTag</code> works everywhere.</li>
  <li><strong>Tag hygiene is now a security control</strong>, not a cost-allocation nicety — use AWS Config rules or tag policies to enforce it.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Session tags and trust chains</h4>
<p style="line-height: 1.75;">Session tags are passed at <code>AssumeRole</code> time with <code>--tags</code> and require the <code>sts:TagSession</code> permission in the trust policy. Marking a tag <strong>transitive</strong> means it survives <strong>role chaining</strong>, so an attribute set at the first hop still constrains the last one. In SAML and OIDC federation the IdP asserts the tags directly (<code>https://aws.amazon.com/SAML/Attributes/PrincipalTag:team</code>), which is the strongest arrangement because the values come from HR-sourced directory data rather than from anything the user controls.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">RBAC or ABAC?</h4>
<p style="line-height: 1.75;">In practice, both. RBAC defines the coarse job function ("developer", "read-only auditor", "billing"), and ABAC scopes it to the person's own team, project or environment. Pure RBAC collapses under policy sprawl at scale; pure ABAC depends on tag discipline that few organisations have everywhere. The honest interview answer names the trade-off rather than declaring one the winner.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Federation means an external IdP authenticates people and AWS issues temporary credentials — Identity Center with SAML plus SCIM for employees, OIDC for CI like GitHub Actions, Cognito for application end users, Roles Anywhere for on-prem. It means one place to offboard, central MFA, and no long-lived keys. ABAC then scopes permissions by comparing aws:PrincipalTag with aws:ResourceTag, so one policy covers every team and never changes as resources are added — but it only works if tags are enforced at creation and nobody can retag themselves. I use RBAC for the coarse job function and ABAC to scope it to the person's own team."</div>
</div>`,
          examples: [
            `# ---------- ABAC: one policy that never needs editing ----------
{
  "Version": "2012-10-17",
  "Statement": [
    { "Sid":"ActOnOwnTeamsResources","Effect":"Allow",
      "Action":["ec2:StartInstances","ec2:StopInstances","ec2:RebootInstances",
                "s3:GetObject","s3:PutObject","dynamodb:*"],
      "Resource":"*",
      "Condition":{"StringEquals":{"aws:ResourceTag/team":"\${aws:PrincipalTag/team}"}} },

    { "Sid":"MustTagOnCreate","Effect":"Allow",
      "Action":["ec2:RunInstances","ec2:CreateVolume","dynamodb:CreateTable"],
      "Resource":"*",
      "Condition":{"StringEquals":{"aws:RequestTag/team":"\${aws:PrincipalTag/team}"},
                   "ForAllValues:StringEquals":{"aws:TagKeys":["team","env","owner"]}} },

    { "Sid":"NeverRetagToEscalate","Effect":"Deny",
      "Action":["ec2:CreateTags","ec2:DeleteTags","s3:PutBucketTagging",
                "iam:TagRole","iam:TagUser","iam:UntagRole","iam:UntagUser"],
      "Resource":"*",
      "Condition":{"StringNotEquals":{"aws:ResourceTag/team":"\${aws:PrincipalTag/team}"}} }
  ]
}

# ---------- Session tags (require sts:TagSession in the trust policy) ----------
{
  "Effect": "Allow",
  "Principal": { "AWS": "arn:aws:iam::111122223333:role/idp-broker" },
  "Action": ["sts:AssumeRole","sts:TagSession"],
  "Condition": { "StringLike": { "aws:RequestTag/team": "*" } }
}

aws sts assume-role --role-arn arn:aws:iam::111122223333:role/abac-worker \\
  --role-session-name alice \\
  --tags Key=team,Value=payments Key=env,Value=prod \\
  --transitive-tag-keys team          # survives role chaining

# ---------- SAML assertion -> principal tags ----------
# <Attribute Name="https://aws.amazon.com/SAML/Attributes/PrincipalTag:team">
#   <AttributeValue>payments</AttributeValue>
# </Attribute>
# <Attribute Name="https://aws.amazon.com/SAML/Attributes/TransitiveTagKeys">
#   <AttributeValue>team</AttributeValue>
# </Attribute>

# ---------- GitHub Actions OIDC (no secrets stored) ----------
aws iam create-open-id-connect-provider \\
  --url https://token.actions.githubusercontent.com \\
  --client-id-list sts.amazonaws.com
{
  "Effect": "Allow",
  "Principal": { "Federated": "arn:aws:iam::111122223333:oidc-provider/token.actions.githubusercontent.com" },
  "Action": "sts:AssumeRoleWithWebIdentity",
  "Condition": {
    "StringEquals": { "token.actions.githubusercontent.com:aud": "sts.amazonaws.com" },
    "StringLike":   { "token.actions.githubusercontent.com:sub": "repo:acme/payments-api:environment:production" }
  }
}

# ---------- Identity Center: groups -> permission sets -> accounts ----------
aws sso-admin create-permission-set --instance-arn "$SSO" \\
  --name PowerUserWithBoundary --session-duration PT4H
aws sso-admin attach-managed-policy-to-permission-set --instance-arn "$SSO" \\
  --permission-set-arn "$PS" --managed-policy-arn arn:aws:iam::aws:policy/PowerUserAccess
aws sso-admin put-permissions-boundary-to-permission-set --instance-arn "$SSO" \\
  --permission-set-arn "$PS" \\
  --permissions-boundary CustomerManagedPolicyReference={Name=DevBoundary}
aws sso-admin create-account-assignment --instance-arn "$SSO" \\
  --target-id 222233334444 --target-type AWS_ACCOUNT \\
  --permission-set-arn "$PS" --principal-type GROUP --principal-id "$GROUP_ID"

# ---------- ABAC in Identity Center: map IdP attributes to session tags ----------
aws sso-admin create-instance-access-control-attribute-configuration \\
  --instance-arn "$SSO" \\
  --instance-access-control-attribute-configuration \\
    'AccessControlAttributes=[{Key=team,Value={Source=[\${path:enterprise.department}]}}]'`,
          ],
          questions: [
            {
              question: "What is ABAC and how does it differ from RBAC?",
              solution: "<p><strong>RBAC</strong> grants by role and enumerates resources, so every new team or project needs a new policy and policies grow until they hit the 6,144-character limit. <strong>ABAC</strong> grants by comparing attributes — typically <code>\"aws:ResourceTag/team\": \"\${aws:PrincipalTag/team}\"</code> — so one static policy says 'act on resources belonging to your own team' and never changes as teams and resources multiply. ABAC scales beautifully but depends entirely on <strong>tag integrity</strong>: tags must be mandatory at creation and nobody may retag themselves or a resource into another team. In practice you use both — RBAC for the coarse job function, ABAC to scope it.</p>",
            },
            {
              question: "What are the security prerequisites for ABAC?",
              solution: "<p>Three. (1) <strong>Tags cannot be self-assigned</strong> — deny <code>iam:TagRole</code>, <code>iam:TagUser</code> and the per-service tag actions when the target's tag does not already match the caller's, or the whole scheme is a self-service escalation. (2) <strong>Tags must be enforced at creation</strong> with <code>aws:RequestTag/&lt;key&gt;</code> and <code>ForAllValues:StringEquals</code> on <code>aws:TagKeys</code>, so untagged resources — which no ABAC policy can match — simply cannot exist. (3) <strong>Principal tags should come from the identity provider</strong> as session tags rather than from editable IAM tags, so the values trace back to HR-owned directory data. Also verify the services you need actually support tag-based authorization for those actions.</p>",
            },
            {
              question: "How does IAM Identity Center differ from IAM users and from SAML federation?",
              solution: "<p><strong>IAM users</strong> are per-account, long-lived identities with static credentials. <strong>SAML federation</strong> removes the static credentials but requires registering the IdP and creating roles in <em>every</em> account, with per-account plumbing you maintain. <strong>Identity Center</strong> is a managed layer over that: it connects once to your IdP (SAML for authentication, <strong>SCIM</strong> for provisioning), defines <strong>permission sets</strong> that materialise as roles in each assigned account, and assigns <em>groups</em> to <em>accounts</em>. So a new hire joining an IdP group gets correctly scoped, MFA-backed, temporary access across dozens of accounts without anyone touching IAM, and offboarding is a single disable in the IdP.</p>",
            },
            {
              question: "What are session tags and why does 'transitive' matter?",
              solution: "<p>Session tags are key/value pairs attached at <code>AssumeRole</code> time (<code>--tags</code>), requiring <code>sts:TagSession</code> in the trust policy, and they become <code>aws:PrincipalTag/&lt;key&gt;</code> for that session — the mechanism that feeds ABAC from a federated identity. Marking a tag <strong>transitive</strong> (<code>--transitive-tag-keys</code>) means it is carried forward through <strong>role chaining</strong>, so an attribute asserted at the first hop still constrains the final session and cannot be dropped in the middle. Without transitivity, a multi-hop pipeline would silently lose the very attribute your policies depend on.</p>",
            },
            {
              question: "How would you give a mobile app's end users access to their own S3 folder?",
              solution: "<p>Use <strong>Amazon Cognito</strong>, not IAM users — you never create AWS identities for application end users. A Cognito <strong>user pool</strong> authenticates them; a Cognito <strong>identity pool</strong> exchanges the resulting token for temporary AWS credentials via <code>sts:AssumeRoleWithWebIdentity</code>. The role's policy then uses a policy variable to scope access to that user's own prefix: <code>\"Resource\": \"arn:aws:s3:::app-data/\${cognito-identity.amazonaws.com:sub}/*\"</code>. One role, one policy, correct isolation for millions of users, and no credential ever stored in the app.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction_attribute-based-access-control.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_session-tags.html",
          ],
        },
        {
          topic: "Least Privilege in Practice: Auditing, Access Analyzer & Incident Response",
          tags: ["aws", "iam", "least privilege", "access analyzer", "cloudtrail", "guardduty", "incident response"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Knowing the building blocks is table stakes. The senior question is <em>how do you keep an account least-privilege over years, and what do you do at 3am when a key leaks?</em> Both answers are process plus tooling, not cleverness.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The least-privilege lifecycle</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Start broad in a sandbox, never in production.</strong> Let the workload run with generous permissions in dev so you learn what it genuinely calls.</li>
  <li><strong>Generate, don't guess.</strong> <strong>IAM Access Analyzer policy generation</strong> reads CloudTrail history for a principal and emits a policy containing exactly the actions it used. This turns least privilege from an argument into evidence.</li>
  <li><strong>Validate in CI.</strong> <code>accessanalyzer validate-policy</code> (and <code>check-no-new-access</code> / <code>check-access-not-granted</code>) flags overly broad grants, invalid actions and security warnings before merge. Fail the build on findings.</li>
  <li><strong>Deploy through IaC.</strong> Terraform or CloudFormation, reviewed in pull requests. A policy edited by hand in the console has no history, no reviewer and no rollback.</li>
  <li><strong>Prune continuously.</strong> <strong>Access Analyzer unused-access findings</strong> surface roles, users, keys and even individual permissions nobody has touched in a configurable window. <strong>IAM Access Advisor</strong> (<code>service-last-accessed-details</code>) shows which services a principal has actually used.</li>
  <li><strong>Re-certify periodically.</strong> A quarterly review where owners confirm each role is still needed, ideally automated to file a ticket per stale role rather than sending a spreadsheet nobody reads.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The audit toolkit</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>CloudTrail</strong> — every API call, with the full request context. Use an <strong>organization trail</strong> writing to a dedicated log-archive account.</li>
  <li><strong>IAM credential report</strong> — one CSV row per user: MFA status, password age and last use, key age and last use. The fastest way to find rot.</li>
  <li><strong>Access Advisor</strong> — services (and for some, actions) a principal has actually used, so you can strip the rest.</li>
  <li><strong>IAM Access Analyzer external-access findings</strong> — resources reachable from outside your account or organisation. This catches the bucket policy someone loosened "temporarily" in 2023.</li>
  <li><strong>GuardDuty</strong> — behavioural detection: credentials used from a new country, instance-role credentials used outside AWS (<code>InstanceCredentialExfiltration</code>), anomalous IAM calls, disabled logging.</li>
  <li><strong>AWS Config</strong> — continuous compliance rules (<code>iam-user-mfa-enabled</code>, <code>access-keys-rotated</code>, <code>iam-policy-no-statements-with-admin-access</code>) with auto-remediation.</li>
  <li><strong>Security Hub</strong> — aggregates all of the above against CIS/AWS Foundational benchmarks across every account.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Making logs trustworthy</h4>
<p style="line-height: 1.75;">The first move in a real intrusion is turning off the recording, so audit logs must be out of reach of the accounts they watch. Write an <strong>organization trail</strong> to a bucket in a separate <strong>log-archive</strong> account that workload principals cannot access; enable <strong>S3 Object Lock</strong> in compliance mode with versioning so objects cannot be deleted or overwritten even by that account's admin; enable <strong>log file validation</strong> so CloudTrail's signed digests make tampering detectable; encrypt with a KMS key whose policy excludes the workload accounts; and use an <strong>SCP</strong> denying <code>cloudtrail:StopLogging</code>, <code>DeleteTrail</code> and <code>PutEventSelectors</code> to everyone but one break-glass security role.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Incident response: a leaked credential</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Contain first, investigate second.</strong> For an access key: <code>update-access-key --status Inactive</code> (reversible, instant). For a role session: attach the <code>aws:TokenIssueTime</code> Deny, which kills every session issued before now while leaving new ones working. For a user: remove the login profile and deactivate keys.</li>
  <li><strong>Scope the blast radius</strong> with CloudTrail, filtering on the <code>accessKeyId</code> or the session ARN. Look specifically for: new IAM users, roles, keys or policy versions; changed trust policies; <code>RunInstances</code> in unusual regions; new resource-policy grants to external accounts; snapshots shared publicly; and any logging changes.</li>
  <li><strong>Remediate what the attacker created</strong>, not just what they used — persistence is the point of the exercise for them.</li>
  <li><strong>Rotate adjacent secrets</strong> that the compromised identity could read (Secrets Manager, SSM parameters, database credentials).</li>
  <li><strong>Close the door</strong>: tighten the trust policy, reduce <code>MaxSessionDuration</code>, add conditions (source VPC endpoint, org ID, MFA), and move the workload off static credentials entirely.</li>
  <li><strong>Write the blameless postmortem</strong> and turn each finding into a control: a Config rule, an SCP, a CI check, a GuardDuty alert.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The controls worth having before anything happens</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Alarms on: root sign-in, IAM policy changes, trust policy changes, new access keys, CloudTrail configuration changes, and failed-authorization spikes.</li>
  <li>Secret scanning in pre-commit hooks <em>and</em> in the remote (push protection), because one of the two will be bypassed.</li>
  <li>SCPs that deny the self-escalation actions outside a break-glass role.</li>
  <li>A rehearsed break-glass procedure — credentials in a safe, multiple MFA devices, and an annual drill. Discovering your break-glass process is broken during an incident is a bad day.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "I treat least privilege as a lifecycle, not a one-off: start broad in a sandbox, use Access Analyzer policy generation to build the policy from actual CloudTrail usage, validate policies in CI, deploy through IaC, then prune continuously with unused-access findings and Access Advisor. For detection I run an organization CloudTrail into a locked log-archive account with Object Lock and log file validation, plus GuardDuty, Config rules and Security Hub. If a credential leaks I contain first — deactivate the key, or Deny on aws:TokenIssueTime for a role session — then scope with CloudTrail, remediate what the attacker created rather than only what they used, rotate adjacent secrets, and convert every finding into a durable control."</div>
</div>`,
          examples: [
            `# ---------- Generate a least-privilege policy from real usage ----------
aws accessanalyzer start-policy-generation \\
  --policy-generation-details principalArn=arn:aws:iam::111122223333:role/legacy-app \\
  --cloud-trail-details 'trails=[{cloudTrailArn=arn:aws:cloudtrail:us-east-1:111122223333:trail/org,
      allRegions=true}],accessRole=arn:aws:iam::111122223333:role/AccessAnalyzerRole,
      startTime=2026-06-01T00:00:00Z'
aws accessanalyzer get-generated-policy --job-id <id> --include-resource-placeholders

# ---------- Validate in CI (fail the build on findings) ----------
aws accessanalyzer validate-policy --policy-type IDENTITY_POLICY \\
  --policy-document file://policy.json \\
  --query 'findings[?findingType==\`SECURITY_WARNING\` || findingType==\`ERROR\`]'

# Does this change grant MORE access than the current policy?
aws accessanalyzer check-no-new-access \\
  --new-policy-document file://new.json --existing-policy-document file://old.json \\
  --policy-type IDENTITY_POLICY

# Does it grant something we've banned outright?
aws accessanalyzer check-access-not-granted \\
  --policy-document file://policy.json --policy-type IDENTITY_POLICY \\
  --access 'actions=["iam:CreatePolicyVersion","iam:PassRole"]'

# ---------- What has this role ACTUALLY used? ----------
JOB=$(aws iam generate-service-last-accessed-details \\
  --arn arn:aws:iam::111122223333:role/legacy-app --query JobId --output text)
aws iam get-service-last-accessed-details --job-id "$JOB" \\
  --query 'ServicesLastAccessed[?TotalAuthenticatedEntities>\`0\`].[ServiceName,LastAuthenticated]' \\
  --output table

# ---------- Unused access + external access findings ----------
aws accessanalyzer create-analyzer --analyzer-name unused-90d \\
  --type ACCOUNT_UNUSED_ACCESS \\
  --configuration 'unusedAccess={unusedAccessAge=90}'
aws accessanalyzer list-findings-v2 --analyzer-arn "$ANALYZER" \\
  --query 'findings[].{Type:findingType,Resource:resource}'

# ---------- Credential rot, in one pass ----------
aws iam generate-credential-report >/dev/null
aws iam get-credential-report --query Content --output text | base64 -d | \\
  awk -F, 'NR==1 || ($4=="true" && $8=="false") || ($9=="true" && $11=="N/A")' | column -t
#             password but no MFA ^^^^^^^^^^^^^^      ^^^^ active key never used

# ---------- CONTAIN: kill a leaked key / a role session ----------
aws iam update-access-key --user-name svc-app --access-key-id AKIALEAKED --status Inactive

aws iam put-role-policy --role-name compromised-role --policy-name RevokeOlderSessions \\
  --policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Deny","Action":"*","Resource":"*",
    "Condition":{"DateLessThan":{"aws:TokenIssueTime":"'"$(date -u +%Y-%m-%dT%H:%M:%SZ)"'"}}}]}'

# ---------- SCOPE: what did they do? ----------
aws cloudtrail lookup-events \\
  --lookup-attributes AttributeKey=AccessKeyId,AttributeValue=AKIALEAKED \\
  --start-time 2026-09-01 --query 'Events[].{T:EventTime,E:EventName,S:Username}' --output table

# Persistence hunting — what did they CREATE?
for e in CreateUser CreateAccessKey CreateRole AttachRolePolicy PutRolePolicy \\
         UpdateAssumeRolePolicy CreatePolicyVersion ModifySnapshotAttribute; do
  aws cloudtrail lookup-events --lookup-attributes AttributeKey=EventName,AttributeValue=$e \\
    --start-time 2026-09-01 --query "Events[].{Event:EventName,User:Username,T:EventTime}" --output text
done

# ---------- Make the trail tamper-evident ----------
aws cloudtrail create-trail --name org-trail --s3-bucket-name org-audit-logs \\
  --is-organization-trail --is-multi-region-trail --enable-log-file-validation \\
  --kms-key-id arn:aws:kms:us-east-1:999988887777:key/...
aws s3api put-object-lock-configuration --bucket org-audit-logs \\
  --object-lock-configuration 'ObjectLockEnabled=Enabled,Rule={DefaultRetention={Mode=COMPLIANCE,Days=365}}'`,
          ],
          questions: [
            {
              question: "How do you build a genuinely least-privilege policy for an existing workload?",
              solution: "<p>Don't guess — measure. Run the workload with broad permissions in a <strong>sandbox</strong>, then use <strong>IAM Access Analyzer policy generation</strong>, which reads CloudTrail history for that principal and emits a policy containing exactly the actions it actually called. Cross-check with <strong>Access Advisor</strong> (<code>generate-service-last-accessed-details</code>) for services never touched. Tighten resources from wildcards to real ARNs or tag conditions, then <strong>validate in CI</strong> with <code>validate-policy</code> and <code>check-no-new-access</code> so future edits cannot silently widen it. Deploy through IaC so every change is reviewed, and keep pruning with <strong>unused-access findings</strong>.</p>",
            },
            {
              question: "How do you make CloudTrail logs tamper-evident?",
              solution: "<p>Put them out of reach of the accounts they watch. Write an <strong>organization trail</strong> to a bucket in a dedicated <strong>log-archive account</strong> that no workload principal can access. Enable <strong>versioning plus S3 Object Lock in compliance mode</strong> so objects cannot be deleted or overwritten even by that account's administrator; enable <strong>log file validation</strong> so CloudTrail's signed digest files make any modification or deletion detectable; encrypt with a KMS key whose policy excludes the workload accounts; and add an <strong>SCP</strong> denying <code>cloudtrail:StopLogging</code>, <code>DeleteTrail</code> and <code>PutEventSelectors</code> to everyone except a single break-glass security role — because the first move in a real intrusion is turning off the recording.</p>",
            },
            {
              question: "Walk me through responding to a compromised IAM credential.",
              solution: "<p><strong>Contain first.</strong> For an access key, <code>update-access-key --status Inactive</code> — instant and reversible. For a role session, attach an inline Deny conditioned on <code>aws:TokenIssueTime</code> being before now, killing every existing session while new ones still work. <strong>Then scope</strong> via CloudTrail filtered on the <code>accessKeyId</code> or session ARN. <strong>Hunt for persistence</strong>, not just usage: new users, keys, roles, policy versions, rewritten trust policies, shared snapshots, instances in odd regions, logging changes. <strong>Remediate</strong> everything created, <strong>rotate</strong> secrets the identity could read, then <strong>close the door</strong> — tighter trust policy, shorter session duration, added conditions, and move the workload off static credentials. Finish with a blameless postmortem where each finding becomes a durable control.</p>",
            },
            {
              question: "What's the difference between Access Analyzer's external-access and unused-access findings?",
              solution: "<p><strong>External-access findings</strong> answer 'what can be reached from outside?' — they use automated reasoning over resource-based policies to identify buckets, keys, queues, roles and secrets accessible to principals outside the account or organisation, catching the bucket policy someone loosened and forgot. <strong>Unused-access findings</strong> answer 'what do we grant that nobody uses?' — roles, users, access keys and individual permissions untouched within a configurable window, which is the raw material for continuous pruning. The first is about exposure, the second about excess; a mature account runs both, plus <strong>policy validation</strong> and <strong>policy generation</strong> in CI.</p>",
            },
            {
              question: "Which IAM events would you alarm on in a production organisation?",
              solution: "<p><strong>Root sign-in</strong> or any root API call (should be near-zero and always paged). <strong>IAM write actions</strong> that enable escalation: <code>CreatePolicyVersion</code>, <code>SetDefaultPolicyVersion</code>, <code>AttachRolePolicy</code>/<code>AttachUserPolicy</code>, <code>PutRolePolicy</code>, <code>UpdateAssumeRolePolicy</code>, <code>CreateAccessKey</code>, <code>DeleteRolePermissionsBoundary</code>. <strong>Logging tampering</strong>: <code>StopLogging</code>, <code>DeleteTrail</code>, <code>DeleteConfigurationRecorder</code>, <code>DeleteDetector</code>. <strong>Perimeter changes</strong>: new external grants in resource policies, snapshots or AMIs made public. Plus <strong>GuardDuty IAM findings</strong> such as <code>InstanceCredentialExfiltration</code> and anomalous API behaviour, and spikes in <code>AccessDenied</code>, which often indicate an attacker enumerating permissions.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_getting-report.html",
            "https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_finding-types-iam.html",
          ],
        },
      ],
    },
    {
      id: 2,
      label: "Advance",
      concepts: [
        {
          topic: "Users vs Roles — Permanent Identity vs Temporary, Assumable Identity",
          tags: ["aws", "iam", "users", "roles", "sts", "temporary credentials", "identity"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  This is the single most asked question in an AWS IAM interview, and most people answer it badly because they answer it with a definition instead of with a <em>difference</em>. So start with the one sentence that actually separates them: <strong>a user is an identity you log in as; a role is an identity you temporarily borrow.</strong> Everything else — credentials, expiry, trust policies, cross-account access — falls out of that one difference.
</p>
<p style="line-height: 1.75;">Put it another way. An <strong>IAM user</strong> is a permanent badge with your name printed on it. It lives in the account, it belongs to exactly one person or one application, and it carries long-lived secrets: a console password, and/or up to two access keys. Those secrets do not expire on their own. If you create an access key today and never touch it again, it still works in five years. That is convenient, and that is exactly what makes it dangerous.</p>
<p style="line-height: 1.75;">An <strong>IAM role</strong> is a uniform hanging in a locked room. The uniform carries authority — it opens certain doors — but it has nobody's name on it and no password. To use it, you must be on the list of people allowed into the room (that list is the <strong>trust policy</strong>), and when you put it on you are handed a <strong>shift pass that expires</strong>. When the shift ends, the authority ends automatically, whether or not anyone remembered to take the uniform back.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The difference in one table</h4>
<div style="overflow-x: auto; margin-top: 0.75rem;">
<table style="width: 100%; border-collapse: collapse; font-size: 0.92rem;">
  <thead>
    <tr style="background: #f1f5f9; text-align: left;">
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;">Question</th>
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;">IAM User</th>
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;">IAM Role</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Has its own credentials?</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Yes — password and/or access keys</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;"><strong>No.</strong> Credentials are minted on demand by STS</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Do the credentials expire?</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">No — they live until you rotate or delete them</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Yes — 15 minutes to 12 hours</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Who can use it?</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Whoever holds the secret</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Only principals named in the <strong>trust policy</strong></td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Can an AWS service use it?</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Only by embedding a key somewhere (bad)</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Yes — EC2, Lambda, ECS all assume roles natively</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Works across accounts?</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Only by sharing the secret with another account (very bad)</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Yes — this is the standard pattern</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Quota per account</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">5,000 users</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">1,000 roles (soft limit, raisable)</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">What CloudTrail shows</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">The user name, directly</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">The role plus the <strong>session name</strong> you chose</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Revoke access instantly?</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Delete or deactivate the key — but copies may exist</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Break the trust policy or add a time-based Deny</td></tr>
  </tbody>
</table>
</div>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What a user really is, under the hood</h4>
<p style="line-height: 1.75;">When you create an IAM user, AWS stores a record with a name, an ARN like <code>arn:aws:iam::123456789012:user/alice</code>, and a unique ID starting with <code>AIDA</code>. Attached to that record you may have two kinds of secret.</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>A console password</strong>, used by a human in a browser. This is for people.</li>
  <li><strong>Access keys</strong>, a pair of strings: an access key ID starting with <code>AKIA</code>, and a secret access key. These are for programs — the CLI, an SDK, a script. A user may hold at most <strong>two</strong> active keys, and that limit exists for exactly one reason: so you can rotate. Create the second, move everything over, then delete the first.</li>
</ul>
<p style="line-height: 1.75;">Notice what is missing: there is no expiry field. An <code>AKIA</code> key is valid until a human deactivates it. That single property causes most real AWS security incidents. A key gets committed to a public repository, baked into a Docker image, pasted into a Slack message, stored in a <code>.env</code> file that ends up in a backup, or left on a laptop that gets stolen — and it keeps working. Bots scrape GitHub for <code>AKIA</code> strings continuously and the time-to-exploitation is measured in minutes, not days.</p>
<p style="line-height: 1.75;">There is a second, subtler problem: a user's permissions are <strong>always on</strong>. If Alice has permission to delete production databases because she occasionally needs to, then every command she types all day is running with that power. A mistyped script at 2pm on a Tuesday has the same authority as a deliberate maintenance action.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What a role really is, under the hood</h4>
<p style="line-height: 1.75;">A role record looks similar — a name, an ARN like <code>arn:aws:iam::123456789012:role/deploy</code>, a unique ID starting with <code>AROA</code> — but with two crucial changes.</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>There is <strong>no credential storage at all</strong>. You cannot create an access key for a role. The API simply does not exist. This is not an oversight; it is the point.</li>
  <li>There is an extra document that users do not have: the <strong>trust policy</strong>, also called the <em>assume role policy document</em>. It answers "who is allowed to become me?"</li>
</ul>
<p style="line-height: 1.75;">To use the role, some principal calls <strong>AWS STS</strong> (Security Token Service) and asks to assume it. STS checks the trust policy, and if the caller is on the list, it returns three strings: an access key ID starting with <code>ASIA</code>, a secret access key, and a <strong>session token</strong>. All three must be sent with every request, and all three stop working at the expiry time. That <code>ASIA</code> prefix is a genuinely useful thing to know — you can look at any credential and instantly tell whether it is permanent (<code>AKIA</code>) or temporary (<code>ASIA</code>).</p>
<p style="line-height: 1.75;">Because the credentials are minted per session, several powerful things become possible that are simply impossible with a user:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Session naming.</strong> Every assume-role call carries a <code>RoleSessionName</code>. CloudTrail records it, so a shared role still produces per-person audit trails: <code>deploy/alice</code>, <code>deploy/jenkins-build-4417</code>.</li>
  <li><strong>Session policies.</strong> The caller can pass an extra policy at assume time that <em>further restricts</em> the session. A broad role can be narrowed down for one specific job without editing the role.</li>
  <li><strong>Session tags.</strong> Key-value pairs attached to the session, usable in conditions — the foundation of attribute-based access control.</li>
  <li><strong>Bulk revocation.</strong> Add a Deny on <code>aws:TokenIssueTime</code> before now, and every credential issued so far dies at once, while new sessions keep working.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The four places roles are used every day</h4>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Workloads inside AWS.</strong> An EC2 instance gets a role through an <em>instance profile</em>; a Lambda function gets an <em>execution role</em>; an ECS task gets a <em>task role</em>. The service fetches and refreshes the credentials automatically, so your code calls <code>boto3.client("s3")</code> with no configuration and it simply works. No secret exists to leak.</li>
  <li><strong>Humans, via federation.</strong> Instead of 200 IAM users, you point your corporate identity provider (Okta, Entra ID, Google Workspace) or AWS IAM Identity Center at AWS. People log in with their normal work login plus MFA, and receive role credentials. Someone leaves the company, HR disables their account, and their AWS access ends the same hour — with no IAM cleanup at all.</li>
  <li><strong>Across accounts.</strong> The production account creates a role that trusts the identity account. Engineers who live in the identity account assume it when they need production. Nothing is copied; nothing is shared.</li>
  <li><strong>Outside AWS, without keys.</strong> GitHub Actions, GitLab CI, and Kubernetes service accounts can assume roles via OIDC — the CI provider proves identity with a signed token and AWS trades it for temporary credentials. This is how you delete the last long-lived key from your CI system.</li>
</ol>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">So when do you still need a user?</h4>
<p style="line-height: 1.75;">Interviewers like this follow-up because "never use users" is a slogan, not an answer. Legitimate cases remain:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Something outside AWS that cannot federate.</strong> An old on-premises appliance, a third-party SaaS with no OIDC or cross-account role support, a vendor tool that only accepts a key pair.</li>
  <li><strong>Break-glass access.</strong> One tightly controlled user with hardware MFA, used if your identity provider itself goes down and nobody can log in.</li>
  <li><strong>Service-specific credentials</strong> such as CodeCommit HTTPS credentials or Amazon Keyspaces credentials, which are attached to a user by design.</li>
</ul>
<p style="line-height: 1.75;">Even then, modern AWS offers escapes. <strong>IAM Roles Anywhere</strong> lets an on-premises server present an X.509 certificate from your private CA and receive role credentials — a user with static keys is no longer required for data-centre workloads. When you must keep a user, at minimum: scope its policy to the single job it does, add a condition restricting the source IP or VPC, monitor <code>get-access-key-last-used</code>, and put rotation on a schedule.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The mistakes that show up in real accounts</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Creating a user per application.</strong> The application runs on EC2 or Lambda, both of which can take roles. The user exists only because someone did not know about instance profiles.</li>
  <li><strong>Treating a role as a group.</strong> A role is not a bundle of users; it is an identity. You cannot "add alice to a role" — you grant alice permission to assume it, in the role's trust policy or in alice's own policy.</li>
  <li><strong>Giving a role the same always-on power a user had.</strong> A role assumed once at login and held for 12 hours with admin rights is barely better than a user. The win comes from short sessions plus narrow, purpose-built roles.</li>
  <li><strong>Forgetting the session token.</strong> Copying only the <code>ASIA</code> key and secret out of an assume-role response and omitting <code>AWS_SESSION_TOKEN</code> produces a confusing <code>InvalidClientTokenId</code>.</li>
  <li><strong>Blaming the permission policy for a trust failure.</strong> If the error is on <code>sts:AssumeRole</code> itself, no permission policy will fix it. Read which API the error names.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">How to think about it in one line</h4>
<p style="line-height: 1.75;">A user answers <em>"who is this, permanently?"</em> A role answers <em>"what hat is this principal wearing, right now, for the next few minutes?"</em> Permanent identity is a liability you must guard forever; temporary identity is a liability that expires on its own. That is why AWS's own guidance has shifted from "create IAM users" to "create as few as you can, and use roles for everything else".</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">How your code finds credentials: the default chain</h4>
<p style="line-height: 1.75;">A lot of confusion between users and roles disappears once you know the order in which an SDK looks for credentials. Every AWS SDK and the CLI walk essentially the same chain, stopping at the first source that yields something:</p>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Explicit code</strong> — credentials passed directly to the client constructor. Almost always a smell outside tests.</li>
  <li><strong>Environment variables</strong> — <code>AWS_ACCESS_KEY_ID</code>, <code>AWS_SECRET_ACCESS_KEY</code>, and optionally <code>AWS_SESSION_TOKEN</code>.</li>
  <li><strong>The shared credentials file</strong> — <code>~/.aws/credentials</code>, selected by <code>AWS_PROFILE</code>.</li>
  <li><strong>The shared config file</strong> — <code>~/.aws/config</code>, which is where role assumption and SSO are configured.</li>
  <li><strong>Web identity token file</strong> — <code>AWS_WEB_IDENTITY_TOKEN_FILE</code> plus <code>AWS_ROLE_ARN</code>, which is how EKS IRSA works.</li>
  <li><strong>Container credentials</strong> — the endpoint named by <code>AWS_CONTAINER_CREDENTIALS_RELATIVE_URI</code>, used by ECS and Fargate.</li>
  <li><strong>Instance metadata</strong> — the EC2 instance profile, at <code>169.254.169.254</code>.</li>
</ol>
<p style="line-height: 1.75;">Two practical lessons come out of that ordering, and both show up in real incidents. First, <strong>a stale user credential beats a correctly configured role</strong>. If someone left an <code>AWS_ACCESS_KEY_ID</code> in a shell profile or an old <code>~/.aws/credentials</code> on an EC2 box, the SDK will happily use that long-lived user key and never look at the instance profile at all. The symptom is maddening: the role has exactly the right policy, the instance profile is attached, and the app still gets <code>AccessDenied</code> — because it is not using the role. <code>aws sts get-caller-identity</code> run <em>from the application's own environment</em> settles it in one command.</p>
<p style="line-height: 1.75;">Second, the later entries in the chain are all <strong>role-based and self-refreshing</strong>. That is not a coincidence. AWS put the role mechanisms at the bottom of the chain precisely so that a workload with nothing configured lands on the safe option by default. If your deployment requires you to inject credentials as environment variables, you are overriding a mechanism that was designed to make secrets unnecessary.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">IAM Identity Center: what replaced users for humans</h4>
<p style="line-height: 1.75;">When an interviewer asks "how would you onboard fifty engineers?", the modern answer is not "fifty IAM users". It is <strong>IAM Identity Center</strong>, formerly AWS SSO. The structure is worth being able to sketch:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>An identity source</strong> — either Identity Center's own directory, or (more commonly) your corporate IdP synced in via SCIM: Okta, Entra ID, Google Workspace, Ping.</li>
  <li><strong>Permission sets</strong> — reusable definitions of access, each a bundle of AWS-managed policies, customer-managed policy references, an inline policy, and optionally a permissions boundary and session duration. A permission set is a template, not an identity.</li>
  <li><strong>Assignments</strong> — the join between a group, a permission set and an account. When you assign "Engineering + PowerUser + account 4455", Identity Center <em>provisions a role</em> in that account named something like <code>AWSReservedSSO_PowerUser_abc123</code>, with a trust policy pointing at the Identity Center SAML/OIDC provider.</li>
</ul>
<p style="line-height: 1.75;">So under the hood, it is still roles and STS — Identity Center is a management layer that creates and maintains those roles for you across every account in the organisation. The operational wins are concrete: one place to offboard, MFA enforced centrally, no passwords or access keys per account, and <code>aws sso login</code> giving the CLI short-lived credentials that refresh. The access portal also gives people a single page listing every account and role they can reach, which removes the "what is our production account number again?" ritual entirely.</p>
<p style="line-height: 1.75;">A detail worth knowing for interviews: those provisioned roles have a reserved path (<code>/aws-reserved/sso.amazonaws.com/</code>), so you can filter them out of role inventories, and you should not edit them by hand — changes get overwritten on the next provisioning pass. If you need to change what a permission set grants, you edit the permission set and reprovision.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Migrating from users to roles, in the order that actually works</h4>
<p style="line-height: 1.75;">"Delete all your IAM users" is not a plan. This is the sequence that does not cause an outage:</p>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Inventory.</strong> Generate a credential report and list every user, every key, and the last-used timestamp for each. Anything unused for 90 days is a deletion candidate before you do any real work.</li>
  <li><strong>Classify.</strong> Split users into humans, in-AWS workloads, out-of-AWS workloads, and third parties. Each class has a different destination: humans go to Identity Center, in-AWS workloads go to instance profiles and execution roles, out-of-AWS workloads go to OIDC federation or Roles Anywhere, and third parties go to a cross-account role with an ExternalId.</li>
  <li><strong>Find the actual consumers.</strong> This is the step people skip. <code>get-access-key-last-used</code> tells you the service and region a key was last used against, which usually identifies the workload. CloudTrail with a filter on the access key ID gives you the full picture.</li>
  <li><strong>Run both in parallel.</strong> Attach the role, deploy the change, and leave the key active but monitored. Watch last-used go quiet.</li>
  <li><strong>Deactivate, do not delete.</strong> Set the key to <code>Inactive</code>. This is a reversible kill switch; if something breaks, you re-activate in one call instead of reissuing and redeploying.</li>
  <li><strong>Delete after a full business cycle.</strong> Monthly batch jobs are the classic thing that only surfaces four weeks later.</li>
  <li><strong>Close the door.</strong> Add an SCP denying <code>iam:CreateUser</code> and <code>iam:CreateAccessKey</code> outside a break-glass path, so the population cannot grow back.</li>
</ol>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What each looks like in CloudTrail</h4>
<p style="line-height: 1.75;">Audit quality is a real, practical difference between the two, not just a talking point. For a <strong>user</strong>, the <code>userIdentity</code> block is simple: type <code>IAMUser</code>, the user name, the access key ID. That tells you which credential was used but nothing about intent or context, and if two systems share a key you cannot tell them apart.</p>
<p style="line-height: 1.75;">For a <strong>role</strong>, you get considerably more: type <code>AssumedRole</code>, the principal ARN including your session name, and a <code>sessionContext</code> block containing <code>sessionIssuer</code> (which role issued this), <code>attributes.creationDate</code>, <code>attributes.mfaAuthenticated</code>, and — if it was set — <code>sourceIdentity</code>. That means you can answer questions a user-based audit simply cannot: was MFA used, which human was behind the shared automation role, when did this session begin, and did it come through a chain.</p>
<p style="line-height: 1.75;">There is a corresponding detection benefit. GuardDuty's <code>InstanceCredentialExfiltration</code> finding works because role credentials issued to an EC2 instance carry context that makes off-instance use detectable. There is no equivalent signal for a static user key used from a new location — from AWS's perspective, that is just the key being used.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Quotas, cost and scaling notes</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>IAM itself is <strong>free</strong>. There is no per-user or per-role charge, so cost never justifies sharing credentials.</li>
  <li><strong>5,000 users</strong> and <strong>1,000 roles</strong> per account by default; roles are raisable through Service Quotas. Organisations that hit the role limit usually have a role per resource and should look at ABAC instead.</li>
  <li>A user may belong to <strong>10 groups</strong>, and a group may contain many users, but <strong>groups cannot nest</strong> and cannot be a principal in any policy.</li>
  <li><strong>Two access keys per user</strong> — the rotation allowance, not a convenience.</li>
  <li><strong>STS is rate limited</strong> per account and region. Assuming a role on every single request in a hot path will eventually throttle; cache the session and refresh before expiry, which is exactly what the SDK providers already do.</li>
  <li>IAM is <strong>global and eventually consistent</strong>. Create-then-immediately-use automation should retry with backoff rather than treat the first failure as real.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">A decision tree you can say out loud</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>A human needs access?</strong> Identity Center or your IdP, mapped to permission sets. Never an IAM user.</li>
  <li><strong>Code running on AWS compute?</strong> The native role mechanism for that compute: instance profile, execution role, task role, IRSA.</li>
  <li><strong>CI/CD outside AWS?</strong> OIDC federation with a trust policy pinned to the exact repository and branch.</li>
  <li><strong>A server in your own data centre?</strong> IAM Roles Anywhere with your private CA.</li>
  <li><strong>A third-party SaaS?</strong> A cross-account role with a vendor-generated <code>sts:ExternalId</code>.</li>
  <li><strong>Genuinely none of the above?</strong> Then an IAM user — scoped to one job, with conditions on source IP or VPC, monitored for last-used, and on a rotation schedule.</li>
</ul>
<p style="line-height: 1.75;">Being able to run that list quickly is what makes the difference between reciting a definition and sounding like someone who has actually built this. The underlying principle is simple enough to state in one sentence: <strong>a permanent identity is a liability you have to guard forever, while a temporary identity is a liability that cleans itself up.</strong> Every recommendation above is just that sentence applied to a different situation.</p>

<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "A user is a permanent identity with long-lived credentials — a password or access keys that never expire on their own. A role is an identity with no credentials at all; a trusted principal assumes it through STS and gets temporary keys, typically one hour, with a session name that lands in CloudTrail. Practically, I use roles for everything: instance profiles and execution roles for workloads, Identity Center or OIDC federation for humans and CI, and cross-account roles instead of sharing keys. I keep users only where something genuinely cannot federate, and even then I look at IAM Roles Anywhere first."</div>
</div>`,
          examples: [
            `# ---------- A user: permanent, and that is the problem ----------
aws iam create-user --user-name legacy-integration
aws iam create-access-key --user-name legacy-integration
# {
#   "AccessKey": {
#     "AccessKeyId": "AKIAIOSFODNN7EXAMPLE",     <-- AKIA = permanent
#     "SecretAccessKey": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
#     "Status": "Active"                          <-- no expiry field anywhere
#   }
# }

# Is anyone still using it? Answer this BEFORE you disable it.
aws iam get-access-key-last-used --access-key-id AKIAIOSFODNN7EXAMPLE`,

            `# ---------- A role: no credentials exist until someone asks ----------
cat > trust.json <<'EOF'
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "AWS": "arn:aws:iam::111122223333:root" },
    "Action": "sts:AssumeRole",
    "Condition": { "Bool": { "aws:MultiFactorAuthPresent": "true" } }
  }]
}
EOF

aws iam create-role --role-name prod-readonly \\
  --assume-role-policy-document file://trust.json \\
  --max-session-duration 3600

aws iam attach-role-policy --role-name prod-readonly \\
  --policy-arn arn:aws:iam::aws:policy/ReadOnlyAccess

# There is no create-access-key for a role. The API does not exist.`,

            `# ---------- Assuming it: the credentials are minted here ----------
aws sts assume-role \\
  --role-arn arn:aws:iam::444455556666:role/prod-readonly \\
  --role-session-name alice-incident-4417

# {
#   "Credentials": {
#     "AccessKeyId": "ASIAIOSFODNN7EXAMPLE",     <-- ASIA = temporary
#     "SecretAccessKey": "...",
#     "SessionToken": "IQoJb3JpZ2luX2VjE...",    <-- MUST be sent too
#     "Expiration": "2026-09-14T14:30:00Z"       <-- dies on its own
#   },
#   "AssumedRoleUser": {
#     "Arn": "arn:aws:sts::444455556666:assumed-role/prod-readonly/alice-incident-4417"
#   }
# }

export AWS_ACCESS_KEY_ID=ASIAIOSFODNN7EXAMPLE
export AWS_SECRET_ACCESS_KEY=...
export AWS_SESSION_TOKEN=IQoJb3JpZ2luX2VjE...
aws sts get-caller-identity     # now shows assumed-role/prod-readonly/alice-...`,

            `# ---------- The sane way: let the CLI do it via a profile ----------
# ~/.aws/config
# [profile prod]
# role_arn       = arn:aws:iam::444455556666:role/prod-readonly
# source_profile = identity
# mfa_serial     = arn:aws:iam::111122223333:mfa/alice
# duration_seconds = 3600

aws s3 ls --profile prod     # CLI assumes, caches and refreshes automatically`,

            `# ---------- Audit: who still depends on permanent identities? ----------
aws iam generate-credential-report
aws iam get-credential-report --query Content --output text | base64 -d \\
  | cut -d, -f1,9,10,11,14,15 | column -t -s,
# user, access_key_1_active, access_key_1_last_rotated, ... 
# Anything rotated more than 90 days ago is a finding.

# Which roles exist and who trusts them?
aws iam list-roles \\
  --query "Roles[?!starts_with(RoleName, 'AWSServiceRoleFor')].[RoleName,AssumeRolePolicyDocument.Statement[0].Principal]" \\
  --output json`,
          ],
          questions: [
            {
              question: "What is the difference between an IAM user and an IAM role?",
              solution: "<p>A <strong>user</strong> is a permanent identity that owns long-lived credentials — a console password and/or access keys beginning <code>AKIA</code> — which never expire on their own. A <strong>role</strong> is an identity with <strong>no credentials at all</strong>; a principal listed in the role's <strong>trust policy</strong> assumes it through <strong>STS</strong> and receives temporary credentials (access key beginning <code>ASIA</code>, secret, and a session token) that expire between 15 minutes and 12 hours. Roles additionally support per-session narrowing through session policies, session tags for ABAC, and a session name that appears in CloudTrail, so a shared role still yields per-person audit trails. The practical consequence: a leaked user key works forever, a leaked role credential works until it expires.</p>",
            },
            {
              question: "Can you create access keys for a role? Why or why not?",
              solution: "<p>No — the API does not exist, and that is deliberate. A role's entire security value is that there is no standing secret to steal. Credentials are minted per session by STS, so they expire automatically, can be narrowed with a session policy, carry a session name for audit, and can be revoked in bulk with a Deny on <code>aws:TokenIssueTime</code>. Attaching a permanent key would reintroduce every property that makes <code>AKIA</code> keys dangerous: no expiry, no per-session scoping, and a secret that must be stored somewhere.</p>",
            },
            {
              question: "An EC2 instance needs to read an S3 bucket. Your colleague suggests creating an IAM user and putting the keys in the app config. What is your response?",
              solution: "<p>Use an <strong>instance profile</strong> with a role instead. The credentials are delivered through the Instance Metadata Service, rotate automatically, and never touch disk, the AMI, a snapshot, or the repository — so there is nothing to leak and nothing to rotate manually. Then harden it: require <strong>IMDSv2</strong> (session-token required, hop limit 1) so a server-side request forgery bug in the app cannot read the credentials, which is exactly the failure mode behind the Capital One breach. GuardDuty will also alert if instance-role credentials are ever used from outside AWS, a signal you get for free with a role and never get with a static key.</p>",
            },
            {
              question: "How do you revoke access immediately for a user versus for a role?",
              solution: "<p>For a <strong>user</strong>: set the access key to <code>Inactive</code> (reversible, better than deleting while you investigate), delete the console password, and deactivate MFA devices — but note that any copy of the key already taken is only stopped because AWS checks key status on every call. For a <strong>role</strong>: existing sessions do <em>not</em> die when you detach policies instantly in every case, so the standard move is to attach an inline policy denying all actions when <code>aws:TokenIssueTime</code> is earlier than now (the console calls this \"Revoke sessions\"). That kills every credential issued so far while allowing new, legitimate assumptions. You would also fix the trust policy if the assumption path itself was the problem.</p>",
            },
            {
              question: "Your team has 200 engineers needing AWS access across 12 accounts. Users or roles?",
              solution: "<p>Roles, via <strong>IAM Identity Center</strong> (or an external IdP federated into it). Creating 200 users per account means 2,400 identities, 2,400 offboarding steps, and a password and MFA device per account. With Identity Center you define <strong>permission sets</strong> once and assign groups to accounts; each login produces a short-lived role session, MFA is enforced centrally, and offboarding is a single change in the IdP. Engineers run <code>aws sso login</code> and the CLI handles credential refresh. IAM users would remain only as a tiny break-glass path in case the IdP itself is unavailable.</p>",
            },
            {
              question: "A role is assumed by several engineers. How do you tell who did what in CloudTrail?",
              solution: "<p>By the <strong>role session name</strong>. Every <code>sts:AssumeRole</code> call requires a <code>RoleSessionName</code>, and the resulting principal ARN is <code>arn:aws:sts::&lt;account&gt;:assumed-role/&lt;role&gt;/&lt;session-name&gt;</code>, which CloudTrail records on every subsequent call in <code>userIdentity.arn</code>. With federation the IdP sets this automatically to the user's identifier. To make this trustworthy rather than advisory, add a condition on the trust policy such as <code>\"StringLike\": {\"sts:RoleSessionName\": \"${aws:username}\"}</code> so callers cannot invent a misleading name, and audit for sessions named generically like \"session1\".</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html",
            "https://docs.aws.amazon.com/rolesanywhere/latest/userguide/introduction.html",
          ],
        },
        {
          topic: "Roles vs Policies — An Identity Is Not a Permission",
          tags: ["aws", "iam", "roles", "policies", "attachment", "arn", "fundamentals"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  People confuse these two constantly, and the confusion is understandable: both are things you create in IAM, both have ARNs, and in conversation everyone says loose things like "give it the S3 role" when they mean the policy. So fix the mental model once: <strong>a role is a <em>who</em>. A policy is a <em>what</em>.</strong> A role is an identity that can act. A policy is a document describing which actions are permitted. They are different <em>kinds of object</em>, the way a person and a job description are different kinds of thing.
</p>
<p style="line-height: 1.75;">The job-description analogy is worth holding on to, because it gets every follow-up right. A job description ("may approve expenses under £500") does nothing sitting in a drawer. It only matters once you attach it to somebody. The same description can be attached to five people at once. One person can hold several descriptions at the same time, and their real authority is the sum. And a person with no descriptions attached can do nothing at all, even though they exist and are perfectly identifiable. Swap "person" for role and "job description" for policy and you have IAM.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Three things only a role has</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>It can be a principal.</strong> A role can appear as the actor in CloudTrail, in a bucket policy's <code>Principal</code> block, in a KMS key policy. A policy can never be an actor; it has no identity.</li>
  <li><strong>It can be assumed.</strong> Something becomes the role and acts as it. Nothing "becomes" a policy.</li>
  <li><strong>It holds session state.</strong> Expiry, session name, session tags, session policies — all properties of the assumed role session, not of any policy.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Three things only a policy has</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Statements.</strong> <code>Effect</code>, <code>Action</code>, <code>Resource</code>, optionally <code>Condition</code> and <code>Principal</code>. This is the actual rulebook.</li>
  <li><strong>Reusability.</strong> One managed policy can attach to many users, groups and roles at once. Change it in one place, every holder is affected immediately.</li>
  <li><strong>Versions.</strong> A customer-managed policy keeps up to five versions with one marked default, so you can roll back a bad change. Roles have no version history.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">How they connect: attachment</h4>
<p style="line-height: 1.75;">The verb that joins them is <strong>attach</strong>. You attach a policy to an identity. The API names say it plainly: <code>attach-role-policy</code>, <code>attach-user-policy</code>, <code>attach-group-policy</code>. Note the shape of the call — you pass a role <em>name</em> and a policy <em>ARN</em>. Two separate objects, joined by a link. Detach the policy and both objects still exist; only the relationship is gone.</p>
<p style="line-height: 1.75;">A role with zero policies attached is legal, creatable, assumable — and completely powerless. It can do exactly nothing except tell you who it is. This is a genuinely useful debugging fact: if a workload authenticates fine but every call returns <code>AccessDenied</code>, the very first thing to check is whether anything is actually attached.</p>
<p style="line-height: 1.75;">The relationship is many-to-many. One role can have up to 10 managed policies attached plus any number of inline policies (bounded by a total size limit). One managed policy can be attached to many roles. So you cannot answer "what can this role do?" by reading one document — you read every attached document together, and then subtract anything denied.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The role's two policy slots</h4>
<p style="line-height: 1.75;">Here is where the confusion usually bites. A role is connected to policies in <strong>two completely different ways</strong>, and they answer different questions.</p>
<div style="overflow-x: auto; margin-top: 0.75rem;">
<table style="width: 100%; border-collapse: collapse; font-size: 0.92rem;">
  <thead>
    <tr style="background: #f1f5f9; text-align: left;">
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;"></th>
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;">Trust policy</th>
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;">Permission policies</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Answers</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Who may become this role?</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">What may this role do?</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">How many</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Exactly one, mandatory</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Zero or many</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Lives</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Inside the role object itself</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Attached from outside, or inline</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Reusable?</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">No — it belongs to this role</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Yes, if managed</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Has <code>Principal</code>?</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Yes, always</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">No — the identity is implied</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Failure looks like</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">AccessDenied on <code>sts:AssumeRole</code></td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">AccessDenied on <code>s3:GetObject</code>, etc.</td></tr>
  </tbody>
</table>
</div>
<p style="line-height: 1.75;">So when someone says "the role has a policy", ask <em>which slot</em>. Half of all broken-role tickets are somebody editing the permission policy when the trust policy is what is wrong, or vice versa.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Reading the ARNs tells you which is which</h4>
<p style="line-height: 1.75;">You can always distinguish them by their ARN shape, which is worth memorising because it appears in every error message and every Terraform plan:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><code>arn:aws:iam::123456789012:role/deploy</code> — the segment says <strong>role</strong>. An identity in your account.</li>
  <li><code>arn:aws:iam::123456789012:policy/S3ReadOnly</code> — the segment says <strong>policy</strong>. A customer-managed document in your account.</li>
  <li><code>arn:aws:iam::aws:policy/ReadOnlyAccess</code> — the account field is literally <code>aws</code>. That is an <strong>AWS-managed</strong> policy, owned by AWS, visible in every account.</li>
  <li><code>arn:aws:sts::123456789012:assumed-role/deploy/build-4417</code> — note <strong>sts</strong>, not iam. This is not an object you created; it is a <em>session</em>, the thing that exists after the role was assumed. Seeing this in CloudTrail or in an error tells you the role assumption succeeded and the problem is downstream.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">"Can I attach a role to a role?" and other symptom questions</h4>
<p style="line-height: 1.75;">A batch of confused questions all come from the same root error. Here they are with their corrections:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>"Attach a role to a user."</strong> You cannot. You grant the user permission to <em>assume</em> the role — an <code>sts:AssumeRole</code> Allow in the user's policy, plus the user named in the role's trust policy.</li>
  <li><strong>"Attach a role to a Lambda."</strong> Loose language for something real: Lambda's configuration names the role it will assume, and the role's trust policy names <code>lambda.amazonaws.com</code>. Nothing is "attached" in the policy sense.</li>
  <li><strong>"Nest a role inside a role."</strong> No nesting exists. What does exist is <strong>role chaining</strong>: role A assumes role B. Legal, common across accounts, but the resulting session is capped at one hour regardless of the role's max session duration, which surprises people whose long-running jobs die at the 60-minute mark.</li>
  <li><strong>"Give the policy an MFA requirement so only MFA users get it."</strong> Half right — you express that as a <code>Condition</code> inside the policy, or in the trust policy if you want to gate the assumption itself. Policies do not have properties outside their statements.</li>
  <li><strong>"Delete the policy to remove access."</strong> You cannot delete a managed policy while it is still attached anywhere; AWS forces you to detach first, which is a safety feature, not an obstruction.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Why the separation is good design</h4>
<p style="line-height: 1.75;">It would have been possible for AWS to bake permissions directly into each identity. The separation buys three things:</p>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Write once, apply everywhere.</strong> A single <code>ReadOnlyProduction</code> policy attached to forty roles is one thing to review and one thing to fix.</li>
  <li><strong>Review as code.</strong> Policies are JSON. They diff cleanly in pull requests, they can be linted (<code>parliament</code>, <code>cfn-policy-validator</code>, IAM Access Analyzer policy validation), and they belong in version control.</li>
  <li><strong>Layering.</strong> Because permission is a document rather than a property, AWS can stack several documents in the same evaluation: identity policies, resource policies, permissions boundaries, session policies, SCPs. That layering is only expressible because policies are independent objects.</li>
</ol>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">A worked mental exercise</h4>
<p style="line-height: 1.75;">A deployment pipeline needs to write to one S3 bucket and invoke one Lambda. Sketch it as objects:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>One role</strong>, <code>ci-deploy</code> — the identity the pipeline becomes.</li>
  <li><strong>Its trust policy</strong> — names the GitHub OIDC provider and restricts the repository and branch with a condition. This is the "who".</li>
  <li><strong>One customer-managed policy</strong>, <code>ci-deploy-permissions</code> — allows <code>s3:PutObject</code> on one bucket ARN and <code>lambda:UpdateFunctionCode</code> on one function ARN. This is the "what".</li>
  <li><strong>One attachment</strong> joining them.</li>
</ul>
<p style="line-height: 1.75;">Now every change request has an obvious home. "Let the staging repo deploy too" edits the trust policy. "Also needs CloudFront invalidation" edits the permission policy. "Rotate the whole thing" replaces the role. If you cannot say which document a request touches, you do not yet understand the request.</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The full cast of objects, so nothing is ambiguous</h4>
<p style="line-height: 1.75;">Part of the reason roles and policies get muddled is that IAM has a handful of nearby objects that people name loosely in conversation. Here is the complete cast, each with the one sentence that pins it down:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>User</strong> — an identity with long-term credentials. Can act. Can be a principal.</li>
  <li><strong>Group</strong> — a container of users, purely for attaching policies once. <em>Not</em> an identity: it cannot act, cannot hold credentials, and cannot appear as a <code>Principal</code> anywhere.</li>
  <li><strong>Role</strong> — an identity with no credentials, assumed via STS. Can act. Can be a principal.</li>
  <li><strong>Policy</strong> — a JSON document of permissions. Cannot act. Is never a principal.</li>
  <li><strong>Instance profile</strong> — a container holding exactly one role, so EC2 can use it. Not an identity in its own right.</li>
  <li><strong>Session</strong> — the transient thing that exists after a role is assumed, with an ARN under <code>sts</code> rather than <code>iam</code>.</li>
  <li><strong>Identity provider</strong> — a configured trust relationship with an external OIDC or SAML issuer, so external identities can be federated into roles.</li>
</ul>
<p style="line-height: 1.75;">Notice the pattern: three of these are containers (group, instance profile, identity provider), two are identities (user, role), one is a document (policy), and one is transient state (session). Almost every confusing IAM sentence you will read resolves once you decide which of those seven things the speaker meant.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What is actually inside a policy document</h4>
<p style="line-height: 1.75;">Since the policy is the "what", it is worth being able to recite its anatomy without hesitating:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong><code>Version</code></strong> — always <code>"2012-10-17"</code>. This is a policy language version, not a document version, and omitting it silently drops support for policy variables. Always include it.</li>
  <li><strong><code>Statement</code></strong> — an array of one or more statements. Order is irrelevant.</li>
  <li><strong><code>Sid</code></strong> — an optional label. Useful in logs and reviews, meaningless to evaluation.</li>
  <li><strong><code>Effect</code></strong> — <code>Allow</code> or <code>Deny</code>. Exactly one per statement.</li>
  <li><strong><code>Action</code></strong> — service-prefixed operations such as <code>s3:GetObject</code>, or <code>NotAction</code> for the inverse. Wildcards are permitted within an action name.</li>
  <li><strong><code>Resource</code></strong> — ARNs the statement applies to, or <code>NotResource</code>. Required in identity policies; optional in some resource policies where the resource is implied.</li>
  <li><strong><code>Principal</code></strong> — only in resource-based policies and trust policies. Its presence is the single reliable way to tell the two families apart.</li>
  <li><strong><code>Condition</code></strong> — optional tests on request context: keys such as <code>aws:RequestedRegion</code>, <code>aws:SourceIp</code>, <code>aws:PrincipalTag/Team</code>, <code>aws:SecureTransport</code>, evaluated with operators such as <code>StringEquals</code>, <code>ArnLike</code>, <code>Bool</code>, <code>DateLessThan</code>, and their <code>IfExists</code> variants.</li>
</ul>
<p style="line-height: 1.75;">Policy <strong>variables</strong> deserve a mention because they are the bridge between the "what" and the "who". A resource ARN can contain <code>aws:username</code> or <code>aws:PrincipalTag/Team</code>, so one document can grant every user access to their own prefix — a single policy that behaves differently per identity. That is the beginning of attribute-based access control, and it is only possible because the policy is a separate, reusable object rather than something baked into each identity.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Naming, paths and tags — the conventions that keep this manageable</h4>
<p style="line-height: 1.75;">At ten roles, none of this matters. At three hundred, it is the difference between an account you can audit and one you cannot.</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Paths.</strong> Both roles and policies support a path, for example <code>/dev/</code> or <code>/platform/service/</code>. Paths are not cosmetic: you can write a policy whose <code>Resource</code> is <code>arn:aws:iam::123456789012:role/dev/*</code>, which is exactly how you delegate role management to a team without letting them touch platform roles. Decide on paths early, because changing a role's path means recreating it.</li>
  <li><strong>Names.</strong> A predictable scheme — <code>&lt;system&gt;-&lt;component&gt;-&lt;purpose&gt;</code>, for example <code>orders-api-task-role</code> — lets you answer "what is this for?" from the ARN in a CloudTrail event, without opening the console.</li>
  <li><strong>Tags.</strong> Roles and customer-managed policies can be tagged. Tag with owner, cost centre, ticket and environment; tags on <em>principals</em> also become <code>aws:PrincipalTag</code> condition keys, which makes them functional rather than just documentation.</li>
  <li><strong>Descriptions.</strong> A customer-managed policy has a description field. Use it to record <em>why</em> the permission exists, because the "what" is already in the JSON and the "why" is what nobody can reconstruct two years later.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">How this looks in infrastructure as code</h4>
<p style="line-height: 1.75;">The separation is even more obvious in Terraform or CloudFormation, where the two are unmistakably different resource types, joined by a third resource representing the attachment. In Terraform you write an <code>aws_iam_role</code> (with <code>assume_role_policy</code> for the trust document), an <code>aws_iam_policy</code>, and an <code>aws_iam_role_policy_attachment</code> joining them by ARN. In CloudFormation you write <code>AWS::IAM::Role</code> with an <code>AssumeRolePolicyDocument</code> property and either a list of <code>ManagedPolicyArns</code> or an embedded <code>Policies</code> list, which produces inline policies.</p>
<p style="line-height: 1.75;">Two practical notes fall out of this. First, the <code>aws_iam_policy_document</code> data source (or the equivalent in CDK) is worth using instead of hand-written JSON strings, because it validates structure at plan time and makes conditions far more readable. Second, be deliberate about inline versus attached in IaC: CloudFormation's embedded <code>Policies</code> and Terraform's <code>aws_iam_role_policy</code> both produce <strong>inline</strong> policies, which are fine when the IaC is the source of truth but invisible to <code>list-entities-for-policy</code>. If you want to answer "who holds this permission?" from the API rather than by grepping your repository, prefer managed policies with explicit attachments.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The lifecycle of a permission change</h4>
<p style="line-height: 1.75;">Thinking of the two objects separately gives you a clean mental workflow for any request that lands on your desk:</p>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Is this about who, or about what?</strong> "The staging pipeline should also be able to deploy" is a <em>who</em> question and touches a trust policy. "The pipeline also needs to invalidate CloudFront" is a <em>what</em> question and touches a permission policy.</li>
  <li><strong>If it is a what, does an existing policy already express it?</strong> Reuse beats duplication, and <code>list-entities-for-policy</code> tells you the blast radius of editing the shared one.</li>
  <li><strong>If you edit a shared policy, who else is affected?</strong> This is the question inline policies cannot answer, and the reason a shared managed policy should get a real review rather than a quick console edit.</li>
  <li><strong>Ship it as a new version, not an overwrite.</strong> <code>create-policy-version --set-as-default</code> keeps the previous version for one-call rollback.</li>
  <li><strong>Verify against the identity, not the document.</strong> <code>simulate-principal-policy</code> evaluates the union of everything attached plus boundaries and SCPs, which is the thing you actually care about.</li>
</ol>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Why "effective permissions" needs a tool</h4>
<p style="line-height: 1.75;">Because the relationship is many-to-many and layered, <strong>no single document tells you what an identity can do</strong>. The real answer is the union of every attached managed and inline policy, intersected with any permissions boundary, intersected with any applicable SCP, minus every explicit Deny from any of those plus any relevant resource policy. Nobody computes that reliably by reading JSON.</p>
<p style="line-height: 1.75;">That is why the correct answer to "how do you know what this role can do?" is a tool rather than a claim: <code>simulate-principal-policy</code> for specific actions, IAM Access Analyzer for unused permissions and external exposure, service-last-accessed data for what has actually been used, and graph tools like PMapper for escalation paths. Saying that in an interview signals that you understand the separation is not just tidy design — it has a real cost in comprehensibility, and mature teams pay it back with tooling.</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Quotas and the limits that shape your design</h4>
<p style="line-height: 1.75;">The numbers are worth carrying because they quietly determine architecture. A role may have <strong>10 attached managed policies</strong> (raisable to 20 through Service Quotas), plus inline policies bounded by a <strong>10,240-character</strong> aggregate. An account holds <strong>1,000 roles</strong> by default and <strong>1,500 customer-managed policies</strong>. A managed policy document may be <strong>6,144 characters</strong>. Role names are limited to 64 characters and policy names to 128.</p>
<p style="line-height: 1.75;">When a team hits the ten-policy limit, the instinct is to request an increase. Usually the better reading is that the policies are fragmented — five documents that each grant one action to one service typically want to be one document describing one job. When a team hits the thousand-role limit, the usual cause is a role per resource or per tenant, and the answer is attribute-based access control rather than a quota increase: one role plus session tags replaces hundreds of near-identical roles, and takes the policy count down with it.</p>
<p style="line-height: 1.75;">One more limit with design consequences: a role's <strong>trust policy</strong> is also a policy document with a size cap, which is why enumerating fifty account ARNs as principals eventually fails. The replacement is a condition on <code>aws:PrincipalOrgID</code> — one line that covers every account in the organisation, present and future.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Deleting things in the right order</h4>
<p style="line-height: 1.75;">Because roles and policies are separate objects joined by links, deletion has an order, and getting it wrong produces errors that look like permission problems but are not. To delete a <strong>policy</strong>, you must first detach it from every user, group and role — <code>list-entities-for-policy</code> tells you who they are — and delete all non-default versions. To delete a <strong>role</strong>, you must first detach every managed policy, delete every inline policy, remove it from any instance profile, and delete any role-specific configuration such as a tagged session policy.</p>
<p style="line-height: 1.75;">The <code>DeleteConflict</code> error you get from skipping a step is a safety feature: AWS is refusing to leave dangling references or silently revoke access from identities you have forgotten about. Treat it as a prompt to check <em>who else was depending on this</em> before you continue, because that question is exactly the one that a hasty cleanup skips.</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">One last check on your own understanding</h4>
<p style="line-height: 1.75;">A quick self-test that catches residual confusion. For each phrase, name the object: "give the Lambda the S3 role" (a permission policy, attached to the function's execution role); "add Alice to the admin role" (a trust-policy grant plus an <code>sts:AssumeRole</code> permission, not a membership); "this policy can't log in" (correct — policies are documents); "the role has two policies" (ambiguous: one trust policy plus one permission policy, or two permission policies?); "detach the role" (almost certainly means detach a policy from a role, or disassociate an instance profile). If you can rewrite each of those into precise language without hesitating, the distinction has landed.</p>

<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "A role is an identity — something that can act, be a principal, and be assumed. A policy is a JSON document of permissions that does nothing until it is attached to an identity. A role with no policies attached is valid and completely powerless. One policy can attach to many identities and one identity can hold many policies, so a role's effective permissions are the union of everything attached, minus any explicit deny. And a role connects to policies in two distinct ways: its single trust policy says who may assume it, and its attached permission policies say what it can do once assumed."</div>
</div>`,
          examples: [
            `# ---------- Two separate objects, then a link between them ----------
# 1. The identity (the "who")
aws iam create-role --role-name ci-deploy \\
  --assume-role-policy-document file://trust.json

# 2. The document (the "what") — note it names no identity at all
cat > perms.json <<'EOF'
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublishBuildArtifacts",
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:PutObjectAcl"],
      "Resource": "arn:aws:s3:::acme-artifacts/builds/*"
    },
    {
      "Sid": "ShipTheFunction",
      "Effect": "Allow",
      "Action": "lambda:UpdateFunctionCode",
      "Resource": "arn:aws:lambda:eu-west-1:123456789012:function:orders-api"
    }
  ]
}
EOF
aws iam create-policy --policy-name ci-deploy-permissions \\
  --policy-document file://perms.json

# 3. The attachment — a role NAME plus a policy ARN. Two objects, one link.
aws iam attach-role-policy --role-name ci-deploy \\
  --policy-arn arn:aws:iam::123456789012:policy/ci-deploy-permissions`,

            `# ---------- Prove the role exists but is powerless without attachment ----------
aws iam create-role --role-name empty-role \\
  --assume-role-policy-document file://trust.json

aws iam list-attached-role-policies --role-name empty-role
# { "AttachedPolicies": [] }        <-- valid role, zero authority
aws iam list-role-policies --role-name empty-role
# { "PolicyNames": [] }             <-- no inline policies either

# Assume it and try anything: AccessDenied on every call.
# The identity is fine. There is simply no document saying yes.`,

            `# ---------- What is actually attached to this role? Both kinds. ----------
ROLE=ci-deploy

echo "--- managed (shared documents, by ARN) ---"
aws iam list-attached-role-policies --role-name $ROLE \\
  --query 'AttachedPolicies[].[PolicyName,PolicyArn]' --output table

echo "--- inline (embedded, unshareable) ---"
aws iam list-role-policies --role-name $ROLE --output text

echo "--- the OTHER slot: who may assume it ---"
aws iam get-role --role-name $ROLE \\
  --query 'Role.AssumeRolePolicyDocument' --output json`,

            `# ---------- One policy, many identities: the reuse the split buys you ----------
POLICY=arn:aws:iam::123456789012:policy/ReadOnlyProduction

aws iam attach-role-policy  --role-name  oncall     --policy-arn $POLICY
aws iam attach-role-policy  --role-name  auditor    --policy-arn $POLICY
aws iam attach-group-policy --group-name analysts   --policy-arn $POLICY

# Who holds it? One call, complete answer — impossible if permissions
# were baked into each identity.
aws iam list-entities-for-policy --policy-arn $POLICY

# You cannot delete it while attached. AWS makes you detach first.
aws iam delete-policy --policy-arn $POLICY
# An error occurred (DeleteConflict): Cannot delete a policy attached to entities.`,

            `# ---------- Reading ARNs: which object am I looking at? ----------
# arn:aws:iam::123456789012:role/deploy                 -> identity (role)
# arn:aws:iam::123456789012:policy/S3ReadOnly           -> customer-managed policy
# arn:aws:iam::aws:policy/ReadOnlyAccess                -> AWS-managed ("aws" account)
# arn:aws:iam::123456789012:instance-profile/web-server -> the EC2 wrapper
# arn:aws:sts::123456789012:assumed-role/deploy/build-4417
#        ^^^ sts, not iam = a SESSION. Assumption already succeeded;
#            whatever is failing now is a permission-policy problem.

aws sts get-caller-identity --query Arn --output text`,
          ],
          questions: [
            {
              question: "What is the difference between a role and a policy?",
              solution: "<p>A <strong>role is an identity</strong> — something that can act, appear as a principal, and be assumed via STS. A <strong>policy is a JSON document</strong> listing permitted or denied actions. A policy is inert until <em>attached</em> to an identity, and a role with nothing attached is a perfectly valid identity with zero authority. The relationship is many-to-many: one policy can serve many roles, users and groups, and one role can carry up to 10 managed policies plus inline ones. So a role's effective permissions are the union of every attached document, minus any explicit Deny.</p>",
            },
            {
              question: "Can you attach a role to a user?",
              solution: "<p>No — that is a category error, like attaching one person to another. What you actually do is grant the user permission to <strong>assume</strong> the role, which takes two edits on two different objects: an Allow on <code>sts:AssumeRole</code> for the role's ARN in the user's identity policy, and the user (or their account) named as a <code>Principal</code> in the role's <strong>trust policy</strong>. Both sides must agree. Missing the first gives AccessDenied naming the user; missing the second gives AccessDenied naming the role.</p>",
            },
            {
              question: "A role is assumed successfully but every API call returns AccessDenied. Where do you look?",
              solution: "<p>At the <strong>permission policies</strong>, not the trust policy — the successful assumption already proves the trust policy is fine. Check in order: (1) is anything attached at all (<code>list-attached-role-policies</code> and <code>list-role-policies</code>)? (2) does the Action match exactly, including the service prefix and any separate list/read actions? (3) does the Resource ARN match — a bucket ARN and an object ARN are different strings and you usually need both. (4) Is a <strong>permissions boundary</strong>, SCP, or session policy capping it? The denial message names the principal as <code>arn:aws:sts::...:assumed-role/...</code>, which itself confirms you are past the assumption stage.</p>",
            },
            {
              question: "Why does IAM separate identities from policies at all — why not just put permissions on the identity?",
              solution: "<p>Three reasons. <strong>Reuse</strong>: one managed policy attached to forty roles is one thing to review and one thing to change. <strong>Reviewability</strong>: policies are standalone JSON, so they diff in pull requests, can be linted by tools like IAM Access Analyzer policy validation or <code>parliament</code>, and live in version control with up to five retained versions for rollback. <strong>Layering</strong>: because permission is a document rather than a property, AWS can evaluate several documents together — identity policies, resource policies, permissions boundaries, session policies and SCPs — which is what makes guardrails and delegation expressible at all.</p>",
            },
            {
              question: "What is role chaining, and what is the gotcha?",
              solution: "<p><strong>Role chaining</strong> is assuming role B from credentials that are already an assumed-role session of role A — common when a central identity account hops into a workload account, or when a pipeline escalates from a build role to a deploy role. The gotcha is that a chained session is <strong>hard-capped at one hour</strong>, regardless of the target role's <code>MaxSessionDuration</code>, and the <code>DurationSeconds</code> parameter is rejected above 3600. Long-running jobs that worked from a direct assumption suddenly die at the 60-minute mark. Fix by refreshing credentials in the job, or by assuming the final role directly rather than chaining.</p>",
            },
            {
              question: "You need to remove a permission from thirty roles at once. How?",
              solution: "<p>If they share a <strong>customer-managed policy</strong>, edit that policy once — create a new version with <code>create-policy-version --set-as-default</code>, and every attached identity is affected immediately, with the previous version retained for rollback. If the permission is instead duplicated in thirty <strong>inline</strong> policies, you must edit thirty documents, which is precisely why inline policies do not scale. For an emergency stop that does not depend on finding every grant, attach a single managed policy containing an explicit <code>Deny</code> for that action to all thirty roles — explicit Deny beats every Allow, so it takes effect regardless of what else is attached.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_terms-and-concepts.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_identifiers.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_manage-assume.html",
          ],
        },
        {
          topic: "Managed vs Inline Policies — AWS-Managed, Customer-Managed, and Embedded",
          tags: ["aws", "iam", "managed policy", "inline policy", "versioning", "quotas", "governance"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Every permission policy in AWS is stored in one of three ways, and the storage choice has nothing to do with what the policy says — the same JSON can live in any of them. What changes is <strong>who owns it, whether it can be shared, whether it can be versioned, and what happens when you delete the identity</strong>. Interviewers ask this because the right answer shows you have actually maintained an AWS account rather than just read about one.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The three kinds, in one breath</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>AWS-managed policy</strong> — written and maintained by AWS, available in every account, you cannot edit it. ARN: <code>arn:aws:iam::aws:policy/...</code> (note the literal <code>aws</code> where the account number would be).</li>
  <li><strong>Customer-managed policy</strong> — you write it, it lives in your account, it is reusable and versioned. ARN: <code>arn:aws:iam::123456789012:policy/...</code></li>
  <li><strong>Inline policy</strong> — JSON embedded directly inside one user, group, or role. It has no ARN of its own, cannot be shared, and is deleted when its identity is deleted.</li>
</ul>

<div style="overflow-x: auto; margin-top: 0.75rem;">
<table style="width: 100%; border-collapse: collapse; font-size: 0.92rem;">
  <thead>
    <tr style="background: #f1f5f9; text-align: left;">
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;"></th>
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;">AWS-managed</th>
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;">Customer-managed</th>
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;">Inline</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Who writes it</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">AWS</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">You</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">You</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Editable</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">No</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Yes</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Yes</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Reusable across identities</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Yes</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Yes</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;"><strong>No — 1:1 only</strong></td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Versioned / rollback</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">By AWS</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Yes, 5 versions</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">No history at all</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Has its own ARN</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Yes</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Yes</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">No</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Size limit</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">6,144 chars</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">6,144 chars</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">2,048 (user) / 10,240 (role) / 5,120 (group) aggregate</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Attach limit per identity</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;" colspan="2">10 managed policies combined (raisable to 20)</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">No count limit, size-bounded</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Deleted with the identity</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">No</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">No</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;"><strong>Yes</strong></td></tr>
  </tbody>
</table>
</div>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">AWS-managed policies: convenient, and usually too wide</h4>
<p style="line-height: 1.75;">These are the ones with familiar names: <code>AdministratorAccess</code>, <code>ReadOnlyAccess</code>, <code>PowerUserAccess</code>, <code>AmazonS3FullAccess</code>, <code>AWSLambdaBasicExecutionRole</code>. They are genuinely useful for two things: getting started quickly, and covering AWS's own service plumbing where the exact action list changes over time.</p>
<p style="line-height: 1.75;">The criticism is that they are written for <em>everybody</em>, so they are necessarily generous. <code>AmazonS3FullAccess</code> grants <code>s3:*</code> on <code>*</code> — every bucket in the account, including ones created next year, including <code>s3:DeleteBucket</code>. Your service almost certainly needs <code>GetObject</code> and <code>PutObject</code> on one prefix of one bucket. Handing it <code>AmazonS3FullAccess</code> is a 99% over-grant, and if that workload is ever compromised, the blast radius is the whole account's object storage.</p>
<p style="line-height: 1.75;">There is a second, less obvious risk: <strong>AWS can change them under you</strong>. When a service ships a new feature, AWS sometimes updates the corresponding managed policy, and the new permission lands in your account automatically on every identity holding it. Usually harmless, occasionally not — and it means your permission surface is not fully described by your own infrastructure code. This is exactly the property auditors dislike.</p>
<p style="line-height: 1.75;">A few AWS-managed policies deserve to be treated as alarms whenever they appear on a workload role: <code>AdministratorAccess</code>, <code>PowerUserAccess</code>, <code>IAMFullAccess</code>, and anything ending <code>FullAccess</code> on a data service. Also watch for <strong>privilege-escalation-capable</strong> grants hidden inside otherwise modest policies — <code>iam:PassRole</code> with a wildcard resource, <code>iam:CreatePolicyVersion</code>, <code>iam:AttachRolePolicy</code>, <code>lambda:CreateFunction</code> plus <code>iam:PassRole</code>. Any of those effectively means "can become admin later".</p>
<p style="line-height: 1.75;">There is also a special family worth naming: policies under <code>arn:aws:iam::aws:policy/service-role/...</code> and <code>arn:aws:iam::aws:policy/aws-service-role/...</code>. The first are intended to be attached to service roles you create (for example <code>AWSLambdaBasicExecutionRole</code>, which grants CloudWatch Logs write access). The second are attached to <strong>service-linked roles</strong> and are not attachable by you at all.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Customer-managed policies: the default you should reach for</h4>
<p style="line-height: 1.75;">These are the workhorse. You write exactly the actions needed, on exactly the resources needed, with conditions if appropriate. They give you four properties that matter operationally:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Versioning.</strong> Up to five versions are retained, one marked default. <code>create-policy-version --set-as-default</code> is an atomic change across every attached identity, and <code>set-default-policy-version</code> rolls it straight back if you broke something. That is a real safety net during a change window.</li>
  <li><strong>One place to change.</strong> Thirty roles sharing one policy means one edit, not thirty.</li>
  <li><strong>Discoverability.</strong> <code>list-entities-for-policy</code> answers "who holds this permission?" in a single call. There is no equivalent for inline policies short of walking every identity.</li>
  <li><strong>Tagging and description.</strong> You can tag policies for ownership and cost/compliance attribution, and set a description explaining <em>why</em> it exists — which future-you will want.</li>
</ul>
<p style="line-height: 1.75;">The one real constraint is the <strong>6,144 character limit</strong> (whitespace excluded from the count in practice, but do not rely on that). Large policies hit it. The standard escapes are: split into several policies attached to the same role; use wildcards more intelligently (<code>s3:Get*</code> rather than eleven separate Get actions); or replace resource enumeration with <strong>conditions on tags</strong>, which turns a list of 200 ARNs into one condition block. That last one is the real answer at scale and is called attribute-based access control.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Inline policies: when 1:1 is the point</h4>
<p style="line-height: 1.75;">An inline policy is embedded in the identity. It has no ARN, cannot be attached anywhere else, and is destroyed with its identity. That last property is the reason inline policies still exist: there is a <strong>strict one-to-one relationship</strong> you can rely on. Delete the role, and its permissions go with it — no orphaned policy left behind granting something to nothing.</p>
<p style="line-height: 1.75;">Legitimate uses:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>One-off permissions</strong> genuinely unique to a single role, where a shared document would be misleading.</li>
  <li><strong>A permission you never want accidentally reused elsewhere</strong> — for example a role that may pass one specific, highly privileged role.</li>
  <li><strong>Emergency deny.</strong> When you need to stop something right now, an inline Deny on the affected role is one call, and is guaranteed not to affect anyone else.</li>
  <li><strong>Terraform and CloudFormation</strong> often generate inline policies for tightly coupled resources, which is fine because the IaC is the source of truth.</li>
</ul>
<p style="line-height: 1.75;">The downsides are real, though. Inline policies are <strong>invisible to bulk auditing</strong> — you cannot ask "who can delete DynamoDB tables?" and get a complete answer without enumerating every user, group and role and reading each embedded document. They have <strong>no version history</strong>, so a bad edit has no rollback. They are subject to <strong>much smaller size limits</strong>, aggregated across all inline policies on that identity. And they drift: the same near-identical JSON gets copied into twelve roles and then diverges.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Does the type change how permissions are evaluated?</h4>
<p style="line-height: 1.75;"><strong>No — and this is a favourite trick question.</strong> Managed and inline policies are both identity-based policies and are evaluated identically. There is no precedence between them. An Allow in an inline policy does not beat a Deny in a managed one, or vice versa; the normal rule applies, which is that any explicit Deny anywhere wins, otherwise any Allow suffices, otherwise the request is denied by default. The storage type is a <em>management</em> decision, not a <em>security semantics</em> decision.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">A practical policy for choosing</h4>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Default to customer-managed.</strong> Versioned, reusable, auditable, in version control.</li>
  <li><strong>Use AWS-managed</strong> for AWS's own service plumbing (Lambda basic execution, SSM managed instance core, service-role policies) where AWS keeping the action list current is a feature, and for short-lived sandbox work.</li>
  <li><strong>Use inline</strong> for deliberately unshareable, role-specific grants and emergency denies.</li>
  <li><strong>Never</strong> attach <code>AdministratorAccess</code> or a <code>*FullAccess</code> policy to a workload role because it is quicker. Start from CloudTrail-derived least privilege instead — IAM Access Analyzer can generate a policy from the last 90 days of a role's actual activity, which is the fastest honest path to a tight policy.</li>
</ol>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Quotas worth remembering</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>10 managed policies</strong> per user, group or role (raisable to 20 via Service Quotas). Hitting this usually means your policies are too granular, not that you need the raise.</li>
  <li><strong>5 versions</strong> per customer-managed policy. Creating a sixth fails until you delete an old one — a classic surprise in CI pipelines that update a policy on every deploy. Use <code>--set-as-default</code> plus a cleanup step.</li>
  <li><strong>1,500 customer-managed policies</strong> per account.</li>
  <li><strong>6,144 characters</strong> per managed policy; inline limits are smaller and aggregate per identity.</li>
</ul>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Decoding the AWS-managed policy families</h4>
<p style="line-height: 1.75;">AWS-managed policies are not one undifferentiated pile. They fall into recognisable families, and knowing which family a policy belongs to tells you immediately whether it is safe to attach:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Job function policies</strong> — <code>AdministratorAccess</code>, <code>PowerUserAccess</code>, <code>ReadOnlyAccess</code>, <code>DatabaseAdministrator</code>, <code>DataScientist</code>, <code>NetworkAdministrator</code>, <code>SecurityAudit</code>, <code>Billing</code>, <code>SupportUser</code>, <code>SystemAdministrator</code>, <code>ViewOnlyAccess</code>. These are designed for <em>humans</em> in broad roles, not for workloads. <code>PowerUserAccess</code> is a useful one to be able to describe precisely: it grants everything except IAM, Organizations and account management — which sounds restrained until you remember it still includes the ability to create and delete every resource in the account.</li>
  <li><strong>Service full-access policies</strong> — <code>AmazonS3FullAccess</code>, <code>AmazonDynamoDBFullAccess</code>, <code>AmazonEC2FullAccess</code>. Each is essentially <code>service:*</code> on <code>*</code>. Convenient in a sandbox, almost never correct on a workload role.</li>
  <li><strong>Service read-only policies</strong> — <code>AmazonS3ReadOnlyAccess</code> and friends. Safer, but still account-wide: every bucket, including ones that do not exist yet.</li>
  <li><strong>Service-role policies</strong>, under the path <code>service-role/</code> — <code>AWSLambdaBasicExecutionRole</code>, <code>AmazonECSTaskExecutionRolePolicy</code>, <code>AmazonSSMManagedInstanceCore</code>, <code>AWSLambdaVPCAccessExecutionRole</code>. These are genuinely good defaults: narrow, purpose-built for AWS's own plumbing, and maintained as the service evolves. <code>AWSLambdaBasicExecutionRole</code>, for example, grants only CloudWatch Logs group and stream creation plus <code>PutLogEvents</code>.</li>
  <li><strong>Service-linked role policies</strong>, under <code>aws-service-role/</code> — you cannot attach these at all. They belong to service-linked roles and exist only to be listed there.</li>
</ul>
<p style="line-height: 1.75;">A rule of thumb that survives contact with reality: <strong>the <code>service-role/</code> family is usually the right thing to attach; the <code>FullAccess</code> family usually is not; the job-function family belongs on human access paths only.</strong></p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Versioning done properly in a pipeline</h4>
<p style="line-height: 1.75;">The five-version limit on customer-managed policies is the single most common operational surprise in this topic, and it deserves a concrete pattern rather than a warning. A policy update in CI should be four steps, in this order:</p>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Validate first.</strong> Run <code>accessanalyzer validate-policy</code> and, ideally, <code>check-no-new-access</code> comparing the candidate against the current default version. A policy that broadens access should require a human approval, not slip through on a green build.</li>
  <li><strong>Prune.</strong> List versions, and delete the oldest non-default one if there are already five. Deleting a non-default version is safe and non-disruptive; it is only history.</li>
  <li><strong>Create with <code>--set-as-default</code>.</strong> This is atomic across every attached identity — there is no window where half your roles have the old policy.</li>
  <li><strong>Record the previous version ID</strong> in your deployment output, so rollback is a single <code>set-default-policy-version</code> call rather than an archaeology exercise.</li>
</ol>
<p style="line-height: 1.75;">Worth internalising: the rollback path here is genuinely instant and account-wide, which is not true of inline policies at all. If an inline policy edit breaks production at 2am, your only recovery is whatever is in version control — and if the change was made in the console, there may be nothing. That asymmetry is the strongest practical argument for managed policies, stronger than reuse.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Working the size limits</h4>
<p style="line-height: 1.75;">The numbers are worth carrying in your head because they drive design decisions: <strong>6,144 characters</strong> for a managed policy, <strong>2,048</strong> aggregate for all inline policies on a user, <strong>5,120</strong> on a group, <strong>10,240</strong> on a role. Whitespace is not counted, but do not rely on that as headroom.</p>
<p style="line-height: 1.75;">A worked example of why this bites: suppose you have 150 S3 buckets and want a policy granting read on each. Each ARN is roughly 40 characters, plus JSON syntax — you are at 7,000 characters before you have written a single condition. You cannot fit it. The options, in order of quality:</p>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Tag the buckets and match on the tag.</strong> One condition block replaces 150 ARNs, and adding bucket 151 needs no policy change at all. This is the answer that actually scales.</li>
  <li><strong>Use a shared naming prefix</strong> and one wildcard ARN: <code>arn:aws:s3:::acme-analytics-*</code>. Cheap, effective, and it means your naming convention is now load-bearing for security — which is fine as long as everyone knows it.</li>
  <li><strong>Consolidate actions</strong> with sensible wildcards, checking what each sweeps in.</li>
  <li><strong>Split across several managed policies</strong>, remembering the 10-attachment limit (raisable to 20 through Service Quotas). This is the least satisfying option because it fragments the permission story.</li>
</ol>
<p style="line-height: 1.75;">Note what is <em>not</em> on that list: moving the policy inline. Inline limits are smaller, not larger. People try it surprisingly often.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Migrating inline policies to managed</h4>
<p style="line-height: 1.75;">Most accounts of any age have a layer of inline policies that accumulated because it was the quickest thing to do in the console. Converting them is straightforward and worth doing, because it is what makes the account auditable:</p>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Enumerate.</strong> Walk every user, group and role calling <code>list-user-policies</code>, <code>list-group-policies</code>, <code>list-role-policies</code>. There is no shortcut; that is the whole problem with inline.</li>
  <li><strong>Group by content.</strong> You will typically find the same policy duplicated across many identities with small drifts — an extra action here, a different bucket there. Those drifts are the interesting part: they are either a deliberate exception that should be documented, or a mistake.</li>
  <li><strong>Create one customer-managed policy per distinct intent</strong>, not per identity.</li>
  <li><strong>Attach the managed policy first, verify, then remove the inline one.</strong> Both grant simultaneously during the overlap, so there is no gap. Remember the union rule: adding a second Allow never removes access.</li>
  <li><strong>Keep inline deliberately</strong> where the 1:1 lifecycle is genuinely the point — a role-specific <code>PassRole</code> grant, or an emergency Deny.</li>
</ol>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Policy as code, and the review pipeline</h4>
<p style="line-height: 1.75;">The reason managed policies win in mature organisations is that they fit a review process. A permission change becomes a pull request with a readable diff, which means it can be reasoned about by someone who was not in the original conversation. A realistic pipeline has four gates:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Lint</strong> — <code>validate-policy</code> for structural errors, deprecated constructs, and over-broad statements; third-party linters such as <code>parliament</code> add community rules.</li>
  <li><strong>Diff for broadening</strong> — <code>check-no-new-access</code> between the current default version and the candidate. A "FAIL" here is not necessarily wrong; it means a human must look.</li>
  <li><strong>Forbidden-action check</strong> — <code>check-access-not-granted</code> with your organisation's never-list: <code>iam:PassRole</code> with wildcards, <code>iam:CreatePolicyVersion</code>, <code>cloudtrail:StopLogging</code>, <code>kms:ScheduleKeyDeletion</code>.</li>
  <li><strong>Simulation against the real identity</strong> — after deploy, <code>simulate-principal-policy</code> for a handful of actions you expect to be allowed and a handful you expect to be denied. Treating those as tests catches boundary and SCP interactions that no document review would find.</li>
</ul>
<p style="line-height: 1.75;">None of that is possible for a policy typed into a console text box on one role, which is ultimately why "managed by default, inline by exception" is the right stance rather than a matter of taste.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">One more thing that is not a policy type: SCPs and RCPs</h4>
<p style="line-height: 1.75;">People sometimes answer this question with "managed, inline and SCPs", which conflates two different axes. <strong>Service control policies</strong> and <strong>resource control policies</strong> are not a storage format for permissions — they are organisation-level guardrails attached to accounts or organisational units, and they never grant anything. The managed-versus-inline distinction is about <em>how an identity policy is stored</em>; SCPs are about <em>what an account is permitted to grant at all</em>. Keeping those axes separate in your answer is a small thing that reads as precision.</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">How to read an unfamiliar AWS-managed policy in sixty seconds</h4>
<p style="line-height: 1.75;">You will frequently be asked to approve attaching a managed policy whose name sounds fine. A quick, repeatable review:</p>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Fetch the actual document</strong> — <code>get-policy</code> for the default version ID, then <code>get-policy-version</code>. Never judge by the name; <code>AmazonEC2ContainerRegistryPowerUser</code> and <code>AmazonEC2ContainerRegistryFullAccess</code> differ in ways the names do not convey.</li>
  <li><strong>Look at the <code>Resource</code> fields first.</strong> If they are all <code>"*"</code>, the policy is account-wide whatever the actions say.</li>
  <li><strong>Grep for the escalation set</strong> — <code>iam:</code>, <code>sts:AssumeRole</code>, <code>PassRole</code>, <code>Create*Version</code>, <code>Attach*Policy</code>, <code>UpdateFunctionCode</code>, <code>SendCommand</code>. Any hit changes the conversation.</li>
  <li><strong>Check for <code>NotAction</code></strong>, which inverts the meaning and is easy to skim past.</li>
  <li><strong>Check the version history</strong> — <code>list-policy-versions</code> on an AWS-managed policy shows how often AWS has changed it, which tells you how much drift to expect.</li>
</ol>
<p style="line-height: 1.75;">Sixty seconds of this routinely turns "sure, attach <code>ReadOnlyAccess</code>" into a more interesting discussion, because <code>ReadOnlyAccess</code> includes reading the contents of many data stores — which is read-only in the API sense and a data-exfiltration path in the practical sense.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Deprecation and drift</h4>
<p style="line-height: 1.75;">AWS occasionally deprecates a managed policy, replacing it with a narrower successor — the migration away from broad service-role policies towards scoped ones has been going on for years. Deprecated policies keep working for existing attachments but cannot be attached anew, which produces the confusing situation where a new environment fails to deploy with a policy that exists and works in the old one. The fix is to read AWS's replacement guidance rather than to grant something broader to get past it.</p>
<p style="line-height: 1.75;">The same class of problem in reverse is <strong>silent broadening</strong>: a managed policy you attached two years ago may grant more today. If your compliance posture requires that permission grants be fully described by your own infrastructure code, that is a reason to copy the policy's content into a customer-managed policy you control — accepting that you now own keeping it current.</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The one-line rule</h4>
<p style="line-height: 1.75;">If you need a single stance to state and defend: <strong>customer-managed by default, AWS-managed for AWS's own plumbing, inline by exception.</strong> The reason is not aesthetic. Customer-managed policies are the only option that is simultaneously reusable, versioned with a one-call rollback, discoverable through <code>list-entities-for-policy</code>, and reviewable as a diff in a pull request. Every other choice trades one of those away, and the ones you lose with inline policies — rollback and discoverability — are precisely the ones you need at three in the morning.</p>


<p style="line-height: 1.75;">Stated as a decision you can defend in a design review: the storage type should be chosen by asking who else needs this permission, whether you would want to roll a change back, and whether an auditor should be able to discover who holds it — and only an exception to all three argues for inline. Note also that the three types are not a security hierarchy: evaluation treats managed and inline identically, so the choice is purely about operations, lifecycle and reviewability.</p>

<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "There are three storage types. AWS-managed policies are written by AWS, reusable everywhere, but deliberately broad and they can change without you — <code>AmazonS3FullAccess</code> is <code>s3:*</code> on <code>*</code>. Customer-managed policies are mine: reusable, versioned with five retained versions so I can roll back, and <code>list-entities-for-policy</code> tells me exactly who holds them — that's my default. Inline policies are embedded in one identity, have no ARN and no history, and die with the identity, which makes them right for genuinely one-off grants and emergency denies. Importantly the type doesn't affect evaluation at all: managed and inline are both identity-based policies, and explicit deny still wins everywhere."</div>
</div>`,
          examples: [
            `# ---------- The ARN tells you which kind you are looking at ----------
# arn:aws:iam::aws:policy/ReadOnlyAccess                    -> AWS-managed
# arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
#                                                           -> AWS-managed, for service roles
# arn:aws:iam::123456789012:policy/AcmeS3ArtifactsWrite     -> customer-managed
# (inline policies have NO ARN at all)

# See exactly what an AWS-managed policy grants before you trust the name
aws iam get-policy-version \\
  --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess \\
  --version-id v2 --query 'PolicyVersion.Document'
# { "Statement": [{ "Effect": "Allow", "Action": "s3:*", "Resource": "*" }, ...] }
# "*" means every bucket in the account, including ones not created yet.`,

            `# ---------- Customer-managed: create, update safely, roll back ----------
aws iam create-policy --policy-name AcmeS3ArtifactsWrite \\
  --description "CI writes build artifacts to acme-artifacts/builds/ only" \\
  --policy-document file://v1.json \\
  --tags Key=Owner,Value=platform Key=Ticket,Value=PLT-4417

# Update = new version, atomic across every attached identity
aws iam create-policy-version \\
  --policy-arn arn:aws:iam::123456789012:policy/AcmeS3ArtifactsWrite \\
  --policy-document file://v2.json --set-as-default

# Broke production? Roll back in one call.
aws iam set-default-policy-version \\
  --policy-arn arn:aws:iam::123456789012:policy/AcmeS3ArtifactsWrite \\
  --version-id v1

# Only 5 versions are kept. CI that updates every deploy MUST prune.
aws iam list-policy-versions \\
  --policy-arn arn:aws:iam::123456789012:policy/AcmeS3ArtifactsWrite \\
  --query 'Versions[?IsDefaultVersion==\`false\`].VersionId' --output text`,

            `# ---------- Inline: embedded, unshareable, dies with the role ----------
aws iam put-role-policy --role-name ci-deploy \\
  --policy-name PassOnlyTheTaskRole \\
  --policy-document '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Action": "iam:PassRole",
      "Resource": "arn:aws:iam::123456789012:role/orders-task-role",
      "Condition": {"StringEquals": {"iam:PassedToService": "ecs-tasks.amazonaws.com"}}
    }]
  }'

# No ARN exists for it. It is listed by NAME, under the role.
aws iam list-role-policies  --role-name ci-deploy
aws iam get-role-policy     --role-name ci-deploy --policy-name PassOnlyTheTaskRole

# Delete the role and this policy ceases to exist. Nothing is orphaned.`,

            `# ---------- Emergency stop: inline Deny, one identity, right now ----------
aws iam put-role-policy --role-name compromised-role \\
  --policy-name EmergencyContainment \\
  --policy-document '{
    "Version": "2012-10-17",
    "Statement": [{"Effect": "Deny", "Action": "*", "Resource": "*"}]
  }'
# Explicit Deny beats every Allow from every managed policy instantly.

# Also kill credentials already issued to that role:
aws iam put-role-policy --role-name compromised-role \\
  --policy-name RevokeOlderSessions \\
  --policy-document '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Deny", "Action": "*", "Resource": "*",
      "Condition": {"DateLessThan": {"aws:TokenIssueTime": "2026-09-14T12:00:00Z"}}
    }]
  }'`,

            `# ---------- Audit: find the over-privileged and the invisible ----------
echo "### Who holds AdministratorAccess?"
aws iam list-entities-for-policy \\
  --policy-arn arn:aws:iam::aws:policy/AdministratorAccess

echo "### Inline policies hide from bulk audit - enumerate them"
for r in $(aws iam list-roles --query 'Roles[].RoleName' --output text); do
  for p in $(aws iam list-role-policies --role-name $r --output text 2>/dev/null); do
    echo "INLINE  $r  ->  $p"
  done
done

echo "### Let AWS write a least-privilege policy from real CloudTrail usage"
aws accessanalyzer start-policy-generation \\
  --policy-generation-details principalArn=arn:aws:iam::123456789012:role/ci-deploy \\
  --cloud-trail-details file://trail-details.json`,
          ],
          questions: [
            {
              question: "What is the difference between a managed policy and an inline policy?",
              solution: "<p>A <strong>managed policy</strong> is a standalone object with its own ARN that can be attached to many users, groups and roles, and (if customer-managed) keeps up to five versions so changes can be rolled back. An <strong>inline policy</strong> is embedded inside exactly one identity, has no ARN, cannot be shared, has no version history, and is deleted automatically when its identity is deleted. Managed is the default choice because of reuse, rollback, and the fact that <code>list-entities-for-policy</code> can answer \"who holds this permission?\"; inline is for deliberately one-off grants and emergency denies where the strict 1:1 lifecycle is the feature.</p>",
            },
            {
              question: "Does an inline policy override a managed policy?",
              solution: "<p>No. Both are <strong>identity-based policies</strong> and are evaluated identically — there is no precedence between them and no ordering. The normal rules apply: an explicit <code>Deny</code> in either wins over everything, otherwise an <code>Allow</code> in either is sufficient, otherwise the request is denied by default. The storage type is purely a management and lifecycle decision, never a security-semantics one. This is a common trick question.</p>",
            },
            {
              question: "Why not just use AWS-managed policies everywhere — they're maintained by AWS?",
              solution: "<p>Two reasons. First, they are written for every customer, so they are far broader than any one workload needs: <code>AmazonS3FullAccess</code> is literally <code>s3:*</code> on <code>*</code>, covering every bucket including ones created next year and including <code>DeleteBucket</code>. That is the blast radius if the workload is compromised. Second, <strong>AWS can change them</strong> — new permissions can appear on every identity holding the policy when a service ships a feature, which means your permission surface is not fully described by your own infrastructure code, something auditors object to. They remain a good fit for AWS's own plumbing (for example <code>AWSLambdaBasicExecutionRole</code>) and for sandboxes.</p>",
            },
            {
              question: "Your CI pipeline updates a customer-managed policy on every deploy and has started failing. Why?",
              solution: "<p>You hit the <strong>five-version limit</strong>. A customer-managed policy retains at most five versions, and <code>create-policy-version</code> fails with <code>LimitExceeded</code> once the sixth is attempted. The fix is to prune before creating: list versions, delete the oldest non-default one, then create the new version with <code>--set-as-default</code>. It is worth keeping the pruning rather than switching to inline policies, because those five versions are your only rollback mechanism for a bad permission change.</p>",
            },
            {
              question: "A policy has grown past the 6,144 character limit. What are your options?",
              solution: "<p>Three, roughly in order of quality. (1) <strong>Replace resource enumeration with conditions</strong> — instead of listing 200 ARNs, tag the resources and match on <code>aws:ResourceTag</code>, which is attribute-based access control and is the answer that scales. (2) <strong>Consolidate actions with sensible wildcards</strong>, for example <code>s3:Get*</code> rather than eleven separate read actions — being careful that the wildcard does not sweep in something privileged. (3) <strong>Split into multiple managed policies</strong> attached to the same identity, remembering the 10-attachment limit (raisable to 20). Simply moving it inline is not a fix: inline limits are smaller (2,048 for a user, 10,240 aggregate for a role).</p>",
            },
            {
              question: "How would you audit an account for over-privileged identities?",
              solution: "<p>Start with <code>list-entities-for-policy</code> on the dangerous AWS-managed policies — <code>AdministratorAccess</code>, <code>PowerUserAccess</code>, <code>IAMFullAccess</code> and the <code>*FullAccess</code> family. Then hunt for <strong>escalation primitives</strong> regardless of which policy contains them: <code>iam:PassRole</code> with a wildcard resource, <code>iam:CreatePolicyVersion</code>, <code>iam:AttachRolePolicy</code>, <code>iam:UpdateAssumeRolePolicy</code>. Crucially, enumerate <strong>inline</strong> policies too by walking every user, group and role, because they are invisible to policy-centric queries. Then use <strong>IAM Access Analyzer</strong>: unused-access findings show permissions never exercised, and policy generation writes a tight policy from the last 90 days of CloudTrail activity for a given role.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-versioning.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_iam-quotas.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-policy-generation.html",
          ],
        },
        {
          topic: "Identity-Based vs Resource-Based Policies — Two Sides of the Same Door",
          tags: ["aws", "iam", "resource policy", "s3 bucket policy", "kms", "cross-account", "principal"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Every permission in AWS can be written from one of two directions, and understanding which direction you are writing from is most of the skill. An <strong>identity-based policy</strong> is attached to a <em>who</em> and says what that identity may do. A <strong>resource-based policy</strong> is attached to a <em>thing</em> and says who may touch it. Same door, two sides: one is the key in your pocket, the other is the guest list taped to the door.
</p>
<p style="line-height: 1.75;">The structural difference is a single field. A resource-based policy has a <strong><code>Principal</code></strong> block; an identity-based policy does not. That makes sense once you say it out loud: if the policy is attached to Alice, there is no need to say who it is about — it is about Alice. But a bucket policy is attached to the bucket, so it must name whom it is talking about. If you ever cannot remember which kind of document you are looking at, look for <code>Principal</code>.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Side by side</h4>
<div style="overflow-x: auto; margin-top: 0.75rem;">
<table style="width: 100%; border-collapse: collapse; font-size: 0.92rem;">
  <thead>
    <tr style="background: #f1f5f9; text-align: left;">
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;"></th>
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;">Identity-based</th>
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;">Resource-based</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Attached to</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">User, group or role</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">The resource itself (bucket, queue, key, function...)</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Answers</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">What can this identity do?</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Who can touch this resource?</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;"><code>Principal</code> field</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Absent (implied)</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;"><strong>Required</strong></td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Supported everywhere?</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Yes, universal</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Only on services that support it</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Cross-account</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Grants intent only; other account must agree</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Can grant access to an outside principal directly</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Who administers it</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">The identity's account / IAM admin</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">The resource owner</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Good for</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">"This service needs these permissions"</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">"Only these callers may use this data"</td></tr>
  </tbody>
</table>
</div>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Which services actually have resource-based policies?</h4>
<p style="line-height: 1.75;">Not all of them, and knowing the list saves you designing something impossible. The common ones:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>S3</strong> — bucket policies (and, separately, access points and the legacy ACLs).</li>
  <li><strong>KMS</strong> — <em>key policies</em>, which are special: a KMS key <strong>always</strong> has one, and it is authoritative in a way other resource policies are not.</li>
  <li><strong>SQS</strong> queue policies, <strong>SNS</strong> topic policies.</li>
  <li><strong>Lambda</strong> — function resource policies, which is what <code>add-permission</code> writes when API Gateway or S3 invokes your function.</li>
  <li><strong>IAM roles</strong> — the <strong>trust policy</strong> is a resource-based policy. This is worth pausing on: the role is the resource, and the trust policy says who may act on it.</li>
  <li><strong>Secrets Manager</strong>, <strong>ECR</strong> repositories, <strong>EFS</strong> file systems, <strong>API Gateway</strong>, <strong>EventBridge</strong> event buses, <strong>Glacier</strong> vaults, <strong>CodeArtifact</strong>, <strong>OpenSearch</strong>, <strong>Backup</strong> vaults.</li>
</ul>
<p style="line-height: 1.75;">Notably <strong>absent</strong>: EC2, DynamoDB (tables have no resource policy in the classic sense — historically this was a standard interview gotcha), RDS, CloudWatch Logs in most respects. If a service has no resource policy, cross-account access must be done with a role.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The rule that decides everything: same account vs different account</h4>
<p style="line-height: 1.75;">This is the part interviewers are really testing, and it is short enough to memorise:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Same account:</strong> an Allow in <em>either</em> the identity policy <em>or</em> the resource policy is enough. They are ORed together. (Explicit Deny in either still wins.)</li>
  <li><strong>Different accounts:</strong> <strong>both</strong> must allow. The caller's account must permit the call, and the resource's account must permit the caller. Neither side can grant access unilaterally.</li>
</ul>
<p style="line-height: 1.75;">The reason for the cross-account rule is sovereignty. If a bucket policy alone could grant access, account A could hand permissions to an employee of account B without account B's administrators knowing. Requiring both sides means each account keeps control over what its own principals can do, and each account keeps control over its own data.</p>
<p style="line-height: 1.75;">The practical consequence is that cross-account tickets always have two edits, in two accounts, usually owned by two different teams. If you only remember one thing about debugging cross-account access, remember that the answer is almost never in the account you are currently logged into.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The two ways to do cross-account access</h4>
<p style="line-height: 1.75;">There are exactly two patterns, and choosing between them is a common design question.</p>
<p style="line-height: 1.75;"><strong>Pattern 1: assume a role in the other account.</strong> The data account creates a role, trusts the caller's account, and attaches permissions. The caller assumes it and acts <em>as a principal of the data account</em>. Advantages: works for every service including ones with no resource policy; permissions live in one place; the session shows up in the data account's CloudTrail with a session name. Disadvantage: the caller loses their original identity during the call — from S3's perspective the actor is the assumed role, not the original user, which complicates per-user auditing and per-user conditions.</p>
<p style="line-height: 1.75;"><strong>Pattern 2: grant directly in the resource policy.</strong> The bucket policy names the other account's role as a <code>Principal</code>. The caller uses their own credentials and reaches across the boundary directly. Advantages: no assume-role hop, the caller keeps their own identity, and the call is simpler in code. Disadvantages: only works where resource policies exist; grants become scattered across many resources; and it is easier to accidentally write <code>"Principal": "*"</code>, which is how buckets end up public.</p>
<p style="line-height: 1.75;">A useful rule of thumb: use a <strong>role</strong> when the other party needs to perform a <em>job</em> involving several resources or services; use a <strong>resource policy</strong> when you are sharing <em>one specific thing</em> with a known party. And remember there is one more asymmetry: with Pattern 2 on S3, objects written by the foreign account can end up owned by that account, which is why <code>bucket-owner-full-control</code> and now S3 Object Ownership settings matter.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">KMS is the important exception</h4>
<p style="line-height: 1.75;">KMS key policies do not behave like other resource policies, and this trips up experienced people. For most services, an IAM identity policy alone can grant access within the same account. For KMS, the <strong>key policy is the root of trust</strong>: unless the key policy delegates to IAM — the standard statement granting <code>kms:*</code> to the account root principal — an identity policy granting <code>kms:Decrypt</code> does nothing at all.</p>
<p style="line-height: 1.75;">This is why "I gave the role <code>kms:Decrypt</code> and it still fails" is such a common ticket. The role's policy is fine; the key policy never delegated to IAM, or the key is in another account. It is also why deleting or breaking a key policy can lock everyone out of a key irrecoverably — including administrators — which is why AWS warns so loudly when you edit one.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Other things resource policies make possible</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Anonymous access.</strong> Only a resource policy can say <code>"Principal": "*"</code> — a public website bucket. There is no identity-based way to grant access to someone with no identity.</li>
  <li><strong>Service principals.</strong> <code>"Principal": {"Service": "cloudtrail.amazonaws.com"}</code> lets an AWS service write into your bucket. This is how CloudTrail, Config, ELB access logs and VPC flow logs all work.</li>
  <li><strong>Deny-everything-except guardrails.</strong> A bucket policy with a <code>Deny</code> on every principal except a named VPC endpoint or role is the standard "this data never leaves the VPC" control. You cannot express that from the identity side, because you cannot enumerate every identity in the world.</li>
  <li><strong>Organization-wide grants.</strong> <code>aws:PrincipalOrgID</code> lets one bucket policy trust every account in your AWS Organization without listing them.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Debugging checklist</h4>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li>Is this same-account or cross-account? Cross-account means <strong>two</strong> documents must allow.</li>
  <li>Does the resource policy's <code>Principal</code> match <em>exactly</em>? A role ARN and an assumed-role session ARN are different strings; in a <code>Principal</code> you use the <strong>role ARN</strong>, while in a <code>Condition</code> on <code>aws:PrincipalArn</code> you may see the session form.</li>
  <li>Is there an explicit <code>Deny</code> anywhere — including a Deny with a <code>NotPrincipal</code> or a condition you did not expect, such as <code>aws:SourceVpce</code>?</li>
  <li>For S3, are there other layers: Block Public Access, Object Ownership, an access point policy, or an object ACL?</li>
  <li>For anything encrypted, is the <strong>KMS key policy</strong> in the picture? Cross-account S3 with SSE-KMS needs the key policy to trust the caller too.</li>
  <li>Use <strong>IAM Policy Simulator</strong> for identity policies, and <strong>IAM Access Analyzer</strong> to find resource policies that grant access outside your trust zone.</li>
</ol>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Working through the S3 layers, because S3 is where this is asked</h4>
<p style="line-height: 1.75;">S3 is the service where identity and resource policies collide most often, and it has more layers than any other. When someone says "the bucket policy allows it but it still fails", the answer is usually one of these, in roughly the order you should check them:</p>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Block Public Access.</strong> Enabled at the account and bucket level, and it wins over any bucket policy granting public access. If your bucket policy has <code>"Principal": "*"</code> and nothing works, this is almost always why — and that is the intended behaviour, not a bug.</li>
  <li><strong>The bucket policy itself</strong> — including any <code>Deny</code> statements, which are common (deny non-TLS, deny outside a VPC endpoint, deny unencrypted uploads).</li>
  <li><strong>The caller's identity policy</strong>, remembering the cross-account "both must allow" rule.</li>
  <li><strong>Object Ownership.</strong> Set to <code>BucketOwnerEnforced</code>, ACLs are disabled entirely and the bucket owner owns every object — which is what you want, and which also means any logic relying on ACLs stops working.</li>
  <li><strong>Object ACLs</strong>, if ownership is not enforced. Legacy, per-object, and a frequent cause of "I can list the bucket but not read this one file" — typically because a foreign account wrote the object and kept ownership.</li>
  <li><strong>Access point policies</strong>, if the request goes through an S3 Access Point, which has its own policy in addition to the bucket's.</li>
  <li><strong>VPC endpoint policies</strong>, which can restrict which buckets are reachable through the endpoint regardless of everything else.</li>
  <li><strong>The KMS key policy</strong>, if the object is encrypted with SSE-KMS. Read access to the object is useless without <code>kms:Decrypt</code> on the key.</li>
</ol>
<p style="line-height: 1.75;">Being able to list those eight layers in order is a strong signal in an interview, because it shows you have debugged this rather than read about it. The corresponding design advice is to keep the number of active layers small: enforce bucket ownership so ACLs vanish, keep Block Public Access on, and express intent in the bucket policy rather than spreading it across ACLs and endpoint policies.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The two patterns, compared on the things that actually differ</h4>
<p style="line-height: 1.75;">Choosing between "assume a role in the other account" and "grant directly in the resource policy" comes up in nearly every AWS design interview. The honest comparison is not about which is more secure — both can be done well — but about four practical differences:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Whose identity appears in the logs.</strong> With a role, the data account's CloudTrail shows its own role's session, so you see <em>which session</em> but the original caller's identity is one hop away (unless <code>SourceIdentity</code> is set). With a resource policy, the foreign principal's ARN appears directly, which makes per-caller conditions and auditing simpler.</li>
  <li><strong>Where the permissions live.</strong> A role centralises them in one place, which is much easier to review than a grant scattered across forty bucket policies. If the sharing relationship is long-lived and broad, centralising wins.</li>
  <li><strong>Object ownership and encryption.</strong> If a foreign account <em>writes</em> via a resource policy, ownership and KMS get complicated fast. Assuming a role in the owning account sidesteps both, because the writer is a local principal.</li>
  <li><strong>Whether the service supports it at all.</strong> This ends the argument for EC2, RDS, DynamoDB and anything else without a resource policy: it has to be a role.</li>
</ul>
<p style="line-height: 1.75;">A good summarising line: <strong>share a resource with a resource policy; delegate a job with a role.</strong></p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Resource policies as guardrails, not just grants</h4>
<p style="line-height: 1.75;">It is easy to think of resource policies purely as a way to let people in. In mature accounts they are used at least as often to keep people <em>out</em>, in ways identity policies structurally cannot. The common guardrail statements:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Force TLS</strong> — deny everything when <code>aws:SecureTransport</code> is false. This should be on essentially every bucket.</li>
  <li><strong>Confine to a network</strong> — deny everything where <code>aws:SourceVpce</code> is not your endpoint, or where <code>aws:SourceVpc</code> is not your VPC.</li>
  <li><strong>Confine to the organisation</strong> — deny where <code>aws:PrincipalOrgID</code> does not match, which is a single statement that prevents any grant from ever reaching outside your organisation, even if someone later adds a careless Allow.</li>
  <li><strong>Require encryption on write</strong> — deny <code>s3:PutObject</code> unless the request carries the expected <code>s3:x-amz-server-side-encryption</code> header and key ID.</li>
  <li><strong>Protect the log store</strong> — deny <code>s3:DeleteObject</code> and <code>s3:PutBucketPolicy</code> from anyone except a named break-glass role, on the CloudTrail bucket.</li>
</ul>
<p style="line-height: 1.75;">Because explicit Deny beats every Allow from anywhere, these statements are genuinely strong: no identity policy, no matter how broad, can punch through them. That property is what makes resource policies the natural home for data-perimeter controls, and the newer <strong>resource control policies (RCPs)</strong> extend the same idea to a whole organisation, applying a ceiling to what resources in member accounts may permit.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Principal matching: the details that cause silent failures</h4>
<p style="line-height: 1.75;">Most cross-account tickets that survive the first hour come down to the <code>Principal</code> block not matching what the caller actually is. The rules:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>In a <code>Principal</code>, use the role ARN</strong> — <code>arn:aws:iam::111122223333:role/worker</code> — not the assumed-role session ARN. AWS resolves the session back to its role for principal matching.</li>
  <li><strong>In a <code>Condition</code> on <code>aws:PrincipalArn</code>, the value may be the session form</strong> — <code>arn:aws:sts::111122223333:assumed-role/worker/session</code>. Mixing these up produces a condition that never matches.</li>
  <li><strong><code>:root</code> means the account, not the root user.</strong> It delegates to that account's IAM administrators.</li>
  <li><strong>Deleted principals leave unique IDs.</strong> If a role named in a policy is deleted, the friendly ARN is replaced by a raw <code>AROA...</code> string, which will never match a recreated role of the same name — a deliberate safety feature.</li>
  <li><strong>Service principals are exact strings.</strong> <code>ecs-tasks.amazonaws.com</code> is not <code>ecs.amazonaws.com</code>; <code>delivery.logs.amazonaws.com</code> is not <code>logs.amazonaws.com</code>. There is no fuzzy matching and no helpful error.</li>
  <li><strong>Service principals need source conditions.</strong> Granting <code>s3.amazonaws.com</code> the right to invoke your Lambda without an <code>aws:SourceArn</code> condition means <em>any</em> bucket, in any account, can trigger it — the confused deputy problem again, in its in-AWS form.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">How to find resource policies that are too open</h4>
<p style="line-height: 1.75;">Because a resource policy can grant access to principals outside your account — including <code>"*"</code> — they are the main way data gets accidentally exposed, and they are not visible from any identity-side audit. <strong>IAM Access Analyzer</strong> exists specifically for this: you define a zone of trust (an account or an organisation) and it continuously analyses resource policies on buckets, keys, queues, roles, functions, secrets, repositories, file systems and more, reporting every grant that reaches outside that zone.</p>
<p style="line-height: 1.75;">Findings are not automatically bad — a bucket deliberately shared with a partner will appear — so the workflow is to triage each finding as intended (archive it, ideally with an archive rule so equivalent findings auto-archive) or unintended (fix it). Two things make this genuinely valuable rather than noise: it reasons about the policy rather than sampling traffic, so it finds exposure that nobody has exploited yet, and it covers resource types you would not think to check manually. Pair it with the external-access analyzer at the organisation level, and add <code>check-no-public-access</code> to the CI pipeline for policies you author.</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Lambda, SQS and SNS: the everyday resource policies</h4>
<p style="line-height: 1.75;">S3 dominates the discussion, but the resource policies you will actually edit most often are on Lambda, SQS and SNS, and they have their own character.</p>
<p style="line-height: 1.75;"><strong>Lambda</strong> function policies are usually written for you by <code>aws lambda add-permission</code> or by whatever service you are wiring up. Each statement grants one service principal — API Gateway, S3, EventBridge, SNS — the right to invoke the function. The critical detail is the <code>--source-arn</code>: without it, <em>any</em> bucket or rule in <em>any</em> account belonging to that service can invoke your function. Consoles add it by default; hand-rolled CLI calls and older IaC frequently do not.</p>
<p style="line-height: 1.75;"><strong>SQS</strong> queue policies are what let an SNS topic or an S3 bucket write into a queue, and they are the usual reason a fan-out pipeline silently drops messages: the subscription exists, but the queue never granted the topic permission, so every delivery fails. The same <code>aws:SourceArn</code> caution applies.</p>
<p style="line-height: 1.75;"><strong>SNS</strong> topic policies govern both publishing and subscribing, and are the place cross-account event distribution is configured. A useful habit across all three: because these policies are small and are usually generated, review them by diffing rather than by reading — an unexpected new statement is far more visible that way than a subtly widened condition.</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The data perimeter, assembled from both sides</h4>
<p style="line-height: 1.75;">The most complete expression of this topic is the <strong>data perimeter</strong>: a set of controls guaranteeing that only trusted identities, from trusted networks, can reach trusted resources. It requires both policy families working together, which is why it is a good closing framing.</p>
<p style="line-height: 1.75;">There are three assertions, each enforced from a different direction:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Only my identities can access my resources.</strong> Enforced on the resource side — a condition on <code>aws:PrincipalOrgID</code> in resource policies, or organisation-wide with an RCP. This stops data being shared outward, deliberately or accidentally.</li>
  <li><strong>My identities can only access my resources.</strong> Enforced on the identity side — an SCP denying access to resources outside your organisation, conditioned on <code>aws:ResourceOrgID</code>. This stops a compromised workload exfiltrating to an attacker's own bucket.</li>
  <li><strong>My resources can only be reached from my networks.</strong> Enforced with <code>aws:SourceVpc</code> or <code>aws:SourceVpce</code> conditions, plus VPC endpoint policies. This stops credentials being useful from outside your environment even if they leak.</li>
</ul>
<p style="line-height: 1.75;">Each assertion needs careful exemptions — AWS services calling on your behalf (<code>aws:ViaAWSService</code>, <code>aws:CalledVia</code>), service-linked roles, and legitimate third-party integrations — which is why perimeters are rolled out gradually and in audit-then-enforce order. But the structure is what matters for an interview: identity-based policies control what <em>your principals</em> may reach, resource-based policies control who may reach <em>your resources</em>, and a perimeter is simply both, stated deliberately.</p>

<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "An identity-based policy attaches to a user, group or role and says what that identity may do — no <code>Principal</code> field, because the identity is implied. A resource-based policy attaches to the resource, like an S3 bucket policy or a role's trust policy, and must name a <code>Principal</code>. Within one account they're ORed — an Allow in either is enough. Across accounts <strong>both</strong> sides must allow, which is the sovereignty rule and the reason cross-account debugging always involves two accounts. Resource policies also do things identity policies can't: anonymous access, service principals like CloudTrail writing to a bucket, and org-wide grants via <code>aws:PrincipalOrgID</code>. And KMS is the exception to watch — the key policy is the root of trust, so an IAM policy granting <code>kms:Decrypt</code> does nothing unless the key policy delegates to IAM."</div>
</div>`,
          examples: [
            `# ---------- Identity-based: no Principal, because it IS the identity ----------
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "ReadReports",
    "Effect": "Allow",
    "Action": ["s3:GetObject", "s3:ListBucket"],
    "Resource": [
      "arn:aws:s3:::acme-reports",          // the bucket, for ListBucket
      "arn:aws:s3:::acme-reports/*"         // the objects, for GetObject
    ]
  }]
}
# Attached with: aws iam attach-role-policy --role-name analytics ...`,

            `# ---------- Resource-based: Principal is mandatory ----------
# Bucket policy on acme-reports, granting a role in ANOTHER account
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PartnerReadOnly",
      "Effect": "Allow",
      "Principal": { "AWS": "arn:aws:iam::999988887777:role/partner-analytics" },
      "Action": ["s3:GetObject", "s3:ListBucket"],
      "Resource": ["arn:aws:s3:::acme-reports", "arn:aws:s3:::acme-reports/*"]
    },
    {
      "Sid": "DenyEverythingNotOverTLS",
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:*",
      "Resource": ["arn:aws:s3:::acme-reports", "arn:aws:s3:::acme-reports/*"],
      "Condition": { "Bool": { "aws:SecureTransport": "false" } }
    }
  ]
}
# CROSS-ACCOUNT: this alone is NOT enough. Account 999988887777 must ALSO
# attach an identity policy to partner-analytics allowing s3:GetObject here.

aws s3api put-bucket-policy --bucket acme-reports --policy file://bucket-policy.json`,

            `# ---------- Only a resource policy can express these ----------
# 1. An AWS service writing into your bucket (CloudTrail, ELB logs, Config)
{
  "Effect": "Allow",
  "Principal": { "Service": "cloudtrail.amazonaws.com" },
  "Action": "s3:PutObject",
  "Resource": "arn:aws:s3:::acme-trail/AWSLogs/123456789012/*",
  "Condition": {
    "StringEquals": { "s3:x-amz-acl": "bucket-owner-full-control" },
    "ArnLike": { "aws:SourceArn": "arn:aws:cloudtrail:eu-west-1:123456789012:trail/org" }
  }
}

# 2. Trust every account in the organisation, without listing them
{
  "Effect": "Allow",
  "Principal": "*",
  "Action": "s3:GetObject",
  "Resource": "arn:aws:s3:::acme-shared/*",
  "Condition": { "StringEquals": { "aws:PrincipalOrgID": "o-abc123xyz" } }
}

# 3. Data must never leave the VPC: deny everything not via the endpoint
{
  "Effect": "Deny",
  "Principal": "*",
  "Action": "s3:*",
  "Resource": ["arn:aws:s3:::acme-private", "arn:aws:s3:::acme-private/*"],
  "Condition": { "StringNotEquals": { "aws:SourceVpce": "vpce-0a1b2c3d4e" } }
}`,

            `# ---------- KMS: the key policy is the ROOT of trust ----------
# Without this first statement, NO identity policy granting kms:Decrypt works.
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "EnableIAMPoliciesToWork",
      "Effect": "Allow",
      "Principal": { "AWS": "arn:aws:iam::123456789012:root" },
      "Action": "kms:*",
      "Resource": "*"
    },
    {
      "Sid": "AllowTheAppToDecrypt",
      "Effect": "Allow",
      "Principal": { "AWS": "arn:aws:iam::123456789012:role/orders-api" },
      "Action": ["kms:Decrypt", "kms:DescribeKey"],
      "Resource": "*",
      "Condition": {
        "StringEquals": { "kms:ViaService": "s3.eu-west-1.amazonaws.com" }
      }
    }
  ]
}

aws kms get-key-policy --key-id alias/orders --policy-name default --output text`,

            `# ---------- Debugging: which side is missing? ----------
# Same account -> either side allowing is enough.
# Cross account -> BOTH must allow. Check the other account too.

# 1. Who am I really?
aws sts get-caller-identity

# 2. Does MY identity policy allow it? (simulate, no real call made)
aws iam simulate-principal-policy \\
  --policy-source-arn arn:aws:iam::999988887777:role/partner-analytics \\
  --action-names s3:GetObject \\
  --resource-arns arn:aws:s3:::acme-reports/q3.csv

# 3. Does the RESOURCE policy allow me?
aws s3api get-bucket-policy --bucket acme-reports --output text | python3 -m json.tool

# 4. Extra S3 layers people forget
aws s3api get-public-access-block --bucket acme-reports
aws s3api get-bucket-ownership-controls --bucket acme-reports

# 5. Find resource policies exposing data outside your trust zone
aws accessanalyzer list-findings --analyzer-arn "$ANALYZER_ARN" \\
  --filter '{"status":{"eq":["ACTIVE"]}}'`,
          ],
          questions: [
            {
              question: "What is the difference between an identity-based and a resource-based policy?",
              solution: "<p>An <strong>identity-based policy</strong> attaches to a user, group or role and describes what that identity may do; it has <strong>no <code>Principal</code> field</strong> because the identity is implied by the attachment. A <strong>resource-based policy</strong> attaches to the resource — an S3 bucket, SQS queue, KMS key, Lambda function, or a role's trust policy — and <strong>must</strong> name a <code>Principal</code>, because it describes who may act on that resource. Identity policies work for every service; resource policies exist only on services that support them. Resource policies can also express things identity policies cannot: anonymous public access, AWS service principals, and org-wide grants.</p>",
            },
            {
              question: "For cross-account access, is a bucket policy alone enough?",
              solution: "<p>No. Across accounts <strong>both sides must allow</strong>: the bucket's account must grant the foreign principal in the bucket policy, <em>and</em> the caller's account must grant its own principal an identity policy allowing the action on that bucket ARN. Neither account can unilaterally grant access — that is the sovereignty rule, and it exists so one account cannot hand permissions to another account's employees without that account's administrators knowing. Within a <em>single</em> account the two are ORed instead, so an Allow in either one is sufficient.</p>",
            },
            {
              question: "You gave a role kms:Decrypt in its IAM policy and decryption still fails. Why?",
              solution: "<p>Because for <strong>KMS the key policy is the root of trust</strong>, unlike other resource policies. Unless the key policy contains a statement delegating to IAM — typically <code>Allow kms:*</code> to <code>arn:aws:iam::&lt;account&gt;:root</code> — an identity policy granting <code>kms:Decrypt</code> has no effect at all. Either add the delegation statement, or grant the role directly in the key policy. If the key lives in another account, you need both: the key policy naming the foreign principal and the caller's identity policy allowing <code>kms:Decrypt</code> on that key ARN. Also check for a <code>kms:ViaService</code> condition restricting which service may use the key.</p>",
            },
            {
              question: "When would you use a resource-based policy instead of a cross-account role?",
              solution: "<p>When you are sharing <strong>one specific resource with a known party</strong> and want the caller to keep their own identity. With a resource policy the partner calls with their own credentials, so their identity appears in your CloudTrail and you can write conditions on it; there is no assume-role hop and the client code is simpler. Use a <strong>role</strong> instead when the other party needs to perform a <em>job</em> spanning several resources or services, when the service has no resource policy at all (EC2, RDS, DynamoDB), or when you want all the permissions defined in one place. A practical caution for S3: objects written by a foreign account can end up owned by that account, so set Object Ownership to bucket-owner-enforced or require <code>bucket-owner-full-control</code>.</p>",
            },
            {
              question: "How do you make an S3 bucket reachable only from inside your VPC?",
              solution: "<p>With a <strong>Deny</strong> in the bucket policy conditioned on <code>aws:SourceVpce</code> (or <code>aws:SourceVpc</code>): deny <code>s3:*</code> for <code>Principal: \"*\"</code> when the request does not arrive through your VPC endpoint. This must be written as a resource policy because you cannot enumerate every identity in the world from the identity side. Pair it with a VPC endpoint policy restricting which buckets are reachable through the endpoint, Block Public Access enabled, and a second Deny on <code>aws:SecureTransport: false</code> to force TLS. Test carefully — a too-broad Deny here can lock out console users and your own automation.</p>",
            },
            {
              question: "Which common AWS services do NOT support resource-based policies, and what does that mean?",
              solution: "<p>EC2, RDS, and classically DynamoDB have no resource-based policy in the usual sense, and CloudWatch Logs is limited. The practical consequence is that <strong>cross-account access to those services must go through a role</strong>: the owning account creates a role with a trust policy naming the other account, and the caller assumes it. You cannot \"share a DynamoDB table\" the way you share a bucket. This is also why the role pattern is the more general answer in design questions — it works everywhere, whereas the resource-policy pattern only works where the service supports it.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_identity-vs-resource.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic-cross-account.html",
            "https://docs.aws.amazon.com/kms/latest/developerguide/key-policies.html",
            "https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-bucket-policies.html",
          ],
        },
        {
          topic: "Trust Policy vs Permission Policy — Who Can Wear the Hat vs What the Hat Does",
          tags: ["aws", "iam", "trust policy", "assume role", "sts", "externalid", "oidc", "federation"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Every IAM role carries two completely different kinds of document, and confusing them is the most common cause of "the role doesn't work" tickets. The <strong>trust policy</strong> answers <em>who is allowed to become this role</em>. The <strong>permission policy</strong> answers <em>what this role can do once someone has become it</em>. They are checked at different moments, by different services, and they fail with different error messages.
</p>
<p style="line-height: 1.75;">Think of a hospital again. The trust policy is the <strong>door of the uniform cupboard</strong> — it decides who may take the uniform down off the peg. The permission policy is what the <strong>badge on the uniform opens</strong> — which wards, which drug cabinets. Being allowed into the cupboard tells you nothing about which doors the badge opens, and a badge that opens everything is useless if you can never get into the cupboard.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The two moments</h4>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Assumption time.</strong> Someone calls <code>sts:AssumeRole</code>. STS reads the <strong>trust policy</strong>, checks the caller is named there, checks any conditions (MFA present? correct ExternalId? correct GitHub repo?), and if satisfied mints temporary credentials. The permission policy is not consulted at all at this point.</li>
  <li><strong>Call time.</strong> The now-assumed role calls <code>s3:GetObject</code>. IAM reads the <strong>permission policies</strong>. The trust policy is not consulted at all at this point.</li>
</ol>
<p style="line-height: 1.75;">This clean separation gives you a free diagnostic. Read the operation named in the AccessDenied message:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><em>"User ... is not authorized to perform: <strong>sts:AssumeRole</strong> on resource: arn:aws:iam::...:role/deploy"</em> → the <strong>trust policy</strong> is wrong (or the caller lacks <code>sts:AssumeRole</code> in their own identity policy).</li>
  <li><em>"User: arn:aws:sts::...:<strong>assumed-role</strong>/deploy/session is not authorized to perform: s3:GetObject"</em> → assumption already succeeded; the <strong>permission policy</strong> is wrong.</li>
</ul>
<p style="line-height: 1.75;">If you internalise nothing else from this topic, internalise that. It converts a vague "permissions problem" into a one-document investigation.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The trust policy in detail</h4>
<p style="line-height: 1.75;">Formally, the trust policy is a <strong>resource-based policy</strong> — the role is the resource, and the policy says who may act on it. That is why it has a <code>Principal</code> block, which permission policies never do. Every role must have one; a role cannot exist without it, and AWS calls it the <code>AssumeRolePolicyDocument</code> in the API.</p>
<p style="line-height: 1.75;">The <code>Principal</code> can be several shapes, and knowing them all is worth marks:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>An AWS service:</strong> <code>{"Service": "lambda.amazonaws.com"}</code>. This is what makes a role usable as an execution role or instance-profile role.</li>
  <li><strong>Another account:</strong> <code>{"AWS": "arn:aws:iam::111122223333:root"}</code>. Careful — this does <em>not</em> mean the root user. It delegates to that whole account, meaning any principal there that its own admins permit can assume the role. It is a delegation, not a grant.</li>
  <li><strong>A specific role or user:</strong> <code>{"AWS": "arn:aws:iam::111122223333:role/ci"}</code>. Tighter, but note a subtlety: if that role is deleted and recreated with the same name, the trust breaks, because AWS silently rewrites the ARN to the role's unique ID internally. You will see a raw <code>AROA...</code> string appear in the policy — that is not corruption, that is why.</li>
  <li><strong>A federated identity provider:</strong> <code>{"Federated": "arn:aws:iam::123456789012:oidc-provider/token.actions.githubusercontent.com"}</code> for OIDC, or a SAML provider ARN. Paired with <code>sts:AssumeRoleWithWebIdentity</code> or <code>sts:AssumeRoleWithSAML</code>.</li>
  <li><strong>Anonymous:</strong> <code>"*"</code>. Almost always a critical misconfiguration on a role — it means anyone in AWS can assume it unless conditions save you.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Conditions are where trust policies earn their keep</h4>
<p style="line-height: 1.75;">A bare <code>Principal</code> is usually too loose. The conditions that matter:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><code>aws:MultiFactorAuthPresent</code> — require MFA before a human may assume a privileged role. Use <code>Bool: true</code>, and be aware that combining it with a <code>BoolIfExists</code> variant changes behaviour for service calls.</li>
  <li><code>sts:ExternalId</code> — the fix for the <strong>confused deputy</strong> problem, mandatory when a third-party SaaS assumes a role in your account. More on this below.</li>
  <li><code>aws:PrincipalOrgID</code> — trust any account in your organisation without enumerating account numbers.</li>
  <li><code>aws:SourceIp</code> / <code>aws:SourceVpce</code> — restrict where assumption may originate.</li>
  <li><code>token.actions.githubusercontent.com:sub</code> — for GitHub Actions OIDC, pin the exact repository and branch: <code>repo:acme/orders-api:ref:refs/heads/main</code>. Without this, <em>any</em> GitHub repository in the world can assume your role. This is a genuinely common, genuinely severe misconfiguration.</li>
  <li><code>sts:RoleSessionName</code> — force callers to use a meaningful, non-spoofable session name.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The confused deputy and ExternalId</h4>
<p style="line-height: 1.75;">This deserves its own explanation because interviewers love it. Suppose you hire a monitoring SaaS. They ask you to create a role trusting <em>their</em> AWS account. Fine. But every one of their customers does the same thing. If the SaaS has a bug — or a malicious user — that lets customer B specify customer A's role ARN, the SaaS will happily assume A's role, because the SaaS's account genuinely is trusted by A. The SaaS has become a "confused deputy": an authorised party tricked into using its authority on someone else's behalf.</p>
<p style="line-height: 1.75;">The fix is <strong><code>sts:ExternalId</code></strong>: a secret-ish string that <em>the SaaS generates uniquely per customer</em> and that you pin in your trust policy's condition. Now assuming your role requires both being the SaaS's account <em>and</em> presenting your specific ExternalId, which customer B does not know. Two rules follow: the ExternalId must be chosen by the third party, not by you (so customers cannot guess each other's), and you must never accept a shared or predictable value like your company name.</p>
<p style="line-height: 1.75;">The same class of problem inside AWS is solved by <code>aws:SourceArn</code> and <code>aws:SourceAccount</code> conditions on service principals — for example, restricting <code>s3.amazonaws.com</code> to only invoke your Lambda on behalf of one specific bucket.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The permission policy side</h4>
<p style="line-height: 1.75;">Permission policies on a role are ordinary identity-based policies — the same documents you would attach to a user. They can be AWS-managed, customer-managed or inline, and the role's effective permissions are the union of all of them minus any explicit Deny. There is nothing role-specific about them, which is exactly why they are easy to reason about once you have separated them from the trust policy in your head.</p>
<p style="line-height: 1.75;">Two role-specific interactions do matter:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Session policies</strong> passed at assume time <em>intersect</em> with the role's permission policies. They can only narrow, never widen. Useful for handing out a scoped-down version of a broad role.</li>
  <li><strong>Permissions boundaries</strong> attached to the role also intersect, capping what the role can ever do regardless of what is attached.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The third document people forget</h4>
<p style="line-height: 1.75;">For a user in the <em>same or another</em> account to assume a role, there are usually <strong>two</strong> permission checks at assumption time, not one:</p>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li>The role's <strong>trust policy</strong> must name the caller (or their account).</li>
  <li>The caller's own <strong>identity policy</strong> must allow <code>sts:AssumeRole</code> on the role's ARN.</li>
</ol>
<p style="line-height: 1.75;">There is one shortcut: if the trust policy names a <em>specific</em> principal in the <em>same</em> account, that alone can suffice. But cross-account always needs both, and relying on the shortcut makes policies harder to read. The safe habit is to always write both sides. When people say "I added the trust policy and it still doesn't work", the missing piece is nearly always this second document, in the caller's account, which they do not have open.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Common failures, and what they really mean</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>A raw <code>AROA...</code> string in your trust policy.</strong> The principal role was deleted; AWS replaced the ARN with the now-dangling unique ID. Recreate the principal and rewrite the trust policy with the ARN.</li>
  <li><strong>Works for a person, fails for the CI job.</strong> Usually an MFA condition: <code>aws:MultiFactorAuthPresent</code> is false for a machine. Split into two roles rather than weakening the human one.</li>
  <li><strong>Session dies after an hour despite <code>MaxSessionDuration: 43200</code>.</strong> Role chaining caps at one hour. Also, the console's switch-role path has its own limits.</li>
  <li><strong>Service cannot assume the role.</strong> Check the exact service principal string — <code>ecs-tasks.amazonaws.com</code> is not <code>ecs.amazonaws.com</code>, and <code>events.amazonaws.com</code> is not <code>scheduler.amazonaws.com</code>. These are unforgiving.</li>
  <li><strong>Newly created role fails to assume for a few seconds.</strong> IAM is eventually consistent. Automation that creates and immediately assumes should retry with backoff.</li>
</ul>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The service principal catalogue you should half-remember</h4>
<p style="line-height: 1.75;">A large share of trust-policy bugs are a wrong service principal string. They are exact, case-sensitive, and the error message does not tell you the string was wrong — the service simply cannot assume the role, and you get a failure that looks like a permission problem somewhere else entirely. The ones worth recognising:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><code>ec2.amazonaws.com</code> — for instance profiles.</li>
  <li><code>lambda.amazonaws.com</code> — Lambda execution roles.</li>
  <li><code>ecs-tasks.amazonaws.com</code> — ECS <em>task</em> roles and task <em>execution</em> roles. Note: <code>ecs.amazonaws.com</code> is a different principal used for the service-linked role, and confusing the two is extremely common.</li>
  <li><code>eks.amazonaws.com</code> for the cluster role, <code>ec2.amazonaws.com</code> for node groups, and an OIDC provider ARN for IRSA.</li>
  <li><code>states.amazonaws.com</code> — Step Functions.</li>
  <li><code>events.amazonaws.com</code> — EventBridge rules; <code>scheduler.amazonaws.com</code> — EventBridge Scheduler. Different services, different strings.</li>
  <li><code>codebuild.amazonaws.com</code>, <code>codepipeline.amazonaws.com</code>, <code>codedeploy.amazonaws.com</code> — each separate.</li>
  <li><code>glue.amazonaws.com</code>, <code>sagemaker.amazonaws.com</code>, <code>firehose.amazonaws.com</code>, <code>apigateway.amazonaws.com</code>, <code>rds.amazonaws.com</code>, <code>backup.amazonaws.com</code>, <code>ssm.amazonaws.com</code>.</li>
  <li><code>cloudformation.amazonaws.com</code> — for a CloudFormation service role, which is how you let a stack deploy with permissions the deploying human does not have.</li>
</ul>
<p style="line-height: 1.75;">Two supporting habits: always pair a service principal with <code>aws:SourceArn</code> or <code>aws:SourceAccount</code> conditions so the role cannot be assumed on behalf of somebody else's resource, and let the console or CDK generate the trust policy when you are unsure of the string, then read what it produced rather than typing it from memory.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Reading a trust policy critically</h4>
<p style="line-height: 1.75;">When you review a role in a security review, the trust policy deserves more scrutiny than the permission policy, because the permission policy only matters to people who can get in. A five-question checklist:</p>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Who exactly is the principal?</strong> A specific role ARN is tight. An account root is a delegation to that account's admins. A federated provider is as tight as its conditions. <code>"*"</code> is a critical finding.</li>
  <li><strong>Is that principal in an account you control?</strong> If not, what stops another customer of the same vendor from getting in — is there an <code>ExternalId</code>?</li>
  <li><strong>Are there conditions at all?</strong> A bare principal with no conditions is the default output of most quick-start guides and is rarely what you want for anything privileged.</li>
  <li><strong>If OIDC, is the <code>sub</code> pinned?</strong> An unpinned GitHub OIDC trust policy is assumable from any repository on GitHub. This is the single highest-severity misconfiguration in this whole topic.</li>
  <li><strong>What can the role do if someone does get in?</strong> Only now do you read the permission policies — and the answer determines how much the previous four answers matter.</li>
</ol>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Federation in a little more depth</h4>
<p style="line-height: 1.75;">Because the trust policy is what makes federation possible, it is worth understanding the two flavours concretely.</p>
<p style="line-height: 1.75;"><strong>SAML 2.0</strong> is the older, enterprise-oriented path. You create a SAML identity provider object in IAM holding your IdP's metadata document, and roles trust <code>{"Federated": "arn:aws:iam::123456789012:saml-provider/Okta"}</code> with the action <code>sts:AssumeRoleWithSAML</code> and a condition on <code>SAML:aud</code>. The IdP's assertion carries attributes that map to the role ARN and the session name, which is why federated users appear in CloudTrail with their corporate identifier. Multi-account SAML directly to each account works, but Identity Center is now the recommended layer on top because it manages role provisioning for you.</p>
<p style="line-height: 1.75;"><strong>OIDC</strong> is the modern, machine-oriented path, and is what you should reach for in CI/CD. You create an OIDC provider object pointing at the issuer (for example <code>token.actions.githubusercontent.com</code>), and roles trust it with <code>sts:AssumeRoleWithWebIdentity</code>. The conditions do all the work: <code>aud</code> pins the audience, and <code>sub</code> pins who is allowed — the exact organisation, repository and git ref. The same mechanism underpins EKS IRSA, where the cluster's own OIDC issuer is registered and the <code>sub</code> condition pins a Kubernetes namespace and service account.</p>
<p style="line-height: 1.75;">The security property that makes both worth the setup effort is the same: <strong>there is no AWS credential anywhere</strong>. Nothing to rotate, nothing to leak, nothing sitting in a CI secret store. When an interviewer asks how you would remove the last long-lived key from a build system, this is the answer.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">MaxSessionDuration and the console switch-role path</h4>
<p style="line-height: 1.75;">Two role properties sit next to the trust policy and cause confusion because they are not part of either document. <strong><code>MaxSessionDuration</code></strong> is a property of the role itself, defaulting to one hour and settable up to twelve. It caps <code>DurationSeconds</code> on assumption — but remember chaining overrides it downward to one hour, and the console's switch-role experience has its own behaviour. If a team asks for twelve-hour sessions, the right response is usually to ask why re-authentication is painful, and fix that instead.</p>
<p style="line-height: 1.75;">The console <strong>switch role</strong> feature is worth knowing about because it is how most humans experience cross-account access without Identity Center: you enter an account and role name, and the console performs the assumption for you. It only works if the trust policy permits your current identity and your identity policy permits <code>sts:AssumeRole</code> — the same two documents as always. The <code>RoleSessionName</code> is set automatically to your user name, which is why console switching produces reasonable CloudTrail entries without anyone configuring anything.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Designing a cross-account access model</h4>
<p style="line-height: 1.75;">Putting all of this together, the shape most organisations converge on looks like this, and it is a good answer to "how would you structure access across twenty accounts?":</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Humans never have credentials in workload accounts.</strong> They authenticate to the IdP, land in Identity Center, and receive a session in a provisioned role in the target account.</li>
  <li><strong>Roles are per job, not per person.</strong> <code>readonly</code>, <code>oncall</code>, <code>deploy</code>, <code>break-glass</code> — with the last one alarmed so that assuming it pages someone.</li>
  <li><strong>Trust policies carry conditions, not just principals.</strong> MFA for anything that writes, <code>aws:PrincipalOrgID</code> so trust cannot accidentally extend outside the organisation, and source-network conditions where the network is meaningful.</li>
  <li><strong>Machine access is federated, not keyed.</strong> OIDC for CI, instance profiles and task roles inside AWS, Roles Anywhere for the data centre.</li>
  <li><strong>Third parties get a dedicated role each</strong>, with a vendor-generated <code>ExternalId</code>, the narrowest permission policy you can write, and a review date.</li>
  <li><strong>Session duration is short by default</strong>, and elevated roles are shorter still.</li>
</ul>
<p style="line-height: 1.75;">Every element of that design is expressed in one of the two documents this topic is about. That is the real reason the distinction matters: once you can say which document a requirement belongs in, designing an access model becomes a series of small, obvious edits rather than an architectural puzzle.</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Trust policies as an inventory of who can get in</h4>
<p style="line-height: 1.75;">There is a useful reframing that makes trust policies feel less like configuration and more like a security artefact: <strong>the set of all trust policies in an account is the complete list of doors into it.</strong> Nothing can act in your account without either holding credentials issued there or passing through one of those documents. That makes them the highest-value thing to inventory, and a genuinely good answer to "where would you start reviewing an unfamiliar AWS account?"</p>
<p style="line-height: 1.75;">A practical sweep looks like this. Enumerate every role, excluding the service-linked and SSO-provisioned paths. For each, extract the trust policy's principals and conditions into a table. Then sort by how much you trust each principal: your own account's specific roles at the top, your organisation next, then named external accounts, then federated providers, then anything with <code>"*"</code>. Work upwards from the bottom. In most accounts of any age, that exercise finds at least one role trusting an external account nobody remembers, one OIDC trust with a wildcard <code>sub</code>, and one role with no conditions that was created during a proof of concept.</p>
<p style="line-height: 1.75;">The corresponding control to put in place afterwards is an SCP or a review process preventing new trust relationships outside the organisation without approval, plus IAM Access Analyzer, which reports exactly this — roles trusting principals outside your zone of trust — continuously rather than at audit time.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">When both documents are technically right and it still fails</h4>
<p style="line-height: 1.75;">A final category worth naming, because it consumes hours: the trust policy allows the caller, the permission policy allows the action, and the call still fails. The usual culprits are layers that sit outside both documents — an SCP denying <code>sts:AssumeRole</code> or the target action, a permissions boundary on the caller excluding <code>sts:AssumeRole</code>, a session policy from an earlier assumption narrowing what this session may do, a resource policy on the target denying the assumed-role principal, or a KMS key policy that never delegated to IAM. Working outwards from the two role documents to those five layers, in that order, resolves nearly all of them.</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The sentence to remember</h4>
<p style="line-height: 1.75;">Everything in this topic collapses into one line worth memorising: <strong>the trust policy is checked by STS when someone tries to become the role; the permission policies are checked by IAM when the role tries to do something.</strong> Two documents, two moments, two services, two error messages. When a role misbehaves, decide which moment failed before you open anything — the operation name in the error tells you for free, and that one habit will resolve more role problems than any amount of policy knowledge.</p>
<p style="line-height: 1.75;">The corollary is equally useful when <em>designing</em> rather than debugging. Any access requirement you are handed decomposes into a "who" and a "what", and those go into different documents owned by potentially different people. Getting into the habit of splitting a request that way before writing any JSON is what stops trust policies from quietly accumulating principals nobody meant to add.</p>


<p style="line-height: 1.75;">One practical habit follows from all of this. Whenever you create a role, write the trust policy first and the permission policy second, and review them in that order too — because a permission policy on a role nobody appropriate can assume is harmless, while a loose trust policy on a role with real permissions is the thing that actually gets exploited. Reviewing in that order also mirrors how an attacker looks at your account: they are searching for doors, not for what is behind them.</p>

<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "A trust policy is the role's resource-based policy — it has a <code>Principal</code> block and answers who may assume the role; STS checks it at assumption time. The permission policies are ordinary identity-based policies and answer what the role can do once assumed; IAM checks them at call time. Both must allow, and the error message tells you which is broken: AccessDenied on <code>sts:AssumeRole</code> is the trust policy, AccessDenied naming <code>assumed-role/...</code> is the permission policy. For cross-account there's a third document too — the caller's own policy must allow <code>sts:AssumeRole</code>. And I always put conditions in the trust policy: MFA for humans, <code>sts:ExternalId</code> for third-party SaaS to prevent the confused deputy problem, and a <code>sub</code> condition pinning repo and branch for GitHub OIDC."</div>
</div>`,
          examples: [
            `# ---------- The two documents on one role ----------
ROLE=prod-deploy

echo "### TRUST POLICY — who may become this role"
aws iam get-role --role-name $ROLE --query 'Role.AssumeRolePolicyDocument'

echo "### PERMISSION POLICIES — what it can do once assumed"
aws iam list-attached-role-policies --role-name $ROLE
aws iam list-role-policies --role-name $ROLE

# Update them with two DIFFERENT APIs - a good reminder they are different things
aws iam update-assume-role-policy --role-name $ROLE --policy-document file://trust.json
aws iam attach-role-policy --role-name $ROLE --policy-arn arn:aws:iam::123456789012:policy/deploy`,

            `# ---------- Trust policy: humans, with MFA required ----------
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "AWS": "arn:aws:iam::111122223333:root" },
    "Action": "sts:AssumeRole",
    "Condition": {
      "Bool":          { "aws:MultiFactorAuthPresent": "true" },
      "NumericLessThan": { "aws:MultiFactorAuthAge": "3600" },
      "StringLike":    { "sts:RoleSessionName": "\${aws:username}" }
    }
  }]
}
# ":root" means "delegate to that ACCOUNT", not "the root user".
# The caller ALSO needs sts:AssumeRole in their own identity policy.`,

            `# ---------- Trust policy: third-party SaaS, ExternalId mandatory ----------
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "AWS": "arn:aws:iam::555566667777:root" },
    "Action": "sts:AssumeRole",
    "Condition": {
      "StringEquals": { "sts:ExternalId": "acme-7f3d9c21-unique-per-customer" }
    }
  }]
}
# Without ExternalId: any other customer of that SaaS could trick it into
# assuming YOUR role. This is the confused deputy problem.
# The ExternalId must be generated BY THE VENDOR, uniquely per customer.

aws sts assume-role --role-arn arn:aws:iam::123456789012:role/vendor-access \\
  --role-session-name vendor --external-id acme-7f3d9c21-unique-per-customer`,

            `# ---------- Trust policy: GitHub Actions OIDC, no keys anywhere ----------
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {
      "Federated": "arn:aws:iam::123456789012:oidc-provider/token.actions.githubusercontent.com"
    },
    "Action": "sts:AssumeRoleWithWebIdentity",
    "Condition": {
      "StringEquals": {
        "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
      },
      "StringLike": {
        "token.actions.githubusercontent.com:sub": "repo:acme/orders-api:ref:refs/heads/main"
      }
    }
  }]
}
# CRITICAL: without the "sub" condition, ANY GitHub repo on the internet
# can assume this role. Pin org, repo AND ref. "repo:acme/*" is too loose.`,

            `# ---------- Reading the error tells you which document is broken ----------
# (A) TRUST POLICY problem — assumption itself was refused
# An error occurred (AccessDenied) when calling the AssumeRole operation:
#   User: arn:aws:iam::111122223333:user/alice is not authorized to perform:
#   sts:AssumeRole on resource: arn:aws:iam::444455556666:role/prod-deploy
#  -> fix the role's trust policy, or alice's own sts:AssumeRole permission

# (B) PERMISSION POLICY problem — assumption already succeeded
# An error occurred (AccessDenied) when calling the GetObject operation:
#   User: arn:aws:sts::444455556666:assumed-role/prod-deploy/alice-4417
#   is not authorized to perform: s3:GetObject on resource: ...
#  -> "assumed-role" in the ARN proves trust is fine. Fix the permissions.

# The caller's side of (A) — easy to forget, lives in the OTHER account:
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": "sts:AssumeRole",
    "Resource": "arn:aws:iam::444455556666:role/prod-deploy"
  }]
}`,
          ],
          questions: [
            {
              question: "What is the difference between a trust policy and a permission policy?",
              solution: "<p>The <strong>trust policy</strong> is the role's resource-based policy — it carries a <code>Principal</code> block and answers <em>who may assume this role</em>. STS evaluates it at assumption time. The <strong>permission policies</strong> are ordinary identity-based policies attached to the role and answer <em>what the role can do once assumed</em>; IAM evaluates them at call time. Every role must have exactly one trust policy and may have zero or many permission policies. Both must allow for an end-to-end call to work, and they fail at different moments with different error messages.</p>",
            },
            {
              question: "You get AccessDenied. How do you tell instantly whether it's the trust policy or the permission policy?",
              solution: "<p>Read the <strong>operation</strong> and the <strong>principal ARN</strong> in the message. If the operation is <code>sts:AssumeRole</code>, the assumption itself was refused — fix the role's trust policy, or grant the caller <code>sts:AssumeRole</code> in their own identity policy. If the operation is a normal API call like <code>s3:GetObject</code> and the principal reads <code>arn:aws:sts::...:assumed-role/rolename/session</code>, then assumption already succeeded and the trust policy is provably fine — the problem is the permission policy, a permissions boundary, an SCP, a session policy, or a resource policy on the target.</p>",
            },
            {
              question: "What is sts:ExternalId and when must you use it?",
              solution: "<p>It defends against the <strong>confused deputy</strong> problem when a third-party SaaS assumes a role in your account. Since the vendor's account is trusted by all of their customers, a flaw or abuse on their side could let customer B point the vendor at customer A's role ARN — and the assumption would succeed, because the vendor's account genuinely is trusted. Pinning <code>sts:ExternalId</code> in your trust policy adds a second factor that is unique to you and unknown to other customers. Two rules: the value must be generated <strong>by the vendor</strong>, uniquely per customer (so customers cannot guess each other's), and it must not be something predictable like your company name. Inside AWS, the equivalent controls are <code>aws:SourceArn</code> and <code>aws:SourceAccount</code> on service principals.</p>",
            },
            {
              question: "Your trust policy says Principal AWS arn:aws:iam::111122223333:root. What does that actually mean?",
              solution: "<p>Not \"the root user\". It means <strong>delegate trust to the whole of account 111122223333</strong>: any principal in that account may assume the role <em>provided that account's own administrators grant them <code>sts:AssumeRole</code></em> in an identity policy. So you are handing control of who gets in to the other account's IAM admins. That is the intended pattern for a trusted sibling account, but it is too broad for a third party or a low-trust account — there you name the specific role ARN, and add conditions such as <code>sts:ExternalId</code> or <code>aws:PrincipalOrgID</code>.</p>",
            },
            {
              question: "Why did a raw AROA... string appear in your trust policy where a role ARN used to be?",
              solution: "<p>Because the principal role was <strong>deleted</strong>. When you write a principal ARN, IAM internally stores the principal's <strong>unique ID</strong> (<code>AROA...</code> for roles, <code>AIDA...</code> for users) so that deleting and recreating a principal with the same name does not silently re-grant trust. When the principal no longer exists, IAM can no longer resolve the ID back to a friendly ARN and shows the raw ID. It is a safety feature, not corruption. Recreate the principal and rewrite the trust policy with the ARN — the new role has a new unique ID, so the old entry will never match it.</p>",
            },
            {
              question: "A GitHub Actions workflow assumes a role via OIDC. What is the one condition you must not omit?",
              solution: "<p>The <code>sub</code> condition — <code>token.actions.githubusercontent.com:sub</code> — pinning the exact org, repository and ref, for example <code>repo:acme/orders-api:ref:refs/heads/main</code>. Without it, the trust policy trusts the GitHub OIDC provider generally, which means <strong>any repository on GitHub</strong> can assume your role. Also set the <code>aud</code> condition to <code>sts.amazonaws.com</code>, avoid wildcards like <code>repo:acme/*</code> unless you genuinely mean every repo in the org, and use <code>ref:refs/heads/main</code> rather than matching pull requests if the role can deploy. This is one of the most frequently mis-configured trust policies in the wild.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_terms-and-concepts.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/confused-deputy.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-idp_oidc.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html",
          ],
        },
        {
          topic: "AWS STS — The Service That Issues Short-Lived Credentials",
          tags: ["aws", "sts", "temporary credentials", "federation", "session token", "regional endpoints"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>AWS STS (Security Token Service)</strong> is the credential vending machine of AWS. It does exactly one job: you show it proof that you are entitled to some identity, and it hands back a set of <strong>temporary credentials</strong> that expire. Every role assumption, every federated login, every EC2 instance quietly picking up credentials from metadata — all of it is STS underneath. IAM decides the rules; STS issues the keys.
</p>
<p style="line-height: 1.75;">The output is always the same three-part bundle, and it is worth being able to recite it:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>AccessKeyId</strong> — begins with <code>ASIA</code>, not <code>AKIA</code>. That prefix is your instant tell that a credential is temporary.</li>
  <li><strong>SecretAccessKey</strong> — used to sign requests, same as with a permanent key.</li>
  <li><strong>SessionToken</strong> — a long opaque blob that <strong>must</strong> be sent with every request as <code>X-Amz-Security-Token</code>. Forget it and you get <code>InvalidClientTokenId</code>, which is one of the most confusing errors in AWS because it looks like the key is wrong when the key is fine.</li>
</ul>
<p style="line-height: 1.75;">Plus an <strong>Expiration</strong> timestamp. After that moment the credentials are inert. Nothing needs to be revoked, nothing needs to be cleaned up, nobody needs to remember. That single property — automatic expiry — is the entire security argument for STS.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The API surface: six calls worth knowing</h4>
<div style="overflow-x: auto; margin-top: 0.75rem;">
<table style="width: 100%; border-collapse: collapse; font-size: 0.92rem;">
  <thead>
    <tr style="background: #f1f5f9; text-align: left;">
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;">API</th>
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;">Used when</th>
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;">Duration</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;"><code>AssumeRole</code></td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">An IAM principal takes a role — same or cross account</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">15 min – 12 h (role's max); 1 h if chained</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;"><code>AssumeRoleWithWebIdentity</code></td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">OIDC: GitHub Actions, EKS pods (IRSA), Cognito, Google</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">15 min – 12 h</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;"><code>AssumeRoleWithSAML</code></td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Corporate SSO via SAML 2.0 (ADFS, Okta, Entra ID)</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">15 min – 12 h</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;"><code>GetSessionToken</code></td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">An IAM <em>user</em> wants MFA-backed temporary creds (no role)</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">15 min – 36 h (1 h max for root)</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;"><code>GetFederationToken</code></td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Legacy custom identity broker; creds for a non-IAM user</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">15 min – 36 h</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;"><code>GetCallerIdentity</code></td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">"Who am I?" — needs <strong>no permissions at all</strong></td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">n/a</td></tr>
  </tbody>
</table>
</div>
<p style="line-height: 1.75;"><code>GetCallerIdentity</code> deserves a special mention as a debugging tool. Because it cannot be denied by an identity policy, it is the perfect first step in any access investigation: if it succeeds, your credentials are valid and the problem is purely authorisation; if it fails, the problem is authentication — a bad key, a missing session token, clock skew. It also answers the very common confusion "am I actually using the role I think I'm using?", which is worth checking before spending an hour editing policies.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What you can pass in, and why it matters</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>RoleSessionName</strong> (required). Appears in the resulting ARN and in every CloudTrail event. This is how a shared role still produces per-person audit trails.</li>
  <li><strong>DurationSeconds.</strong> Bounded by the role's <code>MaxSessionDuration</code>. Shorter is better; there is rarely a good reason for a 12-hour session on a privileged role.</li>
  <li><strong>Policy / PolicyArns (session policies).</strong> An extra policy evaluated as an <em>intersection</em> with the role's own permissions. It can only narrow. This is how a broad role is safely handed to a narrow job — for example a general data-access role scoped down to one customer's prefix for one request.</li>
  <li><strong>Tags and TransitiveTagKeys (session tags).</strong> Key-value pairs carried on the session and usable in conditions as <code>aws:PrincipalTag/...</code>. Transitive tags survive role chaining. This is the engine of attribute-based access control.</li>
  <li><strong>SerialNumber and TokenCode.</strong> The MFA device ARN and current code, when the trust policy requires MFA.</li>
  <li><strong>ExternalId.</strong> The third-party confused-deputy defence.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Global vs regional endpoints — a real production concern</h4>
<p style="line-height: 1.75;">Historically all STS traffic went to <code>sts.amazonaws.com</code>, a global endpoint physically served from us-east-1. That created two problems: extra latency for workloads far from Virginia, and a dependency on one region for what is otherwise a regional workload. AWS added <strong>regional endpoints</strong> such as <code>sts.eu-west-1.amazonaws.com</code>, and modern SDKs default to regional. You should explicitly prefer regional, both for resilience and because the global endpoint's tokens have a compatibility wrinkle.</p>
<p style="line-height: 1.75;">That wrinkle is the <strong>session token version</strong>. Tokens from the global endpoint are, by default, only valid in regions enabled by default. If you have opted into a newer region (say Milan or Cape Town) and your credentials were minted globally, calls into that region can fail with a puzzling error. The account-level setting is <em>"Global endpoint token version"</em> — set it to version 2 so tokens are valid in all regions, and set <code>AWS_STS_REGIONAL_ENDPOINTS=regional</code> in older SDKs. This is an excellent "have you actually run this in production?" interview question.</p>
<p style="line-height: 1.75;">Related: STS activity <strong>can be deactivated per region</strong>. If someone has turned STS off in a region, role assumption there fails while everything else looks healthy.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">How workloads get credentials without ever calling STS themselves</h4>
<p style="line-height: 1.75;">Most code never calls STS explicitly, which is why many people underestimate how central it is. The SDK credential chain does it invisibly:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>EC2:</strong> the SDK reads the Instance Metadata Service at <code>169.254.169.254</code>; EC2 has already assumed the instance profile's role and refreshes it in the background, typically hours before expiry.</li>
  <li><strong>Lambda:</strong> credentials arrive as environment variables — <code>AWS_ACCESS_KEY_ID</code>, <code>AWS_SECRET_ACCESS_KEY</code>, <code>AWS_SESSION_TOKEN</code> — already minted for the execution role.</li>
  <li><strong>ECS/Fargate:</strong> the SDK fetches from the container credentials endpoint named by <code>AWS_CONTAINER_CREDENTIALS_RELATIVE_URI</code>.</li>
  <li><strong>EKS (IRSA/Pod Identity):</strong> a projected service-account token is exchanged via <code>AssumeRoleWithWebIdentity</code>, driven by <code>AWS_WEB_IDENTITY_TOKEN_FILE</code> and <code>AWS_ROLE_ARN</code>.</li>
  <li><strong>Local dev:</strong> a profile in <code>~/.aws/config</code> with <code>role_arn</code> and <code>source_profile</code>, or <code>aws sso login</code>, causes the CLI to assume and cache automatically.</li>
</ul>
<p style="line-height: 1.75;">The practical lesson: if your code contains a literal call to <code>assume_role</code> followed by manual credential juggling, you are usually re-implementing something the SDK already does better, including refresh-before-expiry.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Expiry, refresh and revocation</h4>
<p style="line-height: 1.75;">Credentials expire; they are not revoked. That has a sharp consequence: <strong>detaching a policy or even deleting the role does not necessarily stop an in-flight session immediately</strong>. If you must kill sessions now, the standard move is an inline Deny conditioned on <code>aws:TokenIssueTime</code> being earlier than the current moment. Every credential minted before that instant dies; new assumptions still work. The console exposes this as "Revoke active sessions".</p>
<p style="line-height: 1.75;">For long-running jobs, do not catch <code>ExpiredToken</code> and retry blindly — configure the SDK to refresh, or shorten the unit of work. And when logging, never log the <code>SessionToken</code>; it is a bearer credential, and a session token in a log file is as dangerous as a password until it expires.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">STS in monitoring and detection</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Every STS call is a CloudTrail event. Alert on <code>AssumeRole</code> against privileged roles, on assumptions from unexpected source IPs, and on a spike in <code>GetSessionToken</code>.</li>
  <li>GuardDuty raises <code>UnauthorizedAccess:IAMUser/InstanceCredentialExfiltration</code> when credentials minted for an EC2 instance are used from outside AWS — a strong signal of a stolen role credential.</li>
  <li><code>sts:GetCallerIdentity</code> from a strange network, repeatedly, is a classic attacker reconnaissance pattern since it cannot be denied.</li>
</ul>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">GetSessionToken and GetFederationToken, and when they are right</h4>
<p style="line-height: 1.75;">These two are less glamorous than <code>AssumeRole</code> but they show up in interviews as differentiators, because most candidates cannot say what they are for.</p>
<p style="line-height: 1.75;"><strong><code>GetSessionToken</code></strong> takes an IAM user's long-term credentials plus an MFA code and returns temporary credentials that carry the <code>aws:MultiFactorAuthPresent</code> context. That last part is the point. Many organisations write policies that deny sensitive actions unless MFA is present, but MFA context is not attached to a plain access key — so the user calls <code>GetSessionToken</code> with their MFA device, and the resulting session satisfies the condition. It returns credentials with the <strong>same permissions as the user</strong> (it cannot escalate, and in fact it is further restricted: you cannot call most IAM APIs or <code>GetFederationToken</code> with them), for 15 minutes to 36 hours. If your organisation still has IAM users, this is the mechanism behind the MFA-protected CLI workflow.</p>
<p style="line-height: 1.75;"><strong><code>GetFederationToken</code></strong> is the older pattern for a custom identity broker: a trusted application authenticates a user by its own means, then calls <code>GetFederationToken</code> to mint credentials for a "federated user" who has no IAM identity. The resulting permissions are the intersection of the calling user's permissions and a policy you pass in. It has largely been superseded by <code>AssumeRoleWithWebIdentity</code> and Identity Center, and the main reason to know it is that it still appears in legacy systems and in exam questions. One notable use that survives: generating a sign-in URL for the AWS console for a federated user.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Session tags and ABAC, worked through</h4>
<p style="line-height: 1.75;">Session tags are the feature that turns STS from a credential vendor into an authorisation mechanism, so they deserve more than a bullet. The idea: at assume time you attach key-value pairs to the session, and those become available in policy conditions as <code>aws:PrincipalTag/&lt;key&gt;</code>. A policy can then compare a principal tag to a resource tag, which means one document serves an unlimited number of teams, projects or tenants.</p>
<p style="line-height: 1.75;">The mechanics worth remembering:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Passing tags requires <strong><code>sts:TagSession</code></strong> in both the caller's identity policy and the role's trust policy. This is separate from <code>sts:AssumeRole</code> and is the most common reason tagged assumption fails.</li>
  <li>Tags can be <strong>transitive</strong>. Non-transitive tags are lost on the next assumption in a chain; transitive ones survive, and cannot be overridden downstream. If your access model depends on a tag, make it transitive.</li>
  <li>With federation, tags can be <strong>supplied by the IdP</strong> — a SAML attribute or an OIDC claim maps straight into a session tag, which means your corporate directory becomes the source of truth for AWS authorisation without any synchronisation job.</li>
  <li>There are limits: 50 session tags, key and value lengths as elsewhere in AWS, and tag keys are case-insensitive for matching purposes in most contexts — worth testing rather than assuming.</li>
</ul>
<p style="line-height: 1.75;">The payoff is architectural. With role-based access you add a role every time you add a team, and eventually you hit the 1,000-role quota and a policy-management problem. With attribute-based access you add a tag. That difference is why ABAC is the standard answer to "how would you scale this to two hundred teams?"</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Where STS fits in the credential providers of each SDK</h4>
<p style="line-height: 1.75;">It is worth being concrete about the fact that almost nobody should call STS directly, because interviewers sometimes probe whether you know the library-level answer:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Python (boto3/botocore)</strong> — configure <code>role_arn</code> and <code>source_profile</code> in <code>~/.aws/config</code>, and botocore's <code>AssumeRoleCredentialFetcher</code> handles assumption, caching and refresh. In code, a <code>Session</code> with a profile name is usually all you need.</li>
  <li><strong>Java</strong> — <code>StsAssumeRoleCredentialsProvider</code>, which refreshes in the background by default.</li>
  <li><strong>Node.js (v3)</strong> — <code>fromTemporaryCredentials</code> or <code>fromNodeProviderChain</code>, both of which handle the refresh loop.</li>
  <li><strong>Go</strong> — <code>stscreds.NewAssumeRoleProvider</code> wrapped in <code>aws.NewCredentialsCache</code>.</li>
  <li><strong>CLI</strong> — a profile with <code>role_arn</code>, plus <code>credential_process</code> if you need a custom credential source.</li>
</ul>
<p style="line-height: 1.75;">The reason this matters practically: every one of these implements <strong>refresh before expiry</strong>, and hand-rolled code almost never does. A job that calls <code>assume_role</code> once at startup and stores the strings will fail an hour later, and the failure will look intermittent and mysterious because it depends on how long the job runs. If you see that pattern in a codebase, it is worth fixing before it causes an incident.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Failure modes and their real causes</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong><code>InvalidClientTokenId</code></strong> — usually a missing or mismatched <code>AWS_SESSION_TOKEN</code>. All three values travel together; two out of three is worse than none.</li>
  <li><strong><code>ExpiredToken</code></strong> — the session ended. Either the job outlived its credentials (refresh, or shorten the unit of work) or you chained and hit the one-hour cap.</li>
  <li><strong><code>SignatureDoesNotMatch</code></strong> — clock skew beyond roughly five minutes, whitespace in a copied secret, or a proxy rewriting the request after signing.</li>
  <li><strong><code>AccessDenied</code> on <code>AssumeRole</code></strong> — a trust policy or caller-permission problem, never a permission-policy problem.</li>
  <li><strong><code>RegionDisabledException</code></strong> — STS has been deactivated in that region in account settings.</li>
  <li><strong>Throttling</strong> — STS is rate limited per account and region; caching the session rather than assuming per request is the fix, and it is what the SDK providers already do.</li>
  <li><strong>Opt-in region failures</strong> — global-endpoint tokens at version 1. Set <code>v2Token</code> and prefer regional endpoints.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Treating session tokens as secrets</h4>
<p style="line-height: 1.75;">One final operational point that gets overlooked because temporary credentials feel safe: a live session token is a <strong>bearer credential</strong>. Anyone holding it can act as that role until it expires, with no additional proof required. That means the usual rules apply and then some — never log the credential bundle, never put it in a URL or a query string, never pass it through a system that records request bodies, and be careful with debug output in CI, which is frequently world-readable in open-source projects.</p>
<p style="line-height: 1.75;">The mitigations are the ones already covered, applied deliberately: short <code>MaxSessionDuration</code>, IMDSv2 with hop limit 1 so credentials are harder to steal in the first place, GuardDuty for exfiltration detection, and the <code>aws:TokenIssueTime</code> deny as the emergency stop. Expiry limits the damage window, but it does not make the window zero — which is exactly why "temporary" is a mitigation rather than a solution.</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The console federation flow, end to end</h4>
<p style="line-height: 1.75;">One STS capability that comes up in design discussions is generating a <strong>console sign-in URL</strong> for a federated user — letting someone log into the AWS console without an IAM user, from your own application. The flow is worth being able to describe because it ties several pieces together.</p>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li>Your broker application authenticates the person by its own means — corporate login, your app's session, whatever you already trust.</li>
  <li>The broker calls <code>AssumeRole</code> (or the older <code>GetFederationToken</code>) to obtain temporary credentials appropriate to that person.</li>
  <li>The broker posts those credentials to the AWS federation endpoint and receives a <strong>sign-in token</strong>.</li>
  <li>The broker builds a URL containing that token plus a destination console page, and redirects the user to it.</li>
  <li>The person lands in the console as the assumed role, for the life of the session.</li>
</ol>
<p style="line-height: 1.75;">In practice Identity Center replaces most of this, but the flow explains something useful: console access and API access are the same credentials underneath, and "logging into the console" is not a separate authentication system. It also explains why a console session inherits every constraint of the role it came from, including session policies and boundaries.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">STS as an identity oracle</h4>
<p style="line-height: 1.75;">A small but genuinely useful pattern: because <code>sts:GetCallerIdentity</code> requires no permissions and returns a signed, verifiable answer about who the caller is, it can be used as a lightweight <strong>proof of identity to an external system</strong>. A service outside AWS can ask a client to present a pre-signed <code>GetCallerIdentity</code> request; the service forwards it to STS, and the response tells it definitively which AWS principal the client is. This is precisely how HashiCorp Vault's IAM auth method works, and how several systems bootstrap trust with AWS workloads without provisioning any additional secret.</p>
<p style="line-height: 1.75;">It is worth knowing for two reasons. It is a neat illustration of the fact that STS is fundamentally an identity service rather than merely a key dispenser. And it is a reminder that <em>unauthenticated does not mean unauthenticated-to-everything</em>: an API requiring no IAM permission can still be a meaningful security primitive.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">A summary of the mental model</h4>
<p style="line-height: 1.75;">If you hold one picture of STS, hold this: <strong>IAM writes the rules, STS issues the keys, and every key it issues has a timer on it.</strong> Roles, federation, instance profiles, task roles, IRSA, Identity Center and Roles Anywhere are all different answers to the question "how do you prove you deserve a key?" — but the key itself is always the same shape, always expires, and always carries a session identity that lands in CloudTrail. Once that picture is solid, the rest of the topic is detail.</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Caching, and why it is not optional at scale</h4>
<p style="line-height: 1.75;">A last operational point that separates code that works in testing from code that works in production: <strong>credentials should be cached for their lifetime and refreshed shortly before expiry, never fetched per request.</strong> Assuming a role on every API call turns one call into two, doubles latency, and will eventually hit STS throttling — which manifests as intermittent failures under load, the worst kind of bug to diagnose.</p>
<p style="line-height: 1.75;">Every SDK credential provider already does this correctly: it holds the session, checks expiry before each use, and refreshes in the background with a safety margin, typically several minutes. The CLI additionally caches assumed-role sessions on disk under <code>~/.aws/cli/cache</code> so that repeated commands do not re-assume. Problems appear only when someone bypasses the provider and manages the strings by hand.</p>
<p style="line-height: 1.75;">The related design note is to size sessions to the work. A request handler wants a long-lived cached session refreshed in the background; a batch job wants a session comfortably longer than its runtime, or a provider that refreshes mid-run; a per-tenant scope-down wants a session cached per tenant rather than per request. In all three cases the thing to avoid is the same: treating credentials as something you fetch, rather than something you hold and renew.</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What to say if you only get one sentence</h4>
<p style="line-height: 1.75;">STS is the service that converts a proof of entitlement into a short-lived credential, and it is the reason the role model works at all: without a way to mint and expire credentials on demand, every identity in AWS would have to hold a permanent secret. Every mechanism you have heard of for giving something access to AWS without a stored key — instance profiles, execution roles, IRSA, GitHub OIDC, Identity Center, Roles Anywhere — is a different front door onto the same STS call, and the credential that comes out the other side is identical in every case: an <code>ASIA</code> key, a secret, a session token and an expiry timestamp.</p>

<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "STS is the service that issues temporary credentials. You prove entitlement — by assuming a role, presenting an OIDC token, or a SAML assertion — and it returns an access key starting <code>ASIA</code>, a secret, a session token that must be sent on every request, and an expiry. The main APIs are <code>AssumeRole</code>, <code>AssumeRoleWithWebIdentity</code> for OIDC like GitHub Actions and EKS IRSA, <code>AssumeRoleWithSAML</code> for corporate SSO, <code>GetSessionToken</code> for MFA-backed user credentials, and <code>GetCallerIdentity</code>, which needs no permissions and is my first debugging step. In production I use regional endpoints rather than the global one, set global token version 2 so tokens work in opt-in regions, and revoke sessions with a Deny on <code>aws:TokenIssueTime</code> rather than assuming detaching a policy kills them."</div>
</div>`,
          examples: [
            `# ---------- The bundle STS returns, and the prefix that identifies it ----------
aws sts assume-role \\
  --role-arn arn:aws:iam::123456789012:role/data-reader \\
  --role-session-name alice-analysis \\
  --duration-seconds 3600

# {
#   "Credentials": {
#     "AccessKeyId":     "ASIAX...",     <-- ASIA, not AKIA = temporary
#     "SecretAccessKey": "...",
#     "SessionToken":    "IQoJb3JpZ2luX2VjE...",   <-- REQUIRED on every call
#     "Expiration":      "2026-09-14T14:30:00Z"
#   },
#   "AssumedRoleUser": {
#     "AssumedRoleId": "AROAX...:alice-analysis",
#     "Arn": "arn:aws:sts::123456789012:assumed-role/data-reader/alice-analysis"
#   }
# }

# Forgetting AWS_SESSION_TOKEN gives InvalidClientTokenId - the key looks
# wrong but is fine. All three values or none.`,

            `# ---------- GetCallerIdentity: the free debugging call ----------
# Cannot be denied by any identity policy. Always your FIRST step.
aws sts get-caller-identity
# {
#   "UserId":  "AROAX...:alice-analysis",
#   "Account": "123456789012",
#   "Arn":     "arn:aws:sts::123456789012:assumed-role/data-reader/alice-analysis"
# }
#
# It SUCCEEDS  -> credentials are valid; your problem is authorisation.
# It FAILS     -> authentication: bad key, missing session token, clock skew.
# The Arn also settles "am I even using the role I think I am?"`,

            `# ---------- Session policy: narrow a broad role for one job ----------
cat > scope-down.json <<'EOF'
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::acme-data/customer-4417/*"
  }]
}
EOF

aws sts assume-role \\
  --role-arn arn:aws:iam::123456789012:role/data-reader \\
  --role-session-name tenant-4417 \\
  --policy file://scope-down.json

# Effective permissions = role policy INTERSECT session policy.
# A session policy can only NARROW, never widen. This is how one role
# safely serves many tenants.`,

            `# ---------- Session tags: the basis of ABAC ----------
aws sts assume-role \\
  --role-arn arn:aws:iam::123456789012:role/project-worker \\
  --role-session-name build-4417 \\
  --tags Key=Project,Value=orders Key=Env,Value=staging \\
  --transitive-tag-keys Project

# The role policy then needs no per-project resource list at all:
# {
#   "Effect": "Allow",
#   "Action": "s3:GetObject",
#   "Resource": "*",
#   "Condition": {
#     "StringEquals": {
#       "s3:ExistingObjectTag/Project": "\${aws:PrincipalTag/Project}"
#     }
#   }
# }
# Transitive tags survive role chaining; non-transitive ones do not.`,

            `# ---------- Regional endpoints, token version, and killing sessions ----------
# Prefer regional over the global (us-east-1-served) endpoint
export AWS_STS_REGIONAL_ENDPOINTS=regional
aws sts get-caller-identity --endpoint-url https://sts.eu-west-1.amazonaws.com

# Make global-endpoint tokens valid in opt-in regions (Milan, Cape Town...)
aws iam set-security-token-service-preferences \\
  --global-endpoint-token-version v2Token

# Is STS even enabled in that region?
aws iam get-account-summary
aws iam list-sts-regional-endpoints 2>/dev/null || \\
  echo "check IAM console > Account settings > STS region status"

# Kill every credential issued so far WITHOUT breaking future assumptions
aws iam put-role-policy --role-name data-reader \\
  --policy-name RevokeOlderSessions \\
  --policy-document '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Deny", "Action": "*", "Resource": "*",
      "Condition": {"DateLessThan": {"aws:TokenIssueTime": "2026-09-14T12:00:00Z"}}
    }]
  }'`,
          ],
          questions: [
            {
              question: "What is AWS STS and what does it return?",
              solution: "<p>STS is the service that issues <strong>temporary credentials</strong>. You present proof of entitlement — an IAM principal assuming a role, an OIDC token, a SAML assertion, or an MFA code — and it returns four things: an <code>AccessKeyId</code> beginning <code>ASIA</code>, a <code>SecretAccessKey</code>, a <code>SessionToken</code> that must accompany <strong>every</strong> signed request, and an <code>Expiration</code>. After expiry the credentials are simply inert, with nothing to revoke or clean up — which is the whole security argument for using roles rather than long-lived keys.</p>",
            },
            {
              question: "What is the difference between AssumeRole, AssumeRoleWithWebIdentity and AssumeRoleWithSAML?",
              solution: "<p>All three return the same kind of temporary credentials; they differ in <em>how you prove entitlement</em>. <strong><code>AssumeRole</code></strong> is for an existing IAM principal — a user or another role, same account or cross-account — and requires the caller to already have AWS credentials. <strong><code>AssumeRoleWithWebIdentity</code></strong> takes an OIDC token from a public or configured identity provider, which is how GitHub Actions, EKS IRSA, Cognito and Google sign-in work — no AWS credentials needed at all. <strong><code>AssumeRoleWithSAML</code></strong> takes a SAML 2.0 assertion from a corporate IdP such as ADFS, Okta or Entra ID. The last two are how you eliminate long-lived keys from CI and from human access respectively.</p>",
            },
            {
              question: "Why is sts:GetCallerIdentity such a useful debugging command?",
              solution: "<p>Because it requires <strong>no permissions</strong> — it cannot be denied by an identity policy — so it cleanly separates authentication from authorisation. If it succeeds, your credentials are valid and any failure you are chasing is an authorisation problem. If it fails, the problem is authentication: a malformed key, a missing <code>AWS_SESSION_TOKEN</code>, or clock skew beyond the roughly five-minute SigV4 tolerance. It also prints the exact principal ARN, which resolves the very common \"am I actually using the role I think I am, or a stale profile?\" question before you waste an hour editing policies.</p>",
            },
            {
              question: "What is a session policy and how does it combine with the role's own permissions?",
              solution: "<p>A session policy is an extra policy passed at assume time via <code>--policy</code> or <code>--policy-arns</code>. It is evaluated as an <strong>intersection</strong> with the role's identity policies: the effective permission set is what <em>both</em> allow, so a session policy can only <strong>narrow</strong>, never widen. That makes it the right tool for multi-tenant scope-down — one broad data-access role, assumed per request with a session policy limiting it to one customer's prefix — and for handing a contractor a temporary, tighter slice of an existing role without creating a new one. Permissions boundaries work the same intersecting way but are attached to the identity rather than passed per session.</p>",
            },
            {
              question: "Your workload works in eu-west-1 but fails in an opt-in region like eu-south-1. What STS setting do you check?",
              solution: "<p>The <strong>global endpoint token version</strong>. Credentials minted from the global endpoint <code>sts.amazonaws.com</code> are, with version 1 tokens, only valid in regions that are enabled by default — so calls into an opt-in region such as Milan or Cape Town fail with a confusing error even though the permissions are correct. Set the account preference to <code>v2Token</code> with <code>iam set-security-token-service-preferences</code>, and prefer <strong>regional endpoints</strong> anyway (<code>AWS_STS_REGIONAL_ENDPOINTS=regional</code>) for lower latency and to avoid a hard dependency on us-east-1. Also confirm STS has not been deactivated in that region in IAM account settings.</p>",
            },
            {
              question: "You suspect a role's temporary credentials have been stolen. What do you do?",
              solution: "<p>Detaching policies is not reliably instant for in-flight sessions, so attach an inline <strong>Deny</strong> to the role conditioned on <code>aws:TokenIssueTime</code> being earlier than now — the console calls this \"Revoke active sessions\". That invalidates every credential issued up to that moment while allowing new, legitimate assumptions to continue. Then fix the cause: tighten or repair the trust policy, check CloudTrail for what the session did and from where, and look for the GuardDuty finding <code>InstanceCredentialExfiltration</code>, which fires when EC2 role credentials are used from outside AWS. Long term, shorten <code>MaxSessionDuration</code> and enforce IMDSv2 so credentials are harder to steal in the first place.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/STS/latest/APIReference/welcome.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_request.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_enable-regions.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#policies_session",
          ],
        },
        {
          topic: "sts:AssumeRole — The API Call Behind “Assuming a Role”",
          tags: ["aws", "sts", "assumerole", "cross-account", "role chaining", "cloudtrail", "session"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  "Assuming a role" sounds abstract until you realise it is one ordinary API call. <strong><code>sts:AssumeRole</code></strong> is an HTTPS request you sign with credentials you already have, naming a role you want to become; STS replies with credentials for that role. Nothing magical happens. Once you see it as a plain request and response, every confusing thing about roles — chaining, duration caps, cross-account, who needs which permission — becomes mechanical.
</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The call, step by step</h4>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li>You already hold <em>some</em> valid credentials — an IAM user's keys, an instance profile's credentials, another assumed-role session. You must have something; <code>AssumeRole</code> is a signed call.</li>
  <li>You call STS with, at minimum, <code>RoleArn</code> and <code>RoleSessionName</code>.</li>
  <li>STS performs <strong>two authorisation checks</strong>, and this is the part people miss:
    <ul style="margin-left: 1.5rem; list-style: circle;">
      <li>Does the <strong>role's trust policy</strong> allow this caller? (resource side)</li>
      <li>Does the <strong>caller's identity policy</strong> allow <code>sts:AssumeRole</code> on that role ARN? (identity side)</li>
    </ul>
  </li>
  <li>If both pass — plus any conditions such as MFA, ExternalId or source IP — STS mints credentials and returns them with an expiry.</li>
  <li>You use those credentials for subsequent calls. You are now, for audit purposes, <code>arn:aws:sts::123456789012:assumed-role/&lt;role&gt;/&lt;session-name&gt;</code>.</li>
</ol>
<p style="line-height: 1.75;">The one exception to step 3 is that if the trust policy names a <em>specific</em> principal in the <em>same</em> account, that alone can be sufficient. Cross-account always requires both sides. Because the exception is narrow and easy to get wrong, the safe habit is to always write both documents.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Parameters that matter in real use</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong><code>RoleArn</code></strong> (required) — which role. Cross-account simply means the account number in this ARN differs from yours; there is no separate "cross-account API".</li>
  <li><strong><code>RoleSessionName</code></strong> (required) — 2–64 characters. This is your audit identity. Use something meaningful: <code>alice@acme.com</code>, <code>jenkins-build-4417</code>, <code>incident-2026-09-14</code>. Never <code>session1</code>.</li>
  <li><strong><code>DurationSeconds</code></strong> — 900 to the role's <code>MaxSessionDuration</code> (default 3600, max 43200). Ask for the shortest workable value.</li>
  <li><strong><code>ExternalId</code></strong> — required when the trust policy demands it; the third-party confused-deputy defence.</li>
  <li><strong><code>SerialNumber</code> + <code>TokenCode</code></strong> — MFA device ARN and the current six digits.</li>
  <li><strong><code>Policy</code> / <code>PolicyArns</code></strong> — session policies, intersected with the role's permissions. Narrow only.</li>
  <li><strong><code>Tags</code> / <code>TransitiveTagKeys</code></strong> — session tags for ABAC. Tagging requires the caller to hold <code>sts:TagSession</code>, which is a separate action from <code>sts:AssumeRole</code> and is a frequent oversight.</li>
  <li><strong><code>SourceIdentity</code></strong> — a value the caller sets that, unlike the session name, <strong>cannot be changed on chaining</strong> and propagates through subsequent assumptions. This is the right way to carry a human's real identity through a chain of roles for audit.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Role chaining and the one-hour wall</h4>
<p style="line-height: 1.75;"><strong>Role chaining</strong> means calling <code>AssumeRole</code> using credentials that are themselves an assumed-role session. It is completely normal — a user assumes a hub role in the identity account, then assumes a spoke role in a workload account. But there is a hard rule: a <strong>chained session is capped at one hour</strong>, regardless of the target role's <code>MaxSessionDuration</code>, and asking for more than 3600 seconds returns an error rather than silently truncating.</p>
<p style="line-height: 1.75;">This produces one of the classic production mysteries: a batch job that runs fine for 55 minutes and then dies with <code>ExpiredToken</code>, while the same role works for twelve hours when assumed directly. The fixes, in order of preference: assume the target role directly rather than chaining; refresh credentials inside the job (the SDK will do this if you configure the profile rather than passing static values); or break the work into sub-hour units.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What you almost never need to write by hand</h4>
<p style="line-height: 1.75;">The CLI and SDKs assume roles for you if you configure a profile. This matters because hand-rolled assumption code usually forgets to refresh, hard-codes durations, or logs the session token. Configure <code>role_arn</code> plus <code>source_profile</code> (or <code>credential_source = Ec2InstanceMetadata</code> on an instance) in <code>~/.aws/config</code> and the SDK handles assumption, caching to <code>~/.aws/cli/cache</code>, MFA prompting, and refresh-before-expiry. In application code, use the provider abstractions — <code>STSAssumeRoleSessionCredentialsProvider</code> in Java, <code>AssumeRoleCredentialFetcher</code> under the hood in boto3 — rather than calling <code>assume_role</code> and passing strings around.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The related actions, and why the distinction matters</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><code>sts:AssumeRole</code> — an IAM principal assumes a role.</li>
  <li><code>sts:AssumeRoleWithWebIdentity</code> — OIDC. Notably, <strong>no AWS credentials are required to make this call</strong>; the OIDC token is the proof. That is why the trust policy conditions are the <em>only</em> thing protecting you, and why an unpinned GitHub OIDC trust policy is so dangerous.</li>
  <li><code>sts:AssumeRoleWithSAML</code> — SAML assertion, likewise no pre-existing AWS credentials.</li>
  <li><code>sts:TagSession</code> — needed in addition when passing session tags.</li>
  <li><code>sts:SetSourceIdentity</code> — needed in addition when setting <code>SourceIdentity</code>.</li>
</ul>
<p style="line-height: 1.75;">A trust policy that allows <code>sts:AssumeRole</code> but not <code>sts:TagSession</code> will reject a tagged assumption, with an error that does not obviously point at tags. Both the trust policy and the caller's identity policy need the extra action.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What CloudTrail records, and how to read it</h4>
<p style="line-height: 1.75;">An <code>AssumeRole</code> event records the caller (<code>userIdentity</code>), the target role (<code>requestParameters.roleArn</code>), the session name, the source IP, and the resulting <code>assumedRoleUser</code>. Every subsequent call made with those credentials shows the <code>assumed-role/role/session</code> ARN, plus a <code>sessionContext</code> block containing <code>sessionIssuer</code> — which tells you which role issued the session — and, if set, <code>sourceIdentity</code>.</p>
<p style="line-height: 1.75;">Investigations therefore go: find the suspicious action, read its <code>sessionContext</code> to get the role and session name, then search for the <code>AssumeRole</code> event that created that session to find the original human or machine. This is why meaningful session names are not a nicety — they are the join key of the whole audit trail. If your organisation uses chaining, <code>SourceIdentity</code> is what makes this reliable, because session names can be changed at each hop but source identity cannot.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Security considerations</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Who can assume what is a graph, not a list.</strong> If role A can assume role B and B can assume admin, then A is admin. Tools like <code>PMapper</code> and IAM Access Analyzer exist because humans are bad at seeing these paths by inspection.</li>
  <li><strong><code>sts:AssumeRole</code> on <code>Resource: "*"</code></strong> in an identity policy is a serious finding — it means "may become any role that trusts this account", which is often a lot of roles.</li>
  <li><strong>Alert on assumption of privileged roles</strong> and on assumptions from outside your expected network ranges.</li>
  <li><strong>Cap <code>MaxSessionDuration</code></strong> on privileged roles. Twelve-hour admin sessions exist mostly because someone found re-authenticating annoying.</li>
  <li><strong>Require MFA</strong> in the trust policy for any human-assumable role that can change infrastructure.</li>
</ul>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The permission graph: why "who can assume what" is the real question</h4>
<p style="line-height: 1.75;">The most important consequence of <code>sts:AssumeRole</code> being an ordinary API call is that <strong>assumption is transitive</strong>. If principal A may assume role B, and role B may assume role C, then A effectively has C's permissions — even though no document anywhere says so. Permissions in AWS therefore form a <em>directed graph</em>, not a list, and reading individual policies will never reveal the paths through it.</p>
<p style="line-height: 1.75;">This is not a theoretical concern; it is how most real AWS privilege escalations work. A developer role with <code>sts:AssumeRole</code> on <code>Resource: "*"</code> can reach every role in the account whose trust policy delegates to the account root — which, in a typical account, includes several roles nobody thinks of as sensitive but which hold <code>iam:PassRole</code> or <code>lambda:UpdateFunctionCode</code>, and from there the path to administrator is two hops.</p>
<p style="line-height: 1.75;">What to do about it:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Never grant <code>sts:AssumeRole</code> on <code>"*"</code>.</strong> Scope to named ARNs, or at minimum to a path such as <code>arn:aws:iam::123456789012:role/dev/*</code>.</li>
  <li><strong>Be deliberate about <code>:root</code> trust.</strong> Delegating to an entire account is convenient and means the target role is reachable by anyone that account's admins permit — which may be more people than you imagine.</li>
  <li><strong>Map the graph with a tool.</strong> PMapper builds the assume-role and escalation graph for an account and answers questions like "which principals can reach administrator?". IAM Access Analyzer's external-access findings cover the cross-account edges of the same graph.</li>
  <li><strong>Alarm on the sensitive edges.</strong> Assumption of break-glass or admin roles should page someone, not just land in a log.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">SourceIdentity: the attribute that survives the chain</h4>
<p style="line-height: 1.75;">Session names are set by the caller on every hop, which makes them useful but not trustworthy: a caller can name their session anything, and in a chain each hop can rename it. <strong><code>SourceIdentity</code></strong> fixes this. Set once at the first assumption, it propagates through every subsequent assumption in the chain and <strong>cannot be changed</strong>. It appears in CloudTrail on every call made by any session in that chain.</p>
<p style="line-height: 1.75;">Two things make it powerful. First, you can <em>require</em> it in a trust policy — deny assumption unless <code>sts:SourceIdentity</code> is present, and constrain its format — so that no session in your organisation exists without an attributable origin. Second, federation can set it automatically from the IdP's assertion, meaning every human's corporate identity follows them through every role hop without anyone remembering to pass it.</p>
<p style="line-height: 1.75;">The permission needed is <code>sts:SetSourceIdentity</code>, in both the caller's policy and the trust policy, alongside <code>sts:AssumeRole</code>. If you are designing a multi-account access model and an auditor asks "can you prove which human did this?", <code>SourceIdentity</code> is the mechanism that lets you answer yes rather than "probably, if the session names were honest".</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Duration: the four caps that interact</h4>
<p style="line-height: 1.75;">Session length is governed by four different limits, and confusing them produces most of the "why did my session end early?" questions:</p>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>The role's <code>MaxSessionDuration</code></strong> — a property of the role, default 3600 seconds, settable from 1 to 12 hours. This is the ceiling for direct assumption.</li>
  <li><strong>The requested <code>DurationSeconds</code></strong> — must be between 900 and the role's maximum. Asking for more is a validation error, not a silent truncation.</li>
  <li><strong>The one-hour chaining cap</strong> — applies whenever the calling credentials are themselves an assumed-role session, and overrides <code>MaxSessionDuration</code> downward.</li>
  <li><strong>The identity provider's own limits</strong> — for SAML and OIDC federation, the assertion or token may carry its own session length, and Identity Center permission sets have a configurable duration that applies on top.</li>
</ol>
<p style="line-height: 1.75;">There is also a condition key, <code>sts:DurationSeconds</code>, which lets a trust policy <em>enforce</em> a maximum rather than merely offering one — useful for privileged roles where you want to guarantee nobody takes a twelve-hour admin session regardless of what <code>MaxSessionDuration</code> says.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">A cross-account debugging runbook</h4>
<p style="line-height: 1.75;">Cross-account assumption failures are the single most common IAM ticket, and they are quick to resolve if you work in a fixed order rather than guessing:</p>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Confirm who you are.</strong> <code>aws sts get-caller-identity</code>. Surprisingly often the answer is "a stale profile", and the investigation ends here.</li>
  <li><strong>Read the error's operation name.</strong> <code>AssumeRole</code> means you are still at the door. Anything else means you are already inside and looking at the wrong document.</li>
  <li><strong>Read the error's principal.</strong> If it names your user or role, your own identity policy is missing <code>sts:AssumeRole</code>. If it names the target role, the trust policy is the problem.</li>
  <li><strong>Fetch the trust policy</strong> — <code>aws iam get-role --role-name X --query Role.AssumeRolePolicyDocument</code> — and check the principal string character by character. Look for a raw <code>AROA...</code> ID, which means a principal was deleted.</li>
  <li><strong>Check the conditions.</strong> MFA present? ExternalId supplied and matching? Source IP or VPC endpoint? An OIDC <code>sub</code> that does not match the branch you are building?</li>
  <li><strong>Check for denies above.</strong> An SCP can deny <code>sts:AssumeRole</code> organisation-wide; a permissions boundary on the caller can exclude it.</li>
  <li><strong>Check duration.</strong> A <code>ValidationError</code> mentioning one hour means you are chaining.</li>
  <li><strong>Check consistency.</strong> A role created seconds ago may not be assumable yet; retry with backoff before believing the failure.</li>
</ol>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Multi-tenant scope-down: the pattern worth knowing</h4>
<p style="line-height: 1.75;">One of the best uses of <code>AssumeRole</code> is something that is hard to do any other way: serving many tenants from one application without one role per tenant. The pattern is to hold a single broad role, and assume it <em>per request</em> with a <strong>session policy</strong> that restricts access to that tenant's data, plus <strong>session tags</strong> identifying the tenant.</p>
<p style="line-height: 1.75;">Because the session policy intersects with the role's permissions, the resulting credentials cannot reach another tenant's data even if the application has a bug in its own authorisation logic — the restriction is enforced by IAM rather than by your code. The session name and tags then make every action attributable to a tenant in CloudTrail. The cost is an STS call per request, which you mitigate by caching sessions per tenant for their lifetime rather than assuming afresh each time, and by being aware of STS rate limits.</p>
<p style="line-height: 1.75;">This is a strong answer to "how would you enforce tenant isolation?", because it moves the boundary from application code — which is where isolation bugs live — into the credential itself.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Monitoring that is worth setting up</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Alarm on assumption of privileged roles</strong> — break-glass, admin, anything with <code>iam:*</code>. A page rather than a log line.</li>
  <li><strong>Alert on assumptions from unexpected sources</strong> — new IP ranges, new countries, or a CI role assumed from outside your CI provider's address space.</li>
  <li><strong>Look for generic session names</strong> — <code>session1</code>, <code>default</code>, <code>temp</code> — which break attribution and are often a sign of hand-rolled assumption code.</li>
  <li><strong>Track chaining depth.</strong> Long chains make audit harder and usually indicate an access model that has grown by accretion.</li>
  <li><strong>Watch for <code>AssumeRole</code> failures in bulk</strong>, which can indicate either a broken deployment or someone enumerating roles.</li>
  <li><strong>Enable GuardDuty</strong>, whose <code>InstanceCredentialExfiltration</code> and anomalous-behaviour findings catch the cases where a session is used somewhere it should not be.</li>
</ul>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The hub-and-spoke access pattern</h4>
<p style="line-height: 1.75;">The most common production shape built on <code>AssumeRole</code> is hub-and-spoke, and being able to draw it quickly is worth a lot in a design interview.</p>
<p style="line-height: 1.75;">In the <strong>hub</strong> — an identity or shared-services account — live the human identities (or, increasingly, just the Identity Center instance) and a small number of roles representing job functions. In each <strong>spoke</strong> — the workload accounts — live roles with the same job-function names, each trusting the hub account and carrying permissions appropriate to that environment. A person authenticates once in the hub and assumes the matching role in whichever spoke they need.</p>
<p style="line-height: 1.75;">The properties that make this the default choice: credentials exist in exactly one place, offboarding is a single action, permissions differ per environment without differing per person, and every cross-account hop is recorded twice — once as an <code>AssumeRole</code> event in CloudTrail and once as the resulting session on every subsequent call. The main caution is the chaining cap: hub-to-spoke is one hop if the person assumes directly from their hub credentials, but becomes a chain (and a one-hour cap) if they first assume a hub role and then a spoke role. Where long sessions matter, design for a single hop.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Why the API being ordinary is the whole point</h4>
<p style="line-height: 1.75;">It is worth closing on the observation that started this topic. <code>sts:AssumeRole</code> has no special status in AWS. It is authorised like any other action, appears in policies like any other action, can be denied by an SCP like any other action, is logged like any other action, and can be conditioned on MFA, source IP, tags or time like any other action.</p>
<p style="line-height: 1.75;">That uniformity is what makes the role model composable. Because assumption is just an API call, you can gate it with the same tools you use everywhere else: a boundary can exclude it, a condition can require MFA for it, an SCP can forbid it across an organisation, and Access Analyzer can find every external principal that can perform it. If assumption had been a special mechanism outside the policy language, none of that would work, and roles would be far less useful than they are.</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">A compact checklist for setting up any assumption</h4>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Trust policy</strong> on the target role names the caller precisely — a role ARN rather than an account root where you can, and conditions rather than bare principals.</li>
  <li><strong>Caller's identity policy</strong> allows <code>sts:AssumeRole</code> on that exact role ARN, never <code>"*"</code>.</li>
  <li><strong>Conditions</strong> appropriate to the caller type: MFA for humans, <code>ExternalId</code> for third parties, a pinned <code>sub</code> for OIDC, source network where meaningful.</li>
  <li><strong>Extra actions</strong> granted on both sides if you pass session tags (<code>sts:TagSession</code>) or set a source identity (<code>sts:SetSourceIdentity</code>).</li>
  <li><strong>Session name</strong> meaningful and, ideally, constrained by a condition so it cannot be spoofed.</li>
  <li><strong>Duration</strong> as short as the work allows, with <code>MaxSessionDuration</code> capped on the role and chaining avoided where long sessions matter.</li>
  <li><strong>Credential handling</strong> delegated to an SDK provider or a CLI profile, so refresh is automatic.</li>
  <li><strong>Monitoring</strong> in place: an alarm on assumption of anything privileged, and a periodic review of who can assume what.</li>
</ol>
<p style="line-height: 1.75;">Eight steps, and the first two are the ones people forget. If an assumption is not working, the odds are overwhelming that one of those two documents is missing or subtly wrong — not that something exotic is happening.</p>


<p style="line-height: 1.75;">Finally, a note on how to talk about it. Candidates often describe role assumption in passive, magical terms — "the role gets attached", "AWS switches you into the role". Describing it as what it is, a signed API call with two authorisation checks and a credential response, reads as considerably more confident and makes every follow-up easier to answer, because you are reasoning about a request and a response rather than about an abstraction. When an interviewer then asks about chaining, duration caps, session tags or cross-account behaviour, you are simply describing different parameters and different checks on the same call.</p>


<p style="line-height: 1.75;">And if you remember nothing else: two documents must agree, the session name is your audit identity, chaining costs you eleven hours of session length, and the operation named in the error tells you which document to open.</p>

<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "<code>sts:AssumeRole</code> is a signed API call that trades credentials you already have for credentials of a role. STS checks two things: the role's trust policy must name the caller, and the caller's own identity policy must allow <code>sts:AssumeRole</code> on that role ARN — cross-account always needs both. You pass a <code>RoleSessionName</code>, which becomes your audit identity in CloudTrail, and optionally a session policy to narrow permissions, session tags for ABAC, MFA, or an ExternalId. The gotcha I watch for is chaining: assuming a role from an already-assumed session caps the new session at one hour regardless of <code>MaxSessionDuration</code>, which is why long jobs mysteriously die at 60 minutes."</div>
</div>`,
          examples: [
            `# ---------- Both sides of the same assumption ----------
# SIDE 1 - in the TARGET account: the role's trust policy
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "AWS": "arn:aws:iam::111122223333:role/engineer" },
    "Action": "sts:AssumeRole",
    "Condition": { "Bool": { "aws:MultiFactorAuthPresent": "true" } }
  }]
}

# SIDE 2 - in the CALLER account: the caller's identity policy
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": "sts:AssumeRole",
    "Resource": "arn:aws:iam::444455556666:role/prod-support"
  }]
}
# Missing side 1 -> AccessDenied naming the ROLE.
# Missing side 2 -> AccessDenied naming the CALLER.`,

            `# ---------- Making the call, with everything turned on ----------
aws sts assume-role \\
  --role-arn arn:aws:iam::444455556666:role/prod-support \\
  --role-session-name alice@acme.com \\
  --duration-seconds 3600 \\
  --serial-number arn:aws:iam::111122223333:mfa/alice \\
  --token-code 123456 \\
  --external-id acme-7f3d9c21 \\
  --source-identity alice@acme.com \\
  --tags Key=Team,Value=platform \\
  --transitive-tag-keys Team

# Note: --tags additionally requires sts:TagSession in BOTH the trust
# policy and the caller's policy. --source-identity requires
# sts:SetSourceIdentity. Neither is covered by sts:AssumeRole alone.`,

            `# ---------- Let the SDK do it: profiles, caching, auto-refresh ----------
# ~/.aws/config
# [profile identity]
# sso_start_url = https://acme.awsapps.com/start
# sso_account_id = 111122223333
# sso_role_name = Engineer
#
# [profile prod]
# role_arn         = arn:aws:iam::444455556666:role/prod-support
# source_profile   = identity
# mfa_serial       = arn:aws:iam::111122223333:mfa/alice
# duration_seconds = 3600
# role_session_name = alice@acme.com
#
# [profile on-instance]
# role_arn          = arn:aws:iam::444455556666:role/cross-account-reader
# credential_source = Ec2InstanceMetadata

aws s3 ls --profile prod       # assumes, caches, prompts for MFA, refreshes
# Hand-written assume_role code almost always forgets the refresh part.`,

            `# ---------- Role chaining: legal, useful, and capped at one hour ----------
# Hop 1: user -> hub role (can be up to 12h)
aws sts assume-role --role-arn arn:aws:iam::111122223333:role/hub \\
  --role-session-name alice --duration-seconds 43200

# Hop 2: hub session -> spoke role  === CHAINED ===
aws sts assume-role --role-arn arn:aws:iam::444455556666:role/spoke \\
  --role-session-name alice --duration-seconds 7200
# An error occurred (ValidationError): The requested DurationSeconds exceeds
# the 1 hour session limit for roles assumed by role chaining.

# Symptom in production: a batch job dies at ~55 minutes with ExpiredToken
# while "the same role works for 12 hours" when assumed directly.
# Fix: assume the target role directly, or let the SDK refresh.`,

            `# ---------- Auditing: who assumed what, and who was the human? ----------
aws cloudtrail lookup-events \\
  --lookup-attributes AttributeKey=EventName,AttributeValue=AssumeRole \\
  --start-time 2026-09-14T00:00:00Z \\
  --query 'Events[].CloudTrailEvent' --output text \\
  | python3 -c "
import sys, json
for line in sys.stdin:
    for ev in line.strip().split(chr(10)):
        if not ev: continue
        e = json.loads(ev)
        rp = e.get('requestParameters') or {}
        print(e['eventTime'], e['sourceIPAddress'],
              (e['userIdentity'].get('arn') or '-'), '->',
              rp.get('roleArn'), 'as', rp.get('roleSessionName'))
"

# Find who can assume ANY role - a serious finding
aws iam list-policies --scope Local --query 'Policies[].Arn' --output text | \\
while read arn; do
  v=$(aws iam get-policy --policy-arn $arn --query Policy.DefaultVersionId --output text)
  aws iam get-policy-version --policy-arn $arn --version-id $v \\
    --query 'PolicyVersion.Document' --output json | grep -q '"sts:AssumeRole"' \\
    && echo "CHECK RESOURCE SCOPE: $arn"
done`,
          ],
          questions: [
            {
              question: "Walk me through what happens when you call sts:AssumeRole.",
              solution: "<p>You sign the call with credentials you already hold, naming a <code>RoleArn</code> and a <code>RoleSessionName</code>. STS then makes <strong>two</strong> authorisation checks: the target role's <strong>trust policy</strong> must permit the caller, and the caller's own <strong>identity policy</strong> must allow <code>sts:AssumeRole</code> on that role ARN. It also evaluates any conditions — MFA, ExternalId, source IP. If everything passes, STS returns an <code>ASIA</code> access key, secret, session token and expiry, and from then on your audited identity is <code>arn:aws:sts::&lt;account&gt;:assumed-role/&lt;role&gt;/&lt;session-name&gt;</code>. Cross-account is not a different API — it is simply a <code>RoleArn</code> with a different account number, and it always requires both checks to pass.</p>",
            },
            {
              question: "What is role chaining and what is its limitation?",
              solution: "<p>Role chaining is calling <code>AssumeRole</code> with credentials that are already an assumed-role session — for example a user assumes a hub role in an identity account, then assumes a spoke role in a workload account. It is a normal and useful pattern, but the resulting session is <strong>hard-capped at one hour</strong> regardless of the target role's <code>MaxSessionDuration</code>, and requesting more returns a <code>ValidationError</code> rather than silently truncating. The classic symptom is a long-running job that dies around the 55-minute mark with <code>ExpiredToken</code> while \"the same role works for 12 hours\" when assumed directly. Fix by assuming the target directly, or by configuring the SDK profile so credentials refresh automatically.</p>",
            },
            {
              question: "Which permissions does the CALLER need to assume a role, beyond being trusted?",
              solution: "<p>The caller needs <code>sts:AssumeRole</code> allowed on the target role's ARN in their own identity policy — being named in the trust policy is not sufficient for cross-account, and relying on the same-account shortcut makes policies harder to read. If the assumption passes <strong>session tags</strong>, the caller additionally needs <code>sts:TagSession</code>, and if it sets <code>SourceIdentity</code> it needs <code>sts:SetSourceIdentity</code>. Both of those extra actions must also be allowed in the role's trust policy. A trust policy that permits only <code>sts:AssumeRole</code> will reject a tagged assumption with an error that does not obviously mention tags.</p>",
            },
            {
              question: "How do you trace a suspicious API call back to the human who made it?",
              solution: "<p>The suspicious event's <code>userIdentity</code> shows <code>arn:aws:sts::...:assumed-role/&lt;role&gt;/&lt;session-name&gt;</code> plus a <code>sessionContext</code> containing <code>sessionIssuer</code>. Take the session name and search CloudTrail for the <code>AssumeRole</code> event that created it — that event records the original caller and the source IP. This is why meaningful session names matter: they are the join key of the audit trail, and <code>session1</code> destroys it. Where roles are chained, session names can be changed at each hop, so set <strong><code>SourceIdentity</code></strong>, which cannot be altered downstream and propagates through the chain — it is the reliable way to carry the real human identity through multiple assumptions.</p>",
            },
            {
              question: "Why is an identity policy allowing sts:AssumeRole on Resource \"*\" dangerous?",
              solution: "<p>Because it means \"may become <strong>any</strong> role that trusts this account\", which in a mature account is usually a long list including privileged ones. Permissions in AWS form a <strong>graph</strong>, not a list: if this principal can assume role A, and role A can assume an admin role, then this principal is effectively an administrator, and no single policy document reveals that. Scope <code>sts:AssumeRole</code> to specific role ARNs or a path prefix, and use tools like IAM Access Analyzer or PMapper to enumerate escalation paths, because humans reliably fail to spot them by reading policies.</p>",
            },
            {
              question: "Does AssumeRoleWithWebIdentity require AWS credentials?",
              solution: "<p>No — and that is the point. The OIDC token <em>is</em> the proof of identity, which is what lets GitHub Actions, EKS pods and mobile apps get AWS access without any stored secret. The security consequence is important: since there are no AWS credentials to check, the <strong>trust policy conditions are the only thing protecting the role</strong>. For GitHub Actions that means pinning <code>token.actions.githubusercontent.com:sub</code> to the exact org, repo and ref, and setting <code>aud</code> to <code>sts.amazonaws.com</code>. Without the <code>sub</code> condition, any repository on GitHub can assume the role.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_control-access_monitor.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_session-tags.html",
          ],
        },
        {
          topic: "Principle of Least Privilege — Grant Only What Is Needed",
          tags: ["aws", "iam", "least privilege", "access analyzer", "abac", "blast radius", "security"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>Least privilege</strong> means every identity gets exactly the permissions it needs to do its job, on exactly the resources it needs, under exactly the conditions it needs — and nothing more. It is easy to say and genuinely hard to do, which is why interviewers ask <em>how</em> you achieve it rather than whether you believe in it. A candidate who says "least privilege is important" has said nothing. A candidate who says "I start from deny, generate a policy from 90 days of CloudTrail with Access Analyzer, then tighten resources and add conditions" has described a method.
</p>
<p style="line-height: 1.75;">The reason it matters is <strong>blast radius</strong>. Assume every credential will eventually leak, every server will eventually be compromised, and every engineer will eventually run the wrong command in the wrong terminal. Least privilege does not prevent those events; it decides how bad they are. A compromised container holding <code>s3:GetObject</code> on one prefix is an incident report. The same container holding <code>AdministratorAccess</code> is a company-ending event.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The four dimensions you can tighten</h4>
<p style="line-height: 1.75;">People think least privilege means "fewer actions". It is four independent dimensions, and most real over-permissioning lives in the last three:</p>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Actions</strong> — <code>s3:GetObject</code> instead of <code>s3:*</code>.</li>
  <li><strong>Resources</strong> — one bucket ARN and its object ARN instead of <code>"*"</code>. This is the single highest-value tightening, because it converts "every bucket in the account, forever" into "this one".</li>
  <li><strong>Conditions</strong> — only from our VPC endpoint, only over TLS, only with MFA in the last hour, only in eu-west-1, only on resources tagged with this team.</li>
  <li><strong>Time</strong> — short sessions, just-in-time elevation, credentials that expire. A permission that exists for ten minutes a week is a much smaller target than one that exists permanently.</li>
</ol>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">A workable method, not a slogan</h4>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Start from nothing.</strong> IAM is deny-by-default; do not fight that. Begin with an empty policy and add what breaks.</li>
  <li><strong>Run it in a non-production account and collect the errors.</strong> Each <code>AccessDenied</code> names the exact action and resource. That error list <em>is</em> your policy draft.</li>
  <li><strong>Or let AWS write it.</strong> <strong>IAM Access Analyzer policy generation</strong> reads up to 90 days of CloudTrail for a specific role and emits a policy containing what it actually used. This is the fastest honest path and the answer interviewers most want to hear.</li>
  <li><strong>Tighten resources next, not actions.</strong> Replace every <code>"Resource": "*"</code> you can. Note the S3 trap: bucket-level actions like <code>s3:ListBucket</code> need the bucket ARN, object-level actions need <code>bucket/*</code>. You almost always need both entries.</li>
  <li><strong>Add conditions.</strong> Region locking with <code>aws:RequestedRegion</code>, network locking with <code>aws:SourceVpce</code>, TLS with <code>aws:SecureTransport</code>, MFA with <code>aws:MultiFactorAuthPresent</code>, tag matching with <code>aws:ResourceTag</code>.</li>
  <li><strong>Validate before shipping.</strong> IAM Access Analyzer policy validation flags over-broad and malformed statements; custom policy checks can fail a pull request if a change grants new access. Put that in CI.</li>
  <li><strong>Prune continually.</strong> Access Analyzer <strong>unused access</strong> findings surface roles, users, permissions and credentials that have not been touched in a configurable window. Permissions granted "just in case" two years ago are the bulk of most accounts' excess.</li>
  <li><strong>Cap the ceiling.</strong> Use permissions boundaries for delegated administration and SCPs for organisation-wide guardrails, so even a mistake cannot exceed the envelope.</li>
</ol>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Wildcards: when they are fine and when they are not</h4>
<p style="line-height: 1.75;">Wildcards are not automatically wrong; a policy with 300 enumerated actions is unreadable and hits the size limit. The judgement is about what the wildcard <em>could</em> sweep in.</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Usually fine:</strong> <code>s3:Get*</code> on a tightly scoped resource; <code>logs:*</code> on one log group; <code>dynamodb:BatchGet*</code>.</li>
  <li><strong>Rarely fine:</strong> <code>s3:*</code>, <code>ec2:*</code>, <code>iam:*</code>. These include delete, and <code>iam:*</code> includes "grant myself anything".</li>
  <li><strong>Never fine on a workload:</strong> <code>"Action": "*", "Resource": "*"</code>. That is <code>AdministratorAccess</code> by another name.</li>
  <li><strong>Watch the sneaky ones:</strong> a wildcard that looks narrow can include a privileged action — <code>iam:*Policy*</code> includes <code>CreatePolicyVersion</code>, which is a full escalation primitive because you can rewrite a policy you are allowed to edit.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The escalation primitives to hunt for</h4>
<p style="line-height: 1.75;">A policy can look modest and still be equivalent to administrator. These are the combinations to treat as red flags:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><code>iam:PassRole</code> with <code>Resource: "*"</code>, combined with the ability to create a compute resource (<code>lambda:CreateFunction</code>, <code>ec2:RunInstances</code>, <code>ecs:RunTask</code>, <code>glue:CreateJob</code>). Pass an admin role to a function you wrote, and you are admin. <strong>Always scope <code>PassRole</code> to specific roles and add <code>iam:PassedToService</code>.</strong></li>
  <li><code>iam:CreatePolicyVersion</code> — rewrite any policy you can edit, including one attached to you.</li>
  <li><code>iam:AttachRolePolicy</code> / <code>AttachUserPolicy</code> — attach <code>AdministratorAccess</code> to yourself.</li>
  <li><code>iam:UpdateAssumeRolePolicy</code> — rewrite a privileged role's trust policy to trust you.</li>
  <li><code>iam:CreateAccessKey</code> on another user — mint credentials for someone more privileged.</li>
  <li><code>lambda:UpdateFunctionCode</code> on a function with a privileged execution role — replace the code, inherit the role.</li>
  <li><code>ssm:SendCommand</code> on instances with privileged instance profiles.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The practical objection, and the honest answer</h4>
<p style="line-height: 1.75;">The real-world objection is speed: tight policies break things, breakages cost time, and under deadline pressure someone attaches <code>PowerUserAccess</code> "temporarily". Pretending this does not happen is not an answer. What actually works:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Be generous in dev, strict in prod.</strong> Let people explore in a sandbox account with a permissions boundary, then generate the production policy from what they actually used.</li>
  <li><strong>Make the safe path the fast path.</strong> If requesting elevated access takes three days, people will hoard permissions. Just-in-time elevation that takes 30 seconds removes the incentive.</li>
  <li><strong>Automate the tightening.</strong> Nobody hand-writes least privilege at scale. Generate, validate in CI, and review unused-access findings on a schedule.</li>
  <li><strong>Use ABAC to avoid policy sprawl.</strong> Instead of a policy per team, one policy that allows access where <code>aws:ResourceTag/Team</code> equals <code>aws:PrincipalTag/Team</code>. It scales to hundreds of teams without new documents, and it keeps policies inside the size limit.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">How you would know if you were succeeding</h4>
<p style="line-height: 1.75;">Good answers include measurable signals rather than intentions: the count of identities holding <code>AdministratorAccess</code>; the number of policies with <code>Resource: "*"</code> on write actions; unused-access findings trending down; the percentage of human access that is short-lived and federated rather than long-lived keys; how long a permission request takes; and whether a new service's policy is generated from observed usage or copied from another service. Those are the things an interviewer at a mature organisation is listening for.</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The condition keys that do the most work</h4>
<p style="line-height: 1.75;">Because conditions are the dimension people neglect, it is worth knowing the small set that delivers most of the value. These are global keys, available across services:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong><code>aws:RequestedRegion</code></strong> — confine activity to approved regions. Deny everything outside them, exempting global services such as IAM, CloudFront, Route 53 and Organizations, which are technically us-east-1.</li>
  <li><strong><code>aws:SourceVpce</code> / <code>aws:SourceVpc</code></strong> — require traffic to arrive through your VPC endpoint. The backbone of a data perimeter.</li>
  <li><strong><code>aws:SecureTransport</code></strong> — deny non-TLS. Cheap, universal, and should be on every bucket and queue policy.</li>
  <li><strong><code>aws:PrincipalOrgID</code></strong> — restrict to principals in your organisation, without listing account numbers.</li>
  <li><strong><code>aws:PrincipalTag</code> and <code>aws:ResourceTag</code></strong> — the ABAC pair. Match a principal's attribute against a resource's attribute.</li>
  <li><strong><code>aws:RequestTag</code> and <code>aws:TagKeys</code></strong> — require tags at creation time, which is what makes ABAC reliable: an untagged resource is either inaccessible or a hole.</li>
  <li><strong><code>aws:MultiFactorAuthPresent</code> and <code>aws:MultiFactorAuthAge</code></strong> — require MFA, and require it recently.</li>
  <li><strong><code>aws:ViaAWSService</code></strong> — distinguish calls your principal made directly from calls an AWS service made on its behalf, which is essential when writing network-based denies that should not break service integrations.</li>
  <li><strong><code>aws:CalledVia</code></strong> — allow an action only when it arrives through a specific service, for example permitting <code>kms:Decrypt</code> only when called via S3 rather than directly.</li>
  <li><strong><code>iam:PassedToService</code></strong> — pin which service a role may be passed to, closing the <code>PassRole</code> escalation path.</li>
</ul>
<p style="line-height: 1.75;">Two operators are worth special attention. <strong><code>...IfExists</code></strong> variants treat a missing key as a match, which is usually what you want in a Deny; without it, a guardrail can silently fail to apply. And <strong><code>ForAnyValue</code>/<code>ForAllValues</code></strong> prefixes handle multi-valued keys, where getting the quantifier wrong produces a policy that looks right and behaves backwards.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Least privilege for humans is a different problem</h4>
<p style="line-height: 1.75;">Most writing about least privilege implicitly assumes a workload, where the action list is finite and discoverable. Humans are harder: their needs are unpredictable, and a policy that blocks an engineer during an incident is a policy that will be replaced with <code>AdministratorAccess</code> the same night. The techniques that actually work for people:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Read-only by default, elevation on request.</strong> Most of what engineers do is look at things. Give everyone generous read access and make writes the exception that requires elevation.</li>
  <li><strong>Just-in-time elevation with a short session.</strong> If elevating takes seconds and lasts an hour, people will use it. If it takes a ticket and three days, they will hoard standing permissions and your least-privilege programme is over.</li>
  <li><strong>Break-glass that is loud, not locked.</strong> A path to administrator that always works but always pages someone is safer than one that is so restricted people build a shadow copy.</li>
  <li><strong>Environment asymmetry.</strong> Broad in dev under a boundary, narrow in production. Most of the value of tight policies is in production anyway.</li>
  <li><strong>Deny rather than omit for the truly dangerous.</strong> Some things — disabling CloudTrail, deleting KMS keys, changing account settings — should be explicit Denies that no amount of elevation overrides, enforced by SCP so they are outside the account's own control.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Why tightening resources beats tightening actions</h4>
<p style="line-height: 1.75;">If you only have time for one improvement, narrow the <code>Resource</code>. The reasoning is worth being able to articulate: the action list describes <em>capability</em>, but the resource list describes <em>blast radius</em>, and blast radius is what determines the size of an incident.</p>
<p style="line-height: 1.75;">Consider a workload holding <code>s3:GetObject</code> on <code>"*"</code>. The capability sounds modest — it can only read. But the blast radius is every object in every bucket in the account: backups, logs, customer data, exports, and any bucket created after the policy was written. Compare it with a workload holding <code>s3:*</code> on one prefix of one bucket: far more capability, far smaller consequence. The second is almost always the better trade.</p>
<p style="line-height: 1.75;">This also explains why <code>Resource: "*"</code> deserves a comment when it is genuinely unavoidable. Some actions do not operate on a resource — <code>ec2:DescribeInstances</code> is account-wide by nature, and there is nothing to scope. Writing a short <code>Sid</code> explaining why a wildcard is correct there saves the next reviewer from "fixing" something that cannot be fixed, and makes the remaining wildcards genuinely suspicious.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">A maturity model you can describe</h4>
<p style="line-height: 1.75;">Interviewers often want to know where an organisation is, not just what is ideal. A rough progression:</p>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Level 0.</strong> Shared IAM users, <code>AdministratorAccess</code>, keys in configuration files. Everything is one credential away from total compromise.</li>
  <li><strong>Level 1.</strong> Per-person users, groups for permissions, AWS-managed policies. Better attribution, still broad grants and long-lived keys.</li>
  <li><strong>Level 2.</strong> Roles for workloads, federated humans, customer-managed policies scoped by service. Long-lived keys mostly gone.</li>
  <li><strong>Level 3.</strong> Resources scoped, conditions applied, permissions boundaries for delegated IAM, SCP guardrails for regions and destructive actions.</li>
  <li><strong>Level 4.</strong> Policies generated from observed usage, validated in CI, unused access reviewed on a schedule, ABAC for scale, just-in-time elevation, and escalation paths mapped with tooling.</li>
</ol>
<p style="line-height: 1.75;">Being able to place a real account on that scale, and name the single next step, is a more convincing answer than describing the endpoint. The next step from Level 1 is almost always "stop issuing access keys"; from Level 2 it is "scope resources"; from Level 3 it is "measure what is actually used".</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The failure modes of least-privilege programmes</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Tightening without measuring.</strong> Removing permissions nobody proved were unused causes outages, which discredits the whole effort. Use service-last-accessed data first.</li>
  <li><strong>Optimising the wrong identities.</strong> Effort spent on a read-only reporting role is effort not spent on the deploy role that can pass any role to any service.</li>
  <li><strong>Ignoring the graph.</strong> A perfectly scoped role is irrelevant if its holder can assume something broader.</li>
  <li><strong>Policy sprawl.</strong> A document per team per environment is unmaintainable, drifts immediately, and is the problem ABAC exists to solve.</li>
  <li><strong>Treating it as a project.</strong> Permissions accrete continuously, so the review has to be recurring — unused-access findings triaged monthly beats a heroic annual audit.</li>
  <li><strong>No path for exceptions.</strong> If there is no legitimate way to get broader access quickly, people will create an illegitimate one, and you will not know about it.</li>
</ul>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Reading the action names correctly</h4>
<p style="line-height: 1.75;">A surprising amount of accidental over-granting comes from not knowing how AWS names actions. A few patterns that repay learning:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>List versus Get versus Describe.</strong> <code>List*</code> enumerates, <code>Get*</code> retrieves content, <code>Describe*</code> returns metadata. Granting <code>s3:ListBucket</code> lets someone see object names; <code>s3:GetObject</code> lets them read the contents. Those are very different disclosures, and people often grant both when they meant the first.</li>
  <li><strong>Bucket-level versus object-level in S3.</strong> <code>ListBucket</code> takes the bucket ARN; <code>GetObject</code> takes <code>bucket/*</code>. A policy with only the object ARN produces the classic "I can read files but <code>aws s3 ls</code> fails" symptom.</li>
  <li><strong>Actions with no resource.</strong> Many <code>Describe*</code> calls in EC2 are account-wide by design and cannot be scoped; a wildcard there is correct, not lazy. Say so in a <code>Sid</code> so reviewers do not waste time.</li>
  <li><strong>Paired actions.</strong> Some operations need two grants: reading an encrypted object needs <code>s3:GetObject</code> and <code>kms:Decrypt</code>; writing needs <code>kms:GenerateDataKey</code>. Pulling an image needs both ECR <code>GetAuthorizationToken</code> and repository-level permissions.</li>
  <li><strong>Condition-only actions.</strong> Some services express important restrictions purely through condition keys — for example limiting <code>ec2:RunInstances</code> by instance type or by the subnet used — which means the action list alone tells you little.</li>
</ul>
<p style="line-height: 1.75;">The service authorisation reference in the AWS documentation lists, for every service, each action, the resource types it accepts, and the condition keys available. Knowing that page exists — and reaching for it rather than guessing — is itself a good answer when an interviewer asks how you write a tight policy for an unfamiliar service.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The one-sentence version</h4>
<p style="line-height: 1.75;">If the topic has to compress to a single idea, it is this: <strong>least privilege is not about being restrictive, it is about being specific.</strong> A policy that grants exactly what a workload does is not an obstacle to that workload — it is a description of it. The friction people associate with least privilege comes almost entirely from writing policies <em>before</em> knowing what the workload does, which is why every serious approach starts with observation rather than with a blank document.</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Making the case to people who are not security engineers</h4>
<p style="line-height: 1.75;">A dimension that interviewers at senior levels probe: can you persuade, not just implement? The arguments that land with different audiences are genuinely different, and knowing which to reach for is part of the skill.</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>With engineers</strong>, lead with blast radius and debugging. A tight policy is documentation of what the service does, and a denial in staging is a much better signal than silent success against the wrong resource — several classes of bug, such as a job writing to the production bucket because of a bad environment variable, become impossible rather than merely unlikely.</li>
  <li><strong>With product and delivery leads</strong>, lead with incident cost and time. The question is not whether a credential will leak but what happens when it does, and the difference between an afternoon of rotation and a regulatory notification is decided entirely by what that credential could reach.</li>
  <li><strong>With auditors and compliance</strong>, lead with evidence. Generated policies, CI validation and unused-access findings produce an artefact trail that a hand-maintained spreadsheet of permissions never will.</li>
  <li><strong>With executives</strong>, lead with the named incidents. Every large cloud breach in recent memory has an over-permissioned credential somewhere in its chain, and that is a short, memorable argument.</li>
</ul>
<p style="line-height: 1.75;">What does not work, in any of those conversations, is framing least privilege as a rule to be complied with. The framing that works is that it is a description of intended behaviour, enforced by the platform instead of by hope — and that the enforcement is what makes the intent survive staff turnover, refactors and three-in-the-morning changes.</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What to do first in an account you have just inherited</h4>
<p style="line-height: 1.75;">A closing practical sequence, because "where would you start?" is a common follow-up. First, enumerate who holds <code>AdministratorAccess</code> or equivalent, including through role assumption paths — that is your worst-case list. Second, generate a credential report and deactivate every access key unused for ninety days, which removes the largest category of standing risk for almost no effort. Third, turn on IAM Access Analyzer with both external-access and unused-access analysis, because it produces a prioritised backlog without you having to build one. Fourth, look at the escalation primitives — wildcard <code>PassRole</code> above all — because those convert modest permissions into administrator and are invisible to a casual policy review. Only then start tightening individual workload policies, beginning with the ones that touch production data.</p>
<p style="line-height: 1.75;">That order is deliberate: it front-loads the changes with the largest risk reduction per unit of effort, and it defers the slow, breakage-prone work until you have the observability to do it safely.</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The shortest honest summary</h4>
<p style="line-height: 1.75;">Least privilege is achieved by observation, not by imagination. Watch what a workload does, write that down as a policy, narrow the resources, add the conditions that describe where and how the work legitimately happens, and then keep watching — because permissions accumulate and the only reliable defence against that is a recurring review of what has gone unused. Every tool mentioned here exists to make one of those four steps cheap enough that people actually do it.</p>

<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Least privilege means granting only the actions, on only the resources, under only the conditions, for only as long as needed — four dimensions, not just 'fewer actions'. In practice I don't hand-write it: I let the workload run in a non-production account, then use IAM Access Analyzer policy generation to build a policy from 90 days of real CloudTrail activity, tighten every <code>Resource: "*"</code>, and add conditions like <code>aws:RequestedRegion</code> and <code>aws:SourceVpce</code>. I validate policies in CI with Access Analyzer custom checks, review unused-access findings on a schedule, and cap the ceiling with permissions boundaries and SCPs. The specific things I hunt for are escalation primitives — <code>iam:PassRole</code> with a wildcard, <code>CreatePolicyVersion</code>, <code>AttachRolePolicy</code> — because those make a modest-looking policy equivalent to admin."</div>
</div>`,
          examples: [
            `# ---------- The same permission, four levels of tightening ----------
# LEVEL 0 - what people actually ship under deadline
{ "Effect": "Allow", "Action": "*", "Resource": "*" }

# LEVEL 1 - scoped service (still every bucket in the account, forever)
{ "Effect": "Allow", "Action": "s3:*", "Resource": "*" }

# LEVEL 2 - scoped actions AND resources (note BOTH ARNs)
{
  "Effect": "Allow",
  "Action": ["s3:GetObject", "s3:PutObject"],
  "Resource": "arn:aws:s3:::acme-uploads/incoming/*"
},
{
  "Effect": "Allow",
  "Action": "s3:ListBucket",
  "Resource": "arn:aws:s3:::acme-uploads",
  "Condition": { "StringLike": { "s3:prefix": "incoming/*" } }
}

# LEVEL 3 - plus conditions: TLS, our network, our region, our KMS key
{
  "Effect": "Allow",
  "Action": ["s3:GetObject", "s3:PutObject"],
  "Resource": "arn:aws:s3:::acme-uploads/incoming/*",
  "Condition": {
    "Bool":         { "aws:SecureTransport": "true" },
    "StringEquals": {
      "aws:SourceVpce":     "vpce-0a1b2c3d4e",
      "aws:RequestedRegion": "eu-west-1",
      "s3:x-amz-server-side-encryption-aws-kms-key-id":
        "arn:aws:kms:eu-west-1:123456789012:key/abcd-1234"
    }
  }
}`,

            `# ---------- Let AWS generate the policy from real usage ----------
cat > trail.json <<'EOF'
{
  "trailProperties": [{
    "cloudTrailArn": "arn:aws:cloudtrail:eu-west-1:123456789012:trail/org-trail",
    "regions": ["eu-west-1"],
    "allRegions": false
  }],
  "accessRole": "arn:aws:iam::123456789012:role/AccessAnalyzerPolicyGen"
}
EOF

JOB=$(aws accessanalyzer start-policy-generation \\
  --policy-generation-details principalArn=arn:aws:iam::123456789012:role/orders-api \\
  --cloud-trail-details file://trail.json \\
  --query jobId --output text)

aws accessanalyzer get-generated-policy --job-id $JOB \\
  --include-service-level-template

# Output is a policy containing ONLY what the role actually used in the
# observed window. Review it, tighten resources, then ship.`,

            `# ---------- Validate in CI: fail the PR if a change grants new access ----------
# 1. Structural and best-practice findings
aws accessanalyzer validate-policy \\
  --policy-document file://new-policy.json \\
  --policy-type IDENTITY_POLICY \\
  --query 'findings[?findingType!=\`SUGGESTION\`]'

# 2. Did this change BROADEN permissions vs the old version?
aws accessanalyzer check-no-new-access \\
  --new-policy-document file://new-policy.json \\
  --existing-policy-document file://old-policy.json \\
  --policy-type IDENTITY_POLICY
# { "result": "FAIL", "reasons": [...] }  -> block the merge

# 3. Does it touch actions we never allow?
aws accessanalyzer check-access-not-granted \\
  --policy-document file://new-policy.json \\
  --access '[{"actions":["iam:PassRole","iam:CreatePolicyVersion","s3:DeleteBucket"]}]' \\
  --policy-type IDENTITY_POLICY`,

            `# ---------- Escalation primitives: the audit that actually matters ----------
# PassRole with a wildcard + ability to create compute = admin
# BAD:
{ "Effect": "Allow", "Action": "iam:PassRole", "Resource": "*" }

# GOOD: name the role, and pin which service may receive it
{
  "Effect": "Allow",
  "Action": "iam:PassRole",
  "Resource": "arn:aws:iam::123456789012:role/orders-task-role",
  "Condition": {
    "StringEquals": { "iam:PassedToService": "ecs-tasks.amazonaws.com" }
  }
}

# Sweep the account for the dangerous set
for a in iam:PassRole iam:CreatePolicyVersion iam:AttachRolePolicy \\
         iam:AttachUserPolicy iam:UpdateAssumeRolePolicy iam:CreateAccessKey \\
         lambda:UpdateFunctionCode ssm:SendCommand; do
  echo "=== $a ==="
  aws accessanalyzer check-access-not-granted \\
    --policy-document file://policy.json \\
    --access "[{\\"actions\\":[\\"$a\\"]}]" --policy-type IDENTITY_POLICY \\
    --query result --output text
done`,

            `# ---------- Prune: find what is granted but never used ----------
# Unused access analyzer - roles, users, permissions, credentials idle 90 days
aws accessanalyzer create-analyzer \\
  --analyzer-name unused-access \\
  --type ACCOUNT_UNUSED_ACCESS \\
  --configuration '{"unusedAccess":{"unusedAccessAge":90}}'

aws accessanalyzer list-findings-v2 \\
  --analyzer-arn "$ANALYZER_ARN" \\
  --filter '{"status":{"eq":["ACTIVE"]}}' \\
  --query 'findings[].[resource,findingType]' --output table

# Per-service last-used data, straight from IAM
JOB=$(aws iam generate-service-last-accessed-details \\
  --arn arn:aws:iam::123456789012:role/orders-api --query JobId --output text)
aws iam get-service-last-accessed-details --job-id $JOB \\
  --query 'ServicesLastAccessed[?TotalAuthenticatedEntities==\`0\`].ServiceName'
# Every service listed here is granted and never touched. Remove it.`,
          ],
          questions: [
            {
              question: "What is the principle of least privilege and how do you actually achieve it in AWS?",
              solution: "<p>It means granting only the actions, on only the resources, under only the conditions, for only as long as needed — four dimensions, and most real over-permissioning is in resources and conditions rather than actions. The method: start from deny-by-default, run the workload in a non-production account and collect the <code>AccessDenied</code> errors, or better, use <strong>IAM Access Analyzer policy generation</strong> to build a policy from up to 90 days of real CloudTrail activity. Then tighten every <code>Resource: \"*\"</code>, add conditions such as <code>aws:RequestedRegion</code> and <code>aws:SourceVpce</code>, validate in CI with <code>validate-policy</code> and <code>check-no-new-access</code>, and review unused-access findings on a schedule. Cap the whole envelope with permissions boundaries and SCPs so a mistake cannot exceed it.</p>",
            },
            {
              question: "Is using a wildcard in a policy always bad?",
              solution: "<p>No — a policy with 300 enumerated actions is unreadable and will hit the 6,144-character limit. The judgement is what the wildcard could <em>sweep in</em>. <code>s3:Get*</code> on one tightly scoped bucket prefix is fine; <code>logs:*</code> on a single log group is fine. <code>s3:*</code>, <code>ec2:*</code> and especially <code>iam:*</code> are rarely acceptable because they include destructive and permission-granting actions. The subtle danger is a wildcard that looks narrow but is not: <code>iam:*Policy*</code> includes <code>CreatePolicyVersion</code>, which lets the holder rewrite a policy attached to themselves — a complete privilege-escalation primitive.</p>",
            },
            {
              question: "Name the privilege escalation paths you'd look for when reviewing a policy.",
              solution: "<p><strong><code>iam:PassRole</code> with <code>Resource: \"*\"</code></strong> combined with any compute-creation permission (<code>lambda:CreateFunction</code>, <code>ec2:RunInstances</code>, <code>ecs:RunTask</code>, <code>glue:CreateJob</code>) — pass an admin role to code you wrote and you are admin. <strong><code>iam:CreatePolicyVersion</code></strong> — rewrite a policy attached to yourself. <strong><code>iam:AttachRolePolicy</code>/<code>AttachUserPolicy</code></strong> — attach <code>AdministratorAccess</code> to yourself. <strong><code>iam:UpdateAssumeRolePolicy</code></strong> — make a privileged role trust you. <strong><code>iam:CreateAccessKey</code></strong> on another user. <strong><code>lambda:UpdateFunctionCode</code></strong> on a function with a privileged execution role. <strong><code>ssm:SendCommand</code></strong> on instances with privileged instance profiles. Always scope <code>PassRole</code> to named roles and add an <code>iam:PassedToService</code> condition.</p>",
            },
            {
              question: "Developers complain that tight policies slow them down. How do you handle it?",
              solution: "<p>Treat it as a real constraint rather than a discipline problem, because under deadline pressure someone will attach <code>PowerUserAccess</code>. Four things work: <strong>be generous in dev, strict in prod</strong> — let people explore in a sandbox capped by a permissions boundary, then generate the production policy from what they actually used; <strong>make the safe path fast</strong>, because if elevation takes three days people hoard permissions, whereas 30-second just-in-time access removes the incentive; <strong>automate the tightening</strong> with policy generation and CI validation rather than hand-writing; and <strong>use ABAC</strong> so one tag-matching policy serves many teams instead of a policy per team, which also keeps documents under the size limit.</p>",
            },
            {
              question: "How would you find permissions that are granted but never used?",
              solution: "<p>Two tools. <strong>IAM Access Analyzer unused access</strong> — create an <code>ACCOUNT_UNUSED_ACCESS</code> analyzer with a window such as 90 days, and it reports unused roles, unused users, unused permissions and unused credentials as findings you can triage like any other. And <strong>service last accessed data</strong> — <code>generate-service-last-accessed-details</code> followed by <code>get-service-last-accessed-details</code> tells you, per service, whether a principal ever authenticated to it, and can go down to action-level granularity for some services. Anything granted with zero authenticated entities is a safe removal candidate. Pair both with a credential report to find stale access keys and console passwords.</p>",
            },
            {
              question: "What is ABAC and why does it help with least privilege at scale?",
              solution: "<p>Attribute-based access control grants permission by <strong>matching tags</strong> rather than enumerating resources: a policy allows an action when <code>aws:ResourceTag/Team</code> equals <code>aws:PrincipalTag/Team</code>, where the principal tag comes from an IAM tag or an STS session tag. One document then serves every team, and a new team needs no policy change at all — just correctly tagged resources and principals. That solves two practical problems: policy sprawl (a document per team per environment) and the 6,144-character limit, since a condition replaces a list of hundreds of ARNs. The cost is that tagging must be enforced, typically with an SCP requiring <code>aws:RequestTag</code> on creation, because an untagged resource is either inaccessible or accidentally open.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-policy-generation.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction_attribute-based-access-control.html",
          ],
        },
        {
          topic: "Policy Evaluation Logic — Explicit Deny & Explicit Allow & Implicit Deny",
          tags: ["aws", "iam", "policy evaluation", "scp", "rcp", "boundary", "session policy", "deny"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  This is the one piece of IAM you should be able to recite in your sleep, because every other question reduces to it. When any request arrives, AWS collects <em>every</em> policy that could apply and runs a fixed decision procedure. The order never changes, there is no "most specific wins", and there is no ordering between statements within a policy.
</p>
<p style="line-height: 1.75;">The three-line version:</p>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Explicit Deny</strong> — a matching <code>"Effect": "Deny"</code> anywhere. Request denied. Final. Nothing can override it.</li>
  <li><strong>Explicit Allow</strong> — a matching <code>"Effect": "Allow"</code>, with no deny. Request allowed.</li>
  <li><strong>Implicit Deny</strong> — nothing matched. Request denied by default.</li>
</ol>
<p style="line-height: 1.75;">Two consequences fall straight out. First, <strong>you cannot fix an explicit Deny by adding more Allows</strong> — a fact worth saying out loud in an interview, because it is the most common practical mistake. Second, <strong>default is deny</strong>: a brand-new identity with no policies can do nothing at all, even though AWS knows exactly who it is.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The full picture: six policy types in one decision</h4>
<p style="line-height: 1.75;">The three-line version is what AWS evaluates <em>after</em> assembling the inputs. In an organisation there can be six kinds of document in play, and a senior answer names them in order:</p>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Organizations SCPs</strong> — service control policies, the account-wide ceiling. An SCP never <em>grants</em> anything; it only bounds what IAM in that account may grant. If an SCP does not allow the action, nothing in the account can do it, including administrators. (It does not apply to the management account's root user, nor to service-linked roles.)</li>
  <li><strong>Resource control policies (RCPs)</strong> — the newer counterpart, applying a ceiling to what <em>resources</em> in those accounts can permit, closing the gap where a resource policy granted access outside the organisation.</li>
  <li><strong>Permissions boundaries</strong> — a per-identity ceiling. The identity's effective permissions are the <em>intersection</em> of its policies and its boundary.</li>
  <li><strong>Session policies</strong> — passed at assume time, also an intersection. Narrow only.</li>
  <li><strong>Identity-based policies</strong> — attached to the user, group or role.</li>
  <li><strong>Resource-based policies</strong> — attached to the target resource.</li>
</ol>
<p style="line-height: 1.75;">The evaluation is then: collect all of them → <strong>if any explicit Deny matches, stop and deny</strong> → otherwise check that every applicable ceiling (SCP, RCP, boundary, session policy) allows → then check that an Allow exists from the identity policy or the resource policy → otherwise implicit deny.</p>
<p style="line-height: 1.75;">A useful way to hold it: <strong>Allows must come from somewhere; Denies come from anywhere.</strong> A single Allow in one place can be enough; a single Deny in any place is always enough.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The same-account vs cross-account rule, again</h4>
<p style="line-height: 1.75;">Because this interacts with evaluation, restate it precisely:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Same account:</strong> identity policy <strong>OR</strong> resource policy allowing is sufficient.</li>
  <li><strong>Cross-account:</strong> identity policy <strong>AND</strong> resource policy must both allow.</li>
  <li><strong>Either way:</strong> a Deny in either one wins.</li>
</ul>
<p style="line-height: 1.75;">One special case to know: for a role's <em>trust</em> policy, the resource policy (the trust policy) is the primary gate, and cross-account assumption additionally needs the caller's identity policy. And for <strong>KMS</strong>, the key policy must delegate to IAM before identity policies mean anything at all.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Ceilings do not grant</h4>
<p style="line-height: 1.75;">This trips people up constantly, so make it explicit. A permissions boundary allowing <code>s3:*</code> grants nothing. An SCP allowing <code>ec2:*</code> grants nothing. They are <em>filters</em>. The formula for an identity with a boundary is:</p>
<p style="line-height: 1.75; margin-left: 1.5rem;"><strong>effective = (identity policies) ∩ (boundary) ∩ (session policy) ∩ (SCP)</strong>, then minus any explicit Deny from anywhere.</p>
<p style="line-height: 1.75;">So if the identity policy allows <code>s3:*</code> and the boundary allows only <code>s3:GetObject</code>, the identity can do <code>GetObject</code> and nothing else. Reverse them and the answer is the same. Intersection is commutative; that is the whole point.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">There is no ordering, no specificity, no precedence</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Statement order is irrelevant.</strong> Putting the Deny first or last changes nothing. <code>Sid</code> values are labels, not priorities.</li>
  <li><strong>Specificity is irrelevant.</strong> A Deny on <code>s3:*</code> beats an Allow on <code>s3:GetObject</code> for one exact object ARN. Unlike firewall rules or security groups, there is no "more specific rule wins".</li>
  <li><strong>Policy type does not create precedence.</strong> Inline versus managed makes no difference; both are identity policies.</li>
  <li><strong>Security groups are not a model for this.</strong> Security groups have no deny at all; IAM does. Do not carry intuition across.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">NotAction, NotResource and NotPrincipal — the sharp edges</h4>
<p style="line-height: 1.75;">These invert matching and are genuinely dangerous.</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><code>"Effect": "Allow", "NotAction": "iam:*"</code> means "allow every action in AWS except IAM" — including services that launch next year. Almost never what you want on a workload.</li>
  <li><code>"Effect": "Deny", "NotAction": [...]</code> is the safer pattern: deny everything except a listed set. This is how many SCP guardrails are written.</li>
  <li><code>NotPrincipal</code> with Deny is notoriously hard to reason about and AWS advises against it; prefer a Deny with a condition such as <code>StringNotEquals</code> on <code>aws:PrincipalArn</code>.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Conditions and the <code>IfExists</code> trap</h4>
<p style="line-height: 1.75;">A condition that references a key <em>not present</em> in the request does not match, which for a Deny means the Deny does not fire. This produces bypasses. The classic example is denying actions when <code>aws:MultiFactorAuthPresent</code> is false: for a request signed with long-term user credentials the key may be absent, so the Deny silently does not apply. Using <code>BoolIfExists</code> changes the semantics — it treats "absent" as a match — which is usually what you want for an MFA guardrail. Similarly, a Deny conditioned on <code>aws:SourceIp</code> will not fire for calls made by AWS services on your behalf, because there is no source IP; combine with <code>aws:ViaAWSService</code>.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">How to debug a decision in practice</h4>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Read the error carefully.</strong> AWS now often names the cause: "with an explicit deny in a service control policy", "in an identity-based policy", "because no identity-based policy allows". That sentence saves an hour.</li>
  <li><strong><code>sts:get-caller-identity</code></strong> to confirm which principal you actually are.</li>
  <li><strong>IAM Policy Simulator</strong> (<code>simulate-principal-policy</code>) to test identity policies, boundaries and SCPs without making real calls.</li>
  <li><strong>Hunt for Denies first</strong>, because they are final: identity policies, resource policy, boundary, SCP, session policy.</li>
  <li><strong>Then look for a missing Allow</strong>, checking resource ARN shape (the S3 bucket-vs-object trap) and exact action names.</li>
  <li><strong>Check conditions</strong> — especially region, VPC endpoint, tags, MFA — and whether an <code>IfExists</code> variant is needed.</li>
  <li><strong>CloudTrail</strong> for the real request parameters; the simulator tests your assumptions, CloudTrail shows reality.</li>
</ol>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Worked examples</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Identity policy allows <code>s3:*</code>; bucket policy denies the principal. → <strong>Denied.</strong> Explicit deny wins.</li>
  <li>Identity policy allows nothing; bucket policy (same account) allows <code>s3:GetObject</code>. → <strong>Allowed.</strong> Same-account OR.</li>
  <li>Same as above but cross-account. → <strong>Denied.</strong> Both sides required.</li>
  <li>Identity policy allows <code>ec2:*</code>; SCP does not include EC2. → <strong>Denied.</strong> The ceiling never granted it.</li>
  <li>Boundary allows <code>s3:GetObject</code>; identity policy allows <code>s3:PutObject</code>. → <strong>Denied for both.</strong> The intersection is empty.</li>
  <li>Session policy allows <code>s3:GetObject</code> on one prefix; role allows <code>s3:*</code> on the bucket. → <strong>Only that prefix.</strong> Intersection.</li>
</ul>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The evaluation, written out as pseudocode</h4>
<p style="line-height: 1.75;">If the prose version has not yet clicked, the procedural version usually does. For a request consisting of a principal, an action, a resource and a request context:</p>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Gather</strong> every applicable document: SCPs on the account and its parent OUs, RCPs, the principal's identity policies (managed and inline), its permissions boundary, any session policy on the current session, and the resource's own policy.</li>
  <li><strong>Scan for explicit Deny.</strong> If any statement in <em>any</em> of those matches the action, resource and conditions with <code>Effect: Deny</code> — <strong>return DENY</strong>. Stop. Nothing later in the procedure can change this.</li>
  <li><strong>Check the organisation ceilings.</strong> If an SCP applies and does not Allow the action — <strong>return DENY</strong>. Same for an applicable RCP on the resource side.</li>
  <li><strong>Check the identity ceilings.</strong> If a permissions boundary applies and does not Allow — <strong>return DENY</strong>. If a session policy applies and does not Allow — <strong>return DENY</strong>.</li>
  <li><strong>Look for an Allow.</strong> Same account: an Allow in the identity policy <em>or</em> the resource policy suffices. Different accounts: <strong>both</strong> must Allow.</li>
  <li><strong>Otherwise</strong> — <strong>return DENY</strong> (implicit).</li>
</ol>
<p style="line-height: 1.75;">Notice that five of the six outcomes are denials, which is a fair reflection of how IAM actually behaves. Notice too that the ceilings are checked for <em>absence of Allow</em>, not for presence of Deny — that is the formal statement of "ceilings do not grant", and it is why a boundary with an empty statement list denies everything.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">SCPs in a little more depth</h4>
<p style="line-height: 1.75;">Since SCPs are the layer most candidates are vaguest about, the details worth carrying:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>They never grant.</strong> An SCP is a filter on what IAM in the account may grant, nothing more.</li>
  <li><strong>They attach to the root, an OU, or an account</strong>, and they are <strong>inherited</strong> down the tree. The effective SCP for an account is the intersection of every SCP on its path from the organisation root.</li>
  <li><strong><code>FullAWSAccess</code> is attached by default</strong> at every level. If you detach it without attaching a replacement Allow, you have denied everything in that subtree. This is a genuine, well-known way to break an organisation.</li>
  <li><strong>Two styles.</strong> The deny-list style keeps <code>FullAWSAccess</code> and adds targeted Deny statements — simpler and far more common. The allow-list style removes <code>FullAWSAccess</code> and enumerates permitted services — much stricter and much more work to maintain.</li>
  <li><strong>They do not apply</strong> to the management account's principals, nor to service-linked roles. Both exceptions exist for good reasons and both are exam favourites.</li>
  <li><strong>They apply to the root user of member accounts</strong>, which is one of the few ways to constrain a root user at all.</li>
</ul>
<p style="line-height: 1.75;">Typical guardrails you would expect to find: deny leaving the organisation, deny disabling CloudTrail/Config/GuardDuty, deny deleting or disabling KMS keys, deny root-user actions in member accounts, deny regions outside an approved list, deny creating IAM users and access keys, and deny changing the account's contact or billing settings.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">RCPs, the newer half of the picture</h4>
<p style="line-height: 1.75;">SCPs bound what your <em>principals</em> can do, but for a long time nothing bounded what your <em>resources</em> could permit. An administrator in a member account could write a bucket policy granting access to an arbitrary external account, and no organisation-level control stopped it. <strong>Resource control policies</strong> close that gap: attached at the organisation, OU or account level, they set a ceiling on what resource-based policies in those accounts can effectively grant.</p>
<p style="line-height: 1.75;">The canonical use is a <strong>data perimeter</strong>: an RCP denying access to your S3, SQS, KMS, Secrets Manager and STS resources unless the principal is in your organisation or on an explicit allow-list of partners. Combined with the identity-side equivalents — SCPs restricting which external resources your principals may reach — you get the two halves of a perimeter: your data cannot leave, and your identities cannot fetch from untrusted places. As with SCPs, RCPs never grant, and a default <code>RCPFullAWSAccess</code> policy is attached so that adding RCPs does not immediately break everything.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Reading a modern AccessDenied message</h4>
<p style="line-height: 1.75;">AWS has invested heavily in making denial messages diagnostic, and knowing the phrasings saves enormous time. The patterns and what each means:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><em>"because no identity-based policy allows the X action"</em> — implicit deny. You need to add an Allow. Nothing is blocking you.</li>
  <li><em>"with an explicit deny in an identity-based policy"</em> — find the Deny in the attached policies. More Allows will not help.</li>
  <li><em>"with an explicit deny in a resource-based policy"</em> — the target resource's policy is denying you; look at the bucket/queue/key policy, often a TLS or VPC-endpoint condition.</li>
  <li><em>"with an explicit deny in a service control policy"</em> — organisation-level. You probably cannot fix this yourself; it is a conversation with the platform team.</li>
  <li><em>"with an explicit deny in a permissions boundary"</em> — the identity's ceiling excludes this.</li>
  <li><em>"because no session policy allows"</em> — the credentials were minted with a scope-down policy.</li>
  <li><em>"is not authorized to perform: iam:PassRole"</em> — a PassRole grant is missing or too narrowly scoped; check <code>iam:PassedToService</code> too.</li>
  <li><em>"with an explicit deny in a VPC endpoint policy"</em> — the endpoint itself restricts what is reachable through it.</li>
</ul>
<p style="line-height: 1.75;">A practical note: these detailed messages are not universal across every service, and some services deliberately return a generic message to avoid leaking information about resources you cannot see. When you get a bare <code>AccessDenied</code> with no explanation, that is often the reason, and the simulator becomes your best tool.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Where the simulator helps, and where it misleads</h4>
<p style="line-height: 1.75;"><code>simulate-principal-policy</code> evaluates identity policies, boundaries, and (with the right inputs) organisation policies, returning <code>allowed</code>, <code>explicitDeny</code> or <code>implicitDeny</code> plus the matching statements. The distinction between the two deny types is the most useful thing it gives you, because it tells you immediately whether you are hunting a Deny or adding an Allow.</p>
<p style="line-height: 1.75;">Its limits are worth knowing so you do not trust it blindly. It does not always account for <strong>resource-based policies</strong> unless you supply them, it cannot know <strong>request context</strong> you do not provide (region, source IP, tags, MFA state — supply these with <code>--context-entries</code> or conditions will not be evaluated as they would be in reality), and it cannot model <strong>service-specific authorisation</strong> that happens outside IAM, such as S3 Block Public Access or a KMS grant. When the simulator says allowed and reality says denied, one of those three is almost always the reason — and CloudTrail's record of the actual request parameters is how you find out which.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Twelve scenarios, resolved</h4>
<p style="line-height: 1.75;">The fastest way to be fluent here is to have run the procedure many times. Additional cases beyond the ones above:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Identity allows <code>s3:GetObject</code>; SCP denies all of S3. → <strong>Denied.</strong> Explicit deny at the organisation level.</li>
  <li>Identity allows nothing; a same-account KMS key policy grants the principal <code>kms:Decrypt</code> directly. → <strong>Allowed.</strong> Same-account OR, and KMS key policies grant directly.</li>
  <li>Identity allows <code>kms:Decrypt</code>; key policy has no IAM delegation statement. → <strong>Denied.</strong> KMS requires the key policy to delegate before identity policies apply.</li>
  <li>Session policy allows <code>s3:*</code>; role policy allows nothing. → <strong>Denied.</strong> Session policies only intersect.</li>
  <li>Boundary allows <code>s3:*</code>; identity allows <code>s3:*</code>; bucket policy denies non-TLS; request is HTTPS. → <strong>Allowed.</strong> The Deny's condition does not match.</li>
  <li>Same as above but the request is plain HTTP. → <strong>Denied.</strong> The condition matches, so the Deny fires.</li>
  <li>Identity allows <code>ec2:*</code>; SCP denies everything outside eu-west-1; the call is to us-east-1. → <strong>Denied.</strong></li>
  <li>An SCP denies <code>ec2:TerminateInstances</code>; Auto Scaling scales in via its service-linked role. → <strong>Allowed.</strong> SCPs do not apply to SLRs.</li>
  <li>A role's trust policy allows an account; the caller's identity policy is silent; cross-account. → <strong>Denied</strong> at the AssumeRole call.</li>
  <li>Identity allows <code>iam:PassRole</code> on <code>"*"</code>; SCP denies <code>iam:*</code>. → <strong>Denied</strong>, and correctly so.</li>
  <li>Resource policy grants an external account; RCP restricts to the organisation. → <strong>Denied.</strong> The RCP ceiling excludes it.</li>
  <li>Identity and resource policies both allow; the identity's boundary omits the action. → <strong>Denied.</strong> The boundary caps the identity side regardless of the resource policy for identity-policy-based access.</li>
</ul>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Common misconceptions, stated and corrected</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><em>"The most specific policy wins."</em> No. There is no specificity rule at all. A broad Deny beats a narrow Allow.</li>
  <li><em>"Statements are evaluated top to bottom."</em> No. Order is irrelevant, and rearranging a policy changes nothing.</li>
  <li><em>"Inline policies override managed ones."</em> No. Both are identity policies and are treated identically.</li>
  <li><em>"An SCP grants permissions to the account."</em> No. It only bounds what the account may grant.</li>
  <li><em>"A permissions boundary is a policy that gives permissions."</em> No. It only intersects.</li>
  <li><em>"If I add an Allow, the Deny stops mattering."</em> No, and this is the most consequential misconception in practice.</li>
  <li><em>"Resource policies and identity policies are always ANDed."</em> Only across accounts. Within one account they are ORed.</li>
  <li><em>"A condition that references a missing key is ignored safely."</em> It causes the statement not to match — which for a Deny means your guardrail silently does nothing.</li>
  <li><em>"Deny-by-default means I do not need Deny statements."</em> Implicit deny is overridable by any Allow anywhere; explicit Deny is not. Guardrails need the explicit kind.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Why the order is what it is</h4>
<p style="line-height: 1.75;">It is worth being able to say <em>why</em> AWS chose deny-wins rather than something more nuanced. The reason is predictability under composition. In a system where many independent parties write policies — an organisation's security team, an account's administrators, a resource's owner, the caller themselves via a session policy — any rule where "the strongest grant wins" or "the most specific rule wins" would mean that adding a policy could <em>increase</em> someone's access unexpectedly. With deny-wins and intersection-only ceilings, adding any policy can only ever reduce or maintain access, never expand it beyond what was already granted.</p>
<p style="line-height: 1.75;">That monotonicity is what makes guardrails trustworthy: a platform team can attach an SCP knowing no account administrator can undo it, and a security team can attach an emergency Deny knowing no combination of existing Allows will survive it. The cost is the counter-intuitive moments — a specific Allow losing to a broad Deny — but those are the price of a system where the safe direction is the only direction things can move.</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Two sentences to carry into the interview</h4>
<p style="line-height: 1.75;"><strong>Allows must come from somewhere; denies come from anywhere.</strong> And <strong>ceilings never grant — they only ever remove.</strong> If those two sentences are solid, you can reconstruct the entire evaluation procedure on the spot, work out any scenario an interviewer invents, and explain why adding permissions cannot fix a Deny. Everything else in this topic — the six policy types, the cross-account rule, the condition operators — is detail hanging off those two claims.</p>

<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Explicit deny beats everything, then an explicit allow grants, and anything unmatched is an implicit deny — so default is deny and you can never fix an explicit deny by adding more allows. The full evaluation assembles SCPs and RCPs as organisation ceilings, permissions boundaries and session policies as per-identity ceilings, plus identity and resource policies. Ceilings never grant, they only intersect. Within one account an allow in either the identity or the resource policy is enough; across accounts both are required. There's no statement ordering and no 'most specific wins' — a deny on <code>s3:*</code> beats an allow on one exact object. The trap I watch for is conditions: a Deny whose condition key isn't present in the request simply doesn't fire, which is why MFA guardrails need <code>BoolIfExists</code> rather than <code>Bool</code>."</div>
</div>`,
          examples: [
            `# ---------- The rule, demonstrated ----------
# Statement order does NOT matter. Specificity does NOT matter.
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VerySpecificAllow",
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::acme-data/reports/q3.csv"
    },
    {
      "Sid": "BroadDeny",
      "Effect": "Deny",
      "Action": "s3:*",
      "Resource": "*"
    }
  ]
}
# Result: DENIED. The broad deny beats the specific allow.
# Unlike security groups or firewall rules, there is no "most specific wins".`,

            `# ---------- Ceilings do not grant. They filter. ----------
# Permissions boundary attached to the role:
{ "Effect": "Allow", "Action": ["s3:GetObject", "s3:ListBucket"], "Resource": "*" }

# Identity policy attached to the same role:
{ "Effect": "Allow", "Action": "s3:*", "Resource": "arn:aws:s3:::acme-data/*" }

# effective = identity INTERSECT boundary
#   s3:GetObject  on acme-data/*   -> ALLOWED (in both)
#   s3:PutObject  on acme-data/*   -> DENIED  (not in boundary)
#   s3:GetObject  on other-bucket  -> DENIED  (not in identity policy)
#
# A boundary alone grants NOTHING. Same for SCPs and session policies.`,

            `# ---------- The IfExists trap: a Deny that silently never fires ----------
# BROKEN - long-term credentials may omit the key entirely, so no match,
# so the Deny does not apply and the action goes through.
{
  "Effect": "Deny",
  "Action": "ec2:TerminateInstances",
  "Resource": "*",
  "Condition": { "Bool": { "aws:MultiFactorAuthPresent": "false" } }
}

# CORRECT - "IfExists" treats an absent key as a match
{
  "Effect": "Deny",
  "Action": "ec2:TerminateInstances",
  "Resource": "*",
  "Condition": { "BoolIfExists": { "aws:MultiFactorAuthPresent": "false" } }
}

# Same class of bug with SourceIp: AWS services calling on your behalf have
# no source IP, so exempt them explicitly.
{
  "Effect": "Deny",
  "Action": "*",
  "Resource": "*",
  "Condition": {
    "NotIpAddress": { "aws:SourceIp": ["203.0.113.0/24"] },
    "Bool":         { "aws:ViaAWSService": "false" }
  }
}`,

            `# ---------- Guardrails: Deny + NotAction is the safe inversion ----------
# SCP: allow only these regions, but never block global services
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Deny",
    "NotAction": [
      "iam:*", "organizations:*", "route53:*", "cloudfront:*",
      "support:*", "sts:*", "budgets:*", "waf:*"
    ],
    "Resource": "*",
    "Condition": {
      "StringNotEquals": { "aws:RequestedRegion": ["eu-west-1", "eu-central-1"] }
    }
  }]
}

# DANGEROUS inversion - allows every service that exists, and every
# service AWS launches in future, except IAM:
# { "Effect": "Allow", "NotAction": "iam:*", "Resource": "*" }`,

            `# ---------- Debugging a decision ----------
# 1. Who am I actually?
aws sts get-caller-identity

# 2. Simulate WITHOUT making the real call - includes boundaries and SCPs
aws iam simulate-principal-policy \\
  --policy-source-arn arn:aws:iam::123456789012:role/orders-api \\
  --action-names s3:GetObject s3:PutObject kms:Decrypt \\
  --resource-arns arn:aws:s3:::acme-data/reports/q3.csv \\
  --query 'EvaluationResults[].[EvalActionName,EvalDecision,MatchedStatements[].SourcePolicyId]'
# EvalDecision: allowed | explicitDeny | implicitDeny
#   explicitDeny -> hunt the Deny. More Allows will NOT help.
#   implicitDeny -> nothing granted it. Add an Allow.

# 3. Modern error messages often name the cause outright:
#  "...with an explicit deny in a service control policy"
#  "...with an explicit deny in a resource-based policy"
#  "...because no identity-based policy allows the s3:GetObject action"
#  "...with an explicit deny in a permissions boundary"

# 4. Test a policy document before attaching it
aws iam simulate-custom-policy \\
  --policy-input-list file://candidate.json \\
  --action-names s3:DeleteObject \\
  --resource-arns "arn:aws:s3:::acme-data/*"`,
          ],
          questions: [
            {
              question: "Explain IAM policy evaluation logic.",
              solution: "<p>AWS gathers every applicable policy and applies a fixed order: <strong>(1) explicit Deny wins</strong> — a matching <code>Deny</code> anywhere ends the evaluation and cannot be overridden; <strong>(2) explicit Allow</strong> — a matching <code>Allow</code> with no Deny grants the request; <strong>(3) implicit Deny</strong> — nothing matched, so the request is denied by default. The applicable policies are organisation SCPs and RCPs, permissions boundaries, session policies, identity-based policies and resource-based policies. Ceilings (SCPs, RCPs, boundaries, session policies) never grant anything — they intersect. Within one account an Allow in either the identity or resource policy suffices; across accounts both must allow. There is no statement ordering and no most-specific-wins rule.</p>",
            },
            {
              question: "An SCP allows s3:* but the user still can't access S3. Why?",
              solution: "<p>Because <strong>an SCP never grants permissions</strong> — it only defines the maximum that IAM in that account is permitted to grant. The user still needs an identity-based policy (or a resource-based policy) actually allowing <code>s3:GetObject</code> on the relevant ARNs. The same misconception applies to permissions boundaries: a boundary allowing <code>s3:*</code> grants nothing by itself. The formula is effective = identity policies ∩ boundary ∩ session policy ∩ SCP, minus any explicit Deny from anywhere.</p>",
            },
            {
              question: "Can you override an explicit Deny by adding an Allow?",
              solution: "<p>No, never — and this is the most common practical mistake in IAM troubleshooting. An explicit <code>Deny</code> that matches the request ends the evaluation immediately, regardless of how many Allows exist, which policy type they are in, how specific they are, or where they appear in the document. The correct response is to <strong>find and remove or narrow the Deny</strong>, or add a condition to it that exempts the legitimate case. <code>simulate-principal-policy</code> distinguishes <code>explicitDeny</code> from <code>implicitDeny</code>, which tells you immediately whether you are hunting a Deny or adding an Allow.</p>",
            },
            {
              question: "A Deny statement conditioned on MFA doesn't seem to work. What's wrong?",
              solution: "<p>The condition key is probably <strong>absent</strong> from the request, and a condition that references a missing key does not match — so the Deny never fires. With <code>\"Bool\": {\"aws:MultiFactorAuthPresent\": \"false\"}</code>, a request signed with long-term user credentials may simply not carry the key, silently bypassing the guardrail. Use <strong><code>BoolIfExists</code></strong>, which treats an absent key as matching. The same class of bug affects <code>aws:SourceIp</code> denies, because calls AWS services make on your behalf have no source IP — combine those with <code>aws:ViaAWSService</code> so you do not accidentally block legitimate service-initiated calls.</p>",
            },
            {
              question: "Does statement order or specificity matter in a policy?",
              solution: "<p>Neither. Policy evaluation is <strong>order-independent</strong> and has <strong>no specificity rule</strong>. A <code>Deny</code> on <code>s3:*</code> with <code>Resource: \"*\"</code> beats an <code>Allow</code> on <code>s3:GetObject</code> for one exact object ARN, whichever appears first. <code>Sid</code> values are labels for humans and logs, not priorities. Nor does policy type create precedence — inline and managed policies are both identity policies and are treated identically. This is unlike security groups (which have no deny at all) and unlike firewall rule lists, so intuition from those models is actively misleading here.</p>",
            },
            {
              question: "Walk through: identity policy allows s3:GetObject, bucket policy in another account allows nothing. Result?",
              solution: "<p><strong>Denied.</strong> For cross-account access <strong>both</strong> sides must allow: the caller's identity policy <em>and</em> the resource's policy in the owning account. Here the resource side never granted the foreign principal, so the request fails with an implicit deny on the resource side. Had this been the <em>same</em> account, an Allow in either document would have been sufficient and the call would have succeeded. And in either case, an explicit <code>Deny</code> on either side would have ended it regardless — for example a bucket policy denying requests that do not arrive over TLS or through a specific VPC endpoint.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic-cross-account.html",
            "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_evaluation.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_condition_operators.html",
          ],
        },
        {
          topic: "Instance Profile — The Container That Lets EC2 Use an IAM Role",
          tags: ["aws", "iam", "instance profile", "ec2", "imds", "imdsv2", "ssrf", "metadata"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  An <strong>instance profile</strong> is a small, boring wrapper object whose only job is to hold exactly one IAM role and be attachable to an EC2 instance. You cannot attach a role to an instance directly; EC2's API takes an instance profile, not a role. Most of the time you never notice this, because the console and most tooling create the profile silently when you create the role — and then one day you create a role with the CLI or CDK, try to attach it to an instance, and get a baffling error about a profile that does not exist.
</p>
<p style="line-height: 1.75;">The plain version: <strong>the role is the permission set; the instance profile is the socket the role plugs into so EC2 can use it.</strong> It exists for historical and structural reasons — EC2 needed a single account-scoped object it could reference, with its own ARN and its own name — and it has essentially no properties of its own beyond holding one role.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The rules worth memorising</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>An instance profile contains <strong>exactly one role</strong>. Not zero usefully, and never two — the API accepts <code>add-role-to-instance-profile</code> only once.</li>
  <li>An instance can have <strong>one instance profile</strong> at a time. To change permissions you either edit the role's policies or replace the association.</li>
  <li>The profile and the role <strong>usually share a name</strong> when created via the console or CloudFormation, which is exactly why people think they are the same object.</li>
  <li>The profile has its own ARN: <code>arn:aws:iam::123456789012:instance-profile/web-server</code>. Note the resource type.</li>
  <li>The role inside must have a <strong>trust policy naming <code>ec2.amazonaws.com</code></strong>. Without it, EC2 cannot assume it and the instance gets no credentials.</li>
  <li>Only EC2 uses this wrapper. Lambda, ECS, CodeBuild and the rest reference roles directly. <strong>Instance profiles are an EC2-specific concept.</strong></li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">How the credentials actually reach your code</h4>
<p style="line-height: 1.75;">This is the part that makes instance profiles genuinely valuable rather than merely convenient, and it is a great interview answer because it shows you know the mechanism rather than the button.</p>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li>EC2 assumes the role on the instance's behalf through STS.</li>
  <li>The resulting temporary credentials are published to the <strong>Instance Metadata Service</strong> at the link-local address <code>169.254.169.254</code>, under <code>/latest/meta-data/iam/security-credentials/&lt;role-name&gt;</code>.</li>
  <li>Any AWS SDK, finding no credentials in environment variables or the shared config file, walks its credential chain and eventually queries that endpoint.</li>
  <li>EC2 <strong>rotates the credentials automatically</strong>, refreshing them well before expiry — typically several times a day — so a long-running process never sees an expired token if it uses the SDK properly.</li>
</ol>
<p style="line-height: 1.75;">The consequences are the whole point: <strong>no secret is stored on disk, in the AMI, in a snapshot, in an environment variable, in your repository, or in your configuration management</strong>. There is nothing to rotate manually and nothing to leak in a backup. This is why "use an instance profile" is the correct answer to "how should my EC2 app authenticate to S3?" essentially every time.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">IMDSv2 — the part that is actually a security question</h4>
<p style="line-height: 1.75;">The metadata service has a serious weakness in its original form (IMDSv1): it answers a plain HTTP GET with no authentication. If your application has a <strong>server-side request forgery</strong> bug — anything that fetches a URL supplied by a user — an attacker can make the application fetch <code>http://169.254.169.254/latest/meta-data/iam/security-credentials/</code> and read back your role's live credentials. That is not theoretical: it is the mechanism behind the <strong>Capital One breach</strong>, where a misconfigured WAF with SSRF exposure yielded instance credentials that could read S3 buckets.</p>
<p style="line-height: 1.75;"><strong>IMDSv2</strong> fixes it with a session-oriented handshake: you must first <code>PUT</code> to <code>/latest/api/token</code> to obtain a token, then send that token in the <code>X-aws-ec2-metadata-token</code> header on every read. This defeats SSRF in practice because the typical SSRF primitive can only issue GETs, cannot set custom headers, and cannot perform the PUT. Two further defences come with it:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>The token response carries a <strong>TTL with a hop limit</strong>. Setting the hop limit to <strong>1</strong> means the response will not survive a network hop, which blocks containers on the host from reaching the host's metadata — a common lateral-movement path in Kubernetes and Docker.</li>
  <li>You can disable IMDSv1 entirely (<code>HttpTokens=required</code>), and enforce it fleet-wide with an SCP denying <code>ec2:RunInstances</code> unless <code>ec2:MetadataHttpTokens</code> is <code>required</code>.</li>
</ul>
<p style="line-height: 1.75;">A modern answer to "how do you secure instance credentials?" is therefore: instance profile with a least-privilege role, IMDSv2 required, hop limit 1, metadata disabled entirely where the workload does not need AWS access, and GuardDuty enabled so that any use of those credentials from outside AWS raises <code>UnauthorizedAccess:IAMUser/InstanceCredentialExfiltration</code>.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The errors you will actually hit</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>"Invalid IAM Instance Profile name"</strong> when launching, after creating the role with the CLI. You created a role but no profile. Create the profile and add the role to it.</li>
  <li><strong>"Value (role-name) for parameter iamInstanceProfile.name is invalid"</strong> — you passed the <em>role</em> name where the <em>profile</em> name is expected. They are different objects even when identically named.</li>
  <li><strong>Attached the profile, still AccessDenied.</strong> Check whether the instance had credentials cached from a previous profile, whether the role's trust policy names <code>ec2.amazonaws.com</code>, and whether an environment variable or a stale <code>~/.aws/credentials</code> on the box is shadowing the metadata credentials. The SDK credential chain prefers environment variables and config files <em>over</em> instance metadata, so a leftover key file silently wins.</li>
  <li><strong>Works a few minutes after launch, not immediately.</strong> IAM is eventually consistent and the association takes a moment to propagate; retry with backoff in bootstrap scripts.</li>
  <li><strong>Cannot delete the role.</strong> You must remove it from the instance profile first, then delete the profile.</li>
  <li><strong>A pod in EKS can read the node's credentials.</strong> Hop limit is not 1, or you should be using IRSA / EKS Pod Identity so each pod gets its own role instead of inheriting the node's.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The <code>PassRole</code> connection</h4>
<p style="line-height: 1.75;">Launching an instance with a profile means handing a role to a service, and IAM treats that as a privileged act. The launcher needs <strong><code>iam:PassRole</code></strong> for the role in question, plus <code>ec2:RunInstances</code> and often <code>iam:AddRoleToInstanceProfile</code>. This is not bureaucracy — without it, anyone who could launch instances could launch one carrying an administrator role and then read its credentials from metadata, which is one of the classic privilege-escalation paths in AWS. Always scope <code>PassRole</code> to specific role ARNs and add a condition on <code>iam:PassedToService</code> equal to <code>ec2.amazonaws.com</code>.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Where the equivalent lives on other compute</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Lambda</strong> — execution role, referenced directly. No profile.</li>
  <li><strong>ECS/Fargate</strong> — two different roles: the <em>task execution role</em> (for ECR pulls and log writes, used by the agent) and the <em>task role</em> (used by your code). Confusing these is a common bug.</li>
  <li><strong>EKS</strong> — IRSA or Pod Identity gives each service account its own role; relying on the node instance profile gives every pod on the node the same permissions.</li>
  <li><strong>On-premises servers</strong> — <strong>IAM Roles Anywhere</strong> exchanges an X.509 certificate from your private CA for role credentials, giving you the instance-profile experience without EC2.</li>
</ul>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What else lives in instance metadata, and why it matters</h4>
<p style="line-height: 1.75;">Credentials are the headline, but the metadata service exposes a lot more, and knowing the surface explains why locking it down matters beyond IAM. Available at <code>169.254.169.254</code>: the instance ID, type, AMI ID, hostname, region and availability zone, the security groups, the private and public IP addresses, the MAC address and VPC details, the IAM role name and its credentials, and — importantly — <strong>user data</strong>.</p>
<p style="line-height: 1.75;">User data is the bootstrap script the instance was launched with, and it is readable by anything that can reach the metadata service. Teams still occasionally put database passwords, API tokens or private keys in user data, which means an SSRF bug or a compromised low-privilege process can read them even if the IAM role itself is perfectly scoped. The rule: <strong>treat user data as world-readable within the instance</strong>, and put secrets in Secrets Manager or Parameter Store, fetched at runtime using the role.</p>
<p style="line-height: 1.75;">There is also <strong>instance identity document</strong> data, cryptographically signed by AWS, which can be used to prove to an external system that a request genuinely comes from a particular EC2 instance in a particular account — a useful primitive for bootstrapping trust with systems that are not IAM-aware.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Designing the role behind the profile</h4>
<p style="line-height: 1.75;">The instance profile is the plumbing; the interesting design decisions are in the role it holds. A few patterns that consistently work:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>One role per workload, not per fleet.</strong> If a web tier and a batch tier share an instance profile, each gets the union of both permission sets. Separate launch templates with separate profiles cost nothing.</li>
  <li><strong>Include <code>AmazonSSMManagedInstanceCore</code></strong> so you can use Session Manager for shell access. This lets you remove SSH keys, close port 22, and get audited, IAM-controlled access to the box — a large security win that costs one managed policy.</li>
  <li><strong>Scope by tag where the fleet is dynamic.</strong> Conditions on <code>ec2:ResourceTag</code> let one role serve instances that come and go, without enumerating instance IDs.</li>
  <li><strong>Be careful with <code>ec2:*</code> on an instance role.</strong> An instance that can modify instances can attach a different, more privileged profile to itself — a neat escalation that looks harmless in a policy review.</li>
  <li><strong>Prefer Parameter Store or Secrets Manager over user data</strong> for configuration, granting the role read access to a specific path only.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Auto Scaling, launch templates and profile changes</h4>
<p style="line-height: 1.75;">In any real deployment the profile is set in a <strong>launch template</strong> rather than on individual instances, and that changes how updates behave. Editing the role's policies takes effect immediately on every running instance, because the role is the same object and the credentials it issues are refreshed continuously. Changing <em>which</em> profile the template references only affects instances launched afterwards — existing instances keep the association they were created with until you replace them or explicitly call <code>replace-iam-instance-profile-association</code>.</p>
<p style="line-height: 1.75;">That asymmetry is worth knowing because it determines your remediation path in an incident. If an instance role is over-privileged, tightening the <strong>policy</strong> fixes the running fleet in seconds. If you instead swap the profile in the launch template, nothing changes until an instance refresh, which on a large ASG can take a long time. In an emergency, attach a Deny to the role rather than re-plumbing the fleet.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The container and Kubernetes dimension</h4>
<p style="line-height: 1.75;">Containers complicate the picture because, by default, every container on a host can reach that host's metadata service — meaning every container inherits the node's role. On ECS with EC2 launch type, the fix is to use <strong>task roles</strong>, which the agent serves through a separate credentials endpoint scoped per task, and to set <code>ECS_AWSVPC_BLOCK_IMDS</code> or a hop limit of 1 so tasks cannot reach the instance profile directly. On Fargate the question does not arise, because there is no shared host to reach.</p>
<p style="line-height: 1.75;">On EKS, the equivalent is <strong>IRSA</strong> or the newer <strong>Pod Identity</strong>. IRSA projects a signed service-account token into the pod, which the SDK exchanges via <code>AssumeRoleWithWebIdentity</code> for credentials of a role whose trust policy pins the cluster's OIDC issuer, the namespace and the service account name. Pod Identity achieves the same outcome with less per-cluster setup. Either way, you should <em>also</em> set the node's metadata hop limit to 1, because otherwise a pod can simply bypass the whole mechanism and use the node role instead — and node roles typically hold ECR pull and CNI permissions that you would rather not hand to application code.</p>
<p style="line-height: 1.75;">A clean summary for interviews: <strong>the node's instance profile is infrastructure identity; the pod's role is application identity; and the hop limit is what stops the second from silently becoming the first.</strong></p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">An IMDS hardening checklist</h4>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Require IMDSv2</strong> (<code>HttpTokens=required</code>) on every instance, and set it in launch templates so new instances inherit it.</li>
  <li><strong>Set the hop limit to 1</strong> unless you have a specific, documented reason not to.</li>
  <li><strong>Disable the endpoint entirely</strong> (<code>HttpEndpoint=disabled</code>) for workloads that make no AWS calls.</li>
  <li><strong>Enforce it organisationally</strong> with an SCP denying <code>ec2:RunInstances</code> when <code>ec2:MetadataHttpTokens</code> is not <code>required</code>, and with an AMI-level default where supported.</li>
  <li><strong>Audit for stragglers</strong> — <code>describe-instances</code> filtered on <code>metadata-options.http-tokens=optional</code> finds them; AWS Config has managed rules for the same.</li>
  <li><strong>Keep SDKs current</strong>, since older versions may not speak IMDSv2 and will break when you enforce it — this is the main practical blocker to rollout and is worth testing before flipping the switch fleet-wide.</li>
  <li><strong>Turn on GuardDuty</strong> so credential use from outside AWS is detected even if everything above fails.</li>
</ol>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">A concrete incident walkthrough</h4>
<p style="line-height: 1.75;">The Capital One breach is the canonical example here, and being able to narrate it precisely — rather than just naming it — makes the IMDSv2 discussion land. The chain of events, simplified to its IAM-relevant parts:</p>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li>A web application firewall hosted on EC2 had a <strong>server-side request forgery</strong> vulnerability: it could be induced to make HTTP requests to URLs an attacker supplied.</li>
  <li>The attacker pointed it at <code>169.254.169.254</code> and read the <strong>instance profile credentials</strong> straight out of IMDSv1, which required no token and no headers.</li>
  <li>Those credentials belonged to a role with <strong>broad S3 permissions</strong> across the account, far beyond what the WAF itself needed.</li>
  <li>The attacker used them to list and download data from many buckets.</li>
</ol>
<p style="line-height: 1.75;">Four separate controls would each have broken the chain, which is why this example is so instructive. <strong>IMDSv2</strong> would have defeated step 2, because the SSRF primitive could not issue the required PUT or set the token header. <strong>Least privilege</strong> on the role would have limited step 3 to one bucket instead of many. <strong>A data perimeter</strong> — bucket policies requiring access via a VPC endpoint — would have made the credentials useless from outside the environment. And <strong>GuardDuty</strong> would have flagged instance credentials being used from an external IP.</p>
<p style="line-height: 1.75;">The point to make in an interview is that none of these is exotic; all four are configuration, all four are cheap, and the incident is memorable precisely because each layer was individually sufficient. When someone asks why you bother setting a metadata hop limit, this is the answer.</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Putting the whole chain together</h4>
<p style="line-height: 1.75;">It is worth tracing the full path once, end to end, because it connects every concept in this level. A developer writes <code>s3.get_object(...)</code> with no credentials configured. The SDK walks its credential chain and reaches instance metadata. EC2 has already called <strong>STS</strong> to assume the role held by the <strong>instance profile</strong> attached to this instance, using a <strong>trust policy</strong> that names <code>ec2.amazonaws.com</code>. STS returned temporary credentials, which EC2 published to IMDS and refreshes automatically. The SDK signs the request with them, including the session token. IAM then evaluates the role's <strong>permission policies</strong>, any <strong>permissions boundary</strong>, the account's <strong>SCPs</strong>, and the bucket's <strong>resource policy</strong>, applying explicit-deny-first. If everything allows, the object comes back — and CloudTrail records the call against <code>assumed-role/web-server/i-0123...</code>.</p>
<p style="line-height: 1.75;">Every single topic in this level appears in that paragraph, which is why instance profiles are such a good interview subject: they are simple in themselves, but explaining one properly requires you to have the whole model. A candidate who can narrate that chain has demonstrated more than a candidate who can define six terms.</p>
<p style="line-height: 1.75;">The corresponding design summary: <strong>attach the narrowest role you can, require IMDSv2 with hop limit 1, never put secrets in user data, use Session Manager instead of SSH keys, and scope <code>iam:PassRole</code> so nobody can hand a privileged role to an instance they control.</strong> Those five decisions cover essentially every way this mechanism goes wrong in practice.</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">A note on how to answer this in an interview</h4>
<p style="line-height: 1.75;">The trap with this question is answering only the definitional half — "it's a container for a role that EC2 uses" — and stopping. That is correct and forgettable. The answer that lands adds three things: <em>why</em> the wrapper exists as a separate object and the error you get when you forget it; <em>how</em> credentials physically reach the process, via STS and the metadata service, with automatic rotation and no secret on disk; and <em>what</em> the security work actually is, which is IMDSv2, the hop limit, and scoped <code>PassRole</code>.</p>
<p style="line-height: 1.75;">That structure — definition, mechanism, hardening — works for most IAM questions, and it is especially effective here because the mechanism is genuinely interesting and the hardening story has a famous incident attached to it. It also naturally invites the follow-up questions you want, about containers, Kubernetes and credential exfiltration, rather than the ones you do not.</p>


<p style="line-height: 1.75;">One closing caution worth carrying into practice: the convenience of instance profiles is exactly what makes over-permissioned ones so common. Because there is no secret to manage, nobody feels the cost of a broad role the way they feel the cost of distributing a broad key — so the role quietly accumulates permissions that nobody would have agreed to hand out as a credential. Reviewing instance roles against what the workload actually calls, using service-last-accessed data, is therefore worth doing on a schedule rather than only at creation.</p>


<p style="line-height: 1.75;">It is also worth knowing the small set of related settings that live next to the profile on the instance and affect how the role behaves in practice. Tags on the instance become available as <code>ec2:ResourceTag</code> condition keys, so a policy can vary by environment without a separate role per environment. The instance's subnet determines whether traffic reaches AWS services through a VPC endpoint, which matters if your bucket policies condition on <code>aws:SourceVpce</code>. And the AMI itself determines which SDK versions are installed, which in turn determines whether enforcing IMDSv2 will break anything — the most common blocker to rolling that out fleet-wide is an old SDK or an old version of a monitoring agent baked into a golden image years ago.</p>

<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "An instance profile is a container holding exactly one IAM role, and it's what EC2 actually accepts — you can't attach a role to an instance directly. The console hides this by creating both with the same name, which is why people hit 'invalid instance profile' when they create a role via the CLI. Mechanically, EC2 assumes the role and publishes rotating temporary credentials to the metadata service at 169.254.169.254, so the SDK picks them up with no secret on disk. The security work is IMDSv2: require the PUT-token handshake, set the hop limit to 1 so containers can't reach the host's metadata, and disable metadata entirely where it isn't needed — that's the defence against the SSRF path behind the Capital One breach. And launching with a profile requires <code>iam:PassRole</code>, which I always scope to named roles with an <code>iam:PassedToService</code> condition."</div>
</div>`,
          examples: [
            `# ---------- The console hides this. The CLI does not. ----------
# 1. The role, trusting EC2
cat > trust.json <<'EOF'
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "Service": "ec2.amazonaws.com" },
    "Action": "sts:AssumeRole"
  }]
}
EOF
aws iam create-role --role-name web-server --assume-role-policy-document file://trust.json
aws iam attach-role-policy --role-name web-server \\
  --policy-arn arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore

# 2. The PROFILE - the separate object EC2 actually accepts
aws iam create-instance-profile --instance-profile-name web-server
aws iam add-role-to-instance-profile \\
  --instance-profile-name web-server --role-name web-server

# Skip step 2 and launching fails with:
#   "Invalid IAM Instance Profile name"
# ...even though the role exists and is perfectly correct.

aws iam get-instance-profile --instance-profile-name web-server \\
  --query 'InstanceProfile.[Arn,Roles[].RoleName]'`,

            `# ---------- Attach, replace, inspect ----------
# At launch
aws ec2 run-instances --image-id ami-0abc --instance-type t3.micro \\
  --iam-instance-profile Name=web-server \\
  --metadata-options "HttpTokens=required,HttpPutResponseHopLimit=1,HttpEndpoint=enabled"

# To a running instance
aws ec2 associate-iam-instance-profile \\
  --instance-id i-0123456789abcdef0 \\
  --iam-instance-profile Name=web-server

# Swap it (needs the ASSOCIATION id, not the instance id)
ASSOC=$(aws ec2 describe-iam-instance-profile-associations \\
  --filters Name=instance-id,Values=i-0123456789abcdef0 \\
  --query 'IamInstanceProfileAssociations[0].AssociationId' --output text)
aws ec2 replace-iam-instance-profile-association \\
  --association-id $ASSOC --iam-instance-profile Name=web-server-v2`,

            `# ---------- On the instance: where the credentials come from ----------
# IMDSv1 (legacy) - a plain GET. This is the SSRF hole.
curl http://169.254.169.254/latest/meta-data/iam/security-credentials/

# IMDSv2 - PUT for a token first, then send it as a header
TOKEN=$(curl -X PUT "http://169.254.169.254/latest/api/token" \\
  -H "X-aws-ec2-metadata-token-ttl-seconds: 21600" -s)

curl -H "X-aws-ec2-metadata-token: $TOKEN" -s \\
  http://169.254.169.254/latest/meta-data/iam/security-credentials/web-server
# {
#   "AccessKeyId": "ASIA...", "SecretAccessKey": "...",
#   "Token": "...", "Expiration": "2026-09-14T18:00:00Z"
# }
# EC2 refreshes these automatically, well before Expiration.
# An SSRF bug can usually only issue GETs and cannot set headers,
# which is exactly why IMDSv2 blocks it.`,

            `# ---------- Enforce IMDSv2 everywhere ----------
# Existing instance: require tokens, stop container hop
aws ec2 modify-instance-metadata-options \\
  --instance-id i-0123456789abcdef0 \\
  --http-tokens required --http-put-response-hop-limit 1

# Workload needs no AWS access at all? Turn metadata off entirely.
aws ec2 modify-instance-metadata-options \\
  --instance-id i-0123456789abcdef0 --http-endpoint disabled

# Find everything still allowing IMDSv1
aws ec2 describe-instances \\
  --filters "Name=metadata-options.http-tokens,Values=optional" \\
  --query 'Reservations[].Instances[].[InstanceId,PrivateIpAddress]' --output table

# SCP: refuse to launch instances that allow IMDSv1
{
  "Effect": "Deny",
  "Action": "ec2:RunInstances",
  "Resource": "arn:aws:ec2:*:*:instance/*",
  "Condition": {
    "StringNotEquals": { "ec2:MetadataHttpTokens": "required" }
  }
}`,

            `# ---------- PassRole: the escalation path this closes ----------
# Without a scoped PassRole, anyone who can launch an instance can launch
# one carrying an admin role and read its credentials from metadata.

# GOOD: name the role, pin the service
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["ec2:RunInstances", "ec2:AssociateIamInstanceProfile"],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": "iam:PassRole",
      "Resource": "arn:aws:iam::123456789012:role/web-server",
      "Condition": {
        "StringEquals": { "iam:PassedToService": "ec2.amazonaws.com" }
      }
    }
  ]
}

# Cleanup order matters - the role cannot be deleted while it is in a profile
aws iam remove-role-from-instance-profile \\
  --instance-profile-name web-server --role-name web-server
aws iam delete-instance-profile --instance-profile-name web-server`,
          ],
          questions: [
            {
              question: "What is an instance profile and why does it exist?",
              solution: "<p>It is a container object that holds <strong>exactly one IAM role</strong> and is the thing EC2's API actually accepts — you cannot attach a role to an instance directly. It has its own ARN (<code>arn:aws:iam::&lt;account&gt;:instance-profile/name</code>) and, when created through the console or CloudFormation, is given the same name as the role, which is why most people never notice it exists. You notice when you create a role via the CLI or an SDK and launching fails with \"Invalid IAM Instance Profile name\": the role is correct, but the wrapper was never created. It is an EC2-specific concept; Lambda, ECS and CodeBuild reference roles directly.</p>",
            },
            {
              question: "How do credentials from an instance profile actually reach the application?",
              solution: "<p>EC2 assumes the role on the instance's behalf via STS and publishes the resulting temporary credentials to the <strong>Instance Metadata Service</strong> at <code>169.254.169.254</code>, under <code>/latest/meta-data/iam/security-credentials/&lt;role-name&gt;</code>. Any AWS SDK, finding nothing earlier in its credential chain, queries that endpoint automatically. EC2 refreshes the credentials well before expiry, so a long-running process never sees an expired token. The result is that <strong>no secret exists on disk, in the AMI, in a snapshot, or in the repository</strong> — nothing to rotate and nothing to leak in a backup.</p>",
            },
            {
              question: "What is IMDSv2 and what attack does it prevent?",
              solution: "<p>IMDSv1 answers an unauthenticated HTTP GET, so any <strong>server-side request forgery</strong> bug in the application — anything that fetches a user-supplied URL — can be pointed at the metadata endpoint to read live role credentials. That is the mechanism behind the <strong>Capital One breach</strong>. <strong>IMDSv2</strong> requires a session handshake: <code>PUT</code> to <code>/latest/api/token</code>, then send the token in an <code>X-aws-ec2-metadata-token</code> header on every read. Typical SSRF primitives can only issue GETs and cannot set custom headers, so the attack fails. Set <code>HttpTokens=required</code>, set <code>HttpPutResponseHopLimit=1</code> so containers cannot reach the host's metadata, and disable the endpoint entirely where the workload needs no AWS access.</p>",
            },
            {
              question: "You attached an instance profile but the app still gets AccessDenied. What do you check?",
              solution: "<p>In order: (1) does the role's <strong>trust policy name <code>ec2.amazonaws.com</code></strong> — without it EC2 cannot assume it and no credentials are published; (2) is something <strong>shadowing</strong> the metadata credentials, since the SDK credential chain prefers environment variables and <code>~/.aws/credentials</code> over instance metadata, so a leftover key file silently wins; (3) is the role's <strong>permission policy</strong> actually granting the action and resource; (4) is <strong>IMDS reachable</strong> — hop limit, endpoint disabled, or a local firewall blocking 169.254.169.254; (5) <strong>eventual consistency</strong> right after launch, which needs retry with backoff. <code>aws sts get-caller-identity</code> on the box settles which identity is really in use.</p>",
            },
            {
              question: "Why does launching an instance with a role require iam:PassRole?",
              solution: "<p>Because handing a role to a service is a privilege-granting act. Without that check, anyone who could call <code>ec2:RunInstances</code> could launch an instance carrying an <strong>administrator</strong> role and then simply read its credentials from the metadata service — a complete privilege escalation from a modest-looking permission. <code>iam:PassRole</code> makes the ability to hand out a specific role an explicit, auditable grant. Always scope it to named role ARNs rather than <code>\"*\"</code>, and add a condition on <code>iam:PassedToService</code> equal to <code>ec2.amazonaws.com</code> so the role cannot be passed to some other service instead.</p>",
            },
            {
              question: "How do containers on EKS get credentials, and what's wrong with relying on the node's instance profile?",
              solution: "<p>Relying on the node profile gives <strong>every pod on that node the same permissions</strong>, which is the union of what all workloads there need — the opposite of least privilege, and a lateral-movement path when one container is compromised. The correct approach is <strong>IRSA</strong> (IAM Roles for Service Accounts) or <strong>EKS Pod Identity</strong>, where a projected service-account token is exchanged via <code>sts:AssumeRoleWithWebIdentity</code> so each service account maps to its own role. Additionally set the node's <code>HttpPutResponseHopLimit</code> to 1 so pods cannot reach the host's metadata service at all, which is the control that actually blocks the fallback path.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html",
            "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_passrole.html",
            "https://docs.aws.amazon.com/eks/latest/userguide/pod-identities.html",
          ],
        },
        {
          topic: "Service-Linked Role — A Role AWS Predefines and Owns for Its Own Use",
          tags: ["aws", "iam", "service-linked role", "service role", "slr", "autoscaling", "organizations"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  A <strong>service-linked role (SLR)</strong> is a special kind of IAM role that an AWS service creates, owns and maintains in your account so that it can do work on your behalf. You will see them with names like <code>AWSServiceRoleForAutoScaling</code> or <code>AWSServiceRoleForElasticLoadBalancing</code>, always under the path <code>/aws-service-role/</code>. The distinguishing feature is that <strong>the service, not you, controls it</strong>: you cannot edit its permissions, you cannot change who may assume it, and you often cannot delete it while the service is still using it.
</p>
<p style="line-height: 1.75;">The plain-language framing: a normal service role is a uniform <em>you</em> tailor and hand to a service. A service-linked role is a uniform <strong>the service brings with it</strong>, already tailored by AWS, with a label saying "do not alter". You are allowed to look at it and you are allowed to remove it once the service no longer needs it — that is about all.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Service role vs service-linked role — the distinction interviewers want</h4>
<div style="overflow-x: auto; margin-top: 0.75rem;">
<table style="width: 100%; border-collapse: collapse; font-size: 0.92rem;">
  <thead>
    <tr style="background: #f1f5f9; text-align: left;">
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;"></th>
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;">Service role</th>
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;">Service-linked role</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Who creates it</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">You</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">The service (or you, via <code>create-service-linked-role</code>)</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Who defines permissions</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">You</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">AWS — predefined, not editable</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Trust policy editable</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Yes</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">No</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Path</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;"><code>/</code> or your own</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;"><code>/aws-service-role/</code></td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Naming</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Anything</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;"><code>AWSServiceRoleFor&lt;Service&gt;</code></td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Deletion</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Normal <code>delete-role</code></td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Asynchronous, refused while resources depend on it</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Needs <code>iam:PassRole</code></td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Yes</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">No — you never pass it</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Affected by SCPs</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Yes</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;"><strong>No</strong> — SCPs do not apply to SLRs</td></tr>
  </tbody>
</table>
</div>
<p style="line-height: 1.75;">A Lambda execution role is a <em>service role</em>: you create it, you decide what it can touch, you pass it to the function. <code>AWSServiceRoleForAutoScaling</code> is a <em>service-linked role</em>: Auto Scaling created it the first time you made an ASG, and it holds exactly the permissions Auto Scaling needs to launch and terminate instances, register targets and publish metrics.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Why AWS built them</h4>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Correctness.</strong> Before SLRs existed, you hand-wrote the permission list a service needed. When AWS added a feature requiring a new permission, your hand-written role silently broke. SLRs are maintained by AWS, so the permission set tracks the service.</li>
  <li><strong>Safety.</strong> You cannot accidentally over-grant or under-grant them, and you cannot repoint the trust policy so that something else assumes a privileged service role.</li>
  <li><strong>Reliability.</strong> Because the service depends on the role for core operation, AWS blocks deletion while resources still need it. That prevents the classic self-inflicted outage of deleting a role and wondering why scaling stopped.</li>
  <li><strong>Clear audit.</strong> Anything in <code>/aws-service-role/</code> is AWS acting on your behalf, which is a clean line to draw when reviewing CloudTrail.</li>
</ol>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Lifecycle</h4>
<p style="line-height: 1.75;"><strong>Creation</strong> is usually implicit: the first time you create an Auto Scaling group, an ELB, an ECS cluster, an RDS instance with enhanced monitoring, or enable Organizations trusted access for a service, the SLR appears. You can also create one explicitly with <code>aws iam create-service-linked-role --aws-service-name &lt;service&gt;.amazonaws.com</code>, which is useful in pipelines that would otherwise race, or where the creating principal lacks <code>iam:CreateServiceLinkedRole</code> at the moment of first use.</p>
<p style="line-height: 1.75;">Some services allow a <strong>custom suffix</strong>, producing names like <code>AWSServiceRoleForECS_myCluster</code>, so you can distinguish per-resource SLRs. Most do not.</p>
<p style="line-height: 1.75;"><strong>Deletion</strong> is deliberately awkward. You call <code>delete-service-linked-role</code>, which returns a <code>DeletionTaskId</code>; the service then checks whether anything still depends on it. If something does, deletion fails and <code>get-service-linked-role-deletion-status</code> tells you which resources are blocking. The right order is always: delete the dependent resources first, then the role.</p>
<p style="line-height: 1.75;"><strong>Permissions needed:</strong> <code>iam:CreateServiceLinkedRole</code> to create one, <code>iam:DeleteServiceLinkedRole</code> to remove it. A surprisingly common failure in tightly locked-down accounts is a deployment failing because the deploying principal cannot create the SLR a service needs — the error names the service, not the role, which makes it confusing. Many teams pre-create the SLRs their platform uses during account bootstrap for exactly this reason.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The SCP exception, and why it matters</h4>
<p style="line-height: 1.75;">This is the detail that separates a good answer from a memorised one: <strong>service control policies do not apply to service-linked roles.</strong> An SCP denying <code>ec2:TerminateInstances</code> across the organisation will not stop Auto Scaling from terminating instances through its SLR, because the SLR is AWS operating the service rather than a principal in your account acting under your governance.</p>
<p style="line-height: 1.75;">That is intentional — otherwise a well-meaning guardrail would break managed services in ways that are extremely hard to diagnose — but it has two consequences worth stating. First, you cannot use SCPs to constrain what a managed service does internally; if you need that, you constrain the service's configuration instead. Second, when auditing "who can delete this?", remember that SLR activity is a channel your SCPs do not cover.</p>
<p style="line-height: 1.75;">Related detail: SCPs also do not apply to the <strong>management account</strong>'s principals in an organisation, which is why the management account should hold as little workload as possible.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Practical guidance</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Do not try to edit them.</strong> If you find yourself wanting to, you almost certainly want a normal service role for your own workload instead.</li>
  <li><strong>Do not delete them casually</strong> "to tidy up". An SLR with no current dependencies may be recreated automatically, or its absence may break the next scaling event.</li>
  <li><strong>Exclude them from audits deliberately, not accidentally.</strong> Filtering out <code>/aws-service-role/</code> makes role inventories readable — just be conscious you are excluding them.</li>
  <li><strong>Pre-create SLRs in restricted accounts</strong> during bootstrap so that deployments do not fail on <code>iam:CreateServiceLinkedRole</code>.</li>
  <li><strong>Know a few by name</strong> for interviews: <code>AWSServiceRoleForAutoScaling</code>, <code>AWSServiceRoleForElasticLoadBalancing</code>, <code>AWSServiceRoleForOrganizations</code>, <code>AWSServiceRoleForAmazonGuardDuty</code>, <code>AWSServiceRoleForECS</code>, <code>AWSServiceRoleForRDS</code>, <code>AWSServiceRoleForSupport</code>, <code>AWSServiceRoleForTrustedAdvisor</code>.</li>
</ul>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The three kinds of "AWS acts on my behalf", distinguished</h4>
<p style="line-height: 1.75;">Service-linked roles sit inside a family of mechanisms by which an AWS service does something using your account's authority. Being able to separate them cleanly is what makes this topic feel easy:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Service-linked role.</strong> AWS defines it, AWS owns it, you cannot edit it. The service uses it for its own internal operations — Auto Scaling launching instances, ELB managing network interfaces. You did not choose the permissions and you cannot change them.</li>
  <li><strong>Service role (you create it, you pass it).</strong> A Lambda execution role, an ECS task role, a CodeBuild role, a CloudFormation service role. You define the permissions, and you hand it over using <code>iam:PassRole</code>. The service assumes it and acts with the authority <em>you</em> chose.</li>
  <li><strong>Service principal in a resource policy.</strong> No role at all — you simply allow a service principal such as <code>cloudtrail.amazonaws.com</code> to write into your bucket. The service acts directly on the resource under the resource's own policy.</li>
</ul>
<p style="line-height: 1.75;">The clean test for which one you are looking at: <em>did I write the permissions?</em> If yes and I passed it, it is a service role. If yes and I wrote it into a bucket policy, it is a service principal grant. If no, it is a service-linked role.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Trusted access, delegated administration and SLRs in Organizations</h4>
<p style="line-height: 1.75;">SLRs are how most organisation-wide features actually work under the covers, which is worth knowing because it explains a class of confusing behaviour. When you enable <strong>trusted access</strong> for a service in AWS Organizations — GuardDuty, Config, CloudTrail organisation trails, Security Hub, Backup — Organizations creates a service-linked role in <em>every member account</em> so that the service can operate there. Nobody in the member account did anything, and the role appears with no ticket and no CloudFormation stack.</p>
<p style="line-height: 1.75;">This surprises people auditing member accounts: roles they did not create, with permissions they did not grant, that they cannot edit and often cannot delete. That is working as intended — it is the mechanism by which a security team can enable detection across an organisation without asking each account owner to run something. The correct response when you see one is to check which service it belongs to (the trust policy's service principal tells you) and confirm that the corresponding trusted access was enabled deliberately.</p>
<p style="line-height: 1.75;">Related concept worth pairing in an answer: <strong>delegated administration</strong>, where the management account nominates a member account to administer a service organisation-wide. This is how you avoid running security tooling from the management account itself, which is desirable precisely because SCPs do not apply to the management account's principals.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Auditing an account when SLRs are in the way</h4>
<p style="line-height: 1.75;">A typical mature account has dozens of service-linked roles, and they drown out the roles your team actually owns. Practical handling:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Filter by path</strong> in inventories — everything under <code>/aws-service-role/</code> is AWS's, everything else is yours. One JMESPath expression makes a role list readable.</li>
  <li><strong>Do not include them in least-privilege work.</strong> You cannot tighten them, so findings against them are noise. Most scanning tools let you exclude the path; if yours does not, that is worth configuring rather than living with.</li>
  <li><strong>Do include them in "what changed?" monitoring.</strong> A <em>new</em> service-linked role appearing is meaningful — it means somebody enabled a service, or trusted access was turned on organisation-wide. That is a legitimate thing to notice.</li>
  <li><strong>Check them during account decommissioning.</strong> They are frequently what blocks deletion of other resources, and the deletion-status API naming the blocking resources is the fastest way to untangle the order.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Why the SCP exception is not a security hole</h4>
<p style="line-height: 1.75;">It is reasonable to hear "SCPs do not apply to service-linked roles" and think it sounds like a bypass. It is worth being able to explain why it is not, because interviewers sometimes push on it.</p>
<p style="line-height: 1.75;">An SLR can only be assumed by its own service principal — the trust policy is fixed by AWS and names exactly one service. Its permission policy is likewise fixed by AWS and is narrowly scoped to that service's internal operations. So the exception does not let <em>you</em> do anything; it lets the managed service you already chose to use continue functioning. If you did not want Auto Scaling terminating instances, the control is to not use Auto Scaling, or to restrict who can configure it — not to hobble it with a guardrail that would leave the ASG permanently broken in a way that is very hard to diagnose.</p>
<p style="line-height: 1.75;">The genuine security consideration is upstream: <strong>who can enable the service and configure it</strong>. That is an ordinary IAM question about <code>autoscaling:UpdateAutoScalingGroup</code>, <code>organizations:EnableAWSServiceAccess</code>, and <code>iam:CreateServiceLinkedRole</code> — all of which <em>are</em> subject to SCPs. Framing the answer that way shows you understand where the actual control point is.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Scoping iam:CreateServiceLinkedRole properly</h4>
<p style="line-height: 1.75;">Because deployments frequently need to create SLRs, teams often grant <code>iam:CreateServiceLinkedRole</code> on <code>"*"</code> and move on. That is broader than necessary: it allows creating an SLR for <em>any</em> service, which enables services you may not have approved. The condition key <code>iam:AWSServiceName</code> scopes it precisely, so a deployment role can create the SLRs for the services it actually uses and nothing else. Pair that with pre-creating the common ones at account bootstrap, and most of these failures disappear before anyone meets them.</p>
<p style="line-height: 1.75;">The symmetric caution applies to <code>iam:DeleteServiceLinkedRole</code>: it is rarely needed in day-to-day automation, and granting it broadly gives a principal the ability to break managed services in subtle ways. Keep it to break-glass and cleanup roles.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">A short glossary to keep the terms straight</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Service principal</strong> — the identifier of an AWS service, such as <code>autoscaling.amazonaws.com</code>, used as a <code>Principal</code> in trust and resource policies.</li>
  <li><strong>Service role</strong> — a role you create for a service to use, passed with <code>iam:PassRole</code>.</li>
  <li><strong>Service-linked role</strong> — a role AWS creates and controls for a service's own use.</li>
  <li><strong>Execution role</strong> — the service-role term used by Lambda.</li>
  <li><strong>Task role vs task execution role</strong> — in ECS, the first is used by your application code, the second by the ECS agent for image pulls and log writes. Two roles, two purposes, endlessly confused.</li>
  <li><strong>Instance profile</strong> — the EC2-specific container holding one role.</li>
  <li><strong>Trusted access</strong> — the Organizations setting that lets a service operate across member accounts, typically by creating SLRs there.</li>
  <li><strong>Delegated administrator</strong> — a member account nominated to run an organisation-wide service on the management account's behalf.</li>
</ul>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Reading a service-linked role during an investigation</h4>
<p style="line-height: 1.75;">Even though you cannot change them, SLRs show up in investigations and you should be able to interpret what you find. Three things are worth extracting from one:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>The trust policy's service principal</strong> tells you definitively which service the role belongs to, which is more reliable than inferring from the name — especially for the less obvious ones.</li>
  <li><strong>The attached policy under <code>aws-service-role/</code></strong> tells you exactly what the service can do in your account. Reading it is worthwhile at least once per service you adopt: people are often surprised by the breadth of what a managed service legitimately needs, and it is better to learn that during onboarding than during an incident.</li>
  <li><strong>The role's creation date</strong> tells you when the service was first used or when trusted access was enabled, which is frequently the answer to "when did this start?"</li>
</ul>
<p style="line-height: 1.75;">In CloudTrail, actions performed through an SLR appear with the role's ARN as the principal and the service as the invoking entity, which makes them easy to separate from human or workload activity. If you are triaging "who deleted this instance?", seeing <code>AWSServiceRoleForAutoScaling</code> in the principal field is a complete answer — the ASG scaled in — and saves you hunting for a person who does not exist.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The summary that keeps it straight</h4>
<p style="line-height: 1.75;">Three sentences hold the whole topic. <strong>A service-linked role is AWS's own uniform, worn by an AWS service, inside your account.</strong> You may see it and, when nothing needs it, remove it — but you cannot alter what it permits or who may wear it, and your organisation's SCPs do not constrain it. If you find yourself wanting to change one, the object you actually want is a service role of your own, whose permissions you define and whose use you control with <code>iam:PassRole</code>.</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Where SLRs fit in the bigger access model</h4>
<p style="line-height: 1.75;">Stepping back, service-linked roles complete a picture that the rest of this level builds. Access to your account comes from exactly four directions, and each has a different governance story:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Humans</strong>, federated in through an identity provider into roles you define. Governed by trust policies, MFA conditions and Identity Center permission sets.</li>
  <li><strong>Your workloads</strong>, using roles you define through instance profiles, execution roles, task roles or IRSA. Governed by permission policies, boundaries and SCPs.</li>
  <li><strong>External parties</strong> — partner accounts and SaaS vendors — through cross-account roles you define with ExternalId conditions, or through resource policies. Governed the same way, plus Access Analyzer to detect anything you did not intend.</li>
  <li><strong>AWS itself</strong>, operating the managed services you chose, through service-linked roles you do not define and cannot alter.</li>
</ul>
<p style="line-height: 1.75;">The fourth is the one people forget when asked "who can act in this account?", and forgetting it produces both false alarms (a role nobody created, deleting instances) and blind spots (activity your SCPs do not constrain). Naming all four, and being clear that the fourth is deliberately outside your control because you delegated the operation of that service to AWS when you adopted it, is a complete and confident answer.</p>
<p style="line-height: 1.75;">It also points at where the real control lives. You cannot restrict what Auto Scaling does through its SLR — but you entirely control who may create an Auto Scaling group, what launch template it may use, which role that template may pass, and whether the service could be enabled in this account at all. Governance of managed services is governance of their <em>configuration</em>, and that is ordinary IAM.</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Quick recognition guide</h4>
<p style="line-height: 1.75;">When you encounter an unfamiliar role and need to classify it in seconds: check the <strong>path</strong> first. <code>/aws-service-role/</code> means service-linked — AWS owns it, you cannot edit it, SCPs do not apply. <code>/aws-reserved/sso.amazonaws.com/</code> means Identity Center provisioned it — do not hand-edit, change the permission set instead. Anything else is yours, and the trust policy tells you whether it is a service role (a service principal), a cross-account role (an account or role ARN), a federated role (a provider ARN), or an internal role (a principal in your own account).</p>
<p style="line-height: 1.75;">Those four buckets cover essentially every role you will meet, and knowing which one you are looking at determines immediately whether a finding against it is actionable, whether editing it will be overwritten, and who to talk to about changing it. It is a small piece of practical knowledge that saves a great deal of wasted investigation in accounts with hundreds of roles.</p>


<p style="line-height: 1.75;">A final practical reminder: service-linked roles are one of the few places in IAM where the correct action is usually to leave something alone. The instinct to tidy, tighten or standardise serves you well nearly everywhere else in this topic — and works actively against you here, where the role is a contract between your account and a managed service that AWS maintains on both sides. Recognise them, understand what they permit, exclude them from the work you can actually do, and spend the effort on the roles you own.</p>


<p style="line-height: 1.75;">Two more details round the topic out. Some services support multiple service-linked roles for different functions rather than a single one, so seeing several roles for the same service is normal rather than a sign of duplication. And a service-linked role that you delete may simply reappear the next time the service needs it, which is not a failure of your cleanup — it is the service recreating what it requires. If a role keeps coming back, the question to ask is not how to delete it more forcefully but which configuration still depends on the service, because that dependency is the thing you actually wanted to remove.</p>

<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "A service-linked role is a role predefined and owned by an AWS service so it can act on your behalf. It lives under the path <code>/aws-service-role/</code>, is named <code>AWSServiceRoleFor&lt;Service&gt;</code>, and its permissions and trust policy are set by AWS and can't be edited. It's usually created implicitly the first time you use the service, and deletion is asynchronous and refused while dependent resources exist. The distinction from a plain service role — like a Lambda execution role — is ownership: you create and scope a service role and pass it with <code>iam:PassRole</code>, whereas you never pass an SLR at all. The detail worth knowing is that <strong>SCPs don't apply to service-linked roles</strong>, so an org-wide deny on <code>ec2:TerminateInstances</code> won't stop Auto Scaling from terminating instances."</div>
</div>`,
          examples: [
            `# ---------- Spot them by path and name ----------
aws iam list-roles --path-prefix /aws-service-role/ \\
  --query 'Roles[].[RoleName,AssumeRolePolicyDocument.Statement[0].Principal.Service]' \\
  --output table
# AWSServiceRoleForAutoScaling            autoscaling.amazonaws.com
# AWSServiceRoleForElasticLoadBalancing   elasticloadbalancing.amazonaws.com
# AWSServiceRoleForOrganizations          organizations.amazonaws.com
# AWSServiceRoleForAmazonGuardDuty        guardduty.amazonaws.com

# Their policies live under a path you cannot attach from
aws iam list-attached-role-policies --role-name AWSServiceRoleForAutoScaling
# arn:aws:iam::aws:policy/aws-service-role/AutoScalingServiceRolePolicy

# Make role inventories readable by excluding them (consciously)
aws iam list-roles \\
  --query "Roles[?!starts_with(Path, '/aws-service-role/')].RoleName" --output text`,

            `# ---------- Create explicitly instead of waiting for implicit creation ----------
aws iam create-service-linked-role \\
  --aws-service-name autoscaling.amazonaws.com \\
  --description "Managed by AWS Auto Scaling"

# Some services support a suffix, for per-resource separation
aws iam create-service-linked-role \\
  --aws-service-name ecs.amazonaws.com \\
  --custom-suffix myCluster
# -> AWSServiceRoleForECS_myCluster

# In a locked-down account, pre-create during bootstrap so deploys do not
# fail on a missing iam:CreateServiceLinkedRole permission:
for svc in autoscaling elasticloadbalancing ecs rds guardduty; do
  aws iam create-service-linked-role --aws-service-name $svc.amazonaws.com \\
    2>/dev/null && echo "created $svc" || echo "$svc already present"
done`,

            `# ---------- You cannot edit them. Try and see. ----------
aws iam update-assume-role-policy \\
  --role-name AWSServiceRoleForAutoScaling \\
  --policy-document file://mine.json
# An error occurred (UnmodifiableEntity): Service role policies may not be
# modified. Cannot update the assume role policy of a service-linked role.

aws iam attach-role-policy --role-name AWSServiceRoleForAutoScaling \\
  --policy-arn arn:aws:iam::aws:policy/AdministratorAccess
# An error occurred (UnmodifiableEntity)

# If you want to change what a service can do, you almost certainly want
# your OWN service role for your OWN workload instead.`,

            `# ---------- Deletion is asynchronous and dependency-aware ----------
TASK=$(aws iam delete-service-linked-role \\
  --role-name AWSServiceRoleForAutoScaling \\
  --query DeletionTaskId --output text)

aws iam get-service-linked-role-deletion-status --deletion-task-id "$TASK"
# {
#   "Status": "FAILED",
#   "Reason": {
#     "Reason": "Cannot delete entity, must remove referencing resources first.",
#     "RoleUsageList": [
#       { "Region": "eu-west-1", "Resources": ["my-asg", "my-other-asg"] }
#     ]
#   }
# }
# Correct order: delete the Auto Scaling groups first, THEN the role.
# "Tidying up" an SLR whose service is still in use breaks the next scaling event.`,

            `# ---------- The SCP exception, made concrete ----------
# This SCP applies to every principal in the account...
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Deny",
    "Action": ["ec2:TerminateInstances"],
    "Resource": "*"
  }]
}
# ...but NOT to AWSServiceRoleForAutoScaling. Auto Scaling will still
# terminate instances during a scale-in. SCPs do not apply to
# service-linked roles (nor to the management account's principals).

# So to constrain a managed service, constrain its CONFIGURATION instead:
{
  "Effect": "Deny",
  "Action": ["autoscaling:UpdateAutoScalingGroup", "autoscaling:SetDesiredCapacity"],
  "Resource": "*",
  "Condition": { "StringNotEquals": { "aws:PrincipalTag/Team": "platform" } }
}`,
          ],
          questions: [
            {
              question: "What is a service-linked role and how does it differ from a service role?",
              solution: "<p>A <strong>service-linked role</strong> is predefined and owned by an AWS service so the service can act on your behalf. It sits under the path <code>/aws-service-role/</code>, is named <code>AWSServiceRoleFor&lt;Service&gt;</code>, and neither its permissions nor its trust policy can be edited — AWS maintains them. A <strong>service role</strong> is one <em>you</em> create and scope, such as a Lambda execution role or an ECS task role, and you hand it to the service using <code>iam:PassRole</code>. The practical differences are ownership and lifecycle: you never pass an SLR, you cannot modify it, and deleting it is asynchronous and refused while dependent resources still exist.</p>",
            },
            {
              question: "How are service-linked roles created and deleted?",
              solution: "<p><strong>Created</strong> usually implicitly — the first time you create an Auto Scaling group, a load balancer, an ECS cluster or enable a service in Organizations, the role appears — or explicitly with <code>aws iam create-service-linked-role --aws-service-name &lt;service&gt;.amazonaws.com</code>, which requires <code>iam:CreateServiceLinkedRole</code>. <strong>Deleted</strong> with <code>delete-service-linked-role</code>, which returns a <code>DeletionTaskId</code>; the service then checks dependencies and, if any resource still needs the role, fails with a <code>RoleUsageList</code> naming the blocking resources. The correct order is always to delete the dependent resources first. In tightly locked-down accounts it is common to pre-create the needed SLRs at bootstrap, because deployments otherwise fail with a confusing error naming the service rather than the missing IAM permission.</p>",
            },
            {
              question: "Do SCPs apply to service-linked roles?",
              solution: "<p><strong>No</strong>, and that is a deliberate exception. An SCP denying <code>ec2:TerminateInstances</code> organisation-wide will not stop Auto Scaling from terminating instances through <code>AWSServiceRoleForAutoScaling</code>, because an SLR represents AWS operating the managed service rather than one of your principals acting under your governance. Without the exception, ordinary guardrails would break managed services in ways that are very hard to diagnose. Two consequences: you cannot use SCPs to constrain what a managed service does internally — you constrain its <em>configuration</em> instead — and when auditing, remember SLR activity is a channel your SCPs do not cover. SCPs likewise do not apply to the organisation's management account principals.</p>",
            },
            {
              question: "Can you modify the permissions on a service-linked role, and what do you do if you need different behaviour?",
              solution: "<p>No — attempts return <code>UnmodifiableEntity</code>, for both <code>update-assume-role-policy</code> and attaching policies. The permission set is maintained by AWS so that it stays correct as the service gains features, which is precisely the problem SLRs were introduced to solve: hand-written service roles used to break silently when AWS added a required permission. If you need different behaviour, you are almost certainly looking at the wrong object — create your own <strong>service role</strong> for your own workload and scope it yourself, or restrict the <em>configuration</em> of the managed service through IAM permissions on its control-plane APIs.</p>",
            },
            {
              question: "Your CloudFormation deployment fails with an error about a service-linked role. What's likely wrong?",
              solution: "<p>The deploying principal most likely lacks <code>iam:CreateServiceLinkedRole</code>, so the service cannot create the role it needs on first use. The error is confusing because it usually names the <em>service</em> rather than the missing IAM permission. Fixes: grant <code>iam:CreateServiceLinkedRole</code> scoped with a condition on <code>iam:AWSServiceName</code> to the specific services you expect, or <strong>pre-create</strong> the SLRs during account bootstrap so deployments never need the permission. A second possibility is an SCP denying <code>iam:CreateServiceLinkedRole</code> at the organisation level — note that the SCP exception protects the SLR's own actions, not the act of creating it.</p>",
            },
            {
              question: "Name some common service-linked roles and what they do.",
              solution: "<p><code>AWSServiceRoleForAutoScaling</code> — launches and terminates instances, registers targets, publishes metrics. <code>AWSServiceRoleForElasticLoadBalancing</code> — manages network interfaces and target health. <code>AWSServiceRoleForOrganizations</code> — created in member accounts when they join an organisation. <code>AWSServiceRoleForAmazonGuardDuty</code> — reads CloudTrail, VPC flow logs and DNS logs for threat detection. <code>AWSServiceRoleForECS</code> — manages ENIs and load balancer registration for tasks. <code>AWSServiceRoleForRDS</code> — manages networking and enhanced monitoring. <code>AWSServiceRoleForSupport</code> and <code>AWSServiceRoleForTrustedAdvisor</code> — exist in every account for support and advisory checks. All live under <code>/aws-service-role/</code>, which is a handy filter when producing a readable inventory of the roles your team actually owns.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/using-service-linked-roles.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_terms-and-concepts.html",
            "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_aws-services-that-work-with-iam.html",
          ],
        },
        {
          topic: "Permissions Boundary — A Hard Ceiling on What an Identity Can Ever Do",
          tags: ["aws", "iam", "permissions boundary", "delegation", "scp", "guardrails", "escalation"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  A <strong>permissions boundary</strong> is a managed policy attached to a user or role that sets the <em>maximum</em> permissions that identity can ever have. It does not grant anything. It caps. The identity's real permissions are the <strong>intersection</strong> of what its policies allow and what its boundary allows, so anything outside the boundary is impossible no matter what anyone attaches later.
</p>
<p style="line-height: 1.75;">The picture that makes it click: the identity policy is <strong>what you asked for</strong>; the boundary is <strong>the size of the plate</strong>. You can ask for anything you like, but nothing beyond the plate reaches you. Give someone a policy allowing <code>*</code> on <code>*</code> and a boundary allowing only S3, and they have S3 — and only S3, forever, until someone with permission changes the boundary itself.</p>
<p style="line-height: 1.75;">Crucially, a boundary that allows <code>s3:*</code> <strong>grants nothing at all</strong> on its own. An identity with a boundary and no policies can do nothing. This is the mistake nearly everyone makes the first time.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The problem boundaries actually solve: safe delegation</h4>
<p style="line-height: 1.75;">Here is the real-world scenario, and it is worth telling as a story because it is exactly what interviewers are probing.</p>
<p style="line-height: 1.75;">Your developers need to create IAM roles — every Lambda needs an execution role, every ECS task needs a task role — and routing those through a central security team is a bottleneck that everybody hates. But granting <code>iam:CreateRole</code> and <code>iam:AttachRolePolicy</code> is a complete privilege escalation: a developer can create a role with <code>AdministratorAccess</code>, assume it, and now they are an administrator. Nothing in ordinary IAM stops that, because you genuinely did give them permission to create roles.</p>
<p style="line-height: 1.75;">The boundary solves it with a neat trick. You grant <code>iam:CreateRole</code> <em>on the condition</em> that the new role is created with a specific boundary attached (<code>iam:PermissionsBoundary</code> condition key), and you deny the developer the ability to remove or change boundaries. Now developers can freely create and manage roles all day, but every role they create is capped by your boundary — they cannot create an administrator, because the boundary forbids it. <strong>Self-service without escalation.</strong> That is the canonical use case, and "safe delegation of IAM to developers" is the sentence an interviewer is listening for.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Boundary vs SCP vs session policy</h4>
<p style="line-height: 1.75;">All three are ceilings, all three intersect, and mixing them up is a common stumble.</p>
<div style="overflow-x: auto; margin-top: 0.75rem;">
<table style="width: 100%; border-collapse: collapse; font-size: 0.92rem;">
  <thead>
    <tr style="background: #f1f5f9; text-align: left;">
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;"></th>
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;">Permissions boundary</th>
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;">SCP</th>
      <th style="padding: 0.6rem; border: 1px solid #e2e8f0;">Session policy</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Applies to</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">One user or role</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">A whole account / OU</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">One assumed session</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Set by</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Account IAM admin</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Organization management account</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Whoever calls AssumeRole</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Attached to groups?</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;"><strong>No</strong> — users and roles only</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">n/a</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">n/a</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Applies to root user</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">No</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Member accounts yes; management account no</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">No</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Applies to SLRs</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">n/a</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;"><strong>No</strong></td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">n/a</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Affects resource policies</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">No</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Indirectly (RCPs do this properly)</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">No</td></tr>
    <tr><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Typical use</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Delegated IAM self-service</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Org guardrails (region lock, no root)</td><td style="padding: 0.6rem; border: 1px solid #e2e8f0;">Per-request scope-down, multi-tenant</td></tr>
  </tbody>
</table>
</div>
<p style="line-height: 1.75;">A useful one-liner: <strong>an SCP caps an account, a boundary caps an identity, a session policy caps a session.</strong> They stack, and the effective permission is the intersection of all of them, minus any explicit Deny from anywhere.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The arithmetic, precisely</h4>
<p style="line-height: 1.75;">For an action to be allowed on an identity with a boundary, <strong>both</strong> must allow it:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Identity policy allows <code>s3:GetObject</code>, boundary allows <code>s3:*</code> → <strong>allowed</strong>.</li>
  <li>Identity policy allows <code>s3:*</code>, boundary allows <code>s3:GetObject</code> → <strong>only GetObject</strong>.</li>
  <li>Identity policy allows <code>ec2:*</code>, boundary allows only S3 → <strong>nothing</strong>. The intersection is empty.</li>
  <li>Boundary allows <code>s3:*</code>, identity policy is empty → <strong>nothing</strong>. Boundaries do not grant.</li>
  <li>A <code>Deny</code> in either → <strong>denied</strong>, as always.</li>
</ul>
<p style="line-height: 1.75;">Two important exceptions to "the boundary caps everything":</p>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Resource-based policies are not limited by the boundary</strong> in the same way. If a bucket in the same account grants the principal access directly through a bucket policy, that grant can succeed even where the identity's boundary would not have allowed it. This surprises people and is a genuinely good senior-level question.</li>
  <li><strong>Boundaries do not restrict the trust relationship</strong>. They cap what a role can <em>do</em>, not who can assume it.</li>
</ol>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Writing the delegation correctly</h4>
<p style="line-height: 1.75;">The developer-self-service policy has four parts, and missing any one of them reopens the escalation hole:</p>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Allow <code>iam:CreateRole</code> and <code>iam:PutRolePolicy</code> / <code>iam:AttachRolePolicy</code> only when <code>iam:PermissionsBoundary</code> equals your boundary ARN.</strong> Without the condition, they can create unbounded roles.</li>
  <li><strong>Deny <code>iam:DeleteRolePermissionsBoundary</code> and <code>iam:PutRolePermissionsBoundary</code></strong> (except for setting your specific boundary). Without this, they simply remove the cap.</li>
  <li><strong>Restrict by path or name prefix</strong>, so developers manage only roles under, say, <code>/dev/</code>, and cannot modify platform roles.</li>
  <li><strong>Deny modification of the boundary policy itself</strong> — <code>iam:CreatePolicyVersion</code>, <code>iam:DeletePolicy</code> on that policy ARN. Otherwise they rewrite the plate.</li>
</ol>
<p style="line-height: 1.75;">Also remember <strong><code>iam:PassRole</code></strong>: a developer who can create a bounded role still needs <code>PassRole</code> to attach it to a Lambda or an instance, and that should be scoped to the same path with an <code>iam:PassedToService</code> condition.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What a good boundary policy contains</h4>
<p style="line-height: 1.75;">Boundaries are usually written as a broad Allow plus targeted Denies, because you are describing an envelope rather than a job. A typical one allows the services your platform uses, then denies the escalation primitives and the things that must never happen: <code>iam:*</code> outside the developers' own path, <code>organizations:*</code>, <code>account:*</code>, changes to CloudTrail and GuardDuty, KMS key deletion, and anything outside approved regions. Remember it counts against the same <strong>6,144-character</strong> limit as any managed policy, so conditions on tags usually beat enumerating resources.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Operational realities</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Debugging is confusing at first.</strong> The identity's attached policies look correct and the call still fails. Modern error messages often say "with an explicit deny in a permissions boundary" or indicate the boundary; <code>simulate-principal-policy</code> accounts for boundaries too.</li>
  <li><strong>One boundary per identity.</strong> You cannot attach two, so the envelope must be expressed in a single document.</li>
  <li><strong>Not attachable to groups.</strong> Users and roles only. To cover a team you attach it when creating each identity — which is exactly what the <code>iam:PermissionsBoundary</code> condition enforces.</li>
  <li><strong>Changing a boundary affects every identity using it immediately</strong>, so treat it like any other shared managed policy: version it, review it, roll it out carefully.</li>
  <li><strong>Audit for missing boundaries.</strong> A role created before the condition existed has none; list roles where <code>PermissionsBoundary</code> is absent.</li>
</ul>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Writing a boundary that will not need constant editing</h4>
<p style="line-height: 1.75;">A boundary is a different kind of document from a permission policy, and writing it like one is the usual mistake. A permission policy describes a <em>job</em>: specific actions on specific resources. A boundary describes an <em>envelope</em>: the space in which many future, unknown jobs may live. That difference has practical consequences for how you write it.</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Be generous on the Allow side, specific on the Deny side.</strong> Allow the services your platform uses broadly, then deny the handful of things that must never happen. A boundary that enumerates individual actions will be edited weekly and will become a bottleneck — which defeats the point, because the point was to remove a bottleneck.</li>
  <li><strong>Deny the escalation primitives explicitly</strong> rather than relying on omission: <code>iam:*</code> outside the delegated path, <code>organizations:*</code>, <code>account:*</code>.</li>
  <li><strong>Deny the "never" list</strong>: stopping CloudTrail, deleting Config recorders, disabling GuardDuty, scheduling KMS key deletion, changing the account's contact details.</li>
  <li><strong>Add a region condition</strong>, remembering to exempt global services.</li>
  <li><strong>Use tag conditions instead of resource lists</strong> so the boundary does not need editing every time a resource is created — and so it stays inside the 6,144-character limit.</li>
  <li><strong>Version it deliberately.</strong> A boundary attached to fifty roles is high blast radius; treat a change to it like a change to a shared library, with review and a rollback plan.</li>
</ul>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Boundaries and the self-modification problem</h4>
<p style="line-height: 1.75;">A boundary only works if the bounded party cannot remove it. There are four ways a naive delegation leaks, and a good answer names them:</p>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Remove the boundary.</strong> <code>iam:DeleteRolePermissionsBoundary</code> must be denied outright.</li>
  <li><strong>Replace the boundary with a weaker one.</strong> <code>iam:PutRolePermissionsBoundary</code> must be denied, or conditioned so only your specific boundary ARN may be set.</li>
  <li><strong>Rewrite the boundary policy itself.</strong> <code>iam:CreatePolicyVersion</code>, <code>iam:SetDefaultPolicyVersion</code> and <code>iam:DeletePolicy</code> on the boundary's own ARN must be denied.</li>
  <li><strong>Create an unbounded role and use it.</strong> This is what the <code>iam:PermissionsBoundary</code> condition on <code>iam:CreateRole</code> prevents; without the condition, the whole scheme is decorative.</li>
</ol>
<p style="line-height: 1.75;">A fifth, subtler leak: if the delegate can create roles outside the restricted path, they can create one that is bounded but sits somewhere your other controls do not expect. Scoping the <code>Resource</code> of <code>iam:CreateRole</code> to a path such as <code>role/dev/*</code> closes it, and has the pleasant side effect of making it obvious at a glance which roles are self-service and which are platform-managed.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Boundaries versus SCPs: choosing, not just distinguishing</h4>
<p style="line-height: 1.75;">Knowing the difference is table stakes; knowing which to reach for is the better answer. The decision usually comes down to three questions:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Does this apply to everyone in the account, or to a specific set of identities?</strong> Everyone → SCP. A delegated group → boundary.</li>
  <li><strong>Should the account's own administrators be able to change it?</strong> If no, it must be an SCP, because a boundary is managed inside the account and anyone with sufficient IAM permissions there can alter it. This is why destructive-action guardrails belong in SCPs even though a boundary could technically express them.</li>
  <li><strong>Is the goal to enable delegation, or to constrain everyone?</strong> Boundaries exist to <em>enable</em> — they let you hand out IAM permissions you otherwise could not. SCPs exist to <em>constrain</em>.</li>
</ul>
<p style="line-height: 1.75;">In practice mature organisations use both, layered: SCPs express non-negotiable organisation policy, boundaries express what each team's self-service envelope looks like, and ordinary policies express individual jobs. Each layer intersects with the others, so a permission must survive all three to exist.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Rolling boundaries out to an existing account</h4>
<p style="line-height: 1.75;">Introducing boundaries to an account that already has hundreds of roles is a migration, not a switch-flip. A sequence that works:</p>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Write the boundary from observed behaviour</strong>, not from first principles. Look at what the existing roles actually use — service-last-accessed data across the population tells you which services belong in the envelope.</li>
  <li><strong>Apply it in audit mode first</strong> — there is no literal audit mode, so the equivalent is to simulate: run <code>simulate-principal-policy</code> for the actions each role has recently performed, with the boundary applied, and look for newly denied results. That is your breakage list, discovered without breaking anything.</li>
  <li><strong>Attach to new roles first</strong>, via the <code>iam:CreateRole</code> condition. New roles get bounded from day one while existing ones are untouched.</li>
  <li><strong>Backfill gradually</strong>, starting with the least critical workloads, monitoring for denials.</li>
  <li><strong>Then tighten the delegation</strong>, removing broad <code>iam:*</code> grants from teams now that they have a safe self-service path.</li>
  <li><strong>Report on coverage</strong> — the count of roles with no boundary, excluding service-linked and SSO-provisioned roles, is a clean metric to drive to zero.</li>
</ol>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The limits worth stating honestly</h4>
<p style="line-height: 1.75;">Boundaries are powerful but they are not a universal containment mechanism, and knowing where they stop is what separates a confident answer from an overclaiming one:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>They do not constrain resource-based policy grants</strong> in the same way. A same-account bucket policy naming the principal can grant access the boundary would not have allowed.</li>
  <li><strong>They do not apply to the root user.</strong> Only SCPs reach the root user of a member account.</li>
  <li><strong>They do not restrict who may assume a role</strong> — that is the trust policy's job.</li>
  <li><strong>They cannot be attached to groups</strong>, so coverage depends on attaching at creation, which is why the creation-time condition matters so much.</li>
  <li><strong>One per identity</strong>, so the whole envelope must fit in one 6,144-character document.</li>
  <li><strong>They are managed inside the account</strong>, so anyone with sufficient IAM permissions there can change them. For controls that must survive a compromised account administrator, use an SCP.</li>
</ul>
<p style="line-height: 1.75;">Stating those limits unprompted is usually worth more in an interview than another paragraph on how the intersection works, because it demonstrates that you know what you have actually bought when you deploy one.</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Boundaries on users, and the self-service pattern</h4>
<p style="line-height: 1.75;">Boundaries attach to users as well as roles, and although users are increasingly rare, the pattern is worth knowing because it generalises. A classic use is a sandbox account where engineers may create their own IAM users and roles for experimentation: grant broad IAM permissions, but condition every creation action on the boundary, and every identity in the account is capped regardless of what people attach to it.</p>
<p style="line-height: 1.75;">The same shape appears in multi-tenant platforms that provision AWS identities on behalf of customers. The platform holds powerful IAM permissions, but every identity it creates carries a boundary derived from that customer's entitlement — so even a bug in the platform's own provisioning logic cannot produce an identity with more access than the customer paid for. That is a meaningfully stronger guarantee than "our code is careful", because it is enforced by IAM rather than by the code that has the bug.</p>

<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The four-layer picture, assembled</h4>
<p style="line-height: 1.75;">Boundaries are the last piece of the layering story, so it is worth assembling all of it in one place, since this is frequently the closing question of an IAM interview. From outermost to innermost:</p>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>SCPs and RCPs</strong> — the organisation's non-negotiables, set outside the account and unalterable from within it. Region locks, protection of logging and detection services, prevention of account-level changes, and the data perimeter.</li>
  <li><strong>Permissions boundaries</strong> — the account's delegation envelope, set by the account's IAM administrators, defining how much authority a self-service team may ever hand itself.</li>
  <li><strong>Identity policies</strong> — the actual job: what this role does, on which resources, under which conditions.</li>
  <li><strong>Session policies</strong> — the per-request narrowing, for multi-tenant isolation or temporary scope-down.</li>
</ol>
<p style="line-height: 1.75;">A permission must survive all four to exist, and a Deny in any of them — plus any resource policy Deny — ends the matter. Being able to draw that stack, say who owns each layer, and explain that ceilings never grant is, more than any single fact, what an IAM interview is trying to establish. Everything else in this topic is an application of it.</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">A worked scenario, start to finish</h4>
<p style="line-height: 1.75;">To make the whole thing concrete: a platform team supports forty product teams, each deploying serverless applications. Each team needs to create Lambda functions, and therefore execution roles, without waiting on the platform team — and without any team being able to grant itself administrator.</p>
<ol style="margin-left: 1.5rem; list-style: decimal; line-height: 2;">
  <li><strong>Write the boundary.</strong> Allow the services the platform supports — Lambda, S3, DynamoDB, SQS, SNS, CloudWatch Logs, X-Ray. Deny <code>iam:*</code> except within the team role path, deny <code>organizations:*</code> and <code>account:*</code>, deny disabling logging and detection, and deny everything outside approved regions.</li>
  <li><strong>Write the delegation policy</strong> attached to each team's deployment role: create and manage roles only under <code>role/app/&lt;team&gt;/*</code>, only with the boundary attached, with removal and replacement of boundaries denied and edits to the boundary policy itself denied.</li>
  <li><strong>Scope <code>iam:PassRole</code></strong> to the same path, conditioned on <code>iam:PassedToService</code> being <code>lambda.amazonaws.com</code>, so a team can attach its own roles to its own functions and nothing else.</li>
  <li><strong>Back it with SCPs</strong> for the things that must hold even if an account administrator is compromised: no leaving the organisation, no disabling CloudTrail, no regions outside the approved list.</li>
  <li><strong>Measure.</strong> Report the number of roles under the app path with no boundary — it should be zero — and review Access Analyzer unused-access findings per team so the envelopes can be tightened over time rather than expanding by default.</li>
</ol>
<p style="line-height: 1.75;">The outcome is worth stating plainly, because it is the reason boundaries exist at all: <strong>forty teams get full IAM self-service for their own workloads, and none of them can escalate.</strong> Without boundaries the only options are a central bottleneck or an account full of people who can make themselves administrator, and neither is acceptable at that scale. That trade — delegation without escalation — is the entire value proposition, and it is the answer to give when someone asks why you would bother with yet another policy layer.</p>


<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">A last framing</h4>
<p style="line-height: 1.75;">If the concept still feels abstract, use this framing: most IAM objects answer the question "what should this identity be able to do?" A permissions boundary answers a different and less common question — <strong>"what should this identity never be able to do, no matter who edits its policies later?"</strong> That shift from present tense to future tense is the whole idea. A permission policy is about now; a boundary is about every change that has not happened yet.</p>
<p style="line-height: 1.75;">That is why boundaries pair naturally with delegation, and why they are largely pointless without it. If you are the only person who edits a role's policies, the boundary adds little — you could simply write a tighter policy. The moment somebody else can edit those policies, the boundary becomes the only thing standing between their future mistakes and your account.</p>


<p style="line-height: 1.75;">And a closing practical note: boundaries are cheap to add and awkward to retrofit, so the highest-leverage moment to introduce one is when you first grant anybody IAM permissions in an account. A condition on <code>iam:PermissionsBoundary</code> attached to that first delegation costs one line and saves a migration later, whereas an account that has already accumulated hundreds of unbounded roles will need the staged rollout described above. If you are designing a new account structure, put the boundary and its creation-time condition into the account baseline alongside the SCPs, and the question never arises.</p>

<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "A permissions boundary is a managed policy attached to a user or role that sets the maximum permissions it can ever have — effective permissions are the intersection of the identity's policies and the boundary, and the boundary grants nothing on its own. The killer use case is safe delegation: I want developers to create their own Lambda and task roles without being able to create an administrator, so I grant <code>iam:CreateRole</code> conditioned on <code>iam:PermissionsBoundary</code> matching my boundary ARN, deny them the ability to remove or change boundaries, and scope them to a role path. The distinctions I'd draw: an SCP caps a whole account and doesn't apply to service-linked roles or the management account, a boundary caps one identity and can't attach to groups, and a session policy caps one session. One subtlety — a resource-based policy can still grant access the boundary wouldn't have allowed."</div>
</div>`,
          examples: [
            `# ---------- The boundary policy: an envelope, not a job ----------
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "TheMostTheyCanEverHave",
      "Effect": "Allow",
      "Action": ["s3:*", "dynamodb:*", "lambda:*", "logs:*", "sqs:*", "sns:*"],
      "Resource": "*"
    },
    {
      "Sid": "NeverTheseNoMatterWhat",
      "Effect": "Deny",
      "Action": [
        "iam:*", "organizations:*", "account:*",
        "cloudtrail:StopLogging", "cloudtrail:DeleteTrail",
        "guardduty:DeleteDetector", "kms:ScheduleKeyDeletion",
        "config:DeleteConfigurationRecorder"
      ],
      "Resource": "*"
    },
    {
      "Sid": "ApprovedRegionsOnly",
      "Effect": "Deny",
      "Action": "*",
      "Resource": "*",
      "Condition": {
        "StringNotEquals": { "aws:RequestedRegion": ["eu-west-1", "eu-central-1"] }
      }
    }
  ]
}

aws iam create-policy --policy-name DeveloperBoundary --policy-document file://boundary.json`,

            `# ---------- Attach it, and watch it cap ----------
aws iam put-role-permissions-boundary \\
  --role-name dev-lambda-role \\
  --permissions-boundary arn:aws:iam::123456789012:policy/DeveloperBoundary

# Even if someone attaches AdministratorAccess to this role...
aws iam attach-role-policy --role-name dev-lambda-role \\
  --policy-arn arn:aws:iam::aws:policy/AdministratorAccess

# ...the effective permissions are the INTERSECTION:
#   s3:PutObject         -> ALLOWED (in both)
#   iam:CreateUser       -> DENIED  (boundary Deny)
#   ec2:RunInstances     -> DENIED  (not in boundary Allow)
#   s3:* in us-east-1    -> DENIED  (boundary region Deny)

aws iam get-role --role-name dev-lambda-role --query 'Role.PermissionsBoundary'`,

            `# ---------- The delegation policy: self-service without escalation ----------
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "CreateRolesOnlyWithTheBoundary",
      "Effect": "Allow",
      "Action": ["iam:CreateRole", "iam:AttachRolePolicy", "iam:PutRolePolicy"],
      "Resource": "arn:aws:iam::123456789012:role/dev/*",
      "Condition": {
        "StringEquals": {
          "iam:PermissionsBoundary":
            "arn:aws:iam::123456789012:policy/DeveloperBoundary"
        }
      }
    },
    {
      "Sid": "HousekeepingWithinTheirPath",
      "Effect": "Allow",
      "Action": ["iam:DeleteRole", "iam:DetachRolePolicy", "iam:TagRole",
                 "iam:UpdateAssumeRolePolicy", "iam:GetRole", "iam:ListRolePolicies"],
      "Resource": "arn:aws:iam::123456789012:role/dev/*"
    },
    {
      "Sid": "NeverRemoveOrRewriteTheCeiling",
      "Effect": "Deny",
      "Action": ["iam:DeleteRolePermissionsBoundary",
                 "iam:DeleteUserPermissionsBoundary"],
      "Resource": "*"
    },
    {
      "Sid": "NeverEditTheBoundaryPolicyItself",
      "Effect": "Deny",
      "Action": ["iam:CreatePolicyVersion", "iam:DeletePolicy",
                 "iam:DeletePolicyVersion", "iam:SetDefaultPolicyVersion"],
      "Resource": "arn:aws:iam::123456789012:policy/DeveloperBoundary"
    },
    {
      "Sid": "PassOnlyTheirOwnRoles",
      "Effect": "Allow",
      "Action": "iam:PassRole",
      "Resource": "arn:aws:iam::123456789012:role/dev/*",
      "Condition": {
        "StringEquals": { "iam:PassedToService": "lambda.amazonaws.com" }
      }
    }
  ]
}
# Miss statement 3 and they remove the cap. Miss statement 4 and they
# rewrite it. Miss the condition in statement 1 and they never had one.`,

            `# ---------- Boundaries grant NOTHING on their own ----------
aws iam create-role --role-name bounded-but-empty \\
  --assume-role-policy-document file://trust.json \\
  --permissions-boundary arn:aws:iam::123456789012:policy/DeveloperBoundary

aws iam list-attached-role-policies --role-name bounded-but-empty
# { "AttachedPolicies": [] }

# Boundary says s3:* is permissible. Identity policy says nothing.
# Effective permissions: NONE. Intersection with the empty set is empty.
# This is the mistake almost everyone makes the first time.`,

            `# ---------- Debug and audit ----------
# The simulator accounts for boundaries
aws iam simulate-principal-policy \\
  --policy-source-arn arn:aws:iam::123456789012:role/dev-lambda-role \\
  --action-names ec2:RunInstances s3:PutObject \\
  --resource-arns "*" \\
  --query 'EvaluationResults[].[EvalActionName,EvalDecision]' --output table
# Modern console errors also say so outright:
#   "...with an explicit deny in a permissions boundary"

# Which roles have NO boundary? (created before the condition existed)
aws iam list-roles \\
  --query "Roles[?!starts_with(Path,'/aws-service-role/') && PermissionsBoundary==null].RoleName" \\
  --output text

# Which identities use this boundary?
aws iam list-entities-for-policy \\
  --policy-arn arn:aws:iam::123456789012:policy/DeveloperBoundary \\
  --policy-usage-filter PermissionsBoundary

# Remove it (dangerous - the cap disappears immediately)
aws iam delete-role-permissions-boundary --role-name dev-lambda-role`,
          ],
          questions: [
            {
              question: "What is a permissions boundary and how does it differ from a policy?",
              solution: "<p>A permissions boundary is a managed policy attached to a user or role that defines the <strong>maximum</strong> permissions that identity can ever have. It never grants anything — effective permissions are the <strong>intersection</strong> of the identity's policies and the boundary. So an identity with a boundary allowing <code>s3:*</code> and no attached policies can do nothing at all, while an identity with <code>AdministratorAccess</code> attached and that same boundary can do only S3. An ordinary policy answers \"what is granted\"; a boundary answers \"what is the most that could ever be granted\".</p>",
            },
            {
              question: "What's the main use case for permissions boundaries?",
              solution: "<p><strong>Safe delegation of IAM to developers.</strong> Teams need to create their own Lambda execution roles and ECS task roles, but granting <code>iam:CreateRole</code> and <code>iam:AttachRolePolicy</code> is a full privilege escalation — a developer creates a role with <code>AdministratorAccess</code>, assumes it, and is now an admin. The fix is to grant role creation <em>conditioned on</em> <code>iam:PermissionsBoundary</code> equalling your boundary ARN, deny the ability to remove or change boundaries, deny editing the boundary policy itself, and scope everything to a role path such as <code>/dev/*</code>. Developers then get full self-service, and every role they create is capped by the envelope you defined.</p>",
            },
            {
              question: "What's the difference between a permissions boundary and an SCP?",
              solution: "<p>Scope and ownership. A <strong>boundary</strong> attaches to <em>one user or role</em> within an account and is managed by that account's IAM administrators; it cannot attach to groups. An <strong>SCP</strong> attaches to an <em>account or organisational unit</em> and is managed from the Organizations management account, applying to every principal in those accounts — with two exceptions: it does not apply to <strong>service-linked roles</strong>, nor to principals in the <strong>management account</strong>. Both are ceilings that only intersect and never grant, and a <strong>session policy</strong> is the third, capping a single assumed session. The one-liner: an SCP caps an account, a boundary caps an identity, a session policy caps a session.</p>",
            },
            {
              question: "An identity has a boundary allowing s3:* but no attached policies. What can it do?",
              solution: "<p><strong>Nothing.</strong> Boundaries do not grant permissions — they only cap them. The effective permission set is the intersection of the identity's policies with the boundary, and intersecting anything with an empty set of grants yields nothing. This is the single most common misconception about boundaries. The same logic applies to SCPs: an SCP allowing <code>ec2:*</code> gives nobody EC2 access; it merely permits IAM within that account to grant it.</p>",
            },
            {
              question: "Can a permissions boundary be bypassed?",
              solution: "<p>In the ordinary identity-policy path, no — the intersection is enforced. But there are important subtleties. <strong>Resource-based policies are not capped the same way</strong>: if a same-account bucket policy grants the principal access directly, that can succeed even where the boundary would not have allowed it — a genuinely good senior-level detail. A boundary also does not restrict <strong>who may assume</strong> a role, only what the role can do. And the delegation itself can be bypassed if you forget to deny <code>iam:DeleteRolePermissionsBoundary</code> or deny editing the boundary policy's versions, since the delegate could then remove or rewrite the cap. SCPs, being outside the account's control, are the backstop for these cases.</p>",
            },
            {
              question: "How do you debug a call that fails even though the attached policies clearly allow it?",
              solution: "<p>Suspect a ceiling. Check, in order: a <strong>permissions boundary</strong> on the identity (<code>get-role --query Role.PermissionsBoundary</code>), an <strong>SCP</strong> on the account or OU, a <strong>session policy</strong> passed at assume time, and an explicit <code>Deny</code> in a resource policy. Modern AWS error messages often name the cause outright — \"with an explicit deny in a permissions boundary\" or \"in a service control policy\" — and <code>simulate-principal-policy</code> evaluates boundaries and SCPs too, returning <code>explicitDeny</code> versus <code>implicitDeny</code>, which tells you whether you are hunting a Deny or a missing Allow. Remember that adding more Allows can never fix an explicit Deny or an empty intersection.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries_delegate.html",
            "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html",
          ],
        },
        {
          topic: "Cross-Account Access via AssumeRole",
          tags: ["aws", "iam", "cross-account", "sts", "assume role", "trust policy", "externalid"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  The canonical way one AWS account reaches another is: <strong>Account B creates a role, Account A's principal assumes it</strong>. No keys are copied between accounts, nothing long-lived is shared, and every use of the access is recorded. If you remember one sentence about multi-account AWS, make it that one.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The two-sided handshake</h4>
<p style="line-height: 1.75;">Cross-account access always needs an Allow on <strong>both sides</strong>, because each account is an independent trust boundary and neither can unilaterally give away the other's control:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Account B (the resource owner)</strong> creates a role whose <strong>trust policy</strong> names a principal in Account A and allows <code>sts:AssumeRole</code>. Attach permission policies describing what the role may do.</li>
  <li><strong>Account A (the caller)</strong> gives its user or role an identity policy allowing <code>sts:AssumeRole</code> on that specific role ARN.</li>
</ul>
<p style="line-height: 1.75;">Miss either half and you get <code>AccessDenied</code> on the <code>AssumeRole</code> call itself — which is a useful diagnostic, because a failure at <em>assume</em> time is always about trust or the caller's <code>sts:AssumeRole</code> permission, never about the role's permission policies.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What happens mechanically</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>A calls <code>sts:AssumeRole</code> with the role ARN and a <code>RoleSessionName</code>.</li>
  <li>STS validates the trust policy, the caller's permission, and any conditions.</li>
  <li>STS returns an <code>ASIA…</code> access key, a secret, a <strong>session token</strong>, and an expiry (15 min to 12 h, default 1 h, capped by the role's <code>MaxSessionDuration</code>).</li>
  <li>The caller's identity for the rest of the session is <code>arn:aws:sts::B:assumed-role/&lt;role&gt;/&lt;session-name&gt;</code>.</li>
  <li>CloudTrail records the <code>AssumeRole</code> event in <strong>both</strong> accounts, and every subsequent call in B carries the session name — so pass something meaningful like the build ID or the human's username.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The trust-policy shorthand that confuses everyone</h4>
<p style="line-height: 1.75;">Writing <code>"Principal": {"AWS": "arn:aws:iam::111122223333:root"}</code> does <strong>not</strong> mean "the root user of account A". It means "<strong>delegate to account A's IAM</strong>" — any principal in A that A's own administrators permit to call <code>sts:AssumeRole</code>. It is a delegation of control, not a specific identity. That is convenient when you trust the other account's administrators and want them to manage who gets in, and dangerous when you do not: if A's admin grants <code>sts:AssumeRole</code> on <code>*</code> to an intern, that intern reaches your role. Naming an exact role ARN instead keeps control on your side.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Hardening the trust policy</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong><code>sts:ExternalId</code></strong> — mandatory when the caller is a <strong>third party</strong> (a SaaS vendor). It defeats the <strong>confused deputy</strong> problem, where an attacker tells the vendor "my account is yours" and the vendor's legitimate credentials are used against you. AWS requires vendors to generate a unique, non-guessable value per customer.</li>
  <li><strong><code>aws:PrincipalOrgID</code></strong> — for internal access, this is stronger than listing accounts, because it keeps working as accounts are added and instantly stops working if an account leaves the org.</li>
  <li><strong>MFA</strong> — <code>"Bool": {"aws:MultiFactorAuthPresent": "true"}</code> on any human-assumable role that touches production.</li>
  <li><strong>Network conditions</strong> — <code>aws:SourceIp</code> for office ranges, or <code>aws:SourceVpce</code>/<code>aws:SourceVpc</code> for private connectivity.</li>
  <li><strong>Session policies</strong> — the caller can pass <code>--policy</code> at assume time to narrow the session further; effective permissions are the <strong>intersection</strong>.</li>
  <li><strong>Session tags</strong> — pass attributes with <code>--tags</code> (needs <code>sts:TagSession</code> in the trust policy) so resource policies in B can do ABAC on who is calling.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Design patterns</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Hub and spoke.</strong> A central identity or CI account holds the principals; each workload account has narrow roles trusting only the hub. One place to manage humans, blast radius contained per spoke.</li>
  <li><strong>Read-only audit role</strong> in every account, trusting the security account, so tooling gets visibility without write access anywhere.</li>
  <li><strong>Deployment roles per environment</strong>, with production requiring an extra gate — MFA, or assumable only from a protected CI environment.</li>
  <li><strong>Resource policy instead of assumption</strong> when a round trip is unwanted: a bucket policy, SQS queue policy or KMS key policy can name the foreign principal directly. Simpler, but the resource owner grants access unilaterally, so it needs Access Analyzer monitoring — and it is exactly what RCPs were built to cap.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Traps</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Role chaining is capped at 1 hour</strong>, regardless of <code>MaxSessionDuration</code>. Multi-hop pipelines die mid-build with <code>ExpiredToken</code> unless the SDK is configured to refresh rather than exporting credentials once.</li>
  <li><strong>Deleting and recreating the trusted role</strong> in A breaks the trust policy silently — the JSON rewrites itself to the raw <code>AROA…</code> principal ID, which no longer exists.</li>
  <li><strong>Cross-account S3 object ownership</strong>: an object written by B into A's bucket used to be owned by B. Enable <strong>Bucket owner enforced</strong> (S3 Object Ownership) so the bucket owner always owns the data and ACLs are disabled entirely.</li>
  <li><strong>KMS</strong>: if the data is encrypted with a customer-managed key, the <strong>key policy</strong> must also grant the foreign principal. Cross-account S3 access that works for unencrypted objects and fails for encrypted ones is almost always this.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Account B creates a role whose trust policy names a principal in Account A, and A's principal gets sts:AssumeRole on that ARN — both sides must allow. STS returns temporary credentials and the identity becomes an assumed-role ARN carrying the session name, which is the audit trail. Writing account-root as the principal delegates to that account's IAM rather than naming its root user. I harden with ExternalId for third parties, aws:PrincipalOrgID internally, MFA for humans, and session policies to narrow a given session. The traps are the one-hour role-chaining cap, and KMS key policies needing the same grant when data is encrypted."</div>
</div>`,
          examples: [
            `# ---------- Account B (222233334444): the role and its trust policy ----------
cat > trust.json <<'EOF'
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "TrustAccountACIRole",
    "Effect": "Allow",
    "Principal": { "AWS": "arn:aws:iam::111122223333:role/ci-runner" },
    "Action": ["sts:AssumeRole", "sts:TagSession"],
    "Condition": {
      "StringEquals": { "sts:ExternalId": "9f2a-unique-per-customer" },
      "StringEquals": { "aws:PrincipalOrgID": "o-abc123xyz" },
      "Bool":         { "aws:MultiFactorAuthPresent": "true" }
    }
  }]
}
EOF
aws iam create-role --role-name cross-deploy \\
  --assume-role-policy-document file://trust.json --max-session-duration 3600
aws iam put-role-policy --role-name cross-deploy --policy-name Deploy \\
  --policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow",
    "Action":["s3:PutObject","s3:GetObject"],"Resource":"arn:aws:s3:::b-artifacts/*"}]}'

# ---------- Account A (111122223333): the caller's permission ----------
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": "sts:AssumeRole",
    "Resource": "arn:aws:iam::222233334444:role/cross-deploy"
  }]
}

# ---------- Assume it ----------
aws sts assume-role \\
  --role-arn arn:aws:iam::222233334444:role/cross-deploy \\
  --role-session-name build-4821 \\
  --external-id 9f2a-unique-per-customer \\
  --tags Key=team,Value=payments --transitive-tag-keys team
# -> ASIA..., secret, SessionToken, Expiration

aws sts get-caller-identity
# arn:aws:sts::222233334444:assumed-role/cross-deploy/build-4821
#                                                     ^ your audit trail

# ---------- Let the SDK chain it automatically (~/.aws/config) ----------
# [profile prod-deploy]
# role_arn        = arn:aws:iam::222233334444:role/cross-deploy
# source_profile  = default
# external_id     = 9f2a-unique-per-customer
# mfa_serial      = arn:aws:iam::111122223333:mfa/alice
# duration_seconds = 3600
aws s3 ls s3://b-artifacts --profile prod-deploy

# ---------- "root" in a trust policy = DELEGATE TO THAT ACCOUNT'S IAM ----------
"Principal": { "AWS": "arn:aws:iam::111122223333:root" }
# NOT "the root user". It means: any principal in 111122223333 whose own admin
# grants it sts:AssumeRole. Tighter alternative -> name the exact role ARN.

# ---------- Alternative: resource policy, no assumption needed ----------
# Bucket policy in B, naming A's role directly
{
  "Effect": "Allow",
  "Principal": { "AWS": "arn:aws:iam::111122223333:role/reader" },
  "Action": ["s3:GetObject","s3:ListBucket"],
  "Resource": ["arn:aws:s3:::b-data", "arn:aws:s3:::b-data/*"]
}
# ...and if the objects are SSE-KMS encrypted, the KEY POLICY must grant it too:
{ "Effect":"Allow","Principal":{"AWS":"arn:aws:iam::111122223333:role/reader"},
  "Action":["kms:Decrypt","kms:DescribeKey"],"Resource":"*" }

# ---------- Bucket owner always owns cross-account writes ----------
aws s3api put-bucket-ownership-controls --bucket b-artifacts \\
  --ownership-controls 'Rules=[{ObjectOwnership=BucketOwnerEnforced}]'

# ---------- Role chaining: 1 hour, hard cap ----------
aws sts assume-role --role-arn ... --duration-seconds 43200   # silently becomes 3600
# Fix: configure the profile so the SDK re-assumes, instead of exporting env vars once.`,
          ],
          questions: [
            {
              question: "Walk me through cross-account access with AssumeRole.",
              solution: "<p>Account B creates a role with a <strong>trust policy</strong> naming a principal in Account A and allowing <code>sts:AssumeRole</code>, plus permission policies for what the role may do. Account A grants its principal <code>sts:AssumeRole</code> on that role ARN. <strong>Both halves are required.</strong> A calls STS, receives an <code>ASIA…</code> key, secret and <strong>session token</strong> valid 15 minutes to 12 hours, and its identity becomes <code>arn:aws:sts::B:assumed-role/&lt;role&gt;/&lt;session&gt;</code>. CloudTrail logs the assumption in both accounts and tags every later call with the session name. Nothing long-lived is ever shared between the accounts.</p>",
            },
            {
              question: "What does \"Principal\": {\"AWS\": \"arn:aws:iam::111122223333:root\"} actually mean in a trust policy?",
              solution: "<p>Not 'the root user of that account' — it means <strong>delegate the decision to that account's IAM</strong>. Any principal in 111122223333 whose own administrators grant it <code>sts:AssumeRole</code> may assume your role. That is useful when you trust the other account's admins to manage membership, and risky when you do not: if they hand out <code>sts:AssumeRole</code> on <code>*</code>, anyone there reaches you. Naming the exact role ARN (<code>…:role/ci-runner</code>) keeps the decision on your side; combining both plus <code>aws:PrincipalOrgID</code> is the belt-and-braces version.</p>",
            },
            {
              question: "A third-party SaaS vendor wants access to your account. How do you set it up safely?",
              solution: "<p>Create a role in your account with the <strong>minimum</strong> permissions the vendor actually needs, trusting the vendor's account, and <strong>require an <code>sts:ExternalId</code></strong> that the vendor generates uniquely for you. The ExternalId defeats the <strong>confused deputy</strong> problem: without it, an attacker could register with the vendor claiming your account ID, and the vendor's legitimate credentials would be used against you. Add <code>aws:SourceIp</code> if the vendor publishes egress ranges, set a short <code>MaxSessionDuration</code>, monitor the role's use in CloudTrail, and review it with Access Analyzer's external-access findings.</p>",
            },
            {
              question: "Cross-account S3 read works for some objects and fails for others. What's your first guess?",
              solution: "<p><strong>SSE-KMS with a customer-managed key.</strong> The bucket policy grants the foreign principal, but the <strong>KMS key policy</strong> does not — so unencrypted or SSE-S3 objects read fine while KMS-encrypted ones return AccessDenied on <code>kms:Decrypt</code>. Grant the foreign principal <code>kms:Decrypt</code> and <code>kms:DescribeKey</code> in the key policy (and <code>kms:GenerateDataKey</code> for writes). The second candidate is <strong>object ownership</strong>: objects written by another account historically stayed owned by that account, so enable <strong>Bucket owner enforced</strong> so the bucket owner owns everything and ACLs are disabled.</p>",
            },
            {
              question: "When would you use a resource-based policy instead of AssumeRole for cross-account access?",
              solution: "<p>When you want to skip the round trip and the service supports it — S3, SQS, SNS, KMS, Lambda, Secrets Manager, ECR, EventBridge. The foreign principal calls the resource directly using its own credentials, which is simpler for data-plane access and avoids the 1-hour role-chaining cap. The trade-offs: the <strong>resource owner grants access unilaterally</strong>, so exposure is easy to create and easy to forget — which is why you pair it with <strong>Access Analyzer external-access findings</strong> and an organisation <strong>RCP</strong> capping who may ever touch your resources. Use <strong>AssumeRole</strong> when you want session-level control, session policies, session tags, MFA conditions, or access to a service with no resource-policy support.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/tutorial_cross-account-with-roles.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic-cross-account.html",
          ],
        },
        {
          topic: "SCP — Org-Level Guardrails, Not IAM Permissions",
          tags: ["aws", "organizations", "scp", "guardrails", "governance", "rcp"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  A <strong>Service Control Policy</strong> is an AWS Organizations feature, not an IAM feature, and conflating the two is the mistake interviewers listen for. IAM operates <em>inside</em> an account and <strong>grants</strong>. An SCP operates <em>above</em> accounts and only ever <strong>limits</strong>.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The one-line distinction</h4>
<p style="line-height: 1.75;"><strong>An SCP defines the maximum set of actions available in an account; IAM decides which of those a principal actually gets.</strong> An action succeeds only if the SCP permits it <em>and</em> IAM allows it. An SCP that allows <code>s3:*</code> gives nobody any access at all — it merely leaves the door open for IAM to grant it.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">How they attach and inherit</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Attach to the <strong>organization root</strong>, an <strong>OU</strong>, or an individual <strong>account</strong>.</li>
  <li>Inheritance is <strong>downward and cumulative</strong>: the effective ceiling for an account is the <strong>intersection</strong> of every SCP from the root through each OU to the account. A permission must survive every level.</li>
  <li>Enabling SCPs attaches <code>FullAWSAccess</code> everywhere by default, so nothing breaks until you deliberately restrict.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Who they apply to — and who escapes</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>They apply to <strong>every principal in a member account, including that account's root user</strong> — which is what makes them qualitatively stronger than any IAM control.</li>
  <li>They <strong>do not apply to the management account at all</strong>, root included. This is the single most important SCP fact, and the reason the management account must hold no workloads.</li>
  <li>They <strong>do not apply to service-linked roles</strong>, so AWS services keep functioning.</li>
  <li>They do not affect resources shared into your accounts from outside, and they do not apply to principals outside your organisation acting on your resources — that gap is what <strong>RCPs</strong> fill.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Deny list vs allow list</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Deny list (recommended).</strong> Keep <code>FullAWSAccess</code> and add Deny statements for specific dangerous actions. New AWS services work automatically; you block what you mean to block. This is what almost every organisation runs.</li>
  <li><strong>Allow list.</strong> Remove <code>FullAWSAccess</code> and enumerate every permitted service. Tighter for regulated environments, but brittle — every new service adoption needs an SCP change, and the 5,120-character SCP size limit arrives quickly.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What people actually put in them</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Protect the audit trail</strong> — deny <code>cloudtrail:StopLogging</code>, <code>DeleteTrail</code>, <code>config:DeleteConfigurationRecorder</code>, <code>guardduty:DeleteDetector</code> to everyone except one break-glass security role.</li>
  <li><strong>Deny <code>organizations:LeaveOrganization</code></strong>, so an account cannot escape its own guardrails.</li>
  <li><strong>Region lock</strong> — deny everything outside your approved regions, with a <code>NotAction</code> carve-out for global services (IAM, Organizations, Route 53, CloudFront, Support, STS, Budgets) or you will break the account.</li>
  <li><strong>Protect the security baseline</strong> — deny deleting or modifying the roles, boundaries and Config rules that your landing zone deploys.</li>
  <li><strong>Deny root usage</strong> in member accounts (<code>aws:PrincipalArn</code> matching <code>…:root</code>).</li>
  <li><strong>Require controls</strong> — deny <code>ec2:RunInstances</code> without IMDSv2, deny unencrypted S3 uploads, deny public AMI or snapshot sharing.</li>
  <li><strong>Block the IAM escalation actions</strong> outside a break-glass role: <code>CreatePolicyVersion</code>, <code>UpdateAssumeRolePolicy</code>, <code>DeleteRolePermissionsBoundary</code>.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Operating them without causing an outage</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>SCPs fail <strong>closed and silently</strong> — an affected principal just gets <code>AccessDenied</code>, and the person debugging usually has no visibility into Organizations. Announce changes, and put the SCP name in the Sid so it shows up in reasoning.</li>
  <li><strong>Test on a sandbox OU first</strong>, then a non-production OU, then broadly.</li>
  <li>Use <code>aws organizations describe-effective-policy</code> to see the merged result for an account rather than mentally intersecting five documents.</li>
  <li>Always carve out a <strong>break-glass role</strong> with <code>ArnNotLike</code> on <code>aws:PrincipalArn</code>, or you can lock the organisation out of its own controls.</li>
  <li>Manage them in version control through Control Tower or IaC — an SCP edited by hand is an outage waiting for a Friday.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">SCP vs RCP vs permissions boundary</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>SCP</strong> — caps what <em>your principals in an account</em> may do. Identity side, account scope.</li>
  <li><strong>RCP</strong> — caps what may be done <em>to your resources</em>, by anyone including external principals. Resource side, account scope.</li>
  <li><strong>Permissions boundary</strong> — caps <em>one IAM user or role</em>. Identity side, single-identity scope, and the tool for safe delegation.</li>
  <li>All three grant nothing. Only identity-based and resource-based policies grant.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "SCPs are an Organizations feature, not IAM. They set the maximum permissions available in an account and never grant anything — an action needs both the SCP and an IAM allow. They attach to the root, an OU or an account and intersect down the tree, they apply to every principal including member-account root, but they do not apply to the management account or to service-linked roles. I run deny-list SCPs so new services work by default: protect CloudTrail and the security baseline, deny leaving the org, region-lock with a carve-out for global services, and always exempt a break-glass role so we can't lock ourselves out."</div>
</div>`,
          examples: [
            `# ---------- SCPs never grant. This gives nobody anything. ----------
{ "Version":"2012-10-17","Statement":[{"Effect":"Allow","Action":"s3:*","Resource":"*"}] }
# It only means "IAM in this account is ALLOWED to grant s3 actions".

# ---------- Deny-list SCP: the practical shape ----------
{
  "Version": "2012-10-17",
  "Statement": [
    { "Sid": "SCP01-ProtectAuditTrail", "Effect": "Deny",
      "Action": ["cloudtrail:StopLogging","cloudtrail:DeleteTrail","cloudtrail:UpdateTrail",
                 "cloudtrail:PutEventSelectors","config:DeleteConfigurationRecorder",
                 "config:StopConfigurationRecorder","guardduty:DeleteDetector",
                 "guardduty:DisassociateFromMasterAccount"],
      "Resource": "*",
      "Condition": { "ArnNotLike": { "aws:PrincipalArn": "arn:aws:iam::*:role/OrgBreakGlass" } } },

    { "Sid": "SCP02-StayInTheOrg", "Effect": "Deny",
      "Action": ["organizations:LeaveOrganization","account:CloseAccount"], "Resource": "*" },

    { "Sid": "SCP03-RegionLock", "Effect": "Deny",
      "NotAction": ["iam:*","organizations:*","route53:*","cloudfront:*","support:*",
                    "sts:*","budgets:*","waf:*","shield:*","globalaccelerator:*"],
      "Resource": "*",
      "Condition": { "StringNotEquals": { "aws:RequestedRegion": ["eu-west-1","us-east-1"] } } },

    { "Sid": "SCP04-NoMemberRoot", "Effect": "Deny", "Action": "*", "Resource": "*",
      "Condition": { "StringLike": { "aws:PrincipalArn": "arn:aws:iam::*:root" } } },

    { "Sid": "SCP05-RequireIMDSv2", "Effect": "Deny",
      "Action": "ec2:RunInstances", "Resource": "arn:aws:ec2:*:*:instance/*",
      "Condition": { "StringNotEquals": { "ec2:MetadataHttpTokens": "required" } } }
  ]
}

# ---------- Attach and inspect ----------
aws organizations create-policy --name baseline-guardrails \\
  --type SERVICE_CONTROL_POLICY --content file://scp.json
aws organizations attach-policy --policy-id p-abc12345 --target-id ou-root-prod111

# What is the MERGED effect on one account?
aws organizations describe-effective-policy \\
  --policy-type SERVICE_CONTROL_POLICY --target-id 222233334444

# Which policies hit this OU?
aws organizations list-policies-for-target \\
  --target-id ou-root-prod111 --filter SERVICE_CONTROL_POLICY

# Walk the inheritance chain
aws organizations list-parents --child-id 222233334444

# ---------- The error an SCP produces ----------
# An error occurred (AccessDenied) when calling the CreateBucket operation:
#   User: arn:aws:sts::222233334444:assumed-role/dev/alice is not authorized to
#   perform: s3:CreateBucket with an explicit deny in a service control policy
#                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
# That trailing clause is the giveaway. More IAM permissions will NOT help.

# ---------- Allow-list style (brittle; 5120-char limit arrives fast) ----------
# 1. detach FullAWSAccess  2. attach an explicit allow list
{ "Version":"2012-10-17","Statement":[{"Effect":"Allow",
  "Action":["s3:*","ec2:*","lambda:*","logs:*","cloudwatch:*","dynamodb:*","sts:*","iam:Get*","iam:List*"],
  "Resource":"*"}] }`,
          ],
          questions: [
            {
              question: "What is an SCP and how is it different from an IAM policy?",
              solution: "<p>An SCP is an <strong>AWS Organizations</strong> control, not IAM. It defines the <strong>maximum</strong> set of actions available in an account and <strong>never grants anything</strong> — an action must be permitted by the SCP <em>and</em> allowed by IAM. IAM works inside one account and grants; SCPs work above accounts and only subtract. They attach to the org root, an OU or an account, <strong>intersect</strong> down the tree, and apply to <strong>every principal in a member account including its root user</strong> — which no IAM policy can do.</p>",
            },
            {
              question: "Which principals are NOT affected by an SCP?",
              solution: "<p>Three exclusions. (1) <strong>Everything in the management account</strong>, including its root user — SCPs simply do not apply there, which is why that account must hold no workloads and must be protected with hardware MFA and alarms instead. (2) <strong>Service-linked roles</strong>, so AWS services keep working. (3) Principals <em>outside</em> your organisation acting on your resources — an SCP constrains your identities, not other people's, and closing that gap is exactly what <strong>Resource Control Policies</strong> were introduced for.</p>",
            },
            {
              question: "Why is a deny-list SCP usually preferred over an allow list?",
              solution: "<p>A <strong>deny list</strong> keeps <code>FullAWSAccess</code> attached and adds Deny statements for specific dangerous actions, so newly launched AWS services work by default and you only block what you consciously decided to block. An <strong>allow list</strong> enumerates every permitted service, which is tighter for regulated environments but brittle: every new service adoption becomes an SCP change request, and the <strong>5,120-character</strong> SCP size limit arrives quickly. Most organisations run deny lists at the root and reserve allow lists for a small number of high-assurance OUs.</p>",
            },
            {
              question: "You add a region-lock SCP and half the organisation breaks. What went wrong?",
              solution: "<p>You denied <strong>global services</strong> along with the regional ones. IAM, Organizations, Route 53, CloudFront, Support, STS, Budgets, WAF and Shield all make calls that appear in <code>us-east-1</code> or have no meaningful region, so a blanket <code>aws:RequestedRegion</code> deny cuts off the ability to sign in, assume roles and manage DNS. The fix is <code>NotAction</code> carving those services out of the Deny. The wider lesson: SCPs fail closed and silently, so roll them out sandbox OU → non-production → production, check <code>describe-effective-policy</code>, and always exempt a break-glass role so you can undo it.</p>",
            },
            {
              question: "How do you tell from an error message that an SCP caused a denial?",
              solution: "<p>Modern AccessDenied messages name the policy type: '…is not authorized to perform: s3:CreateBucket <strong>with an explicit deny in a service control policy</strong>'. The same wording distinguishes a <strong>permissions boundary</strong>, a <strong>session policy</strong> and a <strong>VPC endpoint policy</strong>. The practical signal is that adding IAM permissions — even <code>AdministratorAccess</code> — changes nothing; when more Allow doesn't help, the block is a ceiling, and you confirm it with <code>aws organizations describe-effective-policy --policy-type SERVICE_CONTROL_POLICY</code> for that account.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html",
            "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_strategies.html",
            "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_examples.html",
          ],
        },
        {
          topic: "Federated Identity — SAML, OIDC & AssumeRoleWith",
          tags: ["aws", "iam", "federation", "saml", "oidc", "sts", "web identity", "cognito"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>Federation</strong> means AWS does not store the identity at all. An external identity provider authenticates the caller and issues a signed assertion; AWS verifies that assertion and exchanges it for <strong>temporary credentials</strong>. No IAM user, no password in AWS, no access key anywhere.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The two STS calls</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong><code>sts:AssumeRoleWithSAML</code></strong> — the caller presents a <strong>SAML 2.0 assertion</strong> from a corporate IdP (ADFS, Okta, Entra ID, Ping). The enterprise workforce pattern, and what console federation historically used.</li>
  <li><strong><code>sts:AssumeRoleWithWebIdentity</code></strong> — the caller presents an <strong>OIDC JWT</strong> from a provider like GitHub Actions, GitLab, Google, Cognito, or an EKS service account. Modern, JSON/JWT-based, and the standard for machine-to-cloud trust.</li>
</ul>
<p style="line-height: 1.75;">Both are <strong>unauthenticated STS calls</strong> — the caller has no AWS credentials at all; the assertion <em>is</em> the credential. Both return the same <code>ASIA…</code> key, secret, session token and expiry as ordinary <code>AssumeRole</code>. (The third, <code>GetFederationToken</code>, is legacy and worth knowing only by name.)</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">How the trust is established</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>You register the provider once as an <strong>IAM identity provider</strong> — a SAML provider (upload the IdP's metadata XML containing its signing certificate) or an OIDC provider (its issuer URL and audience).</li>
  <li>You create roles whose <strong>trust policy</strong> names that provider as a <code>Federated</code> principal, with the matching <code>AssumeRoleWith*</code> action.</li>
  <li>You add <strong>conditions on the assertion's claims</strong> — this is the part that must be right, and the part that is most often wrong.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The claim conditions that matter</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>SAML</strong>: <code>saml:aud</code> (the intended recipient endpoint), <code>saml:iss</code> (issuer), <code>saml:sub</code>, and the AWS-specific attributes the IdP asserts — <code>https://aws.amazon.com/SAML/Attributes/Role</code> (which role to assume), <code>RoleSessionName</code>, <code>SessionDuration</code>, and <code>PrincipalTag:&lt;key&gt;</code> for ABAC.</li>
  <li><strong>OIDC</strong>: <code>&lt;provider&gt;:aud</code> — must be checked, and <code>&lt;provider&gt;:sub</code> — <strong>must be checked and must be specific</strong>. For GitHub Actions the sub looks like <code>repo:my-org/my-repo:ref:refs/heads/main</code> or <code>repo:my-org/my-repo:environment:production</code>.</li>
  <li><strong>The catastrophic mistake:</strong> a GitHub OIDC trust policy that checks only <code>aud</code>, or uses <code>StringLike</code> with <code>repo:*</code> or a trailing wildcard in the wrong place, lets <strong>any repository on GitHub</strong> assume your role. This has been exploited repeatedly in the wild. Pin the org, the repo, and the ref or environment.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Why federate at all</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>One offboarding switch.</strong> Disable the person in the IdP and AWS access ends everywhere immediately. With IAM users you must remember every account.</li>
  <li><strong>Central MFA and conditional access</strong> — device posture, geography, risk scoring — enforced by a system designed for it.</li>
  <li><strong>No long-lived credentials.</strong> Nothing to leak, commit, or rotate.</li>
  <li><strong>Attributes flow through</strong> as session tags, enabling ABAC from HR-owned directory data.</li>
  <li><strong>Group-driven access.</strong> Access changes happen in the directory, not in AWS.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Which mechanism for which caller</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Employees</strong> → <strong>IAM Identity Center</strong> in front of your IdP. It does the SAML/SCIM plumbing once instead of per account.</li>
  <li><strong>CI/CD outside AWS</strong> (GitHub Actions, GitLab, CircleCI, Buildkite) → <strong>OIDC</strong> web identity. Zero stored secrets.</li>
  <li><strong>Kubernetes on EKS</strong> → <strong>IRSA</strong> or <strong>EKS Pod Identity</strong>, which is OIDC federation from the cluster's own issuer, giving per-pod identities.</li>
  <li><strong>Your application's end users</strong> → <strong>Amazon Cognito</strong> (user pool to authenticate, identity pool to exchange for AWS credentials). Never IAM users.</li>
  <li><strong>On-premises servers and hardware</strong> → <strong>IAM Roles Anywhere</strong> with X.509 certificates from your own CA.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Operational details worth naming</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Federated sessions last <strong>15 minutes to 12 hours</strong>; SAML can request a duration via the <code>SessionDuration</code> attribute, still capped by <code>MaxSessionDuration</code>.</li>
  <li><strong>Console access</strong> for federated users goes through the AWS federation endpoint, which exchanges a session for a sign-in token and a one-time console URL.</li>
  <li>OIDC providers publish a JWKS endpoint; AWS validates the JWT signature against it, so provider key rotation is handled automatically for well-known providers.</li>
  <li>CloudTrail records <code>AssumeRoleWithSAML</code> / <code>AssumeRoleWithWebIdentity</code> including the claim values — so the audit trail reaches back to the corporate identity or the exact workflow run.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Federation means an external IdP authenticates and AWS exchanges the assertion for temporary credentials, so there is no IAM user and no stored key. SAML assertions go through sts:AssumeRoleWithSAML for corporate workforce login; OIDC JWTs go through sts:AssumeRoleWithWebIdentity for GitHub Actions, EKS service accounts and Cognito. You register the provider as an IAM identity provider and write a trust policy conditioned on the assertion's claims — and the claim conditions are the security boundary: a GitHub trust policy that doesn't pin the sub claim to a specific repo and ref lets any repo in the world assume your role."</div>
</div>`,
          examples: [
            `# ---------- OIDC: register GitHub Actions once ----------
aws iam create-open-id-connect-provider \\
  --url https://token.actions.githubusercontent.com \\
  --client-id-list sts.amazonaws.com

# ---------- Trust policy — the sub condition IS the security boundary ----------
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "Federated": "arn:aws:iam::111122223333:oidc-provider/token.actions.githubusercontent.com" },
    "Action": "sts:AssumeRoleWithWebIdentity",
    "Condition": {
      "StringEquals": {
        "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
        "token.actions.githubusercontent.com:sub": "repo:acme/payments-api:environment:production"
      }
    }
  }]
}

# ❌ CATASTROPHIC — any repo on GitHub can assume this role:
"StringEquals": { "token.actions.githubusercontent.com:aud": "sts.amazonaws.com" }
# ❌ ALSO BROKEN — wildcard too early:
"StringLike":   { "token.actions.githubusercontent.com:sub": "repo:*" }
# ✅ Acceptable wildcard — pinned org AND repo, any branch:
"StringLike":   { "token.actions.githubusercontent.com:sub": "repo:acme/payments-api:*" }

# ---------- GitHub workflow: no secrets stored ----------
# permissions:
#   id-token: write
#   contents: read
# steps:
#   - uses: aws-actions/configure-aws-credentials@v4
#     with:
#       role-to-assume: arn:aws:iam::111122223333:role/gha-deploy
#       role-session-name: gha-\${{ github.run_id }}
#       aws-region: eu-west-1

# ---------- SAML: register the corporate IdP ----------
aws iam create-saml-provider --name CorpOkta \\
  --saml-metadata-document file://okta-metadata.xml

{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "Federated": "arn:aws:iam::111122223333:saml-provider/CorpOkta" },
    "Action": ["sts:AssumeRoleWithSAML", "sts:TagSession"],
    "Condition": {
      "StringEquals": { "SAML:aud": "https://signin.aws.amazon.com/saml" }
    }
  }]
}

# SAML attributes the IdP must assert:
#   .../SAML/Attributes/Role         -> arn:aws:iam::111:role/Dev,arn:aws:iam::111:saml-provider/CorpOkta
#   .../SAML/Attributes/RoleSessionName -> alice@acme.com
#   .../SAML/Attributes/SessionDuration -> 3600
#   .../SAML/Attributes/PrincipalTag:team -> payments      (feeds ABAC)

# ---------- EKS IRSA: OIDC from the cluster's own issuer ----------
ISSUER=$(aws eks describe-cluster --name prod \\
  --query 'cluster.identity.oidc.issuer' --output text | sed 's|https://||')
{
  "Effect": "Allow",
  "Principal": { "Federated": "arn:aws:iam::111122223333:oidc-provider/'"$ISSUER"'" },
  "Action": "sts:AssumeRoleWithWebIdentity",
  "Condition": { "StringEquals": {
    "'"$ISSUER"':sub": "system:serviceaccount:payments:orders-sa",
    "'"$ISSUER"':aud": "sts.amazonaws.com" } }
}

# ---------- Cognito: per-end-user isolation with a policy variable ----------
{
  "Effect": "Allow",
  "Action": ["s3:GetObject","s3:PutObject"],
  "Resource": "arn:aws:s3:::app-user-data/\${cognito-identity.amazonaws.com:sub}/*"
}

# ---------- Verify what a federated session actually is ----------
aws sts get-caller-identity
# arn:aws:sts::111122223333:assumed-role/gha-deploy/gha-8842910

# ---------- CloudTrail shows the claims ----------
aws cloudtrail lookup-events \\
  --lookup-attributes AttributeKey=EventName,AttributeValue=AssumeRoleWithWebIdentity \\
  --max-results 1 --query 'Events[0].CloudTrailEvent' --output text | \\
  jq '{sub:.requestParameters.subjectFromWebIdentityToken, role:.requestParameters.roleArn}'`,
          ],
          questions: [
            {
              question: "What is the difference between AssumeRoleWithSAML and AssumeRoleWithWebIdentity?",
              solution: "<p>Both exchange an external assertion for temporary AWS credentials and both are <strong>unauthenticated STS calls</strong> — the caller holds no AWS credentials, the assertion <em>is</em> the credential. <code>AssumeRoleWithSAML</code> takes a <strong>SAML 2.0 assertion</strong> from a corporate IdP (ADFS, Okta, Entra ID) and is the classic workforce/console-federation path. <code>AssumeRoleWithWebIdentity</code> takes an <strong>OIDC JWT</strong> from providers like GitHub Actions, GitLab, Google, Cognito or an EKS cluster issuer, and is the modern machine-to-cloud path. Both return the same <code>ASIA…</code> key, secret, session token and expiry.</p>",
            },
            {
              question: "What is the most dangerous mistake in a GitHub Actions OIDC trust policy?",
              solution: "<p>Failing to pin the <strong><code>sub</code> claim</strong>. A trust policy that checks only <code>token.actions.githubusercontent.com:aud</code> — or uses a wildcard like <code>repo:*</code> — will let <strong>any repository on GitHub</strong> assume your role, because GitHub's OIDC issuer is shared across all of GitHub. This has been exploited in the wild. Pin the organisation, repository and ref or environment: <code>repo:acme/payments-api:environment:production</code>. If you must wildcard, wildcard only the trailing ref segment (<code>repo:acme/payments-api:*</code>), never the org or repo.</p>",
            },
            {
              question: "Why is federation better than IAM users for employees?",
              solution: "<p><strong>One offboarding switch</strong> — disabling the person in the IdP ends AWS access everywhere instantly, versus hunting for IAM users across dozens of accounts. <strong>Central MFA and conditional access</strong> (device posture, geography, risk) enforced by a system built for it. <strong>No long-lived credentials</strong> to leak, commit or rotate — every session is temporary. <strong>Group-driven access</strong>, so joiners and movers are handled in the directory rather than in AWS. And IdP <strong>attributes flow through as session tags</strong>, which is what makes ABAC work from HR-owned data rather than from tags anyone could edit.</p>",
            },
            {
              question: "How do pods on EKS get AWS permissions without node-level credentials?",
              solution: "<p><strong>IRSA</strong> (IAM Roles for Service Accounts) or the newer <strong>EKS Pod Identity</strong>. The cluster publishes an <strong>OIDC issuer</strong>, which you register as an IAM OIDC provider. A role's trust policy then allows <code>sts:AssumeRoleWithWebIdentity</code> conditioned on <code>&lt;issuer&gt;:sub</code> equalling <code>system:serviceaccount:&lt;namespace&gt;:&lt;serviceaccount&gt;</code>, so only pods running under that service account get the role. This matters because the alternative — pods inheriting the <strong>node instance role</strong> — gives every pod on the node the union of what any pod needs. Pair it with IMDS hop limit 1 so pods cannot reach the node's credentials at all.</p>",
            },
            {
              question: "A mobile app needs to upload to S3 on behalf of its users. What do you use?",
              solution: "<p><strong>Amazon Cognito</strong>, never IAM users — you do not create AWS identities for application end users. A Cognito <strong>user pool</strong> handles sign-up and sign-in; a Cognito <strong>identity pool</strong> exchanges the resulting token for temporary AWS credentials via <code>AssumeRoleWithWebIdentity</code>. The role's policy scopes each user to their own prefix using a policy variable: <code>arn:aws:s3:::app-user-data/\${cognito-identity.amazonaws.com:sub}/*</code>. One role, one policy, correct per-user isolation at any scale, and no credential ever ships inside the app binary.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-idp_oidc.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_saml.html",
          ],
        },
        {
          topic: "IAM Identity Center — Centralized Human Access Across Accounts",
          tags: ["aws", "identity center", "sso", "permission sets", "scim", "multi-account"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>IAM Identity Center</strong> (formerly AWS SSO) is the front door AWS now recommends for every human. Instead of an IAM user per person per account, people sign in once to a portal and pick which account and role they want. It is free, it sits on top of AWS Organizations, and it replaces the entire practice of creating IAM users for employees.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The problem it solves</h4>
<p style="line-height: 1.75;">With 40 accounts and 60 engineers, per-account IAM users means up to 2,400 identities, 2,400 passwords, 2,400 MFA enrolments, and an offboarding process that depends on someone remembering every account. Even with SAML federation you still create and maintain roles in every account by hand. Identity Center collapses that into <strong>one identity source, one set of permission definitions, and assignments that fan out automatically</strong>.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The moving parts</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Identity source</strong> — either Identity Center's own built-in directory, or an external IdP (Okta, Entra ID, Google Workspace, Ping) connected with <strong>SAML for authentication</strong> and <strong>SCIM for provisioning</strong>, so joiners, movers and leavers sync automatically. Active Directory via AD Connector is also supported.</li>
  <li><strong>Users and groups</strong> — mirrored from the identity source. Groups are what you assign; individual assignments are a smell.</li>
  <li><strong>Permission set</strong> — a reusable bundle of AWS managed policies, customer managed policies, an inline policy, an optional <strong>permissions boundary</strong>, and a <strong>session duration</strong> (up to 12 hours). It is a <em>definition</em>, not a role.</li>
  <li><strong>Assignment</strong> — the triple <code>(group, permission set, account)</code>. Creating one causes Identity Center to <strong>provision an actual IAM role</strong> in that account, named <code>AWSReservedSSO_&lt;PermissionSetName&gt;_&lt;hash&gt;</code>, and to keep it in sync when the permission set changes.</li>
  <li><strong>Access portal</strong> — the URL people sign in to, listing every account and role they can use.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What a user actually experiences</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Sign in to the portal with corporate credentials and MFA.</li>
  <li>See a tile per account, each listing the permission sets they hold there.</li>
  <li>Click one to open the console, or copy short-lived CLI credentials.</li>
  <li>For terminal work, <code>aws configure sso</code> once, then <code>aws sso login --profile prod</code>. The SDK refreshes automatically and <strong>nothing is ever written to <code>~/.aws/credentials</code></strong>.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Why it beats the alternatives</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>No long-lived credentials</strong> anywhere — every session is temporary.</li>
  <li><strong>Offboarding is one action</strong> in the IdP, and SCIM propagates it.</li>
  <li><strong>Permission changes fan out</strong> — edit the permission set once, every account's role updates.</li>
  <li><strong>Onboarding is a group membership</strong>, not an AWS change at all.</li>
  <li><strong>Attribute-based access</strong> — map IdP attributes (department, cost centre) to session tags and write one ABAC policy instead of a permission set per team.</li>
  <li><strong>Central audit</strong> — CloudTrail shows the corporate identity in the session name, so <code>AWSReservedSSO_PowerUser_abc/alice@acme.com</code> tells you exactly who.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Design guidance</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Name permission sets by job function</strong> — <code>ReadOnly</code>, <code>Developer</code>, <code>DataEngineer</code>, <code>SecurityAudit</code>, <code>BillingViewer</code> — and keep the count small. A permission set per team per account is the anti-pattern.</li>
  <li><strong>Assign groups, never individuals</strong>, so access is driven by directory membership.</li>
  <li><strong>Attach a permissions boundary</strong> to powerful permission sets, so even a PowerUser cannot escalate through IAM.</li>
  <li><strong>Short session durations</strong> for production (1–4 hours), longer for read-only.</li>
  <li><strong>Delegate administration</strong> to a dedicated identity account rather than running Identity Center from the management account.</li>
  <li><strong>Keep exactly one break-glass IAM user or role</strong> per critical account, MFA-protected and alarmed, for when the IdP itself is down — Identity Center is a dependency, and dependencies fail.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Limits and caveats</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>It is for <strong>humans</strong>. Workloads still use IAM roles; CI still uses OIDC.</li>
  <li>The generated roles are <strong>managed by Identity Center</strong> — do not hand-edit them, your changes will be overwritten.</li>
  <li>Identity Center is enabled in a single region for its identity store, though access itself is global.</li>
  <li>Assignments take a moment to provision across many accounts; automate with IaC (<code>aws_ssoadmin_*</code> in Terraform) rather than clicking.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Identity Center is the recommended front door for humans in a multi-account org. You connect one identity source — usually your corporate IdP with SAML for auth and SCIM for provisioning — define permission sets as reusable policy bundles, and assign a group plus permission set to an account. That provisions a managed IAM role in each assigned account, and people get temporary credentials through the portal or aws sso login, so nothing is written to the credentials file. Onboarding becomes a group membership, offboarding is one disable in the IdP, and a permission-set edit fans out everywhere. I still keep one alarmed break-glass identity per critical account, because Identity Center is a dependency."</div>
</div>`,
          examples: [
            `# ---------- One-time user setup ----------
aws configure sso
# SSO start URL   : https://acme.awsapps.com/start
# SSO region      : eu-west-1
# -> writes a PROFILE, never a credential
aws sso login --profile prod-power
aws s3 ls --profile prod-power

# ~/.aws/config
# [sso-session corp]
# sso_start_url = https://acme.awsapps.com/start
# sso_region    = eu-west-1
# sso_registration_scopes = sso:account:access
#
# [profile prod-power]
# sso_session    = corp
# sso_account_id = 222233334444
# sso_role_name  = PowerUser
# region         = eu-west-1

# ---------- Build a permission set ----------
SSO=$(aws sso-admin list-instances --query 'Instances[0].InstanceArn' --output text)

PS=$(aws sso-admin create-permission-set --instance-arn "$SSO" \\
  --name Developer --description "Day-to-day app development" \\
  --session-duration PT4H --query 'PermissionSet.PermissionSetArn' --output text)

aws sso-admin attach-managed-policy-to-permission-set --instance-arn "$SSO" \\
  --permission-set-arn "$PS" --managed-policy-arn arn:aws:iam::aws:policy/PowerUserAccess

# Cap it so even PowerUser cannot escalate through IAM
aws sso-admin put-permissions-boundary-to-permission-set --instance-arn "$SSO" \\
  --permission-set-arn "$PS" \\
  --permissions-boundary 'CustomerManagedPolicyReference={Name=DevBoundary,Path=/}'

# Extra inline restrictions
aws sso-admin put-inline-policy-to-permission-set --instance-arn "$SSO" \\
  --permission-set-arn "$PS" --inline-policy '{"Version":"2012-10-17","Statement":[
    {"Effect":"Deny","Action":["ec2:TerminateInstances","rds:DeleteDBInstance"],"Resource":"*",
     "Condition":{"StringEquals":{"aws:ResourceTag/env":"prod"}}}]}'

# ---------- Assign a GROUP (never an individual) to an account ----------
GROUP=$(aws identitystore list-groups --identity-store-id d-1234567890 \\
  --filters 'AttributePath=DisplayName,AttributeValue=eng-payments' \\
  --query 'Groups[0].GroupId' --output text)

aws sso-admin create-account-assignment --instance-arn "$SSO" \\
  --permission-set-arn "$PS" \\
  --target-id 222233334444 --target-type AWS_ACCOUNT \\
  --principal-type GROUP --principal-id "$GROUP"
# -> provisions arn:aws:iam::222233334444:role/AWSReservedSSO_Developer_a1b2c3d4

# ---------- ABAC: map IdP attributes to session tags ----------
aws sso-admin create-instance-access-control-attribute-configuration \\
  --instance-arn "$SSO" \\
  --instance-access-control-attribute-configuration \\
  'AccessControlAttributes=[
     {Key=team,Value={Source=[\${path:enterprise.department}]}},
     {Key=costcenter,Value={Source=[\${path:enterprise.costCenter}]}}]'

# Then ONE permission-set policy covers every team:
{ "Effect":"Allow","Action":"ec2:*","Resource":"*",
  "Condition":{"StringEquals":{"aws:ResourceTag/team":"\${aws:PrincipalTag/team}"}} }

# ---------- What the identity looks like in CloudTrail ----------
aws sts get-caller-identity --profile prod-power
# arn:aws:sts::222233334444:assumed-role/AWSReservedSSO_Developer_a1b2c3d4/alice@acme.com
#                                                                          ^ corporate identity

# ---------- Audit: who can reach which account? ----------
aws sso-admin list-permission-sets-provisioned-to-account \\
  --instance-arn "$SSO" --account-id 222233334444
aws sso-admin list-account-assignments --instance-arn "$SSO" \\
  --account-id 222233334444 --permission-set-arn "$PS"`,
          ],
          questions: [
            {
              question: "What is a permission set and how does it relate to an IAM role?",
              solution: "<p>A <strong>permission set</strong> is a reusable <em>definition</em> in Identity Center: AWS managed policies, customer managed policy references, an inline policy, an optional <strong>permissions boundary</strong> and a session duration. It is not itself a role. When you create an <strong>assignment</strong> — the triple of group, permission set and account — Identity Center <strong>provisions an actual IAM role</strong> in that account named <code>AWSReservedSSO_&lt;name&gt;_&lt;hash&gt;</code> and keeps it in sync. So one permission set edited once updates the corresponding role in every assigned account. Do not hand-edit those roles; your changes get overwritten.</p>",
            },
            {
              question: "How does Identity Center change onboarding and offboarding?",
              solution: "<p><strong>Onboarding</strong> becomes adding the person to a group in your identity provider — SCIM syncs it, and their existing account/permission-set assignments apply immediately across every account. No AWS change at all. <strong>Offboarding</strong> is a single disable in the IdP, which removes access everywhere at once; because every credential is temporary, existing sessions expire on their own rather than needing to be hunted down. Compare that with IAM users, where you must find and delete an identity in every account and can silently miss one.</p>",
            },
            {
              question: "Does Identity Center replace IAM roles entirely?",
              solution: "<p>No — it replaces <strong>IAM users for humans</strong>. Workloads still need IAM roles: EC2 instance profiles, Lambda execution roles, ECS task roles, IRSA for EKS. External CI still uses <strong>OIDC federation</strong> into a role. On-premises still uses <strong>IAM Roles Anywhere</strong>. And you should deliberately keep <strong>one break-glass identity</strong> per critical account, MFA-protected and alarmed, because Identity Center and your IdP are dependencies that can fail — discovering you have no way in during an IdP outage is a bad day. Under the hood Identity Center <em>is</em> roles: it provisions and manages them for you.</p>",
            },
            {
              question: "How do you avoid permission-set sprawl across 40 accounts?",
              solution: "<p>Two techniques. First, <strong>name permission sets by job function</strong> and keep the list short — <code>ReadOnly</code>, <code>Developer</code>, <code>DataEngineer</code>, <code>SecurityAudit</code>, <code>BillingViewer</code> — and assign <strong>groups, never individuals</strong>, so variation lives in the directory rather than in AWS. Second, use <strong>ABAC</strong>: configure Identity Center to map IdP attributes (department, cost centre) to <strong>session tags</strong>, then write one policy conditioned on <code>\"aws:ResourceTag/team\": \"\${aws:PrincipalTag/team}\"</code>. That single permission set scopes each person to their own team's resources, instead of a permission set per team per account.</p>",
            },
            {
              question: "What does a CloudTrail event look like for an Identity Center user, and why does that matter?",
              solution: "<p>The principal is <code>arn:aws:sts::&lt;account&gt;:assumed-role/AWSReservedSSO_&lt;PermissionSet&gt;_&lt;hash&gt;/&lt;user@company.com&gt;</code> — the session name carries the <strong>corporate identity</strong>. That matters because it restores per-human attribution across a whole organisation without creating per-human identities: you can answer 'who deleted this?' with a real person's email even though they were using a shared permission set, and you can trace the same person's actions across dozens of accounts. Shared IAM users or a shared root password destroy exactly this property.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html",
            "https://docs.aws.amazon.com/singlesignon/latest/userguide/permissionsetsconcept.html",
            "https://docs.aws.amazon.com/singlesignon/latest/userguide/abac.html",
          ],
        },
        {
          topic: "Condition Keys & ABAC — Source IP, MFA, Time, Tags",
          tags: ["aws", "iam", "condition keys", "abac", "tags", "data perimeter", "policy variables"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>Conditions</strong> are what turn a coarse permission into a precise one. Without them a policy says "Alice may delete objects". With them it says "Alice may delete objects, from the office network, over TLS, with MFA verified in the last 15 minutes, only from buckets tagged with her own team". That is the difference between a policy that passes review and one that does not.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The structure</h4>
<p style="line-height: 1.75;">Three levels — <strong>operator → condition key → value(s)</strong> — and the logic is fixed: multiple <strong>values</strong> for a key are <strong>OR</strong>ed, multiple <strong>keys</strong> in an operator block are <strong>AND</strong>ed, and multiple <strong>operator blocks</strong> are <strong>AND</strong>ed. Getting that wrong produces policies far broader than intended.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The keys you will be asked about</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Network:</strong> <code>aws:SourceIp</code> (public IP of the caller), <code>aws:VpcSourceIp</code>, <code>aws:SourceVpc</code>, <code>aws:SourceVpce</code>. <em>Trap:</em> <code>aws:SourceIp</code> does <strong>not</strong> match when an AWS service makes the call on your behalf — the source IP becomes the service's — so pair it with <code>aws:ViaAWSService</code> or use the VPC keys for private traffic.</li>
  <li><strong>MFA:</strong> <code>aws:MultiFactorAuthPresent</code> (always with <code>BoolIfExists</code>, because for long-term keys the key is <em>absent</em>, not false) and <code>aws:MultiFactorAuthAge</code> (seconds since the MFA check — the basis of step-up auth).</li>
  <li><strong>Time:</strong> <code>aws:CurrentTime</code> with <code>DateGreaterThan</code>/<code>DateLessThan</code> for expiring access, and <code>aws:TokenIssueTime</code> for revoking sessions.</li>
  <li><strong>Identity:</strong> <code>aws:PrincipalArn</code>, <code>aws:PrincipalAccount</code>, <code>aws:PrincipalOrgID</code>, <code>aws:PrincipalOrgPaths</code>, <code>aws:userid</code>, <code>aws:PrincipalIsAWSService</code>, <code>aws:ViaAWSService</code>.</li>
  <li><strong>Tags:</strong> <code>aws:PrincipalTag/&lt;k&gt;</code> (on the caller), <code>aws:ResourceTag/&lt;k&gt;</code> (on the target), <code>aws:RequestTag/&lt;k&gt;</code> (tags being applied by this request), <code>aws:TagKeys</code> (which keys the request carries).</li>
  <li><strong>Request shape:</strong> <code>aws:SecureTransport</code> (TLS), <code>aws:RequestedRegion</code>, <code>aws:SourceArn</code>/<code>aws:SourceAccount</code> (which resource/account triggered a service call — the service-side confused-deputy defence), <code>aws:ResourceAccount</code>.</li>
  <li><strong>Service-specific, often the sharpest:</strong> <code>s3:prefix</code>, <code>s3:x-amz-server-side-encryption</code>, <code>ec2:InstanceType</code>, <code>ec2:MetadataHttpTokens</code>, <code>iam:PassedToService</code>, <code>iam:PermissionsBoundary</code>, <code>kms:ViaService</code>, <code>dynamodb:LeadingKeys</code>.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Operators worth knowing cold</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><code>StringEquals</code> / <code>StringLike</code> (wildcards) / <code>StringNotEquals</code>, <code>ArnEquals</code> / <code>ArnLike</code>, <code>Bool</code>, <code>IpAddress</code> / <code>NotIpAddress</code>, <code>NumericLessThan</code>, <code>DateGreaterThan</code>, <code>Null</code> (tests whether a key exists at all).</li>
  <li><strong><code>…IfExists</code></strong> — "if the key is present it must match; if absent, pass". Essential on Deny statements, where a missing key otherwise makes your guardrail silently inert.</li>
  <li><strong><code>ForAllValues:</code> / <code>ForAnyValue:</code></strong> for multi-valued keys such as <code>aws:TagKeys</code>. Note <code>ForAllValues</code> also matches when the key is absent, which is another quiet gap.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">ABAC — permissions by attribute</h4>
<p style="line-height: 1.75;">RBAC enumerates resources, so every new project means a new policy and policies grow until they hit the 6,144-character limit. <strong>ABAC</strong> compares a tag on the principal with a tag on the resource:</p>
<p style="line-height: 1.75;"><code>"Condition": {"StringEquals": {"aws:ResourceTag/team": "\${aws:PrincipalTag/team}"}}</code></p>
<p style="line-height: 1.75;">One statement, covering every team, forever. Add a team, a project, ten thousand resources — the policy never changes. The principal tag comes from an IAM tag, a <strong>session tag</strong> passed at <code>AssumeRole</code>, or an <strong>IdP attribute</strong> mapped through Identity Center or a SAML assertion. The last is strongest, because the values come from HR-owned directory data rather than anything the user controls.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What ABAC requires to be safe</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Nobody may retag themselves or a resource into another team.</strong> Deny <code>iam:TagRole</code>, <code>iam:TagUser</code> and per-service tag actions when the target's tag does not already match the caller's. Without this, ABAC is a self-service escalation.</li>
  <li><strong>Tagging must be mandatory at creation</strong> — enforce with <code>aws:RequestTag/&lt;k&gt;</code> and <code>ForAllValues:StringEquals</code> on <code>aws:TagKeys</code>, because an untagged resource matches no ABAC policy and becomes invisible.</li>
  <li><strong>Not every service supports tag-based authorization</strong> on every action — check the service authorization reference rather than assuming.</li>
  <li><strong>Tag hygiene becomes a security control</strong>, enforced with Config rules and Organizations tag policies, not a cost-allocation nicety.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Conditions as a data perimeter</h4>
<p style="line-height: 1.75;">At organisation scale the same keys build a <strong>data perimeter</strong>: <code>aws:PrincipalOrgID</code> on resource policies and RCPs ("only our identities"), <code>aws:ResourceOrgID</code> on SCPs ("our identities only touch our resources"), <code>aws:SourceVpce</code> on both ("only over our private network"), and <code>aws:PrincipalIsAWSService</code> to carve out legitimate AWS service calls. Together they answer "can data leave, can anything outside get in?" structurally rather than resource by resource.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Conditions are operator, key, value — values OR, keys AND, blocks AND. The ones I reach for are aws:SourceIp or aws:SourceVpce for network, aws:MultiFactorAuthPresent with BoolIfExists and MultiFactorAuthAge for step-up, aws:CurrentTime for expiring access, aws:SecureTransport and aws:RequestedRegion for baseline hygiene, and aws:PrincipalOrgID for perimeters. ABAC then compares aws:PrincipalTag with aws:ResourceTag so one policy covers every team and never changes — but only if tags are mandatory at creation and nobody can retag themselves, otherwise it's an escalation path rather than a control."</div>
</div>`,
          examples: [
            `# ---------- Network: office IPs, but don't break service-forwarded calls ----------
{
  "Effect": "Deny",
  "Action": "*",
  "Resource": "*",
  "Condition": {
    "NotIpAddress": { "aws:SourceIp": ["203.0.113.0/24","198.51.100.0/24"] },
    "Bool":         { "aws:ViaAWSService": "false" },
    "BoolIfExists": { "aws:PrincipalIsAWSService": "false" }
  }
}

# ---------- MFA: presence + freshness (step-up) ----------
{ "Effect":"Deny","Action":["s3:DeleteBucket","rds:DeleteDBInstance","kms:ScheduleKeyDeletion"],
  "Resource":"*",
  "Condition":{ "BoolIfExists":{"aws:MultiFactorAuthPresent":"false"} } }

{ "Effect":"Deny","Action":"iam:*","Resource":"*",
  "Condition":{ "NumericGreaterThanIfExists":{"aws:MultiFactorAuthAge":"900"} } }

# ---------- Time-boxed contractor access ----------
{ "Effect":"Allow","Action":"s3:GetObject","Resource":"arn:aws:s3:::audit-data/*",
  "Condition":{ "DateGreaterThan":{"aws:CurrentTime":"2026-09-01T00:00:00Z"},
                "DateLessThan":   {"aws:CurrentTime":"2026-10-01T00:00:00Z"} } }

# ---------- Baseline hygiene: TLS + region + encryption ----------
{ "Effect":"Deny","Action":"s3:*","Resource":"*",
  "Condition":{ "Bool":{"aws:SecureTransport":"false"} } }

{ "Effect":"Deny","Action":"s3:PutObject","Resource":"arn:aws:s3:::secure/*",
  "Condition":{ "StringNotEquals":{"s3:x-amz-server-side-encryption":"aws:kms"} } }

# ---------- ABAC: one policy for every team, forever ----------
{
  "Version": "2012-10-17",
  "Statement": [
    { "Sid":"OperateOwnTeamResources","Effect":"Allow",
      "Action":["ec2:StartInstances","ec2:StopInstances","s3:GetObject","s3:PutObject","dynamodb:*"],
      "Resource":"*",
      "Condition":{"StringEquals":{"aws:ResourceTag/team":"\${aws:PrincipalTag/team}"}} },

    { "Sid":"MustTagOnCreate","Effect":"Allow",
      "Action":["ec2:RunInstances","dynamodb:CreateTable","s3:CreateBucket"],
      "Resource":"*",
      "Condition":{"StringEquals":{"aws:RequestTag/team":"\${aws:PrincipalTag/team}"},
                   "ForAllValues:StringEquals":{"aws:TagKeys":["team","env","owner"]}} },

    { "Sid":"NoRetaggingIntoOtherTeams","Effect":"Deny",
      "Action":["ec2:CreateTags","ec2:DeleteTags","s3:PutBucketTagging",
                "iam:TagRole","iam:TagUser","iam:UntagRole","iam:UntagUser"],
      "Resource":"*",
      "Condition":{"StringNotEquals":{"aws:ResourceTag/team":"\${aws:PrincipalTag/team}"}} }
  ]
}

# ---------- AND vs OR, made explicit ----------
"Condition": {
  "StringEquals": {
    "aws:PrincipalTag/team": ["payments","billing"],  // OR  -> either team
    "aws:RequestedRegion":   "eu-west-1"              // AND -> and this region
  },
  "Bool": { "aws:MultiFactorAuthPresent": "true" }    // AND -> and MFA
}

# ---------- IfExists: working vs silently inert ----------
"Condition": { "Bool":        { "aws:MultiFactorAuthPresent": "false" } }  // ❌ misses absent key
"Condition": { "BoolIfExists":{ "aws:MultiFactorAuthPresent": "false" } }  // ✅ absent counts

# ---------- Null: does the key exist at all? ----------
{ "Effect":"Deny","Action":"ec2:RunInstances","Resource":"arn:aws:ec2:*:*:instance/*",
  "Condition":{ "Null":{"aws:RequestTag/costcenter":"true"} } }   // no costcenter tag -> deny

# ---------- Data perimeter: identity + resource + network ----------
# on a resource policy / RCP  -> only our org's identities
"Condition": { "StringNotEqualsIfExists": { "aws:PrincipalOrgID": "o-abc123xyz" },
               "BoolIfExists":            { "aws:PrincipalIsAWSService": "false" } }
# on an SCP                   -> our identities only touch our resources
"Condition": { "StringNotEqualsIfExists": { "aws:ResourceOrgID": "o-abc123xyz" } }
# on both                     -> only over our VPC endpoints
"Condition": { "StringNotEqualsIfExists": { "aws:SourceVpce": "vpce-0abc123" } }

# ---------- Session tags feed ABAC from the IdP ----------
aws sts assume-role --role-arn arn:aws:iam::111122223333:role/abac \\
  --role-session-name alice --tags Key=team,Value=payments \\
  --transitive-tag-keys team`,
          ],
          questions: [
            {
              question: "How do you restrict AWS access to your office network, and what breaks?",
              solution: "<p>A Deny with <code>\"NotIpAddress\": {\"aws:SourceIp\": [\"203.0.113.0/24\"]}</code>. What breaks is anything where an <strong>AWS service calls on your behalf</strong> — CloudFormation creating resources, Athena reading S3, a Lambda invoked by EventBridge — because the source IP becomes the service's, not yours. Guard with <code>\"Bool\": {\"aws:ViaAWSService\": \"false\"}</code> and <code>\"BoolIfExists\": {\"aws:PrincipalIsAWSService\": \"false\"}</code> so those calls are exempt. For private connectivity, prefer <code>aws:SourceVpc</code> / <code>aws:SourceVpce</code> over public IP matching, since they survive NAT changes and describe intent better.</p>",
            },
            {
              question: "Explain the difference between aws:PrincipalTag, aws:ResourceTag and aws:RequestTag.",
              solution: "<p><code>aws:PrincipalTag/&lt;k&gt;</code> is a tag on <strong>the caller</strong> — from an IAM user/role tag, a session tag, or an IdP attribute. <code>aws:ResourceTag/&lt;k&gt;</code> is a tag on <strong>the existing resource</strong> being acted upon. <code>aws:RequestTag/&lt;k&gt;</code> is a tag <strong>being applied by this request</strong> — it exists only on create and tag operations. ABAC uses the first two to match caller to resource; the third is how you make tagging <strong>mandatory at creation</strong>, so untagged resources — which no ABAC policy can match — cannot come into existence. <code>aws:TagKeys</code> additionally controls <em>which</em> keys a request may set.</p>",
            },
            {
              question: "Why is BoolIfExists necessary for aws:MultiFactorAuthPresent?",
              solution: "<p>Because for many requests that key is <strong>absent from the request context rather than false</strong> — calls made with long-term access keys, and various service-to-service calls. A plain <code>Bool</code> comparison does not match a missing key, so a Deny statement you believed was enforcing MFA <strong>silently never fires</strong>, and exactly the credentials you were worried about sail through. <code>BoolIfExists</code> treats the absent case as matching the Deny, closing the gap. It is the single most commonly botched condition in IAM, and a great detail to raise unprompted.</p>",
            },
            {
              question: "What makes ABAC unsafe if you get it wrong?",
              solution: "<p>ABAC moves the security decision into <strong>tags</strong>, so tags become credentials. If a principal can set its own <code>team</code> tag, or retag a resource into its own team, it grants itself access — a self-service escalation. So you must <strong>Deny the tagging actions</strong> (<code>iam:TagRole</code>, <code>iam:TagUser</code>, <code>ec2:CreateTags</code>, per-service equivalents) whenever the target's tag does not already match the caller's, <strong>source principal tags from the IdP</strong> as session tags rather than editable IAM tags, and <strong>enforce tags at creation</strong> so untagged resources cannot exist. Without those three, ABAC is worse than the RBAC it replaced.</p>",
            },
            {
              question: "How would you build a data perimeter using condition keys?",
              solution: "<p>Three axes, applied at organisation level. <strong>Identity perimeter</strong> — on resource policies and <strong>RCPs</strong>, deny when <code>aws:PrincipalOrgID</code> is not your org, exempting AWS services via <code>aws:PrincipalIsAWSService</code>. <strong>Resource perimeter</strong> — on <strong>SCPs</strong>, deny when <code>aws:ResourceOrgID</code> is not your org, so your principals cannot exfiltrate to a personal account. <strong>Network perimeter</strong> — deny when <code>aws:SourceVpc</code>/<code>aws:SourceVpce</code> is not one of yours, so access only happens over your private endpoints. Together they answer 'can our data leave, and can anything outside get in?' structurally, rather than by auditing every resource policy.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction_attribute-based-access-control.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_condition_operators.html",
          ],
        },
        {
          topic: "The Full Authorization Evaluation Chain",
          tags: ["aws", "iam", "policy evaluation", "scp", "rcp", "permission boundary", "session policy", "troubleshooting"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  This is the scenario question interviewers love, because it cannot be bluffed. Six kinds of policy can apply to a single API call, and the answer depends on knowing which ones <em>grant</em>, which ones only <em>limit</em>, and the one rule that beats everything.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The chain, in order</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>0. Authentication.</strong> Verify the SigV4 signature. Failure here is <code>InvalidClientTokenId</code> or <code>SignatureDoesNotMatch</code>, not <code>AccessDenied</code>.</li>
  <li><strong>1. Start at implicit deny.</strong> The default answer is no.</li>
  <li><strong>2. Explicit Deny, anywhere.</strong> Scan every applicable policy of every type. One match ends it — <strong>Deny wins, always, finally</strong>.</li>
  <li><strong>3. Service Control Policies.</strong> Every SCP from the org root down through each OU to the account must allow. SCPs never grant; a gap is a deny.</li>
  <li><strong>4. Resource Control Policies.</strong> The organisation-wide cap on what may be done <em>to</em> the resource, whoever is calling.</li>
  <li><strong>5. Session policy.</strong> If the credentials came from <code>AssumeRole --policy</code>, the action must be allowed there too. Intersection only.</li>
  <li><strong>6. Permissions boundary.</strong> If the principal has one, the action must be within it. Intersection only.</li>
  <li><strong>7. Identity-based and resource-based policies.</strong> Finally, look for an explicit <strong>Allow</strong>.</li>
  <li><strong>8. No Allow found → implicit deny stands.</strong></li>
</ul>
<p style="line-height: 1.75;">Memorise the compressed form: <strong>explicit Deny &gt; SCP/RCP &gt; session policy &gt; permissions boundary &gt; explicit Allow &gt; implicit deny</strong>. Everything above the Allow is a <em>filter</em>. <strong>Only identity-based and resource-based policies grant anything.</strong></p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Same account vs cross account</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Same account:</strong> an Allow in <em>either</em> the identity policy <em>or</em> the resource policy is enough. OR.</li>
  <li><strong>Cross account:</strong> you need an Allow in <em>both</em>. AND. Each account is an independent trust boundary.</li>
  <li><strong>KMS exception:</strong> the key policy must always grant. An identity policy alone never suffices, because a key policy that does not delegate to IAM ignores IAM entirely.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The scenario questions, answered</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><em>"Identity policy allows, bucket policy denies?"</em> → <strong>Denied.</strong> Explicit Deny beats any Allow, on either side.</li>
  <li><em>"SCP denies, identity policy allows admin?"</em> → <strong>Denied.</strong> The ceiling is below the grant.</li>
  <li><em>"SCP allows s3:*, but no IAM policy grants anything?"</em> → <strong>Denied.</strong> SCPs never grant.</li>
  <li><em>"Boundary allows s3:*, identity policy allows ec2:*?"</em> → <strong>Nothing works.</strong> The intersection is empty.</li>
  <li><em>"Cross-account, bucket policy allows, caller's identity policy is silent?"</em> → <strong>Denied.</strong> Cross-account needs both.</li>
  <li><em>"Same account, bucket policy allows, identity policy is silent?"</em> → <strong>Allowed.</strong> Same account is OR.</li>
  <li><em>"Session policy allows only s3:GetObject; role allows s3:*?"</em> → <strong>Only GetObject.</strong> Intersection.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The consequences worth stating</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Adding AdministratorAccess does not always help.</strong> If the block is a Deny, an SCP, an RCP, a boundary or a session policy, more Allow changes nothing. That is the diagnostic: <em>when more permission doesn't fix it, stop adding permission and go find the ceiling.</em></li>
  <li><strong>Statement order is irrelevant.</strong> IAM is not a firewall ruleset; there is no first-match-wins. All statements are evaluated together.</li>
  <li><strong>A condition that fails to match makes a statement invisible</strong> — the usual cause being an absent key with a non-<code>IfExists</code> operator. Your Deny did not "not apply"; it simply never matched.</li>
  <li><strong>VPC endpoint policies</strong> are a seventh gate for traffic through an interface or gateway endpoint, and they fail closed in exactly the same silent way.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The debugging routine</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Read the <strong>whole error message</strong> — modern AccessDenied text names the principal, action, resource and often the policy <em>type</em> responsible.</li>
  <li><code>aws sts get-caller-identity</code> — confirm you are who you think you are.</li>
  <li><code>aws iam simulate-principal-policy</code> — decision plus the matched statement Sid, without performing the action.</li>
  <li><code>aws organizations describe-effective-policy</code> — the merged SCP/RCP for that account.</li>
  <li><strong>CloudTrail</strong> — the recorded request context shows which condition keys were actually present.</li>
  <li>Consider <strong>eventual consistency</strong> if the policy changed seconds ago.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Implicit deny, then explicit Deny anywhere ends it immediately, then SCPs, then RCPs, then any session policy, then the permissions boundary, and only then does AWS look for an explicit Allow in identity or resource policies. Everything above the Allow is a filter that can only subtract — only identity and resource policies grant. Same account, an Allow on either side is enough; cross-account you need both; and KMS always requires the key policy. The practical tell is that if AdministratorAccess doesn't fix an AccessDenied, you're fighting a ceiling — a Deny, an SCP or a boundary — not a missing permission."</div>
</div>`,
          examples: [
            `# ================= THE CHAIN =================
#  0. authenticate (SigV4)                 -> InvalidClientTokenId if it fails
#  1. implicit DENY                        (default)
#  2. explicit DENY anywhere               -> DENY, final, nothing overrides
#  3. SCP   (org -> OU -> account)         -> must allow  (never grants)
#  4. RCP   (org, resource side)           -> must allow  (never grants)
#  5. session policy (AssumeRole --policy) -> must allow  (intersection)
#  6. permissions boundary                 -> must allow  (intersection)
#  7. identity policy OR resource policy   -> must ALLOW  (the only granters)
#  8. else                                 -> implicit DENY

# ---------- Scenario 1: Deny wins ----------
# identity: Allow s3:*          bucket policy: Deny s3:DeleteObject
aws s3 rm s3://data/x.csv       # -> AccessDenied

# ---------- Scenario 2: SCP above admin ----------
# identity: AdministratorAccess  SCP: Deny s3:CreateBucket
aws s3 mb s3://new              # -> AccessDenied "...with an explicit deny in a
                                #    service control policy"

# ---------- Scenario 3: SCP allows, IAM silent ----------
# SCP: Allow s3:*                identity: (nothing)
aws s3 ls                       # -> AccessDenied. SCPs never grant.

# ---------- Scenario 4: empty intersection ----------
# identity policy: Allow ec2:*   boundary: Allow s3:*
# EFFECTIVE: nothing at all.

# ---------- Scenario 5: same account = OR ----------
# identity: (silent)             bucket policy: Allow this role s3:GetObject
aws s3 cp s3://same-acct/x .    # -> WORKS

# ---------- Scenario 6: cross account = AND ----------
# A identity: (silent)           B bucket policy: Allow A's role
aws s3 cp s3://b-bucket/x .     # -> AccessDenied (A must allow too)

# ---------- Scenario 7: session policy narrows ----------
aws sts assume-role --role-arn arn:aws:iam::111:role/deploy --role-session-name s \\
  --policy '{"Version":"2012-10-17","Statement":[{"Effect":"Allow",
             "Action":"s3:GetObject","Resource":"arn:aws:s3:::a/*"}]}'
# role allows s3:*  -> this session can ONLY GetObject from bucket a.

# ---------- Simulate instead of guessing ----------
aws iam simulate-principal-policy \\
  --policy-source-arn arn:aws:iam::111122223333:role/deploy \\
  --action-names s3:PutObject kms:Decrypt \\
  --resource-arns arn:aws:s3:::artifacts/build/42.zip \\
  --context-entries ContextKeyName=aws:MultiFactorAuthPresent,ContextKeyType=boolean,ContextKeyValues=true \\
  --query 'EvaluationResults[].{Action:EvalActionName,Decision:EvalDecision,
           Matched:MatchedStatements[].SourcePolicyId,Missing:MissingContextValues}'

# ---------- Was it the org layer? ----------
aws organizations describe-effective-policy --policy-type SERVICE_CONTROL_POLICY  --target-id 222233334444
aws organizations describe-effective-policy --policy-type RESOURCE_CONTROL_POLICY --target-id 222233334444

# ---------- What did the request context actually contain? ----------
aws cloudtrail lookup-events --lookup-attributes AttributeKey=EventName,AttributeValue=PutObject \\
  --max-results 1 --query 'Events[0].CloudTrailEvent' --output text | jq '{
    principal:.userIdentity.arn, error:.errorCode, msg:.errorMessage,
    mfa:.userIdentity.sessionContext.attributes.mfaAuthenticated,
    ip:.sourceIPAddress, vpce:.vpcEndpointId }'

# ---------- Error strings that name the layer ----------
# "...with an explicit deny in a service control policy"
# "...with an explicit deny in a resource control policy"
# "...with an explicit deny in a permissions boundary"
# "...with an explicit deny in a VPC endpoint policy"
# "...because no identity-based policy allows the ... action"`,
          ],
          questions: [
            {
              question: "Walk me through the full authorization evaluation chain.",
              solution: "<p>Authenticate, then start at <strong>implicit deny</strong>. Look for an <strong>explicit Deny</strong> in any applicable policy — if found, done, nothing overrides it. Then every <strong>SCP</strong> from the org root to the account must allow, then <strong>RCPs</strong>, then any <strong>session policy</strong>, then the <strong>permissions boundary</strong>. Only after all those filters pass does AWS look for an explicit <strong>Allow</strong> in identity-based or resource-based policies; with none, the implicit deny stands. The structural insight: only identity and resource policies <em>grant</em> — SCPs, RCPs, boundaries and session policies can only subtract.</p>",
            },
            {
              question: "Identity policy allows s3:GetObject, the bucket policy explicitly denies it. Result?",
              solution: "<p><strong>Denied.</strong> An explicit Deny in <em>any</em> applicable policy — identity-based, resource-based, SCP, RCP, boundary or session — beats every Allow, and no amount of additional permission can override it. This is why Deny is reserved for guardrails you never want a future permission grant to accidentally undo, and why a sprawl of Deny statements becomes unmaintainable: each one is absolute, so the interactions get hard to reason about quickly.</p>",
            },
            {
              question: "An SCP allows s3:*, but the user has no IAM policy. Can they use S3?",
              solution: "<p><strong>No.</strong> SCPs <strong>never grant permissions</strong> — they define the <em>maximum</em> available in the account. Allowing <code>s3:*</code> in an SCP only means 'IAM in this account is permitted to grant S3 actions'. The user still needs an identity-based policy (or a resource-based policy allowing them) before anything works. This is the most common SCP misconception, and the same logic applies to RCPs, permissions boundaries and session policies: all four are ceilings, none is a grant.</p>",
            },
            {
              question: "Why does adding AdministratorAccess sometimes not fix an AccessDenied?",
              solution: "<p>Because the block is a <strong>ceiling, not a missing permission</strong>. Candidates: an <strong>explicit Deny</strong> anywhere; an <strong>SCP</strong> or <strong>RCP</strong> above the account; a <strong>permissions boundary</strong> on the identity; a <strong>session policy</strong> passed at AssumeRole; a <strong>VPC endpoint policy</strong> on the network path; the call being <strong>cross-account</strong> with the resource side silent; or <strong>KMS</strong>, where the key policy must grant regardless of IAM. The rule of thumb: when more Allow doesn't help, stop adding permissions and go find the filter — <code>describe-effective-policy</code> and the error message's policy-type clause will name it.</p>",
            },
            {
              question: "A permissions boundary allows s3:* and the identity policy allows ec2:*. What can the principal do?",
              solution: "<p><strong>Nothing.</strong> Effective permissions are the <strong>intersection</strong> of the identity policies and the boundary, and here the intersection is empty — the boundary permits only S3 while the identity policy grants only EC2. A boundary <strong>grants nothing on its own</strong>; it only caps. The same intersection logic applies to <strong>session policies</strong>, which is why passing a session policy that doesn't overlap the role's permissions produces a session that can do nothing at all despite the role looking correct.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic-cross-account.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/troubleshoot_access-denied.html",
          ],
        },
        {
          topic: "IAM Access Analyzer — Finding Unintended Public & Cross-Account Access",
          tags: ["aws", "iam", "access analyzer", "external access", "unused access", "policy validation"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>IAM Access Analyzer</strong> answers the question nobody can answer by reading policies: <em>given everything currently configured, who can actually reach our resources, and what permissions are we granting that nobody uses?</em> It is free for external-access findings, and it uses <strong>automated reasoning</strong> — mathematical proof over the policy logic, not pattern matching — so a finding is a provable statement about reachability rather than a heuristic guess.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Four distinct capabilities</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>External access findings.</strong> Continuously analyses <em>resource-based</em> policies and reports every resource reachable by a principal outside your <strong>zone of trust</strong> (which you set to either the account or the whole organisation). It covers S3 buckets and access points, IAM roles' trust policies, KMS keys, Lambda functions and layers, SQS queues, Secrets Manager secrets, SNS topics, EFS file systems, ECR repositories, RDS snapshots, EBS snapshots, DynamoDB tables and streams, and more. This is what catches the bucket policy someone loosened "temporarily" two years ago.</li>
  <li><strong>Unused access findings</strong> (paid). Surfaces roles, users, access keys, passwords and even <em>individual permissions and services</em> that have not been used within a window you choose (e.g. 90 days). This is the raw material for continuous least-privilege pruning, and it is organisation-wide.</li>
  <li><strong>Policy validation.</strong> <code>validate-policy</code> checks a policy document against 100+ rules and returns errors, security warnings (overly permissive grants, <code>NotAction</code> with Allow, wildcards in dangerous places), suggestions and general warnings. Run it in CI and fail the build.</li>
  <li><strong>Custom policy checks</strong> (paid). <code>check-no-new-access</code> proves a proposed policy grants no more than the existing one — perfect as a pull-request gate. <code>check-access-not-granted</code> proves a policy never grants specific banned actions (say <code>iam:PassRole</code> or <code>iam:CreatePolicyVersion</code>). <code>check-no-public-access</code> proves a resource policy cannot be public.</li>
</ul>
<p style="line-height: 1.75;">A fifth, closely related feature is <strong>policy generation</strong>: point it at a principal and a CloudTrail trail, and it emits a policy containing exactly the actions that principal actually used. That converts least privilege from an argument into evidence.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Zone of trust — the concept that makes findings useful</h4>
<p style="line-height: 1.75;">When you create an analyzer you choose its zone of trust: <strong>account</strong> or <strong>organization</strong>. Anything reachable from <em>inside</em> the zone is normal and not reported; anything reachable from <em>outside</em> is a finding. In a multi-account company you almost always want an <strong>organization-level analyzer in a delegated security account</strong>, otherwise every legitimate cross-account share in your own org generates noise and people learn to ignore the tool.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Working the findings</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Each finding names the <strong>resource</strong>, the <strong>external principal</strong> (an account, a federated user, or <code>*</code> for public), the <strong>actions</strong> granted, and any <strong>conditions</strong> that apply.</li>
  <li>Triage into: <strong>fix</strong> (unintended — remove or scope the grant), or <strong>archive</strong> (intended — and you should create <strong>archive rules</strong> so known-good sharing never appears again).</li>
  <li>Findings resolve automatically once the policy changes, so the list is live state rather than a ticket queue.</li>
  <li>Route findings to <strong>Security Hub</strong> and <strong>EventBridge</strong> so a new public bucket pages someone instead of waiting for a quarterly review.</li>
  <li>A public S3 bucket, a KMS key usable by another account, or a role trusting <code>"AWS": "*"</code> should be treated as incidents, not backlog.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Where it fits in the lifecycle</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Design</strong> — generate a policy from CloudTrail history instead of guessing.</li>
  <li><strong>Pull request</strong> — <code>validate-policy</code> plus <code>check-no-new-access</code> as required checks.</li>
  <li><strong>Runtime</strong> — external-access findings to Security Hub, alerting on anything public.</li>
  <li><strong>Ongoing</strong> — unused-access findings driving quarterly (or automated) pruning of stale roles, keys and permissions.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Honest limitations</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>It analyses <strong>resource-based policies and IAM configuration</strong>, not network reachability, application logic, or data sensitivity. A bucket that is private but served through a public CloudFront distribution is not a finding.</li>
  <li>Coverage is broad but not every AWS resource type is supported — check the current list rather than assuming.</li>
  <li>Unused-access findings tell you what was <em>not used</em>, which is not the same as <em>not needed</em> — a disaster-recovery role is unused by design. Human review still matters.</li>
  <li>It is detection, not prevention. The preventive counterparts are <strong>SCPs</strong>, <strong>RCPs</strong>, S3 <strong>Block Public Access</strong>, and CI policy checks.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Access Analyzer uses automated reasoning over resource policies to prove which resources are reachable from outside your zone of trust — which you set to the organisation, in a delegated security account, so legitimate internal sharing isn't noise. That catches public buckets, KMS keys shared to another account, and roles trusting a wildcard. Separately it reports unused roles, keys and permissions for pruning, validates policies in CI, and has custom checks like check-no-new-access that I use as a pull-request gate. It's detection though — the prevention is SCPs, RCPs and Block Public Access."</div>
</div>`,
          examples: [
            `# ---------- Organization-wide external access analyzer ----------
aws accessanalyzer create-analyzer \\
  --analyzer-name org-external-access --type ORGANIZATION

aws accessanalyzer list-findings-v2 --analyzer-arn "$ANALYZER" \\
  --filter '{"status":{"eq":["ACTIVE"]}}' \\
  --query 'findings[].{Resource:resource,Type:resourceType,Who:principal,Public:isPublic}' \\
  --output table

# The ones that should page someone
aws accessanalyzer list-findings-v2 --analyzer-arn "$ANALYZER" \\
  --filter '{"isPublic":{"eq":["true"]},"status":{"eq":["ACTIVE"]}}'

# ---------- Archive rules so intended sharing stops being noise ----------
aws accessanalyzer create-archive-rule \\
  --analyzer-name org-external-access --rule-name known-partner \\
  --filter '{"principal.AWS":{"eq":["444455556666"]},
             "resourceType":{"eq":["AWS::S3::Bucket"]}}'

# ---------- Unused access: the pruning engine ----------
aws accessanalyzer create-analyzer \\
  --analyzer-name org-unused-90d --type ORGANIZATION_UNUSED_ACCESS \\
  --configuration 'unusedAccess={unusedAccessAge=90}'

aws accessanalyzer list-findings-v2 --analyzer-arn "$UNUSED" \\
  --filter '{"findingType":{"eq":["UnusedIAMRole","UnusedIAMUserAccessKey","UnusedPermission"]}}' \\
  --query 'findings[].{Type:findingType,Resource:resource}' --output table

# ---------- CI gate 1: validate every policy ----------
aws accessanalyzer validate-policy \\
  --policy-type IDENTITY_POLICY --policy-document file://policy.json \\
  --query 'findings[?findingType==\`ERROR\` || findingType==\`SECURITY_WARNING\`].{
            Type:findingType,Code:issueCode,Detail:findingDetails}'
# non-empty -> fail the build

# ---------- CI gate 2: does this PR widen access? ----------
aws accessanalyzer check-no-new-access \\
  --existing-policy-document file://main.json \\
  --new-policy-document      file://pr.json \\
  --policy-type IDENTITY_POLICY
# -> {"result":"FAIL","reasons":[{"description":"...s3:DeleteBucket newly allowed..."}]}

# ---------- CI gate 3: banned actions, proven absent ----------
aws accessanalyzer check-access-not-granted \\
  --policy-document file://policy.json --policy-type IDENTITY_POLICY \\
  --access 'actions=["iam:PassRole","iam:CreatePolicyVersion","iam:UpdateAssumeRolePolicy"]'

# ---------- CI gate 4: this resource policy can never be public ----------
aws accessanalyzer check-no-public-access \\
  --policy-document file://bucket-policy.json --resource-type AWS::S3::Bucket

# ---------- Generate a policy from what the workload ACTUALLY did ----------
aws accessanalyzer start-policy-generation \\
  --policy-generation-details principalArn=arn:aws:iam::111122223333:role/legacy-app \\
  --cloud-trail-details 'trails=[{cloudTrailArn=arn:aws:cloudtrail:us-east-1:111122223333:trail/org,allRegions=true}],
     accessRole=arn:aws:iam::111122223333:role/AccessAnalyzerCloudTrailRole,
     startTime=2026-06-01T00:00:00Z'
aws accessanalyzer get-generated-policy --job-id "$JOB" --include-resource-placeholders

# ---------- Alert the moment something becomes public ----------
cat > rule.json <<'EOF'
{
  "source": ["aws.access-analyzer"],
  "detail-type": ["Access Analyzer Finding"],
  "detail": { "isPublic": [true], "status": ["ACTIVE"] }
}
EOF
aws events put-rule --name analyzer-public-finding --event-pattern file://rule.json
aws events put-targets --rule analyzer-public-finding \\
  --targets 'Id=1,Arn=arn:aws:sns:us-east-1:111122223333:security-alerts'`,
          ],
          questions: [
            {
              question: "What does IAM Access Analyzer do, and what is a 'zone of trust'?",
              solution: "<p>It uses <strong>automated reasoning</strong> — mathematical proof over policy logic, not pattern matching — to determine which resources are reachable by principals <strong>outside your zone of trust</strong>, analysing resource-based policies on S3 buckets, IAM role trust policies, KMS keys, Lambda functions, SQS queues, Secrets Manager secrets, SNS topics, ECR repositories, snapshots and more. The <strong>zone of trust</strong> is what you declare as 'inside': either a single account or the whole <strong>organization</strong>. Anything reachable from inside is normal and unreported; anything from outside is a finding. Multi-account companies should use an organization analyzer in a delegated security account, or legitimate internal sharing floods the findings and people stop reading them.</p>",
            },
            {
              question: "What's the difference between external-access and unused-access findings?",
              solution: "<p><strong>External access</strong> answers 'what can be reached from outside?' — exposure. It is free, continuous, and catches public buckets, KMS keys shared cross-account, and roles trusting a wildcard. <strong>Unused access</strong> answers 'what do we grant that nobody uses?' — excess. It is a paid analyzer that reports roles, users, access keys, passwords and even individual permissions untouched within a chosen window (e.g. 90 days), and it is the raw material for continuous least-privilege pruning. Mature accounts run both, plus <strong>policy validation</strong> and <strong>custom policy checks</strong> in CI.</p>",
            },
            {
              question: "How would you use Access Analyzer in a CI/CD pipeline?",
              solution: "<p>Three gates on every pull request touching IAM. <code>validate-policy</code> to fail the build on <code>ERROR</code> or <code>SECURITY_WARNING</code> findings (invalid actions, overly broad grants, <code>NotAction</code> with Allow). <code>check-no-new-access</code> comparing the proposed document against the one on main, so any widening of access is flagged for explicit security review rather than sliding through. <code>check-access-not-granted</code> to prove the policy never grants banned actions such as <code>iam:PassRole</code> or <code>iam:CreatePolicyVersion</code>. For resource policies, add <code>check-no-public-access</code>. These are <em>proofs</em>, not linting, so a pass is meaningful.</p>",
            },
            {
              question: "Access Analyzer reports a finding for a bucket you deliberately share with a partner. What do you do?",
              solution: "<p><strong>Archive it with an archive rule</strong>, not by hand. A rule with a filter matching that principal and resource type means the finding — and future equivalent ones — never appears again, keeping the active list meaningful. Hand-archiving individual findings does not scale and the noise returns after any policy edit. The discipline that makes the tool work is that the <strong>active findings list should be empty or near-empty</strong>, so anything appearing in it is genuinely unexpected and worth a page; a list of 400 known-good findings is a list nobody reads.</p>",
            },
            {
              question: "What are the limits of Access Analyzer?",
              solution: "<p>It analyses <strong>IAM configuration and resource policies</strong>, not network reachability, application logic or data sensitivity — a private bucket served through a public CloudFront distribution is not a finding, and neither is an app that leaks data through its own API. Resource-type coverage is broad but not universal. Unused-access findings report what was <em>not used</em>, which is not the same as <em>not needed</em> (a disaster-recovery role is idle by design), so they need human review before deletion. Most importantly it is <strong>detection, not prevention</strong> — the preventive controls are SCPs, RCPs, S3 Block Public Access and CI policy checks.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-findings.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-custom-policy-checks.html",
          ],
        },
        {
          topic: "Wildcard Risk",
          tags: ["aws", "iam", "least privilege", "wildcards", "policy review", "security"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <code>{"Effect": "Allow", "Action": "*", "Resource": "*"}</code> is <strong>AdministratorAccess</strong>. Not "broad" — literally every action on every resource in the account, including creating users, deleting the audit trail, and spending unlimited money. When an interviewer shows you a policy, scanning for wildcards is the first thing they expect you to do, and saying why is how you demonstrate judgement rather than trivia.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Why it is worse than it looks</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>It grows silently.</strong> <code>"Action": "*"</code> includes every service AWS launches in the future. A policy written in 2021 grants Bedrock today. You never reviewed that decision.</li>
  <li><strong>It hides escalation.</strong> A wildcard includes <code>iam:*</code> and <code>iam:PassRole</code>, so the holder can make themselves permanent admin, rewrite trust policies, or run code as any role. Even scoped to one service, wildcards hide dangerous verbs: <code>s3:*</code> includes <code>s3:PutBucketPolicy</code> (make it public) and <code>s3:DeleteBucket</code>; <code>ec2:*</code> includes <code>ec2:ModifySnapshotAttribute</code> (share your data publicly).</li>
  <li><strong>It destroys the audit story.</strong> "Who could have done this?" becomes "everyone with that policy", which is the end of any meaningful incident investigation.</li>
  <li><strong>It makes blast radius unbounded.</strong> Least privilege exists precisely so that a compromised credential, a buggy script or a bad <code>terraform destroy</code> hits a wall.</li>
  <li><strong>It fails every compliance framework</strong> — SOC 2, PCI DSS, HIPAA, ISO 27001 all require demonstrable least privilege, and "we granted <code>*</code>" is not demonstrable.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The nuance that gets you credit</h4>
<p style="line-height: 1.75;">Not every wildcard is wrong, and saying so proves you have actually written policies:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Many actions genuinely do not support resource-level permissions</strong> — <code>ec2:DescribeInstances</code>, <code>s3:ListAllMyBuckets</code>, <code>iam:ListRoles</code>. For those, <code>"Resource": "*"</code> is the <em>only legal value</em>. The correct move is to check the <strong>service authorization reference</strong> and then scope with <strong>conditions</strong> (<code>aws:RequestedRegion</code>, <code>aws:ResourceTag</code>, <code>ec2:InstanceType</code>) instead.</li>
  <li><strong>Read-only wildcards are a different risk class.</strong> <code>"Action": "s3:Get*"</code> is still a data-exfiltration risk, but it cannot destroy or escalate. Be able to distinguish "broad but read-only" from "broad and mutating".</li>
  <li><strong>Prefixed wildcards can be precise</strong> when resource naming is disciplined: <code>arn:aws:s3:::acme-prod-payments-*/*</code> is a tight grant, whereas <code>arn:aws:s3:::*</code> is not. Good naming conventions are what make wildcards safe.</li>
  <li><strong>Wildcards in a Deny are usually fine</strong> — <code>"Action": "*"</code> in a Deny is a guardrail, not a grant.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The related red flags</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong><code>"NotAction"</code> with <code>Allow</code></strong> — "everything except these", which grants future services you have never heard of. Fine with Deny, dangerous with Allow.</li>
  <li><strong><code>"Principal": "*"</code></strong> in a resource policy without a narrowing Condition — that is the public internet, and it is how buckets end up in the news.</li>
  <li><strong><code>iam:PassRole</code> on <code>*</code></strong> combined with any compute-creation permission — a direct path to admin.</li>
  <li><strong><code>"Resource": "arn:aws:iam::*:role/*"</code></strong> on IAM write actions — the ability to modify any role.</li>
  <li><strong>Attaching <code>PowerUserAccess</code> and thinking it is modest</strong> — it is "everything except IAM and Organizations", which is far more than most people assume.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">How to answer "we need admin to ship"</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Agree in the sandbox, refuse in production.</strong> Let it run broad in dev to learn the real call list.</li>
  <li><strong>Generate the real policy</strong> from CloudTrail with Access Analyzer policy generation, so the conversation moves from opinion to evidence.</li>
  <li><strong>Cap it with a permissions boundary</strong> so even a broad grant cannot reach IAM or leave the region.</li>
  <li><strong>Time-box it</strong> with an <code>aws:CurrentTime</code> condition, so temporary access is actually temporary.</li>
  <li><strong>Make broad access loud</strong> — alert on use of the admin role, and require MFA plus a short session.</li>
  <li><strong>Gate it in CI</strong> with <code>check-access-not-granted</code> so a wildcard cannot be merged silently.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Action * on Resource * is AdministratorAccess — including iam:*, so the holder can make themselves permanent admin, and including every service AWS launches in future, so the grant silently grows. It also ends any audit story, because 'who could have done this' becomes 'anyone with that policy'. The nuance is that some actions genuinely don't support resource-level permissions, so Resource * is the only legal value there — in that case I check the service authorization reference and scope with conditions instead. And I distinguish a read-only wildcard from a mutating one: both are findings, but only one can destroy or escalate."</div>
</div>`,
          examples: [
            `# ---------- The red flags, in descending severity ----------
{ "Effect":"Allow","Action":"*","Resource":"*" }                  # = AdministratorAccess
{ "Effect":"Allow","NotAction":"iam:*","Resource":"*" }            # everything AWS ever launches
{ "Effect":"Allow","Action":"iam:*","Resource":"*" }               # self-escalation to admin
{ "Effect":"Allow","Action":"iam:PassRole","Resource":"*" }        # + any compute = admin
{ "Effect":"Allow","Action":"s3:*","Resource":"*" }                # incl. PutBucketPolicy -> public
{ "Principal":"*","Action":"s3:GetObject","Resource":"arn:aws:s3:::b/*" }  # the public internet

# ---------- What s3:* actually contains ----------
# s3:PutBucketPolicy        -> make the bucket public
# s3:PutBucketAcl           -> same, via ACL
# s3:DeleteBucket           -> destroy it
# s3:PutBucketVersioning    -> disable versioning, defeating backups
# s3:PutBucketLogging       -> turn off access logs
# "Read-only wildcard" is a different risk class from this.

# ---------- Legitimate wildcards ----------
# (a) the action does not support resource-level permissions — * is the ONLY legal value
{ "Effect":"Allow",
  "Action":["ec2:DescribeInstances","ec2:DescribeVolumes","s3:ListAllMyBuckets"],
  "Resource":"*",
  "Condition":{"StringEquals":{"aws:RequestedRegion":"eu-west-1"}} }   # scope with conditions

# (b) disciplined naming makes a prefix wildcard precise
{ "Effect":"Allow","Action":["s3:GetObject","s3:PutObject"],
  "Resource":"arn:aws:s3:::acme-prod-payments-*/*" }

# (c) wildcards in a DENY are guardrails, not grants
{ "Effect":"Deny","Action":"*","Resource":"*",
  "Condition":{"BoolIfExists":{"aws:MultiFactorAuthPresent":"false"}} }

# ---------- Rewriting a wildcard grant ----------
# BEFORE
{ "Effect":"Allow","Action":"*","Resource":"*" }
# AFTER
{
  "Version": "2012-10-17",
  "Statement": [
    { "Sid":"AppDataPlane","Effect":"Allow",
      "Action":["s3:GetObject","s3:PutObject"],
      "Resource":"arn:aws:s3:::acme-prod-orders/*" },
    { "Sid":"AppTable","Effect":"Allow",
      "Action":["dynamodb:GetItem","dynamodb:PutItem","dynamodb:Query"],
      "Resource":"arn:aws:dynamodb:eu-west-1:111122223333:table/Orders" },
    { "Sid":"Telemetry","Effect":"Allow",
      "Action":["logs:CreateLogStream","logs:PutLogEvents"],
      "Resource":"arn:aws:logs:eu-west-1:111122223333:log-group:/aws/lambda/orders-*:*" },
    { "Sid":"DescribesCannotBeScoped","Effect":"Allow",
      "Action":["ec2:DescribeNetworkInterfaces"],"Resource":"*",
      "Condition":{"StringEquals":{"aws:RequestedRegion":"eu-west-1"}} }
  ]
}

# ---------- Catch them automatically ----------
aws accessanalyzer validate-policy --policy-type IDENTITY_POLICY \\
  --policy-document file://policy.json \\
  --query 'findings[?findingType==\`SECURITY_WARNING\`].[issueCode,findingDetails]' --output text
# PASS_ROLE_WITH_STAR_IN_RESOURCE, MISSING_CONDITION_FOR_WILDCARD_RESOURCE, ...

aws accessanalyzer check-access-not-granted --policy-type IDENTITY_POLICY \\
  --policy-document file://policy.json \\
  --access 'actions=["iam:*","iam:PassRole","s3:PutBucketPolicy","ec2:ModifySnapshotAttribute"]'

# ---------- Find existing wildcard grants in the account ----------
aws iam list-policies --scope Local --only-attached --query 'Policies[].Arn' --output text \\
| tr '\\t' '\\n' | while read a; do
  v=$(aws iam get-policy --policy-arn "$a" --query 'Policy.DefaultVersionId' --output text)
  aws iam get-policy-version --policy-arn "$a" --version-id "$v" --query 'PolicyVersion.Document' \\
    | grep -q '"Action": *"\\*"' && echo "WILDCARD ACTION: $a"
done

# Config rule that flags it continuously
aws configservice put-config-rule --config-rule '{
  "ConfigRuleName":"iam-policy-no-statements-with-admin-access",
  "Source":{"Owner":"AWS","SourceIdentifier":"IAM_POLICY_NO_STATEMENTS_WITH_ADMIN_ACCESS"}}'`,
          ],
          questions: [
            {
              question: "Why is \"Action\": \"*\" with \"Resource\": \"*\" an immediate red flag?",
              solution: "<p>Because it <em>is</em> AdministratorAccess. It includes <code>iam:*</code>, so the holder can attach admin to themselves, rewrite trust policies or mint access keys — permanent escalation. It includes every service AWS launches in <strong>future</strong>, so the grant silently widens without anyone deciding. It makes blast radius unbounded, so a leaked credential or a bad script has nothing to stop it. And it ends the audit story: 'who could have done this?' becomes 'anyone holding this policy'. Every compliance framework requires demonstrable least privilege, and a wildcard is the opposite of demonstrable.</p>",
            },
            {
              question: "When is \"Resource\": \"*\" actually acceptable?",
              solution: "<p>When the action <strong>does not support resource-level permissions</strong> — many list and describe operations such as <code>ec2:DescribeInstances</code>, <code>s3:ListAllMyBuckets</code> and <code>iam:ListRoles</code> accept only <code>*</code>, so writing anything else makes the policy silently non-functional. The right response is to confirm it in the <strong>service authorization reference</strong> (which documents exactly which actions support resource-level permissions and which condition keys each supports) and then scope with <strong>conditions</strong> instead — <code>aws:RequestedRegion</code>, <code>aws:ResourceTag</code>, <code>ec2:InstanceType</code>. Putting those actions in their own clearly-commented statement also signals to a reviewer that the wildcard was deliberate.</p>",
            },
            {
              question: "A team says they need AdministratorAccess to ship. How do you respond?",
              solution: "<p>Don't refuse flatly — make it evidence-driven and time-bound. Agree to broad access in a <strong>sandbox</strong> so the workload reveals its real call list, then use <strong>Access Analyzer policy generation</strong> over CloudTrail to produce the actual policy, which moves the conversation from opinion to data. Cap whatever they get with a <strong>permissions boundary</strong> so it cannot reach IAM or leave approved regions, <strong>time-box</strong> it with an <code>aws:CurrentTime</code> condition, require <strong>MFA</strong> with a short session, and <strong>alert</strong> on every use of the broad role. Then add a CI gate (<code>check-access-not-granted</code>) so wildcards cannot be merged silently later.</p>",
            },
            {
              question: "Is s3:* on one bucket acceptable? What does it include?",
              solution: "<p>It is far more than 'read and write that bucket'. <code>s3:*</code> includes <strong><code>s3:PutBucketPolicy</code> and <code>s3:PutBucketAcl</code></strong> — the holder can make the bucket public; <strong><code>s3:PutBucketVersioning</code></strong> — disable versioning and defeat your backup/ransomware protection; <strong><code>s3:PutBucketLogging</code></strong> — turn off access logs; and <strong><code>s3:DeleteBucket</code></strong>. For an application, grant the data-plane actions it actually uses (<code>GetObject</code>, <code>PutObject</code>, <code>ListBucket</code> with an <code>s3:prefix</code> condition) and leave every bucket-configuration action out. Note also that <code>ListBucket</code> takes the bucket ARN while object actions take <code>bucket/*</code>.</p>",
            },
            {
              question: "What other wildcard patterns should you flag in a policy review?",
              solution: "<p><strong><code>NotAction</code> with <code>Allow</code></strong> — 'everything except these', which grants every service AWS ever launches; fine with Deny, dangerous with Allow. <strong><code>\"Principal\": \"*\"</code></strong> in a resource policy with no narrowing Condition — that is the public internet. <strong><code>iam:PassRole</code> on <code>*</code></strong> combined with any compute-creation permission — a direct path to admin. <strong>IAM write actions on <code>arn:aws:iam::*:role/*</code></strong> — the ability to modify any role. And <strong><code>PowerUserAccess</code></strong> treated as modest, when it actually means 'everything except IAM and Organizations'.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html",
            "https://docs.aws.amazon.com/service-authorization/latest/reference/reference_policies_actions-resources-contextkeys.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-policy-validation.html",
          ],
        },
        {
          topic: "Credential Hygiene — Rotate, Eliminate, Prefer Roles",
          tags: ["aws", "iam", "credentials", "rotation", "secrets manager", "guardduty", "hygiene"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Most real AWS breaches are not clever. They are a long-lived access key that was committed to a repository, pasted into a wiki, or left on a laptop. <strong>Credential hygiene</strong> is the boring discipline that removes that whole class of incident, and the strongest version of it is not "rotate your keys" but <strong>"have no keys to rotate"</strong>.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The hierarchy, best to worst</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>No credential at all.</strong> Code inside AWS uses an <strong>IAM role</strong> — instance profile, Lambda execution role, ECS task role, EKS IRSA. The SDK fetches and refreshes credentials transparently; nothing is stored, so nothing can leak.</li>
  <li><strong>Federated, no stored secret.</strong> External CI uses <strong>OIDC</strong>; on-premises uses <strong>IAM Roles Anywhere</strong> with X.509 certificates; humans use <strong>IAM Identity Center</strong>. A signed assertion is exchanged for temporary credentials per use.</li>
  <li><strong>Temporary credentials from STS</strong> — <code>ASIA…</code> plus a session token, expiring in 15 minutes to 12 hours.</li>
  <li><strong>Long-lived access keys in a secret manager</strong>, scoped, condition-locked and automatically rotated. Acceptable only when the consumer genuinely cannot federate.</li>
  <li><strong>Long-lived access keys in a file, an environment variable or a CI setting.</strong> The thing you are trying to eliminate.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Rotation, when you cannot avoid keys</h4>
<p style="line-height: 1.75;">An IAM user gets <strong>two</strong> access keys precisely so rotation causes no downtime:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Create</strong> a second key.</li>
  <li><strong>Deploy</strong> it to every consumer.</li>
  <li><strong>Verify</strong> with <code>aws iam get-access-key-last-used</code> that the old key is idle — the step people skip, and the reason rotations break production.</li>
  <li><strong>Deactivate</strong> the old key (<code>--status Inactive</code>). This is a reversible kill switch: if something breaks, re-activate.</li>
  <li><strong>Delete</strong> it after a full business cycle.</li>
</ul>
<p style="line-height: 1.75;">Better: put the key in <strong>Secrets Manager</strong> with a rotation Lambda so the whole dance runs on a schedule with no human. Manual rotation is rotation that does not happen.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The hygiene checklist</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Root:</strong> no access keys at all, hardware MFA, vaulted password on a group-alias email, alarm on every sign-in.</li>
  <li><strong>Humans:</strong> no IAM users — Identity Center with MFA enforced at the IdP.</li>
  <li><strong>Workloads:</strong> roles everywhere; a key on an EC2 instance is always a bug.</li>
  <li><strong>Password policy:</strong> minimum 14–16 characters, complexity, reuse prevention, and MFA required.</li>
  <li><strong>Credential report</strong> on a schedule to find users with no MFA, unused passwords, and keys older than 90 days — automate the cleanup, do not email a spreadsheet.</li>
  <li><strong>Access Analyzer unused-access findings</strong> to delete stale roles, users, keys and individual permissions.</li>
  <li><strong>Secret scanning</strong> in pre-commit hooks <em>and</em> server-side push protection, because one of the two will be bypassed.</li>
  <li><strong>Never</strong> put credentials in AMIs, container images, Terraform state, environment variables in a task definition, user-data scripts, or Slack.</li>
  <li><strong>IMDSv2 required</strong> with hop limit 1, so an SSRF cannot harvest instance-role credentials.</li>
  <li><strong>GuardDuty</strong> on, watching for <code>UnauthorizedAccess:IAMUser/InstanceCredentialExfiltration</code> and anomalous API behaviour.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">When a key leaks</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Contain first.</strong> Deactivate the key immediately — do not start by rewriting git history, the key was scraped within seconds of the push.</li>
  <li><strong>Scope</strong> with CloudTrail filtered on the <code>accessKeyId</code>.</li>
  <li><strong>Hunt persistence</strong>, not just usage: new users, keys, roles, policy versions, rewritten trust policies, public snapshots, instances in unusual regions, disabled logging.</li>
  <li><strong>Remediate</strong> everything created, <strong>rotate</strong> adjacent secrets the identity could read, then <strong>delete</strong> the key.</li>
  <li><strong>Fix the cause</strong>: move that workload to a role or OIDC so the same leak cannot recur.</li>
  <li>If AWS auto-attaches <code>AWSCompromisedKeyQuarantine</code>, treat it as an alarm that you were late, not as the remedy.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "The goal isn't rotating keys, it's not having them. Anything running in AWS gets a role, external CI gets OIDC, on-prem gets Roles Anywhere, humans get Identity Center — all temporary credentials that refresh automatically. Where a legacy system truly needs a static key, I scope it tightly, condition-lock it to a source IP or VPC endpoint, store it in Secrets Manager with automatic rotation, and monitor it. Rotation uses the two-key dance with get-access-key-last-used to prove the old key is idle before deactivating. And I back it with credential reports, Access Analyzer unused-access findings, secret scanning on push, IMDSv2, and GuardDuty for exfiltration."</div>
</div>`,
          examples: [
            `# ---------- Zero-downtime rotation ----------
aws iam create-access-key --user-name svc-legacy                 # 1. new key
#    2. deploy it everywhere
aws iam get-access-key-last-used --access-key-id AKIAOLD \\
  --query 'AccessKeyLastUsed.{When:LastUsedDate,Service:ServiceName}'   # 3. prove idle
aws iam update-access-key --user-name svc-legacy \\
  --access-key-id AKIAOLD --status Inactive                      # 4. reversible kill switch
aws iam delete-access-key --user-name svc-legacy --access-key-id AKIAOLD  # 5. after a cycle

# ---------- Find the rot: no MFA, stale keys, unused passwords ----------
aws iam generate-credential-report >/dev/null
aws iam get-credential-report --query Content --output text | base64 -d > /tmp/cred.csv

awk -F, 'NR==1 || ($4=="true" && $8=="false")' /tmp/cred.csv | column -t   # password, no MFA
awk -F, 'NR==1 || ($9=="true" && $11=="N/A")'  /tmp/cred.csv | column -t   # active key never used
awk -F, -v cut="$(date -u -v-90d +%Y-%m-%d)" \\
  'NR==1 || ($9=="true" && $10 < cut)' /tmp/cred.csv | column -t           # key older than 90d

# ---------- Password policy ----------
aws iam update-account-password-policy \\
  --minimum-password-length 16 --require-symbols --require-numbers \\
  --require-uppercase-characters --require-lowercase-characters \\
  --allow-users-to-change-password --password-reuse-prevention 24 --max-password-age 90

# ---------- Lock a legacy key down when you truly cannot remove it ----------
{
  "Version": "2012-10-17",
  "Statement": [
    { "Effect":"Allow","Action":"s3:PutObject","Resource":"arn:aws:s3:::vendor-drop/*" },
    { "Effect":"Deny","Action":"*","Resource":"*",
      "Condition":{ "NotIpAddress":{"aws:SourceIp":["198.51.100.0/24"]},
                    "Bool":{"aws:ViaAWSService":"false"} } }
  ]
}
# ...and store the key in Secrets Manager with automatic rotation
aws secretsmanager rotate-secret --secret-id prod/vendor-key \\
  --rotation-lambda-arn arn:aws:lambda:eu-west-1:111122223333:function:rotate-iam-key \\
  --rotation-rules AutomaticallyAfterDays=30

# ---------- Unused access, org-wide ----------
aws accessanalyzer create-analyzer --analyzer-name unused-90 \\
  --type ORGANIZATION_UNUSED_ACCESS --configuration 'unusedAccess={unusedAccessAge=90}'

# ---------- Continuous compliance ----------
for r in iam-user-mfa-enabled access-keys-rotated iam-user-no-policies-check \\
         iam-root-access-key-check iam-policy-no-statements-with-admin-access; do
  echo "enable Config rule: $r"
done

# ---------- IMDSv2 everywhere ----------
aws ec2 modify-instance-metadata-options --instance-id i-0abc \\
  --http-tokens required --http-put-response-hop-limit 1 --http-endpoint enabled

# ---------- LEAK RESPONSE ----------
# 1. CONTAIN (first, always)
aws iam update-access-key --user-name svc-app --access-key-id AKIALEAKED --status Inactive
# 2. SCOPE
aws cloudtrail lookup-events \\
  --lookup-attributes AttributeKey=AccessKeyId,AttributeValue=AKIALEAKED \\
  --query 'Events[].{T:EventTime,E:EventName,IP:CloudTrailEvent}' --output table
# 3. HUNT PERSISTENCE
for e in CreateUser CreateAccessKey CreateRole AttachRolePolicy PutRolePolicy \\
         UpdateAssumeRolePolicy CreatePolicyVersion ModifySnapshotAttribute StopLogging; do
  aws cloudtrail lookup-events --lookup-attributes AttributeKey=EventName,AttributeValue=$e \\
    --start-time 2026-09-01 --query "Events[].{E:EventName,U:Username,T:EventTime}" --output text
done
# 4. DELETE + fix the cause (move to a role / OIDC)
aws iam delete-access-key --user-name svc-app --access-key-id AKIALEAKED`,
          ],
          questions: [
            {
              question: "What's your policy on access keys?",
              solution: "<p>Eliminate them rather than manage them. Anything running <strong>inside AWS</strong> gets an IAM role — instance profile, Lambda execution role, ECS task role, EKS IRSA — so credentials are delivered and refreshed automatically and never stored. <strong>External CI</strong> uses OIDC federation, <strong>on-premises</strong> uses IAM Roles Anywhere, and <strong>humans</strong> use Identity Center. A static key is a last resort for legacy systems that genuinely cannot federate, and then it is tightly scoped, condition-locked to a source IP or VPC endpoint, stored in <strong>Secrets Manager with automatic rotation</strong>, and monitored. A key on an EC2 instance is always a bug.</p>",
            },
            {
              question: "Walk me through rotating an access key with no downtime.",
              solution: "<p>Use the two-key allowance. (1) <code>create-access-key</code> for a second active key. (2) Deploy it to every consumer. (3) Poll <code>get-access-key-last-used</code> on the old key until it shows no recent activity — <strong>this is the step people skip</strong>, and skipping it is why rotations break production, because there is always one forgotten consumer. (4) <code>update-access-key --status Inactive</code>, a reversible kill switch you can undo if something does break. (5) <code>delete-access-key</code> after a full business cycle. Better still, wrap the whole sequence in a <strong>Secrets Manager rotation Lambda</strong> on a schedule, because manual rotation is rotation that does not happen.</p>",
            },
            {
              question: "How do you find credential rot across an account?",
              solution: "<p>Start with the <strong>credential report</strong> (<code>generate-credential-report</code> then <code>get-credential-report</code>), one CSV row per user covering MFA status, password age and last use, and both keys' age, status and last use. Three queries find most problems: users with a password but <code>mfa_active=false</code>; active keys with <code>last_used=N/A</code>; and keys older than 90 days. Layer on <strong>Access Analyzer unused-access findings</strong> for stale roles and individual unused permissions, <strong>Access Advisor</strong> for services a principal has never called, and <strong>AWS Config</strong> rules (<code>iam-user-mfa-enabled</code>, <code>access-keys-rotated</code>, <code>iam-root-access-key-check</code>) for continuous enforcement rather than a periodic scramble.</p>",
            },
            {
              question: "A developer commits an access key to a public repo. What do you do, in order?",
              solution: "<p><strong>Contain first</strong> — <code>update-access-key --status Inactive</code> immediately; scraping bots find <code>AKIA</code> strings within seconds, so rewriting git history first is wasted time. <strong>Scope</strong> with CloudTrail filtered on that <code>accessKeyId</code>. <strong>Hunt persistence</strong>, not just usage: new IAM users, keys, roles, policy versions, rewritten trust policies, public snapshots, instances in odd regions, disabled logging. <strong>Remediate</strong> everything created and <strong>rotate</strong> secrets that identity could read. <strong>Delete</strong> the key. Then <strong>fix the cause</strong> — move the workload onto a role or OIDC and add pre-commit plus server-side secret scanning. If AWS auto-attaches <code>AWSCompromisedKeyQuarantine</code>, that is an alarm that you were late, not the remedy.</p>",
            },
            {
              question: "Why is deactivating a key better than deleting it as a first response?",
              solution: "<p>Because deactivation is <strong>instant and reversible</strong>. It stops the credential authenticating immediately — the containment you need right now — while leaving you the option to re-activate if you discover a critical consumer you had forgotten, and leaving the key ID intact so CloudTrail correlation stays straightforward. Deletion is permanent and the key ID is never reissued. The right sequence during an incident is deactivate → investigate → remediate → delete, so that containment is never delayed by the fear of breaking something.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/security-creds-problem-resolution.html",
          ],
        },
        {
          topic: "EC2 — Instance Profiles, IMDS & No Hardcoded Keys",
          tags: ["aws", "iam", "ec2", "instance profile", "imdsv2", "metadata", "ssrf"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  An EC2 instance gets AWS permissions through an <strong>instance profile</strong>, and the correct answer to "how does my app on EC2 authenticate to S3?" is always <em>"it doesn't hold a credential — the role delivers one"</em>. A key in a config file on an instance is always a bug.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Instance profile vs role</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>An <strong>instance profile</strong> is a thin container that holds <strong>exactly one IAM role</strong>. You attach the <em>profile</em> to the instance, not the role directly.</li>
  <li>The console creates the profile implicitly with the same name as the role, which is why many people never notice it exists — then hit a confusing error when creating roles via CLI or Terraform and forgetting <code>create-instance-profile</code> + <code>add-role-to-instance-profile</code>.</li>
  <li>The role's <strong>trust policy must name <code>ec2.amazonaws.com</code></strong> as the service principal. A role trusting Lambda cannot be attached to an instance.</li>
  <li>You can swap the attached profile on a running instance; credentials refresh within minutes, no restart required.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">How credentials reach the process</h4>
<p style="line-height: 1.75;">The <strong>Instance Metadata Service (IMDS)</strong> serves them from the link-local address <code>169.254.169.254</code>, under <code>/latest/meta-data/iam/security-credentials/&lt;role-name&gt;</code>. Every AWS SDK checks this path automatically as part of its default credential chain, so correctly written code needs no configuration at all. The credentials are temporary, and the SDK refreshes them well before expiry — typically several times a day.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">IMDSv2, and why it exists</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>IMDSv1</strong> answered a plain <code>GET</code>. Any application vulnerable to <strong>server-side request forgery</strong> could be tricked into fetching <code>http://169.254.169.254/...</code> and returning the instance's credentials to an attacker. That is the mechanism behind the <strong>Capital One breach</strong>.</li>
  <li><strong>IMDSv2</strong> is session-oriented: you must first <code>PUT</code> to <code>/latest/api/token</code> to obtain a token, then send it in a header on every <code>GET</code>. Typical SSRF primitives cannot issue a PUT with custom headers, which closes the hole.</li>
  <li>Set <code>--http-tokens required</code> to disable v1 entirely, and <code>--http-put-response-hop-limit 1</code> so the response TTL dies after one hop — preventing <strong>containers</strong> on the instance (and any forwarding proxy) from reaching IMDS and inheriting the node's role.</li>
  <li>Enforce it organisation-wide with an <strong>SCP</strong> denying <code>ec2:RunInstances</code> unless <code>ec2:MetadataHttpTokens</code> is <code>required</code>, and set the account-level default so new instances are safe by default.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Related IAM concerns</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong><code>iam:PassRole</code></strong> is required to launch an instance with a profile. Granting it on <code>*</code> alongside <code>ec2:RunInstances</code> lets someone launch an instance with the admin role and read its credentials — a classic escalation path. Scope it and add <code>"iam:PassedToService": "ec2.amazonaws.com"</code>.</li>
  <li><strong>User data is not secret.</strong> It is readable through IMDS by anything on the instance, so never put credentials there.</li>
  <li><strong>Use SSM Session Manager instead of SSH keys</strong> — access becomes an IAM decision, logged in CloudTrail, with no inbound port and no key distribution.</li>
  <li><strong>GuardDuty</strong> raises <code>UnauthorizedAccess:IAMUser/InstanceCredentialExfiltration</code> when instance-role credentials are used from outside AWS, which is a high-confidence theft signal.</li>
  <li>One role per workload, not one shared role per fleet — otherwise every app on the fleet has the union of everyone's permissions.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "EC2 gets permissions via an instance profile, which is a container holding one role whose trust policy names ec2.amazonaws.com. Code on the box never stores a key — the SDK fetches temporary credentials from the Instance Metadata Service at 169.254.169.254 and refreshes them automatically. I require IMDSv2 with hop limit 1, because IMDSv1's plain GET is what turned an SSRF bug into the Capital One breach, and the hop limit stops containers inheriting the node role. Launching with a profile needs iam:PassRole, so I scope that with iam:PassedToService rather than granting it on a wildcard."</div>
</div>`,
          examples: [
            `# ---------- Role + instance profile (the CLI needs both steps) ----------
cat > trust.json <<'EOF'
{ "Version":"2012-10-17","Statement":[{
  "Effect":"Allow","Principal":{"Service":"ec2.amazonaws.com"},"Action":"sts:AssumeRole"}]}
EOF
aws iam create-role --role-name app-server-role --assume-role-policy-document file://trust.json
aws iam put-role-policy --role-name app-server-role --policy-name AppData \\
  --policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow",
    "Action":["s3:GetObject","s3:PutObject"],"Resource":"arn:aws:s3:::app-data/*"}]}'

aws iam create-instance-profile --instance-profile-name app-server-profile
aws iam add-role-to-instance-profile \\
  --instance-profile-name app-server-profile --role-name app-server-role

aws ec2 associate-iam-instance-profile --instance-id i-0abc123 \\
  --iam-instance-profile Name=app-server-profile

# ---------- Reading credentials the IMDSv2 way (what the SDK does for you) ----------
TOKEN=$(curl -sX PUT "http://169.254.169.254/latest/api/token" \\
  -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")
ROLE=$(curl -s -H "X-aws-ec2-metadata-token: $TOKEN" \\
  http://169.254.169.254/latest/meta-data/iam/security-credentials/)
curl -s -H "X-aws-ec2-metadata-token: $TOKEN" \\
  "http://169.254.169.254/latest/meta-data/iam/security-credentials/$ROLE"
# {"AccessKeyId":"ASIA...","SecretAccessKey":"...","Token":"...","Expiration":"..."}

# ---------- Enforce IMDSv2 + hop limit 1 ----------
aws ec2 modify-instance-metadata-options --instance-id i-0abc123 \\
  --http-tokens required --http-put-response-hop-limit 1 --http-endpoint enabled

# Account-level default, so new instances are safe automatically
aws ec2 modify-instance-metadata-defaults \\
  --http-tokens required --http-put-response-hop-limit 1

# Find stragglers
aws ec2 describe-instances \\
  --query 'Reservations[].Instances[?MetadataOptions.HttpTokens==\`optional\`].InstanceId' \\
  --output text

# ---------- SCP: no instance may launch without IMDSv2 ----------
{ "Effect":"Deny","Action":"ec2:RunInstances","Resource":"arn:aws:ec2:*:*:instance/*",
  "Condition":{"StringNotEquals":{"ec2:MetadataHttpTokens":"required"}} }

# ---------- Safe PassRole for launching ----------
{
  "Version":"2012-10-17",
  "Statement":[
    { "Effect":"Allow","Action":["ec2:RunInstances","ec2:AssociateIamInstanceProfile"],
      "Resource":"*" },
    { "Effect":"Allow","Action":"iam:PassRole",
      "Resource":"arn:aws:iam::111122223333:role/app-*",
      "Condition":{"StringEquals":{"iam:PassedToService":"ec2.amazonaws.com"}} }
  ]
}

# ---------- SSH keys replaced by IAM ----------
aws ssm start-session --target i-0abc123
# Access is an IAM decision, logged in CloudTrail, no inbound port 22, no key sprawl.

# ---------- Verify the instance's identity ----------
aws sts get-caller-identity
# arn:aws:sts::111122223333:assumed-role/app-server-role/i-0abc123def`,
          ],
          questions: [
            {
              question: "How does an application on EC2 get AWS credentials?",
              solution: "<p>Through an <strong>instance profile</strong> — a container holding exactly one IAM role, whose trust policy names <code>ec2.amazonaws.com</code>. The instance obtains <strong>temporary credentials</strong> from the <strong>Instance Metadata Service</strong> at <code>169.254.169.254/latest/meta-data/iam/security-credentials/&lt;role&gt;</code>, and every AWS SDK checks that path automatically as part of its default credential chain, refreshing well before expiry. Nothing is stored on disk, nothing is in the AMI or the repo, and nothing needs rotating — which is why a hardcoded access key on an instance is always a defect, never a shortcut.</p>",
            },
            {
              question: "What is the difference between an IAM role and an instance profile?",
              solution: "<p>The <strong>role</strong> carries the trust policy and permissions. The <strong>instance profile</strong> is a separate IAM object that acts as a container holding <strong>exactly one role</strong>, and it is the profile — not the role — that you attach to an EC2 instance. The console hides this by creating a profile with the same name automatically, which is why people hit confusing errors when creating roles through the CLI or Terraform and forgetting <code>create-instance-profile</code> and <code>add-role-to-instance-profile</code>. Only EC2 uses this indirection; Lambda, ECS and others reference roles directly.</p>",
            },
            {
              question: "Why require IMDSv2, and what does hop limit 1 achieve?",
              solution: "<p><strong>IMDSv1</strong> returned credentials to any plain <code>GET</code> of <code>169.254.169.254</code>, so an application with a <strong>server-side request forgery</strong> flaw could be coerced into fetching and leaking them — the mechanism behind the <strong>Capital One breach</strong>. <strong>IMDSv2</strong> requires a <code>PUT</code> to obtain a session token plus that token as a header on every request, which typical SSRF primitives cannot do. Setting <code>--http-put-response-hop-limit 1</code> means the response TTL expires after a single network hop, so <strong>containers</strong> on the instance or a forwarding proxy cannot reach IMDS and inherit the node's role — forcing per-workload identities via task roles or IRSA instead.</p>",
            },
            {
              question: "How can ec2:RunInstances lead to privilege escalation?",
              solution: "<p>If the caller also has <strong><code>iam:PassRole</code> on <code>*</code></strong>, they can launch an instance with the account's most privileged instance profile and then simply read that role's credentials from IMDS — arbitrary code execution as admin. The defence is to scope <code>iam:PassRole</code> to specific role ARNs and add the condition <code>\"iam:PassedToService\": \"ec2.amazonaws.com\"</code> so those roles cannot be handed to other services, and to restrict <code>ec2:RunInstances</code> itself with conditions on instance type, region and required tags. The general rule: any permission that lets you run code as another identity is effectively admin.</p>",
            },
            {
              question: "How do you replace SSH key management with IAM?",
              solution: "<p>Use <strong>AWS Systems Manager Session Manager</strong>. The instance runs the SSM agent and has an instance profile with <code>AmazonSSMManagedInstanceCore</code>; a human's ability to connect becomes a plain IAM decision (<code>ssm:StartSession</code>, scopable by instance tag). That means <strong>no inbound port 22</strong>, no bastion host, no SSH keys to distribute or revoke, sessions logged in CloudTrail and optionally recorded to S3 or CloudWatch Logs, and offboarding handled by removing an IAM permission rather than hunting for authorized_keys entries.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html",
            "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html",
            "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html",
          ],
        },
        {
          topic: "Lambda — Execution Role, Trust Policy & Resource Policy",
          tags: ["aws", "iam", "lambda", "execution role", "trust policy", "resource policy", "serverless"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Lambda has <strong>two</strong> IAM-related policies pointing in opposite directions, and knowing both is the standard serverless interview check: the <strong>execution role</strong> (what the function may do) and the <strong>resource-based policy</strong> (who may invoke the function).
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The execution role — outbound</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Its <strong>trust policy</strong> names <code>lambda.amazonaws.com</code> as the service principal with <code>sts:AssumeRole</code>. Without that, the function cannot even be created.</li>
  <li>Its <strong>permissions policies</strong> grant what your code calls — DynamoDB, S3, SQS, another API.</li>
  <li>Every function needs <strong><code>AWSLambdaBasicExecutionRole</code></strong> or equivalent, which grants <code>logs:CreateLogGroup</code>, <code>logs:CreateLogStream</code> and <code>logs:PutLogEvents</code>. A function with no logs at all is almost always missing this — the code runs, but you cannot see anything.</li>
  <li><strong>VPC-attached functions</strong> additionally need <code>ec2:CreateNetworkInterface</code>, <code>DescribeNetworkInterfaces</code> and <code>DeleteNetworkInterface</code> (the <code>AWSLambdaVPCAccessExecutionRole</code> managed policy). Missing this produces a function that times out at creation or cold start with an opaque ENI error.</li>
  <li><strong>Poll-based event sources</strong> invert the direction: for SQS, Kinesis, DynamoDB Streams, Kafka and MQ, <em>Lambda polls on your behalf using the execution role</em>, so the role needs <code>sqs:ReceiveMessage</code>, <code>DeleteMessage</code>, <code>GetQueueAttributes</code> (or the Kinesis/Streams equivalents) — not a resource policy.</li>
  <li>Credentials arrive as environment variables and the runtime refreshes them; the SDK picks them up with no configuration.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The resource-based policy — inbound</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Attached to the function, it says <strong>who may invoke it</strong>. Managed with <code>aws lambda add-permission</code> rather than by hand.</li>
  <li>This is how <strong>push-based</strong> sources are wired: API Gateway, S3 events, EventBridge, SNS, ALB, CloudFront, and cross-account callers.</li>
  <li>Always include <code>--source-arn</code> (and <code>--source-account</code> for S3) — otherwise <em>any</em> bucket or rule in <em>any</em> account belonging to that service can invoke your function. That is the <strong>confused deputy</strong> problem in its service-to-service form, and the conditions map to <code>aws:SourceArn</code> and <code>aws:SourceAccount</code>.</li>
  <li>The mental shortcut: <strong>push sources need a resource policy; poll sources need execution-role permissions.</strong></li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Other IAM touchpoints</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Environment variable encryption</strong> — if you use a customer-managed KMS key, the execution role needs <code>kms:Decrypt</code> on it.</li>
  <li><strong>Secrets</strong> — grant <code>secretsmanager:GetSecretValue</code> on the specific secret ARN rather than pasting values into environment variables, which are visible to anyone with <code>lambda:GetFunctionConfiguration</code>.</li>
  <li><strong><code>iam:PassRole</code></strong> is required to <em>create or update</em> a function with a given execution role. <code>lambda:CreateFunction</code> plus <code>iam:PassRole</code> on <code>*</code> is a full escalation path to admin.</li>
  <li><strong><code>lambda:UpdateFunctionCode</code></strong> on a function with a privileged role is escalation too — replace the code, inherit the role. Treat it as a sensitive permission.</li>
  <li><strong>One role per function.</strong> A shared role across a serverless application gives every function the union of every function's permissions, which is how a minor function ends up able to delete a production table.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Lambda has two policies facing opposite ways. The execution role's trust policy names lambda.amazonaws.com and its permission policies grant what the code calls, always including the basic execution role for CloudWatch Logs, plus ENI permissions if it's VPC-attached. The function's resource-based policy says who may invoke it — that's how API Gateway, S3 and EventBridge are wired, and you must set source-arn or any bucket in any account could invoke you. Push sources need the resource policy; poll sources like SQS and Kinesis need execution-role permissions instead. And I give every function its own role, because a shared role means every function has everyone's permissions."</div>
</div>`,
          examples: [
            `# ---------- Execution role: trust + permissions ----------
cat > trust.json <<'EOF'
{ "Version":"2012-10-17","Statement":[{
  "Effect":"Allow","Principal":{"Service":"lambda.amazonaws.com"},"Action":"sts:AssumeRole"}]}
EOF
aws iam create-role --role-name orders-fn-role --assume-role-policy-document file://trust.json

# ALWAYS: logs. A function with no logs is usually missing exactly this.
aws iam attach-role-policy --role-name orders-fn-role \\
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole

# VPC-attached functions also need ENI permissions
aws iam attach-role-policy --role-name orders-fn-role \\
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole

# What the code actually calls — scoped
aws iam put-role-policy --role-name orders-fn-role --policy-name AppAccess \\
  --policy-document '{"Version":"2012-10-17","Statement":[
    {"Effect":"Allow","Action":["dynamodb:GetItem","dynamodb:PutItem","dynamodb:Query"],
     "Resource":"arn:aws:dynamodb:eu-west-1:111122223333:table/Orders"},
    {"Effect":"Allow","Action":"secretsmanager:GetSecretValue",
     "Resource":"arn:aws:secretsmanager:eu-west-1:111122223333:secret:prod/db-*"},
    {"Effect":"Allow","Action":"kms:Decrypt",
     "Resource":"arn:aws:kms:eu-west-1:111122223333:key/1234abcd-..."}]}'

# ---------- Resource policy: who may INVOKE (push sources) ----------
# API Gateway — pin the API, not just the service
aws lambda add-permission --function-name orders \\
  --statement-id apigw --action lambda:InvokeFunction \\
  --principal apigateway.amazonaws.com \\
  --source-arn "arn:aws:execute-api:eu-west-1:111122223333:abc123/*/POST/orders"

# S3 — needs BOTH source-arn and source-account
aws lambda add-permission --function-name orders \\
  --statement-id s3-uploads --action lambda:InvokeFunction \\
  --principal s3.amazonaws.com \\
  --source-arn arn:aws:s3:::uploads-bucket \\
  --source-account 111122223333

# ❌ Without --source-arn, ANY bucket in ANY account can invoke your function.

# EventBridge
aws lambda add-permission --function-name orders \\
  --statement-id eventbridge --action lambda:InvokeFunction \\
  --principal events.amazonaws.com \\
  --source-arn arn:aws:events:eu-west-1:111122223333:rule/nightly

# Cross-account invoke
aws lambda add-permission --function-name orders \\
  --statement-id partner --action lambda:InvokeFunction \\
  --principal 444455556666

aws lambda get-policy --function-name orders --query Policy --output text | jq .

# ---------- POLL sources: execution role, NOT a resource policy ----------
# SQS trigger -> Lambda polls using the EXECUTION ROLE
{ "Effect":"Allow",
  "Action":["sqs:ReceiveMessage","sqs:DeleteMessage","sqs:GetQueueAttributes"],
  "Resource":"arn:aws:sqs:eu-west-1:111122223333:orders-queue" }
# Same shape for Kinesis / DynamoDB Streams / MSK.

# ---------- Safe deploy permissions (PassRole is the escalation risk) ----------
{
  "Version":"2012-10-17",
  "Statement":[
    { "Effect":"Allow",
      "Action":["lambda:CreateFunction","lambda:UpdateFunctionCode","lambda:UpdateFunctionConfiguration"],
      "Resource":"arn:aws:lambda:eu-west-1:111122223333:function:orders-*" },
    { "Effect":"Allow","Action":"iam:PassRole",
      "Resource":"arn:aws:iam::111122223333:role/service-role/orders-fn-*",
      "Condition":{"StringEquals":{"iam:PassedToService":"lambda.amazonaws.com"}} }
  ]
}

# ---------- Inside the function, credentials are just there ----------
# import boto3
# ddb = boto3.client("dynamodb")   # execution role creds, auto-refreshed
aws sts get-caller-identity
# arn:aws:sts::111122223333:assumed-role/orders-fn-role/orders`,
          ],
          questions: [
            {
              question: "What is a Lambda execution role and what must its trust policy say?",
              solution: "<p>The <strong>execution role</strong> is the identity the function assumes while running — it determines what the code may call. Its <strong>trust policy</strong> must name the service principal <code>lambda.amazonaws.com</code> with <code>sts:AssumeRole</code>; without that, the function cannot be created. Its <strong>permissions policies</strong> grant what the code needs, and should always include <code>AWSLambdaBasicExecutionRole</code> for <code>logs:CreateLogGroup</code>, <code>CreateLogStream</code> and <code>PutLogEvents</code> — a function producing no CloudWatch logs at all is nearly always missing exactly that. VPC-attached functions additionally need the ENI permissions from <code>AWSLambdaVPCAccessExecutionRole</code>.</p>",
            },
            {
              question: "What's the difference between a Lambda execution role and its resource-based policy?",
              solution: "<p>They face opposite directions. The <strong>execution role</strong> is <em>outbound</em> — what the function may do to other AWS services. The <strong>resource-based policy</strong> is <em>inbound</em> — who may <strong>invoke</strong> the function, managed with <code>lambda add-permission</code>. API Gateway, S3 events, EventBridge, SNS, ALB and cross-account callers are all wired through the resource policy. The shortcut worth memorising: <strong>push sources need a resource policy; poll sources need execution-role permissions</strong> — because for SQS, Kinesis, DynamoDB Streams and Kafka, Lambda polls on your behalf using the execution role.</p>",
            },
            {
              question: "You add an S3 trigger with lambda add-permission but omit --source-arn. What's the risk?",
              solution: "<p>The policy then allows the <em>entire S3 service principal</em> to invoke your function, meaning <strong>any bucket in any AWS account</strong> can trigger it — an attacker creates a bucket in their own account, points an event notification at your function ARN, and drives your code with data they control. This is the <strong>confused deputy</strong> problem in service-to-service form. Always pass <code>--source-arn</code> (which becomes an <code>aws:SourceArn</code> condition) and, for S3 specifically, <code>--source-account</code> too — because bucket names are global and a bucket ARN alone does not identify the owning account.</p>",
            },
            {
              question: "Your Lambda reads from an SQS queue. Where do the permissions go?",
              solution: "<p>On the <strong>execution role</strong>, not a resource policy — SQS is a <strong>poll-based</strong> event source, so the Lambda service polls the queue <em>using your execution role's credentials</em> and then invokes your function. The role needs <code>sqs:ReceiveMessage</code>, <code>sqs:DeleteMessage</code> and <code>sqs:GetQueueAttributes</code> on the queue ARN. The same applies to Kinesis, DynamoDB Streams, Amazon MQ and MSK. This catches people out because the intuition 'something else is calling my function, so it must need a resource policy' is exactly backwards for poll sources.</p>",
            },
            {
              question: "Why is lambda:UpdateFunctionCode a sensitive permission?",
              solution: "<p>Because the function keeps its <strong>execution role</strong> when the code changes. Anyone who can update the code of a function with a privileged role can <strong>run arbitrary code as that role</strong> — a straightforward privilege escalation that needs no <code>iam:PassRole</code> at all. The same logic makes <code>lambda:CreateFunction</code> plus <code>iam:PassRole</code> on <code>*</code> a path to admin. Mitigations: scope deploy permissions to specific function ARN prefixes, scope <code>iam:PassRole</code> with <code>iam:PassedToService</code>, give each function its own least-privilege role, and alert on code updates to functions holding sensitive roles.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/lambda/latest/dg/lambda-intro-execution-role.html",
            "https://docs.aws.amazon.com/lambda/latest/dg/access-control-resource-based.html",
            "https://docs.aws.amazon.com/lambda/latest/dg/lambda-permissions.html",
          ],
        },
        {
          topic: "S3 — Bucket Policy + IAM Policy Evaluated Together",
          tags: ["aws", "iam", "s3", "bucket policy", "cross-account", "block public access", "kms"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  S3 is the service where the identity-policy / resource-policy interaction is most often tested, because a bucket has its own policy and the caller has their own policy and <strong>both are evaluated in the same decision</strong>. Get the OR/AND rule right and most S3 questions collapse into arithmetic.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The rule</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Same account:</strong> an Allow in <em>either</em> the IAM policy <em>or</em> the bucket policy is sufficient. <strong>OR.</strong></li>
  <li><strong>Cross account:</strong> you need an Allow in <em>both</em> — the caller's account must permit the call and the bucket's account must permit the caller. <strong>AND.</strong></li>
  <li><strong>An explicit Deny in either wins, always.</strong> That is the single most-asked S3 IAM question.</li>
  <li>Layered above: <strong>Block Public Access</strong>, <strong>SCPs/RCPs</strong>, and <strong>VPC endpoint policies</strong> — each of which can deny regardless of the two policies above.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Bucket ARN vs object ARN</h4>
<p style="line-height: 1.75;">The most common S3 policy bug in existence. <code>arn:aws:s3:::my-bucket</code> and <code>arn:aws:s3:::my-bucket/*</code> are <strong>different resources</strong>:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Bucket-level actions</strong> — <code>s3:ListBucket</code>, <code>s3:GetBucketLocation</code>, <code>s3:PutBucketPolicy</code> — take the <strong>bucket</strong> ARN.</li>
  <li><strong>Object-level actions</strong> — <code>s3:GetObject</code>, <code>s3:PutObject</code>, <code>s3:DeleteObject</code> — take the <strong><code>/*</code></strong> form.</li>
  <li>Almost every working policy needs <strong>both, in separate statements</strong>. And note that <code>s3:ListBucket</code> without an <code>s3:prefix</code> condition lets someone enumerate <em>every key name</em> in the bucket even if they cannot read the objects — key names leak plenty.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Block Public Access — the override above everything</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Four settings, at bucket and account level, that <strong>override any policy</strong>: block new public ACLs, ignore existing public ACLs, block new public bucket policies, restrict public buckets to same-account principals.</li>
  <li><strong>Enable all four at the account level</strong>. It is on by default for new buckets. If you genuinely need public content, serve it through <strong>CloudFront with Origin Access Control</strong> rather than a public bucket.</li>
  <li><strong>ACLs are legacy.</strong> Set <strong>Object Ownership = Bucket owner enforced</strong> to disable them entirely — this also fixes the old cross-account problem where objects written by another account stayed owned by that account and were unreadable by the bucket owner.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The cross-account sharing scenario, done properly</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Bucket policy in B allows A's <strong>role ARN</strong> the specific actions on both bucket and object ARNs.</li>
  <li>A's identity policy allows the same actions on the same ARNs.</li>
  <li>If objects are <strong>SSE-KMS</strong> encrypted with a customer-managed key, the <strong>KMS key policy</strong> must also grant A <code>kms:Decrypt</code> (and <code>kms:GenerateDataKey</code> for writes). Cross-account S3 that works for plain objects and fails for encrypted ones is <em>always</em> this.</li>
  <li>Set <strong>Bucket owner enforced</strong> so B owns everything A writes.</li>
  <li>Constrain with conditions: <code>aws:PrincipalOrgID</code>, <code>aws:SecureTransport</code>, <code>aws:SourceVpce</code>.</li>
  <li>The alternative to a bucket policy is a <strong>role in B that A assumes</strong> — better when you want session-level control, MFA conditions or session tags.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Baseline conditions worth having on every bucket</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><code>aws:SecureTransport = false</code> → Deny (force TLS).</li>
  <li><code>s3:x-amz-server-side-encryption</code> → require KMS on upload.</li>
  <li><code>aws:PrincipalOrgID</code> → keep access inside the organisation.</li>
  <li><code>s3:prefix</code> on <code>ListBucket</code> → stop key-name enumeration.</li>
  <li>Consider <strong>S3 Access Points</strong> to give each consumer its own named endpoint and policy instead of growing one enormous bucket policy toward the 20 KB limit.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "S3 evaluates the caller's IAM policy and the bucket policy in one decision. Same account, an Allow in either is enough; cross-account, you need both; and an explicit Deny in either always wins. The classic bug is ARN shape — ListBucket takes the bucket ARN while GetObject takes bucket/*, so most policies need both statements. For cross-account sharing I allow the specific role in the bucket policy, mirror it in the caller's policy, remember the KMS key policy if objects are SSE-KMS, and set Bucket owner enforced. Above all of that, Block Public Access overrides any policy, and I keep all four settings on at the account level."</div>
</div>`,
          examples: [
            `# ---------- The ARN trap ----------
# ❌ ListBucket against an object ARN never matches
{ "Effect":"Allow","Action":["s3:ListBucket","s3:GetObject"],"Resource":"arn:aws:s3:::my-bucket/*" }

# ✅ two statements, two ARN shapes, prefix-scoped listing
{
  "Version":"2012-10-17",
  "Statement":[
    { "Sid":"ListOnlyMyPrefix","Effect":"Allow","Action":"s3:ListBucket",
      "Resource":"arn:aws:s3:::my-bucket",
      "Condition":{"StringLike":{"s3:prefix":["payments/*"]}} },
    { "Sid":"ReadWriteMyPrefix","Effect":"Allow",
      "Action":["s3:GetObject","s3:PutObject","s3:DeleteObject"],
      "Resource":"arn:aws:s3:::my-bucket/payments/*" }
  ]
}

# ---------- Cross-account sharing: BOTH sides ----------
# Account B (owner) — bucket policy
{
  "Version":"2012-10-17",
  "Statement":[{
    "Sid":"AllowAccountAReader","Effect":"Allow",
    "Principal":{"AWS":"arn:aws:iam::111122223333:role/reader"},
    "Action":["s3:GetObject","s3:ListBucket"],
    "Resource":["arn:aws:s3:::b-data","arn:aws:s3:::b-data/*"],
    "Condition":{"Bool":{"aws:SecureTransport":"true"},
                 "StringEquals":{"aws:PrincipalOrgID":"o-abc123xyz"}}
  }]
}
# Account A (caller) — identity policy (REQUIRED too)
{ "Effect":"Allow","Action":["s3:GetObject","s3:ListBucket"],
  "Resource":["arn:aws:s3:::b-data","arn:aws:s3:::b-data/*"] }

# ...and if SSE-KMS with a CMK, the KEY POLICY as well:
{ "Effect":"Allow","Principal":{"AWS":"arn:aws:iam::111122223333:role/reader"},
  "Action":["kms:Decrypt","kms:DescribeKey"],"Resource":"*" }
# This is why "works for some objects, fails for others" is almost always KMS.

# ---------- Baseline bucket policy every bucket should have ----------
{
  "Version":"2012-10-17",
  "Statement":[
    { "Sid":"DenyInsecureTransport","Effect":"Deny","Principal":"*","Action":"s3:*",
      "Resource":["arn:aws:s3:::b-data","arn:aws:s3:::b-data/*"],
      "Condition":{"Bool":{"aws:SecureTransport":"false"}} },
    { "Sid":"RequireKmsOnUpload","Effect":"Deny","Principal":"*","Action":"s3:PutObject",
      "Resource":"arn:aws:s3:::b-data/*",
      "Condition":{"StringNotEquals":{"s3:x-amz-server-side-encryption":"aws:kms"}} },
    { "Sid":"OrgOnly","Effect":"Deny","Principal":"*","Action":"s3:*",
      "Resource":["arn:aws:s3:::b-data","arn:aws:s3:::b-data/*"],
      "Condition":{"StringNotEqualsIfExists":{"aws:PrincipalOrgID":"o-abc123xyz"},
                   "BoolIfExists":{"aws:PrincipalIsAWSService":"false"}} }
  ]
}

# ---------- Block Public Access overrides EVERY policy ----------
aws s3api put-public-access-block --bucket b-data \\
  --public-access-block-configuration \\
  BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true

# Account-wide (do this)
aws s3control put-public-access-block --account-id 111122223333 \\
  --public-access-block-configuration \\
  BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true

# ---------- Kill ACLs; bucket owner owns everything ----------
aws s3api put-bucket-ownership-controls --bucket b-data \\
  --ownership-controls 'Rules=[{ObjectOwnership=BucketOwnerEnforced}]'

# ---------- Scenario answers ----------
# same acct: IAM silent, bucket policy allows      -> ALLOWED (OR)
# cross acct: IAM silent, bucket policy allows     -> DENIED  (AND)
# either side has explicit Deny                    -> DENIED  (always)
# Block Public Access on, bucket policy is public  -> DENIED  (override)`,
          ],
          questions: [
            {
              question: "How are an S3 bucket policy and an IAM policy evaluated together?",
              solution: "<p>Both are collected into one decision. <strong>Same account:</strong> an Allow in <em>either</em> is sufficient — they are OR'd, because one administrator controls both sides. <strong>Cross account:</strong> you need an Allow in <em>both</em> — the caller's account must permit the call and the bucket's account must permit the caller. And in every case an <strong>explicit Deny in either policy wins</strong> and cannot be overridden. On top sit Block Public Access, SCPs/RCPs and VPC endpoint policies, each of which can deny regardless of what those two policies say.</p>",
            },
            {
              question: "Why does a policy granting s3:ListBucket on arn:aws:s3:::my-bucket/* not work?",
              solution: "<p>Because <code>s3:ListBucket</code> is a <strong>bucket-level</strong> action whose resource is the bucket ARN <code>arn:aws:s3:::my-bucket</code> with no trailing <code>/*</code>; the <code>/*</code> form addresses <strong>objects</strong> and belongs to <code>GetObject</code>, <code>PutObject</code> and friends. Real policies therefore need <strong>both ARNs in separate statements</strong>. Add an <code>s3:prefix</code> condition to the ListBucket statement too — without it, a user who cannot read any object can still enumerate every key name in the bucket, and key names frequently leak customer identifiers and business information.</p>",
            },
            {
              question: "Cross-account S3 access works for some objects and fails for others. Diagnose it.",
              solution: "<p><strong>SSE-KMS with a customer-managed key.</strong> The bucket policy and the caller's IAM policy both allow the S3 action, so unencrypted or SSE-S3 objects read fine, but KMS-encrypted ones fail because the <strong>KMS key policy</strong> does not grant the foreign principal <code>kms:Decrypt</code>. KMS is special: the key policy must always grant, an identity policy alone never suffices. Grant <code>kms:Decrypt</code> and <code>kms:DescribeKey</code> (plus <code>kms:GenerateDataKey</code> for writes) in the key policy. The second candidate is <strong>object ownership</strong> — objects written by another account historically stayed owned by that account, fixed by setting <strong>Bucket owner enforced</strong>.</p>",
            },
            {
              question: "What is S3 Block Public Access and how does it interact with policies?",
              solution: "<p>Four settings — block new public ACLs, ignore existing public ACLs, block new public bucket policies, restrict public buckets to same-account principals — available at both bucket and account level. They <strong>override any policy</strong>: a bucket policy granting <code>\"Principal\": \"*\"</code> simply does not take effect. Enable <strong>all four at the account level</strong>; it is on by default for new buckets. If you genuinely need public content, serve it through <strong>CloudFront with Origin Access Control</strong> so the bucket stays private and you keep caching, WAF and logging in front of it.</p>",
            },
            {
              question: "When would you use a bucket policy versus a role the other account assumes?",
              solution: "<p>Use a <strong>bucket policy</strong> for straightforward data-plane sharing: the foreign principal uses its own credentials, there is no extra STS round trip, and it avoids the one-hour role-chaining cap. Use an <strong>assumable role</strong> when you want session-level control — MFA conditions, session policies to narrow a given session, session tags for ABAC, a meaningful session name in CloudTrail, or access to things beyond one bucket. Either way, pair with <strong>Access Analyzer external-access findings</strong> and an organisation <strong>RCP</strong>, because a bucket policy lets the resource owner grant access unilaterally and silently.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-policy-language-overview.html",
            "https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html",
            "https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-walkthroughs-managing-access-example2.html",
          ],
        },
        {
          topic: "DynamoDB — Resource Policies, IAM Roles & Fine-Grained Access",
          tags: ["aws", "iam", "dynamodb", "resource policy", "cross-account", "leading keys", "fine-grained"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  DynamoDB is the classic "which services support resource-based policies?" question — <strong>and the correct answer changed</strong>. It is worth knowing both the historical answer (which many interviewers still expect) and the current one, because saying both is what makes you look current rather than contrarian.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The old answer, and the new one</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Historically (pre-2024):</strong> DynamoDB had <strong>no resource-based policies</strong>. There was no "table policy" the way there is a bucket policy, so <strong>all</strong> access control was identity-based, and cross-account access <em>had</em> to go through an assumed IAM role in the table's account. This is the "classic gotcha" answer.</li>
  <li><strong>Since March 2024:</strong> DynamoDB <strong>does</strong> support <strong>resource-based policies</strong> on tables, indexes and streams, so you can now grant a principal in another account direct access with a table policy — the same identity-policy-OR-resource-policy evaluation as S3.</li>
  <li><strong>How to answer:</strong> state the current capability, then note that <strong>role assumption remains the more common and often preferred pattern</strong> — it gives session-level control, session policies, MFA conditions and a meaningful session name in CloudTrail, and it is what most existing codebases do. If the interviewer is working from older material, you have demonstrated the exact knowledge they were testing plus an update.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Which services do and don't have resource policies</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Do:</strong> S3, SQS, SNS, KMS, Lambda, Secrets Manager, ECR, EFS, API Gateway, EventBridge, CodeArtifact, Glue, OpenSearch, IAM role trust policies, CloudWatch Logs (limited), and now DynamoDB.</li>
  <li><strong>Don't:</strong> EC2, RDS (the database itself), Auto Scaling, CloudFront, and most control-plane-only services. For those, <strong>cross-account access is only possible by assuming a role</strong> in the owning account — which is the general rule to state when you are unsure about a specific service.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Fine-grained access control — the genuinely special part</h4>
<p style="line-height: 1.75;">DynamoDB supports <strong>item-level and attribute-level</strong> authorization through condition keys, which very few services do:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong><code>dynamodb:LeadingKeys</code></strong> — restrict a principal to items whose <strong>partition key</strong> matches something about them, typically <code>\${www.amazon.com:user_id}</code> for a federated web identity or <code>\${aws:PrincipalTag/tenant}</code>. This is how a multi-tenant application enforces tenant isolation <em>in IAM</em> rather than trusting application code.</li>
  <li><strong><code>dynamodb:Attributes</code></strong> with <code>ForAllValues:StringEquals</code> — restrict which <strong>attributes</strong> may be read or written, so a role can see <code>orderId</code> and <code>status</code> but never <code>creditCardToken</code>.</li>
  <li><strong><code>dynamodb:Select</code></strong> — force <code>SPECIFIC_ATTRIBUTES</code> so a caller cannot simply request all attributes and bypass the restriction.</li>
  <li><strong><code>dynamodb:ReturnValues</code></strong> — prevent a write from returning the old item, which would otherwise leak attributes the caller cannot read.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Everyday details worth knowing</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Indexes are separate resources</strong>: <code>arn:aws:dynamodb:…:table/Orders/index/by-customer</code>. A policy granting <code>dynamodb:Query</code> only on the table ARN fails when the code queries a GSI — a very common and confusing error.</li>
  <li><strong>Streams are separate too</strong>: <code>…:table/Orders/stream/2026-09-14T…</code>, with their own actions (<code>GetRecords</code>, <code>GetShardIterator</code>, <code>DescribeStream</code>, <code>ListStreams</code>).</li>
  <li><strong>PartiQL</strong> has its own actions — <code>dynamodb:PartiQLSelect</code>, <code>PartiQLInsert</code>, <code>PartiQLUpdate</code>, <code>PartiQLDelete</code> — so a policy listing only the classic operations silently blocks (or fails to block) PartiQL usage.</li>
  <li><strong>Encryption</strong>: with a customer-managed KMS key, the caller also needs <code>kms:Decrypt</code> and <code>kms:GenerateDataKey</code> on that key.</li>
  <li><strong>Grant per operation</strong> — <code>GetItem</code>, <code>Query</code>, <code>PutItem</code> — not <code>dynamodb:*</code>, which includes <code>DeleteTable</code> and <code>UpdateTable</code>.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Historically DynamoDB had no resource-based policies, so cross-account access had to go through an assumed role in the table's account — that's the classic gotcha. Since 2024 it does support resource-based policies on tables, indexes and streams, so a table policy can grant another account directly; but role assumption is still the more common pattern because it gives session policies, MFA conditions and a session name in CloudTrail. What's genuinely distinctive about DynamoDB is fine-grained access control — dynamodb:LeadingKeys restricts a principal to items whose partition key matches their identity, which is how you enforce multi-tenant isolation in IAM instead of trusting application code."</div>
</div>`,
          examples: [
            `# ---------- Least-privilege table access (note the INDEX ARN) ----------
{
  "Version":"2012-10-17",
  "Statement":[{
    "Effect":"Allow",
    "Action":["dynamodb:GetItem","dynamodb:Query","dynamodb:PutItem","dynamodb:UpdateItem"],
    "Resource":[
      "arn:aws:dynamodb:eu-west-1:111122223333:table/Orders",
      "arn:aws:dynamodb:eu-west-1:111122223333:table/Orders/index/*"
    ]
  }]
}
# ❌ Omit the /index/* ARN and every GSI query fails with AccessDenied.

# ---------- Fine-grained: a tenant can only touch its own items ----------
{
  "Effect":"Allow",
  "Action":["dynamodb:GetItem","dynamodb:Query","dynamodb:PutItem","dynamodb:UpdateItem"],
  "Resource":"arn:aws:dynamodb:eu-west-1:111122223333:table/UserData",
  "Condition":{
    "ForAllValues:StringEquals":{
      "dynamodb:LeadingKeys":["\${aws:PrincipalTag/tenant}"],
      "dynamodb:Attributes":["userId","profile","preferences","updatedAt"]
    },
    "StringEqualsIfExists":{"dynamodb:Select":"SPECIFIC_ATTRIBUTES"}
  }
}
# Tenant isolation enforced by IAM, not by hoping the app filters correctly.

# ---------- Web identity (Cognito) variant ----------
"Condition":{"ForAllValues:StringEquals":{
  "dynamodb:LeadingKeys":["\${cognito-identity.amazonaws.com:sub}"]}}

# ---------- Hide sensitive attributes ----------
{
  "Effect":"Allow","Action":["dynamodb:GetItem","dynamodb:Query"],
  "Resource":"arn:aws:dynamodb:eu-west-1:111122223333:table/Customers",
  "Condition":{
    "ForAllValues:StringEquals":{"dynamodb:Attributes":["customerId","name","status"]},
    "StringEquals":{"dynamodb:Select":"SPECIFIC_ATTRIBUTES",
                    "dynamodb:ReturnValues":"NONE"}
  }
}
# ReturnValues:NONE stops a write echoing back attributes the caller may not read.

# ---------- CROSS-ACCOUNT, the classic way: assume a role ----------
# Account B: role trusting A, with the table policy above
# Account A: sts:AssumeRole on that role
aws sts assume-role --role-arn arn:aws:iam::222233334444:role/orders-reader \\
  --role-session-name report-job
# Works for EVERY service, including those with no resource policy.

# ---------- CROSS-ACCOUNT, the newer way: a table resource policy ----------
aws dynamodb put-resource-policy \\
  --resource-arn arn:aws:dynamodb:eu-west-1:222233334444:table/Orders \\
  --policy '{"Version":"2012-10-17","Statement":[{
    "Effect":"Allow",
    "Principal":{"AWS":"arn:aws:iam::111122223333:role/reader"},
    "Action":["dynamodb:GetItem","dynamodb:Query"],
    "Resource":"arn:aws:dynamodb:eu-west-1:222233334444:table/Orders"}]}'
aws dynamodb get-resource-policy \\
  --resource-arn arn:aws:dynamodb:eu-west-1:222233334444:table/Orders

# ---------- Streams are a separate resource with separate actions ----------
{ "Effect":"Allow",
  "Action":["dynamodb:GetRecords","dynamodb:GetShardIterator","dynamodb:DescribeStream","dynamodb:ListStreams"],
  "Resource":"arn:aws:dynamodb:eu-west-1:111122223333:table/Orders/stream/*" }

# ---------- PartiQL has its OWN actions ----------
{ "Effect":"Allow","Action":["dynamodb:PartiQLSelect"],
  "Resource":"arn:aws:dynamodb:eu-west-1:111122223333:table/Orders" }
# A policy listing only GetItem/Query does not cover PartiQL at all.

# ---------- CMK-encrypted table: KMS permissions too ----------
{ "Effect":"Allow","Action":["kms:Decrypt","kms:GenerateDataKey"],
  "Resource":"arn:aws:kms:eu-west-1:111122223333:key/1234abcd-...",
  "Condition":{"StringEquals":{"kms:ViaService":"dynamodb.eu-west-1.amazonaws.com"}} }`,
          ],
          questions: [
            {
              question: "Does DynamoDB support resource-based policies, and how does that affect cross-account access?",
              solution: "<p>It does now. <strong>Historically DynamoDB had none</strong> — there was no 'table policy', all access was identity-based, and cross-account access <em>had</em> to go through an <strong>assumed IAM role</strong> in the table's account; that is the classic gotcha many interviewers are testing. <strong>Since March 2024</strong> DynamoDB supports <strong>resource-based policies</strong> on tables, indexes and streams, so a table policy can grant a foreign principal directly, evaluated the same identity-OR-resource way as S3. In practice <strong>role assumption is still the more common pattern</strong>, because it adds session policies, MFA conditions and a meaningful session name in CloudTrail — and it works for every service, including those that still have no resource policy.</p>",
            },
            {
              question: "How do you enforce multi-tenant isolation in DynamoDB with IAM?",
              solution: "<p>With <strong><code>dynamodb:LeadingKeys</code></strong>, which restricts a principal to items whose <strong>partition key</strong> matches a value from their identity — <code>\${aws:PrincipalTag/tenant}</code> for a tagged role or <code>\${cognito-identity.amazonaws.com:sub}</code> for a federated app user — used with <code>ForAllValues:StringEquals</code>. That moves tenant isolation from 'the application remembers to filter' into IAM itself, so even a bug in the query layer cannot return another tenant's rows. Pair it with <code>dynamodb:Attributes</code> to limit which fields are readable, and <code>dynamodb:Select: SPECIFIC_ATTRIBUTES</code> plus <code>dynamodb:ReturnValues: NONE</code> so a caller cannot bypass the restriction by requesting everything or reading the pre-write image.</p>",
            },
            {
              question: "A Lambda can GetItem from a table but Query on a GSI fails. Why?",
              solution: "<p>Because a <strong>global secondary index is a separate resource</strong> with its own ARN: <code>arn:aws:dynamodb:region:account:table/Orders/index/by-customer</code>. A policy listing only the table ARN does not cover it, so the GSI query returns AccessDenied even though the same action works against the base table. Add the index ARN — commonly <code>table/Orders/index/*</code> — alongside the table ARN in the <code>Resource</code> list. <strong>Streams</strong> behave the same way (<code>table/Orders/stream/*</code> with their own <code>GetRecords</code>/<code>GetShardIterator</code> actions), which is the same surprise in a different place.</p>",
            },
            {
              question: "Which AWS services don't support resource-based policies, and what do you do about it?",
              solution: "<p><strong>EC2</strong>, <strong>RDS</strong> (the database itself), Auto Scaling, CloudFront and most control-plane-only services have none. For those, <strong>cross-account access is only possible by assuming a role</strong> in the owning account — which is the safe general answer whenever you are unsure about a specific service. Services that <em>do</em> have them include S3, SQS, SNS, KMS, Lambda, Secrets Manager, ECR, EFS, API Gateway, EventBridge, CodeArtifact, OpenSearch, IAM role trust policies and now DynamoDB. The useful framing: resource policies are an optimisation for direct data-plane sharing; <strong>AssumeRole is the universal mechanism</strong>.</p>",
            },
            {
              question: "Why avoid dynamodb:* even on a single table?",
              solution: "<p>Because it includes <strong>control-plane actions</strong>: <code>DeleteTable</code>, <code>UpdateTable</code> (which can change capacity and cost), <code>UpdateContinuousBackups</code> (disable point-in-time recovery), <code>DeleteBackup</code>, and <code>PutResourcePolicy</code> (grant another account access). An application needs only its data-plane operations — <code>GetItem</code>, <code>Query</code>, <code>PutItem</code>, <code>UpdateItem</code>, maybe <code>BatchGetItem</code> — plus the matching <strong>PartiQL</strong> actions if the code uses them, since those are separate. Listing operations explicitly also documents the access pattern, so a reviewer can see at a glance whether the function is meant to write.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/access-control-overview.html",
            "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/specifying-conditions.html",
            "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/access-control-resource-based.html",
          ],
        },
        {
          topic: "ECS & EKS — Task Role vs Execution Role vs Node Role",
          tags: ["aws", "iam", "ecs", "eks", "task role", "irsa", "pod identity", "containers"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Containers are where IAM roles multiply, and conflating them is the most common container permission bug. On ECS there are <strong>three</strong> distinct roles; on EKS the question is whether the pod has its own identity or inherits the node's.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">ECS: three roles, three jobs</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Task role</strong> (<code>taskRoleArn</code>) — the identity <strong>your application code</strong> uses. This is what the SDK inside the container picks up when it calls S3 or DynamoDB. One per application, least privilege.</li>
  <li><strong>Task execution role</strong> (<code>executionRoleArn</code>) — the identity the <strong>ECS agent</strong> uses <em>on your behalf, before and around your code</em>: pulling the image from ECR, fetching secrets referenced in the task definition from Secrets Manager or SSM, and writing container logs to CloudWatch. Usually the managed <code>AmazonECSTaskExecutionRolePolicy</code> plus specific secret ARNs.</li>
  <li><strong>Container instance role</strong> (EC2 launch type only) — the instance profile on the underlying EC2 host, letting the ECS agent register with the cluster. On <strong>Fargate</strong> this does not exist, which is one of Fargate's security advantages.</li>
</ul>
<p style="line-height: 1.75;">The diagnostic is clean: a task that <strong>fails to start</strong> with an image-pull, secret-fetch or logging error is an <strong>execution role</strong> problem; a task that starts fine and then gets <code>AccessDenied</code> from an SDK call is a <strong>task role</strong> problem.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">EKS: pod identity, not node identity</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>The <strong>node role</strong> is the EC2 instance profile on worker nodes. It needs cluster-level permissions (<code>AmazonEKSWorkerNodePolicy</code>, <code>AmazonEC2ContainerRegistryReadOnly</code>, CNI permissions) and <strong>nothing application-specific</strong>.</li>
  <li>If pods use the node role, <strong>every pod on that node gets the union of every pod's permissions</strong> — a batch job that only needs to read one bucket ends up able to write the production database because a co-located pod needed that.</li>
  <li><strong>IRSA</strong> (IAM Roles for Service Accounts) fixes it with OIDC: the cluster publishes an OIDC issuer, you register it as an IAM identity provider, and a role's trust policy allows <code>sts:AssumeRoleWithWebIdentity</code> conditioned on <code>&lt;issuer&gt;:sub = system:serviceaccount:&lt;namespace&gt;:&lt;sa-name&gt;</code>. The pod's projected service-account token is exchanged for temporary credentials.</li>
  <li><strong>EKS Pod Identity</strong> is the newer, simpler alternative: an association between a service account and a role, with no OIDC provider or per-cluster trust policy to maintain — noticeably easier when a role is used by many clusters.</li>
  <li><strong>Always set the IMDS hop limit to 1</strong> on nodes, so pods cannot reach the metadata service and grab the node role regardless of what you configured.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Two layers of authorization on EKS</h4>
<p style="line-height: 1.75;">EKS has <strong>IAM</strong> (who can call the Kubernetes API endpoint and what AWS resources a pod may touch) and <strong>Kubernetes RBAC</strong> (what an authenticated identity may do <em>inside</em> the cluster). They are separate systems joined by the <strong>EKS access entries</strong> API (or the older <code>aws-auth</code> ConfigMap), which maps an IAM principal to Kubernetes users and groups. "I have AdministratorAccess but <code>kubectl</code> says forbidden" is this boundary: IAM let you reach the API server, RBAC refused the action.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Practical guidance</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>One role <strong>per workload</strong>, never one shared role per cluster or per service.</li>
  <li>Never put credentials in environment variables or images — reference secrets by ARN in the task definition (fetched by the execution role) or read them at runtime with the task role.</li>
  <li>Scope the execution role's <code>secretsmanager:GetSecretValue</code> to the exact secret ARNs it needs.</li>
  <li><code>iam:PassRole</code> is required to register a task definition naming those roles — scope it with <code>iam:PassedToService: ecs-tasks.amazonaws.com</code>.</li>
  <li>On Fargate there is no host to compromise, which removes the node-role escalation path entirely.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "On ECS the task role is what my application code uses, and the task execution role is what the ECS agent uses on my behalf to pull the image, fetch task-definition secrets and ship logs — so a task that won't start is an execution-role problem and a task that starts then gets AccessDenied is a task-role problem. On EKS the point is per-pod identity: IRSA or EKS Pod Identity maps a Kubernetes service account to an IAM role, because if pods use the node instance role every pod on that node inherits every other pod's permissions. I set the IMDS hop limit to 1 so pods can't reach the node role anyway, and I remember EKS has two authorization layers — IAM to reach the API server, Kubernetes RBAC for what you can do inside."</div>
</div>`,
          examples: [
            `# ---------- ECS task definition: TWO different roles ----------
{
  "family": "orders",
  "taskRoleArn":      "arn:aws:iam::111122223333:role/orders-task-role",       # YOUR CODE
  "executionRoleArn": "arn:aws:iam::111122223333:role/ecsTaskExecutionRole",   # THE AGENT
  "requiresCompatibilities": ["FARGATE"],
  "containerDefinitions": [{
    "name": "app",
    "image": "111122223333.dkr.ecr.eu-west-1.amazonaws.com/orders:1.4.2",
    "secrets": [
      { "name":"DB_PASSWORD",
        "valueFrom":"arn:aws:secretsmanager:eu-west-1:111122223333:secret:prod/db-AbCdEf" }
    ],
    "logConfiguration": { "logDriver":"awslogs",
      "options": {"awslogs-group":"/ecs/orders","awslogs-region":"eu-west-1",
                  "awslogs-stream-prefix":"app"} }
  }]
}
# The "secrets" block is fetched by the EXECUTION role, before your code runs.

# ---------- Execution role: agent-side only ----------
aws iam attach-role-policy --role-name ecsTaskExecutionRole \\
  --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy
aws iam put-role-policy --role-name ecsTaskExecutionRole --policy-name ReadTaskSecrets \\
  --policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow",
    "Action":"secretsmanager:GetSecretValue",
    "Resource":"arn:aws:secretsmanager:eu-west-1:111122223333:secret:prod/db-*"}]}'

# ---------- Task role: application-side only ----------
cat > trust.json <<'EOF'
{ "Version":"2012-10-17","Statement":[{
  "Effect":"Allow","Principal":{"Service":"ecs-tasks.amazonaws.com"},
  "Action":"sts:AssumeRole",
  "Condition":{"ArnLike":{"aws:SourceArn":"arn:aws:ecs:eu-west-1:111122223333:*"},
               "StringEquals":{"aws:SourceAccount":"111122223333"}}}]}
EOF
aws iam create-role --role-name orders-task-role --assume-role-policy-document file://trust.json

# ---------- Diagnostic ----------
# task never starts, "CannotPullContainerError" / "ResourceInitializationError"
#   -> EXECUTION role
# task runs, SDK returns AccessDenied
#   -> TASK role

# ---------- EKS: IRSA ----------
ISSUER=$(aws eks describe-cluster --name prod \\
  --query 'cluster.identity.oidc.issuer' --output text | sed 's|https://||')
aws iam create-open-id-connect-provider --url "https://$ISSUER" --client-id-list sts.amazonaws.com

cat > irsa-trust.json <<EOF
{ "Version":"2012-10-17","Statement":[{
  "Effect":"Allow",
  "Principal":{"Federated":"arn:aws:iam::111122223333:oidc-provider/$ISSUER"},
  "Action":"sts:AssumeRoleWithWebIdentity",
  "Condition":{"StringEquals":{
    "$ISSUER:sub":"system:serviceaccount:payments:orders-sa",
    "$ISSUER:aud":"sts.amazonaws.com"}}}]}
EOF
aws iam create-role --role-name orders-irsa --assume-role-policy-document file://irsa-trust.json

# annotate the service account
# apiVersion: v1
# kind: ServiceAccount
# metadata:
#   name: orders-sa
#   namespace: payments
#   annotations:
#     eks.amazonaws.com/role-arn: arn:aws:iam::111122223333:role/orders-irsa

# ---------- EKS Pod Identity: simpler, no OIDC plumbing ----------
aws eks create-pod-identity-association --cluster-name prod \\
  --namespace payments --service-account orders-sa \\
  --role-arn arn:aws:iam::111122223333:role/orders-irsa

# ---------- Stop pods reaching the NODE role ----------
aws ec2 modify-instance-metadata-options --instance-id i-0node \\
  --http-tokens required --http-put-response-hop-limit 1

# ---------- EKS has a SECOND authorization layer ----------
aws eks create-access-entry --cluster-name prod \\
  --principal-arn arn:aws:iam::111122223333:role/platform-admin \\
  --type STANDARD
aws eks associate-access-policy --cluster-name prod \\
  --principal-arn arn:aws:iam::111122223333:role/platform-admin \\
  --policy-arn arn:aws:eks::aws:cluster-access-policy/AmazonEKSClusterAdminPolicy \\
  --access-scope type=cluster
# IAM gets you to the API server; Kubernetes RBAC decides what you can do there.`,
          ],
          questions: [
            {
              question: "What's the difference between an ECS task role and a task execution role?",
              solution: "<p>The <strong>task role</strong> is the identity <strong>your application code</strong> uses — what the SDK inside the container picks up to call S3, DynamoDB or anything else. The <strong>task execution role</strong> is the identity the <strong>ECS agent</strong> uses on your behalf before and around your code: pulling the image from ECR, fetching secrets referenced in the task definition from Secrets Manager or SSM, and writing container logs to CloudWatch. The diagnostic is clean — a task that <strong>fails to start</strong> (image pull, secret fetch, logging) is an execution-role problem; a task that <strong>starts and then gets AccessDenied</strong> from an SDK call is a task-role problem.</p>",
            },
            {
              question: "Why shouldn't pods on EKS use the node instance role?",
              solution: "<p>Because the node role is <strong>shared by every pod on that node</strong>, so its permissions must be the union of everything any co-located pod needs. A batch job that should only read one bucket ends up able to write the production database because some other pod required that. It also destroys attribution — CloudTrail shows the node role, not which workload acted. Use <strong>IRSA</strong> or <strong>EKS Pod Identity</strong> to map a Kubernetes service account to its own IAM role, keep the node role limited to cluster-level permissions, and set the <strong>IMDS hop limit to 1</strong> so pods cannot reach the node's credentials even if misconfigured.</p>",
            },
            {
              question: "How does IRSA actually work?",
              solution: "<p>It is <strong>OIDC federation</strong> using the cluster as the identity provider. The EKS cluster publishes an <strong>OIDC issuer URL</strong>, which you register as an IAM OIDC identity provider. A role's trust policy then allows <code>sts:AssumeRoleWithWebIdentity</code> conditioned on <code>&lt;issuer&gt;:aud = sts.amazonaws.com</code> and <code>&lt;issuer&gt;:sub = system:serviceaccount:&lt;namespace&gt;:&lt;serviceaccount&gt;</code>. Kubernetes projects a signed service-account token into the pod, the SDK exchanges it with STS, and the pod receives temporary credentials for that role. <strong>EKS Pod Identity</strong> achieves the same outcome through a simple association, with no OIDC provider or per-cluster trust-policy maintenance.</p>",
            },
            {
              question: "You have AdministratorAccess but kubectl says 'forbidden'. Explain.",
              solution: "<p>EKS has <strong>two independent authorization layers</strong>. IAM controls whether you can reach the <strong>Kubernetes API endpoint</strong> (<code>eks:DescribeCluster</code>, obtaining a token); <strong>Kubernetes RBAC</strong> controls what your identity may do <em>inside</em> the cluster. AdministratorAccess satisfies the first and says nothing about the second. The mapping between them is the <strong>EKS access entries</strong> API (or the legacy <code>aws-auth</code> ConfigMap), which associates your IAM principal with Kubernetes users and groups. Create an access entry and associate a cluster access policy — historically, the identity that created the cluster was the only one with implicit admin, which is why this bites new team members.</p>",
            },
            {
              question: "What does Fargate change about the IAM picture?",
              solution: "<p>It removes the <strong>container instance role</strong> entirely — there is no EC2 host you manage, so there is no instance profile to over-permission and no node-level credential for a compromised container to steal via IMDS. You are left with just the <strong>task role</strong> and the <strong>task execution role</strong>, which is a simpler and safer model. It also eliminates the class of bug where several unrelated tasks share a host's permissions. The trade-off is less control over the underlying host, which matters for some compliance and networking requirements but is usually a security win.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html",
            "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_execution_IAM_role.html",
            "https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html",
          ],
        },
        {
          topic: "API Gateway — IAM Authorizers, Resource Policies & the Alternatives",
          tags: ["aws", "iam", "api gateway", "sigv4", "authorizer", "cognito", "resource policy"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  API Gateway offers several authentication options and the interview question is always <em>which one, and why</em>. IAM authorization is one of four, and it is the right choice in a narrow but important set of cases.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The four options</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>IAM authorization (<code>AWS_IAM</code>)</strong> — the caller signs the request with <strong>SigV4</strong> using AWS credentials, and API Gateway evaluates their IAM policy against the <code>execute-api:Invoke</code> action on the method ARN. Best for <strong>service-to-service</strong> calls, internal tools, other AWS accounts, and anything already holding AWS credentials. No token infrastructure needed, and permissions live in IAM alongside everything else.</li>
  <li><strong>Cognito user pool authorizer</strong> — the caller presents a JWT from a Cognito user pool; API Gateway validates it natively. Best for <strong>consumer-facing applications</strong> where AWS is not the identity system.</li>
  <li><strong>Lambda authorizer</strong> (token or request based) — your own function inspects the request and returns an IAM policy document plus an optional context object. Best for <strong>custom logic</strong>: third-party OAuth, an internal token service, per-tenant rules. Cache the result with a TTL or you pay a Lambda invocation on every request.</li>
  <li><strong>API keys and usage plans</strong> — <strong>not authentication</strong>. They are for throttling and metering per consumer, and must never be treated as a security control since they travel as a plain header.</li>
</ul>
<p style="line-height: 1.75;">HTTP APIs (the v2, cheaper product) additionally support a <strong>native JWT authorizer</strong> for any OIDC provider, which removes the need for a Lambda authorizer in many cases.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">How IAM authorization works</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>The method ARN is <code>arn:aws:execute-api:&lt;region&gt;:&lt;account&gt;:&lt;api-id&gt;/&lt;stage&gt;/&lt;METHOD&gt;/&lt;resource-path&gt;</code>, and you grant <code>execute-api:Invoke</code> on it — so permissions can be as granular as a single HTTP method on a single path in a single stage.</li>
  <li>Clients must sign with SigV4: the AWS SDKs and CLI do it automatically, and browsers can via Amplify or Cognito identity pools.</li>
  <li>The caller's identity reaches the backend in <code>$context.identity.userArn</code> / <code>$context.identity.caller</code>, so your Lambda knows exactly who called without you inventing a token.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">API Gateway resource policies</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>A resource-based policy attached to the API, evaluated <strong>together with</strong> identity policies and, importantly, <strong>before</strong> authorizers run.</li>
  <li>Used for: restricting to <strong>source IP ranges</strong>, restricting to a specific <strong>VPC endpoint</strong> (the standard pattern for <code>PRIVATE</code> APIs), allowing specific <strong>AWS accounts</strong>, and denying everything outside your organisation with <code>aws:PrincipalOrgID</code>.</li>
  <li>For a <strong>private API</strong>, the resource policy conditioned on <code>aws:SourceVpce</code> is what actually enforces the privacy — creating the API as private without that policy is a common misconfiguration.</li>
  <li>Same evaluation rules as everywhere: same account is OR, cross account is AND, explicit Deny always wins.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The backend permission — separate again</h4>
<p style="line-height: 1.75;">Authorizing the <em>caller</em> is distinct from letting API Gateway <em>invoke your backend</em>. For a Lambda integration, the function needs a <strong>resource-based policy</strong> allowing <code>apigateway.amazonaws.com</code> with a <code>--source-arn</code> pinned to your API — omit the source ARN and any API in any account can invoke your function. For other integrations you give API Gateway an <strong>integration role</strong> it assumes to call the service (DynamoDB, SQS, Step Functions) directly, and that requires <code>iam:PassRole</code> when you configure it.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Choosing, out loud</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Internal / service-to-service / cross-account</strong> → <strong>IAM</strong>. The caller already has credentials; no token service to build or operate.</li>
  <li><strong>Consumer app with its own users</strong> → <strong>Cognito</strong> (or a JWT authorizer on an HTTP API).</li>
  <li><strong>Existing third-party IdP or bespoke rules</strong> → <strong>Lambda authorizer</strong>, with caching.</li>
  <li><strong>Partner rate limiting</strong> → API keys and usage plans, <em>on top of</em> real authentication.</li>
  <li><strong>Network restriction</strong> → resource policy, layered under whichever of the above you chose.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "API Gateway has four options: IAM authorization where the caller SigV4-signs and I grant execute-api:Invoke on the method ARN, a Cognito user pool authorizer for consumer apps, a Lambda authorizer for custom logic, and API keys — which are metering, not authentication. I pick IAM for service-to-service and cross-account calls because the caller already has credentials and permissions live in IAM; Cognito or a JWT authorizer for end users. Separately there's the API's resource policy for IP or VPC-endpoint restriction, which is what actually makes a private API private, and the backend permission — a Lambda resource policy with source-arn pinned, or an integration role."</div>
</div>`,
          examples: [
            `# ---------- IAM auth: grant Invoke on a specific method ----------
{
  "Version":"2012-10-17",
  "Statement":[{
    "Effect":"Allow",
    "Action":"execute-api:Invoke",
    "Resource":"arn:aws:execute-api:eu-west-1:111122223333:abc123xyz/prod/POST/orders"
  }]
}
# Granularity: api-id / stage / METHOD / path  -> one verb on one path on one stage.
# Read-only consumer:
"Resource":"arn:aws:execute-api:eu-west-1:111122223333:abc123xyz/prod/GET/*"

# Turn it on for the method
aws apigateway update-method --rest-api-id abc123xyz \\
  --resource-id r1s2t3 --http-method POST \\
  --patch-operations op=replace,path=/authorizationType,value=AWS_IAM

# ---------- Calling it (SigV4 signed) ----------
awscurl --service execute-api --region eu-west-1 \\
  -X POST https://abc123xyz.execute-api.eu-west-1.amazonaws.com/prod/orders \\
  -d '{"sku":"A1"}'
# Unsigned -> {"message":"Missing Authentication Token"}

# ---------- Resource policy: source IP restriction ----------
{
  "Version":"2012-10-17",
  "Statement":[
    { "Effect":"Allow","Principal":"*","Action":"execute-api:Invoke",
      "Resource":"arn:aws:execute-api:eu-west-1:111122223333:abc123xyz/prod/*/*" },
    { "Effect":"Deny","Principal":"*","Action":"execute-api:Invoke",
      "Resource":"arn:aws:execute-api:eu-west-1:111122223333:abc123xyz/prod/*/*",
      "Condition":{"NotIpAddress":{"aws:SourceIp":["203.0.113.0/24"]}} }
  ]
}

# ---------- PRIVATE API: the policy is what makes it private ----------
{
  "Version":"2012-10-17",
  "Statement":[{
    "Effect":"Allow","Principal":"*","Action":"execute-api:Invoke",
    "Resource":"arn:aws:execute-api:eu-west-1:111122223333:abc123xyz/*/*/*",
    "Condition":{"StringEquals":{"aws:SourceVpce":"vpce-0abc123def"}}
  }]
}
# A PRIVATE endpoint type WITHOUT this policy is a common misconfiguration.

# ---------- Org-only API ----------
{ "Effect":"Deny","Principal":"*","Action":"execute-api:Invoke","Resource":"...",
  "Condition":{"StringNotEquals":{"aws:PrincipalOrgID":"o-abc123xyz"}} }

# ---------- Letting API Gateway invoke the BACKEND (separate concern) ----------
aws lambda add-permission --function-name orders \\
  --statement-id apigw --action lambda:InvokeFunction \\
  --principal apigateway.amazonaws.com \\
  --source-arn "arn:aws:execute-api:eu-west-1:111122223333:abc123xyz/*/POST/orders"
# ❌ no --source-arn -> ANY API in ANY account can invoke your function

# ---------- Direct service integration: an integration role ----------
{ "Version":"2012-10-17","Statement":[{
  "Effect":"Allow","Principal":{"Service":"apigateway.amazonaws.com"},
  "Action":"sts:AssumeRole"}]}
# ...with permissions like dynamodb:PutItem, and iam:PassRole to configure it.

# ---------- Cognito authorizer (consumer apps) ----------
aws apigateway create-authorizer --rest-api-id abc123xyz \\
  --name CognitoAuth --type COGNITO_USER_POOLS \\
  --provider-arns arn:aws:cognito-idp:eu-west-1:111122223333:userpool/eu-west-1_AbCd \\
  --identity-source method.request.header.Authorization

# ---------- Lambda authorizer returns a policy ----------
# {
#   "principalId": "user-42",
#   "policyDocument": { "Version":"2012-10-17","Statement":[{
#       "Action":"execute-api:Invoke","Effect":"Allow",
#       "Resource":"arn:aws:execute-api:eu-west-1:111122223333:abc123xyz/prod/GET/*"}]},
#   "context": { "tenant":"acme" }
# }
# Set authorizerResultTtlInSeconds or you invoke a Lambda on every single request.

# ---------- Who called? (available to the backend) ----------
# $context.identity.userArn, $context.identity.caller, $context.identity.sourceIp`,
          ],
          questions: [
            {
              question: "What are API Gateway's authorization options and when do you pick each?",
              solution: "<p><strong>IAM (<code>AWS_IAM</code>)</strong> — the caller SigV4-signs and you grant <code>execute-api:Invoke</code> on the method ARN; best for <strong>service-to-service, internal tools and cross-account</strong>, where the caller already holds AWS credentials and you want permissions to live in IAM. <strong>Cognito user pool authorizer</strong> — validates a JWT natively; best for <strong>consumer applications</strong>. <strong>Lambda authorizer</strong> — your own function returns a policy document; best for <strong>custom logic</strong> such as a third-party OAuth provider, and you must set a cache TTL or you invoke it on every request. <strong>API keys with usage plans</strong> are <strong>metering and throttling, not authentication</strong>, and must never be the only control. HTTP APIs also offer a native JWT authorizer for any OIDC provider.</p>",
            },
            {
              question: "How granular can IAM authorization be for an API?",
              solution: "<p>Down to a <strong>single HTTP method on a single path on a single stage</strong>, because the method ARN is <code>arn:aws:execute-api:&lt;region&gt;:&lt;account&gt;:&lt;api-id&gt;/&lt;stage&gt;/&lt;METHOD&gt;/&lt;resource-path&gt;</code>. So one role can be granted <code>POST /orders</code> on <code>prod</code> while another gets <code>GET /*</code> on <code>dev</code>. The backend also receives the caller's identity in <code>$context.identity.userArn</code>, so your handler knows exactly who called without you building a token service — a real advantage of IAM auth for internal APIs.</p>",
            },
            {
              question: "What is an API Gateway resource policy for?",
              solution: "<p>It is a resource-based policy on the API, evaluated together with identity policies and <strong>before authorizers run</strong>. It is how you restrict an API to <strong>source IP ranges</strong>, to a specific <strong>VPC endpoint</strong>, to named <strong>AWS accounts</strong>, or to your organisation via <code>aws:PrincipalOrgID</code>. Critically, for an API with the <code>PRIVATE</code> endpoint type, <strong>the resource policy conditioned on <code>aws:SourceVpce</code> is what actually enforces privacy</strong> — creating a private API without one is a common misconfiguration. The usual rules apply: same account OR, cross-account AND, explicit Deny wins.</p>",
            },
            {
              question: "Are API keys a form of authentication?",
              solution: "<p><strong>No.</strong> API keys exist for <strong>usage plans</strong> — throttling and quota metering per consumer — and they travel as a plain <code>x-api-key</code> header with no signature, no expiry and no identity binding. Anyone who obtains the key can use it, and they are routinely leaked in client-side code. Use a real authorizer (IAM, Cognito, JWT or Lambda) for authentication and layer API keys on top purely for rate limiting and billing attribution. Treating an API key as a security boundary is a finding in any review.</p>",
            },
            {
              question: "Authorizing the caller and letting API Gateway reach your Lambda are two different things — explain.",
              solution: "<p>Yes, and conflating them is a common bug. <strong>Caller authorization</strong> decides whether the client may invoke the API — IAM, Cognito, or a Lambda authorizer. <strong>Backend permission</strong> decides whether API Gateway may invoke your function: that is a <strong>resource-based policy on the Lambda</strong> allowing <code>apigateway.amazonaws.com</code>, and you must pin <code>--source-arn</code> to your API, otherwise <em>any</em> API in <em>any</em> account can invoke your function. For direct service integrations (DynamoDB, SQS, Step Functions) you instead give API Gateway an <strong>integration role</strong> it assumes, which requires <code>iam:PassRole</code> to configure.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-control-access-to-api.html",
            "https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-resource-policies.html",
            "https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-control-access-using-iam-policies-to-invoke-api.html",
          ],
        },
        {
          topic: "KMS — Key Policies Layered On Top of IAM",
          tags: ["aws", "iam", "kms", "key policy", "encryption", "grants", "viaservice"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  KMS is the one service where <strong>IAM alone is never enough</strong>. Every KMS key has a <strong>key policy</strong>, and unless that policy grants access — directly or by delegating to IAM — no identity policy in the world will let you use the key. This is the most-tested KMS fact, and it explains a large share of real-world "encrypted thing doesn't work" incidents.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The rule</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>A KMS key's <strong>key policy is the root of authority</strong>. It is a resource-based policy, it is mandatory, and it is the only way access begins.</li>
  <li>The <strong>default key policy</strong> contains a statement granting <code>kms:*</code> to <code>arn:aws:iam::&lt;account&gt;:root</code>. That does <em>not</em> mean "the root user" — it means <strong>"delegate to this account's IAM"</strong>, which is what lets identity policies grant key usage normally.</li>
  <li>Remove that delegation and IAM policies stop working for the key entirely. Remove it <em>and</em> every other administrative principal and the key becomes <strong>permanently unmanageable</strong> — one of the few situations requiring an AWS Support case.</li>
  <li>Cross-account use needs <strong>both</strong>: the key policy must grant the external principal, and that principal's account must grant it in an identity policy.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The three access mechanisms</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Key policy</strong> — the foundation, always present.</li>
  <li><strong>IAM policies</strong> — work only when the key policy delegates to the account.</li>
  <li><strong>Grants</strong> — programmatic, temporary, fine-grained permissions issued for a specific principal and set of operations, optionally with <strong>encryption context constraints</strong>. AWS services create grants on your behalf (EBS attaching a volume, for instance) and they can be retired when no longer needed. Grants are the right tool when permissions must be created and revoked dynamically rather than written into a policy.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Separate the two roles in a key policy</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Key administrators</strong> — <code>kms:Create*</code>, <code>kms:Put*</code>, <code>kms:Update*</code>, <code>kms:ScheduleKeyDeletion</code>, <code>kms:PutKeyPolicy</code>. They manage the key but <strong>cannot use it</strong> to decrypt data.</li>
  <li><strong>Key users</strong> — <code>kms:Encrypt</code>, <code>kms:Decrypt</code>, <code>kms:ReEncrypt*</code>, <code>kms:GenerateDataKey*</code>, <code>kms:DescribeKey</code>. They use the key but cannot change who else can.</li>
  <li>That separation means a compromised administrator cannot read data and a compromised application cannot grant itself persistence. It is one of the cleanest examples of separation of duties in AWS.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Condition keys that make KMS policies precise</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong><code>kms:ViaService</code></strong> — the key may only be used <em>through</em> a named service, e.g. <code>s3.eu-west-1.amazonaws.com</code>. So a role can decrypt objects when reading them from S3 but cannot call <code>kms:Decrypt</code> directly on arbitrary ciphertext.</li>
  <li><strong><code>kms:EncryptionContext:&lt;key&gt;</code></strong> — bind usage to additional authenticated data, e.g. only decrypt when the context says <code>tenant=acme</code>. Encryption context is logged in CloudTrail, which makes it excellent for auditing.</li>
  <li><strong><code>kms:CallerAccount</code></strong>, <strong><code>kms:GrantIsForAWSResource</code></strong>, <strong><code>kms:KeySpec</code></strong>, <strong><code>kms:RetiringPrincipal</code></strong> for tighter control over grants and cross-account use.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The failure modes you will be asked about</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Cross-account S3 works for some objects, fails for others</strong> → SSE-KMS objects need <code>kms:Decrypt</code> in the <strong>key policy</strong> for the foreign principal.</li>
  <li><strong>Writes fail but reads work</strong> → missing <code>kms:GenerateDataKey</code>, which is what a service calls to encrypt.</li>
  <li><strong>Shared snapshots or AMIs unusable by the other account</strong> → the KMS key was not shared.</li>
  <li><strong>Everything breaks after a policy edit</strong> → the root delegation statement was removed.</li>
  <li><strong>AWS managed keys (<code>aws/s3</code>) cannot be shared cross-account</strong> — you must use a <strong>customer-managed key</strong> for any cross-account encrypted sharing.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Every KMS key has a key policy, and unlike S3 it is not optional — the key policy must grant access, so an identity policy alone never works. The default policy delegates to the account root, which means 'let this account's IAM decide', and deleting that statement makes IAM policies stop working and can make the key unmanageable. I split key administrators from key users so admins can't decrypt and users can't change the policy, and I scope usage with kms:ViaService so a role can decrypt through S3 but not call Decrypt on arbitrary ciphertext. Cross-account encrypted sharing needs a customer-managed key granted in the key policy, plus the caller's own identity policy."</div>
</div>`,
          examples: [
            `# ---------- Key policy: delegation + separation of duties ----------
{
  "Version": "2012-10-17",
  "Statement": [
    { "Sid":"DelegateToAccountIAM",
      "Effect":"Allow",
      "Principal":{"AWS":"arn:aws:iam::111122223333:root"},
      "Action":"kms:*","Resource":"*" },
    # ^ NOT "the root user" — it means "this account's IAM may grant key access".
    #   Delete this and identity policies stop working for the key.

    { "Sid":"KeyAdministrators",
      "Effect":"Allow",
      "Principal":{"AWS":"arn:aws:iam::111122223333:role/SecurityAdmin"},
      "Action":["kms:Create*","kms:Describe*","kms:Enable*","kms:List*","kms:Put*",
                "kms:Update*","kms:Revoke*","kms:Disable*","kms:Get*","kms:Delete*",
                "kms:ScheduleKeyDeletion","kms:CancelKeyDeletion"],
      "Resource":"*" },
    # admins manage the key but CANNOT decrypt

    { "Sid":"KeyUsers",
      "Effect":"Allow",
      "Principal":{"AWS":"arn:aws:iam::111122223333:role/orders-app"},
      "Action":["kms:Encrypt","kms:Decrypt","kms:ReEncrypt*","kms:GenerateDataKey*","kms:DescribeKey"],
      "Resource":"*",
      "Condition":{"StringEquals":{"kms:ViaService":"s3.eu-west-1.amazonaws.com"}} },
    # users decrypt THROUGH S3 only — not arbitrary ciphertext

    { "Sid":"CrossAccountRead",
      "Effect":"Allow",
      "Principal":{"AWS":"arn:aws:iam::444455556666:role/partner-reader"},
      "Action":["kms:Decrypt","kms:DescribeKey"],
      "Resource":"*",
      "Condition":{"StringEquals":{"kms:CallerAccount":"444455556666"}} }
  ]
}

# ---------- Encryption context: bind usage to data ----------
{ "Effect":"Allow","Principal":{"AWS":"arn:aws:iam::111122223333:role/tenant-svc"},
  "Action":"kms:Decrypt","Resource":"*",
  "Condition":{"StringEquals":{"kms:EncryptionContext:tenant":"\${aws:PrincipalTag/tenant}"}} }
# Encryption context is logged in CloudTrail -> great audit signal.

aws kms encrypt --key-id alias/orders --plaintext fileb://data \\
  --encryption-context tenant=acme
aws kms decrypt --ciphertext-blob fileb://ct --encryption-context tenant=acme
# Wrong or missing context -> decrypt fails, by design.

# ---------- Grants: dynamic, revocable, fine-grained ----------
aws kms create-grant --key-id alias/orders \\
  --grantee-principal arn:aws:iam::111122223333:role/batch-job \\
  --operations Decrypt DescribeKey \\
  --constraints EncryptionContextSubset={tenant=acme} \\
  --retiring-principal arn:aws:iam::111122223333:role/SecurityAdmin
aws kms list-grants --key-id alias/orders
aws kms retire-grant --grant-token "..."     # revoke when the job is done

# ---------- The failure modes ----------
# reads OK, writes fail            -> missing kms:GenerateDataKey
# some S3 objects fail cross-acct  -> key policy lacks the foreign principal
# shared snapshot unusable         -> the CMK wasn't shared too
# everything broke after an edit   -> the root delegation statement was deleted
# can't share aws/s3 cross-account -> AWS managed keys can't be shared; use a CMK

# ---------- Cross-account encrypted S3 needs THREE grants ----------
# 1. bucket policy   -> allow the foreign role s3:GetObject
# 2. KEY policy      -> allow the foreign role kms:Decrypt + kms:DescribeKey
# 3. caller's IAM    -> allow both s3:GetObject and kms:Decrypt

# ---------- Guardrail: nobody may delete a key ----------
{ "Effect":"Deny","Action":["kms:ScheduleKeyDeletion","kms:DisableKey","kms:PutKeyPolicy"],
  "Resource":"*",
  "Condition":{"ArnNotLike":{"aws:PrincipalArn":"arn:aws:iam::*:role/SecurityAdmin"}} }

# ---------- Who used the key? ----------
aws cloudtrail lookup-events \\
  --lookup-attributes AttributeKey=EventName,AttributeValue=Decrypt \\
  --query 'Events[].{T:EventTime,U:Username}' --output table`,
          ],
          questions: [
            {
              question: "Why is KMS different from other services in how it evaluates access?",
              solution: "<p>Because the <strong>key policy must always grant access</strong> — an identity policy alone is <em>never</em> sufficient. Every KMS key has a mandatory resource-based key policy that is the root of authority. Most keys work with IAM only because their default policy contains a statement granting <code>kms:*</code> to <code>arn:aws:iam::&lt;account&gt;:root</code>, which means <strong>'delegate to this account's IAM'</strong>, not 'the root user'. Remove that statement and identity policies stop working for the key; remove it and every other administrative principal and the key becomes <strong>permanently unmanageable</strong>, requiring an AWS Support case.</p>",
            },
            {
              question: "Why separate key administrators from key users?",
              solution: "<p><strong>Separation of duties.</strong> Administrators get <code>kms:Create*</code>, <code>Put*</code>, <code>Update*</code>, <code>ScheduleKeyDeletion</code> and <code>PutKeyPolicy</code> — they manage the key's lifecycle but <strong>cannot decrypt any data with it</strong>. Users get <code>Encrypt</code>, <code>Decrypt</code>, <code>ReEncrypt*</code>, <code>GenerateDataKey*</code> and <code>DescribeKey</code> — they use the key but <strong>cannot change who else can</strong>. So a compromised admin account cannot read your data, and a compromised application cannot grant itself or anyone else lasting access. It is one of the cleanest separation-of-duties boundaries available in AWS.</p>",
            },
            {
              question: "What does kms:ViaService do and why is it useful?",
              solution: "<p>It restricts key usage to requests made <strong>through a named AWS service</strong> — for example <code>\"kms:ViaService\": \"s3.eu-west-1.amazonaws.com\"</code>. The role can then decrypt objects as a side effect of reading them from S3, but <strong>cannot call <code>kms:Decrypt</code> directly</strong> on arbitrary ciphertext it has obtained some other way. That closes a real gap: without it, a role with <code>kms:Decrypt</code> can decrypt any ciphertext encrypted under that key, including data it exfiltrated from a backup or another system. Combine with <code>kms:EncryptionContext</code> for per-tenant binding.</p>",
            },
            {
              question: "Cross-account access to an encrypted S3 bucket fails. What are the three places to check?",
              solution: "<p>(1) The <strong>bucket policy</strong> in the owning account must allow the foreign principal the S3 action. (2) The <strong>KMS key policy</strong> must allow that same principal <code>kms:Decrypt</code> and <code>kms:DescribeKey</code> — and <code>kms:GenerateDataKey</code> if they write. (3) The <strong>caller's own identity policy</strong> must allow both the S3 and the KMS actions, because cross-account requires an allow on both sides. Two more gotchas: <strong>AWS managed keys</strong> such as <code>aws/s3</code> cannot be shared cross-account at all — you need a customer-managed key — and object ownership should be set to <strong>Bucket owner enforced</strong>.</p>",
            },
            {
              question: "What is a KMS grant and when would you use one instead of a policy?",
              solution: "<p>A <strong>grant</strong> is a programmatic, revocable permission attached to a key for a specific grantee principal and a specific set of operations, optionally constrained by <strong>encryption context</strong>. Use grants when permissions must be created and removed <strong>dynamically</strong> — a batch job that needs decrypt for an hour, or a service granting itself temporary use — rather than by editing a policy document. AWS services create grants on your behalf (EBS attaching an encrypted volume is the classic example). Grants can be <strong>retired</strong> by a designated retiring principal when the work is done, which is cleaner than rewriting a key policy under time pressure.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/kms/latest/developerguide/key-policies.html",
            "https://docs.aws.amazon.com/kms/latest/developerguide/policy-conditions.html",
            "https://docs.aws.amazon.com/kms/latest/developerguide/grants.html",
          ],
        },
        {
          topic: "Secrets Manager & SSM Parameter Store — Who Can Read Which Secret",
          tags: ["aws", "iam", "secrets manager", "ssm parameter store", "kms", "rotation", "secrets"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Both services store configuration and secrets, and in both the access decision is an <strong>IAM policy on a specific ARN</strong>. The interview value is in knowing when to choose which, and in the <strong>double permission</strong> that trips everyone up: reading an encrypted secret needs the secret permission <em>and</em> the KMS permission.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Choosing between them</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Secrets Manager</strong> — purpose-built for secrets. <strong>Automatic rotation</strong> with Lambda (including built-in rotation for RDS, Redshift, DocumentDB), <strong>resource-based policies</strong> for cross-account sharing, cross-region replication, and per-secret cost (a few cents per secret per month plus API calls). Choose it when rotation or cross-account sharing matters.</li>
  <li><strong>SSM Parameter Store</strong> — general configuration with a <code>SecureString</code> type that encrypts with KMS. <strong>Free</strong> for standard parameters, hierarchical paths, no built-in rotation, and <strong>no resource-based policy</strong>, so cross-account access requires assuming a role. Choose it for configuration, feature flags and non-rotating values, especially at volume.</li>
  <li>Both integrate natively with ECS task definitions, Lambda extensions and CloudFormation dynamic references, so application code often never calls them directly.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The double permission</h4>
<p style="line-height: 1.75;">If the value is encrypted with a <strong>customer-managed KMS key</strong>, the reader needs <strong>two</strong> grants: <code>secretsmanager:GetSecretValue</code> (or <code>ssm:GetParameter</code> with <code>WithDecryption</code>) <em>and</em> <code>kms:Decrypt</code> on that key. Constrain the KMS grant with <code>kms:ViaService</code> so the role can decrypt <em>through</em> Secrets Manager or SSM but not on arbitrary ciphertext. With the AWS-managed key (<code>aws/secretsmanager</code>, <code>aws/ssm</code>) the KMS permission is implicit for principals in the same account — which is exactly why it works in dev and breaks when someone switches to a CMK.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Writing the policies</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Secrets Manager ARNs end in a random 6-character suffix</strong> (<code>prod/db-AbCdEf</code>). Hardcoding the full ARN means the policy breaks if the secret is deleted and recreated — use a trailing wildcard: <code>secret:prod/db-*</code>.</li>
  <li><strong>SSM paths are hierarchical</strong>, so <code>arn:aws:ssm:…:parameter/prod/orders/*</code> grants a whole application's configuration in one statement — design the hierarchy as <code>/env/app/key</code> precisely so policies stay short.</li>
  <li>Grant <strong><code>GetSecretValue</code> / <code>GetParameter</code></strong>, not <code>secretsmanager:*</code> or <code>ssm:*</code>, which include <code>PutSecretValue</code>, <code>DeleteSecret</code> and <code>PutResourcePolicy</code>.</li>
  <li>Note <code>ssm:GetParameters</code> (plural) and <code>ssm:GetParametersByPath</code> are <strong>separate actions</strong> from <code>ssm:GetParameter</code> — a policy granting only the singular form breaks a client that batches.</li>
  <li>Use <strong>ABAC</strong> for multi-tenant setups: <code>"aws:ResourceTag/team": "\${aws:PrincipalTag/team}"</code> so one policy covers every team's secrets.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Rotation and IAM</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>The <strong>rotation Lambda's execution role</strong> needs <code>secretsmanager:GetSecretValue</code>, <code>PutSecretValue</code>, <code>UpdateSecretVersionStage</code> and <code>DescribeSecret</code> on the secret, plus <code>kms:Decrypt</code>/<code>GenerateDataKey</code> and whatever credentials-changing permission the target system requires.</li>
  <li>The secret's <strong>resource policy</strong> must allow the rotation function, and Secrets Manager needs <code>lambda:InvokeFunction</code> on it.</li>
  <li>Consumers should read the <code>AWSCURRENT</code> version and handle rotation gracefully rather than caching forever — an application that reads a secret once at startup defeats rotation.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Anti-patterns</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Secrets in Lambda environment variables</strong> — visible to anyone with <code>lambda:GetFunctionConfiguration</code>, and they appear in the console and in IaC state.</li>
  <li><strong>Secrets in container images, AMIs, user data or Terraform state</strong> — all readable, all persistent.</li>
  <li><strong>One shared secret for all environments</strong> — use separate secrets per environment so a dev role cannot read production credentials.</li>
  <li><strong>Granting <code>secretsmanager:*</code> on <code>*</code></strong> — that includes reading every secret in the account, which is usually the crown jewels in a single statement.</li>
  <li><strong>Never rotating</strong>. If you store a static credential and never rotate it, you have moved the problem, not solved it.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Both are IAM-gated by ARN. I use Secrets Manager when I need automatic rotation or cross-account sharing via a resource policy, and SSM Parameter Store for general configuration because standard parameters are free and paths make policies short — but it has no resource policy, so cross-account means assuming a role. The detail people miss is the double permission: with a customer-managed KMS key the reader needs GetSecretValue and kms:Decrypt, and I constrain the KMS grant with kms:ViaService. I also wildcard the Secrets Manager ARN suffix, since it's random and changes if the secret is recreated, and I never put secrets in Lambda environment variables."</div>
</div>`,
          examples: [
            `# ---------- Read ONE secret — note both permissions ----------
{
  "Version":"2012-10-17",
  "Statement":[
    { "Sid":"ReadTheSecret","Effect":"Allow",
      "Action":["secretsmanager:GetSecretValue","secretsmanager:DescribeSecret"],
      "Resource":"arn:aws:secretsmanager:eu-west-1:111122223333:secret:prod/orders/db-*" },
    { "Sid":"DecryptItWithTheCMK","Effect":"Allow",
      "Action":"kms:Decrypt",
      "Resource":"arn:aws:kms:eu-west-1:111122223333:key/1234abcd-...",
      "Condition":{"StringEquals":{
        "kms:ViaService":"secretsmanager.eu-west-1.amazonaws.com"}} }
  ]
}
# Without the second statement: AccessDenied on kms:Decrypt, not on the secret.
# The ARN wildcard matters — Secrets Manager appends a random 6-char suffix.

# ---------- SSM: hierarchical paths keep policies tiny ----------
{
  "Version":"2012-10-17",
  "Statement":[
    { "Effect":"Allow",
      "Action":["ssm:GetParameter","ssm:GetParameters","ssm:GetParametersByPath"],
      "Resource":"arn:aws:ssm:eu-west-1:111122223333:parameter/prod/orders/*" },
    { "Effect":"Allow","Action":"kms:Decrypt",
      "Resource":"arn:aws:kms:eu-west-1:111122223333:key/1234abcd-...",
      "Condition":{"StringEquals":{"kms:ViaService":"ssm.eu-west-1.amazonaws.com"}} }
  ]
}
# GetParameter / GetParameters / GetParametersByPath are THREE separate actions.
aws ssm put-parameter --name /prod/orders/db-password --type SecureString \\
  --key-id alias/orders --value 'hunter2'
aws ssm get-parameters-by-path --path /prod/orders --recursive --with-decryption

# ---------- Cross-account: Secrets Manager CAN, SSM CANNOT ----------
aws secretsmanager put-resource-policy \\
  --secret-id prod/shared/api-key \\
  --resource-policy '{"Version":"2012-10-17","Statement":[{
    "Effect":"Allow",
    "Principal":{"AWS":"arn:aws:iam::444455556666:role/partner"},
    "Action":"secretsmanager:GetSecretValue","Resource":"*"}]}'
# ...plus kms:Decrypt for that principal in the KEY policy.
# For SSM there is no resource policy -> the other account must assume a role here.

# ---------- ABAC across many tenants, one policy ----------
{ "Effect":"Allow","Action":"secretsmanager:GetSecretValue","Resource":"*",
  "Condition":{"StringEquals":{
    "aws:ResourceTag/team":"\${aws:PrincipalTag/team}"}} }

# ---------- Rotation Lambda's role ----------
{
  "Version":"2012-10-17",
  "Statement":[
    { "Effect":"Allow",
      "Action":["secretsmanager:GetSecretValue","secretsmanager:PutSecretValue",
                "secretsmanager:UpdateSecretVersionStage","secretsmanager:DescribeSecret",
                "secretsmanager:GetRandomPassword"],
      "Resource":"arn:aws:secretsmanager:eu-west-1:111122223333:secret:prod/orders/db-*" },
    { "Effect":"Allow","Action":["kms:Decrypt","kms:GenerateDataKey"],
      "Resource":"arn:aws:kms:eu-west-1:111122223333:key/1234abcd-..." },
    { "Effect":"Allow","Action":["rds:ModifyDBInstance","rds:DescribeDBInstances"],
      "Resource":"arn:aws:rds:eu-west-1:111122223333:db:orders-prod" }
  ]
}
aws secretsmanager rotate-secret --secret-id prod/orders/db \\
  --rotation-lambda-arn arn:aws:lambda:eu-west-1:111122223333:function:rotate-rds \\
  --rotation-rules AutomaticallyAfterDays=30

# ---------- Injected, so app code never calls the API ----------
# ECS task definition:
#   "secrets": [{"name":"DB_PASSWORD",
#     "valueFrom":"arn:aws:secretsmanager:...:secret:prod/orders/db-AbCdEf"}]
#   ^ fetched by the TASK EXECUTION role, not the task role
# CloudFormation dynamic reference:
#   '{{resolve:secretsmanager:prod/orders/db:SecretString:password}}'

# ---------- ANTI-PATTERNS ----------
# ❌ secrets in Lambda env vars  -> readable via lambda:GetFunctionConfiguration
# ❌ "Action":"secretsmanager:*","Resource":"*"  -> every secret in the account
# ❌ one secret shared by dev and prod
# ❌ storing a secret and never rotating it

# ---------- Who read the secret? ----------
aws cloudtrail lookup-events \\
  --lookup-attributes AttributeKey=EventName,AttributeValue=GetSecretValue \\
  --query 'Events[].{T:EventTime,Who:Username}' --output table`,
          ],
          questions: [
            {
              question: "When do you choose Secrets Manager over SSM Parameter Store?",
              solution: "<p><strong>Secrets Manager</strong> when you need <strong>automatic rotation</strong> (including built-in rotation for RDS, Redshift and DocumentDB), <strong>cross-account sharing via a resource-based policy</strong>, or cross-region replication — at a few cents per secret per month. <strong>SSM Parameter Store</strong> for general configuration: standard parameters are <strong>free</strong>, <code>SecureString</code> gives KMS encryption, and hierarchical paths make policies short. Its limits are no built-in rotation and <strong>no resource-based policy</strong>, so cross-account access requires assuming a role in the owning account. Both integrate natively with ECS task definitions and CloudFormation dynamic references, so app code often never calls them.</p>",
            },
            {
              question: "A role has secretsmanager:GetSecretValue but still gets AccessDenied. Why?",
              solution: "<p>Almost certainly the <strong>KMS permission</strong>. If the secret is encrypted with a <strong>customer-managed key</strong>, the reader needs <code>kms:Decrypt</code> on that key in addition to the Secrets Manager action, and the key policy must permit it. With the AWS-managed key (<code>aws/secretsmanager</code>) that permission is implicit for same-account principals — which is why the code works in dev and breaks the moment someone switches production to a CMK. The other candidate is the <strong>ARN suffix</strong>: Secrets Manager appends a random six characters, so a hardcoded full ARN stops matching if the secret was deleted and recreated.</p>",
            },
            {
              question: "Why do Secrets Manager ARNs end with random characters, and how do you write policies around it?",
              solution: "<p>Secrets Manager appends a <strong>random six-character suffix</strong> (<code>prod/db-AbCdEf</code>) so that a deleted secret's name cannot be immediately reused to impersonate the old secret — a deliberate safety property. The consequence is that a policy hardcoding the full ARN <strong>breaks if the secret is recreated</strong>. Write <code>arn:aws:secretsmanager:eu-west-1:111122223333:secret:prod/orders/db-*</code> with a trailing wildcard instead. Keep the prefix specific enough that the wildcard cannot match unrelated secrets — <code>secret:prod/*</code> would grant every production secret.</p>",
            },
            {
              question: "How do you share a secret with another AWS account?",
              solution: "<p><strong>Secrets Manager:</strong> attach a <strong>resource-based policy</strong> to the secret allowing the foreign principal <code>secretsmanager:GetSecretValue</code>, grant that principal <code>kms:Decrypt</code> in the <strong>KMS key policy</strong> (it must be a customer-managed key — AWS-managed keys cannot be shared), and have the other account grant the same actions in its own identity policy, because cross-account requires both sides. <strong>SSM Parameter Store</strong> has no resource policy at all, so the only route is for the other account to <strong>assume a role</strong> in yours that can read the parameter — which is the general answer for every service without resource-based policies.</p>",
            },
            {
              question: "What's wrong with putting a database password in a Lambda environment variable?",
              solution: "<p>It is readable by anyone with <code>lambda:GetFunctionConfiguration</code> — a permission commonly granted as part of broad read-only access — and it is visible in the console, in CloudFormation or Terraform state, and often in CI logs. It also <strong>cannot rotate</strong>: changing the password means redeploying the function. Store it in Secrets Manager or as an SSM <code>SecureString</code>, grant the execution role <code>GetSecretValue</code> plus <code>kms:Decrypt</code> on the specific ARNs, fetch it at runtime with a short cache, and enable automatic rotation. Encrypting environment variables with a CMK helps but still leaves the value retrievable by anyone with both permissions.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/secretsmanager/latest/userguide/auth-and-access.html",
            "https://docs.aws.amazon.com/systems-manager/latest/userguide/sysman-paramstore-access.html",
            "https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html",
          ],
        },
        {
          topic: "CloudTrail — The Audit Trail for Every IAM-Authorized Call",
          tags: ["aws", "cloudtrail", "audit", "logging", "incident response", "forensics"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>CloudTrail</strong> records every API call in your account — who made it, when, from where, with what parameters, and whether it succeeded. IAM decides <em>whether</em> an action happens; CloudTrail is the record <em>that</em> it happened. Without it, "who deleted the production database?" is unanswerable.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">What is recorded, and what is not</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Management events</strong> — control-plane operations (<code>RunInstances</code>, <code>CreateUser</code>, <code>AssumeRole</code>, <code>PutBucketPolicy</code>). Logged by default, and the last 90 days are visible in Event History for free even with no trail configured.</li>
  <li><strong>Data events</strong> — high-volume data-plane operations (<code>s3:GetObject</code>, <code>lambda:Invoke</code>, <code>dynamodb:GetItem</code>). <strong>Off by default</strong> and charged per event, which is exactly why an S3 exfiltration is often invisible: nobody enabled S3 data events on the bucket. Enable them selectively on sensitive buckets and tables.</li>
  <li><strong>Insights events</strong> — automatic detection of unusual API call-rate or error-rate patterns.</li>
  <li><strong>Not recorded:</strong> data <em>contents</em>, and actions that never reach an AWS API — an SSH session inside an EC2 instance or a query against your database engine.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Reading the identity block</h4>
<p style="line-height: 1.75;">The <code>userIdentity</code> element is where IAM meets forensics:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><code>type</code>: <code>Root</code>, <code>IAMUser</code>, <code>AssumedRole</code>, <code>AWSService</code>, <code>WebIdentityUser</code>, <code>SAMLUser</code>.</li>
  <li><code>arn</code>: for an assumed role, <code>arn:aws:sts::…:assumed-role/&lt;role&gt;/&lt;session-name&gt;</code> — which is why a <strong>meaningful <code>RoleSessionName</code></strong> (a username, a build ID) is the difference between an audit trail and a shrug.</li>
  <li><code>sessionContext.attributes.mfaAuthenticated</code> — whether MFA was used.</li>
  <li><code>sessionContext.sessionIssuer</code> — which role was assumed and by whom.</li>
  <li><code>accessKeyId</code> — the exact credential used, which is how you scope the blast radius of a leaked key.</li>
  <li><code>sourceIPAddress</code>, <code>userAgent</code>, <code>vpcEndpointId</code>, <code>errorCode</code>, <code>errorMessage</code> — note that <strong>denied calls are logged too</strong>, so a burst of <code>AccessDenied</code> is a strong signal of an attacker enumerating permissions.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Making the trail trustworthy</h4>
<p style="line-height: 1.75;">The first move in a real intrusion is turning off the recording, so logs must be out of reach of the accounts they watch:</p>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Organization trail</strong>, multi-region, writing to a bucket in a dedicated <strong>log-archive account</strong> no workload principal can access.</li>
  <li><strong>S3 Object Lock in compliance mode</strong> plus versioning, so objects cannot be deleted or overwritten even by that account's administrator.</li>
  <li><strong>Log file validation</strong>, so CloudTrail's signed digest files make tampering or deletion detectable.</li>
  <li><strong>KMS encryption</strong> with a key whose policy excludes the workload accounts.</li>
  <li><strong>An SCP</strong> denying <code>cloudtrail:StopLogging</code>, <code>DeleteTrail</code>, <code>UpdateTrail</code> and <code>PutEventSelectors</code> to everyone but one break-glass security role.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Using it</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Athena</strong> over the S3 trail for real investigation — <code>lookup-events</code> is fine for a quick check but slow and limited to 90 days.</li>
  <li><strong>CloudTrail Lake</strong> for managed SQL querying with long retention.</li>
  <li><strong>EventBridge rules</strong> for real-time alerting: root sign-in, IAM policy changes, trust-policy changes, new access keys, logging tampering.</li>
  <li><strong>GuardDuty</strong> consumes CloudTrail (plus VPC flow logs and DNS) to produce behavioural findings such as credential exfiltration and anomalous API use.</li>
  <li><strong>Access Analyzer policy generation</strong> reads CloudTrail to build a least-privilege policy from actual usage — the audit trail feeding back into permissions.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "CloudTrail records every API call with the userIdentity block — type, ARN, whether MFA was used, the exact access key ID, source IP — and it logs denied calls too, so a burst of AccessDenied is an attacker enumerating permissions. Management events are on by default; data events like s3:GetObject are off and charged, which is why exfiltration is often invisible. I run an organization trail into a locked log-archive account with Object Lock, log file validation and KMS, plus an SCP denying StopLogging outside a break-glass role — because turning off the recording is the first thing an attacker does. For investigation I query it with Athena or CloudTrail Lake, and alert in real time through EventBridge."</div>
</div>`,
          examples: [
            `# ---------- Tamper-evident organization trail ----------
aws cloudtrail create-trail --name org-trail \\
  --s3-bucket-name org-audit-logs-999988887777 \\
  --is-organization-trail --is-multi-region-trail \\
  --enable-log-file-validation \\
  --kms-key-id arn:aws:kms:us-east-1:999988887777:key/1234abcd-...
aws cloudtrail start-logging --name org-trail

# Immutable storage in the log-archive account
aws s3api put-bucket-versioning --bucket org-audit-logs-999988887777 \\
  --versioning-configuration Status=Enabled
aws s3api put-object-lock-configuration --bucket org-audit-logs-999988887777 \\
  --object-lock-configuration \\
  'ObjectLockEnabled=Enabled,Rule={DefaultRetention={Mode=COMPLIANCE,Days=365}}'

# SCP: nobody turns off the recording
{ "Effect":"Deny",
  "Action":["cloudtrail:StopLogging","cloudtrail:DeleteTrail","cloudtrail:UpdateTrail",
            "cloudtrail:PutEventSelectors"],
  "Resource":"*",
  "Condition":{"ArnNotLike":{"aws:PrincipalArn":"arn:aws:iam::*:role/OrgBreakGlass"}} }

# ---------- Data events are OFF by default — turn them on where it matters ----------
aws cloudtrail put-event-selectors --trail-name org-trail \\
  --advanced-event-selectors '[{
    "Name":"SensitiveBuckets",
    "FieldSelectors":[
      {"Field":"eventCategory","Equals":["Data"]},
      {"Field":"resources.type","Equals":["AWS::S3::Object"]},
      {"Field":"resources.ARN","StartsWith":["arn:aws:s3:::customer-pii/"]}]}]'
# Without this, s3:GetObject exfiltration leaves NO trace.

# ---------- The userIdentity block: where IAM meets forensics ----------
aws cloudtrail lookup-events --lookup-attributes \\
  AttributeKey=EventName,AttributeValue=DeleteDBInstance \\
  --max-results 1 --query 'Events[0].CloudTrailEvent' --output text | jq '{
    who:       .userIdentity.arn,
    type:      .userIdentity.type,
    key:       .userIdentity.accessKeyId,
    mfa:       .userIdentity.sessionContext.attributes.mfaAuthenticated,
    assumedVia:.userIdentity.sessionContext.sessionIssuer.arn,
    ip:        .sourceIPAddress,
    vpce:      .vpcEndpointId,
    error:     .errorCode
  }'

# ---------- Scope a leaked key ----------
aws cloudtrail lookup-events \\
  --lookup-attributes AttributeKey=AccessKeyId,AttributeValue=AKIALEAKED \\
  --query 'Events[].{T:EventTime,E:EventName}' --output table

# ---------- Denied calls are logged too: enumeration looks like this ----------
# Athena over the trail
SELECT useridentity.arn, eventname, count(*) AS denials
FROM cloudtrail_logs
WHERE errorcode IN ('AccessDenied','UnauthorizedOperation')
  AND eventtime > '2026-09-01'
GROUP BY 1,2 ORDER BY denials DESC LIMIT 20;

# Who assumed which role?
SELECT eventtime, useridentity.arn,
       requestparameters.roleArn, requestparameters.roleSessionName
FROM cloudtrail_logs
WHERE eventname = 'AssumeRole' AND eventtime > '2026-09-01';

# Root usage — should be zero
SELECT eventtime, eventname, sourceipaddress
FROM cloudtrail_logs WHERE useridentity.type = 'Root';

# ---------- Real-time alerting on the IAM events that matter ----------
cat > rule.json <<'EOF'
{
  "source": ["aws.iam", "aws.signin", "aws.cloudtrail"],
  "detail": {
    "eventName": ["CreateUser","CreateAccessKey","AttachRolePolicy","PutRolePolicy",
                  "UpdateAssumeRolePolicy","CreatePolicyVersion","SetDefaultPolicyVersion",
                  "DeleteRolePermissionsBoundary","StopLogging","DeleteTrail"]
  }
}
EOF
aws events put-rule --name iam-sensitive-changes --event-pattern file://rule.json
aws events put-targets --rule iam-sensitive-changes \\
  --targets 'Id=1,Arn=arn:aws:sns:us-east-1:111122223333:security-alerts'

# ---------- Feed it back into permissions ----------
aws accessanalyzer start-policy-generation \\
  --policy-generation-details principalArn=arn:aws:iam::111122223333:role/legacy-app \\
  --cloud-trail-details file://trail-details.json`,
          ],
          questions: [
            {
              question: "What does CloudTrail log, and what does it miss?",
              solution: "<p>It logs every <strong>API call</strong>: who (the <code>userIdentity</code> block), when, source IP, user agent, request parameters, and success or failure — including <strong>denied</strong> calls. <strong>Management events</strong> (control plane) are on by default with 90 days of free Event History. <strong>Data events</strong> — <code>s3:GetObject</code>, <code>lambda:Invoke</code>, <code>dynamodb:GetItem</code> — are <strong>off by default and charged</strong>, which is why S3 exfiltration is frequently invisible. It does <strong>not</strong> log data contents, nor anything that never reaches an AWS API: an SSH session inside an instance, or a query against your database engine.</p>",
            },
            {
              question: "What does the userIdentity block tell you during an investigation?",
              solution: "<p>Its <code>type</code> (<code>Root</code>, <code>IAMUser</code>, <code>AssumedRole</code>, <code>AWSService</code>, <code>SAMLUser</code>, <code>WebIdentityUser</code>); the <code>arn</code>, which for an assumed role is <code>assumed-role/&lt;role&gt;/&lt;session-name&gt;</code> — so a meaningful <strong><code>RoleSessionName</code></strong> is what turns a shared role back into a named human or build; <code>sessionContext.attributes.mfaAuthenticated</code>; <code>sessionContext.sessionIssuer</code> showing which role was assumed and by whom; and <code>accessKeyId</code>, which is how you scope the blast radius of a leaked credential. Alongside it, <code>sourceIPAddress</code>, <code>vpcEndpointId</code> and <code>errorCode</code> complete the picture.</p>",
            },
            {
              question: "How do you make CloudTrail logs tamper-evident?",
              solution: "<p>Put them out of reach of the accounts they watch. Use an <strong>organization trail</strong>, multi-region, writing to a bucket in a dedicated <strong>log-archive account</strong> that no workload principal can access. Enable <strong>versioning and S3 Object Lock in compliance mode</strong> so objects cannot be deleted or overwritten even by that account's admin; enable <strong>log file validation</strong> so CloudTrail's signed digests make modification detectable; encrypt with a <strong>KMS key</strong> whose policy excludes the workload accounts; and add an <strong>SCP</strong> denying <code>cloudtrail:StopLogging</code>, <code>DeleteTrail</code>, <code>UpdateTrail</code> and <code>PutEventSelectors</code> to everyone except one break-glass security role.</p>",
            },
            {
              question: "Why might an S3 data exfiltration leave no trace in CloudTrail?",
              solution: "<p>Because <strong>S3 data events are not logged by default</strong>. Management events like <code>PutBucketPolicy</code> and <code>CreateBucket</code> are recorded automatically, but <code>s3:GetObject</code> is a <strong>data event</strong> — off unless you explicitly configure event selectors, and billed per event, which is why teams leave it off. Enable data events <strong>selectively</strong> on sensitive buckets using advanced event selectors with a <code>resources.ARN</code> prefix filter, so you get the audit trail where it matters without paying to log every object read in the account. The same applies to Lambda invocations and DynamoDB item operations.</p>",
            },
            {
              question: "A burst of AccessDenied errors appears in CloudTrail. What does that suggest?",
              solution: "<p>Most likely <strong>permission enumeration</strong> — an attacker with a stolen credential systematically probing what it can do, since failed calls are logged just like successful ones. It is one of the highest-value detections available because it usually precedes the damage. Investigate by grouping denials by <code>userIdentity.arn</code> and <code>eventName</code> in Athena, check the <code>sourceIPAddress</code> and <code>userAgent</code> for something unfamiliar, and look for successful calls from the same principal around the same time. The benign explanations — a misconfigured deployment or a new SCP — are usually obvious from the narrow, repetitive shape of the calls.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-event-reference-user-identity.html",
            "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-data-events-with-cloudtrail.html",
            "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/best-practices-security.html",
          ],
        },
        {
          topic: "VPC Endpoints — Endpoint Policies as a Network-Layer IAM Gate",
          tags: ["aws", "iam", "vpc endpoint", "privatelink", "endpoint policy", "data perimeter"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  A <strong>VPC endpoint</strong> lets resources in a private subnet reach AWS services without traversing the internet. What makes it an IAM topic is the <strong>endpoint policy</strong>: a resource-based policy attached to the endpoint itself that filters every request passing through it, acting as a gate at the network layer.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The two kinds</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Gateway endpoints</strong> — S3 and DynamoDB only. A route-table entry, free, and traffic uses the service's public IPs but never leaves the AWS network.</li>
  <li><strong>Interface endpoints (PrivateLink)</strong> — most other services. An ENI with a private IP in your subnet, charged hourly plus per GB, controlled by security groups, and reachable from on-premises over Direct Connect or VPN.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The endpoint policy</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>A resource-based policy attached to the endpoint, evaluated <strong>in addition to</strong> the caller's identity policy and the resource's own policy. It <strong>never grants</strong> — it only filters what may pass. The request must be allowed by the endpoint policy <em>and</em> by normal IAM.</li>
  <li>The default is <strong>full access</strong>, so an endpoint created without a custom policy imposes no restriction at all — a very common gap.</li>
  <li>Its flagship use is stopping <strong>data exfiltration</strong>: even with valid credentials for another account's bucket, a request through your endpoint fails if the endpoint policy only permits your own buckets or your organisation.</li>
  <li>It also blocks the reverse: an attacker who lands inside your VPC cannot use it to reach <em>their</em> S3 bucket and stage data out.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The matching condition keys</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>On endpoint policies:</strong> <code>aws:PrincipalOrgID</code>, <code>aws:PrincipalAccount</code>, <code>aws:ResourceOrgID</code>, <code>aws:ResourceAccount</code> — "only our identities, reaching only our resources".</li>
  <li><strong>On resource and identity policies:</strong> <code>aws:SourceVpce</code> (a specific endpoint), <code>aws:SourceVpc</code> (any endpoint in a VPC), <code>aws:VpcSourceIp</code>. A bucket policy denying access unless <code>aws:SourceVpce</code> matches makes that bucket unreachable from the internet even with correct credentials.</li>
  <li>Together these are the <strong>network leg of a data perimeter</strong>, alongside SCPs for the identity leg and RCPs for the resource leg.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Practical notes</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Endpoint denials are <strong>silent and confusing</strong> — the caller sees <code>AccessDenied</code> with no hint that the network path was the cause, so name your Sids clearly and document which endpoints have restrictive policies.</li>
  <li>Watch what else the traffic needs: S3 access frequently also needs <strong>KMS</strong>, so a KMS interface endpoint (and its policy) is often required too. Similarly, ECS tasks in private subnets need endpoints for ECR (two of them), S3 (for image layers), CloudWatch Logs, Secrets Manager and STS.</li>
  <li><strong>STS</strong> is easy to forget — without an STS endpoint, role assumption from a private subnet fails.</li>
  <li>Interface endpoints have <strong>security groups</strong>; a correct endpoint policy with a closed security group still fails, and it is not an IAM problem.</li>
  <li>Enforce endpoint usage organisation-wide with an <strong>SCP</strong> denying S3 access unless <code>aws:SourceVpce</code> is in your approved list, carving out the principals that legitimately work from the console.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "A VPC endpoint gives private access to AWS services, and its endpoint policy is a resource-based policy that filters everything passing through — it never grants, it only restricts, and the default is full access, so an endpoint without a custom policy restricts nothing. The main use is anti-exfiltration: I allow only my organisation's resources via aws:ResourceOrgID, so even valid credentials for someone else's bucket fail through my endpoint. The mirror image is a bucket policy requiring aws:SourceVpce, which makes the bucket unreachable from the internet. Together with SCPs and RCPs that's the three-axis data perimeter — and the gotcha is that endpoint denials look like ordinary AccessDenied with no clue about the network path."</div>
</div>`,
          examples: [
            `# ---------- Gateway endpoint for S3 (free; route-table based) ----------
aws ec2 create-vpc-endpoint --vpc-id vpc-0abc --service-name com.amazonaws.eu-west-1.s3 \\
  --vpc-endpoint-type Gateway --route-table-ids rtb-0abc

# ---------- Endpoint policy: anti-exfiltration ----------
{
  "Version":"2012-10-17",
  "Statement":[
    { "Sid":"AllowOurOrgsResourcesOnly","Effect":"Allow","Principal":"*","Action":"s3:*",
      "Resource":"*",
      "Condition":{"StringEquals":{
        "aws:PrincipalOrgID":"o-abc123xyz",
        "aws:ResourceOrgID":"o-abc123xyz"}} },
    { "Sid":"AllowAwsOwnedBuckets","Effect":"Allow","Principal":"*",
      "Action":["s3:GetObject"],
      "Resource":["arn:aws:s3:::amazonlinux-*/*","arn:aws:s3:::packages.*.amazonaws.com/*"] }
  ]
}
# Default endpoint policy = FULL ACCESS. An endpoint with no custom policy restricts nothing.
aws ec2 modify-vpc-endpoint --vpc-endpoint-id vpce-0abc \\
  --policy-document file://endpoint-policy.json

# ---------- The mirror image: bucket reachable ONLY via the endpoint ----------
{
  "Version":"2012-10-17",
  "Statement":[{
    "Sid":"DenyUnlessThroughOurEndpoint","Effect":"Deny","Principal":"*","Action":"s3:*",
    "Resource":["arn:aws:s3:::sensitive-data","arn:aws:s3:::sensitive-data/*"],
    "Condition":{"StringNotEqualsIfExists":{"aws:SourceVpce":["vpce-0abc123","vpce-0def456"]},
                 "BoolIfExists":{"aws:PrincipalIsAWSService":"false"}}
  }]
}
# Correct credentials from the internet -> AccessDenied. Only your VPC can reach it.

# ---------- Interface endpoints private subnets actually need ----------
for svc in sts kms secretsmanager logs ecr.api ecr.dkr monitoring ssm; do
  aws ec2 create-vpc-endpoint --vpc-id vpc-0abc \\
    --service-name com.amazonaws.eu-west-1.$svc \\
    --vpc-endpoint-type Interface --subnet-ids subnet-0a subnet-0b \\
    --security-group-ids sg-0endpoint --private-dns-enabled
done
# Forget STS -> AssumeRole from a private subnet just fails.
# ECS in a private subnet needs ecr.api + ecr.dkr + S3 (layers) + logs + secretsmanager.

# ---------- Restrict an STS endpoint to your org ----------
{ "Version":"2012-10-17","Statement":[{
  "Effect":"Allow","Principal":"*","Action":["sts:AssumeRole","sts:GetCallerIdentity"],
  "Resource":"*",
  "Condition":{"StringEquals":{"aws:PrincipalOrgID":"o-abc123xyz"}}}]}

# ---------- Organisation-wide enforcement ----------
{ "Sid":"S3OnlyThroughOurEndpoints","Effect":"Deny","Action":"s3:*","Resource":"*",
  "Condition":{
    "StringNotEqualsIfExists":{"aws:SourceVpce":["vpce-0abc123","vpce-0def456"]},
    "BoolIfExists":{"aws:PrincipalIsAWSService":"false","aws:ViaAWSService":"false"},
    "ArnNotLike":{"aws:PrincipalArn":"arn:aws:iam::*:role/AWSReservedSSO_*"} } }
# Carve out console/SSO users or you break everyone's browser access.

# ---------- The three-axis data perimeter ----------
# identity  -> RCP  : deny unless aws:PrincipalOrgID is ours
# resource  -> SCP  : deny unless aws:ResourceOrgID is ours
# network   -> both : deny unless aws:SourceVpce is ours

# ---------- Debugging ----------
aws ec2 describe-vpc-endpoints --vpc-endpoint-ids vpce-0abc \\
  --query 'VpcEndpoints[0].{Policy:PolicyDocument,SGs:Groups,DNS:PrivateDnsEnabled}'
# The CloudTrail event records vpcEndpointId — that's how you confirm the path used.
# An endpoint denial looks like a plain AccessDenied: no hint the network was the cause.`,
          ],
          questions: [
            {
              question: "What is a VPC endpoint policy and how does it interact with IAM?",
              solution: "<p>It is a <strong>resource-based policy attached to the endpoint</strong> that filters every request passing through it. It is evaluated <em>in addition to</em> the caller's identity policy and the target resource's policy, and it <strong>never grants</strong> — a request must be allowed by the endpoint policy <em>and</em> by normal IAM. Crucially the <strong>default endpoint policy is full access</strong>, so an endpoint created without a custom policy imposes no restriction whatsoever, which is a very common gap in supposedly locked-down VPCs.</p>",
            },
            {
              question: "How do you stop data exfiltration to a personal S3 bucket from inside your VPC?",
              solution: "<p>Attach an <strong>endpoint policy</strong> to the S3 VPC endpoint allowing access only when <code>aws:ResourceOrgID</code> equals your organisation (and <code>aws:PrincipalOrgID</code> for the caller side), with a carve-out for the AWS-owned buckets that package managers and AMIs need. Then even a principal holding valid credentials for an outside bucket cannot reach it <em>through your endpoint</em>. Enforce it organisation-wide with an <strong>SCP</strong> denying S3 unless <code>aws:SourceVpce</code> is one of your approved endpoints, remembering to exempt console and SSO principals or you break everyone's browser access.</p>",
            },
            {
              question: "How do you make an S3 bucket reachable only from your VPC?",
              solution: "<p>Put a <strong>Deny in the bucket policy</strong> conditioned on <code>\"StringNotEqualsIfExists\": {\"aws:SourceVpce\": [\"vpce-0abc123\"]}</code>, so any request not arriving through that endpoint is refused — even with entirely correct credentials from the internet. Use <code>...IfExists</code> and a <code>aws:PrincipalIsAWSService</code> carve-out so legitimate AWS service calls (replication, logging) still work. <code>aws:SourceVpc</code> is the looser variant covering any endpoint in a given VPC. This is the resource-side mirror of an endpoint policy: one restricts what can leave, the other restricts what can arrive.</p>",
            },
            {
              question: "Role assumption fails from a private subnet with no internet access. Why?",
              solution: "<p>There is probably <strong>no STS interface endpoint</strong>. Private subnets with no NAT gateway can only reach AWS services that have a VPC endpoint, and <code>sts:AssumeRole</code> is an API call like any other — without the endpoint it simply cannot reach STS. The same class of failure hits ECS tasks in private subnets, which need endpoints for <strong>ecr.api</strong>, <strong>ecr.dkr</strong>, <strong>S3</strong> (image layers live in S3), <strong>CloudWatch Logs</strong> and <strong>Secrets Manager</strong>. Also check the interface endpoint's <strong>security group</strong> — a correct endpoint policy with a closed security group still fails, and that is not an IAM problem.</p>",
            },
            {
              question: "Why are endpoint policy denials hard to debug?",
              solution: "<p>Because the caller just sees a plain <code>AccessDenied</code> with <strong>no indication that the network path caused it</strong> — the natural reaction is to add IAM permissions, which changes nothing. Mitigations: give endpoint policy statements clear <code>Sid</code> values, document which endpoints carry restrictive policies, and check the <strong><code>vpcEndpointId</code></strong> field in the CloudTrail event to confirm which path the request took. Newer AccessDenied messages do increasingly name the policy type, including VPC endpoint policies, which helps — but the habit of checking the network layer when IAM looks correct is what actually saves time.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-access.html",
            "https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html",
            "https://docs.aws.amazon.com/whitepapers/latest/building-a-data-perimeter-on-aws/building-a-data-perimeter-on-aws.html",
          ],
        },
        {
          topic: "Step Functions — Execution Roles & Service Integration Permissions",
          tags: ["aws", "iam", "step functions", "state machine", "execution role", "passrole", "orchestration"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  A Step Functions <strong>state machine</strong> follows exactly the same pattern as Lambda: a role with a trust policy naming the service, and permission policies covering everything the workflow calls. What makes it a good interview topic is that a state machine typically calls <em>many</em> services, so it is the clearest example of an orchestrator's role becoming an accidental super-role if you are not careful.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The execution role</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Trust policy</strong> names <code>states.amazonaws.com</code> with <code>sts:AssumeRole</code>. Harden it against the confused-deputy problem with <code>aws:SourceArn</code> (the state machine ARN) and <code>aws:SourceAccount</code>, so another account's state machine cannot assume your role.</li>
  <li><strong>Permission policies</strong> cover every integration the workflow performs: <code>lambda:InvokeFunction</code>, <code>dynamodb:PutItem</code>, <code>sqs:SendMessage</code>, <code>ecs:RunTask</code>, <code>sns:Publish</code>, <code>glue:StartJobRun</code>, <code>states:StartExecution</code> for nested workflows, and so on.</li>
  <li>Step Functions assumes the role <strong>for the whole execution</strong>, so every state shares it. There is no per-state identity — which is precisely why a sprawling workflow needs deliberate scoping.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The three integration patterns, and their permissions</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Request–response</strong> (<code>arn:aws:states:::lambda:invoke</code>) — call and continue. Just the service action.</li>
  <li><strong>Run a job (<code>.sync</code>)</strong> — wait for completion, e.g. <code>ecs:runTask.sync</code> or <code>glue:startJobRun.sync</code>. These need <strong>extra permissions to poll or receive completion events</strong>: typically <code>events:PutRule</code>, <code>events:PutTargets</code> and <code>events:DescribeRule</code> on the managed rule, plus <code>Describe*</code>/<code>Stop*</code> on the target service. Forgetting these is the classic "works in request-response mode, hangs or fails in .sync mode" bug.</li>
  <li><strong>Callback (<code>.waitForTaskToken</code>)</strong> — the workflow pauses until something calls <code>SendTaskSuccess</code>. The <em>caller</em> of that API needs <code>states:SendTaskSuccess</code> / <code>SendTaskFailure</code>, which is a permission on the other side of the boundary.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">PassRole and nested resources</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Creating a state machine with a given role requires <strong><code>iam:PassRole</code></strong>. Scope it and add <code>"iam:PassedToService": "states.amazonaws.com"</code>.</li>
  <li><code>ecs:RunTask</code> from a workflow also passes the task role and task execution role, so the state machine's role needs <code>iam:PassRole</code> for <em>those</em> too — a second, easily missed PassRole.</li>
  <li>Nested state machines need <code>states:StartExecution</code> and, for <code>.sync</code>, <code>states:DescribeExecution</code> and <code>states:StopExecution</code>.</li>
  <li>An orchestrator role that can pass any role and run any task is effectively admin. Enumerate the ARNs.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Other touchpoints</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Logging and tracing</strong> — CloudWatch Logs delivery needs <code>logs:CreateLogDelivery</code>, <code>GetLogDelivery</code>, <code>UpdateLogDelivery</code>, <code>PutResourcePolicy</code> and <code>DescribeResourcePolicies</code>; X-Ray needs <code>xray:PutTraceSegments</code> and <code>PutTelemetryRecords</code>.</li>
  <li><strong>Who may start an execution</strong> is separate from what the workflow can do — grant <code>states:StartExecution</code> on the state machine ARN to the caller (API Gateway, EventBridge, a user).</li>
  <li><strong>Express workflows</strong> log differently and are billed per execution; the IAM shape is the same.</li>
  <li><strong>Distributed Map</strong> reading from S3 needs <code>s3:GetObject</code>/<code>ListBucket</code> on the source and often <code>states:StartExecution</code> for child executions.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Keeping it least-privilege</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>One role per state machine</strong>, not a shared "orchestration role".</li>
  <li>Scope to exact function, table and queue ARNs, never <code>lambda:InvokeFunction</code> on <code>*</code>.</li>
  <li>Let the console generate a starting policy from the definition, then tighten it — it errs broad.</li>
  <li>Prefer <strong>direct service integrations</strong> over "a Lambda that calls a service": fewer moving parts, and the permission sits in one place.</li>
  <li>Verify with Access Analyzer policy generation after a few real executions.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "A state machine has an execution role whose trust policy names states.amazonaws.com — same pattern as Lambda — hardened with aws:SourceArn and aws:SourceAccount against confused deputy. Its permissions must cover every integration the workflow performs, and the role is assumed for the whole execution, so there's no per-state identity and a sprawling workflow easily becomes a super-role. The subtlety is .sync integrations: waiting for an ECS task or Glue job needs extra EventBridge and Describe permissions beyond the obvious action, which is why something works in request-response mode and hangs in .sync. And ecs:RunTask means a second iam:PassRole for the task roles, which I scope with iam:PassedToService."</div>
</div>`,
          examples: [
            `# ---------- Execution role: trust hardened against confused deputy ----------
cat > trust.json <<'EOF'
{
  "Version":"2012-10-17",
  "Statement":[{
    "Effect":"Allow",
    "Principal":{"Service":"states.amazonaws.com"},
    "Action":"sts:AssumeRole",
    "Condition":{
      "StringEquals":{"aws:SourceAccount":"111122223333"},
      "ArnLike":{"aws:SourceArn":"arn:aws:states:eu-west-1:111122223333:stateMachine:order-*"}
    }
  }]
}
EOF
aws iam create-role --role-name order-workflow-role --assume-role-policy-document file://trust.json

# ---------- Permissions: every integration the workflow performs ----------
{
  "Version":"2012-10-17",
  "Statement":[
    { "Sid":"InvokeOurFunctionsOnly","Effect":"Allow","Action":"lambda:InvokeFunction",
      "Resource":["arn:aws:lambda:eu-west-1:111122223333:function:validate-order",
                  "arn:aws:lambda:eu-west-1:111122223333:function:charge-card"] },

    { "Sid":"WriteOrders","Effect":"Allow",
      "Action":["dynamodb:PutItem","dynamodb:UpdateItem"],
      "Resource":"arn:aws:dynamodb:eu-west-1:111122223333:table/Orders" },

    { "Sid":"Notify","Effect":"Allow","Action":"sns:Publish",
      "Resource":"arn:aws:sns:eu-west-1:111122223333:order-events" },

    # ---- .sync integration needs MORE than the obvious action ----
    { "Sid":"RunFulfilmentTask","Effect":"Allow",
      "Action":["ecs:RunTask","ecs:StopTask","ecs:DescribeTasks"],
      "Resource":"arn:aws:ecs:eu-west-1:111122223333:task-definition/fulfilment:*" },
    { "Sid":"SyncCompletionEvents","Effect":"Allow",
      "Action":["events:PutTargets","events:PutRule","events:DescribeRule"],
      "Resource":"arn:aws:events:eu-west-1:111122223333:rule/StepFunctionsGetEventsForECSTaskRule" },

    # ---- ecs:RunTask passes the TASK roles: a SECOND PassRole ----
    { "Sid":"PassTaskRoles","Effect":"Allow","Action":"iam:PassRole",
      "Resource":["arn:aws:iam::111122223333:role/fulfilment-task-role",
                  "arn:aws:iam::111122223333:role/ecsTaskExecutionRole"],
      "Condition":{"StringEquals":{"iam:PassedToService":"ecs-tasks.amazonaws.com"}} },

    # ---- nested workflows ----
    { "Sid":"NestedWorkflow","Effect":"Allow",
      "Action":["states:StartExecution","states:DescribeExecution","states:StopExecution"],
      "Resource":"arn:aws:states:eu-west-1:111122223333:stateMachine:refund-flow" },

    # ---- logging + tracing ----
    { "Sid":"Observability","Effect":"Allow",
      "Action":["logs:CreateLogDelivery","logs:GetLogDelivery","logs:UpdateLogDelivery",
                "logs:DeleteLogDelivery","logs:ListLogDeliveries","logs:PutResourcePolicy",
                "logs:DescribeResourcePolicies","logs:DescribeLogGroups",
                "xray:PutTraceSegments","xray:PutTelemetryRecords","xray:GetSamplingRules"],
      "Resource":"*" }
  ]
}

# ---------- Creating the state machine needs iam:PassRole ----------
{ "Effect":"Allow","Action":"iam:PassRole",
  "Resource":"arn:aws:iam::111122223333:role/order-workflow-role",
  "Condition":{"StringEquals":{"iam:PassedToService":"states.amazonaws.com"}} }

aws stepfunctions create-state-machine --name order-processing \\
  --definition file://definition.asl.json \\
  --role-arn arn:aws:iam::111122223333:role/order-workflow-role \\
  --logging-configuration 'level=ALL,includeExecutionData=true,
     destinations=[{cloudWatchLogsLogGroup={logGroupArn=arn:aws:logs:eu-west-1:111122223333:log-group:/aws/states/order:*}}]'

# ---------- Who may START an execution (separate concern) ----------
{ "Effect":"Allow","Action":"states:StartExecution",
  "Resource":"arn:aws:states:eu-west-1:111122223333:stateMachine:order-processing" }

# ---------- Callback pattern: the OTHER side needs a permission ----------
# "Resource": "arn:aws:states:::lambda:invoke.waitForTaskToken"
{ "Effect":"Allow","Action":["states:SendTaskSuccess","states:SendTaskFailure","states:SendTaskHeartbeat"],
  "Resource":"arn:aws:states:eu-west-1:111122223333:stateMachine:order-processing" }

# ---------- The classic symptom ----------
# lambda:invoke        -> works
# ecs:runTask.sync     -> hangs or fails
# => missing the events:PutRule / PutTargets / DescribeRule permissions

# ---------- Verify against real usage ----------
aws accessanalyzer start-policy-generation \\
  --policy-generation-details principalArn=arn:aws:iam::111122223333:role/order-workflow-role \\
  --cloud-trail-details file://trail.json`,
          ],
          questions: [
            {
              question: "How does a Step Functions state machine get permissions?",
              solution: "<p>Through an <strong>execution role</strong> whose trust policy names <code>states.amazonaws.com</code> with <code>sts:AssumeRole</code> — the same pattern as a Lambda execution role. Harden that trust with <code>aws:SourceArn</code> (the state machine ARN) and <code>aws:SourceAccount</code> so another account's state machine cannot assume it. Its permission policies must cover <strong>every integration the workflow performs</strong>: <code>lambda:InvokeFunction</code>, <code>dynamodb:PutItem</code>, <code>ecs:RunTask</code>, <code>sns:Publish</code>, nested <code>states:StartExecution</code>, and so on. The role is assumed for the <strong>whole execution</strong>, so every state shares one identity — there is no per-state scoping.</p>",
            },
            {
              question: "A workflow works with lambda:invoke but hangs on ecs:runTask.sync. What's missing?",
              solution: "<p>The extra permissions that <strong><code>.sync</code> integrations</strong> require to learn when the job finished. Step Functions creates a managed EventBridge rule to receive completion events, so the execution role needs <code>events:PutRule</code>, <code>events:PutTargets</code> and <code>events:DescribeRule</code> on the <code>StepFunctionsGetEventsForECSTaskRule</code>, plus <code>ecs:DescribeTasks</code> and <code>ecs:StopTask</code>. This is the classic 'request–response works, .sync hangs' bug — the obvious action (<code>ecs:RunTask</code>) is granted, but the completion-tracking permissions are not. Glue, Batch, EMR and SageMaker <code>.sync</code> integrations have equivalent requirements.</p>",
            },
            {
              question: "Why does a state machine that runs ECS tasks need two different PassRole grants?",
              solution: "<p>Because two separate handovers happen. First, <strong>creating the state machine</strong> with its execution role requires <code>iam:PassRole</code> on that role, conditioned on <code>\"iam:PassedToService\": \"states.amazonaws.com\"</code>. Second, when the workflow calls <code>ecs:RunTask</code> it <strong>passes the ECS task role and task execution role</strong>, so the state machine's own role needs <code>iam:PassRole</code> on <em>those</em>, conditioned on <code>ecs-tasks.amazonaws.com</code>. The second one is easy to miss, and granting it on <code>*</code> to make the error go away turns the orchestrator into an escalation path — it could then run a task with any role in the account.</p>",
            },
            {
              question: "How is the callback (.waitForTaskToken) pattern different from an IAM perspective?",
              solution: "<p>The permission lives <strong>on the other side of the boundary</strong>. The workflow pauses and hands out a task token; whatever eventually resumes it — a human approval service, an external system, a Lambda — must hold <code>states:SendTaskSuccess</code>, <code>states:SendTaskFailure</code> and often <code>states:SendTaskHeartbeat</code> on the state machine ARN. That is a grant you make to a <em>different</em> principal, not to the execution role, which is why callback workflows fail in a confusing way: the state machine looks correctly permissioned and simply times out because the responder was never authorised to answer.</p>",
            },
            {
              question: "How do you keep an orchestrator's role from becoming a super-role?",
              solution: "<p><strong>One role per state machine</strong>, never a shared 'orchestration role' — otherwise every workflow inherits the union of everyone's permissions. Scope to <strong>exact ARNs</strong>: specific function, table and queue ARNs rather than <code>lambda:InvokeFunction</code> on <code>*</code>. Enumerate the roles in every <code>iam:PassRole</code> and pin <code>iam:PassedToService</code>. Treat the console's auto-generated policy as a starting point only — it errs broad. Prefer <strong>direct service integrations</strong> over 'a Lambda that calls a service', which puts the permission in one reviewable place. Then verify against reality with <strong>Access Analyzer policy generation</strong> after a few real executions.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/step-functions/latest/dg/procedure-create-iam-role.html",
            "https://docs.aws.amazon.com/step-functions/latest/dg/service-integration-iam-templates.html",
            "https://docs.aws.amazon.com/step-functions/latest/dg/connect-to-resource.html",
          ],
        },
      ],
    },
  ],
};
